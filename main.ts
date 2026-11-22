import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output",D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),U=new Uint8Array(65536);
const T=new Map([[0,0],[1,101],[2,401],[3,10],[4,12],[5,22],[6,23],[7,33],[16,21],[17,21],[18,21],[19,21],[20,21],[21,21],[22,21],[23,11],[24,21],[25,21],[26,21],[27,11],[28,21],[29,21],[30,21],[32,21],[33,21],[34,21],[48,200],[49,210],[50,210],[51,200],[52,0],[64,11],[65,20],[80,10],[81,10],[82,1],[83,10]]);
for(const d of readdirSync(I).sort()){
const p=readFileSync(I+"/"+d+"/program.bin"),q=readFileSync(I+"/"+d+"/input.bin"),n=p.length;
let s=0,c=0,y=0,t=0,g=0,l=0,e=0;
M.fill(0);
R:for(;;){
if(t===1e6){e=10;break}
if(y<0||y>=n){e=9;break}
const o=p[y],m=T.get(o);
if(m===undefined){e=5;break}
const w=m/100|0,po=m/10%10|0,pu=m%10;
if(y+w>=n){e=9;break}
t++;
const x=y+1+w;
if(s<po){e=2;break}
if(s-po+pu>256){e=3;break}
y=x;
switch(o){
case 0:e=0;break R;
case 1:D[s++]=p[x-1]<<24>>24;break;
case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;break}
case 6:D[s]=D[s-2];s++;break;
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
const b=D[s-1],a=D[s-2];let r;
if(o===16)r=a+b|0;else if(o===17)r=a-b|0;else if(o===18)r=Math.imul(a,b);
else if(o===19){if(!b){e=4;break R}r=(a/b)|0}
else if(o===20){if(!b){e=4;break R}r=a%b|0}
else if(o===21){if(!b){e=4;break R}r=Math.floor((a>>>0)/(b>>>0))|0}
else if(o===22){if(!b){e=4;break R}r=(a>>>0)%(b>>>0)|0}
else if(o===24)r=a&b;else if(o===25)r=a|b;else if(o===26)r=a^b;
else if(o===28)r=a<<(b&31);else if(o===29)r=a>>(b&31);else if(o===30)r=(a>>>(b&31))|0;
else if(o===32)r=a===b?1:0;else if(o===33)r=a<b?1:0;else r=(a>>>0)<(b>>>0)?1:0;
s-=2;D[s++]=r;break}
case 48:case 49:case 50:{
const r=(p[x-2]|p[x-1]<<8)<<16>>16;
let k=1;
if(o!==48){const v=D[--s];k=o===49?v===0:v!==0}
if(k)y=x+r;
break}
case 51:if(c===64){e=7;break R}C[c++]=x;y=p[x-2]|p[x-1]<<8;break;
case 52:if(!c){e=8;break R}y=C[--c];break;
case 64:{const a=D[s-1];if(a<0||a>255){e=6;break R}D[s-1]=M[a];break}
case 65:{const a=D[s-1],v=D[s-2];if(a<0||a>255){e=6;break R}s-=2;M[a]=v;break}
case 80:{const b=String(D[s-1]);if(l+b.length>65536){e=11;break R}s--;for(let k=0;k<b.length;k++)U[l++]=b.charCodeAt(k);break}
case 81:if(l+1>65536){e=11;break R}U[l++]=D[--s]&255;break;
case 82:D[s++]=g<q.length?q[g++]:-1;break;
case 83:e=D[--s]&255;break R;
}}
mkdirSync(O+"/"+d,{recursive:true});
writeFileSync(O+"/"+d+"/stdout.bin",U.subarray(0,l));
writeFileSync(O+"/"+d+"/exit.txt",e+"\n");
}
