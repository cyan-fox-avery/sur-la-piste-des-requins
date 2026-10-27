const fs=require('fs'), vm=require('vm');
function load(file){ const sb={}; vm.createContext(sb);
  vm.runInContext(fs.readFileSync(file,'utf-8')+'\nthis.TE=TRACK_ENVELOPES; this.MC=MAP_COORDS; this.GT=genTrack; this.runSeeded=(sp,rec)=>{const o=Math.random; Math.random=()=>0.5; try{return genTrack(sp,rec);}finally{Math.random=o;}}; this.L=typeof GEO_LABELS_FR!=="undefined"?GEO_LABELS_FR:undefined;', sb); return sb; }
const en=load('map-data-en.js'), fr=load('map-data.js');
// 1. MAP_COORDS identical
console.log('MAP_COORDS identical:', JSON.stringify(en.MC)===JSON.stringify(fr.MC), '| keys:', Object.keys(fr.MC).length);
// 2. TRACK_ENVELOPES identical
console.log('TRACK_ENVELOPES identical:', JSON.stringify(en.TE)===JSON.stringify(fr.TE));
// 3. Seeded genTrack identical for all 54 envelopes (distances honest, not random-fallback)
let ok=true, fallback=0;
for (const key of Object.keys(fr.TE)) {
  const species={id:key.split(':')[0]};
  const rec={region: fr.TE[key].regionKey || undefined, location: fr.TE[key].tagAnchor};
  // envelopeFor picks variant by region; emulate by calling genTrack with a rec whose region matches regionKey
  const run=(ctx)=>ctx.runSeeded(species, rec);
  const a=run(en), b=run(fr);
  if (JSON.stringify(a)!==JSON.stringify(b)) { ok=false; console.log('DIFF track', key); }
  for (const p of b.points) if (!(p.label in fr.MC) && p.day!==0) { /* anchor may be rec.location; areas must resolve */ }
  for (const p of b.points.slice(1)) if (!(p.label in fr.MC)) fallback++;
}
console.log('seeded genTrack identical all envelopes:', ok, '| points without coord (random-fallback hops):', fallback);
// 4. Label coverage
const labels=fr.L; let covered=0, missing=[];
for (const e of Object.values(fr.TE)) {
  for (const s of [...(e.areas||[]), e.tagAnchor, e.start].filter(Boolean)) {
    if (labels[s]) covered++; else if (!missing.includes(s)) missing.push(s);
  }
}
console.log('display strings covered:', covered, '| distinct missing labels:', missing.length);
console.log('missing:', missing);
