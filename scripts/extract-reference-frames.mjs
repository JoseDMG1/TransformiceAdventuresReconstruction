// Decode the supplied MP4 with installed Chrome; no external packages or edits.
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const times = process.argv.slice(2).map(Number);
if (!times.length || times.some(t => !Number.isFinite(t) || t < 0))
  throw Error("Provide nonnegative video times in seconds");
await fs.mkdir(".local/reference-player", { recursive: true });
await fs.mkdir("reference/comparison-frames", { recursive: true });
const video = pathToFileURL(path.resolve("transformice-adventure-gameplay.mp4")).href;
const page = path.resolve(".local/reference-player/player.html");
await fs.writeFile(page, `<!doctype html><video muted preload="auto" src="${video}"></video>`);
const chrome = spawn(process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe", [
  "--headless=new", "--no-first-run", "--allow-file-access-from-files", "--remote-debugging-port=9245",
  `--user-data-dir=${path.resolve(".local/reference-player/profile")}`, "about:blank",
], { windowsHide: true, stdio: "ignore" });
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
try {
  let target;
  for (let attempt=0;attempt<50;attempt++) {
    try { target=(await(await fetch("http://127.0.0.1:9245/json")).json()).find(t=>t.type==="page"); }
    catch { /* Chrome may still be starting. */ }
    if (target) break;
    await pause(150);
  }
  if (!target) throw Error("Reference decoder did not start");
  ws=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(resolve=>ws.addEventListener("open",resolve,{once:true}));
  let serial=0;
  const pending=new Map();
  ws.addEventListener("message",event=>{
    const message=JSON.parse(event.data), request=pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    message.error ? request.reject(Error(message.error.message)) : request.resolve(message.result);
  });
  const send=(method,params={})=>new Promise((resolve,reject)=>{
    const id=++serial; pending.set(id,{resolve,reject}); ws.send(JSON.stringify({id,method,params}));
  });
  await send("Page.navigate",{url:pathToFileURL(page).href});
  await pause(1000);
  const records=[];
  for (const time of times) {
    const result=await send("Runtime.evaluate",{awaitPromise:true,returnByValue:true,expression:`(async()=>{
      const v=document.querySelector('video');
      if(v.readyState<2) await new Promise((resolve,reject)=>{v.onloadeddata=resolve;v.onerror=reject;setTimeout(()=>reject(Error('Video load timeout')),15000);});
      if(${time}>v.duration) throw RangeError('Requested time exceeds video duration');
      if(Math.abs(v.currentTime-${time})>.001) await new Promise((resolve,reject)=>{v.onseeked=resolve;v.currentTime=${time};setTimeout(()=>reject(Error('Seek timeout')),15000);});
      const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;
      c.getContext('2d').drawImage(v,0,0);
      return {width:c.width,height:c.height,time:v.currentTime,data:c.toDataURL('image/png').split(',')[1]};
    })()`});
    if(result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description || "Video decode failed");
    const frame=result.result.value;
    const file=`frame-${String(time).replace('.','_')}.png`;
    await fs.writeFile(path.join("reference/comparison-frames",file),Buffer.from(frame.data,"base64"));
    records.push({requested:time,decoded:frame.time,width:frame.width,height:frame.height,file});
  }
  await fs.writeFile("reference/comparison-frames/last-extraction.json",JSON.stringify({
    source:"transformice-adventure-gameplay.mp4", extractedAt:new Date().toISOString(), records,
  },null,2)+"\n");
  console.log(JSON.stringify({decoded:records.length,files:records.map(r=>r.file)}));
} finally { ws?.close(); chrome.kill(); }
