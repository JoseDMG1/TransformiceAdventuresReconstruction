import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

export async function checkClothingAtlas({ evaluate }) {
  const before=await evaluate("localStorage.getItem('tfma-local-v1')");
  const result=await evaluate(`(async()=>{
    const {loadOriginalClothing,drawOriginalCreature,originalClothingStatus}=await import('./original-animation.js');
    const metadata=await(await fetch('./assets/original/clothing-looks.json')).json();
    const codes=metadata.looks.map(c=>c.code).sort((a,b)=>a-b);
    const results=await loadOriginalClothing(codes);
    const hash=canvas=>{
      const data=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;
      let value=2166136261;
      for(const byte of data) value=Math.imul(value^byte,16777619);
      return value>>>0;
    };
    const avatar=code=>{
      const canvas=document.createElement('canvas');canvas.width=120;canvas.height=160;
      const context=canvas.getContext('2d');
      drawOriginalCreature(context,2,'statique',60,145,0,1,.75,{clothing:code===2?[]:[code]});
      return canvas;
    };
    const baseHash=hash(avatar(2));
    const different=hash(avatar(33))!==baseHash;
    const pages=[];
    for(let offset=0;offset<codes.length;offset+=64) {
      const pageCodes=codes.slice(offset,offset+64),canvas=document.createElement('canvas');
      canvas.width=960;canvas.height=Math.ceil(pageCodes.length/8)*160+40;
      const context=canvas.getContext('2d');context.fillStyle='#394632';context.fillRect(0,0,canvas.width,canvas.height);
      context.fillStyle='#fff1cf';context.font='16px Arial';
      context.fillText('Apariencias recuperadas — código visual, no ID de inventario',12,26);
      pageCodes.forEach((code,index)=>{
        const x=index%8*120,y=Math.floor(index/8)*160+40;
        context.fillStyle=index%2?'#46523c':'#3d4935';context.fillRect(x,y,120,160);
        context.drawImage(avatar(code),x,y);
        context.fillStyle=results.find(r=>r.code===code).status==='ready'?'#f4edcc':'#ffb9a1';
        context.font='14px Arial';context.fillText('Código '+code,x+8,y+17);
      });
      pages.push({codes:pageCodes,image:canvas.toDataURL('image/png').split(',')[1]});
    }
    return {codes:codes.length,results,different,baseHash,status:originalClothingStatus(),pages};
  })()`);
  assert.equal(result.codes,198);
  assert.equal(result.results.find(r=>r.code===33).status,"ready");
  assert.equal(result.different,true,"Newly loaded look 33 must change actual rendered pixels");
  for(const [index,page] of result.pages.entries())
    await writeFile(`.local/clothing-atlas-${index+1}.png`,Buffer.from(page.image,"base64"));
  assert.equal(await evaluate("localStorage.getItem('tfma-local-v1')"),before,"Clothing inspection cannot modify the saved profile");
  return {codes:result.codes,different:result.different,results:result.results,
    pages:result.pages.map((page,index)=>({file:`clothing-atlas-${index+1}.png`,codes:page.codes}))};
}
