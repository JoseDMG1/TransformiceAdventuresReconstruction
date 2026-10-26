import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const root=path.resolve(import.meta.dirname,"..");
const sourceDirectory="reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/";
const hash=bytes=>crypto.createHash("sha256").update(bytes).digest("hex");
const sources=[];
for(const file of ["ArmeADV.js","OutilsArmeADV.js"]) {
  const bytes=await fs.readFile(path.join(root,sourceDirectory,file));
  sources.push({file:sourceDirectory+file,sha256:hash(bytes)});
}
// Only types explicitly declared by OutilsArmeADV and supported by this client.
const resources=["fond",...Array.from({length:6},(_,i)=>`a${i+1}`)];
const directory=path.join(root,"dist/assets/original/interface/weapon-overlays");
await fs.mkdir(directory,{recursive:true});
const records=await Promise.all(resources.map(async name=>{
  const resource=`interface/arme/${name}.png`,url="https://data.atelier801.com/tfmadv/"+resource;
  const result=await fetch(url,{signal:AbortSignal.timeout(20000)});
  if(!result.ok) return {resource,url,status:result.status};
  const bytes=Buffer.from(await result.arrayBuffer());
  if(!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) throw Error(`Invalid PNG: ${resource}`);
  const file=name+".png";await fs.writeFile(path.join(directory,file),bytes);
  return {resource,url,status:result.status,file,bytes:bytes.length,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20),sha256:hash(bytes)};
}));
await fs.writeFile(path.join(directory,"manifest.json"),JSON.stringify({sources,recoveredAt:new Date().toISOString(),records},null,2)+"\n");
console.log(JSON.stringify({requested:resources.length,recovered:records.filter(record=>record.file).length,records}));
