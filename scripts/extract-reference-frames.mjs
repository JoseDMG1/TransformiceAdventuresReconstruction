// Decode the supplied MP4 with installed Chrome; no external packages or edits.
import fs from "node:fs/promises";
import path from "node:path";
import { withReferenceVideo } from "./reference-video-browser.mjs";

const times=process.argv.slice(2).map(Number);
if(!times.length || times.some(t=>!Number.isFinite(t)||t<0))
  throw Error("Provide nonnegative video times in seconds");
await fs.mkdir("reference/comparison-frames",{recursive:true});
await withReferenceVideo(async evaluate=>{
  const records=[];
  for(const time of times) {
    const frame=await evaluate(`(async()=>{const f=await referenceFrame(${time});return {time:f.time,data:f.canvas.toDataURL('image/png').split(',')[1]};})()`);
    const file=`frame-${String(time).replace('.','_')}.png`;
    await fs.writeFile(path.join("reference/comparison-frames",file),Buffer.from(frame.data,"base64"));
    records.push({requested:time,decoded:frame.time,width:640,height:360,file});
  }
  await fs.writeFile("reference/comparison-frames/last-extraction.json",JSON.stringify({
    source:"transformice-adventure-gameplay.mp4",extractedAt:new Date().toISOString(),records,
  },null,2)+"\n");
  console.log(JSON.stringify({decoded:records.length,files:records.map(r=>r.file)}));
});
