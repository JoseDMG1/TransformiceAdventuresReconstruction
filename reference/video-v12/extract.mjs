import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const browser=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--no-first-run','--allow-file-access-from-files','--remote-debugging-port=9243','--user-data-dir='+path.resolve('reference/video-v12/browser-profile'),'about:blank'],{windowsHide:true,stdio:'ignore'});
let ws;
try {
let target;for(let n=0;n<40;n++){try{target=(await(await fetch('http://127.0.0.1:9243/json')).json()).find(t=>t.type==='page');if(target)break;}catch{} await new Promise(r=>setTimeout(r,150));}
ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));let id=0;const waits=new Map();ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){const p=waits.get(m.id);waits.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result);}});const call=(method,params={})=>new Promise((resolve,reject)=>{const i=++id;waits.set(i,{resolve,reject});ws.send(JSON.stringify({id:i,method,params}));});
await call('Page.navigate',{url:pathToFileURL(path.resolve('reference/video-v12/player.html')).href}); await new Promise(r=>setTimeout(r,1500));
for(const t of [350,380,420,540,840,900,1040]){const expression=`new Promise((resolve,reject)=>{const v=document.querySelector('video');v.onseeked=()=>{const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;c.getContext('2d').drawImage(v,0,0);resolve(c.toDataURL('image/png').split(',')[1]);};v.onerror=()=>reject('video load error');v.currentTime=${t};})`;const r=await call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));await fs.writeFile('reference/video-v12/frame-'+t+'.png',Buffer.from(r.result.value,'base64'));}
console.log('Extracted 6 video frames without changing MP4.');
} finally {ws?.close();browser.kill();}

