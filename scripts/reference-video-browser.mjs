import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export async function withReferenceVideo(callback) {
  const directory=path.resolve(".local/reference-player");
  await fs.mkdir(directory,{recursive:true});
  const page=path.join(directory,"player.html");
  const video=pathToFileURL(path.resolve("transformice-adventure-gameplay.mp4")).href;
  await fs.writeFile(page,`<!doctype html><video muted preload="auto" src="${video}"></video>`);
  const chrome=spawn(process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe",[
    "--headless=new","--no-first-run","--allow-file-access-from-files","--remote-debugging-port=9245",
    `--user-data-dir=${path.join(directory,"profile")}`,"about:blank",
  ],{windowsHide:true,stdio:"ignore"});
  const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  let ws;
  try {
    let target;
    for(let attempt=0;attempt<50;attempt++) {
      try { target=(await(await fetch("http://127.0.0.1:9245/json")).json()).find(t=>t.type==="page"); }
      catch { /* Chrome may still be starting. */ }
      if(target) break;
      await pause(150);
    }
    if(!target) throw Error("Reference decoder did not start");
    ws=new WebSocket(target.webSocketDebuggerUrl);
    await new Promise(resolve=>ws.addEventListener("open",resolve,{once:true}));
    let serial=0;
    const pending=new Map();
    ws.addEventListener("message",event=>{
      const message=JSON.parse(event.data),request=pending.get(message.id);
      if(!request) return;
      pending.delete(message.id);
      message.error ? request.reject(Error(message.error.message)) : request.resolve(message.result);
    });
    const send=(method,params={})=>new Promise((resolve,reject)=>{
      const id=++serial;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));
    });
    const evaluate=async expression=>{
      const response=await send("Runtime.evaluate",{expression,awaitPromise:true,returnByValue:true});
      if(response.exceptionDetails) throw Error(response.exceptionDetails.exception?.description || "Video decode failed");
      return response.result.value;
    };
    await send("Page.navigate",{url:pathToFileURL(page).href});
    await pause(1000);
    await evaluate(`window.referenceFrame=async(time,width=640,height=360)=>{
      const v=document.querySelector('video');
      if(v.readyState<2) await new Promise((resolve,reject)=>{v.onloadeddata=resolve;v.onerror=reject;setTimeout(()=>reject(Error('Video load timeout')),15000);});
      if(time>v.duration) throw RangeError('Requested time exceeds video duration');
      if(Math.abs(v.currentTime-time)>.001) await new Promise((resolve,reject)=>{v.onseeked=resolve;v.currentTime=time;setTimeout(()=>reject(Error('Seek timeout')),15000);});
      const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
      const context=canvas.getContext('2d',{willReadFrequently:true});context.drawImage(v,0,0,width,height);
      return {canvas,context,time:v.currentTime};
    };true`);
    return await callback(evaluate);
  } finally { ws?.close();chrome.kill(); }
}
