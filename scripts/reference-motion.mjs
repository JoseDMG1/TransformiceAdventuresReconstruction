// Translation estimate for consecutive video frames. It is a measurement aid,
// not original sector data; perspective, occlusion and repeated art can bias it.
export function estimateTranslation(previous, next, width=160, height=90) {
  const gray=bytes=>{
    const result=new Uint8Array(width*height);
    for(let i=0;i<result.length;i++) result[i]=(bytes[i*4]*3+bytes[i*4+1]*6+bytes[i*4+2])/10;
    return result;
  };
  const a=gray(previous),b=gray(next),features=[];
  for(let y=9;y<height-21;y+=2) for(let x=5;x<width-5;x+=2) {
    if((x>width*.36 && x<width*.64 && y>height*.3 && y<height*.65)
      || (x>width*.78 && y<height*.32)) continue;
    const i=y*width+x;
    const gradient=Math.abs(a[i-1]-a[i+1])+Math.abs(a[i-width]-a[i+width]);
    if(gradient>20) features.push({x,y,gradient});
  }
  features.sort((a,b)=>b.gradient-a.gradient);
  const cells=new Map(),points=[];
  for(const feature of features) {
    const cell=(feature.x/12|0)+":"+(feature.y/10|0),count=cells.get(cell)||0;
    if(count>=6) continue;
    points.push(feature);cells.set(cell,count+1);
    if(points.length>=500) break;
  }
  if(points.length<40) return {dx:null,dy:null,cost:null,subpixelDx:null,subpixelDy:null,
    points:points.length,margin:0,reliable:false};
  const score=(dx,dy)=>{
    let sum=0,count=0;
    for(const {x,y} of points) {
      const nx=x+dx,ny=y+dy;
      if(nx<2||nx>=width-2||ny<3||ny>=height-15) continue;
      const i=y*width+x,j=ny*width+nx;
      sum+=Math.min(60,Math.abs(a[i]-b[j]))
        +Math.min(60,Math.abs(a[i-1]-b[j-1]))+Math.min(60,Math.abs(a[i+1]-b[j+1]));
      count++;
    }
    return count<Math.max(40,points.length*.55) ? Infinity : sum/(count*3);
  };
  const candidates=[];
  for(let dy=-14;dy<=14;dy++) for(let dx=-18;dx<=18;dx++)
    candidates.push({dx,dy,cost:score(dx,dy)});
  candidates.sort((a,b)=>a.cost-b.cost);
  const best=candidates[0];
  const other=candidates.find(p=>Math.hypot(p.dx-best.dx,p.dy-best.dy)>4);
  const margin=other ? other.cost-best.cost : 0;
  const refine=(left,right)=>{
    const denominator=left-2*best.cost+right;
    return best.cost<1e-8 || !Number.isFinite(denominator) || Math.abs(denominator)<1e-6 ? 0
      : Math.max(-.5,Math.min(.5,.5*(left-right)/denominator));
  };
  return {...best,subpixelDx:best.dx+refine(score(best.dx-1,best.dy),score(best.dx+1,best.dy)),
    subpixelDy:best.dy+refine(score(best.dx,best.dy-1),score(best.dx,best.dy+1)),points:points.length,margin,
    reliable:points.length>=80 && Number.isFinite(best.cost) && best.cost<20 && margin>.25};
}
