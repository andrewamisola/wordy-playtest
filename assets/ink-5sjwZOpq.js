import{D as e,E as t,O as n,X as r,i,x as a}from"./core-B3dyijMX.js";import{a as o,t as s}from"./math.vector-CGJp2GKe.js";import{f as c}from"./tools.functions-BDn3JxQE.js";import{c as l,l as u,t as d}from"./texture-BG-ideLR.js";import{F as f,H as p,I as m,k as h,v as g}from"./paint-uFLxrWmM.js";var _=`
precision highp float;
attribute vec3 position;
attribute vec2 uv;
uniform mat4 worldViewProjection;
varying vec2 vUV;
void main() {
  gl_Position = worldViewProjection * vec4(position, 1.0);
  vUV = uv;
}`,v=`
precision highp float;
varying vec2 vUV;
uniform sampler2D mask;
uniform sampler2D noise;
uniform float reveal;
uniform float erode;
uniform vec3 colour;
uniform float opacity;
void main() {
  float m = texture2D(mask, vUV).a;
  float d = length(vUV - 0.5) * 2.0;
  float n = texture2D(noise, vUV * 1.6).r;
  // The front: out from the middle, ragged.
  float front = reveal * 1.2 - d + (n - 0.5) * 0.14;
  float shown = smoothstep(0.0, 0.03, front);
  // Eaten away: the noise decides which parts go first, the rim before the heart.
  float body = n * 0.85 + (1.0 - d) * 0.15;
  float alive = smoothstep(erode - 0.03, erode + 0.03, body);
  float a = m * shown * alive * opacity;
  if (a < 0.02) discard;
  gl_FragColor = vec4(colour, a);
}`,y=`
precision highp float;
varying vec2 vUV;
uniform sampler2D noise;
uniform float head;
uniform float tail;
uniform vec3 core;
uniform vec3 rim;
void main() {
  float u = vUV.x;
  float n = texture2D(noise, vec2(u * 2.5, vUV.y * 0.6)).r;
  // Thick in the middle of its sweep, a hair at each end.
  float taper = pow(sin(u * 3.14159), 0.7);
  float across = abs(vUV.y - 0.5) * 2.0;
  float edge = taper * (0.8 + 0.2 * n);
  if (across > edge) discard;
  // Drawn on to the head; eaten from the tail, raggedly.
  if (u > head) discard;
  if (u < tail + (n - 0.5) * 0.12) discard;
  float k = across / max(edge, 0.001);
  vec3 c = mix(core, rim, smoothstep(0.55, 0.8, k));
  gl_FragColor = vec4(c, 1.0);
}`,b=`
precision highp float;
varying vec2 vUV;
uniform sampler2D sheet;
uniform float frame;
uniform float glow;
void main() {
  float f = floor(frame);
  vec2 cell = vec2(mod(f, 4.0), floor(f / 4.0));
  vec2 uv = vec2((cell.x + vUV.x) / 4.0, (cell.y + (1.0 - vUV.y)) / 2.0);
  vec4 t = texture2D(sheet, vec2(uv.x, 1.0 - uv.y));
  if (t.a < 0.05) discard;
  // White pushed past white for the bloom; ink stays ink.
  gl_FragColor = vec4(t.rgb * mix(1.0, glow, t.r), t.a);
}`,x=!1;function S(){x||(x=!0,c.ShadersStore.inkVertexShader=_,c.ShadersStore.inkMarkFragmentShader=v,c.ShadersStore.inkSlashFragmentShader=y,c.ShadersStore.inkFlipFragmentShader=b)}var C=`#2b2724`;function w(e,t,n,r,i=n){let o=new a(t,{width:i,height:n},e,!0);o.hasAlpha=!0;let s=o.getContext();return s.clearRect(0,0,i,n),r(s,n),o.update(),o.wrapU=d.CLAMP_ADDRESSMODE,o.wrapV=d.CLAMP_ADDRESSMODE,o}function T(e){let t=e>>>0;return()=>(t=Math.imul(t^t>>>15,739982445)+2654435769>>>0,(t>>>8)/16777216)}function E(e,t,n){let r=T(n),i=t/2;e.strokeStyle=`#fff`,e.fillStyle=`#fff`,e.lineCap=`round`,e.lineJoin=`round`;let a=(t,n,i,o,s,c)=>{let l=t,u=n,d=i,f=6+Math.floor(r()*4);for(let t=0;t<f;t+=1){d+=(r()-.5)*.9;let n=o/f,i=l+Math.cos(d)*n,p=u+Math.sin(d)*n;e.lineWidth=Math.max(1,s*(1-t/f)),e.beginPath(),e.moveTo(l,u),e.lineTo(i,p),e.stroke(),c>0&&r()<.28&&a(i,p,d+(r()<.5?-1:1)*(.5+r()*.6),o*.45,s*.55,c-1),l=i,u=p}},o=5+Math.floor(r()*3);for(let e=0;e<o;e+=1)a(i,i,e/o*Math.PI*2+(r()-.5)*.7,t*(.3+r()*.17),t*.035,2);e.beginPath();for(let n=0;n<9;n+=1){let a=n/9*Math.PI*2,o=t*(.03+r()*.035);e.lineTo(i+Math.cos(a)*o,i+Math.sin(a)*o)}e.closePath(),e.fill()}function D(e,t){let n=T(7);e.fillStyle=`#808080`,e.fillRect(0,0,t,t);for(let r=0;r<900;r+=1){let r=n()*t,i=n()*t,a=6+n()*26,o=Math.floor(n()*255),s=e.createRadialGradient(r,i,0,r,i,a);s.addColorStop(0,`rgba(${String(o)},${String(o)},${String(o)},0.5)`),s.addColorStop(1,`rgba(${String(o)},${String(o)},${String(o)},0)`),e.fillStyle=s;for(let[n,o]of[[0,0],[t,0],[-t,0],[0,t],[0,-t]])e.beginPath(),e.arc(r+n,i+o,a,0,Math.PI*2),e.fill()}}function O(e,t){let n=(t,n,r,i,a=0)=>{e.beginPath();for(let o=0;o<24;o+=1){let s=o/24*Math.PI*2+a,c=o%2==0?r*(o%4==0?1:.78):i;e.lineTo(t+Math.cos(s)*c,n+Math.sin(s)*c)}e.closePath()},r=(t,n)=>{e.save(),t(),e.lineWidth=n,e.strokeStyle=C,e.lineJoin=`round`,e.stroke(),e.fillStyle=`#fff`,e.fill(),e.restore()},i=(t,n,i,a,o,s)=>{for(let c=0;c<12;c+=1){let l=c/12*Math.PI*2,u=c%2==0?a:a*.82;r(()=>{e.beginPath(),e.moveTo(t+Math.cos(l-o)*i,n+Math.sin(l-o)*i),e.lineTo(t+Math.cos(l)*u,n+Math.sin(l)*u),e.lineTo(t+Math.cos(l+o)*i,n+Math.sin(l+o)*i),e.closePath()},s)}},a=(t,n,r,i,a)=>{e.save(),e.strokeStyle=C,e.lineCap=`round`,e.lineWidth=a;for(let a=0;a<12;a+=1){let o=a/12*Math.PI*2+.13;e.beginPath(),e.moveTo(t+Math.cos(o)*r,n+Math.sin(o)*r),e.lineTo(t+Math.cos(o)*i,n+Math.sin(o)*i),e.stroke()}e.restore()},o=t*.47;for(let s=0;s<8;s+=1){let c=s%4*t+t/2,l=Math.floor(s/4)*t+t/2;switch(s){case 0:r(()=>n(c,l,o*.32,o*.12),6);break;case 1:r(()=>n(c,l,o*.8,o*.34),8);break;case 2:r(()=>n(c,l,o,o*.46,.05),8),e.save(),e.globalCompositeOperation=`destination-out`,n(c,l,o*.42,o*.24,.3),e.fill(),e.restore();break;case 3:i(c,l,o*.4,o,.16,7),a(c,l,o*.18,o*.3,5);break;case 4:i(c,l,o*.6,o,.1,6);break;case 5:i(c,l,o*.78,o,.06,5),a(c,l,o*.45,o*.7,4);break;case 6:a(c,l,o*.72,o*.98,4);break;case 7:a(c,l,o*.88,o*1,3);break}}}function k(e,t){let n=T(41),r=(t,n,r,i)=>{let a=e.createRadialGradient(t,n,0,t,n,r);a.addColorStop(0,`rgba(255,255,255,${String(i)})`),a.addColorStop(.55,`rgba(255,255,255,${String(i*.8)})`),a.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=a,e.beginPath(),e.arc(t,n,r,0,Math.PI*2),e.fill()},i=t*.48;[[.22,.42,.85,7],[.3,.46,.8,8],[.38,.46,.7,9],[.46,.42,.58,9],[.54,.36,.46,8],[.6,.3,.34,7],[.66,.24,.22,6],[.7,.18,.12,5]].forEach(([a,o,s,c],l)=>{let u=l%4*t+t/2,d=Math.floor(l/4)*t+t/2;e.save(),e.beginPath(),e.rect(u-t/2,d-t/2,t,t),e.clip(),r(u,d,i*o*1.15,s);for(let e=0;e<c;e+=1){let t=e/c*Math.PI*2+n()*.5,l=i*a*(.6+n()*.4);r(u+Math.cos(t)*l,d+Math.sin(t)*l*.75,i*o*(.6+n()*.4),s)}e.restore()})}var A=6;function j(c){S();let _=w(c,`ink-noise`,256,D);_.wrapU=d.WRAP_ADDRESSMODE,_.wrapV=d.WRAP_ADDRESSMODE;let v=Array.from({length:A},(e,t)=>w(c,`ink-crack${String(t)}`,512,(e,n)=>E(e,n,101+t*7919))),y=new a(`ink-flash`,{width:1024,height:512},c,!0);y.hasAlpha=!0;let b=y.getContext();b.clearRect(0,0,1024,512),O(b,256),y.update();let x=new a(`ink-dust`,{width:1024,height:512},c,!0);x.hasAlpha=!0;let T=x.getContext();T.clearRect(0,0,1024,512),k(T,256),x.update();let j=o.Zero(),M=new i(`ink-dustPs`,240,c);M.particleTexture=x,M.isAnimationSheetEnabled=!0,M.spriteCellWidth=256,M.spriteCellHeight=256,M.startSpriteCellID=0,M.endSpriteCellID=7,M.spriteCellLoop=!1,M.spriteCellChangeSpeed=1,M.spriteRandomStartCell=!1,M.blendMode=i.BLENDMODE_STANDARD,M.emitter=j,M.emitRate=0,M.minLifeTime=.45,M.maxLifeTime=.65,M.minSize=2.4,M.maxSize=3.6,M.minInitialRotation=0,M.maxInitialRotation=Math.PI*2,M.renderingGroupId=0,M.start();let N=1,P=null,F=[],I=0;function L(t,n,r){I+=1;let i=new e(`ink${String(I)}`,c,{vertex:`ink`,fragment:t},{attributes:[`position`,`uv`],uniforms:[`worldViewProjection`,...n],samplers:r,needAlphaBlending:!0});return i.backFaceCulling=!1,i}function R(e,t,i){let a=[],o=[],s=[];for(let n=0;n<=40;n+=1){let r=n/40,c=-t/2+r*t;for(let[t,n]of[[-1,0],[1,1]]){let s=e+t*i/2;a.push(Math.cos(c)*s-e,0,Math.sin(c)*s),o.push(r,n)}if(n<40){let e=n*2;s.push(e,e+1,e+2,e+1,e+3,e+2)}}let l=new n(`ink-slash${String(I)}`,c),u=new r;return u.positions=a,u.uvs=o,u.indices=s,u.applyToMesh(l),l}return{crack(e,n,r,i=l.FromHexString(C)){let a=t.CreateGround(`ink-crackMesh${String(I)}`,{width:1,height:1},c),o=L(`inkMark`,[`reveal`,`erode`,`colour`,`opacity`],[`mask`,`noise`]);o.setTexture(`mask`,v[Math.floor(Math.random()*A)]??v[0]??_),o.setTexture(`noise`,_),o.setColor3(`colour`,i),o.setFloat(`opacity`,.9),o.setFloat(`reveal`,0),o.setFloat(`erode`,0),a.material=o,a.isPickable=!1,a.position.set(e.x,.015+F.length*3e-4,e.z),a.rotation.y=Math.random()*Math.PI*2,a.scaling.setAll(n),F.push({mesh:a,material:o,age:0,life:r,step:(e,t)=>{t!==null&&(t.setFloat(`reveal`,Math.min(1,e/.12)**.6),t.setFloat(`erode`,e<.5?0:(e-.5)/.5*1.05))}})},slash(e,t){let n=R(1.6,Math.PI*.8,.9),r=L(`inkSlash`,[`head`,`tail`,`core`,`rim`],[`noise`]);r.setTexture(`noise`,_),r.setColor3(`core`,new l(1.8,1.8,1.85)),r.setColor3(`rim`,l.FromHexString(C)),r.setFloat(`head`,0),r.setFloat(`tail`,0),n.material=r,n.isPickable=!1,n.renderingGroupId=1,n.position.copyFrom(e),n.rotation.y=Math.atan2(-t.z,t.x)+Math.PI/2,n.rotation.z=(Math.random()-.5)*.9,n.rotation.x=.35,F.push({mesh:n,material:r,age:0,life:.3,step:(e,t)=>{t!==null&&(t.setFloat(`head`,Math.min(1,e/.35)),t.setFloat(`tail`,e<.35?0:(e-.35)/.65))}})},flash(e,r,i=1){let a=t.CreatePlane(`ink-flashMesh${String(I)}`,{size:1},c);a.billboardMode=n.BILLBOARDMODE_ALL;let o=L(`inkFlip`,[`frame`,`glow`],[`sheet`]);o.setTexture(`sheet`,y),o.setFloat(`frame`,0),o.setFloat(`glow`,1.7),a.material=o,a.isPickable=!1,a.renderingGroupId=i,a.position.copyFrom(e),a.scaling.setAll(r),F.push({mesh:a,material:o,age:0,life:.32,step:(e,t)=>t?.setFloat(`frame`,Math.min(7,e*8))})},dust(e,t,n,r,i){j.copyFrom(e),M.minEmitBox=new o(-n,0,-n),M.maxEmitBox=new o(n,.1,n),M.direction1=new o(-n,r,-n),M.direction2=new o(n,r*1.6,n),M.minEmitPower=.6,M.maxEmitPower=1.4,M.color1=new u(i.r,i.g,i.b,.75),M.color2=new u(i.r*.94,i.g*.94,i.b*.94,.65),M.colorDead=new u(i.r,i.g,i.b,0),M.manualEmitCount=(M.manualEmitCount>0?M.manualEmitCount:0)+t},spikes(e,n){P??=p(c,`ink-spikeMat`,n,h);let r=6+Math.floor(Math.random()*3);for(let n=0;n<r;n+=1){let r=n===0?3.2+Math.random()*.8:1.4+Math.random()*1.6,i=n===0?.75:.4+Math.random()*.35,a=t.CreateCylinder(`ink-spike${String(I)}`,{height:r,diameterTop:0,diameterBottom:i*2,tessellation:4+Math.floor(Math.random()*3)},c);I+=1,a.bakeTransformIntoVertices(s.Translation(0,r/2,0)),a.convertToFlatShadedMesh(),a.material=P,g(a,m*1.2,f),a.isPickable=!1;let o=Math.random()*Math.PI*2,l=n===0?.1:.7+Math.random()*.8;a.position.set(e.x+Math.cos(o)*l,0,e.z+Math.sin(o)*l),a.rotation.set(Math.sin(o)*l*.45,Math.random()*Math.PI,-Math.cos(o)*l*.45),a.scaling.set(1,.001,1);let u=n*.025;F.push({mesh:a,material:null,age:-u,life:1.2,step:(e,t,n)=>{if(e<0)return;let r=Math.min(1,e/.07),i=r<1?1-(1-r)**3:1+Math.sin(Math.min(1,(e-.07)/.1)*Math.PI)*.12,a=e<.65?0:(e-.65)/.35;n.scaling.y=Math.max(.001,i*(1-a*a)),n.position.y=-a*.4}})}},setPace(e){N=e},update(e){M.updateSpeed=.01*N;for(let t=F.length-1;t>=0;--t){let n=F[t];if(n===void 0)continue;n.age+=e;let r=n.age/n.life;if(r>=1){n.mesh.dispose(),n.material?.dispose(),F.splice(t,1);continue}n.step(r,n.material,n.mesh)}},dispose(){for(let e of F)e.mesh.dispose(),e.material?.dispose();F.length=0,M.dispose(),x.dispose(),P?.dispose(),_.dispose();for(let e of v)e.dispose();y.dispose()}}}export{j as t};