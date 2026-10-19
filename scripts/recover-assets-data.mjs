import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {inflateSync} from 'node:zlib';
const bytes=await readFile('dist/assets/original/data.bin');
const data=inflateSync(bytes.subarray(6));
await mkdir('reference/original-data',{recursive:true});
await writeFile('reference/original-data/data-inflated.bin',data);
const strings=[...data.toString('latin1').matchAll(/[A-Za-z0-9_/@. -]{5,}/g)].map(m=>({offset:m.index,text:m[0]}));
await writeFile('reference/original-data/data-strings.json',JSON.stringify(strings,null,2));
let pos=0;
const u8=()=>data.readUInt8(pos++);
const i8=()=>data.readInt8BE(pos++);
const u16=()=>{const n=data.readUInt16BE(pos);pos+=2;return n;};
const s32=()=>{const n=data.readInt32BE(pos);pos+=4;return n;};
const str=()=>{const n=u16(),s=data.subarray(pos,pos+n).toString('utf8');pos+=n;return s;};
function clip(inherited='',lengthPrefix=true) {
  if(lengthPrefix)u16();
  const type=String.fromCharCode(u8()),result={type,offset:pos-1,source:inherited};
  if(type==='I'){result.name=str();if(u8())result.anchor=[s32()/1000,s32()/1000];}
  else if(type==='A'){
    if(u8())result.source=str();result.loop=!!u8();result.animations=[];
    for(let n=u16();n--;){
      const a={main:!!u8(),name:str(),frames:u16(),loop:!!u8(),events:[],children:[]};
      for(let n=u8();n--;)a.events.push({frame:u16(),name:str()});
      for(let n=u16();n--;){
        const c={name:str(),sequences:[]};if(u8())c.anchor=[u16(),u16()];
        for(let n=u16();n--;){const s={tween:!!u8()};if(u8())s.bezier=[u16(),u16(),u16(),u16()].map(x=>x/1000);s.start=u16();s.end=u16();s.values={};for(let n=u8();n--;){const id=u8();s.values[id]=id===1?[s32(),s32()]:id===23?u8():id===40?u16():s32();}c.sequences.push(s);}
        a.children.push(c);
      }
      result.animations.push(a);
    }
  }else if(type==='C'){
    if(u8())result.source=str();result.children=[];
    for(let n=u8();n--;){const name=str();result.children.push({name,clip:clip(result.source,false)});}
  }else if(type==='#')result.cache=str();else throw Error(`Unknown type ${type} at ${pos}`);
  return result;
}
const metadata={sourceURL:'https://transformice-adventures.com/ressources/data.bin',inflatedBytes:data.length,animationNames:{},effects:[],monsters:[],sounds:{}};
for(let n=u8();n--;){const id=u8();metadata.animationNames[id]=str();}
for(let n=u16();n--;){const e={id:u16(),cache:str(),clip:clip(),orientable:!!u8(),stretchable:!!u8()};if(e.stretchable)e.stretch=[u16(),u16()];metadata.effects.push(e);}
for(let n=u16();n--;)metadata.monsters.push({id:u16(),cache:str(),clip:clip()});
for(let n=u16();n--;){const id=u16();metadata.sounds[id]=str();}
metadata.remainingOffset=pos;
metadata.clothing=[];
const i16=()=>{const n=data.readInt16BE(pos);pos+=2;return n;};
for(let n=u16();n--;){const entry={id:u16(),code:u16(),depth:i8(),parts:[]};for(let n=u8();n--;)entry.parts.push({name:str(),x:i16(),y:i16(),depth:i8()});metadata.clothing.push(entry);}
metadata.finalOffset=pos;
await writeFile('reference/original-data/animation-metadata.json',JSON.stringify(metadata,null,2));
await writeFile('dist/assets/original/creatures.json',JSON.stringify({monsters:metadata.monsters.filter(m=>[2,3,4,5,7,10,19,40].includes(m.id)),clothing:metadata.clothing.filter(c=>c.code===2)}));
console.log(JSON.stringify({bytes:bytes.length,inflatedBytes:data.length,effects:metadata.effects.length,monsters:metadata.monsters.length,remainingOffset:pos,remainingBytes:data.length-pos}));
const refs=new Map();
function image(name,source,owner){
  if(!name?.startsWith('@'))return;
  let resource=name.substring(1);
  if(resource.startsWith('+'))resource='anim/'+resource.substring(1);else resource=source+resource;
  resource=resource.replaceAll('\\','/').replace(/^\/+/, '');
  if(!resource.endsWith('.png'))return;
  refs.set(resource,{resource,owner});
}
function collect(c,owner){
  image(c.name,c.source,owner);
  for(const a of c.animations??[])for(const child of a.children)image(child.name,c.source,owner);
  for(const child of c.children??[])collect(child.clip,owner);
}
for(const m of metadata.monsters.filter(m=>[2,3,4,5,7,10,19,40].includes(m.id)))collect(m.clip,m.id);
for(const e of metadata.clothing.filter(e=>e.code===2))for(const p of e.parts)refs.set(`equipement/${e.code}/${p.name}.png`,{resource:`equipement/${e.code}/${p.name}.png`,owner:'mouse-base'});
await writeFile('dist/assets/original/animation-image-references.json',JSON.stringify([...refs.values()],null,2));
let index=0;const entries=[...refs.values()],results=[];
const path=await import('node:path');
await Promise.all(Array.from({length:6},async()=>{
 while(index<entries.length){const e=entries[index++],url='https://data.atelier801.com/tfmadv/'+e.resource;
 try{const response=await fetch(url,{signal:AbortSignal.timeout(20000)});if(!response.ok){results.push({...e,url,status:response.status});continue;}const bytes=Buffer.from(await response.arrayBuffer());const target=path.join('dist/assets/original',e.resource);await mkdir(path.dirname(target),{recursive:true});await writeFile(target,bytes);results.push({...e,url,status:response.status,bytes:bytes.length});}
 catch(error){results.push({...e,url,error:String(error)});}
 }
}));
await writeFile('dist/assets/original/animation-image-downloads.json',JSON.stringify(results,null,2));
console.log(JSON.stringify({images:entries.length,downloaded:results.filter(e=>e.bytes).length}));
