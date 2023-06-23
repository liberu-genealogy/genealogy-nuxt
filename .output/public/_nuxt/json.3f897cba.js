import{d as Fn,e as ln,f as wn,g as vn,j as Bn}from"./text.2058c26f.js";function Pn(n,t){t||(t=[]);var e=n?Math.min(t.length,n.length):0,r=t.slice(),i;return function(o){for(i=0;i<e;++i)r[i]=n[i]*(1-o)+t[i]*o;return r}}function jn(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Bt(n,t){return(jn(t)?Pn:En)(n,t)}function En(n,t){var e=t?t.length:0,r=n?Math.min(e,n.length):0,i=new Array(r),o=new Array(e),u;for(u=0;u<r;++u)i[u]=pn(n[u],t[u]);for(;u<e;++u)o[u]=t[u];return function(s){for(u=0;u<r;++u)o[u]=i[u](s);return o}}function On(n,t){var e=new Date;return n=+n,t=+t,function(r){return e.setTime(n*(1-r)+t*r),e}}function Zn(n,t){var e={},r={},i;(n===null||typeof n!="object")&&(n={}),(t===null||typeof t!="object")&&(t={});for(i in t)i in n?e[i]=pn(n[i],t[i]):r[i]=t[i];return function(o){for(i in e)r[i]=e[i](o);return r}}function pn(n,t){var e=typeof t,r;return t==null||e==="boolean"?Fn(t):(e==="number"?ln:e==="string"?(r=wn(t))?(t=r,vn):Bn:t instanceof wn?vn:t instanceof Date?On:jn(t)?Pn:Array.isArray(t)?En:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Zn:ln)(n,t)}function Gn(n,t){return n=+n,t=+t,function(e){return Math.round(n*(1-e)+t*e)}}function K(n,t){return n==null||t==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function Vn(n,t){return n==null||t==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function zn(n){let t,e,r;n.length!==2?(t=K,e=(s,h)=>K(n(s),h),r=(s,h)=>n(s)-h):(t=n===K||n===Vn?n:Xn,e=n,r=n);function i(s,h,a=0,f=s.length){if(a<f){if(t(h,h)!==0)return f;do{const l=a+f>>>1;e(s[l],h)<0?a=l+1:f=l}while(a<f)}return a}function o(s,h,a=0,f=s.length){if(a<f){if(t(h,h)!==0)return f;do{const l=a+f>>>1;e(s[l],h)<=0?a=l+1:f=l}while(a<f)}return a}function u(s,h,a=0,f=s.length){const l=i(s,h,a,f-1);return l>a&&r(s[l-1],h)>-r(s[l],h)?l-1:l}return{left:i,center:u,right:o}}function Xn(){return 0}function Jn(n){return n===null?NaN:+n}function*Ot(n,t){if(t===void 0)for(let e of n)e!=null&&(e=+e)>=e&&(yield e);else{let e=-1;for(let r of n)(r=t(r,++e,n))!=null&&(r=+r)>=r&&(yield r)}}const Ln=zn(K),Qn=Ln.right,Zt=Ln.left,Gt=zn(Jn).center,Un=Qn,Yn=Math.sqrt(50),Hn=Math.sqrt(10),Kn=Math.sqrt(2);function W(n,t,e){const r=(t-n)/Math.max(0,e),i=Math.floor(Math.log10(r)),o=r/Math.pow(10,i),u=o>=Yn?10:o>=Hn?5:o>=Kn?2:1;let s,h,a;return i<0?(a=Math.pow(10,-i)/u,s=Math.round(n*a),h=Math.round(t*a),s/a<n&&++s,h/a>t&&--h,a=-a):(a=Math.pow(10,i)*u,s=Math.round(n/a),h=Math.round(t/a),s*a<n&&++s,h*a>t&&--h),h<s&&.5<=e&&e<2?W(n,t,e*2):[s,h,a]}function Wn(n,t,e){if(t=+t,n=+n,e=+e,!(e>0))return[];if(n===t)return[n];const r=t<n,[i,o,u]=r?W(t,n,e):W(n,t,e);if(!(o>=i))return[];const s=o-i+1,h=new Array(s);if(r)if(u<0)for(let a=0;a<s;++a)h[a]=(o-a)/-u;else for(let a=0;a<s;++a)h[a]=(o-a)*u;else if(u<0)for(let a=0;a<s;++a)h[a]=(i+a)/-u;else for(let a=0;a<s;++a)h[a]=(i+a)*u;return h}function dn(n,t,e){return t=+t,n=+n,e=+e,W(n,t,e)[2]}function nt(n,t,e){t=+t,n=+n,e=+e;const r=t<n,i=r?dn(t,n,e):dn(n,t,e);return(r?-1:1)*(i<0?1/-i:i)}function tt(n,t){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(t).domain(n);break}return this}function Vt(n,t){switch(arguments.length){case 0:break;case 1:{typeof n=="function"?this.interpolator(n):this.range(n);break}default:{this.domain(n),typeof t=="function"?this.interpolator(t):this.range(t);break}}return this}function rt(n){return function(){return n}}function et(n){return+n}var _n=[0,1];function Z(n){return n}function mn(n,t){return(t-=n=+n)?function(e){return(e-n)/t}:rt(isNaN(t)?NaN:.5)}function it(n,t){var e;return n>t&&(e=n,n=t,t=e),function(r){return Math.max(n,Math.min(t,r))}}function at(n,t,e){var r=n[0],i=n[1],o=t[0],u=t[1];return i<r?(r=mn(i,r),o=e(u,o)):(r=mn(r,i),o=e(o,u)),function(s){return o(r(s))}}function ut(n,t,e){var r=Math.min(n.length,t.length)-1,i=new Array(r),o=new Array(r),u=-1;for(n[r]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++u<r;)i[u]=mn(n[u],n[u+1]),o[u]=e(t[u],t[u+1]);return function(s){var h=Un(n,s,1,r)-1;return o[h](i[h](s))}}function st(n,t){return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function ot(){var n=_n,t=_n,e=pn,r,i,o,u=Z,s,h,a;function f(){var c=Math.min(n.length,t.length);return u!==Z&&(u=it(n[0],n[c-1])),s=c>2?ut:at,h=a=null,l}function l(c){return c==null||isNaN(c=+c)?o:(h||(h=s(n.map(r),t,e)))(r(u(c)))}return l.invert=function(c){return u(i((a||(a=s(t,n.map(r),ln)))(c)))},l.domain=function(c){return arguments.length?(n=Array.from(c,et),f()):n.slice()},l.range=function(c){return arguments.length?(t=Array.from(c),f()):t.slice()},l.rangeRound=function(c){return t=Array.from(c),e=Gn,f()},l.clamp=function(c){return arguments.length?(u=c?!0:Z,f()):u!==Z},l.interpolate=function(c){return arguments.length?(e=c,f()):e},l.unknown=function(c){return arguments.length?(o=c,l):o},function(c,g){return r=c,i=g,f()}}function ft(){return ot()(Z,Z)}function ht(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function nn(n,t){if((e=(n=t?n.toExponential(t-1):n.toExponential()).indexOf("e"))<0)return null;var e,r=n.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+n.slice(e+1)]}function V(n){return n=nn(Math.abs(n)),n?n[1]:NaN}function ct(n,t){return function(e,r){for(var i=e.length,o=[],u=0,s=n[0],h=0;i>0&&s>0&&(h+s+1>r&&(s=Math.max(1,r-h)),o.push(e.substring(i-=s,i+s)),!((h+=s+1)>r));)s=n[u=(u+1)%n.length];return o.reverse().join(t)}}function lt(n){return function(t){return t.replace(/[0-9]/g,function(e){return n[+e]})}}var dt=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function tn(n){if(!(t=dt.exec(n)))throw new Error("invalid format: "+n);var t;return new Mn({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}tn.prototype=Mn.prototype;function Mn(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}Mn.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function mt(n){n:for(var t=n.length,e=1,r=-1,i;e<t;++e)switch(n[e]){case".":r=i=e;break;case"0":r===0&&(r=e),i=e;break;default:if(!+n[e])break n;r>0&&(r=0);break}return r>0?n.slice(0,r)+n.slice(i+1):n}var qn;function gt(n,t){var e=nn(n,t);if(!e)return n+"";var r=e[0],i=e[1],o=i-(qn=Math.max(-8,Math.min(8,Math.floor(i/3)))*3)+1,u=r.length;return o===u?r:o>u?r+new Array(o-u+1).join("0"):o>0?r.slice(0,o)+"."+r.slice(o):"0."+new Array(1-o).join("0")+nn(n,Math.max(0,t+o-1))[0]}function An(n,t){var e=nn(n,t);if(!e)return n+"";var r=e[0],i=e[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}const kn={"%":(n,t)=>(n*100).toFixed(t),b:n=>Math.round(n).toString(2),c:n=>n+"",d:ht,e:(n,t)=>n.toExponential(t),f:(n,t)=>n.toFixed(t),g:(n,t)=>n.toPrecision(t),o:n=>Math.round(n).toString(8),p:(n,t)=>An(n*100,t),r:An,s:gt,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function Nn(n){return n}var bn=Array.prototype.map,Rn=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function yt(n){var t=n.grouping===void 0||n.thousands===void 0?Nn:ct(bn.call(n.grouping,Number),n.thousands+""),e=n.currency===void 0?"":n.currency[0]+"",r=n.currency===void 0?"":n.currency[1]+"",i=n.decimal===void 0?".":n.decimal+"",o=n.numerals===void 0?Nn:lt(bn.call(n.numerals,String)),u=n.percent===void 0?"%":n.percent+"",s=n.minus===void 0?"−":n.minus+"",h=n.nan===void 0?"NaN":n.nan+"";function a(l){l=tn(l);var c=l.fill,g=l.align,M=l.sign,w=l.symbol,k=l.zero,p=l.width,_=l.comma,$=l.precision,A=l.trim,x=l.type;x==="n"?(_=!0,x="g"):kn[x]||($===void 0&&($=12),A=!0,x="g"),(k||c==="0"&&g==="=")&&(k=!0,c="0",g="=");var T=w==="$"?e:w==="#"&&/[boxX]/.test(x)?"0"+x.toLowerCase():"",z=w==="$"?r:/[%p]/.test(x)?u:"",P=kn[x],L=/[defgprs%]/.test(x);$=$===void 0?6:/[gprs]/.test(x)?Math.max(1,Math.min(21,$)):Math.max(0,Math.min(20,$));function S(m){var v=T,d=z,y,q,C;if(x==="c")d=P(m)+d,m="";else{m=+m;var j=m<0||1/m<0;if(m=isNaN(m)?h:P(Math.abs(m),$),A&&(m=mt(m)),j&&+m==0&&M!=="+"&&(j=!1),v=(j?M==="("?M:s:M==="-"||M==="("?"":M)+v,d=(x==="s"?Rn[8+qn/3]:"")+d+(j&&M==="("?")":""),L){for(y=-1,q=m.length;++y<q;)if(C=m.charCodeAt(y),48>C||C>57){d=(C===46?i+m.slice(y+1):m.slice(y))+d,m=m.slice(0,y);break}}}_&&!k&&(m=t(m,1/0));var E=v.length+m.length+d.length,b=E<p?new Array(p-E+1).join(c):"";switch(_&&k&&(m=t(b+m,b.length?p-d.length:1/0),b=""),g){case"<":m=v+m+d+b;break;case"=":m=v+b+m+d;break;case"^":m=b.slice(0,E=b.length>>1)+v+m+d+b.slice(E);break;default:m=b+v+m+d;break}return o(m)}return S.toString=function(){return l+""},S}function f(l,c){var g=a((l=tn(l),l.type="f",l)),M=Math.max(-8,Math.min(8,Math.floor(V(c)/3)))*3,w=Math.pow(10,-M),k=Rn[8+M/3];return function(p){return g(w*p)+k}}return{format:a,formatPrefix:f}}var Y,In,Cn;pt({thousands:",",grouping:[3],currency:["$",""]});function pt(n){return Y=yt(n),In=Y.format,Cn=Y.formatPrefix,Y}function Mt(n){return Math.max(0,-V(Math.abs(n)))}function xt(n,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(V(t)/3)))*3-V(Math.abs(n)))}function $t(n,t){return n=Math.abs(n),t=Math.abs(t)-n,Math.max(0,V(t)-V(n))+1}function wt(n,t,e,r){var i=nt(n,t,e),o;switch(r=tn(r??",f"),r.type){case"s":{var u=Math.max(Math.abs(n),Math.abs(t));return r.precision==null&&!isNaN(o=xt(i,u))&&(r.precision=o),Cn(r,u)}case"":case"e":case"g":case"p":case"r":{r.precision==null&&!isNaN(o=$t(i,Math.max(Math.abs(n),Math.abs(t))))&&(r.precision=o-(r.type==="e"));break}case"f":case"%":{r.precision==null&&!isNaN(o=Mt(i))&&(r.precision=o-(r.type==="%")*2);break}}return In(r)}function vt(n){var t=n.domain;return n.ticks=function(e){var r=t();return Wn(r[0],r[r.length-1],e??10)},n.tickFormat=function(e,r){var i=t();return wt(i[0],i[i.length-1],e??10,r)},n.nice=function(e){e==null&&(e=10);var r=t(),i=0,o=r.length-1,u=r[i],s=r[o],h,a,f=10;for(s<u&&(a=u,u=s,s=a,a=i,i=o,o=a);f-- >0;){if(a=dn(u,s,e),a===h)return r[i]=u,r[o]=s,t(r);if(a>0)u=Math.floor(u/a)*a,s=Math.ceil(s/a)*a;else if(a<0)u=Math.ceil(u*a)/a,s=Math.floor(s*a)/a;else break;h=a}return n},n}function _t(){var n=ft();return n.copy=function(){return st(n,_t())},tt.apply(n,arguments),vt(n)}function At(n){n.x0=Math.round(n.x0),n.y0=Math.round(n.y0),n.x1=Math.round(n.x1),n.y1=Math.round(n.y1)}function kt(n,t,e,r,i){for(var o=n.children,u,s=-1,h=o.length,a=n.value&&(r-t)/n.value;++s<h;)u=o[s],u.y0=e,u.y1=i,u.x0=t,u.x1=t+=u.value*a}function Xt(){var n=1,t=1,e=0,r=!1;function i(u){var s=u.height+1;return u.x0=u.y0=e,u.x1=n,u.y1=t/s,u.eachBefore(o(t,s)),r&&u.eachBefore(At),u}function o(u,s){return function(h){h.children&&kt(h,h.x0,u*(h.depth+1)/s,h.x1,u*(h.depth+2)/s);var a=h.x0,f=h.y0,l=h.x1-e,c=h.y1-e;l<a&&(a=l=(a+l)/2),c<f&&(f=c=(f+c)/2),h.x0=a,h.y0=f,h.x1=l,h.y1=c}}return i.round=function(u){return arguments.length?(r=!!u,i):r},i.size=function(u){return arguments.length?(n=+u[0],t=+u[1],i):[n,t]},i.padding=function(u){return arguments.length?(e=+u,i):e},i}function F(n){return function(){return n}}const Sn=Math.abs,N=Math.atan2,B=Math.cos,Nt=Math.max,cn=Math.min,I=Math.sin,G=Math.sqrt,R=1e-12,X=Math.PI,rn=X/2,bt=2*X;function Rt(n){return n>1?0:n<-1?X:Math.acos(n)}function Tn(n){return n>=1?rn:n<=-1?-rn:Math.asin(n)}const gn=Math.PI,yn=2*gn,O=1e-6,St=yn-O;function Dn(n){this._+=n[0];for(let t=1,e=n.length;t<e;++t)this._+=arguments[t]+n[t]}function Tt(n){let t=Math.floor(n);if(!(t>=0))throw new Error(`invalid digits: ${n}`);if(t>15)return Dn;const e=10**t;return function(r){this._+=r[0];for(let i=1,o=r.length;i<o;++i)this._+=Math.round(arguments[i]*e)/e+r[i]}}class en{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=t==null?Dn:Tt(t)}moveTo(t,e){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,e){this._append`L${this._x1=+t},${this._y1=+e}`}quadraticCurveTo(t,e,r,i){this._append`Q${+t},${+e},${this._x1=+r},${this._y1=+i}`}bezierCurveTo(t,e,r,i,o,u){this._append`C${+t},${+e},${+r},${+i},${this._x1=+o},${this._y1=+u}`}arcTo(t,e,r,i,o){if(t=+t,e=+e,r=+r,i=+i,o=+o,o<0)throw new Error(`negative radius: ${o}`);let u=this._x1,s=this._y1,h=r-t,a=i-e,f=u-t,l=s-e,c=f*f+l*l;if(this._x1===null)this._append`M${this._x1=t},${this._y1=e}`;else if(c>O)if(!(Math.abs(l*h-a*f)>O)||!o)this._append`L${this._x1=t},${this._y1=e}`;else{let g=r-u,M=i-s,w=h*h+a*a,k=g*g+M*M,p=Math.sqrt(w),_=Math.sqrt(c),$=o*Math.tan((gn-Math.acos((w+c-k)/(2*p*_)))/2),A=$/_,x=$/p;Math.abs(A-1)>O&&this._append`L${t+A*f},${e+A*l}`,this._append`A${o},${o},0,0,${+(l*g>f*M)},${this._x1=t+x*h},${this._y1=e+x*a}`}}arc(t,e,r,i,o,u){if(t=+t,e=+e,r=+r,u=!!u,r<0)throw new Error(`negative radius: ${r}`);let s=r*Math.cos(i),h=r*Math.sin(i),a=t+s,f=e+h,l=1^u,c=u?i-o:o-i;this._x1===null?this._append`M${a},${f}`:(Math.abs(this._x1-a)>O||Math.abs(this._y1-f)>O)&&this._append`L${a},${f}`,r&&(c<0&&(c=c%yn+yn),c>St?this._append`A${r},${r},0,1,${l},${t-s},${e-h}A${r},${r},0,1,${l},${this._x1=a},${this._y1=f}`:c>O&&this._append`A${r},${r},0,${+(c>=gn)},${l},${this._x1=t+r*Math.cos(o)},${this._y1=e+r*Math.sin(o)}`)}rect(t,e,r,i){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${r=+r}v${+i}h${-r}Z`}toString(){return this._}}function Pt(){return new en}Pt.prototype=en.prototype;function Jt(n=3){return new en(+n)}function jt(n){let t=3;return n.digits=function(e){if(!arguments.length)return t;if(e==null)t=null;else{const r=Math.floor(e);if(!(r>=0))throw new RangeError(`invalid digits: ${e}`);t=r}return n},()=>new en(t)}function Et(n){return n.innerRadius}function zt(n){return n.outerRadius}function Lt(n){return n.startAngle}function qt(n){return n.endAngle}function It(n){return n&&n.padAngle}function Ct(n,t,e,r,i,o,u,s){var h=e-n,a=r-t,f=u-i,l=s-o,c=l*h-f*a;if(!(c*c<R))return c=(f*(t-o)-l*(n-i))/c,[n+c*h,t+c*a]}function H(n,t,e,r,i,o,u){var s=n-e,h=t-r,a=(u?o:-o)/G(s*s+h*h),f=a*h,l=-a*s,c=n+f,g=t+l,M=e+f,w=r+l,k=(c+M)/2,p=(g+w)/2,_=M-c,$=w-g,A=_*_+$*$,x=i-o,T=c*w-M*g,z=($<0?-1:1)*G(Nt(0,x*x*A-T*T)),P=(T*$-_*z)/A,L=(-T*_-$*z)/A,S=(T*$+_*z)/A,m=(-T*_+$*z)/A,v=P-k,d=L-p,y=S-k,q=m-p;return v*v+d*d>y*y+q*q&&(P=S,L=m),{cx:P,cy:L,x01:-f,y01:-l,x11:P*(i/x-1),y11:L*(i/x-1)}}function Qt(){var n=Et,t=zt,e=F(0),r=null,i=Lt,o=qt,u=It,s=null,h=jt(a);function a(){var f,l,c=+n.apply(this,arguments),g=+t.apply(this,arguments),M=i.apply(this,arguments)-rn,w=o.apply(this,arguments)-rn,k=Sn(w-M),p=w>M;if(s||(s=f=h()),g<c&&(l=g,g=c,c=l),!(g>R))s.moveTo(0,0);else if(k>bt-R)s.moveTo(g*B(M),g*I(M)),s.arc(0,0,g,M,w,!p),c>R&&(s.moveTo(c*B(w),c*I(w)),s.arc(0,0,c,w,M,p));else{var _=M,$=w,A=M,x=w,T=k,z=k,P=u.apply(this,arguments)/2,L=P>R&&(r?+r.apply(this,arguments):G(c*c+g*g)),S=cn(Sn(g-c)/2,+e.apply(this,arguments)),m=S,v=S,d,y;if(L>R){var q=Tn(L/c*I(P)),C=Tn(L/g*I(P));(T-=q*2)>R?(q*=p?1:-1,A+=q,x-=q):(T=0,A=x=(M+w)/2),(z-=C*2)>R?(C*=p?1:-1,_+=C,$-=C):(z=0,_=$=(M+w)/2)}var j=g*B(_),E=g*I(_),b=c*B(x),J=c*I(x);if(S>R){var Q=g*B($),U=g*I($),an=c*B(A),un=c*I(A),D;if(k<X)if(D=Ct(j,E,an,un,Q,U,b,J)){var sn=j-D[0],on=E-D[1],fn=Q-D[0],hn=U-D[1],xn=1/I(Rt((sn*fn+on*hn)/(G(sn*sn+on*on)*G(fn*fn+hn*hn)))/2),$n=G(D[0]*D[0]+D[1]*D[1]);m=cn(S,(c-$n)/(xn-1)),v=cn(S,(g-$n)/(xn+1))}else m=v=0}z>R?v>R?(d=H(an,un,j,E,g,v,p),y=H(Q,U,b,J,g,v,p),s.moveTo(d.cx+d.x01,d.cy+d.y01),v<S?s.arc(d.cx,d.cy,v,N(d.y01,d.x01),N(y.y01,y.x01),!p):(s.arc(d.cx,d.cy,v,N(d.y01,d.x01),N(d.y11,d.x11),!p),s.arc(0,0,g,N(d.cy+d.y11,d.cx+d.x11),N(y.cy+y.y11,y.cx+y.x11),!p),s.arc(y.cx,y.cy,v,N(y.y11,y.x11),N(y.y01,y.x01),!p))):(s.moveTo(j,E),s.arc(0,0,g,_,$,!p)):s.moveTo(j,E),!(c>R)||!(T>R)?s.lineTo(b,J):m>R?(d=H(b,J,Q,U,c,-m,p),y=H(j,E,an,un,c,-m,p),s.lineTo(d.cx+d.x01,d.cy+d.y01),m<S?s.arc(d.cx,d.cy,m,N(d.y01,d.x01),N(y.y01,y.x01),!p):(s.arc(d.cx,d.cy,m,N(d.y01,d.x01),N(d.y11,d.x11),!p),s.arc(0,0,c,N(d.cy+d.y11,d.cx+d.x11),N(y.cy+y.y11,y.cx+y.x11),p),s.arc(y.cx,y.cy,m,N(y.y11,y.x11),N(y.y01,y.x01),!p))):s.arc(0,0,c,x,A,p)}if(s.closePath(),f)return s=null,f+""||null}return a.centroid=function(){var f=(+n.apply(this,arguments)+ +t.apply(this,arguments))/2,l=(+i.apply(this,arguments)+ +o.apply(this,arguments))/2-X/2;return[B(l)*f,I(l)*f]},a.innerRadius=function(f){return arguments.length?(n=typeof f=="function"?f:F(+f),a):n},a.outerRadius=function(f){return arguments.length?(t=typeof f=="function"?f:F(+f),a):t},a.cornerRadius=function(f){return arguments.length?(e=typeof f=="function"?f:F(+f),a):e},a.padRadius=function(f){return arguments.length?(r=f==null?null:typeof f=="function"?f:F(+f),a):r},a.startAngle=function(f){return arguments.length?(i=typeof f=="function"?f:F(+f),a):i},a.endAngle=function(f){return arguments.length?(o=typeof f=="function"?f:F(+f),a):o},a.padAngle=function(f){return arguments.length?(u=typeof f=="function"?f:F(+f),a):u},a.context=function(f){return arguments.length?(s=f??null,a):s},a}function Dt(n){if(!n.ok)throw new Error(n.status+" "+n.statusText);if(!(n.status===204||n.status===205))return n.json()}function Ut(n,t){return fetch(n,t).then(Dt)}export{wt as $,jt as A,F as B,bt as C,G as D,cn as E,X as F,I as G,B as H,R as I,Pt as J,Mn as K,Gt as L,Zt as M,Qn as N,Vn as O,en as P,pt as Q,yt as R,Cn as S,Bt as T,On as U,Pn as V,Zn as W,Jt as X,Mt as Y,xt as Z,$t as _,Qt as a,K as b,Wn as c,Un as d,Jn as e,tt as f,et as g,vt as h,pn as i,Ut as j,ot as k,_t as l,st as m,Ot as n,tn as o,Xt as p,In as q,Z as r,ft as s,dn as t,zn as u,nt as v,Vt as w,Gn as x,kt as y,At as z};
