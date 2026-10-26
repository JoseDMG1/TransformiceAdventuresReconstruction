import test from "node:test";
import assert from "node:assert/strict";
import {createHealthAnimation,advanceHealthAnimation,healthFlashColour} from "../dist/health-animation.js";

test("damage moves health first and holds the red trail for 300ms",()=>{
  const state=createHealthAnimation(100,100,0);
  advanceHealthAnimation(state,50,100,16);
  assert.equal(state.displayed,.9);assert.equal(state.trail,1);assert.equal(state.trailColor,"#ff1111");
  advanceHealthAnimation(state,50,100,316);assert.equal(state.trail,1);
  advanceHealthAnimation(state,50,100,332);assert.ok(state.trail<1);assert.ok(state.trail>state.displayed);
  for(let time=348;time<1500;time+=16) advanceHealthAnimation(state,50,100,time);
  assert.equal(state.displayed,.5);assert.equal(state.trail,.5);
});
test("healing shows cyan before the 150ms delayed health and settles the halo",()=>{
  const state=createHealthAnimation(50,100,0);
  advanceHealthAnimation(state,100,100,16);
  assert.equal(state.displayed,.5);assert.equal(state.trail,.6);assert.equal(state.trailColor,"#00ffff");
  advanceHealthAnimation(state,100,100,166);assert.equal(state.displayed,.5);
  advanceHealthAnimation(state,100,100,182);assert.ok(state.displayed>.5);assert.ok(state.haloAlpha>0);
  for(let time=198;time<2500;time+=16) advanceHealthAnimation(state,100,100,time);
  assert.equal(state.displayed,1);assert.equal(state.trail,1);assert.equal(state.haloAlpha,0);assert.equal(state.flash,1);
});
test("initial and resumed health are static; damage and healing reversals stay finite",()=>{
  const state=createHealthAnimation(25,50,1000);
  advanceHealthAnimation(state,25,50,1016);assert.equal(state.displayed,.5);assert.equal(state.trail,.5);
  for(let time=1032;time<1800;time+=16) {
    const hp=time<1100?0:time<1200?40:time<1400?10:50;
    advanceHealthAnimation(state,hp,50,time);
    for(const value of [state.displayed,state.trail,state.haloAlpha,state.flash]) assert.ok(Number.isFinite(value));
    assert.ok(state.displayed>=0&&state.displayed<=1);assert.ok(state.trail>=0&&state.trail<=1);
  }
  assert.equal(state.target,1);
});
test("healing flash multiplies channels with original integer clipping",()=>{
  assert.equal(healthFlashColour("#62ca57",1),"#62ca57");
  assert.equal(healthFlashColour("#62ca57",1.5),"#93ff82");
  assert.equal(healthFlashColour("#ffea00",1.5),"#ffff00");
});
