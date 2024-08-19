!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self)["zhuba-charts"]={})}(this,(function(t){"use strict";function n(t,n){const{type:e,children:r,flex:o=r.map((()=>1)),padding:i=40}=n,[a,c,s,u]="col"===e?["y","height","width","x"]:["x","width","height","y"],f=o.reduce(((t,n)=>t+n)),l=t[c]-i*(r.length-1),d=o.map((t=>l*(t/f))),h=[];for(let y=t[a],x=0;x<d.length;y+=d[x]+i,x+=1)h.push({[a]:y,[c]:d[x],[u]:t[u],[s]:t[s]});return h}function e(t){return t}function r(...t){return t.reduce(((t,n)=>e=>n(t(e))),e)}function o(t){const n=t.length;return function e(...r){const o=0===r.length?[void 0]:r;return o.length>=n?t(...o):e.bind(null,...o)}}function i(t,n){return n*Math.ceil(t/n)}function a(t,n){return n*Math.floor(t/n)}function c(t){return Math.round(1e12*t)/1e12}function s(t,n){return Math.log(t)/Math.log(n)}function u(t,n){const[e,r]=t;return[n.floor(e),n.ceil(r)]}function f(t,n=e){return Object.entries(t).reduce(((t,[e,r])=>(t[e]=n(r,e),t)),{})}function l(t,n){for(const[e,r]of Object.entries(n))void 0!==r&&(t[e]=r)}function d(t){return void 0!==t&&!Number.isNaN(t)}function h([t,n],[e,r]){return y(t,e)&&y(n,r)}function y(t,n,e=1e-5){return Math.abs(t-n)<e}function x([t,n],[e=0,r=0]=[]){return Math.sqrt((t-e)**2+(n-r)**2)}function p([t,n],[e,r]){return[t-e,n-r]}function m([t,n]){return Math.atan2(n,t)}function g(t){return 180*t/Math.PI}function b(t,n=(t=>t[0]),e=(t=>t[1])){return t.filter(((r,o)=>t.findIndex((t=>{return i=t,y(n(o=r),n(i))&&y(e(o),e(i));var o,i}))===o))}function k(t,n=(t=>t)){const e=new Map;for(const r of t){const t=n(r),o=e.get(t);o?o.push(r):e.set(t,[r])}return e}function v(t,n,e){const r=Math.sqrt(50),o=Math.sqrt(10),i=Math.sqrt(2),a=Math.abs(n-t)/Math.max(0,e);let c=10**Math.floor(Math.log(a)/Math.LN10);const s=a/c;return s>=r?c*=10:s>=o?c*=5:s>=i&&(c*=2),c}function w(t,n,e){if(t===n)return[t];const r=v(t,n,e),o=Math.ceil(t/r),i=Math.floor(n/r),a=Math.ceil(i-o+1),s=new Array(a);for(let u=0;u<a;u+=1)s[u]=c((o+u)*r);return s}function A(t,n,r=0,o=t.length,i=e){let a=r,c=o;for(;a<c;){const e=a+c>>>1;i(t[e])<n?a=e+1:c=e}return a}function M(t){return t[t.length-1]}function z(t){return t[0]}function S(t,n){const e=[t];for(;e.length;){const t=e.pop();n(t),e.push(...t.children||[])}}function O(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function $(t,n){t&&t.appendChild(n)}function j(t,{data:n,encodings:e={},padding:r=0,paddingLeft:o=45,paddingRight:i=45,paddingBottom:a=45,paddingTop:c=60}){const{x:s,y:u}=e,f=s?Array.from(k(n,(t=>t[s])).keys()):[void 0],l=u?Array.from(k(n,(t=>t[u])).keys()):[void 0],d=f.length,h=l.length,y=[],x=(t.width-o-i-r*(d-1))/d,p=(t.height-c-a-r*(h-1))/h;for(let m=0;m<d;m+=1)for(let n=0;n<h;n+=1){const e=t=>t.filter((t=>(t=>t[s]===f[m]||void 0===f[m])(t)&&(t=>t[u]===l[n]||void 0===l[n])(t)));y.push({x:o+t.x+r*m+m*x,y:i+t.y+r*n+n*p,width:x,height:p,transform:e})}return y}function L(t,n){const{children:e=[]}=n;return new Array(e.length).fill(0).map((()=>({...t})))}function W(t,e={layer:L,col:n,row:n,facet:j}){const r=function(t){const n=[];return S(t,(t=>n.push(t))),n}(t),{width:o=640,height:i=480,x:a=0,y:c=0}=t,s=new Map([[t,{width:o,height:i,x:a,y:c}]]);for(const n of r){const t=s.get(n),{children:r=[],type:o}=n,i=e[o];if(i){const e=i(t,n);if(i!==j)for(const[t,n]of Object.entries(r))s.set(n,e[t]);else for(const t of r)for(const n of e)s.set({...t},n)}}const u=k(Array.from(s.entries()),(([,t])=>{return`${(n=t).x}-${n.y}-${n.width}-${n.height}`;var n}));return Array.from(u.values()).map((t=>[t[0][1],t.map((t=>t[0]))]))}function C(t,n){return E("line",t,n)}function I(t,n){const{width:e,height:r,x:o,y:i}=n;return E("rect",t,{...n,width:Math.abs(e),height:Math.abs(r),x:e>0?o:o+e,y:r>0?i:i+r})}function P(t,n){const{d:e}=n,r=Array.isArray(e)?e.flat().join(" "):e;return E("path",t,{...n,d:r})}function R(t,n){return E("circle",t,n)}function q(t,n){const{text:e,...r}=n,o=E("text",t,r);return o.textContent=e,o}function E(t,n,e){const{group:r}=n,o=O(t);return function(t,n){for(const[e,r]of Object.entries(n)){const n=e.replace(/[A-Z]/g,(t=>`-${t.toLocaleLowerCase()}`));t.setAttribute(n,r)}}(o,e),$(r,o),o}function Y(t,n,...e){const{group:r}=n;!function(t,n){const e=t.getAttribute("transform")||"",r=e?`${e} `:"";t.setAttribute("transform",`${r}${n}`)}(r,`${t}(${e.join(", ")})`)}function D(t,n,{line:e=C,circle:r=R,text:o=q,rect:i=I,path:a=P,context:c=(t=>t)}={}){const s=c(function(t,n){const e=O("svg");e.setAttribute("width",t),e.setAttribute("height",n),e.setAttribute("viewBox",`0 0 ${t} ${n}`);const r=O("g");return $(e,r),{node:e,group:r}}(t,n));return{line:t=>e(s,t),circle:t=>r(s,t),text:t=>o(s,t),rect:t=>i(s,t),path:t=>a(s,t),restore:()=>function(t){const{group:n}=t,{parentNode:e}=n;t.group=e}(s),save:()=>function(t){const{group:n}=t,e=O("g");$(n,e),t.group=e}(s),scale:(...t)=>function(t,n,e){Y("scale",t,n,e)}(s,...t),rotate:(...t)=>function(t,n){Y("rotate",t,n)}(s,...t),translate:(...t)=>function(t,n,e){Y("translate",t,n,e)}(s,...t),node:()=>s.node,group:()=>s.group}}function F(t=0,n=0){return X("translate",(([e,r])=>[e+t,r+n]))}function T(t=1,n=1){return X("scale",(([e,r])=>[e*t,r*n]))}function X(t,n){return n.type=()=>t,n}const B=o((function(t,n){const{x:e,y:r,width:o,height:i}=n;return[T(o,i),F(e,r)]}));const N=o((function(t,n){const{width:e,height:r}=n,{innerRadius:o=0,outerRadius:i=1,startAngle:a=-Math.PI/2,endAngle:c=Math.PI/2*3}=t,s=e/r,u=s>1?1/s:1,f=s>1?1:s;return[F(0,-.5),X("reflectY",T(1,-1)),F(0,.5),T(c-a,i-o),F(a,o),X("polar",(([t,n])=>[n*Math.cos(t),n*Math.sin(t)])),T(u,f),T(.5,.5),F(.5,.5)]}));const Z=o((function(t,n){return[X("transpose",(([t,n])=>[n,t])),F(-.5,-.5),X("reflectX",T(-1,1)),F(.5,.5)]}));function J({name:t,optional:n=!0,...e}){return{name:t,optional:n,...e}}function U(t={}){return{x:J({name:"x",optional:!1}),y:J({name:"y",optional:!1}),stroke:J({name:"stroke"}),fill:J({name:"fill"}),...t}}function G(t,n){const{stroke:e,fill:r}=n;return{...e&&{stroke:e[t]},...r&&{fill:r[t]}}}function H([t],n){return G(t,n)}function K([t,...n]){return[["M",...t],...n.map((t=>["L",...t]))]}function Q(t){return[...K(t),["Z"]]}function V([t,n,e,r,o]){const i=x(t,n),a=x(t,r),c=function(t,n){const e=m(t),r=m(n);return e<r?r-e:2*Math.PI-(e-r)}(p(n,t),p(e,t)),s=c>Math.PI?1:0,u=c>Math.PI?1:0;return[["M",n[0],n[1]],["A",i,i,0,s,1,e[0],e[1]],["L",r[0],r[1]],["A",a,a,0,u,0,o[0],o[1]],["Z"]]}function _([t,[n,e]]){const[r,o]=t,i=[r,o-e],a=[r,o+e],c=[r,o+n],s=[r,o-n];return[...V([t,i,a,c,s]),...V([t,a,i,s,c])]}function tt(t,n,{x1:e,y1:r,x2:o,y2:i,...a}){const c=[e,r],s=[o,r],u=[o,i],f=[e,i],l=(n.isTranspose()?[f,c,s,u]:[c,s,u,f]).map(n),[d,y,m,g]=l;if(!n.isPolar()){const[n,e]=p(m,d),[r,o]=d;return t.rect({x:r,y:o,width:n,height:e,...a})}const b=n.center(),[k,v]=b;if(!h(d,y)||!h(m,g))return t.path({d:V([b,...l]),...a});return function(t,{cx:n,cy:e,r1:r,r2:o,...i}){const a=t.path({...i,d:_([[n,e],[r,o]]),stroke:"none"});return[t.circle({...i,fill:"none",r:r,cx:n,cy:e}),a,t.circle({...i,fill:"none",r:o,cx:n,cy:e})]}(t,{cx:k,cy:v,r1:x(b,m),r2:x(b,d),...a})}function nt(t,n,{X1:e,Y1:r,X2:o,Y2:i,I:a,...c}){const s=n.isPolar()?[...a,a[0]]:a,u=[...s.map((t=>[e[t],r[t]])),...s.map((t=>[o[t],i[t]])).reverse()].map(n);return n.isPolar()?function(t,{points:n,...e}){const r=n.length,o=r/2,i=t.path({d:Q(n),...e,stroke:"none"}),a=t.path({d:K(n.slice(0,o)),...e,fill:"none"});return[t.path({d:K(n.slice(o,r)),...e,fill:"none"}),i,a]}(t,{points:u,...c}):t.path({d:Q(u),...c})}function et(t,n){const e=(e,r,o,i,a,c)=>{for(const[n,{optional:s,scale:u}]of Object.entries(t))if(!s){if(!i[n])throw new Error(`Missing Channel: ${n}`);if(!("band"!==u||o[n]&&o[n].bandWidth))throw new Error(`${n} channel needs band scale.`)}return n(e,r,o,i,a,c)};return e.channels=()=>t,e}const rt=et(U({x:J({name:"x",scale:"band",optional:!1}),z:J({name:"z",scale:"band"}),y1:J({name:"y1",optional:!1})}),(function(t,n,e,r,o,i){const a={z:0,x:0},{x:c,z:s}=e,{x:u,y:f,y1:l,z:d=[]}=r,h=c.bandWidth(),y=s&&s.bandWidth?s.bandWidth():1,x=h*y;return Array.from(n,(n=>{const{z:e,x:c,...s}=a,y=(d[n]||e)*h,p=(u[n]||c)+y;return tt(t,i,{...s,...o,...G(n,r),x1:p,y1:f[n],x2:p+x,y2:l[n]})}))}));const ot=et(U({x:J({name:"x",scale:"band",optional:!1}),y:J({name:"y",scale:"band",optional:!1})}),(function(t,n,e,r,o,i){const a={},{x:c,y:s}=e,{x:u,y:f}=r,l=c.bandWidth(),d=s.bandWidth();return Array.from(n,(n=>tt(t,i,{...a,...o,...G(n,r),x1:u[n],y1:f[n],x2:u[n]+l,y2:f[n]+d})))}));const it=et(U({x1:J({name:"x1",optional:!1}),y1:J({name:"y1",optional:!1})}),(function(t,n,e,r,o,i){const a={},{x:c,y:s,x1:u,y1:f}=r;return Array.from(n,(n=>tt(t,i,{...a,...o,...G(n,r),x1:c[n],y1:s[n],x2:u[n],y2:f[n]})))}));const at=et(U({z:J({name:"z"})}),(function(t,n,e,r,o,i){const a={},{x:c,y:s,z:u}=r,f=u?k(n,(t=>u[t])).values():[n];return Array.from(f,(n=>function(t,n,{X:e,Y:r,I:o,...i}){const a=K((n.isPolar()?[...o,o[0]]:o).map((t=>n([e[t],r[t]]))));return t.path({d:a,...i})}(t,i,{...a,...o,...H(n,r),X:c,Y:s,I:n,fill:"none"})))}));const ct=et(U({r:J({name:"r"})}),(function(t,n,e,r,o,i){const a={r:3,fill:"none"},{x:c,y:s,r:u=[]}=r;return Array.from(n,(n=>{const{r:e,...f}=a,l=u[n]||e;return function(t,n,{cx:e,cy:r,r:o,...i}){const[a,c]=n([e,r]);return t.circle({cx:a,cy:c,r:o,...i})}(t,i,{...f,...o,...G(n,r),cx:c[n],cy:s[n],r:l})}))}));const st=et(U({x1:J({name:"x1",optional:!1}),y1:J({name:"y1",optional:!1}),z:J({name:"z"})}),(function(t,n,e,r,o,i){const a={},{x:c,y:s,z:u,x1:f,y1:l}=r,d=u?k(n,(t=>u[t])).values():[n];return Array.from(d,(n=>nt(t,i,{...a,...o,...H(n,r),X1:c,Y1:s,X2:f,Y2:l,I:n})))}));const ut=et(U({rotate:J({name:"rotate"}),fontSize:J({name:"fontSize"}),fontWeight:J({name:"fontWeight"}),text:J({name:"text",optional:!1,scale:"identity"})}),(function(t,n,e,r,o,i){const a=0,c=14,s="normal",{x:u,y:f,text:l,rotate:d=[],fontSize:h=[],fontWeight:y=[]}=r;return Array.from(n,(n=>function(t,n,{x:e,y:r,rotate:o,text:i,...a}){const[c,s]=n([e,r]);t.save(),t.translate(c,s),t.rotate(o);const u=t.text({text:i,x:0,y:0,...a});return t.restore(),u}(t,i,{...o,...G(n,r),x:u[n],y:f[n],rotate:d[n]||a,fontSize:h[n]||c,fontWeight:y[n]||s,text:l[n]})))}));const ft=et(U({x1:J({name:"x1",optional:!1}),y1:J({name:"y1",optional:!1})}),(function(t,n,e,r,o,i){const a={},{x:c,y:s,x1:u,y1:f}=r;return Array.from(n,(n=>function(t,n,{x1:e,y1:r,x2:o,y2:i,...a}){const[c,s]=[[e,r],[o,i]].map(n);return t.line({x1:c[0],y1:c[1],x2:s[0],y2:s[1],...a})}(t,i,{...a,...o,...G(n,r),x1:c[n],y1:s[n],x2:u[n],y2:f[n]})))}));const lt=et({d:J({name:"d",optional:!1,scale:"identity"}),fill:J({name:"fill"}),stroke:J({name:"stroke"})},(function(t,n,e,r,o,i){const a={},{d:c}=r;return Array.from(n,(n=>function(t,n,e){return t.path(e)}(t,0,{...a,...o,...G(n,r),d:c[n]})))}));function dt(t,n,e){return n*(1-t)+e*t}function ht(t,n,e){const[r,o,i]=yt(n),[a,c,s]=yt(e),u=dt(t,r,a),f=dt(t,o,c),l=dt(t,i,s);return function(t,n,e){const r=(t<<16|n<<8|e).toString(16);return`#${new Array(Math.abs(r.length-7)).join("0")}${r}`}(parseInt(u),parseInt(f),parseInt(l))}function yt(t){const n=[];for(let e=1;e<7;e+=2)n.push(parseInt(`0x${t.slice(e,e+2)}`));return n}function xt({domain:[t,n],range:[e,r],interpolate:o=dt}){const c=i=>{const a=(i-(c=t))/(n-c);var c;return o(a,e,r)};return c.ticks=(e=10)=>w(t,n,e),c.nice=(e=10)=>{if(t===n)return;const r=v(t,n,e);[t,n]=u([t,n],{floor:t=>a(t,r),ceil:t=>i(t,r)})},c}function pt({domain:t,range:n}){const e=JSON.stringify,r=new Map(t.map(((t,n)=>[e(t),n])));return t=>{const o=r.get(e(t));return n[o%n.length]}}function mt(t){const{bandRange:n,bandWidth:e,step:r}=function({domain:t,range:n,padding:e,margin:r=e}){const[o,i]=n,a=t.length,c=(i-o)/(2*r+a-e),s=c*(1-e),u=(t,n)=>o+r*c+c*n;return{step:c,bandWidth:s,bandRange:new Array(a).fill(0).map(u)}}(t),o=pt({...t,range:n});return o.bandWidth=()=>e,o.step=()=>r,o}function gt({domain:t,range:n}){const e=Math.min(t.length,n.length-1),r=r=>{const o=A(t,r);return n[-1===o?e:o]};return r.thresholds=()=>t,r}function bt({domain:t,...n}){const e=t=>t.getTime(),r=xt({domain:t.map(e),...n}),o=t=>r(e(t));return o.nice=t=>r.nice(t),o.ticks=t=>r.ticks(t).map((t=>new Date(t))),o}function kt({domain:t,base:n=Math.E,...e}){const r=t=>Math.log(t);let o=xt({domain:t.map(r),...e});const i=t=>o(r(t));return i.ticks=(e=5)=>{const[r,o]=t.map((t=>s(t,n)));return w(r,o,e).map((t=>n**t))},i.nice=()=>{t=u(t,{floor:t=>n**Math.floor(s(t,n)),ceil:t=>n**Math.ceil(s(t,n))}),o=xt({domain:t.map(r),...e})},i}function vt(t){return(n,r,o,{domain:i,label:a,tickCount:c=10,formatter:s=e,tickLength:u=5,grid:f=!1,tick:l=!0})=>{if(0===i.length)return;const d=!!r.bandWidth,h=!!r.ticks,y=d?r.bandWidth()/2:0,x=h?r.ticks(c):i,p=o.center(),m=`${+o.isPolar()}${+o.isTranspose()}`,g={tickLength:u,fontSize:10,center:p,isOrdinal:d},{grid:b,ticks:k,label:v,start:w,end:A}=t[m],z=x.map((t=>{const[n,e]=o(w(t,r,y));return{x:n,y:e,text:s(t)}})),S=(()=>{if(!d)return M(z);const t=M(x),[n,e]=o(w(t,r,2*y));return{x:n,y:e}})();f&&b&&b(n,z,A(o)),l&&k&&k(n,z,g),a&&v&&v(n,a,S,g)}}function wt(t,n,{tickLength:e,fontSize:r}){for(const{x:o,y:i,text:a}of n){const n=o,c=i+e;t.line({x1:o,y1:i,x2:n,y2:c,stroke:"currentColor",class:"tick"}),t.text({text:a,fontSize:r,x:o,y:c,textAnchor:"middle",dy:"1em",class:"text"})}}function At(t,n,{tickLength:e,fontSize:r}){for(const{x:o,y:i,text:a}of n){const n=o-e,c=i;t.line({x1:o,y1:i,x2:n,y2:c,stroke:"currentColor",class:"tick"}),t.text({text:a,fontSize:r,x:n,y:i,textAnchor:"end",dy:"0.5em",dx:"-0.5em",class:"text"})}}function Mt(t,n,{tickLength:e,fontSize:r,center:o}){for(const{x:i,y:a,text:c}of b(n,(t=>t.x),(t=>t.y))){const{tickRotation:n,textRotation:s}=zt(o,[i,a]),[u,f]=[0,e],l=0===s?"1.2em":"-0.5em";t.save(),t.translate(i,a),t.rotate(g(n)),t.line({x1:0,y1:0,x2:u,y2:f,stroke:"currentColor",fill:"currentColor",class:"tick"}),t.save(),t.translate(u,f),t.rotate(g(s)),t.text({text:`${c}`,x:0,y:0,textAnchor:"middle",fontSize:r,fill:"currentColor",dy:l,class:"text"}),t.restore(),t.restore()}}function zt(t,[n,e]){const r=m(p([n,e],t)),o=r<0?Math.PI:0;return{tickRotation:r-Math.PI/2,textRotation:o}}function St(t,n,e){const[,r]=e;for(const{x:o,y:i}of n)t.line({x1:o,y1:i,x2:o,y2:r,stroke:"#eee",class:"grid"})}function Ot(t,n,e){const[r]=e;for(const{x:o,y:i}of n)t.line({x1:o,y1:i,x2:r,y2:i,stroke:"#eee",class:"grid"})}function $t(t,n,e){const[r,o]=e;for(const{x:i,y:a}of n)t.line({x1:i,y1:a,x2:r,y2:o,stroke:"#eee",class:"grid"})}function jt(t,n,e){const[r,o]=e;for(const{x:i,y:a}of n){const n=x(e,[i,a]);t.circle({fill:"none",stroke:"#eee",cx:r,cy:o,r:n,class:"grid"})}}function Lt({fontSize:t}){return{textAnchor:"end",class:"label",fontWeight:"bold",fontSize:t}}const Wt=vt({"00":{start:(t,n,e)=>[n(t)+e,1],end:t=>t([0,0]),grid:St,ticks:wt,label:function(t,n,{x:e,y:r},{isOrdinal:o,tickLength:i,...a}){const c=r+i,s=o?n:`${n} →`;t.text({...Lt(a),text:s,x:e,y:c,dy:"2.2em"})}},"01":{start:(t,n,e)=>[n(t)+e,1],end:t=>t([0,0]),grid:Ot,ticks:At,label:function(t,n,{x:e,y:r},{isOrdinal:o,...i}){const a=o?n:`↓ ${n}`;t.text({...Lt(i),text:a,x:e,y:r,dy:"2.2em"})}},10:{start:(t,n,e)=>[n(t)+e,0],grid:$t,ticks:Mt,end:t=>t.center()},11:{start:(t,n,e)=>[n(t)+e,1],grid:jt,ticks:At,end:t=>t.center()}}),Ct=vt({"00":{start:(t,n,e)=>[0,n(t)+e],end:t=>t([1,0]),grid:Ot,ticks:At,label:function(t,n,{x:e,y:r},{isOrdinal:o,...i}){const a=o?n:`↑ ${n}`;t.text({...Lt(i),text:a,x:e,y:r,dy:"-1em"})}},"01":{start:(t,n,e)=>[0,n(t)+e],end:t=>t([1,0]),grid:St,ticks:function(t,n,{tickLength:e,fontSize:r}){for(const{x:o,y:i,text:a}of n){const n=o,c=i-e;t.line({x1:o,y1:i,x2:n,y2:c,stroke:"currentColor",class:"tick"}),t.text({text:a,fontSize:r,x:o,y:c,textAnchor:"middle",dy:"-0.3em",class:"text"})}},label:function(t,n,{x:e,y:r},{isOrdinal:o,tickLength:i,...a}){const c=r-i,s=o?n:`${n} →`;t.text({...Lt(a),text:s,x:e,y:c,dy:"-1.2em"})}},10:{start:(t,n,e)=>[0,n(t)+e],grid:jt,ticks:At,end:t=>t.center()},11:{start:(t,n,e)=>[0,n(t)+e],grid:$t,ticks:Mt,end:t=>t.center()}});function It(t,n,r,{x:o,y:i,width:a=64,marginLeft:c=6,swatchSize:s=10,fontSize:u=10,formatter:f=e,domain:l,label:d}){t.save(),t.translate(o,i),d&&t.text({text:d,x:0,y:0,fontWeight:"bold",fontSize:u,textAnchor:"start",dy:"1em"});const h=d?2*s:0;for(const[e,y]of Object.entries(l)){const r=n(y),o=a*e;t.rect({x:o,y:h,width:s,height:s,stroke:r,fill:r});const i=o+c+s,l=h+s;t.text({text:f(y),x:i,y:l,fill:"currentColor",fontSize:u})}t.restore()}function Pt(t,n,r,{x:o,y:i,width:a=120,height:c=10,domain:s,tickCount:u=5,tickLength:f=c+5,formatter:l=e,fontSize:d=10,label:h}){t.save(),t.translate(o,i),h&&t.text({text:h,x:0,y:0,fontWeight:"bold",fontSize:d,textAnchor:"start",dy:"1em"});const y=h?2*c:0,x=[z(s),M(s)],p=xt({domain:[0,a],range:x});for(let e=0;e<a;e+=1){const r=n(p(e));t.line({x1:e,y1:y,x2:e,y2:y+c,stroke:r})}const m=xt({domain:x,range:[0,a]});wt(t,(n.thresholds?[x[0],...n.thresholds(),x[1]]:m.ticks(u)).map((t=>({x:m(t),y:y,text:l(t)}))),{fontSize:d,tickLength:f}),t.restore()}function Rt(t,n=10,r=e){const o=function(t,n){return Math.min(...t.map(n))}(t,r),c=function(t,n){return Math.max(...t.map(n))}(t,r),s=v(o,c,n),u=a(o,s),f=i(c,s),l=v(u,f,n),d=w(u,f,n);return Array.from(new Set([a(u,l),...d,i(f,l)]))}function qt(t){if("function"==typeof t)return t;const{type:n,...e}=t;if("interval"===n)return rt;if("line"===n)return at;if("area"===n)return st;if("text"===n)return ut;if("link"===n)return ft;if("cell"===n)return ot;if("rect"===n)return it;if("point"===n)return ct;if("path"===n)return lt;if("facet"===n){const t=()=>{};return t.channels=()=>({x:{name:"x",optional:!0},y:{name:"y",optional:!0}}),t}if("stackY"===n)return({index:t,values:n})=>{const{y:e,x:r}=n,o=r?Array.from(k(t,(t=>r[t])).values()):[t],i=new Array(t.length),a=new Array(t.length);for(const c of o)for(let t=0,n=0;n<c.length;t=i[c[n]],n+=1){const r=c[n];a[r]=t,i[r]=t+e[r]}return{index:t,values:{...n,y:i,y1:a}}};if("normalizeY"===n)return({index:t,values:n})=>{const{x:e}=n,r=e?Array.from(k(t,(t=>e[t])).values()):[t],o=Object.fromEntries(["y1","y"].filter((t=>n[t])).map((n=>[n,new Array(t.length)])));for(const i of r){const t=i.flatMap((t=>Object.keys(o).map((e=>n[e][t])))),e=Math.max(...t);for(const r of i)for(const t of Object.keys(o))o[t][r]=n[t][r]/e}return{index:t,values:{...n,...o}}};if("symmetryY"===n)return({index:t,values:n})=>{const{x:e}=n,r=e?Array.from(k(t,(t=>e[t])).values()):[t],o=Object.fromEntries(["y1","y"].filter((t=>n[t])).map((n=>[n,new Array(t.length)]))),i=new Array(r.length);for(const[c,s]of Object.entries(r)){const t=s.flatMap((t=>Object.keys(o).map((e=>n[e][t])))),e=Math.min(...t),r=Math.max(...t);i[c]=(e+r)/2}const a=Math.max(...i);for(const[c,s]of Object.entries(r)){const t=a-i[c];for(const e of s)for(const r of Object.keys(o))o[r][e]=n[r][e]+t}return{index:t,values:{...n,...o}}};if("binX"===n)return function({count:t=10,channel:n,aggregate:e=(t=>t.length)}={}){return({index:r,values:o})=>{const{[n]:i,x:a,x1:c,...s}=o,u=Object.keys(s),f=Rt(a,t),l=f.length,d=k(r,(t=>A(f,a[t])-1)),h=new Array(l-1).fill(0).map(((t,n)=>n));return{index:h.filter((t=>d.has(t))),values:Object.fromEntries([...u.map((t=>[t,h.map((n=>{if(d.has(n))return o[t][z(d.get(n))]}))])),[n,h.map((t=>d.has(t)?e(d.get(t).map((t=>o[t]))):0))],["x",f.slice(0,l-1)],["x1",f.slice(1,l)]])}}}(e);if("cartesian"===n)return B(e);if("transpose"===n)return Z(e);if("polar"===n)return N(e);if("band"===n)return mt(e);if("linear"===n)return Yt(xt,e);if("time"===n)return Yt(bt,e);if("log"===n)return Yt(kt,e);if("identity"===n)return t=>t;if("ordinal"===n)return pt(e);if("dot"===n)return function(t){return mt({...t,padding:1})}(e);if("quantile"===n)return function({domain:t,range:n,...e}){const r=n.length-1,o=t.sort(((t,n)=>t-n)),i=(o.length-1)/(r+1);return gt({domain:new Array(r).fill(0).map(((t,n)=>{const e=(n+1)*i,r=Math.floor(e),a=r+1;return o[r]*(a-e)+o[a]*(e-r)})),range:n,...e})}(e);if("quantize"===n)return function({domain:[t,n],range:e,...r}){const o=e.length-1,i=(n-t)/(o+1);return gt({domain:new Array(o).fill(0).map(((t,n)=>i*(n+1))),range:e,...r})}(e);if("threshold"===n)return gt(e);if("axisX"===n)return Et(Wt,e);if("axisY"===n)return Et(Ct,e);if("legendSwatches"===n)return Et(It,e);if("legendRamp"===n)return Et(Pt,e);throw new Error(`Unknown node type: ${t.type}`)}function Et(t,n){return(e,r,o)=>t(e,r,o,n)}function Yt(t,n){const{nice:e=!0,tickCount:r=10}=n,o=t(n);return e&&o.nice(r),o}const Dt=["#5B8FF9","#5AD8A6","#5D7092","#F6BD16","#6F5EF9","#6DC8EC","#945FB9","#FF9845","#1E9493","#FF99C3"],Ft=["#9DF5CA","#61DDAA","#42C090","#19A576","#008A5D"];function Tt(t,n){return f(t,(({values:t,name:e})=>{const r=n[Xt(e)];return t.map(r)}))}function Xt(t){return t.startsWith("x")?"x":t.startsWith("y")?"y":function(t){return"fill"===t||"stroke"===t}(t)?"color":t}function Bt(t,n){const e=[];let r,o;for(const[,{values:i=[],scale:a,field:c}]of n)e.push(...i),!r&&a&&(r=a),!o&&c&&(o=c);return{name:t,scale:r,values:e,field:o}}function Nt({name:t,scale:n,values:e},{type:r,domain:o,range:i}){return n||(r||((o||i||[]).length>2?Ht(t):void 0!==o?Kt(o)?Ht(t):Qt(o)?"time":"linear":Kt(e)?Ht(t):Qt(e)?"time":function(t){return 1===Array.from(new Set(t)).length}(e)?"identity":"linear"))}function Zt(t,{values:n},{domain:e,...r}){if(e)return e;switch(t){case"linear":case"log":case"quantize":return Vt(n,r);case"ordinal":case"dot":case"band":return _t(n);case"quantile":return function(t,n){return _t(t).sort()}(n);case"time":return function(t,n){return Vt(t,n).map((t=>new Date(t)))}(n,r);default:return[]}}function Jt(t,{name:n},{range:e}){if(e)return e;switch(t){case"linear":case"log":case"time":case"band":case"dot":return function(t){return"y"===t?[1,0]:"color"===t?[z(Ft),M(Ft)]:[0,1]}(n);case"ordinal":return Dt;case"quantile":case"quantize":case"threshold":return Ft;default:return[]}}function Ut(t,{name:n},{padding:e,interpolate:r,margin:o}){switch(t){case"linear":case"log":return r?{interpolate:r}:{interpolate:"color"===n?ht:dt};case"band":return{padding:void 0!==e?e:.1};case"dot":return{margin:void 0!==o?o:.5};default:return{}}}function Gt(t,{field:n},{label:e}){return void 0!==e?e:n}function Ht(t){return function(t){return"x"===t||"y"===t}(t)?"dot":"ordinal"}function Kt(t){return t.some((t=>{const n=typeof t;return"string"===n||"boolean"===n}))}function Qt(t){return t.some((t=>t instanceof Date))}function Vt(t,{zero:n=!1}={}){const e=t.filter(d);if(0===e.length)return[];const r=Math.min(...e);return[n?0:r,Math.max(...e)]}function _t(t){return Array.from(new Set(t.filter(d)))}function tn(t,n,e){const r=f(e,((t,e)=>({type:en(n,t,e),value:t})));switch(t){case"interval":return rn(function({x:t={type:"value",value:0},...n}){return{x:t,...n}}(an(r)));case"line":return on(sn(r));case"area":return rn(cn(an(sn(r))));case"link":return on(cn(r));case"point":return function({y:t={type:"value",value:0},...n}){return{y:t,...n}}(on(r));case"rect":return rn(function({x1:t={type:"value",value:0},...n}){return{x1:t,...n}}(an(r)));case"cell":return rn(r)}return r}function nn(t,{type:n,value:e}){return"transform"===n?t.map(e):"value"===n?t.map((()=>e)):t.map((t=>t[e]))}function en(t,n,e){if("function"==typeof n)return"transform";if("string"==typeof n){if(t.length&&void 0!==z(t)[n])return"field";if("fill"===(r=e)||"stroke"===r)return"constant"}var r;return"value"}function rn({fill:t=fn(),...n}){return{fill:t,...n}}function on({stroke:t=fn(),...n}){return{stroke:t,...n}}function an({y1:t={type:"value",value:0},...n}){return{y1:t,...n}}function cn({x:t,x1:n=t,...e}){return{x:t,x1:n,...e}}function sn({fill:t,stroke:n,z:e,...r}){return void 0===e&&(e=un(t)),void 0===e&&(e=un(n)),{fill:t,stroke:n,z:e,...r}}function un(t){if(void 0!==t&&"field"===t.type)return t}function fn(){return{type:"constant",value:Dt[0]}}function ln({data:t,type:n,encodings:e={},statistics:o=[],transforms:i=[],styles:a}){const c=r(...i.map(qt))(t),s=c.map(((t,n)=>n));const u=tn(n,c,e),f={},l={};for(const[r,m]of Object.entries(u))if(m){const{type:t,value:n}=m;"constant"===t?f[r]=n:l[r]=nn(c,m)}const d=r(...o.map(qt)),{values:h,index:y}=d({index:s,values:l}),x=qt({type:n}),p={};for(const[r,m]of Object.entries(x.channels())){const t=h[r],{optional:n}=m;if(t)p[r]=dn(m,t,u[r]);else if(!n)throw new Error(`Missing values for channel: ${r}`)}return{index:y,geometry:x,channels:p,styles:{...a,...f}}}function dn(t,n,e={}){const{type:r,value:o}=e;return{...t,..."field"===r&&{field:o},values:n}}function hn(t,{domain:n,label:e}){return{...t,domain:n,label:e}}function yn({type:t}){switch(t){case"linear":case"log":case"time":case"threshold":case"quantile":case"quantize":return"legendRamp";default:return"legendSwatches"}}function xn({x:t,y:n,paddingLeft:e}){return{x:t+e,y:n}}function pn({renderer:t,scales:n,guides:e,coordinates:o,geometries:i,width:a,height:c,x:s,y:u,paddingLeft:l=45,paddingRight:d=45,paddingBottom:h=45,paddingTop:y=65}){const x=i.map(ln),p=function(t,n){const e=k(t.flatMap(Object.entries),(([t])=>Xt(t))),r={};for(const[o,i]of e){const t=Bt(o,i),e=n[o]||{},a=Nt(t,e);r[o]={...e,...Ut(a,t,e),domain:Zt(a,t,e),range:Jt(a,t,e),label:Gt(0,t,e),type:a}}return r}(x.map((t=>t.channels)),n),m=function(t,n,e){const{x:r,y:o,color:i}=t,{x:a={},y:c={},color:s={}}=e,{display:u=!0}=a,{display:f=!0}=c,{display:l=!0}=s;return{...u&&r&&{x:{...hn(a,r),type:"axisX"}},...f&&o&&{y:{...hn(c,o),type:"axisY"}},...l&&i&&{color:{...hn(s,i),...xn(n),type:yn(i)}}}}(p,{x:s,y:u,paddingLeft:l},e),g=f(p,qt),b=f(m,qt);var v;const w=function({transforms:t=[],...n}){const e=t.flatMap((t=>t(n))),o=e.map((t=>t.type())),i=r(...e),{x:a,y:c,width:s,height:u}=n;return i.isPolar=()=>-1!==o.indexOf("polar"),i.isTranspose=()=>o.reduce(((t,n)=>t^"transpose"===n),!1),i.center=()=>[a+s/2,c+u/2],i}({x:s+l,y:u+y,width:a-l-d,height:c-y-h,transforms:(v=o,[...v,{type:"cartesian"}]).map(qt)});for(const[r,f]of Object.entries(b)){f(t,g[r],w)}for(const{index:r,geometry:f,channels:k,styles:A}of x){f(t,r,g,Tt(k,g),A,w)}}function mn(t){switch(t){case"layer":case"col":case"row":return!1;default:return!0}}t.plot=function(t){const{width:n=640,height:r=480,renderer:o}=t,i=D(n,r,o);!function(t){S(t,(({type:t,children:n,...e})=>{if(mn(t))return;if(!n||0===n.length)return;const r=["o:encodings","o:scales","o:guides","o:styles","a:coordinates","a:statistics","a:transforms","a:data"];for(const o of n)for(const t of r){const[n,r]=t.split(":");o[r]="o"===n?{...e[r],...o[r]}:o[r]||e[r]}}))}(t);const a=W(t);for(const[c,s]of a){const{transform:t=e,...n}=c,r=[],o={},a={};let u=[];const f=s.filter((({type:t})=>mn(t)));for(const e of f){const{scales:i={},guides:c={},coordinates:s=[],transforms:f=[],paddingLeft:d,paddingRight:h,paddingBottom:y,paddingTop:x,...p}=e;l(o,i),l(a,c),l(n,{paddingLeft:d,paddingRight:h,paddingBottom:y,paddingTop:x}),s&&(u=s),r.push({...p,transforms:[t,...f]})}pn({renderer:i,scales:o,guides:a,geometries:r,coordinates:u,...n})}return i.node()},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));
