import { join } from 'node:path';
import { writeFileSync } from 'node:fs';

// Test-only surface rays inspect baked geometry; production keeps zone interaction.
export async function runReferenceModelChecks({ page, verify, evidenceRoot }) {
  const models = await page.evaluate(() => {
    const W = __game.world, T = __THREE, ray = new T.Raycaster(), S = W.refs.showroom.area.static;
    const local = (p, x, z) => ({ x: p.x + x * Math.cos(p.yaw) + z * Math.sin(p.yaw), z: p.z - x * Math.sin(p.yaw) + z * Math.cos(p.yaw) });
    const surface = (p, dx, dz) => {
      const at = local(p, dx, dz); ray.set(new T.Vector3(at.x, 2.7, at.z), new T.Vector3(0, -1, 0));
      return ray.intersectObject(S, true)[0]?.point.y;
    };
    return W.refs.showroom.exhibits.map(b => {
      const bowls = [[0,0],[-.6,.3],[.6,-.3]].map(([x,z]) => surface(b.sink,x,z));
      const worktops = [[-1.35,0],[1.35,0]].map(([x,z]) => surface(b.sink,x,z));
      const ends = b.runs.map(run => {
        const hits = [];
        for (const [dx,dz,vx,vz] of [[-run.width/2-.3,0,1,0],[run.width/2+.3,0,-1,0],[0,-run.depth/2-.3,0,1]]) {
          const at = local(run,dx,dz), dir = local({...run,x:0,z:0},vx,vz);
          ray.set(new T.Vector3(at.x,.9,at.z), new T.Vector3(dir.x,0,dir.z));
          const hit = ray.intersectObject(S,true)[0]; hits.push(!!hit && hit.distance < .5);
        }
        return hits.every(Boolean);
      });
      return {id:b.id,scale:b.scale,runs:b.runs,sink:b.sink,cooktop:b.cooktop,hood:b.hood,
        sinkOpen:bowls.every(y=>y>b.scale.top-.5 && y<b.scale.top-.30), bowls,
        slabClear:worktops.every(y=>Math.abs(y-b.scale.top)<.015),worktops,
        finished:ends.every(Boolean),
        uppers:b.uppers.length,upperHeight:b.uppers.every(c=>c.y0>=3.1 && c.cam && W.colliders.includes(c)),
        stationData: Object.entries(b.fixtures).every(([id,f])=>W.zones.some(z=>z.id===`showroom:product:${b.id}:${id}` && z.x===f.station.x && z.z===f.station.z)),
        footprints:b.counters.every(c=>W.map.shapes.some(m=>m.x0===c.x0 && m.x1===c.x1 && m.z0===c.z0 && m.z1===c.z1)),
      };
    });
  });
  for (const b of models) {
    verify(b.sinkOpen && b.slabClear, `${b.id}: actual baked Sink recess is open and worktop clears its bowl`, {bowls:b.bowls,worktops:b.worktops});
    verify(b.finished, `${b.id}: actual closed end/rear surfaces finish every run`);
    verify(b.stationData && b.footprints, `${b.id}: physical stations and map footprints follow current model data`);
    verify(b.upperHeight && (['peninsula','island'].includes(b.id) ? b.uppers===0 : b.uppers>0), `${b.id}: upper cabinetry respects supported wall context and floor height`);
    verify(b.cooktop.yaw===b.hood.yaw && Math.hypot(b.cooktop.x-b.hood.x,b.cooktop.z-b.hood.z)<.2 && b.hood.bottom>2.7, `${b.id}: Hood and Cooktop share orientation with safe overhead height`);
    verify(['peninsula','island'].includes(b.id) ? b.hood.kind==='suspended' && b.hood.support?.top===10 : b.hood.kind==='wall' && !b.hood.support, `${b.id}: appropriate wall / suspended Hood mounting`);
  }
  const l=models.find(b=>b.id==='l');
  verify(l.sink.run==='main' && l.cooktop.run==='return' && Math.abs(l.sink.yaw-l.cooktop.yaw)===Math.PI/2, 'Reference L: Sink on long leg, rotated Cooktop/Hood on short leg');
  const corner=await page.evaluate(()=>{
    const b=__game.world.refs.showroom.exhibits.find(b=>b.id==='l'),[a,r]=b.counters;
    const topOverlap=b.tops.filter(t=>t.run==='main').some(t=>b.tops.filter(u=>u.run==='return').some(u=>Math.min(t.x1,u.x1)-Math.max(t.x0,u.x0)>.001 && Math.min(t.z1,u.z1)-Math.max(t.z0,u.z0)>.001));
    const p={x:b.x+1.4,z:b.z+4.5};
    const blocked=__game.world.near(p.x,p.z).some(c=>c.y0<2.7 && c.y1>.42 && p.x>c.x0-.6 && p.x<c.x1+.6 && p.z>c.z0-.6 && p.z<c.z1+.6);
    return {topOverlap,blocked,joinGap:Math.abs(a.z1-r.z0)};
  });
  verify(!corner.topOverlap && !corner.blocked && corner.joinGap<.001, 'Reference L: joined slabs do not overlap and inside corner stays open',corner);
  const captures=[];
  const shots=[['i-front',[4177,2.9,-5],[4177,2.45,-17]],['i-side',[4185,3.2,-9],[4177,2.45,-17]],['i-elevated',[4171,7.4,-6],[4177,2.2,-17]],['l-front',[4220,3,-3],[4223,2.4,-14]],['l-side',[4215,3.2,-10],[4224,2.4,-14]],['l-elevated',[4215,8,-5],[4223,2.2,-14]],['first-gallery',[4196,6,18],[4196,2.8,-15]],['second-gallery',[4195,6.4,-20],[4195,2.2,-48]]];
  try {
    await page.evaluate(()=>{const g=__game;g.controls.clear();g.player.teleport(4200,0,23,Math.PI);g.snapCamera();for(let i=0;i<120;i++)g.update(1/60);Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));document.getElementById('debug').style.display='none';});
    for(const [name,eye,target]of shots){
      const stats=await page.evaluate(({eye,target})=>{const g=__game;g.camera.position.fromArray(eye);g.camera.lookAt(...target);g.camera.updateMatrixWorld();g.renderer.info.autoReset=false;g.renderer.info.reset();g.renderer.render(g.scene,g.camera);const p=g.camera.position;const row={camera:p.toArray(),target,calls:g.renderer.info.render.calls,tris:g.renderer.info.render.triangles,blocked:g.world.near(p.x,p.z).some(c=>c.cam && p.x>c.x0 && p.x<c.x1 && p.y>c.y0 && p.y<c.y1 && p.z>c.z0 && p.z<c.z1)};g.renderer.info.autoReset=true;return row;},{eye,target});
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      verify(!stats.blocked && stats.calls<400 && stats.tris<3e6, `Reference capture ${name}: clear actual camera and unchanged rendering budgets`,stats);
      await page.screenshot({path:join(evidenceRoot,`reference-${name}.png`)}); captures.push({name,...stats});
    }
  } finally {await page.evaluate(()=>{document.getElementById('debug').style.display='';delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));__game.snapCamera();});}
  writeFileSync(join(evidenceRoot,'reference-models.json'),JSON.stringify({models,corner,captures,framing:'Architectural cameras placed inside the room for reference comparison only. Walking and normal first/third-person rig clearance are checked separately.'},null,2));
}
