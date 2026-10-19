// Exact icon formulas from retained original interface source + recovered catalog IDs.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const catalog=JSON.parse(await readFile('reference/original-translations/catalog_es.json','utf8'));
const entries=[];
for(const key of Object.keys(catalog)) {
  let match;
  if((match=/^talent\.(\d+)\.nom$/.exec(key)))entries.push({kind:'talent',id:Number(match[1]),resource:`interface/talent/${match[1]}.png`});
  if((match=/^don\.(\d+)\.nom$/.exec(key)))entries.push({kind:'gift',id:Number(match[1]),resource:`interface/dons/${match[1]}.jpg`});
  if((match=/^equipement\.(\d+)\.nom$/.exec(key)))entries.push({kind:'equipment',id:Number(match[1]),resource:`interface/icones/${match[1]}.png`});
  if((match=/^metier\.nom\.(\d+)$/.exec(key)))entries.push({kind:'job',id:Number(match[1]),resource:`interface/metiers/icone-metier-${match[1]}.png`});
}
for(const resource of ['interface/icones/fond1.png','interface/icones/cadre1.png','interface/petit-cadenas.png'])entries.push({kind:'frame',resource});
let cursor=0;
const results=[];
await Promise.all(Array.from({length:6},async()=>{
  while(cursor<entries.length){const e=entries[cursor++],url='https://data.atelier801.com/tfmadv/'+e.resource;
    try{const response=await fetch(url,{signal:AbortSignal.timeout(20000)});if(!response.ok){results.push({...e,url,status:response.status});continue;}
      const bytes=Buffer.from(await response.arrayBuffer());
      const png=bytes.subarray(0,8).toString('hex')==='89504e470d0a1a0a',jpg=bytes[0]===255&&bytes[1]===216;
      if(!png&&!jpg)throw Error('Unexpected image signature');
      const target=path.join('dist/assets/original',e.resource);await mkdir(path.dirname(target),{recursive:true});await writeFile(target,bytes);
      results.push({...e,url,status:response.status,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),...(png?{width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)}:{})});
    }catch(error){results.push({...e,url,error:String(error)});}
  }
}));
results.sort((a,b)=>a.resource.localeCompare(b.resource));
await writeFile('reference/original-icons-downloads.json',JSON.stringify(results,null,2));
console.log(JSON.stringify({requested:entries.length,downloaded:results.filter(e=>e.bytes).length,byKind:Object.fromEntries(['talent','gift','equipment','job','frame'].map(k=>[k,{requested:results.filter(e=>e.kind===k).length,downloaded:results.filter(e=>e.kind===k&&e.bytes).length}])),failures:results.filter(e=>!e.bytes)},null,2));
