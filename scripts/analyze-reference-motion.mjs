import fs from "node:fs/promises";
import { withReferenceVideo } from "./reference-video-browser.mjs";
import { estimateTranslation } from "./reference-motion.mjs";

const [start=0,end=60,step=.5]=process.argv.slice(2).map(Number);
if(![start,end,step].every(Number.isFinite)||start<0||end<=start||end-start>120||step<.1||step>2)
  throw Error("Use start/end (at most 120 seconds apart) and a step of 0.1–2 seconds");
const samples=await withReferenceVideo(async evaluate=>{
  await evaluate(`window.estimateTranslation=${estimateTranslation.toString()};
    window.motionSamples=[];window.motionPrevious=null;window.motionX=0;window.motionY=0;window.cumulativeReliable=true;true`);
  const times=[];
  for(let time=start;time<=end+.00001;time+=step) times.push(+time.toFixed(4));
  for(let index=0;index<times.length;index+=12) {
    const batch=times.slice(index,index+12);
    await evaluate(`(async()=>{for(const time of ${JSON.stringify(batch)}) {
      const frame=await referenceFrame(time,160,90),data=frame.context.getImageData(0,0,160,90).data;
      if(motionPrevious) {
        const shift=estimateTranslation(motionPrevious,data);
        if(Number.isFinite(shift.subpixelDx)) motionX-=shift.subpixelDx*4;
        if(Number.isFinite(shift.subpixelDy)) motionY-=shift.subpixelDy*4;
        cumulativeReliable &&= shift.reliable;
        motionSamples.push({time,...shift,cameraPixelsX:motionX,cameraPixelsY:motionY,cumulativeReliable});
      }
      motionPrevious=data;
    }} )()`);
    console.log(`Measured through ${batch.at(-1)} seconds`);
  }
  return evaluate("motionSamples");
});
await fs.mkdir("reference/motion-analysis",{recursive:true});
const file=`reference/motion-analysis/tutorial-${start}-${end}.json`;
await fs.writeFile(file,JSON.stringify({source:"transformice-adventure-gameplay.mp4",start,end,step,
  analysis:"low-resolution background translation; cumulative drift and perspective are not corrected",
  reliableSegments:samples.filter(s=>s.reliable).length,segments:samples.length,samples},null,2)+"\n");
console.log(JSON.stringify({file,segments:samples.length,reliable:samples.filter(s=>s.reliable).length,last:samples.at(-1)}));
