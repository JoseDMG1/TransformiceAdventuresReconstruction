// Data-driven local assets. The renderer requests only the looks it uses;
// duplicates share a promise and undeclared resources never trigger requests.
export function createClothingLoader({ images, clothingSets, loadManifest, loadImage }) {
  const requests=new Map(),states=new Map(),paths=new Map();
  let manifest;
  const allowedPaths=()=>manifest ??= Promise.resolve().then(loadManifest).then(records=>new Set(
    records.filter(record=>record.status===200 && record.bytes>0).map(record=>record.resource)));
  function imageFor(path) {
    if(images.has(path)) return Promise.resolve(true);
    if(paths.has(path)) return paths.get(path);
    const request=Promise.resolve().then(()=>loadImage(path)).then(image=>{
      if(!image) return false;
      images.set(path,image);return true;
    }).catch(()=>false);
    paths.set(path,request);return request;
  }
  async function loadCode(code) {
    const outfit=clothingSets.get(code);
    if(!outfit) return {code,status:"unknown",missing:[]};
    const resources=[...new Set(outfit.parts.map(part=>`equipement/${code}/${part.name}.png`))];
    const missing=resources.filter(path=>!images.has(path));
    if(!missing.length) return {code,status:"ready",parts:resources.length,missing:[]};
    const allowed=await allowedPaths();
    const results=await Promise.all(missing.map(async path=>({path,
      loaded:allowed.has(path) && await imageFor(path)})));
    const failed=results.filter(result=>!result.loaded).map(result=>result.path);
    return {code,status:failed.length ? "incomplete" : "ready",parts:resources.length,missing:failed};
  }
  function requestCode(code) {
    if(requests.has(code)) return requests.get(code);
    states.set(code,{code,status:"loading",missing:[]});
    const request=loadCode(code).catch(()=>({code,status:"unavailable",missing:[]})).then(result=>{
      states.set(code,result);return result;
    });
    requests.set(code,request);return request;
  }
  const known=codes=>[...new Set(Array.isArray(codes)?codes:[])].filter(code=>Number.isInteger(code) && clothingSets.has(code));
  return {
    load:codes=>Promise.all(known(codes).map(requestCode)).then(results=>results.map(state=>({...state,missing:[...state.missing]}))),
    queue(codes) {for(const code of known(codes)) if(!requests.has(code)) requestCode(code);},
    snapshot:()=>[...states.values()].map(state=>({...state,missing:[...state.missing]})),
  };
}
