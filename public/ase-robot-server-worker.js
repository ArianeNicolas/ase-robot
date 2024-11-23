"use strict";(()=>{var HC=Object.create;var lp=Object.defineProperty;var BC=Object.getOwnPropertyDescriptor;var KC=Object.getOwnPropertyNames;var WC=Object.getPrototypeOf,VC=Object.prototype.hasOwnProperty;var Jg=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,t)=>(typeof require<"u"?require:e)[t]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var H=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),zC=(r,e)=>{for(var t in e)lp(r,t,{get:e[t],enumerable:!0})},XC=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of KC(e))!VC.call(r,i)&&i!==t&&lp(r,i,{get:()=>e[i],enumerable:!(n=BC(e,i))||n.enumerable});return r};var de=(r,e,t)=>(t=r!=null?HC(WC(r)):{},XC(e||!r||!r.__esModule?lp(t,"default",{value:r,enumerable:!0}):t,r));var zn=H(dp=>{"use strict";Object.defineProperty(dp,"__esModule",{value:!0});var up;function fp(){if(up===void 0)throw new Error("No runtime abstraction layer installed");return up}(function(r){function e(t){if(t===void 0)throw new Error("No runtime abstraction layer provided");up=t}r.install=e})(fp||(fp={}));dp.default=fp});var pp=H(Na=>{"use strict";Object.defineProperty(Na,"__esModule",{value:!0});Na.Disposable=void 0;var YC;(function(r){function e(t){return{dispose:t}}r.create=e})(YC=Na.Disposable||(Na.Disposable={}))});var ao=H(so=>{"use strict";Object.defineProperty(so,"__esModule",{value:!0});so.Emitter=so.Event=void 0;var JC=zn(),QC;(function(r){let e={dispose(){}};r.None=function(){return e}})(QC=so.Event||(so.Event={}));var mp=class{add(e,t=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(t),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,t)})}remove(e,t=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===t){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let t=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{t.push(n[o].apply(i[o],e))}catch(a){(0,JC.default)().console.error(a)}return t}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},sl=class r{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,t,n)=>{this._callbacks||(this._callbacks=new mp),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,t);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,t),i.dispose=r._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};so.Emitter=sl;sl._noop=function(){}});var Qg=H(al=>{"use strict";Object.defineProperty(al,"__esModule",{value:!0});al.AbstractMessageBuffer=void 0;var ZC=13,ek=10,tk=`\r
`,hp=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let t=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(t),this._totalLength+=t.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,t=0,n=0,i=0;e:for(;t<this._chunks.length;){let c=this._chunks[t];for(n=0;n<c.length;){switch(c[n]){case ZC:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case ek:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=c.byteLength,t++}if(e!==4)return;let o=this._read(i+n),s=new Map,a=this.toString(o,"ascii").split(tk);if(a.length<2)return s;for(let c=0;c<a.length-2;c++){let l=a[c],u=l.indexOf(":");if(u===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,u),m=l.substr(u+1).trim();s.set(f,m)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let t=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);t.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else t.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return t}};al.AbstractMessageBuffer=hp});var ty=H(vp=>{"use strict";Object.defineProperty(vp,"__esModule",{value:!0});var Zg=zn(),Ho=pp(),rk=ao(),nk=Qg(),cl=class r extends nk.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return r.emptyBuffer}fromString(e,t){return new TextEncoder().encode(e)}toString(e,t){return t==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(t).decode(e)}asNative(e,t){return t===void 0?e:e.slice(0,t)}allocNative(e){return new Uint8Array(e)}};cl.emptyBuffer=new Uint8Array(0);var gp=class{constructor(e){this.socket=e,this._onData=new rk.Emitter,this._messageListener=t=>{t.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,Zg.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),Ho.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Ho.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Ho.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},yp=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),Ho.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Ho.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Ho.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,t){if(typeof e=="string"){if(t!==void 0&&t!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${t}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},ik=new TextEncoder,ey=Object.freeze({messageBuffer:Object.freeze({create:r=>new cl(r)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(r,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(ik.encode(JSON.stringify(r,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(r,e)=>{if(!(r instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(r)))}})}),stream:Object.freeze({asReadableStream:r=>new gp(r),asWritableStream:r=>new yp(r)}),console,timer:Object.freeze({setTimeout(r,e,...t){let n=setTimeout(r,e,...t);return{dispose:()=>clearTimeout(n)}},setImmediate(r,...e){let t=setTimeout(r,0,...e);return{dispose:()=>clearTimeout(t)}},setInterval(r,e,...t){let n=setInterval(r,e,...t);return{dispose:()=>clearInterval(n)}}})});function Tp(){return ey}(function(r){function e(){Zg.default.install(ey)}r.install=e})(Tp||(Tp={}));vp.default=Tp});var Bo=H(nr=>{"use strict";Object.defineProperty(nr,"__esModule",{value:!0});nr.stringArray=nr.array=nr.func=nr.error=nr.number=nr.string=nr.boolean=void 0;function ok(r){return r===!0||r===!1}nr.boolean=ok;function ry(r){return typeof r=="string"||r instanceof String}nr.string=ry;function sk(r){return typeof r=="number"||r instanceof Number}nr.number=sk;function ak(r){return r instanceof Error}nr.error=ak;function ck(r){return typeof r=="function"}nr.func=ck;function ny(r){return Array.isArray(r)}nr.array=ny;function lk(r){return ny(r)&&r.every(e=>ry(e))}nr.stringArray=lk});var Hp=H(z=>{"use strict";Object.defineProperty(z,"__esModule",{value:!0});z.Message=z.NotificationType9=z.NotificationType8=z.NotificationType7=z.NotificationType6=z.NotificationType5=z.NotificationType4=z.NotificationType3=z.NotificationType2=z.NotificationType1=z.NotificationType0=z.NotificationType=z.RequestType9=z.RequestType8=z.RequestType7=z.RequestType6=z.RequestType5=z.RequestType4=z.RequestType3=z.RequestType2=z.RequestType1=z.RequestType=z.RequestType0=z.AbstractMessageSignature=z.ParameterStructures=z.ResponseError=z.ErrorCodes=void 0;var co=Bo(),iy;(function(r){r.ParseError=-32700,r.InvalidRequest=-32600,r.MethodNotFound=-32601,r.InvalidParams=-32602,r.InternalError=-32603,r.jsonrpcReservedErrorRangeStart=-32099,r.serverErrorStart=-32099,r.MessageWriteError=-32099,r.MessageReadError=-32098,r.PendingResponseRejected=-32097,r.ConnectionInactive=-32096,r.ServerNotInitialized=-32002,r.UnknownErrorCode=-32001,r.jsonrpcReservedErrorRangeEnd=-32e3,r.serverErrorEnd=-32e3})(iy=z.ErrorCodes||(z.ErrorCodes={}));var xp=class r extends Error{constructor(e,t,n){super(t),this.code=co.number(e)?e:iy.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,r.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};z.ResponseError=xp;var br=class r{constructor(e){this.kind=e}static is(e){return e===r.auto||e===r.byName||e===r.byPosition}toString(){return this.kind}};z.ParameterStructures=br;br.auto=new br("auto");br.byPosition=new br("byPosition");br.byName=new br("byName");var Xe=class{constructor(e,t){this.method=e,this.numberOfParams=t}get parameterStructures(){return br.auto}};z.AbstractMessageSignature=Xe;var Rp=class extends Xe{constructor(e){super(e,0)}};z.RequestType0=Rp;var bp=class extends Xe{constructor(e,t=br.auto){super(e,1),this._parameterStructures=t}get parameterStructures(){return this._parameterStructures}};z.RequestType=bp;var Ap=class extends Xe{constructor(e,t=br.auto){super(e,1),this._parameterStructures=t}get parameterStructures(){return this._parameterStructures}};z.RequestType1=Ap;var wp=class extends Xe{constructor(e){super(e,2)}};z.RequestType2=wp;var Sp=class extends Xe{constructor(e){super(e,3)}};z.RequestType3=Sp;var Cp=class extends Xe{constructor(e){super(e,4)}};z.RequestType4=Cp;var kp=class extends Xe{constructor(e){super(e,5)}};z.RequestType5=kp;var Ep=class extends Xe{constructor(e){super(e,6)}};z.RequestType6=Ep;var $p=class extends Xe{constructor(e){super(e,7)}};z.RequestType7=$p;var Np=class extends Xe{constructor(e){super(e,8)}};z.RequestType8=Np;var _p=class extends Xe{constructor(e){super(e,9)}};z.RequestType9=_p;var Ip=class extends Xe{constructor(e,t=br.auto){super(e,1),this._parameterStructures=t}get parameterStructures(){return this._parameterStructures}};z.NotificationType=Ip;var Pp=class extends Xe{constructor(e){super(e,0)}};z.NotificationType0=Pp;var Dp=class extends Xe{constructor(e,t=br.auto){super(e,1),this._parameterStructures=t}get parameterStructures(){return this._parameterStructures}};z.NotificationType1=Dp;var Op=class extends Xe{constructor(e){super(e,2)}};z.NotificationType2=Op;var Lp=class extends Xe{constructor(e){super(e,3)}};z.NotificationType3=Lp;var Mp=class extends Xe{constructor(e){super(e,4)}};z.NotificationType4=Mp;var Fp=class extends Xe{constructor(e){super(e,5)}};z.NotificationType5=Fp;var qp=class extends Xe{constructor(e){super(e,6)}};z.NotificationType6=qp;var Up=class extends Xe{constructor(e){super(e,7)}};z.NotificationType7=Up;var Gp=class extends Xe{constructor(e){super(e,8)}};z.NotificationType8=Gp;var jp=class extends Xe{constructor(e){super(e,9)}};z.NotificationType9=jp;var uk;(function(r){function e(i){let o=i;return o&&co.string(o.method)&&(co.string(o.id)||co.number(o.id))}r.isRequest=e;function t(i){let o=i;return o&&co.string(o.method)&&i.id===void 0}r.isNotification=t;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(co.string(o.id)||co.number(o.id)||o.id===null)}r.isResponse=n})(uk=z.Message||(z.Message={}))});var Kp=H(Xn=>{"use strict";var oy;Object.defineProperty(Xn,"__esModule",{value:!0});Xn.LRUCache=Xn.LinkedMap=Xn.Touch=void 0;var dr;(function(r){r.None=0,r.First=1,r.AsOld=r.First,r.Last=2,r.AsNew=r.Last})(dr=Xn.Touch||(Xn.Touch={}));var ll=class{constructor(){this[oy]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,t=dr.None){let n=this._map.get(e);if(n)return t!==dr.None&&this.touch(n,t),n.value}set(e,t,n=dr.None){let i=this._map.get(e);if(i)i.value=t,n!==dr.None&&this.touch(i,n);else{switch(i={key:e,value:t,next:void 0,previous:void 0},n){case dr.None:this.addItemLast(i);break;case dr.First:this.addItemFirst(i);break;case dr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let t=this._map.get(e);if(t)return this._map.delete(e),this.removeItem(t),this._size--,t.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,t){let n=this._state,i=this._head;for(;i;){if(t?e.bind(t)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,t=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(t){let i={value:t.key,done:!1};return t=t.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,t=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(t){let i={value:t.value,done:!1};return t=t.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,t=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(t){let i={value:[t.key,t.value],done:!1};return t=t.next,i}else return{value:void 0,done:!0}}};return n}[(oy=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let t=this._head,n=this.size;for(;t&&n>e;)this._map.delete(t.key),t=t.next,n--;this._head=t,this._size=n,t&&(t.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let t=e.next,n=e.previous;if(!t||!n)throw new Error("Invalid list");t.previous=n,n.next=t}e.next=void 0,e.previous=void 0,this._state++}touch(e,t){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(t!==dr.First&&t!==dr.Last)){if(t===dr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(t===dr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((t,n)=>{e.push([n,t])}),e}fromJSON(e){this.clear();for(let[t,n]of e)this.set(t,n)}};Xn.LinkedMap=ll;var Bp=class extends ll{constructor(e,t=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,t),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,t=dr.AsNew){return super.get(e,t)}peek(e){return super.get(e,dr.None)}set(e,t){return super.set(e,t,dr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Xn.LRUCache=Bp});var Xp=H(lo=>{"use strict";Object.defineProperty(lo,"__esModule",{value:!0});lo.CancellationTokenSource=lo.CancellationToken=void 0;var fk=zn(),dk=Bo(),Wp=ao(),Vp;(function(r){r.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Wp.Event.None}),r.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Wp.Event.None});function e(t){let n=t;return n&&(n===r.None||n===r.Cancelled||dk.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}r.is=e})(Vp=lo.CancellationToken||(lo.CancellationToken={}));var pk=Object.freeze(function(r,e){let t=(0,fk.default)().timer.setTimeout(r.bind(e),0);return{dispose(){t.dispose()}}}),ul=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?pk:(this._emitter||(this._emitter=new Wp.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},zp=class{get token(){return this._token||(this._token=new ul),this._token}cancel(){this._token?this._token.cancel():this._token=Vp.Cancelled}dispose(){this._token?this._token instanceof ul&&this._token.dispose():this._token=Vp.None}};lo.CancellationTokenSource=zp});var sy=H(Yn=>{"use strict";Object.defineProperty(Yn,"__esModule",{value:!0});Yn.ReadableStreamMessageReader=Yn.AbstractMessageReader=Yn.MessageReader=void 0;var Jp=zn(),Ko=Bo(),Yp=ao(),mk;(function(r){function e(t){let n=t;return n&&Ko.func(n.listen)&&Ko.func(n.dispose)&&Ko.func(n.onError)&&Ko.func(n.onClose)&&Ko.func(n.onPartialMessage)}r.is=e})(mk=Yn.MessageReader||(Yn.MessageReader={}));var fl=class{constructor(){this.errorEmitter=new Yp.Emitter,this.closeEmitter=new Yp.Emitter,this.partialMessageEmitter=new Yp.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${Ko.string(e.message)?e.message:"unknown"}`)}};Yn.AbstractMessageReader=fl;var Qp;(function(r){function e(t){let n,i,o,s=new Map,a,c=new Map;if(t===void 0||typeof t=="string")n=t??"utf-8";else{if(n=t.charset??"utf-8",t.contentDecoder!==void 0&&(o=t.contentDecoder,s.set(o.name,o)),t.contentDecoders!==void 0)for(let l of t.contentDecoders)s.set(l.name,l);if(t.contentTypeDecoder!==void 0&&(a=t.contentTypeDecoder,c.set(a.name,a)),t.contentTypeDecoders!==void 0)for(let l of t.contentTypeDecoders)c.set(l.name,l)}return a===void 0&&(a=(0,Jp.default)().applicationJson.decoder,c.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:c}}r.fromOptions=e})(Qp||(Qp={}));var Zp=class extends fl{constructor(e,t){super(),this.readable=e,this.options=Qp.fromOptions(t),this.buffer=(0,Jp.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let t=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),t}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let s=parseInt(o);if(isNaN(s))throw new Error("Content-Length value must be a number.");this.nextMessageLength=s}let t=this.buffer.tryReadBody(this.nextMessageLength);if(t===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(t):n=Promise.resolve(t),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Jp.default)().timer.setTimeout((e,t)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:t}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Yn.ReadableStreamMessageReader=Zp});var ay=H(dl=>{"use strict";Object.defineProperty(dl,"__esModule",{value:!0});dl.Semaphore=void 0;var hk=zn(),em=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((t,n)=>{this._waiting.push({thunk:e,resolve:t,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,hk.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let t=e.thunk();t instanceof Promise?t.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(t),this.runNext())}catch(t){this._active--,e.reject(t),this.runNext()}}};dl.Semaphore=em});var fy=H(Jn=>{"use strict";Object.defineProperty(Jn,"__esModule",{value:!0});Jn.WriteableStreamMessageWriter=Jn.AbstractMessageWriter=Jn.MessageWriter=void 0;var cy=zn(),_a=Bo(),gk=ay(),ly=ao(),yk="Content-Length: ",uy=`\r
`,Tk;(function(r){function e(t){let n=t;return n&&_a.func(n.dispose)&&_a.func(n.onClose)&&_a.func(n.onError)&&_a.func(n.write)}r.is=e})(Tk=Jn.MessageWriter||(Jn.MessageWriter={}));var pl=class{constructor(){this.errorEmitter=new ly.Emitter,this.closeEmitter=new ly.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,t,n){this.errorEmitter.fire([this.asError(e),t,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${_a.string(e.message)?e.message:"unknown"}`)}};Jn.AbstractMessageWriter=pl;var tm;(function(r){function e(t){return t===void 0||typeof t=="string"?{charset:t??"utf-8",contentTypeEncoder:(0,cy.default)().applicationJson.encoder}:{charset:t.charset??"utf-8",contentEncoder:t.contentEncoder,contentTypeEncoder:t.contentTypeEncoder??(0,cy.default)().applicationJson.encoder}}r.fromOptions=e})(tm||(tm={}));var rm=class extends pl{constructor(e,t){super(),this.writable=e,this.options=tm.fromOptions(t),this.errorCount=0,this.writeSemaphore=new gk.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(yk,n.byteLength.toString(),uy),i.push(uy),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,t,n){try{return await this.writable.write(t.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,t){this.errorCount++,this.fireError(e,t,this.errorCount)}end(){this.writable.end()}};Jn.WriteableStreamMessageWriter=rm});var yy=H(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.createMessageConnection=Y.ConnectionOptions=Y.CancellationStrategy=Y.CancellationSenderStrategy=Y.CancellationReceiverStrategy=Y.ConnectionStrategy=Y.ConnectionError=Y.ConnectionErrors=Y.LogTraceNotification=Y.SetTraceNotification=Y.TraceFormat=Y.TraceValues=Y.Trace=Y.NullLogger=Y.ProgressType=Y.ProgressToken=void 0;var dy=zn(),Pt=Bo(),Z=Hp(),py=Kp(),Ia=ao(),nm=Xp(),Da;(function(r){r.type=new Z.NotificationType("$/cancelRequest")})(Da||(Da={}));var my;(function(r){function e(t){return typeof t=="string"||typeof t=="number"}r.is=e})(my=Y.ProgressToken||(Y.ProgressToken={}));var Pa;(function(r){r.type=new Z.NotificationType("$/progress")})(Pa||(Pa={}));var im=class{constructor(){}};Y.ProgressType=im;var om;(function(r){function e(t){return Pt.func(t)}r.is=e})(om||(om={}));Y.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var $e;(function(r){r[r.Off=0]="Off",r[r.Messages=1]="Messages",r[r.Compact=2]="Compact",r[r.Verbose=3]="Verbose"})($e=Y.Trace||(Y.Trace={}));var vk;(function(r){r.Off="off",r.Messages="messages",r.Compact="compact",r.Verbose="verbose"})(vk=Y.TraceValues||(Y.TraceValues={}));(function(r){function e(n){if(!Pt.string(n))return r.Off;switch(n=n.toLowerCase(),n){case"off":return r.Off;case"messages":return r.Messages;case"compact":return r.Compact;case"verbose":return r.Verbose;default:return r.Off}}r.fromString=e;function t(n){switch(n){case r.Off:return"off";case r.Messages:return"messages";case r.Compact:return"compact";case r.Verbose:return"verbose";default:return"off"}}r.toString=t})($e=Y.Trace||(Y.Trace={}));var nn;(function(r){r.Text="text",r.JSON="json"})(nn=Y.TraceFormat||(Y.TraceFormat={}));(function(r){function e(t){return Pt.string(t)?(t=t.toLowerCase(),t==="json"?r.JSON:r.Text):r.Text}r.fromString=e})(nn=Y.TraceFormat||(Y.TraceFormat={}));var hy;(function(r){r.type=new Z.NotificationType("$/setTrace")})(hy=Y.SetTraceNotification||(Y.SetTraceNotification={}));var sm;(function(r){r.type=new Z.NotificationType("$/logTrace")})(sm=Y.LogTraceNotification||(Y.LogTraceNotification={}));var ml;(function(r){r[r.Closed=1]="Closed",r[r.Disposed=2]="Disposed",r[r.AlreadyListening=3]="AlreadyListening"})(ml=Y.ConnectionErrors||(Y.ConnectionErrors={}));var Wo=class r extends Error{constructor(e,t){super(t),this.code=e,Object.setPrototypeOf(this,r.prototype)}};Y.ConnectionError=Wo;var gy;(function(r){function e(t){let n=t;return n&&Pt.func(n.cancelUndispatched)}r.is=e})(gy=Y.ConnectionStrategy||(Y.ConnectionStrategy={}));var am;(function(r){r.Message=Object.freeze({createCancellationTokenSource(t){return new nm.CancellationTokenSource}});function e(t){let n=t;return n&&Pt.func(n.createCancellationTokenSource)}r.is=e})(am=Y.CancellationReceiverStrategy||(Y.CancellationReceiverStrategy={}));var cm;(function(r){r.Message=Object.freeze({sendCancellation(t,n){return t.sendNotification(Da.type,{id:n})},cleanup(t){}});function e(t){let n=t;return n&&Pt.func(n.sendCancellation)&&Pt.func(n.cleanup)}r.is=e})(cm=Y.CancellationSenderStrategy||(Y.CancellationSenderStrategy={}));var lm;(function(r){r.Message=Object.freeze({receiver:am.Message,sender:cm.Message});function e(t){let n=t;return n&&am.is(n.receiver)&&cm.is(n.sender)}r.is=e})(lm=Y.CancellationStrategy||(Y.CancellationStrategy={}));var xk;(function(r){function e(t){let n=t;return n&&(lm.is(n.cancellationStrategy)||gy.is(n.connectionStrategy))}r.is=e})(xk=Y.ConnectionOptions||(Y.ConnectionOptions={}));var on;(function(r){r[r.New=1]="New",r[r.Listening=2]="Listening",r[r.Closed=3]="Closed",r[r.Disposed=4]="Disposed"})(on||(on={}));function Rk(r,e,t,n){let i=t!==void 0?t:Y.NullLogger,o=0,s=0,a=0,c="2.0",l,u=new Map,f,m=new Map,T=new Map,A,S=new py.LinkedMap,N=new Map,C=new Set,v=new Map,y=$e.Off,$=nn.Text,D,X=on.New,ye=new Ia.Emitter,Ee=new Ia.Emitter,Bt=new Ia.Emitter,Rt=new Ia.Emitter,M=new Ia.Emitter,w=n&&n.cancellationStrategy?n.cancellationStrategy:lm.Message;function U(x){if(x===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+x.toString()}function j(x){return x===null?"res-unknown-"+(++a).toString():"res-"+x.toString()}function ce(){return"not-"+(++s).toString()}function ee(x,P){Z.Message.isRequest(P)?x.set(U(P.id),P):Z.Message.isResponse(P)?x.set(j(P.id),P):x.set(ce(),P)}function Q(x){}function bt(){return X===on.Listening}function ft(){return X===on.Closed}function me(){return X===on.Disposed}function Nr(){(X===on.New||X===on.Listening)&&(X=on.Closed,Ee.fire(void 0))}function Kn(x){ye.fire([x,void 0,void 0])}function Ea(x){ye.fire(x)}r.onClose(Nr),r.onError(Kn),e.onClose(Nr),e.onError(Ea);function ro(){A||S.size===0||(A=(0,dy.default)().timer.setImmediate(()=>{A=void 0,fr()}))}function fr(){if(S.size===0)return;let x=S.shift();try{Z.Message.isRequest(x)?At(x):Z.Message.isNotification(x)?An(x):Z.Message.isResponse(x)?tr(x):Kt(x)}finally{ro()}}let Uo=x=>{try{if(Z.Message.isNotification(x)&&x.method===Da.type.method){let P=x.params.id,F=U(P),W=S.get(F);if(Z.Message.isRequest(W)){let Oe=n?.connectionStrategy,Je=Oe&&Oe.cancelUndispatched?Oe.cancelUndispatched(W,Q):void 0;if(Je&&(Je.error!==void 0||Je.result!==void 0)){S.delete(F),v.delete(P),Je.id=W.id,Rr(Je,x.method,Date.now()),e.write(Je).catch(()=>i.error("Sending response for canceled message failed."));return}}let De=v.get(P);if(De!==void 0){De.cancel(),bi(x);return}else C.add(P)}ee(S,x)}finally{ro()}};function At(x){if(me())return;function P(ue,qe,Te){let yt={jsonrpc:c,id:x.id};ue instanceof Z.ResponseError?yt.error=ue.toJson():yt.result=ue===void 0?null:ue,Rr(yt,qe,Te),e.write(yt).catch(()=>i.error("Sending response failed."))}function F(ue,qe,Te){let yt={jsonrpc:c,id:x.id,error:ue.toJson()};Rr(yt,qe,Te),e.write(yt).catch(()=>i.error("Sending response failed."))}function W(ue,qe,Te){ue===void 0&&(ue=null);let yt={jsonrpc:c,id:x.id,result:ue};Rr(yt,qe,Te),e.write(yt).catch(()=>i.error("Sending response failed."))}no(x);let De=u.get(x.method),Oe,Je;De&&(Oe=De.type,Je=De.handler);let wt=Date.now();if(Je||l){let ue=x.id??String(Date.now()),qe=w.receiver.createCancellationTokenSource(ue);x.id!==null&&C.has(x.id)&&qe.cancel(),x.id!==null&&v.set(ue,qe);try{let Te;if(Je)if(x.params===void 0){if(Oe!==void 0&&Oe.numberOfParams!==0){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines ${Oe.numberOfParams} params but received none.`),x.method,wt);return}Te=Je(qe.token)}else if(Array.isArray(x.params)){if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byName){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by name but received parameters by position`),x.method,wt);return}Te=Je(...x.params,qe.token)}else{if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byPosition){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by position but received parameters by name`),x.method,wt);return}Te=Je(x.params,qe.token)}else l&&(Te=l(x.method,x.params,qe.token));let yt=Te;Te?yt.then?yt.then(rr=>{v.delete(ue),P(rr,x.method,wt)},rr=>{v.delete(ue),rr instanceof Z.ResponseError?F(rr,x.method,wt):rr&&Pt.string(rr.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${rr.message}`),x.method,wt):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,wt)}):(v.delete(ue),P(Te,x.method,wt)):(v.delete(ue),W(Te,x.method,wt))}catch(Te){v.delete(ue),Te instanceof Z.ResponseError?P(Te,x.method,wt):Te&&Pt.string(Te.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${Te.message}`),x.method,wt):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,wt)}}else F(new Z.ResponseError(Z.ErrorCodes.MethodNotFound,`Unhandled method ${x.method}`),x.method,wt)}function tr(x){if(!me())if(x.id===null)x.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(x.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let P=x.id,F=N.get(P);if(sp(x,F),F!==void 0){N.delete(P);try{if(x.error){let W=x.error;F.reject(new Z.ResponseError(W.code,W.message,W.data))}else if(x.result!==void 0)F.resolve(x.result);else throw new Error("Should never happen.")}catch(W){W.message?i.error(`Response handler '${F.method}' failed with message: ${W.message}`):i.error(`Response handler '${F.method}' failed unexpectedly.`)}}}}function An(x){if(me())return;let P,F;if(x.method===Da.type.method){let W=x.params.id;C.delete(W),bi(x);return}else{let W=m.get(x.method);W&&(F=W.handler,P=W.type)}if(F||f)try{if(bi(x),F)if(x.params===void 0)P!==void 0&&P.numberOfParams!==0&&P.parameterStructures!==Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines ${P.numberOfParams} params but received none.`),F();else if(Array.isArray(x.params)){let W=x.params;x.method===Pa.type.method&&W.length===2&&my.is(W[0])?F({token:W[0],value:W[1]}):(P!==void 0&&(P.parameterStructures===Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines parameters by name but received parameters by position`),P.numberOfParams!==x.params.length&&i.error(`Notification ${x.method} defines ${P.numberOfParams} params but received ${W.length} arguments`)),F(...W))}else P!==void 0&&P.parameterStructures===Z.ParameterStructures.byPosition&&i.error(`Notification ${x.method} defines parameters by position but received parameters by name`),F(x.params);else f&&f(x.method,x.params)}catch(W){W.message?i.error(`Notification handler '${x.method}' failed with message: ${W.message}`):i.error(`Notification handler '${x.method}' failed unexpectedly.`)}else Bt.fire(x)}function Kt(x){if(!x){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(x,null,4)}`);let P=x;if(Pt.string(P.id)||Pt.number(P.id)){let F=P.id,W=N.get(F);W&&W.reject(new Error("The received response has neither a result nor an error property."))}}function dt(x){if(x!=null)switch(y){case $e.Verbose:return JSON.stringify(x,null,4);case $e.Compact:return JSON.stringify(x);default:return}}function jr(x){if(!(y===$e.Off||!D))if($===nn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&x.params&&(P=`Params: ${dt(x.params)}

`),D.log(`Sending request '${x.method} - (${x.id})'.`,P)}else Ai("send-request",x)}function _r(x){if(!(y===$e.Off||!D))if($===nn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&(x.params?P=`Params: ${dt(x.params)}

`:P=`No parameters provided.

`),D.log(`Sending notification '${x.method}'.`,P)}else Ai("send-notification",x)}function Rr(x,P,F){if(!(y===$e.Off||!D))if($===nn.Text){let W;(y===$e.Verbose||y===$e.Compact)&&(x.error&&x.error.data?W=`Error data: ${dt(x.error.data)}

`:x.result?W=`Result: ${dt(x.result)}

`:x.error===void 0&&(W=`No result returned.

`)),D.log(`Sending response '${P} - (${x.id})'. Processing request took ${Date.now()-F}ms`,W)}else Ai("send-response",x)}function no(x){if(!(y===$e.Off||!D))if($===nn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&x.params&&(P=`Params: ${dt(x.params)}

`),D.log(`Received request '${x.method} - (${x.id})'.`,P)}else Ai("receive-request",x)}function bi(x){if(!(y===$e.Off||!D||x.method===sm.type.method))if($===nn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&(x.params?P=`Params: ${dt(x.params)}

`:P=`No parameters provided.

`),D.log(`Received notification '${x.method}'.`,P)}else Ai("receive-notification",x)}function sp(x,P){if(!(y===$e.Off||!D))if($===nn.Text){let F;if((y===$e.Verbose||y===$e.Compact)&&(x.error&&x.error.data?F=`Error data: ${dt(x.error.data)}

`:x.result?F=`Result: ${dt(x.result)}

`:x.error===void 0&&(F=`No result returned.

`)),P){let W=x.error?` Request failed: ${x.error.message} (${x.error.code}).`:"";D.log(`Received response '${P.method} - (${x.id})' in ${Date.now()-P.timerStart}ms.${W}`,F)}else D.log(`Received response ${x.id} without active response promise.`,F)}else Ai("receive-response",x)}function Ai(x,P){if(!D||y===$e.Off)return;let F={isLSPMessage:!0,type:x,message:P,timestamp:Date.now()};D.log(F)}function io(){if(ft())throw new Wo(ml.Closed,"Connection is closed.");if(me())throw new Wo(ml.Disposed,"Connection is disposed.")}function ap(){if(bt())throw new Wo(ml.AlreadyListening,"Connection is already listening")}function cp(){if(!bt())throw new Error("Call listen() first.")}function oo(x){return x===void 0?null:x}function Go(x){if(x!==null)return x}function nl(x){return x!=null&&!Array.isArray(x)&&typeof x=="object"}function $a(x,P){switch(x){case Z.ParameterStructures.auto:return nl(P)?Go(P):[oo(P)];case Z.ParameterStructures.byName:if(!nl(P))throw new Error("Received parameters by name but param is not an object literal.");return Go(P);case Z.ParameterStructures.byPosition:return[oo(P)];default:throw new Error(`Unknown parameter structure ${x.toString()}`)}}function il(x,P){let F,W=x.numberOfParams;switch(W){case 0:F=void 0;break;case 1:F=$a(x.parameterStructures,P[0]);break;default:F=[];for(let De=0;De<P.length&&De<W;De++)F.push(oo(P[De]));if(P.length<W)for(let De=P.length;De<W;De++)F.push(null);break}return F}let wi={sendNotification:(x,...P)=>{io();let F,W;if(Pt.string(x)){F=x;let Oe=P[0],Je=0,wt=Z.ParameterStructures.auto;Z.ParameterStructures.is(Oe)&&(Je=1,wt=Oe);let ue=P.length,qe=ue-Je;switch(qe){case 0:W=void 0;break;case 1:W=$a(wt,P[Je]);break;default:if(wt===Z.ParameterStructures.byName)throw new Error(`Received ${qe} parameters for 'by Name' notification parameter structure.`);W=P.slice(Je,ue).map(Te=>oo(Te));break}}else{let Oe=P;F=x.method,W=il(x,Oe)}let De={jsonrpc:c,method:F,params:W};return _r(De),e.write(De).catch(()=>i.error("Sending notification failed."))},onNotification:(x,P)=>{io();let F;return Pt.func(x)?f=x:P&&(Pt.string(x)?(F=x,m.set(x,{type:void 0,handler:P})):(F=x.method,m.set(x.method,{type:x,handler:P}))),{dispose:()=>{F!==void 0?m.delete(F):f=void 0}}},onProgress:(x,P,F)=>{if(T.has(P))throw new Error(`Progress handler for token ${P} already registered`);return T.set(P,F),{dispose:()=>{T.delete(P)}}},sendProgress:(x,P,F)=>wi.sendNotification(Pa.type,{token:P,value:F}),onUnhandledProgress:Rt.event,sendRequest:(x,...P)=>{io(),cp();let F,W,De;if(Pt.string(x)){F=x;let ue=P[0],qe=P[P.length-1],Te=0,yt=Z.ParameterStructures.auto;Z.ParameterStructures.is(ue)&&(Te=1,yt=ue);let rr=P.length;nm.CancellationToken.is(qe)&&(rr=rr-1,De=qe);let Wn=rr-Te;switch(Wn){case 0:W=void 0;break;case 1:W=$a(yt,P[Te]);break;default:if(yt===Z.ParameterStructures.byName)throw new Error(`Received ${Wn} parameters for 'by Name' request parameter structure.`);W=P.slice(Te,rr).map(wn=>oo(wn));break}}else{let ue=P;F=x.method,W=il(x,ue);let qe=x.numberOfParams;De=nm.CancellationToken.is(ue[qe])?ue[qe]:void 0}let Oe=o++,Je;return De&&(Je=De.onCancellationRequested(()=>{let ue=w.sender.sendCancellation(wi,Oe);return ue===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Oe}`),Promise.resolve()):ue.catch(()=>{i.log(`Sending cancellation messages for id ${Oe} failed`)})})),new Promise((ue,qe)=>{let Te={jsonrpc:c,id:Oe,method:F,params:W},yt=wn=>{ue(wn),w.sender.cleanup(Oe),Je?.dispose()},rr=wn=>{qe(wn),w.sender.cleanup(Oe),Je?.dispose()},Wn={method:F,timerStart:Date.now(),resolve:yt,reject:rr};jr(Te);try{e.write(Te).catch(()=>i.error("Sending request failed."))}catch(wn){Wn.reject(new Z.ResponseError(Z.ErrorCodes.MessageWriteError,wn.message?wn.message:"Unknown reason")),Wn=null}Wn&&N.set(Oe,Wn)})},onRequest:(x,P)=>{io();let F=null;return om.is(x)?(F=void 0,l=x):Pt.string(x)?(F=null,P!==void 0&&(F=x,u.set(x,{handler:P,type:void 0}))):P!==void 0&&(F=x.method,u.set(x.method,{type:x,handler:P})),{dispose:()=>{F!==null&&(F!==void 0?u.delete(F):l=void 0)}}},hasPendingResponse:()=>N.size>0,trace:async(x,P,F)=>{let W=!1,De=nn.Text;F!==void 0&&(Pt.boolean(F)?W=F:(W=F.sendNotification||!1,De=F.traceFormat||nn.Text)),y=x,$=De,y===$e.Off?D=void 0:D=P,W&&!ft()&&!me()&&await wi.sendNotification(hy.type,{value:$e.toString(x)})},onError:ye.event,onClose:Ee.event,onUnhandledNotification:Bt.event,onDispose:M.event,end:()=>{e.end()},dispose:()=>{if(me())return;X=on.Disposed,M.fire(void 0);let x=new Z.ResponseError(Z.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let P of N.values())P.reject(x);N=new Map,v=new Map,C=new Set,S=new py.LinkedMap,Pt.func(e.dispose)&&e.dispose(),Pt.func(r.dispose)&&r.dispose()},listen:()=>{io(),ap(),X=on.Listening,r.listen(Uo)},inspect:()=>{(0,dy.default)().console.log("inspect")}};return wi.onNotification(sm.type,x=>{if(y===$e.Off||!D)return;let P=y===$e.Verbose||y===$e.Compact;D.log(x.message,P?x.verbose:void 0)}),wi.onNotification(Pa.type,x=>{let P=T.get(x.token);P?P(x.value):Rt.fire(x)}),wi}Y.createMessageConnection=Rk});var pm=H(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.TraceFormat=_.TraceValues=_.Trace=_.ProgressType=_.ProgressToken=_.createMessageConnection=_.NullLogger=_.ConnectionOptions=_.ConnectionStrategy=_.WriteableStreamMessageWriter=_.AbstractMessageWriter=_.MessageWriter=_.ReadableStreamMessageReader=_.AbstractMessageReader=_.MessageReader=_.CancellationToken=_.CancellationTokenSource=_.Emitter=_.Event=_.Disposable=_.LRUCache=_.Touch=_.LinkedMap=_.ParameterStructures=_.NotificationType9=_.NotificationType8=_.NotificationType7=_.NotificationType6=_.NotificationType5=_.NotificationType4=_.NotificationType3=_.NotificationType2=_.NotificationType1=_.NotificationType0=_.NotificationType=_.ErrorCodes=_.ResponseError=_.RequestType9=_.RequestType8=_.RequestType7=_.RequestType6=_.RequestType5=_.RequestType4=_.RequestType3=_.RequestType2=_.RequestType1=_.RequestType0=_.RequestType=_.Message=_.RAL=void 0;_.CancellationStrategy=_.CancellationSenderStrategy=_.CancellationReceiverStrategy=_.ConnectionError=_.ConnectionErrors=_.LogTraceNotification=_.SetTraceNotification=void 0;var Ge=Hp();Object.defineProperty(_,"Message",{enumerable:!0,get:function(){return Ge.Message}});Object.defineProperty(_,"RequestType",{enumerable:!0,get:function(){return Ge.RequestType}});Object.defineProperty(_,"RequestType0",{enumerable:!0,get:function(){return Ge.RequestType0}});Object.defineProperty(_,"RequestType1",{enumerable:!0,get:function(){return Ge.RequestType1}});Object.defineProperty(_,"RequestType2",{enumerable:!0,get:function(){return Ge.RequestType2}});Object.defineProperty(_,"RequestType3",{enumerable:!0,get:function(){return Ge.RequestType3}});Object.defineProperty(_,"RequestType4",{enumerable:!0,get:function(){return Ge.RequestType4}});Object.defineProperty(_,"RequestType5",{enumerable:!0,get:function(){return Ge.RequestType5}});Object.defineProperty(_,"RequestType6",{enumerable:!0,get:function(){return Ge.RequestType6}});Object.defineProperty(_,"RequestType7",{enumerable:!0,get:function(){return Ge.RequestType7}});Object.defineProperty(_,"RequestType8",{enumerable:!0,get:function(){return Ge.RequestType8}});Object.defineProperty(_,"RequestType9",{enumerable:!0,get:function(){return Ge.RequestType9}});Object.defineProperty(_,"ResponseError",{enumerable:!0,get:function(){return Ge.ResponseError}});Object.defineProperty(_,"ErrorCodes",{enumerable:!0,get:function(){return Ge.ErrorCodes}});Object.defineProperty(_,"NotificationType",{enumerable:!0,get:function(){return Ge.NotificationType}});Object.defineProperty(_,"NotificationType0",{enumerable:!0,get:function(){return Ge.NotificationType0}});Object.defineProperty(_,"NotificationType1",{enumerable:!0,get:function(){return Ge.NotificationType1}});Object.defineProperty(_,"NotificationType2",{enumerable:!0,get:function(){return Ge.NotificationType2}});Object.defineProperty(_,"NotificationType3",{enumerable:!0,get:function(){return Ge.NotificationType3}});Object.defineProperty(_,"NotificationType4",{enumerable:!0,get:function(){return Ge.NotificationType4}});Object.defineProperty(_,"NotificationType5",{enumerable:!0,get:function(){return Ge.NotificationType5}});Object.defineProperty(_,"NotificationType6",{enumerable:!0,get:function(){return Ge.NotificationType6}});Object.defineProperty(_,"NotificationType7",{enumerable:!0,get:function(){return Ge.NotificationType7}});Object.defineProperty(_,"NotificationType8",{enumerable:!0,get:function(){return Ge.NotificationType8}});Object.defineProperty(_,"NotificationType9",{enumerable:!0,get:function(){return Ge.NotificationType9}});Object.defineProperty(_,"ParameterStructures",{enumerable:!0,get:function(){return Ge.ParameterStructures}});var um=Kp();Object.defineProperty(_,"LinkedMap",{enumerable:!0,get:function(){return um.LinkedMap}});Object.defineProperty(_,"LRUCache",{enumerable:!0,get:function(){return um.LRUCache}});Object.defineProperty(_,"Touch",{enumerable:!0,get:function(){return um.Touch}});var bk=pp();Object.defineProperty(_,"Disposable",{enumerable:!0,get:function(){return bk.Disposable}});var Ty=ao();Object.defineProperty(_,"Event",{enumerable:!0,get:function(){return Ty.Event}});Object.defineProperty(_,"Emitter",{enumerable:!0,get:function(){return Ty.Emitter}});var vy=Xp();Object.defineProperty(_,"CancellationTokenSource",{enumerable:!0,get:function(){return vy.CancellationTokenSource}});Object.defineProperty(_,"CancellationToken",{enumerable:!0,get:function(){return vy.CancellationToken}});var fm=sy();Object.defineProperty(_,"MessageReader",{enumerable:!0,get:function(){return fm.MessageReader}});Object.defineProperty(_,"AbstractMessageReader",{enumerable:!0,get:function(){return fm.AbstractMessageReader}});Object.defineProperty(_,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return fm.ReadableStreamMessageReader}});var dm=fy();Object.defineProperty(_,"MessageWriter",{enumerable:!0,get:function(){return dm.MessageWriter}});Object.defineProperty(_,"AbstractMessageWriter",{enumerable:!0,get:function(){return dm.AbstractMessageWriter}});Object.defineProperty(_,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return dm.WriteableStreamMessageWriter}});var ir=yy();Object.defineProperty(_,"ConnectionStrategy",{enumerable:!0,get:function(){return ir.ConnectionStrategy}});Object.defineProperty(_,"ConnectionOptions",{enumerable:!0,get:function(){return ir.ConnectionOptions}});Object.defineProperty(_,"NullLogger",{enumerable:!0,get:function(){return ir.NullLogger}});Object.defineProperty(_,"createMessageConnection",{enumerable:!0,get:function(){return ir.createMessageConnection}});Object.defineProperty(_,"ProgressToken",{enumerable:!0,get:function(){return ir.ProgressToken}});Object.defineProperty(_,"ProgressType",{enumerable:!0,get:function(){return ir.ProgressType}});Object.defineProperty(_,"Trace",{enumerable:!0,get:function(){return ir.Trace}});Object.defineProperty(_,"TraceValues",{enumerable:!0,get:function(){return ir.TraceValues}});Object.defineProperty(_,"TraceFormat",{enumerable:!0,get:function(){return ir.TraceFormat}});Object.defineProperty(_,"SetTraceNotification",{enumerable:!0,get:function(){return ir.SetTraceNotification}});Object.defineProperty(_,"LogTraceNotification",{enumerable:!0,get:function(){return ir.LogTraceNotification}});Object.defineProperty(_,"ConnectionErrors",{enumerable:!0,get:function(){return ir.ConnectionErrors}});Object.defineProperty(_,"ConnectionError",{enumerable:!0,get:function(){return ir.ConnectionError}});Object.defineProperty(_,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return ir.CancellationReceiverStrategy}});Object.defineProperty(_,"CancellationSenderStrategy",{enumerable:!0,get:function(){return ir.CancellationSenderStrategy}});Object.defineProperty(_,"CancellationStrategy",{enumerable:!0,get:function(){return ir.CancellationStrategy}});var Ak=zn();_.RAL=Ak.default});var Qn=H(Ir=>{"use strict";var wk=Ir&&Ir.__createBinding||(Object.create?function(r,e,t,n){n===void 0&&(n=t);var i=Object.getOwnPropertyDescriptor(e,t);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,n,i)}:function(r,e,t,n){n===void 0&&(n=t),r[n]=e[t]}),Sk=Ir&&Ir.__exportStar||function(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&wk(e,r,t)};Object.defineProperty(Ir,"__esModule",{value:!0});Ir.createMessageConnection=Ir.BrowserMessageWriter=Ir.BrowserMessageReader=void 0;var Ck=ty();Ck.default.install();var Vo=pm();Sk(pm(),Ir);var mm=class extends Vo.AbstractMessageReader{constructor(e){super(),this._onData=new Vo.Emitter,this._messageListener=t=>{this._onData.fire(t.data)},e.addEventListener("error",t=>this.fireError(t)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};Ir.BrowserMessageReader=mm;var hm=class extends Vo.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",t=>this.fireError(t))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(t){return this.handleError(t,e),Promise.reject(t)}}handleError(e,t){this.errorCount++,this.fireError(e,t,this.errorCount)}end(){}};Ir.BrowserMessageWriter=hm;function kk(r,e,t,n){return t===void 0&&(t=Vo.NullLogger),Vo.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Vo.createMessageConnection)(r,e,t,n)}Ir.createMessageConnection=kk});var gm=H((Aj,xy)=>{"use strict";xy.exports=Qn()});var uo=H((Ry,hl)=>{(function(r){if(typeof hl=="object"&&typeof hl.exports=="object"){var e=r(Jg,Ry);e!==void 0&&(hl.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],r)})(function(r,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var t;(function(p){function R(b){return typeof b=="string"}p.is=R})(t=e.DocumentUri||(e.DocumentUri={}));var n;(function(p){function R(b){return typeof b=="string"}p.is=R})(n=e.URI||(e.URI={}));var i;(function(p){p.MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(i=e.integer||(e.integer={}));var o;(function(p){p.MIN_VALUE=0,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(o=e.uinteger||(e.uinteger={}));var s;(function(p){function R(g,d){return g===Number.MAX_VALUE&&(g=o.MAX_VALUE),d===Number.MAX_VALUE&&(d=o.MAX_VALUE),{line:g,character:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.line)&&k.uinteger(d.character)}p.is=b})(s=e.Position||(e.Position={}));var a;(function(p){function R(g,d,E,I){if(k.uinteger(g)&&k.uinteger(d)&&k.uinteger(E)&&k.uinteger(I))return{start:s.create(g,d),end:s.create(E,I)};if(s.is(g)&&s.is(d))return{start:g,end:d};throw new Error("Range#create called with invalid arguments[".concat(g,", ").concat(d,", ").concat(E,", ").concat(I,"]"))}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&s.is(d.start)&&s.is(d.end)}p.is=b})(a=e.Range||(e.Range={}));var c;(function(p){function R(g,d){return{uri:g,range:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(k.string(d.uri)||k.undefined(d.uri))}p.is=b})(c=e.Location||(e.Location={}));var l;(function(p){function R(g,d,E,I){return{targetUri:g,targetRange:d,targetSelectionRange:E,originSelectionRange:I}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.targetRange)&&k.string(d.targetUri)&&a.is(d.targetSelectionRange)&&(a.is(d.originSelectionRange)||k.undefined(d.originSelectionRange))}p.is=b})(l=e.LocationLink||(e.LocationLink={}));var u;(function(p){function R(g,d,E,I){return{red:g,green:d,blue:E,alpha:I}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.numberRange(d.red,0,1)&&k.numberRange(d.green,0,1)&&k.numberRange(d.blue,0,1)&&k.numberRange(d.alpha,0,1)}p.is=b})(u=e.Color||(e.Color={}));var f;(function(p){function R(g,d){return{range:g,color:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&u.is(d.color)}p.is=b})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(p){function R(g,d,E){return{label:g,textEdit:d,additionalTextEdits:E}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.undefined(d.textEdit)||D.is(d))&&(k.undefined(d.additionalTextEdits)||k.typedArray(d.additionalTextEdits,D.is))}p.is=b})(m=e.ColorPresentation||(e.ColorPresentation={}));var T;(function(p){p.Comment="comment",p.Imports="imports",p.Region="region"})(T=e.FoldingRangeKind||(e.FoldingRangeKind={}));var A;(function(p){function R(g,d,E,I,re,pt){var Ue={startLine:g,endLine:d};return k.defined(E)&&(Ue.startCharacter=E),k.defined(I)&&(Ue.endCharacter=I),k.defined(re)&&(Ue.kind=re),k.defined(pt)&&(Ue.collapsedText=pt),Ue}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.startLine)&&k.uinteger(d.startLine)&&(k.undefined(d.startCharacter)||k.uinteger(d.startCharacter))&&(k.undefined(d.endCharacter)||k.uinteger(d.endCharacter))&&(k.undefined(d.kind)||k.string(d.kind))}p.is=b})(A=e.FoldingRange||(e.FoldingRange={}));var S;(function(p){function R(g,d){return{location:g,message:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&c.is(d.location)&&k.string(d.message)}p.is=b})(S=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var N;(function(p){p.Error=1,p.Warning=2,p.Information=3,p.Hint=4})(N=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var C;(function(p){p.Unnecessary=1,p.Deprecated=2})(C=e.DiagnosticTag||(e.DiagnosticTag={}));var v;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&k.string(g.href)}p.is=R})(v=e.CodeDescription||(e.CodeDescription={}));var y;(function(p){function R(g,d,E,I,re,pt){var Ue={range:g,message:d};return k.defined(E)&&(Ue.severity=E),k.defined(I)&&(Ue.code=I),k.defined(re)&&(Ue.source=re),k.defined(pt)&&(Ue.relatedInformation=pt),Ue}p.create=R;function b(g){var d,E=g;return k.defined(E)&&a.is(E.range)&&k.string(E.message)&&(k.number(E.severity)||k.undefined(E.severity))&&(k.integer(E.code)||k.string(E.code)||k.undefined(E.code))&&(k.undefined(E.codeDescription)||k.string((d=E.codeDescription)===null||d===void 0?void 0:d.href))&&(k.string(E.source)||k.undefined(E.source))&&(k.undefined(E.relatedInformation)||k.typedArray(E.relatedInformation,S.is))}p.is=b})(y=e.Diagnostic||(e.Diagnostic={}));var $;(function(p){function R(g,d){for(var E=[],I=2;I<arguments.length;I++)E[I-2]=arguments[I];var re={title:g,command:d};return k.defined(E)&&E.length>0&&(re.arguments=E),re}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.title)&&k.string(d.command)}p.is=b})($=e.Command||(e.Command={}));var D;(function(p){function R(E,I){return{range:E,newText:I}}p.replace=R;function b(E,I){return{range:{start:E,end:E},newText:I}}p.insert=b;function g(E){return{range:E,newText:""}}p.del=g;function d(E){var I=E;return k.objectLiteral(I)&&k.string(I.newText)&&a.is(I.range)}p.is=d})(D=e.TextEdit||(e.TextEdit={}));var X;(function(p){function R(g,d,E){var I={label:g};return d!==void 0&&(I.needsConfirmation=d),E!==void 0&&(I.description=E),I}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.boolean(d.needsConfirmation)||d.needsConfirmation===void 0)&&(k.string(d.description)||d.description===void 0)}p.is=b})(X=e.ChangeAnnotation||(e.ChangeAnnotation={}));var ye;(function(p){function R(b){var g=b;return k.string(g)}p.is=R})(ye=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ee;(function(p){function R(E,I,re){return{range:E,newText:I,annotationId:re}}p.replace=R;function b(E,I,re){return{range:{start:E,end:E},newText:I,annotationId:re}}p.insert=b;function g(E,I){return{range:E,newText:"",annotationId:I}}p.del=g;function d(E){var I=E;return D.is(I)&&(X.is(I.annotationId)||ye.is(I.annotationId))}p.is=d})(Ee=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Bt;(function(p){function R(g,d){return{textDocument:g,edits:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&ft.is(d.textDocument)&&Array.isArray(d.edits)}p.is=b})(Bt=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Rt;(function(p){function R(g,d,E){var I={kind:"create",uri:g};return d!==void 0&&(d.overwrite!==void 0||d.ignoreIfExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=R;function b(g){var d=g;return d&&d.kind==="create"&&k.string(d.uri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=b})(Rt=e.CreateFile||(e.CreateFile={}));var M;(function(p){function R(g,d,E,I){var re={kind:"rename",oldUri:g,newUri:d};return E!==void 0&&(E.overwrite!==void 0||E.ignoreIfExists!==void 0)&&(re.options=E),I!==void 0&&(re.annotationId=I),re}p.create=R;function b(g){var d=g;return d&&d.kind==="rename"&&k.string(d.oldUri)&&k.string(d.newUri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=b})(M=e.RenameFile||(e.RenameFile={}));var w;(function(p){function R(g,d,E){var I={kind:"delete",uri:g};return d!==void 0&&(d.recursive!==void 0||d.ignoreIfNotExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=R;function b(g){var d=g;return d&&d.kind==="delete"&&k.string(d.uri)&&(d.options===void 0||(d.options.recursive===void 0||k.boolean(d.options.recursive))&&(d.options.ignoreIfNotExists===void 0||k.boolean(d.options.ignoreIfNotExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=b})(w=e.DeleteFile||(e.DeleteFile={}));var U;(function(p){function R(b){var g=b;return g&&(g.changes!==void 0||g.documentChanges!==void 0)&&(g.documentChanges===void 0||g.documentChanges.every(function(d){return k.string(d.kind)?Rt.is(d)||M.is(d)||w.is(d):Bt.is(d)}))}p.is=R})(U=e.WorkspaceEdit||(e.WorkspaceEdit={}));var j=function(){function p(R,b){this.edits=R,this.changeAnnotations=b}return p.prototype.insert=function(R,b,g){var d,E;if(g===void 0?d=D.insert(R,b):ye.is(g)?(E=g,d=Ee.insert(R,b,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.insert(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.replace=function(R,b,g){var d,E;if(g===void 0?d=D.replace(R,b):ye.is(g)?(E=g,d=Ee.replace(R,b,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.replace(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.delete=function(R,b){var g,d;if(b===void 0?g=D.del(R):ye.is(b)?(d=b,g=Ee.del(R,b)):(this.assertChangeAnnotations(this.changeAnnotations),d=this.changeAnnotations.manage(b),g=Ee.del(R,d)),this.edits.push(g),d!==void 0)return d},p.prototype.add=function(R){this.edits.push(R)},p.prototype.all=function(){return this.edits},p.prototype.clear=function(){this.edits.splice(0,this.edits.length)},p.prototype.assertChangeAnnotations=function(R){if(R===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},p}(),ce=function(){function p(R){this._annotations=R===void 0?Object.create(null):R,this._counter=0,this._size=0}return p.prototype.all=function(){return this._annotations},Object.defineProperty(p.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),p.prototype.manage=function(R,b){var g;if(ye.is(R)?g=R:(g=this.nextId(),b=R),this._annotations[g]!==void 0)throw new Error("Id ".concat(g," is already in use."));if(b===void 0)throw new Error("No annotation provided for id ".concat(g));return this._annotations[g]=b,this._size++,g},p.prototype.nextId=function(){return this._counter++,this._counter.toString()},p}(),ee=function(){function p(R){var b=this;this._textEditChanges=Object.create(null),R!==void 0?(this._workspaceEdit=R,R.documentChanges?(this._changeAnnotations=new ce(R.changeAnnotations),R.changeAnnotations=this._changeAnnotations.all(),R.documentChanges.forEach(function(g){if(Bt.is(g)){var d=new j(g.edits,b._changeAnnotations);b._textEditChanges[g.textDocument.uri]=d}})):R.changes&&Object.keys(R.changes).forEach(function(g){var d=new j(R.changes[g]);b._textEditChanges[g]=d})):this._workspaceEdit={}}return Object.defineProperty(p.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),p.prototype.getTextEditChange=function(R){if(ft.is(R)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var b={uri:R.uri,version:R.version},g=this._textEditChanges[b.uri];if(!g){var d=[],E={textDocument:b,edits:d};this._workspaceEdit.documentChanges.push(E),g=new j(d,this._changeAnnotations),this._textEditChanges[b.uri]=g}return g}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var g=this._textEditChanges[R];if(!g){var d=[];this._workspaceEdit.changes[R]=d,g=new j(d),this._textEditChanges[R]=g}return g}},p.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new ce,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},p.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},p.prototype.createFile=function(R,b,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ye.is(b)?d=b:g=b;var E,I;if(d===void 0?E=Rt.create(R,g):(I=ye.is(d)?d:this._changeAnnotations.manage(d),E=Rt.create(R,g,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p.prototype.renameFile=function(R,b,g,d){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var E;X.is(g)||ye.is(g)?E=g:d=g;var I,re;if(E===void 0?I=M.create(R,b,d):(re=ye.is(E)?E:this._changeAnnotations.manage(E),I=M.create(R,b,d,re)),this._workspaceEdit.documentChanges.push(I),re!==void 0)return re},p.prototype.deleteFile=function(R,b,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ye.is(b)?d=b:g=b;var E,I;if(d===void 0?E=w.create(R,g):(I=ye.is(d)?d:this._changeAnnotations.manage(d),E=w.create(R,g,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p}();e.WorkspaceChange=ee;var Q;(function(p){function R(g){return{uri:g}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)}p.is=b})(Q=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var bt;(function(p){function R(g,d){return{uri:g,version:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.integer(d.version)}p.is=b})(bt=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ft;(function(p){function R(g,d){return{uri:g,version:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&(d.version===null||k.integer(d.version))}p.is=b})(ft=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var me;(function(p){function R(g,d,E,I){return{uri:g,languageId:d,version:E,text:I}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.string(d.languageId)&&k.integer(d.version)&&k.string(d.text)}p.is=b})(me=e.TextDocumentItem||(e.TextDocumentItem={}));var Nr;(function(p){p.PlainText="plaintext",p.Markdown="markdown";function R(b){var g=b;return g===p.PlainText||g===p.Markdown}p.is=R})(Nr=e.MarkupKind||(e.MarkupKind={}));var Kn;(function(p){function R(b){var g=b;return k.objectLiteral(b)&&Nr.is(g.kind)&&k.string(g.value)}p.is=R})(Kn=e.MarkupContent||(e.MarkupContent={}));var Ea;(function(p){p.Text=1,p.Method=2,p.Function=3,p.Constructor=4,p.Field=5,p.Variable=6,p.Class=7,p.Interface=8,p.Module=9,p.Property=10,p.Unit=11,p.Value=12,p.Enum=13,p.Keyword=14,p.Snippet=15,p.Color=16,p.File=17,p.Reference=18,p.Folder=19,p.EnumMember=20,p.Constant=21,p.Struct=22,p.Event=23,p.Operator=24,p.TypeParameter=25})(Ea=e.CompletionItemKind||(e.CompletionItemKind={}));var ro;(function(p){p.PlainText=1,p.Snippet=2})(ro=e.InsertTextFormat||(e.InsertTextFormat={}));var fr;(function(p){p.Deprecated=1})(fr=e.CompletionItemTag||(e.CompletionItemTag={}));var Uo;(function(p){function R(g,d,E){return{newText:g,insert:d,replace:E}}p.create=R;function b(g){var d=g;return d&&k.string(d.newText)&&a.is(d.insert)&&a.is(d.replace)}p.is=b})(Uo=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var At;(function(p){p.asIs=1,p.adjustIndentation=2})(At=e.InsertTextMode||(e.InsertTextMode={}));var tr;(function(p){function R(b){var g=b;return g&&(k.string(g.detail)||g.detail===void 0)&&(k.string(g.description)||g.description===void 0)}p.is=R})(tr=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var An;(function(p){function R(b){return{label:b}}p.create=R})(An=e.CompletionItem||(e.CompletionItem={}));var Kt;(function(p){function R(b,g){return{items:b||[],isIncomplete:!!g}}p.create=R})(Kt=e.CompletionList||(e.CompletionList={}));var dt;(function(p){function R(g){return g.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}p.fromPlainText=R;function b(g){var d=g;return k.string(d)||k.objectLiteral(d)&&k.string(d.language)&&k.string(d.value)}p.is=b})(dt=e.MarkedString||(e.MarkedString={}));var jr;(function(p){function R(b){var g=b;return!!g&&k.objectLiteral(g)&&(Kn.is(g.contents)||dt.is(g.contents)||k.typedArray(g.contents,dt.is))&&(b.range===void 0||a.is(b.range))}p.is=R})(jr=e.Hover||(e.Hover={}));var _r;(function(p){function R(b,g){return g?{label:b,documentation:g}:{label:b}}p.create=R})(_r=e.ParameterInformation||(e.ParameterInformation={}));var Rr;(function(p){function R(b,g){for(var d=[],E=2;E<arguments.length;E++)d[E-2]=arguments[E];var I={label:b};return k.defined(g)&&(I.documentation=g),k.defined(d)?I.parameters=d:I.parameters=[],I}p.create=R})(Rr=e.SignatureInformation||(e.SignatureInformation={}));var no;(function(p){p.Text=1,p.Read=2,p.Write=3})(no=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var bi;(function(p){function R(b,g){var d={range:b};return k.number(g)&&(d.kind=g),d}p.create=R})(bi=e.DocumentHighlight||(e.DocumentHighlight={}));var sp;(function(p){p.File=1,p.Module=2,p.Namespace=3,p.Package=4,p.Class=5,p.Method=6,p.Property=7,p.Field=8,p.Constructor=9,p.Enum=10,p.Interface=11,p.Function=12,p.Variable=13,p.Constant=14,p.String=15,p.Number=16,p.Boolean=17,p.Array=18,p.Object=19,p.Key=20,p.Null=21,p.EnumMember=22,p.Struct=23,p.Event=24,p.Operator=25,p.TypeParameter=26})(sp=e.SymbolKind||(e.SymbolKind={}));var Ai;(function(p){p.Deprecated=1})(Ai=e.SymbolTag||(e.SymbolTag={}));var io;(function(p){function R(b,g,d,E,I){var re={name:b,kind:g,location:{uri:E,range:d}};return I&&(re.containerName=I),re}p.create=R})(io=e.SymbolInformation||(e.SymbolInformation={}));var ap;(function(p){function R(b,g,d,E){return E!==void 0?{name:b,kind:g,location:{uri:d,range:E}}:{name:b,kind:g,location:{uri:d}}}p.create=R})(ap=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var cp;(function(p){function R(g,d,E,I,re,pt){var Ue={name:g,detail:d,kind:E,range:I,selectionRange:re};return pt!==void 0&&(Ue.children=pt),Ue}p.create=R;function b(g){var d=g;return d&&k.string(d.name)&&k.number(d.kind)&&a.is(d.range)&&a.is(d.selectionRange)&&(d.detail===void 0||k.string(d.detail))&&(d.deprecated===void 0||k.boolean(d.deprecated))&&(d.children===void 0||Array.isArray(d.children))&&(d.tags===void 0||Array.isArray(d.tags))}p.is=b})(cp=e.DocumentSymbol||(e.DocumentSymbol={}));var oo;(function(p){p.Empty="",p.QuickFix="quickfix",p.Refactor="refactor",p.RefactorExtract="refactor.extract",p.RefactorInline="refactor.inline",p.RefactorRewrite="refactor.rewrite",p.Source="source",p.SourceOrganizeImports="source.organizeImports",p.SourceFixAll="source.fixAll"})(oo=e.CodeActionKind||(e.CodeActionKind={}));var Go;(function(p){p.Invoked=1,p.Automatic=2})(Go=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var nl;(function(p){function R(g,d,E){var I={diagnostics:g};return d!=null&&(I.only=d),E!=null&&(I.triggerKind=E),I}p.create=R;function b(g){var d=g;return k.defined(d)&&k.typedArray(d.diagnostics,y.is)&&(d.only===void 0||k.typedArray(d.only,k.string))&&(d.triggerKind===void 0||d.triggerKind===Go.Invoked||d.triggerKind===Go.Automatic)}p.is=b})(nl=e.CodeActionContext||(e.CodeActionContext={}));var $a;(function(p){function R(g,d,E){var I={title:g},re=!0;return typeof d=="string"?(re=!1,I.kind=d):$.is(d)?I.command=d:I.edit=d,re&&E!==void 0&&(I.kind=E),I}p.create=R;function b(g){var d=g;return d&&k.string(d.title)&&(d.diagnostics===void 0||k.typedArray(d.diagnostics,y.is))&&(d.kind===void 0||k.string(d.kind))&&(d.edit!==void 0||d.command!==void 0)&&(d.command===void 0||$.is(d.command))&&(d.isPreferred===void 0||k.boolean(d.isPreferred))&&(d.edit===void 0||U.is(d.edit))}p.is=b})($a=e.CodeAction||(e.CodeAction={}));var il;(function(p){function R(g,d){var E={range:g};return k.defined(d)&&(E.data=d),E}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.command)||$.is(d.command))}p.is=b})(il=e.CodeLens||(e.CodeLens={}));var wi;(function(p){function R(g,d){return{tabSize:g,insertSpaces:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.uinteger(d.tabSize)&&k.boolean(d.insertSpaces)}p.is=b})(wi=e.FormattingOptions||(e.FormattingOptions={}));var x;(function(p){function R(g,d,E){return{range:g,target:d,data:E}}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.target)||k.string(d.target))}p.is=b})(x=e.DocumentLink||(e.DocumentLink={}));var P;(function(p){function R(g,d){return{range:g,parent:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(d.parent===void 0||p.is(d.parent))}p.is=b})(P=e.SelectionRange||(e.SelectionRange={}));var F;(function(p){p.namespace="namespace",p.type="type",p.class="class",p.enum="enum",p.interface="interface",p.struct="struct",p.typeParameter="typeParameter",p.parameter="parameter",p.variable="variable",p.property="property",p.enumMember="enumMember",p.event="event",p.function="function",p.method="method",p.macro="macro",p.keyword="keyword",p.modifier="modifier",p.comment="comment",p.string="string",p.number="number",p.regexp="regexp",p.operator="operator",p.decorator="decorator"})(F=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var W;(function(p){p.declaration="declaration",p.definition="definition",p.readonly="readonly",p.static="static",p.deprecated="deprecated",p.abstract="abstract",p.async="async",p.modification="modification",p.documentation="documentation",p.defaultLibrary="defaultLibrary"})(W=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var De;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&(g.resultId===void 0||typeof g.resultId=="string")&&Array.isArray(g.data)&&(g.data.length===0||typeof g.data[0]=="number")}p.is=R})(De=e.SemanticTokens||(e.SemanticTokens={}));var Oe;(function(p){function R(g,d){return{range:g,text:d}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&k.string(d.text)}p.is=b})(Oe=e.InlineValueText||(e.InlineValueText={}));var Je;(function(p){function R(g,d,E){return{range:g,variableName:d,caseSensitiveLookup:E}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&k.boolean(d.caseSensitiveLookup)&&(k.string(d.variableName)||d.variableName===void 0)}p.is=b})(Je=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var wt;(function(p){function R(g,d){return{range:g,expression:d}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&(k.string(d.expression)||d.expression===void 0)}p.is=b})(wt=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ue;(function(p){function R(g,d){return{frameId:g,stoppedLocation:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(g.stoppedLocation)}p.is=b})(ue=e.InlineValueContext||(e.InlineValueContext={}));var qe;(function(p){p.Type=1,p.Parameter=2;function R(b){return b===1||b===2}p.is=R})(qe=e.InlayHintKind||(e.InlayHintKind={}));var Te;(function(p){function R(g){return{value:g}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&(d.tooltip===void 0||k.string(d.tooltip)||Kn.is(d.tooltip))&&(d.location===void 0||c.is(d.location))&&(d.command===void 0||$.is(d.command))}p.is=b})(Te=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var yt;(function(p){function R(g,d,E){var I={position:g,label:d};return E!==void 0&&(I.kind=E),I}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&s.is(d.position)&&(k.string(d.label)||k.typedArray(d.label,Te.is))&&(d.kind===void 0||qe.is(d.kind))&&d.textEdits===void 0||k.typedArray(d.textEdits,D.is)&&(d.tooltip===void 0||k.string(d.tooltip)||Kn.is(d.tooltip))&&(d.paddingLeft===void 0||k.boolean(d.paddingLeft))&&(d.paddingRight===void 0||k.boolean(d.paddingRight))}p.is=b})(yt=e.InlayHint||(e.InlayHint={}));var rr;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&n.is(g.uri)&&k.string(g.name)}p.is=R})(rr=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var Wn;(function(p){function R(E,I,re,pt){return new wn(E,I,re,pt)}p.create=R;function b(E){var I=E;return!!(k.defined(I)&&k.string(I.uri)&&(k.undefined(I.languageId)||k.string(I.languageId))&&k.uinteger(I.lineCount)&&k.func(I.getText)&&k.func(I.positionAt)&&k.func(I.offsetAt))}p.is=b;function g(E,I){for(var re=E.getText(),pt=d(I,function(jo,ol){var Yg=jo.range.start.line-ol.range.start.line;return Yg===0?jo.range.start.character-ol.range.start.character:Yg}),Ue=re.length,tn=pt.length-1;tn>=0;tn--){var rn=pt[tn],Vn=E.offsetAt(rn.range.start),fe=E.offsetAt(rn.range.end);if(fe<=Ue)re=re.substring(0,Vn)+rn.newText+re.substring(fe,re.length);else throw new Error("Overlapping edit");Ue=Vn}return re}p.applyEdits=g;function d(E,I){if(E.length<=1)return E;var re=E.length/2|0,pt=E.slice(0,re),Ue=E.slice(re);d(pt,I),d(Ue,I);for(var tn=0,rn=0,Vn=0;tn<pt.length&&rn<Ue.length;){var fe=I(pt[tn],Ue[rn]);fe<=0?E[Vn++]=pt[tn++]:E[Vn++]=Ue[rn++]}for(;tn<pt.length;)E[Vn++]=pt[tn++];for(;rn<Ue.length;)E[Vn++]=Ue[rn++];return E}})(Wn=e.TextDocument||(e.TextDocument={}));var wn=function(){function p(R,b,g,d){this._uri=R,this._languageId=b,this._version=g,this._content=d,this._lineOffsets=void 0}return Object.defineProperty(p.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),p.prototype.getText=function(R){if(R){var b=this.offsetAt(R.start),g=this.offsetAt(R.end);return this._content.substring(b,g)}return this._content},p.prototype.update=function(R,b){this._content=R.text,this._version=b,this._lineOffsets=void 0},p.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var R=[],b=this._content,g=!0,d=0;d<b.length;d++){g&&(R.push(d),g=!1);var E=b.charAt(d);g=E==="\r"||E===`
`,E==="\r"&&d+1<b.length&&b.charAt(d+1)===`
`&&d++}g&&b.length>0&&R.push(b.length),this._lineOffsets=R}return this._lineOffsets},p.prototype.positionAt=function(R){R=Math.max(Math.min(R,this._content.length),0);var b=this.getLineOffsets(),g=0,d=b.length;if(d===0)return s.create(0,R);for(;g<d;){var E=Math.floor((g+d)/2);b[E]>R?d=E:g=E+1}var I=g-1;return s.create(I,R-b[I])},p.prototype.offsetAt=function(R){var b=this.getLineOffsets();if(R.line>=b.length)return this._content.length;if(R.line<0)return 0;var g=b[R.line],d=R.line+1<b.length?b[R.line+1]:this._content.length;return Math.max(Math.min(g+R.character,d),g)},Object.defineProperty(p.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),p}(),k;(function(p){var R=Object.prototype.toString;function b(fe){return typeof fe<"u"}p.defined=b;function g(fe){return typeof fe>"u"}p.undefined=g;function d(fe){return fe===!0||fe===!1}p.boolean=d;function E(fe){return R.call(fe)==="[object String]"}p.string=E;function I(fe){return R.call(fe)==="[object Number]"}p.number=I;function re(fe,jo,ol){return R.call(fe)==="[object Number]"&&jo<=fe&&fe<=ol}p.numberRange=re;function pt(fe){return R.call(fe)==="[object Number]"&&-2147483648<=fe&&fe<=2147483647}p.integer=pt;function Ue(fe){return R.call(fe)==="[object Number]"&&0<=fe&&fe<=2147483647}p.uinteger=Ue;function tn(fe){return R.call(fe)==="[object Function]"}p.func=tn;function rn(fe){return fe!==null&&typeof fe=="object"}p.objectLiteral=rn;function Vn(fe,jo){return Array.isArray(fe)&&fe.every(jo)}p.typedArray=Vn})(k||(k={}))})});var it=H(pr=>{"use strict";Object.defineProperty(pr,"__esModule",{value:!0});pr.ProtocolNotificationType=pr.ProtocolNotificationType0=pr.ProtocolRequestType=pr.ProtocolRequestType0=pr.RegistrationType=pr.MessageDirection=void 0;var zo=Qn(),Ek;(function(r){r.clientToServer="clientToServer",r.serverToClient="serverToClient",r.both="both"})(Ek=pr.MessageDirection||(pr.MessageDirection={}));var ym=class{constructor(e){this.method=e}};pr.RegistrationType=ym;var Tm=class extends zo.RequestType0{constructor(e){super(e)}};pr.ProtocolRequestType0=Tm;var vm=class extends zo.RequestType{constructor(e){super(e,zo.ParameterStructures.byName)}};pr.ProtocolRequestType=vm;var xm=class extends zo.NotificationType0{constructor(e){super(e)}};pr.ProtocolNotificationType0=xm;var Rm=class extends zo.NotificationType{constructor(e){super(e,zo.ParameterStructures.byName)}};pr.ProtocolNotificationType=Rm});var gl=H(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.objectLiteral=St.typedArray=St.stringArray=St.array=St.func=St.error=St.number=St.string=St.boolean=void 0;function $k(r){return r===!0||r===!1}St.boolean=$k;function by(r){return typeof r=="string"||r instanceof String}St.string=by;function Nk(r){return typeof r=="number"||r instanceof Number}St.number=Nk;function _k(r){return r instanceof Error}St.error=_k;function Ik(r){return typeof r=="function"}St.func=Ik;function Ay(r){return Array.isArray(r)}St.array=Ay;function Pk(r){return Ay(r)&&r.every(e=>by(e))}St.stringArray=Pk;function Dk(r,e){return Array.isArray(r)&&r.every(e)}St.typedArray=Dk;function Ok(r){return r!==null&&typeof r=="object"}St.objectLiteral=Ok});var Sy=H(Oa=>{"use strict";Object.defineProperty(Oa,"__esModule",{value:!0});Oa.ImplementationRequest=void 0;var wy=it(),Lk;(function(r){r.method="textDocument/implementation",r.messageDirection=wy.MessageDirection.clientToServer,r.type=new wy.ProtocolRequestType(r.method)})(Lk=Oa.ImplementationRequest||(Oa.ImplementationRequest={}))});var ky=H(La=>{"use strict";Object.defineProperty(La,"__esModule",{value:!0});La.TypeDefinitionRequest=void 0;var Cy=it(),Mk;(function(r){r.method="textDocument/typeDefinition",r.messageDirection=Cy.MessageDirection.clientToServer,r.type=new Cy.ProtocolRequestType(r.method)})(Mk=La.TypeDefinitionRequest||(La.TypeDefinitionRequest={}))});var Ey=H(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.DidChangeWorkspaceFoldersNotification=Si.WorkspaceFoldersRequest=void 0;var yl=it(),Fk;(function(r){r.method="workspace/workspaceFolders",r.messageDirection=yl.MessageDirection.serverToClient,r.type=new yl.ProtocolRequestType0(r.method)})(Fk=Si.WorkspaceFoldersRequest||(Si.WorkspaceFoldersRequest={}));var qk;(function(r){r.method="workspace/didChangeWorkspaceFolders",r.messageDirection=yl.MessageDirection.clientToServer,r.type=new yl.ProtocolNotificationType(r.method)})(qk=Si.DidChangeWorkspaceFoldersNotification||(Si.DidChangeWorkspaceFoldersNotification={}))});var Ny=H(Ma=>{"use strict";Object.defineProperty(Ma,"__esModule",{value:!0});Ma.ConfigurationRequest=void 0;var $y=it(),Uk;(function(r){r.method="workspace/configuration",r.messageDirection=$y.MessageDirection.serverToClient,r.type=new $y.ProtocolRequestType(r.method)})(Uk=Ma.ConfigurationRequest||(Ma.ConfigurationRequest={}))});var _y=H(Ci=>{"use strict";Object.defineProperty(Ci,"__esModule",{value:!0});Ci.ColorPresentationRequest=Ci.DocumentColorRequest=void 0;var Tl=it(),Gk;(function(r){r.method="textDocument/documentColor",r.messageDirection=Tl.MessageDirection.clientToServer,r.type=new Tl.ProtocolRequestType(r.method)})(Gk=Ci.DocumentColorRequest||(Ci.DocumentColorRequest={}));var jk;(function(r){r.method="textDocument/colorPresentation",r.messageDirection=Tl.MessageDirection.clientToServer,r.type=new Tl.ProtocolRequestType(r.method)})(jk=Ci.ColorPresentationRequest||(Ci.ColorPresentationRequest={}))});var Py=H(Fa=>{"use strict";Object.defineProperty(Fa,"__esModule",{value:!0});Fa.FoldingRangeRequest=void 0;var Iy=it(),Hk;(function(r){r.method="textDocument/foldingRange",r.messageDirection=Iy.MessageDirection.clientToServer,r.type=new Iy.ProtocolRequestType(r.method)})(Hk=Fa.FoldingRangeRequest||(Fa.FoldingRangeRequest={}))});var Oy=H(qa=>{"use strict";Object.defineProperty(qa,"__esModule",{value:!0});qa.DeclarationRequest=void 0;var Dy=it(),Bk;(function(r){r.method="textDocument/declaration",r.messageDirection=Dy.MessageDirection.clientToServer,r.type=new Dy.ProtocolRequestType(r.method)})(Bk=qa.DeclarationRequest||(qa.DeclarationRequest={}))});var My=H(Ua=>{"use strict";Object.defineProperty(Ua,"__esModule",{value:!0});Ua.SelectionRangeRequest=void 0;var Ly=it(),Kk;(function(r){r.method="textDocument/selectionRange",r.messageDirection=Ly.MessageDirection.clientToServer,r.type=new Ly.ProtocolRequestType(r.method)})(Kk=Ua.SelectionRangeRequest||(Ua.SelectionRangeRequest={}))});var Fy=H(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.WorkDoneProgressCancelNotification=sn.WorkDoneProgressCreateRequest=sn.WorkDoneProgress=void 0;var Wk=Qn(),vl=it(),Vk;(function(r){r.type=new Wk.ProgressType;function e(t){return t===r.type}r.is=e})(Vk=sn.WorkDoneProgress||(sn.WorkDoneProgress={}));var zk;(function(r){r.method="window/workDoneProgress/create",r.messageDirection=vl.MessageDirection.serverToClient,r.type=new vl.ProtocolRequestType(r.method)})(zk=sn.WorkDoneProgressCreateRequest||(sn.WorkDoneProgressCreateRequest={}));var Xk;(function(r){r.method="window/workDoneProgress/cancel",r.messageDirection=vl.MessageDirection.clientToServer,r.type=new vl.ProtocolNotificationType(r.method)})(Xk=sn.WorkDoneProgressCancelNotification||(sn.WorkDoneProgressCancelNotification={}))});var qy=H(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.CallHierarchyOutgoingCallsRequest=an.CallHierarchyIncomingCallsRequest=an.CallHierarchyPrepareRequest=void 0;var Xo=it(),Yk;(function(r){r.method="textDocument/prepareCallHierarchy",r.messageDirection=Xo.MessageDirection.clientToServer,r.type=new Xo.ProtocolRequestType(r.method)})(Yk=an.CallHierarchyPrepareRequest||(an.CallHierarchyPrepareRequest={}));var Jk;(function(r){r.method="callHierarchy/incomingCalls",r.messageDirection=Xo.MessageDirection.clientToServer,r.type=new Xo.ProtocolRequestType(r.method)})(Jk=an.CallHierarchyIncomingCallsRequest||(an.CallHierarchyIncomingCallsRequest={}));var Qk;(function(r){r.method="callHierarchy/outgoingCalls",r.messageDirection=Xo.MessageDirection.clientToServer,r.type=new Xo.ProtocolRequestType(r.method)})(Qk=an.CallHierarchyOutgoingCallsRequest||(an.CallHierarchyOutgoingCallsRequest={}))});var Uy=H(Ct=>{"use strict";Object.defineProperty(Ct,"__esModule",{value:!0});Ct.SemanticTokensRefreshRequest=Ct.SemanticTokensRangeRequest=Ct.SemanticTokensDeltaRequest=Ct.SemanticTokensRequest=Ct.SemanticTokensRegistrationType=Ct.TokenFormat=void 0;var Zn=it(),Zk;(function(r){r.Relative="relative"})(Zk=Ct.TokenFormat||(Ct.TokenFormat={}));var xl;(function(r){r.method="textDocument/semanticTokens",r.type=new Zn.RegistrationType(r.method)})(xl=Ct.SemanticTokensRegistrationType||(Ct.SemanticTokensRegistrationType={}));var eE;(function(r){r.method="textDocument/semanticTokens/full",r.messageDirection=Zn.MessageDirection.clientToServer,r.type=new Zn.ProtocolRequestType(r.method),r.registrationMethod=xl.method})(eE=Ct.SemanticTokensRequest||(Ct.SemanticTokensRequest={}));var tE;(function(r){r.method="textDocument/semanticTokens/full/delta",r.messageDirection=Zn.MessageDirection.clientToServer,r.type=new Zn.ProtocolRequestType(r.method),r.registrationMethod=xl.method})(tE=Ct.SemanticTokensDeltaRequest||(Ct.SemanticTokensDeltaRequest={}));var rE;(function(r){r.method="textDocument/semanticTokens/range",r.messageDirection=Zn.MessageDirection.clientToServer,r.type=new Zn.ProtocolRequestType(r.method),r.registrationMethod=xl.method})(rE=Ct.SemanticTokensRangeRequest||(Ct.SemanticTokensRangeRequest={}));var nE;(function(r){r.method="workspace/semanticTokens/refresh",r.messageDirection=Zn.MessageDirection.clientToServer,r.type=new Zn.ProtocolRequestType0(r.method)})(nE=Ct.SemanticTokensRefreshRequest||(Ct.SemanticTokensRefreshRequest={}))});var jy=H(Ga=>{"use strict";Object.defineProperty(Ga,"__esModule",{value:!0});Ga.ShowDocumentRequest=void 0;var Gy=it(),iE;(function(r){r.method="window/showDocument",r.messageDirection=Gy.MessageDirection.serverToClient,r.type=new Gy.ProtocolRequestType(r.method)})(iE=Ga.ShowDocumentRequest||(Ga.ShowDocumentRequest={}))});var By=H(ja=>{"use strict";Object.defineProperty(ja,"__esModule",{value:!0});ja.LinkedEditingRangeRequest=void 0;var Hy=it(),oE;(function(r){r.method="textDocument/linkedEditingRange",r.messageDirection=Hy.MessageDirection.clientToServer,r.type=new Hy.ProtocolRequestType(r.method)})(oE=ja.LinkedEditingRangeRequest||(ja.LinkedEditingRangeRequest={}))});var Ky=H(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.WillDeleteFilesRequest=ot.DidDeleteFilesNotification=ot.DidRenameFilesNotification=ot.WillRenameFilesRequest=ot.DidCreateFilesNotification=ot.WillCreateFilesRequest=ot.FileOperationPatternKind=void 0;var Hr=it(),sE;(function(r){r.file="file",r.folder="folder"})(sE=ot.FileOperationPatternKind||(ot.FileOperationPatternKind={}));var aE;(function(r){r.method="workspace/willCreateFiles",r.messageDirection=Hr.MessageDirection.clientToServer,r.type=new Hr.ProtocolRequestType(r.method)})(aE=ot.WillCreateFilesRequest||(ot.WillCreateFilesRequest={}));var cE;(function(r){r.method="workspace/didCreateFiles",r.messageDirection=Hr.MessageDirection.clientToServer,r.type=new Hr.ProtocolNotificationType(r.method)})(cE=ot.DidCreateFilesNotification||(ot.DidCreateFilesNotification={}));var lE;(function(r){r.method="workspace/willRenameFiles",r.messageDirection=Hr.MessageDirection.clientToServer,r.type=new Hr.ProtocolRequestType(r.method)})(lE=ot.WillRenameFilesRequest||(ot.WillRenameFilesRequest={}));var uE;(function(r){r.method="workspace/didRenameFiles",r.messageDirection=Hr.MessageDirection.clientToServer,r.type=new Hr.ProtocolNotificationType(r.method)})(uE=ot.DidRenameFilesNotification||(ot.DidRenameFilesNotification={}));var fE;(function(r){r.method="workspace/didDeleteFiles",r.messageDirection=Hr.MessageDirection.clientToServer,r.type=new Hr.ProtocolNotificationType(r.method)})(fE=ot.DidDeleteFilesNotification||(ot.DidDeleteFilesNotification={}));var dE;(function(r){r.method="workspace/willDeleteFiles",r.messageDirection=Hr.MessageDirection.clientToServer,r.type=new Hr.ProtocolRequestType(r.method)})(dE=ot.WillDeleteFilesRequest||(ot.WillDeleteFilesRequest={}))});var Vy=H(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.MonikerRequest=cn.MonikerKind=cn.UniquenessLevel=void 0;var Wy=it(),pE;(function(r){r.document="document",r.project="project",r.group="group",r.scheme="scheme",r.global="global"})(pE=cn.UniquenessLevel||(cn.UniquenessLevel={}));var mE;(function(r){r.$import="import",r.$export="export",r.local="local"})(mE=cn.MonikerKind||(cn.MonikerKind={}));var hE;(function(r){r.method="textDocument/moniker",r.messageDirection=Wy.MessageDirection.clientToServer,r.type=new Wy.ProtocolRequestType(r.method)})(hE=cn.MonikerRequest||(cn.MonikerRequest={}))});var zy=H(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.TypeHierarchySubtypesRequest=ln.TypeHierarchySupertypesRequest=ln.TypeHierarchyPrepareRequest=void 0;var Yo=it(),gE;(function(r){r.method="textDocument/prepareTypeHierarchy",r.messageDirection=Yo.MessageDirection.clientToServer,r.type=new Yo.ProtocolRequestType(r.method)})(gE=ln.TypeHierarchyPrepareRequest||(ln.TypeHierarchyPrepareRequest={}));var yE;(function(r){r.method="typeHierarchy/supertypes",r.messageDirection=Yo.MessageDirection.clientToServer,r.type=new Yo.ProtocolRequestType(r.method)})(yE=ln.TypeHierarchySupertypesRequest||(ln.TypeHierarchySupertypesRequest={}));var TE;(function(r){r.method="typeHierarchy/subtypes",r.messageDirection=Yo.MessageDirection.clientToServer,r.type=new Yo.ProtocolRequestType(r.method)})(TE=ln.TypeHierarchySubtypesRequest||(ln.TypeHierarchySubtypesRequest={}))});var Xy=H(ki=>{"use strict";Object.defineProperty(ki,"__esModule",{value:!0});ki.InlineValueRefreshRequest=ki.InlineValueRequest=void 0;var Rl=it(),vE;(function(r){r.method="textDocument/inlineValue",r.messageDirection=Rl.MessageDirection.clientToServer,r.type=new Rl.ProtocolRequestType(r.method)})(vE=ki.InlineValueRequest||(ki.InlineValueRequest={}));var xE;(function(r){r.method="workspace/inlineValue/refresh",r.messageDirection=Rl.MessageDirection.clientToServer,r.type=new Rl.ProtocolRequestType0(r.method)})(xE=ki.InlineValueRefreshRequest||(ki.InlineValueRefreshRequest={}))});var Yy=H(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});un.InlayHintRefreshRequest=un.InlayHintResolveRequest=un.InlayHintRequest=void 0;var Jo=it(),RE;(function(r){r.method="textDocument/inlayHint",r.messageDirection=Jo.MessageDirection.clientToServer,r.type=new Jo.ProtocolRequestType(r.method)})(RE=un.InlayHintRequest||(un.InlayHintRequest={}));var bE;(function(r){r.method="inlayHint/resolve",r.messageDirection=Jo.MessageDirection.clientToServer,r.type=new Jo.ProtocolRequestType(r.method)})(bE=un.InlayHintResolveRequest||(un.InlayHintResolveRequest={}));var AE;(function(r){r.method="workspace/inlayHint/refresh",r.messageDirection=Jo.MessageDirection.clientToServer,r.type=new Jo.ProtocolRequestType0(r.method)})(AE=un.InlayHintRefreshRequest||(un.InlayHintRefreshRequest={}))});var Qy=H(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.DiagnosticRefreshRequest=Wt.WorkspaceDiagnosticRequest=Wt.DocumentDiagnosticRequest=Wt.DocumentDiagnosticReportKind=Wt.DiagnosticServerCancellationData=void 0;var Jy=Qn(),wE=gl(),Qo=it(),SE;(function(r){function e(t){let n=t;return n&&wE.boolean(n.retriggerRequest)}r.is=e})(SE=Wt.DiagnosticServerCancellationData||(Wt.DiagnosticServerCancellationData={}));var CE;(function(r){r.Full="full",r.Unchanged="unchanged"})(CE=Wt.DocumentDiagnosticReportKind||(Wt.DocumentDiagnosticReportKind={}));var kE;(function(r){r.method="textDocument/diagnostic",r.messageDirection=Qo.MessageDirection.clientToServer,r.type=new Qo.ProtocolRequestType(r.method),r.partialResult=new Jy.ProgressType})(kE=Wt.DocumentDiagnosticRequest||(Wt.DocumentDiagnosticRequest={}));var EE;(function(r){r.method="workspace/diagnostic",r.messageDirection=Qo.MessageDirection.clientToServer,r.type=new Qo.ProtocolRequestType(r.method),r.partialResult=new Jy.ProgressType})(EE=Wt.WorkspaceDiagnosticRequest||(Wt.WorkspaceDiagnosticRequest={}));var $E;(function(r){r.method="workspace/diagnostic/refresh",r.messageDirection=Qo.MessageDirection.clientToServer,r.type=new Qo.ProtocolRequestType0(r.method)})($E=Wt.DiagnosticRefreshRequest||(Wt.DiagnosticRefreshRequest={}))});var tT=H(xe=>{"use strict";Object.defineProperty(xe,"__esModule",{value:!0});xe.DidCloseNotebookDocumentNotification=xe.DidSaveNotebookDocumentNotification=xe.DidChangeNotebookDocumentNotification=xe.NotebookCellArrayChange=xe.DidOpenNotebookDocumentNotification=xe.NotebookDocumentSyncRegistrationType=xe.NotebookDocument=xe.NotebookCell=xe.ExecutionSummary=xe.NotebookCellKind=void 0;var Ha=uo(),fn=gl(),Sn=it(),Zy;(function(r){r.Markup=1,r.Code=2;function e(t){return t===1||t===2}r.is=e})(Zy=xe.NotebookCellKind||(xe.NotebookCellKind={}));var eT;(function(r){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}r.create=e;function t(i){let o=i;return fn.objectLiteral(o)&&Ha.uinteger.is(o.executionOrder)&&(o.success===void 0||fn.boolean(o.success))}r.is=t;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}r.equals=n})(eT=xe.ExecutionSummary||(xe.ExecutionSummary={}));var bm;(function(r){function e(o,s){return{kind:o,document:s}}r.create=e;function t(o){let s=o;return fn.objectLiteral(s)&&Zy.is(s.kind)&&Ha.DocumentUri.is(s.document)&&(s.metadata===void 0||fn.objectLiteral(s.metadata))}r.is=t;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!eT.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}r.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),c=Array.isArray(s);if(a!==c)return!1;if(a&&c){if(o.length!==s.length)return!1;for(let l=0;l<o.length;l++)if(!i(o[l],s[l]))return!1}if(fn.objectLiteral(o)&&fn.objectLiteral(s)){let l=Object.keys(o),u=Object.keys(s);if(l.length!==u.length||(l.sort(),u.sort(),!i(l,u)))return!1;for(let f=0;f<l.length;f++){let m=l[f];if(!i(o[m],s[m]))return!1}}return!0}})(bm=xe.NotebookCell||(xe.NotebookCell={}));var NE;(function(r){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}r.create=e;function t(n){let i=n;return fn.objectLiteral(i)&&fn.string(i.uri)&&Ha.integer.is(i.version)&&fn.typedArray(i.cells,bm.is)}r.is=t})(NE=xe.NotebookDocument||(xe.NotebookDocument={}));var Ba;(function(r){r.method="notebookDocument/sync",r.messageDirection=Sn.MessageDirection.clientToServer,r.type=new Sn.RegistrationType(r.method)})(Ba=xe.NotebookDocumentSyncRegistrationType||(xe.NotebookDocumentSyncRegistrationType={}));var _E;(function(r){r.method="notebookDocument/didOpen",r.messageDirection=Sn.MessageDirection.clientToServer,r.type=new Sn.ProtocolNotificationType(r.method),r.registrationMethod=Ba.method})(_E=xe.DidOpenNotebookDocumentNotification||(xe.DidOpenNotebookDocumentNotification={}));var IE;(function(r){function e(n){let i=n;return fn.objectLiteral(i)&&Ha.uinteger.is(i.start)&&Ha.uinteger.is(i.deleteCount)&&(i.cells===void 0||fn.typedArray(i.cells,bm.is))}r.is=e;function t(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}r.create=t})(IE=xe.NotebookCellArrayChange||(xe.NotebookCellArrayChange={}));var PE;(function(r){r.method="notebookDocument/didChange",r.messageDirection=Sn.MessageDirection.clientToServer,r.type=new Sn.ProtocolNotificationType(r.method),r.registrationMethod=Ba.method})(PE=xe.DidChangeNotebookDocumentNotification||(xe.DidChangeNotebookDocumentNotification={}));var DE;(function(r){r.method="notebookDocument/didSave",r.messageDirection=Sn.MessageDirection.clientToServer,r.type=new Sn.ProtocolNotificationType(r.method),r.registrationMethod=Ba.method})(DE=xe.DidSaveNotebookDocumentNotification||(xe.DidSaveNotebookDocumentNotification={}));var OE;(function(r){r.method="notebookDocument/didClose",r.messageDirection=Sn.MessageDirection.clientToServer,r.type=new Sn.ProtocolNotificationType(r.method),r.registrationMethod=Ba.method})(OE=xe.DidCloseNotebookDocumentNotification||(xe.DidCloseNotebookDocumentNotification={}))});var uT=H(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=void 0;var O=it(),rT=uo(),Vt=gl(),LE=Sy();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return LE.ImplementationRequest}});var ME=ky();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return ME.TypeDefinitionRequest}});var nT=Ey();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return nT.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return nT.DidChangeWorkspaceFoldersNotification}});var FE=Ny();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return FE.ConfigurationRequest}});var iT=_y();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return iT.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return iT.ColorPresentationRequest}});var qE=Py();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return qE.FoldingRangeRequest}});var UE=Oy();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return UE.DeclarationRequest}});var GE=My();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return GE.SelectionRangeRequest}});var Am=Fy();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return Am.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return Am.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return Am.WorkDoneProgressCancelNotification}});var wm=qy();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return wm.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return wm.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return wm.CallHierarchyPrepareRequest}});var Zo=Uy();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return Zo.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Zo.SemanticTokensRegistrationType}});var jE=jy();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return jE.ShowDocumentRequest}});var HE=By();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return HE.LinkedEditingRangeRequest}});var fo=Ky();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return fo.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return fo.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return fo.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return fo.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return fo.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return fo.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return fo.WillDeleteFilesRequest}});var Sm=Vy();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return Sm.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return Sm.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return Sm.MonikerRequest}});var Cm=zy();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return Cm.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return Cm.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return Cm.TypeHierarchySupertypesRequest}});var oT=Xy();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return oT.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return oT.InlineValueRefreshRequest}});var km=Yy();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return km.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return km.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return km.InlayHintRefreshRequest}});var Ka=Qy();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Ka.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Ka.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Ka.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Ka.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Ka.DiagnosticRefreshRequest}});var Cn=tT();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return Cn.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return Cn.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return Cn.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return Cn.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return Cn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return Cn.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return Cn.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return Cn.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return Cn.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return Cn.DidCloseNotebookDocumentNotification}});var sT;(function(r){function e(t){let n=t;return Vt.string(n.language)||Vt.string(n.scheme)||Vt.string(n.pattern)}r.is=e})(sT=h.TextDocumentFilter||(h.TextDocumentFilter={}));var aT;(function(r){function e(t){let n=t;return Vt.objectLiteral(n)&&(Vt.string(n.notebookType)||Vt.string(n.scheme)||Vt.string(n.pattern))}r.is=e})(aT=h.NotebookDocumentFilter||(h.NotebookDocumentFilter={}));var cT;(function(r){function e(t){let n=t;return Vt.objectLiteral(n)&&(Vt.string(n.notebook)||aT.is(n.notebook))&&(n.language===void 0||Vt.string(n.language))}r.is=e})(cT=h.NotebookCellTextDocumentFilter||(h.NotebookCellTextDocumentFilter={}));var lT;(function(r){function e(t){if(!Array.isArray(t))return!1;for(let n of t)if(!Vt.string(n)&&!sT.is(n)&&!cT.is(n))return!1;return!0}r.is=e})(lT=h.DocumentSelector||(h.DocumentSelector={}));var BE;(function(r){r.method="client/registerCapability",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolRequestType(r.method)})(BE=h.RegistrationRequest||(h.RegistrationRequest={}));var KE;(function(r){r.method="client/unregisterCapability",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolRequestType(r.method)})(KE=h.UnregistrationRequest||(h.UnregistrationRequest={}));var WE;(function(r){r.Create="create",r.Rename="rename",r.Delete="delete"})(WE=h.ResourceOperationKind||(h.ResourceOperationKind={}));var VE;(function(r){r.Abort="abort",r.Transactional="transactional",r.TextOnlyTransactional="textOnlyTransactional",r.Undo="undo"})(VE=h.FailureHandlingKind||(h.FailureHandlingKind={}));var zE;(function(r){r.UTF8="utf-8",r.UTF16="utf-16",r.UTF32="utf-32"})(zE=h.PositionEncodingKind||(h.PositionEncodingKind={}));var XE;(function(r){function e(t){let n=t;return n&&Vt.string(n.id)&&n.id.length>0}r.hasId=e})(XE=h.StaticRegistrationOptions||(h.StaticRegistrationOptions={}));var YE;(function(r){function e(t){let n=t;return n&&(n.documentSelector===null||lT.is(n.documentSelector))}r.is=e})(YE=h.TextDocumentRegistrationOptions||(h.TextDocumentRegistrationOptions={}));var JE;(function(r){function e(n){let i=n;return Vt.objectLiteral(i)&&(i.workDoneProgress===void 0||Vt.boolean(i.workDoneProgress))}r.is=e;function t(n){let i=n;return i&&Vt.boolean(i.workDoneProgress)}r.hasWorkDoneProgress=t})(JE=h.WorkDoneProgressOptions||(h.WorkDoneProgressOptions={}));var QE;(function(r){r.method="initialize",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(QE=h.InitializeRequest||(h.InitializeRequest={}));var ZE;(function(r){r.unknownProtocolVersion=1})(ZE=h.InitializeErrorCodes||(h.InitializeErrorCodes={}));var e$;(function(r){r.method="initialized",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(e$=h.InitializedNotification||(h.InitializedNotification={}));var t$;(function(r){r.method="shutdown",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType0(r.method)})(t$=h.ShutdownRequest||(h.ShutdownRequest={}));var r$;(function(r){r.method="exit",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType0(r.method)})(r$=h.ExitNotification||(h.ExitNotification={}));var n$;(function(r){r.method="workspace/didChangeConfiguration",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(n$=h.DidChangeConfigurationNotification||(h.DidChangeConfigurationNotification={}));var i$;(function(r){r.Error=1,r.Warning=2,r.Info=3,r.Log=4})(i$=h.MessageType||(h.MessageType={}));var o$;(function(r){r.method="window/showMessage",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolNotificationType(r.method)})(o$=h.ShowMessageNotification||(h.ShowMessageNotification={}));var s$;(function(r){r.method="window/showMessageRequest",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolRequestType(r.method)})(s$=h.ShowMessageRequest||(h.ShowMessageRequest={}));var a$;(function(r){r.method="window/logMessage",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolNotificationType(r.method)})(a$=h.LogMessageNotification||(h.LogMessageNotification={}));var c$;(function(r){r.method="telemetry/event",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolNotificationType(r.method)})(c$=h.TelemetryEventNotification||(h.TelemetryEventNotification={}));var l$;(function(r){r.None=0,r.Full=1,r.Incremental=2})(l$=h.TextDocumentSyncKind||(h.TextDocumentSyncKind={}));var u$;(function(r){r.method="textDocument/didOpen",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(u$=h.DidOpenTextDocumentNotification||(h.DidOpenTextDocumentNotification={}));var f$;(function(r){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}r.isIncremental=e;function t(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}r.isFull=t})(f$=h.TextDocumentContentChangeEvent||(h.TextDocumentContentChangeEvent={}));var d$;(function(r){r.method="textDocument/didChange",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(d$=h.DidChangeTextDocumentNotification||(h.DidChangeTextDocumentNotification={}));var p$;(function(r){r.method="textDocument/didClose",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(p$=h.DidCloseTextDocumentNotification||(h.DidCloseTextDocumentNotification={}));var m$;(function(r){r.method="textDocument/didSave",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(m$=h.DidSaveTextDocumentNotification||(h.DidSaveTextDocumentNotification={}));var h$;(function(r){r.Manual=1,r.AfterDelay=2,r.FocusOut=3})(h$=h.TextDocumentSaveReason||(h.TextDocumentSaveReason={}));var g$;(function(r){r.method="textDocument/willSave",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(g$=h.WillSaveTextDocumentNotification||(h.WillSaveTextDocumentNotification={}));var y$;(function(r){r.method="textDocument/willSaveWaitUntil",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(y$=h.WillSaveTextDocumentWaitUntilRequest||(h.WillSaveTextDocumentWaitUntilRequest={}));var T$;(function(r){r.method="workspace/didChangeWatchedFiles",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(T$=h.DidChangeWatchedFilesNotification||(h.DidChangeWatchedFilesNotification={}));var v$;(function(r){r.Created=1,r.Changed=2,r.Deleted=3})(v$=h.FileChangeType||(h.FileChangeType={}));var x$;(function(r){function e(t){let n=t;return Vt.objectLiteral(n)&&(rT.URI.is(n.baseUri)||rT.WorkspaceFolder.is(n.baseUri))&&Vt.string(n.pattern)}r.is=e})(x$=h.RelativePattern||(h.RelativePattern={}));var R$;(function(r){r.Create=1,r.Change=2,r.Delete=4})(R$=h.WatchKind||(h.WatchKind={}));var b$;(function(r){r.method="textDocument/publishDiagnostics",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolNotificationType(r.method)})(b$=h.PublishDiagnosticsNotification||(h.PublishDiagnosticsNotification={}));var A$;(function(r){r.Invoked=1,r.TriggerCharacter=2,r.TriggerForIncompleteCompletions=3})(A$=h.CompletionTriggerKind||(h.CompletionTriggerKind={}));var w$;(function(r){r.method="textDocument/completion",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(w$=h.CompletionRequest||(h.CompletionRequest={}));var S$;(function(r){r.method="completionItem/resolve",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(S$=h.CompletionResolveRequest||(h.CompletionResolveRequest={}));var C$;(function(r){r.method="textDocument/hover",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(C$=h.HoverRequest||(h.HoverRequest={}));var k$;(function(r){r.Invoked=1,r.TriggerCharacter=2,r.ContentChange=3})(k$=h.SignatureHelpTriggerKind||(h.SignatureHelpTriggerKind={}));var E$;(function(r){r.method="textDocument/signatureHelp",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(E$=h.SignatureHelpRequest||(h.SignatureHelpRequest={}));var $$;(function(r){r.method="textDocument/definition",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})($$=h.DefinitionRequest||(h.DefinitionRequest={}));var N$;(function(r){r.method="textDocument/references",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(N$=h.ReferencesRequest||(h.ReferencesRequest={}));var _$;(function(r){r.method="textDocument/documentHighlight",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(_$=h.DocumentHighlightRequest||(h.DocumentHighlightRequest={}));var I$;(function(r){r.method="textDocument/documentSymbol",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(I$=h.DocumentSymbolRequest||(h.DocumentSymbolRequest={}));var P$;(function(r){r.method="textDocument/codeAction",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(P$=h.CodeActionRequest||(h.CodeActionRequest={}));var D$;(function(r){r.method="codeAction/resolve",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(D$=h.CodeActionResolveRequest||(h.CodeActionResolveRequest={}));var O$;(function(r){r.method="workspace/symbol",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(O$=h.WorkspaceSymbolRequest||(h.WorkspaceSymbolRequest={}));var L$;(function(r){r.method="workspaceSymbol/resolve",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(L$=h.WorkspaceSymbolResolveRequest||(h.WorkspaceSymbolResolveRequest={}));var M$;(function(r){r.method="textDocument/codeLens",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(M$=h.CodeLensRequest||(h.CodeLensRequest={}));var F$;(function(r){r.method="codeLens/resolve",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(F$=h.CodeLensResolveRequest||(h.CodeLensResolveRequest={}));var q$;(function(r){r.method="workspace/codeLens/refresh",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolRequestType0(r.method)})(q$=h.CodeLensRefreshRequest||(h.CodeLensRefreshRequest={}));var U$;(function(r){r.method="textDocument/documentLink",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(U$=h.DocumentLinkRequest||(h.DocumentLinkRequest={}));var G$;(function(r){r.method="documentLink/resolve",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(G$=h.DocumentLinkResolveRequest||(h.DocumentLinkResolveRequest={}));var j$;(function(r){r.method="textDocument/formatting",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(j$=h.DocumentFormattingRequest||(h.DocumentFormattingRequest={}));var H$;(function(r){r.method="textDocument/rangeFormatting",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(H$=h.DocumentRangeFormattingRequest||(h.DocumentRangeFormattingRequest={}));var B$;(function(r){r.method="textDocument/onTypeFormatting",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(B$=h.DocumentOnTypeFormattingRequest||(h.DocumentOnTypeFormattingRequest={}));var K$;(function(r){r.Identifier=1})(K$=h.PrepareSupportDefaultBehavior||(h.PrepareSupportDefaultBehavior={}));var W$;(function(r){r.method="textDocument/rename",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(W$=h.RenameRequest||(h.RenameRequest={}));var V$;(function(r){r.method="textDocument/prepareRename",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(V$=h.PrepareRenameRequest||(h.PrepareRenameRequest={}));var z$;(function(r){r.method="workspace/executeCommand",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(z$=h.ExecuteCommandRequest||(h.ExecuteCommandRequest={}));var X$;(function(r){r.method="workspace/applyEdit",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolRequestType("workspace/applyEdit")})(X$=h.ApplyWorkspaceEditRequest||(h.ApplyWorkspaceEditRequest={}))});var dT=H(bl=>{"use strict";Object.defineProperty(bl,"__esModule",{value:!0});bl.createProtocolConnection=void 0;var fT=Qn();function Y$(r,e,t,n){return fT.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,fT.createMessageConnection)(r,e,t,n)}bl.createProtocolConnection=Y$});var pT=H(mr=>{"use strict";var J$=mr&&mr.__createBinding||(Object.create?function(r,e,t,n){n===void 0&&(n=t);var i=Object.getOwnPropertyDescriptor(e,t);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,n,i)}:function(r,e,t,n){n===void 0&&(n=t),r[n]=e[t]}),Al=mr&&mr.__exportStar||function(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&J$(e,r,t)};Object.defineProperty(mr,"__esModule",{value:!0});mr.LSPErrorCodes=mr.createProtocolConnection=void 0;Al(Qn(),mr);Al(uo(),mr);Al(it(),mr);Al(uT(),mr);var Q$=dT();Object.defineProperty(mr,"createProtocolConnection",{enumerable:!0,get:function(){return Q$.createProtocolConnection}});var Z$;(function(r){r.lspReservedErrorRangeStart=-32899,r.RequestFailed=-32803,r.ServerCancelled=-32802,r.ContentModified=-32801,r.RequestCancelled=-32800,r.lspReservedErrorRangeEnd=-32800})(Z$=mr.LSPErrorCodes||(mr.LSPErrorCodes={}))});var kt=H(kn=>{"use strict";var eN=kn&&kn.__createBinding||(Object.create?function(r,e,t,n){n===void 0&&(n=t);var i=Object.getOwnPropertyDescriptor(e,t);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,n,i)}:function(r,e,t,n){n===void 0&&(n=t),r[n]=e[t]}),mT=kn&&kn.__exportStar||function(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&eN(e,r,t)};Object.defineProperty(kn,"__esModule",{value:!0});kn.createProtocolConnection=void 0;var tN=gm();mT(gm(),kn);mT(pT(),kn);function rN(r,e,t,n){return(0,tN.createMessageConnection)(r,e,t,n)}kn.createProtocolConnection=rN});var $m=H(Ei=>{"use strict";Object.defineProperty(Ei,"__esModule",{value:!0});Ei.SemanticTokensBuilder=Ei.SemanticTokensDiff=Ei.SemanticTokensFeature=void 0;var wl=kt(),nN=r=>class extends r{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(wl.SemanticTokensRefreshRequest.type),on:e=>{let t=wl.SemanticTokensRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))},onDelta:e=>{let t=wl.SemanticTokensDeltaRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))},onRange:e=>{let t=wl.SemanticTokensRangeRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))}}}};Ei.SemanticTokensFeature=nN;var Sl=class{constructor(e,t){this.originalSequence=e,this.modifiedSequence=t}computeDiff(){let e=this.originalSequence.length,t=this.modifiedSequence.length,n=0;for(;n<t&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<t&&n<e){let i=e-1,o=t-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<t?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Ei.SemanticTokensDiff=Sl;var Em=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,t,n,i,o){let s=e,a=t;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=t}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new Sl(this._prevData,this._data).computeDiff()}:this.build()}};Ei.SemanticTokensBuilder=Em});var _m=H(Cl=>{"use strict";Object.defineProperty(Cl,"__esModule",{value:!0});Cl.TextDocuments=void 0;var po=kt(),Nm=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new po.Emitter,this._onDidOpen=new po.Emitter,this._onDidClose=new po.Emitter,this._onDidSave=new po.Emitter,this._onWillSave=new po.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=po.TextDocumentSyncKind.Incremental;let t=[];return t.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),t.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),t.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),t.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),t.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),t.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),po.Disposable.create(()=>{t.forEach(n=>n.dispose())})}};Cl.TextDocuments=Nm});var Pm=H(es=>{"use strict";Object.defineProperty(es,"__esModule",{value:!0});es.NotebookDocuments=es.NotebookSyncFeature=void 0;var Br=kt(),hT=_m(),iN=r=>class extends r{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Br.DidOpenNotebookDocumentNotification.type,t=>{e(t)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Br.DidChangeNotebookDocumentNotification.type,t=>{e(t)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Br.DidSaveNotebookDocumentNotification.type,t=>{e(t)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Br.DidCloseNotebookDocumentNotification.type,t=>{e(t)})}}};es.NotebookSyncFeature=iN;var kl=class r{onDidOpenTextDocument(e){return this.openHandler=e,Br.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Br.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Br.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return r.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return r.NULL_DISPOSE}onDidSaveTextDocument(){return r.NULL_DISPOSE}};kl.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var Im=class{constructor(e){e instanceof hT.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new hT.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Br.Emitter,this._onDidChange=new Br.Emitter,this._onDidSave=new Br.Emitter,this._onDidClose=new Br.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let t=this.notebookCellMap.get(e);return t&&t[0]}findNotebookDocumentForCell(e){let t=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(t);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let t=new kl,n=[];return n.push(this.cellTextDocuments.listen(t)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)t.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,c=i.change;c.metadata!==void 0&&(a=!0,o.metadata=c.metadata);let l=[],u=[],f=[],m=[];if(c.cells!==void 0){let C=c.cells;if(C.structure!==void 0){let v=C.structure.array;if(o.cells.splice(v.start,v.deleteCount,...v.cells!==void 0?v.cells:[]),C.structure.didOpen!==void 0)for(let y of C.structure.didOpen)t.openTextDocument({textDocument:y}),l.push(y.uri);if(C.structure.didClose)for(let y of C.structure.didClose)t.closeTextDocument({textDocument:y}),u.push(y.uri)}if(C.data!==void 0){let v=new Map(C.data.map(y=>[y.document,y]));for(let y=0;y<=o.cells.length;y++){let $=v.get(o.cells[y].document);if($!==void 0){let D=o.cells.splice(y,1,$);if(f.push({old:D[0],new:$}),v.delete($.document),v.size===0)break}}}if(C.textContent!==void 0)for(let v of C.textContent)t.changeTextDocument({textDocument:v.document,contentChanges:v.changes}),m.push(v.document.uri)}this.updateCellMap(o);let T={notebookDocument:o};a&&(T.metadata={old:s,new:o.metadata});let A=[];for(let C of l)A.push(this.getNotebookCell(C));let S=[];for(let C of u)S.push(this.getNotebookCell(C));let N=[];for(let C of m)N.push(this.getNotebookCell(C));(A.length>0||S.length>0||f.length>0||N.length>0)&&(T.cells={added:A,removed:S,changed:{data:f,textContent:N}}),(T.metadata!==void 0||T.cells!==void 0)&&this._onDidChange.fire(T)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)t.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),Br.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let t of e.cells)this.notebookCellMap.set(t.document,[t,e])}};es.NotebookDocuments=Im});var Dm=H(Et=>{"use strict";Object.defineProperty(Et,"__esModule",{value:!0});Et.thenable=Et.typedArray=Et.stringArray=Et.array=Et.func=Et.error=Et.number=Et.string=Et.boolean=void 0;function oN(r){return r===!0||r===!1}Et.boolean=oN;function gT(r){return typeof r=="string"||r instanceof String}Et.string=gT;function sN(r){return typeof r=="number"||r instanceof Number}Et.number=sN;function aN(r){return r instanceof Error}Et.error=aN;function yT(r){return typeof r=="function"}Et.func=yT;function TT(r){return Array.isArray(r)}Et.array=TT;function cN(r){return TT(r)&&r.every(e=>gT(e))}Et.stringArray=cN;function lN(r,e){return Array.isArray(r)&&r.every(e)}Et.typedArray=lN;function uN(r){return r&&yT(r.then)}Et.thenable=uN});var Om=H(Kr=>{"use strict";Object.defineProperty(Kr,"__esModule",{value:!0});Kr.generateUuid=Kr.parse=Kr.isUUID=Kr.v4=Kr.empty=void 0;var Wa=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},Va=class r extends Wa{constructor(){super([r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),"-",r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),"-","4",r._randomHex(),r._randomHex(),r._randomHex(),"-",r._oneOf(r._timeHighBits),r._randomHex(),r._randomHex(),r._randomHex(),"-",r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return r._oneOf(r._chars)}};Va._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];Va._timeHighBits=["8","9","a","b"];Kr.empty=new Wa("00000000-0000-0000-0000-000000000000");function vT(){return new Va}Kr.v4=vT;var fN=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function xT(r){return fN.test(r)}Kr.isUUID=xT;function dN(r){if(!xT(r))throw new Error("invalid uuid");return new Wa(r)}Kr.parse=dN;function pN(){return vT().asHex()}Kr.generateUuid=pN});var RT=H(Ni=>{"use strict";Object.defineProperty(Ni,"__esModule",{value:!0});Ni.attachPartialResult=Ni.ProgressFeature=Ni.attachWorkDone=void 0;var $i=kt(),mN=Om(),mo=class r{constructor(e,t){this._connection=e,this._token=t,r.Instances.set(this._token,this)}begin(e,t,n,i){let o={kind:"begin",title:e,percentage:t,message:n,cancellable:i};this._connection.sendProgress($i.WorkDoneProgress.type,this._token,o)}report(e,t){let n={kind:"report"};typeof e=="number"?(n.percentage=e,t!==void 0&&(n.message=t)):n.message=e,this._connection.sendProgress($i.WorkDoneProgress.type,this._token,n)}done(){r.Instances.delete(this._token),this._connection.sendProgress($i.WorkDoneProgress.type,this._token,{kind:"end"})}};mo.Instances=new Map;var El=class extends mo{constructor(e,t){super(e,t),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},za=class{constructor(){}begin(){}report(){}done(){}},$l=class extends za{constructor(){super(),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function hN(r,e){if(e===void 0||e.workDoneToken===void 0)return new za;let t=e.workDoneToken;return delete e.workDoneToken,new mo(r,t)}Ni.attachWorkDone=hN;var gN=r=>class extends r{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification($i.WorkDoneProgressCancelNotification.type,t=>{let n=mo.Instances.get(t.token);(n instanceof El||n instanceof $l)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new za:new mo(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,mN.generateUuid)();return this.connection.sendRequest($i.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new El(this.connection,e))}else return Promise.resolve(new $l)}};Ni.ProgressFeature=gN;var Lm;(function(r){r.type=new $i.ProgressType})(Lm||(Lm={}));var Mm=class{constructor(e,t){this._connection=e,this._token=t}report(e){this._connection.sendProgress(Lm.type,this._token,e)}};function yN(r,e){if(e===void 0||e.partialResultToken===void 0)return;let t=e.partialResultToken;return delete e.partialResultToken,new Mm(r,t)}Ni.attachPartialResult=yN});var bT=H(Nl=>{"use strict";Object.defineProperty(Nl,"__esModule",{value:!0});Nl.ConfigurationFeature=void 0;var TN=kt(),vN=Dm(),xN=r=>class extends r{getConfiguration(e){return e?vN.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let t={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(TN.ConfigurationRequest.type,t).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};Nl.ConfigurationFeature=xN});var AT=H(Il=>{"use strict";Object.defineProperty(Il,"__esModule",{value:!0});Il.WorkspaceFoldersFeature=void 0;var _l=kt(),RN=r=>class extends r{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let t=e.workspace;t&&t.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new _l.Emitter,this.connection.onNotification(_l.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let t=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=t===!0||typeof t=="string"}getWorkspaceFolders(){return this.connection.sendRequest(_l.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(_l.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};Il.WorkspaceFoldersFeature=RN});var wT=H(Pl=>{"use strict";Object.defineProperty(Pl,"__esModule",{value:!0});Pl.CallHierarchyFeature=void 0;var Fm=kt(),bN=r=>class extends r{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Fm.CallHierarchyPrepareRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t),void 0)),onIncomingCalls:e=>{let t=Fm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))},onOutgoingCalls:e=>{let t=Fm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))}}}};Pl.CallHierarchyFeature=bN});var ST=H(Dl=>{"use strict";Object.defineProperty(Dl,"__esModule",{value:!0});Dl.ShowDocumentFeature=void 0;var AN=kt(),wN=r=>class extends r{showDocument(e){return this.connection.sendRequest(AN.ShowDocumentRequest.type,e)}};Dl.ShowDocumentFeature=wN});var CT=H(Ol=>{"use strict";Object.defineProperty(Ol,"__esModule",{value:!0});Ol.FileOperationsFeature=void 0;var ts=kt(),SN=r=>class extends r{onDidCreateFiles(e){return this.connection.onNotification(ts.DidCreateFilesNotification.type,t=>{e(t)})}onDidRenameFiles(e){return this.connection.onNotification(ts.DidRenameFilesNotification.type,t=>{e(t)})}onDidDeleteFiles(e){return this.connection.onNotification(ts.DidDeleteFilesNotification.type,t=>{e(t)})}onWillCreateFiles(e){return this.connection.onRequest(ts.WillCreateFilesRequest.type,(t,n)=>e(t,n))}onWillRenameFiles(e){return this.connection.onRequest(ts.WillRenameFilesRequest.type,(t,n)=>e(t,n))}onWillDeleteFiles(e){return this.connection.onRequest(ts.WillDeleteFilesRequest.type,(t,n)=>e(t,n))}};Ol.FileOperationsFeature=SN});var kT=H(Ll=>{"use strict";Object.defineProperty(Ll,"__esModule",{value:!0});Ll.LinkedEditingRangeFeature=void 0;var CN=kt(),kN=r=>class extends r{onLinkedEditingRange(e){return this.connection.onRequest(CN.LinkedEditingRangeRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t),void 0))}};Ll.LinkedEditingRangeFeature=kN});var ET=H(Ml=>{"use strict";Object.defineProperty(Ml,"__esModule",{value:!0});Ml.TypeHierarchyFeature=void 0;var qm=kt(),EN=r=>class extends r{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(qm.TypeHierarchyPrepareRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t),void 0)),onSupertypes:e=>{let t=qm.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))},onSubtypes:e=>{let t=qm.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))}}}};Ml.TypeHierarchyFeature=EN});var NT=H(Fl=>{"use strict";Object.defineProperty(Fl,"__esModule",{value:!0});Fl.InlineValueFeature=void 0;var $T=kt(),$N=r=>class extends r{get inlineValue(){return{refresh:()=>this.connection.sendRequest($T.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest($T.InlineValueRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t)))}}};Fl.InlineValueFeature=$N});var _T=H(ql=>{"use strict";Object.defineProperty(ql,"__esModule",{value:!0});ql.InlayHintFeature=void 0;var Um=kt(),NN=r=>class extends r{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Um.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Um.InlayHintRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t))),resolve:e=>this.connection.onRequest(Um.InlayHintResolveRequest.type,(t,n)=>e(t,n))}}};ql.InlayHintFeature=NN});var IT=H(Ul=>{"use strict";Object.defineProperty(Ul,"__esModule",{value:!0});Ul.DiagnosticFeature=void 0;var Xa=kt(),_N=r=>class extends r{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Xa.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Xa.DocumentDiagnosticRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t),this.attachPartialResultProgress(Xa.DocumentDiagnosticRequest.partialResult,t))),onWorkspace:e=>this.connection.onRequest(Xa.WorkspaceDiagnosticRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t),this.attachPartialResultProgress(Xa.WorkspaceDiagnosticRequest.partialResult,t)))}}};Ul.DiagnosticFeature=_N});var PT=H(Gl=>{"use strict";Object.defineProperty(Gl,"__esModule",{value:!0});Gl.MonikerFeature=void 0;var IN=kt(),PN=r=>class extends r{get moniker(){return{on:e=>{let t=IN.MonikerRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))}}}};Gl.MonikerFeature=PN});var WT=H(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.createConnection=he.combineFeatures=he.combineNotebooksFeatures=he.combineLanguagesFeatures=he.combineWorkspaceFeatures=he.combineWindowFeatures=he.combineClientFeatures=he.combineTracerFeatures=he.combineTelemetryFeatures=he.combineConsoleFeatures=he._NotebooksImpl=he._LanguagesImpl=he.BulkUnregistration=he.BulkRegistration=he.ErrorMessageTracker=void 0;var q=kt(),Wr=Dm(),jm=Om(),te=RT(),DN=bT(),ON=AT(),LN=wT(),MN=$m(),FN=ST(),qN=CT(),UN=kT(),GN=ET(),jN=NT(),HN=_T(),BN=IT(),KN=Pm(),WN=PT();function Gm(r){if(r!==null)return r}var Hm=class{constructor(){this._messages=Object.create(null)}add(e){let t=this._messages[e];t||(t=0),t++,this._messages[e]=t}sendErrors(e){Object.keys(this._messages).forEach(t=>{e.window.showErrorMessage(t)})}};he.ErrorMessageTracker=Hm;var jl=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(q.MessageType.Error,e)}warn(e){this.send(q.MessageType.Warning,e)}info(e){this.send(q.MessageType.Info,e)}log(e){this.send(q.MessageType.Log,e)}send(e,t){this._rawConnection&&this._rawConnection.sendNotification(q.LogMessageNotification.type,{type:e,message:t}).catch(()=>{(0,q.RAL)().console.error("Sending log message failed")})}},Bm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...t){let n={type:q.MessageType.Error,message:e,actions:t};return this.connection.sendRequest(q.ShowMessageRequest.type,n).then(Gm)}showWarningMessage(e,...t){let n={type:q.MessageType.Warning,message:e,actions:t};return this.connection.sendRequest(q.ShowMessageRequest.type,n).then(Gm)}showInformationMessage(e,...t){let n={type:q.MessageType.Info,message:e,actions:t};return this.connection.sendRequest(q.ShowMessageRequest.type,n).then(Gm)}},DT=(0,FN.ShowDocumentFeature)((0,te.ProgressFeature)(Bm)),VN;(function(r){function e(){return new Hl}r.create=e})(VN=he.BulkRegistration||(he.BulkRegistration={}));var Hl=class{constructor(){this._registrations=[],this._registered=new Set}add(e,t){let n=Wr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=jm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:t||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},zN;(function(r){function e(){return new Ya(void 0,[])}r.create=e})(zN=he.BulkUnregistration||(he.BulkUnregistration={}));var Ya=class{constructor(e,t){this._connection=e,this._unregistrations=new Map,t.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let t={unregisterations:e};this._connection.sendRequest(q.UnregistrationRequest.type,t).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let t=Wr.string(e)?e:e.method,n=this._unregistrations.get(t);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(q.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(t)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Bl=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,t,n){return e instanceof Hl?this.registerMany(e):e instanceof Ya?this.registerSingle1(e,t,n):this.registerSingle2(e,t)}registerSingle1(e,t,n){let i=Wr.string(t)?t:t.method,o=jm.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(q.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,t){let n=Wr.string(e)?e:e.method,i=jm.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:t||{}}]};return this.connection.sendRequest(q.RegistrationRequest.type,o).then(s=>q.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,t){let n={unregisterations:[{id:e,method:t}]};return this.connection.sendRequest(q.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let t=e.asRegistrationParams();return this.connection.sendRequest(q.RegistrationRequest.type,t).then(()=>new Ya(this._connection,t.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Km=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function t(i){return i&&!!i.edit}let n=t(e)?e:{edit:e};return this.connection.sendRequest(q.ApplyWorkspaceEditRequest.type,n)}},OT=(0,qN.FileOperationsFeature)((0,ON.WorkspaceFoldersFeature)((0,DN.ConfigurationFeature)(Km))),Kl=class{constructor(){this._trace=q.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,t){this._trace!==q.Trace.Off&&this.connection.sendNotification(q.LogTraceNotification.type,{message:e,verbose:this._trace===q.Trace.Verbose?t:void 0}).catch(()=>{})}},Wl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(q.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Vl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,t){return(0,te.attachPartialResult)(this.connection,t)}};he._LanguagesImpl=Vl;var LT=(0,WN.MonikerFeature)((0,BN.DiagnosticFeature)((0,HN.InlayHintFeature)((0,jN.InlineValueFeature)((0,GN.TypeHierarchyFeature)((0,UN.LinkedEditingRangeFeature)((0,MN.SemanticTokensFeature)((0,LN.CallHierarchyFeature)(Vl)))))))),zl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,t){return(0,te.attachPartialResult)(this.connection,t)}};he._NotebooksImpl=zl;var MT=(0,KN.NotebookSyncFeature)(zl);function FT(r,e){return function(t){return e(r(t))}}he.combineConsoleFeatures=FT;function qT(r,e){return function(t){return e(r(t))}}he.combineTelemetryFeatures=qT;function UT(r,e){return function(t){return e(r(t))}}he.combineTracerFeatures=UT;function GT(r,e){return function(t){return e(r(t))}}he.combineClientFeatures=GT;function jT(r,e){return function(t){return e(r(t))}}he.combineWindowFeatures=jT;function HT(r,e){return function(t){return e(r(t))}}he.combineWorkspaceFeatures=HT;function BT(r,e){return function(t){return e(r(t))}}he.combineLanguagesFeatures=BT;function KT(r,e){return function(t){return e(r(t))}}he.combineNotebooksFeatures=KT;function XN(r,e){function t(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:t(r.console,e.console,FT),tracer:t(r.tracer,e.tracer,UT),telemetry:t(r.telemetry,e.telemetry,qT),client:t(r.client,e.client,GT),window:t(r.window,e.window,jT),workspace:t(r.workspace,e.workspace,HT),languages:t(r.languages,e.languages,BT),notebooks:t(r.notebooks,e.notebooks,KT)}}he.combineFeatures=XN;function YN(r,e,t){let n=t&&t.console?new(t.console(jl)):new jl,i=r(n);n.rawAttach(i);let o=t&&t.tracer?new(t.tracer(Kl)):new Kl,s=t&&t.telemetry?new(t.telemetry(Wl)):new Wl,a=t&&t.client?new(t.client(Bl)):new Bl,c=t&&t.window?new(t.window(DT)):new DT,l=t&&t.workspace?new(t.workspace(OT)):new OT,u=t&&t.languages?new(t.languages(LT)):new LT,f=t&&t.notebooks?new(t.notebooks(MT)):new MT,m=[n,o,s,a,c,l,u,f];function T(v){return v instanceof Promise?v:Wr.thenable(v)?new Promise((y,$)=>{v.then(D=>y(D),D=>$(D))}):Promise.resolve(v)}let A,S,N,C={listen:()=>i.listen(),sendRequest:(v,...y)=>i.sendRequest(Wr.string(v)?v:v.method,...y),onRequest:(v,y)=>i.onRequest(v,y),sendNotification:(v,y)=>{let $=Wr.string(v)?v:v.method;return arguments.length===1?i.sendNotification($):i.sendNotification($,y)},onNotification:(v,y)=>i.onNotification(v,y),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:v=>(S=v,{dispose:()=>{S=void 0}}),onInitialized:v=>i.onNotification(q.InitializedNotification.type,v),onShutdown:v=>(A=v,{dispose:()=>{A=void 0}}),onExit:v=>(N=v,{dispose:()=>{N=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return c},get workspace(){return l},get languages(){return u},get notebooks(){return f},onDidChangeConfiguration:v=>i.onNotification(q.DidChangeConfigurationNotification.type,v),onDidChangeWatchedFiles:v=>i.onNotification(q.DidChangeWatchedFilesNotification.type,v),__textDocumentSync:void 0,onDidOpenTextDocument:v=>i.onNotification(q.DidOpenTextDocumentNotification.type,v),onDidChangeTextDocument:v=>i.onNotification(q.DidChangeTextDocumentNotification.type,v),onDidCloseTextDocument:v=>i.onNotification(q.DidCloseTextDocumentNotification.type,v),onWillSaveTextDocument:v=>i.onNotification(q.WillSaveTextDocumentNotification.type,v),onWillSaveTextDocumentWaitUntil:v=>i.onRequest(q.WillSaveTextDocumentWaitUntilRequest.type,v),onDidSaveTextDocument:v=>i.onNotification(q.DidSaveTextDocumentNotification.type,v),sendDiagnostics:v=>i.sendNotification(q.PublishDiagnosticsNotification.type,v),onHover:v=>i.onRequest(q.HoverRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onCompletion:v=>i.onRequest(q.CompletionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCompletionResolve:v=>i.onRequest(q.CompletionResolveRequest.type,v),onSignatureHelp:v=>i.onRequest(q.SignatureHelpRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDeclaration:v=>i.onRequest(q.DeclarationRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDefinition:v=>i.onRequest(q.DefinitionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onTypeDefinition:v=>i.onRequest(q.TypeDefinitionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onImplementation:v=>i.onRequest(q.ImplementationRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onReferences:v=>i.onRequest(q.ReferencesRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentHighlight:v=>i.onRequest(q.DocumentHighlightRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentSymbol:v=>i.onRequest(q.DocumentSymbolRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbol:v=>i.onRequest(q.WorkspaceSymbolRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbolResolve:v=>i.onRequest(q.WorkspaceSymbolResolveRequest.type,v),onCodeAction:v=>i.onRequest(q.CodeActionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeActionResolve:v=>i.onRequest(q.CodeActionResolveRequest.type,(y,$)=>v(y,$)),onCodeLens:v=>i.onRequest(q.CodeLensRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeLensResolve:v=>i.onRequest(q.CodeLensResolveRequest.type,(y,$)=>v(y,$)),onDocumentFormatting:v=>i.onRequest(q.DocumentFormattingRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDocumentRangeFormatting:v=>i.onRequest(q.DocumentRangeFormattingRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDocumentOnTypeFormatting:v=>i.onRequest(q.DocumentOnTypeFormattingRequest.type,(y,$)=>v(y,$)),onRenameRequest:v=>i.onRequest(q.RenameRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onPrepareRename:v=>i.onRequest(q.PrepareRenameRequest.type,(y,$)=>v(y,$)),onDocumentLinks:v=>i.onRequest(q.DocumentLinkRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentLinkResolve:v=>i.onRequest(q.DocumentLinkResolveRequest.type,(y,$)=>v(y,$)),onDocumentColor:v=>i.onRequest(q.DocumentColorRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onColorPresentation:v=>i.onRequest(q.ColorPresentationRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onFoldingRanges:v=>i.onRequest(q.FoldingRangeRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onSelectionRanges:v=>i.onRequest(q.SelectionRangeRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onExecuteCommand:v=>i.onRequest(q.ExecuteCommandRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),dispose:()=>i.dispose()};for(let v of m)v.attach(C);return i.onRequest(q.InitializeRequest.type,v=>{e.initialize(v),Wr.string(v.trace)&&(o.trace=q.Trace.fromString(v.trace));for(let y of m)y.initialize(v.capabilities);if(S){let y=S(v,new q.CancellationTokenSource().token,(0,te.attachWorkDone)(i,v),void 0);return T(y).then($=>{if($ instanceof q.ResponseError)return $;let D=$;D||(D={capabilities:{}});let X=D.capabilities;X||(X={},D.capabilities=X),X.textDocumentSync===void 0||X.textDocumentSync===null?X.textDocumentSync=Wr.number(C.__textDocumentSync)?C.__textDocumentSync:q.TextDocumentSyncKind.None:!Wr.number(X.textDocumentSync)&&!Wr.number(X.textDocumentSync.change)&&(X.textDocumentSync.change=Wr.number(C.__textDocumentSync)?C.__textDocumentSync:q.TextDocumentSyncKind.None);for(let ye of m)ye.fillServerCapabilities(X);return D})}else{let y={capabilities:{textDocumentSync:q.TextDocumentSyncKind.None}};for(let $ of m)$.fillServerCapabilities(y.capabilities);return y}}),i.onRequest(q.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,A)return A(new q.CancellationTokenSource().token)}),i.onNotification(q.ExitNotification.type,()=>{try{N&&N()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(q.SetTraceNotification.type,v=>{o.trace=q.Trace.fromString(v.value)}),C}he.createConnection=YN});var Wm=H(zt=>{"use strict";var JN=zt&&zt.__createBinding||(Object.create?function(r,e,t,n){n===void 0&&(n=t);var i=Object.getOwnPropertyDescriptor(e,t);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,n,i)}:function(r,e,t,n){n===void 0&&(n=t),r[n]=e[t]}),VT=zt&&zt.__exportStar||function(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&JN(e,r,t)};Object.defineProperty(zt,"__esModule",{value:!0});zt.ProposedFeatures=zt.NotebookDocuments=zt.TextDocuments=zt.SemanticTokensBuilder=void 0;var QN=$m();Object.defineProperty(zt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return QN.SemanticTokensBuilder}});VT(kt(),zt);var ZN=_m();Object.defineProperty(zt,"TextDocuments",{enumerable:!0,get:function(){return ZN.TextDocuments}});var e_=Pm();Object.defineProperty(zt,"NotebookDocuments",{enumerable:!0,get:function(){return e_.NotebookDocuments}});VT(WT(),zt);var t_;(function(r){r.all={__brand:"features"}})(t_=zt.ProposedFeatures||(zt.ProposedFeatures={}))});var XT=H((NH,zT)=>{"use strict";zT.exports=kt()});var Ae=H(En=>{"use strict";var r_=En&&En.__createBinding||(Object.create?function(r,e,t,n){n===void 0&&(n=t);var i=Object.getOwnPropertyDescriptor(e,t);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,n,i)}:function(r,e,t,n){n===void 0&&(n=t),r[n]=e[t]}),JT=En&&En.__exportStar||function(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&r_(e,r,t)};Object.defineProperty(En,"__esModule",{value:!0});En.createConnection=void 0;var Xl=Wm();JT(XT(),En);JT(Wm(),En);var YT=!1,n_={initialize:r=>{},get shutdownReceived(){return YT},set shutdownReceived(r){YT=r},exit:r=>{}};function i_(r,e,t,n){let i,o,s,a;r!==void 0&&r.__brand==="features"&&(i=r,r=e,e=t,t=n),Xl.ConnectionStrategy.is(r)||Xl.ConnectionOptions.is(r)?a=r:(o=r,s=e,a=t);let c=l=>(0,Xl.createProtocolConnection)(o,s,l,a);return(0,Xl.createConnection)(c,n_,i)}En.createConnection=i_});var pC=H((Zce,dC)=>{"use strict";dC.exports=Ae()});var fC=de(Ae(),1);var Yl=class r{constructor(e,t,n,i){this._uri=e,this._languageId=t,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let t=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(t,n)}return this._content}update(e,t){for(let n of e)if(r.isIncremental(n)){let i=ev(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),c=Math.max(i.end.line,0),l=this._lineOffsets,u=QT(n.text,!1,o);if(c-a===u.length)for(let m=0,T=u.length;m<T;m++)l[m+a+1]=u[m];else u.length<1e4?l.splice(a+1,c-a,...u):this._lineOffsets=l=l.slice(0,a+1).concat(u,l.slice(c+1));let f=n.text.length-(s-o);if(f!==0)for(let m=a+1+u.length,T=l.length;m<T;m++)l[m]=l[m]+f}else if(r.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=t}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=QT(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let t=this.getLineOffsets(),n=0,i=t.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);t[s]>e?i=s:n=s+1}let o=n-1;return e=this.ensureBeforeEOL(e,t[o]),{line:o,character:e-t[o]}}offsetAt(e){let t=this.getLineOffsets();if(e.line>=t.length)return this._content.length;if(e.line<0)return 0;let n=t[e.line];if(e.character<=0)return n;let i=e.line+1<t.length?t[e.line+1]:this._content.length,o=Math.min(n+e.character,i);return this.ensureBeforeEOL(o,n)}ensureBeforeEOL(e,t){for(;e>t&&ZT(this._content.charCodeAt(e-1));)e--;return e}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let t=e;return t!=null&&typeof t.text=="string"&&t.range!==void 0&&(t.rangeLength===void 0||typeof t.rangeLength=="number")}static isFull(e){let t=e;return t!=null&&typeof t.text=="string"&&t.range===void 0&&t.rangeLength===void 0}},rs;(function(r){function e(i,o,s,a){return new Yl(i,o,s,a)}r.create=e;function t(i,o,s){if(i instanceof Yl)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}r.update=t;function n(i,o){let s=i.getText(),a=Vm(o.map(o_),(u,f)=>{let m=u.range.start.line-f.range.start.line;return m===0?u.range.start.character-f.range.start.character:m}),c=0,l=[];for(let u of a){let f=i.offsetAt(u.range.start);if(f<c)throw new Error("Overlapping edit");f>c&&l.push(s.substring(c,f)),u.newText.length&&l.push(u.newText),c=i.offsetAt(u.range.end)}return l.push(s.substr(c)),l.join("")}r.applyEdits=n})(rs||(rs={}));function Vm(r,e){if(r.length<=1)return r;let t=r.length/2|0,n=r.slice(0,t),i=r.slice(t);Vm(n,e),Vm(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?r[a++]=n[o++]:r[a++]=i[s++];for(;o<n.length;)r[a++]=n[o++];for(;s<i.length;)r[a++]=i[s++];return r}function QT(r,e,t=0){let n=e?[t]:[];for(let i=0;i<r.length;i++){let o=r.charCodeAt(i);ZT(o)&&(o===13&&i+1<r.length&&r.charCodeAt(i+1)===10&&i++,n.push(t+i+1))}return n}function ZT(r){return r===13||r===10}function ev(r){let e=r.start,t=r.end;return e.line>t.line||e.line===t.line&&e.character>t.character?{start:t,end:e}:r}function o_(r){let e=ev(r.range);return e!==r.range?{newText:r.newText,range:e}:r}function $t(r){return typeof r=="object"&&r!==null&&typeof r.$type=="string"}function ei(r){return typeof r=="object"&&r!==null&&typeof r.$refText=="string"}function tv(r){return typeof r=="object"&&r!==null&&typeof r.name=="string"&&typeof r.type=="string"&&typeof r.path=="string"}function ns(r){return typeof r=="object"&&r!==null&&$t(r.container)&&ei(r.reference)&&typeof r.message=="string"}var ho=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,t){return $t(e)&&this.isSubtype(e.$type,t)}isSubtype(e,t){if(e===t)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[t];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,t);return n[t]=o,o}}getAllSubTypes(e){let t=this.allSubtypes[e];if(t)return t;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function $n(r){return typeof r=="object"&&r!==null&&Array.isArray(r.content)}function go(r){return typeof r=="object"&&r!==null&&typeof r.tokenType=="object"}function rv(r){return $n(r)&&typeof r.fullText=="string"}var Pr=class r{constructor(e,t){this.startFn=e,this.nextFn=t}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),t=0,n=e.next();for(;!n.done;)t++,n=e.next();return t}toArray(){let e=[],t=this.iterator(),n;do n=t.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,t){let n=this.map(i=>[e?e(i):i,t?t(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let t=e[Symbol.iterator]();return new r(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=t.next(),!i.done)return i;while(!i.done);return hr})}join(e=","){let t=this.iterator(),n="",i,o=!1;do i=t.next(),i.done||(o&&(n+=e),n+=s_(i.value)),o=!0;while(!i.done);return n}indexOf(e,t=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=t&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let t=this.iterator(),n=t.next();for(;!n.done;){if(!e(n.value))return!1;n=t.next()}return!0}some(e){let t=this.iterator(),n=t.next();for(;!n.done;){if(e(n.value))return!0;n=t.next()}return!1}forEach(e){let t=this.iterator(),n=0,i=t.next();for(;!i.done;)e(i.value,n),i=t.next(),n++}map(e){return new r(this.startFn,t=>{let{done:n,value:i}=this.nextFn(t);return n?hr:{done:!1,value:e(i)}})}filter(e){return new r(this.startFn,t=>{let n;do if(n=this.nextFn(t),!n.done&&e(n.value))return n;while(!n.done);return hr})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,t){let n=this.iterator(),i=t,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,t){return this.recursiveReduce(this.iterator(),e,t)}recursiveReduce(e,t,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,t,n);return o===void 0?i.value:t(o,i.value)}find(e){let t=this.iterator(),n=t.next();for(;!n.done;){if(e(n.value))return n.value;n=t.next()}}findIndex(e){let t=this.iterator(),n=0,i=t.next();for(;!i.done;){if(e(i.value))return n;i=t.next(),n++}return-1}includes(e){let t=this.iterator(),n=t.next();for(;!n.done;){if(n.value===e)return!0;n=t.next()}return!1}flatMap(e){return new r(()=>({this:this.startFn()}),t=>{do{if(t.iterator){let o=t.iterator.next();if(o.done)t.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(t.this);if(!n){let o=e(i);if(Jl(o))t.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(t.iterator);return hr})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let t=e>1?this.flat(e-1):this;return new r(()=>({this:t.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=t.nextFn(n.this);if(!i)if(Jl(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return hr})}head(){let t=this.iterator().next();if(!t.done)return t.value}tail(e=1){return new r(()=>{let t=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(t).done)return t;return t},this.nextFn)}limit(e){return new r(()=>({size:0,state:this.startFn()}),t=>(t.size++,t.size>e?hr:this.nextFn(t.state)))}distinct(e){let t=new Set;return this.filter(n=>{let i=e?e(n):n;return t.has(i)?!1:(t.add(i),!0)})}exclude(e,t){let n=new Set;for(let i of e){let o=t?t(i):i;n.add(o)}return this.filter(i=>{let o=t?t(i):i;return!n.has(o)})}};function s_(r){return typeof r=="string"?r:typeof r>"u"?"undefined":typeof r.toString=="function"?r.toString():Object.prototype.toString.call(r)}function Jl(r){return!!r&&typeof r[Symbol.iterator]=="function"}var is=new Pr(()=>{},()=>hr),hr=Object.freeze({done:!0,value:void 0});function ie(...r){if(r.length===1){let e=r[0];if(e instanceof Pr)return e;if(Jl(e))return new Pr(()=>e[Symbol.iterator](),t=>t.next());if(typeof e.length=="number")return new Pr(()=>({index:0}),t=>t.index<e.length?{done:!1,value:e[t.index++]}:hr)}return r.length>1?new Pr(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let t=e.iterator.next();if(!t.done)return t;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<r.length){let t=r[e.collIndex++];Jl(t)?e.iterator=t[Symbol.iterator]():t&&typeof t.length=="number"&&(e.array=t)}}while(e.iterator||e.array||e.collIndex<r.length);return hr}):is}var Vr=class extends Pr{constructor(e,t,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[t(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(t(s.value)[Symbol.iterator]()),s}return hr})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},Ja;(function(r){function e(o){return o.reduce((s,a)=>s+a,0)}r.sum=e;function t(o){return o.reduce((s,a)=>s*a,0)}r.product=t;function n(o){return o.reduce((s,a)=>Math.min(s,a))}r.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}r.max=i})(Ja=Ja||(Ja={}));function zm(r){return new Vr(r,e=>$n(e)?e.content:[],{includeRoot:!0})}function ov(r){return zm(r).filter(go)}function sv(r,e){for(;r.container;)if(r=r.container,r===e)return!0;return!1}function Qa(r){return{start:{character:r.startColumn-1,line:r.startLine-1},end:{character:r.endColumn,line:r.endLine-1}}}function or(r){if(!r)return;let{offset:e,end:t,range:n}=r;return{range:n,offset:e,end:t,length:t-e}}var ti;(function(r){r[r.Before=0]="Before",r[r.After=1]="After",r[r.OverlapFront=2]="OverlapFront",r[r.OverlapBack=3]="OverlapBack",r[r.Inside=4]="Inside"})(ti=ti||(ti={}));function a_(r,e){if(r.end.line<e.start.line||r.end.line===e.start.line&&r.end.character<r.start.character)return ti.Before;if(r.start.line>e.end.line||r.start.line===e.end.line&&r.start.character>e.end.character)return ti.After;let t=r.start.line>e.start.line||r.start.line===e.start.line&&r.start.character>=e.start.character,n=r.end.line<e.end.line||r.end.line===e.end.line&&r.end.character<=e.end.character;return t&&n?ti.Inside:t?ti.OverlapBack:ti.OverlapFront}function Ql(r,e){return a_(r,e)>ti.After}var Xm=/^[\w\p{L}]$/u;function Dt(r,e,t=Xm){if(r){if(e>0){let n=e-r.offset,i=r.text.charAt(n);t.test(i)||e--}return Ar(r,e)}}function av(r,e){if(r){let t=c_(r,!0);if(t&&nv(t,e))return t;if(rv(r)){let n=r.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=r.content[i];if(nv(o,e))return o}}}}function nv(r,e){return go(r)&&e.includes(r.tokenType.name)}function Ar(r,e){if(go(r))return r;if($n(r)){let t=0,n=r.content.length-1;for(;t<n;){let i=Math.floor((t+n)/2),o=r.content[i];if(o.offset>e)n=i-1;else if(o.end<=e)t=i+1;else return Ar(o,e)}if(t===n)return Ar(r.content[t],e)}}function c_(r,e=!0){for(;r.container;){let t=r.container,n=t.content.indexOf(r);for(;n>0;){n--;let i=t.content[n];if(e||!i.hidden)return i}r=t}}function cv(r,e=!0){for(;r.container;){let t=r.container,n=t.content.indexOf(r),i=t.content.length-1;for(;n<i;){n++;let o=t.content[n];if(e||!o.hidden)return o}r=t}}function lv(r,e){let t=l_(r,e);return t?t.parent.content.slice(t.a+1,t.b):[]}function l_(r,e){let t=iv(r),n=iv(e),i;for(let o=0;o<t.length&&o<n.length;o++){let s=t[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function iv(r){let e=[];for(;r.container;){let t=r.container,n=t.content.indexOf(r);e.push({parent:t,index:n}),r=t}return e.reverse()}function yo(r,e,t,n){let i=[r,e,t,n].reduce(pv,{});return dv(i)}var Ym=Symbol("isProxy");function Zl(r){if(r&&r[Ym])for(let e of Object.values(r))Zl(e);return r}function dv(r,e){let t=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>fv(n,i,r,e||t),getOwnPropertyDescriptor:(n,i)=>(fv(n,i,r,e||t),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in r,ownKeys:()=>[...Reflect.ownKeys(r),Ym]});return t[Ym]=!0,t}var uv=Symbol();function fv(r,e,t,n){if(e in r){if(r[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:r[e]});if(r[e]===uv)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/configuration-services/#resolving-cyclic-dependencies');return r[e]}else if(e in t){let i=t[e];r[e]=uv;try{r[e]=typeof i=="function"?i(n):dv(i,n)}catch(o){throw r[e]=o instanceof Error?o:void 0,o}return r[e]}else return}function pv(r,e){if(e){for(let[t,n]of Object.entries(e))if(n!==void 0){let i=r[t];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?r[t]=pv(i,n):r[t]=n}}return r}var Le=class{constructor(e){if(this.map=new Map,e)for(let[t,n]of e)this.add(t,n)}get size(){return Ja.sum(ie(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,t){if(t===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(t);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var t;return(t=this.map.get(e))!==null&&t!==void 0?t:[]}has(e,t){if(t===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(t)>=0:!1}}add(e,t){return this.map.has(e)?this.map.get(e).push(t):this.map.set(e,[t]),this}addAll(e,t){return this.map.has(e)?this.map.get(e).push(...t):this.map.set(e,Array.from(t)),this}forEach(e){this.map.forEach((t,n)=>t.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return ie(this.map.entries()).flatMap(([e,t])=>t.map(n=>[e,n]))}keys(){return ie(this.map.keys())}values(){return ie(this.map.values()).flat()}entriesGroupedByKey(){return ie(this.map.entries())}};var Jm="AbstractRule";var To="AbstractType";var u_="Condition";var f_="TypeDefinition";var Qm="AbstractElement";function os(r){return le.isInstance(r,Qm)}var mv="ArrayType";function vo(r){return le.isInstance(r,mv)}var hv="Conjunction";function gv(r){return le.isInstance(r,hv)}var yv="Disjunction";function Tv(r){return le.isInstance(r,yv)}var vv="Grammar";function ss(r){return le.isInstance(r,vv)}var d_="GrammarImport";function eu(r){return le.isInstance(r,d_)}var p_="InferredType";function as(r){return le.isInstance(r,p_)}var ec="Interface";function wr(r){return le.isInstance(r,ec)}var xv="LiteralCondition";function Rv(r){return le.isInstance(r,xv)}var bv="Negation";function Av(r){return le.isInstance(r,bv)}var wv="Parameter";function Sv(r){return le.isInstance(r,wv)}var Cv="ParameterReference";function cs(r){return le.isInstance(r,Cv)}var kv="ParserRule";function B(r){return le.isInstance(r,kv)}var Ev="ReferenceType";function xo(r){return le.isInstance(r,Ev)}var m_="ReturnType";function ls(r){return le.isInstance(r,m_)}var $v="SimpleType";function sr(r){return le.isInstance(r,$v)}var Zm="TerminalRule";function we(r){return le.isInstance(r,Zm)}var tc="Type";function Ft(r){return le.isInstance(r,tc)}var h_="TypeAttribute";function tu(r){return le.isInstance(r,h_)}var Nv="UnionType";function zr(r){return le.isInstance(r,Nv)}var _v="Action";function Ne(r){return le.isInstance(r,_v)}var Iv="Alternatives";function Dr(r){return le.isInstance(r,Iv)}var Pv="Assignment";function Re(r){return le.isInstance(r,Pv)}var Dv="CharacterRange";function ru(r){return le.isInstance(r,Dv)}var Ov="CrossReference";function Xt(r){return le.isInstance(r,Ov)}var Lv="Group";function qt(r){return le.isInstance(r,Lv)}var Mv="Keyword";function mt(r){return le.isInstance(r,Mv)}var Fv="NegatedToken";function qv(r){return le.isInstance(r,Fv)}var Uv="RegexToken";function Gv(r){return le.isInstance(r,Uv)}var jv="RuleCall";function _e(r){return le.isInstance(r,jv)}var Hv="TerminalAlternatives";function Bv(r){return le.isInstance(r,Hv)}var Kv="TerminalGroup";function Wv(r){return le.isInstance(r,Kv)}var Vv="TerminalRuleCall";function nu(r){return le.isInstance(r,Vv)}var zv="UnorderedGroup";function Or(r){return le.isInstance(r,zv)}var Xv="UntilToken";function Yv(r){return le.isInstance(r,Xv)}var Jv="Wildcard";function Qv(r){return le.isInstance(r,Jv)}var Za=class extends ho{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,t){switch(e){case _v:return this.isSubtype(Qm,t)||this.isSubtype(To,t);case Iv:case Pv:case Dv:case Ov:case Lv:case Mv:case Fv:case Uv:case jv:case Hv:case Kv:case Vv:case zv:case Xv:case Jv:return this.isSubtype(Qm,t);case mv:case Ev:case $v:case Nv:return this.isSubtype(f_,t);case hv:case yv:case xv:case bv:case Cv:return this.isSubtype(u_,t);case ec:case tc:return this.isSubtype(To,t);case kv:return this.isSubtype(Jm,t)||this.isSubtype(To,t);case Zm:return this.isSubtype(Jm,t);default:return!1}}getReferenceType(e){let t=`${e.container.$type}:${e.property}`;switch(t){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return To;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return Jm;case"Grammar:usedGrammars":return vv;case"NamedArgument:parameter":case"ParameterReference:parameter":return wv;case"TerminalRuleCall:rule":return Zm;default:throw new Error(`${t} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}},le=new Za;function Zv(r){for(let[e,t]of Object.entries(r))e.startsWith("$")||(Array.isArray(t)?t.forEach((n,i)=>{$t(n)&&(n.$container=r,n.$containerProperty=e,n.$containerIndex=i)}):$t(t)&&(t.$container=r,t.$containerProperty=e))}function Ie(r,e){let t=r;for(;t;){if(e(t))return t;t=t.$container}}function ne(r){let t=iu(r).$document;if(!t)throw new Error("AST node has no document.");return t}function iu(r){for(;r.$container;)r=r.$container;return r}function _i(r,e){if(!r)throw new Error("Node must be an AstNode.");let t=e?.range;return new Pr(()=>({keys:Object.keys(r),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=r[i];if($t(o)){if(n.keyIndex++,eh(o,t))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if($t(a)&&eh(a,t))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return hr})}function Qe(r,e){if(!r)throw new Error("Root node must be an AstNode.");return new Vr(r,t=>_i(t,e))}function ni(r,e){if(r){if(e?.range&&!eh(r,e.range))return new Vr(r,()=>[])}else throw new Error("Root node must be an AstNode.");return new Vr(r,t=>_i(t,e),{includeRoot:!0})}function eh(r,e){var t;if(!e)return!0;let n=(t=r.$cstNode)===null||t===void 0?void 0:t.range;return n?Ql(n,e):!1}function ou(r){return new Pr(()=>({keys:Object.keys(r),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let t=e.keys[e.keyIndex];if(!t.startsWith("$")){let n=r[t];if(ei(n))return e.keyIndex++,{done:!1,value:{reference:n,container:r,property:t}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(ei(o))return{done:!1,value:{reference:o,container:r,property:t,index:i}}}e.arrayIndex=0}}e.keyIndex++}return hr})}function ex(r){var e,t;if(r){if("astNode"in r)return T_(r);if(Array.isArray(r))return r.reduce(tx,void 0);{let n=r,i=g_(n)?y_((t=(e=n?.root)===null||e===void 0?void 0:e.astNode)!==null&&t!==void 0?t:n?.astNode):void 0;return us(n,i)}}else return}function g_(r){return typeof r<"u"&&"element"in r&&"text"in r}function y_(r){try{return ne(r).uri.toString()}catch{return}}function T_(r){var e,t;let{astNode:n,property:i,index:o}=r??{},s=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||s===void 0)){if(i===void 0)return us(s,th(n));{let a=c=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<c.length?c[o]:void 0:c.reduce(tx,void 0);if(!((t=s.assignments)===null||t===void 0)&&t[i]){let c=a(s.assignments[i]);return c&&us(c,th(n))}else if(n.$cstNode){let c=a(Ii(n.$cstNode,i));return c&&us(c,th(n))}else return}}}function th(r){var e,t,n,i;return r.$cstNode?(t=(e=ne(r))===null||e===void 0?void 0:e.uri)===null||t===void 0?void 0:t.toString():r.$textRegion?r.$textRegion.documentURI||((i=(n=new Vr(r,o=>o.$container?[o.$container]:[]).find(o=>{var s;return(s=o.$textRegion)===null||s===void 0?void 0:s.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function us(r,e){var t,n;let i={offset:r.offset,end:(t=r.end)!==null&&t!==void 0?t:r.offset+r.length,length:(n=r.length)!==null&&n!==void 0?n:r.end-r.offset};return r.range&&(i.range=r.range),e??(e=r.fileURI),e&&(i.fileURI=e),i}function tx(r,e){var t,n;if(r){if(!e)return r&&us(r)}else return e&&us(e);let i=(t=r.end)!==null&&t!==void 0?t:r.offset+r.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,s=Math.min(r.offset,e.offset),a=Math.max(i,o),c=a-s,l={offset:s,end:a,length:c};if(r.range&&e.range&&(l.range={start:e.range.start.line<r.range.start.line||e.range.start.line===r.range.start.line&&e.range.start.character<r.range.start.character?e.range.start:r.range.start,end:e.range.end.line>r.range.end.line||e.range.end.line===r.range.end.line&&e.range.end.character>r.range.end.character?e.range.end:r.range.end}),r.fileURI||e.fileURI){let u=r.fileURI,f=e.fileURI,m=u&&f&&u!==f?`<unmergable text regions of ${u}, ${f}>`:u??f;l.fileURI=m}return l}var rh=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,t){if(e.length>0){let n=t&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let t=this.traceData.length-1;t>=0;t--){let n=this.traceData[t];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[],this.pendingIndent=!0}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let t=v_(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(t),t}popTraceRegion(e){let t=this.traceData.pop();return this.assertTrue(t===e,"Trace region mismatch!"),t}getParentTraceSourceFileURI(){var e;for(let t=this.traceData.length-1;t>-1;t--){let n=(e=this.traceData[t].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,t){if(!e)throw new Error(t)}};function v_(r,e,t){let n={sourceRegion:r,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,s;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((s=n.targetRegion)===null||s===void 0)&&s.length&&t(n),delete n.complete,n}};return n}function rx(r,e){let t=new rh(e),n=t.pushTraceRegion(void 0);nx(r,t),t.popTraceRegion(n),n.complete&&n.complete(t.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i?.targetRegion,s=n.targetRegion;return o&&i.sourceRegion&&o.offset===s.offset&&o.length===s.length?{text:t.content,trace:i}:{text:t.content,trace:n}}function nx(r,e){typeof r=="string"?x_(r,e):r instanceof fs?R_(r,e):r instanceof Yt?sx(r,e):r instanceof Pi&&b_(r,e)}function ix(r,e){return typeof r=="string"?r.length!==0:r instanceof Yt?r.contents.some(t=>ix(t,e)):r instanceof Pi?!(r.ifNotEmpty&&e.currentLineContent.length===0):!1}function x_(r,e){r&&(e.pendingIndent&&ox(e,!1),e.append(r))}function ox(r,e){var t;let n="";for(let i of r.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(t=i.indentation)!==null&&t!==void 0?t:r.defaultIndentation;r.append(n,!0),r.pendingIndent=!1}function sx(r,e){let t,n=ex(r.tracedSource);n&&(t=e.pushTraceRegion(n));for(let i of r.contents)nx(i,e);if(t){e.popTraceRegion(t);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,t.complete&&t.complete(e.currentPosition)}}function R_(r,e){var t;if(ix(r,e)){r.indentImmediately&&!e.pendingIndent&&e.append((t=r.indentation)!==null&&t!==void 0?t:e.defaultIndentation,!0);try{e.increaseIndent(r),sx(r,e)}finally{e.decreaseIndent()}}}function b_(r,e){r.ifNotEmpty&&!A_(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&ox(e,!0),e.append(r.lineDelimiter),e.addNewLine())}function A_(r){return r.trimStart()!==""}var eB=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"),rc=/\r?\n/g,w_=/\S|$/;function ax(r){let e=r.filter(n=>n.length>0).map(n=>n.search(w_)),t=e.length===0?0:Math.min(...e);return Math.max(0,t)}function ih(r,...e){let t=S_(r),n=C_(r,e,t);return E_(n)}function ux(r,e,t){return(n,...i)=>oh(r,e,t)(ih(n,...i))}function S_(r){let e=r.join("_").split(rc),t=e.length>1&&e[0].trim().length===0,n=t&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:t,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=t?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(s=>s.length!==0);let o=ax(i);return{indentation:o,omitFirstLine:t,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function C_(r,e,{indentation:t,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let s=[];r.forEach((l,u)=>{s.push(...l.split(rc).map((f,m)=>m===0||f.length<t?f:f.substring(t)).reduce(u===0?(f,m,T)=>T===0?n?[]:[m]:T===1&&f.length===0?[m]:f.concat(su,m):(f,m,T)=>T===0?[m]:f.concat(su,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat(nc(e[u])?e[u]:e[u]!==void 0?{content:String(e[u])}:u<e.length?fx:[]))});let a=s.length,c=a!==0?s[a-1]:void 0;return(i||o)&&typeof c=="string"&&c.trim().length===0?n&&a!==1&&s[a-2]===su?s.slice(0,a-2):s.slice(0,a-1):s}var su={isNewLine:!0},fx={isUndefinedSegment:!0},lx=r=>r===su,nh=r=>r===fx,k_=r=>r.content!==void 0;function E_(r){return r.reduce((t,n,i)=>nh(n)?t:lx(n)?{node:i!==0&&(nh(r[i-1])||nc(r[i-1]))||i>1&&typeof r[i-1]=="string"&&(nh(r[i-2])||nc(r[i-2]))?t.node.appendNewLineIfNotEmpty():t.node.appendNewLine()}:(()=>{var o;let s=(i===0||lx(r[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimStart().length):"",a=k_(n)?n.content:n,c;return{node:t.indented?t.node:s.length!==0?t.node.indent({indentation:s,indentImmediately:!1,indentedChildren:l=>c=l.append(a)}):t.node.append(a),indented:c??((o=t.indented)===null||o===void 0?void 0:o.append(a))}})(),{node:new Yt}).node}var cx=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function nc(r){return r instanceof Yt||r instanceof fs||r instanceof Pi}function ds(r,e){return nc(r)?rx(r,e).text:String(r)}var Yt=class r{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,t,n){if($t(e)){if(this.tracedSource={astNode:e,property:t,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let t of e)typeof t=="function"?t(this):t&&this.contents.push(t);return this}appendIf(e,...t){return e?this.append(...t):this}appendNewLine(){return this.append(st)}appendNewLineIf(e){return e?this.append(st):this}appendNewLineIfNotEmpty(){return this.append($_)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...t){return this.append(ih(e,...t))}appendTemplateIf(e){return e?(t,...n)=>this.appendTemplate(t,...n):()=>this}indent(e){let{indentedChildren:t,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},s=new fs(n,o,i);return this.contents.push(s),Array.isArray(t)?s.append(...t):t&&s.append(t),this}appendTraced(e,t,n){return i=>this.append(new r().trace(e,t,n).append(i))}appendTracedIf(e,t,n,i){return e?this.appendTraced(typeof t=="function"?t():t,n,i):()=>this}appendTracedTemplate(e,t,n){return(i,...o)=>this.append(ux(e,t,n)(i,...o))}appendTracedTemplateIf(e,t,n,i){return e?this.appendTracedTemplate(typeof t=="function"?t():t,n,i):()=>this}};function oh(r,e,t){return n=>n instanceof Yt&&n.tracedSource===void 0?n.trace(r,e,t):new Yt().trace(r,e,t).append(n)}var fs=class extends Yt{constructor(e,t=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=t,this.indentEmptyLines=n}},Pi=class{constructor(e,t=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??cx,this.ifNotEmpty=t}},st=new Pi,$_=new Pi(void 0,!0);function ii(r){return"referenceType"in r}function oi(r){return"elementType"in r}function Ot(r){return"types"in r}function ch(r){if(Ot(r)){let e=[];for(let t of r.types)e.push(...ch(t));return e}else return[r]}function Lr(r){return"value"in r}function Mr(r){return"primitive"in r}function Nn(r){return"string"in r}function dn(r){return r&&"type"in r}function mn(r){return r&&"properties"in r}var cu=class{constructor(e,t){var n;this.superTypes=new Set,this.subTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=t?.declared)!==null&&n!==void 0?n:!1,this.dataType=t?.dataType}toAstTypesString(e){let t=new Yt;return t.append(`export type ${this.name} = ${pn(this.type,"AstType")};`,st),e&&(t.append(st),mx(t,this.name)),this.dataType&&N_(t,this),ds(t)}toDeclaredTypesString(e){let t=new Yt;return t.append(`type ${lh(this.name,e)} = ${pn(this.type,"DeclaredType")};`,st),ds(t)}},ps=class r{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let t=new Map;for(let n of this.properties)t.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let o of i)t.has(o.name)||t.set(o.name,o)}return Array.from(t.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,t,n){if(n.has(this.name))return;n.add(this.name);let i=mn(e)?e.properties:[];for(let o of i)t.has(o.name)||t.set(o.name,o);for(let o of e.subTypes)this.getSubTypeProperties(o,t,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof r)}constructor(e,t,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=t,this.abstract=n}toAstTypesString(e){let t=new Yt,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?Ro([...n]):["AstNode"];return t.append(`export interface ${this.name} extends ${i.join(", ")} {`,st),t.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${Ro([...this.containerTypes].map(s=>s.name)).join(" | ")};`,st),this.typeNames.size>0&&o.append(`readonly $type: ${Ro([...this.typeNames]).map(s=>`'${s}'`).join(" | ")};`,st),dx(o,this.properties,"AstType")}),t.append("}",st),e&&(t.append(st),mx(t,this.name)),ds(t)}toDeclaredTypesString(e){let t=new Yt,n=lh(this.name,e),i=Ro(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return t.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,st),t.indent(o=>dx(o,this.properties,"DeclaredType",e)),t.append("}",st),ds(t)}},lu=class extends Error{constructor(e,t){super(e),this.name="TypeResolutionError",this.target=t}};function oc(r,e){return Di(r,e,new Map)}function Di(r,e,t){let n=`${ic(r)}\xBB${ic(e)}`,i=t.get(n);return i!==void 0||(t.set(n,!1),i=!1,Ot(r)?i=r.types.every(o=>Di(o,e,t)):Ot(e)?i=e.types.some(o=>Di(r,o,t)):Lr(e)&&dn(e.value)?Lr(r)&&dn(r.value)&&e.value.name===r.value.name?i=!0:i=Di(r,e.value.type,t):ii(r)?i=ii(e)&&Di(r.referenceType,e.referenceType,t):oi(r)?i=oi(e)&&Di(r.elementType,e.elementType,t):Lr(r)?dn(r.value)?i=Di(r.value.type,e,t):Lr(e)?dn(e.value)?i=Di(r,e.value.type,t):i=px(r.value,e.value,new Set):i=!1:Mr(r)?i=Mr(e)&&r.primitive===e.primitive:Nn(r)&&(i=Mr(e)&&e.primitive==="string"||Nn(e)&&e.string===r.string),i&&t.set(n,i)),i}function px(r,e,t){let n=r.name;if(t.has(n))return!1;if(t.add(n),r.name===e.name)return!0;for(let i of r.superTypes)if(mn(i)&&px(i,e,t))return!0;return!1}function ic(r){if(ii(r))return`@(${ic(r.referenceType)})}`;if(oi(r))return`(${ic(r.elementType)})[]`;if(Ot(r)){let e=r.types.map(t=>ic(t)).join(" | ");return r.types.length<=1?`Union<${e}>`:e}else{if(Lr(r))return`Value<${r.value.name}>`;if(Mr(r))return r.primitive;if(Nn(r))return`'${r.string}'`}throw new Error("Invalid type")}function pn(r,e="AstType"){if(ii(r)){let t=pn(r.referenceType,e);return e==="AstType"?`Reference<${t}>`:`@${sh(r.referenceType,t)}`}else if(oi(r)){let t=pn(r.elementType,e);return e==="AstType"?`Array<${t}>`:`${sh(r.elementType,t)}[]`}else if(Ot(r)){let t=r.types.map(n=>sh(n,pn(n,e)));return Ro(t).join(" | ")}else{if(Lr(r))return r.value.name;if(Mr(r))return r.primitive;if(Nn(r)){let t=e==="AstType"?"'":'"';return`${t}${r.string}${t}`}}throw new Error("Invalid type")}function sh(r,e){return Ot(r)&&(e=`(${e})`),e}function dx(r,e,t,n=new Set){function i(o){let s=t==="AstType"?o.name:lh(o.name,n),a=o.optional&&!uu(o.type),c=pn(o.type,t);return`${s}${a?"?":""}: ${c}`}Ro(e,(o,s)=>o.name.localeCompare(s.name)).forEach(o=>r.append(i(o),st))}function uu(r){return oi(r)?!0:ii(r)?!1:Ot(r)?r.types.every(e=>uu(e)):Mr(r)?r.primitive==="boolean":!1}function mx(r,e){r.append(`export const ${e} = '${e}';`,st),r.append(st),r.append(`export function is${e}(item: unknown): item is ${e} {`,st),r.indent(t=>t.append(`return reflection.isInstance(item, ${e});`,st)),r.append("}",st)}function N_(r,e){switch(e.dataType){case"string":if(ah(e.type)){let t=Array.from(e.subTypes).map(o=>o.name),n=hx(e.type),i=gx(e.type);if(t.length===0&&n.length===0&&i.length===0)au(r,e.name,`typeof item === '${e.dataType}'`);else{let o=__(t,n,i);au(r,e.name,o)}}break;case"number":case"boolean":case"bigint":au(r,e.name,`typeof item === '${e.dataType}'`);break;case"Date":au(r,e.name,"item instanceof Date");break;default:return}}function ah(r){let e=!0;if(Mr(r))return r.primitive==="string";if(Nn(r))return!0;if(Ot(r)){for(let t of r.types)if(Lr(t))if(dn(t.value)){if(!ah(t.value.type))return!1}else return!1;else if(Mr(t)){if(t.primitive!=="string"||!t.regex)return!1}else if(Ot(t))e=ah(t);else if(!Nn(t))return!1}else return!1;return e}function __(r,e,t){let n=[...r.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(t.length>0){let i=t.map(o=>`${o}.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function lh(r,e){return e.has(r)?`^${r}`:r}function hx(r){let e=[];if(Nn(r))return[r.string];if(Ot(r))for(let t of r.types)Nn(t)?e.push(t.string):Ot(t)&&e.push(...hx(t));return e}function gx(r){let e=[];if(Mr(r)&&r.primitive==="string"&&r.regex&&e.push(r.regex),Ot(r))for(let t of r.types)Mr(t)&&t.primitive==="string"&&t.regex?e.push(t.regex):Ot(t)&&e.push(...gx(t));return e}function au(r,e,t){r.append(st,`export function is${e}(item: unknown): item is ${e} {`,st),r.indent(n=>n.append(`return ${t};`,st)),r.append("}",st)}function Ro(r,e){return Array.from(new Set(r)).sort(e)}function uh(r,e,t,n){let i=new Set;return i.add(r),e.findReferences(r,{}).forEach(s=>{let a=t.getOrCreateDocument(s.sourceUri),c=n.getAstNode(a.parseResult.value,s.sourcePath);wr(c)?(i.add(c),uh(c,e,t,n).forEach(u=>i.add(u))):c&&Ft(c.$container)&&i.add(c.$container)}),i}function sc(r){let e=new Set;if(wr(r))e.add(r),r.superTypes.forEach(t=>{if(wr(t.ref)){e.add(t.ref);let n=sc(t.ref);for(let i of n)e.add(i)}});else if(Ft(r)){let t=yx(r.type);for(let n of t){let i=sc(n);for(let o of i)e.add(o)}}return e}function yx(r){var e;if(zr(r))return r.types.flatMap(t=>yx(t));if(sr(r)){let t=(e=r.typeRef)===null||e===void 0?void 0:e.ref;if(Ft(t)||wr(t))return[t]}return[]}function fh(r,e){return r.interfaces.concat(e.interfaces)}function du(r){return r.interfaces.concat(r.unions)}function Tx(r){let e=r.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let t=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();t.includes(i)||(t.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return t.map(i=>i.value)}function vx(r){return fu(r,new Set)}function fu(r,e){if(e.has(r))return[];if(e.add(r),Ot(r))return r.types.flatMap(t=>fu(t,e));if(Lr(r)){let t=r.value;return"type"in t?fu(t.type,e):[t.name]}else if(oi(r))return fu(r.elementType,e);return[]}function ac(r){return typeof r.name=="string"}var ms=class{getName(e){if(ac(e))return e.name}getNameNode(e){return Jt(e.$cstNode,"name")}};function J(r){return r.charCodeAt(0)}function pu(r,e){Array.isArray(r)?r.forEach(function(t){e.push(t)}):e.push(r)}function hs(r,e){if(r[e]===!0)throw"duplicate flag "+e;let t=r[e];r[e]=!0}function bo(r){if(r===void 0)throw Error("Internal Error - Should never get here!");return!0}function cc(){throw Error("Internal Error - Should never get here!")}function dh(r){return r.type==="Character"}var lc=[];for(let r=J("0");r<=J("9");r++)lc.push(r);var uc=[J("_")].concat(lc);for(let r=J("a");r<=J("z");r++)uc.push(r);for(let r=J("A");r<=J("Z");r++)uc.push(r);var ph=[J(" "),J("\f"),J(`
`),J("\r"),J("	"),J("\v"),J("	"),J("\xA0"),J("\u1680"),J("\u2000"),J("\u2001"),J("\u2002"),J("\u2003"),J("\u2004"),J("\u2005"),J("\u2006"),J("\u2007"),J("\u2008"),J("\u2009"),J("\u200A"),J("\u2028"),J("\u2029"),J("\u202F"),J("\u205F"),J("\u3000"),J("\uFEFF")];var I_=/[0-9a-fA-F]/,mu=/[0-9]/,P_=/[1-9]/,Ao=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let t=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":hs(n,"global");break;case"i":hs(n,"ignoreCase");break;case"m":hs(n,"multiLine");break;case"u":hs(n,"unicode");break;case"y":hs(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:t,loc:this.loc(0)}}disjunction(){let e=[],t=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(t)}}alternative(){let e=[],t=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(t)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let t;switch(this.popChar()){case"=":t="Lookahead";break;case"!":t="NegativeLookahead";break}bo(t);let n=this.disjunction();return this.consumeChar(")"),{type:t,value:n,loc:this.loc(e)}}return cc()}quantifier(e=!1){let t,n=this.idx;switch(this.popChar()){case"*":t={atLeast:0,atMost:1/0};break;case"+":t={atLeast:1,atMost:1/0};break;case"?":t={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":t={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),t={atLeast:i,atMost:o}):t={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&t===void 0)return;bo(t);break}if(!(e===!0&&t===void 0)&&bo(t))return this.peekChar(0)==="?"?(this.consumeChar("?"),t.greedy=!1):t.greedy=!0,t.type="Quantifier",t.loc=this.loc(n),t}atom(){let e,t=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),bo(e)?(e.loc=this.loc(t),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):cc()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[J(`
`),J("\r"),J("\u2028"),J("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,t=!1;switch(this.popChar()){case"d":e=lc;break;case"D":e=lc,t=!0;break;case"s":e=ph;break;case"S":e=ph,t=!0;break;case"w":e=uc;break;case"W":e=uc,t=!0;break}return bo(e)?{type:"Set",value:e,complement:t}:cc()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=J("\f");break;case"n":e=J(`
`);break;case"r":e=J("\r");break;case"t":e=J("	");break;case"v":e=J("\v");break}return bo(e)?{type:"Character",value:e}:cc()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:J("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:J(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:J(e)}}}characterClass(){let e=[],t=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),t=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(dh(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(dh(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else pu(n.value,e),e.push(J("-")),pu(o.value,e)}else pu(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:t,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:J("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let t=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:t};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(P_.test(e)===!1)throw Error("Expecting a positive integer");for(;mu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(mu.test(e)===!1)throw Error("Expecting an integer");for(;mu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:J(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return mu.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let t="";for(let i=0;i<e;i++){let o=this.popChar();if(I_.test(o)===!1)throw Error("Expecting a HexDecimal digits");t+=o}return{type:"Character",value:parseInt(t,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var _n=class{visitChildren(e){for(let t in e){let n=e[t];e.hasOwnProperty(t)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var D_=new Ao,hh=class extends _n{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let t=String.fromCharCode(e.value);if(!this.multiline&&t===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=si(t);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let t=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(t);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let t=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(t),this.isStarting&&(this.startRegex+=t)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},mh=new hh;function xx(r){try{return typeof r=="string"&&(r=new RegExp(r)),r=r.toString(),mh.reset(r),mh.visit(D_.pattern(r)),mh.multiline}catch{return!1}}function gh(r){return(typeof r=="string"?new RegExp(r):r).test(" ")}function si(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Rx(r){return Array.prototype.map.call(r,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:si(e)).join("")}function bx(r,e){let t=O_(r),n=e.match(t);return!!n&&n[0].length>0}function O_(r){typeof r=="string"&&(r=new RegExp(r));let e=r,t=r.source,n=0;function i(){let o="",s;function a(l){o+=t.substr(n,l),n+=l}function c(l){o+="(?:"+t.substr(n,l)+"|$)",n+=l}for(;n<t.length;)switch(t[n]){case"\\":switch(t[n+1]){case"c":c(3);break;case"x":c(4);break;case"u":e.unicode?t[n+2]==="{"?c(t.indexOf("}",n)-n+1):c(6):c(2);break;case"p":case"P":e.unicode?c(t.indexOf("}",n)-n+1):c(2);break;case"k":c(t.indexOf(">",n)-n+1);break;default:c(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(t)||[],c(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(t),s?a(s[0].length):c(1);break;case"(":if(t[n+1]==="?")switch(t[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=t.substr(s,n-s);break;case"<":switch(t[n+3]){case"=":case"!":s=n,n+=4,i(),o+=t.substr(s,n-s);break;default:a(t.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:c(1);break}return o}return new RegExp(i(),r.flags)}var Th={};zC(Th,{URI:()=>yh,Utils:()=>L_});var Ax;(()=>{"use strict";var r={470:i=>{function o(c){if(typeof c!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(c))}function s(c,l){for(var u,f="",m=0,T=-1,A=0,S=0;S<=c.length;++S){if(S<c.length)u=c.charCodeAt(S);else{if(u===47)break;u=47}if(u===47){if(!(T===S-1||A===1))if(T!==S-1&&A===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var N=f.lastIndexOf("/");if(N!==f.length-1){N===-1?(f="",m=0):m=(f=f.slice(0,N)).length-1-f.lastIndexOf("/"),T=S,A=0;continue}}else if(f.length===2||f.length===1){f="",m=0,T=S,A=0;continue}}l&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+c.slice(T+1,S):f=c.slice(T+1,S),m=S-T-1;T=S,A=0}else u===46&&A!==-1?++A:A=-1}return f}var a={resolve:function(){for(var c,l="",u=!1,f=arguments.length-1;f>=-1&&!u;f--){var m;f>=0?m=arguments[f]:(c===void 0&&(c=process.cwd()),m=c),o(m),m.length!==0&&(l=m+"/"+l,u=m.charCodeAt(0)===47)}return l=s(l,!u),u?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(c){if(o(c),c.length===0)return".";var l=c.charCodeAt(0)===47,u=c.charCodeAt(c.length-1)===47;return(c=s(c,!l)).length!==0||l||(c="."),c.length>0&&u&&(c+="/"),l?"/"+c:c},isAbsolute:function(c){return o(c),c.length>0&&c.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var c,l=0;l<arguments.length;++l){var u=arguments[l];o(u),u.length>0&&(c===void 0?c=u:c+="/"+u)}return c===void 0?".":a.normalize(c)},relative:function(c,l){if(o(c),o(l),c===l||(c=a.resolve(c))===(l=a.resolve(l)))return"";for(var u=1;u<c.length&&c.charCodeAt(u)===47;++u);for(var f=c.length,m=f-u,T=1;T<l.length&&l.charCodeAt(T)===47;++T);for(var A=l.length-T,S=m<A?m:A,N=-1,C=0;C<=S;++C){if(C===S){if(A>S){if(l.charCodeAt(T+C)===47)return l.slice(T+C+1);if(C===0)return l.slice(T+C)}else m>S&&(c.charCodeAt(u+C)===47?N=C:C===0&&(N=0));break}var v=c.charCodeAt(u+C);if(v!==l.charCodeAt(T+C))break;v===47&&(N=C)}var y="";for(C=u+N+1;C<=f;++C)C!==f&&c.charCodeAt(C)!==47||(y.length===0?y+="..":y+="/..");return y.length>0?y+l.slice(T+N):(T+=N,l.charCodeAt(T)===47&&++T,l.slice(T))},_makeLong:function(c){return c},dirname:function(c){if(o(c),c.length===0)return".";for(var l=c.charCodeAt(0),u=l===47,f=-1,m=!0,T=c.length-1;T>=1;--T)if((l=c.charCodeAt(T))===47){if(!m){f=T;break}}else m=!1;return f===-1?u?"/":".":u&&f===1?"//":c.slice(0,f)},basename:function(c,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');o(c);var u,f=0,m=-1,T=!0;if(l!==void 0&&l.length>0&&l.length<=c.length){if(l.length===c.length&&l===c)return"";var A=l.length-1,S=-1;for(u=c.length-1;u>=0;--u){var N=c.charCodeAt(u);if(N===47){if(!T){f=u+1;break}}else S===-1&&(T=!1,S=u+1),A>=0&&(N===l.charCodeAt(A)?--A==-1&&(m=u):(A=-1,m=S))}return f===m?m=S:m===-1&&(m=c.length),c.slice(f,m)}for(u=c.length-1;u>=0;--u)if(c.charCodeAt(u)===47){if(!T){f=u+1;break}}else m===-1&&(T=!1,m=u+1);return m===-1?"":c.slice(f,m)},extname:function(c){o(c);for(var l=-1,u=0,f=-1,m=!0,T=0,A=c.length-1;A>=0;--A){var S=c.charCodeAt(A);if(S!==47)f===-1&&(m=!1,f=A+1),S===46?l===-1?l=A:T!==1&&(T=1):l!==-1&&(T=-1);else if(!m){u=A+1;break}}return l===-1||f===-1||T===0||T===1&&l===f-1&&l===u+1?"":c.slice(l,f)},format:function(c){if(c===null||typeof c!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof c);return function(l,u){var f=u.dir||u.root,m=u.base||(u.name||"")+(u.ext||"");return f?f===u.root?f+m:f+"/"+m:m}(0,c)},parse:function(c){o(c);var l={root:"",dir:"",base:"",ext:"",name:""};if(c.length===0)return l;var u,f=c.charCodeAt(0),m=f===47;m?(l.root="/",u=1):u=0;for(var T=-1,A=0,S=-1,N=!0,C=c.length-1,v=0;C>=u;--C)if((f=c.charCodeAt(C))!==47)S===-1&&(N=!1,S=C+1),f===46?T===-1?T=C:v!==1&&(v=1):T!==-1&&(v=-1);else if(!N){A=C+1;break}return T===-1||S===-1||v===0||v===1&&T===S-1&&T===A+1?S!==-1&&(l.base=l.name=A===0&&m?c.slice(1,S):c.slice(A,S)):(A===0&&m?(l.name=c.slice(1,T),l.base=c.slice(1,S)):(l.name=c.slice(A,T),l.base=c.slice(A,S)),l.ext=c.slice(T,S)),A>0?l.dir=c.slice(0,A-1):m&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function t(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return r[i](s,s.exports,t),s.exports}t.d=(i,o)=>{for(var s in o)t.o(o,s)&&!t.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},t.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),t.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;t.r(n),t.d(n,{URI:()=>m,Utils:()=>Rt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function c(M,w){if(!M.scheme&&w)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);if(M.scheme&&!o.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!s.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let l="",u="/",f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class m{static isUri(w){return w instanceof m||!!w&&typeof w.authority=="string"&&typeof w.fragment=="string"&&typeof w.path=="string"&&typeof w.query=="string"&&typeof w.scheme=="string"&&typeof w.fsPath=="string"&&typeof w.with=="function"&&typeof w.toString=="function"}scheme;authority;path;query;fragment;constructor(w,U,j,ce,ee,Q=!1){typeof w=="object"?(this.scheme=w.scheme||l,this.authority=w.authority||l,this.path=w.path||l,this.query=w.query||l,this.fragment=w.fragment||l):(this.scheme=function(bt,ft){return bt||ft?bt:"file"}(w,Q),this.authority=U||l,this.path=function(bt,ft){switch(bt){case"https":case"http":case"file":ft?ft[0]!==u&&(ft=u+ft):ft=u}return ft}(this.scheme,j||l),this.query=ce||l,this.fragment=ee||l,c(this,Q))}get fsPath(){return v(this,!1)}with(w){if(!w)return this;let{scheme:U,authority:j,path:ce,query:ee,fragment:Q}=w;return U===void 0?U=this.scheme:U===null&&(U=l),j===void 0?j=this.authority:j===null&&(j=l),ce===void 0?ce=this.path:ce===null&&(ce=l),ee===void 0?ee=this.query:ee===null&&(ee=l),Q===void 0?Q=this.fragment:Q===null&&(Q=l),U===this.scheme&&j===this.authority&&ce===this.path&&ee===this.query&&Q===this.fragment?this:new A(U,j,ce,ee,Q)}static parse(w,U=!1){let j=f.exec(w);return j?new A(j[2]||l,X(j[4]||l),X(j[5]||l),X(j[7]||l),X(j[9]||l),U):new A(l,l,l,l,l)}static file(w){let U=l;if(i&&(w=w.replace(/\\/g,u)),w[0]===u&&w[1]===u){let j=w.indexOf(u,2);j===-1?(U=w.substring(2),w=u):(U=w.substring(2,j),w=w.substring(j)||u)}return new A("file",U,w,l,l)}static from(w){let U=new A(w.scheme,w.authority,w.path,w.query,w.fragment);return c(U,!0),U}toString(w=!1){return y(this,w)}toJSON(){return this}static revive(w){if(w){if(w instanceof m)return w;{let U=new A(w);return U._formatted=w.external,U._fsPath=w._sep===T?w.fsPath:null,U}}return w}}let T=i?1:void 0;class A extends m{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=v(this,!1)),this._fsPath}toString(w=!1){return w?y(this,!0):(this._formatted||(this._formatted=y(this,!1)),this._formatted)}toJSON(){let w={$mid:1};return this._fsPath&&(w.fsPath=this._fsPath,w._sep=T),this._formatted&&(w.external=this._formatted),this.path&&(w.path=this.path),this.scheme&&(w.scheme=this.scheme),this.authority&&(w.authority=this.authority),this.query&&(w.query=this.query),this.fragment&&(w.fragment=this.fragment),w}}let S={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function N(M,w,U){let j,ce=-1;for(let ee=0;ee<M.length;ee++){let Q=M.charCodeAt(ee);if(Q>=97&&Q<=122||Q>=65&&Q<=90||Q>=48&&Q<=57||Q===45||Q===46||Q===95||Q===126||w&&Q===47||U&&Q===91||U&&Q===93||U&&Q===58)ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j!==void 0&&(j+=M.charAt(ee));else{j===void 0&&(j=M.substr(0,ee));let bt=S[Q];bt!==void 0?(ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j+=bt):ce===-1&&(ce=ee)}}return ce!==-1&&(j+=encodeURIComponent(M.substring(ce))),j!==void 0?j:M}function C(M){let w;for(let U=0;U<M.length;U++){let j=M.charCodeAt(U);j===35||j===63?(w===void 0&&(w=M.substr(0,U)),w+=S[j]):w!==void 0&&(w+=M[U])}return w!==void 0?w:M}function v(M,w){let U;return U=M.authority&&M.path.length>1&&M.scheme==="file"?`//${M.authority}${M.path}`:M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?w?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,i&&(U=U.replace(/\//g,"\\")),U}function y(M,w){let U=w?C:N,j="",{scheme:ce,authority:ee,path:Q,query:bt,fragment:ft}=M;if(ce&&(j+=ce,j+=":"),(ee||ce==="file")&&(j+=u,j+=u),ee){let me=ee.indexOf("@");if(me!==-1){let Nr=ee.substr(0,me);ee=ee.substr(me+1),me=Nr.lastIndexOf(":"),me===-1?j+=U(Nr,!1,!1):(j+=U(Nr.substr(0,me),!1,!1),j+=":",j+=U(Nr.substr(me+1),!1,!0)),j+="@"}ee=ee.toLowerCase(),me=ee.lastIndexOf(":"),me===-1?j+=U(ee,!1,!0):(j+=U(ee.substr(0,me),!1,!0),j+=ee.substr(me))}if(Q){if(Q.length>=3&&Q.charCodeAt(0)===47&&Q.charCodeAt(2)===58){let me=Q.charCodeAt(1);me>=65&&me<=90&&(Q=`/${String.fromCharCode(me+32)}:${Q.substr(3)}`)}else if(Q.length>=2&&Q.charCodeAt(1)===58){let me=Q.charCodeAt(0);me>=65&&me<=90&&(Q=`${String.fromCharCode(me+32)}:${Q.substr(2)}`)}j+=U(Q,!0,!1)}return bt&&(j+="?",j+=U(bt,!1,!1)),ft&&(j+="#",j+=w?ft:N(ft,!1,!1)),j}function $(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+$(M.substr(3)):M}}let D=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function X(M){return M.match(D)?M.replace(D,w=>$(w)):M}var ye=t(470);let Ee=ye.posix||ye,Bt="/";var Rt;(function(M){M.joinPath=function(w,...U){return w.with({path:Ee.join(w.path,...U)})},M.resolvePath=function(w,...U){let j=w.path,ce=!1;j[0]!==Bt&&(j=Bt+j,ce=!0);let ee=Ee.resolve(j,...U);return ce&&ee[0]===Bt&&!w.authority&&(ee=ee.substring(1)),w.with({path:ee})},M.dirname=function(w){if(w.path.length===0||w.path===Bt)return w;let U=Ee.dirname(w.path);return U.length===1&&U.charCodeAt(0)===46&&(U=""),w.with({path:U})},M.basename=function(w){return Ee.basename(w.path)},M.extname=function(w){return Ee.extname(w.path)}})(Rt||(Rt={}))})(),Ax=n})();var{URI:yh,Utils:L_}=Ax;var ai=Th;"default"in ai&&(ai=ai.default);var Qt=ai.URI;var ve;(function(r){r.basename=ai.Utils.basename,r.dirname=ai.Utils.dirname,r.extname=ai.Utils.extname,r.joinPath=ai.Utils.joinPath,r.resolvePath=ai.Utils.resolvePath;function e(n,i){return n?.toString()===i?.toString()}r.equals=e;function t(n,i){let o=typeof n=="string"?n:n.path,s=typeof i=="string"?i:i.path,a=o.split("/").filter(m=>m.length>0),c=s.split("/").filter(m=>m.length>0),l=0;for(;l<a.length&&a[l]===c[l];l++);let u="../".repeat(a.length-l),f=c.slice(l).join("/");return u+f}r.relative=t})(ve=ve||(ve={}));var NB=ve.equals,_B=ve.relative;var hu,wx=()=>hu??(hu=gu(`{"$type":"Grammar","isDeclared":true,"name":"LangiumGrammar","rules":[{"$type":"ParserRule","name":"Grammar","entry":true,"definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"isDeclared","operator":"?=","terminal":{"$type":"Keyword","value":"grammar"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"with"},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"}],"cardinality":"?"},{"$type":"Assignment","feature":"imports","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"interfaces","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}],"cardinality":"+"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Interface","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"interface"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"extends"},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SchemaType","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"attributes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},"cardinality":"*"},{"$type":"Keyword","value":"}"},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeAttribute","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"isOptional","operator":"?=","terminal":{"$type":"Keyword","value":"?"},"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeDefinition","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnionType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnionType"},"feature":"types","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ArrayType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ArrayType"},"feature":"elementType","operator":"="},{"$type":"Keyword","value":"["},{"$type":"Keyword","value":"]"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReferenceType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ReferenceType"}},{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"referenceType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SimpleType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":")"}]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"SimpleType"}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"typeRef","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"primitiveType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"stringType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PrimitiveType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"string"},{"$type":"Keyword","value":"number"},{"$type":"Keyword","value":"boolean"},{"$type":"Keyword","value":"Date"},{"$type":"Keyword","value":"bigint"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Type","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"type"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractRule","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"GrammarImport","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"import"},{"$type":"Assignment","feature":"path","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParserRule","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"entry","operator":"?=","terminal":{"$type":"Keyword","value":"entry"}},{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"wildcard","operator":"?=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"returnType","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":false},"calledByName":false}]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"InferredType","parameters":[{"$type":"Parameter","name":"imperative"}],"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","guardCondition":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}},"elements":[{"$type":"Keyword","value":"infer"}]},{"$type":"Group","guardCondition":{"$type":"Negation","value":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}}},"elements":[{"$type":"Keyword","value":"infers"}]}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"wildcard":false},{"$type":"ParserRule","name":"RuleNameAndParams","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Parameter","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Alternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ConditionalBranch","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"}},{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"guardCondition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":">"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnorderedGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnorderedGroup"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTokenWithCardinality","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Action","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Action"}},{"$type":"Keyword","value":"{"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":true},"calledByName":false}]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"+="}]}},{"$type":"Keyword","value":"current"}],"cardinality":"?"},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@43"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Keyword","definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RuleCall","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NamedArgument","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"calledByName","operator":"?=","terminal":{"$type":"Keyword","value":"="}}],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"LiteralCondition","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"true","operator":"?=","terminal":{"$type":"Keyword","value":"true"}},{"$type":"Keyword","value":"false"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Disjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Disjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Conjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Conjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Negation","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Negation"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Atom","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedCondition","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParameterReference","definition":{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedKeyword","inferredType":{"$type":"InferredType","name":"Keyword"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedRuleCall","inferredType":{"$type":"InferredType","name":"RuleCall"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Assignment","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Assignment"}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}],"cardinality":"?"},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"+="},{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"?="}]}},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedAssignableElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@40"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReference","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CrossReference"}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"deprecatedSyntax","operator":"?=","terminal":{"$type":"Keyword","value":"|"}},{"$type":"Keyword","value":":"}]},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]}}],"cardinality":"?"},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReferenceableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedGroup","inferredType":{"$type":"InferredType","name":"Group"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReturnType","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRule","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"hidden","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"},"cardinality":"?"},{"$type":"Keyword","value":"terminal"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}}],"cardinality":"?"}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalAlternatives"},"feature":"elements","operator":"+="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalGroup"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalTokenElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@57"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@53"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@54"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@55"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@56"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedTerminalElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"lookahead","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?="},{"$type":"Keyword","value":"?!"}]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRuleCall","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalRuleCall"}},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@46"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NegatedToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"NegatedToken"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UntilToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UntilToken"}},{"$type":"Keyword","value":"->"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RegexToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"RegexToken"}},{"$type":"Assignment","feature":"regex","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@61"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Wildcard","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Wildcard"}},{"$type":"Keyword","value":"."}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CharacterRange","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CharacterRange"}},{"$type":"Assignment","feature":"left","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":".."},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"FeatureName","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"current"},{"$type":"Keyword","value":"entry"},{"$type":"Keyword","value":"extends"},{"$type":"Keyword","value":"false"},{"$type":"Keyword","value":"fragment"},{"$type":"Keyword","value":"grammar"},{"$type":"Keyword","value":"hidden"},{"$type":"Keyword","value":"import"},{"$type":"Keyword","value":"interface"},{"$type":"Keyword","value":"returns"},{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"true"},{"$type":"Keyword","value":"type"},{"$type":"Keyword","value":"infer"},{"$type":"Keyword","value":"infers"},{"$type":"Keyword","value":"with"},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ID","definition":{"$type":"RegexToken","regex":"/\\\\^?[_a-zA-Z][\\\\w_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","definition":{"$type":"RegexToken","regex":"/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RegexLiteral","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/[a-z]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/"},"fragment":false}],"types":[{"$type":"Type","name":"AbstractType","type":{"$type":"UnionType","types":[{"$type":"SimpleType","typeRef":{"$ref":"#/rules@1"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@10"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@23/definition/elements@0"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@13"}}]}}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"interfaces":[],"usedGrammars":[]}`));var vu=de(uo(),1);var fc=de(Qn(),1);function M_(){return new Promise(r=>{typeof setImmediate>"u"?setTimeout(r,0):setImmediate(r)})}var Sx=0,F_=10;var Cx=Symbol("OperationCancelled");function wo(r){return r===Cx}async function Ze(r){if(r===fc.CancellationToken.None)return;let e=Date.now();if(e-Sx>=F_&&(Sx=e,await M_()),r.isCancellationRequested)throw Cx}var yu=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new fc.CancellationTokenSource}lock(e){this.cancel();let t=new fc.CancellationTokenSource;return this.previousTokenSource=t,this.previousAction=this.previousAction.then(()=>e(t.token).catch(n=>{wo(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};function Fr(r){return{code:r}}var gs;(function(r){r.all=["fast","slow","built-in"]})(gs=gs||(gs={}));var Tu=class{constructor(e){this.entries=new Le,this.reflection=e.shared.AstReflection}register(e,t=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let c={check:this.wrapValidationException(a,t),category:n};this.addEntry(i,c)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,t),category:n};this.addEntry(i,a)}}}wrapValidationException(e,t){return async(n,i,o)=>{try{await e.call(t,n,i,o)}catch(s){if(wo(s))throw s;console.error("An error occurred during validation:",s);let a=s instanceof Error?s.message:String(s);s instanceof Error&&s.stack&&console.error(s.stack),i("error","An error occurred during validation: "+a,{node:n})}}}addEntry(e,t){if(e==="AstNode"){this.entries.add("AstNode",t);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,t)}getChecks(e,t){let n=ie(this.entries.get(e)).concat(this.entries.get("AstNode"));return t&&(n=n.filter(i=>t.includes(i.category))),n.map(i=>i.check)}};function kx(r,e){let t={unions:[],interfaces:[]};for(let n of r){let i=[];for(let a of n.attributes)i.push({name:a.name,optional:a.isOptional,astNodes:new Set([a]),type:So(a.type)});let o=new Set;for(let a of n.superTypes)a.ref&&o.add(hn(a.ref));let s={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};t.interfaces.push(s)}for(let n of e){let i={name:n.name,declared:!0,type:So(n.type),superTypes:new Set,subTypes:new Set};t.unions.push(i)}return t}function So(r){if(vo(r))return{elementType:So(r.elementType)};if(xo(r))return{referenceType:So(r.referenceType)};if(zr(r))return{types:r.types.map(So)};if(sr(r)){let e;if(r.primitiveType)return e=r.primitiveType,{primitive:e};if(r.stringType)return e=r.stringType,{string:e};if(r.typeRef){let t=r.typeRef.ref,n=In(t);if(n)return ys(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}function Ts(r){return"referenceType"in r}function vh(r){return"elementType"in r}function Ex(r){return"types"in r}function xh(r){return"value"in r}function q_(r){return"primitive"in r}function U_(r){return"string"in r}function $x(r){let e=new Map,t=new Map;for(let n of r.interfaces){let i=new ps(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of r.unions){let i=new cu(n.name,{declared:n.declared,dataType:n.dataType});t.set(n.name,i)}for(let n of r.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let s=e.get(o)||t.get(o);s&&i.superTypes.add(s)}for(let o of n.subTypes){let s=e.get(o)||t.get(o);s&&i.subTypes.add(s)}for(let o of n.properties){let s=G_(o,e,t);i.properties.push(s)}}for(let n of r.unions){let i=t.get(n.name);i.type=dc(n.type,i,e,t)}return{interfaces:Array.from(e.values()),unions:Array.from(t.values())}}function G_(r,e,t){return{name:r.name,optional:r.optional,astNodes:r.astNodes,type:dc(r.type,void 0,e,t)}}function dc(r,e,t,n){if(vh(r))return{elementType:dc(r.elementType,e,t,n)};if(Ts(r))return{referenceType:dc(r.referenceType,void 0,t,n)};if(Ex(r))return{types:r.types.map(i=>dc(i,e,t,n))};if(U_(r))return{string:r.string};if(q_(r))return{primitive:r.primitive,regex:r.regex};if(xh(r)){let i=t.get(r.value)||n.get(r.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function bh(r,e){let t=pc(r),n=pc(e);for(let i of n)j_(t,i)||t.push(i);return t.length===1?t[0]:{types:t}}function j_(r,e){return r.some(t=>Rh(t,e))}function Rh(r,e){return vh(r)&&vh(e)?Rh(r.elementType,e.elementType):Ts(r)&&Ts(e)?Rh(r.referenceType,e.referenceType):xh(r)&&xh(e)?r.value===e.value:!1}function pc(r){return Ex(r)?r.types.flatMap(e=>pc(e)):[r]}function Nx(r){let e=r.validation.ValidationRegistry,t=r.validation.LangiumGrammarValidator,n={Action:[t.checkAssignmentReservedName],AbstractRule:t.checkRuleName,Assignment:[t.checkAssignmentWithFeatureName,t.checkAssignmentToFragmentRule,t.checkAssignmentTypes,t.checkAssignmentReservedName],ParserRule:[t.checkParserRuleDataType,t.checkRuleParametersUsed,t.checkParserRuleReservedName],TerminalRule:[t.checkTerminalRuleReturnType,t.checkHiddenTerminalRule,t.checkEmptyTerminalRule],InferredType:t.checkTypeReservedName,Keyword:t.checkKeyword,UnorderedGroup:t.checkUnorderedGroup,Grammar:[t.checkGrammarName,t.checkEntryGrammarRule,t.checkUniqueRuleName,t.checkUniqueTypeName,t.checkUniqueImportedRules,t.checkDuplicateImportedGrammar,t.checkGrammarHiddenTokens,t.checkGrammarForUnusedRules,t.checkGrammarTypeInfer,t.checkClashingTerminalNames],GrammarImport:t.checkPackageImport,CharacterRange:t.checkInvalidCharacterRange,Interface:[t.checkTypeReservedName,t.checkInterfacePropertyTypes],Type:[t.checkTypeReservedName],TypeAttribute:t.checkTypeReservedName,RuleCall:[t.checkUsedHiddenTerminalRule,t.checkUsedFragmentTerminalRule,t.checkRuleCallParameters],TerminalRuleCall:t.checkUsedHiddenTerminalRule,CrossReference:[t.checkCrossReferenceSyntax,t.checkCrossRefNameAssignment,t.checkCrossRefTerminalType,t.checkCrossRefType,t.checkCrossReferenceToTypeUnion],SimpleType:t.checkFragmentsInTypes,ReferenceType:t.checkReferenceTypeUnion,RegexToken:[t.checkInvalidRegexFlags,t.checkDirectlyUsedRegexFlags]};e.register(n,t)}var Se;(function(r){r.GrammarNameUppercase="grammar-name-uppercase",r.RuleNameUppercase="rule-name-uppercase",r.HiddenGrammarTokens="hidden-grammar-tokens",r.UseRegexTokens="use-regex-tokens",r.EntryRuleTokenSyntax="entry-rule-token-syntax",r.CrossRefTokenSyntax="cross-ref-token-syntax",r.UnnecessaryFileExtension="unnecessary-file-extension",r.InvalidReturns="invalid-returns",r.InvalidInfers="invalid-infers",r.MissingInfer="missing-infer",r.MissingReturns="missing-returns",r.SuperfluousInfer="superfluous-infer",r.OptionalUnorderedGroup="optional-unordered-group"})(Se=Se||(Se={}));var xu=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,t){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&t("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",data:Fr(Se.GrammarNameUppercase)})}}checkEntryGrammarRule(e,t){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>B(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>B(o)&&!qr(o));i?t("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",data:Fr(Se.EntryRuleTokenSyntax)}):t("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>t("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>t("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&qr(n[0])&&t("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,t){let n=i=>ie(i.rules).filter(o=>!mc(o));this.checkUniqueName(e,t,n,"rule")}checkUniqueTypeName(e,t){let n=i=>ie(i.types).concat(i.interfaces);this.checkUniqueName(e,t,n,"type")}checkUniqueName(e,t,n,i){let o=new Le;n(e).forEach(c=>o.add(c.name,c));for(let[,c]of o.entriesGroupedByKey())c.length>1&&c.forEach(l=>{t("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let s=new Set,a=hc(this.documents,e);for(let c of a)n(c).forEach(l=>s.add(l.name));for(let c of o.keys())s.has(c)&&o.get(c).forEach(u=>{t("error",`A ${i} with the name '${u.name}' already exists in an imported grammar.`,{node:u,property:"name"})})}checkDuplicateImportedGrammar(e,t){let n=new Le;for(let i of e.imports){let o=ci(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,s)=>{s>0&&t("warning","The grammar is already being directly imported.",{node:o,tags:[vu.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,t){let n=new Map;for(let o of e.imports){let s=hc(this.documents,o);n.set(o,s)}let i=new Le;for(let o of e.imports){let s=n.get(o);for(let a of e.imports){if(o===a)continue;let c=n.get(a),l=this.getDuplicateExportedRules(s,c);for(let u of l)i.add(o,u)}}for(let o of e.imports){let s=i.get(o);s.length>0&&t("error","Some rules exported by this grammar are also included in other imports: "+ie(s).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,t){let i=e.filter(a=>!t.includes(a)).flatMap(a=>a.rules),o=t.flatMap(a=>a.rules),s=new Set;for(let a of i){let c=a.name;for(let l of o){let u=l.name;c===u&&s.add(l.name)}}return s}checkGrammarTypeInfer(e,t){var n,i,o;let s=new Set;for(let c of e.types)s.add(c.name);for(let c of e.interfaces)s.add(c.name);for(let c of hc(this.documents,e))c.types.forEach(l=>s.add(l.name)),c.interfaces.forEach(l=>s.add(l.name));for(let c of e.rules.filter(B)){if(mc(c))continue;let l=qr(c),u=!c.returnType&&!c.dataType,f=In(c);if(!l&&f&&s.has(f)===u){if((u||((n=c.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&c.inferredType===void 0)t("error",a(f,u),{node:c,property:"name",data:Fr(Se.MissingReturns)});else if(u||((i=c.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=Xr(c.inferredType.$cstNode,"infers");t("error",a(f,u),{node:c.inferredType,property:"name",data:{code:Se.InvalidInfers,actionSegment:or(m)}})}}else if(l&&u){let m=Xr(c.$cstNode,"infer");t("error","Data type rules cannot infer a type.",{node:c,property:"inferredType",data:{code:Se.InvalidInfers,actionSegment:or(m)}})}}for(let c of Qe(e).filter(Ne)){let l=this.getActionType(c);if(l){let u=!!c.inferredType,f=In(c);if(c.type&&f&&s.has(f)===u){let m=u?Xr(c.$cstNode,"infer"):Xr(c.$cstNode,"{");t("error",a(f,u),{node:c,property:"type",data:{code:u?Se.SuperfluousInfer:Se.MissingInfer,actionSegment:or(m)}})}else if(l&&f&&s.has(f)&&u&&c.$cstNode){let m=Jt((o=c.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),T=Xr(c.$cstNode,"{");m&&T&&t("error",`${f} is a declared type and cannot be redefined.`,{node:c,property:"type",data:{code:Se.SuperfluousInfer,actionRange:{start:T.range.end,end:m.range.start}}})}}}function a(c,l){return l?`The type '${c}' is already explicitly declared and cannot be inferred.`:`The type '${c}' is not explicitly declared and must be inferred.`}}getActionType(e){var t;if(e.type)return(t=e.type)===null||t===void 0?void 0:t.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,t){e.definesHiddenTokens&&t("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",data:Fr(Se.HiddenGrammarTokens)})}checkHiddenTerminalRule(e,t){e.hidden&&e.fragment&&t("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,t){try{let n=Jr(e);new RegExp(n).test("")&&t("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkInvalidRegexFlags(e,t){let n=e.regex;if(n){let i=n.lastIndexOf("/"),o=n.substring(i+1),s="gmy",c=s+"isu",l=new Set,u=new Set;for(let m=0;m<o.length;m++){let T=o.charAt(m);c.includes(T)?s.includes(T)&&u.add(T):l.add(T)}let f=this.getFlagRange(e);f&&(l.size>0?t("error",`'${Array.from(l).join("")}' ${l.size>1?"are":"is"} not valid regular expression flag${l.size>1?"s":""}.`,{node:e,range:f}):u.size>0&&t("warning",`'${Array.from(u).join("")}' regular expression flag${u.size>1?"s":""} will be ignored by Langium.`,{node:e,range:f}))}}checkDirectlyUsedRegexFlags(e,t){if(!we(e.$container)){let n=this.getFlagRange(e);n&&t("warning","Regular expression flags are only applied if the terminal is not a composition",{node:e,range:n})}}getFlagRange(e){let t=Jt(e.$cstNode,"regex");if(!t||!e.regex)return;let n=e.regex,i=n.lastIndexOf("/")+1;return{start:{line:t.range.end.line,character:t.range.end.character-n.length+i},end:t.range.end}}checkUsedHiddenTerminalRule(e,t){let n=Ie(e,i=>we(i)||B(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;we(i)&&i.hidden&&t("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,t){let n=e.rule.ref;we(n)&&n.fragment&&Ie(e,B)&&t("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,t){e.deprecatedSyntax&&t("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",data:Fr(Se.CrossRefTokenSyntax)})}checkPackageImport(e,t){ci(this.documents,e)===void 0?t("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&t("warning","Imports do not need file extensions.",{node:e,property:"path",data:Fr(Se.UnnecessaryFileExtension)})}checkInvalidCharacterRange(e,t){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,t("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,t("error",n,{node:e.right,property:"value"})),i||t("hint","Consider using regex instead of character ranges",{node:e,data:Fr(Se.UseRegexTokens)})}}checkGrammarForUnusedRules(e,t){let n=vs(e,!0);for(let i of e.rules)we(i)&&i.hidden||mc(i)||n.has(i)||t("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[vu.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,t){let n=new Le,i=new Set;for(let l of e.rules)we(l)&&l.name&&n.add(l.name,l),B(l)&&Qe(l).filter(mt).forEach(f=>i.add(f.value));let o=new Le,s=new Le;for(let l of e.imports){let u=hc(this.documents,l);for(let f of u)for(let m of f.rules)we(m)&&m.name?o.add(m.name,l):B(m)&&m.name&&Qe(m).filter(mt).forEach(A=>s.add(A.value,l))}for(let l of n.values())if(i.has(l.name))t("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(s.has(l.name)){let u=s.get(l.name);t("error",`Terminal name clashes with imported keyword from "${u[0].path}".`,{node:l,property:"name"})}let a=new Le;for(let l of i)for(let u of o.get(l))a.add(u,l);for(let[l,u]of a.entriesGroupedByKey())u.length>0&&t("error",`Imported terminals (${u.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let c=new Le;for(let[l,u]of o.entriesGroupedByKey()){let f=s.get(l);f.length>0&&u.filter(m=>!f.includes(m)).forEach(m=>c.add(m,l))}for(let[l,u]of c.entriesGroupedByKey())u.length>0&&t("error",`Imported terminals (${u.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,t){if(e.name&&!mc(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&t("warning","Rule name should start with an upper case letter.",{node:e,property:"name",data:Fr(Se.RuleNameUppercase)})}}checkTypeReservedName(e,t){this.checkReservedName(e,"name",t)}checkAssignmentReservedName(e,t){this.checkReservedName(e,"feature",t)}checkParserRuleReservedName(e,t){e.inferredType||this.checkReservedName(e,"name",t)}checkReservedName(e,t,n){let i=e[t];typeof i=="string"&&H_.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:t})}checkKeyword(e,t){Ie(e,B)&&(e.value.length===0?t("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?t("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&t("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,t){e.elements.forEach(n=>{Yr(n.cardinality)&&t("error","Optional elements in Unordered groups are currently not supported",{node:n,data:Fr(Se.OptionalUnorderedGroup)})})}checkRuleParametersUsed(e,t){let n=e.parameters;if(n.length>0){let i=Qe(e).filter(cs);for(let o of n)i.some(s=>s.parameter.ref===o)||t("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[vu.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,t){if(mc(e))return;let n=Ix(e),i=qr(e);!n&&i?t("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&t("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,t){e.terminal&&_e(e.terminal)&&B(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&t("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,t){if(!e.terminal)return;let n;Qe(e.terminal).map(o=>Xt(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&t("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,t){for(let n of e.attributes)if(n.type){let i=So(n.type),o=pc(i),s=!1,a=!1;for(let c of o)Ts(c)?s=!0:Ts(c)||(a=!0);s&&a&&t("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,t){var n;!((n=e.type)===null||n===void 0)&&n.name&&!ys(e.type.name)&&t("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,t){let n=e.rule.ref;if(B(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&t("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else we(n)&&e.arguments.length>0&&t("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,t){!e.terminal&&e.type.ref&&!gc(e.type.ref)&&t("error","Cannot infer terminal or data type rule for cross-reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,t){var n;let i=e.terminal;if(_e(i)){let o=i.rule.ref;B(o)&&!qr(o)?t("error","Parser rules cannot be used for cross-references.",{node:i,property:"rule"}):B(o)&&!Px(o)?t("error","Data type rules for cross-references must be of type string.",{node:i,property:"rule"}):we(o)&&(!((n=o.type)===null||n===void 0)&&n.name)&&o.type.name!=="string"&&t("error","Terminal rules for cross-references must be of type string.",{node:i,property:"rule"})}}checkCrossRefType(e,t){let n=this.checkReferenceToRuleButNotType(e?.type);n&&t("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,t){if(Ft(e.type.ref)&&zr(e.type.ref.type)){let n=_x(e.type.ref.type);n.length>0&&t("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,t){var n,i;B((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&t("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,t){sr(e.referenceType)||t("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&B(e.ref)&&!qr(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let t=In(e.ref);if(t)return`Use the rule type '${t}' instead of the typed rule name '${e.ref.name}' for cross-references.`}}checkAssignmentWithFeatureName(e,t){e.feature==="name"&&Xt(e.terminal)&&t("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};function mc(r){return!r.definition||!r.definition.$cstNode||r.definition.$cstNode.length===0}var H_=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function _x(r){let e=[];return r.types.forEach(t=>{var n;sr(t)&&(!((n=t.typeRef)===null||n===void 0)&&n.ref?Ft(t.typeRef.ref)&&(zr(t.typeRef.ref.type)?e.push(..._x(t.typeRef.ref.type)):e.push(t.typeRef.ref.name)):t.stringType?e.push(`"${t.stringType}"`):t.primitiveType&&e.push(t.primitiveType))}),Array.from(new Set(e))}function Yr(r,e){return r==="?"||r==="*"||qt(e)&&!!e.guardCondition}function Dx(r){return r==="*"||r==="+"}function qr(r){return Ox(r,new Set)}function Ox(r,e){if(e.has(r))return!0;e.add(r);for(let t of Qe(r))if(_e(t)){if(!t.rule.ref||B(t.rule.ref)&&!Ox(t.rule.ref,e))return!1}else{if(Re(t))return!1;if(Ne(t))return!1}return!!r.definition}function Ix(r){var e;let t=(e=r.returnType)===null||e===void 0?void 0:e.ref;return r.dataType!==void 0||Ft(t)&&B_(t)}function B_(r){return wh(r.type,new Set)}function wh(r,e){if(e.has(r))return!0;if(e.add(r),vo(r))return!1;if(xo(r))return!1;if(zr(r))return r.types.every(t=>wh(t,e));if(sr(r)){if(r.primitiveType!==void 0)return!0;if(r.stringType!==void 0)return!0;if(r.typeRef!==void 0){let t=r.typeRef.ref;return Ft(t)?wh(t.type,e):!1}else return!1}else return!1}function Px(r){return yc(r,new Set)}function yc(r,e){var t,n;if(e.has(r))return!0;if(e.add(r),B(r)){if(r.dataType)return r.dataType==="string";if(!((t=r.returnType)===null||t===void 0)&&t.ref)return yc(r.returnType.ref,e)}else{if(Ft(r))return yc(r.type,e);if(vo(r))return!1;if(xo(r))return!1;if(zr(r))return r.types.every(i=>yc(i,e));if(sr(r)){if(r.primitiveType==="string")return!0;if(r.stringType)return!0;if(!((n=r.typeRef)===null||n===void 0)&&n.ref)return yc(r.typeRef.ref,e)}}return!1}function Ch(r){let e=r.$container;if(qt(e)){let t=e.elements,n=t.indexOf(r);for(let i=n-1;i>=0;i--){let o=t[i];if(Ne(o))return o;{let s=Qe(t[i]).find(Ne);if(s)return s}}}if(os(e))return Ch(e)}function hn(r){var e;if(B(r))return qr(r)?r.name:(e=Rs(r))!==null&&e!==void 0?e:r.name;if(wr(r)||Ft(r)||ls(r))return r.name;if(Ne(r)){let t=bs(r);if(t)return t}else if(as(r))return r.name;throw new lu("Cannot get name of Unknown Type",r.$cstNode)}function In(r){if(r)try{return hn(r)}catch{return}}function Rs(r){if(r.inferredType)return r.inferredType.name;if(r.dataType)return r.dataType;if(r.returnType){let e=r.returnType.ref;if(e){if(B(e))return e.name;if(wr(e)||Ft(e))return e.name}}}function bs(r){var e;if(r.inferredType)return r.inferredType.name;if(!((e=r.type)===null||e===void 0)&&e.ref)return hn(r.type.ref)}function Co(r){var e,t,n;return we(r)?(t=(e=r.type)===null||e===void 0?void 0:e.name)!==null&&t!==void 0?t:"string":qr(r)?r.name:(n=Rs(r))!==null&&n!==void 0?n:r.name}function Jr(r){let e={s:!1,i:!1,u:!1},t=As(r.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(t,n)}var kh=/[\s\S]/.source;function As(r,e){if(Bv(r))return K_(r);if(Wv(r))return W_(r);if(ru(r))return X_(r);if(nu(r)){let t=r.rule.ref;if(!t)throw new Error("Missing rule reference.");return li(As(t.definition),{cardinality:r.cardinality,lookahead:r.lookahead})}else{if(qv(r))return z_(r);if(Yv(r))return V_(r);if(Gv(r)){let t=r.regex.lastIndexOf("/"),n=r.regex.substring(1,t),i=r.regex.substring(t+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),li(n,{cardinality:r.cardinality,lookahead:r.lookahead,wrap:!1})}else{if(Qv(r))return li(kh,{cardinality:r.cardinality,lookahead:r.lookahead});throw new Error(`Invalid terminal element: ${r?.$type}`)}}}function K_(r){return li(r.elements.map(e=>As(e)).join("|"),{cardinality:r.cardinality,lookahead:r.lookahead})}function W_(r){return li(r.elements.map(e=>As(e)).join(""),{cardinality:r.cardinality,lookahead:r.lookahead})}function V_(r){return li(`${kh}*?${As(r.terminal)}`,{cardinality:r.cardinality,lookahead:r.lookahead})}function z_(r){return li(`(?!${As(r.terminal)})${kh}*?`,{cardinality:r.cardinality,lookahead:r.lookahead})}function X_(r){return r.right?li(`[${Ah(r.left)}-${Ah(r.right)}]`,{cardinality:r.cardinality,lookahead:r.lookahead,wrap:!1}):li(Ah(r.left),{cardinality:r.cardinality,lookahead:r.lookahead,wrap:!1})}function Ah(r){return si(r.value)}function li(r,e){var t;return(e.wrap!==!1||e.lookahead)&&(r=`(${(t=e.lookahead)!==null&&t!==void 0?t:""}${r})`),e.cardinality?`${r}${e.cardinality}`:r}function Eh(r){if(r.path===void 0||r.path.length===0)return;let e=ve.dirname(ne(r).uri),t=r.path;return t.endsWith(".langium")||(t+=".langium"),ve.resolvePath(e,t)}function ci(r,e){let t=Eh(e);try{if(t){let i=r.getOrCreateDocument(t).parseResult.value;if(ss(i))return i}}catch{}}function hc(r,e){if(eu(e)){let t=ci(r,e);if(t){let n=Sh(r,t);return n.push(t),n}return[]}else return Sh(r,e)}function Sh(r,e,t=e,n=new Set,i=new Set){let o=ne(e);if(t!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let s of e.imports){let a=ci(r,s);a&&Sh(r,a,t,n,i)}}return Array.from(i)}function xs(r){return Re(r)?[r]:Dr(r)||qt(r)||Or(r)?r.elements.flatMap(e=>xs(e)):_e(r)&&r.rule.ref?xs(r.rule.ref.definition):[]}var Y_=["string","number","boolean","Date","bigint"];function ys(r){return Y_.includes(r)}var $h=class{constructor(e,t){this.context=e,this.root=t}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,t){let n=this.splitType(t.alt,t.next.length),i=[];for(let o=0;o<t.next.length;o++){let s=n[o],a=t.next[o];a.actionWithAssignment&&i.push({alt:Lx(s),next:[]}),a.name!==void 0&&a.name!==s.name&&(a.actionWithAssignment?(s.properties=[],s.ruleCalls=[],s.super=[e.name],s.name=a.name):(s.super=[s.name,...s.ruleCalls],s.properties=[],s.ruleCalls=[],s.name=a.name)),s.properties.push(...a.properties),s.ruleCalls.push(...a.ruleCalls);let c={alt:s,next:a.children};c.next.length===0?(c.alt.super=c.alt.super.filter(l=>l!==c.alt.name),i.push(c)):i.push(...this.applyNext(e,c))}return Gx(i)}splitType(e,t){let n=[];for(let i=0;i<t;i++)n.push(Lx(e));return n}getSuperTypes(e){let t=new Set;return this.collectSuperTypes(e,e,t),Array.from(t)}collectSuperTypes(e,t,n){if(t.ruleCalls.length>0){for(let i of t.ruleCalls)n.add(i);return}for(let i of t.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);t.parents.length===0&&t.name&&n.add(t.name)}connect(e,t){return t.parents.push(e),e.children.push(t),t}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let t=ko();t.parents=e;for(let n of e)n.children.push(t);return t}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,t){return e.children.some(n=>n!==t)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function J_(r){return{name:r.name,children:[],parents:[],actionWithAssignment:r.actionWithAssignment,ruleCalls:[...r.ruleCalls],properties:r.properties.map(Mx)}}function Lx(r){return{name:r.name,super:r.super,ruleCalls:r.ruleCalls,properties:r.properties.map(e=>Mx(e))}}function Mx(r){return{name:r.name,optional:r.optional,type:r.type,astNodes:r.astNodes}}function Fx(r,e,t){let n=[],i={fragments:new Map};for(let c of r)n.push(...qx(i,c));let o=nI(n),s=iI(o),a=oI(o,s,t);for(let c of e){let l=Q_(c);a.unions.push({name:c.name,declared:!1,type:l,subTypes:new Set,superTypes:new Set,dataType:c.dataType})}return a}function Q_(r){if(r.dataType&&r.dataType!=="string")return{primitive:r.dataType};let e=!1,t=()=>(e=!0,{primitive:"unknown"}),n=Nh(r.definition,t);return e?{primitive:"string"}:n}function Nh(r,e){var t,n,i;if(r.cardinality)return e();if(Dr(r))return{types:r.elements.map(o=>Nh(o,e))};if(qt(r)||Or(r))return r.elements.length!==1?e():Nh(r.elements[0],e);if(_e(r)){let o=(t=r.rule)===null||t===void 0?void 0:t.ref;return o?we(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:Jr(o).toString()}:{value:o.name}:e()}else if(mt(r))return{string:r.value};return e()}function qx(r,e){let t=ko(e),n=new $h(r,t);return e.definition&&_h(n,n.root,e.definition),n.getTypes()}function ko(r){return{name:B(r)||Ne(r)?In(r):r,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function _h(r,e,t){let n=Yr(t.cardinality,t);if(Dr(t)){let i=[];n&&i.push(r.connect(e,ko()));for(let o of t.elements){let s=r.connect(e,ko());i.push(_h(r,s,o))}return r.merge(...i)}else if(qt(t)||Or(t)){let i=r.connect(e,ko()),o;n&&(o=r.connect(e,ko()));for(let s of t.elements)i=_h(r,i,s);return o?r.merge(o,i):i}else{if(Ne(t))return Z_(r,e,t);Re(t)?eI(e,t):_e(t)&&tI(r,e,t)}return e}function Z_(r,e,t){var n;if(!r.hasLeafNode(e)){let o=J_(e);r.connect(e,o)}let i=r.connect(e,ko(t));if(t.type){let o=(n=t.type)===null||n===void 0?void 0:n.ref;o&&ac(o)&&(i.name=o.name)}return t.feature&&t.operator&&(i.actionWithAssignment=!0,i.properties.push({name:t.feature,optional:!1,type:Eo(t.operator==="+=",!1,r.root.ruleCalls.length!==0?r.root.ruleCalls:r.getSuperTypes(i)),astNodes:new Set([t])})),i}function eI(r,e){let t={types:new Set,reference:!1};Ux(e.terminal,t);let n=Eo(e.operator==="+=",t.reference,e.operator==="?="?["boolean"]:Array.from(t.types));r.properties.push({name:e.feature,optional:Yr(e.cardinality),type:n,astNodes:new Set([e])})}function Ux(r,e){if(Dr(r)||Or(r)||qt(r))for(let t of r.elements)Ux(t,e);else if(mt(r))e.types.add(`'${r.value}'`);else if(_e(r)&&r.rule.ref)e.types.add(Co(r.rule.ref));else if(Xt(r)&&r.type.ref){let t=In(r.type.ref);t&&e.types.add(t),e.reference=!0}}function tI(r,e,t){let n=t.rule.ref;if(B(n)&&n.fragment){let i=rI(n,r.context);Yr(t.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else B(n)&&e.ruleCalls.push(Co(n))}function rI(r,e){let t=e.fragments.get(r);if(t)return t;let n=[];e.fragments.set(r,n);let i=In(r),o=qx(e,r).filter(s=>s.alt.name===i);return n.push(...o.flatMap(s=>s.alt.properties)),n}function nI(r){let e=new Map,t=[],n=Gx(r).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(t.push(i),i.ruleCalls.forEach(s=>{s!==o.name&&o.subTypes.add(s)}))}for(let i of t)for(let o of i.ruleCalls){let s=e.get(o);s&&s.name!==i.name&&s.superTypes.add(i.name)}return Array.from(e.values())}function Gx(r){let e=r.reduce((n,i)=>n.add(i.alt.name,i),new Le),t=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],s=new Set,a={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let c of i){let l=c.alt;a.alt.super.push(...l.super),a.next.push(...c.next);let u=l.properties;for(let f of u){let m=o.find(T=>T.name===f.name);m?(m.type=bh(m.type,f.type),f.astNodes.forEach(T=>m.astNodes.add(T))):o.push(Object.assign({},f))}l.ruleCalls.forEach(f=>s.add(f))}for(let c of i){let l=c.alt;if(l.ruleCalls.length===0)for(let u of o)l.properties.find(f=>f.name===u.name)||(u.optional=!0)}a.alt.ruleCalls=Array.from(s),t.push(a)}return t}function iI(r){let e=new Map(r.map(i=>[i.name,i])),t=[],n=new Le;for(let i of r)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let s={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:Eo(!1,!1,o)};t.push(s)}return t}function oI(r,e,t){let n=new Le;for(let a of r)for(let c of a.superTypes)n.add(c,a.name);let i=new Set(t.interfaces.map(a=>a.name)),o={interfaces:[],unions:e},s=new Map(e.map(a=>[a.name,a]));for(let a of r){let c=new Set(n.get(a.name));if(a.properties.length===0&&c.size>0)if(i.has(a.name))a.abstract=!0,o.interfaces.push(a);else{let l=Eo(!1,!1,Array.from(c)),u=s.get(a.name);if(u)u.type=bh(u.type,l);else{let f={name:a.name,declared:!1,subTypes:c,superTypes:a.superTypes,type:l};o.unions.push(f),s.set(a.name,f)}}else o.interfaces.push(a)}for(let a of o.interfaces)a.superTypes=new Set([...a.superTypes].filter(c=>!s.has(c)));return o}function Eo(r,e,t){if(r)return{elementType:Eo(!1,e,t)};if(e)return{referenceType:Eo(!1,!1,t)};if(t.length===1){let n=t[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:ys(n)?{primitive:n}:{value:n}}else return{types:t.map(n=>Eo(!1,!1,[n]))}}function jx(r,e){let t=Hx(r,e),n=kx(t.interfaces,t.types),i=Fx(t.parserRules,t.datatypeRules,n);return{astResources:t,inferred:i,declared:n}}function Hx(r,e,t=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(r)||(r=[r]);for(let i of r){let o=ne(i);if(!t.has(o.uri)){t.add(o.uri);for(let s of i.rules)B(s)&&!s.fragment&&(qr(s)?n.datatypeRules.push(s):n.parserRules.push(s));if(i.interfaces.forEach(s=>n.interfaces.push(s)),i.types.forEach(s=>n.types.push(s)),e){let s=i.imports.map(a=>ci(e,a)).filter(a=>a!==void 0);Hx(s,e,t,n)}}}return n}function Wx(r,e){let{inferred:t,declared:n,astResources:i}=jx(r,e);return{astResources:i,inferred:Bx(n,t),declared:Bx(t,n)}}function Bx(r,e){var t,n;let i={interfaces:Tx(Kx(...r.interfaces,...(t=e?.interfaces)!==null&&t!==void 0?t:[])),unions:Kx(...r.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},o=$x(i);return sI(o),o}function Kx(...r){return Array.from(r.reduce((e,t)=>(e.set(t.name,t),e),new Map).values()).sort((e,t)=>e.name.localeCompare(t.name))}function sI(r){let e=cI(r),t=Array.from(e.values());lI(t),uI(r.interfaces),aI(t)}function aI(r){let e=new Set,t=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)t(i),i.typeNames.forEach(o=>n.typeNames.add(o))}};r.forEach(t)}function cI({interfaces:r,unions:e}){let t=r.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,Ih(i.type,new Set));for(let[i,o]of n)o&&t.delete(i.name);return t}function Ih(r,e){if(e.has(r))return!0;if(e.add(r),Ot(r))return r.types.every(t=>Ih(t,e));if(Lr(r)){let t=r.value;return dn(t)?Ih(t.type,e):!1}else return Mr(r)||Nn(r)}function lI(r){for(let e of r)for(let t of e.superTypes)t.subTypes.add(e)}function uI(r){var e;let t=r.reduce((s,a)=>(s.set(a.name,a),s),new Map);for(let s of r){let a=s.properties.flatMap(c=>vx(c.type));for(let c of a)(e=t.get(c))===null||e===void 0||e.containerTypes.add(s)}let n=new Set,i=r.filter(s=>s.subTypes.size===0),o=new Set(i);for(;i.length>0;){let s=i.shift();if(s)for(let a of s.superTypes)mn(a)&&(s.containerTypes.size===0?(n.add(a.name),a.containerTypes.clear()):n.has(a.name)||s.containerTypes.forEach(c=>a.containerTypes.add(c)),o.has(a)||(o.add(a),i.push(a)))}}var fI={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1},dI={maxLookahead:3},Vx={AstReflection:()=>new Za},zx={Grammar:()=>wx(),LanguageMetaData:()=>fI,parser:{ParserConfig:()=>dI}};var Tc=class{constructor(e,t,n){var i;this.elements=e,this.outerScope=t,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let t=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(t)return t;if(this.outerScope)return this.outerScope.getElement(e)}},ws=class{constructor(e,t,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=t}getElement(e){let t=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(t);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=ie(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},Xx={getElement(){},getAllElements(){return is}};var Ru=de(Qn(),1);var Ss=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,t=Ru.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,t)}async computeExportsForNode(e,t,n=_i,i=Ru.CancellationToken.None){let o=[];this.exportNode(e,o,t);for(let s of n(e))await Ze(i),this.exportNode(s,o,t);return o}exportNode(e,t,n){let i=this.nameProvider.getName(e);i&&t.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,t=Ru.CancellationToken.None){let n=e.parseResult.value,i=new Le;for(let o of Qe(n))await Ze(t),this.processNode(o,e,i);return i}processNode(e,t,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,t))}}};var bu=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},Ph=class extends bu{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,t){this.throwIfDisposed(),this.cache.set(e,t)}get(e,t){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(t){let n=t();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},Au=class extends bu{constructor(e){super(),this.cache=new Map,this.converter=e??(t=>t)}has(e,t){return this.throwIfDisposed(),this.cacheForContext(e).has(t)}set(e,t,n){this.throwIfDisposed(),this.cacheForContext(e).set(t,n)}get(e,t,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(t))return i.get(t);if(n){let o=n();return i.set(t,o),o}else return}delete(e,t){return this.throwIfDisposed(),this.cacheForContext(e).delete(t)}clear(e){if(this.throwIfDisposed(),e){let t=this.converter(e);this.cache.delete(t)}else this.cache.clear()}cacheForContext(e){let t=this.converter(e),n=this.cache.get(t);return n||(n=new Map,this.cache.set(t,n)),n}};var wu=class extends Ph{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var Cs=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new wu(e.shared)}getScope(e){let t=[],n=this.reflection.getReferenceType(e),i=ne(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&t.push(ie(a).filter(c=>this.reflection.isSubtype(c.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=t.length-1;s>=0;s--)o=this.createScope(t[s],o);return o}createScope(e,t,n){return new Tc(ie(e),t,n)}createScopeForNodes(e,t,n){let i=ie(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new Tc(i,t,n)}getGlobalScope(e,t){return this.globalScopeCache.get(e,()=>new ws(this.indexManager.allElements(e)))}};var Su=class extends Cs{constructor(e){super(e),this.langiumDocuments=e.shared.workspace.LangiumDocuments}getScope(e){let t=this.reflection.getReferenceType(e);return t===To?this.getTypeScope(t,e):super.getScope(e)}getTypeScope(e,t){let n,i=ne(t.container).precomputedScopes,o=iu(t.container);if(i&&o){let a=i.get(o);a.length>0&&(n=ie(a).filter(c=>c.type===ec||c.type===tc))}let s=this.getGlobalScope(e,t);return n?this.createScope(n,s):s}getGlobalScope(e,t){let n=Ie(t.container,ss);if(!n)return Xx;let i=new Set;this.gatherImports(n,i);let o=this.indexManager.allElements(e,i);return e===To&&(o=o.filter(s=>s.type===ec||s.type===tc)),new ws(o)}gatherImports(e,t){for(let n of e.imports){let i=Eh(n);if(i&&!t.has(i.toString())&&(t.add(i.toString()),this.langiumDocuments.hasDocument(i))){let s=this.langiumDocuments.getOrCreateDocument(i).parseResult.value;ss(s)&&this.gatherImports(s,t)}}}},Cu=class extends Ss{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,t,n){var i;if(super.exportNode(e,t,n),B(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;t.push(this.createInterfaceDescription(o,o.name,n))}Qe(e).forEach(o=>{if(Ne(o)&&o.inferredType){let s=bs(o);s&&t.push(this.createInterfaceDescription(o,s,n))}})}}processNode(e,t,n){ls(e)||(this.processTypeNode(e,t,n),this.processActionNode(e,t,n),super.processNode(e,t,n))}processTypeNode(e,t,n){var i;let o=e.$container;if(o&&B(e)&&!e.returnType&&!e.dataType){let s=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(s,s.name,t))}}processActionNode(e,t,n){let i=iu(e);if(i&&Ne(e)&&e.inferredType){let o=bs(e);o&&n.add(i,this.createInterfaceDescription(e,o,t))}}createInterfaceDescription(e,t,n=ne(e)){let i,o=()=>{var s;return i??(i=or((s=this.nameProvider.getNameNode(e))!==null&&s!==void 0?s:e.$cstNode))};return{node:e,name:t,get nameSegment(){return o()},selectionSegment:or(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};var Ur=de(Ae(),1);var ar=de(Ae(),1);var ku=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,t={},n=ar.CancellationToken.None){let i=e.parseResult,o=[];if(await Ze(n),(!t.categories||t.categories.includes("built-in"))&&(this.processLexingErrors(i,o,t),t.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===gn.LexingError})||(this.processParsingErrors(i,o,t),t.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===gn.ParsingError}))||(this.processLinkingErrors(e,o,t),t.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===gn.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,t,n))}catch(s){if(wo(s))throw s;console.error("An error occurred during validation:",s)}return await Ze(n),o}processLexingErrors(e,t,n){for(let i of e.lexerErrors){let o={severity:ar.DiagnosticSeverity.Error,range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Fr(gn.LexingError),source:this.getSource()};t.push(o)}}processParsingErrors(e,t,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset))o=ar.Range.create(0,0,0,0);else{let a=ar.Position.create(s.endLine-1,s.endColumn);o=ar.Range.create(a,a)}}}else o=Qa(i.token);if(o){let s={severity:ar.DiagnosticSeverity.Error,range:o,message:i.message,data:Fr(gn.ParsingError),source:this.getSource()};t.push(s)}}}processLinkingErrors(e,t,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:gn.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};t.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,t,n=ar.CancellationToken.None){let i=[],o=(s,a,c)=>{i.push(this.toDiagnostic(s,a,c))};return await Promise.all(ni(e).map(async s=>{await Ze(n);let a=this.validationRegistry.getChecks(s.$type,t.categories);for(let c of a)await c(s,o,n)})),i}toDiagnostic(e,t,n){return{message:t,range:pI(n),severity:mI(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function pI(r){if(ar.Range.is(r.range))return r.range;let e;return typeof r.property=="string"?e=Jt(r.node.$cstNode,r.property,r.index):typeof r.keyword=="string"&&(e=Xr(r.node.$cstNode,r.keyword,r.index)),e??(e=r.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function mI(r){switch(r){case"error":return ar.DiagnosticSeverity.Error;case"warning":return ar.DiagnosticSeverity.Warning;case"info":return ar.DiagnosticSeverity.Information;case"hint":return ar.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+r)}}var gn;(function(r){r.LexingError="lexing-error",r.ParsingError="parsing-error",r.LinkingError="linking-error"})(gn=gn||(gn={}));var Eu=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,t){let n=[],i=o=>o&&n.push(o);for(let o of t.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,t,n){var i;switch((i=e.data)===null||i===void 0?void 0:i.code){case Se.GrammarNameUppercase:case Se.RuleNameUppercase:n(this.makeUpperCase(e,t));break;case Se.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,t));break;case Se.UseRegexTokens:n(this.fixRegexTokens(e,t));break;case Se.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,t));break;case Se.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,t));break;case Se.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,t));break;case Se.MissingReturns:n(this.fixMissingReturns(e,t));break;case Se.InvalidInfers:case Se.InvalidReturns:n(this.fixInvalidReturnsInfers(e,t));break;case Se.MissingInfer:n(this.fixMissingInfer(e,t));break;case Se.SuperfluousInfer:n(this.fixSuperfluousInfer(e,t));break;case gn.LinkingError:{let o=e.data;o&&o.containerType==="RuleCall"&&o.property==="rule"&&n(this.addNewRule(e,o,t)),o&&this.lookInGlobalScope(e,o,t).forEach(n);break}}}fixMissingReturns(e,t){let n=t.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[t.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,t){let n=e.data;if(n&&n.actionSegment){let i=t.textDocument.getText(n.actionSegment.range);return{title:`Correct ${i} usage`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[t.textDocument.uri]:[{range:n.actionSegment.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,t){let n=e.data;if(n&&n.actionSegment)return{title:"Correct 'infer' usage",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[t.textDocument.uri]:[{range:{start:n.actionSegment.range.end,end:n.actionSegment.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,t){let n=e.data;if(n&&n.actionRange)return{title:"Remove the 'infer' keyword",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[t.textDocument.uri]:[{range:n.actionRange,newText:""}]}}}}fixUnnecessaryFileExtension(e,t){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[t.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,t){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[t.textDocument.uri]:[{range:n,newText:t.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,t){return{title:"Add entry keyword",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[t.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,t){let n=t.textDocument.offsetAt(e.range.start),i=t.parseResult.value.$cstNode;if(i){let o=Ar(i,n),s=Ie(o?.astNode,ru);if(s&&s.right&&s.$cstNode){let a=s.left.value,c=s.right.value;return{title:"Refactor into regular expression",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[t.textDocument.uri]:[{range:s.$cstNode.range,newText:`/[${si(a)}-${si(c)}]/`}]}}}}}}fixCrossRefSyntax(e,t){return{title:"Replace '|' with ':'",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[t.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,t){let n=t.parseResult.value,i=n.hiddenTokens,o=[],s=Jt(n.$cstNode,"definesHiddenTokens");if(s){let a=s.range.start,c=s.offset,l=n.$cstNode.text.indexOf(")",c)+1;o.push({newText:"",range:{start:a,end:t.textDocument.positionAt(l)}})}for(let a of i){let c=a.ref;if(c&&we(c)&&!c.hidden&&c.$cstNode){let l=c.$cstNode.range.start;o.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[t.textDocument.uri]:o}}}}addNewRule(e,t,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let s=Ar(o,i),a=Ie(s?.astNode,B);if(a&&a.$cstNode)return{title:`Add new rule '${t.refText}'`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:a.$cstNode.range.end,end:a.$cstNode.range.end},newText:`

`+t.refText+`:
    /* TODO implement rule */ {infer `+t.refText+"};"}]}}}}}lookInGlobalScope(e,t,n){var i,o;let s={container:{$type:t.containerType},property:t.property,reference:{$refText:t.refText}},a=this.reflection.getReferenceType(s),c=this.indexManager.allElements(a).filter(m=>m.name===t.refText),l=[],u=-1,f=-1;for(let m of c){if(ve.equals(m.documentUri,n.uri))continue;let T=hI(n.uri,m.documentUri),A,S="",N=n.parseResult.value,C=N.imports.find(v=>v.path&&T<v.path);if(C)A=(i=C.$cstNode)===null||i===void 0?void 0:i.range.start;else if(N.imports.length>0){let v=N.imports[N.imports.length-1].$cstNode.range.end;v&&(A={line:v.line+1,character:0})}else N.rules.length>0&&(A=(o=N.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,S=`
`);A&&((u<0||T.length<f)&&(u=l.length,f=T.length),l.push({title:`Add import to '${T}'`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:A,end:A},newText:`import '${T}'
${S}`}]}}}))}return u>=0&&(l[u].isPreferred=!0),l}};function hI(r,e){let t=ve.dirname(r),n=ve.relative(t,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}var Zx=de(uo(),1);var $s=de(Ae(),1);function Dh(r,e){let t={stacks:r,tokens:e};return gI(t),t.stacks.flat().forEach(i=>{i.property=void 0}),Jx(t.stacks).map(i=>i[i.length-1])}function Oh(r){let{next:e,cardinalities:t,visited:n,plus:i}=r,o=[],s=e.feature;if(n.has(s))return[];n.add(s);let a,c=s;for(;c.$container;)if(qt(c.$container)){a=c.$container;break}else if(os(c.$container))c=c.$container;else break;if(Dx(c.cardinality)){let l=ks({next:{feature:c,type:e.type,new:!1},cardinalities:t,visited:n,plus:i});for(let u of l)i.add(u.feature);o.push(...l)}if(a){let l=a.elements.indexOf(c);l!==void 0&&l<a.elements.length-1&&o.push(...Yx({feature:a,type:e.type,new:!1},l+1,t,n,i)),o.every(u=>Yr(u.feature.cardinality,u.feature)||Yr(t.get(u.feature))||i.has(u.feature))&&o.push(...Oh({next:{feature:a,type:e.type,new:!1},cardinalities:t,visited:n,plus:i}))}return o}function vc(r){return $t(r)&&(r={feature:r}),ks({next:r,cardinalities:new Map,visited:new Set,plus:new Set})}function ks(r){var e,t,n;let{next:i,cardinalities:o,visited:s,plus:a}=r;if(i===void 0)return[];let{feature:c,type:l}=i;if(qt(c)){if(s.has(c))return[];s.add(c)}if(qt(c))return Yx(i,0,o,s,a).map(u=>$u(u,c.cardinality,o));if(Dr(c)||Or(c))return c.elements.flatMap(u=>ks({next:{feature:u,new:!1,type:l},cardinalities:o,visited:s,plus:a})).map(u=>$u(u,c.cardinality,o));if(Re(c)){let u={feature:c.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:c.feature};return ks({next:u,cardinalities:o,visited:s,plus:a}).map(f=>$u(f,c.cardinality,o))}else{if(Ne(c))return Oh({next:{feature:c,new:!0,type:hn(c),property:(t=i.property)!==null&&t!==void 0?t:c.feature},cardinalities:o,visited:s,plus:a});if(_e(c)&&B(c.rule.ref)){let u=c.rule.ref,f={feature:u.definition,new:!0,type:u.fragment?void 0:(n=Rs(u))!==null&&n!==void 0?n:u.name,property:i.property};return ks({next:f,cardinalities:o,visited:s,plus:a}).map(m=>$u(m,c.cardinality,o))}else return[i]}}function $u(r,e,t){return t.set(r.feature,e),r}function Yx(r,e,t,n,i){var o;let s=[],a;for(;e<r.feature.elements.length&&(a={feature:r.feature.elements[e++],new:!1,type:r.type},s.push(...ks({next:a,cardinalities:t,visited:n,plus:i})),!!Yr((o=a.feature.cardinality)!==null&&o!==void 0?o:t.get(a.feature),a.feature)););return s}function gI(r){for(let e of r.tokens){let t=Jx(r.stacks,e);r.stacks=t}}function Jx(r,e){let t=[];for(let n of r)t.push(...yI(n,e));return t}function yI(r,e){let t=new Map,n=new Set(r.map(o=>o.feature).filter(TI)),i=[];for(;r.length>0;){let o=r.pop(),s=Oh({next:o,cardinalities:t,plus:n,visited:new Set}).filter(a=>e?Lh(a.feature,e):!0);for(let a of s)i.push([...r,a]);if(!s.every(a=>Yr(a.feature.cardinality,a.feature)||Yr(t.get(a.feature))))break}return i}function TI(r){if(r.cardinality==="+")return!0;let e=Ie(r,Re);return!!(e&&e.cardinality==="+")}function Lh(r,e){if(mt(r))return r.value===e.image;if(_e(r))return vI(r.rule.ref,e);if(Xt(r)){let t=Nu(r);if(t)return Lh(t,e)}return!1}function vI(r,e){return B(r)?vc(r.definition).some(n=>Lh(n.feature,e)):we(r)?Jr(r).test(e.image):!1}function Qx(r){let e=Array.from(new Set(r.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),t=Array.from(new Set(r.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:t.length>0?t:void 0}}var Es=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,t){let n=[],i=this.buildContexts(e,t.position),o=(c,l)=>{let u=this.fillCompletionItem(c,l);u&&n.push(u)},s=c=>mt(c.feature)?c.feature.value:c.feature,a=[];for(let c of i)if(await Promise.all(ie(c.features).distinct(s).exclude(a).map(l=>this.completionFor(c,l,o))),a.push(...c.features),!this.continueCompletion(n))break;return $s.CompletionList.create(this.deduplicateItems(n),!0)}deduplicateItems(e){return ie(e).distinct(t=>`${t.kind}_${t.label}_${t.detail}`).toArray()}findFeaturesAt(e,t){let n=e.getText({start:$s.Position.create(0,0),end:e.positionAt(t)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let c=_u(this.grammar),l=vc({feature:c.definition,new:!0,type:Rs(c)});return o.length>0?(o.shift(),Dh(l.map(u=>[u]),o)):l}let s=[...o].splice(i.tokenIndex);return Dh([i.elementStack.map(c=>({feature:c}))],s)}*buildContexts(e,t){var n,i,o,s,a;let c=e.parseResult.value.$cstNode;if(!c)return;let l=e.textDocument,u=l.getText(),f=l.offsetAt(t),m={document:e,textDocument:l,offset:f,position:t},T=this.findDataTypeRuleStart(c,f);if(T){let[y,$]=T,D=(n=Ar(c,y))===null||n===void 0?void 0:n.astNode,X=this.findFeaturesAt(l,y);yield Object.assign(Object.assign({},m),{node:D,tokenOffset:y,tokenEndOffset:$,features:X})}let{nextTokenStart:A,nextTokenEnd:S,previousTokenStart:N,previousTokenEnd:C}=this.backtrackToAnyToken(u,f),v;if(N!==void 0&&C!==void 0&&C===f){v=(i=Ar(c,N))===null||i===void 0?void 0:i.astNode;let y=this.findFeaturesAt(l,N);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:N,tokenEndOffset:C,features:y})}if(v=(s=(o=Ar(c,A))===null||o===void 0?void 0:o.astNode)!==null&&s!==void 0?s:N===void 0||(a=Ar(c,N))===null||a===void 0?void 0:a.astNode,v){let y=this.findFeaturesAt(l,A);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:A,tokenEndOffset:S,features:y})}else{let y=_u(this.grammar),$=vc(y.definition);yield Object.assign(Object.assign({},m),{tokenOffset:A,tokenEndOffset:S,features:$})}}findDataTypeRuleStart(e,t){var n,i;let o=Dt(e,t,this.grammarConfig.nameRegexp),s=!!(!((n=Ie(o?.grammarSource,B))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=Ie(o?.grammarSource,B))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,t){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:t,nextTokenEnd:t};let i;for(let o of n){if(o.startOffset>=t)return{nextTokenStart:t,nextTokenEnd:t,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=t)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:t,nextTokenEnd:t,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}async completionForRule(e,t,n){if(B(t)){let i=vc(t.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,t,n){if(mt(t.feature))return this.completionForKeyword(e,t.feature,n);if(Xt(t.feature)&&e.node)return this.completionForCrossReference(e,t,n)}completionForCrossReference(e,t,n){let i=Ie(t.feature,Re),o=e.node;if(i&&o){if(t.type&&(t.new||o.$type!==t.type)&&(o={$type:t.type,$container:o,$containerProperty:t.property}),!e)return;let s={reference:{},container:o,property:i.feature};try{let a=this.scopeProvider.getScope(s),c=new Set;a.getAllElements().forEach(l=>{!c.has(l.name)&&this.filterCrossReference(l)&&(n(e,this.createReferenceCompletionItem(l)),c.add(l.name))})}catch(a){console.error(a)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:this.nodeKindProvider.getCompletionItemKind(e),detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,t,n){t.value.match(/[\w]/)&&n(e,{label:t.value,kind:$s.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,t){var n,i;let o;if(typeof t.label=="string")o=t.label;else if("node"in t){let l=this.nameProvider.getName(t.node);if(!l)return;o=l}else if("nodeDescription"in t)o=t.nodeDescription.name;else return;let s;typeof((n=t.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=t.textEdit.newText:typeof t.insertText=="string"?s=t.insertText:s=o;let a=(i=t.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:t.additionalTextEdits,command:t.command,commitCharacters:t.commitCharacters,data:t.data,detail:t.detail,documentation:t.documentation,filterText:t.filterText,insertText:t.insertText,insertTextFormat:t.insertTextFormat,insertTextMode:t.insertTextMode,kind:t.kind,labelDetails:t.labelDetails,preselect:t.preselect,sortText:t.sortText,tags:t.tags,textEditText:t.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,t,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,t)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var Iu=class extends Es{constructor(e){super(e),this.documents=()=>e.shared.workspace.LangiumDocuments}completionFor(e,t,n){let i=Ie(t.feature,Re);if(i?.feature==="path")this.completeImportPath(e,n);else return super.completionFor(e,t,n)}completeImportPath(e,t){let i=e.textDocument.getText().substring(e.tokenOffset,e.offset),o=this.getAllFiles(e.document),s={start:e.position,end:e.position};if(i.length>0){let a=i.substring(1);o=o.filter(u=>u.startsWith(a));let c=e.textDocument.positionAt(e.tokenOffset+1),l=e.textDocument.positionAt(e.tokenEndOffset-1);s={start:c,end:l}}for(let a of o){let c=i.length>0?"":'"',l=`${c}${a}${c}`;t(e,{label:a,textEdit:{newText:l,range:s},kind:Zx.CompletionItemKind.File,sortText:"0"})}}getAllFiles(e){let t=this.documents().all,n=e.uri.toString(),i=ve.dirname(e.uri).toString(),o=[];for(let s of t)if(!ve.equals(s.uri,n)){let a=s.uri.toString(),c=a.substring(0,a.length-ve.extname(s.uri).length),l=ve.relative(i,c);l.startsWith(".")||(l=`./${l}`),o.push(l)}return o}};var xc=de(Ae(),1);var Ns=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let t=[],n=i=>t.push(i);return this.collectFolding(e,n),t}collectFolding(e,t){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=Qe(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,t),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,t)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,t,n){let i=t.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,t,n){let i=t.$cstNode;if(i){for(let o of ov(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,xc.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,t,n){let i=t.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(t,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),xc.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,t){if(t===xc.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var Pu=class extends Ns{shouldProcessContent(e){return!B(e)}};var Du=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Mh(e,this.collector)}formatDocument(e,t){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,t.options):[]}isFormatRangeErrorFree(e,t){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(o=>{var s;return(s=o.line)!==null&&s!==void 0?s:Number.MAX_VALUE}),...n.parserErrors.map(o=>{var s;return(s=o.token.startLine)!==null&&s!==void 0?s:Number.MAX_VALUE}))>t.end.line:!0}formatDocumentRange(e,t){return this.isFormatRangeErrorFree(e,t.range)?this.doDocumentFormat(e,t.options,t.range):[]}formatDocumentOnType(e,t){let n={start:{character:0,line:t.position.line},end:t.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,t.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,t,n){let i=new Map,o=(a,c,l)=>{var u,f;let m=this.nodeModeToKey(a,c),T=i.get(m),A=(u=l.options.priority)!==null&&u!==void 0?u:0,S=(f=T?.options.priority)!==null&&f!==void 0?f:0;(!T||S<=A)&&i.set(m,l)};this.collector=o,this.iterateAstFormatting(e,n);let s=this.iterateCstFormatting(e,i,t,n);return this.avoidOverlappingEdits(e.textDocument,s)}avoidOverlappingEdits(e,t){let n=[];for(let i of t){let o=n[n.length-1];if(o){let s=e.offsetAt(i.range.start),a=e.offsetAt(o.range.end);s<a&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,t){let n=e.parseResult.value;this.format(n);let i=Qe(n).iterator(),o;do if(o=i.next(),!o.done){let s=o.value;this.insideRange(s.$cstNode.range,t)?this.format(s):i.prune()}while(!o.done)}nodeModeToKey(e,t){return`${e.offset}:${e.end}:${t}`}insideRange(e,t){return!t||e.start.line<=t.start.line&&e.end.line>=t.end.line||e.start.line>=t.start.line&&e.end.line<=t.end.line||e.start.line<=t.end.line&&e.end.line>=t.end.line}isNecessary(e,t){return t.getText(e.range)!==e.newText}iterateCstFormatting(e,t,n,i){let o={indentation:0,options:n,document:e.textDocument},s=[],c=this.iterateCstTree(e,o).iterator(),l,u;do if(u=c.next(),!u.done){let f=u.value,m=go(f),T=this.nodeModeToKey(f,"prepend"),A=t.get(T);if(t.delete(T),A){let C=this.createTextEdit(l,f,A,o);for(let v of C)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}let S=this.nodeModeToKey(f,"append"),N=t.get(S);if(t.delete(S),N){let C=cv(f);if(C){let v=this.createTextEdit(f,C,N,o);for(let y of v)y&&this.insideRange(y.range,i)&&this.isNecessary(y,e.textDocument)&&s.push(y)}}if(!A&&f.hidden){let C=this.createHiddenTextEdits(l,f,void 0,o);for(let v of C)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}m&&(l=f)}while(!u.done);return s}createHiddenTextEdits(e,t,n,i){var o;let s=t.range.start.line;if(e&&e.range.end.line===s)return[];let a=[],c={start:{character:0,line:s},end:t.range.start},l=i.document.getText(c),u=this.findFittingMove(c,(o=n?.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(l,i),T=this.getIndentationCharacterCount(i,u)-f;if(T===0)return[];let A="";T>0&&(A=(i.options.insertSpaces?" ":"	").repeat(T));let S=t.text.split(`
`);S[0]=l+S[0];for(let N=0;N<S.length;N++){let C=s+N,v={character:0,line:C};if(T>0)a.push({newText:A,range:{start:v,end:v}});else{let y=S[N],$=0;for(;$<y.length;$++){let D=y.charAt($);if(D!==" "&&D!=="	")break}a.push({newText:"",range:{start:v,end:{line:C,character:Math.min($,Math.abs(T))}}})}}return a}getExistingIndentationCharacterCount(e,t){let n=" ".repeat(t.options.tabSize);return(t.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,t){let n=e.indentation;return t&&t.tabs&&(n+=t.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,t,n,i){var o;if(t.hidden)return this.createHiddenTextEdits(e,t,n,i);let s={start:(o=e?.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:t.range.start},a=this.findFittingMove(s,n.moves,i);if(!a)return[];let c=a.characters,l=a.lines,u=a.tabs,f=i.indentation;i.indentation+=u??0;let m=[];return c!==void 0?m.push(this.createSpaceTextEdit(s,c,n.options)):l!==void 0?m.push(this.createLineTextEdit(s,l,i,n.options)):u!==void 0&&m.push(this.createTabTextEdit(s,!!e,i)),go(t)&&(i.indentation=f),m}createSpaceTextEdit(e,t,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;t=this.fitIntoOptions(t,o,n)}return{newText:" ".repeat(t),range:e}}createLineTextEdit(e,t,n,i){let o=e.end.line-e.start.line;t=this.fitIntoOptions(t,o,i);let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(t)}${a}`,range:e}}createTabTextEdit(e,t,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),s=t?1:0,a=Math.max(e.end.line-e.start.line,s);return{newText:`${`
`.repeat(a)}${o}`,range:e}}fitIntoOptions(e,t,n){return n.allowMore?e=Math.max(t,e):n.allowLess&&(e=Math.min(t,e)),e}findFittingMove(e,t,n){if(t.length===0)return;if(t.length===1)return t[0];let i=e.end.line-e.start.line;for(let o of t){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return t[t.length-1]}iterateCstTree(e,t){let i=e.parseResult.value.$cstNode;return i?new Vr(i,o=>this.iterateCst(o,t)):is}iterateCst(e,t){if(!$n(e))return is;let n=t.indentation;return new Pr(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(t.indentation=n,hr))}},Mh=class{constructor(e,t){this.astNode=e,this.collector=t}node(e){return new yn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let t=[];for(let n of e)n.$cstNode&&t.push(n.$cstNode);return new yn(t,this.collector)}property(e,t){let n=Jt(this.astNode.$cstNode,e,t);return new yn(n?[n]:[],this.collector)}properties(...e){let t=[];for(let n of e){let i=Ii(this.astNode.$cstNode,n);t.push(...i)}return new yn(t,this.collector)}keyword(e,t){let n=Xr(this.astNode.$cstNode,e,t);return new yn(n?[n]:[],this.collector)}keywords(...e){let t=[];for(let n of e){let i=Ou(this.astNode.$cstNode,n);t.push(...i)}return new yn(t,this.collector)}cst(e){return new yn([...e],this.collector)}interior(e,t){let n=e.nodes,i=t.nodes;if(n.length!==1||i.length!==1)return new yn([],this.collector);let o=n[0],s=i[0];if(o.offset>s.offset){let a=o;o=s,s=a}return new yn(lv(o,s),this.collector)}},yn=class r{constructor(e,t){this.nodes=e,this.collector=t}prepend(e){for(let t of this.nodes)this.collector(t,"prepend",e);return this}append(e){for(let t of this.nodes)this.collector(t,"append",e);return this}surround(e){for(let t of this.nodes)this.collector(t,"prepend",e),this.collector(t,"append",e);return this}slice(e,t){return new r(this.nodes.slice(e,t),this.collector)}},ge;(function(r){function e(...u){return{options:{},moves:u.flatMap(f=>f.moves).sort(l)}}r.fit=e;function t(u){return i(0,u)}r.noSpace=t;function n(u){return i(1,u)}r.oneSpace=n;function i(u,f){return{options:f??{},moves:[{characters:u}]}}r.spaces=i;function o(u){return s(1,u)}r.newLine=o;function s(u,f){return{options:f??{},moves:[{lines:u}]}}r.newLines=s;function a(u){return{options:u??{},moves:[{tabs:1,lines:1}]}}r.indent=a;function c(u){return{options:u??{},moves:[{tabs:0}]}}r.noIndent=c;function l(u,f){var m,T,A,S,N,C;let v=(m=u.lines)!==null&&m!==void 0?m:0,y=(T=f.lines)!==null&&T!==void 0?T:0,$=(A=u.tabs)!==null&&A!==void 0?A:0,D=(S=f.tabs)!==null&&S!==void 0?S:0,X=(N=u.characters)!==null&&N!==void 0?N:0,ye=(C=f.characters)!==null&&C!==void 0?C:0;return v<y?-1:v>y?1:$<D?-1:$>D?1:X<ye?-1:X>ye?1:0}})(ge=ge||(ge={}));var Lu=class extends Du{format(e){if(Xt(e))this.getNodeFormatter(e).properties("type","terminal").surround(ge.noSpace());else if(B(e)){let t=this.getNodeFormatter(e);t.keywords("entry","fragment","returns").append(ge.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?t.property("name").append(ge.oneSpace()):t.property("name").append(ge.noSpace()),t.properties("parameters").append(ge.noSpace()),t.keywords(",").append(ge.oneSpace()),t.keywords("<").append(ge.noSpace());let n=t.keyword(";"),i=t.keyword(":");i.prepend(ge.noSpace()),t.interior(i,n).prepend(ge.indent()),n.prepend(ge.fit(ge.noSpace(),ge.newLine())),t.node(e).prepend(ge.noIndent())}else if(we(e)){let t=this.getNodeFormatter(e);e.type&&(t.property("name").append(ge.oneSpace()),t.keyword("returns").append(ge.oneSpace())),t.keywords("hidden","terminal","fragment").append(ge.oneSpace()),t.keyword(":").prepend(ge.noSpace()),t.keyword(";").prepend(ge.fit(ge.noSpace(),ge.newLine())),t.node(e).prepend(ge.noIndent())}else if(Ne(e)){let t=this.getNodeFormatter(e);t.keyword("{").append(ge.noSpace()),t.keywords(".","+=","=").surround(ge.noSpace()),t.keyword("}").prepend(ge.noSpace())}else if(as(e))this.getNodeFormatter(e).keywords("infer","infers").append(ge.oneSpace());else if(Re(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(ge.noSpace());else if(_e(e)){let t=this.getNodeFormatter(e);t.keyword("<").surround(ge.noSpace()),t.keyword(",").append(ge.oneSpace()),t.properties("arguments").append(ge.noSpace())}os(e)&&this.getNodeFormatter(e).property("cardinality").prepend(ge.noSpace())}};var ui=de(Ae(),1);var oe=de(Ae(),1);var Uh={[oe.SemanticTokenTypes.class]:0,[oe.SemanticTokenTypes.comment]:1,[oe.SemanticTokenTypes.enum]:2,[oe.SemanticTokenTypes.enumMember]:3,[oe.SemanticTokenTypes.event]:4,[oe.SemanticTokenTypes.function]:5,[oe.SemanticTokenTypes.interface]:6,[oe.SemanticTokenTypes.keyword]:7,[oe.SemanticTokenTypes.macro]:8,[oe.SemanticTokenTypes.method]:9,[oe.SemanticTokenTypes.modifier]:10,[oe.SemanticTokenTypes.namespace]:11,[oe.SemanticTokenTypes.number]:12,[oe.SemanticTokenTypes.operator]:13,[oe.SemanticTokenTypes.parameter]:14,[oe.SemanticTokenTypes.property]:15,[oe.SemanticTokenTypes.regexp]:16,[oe.SemanticTokenTypes.string]:17,[oe.SemanticTokenTypes.struct]:18,[oe.SemanticTokenTypes.type]:19,[oe.SemanticTokenTypes.typeParameter]:20,[oe.SemanticTokenTypes.variable]:21},eR={[oe.SemanticTokenModifiers.abstract]:1,[oe.SemanticTokenModifiers.async]:2,[oe.SemanticTokenModifiers.declaration]:4,[oe.SemanticTokenModifiers.defaultLibrary]:8,[oe.SemanticTokenModifiers.definition]:16,[oe.SemanticTokenModifiers.deprecated]:32,[oe.SemanticTokenModifiers.documentation]:64,[oe.SemanticTokenModifiers.modification]:128,[oe.SemanticTokenModifiers.readonly]:256,[oe.SemanticTokenModifiers.static]:512},tR={legend:{tokenTypes:Object.keys(Uh),tokenModifiers:Object.keys(eR)},full:{delta:!0},range:!0},qh=class extends oe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,t,n,i,o){this._tokens.push({line:e,char:t,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,t){return e.line===t.line?e.char-t.char:e.line-t.line}},Mu=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(t=>{this.tokensBuilders.delete(t.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(t=>{var n;this.initialize((n=t.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,t,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,t,n=oe.CancellationToken.None){return this.currentRange=t.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,t,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(t.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return t=>{"line"in t?this.highlightToken({range:{start:{line:t.line,character:t.char},end:{line:t.line,character:t.char+t.length}},type:t.type,modifier:t.modifier}):"range"in t?this.highlightToken(t):"keyword"in t?this.highlightKeyword(t):"property"in t?this.highlightProperty(t):this.highlightNode({node:t.cst,type:t.type,modifier:t.modifier})}}getDocumentTokensBuilder(e){let t=this.tokensBuilders.get(e.uri.toString());if(t)return t;let n=new qh;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,t,n){let i=e.parseResult.value,o=ni(i,{range:this.currentRange}).iterator(),s;do if(s=o.next(),!s.done){await Ze(n);let a=s.value;this.highlightElement(a,t)==="prune"&&o.prune()}while(!s.done)}highlightToken(e){var t;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!Ql(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let s=Uh[i],a=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let u of o){let f=eR[u];a|=f}}let c=n.start.line,l=n.end.line;if(c===l){let u=n.start.character,f=n.end.character-u;this.currentTokensBuilder.push(c,u,f,s,a)}else if(!((t=this.clientCapabilities)===null||t===void 0)&&t.multilineTokenSupport){let u=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(c,u,m-f,s,a)}else{let u=n.start,f=this.currentDocument.textDocument.offsetAt({line:c+1,character:0});this.currentTokensBuilder.push(u.line,u.character,f-u.character-1,s,a);for(let m=c+1;m<l;m++){let T=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-T-1,s,a)}this.currentTokensBuilder.push(l,0,n.end.character,s,a)}}highlightProperty(e){let t=[];if(typeof e.index=="number"){let o=Jt(e.node.$cstNode,e.property,e.index);o&&t.push(o)}else t.push(...Ii(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of t)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:t,keyword:n,type:i,index:o,modifier:s}=e,a=[];if(typeof o=="number"){let c=Xr(t.$cstNode,n,o);c&&a.push(c)}else a.push(...Ou(t.$cstNode,n));for(let c of a)this.highlightNode({node:c,type:i,modifier:s})}highlightNode(e){let{node:t,type:n,modifier:i}=e,o=t.range;this.highlightToken({range:o,type:n,modifier:i})}},Fh;(function(r){function e(n,i){let o=new Map;Object.entries(Uh).forEach(([c,l])=>o.set(l,c));let s=0,a=0;return t(n.data,5).map(c=>{s+=c[0],c[0]!==0&&(a=0),a+=c[1];let l=c[2];return{offset:i.textDocument.offsetAt({line:s,character:a}),tokenType:o.get(c[3]),tokenModifiers:c[4],text:i.textDocument.getText({start:{line:s,character:a},end:{line:s,character:a+l}})}})}r.decode=e;function t(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(Fh=Fh||(Fh={}));var Fu=class extends Mu{highlightElement(e,t){var n;Re(e)?t({node:e,property:"feature",type:ui.SemanticTokenTypes.property}):Ne(e)?e.feature&&t({node:e,property:"feature",type:ui.SemanticTokenTypes.property}):ls(e)?t({node:e,property:"name",type:ui.SemanticTokenTypes.type}):sr(e)?(e.primitiveType||e.typeRef)&&t({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:ui.SemanticTokenTypes.type}):Sv(e)?t({node:e,property:"name",type:ui.SemanticTokenTypes.parameter}):cs(e)?t({node:e,property:"parameter",type:ui.SemanticTokenTypes.parameter}):_e(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&t({node:e,property:"rule",type:ui.SemanticTokenTypes.type}):tu(e)&&t({node:e,property:"name",type:ui.SemanticTokenTypes.property})}};var qu=class extends ms{getName(e){return Re(e)?e.feature:super.getName(e)}getNameNode(e){return Re(e)?Jt(e.$cstNode,"feature"):super.getNameNode(e)}};var _s=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let t=Is(e),n=e.astNode;if(t&&n){let i=n[t.feature];if(ei(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(ei(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||sv(e,i)))return n}}}findDeclarationNode(e){let t=this.findDeclaration(e);if(t?.$cstNode){let n=this.nameProvider.getNameNode(t);return n??t.$cstNode}}findReferences(e,t){let n=[];if(t.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return t.documentUri&&(i=i.filter(o=>ve.equals(o.sourceUri,t.documentUri))),n.push(...i),ie(n)}getReferenceToSelf(e){let t=this.nameProvider.getNameNode(e);if(t){let n=ne(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:or(t),local:!0}}}};var Uu=class extends _s{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let t=e.astNode,n=Is(e);if(n&&n.feature==="feature"){if(Re(t))return this.findAssignmentDeclaration(t);if(Ne(t))return this.findActionDeclaration(t)}return super.findDeclaration(e)}findReferences(e,t){var n;return tu(e)?this.findReferencesToTypeAttribute(e,(n=t.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,t)}findReferencesToTypeAttribute(e,t){let n=[],i=Ie(e,wr);if(i){if(t){let a=this.getReferenceToSelf(e);a&&n.push(a)}let o=uh(i,this,this.documents,this.nodeLocator),s=[];o.forEach(a=>{let c=this.findRulesWithReturnType(a);s.push(...c)}),s.forEach(a=>{let c=this.createReferencesToAttribute(a,e);n.push(...c)})}return ie(n)}createReferencesToAttribute(e,t){let n=[];if(B(e)){let i=xs(e.definition).find(o=>o.feature===t.name);if(i?.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:ne(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:ne(t).uri,targetPath:this.nodeLocator.getAstNodePath(t),segment:or(o),local:ve.equals(ne(i).uri,ne(t).uri)})}}else{if(e.feature===t.name){let o=Jt(e.$cstNode,"feature");o&&n.push({sourceUri:ne(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:ne(t).uri,targetPath:this.nodeLocator.getAstNodePath(t),segment:or(o),local:ve.equals(ne(e).uri,ne(t).uri)})}let i=Ie(e,B);n.push(...this.createReferencesToAttribute(i,t))}return n}findAssignmentDeclaration(e){var t;let n=Ie(e,B),i=Ch(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((t=n?.returnType)===null||t===void 0)&&t.ref&&(wr(n.returnType.ref)||Ft(n.returnType.ref))){let o=sc(n.returnType.ref);for(let s of o){let a=s.attributes.find(c=>c.name===e.feature);if(a)return a}}return e}findActionDeclaration(e,t){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=t??e.feature,o=sc(e.type.ref);for(let s of o){let a=s.attributes.find(c=>c.name===i);if(a)return a}}}findRulesWithReturnType(e){let t=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),s=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);(B(s)||Ne(s))&&t.push(s)}),t}};var Rc=de(Ae(),1);var rR=de(Ae(),1);var Gu=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,t){let n=e.parseResult.value,i=Dt(n.$cstNode,e.textDocument.offsetAt(t.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.astNode,e)}getCallHierarchyItems(e,t){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:rR.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:t.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let t=this.documents.getOrCreateDocument(Qt.parse(e.item.uri)),n=t.parseResult.value,i=Dt(n.$cstNode,t.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.astNode,{includeDeclaration:!1});return this.getIncomingCalls(i.astNode,o)}outgoingCalls(e){let t=this.documents.getOrCreateDocument(Qt.parse(e.item.uri)),n=t.parseResult.value,i=Dt(n.$cstNode,t.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.astNode)}};var nR=de(Ae(),1);var Ps=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,t){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=Dt(i,e.textDocument.offsetAt(t.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,t)}}collectLocationLinks(e,t){var n;let i=this.findLink(e);if(i)return[nR.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let t=this.references.findDeclarationNode(e);if(t?.astNode){let n=ne(t.astNode);if(t&&n)return{source:e,target:t,targetDocument:n}}}};var iR=de(Ae(),1);var ju=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,t){let n=e.parseResult.value.$cstNode;if(!n)return;let i=Dt(n,e.textDocument.offsetAt(t.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let s=ve.equals(ne(o).uri,e.uri),a={documentUri:e.uri,includeDeclaration:s};return this.references.findReferences(o,a).map(l=>this.createDocumentHighlight(l)).toArray()}}createDocumentHighlight(e){return iR.DocumentHighlight.create(e.segment.range)}};var Hu=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,t){let n=t.$cstNode,i=this.nameProvider.getNameNode(t);if(i&&n){let o=this.nameProvider.getName(t);return[{kind:this.nodeKindProvider.getSymbolKind(t),name:o??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,t)}]}else return this.getChildSymbols(e,t)||[]}getChildSymbols(e,t){let n=[];for(let i of _i(t)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var oR=de(Ae(),1),Bu=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,t,n=oR.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(t,n)}createCommandAcceptor(){return(e,t)=>this.registeredCommands.set(e,t)}};var Ku=class{match(e,t){if(e.length===0)return!0;t=t.toLowerCase();let n=!1,i,o=0,s=t.length;for(let a=0;a<s;a++){let c=t.charCodeAt(a),l=e.charCodeAt(o);if((c===l||this.toUpperCharCode(c)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,c)),n&&o++,o===e.length))return!0;i=c}return!1}isWordTransition(e,t){return sR<=e&&e<=aR&&xI<=t&&t<=RI||e===cR&&t!==cR}toUpperCharCode(e){return sR<=e&&e<=aR?e-32:e}},sR="a".charCodeAt(0),aR="z".charCodeAt(0),xI="A".charCodeAt(0),RI="Z".charCodeAt(0),cR="_".charCodeAt(0);var Gh=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,t){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(t.position),a=Dt(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let c=this.references.findDeclaration(a);if(c)return this.getAstNodeHoverContent(c)}}}},Wu=class extends Gh{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let t=this.documentationProvider.getDocumentation(e);if(t)return{contents:{kind:"markdown",value:t}}}};var bI=de(Ae(),1);var AI=de(Ae(),1);var Qr=de(Ae(),1);var je;(function(r){r[r.Changed=0]="Changed",r[r.Parsed=1]="Parsed",r[r.IndexedContent=2]="IndexedContent",r[r.ComputedScopes=3]="ComputedScopes",r[r.Linked=4]="Linked",r[r.IndexedReferences=5]="IndexedReferences",r[r.Validated=6]="Validated"})(je=je||(je={}));var Vu=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,t){return this.create(t??Qt.parse(e.uri),e)}fromString(e,t){return this.create(t,e)}fromModel(e,t){return this.create(t,{$model:e})}create(e,t){if(t??(t=this.textDocuments.get(e.toString())),t??(t=this.getContentFromFileSystem(e)),typeof t=="string"){let n=this.parse(e,t);return this.createLangiumDocument(n,e,void 0,t)}else if("$model"in t){let n={value:t.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,t.getText());return this.createLangiumDocument(n,e,t)}}createLangiumDocument(e,t,n,i){let o;if(n)o={parseResult:e,uri:t,state:je.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(t,i);o={parseResult:e,uri:t,state:je.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}update(e){let t=this.textDocuments.get(e.uri.toString()),n=t?t.getText():this.getContentFromFileSystem(e.uri);if(t)Object.defineProperty(e,"textDocument",{value:t});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,t){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(t)}createTextDocumentGetter(e,t){let n=this.serviceRegistry,i;return()=>i??(i=rs.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,t??""))}},zu=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return ie(this.documentMap.values())}addDocument(e){let t=e.uri.toString();if(this.documentMap.has(t))throw new Error(`A document with the URI '${t}' is already present.`);this.documentMap.set(t,e)}getOrCreateDocument(e){let t=e.toString(),n=this.documentMap.get(t);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(t,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let t=e.toString(),n=this.documentMap.get(t);return n&&(n.state=je.Changed,n.precomputedScopes=void 0,n.references=[],n.diagnostics=void 0),n}deleteDocument(e){let t=e.toString(),n=this.documentMap.get(t);return n&&(n.state=je.Changed,this.documentMap.delete(t)),n}};var wI=de(Ae(),1);function lR(r){let e=[],t=[];r.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&t.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:t.length>0?Array.from(new Set(t)).sort():void 0};return n.triggerCharacters?n:void 0}var Xu=class{constructor(e){this.onInitializeEmitter=new Qr.Emitter,this.onInitializedEmitter=new Qr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){Zl(this.services),this.services.ServiceRegistry.all.forEach(e=>Zl(e))}hasService(e){return this.services.ServiceRegistry.all.some(t=>e(t)!==void 0)}buildInitializeResult(e){var t;let n=this.services.ServiceRegistry.all,i=this.hasService(w=>w.lsp.Formatter),o=n.map(w=>{var U;return(U=w.lsp.Formatter)===null||U===void 0?void 0:U.formatOnTypeOptions}).find(w=>!!w),s=this.hasService(w=>w.lsp.CodeActionProvider),a=this.hasService(w=>w.lsp.SemanticTokenProvider),c=(t=this.services.lsp.ExecuteCommandHandler)===null||t===void 0?void 0:t.commands,l=this.hasService(w=>w.lsp.DocumentLinkProvider),u=lR(n.map(w=>{var U;return(U=w.lsp.SignatureHelp)===null||U===void 0?void 0:U.signatureHelpOptions})),f=this.hasService(w=>w.lsp.TypeProvider),m=this.hasService(w=>w.lsp.ImplementationProvider),T=this.hasService(w=>w.lsp.CompletionProvider),A=Qx(n.map(w=>{var U;return(U=w.lsp.CompletionProvider)===null||U===void 0?void 0:U.completionOptions})),S=this.hasService(w=>w.lsp.ReferencesProvider),N=this.hasService(w=>w.lsp.DocumentSymbolProvider),C=this.hasService(w=>w.lsp.DefinitionProvider),v=this.hasService(w=>w.lsp.DocumentHighlightProvider),y=this.hasService(w=>w.lsp.FoldingRangeProvider),$=this.hasService(w=>w.lsp.HoverProvider),D=this.hasService(w=>w.lsp.RenameProvider),X=this.hasService(w=>w.lsp.CallHierarchyProvider),ye=this.hasService(w=>w.lsp.CodeLensProvider),Ee=this.hasService(w=>w.lsp.DeclarationProvider),Bt=this.hasService(w=>w.lsp.InlayHintProvider),Rt=this.services.lsp.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:c&&{commands:c},textDocumentSync:Qr.TextDocumentSyncKind.Incremental,completionProvider:T?A:void 0,referencesProvider:S,documentSymbolProvider:N,definitionProvider:C,typeDefinitionProvider:f,documentHighlightProvider:v,codeActionProvider:s,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:y,hoverProvider:$,renameProvider:D?{prepareProvider:!0}:void 0,semanticTokensProvider:a?tR:void 0,signatureHelpProvider:u,implementationProvider:m,callHierarchyProvider:X?{}:void 0,documentLinkProvider:l?{resolveProvider:!1}:void 0,codeLensProvider:ye?{resolveProvider:!1}:void 0,declarationProvider:Ee,inlayHintProvider:Bt?{resolveProvider:!1}:void 0,workspaceSymbolProvider:Rt?{resolveProvider:!!Rt.resolveSymbol}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};function fR(r){let e=r.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");SI(e,r),CI(e,r),kI(e,r),EI(e,r),NI(e,r),_I(e,r),II(e,r),PI(e,r),OI(e,r),MI(e,r),FI(e,r),$I(e,r),qI(e,r),LI(e,r),UI(e,r),GI(e,r),HI(e,r),KI(e,r),zI(e,r),WI(e,r),BI(e,r),jI(e,r),DI(e,r),VI(e,r),e.onInitialize(n=>r.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>r.lsp.LanguageServer.initialized(n)),r.workspace.TextDocuments.listen(e),e.listen()}function SI(r,e){let t=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(s,a){n.lock(c=>t.update(s,a,c))}e.workspace.TextDocuments.onDidChangeContent(s=>{i([Qt.parse(s.document.uri)],[])}),r.onDidChangeWatchedFiles(s=>{let a=[],c=[];for(let l of s.changes){let u=Qt.parse(l.uri);l.type===Qr.FileChangeType.Deleted?c.push(u):a.push(u)}i(a,c)})}function CI(r,e){e.workspace.DocumentBuilder.onBuildPhase(je.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&r.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}function kI(r,e){r.onCompletion(cr((t,n,i,o)=>{var s;return(s=t.lsp.CompletionProvider)===null||s===void 0?void 0:s.getCompletion(n,i,o)},e))}function EI(r,e){r.onReferences(cr((t,n,i,o)=>{var s;return(s=t.lsp.ReferencesProvider)===null||s===void 0?void 0:s.findReferences(n,i,o)},e))}function $I(r,e){r.onCodeAction(cr((t,n,i,o)=>{var s;return(s=t.lsp.CodeActionProvider)===null||s===void 0?void 0:s.getCodeActions(n,i,o)},e))}function NI(r,e){r.onDocumentSymbol(cr((t,n,i,o)=>{var s;return(s=t.lsp.DocumentSymbolProvider)===null||s===void 0?void 0:s.getSymbols(n,i,o)},e))}function _I(r,e){r.onDefinition(cr((t,n,i,o)=>{var s;return(s=t.lsp.DefinitionProvider)===null||s===void 0?void 0:s.getDefinition(n,i,o)},e))}function II(r,e){r.onTypeDefinition(cr((t,n,i,o)=>{var s;return(s=t.lsp.TypeProvider)===null||s===void 0?void 0:s.getTypeDefinition(n,i,o)},e))}function PI(r,e){r.onImplementation(cr((t,n,i,o)=>{var s;return(s=t.lsp.ImplementationProvider)===null||s===void 0?void 0:s.getImplementation(n,i,o)},e))}function DI(r,e){r.onDeclaration(cr((t,n,i,o)=>{var s;return(s=t.lsp.DeclarationProvider)===null||s===void 0?void 0:s.getDeclaration(n,i,o)},e))}function OI(r,e){r.onDocumentHighlight(cr((t,n,i,o)=>{var s;return(s=t.lsp.DocumentHighlightProvider)===null||s===void 0?void 0:s.getDocumentHighlight(n,i,o)},e))}function LI(r,e){r.onHover(cr((t,n,i,o)=>{var s;return(s=t.lsp.HoverProvider)===null||s===void 0?void 0:s.getHoverContent(n,i,o)},e))}function MI(r,e){r.onFoldingRanges(cr((t,n,i,o)=>{var s;return(s=t.lsp.FoldingRangeProvider)===null||s===void 0?void 0:s.getFoldingRanges(n,i,o)},e))}function FI(r,e){r.onDocumentFormatting(cr((t,n,i,o)=>{var s;return(s=t.lsp.Formatter)===null||s===void 0?void 0:s.formatDocument(n,i,o)},e)),r.onDocumentRangeFormatting(cr((t,n,i,o)=>{var s;return(s=t.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentRange(n,i,o)},e)),r.onDocumentOnTypeFormatting(cr((t,n,i,o)=>{var s;return(s=t.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentOnType(n,i,o)},e))}function qI(r,e){r.onRenameRequest(cr((t,n,i,o)=>{var s;return(s=t.lsp.RenameProvider)===null||s===void 0?void 0:s.rename(n,i,o)},e)),r.onPrepareRename(cr((t,n,i,o)=>{var s;return(s=t.lsp.RenameProvider)===null||s===void 0?void 0:s.prepareRename(n,i,o)},e))}function UI(r,e){r.languages.inlayHint.on(Oi((t,n,i,o)=>{var s;return(s=t.lsp.InlayHintProvider)===null||s===void 0?void 0:s.getInlayHints(n,i,o)},e))}function GI(r,e){let t={data:[]};r.languages.semanticTokens.on(Oi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):t,e)),r.languages.semanticTokens.onDelta(Oi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):t,e)),r.languages.semanticTokens.onRange(Oi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):t,e))}function jI(r,e){r.onDidChangeConfiguration(t=>{t.settings&&e.workspace.ConfigurationProvider.updateConfiguration(t)})}function HI(r,e){let t=e.lsp.ExecuteCommandHandler;t&&r.onExecuteCommand(async(n,i)=>{var o;try{return await t.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return Ds(s)}})}function BI(r,e){r.onDocumentLinks(Oi((t,n,i,o)=>{var s;return(s=t.lsp.DocumentLinkProvider)===null||s===void 0?void 0:s.getDocumentLinks(n,i,o)},e))}function KI(r,e){r.onSignatureHelp(Oi((t,n,i,o)=>{var s;return(s=t.lsp.SignatureHelp)===null||s===void 0?void 0:s.provideSignatureHelp(n,i,o)},e))}function WI(r,e){r.onCodeLens(Oi((t,n,i,o)=>{var s;return(s=t.lsp.CodeLensProvider)===null||s===void 0?void 0:s.provideCodeLens(n,i,o)},e))}function VI(r,e){var t;let n=e.lsp.WorkspaceSymbolProvider;if(n){r.onWorkspaceSymbol(async(o,s)=>{try{return await n.getSymbols(o,s)}catch(a){return Ds(a)}});let i=(t=n.resolveSymbol)===null||t===void 0?void 0:t.bind(n);i&&r.onWorkspaceSymbolResolve(async(o,s)=>{try{return await i(o,s)}catch(a){return Ds(a)}})}}function zI(r,e){r.languages.callHierarchy.onPrepare(Oi((t,n,i,o)=>{var s;return t.lsp.CallHierarchyProvider&&(s=t.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&s!==void 0?s:null},e)),r.languages.callHierarchy.onIncomingCalls(uR((t,n,i)=>{var o;return t.lsp.CallHierarchyProvider&&(o=t.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),r.languages.callHierarchy.onOutgoingCalls(uR((t,n,i)=>{var o;return t.lsp.CallHierarchyProvider&&(o=t.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}function uR(r,e){let t=e.ServiceRegistry;return async(n,i)=>{let o=Qt.parse(n.item.uri),s=t.getServices(o);if(!s){let a=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(a),new Error(a)}try{return await r(s,n,i)}catch(a){return Ds(a)}}}function Oi(r,e){let t=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Qt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)throw console.error(`Could not find service instance for uri: '${s.toString()}'`),new Error;let c=t.getOrCreateDocument(s);if(!c)throw new Error;try{return await r(a,c,i,o)}catch(l){return Ds(l)}}}function cr(r,e){let t=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Qt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)return console.error(`Could not find service instance for uri: '${s.toString()}'`),null;let c=t.getOrCreateDocument(s);if(!c)return null;try{return await r(a,c,i,o)}catch(l){return Ds(l)}}}function Ds(r){if(wo(r))return new Qr.ResponseError(Qr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(r instanceof Qr.ResponseError)return r;throw r}var Ju=de(Ae(),1),Yu=class{getSymbolKind(){return Ju.SymbolKind.Field}getCompletionItemKind(){return Ju.CompletionItemKind.Reference}};var dR=de(Ae(),1);var Qu=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,t){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=Dt(n,e.textDocument.offsetAt(t.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,t,e):[]}getReferences(e,t,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:t.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(dR.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};var pR=de(Ae(),1);var Zu=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,t){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(t.position),s=Dt(i,o,this.grammarConfig.nameRegexp);if(!s)return;let a=this.references.findDeclaration(s);if(!a)return;let c={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,c).forEach(u=>{let f=pR.TextEdit.replace(u.segment.range,t.newName),m=u.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,t){return this.renameNodeRange(e,t.position)}renameNodeRange(e,t){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(t);if(n&&i){let o=Dt(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&ac(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var XI=de(Ae(),1);var mR=de(Ae(),1);var ef=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,t=mR.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await Ze(t),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let t=e.nameSegment;if(t)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:t.range,uri:e.documentUri.toString()}}}};var tf=class extends Ps{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,t){var n,i,o,s,a,c;let l="path";if(eu(e.astNode)&&((n=Is(e))===null||n===void 0?void 0:n.feature)===l){let u=ci(this.documents,e.astNode);if(u?.$document){let f=(i=this.findTargetObject(u))!==null&&i!==void 0?i:u,m=(s=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&s!==void 0?s:Rc.Range.create(0,0,0,0),T=(c=(a=f.$cstNode)===null||a===void 0?void 0:a.range)!==null&&c!==void 0?c:Rc.Range.create(0,0,0,0);return[Rc.LocationLink.create(u.$document.uri.toString(),T,m,e.range)]}return}return super.collectLocationLinks(e,t)}findTargetObject(e){return e.isDeclared?e:_i(e).head()}};var jh=de(Ae(),1);var rf=class extends Gu{getIncomingCalls(e,t){if(!B(e))return;let n=new Map;if(t.forEach(i=>{let s=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!s.$cstNode)return;let a=Ar(s.$cstNode,i.segment.offset);if(!a)return;let c=Ie(a.astNode,B);if(!c||!c.$cstNode)return;let l=this.nameProvider.getNameNode(c);if(!l)return;let u=i.sourceUri.toString(),f=u+"@"+l.text;n.has(f)?n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,a],docUri:u}):n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[a],docUri:u})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:jh.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!B(e))return;let t=Qe(e).filter(_e).toArray(),n=new Map;if(t.forEach(i=>{var o;let s=i.$cstNode;if(!s)return;let a=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!a)return;let c=this.nameProvider.getNameNode(a.astNode);if(!c)return;let l=ne(a.astNode).uri.toString(),u=l+"@"+c.text;n.has(u)?n.set(u,{refCstNode:a,to:c,from:[...n.get(u).from,s.range],docUri:l}):n.set(u,{refCstNode:a,to:c,from:[s.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:jh.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};var nf=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let t=Wx(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(t),typeToSuperProperties:this.collectSuperProperties(t)}}collectValidationInfo({astResources:e,inferred:t,declared:n}){let i=new Map,o=YI(e);for(let a of du(t))i.set(a.name,{inferred:a,inferredNodes:o.get(a.name)});let s=ie(e.interfaces).concat(e.types).reduce((a,c)=>a.set(c.name,c),new Map);for(let a of du(n)){let c=s.get(a.name);if(c){let l=i.get(a.name);i.set(a.name,Object.assign(Object.assign({},l??{}),{declared:a,declaredNode:c}))}}return i}collectSuperProperties({inferred:e,declared:t}){let n=new Map,i=fh(e,t),o=new Map(i.map(s=>[s.name,s]));for(let s of fh(e,t))n.set(s.name,this.addSuperProperties(s,o,new Set));return n}addSuperProperties(e,t,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let s=t.get(o.name);s&&i.push(...this.addSuperProperties(s,t,n))}return i}};function YI({parserRules:r,datatypeRules:e}){let t=new Le;ie(r).concat(e).forEach(i=>t.add(Co(i),i));function n(i){if(Ne(i)){let o=bs(i);o&&t.add(o,i)}(Dr(i)||qt(i)||Or(i))&&i.elements.forEach(o=>n(o))}return r.forEach(i=>n(i.definition)),t}function hR(r){return r&&"declared"in r}function gR(r){return r&&"inferred"in r}function yR(r){return r&&"inferred"in r&&"declared"in r}function vR(r){let e=r.validation.ValidationRegistry,t=r.validation.LangiumGrammarTypesValidator,n={Action:[t.checkActionIsNotUnionType],Grammar:[t.checkDeclaredTypesConsistency,t.checkDeclaredAndInferredTypesConsistency],Interface:[t.checkCyclicInterface],Type:[t.checkCyclicType]};e.register(n,t)}var of=class{checkCyclicType(e,t){Li(e,new Set)&&t("error",`Type alias '${e.name}' circularly references itself.`,{node:e,property:"name"})}checkCyclicInterface(e,t){Li(e,new Set)&&t("error",`Type '${e.name}' recursively references itself as a base type.`,{node:e,property:"name"})}checkDeclaredTypesConsistency(e,t){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if(hR(o)&&mn(o.declared)&&wr(o.declaredNode)){let s=o;QI(s,t),ZI(s,t)}}}checkDeclaredAndInferredTypesConsistency(e,t){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())gR(o)&&o.inferred instanceof ps&&JI(o.inferred,t),yR(o)&&rP(o,i,t)}checkActionIsNotUnionType(e,t){Ft(e.type)&&t("error","Actions cannot create union types.",{node:e,property:"type"})}};function Li(r,e){var t;if(e.has(r))return!0;if(e.add(r),Ft(r))return Li(r.type,e);if(wr(r))return r.superTypes.some(n=>n.ref&&Li(n.ref,new Set(e)));if(sr(r)){if(!((t=r.typeRef)===null||t===void 0)&&t.ref)return Li(r.typeRef.ref,e)}else{if(xo(r))return Li(r.referenceType,e);if(vo(r))return Li(r.elementType,e);if(zr(r))return r.types.some(n=>Li(n,new Set(e)))}return!1}function JI(r,e){r.properties.forEach(t=>{var n;let i=ch(t.type);if(i.length>1){let o=a=>ii(a)?"ref":"other",s=o(i[0]);if(i.slice(1).some(a=>o(a)!==s)){let a=(n=t.astNodes.values().next())===null||n===void 0?void 0:n.value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${t.name}" into two or more different properties.`,{node:a})}}})}function QI({declared:r,declaredNode:e},t){Array.from(r.superTypes).forEach((n,i)=>{n&&(dn(n)&&t("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||t("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function ZI({declared:r,declaredNode:e},t){let n=r.properties.reduce((s,a)=>s.add(a.name,a),new Le);for(let[s,a]of n.entriesGroupedByKey())if(a.length>1)for(let c of a)t("error",`Cannot have two properties with the same name '${s}'.`,{node:Array.from(c.astNodes)[0],property:"name"});let i=Array.from(r.superTypes);for(let s=0;s<i.length;s++)for(let a=s+1;a<i.length;a++){let c=i[s],l=i[a],u=mn(c)?c.superProperties:[],f=mn(l)?l.superProperties:[],m=eP(u,f);m.length>0&&t("error",`Cannot simultaneously inherit from '${c}' and '${l}'. Their ${m.map(T=>"'"+T+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let s of i){let a=mn(s)?s.superProperties:[];for(let c of a)o.add(c.name)}for(let s of r.properties)if(o.has(s.name)){let a=e.attributes.find(c=>c.name===s.name);a&&t("error",`Cannot redeclare property '${s.name}'. It is already inherited from another interface.`,{node:a,property:"name"})}}function eP(r,e){let t=[];for(let n of r){let i=e.find(o=>o.name===n.name);i&&!tP(n,i)&&t.push(n.name)}return t}function tP(r,e){return oc(r.type,e.type)&&oc(e.type,r.type)}function rP(r,e,t){let{inferred:n,declared:i,declaredNode:o,inferredNodes:s}=r,a=i.name,c=f=>m=>s.forEach(T=>t("error",`${m}${f?` ${f}`:""}.`,T?.inferredType?{node:T?.inferredType,property:"name"}:{node:T,property:Ne(T)?"type":"name"})),l=(f,m)=>f.forEach(T=>t("error",m,{node:T,property:Re(T)||Ne(T)?"feature":"name"})),u=f=>{s.forEach(m=>{B(m)&&xs(m.definition).find(A=>A.feature===f)===void 0&&t("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${a}'.`,{node:m,property:"parameters"})})};if(dn(n)&&dn(i))nP(n.type,i.type,c(`in a rule that returns type '${a}'`));else if(mn(n)&&mn(i))iP(n,i,e,c(`in a rule that returns type '${a}'`),l,u);else{let f=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;c()(f),t("error",f,{node:o,property:"name"})}}function nP(r,e,t){oc(r,e)||t(`Cannot assign type '${pn(r,"DeclaredType")}' to '${pn(e,"DeclaredType")}'`)}function TR(r){return r.optional||uu(r.type)}function iP(r,e,t,n,i,o){let s=new Set(r.properties.map(f=>f.name)),a=new Map(r.allProperties.map(f=>[f.name,f])),c=new Map(e.superProperties.map(f=>[f.name,f])),l=f=>{if(Ot(f))return{types:f.types.map(m=>l(m))};if(ii(f))return{referenceType:l(f.referenceType)};if(oi(f))return{elementType:l(f.elementType)};if(Lr(f)){let m=t.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of a.entries()){let T=c.get(f);if(T){let A=pn(m.type,"DeclaredType"),S=pn(T.type,"DeclaredType");if(!oc(l(m.type),T.type)&&S!=="unknown"){let C=`The assigned type '${A}' is not compatible with the declared property '${f}' of type '${S}'.`;i(m.astNodes,C)}m.optional&&!TR(T)&&o(f)}else s.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let u=new Set;for(let[f,m]of c.entries())!a.get(f)&&!TR(m)&&u.add(f);if(u.size>0){let f=u.size>1?"Properties":"A property",m=u.size>1?"are expected":"is expected",T=Array.from(u).map(A=>`'${A}'`).sort().join(", ");n(`${f} ${T} ${m}.`)}}var oP={validation:{LangiumGrammarValidator:r=>new xu(r),ValidationResourcesCollector:r=>new nf(r),LangiumGrammarTypesValidator:()=>new of},lsp:{FoldingRangeProvider:r=>new Pu(r),CodeActionProvider:r=>new Eu(r),SemanticTokenProvider:r=>new Fu(r),Formatter:()=>new Lu,DefinitionProvider:r=>new tf(r),CallHierarchyProvider:r=>new rf(r),CompletionProvider:r=>new Iu(r)},references:{ScopeComputation:r=>new Cu(r),ScopeProvider:r=>new Su(r),References:r=>new Uu(r),NameProvider:()=>new qu}};function xR(r,e){let t=yo(Ac(r),Vx,e),n=yo(bc({shared:t}),zx,oP);return sP(t,n),t.ServiceRegistry.register(n),Nx(n),vR(n),{shared:t,grammar:n}}function sP(r,e){r.workspace.DocumentBuilder.onBuildPhase(je.IndexedReferences,async(n,i)=>{for(let o of n){await Ze(i);let s=e.validation.ValidationResourcesCollector,a=o.parseResult.value;o.validationResources=s.collectValidationResources(a)}})}var Hh=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}},Mi={fileSystemProvider:()=>new Hh};function _u(r){return r.rules.find(e=>B(e)&&e.entry)}function aP(r){return r.rules.filter(e=>we(e)&&e.hidden)}function vs(r,e){let t=new Set,n=_u(r);if(!n)return new Set(r.rules);let i=[n].concat(aP(r));for(let s of i)RR(s,t,e);let o=new Set;for(let s of r.rules)(t.has(s.name)||we(s)&&s.hidden)&&o.add(s);return o}function RR(r,e,t){e.add(r.name),Qe(r).forEach(n=>{if(_e(n)||t&&nu(n)){let i=n.rule.ref;i&&!e.has(i.name)&&RR(i,e,t)}})}function Nu(r){if(r.terminal)return r.terminal;if(r.type.ref){let e=gc(r.type.ref);return e?.terminal}}function bR(r){return r.hidden&&!Jr(r).test(" ")}function Ii(r,e){return!r||!e?[]:Bh(r,e,r.astNode,!0)}function Jt(r,e,t){if(!r||!e)return;let n=Bh(r,e,r.astNode,!0);if(n.length!==0)return t!==void 0?t=Math.max(0,Math.min(t,n.length-1)):t=0,n[t]}function Bh(r,e,t,n){if(!n){let i=Ie(r.grammarSource,Re);if(i&&i.feature===e)return[r]}return $n(r)&&r.astNode===t?r.content.flatMap(i=>Bh(i,e,t,!1)):[]}function Ou(r,e){return r?AR(r,e,r?.astNode):[]}function Xr(r,e,t){if(!r)return;let n=AR(r,e,r?.astNode);if(n.length!==0)return t!==void 0?t=Math.max(0,Math.min(t,n.length-1)):t=0,n[t]}function AR(r,e,t){if(r.astNode!==t)return[];if(mt(r.grammarSource)&&r.grammarSource.value===e)return[r];let n=zm(r).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===t?mt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function Is(r){var e;let t=r.astNode;for(;t===((e=r.container)===null||e===void 0?void 0:e.astNode);){let n=Ie(r.grammarSource,Re);if(n)return n;r=r.container}}function gc(r){return as(r)&&(r=r.$container),wR(r,new Map)}function wR(r,e){var t;function n(i,o){let s;return Ie(i,Re)||(s=wR(o,e)),e.set(r,s),s}if(e.has(r))return e.get(r);e.set(r,void 0);for(let i of Qe(r)){if(Re(i)&&i.feature.toLowerCase()==="name")return e.set(r,i),i;if(_e(i)&&B(i.rule.ref))return n(i,i.rule.ref);if(sr(i)&&(!((t=i.typeRef)===null||t===void 0)&&t.ref))return n(i,i.typeRef.ref)}}function gu(r){var e;let t=xR(Mi).grammar,n=t.serializer.JsonSerializer.deserialize(r);return t.shared.workspace.LangiumDocumentFactory.fromModel(n,Qt.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}function SR(r){let e=[],t=r.Grammar;for(let n of t.rules)we(n)&&bR(n)&&xx(Jr(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:Xm}}var cP=typeof global=="object"&&global&&global.Object===Object&&global,sf=cP;var lP=typeof self=="object"&&self&&self.Object===Object&&self,uP=sf||lP||Function("return this")(),Nt=uP;var fP=Nt.Symbol,Ut=fP;var CR=Object.prototype,dP=CR.hasOwnProperty,pP=CR.toString,wc=Ut?Ut.toStringTag:void 0;function mP(r){var e=dP.call(r,wc),t=r[wc];try{r[wc]=void 0;var n=!0}catch{}var i=pP.call(r);return n&&(e?r[wc]=t:delete r[wc]),i}var kR=mP;var hP=Object.prototype,gP=hP.toString;function yP(r){return gP.call(r)}var ER=yP;var TP="[object Null]",vP="[object Undefined]",$R=Ut?Ut.toStringTag:void 0;function xP(r){return r==null?r===void 0?vP:TP:$R&&$R in Object(r)?kR(r):ER(r)}var gr=xP;function RP(r){return r!=null&&typeof r=="object"}var Tt=RP;var bP="[object Symbol]";function AP(r){return typeof r=="symbol"||Tt(r)&&gr(r)==bP}var Pn=AP;function wP(r,e){for(var t=-1,n=r==null?0:r.length,i=Array(n);++t<n;)i[t]=e(r[t],t,r);return i}var Dn=wP;var SP=Array.isArray,V=SP;var CP=1/0,NR=Ut?Ut.prototype:void 0,_R=NR?NR.toString:void 0;function IR(r){if(typeof r=="string")return r;if(V(r))return Dn(r,IR)+"";if(Pn(r))return _R?_R.call(r):"";var e=r+"";return e=="0"&&1/r==-CP?"-0":e}var PR=IR;var kP=/\s/;function EP(r){for(var e=r.length;e--&&kP.test(r.charAt(e)););return e}var DR=EP;var $P=/^\s+/;function NP(r){return r&&r.slice(0,DR(r)+1).replace($P,"")}var OR=NP;function _P(r){var e=typeof r;return r!=null&&(e=="object"||e=="function")}var at=_P;var LR=0/0,IP=/^[-+]0x[0-9a-f]+$/i,PP=/^0b[01]+$/i,DP=/^0o[0-7]+$/i,OP=parseInt;function LP(r){if(typeof r=="number")return r;if(Pn(r))return LR;if(at(r)){var e=typeof r.valueOf=="function"?r.valueOf():r;r=at(e)?e+"":e}if(typeof r!="string")return r===0?r:+r;r=OR(r);var t=PP.test(r);return t||DP.test(r)?OP(r.slice(2),t?2:8):IP.test(r)?LR:+r}var MR=LP;var FR=1/0,MP=17976931348623157e292;function FP(r){if(!r)return r===0?r:0;if(r=MR(r),r===FR||r===-FR){var e=r<0?-1:1;return e*MP}return r===r?r:0}var qR=FP;function qP(r){var e=qR(r),t=e%1;return e===e?t?e-t:e:0}var On=qP;function UP(r){return r}var Sr=UP;var GP="[object AsyncFunction]",jP="[object Function]",HP="[object GeneratorFunction]",BP="[object Proxy]";function KP(r){if(!at(r))return!1;var e=gr(r);return e==jP||e==HP||e==GP||e==BP}var yr=KP;var WP=Nt["__core-js_shared__"],af=WP;var UR=function(){var r=/[^.]+$/.exec(af&&af.keys&&af.keys.IE_PROTO||"");return r?"Symbol(src)_1."+r:""}();function VP(r){return!!UR&&UR in r}var GR=VP;var zP=Function.prototype,XP=zP.toString;function YP(r){if(r!=null){try{return XP.call(r)}catch{}try{return r+""}catch{}}return""}var fi=YP;var JP=/[\\^$.*+?()[\]{}|]/g,QP=/^\[object .+?Constructor\]$/,ZP=Function.prototype,e0=Object.prototype,t0=ZP.toString,r0=e0.hasOwnProperty,n0=RegExp("^"+t0.call(r0).replace(JP,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function i0(r){if(!at(r)||GR(r))return!1;var e=yr(r)?n0:QP;return e.test(fi(r))}var jR=i0;function o0(r,e){return r?.[e]}var HR=o0;function s0(r,e){var t=HR(r,e);return jR(t)?t:void 0}var Cr=s0;var a0=Cr(Nt,"WeakMap"),cf=a0;var BR=Object.create,c0=function(){function r(){}return function(e){if(!at(e))return{};if(BR)return BR(e);r.prototype=e;var t=new r;return r.prototype=void 0,t}}(),KR=c0;function l0(r,e,t){switch(t.length){case 0:return r.call(e);case 1:return r.call(e,t[0]);case 2:return r.call(e,t[0],t[1]);case 3:return r.call(e,t[0],t[1],t[2])}return r.apply(e,t)}var WR=l0;function u0(){}var ct=u0;function f0(r,e){var t=-1,n=r.length;for(e||(e=Array(n));++t<n;)e[t]=r[t];return e}var VR=f0;var d0=800,p0=16,m0=Date.now;function h0(r){var e=0,t=0;return function(){var n=m0(),i=p0-(n-t);if(t=n,i>0){if(++e>=d0)return arguments[0]}else e=0;return r.apply(void 0,arguments)}}var zR=h0;function g0(r){return function(){return r}}var XR=g0;var y0=function(){try{var r=Cr(Object,"defineProperty");return r({},"",{}),r}catch{}}(),Os=y0;var T0=Os?function(r,e){return Os(r,"toString",{configurable:!0,enumerable:!1,value:XR(e),writable:!0})}:Sr,YR=T0;var v0=zR(YR),JR=v0;function x0(r,e){for(var t=-1,n=r==null?0:r.length;++t<n&&e(r[t],t,r)!==!1;);return r}var lf=x0;function R0(r,e,t,n){for(var i=r.length,o=t+(n?1:-1);n?o--:++o<i;)if(e(r[o],o,r))return o;return-1}var uf=R0;function b0(r){return r!==r}var QR=b0;function A0(r,e,t){for(var n=t-1,i=r.length;++n<i;)if(r[n]===e)return n;return-1}var ZR=A0;function w0(r,e,t){return e===e?ZR(r,e,t):uf(r,QR,t)}var Ls=w0;function S0(r,e){var t=r==null?0:r.length;return!!t&&Ls(r,e,0)>-1}var ff=S0;var C0=9007199254740991,k0=/^(?:0|[1-9]\d*)$/;function E0(r,e){var t=typeof r;return e=e??C0,!!e&&(t=="number"||t!="symbol"&&k0.test(r))&&r>-1&&r%1==0&&r<e}var Fi=E0;function $0(r,e,t){e=="__proto__"&&Os?Os(r,e,{configurable:!0,enumerable:!0,value:t,writable:!0}):r[e]=t}var Ms=$0;function N0(r,e){return r===e||r!==r&&e!==e}var Ln=N0;var _0=Object.prototype,I0=_0.hasOwnProperty;function P0(r,e,t){var n=r[e];(!(I0.call(r,e)&&Ln(n,t))||t===void 0&&!(e in r))&&Ms(r,e,t)}var qi=P0;function D0(r,e,t,n){var i=!t;t||(t={});for(var o=-1,s=e.length;++o<s;){var a=e[o],c=n?n(t[a],r[a],a,t,r):void 0;c===void 0&&(c=r[a]),i?Ms(t,a,c):qi(t,a,c)}return t}var Mn=D0;var eb=Math.max;function O0(r,e,t){return e=eb(e===void 0?r.length-1:e,0),function(){for(var n=arguments,i=-1,o=eb(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=t(s),WR(r,this,a)}}var tb=O0;function L0(r,e){return JR(tb(r,e,Sr),r+"")}var Fs=L0;var M0=9007199254740991;function F0(r){return typeof r=="number"&&r>-1&&r%1==0&&r<=M0}var qs=F0;function q0(r){return r!=null&&qs(r.length)&&!yr(r)}var _t=q0;function U0(r,e,t){if(!at(t))return!1;var n=typeof e;return(n=="number"?_t(t)&&Fi(e,t.length):n=="string"&&e in t)?Ln(t[e],r):!1}var Ui=U0;function G0(r){return Fs(function(e,t){var n=-1,i=t.length,o=i>1?t[i-1]:void 0,s=i>2?t[2]:void 0;for(o=r.length>3&&typeof o=="function"?(i--,o):void 0,s&&Ui(t[0],t[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=t[n];a&&r(e,a,n,o)}return e})}var rb=G0;var j0=Object.prototype;function H0(r){var e=r&&r.constructor,t=typeof e=="function"&&e.prototype||j0;return r===t}var Fn=H0;function B0(r,e){for(var t=-1,n=Array(r);++t<r;)n[t]=e(t);return n}var nb=B0;var K0="[object Arguments]";function W0(r){return Tt(r)&&gr(r)==K0}var Kh=W0;var ib=Object.prototype,V0=ib.hasOwnProperty,z0=ib.propertyIsEnumerable,X0=Kh(function(){return arguments}())?Kh:function(r){return Tt(r)&&V0.call(r,"callee")&&!z0.call(r,"callee")},Gi=X0;function Y0(){return!1}var ob=Y0;var cb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,sb=cb&&typeof module=="object"&&module&&!module.nodeType&&module,J0=sb&&sb.exports===cb,ab=J0?Nt.Buffer:void 0,Q0=ab?ab.isBuffer:void 0,Z0=Q0||ob,di=Z0;var eD="[object Arguments]",tD="[object Array]",rD="[object Boolean]",nD="[object Date]",iD="[object Error]",oD="[object Function]",sD="[object Map]",aD="[object Number]",cD="[object Object]",lD="[object RegExp]",uD="[object Set]",fD="[object String]",dD="[object WeakMap]",pD="[object ArrayBuffer]",mD="[object DataView]",hD="[object Float32Array]",gD="[object Float64Array]",yD="[object Int8Array]",TD="[object Int16Array]",vD="[object Int32Array]",xD="[object Uint8Array]",RD="[object Uint8ClampedArray]",bD="[object Uint16Array]",AD="[object Uint32Array]",Ye={};Ye[hD]=Ye[gD]=Ye[yD]=Ye[TD]=Ye[vD]=Ye[xD]=Ye[RD]=Ye[bD]=Ye[AD]=!0;Ye[eD]=Ye[tD]=Ye[pD]=Ye[rD]=Ye[mD]=Ye[nD]=Ye[iD]=Ye[oD]=Ye[sD]=Ye[aD]=Ye[cD]=Ye[lD]=Ye[uD]=Ye[fD]=Ye[dD]=!1;function wD(r){return Tt(r)&&qs(r.length)&&!!Ye[gr(r)]}var lb=wD;function SD(r){return function(e){return r(e)}}var qn=SD;var ub=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Sc=ub&&typeof module=="object"&&module&&!module.nodeType&&module,CD=Sc&&Sc.exports===ub,Wh=CD&&sf.process,kD=function(){try{var r=Sc&&Sc.require&&Sc.require("util").types;return r||Wh&&Wh.binding&&Wh.binding("util")}catch{}}(),Zr=kD;var fb=Zr&&Zr.isTypedArray,ED=fb?qn(fb):lb,Us=ED;var $D=Object.prototype,ND=$D.hasOwnProperty;function _D(r,e){var t=V(r),n=!t&&Gi(r),i=!t&&!n&&di(r),o=!t&&!n&&!i&&Us(r),s=t||n||i||o,a=s?nb(r.length,String):[],c=a.length;for(var l in r)(e||ND.call(r,l))&&!(s&&(l=="length"||i&&(l=="offset"||l=="parent")||o&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||Fi(l,c)))&&a.push(l);return a}var df=_D;function ID(r,e){return function(t){return r(e(t))}}var pf=ID;var PD=pf(Object.keys,Object),db=PD;var DD=Object.prototype,OD=DD.hasOwnProperty;function LD(r){if(!Fn(r))return db(r);var e=[];for(var t in Object(r))OD.call(r,t)&&t!="constructor"&&e.push(t);return e}var mf=LD;function MD(r){return _t(r)?df(r):mf(r)}var He=MD;var FD=Object.prototype,qD=FD.hasOwnProperty,UD=rb(function(r,e){if(Fn(e)||_t(e)){Mn(e,He(e),r);return}for(var t in e)qD.call(e,t)&&qi(r,t,e[t])}),Zt=UD;function GD(r){var e=[];if(r!=null)for(var t in Object(r))e.push(t);return e}var pb=GD;var jD=Object.prototype,HD=jD.hasOwnProperty;function BD(r){if(!at(r))return pb(r);var e=Fn(r),t=[];for(var n in r)n=="constructor"&&(e||!HD.call(r,n))||t.push(n);return t}var mb=BD;function KD(r){return _t(r)?df(r,!0):mb(r)}var ji=KD;var WD=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,VD=/^\w*$/;function zD(r,e){if(V(r))return!1;var t=typeof r;return t=="number"||t=="symbol"||t=="boolean"||r==null||Pn(r)?!0:VD.test(r)||!WD.test(r)||e!=null&&r in Object(e)}var Gs=zD;var XD=Cr(Object,"create"),pi=XD;function YD(){this.__data__=pi?pi(null):{},this.size=0}var hb=YD;function JD(r){var e=this.has(r)&&delete this.__data__[r];return this.size-=e?1:0,e}var gb=JD;var QD="__lodash_hash_undefined__",ZD=Object.prototype,eO=ZD.hasOwnProperty;function tO(r){var e=this.__data__;if(pi){var t=e[r];return t===QD?void 0:t}return eO.call(e,r)?e[r]:void 0}var yb=tO;var rO=Object.prototype,nO=rO.hasOwnProperty;function iO(r){var e=this.__data__;return pi?e[r]!==void 0:nO.call(e,r)}var Tb=iO;var oO="__lodash_hash_undefined__";function sO(r,e){var t=this.__data__;return this.size+=this.has(r)?0:1,t[r]=pi&&e===void 0?oO:e,this}var vb=sO;function js(r){var e=-1,t=r==null?0:r.length;for(this.clear();++e<t;){var n=r[e];this.set(n[0],n[1])}}js.prototype.clear=hb;js.prototype.delete=gb;js.prototype.get=yb;js.prototype.has=Tb;js.prototype.set=vb;var Vh=js;function aO(){this.__data__=[],this.size=0}var xb=aO;function cO(r,e){for(var t=r.length;t--;)if(Ln(r[t][0],e))return t;return-1}var Hi=cO;var lO=Array.prototype,uO=lO.splice;function fO(r){var e=this.__data__,t=Hi(e,r);if(t<0)return!1;var n=e.length-1;return t==n?e.pop():uO.call(e,t,1),--this.size,!0}var Rb=fO;function dO(r){var e=this.__data__,t=Hi(e,r);return t<0?void 0:e[t][1]}var bb=dO;function pO(r){return Hi(this.__data__,r)>-1}var Ab=pO;function mO(r,e){var t=this.__data__,n=Hi(t,r);return n<0?(++this.size,t.push([r,e])):t[n][1]=e,this}var wb=mO;function Hs(r){var e=-1,t=r==null?0:r.length;for(this.clear();++e<t;){var n=r[e];this.set(n[0],n[1])}}Hs.prototype.clear=xb;Hs.prototype.delete=Rb;Hs.prototype.get=bb;Hs.prototype.has=Ab;Hs.prototype.set=wb;var Bi=Hs;var hO=Cr(Nt,"Map"),Ki=hO;function gO(){this.size=0,this.__data__={hash:new Vh,map:new(Ki||Bi),string:new Vh}}var Sb=gO;function yO(r){var e=typeof r;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?r!=="__proto__":r===null}var Cb=yO;function TO(r,e){var t=r.__data__;return Cb(e)?t[typeof e=="string"?"string":"hash"]:t.map}var Wi=TO;function vO(r){var e=Wi(this,r).delete(r);return this.size-=e?1:0,e}var kb=vO;function xO(r){return Wi(this,r).get(r)}var Eb=xO;function RO(r){return Wi(this,r).has(r)}var $b=RO;function bO(r,e){var t=Wi(this,r),n=t.size;return t.set(r,e),this.size+=t.size==n?0:1,this}var Nb=bO;function Bs(r){var e=-1,t=r==null?0:r.length;for(this.clear();++e<t;){var n=r[e];this.set(n[0],n[1])}}Bs.prototype.clear=Sb;Bs.prototype.delete=kb;Bs.prototype.get=Eb;Bs.prototype.has=$b;Bs.prototype.set=Nb;var $o=Bs;var AO="Expected a function";function zh(r,e){if(typeof r!="function"||e!=null&&typeof e!="function")throw new TypeError(AO);var t=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=t.cache;if(o.has(i))return o.get(i);var s=r.apply(this,n);return t.cache=o.set(i,s)||o,s};return t.cache=new(zh.Cache||$o),t}zh.Cache=$o;var _b=zh;var wO=500;function SO(r){var e=_b(r,function(n){return t.size===wO&&t.clear(),n}),t=e.cache;return e}var Ib=SO;var CO=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,kO=/\\(\\)?/g,EO=Ib(function(r){var e=[];return r.charCodeAt(0)===46&&e.push(""),r.replace(CO,function(t,n,i,o){e.push(i?o.replace(kO,"$1"):n||t)}),e}),Pb=EO;function $O(r){return r==null?"":PR(r)}var Db=$O;function NO(r,e){return V(r)?r:Gs(r,e)?[r]:Pb(Db(r))}var Vi=NO;var _O=1/0;function IO(r){if(typeof r=="string"||Pn(r))return r;var e=r+"";return e=="0"&&1/r==-_O?"-0":e}var Un=IO;function PO(r,e){e=Vi(e,r);for(var t=0,n=e.length;r!=null&&t<n;)r=r[Un(e[t++])];return t&&t==n?r:void 0}var Ks=PO;function DO(r,e,t){var n=r==null?void 0:Ks(r,e);return n===void 0?t:n}var Ob=DO;function OO(r,e){for(var t=-1,n=e.length,i=r.length;++t<n;)r[i+t]=e[t];return r}var Ws=OO;var Lb=Ut?Ut.isConcatSpreadable:void 0;function LO(r){return V(r)||Gi(r)||!!(Lb&&r&&r[Lb])}var Mb=LO;function Fb(r,e,t,n,i){var o=-1,s=r.length;for(t||(t=Mb),i||(i=[]);++o<s;){var a=r[o];e>0&&t(a)?e>1?Fb(a,e-1,t,n,i):Ws(i,a):n||(i[i.length]=a)}return i}var Vs=Fb;function MO(r){var e=r==null?0:r.length;return e?Vs(r,1):[]}var vt=MO;var FO=pf(Object.getPrototypeOf,Object),hf=FO;function qO(r,e,t){var n=-1,i=r.length;e<0&&(e=-e>i?0:i+e),t=t>i?i:t,t<0&&(t+=i),i=e>t?0:t-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=r[n+e];return o}var gf=qO;function UO(r,e,t,n){var i=-1,o=r==null?0:r.length;for(n&&o&&(t=r[++i]);++i<o;)t=e(t,r[i],i,r);return t}var qb=UO;function GO(){this.__data__=new Bi,this.size=0}var Ub=GO;function jO(r){var e=this.__data__,t=e.delete(r);return this.size=e.size,t}var Gb=jO;function HO(r){return this.__data__.get(r)}var jb=HO;function BO(r){return this.__data__.has(r)}var Hb=BO;var KO=200;function WO(r,e){var t=this.__data__;if(t instanceof Bi){var n=t.__data__;if(!Ki||n.length<KO-1)return n.push([r,e]),this.size=++t.size,this;t=this.__data__=new $o(n)}return t.set(r,e),this.size=t.size,this}var Bb=WO;function zs(r){var e=this.__data__=new Bi(r);this.size=e.size}zs.prototype.clear=Ub;zs.prototype.delete=Gb;zs.prototype.get=jb;zs.prototype.has=Hb;zs.prototype.set=Bb;var zi=zs;function VO(r,e){return r&&Mn(e,He(e),r)}var Kb=VO;function zO(r,e){return r&&Mn(e,ji(e),r)}var Wb=zO;var Yb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Vb=Yb&&typeof module=="object"&&module&&!module.nodeType&&module,XO=Vb&&Vb.exports===Yb,zb=XO?Nt.Buffer:void 0,Xb=zb?zb.allocUnsafe:void 0;function YO(r,e){if(e)return r.slice();var t=r.length,n=Xb?Xb(t):new r.constructor(t);return r.copy(n),n}var Jb=YO;function JO(r,e){for(var t=-1,n=r==null?0:r.length,i=0,o=[];++t<n;){var s=r[t];e(s,t,r)&&(o[i++]=s)}return o}var Xs=JO;function QO(){return[]}var yf=QO;var ZO=Object.prototype,eL=ZO.propertyIsEnumerable,Qb=Object.getOwnPropertySymbols,tL=Qb?function(r){return r==null?[]:(r=Object(r),Xs(Qb(r),function(e){return eL.call(r,e)}))}:yf,Ys=tL;function rL(r,e){return Mn(r,Ys(r),e)}var Zb=rL;var nL=Object.getOwnPropertySymbols,iL=nL?function(r){for(var e=[];r;)Ws(e,Ys(r)),r=hf(r);return e}:yf,Tf=iL;function oL(r,e){return Mn(r,Tf(r),e)}var eA=oL;function sL(r,e,t){var n=e(r);return V(r)?n:Ws(n,t(r))}var vf=sL;function aL(r){return vf(r,He,Ys)}var Cc=aL;function cL(r){return vf(r,ji,Tf)}var xf=cL;var lL=Cr(Nt,"DataView"),Rf=lL;var uL=Cr(Nt,"Promise"),bf=uL;var fL=Cr(Nt,"Set"),Xi=fL;var tA="[object Map]",dL="[object Object]",rA="[object Promise]",nA="[object Set]",iA="[object WeakMap]",oA="[object DataView]",pL=fi(Rf),mL=fi(Ki),hL=fi(bf),gL=fi(Xi),yL=fi(cf),No=gr;(Rf&&No(new Rf(new ArrayBuffer(1)))!=oA||Ki&&No(new Ki)!=tA||bf&&No(bf.resolve())!=rA||Xi&&No(new Xi)!=nA||cf&&No(new cf)!=iA)&&(No=function(r){var e=gr(r),t=e==dL?r.constructor:void 0,n=t?fi(t):"";if(n)switch(n){case pL:return oA;case mL:return tA;case hL:return rA;case gL:return nA;case yL:return iA}return e});var Tn=No;var TL=Object.prototype,vL=TL.hasOwnProperty;function xL(r){var e=r.length,t=new r.constructor(e);return e&&typeof r[0]=="string"&&vL.call(r,"index")&&(t.index=r.index,t.input=r.input),t}var sA=xL;var RL=Nt.Uint8Array,Js=RL;function bL(r){var e=new r.constructor(r.byteLength);return new Js(e).set(new Js(r)),e}var Qs=bL;function AL(r,e){var t=e?Qs(r.buffer):r.buffer;return new r.constructor(t,r.byteOffset,r.byteLength)}var aA=AL;var wL=/\w*$/;function SL(r){var e=new r.constructor(r.source,wL.exec(r));return e.lastIndex=r.lastIndex,e}var cA=SL;var lA=Ut?Ut.prototype:void 0,uA=lA?lA.valueOf:void 0;function CL(r){return uA?Object(uA.call(r)):{}}var fA=CL;function kL(r,e){var t=e?Qs(r.buffer):r.buffer;return new r.constructor(t,r.byteOffset,r.length)}var dA=kL;var EL="[object Boolean]",$L="[object Date]",NL="[object Map]",_L="[object Number]",IL="[object RegExp]",PL="[object Set]",DL="[object String]",OL="[object Symbol]",LL="[object ArrayBuffer]",ML="[object DataView]",FL="[object Float32Array]",qL="[object Float64Array]",UL="[object Int8Array]",GL="[object Int16Array]",jL="[object Int32Array]",HL="[object Uint8Array]",BL="[object Uint8ClampedArray]",KL="[object Uint16Array]",WL="[object Uint32Array]";function VL(r,e,t){var n=r.constructor;switch(e){case LL:return Qs(r);case EL:case $L:return new n(+r);case ML:return aA(r,t);case FL:case qL:case UL:case GL:case jL:case HL:case BL:case KL:case WL:return dA(r,t);case NL:return new n;case _L:case DL:return new n(r);case IL:return cA(r);case PL:return new n;case OL:return fA(r)}}var pA=VL;function zL(r){return typeof r.constructor=="function"&&!Fn(r)?KR(hf(r)):{}}var mA=zL;var XL="[object Map]";function YL(r){return Tt(r)&&Tn(r)==XL}var hA=YL;var gA=Zr&&Zr.isMap,JL=gA?qn(gA):hA,yA=JL;var QL="[object Set]";function ZL(r){return Tt(r)&&Tn(r)==QL}var TA=ZL;var vA=Zr&&Zr.isSet,eM=vA?qn(vA):TA,xA=eM;var tM=1,rM=2,nM=4,RA="[object Arguments]",iM="[object Array]",oM="[object Boolean]",sM="[object Date]",aM="[object Error]",bA="[object Function]",cM="[object GeneratorFunction]",lM="[object Map]",uM="[object Number]",AA="[object Object]",fM="[object RegExp]",dM="[object Set]",pM="[object String]",mM="[object Symbol]",hM="[object WeakMap]",gM="[object ArrayBuffer]",yM="[object DataView]",TM="[object Float32Array]",vM="[object Float64Array]",xM="[object Int8Array]",RM="[object Int16Array]",bM="[object Int32Array]",AM="[object Uint8Array]",wM="[object Uint8ClampedArray]",SM="[object Uint16Array]",CM="[object Uint32Array]",Be={};Be[RA]=Be[iM]=Be[gM]=Be[yM]=Be[oM]=Be[sM]=Be[TM]=Be[vM]=Be[xM]=Be[RM]=Be[bM]=Be[lM]=Be[uM]=Be[AA]=Be[fM]=Be[dM]=Be[pM]=Be[mM]=Be[AM]=Be[wM]=Be[SM]=Be[CM]=!0;Be[aM]=Be[bA]=Be[hM]=!1;function Af(r,e,t,n,i,o){var s,a=e&tM,c=e&rM,l=e&nM;if(t&&(s=i?t(r,n,i,o):t(r)),s!==void 0)return s;if(!at(r))return r;var u=V(r);if(u){if(s=sA(r),!a)return VR(r,s)}else{var f=Tn(r),m=f==bA||f==cM;if(di(r))return Jb(r,a);if(f==AA||f==RA||m&&!i){if(s=c||m?{}:mA(r),!a)return c?eA(r,Wb(s,r)):Zb(r,Kb(s,r))}else{if(!Be[f])return i?r:{};s=pA(r,f,a)}}o||(o=new zi);var T=o.get(r);if(T)return T;o.set(r,s),xA(r)?r.forEach(function(N){s.add(Af(N,e,t,N,r,o))}):yA(r)&&r.forEach(function(N,C){s.set(C,Af(N,e,t,C,r,o))});var A=l?c?xf:Cc:c?ji:He,S=u?void 0:A(r);return lf(S||r,function(N,C){S&&(C=N,N=r[C]),qi(s,C,Af(N,e,t,C,r,o))}),s}var wA=Af;var kM=4;function EM(r){return wA(r,kM)}var Ke=EM;function $M(r){for(var e=-1,t=r==null?0:r.length,n=0,i=[];++e<t;){var o=r[e];o&&(i[n++]=o)}return i}var Gn=$M;var NM="__lodash_hash_undefined__";function _M(r){return this.__data__.set(r,NM),this}var SA=_M;function IM(r){return this.__data__.has(r)}var CA=IM;function wf(r){var e=-1,t=r==null?0:r.length;for(this.__data__=new $o;++e<t;)this.add(r[e])}wf.prototype.add=wf.prototype.push=SA;wf.prototype.has=CA;var Zs=wf;function PM(r,e){for(var t=-1,n=r==null?0:r.length;++t<n;)if(e(r[t],t,r))return!0;return!1}var Sf=PM;function DM(r,e){return r.has(e)}var ea=DM;var OM=1,LM=2;function MM(r,e,t,n,i,o){var s=t&OM,a=r.length,c=e.length;if(a!=c&&!(s&&c>a))return!1;var l=o.get(r),u=o.get(e);if(l&&u)return l==e&&u==r;var f=-1,m=!0,T=t&LM?new Zs:void 0;for(o.set(r,e),o.set(e,r);++f<a;){var A=r[f],S=e[f];if(n)var N=s?n(S,A,f,e,r,o):n(A,S,f,r,e,o);if(N!==void 0){if(N)continue;m=!1;break}if(T){if(!Sf(e,function(C,v){if(!ea(T,v)&&(A===C||i(A,C,t,n,o)))return T.push(v)})){m=!1;break}}else if(!(A===S||i(A,S,t,n,o))){m=!1;break}}return o.delete(r),o.delete(e),m}var Cf=MM;function FM(r){var e=-1,t=Array(r.size);return r.forEach(function(n,i){t[++e]=[i,n]}),t}var kA=FM;function qM(r){var e=-1,t=Array(r.size);return r.forEach(function(n){t[++e]=n}),t}var ta=qM;var UM=1,GM=2,jM="[object Boolean]",HM="[object Date]",BM="[object Error]",KM="[object Map]",WM="[object Number]",VM="[object RegExp]",zM="[object Set]",XM="[object String]",YM="[object Symbol]",JM="[object ArrayBuffer]",QM="[object DataView]",EA=Ut?Ut.prototype:void 0,Xh=EA?EA.valueOf:void 0;function ZM(r,e,t,n,i,o,s){switch(t){case QM:if(r.byteLength!=e.byteLength||r.byteOffset!=e.byteOffset)return!1;r=r.buffer,e=e.buffer;case JM:return!(r.byteLength!=e.byteLength||!o(new Js(r),new Js(e)));case jM:case HM:case WM:return Ln(+r,+e);case BM:return r.name==e.name&&r.message==e.message;case VM:case XM:return r==e+"";case KM:var a=kA;case zM:var c=n&UM;if(a||(a=ta),r.size!=e.size&&!c)return!1;var l=s.get(r);if(l)return l==e;n|=GM,s.set(r,e);var u=Cf(a(r),a(e),n,i,o,s);return s.delete(r),u;case YM:if(Xh)return Xh.call(r)==Xh.call(e)}return!1}var $A=ZM;var e1=1,t1=Object.prototype,r1=t1.hasOwnProperty;function n1(r,e,t,n,i,o){var s=t&e1,a=Cc(r),c=a.length,l=Cc(e),u=l.length;if(c!=u&&!s)return!1;for(var f=c;f--;){var m=a[f];if(!(s?m in e:r1.call(e,m)))return!1}var T=o.get(r),A=o.get(e);if(T&&A)return T==e&&A==r;var S=!0;o.set(r,e),o.set(e,r);for(var N=s;++f<c;){m=a[f];var C=r[m],v=e[m];if(n)var y=s?n(v,C,m,e,r,o):n(C,v,m,r,e,o);if(!(y===void 0?C===v||i(C,v,t,n,o):y)){S=!1;break}N||(N=m=="constructor")}if(S&&!N){var $=r.constructor,D=e.constructor;$!=D&&"constructor"in r&&"constructor"in e&&!(typeof $=="function"&&$ instanceof $&&typeof D=="function"&&D instanceof D)&&(S=!1)}return o.delete(r),o.delete(e),S}var NA=n1;var i1=1,_A="[object Arguments]",IA="[object Array]",kf="[object Object]",o1=Object.prototype,PA=o1.hasOwnProperty;function s1(r,e,t,n,i,o){var s=V(r),a=V(e),c=s?IA:Tn(r),l=a?IA:Tn(e);c=c==_A?kf:c,l=l==_A?kf:l;var u=c==kf,f=l==kf,m=c==l;if(m&&di(r)){if(!di(e))return!1;s=!0,u=!1}if(m&&!u)return o||(o=new zi),s||Us(r)?Cf(r,e,t,n,i,o):$A(r,e,c,t,n,i,o);if(!(t&i1)){var T=u&&PA.call(r,"__wrapped__"),A=f&&PA.call(e,"__wrapped__");if(T||A){var S=T?r.value():r,N=A?e.value():e;return o||(o=new zi),i(S,N,t,n,o)}}return m?(o||(o=new zi),NA(r,e,t,n,i,o)):!1}var DA=s1;function OA(r,e,t,n,i){return r===e?!0:r==null||e==null||!Tt(r)&&!Tt(e)?r!==r&&e!==e:DA(r,e,t,n,OA,i)}var Ef=OA;var a1=1,c1=2;function l1(r,e,t,n){var i=t.length,o=i,s=!n;if(r==null)return!o;for(r=Object(r);i--;){var a=t[i];if(s&&a[2]?a[1]!==r[a[0]]:!(a[0]in r))return!1}for(;++i<o;){a=t[i];var c=a[0],l=r[c],u=a[1];if(s&&a[2]){if(l===void 0&&!(c in r))return!1}else{var f=new zi;if(n)var m=n(l,u,c,r,e,f);if(!(m===void 0?Ef(u,l,a1|c1,n,f):m))return!1}}return!0}var LA=l1;function u1(r){return r===r&&!at(r)}var $f=u1;function f1(r){for(var e=He(r),t=e.length;t--;){var n=e[t],i=r[n];e[t]=[n,i,$f(i)]}return e}var MA=f1;function d1(r,e){return function(t){return t==null?!1:t[r]===e&&(e!==void 0||r in Object(t))}}var Nf=d1;function p1(r){var e=MA(r);return e.length==1&&e[0][2]?Nf(e[0][0],e[0][1]):function(t){return t===r||LA(t,r,e)}}var FA=p1;function m1(r,e){return r!=null&&e in Object(r)}var qA=m1;function h1(r,e,t){e=Vi(e,r);for(var n=-1,i=e.length,o=!1;++n<i;){var s=Un(e[n]);if(!(o=r!=null&&t(r,s)))break;r=r[s]}return o||++n!=i?o:(i=r==null?0:r.length,!!i&&qs(i)&&Fi(s,i)&&(V(r)||Gi(r)))}var _f=h1;function g1(r,e){return r!=null&&_f(r,e,qA)}var UA=g1;var y1=1,T1=2;function v1(r,e){return Gs(r)&&$f(e)?Nf(Un(r),e):function(t){var n=Ob(t,r);return n===void 0&&n===e?UA(t,r):Ef(e,n,y1|T1)}}var GA=v1;function x1(r){return function(e){return e?.[r]}}var jA=x1;function R1(r){return function(e){return Ks(e,r)}}var HA=R1;function b1(r){return Gs(r)?jA(Un(r)):HA(r)}var BA=b1;function A1(r){return typeof r=="function"?r:r==null?Sr:typeof r=="object"?V(r)?GA(r[0],r[1]):FA(r):BA(r)}var ht=A1;function w1(r,e,t,n){for(var i=-1,o=r==null?0:r.length;++i<o;){var s=r[i];e(n,s,t(s),r)}return n}var KA=w1;function S1(r){return function(e,t,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var c=s[r?a:++i];if(t(o[c],c,o)===!1)break}return e}}var WA=S1;var C1=WA(),VA=C1;function k1(r,e){return r&&VA(r,e,He)}var zA=k1;function E1(r,e){return function(t,n){if(t==null)return t;if(!_t(t))return r(t,n);for(var i=t.length,o=e?i:-1,s=Object(t);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return t}}var XA=E1;var $1=XA(zA),kr=$1;function N1(r,e,t,n){return kr(r,function(i,o,s){e(n,i,t(i),s)}),n}var YA=N1;function _1(r,e){return function(t,n){var i=V(t)?KA:YA,o=e?e():{};return i(t,r,ht(n,2),o)}}var JA=_1;var QA=Object.prototype,I1=QA.hasOwnProperty,P1=Fs(function(r,e){r=Object(r);var t=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Ui(e[0],e[1],i)&&(n=1);++t<n;)for(var o=e[t],s=ji(o),a=-1,c=s.length;++a<c;){var l=s[a],u=r[l];(u===void 0||Ln(u,QA[l])&&!I1.call(r,l))&&(r[l]=o[l])}return r}),ra=P1;function D1(r){return Tt(r)&&_t(r)}var Yh=D1;function O1(r,e,t){for(var n=-1,i=r==null?0:r.length;++n<i;)if(t(e,r[n]))return!0;return!1}var If=O1;var L1=200;function M1(r,e,t,n){var i=-1,o=ff,s=!0,a=r.length,c=[],l=e.length;if(!a)return c;t&&(e=Dn(e,qn(t))),n?(o=If,s=!1):e.length>=L1&&(o=ea,s=!1,e=new Zs(e));e:for(;++i<a;){var u=r[i],f=t==null?u:t(u);if(u=n||u!==0?u:0,s&&f===f){for(var m=l;m--;)if(e[m]===f)continue e;c.push(u)}else o(e,f,n)||c.push(u)}return c}var ZA=M1;var F1=Fs(function(r,e){return Yh(r)?ZA(r,Vs(e,1,Yh,!0)):[]}),Yi=F1;function q1(r){var e=r==null?0:r.length;return e?r[e-1]:void 0}var jn=q1;function U1(r,e,t){var n=r==null?0:r.length;return n?(e=t||e===void 0?1:On(e),gf(r,e<0?0:e,n)):[]}var xt=U1;function G1(r,e,t){var n=r==null?0:r.length;return n?(e=t||e===void 0?1:On(e),e=n-e,gf(r,0,e<0?0:e)):[]}var mi=G1;function j1(r){return typeof r=="function"?r:Sr}var ew=j1;function H1(r,e){var t=V(r)?lf:kr;return t(r,ew(e))}var G=H1;function B1(r,e){for(var t=-1,n=r==null?0:r.length;++t<n;)if(!e(r[t],t,r))return!1;return!0}var tw=B1;function K1(r,e){var t=!0;return kr(r,function(n,i,o){return t=!!e(n,i,o),t}),t}var rw=K1;function W1(r,e,t){var n=V(r)?tw:rw;return t&&Ui(r,e,t)&&(e=void 0),n(r,ht(e,3))}var lr=W1;function V1(r,e){var t=[];return kr(r,function(n,i,o){e(n,i,o)&&t.push(n)}),t}var Pf=V1;function z1(r,e){var t=V(r)?Xs:Pf;return t(r,ht(e,3))}var Gt=z1;function X1(r){return function(e,t,n){var i=Object(e);if(!_t(e)){var o=ht(t,3);e=He(e),t=function(a){return o(i[a],a,i)}}var s=r(e,t,n);return s>-1?i[o?e[s]:s]:void 0}}var nw=X1;var Y1=Math.max;function J1(r,e,t){var n=r==null?0:r.length;if(!n)return-1;var i=t==null?0:On(t);return i<0&&(i=Y1(n+i,0)),uf(r,ht(e,3),i)}var iw=J1;var Q1=nw(iw),Hn=Q1;function Z1(r){return r&&r.length?r[0]:void 0}var jt=Z1;function eF(r,e){var t=-1,n=_t(r)?Array(r.length):[];return kr(r,function(i,o,s){n[++t]=e(i,o,s)}),n}var ow=eF;function tF(r,e){var t=V(r)?Dn:ow;return t(r,ht(e,3))}var L=tF;function rF(r,e){return Vs(L(r,e),1)}var er=rF;var nF=Object.prototype,iF=nF.hasOwnProperty,oF=JA(function(r,e,t){iF.call(r,t)?r[t].push(e):Ms(r,t,[e])}),Jh=oF;var sF=Object.prototype,aF=sF.hasOwnProperty;function cF(r,e){return r!=null&&aF.call(r,e)}var sw=cF;function lF(r,e){return r!=null&&_f(r,e,sw)}var K=lF;var uF="[object String]";function fF(r){return typeof r=="string"||!V(r)&&Tt(r)&&gr(r)==uF}var Lt=fF;function dF(r,e){return Dn(e,function(t){return r[t]})}var aw=dF;function pF(r){return r==null?[]:aw(r,He(r))}var Pe=pF;var mF=Math.max;function hF(r,e,t,n){r=_t(r)?r:Pe(r),t=t&&!n?On(t):0;var i=r.length;return t<0&&(t=mF(i+t,0)),Lt(r)?t<=i&&r.indexOf(e,t)>-1:!!i&&Ls(r,e,t)>-1}var et=hF;var gF=Math.max;function yF(r,e,t){var n=r==null?0:r.length;if(!n)return-1;var i=t==null?0:On(t);return i<0&&(i=gF(n+i,0)),Ls(r,e,i)}var Df=yF;var TF="[object Map]",vF="[object Set]",xF=Object.prototype,RF=xF.hasOwnProperty;function bF(r){if(r==null)return!0;if(_t(r)&&(V(r)||typeof r=="string"||typeof r.splice=="function"||di(r)||Us(r)||Gi(r)))return!r.length;var e=Tn(r);if(e==TF||e==vF)return!r.size;if(Fn(r))return!mf(r).length;for(var t in r)if(RF.call(r,t))return!1;return!0}var se=bF;var AF="[object RegExp]";function wF(r){return Tt(r)&&gr(r)==AF}var cw=wF;var lw=Zr&&Zr.isRegExp,SF=lw?qn(lw):cw,en=SF;function CF(r){return r===void 0}var ur=CF;function kF(r,e){return r<e}var uw=kF;function EF(r,e,t){for(var n=-1,i=r.length;++n<i;){var o=r[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!Pn(s):t(s,a)))var a=s,c=o}return c}var fw=EF;function $F(r){return r&&r.length?fw(r,Sr,uw):void 0}var dw=$F;var NF="Expected a function";function _F(r){if(typeof r!="function")throw new TypeError(NF);return function(){var e=arguments;switch(e.length){case 0:return!r.call(this);case 1:return!r.call(this,e[0]);case 2:return!r.call(this,e[0],e[1]);case 3:return!r.call(this,e[0],e[1],e[2])}return!r.apply(this,e)}}var pw=_F;function IF(r,e,t,n){if(!at(r))return r;e=Vi(e,r);for(var i=-1,o=e.length,s=o-1,a=r;a!=null&&++i<o;){var c=Un(e[i]),l=t;if(c==="__proto__"||c==="constructor"||c==="prototype")return r;if(i!=s){var u=a[c];l=n?n(u,c,a):void 0,l===void 0&&(l=at(u)?u:Fi(e[i+1])?[]:{})}qi(a,c,l),a=a[c]}return r}var mw=IF;function PF(r,e,t){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=Ks(r,s);t(a,s)&&mw(o,Vi(s,r),a)}return o}var hw=PF;function DF(r,e){if(r==null)return{};var t=Dn(xf(r),function(n){return[n]});return e=ht(e),hw(r,t,function(n,i){return e(n,i[0])})}var Er=DF;function OF(r,e,t,n,i){return i(r,function(o,s,a){t=n?(n=!1,o):e(t,o,s,a)}),t}var gw=OF;function LF(r,e,t){var n=V(r)?qb:gw,i=arguments.length<3;return n(r,ht(e,4),t,i,kr)}var lt=LF;function MF(r,e){var t=V(r)?Xs:Pf;return t(r,pw(ht(e,3)))}var Ji=MF;function FF(r,e){var t;return kr(r,function(n,i,o){return t=e(n,i,o),!t}),!!t}var yw=FF;function qF(r,e,t){var n=V(r)?Sf:yw;return t&&Ui(r,e,t)&&(e=void 0),n(r,ht(e,3))}var kc=qF;var UF=1/0,GF=Xi&&1/ta(new Xi([,-0]))[1]==UF?function(r){return new Xi(r)}:ct,Tw=GF;var jF=200;function HF(r,e,t){var n=-1,i=ff,o=r.length,s=!0,a=[],c=a;if(t)s=!1,i=If;else if(o>=jF){var l=e?null:Tw(r);if(l)return ta(l);s=!1,i=ea,c=new Zs}else c=e?[]:a;e:for(;++n<o;){var u=r[n],f=e?e(u):u;if(u=t||u!==0?u:0,s&&f===f){for(var m=c.length;m--;)if(c[m]===f)continue e;e&&c.push(f),a.push(u)}else i(c,f,t)||(c!==a&&c.push(f),a.push(u))}return a}var Of=HF;function BF(r){return r&&r.length?Of(r):[]}var na=BF;function KF(r,e){return r&&r.length?Of(r,ht(e,2)):[]}var vw=KF;function ia(r){console&&console.error&&console.error(`Error: ${r}`)}function Ec(r){console&&console.warn&&console.warn(`Warning: ${r}`)}function $c(r){let e=new Date().getTime(),t=r();return{time:new Date().getTime()-e,value:t}}function Nc(r){function e(){}e.prototype=r;let t=new e;function n(){return typeof t.bar}return n(),n(),r;(0,eval)(r)}function WF(r){return VF(r)?r.LABEL:r.name}function VF(r){return Lt(r.LABEL)&&r.LABEL!==""}var Gr=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),G(this.definition,t=>{t.accept(e)})}},Ce=class extends Gr{constructor(e){super([]),this.idx=1,Zt(this,Er(e,t=>t!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},Tr=class extends Gr{constructor(e){super(e.definition),this.orgText="",Zt(this,Er(e,t=>t!==void 0))}},We=class extends Gr{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Zt(this,Er(e,t=>t!==void 0))}},ke=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,t=>t!==void 0))}},Ve=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,t=>t!==void 0))}},ze=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,t=>t!==void 0))}},pe=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,t=>t!==void 0))}},Me=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,t=>t!==void 0))}},Fe=class extends Gr{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Zt(this,Er(e,t=>t!==void 0))}},ae=class{constructor(e){this.idx=1,Zt(this,Er(e,t=>t!==void 0))}accept(e){e.visit(this)}};function Lf(r){return L(r,oa)}function oa(r){function e(t){return L(t,oa)}if(r instanceof Ce){let t={type:"NonTerminal",name:r.nonTerminalName,idx:r.idx};return Lt(r.label)&&(t.label=r.label),t}else{if(r instanceof We)return{type:"Alternative",definition:e(r.definition)};if(r instanceof ke)return{type:"Option",idx:r.idx,definition:e(r.definition)};if(r instanceof Ve)return{type:"RepetitionMandatory",idx:r.idx,definition:e(r.definition)};if(r instanceof ze)return{type:"RepetitionMandatoryWithSeparator",idx:r.idx,separator:oa(new ae({terminalType:r.separator})),definition:e(r.definition)};if(r instanceof Me)return{type:"RepetitionWithSeparator",idx:r.idx,separator:oa(new ae({terminalType:r.separator})),definition:e(r.definition)};if(r instanceof pe)return{type:"Repetition",idx:r.idx,definition:e(r.definition)};if(r instanceof Fe)return{type:"Alternation",idx:r.idx,definition:e(r.definition)};if(r instanceof ae){let t={type:"Terminal",name:r.terminalType.name,label:WF(r.terminalType),idx:r.idx};Lt(r.label)&&(t.terminalLabel=r.label);let n=r.terminalType.PATTERN;return r.terminalType.PATTERN&&(t.pattern=en(n)?n.source:n),t}else{if(r instanceof Tr)return{type:"Rule",name:r.name,orgText:r.orgText,definition:e(r.definition)};throw Error("non exhaustive match")}}}var vr=class{visit(e){let t=e;switch(t.constructor){case Ce:return this.visitNonTerminal(t);case We:return this.visitAlternative(t);case ke:return this.visitOption(t);case Ve:return this.visitRepetitionMandatory(t);case ze:return this.visitRepetitionMandatoryWithSeparator(t);case Me:return this.visitRepetitionWithSeparator(t);case pe:return this.visitRepetition(t);case Fe:return this.visitAlternation(t);case ae:return this.visitTerminal(t);case Tr:return this.visitRule(t);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function Qh(r){return r instanceof We||r instanceof ke||r instanceof pe||r instanceof Ve||r instanceof ze||r instanceof Me||r instanceof ae||r instanceof Tr}function _o(r,e=[]){return r instanceof ke||r instanceof pe||r instanceof Me?!0:r instanceof Fe?kc(r.definition,n=>_o(n,e)):r instanceof Ce&&et(e,r)?!1:r instanceof Gr?(r instanceof Ce&&e.push(r),lr(r.definition,n=>_o(n,e))):!1}function Zh(r){return r instanceof Fe}function $r(r){if(r instanceof Ce)return"SUBRULE";if(r instanceof ke)return"OPTION";if(r instanceof Fe)return"OR";if(r instanceof Ve)return"AT_LEAST_ONE";if(r instanceof ze)return"AT_LEAST_ONE_SEP";if(r instanceof Me)return"MANY_SEP";if(r instanceof pe)return"MANY";if(r instanceof ae)return"CONSUME";throw Error("non exhaustive match")}var hi=class{walk(e,t=[]){G(e.definition,(n,i)=>{let o=xt(e.definition,i+1);if(n instanceof Ce)this.walkProdRef(n,o,t);else if(n instanceof ae)this.walkTerminal(n,o,t);else if(n instanceof We)this.walkFlat(n,o,t);else if(n instanceof ke)this.walkOption(n,o,t);else if(n instanceof Ve)this.walkAtLeastOne(n,o,t);else if(n instanceof ze)this.walkAtLeastOneSep(n,o,t);else if(n instanceof Me)this.walkManySep(n,o,t);else if(n instanceof pe)this.walkMany(n,o,t);else if(n instanceof Fe)this.walkOr(n,o,t);else throw Error("non exhaustive match")})}walkTerminal(e,t,n){}walkProdRef(e,t,n){}walkFlat(e,t,n){let i=t.concat(n);this.walk(e,i)}walkOption(e,t,n){let i=t.concat(n);this.walk(e,i)}walkAtLeastOne(e,t,n){let i=[new ke({definition:e.definition})].concat(t,n);this.walk(e,i)}walkAtLeastOneSep(e,t,n){let i=xw(e,t,n);this.walk(e,i)}walkMany(e,t,n){let i=[new ke({definition:e.definition})].concat(t,n);this.walk(e,i)}walkManySep(e,t,n){let i=xw(e,t,n);this.walk(e,i)}walkOr(e,t,n){let i=t.concat(n);G(e.definition,o=>{let s=new We({definition:[o]});this.walk(s,i)})}};function xw(r,e,t){return[new ke({definition:[new ae({terminalType:r.separator})].concat(r.definition)})].concat(e,t)}function Io(r){if(r instanceof Ce)return Io(r.referencedRule);if(r instanceof ae)return YF(r);if(Qh(r))return zF(r);if(Zh(r))return XF(r);throw Error("non exhaustive match")}function zF(r){let e=[],t=r.definition,n=0,i=t.length>n,o,s=!0;for(;i&&s;)o=t[n],s=_o(o),e=e.concat(Io(o)),n=n+1,i=t.length>n;return na(e)}function XF(r){let e=L(r.definition,t=>Io(t));return na(vt(e))}function YF(r){return[r.terminalType]}var Mf="_~IN~_";var eg=class extends hi{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,t,n){}walkProdRef(e,t,n){let i=JF(e.referencedRule,e.idx)+this.topProd.name,o=t.concat(n),s=new We({definition:o}),a=Io(s);this.follows[i]=a}};function Rw(r){let e={};return G(r,t=>{let n=new eg(t).startWalking();Zt(e,n)}),e}function JF(r,e){return r.name+e+Mf}var Ff={},QF=new Ao;function sa(r){let e=r.toString();if(Ff.hasOwnProperty(e))return Ff[e];{let t=QF.pattern(e);return Ff[e]=t,t}}function bw(){Ff={}}var ww="Complement Sets are not supported for first char optimization",_c=`Unable to use "first char" lexer optimizations:
`;function Sw(r,e=!1){try{let t=sa(r);return tg(t.value,{},t.flags.ignoreCase)}catch(t){if(t.message===ww)e&&Ec(`${_c}	Unable to optimize: < ${r.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),ia(`${_c}
	Failed parsing: < ${r.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function tg(r,e,t){switch(r.type){case"Disjunction":for(let i=0;i<r.value.length;i++)tg(r.value[i],e,t);break;case"Alternative":let n=r.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":qf(s.value,e,t);break;case"Set":if(s.complement===!0)throw Error(ww);G(s.value,c=>{if(typeof c=="number")qf(c,e,t);else{let l=c;if(t===!0)for(let u=l.from;u<=l.to;u++)qf(u,e,t);else{for(let u=l.from;u<=l.to&&u<aa;u++)qf(u,e,t);if(l.to>=aa){let u=l.from>=aa?l.from:aa,f=l.to,m=Bn(u),T=Bn(f);for(let A=m;A<=T;A++)e[A]=A}}}});break;case"Group":tg(s.value,e,t);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&rg(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return Pe(e)}function qf(r,e,t){let n=Bn(r);e[n]=n,t===!0&&ZF(r,e)}function ZF(r,e){let t=String.fromCharCode(r),n=t.toUpperCase();if(n!==t){let i=Bn(n.charCodeAt(0));e[i]=i}else{let i=t.toLowerCase();if(i!==t){let o=Bn(i.charCodeAt(0));e[o]=o}}}function Aw(r,e){return Hn(r.value,t=>{if(typeof t=="number")return et(e,t);{let n=t;return Hn(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function rg(r){let e=r.quantifier;return e&&e.atLeast===0?!0:r.value?V(r.value)?lr(r.value,rg):rg(r.value):!1}var ng=class extends _n{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){et(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?Aw(e,this.targetCharCodes)===void 0&&(this.found=!0):Aw(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function Uf(r,e){if(e instanceof RegExp){let t=sa(e),n=new ng(r);return n.visit(t),n.found}else return Hn(e,t=>et(r,t.charCodeAt(0)))!==void 0}var Po="PATTERN",ca="defaultMode",Gf="modes",og=typeof new RegExp("(?:)").sticky=="boolean";function Ew(r,e){e=ra(e,{useSticky:og,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(v,y)=>y()});let t=e.tracer;t("initCharCodeToOptimizedIndexMap",()=>{yq()});let n;t("Reject Lexer.NA",()=>{n=Ji(r,v=>v[Po]===gt.NA)});let i=!1,o;t("Transform Patterns",()=>{i=!1,o=L(n,v=>{let y=v[Po];if(en(y)){let $=y.source;return $.length===1&&$!=="^"&&$!=="$"&&$!=="."&&!y.ignoreCase?$:$.length===2&&$[0]==="\\"&&!et(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],$[1])?$[1]:e.useSticky?kw(y):Cw(y)}else{if(yr(y))return i=!0,{exec:y};if(typeof y=="object")return i=!0,y;if(typeof y=="string"){if(y.length===1)return y;{let $=y.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),D=new RegExp($);return e.useSticky?kw(D):Cw(D)}}else throw Error("non exhaustive match")}})});let s,a,c,l,u;t("misc mapping",()=>{s=L(n,v=>v.tokenTypeIdx),a=L(n,v=>{let y=v.GROUP;if(y!==gt.SKIPPED){if(Lt(y))return y;if(ur(y))return!1;throw Error("non exhaustive match")}}),c=L(n,v=>{let y=v.LONGER_ALT;if(y)return V(y)?L(y,D=>Df(n,D)):[Df(n,y)]}),l=L(n,v=>v.PUSH_MODE),u=L(n,v=>K(v,"POP_MODE"))});let f;t("Line Terminator Handling",()=>{let v=Lw(e.lineTerminatorCharacters);f=L(n,y=>!1),e.positionTracking!=="onlyOffset"&&(f=L(n,y=>K(y,"LINE_BREAKS")?!!y.LINE_BREAKS:Ow(y,v)===!1&&Uf(v,y.PATTERN)))});let m,T,A,S;t("Misc Mapping #2",()=>{m=L(n,Pw),T=L(o,hq),A=lt(n,(v,y)=>{let $=y.GROUP;return Lt($)&&$!==gt.SKIPPED&&(v[$]=[]),v},{}),S=L(o,(v,y)=>({pattern:o[y],longerAlt:c[y],canLineTerminator:f[y],isCustom:m[y],short:T[y],group:a[y],push:l[y],pop:u[y],tokenTypeIdx:s[y],tokenType:n[y]}))});let N=!0,C=[];return e.safeMode||t("First Char Optimization",()=>{C=lt(n,(v,y,$)=>{if(typeof y.PATTERN=="string"){let D=y.PATTERN.charCodeAt(0),X=Bn(D);ig(v,X,S[$])}else if(V(y.START_CHARS_HINT)){let D;G(y.START_CHARS_HINT,X=>{let ye=typeof X=="string"?X.charCodeAt(0):X,Ee=Bn(ye);D!==Ee&&(D=Ee,ig(v,Ee,S[$]))})}else if(en(y.PATTERN))if(y.PATTERN.unicode)N=!1,e.ensureOptimizations&&ia(`${_c}	Unable to analyze < ${y.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let D=Sw(y.PATTERN,e.ensureOptimizations);se(D)&&(N=!1),G(D,X=>{ig(v,X,S[$])})}else e.ensureOptimizations&&ia(`${_c}	TokenType: <${y.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),N=!1;return v},[])}),{emptyGroups:A,patternIdxToConfig:S,charCodeToPatternIdxToConfig:C,hasCustom:i,canBeOptimized:N}}function $w(r,e){let t=[],n=tq(r);t=t.concat(n.errors);let i=rq(n.valid),o=i.valid;return t=t.concat(i.errors),t=t.concat(eq(o)),t=t.concat(uq(o)),t=t.concat(fq(o,e)),t=t.concat(dq(o)),t}function eq(r){let e=[],t=Gt(r,n=>en(n[Po]));return e=e.concat(iq(t)),e=e.concat(aq(t)),e=e.concat(cq(t)),e=e.concat(lq(t)),e=e.concat(oq(t)),e}function tq(r){let e=Gt(r,i=>!K(i,Po)),t=L(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:tt.MISSING_PATTERN,tokenTypes:[i]})),n=Yi(r,e);return{errors:t,valid:n}}function rq(r){let e=Gt(r,i=>{let o=i[Po];return!en(o)&&!yr(o)&&!K(o,"exec")&&!Lt(o)}),t=L(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:tt.INVALID_PATTERN,tokenTypes:[i]})),n=Yi(r,e);return{errors:t,valid:n}}var nq=/[^\\][$]/;function iq(r){class e extends _n{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let t=Gt(r,i=>{let o=i.PATTERN;try{let s=sa(o),a=new e;return a.visit(s),a.found}catch{return nq.test(o.source)}});return L(t,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function oq(r){let e=Gt(r,n=>n.PATTERN.test(""));return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:tt.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var sq=/[^\\[][\^]|^\^/;function aq(r){class e extends _n{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let t=Gt(r,i=>{let o=i.PATTERN;try{let s=sa(o),a=new e;return a.visit(s),a.found}catch{return sq.test(o.source)}});return L(t,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function cq(r){let e=Gt(r,n=>{let i=n[Po];return i instanceof RegExp&&(i.multiline||i.global)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:tt.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function lq(r){let e=[],t=L(r,o=>lt(r,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!et(e,a)&&a.PATTERN!==gt.NA&&(e.push(a),s.push(a)),s),[]));t=Gn(t);let n=Gt(t,o=>o.length>1);return L(n,o=>{let s=L(o,c=>c.name);return{message:`The same RegExp pattern ->${jt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:tt.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function uq(r){let e=Gt(r,n=>{if(!K(n,"GROUP"))return!1;let i=n.GROUP;return i!==gt.SKIPPED&&i!==gt.NA&&!Lt(i)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:tt.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function fq(r,e){let t=Gt(r,i=>i.PUSH_MODE!==void 0&&!et(e,i.PUSH_MODE));return L(t,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:tt.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function dq(r){let e=[],t=lt(r,(n,i,o)=>{let s=i.PATTERN;return s===gt.NA||(Lt(s)?n.push({str:s,idx:o,tokenType:i}):en(s)&&mq(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return G(r,(n,i)=>{G(t,({str:o,idx:s,tokenType:a})=>{if(i<s&&pq(o,n.PATTERN)){let c=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:c,type:tt.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function pq(r,e){if(en(e)){let t=e.exec(r);return t!==null&&t.index===0}else{if(yr(e))return e(r,0,[],{});if(K(e,"exec"))return e.exec(r,0,[],{});if(typeof e=="string")return e===r;throw Error("non exhaustive match")}}function mq(r){return Hn([".","\\","[","]","|","^","$","(",")","?","*","+","{"],t=>r.source.indexOf(t)!==-1)===void 0}function Cw(r){let e=r.ignoreCase?"i":"";return new RegExp(`^(?:${r.source})`,e)}function kw(r){let e=r.ignoreCase?"iy":"y";return new RegExp(`${r.source}`,e)}function Nw(r,e,t){let n=[];return K(r,ca)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+ca+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),K(r,Gf)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+Gf+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),K(r,Gf)&&K(r,ca)&&!K(r.modes,r.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${ca}: <${r.defaultMode}>which does not exist
`,type:tt.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),K(r,Gf)&&G(r.modes,(i,o)=>{G(i,(s,a)=>{if(ur(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:tt.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(K(s,"LONGER_ALT")){let c=V(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];G(c,l=>{!ur(l)&&!et(i,l)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${l.name}> on token <${s.name}> outside of mode <${o}>
`,type:tt.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function _w(r,e,t){let n=[],i=!1,o=Gn(vt(Pe(r.modes))),s=Ji(o,c=>c[Po]===gt.NA),a=Lw(t);return e&&G(s,c=>{let l=Ow(c,a);if(l!==!1){let f={message:gq(c,l),type:l.issue,tokenType:c};n.push(f)}else K(c,"LINE_BREAKS")?c.LINE_BREAKS===!0&&(i=!0):Uf(a,c.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:tt.NO_LINE_BREAKS_FLAGS}),n}function Iw(r){let e={},t=He(r);return G(t,n=>{let i=r[n];if(V(i))e[n]=[];else throw Error("non exhaustive match")}),e}function Pw(r){let e=r.PATTERN;if(en(e))return!1;if(yr(e))return!0;if(K(e,"exec"))return!0;if(Lt(e))return!1;throw Error("non exhaustive match")}function hq(r){return Lt(r)&&r.length===1?r.charCodeAt(0):!1}var Dw={test:function(r){let e=r.length;for(let t=this.lastIndex;t<e;t++){let n=r.charCodeAt(t);if(n===10)return this.lastIndex=t+1,!0;if(n===13)return r.charCodeAt(t+1)===10?this.lastIndex=t+2:this.lastIndex=t+1,!0}return!1},lastIndex:0};function Ow(r,e){if(K(r,"LINE_BREAKS"))return!1;if(en(r.PATTERN)){try{Uf(e,r.PATTERN)}catch(t){return{issue:tt.IDENTIFY_TERMINATOR,errMsg:t.message}}return!1}else{if(Lt(r.PATTERN))return!1;if(Pw(r))return{issue:tt.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function gq(r,e){if(e.issue===tt.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${r.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===tt.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${r.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function Lw(r){return L(r,t=>Lt(t)?t.charCodeAt(0):t)}function ig(r,e,t){r[e]===void 0?r[e]=[t]:r[e].push(t)}var aa=256,jf=[];function Bn(r){return r<aa?r:jf[r]}function yq(){if(se(jf)){jf=new Array(65536);for(let r=0;r<65536;r++)jf[r]=r>255?255+~~(r/255):r}}function gi(r,e){let t=r.tokenTypeIdx;return t===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[t]===!0}function la(r,e){return r.tokenTypeIdx===e.tokenTypeIdx}var Mw=1,qw={};function yi(r){let e=Tq(r);vq(e),Rq(e),xq(e),G(e,t=>{t.isParent=t.categoryMatches.length>0})}function Tq(r){let e=Ke(r),t=r,n=!0;for(;n;){t=Gn(vt(L(t,o=>o.CATEGORIES)));let i=Yi(t,e);e=e.concat(i),se(i)?n=!1:t=i}return e}function vq(r){G(r,e=>{sg(e)||(qw[Mw]=e,e.tokenTypeIdx=Mw++),Fw(e)&&!V(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),Fw(e)||(e.CATEGORIES=[]),bq(e)||(e.categoryMatches=[]),Aq(e)||(e.categoryMatchesMap={})})}function xq(r){G(r,e=>{e.categoryMatches=[],G(e.categoryMatchesMap,(t,n)=>{e.categoryMatches.push(qw[n].tokenTypeIdx)})})}function Rq(r){G(r,e=>{Uw([],e)})}function Uw(r,e){G(r,t=>{e.categoryMatchesMap[t.tokenTypeIdx]=!0}),G(e.CATEGORIES,t=>{let n=r.concat(e);et(n,t)||Uw(n,t)})}function sg(r){return K(r,"tokenTypeIdx")}function Fw(r){return K(r,"CATEGORIES")}function bq(r){return K(r,"categoryMatches")}function Aq(r){return K(r,"categoryMatchesMap")}function Gw(r){return K(r,"tokenTypeIdx")}var ag={buildUnableToPopLexerModeMessage(r){return`Unable to pop Lexer Mode after encountering Token ->${r.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(r,e,t,n,i){return`unexpected character: ->${r.charAt(e)}<- at offset: ${e}, skipped ${t} characters.`}};var tt;(function(r){r[r.MISSING_PATTERN=0]="MISSING_PATTERN",r[r.INVALID_PATTERN=1]="INVALID_PATTERN",r[r.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",r[r.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",r[r.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",r[r.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",r[r.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",r[r.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",r[r.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",r[r.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",r[r.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",r[r.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",r[r.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",r[r.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",r[r.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",r[r.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",r[r.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",r[r.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(tt||(tt={}));var Ic={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:ag,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(Ic);var gt=class{constructor(e,t=Ic){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:c}=$c(o),l=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&l(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,c}else return o()},typeof t=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Zt({},Ic,t);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===Ic.lineTerminatorsPattern)this.config.lineTerminatorsPattern=Dw;else if(this.config.lineTerminatorCharacters===Ic.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(t.safeMode&&t.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),V(e)?i={modes:{defaultMode:Ke(e)},defaultMode:ca}:(o=!1,i=Ke(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(Nw(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat(_w(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},G(i.modes,(a,c)=>{i.modes[c]=Ji(a,l=>ur(l))});let s=He(i.modes);if(G(i.modes,(a,c)=>{this.TRACE_INIT(`Mode: <${c}> processing`,()=>{if(this.modes.push(c),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat($w(a,s))}),se(this.lexerDefinitionErrors)){yi(a);let l;this.TRACE_INIT("analyzeTokenTypes",()=>{l=Ew(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:t.positionTracking,ensureOptimizations:t.ensureOptimizations,safeMode:t.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[c]=l.patternIdxToConfig,this.charCodeToPatternIdxToConfig[c]=l.charCodeToPatternIdxToConfig,this.emptyGroups=Zt({},this.emptyGroups,l.emptyGroups),this.hasCustom=l.hasCustom||this.hasCustom,this.canModeBeOptimized[c]=l.canBeOptimized}})}),this.defaultMode=i.defaultMode,!se(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let c=L(this.lexerDefinitionErrors,l=>l.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+c)}G(this.lexerDefinitionWarning,a=>{Ec(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(og?(this.chopInput=Sr,this.match=this.matchWithTest):(this.updateLastIndex=ct,this.match=this.matchWithExec),o&&(this.handleModes=ct),this.trackStartLines===!1&&(this.computeNewColumn=Sr),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=ct),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=lt(this.canModeBeOptimized,(c,l,u)=>(l===!1&&c.push(u),c),[]);if(t.ensureOptimizations&&!se(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{bw()}),this.TRACE_INIT("toFastProperties",()=>{Nc(this)})})}tokenize(e,t=this.defaultMode){if(!se(this.lexerDefinitionErrors)){let i=L(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,t)}tokenizeInternal(e,t){let n,i,o,s,a,c,l,u,f,m,T,A,S,N,C,v,y=e,$=y.length,D=0,X=0,ye=this.hasCustom?0:Math.floor(e.length/10),Ee=new Array(ye),Bt=[],Rt=this.trackStartLines?1:void 0,M=this.trackStartLines?1:void 0,w=Iw(this.emptyGroups),U=this.trackStartLines,j=this.config.lineTerminatorsPattern,ce=0,ee=[],Q=[],bt=[],ft=[];Object.freeze(ft);let me;function Nr(){return ee}function Kn(At){let tr=Bn(At),An=Q[tr];return An===void 0?ft:An}let Ea=At=>{if(bt.length===1&&At.tokenType.PUSH_MODE===void 0){let tr=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(At);Bt.push({offset:At.startOffset,line:At.startLine,column:At.startColumn,length:At.image.length,message:tr})}else{bt.pop();let tr=jn(bt);ee=this.patternIdxToConfig[tr],Q=this.charCodeToPatternIdxToConfig[tr],ce=ee.length;let An=this.canModeBeOptimized[tr]&&this.config.safeMode===!1;Q&&An?me=Kn:me=Nr}};function ro(At){bt.push(At),Q=this.charCodeToPatternIdxToConfig[At],ee=this.patternIdxToConfig[At],ce=ee.length,ce=ee.length;let tr=this.canModeBeOptimized[At]&&this.config.safeMode===!1;Q&&tr?me=Kn:me=Nr}ro.call(this,t);let fr,Uo=this.config.recoveryEnabled;for(;D<$;){c=null;let At=y.charCodeAt(D),tr=me(At),An=tr.length;for(n=0;n<An;n++){fr=tr[n];let Kt=fr.pattern;l=null;let dt=fr.short;if(dt!==!1?At===dt&&(c=Kt):fr.isCustom===!0?(v=Kt.exec(y,D,Ee,w),v!==null?(c=v[0],v.payload!==void 0&&(l=v.payload)):c=null):(this.updateLastIndex(Kt,D),c=this.match(Kt,e,D)),c!==null){if(a=fr.longerAlt,a!==void 0){let jr=a.length;for(o=0;o<jr;o++){let _r=ee[a[o]],Rr=_r.pattern;if(u=null,_r.isCustom===!0?(v=Rr.exec(y,D,Ee,w),v!==null?(s=v[0],v.payload!==void 0&&(u=v.payload)):s=null):(this.updateLastIndex(Rr,D),s=this.match(Rr,e,D)),s&&s.length>c.length){c=s,l=u,fr=_r;break}}}break}}if(c!==null){if(f=c.length,m=fr.group,m!==void 0&&(T=fr.tokenTypeIdx,A=this.createTokenInstance(c,D,T,fr.tokenType,Rt,M,f),this.handlePayload(A,l),m===!1?X=this.addToken(Ee,X,A):w[m].push(A)),e=this.chopInput(e,f),D=D+f,M=this.computeNewColumn(M,f),U===!0&&fr.canLineTerminator===!0){let Kt=0,dt,jr;j.lastIndex=0;do dt=j.test(c),dt===!0&&(jr=j.lastIndex-1,Kt++);while(dt===!0);Kt!==0&&(Rt=Rt+Kt,M=f-jr,this.updateTokenEndLineColumnLocation(A,m,jr,Kt,Rt,M,f))}this.handleModes(fr,Ea,ro,A)}else{let Kt=D,dt=Rt,jr=M,_r=Uo===!1;for(;_r===!1&&D<$;)for(e=this.chopInput(e,1),D++,i=0;i<ce;i++){let Rr=ee[i],no=Rr.pattern,bi=Rr.short;if(bi!==!1?y.charCodeAt(D)===bi&&(_r=!0):Rr.isCustom===!0?_r=no.exec(y,D,Ee,w)!==null:(this.updateLastIndex(no,D),_r=no.exec(e)!==null),_r===!0)break}if(S=D-Kt,M=this.computeNewColumn(M,S),C=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(y,Kt,S,dt,jr),Bt.push({offset:Kt,line:dt,column:jr,length:S,message:C}),Uo===!1)break}}return this.hasCustom||(Ee.length=X),{tokens:Ee,groups:w,errors:Bt}}handleModes(e,t,n,i){if(e.pop===!0){let o=e.push;t(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,t){return e.substring(t)}updateLastIndex(e,t){e.lastIndex=t}updateTokenEndLineColumnLocation(e,t,n,i,o,s,a){let c,l;t!==void 0&&(c=n===a-1,l=c?-1:0,i===1&&c===!0||(e.endLine=o+l,e.endColumn=s-1+-l))}computeNewColumn(e,t){return e+t}createOffsetOnlyToken(e,t,n,i){return{image:e,startOffset:t,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,t,n,i,o,s){return{image:e,startOffset:t,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,t,n,i,o,s,a){return{image:e,startOffset:t,endOffset:t+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,t,n){return e.push(n),t}addTokenUsingMemberAccess(e,t,n){return e[t]=n,t++,t}handlePayloadNoCustom(e,t){}handlePayloadWithCustom(e,t){t!==null&&(e.payload=t)}matchWithTest(e,t,n){return e.test(t)===!0?t.substring(n,e.lastIndex):null}matchWithExec(e,t){let n=e.exec(t);return n!==null?n[0]:null}};gt.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";gt.NA=/NOT_APPLICABLE/;function Ti(r){return cg(r)?r.LABEL:r.name}function cg(r){return Lt(r.LABEL)&&r.LABEL!==""}var wq="parent",jw="categories",Hw="label",Bw="group",Kw="push_mode",Ww="pop_mode",Vw="longer_alt",zw="line_breaks",Xw="start_chars_hint";function Hf(r){return Sq(r)}function Sq(r){let e=r.pattern,t={};if(t.name=r.name,ur(e)||(t.PATTERN=e),K(r,wq))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return K(r,jw)&&(t.CATEGORIES=r[jw]),yi([t]),K(r,Hw)&&(t.LABEL=r[Hw]),K(r,Bw)&&(t.GROUP=r[Bw]),K(r,Ww)&&(t.POP_MODE=r[Ww]),K(r,Kw)&&(t.PUSH_MODE=r[Kw]),K(r,Vw)&&(t.LONGER_ALT=r[Vw]),K(r,zw)&&(t.LINE_BREAKS=r[zw]),K(r,Xw)&&(t.START_CHARS_HINT=r[Xw]),t}var vn=Hf({name:"EOF",pattern:gt.NA});yi([vn]);function Do(r,e,t,n,i,o,s,a){return{image:e,startOffset:t,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:r.tokenTypeIdx,tokenType:r}}function Pc(r,e){return gi(r,e)}var vi={buildMismatchTokenMessage({expected:r,actual:e,previous:t,ruleName:n}){return`Expecting ${cg(r)?`--> ${Ti(r)} <--`:`token of type --> ${r.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:r,ruleName:e}){return"Redundant input, expecting EOF but found: "+r.image},buildNoViableAltMessage({expectedPathsPerAlt:r,actual:e,previous:t,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+jt(e).image+"'";if(n)return o+n+a;{let c=lt(r,(m,T)=>m.concat(T),[]),l=L(c,m=>`[${L(m,T=>Ti(T)).join(", ")}]`),f=`one of these possible Token sequences:
${L(l,(m,T)=>`  ${T+1}. ${m}`).join(`
`)}`;return o+f+a}},buildEarlyExitMessage({expectedIterationPaths:r,actual:e,customUserDescription:t,ruleName:n}){let i="Expecting: ",s=`
but found: '`+jt(e).image+"'";if(t)return i+t+s;{let c=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${L(r,l=>`[${L(l,u=>Ti(u)).join(",")}]`).join(" ,")}>`;return i+c+s}}};Object.freeze(vi);var Yw={buildRuleNotFoundError(r,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+r.name+"<-"}},xn={buildDuplicateFoundError(r,e){function t(u){return u instanceof ae?u.terminalType.name:u instanceof Ce?u.nonTerminalName:""}let n=r.name,i=jt(e),o=i.idx,s=$r(i),a=t(i),c=o>0,l=`->${s}${c?o:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError(r){return`Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${r.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`},buildAlternationPrefixAmbiguityError(r){let e=L(r.prefixPath,i=>Ti(i)).join(", "),t=r.alternation.idx===0?"":r.alternation.idx;return`Ambiguous alternatives: <${r.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${t}> inside <${r.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`},buildAlternationAmbiguityError(r){let e=L(r.prefixPath,i=>Ti(i)).join(", "),t=r.alternation.idx===0?"":r.alternation.idx,n=`Ambiguous Alternatives Detected: <${r.ambiguityIndices.join(" ,")}> in <OR${t}> inside <${r.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError(r){let e=$r(r.repetition);return r.repetition.idx!==0&&(e+=r.repetition.idx),`The repetition <${e}> within Rule <${r.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`},buildTokenNameError(r){return"deprecated"},buildEmptyAlternationError(r){return`Ambiguous empty alternative: <${r.emptyChoiceIdx+1}> in <OR${r.alternation.idx}> inside <${r.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`},buildTooManyAlternativesError(r){return`An Alternation cannot have more than 256 alternatives:
<OR${r.alternation.idx}> inside <${r.topLevelRule.name}> Rule.
 has ${r.alternation.definition.length+1} alternatives.`},buildLeftRecursionError(r){let e=r.topLevelRule.name,t=L(r.leftRecursionPath,o=>o.name),n=`${e} --> ${t.concat([e]).join(" --> ")}`;return`Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(r){return"deprecated"},buildDuplicateRuleNameError(r){let e;return r.topLevelRule instanceof Tr?e=r.topLevelRule.name:e=r.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${r.grammarName}<-`}};function Jw(r,e){let t=new lg(r,e);return t.resolveRefs(),t.errors}var lg=class extends vr{constructor(e,t){super(),this.nameToTopRule=e,this.errMsgProvider=t,this.errors=[]}resolveRefs(){G(Pe(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let t=this.nameToTopRule[e.nonTerminalName];if(t)e.referencedRule=t;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:Mt.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var ug=class extends hi{constructor(e,t){super(),this.topProd=e,this.path=t,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=Ke(this.path.ruleStack).reverse(),this.occurrenceStack=Ke(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,t=[]){this.found||super.walk(e,t)}walkProdRef(e,t,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=t.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){se(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},Bf=class extends ug{constructor(e,t){super(e,t),this.path=t,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,t,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=t.concat(n),o=new We({definition:i});this.possibleTokTypes=Io(o),this.found=!0}}},ua=class extends hi{constructor(e,t){super(),this.topRule=e,this.occurrence=t,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},Kf=class extends ua{walkMany(e,t,n){if(e.idx===this.occurrence){let i=jt(t.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,t,n)}},Dc=class extends ua{walkManySep(e,t,n){if(e.idx===this.occurrence){let i=jt(t.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,t,n)}},Wf=class extends ua{walkAtLeastOne(e,t,n){if(e.idx===this.occurrence){let i=jt(t.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,t,n)}},Oc=class extends ua{walkAtLeastOneSep(e,t,n){if(e.idx===this.occurrence){let i=jt(t.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,t,n)}};function Vf(r,e,t=[]){t=Ke(t);let n=[],i=0;function o(a){return a.concat(xt(r,i+1))}function s(a){let c=Vf(o(a),e,t);return n.concat(c)}for(;t.length<e&&i<r.length;){let a=r[i];if(a instanceof We)return s(a.definition);if(a instanceof Ce)return s(a.definition);if(a instanceof ke)n=s(a.definition);else if(a instanceof Ve){let c=a.definition.concat([new pe({definition:a.definition})]);return s(c)}else if(a instanceof ze){let c=[new We({definition:a.definition}),new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})];return s(c)}else if(a instanceof Me){let c=a.definition.concat([new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})]);n=s(c)}else if(a instanceof pe){let c=a.definition.concat([new pe({definition:a.definition})]);n=s(c)}else{if(a instanceof Fe)return G(a.definition,c=>{se(c.definition)===!1&&(n=s(c.definition))}),n;if(a instanceof ae)t.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:t,suffixDef:xt(r,i)}),n}function zf(r,e,t,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,c=e.length,l=c-n-1,u=[],f=[];for(f.push({idx:-1,def:r,ruleStack:[],occurrenceStack:[]});!se(f);){let m=f.pop();if(m===s){a&&jn(f).idx<=l&&f.pop();continue}let T=m.def,A=m.idx,S=m.ruleStack,N=m.occurrenceStack;if(se(T))continue;let C=T[0];if(C===i){let v={idx:A,def:xt(T),ruleStack:mi(S),occurrenceStack:mi(N)};f.push(v)}else if(C instanceof ae)if(A<c-1){let v=A+1,y=e[v];if(t(y,C.terminalType)){let $={idx:v,def:xt(T),ruleStack:S,occurrenceStack:N};f.push($)}}else if(A===c-1)u.push({nextTokenType:C.terminalType,nextTokenOccurrence:C.idx,ruleStack:S,occurrenceStack:N}),a=!0;else throw Error("non exhaustive match");else if(C instanceof Ce){let v=Ke(S);v.push(C.nonTerminalName);let y=Ke(N);y.push(C.idx);let $={idx:A,def:C.definition.concat(o,xt(T)),ruleStack:v,occurrenceStack:y};f.push($)}else if(C instanceof ke){let v={idx:A,def:xt(T),ruleStack:S,occurrenceStack:N};f.push(v),f.push(s);let y={idx:A,def:C.definition.concat(xt(T)),ruleStack:S,occurrenceStack:N};f.push(y)}else if(C instanceof Ve){let v=new pe({definition:C.definition,idx:C.idx}),y=C.definition.concat([v],xt(T)),$={idx:A,def:y,ruleStack:S,occurrenceStack:N};f.push($)}else if(C instanceof ze){let v=new ae({terminalType:C.separator}),y=new pe({definition:[v].concat(C.definition),idx:C.idx}),$=C.definition.concat([y],xt(T)),D={idx:A,def:$,ruleStack:S,occurrenceStack:N};f.push(D)}else if(C instanceof Me){let v={idx:A,def:xt(T),ruleStack:S,occurrenceStack:N};f.push(v),f.push(s);let y=new ae({terminalType:C.separator}),$=new pe({definition:[y].concat(C.definition),idx:C.idx}),D=C.definition.concat([$],xt(T)),X={idx:A,def:D,ruleStack:S,occurrenceStack:N};f.push(X)}else if(C instanceof pe){let v={idx:A,def:xt(T),ruleStack:S,occurrenceStack:N};f.push(v),f.push(s);let y=new pe({definition:C.definition,idx:C.idx}),$=C.definition.concat([y],xt(T)),D={idx:A,def:$,ruleStack:S,occurrenceStack:N};f.push(D)}else if(C instanceof Fe)for(let v=C.definition.length-1;v>=0;v--){let y=C.definition[v],$={idx:A,def:y.definition.concat(xt(T)),ruleStack:S,occurrenceStack:N};f.push($),f.push(s)}else if(C instanceof We)f.push({idx:A,def:C.definition.concat(xt(T)),ruleStack:S,occurrenceStack:N});else if(C instanceof Tr)f.push(Cq(C,A,S,N));else throw Error("non exhaustive match")}return u}function Cq(r,e,t,n){let i=Ke(t);i.push(r.name);let o=Ke(n);return o.push(1),{idx:e,def:r.definition,ruleStack:i,occurrenceStack:o}}var rt;(function(r){r[r.OPTION=0]="OPTION",r[r.REPETITION=1]="REPETITION",r[r.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",r[r.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",r[r.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",r[r.ALTERNATION=5]="ALTERNATION"})(rt||(rt={}));function Lc(r){if(r instanceof ke||r==="Option")return rt.OPTION;if(r instanceof pe||r==="Repetition")return rt.REPETITION;if(r instanceof Ve||r==="RepetitionMandatory")return rt.REPETITION_MANDATORY;if(r instanceof ze||r==="RepetitionMandatoryWithSeparator")return rt.REPETITION_MANDATORY_WITH_SEPARATOR;if(r instanceof Me||r==="RepetitionWithSeparator")return rt.REPETITION_WITH_SEPARATOR;if(r instanceof Fe||r==="Alternation")return rt.ALTERNATION;throw Error("non exhaustive match")}function Yf(r){let{occurrence:e,rule:t,prodType:n,maxLookahead:i}=r,o=Lc(n);return o===rt.ALTERNATION?fa(e,t,i):da(e,t,o,i)}function Zw(r,e,t,n,i,o){let s=fa(r,e,t),a=oS(s)?la:gi;return o(s,n,a,i)}function eS(r,e,t,n,i,o){let s=da(r,e,i,t),a=oS(s)?la:gi;return o(s[0],a,n)}function tS(r,e,t,n){let i=r.length,o=lr(r,s=>lr(s,a=>a.length===1));if(e)return function(s){let a=L(s,c=>c.GATE);for(let c=0;c<i;c++){let l=r[c],u=l.length,f=a[c];if(!(f!==void 0&&f.call(this)===!1))e:for(let m=0;m<u;m++){let T=l[m],A=T.length;for(let S=0;S<A;S++){let N=this.LA(S+1);if(t(N,T[S])===!1)continue e}return c}}};if(o&&!n){let s=L(r,c=>vt(c)),a=lt(s,(c,l,u)=>(G(l,f=>{K(c,f.tokenTypeIdx)||(c[f.tokenTypeIdx]=u),G(f.categoryMatches,m=>{K(c,m)||(c[m]=u)})}),c),{});return function(){let c=this.LA(1);return a[c.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=r[s],c=a.length;e:for(let l=0;l<c;l++){let u=a[l],f=u.length;for(let m=0;m<f;m++){let T=this.LA(m+1);if(t(T,u[m])===!1)continue e}return s}}}}function rS(r,e,t){let n=lr(r,o=>o.length===1),i=r.length;if(n&&!t){let o=vt(r);if(o.length===1&&se(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=lt(o,(a,c,l)=>(a[c.tokenTypeIdx]=!0,G(c.categoryMatches,u=>{a[u]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=r[o],a=s.length;for(let c=0;c<a;c++){let l=this.LA(c+1);if(e(l,s[c])===!1)continue e}return!0}return!1}}var dg=class extends hi{constructor(e,t,n){super(),this.topProd=e,this.targetOccurrence=t,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,t,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===t?(this.restDef=n.concat(i),!0):!1}walkOption(e,t,n){this.checkIsTarget(e,rt.OPTION,t,n)||super.walkOption(e,t,n)}walkAtLeastOne(e,t,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY,t,n)||super.walkOption(e,t,n)}walkAtLeastOneSep(e,t,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,t,n)||super.walkOption(e,t,n)}walkMany(e,t,n){this.checkIsTarget(e,rt.REPETITION,t,n)||super.walkOption(e,t,n)}walkManySep(e,t,n){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR,t,n)||super.walkOption(e,t,n)}},Xf=class extends vr{constructor(e,t,n){super(),this.targetOccurrence=e,this.targetProdType=t,this.targetRef=n,this.result=[]}checkIsTarget(e,t){e.idx===this.targetOccurrence&&this.targetProdType===t&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,rt.OPTION)}visitRepetition(e){this.checkIsTarget(e,rt.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,rt.ALTERNATION)}};function Qw(r){let e=new Array(r);for(let t=0;t<r;t++)e[t]=[];return e}function fg(r){let e=[""];for(let t=0;t<r.length;t++){let n=r[t],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let c="_"+n.categoryMatches[a];i.push(s+c)}}e=i}return e}function kq(r,e,t){for(let n=0;n<r.length;n++){if(n===t)continue;let i=r[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function nS(r,e){let t=L(r,s=>Vf([s],1)),n=Qw(t.length),i=L(t,s=>{let a={};return G(s,c=>{let l=fg(c.partialPath);G(l,u=>{a[u]=!0})}),a}),o=t;for(let s=1;s<=e;s++){let a=o;o=Qw(a.length);for(let c=0;c<a.length;c++){let l=a[c];for(let u=0;u<l.length;u++){let f=l[u].partialPath,m=l[u].suffixDef,T=fg(f);if(kq(i,T,c)||se(m)||f.length===e){let S=n[c];if(Jf(S,f)===!1){S.push(f);for(let N=0;N<T.length;N++){let C=T[N];i[c][C]=!0}}}else{let S=Vf(m,s+1,f);o[c]=o[c].concat(S),G(S,N=>{let C=fg(N.partialPath);G(C,v=>{i[c][v]=!0})})}}}}return n}function fa(r,e,t,n){let i=new Xf(r,rt.ALTERNATION,n);return e.accept(i),nS(i.result,t)}function da(r,e,t,n){let i=new Xf(r,t);e.accept(i);let o=i.result,a=new dg(e,r,t).startWalking(),c=new We({definition:o}),l=new We({definition:a});return nS([c,l],n)}function Jf(r,e){e:for(let t=0;t<r.length;t++){let n=r[t];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function iS(r,e){return r.length<e.length&&lr(r,(t,n)=>{let i=e[n];return t===i||i.categoryMatchesMap[t.tokenTypeIdx]})}function oS(r){return lr(r,e=>lr(e,t=>lr(t,n=>se(n.categoryMatches))))}function sS(r){let e=r.lookaheadStrategy.validate({rules:r.rules,tokenTypes:r.tokenTypes,grammarName:r.grammarName});return L(e,t=>Object.assign({type:Mt.CUSTOM_LOOKAHEAD_VALIDATION},t))}function aS(r,e,t,n){let i=er(r,c=>Eq(c,t)),o=Dq(r,e,t),s=er(r,c=>_q(c,t)),a=er(r,c=>Nq(c,r,n,t));return i.concat(o,s,a)}function Eq(r,e){let t=new pg;r.accept(t);let n=t.allProductions,i=Jh(n,$q),o=Er(i,a=>a.length>1);return L(Pe(o),a=>{let c=jt(a),l=e.buildDuplicateFoundError(r,a),u=$r(c),f={message:l,type:Mt.DUPLICATE_PRODUCTIONS,ruleName:r.name,dslName:u,occurrence:c.idx},m=cS(c);return m&&(f.parameter=m),f})}function $q(r){return`${$r(r)}_#_${r.idx}_#_${cS(r)}`}function cS(r){return r instanceof ae?r.terminalType.name:r instanceof Ce?r.nonTerminalName:""}var pg=class extends vr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function Nq(r,e,t,n){let i=[];if(lt(e,(s,a)=>a.name===r.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:r,grammarName:t});i.push({message:s,type:Mt.DUPLICATE_RULE_NAME,ruleName:r.name})}return i}function lS(r,e,t){let n=[],i;return et(e,r)||(i=`Invalid rule override, rule: ->${r}<- cannot be overridden in the grammar: ->${t}<-as it is not defined in any of the super grammars `,n.push({message:i,type:Mt.INVALID_RULE_OVERRIDE,ruleName:r})),n}function hg(r,e,t,n=[]){let i=[],o=Qf(e.definition);if(se(o))return[];{let s=r.name;et(o,r)&&i.push({message:t.buildLeftRecursionError({topLevelRule:r,leftRecursionPath:n}),type:Mt.LEFT_RECURSION,ruleName:s});let c=Yi(o,n.concat([r])),l=er(c,u=>{let f=Ke(n);return f.push(u),hg(r,u,t,f)});return i.concat(l)}}function Qf(r){let e=[];if(se(r))return e;let t=jt(r);if(t instanceof Ce)e.push(t.referencedRule);else if(t instanceof We||t instanceof ke||t instanceof Ve||t instanceof ze||t instanceof Me||t instanceof pe)e=e.concat(Qf(t.definition));else if(t instanceof Fe)e=vt(L(t.definition,o=>Qf(o.definition)));else if(!(t instanceof ae))throw Error("non exhaustive match");let n=_o(t),i=r.length>1;if(n&&i){let o=xt(r);return e.concat(Qf(o))}else return e}var Mc=class extends vr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function uS(r,e){let t=new Mc;r.accept(t);let n=t.alternations;return er(n,o=>{let s=mi(o.definition);return er(s,(a,c)=>{let l=zf([a],[],gi,1);return se(l)?[{message:e.buildEmptyAlternationError({topLevelRule:r,alternation:o,emptyChoiceIdx:c}),type:Mt.NONE_LAST_EMPTY_ALT,ruleName:r.name,occurrence:o.idx,alternative:c+1}]:[]})})}function fS(r,e,t){let n=new Mc;r.accept(n);let i=n.alternations;return i=Ji(i,s=>s.ignoreAmbiguities===!0),er(i,s=>{let a=s.idx,c=s.maxLookahead||e,l=fa(a,r,c,s),u=Iq(l,s,r,t),f=Pq(l,s,r,t);return u.concat(f)})}var mg=class extends vr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function _q(r,e){let t=new Mc;r.accept(t);let n=t.alternations;return er(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:r,alternation:o}),type:Mt.TOO_MANY_ALTS,ruleName:r.name,occurrence:o.idx}]:[])}function dS(r,e,t){let n=[];return G(r,i=>{let o=new mg;i.accept(o);let s=o.allProductions;G(s,a=>{let c=Lc(a),l=a.maxLookahead||e,u=a.idx,m=da(u,i,c,l)[0];if(se(vt(m))){let T=t.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:T,type:Mt.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function Iq(r,e,t,n){let i=[],o=lt(r,(a,c,l)=>(e.definition[l].ignoreAmbiguities===!0||G(c,u=>{let f=[l];G(r,(m,T)=>{l!==T&&Jf(m,u)&&e.definition[T].ignoreAmbiguities!==!0&&f.push(T)}),f.length>1&&!Jf(i,u)&&(i.push(u),a.push({alts:f,path:u}))}),a),[]);return L(o,a=>{let c=L(a.alts,u=>u+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:t,alternation:e,ambiguityIndices:c,prefixPath:a.path}),type:Mt.AMBIGUOUS_ALTS,ruleName:t.name,occurrence:e.idx,alternatives:a.alts}})}function Pq(r,e,t,n){let i=lt(r,(s,a,c)=>{let l=L(a,u=>({idx:c,path:u}));return s.concat(l)},[]);return Gn(er(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let c=s.idx,l=s.path,u=Gt(i,m=>e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<c&&iS(m.path,l));return L(u,m=>{let T=[m.idx+1,c+1],A=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:t,alternation:e,ambiguityIndices:T,prefixPath:m.path}),type:Mt.AMBIGUOUS_PREFIX_ALTS,ruleName:t.name,occurrence:A,alternatives:T}})}))}function Dq(r,e,t){let n=[],i=L(e,o=>o.name);return G(r,o=>{let s=o.name;if(et(i,s)){let a=t.buildNamespaceConflictError(o);n.push({message:a,type:Mt.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function pS(r){let e=ra(r,{errMsgProvider:Yw}),t={};return G(r.rules,n=>{t[n.name]=n}),Jw(t,e.errMsgProvider)}function mS(r){return r=ra(r,{errMsgProvider:xn}),aS(r.rules,r.tokenTypes,r.errMsgProvider,r.grammarName)}var hS="MismatchedTokenException",gS="NoViableAltException",yS="EarlyExitException",TS="NotAllInputParsedException",vS=[hS,gS,yS,TS];Object.freeze(vS);function Qi(r){return et(vS,r.name)}var pa=class extends Error{constructor(e,t){super(e),this.token=t,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},Oo=class extends pa{constructor(e,t,n){super(e,t),this.previousToken=n,this.name=hS}},Fc=class extends pa{constructor(e,t,n){super(e,t),this.previousToken=n,this.name=gS}},qc=class extends pa{constructor(e,t){super(e,t),this.name=TS}},Uc=class extends pa{constructor(e,t,n){super(e,t),this.previousToken=n,this.name=yS}};var gg={},Tg="InRuleRecoveryException",yg=class extends Error{constructor(e){super(e),this.name=Tg}},Zf=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=K(e,"recoveryEnabled")?e.recoveryEnabled:xr.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=Oq)}getTokenToInsert(e){let t=Do(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return t.isInsertedInRecovery=!0,t}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,t,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],c=!1,l=this.LA(1),u=this.LA(1),f=()=>{let m=this.LA(0),T=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:l,previous:m,ruleName:this.getCurrRuleFullName()}),A=new Oo(T,l,this.LA(0));A.resyncedTokens=mi(a),this.SAVE_ERROR(A)};for(;!c;)if(this.tokenMatcher(u,i)){f();return}else if(n.call(this)){f(),e.apply(this,t);return}else this.tokenMatcher(u,o)?c=!0:(u=this.SKIP_TOKEN(),this.addToResyncTokens(u,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,t,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,t)))}getFollowsForInRuleRecovery(e,t){let n=this.getCurrentGrammarPath(e,t);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,t){if(this.canRecoverWithSingleTokenInsertion(e,t))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new yg("sad sad panda")}canPerformInRuleRecovery(e,t){return this.canRecoverWithSingleTokenInsertion(e,t)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,t){if(!this.canTokenTypeBeInsertedInRecovery(e)||se(t))return!1;let n=this.LA(1);return Hn(t,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let t=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(t);return et(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),t=this.LA(1),n=2;for(;;){let i=Hn(e,o=>Pc(t,o));if(i!==void 0)return i;t=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return gg;let e=this.getLastExplicitRuleShortName(),t=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:t,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,t=this.RULE_OCCURRENCE_STACK;return L(e,(n,i)=>i===0?gg:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:t[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=L(this.buildFullFollowKeyStack(),t=>this.getFollowSetFromFollowKey(t));return vt(e)}getFollowSetFromFollowKey(e){if(e===gg)return[vn];let t=e.ruleName+e.idxInCallingRule+Mf+e.inRule;return this.resyncFollows[t]}addToResyncTokens(e,t){return this.tokenMatcher(e,vn)||t.push(e),t}reSyncTo(e){let t=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,t);return mi(t)}attemptInRepetitionRecovery(e,t,n,i,o,s,a){}getCurrentGrammarPath(e,t){let n=this.getHumanReadableRuleStack(),i=Ke(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:t}}getHumanReadableRuleStack(){return L(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function Oq(r,e,t,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),c=this.firstAfterRepMap[a];if(c===void 0){let m=this.getCurrRuleFullName(),T=this.getGAstProductions()[m];c=new o(T,i).startWalking(),this.firstAfterRepMap[a]=c}let l=c.token,u=c.occurrence,f=c.isEndOfRule;this.RULE_STACK.length===1&&f&&l===void 0&&(l=vn,u=1),!(l===void 0||u===void 0)&&this.shouldInRepetitionRecoveryBeTried(l,u,s)&&this.tryInRepetitionRecovery(r,e,t,l)}function ed(r,e,t){return t|e|r}var Xre=32-8;var xi=class{constructor(e){var t;this.maxLookahead=(t=e?.maxLookahead)!==null&&t!==void 0?t:xr.maxLookahead}validate(e){let t=this.validateNoLeftRecursion(e.rules);if(se(t)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...t,...n,...i,...o]}return t}validateNoLeftRecursion(e){return er(e,t=>hg(t,t,xn))}validateEmptyOrAlternatives(e){return er(e,t=>uS(t,xn))}validateAmbiguousAlternationAlternatives(e,t){return er(e,n=>fS(n,t,xn))}validateSomeNonEmptyLookaheadPath(e,t){return dS(e,t,xn)}buildLookaheadForAlternation(e){return Zw(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,tS)}buildLookaheadForOptional(e){return eS(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,Lc(e.prodType),rS)}};var rd=class{initLooksAhead(e){this.dynamicTokensEnabled=K(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:xr.dynamicTokensEnabled,this.maxLookahead=K(e,"maxLookahead")?e.maxLookahead:xr.maxLookahead,this.lookaheadStrategy=K(e,"lookaheadStrategy")?e.lookaheadStrategy:new xi({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){G(e,t=>{this.TRACE_INIT(`${t.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:c}=Lq(t);G(n,l=>{let u=l.idx===0?"":l.idx;this.TRACE_INIT(`${$r(l)}${u}`,()=>{let f=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:l.idx,rule:t,maxLookahead:l.maxLookahead||this.maxLookahead,hasPredicates:l.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),m=ed(this.fullRuleNameToShort[t.name],256,l.idx);this.setLaFuncCache(m,f)})}),G(i,l=>{this.computeLookaheadFunc(t,l.idx,768,"Repetition",l.maxLookahead,$r(l))}),G(o,l=>{this.computeLookaheadFunc(t,l.idx,512,"Option",l.maxLookahead,$r(l))}),G(s,l=>{this.computeLookaheadFunc(t,l.idx,1024,"RepetitionMandatory",l.maxLookahead,$r(l))}),G(a,l=>{this.computeLookaheadFunc(t,l.idx,1536,"RepetitionMandatoryWithSeparator",l.maxLookahead,$r(l))}),G(c,l=>{this.computeLookaheadFunc(t,l.idx,1280,"RepetitionWithSeparator",l.maxLookahead,$r(l))})})})}computeLookaheadFunc(e,t,n,i,o,s){this.TRACE_INIT(`${s}${t===0?"":t}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:t,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),c=ed(this.fullRuleNameToShort[e.name],n,t);this.setLaFuncCache(c,a)})}getKeyForAutomaticLookahead(e,t){let n=this.getLastExplicitRuleShortName();return ed(n,e,t)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,t){this.lookAheadFuncsCache.set(e,t)}},vg=class extends vr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},td=new vg;function Lq(r){td.reset(),r.accept(td);let e=td.dslMethods;return td.reset(),e}function bg(r,e){isNaN(r.startOffset)===!0?(r.startOffset=e.startOffset,r.endOffset=e.endOffset):r.endOffset<e.endOffset&&(r.endOffset=e.endOffset)}function Ag(r,e){isNaN(r.startOffset)===!0?(r.startOffset=e.startOffset,r.startColumn=e.startColumn,r.startLine=e.startLine,r.endOffset=e.endOffset,r.endColumn=e.endColumn,r.endLine=e.endLine):r.endOffset<e.endOffset&&(r.endOffset=e.endOffset,r.endColumn=e.endColumn,r.endLine=e.endLine)}function xS(r,e,t){r.children[t]===void 0?r.children[t]=[e]:r.children[t].push(e)}function RS(r,e,t){r.children[e]===void 0?r.children[e]=[t]:r.children[e].push(t)}var Mq="name";function wg(r,e){Object.defineProperty(r,Mq,{enumerable:!1,configurable:!0,writable:!1,value:e})}function Fq(r,e){let t=He(r),n=t.length;for(let i=0;i<n;i++){let o=t[i],s=r[o],a=s.length;for(let c=0;c<a;c++){let l=s[c];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}}function bS(r,e){let t=function(){};wg(t,r+"BaseSemantics");let n={visit:function(i,o){if(V(i)&&(i=i[0]),!ur(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=qq(this,e);if(!se(i)){let o=L(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return t.prototype=n,t.prototype.constructor=t,t._RULE_NAMES=e,t}function AS(r,e,t){let n=function(){};wg(n,r+"BaseSemanticsWithDefaults");let i=Object.create(t.prototype);return G(e,o=>{i[o]=Fq}),n.prototype=i,n.prototype.constructor=n,n}var Sg;(function(r){r[r.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",r[r.MISSING_METHOD=1]="MISSING_METHOD"})(Sg||(Sg={}));function qq(r,e){return Uq(r,e)}function Uq(r,e){let t=Gt(e,i=>yr(r[i])===!1),n=L(t,i=>({msg:`Missing visitor method: <${i}> on ${r.constructor.name} CST Visitor.`,type:Sg.MISSING_METHOD,methodName:i}));return Gn(n)}var sd=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=K(e,"nodeLocationTracking")?e.nodeLocationTracking:xr.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=ct,this.cstFinallyStateUpdate=ct,this.cstPostTerminal=ct,this.cstPostNonTerminal=ct,this.cstPostRule=ct;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Ag,this.setNodeLocationFromNode=Ag,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=bg,this.setNodeLocationFromNode=bg,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=ct,this.setInitialNodeLocation=ct;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let t=this.LA(1);e.location={startOffset:t.startOffset,startLine:t.startLine,startColumn:t.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let t={name:e,children:Object.create(null)};this.setInitialNodeLocation(t),this.CST_STACK.push(t)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let t=this.LA(0),n=e.location;n.startOffset<=t.startOffset?(n.endOffset=t.endOffset,n.endLine=t.endLine,n.endColumn=t.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let t=this.LA(0),n=e.location;n.startOffset<=t.startOffset?n.endOffset=t.endOffset:n.startOffset=NaN}cstPostTerminal(e,t){let n=this.CST_STACK[this.CST_STACK.length-1];xS(n,t,e),this.setNodeLocationFromToken(n.location,t)}cstPostNonTerminal(e,t){let n=this.CST_STACK[this.CST_STACK.length-1];RS(n,t,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(ur(this.baseCstVisitorConstructor)){let e=bS(this.className,He(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(ur(this.baseCstVisitorWithDefaultsConstructor)){let e=AS(this.className,He(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var ad=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):ma}LA(e){let t=this.currIdx+e;return t<0||this.tokVectorLength<=t?ma:this.tokVector[t]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var cd=class{ACTION(e){return e.call(this)}consume(e,t,n){return this.consumeInternal(t,e,n)}subrule(e,t,n){return this.subruleInternal(t,e,n)}option(e,t){return this.optionInternal(t,e)}or(e,t){return this.orInternal(t,e)}many(e,t){return this.manyInternal(e,t)}atLeastOne(e,t){return this.atLeastOneInternal(e,t)}CONSUME(e,t){return this.consumeInternal(e,0,t)}CONSUME1(e,t){return this.consumeInternal(e,1,t)}CONSUME2(e,t){return this.consumeInternal(e,2,t)}CONSUME3(e,t){return this.consumeInternal(e,3,t)}CONSUME4(e,t){return this.consumeInternal(e,4,t)}CONSUME5(e,t){return this.consumeInternal(e,5,t)}CONSUME6(e,t){return this.consumeInternal(e,6,t)}CONSUME7(e,t){return this.consumeInternal(e,7,t)}CONSUME8(e,t){return this.consumeInternal(e,8,t)}CONSUME9(e,t){return this.consumeInternal(e,9,t)}SUBRULE(e,t){return this.subruleInternal(e,0,t)}SUBRULE1(e,t){return this.subruleInternal(e,1,t)}SUBRULE2(e,t){return this.subruleInternal(e,2,t)}SUBRULE3(e,t){return this.subruleInternal(e,3,t)}SUBRULE4(e,t){return this.subruleInternal(e,4,t)}SUBRULE5(e,t){return this.subruleInternal(e,5,t)}SUBRULE6(e,t){return this.subruleInternal(e,6,t)}SUBRULE7(e,t){return this.subruleInternal(e,7,t)}SUBRULE8(e,t){return this.subruleInternal(e,8,t)}SUBRULE9(e,t){return this.subruleInternal(e,9,t)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,t,n=ha){if(et(this.definedRulesNames,e)){let s={message:xn.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:Mt.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,t,n);return this[e]=i,i}OVERRIDE_RULE(e,t,n=ha){let i=lS(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,t,n);return this[e]=o,o}BACKTRACK(e,t){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,t),!0}catch(i){if(Qi(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return Lf(Pe(this.gastProductionsCache))}};var ld=class{initRecognizerEngine(e,t){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=la,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},K(t,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(V(e)){if(se(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(V(e))this.tokensMap=lt(e,(o,s)=>(o[s.name]=s,o),{});else if(K(e,"modes")&&lr(vt(Pe(e.modes)),Gw)){let o=vt(Pe(e.modes)),s=na(o);this.tokensMap=lt(s,(a,c)=>(a[c.name]=c,a),{})}else if(at(e))this.tokensMap=Ke(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=vn;let n=K(e,"modes")?vt(Pe(e.modes)):Pe(e),i=lr(n,o=>se(o.categoryMatches));this.tokenMatcher=i?la:gi,yi(Pe(this.tokensMap))}defineRule(e,t,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=K(n,"resyncEnabled")?n.resyncEnabled:ha.resyncEnabled,o=K(n,"recoveryValueFunc")?n.recoveryValueFunc:ha.recoveryValueFunc,s=this.ruleShortNameIdx<<4+8;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...u){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),t.apply(this,u);let f=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(f),f}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...u){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),t.apply(this,u)}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:t})}invokeRuleCatch(e,t,n){let i=this.RULE_STACK.length===1,o=t&&!this.isBackTracking()&&this.recoveryEnabled;if(Qi(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];return c.recoveredNode=!0,c}else return n(e);else{if(this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];c.recoveredNode=!0,s.partialCstResult=c}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,t){let n=this.getKeyForAutomaticLookahead(512,t);return this.optionInternalLogic(e,t,n)}optionInternalLogic(e,t,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,t){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,t,n)}atLeastOneInternalLogic(e,t,n){let i=this.getLaFuncFromCache(n),o;if(typeof t!="function"){o=t.DEF;let s=t.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=t;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY,t.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,t],i,1024,e,Wf)}atLeastOneSepFirstInternal(e,t){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,t,n)}atLeastOneSepFirstInternalLogic(e,t,n){let i=t.DEF,o=t.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Oc],a,1536,e,Oc)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,t.ERR_MSG)}manyInternal(e,t){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,t,n)}manyInternalLogic(e,t,n){let i=this.getLaFuncFromCache(n),o;if(typeof t!="function"){o=t.DEF;let a=t.GATE;if(a!==void 0){let c=i;i=()=>a.call(this)&&c.call(this)}}else o=t;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,t],i,768,e,Kf,s)}manySepFirstInternal(e,t){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,t,n)}manySepFirstInternalLogic(e,t,n){let i=t.DEF,o=t.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Dc],a,1280,e,Dc)}}repetitionSepSecondInternal(e,t,n,i,o){for(;n();)this.CONSUME(t),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,t,n,i,o],n,1536,e,o)}doSingleRepetition(e){let t=this.getLexerPosition();return e.call(this),this.getLexerPosition()>t}orInternal(e,t){let n=this.getKeyForAutomaticLookahead(256,t),i=V(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(t,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),t=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new qc(t,e))}}subruleInternal(e,t,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=t,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,t,n){throw Qi(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,t!==void 0&&t.LABEL!==void 0?t.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,t,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,t,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,t,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:t,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Oo(i,t,o))}consumeInternalRecovery(e,t,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,t);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===Tg?n:o}}else throw n}saveRecogState(){let e=this.errors,t=Ke(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:t,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,t,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(t)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),vn)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var ud=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=K(e,"errorMessageProvider")?e.errorMessageProvider:xr.errorMessageProvider}SAVE_ERROR(e){if(Qi(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:Ke(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return Ke(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,t,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=da(e,o,t,this.maxLookahead)[0],c=[];for(let u=1;u<=this.maxLookahead;u++)c.push(this.LA(u));let l=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:c,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new Uc(l,this.LA(1),this.LA(0)))}raiseNoAltException(e,t){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=fa(e,i,this.maxLookahead),s=[];for(let l=1;l<=this.maxLookahead;l++)s.push(this.LA(l));let a=this.LA(0),c=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:t,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new Fc(c,this.LA(1),a))}};var fd=class{initContentAssist(){}computeContentAssist(e,t){let n=this.gastProductionsCache[e];if(ur(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return zf([n],t,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let t=jt(e.ruleStack),i=this.getGAstProductions()[t];return new Bf(i,e).startWalking()}};var md={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(md);var wS=!0,SS=Math.pow(2,8)-1,kS=Hf({name:"RECORDING_PHASE_TOKEN",pattern:gt.NA});yi([kS]);var ES=Do(kS,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(ES);var jq={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},dd=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let t=e>0?e:"";this[`CONSUME${t}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${t}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${t}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${t}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${t}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${t}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${t}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${t}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,t,n){return this.consumeInternalRecord(t,e,n)},this.subrule=function(e,t,n){return this.subruleInternalRecord(t,e,n)},this.option=function(e,t){return this.optionInternalRecord(t,e)},this.or=function(e,t){return this.orInternalRecord(t,e)},this.many=function(e,t){this.manyInternalRecord(e,t)},this.atLeastOne=function(e,t){this.atLeastOneInternalRecord(e,t)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let t=0;t<10;t++){let n=t>0?t:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,t){return()=>!0}LA_RECORD(e){return ma}topLevelRuleRecord(e,t){try{let n=new Tr({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),t.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,t){return jc.call(this,ke,e,t)}atLeastOneInternalRecord(e,t){jc.call(this,Ve,t,e)}atLeastOneSepFirstInternalRecord(e,t){jc.call(this,ze,t,e,wS)}manyInternalRecord(e,t){jc.call(this,pe,t,e)}manySepFirstInternalRecord(e,t){jc.call(this,Me,t,e,wS)}orInternalRecord(e,t){return Hq.call(this,e,t)}subruleInternalRecord(e,t,n){if(pd(t),!e||K(e,"ruleName")===!1){let a=new Error(`<SUBRULE${CS(t)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=jn(this.recordingProdStack),o=e.ruleName,s=new Ce({idx:t,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?jq:md}consumeInternalRecord(e,t,n){if(pd(t),!sg(e)){let s=new Error(`<CONSUME${CS(t)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=jn(this.recordingProdStack),o=new ae({idx:t,terminalType:e,label:n?.LABEL});return i.definition.push(o),ES}};function jc(r,e,t,n=!1){pd(t);let i=jn(this.recordingProdStack),o=yr(e)?e:e.DEF,s=new r({definition:[],idx:t});return n&&(s.separator=e.SEP),K(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),md}function Hq(r,e){pd(e);let t=jn(this.recordingProdStack),n=V(r)===!1,i=n===!1?r:r.DEF,o=new Fe({definition:[],idx:e,ignoreAmbiguities:n&&r.IGNORE_AMBIGUITIES===!0});K(r,"MAX_LOOKAHEAD")&&(o.maxLookahead=r.MAX_LOOKAHEAD);let s=kc(i,a=>yr(a.GATE));return o.hasPredicates=s,t.definition.push(o),G(i,a=>{let c=new We({definition:[]});o.definition.push(c),K(a,"IGNORE_AMBIGUITIES")?c.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:K(a,"GATE")&&(c.ignoreAmbiguities=!0),this.recordingProdStack.push(c),a.ALT.call(this),this.recordingProdStack.pop()}),md}function CS(r){return r===0?"":`${r}`}function pd(r){if(r<0||r>SS){let e=new Error(`Invalid DSL Method idx value: <${r}>
	Idx value must be a none negative value smaller than ${SS+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var hd=class{initPerformanceTracer(e){if(K(e,"traceInitPerf")){let t=e.traceInitPerf,n=typeof t=="number";this.traceInitMaxIdent=n?t:1/0,this.traceInitPerf=n?t>0:t}else this.traceInitMaxIdent=0,this.traceInitPerf=xr.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,t){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=$c(t),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return t()}};function $S(r,e){e.forEach(t=>{let n=t.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(r.prototype,i,o):r.prototype[i]=t.prototype[i]})})}var ma=Do(vn,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(ma);var xr=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:vi,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),ha=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),Mt;(function(r){r[r.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",r[r.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",r[r.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",r[r.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",r[r.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",r[r.LEFT_RECURSION=5]="LEFT_RECURSION",r[r.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",r[r.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",r[r.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",r[r.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",r[r.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",r[r.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",r[r.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",r[r.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Mt||(Mt={}));function gd(r=void 0){return function(){return r}}var Hc=class r{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let t=this.className;this.TRACE_INIT("toFastProps",()=>{Nc(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),G(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=pS({rules:Pe(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(se(n)&&this.skipValidations===!1){let i=mS({rules:Pe(this.gastProductionsCache),tokenTypes:Pe(this.tokensMap),errMsgProvider:xn,grammarName:t}),o=sS({lookaheadStrategy:this.lookaheadStrategy,rules:Pe(this.gastProductionsCache),tokenTypes:Pe(this.tokensMap),grammarName:t});this.definitionErrors=this.definitionErrors.concat(i,o)}}),se(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=Rw(Pe(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:Pe(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(Pe(this.gastProductionsCache))})),!r.DEFER_DEFINITION_ERRORS_HANDLING&&!se(this.definitionErrors))throw e=L(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,t){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(t),n.initLexerAdapter(),n.initLooksAhead(t),n.initRecognizerEngine(e,t),n.initRecoverable(t),n.initTreeBuilder(t),n.initContentAssist(),n.initGastRecorder(t),n.initPerformanceTracer(t),K(t,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=K(t,"skipValidations")?t.skipValidations:xr.skipValidations}};Hc.DEFER_DEFINITION_ERRORS_HANDLING=!1;$S(Hc,[Zf,rd,sd,ad,ld,cd,ud,fd,dd,hd]);var Bc=class extends Hc{constructor(e,t=xr){let n=Ke(t);n.outputCst=!1,super(e,n)}};function Lo(r,e,t){return`${r.name}_${e}_${t}`}var Zi=1,Kq=2,NS=4,_S=5;var Ta=7,Wq=8,Vq=9,zq=10,Xq=11,IS=12,Kc=class{constructor(e){this.target=e}isEpsilon(){return!1}},ga=class extends Kc{constructor(e,t){super(e),this.tokenType=t}},Wc=class extends Kc{constructor(e){super(e)}isEpsilon(){return!0}},ya=class extends Kc{constructor(e,t,n){super(e),this.rule=t,this.followState=n}isEpsilon(){return!0}};function PS(r){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};Yq(e,r);let t=r.length;for(let n=0;n<t;n++){let i=r[n],o=Mo(e,i,i);o!==void 0&&aU(e,i,o)}return e}function Yq(r,e){let t=e.length;for(let n=0;n<t;n++){let i=e[n],o=Ht(r,i,void 0,{type:Kq}),s=Ht(r,i,void 0,{type:Ta});o.stop=s,r.ruleToStartState.set(i,o),r.ruleToStopState.set(i,s)}}function DS(r,e,t){return t instanceof ae?kg(r,e,t.terminalType,t):t instanceof Ce?sU(r,e,t):t instanceof Fe?tU(r,e,t):t instanceof ke?rU(r,e,t):t instanceof pe?Jq(r,e,t):t instanceof Me?Qq(r,e,t):t instanceof Ve?Zq(r,e,t):t instanceof ze?eU(r,e,t):Mo(r,e,t)}function Jq(r,e,t){let n=Ht(r,e,t,{type:_S});eo(r,n);let i=va(r,e,n,t,Mo(r,e,t));return LS(r,e,t,i)}function Qq(r,e,t){let n=Ht(r,e,t,{type:_S});eo(r,n);let i=va(r,e,n,t,Mo(r,e,t)),o=kg(r,e,t.separator,t);return LS(r,e,t,i,o)}function Zq(r,e,t){let n=Ht(r,e,t,{type:NS});eo(r,n);let i=va(r,e,n,t,Mo(r,e,t));return OS(r,e,t,i)}function eU(r,e,t){let n=Ht(r,e,t,{type:NS});eo(r,n);let i=va(r,e,n,t,Mo(r,e,t)),o=kg(r,e,t.separator,t);return OS(r,e,t,i,o)}function tU(r,e,t){let n=Ht(r,e,t,{type:Zi});eo(r,n);let i=L(t.definition,s=>DS(r,e,s));return va(r,e,n,t,...i)}function rU(r,e,t){let n=Ht(r,e,t,{type:Zi});eo(r,n);let i=va(r,e,n,t,Mo(r,e,t));return nU(r,e,t,i)}function Mo(r,e,t){let n=Gt(L(t.definition,i=>DS(r,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:oU(r,n)}function OS(r,e,t,n,i){let o=n.left,s=n.right,a=Ht(r,e,t,{type:Xq});eo(r,a);let c=Ht(r,e,t,{type:IS});return o.loopback=a,c.loopback=a,r.decisionMap[Lo(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",t.idx)]=a,It(s,a),i===void 0?(It(a,o),It(a,c)):(It(a,c),It(a,i.left),It(i.right,o)),{left:o,right:c}}function LS(r,e,t,n,i){let o=n.left,s=n.right,a=Ht(r,e,t,{type:zq});eo(r,a);let c=Ht(r,e,t,{type:IS}),l=Ht(r,e,t,{type:Vq});return a.loopback=l,c.loopback=l,It(a,o),It(a,c),It(s,l),i!==void 0?(It(l,c),It(l,i.left),It(i.right,o)):It(l,a),r.decisionMap[Lo(e,i?"RepetitionWithSeparator":"Repetition",t.idx)]=a,{left:a,right:c}}function nU(r,e,t,n){let i=n.left,o=n.right;return It(i,o),r.decisionMap[Lo(e,"Option",t.idx)]=i,n}function eo(r,e){return r.decisionStates.push(e),e.decision=r.decisionStates.length-1,e.decision}function va(r,e,t,n,...i){let o=Ht(r,e,n,{type:Wq,start:t});t.end=o;for(let a of i)a!==void 0?(It(t,a.left),It(a.right,o)):It(t,o);let s={left:t,right:o};return r.decisionMap[Lo(e,iU(n),n.idx)]=t,s}function iU(r){if(r instanceof Fe)return"Alternation";if(r instanceof ke)return"Option";if(r instanceof pe)return"Repetition";if(r instanceof Me)return"RepetitionWithSeparator";if(r instanceof Ve)return"RepetitionMandatory";if(r instanceof ze)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function oU(r,e){let t=e.length;for(let o=0;o<t-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let c=a instanceof ya,l=a,u=e[o+1].left;s.left.type===Zi&&s.right.type===Zi&&a!==void 0&&(c&&l.followState===s.right||a.target===s.right)?(c?l.followState=u:a.target=u,cU(r,s.right)):It(s.right,u)}let n=e[0],i=e[t-1];return{left:n.left,right:i.right}}function kg(r,e,t,n){let i=Ht(r,e,n,{type:Zi}),o=Ht(r,e,n,{type:Zi});return Eg(i,new ga(o,t)),{left:i,right:o}}function sU(r,e,t){let n=t.referencedRule,i=r.ruleToStartState.get(n),o=Ht(r,e,t,{type:Zi}),s=Ht(r,e,t,{type:Zi}),a=new ya(i,n,s);return Eg(o,a),{left:o,right:s}}function aU(r,e,t){let n=r.ruleToStartState.get(e);It(n,t.left);let i=r.ruleToStopState.get(e);return It(t.right,i),{left:n,right:i}}function It(r,e){let t=new Wc(e);Eg(r,t)}function Ht(r,e,t,n){let i=Object.assign({atn:r,production:t,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:r.states.length},n);return r.states.push(i),i}function Eg(r,e){r.transitions.length===0&&(r.epsilonOnlyTransitions=e.isEpsilon()),r.transitions.push(e)}function cU(r,e){r.states.splice(r.states.indexOf(e),1)}var Vc={},xa=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let t=$g(e);t in this.map||(this.map[t]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return L(this.configs,e=>e.alt)}get key(){let e="";for(let t in this.map)e+=t+":";return e}};function $g(r,e=!0){return`${e?`a${r.alt}`:""}s${r.state.stateNumber}:${r.stack.map(t=>t.stateNumber.toString()).join("_")}`}function lU(r,e){let t={};return n=>{let i=n.toString(),o=t[i];return o!==void 0||(o={atnStartState:r,decision:e,states:{}},t[i]=o),o}}var yd=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,t){this.predicates[e]=t}toString(){let e="",t=this.predicates.length;for(let n=0;n<t;n++)e+=this.predicates[n]===!0?"1":"0";return e}},MS=new yd,zc=class extends xi{constructor(e){var t;super(),this.logging=(t=e?.logging)!==null&&t!==void 0?t:n=>console.log(n)}initialize(e){this.atn=PS(e.rules),this.dfas=uU(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:t,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Lo(n,"Alternation",t),u=this.atn.decisionMap[c].decision,f=L(Yf({maxLookahead:1,occurrence:t,prodType:"Alternation",rule:n}),m=>L(m,T=>T[0]));if(FS(f,!1)&&!o){let m=lt(f,(T,A,S)=>(G(A,N=>{N&&(T[N.tokenTypeIdx]=S,G(N.categoryMatches,C=>{T[C]=S}))}),T),{});return i?function(T){var A;let S=this.LA(1),N=m[S.tokenTypeIdx];if(T!==void 0&&N!==void 0){let C=(A=T[N])===null||A===void 0?void 0:A.GATE;if(C!==void 0&&C.call(this)===!1)return}return N}:function(){let T=this.LA(1);return m[T.tokenTypeIdx]}}else return i?function(m){let T=new yd,A=m===void 0?0:m.length;for(let N=0;N<A;N++){let C=m?.[N].GATE;T.set(N,C===void 0||C.call(this))}let S=Ng.call(this,s,u,T,a);return typeof S=="number"?S:void 0}:function(){let m=Ng.call(this,s,u,MS,a);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:t,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Lo(n,i,t),u=this.atn.decisionMap[c].decision,f=L(Yf({maxLookahead:1,occurrence:t,prodType:i,rule:n}),m=>L(m,T=>T[0]));if(FS(f)&&f[0][0]&&!o){let m=f[0],T=vt(m);if(T.length===1&&se(T[0].categoryMatches)){let S=T[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===S}}else{let A=lt(T,(S,N)=>(N!==void 0&&(S[N.tokenTypeIdx]=!0,G(N.categoryMatches,C=>{S[C]=!0})),S),{});return function(){let S=this.LA(1);return A[S.tokenTypeIdx]===!0}}}return function(){let m=Ng.call(this,s,u,MS,a);return typeof m=="object"?!1:m===0}}};function FS(r,e=!0){let t=new Set;for(let n of r){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(t.has(a)){if(!i.has(a))return!1}else t.add(a),i.add(a)}}return!0}function uU(r){let e=r.decisionStates.length,t=Array(e);for(let n=0;n<e;n++)t[n]=lU(r.decisionStates[n],n);return t}function Ng(r,e,t,n){let i=r[e](t),o=i.start;if(o===void 0){let a=RU(i.atnStartState);o=GS(i,US(a)),i.start=o}return fU.apply(this,[i,o,t,n])}function fU(r,e,t,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let c=yU(i,a);if(c===void 0&&(c=dU.apply(this,[r,i,a,o,t,n])),c===Vc)return gU(s,i,a);if(c.isAcceptState===!0)return c.prediction;i=c,s.push(a),a=this.LA(o++)}}function dU(r,e,t,n,i,o){let s=TU(e.configs,t,i);if(s.size===0)return qS(r,e,t,Vc),Vc;let a=US(s),c=xU(s,i);if(c!==void 0)a.isAcceptState=!0,a.prediction=c,a.configs.uniqueAlt=c;else if(SU(s)){let l=dw(s.alts);a.isAcceptState=!0,a.prediction=l,a.configs.uniqueAlt=l,pU.apply(this,[r,n,s.alts,o])}return a=qS(r,e,t,a),a}function pU(r,e,t,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let o=r.atnStartState,s=o.rule,a=o.production,c=mU({topLevelRule:s,ambiguityIndices:t,production:a,prefixPath:i});n(c)}function mU(r){let e=L(r.prefixPath,i=>Ti(i)).join(", "),t=r.production.idx===0?"":r.production.idx,n=`Ambiguous Alternatives Detected: <${r.ambiguityIndices.join(", ")}> in <${hU(r.production)}${t}> inside <${r.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function hU(r){if(r instanceof Ce)return"SUBRULE";if(r instanceof ke)return"OPTION";if(r instanceof Fe)return"OR";if(r instanceof Ve)return"AT_LEAST_ONE";if(r instanceof ze)return"AT_LEAST_ONE_SEP";if(r instanceof Me)return"MANY_SEP";if(r instanceof pe)return"MANY";if(r instanceof ae)return"CONSUME";throw Error("non exhaustive match")}function gU(r,e,t){let n=er(e.configs.elements,o=>o.state.transitions),i=vw(n.filter(o=>o instanceof ga).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:t,possibleTokenTypes:i,tokenPath:r}}function yU(r,e){return r.edges[e.tokenTypeIdx]}function TU(r,e,t){let n=new xa,i=[];for(let s of r.elements){if(t.is(s.alt)===!1)continue;if(s.state.type===Ta){i.push(s);continue}let a=s.state.transitions.length;for(let c=0;c<a;c++){let l=s.state.transitions[c],u=vU(l,e);u!==void 0&&n.add({state:u,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new xa;for(let s of n.elements)Td(s,o)}if(i.length>0&&!AU(o))for(let s of i)o.add(s);return o}function vU(r,e){if(r instanceof ga&&Pc(e,r.tokenType))return r.target}function xU(r,e){let t;for(let n of r.elements)if(e.is(n.alt)===!0){if(t===void 0)t=n.alt;else if(t!==n.alt)return}return t}function US(r){return{configs:r,edges:{},isAcceptState:!1,prediction:-1}}function qS(r,e,t,n){return n=GS(r,n),e.edges[t.tokenTypeIdx]=n,n}function GS(r,e){if(e===Vc)return e;let t=e.configs.key,n=r.states[t];return n!==void 0?n:(e.configs.finalize(),r.states[t]=e,e)}function RU(r){let e=new xa,t=r.transitions.length;for(let n=0;n<t;n++){let o={state:r.transitions[n].target,alt:n,stack:[]};Td(o,e)}return e}function Td(r,e){let t=r.state;if(t.type===Ta){if(r.stack.length>0){let i=[...r.stack],s={state:i.pop(),alt:r.alt,stack:i};Td(s,e)}else e.add(r);return}t.epsilonOnlyTransitions||e.add(r);let n=t.transitions.length;for(let i=0;i<n;i++){let o=t.transitions[i],s=bU(r,o);s!==void 0&&Td(s,e)}}function bU(r,e){if(e instanceof Wc)return{state:e.target,alt:r.alt,stack:r.stack};if(e instanceof ya){let t=[...r.stack,e.followState];return{state:e.target,alt:r.alt,stack:t}}}function AU(r){for(let e of r.elements)if(e.state.type===Ta)return!0;return!1}function wU(r){for(let e of r.elements)if(e.state.type!==Ta)return!1;return!0}function SU(r){if(wU(r))return!0;let e=CU(r.elements);return kU(e)&&!EU(e)}function CU(r){let e=new Map;for(let t of r){let n=$g(t,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[t.alt]=!0}return e}function kU(r){for(let e of Array.from(r.values()))if(Object.keys(e).length>1)return!0;return!1}function EU(r){for(let e of Array.from(r.values()))if(Object.keys(e).length===1)return!0;return!1}var _g=de(uo(),1);var vd=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new Pg(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let t=new bd;return t.grammarSource=e,t.root=this.rootNode,this.current.content.push(t),this.nodeStack.push(t),t}buildLeafNode(e,t){let n=new Rd(e.startOffset,e.image.length,Qa(e),e.tokenType,!1);return n.grammarSource=t,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let t=e.container;if(t){let n=t.content.indexOf(e);n>=0&&t.content.splice(n,1)}}construct(e){let t=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=t;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let t of e){let n=new Rd(t.startOffset,t.image.length,Qa(t),t.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,t){let{offset:n,end:i}=t;for(let o=0;o<e.content.length;o++){let s=e.content[o],{offset:a,end:c}=s;if($n(s)&&n>a&&i<c){this.addHiddenToken(s,t);return}else if(i<=a){e.content.splice(o,0,t);return}}e.content.push(t)}},xd=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,t;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(t=this.container)===null||t===void 0?void 0:t.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},Rd=class extends xd{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,t,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=t,this._range=n}},bd=class extends xd{constructor(){super(...arguments),this.content=new Ig(this)}get children(){return this.content}get offset(){var e,t;return(t=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&t!==void 0?t:0}get length(){return this.end-this.offset}get end(){var e,t;return(t=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&t!==void 0?t:0}get range(){let e=this.firstNonHiddenNode,t=this.lastNonHiddenNode;if(e&&t){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=t;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:_g.Position.create(0,0),end:_g.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let t=this.content[e];if(!t.hidden)return t}return this.content[this.content.length-1]}},Ig=class r extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,r.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,t,...n){return this.addParents(n),super.splice(e,t,...n)}addParents(e){for(let t of e)t.container=this.parent}},Pg=class extends bd{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var Og=Symbol("Datatype");function Dg(r){return r.$type===Og}var jS="\u200B",HS=r=>r.endsWith(jS)?r:r+jS,Ad=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let t=this.lexer.definition;this.wrapper=new Mg(t,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,t){this.wrapper.wrapOr(e,t)}optional(e,t){this.wrapper.wrapOption(e,t)}many(e,t){this.wrapper.wrapMany(e,t)}atLeastOne(e,t){this.wrapper.wrapAtLeastOne(e,t)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},wd=class extends Ad{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new vd,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,t){let n=e.fragment?void 0:qr(e)?Og:hn(e),i=this.wrapper.DEFINE_RULE(HS(e.name),this.startImplementation(n,t).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let t=this.lexer.tokenize(e);this.wrapper.input=t.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(t.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:t.errors,parserErrors:this.wrapper.errors}}startImplementation(e,t){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===Og&&(o.value="")}let i;try{i=t(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,t,n){let i=this.wrapper.wrapConsume(e,t);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:s,isCrossRef:a}=this.getAssignment(n),c=this.current;if(s){let l=mt(n)?i.image:this.converter.convert(i.image,o);this.assign(s.operator,s.feature,l,o,a)}else if(Dg(c)){let l=i.image;mt(n)||(l=this.converter.convert(l,o).toString()),c.value+=l}}}subrule(e,t,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let s=this.wrapper.wrapSubrule(e,t,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(s,n,o)}performSubruleAssignment(e,t,n){let{assignment:i,isCrossRef:o}=this.getAssignment(t);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(Dg(s))s.value+=e.toString();else{let a=e.$type,c=this.assignWithoutOverride(e,s);a&&(c.$type=a);let l=c;this.stack.pop(),this.stack.push(l)}}}action(e,t){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&t.feature&&t.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),t.feature&&t.operator&&this.assign(t.operator,t.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let t=this.current;return Zv(t),this.nodeBuilder.construct(t),e&&this.stack.pop(),Dg(t)?this.converter.convert(t.value,t.$cstNode):(this.assignMandatoryProperties(t),t)}assignMandatoryProperties(e){let t=this.astReflection.getTypeMetaData(e.$type);for(let n of t.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let t=Ie(e,Re);this.assignmentMap.set(e,{assignment:t,isCrossRef:t?Xt(t.terminal):!1})}return this.assignmentMap.get(e)}assign(e,t,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,t,i,n):a=n,e){case"=":{s[t]=a;break}case"?=":{s[t]=!0;break}case"+=":Array.isArray(s[t])||(s[t]=[]),s[t].push(a)}}assignWithoutOverride(e,t){for(let[n,i]of Object.entries(t)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}},Lg=class{buildMismatchTokenMessage(e){return vi.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return vi.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return vi.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return vi.buildEarlyExitMessage(e)}},Xc=class extends Lg{buildMismatchTokenMessage({expected:e,actual:t}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${t.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},Sd=class extends Ad{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let t=this.lexer.tokenize(e);return this.tokens=t.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,t){let n=this.wrapper.DEFINE_RULE(HS(e.name),this.startImplementation(t).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return t=>{let n=this.keepStackSize();try{e(t)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,t,n){this.wrapper.wrapConsume(e,t),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,t,n,i){this.before(n),this.wrapper.wrapSubrule(e,t,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let t=this.elementStack.lastIndexOf(e);t>=0&&this.elementStack.splice(t)}}get currIdx(){return this.wrapper.currIdx}},$U={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new Xc},Mg=class extends Bc{constructor(e,t){let n=t&&"maxLookahead"in t;super(e,Object.assign(Object.assign(Object.assign({},$U),{lookaheadStrategy:n?new xi({maxLookahead:t.maxLookahead}):new zc}),t))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,t){return this.RULE(e,t)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,t){return this.consume(e,t)}wrapSubrule(e,t,n){return this.subrule(e,t,{ARGS:[n]})}wrapOr(e,t){this.or(e,t)}wrapOption(e,t){this.option(e,t)}wrapMany(e,t){this.many(e,t)}wrapAtLeastOne(e,t){this.atLeastOne(e,t)}};var Yc=class extends Error{constructor(e,t){super(e?`${t} at ${e.range.start.line}:${e.range.start.character}`:t)}};function Cd(r){throw new Error("Error! The input value was not handled.")}function Ed(r,e,t){return NU({parser:e,tokens:t,rules:new Map,ruleNames:new Map},r),e}function NU(r,e){let t=vs(e,!1),n=ie(e.rules).filter(B).filter(i=>t.has(i));for(let i of n){let o=Object.assign(Object.assign({},r),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,r.parser.rule(i,Fo(o,i.definition)))}}function Fo(r,e,t=!1){let n;if(mt(e))n=MU(r,e);else if(Ne(e))n=_U(r,e);else if(Re(e))n=Fo(r,e.terminal);else if(Xt(e))n=BS(r,e);else if(_e(e))n=IU(r,e);else if(Dr(e))n=DU(r,e);else if(Or(e))n=OU(r,e);else if(qt(e))n=LU(r,e);else throw new Yc(e.$cstNode,`Unexpected element type: ${e.$type}`);return KS(r,t?void 0:kd(e),n,e.cardinality)}function _U(r,e){let t=hn(e);return()=>r.parser.action(t,e)}function IU(r,e){let t=e.rule.ref;if(B(t)){let n=r.subrule++,i=e.arguments.length>0?PU(t,e.arguments):()=>({});return o=>r.parser.subrule(n,WS(r,t),e,i(o))}else if(we(t)){let n=r.consume++,i=Fg(r,t.name);return()=>r.parser.consume(n,i,e)}else if(t)Cd(t);else throw new Yc(e.$cstNode,`Undefined rule type: ${e.$type}`)}function PU(r,e){let t=e.map(n=>Ri(n.value));return n=>{let i={};for(let o=0;o<t.length;o++){let s=r.parameters[o],a=t[o];i[s.name]=a(n)}return i}}function Ri(r){if(Tv(r)){let e=Ri(r.left),t=Ri(r.right);return n=>e(n)||t(n)}else if(gv(r)){let e=Ri(r.left),t=Ri(r.right);return n=>e(n)&&t(n)}else if(Av(r)){let e=Ri(r.value);return t=>!e(t)}else if(cs(r)){let e=r.parameter.ref.name;return t=>t!==void 0&&t[e]===!0}else if(Rv(r)){let e=!!r.true;return()=>e}Cd(r)}function DU(r,e){if(e.elements.length===1)return Fo(r,e.elements[0]);{let t=[];for(let i of e.elements){let o={ALT:Fo(r,i,!0)},s=kd(i);s&&(o.GATE=Ri(s)),t.push(o)}let n=r.or++;return i=>r.parser.alternatives(n,t.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function OU(r,e){if(e.elements.length===1)return Fo(r,e.elements[0]);let t=[];for(let a of e.elements){let c={ALT:Fo(r,a,!0)},l=kd(a);l&&(c.GATE=Ri(l)),t.push(c)}let n=r.or++,i=(a,c)=>{let l=c.getRuleStack().join("-");return`uGroup_${a}_${l}`},o=a=>r.parser.alternatives(n,t.map((c,l)=>{let u={ALT:()=>!0},f=r.parser;u.ALT=()=>{if(c.ALT(a),!f.isRecording()){let T=i(n,f);f.unorderedGroups.get(T)||f.unorderedGroups.set(T,[]);let A=f.unorderedGroups.get(T);typeof A?.[l]>"u"&&(A[l]=!0)}};let m=c.GATE;return m?u.GATE=()=>m(a):u.GATE=()=>{let T=f.unorderedGroups.get(i(n,f));return!T?.[l]},u})),s=KS(r,kd(e),o,"*");return a=>{s(a),r.parser.isRecording()||r.parser.unorderedGroups.delete(i(n,r.parser))}}function LU(r,e){let t=e.elements.map(n=>Fo(r,n));return n=>t.forEach(i=>i(n))}function kd(r){if(qt(r))return r.guardCondition}function BS(r,e,t=e.terminal){if(t)if(_e(t)&&B(t.rule.ref)){let n=r.subrule++;return i=>r.parser.subrule(n,WS(r,t.rule.ref),e,i)}else if(_e(t)&&we(t.rule.ref)){let n=r.consume++,i=Fg(r,t.rule.ref.name);return()=>r.parser.consume(n,i,e)}else if(mt(t)){let n=r.consume++,i=Fg(r,t.value);return()=>r.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=gc(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+hn(e.type.ref));return BS(r,e,i)}}function MU(r,e){let t=r.consume++,n=r.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>r.parser.consume(t,n,e)}function KS(r,e,t,n){let i=e&&Ri(e);if(!n)if(i){let o=r.or++;return s=>r.parser.alternatives(o,[{ALT:()=>t(s),GATE:()=>i(s)},{ALT:gd(),GATE:()=>!i(s)}])}else return t;if(n==="*"){let o=r.many++;return s=>r.parser.many(o,{DEF:()=>t(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=r.many++;if(i){let s=r.or++;return a=>r.parser.alternatives(s,[{ALT:()=>r.parser.atLeastOne(o,{DEF:()=>t(a)}),GATE:()=>i(a)},{ALT:gd(),GATE:()=>!i(a)}])}else return s=>r.parser.atLeastOne(o,{DEF:()=>t(s)})}else if(n==="?"){let o=r.optional++;return s=>r.parser.optional(o,{DEF:()=>t(s),GATE:i?()=>i(s):void 0})}else Cd(n)}function WS(r,e){let t=FU(r,e),n=r.rules.get(t);if(!n)throw new Error(`Rule "${t}" not found."`);return n}function FU(r,e){if(B(e))return e.name;if(r.ruleNames.has(e))return r.ruleNames.get(e);{let t=e,n=t.$container,i=e.$type;for(;!B(n);)(qt(n)||Dr(n)||Or(n))&&(i=n.elements.indexOf(t).toString()+":"+i),t=n,n=n.$container;return i=n.name+":"+i,r.ruleNames.set(e,i),i}}function Fg(r,e){let t=r.tokens[e];if(!t)throw new Error(`Token "${e}" not found."`);return t}function VS(r){let e=r.Grammar,t=r.parser.Lexer,n=new Sd(r);return Ed(e,n,t.definition),n.finalize(),n}function zS(r){let e=qU(r);return e.finalize(),e}function qU(r){let e=r.Grammar,t=r.parser.Lexer,n=new wd(r);return Ed(e,n,t.definition)}var $d=class{buildTokens(e,t){let n=ie(vs(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,t);return i.forEach(s=>{let a=s.PATTERN;typeof a=="object"&&a&&"test"in a&&gh(a)?o.unshift(s):o.push(s)}),o}buildTerminalTokens(e){return e.filter(we).filter(t=>!t.fragment).map(t=>this.buildTerminalToken(t)).toArray()}buildTerminalToken(e){let t=Jr(e),n=t.flags.includes("u")?this.regexPatternFunction(t):t,i={name:e.name,PATTERN:n,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=gh(t)?gt.SKIPPED:"hidden"),i}regexPatternFunction(e){let t=new RegExp(e,e.flags+"y");return(n,i)=>(t.lastIndex=i,t.exec(n))}buildKeywordTokens(e,t,n){return e.filter(B).flatMap(i=>Qe(i).filter(mt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,t,!!n?.caseInsensitive))}buildKeywordToken(e,t,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,t)}}buildKeywordPattern(e,t){return t?new RegExp(Rx(e.value)):e.value}findLongerAlt(e,t){return t.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&bx("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var Nd=class{convert(e,t){let n=t.grammarSource;if(Xt(n)&&(n=Nu(n)),_e(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,t)}return e}runConverter(e,t,n){var i;switch(e.name.toUpperCase()){case"INT":return HU(t);case"STRING":return UU(t);case"ID":return jU(t)}switch((i=Co(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return WU(t);case"boolean":return VU(t);case"bigint":return BU(t);case"date":return KU(t);default:return t}}};function UU(r){let e="";for(let t=1;t<r.length-1;t++){let n=r.charAt(t);if(n==="\\"){let i=r.charAt(++t);e+=GU(i)}else e+=n}return e}function GU(r){switch(r){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return r}}function jU(r){return r.charAt(0)==="^"?r.substring(1):r}function HU(r){return parseInt(r)}function BU(r){return BigInt(r)}function KU(r){return new Date(r)}function WU(r){return Number(r)}function VU(r){return r.toLowerCase()==="true"}var XS=de(Ae(),1);var _d=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,t=XS.CancellationToken.None){for(let n of ni(e.parseResult.value))await Ze(t),ou(n).forEach(i=>this.doLink(i,e))}doLink(e,t){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if(ns(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}t.references.push(n)}unlink(e){for(let t of e.references)delete t._ref,delete t._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,t,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if($t(this._ref))return this._ref;if(tv(this._nodeDescription)){let c=o.loadAstNode(this._nodeDescription);this._ref=c??o.createLinkingError({reference:s,container:e,property:t},this._nodeDescription)}else if(this._ref===void 0){let c=o.getLinkedNode({reference:s,container:e,property:t});if(c.error&&ne(e).state<je.ComputedScopes)return;this._ref=(a=c.node)!==null&&a!==void 0?a:c.error,this._nodeDescription=c.descr}return $t(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return ns(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){try{let t=this.getCandidate(e);if(ns(t))return{error:t};let n=this.loadAstNode(t);return n?{node:n,descr:t}:{descr:t,error:this.createLinkingError(e,t)}}catch(t){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${t}`})}}}loadAstNode(e){if(e.node)return e.node;let t=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(t.parseResult.value,e.path)}createLinkingError(e,t){let n=ne(e.container);n.state<je.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:t})}};function JS(r){return typeof r.$comment=="string"}function YS(r){return typeof r=="object"&&!!r&&("$ref"in r||"$error"in r)}var Id=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,t){let n=t?.replacer,i=(s,a)=>this.replacer(s,a,t);return JSON.stringify(e,n?(s,a)=>n(s,a,i):i,t?.space)}deserialize(e){let t=JSON.parse(e);return this.linkNode(t,t),t}replacer(e,t,{refText:n,sourceText:i,textRegions:o,comments:s}={}){var a,c,l;if(!this.ignoreProperties.has(e))if(ei(t)){let u=t.ref,f=n?t.$refText:void 0;return u?{$refText:f,$ref:"#"+(u&&this.astNodeLocator.getAstNodePath(u))}:{$refText:f,$error:(c=(a=t.error)===null||a===void 0?void 0:a.message)!==null&&c!==void 0?c:"Could not resolve reference"}}else{let u;if(o&&$t(t)&&(u=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},t)),(!e||t.$document)&&u?.$textRegion))try{u.$textRegion.documentURI=ne(t).uri.toString()}catch{}return i&&!e&&$t(t)&&(u??(u=Object.assign({},t)),u.$sourceText=(l=t.$cstNode)===null||l===void 0?void 0:l.text),s&&$t(t)&&(u??(u=Object.assign({},t)),u.$comment=this.commentProvider.getComment(t)),u??t}}addAstNodeRegionWithAssignmentsTo(e){let t=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=t(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=Ii(e.$cstNode,o).map(t);s.length!==0&&(i[o]=s)}),e}}linkNode(e,t,n,i,o){for(let[a,c]of Object.entries(e))if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];YS(u)?c[l]=this.reviveReference(e,a,t,u):$t(u)&&this.linkNode(u,t,e,a,l)}else YS(c)?e[a]=this.reviveReference(e,a,t,c):$t(c)&&this.linkNode(c,t,e,a);let s=e;s.$container=n,s.$containerProperty=i,s.$containerIndex=o}reviveReference(e,t,n,i){let o=i.$refText;if(i.$ref){let s=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(s)),{$refText:o??"",ref:s}}else if(i.$error){let s={$refText:o??""};return s.error={container:e,property:t,message:i.$error,reference:s},s}else return}getRefNode(e,t){return this.astNodeLocator.getAstNode(e,t.substring(1))}};var Pd=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let t of this.singleton.LanguageMetaData.fileExtensions)this.map[t]=this.singleton;this.singleton=void 0}for(let t of e.LanguageMetaData.fileExtensions)this.map[t]!==void 0&&this.map[t]!==e&&console.warn(`The file extension ${t} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[t]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let t=ve.extname(e),n=this.map[t];if(!n)throw new Error(`The service registry contains no services for the extension '${t}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};var QS=de(Ae(),1);var Dd=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,t,n=ne(e)){t??(t=this.nameProvider.getName(e));let i=this.astNodeLocator.getAstNodePath(e);if(!t)throw new Error(`Node at path ${i} has no name.`);let o,s=()=>{var a;return o??(o=or((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:t,get nameSegment(){return s()},selectionSegment:or(e.$cstNode),type:e.$type,documentUri:n.uri,path:i}}},Od=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,t=QS.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of ni(i))await Ze(t),ou(o).filter(s=>!ns(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let t=e.reference.$nodeDescription,n=e.reference.$refNode;if(!t||!n)return;let i=ne(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:t.documentUri,targetPath:t.path,segment:or(n),local:ve.equals(t.documentUri,i)}}};var Ld=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let t=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return t+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:t}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return t!==void 0?e+this.indexSeparator+t:e}getAstNode(e,t){return t.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),c=parseInt(o.substring(s+1)),l=i[a];return l?.[c]}return i[o]},e)}};var ZS=de(kt(),1),Md=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(t=>{var n,i;this.workspaceConfig=(i=(n=t.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(t=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(ZS.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let t=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(t);t.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(t=>{this.updateSectionConfiguration(t,e.settings[t])})}updateSectionConfiguration(e,t){this.settings[e]=t}async getConfiguration(e,t){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][t]}toSectionName(e){return`${e}`}};var Ra=de(Ae(),1);var Fd=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Le,this.buildState=new Map,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,t={},n=Ra.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===je.Validated){if(typeof t.validation=="boolean"&&t.validation)s.state=je.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof t.validation=="object"){let c=this.buildState.get(a),l=(i=c?.result)===null||i===void 0?void 0:i.validationChecks;if(l){let f=((o=t.validation.categories)!==null&&o!==void 0?o:gs.all).filter(m=>!l.includes(m));f.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},t.validation),{categories:f})},result:c.result}),s.state=je.IndexedReferences)}}}else this.buildState.delete(a)}await this.buildDocuments(e,t,n)}async update(e,t,n=Ra.CancellationToken.None){for(let s of t)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString());this.indexManager.remove(t);for(let s of e)this.langiumDocuments.invalidateDocument(s)||this.langiumDocuments.getOrCreateDocument(s),this.buildState.delete(s.toString());let i=ie(e).concat(t).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,je.ComputedScopes),s.diagnostics=void 0});for(let s of this.updateListeners)s(e,t);await Ze(n);let o=this.langiumDocuments.all.filter(s=>{var a;return s.state<je.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray();await this.buildDocuments(o,this.updateBuildOptions,n)}shouldRelink(e,t){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,t)}onUpdate(e){return this.updateListeners.push(e),Ra.Disposable.create(()=>{let t=this.updateListeners.indexOf(e);t>=0&&this.updateListeners.splice(t,1)})}async buildDocuments(e,t,n){this.prepareBuild(e,t),await this.runCancelable(e,je.Parsed,n,o=>{this.langiumDocumentFactory.update(o)}),await this.runCancelable(e,je.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,je.ComputedScopes,n,async o=>{let s=this.serviceRegistry.getServices(o.uri).references.ScopeComputation;o.precomputedScopes=await s.computeLocalScopes(o,n)}),await this.runCancelable(e,je.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,je.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o));await this.runCancelable(i,je.Validated,n,o=>this.validate(o,n));for(let o of e){let s=this.buildState.get(o.uri.toString());s&&(s.completed=!0)}}prepareBuild(e,t){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:t,result:o?.result})}}async runCancelable(e,t,n,i){let o=e.filter(s=>s.state<t);for(let s of o)await Ze(n),await i(s),s.state=t;await this.notifyBuildPhase(o,t,n)}onBuildPhase(e,t){return this.buildPhaseListeners.add(e,t),Ra.Disposable.create(()=>{this.buildPhaseListeners.delete(e,t)})}async notifyBuildPhase(e,t,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(t);for(let o of i)await Ze(n),await o(e,n)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,t){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,c=await o.validateDocument(e,a,t);e.diagnostics?e.diagnostics.push(...c):e.diagnostics=c;let l=this.buildState.get(e.uri.toString());if(l){(n=l.result)!==null&&n!==void 0||(l.result={});let u=(i=a?.categories)!==null&&i!==void 0?i:gs.all;l.result.validationChecks?l.result.validationChecks.push(...u):l.result.validationChecks=[...u]}}getBuildOptions(e){var t,n;return(n=(t=this.buildState.get(e.uri.toString()))===null||t===void 0?void 0:t.options)!==null&&n!==void 0?n:{}}};var qg=de(Ae(),1);var qd=class{constructor(e){this.simpleIndex=new Map,this.simpleTypeIndex=new Au,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,t){let n=ne(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{ve.equals(s.targetUri,n)&&s.targetPath===t&&i.push(s)})}),ie(i)}allElements(e,t){let n=ie(this.simpleIndex.keys());return t&&(n=n.filter(i=>!t||t.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,t){var n;return t?this.simpleTypeIndex.get(e,t,()=>{var o;return((o=this.simpleIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,t))}):(n=this.simpleIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){for(let t of e){let n=t.toString();this.simpleIndex.delete(n),this.simpleTypeIndex.clear(n),this.referenceIndex.delete(n)}}async updateContent(e,t=qg.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,t);for(let s of i)s.node=void 0;let o=e.uri.toString();this.simpleIndex.set(o,i),this.simpleTypeIndex.clear(o)}async updateReferences(e,t=qg.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,t);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,t){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&t.has(i.targetUri.toString())):!1}};var eC=de(Ae(),1);var Ud=class{constructor(e){this.initialBuildOptions={},this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(t=>{var n;this.folders=(n=t.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(t=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,t=eC.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,o))),await Ze(t),await this.documentBuilder.build(i,this.initialBuildOptions,t)}loadAdditionalDocuments(e,t){return Promise.resolve()}getRootFolder(e){return Qt.parse(e.uri)}async traverseFolder(e,t,n,i){let o=await this.fileSystemProvider.readDirectory(t);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,t,n){let i=ve.basename(t.uri);if(i.startsWith("."))return!1;if(t.isDirectory)return i!=="node_modules"&&i!=="out";if(t.isFile){let o=ve.extname(t.uri);return n.includes(o)}return!1}};var Gd=class{constructor(e){let t=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(t);let n=tC(t)?Object.values(t):t;this.chevrotainLexer=new gt(n,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var t;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(t=n.groups.hidden)!==null&&t!==void 0?t:[]}}toTokenTypeDictionary(e){if(tC(e))return e;let t=rC(e)?Object.values(e.modes).flat():e,n={};return t.forEach(i=>n[i.name]=i),n}};function zU(r){return Array.isArray(r)&&(r.length===0||"name"in r[0])}function rC(r){return r&&"modes"in r&&"defaultMode"in r}function tC(r){return!zU(r)&&!rC(r)}var be=de(Ae(),1);function oC(r,e,t){let n,i;typeof r=="string"?(i=e,n=t):(i=r.range.start,n=e),i||(i=be.Position.create(0,0));let o=aC(r),s=jg(n),a=YU({lines:o,position:i,options:s});return tG({index:0,tokens:a,position:i})}function sC(r,e){let t=jg(e),n=aC(r);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=t.start,a=t.end;return!!s?.exec(i)&&!!a?.exec(o)}function aC(r){let e="";return typeof r=="string"?e=r:e=r.text,e.split(rc)}var nC=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,XU=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function YU(r){var e,t,n;let i=[],o=r.position.line,s=r.position.character;for(let a=0;a<r.lines.length;a++){let c=a===0,l=a===r.lines.length-1,u=r.lines[a],f=0;if(c&&r.options.start){let T=(e=r.options.start)===null||e===void 0?void 0:e.exec(u);T&&(f=T.index+T[0].length)}else{let T=(t=r.options.line)===null||t===void 0?void 0:t.exec(u);T&&(f=T.index+T[0].length)}if(l){let T=(n=r.options.end)===null||n===void 0?void 0:n.exec(u);T&&(u=u.substring(0,T.index))}if(u=u.substring(0,eG(u)),Gg(u,0)>=u.length){if(i.length>0){let T=be.Position.create(o,s);i.push({type:"break",content:"",range:be.Range.create(T,T)})}}else{nC.lastIndex=f;let T=nC.exec(u);if(T){let A=T[0],S=T[1],N=be.Position.create(o,s+f),C=be.Position.create(o,s+f+A.length);i.push({type:"tag",content:S,range:be.Range.create(N,C)}),f+=A.length,f=Gg(u,f)}if(f<u.length){let A=u.substring(f),S=Array.from(A.matchAll(XU));i.push(...JU(S,A,o,s+f))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function JU(r,e,t,n){let i=[];if(r.length===0){let o=be.Position.create(t,n),s=be.Position.create(t,n+e.length);i.push({type:"text",content:e,range:be.Range.create(o,s)})}else{let o=0;for(let a of r){let c=a.index,l=e.substring(o,c);l.length>0&&i.push({type:"text",content:e.substring(o,c),range:be.Range.create(be.Position.create(t,o+n),be.Position.create(t,c+n))});let u=l.length+1,f=a[1];if(i.push({type:"inline-tag",content:f,range:be.Range.create(be.Position.create(t,o+u+n),be.Position.create(t,o+u+f.length+n))}),u+=f.length,a.length===4){u+=a[2].length;let m=a[3];i.push({type:"text",content:m,range:be.Range.create(be.Position.create(t,o+u+n),be.Position.create(t,o+u+m.length+n))})}else i.push({type:"text",content:"",range:be.Range.create(be.Position.create(t,o+u+n),be.Position.create(t,o+u+n))});o=c+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:be.Range.create(be.Position.create(t,o+n),be.Position.create(t,o+n+s.length))})}return i}var QU=/\S/,ZU=/\s*$/;function Gg(r,e){let t=r.substring(e).match(QU);return t?e+t.index:r.length}function eG(r){let e=r.match(ZU);if(e&&typeof e.index=="number")return e.index}function tG(r){var e,t,n,i;let o=be.Position.create(r.position.line,r.position.character);if(r.tokens.length===0)return new jd([],be.Range.create(o,o));let s=[];for(;r.index<r.tokens.length;){let l=rG(r,s[s.length-1]);l&&s.push(l)}let a=(t=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&t!==void 0?t:o,c=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new jd(s,be.Range.create(a,c))}function rG(r,e){let t=r.tokens[r.index];if(t.type==="tag")return lC(r,!1);if(t.type==="text"||t.type==="inline-tag")return cC(r);nG(t,e),r.index++}function nG(r,e){if(e){let t=new Hd("",r.range);"inlines"in e?e.inlines.push(t):e.content.inlines.push(t)}}function cC(r){let e=r.tokens[r.index],t=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(iG(r)),n=e,e=r.tokens[r.index];return new Qc(i,be.Range.create(t.range.start,n.range.end))}function iG(r){return r.tokens[r.index].type==="inline-tag"?lC(r,!0):uC(r)}function lC(r,e){let t=r.tokens[r.index++],n=t.content.substring(1),i=r.tokens[r.index];if(i?.type==="text")if(e){let o=uC(r);return new Jc(n,new Qc([o],o.range),e,be.Range.create(t.range.start,o.range.end))}else{let o=cC(r);return new Jc(n,o,e,be.Range.create(t.range.start,o.range.end))}else{let o=t.range;return new Jc(n,new Qc([],o),e,o)}}function uC(r){let e=r.tokens[r.index++];return new Hd(e.content,e.range)}function jg(r){if(!r)return jg({start:"/**",end:"*/",line:"*"});let{start:e,end:t,line:n}=r;return{start:Ug(e,!0),end:Ug(t,!1),line:Ug(n,!0)}}function Ug(r,e){if(typeof r=="string"||typeof r=="object"){let t=typeof r=="string"?si(r):r.source;return e?new RegExp(`^\\s*${t}`):new RegExp(`\\s*${t}\\s*$`)}else return r}var jd=class{constructor(e,t){this.elements=e,this.range=t}getTag(e){return this.getAllTags().find(t=>t.name===e)}getTags(e){return this.getAllTags().filter(t=>t.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let t of this.elements)if(e.length===0)e=t.toString();else{let n=t.toString();e+=iC(e)+n}return e.trim()}toMarkdown(e){let t="";for(let n of this.elements)if(t.length===0)t=n.toMarkdown(e);else{let i=n.toMarkdown(e);t+=iC(t)+i}return t.trim()}},Jc=class{constructor(e,t,n,i){this.name=e,this.content=t,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,t=this.content.toString();return this.content.inlines.length===1?e=`${e} ${t}`:this.content.inlines.length>1&&(e=`${e}
${t}`),this.inline?`{${e}}`:e}toMarkdown(e){let t=this.content.toMarkdown(e);if(this.inline){let o=oG(this.name,t,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${t}`:this.content.inlines.length>1&&(i=`${i}
${t}`),this.inline?`{${i}}`:i}};function oG(r,e,t){var n,i;if(r==="linkplain"||r==="linkcode"||r==="link"){let o=e.indexOf(" "),s=e;if(o>0){let c=Gg(e,o);s=e.substring(c),e=e.substring(0,o)}return(r==="linkcode"||r==="link"&&t.link==="code")&&(s=`\`${s}\``),(i=(n=t.renderLink)===null||n===void 0?void 0:n.call(t,e,s))!==null&&i!==void 0?i:sG(e,s)}}function sG(r,e){try{return Qt.parse(r,!0),`[${e}](${r})`}catch{return r}}var Qc=class{constructor(e,t){this.inlines=e,this.range=t}toString(){let e="";for(let t=0;t<this.inlines.length;t++){let n=this.inlines[t],i=this.inlines[t+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let t="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];t+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(t+=`
`)}return t}},Hd=class{constructor(e,t){this.text=e,this.range=t}toString(){return this.text}toMarkdown(){return this.text}};function iC(r){return r.endsWith(`
`)?`
`:`

`}var Bd=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let t=this.commentProvider.getComment(e);if(t&&sC(t))return oC(t).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,t,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,t))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,t);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,c=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${c.toString()})`}else return}findNameInPrecomputedScopes(e,t){let i=ne(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(c=>c.name===t);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,t){return this.indexManager.allElements().find(i=>i.name===t)}};var Kd=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var t;return JS(e)?e.$comment:(t=av(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||t===void 0?void 0:t.text}};function bc(r){return{documentation:{CommentProvider:e=>new Kd(e),DocumentationProvider:e=>new Bd(e)},parser:{GrammarConfig:e=>SR(e),LangiumParser:e=>zS(e),CompletionParser:e=>VS(e),ValueConverter:()=>new Nd,TokenBuilder:()=>new $d,Lexer:e=>new Gd(e),ParserErrorMessageProvider:()=>new Xc},lsp:{CompletionProvider:e=>new Es(e),DocumentSymbolProvider:e=>new Hu(e),HoverProvider:e=>new Wu(e),FoldingRangeProvider:e=>new Ns(e),ReferencesProvider:e=>new Qu(e),DefinitionProvider:e=>new Ps(e),DocumentHighlightProvider:e=>new ju(e),RenameProvider:e=>new Zu(e)},workspace:{AstNodeLocator:()=>new Ld,AstNodeDescriptionProvider:e=>new Dd(e),ReferenceDescriptionProvider:e=>new Od(e)},references:{Linker:e=>new _d(e),NameProvider:()=>new ms,ScopeProvider:e=>new Cs(e),ScopeComputation:e=>new Ss(e),References:e=>new _s(e)},serializer:{JsonSerializer:e=>new Id(e)},validation:{DocumentValidator:e=>new ku(e),ValidationRegistry:e=>new Tu(e)},shared:()=>r.shared}}function Ac(r){return{ServiceRegistry:()=>new Pd,lsp:{Connection:()=>r.connection,LanguageServer:e=>new Xu(e),WorkspaceSymbolProvider:e=>new ef(e),NodeKindProvider:()=>new Yu,FuzzyMatcher:()=>new Ku},workspace:{LangiumDocuments:e=>new zu(e),LangiumDocumentFactory:e=>new Vu(e),DocumentBuilder:e=>new Fd(e),TextDocuments:()=>new fC.TextDocuments(rs),IndexManager:e=>new qd(e),WorkspaceManager:e=>new Ud(e),FileSystemProvider:e=>r.fileSystemProvider(e),MutexLock:()=>new yu,ConfigurationProvider:e=>new Md(e)}}}var ka=de(pC(),1);var mC="Condition";var hC="Expression";var gC="Statement";var aG="Type";var cG="Unit";var yC="ArithmeticCondition";var TC="BoolCondition";var vC="ArithmeticExpression";var xC="BoolExpression";var RC="RobotFunc";var lG="AssignVar";var bC="ControlStructure";var uG="declaVar";var fG="FunCall";var dG="Return";var Hg="RobotLogic";var pG="Bool";var mG="Nbr";var hG="Void";var gG="cm";var yG="mm";var AC="Comparison";var TG="And";var vG="EqualBool";var xG="NotEqualBool";var RG="Or";var Wd="SingleValueBool";var bG="AddExpression";var AG="ArithmeticOperation";var wG="MultExpression";var Vd="SingleValue";var SG="getDistance";var CG="getTimestamp";var kG="setSpeed";var EG="If";var $G="Loop";var wC="Movement";var NG="TurnLeft";var _G="TurnRight";var IG="EqualInt";var PG="Greater";var DG="Lower";var OG="NotEqualInt";var LG="ConstBool";var MG="Var";var FG="ConstInt";var qG="Back";var UG="Front";var GG="LeftSide";var jG="RightSide";var Zc=class extends ho{getAllTypes(){return["AddExpression","And","ArithmeticCondition","ArithmeticExpression","ArithmeticOperation","AssignVar","Back","Bool","BoolCondition","BoolExpression","Comparison","Condition","ConstBool","ConstInt","ControlStructure","Else","Elseif","EqualBool","EqualInt","Expression","Front","FunCall","Func","Greater","If","LeftSide","Loop","Lower","Movement","MultExpression","Nbr","NotEqualBool","NotEqualInt","Or","Parameter","Program","Return","RightSide","RobotFunc","RobotLogic","SingleValue","SingleValueBool","Statement","TurnLeft","TurnRight","Type","Unit","Var","Void","cm","declaVar","getDistance","getTimestamp","mm","setSpeed"]}computeIsSubtype(e,t){switch(e){case bG:case AG:case wG:case Vd:return this.isSubtype(vC,t);case TG:case vG:case xG:case RG:case Wd:return this.isSubtype(TC,t);case yC:return this.isSubtype(mC,t);case vC:case xC:return this.isSubtype(hC,t);case lG:case bC:case uG:case dG:case Hg:return this.isSubtype(gC,t);case qG:case UG:case GG:case jG:return this.isSubtype(wC,t);case pG:case mG:case hG:return this.isSubtype(aG,t);case TC:return this.isSubtype(xC,t)||this.isSubtype(mC,t);case gG:case yG:return this.isSubtype(cG,t);case AC:return this.isSubtype(yC,t);case LG:return this.isSubtype(Wd,t);case FG:return this.isSubtype(Vd,t);case IG:case PG:case DG:case OG:return this.isSubtype(AC,t);case fG:return this.isSubtype(Vd,t)||this.isSubtype(Wd,t)||this.isSubtype(gC,t);case SG:case CG:case kG:return this.isSubtype(RC,t);case EG:case $G:return this.isSubtype(bC,t);case wC:case NG:case _G:return this.isSubtype(Hg,t);case RC:return this.isSubtype(hC,t)||this.isSubtype(Hg,t);case MG:return this.isSubtype(Vd,t)||this.isSubtype(Wd,t);default:return!1}}getReferenceType(e){let t=`${e.container.$type}:${e.property}`;switch(t){default:throw new Error(`${t} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Else":return{name:"Else",mandatory:[{name:"statement",type:"array"}]};case"Elseif":return{name:"Elseif",mandatory:[{name:"statement",type:"array"}]};case"Func":return{name:"Func",mandatory:[{name:"parameter",type:"array"},{name:"statement",type:"array"}]};case"Program":return{name:"Program",mandatory:[{name:"Func",type:"array"}]};case"ArithmeticCondition":return{name:"ArithmeticCondition",mandatory:[{name:"arithmeticexpression",type:"array"}]};case"ControlStructure":return{name:"ControlStructure",mandatory:[{name:"statement",type:"array"}]};case"FunCall":return{name:"FunCall",mandatory:[{name:"parameters",type:"array"}]};case"And":return{name:"And",mandatory:[{name:"condition",type:"array"}]};case"EqualBool":return{name:"EqualBool",mandatory:[{name:"singlevaluebool",type:"array"}]};case"NotEqualBool":return{name:"NotEqualBool",mandatory:[{name:"singlevaluebool",type:"array"}]};case"Or":return{name:"Or",mandatory:[{name:"condition",type:"array"}]};case"AddExpression":return{name:"AddExpression",mandatory:[{name:"multexpression",type:"array"}]};case"MultExpression":return{name:"MultExpression",mandatory:[{name:"singlevalue",type:"array"}]};case"If":return{name:"If",mandatory:[{name:"elseif",type:"array"}]};case"ConstBool":return{name:"ConstBool",mandatory:[{name:"BoolValue",type:"boolean"}]};default:return{name:e,mandatory:[]}}}},tle=new Zc;var zd,SC=()=>zd??(zd=gu(`{
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
              "$ref": "#/rules@26"
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
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
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
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@49"
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
              "$ref": "#/rules@27"
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
              "$ref": "#/rules@45"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@46"
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
        "$ref": "#/interfaces@30"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
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
        "$ref": "#/interfaces@44"
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
              "$ref": "#/rules@43"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
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
        "$ref": "#/interfaces@35"
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
        "$ref": "#/interfaces@36"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
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
              "$ref": "#/rules@34"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
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
        "$ref": "#/interfaces@43"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
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
              "$ref": "#/rules@39"
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
                "$ref": "#/rules@51"
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
                "$ref": "#/rules@51"
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
      "name": "TurnLeft",
      "returnType": {
        "$ref": "#/interfaces@23"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "ClockLeft"
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
      "name": "TurnRight",
      "returnType": {
        "$ref": "#/interfaces@22"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "ClockRight"
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
        "$ref": "#/interfaces@24"
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
        "$ref": "#/interfaces@27"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@27"
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
        "$ref": "#/interfaces@28"
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
                "$ref": "#/rules@51"
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
        "$ref": "#/interfaces@29"
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
                    "$ref": "#/rules@51"
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
              "$ref": "#/rules@27"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@28"
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
        "$ref": "#/interfaces@31"
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
        "$ref": "#/interfaces@32"
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
                "$ref": "#/rules@43"
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
        "$ref": "#/interfaces@34"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Left"
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
        "$ref": "#/interfaces@40"
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
        "$ref": "#/interfaces@42"
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
        "$ref": "#/interfaces@46"
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
                    "$ref": "#/rules@40"
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
                        "$ref": "#/rules@40"
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
        "$ref": "#/interfaces@47"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "integerValue",
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
      "name": "Var",
      "returnType": {
        "$ref": "#/interfaces@33"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@51"
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
        "$ref": "#/interfaces@49"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "BoolValue",
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
      "name": "mm",
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
        "$ref": "#/interfaces@54"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@54"
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
      "name": "TurnRight",
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
      "name": "TurnLeft",
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
          "$ref": "#/interfaces@25"
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
          "$ref": "#/interfaces@25"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "getTimestamp",
      "superTypes": [
        {
          "$ref": "#/interfaces@25"
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
          "$ref": "#/interfaces@30"
        },
        {
          "$ref": "#/interfaces@44"
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
              "$ref": "#/interfaces@33"
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
          "$ref": "#/interfaces@30"
        },
        {
          "$ref": "#/interfaces@44"
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
          "$ref": "#/interfaces@35"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Lower",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Greater",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "EqualInt",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "NotEqualInt",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
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
                "$ref": "#/interfaces@44"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "EqualBool",
      "superTypes": [
        {
          "$ref": "#/interfaces@43"
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
                "$ref": "#/interfaces@44"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "NotEqualBool",
      "superTypes": [
        {
          "$ref": "#/interfaces@43"
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
          "$ref": "#/interfaces@43"
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
          "$ref": "#/interfaces@43"
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
          "$ref": "#/interfaces@43"
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
          "$ref": "#/interfaces@30"
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
          "$ref": "#/interfaces@44"
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
}`));var HG={languageId:"ase-robot",fileExtensions:[".rob"],caseInsensitive:!1},CC={AstReflection:()=>new Zc},kC={Grammar:()=>SC(),LanguageMetaData:()=>HG,parser:{}};var Xd=class{constructor(e,t,n){this.name=e,this.parameters=t,this.returnType=n}};function EC(r){let e=r.validation.ValidationRegistry,t=r.validation.AseRobotValidator,n={Program:t.checkProgram,Func:t.checkFunction};e.register(n,t)}var Yd=class{constructor(){this.vars=new Map}checkFunctions(e,t){let n=new Map,i=e.Func;for(let o of i){for(let a of n.values())a.name===o.name&&t("error","Function already exists",{node:o,property:"name"});let s=new Map;for(let a of o.parameter)s.set(a.name,a.type);n.set(o.name,new Xd(o.name,s,o.type))}for(let o of i)for(let s of o.statement)if(this.isFunCall(s)){let a=!1;for(let c of n.values())s.callName===c.name&&(a=!0);if(!a)t("error","Function doesnt exist",{node:s,property:"callName"});else{let c=n.get(s.callName);c?.parameters.size!=s.parameters.length&&t("error","Wrong number of arguments",{node:s,property:"parameters"})}}}checkProgram(e,t){this.checkFunctions(e,t)}isDeclaVar(e){return"declaName"in e}isFunCall(e){return"callName"in e}isAssignVar(e){return"var_to_assign"in e}checkAssignVarExist(e,t){let n=[];for(let i of e.statement)if(this.isAssignVar(i)){let o=!1;for(let s of n)i.var_to_assign.name===s.declaName&&(o=!0);for(let s of e.parameter)i.var_to_assign.name===s.name&&(o=!0);o||t("error","Variable doesnt exist",{node:i,property:"var_to_assign"})}else this.isDeclaVar(i)&&n.push(i)}checkDeclaVar(e,t){let n=[],i=[];for(let o of e.statement)this.isDeclaVar(o)&&i.push(o);for(let o of i){let s=!1;for(let a of n)o.declaName===a&&(t("error","Variable already exists",{node:o,property:"declaName"}),s=!0);s||n.push(o.declaName)}}checkFunction(e,t){this.checkAssignVarExist(e,t),this.checkDeclaVar(e,t)}variableExists(e){for(let t of this.vars.keys())if(t===e)return!0;return!1}};function $C(r){let e=r.validation.ValidationRegistry,t=r.validation.AseRobotAcceptWeaver;e.register(t.checks,t)}var Jd=class{constructor(){this.checks={Else:this.weaveElse,Elseif:this.weaveElseif,Func:this.weaveFunc,Program:this.weaveProgram,FunCall:this.weaveFunCall,AssignVar:this.weaveAssignVar,declaVar:this.weavedeclaVar,Return:this.weaveReturn,And:this.weaveAnd,Or:this.weaveOr,EqualBool:this.weaveEqualBool,NotEqualBool:this.weaveNotEqualBool,getDistance:this.weavegetDistance,getTimestamp:this.weavegetTimestamp,setSpeed:this.weavesetSpeed,If:this.weaveIf,Loop:this.weaveLoop,TurnLeft:this.weaveTurnLeft,TurnRight:this.weaveTurnRight,EqualInt:this.weaveEqualInt,NotEqualInt:this.weaveNotEqualInt,Greater:this.weaveGreater,Lower:this.weaveLower,ConstBool:this.weaveConstBool,Var:this.weaveVar,ConstInt:this.weaveConstInt,Back:this.weaveBack,Front:this.weaveFront,LeftSide:this.weaveLeftSide,RightSide:this.weaveRightSide,AddExpression:this.weaveAddExpression,MultExpression:this.weaveMultExpression,mm:this.weaveMm,cm:this.weaveCm,Parameter:this.weaveParam}}weaveMm(e){e.accept=t=>t.visitMm(e)}weaveCm(e){e.accept=t=>t.visitCm(e)}weaveElse(e){e.accept=t=>t.visitElse(e)}weaveElseif(e){e.accept=t=>t.visitElseif(e)}weaveAddExpression(e){e.accept=t=>t.visitAddExpression(e)}weaveOr(e){e.accept=t=>t.visitOr(e)}weaveParam(e){e.accept=t=>t.visitParam(e)}weaveMultExpression(e){e.accept=t=>t.visitMultExpression(e)}weaveFunc(e){e.accept=t=>t.visitFunc(e)}weaveProgram(e){e.accept=t=>t.visitProgram(e)}weaveFunCall(e){e.accept=t=>t.visitFunCall(e)}weaveAssignVar(e){e.accept=t=>t.visitAssignVar(e)}weavedeclaVar(e){e.accept=t=>t.visitdeclaVar(e)}weaveReturn(e){e.accept=t=>t.visitReturn(e)}weaveAnd(e){e.accept=t=>t.visitAnd(e)}weaveEqualBool(e){e.accept=t=>t.visitEqualBool(e)}weaveNotEqualBool(e){e.accept=t=>t.visitNotEqualBool(e)}weavegetDistance(e){e.accept=t=>t.visitgetDistance(e)}weavegetTimestamp(e){e.accept=t=>t.visitgetTimestamp(e)}weavesetSpeed(e){e.accept=t=>t.visitsetSpeed(e)}weaveIf(e){e.accept=t=>t.visitIf(e)}weaveLoop(e){e.accept=t=>t.visitLoop(e)}weaveTurnLeft(e){e.accept=t=>t.visitTurnLeft(e)}weaveTurnRight(e){e.accept=t=>t.visitTurnRight(e)}weaveEqualInt(e){e.accept=t=>t.visitEqualInt(e)}weaveNotEqualInt(e){e.accept=t=>t.visitNotEqualInt(e)}weaveGreater(e){e.accept=t=>t.visitGreater(e)}weaveLower(e){e.accept=t=>t.visitLower(e)}weaveConstBool(e){e.accept=t=>t.visitConstBool(e)}weaveVar(e){e.accept=t=>t.visitVar(e)}weaveConstInt(e){e.accept=t=>t.visitConstInt(e)}weaveBack(e){e.accept=t=>t.visitBack(e)}weaveFront(e){e.accept=t=>t.visitFront(e)}weaveLeftSide(e){e.accept=t=>t.visitLeftSide(e)}weaveRightSide(e){e.accept=t=>t.visitRightSide(e)}};var NC=(r=0)=>e=>`\x1B[${e+r}m`,_C=(r=0)=>e=>`\x1B[${38+r};5;${e}m`,IC=(r=0)=>(e,t,n)=>`\x1B[${38+r};2;${e};${t};${n}m`,nt={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}},dle=Object.keys(nt.modifier),BG=Object.keys(nt.color),KG=Object.keys(nt.bgColor),ple=[...BG,...KG];function WG(){let r=new Map;for(let[e,t]of Object.entries(nt)){for(let[n,i]of Object.entries(t))nt[n]={open:`\x1B[${i[0]}m`,close:`\x1B[${i[1]}m`},t[n]=nt[n],r.set(i[0],i[1]);Object.defineProperty(nt,e,{value:t,enumerable:!1})}return Object.defineProperty(nt,"codes",{value:r,enumerable:!1}),nt.color.close="\x1B[39m",nt.bgColor.close="\x1B[49m",nt.color.ansi=NC(),nt.color.ansi256=_C(),nt.color.ansi16m=IC(),nt.bgColor.ansi=NC(10),nt.bgColor.ansi256=_C(10),nt.bgColor.ansi16m=IC(10),Object.defineProperties(nt,{rgbToAnsi256:{value(e,t,n){return e===t&&t===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(t/255*5)+Math.round(n/255*5)},enumerable:!1},hexToRgb:{value(e){let t=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!t)return[0,0,0];let[n]=t;n.length===3&&(n=[...n].map(o=>o+o).join(""));let i=Number.parseInt(n,16);return[i>>16&255,i>>8&255,i&255]},enumerable:!1},hexToAnsi256:{value:e=>nt.rgbToAnsi256(...nt.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return 90+(e-8);let t,n,i;if(e>=232)t=((e-232)*10+8)/255,n=t,i=t;else{e-=16;let a=e%36;t=Math.floor(e/36)/5,n=Math.floor(a/6)/5,i=a%6/5}let o=Math.max(t,n,i)*2;if(o===0)return 30;let s=30+(Math.round(i)<<2|Math.round(n)<<1|Math.round(t));return o===2&&(s+=60),s},enumerable:!1},rgbToAnsi:{value:(e,t,n)=>nt.ansi256ToAnsi(nt.rgbToAnsi256(e,t,n)),enumerable:!1},hexToAnsi:{value:e=>nt.ansi256ToAnsi(nt.hexToAnsi256(e)),enumerable:!1}}),nt}var VG=WG(),Rn=VG;var Qd=(()=>{if(navigator.userAgentData){let r=navigator.userAgentData.brands.find(({brand:e})=>e==="Chromium");if(r&&r.version>93)return 3}return/\b(Chrome|Chromium)\//.test(navigator.userAgent)?1:0})(),PC=Qd!==0&&{level:Qd,hasBasic:!0,has256:Qd>=2,has16m:Qd>=3},zG={stdout:PC,stderr:PC},DC=zG;function OC(r,e,t){let n=r.indexOf(e);if(n===-1)return r;let i=e.length,o=0,s="";do s+=r.slice(o,n)+e+t,o=n+i,n=r.indexOf(e,o);while(n!==-1);return s+=r.slice(o),s}function LC(r,e,t,n){let i=0,o="";do{let s=r[n-1]==="\r";o+=r.slice(i,s?n-1:n)+e+(s?`\r
`:`
`)+t,i=n+1,n=r.indexOf(`
`,i)}while(n!==-1);return o+=r.slice(i),o}var{stdout:MC,stderr:FC}=DC,Bg=Symbol("GENERATOR"),ba=Symbol("STYLER"),el=Symbol("IS_EMPTY"),qC=["ansi","ansi","ansi256","ansi16m"],Aa=Object.create(null),XG=(r,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let t=MC?MC.level:0;r.level=e.level===void 0?t:e.level};var YG=r=>{let e=(...t)=>t.join(" ");return XG(e,r),Object.setPrototypeOf(e,tl.prototype),e};function tl(r){return YG(r)}Object.setPrototypeOf(tl.prototype,Function.prototype);for(let[r,e]of Object.entries(Rn))Aa[r]={get(){let t=Zd(this,Wg(e.open,e.close,this[ba]),this[el]);return Object.defineProperty(this,r,{value:t}),t}};Aa.visible={get(){let r=Zd(this,this[ba],!0);return Object.defineProperty(this,"visible",{value:r}),r}};var Kg=(r,e,t,...n)=>r==="rgb"?e==="ansi16m"?Rn[t].ansi16m(...n):e==="ansi256"?Rn[t].ansi256(Rn.rgbToAnsi256(...n)):Rn[t].ansi(Rn.rgbToAnsi(...n)):r==="hex"?Kg("rgb",e,t,...Rn.hexToRgb(...n)):Rn[t][r](...n),JG=["rgb","hex","ansi256"];for(let r of JG){Aa[r]={get(){let{level:t}=this;return function(...n){let i=Wg(Kg(r,qC[t],"color",...n),Rn.color.close,this[ba]);return Zd(this,i,this[el])}}};let e="bg"+r[0].toUpperCase()+r.slice(1);Aa[e]={get(){let{level:t}=this;return function(...n){let i=Wg(Kg(r,qC[t],"bgColor",...n),Rn.bgColor.close,this[ba]);return Zd(this,i,this[el])}}}}var QG=Object.defineProperties(()=>{},{...Aa,level:{enumerable:!0,get(){return this[Bg].level},set(r){this[Bg].level=r}}}),Wg=(r,e,t)=>{let n,i;return t===void 0?(n=r,i=e):(n=t.openAll+r,i=e+t.closeAll),{open:r,close:e,openAll:n,closeAll:i,parent:t}},Zd=(r,e,t)=>{let n=(...i)=>ZG(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,QG),n[Bg]=r,n[ba]=e,n[el]=t,n},ZG=(r,e)=>{if(r.level<=0||!e)return r[el]?"":e;let t=r[ba];if(t===void 0)return e;let{openAll:n,closeAll:i}=t;if(e.includes("\x1B"))for(;t!==void 0;)e=OC(e,t.close,t.open),t=t.parent;let o=e.indexOf(`
`);return o!==-1&&(e=LC(e,i,n,o)),n+e+i};Object.defineProperties(tl.prototype,Aa);var ej=tl(),xle=tl({level:FC?FC.level:0});var Vg=ej;var wa=class{constructor(e){this.$type=e}accept(e){console.log("acceptProgram concrete"),e.visitProgram(this)}};var ep=class{constructor(e){this.$type=e}accept(e){}},tp=class{constructor(e){this.$type=e}accept(e){}};var rp=class{constructor(e){this.vars=[],this.program=new wa("Program"),this.scene=e,this.scene.robot.speed=1}visitParam(e){}visitMultExpression(e){let t=e.singlevalue[0].accept(this);for(let n=1;n<e.singlevalue.length;n++)if(e.op[n-1]==="*"){let i=e.singlevalue[n].accept(this);t=t*i}else e.op[n-1]==="/"&&(t=t/e.singlevalue[n].accept(this));return t}visitAddExpression(e){let t=e.multexpression[0].accept(this);for(let n=1;n<e.multexpression.length;n++)if(e.op[n-1]==="+"){let i=e.multexpression[n].accept(this);t=t+i}else e.op[n-1]==="-"&&(t=t-e.multexpression[n].accept(this));return t}visitElse(e){e.statement.forEach(t=>t.accept(this))}visitElseif(e){e.condition.accept(this)&&e.statement.forEach(t=>t.accept(this))}visitFunc(e){for(let t of e.statement){let n=this.isReturn(t),i=this.isControleStructure(t),o=t.accept(this);if(n||i&&o!=null)return o}}visitFunCall(e){for(let t of this.program.Func)if(t.name==e.callName){let n=new Map;for(let o=0;o<e.parameters.length;o++){let s=e.parameters[o].accept(this);n.set(t.parameter[o].name,s)}this.vars.push(n);let i=t.accept(this);return this.vars.pop(),i}}visitAssignVar(e){let t=e.expression.accept(this);this.vars[this.vars.length-1].set(e.var_to_assign.name,t)}visitdeclaVar(e){this.vars[this.vars.length-1].set(e.declaName,e.expression.accept(this))}visitReturn(e){return e.return.accept(this)}visitAnd(e){let t=e.condition[0].accept(this);for(let n=1;n<e.condition.length;n++)t=t&&e.condition[n].accept(this);return t}visitOr(e){let t=e.condition[0].accept(this);for(let n=1;n<e.condition.length;n++)t=t||e.condition[n].accept(this);return t}visitEqualBool(e){return e.singlevaluebool[0].accept(this)===e.singlevaluebool[1].accept(this)}visitNotEqualBool(e){return e.singlevaluebool[0].accept(this)!==e.singlevaluebool[1].accept(this)}visitgetDistance(e){let t=this.scene.robot.getRay().intersect(this.scene.entities),i=1e3/Math.max(this.scene.size.x,this.scene.size.y),o=(Math.pow(t.x-this.scene.robot.pos.x,2)+Math.pow(t.y-this.scene.robot.pos.y,2))*i;return console.log("getDistance :",o),Math.sqrt(o)}visitgetTimestamp(e){let t=this.scene.timestamps[this.scene.timestamps.length-1].time;return console.log("time : ",t),t}visitsetSpeed(e){let t=e.speed.accept(this);if(e.unit.accept(this)==="cm"?t=t/10:t=t/100,t>1.5)throw new Error("Speed must be less than 150 mm/s");this.scene.robot.speed=t}visitIf(e){return e.condition.accept(this)&&e.statement.forEach(t=>{if(this.isReturn(t)){let i=t.accept(this);return this.vars.pop(),i}else t.accept(this)}),null}visitLoop(e){for(;e.condition.accept(this);)e.statement.forEach(t=>{if(this.isReturn(t)){let i=t.accept(this);return this.vars.pop(),i}else t.accept(this)});return null}visitTurnLeft(e){this.scene.robot.turn(-e.angle.accept(this))}visitTurnRight(e){this.scene.robot.turn(e.angle.accept(this))}visitEqualInt(e){return e.arithmeticexpression[0].accept(this)===e.arithmeticexpression[1].accept(this)}visitNotEqualInt(e){return e.arithmeticexpression[0].accept(this)!==e.arithmeticexpression[1].accept(this)}visitGreater(e){return e.arithmeticexpression[0].accept(this)>e.arithmeticexpression[1].accept(this)}visitLower(e){return e.arithmeticexpression[0].accept(this)<e.arithmeticexpression[1].accept(this)}visitConstBool(e){return e.BoolValue}visitVar(e){return this.vars[this.vars.length-1].get(e.name)}visitConstInt(e){return e.integerValue}visitBack(e){let t=0;if(e.unit1.accept(this)==="cm"?t=-e.expression.accept(this)*10:t=-e.expression.accept(this),t>5e3)throw new Error("Distance to parkour must be less than 5000 mm");t>0&&this.scene.robot.move(t)}visitFront(e){let t=0;if(e.unit1.accept(this)==="cm"?t=e.expression.accept(this)*10:t=e.expression.accept(this),t>3e3)throw new Error("Distance to parkour must be less than 3000 mm");t>0&&this.scene.robot.move(t)}visitLeftSide(e){let t=0;if(e.unit1.accept(this)==="cm"?t=-e.expression.accept(this)*10:t=-e.expression.accept(this),t>3e3)throw new Error("Distance to parkour must be less than 3000 mm");t>0&&this.scene.robot.side(t)}visitRightSide(e){let t=0;if(e.unit1.accept(this)==="cm"?t=e.expression.accept(this)*10:t=e.expression.accept(this),t>3e3)throw new Error("Distance to parkour must be less than 3000 mm");t>0&&this.scene.robot.side(t)}visitCm(e){return"cm"}visitMm(e){return"mm"}visitProgram(e){this.program=e,e.Func.forEach(t=>{t.name=="entry"&&(this.vars.push(new Map),t.accept(this),this.vars.pop())})}isReturn(e){return"return"in e}isControleStructure(e){return"condition"in e&&"statement"in e}};var ut=class r{static fromAngle(e,t){return new r(Math.cos(e)*t,Math.sin(e)*t)}static null(){return new r(0,0)}constructor(e,t){this.x=e,this.y=t}plus(e){return new r(this.x+e.x,this.y+e.y)}minus(e){return new r(this.x-e.x,this.y-e.y)}scale(e){return new r(this.x*e,this.y*e)}projX(){return new r(this.x,0)}normalize(){return this.scale(1/this.norm())}projY(){return new r(0,this.y)}norm(){return Math.sqrt(this.x*this.x+this.y*this.y)}},np=class{constructor(e,t){this.origin=e,this.vector=t}intersect(e){let t=[];for(var n=0;n<e.length;n++){let o=e[n].intersect(this);console.log(o),t=t.concat(o)}return this.findClosestIntersection(t)}findClosestIntersection(e){let t=0,n=1/0;if(e.length>0){for(var i=0;i<e.length;i++){let o=this.origin.minus(e[i]).norm();o<n&&(n=o,t=i)}return e[t]}else return}getPoiFinder(){return(e,t)=>{let n=e.minus(t),i=this.vector,o=n.x*i.y-i.x*n.y;if(o!=0){let s=e.minus(this.origin),a=s.x*i.y-i.x*s.y,c=n.x*s.y-s.x*n.y,l=a/o,u=-c/o;if(l>0&&l<1&&u>0)return e.plus(n.scale(-l))}}}};var Sa=class{constructor(e,t,n,i,o){this.type="Robot",this.pos=e,this.size=t,this.rad=n*Math.PI/180,this.speed=i,this.scene=o}intersect(e){let t=e.getPoiFinder()(this.pos,this.size);return t?[t]:[]}turn(e){this.rad+=e*Math.PI/180,this.scene.time+=1;let t=new to(this.scene.time,this);this.scene.timestamps.push(t)}move(e){let t=ut.fromAngle(this.rad,Math.abs(e)).normalize();this.pos=this.pos.plus(t.scale(e)),this.scene.time+=Math.abs(e)/this.speed;let n=new to(this.scene.time,this);this.scene.timestamps.push(n),console.log("timestamp pushed !")}side(e){let t=ut.fromAngle(this.rad+Math.PI/2,Math.abs(e)).normalize();this.pos=this.pos.plus(t.scale(e)),this.scene.time+=Math.abs(e)/this.speed;let n=new to(this.scene.time,this);this.scene.timestamps.push(n)}getRay(){return new np(this.pos,ut.fromAngle(this.rad,1e4).scale(-1))}},to=class extends Sa{constructor(e,t){super(t.pos.scale(1),t.size.scale(1),t.rad,t.speed,t.scene),this.rad=t.rad,this.time=e}},qo=class{constructor(e,t){this.type="Block",this.pos=e,this.size=t}intersect(e){let t=e.getPoiFinder(),n=new Array(4);return n[0]=t(this.pos,this.pos.plus(this.size.projX())),n[1]=t(this.pos,this.pos.plus(this.size.projY())),n[2]=t(this.pos.plus(this.size.projX()),this.pos.plus(this.size)),n[3]=t(this.pos.plus(this.size.projY()),this.pos.plus(this.size)),n.filter(i=>i!==void 0)}},bn=class{constructor(e,t){this.type="Wall",this.pos=e,this.size=t}intersect(e){let t=e.getPoiFinder()(this.pos,this.size);return t?[t]:[]}};var ip=class{constructor(e=new ut(1e4,1e4)){this.entities=[],this.time=0,this.timestamps=[],this.size=e,this.robot=new Sa(this.size.scale(.5),new ut(250,250),0,30,this),this.entities.push(new bn(ut.null(),this.size.projX())),this.entities.push(new bn(ut.null(),this.size.projY())),this.entities.push(new bn(this.size,this.size.projY())),this.entities.push(new bn(this.size,this.size.projX())),this.timestamps.push(new to(0,this.robot))}};var op=class{constructor(e=new ut(1e4,1e4)){this.entities=[],this.time=0,this.timestamps=[],this.size=e,this.robot=new Sa(this.size.scale(.5),new ut(250,250),0,30,this);let t=this.size.x,n=this.size.y;this.entities.push(new bn(ut.null(),this.size.projX())),this.entities.push(new bn(ut.null(),this.size.projY())),this.entities.push(new bn(this.size,this.size.projY())),this.entities.push(new bn(this.size,this.size.projX())),this.entities.push(new qo(new ut(t*(2/8),n*(2.5/8)),new ut(t/8,t/8))),this.entities.push(new qo(new ut(t*(6/8),n*(3.5/8)),new ut(t/8,t/8))),this.entities.push(new qo(new ut(t*(1/8),n*(5.5/8)),new ut(t/8,t/8))),this.entities.push(new qo(new ut(t*(5/8),n*(6.5/8)),new ut(t/8,t/8))),this.timestamps.push(new to(0,this.robot))}};var rl=class{constructor(){this.vars=[],this.funcs=new Map,this.program=new wa("Program")}visitParam(e){}visitElse(e){e.statement.forEach(t=>t.accept(this))}visitElseif(e){e.condition.accept(this)&&e.statement.forEach(t=>t.accept(this))}visitFunc(e){var t;for(let n of e.statement){let i=this.isReturn(n),o=this.isControleStructure(n),s=n.accept(this);if((i||o&&s!=null)&&s.type!=this.normalizeType((t=this.funcs.get(e.name))===null||t===void 0?void 0:t[0].$type))throw new Error("Return type does not match function type")}}visitProgram(e){this.program=e;let t=!1;if(e.Func.forEach(n=>{this.funcs.set(n.name,[n.type,n.parameter.map(i=>i.type)]),n.name==="entry"&&(t=!0)}),!t)throw new Error("No entry function found");e.Func.forEach(n=>{this.vars.push(new Map),n.accept(this),this.vars.pop()})}visitFunCall(e){var t;let n=this.funcs.get(e.callName);if(!n)throw new Error(`Function ${e.callName} not found`);let[i,o]=n;if(e.parameters.length!==o.length)throw new Error(`Parameter count mismatch for function ${e.callName}`);let s=e.parameters.map((l,u)=>{let f=l.accept(this);if(f.type!==this.normalizeType(o[u].$type))throw new Error(`Parameter type mismatch in function ${e.callName}`);return f}),a=new Map(s.map((l,u)=>{var f;return[(f=this.program.Func.find(m=>m.name===e.callName))===null||f===void 0?void 0:f.parameter[u].name,l]}));this.vars.push(a);let c=(t=this.funcs.get(e.callName))===null||t===void 0?void 0:t[0].$type;if(this.vars.pop(),this.normalizeType(c)!==this.normalizeType(i.$type))throw new Error(`Return type mismatch for function ${e.callName}`);return c}visitAssignVar(e){let t=e.expression.accept(this),n=this.lookupVar(e.var_to_assign.name).type;if(this.normalizeType(t.type)!==this.normalizeType(n))throw new Error(`Type mismatch in assignment to ${e.var_to_assign.name}`);this.updateVar(e.var_to_assign.name,t)}visitdeclaVar(e){if(this.vars.length===0)throw new Error("Variable declaration outside any scope");if(this.vars[this.vars.length-1].has(e.declaName))throw new Error(`Variable ${e.declaName} already declared`);let t=e.expression.accept(this);if(t.type!==this.normalizeType(e.type.$type))throw new Error(`Type mismatch in declaration of ${e.declaName}`);this.vars[this.vars.length-1].set(e.declaName,t)}visitReturn(e){var t;return(t=e.return)===null||t===void 0?void 0:t.accept(this)}visitIf(e){let t=e.condition.accept(this);if(t.type!=="bool")throw new Error("Condition in if statement must be a boolean");return t.value&&e.statement.forEach(n=>n.accept(this)),null}visitLoop(e){if(e.condition.accept(this).type!=="bool")throw new Error("Condition in loop statement must be a boolean");e.statement.forEach(n=>n.accept(this))}visitVar(e){return this.lookupVar(e.name)}visitConstInt(e){return{type:"int",value:e.integerValue}}visitConstBool(e){return{type:"bool",value:e.BoolValue}}visitAddExpression(e){let t=e.multexpression[0].accept(this);for(let n=1;n<e.multexpression.length;n++){let i=e.multexpression[n].accept(this);if(e.op[n-1]==="+"){if(i.type!=="int")throw new Error("Addition requires integer operands");t.value+=i.value}else if(e.op[n-1]==="-"){if(i.type!=="int")throw new Error("Soustraction requires integer operands");t.value-=i.value}}return t}visitMultExpression(e){let t=e.singlevalue[0].accept(this);for(let n=1;n<e.singlevalue.length;n++){let i=e.singlevalue[n].accept(this);if(e.op[n-1]==="*"){if(i.type!=="int")throw new Error("Multiplication requires integer operands");t.value*=i.value}else if(e.op[n-1]==="/"){if(i.type!=="int")throw new Error("Division requires integer operands");if(i.value===0)throw new Error("Division by zero is not allowed");t.value/=i.value}}return t}visitAnd(e){for(let n of e.condition)if(n.accept(this).type!=="bool")throw new Error("Logical AND requires boolean operands");let t=!0;for(let n of e.condition){let i=n.accept(this);if(t=t&&i.value,!t)break}return{type:"bool",value:t}}visitOr(e){for(let n of e.condition)if(n.accept(this).type!=="bool")throw new Error("Logical OR requires boolean operands");let t=!1;for(let n of e.condition){let i=n.accept(this);if(t=t||i.value,t)break}return{type:"bool",value:t}}visitEqualBool(e){let t=e.singlevaluebool[0].accept(this),n=e.singlevaluebool[1].accept(this);if(t.type!=="bool"||n.type!=="bool")throw new Error("Equality check requires boolean operands");return{type:"bool",value:t.value===n.value}}visitNotEqualBool(e){let t=e.singlevaluebool[0].accept(this),n=e.singlevaluebool[1].accept(this);if(t.type!=="bool"||n.type!=="bool")throw new Error("Inequality check requires boolean operands");return{type:"bool",value:t.value!==n.value}}visitgetDistance(e){return{type:"int",value:0}}visitgetTimestamp(e){return{type:"int",value:Date.now()}}visitsetSpeed(e){if(e.speed.accept(this).type!=="int")throw new Error("Speed must be an integer");return{type:"void"}}visitTurnLeft(e){if(e.angle.accept(this).type!=="int")throw new Error("Rotation angle must be an integer");return{type:"void"}}visitTurnRight(e){if(e.angle.accept(this).type!=="int")throw new Error("Rotation angle must be an integer");return{type:"void"}}visitEqualInt(e){let t=e.arithmeticexpression[0].accept(this),n=e.arithmeticexpression[1].accept(this);if(t.type!=="int"||n.type!=="int")throw new Error("Equality check requires integer operands");return{type:"bool",value:t.value===n.value}}visitNotEqualInt(e){let t=e.arithmeticexpression[0].accept(this),n=e.arithmeticexpression[1].accept(this);if(t.type!=="int"||n.type!=="int")throw new Error("Inequality check requires integer operands");return{type:"bool",value:t.value!==n.value}}visitGreater(e){let t=e.arithmeticexpression[0].accept(this),n=e.arithmeticexpression[1].accept(this);if(t.type!=="int"||n.type!=="int")throw new Error("Greater-than comparison requires integer operands");return{type:"bool",value:t.value>n.value}}visitLower(e){let t=e.arithmeticexpression[0].accept(this),n=e.arithmeticexpression[1].accept(this);if(t.type!=="int"||n.type!=="int")throw new Error("Less-than comparison requires integer operands");return{type:"bool",value:t.value<n.value}}visitMm(e){return{type:"int",value:e.accept(this).value}}visitCm(e){return{type:"int",value:e.accept(this).value*10}}visitBack(e){if(e.expression.accept(this).type!=="int")throw new Error("Back movement distance must be an integer");return{type:"void"}}visitFront(e){if(e.expression.accept(this).type!=="int")throw new Error("Front movement distance must be an integer");return{type:"void"}}visitLeftSide(e){if(e.expression.accept(this).type!=="int")throw new Error("Left movement distance must be an integer");return{type:"void"}}visitRightSide(e){if(e.expression.accept(this).type!=="int")throw new Error("Right movement distance must be an integer");return{type:"void"}}lookupVar(e){for(let t=this.vars.length-1;t>=0;t--)if(this.vars[t].has(e))return this.vars[t].get(e);throw new Error(`Variable ${e} not found`)}updateVar(e,t){for(let n=this.vars.length-1;n>=0;n--)if(this.vars[n].has(e)){this.vars[n].set(e,t);return}throw new Error(`Variable ${e} not found`)}isReturn(e){return"return"in e}isControleStructure(e){return e instanceof ep||e instanceof tp}normalizeType(e){switch(e??""){case"Nbr":return"int";case"Bool":return"bool";default:return e??""}}};async function zg(r,e){let t=e.shared.workspace.LangiumDocumentFactory.fromString(r,yh.parse("memory://aserobot.document"));await e.shared.workspace.DocumentBuilder.build([t],{validation:!0});let n=t.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?console.log(Vg.green("Parsed and validated your code successfully!")):console.log(Vg.red("Failed to parse and validate your codes!")),n?.value}async function UC(r){let e=Ca(Mi).AseRobot,t=await zg(r,e);return Promise.resolve(t)}async function GC(r){let e=Ca(Mi).AseRobot,t=await zg(r,e),n=new rl;return t.accept(n),Promise.resolve(t)}async function jC(r,e,t){let n=Ca(Mi).AseRobot,i=await zg(r,n);console.log("interprate : scene =",t),t==1?e=new ip:t==2&&(e=new op);let o=new rp(e),s=new rl;return i.accept(s),i.accept(o),e}var rj={validation:{AseRobotValidator:()=>new Yd,AseRobotAcceptWeaver:()=>new Jd}};function Ca(r){let e=yo(Ac(r),CC),t=yo(bc({shared:e}),kC,rj);return e.lsp.ExecuteCommandHandler=new Xg,e.ServiceRegistry.register(t),EC(t),$C(t),{shared:e,AseRobot:t}}var Xg=class extends Bu{registerCommands(e){e("parseAndValidate",t=>UC(t[0])),e("interprate",t=>jC(t[0],t[1],t[2])),e("typeCheck",t=>GC(t[0]))}};var nj=new ka.BrowserMessageReader(self),ij=new ka.BrowserMessageWriter(self),oj=(0,ka.createConnection)(nj,ij),{shared:sj}=Ca(Object.assign({connection:oj},Mi));fR(sj);})();
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
