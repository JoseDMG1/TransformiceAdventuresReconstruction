// Export only recovered data fields; inventory IDs are deliberately absent.
import fs from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";

const root=path.resolve(import.meta.dirname,"..");
const source="reference/original-data/animation-metadata.json";
const bytes=await fs.readFile(path.join(root,source));
const metadata=JSON.parse(bytes);
const signed=value=>value>127 ? value-256 : value;
const looks=metadata.clothing.map(item=>({code:item.code,depth:signed(item.depth),
  parts:item.parts.map(part=>({name:part.name,x:part.x,y:part.y,depth:signed(part.depth)}))}));
if(new Set(looks.map(item=>item.code)).size!==looks.length) throw Error("Duplicate visual look codes");
for(const item of looks) {
  if(!Number.isInteger(item.code)||item.code<0) throw Error("Invalid recovered look code");
  for(const part of item.parts)
    if(!/^[\w-]+$/.test(part.name)||![part.x,part.y,part.depth].every(Number.isFinite))
      throw Error(`Inspect recovered part ${item.code}/${part.name}`);
}
await fs.writeFile(path.join(root,"dist/assets/original/clothing-looks.json"),JSON.stringify({
  schemaVersion:1,source,sourceSha256:crypto.createHash("sha256").update(bytes).digest("hex"),looks,
},null,2)+"\n");
console.log(JSON.stringify({looks:looks.length,parts:looks.reduce((total,item)=>total+item.parts.length,0)}));
