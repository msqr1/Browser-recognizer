var loadVosklet = (() => { var _scriptName = typeof document != 'undefined' ? document.currentScript?.src : undefined; return (function(moduleArg = {}) { var moduleRtn;function m(){p.buffer!=q.buffer&&u();return q}function x(){p.buffer!=q.buffer&&u();return aa}function ba(){p.buffer!=q.buffer&&u();return ca}function da(){p.buffer!=q.buffer&&u();return ha}function y(){p.buffer!=q.buffer&&u();return ia}function A(){p.buffer!=q.buffer&&u();return ja}function ka(){p.buffer!=q.buffer&&u();return la}var B=moduleArg,ma,na,oa=new Promise((a,b)=>{ma=a;na=b}),pa="object"==typeof window,qa="function"==typeof importScripts,ra="object"==typeof process&&"object"==typeof process.Pa&&"string"==typeof process.Pa.node&&"renderer"!=process.type,sa=B.$ww;if(pa){var C=[],ta=["status","partialResult","result"];let a=caches.open("Vosklet"),b=URL.createObjectURL(new Blob(["(",(()=>{registerProcessor("VoskletTransferer",class extends AudioWorkletProcessor{constructor(e){super();this.sa=0;this.za=e.processorOptions[0];this.wa=new Float32Array(this.za)}process(e){e[0][0]&&(this.wa.set(e[0][0],this.sa),this.sa+=128,this.sa>=this.za&&(this.sa=0,this.port.postMessage(this.wa,[this.wa.buffer]),this.wa=new Float32Array(this.za)));return!0}})}).toString(),")()"],{type:"text/javascript"}));class c extends EventTarget{constructor(){super();C.push(this)}delete(){this.ga.delete()}static async ra(e,f,g,h){let k=new c,l=new Promise((t,v)=>{k.addEventListener("status",w=>{w.detail?v(w.detail):(h&&(k.findWord=z=>k.ga.findWord(z)),t(k))},{once:!0})}),n=await caches.open("Vosklet"),r=(await n.keys(f,{ignoreSearch:!0}))[0];if("undefined"==typeof r||r.url.split("?")[1]!=g){e=await fetch(e,{cache:"no-store"});if(!e.ok)throw"Unable to fetch model, status: "+e.status;await n.put(f+"?"+g,e.clone())}else e=await n.match(r);f=await (new Response(e.body.pipeThrough(new DecompressionStream("gzip")))).arrayBuffer();g=D(f.byteLength);x().set(new Uint8Array(f),g);k.ga=new B.CommonModel(C.length-1,h,g,f.byteLength);return l}}class d extends EventTarget{constructor(){super();this.acceptWaveform=e=>{let f=D(4*e.length);ka().set(e,f/4);this.ga.acceptWaveform(f,e.length)};C.push(this);return new Proxy(this,{get(e,f){if(void 0!=e[f]||void 0!=e.ga[f]){var g=e[f];if(g)return g.bind?g.bind(e):g;g=e.ga[f];return g.bind?g.bind(e.ga):g}}})}async delete(e=!1){let f=new Promise(g=>this.addEventListener("status",()=>{this.ga.delete();g()},{once:!0}));this.ga.safeDelete(e);return f}static async ra(e,f,g,h,k){let l=new d,n=new Promise((r,t)=>{l.addEventListener("status",v=>{v.detail?t(v.detail):r(l)},{once:!0})});switch(g){case 1:l.ga=new B.Recognizer(C.length-1,f,e);break;case 2:l.ga=new B.Recognizer(C.length-1,f,e,k);break;default:l.ga=new B.Recognizer(C.length-1,f,e,h,0)}return n}}B={getModelCache:()=>a,cleanUp:async()=>{for(let e of C)await e.delete();URL.revokeObjectURL(b)},createTransferer:async(e,f)=>{await e.audioWorklet.addModule(b);return new AudioWorkletNode(e,"VoskletTransferer",{channelCountMode:"explicit",numberOfInputs:1,numberOfOutputs:0,channelCount:1,processorOptions:[f]})},createModel:(e,f,g)=>c.ra(e,f,g,!0),createSpkModel:(e,f,g)=>c.ra(e,f,g,!1),createRecognizer:(e,f)=>d.ra(e.ga,f,1),createRecognizerWithGrm:(e,f,g)=>d.ra(e.ga,f,3,g,null),createRecognizerWithSpkModel:(e,f,g)=>d.ra(e.ga,f,2,null,g.ga)}}var ua=Object.assign({},B),F="",va,wa;if(pa||qa)qa?F=self.location.href:"undefined"!=typeof document&&document.currentScript&&(F=document.currentScript.src),_scriptName&&(F=_scriptName),F.startsWith("blob:")?F="":F=F.substr(0,F.replace(/[?#].*/,"").lastIndexOf("/")+1),qa&&(wa=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)}),va=a=>fetch(a,{credentials:"same-origin"}).then(b=>b.ok?b.arrayBuffer():Promise.reject(Error(b.status+" : "+b.url)));var xa=console.log.bind(console),G=console.error.bind(console);Object.assign(B,ua);ua=null;var p,ya,za=!1,Aa,q,aa,ca,ha,ia,ja,la,Ba,Ca,Da;function u(){var a=p.buffer;B.HEAP8=q=new Int8Array(a);B.HEAP16=ca=new Int16Array(a);B.HEAPU8=aa=new Uint8Array(a);B.HEAPU16=ha=new Uint16Array(a);B.HEAP32=ia=new Int32Array(a);B.HEAPU32=ja=new Uint32Array(a);B.HEAPF32=la=new Float32Array(a);B.HEAPF64=Da=new Float64Array(a);B.HEAP64=Ba=new BigInt64Array(a);B.HEAPU64=Ca=new BigUint64Array(a)}if(B.wasmMemory)p=B.wasmMemory;else if(p=new WebAssembly.Memory({initial:5040,maximum:32768,shared:!0}),!(p.buffer instanceof SharedArrayBuffer))throw G("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),ra&&G("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"),Error("bad memory");u();var Ea=[],Fa=[],Ga=[];function Ha(){if(sa){let a=B;Ia(a.sb,a.sz);removeEventListener("message",Ja);Ka=Ka.forEach(La);addEventListener("message",La)}else for(;0<Fa.length;)Fa.shift()(B)}var H=0,Ma=null,I=null;function Na(a){a="Aborted("+a+")";G(a);za=!0;a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");na(a);throw a;}var Oa=a=>a.startsWith("data:application/octet-stream;base64,"),Pa;function Qa(a){return va(a).then(b=>new Uint8Array(b),()=>{if(wa)var b=wa(a);else throw"both async and sync fetching of the wasm failed";return b})}function Ra(a,b,c){return Qa(a).then(d=>WebAssembly.instantiate(d,b)).then(c,d=>{G(`failed to asynchronously prepare wasm: ${d}`);Na(d)})}function Sa(a,b){var c=Pa;return"function"!=typeof WebAssembly.instantiateStreaming||Oa(c)||"function"!=typeof fetch?Ra(c,a,b):fetch(c,{credentials:"same-origin"}).then(d=>WebAssembly.instantiateStreaming(d,a).then(b,function(e){G(`wasm streaming compile failed: ${e}`);G("falling back to ArrayBuffer instantiation");return Ra(c,a,b)}))}function Ta(a,b,c){pa?C[a].dispatchEvent(new CustomEvent(ta[b],{detail:0==c?null:J(c)})):self.postMessage([a,b,c])}function Ua(a){this.name="ExitStatus";this.message=`Program terminated with exit(${a})`;this.status=a}var Ka=[],Va=[],Wa,Xa=a=>{var b=Va[a];b||(a>=Va.length&&(Va.length=a+1),Va[a]=b=Wa.get(a));return b},La=a=>{a=a.data;let b=a._wsc;b&&Xa(b)(...a.x)},Ja=a=>{Ka.push(a)},$a=new TextDecoder,J=(a,b)=>{if(!a)return"";b=a+b;for(var c=a;!(c>=b)&&x()[c];)++c;return $a.decode(x().slice(a,c))};class ab{constructor(a){this.ea=a-24}}var bb=0,cb=0,db=a=>{if(null===a)return"null";var b=typeof a;return"object"===b||"array"===b||"function"===b?a.toString():""+a},eb,K=a=>{for(var b="";x()[a];)b+=eb[x()[a++]];return b},L={},M={},fb={},N,gb=a=>{throw new N(a);},O,Q=(a,b,c)=>{function d(h){h=c(h);if(h.length!==a.length)throw new O("Mismatched type converter count");for(var k=0;k<a.length;++k)P(a[k],h[k])}a.forEach(h=>fb[h]=b);var e=Array(b.length),f=[],g=0;b.forEach((h,k)=>{M.hasOwnProperty(h)?e[k]=M[h]:(f.push(h),L.hasOwnProperty(h)||(L[h]=[]),L[h].push(()=>{e[k]=M[h];++g;g===f.length&&d(e)}))});0===f.length&&d(e)};function hb(a,b,c={}){var d=b.name;if(!a)throw new N(`type "${d}" must have a positive integer typeid pointer`);if(M.hasOwnProperty(a)){if(c.Ja)return;throw new N(`Cannot register type '${d}' twice`);}M[a]=b;delete fb[a];L.hasOwnProperty(a)&&(b=L[a],delete L[a],b.forEach(e=>e()))}function P(a,b,c={}){return hb(a,b,c)}var ib=(a,b,c)=>{switch(b){case 1:return c?d=>m()[d]:d=>x()[d];case 2:return c?d=>ba()[d>>1]:d=>da()[d>>1];case 4:return c?d=>y()[d>>2]:d=>A()[d>>2];case 8:return c?d=>Ba[d>>3]:d=>Ca[d>>3];default:throw new TypeError(`invalid integer width (${b}): ${a}`);}},jb=a=>{throw new N(a.ca.fa.da.name+" instance already deleted");},kb=!1,lb=()=>{},mb=(a,b,c)=>{if(b===c)return a;if(void 0===c.ja)return null;a=mb(a,b,c.ja);return null===a?null:c.Fa(a)},nb={},R=[],ob=()=>{for(;R.length;){var a=R.pop();a.ca.pa=!1;a["delete"]()}},S,T={},pb=(a,b)=>{if(void 0===b)throw new N("ptr should not be undefined");for(;a.ja;)b=a.ua(b),a=a.ja;return T[b]},qb=(a,b)=>{if(!b.fa||!b.ea)throw new O("makeClassHandle requires ptr and ptrType");if(!!b.la!==!!b.ha)throw new O("Both smartPtrType and smartPtr must be specified");b.count={value:1};return U(Object.create(a,{ca:{value:b,writable:!0}}))},U=a=>{if("undefined"===typeof FinalizationRegistry)return U=b=>b,a;kb=new FinalizationRegistry(b=>{b=b.ca;--b.count.value;0===b.count.value&&(b.ha?b.la.na(b.ha):b.fa.da.na(b.ea))});U=b=>{var c=b.ca;c.ha&&kb.register(b,{ca:c},b);return b};lb=b=>{kb.unregister(b)};return U(a)};function rb(){}var sb=(a,b)=>Object.defineProperty(b,"name",{value:a}),tb=(a,b,c)=>{if(void 0===a[b].ia){var d=a[b];a[b]=function(...e){if(!a[b].ia.hasOwnProperty(e.length))throw new N(`Function '${c}' called with an invalid number of arguments (${e.length}) - expects one of (${a[b].ia})!`);return a[b].ia[e.length].apply(this,e)};a[b].ia=[];a[b].ia[d.va]=d}},ub=(a,b,c)=>{if(B.hasOwnProperty(a)){if(void 0===c||void 0!==B[a].ia&&void 0!==B[a].ia[c])throw new N(`Cannot register public name '${a}' twice`);tb(B,a,a);if(B.hasOwnProperty(c))throw new N(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);B[a].ia[c]=b}else B[a]=b,void 0!==c&&(B[a].Sa=c)},vb=a=>{if(void 0===a)return"_unknown";a=a.replace(/[^a-zA-Z0-9_]/g,"$");var b=a.charCodeAt(0);return 48<=b&&57>=b?`_${a}`:a};function wb(a,b,c,d,e,f,g,h){this.name=a;this.constructor=b;this.qa=c;this.na=d;this.ja=e;this.Ha=f;this.ua=g;this.Fa=h;this.La=[]}var xb=(a,b,c)=>{for(;b!==c;){if(!b.ua)throw new N(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);a=b.ua(a);b=b.ja}return a};function yb(a,b){if(null===b){if(this.Aa)throw new N(`null is not a valid ${this.name}`);return 0}if(!b.ca)throw new N(`Cannot pass "${db(b)}" as a ${this.name}`);if(!b.ca.ea)throw new N(`Cannot pass deleted object as a pointer of type ${this.name}`);return xb(b.ca.ea,b.ca.fa.da,this.da)}function zb(a,b){if(null===b){if(this.Aa)throw new N(`null is not a valid ${this.name}`);if(this.ya){var c=this.Ma();null!==a&&a.push(this.na,c);return c}return 0}if(!b||!b.ca)throw new N(`Cannot pass "${db(b)}" as a ${this.name}`);if(!b.ca.ea)throw new N(`Cannot pass deleted object as a pointer of type ${this.name}`);if(!this.xa&&b.ca.fa.xa)throw new N(`Cannot convert argument of type ${b.ca.la?b.ca.la.name:b.ca.fa.name} to parameter type ${this.name}`);c=xb(b.ca.ea,b.ca.fa.da,this.da);if(this.ya){if(void 0===b.ca.ha)throw new N("Passing raw pointer to smart pointer is illegal");switch(this.Oa){case 0:if(b.ca.la===this)c=b.ca.ha;else throw new N(`Cannot convert argument of type ${b.ca.la?b.ca.la.name:b.ca.fa.name} to parameter type ${this.name}`);break;case 1:c=b.ca.ha;break;case 2:if(b.ca.la===this)c=b.ca.ha;else{var d=b.clone();c=this.Na(c,Ab(()=>d["delete"]()));null!==a&&a.push(this.na,c)}break;default:throw new N("Unsupporting sharing policy");}}return c}function Bb(a,b){if(null===b){if(this.Aa)throw new N(`null is not a valid ${this.name}`);return 0}if(!b.ca)throw new N(`Cannot pass "${db(b)}" as a ${this.name}`);if(!b.ca.ea)throw new N(`Cannot pass deleted object as a pointer of type ${this.name}`);if(b.ca.fa.xa)throw new N(`Cannot convert argument of type ${b.ca.fa.name} to parameter type ${this.name}`);return xb(b.ca.ea,b.ca.fa.da,this.da)}function Cb(a){return this.fromWireType(A()[a>>2])}function Db(a,b,c,d,e,f,g,h,k,l,n){this.name=a;this.da=b;this.Aa=c;this.xa=d;this.ya=e;this.Ka=f;this.Oa=g;this.Da=h;this.Ma=k;this.Na=l;this.na=n;e||void 0!==b.ja?this.toWireType=zb:(this.toWireType=d?yb:Bb,this.ka=null)}var Eb=(a,b,c)=>{if(!B.hasOwnProperty(a))throw new O("Replacing nonexistent public symbol");void 0!==B[a].ia&&void 0!==c?B[a].ia[c]=b:(B[a]=b,B[a].va=c)},V=(a,b)=>{a=K(a);var c=Xa(b);if("function"!=typeof c)throw new N(`unknown function pointer with signature ${a}: ${b}`);return c},Fb,Hb=a=>{a=Gb(a);var b=K(a);W(a);return b},Ib=(a,b)=>{function c(f){e[f]||M[f]||(fb[f]?fb[f].forEach(c):(d.push(f),e[f]=!0))}var d=[],e={};b.forEach(c);throw new Fb(`${a}: `+d.map(Hb).join([", "]));},Jb=(a,b)=>{for(var c=[],d=0;d<a;d++)c.push(A()[b+4*d>>2]);return c},Kb=a=>{for(;a.length;){var b=a.pop();a.pop()(b)}};function Lb(a){for(var b=1;b<a.length;++b)if(null!==a[b]&&void 0===a[b].ka)return!0;return!1}function Mb(a){var b=Function;if(!(b instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);var c=sb(b.name||"unknownFunctionName",function(){});c.prototype=b.prototype;c=new c;a=b.apply(c,a);return a instanceof Object?a:c}function Nb(a,b,c,d,e,f){var g=b.length;if(2>g)throw new N("argTypes array size mismatch! Must at least get return value and 'this' types!");var h=null!==b[1]&&null!==c,k=Lb(b);c="void"!==b[0].name;d=[a,gb,d,e,Kb,b[0],b[1]];for(e=0;e<g-2;++e)d.push(b[e+2]);if(!k)for(e=h?1:2;e<b.length;++e)null!==b[e].ka&&d.push(b[e].ka);k=Lb(b);e=b.length-2;var l=[],n=["fn"];h&&n.push("thisWired");for(g=0;g<e;++g)l.push(`arg${g}`),n.push(`arg${g}Wired`);l=l.join(",");n=n.join(",");l=`return function (${l}) {\n`;k&&(l+="var destructors = [];\n");var r=k?"destructors":"null",t="humanName throwBindingError invoker fn runDestructors retType classParam".split(" ");h&&(l+=`var thisWired = classParam['toWireType'](${r}, this);\n`);for(g=0;g<e;++g)l+=`var arg${g}Wired = argType${g}['toWireType'](${r}, arg${g});\n`,t.push(`argType${g}`);l+=(c||f?"var rv = ":"")+`invoker(${n});\n`;if(k)l+="runDestructors(destructors);\n";else for(g=h?1:2;g<b.length;++g)f=1===g?"thisWired":"arg"+(g-2)+"Wired",null!==b[g].ka&&(l+=`${f}_dtor(${f});\n`,t.push(`${f}_dtor`));c&&(l+="var ret = retType['fromWireType'](rv);\nreturn ret;\n");let [v,w]=[t,l+"}\n"];v.push(w);b=Mb(v)(...d);return sb(a,b)}for(var Ob=a=>{a=a.trim();const b=a.indexOf("(");return-1!==b?a.substr(0,b):a},Qb=[],X=[],Ab=a=>{switch(a){case void 0:return 2;case null:return 4;case !0:return 6;case !1:return 8;default:const b=Qb.pop()||X.length;X[b]=a;X[b+1]=1;return b}},Rb={name:"emscripten::val",fromWireType:a=>{if(!a)throw new N("Cannot use deleted val. handle = "+a);var b=X[a];9<a&&0===--X[a+1]&&(X[a]=void 0,Qb.push(a));return b},toWireType:(a,b)=>Ab(b),ma:8,readValueFromPointer:Cb,ka:null},Sb=(a,b,c)=>{switch(b){case 1:return c?function(d){return this.fromWireType(m()[d])}:function(d){return this.fromWireType(x()[d])};case 2:return c?function(d){return this.fromWireType(ba()[d>>1])}:function(d){return this.fromWireType(da()[d>>1])};case 4:return c?function(d){return this.fromWireType(y()[d>>2])}:function(d){return this.fromWireType(A()[d>>2])};default:throw new TypeError(`invalid integer width (${b}): ${a}`);}},Tb=a=>{var b=M[a];if(void 0===b)throw a=`${"enum"} has unknown type ${Hb(a)}`,new N(a);return b},Ub=(a,b)=>{switch(b){case 4:return function(c){return this.fromWireType(ka()[c>>2])};case 8:return function(c){var d=this.fromWireType;p.buffer!=q.buffer&&u();return d.call(this,Da[c>>3])};default:throw new TypeError(`invalid float width (${b}): ${a}`);}},Y=(a,b,c,d)=>{if(!(0<d))return 0;var e=c;d=c+d-1;for(var f=0;f<a.length;++f){var g=a.charCodeAt(f);if(55296<=g&&57343>=g){var h=a.charCodeAt(++f);g=65536+((g&1023)<<10)|h&1023}if(127>=g){if(c>=d)break;b[c++]=g}else{if(2047>=g){if(c+1>=d)break;b[c++]=192|g>>6}else{if(65535>=g){if(c+2>=d)break;b[c++]=224|g>>12}else{if(c+3>=d)break;b[c++]=240|g>>18;b[c++]=128|g>>12&63}b[c++]=128|g>>6&63}b[c++]=128|g&63}}b[c]=0;return c-e},Vb=(a,b)=>{Y(a,x(),b,17)},Wb=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);127>=d?b++:2047>=d?b+=2:55296<=d&&57343>=d?(b+=4,++c):b+=3}return b},Xb=new TextDecoder("utf-16le"),Yb=(a,b)=>{var c=a>>1;for(b=c+b/2;!(c>=b)&&da()[c];)++c;c<<=1;return Xb.decode(x().slice(a,c))},Zb=(a,b,c)=>{c??=2147483647;if(2>c)return 0;c-=2;var d=b;c=c<2*a.length?c/2:a.length;for(var e=0;e<c;++e){var f=a.charCodeAt(e);ba()[b>>1]=f;b+=2}ba()[b>>1]=0;return b-d},$b=a=>2*a.length,ac=(a,b)=>{for(var c=0,d="";!(c>=b/4);){var e=y()[a+4*c>>2];if(0==e)break;++c;65536<=e?(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023)):d+=String.fromCharCode(e)}return d},bc=(a,b,c)=>{c??=2147483647;if(4>c)return 0;var d=b;c=d+c-4;for(var e=0;e<a.length;++e){var f=a.charCodeAt(e);if(55296<=f&&57343>=f){var g=a.charCodeAt(++e);f=65536+((f&1023)<<10)|g&1023}y()[b>>2]=f;b+=4;if(b+4>c)break}y()[b>>2]=0;return b-d},cc=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&++c;b+=4}return b},dc={},ec=1,fc=URL.createObjectURL(new Blob(["onmessage=function(d){onmessage=null;d=d.data;d[`instantiateWasm`]=(i,r)=>{var n=new WebAssembly.Instance(d[`wasm`],i);return r(n,d[`wasm`]);};importScripts(d.js);loadVosklet(d);d.wasm=d.mem=d.js=0;}"],{type:"application/javascript"})),gc={},hc=a=>{if(!(a instanceof Ua||"unwind"==a))throw a;},ic=0,jc=a=>{Aa=a;0<ic||(za=!0);throw new Ua(a);},kc=a=>{if(!za)try{if(a(),!(0<ic))try{Aa=a=Aa,jc(a)}catch(b){hc(b)}}catch(b){hc(b)}},lc=[],mc=[],nc=[],oc={},qc=()=>{if(!pc){var a={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"},b;for(b in oc)void 0===oc[b]?delete a[b]:a[b]=oc[b];var c=[];for(b in a)c.push(`${b}=${a[b]}`);pc=c}return pc},pc,rc=()=>{if("object"==typeof crypto&&"function"==typeof crypto.getRandomValues)return a=>(a.set(crypto.getRandomValues(new Uint8Array(a.byteLength))),a);Na("initRandomDevice")},sc=a=>(sc=rc())(a),tc=Array(256),uc=0;256>uc;++uc)tc[uc]=String.fromCharCode(uc);eb=tc;N=B.BindingError=class extends Error{constructor(a){super(a);this.name="BindingError"}};O=B.InternalError=class extends Error{constructor(a){super(a);this.name="InternalError"}};Object.assign(rb.prototype,{isAliasOf:function(a){if(!(this instanceof rb&&a instanceof rb))return!1;var b=this.ca.fa.da,c=this.ca.ea;a.ca=a.ca;var d=a.ca.fa.da;for(a=a.ca.ea;b.ja;)c=b.ua(c),b=b.ja;for(;d.ja;)a=d.ua(a),d=d.ja;return b===d&&c===a},clone:function(){this.ca.ea||jb(this);if(this.ca.ta)return this.ca.count.value+=1,this;var a=U,b=Object,c=b.create,d=Object.getPrototypeOf(this),e=this.ca;a=a(c.call(b,d,{ca:{value:{count:e.count,pa:e.pa,ta:e.ta,ea:e.ea,fa:e.fa,ha:e.ha,la:e.la}}}));a.ca.count.value+=1;a.ca.pa=!1;return a},["delete"](){this.ca.ea||jb(this);if(this.ca.pa&&!this.ca.ta)throw new N("Object already scheduled for deletion");lb(this);var a=this.ca;--a.count.value;0===a.count.value&&(a.ha?a.la.na(a.ha):a.fa.da.na(a.ea));this.ca.ta||(this.ca.ha=void 0,this.ca.ea=void 0)},isDeleted:function(){return!this.ca.ea},deleteLater:function(){this.ca.ea||jb(this);if(this.ca.pa&&!this.ca.ta)throw new N("Object already scheduled for deletion");R.push(this);1===R.length&&S&&S(ob);this.ca.pa=!0;return this}});B.getInheritedInstanceCount=()=>Object.keys(T).length;B.getLiveInheritedInstances=()=>{var a=[],b;for(b in T)T.hasOwnProperty(b)&&a.push(T[b]);return a};B.flushPendingDeletes=ob;B.setDelayFunction=a=>{S=a;R.length&&S&&S(ob)};Object.assign(Db.prototype,{Ia(a){this.Da&&(a=this.Da(a));return a},Ca(a){this.na?.(a)},ma:8,readValueFromPointer:Cb,fromWireType:function(a){function b(){return this.ya?qb(this.da.qa,{fa:this.Ka,ea:c,la:this,ha:a}):qb(this.da.qa,{fa:this,ea:a})}var c=this.Ia(a);if(!c)return this.Ca(a),null;var d=pb(this.da,c);if(void 0!==d){if(0===d.ca.count.value)return d.ca.ea=c,d.ca.ha=a,d.clone();d=d.clone();this.Ca(a);return d}d=this.da.Ha(c);d=nb[d];if(!d)return b.call(this);d=this.xa?d.Ea:d.pointerType;var e=mb(c,this.da,d.da);return null===e?b.call(this):this.ya?qb(d.da.qa,{fa:d,ea:e,la:this,ha:a}):qb(d.da.qa,{fa:d,ea:e})}});Fb=B.UnboundTypeError=((a,b)=>{var c=sb(b,function(d){this.name=b;this.message=d;d=Error(d).stack;void 0!==d&&(this.stack=this.toString()+"\n"+d.replace(/^Error(:[^\n]*)?\n/,""))});c.prototype=Object.create(a.prototype);c.prototype.constructor=c;c.prototype.toString=function(){return void 0===this.message?this.name:`${this.name}: ${this.message}`};return c})(Error,"UnboundTypeError");X.push(0,1,void 0,1,null,1,!0,1,!1,1);B.count_emval_handles=()=>X.length/2-5-Qb.length;sa&&(dc[0]=this,addEventListener("message",Ja));var wc={c:(a,b,c,d)=>{Na(`Assertion failed: ${J(a)}, at: `+[b?J(b):"unknown filename",c,d?J(d):"unknown function"])},s:(a,b)=>Xa(a)(b),d:(a,b,c)=>{var d=new ab(a);A()[d.ea+16>>2]=0;A()[d.ea+4>>2]=b;A()[d.ea+8>>2]=c;bb=a;cb++;throw bb;},P:()=>{Na("")},q:(a,b,c)=>{b=K(b);P(a,{name:b,fromWireType:d=>d,toWireType:function(d,e){if("bigint"!=typeof e&&"number"!=typeof e)throw new TypeError(`Cannot convert "${db(e)}" to ${this.name}`);"number"==typeof e&&(e=BigInt(e));return e},ma:8,readValueFromPointer:ib(b,c,-1==b.indexOf("u")),ka:null})},R:(a,b,c,d)=>{b=K(b);P(a,{name:b,fromWireType:function(e){return!!e},toWireType:function(e,f){return f?c:d},ma:8,readValueFromPointer:function(e){return this.fromWireType(x()[e])},ka:null})},o:(a,b,c,d,e,f,g,h,k,l,n,r,t)=>{n=K(n);f=V(e,f);h&&=V(g,h);l&&=V(k,l);t=V(r,t);var v=vb(n);ub(v,function(){Ib(`Cannot construct ${n} due to unbound types`,[d])});Q([a,b,c],d?[d]:[],w=>{w=w[0];if(d){var z=w.da;var ea=z.qa}else ea=rb.prototype;w=sb(n,function(...Ya){if(Object.getPrototypeOf(this)!==Za)throw new N("Use 'new' to construct "+n);if(void 0===E.oa)throw new N(n+" has no accessible constructor");var Pb=E.oa[Ya.length];if(void 0===Pb)throw new N(`Tried to invoke ctor of ${n} with invalid number of parameters (${Ya.length}) - expected (${Object.keys(E.oa).toString()}) parameters instead!`);return Pb.apply(this,Ya)});var Za=Object.create(ea,{constructor:{value:w}});w.prototype=Za;var E=new wb(n,w,Za,t,z,f,h,l);if(E.ja){var fa;(fa=E.ja).Ba??(fa.Ba=[]);E.ja.Ba.push(E)}z=new Db(n,E,!0,!1,!1);fa=new Db(n+"*",E,!1,!1,!1);ea=new Db(n+" const*",E,!1,!0,!1);nb[a]={pointerType:fa,Ea:ea};Eb(v,w);return[z,fa,ea]})},j:(a,b,c,d,e,f)=>{var g=Jb(b,c);e=V(d,e);Q([],[a],h=>{h=h[0];var k=`constructor ${h.name}`;void 0===h.da.oa&&(h.da.oa=[]);if(void 0!==h.da.oa[b-1])throw new N(`Cannot register multiple constructors with identical number of parameters (${b-1}) for class '${h.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);h.da.oa[b-1]=()=>{Ib(`Cannot construct ${h.name} due to unbound types`,g)};Q([],g,l=>{l.splice(1,0,null);h.da.oa[b-1]=Nb(k,l,null,e,f);return[]});return[]})},g:(a,b,c,d,e,f,g,h,k)=>{var l=Jb(c,d);b=K(b);b=Ob(b);f=V(e,f);Q([],[a],n=>{function r(){Ib(`Cannot call ${t} due to unbound types`,l)}n=n[0];var t=`${n.name}.${b}`;b.startsWith("@@")&&(b=Symbol[b.substring(2)]);h&&n.da.La.push(b);var v=n.da.qa,w=v[b];void 0===w||void 0===w.ia&&w.className!==n.name&&w.va===c-2?(r.va=c-2,r.className=n.name,v[b]=r):(tb(v,b,t),v[b].ia[c-2]=r);Q([],l,z=>{z=Nb(t,z,n,f,g,k);void 0===v[b].ia?(z.va=c-2,v[b]=z):v[b].ia[c-2]=z;return[]});return[]})},Q:a=>P(a,Rb),A:(a,b,c,d)=>{function e(){}b=K(b);e.values={};P(a,{name:b,constructor:e,fromWireType:function(f){return this.constructor.values[f]},toWireType:(f,g)=>g.value,ma:8,readValueFromPointer:Sb(b,c,d),ka:null});ub(b,e)},k:(a,b,c)=>{var d=Tb(a);b=K(b);a=d.constructor;d=Object.create(d.constructor.prototype,{value:{value:c},constructor:{value:sb(`${d.name}_${b}`,function(){})}});a.values[c]=d;a[b]=d},p:(a,b,c)=>{b=K(b);P(a,{name:b,fromWireType:d=>d,toWireType:(d,e)=>e,ma:8,readValueFromPointer:Ub(b,c),ka:null})},K:(a,b,c,d,e,f,g)=>{var h=Jb(b,c);a=K(a);a=Ob(a);e=V(d,e);ub(a,function(){Ib(`Cannot call ${a} due to unbound types`,h)},b-1);Q([],h,k=>{Eb(a,Nb(a,[k[0],null].concat(k.slice(1)),null,e,f,g),b-1);return[]})},h:(a,b,c,d,e)=>{b=K(b);-1===e&&(e=4294967295);e=h=>h;if(0===d){var f=32-8*c;e=h=>h<<f>>>f}var g=b.includes("unsigned")?function(h,k){return k>>>0}:function(h,k){return k};P(a,{name:b,fromWireType:e,toWireType:g,ma:8,readValueFromPointer:ib(b,c,0!==d),ka:null})},e:(a,b,c)=>{function d(f){var g=A()[f>>2];f=A()[f+4>>2];return new e(m().buffer,f,g)}var e=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][b];c=K(c);P(a,{name:c,fromWireType:d,ma:8,readValueFromPointer:d},{Ja:!0})},r:(a,b)=>{b=K(b);var c="std::string"===b;P(a,{name:b,fromWireType:function(d){var e=A()[d>>2],f=d+4;if(c)for(var g=f,h=0;h<=e;++h){var k=f+h;if(h==e||0==x()[k]){g=J(g,k-g);if(void 0===l)var l=g;else l+=String.fromCharCode(0),l+=g;g=k+1}}else{l=Array(e);for(h=0;h<e;++h)l[h]=String.fromCharCode(x()[f+h]);l=l.join("")}W(d);return l},toWireType:function(d,e){e instanceof ArrayBuffer&&(e=new Uint8Array(e));var f="string"==typeof e;if(!(f||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Int8Array))throw new N("Cannot pass non-string to std::string");var g=c&&f?Wb(e):e.length;var h=D(4+g+1),k=h+4;A()[h>>2]=g;if(c&&f)g+=1,Y(e,x(),k,g);else if(f)for(f=0;f<g;++f){var l=e.charCodeAt(f);if(255<l)throw W(k),new N("String has UTF-16 code units that do not fit in 8 bits");x()[k+f]=l}else for(f=0;f<g;++f)x()[k+f]=e[f];null!==d&&d.push(W,h);return h},ma:8,readValueFromPointer:Cb,ka(d){W(d)}})},n:(a,b,c)=>{c=K(c);if(2===b){var d=Yb;var e=Zb;var f=$b;var g=h=>da()[h>>1]}else 4===b&&(d=ac,e=bc,f=cc,g=h=>A()[h>>2]);P(a,{name:c,fromWireType:h=>{for(var k=A()[h>>2],l,n=h+4,r=0;r<=k;++r){var t=h+4+r*b;if(r==k||0==g(t))n=d(n,t-n),void 0===l?l=n:(l+=String.fromCharCode(0),l+=n),n=t+b}W(h);return l},toWireType:(h,k)=>{if("string"!=typeof k)throw new N(`Cannot pass non-string to C++ string type ${c}`);var l=f(k),n=D(4+l+b);A()[n>>2]=l/b;e(k,n+4,l+b);null!==h&&h.push(W,n);return n},ma:8,readValueFromPointer:Cb,ka(h){W(h)}})},S:(a,b)=>{b=K(b);P(a,{Ra:!0,name:b,ma:0,fromWireType:()=>{},toWireType:()=>{}})},H:(a,b)=>{let c=dc[ec]=new Worker(fc);c.postMessage({$ww:ec,wasm:ya,js:B.mainScriptUrlOrBlob||_scriptName,wasmMemory:p,sb:a,sz:b});c.onmessage=La;return ec++},O:()=>1,u:()=>{ic=0},v:(a,b)=>{gc[a]&&(clearTimeout(gc[a].id),delete gc[a]);if(!b)return 0;var c=setTimeout(()=>{delete gc[a];kc(()=>vc(a,performance.now()))},b);gc[a]={id:c,Va:b};return 0},J:(a,b,c,d)=>{var e=(new Date).getFullYear(),f=(new Date(e,0,1)).getTimezoneOffset();e=(new Date(e,6,1)).getTimezoneOffset();var g=Math.max(f,e);A()[a>>2]=60*g;y()[b>>2]=Number(f!=e);b=h=>{var k=Math.abs(h);return`UTC${0<=h?"-":"+"}${String(Math.floor(k/60)).padStart(2,"0")}${String(k%60).padStart(2,"0")}`};a=b(f);b=b(e);e<f?(Vb(a,c),Vb(b,d)):(Vb(a,d),Vb(b,c))},D:(a,b)=>x().set(mc[a].Ga,b),B:()=>lc.length,C:()=>mc.length,y:(a,b)=>{a=lc[a].Qa;var c=Wb(a)+1;Y(a,x(),b,c)},w:a=>mc[a].mode,E:a=>mc[a].Ga.length,z:(a,b)=>{a=lc[a].Ta;var c=Wb(a)+1;Y(a,x(),b,c)},x:(a,b)=>{a=mc[a].Ua;var c=Wb(a)+1;Y(a,x(),b,c)},G:()=>{a:{if(!nc.length){var a=null;"undefined"!=typeof window&&"function"==typeof window.prompt&&(a=window.prompt("Input: "),null!==a&&(a+="\n"));if(!a){var b=null;break a}b=Array(Wb(a)+1);a=Y(a,b,0,b.length);b.length=a;nc=b}b=nc.shift()}return"number"===typeof b?b:-1},T:a=>{console.error(J(a))},V:a=>{console.log(J(a))},U:a=>{console.warn(J(a))},f:()=>Date.now(),l:a=>G(J(a)),m:()=>performance.now(),F:a=>xa(J(a)),L:a=>{var b=x().length;a>>>=0;if(a<=b||2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);a:{d=(Math.min(2147483648,65536*Math.ceil(Math.max(a,d)/65536))-p.buffer.byteLength+65535)/65536;try{p.grow(d);u();var e=1;break a}catch(f){}e=void 0}if(e)return!0}return!1},M:(a,b)=>{var c=0;qc().forEach((d,e)=>{var f=b+c;e=A()[a+4*e>>2]=f;for(f=0;f<d.length;++f)m()[e++]=d.charCodeAt(f);m()[e]=0;c+=d.length+1});return 0},N:(a,b)=>{var c=qc();A()[a>>2]=c.length;var d=0;c.forEach(e=>d+=e.length+1);A()[b>>2]=d;return 0},b:a=>{Aa=a;jc(a)},i:Ta,I:(a,b)=>{sc(x().subarray(a,a+b));return 0},a:p,t:jc,W:function(a,b){for(let c of Object.values(dc))c.postMessage({_wsc:a,x:[b]}),c.onmessage=d=>Ta(...d.data)}},Z=function(){function a(c,d){Z=c.exports;Wa=Z._;Fa.unshift(Z.X);ya=d;H--;0==H&&(null!==Ma&&(clearInterval(Ma),Ma=null),I&&(c=I,I=null,c()));return Z}var b={a:wc};H++;if(B.instantiateWasm)try{return B.instantiateWasm(b,a)}catch(c){G(`Module.instantiateWasm callback failed with error: ${c}`),na(c)}Pa??=Oa("Vosklet.wasm")?"Vosklet.wasm":F+"Vosklet.wasm";Sa(b,function(c){a(c.instance,c.module)}).catch(na);return{}}(),W=a=>(W=Z.Y)(a),D=a=>(D=Z.Z)(a),Gb=a=>(Gb=Z.$)(a),vc=(a,b)=>(vc=Z.aa)(a,b),Ia=(a,b)=>(Ia=Z.ba)(a,b),xc;I=function yc(){xc||zc();xc||(I=yc)};function zc(){if(!(0<H))if(sa)ma(B),Ha();else{for(;0<Ea.length;)Ea.shift()(B);if(!(0<H||xc||(xc=!0,B.calledRun=!0,za)))for(Ha(),ma(B);0<Ga.length;)Ga.shift()(B)}}zc();moduleRtn=oa; return moduleRtn;});})();if (typeof exports === 'object' && typeof module === 'object') module.exports = loadVosklet;else if (typeof define === 'function' && define['amd']) define([], () => loadVosklet);