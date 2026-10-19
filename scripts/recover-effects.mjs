import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
// References are decoded data.bin image names, never generated candidate filenames.
const data=JSON.parse(await readFile('reference/original-data/animation-metadata.json','utf8'));
const ids=[2,3,4,5,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,33,39,41,42,43,44,48,50,51,57,60,61,62,63,68,69,72,75,76,77,85,86,87,88,92,93,99,100,101,102,103,104,105,106,107,108];
const monsterIds=[8,9,24,25,26,27,28];
const effects=data.effects.filter(e=>ids.includes(e.id));
const summons=data.monsters.filter(e=>monsterIds.includes(e.id));
const refs=new Map();
function image(name,source,owner){if(!name?.startsWith('@'))return;let value=name.slice(1);const resource=(value.startsWith('+')?'anim/'+value.slice(1):source+value).replaceAll('\\','/').replace(/^\/+/, '');if(!resource.endsWith('.png'))return;if(!refs.has(resource))refs.set(resource,{resource,owners:[]});if(!refs.get(resource).owners.includes(owner))refs.get(resource).owners.push(owner);}
function collect(clip,owner){image(clip.name,clip.source,owner);for(const a of clip.animations??[])for(const c of a.children)image(c.name,clip.source,owner);for(const c of clip.children??[])collect(c.clip,owner);}
for(const e of effects)collect(e.clip,`effect:${e.id}`);
for(const e of summons)collect(e.clip,`monster:${e.id}`);
const entries=[...refs.values()],results=[];let index=0;
await Promise.all(Array.from({length:6},async()=>{while(index<entries.length){const e=entries[index++],url='https://data.atelier801.com/tfmadv/'+e.resource;try{const response=await fetch(url,{signal:AbortSignal.timeout(20000)});if(!response.ok){results.push({...e,url,status:response.status});continue;}const bytes=Buffer.from(await response.arrayBuffer());if(bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('Not PNG');const target=path.join('dist/assets/original',e.resource);await mkdir(path.dirname(target),{recursive:true});await writeFile(target,bytes);results.push({...e,url,status:response.status,bytes:bytes.length,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20),sha256:createHash('sha256').update(bytes).digest('hex')});}catch(error){results.push({...e,url,error:String(error)});}}}));
results.sort((a,b)=>a.resource.localeCompare(b.resource));
await writeFile('reference/original-effects-downloads.json',JSON.stringify(results,null,2));
await writeFile('dist/assets/original/effects.json',JSON.stringify({effects,summons,images:results.filter(e=>e.bytes).map(e=>e.resource)}));
console.log(JSON.stringify({effects:effects.length,summons:summons.length,requested:entries.length,downloaded:results.filter(e=>e.bytes).length,failures:results.filter(e=>!e.bytes)},null,2));
