import test from "node:test";
import assert from "node:assert/strict";
import { createClothingLoader } from "../dist/clothing-loader.js";

test("frame-loop requests share one load, cached assets and one local manifest",async()=>{
  const images=new Map([["equipement/33/body.png",{}]]);
  const clothingSets=new Map([[33,{parts:[{name:"body"},{name:"hat"}]}]]);
  let manifests=0,loads=0;
  const loader=createClothingLoader({images,clothingSets,
    loadManifest:async()=>{manifests++;return [{resource:"equipement/33/hat.png",status:200,bytes:20}];},
    loadImage:async resource=>{loads++;await new Promise(resolve=>setTimeout(resolve,5));return {resource};}});
  for(let frame=0;frame<100;frame++) loader.queue([33,33]);
  const [first,second]=await Promise.all([loader.load([33]),loader.load([33])]);
  assert.equal(first[0].status,"ready");assert.deepEqual(first,second);
  assert.equal(manifests,1);assert.equal(loads,1);assert.equal(images.has("equipement/33/hat.png"),true);
  first[0].missing.push("changed");
  assert.deepEqual(loader.snapshot()[0].missing,[],"Diagnostic callers cannot mutate cached state");
});

test("missing, failed and unknown resources do not produce retries or guessed paths",async()=>{
  const clothingSets=new Map([[41,{parts:[{name:"missing"},{name:"failed"}]}]]),calls=[];
  const loader=createClothingLoader({images:new Map(),clothingSets,
    loadManifest:async()=>[{resource:"equipement/41/failed.png",status:200,bytes:10}],
    loadImage:async resource=>{calls.push(resource);throw Error("Missing local image");}});
  const result=await loader.load([41,999,"41"]);
  assert.equal(result.length,1);assert.equal(result[0].status,"incomplete");assert.equal(result[0].missing.length,2);
  for(let frame=0;frame<50;frame++) loader.queue([41]);
  assert.deepEqual(calls,["equipement/41/failed.png"]);
});

test("preloaded outfits need no manifest request",async()=>{
  const loader=createClothingLoader({images:new Map([["equipement/2/body.png",{}]]),
    clothingSets:new Map([[2,{parts:[{name:"body"}]}]]),
    loadManifest:()=>{throw Error("Unexpected manifest load");},loadImage:()=>{throw Error("Unexpected image load");}});
  assert.equal((await loader.load([2]))[0].status,"ready");
});
