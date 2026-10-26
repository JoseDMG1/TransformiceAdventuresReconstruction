import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const root=path.resolve(import.meta.dirname,"..");
const url="https://transformice-adventures.com/dist/Transformice-adventure-client/src/_monde/_mobile/types/ClipNomADV.js";
const response=await fetch(url,{signal:AbortSignal.timeout(20000)});
if(!response.ok) throw Error(`Original overlay source: HTTP ${response.status}`);
const source=Buffer.from(await response.arrayBuffer()),text=source.toString("utf8");
if(!text.includes("ClipNomADV")||!text.includes("largeurBarre = 100")) throw Error("Inspect changed original overlay source");
const hash=bytes=>crypto.createHash("sha256").update(bytes).digest("hex");
await fs.writeFile(path.join(root,"reference/original-data/ClipNomADV-recovered.js"),source);
await fs.writeFile(path.join(root,"reference/original-data/actor-overlay-source-download.json"),JSON.stringify({
  url,status:response.status,bytes:source.length,sha256:hash(source),recoveredAt:new Date().toISOString(),
},null,2)+"\n");
const names=[...new Set([...text.matchAll(/recup(?:TextureDistante|ImageDistance)\("(interface\/[\w-]+\.png)"\)/g)].map(match=>match[1]))];
const directory=path.join(root,"dist/assets/original/interface/actor-overlays");
await fs.mkdir(directory,{recursive:true});
const records=await Promise.all(names.map(async resource=>{
  const assetURL="https://data.atelier801.com/tfmadv/"+resource;
  const result=await fetch(assetURL,{signal:AbortSignal.timeout(20000)});
  const bytes=Buffer.from(await result.arrayBuffer());
  if(!result.ok) return {resource,url:assetURL,status:result.status};
  if(!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))
    throw Error(`Unexpected resource ${resource}`);
  const file=path.basename(resource);await fs.writeFile(path.join(directory,file),bytes);
  return {resource,url:assetURL,status:result.status,file,bytes:bytes.length,
    width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20),sha256:hash(bytes)};
}));
await fs.writeFile(path.join(directory,"manifest.json"),JSON.stringify({
  source:url,sourceSha256:hash(source),recoveredAt:new Date().toISOString(),records,
},null,2)+"\n");
console.log(JSON.stringify({requested:names.length,recovered:records.filter(r=>r.file).length,records}));
