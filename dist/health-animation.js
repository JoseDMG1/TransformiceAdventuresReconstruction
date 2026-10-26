// ClipNomADV.majSante / boucle: presentation only, milliseconds throughout.
const ratio=(hp,maxHp)=>Math.max(0,Math.min(1,hp/maxHp));
export function healthFlashColour(color,amount) {
  const value=Number.parseInt(color.slice(1),16);
  return "#"+[16,8,0].map(shift=>Math.floor(Math.max(0,Math.min(255,((value>>shift)&255)*amount))).toString(16).padStart(2,"0")).join("");
}
export function createHealthAnimation(hp,maxHp,time=0) {
  const value=ratio(hp,maxHp);
  return {hp,maxHp,target:value,displayed:value,trail:value,last:time,
    mainPause:0,trailPause:0,trailColor:"#ff1111",haloAlpha:0,flash:1};
}
export function advanceHealthAnimation(state,hp,maxHp,time) {
  if(!Number.isFinite(hp)||!(maxHp>0)||!Number.isFinite(time)) return state;
  const elapsed=Math.max(0,time-state.last),blend=Math.min(.2*elapsed/16,1);
  state.last=time;
  if(hp!==state.hp||maxHp!==state.maxHp) {
    state.hp=hp;state.maxHp=maxHp;state.target=ratio(hp,maxHp);
    if(state.target>state.displayed) {state.mainPause=time+150;state.trailColor="#00ffff";}
    else if(state.target<state.displayed) {state.trailPause=time+300;state.trailColor="#ff1111";state.haloAlpha=0;}
  }
  if(time>state.mainPause&&state.target!==state.displayed) {
    const difference=state.target-state.displayed;
    state.displayed=Math.abs(difference)<.01?state.target:state.displayed+difference*blend;
    if(difference>0) state.haloAlpha=1;
  }
  if(time>state.trailPause&&state.target!==state.trail) {
    const difference=state.target-state.trail;
    if(Math.abs(difference)<.01) {state.trail=state.target;if(difference>0) state.flash=1.5;}
    else {
      state.trail+=difference*blend;
      // A long frame can reach the target directly; still start the fade.
      if(difference>0&&state.trail===state.target) state.flash=1.5;
    }
  }
  if(state.flash!==1) {
    if(state.flash<1.01) state.flash=1;
    state.flash+=(1-state.flash)*Math.min(.05*elapsed/16,1);
    state.haloAlpha=(state.flash-1)*2;
  }
  return state;
}
