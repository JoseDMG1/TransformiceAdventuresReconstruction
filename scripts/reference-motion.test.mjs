import test from "node:test";
import assert from "node:assert/strict";
import { estimateTranslation } from "./reference-motion.mjs";

test("background translation is recovered despite a changing central actor",()=>{
  const width=160,height=90,background=new Uint8ClampedArray(width*height*4);
  let seed=801;
  for(let i=0;i<width*height;i++) {
    seed=(1664525*seed+1013904223)>>>0;
    const n=seed>>>24;
    background.set([n,n,n,255],i*4);
  }
  for(const [dx,dy] of [[5,-3],[-7,2],[0,0]]) {
    const shifted=new Uint8ClampedArray(background.length);
    for(let y=0;y<height;y++) for(let x=0;x<width;x++) {
      if(x+dx<0||x+dx>=width||y+dy<0||y+dy>=height) continue;
      shifted.set(background.subarray((y*width+x)*4,(y*width+x)*4+4),((y+dy)*width+x+dx)*4);
    }
    for(let y=29;y<57;y++) for(let x=60;x<100;x++) shifted.set([0,0,0,255],(y*width+x)*4);
    const result=estimateTranslation(background,shifted,width,height);
    assert.equal(result.dx,dx);assert.equal(result.dy,dy);assert.equal(result.reliable,true);
  }
});

test("flat frames are marked unmeasurable instead of inventing camera displacement",()=>{
  const pixels=new Uint8ClampedArray(160*90*4).fill(128);
  const result=estimateTranslation(pixels,pixels);
  assert.equal(result.reliable,false);assert.equal(result.dx,null);assert.equal(result.dy,null);
});
