import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const root = process.cwd();
const source = path.join(root, 'reference/wayback-client/dist/Transformice-adventure-client/src');
const out = path.join(root, 'dist/assets/original');
const literals = new Map();
async function walk(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir,item.name);
    if (item.isDirectory()) await walk(full);
    else if (item.name.endsWith('.js')) {
      const text = await readFile(full,'utf8');
      for (const match of text.matchAll(/["']((?:tfmadv\/)?interface\/[a-zA-Z0-9_/-]+\.(?:png|jpg))["']/g)) {
        const resource = match[1].replace(/^tfmadv\//,'');
        literals.set(resource,path.relative(root,full));
      }
    }
  }
}
await walk(source);
const entries = [...literals];
const results = [];
let index = 0;
await Promise.all(Array.from({length:6},async()=>{
  while(index < entries.length) {
    const [resource,evidence] = entries[index++];
    const url = `https://data.atelier801.com/tfmadv/${resource}`;
    try {
      const response = await fetch(url,{signal:AbortSignal.timeout(20000)});
      const type = response.headers.get('content-type');
      if (!response.ok || !type?.startsWith('image/')) {results.push({resource,url,evidence,status:response.status,type});continue;}
      const bytes = Buffer.from(await response.arrayBuffer());
      const target = path.join(out,resource);
      await mkdir(path.dirname(target),{recursive:true});
      await writeFile(target,bytes);
      results.push({resource,url,evidence,status:response.status,type,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
    } catch(error) { results.push({resource,url,evidence,error:String(error)}); }
  }
}));
await mkdir(out,{recursive:true});
await writeFile(path.join(out,'manifest.json'),JSON.stringify({retrievedAt:new Date().toISOString(),scope:'Only literal image paths observed in recovered source; HTTPS for original public CDN.',results},null,2));
console.log(JSON.stringify({total:entries.length,downloaded:results.filter(r=>r.bytes).length,failed:results.filter(r=>!r.bytes).length}));
