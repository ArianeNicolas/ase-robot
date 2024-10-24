"use strict";(()=>{var _C=Object.create;var Qd=Object.defineProperty;var IC=Object.getOwnPropertyDescriptor;var PC=Object.getOwnPropertyNames;var DC=Object.getPrototypeOf,OC=Object.prototype.hasOwnProperty;var qg=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var H=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),LC=(t,e)=>{for(var r in e)Qd(t,r,{get:e[r],enumerable:!0})},MC=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of PC(e))!OC.call(t,i)&&i!==r&&Qd(t,i,{get:()=>e[i],enumerable:!(n=IC(e,i))||n.enumerable});return t};var de=(t,e,r)=>(r=t!=null?_C(DC(t)):{},MC(e||!t||!t.__esModule?Qd(r,"default",{value:t,enumerable:!0}):r,t));var Wn=H(tp=>{"use strict";Object.defineProperty(tp,"__esModule",{value:!0});var Zd;function ep(){if(Zd===void 0)throw new Error("No runtime abstraction layer installed");return Zd}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Zd=r}t.install=e})(ep||(ep={}));tp.default=ep});var rp=H(Aa=>{"use strict";Object.defineProperty(Aa,"__esModule",{value:!0});Aa.Disposable=void 0;var FC;(function(t){function e(r){return{dispose:r}}t.create=e})(FC=Aa.Disposable||(Aa.Disposable={}))});var no=H(ro=>{"use strict";Object.defineProperty(ro,"__esModule",{value:!0});ro.Emitter=ro.Event=void 0;var qC=Wn(),UC;(function(t){let e={dispose(){}};t.None=function(){return e}})(UC=ro.Event||(ro.Event={}));var np=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{r.push(n[o].apply(i[o],e))}catch(a){(0,qC.default)().console.error(a)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},Zc=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new np),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};ro.Emitter=Zc;Zc._noop=function(){}});var Ug=H(el=>{"use strict";Object.defineProperty(el,"__esModule",{value:!0});el.AbstractMessageBuffer=void 0;var GC=13,jC=10,HC=`\r
`,ip=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let c=this._chunks[r];for(n=0;n<c.length;){switch(c[n]){case GC:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case jC:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=c.byteLength,r++}if(e!==4)return;let o=this._read(i+n),s=new Map,a=this.toString(o,"ascii").split(HC);if(a.length<2)return s;for(let c=0;c<a.length-2;c++){let l=a[c],u=l.indexOf(":");if(u===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,u),m=l.substr(u+1).trim();s.set(f,m)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);r.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else r.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return r}};el.AbstractMessageBuffer=ip});var Hg=H(cp=>{"use strict";Object.defineProperty(cp,"__esModule",{value:!0});var Gg=Wn(),qo=rp(),BC=no(),KC=Ug(),tl=class t extends KC.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};tl.emptyBuffer=new Uint8Array(0);var op=class{constructor(e){this.socket=e,this._onData=new BC.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,Gg.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),qo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),qo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),qo.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},sp=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),qo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),qo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),qo.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},WC=new TextEncoder,jg=Object.freeze({messageBuffer:Object.freeze({create:t=>new tl(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(WC.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new op(t),asWritableStream:t=>new sp(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function ap(){return jg}(function(t){function e(){Gg.default.install(jg)}t.install=e})(ap||(ap={}));cp.default=ap});var Uo=H(rr=>{"use strict";Object.defineProperty(rr,"__esModule",{value:!0});rr.stringArray=rr.array=rr.func=rr.error=rr.number=rr.string=rr.boolean=void 0;function VC(t){return t===!0||t===!1}rr.boolean=VC;function Bg(t){return typeof t=="string"||t instanceof String}rr.string=Bg;function zC(t){return typeof t=="number"||t instanceof Number}rr.number=zC;function XC(t){return t instanceof Error}rr.error=XC;function YC(t){return typeof t=="function"}rr.func=YC;function Kg(t){return Array.isArray(t)}rr.array=Kg;function JC(t){return Kg(t)&&t.every(e=>Bg(e))}rr.stringArray=JC});var Ip=H(z=>{"use strict";Object.defineProperty(z,"__esModule",{value:!0});z.Message=z.NotificationType9=z.NotificationType8=z.NotificationType7=z.NotificationType6=z.NotificationType5=z.NotificationType4=z.NotificationType3=z.NotificationType2=z.NotificationType1=z.NotificationType0=z.NotificationType=z.RequestType9=z.RequestType8=z.RequestType7=z.RequestType6=z.RequestType5=z.RequestType4=z.RequestType3=z.RequestType2=z.RequestType1=z.RequestType=z.RequestType0=z.AbstractMessageSignature=z.ParameterStructures=z.ResponseError=z.ErrorCodes=void 0;var io=Uo(),Wg;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(Wg=z.ErrorCodes||(z.ErrorCodes={}));var lp=class t extends Error{constructor(e,r,n){super(r),this.code=io.number(e)?e:Wg.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};z.ResponseError=lp;var Rr=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};z.ParameterStructures=Rr;Rr.auto=new Rr("auto");Rr.byPosition=new Rr("byPosition");Rr.byName=new Rr("byName");var Xe=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Rr.auto}};z.AbstractMessageSignature=Xe;var up=class extends Xe{constructor(e){super(e,0)}};z.RequestType0=up;var fp=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};z.RequestType=fp;var dp=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};z.RequestType1=dp;var pp=class extends Xe{constructor(e){super(e,2)}};z.RequestType2=pp;var mp=class extends Xe{constructor(e){super(e,3)}};z.RequestType3=mp;var hp=class extends Xe{constructor(e){super(e,4)}};z.RequestType4=hp;var gp=class extends Xe{constructor(e){super(e,5)}};z.RequestType5=gp;var yp=class extends Xe{constructor(e){super(e,6)}};z.RequestType6=yp;var Tp=class extends Xe{constructor(e){super(e,7)}};z.RequestType7=Tp;var vp=class extends Xe{constructor(e){super(e,8)}};z.RequestType8=vp;var xp=class extends Xe{constructor(e){super(e,9)}};z.RequestType9=xp;var Rp=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};z.NotificationType=Rp;var bp=class extends Xe{constructor(e){super(e,0)}};z.NotificationType0=bp;var Ap=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};z.NotificationType1=Ap;var Sp=class extends Xe{constructor(e){super(e,2)}};z.NotificationType2=Sp;var wp=class extends Xe{constructor(e){super(e,3)}};z.NotificationType3=wp;var Cp=class extends Xe{constructor(e){super(e,4)}};z.NotificationType4=Cp;var kp=class extends Xe{constructor(e){super(e,5)}};z.NotificationType5=kp;var Ep=class extends Xe{constructor(e){super(e,6)}};z.NotificationType6=Ep;var $p=class extends Xe{constructor(e){super(e,7)}};z.NotificationType7=$p;var Np=class extends Xe{constructor(e){super(e,8)}};z.NotificationType8=Np;var _p=class extends Xe{constructor(e){super(e,9)}};z.NotificationType9=_p;var QC;(function(t){function e(i){let o=i;return o&&io.string(o.method)&&(io.string(o.id)||io.number(o.id))}t.isRequest=e;function r(i){let o=i;return o&&io.string(o.method)&&i.id===void 0}t.isNotification=r;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(io.string(o.id)||io.number(o.id)||o.id===null)}t.isResponse=n})(QC=z.Message||(z.Message={}))});var Dp=H(Vn=>{"use strict";var Vg;Object.defineProperty(Vn,"__esModule",{value:!0});Vn.LRUCache=Vn.LinkedMap=Vn.Touch=void 0;var fr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(fr=Vn.Touch||(Vn.Touch={}));var rl=class{constructor(){this[Vg]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=fr.None){let n=this._map.get(e);if(n)return r!==fr.None&&this.touch(n,r),n.value}set(e,r,n=fr.None){let i=this._map.get(e);if(i)i.value=r,n!==fr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case fr.None:this.addItemLast(i);break;case fr.First:this.addItemFirst(i);break;case fr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(Vg=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==fr.First&&r!==fr.Last)){if(r===fr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===fr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};Vn.LinkedMap=rl;var Pp=class extends rl{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=fr.AsNew){return super.get(e,r)}peek(e){return super.get(e,fr.None)}set(e,r){return super.set(e,r,fr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Vn.LRUCache=Pp});var Fp=H(oo=>{"use strict";Object.defineProperty(oo,"__esModule",{value:!0});oo.CancellationTokenSource=oo.CancellationToken=void 0;var ZC=Wn(),ek=Uo(),Op=no(),Lp;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Op.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Op.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||ek.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(Lp=oo.CancellationToken||(oo.CancellationToken={}));var tk=Object.freeze(function(t,e){let r=(0,ZC.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),nl=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?tk:(this._emitter||(this._emitter=new Op.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},Mp=class{get token(){return this._token||(this._token=new nl),this._token}cancel(){this._token?this._token.cancel():this._token=Lp.Cancelled}dispose(){this._token?this._token instanceof nl&&this._token.dispose():this._token=Lp.None}};oo.CancellationTokenSource=Mp});var zg=H(zn=>{"use strict";Object.defineProperty(zn,"__esModule",{value:!0});zn.ReadableStreamMessageReader=zn.AbstractMessageReader=zn.MessageReader=void 0;var Up=Wn(),Go=Uo(),qp=no(),rk;(function(t){function e(r){let n=r;return n&&Go.func(n.listen)&&Go.func(n.dispose)&&Go.func(n.onError)&&Go.func(n.onClose)&&Go.func(n.onPartialMessage)}t.is=e})(rk=zn.MessageReader||(zn.MessageReader={}));var il=class{constructor(){this.errorEmitter=new qp.Emitter,this.closeEmitter=new qp.Emitter,this.partialMessageEmitter=new qp.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${Go.string(e.message)?e.message:"unknown"}`)}};zn.AbstractMessageReader=il;var Gp;(function(t){function e(r){let n,i,o,s=new Map,a,c=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(o=r.contentDecoder,s.set(o.name,o)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)s.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(a=r.contentTypeDecoder,c.set(a.name,a)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)c.set(l.name,l)}return a===void 0&&(a=(0,Up.default)().applicationJson.decoder,c.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:c}}t.fromOptions=e})(Gp||(Gp={}));var jp=class extends il{constructor(e,r){super(),this.readable=e,this.options=Gp.fromOptions(r),this.buffer=(0,Up.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let s=parseInt(o);if(isNaN(s))throw new Error("Content-Length value must be a number.");this.nextMessageLength=s}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Up.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};zn.ReadableStreamMessageReader=jp});var Xg=H(ol=>{"use strict";Object.defineProperty(ol,"__esModule",{value:!0});ol.Semaphore=void 0;var nk=Wn(),Hp=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,nk.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};ol.Semaphore=Hp});var Zg=H(Xn=>{"use strict";Object.defineProperty(Xn,"__esModule",{value:!0});Xn.WriteableStreamMessageWriter=Xn.AbstractMessageWriter=Xn.MessageWriter=void 0;var Yg=Wn(),Sa=Uo(),ik=Xg(),Jg=no(),ok="Content-Length: ",Qg=`\r
`,sk;(function(t){function e(r){let n=r;return n&&Sa.func(n.dispose)&&Sa.func(n.onClose)&&Sa.func(n.onError)&&Sa.func(n.write)}t.is=e})(sk=Xn.MessageWriter||(Xn.MessageWriter={}));var sl=class{constructor(){this.errorEmitter=new Jg.Emitter,this.closeEmitter=new Jg.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${Sa.string(e.message)?e.message:"unknown"}`)}};Xn.AbstractMessageWriter=sl;var Bp;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,Yg.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,Yg.default)().applicationJson.encoder}}t.fromOptions=e})(Bp||(Bp={}));var Kp=class extends sl{constructor(e,r){super(),this.writable=e,this.options=Bp.fromOptions(r),this.errorCount=0,this.writeSemaphore=new ik.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(ok,n.byteLength.toString(),Qg),i.push(Qg),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};Xn.WriteableStreamMessageWriter=Kp});var oy=H(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.createMessageConnection=Y.ConnectionOptions=Y.CancellationStrategy=Y.CancellationSenderStrategy=Y.CancellationReceiverStrategy=Y.ConnectionStrategy=Y.ConnectionError=Y.ConnectionErrors=Y.LogTraceNotification=Y.SetTraceNotification=Y.TraceFormat=Y.TraceValues=Y.Trace=Y.NullLogger=Y.ProgressType=Y.ProgressToken=void 0;var ey=Wn(),It=Uo(),Z=Ip(),ty=Dp(),wa=no(),Wp=Fp(),ka;(function(t){t.type=new Z.NotificationType("$/cancelRequest")})(ka||(ka={}));var ry;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(ry=Y.ProgressToken||(Y.ProgressToken={}));var Ca;(function(t){t.type=new Z.NotificationType("$/progress")})(Ca||(Ca={}));var Vp=class{constructor(){}};Y.ProgressType=Vp;var zp;(function(t){function e(r){return It.func(r)}t.is=e})(zp||(zp={}));Y.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var $e;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})($e=Y.Trace||(Y.Trace={}));var ak;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(ak=Y.TraceValues||(Y.TraceValues={}));(function(t){function e(n){if(!It.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})($e=Y.Trace||(Y.Trace={}));var rn;(function(t){t.Text="text",t.JSON="json"})(rn=Y.TraceFormat||(Y.TraceFormat={}));(function(t){function e(r){return It.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(rn=Y.TraceFormat||(Y.TraceFormat={}));var ny;(function(t){t.type=new Z.NotificationType("$/setTrace")})(ny=Y.SetTraceNotification||(Y.SetTraceNotification={}));var Xp;(function(t){t.type=new Z.NotificationType("$/logTrace")})(Xp=Y.LogTraceNotification||(Y.LogTraceNotification={}));var al;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(al=Y.ConnectionErrors||(Y.ConnectionErrors={}));var jo=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};Y.ConnectionError=jo;var iy;(function(t){function e(r){let n=r;return n&&It.func(n.cancelUndispatched)}t.is=e})(iy=Y.ConnectionStrategy||(Y.ConnectionStrategy={}));var Yp;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Wp.CancellationTokenSource}});function e(r){let n=r;return n&&It.func(n.createCancellationTokenSource)}t.is=e})(Yp=Y.CancellationReceiverStrategy||(Y.CancellationReceiverStrategy={}));var Jp;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(ka.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&It.func(n.sendCancellation)&&It.func(n.cleanup)}t.is=e})(Jp=Y.CancellationSenderStrategy||(Y.CancellationSenderStrategy={}));var Qp;(function(t){t.Message=Object.freeze({receiver:Yp.Message,sender:Jp.Message});function e(r){let n=r;return n&&Yp.is(n.receiver)&&Jp.is(n.sender)}t.is=e})(Qp=Y.CancellationStrategy||(Y.CancellationStrategy={}));var ck;(function(t){function e(r){let n=r;return n&&(Qp.is(n.cancellationStrategy)||iy.is(n.connectionStrategy))}t.is=e})(ck=Y.ConnectionOptions||(Y.ConnectionOptions={}));var nn;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(nn||(nn={}));function lk(t,e,r,n){let i=r!==void 0?r:Y.NullLogger,o=0,s=0,a=0,c="2.0",l,u=new Map,f,m=new Map,T=new Map,A,w=new ty.LinkedMap,N=new Map,C=new Set,v=new Map,y=$e.Off,$=rn.Text,D,X=nn.New,ye=new wa.Emitter,Ee=new wa.Emitter,Ht=new wa.Emitter,xt=new wa.Emitter,M=new wa.Emitter,S=n&&n.cancellationStrategy?n.cancellationStrategy:Qp.Message;function U(x){if(x===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+x.toString()}function j(x){return x===null?"res-unknown-"+(++a).toString():"res-"+x.toString()}function ce(){return"not-"+(++s).toString()}function ee(x,P){Z.Message.isRequest(P)?x.set(U(P.id),P):Z.Message.isResponse(P)?x.set(j(P.id),P):x.set(ce(),P)}function Q(x){}function Rt(){return X===nn.Listening}function ut(){return X===nn.Closed}function me(){return X===nn.Disposed}function $r(){(X===nn.New||X===nn.Listening)&&(X=nn.Closed,Ee.fire(void 0))}function Hn(x){ye.fire([x,void 0,void 0])}function Ra(x){ye.fire(x)}t.onClose($r),t.onError(Hn),e.onClose($r),e.onError(Ra);function Qi(){A||w.size===0||(A=(0,ey.default)().timer.setImmediate(()=>{A=void 0,ur()}))}function ur(){if(w.size===0)return;let x=w.shift();try{Z.Message.isRequest(x)?bt(x):Z.Message.isNotification(x)?Rn(x):Z.Message.isResponse(x)?er(x):Bt(x)}finally{Qi()}}let Lo=x=>{try{if(Z.Message.isNotification(x)&&x.method===ka.type.method){let P=x.params.id,F=U(P),W=w.get(F);if(Z.Message.isRequest(W)){let Oe=n?.connectionStrategy,Je=Oe&&Oe.cancelUndispatched?Oe.cancelUndispatched(W,Q):void 0;if(Je&&(Je.error!==void 0||Je.result!==void 0)){w.delete(F),v.delete(P),Je.id=W.id,xr(Je,x.method,Date.now()),e.write(Je).catch(()=>i.error("Sending response for canceled message failed."));return}}let De=v.get(P);if(De!==void 0){De.cancel(),xi(x);return}else C.add(P)}ee(w,x)}finally{Qi()}};function bt(x){if(me())return;function P(ue,qe,Te){let gt={jsonrpc:c,id:x.id};ue instanceof Z.ResponseError?gt.error=ue.toJson():gt.result=ue===void 0?null:ue,xr(gt,qe,Te),e.write(gt).catch(()=>i.error("Sending response failed."))}function F(ue,qe,Te){let gt={jsonrpc:c,id:x.id,error:ue.toJson()};xr(gt,qe,Te),e.write(gt).catch(()=>i.error("Sending response failed."))}function W(ue,qe,Te){ue===void 0&&(ue=null);let gt={jsonrpc:c,id:x.id,result:ue};xr(gt,qe,Te),e.write(gt).catch(()=>i.error("Sending response failed."))}Zi(x);let De=u.get(x.method),Oe,Je;De&&(Oe=De.type,Je=De.handler);let At=Date.now();if(Je||l){let ue=x.id??String(Date.now()),qe=S.receiver.createCancellationTokenSource(ue);x.id!==null&&C.has(x.id)&&qe.cancel(),x.id!==null&&v.set(ue,qe);try{let Te;if(Je)if(x.params===void 0){if(Oe!==void 0&&Oe.numberOfParams!==0){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines ${Oe.numberOfParams} params but received none.`),x.method,At);return}Te=Je(qe.token)}else if(Array.isArray(x.params)){if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byName){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by name but received parameters by position`),x.method,At);return}Te=Je(...x.params,qe.token)}else{if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byPosition){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by position but received parameters by name`),x.method,At);return}Te=Je(x.params,qe.token)}else l&&(Te=l(x.method,x.params,qe.token));let gt=Te;Te?gt.then?gt.then(tr=>{v.delete(ue),P(tr,x.method,At)},tr=>{v.delete(ue),tr instanceof Z.ResponseError?F(tr,x.method,At):tr&&It.string(tr.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${tr.message}`),x.method,At):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,At)}):(v.delete(ue),P(Te,x.method,At)):(v.delete(ue),W(Te,x.method,At))}catch(Te){v.delete(ue),Te instanceof Z.ResponseError?P(Te,x.method,At):Te&&It.string(Te.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${Te.message}`),x.method,At):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,At)}}else F(new Z.ResponseError(Z.ErrorCodes.MethodNotFound,`Unhandled method ${x.method}`),x.method,At)}function er(x){if(!me())if(x.id===null)x.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(x.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let P=x.id,F=N.get(P);if(Xd(x,F),F!==void 0){N.delete(P);try{if(x.error){let W=x.error;F.reject(new Z.ResponseError(W.code,W.message,W.data))}else if(x.result!==void 0)F.resolve(x.result);else throw new Error("Should never happen.")}catch(W){W.message?i.error(`Response handler '${F.method}' failed with message: ${W.message}`):i.error(`Response handler '${F.method}' failed unexpectedly.`)}}}}function Rn(x){if(me())return;let P,F;if(x.method===ka.type.method){let W=x.params.id;C.delete(W),xi(x);return}else{let W=m.get(x.method);W&&(F=W.handler,P=W.type)}if(F||f)try{if(xi(x),F)if(x.params===void 0)P!==void 0&&P.numberOfParams!==0&&P.parameterStructures!==Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines ${P.numberOfParams} params but received none.`),F();else if(Array.isArray(x.params)){let W=x.params;x.method===Ca.type.method&&W.length===2&&ry.is(W[0])?F({token:W[0],value:W[1]}):(P!==void 0&&(P.parameterStructures===Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines parameters by name but received parameters by position`),P.numberOfParams!==x.params.length&&i.error(`Notification ${x.method} defines ${P.numberOfParams} params but received ${W.length} arguments`)),F(...W))}else P!==void 0&&P.parameterStructures===Z.ParameterStructures.byPosition&&i.error(`Notification ${x.method} defines parameters by position but received parameters by name`),F(x.params);else f&&f(x.method,x.params)}catch(W){W.message?i.error(`Notification handler '${x.method}' failed with message: ${W.message}`):i.error(`Notification handler '${x.method}' failed unexpectedly.`)}else Ht.fire(x)}function Bt(x){if(!x){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(x,null,4)}`);let P=x;if(It.string(P.id)||It.number(P.id)){let F=P.id,W=N.get(F);W&&W.reject(new Error("The received response has neither a result nor an error property."))}}function ft(x){if(x!=null)switch(y){case $e.Verbose:return JSON.stringify(x,null,4);case $e.Compact:return JSON.stringify(x);default:return}}function Gr(x){if(!(y===$e.Off||!D))if($===rn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&x.params&&(P=`Params: ${ft(x.params)}

`),D.log(`Sending request '${x.method} - (${x.id})'.`,P)}else Ri("send-request",x)}function Nr(x){if(!(y===$e.Off||!D))if($===rn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&(x.params?P=`Params: ${ft(x.params)}

`:P=`No parameters provided.

`),D.log(`Sending notification '${x.method}'.`,P)}else Ri("send-notification",x)}function xr(x,P,F){if(!(y===$e.Off||!D))if($===rn.Text){let W;(y===$e.Verbose||y===$e.Compact)&&(x.error&&x.error.data?W=`Error data: ${ft(x.error.data)}

`:x.result?W=`Result: ${ft(x.result)}

`:x.error===void 0&&(W=`No result returned.

`)),D.log(`Sending response '${P} - (${x.id})'. Processing request took ${Date.now()-F}ms`,W)}else Ri("send-response",x)}function Zi(x){if(!(y===$e.Off||!D))if($===rn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&x.params&&(P=`Params: ${ft(x.params)}

`),D.log(`Received request '${x.method} - (${x.id})'.`,P)}else Ri("receive-request",x)}function xi(x){if(!(y===$e.Off||!D||x.method===Xp.type.method))if($===rn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&(x.params?P=`Params: ${ft(x.params)}

`:P=`No parameters provided.

`),D.log(`Received notification '${x.method}'.`,P)}else Ri("receive-notification",x)}function Xd(x,P){if(!(y===$e.Off||!D))if($===rn.Text){let F;if((y===$e.Verbose||y===$e.Compact)&&(x.error&&x.error.data?F=`Error data: ${ft(x.error.data)}

`:x.result?F=`Result: ${ft(x.result)}

`:x.error===void 0&&(F=`No result returned.

`)),P){let W=x.error?` Request failed: ${x.error.message} (${x.error.code}).`:"";D.log(`Received response '${P.method} - (${x.id})' in ${Date.now()-P.timerStart}ms.${W}`,F)}else D.log(`Received response ${x.id} without active response promise.`,F)}else Ri("receive-response",x)}function Ri(x,P){if(!D||y===$e.Off)return;let F={isLSPMessage:!0,type:x,message:P,timestamp:Date.now()};D.log(F)}function eo(){if(ut())throw new jo(al.Closed,"Connection is closed.");if(me())throw new jo(al.Disposed,"Connection is disposed.")}function Yd(){if(Rt())throw new jo(al.AlreadyListening,"Connection is already listening")}function Jd(){if(!Rt())throw new Error("Call listen() first.")}function to(x){return x===void 0?null:x}function Mo(x){if(x!==null)return x}function Yc(x){return x!=null&&!Array.isArray(x)&&typeof x=="object"}function ba(x,P){switch(x){case Z.ParameterStructures.auto:return Yc(P)?Mo(P):[to(P)];case Z.ParameterStructures.byName:if(!Yc(P))throw new Error("Received parameters by name but param is not an object literal.");return Mo(P);case Z.ParameterStructures.byPosition:return[to(P)];default:throw new Error(`Unknown parameter structure ${x.toString()}`)}}function Jc(x,P){let F,W=x.numberOfParams;switch(W){case 0:F=void 0;break;case 1:F=ba(x.parameterStructures,P[0]);break;default:F=[];for(let De=0;De<P.length&&De<W;De++)F.push(to(P[De]));if(P.length<W)for(let De=P.length;De<W;De++)F.push(null);break}return F}let bi={sendNotification:(x,...P)=>{eo();let F,W;if(It.string(x)){F=x;let Oe=P[0],Je=0,At=Z.ParameterStructures.auto;Z.ParameterStructures.is(Oe)&&(Je=1,At=Oe);let ue=P.length,qe=ue-Je;switch(qe){case 0:W=void 0;break;case 1:W=ba(At,P[Je]);break;default:if(At===Z.ParameterStructures.byName)throw new Error(`Received ${qe} parameters for 'by Name' notification parameter structure.`);W=P.slice(Je,ue).map(Te=>to(Te));break}}else{let Oe=P;F=x.method,W=Jc(x,Oe)}let De={jsonrpc:c,method:F,params:W};return Nr(De),e.write(De).catch(()=>i.error("Sending notification failed."))},onNotification:(x,P)=>{eo();let F;return It.func(x)?f=x:P&&(It.string(x)?(F=x,m.set(x,{type:void 0,handler:P})):(F=x.method,m.set(x.method,{type:x,handler:P}))),{dispose:()=>{F!==void 0?m.delete(F):f=void 0}}},onProgress:(x,P,F)=>{if(T.has(P))throw new Error(`Progress handler for token ${P} already registered`);return T.set(P,F),{dispose:()=>{T.delete(P)}}},sendProgress:(x,P,F)=>bi.sendNotification(Ca.type,{token:P,value:F}),onUnhandledProgress:xt.event,sendRequest:(x,...P)=>{eo(),Jd();let F,W,De;if(It.string(x)){F=x;let ue=P[0],qe=P[P.length-1],Te=0,gt=Z.ParameterStructures.auto;Z.ParameterStructures.is(ue)&&(Te=1,gt=ue);let tr=P.length;Wp.CancellationToken.is(qe)&&(tr=tr-1,De=qe);let Bn=tr-Te;switch(Bn){case 0:W=void 0;break;case 1:W=ba(gt,P[Te]);break;default:if(gt===Z.ParameterStructures.byName)throw new Error(`Received ${Bn} parameters for 'by Name' request parameter structure.`);W=P.slice(Te,tr).map(bn=>to(bn));break}}else{let ue=P;F=x.method,W=Jc(x,ue);let qe=x.numberOfParams;De=Wp.CancellationToken.is(ue[qe])?ue[qe]:void 0}let Oe=o++,Je;return De&&(Je=De.onCancellationRequested(()=>{let ue=S.sender.sendCancellation(bi,Oe);return ue===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Oe}`),Promise.resolve()):ue.catch(()=>{i.log(`Sending cancellation messages for id ${Oe} failed`)})})),new Promise((ue,qe)=>{let Te={jsonrpc:c,id:Oe,method:F,params:W},gt=bn=>{ue(bn),S.sender.cleanup(Oe),Je?.dispose()},tr=bn=>{qe(bn),S.sender.cleanup(Oe),Je?.dispose()},Bn={method:F,timerStart:Date.now(),resolve:gt,reject:tr};Gr(Te);try{e.write(Te).catch(()=>i.error("Sending request failed."))}catch(bn){Bn.reject(new Z.ResponseError(Z.ErrorCodes.MessageWriteError,bn.message?bn.message:"Unknown reason")),Bn=null}Bn&&N.set(Oe,Bn)})},onRequest:(x,P)=>{eo();let F=null;return zp.is(x)?(F=void 0,l=x):It.string(x)?(F=null,P!==void 0&&(F=x,u.set(x,{handler:P,type:void 0}))):P!==void 0&&(F=x.method,u.set(x.method,{type:x,handler:P})),{dispose:()=>{F!==null&&(F!==void 0?u.delete(F):l=void 0)}}},hasPendingResponse:()=>N.size>0,trace:async(x,P,F)=>{let W=!1,De=rn.Text;F!==void 0&&(It.boolean(F)?W=F:(W=F.sendNotification||!1,De=F.traceFormat||rn.Text)),y=x,$=De,y===$e.Off?D=void 0:D=P,W&&!ut()&&!me()&&await bi.sendNotification(ny.type,{value:$e.toString(x)})},onError:ye.event,onClose:Ee.event,onUnhandledNotification:Ht.event,onDispose:M.event,end:()=>{e.end()},dispose:()=>{if(me())return;X=nn.Disposed,M.fire(void 0);let x=new Z.ResponseError(Z.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let P of N.values())P.reject(x);N=new Map,v=new Map,C=new Set,w=new ty.LinkedMap,It.func(e.dispose)&&e.dispose(),It.func(t.dispose)&&t.dispose()},listen:()=>{eo(),Yd(),X=nn.Listening,t.listen(Lo)},inspect:()=>{(0,ey.default)().console.log("inspect")}};return bi.onNotification(Xp.type,x=>{if(y===$e.Off||!D)return;let P=y===$e.Verbose||y===$e.Compact;D.log(x.message,P?x.verbose:void 0)}),bi.onNotification(Ca.type,x=>{let P=T.get(x.token);P?P(x.value):xt.fire(x)}),bi}Y.createMessageConnection=lk});var rm=H(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.TraceFormat=_.TraceValues=_.Trace=_.ProgressType=_.ProgressToken=_.createMessageConnection=_.NullLogger=_.ConnectionOptions=_.ConnectionStrategy=_.WriteableStreamMessageWriter=_.AbstractMessageWriter=_.MessageWriter=_.ReadableStreamMessageReader=_.AbstractMessageReader=_.MessageReader=_.CancellationToken=_.CancellationTokenSource=_.Emitter=_.Event=_.Disposable=_.LRUCache=_.Touch=_.LinkedMap=_.ParameterStructures=_.NotificationType9=_.NotificationType8=_.NotificationType7=_.NotificationType6=_.NotificationType5=_.NotificationType4=_.NotificationType3=_.NotificationType2=_.NotificationType1=_.NotificationType0=_.NotificationType=_.ErrorCodes=_.ResponseError=_.RequestType9=_.RequestType8=_.RequestType7=_.RequestType6=_.RequestType5=_.RequestType4=_.RequestType3=_.RequestType2=_.RequestType1=_.RequestType0=_.RequestType=_.Message=_.RAL=void 0;_.CancellationStrategy=_.CancellationSenderStrategy=_.CancellationReceiverStrategy=_.ConnectionError=_.ConnectionErrors=_.LogTraceNotification=_.SetTraceNotification=void 0;var Ge=Ip();Object.defineProperty(_,"Message",{enumerable:!0,get:function(){return Ge.Message}});Object.defineProperty(_,"RequestType",{enumerable:!0,get:function(){return Ge.RequestType}});Object.defineProperty(_,"RequestType0",{enumerable:!0,get:function(){return Ge.RequestType0}});Object.defineProperty(_,"RequestType1",{enumerable:!0,get:function(){return Ge.RequestType1}});Object.defineProperty(_,"RequestType2",{enumerable:!0,get:function(){return Ge.RequestType2}});Object.defineProperty(_,"RequestType3",{enumerable:!0,get:function(){return Ge.RequestType3}});Object.defineProperty(_,"RequestType4",{enumerable:!0,get:function(){return Ge.RequestType4}});Object.defineProperty(_,"RequestType5",{enumerable:!0,get:function(){return Ge.RequestType5}});Object.defineProperty(_,"RequestType6",{enumerable:!0,get:function(){return Ge.RequestType6}});Object.defineProperty(_,"RequestType7",{enumerable:!0,get:function(){return Ge.RequestType7}});Object.defineProperty(_,"RequestType8",{enumerable:!0,get:function(){return Ge.RequestType8}});Object.defineProperty(_,"RequestType9",{enumerable:!0,get:function(){return Ge.RequestType9}});Object.defineProperty(_,"ResponseError",{enumerable:!0,get:function(){return Ge.ResponseError}});Object.defineProperty(_,"ErrorCodes",{enumerable:!0,get:function(){return Ge.ErrorCodes}});Object.defineProperty(_,"NotificationType",{enumerable:!0,get:function(){return Ge.NotificationType}});Object.defineProperty(_,"NotificationType0",{enumerable:!0,get:function(){return Ge.NotificationType0}});Object.defineProperty(_,"NotificationType1",{enumerable:!0,get:function(){return Ge.NotificationType1}});Object.defineProperty(_,"NotificationType2",{enumerable:!0,get:function(){return Ge.NotificationType2}});Object.defineProperty(_,"NotificationType3",{enumerable:!0,get:function(){return Ge.NotificationType3}});Object.defineProperty(_,"NotificationType4",{enumerable:!0,get:function(){return Ge.NotificationType4}});Object.defineProperty(_,"NotificationType5",{enumerable:!0,get:function(){return Ge.NotificationType5}});Object.defineProperty(_,"NotificationType6",{enumerable:!0,get:function(){return Ge.NotificationType6}});Object.defineProperty(_,"NotificationType7",{enumerable:!0,get:function(){return Ge.NotificationType7}});Object.defineProperty(_,"NotificationType8",{enumerable:!0,get:function(){return Ge.NotificationType8}});Object.defineProperty(_,"NotificationType9",{enumerable:!0,get:function(){return Ge.NotificationType9}});Object.defineProperty(_,"ParameterStructures",{enumerable:!0,get:function(){return Ge.ParameterStructures}});var Zp=Dp();Object.defineProperty(_,"LinkedMap",{enumerable:!0,get:function(){return Zp.LinkedMap}});Object.defineProperty(_,"LRUCache",{enumerable:!0,get:function(){return Zp.LRUCache}});Object.defineProperty(_,"Touch",{enumerable:!0,get:function(){return Zp.Touch}});var uk=rp();Object.defineProperty(_,"Disposable",{enumerable:!0,get:function(){return uk.Disposable}});var sy=no();Object.defineProperty(_,"Event",{enumerable:!0,get:function(){return sy.Event}});Object.defineProperty(_,"Emitter",{enumerable:!0,get:function(){return sy.Emitter}});var ay=Fp();Object.defineProperty(_,"CancellationTokenSource",{enumerable:!0,get:function(){return ay.CancellationTokenSource}});Object.defineProperty(_,"CancellationToken",{enumerable:!0,get:function(){return ay.CancellationToken}});var em=zg();Object.defineProperty(_,"MessageReader",{enumerable:!0,get:function(){return em.MessageReader}});Object.defineProperty(_,"AbstractMessageReader",{enumerable:!0,get:function(){return em.AbstractMessageReader}});Object.defineProperty(_,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return em.ReadableStreamMessageReader}});var tm=Zg();Object.defineProperty(_,"MessageWriter",{enumerable:!0,get:function(){return tm.MessageWriter}});Object.defineProperty(_,"AbstractMessageWriter",{enumerable:!0,get:function(){return tm.AbstractMessageWriter}});Object.defineProperty(_,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return tm.WriteableStreamMessageWriter}});var nr=oy();Object.defineProperty(_,"ConnectionStrategy",{enumerable:!0,get:function(){return nr.ConnectionStrategy}});Object.defineProperty(_,"ConnectionOptions",{enumerable:!0,get:function(){return nr.ConnectionOptions}});Object.defineProperty(_,"NullLogger",{enumerable:!0,get:function(){return nr.NullLogger}});Object.defineProperty(_,"createMessageConnection",{enumerable:!0,get:function(){return nr.createMessageConnection}});Object.defineProperty(_,"ProgressToken",{enumerable:!0,get:function(){return nr.ProgressToken}});Object.defineProperty(_,"ProgressType",{enumerable:!0,get:function(){return nr.ProgressType}});Object.defineProperty(_,"Trace",{enumerable:!0,get:function(){return nr.Trace}});Object.defineProperty(_,"TraceValues",{enumerable:!0,get:function(){return nr.TraceValues}});Object.defineProperty(_,"TraceFormat",{enumerable:!0,get:function(){return nr.TraceFormat}});Object.defineProperty(_,"SetTraceNotification",{enumerable:!0,get:function(){return nr.SetTraceNotification}});Object.defineProperty(_,"LogTraceNotification",{enumerable:!0,get:function(){return nr.LogTraceNotification}});Object.defineProperty(_,"ConnectionErrors",{enumerable:!0,get:function(){return nr.ConnectionErrors}});Object.defineProperty(_,"ConnectionError",{enumerable:!0,get:function(){return nr.ConnectionError}});Object.defineProperty(_,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return nr.CancellationReceiverStrategy}});Object.defineProperty(_,"CancellationSenderStrategy",{enumerable:!0,get:function(){return nr.CancellationSenderStrategy}});Object.defineProperty(_,"CancellationStrategy",{enumerable:!0,get:function(){return nr.CancellationStrategy}});var fk=Wn();_.RAL=fk.default});var Yn=H(_r=>{"use strict";var dk=_r&&_r.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),pk=_r&&_r.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&dk(e,t,r)};Object.defineProperty(_r,"__esModule",{value:!0});_r.createMessageConnection=_r.BrowserMessageWriter=_r.BrowserMessageReader=void 0;var mk=Hg();mk.default.install();var Ho=rm();pk(rm(),_r);var nm=class extends Ho.AbstractMessageReader{constructor(e){super(),this._onData=new Ho.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};_r.BrowserMessageReader=nm;var im=class extends Ho.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};_r.BrowserMessageWriter=im;function hk(t,e,r,n){return r===void 0&&(r=Ho.NullLogger),Ho.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Ho.createMessageConnection)(t,e,r,n)}_r.createMessageConnection=hk});var om=H((lj,cy)=>{"use strict";cy.exports=Yn()});var so=H((ly,cl)=>{(function(t){if(typeof cl=="object"&&typeof cl.exports=="object"){var e=t(qg,ly);e!==void 0&&(cl.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(p){function R(b){return typeof b=="string"}p.is=R})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(p){function R(b){return typeof b=="string"}p.is=R})(n=e.URI||(e.URI={}));var i;(function(p){p.MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(i=e.integer||(e.integer={}));var o;(function(p){p.MIN_VALUE=0,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(o=e.uinteger||(e.uinteger={}));var s;(function(p){function R(g,d){return g===Number.MAX_VALUE&&(g=o.MAX_VALUE),d===Number.MAX_VALUE&&(d=o.MAX_VALUE),{line:g,character:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.line)&&k.uinteger(d.character)}p.is=b})(s=e.Position||(e.Position={}));var a;(function(p){function R(g,d,E,I){if(k.uinteger(g)&&k.uinteger(d)&&k.uinteger(E)&&k.uinteger(I))return{start:s.create(g,d),end:s.create(E,I)};if(s.is(g)&&s.is(d))return{start:g,end:d};throw new Error("Range#create called with invalid arguments[".concat(g,", ").concat(d,", ").concat(E,", ").concat(I,"]"))}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&s.is(d.start)&&s.is(d.end)}p.is=b})(a=e.Range||(e.Range={}));var c;(function(p){function R(g,d){return{uri:g,range:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(k.string(d.uri)||k.undefined(d.uri))}p.is=b})(c=e.Location||(e.Location={}));var l;(function(p){function R(g,d,E,I){return{targetUri:g,targetRange:d,targetSelectionRange:E,originSelectionRange:I}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.targetRange)&&k.string(d.targetUri)&&a.is(d.targetSelectionRange)&&(a.is(d.originSelectionRange)||k.undefined(d.originSelectionRange))}p.is=b})(l=e.LocationLink||(e.LocationLink={}));var u;(function(p){function R(g,d,E,I){return{red:g,green:d,blue:E,alpha:I}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.numberRange(d.red,0,1)&&k.numberRange(d.green,0,1)&&k.numberRange(d.blue,0,1)&&k.numberRange(d.alpha,0,1)}p.is=b})(u=e.Color||(e.Color={}));var f;(function(p){function R(g,d){return{range:g,color:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&u.is(d.color)}p.is=b})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(p){function R(g,d,E){return{label:g,textEdit:d,additionalTextEdits:E}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.undefined(d.textEdit)||D.is(d))&&(k.undefined(d.additionalTextEdits)||k.typedArray(d.additionalTextEdits,D.is))}p.is=b})(m=e.ColorPresentation||(e.ColorPresentation={}));var T;(function(p){p.Comment="comment",p.Imports="imports",p.Region="region"})(T=e.FoldingRangeKind||(e.FoldingRangeKind={}));var A;(function(p){function R(g,d,E,I,re,dt){var Ue={startLine:g,endLine:d};return k.defined(E)&&(Ue.startCharacter=E),k.defined(I)&&(Ue.endCharacter=I),k.defined(re)&&(Ue.kind=re),k.defined(dt)&&(Ue.collapsedText=dt),Ue}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.startLine)&&k.uinteger(d.startLine)&&(k.undefined(d.startCharacter)||k.uinteger(d.startCharacter))&&(k.undefined(d.endCharacter)||k.uinteger(d.endCharacter))&&(k.undefined(d.kind)||k.string(d.kind))}p.is=b})(A=e.FoldingRange||(e.FoldingRange={}));var w;(function(p){function R(g,d){return{location:g,message:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&c.is(d.location)&&k.string(d.message)}p.is=b})(w=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var N;(function(p){p.Error=1,p.Warning=2,p.Information=3,p.Hint=4})(N=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var C;(function(p){p.Unnecessary=1,p.Deprecated=2})(C=e.DiagnosticTag||(e.DiagnosticTag={}));var v;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&k.string(g.href)}p.is=R})(v=e.CodeDescription||(e.CodeDescription={}));var y;(function(p){function R(g,d,E,I,re,dt){var Ue={range:g,message:d};return k.defined(E)&&(Ue.severity=E),k.defined(I)&&(Ue.code=I),k.defined(re)&&(Ue.source=re),k.defined(dt)&&(Ue.relatedInformation=dt),Ue}p.create=R;function b(g){var d,E=g;return k.defined(E)&&a.is(E.range)&&k.string(E.message)&&(k.number(E.severity)||k.undefined(E.severity))&&(k.integer(E.code)||k.string(E.code)||k.undefined(E.code))&&(k.undefined(E.codeDescription)||k.string((d=E.codeDescription)===null||d===void 0?void 0:d.href))&&(k.string(E.source)||k.undefined(E.source))&&(k.undefined(E.relatedInformation)||k.typedArray(E.relatedInformation,w.is))}p.is=b})(y=e.Diagnostic||(e.Diagnostic={}));var $;(function(p){function R(g,d){for(var E=[],I=2;I<arguments.length;I++)E[I-2]=arguments[I];var re={title:g,command:d};return k.defined(E)&&E.length>0&&(re.arguments=E),re}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.title)&&k.string(d.command)}p.is=b})($=e.Command||(e.Command={}));var D;(function(p){function R(E,I){return{range:E,newText:I}}p.replace=R;function b(E,I){return{range:{start:E,end:E},newText:I}}p.insert=b;function g(E){return{range:E,newText:""}}p.del=g;function d(E){var I=E;return k.objectLiteral(I)&&k.string(I.newText)&&a.is(I.range)}p.is=d})(D=e.TextEdit||(e.TextEdit={}));var X;(function(p){function R(g,d,E){var I={label:g};return d!==void 0&&(I.needsConfirmation=d),E!==void 0&&(I.description=E),I}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.boolean(d.needsConfirmation)||d.needsConfirmation===void 0)&&(k.string(d.description)||d.description===void 0)}p.is=b})(X=e.ChangeAnnotation||(e.ChangeAnnotation={}));var ye;(function(p){function R(b){var g=b;return k.string(g)}p.is=R})(ye=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ee;(function(p){function R(E,I,re){return{range:E,newText:I,annotationId:re}}p.replace=R;function b(E,I,re){return{range:{start:E,end:E},newText:I,annotationId:re}}p.insert=b;function g(E,I){return{range:E,newText:"",annotationId:I}}p.del=g;function d(E){var I=E;return D.is(I)&&(X.is(I.annotationId)||ye.is(I.annotationId))}p.is=d})(Ee=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Ht;(function(p){function R(g,d){return{textDocument:g,edits:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&ut.is(d.textDocument)&&Array.isArray(d.edits)}p.is=b})(Ht=e.TextDocumentEdit||(e.TextDocumentEdit={}));var xt;(function(p){function R(g,d,E){var I={kind:"create",uri:g};return d!==void 0&&(d.overwrite!==void 0||d.ignoreIfExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=R;function b(g){var d=g;return d&&d.kind==="create"&&k.string(d.uri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=b})(xt=e.CreateFile||(e.CreateFile={}));var M;(function(p){function R(g,d,E,I){var re={kind:"rename",oldUri:g,newUri:d};return E!==void 0&&(E.overwrite!==void 0||E.ignoreIfExists!==void 0)&&(re.options=E),I!==void 0&&(re.annotationId=I),re}p.create=R;function b(g){var d=g;return d&&d.kind==="rename"&&k.string(d.oldUri)&&k.string(d.newUri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=b})(M=e.RenameFile||(e.RenameFile={}));var S;(function(p){function R(g,d,E){var I={kind:"delete",uri:g};return d!==void 0&&(d.recursive!==void 0||d.ignoreIfNotExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=R;function b(g){var d=g;return d&&d.kind==="delete"&&k.string(d.uri)&&(d.options===void 0||(d.options.recursive===void 0||k.boolean(d.options.recursive))&&(d.options.ignoreIfNotExists===void 0||k.boolean(d.options.ignoreIfNotExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=b})(S=e.DeleteFile||(e.DeleteFile={}));var U;(function(p){function R(b){var g=b;return g&&(g.changes!==void 0||g.documentChanges!==void 0)&&(g.documentChanges===void 0||g.documentChanges.every(function(d){return k.string(d.kind)?xt.is(d)||M.is(d)||S.is(d):Ht.is(d)}))}p.is=R})(U=e.WorkspaceEdit||(e.WorkspaceEdit={}));var j=function(){function p(R,b){this.edits=R,this.changeAnnotations=b}return p.prototype.insert=function(R,b,g){var d,E;if(g===void 0?d=D.insert(R,b):ye.is(g)?(E=g,d=Ee.insert(R,b,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.insert(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.replace=function(R,b,g){var d,E;if(g===void 0?d=D.replace(R,b):ye.is(g)?(E=g,d=Ee.replace(R,b,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.replace(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.delete=function(R,b){var g,d;if(b===void 0?g=D.del(R):ye.is(b)?(d=b,g=Ee.del(R,b)):(this.assertChangeAnnotations(this.changeAnnotations),d=this.changeAnnotations.manage(b),g=Ee.del(R,d)),this.edits.push(g),d!==void 0)return d},p.prototype.add=function(R){this.edits.push(R)},p.prototype.all=function(){return this.edits},p.prototype.clear=function(){this.edits.splice(0,this.edits.length)},p.prototype.assertChangeAnnotations=function(R){if(R===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},p}(),ce=function(){function p(R){this._annotations=R===void 0?Object.create(null):R,this._counter=0,this._size=0}return p.prototype.all=function(){return this._annotations},Object.defineProperty(p.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),p.prototype.manage=function(R,b){var g;if(ye.is(R)?g=R:(g=this.nextId(),b=R),this._annotations[g]!==void 0)throw new Error("Id ".concat(g," is already in use."));if(b===void 0)throw new Error("No annotation provided for id ".concat(g));return this._annotations[g]=b,this._size++,g},p.prototype.nextId=function(){return this._counter++,this._counter.toString()},p}(),ee=function(){function p(R){var b=this;this._textEditChanges=Object.create(null),R!==void 0?(this._workspaceEdit=R,R.documentChanges?(this._changeAnnotations=new ce(R.changeAnnotations),R.changeAnnotations=this._changeAnnotations.all(),R.documentChanges.forEach(function(g){if(Ht.is(g)){var d=new j(g.edits,b._changeAnnotations);b._textEditChanges[g.textDocument.uri]=d}})):R.changes&&Object.keys(R.changes).forEach(function(g){var d=new j(R.changes[g]);b._textEditChanges[g]=d})):this._workspaceEdit={}}return Object.defineProperty(p.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),p.prototype.getTextEditChange=function(R){if(ut.is(R)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var b={uri:R.uri,version:R.version},g=this._textEditChanges[b.uri];if(!g){var d=[],E={textDocument:b,edits:d};this._workspaceEdit.documentChanges.push(E),g=new j(d,this._changeAnnotations),this._textEditChanges[b.uri]=g}return g}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var g=this._textEditChanges[R];if(!g){var d=[];this._workspaceEdit.changes[R]=d,g=new j(d),this._textEditChanges[R]=g}return g}},p.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new ce,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},p.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},p.prototype.createFile=function(R,b,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ye.is(b)?d=b:g=b;var E,I;if(d===void 0?E=xt.create(R,g):(I=ye.is(d)?d:this._changeAnnotations.manage(d),E=xt.create(R,g,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p.prototype.renameFile=function(R,b,g,d){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var E;X.is(g)||ye.is(g)?E=g:d=g;var I,re;if(E===void 0?I=M.create(R,b,d):(re=ye.is(E)?E:this._changeAnnotations.manage(E),I=M.create(R,b,d,re)),this._workspaceEdit.documentChanges.push(I),re!==void 0)return re},p.prototype.deleteFile=function(R,b,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ye.is(b)?d=b:g=b;var E,I;if(d===void 0?E=S.create(R,g):(I=ye.is(d)?d:this._changeAnnotations.manage(d),E=S.create(R,g,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p}();e.WorkspaceChange=ee;var Q;(function(p){function R(g){return{uri:g}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)}p.is=b})(Q=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var Rt;(function(p){function R(g,d){return{uri:g,version:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.integer(d.version)}p.is=b})(Rt=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ut;(function(p){function R(g,d){return{uri:g,version:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&(d.version===null||k.integer(d.version))}p.is=b})(ut=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var me;(function(p){function R(g,d,E,I){return{uri:g,languageId:d,version:E,text:I}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.string(d.languageId)&&k.integer(d.version)&&k.string(d.text)}p.is=b})(me=e.TextDocumentItem||(e.TextDocumentItem={}));var $r;(function(p){p.PlainText="plaintext",p.Markdown="markdown";function R(b){var g=b;return g===p.PlainText||g===p.Markdown}p.is=R})($r=e.MarkupKind||(e.MarkupKind={}));var Hn;(function(p){function R(b){var g=b;return k.objectLiteral(b)&&$r.is(g.kind)&&k.string(g.value)}p.is=R})(Hn=e.MarkupContent||(e.MarkupContent={}));var Ra;(function(p){p.Text=1,p.Method=2,p.Function=3,p.Constructor=4,p.Field=5,p.Variable=6,p.Class=7,p.Interface=8,p.Module=9,p.Property=10,p.Unit=11,p.Value=12,p.Enum=13,p.Keyword=14,p.Snippet=15,p.Color=16,p.File=17,p.Reference=18,p.Folder=19,p.EnumMember=20,p.Constant=21,p.Struct=22,p.Event=23,p.Operator=24,p.TypeParameter=25})(Ra=e.CompletionItemKind||(e.CompletionItemKind={}));var Qi;(function(p){p.PlainText=1,p.Snippet=2})(Qi=e.InsertTextFormat||(e.InsertTextFormat={}));var ur;(function(p){p.Deprecated=1})(ur=e.CompletionItemTag||(e.CompletionItemTag={}));var Lo;(function(p){function R(g,d,E){return{newText:g,insert:d,replace:E}}p.create=R;function b(g){var d=g;return d&&k.string(d.newText)&&a.is(d.insert)&&a.is(d.replace)}p.is=b})(Lo=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var bt;(function(p){p.asIs=1,p.adjustIndentation=2})(bt=e.InsertTextMode||(e.InsertTextMode={}));var er;(function(p){function R(b){var g=b;return g&&(k.string(g.detail)||g.detail===void 0)&&(k.string(g.description)||g.description===void 0)}p.is=R})(er=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var Rn;(function(p){function R(b){return{label:b}}p.create=R})(Rn=e.CompletionItem||(e.CompletionItem={}));var Bt;(function(p){function R(b,g){return{items:b||[],isIncomplete:!!g}}p.create=R})(Bt=e.CompletionList||(e.CompletionList={}));var ft;(function(p){function R(g){return g.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}p.fromPlainText=R;function b(g){var d=g;return k.string(d)||k.objectLiteral(d)&&k.string(d.language)&&k.string(d.value)}p.is=b})(ft=e.MarkedString||(e.MarkedString={}));var Gr;(function(p){function R(b){var g=b;return!!g&&k.objectLiteral(g)&&(Hn.is(g.contents)||ft.is(g.contents)||k.typedArray(g.contents,ft.is))&&(b.range===void 0||a.is(b.range))}p.is=R})(Gr=e.Hover||(e.Hover={}));var Nr;(function(p){function R(b,g){return g?{label:b,documentation:g}:{label:b}}p.create=R})(Nr=e.ParameterInformation||(e.ParameterInformation={}));var xr;(function(p){function R(b,g){for(var d=[],E=2;E<arguments.length;E++)d[E-2]=arguments[E];var I={label:b};return k.defined(g)&&(I.documentation=g),k.defined(d)?I.parameters=d:I.parameters=[],I}p.create=R})(xr=e.SignatureInformation||(e.SignatureInformation={}));var Zi;(function(p){p.Text=1,p.Read=2,p.Write=3})(Zi=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var xi;(function(p){function R(b,g){var d={range:b};return k.number(g)&&(d.kind=g),d}p.create=R})(xi=e.DocumentHighlight||(e.DocumentHighlight={}));var Xd;(function(p){p.File=1,p.Module=2,p.Namespace=3,p.Package=4,p.Class=5,p.Method=6,p.Property=7,p.Field=8,p.Constructor=9,p.Enum=10,p.Interface=11,p.Function=12,p.Variable=13,p.Constant=14,p.String=15,p.Number=16,p.Boolean=17,p.Array=18,p.Object=19,p.Key=20,p.Null=21,p.EnumMember=22,p.Struct=23,p.Event=24,p.Operator=25,p.TypeParameter=26})(Xd=e.SymbolKind||(e.SymbolKind={}));var Ri;(function(p){p.Deprecated=1})(Ri=e.SymbolTag||(e.SymbolTag={}));var eo;(function(p){function R(b,g,d,E,I){var re={name:b,kind:g,location:{uri:E,range:d}};return I&&(re.containerName=I),re}p.create=R})(eo=e.SymbolInformation||(e.SymbolInformation={}));var Yd;(function(p){function R(b,g,d,E){return E!==void 0?{name:b,kind:g,location:{uri:d,range:E}}:{name:b,kind:g,location:{uri:d}}}p.create=R})(Yd=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var Jd;(function(p){function R(g,d,E,I,re,dt){var Ue={name:g,detail:d,kind:E,range:I,selectionRange:re};return dt!==void 0&&(Ue.children=dt),Ue}p.create=R;function b(g){var d=g;return d&&k.string(d.name)&&k.number(d.kind)&&a.is(d.range)&&a.is(d.selectionRange)&&(d.detail===void 0||k.string(d.detail))&&(d.deprecated===void 0||k.boolean(d.deprecated))&&(d.children===void 0||Array.isArray(d.children))&&(d.tags===void 0||Array.isArray(d.tags))}p.is=b})(Jd=e.DocumentSymbol||(e.DocumentSymbol={}));var to;(function(p){p.Empty="",p.QuickFix="quickfix",p.Refactor="refactor",p.RefactorExtract="refactor.extract",p.RefactorInline="refactor.inline",p.RefactorRewrite="refactor.rewrite",p.Source="source",p.SourceOrganizeImports="source.organizeImports",p.SourceFixAll="source.fixAll"})(to=e.CodeActionKind||(e.CodeActionKind={}));var Mo;(function(p){p.Invoked=1,p.Automatic=2})(Mo=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var Yc;(function(p){function R(g,d,E){var I={diagnostics:g};return d!=null&&(I.only=d),E!=null&&(I.triggerKind=E),I}p.create=R;function b(g){var d=g;return k.defined(d)&&k.typedArray(d.diagnostics,y.is)&&(d.only===void 0||k.typedArray(d.only,k.string))&&(d.triggerKind===void 0||d.triggerKind===Mo.Invoked||d.triggerKind===Mo.Automatic)}p.is=b})(Yc=e.CodeActionContext||(e.CodeActionContext={}));var ba;(function(p){function R(g,d,E){var I={title:g},re=!0;return typeof d=="string"?(re=!1,I.kind=d):$.is(d)?I.command=d:I.edit=d,re&&E!==void 0&&(I.kind=E),I}p.create=R;function b(g){var d=g;return d&&k.string(d.title)&&(d.diagnostics===void 0||k.typedArray(d.diagnostics,y.is))&&(d.kind===void 0||k.string(d.kind))&&(d.edit!==void 0||d.command!==void 0)&&(d.command===void 0||$.is(d.command))&&(d.isPreferred===void 0||k.boolean(d.isPreferred))&&(d.edit===void 0||U.is(d.edit))}p.is=b})(ba=e.CodeAction||(e.CodeAction={}));var Jc;(function(p){function R(g,d){var E={range:g};return k.defined(d)&&(E.data=d),E}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.command)||$.is(d.command))}p.is=b})(Jc=e.CodeLens||(e.CodeLens={}));var bi;(function(p){function R(g,d){return{tabSize:g,insertSpaces:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.uinteger(d.tabSize)&&k.boolean(d.insertSpaces)}p.is=b})(bi=e.FormattingOptions||(e.FormattingOptions={}));var x;(function(p){function R(g,d,E){return{range:g,target:d,data:E}}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.target)||k.string(d.target))}p.is=b})(x=e.DocumentLink||(e.DocumentLink={}));var P;(function(p){function R(g,d){return{range:g,parent:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(d.parent===void 0||p.is(d.parent))}p.is=b})(P=e.SelectionRange||(e.SelectionRange={}));var F;(function(p){p.namespace="namespace",p.type="type",p.class="class",p.enum="enum",p.interface="interface",p.struct="struct",p.typeParameter="typeParameter",p.parameter="parameter",p.variable="variable",p.property="property",p.enumMember="enumMember",p.event="event",p.function="function",p.method="method",p.macro="macro",p.keyword="keyword",p.modifier="modifier",p.comment="comment",p.string="string",p.number="number",p.regexp="regexp",p.operator="operator",p.decorator="decorator"})(F=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var W;(function(p){p.declaration="declaration",p.definition="definition",p.readonly="readonly",p.static="static",p.deprecated="deprecated",p.abstract="abstract",p.async="async",p.modification="modification",p.documentation="documentation",p.defaultLibrary="defaultLibrary"})(W=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var De;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&(g.resultId===void 0||typeof g.resultId=="string")&&Array.isArray(g.data)&&(g.data.length===0||typeof g.data[0]=="number")}p.is=R})(De=e.SemanticTokens||(e.SemanticTokens={}));var Oe;(function(p){function R(g,d){return{range:g,text:d}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&k.string(d.text)}p.is=b})(Oe=e.InlineValueText||(e.InlineValueText={}));var Je;(function(p){function R(g,d,E){return{range:g,variableName:d,caseSensitiveLookup:E}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&k.boolean(d.caseSensitiveLookup)&&(k.string(d.variableName)||d.variableName===void 0)}p.is=b})(Je=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var At;(function(p){function R(g,d){return{range:g,expression:d}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&(k.string(d.expression)||d.expression===void 0)}p.is=b})(At=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ue;(function(p){function R(g,d){return{frameId:g,stoppedLocation:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(g.stoppedLocation)}p.is=b})(ue=e.InlineValueContext||(e.InlineValueContext={}));var qe;(function(p){p.Type=1,p.Parameter=2;function R(b){return b===1||b===2}p.is=R})(qe=e.InlayHintKind||(e.InlayHintKind={}));var Te;(function(p){function R(g){return{value:g}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&(d.tooltip===void 0||k.string(d.tooltip)||Hn.is(d.tooltip))&&(d.location===void 0||c.is(d.location))&&(d.command===void 0||$.is(d.command))}p.is=b})(Te=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var gt;(function(p){function R(g,d,E){var I={position:g,label:d};return E!==void 0&&(I.kind=E),I}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&s.is(d.position)&&(k.string(d.label)||k.typedArray(d.label,Te.is))&&(d.kind===void 0||qe.is(d.kind))&&d.textEdits===void 0||k.typedArray(d.textEdits,D.is)&&(d.tooltip===void 0||k.string(d.tooltip)||Hn.is(d.tooltip))&&(d.paddingLeft===void 0||k.boolean(d.paddingLeft))&&(d.paddingRight===void 0||k.boolean(d.paddingRight))}p.is=b})(gt=e.InlayHint||(e.InlayHint={}));var tr;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&n.is(g.uri)&&k.string(g.name)}p.is=R})(tr=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var Bn;(function(p){function R(E,I,re,dt){return new bn(E,I,re,dt)}p.create=R;function b(E){var I=E;return!!(k.defined(I)&&k.string(I.uri)&&(k.undefined(I.languageId)||k.string(I.languageId))&&k.uinteger(I.lineCount)&&k.func(I.getText)&&k.func(I.positionAt)&&k.func(I.offsetAt))}p.is=b;function g(E,I){for(var re=E.getText(),dt=d(I,function(Fo,Qc){var Fg=Fo.range.start.line-Qc.range.start.line;return Fg===0?Fo.range.start.character-Qc.range.start.character:Fg}),Ue=re.length,en=dt.length-1;en>=0;en--){var tn=dt[en],Kn=E.offsetAt(tn.range.start),fe=E.offsetAt(tn.range.end);if(fe<=Ue)re=re.substring(0,Kn)+tn.newText+re.substring(fe,re.length);else throw new Error("Overlapping edit");Ue=Kn}return re}p.applyEdits=g;function d(E,I){if(E.length<=1)return E;var re=E.length/2|0,dt=E.slice(0,re),Ue=E.slice(re);d(dt,I),d(Ue,I);for(var en=0,tn=0,Kn=0;en<dt.length&&tn<Ue.length;){var fe=I(dt[en],Ue[tn]);fe<=0?E[Kn++]=dt[en++]:E[Kn++]=Ue[tn++]}for(;en<dt.length;)E[Kn++]=dt[en++];for(;tn<Ue.length;)E[Kn++]=Ue[tn++];return E}})(Bn=e.TextDocument||(e.TextDocument={}));var bn=function(){function p(R,b,g,d){this._uri=R,this._languageId=b,this._version=g,this._content=d,this._lineOffsets=void 0}return Object.defineProperty(p.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),p.prototype.getText=function(R){if(R){var b=this.offsetAt(R.start),g=this.offsetAt(R.end);return this._content.substring(b,g)}return this._content},p.prototype.update=function(R,b){this._content=R.text,this._version=b,this._lineOffsets=void 0},p.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var R=[],b=this._content,g=!0,d=0;d<b.length;d++){g&&(R.push(d),g=!1);var E=b.charAt(d);g=E==="\r"||E===`
`,E==="\r"&&d+1<b.length&&b.charAt(d+1)===`
`&&d++}g&&b.length>0&&R.push(b.length),this._lineOffsets=R}return this._lineOffsets},p.prototype.positionAt=function(R){R=Math.max(Math.min(R,this._content.length),0);var b=this.getLineOffsets(),g=0,d=b.length;if(d===0)return s.create(0,R);for(;g<d;){var E=Math.floor((g+d)/2);b[E]>R?d=E:g=E+1}var I=g-1;return s.create(I,R-b[I])},p.prototype.offsetAt=function(R){var b=this.getLineOffsets();if(R.line>=b.length)return this._content.length;if(R.line<0)return 0;var g=b[R.line],d=R.line+1<b.length?b[R.line+1]:this._content.length;return Math.max(Math.min(g+R.character,d),g)},Object.defineProperty(p.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),p}(),k;(function(p){var R=Object.prototype.toString;function b(fe){return typeof fe<"u"}p.defined=b;function g(fe){return typeof fe>"u"}p.undefined=g;function d(fe){return fe===!0||fe===!1}p.boolean=d;function E(fe){return R.call(fe)==="[object String]"}p.string=E;function I(fe){return R.call(fe)==="[object Number]"}p.number=I;function re(fe,Fo,Qc){return R.call(fe)==="[object Number]"&&Fo<=fe&&fe<=Qc}p.numberRange=re;function dt(fe){return R.call(fe)==="[object Number]"&&-2147483648<=fe&&fe<=2147483647}p.integer=dt;function Ue(fe){return R.call(fe)==="[object Number]"&&0<=fe&&fe<=2147483647}p.uinteger=Ue;function en(fe){return R.call(fe)==="[object Function]"}p.func=en;function tn(fe){return fe!==null&&typeof fe=="object"}p.objectLiteral=tn;function Kn(fe,Fo){return Array.isArray(fe)&&fe.every(Fo)}p.typedArray=Kn})(k||(k={}))})});var it=H(dr=>{"use strict";Object.defineProperty(dr,"__esModule",{value:!0});dr.ProtocolNotificationType=dr.ProtocolNotificationType0=dr.ProtocolRequestType=dr.ProtocolRequestType0=dr.RegistrationType=dr.MessageDirection=void 0;var Bo=Yn(),gk;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(gk=dr.MessageDirection||(dr.MessageDirection={}));var sm=class{constructor(e){this.method=e}};dr.RegistrationType=sm;var am=class extends Bo.RequestType0{constructor(e){super(e)}};dr.ProtocolRequestType0=am;var cm=class extends Bo.RequestType{constructor(e){super(e,Bo.ParameterStructures.byName)}};dr.ProtocolRequestType=cm;var lm=class extends Bo.NotificationType0{constructor(e){super(e)}};dr.ProtocolNotificationType0=lm;var um=class extends Bo.NotificationType{constructor(e){super(e,Bo.ParameterStructures.byName)}};dr.ProtocolNotificationType=um});var ll=H(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.objectLiteral=St.typedArray=St.stringArray=St.array=St.func=St.error=St.number=St.string=St.boolean=void 0;function yk(t){return t===!0||t===!1}St.boolean=yk;function uy(t){return typeof t=="string"||t instanceof String}St.string=uy;function Tk(t){return typeof t=="number"||t instanceof Number}St.number=Tk;function vk(t){return t instanceof Error}St.error=vk;function xk(t){return typeof t=="function"}St.func=xk;function fy(t){return Array.isArray(t)}St.array=fy;function Rk(t){return fy(t)&&t.every(e=>uy(e))}St.stringArray=Rk;function bk(t,e){return Array.isArray(t)&&t.every(e)}St.typedArray=bk;function Ak(t){return t!==null&&typeof t=="object"}St.objectLiteral=Ak});var py=H(Ea=>{"use strict";Object.defineProperty(Ea,"__esModule",{value:!0});Ea.ImplementationRequest=void 0;var dy=it(),Sk;(function(t){t.method="textDocument/implementation",t.messageDirection=dy.MessageDirection.clientToServer,t.type=new dy.ProtocolRequestType(t.method)})(Sk=Ea.ImplementationRequest||(Ea.ImplementationRequest={}))});var hy=H($a=>{"use strict";Object.defineProperty($a,"__esModule",{value:!0});$a.TypeDefinitionRequest=void 0;var my=it(),wk;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=my.MessageDirection.clientToServer,t.type=new my.ProtocolRequestType(t.method)})(wk=$a.TypeDefinitionRequest||($a.TypeDefinitionRequest={}))});var gy=H(Ai=>{"use strict";Object.defineProperty(Ai,"__esModule",{value:!0});Ai.DidChangeWorkspaceFoldersNotification=Ai.WorkspaceFoldersRequest=void 0;var ul=it(),Ck;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=ul.MessageDirection.serverToClient,t.type=new ul.ProtocolRequestType0(t.method)})(Ck=Ai.WorkspaceFoldersRequest||(Ai.WorkspaceFoldersRequest={}));var kk;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=ul.MessageDirection.clientToServer,t.type=new ul.ProtocolNotificationType(t.method)})(kk=Ai.DidChangeWorkspaceFoldersNotification||(Ai.DidChangeWorkspaceFoldersNotification={}))});var Ty=H(Na=>{"use strict";Object.defineProperty(Na,"__esModule",{value:!0});Na.ConfigurationRequest=void 0;var yy=it(),Ek;(function(t){t.method="workspace/configuration",t.messageDirection=yy.MessageDirection.serverToClient,t.type=new yy.ProtocolRequestType(t.method)})(Ek=Na.ConfigurationRequest||(Na.ConfigurationRequest={}))});var vy=H(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.ColorPresentationRequest=Si.DocumentColorRequest=void 0;var fl=it(),$k;(function(t){t.method="textDocument/documentColor",t.messageDirection=fl.MessageDirection.clientToServer,t.type=new fl.ProtocolRequestType(t.method)})($k=Si.DocumentColorRequest||(Si.DocumentColorRequest={}));var Nk;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=fl.MessageDirection.clientToServer,t.type=new fl.ProtocolRequestType(t.method)})(Nk=Si.ColorPresentationRequest||(Si.ColorPresentationRequest={}))});var Ry=H(_a=>{"use strict";Object.defineProperty(_a,"__esModule",{value:!0});_a.FoldingRangeRequest=void 0;var xy=it(),_k;(function(t){t.method="textDocument/foldingRange",t.messageDirection=xy.MessageDirection.clientToServer,t.type=new xy.ProtocolRequestType(t.method)})(_k=_a.FoldingRangeRequest||(_a.FoldingRangeRequest={}))});var Ay=H(Ia=>{"use strict";Object.defineProperty(Ia,"__esModule",{value:!0});Ia.DeclarationRequest=void 0;var by=it(),Ik;(function(t){t.method="textDocument/declaration",t.messageDirection=by.MessageDirection.clientToServer,t.type=new by.ProtocolRequestType(t.method)})(Ik=Ia.DeclarationRequest||(Ia.DeclarationRequest={}))});var wy=H(Pa=>{"use strict";Object.defineProperty(Pa,"__esModule",{value:!0});Pa.SelectionRangeRequest=void 0;var Sy=it(),Pk;(function(t){t.method="textDocument/selectionRange",t.messageDirection=Sy.MessageDirection.clientToServer,t.type=new Sy.ProtocolRequestType(t.method)})(Pk=Pa.SelectionRangeRequest||(Pa.SelectionRangeRequest={}))});var Cy=H(on=>{"use strict";Object.defineProperty(on,"__esModule",{value:!0});on.WorkDoneProgressCancelNotification=on.WorkDoneProgressCreateRequest=on.WorkDoneProgress=void 0;var Dk=Yn(),dl=it(),Ok;(function(t){t.type=new Dk.ProgressType;function e(r){return r===t.type}t.is=e})(Ok=on.WorkDoneProgress||(on.WorkDoneProgress={}));var Lk;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=dl.MessageDirection.serverToClient,t.type=new dl.ProtocolRequestType(t.method)})(Lk=on.WorkDoneProgressCreateRequest||(on.WorkDoneProgressCreateRequest={}));var Mk;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=dl.MessageDirection.clientToServer,t.type=new dl.ProtocolNotificationType(t.method)})(Mk=on.WorkDoneProgressCancelNotification||(on.WorkDoneProgressCancelNotification={}))});var ky=H(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.CallHierarchyOutgoingCallsRequest=sn.CallHierarchyIncomingCallsRequest=sn.CallHierarchyPrepareRequest=void 0;var Ko=it(),Fk;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Ko.MessageDirection.clientToServer,t.type=new Ko.ProtocolRequestType(t.method)})(Fk=sn.CallHierarchyPrepareRequest||(sn.CallHierarchyPrepareRequest={}));var qk;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Ko.MessageDirection.clientToServer,t.type=new Ko.ProtocolRequestType(t.method)})(qk=sn.CallHierarchyIncomingCallsRequest||(sn.CallHierarchyIncomingCallsRequest={}));var Uk;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Ko.MessageDirection.clientToServer,t.type=new Ko.ProtocolRequestType(t.method)})(Uk=sn.CallHierarchyOutgoingCallsRequest||(sn.CallHierarchyOutgoingCallsRequest={}))});var Ey=H(wt=>{"use strict";Object.defineProperty(wt,"__esModule",{value:!0});wt.SemanticTokensRefreshRequest=wt.SemanticTokensRangeRequest=wt.SemanticTokensDeltaRequest=wt.SemanticTokensRequest=wt.SemanticTokensRegistrationType=wt.TokenFormat=void 0;var Jn=it(),Gk;(function(t){t.Relative="relative"})(Gk=wt.TokenFormat||(wt.TokenFormat={}));var pl;(function(t){t.method="textDocument/semanticTokens",t.type=new Jn.RegistrationType(t.method)})(pl=wt.SemanticTokensRegistrationType||(wt.SemanticTokensRegistrationType={}));var jk;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Jn.MessageDirection.clientToServer,t.type=new Jn.ProtocolRequestType(t.method),t.registrationMethod=pl.method})(jk=wt.SemanticTokensRequest||(wt.SemanticTokensRequest={}));var Hk;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Jn.MessageDirection.clientToServer,t.type=new Jn.ProtocolRequestType(t.method),t.registrationMethod=pl.method})(Hk=wt.SemanticTokensDeltaRequest||(wt.SemanticTokensDeltaRequest={}));var Bk;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Jn.MessageDirection.clientToServer,t.type=new Jn.ProtocolRequestType(t.method),t.registrationMethod=pl.method})(Bk=wt.SemanticTokensRangeRequest||(wt.SemanticTokensRangeRequest={}));var Kk;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Jn.MessageDirection.clientToServer,t.type=new Jn.ProtocolRequestType0(t.method)})(Kk=wt.SemanticTokensRefreshRequest||(wt.SemanticTokensRefreshRequest={}))});var Ny=H(Da=>{"use strict";Object.defineProperty(Da,"__esModule",{value:!0});Da.ShowDocumentRequest=void 0;var $y=it(),Wk;(function(t){t.method="window/showDocument",t.messageDirection=$y.MessageDirection.serverToClient,t.type=new $y.ProtocolRequestType(t.method)})(Wk=Da.ShowDocumentRequest||(Da.ShowDocumentRequest={}))});var Iy=H(Oa=>{"use strict";Object.defineProperty(Oa,"__esModule",{value:!0});Oa.LinkedEditingRangeRequest=void 0;var _y=it(),Vk;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=_y.MessageDirection.clientToServer,t.type=new _y.ProtocolRequestType(t.method)})(Vk=Oa.LinkedEditingRangeRequest||(Oa.LinkedEditingRangeRequest={}))});var Py=H(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.WillDeleteFilesRequest=ot.DidDeleteFilesNotification=ot.DidRenameFilesNotification=ot.WillRenameFilesRequest=ot.DidCreateFilesNotification=ot.WillCreateFilesRequest=ot.FileOperationPatternKind=void 0;var jr=it(),zk;(function(t){t.file="file",t.folder="folder"})(zk=ot.FileOperationPatternKind||(ot.FileOperationPatternKind={}));var Xk;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(Xk=ot.WillCreateFilesRequest||(ot.WillCreateFilesRequest={}));var Yk;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(Yk=ot.DidCreateFilesNotification||(ot.DidCreateFilesNotification={}));var Jk;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(Jk=ot.WillRenameFilesRequest||(ot.WillRenameFilesRequest={}));var Qk;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(Qk=ot.DidRenameFilesNotification||(ot.DidRenameFilesNotification={}));var Zk;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(Zk=ot.DidDeleteFilesNotification||(ot.DidDeleteFilesNotification={}));var eE;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(eE=ot.WillDeleteFilesRequest||(ot.WillDeleteFilesRequest={}))});var Oy=H(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.MonikerRequest=an.MonikerKind=an.UniquenessLevel=void 0;var Dy=it(),tE;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(tE=an.UniquenessLevel||(an.UniquenessLevel={}));var rE;(function(t){t.$import="import",t.$export="export",t.local="local"})(rE=an.MonikerKind||(an.MonikerKind={}));var nE;(function(t){t.method="textDocument/moniker",t.messageDirection=Dy.MessageDirection.clientToServer,t.type=new Dy.ProtocolRequestType(t.method)})(nE=an.MonikerRequest||(an.MonikerRequest={}))});var Ly=H(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.TypeHierarchySubtypesRequest=cn.TypeHierarchySupertypesRequest=cn.TypeHierarchyPrepareRequest=void 0;var Wo=it(),iE;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method)})(iE=cn.TypeHierarchyPrepareRequest||(cn.TypeHierarchyPrepareRequest={}));var oE;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method)})(oE=cn.TypeHierarchySupertypesRequest||(cn.TypeHierarchySupertypesRequest={}));var sE;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method)})(sE=cn.TypeHierarchySubtypesRequest||(cn.TypeHierarchySubtypesRequest={}))});var My=H(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.InlineValueRefreshRequest=wi.InlineValueRequest=void 0;var ml=it(),aE;(function(t){t.method="textDocument/inlineValue",t.messageDirection=ml.MessageDirection.clientToServer,t.type=new ml.ProtocolRequestType(t.method)})(aE=wi.InlineValueRequest||(wi.InlineValueRequest={}));var cE;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=ml.MessageDirection.clientToServer,t.type=new ml.ProtocolRequestType0(t.method)})(cE=wi.InlineValueRefreshRequest||(wi.InlineValueRefreshRequest={}))});var Fy=H(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.InlayHintRefreshRequest=ln.InlayHintResolveRequest=ln.InlayHintRequest=void 0;var Vo=it(),lE;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType(t.method)})(lE=ln.InlayHintRequest||(ln.InlayHintRequest={}));var uE;(function(t){t.method="inlayHint/resolve",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType(t.method)})(uE=ln.InlayHintResolveRequest||(ln.InlayHintResolveRequest={}));var fE;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType0(t.method)})(fE=ln.InlayHintRefreshRequest||(ln.InlayHintRefreshRequest={}))});var Uy=H(Kt=>{"use strict";Object.defineProperty(Kt,"__esModule",{value:!0});Kt.DiagnosticRefreshRequest=Kt.WorkspaceDiagnosticRequest=Kt.DocumentDiagnosticRequest=Kt.DocumentDiagnosticReportKind=Kt.DiagnosticServerCancellationData=void 0;var qy=Yn(),dE=ll(),zo=it(),pE;(function(t){function e(r){let n=r;return n&&dE.boolean(n.retriggerRequest)}t.is=e})(pE=Kt.DiagnosticServerCancellationData||(Kt.DiagnosticServerCancellationData={}));var mE;(function(t){t.Full="full",t.Unchanged="unchanged"})(mE=Kt.DocumentDiagnosticReportKind||(Kt.DocumentDiagnosticReportKind={}));var hE;(function(t){t.method="textDocument/diagnostic",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType(t.method),t.partialResult=new qy.ProgressType})(hE=Kt.DocumentDiagnosticRequest||(Kt.DocumentDiagnosticRequest={}));var gE;(function(t){t.method="workspace/diagnostic",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType(t.method),t.partialResult=new qy.ProgressType})(gE=Kt.WorkspaceDiagnosticRequest||(Kt.WorkspaceDiagnosticRequest={}));var yE;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType0(t.method)})(yE=Kt.DiagnosticRefreshRequest||(Kt.DiagnosticRefreshRequest={}))});var Hy=H(xe=>{"use strict";Object.defineProperty(xe,"__esModule",{value:!0});xe.DidCloseNotebookDocumentNotification=xe.DidSaveNotebookDocumentNotification=xe.DidChangeNotebookDocumentNotification=xe.NotebookCellArrayChange=xe.DidOpenNotebookDocumentNotification=xe.NotebookDocumentSyncRegistrationType=xe.NotebookDocument=xe.NotebookCell=xe.ExecutionSummary=xe.NotebookCellKind=void 0;var La=so(),un=ll(),An=it(),Gy;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(Gy=xe.NotebookCellKind||(xe.NotebookCellKind={}));var jy;(function(t){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}t.create=e;function r(i){let o=i;return un.objectLiteral(o)&&La.uinteger.is(o.executionOrder)&&(o.success===void 0||un.boolean(o.success))}t.is=r;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}t.equals=n})(jy=xe.ExecutionSummary||(xe.ExecutionSummary={}));var fm;(function(t){function e(o,s){return{kind:o,document:s}}t.create=e;function r(o){let s=o;return un.objectLiteral(s)&&Gy.is(s.kind)&&La.DocumentUri.is(s.document)&&(s.metadata===void 0||un.objectLiteral(s.metadata))}t.is=r;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!jy.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}t.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),c=Array.isArray(s);if(a!==c)return!1;if(a&&c){if(o.length!==s.length)return!1;for(let l=0;l<o.length;l++)if(!i(o[l],s[l]))return!1}if(un.objectLiteral(o)&&un.objectLiteral(s)){let l=Object.keys(o),u=Object.keys(s);if(l.length!==u.length||(l.sort(),u.sort(),!i(l,u)))return!1;for(let f=0;f<l.length;f++){let m=l[f];if(!i(o[m],s[m]))return!1}}return!0}})(fm=xe.NotebookCell||(xe.NotebookCell={}));var TE;(function(t){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}t.create=e;function r(n){let i=n;return un.objectLiteral(i)&&un.string(i.uri)&&La.integer.is(i.version)&&un.typedArray(i.cells,fm.is)}t.is=r})(TE=xe.NotebookDocument||(xe.NotebookDocument={}));var Ma;(function(t){t.method="notebookDocument/sync",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.RegistrationType(t.method)})(Ma=xe.NotebookDocumentSyncRegistrationType||(xe.NotebookDocumentSyncRegistrationType={}));var vE;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ma.method})(vE=xe.DidOpenNotebookDocumentNotification||(xe.DidOpenNotebookDocumentNotification={}));var xE;(function(t){function e(n){let i=n;return un.objectLiteral(i)&&La.uinteger.is(i.start)&&La.uinteger.is(i.deleteCount)&&(i.cells===void 0||un.typedArray(i.cells,fm.is))}t.is=e;function r(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}t.create=r})(xE=xe.NotebookCellArrayChange||(xe.NotebookCellArrayChange={}));var RE;(function(t){t.method="notebookDocument/didChange",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ma.method})(RE=xe.DidChangeNotebookDocumentNotification||(xe.DidChangeNotebookDocumentNotification={}));var bE;(function(t){t.method="notebookDocument/didSave",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ma.method})(bE=xe.DidSaveNotebookDocumentNotification||(xe.DidSaveNotebookDocumentNotification={}));var AE;(function(t){t.method="notebookDocument/didClose",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ma.method})(AE=xe.DidCloseNotebookDocumentNotification||(xe.DidCloseNotebookDocumentNotification={}))});var Qy=H(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=void 0;var O=it(),By=so(),Wt=ll(),SE=py();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return SE.ImplementationRequest}});var wE=hy();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return wE.TypeDefinitionRequest}});var Ky=gy();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return Ky.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return Ky.DidChangeWorkspaceFoldersNotification}});var CE=Ty();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return CE.ConfigurationRequest}});var Wy=vy();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return Wy.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return Wy.ColorPresentationRequest}});var kE=Ry();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return kE.FoldingRangeRequest}});var EE=Ay();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return EE.DeclarationRequest}});var $E=wy();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return $E.SelectionRangeRequest}});var dm=Cy();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return dm.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return dm.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return dm.WorkDoneProgressCancelNotification}});var pm=ky();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return pm.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return pm.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return pm.CallHierarchyPrepareRequest}});var Xo=Ey();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return Xo.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return Xo.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Xo.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Xo.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Xo.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Xo.SemanticTokensRegistrationType}});var NE=Ny();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return NE.ShowDocumentRequest}});var _E=Iy();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return _E.LinkedEditingRangeRequest}});var ao=Py();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return ao.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return ao.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return ao.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return ao.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return ao.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return ao.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return ao.WillDeleteFilesRequest}});var mm=Oy();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return mm.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return mm.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return mm.MonikerRequest}});var hm=Ly();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return hm.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return hm.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return hm.TypeHierarchySupertypesRequest}});var Vy=My();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return Vy.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return Vy.InlineValueRefreshRequest}});var gm=Fy();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return gm.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return gm.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return gm.InlayHintRefreshRequest}});var Fa=Uy();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Fa.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Fa.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Fa.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Fa.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Fa.DiagnosticRefreshRequest}});var Sn=Hy();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return Sn.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return Sn.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return Sn.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return Sn.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return Sn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return Sn.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidCloseNotebookDocumentNotification}});var zy;(function(t){function e(r){let n=r;return Wt.string(n.language)||Wt.string(n.scheme)||Wt.string(n.pattern)}t.is=e})(zy=h.TextDocumentFilter||(h.TextDocumentFilter={}));var Xy;(function(t){function e(r){let n=r;return Wt.objectLiteral(n)&&(Wt.string(n.notebookType)||Wt.string(n.scheme)||Wt.string(n.pattern))}t.is=e})(Xy=h.NotebookDocumentFilter||(h.NotebookDocumentFilter={}));var Yy;(function(t){function e(r){let n=r;return Wt.objectLiteral(n)&&(Wt.string(n.notebook)||Xy.is(n.notebook))&&(n.language===void 0||Wt.string(n.language))}t.is=e})(Yy=h.NotebookCellTextDocumentFilter||(h.NotebookCellTextDocumentFilter={}));var Jy;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Wt.string(n)&&!zy.is(n)&&!Yy.is(n))return!1;return!0}t.is=e})(Jy=h.DocumentSelector||(h.DocumentSelector={}));var IE;(function(t){t.method="client/registerCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(IE=h.RegistrationRequest||(h.RegistrationRequest={}));var PE;(function(t){t.method="client/unregisterCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(PE=h.UnregistrationRequest||(h.UnregistrationRequest={}));var DE;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(DE=h.ResourceOperationKind||(h.ResourceOperationKind={}));var OE;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(OE=h.FailureHandlingKind||(h.FailureHandlingKind={}));var LE;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(LE=h.PositionEncodingKind||(h.PositionEncodingKind={}));var ME;(function(t){function e(r){let n=r;return n&&Wt.string(n.id)&&n.id.length>0}t.hasId=e})(ME=h.StaticRegistrationOptions||(h.StaticRegistrationOptions={}));var FE;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||Jy.is(n.documentSelector))}t.is=e})(FE=h.TextDocumentRegistrationOptions||(h.TextDocumentRegistrationOptions={}));var qE;(function(t){function e(n){let i=n;return Wt.objectLiteral(i)&&(i.workDoneProgress===void 0||Wt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Wt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(qE=h.WorkDoneProgressOptions||(h.WorkDoneProgressOptions={}));var UE;(function(t){t.method="initialize",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(UE=h.InitializeRequest||(h.InitializeRequest={}));var GE;(function(t){t.unknownProtocolVersion=1})(GE=h.InitializeErrorCodes||(h.InitializeErrorCodes={}));var jE;(function(t){t.method="initialized",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(jE=h.InitializedNotification||(h.InitializedNotification={}));var HE;(function(t){t.method="shutdown",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType0(t.method)})(HE=h.ShutdownRequest||(h.ShutdownRequest={}));var BE;(function(t){t.method="exit",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType0(t.method)})(BE=h.ExitNotification||(h.ExitNotification={}));var KE;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(KE=h.DidChangeConfigurationNotification||(h.DidChangeConfigurationNotification={}));var WE;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(WE=h.MessageType||(h.MessageType={}));var VE;(function(t){t.method="window/showMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(VE=h.ShowMessageNotification||(h.ShowMessageNotification={}));var zE;(function(t){t.method="window/showMessageRequest",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(zE=h.ShowMessageRequest||(h.ShowMessageRequest={}));var XE;(function(t){t.method="window/logMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(XE=h.LogMessageNotification||(h.LogMessageNotification={}));var YE;(function(t){t.method="telemetry/event",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(YE=h.TelemetryEventNotification||(h.TelemetryEventNotification={}));var JE;(function(t){t.None=0,t.Full=1,t.Incremental=2})(JE=h.TextDocumentSyncKind||(h.TextDocumentSyncKind={}));var QE;(function(t){t.method="textDocument/didOpen",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(QE=h.DidOpenTextDocumentNotification||(h.DidOpenTextDocumentNotification={}));var ZE;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(ZE=h.TextDocumentContentChangeEvent||(h.TextDocumentContentChangeEvent={}));var e$;(function(t){t.method="textDocument/didChange",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(e$=h.DidChangeTextDocumentNotification||(h.DidChangeTextDocumentNotification={}));var t$;(function(t){t.method="textDocument/didClose",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(t$=h.DidCloseTextDocumentNotification||(h.DidCloseTextDocumentNotification={}));var r$;(function(t){t.method="textDocument/didSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(r$=h.DidSaveTextDocumentNotification||(h.DidSaveTextDocumentNotification={}));var n$;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(n$=h.TextDocumentSaveReason||(h.TextDocumentSaveReason={}));var i$;(function(t){t.method="textDocument/willSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(i$=h.WillSaveTextDocumentNotification||(h.WillSaveTextDocumentNotification={}));var o$;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(o$=h.WillSaveTextDocumentWaitUntilRequest||(h.WillSaveTextDocumentWaitUntilRequest={}));var s$;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(s$=h.DidChangeWatchedFilesNotification||(h.DidChangeWatchedFilesNotification={}));var a$;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(a$=h.FileChangeType||(h.FileChangeType={}));var c$;(function(t){function e(r){let n=r;return Wt.objectLiteral(n)&&(By.URI.is(n.baseUri)||By.WorkspaceFolder.is(n.baseUri))&&Wt.string(n.pattern)}t.is=e})(c$=h.RelativePattern||(h.RelativePattern={}));var l$;(function(t){t.Create=1,t.Change=2,t.Delete=4})(l$=h.WatchKind||(h.WatchKind={}));var u$;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(u$=h.PublishDiagnosticsNotification||(h.PublishDiagnosticsNotification={}));var f$;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(f$=h.CompletionTriggerKind||(h.CompletionTriggerKind={}));var d$;(function(t){t.method="textDocument/completion",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(d$=h.CompletionRequest||(h.CompletionRequest={}));var p$;(function(t){t.method="completionItem/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(p$=h.CompletionResolveRequest||(h.CompletionResolveRequest={}));var m$;(function(t){t.method="textDocument/hover",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(m$=h.HoverRequest||(h.HoverRequest={}));var h$;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(h$=h.SignatureHelpTriggerKind||(h.SignatureHelpTriggerKind={}));var g$;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(g$=h.SignatureHelpRequest||(h.SignatureHelpRequest={}));var y$;(function(t){t.method="textDocument/definition",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(y$=h.DefinitionRequest||(h.DefinitionRequest={}));var T$;(function(t){t.method="textDocument/references",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(T$=h.ReferencesRequest||(h.ReferencesRequest={}));var v$;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(v$=h.DocumentHighlightRequest||(h.DocumentHighlightRequest={}));var x$;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(x$=h.DocumentSymbolRequest||(h.DocumentSymbolRequest={}));var R$;(function(t){t.method="textDocument/codeAction",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(R$=h.CodeActionRequest||(h.CodeActionRequest={}));var b$;(function(t){t.method="codeAction/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(b$=h.CodeActionResolveRequest||(h.CodeActionResolveRequest={}));var A$;(function(t){t.method="workspace/symbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(A$=h.WorkspaceSymbolRequest||(h.WorkspaceSymbolRequest={}));var S$;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(S$=h.WorkspaceSymbolResolveRequest||(h.WorkspaceSymbolResolveRequest={}));var w$;(function(t){t.method="textDocument/codeLens",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(w$=h.CodeLensRequest||(h.CodeLensRequest={}));var C$;(function(t){t.method="codeLens/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(C$=h.CodeLensResolveRequest||(h.CodeLensResolveRequest={}));var k$;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType0(t.method)})(k$=h.CodeLensRefreshRequest||(h.CodeLensRefreshRequest={}));var E$;(function(t){t.method="textDocument/documentLink",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(E$=h.DocumentLinkRequest||(h.DocumentLinkRequest={}));var $$;(function(t){t.method="documentLink/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})($$=h.DocumentLinkResolveRequest||(h.DocumentLinkResolveRequest={}));var N$;(function(t){t.method="textDocument/formatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(N$=h.DocumentFormattingRequest||(h.DocumentFormattingRequest={}));var _$;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(_$=h.DocumentRangeFormattingRequest||(h.DocumentRangeFormattingRequest={}));var I$;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(I$=h.DocumentOnTypeFormattingRequest||(h.DocumentOnTypeFormattingRequest={}));var P$;(function(t){t.Identifier=1})(P$=h.PrepareSupportDefaultBehavior||(h.PrepareSupportDefaultBehavior={}));var D$;(function(t){t.method="textDocument/rename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(D$=h.RenameRequest||(h.RenameRequest={}));var O$;(function(t){t.method="textDocument/prepareRename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(O$=h.PrepareRenameRequest||(h.PrepareRenameRequest={}));var L$;(function(t){t.method="workspace/executeCommand",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(L$=h.ExecuteCommandRequest||(h.ExecuteCommandRequest={}));var M$;(function(t){t.method="workspace/applyEdit",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType("workspace/applyEdit")})(M$=h.ApplyWorkspaceEditRequest||(h.ApplyWorkspaceEditRequest={}))});var eT=H(hl=>{"use strict";Object.defineProperty(hl,"__esModule",{value:!0});hl.createProtocolConnection=void 0;var Zy=Yn();function F$(t,e,r,n){return Zy.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Zy.createMessageConnection)(t,e,r,n)}hl.createProtocolConnection=F$});var tT=H(pr=>{"use strict";var q$=pr&&pr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),gl=pr&&pr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&q$(e,t,r)};Object.defineProperty(pr,"__esModule",{value:!0});pr.LSPErrorCodes=pr.createProtocolConnection=void 0;gl(Yn(),pr);gl(so(),pr);gl(it(),pr);gl(Qy(),pr);var U$=eT();Object.defineProperty(pr,"createProtocolConnection",{enumerable:!0,get:function(){return U$.createProtocolConnection}});var G$;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(G$=pr.LSPErrorCodes||(pr.LSPErrorCodes={}))});var Ct=H(wn=>{"use strict";var j$=wn&&wn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),rT=wn&&wn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&j$(e,t,r)};Object.defineProperty(wn,"__esModule",{value:!0});wn.createProtocolConnection=void 0;var H$=om();rT(om(),wn);rT(tT(),wn);function B$(t,e,r,n){return(0,H$.createMessageConnection)(t,e,r,n)}wn.createProtocolConnection=B$});var Tm=H(Ci=>{"use strict";Object.defineProperty(Ci,"__esModule",{value:!0});Ci.SemanticTokensBuilder=Ci.SemanticTokensDiff=Ci.SemanticTokensFeature=void 0;var yl=Ct(),K$=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(yl.SemanticTokensRefreshRequest.type),on:e=>{let r=yl.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=yl.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=yl.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ci.SemanticTokensFeature=K$;var Tl=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,o=r-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Ci.SemanticTokensDiff=Tl;var ym=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,o){let s=e,a=r;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new Tl(this._prevData,this._data).computeDiff()}:this.build()}};Ci.SemanticTokensBuilder=ym});var xm=H(vl=>{"use strict";Object.defineProperty(vl,"__esModule",{value:!0});vl.TextDocuments=void 0;var co=Ct(),vm=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new co.Emitter,this._onDidOpen=new co.Emitter,this._onDidClose=new co.Emitter,this._onDidSave=new co.Emitter,this._onWillSave=new co.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=co.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),co.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};vl.TextDocuments=vm});var bm=H(Yo=>{"use strict";Object.defineProperty(Yo,"__esModule",{value:!0});Yo.NotebookDocuments=Yo.NotebookSyncFeature=void 0;var Hr=Ct(),nT=xm(),W$=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Hr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Hr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Hr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Hr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};Yo.NotebookSyncFeature=W$;var xl=class t{onDidOpenTextDocument(e){return this.openHandler=e,Hr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Hr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Hr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};xl.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var Rm=class{constructor(e){e instanceof nT.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new nT.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Hr.Emitter,this._onDidChange=new Hr.Emitter,this._onDidSave=new Hr.Emitter,this._onDidClose=new Hr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new xl,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)r.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,c=i.change;c.metadata!==void 0&&(a=!0,o.metadata=c.metadata);let l=[],u=[],f=[],m=[];if(c.cells!==void 0){let C=c.cells;if(C.structure!==void 0){let v=C.structure.array;if(o.cells.splice(v.start,v.deleteCount,...v.cells!==void 0?v.cells:[]),C.structure.didOpen!==void 0)for(let y of C.structure.didOpen)r.openTextDocument({textDocument:y}),l.push(y.uri);if(C.structure.didClose)for(let y of C.structure.didClose)r.closeTextDocument({textDocument:y}),u.push(y.uri)}if(C.data!==void 0){let v=new Map(C.data.map(y=>[y.document,y]));for(let y=0;y<=o.cells.length;y++){let $=v.get(o.cells[y].document);if($!==void 0){let D=o.cells.splice(y,1,$);if(f.push({old:D[0],new:$}),v.delete($.document),v.size===0)break}}}if(C.textContent!==void 0)for(let v of C.textContent)r.changeTextDocument({textDocument:v.document,contentChanges:v.changes}),m.push(v.document.uri)}this.updateCellMap(o);let T={notebookDocument:o};a&&(T.metadata={old:s,new:o.metadata});let A=[];for(let C of l)A.push(this.getNotebookCell(C));let w=[];for(let C of u)w.push(this.getNotebookCell(C));let N=[];for(let C of m)N.push(this.getNotebookCell(C));(A.length>0||w.length>0||f.length>0||N.length>0)&&(T.cells={added:A,removed:w,changed:{data:f,textContent:N}}),(T.metadata!==void 0||T.cells!==void 0)&&this._onDidChange.fire(T)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)r.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),Hr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};Yo.NotebookDocuments=Rm});var Am=H(kt=>{"use strict";Object.defineProperty(kt,"__esModule",{value:!0});kt.thenable=kt.typedArray=kt.stringArray=kt.array=kt.func=kt.error=kt.number=kt.string=kt.boolean=void 0;function V$(t){return t===!0||t===!1}kt.boolean=V$;function iT(t){return typeof t=="string"||t instanceof String}kt.string=iT;function z$(t){return typeof t=="number"||t instanceof Number}kt.number=z$;function X$(t){return t instanceof Error}kt.error=X$;function oT(t){return typeof t=="function"}kt.func=oT;function sT(t){return Array.isArray(t)}kt.array=sT;function Y$(t){return sT(t)&&t.every(e=>iT(e))}kt.stringArray=Y$;function J$(t,e){return Array.isArray(t)&&t.every(e)}kt.typedArray=J$;function Q$(t){return t&&oT(t.then)}kt.thenable=Q$});var Sm=H(Br=>{"use strict";Object.defineProperty(Br,"__esModule",{value:!0});Br.generateUuid=Br.parse=Br.isUUID=Br.v4=Br.empty=void 0;var qa=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},Ua=class t extends qa{constructor(){super([t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-","4",t._randomHex(),t._randomHex(),t._randomHex(),"-",t._oneOf(t._timeHighBits),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return t._oneOf(t._chars)}};Ua._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];Ua._timeHighBits=["8","9","a","b"];Br.empty=new qa("00000000-0000-0000-0000-000000000000");function aT(){return new Ua}Br.v4=aT;var Z$=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function cT(t){return Z$.test(t)}Br.isUUID=cT;function eN(t){if(!cT(t))throw new Error("invalid uuid");return new qa(t)}Br.parse=eN;function tN(){return aT().asHex()}Br.generateUuid=tN});var lT=H(Ei=>{"use strict";Object.defineProperty(Ei,"__esModule",{value:!0});Ei.attachPartialResult=Ei.ProgressFeature=Ei.attachWorkDone=void 0;var ki=Ct(),rN=Sm(),lo=class t{constructor(e,r){this._connection=e,this._token=r,t.Instances.set(this._token,this)}begin(e,r,n,i){let o={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(ki.WorkDoneProgress.type,this._token,o)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(ki.WorkDoneProgress.type,this._token,n)}done(){t.Instances.delete(this._token),this._connection.sendProgress(ki.WorkDoneProgress.type,this._token,{kind:"end"})}};lo.Instances=new Map;var Rl=class extends lo{constructor(e,r){super(e,r),this._source=new ki.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Ga=class{constructor(){}begin(){}report(){}done(){}},bl=class extends Ga{constructor(){super(),this._source=new ki.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function nN(t,e){if(e===void 0||e.workDoneToken===void 0)return new Ga;let r=e.workDoneToken;return delete e.workDoneToken,new lo(t,r)}Ei.attachWorkDone=nN;var iN=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(ki.WorkDoneProgressCancelNotification.type,r=>{let n=lo.Instances.get(r.token);(n instanceof Rl||n instanceof bl)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Ga:new lo(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,rN.generateUuid)();return this.connection.sendRequest(ki.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new Rl(this.connection,e))}else return Promise.resolve(new bl)}};Ei.ProgressFeature=iN;var wm;(function(t){t.type=new ki.ProgressType})(wm||(wm={}));var Cm=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(wm.type,this._token,e)}};function oN(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new Cm(t,r)}Ei.attachPartialResult=oN});var uT=H(Al=>{"use strict";Object.defineProperty(Al,"__esModule",{value:!0});Al.ConfigurationFeature=void 0;var sN=Ct(),aN=Am(),cN=t=>class extends t{getConfiguration(e){return e?aN.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(sN.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};Al.ConfigurationFeature=cN});var fT=H(wl=>{"use strict";Object.defineProperty(wl,"__esModule",{value:!0});wl.WorkspaceFoldersFeature=void 0;var Sl=Ct(),lN=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new Sl.Emitter,this.connection.onNotification(Sl.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(Sl.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(Sl.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};wl.WorkspaceFoldersFeature=lN});var dT=H(Cl=>{"use strict";Object.defineProperty(Cl,"__esModule",{value:!0});Cl.CallHierarchyFeature=void 0;var km=Ct(),uN=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(km.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=km.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=km.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Cl.CallHierarchyFeature=uN});var pT=H(kl=>{"use strict";Object.defineProperty(kl,"__esModule",{value:!0});kl.ShowDocumentFeature=void 0;var fN=Ct(),dN=t=>class extends t{showDocument(e){return this.connection.sendRequest(fN.ShowDocumentRequest.type,e)}};kl.ShowDocumentFeature=dN});var mT=H(El=>{"use strict";Object.defineProperty(El,"__esModule",{value:!0});El.FileOperationsFeature=void 0;var Jo=Ct(),pN=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(Jo.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(Jo.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(Jo.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(Jo.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(Jo.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(Jo.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};El.FileOperationsFeature=pN});var hT=H($l=>{"use strict";Object.defineProperty($l,"__esModule",{value:!0});$l.LinkedEditingRangeFeature=void 0;var mN=Ct(),hN=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(mN.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};$l.LinkedEditingRangeFeature=hN});var gT=H(Nl=>{"use strict";Object.defineProperty(Nl,"__esModule",{value:!0});Nl.TypeHierarchyFeature=void 0;var Em=Ct(),gN=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(Em.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=Em.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=Em.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Nl.TypeHierarchyFeature=gN});var TT=H(_l=>{"use strict";Object.defineProperty(_l,"__esModule",{value:!0});_l.InlineValueFeature=void 0;var yT=Ct(),yN=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(yT.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(yT.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};_l.InlineValueFeature=yN});var vT=H(Il=>{"use strict";Object.defineProperty(Il,"__esModule",{value:!0});Il.InlayHintFeature=void 0;var $m=Ct(),TN=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest($m.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest($m.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest($m.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};Il.InlayHintFeature=TN});var xT=H(Pl=>{"use strict";Object.defineProperty(Pl,"__esModule",{value:!0});Pl.DiagnosticFeature=void 0;var ja=Ct(),vN=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(ja.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(ja.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(ja.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(ja.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(ja.WorkspaceDiagnosticRequest.partialResult,r)))}}};Pl.DiagnosticFeature=vN});var RT=H(Dl=>{"use strict";Object.defineProperty(Dl,"__esModule",{value:!0});Dl.MonikerFeature=void 0;var xN=Ct(),RN=t=>class extends t{get moniker(){return{on:e=>{let r=xN.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Dl.MonikerFeature=RN});var DT=H(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.createConnection=he.combineFeatures=he.combineNotebooksFeatures=he.combineLanguagesFeatures=he.combineWorkspaceFeatures=he.combineWindowFeatures=he.combineClientFeatures=he.combineTracerFeatures=he.combineTelemetryFeatures=he.combineConsoleFeatures=he._NotebooksImpl=he._LanguagesImpl=he.BulkUnregistration=he.BulkRegistration=he.ErrorMessageTracker=void 0;var q=Ct(),Kr=Am(),_m=Sm(),te=lT(),bN=uT(),AN=fT(),SN=dT(),wN=Tm(),CN=pT(),kN=mT(),EN=hT(),$N=gT(),NN=TT(),_N=vT(),IN=xT(),PN=bm(),DN=RT();function Nm(t){if(t!==null)return t}var Im=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};he.ErrorMessageTracker=Im;var Ol=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(q.MessageType.Error,e)}warn(e){this.send(q.MessageType.Warning,e)}info(e){this.send(q.MessageType.Info,e)}log(e){this.send(q.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(q.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,q.RAL)().console.error("Sending log message failed")})}},Pm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:q.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(q.ShowMessageRequest.type,n).then(Nm)}showWarningMessage(e,...r){let n={type:q.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(q.ShowMessageRequest.type,n).then(Nm)}showInformationMessage(e,...r){let n={type:q.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(q.ShowMessageRequest.type,n).then(Nm)}},bT=(0,CN.ShowDocumentFeature)((0,te.ProgressFeature)(Pm)),ON;(function(t){function e(){return new Ll}t.create=e})(ON=he.BulkRegistration||(he.BulkRegistration={}));var Ll=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Kr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=_m.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},LN;(function(t){function e(){return new Ha(void 0,[])}t.create=e})(LN=he.BulkUnregistration||(he.BulkUnregistration={}));var Ha=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(q.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Kr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(q.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Ml=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof Ll?this.registerMany(e):e instanceof Ha?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Kr.string(r)?r:r.method,o=_m.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(q.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,r){let n=Kr.string(e)?e:e.method,i=_m.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(q.RegistrationRequest.type,o).then(s=>q.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(q.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(q.RegistrationRequest.type,r).then(()=>new Ha(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Dm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(q.ApplyWorkspaceEditRequest.type,n)}},AT=(0,kN.FileOperationsFeature)((0,AN.WorkspaceFoldersFeature)((0,bN.ConfigurationFeature)(Dm))),Fl=class{constructor(){this._trace=q.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==q.Trace.Off&&this.connection.sendNotification(q.LogTraceNotification.type,{message:e,verbose:this._trace===q.Trace.Verbose?r:void 0}).catch(()=>{})}},ql=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(q.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Ul=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._LanguagesImpl=Ul;var ST=(0,DN.MonikerFeature)((0,IN.DiagnosticFeature)((0,_N.InlayHintFeature)((0,NN.InlineValueFeature)((0,$N.TypeHierarchyFeature)((0,EN.LinkedEditingRangeFeature)((0,wN.SemanticTokensFeature)((0,SN.CallHierarchyFeature)(Ul)))))))),Gl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._NotebooksImpl=Gl;var wT=(0,PN.NotebookSyncFeature)(Gl);function CT(t,e){return function(r){return e(t(r))}}he.combineConsoleFeatures=CT;function kT(t,e){return function(r){return e(t(r))}}he.combineTelemetryFeatures=kT;function ET(t,e){return function(r){return e(t(r))}}he.combineTracerFeatures=ET;function $T(t,e){return function(r){return e(t(r))}}he.combineClientFeatures=$T;function NT(t,e){return function(r){return e(t(r))}}he.combineWindowFeatures=NT;function _T(t,e){return function(r){return e(t(r))}}he.combineWorkspaceFeatures=_T;function IT(t,e){return function(r){return e(t(r))}}he.combineLanguagesFeatures=IT;function PT(t,e){return function(r){return e(t(r))}}he.combineNotebooksFeatures=PT;function MN(t,e){function r(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:r(t.console,e.console,CT),tracer:r(t.tracer,e.tracer,ET),telemetry:r(t.telemetry,e.telemetry,kT),client:r(t.client,e.client,$T),window:r(t.window,e.window,NT),workspace:r(t.workspace,e.workspace,_T),languages:r(t.languages,e.languages,IT),notebooks:r(t.notebooks,e.notebooks,PT)}}he.combineFeatures=MN;function FN(t,e,r){let n=r&&r.console?new(r.console(Ol)):new Ol,i=t(n);n.rawAttach(i);let o=r&&r.tracer?new(r.tracer(Fl)):new Fl,s=r&&r.telemetry?new(r.telemetry(ql)):new ql,a=r&&r.client?new(r.client(Ml)):new Ml,c=r&&r.window?new(r.window(bT)):new bT,l=r&&r.workspace?new(r.workspace(AT)):new AT,u=r&&r.languages?new(r.languages(ST)):new ST,f=r&&r.notebooks?new(r.notebooks(wT)):new wT,m=[n,o,s,a,c,l,u,f];function T(v){return v instanceof Promise?v:Kr.thenable(v)?new Promise((y,$)=>{v.then(D=>y(D),D=>$(D))}):Promise.resolve(v)}let A,w,N,C={listen:()=>i.listen(),sendRequest:(v,...y)=>i.sendRequest(Kr.string(v)?v:v.method,...y),onRequest:(v,y)=>i.onRequest(v,y),sendNotification:(v,y)=>{let $=Kr.string(v)?v:v.method;return arguments.length===1?i.sendNotification($):i.sendNotification($,y)},onNotification:(v,y)=>i.onNotification(v,y),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:v=>(w=v,{dispose:()=>{w=void 0}}),onInitialized:v=>i.onNotification(q.InitializedNotification.type,v),onShutdown:v=>(A=v,{dispose:()=>{A=void 0}}),onExit:v=>(N=v,{dispose:()=>{N=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return c},get workspace(){return l},get languages(){return u},get notebooks(){return f},onDidChangeConfiguration:v=>i.onNotification(q.DidChangeConfigurationNotification.type,v),onDidChangeWatchedFiles:v=>i.onNotification(q.DidChangeWatchedFilesNotification.type,v),__textDocumentSync:void 0,onDidOpenTextDocument:v=>i.onNotification(q.DidOpenTextDocumentNotification.type,v),onDidChangeTextDocument:v=>i.onNotification(q.DidChangeTextDocumentNotification.type,v),onDidCloseTextDocument:v=>i.onNotification(q.DidCloseTextDocumentNotification.type,v),onWillSaveTextDocument:v=>i.onNotification(q.WillSaveTextDocumentNotification.type,v),onWillSaveTextDocumentWaitUntil:v=>i.onRequest(q.WillSaveTextDocumentWaitUntilRequest.type,v),onDidSaveTextDocument:v=>i.onNotification(q.DidSaveTextDocumentNotification.type,v),sendDiagnostics:v=>i.sendNotification(q.PublishDiagnosticsNotification.type,v),onHover:v=>i.onRequest(q.HoverRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onCompletion:v=>i.onRequest(q.CompletionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCompletionResolve:v=>i.onRequest(q.CompletionResolveRequest.type,v),onSignatureHelp:v=>i.onRequest(q.SignatureHelpRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDeclaration:v=>i.onRequest(q.DeclarationRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDefinition:v=>i.onRequest(q.DefinitionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onTypeDefinition:v=>i.onRequest(q.TypeDefinitionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onImplementation:v=>i.onRequest(q.ImplementationRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onReferences:v=>i.onRequest(q.ReferencesRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentHighlight:v=>i.onRequest(q.DocumentHighlightRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentSymbol:v=>i.onRequest(q.DocumentSymbolRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbol:v=>i.onRequest(q.WorkspaceSymbolRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbolResolve:v=>i.onRequest(q.WorkspaceSymbolResolveRequest.type,v),onCodeAction:v=>i.onRequest(q.CodeActionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeActionResolve:v=>i.onRequest(q.CodeActionResolveRequest.type,(y,$)=>v(y,$)),onCodeLens:v=>i.onRequest(q.CodeLensRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeLensResolve:v=>i.onRequest(q.CodeLensResolveRequest.type,(y,$)=>v(y,$)),onDocumentFormatting:v=>i.onRequest(q.DocumentFormattingRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDocumentRangeFormatting:v=>i.onRequest(q.DocumentRangeFormattingRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDocumentOnTypeFormatting:v=>i.onRequest(q.DocumentOnTypeFormattingRequest.type,(y,$)=>v(y,$)),onRenameRequest:v=>i.onRequest(q.RenameRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onPrepareRename:v=>i.onRequest(q.PrepareRenameRequest.type,(y,$)=>v(y,$)),onDocumentLinks:v=>i.onRequest(q.DocumentLinkRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentLinkResolve:v=>i.onRequest(q.DocumentLinkResolveRequest.type,(y,$)=>v(y,$)),onDocumentColor:v=>i.onRequest(q.DocumentColorRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onColorPresentation:v=>i.onRequest(q.ColorPresentationRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onFoldingRanges:v=>i.onRequest(q.FoldingRangeRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onSelectionRanges:v=>i.onRequest(q.SelectionRangeRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onExecuteCommand:v=>i.onRequest(q.ExecuteCommandRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),dispose:()=>i.dispose()};for(let v of m)v.attach(C);return i.onRequest(q.InitializeRequest.type,v=>{e.initialize(v),Kr.string(v.trace)&&(o.trace=q.Trace.fromString(v.trace));for(let y of m)y.initialize(v.capabilities);if(w){let y=w(v,new q.CancellationTokenSource().token,(0,te.attachWorkDone)(i,v),void 0);return T(y).then($=>{if($ instanceof q.ResponseError)return $;let D=$;D||(D={capabilities:{}});let X=D.capabilities;X||(X={},D.capabilities=X),X.textDocumentSync===void 0||X.textDocumentSync===null?X.textDocumentSync=Kr.number(C.__textDocumentSync)?C.__textDocumentSync:q.TextDocumentSyncKind.None:!Kr.number(X.textDocumentSync)&&!Kr.number(X.textDocumentSync.change)&&(X.textDocumentSync.change=Kr.number(C.__textDocumentSync)?C.__textDocumentSync:q.TextDocumentSyncKind.None);for(let ye of m)ye.fillServerCapabilities(X);return D})}else{let y={capabilities:{textDocumentSync:q.TextDocumentSyncKind.None}};for(let $ of m)$.fillServerCapabilities(y.capabilities);return y}}),i.onRequest(q.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,A)return A(new q.CancellationTokenSource().token)}),i.onNotification(q.ExitNotification.type,()=>{try{N&&N()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(q.SetTraceNotification.type,v=>{o.trace=q.Trace.fromString(v.value)}),C}he.createConnection=FN});var Om=H(Vt=>{"use strict";var qN=Vt&&Vt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),OT=Vt&&Vt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&qN(e,t,r)};Object.defineProperty(Vt,"__esModule",{value:!0});Vt.ProposedFeatures=Vt.NotebookDocuments=Vt.TextDocuments=Vt.SemanticTokensBuilder=void 0;var UN=Tm();Object.defineProperty(Vt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return UN.SemanticTokensBuilder}});OT(Ct(),Vt);var GN=xm();Object.defineProperty(Vt,"TextDocuments",{enumerable:!0,get:function(){return GN.TextDocuments}});var jN=bm();Object.defineProperty(Vt,"NotebookDocuments",{enumerable:!0,get:function(){return jN.NotebookDocuments}});OT(DT(),Vt);var HN;(function(t){t.all={__brand:"features"}})(HN=Vt.ProposedFeatures||(Vt.ProposedFeatures={}))});var MT=H((gH,LT)=>{"use strict";LT.exports=Ct()});var Ae=H(Cn=>{"use strict";var BN=Cn&&Cn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),qT=Cn&&Cn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&BN(e,t,r)};Object.defineProperty(Cn,"__esModule",{value:!0});Cn.createConnection=void 0;var jl=Om();qT(MT(),Cn);qT(Om(),Cn);var FT=!1,KN={initialize:t=>{},get shutdownReceived(){return FT},set shutdownReceived(t){FT=t},exit:t=>{}};function WN(t,e,r,n){let i,o,s,a;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),jl.ConnectionStrategy.is(t)||jl.ConnectionOptions.is(t)?a=t:(o=t,s=e,a=r);let c=l=>(0,jl.createProtocolConnection)(o,s,l,a);return(0,jl.createConnection)(c,KN,i)}Cn.createConnection=WN});var tC=H((qce,eC)=>{"use strict";eC.exports=Ae()});var Zw=de(Ae(),1);var Hl=class t{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){for(let n of e)if(t.isIncremental(n)){let i=jT(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),c=Math.max(i.end.line,0),l=this._lineOffsets,u=UT(n.text,!1,o);if(c-a===u.length)for(let m=0,T=u.length;m<T;m++)l[m+a+1]=u[m];else u.length<1e4?l.splice(a+1,c-a,...u):this._lineOffsets=l=l.slice(0,a+1).concat(u,l.slice(c+1));let f=n.text.length-(s-o);if(f!==0)for(let m=a+1+u.length,T=l.length;m<T;m++)l[m]=l[m]+f}else if(t.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=r}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=UT(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);r[s]>e?i=s:n=s+1}let o=n-1;return e=this.ensureBeforeEOL(e,r[o]),{line:o,character:e-r[o]}}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line];if(e.character<=0)return n;let i=e.line+1<r.length?r[e.line+1]:this._content.length,o=Math.min(n+e.character,i);return this.ensureBeforeEOL(o,n)}ensureBeforeEOL(e,r){for(;e>r&&GT(this._content.charCodeAt(e-1));)e--;return e}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range!==void 0&&(r.rangeLength===void 0||typeof r.rangeLength=="number")}static isFull(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range===void 0&&r.rangeLength===void 0}},Qo;(function(t){function e(i,o,s,a){return new Hl(i,o,s,a)}t.create=e;function r(i,o,s){if(i instanceof Hl)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=r;function n(i,o){let s=i.getText(),a=Lm(o.map(VN),(u,f)=>{let m=u.range.start.line-f.range.start.line;return m===0?u.range.start.character-f.range.start.character:m}),c=0,l=[];for(let u of a){let f=i.offsetAt(u.range.start);if(f<c)throw new Error("Overlapping edit");f>c&&l.push(s.substring(c,f)),u.newText.length&&l.push(u.newText),c=i.offsetAt(u.range.end)}return l.push(s.substr(c)),l.join("")}t.applyEdits=n})(Qo||(Qo={}));function Lm(t,e){if(t.length<=1)return t;let r=t.length/2|0,n=t.slice(0,r),i=t.slice(r);Lm(n,e),Lm(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?t[a++]=n[o++]:t[a++]=i[s++];for(;o<n.length;)t[a++]=n[o++];for(;s<i.length;)t[a++]=i[s++];return t}function UT(t,e,r=0){let n=e?[r]:[];for(let i=0;i<t.length;i++){let o=t.charCodeAt(i);GT(o)&&(o===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,n.push(r+i+1))}return n}function GT(t){return t===13||t===10}function jT(t){let e=t.start,r=t.end;return e.line>r.line||e.line===r.line&&e.character>r.character?{start:r,end:e}:t}function VN(t){let e=jT(t.range);return e!==t.range?{newText:t.newText,range:e}:t}function Et(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}function Qn(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}function HT(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}function Zo(t){return typeof t=="object"&&t!==null&&Et(t.container)&&Qn(t.reference)&&typeof t.message=="string"}var uo=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,r){return Et(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,r);return n[r]=o,o}}getAllSubTypes(e){let r=this.allSubtypes[e];if(r)return r;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function kn(t){return typeof t=="object"&&t!==null&&Array.isArray(t.content)}function fo(t){return typeof t=="object"&&t!==null&&typeof t.tokenType=="object"}function BT(t){return kn(t)&&typeof t.fullText=="string"}var Ir=class t{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new t(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return mr})}join(e=","){let r=this.iterator(),n="",i,o=!1;do i=r.next(),i.done||(o&&(n+=e),n+=zN(i.value)),o=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=r&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new t(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?mr:{done:!1,value:e(i)}})}filter(e){return new t(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return mr})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,r,n);return o===void 0?i.value:r(o,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new t(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(r.this);if(!n){let o=e(i);if(Bl(o))r.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(r.iterator);return mr})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new t(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=r.nextFn(n.this);if(!i)if(Bl(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return mr})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new t(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new t(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?mr:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let o=r?r(i):i;n.add(o)}return this.filter(i=>{let o=r?r(i):i;return!n.has(o)})}};function zN(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function Bl(t){return!!t&&typeof t[Symbol.iterator]=="function"}var es=new Ir(()=>{},()=>mr),mr=Object.freeze({done:!0,value:void 0});function ie(...t){if(t.length===1){let e=t[0];if(e instanceof Ir)return e;if(Bl(e))return new Ir(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Ir(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:mr)}return t.length>1?new Ir(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];Bl(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return mr}):es}var Wr=class extends Ir{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(r(s.value)[Symbol.iterator]()),s}return mr})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},Ba;(function(t){function e(o){return o.reduce((s,a)=>s+a,0)}t.sum=e;function r(o){return o.reduce((s,a)=>s*a,0)}t.product=r;function n(o){return o.reduce((s,a)=>Math.min(s,a))}t.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}t.max=i})(Ba=Ba||(Ba={}));function Mm(t){return new Wr(t,e=>kn(e)?e.content:[],{includeRoot:!0})}function VT(t){return Mm(t).filter(fo)}function zT(t,e){for(;t.container;)if(t=t.container,t===e)return!0;return!1}function Ka(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}function ir(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}var Zn;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(Zn=Zn||(Zn={}));function XN(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return Zn.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return Zn.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?Zn.Inside:r?Zn.OverlapBack:Zn.OverlapFront}function Kl(t,e){return XN(t,e)>Zn.After}var Fm=/^[\w\p{L}]$/u;function Pt(t,e,r=Fm){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return br(t,e)}}function XT(t,e){if(t){let r=YN(t,!0);if(r&&KT(r,e))return r;if(BT(t)){let n=t.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=t.content[i];if(KT(o,e))return o}}}}function KT(t,e){return fo(t)&&e.includes(t.tokenType.name)}function br(t,e){if(fo(t))return t;if(kn(t)){let r=0,n=t.content.length-1;for(;r<n;){let i=Math.floor((r+n)/2),o=t.content[i];if(o.offset>e)n=i-1;else if(o.end<=e)r=i+1;else return br(o,e)}if(r===n)return br(t.content[r],e)}}function YN(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t);for(;n>0;){n--;let i=r.content[n];if(e||!i.hidden)return i}t=r}}function YT(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t),i=r.content.length-1;for(;n<i;){n++;let o=r.content[n];if(e||!o.hidden)return o}t=r}}function JT(t,e){let r=JN(t,e);return r?r.parent.content.slice(r.a+1,r.b):[]}function JN(t,e){let r=WT(t),n=WT(e),i;for(let o=0;o<r.length&&o<n.length;o++){let s=r[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function WT(t){let e=[];for(;t.container;){let r=t.container,n=r.content.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}function po(t,e,r,n){let i=[t,e,r,n].reduce(tv,{});return ev(i)}var qm=Symbol("isProxy");function Wl(t){if(t&&t[qm])for(let e of Object.values(t))Wl(e);return t}function ev(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>ZT(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(ZT(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),qm]});return r[qm]=!0,r}var QT=Symbol();function ZT(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===QT)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/configuration-services/#resolving-cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=QT;try{t[e]=typeof i=="function"?i(n):ev(i,n)}catch(o){throw t[e]=o instanceof Error?o:void 0,o}return t[e]}else return}function tv(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=tv(i,n):t[r]=n}}return t}var Le=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Ba.sum(ie(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return ie(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return ie(this.map.keys())}values(){return ie(this.map.values()).flat()}entriesGroupedByKey(){return ie(this.map.entries())}};var Um="AbstractRule";var mo="AbstractType";var QN="Condition";var ZN="TypeDefinition";var Gm="AbstractElement";function ts(t){return le.isInstance(t,Gm)}var rv="ArrayType";function ho(t){return le.isInstance(t,rv)}var nv="Conjunction";function iv(t){return le.isInstance(t,nv)}var ov="Disjunction";function sv(t){return le.isInstance(t,ov)}var av="Grammar";function rs(t){return le.isInstance(t,av)}var e_="GrammarImport";function Vl(t){return le.isInstance(t,e_)}var t_="InferredType";function ns(t){return le.isInstance(t,t_)}var Va="Interface";function Ar(t){return le.isInstance(t,Va)}var cv="LiteralCondition";function lv(t){return le.isInstance(t,cv)}var uv="Negation";function fv(t){return le.isInstance(t,uv)}var dv="Parameter";function pv(t){return le.isInstance(t,dv)}var mv="ParameterReference";function is(t){return le.isInstance(t,mv)}var hv="ParserRule";function B(t){return le.isInstance(t,hv)}var gv="ReferenceType";function go(t){return le.isInstance(t,gv)}var r_="ReturnType";function os(t){return le.isInstance(t,r_)}var yv="SimpleType";function or(t){return le.isInstance(t,yv)}var jm="TerminalRule";function Se(t){return le.isInstance(t,jm)}var za="Type";function Mt(t){return le.isInstance(t,za)}var n_="TypeAttribute";function zl(t){return le.isInstance(t,n_)}var Tv="UnionType";function Vr(t){return le.isInstance(t,Tv)}var vv="Action";function Ne(t){return le.isInstance(t,vv)}var xv="Alternatives";function Pr(t){return le.isInstance(t,xv)}var Rv="Assignment";function Re(t){return le.isInstance(t,Rv)}var bv="CharacterRange";function Xl(t){return le.isInstance(t,bv)}var Av="CrossReference";function zt(t){return le.isInstance(t,Av)}var Sv="Group";function Ft(t){return le.isInstance(t,Sv)}var wv="Keyword";function pt(t){return le.isInstance(t,wv)}var Cv="NegatedToken";function kv(t){return le.isInstance(t,Cv)}var Ev="RegexToken";function $v(t){return le.isInstance(t,Ev)}var Nv="RuleCall";function _e(t){return le.isInstance(t,Nv)}var _v="TerminalAlternatives";function Iv(t){return le.isInstance(t,_v)}var Pv="TerminalGroup";function Dv(t){return le.isInstance(t,Pv)}var Ov="TerminalRuleCall";function Yl(t){return le.isInstance(t,Ov)}var Lv="UnorderedGroup";function Dr(t){return le.isInstance(t,Lv)}var Mv="UntilToken";function Fv(t){return le.isInstance(t,Mv)}var qv="Wildcard";function Uv(t){return le.isInstance(t,qv)}var Wa=class extends uo{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case vv:return this.isSubtype(Gm,r)||this.isSubtype(mo,r);case xv:case Rv:case bv:case Av:case Sv:case wv:case Cv:case Ev:case Nv:case _v:case Pv:case Ov:case Lv:case Mv:case qv:return this.isSubtype(Gm,r);case rv:case gv:case yv:case Tv:return this.isSubtype(ZN,r);case nv:case ov:case cv:case uv:case mv:return this.isSubtype(QN,r);case Va:case za:return this.isSubtype(mo,r);case hv:return this.isSubtype(Um,r)||this.isSubtype(mo,r);case jm:return this.isSubtype(Um,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return mo;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return Um;case"Grammar:usedGrammars":return av;case"NamedArgument:parameter":case"ParameterReference:parameter":return dv;case"TerminalRuleCall:rule":return jm;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}},le=new Wa;function Gv(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{Et(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):Et(r)&&(r.$container=t,r.$containerProperty=e))}function Ie(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}function ne(t){let r=Jl(t).$document;if(!r)throw new Error("AST node has no document.");return r}function Jl(t){for(;t.$container;)t=t.$container;return t}function $i(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new Ir(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=t[i];if(Et(o)){if(n.keyIndex++,Hm(o,r))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if(Et(a)&&Hm(a,r))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return mr})}function Qe(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new Wr(t,r=>$i(r,e))}function ti(t,e){if(t){if(e?.range&&!Hm(t,e.range))return new Wr(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new Wr(t,r=>$i(r,e),{includeRoot:!0})}function Hm(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?Kl(n,e):!1}function Ql(t){return new Ir(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if(Qn(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(Qn(o))return{done:!1,value:{reference:o,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return mr})}function jv(t){var e,r;if(t){if("astNode"in t)return s_(t);if(Array.isArray(t))return t.reduce(Hv,void 0);{let n=t,i=i_(n)?o_((r=(e=n?.root)===null||e===void 0?void 0:e.astNode)!==null&&r!==void 0?r:n?.astNode):void 0;return ss(n,i)}}else return}function i_(t){return typeof t<"u"&&"element"in t&&"text"in t}function o_(t){try{return ne(t).uri.toString()}catch{return}}function s_(t){var e,r;let{astNode:n,property:i,index:o}=t??{},s=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||s===void 0)){if(i===void 0)return ss(s,Bm(n));{let a=c=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<c.length?c[o]:void 0:c.reduce(Hv,void 0);if(!((r=s.assignments)===null||r===void 0)&&r[i]){let c=a(s.assignments[i]);return c&&ss(c,Bm(n))}else if(n.$cstNode){let c=a(Ni(n.$cstNode,i));return c&&ss(c,Bm(n))}else return}}}function Bm(t){var e,r,n,i;return t.$cstNode?(r=(e=ne(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new Wr(t,o=>o.$container?[o.$container]:[]).find(o=>{var s;return(s=o.$textRegion)===null||s===void 0?void 0:s.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function ss(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function Hv(t,e){var r,n;if(t){if(!e)return t&&ss(t)}else return e&&ss(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,s=Math.min(t.offset,e.offset),a=Math.max(i,o),c=a-s,l={offset:s,end:a,length:c};if(t.range&&e.range&&(l.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let u=t.fileURI,f=e.fileURI,m=u&&f&&u!==f?`<unmergable text regions of ${u}, ${f}>`:u??f;l.fileURI=m}return l}var Km=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[],this.pendingIndent=!0}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=a_(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function a_(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,s;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((s=n.targetRegion)===null||s===void 0)&&s.length&&r(n),delete n.complete,n}};return n}function Bv(t,e){let r=new Km(e),n=r.pushTraceRegion(void 0);Kv(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i?.targetRegion,s=n.targetRegion;return o&&i.sourceRegion&&o.offset===s.offset&&o.length===s.length?{text:r.content,trace:i}:{text:r.content,trace:n}}function Kv(t,e){typeof t=="string"?c_(t,e):t instanceof as?l_(t,e):t instanceof Xt?zv(t,e):t instanceof _i&&u_(t,e)}function Wv(t,e){return typeof t=="string"?t.length!==0:t instanceof Xt?t.contents.some(r=>Wv(r,e)):t instanceof _i?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function c_(t,e){t&&(e.pendingIndent&&Vv(e,!1),e.append(t))}function Vv(t,e){var r;let n="";for(let i of t.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function zv(t,e){let r,n=jv(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)Kv(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function l_(t,e){var r;if(Wv(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),zv(t,e)}finally{e.decreaseIndent()}}}function u_(t,e){t.ifNotEmpty&&!f_(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&Vv(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function f_(t){return t.trimStart()!==""}var UH=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"),Xa=/\r?\n/g,d_=/\S|$/;function Xv(t){let e=t.filter(n=>n.length>0).map(n=>n.search(d_)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}function Vm(t,...e){let r=p_(t),n=m_(t,e,r);return g_(n)}function Qv(t,e,r){return(n,...i)=>zm(t,e,r)(Vm(n,...i))}function p_(t){let e=t.join("_").split(Xa),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(s=>s.length!==0);let o=Xv(i);return{indentation:o,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function m_(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let s=[];t.forEach((l,u)=>{s.push(...l.split(Xa).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(u===0?(f,m,T)=>T===0?n?[]:[m]:T===1&&f.length===0?[m]:f.concat(Zl,m):(f,m,T)=>T===0?[m]:f.concat(Zl,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat(Ya(e[u])?e[u]:e[u]!==void 0?{content:String(e[u])}:u<e.length?Zv:[]))});let a=s.length,c=a!==0?s[a-1]:void 0;return(i||o)&&typeof c=="string"&&c.trim().length===0?n&&a!==1&&s[a-2]===Zl?s.slice(0,a-2):s.slice(0,a-1):s}var Zl={isNewLine:!0},Zv={isUndefinedSegment:!0},Jv=t=>t===Zl,Wm=t=>t===Zv,h_=t=>t.content!==void 0;function g_(t){return t.reduce((r,n,i)=>Wm(n)?r:Jv(n)?{node:i!==0&&(Wm(t[i-1])||Ya(t[i-1]))||i>1&&typeof t[i-1]=="string"&&(Wm(t[i-2])||Ya(t[i-2]))?r.node.appendNewLineIfNotEmpty():r.node.appendNewLine()}:(()=>{var o;let s=(i===0||Jv(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimStart().length):"",a=h_(n)?n.content:n,c;return{node:r.indented?r.node:s.length!==0?r.node.indent({indentation:s,indentImmediately:!1,indentedChildren:l=>c=l.append(a)}):r.node.append(a),indented:c??((o=r.indented)===null||o===void 0?void 0:o.append(a))}})(),{node:new Xt}).node}var Yv=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function Ya(t){return t instanceof Xt||t instanceof as||t instanceof _i}function cs(t,e){return Ya(t)?Bv(t,e).text:String(t)}var Xt=class t{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if(Et(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(st)}appendNewLineIf(e){return e?this.append(st):this}appendNewLineIfNotEmpty(){return this.append(y_)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append(Vm(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},s=new as(n,o,i);return this.contents.push(s),Array.isArray(r)?s.append(...r):r&&s.append(r),this}appendTraced(e,r,n){return i=>this.append(new t().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...o)=>this.append(Qv(e,r,n)(i,...o))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};function zm(t,e,r){return n=>n instanceof Xt&&n.tracedSource===void 0?n.trace(t,e,r):new Xt().trace(t,e,r).append(n)}var as=class extends Xt{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}},_i=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Yv,this.ifNotEmpty=r}},st=new _i,y_=new _i(void 0,!0);function ri(t){return"referenceType"in t}function ni(t){return"elementType"in t}function Dt(t){return"types"in t}function Jm(t){if(Dt(t)){let e=[];for(let r of t.types)e.push(...Jm(r));return e}else return[t]}function Or(t){return"value"in t}function Lr(t){return"primitive"in t}function En(t){return"string"in t}function fn(t){return t&&"type"in t}function pn(t){return t&&"properties"in t}var tu=class{constructor(e,r){var n;this.superTypes=new Set,this.subTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=r?.declared)!==null&&n!==void 0?n:!1,this.dataType=r?.dataType}toAstTypesString(e){let r=new Xt;return r.append(`export type ${this.name} = ${dn(this.type,"AstType")};`,st),e&&(r.append(st),rx(r,this.name)),this.dataType&&T_(r,this),cs(r)}toDeclaredTypesString(e){let r=new Xt;return r.append(`type ${Qm(this.name,e)} = ${dn(this.type,"DeclaredType")};`,st),cs(r)}},ls=class t{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let r=new Map;for(let n of this.properties)r.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let o of i)r.has(o.name)||r.set(o.name,o)}return Array.from(r.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,r,n){if(n.has(this.name))return;n.add(this.name);let i=pn(e)?e.properties:[];for(let o of i)r.has(o.name)||r.set(o.name,o);for(let o of e.subTypes)this.getSubTypeProperties(o,r,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof t)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new Xt,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?yo([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,st),r.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${yo([...this.containerTypes].map(s=>s.name)).join(" | ")};`,st),this.typeNames.size>0&&o.append(`readonly $type: ${yo([...this.typeNames]).map(s=>`'${s}'`).join(" | ")};`,st),ex(o,this.properties,"AstType")}),r.append("}",st),e&&(r.append(st),rx(r,this.name)),cs(r)}toDeclaredTypesString(e){let r=new Xt,n=Qm(this.name,e),i=yo(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,st),r.indent(o=>ex(o,this.properties,"DeclaredType",e)),r.append("}",st),cs(r)}},ru=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};function Qa(t,e){return Ii(t,e,new Map)}function Ii(t,e,r){let n=`${Ja(t)}\xBB${Ja(e)}`,i=r.get(n);return i!==void 0||(r.set(n,!1),i=!1,Dt(t)?i=t.types.every(o=>Ii(o,e,r)):Dt(e)?i=e.types.some(o=>Ii(t,o,r)):Or(e)&&fn(e.value)?Or(t)&&fn(t.value)&&e.value.name===t.value.name?i=!0:i=Ii(t,e.value.type,r):ri(t)?i=ri(e)&&Ii(t.referenceType,e.referenceType,r):ni(t)?i=ni(e)&&Ii(t.elementType,e.elementType,r):Or(t)?fn(t.value)?i=Ii(t.value.type,e,r):Or(e)?fn(e.value)?i=Ii(t,e.value.type,r):i=tx(t.value,e.value,new Set):i=!1:Lr(t)?i=Lr(e)&&t.primitive===e.primitive:En(t)&&(i=Lr(e)&&e.primitive==="string"||En(e)&&e.string===t.string),i&&r.set(n,i)),i}function tx(t,e,r){let n=t.name;if(r.has(n))return!1;if(r.add(n),t.name===e.name)return!0;for(let i of t.superTypes)if(pn(i)&&tx(i,e,r))return!0;return!1}function Ja(t){if(ri(t))return`@(${Ja(t.referenceType)})}`;if(ni(t))return`(${Ja(t.elementType)})[]`;if(Dt(t)){let e=t.types.map(r=>Ja(r)).join(" | ");return t.types.length<=1?`Union<${e}>`:e}else{if(Or(t))return`Value<${t.value.name}>`;if(Lr(t))return t.primitive;if(En(t))return`'${t.string}'`}throw new Error("Invalid type")}function dn(t,e="AstType"){if(ri(t)){let r=dn(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${Xm(t.referenceType,r)}`}else if(ni(t)){let r=dn(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${Xm(t.elementType,r)}[]`}else if(Dt(t)){let r=t.types.map(n=>Xm(n,dn(n,e)));return yo(r).join(" | ")}else{if(Or(t))return t.value.name;if(Lr(t))return t.primitive;if(En(t)){let r=e==="AstType"?"'":'"';return`${r}${t.string}${r}`}}throw new Error("Invalid type")}function Xm(t,e){return Dt(t)&&(e=`(${e})`),e}function ex(t,e,r,n=new Set){function i(o){let s=r==="AstType"?o.name:Qm(o.name,n),a=o.optional&&!nu(o.type),c=dn(o.type,r);return`${s}${a?"?":""}: ${c}`}yo(e,(o,s)=>o.name.localeCompare(s.name)).forEach(o=>t.append(i(o),st))}function nu(t){return ni(t)?!0:ri(t)?!1:Dt(t)?t.types.every(e=>nu(e)):Lr(t)?t.primitive==="boolean":!1}function rx(t,e){t.append(`export const ${e} = '${e}';`,st),t.append(st),t.append(`export function is${e}(item: unknown): item is ${e} {`,st),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,st)),t.append("}",st)}function T_(t,e){switch(e.dataType){case"string":if(Ym(e.type)){let r=Array.from(e.subTypes).map(o=>o.name),n=nx(e.type),i=ix(e.type);if(r.length===0&&n.length===0&&i.length===0)eu(t,e.name,`typeof item === '${e.dataType}'`);else{let o=v_(r,n,i);eu(t,e.name,o)}}break;case"number":case"boolean":case"bigint":eu(t,e.name,`typeof item === '${e.dataType}'`);break;case"Date":eu(t,e.name,"item instanceof Date");break;default:return}}function Ym(t){let e=!0;if(Lr(t))return t.primitive==="string";if(En(t))return!0;if(Dt(t)){for(let r of t.types)if(Or(r))if(fn(r.value)){if(!Ym(r.value.type))return!1}else return!1;else if(Lr(r)){if(r.primitive!=="string"||!r.regex)return!1}else if(Dt(r))e=Ym(r);else if(!En(r))return!1}else return!1;return e}function v_(t,e,r){let n=[...t.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(r.length>0){let i=r.map(o=>`${o}.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function Qm(t,e){return e.has(t)?`^${t}`:t}function nx(t){let e=[];if(En(t))return[t.string];if(Dt(t))for(let r of t.types)En(r)?e.push(r.string):Dt(r)&&e.push(...nx(r));return e}function ix(t){let e=[];if(Lr(t)&&t.primitive==="string"&&t.regex&&e.push(t.regex),Dt(t))for(let r of t.types)Lr(r)&&r.primitive==="string"&&r.regex?e.push(r.regex):Dt(r)&&e.push(...ix(r));return e}function eu(t,e,r){t.append(st,`export function is${e}(item: unknown): item is ${e} {`,st),t.indent(n=>n.append(`return ${r};`,st)),t.append("}",st)}function yo(t,e){return Array.from(new Set(t)).sort(e)}function Zm(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(s=>{let a=r.getOrCreateDocument(s.sourceUri),c=n.getAstNode(a.parseResult.value,s.sourcePath);Ar(c)?(i.add(c),Zm(c,e,r,n).forEach(u=>i.add(u))):c&&Mt(c.$container)&&i.add(c.$container)}),i}function Za(t){let e=new Set;if(Ar(t))e.add(t),t.superTypes.forEach(r=>{if(Ar(r.ref)){e.add(r.ref);let n=Za(r.ref);for(let i of n)e.add(i)}});else if(Mt(t)){let r=ox(t.type);for(let n of r){let i=Za(n);for(let o of i)e.add(o)}}return e}function ox(t){var e;if(Vr(t))return t.types.flatMap(r=>ox(r));if(or(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if(Mt(r)||Ar(r))return[r]}return[]}function eh(t,e){return t.interfaces.concat(e.interfaces)}function ou(t){return t.interfaces.concat(t.unions)}function sx(t){let e=t.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return r.map(i=>i.value)}function ax(t){return iu(t,new Set)}function iu(t,e){if(e.has(t))return[];if(e.add(t),Dt(t))return t.types.flatMap(r=>iu(r,e));if(Or(t)){let r=t.value;return"type"in r?iu(r.type,e):[r.name]}else if(ni(t))return iu(t.elementType,e);return[]}function ec(t){return typeof t.name=="string"}var us=class{getName(e){if(ec(e))return e.name}getNameNode(e){return Yt(e.$cstNode,"name")}};function J(t){return t.charCodeAt(0)}function su(t,e){Array.isArray(t)?t.forEach(function(r){e.push(r)}):e.push(t)}function fs(t,e){if(t[e]===!0)throw"duplicate flag "+e;let r=t[e];t[e]=!0}function To(t){if(t===void 0)throw Error("Internal Error - Should never get here!");return!0}function tc(){throw Error("Internal Error - Should never get here!")}function th(t){return t.type==="Character"}var rc=[];for(let t=J("0");t<=J("9");t++)rc.push(t);var nc=[J("_")].concat(rc);for(let t=J("a");t<=J("z");t++)nc.push(t);for(let t=J("A");t<=J("Z");t++)nc.push(t);var rh=[J(" "),J("\f"),J(`
`),J("\r"),J("	"),J("\v"),J("	"),J("\xA0"),J("\u1680"),J("\u2000"),J("\u2001"),J("\u2002"),J("\u2003"),J("\u2004"),J("\u2005"),J("\u2006"),J("\u2007"),J("\u2008"),J("\u2009"),J("\u200A"),J("\u2028"),J("\u2029"),J("\u202F"),J("\u205F"),J("\u3000"),J("\uFEFF")];var x_=/[0-9a-fA-F]/,au=/[0-9]/,R_=/[1-9]/,vo=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let r=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":fs(n,"global");break;case"i":fs(n,"ignoreCase");break;case"m":fs(n,"multiLine");break;case"u":fs(n,"unicode");break;case"y":fs(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:r,loc:this.loc(0)}}disjunction(){let e=[],r=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(r)}}alternative(){let e=[],r=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(r)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let r;switch(this.popChar()){case"=":r="Lookahead";break;case"!":r="NegativeLookahead";break}To(r);let n=this.disjunction();return this.consumeChar(")"),{type:r,value:n,loc:this.loc(e)}}return tc()}quantifier(e=!1){let r,n=this.idx;switch(this.popChar()){case"*":r={atLeast:0,atMost:1/0};break;case"+":r={atLeast:1,atMost:1/0};break;case"?":r={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":r={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),r={atLeast:i,atMost:o}):r={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&r===void 0)return;To(r);break}if(!(e===!0&&r===void 0)&&To(r))return this.peekChar(0)==="?"?(this.consumeChar("?"),r.greedy=!1):r.greedy=!0,r.type="Quantifier",r.loc=this.loc(n),r}atom(){let e,r=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),To(e)?(e.loc=this.loc(r),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):tc()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[J(`
`),J("\r"),J("\u2028"),J("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,r=!1;switch(this.popChar()){case"d":e=rc;break;case"D":e=rc,r=!0;break;case"s":e=rh;break;case"S":e=rh,r=!0;break;case"w":e=nc;break;case"W":e=nc,r=!0;break}return To(e)?{type:"Set",value:e,complement:r}:tc()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=J("\f");break;case"n":e=J(`
`);break;case"r":e=J("\r");break;case"t":e=J("	");break;case"v":e=J("\v");break}return To(e)?{type:"Character",value:e}:tc()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:J("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:J(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:J(e)}}}characterClass(){let e=[],r=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),r=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(th(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(th(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else su(n.value,e),e.push(J("-")),su(o.value,e)}else su(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:r,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:J("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let r=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:r};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(R_.test(e)===!1)throw Error("Expecting a positive integer");for(;au.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(au.test(e)===!1)throw Error("Expecting an integer");for(;au.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:J(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return au.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let r="";for(let i=0;i<e;i++){let o=this.popChar();if(x_.test(o)===!1)throw Error("Expecting a HexDecimal digits");r+=o}return{type:"Character",value:parseInt(r,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var $n=class{visitChildren(e){for(let r in e){let n=e[r];e.hasOwnProperty(r)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var b_=new vo,ih=class extends $n{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=ii(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},nh=new ih;function cx(t){try{return typeof t=="string"&&(t=new RegExp(t)),t=t.toString(),nh.reset(t),nh.visit(b_.pattern(t)),nh.multiline}catch{return!1}}function oh(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}function ii(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function lx(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:ii(e)).join("")}function ux(t,e){let r=A_(t),n=e.match(r);return!!n&&n[0].length>0}function A_(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let o="",s;function a(l){o+=r.substr(n,l),n+=l}function c(l){o+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":c(3);break;case"x":c(4);break;case"u":e.unicode?r[n+2]==="{"?c(r.indexOf("}",n)-n+1):c(6):c(2);break;case"p":case"P":e.unicode?c(r.indexOf("}",n)-n+1):c(2);break;case"k":c(r.indexOf(">",n)-n+1);break;default:c(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(r)||[],c(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(r),s?a(s[0].length):c(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=r.substr(s,n-s);break;case"<":switch(r[n+3]){case"=":case"!":s=n,n+=4,i(),o+=r.substr(s,n-s);break;default:a(r.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:c(1);break}return o}return new RegExp(i(),t.flags)}var ah={};LC(ah,{URI:()=>sh,Utils:()=>S_});var fx;(()=>{"use strict";var t={470:i=>{function o(c){if(typeof c!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(c))}function s(c,l){for(var u,f="",m=0,T=-1,A=0,w=0;w<=c.length;++w){if(w<c.length)u=c.charCodeAt(w);else{if(u===47)break;u=47}if(u===47){if(!(T===w-1||A===1))if(T!==w-1&&A===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var N=f.lastIndexOf("/");if(N!==f.length-1){N===-1?(f="",m=0):m=(f=f.slice(0,N)).length-1-f.lastIndexOf("/"),T=w,A=0;continue}}else if(f.length===2||f.length===1){f="",m=0,T=w,A=0;continue}}l&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+c.slice(T+1,w):f=c.slice(T+1,w),m=w-T-1;T=w,A=0}else u===46&&A!==-1?++A:A=-1}return f}var a={resolve:function(){for(var c,l="",u=!1,f=arguments.length-1;f>=-1&&!u;f--){var m;f>=0?m=arguments[f]:(c===void 0&&(c=process.cwd()),m=c),o(m),m.length!==0&&(l=m+"/"+l,u=m.charCodeAt(0)===47)}return l=s(l,!u),u?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(c){if(o(c),c.length===0)return".";var l=c.charCodeAt(0)===47,u=c.charCodeAt(c.length-1)===47;return(c=s(c,!l)).length!==0||l||(c="."),c.length>0&&u&&(c+="/"),l?"/"+c:c},isAbsolute:function(c){return o(c),c.length>0&&c.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var c,l=0;l<arguments.length;++l){var u=arguments[l];o(u),u.length>0&&(c===void 0?c=u:c+="/"+u)}return c===void 0?".":a.normalize(c)},relative:function(c,l){if(o(c),o(l),c===l||(c=a.resolve(c))===(l=a.resolve(l)))return"";for(var u=1;u<c.length&&c.charCodeAt(u)===47;++u);for(var f=c.length,m=f-u,T=1;T<l.length&&l.charCodeAt(T)===47;++T);for(var A=l.length-T,w=m<A?m:A,N=-1,C=0;C<=w;++C){if(C===w){if(A>w){if(l.charCodeAt(T+C)===47)return l.slice(T+C+1);if(C===0)return l.slice(T+C)}else m>w&&(c.charCodeAt(u+C)===47?N=C:C===0&&(N=0));break}var v=c.charCodeAt(u+C);if(v!==l.charCodeAt(T+C))break;v===47&&(N=C)}var y="";for(C=u+N+1;C<=f;++C)C!==f&&c.charCodeAt(C)!==47||(y.length===0?y+="..":y+="/..");return y.length>0?y+l.slice(T+N):(T+=N,l.charCodeAt(T)===47&&++T,l.slice(T))},_makeLong:function(c){return c},dirname:function(c){if(o(c),c.length===0)return".";for(var l=c.charCodeAt(0),u=l===47,f=-1,m=!0,T=c.length-1;T>=1;--T)if((l=c.charCodeAt(T))===47){if(!m){f=T;break}}else m=!1;return f===-1?u?"/":".":u&&f===1?"//":c.slice(0,f)},basename:function(c,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');o(c);var u,f=0,m=-1,T=!0;if(l!==void 0&&l.length>0&&l.length<=c.length){if(l.length===c.length&&l===c)return"";var A=l.length-1,w=-1;for(u=c.length-1;u>=0;--u){var N=c.charCodeAt(u);if(N===47){if(!T){f=u+1;break}}else w===-1&&(T=!1,w=u+1),A>=0&&(N===l.charCodeAt(A)?--A==-1&&(m=u):(A=-1,m=w))}return f===m?m=w:m===-1&&(m=c.length),c.slice(f,m)}for(u=c.length-1;u>=0;--u)if(c.charCodeAt(u)===47){if(!T){f=u+1;break}}else m===-1&&(T=!1,m=u+1);return m===-1?"":c.slice(f,m)},extname:function(c){o(c);for(var l=-1,u=0,f=-1,m=!0,T=0,A=c.length-1;A>=0;--A){var w=c.charCodeAt(A);if(w!==47)f===-1&&(m=!1,f=A+1),w===46?l===-1?l=A:T!==1&&(T=1):l!==-1&&(T=-1);else if(!m){u=A+1;break}}return l===-1||f===-1||T===0||T===1&&l===f-1&&l===u+1?"":c.slice(l,f)},format:function(c){if(c===null||typeof c!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof c);return function(l,u){var f=u.dir||u.root,m=u.base||(u.name||"")+(u.ext||"");return f?f===u.root?f+m:f+"/"+m:m}(0,c)},parse:function(c){o(c);var l={root:"",dir:"",base:"",ext:"",name:""};if(c.length===0)return l;var u,f=c.charCodeAt(0),m=f===47;m?(l.root="/",u=1):u=0;for(var T=-1,A=0,w=-1,N=!0,C=c.length-1,v=0;C>=u;--C)if((f=c.charCodeAt(C))!==47)w===-1&&(N=!1,w=C+1),f===46?T===-1?T=C:v!==1&&(v=1):T!==-1&&(v=-1);else if(!N){A=C+1;break}return T===-1||w===-1||v===0||v===1&&T===w-1&&T===A+1?w!==-1&&(l.base=l.name=A===0&&m?c.slice(1,w):c.slice(A,w)):(A===0&&m?(l.name=c.slice(1,T),l.base=c.slice(1,w)):(l.name=c.slice(A,T),l.base=c.slice(A,w)),l.ext=c.slice(T,w)),A>0?l.dir=c.slice(0,A-1):m&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function r(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,r),s.exports}r.d=(i,o)=>{for(var s in o)r.o(o,s)&&!r.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},r.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),r.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;r.r(n),r.d(n,{URI:()=>m,Utils:()=>xt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function c(M,S){if(!M.scheme&&S)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);if(M.scheme&&!o.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!s.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let l="",u="/",f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class m{static isUri(S){return S instanceof m||!!S&&typeof S.authority=="string"&&typeof S.fragment=="string"&&typeof S.path=="string"&&typeof S.query=="string"&&typeof S.scheme=="string"&&typeof S.fsPath=="string"&&typeof S.with=="function"&&typeof S.toString=="function"}scheme;authority;path;query;fragment;constructor(S,U,j,ce,ee,Q=!1){typeof S=="object"?(this.scheme=S.scheme||l,this.authority=S.authority||l,this.path=S.path||l,this.query=S.query||l,this.fragment=S.fragment||l):(this.scheme=function(Rt,ut){return Rt||ut?Rt:"file"}(S,Q),this.authority=U||l,this.path=function(Rt,ut){switch(Rt){case"https":case"http":case"file":ut?ut[0]!==u&&(ut=u+ut):ut=u}return ut}(this.scheme,j||l),this.query=ce||l,this.fragment=ee||l,c(this,Q))}get fsPath(){return v(this,!1)}with(S){if(!S)return this;let{scheme:U,authority:j,path:ce,query:ee,fragment:Q}=S;return U===void 0?U=this.scheme:U===null&&(U=l),j===void 0?j=this.authority:j===null&&(j=l),ce===void 0?ce=this.path:ce===null&&(ce=l),ee===void 0?ee=this.query:ee===null&&(ee=l),Q===void 0?Q=this.fragment:Q===null&&(Q=l),U===this.scheme&&j===this.authority&&ce===this.path&&ee===this.query&&Q===this.fragment?this:new A(U,j,ce,ee,Q)}static parse(S,U=!1){let j=f.exec(S);return j?new A(j[2]||l,X(j[4]||l),X(j[5]||l),X(j[7]||l),X(j[9]||l),U):new A(l,l,l,l,l)}static file(S){let U=l;if(i&&(S=S.replace(/\\/g,u)),S[0]===u&&S[1]===u){let j=S.indexOf(u,2);j===-1?(U=S.substring(2),S=u):(U=S.substring(2,j),S=S.substring(j)||u)}return new A("file",U,S,l,l)}static from(S){let U=new A(S.scheme,S.authority,S.path,S.query,S.fragment);return c(U,!0),U}toString(S=!1){return y(this,S)}toJSON(){return this}static revive(S){if(S){if(S instanceof m)return S;{let U=new A(S);return U._formatted=S.external,U._fsPath=S._sep===T?S.fsPath:null,U}}return S}}let T=i?1:void 0;class A extends m{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=v(this,!1)),this._fsPath}toString(S=!1){return S?y(this,!0):(this._formatted||(this._formatted=y(this,!1)),this._formatted)}toJSON(){let S={$mid:1};return this._fsPath&&(S.fsPath=this._fsPath,S._sep=T),this._formatted&&(S.external=this._formatted),this.path&&(S.path=this.path),this.scheme&&(S.scheme=this.scheme),this.authority&&(S.authority=this.authority),this.query&&(S.query=this.query),this.fragment&&(S.fragment=this.fragment),S}}let w={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function N(M,S,U){let j,ce=-1;for(let ee=0;ee<M.length;ee++){let Q=M.charCodeAt(ee);if(Q>=97&&Q<=122||Q>=65&&Q<=90||Q>=48&&Q<=57||Q===45||Q===46||Q===95||Q===126||S&&Q===47||U&&Q===91||U&&Q===93||U&&Q===58)ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j!==void 0&&(j+=M.charAt(ee));else{j===void 0&&(j=M.substr(0,ee));let Rt=w[Q];Rt!==void 0?(ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j+=Rt):ce===-1&&(ce=ee)}}return ce!==-1&&(j+=encodeURIComponent(M.substring(ce))),j!==void 0?j:M}function C(M){let S;for(let U=0;U<M.length;U++){let j=M.charCodeAt(U);j===35||j===63?(S===void 0&&(S=M.substr(0,U)),S+=w[j]):S!==void 0&&(S+=M[U])}return S!==void 0?S:M}function v(M,S){let U;return U=M.authority&&M.path.length>1&&M.scheme==="file"?`//${M.authority}${M.path}`:M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?S?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,i&&(U=U.replace(/\//g,"\\")),U}function y(M,S){let U=S?C:N,j="",{scheme:ce,authority:ee,path:Q,query:Rt,fragment:ut}=M;if(ce&&(j+=ce,j+=":"),(ee||ce==="file")&&(j+=u,j+=u),ee){let me=ee.indexOf("@");if(me!==-1){let $r=ee.substr(0,me);ee=ee.substr(me+1),me=$r.lastIndexOf(":"),me===-1?j+=U($r,!1,!1):(j+=U($r.substr(0,me),!1,!1),j+=":",j+=U($r.substr(me+1),!1,!0)),j+="@"}ee=ee.toLowerCase(),me=ee.lastIndexOf(":"),me===-1?j+=U(ee,!1,!0):(j+=U(ee.substr(0,me),!1,!0),j+=ee.substr(me))}if(Q){if(Q.length>=3&&Q.charCodeAt(0)===47&&Q.charCodeAt(2)===58){let me=Q.charCodeAt(1);me>=65&&me<=90&&(Q=`/${String.fromCharCode(me+32)}:${Q.substr(3)}`)}else if(Q.length>=2&&Q.charCodeAt(1)===58){let me=Q.charCodeAt(0);me>=65&&me<=90&&(Q=`${String.fromCharCode(me+32)}:${Q.substr(2)}`)}j+=U(Q,!0,!1)}return Rt&&(j+="?",j+=U(Rt,!1,!1)),ut&&(j+="#",j+=S?ut:N(ut,!1,!1)),j}function $(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+$(M.substr(3)):M}}let D=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function X(M){return M.match(D)?M.replace(D,S=>$(S)):M}var ye=r(470);let Ee=ye.posix||ye,Ht="/";var xt;(function(M){M.joinPath=function(S,...U){return S.with({path:Ee.join(S.path,...U)})},M.resolvePath=function(S,...U){let j=S.path,ce=!1;j[0]!==Ht&&(j=Ht+j,ce=!0);let ee=Ee.resolve(j,...U);return ce&&ee[0]===Ht&&!S.authority&&(ee=ee.substring(1)),S.with({path:ee})},M.dirname=function(S){if(S.path.length===0||S.path===Ht)return S;let U=Ee.dirname(S.path);return U.length===1&&U.charCodeAt(0)===46&&(U=""),S.with({path:U})},M.basename=function(S){return Ee.basename(S.path)},M.extname=function(S){return Ee.extname(S.path)}})(xt||(xt={}))})(),fx=n})();var{URI:sh,Utils:S_}=fx;var oi=ah;"default"in oi&&(oi=oi.default);var Jt=oi.URI;var ve;(function(t){t.basename=oi.Utils.basename,t.dirname=oi.Utils.dirname,t.extname=oi.Utils.extname,t.joinPath=oi.Utils.joinPath,t.resolvePath=oi.Utils.resolvePath;function e(n,i){return n?.toString()===i?.toString()}t.equals=e;function r(n,i){let o=typeof n=="string"?n:n.path,s=typeof i=="string"?i:i.path,a=o.split("/").filter(m=>m.length>0),c=s.split("/").filter(m=>m.length>0),l=0;for(;l<a.length&&a[l]===c[l];l++);let u="../".repeat(a.length-l),f=c.slice(l).join("/");return u+f}t.relative=r})(ve=ve||(ve={}));var gB=ve.equals,yB=ve.relative;var cu,dx=()=>cu??(cu=lu(`{"$type":"Grammar","isDeclared":true,"name":"LangiumGrammar","rules":[{"$type":"ParserRule","name":"Grammar","entry":true,"definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"isDeclared","operator":"?=","terminal":{"$type":"Keyword","value":"grammar"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"with"},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"}],"cardinality":"?"},{"$type":"Assignment","feature":"imports","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"interfaces","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}],"cardinality":"+"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Interface","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"interface"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"extends"},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SchemaType","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"attributes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},"cardinality":"*"},{"$type":"Keyword","value":"}"},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeAttribute","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"isOptional","operator":"?=","terminal":{"$type":"Keyword","value":"?"},"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeDefinition","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnionType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnionType"},"feature":"types","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ArrayType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ArrayType"},"feature":"elementType","operator":"="},{"$type":"Keyword","value":"["},{"$type":"Keyword","value":"]"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReferenceType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ReferenceType"}},{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"referenceType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SimpleType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":")"}]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"SimpleType"}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"typeRef","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"primitiveType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"stringType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PrimitiveType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"string"},{"$type":"Keyword","value":"number"},{"$type":"Keyword","value":"boolean"},{"$type":"Keyword","value":"Date"},{"$type":"Keyword","value":"bigint"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Type","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"type"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractRule","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"GrammarImport","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"import"},{"$type":"Assignment","feature":"path","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParserRule","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"entry","operator":"?=","terminal":{"$type":"Keyword","value":"entry"}},{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"wildcard","operator":"?=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"returnType","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":false},"calledByName":false}]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"InferredType","parameters":[{"$type":"Parameter","name":"imperative"}],"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","guardCondition":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}},"elements":[{"$type":"Keyword","value":"infer"}]},{"$type":"Group","guardCondition":{"$type":"Negation","value":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}}},"elements":[{"$type":"Keyword","value":"infers"}]}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"wildcard":false},{"$type":"ParserRule","name":"RuleNameAndParams","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Parameter","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Alternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ConditionalBranch","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"}},{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"guardCondition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":">"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnorderedGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnorderedGroup"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTokenWithCardinality","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Action","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Action"}},{"$type":"Keyword","value":"{"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":true},"calledByName":false}]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"+="}]}},{"$type":"Keyword","value":"current"}],"cardinality":"?"},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@43"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Keyword","definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RuleCall","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NamedArgument","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"calledByName","operator":"?=","terminal":{"$type":"Keyword","value":"="}}],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"LiteralCondition","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"true","operator":"?=","terminal":{"$type":"Keyword","value":"true"}},{"$type":"Keyword","value":"false"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Disjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Disjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Conjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Conjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Negation","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Negation"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Atom","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedCondition","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParameterReference","definition":{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedKeyword","inferredType":{"$type":"InferredType","name":"Keyword"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedRuleCall","inferredType":{"$type":"InferredType","name":"RuleCall"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Assignment","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Assignment"}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}],"cardinality":"?"},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"+="},{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"?="}]}},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedAssignableElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@40"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReference","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CrossReference"}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"deprecatedSyntax","operator":"?=","terminal":{"$type":"Keyword","value":"|"}},{"$type":"Keyword","value":":"}]},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]}}],"cardinality":"?"},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReferenceableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedGroup","inferredType":{"$type":"InferredType","name":"Group"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReturnType","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRule","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"hidden","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"},"cardinality":"?"},{"$type":"Keyword","value":"terminal"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}}],"cardinality":"?"}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalAlternatives"},"feature":"elements","operator":"+="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalGroup"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalTokenElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@57"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@53"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@54"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@55"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@56"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedTerminalElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"lookahead","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?="},{"$type":"Keyword","value":"?!"}]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRuleCall","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalRuleCall"}},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@46"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NegatedToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"NegatedToken"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UntilToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UntilToken"}},{"$type":"Keyword","value":"->"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RegexToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"RegexToken"}},{"$type":"Assignment","feature":"regex","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@61"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Wildcard","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Wildcard"}},{"$type":"Keyword","value":"."}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CharacterRange","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CharacterRange"}},{"$type":"Assignment","feature":"left","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":".."},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"FeatureName","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"current"},{"$type":"Keyword","value":"entry"},{"$type":"Keyword","value":"extends"},{"$type":"Keyword","value":"false"},{"$type":"Keyword","value":"fragment"},{"$type":"Keyword","value":"grammar"},{"$type":"Keyword","value":"hidden"},{"$type":"Keyword","value":"import"},{"$type":"Keyword","value":"interface"},{"$type":"Keyword","value":"returns"},{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"true"},{"$type":"Keyword","value":"type"},{"$type":"Keyword","value":"infer"},{"$type":"Keyword","value":"infers"},{"$type":"Keyword","value":"with"},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ID","definition":{"$type":"RegexToken","regex":"/\\\\^?[_a-zA-Z][\\\\w_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","definition":{"$type":"RegexToken","regex":"/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RegexLiteral","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/[a-z]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/"},"fragment":false}],"types":[{"$type":"Type","name":"AbstractType","type":{"$type":"UnionType","types":[{"$type":"SimpleType","typeRef":{"$ref":"#/rules@1"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@10"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@23/definition/elements@0"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@13"}}]}}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"interfaces":[],"usedGrammars":[]}`));var du=de(so(),1);var ic=de(Yn(),1);function w_(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}var px=0,C_=10;var mx=Symbol("OperationCancelled");function xo(t){return t===mx}async function Ze(t){if(t===ic.CancellationToken.None)return;let e=Date.now();if(e-px>=C_&&(px=e,await w_()),t.isCancellationRequested)throw mx}var uu=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new ic.CancellationTokenSource}lock(e){this.cancel();let r=new ic.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{xo(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};function Mr(t){return{code:t}}var ds;(function(t){t.all=["fast","slow","built-in"]})(ds=ds||(ds={}));var fu=class{constructor(e){this.entries=new Le,this.reflection=e.shared.AstReflection}register(e,r=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let c={check:this.wrapValidationException(a,r),category:n};this.addEntry(i,c)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,r),category:n};this.addEntry(i,a)}}}wrapValidationException(e,r){return async(n,i,o)=>{try{await e.call(r,n,i,o)}catch(s){if(xo(s))throw s;console.error("An error occurred during validation:",s);let a=s instanceof Error?s.message:String(s);s instanceof Error&&s.stack&&console.error(s.stack),i("error","An error occurred during validation: "+a,{node:n})}}}addEntry(e,r){if(e==="AstNode"){this.entries.add("AstNode",r);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,r)}getChecks(e,r){let n=ie(this.entries.get(e)).concat(this.entries.get("AstNode"));return r&&(n=n.filter(i=>r.includes(i.category))),n.map(i=>i.check)}};function hx(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let a of n.attributes)i.push({name:a.name,optional:a.isOptional,astNodes:new Set([a]),type:Ro(a.type)});let o=new Set;for(let a of n.superTypes)a.ref&&o.add(mn(a.ref));let s={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};r.interfaces.push(s)}for(let n of e){let i={name:n.name,declared:!0,type:Ro(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}function Ro(t){if(ho(t))return{elementType:Ro(t.elementType)};if(go(t))return{referenceType:Ro(t.referenceType)};if(Vr(t))return{types:t.types.map(Ro)};if(or(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=Nn(r);if(n)return ps(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}function ms(t){return"referenceType"in t}function ch(t){return"elementType"in t}function gx(t){return"types"in t}function lh(t){return"value"in t}function k_(t){return"primitive"in t}function E_(t){return"string"in t}function yx(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new ls(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new tu(n.name,{declared:n.declared,dataType:n.dataType});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let s=e.get(o)||r.get(o);s&&i.superTypes.add(s)}for(let o of n.subTypes){let s=e.get(o)||r.get(o);s&&i.subTypes.add(s)}for(let o of n.properties){let s=$_(o,e,r);i.properties.push(s)}}for(let n of t.unions){let i=r.get(n.name);i.type=oc(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}function $_(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:oc(t.type,void 0,e,r)}}function oc(t,e,r,n){if(ch(t))return{elementType:oc(t.elementType,e,r,n)};if(ms(t))return{referenceType:oc(t.referenceType,void 0,r,n)};if(gx(t))return{types:t.types.map(i=>oc(i,e,r,n))};if(E_(t))return{string:t.string};if(k_(t))return{primitive:t.primitive,regex:t.regex};if(lh(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function fh(t,e){let r=sc(t),n=sc(e);for(let i of n)N_(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}function N_(t,e){return t.some(r=>uh(r,e))}function uh(t,e){return ch(t)&&ch(e)?uh(t.elementType,e.elementType):ms(t)&&ms(e)?uh(t.referenceType,e.referenceType):lh(t)&&lh(e)?t.value===e.value:!1}function sc(t){return gx(t)?t.types.flatMap(e=>sc(e)):[t]}function Tx(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType,r.checkCrossReferenceToTypeUnion],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion,RegexToken:[r.checkInvalidRegexFlags,r.checkDirectlyUsedRegexFlags]};e.register(n,r)}var we;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(we=we||(we={}));var pu=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",data:Mr(we.GrammarNameUppercase)})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>B(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>B(o)&&!Fr(o));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",data:Mr(we.EntryRuleTokenSyntax)}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&Fr(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>ie(i.rules).filter(o=>!ac(o));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>ie(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let o=new Le;n(e).forEach(c=>o.add(c.name,c));for(let[,c]of o.entriesGroupedByKey())c.length>1&&c.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let s=new Set,a=cc(this.documents,e);for(let c of a)n(c).forEach(l=>s.add(l.name));for(let c of o.keys())s.has(c)&&o.get(c).forEach(u=>{r("error",`A ${i} with the name '${u.name}' already exists in an imported grammar.`,{node:u,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Le;for(let i of e.imports){let o=si(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,s)=>{s>0&&r("warning","The grammar is already being directly imported.",{node:o,tags:[du.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let o of e.imports){let s=cc(this.documents,o);n.set(o,s)}let i=new Le;for(let o of e.imports){let s=n.get(o);for(let a of e.imports){if(o===a)continue;let c=n.get(a),l=this.getDuplicateExportedRules(s,c);for(let u of l)i.add(o,u)}}for(let o of e.imports){let s=i.get(o);s.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+ie(s).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(a=>!r.includes(a)).flatMap(a=>a.rules),o=r.flatMap(a=>a.rules),s=new Set;for(let a of i){let c=a.name;for(let l of o){let u=l.name;c===u&&s.add(l.name)}}return s}checkGrammarTypeInfer(e,r){var n,i,o;let s=new Set;for(let c of e.types)s.add(c.name);for(let c of e.interfaces)s.add(c.name);for(let c of cc(this.documents,e))c.types.forEach(l=>s.add(l.name)),c.interfaces.forEach(l=>s.add(l.name));for(let c of e.rules.filter(B)){if(ac(c))continue;let l=Fr(c),u=!c.returnType&&!c.dataType,f=Nn(c);if(!l&&f&&s.has(f)===u){if((u||((n=c.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&c.inferredType===void 0)r("error",a(f,u),{node:c,property:"name",data:Mr(we.MissingReturns)});else if(u||((i=c.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=zr(c.inferredType.$cstNode,"infers");r("error",a(f,u),{node:c.inferredType,property:"name",data:{code:we.InvalidInfers,actionSegment:ir(m)}})}}else if(l&&u){let m=zr(c.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:c,property:"inferredType",data:{code:we.InvalidInfers,actionSegment:ir(m)}})}}for(let c of Qe(e).filter(Ne)){let l=this.getActionType(c);if(l){let u=!!c.inferredType,f=Nn(c);if(c.type&&f&&s.has(f)===u){let m=u?zr(c.$cstNode,"infer"):zr(c.$cstNode,"{");r("error",a(f,u),{node:c,property:"type",data:{code:u?we.SuperfluousInfer:we.MissingInfer,actionSegment:ir(m)}})}else if(l&&f&&s.has(f)&&u&&c.$cstNode){let m=Yt((o=c.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),T=zr(c.$cstNode,"{");m&&T&&r("error",`${f} is a declared type and cannot be redefined.`,{node:c,property:"type",data:{code:we.SuperfluousInfer,actionRange:{start:T.range.end,end:m.range.start}}})}}}function a(c,l){return l?`The type '${c}' is already explicitly declared and cannot be inferred.`:`The type '${c}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",data:Mr(we.HiddenGrammarTokens)})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=Yr(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkInvalidRegexFlags(e,r){let n=e.regex;if(n){let i=n.lastIndexOf("/"),o=n.substring(i+1),s="gmy",c=s+"isu",l=new Set,u=new Set;for(let m=0;m<o.length;m++){let T=o.charAt(m);c.includes(T)?s.includes(T)&&u.add(T):l.add(T)}let f=this.getFlagRange(e);f&&(l.size>0?r("error",`'${Array.from(l).join("")}' ${l.size>1?"are":"is"} not valid regular expression flag${l.size>1?"s":""}.`,{node:e,range:f}):u.size>0&&r("warning",`'${Array.from(u).join("")}' regular expression flag${u.size>1?"s":""} will be ignored by Langium.`,{node:e,range:f}))}}checkDirectlyUsedRegexFlags(e,r){if(!Se(e.$container)){let n=this.getFlagRange(e);n&&r("warning","Regular expression flags are only applied if the terminal is not a composition",{node:e,range:n})}}getFlagRange(e){let r=Yt(e.$cstNode,"regex");if(!r||!e.regex)return;let n=e.regex,i=n.lastIndexOf("/")+1;return{start:{line:r.range.end.line,character:r.range.end.character-n.length+i},end:r.range.end}}checkUsedHiddenTerminalRule(e,r){let n=Ie(e,i=>Se(i)||B(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Se(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Se(n)&&n.fragment&&Ie(e,B)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",data:Mr(we.CrossRefTokenSyntax)})}checkPackageImport(e,r){si(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",data:Mr(we.UnnecessaryFileExtension)})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,data:Mr(we.UseRegexTokens)})}}checkGrammarForUnusedRules(e,r){let n=hs(e,!0);for(let i of e.rules)Se(i)&&i.hidden||ac(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[du.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Le,i=new Set;for(let l of e.rules)Se(l)&&l.name&&n.add(l.name,l),B(l)&&Qe(l).filter(pt).forEach(f=>i.add(f.value));let o=new Le,s=new Le;for(let l of e.imports){let u=cc(this.documents,l);for(let f of u)for(let m of f.rules)Se(m)&&m.name?o.add(m.name,l):B(m)&&m.name&&Qe(m).filter(pt).forEach(A=>s.add(A.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(s.has(l.name)){let u=s.get(l.name);r("error",`Terminal name clashes with imported keyword from "${u[0].path}".`,{node:l,property:"name"})}let a=new Le;for(let l of i)for(let u of o.get(l))a.add(u,l);for(let[l,u]of a.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let c=new Le;for(let[l,u]of o.entriesGroupedByKey()){let f=s.get(l);f.length>0&&u.filter(m=>!f.includes(m)).forEach(m=>c.add(m,l))}for(let[l,u]of c.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!ac(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",data:Mr(we.RuleNameUppercase)})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&__.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){Ie(e,B)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{Xr(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,data:Mr(we.OptionalUnorderedGroup)})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=Qe(e).filter(is);for(let o of n)i.some(s=>s.parameter.ref===o)||r("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[du.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(ac(e))return;let n=xx(e),i=Fr(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&_e(e.terminal)&&B(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;Qe(e.terminal).map(o=>zt(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=Ro(n.type),o=sc(i),s=!1,a=!1;for(let c of o)ms(c)?s=!0:ms(c)||(a=!0);s&&a&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!ps(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(B(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else Se(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!lc(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross-reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){var n;let i=e.terminal;if(_e(i)){let o=i.rule.ref;B(o)&&!Fr(o)?r("error","Parser rules cannot be used for cross-references.",{node:i,property:"rule"}):B(o)&&!Rx(o)?r("error","Data type rules for cross-references must be of type string.",{node:i,property:"rule"}):Se(o)&&(!((n=o.type)===null||n===void 0)&&n.name)&&o.type.name!=="string"&&r("error","Terminal rules for cross-references must be of type string.",{node:i,property:"rule"})}}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,r){if(Mt(e.type.ref)&&Vr(e.type.ref.type)){let n=vx(e.type.ref.type);n.length>0&&r("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,r){var n,i;B((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){or(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&B(e.ref)&&!Fr(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=Nn(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross-references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&zt(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};function ac(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var __=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function vx(t){let e=[];return t.types.forEach(r=>{var n;or(r)&&(!((n=r.typeRef)===null||n===void 0)&&n.ref?Mt(r.typeRef.ref)&&(Vr(r.typeRef.ref.type)?e.push(...vx(r.typeRef.ref.type)):e.push(r.typeRef.ref.name)):r.stringType?e.push(`"${r.stringType}"`):r.primitiveType&&e.push(r.primitiveType))}),Array.from(new Set(e))}function Xr(t,e){return t==="?"||t==="*"||Ft(e)&&!!e.guardCondition}function bx(t){return t==="*"||t==="+"}function Fr(t){return Ax(t,new Set)}function Ax(t,e){if(e.has(t))return!0;e.add(t);for(let r of Qe(t))if(_e(r)){if(!r.rule.ref||B(r.rule.ref)&&!Ax(r.rule.ref,e))return!1}else{if(Re(r))return!1;if(Ne(r))return!1}return!!t.definition}function xx(t){var e;let r=(e=t.returnType)===null||e===void 0?void 0:e.ref;return t.dataType!==void 0||Mt(r)&&I_(r)}function I_(t){return ph(t.type,new Set)}function ph(t,e){if(e.has(t))return!0;if(e.add(t),ho(t))return!1;if(go(t))return!1;if(Vr(t))return t.types.every(r=>ph(r,e));if(or(t)){if(t.primitiveType!==void 0)return!0;if(t.stringType!==void 0)return!0;if(t.typeRef!==void 0){let r=t.typeRef.ref;return Mt(r)?ph(r.type,e):!1}else return!1}else return!1}function Rx(t){return uc(t,new Set)}function uc(t,e){var r,n;if(e.has(t))return!0;if(e.add(t),B(t)){if(t.dataType)return t.dataType==="string";if(!((r=t.returnType)===null||r===void 0)&&r.ref)return uc(t.returnType.ref,e)}else{if(Mt(t))return uc(t.type,e);if(ho(t))return!1;if(go(t))return!1;if(Vr(t))return t.types.every(i=>uc(i,e));if(or(t)){if(t.primitiveType==="string")return!0;if(t.stringType)return!0;if(!((n=t.typeRef)===null||n===void 0)&&n.ref)return uc(t.typeRef.ref,e)}}return!1}function hh(t){let e=t.$container;if(Ft(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let o=r[i];if(Ne(o))return o;{let s=Qe(r[i]).find(Ne);if(s)return s}}}if(ts(e))return hh(e)}function mn(t){var e;if(B(t))return Fr(t)?t.name:(e=ys(t))!==null&&e!==void 0?e:t.name;if(Ar(t)||Mt(t)||os(t))return t.name;if(Ne(t)){let r=Ts(t);if(r)return r}else if(ns(t))return t.name;throw new ru("Cannot get name of Unknown Type",t.$cstNode)}function Nn(t){if(t)try{return mn(t)}catch{return}}function ys(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(B(e))return e.name;if(Ar(e)||Mt(e))return e.name}}}function Ts(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return mn(t.type.ref)}function bo(t){var e,r,n;return Se(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Fr(t)?t.name:(n=ys(t))!==null&&n!==void 0?n:t.name}function Yr(t){let e={s:!1,i:!1,u:!1},r=vs(t.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(r,n)}var gh=/[\s\S]/.source;function vs(t,e){if(Iv(t))return P_(t);if(Dv(t))return D_(t);if(Xl(t))return M_(t);if(Yl(t)){let r=t.rule.ref;if(!r)throw new Error("Missing rule reference.");return ai(vs(r.definition),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(kv(t))return L_(t);if(Fv(t))return O_(t);if($v(t)){let r=t.regex.lastIndexOf("/"),n=t.regex.substring(1,r),i=t.regex.substring(r+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),ai(n,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}else{if(Uv(t))return ai(gh,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}}function P_(t){return ai(t.elements.map(e=>vs(e)).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function D_(t){return ai(t.elements.map(e=>vs(e)).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function O_(t){return ai(`${gh}*?${vs(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function L_(t){return ai(`(?!${vs(t.terminal)})${gh}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function M_(t){return t.right?ai(`[${dh(t.left)}-${dh(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):ai(dh(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function dh(t){return ii(t.value)}function ai(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function yh(t){if(t.path===void 0||t.path.length===0)return;let e=ve.dirname(ne(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),ve.resolvePath(e,r)}function si(t,e){let r=yh(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(rs(i))return i}}catch{}}function cc(t,e){if(Vl(e)){let r=si(t,e);if(r){let n=mh(t,r);return n.push(r),n}return[]}else return mh(t,e)}function mh(t,e,r=e,n=new Set,i=new Set){let o=ne(e);if(r!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let s of e.imports){let a=si(t,s);a&&mh(t,a,r,n,i)}}return Array.from(i)}function gs(t){return Re(t)?[t]:Pr(t)||Ft(t)||Dr(t)?t.elements.flatMap(e=>gs(e)):_e(t)&&t.rule.ref?gs(t.rule.ref.definition):[]}var F_=["string","number","boolean","Date","bigint"];function ps(t){return F_.includes(t)}var Th=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let o=0;o<r.next.length;o++){let s=n[o],a=r.next[o];a.actionWithAssignment&&i.push({alt:Sx(s),next:[]}),a.name!==void 0&&a.name!==s.name&&(a.actionWithAssignment?(s.properties=[],s.ruleCalls=[],s.super=[e.name],s.name=a.name):(s.super=[s.name,...s.ruleCalls],s.properties=[],s.ruleCalls=[],s.name=a.name)),s.properties.push(...a.properties),s.ruleCalls.push(...a.ruleCalls);let c={alt:s,next:a.children};c.next.length===0?(c.alt.super=c.alt.super.filter(l=>l!==c.alt.name),i.push(c)):i.push(...this.applyNext(e,c))}return $x(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(Sx(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=Ao();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function q_(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(wx)}}function Sx(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>wx(e))}}function wx(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function Cx(t,e,r){let n=[],i={fragments:new Map};for(let c of t)n.push(...kx(i,c));let o=K_(n),s=W_(o),a=V_(o,s,r);for(let c of e){let l=U_(c);a.unions.push({name:c.name,declared:!1,type:l,subTypes:new Set,superTypes:new Set,dataType:c.dataType})}return a}function U_(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=vh(t.definition,r);return e?{primitive:"string"}:n}function vh(t,e){var r,n,i;if(t.cardinality)return e();if(Pr(t))return{types:t.elements.map(o=>vh(o,e))};if(Ft(t)||Dr(t))return t.elements.length!==1?e():vh(t.elements[0],e);if(_e(t)){let o=(r=t.rule)===null||r===void 0?void 0:r.ref;return o?Se(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:Yr(o).toString()}:{value:o.name}:e()}else if(pt(t))return{string:t.value};return e()}function kx(t,e){let r=Ao(e),n=new Th(t,r);return e.definition&&xh(n,n.root,e.definition),n.getTypes()}function Ao(t){return{name:B(t)||Ne(t)?Nn(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function xh(t,e,r){let n=Xr(r.cardinality,r);if(Pr(r)){let i=[];n&&i.push(t.connect(e,Ao()));for(let o of r.elements){let s=t.connect(e,Ao());i.push(xh(t,s,o))}return t.merge(...i)}else if(Ft(r)||Dr(r)){let i=t.connect(e,Ao()),o;n&&(o=t.connect(e,Ao()));for(let s of r.elements)i=xh(t,i,s);return o?t.merge(o,i):i}else{if(Ne(r))return G_(t,e,r);Re(r)?j_(e,r):_e(r)&&H_(t,e,r)}return e}function G_(t,e,r){var n;if(!t.hasLeafNode(e)){let o=q_(e);t.connect(e,o)}let i=t.connect(e,Ao(r));if(r.type){let o=(n=r.type)===null||n===void 0?void 0:n.ref;o&&ec(o)&&(i.name=o.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:So(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function j_(t,e){let r={types:new Set,reference:!1};Ex(e.terminal,r);let n=So(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:Xr(e.cardinality),type:n,astNodes:new Set([e])})}function Ex(t,e){if(Pr(t)||Dr(t)||Ft(t))for(let r of t.elements)Ex(r,e);else if(pt(t))e.types.add(`'${t.value}'`);else if(_e(t)&&t.rule.ref)e.types.add(bo(t.rule.ref));else if(zt(t)&&t.type.ref){let r=Nn(t.type.ref);r&&e.types.add(r),e.reference=!0}}function H_(t,e,r){let n=r.rule.ref;if(B(n)&&n.fragment){let i=B_(n,t.context);Xr(r.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else B(n)&&e.ruleCalls.push(bo(n))}function B_(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=Nn(t),o=kx(e,t).filter(s=>s.alt.name===i);return n.push(...o.flatMap(s=>s.alt.properties)),n}function K_(t){let e=new Map,r=[],n=$x(t).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(s=>{s!==o.name&&o.subTypes.add(s)}))}for(let i of r)for(let o of i.ruleCalls){let s=e.get(o);s&&s.name!==i.name&&s.superTypes.add(i.name)}return Array.from(e.values())}function $x(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Le),r=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],s=new Set,a={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let c of i){let l=c.alt;a.alt.super.push(...l.super),a.next.push(...c.next);let u=l.properties;for(let f of u){let m=o.find(T=>T.name===f.name);m?(m.type=fh(m.type,f.type),f.astNodes.forEach(T=>m.astNodes.add(T))):o.push(Object.assign({},f))}l.ruleCalls.forEach(f=>s.add(f))}for(let c of i){let l=c.alt;if(l.ruleCalls.length===0)for(let u of o)l.properties.find(f=>f.name===u.name)||(u.optional=!0)}a.alt.ruleCalls=Array.from(s),r.push(a)}return r}function W_(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Le;for(let i of t)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let s={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:So(!1,!1,o)};r.push(s)}return r}function V_(t,e,r){let n=new Le;for(let a of t)for(let c of a.superTypes)n.add(c,a.name);let i=new Set(r.interfaces.map(a=>a.name)),o={interfaces:[],unions:e},s=new Map(e.map(a=>[a.name,a]));for(let a of t){let c=new Set(n.get(a.name));if(a.properties.length===0&&c.size>0)if(i.has(a.name))a.abstract=!0,o.interfaces.push(a);else{let l=So(!1,!1,Array.from(c)),u=s.get(a.name);if(u)u.type=fh(u.type,l);else{let f={name:a.name,declared:!1,subTypes:c,superTypes:a.superTypes,type:l};o.unions.push(f),s.set(a.name,f)}}else o.interfaces.push(a)}for(let a of o.interfaces)a.superTypes=new Set([...a.superTypes].filter(c=>!s.has(c)));return o}function So(t,e,r){if(t)return{elementType:So(!1,e,r)};if(e)return{referenceType:So(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:ps(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>So(!1,!1,[n]))}}function Nx(t,e){let r=_x(t,e),n=hx(r.interfaces,r.types),i=Cx(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}function _x(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let o=ne(i);if(!r.has(o.uri)){r.add(o.uri);for(let s of i.rules)B(s)&&!s.fragment&&(Fr(s)?n.datatypeRules.push(s):n.parserRules.push(s));if(i.interfaces.forEach(s=>n.interfaces.push(s)),i.types.forEach(s=>n.types.push(s)),e){let s=i.imports.map(a=>si(e,a)).filter(a=>a!==void 0);_x(s,e,r,n)}}}return n}function Dx(t,e){let{inferred:r,declared:n,astResources:i}=Nx(t,e);return{astResources:i,inferred:Ix(n,r),declared:Ix(r,n)}}function Ix(t,e){var r,n;let i={interfaces:sx(Px(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:Px(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},o=yx(i);return z_(o),o}function Px(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function z_(t){let e=Y_(t),r=Array.from(e.values());J_(r),Q_(t.interfaces),X_(r)}function X_(t){let e=new Set,r=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)r(i),i.typeNames.forEach(o=>n.typeNames.add(o))}};t.forEach(r)}function Y_({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,Rh(i.type,new Set));for(let[i,o]of n)o&&r.delete(i.name);return r}function Rh(t,e){if(e.has(t))return!0;if(e.add(t),Dt(t))return t.types.every(r=>Rh(r,e));if(Or(t)){let r=t.value;return fn(r)?Rh(r.type,e):!1}else return Lr(t)||En(t)}function J_(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function Q_(t){var e;let r=t.reduce((s,a)=>(s.set(a.name,a),s),new Map);for(let s of t){let a=s.properties.flatMap(c=>ax(c.type));for(let c of a)(e=r.get(c))===null||e===void 0||e.containerTypes.add(s)}let n=new Set,i=t.filter(s=>s.subTypes.size===0),o=new Set(i);for(;i.length>0;){let s=i.shift();if(s)for(let a of s.superTypes)pn(a)&&(s.containerTypes.size===0?(n.add(a.name),a.containerTypes.clear()):n.has(a.name)||s.containerTypes.forEach(c=>a.containerTypes.add(c)),o.has(a)||(o.add(a),i.push(a)))}}var Z_={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1},eI={maxLookahead:3},Ox={AstReflection:()=>new Wa},Lx={Grammar:()=>dx(),LanguageMetaData:()=>Z_,parser:{ParserConfig:()=>eI}};var fc=class{constructor(e,r,n){var i;this.elements=e,this.outerScope=r,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}},xs=class{constructor(e,r,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=r}getElement(e){let r=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(r);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=ie(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},Mx={getElement(){},getAllElements(){return es}};var mu=de(Yn(),1);var Rs=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=mu.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=$i,i=mu.CancellationToken.None){let o=[];this.exportNode(e,o,r);for(let s of n(e))await Ze(i),this.exportNode(s,o,r);return o}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=mu.CancellationToken.None){let n=e.parseResult.value,i=new Le;for(let o of Qe(n))await Ze(r),this.processNode(o,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,r))}}};var hu=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},bh=class extends hu{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,r){this.throwIfDisposed(),this.cache.set(e,r)}get(e,r){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(r){let n=r();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},gu=class extends hu{constructor(e){super(),this.cache=new Map,this.converter=e??(r=>r)}has(e,r){return this.throwIfDisposed(),this.cacheForContext(e).has(r)}set(e,r,n){this.throwIfDisposed(),this.cacheForContext(e).set(r,n)}get(e,r,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(r))return i.get(r);if(n){let o=n();return i.set(r,o),o}else return}delete(e,r){return this.throwIfDisposed(),this.cacheForContext(e).delete(r)}clear(e){if(this.throwIfDisposed(),e){let r=this.converter(e);this.cache.delete(r)}else this.cache.clear()}cacheForContext(e){let r=this.converter(e),n=this.cache.get(r);return n||(n=new Map,this.cache.set(r,n)),n}};var yu=class extends bh{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var bs=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new yu(e.shared)}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=ne(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&r.push(ie(a).filter(c=>this.reflection.isSubtype(c.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=r.length-1;s>=0;s--)o=this.createScope(r[s],o);return o}createScope(e,r,n){return new fc(ie(e),r,n)}createScopeForNodes(e,r,n){let i=ie(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new fc(i,r,n)}getGlobalScope(e,r){return this.globalScopeCache.get(e,()=>new xs(this.indexManager.allElements(e)))}};var Tu=class extends bs{constructor(e){super(e),this.langiumDocuments=e.shared.workspace.LangiumDocuments}getScope(e){let r=this.reflection.getReferenceType(e);return r===mo?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=ne(r.container).precomputedScopes,o=Jl(r.container);if(i&&o){let a=i.get(o);a.length>0&&(n=ie(a).filter(c=>c.type===Va||c.type===za))}let s=this.getGlobalScope(e,r);return n?this.createScope(n,s):s}getGlobalScope(e,r){let n=Ie(r.container,rs);if(!n)return Mx;let i=new Set;this.gatherImports(n,i);let o=this.indexManager.allElements(e,i);return e===mo&&(o=o.filter(s=>s.type===Va||s.type===za)),new xs(o)}gatherImports(e,r){for(let n of e.imports){let i=yh(n);if(i&&!r.has(i.toString())&&(r.add(i.toString()),this.langiumDocuments.hasDocument(i))){let s=this.langiumDocuments.getOrCreateDocument(i).parseResult.value;rs(s)&&this.gatherImports(s,r)}}}},vu=class extends Rs{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),B(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(o,o.name,n))}Qe(e).forEach(o=>{if(Ne(o)&&o.inferredType){let s=Ts(o);s&&r.push(this.createInterfaceDescription(o,s,n))}})}}processNode(e,r,n){os(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let o=e.$container;if(o&&B(e)&&!e.returnType&&!e.dataType){let s=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(s,s.name,r))}}processActionNode(e,r,n){let i=Jl(e);if(i&&Ne(e)&&e.inferredType){let o=Ts(e);o&&n.add(i,this.createInterfaceDescription(e,o,r))}}createInterfaceDescription(e,r,n=ne(e)){let i,o=()=>{var s;return i??(i=ir((s=this.nameProvider.getNameNode(e))!==null&&s!==void 0?s:e.$cstNode))};return{node:e,name:r,get nameSegment(){return o()},selectionSegment:ir(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};var qr=de(Ae(),1);var sr=de(Ae(),1);var xu=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r={},n=sr.CancellationToken.None){let i=e.parseResult,o=[];if(await Ze(n),(!r.categories||r.categories.includes("built-in"))&&(this.processLexingErrors(i,o,r),r.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===hn.LexingError})||(this.processParsingErrors(i,o,r),r.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===hn.ParsingError}))||(this.processLinkingErrors(e,o,r),r.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===hn.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,r,n))}catch(s){if(xo(s))throw s;console.error("An error occurred during validation:",s)}return await Ze(n),o}processLexingErrors(e,r,n){for(let i of e.lexerErrors){let o={severity:sr.DiagnosticSeverity.Error,range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Mr(hn.LexingError),source:this.getSource()};r.push(o)}}processParsingErrors(e,r,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset))o=sr.Range.create(0,0,0,0);else{let a=sr.Position.create(s.endLine-1,s.endColumn);o=sr.Range.create(a,a)}}}else o=Ka(i.token);if(o){let s={severity:sr.DiagnosticSeverity.Error,range:o,message:i.message,data:Mr(hn.ParsingError),source:this.getSource()};r.push(s)}}}processLinkingErrors(e,r,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:hn.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};r.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,r,n=sr.CancellationToken.None){let i=[],o=(s,a,c)=>{i.push(this.toDiagnostic(s,a,c))};return await Promise.all(ti(e).map(async s=>{await Ze(n);let a=this.validationRegistry.getChecks(s.$type,r.categories);for(let c of a)await c(s,o,n)})),i}toDiagnostic(e,r,n){return{message:r,range:tI(n),severity:rI(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function tI(t){if(sr.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=Yt(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=zr(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function rI(t){switch(t){case"error":return sr.DiagnosticSeverity.Error;case"warning":return sr.DiagnosticSeverity.Warning;case"info":return sr.DiagnosticSeverity.Information;case"hint":return sr.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}var hn;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(hn=hn||(hn={}));var Ru=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=o=>o&&n.push(o);for(let o of r.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,r,n){var i;switch((i=e.data)===null||i===void 0?void 0:i.code){case we.GrammarNameUppercase:case we.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case we.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case we.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case we.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case we.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case we.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case we.MissingReturns:n(this.fixMissingReturns(e,r));break;case we.InvalidInfers:case we.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case we.MissingInfer:n(this.fixMissingInfer(e,r));break;case we.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case hn.LinkingError:{let o=e.data;o&&o.containerType==="RuleCall"&&o.property==="rule"&&n(this.addNewRule(e,o,r)),o&&this.lookInGlobalScope(e,o,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n&&n.actionSegment){let i=r.textDocument.getText(n.actionSegment.range);return{title:`Correct ${i} usage`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionSegment.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n&&n.actionSegment)return{title:"Correct 'infer' usage",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.actionSegment.range.end,end:n.actionSegment.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){let n=e.data;if(n&&n.actionRange)return{title:"Remove the 'infer' keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionRange,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let o=br(i,n),s=Ie(o?.astNode,Xl);if(s&&s.right&&s.$cstNode){let a=s.left.value,c=s.right.value;return{title:"Refactor into regular expression",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:s.$cstNode.range,newText:`/[${ii(a)}-${ii(c)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,o=[],s=Yt(n.$cstNode,"definesHiddenTokens");if(s){let a=s.range.start,c=s.offset,l=n.$cstNode.text.indexOf(")",c)+1;o.push({newText:"",range:{start:a,end:r.textDocument.positionAt(l)}})}for(let a of i){let c=a.ref;if(c&&Se(c)&&!c.hidden&&c.$cstNode){let l=c.$cstNode.range.start;o.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:o}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let s=br(o,i),a=Ie(s?.astNode,B);if(a&&a.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:a.$cstNode.range.end,end:a.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,o;let s={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},a=this.reflection.getReferenceType(s),c=this.indexManager.allElements(a).filter(m=>m.name===r.refText),l=[],u=-1,f=-1;for(let m of c){if(ve.equals(m.documentUri,n.uri))continue;let T=nI(n.uri,m.documentUri),A,w="",N=n.parseResult.value,C=N.imports.find(v=>v.path&&T<v.path);if(C)A=(i=C.$cstNode)===null||i===void 0?void 0:i.range.start;else if(N.imports.length>0){let v=N.imports[N.imports.length-1].$cstNode.range.end;v&&(A={line:v.line+1,character:0})}else N.rules.length>0&&(A=(o=N.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,w=`
`);A&&((u<0||T.length<f)&&(u=l.length,f=T.length),l.push({title:`Add import to '${T}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:A,end:A},newText:`import '${T}'
${w}`}]}}}))}return u>=0&&(l[u].isPreferred=!0),l}};function nI(t,e){let r=ve.dirname(t),n=ve.relative(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}var Gx=de(so(),1);var ws=de(Ae(),1);function Ah(t,e){let r={stacks:t,tokens:e};return iI(r),r.stacks.flat().forEach(i=>{i.property=void 0}),qx(r.stacks).map(i=>i[i.length-1])}function Sh(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,o=[],s=e.feature;if(n.has(s))return[];n.add(s);let a,c=s;for(;c.$container;)if(Ft(c.$container)){a=c.$container;break}else if(ts(c.$container))c=c.$container;else break;if(bx(c.cardinality)){let l=As({next:{feature:c,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let u of l)i.add(u.feature);o.push(...l)}if(a){let l=a.elements.indexOf(c);l!==void 0&&l<a.elements.length-1&&o.push(...Fx({feature:a,type:e.type,new:!1},l+1,r,n,i)),o.every(u=>Xr(u.feature.cardinality,u.feature)||Xr(r.get(u.feature))||i.has(u.feature))&&o.push(...Sh({next:{feature:a,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return o}function dc(t){return Et(t)&&(t={feature:t}),As({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}function As(t){var e,r,n;let{next:i,cardinalities:o,visited:s,plus:a}=t;if(i===void 0)return[];let{feature:c,type:l}=i;if(Ft(c)){if(s.has(c))return[];s.add(c)}if(Ft(c))return Fx(i,0,o,s,a).map(u=>bu(u,c.cardinality,o));if(Pr(c)||Dr(c))return c.elements.flatMap(u=>As({next:{feature:u,new:!1,type:l},cardinalities:o,visited:s,plus:a})).map(u=>bu(u,c.cardinality,o));if(Re(c)){let u={feature:c.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:c.feature};return As({next:u,cardinalities:o,visited:s,plus:a}).map(f=>bu(f,c.cardinality,o))}else{if(Ne(c))return Sh({next:{feature:c,new:!0,type:mn(c),property:(r=i.property)!==null&&r!==void 0?r:c.feature},cardinalities:o,visited:s,plus:a});if(_e(c)&&B(c.rule.ref)){let u=c.rule.ref,f={feature:u.definition,new:!0,type:u.fragment?void 0:(n=ys(u))!==null&&n!==void 0?n:u.name,property:i.property};return As({next:f,cardinalities:o,visited:s,plus:a}).map(m=>bu(m,c.cardinality,o))}else return[i]}}function bu(t,e,r){return r.set(t.feature,e),t}function Fx(t,e,r,n,i){var o;let s=[],a;for(;e<t.feature.elements.length&&(a={feature:t.feature.elements[e++],new:!1,type:t.type},s.push(...As({next:a,cardinalities:r,visited:n,plus:i})),!!Xr((o=a.feature.cardinality)!==null&&o!==void 0?o:r.get(a.feature),a.feature)););return s}function iI(t){for(let e of t.tokens){let r=qx(t.stacks,e);t.stacks=r}}function qx(t,e){let r=[];for(let n of t)r.push(...oI(n,e));return r}function oI(t,e){let r=new Map,n=new Set(t.map(o=>o.feature).filter(sI)),i=[];for(;t.length>0;){let o=t.pop(),s=Sh({next:o,cardinalities:r,plus:n,visited:new Set}).filter(a=>e?wh(a.feature,e):!0);for(let a of s)i.push([...t,a]);if(!s.every(a=>Xr(a.feature.cardinality,a.feature)||Xr(r.get(a.feature))))break}return i}function sI(t){if(t.cardinality==="+")return!0;let e=Ie(t,Re);return!!(e&&e.cardinality==="+")}function wh(t,e){if(pt(t))return t.value===e.image;if(_e(t))return aI(t.rule.ref,e);if(zt(t)){let r=Au(t);if(r)return wh(r,e)}return!1}function aI(t,e){return B(t)?dc(t.definition).some(n=>wh(n.feature,e)):Se(t)?Yr(t).test(e.image):!1}function Ux(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}var Ss=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let n=[],i=this.buildContexts(e,r.position),o=(c,l)=>{let u=this.fillCompletionItem(c,l);u&&n.push(u)},s=c=>pt(c.feature)?c.feature.value:c.feature,a=[];for(let c of i)if(await Promise.all(ie(c.features).distinct(s).exclude(a).map(l=>this.completionFor(c,l,o))),a.push(...c.features),!this.continueCompletion(n))break;return ws.CompletionList.create(this.deduplicateItems(n),!0)}deduplicateItems(e){return ie(e).distinct(r=>`${r.kind}_${r.label}_${r.detail}`).toArray()}findFeaturesAt(e,r){let n=e.getText({start:ws.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let c=Su(this.grammar),l=dc({feature:c.definition,new:!0,type:ys(c)});return o.length>0?(o.shift(),Ah(l.map(u=>[u]),o)):l}let s=[...o].splice(i.tokenIndex);return Ah([i.elementStack.map(c=>({feature:c}))],s)}*buildContexts(e,r){var n,i,o,s,a;let c=e.parseResult.value.$cstNode;if(!c)return;let l=e.textDocument,u=l.getText(),f=l.offsetAt(r),m={document:e,textDocument:l,offset:f,position:r},T=this.findDataTypeRuleStart(c,f);if(T){let[y,$]=T,D=(n=br(c,y))===null||n===void 0?void 0:n.astNode,X=this.findFeaturesAt(l,y);yield Object.assign(Object.assign({},m),{node:D,tokenOffset:y,tokenEndOffset:$,features:X})}let{nextTokenStart:A,nextTokenEnd:w,previousTokenStart:N,previousTokenEnd:C}=this.backtrackToAnyToken(u,f),v;if(N!==void 0&&C!==void 0&&C===f){v=(i=br(c,N))===null||i===void 0?void 0:i.astNode;let y=this.findFeaturesAt(l,N);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:N,tokenEndOffset:C,features:y})}if(v=(s=(o=br(c,A))===null||o===void 0?void 0:o.astNode)!==null&&s!==void 0?s:N===void 0||(a=br(c,N))===null||a===void 0?void 0:a.astNode,v){let y=this.findFeaturesAt(l,A);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:A,tokenEndOffset:w,features:y})}else{let y=Su(this.grammar),$=dc(y.definition);yield Object.assign(Object.assign({},m),{tokenOffset:A,tokenEndOffset:w,features:$})}}findDataTypeRuleStart(e,r){var n,i;let o=Pt(e,r,this.grammarConfig.nameRegexp),s=!!(!((n=Ie(o?.grammarSource,B))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=Ie(o?.grammarSource,B))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,r){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:r,nextTokenEnd:r};let i;for(let o of n){if(o.startOffset>=r)return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=r)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}async completionForRule(e,r,n){if(B(r)){let i=dc(r.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,r,n){if(pt(r.feature))return this.completionForKeyword(e,r.feature,n);if(zt(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=Ie(r.feature,Re),o=e.node;if(i&&o){if(r.type&&(r.new||o.$type!==r.type)&&(o={$type:r.type,$container:o,$containerProperty:r.property}),!e)return;let s={reference:{},container:o,property:i.feature};try{let a=this.scopeProvider.getScope(s),c=new Set;a.getAllElements().forEach(l=>{!c.has(l.name)&&this.filterCrossReference(l)&&(n(e,this.createReferenceCompletionItem(l)),c.add(l.name))})}catch(a){console.error(a)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:this.nodeKindProvider.getCompletionItemKind(e),detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n(e,{label:r.value,kind:ws.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r){var n,i;let o;if(typeof r.label=="string")o=r.label;else if("node"in r){let l=this.nameProvider.getName(r.node);if(!l)return;o=l}else if("nodeDescription"in r)o=r.nodeDescription.name;else return;let s;typeof((n=r.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=r.textEdit.newText:typeof r.insertText=="string"?s=r.insertText:s=o;let a=(i=r.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:r.additionalTextEdits,command:r.command,commitCharacters:r.commitCharacters,data:r.data,detail:r.detail,documentation:r.documentation,filterText:r.filterText,insertText:r.insertText,insertTextFormat:r.insertTextFormat,insertTextMode:r.insertTextMode,kind:r.kind,labelDetails:r.labelDetails,preselect:r.preselect,sortText:r.sortText,tags:r.tags,textEditText:r.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,r,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,r)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var wu=class extends Ss{constructor(e){super(e),this.documents=()=>e.shared.workspace.LangiumDocuments}completionFor(e,r,n){let i=Ie(r.feature,Re);if(i?.feature==="path")this.completeImportPath(e,n);else return super.completionFor(e,r,n)}completeImportPath(e,r){let i=e.textDocument.getText().substring(e.tokenOffset,e.offset),o=this.getAllFiles(e.document),s={start:e.position,end:e.position};if(i.length>0){let a=i.substring(1);o=o.filter(u=>u.startsWith(a));let c=e.textDocument.positionAt(e.tokenOffset+1),l=e.textDocument.positionAt(e.tokenEndOffset-1);s={start:c,end:l}}for(let a of o){let c=i.length>0?"":'"',l=`${c}${a}${c}`;r(e,{label:a,textEdit:{newText:l,range:s},kind:Gx.CompletionItemKind.File,sortText:"0"})}}getAllFiles(e){let r=this.documents().all,n=e.uri.toString(),i=ve.dirname(e.uri).toString(),o=[];for(let s of r)if(!ve.equals(s.uri,n)){let a=s.uri.toString(),c=a.substring(0,a.length-ve.extname(s.uri).length),l=ve.relative(i,c);l.startsWith(".")||(l=`./${l}`),o.push(l)}return o}};var pc=de(Ae(),1);var Cs=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=Qe(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,r),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let o of VT(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,pc.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,r,n){let i=r.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(r,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),pc.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,r){if(r===pc.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var Cu=class extends Cs{shouldProcessContent(e){return!B(e)}};var ku=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Ch(e,this.collector)}formatDocument(e,r){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,r.options):[]}isFormatRangeErrorFree(e,r){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(o=>{var s;return(s=o.line)!==null&&s!==void 0?s:Number.MAX_VALUE}),...n.parserErrors.map(o=>{var s;return(s=o.token.startLine)!==null&&s!==void 0?s:Number.MAX_VALUE}))>r.end.line:!0}formatDocumentRange(e,r){return this.isFormatRangeErrorFree(e,r.range)?this.doDocumentFormat(e,r.options,r.range):[]}formatDocumentOnType(e,r){let n={start:{character:0,line:r.position.line},end:r.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,r.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,o=(a,c,l)=>{var u,f;let m=this.nodeModeToKey(a,c),T=i.get(m),A=(u=l.options.priority)!==null&&u!==void 0?u:0,w=(f=T?.options.priority)!==null&&f!==void 0?f:0;(!T||w<=A)&&i.set(m,l)};this.collector=o,this.iterateAstFormatting(e,n);let s=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,s)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let o=n[n.length-1];if(o){let s=e.offsetAt(i.range.start),a=e.offsetAt(o.range.end);s<a&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=Qe(n).iterator(),o;do if(o=i.next(),!o.done){let s=o.value;this.insideRange(s.$cstNode.range,r)?this.format(s):i.prune()}while(!o.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let o={indentation:0,options:n,document:e.textDocument},s=[],c=this.iterateCstTree(e,o).iterator(),l,u;do if(u=c.next(),!u.done){let f=u.value,m=fo(f),T=this.nodeModeToKey(f,"prepend"),A=r.get(T);if(r.delete(T),A){let C=this.createTextEdit(l,f,A,o);for(let v of C)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}let w=this.nodeModeToKey(f,"append"),N=r.get(w);if(r.delete(w),N){let C=YT(f);if(C){let v=this.createTextEdit(f,C,N,o);for(let y of v)y&&this.insideRange(y.range,i)&&this.isNecessary(y,e.textDocument)&&s.push(y)}}if(!A&&f.hidden){let C=this.createHiddenTextEdits(l,f,void 0,o);for(let v of C)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}m&&(l=f)}while(!u.done);return s}createHiddenTextEdits(e,r,n,i){var o;let s=r.range.start.line;if(e&&e.range.end.line===s)return[];let a=[],c={start:{character:0,line:s},end:r.range.start},l=i.document.getText(c),u=this.findFittingMove(c,(o=n?.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(l,i),T=this.getIndentationCharacterCount(i,u)-f;if(T===0)return[];let A="";T>0&&(A=(i.options.insertSpaces?" ":"	").repeat(T));let w=r.text.split(`
`);w[0]=l+w[0];for(let N=0;N<w.length;N++){let C=s+N,v={character:0,line:C};if(T>0)a.push({newText:A,range:{start:v,end:v}});else{let y=w[N],$=0;for(;$<y.length;$++){let D=y.charAt($);if(D!==" "&&D!=="	")break}a.push({newText:"",range:{start:v,end:{line:C,character:Math.min($,Math.abs(T))}}})}}return a}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var o;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let s={start:(o=e?.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:r.range.start},a=this.findFittingMove(s,n.moves,i);if(!a)return[];let c=a.characters,l=a.lines,u=a.tabs,f=i.indentation;i.indentation+=u??0;let m=[];return c!==void 0?m.push(this.createSpaceTextEdit(s,c,n.options)):l!==void 0?m.push(this.createLineTextEdit(s,l,i,n.options)):u!==void 0&&m.push(this.createTabTextEdit(s,!!e,i)),fo(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;r=this.fitIntoOptions(r,o,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let o=e.end.line-e.start.line;r=this.fitIntoOptions(r,o,i);let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${a}`,range:e}}createTabTextEdit(e,r,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),s=r?1:0,a=Math.max(e.end.line-e.start.line,s);return{newText:`${`
`.repeat(a)}${o}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let o of r){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new Wr(i,o=>this.iterateCst(o,r)):es}iterateCst(e,r){if(!kn(e))return es;let n=r.indentation;return new Ir(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(r.indentation=n,mr))}},Ch=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new gn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new gn(r,this.collector)}property(e,r){let n=Yt(this.astNode.$cstNode,e,r);return new gn(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=Ni(this.astNode.$cstNode,n);r.push(...i)}return new gn(r,this.collector)}keyword(e,r){let n=zr(this.astNode.$cstNode,e,r);return new gn(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=Eu(this.astNode.$cstNode,n);r.push(...i)}return new gn(r,this.collector)}cst(e){return new gn([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new gn([],this.collector);let o=n[0],s=i[0];if(o.offset>s.offset){let a=o;o=s,s=a}return new gn(JT(o,s),this.collector)}},gn=class t{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new t(this.nodes.slice(e,r),this.collector)}},ge;(function(t){function e(...u){return{options:{},moves:u.flatMap(f=>f.moves).sort(l)}}t.fit=e;function r(u){return i(0,u)}t.noSpace=r;function n(u){return i(1,u)}t.oneSpace=n;function i(u,f){return{options:f??{},moves:[{characters:u}]}}t.spaces=i;function o(u){return s(1,u)}t.newLine=o;function s(u,f){return{options:f??{},moves:[{lines:u}]}}t.newLines=s;function a(u){return{options:u??{},moves:[{tabs:1,lines:1}]}}t.indent=a;function c(u){return{options:u??{},moves:[{tabs:0}]}}t.noIndent=c;function l(u,f){var m,T,A,w,N,C;let v=(m=u.lines)!==null&&m!==void 0?m:0,y=(T=f.lines)!==null&&T!==void 0?T:0,$=(A=u.tabs)!==null&&A!==void 0?A:0,D=(w=f.tabs)!==null&&w!==void 0?w:0,X=(N=u.characters)!==null&&N!==void 0?N:0,ye=(C=f.characters)!==null&&C!==void 0?C:0;return v<y?-1:v>y?1:$<D?-1:$>D?1:X<ye?-1:X>ye?1:0}})(ge=ge||(ge={}));var $u=class extends ku{format(e){if(zt(e))this.getNodeFormatter(e).properties("type","terminal").surround(ge.noSpace());else if(B(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(ge.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(ge.oneSpace()):r.property("name").append(ge.noSpace()),r.properties("parameters").append(ge.noSpace()),r.keywords(",").append(ge.oneSpace()),r.keywords("<").append(ge.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(ge.noSpace()),r.interior(i,n).prepend(ge.indent()),n.prepend(ge.fit(ge.noSpace(),ge.newLine())),r.node(e).prepend(ge.noIndent())}else if(Se(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(ge.oneSpace()),r.keyword("returns").append(ge.oneSpace())),r.keywords("hidden","terminal","fragment").append(ge.oneSpace()),r.keyword(":").prepend(ge.noSpace()),r.keyword(";").prepend(ge.fit(ge.noSpace(),ge.newLine())),r.node(e).prepend(ge.noIndent())}else if(Ne(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(ge.noSpace()),r.keywords(".","+=","=").surround(ge.noSpace()),r.keyword("}").prepend(ge.noSpace())}else if(ns(e))this.getNodeFormatter(e).keywords("infer","infers").append(ge.oneSpace());else if(Re(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(ge.noSpace());else if(_e(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(ge.noSpace()),r.keyword(",").append(ge.oneSpace()),r.properties("arguments").append(ge.noSpace())}ts(e)&&this.getNodeFormatter(e).property("cardinality").prepend(ge.noSpace())}};var ci=de(Ae(),1);var oe=de(Ae(),1);var $h={[oe.SemanticTokenTypes.class]:0,[oe.SemanticTokenTypes.comment]:1,[oe.SemanticTokenTypes.enum]:2,[oe.SemanticTokenTypes.enumMember]:3,[oe.SemanticTokenTypes.event]:4,[oe.SemanticTokenTypes.function]:5,[oe.SemanticTokenTypes.interface]:6,[oe.SemanticTokenTypes.keyword]:7,[oe.SemanticTokenTypes.macro]:8,[oe.SemanticTokenTypes.method]:9,[oe.SemanticTokenTypes.modifier]:10,[oe.SemanticTokenTypes.namespace]:11,[oe.SemanticTokenTypes.number]:12,[oe.SemanticTokenTypes.operator]:13,[oe.SemanticTokenTypes.parameter]:14,[oe.SemanticTokenTypes.property]:15,[oe.SemanticTokenTypes.regexp]:16,[oe.SemanticTokenTypes.string]:17,[oe.SemanticTokenTypes.struct]:18,[oe.SemanticTokenTypes.type]:19,[oe.SemanticTokenTypes.typeParameter]:20,[oe.SemanticTokenTypes.variable]:21},jx={[oe.SemanticTokenModifiers.abstract]:1,[oe.SemanticTokenModifiers.async]:2,[oe.SemanticTokenModifiers.declaration]:4,[oe.SemanticTokenModifiers.defaultLibrary]:8,[oe.SemanticTokenModifiers.definition]:16,[oe.SemanticTokenModifiers.deprecated]:32,[oe.SemanticTokenModifiers.documentation]:64,[oe.SemanticTokenModifiers.modification]:128,[oe.SemanticTokenModifiers.readonly]:256,[oe.SemanticTokenModifiers.static]:512},Hx={legend:{tokenTypes:Object.keys($h),tokenModifiers:Object.keys(jx)},full:{delta:!0},range:!0},Eh=class extends oe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,o){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}},Nu=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=oe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Eh;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,o=ti(i,{range:this.currentRange}).iterator(),s;do if(s=o.next(),!s.done){await Ze(n);let a=s.value;this.highlightElement(a,r)==="prune"&&o.prune()}while(!s.done)}highlightToken(e){var r;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!Kl(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let s=$h[i],a=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let u of o){let f=jx[u];a|=f}}let c=n.start.line,l=n.end.line;if(c===l){let u=n.start.character,f=n.end.character-u;this.currentTokensBuilder.push(c,u,f,s,a)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let u=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(c,u,m-f,s,a)}else{let u=n.start,f=this.currentDocument.textDocument.offsetAt({line:c+1,character:0});this.currentTokensBuilder.push(u.line,u.character,f-u.character-1,s,a);for(let m=c+1;m<l;m++){let T=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-T-1,s,a)}this.currentTokensBuilder.push(l,0,n.end.character,s,a)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let o=Yt(e.node.$cstNode,e.property,e.index);o&&r.push(o)}else r.push(...Ni(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of r)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:o,modifier:s}=e,a=[];if(typeof o=="number"){let c=zr(r.$cstNode,n,o);c&&a.push(c)}else a.push(...Eu(r.$cstNode,n));for(let c of a)this.highlightNode({node:c,type:i,modifier:s})}highlightNode(e){let{node:r,type:n,modifier:i}=e,o=r.range;this.highlightToken({range:o,type:n,modifier:i})}},kh;(function(t){function e(n,i){let o=new Map;Object.entries($h).forEach(([c,l])=>o.set(l,c));let s=0,a=0;return r(n.data,5).map(c=>{s+=c[0],c[0]!==0&&(a=0),a+=c[1];let l=c[2];return{offset:i.textDocument.offsetAt({line:s,character:a}),tokenType:o.get(c[3]),tokenModifiers:c[4],text:i.textDocument.getText({start:{line:s,character:a},end:{line:s,character:a+l}})}})}t.decode=e;function r(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(kh=kh||(kh={}));var _u=class extends Nu{highlightElement(e,r){var n;Re(e)?r({node:e,property:"feature",type:ci.SemanticTokenTypes.property}):Ne(e)?e.feature&&r({node:e,property:"feature",type:ci.SemanticTokenTypes.property}):os(e)?r({node:e,property:"name",type:ci.SemanticTokenTypes.type}):or(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:ci.SemanticTokenTypes.type}):pv(e)?r({node:e,property:"name",type:ci.SemanticTokenTypes.parameter}):is(e)?r({node:e,property:"parameter",type:ci.SemanticTokenTypes.parameter}):_e(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:ci.SemanticTokenTypes.type}):zl(e)&&r({node:e,property:"name",type:ci.SemanticTokenTypes.property})}};var Iu=class extends us{getName(e){return Re(e)?e.feature:super.getName(e)}getNameNode(e){return Re(e)?Yt(e.$cstNode,"feature"):super.getNameNode(e)}};var ks=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=Es(e),n=e.astNode;if(r&&n){let i=n[r.feature];if(Qn(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(Qn(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||zT(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){let n=[];if(r.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return r.documentUri&&(i=i.filter(o=>ve.equals(o.sourceUri,r.documentUri))),n.push(...i),ie(n)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=ne(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:ir(r),local:!0}}}};var Pu=class extends ks{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.astNode,n=Es(e);if(n&&n.feature==="feature"){if(Re(r))return this.findAssignmentDeclaration(r);if(Ne(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findReferences(e,r){var n;return zl(e)?this.findReferencesToTypeAttribute(e,(n=r.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,r)}findReferencesToTypeAttribute(e,r){let n=[],i=Ie(e,Ar);if(i){if(r){let a=this.getReferenceToSelf(e);a&&n.push(a)}let o=Zm(i,this,this.documents,this.nodeLocator),s=[];o.forEach(a=>{let c=this.findRulesWithReturnType(a);s.push(...c)}),s.forEach(a=>{let c=this.createReferencesToAttribute(a,e);n.push(...c)})}return ie(n)}createReferencesToAttribute(e,r){let n=[];if(B(e)){let i=gs(e.definition).find(o=>o.feature===r.name);if(i?.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:ne(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:ir(o),local:ve.equals(ne(i).uri,ne(r).uri)})}}else{if(e.feature===r.name){let o=Yt(e.$cstNode,"feature");o&&n.push({sourceUri:ne(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:ir(o),local:ve.equals(ne(e).uri,ne(r).uri)})}let i=Ie(e,B);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=Ie(e,B),i=hh(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&(Ar(n.returnType.ref)||Mt(n.returnType.ref))){let o=Za(n.returnType.ref);for(let s of o){let a=s.attributes.find(c=>c.name===e.feature);if(a)return a}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,o=Za(e.type.ref);for(let s of o){let a=s.attributes.find(c=>c.name===i);if(a)return a}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),s=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);(B(s)||Ne(s))&&r.push(s)}),r}};var mc=de(Ae(),1);var Bx=de(Ae(),1);var Du=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=Pt(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.astNode,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:Bx.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(Jt.parse(e.item.uri)),n=r.parseResult.value,i=Pt(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.astNode,{includeDeclaration:!1});return this.getIncomingCalls(i.astNode,o)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(Jt.parse(e.item.uri)),n=r.parseResult.value,i=Pt(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.astNode)}};var Kx=de(Ae(),1);var $s=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=Pt(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[Kx.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.astNode){let n=ne(r.astNode);if(r&&n)return{source:e,target:r,targetDocument:n}}}};var Wx=de(Ae(),1);var Ou=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=Pt(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let s=ve.equals(ne(o).uri,e.uri),a={documentUri:e.uri,includeDeclaration:s};return this.references.findReferences(o,a).map(l=>this.createDocumentHighlight(l)).toArray()}}createDocumentHighlight(e){return Wx.DocumentHighlight.create(e.segment.range)}};var Lu=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let o=this.nameProvider.getName(r);return[{kind:this.nodeKindProvider.getSymbolKind(r),name:o??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of $i(r)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var Vx=de(Ae(),1),Mu=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=Vx.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};var Fu=class{match(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,o=0,s=r.length;for(let a=0;a<s;a++){let c=r.charCodeAt(a),l=e.charCodeAt(o);if((c===l||this.toUpperCharCode(c)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,c)),n&&o++,o===e.length))return!0;i=c}return!1}isWordTransition(e,r){return zx<=e&&e<=Xx&&cI<=r&&r<=lI||e===Yx&&r!==Yx}toUpperCharCode(e){return zx<=e&&e<=Xx?e-32:e}},zx="a".charCodeAt(0),Xx="z".charCodeAt(0),cI="A".charCodeAt(0),lI="Z".charCodeAt(0),Yx="_".charCodeAt(0);var Nh=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(r.position),a=Pt(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let c=this.references.findDeclaration(a);if(c)return this.getAstNodeHoverContent(c)}}}},qu=class extends Nh{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};var uI=de(Ae(),1);var fI=de(Ae(),1);var Jr=de(Ae(),1);var je;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(je=je||(je={}));var Uu=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??Jt.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let o;if(n)o={parseResult:e,uri:r,state:je.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(r,i);o={parseResult:e,uri:r,state:je.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=Qo.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}},Gu=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return ie(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=je.Changed,n.precomputedScopes=void 0,n.references=[],n.diagnostics=void 0),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=je.Changed,this.documentMap.delete(r)),n}};var dI=de(Ae(),1);function Jx(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}var ju=class{constructor(e){this.onInitializeEmitter=new Jr.Emitter,this.onInitializedEmitter=new Jr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){Wl(this.services),this.services.ServiceRegistry.all.forEach(e=>Wl(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(S=>S.lsp.Formatter),o=n.map(S=>{var U;return(U=S.lsp.Formatter)===null||U===void 0?void 0:U.formatOnTypeOptions}).find(S=>!!S),s=this.hasService(S=>S.lsp.CodeActionProvider),a=this.hasService(S=>S.lsp.SemanticTokenProvider),c=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.hasService(S=>S.lsp.DocumentLinkProvider),u=Jx(n.map(S=>{var U;return(U=S.lsp.SignatureHelp)===null||U===void 0?void 0:U.signatureHelpOptions})),f=this.hasService(S=>S.lsp.TypeProvider),m=this.hasService(S=>S.lsp.ImplementationProvider),T=this.hasService(S=>S.lsp.CompletionProvider),A=Ux(n.map(S=>{var U;return(U=S.lsp.CompletionProvider)===null||U===void 0?void 0:U.completionOptions})),w=this.hasService(S=>S.lsp.ReferencesProvider),N=this.hasService(S=>S.lsp.DocumentSymbolProvider),C=this.hasService(S=>S.lsp.DefinitionProvider),v=this.hasService(S=>S.lsp.DocumentHighlightProvider),y=this.hasService(S=>S.lsp.FoldingRangeProvider),$=this.hasService(S=>S.lsp.HoverProvider),D=this.hasService(S=>S.lsp.RenameProvider),X=this.hasService(S=>S.lsp.CallHierarchyProvider),ye=this.hasService(S=>S.lsp.CodeLensProvider),Ee=this.hasService(S=>S.lsp.DeclarationProvider),Ht=this.hasService(S=>S.lsp.InlayHintProvider),xt=this.services.lsp.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:c&&{commands:c},textDocumentSync:Jr.TextDocumentSyncKind.Incremental,completionProvider:T?A:void 0,referencesProvider:w,documentSymbolProvider:N,definitionProvider:C,typeDefinitionProvider:f,documentHighlightProvider:v,codeActionProvider:s,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:y,hoverProvider:$,renameProvider:D?{prepareProvider:!0}:void 0,semanticTokensProvider:a?Hx:void 0,signatureHelpProvider:u,implementationProvider:m,callHierarchyProvider:X?{}:void 0,documentLinkProvider:l?{resolveProvider:!1}:void 0,codeLensProvider:ye?{resolveProvider:!1}:void 0,declarationProvider:Ee,inlayHintProvider:Ht?{resolveProvider:!1}:void 0,workspaceSymbolProvider:xt?{resolveProvider:!!xt.resolveSymbol}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};function Zx(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");pI(e,t),mI(e,t),hI(e,t),gI(e,t),TI(e,t),vI(e,t),xI(e,t),RI(e,t),AI(e,t),wI(e,t),CI(e,t),yI(e,t),kI(e,t),SI(e,t),EI(e,t),$I(e,t),_I(e,t),PI(e,t),LI(e,t),DI(e,t),II(e,t),NI(e,t),bI(e,t),OI(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}function pI(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(s,a){n.lock(c=>r.update(s,a,c))}e.workspace.TextDocuments.onDidChangeContent(s=>{i([Jt.parse(s.document.uri)],[])}),t.onDidChangeWatchedFiles(s=>{let a=[],c=[];for(let l of s.changes){let u=Jt.parse(l.uri);l.type===Jr.FileChangeType.Deleted?c.push(u):a.push(u)}i(a,c)})}function mI(t,e){e.workspace.DocumentBuilder.onBuildPhase(je.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&t.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}function hI(t,e){t.onCompletion(ar((r,n,i,o)=>{var s;return(s=r.lsp.CompletionProvider)===null||s===void 0?void 0:s.getCompletion(n,i,o)},e))}function gI(t,e){t.onReferences(ar((r,n,i,o)=>{var s;return(s=r.lsp.ReferencesProvider)===null||s===void 0?void 0:s.findReferences(n,i,o)},e))}function yI(t,e){t.onCodeAction(ar((r,n,i,o)=>{var s;return(s=r.lsp.CodeActionProvider)===null||s===void 0?void 0:s.getCodeActions(n,i,o)},e))}function TI(t,e){t.onDocumentSymbol(ar((r,n,i,o)=>{var s;return(s=r.lsp.DocumentSymbolProvider)===null||s===void 0?void 0:s.getSymbols(n,i,o)},e))}function vI(t,e){t.onDefinition(ar((r,n,i,o)=>{var s;return(s=r.lsp.DefinitionProvider)===null||s===void 0?void 0:s.getDefinition(n,i,o)},e))}function xI(t,e){t.onTypeDefinition(ar((r,n,i,o)=>{var s;return(s=r.lsp.TypeProvider)===null||s===void 0?void 0:s.getTypeDefinition(n,i,o)},e))}function RI(t,e){t.onImplementation(ar((r,n,i,o)=>{var s;return(s=r.lsp.ImplementationProvider)===null||s===void 0?void 0:s.getImplementation(n,i,o)},e))}function bI(t,e){t.onDeclaration(ar((r,n,i,o)=>{var s;return(s=r.lsp.DeclarationProvider)===null||s===void 0?void 0:s.getDeclaration(n,i,o)},e))}function AI(t,e){t.onDocumentHighlight(ar((r,n,i,o)=>{var s;return(s=r.lsp.DocumentHighlightProvider)===null||s===void 0?void 0:s.getDocumentHighlight(n,i,o)},e))}function SI(t,e){t.onHover(ar((r,n,i,o)=>{var s;return(s=r.lsp.HoverProvider)===null||s===void 0?void 0:s.getHoverContent(n,i,o)},e))}function wI(t,e){t.onFoldingRanges(ar((r,n,i,o)=>{var s;return(s=r.lsp.FoldingRangeProvider)===null||s===void 0?void 0:s.getFoldingRanges(n,i,o)},e))}function CI(t,e){t.onDocumentFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocument(n,i,o)},e)),t.onDocumentRangeFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentRange(n,i,o)},e)),t.onDocumentOnTypeFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentOnType(n,i,o)},e))}function kI(t,e){t.onRenameRequest(ar((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.rename(n,i,o)},e)),t.onPrepareRename(ar((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.prepareRename(n,i,o)},e))}function EI(t,e){t.languages.inlayHint.on(Pi((r,n,i,o)=>{var s;return(s=r.lsp.InlayHintProvider)===null||s===void 0?void 0:s.getInlayHints(n,i,o)},e))}function $I(t,e){let r={data:[]};t.languages.semanticTokens.on(Pi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):r,e)),t.languages.semanticTokens.onDelta(Pi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):r,e)),t.languages.semanticTokens.onRange(Pi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):r,e))}function NI(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}function _I(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var o;try{return await r.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return Ns(s)}})}function II(t,e){t.onDocumentLinks(Pi((r,n,i,o)=>{var s;return(s=r.lsp.DocumentLinkProvider)===null||s===void 0?void 0:s.getDocumentLinks(n,i,o)},e))}function PI(t,e){t.onSignatureHelp(Pi((r,n,i,o)=>{var s;return(s=r.lsp.SignatureHelp)===null||s===void 0?void 0:s.provideSignatureHelp(n,i,o)},e))}function DI(t,e){t.onCodeLens(Pi((r,n,i,o)=>{var s;return(s=r.lsp.CodeLensProvider)===null||s===void 0?void 0:s.provideCodeLens(n,i,o)},e))}function OI(t,e){var r;let n=e.lsp.WorkspaceSymbolProvider;if(n){t.onWorkspaceSymbol(async(o,s)=>{try{return await n.getSymbols(o,s)}catch(a){return Ns(a)}});let i=(r=n.resolveSymbol)===null||r===void 0?void 0:r.bind(n);i&&t.onWorkspaceSymbolResolve(async(o,s)=>{try{return await i(o,s)}catch(a){return Ns(a)}})}}function LI(t,e){t.languages.callHierarchy.onPrepare(Pi((r,n,i,o)=>{var s;return r.lsp.CallHierarchyProvider&&(s=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&s!==void 0?s:null},e)),t.languages.callHierarchy.onIncomingCalls(Qx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onOutgoingCalls(Qx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}function Qx(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let o=Jt.parse(n.item.uri),s=r.getServices(o);if(!s){let a=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(a),new Error(a)}try{return await t(s,n,i)}catch(a){return Ns(a)}}}function Pi(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Jt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)throw console.error(`Could not find service instance for uri: '${s.toString()}'`),new Error;let c=r.getOrCreateDocument(s);if(!c)throw new Error;try{return await t(a,c,i,o)}catch(l){return Ns(l)}}}function ar(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Jt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)return console.error(`Could not find service instance for uri: '${s.toString()}'`),null;let c=r.getOrCreateDocument(s);if(!c)return null;try{return await t(a,c,i,o)}catch(l){return Ns(l)}}}function Ns(t){if(xo(t))return new Jr.ResponseError(Jr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Jr.ResponseError)return t;throw t}var Bu=de(Ae(),1),Hu=class{getSymbolKind(){return Bu.SymbolKind.Field}getCompletionItemKind(){return Bu.CompletionItemKind.Reference}};var eR=de(Ae(),1);var Ku=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=Pt(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(eR.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};var tR=de(Ae(),1);var Wu=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(r.position),s=Pt(i,o,this.grammarConfig.nameRegexp);if(!s)return;let a=this.references.findDeclaration(s);if(!a)return;let c={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,c).forEach(u=>{let f=tR.TextEdit.replace(u.segment.range,r.newName),m=u.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let o=Pt(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&ec(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var MI=de(Ae(),1);var rR=de(Ae(),1);var Vu=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,r=rR.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await Ze(r),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let r=e.nameSegment;if(r)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:r.range,uri:e.documentUri.toString()}}}};var zu=class extends $s{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,o,s,a,c;let l="path";if(Vl(e.astNode)&&((n=Es(e))===null||n===void 0?void 0:n.feature)===l){let u=si(this.documents,e.astNode);if(u?.$document){let f=(i=this.findTargetObject(u))!==null&&i!==void 0?i:u,m=(s=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&s!==void 0?s:mc.Range.create(0,0,0,0),T=(c=(a=f.$cstNode)===null||a===void 0?void 0:a.range)!==null&&c!==void 0?c:mc.Range.create(0,0,0,0);return[mc.LocationLink.create(u.$document.uri.toString(),T,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:$i(e).head()}};var _h=de(Ae(),1);var Xu=class extends Du{getIncomingCalls(e,r){if(!B(e))return;let n=new Map;if(r.forEach(i=>{let s=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!s.$cstNode)return;let a=br(s.$cstNode,i.segment.offset);if(!a)return;let c=Ie(a.astNode,B);if(!c||!c.$cstNode)return;let l=this.nameProvider.getNameNode(c);if(!l)return;let u=i.sourceUri.toString(),f=u+"@"+l.text;n.has(f)?n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,a],docUri:u}):n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[a],docUri:u})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:_h.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!B(e))return;let r=Qe(e).filter(_e).toArray(),n=new Map;if(r.forEach(i=>{var o;let s=i.$cstNode;if(!s)return;let a=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!a)return;let c=this.nameProvider.getNameNode(a.astNode);if(!c)return;let l=ne(a.astNode).uri.toString(),u=l+"@"+c.text;n.has(u)?n.set(u,{refCstNode:a,to:c,from:[...n.get(u).from,s.range],docUri:l}):n.set(u,{refCstNode:a,to:c,from:[s.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:_h.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};var Yu=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=Dx(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,o=FI(e);for(let a of ou(r))i.set(a.name,{inferred:a,inferredNodes:o.get(a.name)});let s=ie(e.interfaces).concat(e.types).reduce((a,c)=>a.set(c.name,c),new Map);for(let a of ou(n)){let c=s.get(a.name);if(c){let l=i.get(a.name);i.set(a.name,Object.assign(Object.assign({},l??{}),{declared:a,declaredNode:c}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=eh(e,r),o=new Map(i.map(s=>[s.name,s]));for(let s of eh(e,r))n.set(s.name,this.addSuperProperties(s,o,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let s=r.get(o.name);s&&i.push(...this.addSuperProperties(s,r,n))}return i}};function FI({parserRules:t,datatypeRules:e}){let r=new Le;ie(t).concat(e).forEach(i=>r.add(bo(i),i));function n(i){if(Ne(i)){let o=Ts(i);o&&r.add(o,i)}(Pr(i)||Ft(i)||Dr(i))&&i.elements.forEach(o=>n(o))}return t.forEach(i=>n(i.definition)),r}function nR(t){return t&&"declared"in t}function iR(t){return t&&"inferred"in t}function oR(t){return t&&"inferred"in t&&"declared"in t}function aR(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency],Interface:[r.checkCyclicInterface],Type:[r.checkCyclicType]};e.register(n,r)}var Ju=class{checkCyclicType(e,r){Di(e,new Set)&&r("error",`Type alias '${e.name}' circularly references itself.`,{node:e,property:"name"})}checkCyclicInterface(e,r){Di(e,new Set)&&r("error",`Type '${e.name}' recursively references itself as a base type.`,{node:e,property:"name"})}checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if(nR(o)&&pn(o.declared)&&Ar(o.declaredNode)){let s=o;UI(s,r),GI(s,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())iR(o)&&o.inferred instanceof ls&&qI(o.inferred,r),oR(o)&&BI(o,i,r)}checkActionIsNotUnionType(e,r){Mt(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};function Di(t,e){var r;if(e.has(t))return!0;if(e.add(t),Mt(t))return Di(t.type,e);if(Ar(t))return t.superTypes.some(n=>n.ref&&Di(n.ref,new Set(e)));if(or(t)){if(!((r=t.typeRef)===null||r===void 0)&&r.ref)return Di(t.typeRef.ref,e)}else{if(go(t))return Di(t.referenceType,e);if(ho(t))return Di(t.elementType,e);if(Vr(t))return t.types.some(n=>Di(n,new Set(e)))}return!1}function qI(t,e){t.properties.forEach(r=>{var n;let i=Jm(r.type);if(i.length>1){let o=a=>ri(a)?"ref":"other",s=o(i[0]);if(i.slice(1).some(a=>o(a)!==s)){let a=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}}})}function UI({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&(fn(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function GI({declared:t,declaredNode:e},r){let n=t.properties.reduce((s,a)=>s.add(a.name,a),new Le);for(let[s,a]of n.entriesGroupedByKey())if(a.length>1)for(let c of a)r("error",`Cannot have two properties with the same name '${s}'.`,{node:Array.from(c.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let s=0;s<i.length;s++)for(let a=s+1;a<i.length;a++){let c=i[s],l=i[a],u=pn(c)?c.superProperties:[],f=pn(l)?l.superProperties:[],m=jI(u,f);m.length>0&&r("error",`Cannot simultaneously inherit from '${c}' and '${l}'. Their ${m.map(T=>"'"+T+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let s of i){let a=pn(s)?s.superProperties:[];for(let c of a)o.add(c.name)}for(let s of t.properties)if(o.has(s.name)){let a=e.attributes.find(c=>c.name===s.name);a&&r("error",`Cannot redeclare property '${s.name}'. It is already inherited from another interface.`,{node:a,property:"name"})}}function jI(t,e){let r=[];for(let n of t){let i=e.find(o=>o.name===n.name);i&&!HI(n,i)&&r.push(n.name)}return r}function HI(t,e){return Qa(t.type,e.type)&&Qa(e.type,t.type)}function BI(t,e,r){let{inferred:n,declared:i,declaredNode:o,inferredNodes:s}=t,a=i.name,c=f=>m=>s.forEach(T=>r("error",`${m}${f?` ${f}`:""}.`,T?.inferredType?{node:T?.inferredType,property:"name"}:{node:T,property:Ne(T)?"type":"name"})),l=(f,m)=>f.forEach(T=>r("error",m,{node:T,property:Re(T)||Ne(T)?"feature":"name"})),u=f=>{s.forEach(m=>{B(m)&&gs(m.definition).find(A=>A.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${a}'.`,{node:m,property:"parameters"})})};if(fn(n)&&fn(i))KI(n.type,i.type,c(`in a rule that returns type '${a}'`));else if(pn(n)&&pn(i))WI(n,i,e,c(`in a rule that returns type '${a}'`),l,u);else{let f=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;c()(f),r("error",f,{node:o,property:"name"})}}function KI(t,e,r){Qa(t,e)||r(`Cannot assign type '${dn(t,"DeclaredType")}' to '${dn(e,"DeclaredType")}'`)}function sR(t){return t.optional||nu(t.type)}function WI(t,e,r,n,i,o){let s=new Set(t.properties.map(f=>f.name)),a=new Map(t.allProperties.map(f=>[f.name,f])),c=new Map(e.superProperties.map(f=>[f.name,f])),l=f=>{if(Dt(f))return{types:f.types.map(m=>l(m))};if(ri(f))return{referenceType:l(f.referenceType)};if(ni(f))return{elementType:l(f.elementType)};if(Or(f)){let m=r.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of a.entries()){let T=c.get(f);if(T){let A=dn(m.type,"DeclaredType"),w=dn(T.type,"DeclaredType");if(!Qa(l(m.type),T.type)&&w!=="unknown"){let C=`The assigned type '${A}' is not compatible with the declared property '${f}' of type '${w}'.`;i(m.astNodes,C)}m.optional&&!sR(T)&&o(f)}else s.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let u=new Set;for(let[f,m]of c.entries())!a.get(f)&&!sR(m)&&u.add(f);if(u.size>0){let f=u.size>1?"Properties":"A property",m=u.size>1?"are expected":"is expected",T=Array.from(u).map(A=>`'${A}'`).sort().join(", ");n(`${f} ${T} ${m}.`)}}var VI={validation:{LangiumGrammarValidator:t=>new pu(t),ValidationResourcesCollector:t=>new Yu(t),LangiumGrammarTypesValidator:()=>new Ju},lsp:{FoldingRangeProvider:t=>new Cu(t),CodeActionProvider:t=>new Ru(t),SemanticTokenProvider:t=>new _u(t),Formatter:()=>new $u,DefinitionProvider:t=>new zu(t),CallHierarchyProvider:t=>new Xu(t),CompletionProvider:t=>new wu(t)},references:{ScopeComputation:t=>new vu(t),ScopeProvider:t=>new Tu(t),References:t=>new Pu(t),NameProvider:()=>new Iu}};function cR(t,e){let r=po(gc(t),Ox,e),n=po(hc({shared:r}),Lx,VI);return zI(r,n),r.ServiceRegistry.register(n),Tx(n),aR(n),{shared:r,grammar:n}}function zI(t,e){t.workspace.DocumentBuilder.onBuildPhase(je.IndexedReferences,async(n,i)=>{for(let o of n){await Ze(i);let s=e.validation.ValidationResourcesCollector,a=o.parseResult.value;o.validationResources=s.collectValidationResources(a)}})}var Ih=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}},wo={fileSystemProvider:()=>new Ih};function Su(t){return t.rules.find(e=>B(e)&&e.entry)}function XI(t){return t.rules.filter(e=>Se(e)&&e.hidden)}function hs(t,e){let r=new Set,n=Su(t);if(!n)return new Set(t.rules);let i=[n].concat(XI(t));for(let s of i)lR(s,r,e);let o=new Set;for(let s of t.rules)(r.has(s.name)||Se(s)&&s.hidden)&&o.add(s);return o}function lR(t,e,r){e.add(t.name),Qe(t).forEach(n=>{if(_e(n)||r&&Yl(n)){let i=n.rule.ref;i&&!e.has(i.name)&&lR(i,e,r)}})}function Au(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=lc(t.type.ref);return e?.terminal}}function uR(t){return t.hidden&&!Yr(t).test(" ")}function Ni(t,e){return!t||!e?[]:Ph(t,e,t.astNode,!0)}function Yt(t,e,r){if(!t||!e)return;let n=Ph(t,e,t.astNode,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function Ph(t,e,r,n){if(!n){let i=Ie(t.grammarSource,Re);if(i&&i.feature===e)return[t]}return kn(t)&&t.astNode===r?t.content.flatMap(i=>Ph(i,e,r,!1)):[]}function Eu(t,e){return t?fR(t,e,t?.astNode):[]}function zr(t,e,r){if(!t)return;let n=fR(t,e,t?.astNode);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function fR(t,e,r){if(t.astNode!==r)return[];if(pt(t.grammarSource)&&t.grammarSource.value===e)return[t];let n=Mm(t).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===r?pt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function Es(t){var e;let r=t.astNode;for(;r===((e=t.container)===null||e===void 0?void 0:e.astNode);){let n=Ie(t.grammarSource,Re);if(n)return n;t=t.container}}function lc(t){return ns(t)&&(t=t.$container),dR(t,new Map)}function dR(t,e){var r;function n(i,o){let s;return Ie(i,Re)||(s=dR(o,e)),e.set(t,s),s}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of Qe(t)){if(Re(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(_e(i)&&B(i.rule.ref))return n(i,i.rule.ref);if(or(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function lu(t){var e;let r=cR(wo).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,Jt.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}function pR(t){let e=[],r=t.Grammar;for(let n of r.rules)Se(n)&&uR(n)&&cx(Yr(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:Fm}}var YI=typeof global=="object"&&global&&global.Object===Object&&global,Qu=YI;var JI=typeof self=="object"&&self&&self.Object===Object&&self,QI=Qu||JI||Function("return this")(),$t=QI;var ZI=$t.Symbol,qt=ZI;var mR=Object.prototype,eP=mR.hasOwnProperty,tP=mR.toString,yc=qt?qt.toStringTag:void 0;function rP(t){var e=eP.call(t,yc),r=t[yc];try{t[yc]=void 0;var n=!0}catch{}var i=tP.call(t);return n&&(e?t[yc]=r:delete t[yc]),i}var hR=rP;var nP=Object.prototype,iP=nP.toString;function oP(t){return iP.call(t)}var gR=oP;var sP="[object Null]",aP="[object Undefined]",yR=qt?qt.toStringTag:void 0;function cP(t){return t==null?t===void 0?aP:sP:yR&&yR in Object(t)?hR(t):gR(t)}var hr=cP;function lP(t){return t!=null&&typeof t=="object"}var yt=lP;var uP="[object Symbol]";function fP(t){return typeof t=="symbol"||yt(t)&&hr(t)==uP}var _n=fP;function dP(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var In=dP;var pP=Array.isArray,V=pP;var mP=1/0,TR=qt?qt.prototype:void 0,vR=TR?TR.toString:void 0;function xR(t){if(typeof t=="string")return t;if(V(t))return In(t,xR)+"";if(_n(t))return vR?vR.call(t):"";var e=t+"";return e=="0"&&1/t==-mP?"-0":e}var RR=xR;var hP=/\s/;function gP(t){for(var e=t.length;e--&&hP.test(t.charAt(e)););return e}var bR=gP;var yP=/^\s+/;function TP(t){return t&&t.slice(0,bR(t)+1).replace(yP,"")}var AR=TP;function vP(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var at=vP;var SR=0/0,xP=/^[-+]0x[0-9a-f]+$/i,RP=/^0b[01]+$/i,bP=/^0o[0-7]+$/i,AP=parseInt;function SP(t){if(typeof t=="number")return t;if(_n(t))return SR;if(at(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=at(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=AR(t);var r=RP.test(t);return r||bP.test(t)?AP(t.slice(2),r?2:8):xP.test(t)?SR:+t}var wR=SP;var CR=1/0,wP=17976931348623157e292;function CP(t){if(!t)return t===0?t:0;if(t=wR(t),t===CR||t===-CR){var e=t<0?-1:1;return e*wP}return t===t?t:0}var kR=CP;function kP(t){var e=kR(t),r=e%1;return e===e?r?e-r:e:0}var Pn=kP;function EP(t){return t}var Sr=EP;var $P="[object AsyncFunction]",NP="[object Function]",_P="[object GeneratorFunction]",IP="[object Proxy]";function PP(t){if(!at(t))return!1;var e=hr(t);return e==NP||e==_P||e==$P||e==IP}var gr=PP;var DP=$t["__core-js_shared__"],Zu=DP;var ER=function(){var t=/[^.]+$/.exec(Zu&&Zu.keys&&Zu.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function OP(t){return!!ER&&ER in t}var $R=OP;var LP=Function.prototype,MP=LP.toString;function FP(t){if(t!=null){try{return MP.call(t)}catch{}try{return t+""}catch{}}return""}var li=FP;var qP=/[\\^$.*+?()[\]{}|]/g,UP=/^\[object .+?Constructor\]$/,GP=Function.prototype,jP=Object.prototype,HP=GP.toString,BP=jP.hasOwnProperty,KP=RegExp("^"+HP.call(BP).replace(qP,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function WP(t){if(!at(t)||$R(t))return!1;var e=gr(t)?KP:UP;return e.test(li(t))}var NR=WP;function VP(t,e){return t?.[e]}var _R=VP;function zP(t,e){var r=_R(t,e);return NR(r)?r:void 0}var wr=zP;var XP=wr($t,"WeakMap"),ef=XP;var IR=Object.create,YP=function(){function t(){}return function(e){if(!at(e))return{};if(IR)return IR(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),PR=YP;function JP(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var DR=JP;function QP(){}var ct=QP;function ZP(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var OR=ZP;var eD=800,tD=16,rD=Date.now;function nD(t){var e=0,r=0;return function(){var n=rD(),i=tD-(n-r);if(r=n,i>0){if(++e>=eD)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var LR=nD;function iD(t){return function(){return t}}var MR=iD;var oD=function(){try{var t=wr(Object,"defineProperty");return t({},"",{}),t}catch{}}(),_s=oD;var sD=_s?function(t,e){return _s(t,"toString",{configurable:!0,enumerable:!1,value:MR(e),writable:!0})}:Sr,FR=sD;var aD=LR(FR),qR=aD;function cD(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var tf=cD;function lD(t,e,r,n){for(var i=t.length,o=r+(n?1:-1);n?o--:++o<i;)if(e(t[o],o,t))return o;return-1}var rf=lD;function uD(t){return t!==t}var UR=uD;function fD(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var GR=fD;function dD(t,e,r){return e===e?GR(t,e,r):rf(t,UR,r)}var Is=dD;function pD(t,e){var r=t==null?0:t.length;return!!r&&Is(t,e,0)>-1}var nf=pD;var mD=9007199254740991,hD=/^(?:0|[1-9]\d*)$/;function gD(t,e){var r=typeof t;return e=e??mD,!!e&&(r=="number"||r!="symbol"&&hD.test(t))&&t>-1&&t%1==0&&t<e}var Oi=gD;function yD(t,e,r){e=="__proto__"&&_s?_s(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var Ps=yD;function TD(t,e){return t===e||t!==t&&e!==e}var Dn=TD;var vD=Object.prototype,xD=vD.hasOwnProperty;function RD(t,e,r){var n=t[e];(!(xD.call(t,e)&&Dn(n,r))||r===void 0&&!(e in t))&&Ps(t,e,r)}var Li=RD;function bD(t,e,r,n){var i=!r;r||(r={});for(var o=-1,s=e.length;++o<s;){var a=e[o],c=n?n(r[a],t[a],a,r,t):void 0;c===void 0&&(c=t[a]),i?Ps(r,a,c):Li(r,a,c)}return r}var On=bD;var jR=Math.max;function AD(t,e,r){return e=jR(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,o=jR(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=r(s),DR(t,this,a)}}var HR=AD;function SD(t,e){return qR(HR(t,e,Sr),t+"")}var Ds=SD;var wD=9007199254740991;function CD(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=wD}var Os=CD;function kD(t){return t!=null&&Os(t.length)&&!gr(t)}var Nt=kD;function ED(t,e,r){if(!at(r))return!1;var n=typeof e;return(n=="number"?Nt(r)&&Oi(e,r.length):n=="string"&&e in r)?Dn(r[e],t):!1}var Mi=ED;function $D(t){return Ds(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,s=i>2?r[2]:void 0;for(o=t.length>3&&typeof o=="function"?(i--,o):void 0,s&&Mi(r[0],r[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=r[n];a&&t(e,a,n,o)}return e})}var BR=$D;var ND=Object.prototype;function _D(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||ND;return t===r}var Ln=_D;function ID(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var KR=ID;var PD="[object Arguments]";function DD(t){return yt(t)&&hr(t)==PD}var Dh=DD;var WR=Object.prototype,OD=WR.hasOwnProperty,LD=WR.propertyIsEnumerable,MD=Dh(function(){return arguments}())?Dh:function(t){return yt(t)&&OD.call(t,"callee")&&!LD.call(t,"callee")},Fi=MD;function FD(){return!1}var VR=FD;var YR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,zR=YR&&typeof module=="object"&&module&&!module.nodeType&&module,qD=zR&&zR.exports===YR,XR=qD?$t.Buffer:void 0,UD=XR?XR.isBuffer:void 0,GD=UD||VR,ui=GD;var jD="[object Arguments]",HD="[object Array]",BD="[object Boolean]",KD="[object Date]",WD="[object Error]",VD="[object Function]",zD="[object Map]",XD="[object Number]",YD="[object Object]",JD="[object RegExp]",QD="[object Set]",ZD="[object String]",e0="[object WeakMap]",t0="[object ArrayBuffer]",r0="[object DataView]",n0="[object Float32Array]",i0="[object Float64Array]",o0="[object Int8Array]",s0="[object Int16Array]",a0="[object Int32Array]",c0="[object Uint8Array]",l0="[object Uint8ClampedArray]",u0="[object Uint16Array]",f0="[object Uint32Array]",Ye={};Ye[n0]=Ye[i0]=Ye[o0]=Ye[s0]=Ye[a0]=Ye[c0]=Ye[l0]=Ye[u0]=Ye[f0]=!0;Ye[jD]=Ye[HD]=Ye[t0]=Ye[BD]=Ye[r0]=Ye[KD]=Ye[WD]=Ye[VD]=Ye[zD]=Ye[XD]=Ye[YD]=Ye[JD]=Ye[QD]=Ye[ZD]=Ye[e0]=!1;function d0(t){return yt(t)&&Os(t.length)&&!!Ye[hr(t)]}var JR=d0;function p0(t){return function(e){return t(e)}}var Mn=p0;var QR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Tc=QR&&typeof module=="object"&&module&&!module.nodeType&&module,m0=Tc&&Tc.exports===QR,Oh=m0&&Qu.process,h0=function(){try{var t=Tc&&Tc.require&&Tc.require("util").types;return t||Oh&&Oh.binding&&Oh.binding("util")}catch{}}(),Qr=h0;var ZR=Qr&&Qr.isTypedArray,g0=ZR?Mn(ZR):JR,Ls=g0;var y0=Object.prototype,T0=y0.hasOwnProperty;function v0(t,e){var r=V(t),n=!r&&Fi(t),i=!r&&!n&&ui(t),o=!r&&!n&&!i&&Ls(t),s=r||n||i||o,a=s?KR(t.length,String):[],c=a.length;for(var l in t)(e||T0.call(t,l))&&!(s&&(l=="length"||i&&(l=="offset"||l=="parent")||o&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||Oi(l,c)))&&a.push(l);return a}var of=v0;function x0(t,e){return function(r){return t(e(r))}}var sf=x0;var R0=sf(Object.keys,Object),eb=R0;var b0=Object.prototype,A0=b0.hasOwnProperty;function S0(t){if(!Ln(t))return eb(t);var e=[];for(var r in Object(t))A0.call(t,r)&&r!="constructor"&&e.push(r);return e}var af=S0;function w0(t){return Nt(t)?of(t):af(t)}var He=w0;var C0=Object.prototype,k0=C0.hasOwnProperty,E0=BR(function(t,e){if(Ln(e)||Nt(e)){On(e,He(e),t);return}for(var r in e)k0.call(e,r)&&Li(t,r,e[r])}),Qt=E0;function $0(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var tb=$0;var N0=Object.prototype,_0=N0.hasOwnProperty;function I0(t){if(!at(t))return tb(t);var e=Ln(t),r=[];for(var n in t)n=="constructor"&&(e||!_0.call(t,n))||r.push(n);return r}var rb=I0;function P0(t){return Nt(t)?of(t,!0):rb(t)}var qi=P0;var D0=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,O0=/^\w*$/;function L0(t,e){if(V(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||_n(t)?!0:O0.test(t)||!D0.test(t)||e!=null&&t in Object(e)}var Ms=L0;var M0=wr(Object,"create"),fi=M0;function F0(){this.__data__=fi?fi(null):{},this.size=0}var nb=F0;function q0(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var ib=q0;var U0="__lodash_hash_undefined__",G0=Object.prototype,j0=G0.hasOwnProperty;function H0(t){var e=this.__data__;if(fi){var r=e[t];return r===U0?void 0:r}return j0.call(e,t)?e[t]:void 0}var ob=H0;var B0=Object.prototype,K0=B0.hasOwnProperty;function W0(t){var e=this.__data__;return fi?e[t]!==void 0:K0.call(e,t)}var sb=W0;var V0="__lodash_hash_undefined__";function z0(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=fi&&e===void 0?V0:e,this}var ab=z0;function Fs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Fs.prototype.clear=nb;Fs.prototype.delete=ib;Fs.prototype.get=ob;Fs.prototype.has=sb;Fs.prototype.set=ab;var Lh=Fs;function X0(){this.__data__=[],this.size=0}var cb=X0;function Y0(t,e){for(var r=t.length;r--;)if(Dn(t[r][0],e))return r;return-1}var Ui=Y0;var J0=Array.prototype,Q0=J0.splice;function Z0(t){var e=this.__data__,r=Ui(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():Q0.call(e,r,1),--this.size,!0}var lb=Z0;function eO(t){var e=this.__data__,r=Ui(e,t);return r<0?void 0:e[r][1]}var ub=eO;function tO(t){return Ui(this.__data__,t)>-1}var fb=tO;function rO(t,e){var r=this.__data__,n=Ui(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var db=rO;function qs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}qs.prototype.clear=cb;qs.prototype.delete=lb;qs.prototype.get=ub;qs.prototype.has=fb;qs.prototype.set=db;var Gi=qs;var nO=wr($t,"Map"),ji=nO;function iO(){this.size=0,this.__data__={hash:new Lh,map:new(ji||Gi),string:new Lh}}var pb=iO;function oO(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var mb=oO;function sO(t,e){var r=t.__data__;return mb(e)?r[typeof e=="string"?"string":"hash"]:r.map}var Hi=sO;function aO(t){var e=Hi(this,t).delete(t);return this.size-=e?1:0,e}var hb=aO;function cO(t){return Hi(this,t).get(t)}var gb=cO;function lO(t){return Hi(this,t).has(t)}var yb=lO;function uO(t,e){var r=Hi(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var Tb=uO;function Us(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Us.prototype.clear=pb;Us.prototype.delete=hb;Us.prototype.get=gb;Us.prototype.has=yb;Us.prototype.set=Tb;var Co=Us;var fO="Expected a function";function Mh(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(fO);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var s=t.apply(this,n);return r.cache=o.set(i,s)||o,s};return r.cache=new(Mh.Cache||Co),r}Mh.Cache=Co;var vb=Mh;var dO=500;function pO(t){var e=vb(t,function(n){return r.size===dO&&r.clear(),n}),r=e.cache;return e}var xb=pO;var mO=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,hO=/\\(\\)?/g,gO=xb(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(mO,function(r,n,i,o){e.push(i?o.replace(hO,"$1"):n||r)}),e}),Rb=gO;function yO(t){return t==null?"":RR(t)}var bb=yO;function TO(t,e){return V(t)?t:Ms(t,e)?[t]:Rb(bb(t))}var Bi=TO;var vO=1/0;function xO(t){if(typeof t=="string"||_n(t))return t;var e=t+"";return e=="0"&&1/t==-vO?"-0":e}var Fn=xO;function RO(t,e){e=Bi(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[Fn(e[r++])];return r&&r==n?t:void 0}var Gs=RO;function bO(t,e,r){var n=t==null?void 0:Gs(t,e);return n===void 0?r:n}var Ab=bO;function AO(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}var js=AO;var Sb=qt?qt.isConcatSpreadable:void 0;function SO(t){return V(t)||Fi(t)||!!(Sb&&t&&t[Sb])}var wb=SO;function Cb(t,e,r,n,i){var o=-1,s=t.length;for(r||(r=wb),i||(i=[]);++o<s;){var a=t[o];e>0&&r(a)?e>1?Cb(a,e-1,r,n,i):js(i,a):n||(i[i.length]=a)}return i}var Hs=Cb;function wO(t){var e=t==null?0:t.length;return e?Hs(t,1):[]}var Tt=wO;var CO=sf(Object.getPrototypeOf,Object),cf=CO;function kO(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=t[n+e];return o}var lf=kO;function EO(t,e,r,n){var i=-1,o=t==null?0:t.length;for(n&&o&&(r=t[++i]);++i<o;)r=e(r,t[i],i,t);return r}var kb=EO;function $O(){this.__data__=new Gi,this.size=0}var Eb=$O;function NO(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}var $b=NO;function _O(t){return this.__data__.get(t)}var Nb=_O;function IO(t){return this.__data__.has(t)}var _b=IO;var PO=200;function DO(t,e){var r=this.__data__;if(r instanceof Gi){var n=r.__data__;if(!ji||n.length<PO-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Co(n)}return r.set(t,e),this.size=r.size,this}var Ib=DO;function Bs(t){var e=this.__data__=new Gi(t);this.size=e.size}Bs.prototype.clear=Eb;Bs.prototype.delete=$b;Bs.prototype.get=Nb;Bs.prototype.has=_b;Bs.prototype.set=Ib;var Ki=Bs;function OO(t,e){return t&&On(e,He(e),t)}var Pb=OO;function LO(t,e){return t&&On(e,qi(e),t)}var Db=LO;var Fb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Ob=Fb&&typeof module=="object"&&module&&!module.nodeType&&module,MO=Ob&&Ob.exports===Fb,Lb=MO?$t.Buffer:void 0,Mb=Lb?Lb.allocUnsafe:void 0;function FO(t,e){if(e)return t.slice();var r=t.length,n=Mb?Mb(r):new t.constructor(r);return t.copy(n),n}var qb=FO;function qO(t,e){for(var r=-1,n=t==null?0:t.length,i=0,o=[];++r<n;){var s=t[r];e(s,r,t)&&(o[i++]=s)}return o}var Ks=qO;function UO(){return[]}var uf=UO;var GO=Object.prototype,jO=GO.propertyIsEnumerable,Ub=Object.getOwnPropertySymbols,HO=Ub?function(t){return t==null?[]:(t=Object(t),Ks(Ub(t),function(e){return jO.call(t,e)}))}:uf,Ws=HO;function BO(t,e){return On(t,Ws(t),e)}var Gb=BO;var KO=Object.getOwnPropertySymbols,WO=KO?function(t){for(var e=[];t;)js(e,Ws(t)),t=cf(t);return e}:uf,ff=WO;function VO(t,e){return On(t,ff(t),e)}var jb=VO;function zO(t,e,r){var n=e(t);return V(t)?n:js(n,r(t))}var df=zO;function XO(t){return df(t,He,Ws)}var vc=XO;function YO(t){return df(t,qi,ff)}var pf=YO;var JO=wr($t,"DataView"),mf=JO;var QO=wr($t,"Promise"),hf=QO;var ZO=wr($t,"Set"),Wi=ZO;var Hb="[object Map]",eL="[object Object]",Bb="[object Promise]",Kb="[object Set]",Wb="[object WeakMap]",Vb="[object DataView]",tL=li(mf),rL=li(ji),nL=li(hf),iL=li(Wi),oL=li(ef),ko=hr;(mf&&ko(new mf(new ArrayBuffer(1)))!=Vb||ji&&ko(new ji)!=Hb||hf&&ko(hf.resolve())!=Bb||Wi&&ko(new Wi)!=Kb||ef&&ko(new ef)!=Wb)&&(ko=function(t){var e=hr(t),r=e==eL?t.constructor:void 0,n=r?li(r):"";if(n)switch(n){case tL:return Vb;case rL:return Hb;case nL:return Bb;case iL:return Kb;case oL:return Wb}return e});var yn=ko;var sL=Object.prototype,aL=sL.hasOwnProperty;function cL(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&aL.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var zb=cL;var lL=$t.Uint8Array,Vs=lL;function uL(t){var e=new t.constructor(t.byteLength);return new Vs(e).set(new Vs(t)),e}var zs=uL;function fL(t,e){var r=e?zs(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var Xb=fL;var dL=/\w*$/;function pL(t){var e=new t.constructor(t.source,dL.exec(t));return e.lastIndex=t.lastIndex,e}var Yb=pL;var Jb=qt?qt.prototype:void 0,Qb=Jb?Jb.valueOf:void 0;function mL(t){return Qb?Object(Qb.call(t)):{}}var Zb=mL;function hL(t,e){var r=e?zs(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var eA=hL;var gL="[object Boolean]",yL="[object Date]",TL="[object Map]",vL="[object Number]",xL="[object RegExp]",RL="[object Set]",bL="[object String]",AL="[object Symbol]",SL="[object ArrayBuffer]",wL="[object DataView]",CL="[object Float32Array]",kL="[object Float64Array]",EL="[object Int8Array]",$L="[object Int16Array]",NL="[object Int32Array]",_L="[object Uint8Array]",IL="[object Uint8ClampedArray]",PL="[object Uint16Array]",DL="[object Uint32Array]";function OL(t,e,r){var n=t.constructor;switch(e){case SL:return zs(t);case gL:case yL:return new n(+t);case wL:return Xb(t,r);case CL:case kL:case EL:case $L:case NL:case _L:case IL:case PL:case DL:return eA(t,r);case TL:return new n;case vL:case bL:return new n(t);case xL:return Yb(t);case RL:return new n;case AL:return Zb(t)}}var tA=OL;function LL(t){return typeof t.constructor=="function"&&!Ln(t)?PR(cf(t)):{}}var rA=LL;var ML="[object Map]";function FL(t){return yt(t)&&yn(t)==ML}var nA=FL;var iA=Qr&&Qr.isMap,qL=iA?Mn(iA):nA,oA=qL;var UL="[object Set]";function GL(t){return yt(t)&&yn(t)==UL}var sA=GL;var aA=Qr&&Qr.isSet,jL=aA?Mn(aA):sA,cA=jL;var HL=1,BL=2,KL=4,lA="[object Arguments]",WL="[object Array]",VL="[object Boolean]",zL="[object Date]",XL="[object Error]",uA="[object Function]",YL="[object GeneratorFunction]",JL="[object Map]",QL="[object Number]",fA="[object Object]",ZL="[object RegExp]",eM="[object Set]",tM="[object String]",rM="[object Symbol]",nM="[object WeakMap]",iM="[object ArrayBuffer]",oM="[object DataView]",sM="[object Float32Array]",aM="[object Float64Array]",cM="[object Int8Array]",lM="[object Int16Array]",uM="[object Int32Array]",fM="[object Uint8Array]",dM="[object Uint8ClampedArray]",pM="[object Uint16Array]",mM="[object Uint32Array]",Be={};Be[lA]=Be[WL]=Be[iM]=Be[oM]=Be[VL]=Be[zL]=Be[sM]=Be[aM]=Be[cM]=Be[lM]=Be[uM]=Be[JL]=Be[QL]=Be[fA]=Be[ZL]=Be[eM]=Be[tM]=Be[rM]=Be[fM]=Be[dM]=Be[pM]=Be[mM]=!0;Be[XL]=Be[uA]=Be[nM]=!1;function gf(t,e,r,n,i,o){var s,a=e&HL,c=e&BL,l=e&KL;if(r&&(s=i?r(t,n,i,o):r(t)),s!==void 0)return s;if(!at(t))return t;var u=V(t);if(u){if(s=zb(t),!a)return OR(t,s)}else{var f=yn(t),m=f==uA||f==YL;if(ui(t))return qb(t,a);if(f==fA||f==lA||m&&!i){if(s=c||m?{}:rA(t),!a)return c?jb(t,Db(s,t)):Gb(t,Pb(s,t))}else{if(!Be[f])return i?t:{};s=tA(t,f,a)}}o||(o=new Ki);var T=o.get(t);if(T)return T;o.set(t,s),cA(t)?t.forEach(function(N){s.add(gf(N,e,r,N,t,o))}):oA(t)&&t.forEach(function(N,C){s.set(C,gf(N,e,r,C,t,o))});var A=l?c?pf:vc:c?qi:He,w=u?void 0:A(t);return tf(w||t,function(N,C){w&&(C=N,N=t[C]),Li(s,C,gf(N,e,r,C,t,o))}),s}var dA=gf;var hM=4;function gM(t){return dA(t,hM)}var Ke=gM;function yM(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var o=t[e];o&&(i[n++]=o)}return i}var qn=yM;var TM="__lodash_hash_undefined__";function vM(t){return this.__data__.set(t,TM),this}var pA=vM;function xM(t){return this.__data__.has(t)}var mA=xM;function yf(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new Co;++e<r;)this.add(t[e])}yf.prototype.add=yf.prototype.push=pA;yf.prototype.has=mA;var Xs=yf;function RM(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}var Tf=RM;function bM(t,e){return t.has(e)}var Ys=bM;var AM=1,SM=2;function wM(t,e,r,n,i,o){var s=r&AM,a=t.length,c=e.length;if(a!=c&&!(s&&c>a))return!1;var l=o.get(t),u=o.get(e);if(l&&u)return l==e&&u==t;var f=-1,m=!0,T=r&SM?new Xs:void 0;for(o.set(t,e),o.set(e,t);++f<a;){var A=t[f],w=e[f];if(n)var N=s?n(w,A,f,e,t,o):n(A,w,f,t,e,o);if(N!==void 0){if(N)continue;m=!1;break}if(T){if(!Tf(e,function(C,v){if(!Ys(T,v)&&(A===C||i(A,C,r,n,o)))return T.push(v)})){m=!1;break}}else if(!(A===w||i(A,w,r,n,o))){m=!1;break}}return o.delete(t),o.delete(e),m}var vf=wM;function CM(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}var hA=CM;function kM(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}var Js=kM;var EM=1,$M=2,NM="[object Boolean]",_M="[object Date]",IM="[object Error]",PM="[object Map]",DM="[object Number]",OM="[object RegExp]",LM="[object Set]",MM="[object String]",FM="[object Symbol]",qM="[object ArrayBuffer]",UM="[object DataView]",gA=qt?qt.prototype:void 0,Fh=gA?gA.valueOf:void 0;function GM(t,e,r,n,i,o,s){switch(r){case UM:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case qM:return!(t.byteLength!=e.byteLength||!o(new Vs(t),new Vs(e)));case NM:case _M:case DM:return Dn(+t,+e);case IM:return t.name==e.name&&t.message==e.message;case OM:case MM:return t==e+"";case PM:var a=hA;case LM:var c=n&EM;if(a||(a=Js),t.size!=e.size&&!c)return!1;var l=s.get(t);if(l)return l==e;n|=$M,s.set(t,e);var u=vf(a(t),a(e),n,i,o,s);return s.delete(t),u;case FM:if(Fh)return Fh.call(t)==Fh.call(e)}return!1}var yA=GM;var jM=1,HM=Object.prototype,BM=HM.hasOwnProperty;function KM(t,e,r,n,i,o){var s=r&jM,a=vc(t),c=a.length,l=vc(e),u=l.length;if(c!=u&&!s)return!1;for(var f=c;f--;){var m=a[f];if(!(s?m in e:BM.call(e,m)))return!1}var T=o.get(t),A=o.get(e);if(T&&A)return T==e&&A==t;var w=!0;o.set(t,e),o.set(e,t);for(var N=s;++f<c;){m=a[f];var C=t[m],v=e[m];if(n)var y=s?n(v,C,m,e,t,o):n(C,v,m,t,e,o);if(!(y===void 0?C===v||i(C,v,r,n,o):y)){w=!1;break}N||(N=m=="constructor")}if(w&&!N){var $=t.constructor,D=e.constructor;$!=D&&"constructor"in t&&"constructor"in e&&!(typeof $=="function"&&$ instanceof $&&typeof D=="function"&&D instanceof D)&&(w=!1)}return o.delete(t),o.delete(e),w}var TA=KM;var WM=1,vA="[object Arguments]",xA="[object Array]",xf="[object Object]",VM=Object.prototype,RA=VM.hasOwnProperty;function zM(t,e,r,n,i,o){var s=V(t),a=V(e),c=s?xA:yn(t),l=a?xA:yn(e);c=c==vA?xf:c,l=l==vA?xf:l;var u=c==xf,f=l==xf,m=c==l;if(m&&ui(t)){if(!ui(e))return!1;s=!0,u=!1}if(m&&!u)return o||(o=new Ki),s||Ls(t)?vf(t,e,r,n,i,o):yA(t,e,c,r,n,i,o);if(!(r&WM)){var T=u&&RA.call(t,"__wrapped__"),A=f&&RA.call(e,"__wrapped__");if(T||A){var w=T?t.value():t,N=A?e.value():e;return o||(o=new Ki),i(w,N,r,n,o)}}return m?(o||(o=new Ki),TA(t,e,r,n,i,o)):!1}var bA=zM;function AA(t,e,r,n,i){return t===e?!0:t==null||e==null||!yt(t)&&!yt(e)?t!==t&&e!==e:bA(t,e,r,n,AA,i)}var Rf=AA;var XM=1,YM=2;function JM(t,e,r,n){var i=r.length,o=i,s=!n;if(t==null)return!o;for(t=Object(t);i--;){var a=r[i];if(s&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++i<o;){a=r[i];var c=a[0],l=t[c],u=a[1];if(s&&a[2]){if(l===void 0&&!(c in t))return!1}else{var f=new Ki;if(n)var m=n(l,u,c,t,e,f);if(!(m===void 0?Rf(u,l,XM|YM,n,f):m))return!1}}return!0}var SA=JM;function QM(t){return t===t&&!at(t)}var bf=QM;function ZM(t){for(var e=He(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,bf(i)]}return e}var wA=ZM;function e1(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}var Af=e1;function t1(t){var e=wA(t);return e.length==1&&e[0][2]?Af(e[0][0],e[0][1]):function(r){return r===t||SA(r,t,e)}}var CA=t1;function r1(t,e){return t!=null&&e in Object(t)}var kA=r1;function n1(t,e,r){e=Bi(e,t);for(var n=-1,i=e.length,o=!1;++n<i;){var s=Fn(e[n]);if(!(o=t!=null&&r(t,s)))break;t=t[s]}return o||++n!=i?o:(i=t==null?0:t.length,!!i&&Os(i)&&Oi(s,i)&&(V(t)||Fi(t)))}var Sf=n1;function i1(t,e){return t!=null&&Sf(t,e,kA)}var EA=i1;var o1=1,s1=2;function a1(t,e){return Ms(t)&&bf(e)?Af(Fn(t),e):function(r){var n=Ab(r,t);return n===void 0&&n===e?EA(r,t):Rf(e,n,o1|s1)}}var $A=a1;function c1(t){return function(e){return e?.[t]}}var NA=c1;function l1(t){return function(e){return Gs(e,t)}}var _A=l1;function u1(t){return Ms(t)?NA(Fn(t)):_A(t)}var IA=u1;function f1(t){return typeof t=="function"?t:t==null?Sr:typeof t=="object"?V(t)?$A(t[0],t[1]):CA(t):IA(t)}var mt=f1;function d1(t,e,r,n){for(var i=-1,o=t==null?0:t.length;++i<o;){var s=t[i];e(n,s,r(s),t)}return n}var PA=d1;function p1(t){return function(e,r,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var c=s[t?a:++i];if(r(o[c],c,o)===!1)break}return e}}var DA=p1;var m1=DA(),OA=m1;function h1(t,e){return t&&OA(t,e,He)}var LA=h1;function g1(t,e){return function(r,n){if(r==null)return r;if(!Nt(r))return t(r,n);for(var i=r.length,o=e?i:-1,s=Object(r);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return r}}var MA=g1;var y1=MA(LA),Cr=y1;function T1(t,e,r,n){return Cr(t,function(i,o,s){e(n,i,r(i),s)}),n}var FA=T1;function v1(t,e){return function(r,n){var i=V(r)?PA:FA,o=e?e():{};return i(r,t,mt(n,2),o)}}var qA=v1;var UA=Object.prototype,x1=UA.hasOwnProperty,R1=Ds(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Mi(e[0],e[1],i)&&(n=1);++r<n;)for(var o=e[r],s=qi(o),a=-1,c=s.length;++a<c;){var l=s[a],u=t[l];(u===void 0||Dn(u,UA[l])&&!x1.call(t,l))&&(t[l]=o[l])}return t}),Qs=R1;function b1(t){return yt(t)&&Nt(t)}var qh=b1;function A1(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}var wf=A1;var S1=200;function w1(t,e,r,n){var i=-1,o=nf,s=!0,a=t.length,c=[],l=e.length;if(!a)return c;r&&(e=In(e,Mn(r))),n?(o=wf,s=!1):e.length>=S1&&(o=Ys,s=!1,e=new Xs(e));e:for(;++i<a;){var u=t[i],f=r==null?u:r(u);if(u=n||u!==0?u:0,s&&f===f){for(var m=l;m--;)if(e[m]===f)continue e;c.push(u)}else o(e,f,n)||c.push(u)}return c}var GA=w1;var C1=Ds(function(t,e){return qh(t)?GA(t,Hs(e,1,qh,!0)):[]}),Vi=C1;function k1(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}var Un=k1;function E1(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Pn(e),lf(t,e<0?0:e,n)):[]}var vt=E1;function $1(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Pn(e),e=n-e,lf(t,0,e<0?0:e)):[]}var di=$1;function N1(t){return typeof t=="function"?t:Sr}var jA=N1;function _1(t,e){var r=V(t)?tf:Cr;return r(t,jA(e))}var G=_1;function I1(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}var HA=I1;function P1(t,e){var r=!0;return Cr(t,function(n,i,o){return r=!!e(n,i,o),r}),r}var BA=P1;function D1(t,e,r){var n=V(t)?HA:BA;return r&&Mi(t,e,r)&&(e=void 0),n(t,mt(e,3))}var cr=D1;function O1(t,e){var r=[];return Cr(t,function(n,i,o){e(n,i,o)&&r.push(n)}),r}var Cf=O1;function L1(t,e){var r=V(t)?Ks:Cf;return r(t,mt(e,3))}var Ut=L1;function M1(t){return function(e,r,n){var i=Object(e);if(!Nt(e)){var o=mt(r,3);e=He(e),r=function(a){return o(i[a],a,i)}}var s=t(e,r,n);return s>-1?i[o?e[s]:s]:void 0}}var KA=M1;var F1=Math.max;function q1(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Pn(r);return i<0&&(i=F1(n+i,0)),rf(t,mt(e,3),i)}var WA=q1;var U1=KA(WA),Gn=U1;function G1(t){return t&&t.length?t[0]:void 0}var Gt=G1;function j1(t,e){var r=-1,n=Nt(t)?Array(t.length):[];return Cr(t,function(i,o,s){n[++r]=e(i,o,s)}),n}var VA=j1;function H1(t,e){var r=V(t)?In:VA;return r(t,mt(e,3))}var L=H1;function B1(t,e){return Hs(L(t,e),1)}var Zt=B1;var K1=Object.prototype,W1=K1.hasOwnProperty,V1=qA(function(t,e,r){W1.call(t,r)?t[r].push(e):Ps(t,r,[e])}),Uh=V1;var z1=Object.prototype,X1=z1.hasOwnProperty;function Y1(t,e){return t!=null&&X1.call(t,e)}var zA=Y1;function J1(t,e){return t!=null&&Sf(t,e,zA)}var K=J1;var Q1="[object String]";function Z1(t){return typeof t=="string"||!V(t)&&yt(t)&&hr(t)==Q1}var Ot=Z1;function eF(t,e){return In(e,function(r){return t[r]})}var XA=eF;function tF(t){return t==null?[]:XA(t,He(t))}var Pe=tF;var rF=Math.max;function nF(t,e,r,n){t=Nt(t)?t:Pe(t),r=r&&!n?Pn(r):0;var i=t.length;return r<0&&(r=rF(i+r,0)),Ot(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&Is(t,e,r)>-1}var et=nF;var iF=Math.max;function oF(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Pn(r);return i<0&&(i=iF(n+i,0)),Is(t,e,i)}var kf=oF;var sF="[object Map]",aF="[object Set]",cF=Object.prototype,lF=cF.hasOwnProperty;function uF(t){if(t==null)return!0;if(Nt(t)&&(V(t)||typeof t=="string"||typeof t.splice=="function"||ui(t)||Ls(t)||Fi(t)))return!t.length;var e=yn(t);if(e==sF||e==aF)return!t.size;if(Ln(t))return!af(t).length;for(var r in t)if(lF.call(t,r))return!1;return!0}var se=uF;var fF="[object RegExp]";function dF(t){return yt(t)&&hr(t)==fF}var YA=dF;var JA=Qr&&Qr.isRegExp,pF=JA?Mn(JA):YA,Zr=pF;function mF(t){return t===void 0}var lr=mF;function hF(t,e){return t<e}var QA=hF;function gF(t,e,r){for(var n=-1,i=t.length;++n<i;){var o=t[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!_n(s):r(s,a)))var a=s,c=o}return c}var ZA=gF;function yF(t){return t&&t.length?ZA(t,Sr,QA):void 0}var eS=yF;var TF="Expected a function";function vF(t){if(typeof t!="function")throw new TypeError(TF);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}var tS=vF;function xF(t,e,r,n){if(!at(t))return t;e=Bi(e,t);for(var i=-1,o=e.length,s=o-1,a=t;a!=null&&++i<o;){var c=Fn(e[i]),l=r;if(c==="__proto__"||c==="constructor"||c==="prototype")return t;if(i!=s){var u=a[c];l=n?n(u,c,a):void 0,l===void 0&&(l=at(u)?u:Oi(e[i+1])?[]:{})}Li(a,c,l),a=a[c]}return t}var rS=xF;function RF(t,e,r){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=Gs(t,s);r(a,s)&&rS(o,Bi(s,t),a)}return o}var nS=RF;function bF(t,e){if(t==null)return{};var r=In(pf(t),function(n){return[n]});return e=mt(e),nS(t,r,function(n,i){return e(n,i[0])})}var kr=bF;function AF(t,e,r,n,i){return i(t,function(o,s,a){r=n?(n=!1,o):e(r,o,s,a)}),r}var iS=AF;function SF(t,e,r){var n=V(t)?kb:iS,i=arguments.length<3;return n(t,mt(e,4),r,i,Cr)}var lt=SF;function wF(t,e){var r=V(t)?Ks:Cf;return r(t,tS(mt(e,3)))}var zi=wF;function CF(t,e){var r;return Cr(t,function(n,i,o){return r=e(n,i,o),!r}),!!r}var oS=CF;function kF(t,e,r){var n=V(t)?Tf:oS;return r&&Mi(t,e,r)&&(e=void 0),n(t,mt(e,3))}var xc=kF;var EF=1/0,$F=Wi&&1/Js(new Wi([,-0]))[1]==EF?function(t){return new Wi(t)}:ct,sS=$F;var NF=200;function _F(t,e,r){var n=-1,i=nf,o=t.length,s=!0,a=[],c=a;if(r)s=!1,i=wf;else if(o>=NF){var l=e?null:sS(t);if(l)return Js(l);s=!1,i=Ys,c=new Xs}else c=e?[]:a;e:for(;++n<o;){var u=t[n],f=e?e(u):u;if(u=r||u!==0?u:0,s&&f===f){for(var m=c.length;m--;)if(c[m]===f)continue e;e&&c.push(f),a.push(u)}else i(c,f,r)||(c!==a&&c.push(f),a.push(u))}return a}var Ef=_F;function IF(t){return t&&t.length?Ef(t):[]}var Zs=IF;function PF(t,e){return t&&t.length?Ef(t,mt(e,2)):[]}var aS=PF;function ea(t){console&&console.error&&console.error(`Error: ${t}`)}function Rc(t){console&&console.warn&&console.warn(`Warning: ${t}`)}function bc(t){let e=new Date().getTime(),r=t();return{time:new Date().getTime()-e,value:r}}function Ac(t){function e(){}e.prototype=t;let r=new e;function n(){return typeof r.bar}return n(),n(),t;(0,eval)(t)}function DF(t){return OF(t)?t.LABEL:t.name}function OF(t){return Ot(t.LABEL)&&t.LABEL!==""}var Ur=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),G(this.definition,r=>{r.accept(e)})}},Ce=class extends Ur{constructor(e){super([]),this.idx=1,Qt(this,kr(e,r=>r!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},yr=class extends Ur{constructor(e){super(e.definition),this.orgText="",Qt(this,kr(e,r=>r!==void 0))}},We=class extends Ur{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Qt(this,kr(e,r=>r!==void 0))}},ke=class extends Ur{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,r=>r!==void 0))}},Ve=class extends Ur{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,r=>r!==void 0))}},ze=class extends Ur{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,r=>r!==void 0))}},pe=class extends Ur{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,r=>r!==void 0))}},Me=class extends Ur{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,r=>r!==void 0))}},Fe=class extends Ur{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Qt(this,kr(e,r=>r!==void 0))}},ae=class{constructor(e){this.idx=1,Qt(this,kr(e,r=>r!==void 0))}accept(e){e.visit(this)}};function $f(t){return L(t,ta)}function ta(t){function e(r){return L(r,ta)}if(t instanceof Ce){let r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return Ot(t.label)&&(r.label=t.label),r}else{if(t instanceof We)return{type:"Alternative",definition:e(t.definition)};if(t instanceof ke)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof Ve)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof ze)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:ta(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Me)return{type:"RepetitionWithSeparator",idx:t.idx,separator:ta(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof pe)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof Fe)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof ae){let r={type:"Terminal",name:t.terminalType.name,label:DF(t.terminalType),idx:t.idx};Ot(t.label)&&(r.terminalLabel=t.label);let n=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(r.pattern=Zr(n)?n.source:n),r}else{if(t instanceof yr)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}var Tr=class{visit(e){let r=e;switch(r.constructor){case Ce:return this.visitNonTerminal(r);case We:return this.visitAlternative(r);case ke:return this.visitOption(r);case Ve:return this.visitRepetitionMandatory(r);case ze:return this.visitRepetitionMandatoryWithSeparator(r);case Me:return this.visitRepetitionWithSeparator(r);case pe:return this.visitRepetition(r);case Fe:return this.visitAlternation(r);case ae:return this.visitTerminal(r);case yr:return this.visitRule(r);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function Gh(t){return t instanceof We||t instanceof ke||t instanceof pe||t instanceof Ve||t instanceof ze||t instanceof Me||t instanceof ae||t instanceof yr}function Eo(t,e=[]){return t instanceof ke||t instanceof pe||t instanceof Me?!0:t instanceof Fe?xc(t.definition,n=>Eo(n,e)):t instanceof Ce&&et(e,t)?!1:t instanceof Ur?(t instanceof Ce&&e.push(t),cr(t.definition,n=>Eo(n,e))):!1}function jh(t){return t instanceof Fe}function Er(t){if(t instanceof Ce)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof Ve)return"AT_LEAST_ONE";if(t instanceof ze)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}var pi=class{walk(e,r=[]){G(e.definition,(n,i)=>{let o=vt(e.definition,i+1);if(n instanceof Ce)this.walkProdRef(n,o,r);else if(n instanceof ae)this.walkTerminal(n,o,r);else if(n instanceof We)this.walkFlat(n,o,r);else if(n instanceof ke)this.walkOption(n,o,r);else if(n instanceof Ve)this.walkAtLeastOne(n,o,r);else if(n instanceof ze)this.walkAtLeastOneSep(n,o,r);else if(n instanceof Me)this.walkManySep(n,o,r);else if(n instanceof pe)this.walkMany(n,o,r);else if(n instanceof Fe)this.walkOr(n,o,r);else throw Error("non exhaustive match")})}walkTerminal(e,r,n){}walkProdRef(e,r,n){}walkFlat(e,r,n){let i=r.concat(n);this.walk(e,i)}walkOption(e,r,n){let i=r.concat(n);this.walk(e,i)}walkAtLeastOne(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkAtLeastOneSep(e,r,n){let i=cS(e,r,n);this.walk(e,i)}walkMany(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkManySep(e,r,n){let i=cS(e,r,n);this.walk(e,i)}walkOr(e,r,n){let i=r.concat(n);G(e.definition,o=>{let s=new We({definition:[o]});this.walk(s,i)})}};function cS(t,e,r){return[new ke({definition:[new ae({terminalType:t.separator})].concat(t.definition)})].concat(e,r)}function $o(t){if(t instanceof Ce)return $o(t.referencedRule);if(t instanceof ae)return FF(t);if(Gh(t))return LF(t);if(jh(t))return MF(t);throw Error("non exhaustive match")}function LF(t){let e=[],r=t.definition,n=0,i=r.length>n,o,s=!0;for(;i&&s;)o=r[n],s=Eo(o),e=e.concat($o(o)),n=n+1,i=r.length>n;return Zs(e)}function MF(t){let e=L(t.definition,r=>$o(r));return Zs(Tt(e))}function FF(t){return[t.terminalType]}var Nf="_~IN~_";var Hh=class extends pi{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,r,n){}walkProdRef(e,r,n){let i=qF(e.referencedRule,e.idx)+this.topProd.name,o=r.concat(n),s=new We({definition:o}),a=$o(s);this.follows[i]=a}};function lS(t){let e={};return G(t,r=>{let n=new Hh(r).startWalking();Qt(e,n)}),e}function qF(t,e){return t.name+e+Nf}var _f={},UF=new vo;function ra(t){let e=t.toString();if(_f.hasOwnProperty(e))return _f[e];{let r=UF.pattern(e);return _f[e]=r,r}}function uS(){_f={}}var dS="Complement Sets are not supported for first char optimization",Sc=`Unable to use "first char" lexer optimizations:
`;function pS(t,e=!1){try{let r=ra(t);return Bh(r.value,{},r.flags.ignoreCase)}catch(r){if(r.message===dS)e&&Rc(`${Sc}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),ea(`${Sc}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function Bh(t,e,r){switch(t.type){case"Disjunction":for(let i=0;i<t.value.length;i++)Bh(t.value[i],e,r);break;case"Alternative":let n=t.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":If(s.value,e,r);break;case"Set":if(s.complement===!0)throw Error(dS);G(s.value,c=>{if(typeof c=="number")If(c,e,r);else{let l=c;if(r===!0)for(let u=l.from;u<=l.to;u++)If(u,e,r);else{for(let u=l.from;u<=l.to&&u<na;u++)If(u,e,r);if(l.to>=na){let u=l.from>=na?l.from:na,f=l.to,m=jn(u),T=jn(f);for(let A=m;A<=T;A++)e[A]=A}}}});break;case"Group":Bh(s.value,e,r);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&Kh(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return Pe(e)}function If(t,e,r){let n=jn(t);e[n]=n,r===!0&&GF(t,e)}function GF(t,e){let r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){let i=jn(n.charCodeAt(0));e[i]=i}else{let i=r.toLowerCase();if(i!==r){let o=jn(i.charCodeAt(0));e[o]=o}}}function fS(t,e){return Gn(t.value,r=>{if(typeof r=="number")return et(e,r);{let n=r;return Gn(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function Kh(t){let e=t.quantifier;return e&&e.atLeast===0?!0:t.value?V(t.value)?cr(t.value,Kh):Kh(t.value):!1}var Wh=class extends $n{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){et(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?fS(e,this.targetCharCodes)===void 0&&(this.found=!0):fS(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function Pf(t,e){if(e instanceof RegExp){let r=ra(e),n=new Wh(t);return n.visit(r),n.found}else return Gn(e,r=>et(t,r.charCodeAt(0)))!==void 0}var No="PATTERN",ia="defaultMode",Df="modes",zh=typeof new RegExp("(?:)").sticky=="boolean";function gS(t,e){e=Qs(e,{useSticky:zh,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(v,y)=>y()});let r=e.tracer;r("initCharCodeToOptimizedIndexMap",()=>{oq()});let n;r("Reject Lexer.NA",()=>{n=zi(t,v=>v[No]===ht.NA)});let i=!1,o;r("Transform Patterns",()=>{i=!1,o=L(n,v=>{let y=v[No];if(Zr(y)){let $=y.source;return $.length===1&&$!=="^"&&$!=="$"&&$!=="."&&!y.ignoreCase?$:$.length===2&&$[0]==="\\"&&!et(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],$[1])?$[1]:e.useSticky?hS(y):mS(y)}else{if(gr(y))return i=!0,{exec:y};if(typeof y=="object")return i=!0,y;if(typeof y=="string"){if(y.length===1)return y;{let $=y.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),D=new RegExp($);return e.useSticky?hS(D):mS(D)}}else throw Error("non exhaustive match")}})});let s,a,c,l,u;r("misc mapping",()=>{s=L(n,v=>v.tokenTypeIdx),a=L(n,v=>{let y=v.GROUP;if(y!==ht.SKIPPED){if(Ot(y))return y;if(lr(y))return!1;throw Error("non exhaustive match")}}),c=L(n,v=>{let y=v.LONGER_ALT;if(y)return V(y)?L(y,D=>kf(n,D)):[kf(n,y)]}),l=L(n,v=>v.PUSH_MODE),u=L(n,v=>K(v,"POP_MODE"))});let f;r("Line Terminator Handling",()=>{let v=SS(e.lineTerminatorCharacters);f=L(n,y=>!1),e.positionTracking!=="onlyOffset"&&(f=L(n,y=>K(y,"LINE_BREAKS")?!!y.LINE_BREAKS:AS(y,v)===!1&&Pf(v,y.PATTERN)))});let m,T,A,w;r("Misc Mapping #2",()=>{m=L(n,RS),T=L(o,nq),A=lt(n,(v,y)=>{let $=y.GROUP;return Ot($)&&$!==ht.SKIPPED&&(v[$]=[]),v},{}),w=L(o,(v,y)=>({pattern:o[y],longerAlt:c[y],canLineTerminator:f[y],isCustom:m[y],short:T[y],group:a[y],push:l[y],pop:u[y],tokenTypeIdx:s[y],tokenType:n[y]}))});let N=!0,C=[];return e.safeMode||r("First Char Optimization",()=>{C=lt(n,(v,y,$)=>{if(typeof y.PATTERN=="string"){let D=y.PATTERN.charCodeAt(0),X=jn(D);Vh(v,X,w[$])}else if(V(y.START_CHARS_HINT)){let D;G(y.START_CHARS_HINT,X=>{let ye=typeof X=="string"?X.charCodeAt(0):X,Ee=jn(ye);D!==Ee&&(D=Ee,Vh(v,Ee,w[$]))})}else if(Zr(y.PATTERN))if(y.PATTERN.unicode)N=!1,e.ensureOptimizations&&ea(`${Sc}	Unable to analyze < ${y.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let D=pS(y.PATTERN,e.ensureOptimizations);se(D)&&(N=!1),G(D,X=>{Vh(v,X,w[$])})}else e.ensureOptimizations&&ea(`${Sc}	TokenType: <${y.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),N=!1;return v},[])}),{emptyGroups:A,patternIdxToConfig:w,charCodeToPatternIdxToConfig:C,hasCustom:i,canBeOptimized:N}}function yS(t,e){let r=[],n=HF(t);r=r.concat(n.errors);let i=BF(n.valid),o=i.valid;return r=r.concat(i.errors),r=r.concat(jF(o)),r=r.concat(QF(o)),r=r.concat(ZF(o,e)),r=r.concat(eq(o)),r}function jF(t){let e=[],r=Ut(t,n=>Zr(n[No]));return e=e.concat(WF(r)),e=e.concat(XF(r)),e=e.concat(YF(r)),e=e.concat(JF(r)),e=e.concat(VF(r)),e}function HF(t){let e=Ut(t,i=>!K(i,No)),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:tt.MISSING_PATTERN,tokenTypes:[i]})),n=Vi(t,e);return{errors:r,valid:n}}function BF(t){let e=Ut(t,i=>{let o=i[No];return!Zr(o)&&!gr(o)&&!K(o,"exec")&&!Ot(o)}),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:tt.INVALID_PATTERN,tokenTypes:[i]})),n=Vi(t,e);return{errors:r,valid:n}}var KF=/[^\\][$]/;function WF(t){class e extends $n{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let r=Ut(t,i=>{let o=i.PATTERN;try{let s=ra(o),a=new e;return a.visit(s),a.found}catch{return KF.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function VF(t){let e=Ut(t,n=>n.PATTERN.test(""));return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:tt.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var zF=/[^\\[][\^]|^\^/;function XF(t){class e extends $n{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let r=Ut(t,i=>{let o=i.PATTERN;try{let s=ra(o),a=new e;return a.visit(s),a.found}catch{return zF.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function YF(t){let e=Ut(t,n=>{let i=n[No];return i instanceof RegExp&&(i.multiline||i.global)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:tt.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function JF(t){let e=[],r=L(t,o=>lt(t,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!et(e,a)&&a.PATTERN!==ht.NA&&(e.push(a),s.push(a)),s),[]));r=qn(r);let n=Ut(r,o=>o.length>1);return L(n,o=>{let s=L(o,c=>c.name);return{message:`The same RegExp pattern ->${Gt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:tt.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function QF(t){let e=Ut(t,n=>{if(!K(n,"GROUP"))return!1;let i=n.GROUP;return i!==ht.SKIPPED&&i!==ht.NA&&!Ot(i)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:tt.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function ZF(t,e){let r=Ut(t,i=>i.PUSH_MODE!==void 0&&!et(e,i.PUSH_MODE));return L(r,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:tt.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function eq(t){let e=[],r=lt(t,(n,i,o)=>{let s=i.PATTERN;return s===ht.NA||(Ot(s)?n.push({str:s,idx:o,tokenType:i}):Zr(s)&&rq(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return G(t,(n,i)=>{G(r,({str:o,idx:s,tokenType:a})=>{if(i<s&&tq(o,n.PATTERN)){let c=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:c,type:tt.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function tq(t,e){if(Zr(e)){let r=e.exec(t);return r!==null&&r.index===0}else{if(gr(e))return e(t,0,[],{});if(K(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function rq(t){return Gn([".","\\","[","]","|","^","$","(",")","?","*","+","{"],r=>t.source.indexOf(r)!==-1)===void 0}function mS(t){let e=t.ignoreCase?"i":"";return new RegExp(`^(?:${t.source})`,e)}function hS(t){let e=t.ignoreCase?"iy":"y";return new RegExp(`${t.source}`,e)}function TS(t,e,r){let n=[];return K(t,ia)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+ia+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),K(t,Df)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+Df+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),K(t,Df)&&K(t,ia)&&!K(t.modes,t.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${ia}: <${t.defaultMode}>which does not exist
`,type:tt.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),K(t,Df)&&G(t.modes,(i,o)=>{G(i,(s,a)=>{if(lr(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:tt.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(K(s,"LONGER_ALT")){let c=V(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];G(c,l=>{!lr(l)&&!et(i,l)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${l.name}> on token <${s.name}> outside of mode <${o}>
`,type:tt.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function vS(t,e,r){let n=[],i=!1,o=qn(Tt(Pe(t.modes))),s=zi(o,c=>c[No]===ht.NA),a=SS(r);return e&&G(s,c=>{let l=AS(c,a);if(l!==!1){let f={message:iq(c,l),type:l.issue,tokenType:c};n.push(f)}else K(c,"LINE_BREAKS")?c.LINE_BREAKS===!0&&(i=!0):Pf(a,c.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:tt.NO_LINE_BREAKS_FLAGS}),n}function xS(t){let e={},r=He(t);return G(r,n=>{let i=t[n];if(V(i))e[n]=[];else throw Error("non exhaustive match")}),e}function RS(t){let e=t.PATTERN;if(Zr(e))return!1;if(gr(e))return!0;if(K(e,"exec"))return!0;if(Ot(e))return!1;throw Error("non exhaustive match")}function nq(t){return Ot(t)&&t.length===1?t.charCodeAt(0):!1}var bS={test:function(t){let e=t.length;for(let r=this.lastIndex;r<e;r++){let n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function AS(t,e){if(K(t,"LINE_BREAKS"))return!1;if(Zr(t.PATTERN)){try{Pf(e,t.PATTERN)}catch(r){return{issue:tt.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if(Ot(t.PATTERN))return!1;if(RS(t))return{issue:tt.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function iq(t,e){if(e.issue===tt.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===tt.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function SS(t){return L(t,r=>Ot(r)?r.charCodeAt(0):r)}function Vh(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}var na=256,Of=[];function jn(t){return t<na?t:Of[t]}function oq(){if(se(Of)){Of=new Array(65536);for(let t=0;t<65536;t++)Of[t]=t>255?255+~~(t/255):t}}function mi(t,e){let r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}function oa(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}var wS=1,kS={};function hi(t){let e=sq(t);aq(e),lq(e),cq(e),G(e,r=>{r.isParent=r.categoryMatches.length>0})}function sq(t){let e=Ke(t),r=t,n=!0;for(;n;){r=qn(Tt(L(r,o=>o.CATEGORIES)));let i=Vi(r,e);e=e.concat(i),se(i)?n=!1:r=i}return e}function aq(t){G(t,e=>{Xh(e)||(kS[wS]=e,e.tokenTypeIdx=wS++),CS(e)&&!V(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),CS(e)||(e.CATEGORIES=[]),uq(e)||(e.categoryMatches=[]),fq(e)||(e.categoryMatchesMap={})})}function cq(t){G(t,e=>{e.categoryMatches=[],G(e.categoryMatchesMap,(r,n)=>{e.categoryMatches.push(kS[n].tokenTypeIdx)})})}function lq(t){G(t,e=>{ES([],e)})}function ES(t,e){G(t,r=>{e.categoryMatchesMap[r.tokenTypeIdx]=!0}),G(e.CATEGORIES,r=>{let n=t.concat(e);et(n,r)||ES(n,r)})}function Xh(t){return K(t,"tokenTypeIdx")}function CS(t){return K(t,"CATEGORIES")}function uq(t){return K(t,"categoryMatches")}function fq(t){return K(t,"categoryMatchesMap")}function $S(t){return K(t,"tokenTypeIdx")}var Yh={buildUnableToPopLexerModeMessage(t){return`Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(t,e,r,n,i){return`unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${r} characters.`}};var tt;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(tt||(tt={}));var wc={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:Yh,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(wc);var ht=class{constructor(e,r=wc){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:c}=bc(o),l=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&l(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Qt({},wc,r);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===wc.lineTerminatorsPattern)this.config.lineTerminatorsPattern=bS;else if(this.config.lineTerminatorCharacters===wc.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),V(e)?i={modes:{defaultMode:Ke(e)},defaultMode:ia}:(o=!1,i=Ke(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(TS(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat(vS(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},G(i.modes,(a,c)=>{i.modes[c]=zi(a,l=>lr(l))});let s=He(i.modes);if(G(i.modes,(a,c)=>{this.TRACE_INIT(`Mode: <${c}> processing`,()=>{if(this.modes.push(c),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(yS(a,s))}),se(this.lexerDefinitionErrors)){hi(a);let l;this.TRACE_INIT("analyzeTokenTypes",()=>{l=gS(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[c]=l.patternIdxToConfig,this.charCodeToPatternIdxToConfig[c]=l.charCodeToPatternIdxToConfig,this.emptyGroups=Qt({},this.emptyGroups,l.emptyGroups),this.hasCustom=l.hasCustom||this.hasCustom,this.canModeBeOptimized[c]=l.canBeOptimized}})}),this.defaultMode=i.defaultMode,!se(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let c=L(this.lexerDefinitionErrors,l=>l.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+c)}G(this.lexerDefinitionWarning,a=>{Rc(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(zh?(this.chopInput=Sr,this.match=this.matchWithTest):(this.updateLastIndex=ct,this.match=this.matchWithExec),o&&(this.handleModes=ct),this.trackStartLines===!1&&(this.computeNewColumn=Sr),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=ct),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=lt(this.canModeBeOptimized,(c,l,u)=>(l===!1&&c.push(u),c),[]);if(r.ensureOptimizations&&!se(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{uS()}),this.TRACE_INIT("toFastProperties",()=>{Ac(this)})})}tokenize(e,r=this.defaultMode){if(!se(this.lexerDefinitionErrors)){let i=L(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)}tokenizeInternal(e,r){let n,i,o,s,a,c,l,u,f,m,T,A,w,N,C,v,y=e,$=y.length,D=0,X=0,ye=this.hasCustom?0:Math.floor(e.length/10),Ee=new Array(ye),Ht=[],xt=this.trackStartLines?1:void 0,M=this.trackStartLines?1:void 0,S=xS(this.emptyGroups),U=this.trackStartLines,j=this.config.lineTerminatorsPattern,ce=0,ee=[],Q=[],Rt=[],ut=[];Object.freeze(ut);let me;function $r(){return ee}function Hn(bt){let er=jn(bt),Rn=Q[er];return Rn===void 0?ut:Rn}let Ra=bt=>{if(Rt.length===1&&bt.tokenType.PUSH_MODE===void 0){let er=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(bt);Ht.push({offset:bt.startOffset,line:bt.startLine,column:bt.startColumn,length:bt.image.length,message:er})}else{Rt.pop();let er=Un(Rt);ee=this.patternIdxToConfig[er],Q=this.charCodeToPatternIdxToConfig[er],ce=ee.length;let Rn=this.canModeBeOptimized[er]&&this.config.safeMode===!1;Q&&Rn?me=Hn:me=$r}};function Qi(bt){Rt.push(bt),Q=this.charCodeToPatternIdxToConfig[bt],ee=this.patternIdxToConfig[bt],ce=ee.length,ce=ee.length;let er=this.canModeBeOptimized[bt]&&this.config.safeMode===!1;Q&&er?me=Hn:me=$r}Qi.call(this,r);let ur,Lo=this.config.recoveryEnabled;for(;D<$;){c=null;let bt=y.charCodeAt(D),er=me(bt),Rn=er.length;for(n=0;n<Rn;n++){ur=er[n];let Bt=ur.pattern;l=null;let ft=ur.short;if(ft!==!1?bt===ft&&(c=Bt):ur.isCustom===!0?(v=Bt.exec(y,D,Ee,S),v!==null?(c=v[0],v.payload!==void 0&&(l=v.payload)):c=null):(this.updateLastIndex(Bt,D),c=this.match(Bt,e,D)),c!==null){if(a=ur.longerAlt,a!==void 0){let Gr=a.length;for(o=0;o<Gr;o++){let Nr=ee[a[o]],xr=Nr.pattern;if(u=null,Nr.isCustom===!0?(v=xr.exec(y,D,Ee,S),v!==null?(s=v[0],v.payload!==void 0&&(u=v.payload)):s=null):(this.updateLastIndex(xr,D),s=this.match(xr,e,D)),s&&s.length>c.length){c=s,l=u,ur=Nr;break}}}break}}if(c!==null){if(f=c.length,m=ur.group,m!==void 0&&(T=ur.tokenTypeIdx,A=this.createTokenInstance(c,D,T,ur.tokenType,xt,M,f),this.handlePayload(A,l),m===!1?X=this.addToken(Ee,X,A):S[m].push(A)),e=this.chopInput(e,f),D=D+f,M=this.computeNewColumn(M,f),U===!0&&ur.canLineTerminator===!0){let Bt=0,ft,Gr;j.lastIndex=0;do ft=j.test(c),ft===!0&&(Gr=j.lastIndex-1,Bt++);while(ft===!0);Bt!==0&&(xt=xt+Bt,M=f-Gr,this.updateTokenEndLineColumnLocation(A,m,Gr,Bt,xt,M,f))}this.handleModes(ur,Ra,Qi,A)}else{let Bt=D,ft=xt,Gr=M,Nr=Lo===!1;for(;Nr===!1&&D<$;)for(e=this.chopInput(e,1),D++,i=0;i<ce;i++){let xr=ee[i],Zi=xr.pattern,xi=xr.short;if(xi!==!1?y.charCodeAt(D)===xi&&(Nr=!0):xr.isCustom===!0?Nr=Zi.exec(y,D,Ee,S)!==null:(this.updateLastIndex(Zi,D),Nr=Zi.exec(e)!==null),Nr===!0)break}if(w=D-Bt,M=this.computeNewColumn(M,w),C=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(y,Bt,w,ft,Gr),Ht.push({offset:Bt,line:ft,column:Gr,length:w,message:C}),Lo===!1)break}}return this.hasCustom||(Ee.length=X),{tokens:Ee,groups:S,errors:Ht}}handleModes(e,r,n,i){if(e.pop===!0){let o=e.push;r(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,r){return e.substring(r)}updateLastIndex(e,r){e.lastIndex=r}updateTokenEndLineColumnLocation(e,r,n,i,o,s,a){let c,l;r!==void 0&&(c=n===a-1,l=c?-1:0,i===1&&c===!0||(e.endLine=o+l,e.endColumn=s-1+-l))}computeNewColumn(e,r){return e+r}createOffsetOnlyToken(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,r,n,i,o,s){return{image:e,startOffset:r,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:r+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,r,n){return e.push(n),r}addTokenUsingMemberAccess(e,r,n){return e[r]=n,r++,r}handlePayloadNoCustom(e,r){}handlePayloadWithCustom(e,r){r!==null&&(e.payload=r)}matchWithTest(e,r,n){return e.test(r)===!0?r.substring(n,e.lastIndex):null}matchWithExec(e,r){let n=e.exec(r);return n!==null?n[0]:null}};ht.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";ht.NA=/NOT_APPLICABLE/;function gi(t){return Jh(t)?t.LABEL:t.name}function Jh(t){return Ot(t.LABEL)&&t.LABEL!==""}var dq="parent",NS="categories",_S="label",IS="group",PS="push_mode",DS="pop_mode",OS="longer_alt",LS="line_breaks",MS="start_chars_hint";function Lf(t){return pq(t)}function pq(t){let e=t.pattern,r={};if(r.name=t.name,lr(e)||(r.PATTERN=e),K(t,dq))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return K(t,NS)&&(r.CATEGORIES=t[NS]),hi([r]),K(t,_S)&&(r.LABEL=t[_S]),K(t,IS)&&(r.GROUP=t[IS]),K(t,DS)&&(r.POP_MODE=t[DS]),K(t,PS)&&(r.PUSH_MODE=t[PS]),K(t,OS)&&(r.LONGER_ALT=t[OS]),K(t,LS)&&(r.LINE_BREAKS=t[LS]),K(t,MS)&&(r.START_CHARS_HINT=t[MS]),r}var Tn=Lf({name:"EOF",pattern:ht.NA});hi([Tn]);function _o(t,e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function Cc(t,e){return mi(t,e)}var yi={buildMismatchTokenMessage({expected:t,actual:e,previous:r,ruleName:n}){return`Expecting ${Jh(t)?`--> ${gi(t)} <--`:`token of type --> ${t.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:t,ruleName:e}){return"Redundant input, expecting EOF but found: "+t.image},buildNoViableAltMessage({expectedPathsPerAlt:t,actual:e,previous:r,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+Gt(e).image+"'";if(n)return o+n+a;{let c=lt(t,(m,T)=>m.concat(T),[]),l=L(c,m=>`[${L(m,T=>gi(T)).join(", ")}]`),f=`one of these possible Token sequences:
${L(l,(m,T)=>`  ${T+1}. ${m}`).join(`
`)}`;return o+f+a}},buildEarlyExitMessage({expectedIterationPaths:t,actual:e,customUserDescription:r,ruleName:n}){let i="Expecting: ",s=`
but found: '`+Gt(e).image+"'";if(r)return i+r+s;{let c=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${L(t,l=>`[${L(l,u=>gi(u)).join(",")}]`).join(" ,")}>`;return i+c+s}}};Object.freeze(yi);var FS={buildRuleNotFoundError(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-"}},vn={buildDuplicateFoundError(t,e){function r(u){return u instanceof ae?u.terminalType.name:u instanceof Ce?u.nonTerminalName:""}let n=t.name,i=Gt(e),o=i.idx,s=Er(i),a=r(i),c=o>0,l=`->${s}${c?o:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError(t){return`Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`},buildAlternationPrefixAmbiguityError(t){let e=L(t.prefixPath,i=>gi(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx;return`Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`},buildAlternationAmbiguityError(t){let e=L(t.prefixPath,i=>gi(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError(t){let e=Er(t.repetition);return t.repetition.idx!==0&&(e+=t.repetition.idx),`The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`},buildTokenNameError(t){return"deprecated"},buildEmptyAlternationError(t){return`Ambiguous empty alternative: <${t.emptyChoiceIdx+1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`},buildTooManyAlternativesError(t){return`An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length+1} alternatives.`},buildLeftRecursionError(t){let e=t.topLevelRule.name,r=L(t.leftRecursionPath,o=>o.name),n=`${e} --> ${r.concat([e]).join(" --> ")}`;return`Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(t){return"deprecated"},buildDuplicateRuleNameError(t){let e;return t.topLevelRule instanceof yr?e=t.topLevelRule.name:e=t.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`}};function qS(t,e){let r=new Qh(t,e);return r.resolveRefs(),r.errors}var Qh=class extends Tr{constructor(e,r){super(),this.nameToTopRule=e,this.errMsgProvider=r,this.errors=[]}resolveRefs(){G(Pe(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let r=this.nameToTopRule[e.nonTerminalName];if(r)e.referencedRule=r;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:Lt.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var Zh=class extends pi{constructor(e,r){super(),this.topProd=e,this.path=r,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=Ke(this.path.ruleStack).reverse(),this.occurrenceStack=Ke(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,r=[]){this.found||super.walk(e,r)}walkProdRef(e,r,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=r.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){se(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},Mf=class extends Zh{constructor(e,r){super(e,r),this.path=r,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,r,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=r.concat(n),o=new We({definition:i});this.possibleTokTypes=$o(o),this.found=!0}}},sa=class extends pi{constructor(e,r){super(),this.topRule=e,this.occurrence=r,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},Ff=class extends sa{walkMany(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,r,n)}},kc=class extends sa{walkManySep(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,r,n)}},qf=class extends sa{walkAtLeastOne(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,r,n)}},Ec=class extends sa{walkAtLeastOneSep(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,r,n)}};function Uf(t,e,r=[]){r=Ke(r);let n=[],i=0;function o(a){return a.concat(vt(t,i+1))}function s(a){let c=Uf(o(a),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){let a=t[i];if(a instanceof We)return s(a.definition);if(a instanceof Ce)return s(a.definition);if(a instanceof ke)n=s(a.definition);else if(a instanceof Ve){let c=a.definition.concat([new pe({definition:a.definition})]);return s(c)}else if(a instanceof ze){let c=[new We({definition:a.definition}),new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})];return s(c)}else if(a instanceof Me){let c=a.definition.concat([new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})]);n=s(c)}else if(a instanceof pe){let c=a.definition.concat([new pe({definition:a.definition})]);n=s(c)}else{if(a instanceof Fe)return G(a.definition,c=>{se(c.definition)===!1&&(n=s(c.definition))}),n;if(a instanceof ae)r.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:vt(t,i)}),n}function Gf(t,e,r,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,c=e.length,l=c-n-1,u=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!se(f);){let m=f.pop();if(m===s){a&&Un(f).idx<=l&&f.pop();continue}let T=m.def,A=m.idx,w=m.ruleStack,N=m.occurrenceStack;if(se(T))continue;let C=T[0];if(C===i){let v={idx:A,def:vt(T),ruleStack:di(w),occurrenceStack:di(N)};f.push(v)}else if(C instanceof ae)if(A<c-1){let v=A+1,y=e[v];if(r(y,C.terminalType)){let $={idx:v,def:vt(T),ruleStack:w,occurrenceStack:N};f.push($)}}else if(A===c-1)u.push({nextTokenType:C.terminalType,nextTokenOccurrence:C.idx,ruleStack:w,occurrenceStack:N}),a=!0;else throw Error("non exhaustive match");else if(C instanceof Ce){let v=Ke(w);v.push(C.nonTerminalName);let y=Ke(N);y.push(C.idx);let $={idx:A,def:C.definition.concat(o,vt(T)),ruleStack:v,occurrenceStack:y};f.push($)}else if(C instanceof ke){let v={idx:A,def:vt(T),ruleStack:w,occurrenceStack:N};f.push(v),f.push(s);let y={idx:A,def:C.definition.concat(vt(T)),ruleStack:w,occurrenceStack:N};f.push(y)}else if(C instanceof Ve){let v=new pe({definition:C.definition,idx:C.idx}),y=C.definition.concat([v],vt(T)),$={idx:A,def:y,ruleStack:w,occurrenceStack:N};f.push($)}else if(C instanceof ze){let v=new ae({terminalType:C.separator}),y=new pe({definition:[v].concat(C.definition),idx:C.idx}),$=C.definition.concat([y],vt(T)),D={idx:A,def:$,ruleStack:w,occurrenceStack:N};f.push(D)}else if(C instanceof Me){let v={idx:A,def:vt(T),ruleStack:w,occurrenceStack:N};f.push(v),f.push(s);let y=new ae({terminalType:C.separator}),$=new pe({definition:[y].concat(C.definition),idx:C.idx}),D=C.definition.concat([$],vt(T)),X={idx:A,def:D,ruleStack:w,occurrenceStack:N};f.push(X)}else if(C instanceof pe){let v={idx:A,def:vt(T),ruleStack:w,occurrenceStack:N};f.push(v),f.push(s);let y=new pe({definition:C.definition,idx:C.idx}),$=C.definition.concat([y],vt(T)),D={idx:A,def:$,ruleStack:w,occurrenceStack:N};f.push(D)}else if(C instanceof Fe)for(let v=C.definition.length-1;v>=0;v--){let y=C.definition[v],$={idx:A,def:y.definition.concat(vt(T)),ruleStack:w,occurrenceStack:N};f.push($),f.push(s)}else if(C instanceof We)f.push({idx:A,def:C.definition.concat(vt(T)),ruleStack:w,occurrenceStack:N});else if(C instanceof yr)f.push(mq(C,A,w,N));else throw Error("non exhaustive match")}return u}function mq(t,e,r,n){let i=Ke(r);i.push(t.name);let o=Ke(n);return o.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:o}}var rt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(rt||(rt={}));function $c(t){if(t instanceof ke||t==="Option")return rt.OPTION;if(t instanceof pe||t==="Repetition")return rt.REPETITION;if(t instanceof Ve||t==="RepetitionMandatory")return rt.REPETITION_MANDATORY;if(t instanceof ze||t==="RepetitionMandatoryWithSeparator")return rt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof Me||t==="RepetitionWithSeparator")return rt.REPETITION_WITH_SEPARATOR;if(t instanceof Fe||t==="Alternation")return rt.ALTERNATION;throw Error("non exhaustive match")}function Hf(t){let{occurrence:e,rule:r,prodType:n,maxLookahead:i}=t,o=$c(n);return o===rt.ALTERNATION?aa(e,r,i):ca(e,r,o,i)}function GS(t,e,r,n,i,o){let s=aa(t,e,r),a=VS(s)?oa:mi;return o(s,n,a,i)}function jS(t,e,r,n,i,o){let s=ca(t,e,i,r),a=VS(s)?oa:mi;return o(s[0],a,n)}function HS(t,e,r,n){let i=t.length,o=cr(t,s=>cr(s,a=>a.length===1));if(e)return function(s){let a=L(s,c=>c.GATE);for(let c=0;c<i;c++){let l=t[c],u=l.length,f=a[c];if(!(f!==void 0&&f.call(this)===!1))e:for(let m=0;m<u;m++){let T=l[m],A=T.length;for(let w=0;w<A;w++){let N=this.LA(w+1);if(r(N,T[w])===!1)continue e}return c}}};if(o&&!n){let s=L(t,c=>Tt(c)),a=lt(s,(c,l,u)=>(G(l,f=>{K(c,f.tokenTypeIdx)||(c[f.tokenTypeIdx]=u),G(f.categoryMatches,m=>{K(c,m)||(c[m]=u)})}),c),{});return function(){let c=this.LA(1);return a[c.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=t[s],c=a.length;e:for(let l=0;l<c;l++){let u=a[l],f=u.length;for(let m=0;m<f;m++){let T=this.LA(m+1);if(r(T,u[m])===!1)continue e}return s}}}}function BS(t,e,r){let n=cr(t,o=>o.length===1),i=t.length;if(n&&!r){let o=Tt(t);if(o.length===1&&se(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=lt(o,(a,c,l)=>(a[c.tokenTypeIdx]=!0,G(c.categoryMatches,u=>{a[u]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=t[o],a=s.length;for(let c=0;c<a;c++){let l=this.LA(c+1);if(e(l,s[c])===!1)continue e}return!0}return!1}}var tg=class extends pi{constructor(e,r,n){super(),this.topProd=e,this.targetOccurrence=r,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,r,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===r?(this.restDef=n.concat(i),!0):!1}walkOption(e,r,n){this.checkIsTarget(e,rt.OPTION,r,n)||super.walkOption(e,r,n)}walkAtLeastOne(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY,r,n)||super.walkOption(e,r,n)}walkAtLeastOneSep(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}walkMany(e,r,n){this.checkIsTarget(e,rt.REPETITION,r,n)||super.walkOption(e,r,n)}walkManySep(e,r,n){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}},jf=class extends Tr{constructor(e,r,n){super(),this.targetOccurrence=e,this.targetProdType=r,this.targetRef=n,this.result=[]}checkIsTarget(e,r){e.idx===this.targetOccurrence&&this.targetProdType===r&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,rt.OPTION)}visitRepetition(e){this.checkIsTarget(e,rt.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,rt.ALTERNATION)}};function US(t){let e=new Array(t);for(let r=0;r<t;r++)e[r]=[];return e}function eg(t){let e=[""];for(let r=0;r<t.length;r++){let n=t[r],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let c="_"+n.categoryMatches[a];i.push(s+c)}}e=i}return e}function hq(t,e,r){for(let n=0;n<t.length;n++){if(n===r)continue;let i=t[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function KS(t,e){let r=L(t,s=>Uf([s],1)),n=US(r.length),i=L(r,s=>{let a={};return G(s,c=>{let l=eg(c.partialPath);G(l,u=>{a[u]=!0})}),a}),o=r;for(let s=1;s<=e;s++){let a=o;o=US(a.length);for(let c=0;c<a.length;c++){let l=a[c];for(let u=0;u<l.length;u++){let f=l[u].partialPath,m=l[u].suffixDef,T=eg(f);if(hq(i,T,c)||se(m)||f.length===e){let w=n[c];if(Bf(w,f)===!1){w.push(f);for(let N=0;N<T.length;N++){let C=T[N];i[c][C]=!0}}}else{let w=Uf(m,s+1,f);o[c]=o[c].concat(w),G(w,N=>{let C=eg(N.partialPath);G(C,v=>{i[c][v]=!0})})}}}}return n}function aa(t,e,r,n){let i=new jf(t,rt.ALTERNATION,n);return e.accept(i),KS(i.result,r)}function ca(t,e,r,n){let i=new jf(t,r);e.accept(i);let o=i.result,a=new tg(e,t,r).startWalking(),c=new We({definition:o}),l=new We({definition:a});return KS([c,l],n)}function Bf(t,e){e:for(let r=0;r<t.length;r++){let n=t[r];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function WS(t,e){return t.length<e.length&&cr(t,(r,n)=>{let i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}function VS(t){return cr(t,e=>cr(e,r=>cr(r,n=>se(n.categoryMatches))))}function zS(t){let e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return L(e,r=>Object.assign({type:Lt.CUSTOM_LOOKAHEAD_VALIDATION},r))}function XS(t,e,r,n){let i=Zt(t,c=>gq(c,r)),o=bq(t,e,r),s=Zt(t,c=>vq(c,r)),a=Zt(t,c=>Tq(c,t,n,r));return i.concat(o,s,a)}function gq(t,e){let r=new rg;t.accept(r);let n=r.allProductions,i=Uh(n,yq),o=kr(i,a=>a.length>1);return L(Pe(o),a=>{let c=Gt(a),l=e.buildDuplicateFoundError(t,a),u=Er(c),f={message:l,type:Lt.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:u,occurrence:c.idx},m=YS(c);return m&&(f.parameter=m),f})}function yq(t){return`${Er(t)}_#_${t.idx}_#_${YS(t)}`}function YS(t){return t instanceof ae?t.terminalType.name:t instanceof Ce?t.nonTerminalName:""}var rg=class extends Tr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function Tq(t,e,r,n){let i=[];if(lt(e,(s,a)=>a.name===t.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:s,type:Lt.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}function JS(t,e,r){let n=[],i;return et(e,t)||(i=`Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `,n.push({message:i,type:Lt.INVALID_RULE_OVERRIDE,ruleName:t})),n}function ig(t,e,r,n=[]){let i=[],o=Kf(e.definition);if(se(o))return[];{let s=t.name;et(o,t)&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:Lt.LEFT_RECURSION,ruleName:s});let c=Vi(o,n.concat([t])),l=Zt(c,u=>{let f=Ke(n);return f.push(u),ig(t,u,r,f)});return i.concat(l)}}function Kf(t){let e=[];if(se(t))return e;let r=Gt(t);if(r instanceof Ce)e.push(r.referencedRule);else if(r instanceof We||r instanceof ke||r instanceof Ve||r instanceof ze||r instanceof Me||r instanceof pe)e=e.concat(Kf(r.definition));else if(r instanceof Fe)e=Tt(L(r.definition,o=>Kf(o.definition)));else if(!(r instanceof ae))throw Error("non exhaustive match");let n=Eo(r),i=t.length>1;if(n&&i){let o=vt(t);return e.concat(Kf(o))}else return e}var Nc=class extends Tr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function QS(t,e){let r=new Nc;t.accept(r);let n=r.alternations;return Zt(n,o=>{let s=di(o.definition);return Zt(s,(a,c)=>{let l=Gf([a],[],mi,1);return se(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:o,emptyChoiceIdx:c}),type:Lt.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:o.idx,alternative:c+1}]:[]})})}function ZS(t,e,r){let n=new Nc;t.accept(n);let i=n.alternations;return i=zi(i,s=>s.ignoreAmbiguities===!0),Zt(i,s=>{let a=s.idx,c=s.maxLookahead||e,l=aa(a,t,c,s),u=xq(l,s,t,r),f=Rq(l,s,t,r);return u.concat(f)})}var ng=class extends Tr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function vq(t,e){let r=new Nc;t.accept(r);let n=r.alternations;return Zt(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:o}),type:Lt.TOO_MANY_ALTS,ruleName:t.name,occurrence:o.idx}]:[])}function ew(t,e,r){let n=[];return G(t,i=>{let o=new ng;i.accept(o);let s=o.allProductions;G(s,a=>{let c=$c(a),l=a.maxLookahead||e,u=a.idx,m=ca(u,i,c,l)[0];if(se(Tt(m))){let T=r.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:T,type:Lt.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function xq(t,e,r,n){let i=[],o=lt(t,(a,c,l)=>(e.definition[l].ignoreAmbiguities===!0||G(c,u=>{let f=[l];G(t,(m,T)=>{l!==T&&Bf(m,u)&&e.definition[T].ignoreAmbiguities!==!0&&f.push(T)}),f.length>1&&!Bf(i,u)&&(i.push(u),a.push({alts:f,path:u}))}),a),[]);return L(o,a=>{let c=L(a.alts,u=>u+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:c,prefixPath:a.path}),type:Lt.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:a.alts}})}function Rq(t,e,r,n){let i=lt(t,(s,a,c)=>{let l=L(a,u=>({idx:c,path:u}));return s.concat(l)},[]);return qn(Zt(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let c=s.idx,l=s.path,u=Ut(i,m=>e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<c&&WS(m.path,l));return L(u,m=>{let T=[m.idx+1,c+1],A=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:T,prefixPath:m.path}),type:Lt.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:A,alternatives:T}})}))}function bq(t,e,r){let n=[],i=L(e,o=>o.name);return G(t,o=>{let s=o.name;if(et(i,s)){let a=r.buildNamespaceConflictError(o);n.push({message:a,type:Lt.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function tw(t){let e=Qs(t,{errMsgProvider:FS}),r={};return G(t.rules,n=>{r[n.name]=n}),qS(r,e.errMsgProvider)}function rw(t){return t=Qs(t,{errMsgProvider:vn}),XS(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}var nw="MismatchedTokenException",iw="NoViableAltException",ow="EarlyExitException",sw="NotAllInputParsedException",aw=[nw,iw,ow,sw];Object.freeze(aw);function Xi(t){return et(aw,t.name)}var la=class extends Error{constructor(e,r){super(e),this.token=r,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},Io=class extends la{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=nw}},_c=class extends la{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=iw}},Ic=class extends la{constructor(e,r){super(e,r),this.name=sw}},Pc=class extends la{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=ow}};var og={},ag="InRuleRecoveryException",sg=class extends Error{constructor(e){super(e),this.name=ag}},Wf=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=K(e,"recoveryEnabled")?e.recoveryEnabled:vr.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=Aq)}getTokenToInsert(e){let r=_o(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,r,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],c=!1,l=this.LA(1),u=this.LA(1),f=()=>{let m=this.LA(0),T=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:l,previous:m,ruleName:this.getCurrRuleFullName()}),A=new Io(T,l,this.LA(0));A.resyncedTokens=di(a),this.SAVE_ERROR(A)};for(;!c;)if(this.tokenMatcher(u,i)){f();return}else if(n.call(this)){f(),e.apply(this,r);return}else this.tokenMatcher(u,o)?c=!0:(u=this.SKIP_TOKEN(),this.addToResyncTokens(u,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))}getFollowsForInRuleRecovery(e,r){let n=this.getCurrentGrammarPath(e,r);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new sg("sad sad panda")}canPerformInRuleRecovery(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,r){if(!this.canTokenTypeBeInsertedInRecovery(e)||se(r))return!1;let n=this.LA(1);return Gn(r,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return et(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),r=this.LA(1),n=2;for(;;){let i=Gn(e,o=>Cc(r,o));if(i!==void 0)return i;r=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return og;let e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,r=this.RULE_OCCURRENCE_STACK;return L(e,(n,i)=>i===0?og:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:r[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=L(this.buildFullFollowKeyStack(),r=>this.getFollowSetFromFollowKey(r));return Tt(e)}getFollowSetFromFollowKey(e){if(e===og)return[Tn];let r=e.ruleName+e.idxInCallingRule+Nf+e.inRule;return this.resyncFollows[r]}addToResyncTokens(e,r){return this.tokenMatcher(e,Tn)||r.push(e),r}reSyncTo(e){let r=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return di(r)}attemptInRepetitionRecovery(e,r,n,i,o,s,a){}getCurrentGrammarPath(e,r){let n=this.getHumanReadableRuleStack(),i=Ke(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r}}getHumanReadableRuleStack(){return L(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function Aq(t,e,r,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),c=this.firstAfterRepMap[a];if(c===void 0){let m=this.getCurrRuleFullName(),T=this.getGAstProductions()[m];c=new o(T,i).startWalking(),this.firstAfterRepMap[a]=c}let l=c.token,u=c.occurrence,f=c.isEndOfRule;this.RULE_STACK.length===1&&f&&l===void 0&&(l=Tn,u=1),!(l===void 0||u===void 0)&&this.shouldInRepetitionRecoveryBeTried(l,u,s)&&this.tryInRepetitionRecovery(t,e,r,l)}function Vf(t,e,r){return r|e|t}var Ore=32-8;var Ti=class{constructor(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:vr.maxLookahead}validate(e){let r=this.validateNoLeftRecursion(e.rules);if(se(r)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...r,...n,...i,...o]}return r}validateNoLeftRecursion(e){return Zt(e,r=>ig(r,r,vn))}validateEmptyOrAlternatives(e){return Zt(e,r=>QS(r,vn))}validateAmbiguousAlternationAlternatives(e,r){return Zt(e,n=>ZS(n,r,vn))}validateSomeNonEmptyLookaheadPath(e,r){return ew(e,r,vn)}buildLookaheadForAlternation(e){return GS(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,HS)}buildLookaheadForOptional(e){return jS(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,$c(e.prodType),BS)}};var Xf=class{initLooksAhead(e){this.dynamicTokensEnabled=K(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:vr.dynamicTokensEnabled,this.maxLookahead=K(e,"maxLookahead")?e.maxLookahead:vr.maxLookahead,this.lookaheadStrategy=K(e,"lookaheadStrategy")?e.lookaheadStrategy:new Ti({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){G(e,r=>{this.TRACE_INIT(`${r.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:c}=Sq(r);G(n,l=>{let u=l.idx===0?"":l.idx;this.TRACE_INIT(`${Er(l)}${u}`,()=>{let f=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:l.idx,rule:r,maxLookahead:l.maxLookahead||this.maxLookahead,hasPredicates:l.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),m=Vf(this.fullRuleNameToShort[r.name],256,l.idx);this.setLaFuncCache(m,f)})}),G(i,l=>{this.computeLookaheadFunc(r,l.idx,768,"Repetition",l.maxLookahead,Er(l))}),G(o,l=>{this.computeLookaheadFunc(r,l.idx,512,"Option",l.maxLookahead,Er(l))}),G(s,l=>{this.computeLookaheadFunc(r,l.idx,1024,"RepetitionMandatory",l.maxLookahead,Er(l))}),G(a,l=>{this.computeLookaheadFunc(r,l.idx,1536,"RepetitionMandatoryWithSeparator",l.maxLookahead,Er(l))}),G(c,l=>{this.computeLookaheadFunc(r,l.idx,1280,"RepetitionWithSeparator",l.maxLookahead,Er(l))})})})}computeLookaheadFunc(e,r,n,i,o,s){this.TRACE_INIT(`${s}${r===0?"":r}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),c=Vf(this.fullRuleNameToShort[e.name],n,r);this.setLaFuncCache(c,a)})}getKeyForAutomaticLookahead(e,r){let n=this.getLastExplicitRuleShortName();return Vf(n,e,r)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,r){this.lookAheadFuncsCache.set(e,r)}},cg=class extends Tr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},zf=new cg;function Sq(t){zf.reset(),t.accept(zf);let e=zf.dslMethods;return zf.reset(),e}function fg(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}function dg(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}function cw(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}function lw(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}var wq="name";function pg(t,e){Object.defineProperty(t,wq,{enumerable:!1,configurable:!0,writable:!1,value:e})}function Cq(t,e){let r=He(t),n=r.length;for(let i=0;i<n;i++){let o=r[i],s=t[o],a=s.length;for(let c=0;c<a;c++){let l=s[c];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}}function uw(t,e){let r=function(){};pg(r,t+"BaseSemantics");let n={visit:function(i,o){if(V(i)&&(i=i[0]),!lr(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=kq(this,e);if(!se(i)){let o=L(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}function fw(t,e,r){let n=function(){};pg(n,t+"BaseSemanticsWithDefaults");let i=Object.create(r.prototype);return G(e,o=>{i[o]=Cq}),n.prototype=i,n.prototype.constructor=n,n}var mg;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(mg||(mg={}));function kq(t,e){return Eq(t,e)}function Eq(t,e){let r=Ut(e,i=>gr(t[i])===!1),n=L(r,i=>({msg:`Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,type:mg.MISSING_METHOD,methodName:i}));return qn(n)}var Zf=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=K(e,"nodeLocationTracking")?e.nodeLocationTracking:vr.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=ct,this.cstFinallyStateUpdate=ct,this.cstPostTerminal=ct,this.cstPostNonTerminal=ct,this.cstPostRule=ct;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=dg,this.setNodeLocationFromNode=dg,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=fg,this.setNodeLocationFromNode=fg,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=ct,this.setInitialNodeLocation=ct;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN}cstPostTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];cw(n,r,e),this.setNodeLocationFromToken(n.location,r)}cstPostNonTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];lw(n,r,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(lr(this.baseCstVisitorConstructor)){let e=uw(this.className,He(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(lr(this.baseCstVisitorWithDefaultsConstructor)){let e=fw(this.className,He(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var ed=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):ua}LA(e){let r=this.currIdx+e;return r<0||this.tokVectorLength<=r?ua:this.tokVector[r]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var td=class{ACTION(e){return e.call(this)}consume(e,r,n){return this.consumeInternal(r,e,n)}subrule(e,r,n){return this.subruleInternal(r,e,n)}option(e,r){return this.optionInternal(r,e)}or(e,r){return this.orInternal(r,e)}many(e,r){return this.manyInternal(e,r)}atLeastOne(e,r){return this.atLeastOneInternal(e,r)}CONSUME(e,r){return this.consumeInternal(e,0,r)}CONSUME1(e,r){return this.consumeInternal(e,1,r)}CONSUME2(e,r){return this.consumeInternal(e,2,r)}CONSUME3(e,r){return this.consumeInternal(e,3,r)}CONSUME4(e,r){return this.consumeInternal(e,4,r)}CONSUME5(e,r){return this.consumeInternal(e,5,r)}CONSUME6(e,r){return this.consumeInternal(e,6,r)}CONSUME7(e,r){return this.consumeInternal(e,7,r)}CONSUME8(e,r){return this.consumeInternal(e,8,r)}CONSUME9(e,r){return this.consumeInternal(e,9,r)}SUBRULE(e,r){return this.subruleInternal(e,0,r)}SUBRULE1(e,r){return this.subruleInternal(e,1,r)}SUBRULE2(e,r){return this.subruleInternal(e,2,r)}SUBRULE3(e,r){return this.subruleInternal(e,3,r)}SUBRULE4(e,r){return this.subruleInternal(e,4,r)}SUBRULE5(e,r){return this.subruleInternal(e,5,r)}SUBRULE6(e,r){return this.subruleInternal(e,6,r)}SUBRULE7(e,r){return this.subruleInternal(e,7,r)}SUBRULE8(e,r){return this.subruleInternal(e,8,r)}SUBRULE9(e,r){return this.subruleInternal(e,9,r)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,r,n=fa){if(et(this.definedRulesNames,e)){let s={message:vn.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:Lt.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,r,n);return this[e]=i,i}OVERRIDE_RULE(e,r,n=fa){let i=JS(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,r,n);return this[e]=o,o}BACKTRACK(e,r){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if(Xi(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return $f(Pe(this.gastProductionsCache))}};var rd=class{initRecognizerEngine(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=oa,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},K(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(V(e)){if(se(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(V(e))this.tokensMap=lt(e,(o,s)=>(o[s.name]=s,o),{});else if(K(e,"modes")&&cr(Tt(Pe(e.modes)),$S)){let o=Tt(Pe(e.modes)),s=Zs(o);this.tokensMap=lt(s,(a,c)=>(a[c.name]=c,a),{})}else if(at(e))this.tokensMap=Ke(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=Tn;let n=K(e,"modes")?Tt(Pe(e.modes)):Pe(e),i=cr(n,o=>se(o.categoryMatches));this.tokenMatcher=i?oa:mi,hi(Pe(this.tokensMap))}defineRule(e,r,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=K(n,"resyncEnabled")?n.resyncEnabled:fa.resyncEnabled,o=K(n,"recoveryValueFunc")?n.recoveryValueFunc:fa.recoveryValueFunc,s=this.ruleShortNameIdx<<4+8;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...u){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u);let f=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(f),f}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...u){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u)}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:r})}invokeRuleCatch(e,r,n){let i=this.RULE_STACK.length===1,o=r&&!this.isBackTracking()&&this.recoveryEnabled;if(Xi(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];return c.recoveredNode=!0,c}else return n(e);else{if(this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];c.recoveredNode=!0,s.partialCstResult=c}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,r){let n=this.getKeyForAutomaticLookahead(512,r);return this.optionInternalLogic(e,r,n)}optionInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,r){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,r,n)}atLeastOneInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let s=r.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=r;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],i,1024,e,qf)}atLeastOneSepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,r,n)}atLeastOneSepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Ec],a,1536,e,Ec)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)}manyInternal(e,r){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,r,n)}manyInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let a=r.GATE;if(a!==void 0){let c=i;i=()=>a.call(this)&&c.call(this)}}else o=r;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],i,768,e,Ff,s)}manySepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,r,n)}manySepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,kc],a,1280,e,kc)}}repetitionSepSecondInternal(e,r,n,i,o){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,o],n,1536,e,o)}doSingleRepetition(e){let r=this.getLexerPosition();return e.call(this),this.getLexerPosition()>r}orInternal(e,r){let n=this.getKeyForAutomaticLookahead(256,r),i=V(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(r,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Ic(r,e))}}subruleInternal(e,r,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,r,n){throw Xi(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,r,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,r,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Io(i,r,o))}consumeInternalRecovery(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===ag?n:o}}else throw n}saveRecogState(){let e=this.errors,r=Ke(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),Tn)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var nd=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=K(e,"errorMessageProvider")?e.errorMessageProvider:vr.errorMessageProvider}SAVE_ERROR(e){if(Xi(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:Ke(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return Ke(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,r,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=ca(e,o,r,this.maxLookahead)[0],c=[];for(let u=1;u<=this.maxLookahead;u++)c.push(this.LA(u));let l=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:c,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new Pc(l,this.LA(1),this.LA(0)))}raiseNoAltException(e,r){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=aa(e,i,this.maxLookahead),s=[];for(let l=1;l<=this.maxLookahead;l++)s.push(this.LA(l));let a=this.LA(0),c=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new _c(c,this.LA(1),a))}};var id=class{initContentAssist(){}computeContentAssist(e,r){let n=this.gastProductionsCache[e];if(lr(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return Gf([n],r,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let r=Gt(e.ruleStack),i=this.getGAstProductions()[r];return new Mf(i,e).startWalking()}};var ad={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(ad);var dw=!0,pw=Math.pow(2,8)-1,hw=Lf({name:"RECORDING_PHASE_TOKEN",pattern:ht.NA});hi([hw]);var gw=_o(hw,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(gw);var Nq={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},od=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let r=e>0?e:"";this[`CONSUME${r}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${r}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${r}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${r}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${r}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${r}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${r}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${r}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,r,n){return this.consumeInternalRecord(r,e,n)},this.subrule=function(e,r,n){return this.subruleInternalRecord(r,e,n)},this.option=function(e,r){return this.optionInternalRecord(r,e)},this.or=function(e,r){return this.orInternalRecord(r,e)},this.many=function(e,r){this.manyInternalRecord(e,r)},this.atLeastOne=function(e,r){this.atLeastOneInternalRecord(e,r)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let r=0;r<10;r++){let n=r>0?r:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,r){return()=>!0}LA_RECORD(e){return ua}topLevelRuleRecord(e,r){try{let n=new yr({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,r){return Oc.call(this,ke,e,r)}atLeastOneInternalRecord(e,r){Oc.call(this,Ve,r,e)}atLeastOneSepFirstInternalRecord(e,r){Oc.call(this,ze,r,e,dw)}manyInternalRecord(e,r){Oc.call(this,pe,r,e)}manySepFirstInternalRecord(e,r){Oc.call(this,Me,r,e,dw)}orInternalRecord(e,r){return _q.call(this,e,r)}subruleInternalRecord(e,r,n){if(sd(r),!e||K(e,"ruleName")===!1){let a=new Error(`<SUBRULE${mw(r)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=Un(this.recordingProdStack),o=e.ruleName,s=new Ce({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?Nq:ad}consumeInternalRecord(e,r,n){if(sd(r),!Xh(e)){let s=new Error(`<CONSUME${mw(r)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=Un(this.recordingProdStack),o=new ae({idx:r,terminalType:e,label:n?.LABEL});return i.definition.push(o),gw}};function Oc(t,e,r,n=!1){sd(r);let i=Un(this.recordingProdStack),o=gr(e)?e:e.DEF,s=new t({definition:[],idx:r});return n&&(s.separator=e.SEP),K(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),ad}function _q(t,e){sd(e);let r=Un(this.recordingProdStack),n=V(t)===!1,i=n===!1?t:t.DEF,o=new Fe({definition:[],idx:e,ignoreAmbiguities:n&&t.IGNORE_AMBIGUITIES===!0});K(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);let s=xc(i,a=>gr(a.GATE));return o.hasPredicates=s,r.definition.push(o),G(i,a=>{let c=new We({definition:[]});o.definition.push(c),K(a,"IGNORE_AMBIGUITIES")?c.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:K(a,"GATE")&&(c.ignoreAmbiguities=!0),this.recordingProdStack.push(c),a.ALT.call(this),this.recordingProdStack.pop()}),ad}function mw(t){return t===0?"":`${t}`}function sd(t){if(t<0||t>pw){let e=new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${pw+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var cd=class{initPerformanceTracer(e){if(K(e,"traceInitPerf")){let r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=vr.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=bc(r),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return r()}};function yw(t,e){e.forEach(r=>{let n=r.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(t.prototype,i,o):t.prototype[i]=r.prototype[i]})})}var ua=_o(Tn,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(ua);var vr=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:yi,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),fa=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),Lt;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Lt||(Lt={}));function ld(t=void 0){return function(){return t}}var Lc=class t{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let r=this.className;this.TRACE_INIT("toFastProps",()=>{Ac(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),G(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=tw({rules:Pe(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(se(n)&&this.skipValidations===!1){let i=rw({rules:Pe(this.gastProductionsCache),tokenTypes:Pe(this.tokensMap),errMsgProvider:vn,grammarName:r}),o=zS({lookaheadStrategy:this.lookaheadStrategy,rules:Pe(this.gastProductionsCache),tokenTypes:Pe(this.tokensMap),grammarName:r});this.definitionErrors=this.definitionErrors.concat(i,o)}}),se(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=lS(Pe(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:Pe(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(Pe(this.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!se(this.definitionErrors))throw e=L(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),K(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=K(r,"skipValidations")?r.skipValidations:vr.skipValidations}};Lc.DEFER_DEFINITION_ERRORS_HANDLING=!1;yw(Lc,[Wf,Xf,Zf,ed,rd,td,nd,id,od,cd]);var Mc=class extends Lc{constructor(e,r=vr){let n=Ke(r);n.outputCst=!1,super(e,n)}};function Po(t,e,r){return`${t.name}_${e}_${r}`}var Yi=1,Pq=2,Tw=4,vw=5;var ma=7,Dq=8,Oq=9,Lq=10,Mq=11,xw=12,Fc=class{constructor(e){this.target=e}isEpsilon(){return!1}},da=class extends Fc{constructor(e,r){super(e),this.tokenType=r}},qc=class extends Fc{constructor(e){super(e)}isEpsilon(){return!0}},pa=class extends Fc{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};function Rw(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};Fq(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],o=Do(e,i,i);o!==void 0&&Xq(e,i,o)}return e}function Fq(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],o=jt(t,i,void 0,{type:Pq}),s=jt(t,i,void 0,{type:ma});o.stop=s,t.ruleToStartState.set(i,o),t.ruleToStopState.set(i,s)}}function bw(t,e,r){return r instanceof ae?gg(t,e,r.terminalType,r):r instanceof Ce?zq(t,e,r):r instanceof Fe?Hq(t,e,r):r instanceof ke?Bq(t,e,r):r instanceof pe?qq(t,e,r):r instanceof Me?Uq(t,e,r):r instanceof Ve?Gq(t,e,r):r instanceof ze?jq(t,e,r):Do(t,e,r)}function qq(t,e,r){let n=jt(t,e,r,{type:vw});Ji(t,n);let i=ha(t,e,n,r,Do(t,e,r));return Sw(t,e,r,i)}function Uq(t,e,r){let n=jt(t,e,r,{type:vw});Ji(t,n);let i=ha(t,e,n,r,Do(t,e,r)),o=gg(t,e,r.separator,r);return Sw(t,e,r,i,o)}function Gq(t,e,r){let n=jt(t,e,r,{type:Tw});Ji(t,n);let i=ha(t,e,n,r,Do(t,e,r));return Aw(t,e,r,i)}function jq(t,e,r){let n=jt(t,e,r,{type:Tw});Ji(t,n);let i=ha(t,e,n,r,Do(t,e,r)),o=gg(t,e,r.separator,r);return Aw(t,e,r,i,o)}function Hq(t,e,r){let n=jt(t,e,r,{type:Yi});Ji(t,n);let i=L(r.definition,s=>bw(t,e,s));return ha(t,e,n,r,...i)}function Bq(t,e,r){let n=jt(t,e,r,{type:Yi});Ji(t,n);let i=ha(t,e,n,r,Do(t,e,r));return Kq(t,e,r,i)}function Do(t,e,r){let n=Ut(L(r.definition,i=>bw(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:Vq(t,n)}function Aw(t,e,r,n,i){let o=n.left,s=n.right,a=jt(t,e,r,{type:Mq});Ji(t,a);let c=jt(t,e,r,{type:xw});return o.loopback=a,c.loopback=a,t.decisionMap[Po(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=a,_t(s,a),i===void 0?(_t(a,o),_t(a,c)):(_t(a,c),_t(a,i.left),_t(i.right,o)),{left:o,right:c}}function Sw(t,e,r,n,i){let o=n.left,s=n.right,a=jt(t,e,r,{type:Lq});Ji(t,a);let c=jt(t,e,r,{type:xw}),l=jt(t,e,r,{type:Oq});return a.loopback=l,c.loopback=l,_t(a,o),_t(a,c),_t(s,l),i!==void 0?(_t(l,c),_t(l,i.left),_t(i.right,o)):_t(l,a),t.decisionMap[Po(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=a,{left:a,right:c}}function Kq(t,e,r,n){let i=n.left,o=n.right;return _t(i,o),t.decisionMap[Po(e,"Option",r.idx)]=i,n}function Ji(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function ha(t,e,r,n,...i){let o=jt(t,e,n,{type:Dq,start:r});r.end=o;for(let a of i)a!==void 0?(_t(r,a.left),_t(a.right,o)):_t(r,o);let s={left:r,right:o};return t.decisionMap[Po(e,Wq(n),n.idx)]=r,s}function Wq(t){if(t instanceof Fe)return"Alternation";if(t instanceof ke)return"Option";if(t instanceof pe)return"Repetition";if(t instanceof Me)return"RepetitionWithSeparator";if(t instanceof Ve)return"RepetitionMandatory";if(t instanceof ze)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function Vq(t,e){let r=e.length;for(let o=0;o<r-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let c=a instanceof pa,l=a,u=e[o+1].left;s.left.type===Yi&&s.right.type===Yi&&a!==void 0&&(c&&l.followState===s.right||a.target===s.right)?(c?l.followState=u:a.target=u,Yq(t,s.right)):_t(s.right,u)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function gg(t,e,r,n){let i=jt(t,e,n,{type:Yi}),o=jt(t,e,n,{type:Yi});return yg(i,new da(o,r)),{left:i,right:o}}function zq(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),o=jt(t,e,r,{type:Yi}),s=jt(t,e,r,{type:Yi}),a=new pa(i,n,s);return yg(o,a),{left:o,right:s}}function Xq(t,e,r){let n=t.ruleToStartState.get(e);_t(n,r.left);let i=t.ruleToStopState.get(e);return _t(r.right,i),{left:n,right:i}}function _t(t,e){let r=new qc(e);yg(t,r)}function jt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function yg(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function Yq(t,e){t.states.splice(t.states.indexOf(e),1)}var Uc={},ga=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=Tg(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return L(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};function Tg(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}function Jq(t,e){let r={};return n=>{let i=n.toString(),o=r[i];return o!==void 0||(o={atnStartState:t,decision:e,states:{}},r[i]=o),o}}var ud=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},ww=new ud,Gc=class extends Ti{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=Rw(e.rules),this.dfas=Qq(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Po(n,"Alternation",r),u=this.atn.decisionMap[c].decision,f=L(Hf({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>L(m,T=>T[0]));if(Cw(f,!1)&&!o){let m=lt(f,(T,A,w)=>(G(A,N=>{N&&(T[N.tokenTypeIdx]=w,G(N.categoryMatches,C=>{T[C]=w}))}),T),{});return i?function(T){var A;let w=this.LA(1),N=m[w.tokenTypeIdx];if(T!==void 0&&N!==void 0){let C=(A=T[N])===null||A===void 0?void 0:A.GATE;if(C!==void 0&&C.call(this)===!1)return}return N}:function(){let T=this.LA(1);return m[T.tokenTypeIdx]}}else return i?function(m){let T=new ud,A=m===void 0?0:m.length;for(let N=0;N<A;N++){let C=m?.[N].GATE;T.set(N,C===void 0||C.call(this))}let w=vg.call(this,s,u,T,a);return typeof w=="number"?w:void 0}:function(){let m=vg.call(this,s,u,ww,a);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Po(n,i,r),u=this.atn.decisionMap[c].decision,f=L(Hf({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>L(m,T=>T[0]));if(Cw(f)&&f[0][0]&&!o){let m=f[0],T=Tt(m);if(T.length===1&&se(T[0].categoryMatches)){let w=T[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===w}}else{let A=lt(T,(w,N)=>(N!==void 0&&(w[N.tokenTypeIdx]=!0,G(N.categoryMatches,C=>{w[C]=!0})),w),{});return function(){let w=this.LA(1);return A[w.tokenTypeIdx]===!0}}}return function(){let m=vg.call(this,s,u,ww,a);return typeof m=="object"?!1:m===0}}};function Cw(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(r.has(a)){if(!i.has(a))return!1}else r.add(a),i.add(a)}}return!0}function Qq(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=Jq(t.decisionStates[n],n);return r}function vg(t,e,r,n){let i=t[e](r),o=i.start;if(o===void 0){let a=lU(i.atnStartState);o=$w(i,Ew(a)),i.start=o}return Zq.apply(this,[i,o,r,n])}function Zq(t,e,r,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let c=oU(i,a);if(c===void 0&&(c=eU.apply(this,[t,i,a,o,r,n])),c===Uc)return iU(s,i,a);if(c.isAcceptState===!0)return c.prediction;i=c,s.push(a),a=this.LA(o++)}}function eU(t,e,r,n,i,o){let s=sU(e.configs,r,i);if(s.size===0)return kw(t,e,r,Uc),Uc;let a=Ew(s),c=cU(s,i);if(c!==void 0)a.isAcceptState=!0,a.prediction=c,a.configs.uniqueAlt=c;else if(pU(s)){let l=eS(s.alts);a.isAcceptState=!0,a.prediction=l,a.configs.uniqueAlt=l,tU.apply(this,[t,n,s.alts,o])}return a=kw(t,e,r,a),a}function tU(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let o=t.atnStartState,s=o.rule,a=o.production,c=rU({topLevelRule:s,ambiguityIndices:r,production:a,prefixPath:i});n(c)}function rU(t){let e=L(t.prefixPath,i=>gi(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${nU(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function nU(t){if(t instanceof Ce)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof Ve)return"AT_LEAST_ONE";if(t instanceof ze)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}function iU(t,e,r){let n=Zt(e.configs.elements,o=>o.state.transitions),i=aS(n.filter(o=>o instanceof da).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function oU(t,e){return t.edges[e.tokenTypeIdx]}function sU(t,e,r){let n=new ga,i=[];for(let s of t.elements){if(r.is(s.alt)===!1)continue;if(s.state.type===ma){i.push(s);continue}let a=s.state.transitions.length;for(let c=0;c<a;c++){let l=s.state.transitions[c],u=aU(l,e);u!==void 0&&n.add({state:u,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new ga;for(let s of n.elements)fd(s,o)}if(i.length>0&&!fU(o))for(let s of i)o.add(s);return o}function aU(t,e){if(t instanceof da&&Cc(e,t.tokenType))return t.target}function cU(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function Ew(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function kw(t,e,r,n){return n=$w(t,n),e.edges[r.tokenTypeIdx]=n,n}function $w(t,e){if(e===Uc)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function lU(t){let e=new ga,r=t.transitions.length;for(let n=0;n<r;n++){let o={state:t.transitions[n].target,alt:n,stack:[]};fd(o,e)}return e}function fd(t,e){let r=t.state;if(r.type===ma){if(t.stack.length>0){let i=[...t.stack],s={state:i.pop(),alt:t.alt,stack:i};fd(s,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let o=r.transitions[i],s=uU(t,o);s!==void 0&&fd(s,e)}}function uU(t,e){if(e instanceof qc)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof pa){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function fU(t){for(let e of t.elements)if(e.state.type===ma)return!0;return!1}function dU(t){for(let e of t.elements)if(e.state.type!==ma)return!1;return!0}function pU(t){if(dU(t))return!0;let e=mU(t.elements);return hU(e)&&!gU(e)}function mU(t){let e=new Map;for(let r of t){let n=Tg(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function hU(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function gU(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}var xg=de(so(),1);var dd=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new bg(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new hd;return r.grammarSource=e,r.root=this.rootNode,this.current.content.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new md(e.startOffset,e.image.length,Ka(e),e.tokenType,!1);return n.grammarSource=r,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let r=e.container;if(r){let n=r.content.indexOf(e);n>=0&&r.content.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new md(r.startOffset,r.image.length,Ka(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let o=0;o<e.content.length;o++){let s=e.content[o],{offset:a,end:c}=s;if(kn(s)&&n>a&&i<c){this.addHiddenToken(s,r);return}else if(i<=a){e.content.splice(o,0,r);return}}e.content.push(r)}},pd=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,r;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(r=this.container)===null||r===void 0?void 0:r.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},md=class extends pd{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=r,this._range=n}},hd=class extends pd{constructor(){super(...arguments),this.content=new Rg(this)}get children(){return this.content}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:xg.Position.create(0,0),end:xg.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let r=this.content[e];if(!r.hidden)return r}return this.content[this.content.length-1]}},Rg=class t extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,t.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.container=this.parent}},bg=class extends hd{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var Sg=Symbol("Datatype");function Ag(t){return t.$type===Sg}var Nw="\u200B",_w=t=>t.endsWith(Nw)?t:t+Nw,gd=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new Cg(r,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},yd=class extends gd{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new dd,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:Fr(e)?Sg:mn(e),i=this.wrapper.DEFINE_RULE(_w(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===Sg&&(o.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:s,isCrossRef:a}=this.getAssignment(n),c=this.current;if(s){let l=pt(n)?i.image:this.converter.convert(i.image,o);this.assign(s.operator,s.feature,l,o,a)}else if(Ag(c)){let l=i.image;pt(n)||(l=this.converter.convert(l,o).toString()),c.value+=l}}}subrule(e,r,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let s=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(s,n,o)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:o}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(Ag(s))s.value+=e.toString();else{let a=e.$type,c=this.assignWithoutOverride(e,s);a&&(c.$type=a);let l=c;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return Gv(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),Ag(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=Ie(e,Re);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?zt(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,r,i,n):a=n,e){case"=":{s[r]=a;break}case"?=":{s[r]=!0;break}case"+=":Array.isArray(s[r])||(s[r]=[]),s[r].push(a)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}},wg=class{buildMismatchTokenMessage(e){return yi.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return yi.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return yi.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return yi.buildEarlyExitMessage(e)}},jc=class extends wg{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},Td=class extends gd{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(_w(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}},yU={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new jc},Cg=class extends Mc{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},yU),{lookaheadStrategy:n?new Ti({maxLookahead:r.maxLookahead}):new Gc}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}};var Hc=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};function vd(t){throw new Error("Error! The input value was not handled.")}function Rd(t,e,r){return TU({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}function TU(t,e){let r=hs(e,!1),n=ie(e.rules).filter(B).filter(i=>r.has(i));for(let i of n){let o=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,t.parser.rule(i,Oo(o,i.definition)))}}function Oo(t,e,r=!1){let n;if(pt(e))n=wU(t,e);else if(Ne(e))n=vU(t,e);else if(Re(e))n=Oo(t,e.terminal);else if(zt(e))n=Iw(t,e);else if(_e(e))n=xU(t,e);else if(Pr(e))n=bU(t,e);else if(Dr(e))n=AU(t,e);else if(Ft(e))n=SU(t,e);else throw new Hc(e.$cstNode,`Unexpected element type: ${e.$type}`);return Pw(t,r?void 0:xd(e),n,e.cardinality)}function vU(t,e){let r=mn(e);return()=>t.parser.action(r,e)}function xU(t,e){let r=e.rule.ref;if(B(r)){let n=t.subrule++,i=e.arguments.length>0?RU(r,e.arguments):()=>({});return o=>t.parser.subrule(n,Dw(t,r),e,i(o))}else if(Se(r)){let n=t.consume++,i=kg(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)vd(r);else throw new Hc(e.$cstNode,`Undefined rule type: ${e.$type}`)}function RU(t,e){let r=e.map(n=>vi(n.value));return n=>{let i={};for(let o=0;o<r.length;o++){let s=t.parameters[o],a=r[o];i[s.name]=a(n)}return i}}function vi(t){if(sv(t)){let e=vi(t.left),r=vi(t.right);return n=>e(n)||r(n)}else if(iv(t)){let e=vi(t.left),r=vi(t.right);return n=>e(n)&&r(n)}else if(fv(t)){let e=vi(t.value);return r=>!e(r)}else if(is(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if(lv(t)){let e=!!t.true;return()=>e}vd(t)}function bU(t,e){if(e.elements.length===1)return Oo(t,e.elements[0]);{let r=[];for(let i of e.elements){let o={ALT:Oo(t,i,!0)},s=xd(i);s&&(o.GATE=vi(s)),r.push(o)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function AU(t,e){if(e.elements.length===1)return Oo(t,e.elements[0]);let r=[];for(let a of e.elements){let c={ALT:Oo(t,a,!0)},l=xd(a);l&&(c.GATE=vi(l)),r.push(c)}let n=t.or++,i=(a,c)=>{let l=c.getRuleStack().join("-");return`uGroup_${a}_${l}`},o=a=>t.parser.alternatives(n,r.map((c,l)=>{let u={ALT:()=>!0},f=t.parser;u.ALT=()=>{if(c.ALT(a),!f.isRecording()){let T=i(n,f);f.unorderedGroups.get(T)||f.unorderedGroups.set(T,[]);let A=f.unorderedGroups.get(T);typeof A?.[l]>"u"&&(A[l]=!0)}};let m=c.GATE;return m?u.GATE=()=>m(a):u.GATE=()=>{let T=f.unorderedGroups.get(i(n,f));return!T?.[l]},u})),s=Pw(t,xd(e),o,"*");return a=>{s(a),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function SU(t,e){let r=e.elements.map(n=>Oo(t,n));return n=>r.forEach(i=>i(n))}function xd(t){if(Ft(t))return t.guardCondition}function Iw(t,e,r=e.terminal){if(r)if(_e(r)&&B(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,Dw(t,r.rule.ref),e,i)}else if(_e(r)&&Se(r.rule.ref)){let n=t.consume++,i=kg(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if(pt(r)){let n=t.consume++,i=kg(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=lc(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+mn(e.type.ref));return Iw(t,e,i)}}function wU(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function Pw(t,e,r,n){let i=e&&vi(e);if(!n)if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>r(s),GATE:()=>i(s)},{ALT:ld(),GATE:()=>!i(s)}])}else return r;if(n==="*"){let o=t.many++;return s=>t.parser.many(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=t.many++;if(i){let s=t.or++;return a=>t.parser.alternatives(s,[{ALT:()=>t.parser.atLeastOne(o,{DEF:()=>r(a)}),GATE:()=>i(a)},{ALT:ld(),GATE:()=>!i(a)}])}else return s=>t.parser.atLeastOne(o,{DEF:()=>r(s)})}else if(n==="?"){let o=t.optional++;return s=>t.parser.optional(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else vd(n)}function Dw(t,e){let r=CU(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function CU(t,e){if(B(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!B(n);)(Ft(n)||Pr(n)||Dr(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function kg(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}function Ow(t){let e=t.Grammar,r=t.parser.Lexer,n=new Td(t);return Rd(e,n,r.definition),n.finalize(),n}function Lw(t){let e=kU(t);return e.finalize(),e}function kU(t){let e=t.Grammar,r=t.parser.Lexer,n=new yd(t);return Rd(e,n,r.definition)}var bd=class{buildTokens(e,r){let n=ie(hs(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,r);return i.forEach(s=>{let a=s.PATTERN;typeof a=="object"&&a&&"test"in a&&oh(a)?o.unshift(s):o.push(s)}),o}buildTerminalTokens(e){return e.filter(Se).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=Yr(e),n=r.flags.includes("u")?this.regexPatternFunction(r):r,i={name:e.name,PATTERN:n,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=oh(r)?ht.SKIPPED:"hidden"),i}regexPatternFunction(e){let r=new RegExp(e,e.flags+"y");return(n,i)=>(r.lastIndex=i,r.exec(n))}buildKeywordTokens(e,r,n){return e.filter(B).flatMap(i=>Qe(i).filter(pt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,!!n?.caseInsensitive))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp(lx(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&ux("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var Ad=class{convert(e,r){let n=r.grammarSource;if(zt(n)&&(n=Au(n)),_e(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return _U(r);case"STRING":return EU(r);case"ID":return NU(r)}switch((i=bo(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return DU(r);case"boolean":return OU(r);case"bigint":return IU(r);case"date":return PU(r);default:return r}}};function EU(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=$U(i)}else e+=n}return e}function $U(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function NU(t){return t.charAt(0)==="^"?t.substring(1):t}function _U(t){return parseInt(t)}function IU(t){return BigInt(t)}function PU(t){return new Date(t)}function DU(t){return Number(t)}function OU(t){return t.toLowerCase()==="true"}var Mw=de(Ae(),1);var Sd=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=Mw.CancellationToken.None){for(let n of ti(e.parseResult.value))await Ze(r),Ql(n).forEach(i=>this.doLink(i,e))}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if(Zo(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if(Et(this._ref))return this._ref;if(HT(this._nodeDescription)){let c=o.loadAstNode(this._nodeDescription);this._ref=c??o.createLinkingError({reference:s,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let c=o.getLinkedNode({reference:s,container:e,property:r});if(c.error&&ne(e).state<je.ComputedScopes)return;this._ref=(a=c.node)!==null&&a!==void 0?a:c.error,this._nodeDescription=c.descr}return Et(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return Zo(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){try{let r=this.getCandidate(e);if(Zo(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=ne(e.container);n.state<je.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};function qw(t){return typeof t.$comment=="string"}function Fw(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var wd=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,r){let n=r?.replacer,i=(s,a)=>this.replacer(s,a,r);return JSON.stringify(e,n?(s,a)=>n(s,a,i):i,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:o,comments:s}={}){var a,c,l;if(!this.ignoreProperties.has(e))if(Qn(r)){let u=r.ref,f=n?r.$refText:void 0;return u?{$refText:f,$ref:"#"+(u&&this.astNodeLocator.getAstNodePath(u))}:{$refText:f,$error:(c=(a=r.error)===null||a===void 0?void 0:a.message)!==null&&c!==void 0?c:"Could not resolve reference"}}else{let u;if(o&&Et(r)&&(u=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&u?.$textRegion))try{u.$textRegion.documentURI=ne(r).uri.toString()}catch{}return i&&!e&&Et(r)&&(u??(u=Object.assign({},r)),u.$sourceText=(l=r.$cstNode)===null||l===void 0?void 0:l.text),s&&Et(r)&&(u??(u=Object.assign({},r)),u.$comment=this.commentProvider.getComment(r)),u??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=Ni(e.$cstNode,o).map(r);s.length!==0&&(i[o]=s)}),e}}linkNode(e,r,n,i,o){for(let[a,c]of Object.entries(e))if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];Fw(u)?c[l]=this.reviveReference(e,a,r,u):Et(u)&&this.linkNode(u,r,e,a,l)}else Fw(c)?e[a]=this.reviveReference(e,a,r,c):Et(c)&&this.linkNode(c,r,e,a);let s=e;s.$container=n,s.$containerProperty=i,s.$containerIndex=o}reviveReference(e,r,n,i){let o=i.$refText;if(i.$ref){let s=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(s)),{$refText:o??"",ref:s}}else if(i.$error){let s={$refText:o??""};return s.error={container:e,property:r,message:i.$error,reference:s},s}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};var Cd=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=ve.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};var Uw=de(Ae(),1);var kd=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=ne(e)){r??(r=this.nameProvider.getName(e));let i=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${i} has no name.`);let o,s=()=>{var a;return o??(o=ir((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:r,get nameSegment(){return s()},selectionSegment:ir(e.$cstNode),type:e.$type,documentUri:n.uri,path:i}}},Ed=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=Uw.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of ti(i))await Ze(r),Ql(o).filter(s=>!Zo(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=ne(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:ir(n),local:ve.equals(r.documentUri,i)}}};var $d=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),c=parseInt(o.substring(s+1)),l=i[a];return l?.[c]}return i[o]},e)}};var Gw=de(Ct(),1),Nd=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(Gw.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};var ya=de(Ae(),1);var _d=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Le,this.buildState=new Map,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=ya.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===je.Validated){if(typeof r.validation=="boolean"&&r.validation)s.state=je.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof r.validation=="object"){let c=this.buildState.get(a),l=(i=c?.result)===null||i===void 0?void 0:i.validationChecks;if(l){let f=((o=r.validation.categories)!==null&&o!==void 0?o:ds.all).filter(m=>!l.includes(m));f.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},r.validation),{categories:f})},result:c.result}),s.state=je.IndexedReferences)}}}else this.buildState.delete(a)}await this.buildDocuments(e,r,n)}async update(e,r,n=ya.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString());this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s)||this.langiumDocuments.getOrCreateDocument(s),this.buildState.delete(s.toString());let i=ie(e).concat(r).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,je.ComputedScopes),s.diagnostics=void 0});for(let s of this.updateListeners)s(e,r);await Ze(n);let o=this.langiumDocuments.all.filter(s=>{var a;return s.state<je.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray();await this.buildDocuments(o,this.updateBuildOptions,n)}shouldRelink(e,r){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,r)}onUpdate(e){return this.updateListeners.push(e),ya.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}async buildDocuments(e,r,n){this.prepareBuild(e,r),await this.runCancelable(e,je.Parsed,n,o=>{this.langiumDocumentFactory.update(o)}),await this.runCancelable(e,je.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,je.ComputedScopes,n,async o=>{let s=this.serviceRegistry.getServices(o.uri).references.ScopeComputation;o.precomputedScopes=await s.computeLocalScopes(o,n)}),await this.runCancelable(e,je.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,je.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o));await this.runCancelable(i,je.Validated,n,o=>this.validate(o,n));for(let o of e){let s=this.buildState.get(o.uri.toString());s&&(s.completed=!0)}}prepareBuild(e,r){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:r,result:o?.result})}}async runCancelable(e,r,n,i){let o=e.filter(s=>s.state<r);for(let s of o)await Ze(n),await i(s),s.state=r;await this.notifyBuildPhase(o,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),ya.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let o of i)await Ze(n),await o(e,n)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,r){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,c=await o.validateDocument(e,a,r);e.diagnostics?e.diagnostics.push(...c):e.diagnostics=c;let l=this.buildState.get(e.uri.toString());if(l){(n=l.result)!==null&&n!==void 0||(l.result={});let u=(i=a?.categories)!==null&&i!==void 0?i:ds.all;l.result.validationChecks?l.result.validationChecks.push(...u):l.result.validationChecks=[...u]}}getBuildOptions(e){var r,n;return(n=(r=this.buildState.get(e.uri.toString()))===null||r===void 0?void 0:r.options)!==null&&n!==void 0?n:{}}};var Eg=de(Ae(),1);var Id=class{constructor(e){this.simpleIndex=new Map,this.simpleTypeIndex=new gu,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,r){let n=ne(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{ve.equals(s.targetUri,n)&&s.targetPath===r&&i.push(s)})}),ie(i)}allElements(e,r){let n=ie(this.simpleIndex.keys());return r&&(n=n.filter(i=>!r||r.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,r){var n;return r?this.simpleTypeIndex.get(e,r,()=>{var o;return((o=this.simpleIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,r))}):(n=this.simpleIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.simpleTypeIndex.clear(n),this.referenceIndex.delete(n)}}async updateContent(e,r=Eg.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let s of i)s.node=void 0;let o=e.uri.toString();this.simpleIndex.set(o,i),this.simpleTypeIndex.clear(o)}async updateReferences(e,r=Eg.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,r){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&r.has(i.targetUri.toString())):!1}};var jw=de(Ae(),1);var Pd=class{constructor(e){this.initialBuildOptions={},this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=jw.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,o))),await Ze(r),await this.documentBuilder.build(i,this.initialBuildOptions,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return Jt.parse(e.uri)}async traverseFolder(e,r,n,i){let o=await this.fileSystemProvider.readDirectory(r);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,r,n){let i=ve.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let o=ve.extname(r.uri);return n.includes(o)}return!1}};var Dd=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=Hw(r)?Object.values(r):r;this.chevrotainLexer=new ht(n,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(Hw(e))return e;let r=Bw(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};function LU(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}function Bw(t){return t&&"modes"in t&&"defaultMode"in t}function Hw(t){return!LU(t)&&!Bw(t)}var be=de(Ae(),1);function Vw(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=be.Position.create(0,0));let o=Xw(t),s=_g(n),a=FU({lines:o,position:i,options:s});return HU({index:0,tokens:a,position:i})}function zw(t,e){let r=_g(e),n=Xw(t);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=r.start,a=r.end;return!!s?.exec(i)&&!!a?.exec(o)}function Xw(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Xa)}var Kw=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,MU=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function FU(t){var e,r,n;let i=[],o=t.position.line,s=t.position.character;for(let a=0;a<t.lines.length;a++){let c=a===0,l=a===t.lines.length-1,u=t.lines[a],f=0;if(c&&t.options.start){let T=(e=t.options.start)===null||e===void 0?void 0:e.exec(u);T&&(f=T.index+T[0].length)}else{let T=(r=t.options.line)===null||r===void 0?void 0:r.exec(u);T&&(f=T.index+T[0].length)}if(l){let T=(n=t.options.end)===null||n===void 0?void 0:n.exec(u);T&&(u=u.substring(0,T.index))}if(u=u.substring(0,jU(u)),Ng(u,0)>=u.length){if(i.length>0){let T=be.Position.create(o,s);i.push({type:"break",content:"",range:be.Range.create(T,T)})}}else{Kw.lastIndex=f;let T=Kw.exec(u);if(T){let A=T[0],w=T[1],N=be.Position.create(o,s+f),C=be.Position.create(o,s+f+A.length);i.push({type:"tag",content:w,range:be.Range.create(N,C)}),f+=A.length,f=Ng(u,f)}if(f<u.length){let A=u.substring(f),w=Array.from(A.matchAll(MU));i.push(...qU(w,A,o,s+f))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function qU(t,e,r,n){let i=[];if(t.length===0){let o=be.Position.create(r,n),s=be.Position.create(r,n+e.length);i.push({type:"text",content:e,range:be.Range.create(o,s)})}else{let o=0;for(let a of t){let c=a.index,l=e.substring(o,c);l.length>0&&i.push({type:"text",content:e.substring(o,c),range:be.Range.create(be.Position.create(r,o+n),be.Position.create(r,c+n))});let u=l.length+1,f=a[1];if(i.push({type:"inline-tag",content:f,range:be.Range.create(be.Position.create(r,o+u+n),be.Position.create(r,o+u+f.length+n))}),u+=f.length,a.length===4){u+=a[2].length;let m=a[3];i.push({type:"text",content:m,range:be.Range.create(be.Position.create(r,o+u+n),be.Position.create(r,o+u+m.length+n))})}else i.push({type:"text",content:"",range:be.Range.create(be.Position.create(r,o+u+n),be.Position.create(r,o+u+n))});o=c+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:be.Range.create(be.Position.create(r,o+n),be.Position.create(r,o+n+s.length))})}return i}var UU=/\S/,GU=/\s*$/;function Ng(t,e){let r=t.substring(e).match(UU);return r?e+r.index:t.length}function jU(t){let e=t.match(GU);if(e&&typeof e.index=="number")return e.index}function HU(t){var e,r,n,i;let o=be.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new Od([],be.Range.create(o,o));let s=[];for(;t.index<t.tokens.length;){let l=BU(t,s[s.length-1]);l&&s.push(l)}let a=(r=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:o,c=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new Od(s,be.Range.create(a,c))}function BU(t,e){let r=t.tokens[t.index];if(r.type==="tag")return Jw(t,!1);if(r.type==="text"||r.type==="inline-tag")return Yw(t);KU(r,e),t.index++}function KU(t,e){if(e){let r=new Ld("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function Yw(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(WU(t)),n=e,e=t.tokens[t.index];return new Kc(i,be.Range.create(r.range.start,n.range.end))}function WU(t){return t.tokens[t.index].type==="inline-tag"?Jw(t,!0):Qw(t)}function Jw(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let o=Qw(t);return new Bc(n,new Kc([o],o.range),e,be.Range.create(r.range.start,o.range.end))}else{let o=Yw(t);return new Bc(n,o,e,be.Range.create(r.range.start,o.range.end))}else{let o=r.range;return new Bc(n,new Kc([],o),e,o)}}function Qw(t){let e=t.tokens[t.index++];return new Ld(e.content,e.range)}function _g(t){if(!t)return _g({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:$g(e,!0),end:$g(r,!1),line:$g(n,!0)}}function $g(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?ii(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var Od=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=Ww(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=Ww(r)+i}return r.trim()}},Bc=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let o=VU(this.name,r,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function VU(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let o=e.indexOf(" "),s=e;if(o>0){let c=Ng(e,o);s=e.substring(c),e=e.substring(0,o)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(s=`\`${s}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,s))!==null&&i!==void 0?i:zU(e,s)}}function zU(t,e){try{return Jt.parse(t,!0),`[${e}](${t})`}catch{return t}}var Kc=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];r+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(r+=`
`)}return r}},Ld=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function Ww(t){return t.endsWith(`
`)?`
`:`

`}var Md=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let r=this.commentProvider.getComment(e);if(r&&zw(r))return Vw(r).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,r,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,c=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${c.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=ne(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(c=>c.name===r);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};var Fd=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var r;return qw(e)?e.$comment:(r=XT(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||r===void 0?void 0:r.text}};function hc(t){return{documentation:{CommentProvider:e=>new Fd(e),DocumentationProvider:e=>new Md(e)},parser:{GrammarConfig:e=>pR(e),LangiumParser:e=>Lw(e),CompletionParser:e=>Ow(e),ValueConverter:()=>new Ad,TokenBuilder:()=>new bd,Lexer:e=>new Dd(e),ParserErrorMessageProvider:()=>new jc},lsp:{CompletionProvider:e=>new Ss(e),DocumentSymbolProvider:e=>new Lu(e),HoverProvider:e=>new qu(e),FoldingRangeProvider:e=>new Cs(e),ReferencesProvider:e=>new Ku(e),DefinitionProvider:e=>new $s(e),DocumentHighlightProvider:e=>new Ou(e),RenameProvider:e=>new Wu(e)},workspace:{AstNodeLocator:()=>new $d,AstNodeDescriptionProvider:e=>new kd(e),ReferenceDescriptionProvider:e=>new Ed(e)},references:{Linker:e=>new Sd(e),NameProvider:()=>new us,ScopeProvider:e=>new bs(e),ScopeComputation:e=>new Rs(e),References:e=>new ks(e)},serializer:{JsonSerializer:e=>new wd(e)},validation:{DocumentValidator:e=>new xu(e),ValidationRegistry:e=>new fu(e)},shared:()=>t.shared}}function gc(t){return{ServiceRegistry:()=>new Cd,lsp:{Connection:()=>t.connection,LanguageServer:e=>new ju(e),WorkspaceSymbolProvider:e=>new Vu(e),NodeKindProvider:()=>new Hu,FuzzyMatcher:()=>new Fu},workspace:{LangiumDocuments:e=>new Gu(e),LangiumDocumentFactory:e=>new Uu(e),DocumentBuilder:e=>new _d(e),TextDocuments:()=>new Zw.TextDocuments(Qo),IndexManager:e=>new Id(e),WorkspaceManager:e=>new Pd(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new uu,ConfigurationProvider:e=>new Nd(e)}}}var xa=de(tC(),1);var rC="Condition";var nC="Expression";var iC="Statement";var XU="Type";var YU="Unit";var oC="ArithmeticCondition";var sC="BoolCondition";var aC="ArithmeticExpression";var cC="BoolExpression";var lC="RobotFunc";var JU="AssignVar";var uC="ControlStructure";var QU="declaVar";var ZU="FunCall";var eG="Return";var Ig="RobotLogic";var tG="Bool";var rG="Nbr";var nG="Void";var iG="cm";var oG="mm";var fC="Comparison";var sG="And";var aG="EqualBool";var cG="NotEqualBool";var lG="Or";var qd="SingleValueBool";var uG="AddExpression";var fG="ArithmeticOperation";var dG="MultExpression";var Ud="SingleValue";var pG="getDistance";var mG="getTimestamp";var hG="setSpeed";var gG="If";var yG="Loop";var dC="Movement";var TG="Rotation";var vG="EqualInt";var xG="Greater";var RG="Lower";var bG="NotEqualInt";var AG="ConstBool";var SG="Var";var wG="ConstInt";var CG="Back";var kG="Front";var EG="LeftSide";var $G="RightSide";var Wc=class extends uo{getAllTypes(){return["AddExpression","And","ArithmeticCondition","ArithmeticExpression","ArithmeticOperation","AssignVar","Back","Bool","BoolCondition","BoolExpression","Comparison","Condition","ConstBool","ConstInt","ControlStructure","Else","Elseif","EqualBool","EqualInt","Expression","Front","FunCall","Func","Greater","If","LeftSide","Loop","Lower","Movement","MultExpression","Nbr","NotEqualBool","NotEqualInt","Or","Parameter","Program","Return","RightSide","RobotFunc","RobotLogic","Rotation","SingleValue","SingleValueBool","Statement","Type","Unit","Var","Void","cm","declaVar","getDistance","getTimestamp","mm","setSpeed"]}computeIsSubtype(e,r){switch(e){case uG:case fG:case dG:case Ud:return this.isSubtype(aC,r);case sG:case aG:case cG:case lG:case qd:return this.isSubtype(sC,r);case oC:return this.isSubtype(rC,r);case aC:case cC:return this.isSubtype(nC,r);case JU:case uC:case QU:case eG:case Ig:return this.isSubtype(iC,r);case CG:case kG:case EG:case $G:return this.isSubtype(dC,r);case tG:case rG:case nG:return this.isSubtype(XU,r);case sC:return this.isSubtype(cC,r)||this.isSubtype(rC,r);case iG:case oG:return this.isSubtype(YU,r);case fC:return this.isSubtype(oC,r);case AG:return this.isSubtype(qd,r);case wG:return this.isSubtype(Ud,r);case vG:case xG:case RG:case bG:return this.isSubtype(fC,r);case ZU:return this.isSubtype(Ud,r)||this.isSubtype(qd,r)||this.isSubtype(iC,r);case pG:case mG:case hG:return this.isSubtype(lC,r);case gG:case yG:return this.isSubtype(uC,r);case dC:case TG:return this.isSubtype(Ig,r);case lC:return this.isSubtype(nC,r)||this.isSubtype(Ig,r);case SG:return this.isSubtype(Ud,r)||this.isSubtype(qd,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Else":return{name:"Else",mandatory:[{name:"statement",type:"array"}]};case"Elseif":return{name:"Elseif",mandatory:[{name:"statement",type:"array"}]};case"Func":return{name:"Func",mandatory:[{name:"parameter",type:"array"},{name:"statement",type:"array"}]};case"Program":return{name:"Program",mandatory:[{name:"Func",type:"array"}]};case"ArithmeticCondition":return{name:"ArithmeticCondition",mandatory:[{name:"arithmeticexpression",type:"array"}]};case"ControlStructure":return{name:"ControlStructure",mandatory:[{name:"statement",type:"array"}]};case"FunCall":return{name:"FunCall",mandatory:[{name:"parameters",type:"array"}]};case"And":return{name:"And",mandatory:[{name:"condition",type:"array"}]};case"EqualBool":return{name:"EqualBool",mandatory:[{name:"singlevaluebool",type:"array"}]};case"NotEqualBool":return{name:"NotEqualBool",mandatory:[{name:"singlevaluebool",type:"array"}]};case"Or":return{name:"Or",mandatory:[{name:"condition",type:"array"}]};case"AddExpression":return{name:"AddExpression",mandatory:[{name:"multexpression",type:"array"}]};case"MultExpression":return{name:"MultExpression",mandatory:[{name:"singlevalue",type:"array"}]};case"If":return{name:"If",mandatory:[{name:"elseif",type:"array"}]};case"ConstBool":return{name:"ConstBool",mandatory:[{name:"BoolValue",type:"boolean"}]};default:return{name:e,mandatory:[]}}}},Gce=new Wc;var Gd,pC=()=>Gd??(Gd=lu(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "AseRobot",
  "imports": [],
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Program",
      "entry": true,
      "returnType": {
        "$ref": "#/interfaces@0"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "Func",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@15"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "Func",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@15"
              },
              "arguments": []
            },
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Statement",
      "returnType": {
        "$ref": "#/interfaces@2"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@28"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@32"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type",
      "returnType": {
        "$ref": "#/interfaces@3"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@46"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Condition",
      "returnType": {
        "$ref": "#/interfaces@5"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@13"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@11"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Expression",
      "returnType": {
        "$ref": "#/interfaces@7"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@27"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@8"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@10"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@11"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Unit",
      "returnType": {
        "$ref": "#/interfaces@8"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@44"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@45"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SingleValue",
      "returnType": {
        "$ref": "#/interfaces@29"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@42"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@41"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SingleValueBool",
      "returnType": {
        "$ref": "#/interfaces@43"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@42"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArithmeticExpression",
      "returnType": {
        "$ref": "#/interfaces@9"
      },
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@9"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AddExpression",
      "returnType": {
        "$ref": "#/interfaces@10"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "multexpression",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@14"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "+"
                    },
                    {
                      "$type": "Keyword",
                      "value": "-"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "multexpression",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@14"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BoolExpression",
      "returnType": {
        "$ref": "#/interfaces@6"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@7"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@13"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArithmeticCondition",
      "returnType": {
        "$ref": "#/interfaces@34"
      },
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@12"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Comparison",
      "returnType": {
        "$ref": "#/interfaces@35"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@34"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BoolCondition",
      "returnType": {
        "$ref": "#/interfaces@42"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "MultExpression",
      "returnType": {
        "$ref": "#/interfaces@11"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "singlevalue",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@6"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "("
                  },
                  {
                    "$type": "Assignment",
                    "feature": "singlevalue",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@8"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": ")"
                  }
                ]
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "*"
                    },
                    {
                      "$type": "Keyword",
                      "value": "/"
                    }
                  ]
                }
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "singlevalue",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@6"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": "("
                      },
                      {
                        "$type": "Assignment",
                        "feature": "singlevalue",
                        "operator": "+=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@8"
                          },
                          "arguments": []
                        }
                      },
                      {
                        "$type": "Keyword",
                        "value": ")"
                      }
                    ]
                  }
                ]
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Func",
      "returnType": {
        "$ref": "#/interfaces@1"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "let"
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@2"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "parameter",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@16"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "parameter",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@16"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "statement",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Parameter",
      "returnType": {
        "$ref": "#/interfaces@4"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@2"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "If",
      "returnType": {
        "$ref": "#/interfaces@12"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "if"
          },
          {
            "$type": "Assignment",
            "feature": "condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "statement",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Assignment",
            "feature": "elseif",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@18"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Assignment",
            "feature": "else",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@19"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Elseif",
      "returnType": {
        "$ref": "#/interfaces@13"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "else"
          },
          {
            "$type": "Keyword",
            "value": "if"
          },
          {
            "$type": "Assignment",
            "feature": "condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "statement",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Else",
      "returnType": {
        "$ref": "#/interfaces@14"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "else"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "statement",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Loop",
      "returnType": {
        "$ref": "#/interfaces@16"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "loop"
          },
          {
            "$type": "Assignment",
            "feature": "condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "statement",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Front",
      "returnType": {
        "$ref": "#/interfaces@17"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Forward"
          },
          {
            "$type": "Assignment",
            "feature": "expression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "unit1",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Back",
      "returnType": {
        "$ref": "#/interfaces@20"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Backward"
          },
          {
            "$type": "Assignment",
            "feature": "expression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "unit1",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RightSide",
      "returnType": {
        "$ref": "#/interfaces@21"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Right"
          },
          {
            "$type": "Assignment",
            "feature": "expression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "unit1",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Rotation",
      "returnType": {
        "$ref": "#/interfaces@22"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Clock"
          },
          {
            "$type": "Assignment",
            "feature": "angle",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "setSpeed",
      "returnType": {
        "$ref": "#/interfaces@23"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "setSpeed("
          },
          {
            "$type": "Assignment",
            "feature": "speed",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "unit",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "getDistance",
      "returnType": {
        "$ref": "#/interfaces@25"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@25"
            }
          },
          {
            "$type": "Keyword",
            "value": "getDistance()"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "getTimestamp",
      "returnType": {
        "$ref": "#/interfaces@26"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@26"
            }
          },
          {
            "$type": "Keyword",
            "value": "getTimestamp()"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "declaVar",
      "returnType": {
        "$ref": "#/interfaces@27"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "var"
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@2"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "declaName",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "expression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FunCall",
      "returnType": {
        "$ref": "#/interfaces@28"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "callName",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@49"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "parameters",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@4"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "parameters",
                        "operator": "+=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@4"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ]
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@27"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Return",
      "returnType": {
        "$ref": "#/interfaces@30"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "return"
          },
          {
            "$type": "Assignment",
            "feature": "return",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignVar",
      "returnType": {
        "$ref": "#/interfaces@31"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "var_to_assign",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@42"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "expression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LeftSide",
      "returnType": {
        "$ref": "#/interfaces@33"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "LeftSide"
          },
          {
            "$type": "Assignment",
            "feature": "expression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "unit1",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Lower",
      "returnType": {
        "$ref": "#/interfaces@36"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "arithmeticexpression",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "arithmeticexpression",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Greater",
      "returnType": {
        "$ref": "#/interfaces@37"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "arithmeticexpression",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ">"
              },
              {
                "$type": "Assignment",
                "feature": "arithmeticexpression",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EqualInt",
      "returnType": {
        "$ref": "#/interfaces@38"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "arithmeticexpression",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=="
              },
              {
                "$type": "Assignment",
                "feature": "arithmeticexpression",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NotEqualInt",
      "returnType": {
        "$ref": "#/interfaces@39"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "arithmeticexpression",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "!="
              },
              {
                "$type": "Assignment",
                "feature": "arithmeticexpression",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EqualBool",
      "returnType": {
        "$ref": "#/interfaces@40"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "singlevaluebool",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "=="
          },
          {
            "$type": "Assignment",
            "feature": "singlevaluebool",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NotEqualBool",
      "returnType": {
        "$ref": "#/interfaces@41"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "singlevaluebool",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "!="
          },
          {
            "$type": "Assignment",
            "feature": "singlevaluebool",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "And",
      "returnType": {
        "$ref": "#/interfaces@44"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "condition",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@7"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "("
                  },
                  {
                    "$type": "Assignment",
                    "feature": "condition",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@3"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": ")"
                  }
                ]
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "and"
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "condition",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@7"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": "("
                      },
                      {
                        "$type": "Assignment",
                        "feature": "condition",
                        "operator": "+=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@3"
                          },
                          "arguments": []
                        }
                      },
                      {
                        "$type": "Keyword",
                        "value": ")"
                      }
                    ]
                  }
                ]
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Or",
      "returnType": {
        "$ref": "#/interfaces@45"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "condition",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@39"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "condition",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@12"
                  },
                  "arguments": []
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "or"
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "condition",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@39"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "condition",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@12"
                      },
                      "arguments": []
                    }
                  }
                ]
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ConstInt",
      "returnType": {
        "$ref": "#/interfaces@46"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "integerValue",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@50"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Var",
      "returnType": {
        "$ref": "#/interfaces@32"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@49"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ConstBool",
      "returnType": {
        "$ref": "#/interfaces@48"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "BoolValue",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@52"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "mm",
      "returnType": {
        "$ref": "#/interfaces@49"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@49"
            }
          },
          {
            "$type": "Keyword",
            "value": "in"
          },
          {
            "$type": "Keyword",
            "value": "mm"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "cm",
      "returnType": {
        "$ref": "#/interfaces@50"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@50"
            }
          },
          {
            "$type": "Keyword",
            "value": "in"
          },
          {
            "$type": "Keyword",
            "value": "cm"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Nbr",
      "returnType": {
        "$ref": "#/interfaces@51"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@51"
            }
          },
          {
            "$type": "Keyword",
            "value": "number"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Bool",
      "returnType": {
        "$ref": "#/interfaces@52"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@52"
            }
          },
          {
            "$type": "Keyword",
            "value": "bool"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Void",
      "returnType": {
        "$ref": "#/interfaces@53"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@53"
            }
          },
          {
            "$type": "Keyword",
            "value": "void"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "^"
            },
            "cardinality": "?"
          },
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "a"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "z"
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "A"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "Z"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "_"
                }
              }
            ]
          },
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "a"
                        },
                        "right": {
                          "$type": "Keyword",
                          "value": "z"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "A"
                        },
                        "right": {
                          "$type": "Keyword",
                          "value": "Z"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "_"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "0"
                },
                "right": {
                  "$type": "Keyword",
                  "value": "9"
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "INT",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "0"
        },
        "right": {
          "$type": "Keyword",
          "value": "9"
        },
        "cardinality": "+"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\""
                }
              },
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalGroup",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\"
                        }
                      },
                      {
                        "$type": "Wildcard"
                      }
                    ]
                  },
                  {
                    "$type": "NegatedToken",
                    "terminal": {
                      "$type": "TerminalAlternatives",
                      "elements": [
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\\\"
                          }
                        },
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\""
                          }
                        }
                      ]
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\""
                }
              }
            ]
          },
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "'"
                }
              },
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalGroup",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\"
                        }
                      },
                      {
                        "$type": "Wildcard"
                      }
                    ]
                  },
                  {
                    "$type": "NegatedToken",
                    "terminal": {
                      "$type": "TerminalAlternatives",
                      "elements": [
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\\\"
                          }
                        },
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "'"
                          }
                        }
                      ]
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "'"
                }
              }
            ]
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "BOOL",
      "type": {
        "$type": "ReturnType",
        "name": "boolean"
      },
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "true"
            }
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "false"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "/*"
            }
          },
          {
            "$type": "UntilToken",
            "terminal": {
              "$type": "CharacterRange",
              "left": {
                "$type": "Keyword",
                "value": "*/"
              }
            }
          }
        ]
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "//"
            }
          },
          {
            "$type": "NegatedToken",
            "terminal": {
              "$type": "TerminalAlternatives",
              "elements": [
                {
                  "$type": "CharacterRange",
                  "left": {
                    "$type": "Keyword",
                    "value": "\\n"
                  }
                },
                {
                  "$type": "CharacterRange",
                  "left": {
                    "$type": "Keyword",
                    "value": "\\r"
                  }
                }
              ]
            }
          },
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\r"
                },
                "cardinality": "?"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\n"
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": " "
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "\\t"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\r"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "\\n"
            }
          }
        ],
        "cardinality": "+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "ANY_OTHER",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "Wildcard"
      },
      "fragment": false,
      "hidden": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "interfaces": [
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Func",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@1"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Program",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "statement",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@2"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "name",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "type",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@3"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "parameter",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@4"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Func",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "Statement",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "Type",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "name",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "type",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@3"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Parameter",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "Condition",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "BoolExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@7"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Expression",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "Unit",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "ArithmeticExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@7"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "multexpression",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@11"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "op",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        }
      ],
      "name": "AddExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@9"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "singlevalue",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@9"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "op",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        }
      ],
      "name": "MultExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@9"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "elseif",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@13"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "else",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@14"
            }
          }
        }
      ],
      "name": "If",
      "superTypes": [
        {
          "$ref": "#/interfaces@15"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "condition",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@5"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "statement",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@2"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Elseif",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "statement",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@2"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Else",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "condition",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@5"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "statement",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@2"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "ControlStructure",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Loop",
      "superTypes": [
        {
          "$ref": "#/interfaces@15"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Front",
      "superTypes": [
        {
          "$ref": "#/interfaces@18"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "expression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@9"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "unit1",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@8"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Movement",
      "superTypes": [
        {
          "$ref": "#/interfaces@19"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "RobotLogic",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Back",
      "superTypes": [
        {
          "$ref": "#/interfaces@18"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "RightSide",
      "superTypes": [
        {
          "$ref": "#/interfaces@18"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "angle",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@9"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Rotation",
      "superTypes": [
        {
          "$ref": "#/interfaces@19"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "unit",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@8"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "speed",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@9"
            }
          },
          "isOptional": false
        }
      ],
      "name": "setSpeed",
      "superTypes": [
        {
          "$ref": "#/interfaces@24"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "RobotFunc",
      "superTypes": [
        {
          "$ref": "#/interfaces@19"
        },
        {
          "$ref": "#/interfaces@7"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "getDistance",
      "superTypes": [
        {
          "$ref": "#/interfaces@24"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "getTimestamp",
      "superTypes": [
        {
          "$ref": "#/interfaces@24"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "type",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@3"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "declaName",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "expression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@7"
            }
          },
          "isOptional": false
        }
      ],
      "name": "declaVar",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "callName",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "parameters",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@7"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "FunCall",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        },
        {
          "$ref": "#/interfaces@29"
        },
        {
          "$ref": "#/interfaces@43"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "SingleValue",
      "superTypes": [
        {
          "$ref": "#/interfaces@9"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "return",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@7"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Return",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "var_to_assign",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@32"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "expression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@7"
            }
          },
          "isOptional": false
        }
      ],
      "name": "AssignVar",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "name",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Var",
      "superTypes": [
        {
          "$ref": "#/interfaces@29"
        },
        {
          "$ref": "#/interfaces@43"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "LeftSide",
      "superTypes": [
        {
          "$ref": "#/interfaces@18"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "arithmeticexpression",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@9"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "ArithmeticCondition",
      "superTypes": [
        {
          "$ref": "#/interfaces@5"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Comparison",
      "superTypes": [
        {
          "$ref": "#/interfaces@34"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Lower",
      "superTypes": [
        {
          "$ref": "#/interfaces@35"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Greater",
      "superTypes": [
        {
          "$ref": "#/interfaces@35"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "EqualInt",
      "superTypes": [
        {
          "$ref": "#/interfaces@35"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "NotEqualInt",
      "superTypes": [
        {
          "$ref": "#/interfaces@35"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "singlevaluebool",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@43"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "EqualBool",
      "superTypes": [
        {
          "$ref": "#/interfaces@42"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "singlevaluebool",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@43"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "NotEqualBool",
      "superTypes": [
        {
          "$ref": "#/interfaces@42"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "BoolCondition",
      "superTypes": [
        {
          "$ref": "#/interfaces@5"
        },
        {
          "$ref": "#/interfaces@6"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "SingleValueBool",
      "superTypes": [
        {
          "$ref": "#/interfaces@42"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "condition",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@5"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "And",
      "superTypes": [
        {
          "$ref": "#/interfaces@42"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "condition",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@5"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Or",
      "superTypes": [
        {
          "$ref": "#/interfaces@42"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "integerValue",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "primitiveType": "number"
          }
        }
      ],
      "name": "ConstInt",
      "superTypes": [
        {
          "$ref": "#/interfaces@29"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "ArithmeticOperation",
      "superTypes": [
        {
          "$ref": "#/interfaces@9"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "BoolValue",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "primitiveType": "boolean"
          }
        }
      ],
      "name": "ConstBool",
      "superTypes": [
        {
          "$ref": "#/interfaces@43"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "mm",
      "superTypes": [
        {
          "$ref": "#/interfaces@8"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "cm",
      "superTypes": [
        {
          "$ref": "#/interfaces@8"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Nbr",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Bool",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Void",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ],
      "attributes": []
    }
  ],
  "types": [
    {
      "$type": "Type",
      "name": "Str",
      "type": {
        "$type": "SimpleType",
        "primitiveType": "string"
      }
    },
    {
      "$type": "Type",
      "name": "Int",
      "type": {
        "$type": "SimpleType",
        "primitiveType": "string"
      }
    },
    {
      "$type": "Type",
      "name": "Boolean",
      "type": {
        "$type": "SimpleType",
        "primitiveType": "string"
      }
    }
  ],
  "usedGrammars": []
}`));var NG={languageId:"ase-robot",fileExtensions:[".rob"],caseInsensitive:!1},mC={AstReflection:()=>new Wc},hC={Grammar:()=>pC(),LanguageMetaData:()=>NG,parser:{}};var jd=class{constructor(e,r,n){this.name=e,this.parameters=r,this.returnType=n}};function gC(t){let e=t.validation.ValidationRegistry,r=t.validation.AseRobotValidator,n={Program:r.checkProgram,Func:r.checkFunction};e.register(n,r)}var Hd=class{constructor(){this.vars=new Map}checkFunctions(e,r){let n=new Map,i=e.Func;for(let o of i){for(let a of n.values())a.name===o.name&&r("error","Function already exists",{node:o,property:"name"});let s=new Map;for(let a of o.parameter)s.set(a.name,a.type);n.set(o.name,new jd(o.name,s,o.type))}for(let o of i)for(let s of o.statement)if(this.isFunCall(s)){let a=!1;for(let c of n.values())s.callName===c.name&&(a=!0);if(!a)r("error","Function doesnt exist",{node:s,property:"callName"});else{let c=n.get(s.callName);c?.parameters.size!=s.parameters.length&&r("error","Wrong number of arguments",{node:s,property:"parameters"})}}}checkProgram(e,r){this.checkFunctions(e,r)}isDeclaVar(e){return"declaName"in e}isFunCall(e){return"callName"in e}isAssignVar(e){return"var_to_assign"in e}checkAssignVarExist(e,r){let n=[];for(let i of e.statement)if(this.isAssignVar(i)){let o=!1;for(let s of n)i.var_to_assign.name===s.declaName&&(o=!0);o||r("error","Variable doesnt exist",{node:i,property:"var_to_assign"})}else this.isDeclaVar(i)&&n.push(i)}checkDeclaVar(e,r){let n=[],i=[];for(let o of e.statement)this.isDeclaVar(o)&&i.push(o);for(let o of i){let s=!1;for(let a of n)o.declaName===a&&(r("error","Variable already exists",{node:o,property:"declaName"}),s=!0);s||n.push(o.declaName)}}checkFunction(e,r){this.checkAssignVarExist(e,r),this.checkDeclaVar(e,r)}variableExists(e){for(let r of this.vars.keys())if(r===e)return!0;return!1}};function yC(t){console.log("weave Accept Methods");let e=t.validation.ValidationRegistry,r=t.validation.AseRobotAcceptWeaver;e.register(r.checks,r)}var Bd=class{constructor(){this.checks={Else:this.weaveElse,Elseif:this.weaveElseif,Func:this.weaveFunc,Program:this.weaveProgram,FunCall:this.weaveFunCall,AssignVar:this.weaveAssignVar,declaVar:this.weavedeclaVar,Return:this.weaveReturn,And:this.weaveAnd,Or:this.weaveOr,EqualBool:this.weaveEqualBool,NotEqualBool:this.weaveNotEqualBool,getDistance:this.weavegetDistance,getTimestamp:this.weavegetTimestamp,setSpeed:this.weavesetSpeed,If:this.weaveIf,Loop:this.weaveLoop,Rotation:this.weaveRotation,EqualInt:this.weaveEqualInt,NotEqualInt:this.weaveNotEqualInt,Greater:this.weaveGreater,Lower:this.weaveLower,ConstBool:this.weaveConstBool,Var:this.weaveVar,ConstInt:this.weaveConstInt,Back:this.weaveBack,Front:this.weaveFront,LeftSide:this.weaveLeftSide,RightSide:this.weaveRightSide,AddExpression:this.weaveAddExpression,MultExpression:this.weaveMultExpression,mm:this.weaveMm,cm:this.weaveCm}}weaveMm(e){e.accept=r=>r.visitMm(e)}weaveCm(e){e.accept=r=>r.visitCm(e)}weaveElse(e){e.accept=r=>r.visitElse(e)}weaveElseif(e){e.accept=r=>r.visitElseif(e)}weaveAddExpression(e){e.accept=r=>r.visitAddExpression(e)}weaveOr(e){e.accept=r=>r.visitOr(e)}weaveMultExpression(e){e.accept=r=>r.visitMultExpression(e)}weaveFunc(e){console.log("weaveFunction"),e.accept=r=>r.visitFunc(e)}weaveProgram(e){console.log("weaveProgram"),e.accept=r=>r.visitProgram(e),console.log("accept interface Program !")}weaveFunCall(e){e.accept=r=>r.visitFunCall(e)}weaveAssignVar(e){e.accept=r=>r.visitAssignVar(e)}weavedeclaVar(e){e.accept=r=>r.visitdeclaVar(e)}weaveReturn(e){e.accept=r=>r.visitReturn(e)}weaveAnd(e){e.accept=r=>r.visitAnd(e)}weaveEqualBool(e){e.accept=r=>r.visitEqualBool(e)}weaveNotEqualBool(e){e.accept=r=>r.visitNotEqualBool(e)}weavegetDistance(e){e.accept=r=>r.visitgetDistance(e)}weavegetTimestamp(e){e.accept=r=>r.visitgetTimestamp(e)}weavesetSpeed(e){e.accept=r=>r.visitsetSpeed(e)}weaveIf(e){e.accept=r=>r.visitIf(e)}weaveLoop(e){e.accept=r=>r.visitLoop(e)}weaveRotation(e){e.accept=r=>r.visitRotation(e)}weaveEqualInt(e){e.accept=r=>r.visitEqualInt(e)}weaveNotEqualInt(e){e.accept=r=>r.visitNotEqualInt(e)}weaveGreater(e){e.accept=r=>r.visitGreater(e)}weaveLower(e){e.accept=r=>r.visitLower(e)}weaveConstBool(e){e.accept=r=>r.visitConstBool(e)}weaveVar(e){e.accept=r=>r.visitVar(e)}weaveConstInt(e){e.accept=r=>r.visitConstInt(e)}weaveBack(e){e.accept=r=>r.visitBack(e)}weaveFront(e){e.accept=r=>r.visitFront(e)}weaveLeftSide(e){e.accept=r=>r.visitLeftSide(e)}weaveRightSide(e){e.accept=r=>r.visitRightSide(e)}};var TC=(t=0)=>e=>`\x1B[${e+t}m`,vC=(t=0)=>e=>`\x1B[${38+t};5;${e}m`,xC=(t=0)=>(e,r,n)=>`\x1B[${38+t};2;${e};${r};${n}m`,nt={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}},Qce=Object.keys(nt.modifier),_G=Object.keys(nt.color),IG=Object.keys(nt.bgColor),Zce=[..._G,...IG];function PG(){let t=new Map;for(let[e,r]of Object.entries(nt)){for(let[n,i]of Object.entries(r))nt[n]={open:`\x1B[${i[0]}m`,close:`\x1B[${i[1]}m`},r[n]=nt[n],t.set(i[0],i[1]);Object.defineProperty(nt,e,{value:r,enumerable:!1})}return Object.defineProperty(nt,"codes",{value:t,enumerable:!1}),nt.color.close="\x1B[39m",nt.bgColor.close="\x1B[49m",nt.color.ansi=TC(),nt.color.ansi256=vC(),nt.color.ansi16m=xC(),nt.bgColor.ansi=TC(10),nt.bgColor.ansi256=vC(10),nt.bgColor.ansi16m=xC(10),Object.defineProperties(nt,{rgbToAnsi256:{value(e,r,n){return e===r&&r===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)},enumerable:!1},hexToRgb:{value(e){let r=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!r)return[0,0,0];let[n]=r;n.length===3&&(n=[...n].map(o=>o+o).join(""));let i=Number.parseInt(n,16);return[i>>16&255,i>>8&255,i&255]},enumerable:!1},hexToAnsi256:{value:e=>nt.rgbToAnsi256(...nt.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return 90+(e-8);let r,n,i;if(e>=232)r=((e-232)*10+8)/255,n=r,i=r;else{e-=16;let a=e%36;r=Math.floor(e/36)/5,n=Math.floor(a/6)/5,i=a%6/5}let o=Math.max(r,n,i)*2;if(o===0)return 30;let s=30+(Math.round(i)<<2|Math.round(n)<<1|Math.round(r));return o===2&&(s+=60),s},enumerable:!1},rgbToAnsi:{value:(e,r,n)=>nt.ansi256ToAnsi(nt.rgbToAnsi256(e,r,n)),enumerable:!1},hexToAnsi:{value:e=>nt.ansi256ToAnsi(nt.hexToAnsi256(e)),enumerable:!1}}),nt}var DG=PG(),xn=DG;var Kd=(()=>{if(navigator.userAgentData){let t=navigator.userAgentData.brands.find(({brand:e})=>e==="Chromium");if(t&&t.version>93)return 3}return/\b(Chrome|Chromium)\//.test(navigator.userAgent)?1:0})(),RC=Kd!==0&&{level:Kd,hasBasic:!0,has256:Kd>=2,has16m:Kd>=3},OG={stdout:RC,stderr:RC},bC=OG;function AC(t,e,r){let n=t.indexOf(e);if(n===-1)return t;let i=e.length,o=0,s="";do s+=t.slice(o,n)+e+r,o=n+i,n=t.indexOf(e,o);while(n!==-1);return s+=t.slice(o),s}function SC(t,e,r,n){let i=0,o="";do{let s=t[n-1]==="\r";o+=t.slice(i,s?n-1:n)+e+(s?`\r
`:`
`)+r,i=n+1,n=t.indexOf(`
`,i)}while(n!==-1);return o+=t.slice(i),o}var{stdout:wC,stderr:CC}=bC,Pg=Symbol("GENERATOR"),Ta=Symbol("STYLER"),Vc=Symbol("IS_EMPTY"),kC=["ansi","ansi","ansi256","ansi16m"],va=Object.create(null),LG=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let r=wC?wC.level:0;t.level=e.level===void 0?r:e.level};var MG=t=>{let e=(...r)=>r.join(" ");return LG(e,t),Object.setPrototypeOf(e,zc.prototype),e};function zc(t){return MG(t)}Object.setPrototypeOf(zc.prototype,Function.prototype);for(let[t,e]of Object.entries(xn))va[t]={get(){let r=Wd(this,Og(e.open,e.close,this[Ta]),this[Vc]);return Object.defineProperty(this,t,{value:r}),r}};va.visible={get(){let t=Wd(this,this[Ta],!0);return Object.defineProperty(this,"visible",{value:t}),t}};var Dg=(t,e,r,...n)=>t==="rgb"?e==="ansi16m"?xn[r].ansi16m(...n):e==="ansi256"?xn[r].ansi256(xn.rgbToAnsi256(...n)):xn[r].ansi(xn.rgbToAnsi(...n)):t==="hex"?Dg("rgb",e,r,...xn.hexToRgb(...n)):xn[r][t](...n),FG=["rgb","hex","ansi256"];for(let t of FG){va[t]={get(){let{level:r}=this;return function(...n){let i=Og(Dg(t,kC[r],"color",...n),xn.color.close,this[Ta]);return Wd(this,i,this[Vc])}}};let e="bg"+t[0].toUpperCase()+t.slice(1);va[e]={get(){let{level:r}=this;return function(...n){let i=Og(Dg(t,kC[r],"bgColor",...n),xn.bgColor.close,this[Ta]);return Wd(this,i,this[Vc])}}}}var qG=Object.defineProperties(()=>{},{...va,level:{enumerable:!0,get(){return this[Pg].level},set(t){this[Pg].level=t}}}),Og=(t,e,r)=>{let n,i;return r===void 0?(n=t,i=e):(n=r.openAll+t,i=e+r.closeAll),{open:t,close:e,openAll:n,closeAll:i,parent:r}},Wd=(t,e,r)=>{let n=(...i)=>UG(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,qG),n[Pg]=t,n[Ta]=e,n[Vc]=r,n},UG=(t,e)=>{if(t.level<=0||!e)return t[Vc]?"":e;let r=t[Ta];if(r===void 0)return e;let{openAll:n,closeAll:i}=r;if(e.includes("\x1B"))for(;r!==void 0;)e=AC(e,r.close,r.open),r=r.parent;let o=e.indexOf(`
`);return o!==-1&&(e=SC(e,i,n,o)),n+e+i};Object.defineProperties(zc.prototype,va);var GG=zc(),sle=zc({level:CC?CC.level:0});var Lg=GG;var Vd=class{constructor(e){this.$type=e}accept(e){console.log("acceptProgram concrete"),e.visitProgram(this)}};var zd=class{constructor(e){this.vars=[],this.program=new Vd("Program"),this.scene=e}visitMultExpression(e){let r=e.singlevalue[0].accept(this);for(let n=1;n<e.singlevalue.length;n++)e.op[n]==="*"?r=r*e.singlevalue[n].accept(this):e.op==="/"&&(r=r/e.singlevalue[n].accept(this));return r}visitAddExpression(e){let r=e.multexpression[0].accept(this);for(let n=1;n<e.multexpression.length;n++)e.op[n]==="+"?r=r+e.multexpression[n].accept(this):e.op==="-"&&(r=r-e.multexpression[n].accept(this));return r}visitElse(e){e.statement.forEach(r=>r.accept(this))}visitElseif(e){e.condition.accept(this)&&e.statement.forEach(r=>r.accept(this))}visitFunc(e){console.log("Rentr\xE9 dans la fonction !"),this.vars.push(new Map),e.statement.forEach(r=>{let n=this.isReturn(r),i=this.isControleStructure(r);if(n||i&&r.accept(this)!=null){let o=r.accept(this);return this.vars.pop(),console.log(e.name," : ",o),o}else r.accept(this)})}visitFunCall(e){this.program.Func.forEach(r=>{if(r.name==e.callName){this.vars.push(new Map);for(let n=0;n<e.parameters.length;n++)this.vars[this.vars.length-1].set(r.parameter[n].name,e.parameters[n].accept(this));return r.accept(this)}})}visitAssignVar(e){this.vars[this.vars.length-1].set(e.var_to_assign.name,e.expression.accept(this))}visitdeclaVar(e){this.vars[this.vars.length-1].set(e.declaName,e.expression.accept(this))}visitReturn(e){return e.return.accept(this)}visitAnd(e){let r=e.condition[0].accept(this);for(let n=1;n<e.condition.length;n++)r=r&&e.condition[n].accept(this);return r}visitOr(e){let r=e.condition[0].accept(this);for(let n=1;n<e.condition.length;n++)r=r||e.condition[n].accept(this);return r}visitEqualBool(e){return e.singlevaluebool[0].accept(this)===e.singlevaluebool[1].accept(this)}visitNotEqualBool(e){return e.singlevaluebool[0].accept(this)!==e.singlevaluebool[1].accept(this)}visitgetDistance(e){let r=this.scene.robot.getRay().intersect(this.scene.entities);return Math.sqrt(Math.pow(r.x-this.scene.robot.pos.x,2)+Math.pow(r.y-this.scene.robot.pos.y,2))}visitgetTimestamp(e){throw new Error("Method not implemented.")}visitsetSpeed(e){throw new Error("Method not implemented.")}visitIf(e){return e.condition.accept(this)&&e.statement.forEach(r=>{if(this.isReturn(r)){let i=r.accept(this);return this.vars.pop(),i}else r.accept(this)}),null}visitLoop(e){for(;e.condition.accept(this);)e.statement.forEach(r=>{if(this.isReturn(r)){let i=r.accept(this);return this.vars.pop(),i}else r.accept(this)});return null}visitRotation(e){this.scene.robot.turn(e.angle.accept(this))}visitEqualInt(e){return e.arithmeticexpression[0].accept(this)===e.arithmeticexpression[1].accept(this)}visitNotEqualInt(e){return e.arithmeticexpression[0].accept(this)!==e.arithmeticexpression[1].accept(this)}visitGreater(e){return e.arithmeticexpression[0].accept(this)>e.arithmeticexpression[1].accept(this)}visitLower(e){return e.arithmeticexpression[0].accept(this)<e.arithmeticexpression[1].accept(this)}visitConstBool(e){return e.BoolValue}visitVar(e){return this.vars[this.vars.length-1].get(e.name)}visitConstInt(e){return e.integerValue}visitBack(e){e.unit1.accept(this)==="cm"?this.scene.robot.move(-e.expression.accept(this)):this.scene.robot.move(-e.expression.accept(this)/10)}visitFront(e){e.unit1.accept(this)==="cm"?this.scene.robot.move(e.expression.accept(this)):this.scene.robot.move(e.expression.accept(this)/10)}visitLeftSide(e){e.unit1.accept(this)==="cm"?this.scene.robot.side(e.expression.accept(this)):this.scene.robot.move(e.expression.accept(this)/10)}visitRightSide(e){e.unit1.accept(this)==="cm"?this.scene.robot.side(-e.expression.accept(this)):this.scene.robot.move(-e.expression.accept(this)/10)}visitCm(e){return"cm"}visitMm(e){return"mm"}visitProgram(e){this.program=e,console.log("Rentr\xE9 dans le programme !"),e.Func.forEach(r=>r.accept(this))}isReturn(e){return"return"in e}isControleStructure(e){return"condition"in e&&"statement"in e}};async function EC(t,e){let r=e.shared.workspace.LangiumDocumentFactory.fromString(t,sh.parse("memory://aserobot.document"));await e.shared.workspace.DocumentBuilder.build([r],{validation:!0});let n=r.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?console.log(Lg.green("Parsed and validated your code successfully!")):console.log(Lg.red("Failed to parse and validate your codes!")),n?.value}async function $C(t){let e=Xc(wo).AseRobot,r=await EC(t,e);return Promise.resolve(r)}async function NC(t,e){let r=Xc(wo).AseRobot,n=await EC(t,r),i=new zd(e);n.accept(i)}var jG={validation:{AseRobotValidator:()=>new Hd,AseRobotAcceptWeaver:()=>new Bd}};function Xc(t){let e=po(gc(t),mC),r=po(hc({shared:e}),hC,jG);return e.lsp.ExecuteCommandHandler=new Mg,e.ServiceRegistry.register(r),gC(r),yC(r),{shared:e,AseRobot:r}}var Mg=class extends Mu{registerCommands(e){e("parseAndValidate",r=>$C(r[0])),e("interprate",r=>NC(r[0],r[1]))}};var HG=new xa.BrowserMessageReader(self),BG=new xa.BrowserMessageWriter(self),KG=(0,xa.createConnection)(HG,BG),{shared:WG}=Xc(Object.assign({connection:KG},wo));Zx(WG);})();
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
