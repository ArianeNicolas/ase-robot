"use strict";(()=>{var GC=Object.create;var ap=Object.defineProperty;var jC=Object.getOwnPropertyDescriptor;var HC=Object.getOwnPropertyNames;var BC=Object.getPrototypeOf,KC=Object.prototype.hasOwnProperty;var Xg=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,t)=>(typeof require<"u"?require:e)[t]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var H=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),WC=(r,e)=>{for(var t in e)ap(r,t,{get:e[t],enumerable:!0})},VC=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of HC(e))!KC.call(r,i)&&i!==t&&ap(r,i,{get:()=>e[i],enumerable:!(n=jC(e,i))||n.enumerable});return r};var de=(r,e,t)=>(t=r!=null?GC(BC(r)):{},VC(e||!r||!r.__esModule?ap(t,"default",{value:r,enumerable:!0}):t,r));var Vn=H(up=>{"use strict";Object.defineProperty(up,"__esModule",{value:!0});var cp;function lp(){if(cp===void 0)throw new Error("No runtime abstraction layer installed");return cp}(function(r){function e(t){if(t===void 0)throw new Error("No runtime abstraction layer provided");cp=t}r.install=e})(lp||(lp={}));up.default=lp});var fp=H(Ea=>{"use strict";Object.defineProperty(Ea,"__esModule",{value:!0});Ea.Disposable=void 0;var zC;(function(r){function e(t){return{dispose:t}}r.create=e})(zC=Ea.Disposable||(Ea.Disposable={}))});var oo=H(io=>{"use strict";Object.defineProperty(io,"__esModule",{value:!0});io.Emitter=io.Event=void 0;var XC=Vn(),YC;(function(r){let e={dispose(){}};r.None=function(){return e}})(YC=io.Event||(io.Event={}));var dp=class{add(e,t=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(t),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,t)})}remove(e,t=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===t){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let t=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{t.push(n[o].apply(i[o],e))}catch(a){(0,XC.default)().console.error(a)}return t}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},ol=class r{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,t,n)=>{this._callbacks||(this._callbacks=new dp),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,t);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,t),i.dispose=r._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};io.Emitter=ol;ol._noop=function(){}});var Yg=H(sl=>{"use strict";Object.defineProperty(sl,"__esModule",{value:!0});sl.AbstractMessageBuffer=void 0;var JC=13,QC=10,ZC=`\r
`,pp=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let t=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(t),this._totalLength+=t.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,t=0,n=0,i=0;e:for(;t<this._chunks.length;){let c=this._chunks[t];for(n=0;n<c.length;){switch(c[n]){case JC:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case QC:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=c.byteLength,t++}if(e!==4)return;let o=this._read(i+n),s=new Map,a=this.toString(o,"ascii").split(ZC);if(a.length<2)return s;for(let c=0;c<a.length-2;c++){let l=a[c],u=l.indexOf(":");if(u===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,u),m=l.substr(u+1).trim();s.set(f,m)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let t=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);t.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else t.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return t}};sl.AbstractMessageBuffer=pp});var Zg=H(yp=>{"use strict";Object.defineProperty(yp,"__esModule",{value:!0});var Jg=Vn(),jo=fp(),ek=oo(),tk=Yg(),al=class r extends tk.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return r.emptyBuffer}fromString(e,t){return new TextEncoder().encode(e)}toString(e,t){return t==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(t).decode(e)}asNative(e,t){return t===void 0?e:e.slice(0,t)}allocNative(e){return new Uint8Array(e)}};al.emptyBuffer=new Uint8Array(0);var mp=class{constructor(e){this.socket=e,this._onData=new ek.Emitter,this._messageListener=t=>{t.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,Jg.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),jo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),jo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),jo.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},hp=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),jo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),jo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),jo.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,t){if(typeof e=="string"){if(t!==void 0&&t!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${t}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},rk=new TextEncoder,Qg=Object.freeze({messageBuffer:Object.freeze({create:r=>new al(r)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(r,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(rk.encode(JSON.stringify(r,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(r,e)=>{if(!(r instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(r)))}})}),stream:Object.freeze({asReadableStream:r=>new mp(r),asWritableStream:r=>new hp(r)}),console,timer:Object.freeze({setTimeout(r,e,...t){let n=setTimeout(r,e,...t);return{dispose:()=>clearTimeout(n)}},setImmediate(r,...e){let t=setTimeout(r,0,...e);return{dispose:()=>clearTimeout(t)}},setInterval(r,e,...t){let n=setInterval(r,e,...t);return{dispose:()=>clearInterval(n)}}})});function gp(){return Qg}(function(r){function e(){Jg.default.install(Qg)}r.install=e})(gp||(gp={}));yp.default=gp});var Ho=H(rr=>{"use strict";Object.defineProperty(rr,"__esModule",{value:!0});rr.stringArray=rr.array=rr.func=rr.error=rr.number=rr.string=rr.boolean=void 0;function nk(r){return r===!0||r===!1}rr.boolean=nk;function ey(r){return typeof r=="string"||r instanceof String}rr.string=ey;function ik(r){return typeof r=="number"||r instanceof Number}rr.number=ik;function ok(r){return r instanceof Error}rr.error=ok;function sk(r){return typeof r=="function"}rr.func=sk;function ty(r){return Array.isArray(r)}rr.array=ty;function ak(r){return ty(r)&&r.every(e=>ey(e))}rr.stringArray=ak});var Gp=H(z=>{"use strict";Object.defineProperty(z,"__esModule",{value:!0});z.Message=z.NotificationType9=z.NotificationType8=z.NotificationType7=z.NotificationType6=z.NotificationType5=z.NotificationType4=z.NotificationType3=z.NotificationType2=z.NotificationType1=z.NotificationType0=z.NotificationType=z.RequestType9=z.RequestType8=z.RequestType7=z.RequestType6=z.RequestType5=z.RequestType4=z.RequestType3=z.RequestType2=z.RequestType1=z.RequestType=z.RequestType0=z.AbstractMessageSignature=z.ParameterStructures=z.ResponseError=z.ErrorCodes=void 0;var so=Ho(),ry;(function(r){r.ParseError=-32700,r.InvalidRequest=-32600,r.MethodNotFound=-32601,r.InvalidParams=-32602,r.InternalError=-32603,r.jsonrpcReservedErrorRangeStart=-32099,r.serverErrorStart=-32099,r.MessageWriteError=-32099,r.MessageReadError=-32098,r.PendingResponseRejected=-32097,r.ConnectionInactive=-32096,r.ServerNotInitialized=-32002,r.UnknownErrorCode=-32001,r.jsonrpcReservedErrorRangeEnd=-32e3,r.serverErrorEnd=-32e3})(ry=z.ErrorCodes||(z.ErrorCodes={}));var Tp=class r extends Error{constructor(e,t,n){super(t),this.code=so.number(e)?e:ry.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,r.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};z.ResponseError=Tp;var Rr=class r{constructor(e){this.kind=e}static is(e){return e===r.auto||e===r.byName||e===r.byPosition}toString(){return this.kind}};z.ParameterStructures=Rr;Rr.auto=new Rr("auto");Rr.byPosition=new Rr("byPosition");Rr.byName=new Rr("byName");var Xe=class{constructor(e,t){this.method=e,this.numberOfParams=t}get parameterStructures(){return Rr.auto}};z.AbstractMessageSignature=Xe;var vp=class extends Xe{constructor(e){super(e,0)}};z.RequestType0=vp;var xp=class extends Xe{constructor(e,t=Rr.auto){super(e,1),this._parameterStructures=t}get parameterStructures(){return this._parameterStructures}};z.RequestType=xp;var Rp=class extends Xe{constructor(e,t=Rr.auto){super(e,1),this._parameterStructures=t}get parameterStructures(){return this._parameterStructures}};z.RequestType1=Rp;var bp=class extends Xe{constructor(e){super(e,2)}};z.RequestType2=bp;var Ap=class extends Xe{constructor(e){super(e,3)}};z.RequestType3=Ap;var wp=class extends Xe{constructor(e){super(e,4)}};z.RequestType4=wp;var Sp=class extends Xe{constructor(e){super(e,5)}};z.RequestType5=Sp;var Cp=class extends Xe{constructor(e){super(e,6)}};z.RequestType6=Cp;var kp=class extends Xe{constructor(e){super(e,7)}};z.RequestType7=kp;var Ep=class extends Xe{constructor(e){super(e,8)}};z.RequestType8=Ep;var $p=class extends Xe{constructor(e){super(e,9)}};z.RequestType9=$p;var Np=class extends Xe{constructor(e,t=Rr.auto){super(e,1),this._parameterStructures=t}get parameterStructures(){return this._parameterStructures}};z.NotificationType=Np;var _p=class extends Xe{constructor(e){super(e,0)}};z.NotificationType0=_p;var Ip=class extends Xe{constructor(e,t=Rr.auto){super(e,1),this._parameterStructures=t}get parameterStructures(){return this._parameterStructures}};z.NotificationType1=Ip;var Pp=class extends Xe{constructor(e){super(e,2)}};z.NotificationType2=Pp;var Dp=class extends Xe{constructor(e){super(e,3)}};z.NotificationType3=Dp;var Op=class extends Xe{constructor(e){super(e,4)}};z.NotificationType4=Op;var Lp=class extends Xe{constructor(e){super(e,5)}};z.NotificationType5=Lp;var Mp=class extends Xe{constructor(e){super(e,6)}};z.NotificationType6=Mp;var Fp=class extends Xe{constructor(e){super(e,7)}};z.NotificationType7=Fp;var qp=class extends Xe{constructor(e){super(e,8)}};z.NotificationType8=qp;var Up=class extends Xe{constructor(e){super(e,9)}};z.NotificationType9=Up;var ck;(function(r){function e(i){let o=i;return o&&so.string(o.method)&&(so.string(o.id)||so.number(o.id))}r.isRequest=e;function t(i){let o=i;return o&&so.string(o.method)&&i.id===void 0}r.isNotification=t;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(so.string(o.id)||so.number(o.id)||o.id===null)}r.isResponse=n})(ck=z.Message||(z.Message={}))});var Hp=H(zn=>{"use strict";var ny;Object.defineProperty(zn,"__esModule",{value:!0});zn.LRUCache=zn.LinkedMap=zn.Touch=void 0;var fr;(function(r){r.None=0,r.First=1,r.AsOld=r.First,r.Last=2,r.AsNew=r.Last})(fr=zn.Touch||(zn.Touch={}));var cl=class{constructor(){this[ny]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,t=fr.None){let n=this._map.get(e);if(n)return t!==fr.None&&this.touch(n,t),n.value}set(e,t,n=fr.None){let i=this._map.get(e);if(i)i.value=t,n!==fr.None&&this.touch(i,n);else{switch(i={key:e,value:t,next:void 0,previous:void 0},n){case fr.None:this.addItemLast(i);break;case fr.First:this.addItemFirst(i);break;case fr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let t=this._map.get(e);if(t)return this._map.delete(e),this.removeItem(t),this._size--,t.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,t){let n=this._state,i=this._head;for(;i;){if(t?e.bind(t)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,t=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(t){let i={value:t.key,done:!1};return t=t.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,t=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(t){let i={value:t.value,done:!1};return t=t.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,t=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(t){let i={value:[t.key,t.value],done:!1};return t=t.next,i}else return{value:void 0,done:!0}}};return n}[(ny=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let t=this._head,n=this.size;for(;t&&n>e;)this._map.delete(t.key),t=t.next,n--;this._head=t,this._size=n,t&&(t.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let t=e.next,n=e.previous;if(!t||!n)throw new Error("Invalid list");t.previous=n,n.next=t}e.next=void 0,e.previous=void 0,this._state++}touch(e,t){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(t!==fr.First&&t!==fr.Last)){if(t===fr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(t===fr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((t,n)=>{e.push([n,t])}),e}fromJSON(e){this.clear();for(let[t,n]of e)this.set(t,n)}};zn.LinkedMap=cl;var jp=class extends cl{constructor(e,t=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,t),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,t=fr.AsNew){return super.get(e,t)}peek(e){return super.get(e,fr.None)}set(e,t){return super.set(e,t,fr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};zn.LRUCache=jp});var Vp=H(ao=>{"use strict";Object.defineProperty(ao,"__esModule",{value:!0});ao.CancellationTokenSource=ao.CancellationToken=void 0;var lk=Vn(),uk=Ho(),Bp=oo(),Kp;(function(r){r.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Bp.Event.None}),r.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Bp.Event.None});function e(t){let n=t;return n&&(n===r.None||n===r.Cancelled||uk.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}r.is=e})(Kp=ao.CancellationToken||(ao.CancellationToken={}));var fk=Object.freeze(function(r,e){let t=(0,lk.default)().timer.setTimeout(r.bind(e),0);return{dispose(){t.dispose()}}}),ll=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?fk:(this._emitter||(this._emitter=new Bp.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},Wp=class{get token(){return this._token||(this._token=new ll),this._token}cancel(){this._token?this._token.cancel():this._token=Kp.Cancelled}dispose(){this._token?this._token instanceof ll&&this._token.dispose():this._token=Kp.None}};ao.CancellationTokenSource=Wp});var iy=H(Xn=>{"use strict";Object.defineProperty(Xn,"__esModule",{value:!0});Xn.ReadableStreamMessageReader=Xn.AbstractMessageReader=Xn.MessageReader=void 0;var Xp=Vn(),Bo=Ho(),zp=oo(),dk;(function(r){function e(t){let n=t;return n&&Bo.func(n.listen)&&Bo.func(n.dispose)&&Bo.func(n.onError)&&Bo.func(n.onClose)&&Bo.func(n.onPartialMessage)}r.is=e})(dk=Xn.MessageReader||(Xn.MessageReader={}));var ul=class{constructor(){this.errorEmitter=new zp.Emitter,this.closeEmitter=new zp.Emitter,this.partialMessageEmitter=new zp.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${Bo.string(e.message)?e.message:"unknown"}`)}};Xn.AbstractMessageReader=ul;var Yp;(function(r){function e(t){let n,i,o,s=new Map,a,c=new Map;if(t===void 0||typeof t=="string")n=t??"utf-8";else{if(n=t.charset??"utf-8",t.contentDecoder!==void 0&&(o=t.contentDecoder,s.set(o.name,o)),t.contentDecoders!==void 0)for(let l of t.contentDecoders)s.set(l.name,l);if(t.contentTypeDecoder!==void 0&&(a=t.contentTypeDecoder,c.set(a.name,a)),t.contentTypeDecoders!==void 0)for(let l of t.contentTypeDecoders)c.set(l.name,l)}return a===void 0&&(a=(0,Xp.default)().applicationJson.decoder,c.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:c}}r.fromOptions=e})(Yp||(Yp={}));var Jp=class extends ul{constructor(e,t){super(),this.readable=e,this.options=Yp.fromOptions(t),this.buffer=(0,Xp.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let t=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),t}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let s=parseInt(o);if(isNaN(s))throw new Error("Content-Length value must be a number.");this.nextMessageLength=s}let t=this.buffer.tryReadBody(this.nextMessageLength);if(t===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(t):n=Promise.resolve(t),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Xp.default)().timer.setTimeout((e,t)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:t}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Xn.ReadableStreamMessageReader=Jp});var oy=H(fl=>{"use strict";Object.defineProperty(fl,"__esModule",{value:!0});fl.Semaphore=void 0;var pk=Vn(),Qp=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((t,n)=>{this._waiting.push({thunk:e,resolve:t,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,pk.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let t=e.thunk();t instanceof Promise?t.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(t),this.runNext())}catch(t){this._active--,e.reject(t),this.runNext()}}};fl.Semaphore=Qp});var ly=H(Yn=>{"use strict";Object.defineProperty(Yn,"__esModule",{value:!0});Yn.WriteableStreamMessageWriter=Yn.AbstractMessageWriter=Yn.MessageWriter=void 0;var sy=Vn(),$a=Ho(),mk=oy(),ay=oo(),hk="Content-Length: ",cy=`\r
`,gk;(function(r){function e(t){let n=t;return n&&$a.func(n.dispose)&&$a.func(n.onClose)&&$a.func(n.onError)&&$a.func(n.write)}r.is=e})(gk=Yn.MessageWriter||(Yn.MessageWriter={}));var dl=class{constructor(){this.errorEmitter=new ay.Emitter,this.closeEmitter=new ay.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,t,n){this.errorEmitter.fire([this.asError(e),t,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${$a.string(e.message)?e.message:"unknown"}`)}};Yn.AbstractMessageWriter=dl;var Zp;(function(r){function e(t){return t===void 0||typeof t=="string"?{charset:t??"utf-8",contentTypeEncoder:(0,sy.default)().applicationJson.encoder}:{charset:t.charset??"utf-8",contentEncoder:t.contentEncoder,contentTypeEncoder:t.contentTypeEncoder??(0,sy.default)().applicationJson.encoder}}r.fromOptions=e})(Zp||(Zp={}));var em=class extends dl{constructor(e,t){super(),this.writable=e,this.options=Zp.fromOptions(t),this.errorCount=0,this.writeSemaphore=new mk.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(hk,n.byteLength.toString(),cy),i.push(cy),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,t,n){try{return await this.writable.write(t.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,t){this.errorCount++,this.fireError(e,t,this.errorCount)}end(){this.writable.end()}};Yn.WriteableStreamMessageWriter=em});var hy=H(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.createMessageConnection=Y.ConnectionOptions=Y.CancellationStrategy=Y.CancellationSenderStrategy=Y.CancellationReceiverStrategy=Y.ConnectionStrategy=Y.ConnectionError=Y.ConnectionErrors=Y.LogTraceNotification=Y.SetTraceNotification=Y.TraceFormat=Y.TraceValues=Y.Trace=Y.NullLogger=Y.ProgressType=Y.ProgressToken=void 0;var uy=Vn(),It=Ho(),Z=Gp(),fy=Hp(),Na=oo(),tm=Vp(),Ia;(function(r){r.type=new Z.NotificationType("$/cancelRequest")})(Ia||(Ia={}));var dy;(function(r){function e(t){return typeof t=="string"||typeof t=="number"}r.is=e})(dy=Y.ProgressToken||(Y.ProgressToken={}));var _a;(function(r){r.type=new Z.NotificationType("$/progress")})(_a||(_a={}));var rm=class{constructor(){}};Y.ProgressType=rm;var nm;(function(r){function e(t){return It.func(t)}r.is=e})(nm||(nm={}));Y.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var $e;(function(r){r[r.Off=0]="Off",r[r.Messages=1]="Messages",r[r.Compact=2]="Compact",r[r.Verbose=3]="Verbose"})($e=Y.Trace||(Y.Trace={}));var yk;(function(r){r.Off="off",r.Messages="messages",r.Compact="compact",r.Verbose="verbose"})(yk=Y.TraceValues||(Y.TraceValues={}));(function(r){function e(n){if(!It.string(n))return r.Off;switch(n=n.toLowerCase(),n){case"off":return r.Off;case"messages":return r.Messages;case"compact":return r.Compact;case"verbose":return r.Verbose;default:return r.Off}}r.fromString=e;function t(n){switch(n){case r.Off:return"off";case r.Messages:return"messages";case r.Compact:return"compact";case r.Verbose:return"verbose";default:return"off"}}r.toString=t})($e=Y.Trace||(Y.Trace={}));var rn;(function(r){r.Text="text",r.JSON="json"})(rn=Y.TraceFormat||(Y.TraceFormat={}));(function(r){function e(t){return It.string(t)?(t=t.toLowerCase(),t==="json"?r.JSON:r.Text):r.Text}r.fromString=e})(rn=Y.TraceFormat||(Y.TraceFormat={}));var py;(function(r){r.type=new Z.NotificationType("$/setTrace")})(py=Y.SetTraceNotification||(Y.SetTraceNotification={}));var im;(function(r){r.type=new Z.NotificationType("$/logTrace")})(im=Y.LogTraceNotification||(Y.LogTraceNotification={}));var pl;(function(r){r[r.Closed=1]="Closed",r[r.Disposed=2]="Disposed",r[r.AlreadyListening=3]="AlreadyListening"})(pl=Y.ConnectionErrors||(Y.ConnectionErrors={}));var Ko=class r extends Error{constructor(e,t){super(t),this.code=e,Object.setPrototypeOf(this,r.prototype)}};Y.ConnectionError=Ko;var my;(function(r){function e(t){let n=t;return n&&It.func(n.cancelUndispatched)}r.is=e})(my=Y.ConnectionStrategy||(Y.ConnectionStrategy={}));var om;(function(r){r.Message=Object.freeze({createCancellationTokenSource(t){return new tm.CancellationTokenSource}});function e(t){let n=t;return n&&It.func(n.createCancellationTokenSource)}r.is=e})(om=Y.CancellationReceiverStrategy||(Y.CancellationReceiverStrategy={}));var sm;(function(r){r.Message=Object.freeze({sendCancellation(t,n){return t.sendNotification(Ia.type,{id:n})},cleanup(t){}});function e(t){let n=t;return n&&It.func(n.sendCancellation)&&It.func(n.cleanup)}r.is=e})(sm=Y.CancellationSenderStrategy||(Y.CancellationSenderStrategy={}));var am;(function(r){r.Message=Object.freeze({receiver:om.Message,sender:sm.Message});function e(t){let n=t;return n&&om.is(n.receiver)&&sm.is(n.sender)}r.is=e})(am=Y.CancellationStrategy||(Y.CancellationStrategy={}));var Tk;(function(r){function e(t){let n=t;return n&&(am.is(n.cancellationStrategy)||my.is(n.connectionStrategy))}r.is=e})(Tk=Y.ConnectionOptions||(Y.ConnectionOptions={}));var nn;(function(r){r[r.New=1]="New",r[r.Listening=2]="Listening",r[r.Closed=3]="Closed",r[r.Disposed=4]="Disposed"})(nn||(nn={}));function vk(r,e,t,n){let i=t!==void 0?t:Y.NullLogger,o=0,s=0,a=0,c="2.0",l,u=new Map,f,m=new Map,T=new Map,A,S=new fy.LinkedMap,N=new Map,C=new Set,v=new Map,y=$e.Off,$=rn.Text,D,X=nn.New,ye=new Na.Emitter,Ee=new Na.Emitter,Ht=new Na.Emitter,xt=new Na.Emitter,M=new Na.Emitter,w=n&&n.cancellationStrategy?n.cancellationStrategy:am.Message;function U(x){if(x===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+x.toString()}function j(x){return x===null?"res-unknown-"+(++a).toString():"res-"+x.toString()}function ce(){return"not-"+(++s).toString()}function ee(x,P){Z.Message.isRequest(P)?x.set(U(P.id),P):Z.Message.isResponse(P)?x.set(j(P.id),P):x.set(ce(),P)}function Q(x){}function Rt(){return X===nn.Listening}function ut(){return X===nn.Closed}function me(){return X===nn.Disposed}function $r(){(X===nn.New||X===nn.Listening)&&(X=nn.Closed,Ee.fire(void 0))}function Bn(x){ye.fire([x,void 0,void 0])}function Ca(x){ye.fire(x)}r.onClose($r),r.onError(Bn),e.onClose($r),e.onError(Ca);function eo(){A||S.size===0||(A=(0,uy.default)().timer.setImmediate(()=>{A=void 0,ur()}))}function ur(){if(S.size===0)return;let x=S.shift();try{Z.Message.isRequest(x)?bt(x):Z.Message.isNotification(x)?bn(x):Z.Message.isResponse(x)?er(x):Bt(x)}finally{eo()}}let qo=x=>{try{if(Z.Message.isNotification(x)&&x.method===Ia.type.method){let P=x.params.id,F=U(P),W=S.get(F);if(Z.Message.isRequest(W)){let Oe=n?.connectionStrategy,Je=Oe&&Oe.cancelUndispatched?Oe.cancelUndispatched(W,Q):void 0;if(Je&&(Je.error!==void 0||Je.result!==void 0)){S.delete(F),v.delete(P),Je.id=W.id,xr(Je,x.method,Date.now()),e.write(Je).catch(()=>i.error("Sending response for canceled message failed."));return}}let De=v.get(P);if(De!==void 0){De.cancel(),Ri(x);return}else C.add(P)}ee(S,x)}finally{eo()}};function bt(x){if(me())return;function P(ue,qe,Te){let gt={jsonrpc:c,id:x.id};ue instanceof Z.ResponseError?gt.error=ue.toJson():gt.result=ue===void 0?null:ue,xr(gt,qe,Te),e.write(gt).catch(()=>i.error("Sending response failed."))}function F(ue,qe,Te){let gt={jsonrpc:c,id:x.id,error:ue.toJson()};xr(gt,qe,Te),e.write(gt).catch(()=>i.error("Sending response failed."))}function W(ue,qe,Te){ue===void 0&&(ue=null);let gt={jsonrpc:c,id:x.id,result:ue};xr(gt,qe,Te),e.write(gt).catch(()=>i.error("Sending response failed."))}to(x);let De=u.get(x.method),Oe,Je;De&&(Oe=De.type,Je=De.handler);let At=Date.now();if(Je||l){let ue=x.id??String(Date.now()),qe=w.receiver.createCancellationTokenSource(ue);x.id!==null&&C.has(x.id)&&qe.cancel(),x.id!==null&&v.set(ue,qe);try{let Te;if(Je)if(x.params===void 0){if(Oe!==void 0&&Oe.numberOfParams!==0){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines ${Oe.numberOfParams} params but received none.`),x.method,At);return}Te=Je(qe.token)}else if(Array.isArray(x.params)){if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byName){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by name but received parameters by position`),x.method,At);return}Te=Je(...x.params,qe.token)}else{if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byPosition){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by position but received parameters by name`),x.method,At);return}Te=Je(x.params,qe.token)}else l&&(Te=l(x.method,x.params,qe.token));let gt=Te;Te?gt.then?gt.then(tr=>{v.delete(ue),P(tr,x.method,At)},tr=>{v.delete(ue),tr instanceof Z.ResponseError?F(tr,x.method,At):tr&&It.string(tr.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${tr.message}`),x.method,At):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,At)}):(v.delete(ue),P(Te,x.method,At)):(v.delete(ue),W(Te,x.method,At))}catch(Te){v.delete(ue),Te instanceof Z.ResponseError?P(Te,x.method,At):Te&&It.string(Te.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${Te.message}`),x.method,At):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,At)}}else F(new Z.ResponseError(Z.ErrorCodes.MethodNotFound,`Unhandled method ${x.method}`),x.method,At)}function er(x){if(!me())if(x.id===null)x.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(x.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let P=x.id,F=N.get(P);if(ip(x,F),F!==void 0){N.delete(P);try{if(x.error){let W=x.error;F.reject(new Z.ResponseError(W.code,W.message,W.data))}else if(x.result!==void 0)F.resolve(x.result);else throw new Error("Should never happen.")}catch(W){W.message?i.error(`Response handler '${F.method}' failed with message: ${W.message}`):i.error(`Response handler '${F.method}' failed unexpectedly.`)}}}}function bn(x){if(me())return;let P,F;if(x.method===Ia.type.method){let W=x.params.id;C.delete(W),Ri(x);return}else{let W=m.get(x.method);W&&(F=W.handler,P=W.type)}if(F||f)try{if(Ri(x),F)if(x.params===void 0)P!==void 0&&P.numberOfParams!==0&&P.parameterStructures!==Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines ${P.numberOfParams} params but received none.`),F();else if(Array.isArray(x.params)){let W=x.params;x.method===_a.type.method&&W.length===2&&dy.is(W[0])?F({token:W[0],value:W[1]}):(P!==void 0&&(P.parameterStructures===Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines parameters by name but received parameters by position`),P.numberOfParams!==x.params.length&&i.error(`Notification ${x.method} defines ${P.numberOfParams} params but received ${W.length} arguments`)),F(...W))}else P!==void 0&&P.parameterStructures===Z.ParameterStructures.byPosition&&i.error(`Notification ${x.method} defines parameters by position but received parameters by name`),F(x.params);else f&&f(x.method,x.params)}catch(W){W.message?i.error(`Notification handler '${x.method}' failed with message: ${W.message}`):i.error(`Notification handler '${x.method}' failed unexpectedly.`)}else Ht.fire(x)}function Bt(x){if(!x){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(x,null,4)}`);let P=x;if(It.string(P.id)||It.number(P.id)){let F=P.id,W=N.get(F);W&&W.reject(new Error("The received response has neither a result nor an error property."))}}function ft(x){if(x!=null)switch(y){case $e.Verbose:return JSON.stringify(x,null,4);case $e.Compact:return JSON.stringify(x);default:return}}function Gr(x){if(!(y===$e.Off||!D))if($===rn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&x.params&&(P=`Params: ${ft(x.params)}

`),D.log(`Sending request '${x.method} - (${x.id})'.`,P)}else bi("send-request",x)}function Nr(x){if(!(y===$e.Off||!D))if($===rn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&(x.params?P=`Params: ${ft(x.params)}

`:P=`No parameters provided.

`),D.log(`Sending notification '${x.method}'.`,P)}else bi("send-notification",x)}function xr(x,P,F){if(!(y===$e.Off||!D))if($===rn.Text){let W;(y===$e.Verbose||y===$e.Compact)&&(x.error&&x.error.data?W=`Error data: ${ft(x.error.data)}

`:x.result?W=`Result: ${ft(x.result)}

`:x.error===void 0&&(W=`No result returned.

`)),D.log(`Sending response '${P} - (${x.id})'. Processing request took ${Date.now()-F}ms`,W)}else bi("send-response",x)}function to(x){if(!(y===$e.Off||!D))if($===rn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&x.params&&(P=`Params: ${ft(x.params)}

`),D.log(`Received request '${x.method} - (${x.id})'.`,P)}else bi("receive-request",x)}function Ri(x){if(!(y===$e.Off||!D||x.method===im.type.method))if($===rn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&(x.params?P=`Params: ${ft(x.params)}

`:P=`No parameters provided.

`),D.log(`Received notification '${x.method}'.`,P)}else bi("receive-notification",x)}function ip(x,P){if(!(y===$e.Off||!D))if($===rn.Text){let F;if((y===$e.Verbose||y===$e.Compact)&&(x.error&&x.error.data?F=`Error data: ${ft(x.error.data)}

`:x.result?F=`Result: ${ft(x.result)}

`:x.error===void 0&&(F=`No result returned.

`)),P){let W=x.error?` Request failed: ${x.error.message} (${x.error.code}).`:"";D.log(`Received response '${P.method} - (${x.id})' in ${Date.now()-P.timerStart}ms.${W}`,F)}else D.log(`Received response ${x.id} without active response promise.`,F)}else bi("receive-response",x)}function bi(x,P){if(!D||y===$e.Off)return;let F={isLSPMessage:!0,type:x,message:P,timestamp:Date.now()};D.log(F)}function ro(){if(ut())throw new Ko(pl.Closed,"Connection is closed.");if(me())throw new Ko(pl.Disposed,"Connection is disposed.")}function op(){if(Rt())throw new Ko(pl.AlreadyListening,"Connection is already listening")}function sp(){if(!Rt())throw new Error("Call listen() first.")}function no(x){return x===void 0?null:x}function Uo(x){if(x!==null)return x}function rl(x){return x!=null&&!Array.isArray(x)&&typeof x=="object"}function ka(x,P){switch(x){case Z.ParameterStructures.auto:return rl(P)?Uo(P):[no(P)];case Z.ParameterStructures.byName:if(!rl(P))throw new Error("Received parameters by name but param is not an object literal.");return Uo(P);case Z.ParameterStructures.byPosition:return[no(P)];default:throw new Error(`Unknown parameter structure ${x.toString()}`)}}function nl(x,P){let F,W=x.numberOfParams;switch(W){case 0:F=void 0;break;case 1:F=ka(x.parameterStructures,P[0]);break;default:F=[];for(let De=0;De<P.length&&De<W;De++)F.push(no(P[De]));if(P.length<W)for(let De=P.length;De<W;De++)F.push(null);break}return F}let Ai={sendNotification:(x,...P)=>{ro();let F,W;if(It.string(x)){F=x;let Oe=P[0],Je=0,At=Z.ParameterStructures.auto;Z.ParameterStructures.is(Oe)&&(Je=1,At=Oe);let ue=P.length,qe=ue-Je;switch(qe){case 0:W=void 0;break;case 1:W=ka(At,P[Je]);break;default:if(At===Z.ParameterStructures.byName)throw new Error(`Received ${qe} parameters for 'by Name' notification parameter structure.`);W=P.slice(Je,ue).map(Te=>no(Te));break}}else{let Oe=P;F=x.method,W=nl(x,Oe)}let De={jsonrpc:c,method:F,params:W};return Nr(De),e.write(De).catch(()=>i.error("Sending notification failed."))},onNotification:(x,P)=>{ro();let F;return It.func(x)?f=x:P&&(It.string(x)?(F=x,m.set(x,{type:void 0,handler:P})):(F=x.method,m.set(x.method,{type:x,handler:P}))),{dispose:()=>{F!==void 0?m.delete(F):f=void 0}}},onProgress:(x,P,F)=>{if(T.has(P))throw new Error(`Progress handler for token ${P} already registered`);return T.set(P,F),{dispose:()=>{T.delete(P)}}},sendProgress:(x,P,F)=>Ai.sendNotification(_a.type,{token:P,value:F}),onUnhandledProgress:xt.event,sendRequest:(x,...P)=>{ro(),sp();let F,W,De;if(It.string(x)){F=x;let ue=P[0],qe=P[P.length-1],Te=0,gt=Z.ParameterStructures.auto;Z.ParameterStructures.is(ue)&&(Te=1,gt=ue);let tr=P.length;tm.CancellationToken.is(qe)&&(tr=tr-1,De=qe);let Kn=tr-Te;switch(Kn){case 0:W=void 0;break;case 1:W=ka(gt,P[Te]);break;default:if(gt===Z.ParameterStructures.byName)throw new Error(`Received ${Kn} parameters for 'by Name' request parameter structure.`);W=P.slice(Te,tr).map(An=>no(An));break}}else{let ue=P;F=x.method,W=nl(x,ue);let qe=x.numberOfParams;De=tm.CancellationToken.is(ue[qe])?ue[qe]:void 0}let Oe=o++,Je;return De&&(Je=De.onCancellationRequested(()=>{let ue=w.sender.sendCancellation(Ai,Oe);return ue===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Oe}`),Promise.resolve()):ue.catch(()=>{i.log(`Sending cancellation messages for id ${Oe} failed`)})})),new Promise((ue,qe)=>{let Te={jsonrpc:c,id:Oe,method:F,params:W},gt=An=>{ue(An),w.sender.cleanup(Oe),Je?.dispose()},tr=An=>{qe(An),w.sender.cleanup(Oe),Je?.dispose()},Kn={method:F,timerStart:Date.now(),resolve:gt,reject:tr};Gr(Te);try{e.write(Te).catch(()=>i.error("Sending request failed."))}catch(An){Kn.reject(new Z.ResponseError(Z.ErrorCodes.MessageWriteError,An.message?An.message:"Unknown reason")),Kn=null}Kn&&N.set(Oe,Kn)})},onRequest:(x,P)=>{ro();let F=null;return nm.is(x)?(F=void 0,l=x):It.string(x)?(F=null,P!==void 0&&(F=x,u.set(x,{handler:P,type:void 0}))):P!==void 0&&(F=x.method,u.set(x.method,{type:x,handler:P})),{dispose:()=>{F!==null&&(F!==void 0?u.delete(F):l=void 0)}}},hasPendingResponse:()=>N.size>0,trace:async(x,P,F)=>{let W=!1,De=rn.Text;F!==void 0&&(It.boolean(F)?W=F:(W=F.sendNotification||!1,De=F.traceFormat||rn.Text)),y=x,$=De,y===$e.Off?D=void 0:D=P,W&&!ut()&&!me()&&await Ai.sendNotification(py.type,{value:$e.toString(x)})},onError:ye.event,onClose:Ee.event,onUnhandledNotification:Ht.event,onDispose:M.event,end:()=>{e.end()},dispose:()=>{if(me())return;X=nn.Disposed,M.fire(void 0);let x=new Z.ResponseError(Z.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let P of N.values())P.reject(x);N=new Map,v=new Map,C=new Set,S=new fy.LinkedMap,It.func(e.dispose)&&e.dispose(),It.func(r.dispose)&&r.dispose()},listen:()=>{ro(),op(),X=nn.Listening,r.listen(qo)},inspect:()=>{(0,uy.default)().console.log("inspect")}};return Ai.onNotification(im.type,x=>{if(y===$e.Off||!D)return;let P=y===$e.Verbose||y===$e.Compact;D.log(x.message,P?x.verbose:void 0)}),Ai.onNotification(_a.type,x=>{let P=T.get(x.token);P?P(x.value):xt.fire(x)}),Ai}Y.createMessageConnection=vk});var fm=H(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.TraceFormat=_.TraceValues=_.Trace=_.ProgressType=_.ProgressToken=_.createMessageConnection=_.NullLogger=_.ConnectionOptions=_.ConnectionStrategy=_.WriteableStreamMessageWriter=_.AbstractMessageWriter=_.MessageWriter=_.ReadableStreamMessageReader=_.AbstractMessageReader=_.MessageReader=_.CancellationToken=_.CancellationTokenSource=_.Emitter=_.Event=_.Disposable=_.LRUCache=_.Touch=_.LinkedMap=_.ParameterStructures=_.NotificationType9=_.NotificationType8=_.NotificationType7=_.NotificationType6=_.NotificationType5=_.NotificationType4=_.NotificationType3=_.NotificationType2=_.NotificationType1=_.NotificationType0=_.NotificationType=_.ErrorCodes=_.ResponseError=_.RequestType9=_.RequestType8=_.RequestType7=_.RequestType6=_.RequestType5=_.RequestType4=_.RequestType3=_.RequestType2=_.RequestType1=_.RequestType0=_.RequestType=_.Message=_.RAL=void 0;_.CancellationStrategy=_.CancellationSenderStrategy=_.CancellationReceiverStrategy=_.ConnectionError=_.ConnectionErrors=_.LogTraceNotification=_.SetTraceNotification=void 0;var Ge=Gp();Object.defineProperty(_,"Message",{enumerable:!0,get:function(){return Ge.Message}});Object.defineProperty(_,"RequestType",{enumerable:!0,get:function(){return Ge.RequestType}});Object.defineProperty(_,"RequestType0",{enumerable:!0,get:function(){return Ge.RequestType0}});Object.defineProperty(_,"RequestType1",{enumerable:!0,get:function(){return Ge.RequestType1}});Object.defineProperty(_,"RequestType2",{enumerable:!0,get:function(){return Ge.RequestType2}});Object.defineProperty(_,"RequestType3",{enumerable:!0,get:function(){return Ge.RequestType3}});Object.defineProperty(_,"RequestType4",{enumerable:!0,get:function(){return Ge.RequestType4}});Object.defineProperty(_,"RequestType5",{enumerable:!0,get:function(){return Ge.RequestType5}});Object.defineProperty(_,"RequestType6",{enumerable:!0,get:function(){return Ge.RequestType6}});Object.defineProperty(_,"RequestType7",{enumerable:!0,get:function(){return Ge.RequestType7}});Object.defineProperty(_,"RequestType8",{enumerable:!0,get:function(){return Ge.RequestType8}});Object.defineProperty(_,"RequestType9",{enumerable:!0,get:function(){return Ge.RequestType9}});Object.defineProperty(_,"ResponseError",{enumerable:!0,get:function(){return Ge.ResponseError}});Object.defineProperty(_,"ErrorCodes",{enumerable:!0,get:function(){return Ge.ErrorCodes}});Object.defineProperty(_,"NotificationType",{enumerable:!0,get:function(){return Ge.NotificationType}});Object.defineProperty(_,"NotificationType0",{enumerable:!0,get:function(){return Ge.NotificationType0}});Object.defineProperty(_,"NotificationType1",{enumerable:!0,get:function(){return Ge.NotificationType1}});Object.defineProperty(_,"NotificationType2",{enumerable:!0,get:function(){return Ge.NotificationType2}});Object.defineProperty(_,"NotificationType3",{enumerable:!0,get:function(){return Ge.NotificationType3}});Object.defineProperty(_,"NotificationType4",{enumerable:!0,get:function(){return Ge.NotificationType4}});Object.defineProperty(_,"NotificationType5",{enumerable:!0,get:function(){return Ge.NotificationType5}});Object.defineProperty(_,"NotificationType6",{enumerable:!0,get:function(){return Ge.NotificationType6}});Object.defineProperty(_,"NotificationType7",{enumerable:!0,get:function(){return Ge.NotificationType7}});Object.defineProperty(_,"NotificationType8",{enumerable:!0,get:function(){return Ge.NotificationType8}});Object.defineProperty(_,"NotificationType9",{enumerable:!0,get:function(){return Ge.NotificationType9}});Object.defineProperty(_,"ParameterStructures",{enumerable:!0,get:function(){return Ge.ParameterStructures}});var cm=Hp();Object.defineProperty(_,"LinkedMap",{enumerable:!0,get:function(){return cm.LinkedMap}});Object.defineProperty(_,"LRUCache",{enumerable:!0,get:function(){return cm.LRUCache}});Object.defineProperty(_,"Touch",{enumerable:!0,get:function(){return cm.Touch}});var xk=fp();Object.defineProperty(_,"Disposable",{enumerable:!0,get:function(){return xk.Disposable}});var gy=oo();Object.defineProperty(_,"Event",{enumerable:!0,get:function(){return gy.Event}});Object.defineProperty(_,"Emitter",{enumerable:!0,get:function(){return gy.Emitter}});var yy=Vp();Object.defineProperty(_,"CancellationTokenSource",{enumerable:!0,get:function(){return yy.CancellationTokenSource}});Object.defineProperty(_,"CancellationToken",{enumerable:!0,get:function(){return yy.CancellationToken}});var lm=iy();Object.defineProperty(_,"MessageReader",{enumerable:!0,get:function(){return lm.MessageReader}});Object.defineProperty(_,"AbstractMessageReader",{enumerable:!0,get:function(){return lm.AbstractMessageReader}});Object.defineProperty(_,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return lm.ReadableStreamMessageReader}});var um=ly();Object.defineProperty(_,"MessageWriter",{enumerable:!0,get:function(){return um.MessageWriter}});Object.defineProperty(_,"AbstractMessageWriter",{enumerable:!0,get:function(){return um.AbstractMessageWriter}});Object.defineProperty(_,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return um.WriteableStreamMessageWriter}});var nr=hy();Object.defineProperty(_,"ConnectionStrategy",{enumerable:!0,get:function(){return nr.ConnectionStrategy}});Object.defineProperty(_,"ConnectionOptions",{enumerable:!0,get:function(){return nr.ConnectionOptions}});Object.defineProperty(_,"NullLogger",{enumerable:!0,get:function(){return nr.NullLogger}});Object.defineProperty(_,"createMessageConnection",{enumerable:!0,get:function(){return nr.createMessageConnection}});Object.defineProperty(_,"ProgressToken",{enumerable:!0,get:function(){return nr.ProgressToken}});Object.defineProperty(_,"ProgressType",{enumerable:!0,get:function(){return nr.ProgressType}});Object.defineProperty(_,"Trace",{enumerable:!0,get:function(){return nr.Trace}});Object.defineProperty(_,"TraceValues",{enumerable:!0,get:function(){return nr.TraceValues}});Object.defineProperty(_,"TraceFormat",{enumerable:!0,get:function(){return nr.TraceFormat}});Object.defineProperty(_,"SetTraceNotification",{enumerable:!0,get:function(){return nr.SetTraceNotification}});Object.defineProperty(_,"LogTraceNotification",{enumerable:!0,get:function(){return nr.LogTraceNotification}});Object.defineProperty(_,"ConnectionErrors",{enumerable:!0,get:function(){return nr.ConnectionErrors}});Object.defineProperty(_,"ConnectionError",{enumerable:!0,get:function(){return nr.ConnectionError}});Object.defineProperty(_,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return nr.CancellationReceiverStrategy}});Object.defineProperty(_,"CancellationSenderStrategy",{enumerable:!0,get:function(){return nr.CancellationSenderStrategy}});Object.defineProperty(_,"CancellationStrategy",{enumerable:!0,get:function(){return nr.CancellationStrategy}});var Rk=Vn();_.RAL=Rk.default});var Jn=H(_r=>{"use strict";var bk=_r&&_r.__createBinding||(Object.create?function(r,e,t,n){n===void 0&&(n=t);var i=Object.getOwnPropertyDescriptor(e,t);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,n,i)}:function(r,e,t,n){n===void 0&&(n=t),r[n]=e[t]}),Ak=_r&&_r.__exportStar||function(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&bk(e,r,t)};Object.defineProperty(_r,"__esModule",{value:!0});_r.createMessageConnection=_r.BrowserMessageWriter=_r.BrowserMessageReader=void 0;var wk=Zg();wk.default.install();var Wo=fm();Ak(fm(),_r);var dm=class extends Wo.AbstractMessageReader{constructor(e){super(),this._onData=new Wo.Emitter,this._messageListener=t=>{this._onData.fire(t.data)},e.addEventListener("error",t=>this.fireError(t)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};_r.BrowserMessageReader=dm;var pm=class extends Wo.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",t=>this.fireError(t))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(t){return this.handleError(t,e),Promise.reject(t)}}handleError(e,t){this.errorCount++,this.fireError(e,t,this.errorCount)}end(){}};_r.BrowserMessageWriter=pm;function Sk(r,e,t,n){return t===void 0&&(t=Wo.NullLogger),Wo.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Wo.createMessageConnection)(r,e,t,n)}_r.createMessageConnection=Sk});var mm=H((xj,Ty)=>{"use strict";Ty.exports=Jn()});var co=H((vy,ml)=>{(function(r){if(typeof ml=="object"&&typeof ml.exports=="object"){var e=r(Xg,vy);e!==void 0&&(ml.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],r)})(function(r,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var t;(function(p){function R(b){return typeof b=="string"}p.is=R})(t=e.DocumentUri||(e.DocumentUri={}));var n;(function(p){function R(b){return typeof b=="string"}p.is=R})(n=e.URI||(e.URI={}));var i;(function(p){p.MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(i=e.integer||(e.integer={}));var o;(function(p){p.MIN_VALUE=0,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(o=e.uinteger||(e.uinteger={}));var s;(function(p){function R(g,d){return g===Number.MAX_VALUE&&(g=o.MAX_VALUE),d===Number.MAX_VALUE&&(d=o.MAX_VALUE),{line:g,character:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.line)&&k.uinteger(d.character)}p.is=b})(s=e.Position||(e.Position={}));var a;(function(p){function R(g,d,E,I){if(k.uinteger(g)&&k.uinteger(d)&&k.uinteger(E)&&k.uinteger(I))return{start:s.create(g,d),end:s.create(E,I)};if(s.is(g)&&s.is(d))return{start:g,end:d};throw new Error("Range#create called with invalid arguments[".concat(g,", ").concat(d,", ").concat(E,", ").concat(I,"]"))}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&s.is(d.start)&&s.is(d.end)}p.is=b})(a=e.Range||(e.Range={}));var c;(function(p){function R(g,d){return{uri:g,range:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(k.string(d.uri)||k.undefined(d.uri))}p.is=b})(c=e.Location||(e.Location={}));var l;(function(p){function R(g,d,E,I){return{targetUri:g,targetRange:d,targetSelectionRange:E,originSelectionRange:I}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.targetRange)&&k.string(d.targetUri)&&a.is(d.targetSelectionRange)&&(a.is(d.originSelectionRange)||k.undefined(d.originSelectionRange))}p.is=b})(l=e.LocationLink||(e.LocationLink={}));var u;(function(p){function R(g,d,E,I){return{red:g,green:d,blue:E,alpha:I}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.numberRange(d.red,0,1)&&k.numberRange(d.green,0,1)&&k.numberRange(d.blue,0,1)&&k.numberRange(d.alpha,0,1)}p.is=b})(u=e.Color||(e.Color={}));var f;(function(p){function R(g,d){return{range:g,color:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&u.is(d.color)}p.is=b})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(p){function R(g,d,E){return{label:g,textEdit:d,additionalTextEdits:E}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.undefined(d.textEdit)||D.is(d))&&(k.undefined(d.additionalTextEdits)||k.typedArray(d.additionalTextEdits,D.is))}p.is=b})(m=e.ColorPresentation||(e.ColorPresentation={}));var T;(function(p){p.Comment="comment",p.Imports="imports",p.Region="region"})(T=e.FoldingRangeKind||(e.FoldingRangeKind={}));var A;(function(p){function R(g,d,E,I,re,dt){var Ue={startLine:g,endLine:d};return k.defined(E)&&(Ue.startCharacter=E),k.defined(I)&&(Ue.endCharacter=I),k.defined(re)&&(Ue.kind=re),k.defined(dt)&&(Ue.collapsedText=dt),Ue}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.startLine)&&k.uinteger(d.startLine)&&(k.undefined(d.startCharacter)||k.uinteger(d.startCharacter))&&(k.undefined(d.endCharacter)||k.uinteger(d.endCharacter))&&(k.undefined(d.kind)||k.string(d.kind))}p.is=b})(A=e.FoldingRange||(e.FoldingRange={}));var S;(function(p){function R(g,d){return{location:g,message:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&c.is(d.location)&&k.string(d.message)}p.is=b})(S=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var N;(function(p){p.Error=1,p.Warning=2,p.Information=3,p.Hint=4})(N=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var C;(function(p){p.Unnecessary=1,p.Deprecated=2})(C=e.DiagnosticTag||(e.DiagnosticTag={}));var v;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&k.string(g.href)}p.is=R})(v=e.CodeDescription||(e.CodeDescription={}));var y;(function(p){function R(g,d,E,I,re,dt){var Ue={range:g,message:d};return k.defined(E)&&(Ue.severity=E),k.defined(I)&&(Ue.code=I),k.defined(re)&&(Ue.source=re),k.defined(dt)&&(Ue.relatedInformation=dt),Ue}p.create=R;function b(g){var d,E=g;return k.defined(E)&&a.is(E.range)&&k.string(E.message)&&(k.number(E.severity)||k.undefined(E.severity))&&(k.integer(E.code)||k.string(E.code)||k.undefined(E.code))&&(k.undefined(E.codeDescription)||k.string((d=E.codeDescription)===null||d===void 0?void 0:d.href))&&(k.string(E.source)||k.undefined(E.source))&&(k.undefined(E.relatedInformation)||k.typedArray(E.relatedInformation,S.is))}p.is=b})(y=e.Diagnostic||(e.Diagnostic={}));var $;(function(p){function R(g,d){for(var E=[],I=2;I<arguments.length;I++)E[I-2]=arguments[I];var re={title:g,command:d};return k.defined(E)&&E.length>0&&(re.arguments=E),re}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.title)&&k.string(d.command)}p.is=b})($=e.Command||(e.Command={}));var D;(function(p){function R(E,I){return{range:E,newText:I}}p.replace=R;function b(E,I){return{range:{start:E,end:E},newText:I}}p.insert=b;function g(E){return{range:E,newText:""}}p.del=g;function d(E){var I=E;return k.objectLiteral(I)&&k.string(I.newText)&&a.is(I.range)}p.is=d})(D=e.TextEdit||(e.TextEdit={}));var X;(function(p){function R(g,d,E){var I={label:g};return d!==void 0&&(I.needsConfirmation=d),E!==void 0&&(I.description=E),I}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.boolean(d.needsConfirmation)||d.needsConfirmation===void 0)&&(k.string(d.description)||d.description===void 0)}p.is=b})(X=e.ChangeAnnotation||(e.ChangeAnnotation={}));var ye;(function(p){function R(b){var g=b;return k.string(g)}p.is=R})(ye=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ee;(function(p){function R(E,I,re){return{range:E,newText:I,annotationId:re}}p.replace=R;function b(E,I,re){return{range:{start:E,end:E},newText:I,annotationId:re}}p.insert=b;function g(E,I){return{range:E,newText:"",annotationId:I}}p.del=g;function d(E){var I=E;return D.is(I)&&(X.is(I.annotationId)||ye.is(I.annotationId))}p.is=d})(Ee=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Ht;(function(p){function R(g,d){return{textDocument:g,edits:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&ut.is(d.textDocument)&&Array.isArray(d.edits)}p.is=b})(Ht=e.TextDocumentEdit||(e.TextDocumentEdit={}));var xt;(function(p){function R(g,d,E){var I={kind:"create",uri:g};return d!==void 0&&(d.overwrite!==void 0||d.ignoreIfExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=R;function b(g){var d=g;return d&&d.kind==="create"&&k.string(d.uri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=b})(xt=e.CreateFile||(e.CreateFile={}));var M;(function(p){function R(g,d,E,I){var re={kind:"rename",oldUri:g,newUri:d};return E!==void 0&&(E.overwrite!==void 0||E.ignoreIfExists!==void 0)&&(re.options=E),I!==void 0&&(re.annotationId=I),re}p.create=R;function b(g){var d=g;return d&&d.kind==="rename"&&k.string(d.oldUri)&&k.string(d.newUri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=b})(M=e.RenameFile||(e.RenameFile={}));var w;(function(p){function R(g,d,E){var I={kind:"delete",uri:g};return d!==void 0&&(d.recursive!==void 0||d.ignoreIfNotExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=R;function b(g){var d=g;return d&&d.kind==="delete"&&k.string(d.uri)&&(d.options===void 0||(d.options.recursive===void 0||k.boolean(d.options.recursive))&&(d.options.ignoreIfNotExists===void 0||k.boolean(d.options.ignoreIfNotExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=b})(w=e.DeleteFile||(e.DeleteFile={}));var U;(function(p){function R(b){var g=b;return g&&(g.changes!==void 0||g.documentChanges!==void 0)&&(g.documentChanges===void 0||g.documentChanges.every(function(d){return k.string(d.kind)?xt.is(d)||M.is(d)||w.is(d):Ht.is(d)}))}p.is=R})(U=e.WorkspaceEdit||(e.WorkspaceEdit={}));var j=function(){function p(R,b){this.edits=R,this.changeAnnotations=b}return p.prototype.insert=function(R,b,g){var d,E;if(g===void 0?d=D.insert(R,b):ye.is(g)?(E=g,d=Ee.insert(R,b,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.insert(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.replace=function(R,b,g){var d,E;if(g===void 0?d=D.replace(R,b):ye.is(g)?(E=g,d=Ee.replace(R,b,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.replace(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.delete=function(R,b){var g,d;if(b===void 0?g=D.del(R):ye.is(b)?(d=b,g=Ee.del(R,b)):(this.assertChangeAnnotations(this.changeAnnotations),d=this.changeAnnotations.manage(b),g=Ee.del(R,d)),this.edits.push(g),d!==void 0)return d},p.prototype.add=function(R){this.edits.push(R)},p.prototype.all=function(){return this.edits},p.prototype.clear=function(){this.edits.splice(0,this.edits.length)},p.prototype.assertChangeAnnotations=function(R){if(R===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},p}(),ce=function(){function p(R){this._annotations=R===void 0?Object.create(null):R,this._counter=0,this._size=0}return p.prototype.all=function(){return this._annotations},Object.defineProperty(p.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),p.prototype.manage=function(R,b){var g;if(ye.is(R)?g=R:(g=this.nextId(),b=R),this._annotations[g]!==void 0)throw new Error("Id ".concat(g," is already in use."));if(b===void 0)throw new Error("No annotation provided for id ".concat(g));return this._annotations[g]=b,this._size++,g},p.prototype.nextId=function(){return this._counter++,this._counter.toString()},p}(),ee=function(){function p(R){var b=this;this._textEditChanges=Object.create(null),R!==void 0?(this._workspaceEdit=R,R.documentChanges?(this._changeAnnotations=new ce(R.changeAnnotations),R.changeAnnotations=this._changeAnnotations.all(),R.documentChanges.forEach(function(g){if(Ht.is(g)){var d=new j(g.edits,b._changeAnnotations);b._textEditChanges[g.textDocument.uri]=d}})):R.changes&&Object.keys(R.changes).forEach(function(g){var d=new j(R.changes[g]);b._textEditChanges[g]=d})):this._workspaceEdit={}}return Object.defineProperty(p.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),p.prototype.getTextEditChange=function(R){if(ut.is(R)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var b={uri:R.uri,version:R.version},g=this._textEditChanges[b.uri];if(!g){var d=[],E={textDocument:b,edits:d};this._workspaceEdit.documentChanges.push(E),g=new j(d,this._changeAnnotations),this._textEditChanges[b.uri]=g}return g}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var g=this._textEditChanges[R];if(!g){var d=[];this._workspaceEdit.changes[R]=d,g=new j(d),this._textEditChanges[R]=g}return g}},p.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new ce,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},p.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},p.prototype.createFile=function(R,b,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ye.is(b)?d=b:g=b;var E,I;if(d===void 0?E=xt.create(R,g):(I=ye.is(d)?d:this._changeAnnotations.manage(d),E=xt.create(R,g,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p.prototype.renameFile=function(R,b,g,d){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var E;X.is(g)||ye.is(g)?E=g:d=g;var I,re;if(E===void 0?I=M.create(R,b,d):(re=ye.is(E)?E:this._changeAnnotations.manage(E),I=M.create(R,b,d,re)),this._workspaceEdit.documentChanges.push(I),re!==void 0)return re},p.prototype.deleteFile=function(R,b,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ye.is(b)?d=b:g=b;var E,I;if(d===void 0?E=w.create(R,g):(I=ye.is(d)?d:this._changeAnnotations.manage(d),E=w.create(R,g,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p}();e.WorkspaceChange=ee;var Q;(function(p){function R(g){return{uri:g}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)}p.is=b})(Q=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var Rt;(function(p){function R(g,d){return{uri:g,version:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.integer(d.version)}p.is=b})(Rt=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ut;(function(p){function R(g,d){return{uri:g,version:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&(d.version===null||k.integer(d.version))}p.is=b})(ut=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var me;(function(p){function R(g,d,E,I){return{uri:g,languageId:d,version:E,text:I}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.string(d.languageId)&&k.integer(d.version)&&k.string(d.text)}p.is=b})(me=e.TextDocumentItem||(e.TextDocumentItem={}));var $r;(function(p){p.PlainText="plaintext",p.Markdown="markdown";function R(b){var g=b;return g===p.PlainText||g===p.Markdown}p.is=R})($r=e.MarkupKind||(e.MarkupKind={}));var Bn;(function(p){function R(b){var g=b;return k.objectLiteral(b)&&$r.is(g.kind)&&k.string(g.value)}p.is=R})(Bn=e.MarkupContent||(e.MarkupContent={}));var Ca;(function(p){p.Text=1,p.Method=2,p.Function=3,p.Constructor=4,p.Field=5,p.Variable=6,p.Class=7,p.Interface=8,p.Module=9,p.Property=10,p.Unit=11,p.Value=12,p.Enum=13,p.Keyword=14,p.Snippet=15,p.Color=16,p.File=17,p.Reference=18,p.Folder=19,p.EnumMember=20,p.Constant=21,p.Struct=22,p.Event=23,p.Operator=24,p.TypeParameter=25})(Ca=e.CompletionItemKind||(e.CompletionItemKind={}));var eo;(function(p){p.PlainText=1,p.Snippet=2})(eo=e.InsertTextFormat||(e.InsertTextFormat={}));var ur;(function(p){p.Deprecated=1})(ur=e.CompletionItemTag||(e.CompletionItemTag={}));var qo;(function(p){function R(g,d,E){return{newText:g,insert:d,replace:E}}p.create=R;function b(g){var d=g;return d&&k.string(d.newText)&&a.is(d.insert)&&a.is(d.replace)}p.is=b})(qo=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var bt;(function(p){p.asIs=1,p.adjustIndentation=2})(bt=e.InsertTextMode||(e.InsertTextMode={}));var er;(function(p){function R(b){var g=b;return g&&(k.string(g.detail)||g.detail===void 0)&&(k.string(g.description)||g.description===void 0)}p.is=R})(er=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var bn;(function(p){function R(b){return{label:b}}p.create=R})(bn=e.CompletionItem||(e.CompletionItem={}));var Bt;(function(p){function R(b,g){return{items:b||[],isIncomplete:!!g}}p.create=R})(Bt=e.CompletionList||(e.CompletionList={}));var ft;(function(p){function R(g){return g.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}p.fromPlainText=R;function b(g){var d=g;return k.string(d)||k.objectLiteral(d)&&k.string(d.language)&&k.string(d.value)}p.is=b})(ft=e.MarkedString||(e.MarkedString={}));var Gr;(function(p){function R(b){var g=b;return!!g&&k.objectLiteral(g)&&(Bn.is(g.contents)||ft.is(g.contents)||k.typedArray(g.contents,ft.is))&&(b.range===void 0||a.is(b.range))}p.is=R})(Gr=e.Hover||(e.Hover={}));var Nr;(function(p){function R(b,g){return g?{label:b,documentation:g}:{label:b}}p.create=R})(Nr=e.ParameterInformation||(e.ParameterInformation={}));var xr;(function(p){function R(b,g){for(var d=[],E=2;E<arguments.length;E++)d[E-2]=arguments[E];var I={label:b};return k.defined(g)&&(I.documentation=g),k.defined(d)?I.parameters=d:I.parameters=[],I}p.create=R})(xr=e.SignatureInformation||(e.SignatureInformation={}));var to;(function(p){p.Text=1,p.Read=2,p.Write=3})(to=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var Ri;(function(p){function R(b,g){var d={range:b};return k.number(g)&&(d.kind=g),d}p.create=R})(Ri=e.DocumentHighlight||(e.DocumentHighlight={}));var ip;(function(p){p.File=1,p.Module=2,p.Namespace=3,p.Package=4,p.Class=5,p.Method=6,p.Property=7,p.Field=8,p.Constructor=9,p.Enum=10,p.Interface=11,p.Function=12,p.Variable=13,p.Constant=14,p.String=15,p.Number=16,p.Boolean=17,p.Array=18,p.Object=19,p.Key=20,p.Null=21,p.EnumMember=22,p.Struct=23,p.Event=24,p.Operator=25,p.TypeParameter=26})(ip=e.SymbolKind||(e.SymbolKind={}));var bi;(function(p){p.Deprecated=1})(bi=e.SymbolTag||(e.SymbolTag={}));var ro;(function(p){function R(b,g,d,E,I){var re={name:b,kind:g,location:{uri:E,range:d}};return I&&(re.containerName=I),re}p.create=R})(ro=e.SymbolInformation||(e.SymbolInformation={}));var op;(function(p){function R(b,g,d,E){return E!==void 0?{name:b,kind:g,location:{uri:d,range:E}}:{name:b,kind:g,location:{uri:d}}}p.create=R})(op=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var sp;(function(p){function R(g,d,E,I,re,dt){var Ue={name:g,detail:d,kind:E,range:I,selectionRange:re};return dt!==void 0&&(Ue.children=dt),Ue}p.create=R;function b(g){var d=g;return d&&k.string(d.name)&&k.number(d.kind)&&a.is(d.range)&&a.is(d.selectionRange)&&(d.detail===void 0||k.string(d.detail))&&(d.deprecated===void 0||k.boolean(d.deprecated))&&(d.children===void 0||Array.isArray(d.children))&&(d.tags===void 0||Array.isArray(d.tags))}p.is=b})(sp=e.DocumentSymbol||(e.DocumentSymbol={}));var no;(function(p){p.Empty="",p.QuickFix="quickfix",p.Refactor="refactor",p.RefactorExtract="refactor.extract",p.RefactorInline="refactor.inline",p.RefactorRewrite="refactor.rewrite",p.Source="source",p.SourceOrganizeImports="source.organizeImports",p.SourceFixAll="source.fixAll"})(no=e.CodeActionKind||(e.CodeActionKind={}));var Uo;(function(p){p.Invoked=1,p.Automatic=2})(Uo=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var rl;(function(p){function R(g,d,E){var I={diagnostics:g};return d!=null&&(I.only=d),E!=null&&(I.triggerKind=E),I}p.create=R;function b(g){var d=g;return k.defined(d)&&k.typedArray(d.diagnostics,y.is)&&(d.only===void 0||k.typedArray(d.only,k.string))&&(d.triggerKind===void 0||d.triggerKind===Uo.Invoked||d.triggerKind===Uo.Automatic)}p.is=b})(rl=e.CodeActionContext||(e.CodeActionContext={}));var ka;(function(p){function R(g,d,E){var I={title:g},re=!0;return typeof d=="string"?(re=!1,I.kind=d):$.is(d)?I.command=d:I.edit=d,re&&E!==void 0&&(I.kind=E),I}p.create=R;function b(g){var d=g;return d&&k.string(d.title)&&(d.diagnostics===void 0||k.typedArray(d.diagnostics,y.is))&&(d.kind===void 0||k.string(d.kind))&&(d.edit!==void 0||d.command!==void 0)&&(d.command===void 0||$.is(d.command))&&(d.isPreferred===void 0||k.boolean(d.isPreferred))&&(d.edit===void 0||U.is(d.edit))}p.is=b})(ka=e.CodeAction||(e.CodeAction={}));var nl;(function(p){function R(g,d){var E={range:g};return k.defined(d)&&(E.data=d),E}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.command)||$.is(d.command))}p.is=b})(nl=e.CodeLens||(e.CodeLens={}));var Ai;(function(p){function R(g,d){return{tabSize:g,insertSpaces:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.uinteger(d.tabSize)&&k.boolean(d.insertSpaces)}p.is=b})(Ai=e.FormattingOptions||(e.FormattingOptions={}));var x;(function(p){function R(g,d,E){return{range:g,target:d,data:E}}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.target)||k.string(d.target))}p.is=b})(x=e.DocumentLink||(e.DocumentLink={}));var P;(function(p){function R(g,d){return{range:g,parent:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(d.parent===void 0||p.is(d.parent))}p.is=b})(P=e.SelectionRange||(e.SelectionRange={}));var F;(function(p){p.namespace="namespace",p.type="type",p.class="class",p.enum="enum",p.interface="interface",p.struct="struct",p.typeParameter="typeParameter",p.parameter="parameter",p.variable="variable",p.property="property",p.enumMember="enumMember",p.event="event",p.function="function",p.method="method",p.macro="macro",p.keyword="keyword",p.modifier="modifier",p.comment="comment",p.string="string",p.number="number",p.regexp="regexp",p.operator="operator",p.decorator="decorator"})(F=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var W;(function(p){p.declaration="declaration",p.definition="definition",p.readonly="readonly",p.static="static",p.deprecated="deprecated",p.abstract="abstract",p.async="async",p.modification="modification",p.documentation="documentation",p.defaultLibrary="defaultLibrary"})(W=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var De;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&(g.resultId===void 0||typeof g.resultId=="string")&&Array.isArray(g.data)&&(g.data.length===0||typeof g.data[0]=="number")}p.is=R})(De=e.SemanticTokens||(e.SemanticTokens={}));var Oe;(function(p){function R(g,d){return{range:g,text:d}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&k.string(d.text)}p.is=b})(Oe=e.InlineValueText||(e.InlineValueText={}));var Je;(function(p){function R(g,d,E){return{range:g,variableName:d,caseSensitiveLookup:E}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&k.boolean(d.caseSensitiveLookup)&&(k.string(d.variableName)||d.variableName===void 0)}p.is=b})(Je=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var At;(function(p){function R(g,d){return{range:g,expression:d}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&(k.string(d.expression)||d.expression===void 0)}p.is=b})(At=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ue;(function(p){function R(g,d){return{frameId:g,stoppedLocation:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(g.stoppedLocation)}p.is=b})(ue=e.InlineValueContext||(e.InlineValueContext={}));var qe;(function(p){p.Type=1,p.Parameter=2;function R(b){return b===1||b===2}p.is=R})(qe=e.InlayHintKind||(e.InlayHintKind={}));var Te;(function(p){function R(g){return{value:g}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&(d.tooltip===void 0||k.string(d.tooltip)||Bn.is(d.tooltip))&&(d.location===void 0||c.is(d.location))&&(d.command===void 0||$.is(d.command))}p.is=b})(Te=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var gt;(function(p){function R(g,d,E){var I={position:g,label:d};return E!==void 0&&(I.kind=E),I}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&s.is(d.position)&&(k.string(d.label)||k.typedArray(d.label,Te.is))&&(d.kind===void 0||qe.is(d.kind))&&d.textEdits===void 0||k.typedArray(d.textEdits,D.is)&&(d.tooltip===void 0||k.string(d.tooltip)||Bn.is(d.tooltip))&&(d.paddingLeft===void 0||k.boolean(d.paddingLeft))&&(d.paddingRight===void 0||k.boolean(d.paddingRight))}p.is=b})(gt=e.InlayHint||(e.InlayHint={}));var tr;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&n.is(g.uri)&&k.string(g.name)}p.is=R})(tr=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var Kn;(function(p){function R(E,I,re,dt){return new An(E,I,re,dt)}p.create=R;function b(E){var I=E;return!!(k.defined(I)&&k.string(I.uri)&&(k.undefined(I.languageId)||k.string(I.languageId))&&k.uinteger(I.lineCount)&&k.func(I.getText)&&k.func(I.positionAt)&&k.func(I.offsetAt))}p.is=b;function g(E,I){for(var re=E.getText(),dt=d(I,function(Go,il){var zg=Go.range.start.line-il.range.start.line;return zg===0?Go.range.start.character-il.range.start.character:zg}),Ue=re.length,en=dt.length-1;en>=0;en--){var tn=dt[en],Wn=E.offsetAt(tn.range.start),fe=E.offsetAt(tn.range.end);if(fe<=Ue)re=re.substring(0,Wn)+tn.newText+re.substring(fe,re.length);else throw new Error("Overlapping edit");Ue=Wn}return re}p.applyEdits=g;function d(E,I){if(E.length<=1)return E;var re=E.length/2|0,dt=E.slice(0,re),Ue=E.slice(re);d(dt,I),d(Ue,I);for(var en=0,tn=0,Wn=0;en<dt.length&&tn<Ue.length;){var fe=I(dt[en],Ue[tn]);fe<=0?E[Wn++]=dt[en++]:E[Wn++]=Ue[tn++]}for(;en<dt.length;)E[Wn++]=dt[en++];for(;tn<Ue.length;)E[Wn++]=Ue[tn++];return E}})(Kn=e.TextDocument||(e.TextDocument={}));var An=function(){function p(R,b,g,d){this._uri=R,this._languageId=b,this._version=g,this._content=d,this._lineOffsets=void 0}return Object.defineProperty(p.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),p.prototype.getText=function(R){if(R){var b=this.offsetAt(R.start),g=this.offsetAt(R.end);return this._content.substring(b,g)}return this._content},p.prototype.update=function(R,b){this._content=R.text,this._version=b,this._lineOffsets=void 0},p.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var R=[],b=this._content,g=!0,d=0;d<b.length;d++){g&&(R.push(d),g=!1);var E=b.charAt(d);g=E==="\r"||E===`
`,E==="\r"&&d+1<b.length&&b.charAt(d+1)===`
`&&d++}g&&b.length>0&&R.push(b.length),this._lineOffsets=R}return this._lineOffsets},p.prototype.positionAt=function(R){R=Math.max(Math.min(R,this._content.length),0);var b=this.getLineOffsets(),g=0,d=b.length;if(d===0)return s.create(0,R);for(;g<d;){var E=Math.floor((g+d)/2);b[E]>R?d=E:g=E+1}var I=g-1;return s.create(I,R-b[I])},p.prototype.offsetAt=function(R){var b=this.getLineOffsets();if(R.line>=b.length)return this._content.length;if(R.line<0)return 0;var g=b[R.line],d=R.line+1<b.length?b[R.line+1]:this._content.length;return Math.max(Math.min(g+R.character,d),g)},Object.defineProperty(p.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),p}(),k;(function(p){var R=Object.prototype.toString;function b(fe){return typeof fe<"u"}p.defined=b;function g(fe){return typeof fe>"u"}p.undefined=g;function d(fe){return fe===!0||fe===!1}p.boolean=d;function E(fe){return R.call(fe)==="[object String]"}p.string=E;function I(fe){return R.call(fe)==="[object Number]"}p.number=I;function re(fe,Go,il){return R.call(fe)==="[object Number]"&&Go<=fe&&fe<=il}p.numberRange=re;function dt(fe){return R.call(fe)==="[object Number]"&&-2147483648<=fe&&fe<=2147483647}p.integer=dt;function Ue(fe){return R.call(fe)==="[object Number]"&&0<=fe&&fe<=2147483647}p.uinteger=Ue;function en(fe){return R.call(fe)==="[object Function]"}p.func=en;function tn(fe){return fe!==null&&typeof fe=="object"}p.objectLiteral=tn;function Wn(fe,Go){return Array.isArray(fe)&&fe.every(Go)}p.typedArray=Wn})(k||(k={}))})});var it=H(dr=>{"use strict";Object.defineProperty(dr,"__esModule",{value:!0});dr.ProtocolNotificationType=dr.ProtocolNotificationType0=dr.ProtocolRequestType=dr.ProtocolRequestType0=dr.RegistrationType=dr.MessageDirection=void 0;var Vo=Jn(),Ck;(function(r){r.clientToServer="clientToServer",r.serverToClient="serverToClient",r.both="both"})(Ck=dr.MessageDirection||(dr.MessageDirection={}));var hm=class{constructor(e){this.method=e}};dr.RegistrationType=hm;var gm=class extends Vo.RequestType0{constructor(e){super(e)}};dr.ProtocolRequestType0=gm;var ym=class extends Vo.RequestType{constructor(e){super(e,Vo.ParameterStructures.byName)}};dr.ProtocolRequestType=ym;var Tm=class extends Vo.NotificationType0{constructor(e){super(e)}};dr.ProtocolNotificationType0=Tm;var vm=class extends Vo.NotificationType{constructor(e){super(e,Vo.ParameterStructures.byName)}};dr.ProtocolNotificationType=vm});var hl=H(wt=>{"use strict";Object.defineProperty(wt,"__esModule",{value:!0});wt.objectLiteral=wt.typedArray=wt.stringArray=wt.array=wt.func=wt.error=wt.number=wt.string=wt.boolean=void 0;function kk(r){return r===!0||r===!1}wt.boolean=kk;function xy(r){return typeof r=="string"||r instanceof String}wt.string=xy;function Ek(r){return typeof r=="number"||r instanceof Number}wt.number=Ek;function $k(r){return r instanceof Error}wt.error=$k;function Nk(r){return typeof r=="function"}wt.func=Nk;function Ry(r){return Array.isArray(r)}wt.array=Ry;function _k(r){return Ry(r)&&r.every(e=>xy(e))}wt.stringArray=_k;function Ik(r,e){return Array.isArray(r)&&r.every(e)}wt.typedArray=Ik;function Pk(r){return r!==null&&typeof r=="object"}wt.objectLiteral=Pk});var Ay=H(Pa=>{"use strict";Object.defineProperty(Pa,"__esModule",{value:!0});Pa.ImplementationRequest=void 0;var by=it(),Dk;(function(r){r.method="textDocument/implementation",r.messageDirection=by.MessageDirection.clientToServer,r.type=new by.ProtocolRequestType(r.method)})(Dk=Pa.ImplementationRequest||(Pa.ImplementationRequest={}))});var Sy=H(Da=>{"use strict";Object.defineProperty(Da,"__esModule",{value:!0});Da.TypeDefinitionRequest=void 0;var wy=it(),Ok;(function(r){r.method="textDocument/typeDefinition",r.messageDirection=wy.MessageDirection.clientToServer,r.type=new wy.ProtocolRequestType(r.method)})(Ok=Da.TypeDefinitionRequest||(Da.TypeDefinitionRequest={}))});var Cy=H(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.DidChangeWorkspaceFoldersNotification=wi.WorkspaceFoldersRequest=void 0;var gl=it(),Lk;(function(r){r.method="workspace/workspaceFolders",r.messageDirection=gl.MessageDirection.serverToClient,r.type=new gl.ProtocolRequestType0(r.method)})(Lk=wi.WorkspaceFoldersRequest||(wi.WorkspaceFoldersRequest={}));var Mk;(function(r){r.method="workspace/didChangeWorkspaceFolders",r.messageDirection=gl.MessageDirection.clientToServer,r.type=new gl.ProtocolNotificationType(r.method)})(Mk=wi.DidChangeWorkspaceFoldersNotification||(wi.DidChangeWorkspaceFoldersNotification={}))});var Ey=H(Oa=>{"use strict";Object.defineProperty(Oa,"__esModule",{value:!0});Oa.ConfigurationRequest=void 0;var ky=it(),Fk;(function(r){r.method="workspace/configuration",r.messageDirection=ky.MessageDirection.serverToClient,r.type=new ky.ProtocolRequestType(r.method)})(Fk=Oa.ConfigurationRequest||(Oa.ConfigurationRequest={}))});var $y=H(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.ColorPresentationRequest=Si.DocumentColorRequest=void 0;var yl=it(),qk;(function(r){r.method="textDocument/documentColor",r.messageDirection=yl.MessageDirection.clientToServer,r.type=new yl.ProtocolRequestType(r.method)})(qk=Si.DocumentColorRequest||(Si.DocumentColorRequest={}));var Uk;(function(r){r.method="textDocument/colorPresentation",r.messageDirection=yl.MessageDirection.clientToServer,r.type=new yl.ProtocolRequestType(r.method)})(Uk=Si.ColorPresentationRequest||(Si.ColorPresentationRequest={}))});var _y=H(La=>{"use strict";Object.defineProperty(La,"__esModule",{value:!0});La.FoldingRangeRequest=void 0;var Ny=it(),Gk;(function(r){r.method="textDocument/foldingRange",r.messageDirection=Ny.MessageDirection.clientToServer,r.type=new Ny.ProtocolRequestType(r.method)})(Gk=La.FoldingRangeRequest||(La.FoldingRangeRequest={}))});var Py=H(Ma=>{"use strict";Object.defineProperty(Ma,"__esModule",{value:!0});Ma.DeclarationRequest=void 0;var Iy=it(),jk;(function(r){r.method="textDocument/declaration",r.messageDirection=Iy.MessageDirection.clientToServer,r.type=new Iy.ProtocolRequestType(r.method)})(jk=Ma.DeclarationRequest||(Ma.DeclarationRequest={}))});var Oy=H(Fa=>{"use strict";Object.defineProperty(Fa,"__esModule",{value:!0});Fa.SelectionRangeRequest=void 0;var Dy=it(),Hk;(function(r){r.method="textDocument/selectionRange",r.messageDirection=Dy.MessageDirection.clientToServer,r.type=new Dy.ProtocolRequestType(r.method)})(Hk=Fa.SelectionRangeRequest||(Fa.SelectionRangeRequest={}))});var Ly=H(on=>{"use strict";Object.defineProperty(on,"__esModule",{value:!0});on.WorkDoneProgressCancelNotification=on.WorkDoneProgressCreateRequest=on.WorkDoneProgress=void 0;var Bk=Jn(),Tl=it(),Kk;(function(r){r.type=new Bk.ProgressType;function e(t){return t===r.type}r.is=e})(Kk=on.WorkDoneProgress||(on.WorkDoneProgress={}));var Wk;(function(r){r.method="window/workDoneProgress/create",r.messageDirection=Tl.MessageDirection.serverToClient,r.type=new Tl.ProtocolRequestType(r.method)})(Wk=on.WorkDoneProgressCreateRequest||(on.WorkDoneProgressCreateRequest={}));var Vk;(function(r){r.method="window/workDoneProgress/cancel",r.messageDirection=Tl.MessageDirection.clientToServer,r.type=new Tl.ProtocolNotificationType(r.method)})(Vk=on.WorkDoneProgressCancelNotification||(on.WorkDoneProgressCancelNotification={}))});var My=H(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.CallHierarchyOutgoingCallsRequest=sn.CallHierarchyIncomingCallsRequest=sn.CallHierarchyPrepareRequest=void 0;var zo=it(),zk;(function(r){r.method="textDocument/prepareCallHierarchy",r.messageDirection=zo.MessageDirection.clientToServer,r.type=new zo.ProtocolRequestType(r.method)})(zk=sn.CallHierarchyPrepareRequest||(sn.CallHierarchyPrepareRequest={}));var Xk;(function(r){r.method="callHierarchy/incomingCalls",r.messageDirection=zo.MessageDirection.clientToServer,r.type=new zo.ProtocolRequestType(r.method)})(Xk=sn.CallHierarchyIncomingCallsRequest||(sn.CallHierarchyIncomingCallsRequest={}));var Yk;(function(r){r.method="callHierarchy/outgoingCalls",r.messageDirection=zo.MessageDirection.clientToServer,r.type=new zo.ProtocolRequestType(r.method)})(Yk=sn.CallHierarchyOutgoingCallsRequest||(sn.CallHierarchyOutgoingCallsRequest={}))});var Fy=H(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.SemanticTokensRefreshRequest=St.SemanticTokensRangeRequest=St.SemanticTokensDeltaRequest=St.SemanticTokensRequest=St.SemanticTokensRegistrationType=St.TokenFormat=void 0;var Qn=it(),Jk;(function(r){r.Relative="relative"})(Jk=St.TokenFormat||(St.TokenFormat={}));var vl;(function(r){r.method="textDocument/semanticTokens",r.type=new Qn.RegistrationType(r.method)})(vl=St.SemanticTokensRegistrationType||(St.SemanticTokensRegistrationType={}));var Qk;(function(r){r.method="textDocument/semanticTokens/full",r.messageDirection=Qn.MessageDirection.clientToServer,r.type=new Qn.ProtocolRequestType(r.method),r.registrationMethod=vl.method})(Qk=St.SemanticTokensRequest||(St.SemanticTokensRequest={}));var Zk;(function(r){r.method="textDocument/semanticTokens/full/delta",r.messageDirection=Qn.MessageDirection.clientToServer,r.type=new Qn.ProtocolRequestType(r.method),r.registrationMethod=vl.method})(Zk=St.SemanticTokensDeltaRequest||(St.SemanticTokensDeltaRequest={}));var eE;(function(r){r.method="textDocument/semanticTokens/range",r.messageDirection=Qn.MessageDirection.clientToServer,r.type=new Qn.ProtocolRequestType(r.method),r.registrationMethod=vl.method})(eE=St.SemanticTokensRangeRequest||(St.SemanticTokensRangeRequest={}));var tE;(function(r){r.method="workspace/semanticTokens/refresh",r.messageDirection=Qn.MessageDirection.clientToServer,r.type=new Qn.ProtocolRequestType0(r.method)})(tE=St.SemanticTokensRefreshRequest||(St.SemanticTokensRefreshRequest={}))});var Uy=H(qa=>{"use strict";Object.defineProperty(qa,"__esModule",{value:!0});qa.ShowDocumentRequest=void 0;var qy=it(),rE;(function(r){r.method="window/showDocument",r.messageDirection=qy.MessageDirection.serverToClient,r.type=new qy.ProtocolRequestType(r.method)})(rE=qa.ShowDocumentRequest||(qa.ShowDocumentRequest={}))});var jy=H(Ua=>{"use strict";Object.defineProperty(Ua,"__esModule",{value:!0});Ua.LinkedEditingRangeRequest=void 0;var Gy=it(),nE;(function(r){r.method="textDocument/linkedEditingRange",r.messageDirection=Gy.MessageDirection.clientToServer,r.type=new Gy.ProtocolRequestType(r.method)})(nE=Ua.LinkedEditingRangeRequest||(Ua.LinkedEditingRangeRequest={}))});var Hy=H(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.WillDeleteFilesRequest=ot.DidDeleteFilesNotification=ot.DidRenameFilesNotification=ot.WillRenameFilesRequest=ot.DidCreateFilesNotification=ot.WillCreateFilesRequest=ot.FileOperationPatternKind=void 0;var jr=it(),iE;(function(r){r.file="file",r.folder="folder"})(iE=ot.FileOperationPatternKind||(ot.FileOperationPatternKind={}));var oE;(function(r){r.method="workspace/willCreateFiles",r.messageDirection=jr.MessageDirection.clientToServer,r.type=new jr.ProtocolRequestType(r.method)})(oE=ot.WillCreateFilesRequest||(ot.WillCreateFilesRequest={}));var sE;(function(r){r.method="workspace/didCreateFiles",r.messageDirection=jr.MessageDirection.clientToServer,r.type=new jr.ProtocolNotificationType(r.method)})(sE=ot.DidCreateFilesNotification||(ot.DidCreateFilesNotification={}));var aE;(function(r){r.method="workspace/willRenameFiles",r.messageDirection=jr.MessageDirection.clientToServer,r.type=new jr.ProtocolRequestType(r.method)})(aE=ot.WillRenameFilesRequest||(ot.WillRenameFilesRequest={}));var cE;(function(r){r.method="workspace/didRenameFiles",r.messageDirection=jr.MessageDirection.clientToServer,r.type=new jr.ProtocolNotificationType(r.method)})(cE=ot.DidRenameFilesNotification||(ot.DidRenameFilesNotification={}));var lE;(function(r){r.method="workspace/didDeleteFiles",r.messageDirection=jr.MessageDirection.clientToServer,r.type=new jr.ProtocolNotificationType(r.method)})(lE=ot.DidDeleteFilesNotification||(ot.DidDeleteFilesNotification={}));var uE;(function(r){r.method="workspace/willDeleteFiles",r.messageDirection=jr.MessageDirection.clientToServer,r.type=new jr.ProtocolRequestType(r.method)})(uE=ot.WillDeleteFilesRequest||(ot.WillDeleteFilesRequest={}))});var Ky=H(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.MonikerRequest=an.MonikerKind=an.UniquenessLevel=void 0;var By=it(),fE;(function(r){r.document="document",r.project="project",r.group="group",r.scheme="scheme",r.global="global"})(fE=an.UniquenessLevel||(an.UniquenessLevel={}));var dE;(function(r){r.$import="import",r.$export="export",r.local="local"})(dE=an.MonikerKind||(an.MonikerKind={}));var pE;(function(r){r.method="textDocument/moniker",r.messageDirection=By.MessageDirection.clientToServer,r.type=new By.ProtocolRequestType(r.method)})(pE=an.MonikerRequest||(an.MonikerRequest={}))});var Wy=H(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.TypeHierarchySubtypesRequest=cn.TypeHierarchySupertypesRequest=cn.TypeHierarchyPrepareRequest=void 0;var Xo=it(),mE;(function(r){r.method="textDocument/prepareTypeHierarchy",r.messageDirection=Xo.MessageDirection.clientToServer,r.type=new Xo.ProtocolRequestType(r.method)})(mE=cn.TypeHierarchyPrepareRequest||(cn.TypeHierarchyPrepareRequest={}));var hE;(function(r){r.method="typeHierarchy/supertypes",r.messageDirection=Xo.MessageDirection.clientToServer,r.type=new Xo.ProtocolRequestType(r.method)})(hE=cn.TypeHierarchySupertypesRequest||(cn.TypeHierarchySupertypesRequest={}));var gE;(function(r){r.method="typeHierarchy/subtypes",r.messageDirection=Xo.MessageDirection.clientToServer,r.type=new Xo.ProtocolRequestType(r.method)})(gE=cn.TypeHierarchySubtypesRequest||(cn.TypeHierarchySubtypesRequest={}))});var Vy=H(Ci=>{"use strict";Object.defineProperty(Ci,"__esModule",{value:!0});Ci.InlineValueRefreshRequest=Ci.InlineValueRequest=void 0;var xl=it(),yE;(function(r){r.method="textDocument/inlineValue",r.messageDirection=xl.MessageDirection.clientToServer,r.type=new xl.ProtocolRequestType(r.method)})(yE=Ci.InlineValueRequest||(Ci.InlineValueRequest={}));var TE;(function(r){r.method="workspace/inlineValue/refresh",r.messageDirection=xl.MessageDirection.clientToServer,r.type=new xl.ProtocolRequestType0(r.method)})(TE=Ci.InlineValueRefreshRequest||(Ci.InlineValueRefreshRequest={}))});var zy=H(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.InlayHintRefreshRequest=ln.InlayHintResolveRequest=ln.InlayHintRequest=void 0;var Yo=it(),vE;(function(r){r.method="textDocument/inlayHint",r.messageDirection=Yo.MessageDirection.clientToServer,r.type=new Yo.ProtocolRequestType(r.method)})(vE=ln.InlayHintRequest||(ln.InlayHintRequest={}));var xE;(function(r){r.method="inlayHint/resolve",r.messageDirection=Yo.MessageDirection.clientToServer,r.type=new Yo.ProtocolRequestType(r.method)})(xE=ln.InlayHintResolveRequest||(ln.InlayHintResolveRequest={}));var RE;(function(r){r.method="workspace/inlayHint/refresh",r.messageDirection=Yo.MessageDirection.clientToServer,r.type=new Yo.ProtocolRequestType0(r.method)})(RE=ln.InlayHintRefreshRequest||(ln.InlayHintRefreshRequest={}))});var Yy=H(Kt=>{"use strict";Object.defineProperty(Kt,"__esModule",{value:!0});Kt.DiagnosticRefreshRequest=Kt.WorkspaceDiagnosticRequest=Kt.DocumentDiagnosticRequest=Kt.DocumentDiagnosticReportKind=Kt.DiagnosticServerCancellationData=void 0;var Xy=Jn(),bE=hl(),Jo=it(),AE;(function(r){function e(t){let n=t;return n&&bE.boolean(n.retriggerRequest)}r.is=e})(AE=Kt.DiagnosticServerCancellationData||(Kt.DiagnosticServerCancellationData={}));var wE;(function(r){r.Full="full",r.Unchanged="unchanged"})(wE=Kt.DocumentDiagnosticReportKind||(Kt.DocumentDiagnosticReportKind={}));var SE;(function(r){r.method="textDocument/diagnostic",r.messageDirection=Jo.MessageDirection.clientToServer,r.type=new Jo.ProtocolRequestType(r.method),r.partialResult=new Xy.ProgressType})(SE=Kt.DocumentDiagnosticRequest||(Kt.DocumentDiagnosticRequest={}));var CE;(function(r){r.method="workspace/diagnostic",r.messageDirection=Jo.MessageDirection.clientToServer,r.type=new Jo.ProtocolRequestType(r.method),r.partialResult=new Xy.ProgressType})(CE=Kt.WorkspaceDiagnosticRequest||(Kt.WorkspaceDiagnosticRequest={}));var kE;(function(r){r.method="workspace/diagnostic/refresh",r.messageDirection=Jo.MessageDirection.clientToServer,r.type=new Jo.ProtocolRequestType0(r.method)})(kE=Kt.DiagnosticRefreshRequest||(Kt.DiagnosticRefreshRequest={}))});var Zy=H(xe=>{"use strict";Object.defineProperty(xe,"__esModule",{value:!0});xe.DidCloseNotebookDocumentNotification=xe.DidSaveNotebookDocumentNotification=xe.DidChangeNotebookDocumentNotification=xe.NotebookCellArrayChange=xe.DidOpenNotebookDocumentNotification=xe.NotebookDocumentSyncRegistrationType=xe.NotebookDocument=xe.NotebookCell=xe.ExecutionSummary=xe.NotebookCellKind=void 0;var Ga=co(),un=hl(),wn=it(),Jy;(function(r){r.Markup=1,r.Code=2;function e(t){return t===1||t===2}r.is=e})(Jy=xe.NotebookCellKind||(xe.NotebookCellKind={}));var Qy;(function(r){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}r.create=e;function t(i){let o=i;return un.objectLiteral(o)&&Ga.uinteger.is(o.executionOrder)&&(o.success===void 0||un.boolean(o.success))}r.is=t;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}r.equals=n})(Qy=xe.ExecutionSummary||(xe.ExecutionSummary={}));var xm;(function(r){function e(o,s){return{kind:o,document:s}}r.create=e;function t(o){let s=o;return un.objectLiteral(s)&&Jy.is(s.kind)&&Ga.DocumentUri.is(s.document)&&(s.metadata===void 0||un.objectLiteral(s.metadata))}r.is=t;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!Qy.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}r.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),c=Array.isArray(s);if(a!==c)return!1;if(a&&c){if(o.length!==s.length)return!1;for(let l=0;l<o.length;l++)if(!i(o[l],s[l]))return!1}if(un.objectLiteral(o)&&un.objectLiteral(s)){let l=Object.keys(o),u=Object.keys(s);if(l.length!==u.length||(l.sort(),u.sort(),!i(l,u)))return!1;for(let f=0;f<l.length;f++){let m=l[f];if(!i(o[m],s[m]))return!1}}return!0}})(xm=xe.NotebookCell||(xe.NotebookCell={}));var EE;(function(r){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}r.create=e;function t(n){let i=n;return un.objectLiteral(i)&&un.string(i.uri)&&Ga.integer.is(i.version)&&un.typedArray(i.cells,xm.is)}r.is=t})(EE=xe.NotebookDocument||(xe.NotebookDocument={}));var ja;(function(r){r.method="notebookDocument/sync",r.messageDirection=wn.MessageDirection.clientToServer,r.type=new wn.RegistrationType(r.method)})(ja=xe.NotebookDocumentSyncRegistrationType||(xe.NotebookDocumentSyncRegistrationType={}));var $E;(function(r){r.method="notebookDocument/didOpen",r.messageDirection=wn.MessageDirection.clientToServer,r.type=new wn.ProtocolNotificationType(r.method),r.registrationMethod=ja.method})($E=xe.DidOpenNotebookDocumentNotification||(xe.DidOpenNotebookDocumentNotification={}));var NE;(function(r){function e(n){let i=n;return un.objectLiteral(i)&&Ga.uinteger.is(i.start)&&Ga.uinteger.is(i.deleteCount)&&(i.cells===void 0||un.typedArray(i.cells,xm.is))}r.is=e;function t(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}r.create=t})(NE=xe.NotebookCellArrayChange||(xe.NotebookCellArrayChange={}));var _E;(function(r){r.method="notebookDocument/didChange",r.messageDirection=wn.MessageDirection.clientToServer,r.type=new wn.ProtocolNotificationType(r.method),r.registrationMethod=ja.method})(_E=xe.DidChangeNotebookDocumentNotification||(xe.DidChangeNotebookDocumentNotification={}));var IE;(function(r){r.method="notebookDocument/didSave",r.messageDirection=wn.MessageDirection.clientToServer,r.type=new wn.ProtocolNotificationType(r.method),r.registrationMethod=ja.method})(IE=xe.DidSaveNotebookDocumentNotification||(xe.DidSaveNotebookDocumentNotification={}));var PE;(function(r){r.method="notebookDocument/didClose",r.messageDirection=wn.MessageDirection.clientToServer,r.type=new wn.ProtocolNotificationType(r.method),r.registrationMethod=ja.method})(PE=xe.DidCloseNotebookDocumentNotification||(xe.DidCloseNotebookDocumentNotification={}))});var cT=H(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=void 0;var O=it(),eT=co(),Wt=hl(),DE=Ay();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return DE.ImplementationRequest}});var OE=Sy();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return OE.TypeDefinitionRequest}});var tT=Cy();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return tT.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return tT.DidChangeWorkspaceFoldersNotification}});var LE=Ey();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return LE.ConfigurationRequest}});var rT=$y();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return rT.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return rT.ColorPresentationRequest}});var ME=_y();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return ME.FoldingRangeRequest}});var FE=Py();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return FE.DeclarationRequest}});var qE=Oy();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return qE.SelectionRangeRequest}});var Rm=Ly();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return Rm.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return Rm.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return Rm.WorkDoneProgressCancelNotification}});var bm=My();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return bm.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return bm.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return bm.CallHierarchyPrepareRequest}});var Qo=Fy();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return Qo.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return Qo.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Qo.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Qo.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Qo.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Qo.SemanticTokensRegistrationType}});var UE=Uy();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return UE.ShowDocumentRequest}});var GE=jy();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return GE.LinkedEditingRangeRequest}});var lo=Hy();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return lo.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return lo.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return lo.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return lo.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return lo.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return lo.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return lo.WillDeleteFilesRequest}});var Am=Ky();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return Am.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return Am.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return Am.MonikerRequest}});var wm=Wy();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return wm.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return wm.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return wm.TypeHierarchySupertypesRequest}});var nT=Vy();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return nT.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return nT.InlineValueRefreshRequest}});var Sm=zy();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return Sm.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return Sm.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return Sm.InlayHintRefreshRequest}});var Ha=Yy();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Ha.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Ha.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Ha.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Ha.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Ha.DiagnosticRefreshRequest}});var Sn=Zy();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return Sn.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return Sn.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return Sn.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return Sn.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return Sn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return Sn.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidCloseNotebookDocumentNotification}});var iT;(function(r){function e(t){let n=t;return Wt.string(n.language)||Wt.string(n.scheme)||Wt.string(n.pattern)}r.is=e})(iT=h.TextDocumentFilter||(h.TextDocumentFilter={}));var oT;(function(r){function e(t){let n=t;return Wt.objectLiteral(n)&&(Wt.string(n.notebookType)||Wt.string(n.scheme)||Wt.string(n.pattern))}r.is=e})(oT=h.NotebookDocumentFilter||(h.NotebookDocumentFilter={}));var sT;(function(r){function e(t){let n=t;return Wt.objectLiteral(n)&&(Wt.string(n.notebook)||oT.is(n.notebook))&&(n.language===void 0||Wt.string(n.language))}r.is=e})(sT=h.NotebookCellTextDocumentFilter||(h.NotebookCellTextDocumentFilter={}));var aT;(function(r){function e(t){if(!Array.isArray(t))return!1;for(let n of t)if(!Wt.string(n)&&!iT.is(n)&&!sT.is(n))return!1;return!0}r.is=e})(aT=h.DocumentSelector||(h.DocumentSelector={}));var jE;(function(r){r.method="client/registerCapability",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolRequestType(r.method)})(jE=h.RegistrationRequest||(h.RegistrationRequest={}));var HE;(function(r){r.method="client/unregisterCapability",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolRequestType(r.method)})(HE=h.UnregistrationRequest||(h.UnregistrationRequest={}));var BE;(function(r){r.Create="create",r.Rename="rename",r.Delete="delete"})(BE=h.ResourceOperationKind||(h.ResourceOperationKind={}));var KE;(function(r){r.Abort="abort",r.Transactional="transactional",r.TextOnlyTransactional="textOnlyTransactional",r.Undo="undo"})(KE=h.FailureHandlingKind||(h.FailureHandlingKind={}));var WE;(function(r){r.UTF8="utf-8",r.UTF16="utf-16",r.UTF32="utf-32"})(WE=h.PositionEncodingKind||(h.PositionEncodingKind={}));var VE;(function(r){function e(t){let n=t;return n&&Wt.string(n.id)&&n.id.length>0}r.hasId=e})(VE=h.StaticRegistrationOptions||(h.StaticRegistrationOptions={}));var zE;(function(r){function e(t){let n=t;return n&&(n.documentSelector===null||aT.is(n.documentSelector))}r.is=e})(zE=h.TextDocumentRegistrationOptions||(h.TextDocumentRegistrationOptions={}));var XE;(function(r){function e(n){let i=n;return Wt.objectLiteral(i)&&(i.workDoneProgress===void 0||Wt.boolean(i.workDoneProgress))}r.is=e;function t(n){let i=n;return i&&Wt.boolean(i.workDoneProgress)}r.hasWorkDoneProgress=t})(XE=h.WorkDoneProgressOptions||(h.WorkDoneProgressOptions={}));var YE;(function(r){r.method="initialize",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(YE=h.InitializeRequest||(h.InitializeRequest={}));var JE;(function(r){r.unknownProtocolVersion=1})(JE=h.InitializeErrorCodes||(h.InitializeErrorCodes={}));var QE;(function(r){r.method="initialized",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(QE=h.InitializedNotification||(h.InitializedNotification={}));var ZE;(function(r){r.method="shutdown",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType0(r.method)})(ZE=h.ShutdownRequest||(h.ShutdownRequest={}));var e$;(function(r){r.method="exit",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType0(r.method)})(e$=h.ExitNotification||(h.ExitNotification={}));var t$;(function(r){r.method="workspace/didChangeConfiguration",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(t$=h.DidChangeConfigurationNotification||(h.DidChangeConfigurationNotification={}));var r$;(function(r){r.Error=1,r.Warning=2,r.Info=3,r.Log=4})(r$=h.MessageType||(h.MessageType={}));var n$;(function(r){r.method="window/showMessage",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolNotificationType(r.method)})(n$=h.ShowMessageNotification||(h.ShowMessageNotification={}));var i$;(function(r){r.method="window/showMessageRequest",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolRequestType(r.method)})(i$=h.ShowMessageRequest||(h.ShowMessageRequest={}));var o$;(function(r){r.method="window/logMessage",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolNotificationType(r.method)})(o$=h.LogMessageNotification||(h.LogMessageNotification={}));var s$;(function(r){r.method="telemetry/event",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolNotificationType(r.method)})(s$=h.TelemetryEventNotification||(h.TelemetryEventNotification={}));var a$;(function(r){r.None=0,r.Full=1,r.Incremental=2})(a$=h.TextDocumentSyncKind||(h.TextDocumentSyncKind={}));var c$;(function(r){r.method="textDocument/didOpen",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(c$=h.DidOpenTextDocumentNotification||(h.DidOpenTextDocumentNotification={}));var l$;(function(r){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}r.isIncremental=e;function t(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}r.isFull=t})(l$=h.TextDocumentContentChangeEvent||(h.TextDocumentContentChangeEvent={}));var u$;(function(r){r.method="textDocument/didChange",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(u$=h.DidChangeTextDocumentNotification||(h.DidChangeTextDocumentNotification={}));var f$;(function(r){r.method="textDocument/didClose",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(f$=h.DidCloseTextDocumentNotification||(h.DidCloseTextDocumentNotification={}));var d$;(function(r){r.method="textDocument/didSave",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(d$=h.DidSaveTextDocumentNotification||(h.DidSaveTextDocumentNotification={}));var p$;(function(r){r.Manual=1,r.AfterDelay=2,r.FocusOut=3})(p$=h.TextDocumentSaveReason||(h.TextDocumentSaveReason={}));var m$;(function(r){r.method="textDocument/willSave",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(m$=h.WillSaveTextDocumentNotification||(h.WillSaveTextDocumentNotification={}));var h$;(function(r){r.method="textDocument/willSaveWaitUntil",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(h$=h.WillSaveTextDocumentWaitUntilRequest||(h.WillSaveTextDocumentWaitUntilRequest={}));var g$;(function(r){r.method="workspace/didChangeWatchedFiles",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolNotificationType(r.method)})(g$=h.DidChangeWatchedFilesNotification||(h.DidChangeWatchedFilesNotification={}));var y$;(function(r){r.Created=1,r.Changed=2,r.Deleted=3})(y$=h.FileChangeType||(h.FileChangeType={}));var T$;(function(r){function e(t){let n=t;return Wt.objectLiteral(n)&&(eT.URI.is(n.baseUri)||eT.WorkspaceFolder.is(n.baseUri))&&Wt.string(n.pattern)}r.is=e})(T$=h.RelativePattern||(h.RelativePattern={}));var v$;(function(r){r.Create=1,r.Change=2,r.Delete=4})(v$=h.WatchKind||(h.WatchKind={}));var x$;(function(r){r.method="textDocument/publishDiagnostics",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolNotificationType(r.method)})(x$=h.PublishDiagnosticsNotification||(h.PublishDiagnosticsNotification={}));var R$;(function(r){r.Invoked=1,r.TriggerCharacter=2,r.TriggerForIncompleteCompletions=3})(R$=h.CompletionTriggerKind||(h.CompletionTriggerKind={}));var b$;(function(r){r.method="textDocument/completion",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(b$=h.CompletionRequest||(h.CompletionRequest={}));var A$;(function(r){r.method="completionItem/resolve",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(A$=h.CompletionResolveRequest||(h.CompletionResolveRequest={}));var w$;(function(r){r.method="textDocument/hover",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(w$=h.HoverRequest||(h.HoverRequest={}));var S$;(function(r){r.Invoked=1,r.TriggerCharacter=2,r.ContentChange=3})(S$=h.SignatureHelpTriggerKind||(h.SignatureHelpTriggerKind={}));var C$;(function(r){r.method="textDocument/signatureHelp",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(C$=h.SignatureHelpRequest||(h.SignatureHelpRequest={}));var k$;(function(r){r.method="textDocument/definition",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(k$=h.DefinitionRequest||(h.DefinitionRequest={}));var E$;(function(r){r.method="textDocument/references",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(E$=h.ReferencesRequest||(h.ReferencesRequest={}));var $$;(function(r){r.method="textDocument/documentHighlight",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})($$=h.DocumentHighlightRequest||(h.DocumentHighlightRequest={}));var N$;(function(r){r.method="textDocument/documentSymbol",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(N$=h.DocumentSymbolRequest||(h.DocumentSymbolRequest={}));var _$;(function(r){r.method="textDocument/codeAction",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(_$=h.CodeActionRequest||(h.CodeActionRequest={}));var I$;(function(r){r.method="codeAction/resolve",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(I$=h.CodeActionResolveRequest||(h.CodeActionResolveRequest={}));var P$;(function(r){r.method="workspace/symbol",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(P$=h.WorkspaceSymbolRequest||(h.WorkspaceSymbolRequest={}));var D$;(function(r){r.method="workspaceSymbol/resolve",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(D$=h.WorkspaceSymbolResolveRequest||(h.WorkspaceSymbolResolveRequest={}));var O$;(function(r){r.method="textDocument/codeLens",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(O$=h.CodeLensRequest||(h.CodeLensRequest={}));var L$;(function(r){r.method="codeLens/resolve",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(L$=h.CodeLensResolveRequest||(h.CodeLensResolveRequest={}));var M$;(function(r){r.method="workspace/codeLens/refresh",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolRequestType0(r.method)})(M$=h.CodeLensRefreshRequest||(h.CodeLensRefreshRequest={}));var F$;(function(r){r.method="textDocument/documentLink",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(F$=h.DocumentLinkRequest||(h.DocumentLinkRequest={}));var q$;(function(r){r.method="documentLink/resolve",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(q$=h.DocumentLinkResolveRequest||(h.DocumentLinkResolveRequest={}));var U$;(function(r){r.method="textDocument/formatting",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(U$=h.DocumentFormattingRequest||(h.DocumentFormattingRequest={}));var G$;(function(r){r.method="textDocument/rangeFormatting",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(G$=h.DocumentRangeFormattingRequest||(h.DocumentRangeFormattingRequest={}));var j$;(function(r){r.method="textDocument/onTypeFormatting",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(j$=h.DocumentOnTypeFormattingRequest||(h.DocumentOnTypeFormattingRequest={}));var H$;(function(r){r.Identifier=1})(H$=h.PrepareSupportDefaultBehavior||(h.PrepareSupportDefaultBehavior={}));var B$;(function(r){r.method="textDocument/rename",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(B$=h.RenameRequest||(h.RenameRequest={}));var K$;(function(r){r.method="textDocument/prepareRename",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(K$=h.PrepareRenameRequest||(h.PrepareRenameRequest={}));var W$;(function(r){r.method="workspace/executeCommand",r.messageDirection=O.MessageDirection.clientToServer,r.type=new O.ProtocolRequestType(r.method)})(W$=h.ExecuteCommandRequest||(h.ExecuteCommandRequest={}));var V$;(function(r){r.method="workspace/applyEdit",r.messageDirection=O.MessageDirection.serverToClient,r.type=new O.ProtocolRequestType("workspace/applyEdit")})(V$=h.ApplyWorkspaceEditRequest||(h.ApplyWorkspaceEditRequest={}))});var uT=H(Rl=>{"use strict";Object.defineProperty(Rl,"__esModule",{value:!0});Rl.createProtocolConnection=void 0;var lT=Jn();function z$(r,e,t,n){return lT.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,lT.createMessageConnection)(r,e,t,n)}Rl.createProtocolConnection=z$});var fT=H(pr=>{"use strict";var X$=pr&&pr.__createBinding||(Object.create?function(r,e,t,n){n===void 0&&(n=t);var i=Object.getOwnPropertyDescriptor(e,t);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,n,i)}:function(r,e,t,n){n===void 0&&(n=t),r[n]=e[t]}),bl=pr&&pr.__exportStar||function(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&X$(e,r,t)};Object.defineProperty(pr,"__esModule",{value:!0});pr.LSPErrorCodes=pr.createProtocolConnection=void 0;bl(Jn(),pr);bl(co(),pr);bl(it(),pr);bl(cT(),pr);var Y$=uT();Object.defineProperty(pr,"createProtocolConnection",{enumerable:!0,get:function(){return Y$.createProtocolConnection}});var J$;(function(r){r.lspReservedErrorRangeStart=-32899,r.RequestFailed=-32803,r.ServerCancelled=-32802,r.ContentModified=-32801,r.RequestCancelled=-32800,r.lspReservedErrorRangeEnd=-32800})(J$=pr.LSPErrorCodes||(pr.LSPErrorCodes={}))});var Ct=H(Cn=>{"use strict";var Q$=Cn&&Cn.__createBinding||(Object.create?function(r,e,t,n){n===void 0&&(n=t);var i=Object.getOwnPropertyDescriptor(e,t);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,n,i)}:function(r,e,t,n){n===void 0&&(n=t),r[n]=e[t]}),dT=Cn&&Cn.__exportStar||function(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&Q$(e,r,t)};Object.defineProperty(Cn,"__esModule",{value:!0});Cn.createProtocolConnection=void 0;var Z$=mm();dT(mm(),Cn);dT(fT(),Cn);function eN(r,e,t,n){return(0,Z$.createMessageConnection)(r,e,t,n)}Cn.createProtocolConnection=eN});var km=H(ki=>{"use strict";Object.defineProperty(ki,"__esModule",{value:!0});ki.SemanticTokensBuilder=ki.SemanticTokensDiff=ki.SemanticTokensFeature=void 0;var Al=Ct(),tN=r=>class extends r{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(Al.SemanticTokensRefreshRequest.type),on:e=>{let t=Al.SemanticTokensRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))},onDelta:e=>{let t=Al.SemanticTokensDeltaRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))},onRange:e=>{let t=Al.SemanticTokensRangeRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))}}}};ki.SemanticTokensFeature=tN;var wl=class{constructor(e,t){this.originalSequence=e,this.modifiedSequence=t}computeDiff(){let e=this.originalSequence.length,t=this.modifiedSequence.length,n=0;for(;n<t&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<t&&n<e){let i=e-1,o=t-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<t?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};ki.SemanticTokensDiff=wl;var Cm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,t,n,i,o){let s=e,a=t;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=t}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new wl(this._prevData,this._data).computeDiff()}:this.build()}};ki.SemanticTokensBuilder=Cm});var $m=H(Sl=>{"use strict";Object.defineProperty(Sl,"__esModule",{value:!0});Sl.TextDocuments=void 0;var uo=Ct(),Em=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new uo.Emitter,this._onDidOpen=new uo.Emitter,this._onDidClose=new uo.Emitter,this._onDidSave=new uo.Emitter,this._onWillSave=new uo.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=uo.TextDocumentSyncKind.Incremental;let t=[];return t.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),t.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),t.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),t.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),t.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),t.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),uo.Disposable.create(()=>{t.forEach(n=>n.dispose())})}};Sl.TextDocuments=Em});var _m=H(Zo=>{"use strict";Object.defineProperty(Zo,"__esModule",{value:!0});Zo.NotebookDocuments=Zo.NotebookSyncFeature=void 0;var Hr=Ct(),pT=$m(),rN=r=>class extends r{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Hr.DidOpenNotebookDocumentNotification.type,t=>{e(t)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Hr.DidChangeNotebookDocumentNotification.type,t=>{e(t)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Hr.DidSaveNotebookDocumentNotification.type,t=>{e(t)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Hr.DidCloseNotebookDocumentNotification.type,t=>{e(t)})}}};Zo.NotebookSyncFeature=rN;var Cl=class r{onDidOpenTextDocument(e){return this.openHandler=e,Hr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Hr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Hr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return r.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return r.NULL_DISPOSE}onDidSaveTextDocument(){return r.NULL_DISPOSE}};Cl.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var Nm=class{constructor(e){e instanceof pT.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new pT.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Hr.Emitter,this._onDidChange=new Hr.Emitter,this._onDidSave=new Hr.Emitter,this._onDidClose=new Hr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let t=this.notebookCellMap.get(e);return t&&t[0]}findNotebookDocumentForCell(e){let t=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(t);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let t=new Cl,n=[];return n.push(this.cellTextDocuments.listen(t)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)t.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,c=i.change;c.metadata!==void 0&&(a=!0,o.metadata=c.metadata);let l=[],u=[],f=[],m=[];if(c.cells!==void 0){let C=c.cells;if(C.structure!==void 0){let v=C.structure.array;if(o.cells.splice(v.start,v.deleteCount,...v.cells!==void 0?v.cells:[]),C.structure.didOpen!==void 0)for(let y of C.structure.didOpen)t.openTextDocument({textDocument:y}),l.push(y.uri);if(C.structure.didClose)for(let y of C.structure.didClose)t.closeTextDocument({textDocument:y}),u.push(y.uri)}if(C.data!==void 0){let v=new Map(C.data.map(y=>[y.document,y]));for(let y=0;y<=o.cells.length;y++){let $=v.get(o.cells[y].document);if($!==void 0){let D=o.cells.splice(y,1,$);if(f.push({old:D[0],new:$}),v.delete($.document),v.size===0)break}}}if(C.textContent!==void 0)for(let v of C.textContent)t.changeTextDocument({textDocument:v.document,contentChanges:v.changes}),m.push(v.document.uri)}this.updateCellMap(o);let T={notebookDocument:o};a&&(T.metadata={old:s,new:o.metadata});let A=[];for(let C of l)A.push(this.getNotebookCell(C));let S=[];for(let C of u)S.push(this.getNotebookCell(C));let N=[];for(let C of m)N.push(this.getNotebookCell(C));(A.length>0||S.length>0||f.length>0||N.length>0)&&(T.cells={added:A,removed:S,changed:{data:f,textContent:N}}),(T.metadata!==void 0||T.cells!==void 0)&&this._onDidChange.fire(T)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)t.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),Hr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let t of e.cells)this.notebookCellMap.set(t.document,[t,e])}};Zo.NotebookDocuments=Nm});var Im=H(kt=>{"use strict";Object.defineProperty(kt,"__esModule",{value:!0});kt.thenable=kt.typedArray=kt.stringArray=kt.array=kt.func=kt.error=kt.number=kt.string=kt.boolean=void 0;function nN(r){return r===!0||r===!1}kt.boolean=nN;function mT(r){return typeof r=="string"||r instanceof String}kt.string=mT;function iN(r){return typeof r=="number"||r instanceof Number}kt.number=iN;function oN(r){return r instanceof Error}kt.error=oN;function hT(r){return typeof r=="function"}kt.func=hT;function gT(r){return Array.isArray(r)}kt.array=gT;function sN(r){return gT(r)&&r.every(e=>mT(e))}kt.stringArray=sN;function aN(r,e){return Array.isArray(r)&&r.every(e)}kt.typedArray=aN;function cN(r){return r&&hT(r.then)}kt.thenable=cN});var Pm=H(Br=>{"use strict";Object.defineProperty(Br,"__esModule",{value:!0});Br.generateUuid=Br.parse=Br.isUUID=Br.v4=Br.empty=void 0;var Ba=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},Ka=class r extends Ba{constructor(){super([r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),"-",r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),"-","4",r._randomHex(),r._randomHex(),r._randomHex(),"-",r._oneOf(r._timeHighBits),r._randomHex(),r._randomHex(),r._randomHex(),"-",r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex(),r._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return r._oneOf(r._chars)}};Ka._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];Ka._timeHighBits=["8","9","a","b"];Br.empty=new Ba("00000000-0000-0000-0000-000000000000");function yT(){return new Ka}Br.v4=yT;var lN=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function TT(r){return lN.test(r)}Br.isUUID=TT;function uN(r){if(!TT(r))throw new Error("invalid uuid");return new Ba(r)}Br.parse=uN;function fN(){return yT().asHex()}Br.generateUuid=fN});var vT=H($i=>{"use strict";Object.defineProperty($i,"__esModule",{value:!0});$i.attachPartialResult=$i.ProgressFeature=$i.attachWorkDone=void 0;var Ei=Ct(),dN=Pm(),fo=class r{constructor(e,t){this._connection=e,this._token=t,r.Instances.set(this._token,this)}begin(e,t,n,i){let o={kind:"begin",title:e,percentage:t,message:n,cancellable:i};this._connection.sendProgress(Ei.WorkDoneProgress.type,this._token,o)}report(e,t){let n={kind:"report"};typeof e=="number"?(n.percentage=e,t!==void 0&&(n.message=t)):n.message=e,this._connection.sendProgress(Ei.WorkDoneProgress.type,this._token,n)}done(){r.Instances.delete(this._token),this._connection.sendProgress(Ei.WorkDoneProgress.type,this._token,{kind:"end"})}};fo.Instances=new Map;var kl=class extends fo{constructor(e,t){super(e,t),this._source=new Ei.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Wa=class{constructor(){}begin(){}report(){}done(){}},El=class extends Wa{constructor(){super(),this._source=new Ei.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function pN(r,e){if(e===void 0||e.workDoneToken===void 0)return new Wa;let t=e.workDoneToken;return delete e.workDoneToken,new fo(r,t)}$i.attachWorkDone=pN;var mN=r=>class extends r{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(Ei.WorkDoneProgressCancelNotification.type,t=>{let n=fo.Instances.get(t.token);(n instanceof kl||n instanceof El)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Wa:new fo(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,dN.generateUuid)();return this.connection.sendRequest(Ei.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new kl(this.connection,e))}else return Promise.resolve(new El)}};$i.ProgressFeature=mN;var Dm;(function(r){r.type=new Ei.ProgressType})(Dm||(Dm={}));var Om=class{constructor(e,t){this._connection=e,this._token=t}report(e){this._connection.sendProgress(Dm.type,this._token,e)}};function hN(r,e){if(e===void 0||e.partialResultToken===void 0)return;let t=e.partialResultToken;return delete e.partialResultToken,new Om(r,t)}$i.attachPartialResult=hN});var xT=H($l=>{"use strict";Object.defineProperty($l,"__esModule",{value:!0});$l.ConfigurationFeature=void 0;var gN=Ct(),yN=Im(),TN=r=>class extends r{getConfiguration(e){return e?yN.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let t={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(gN.ConfigurationRequest.type,t).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};$l.ConfigurationFeature=TN});var RT=H(_l=>{"use strict";Object.defineProperty(_l,"__esModule",{value:!0});_l.WorkspaceFoldersFeature=void 0;var Nl=Ct(),vN=r=>class extends r{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let t=e.workspace;t&&t.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new Nl.Emitter,this.connection.onNotification(Nl.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let t=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=t===!0||typeof t=="string"}getWorkspaceFolders(){return this.connection.sendRequest(Nl.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(Nl.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};_l.WorkspaceFoldersFeature=vN});var bT=H(Il=>{"use strict";Object.defineProperty(Il,"__esModule",{value:!0});Il.CallHierarchyFeature=void 0;var Lm=Ct(),xN=r=>class extends r{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Lm.CallHierarchyPrepareRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t),void 0)),onIncomingCalls:e=>{let t=Lm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))},onOutgoingCalls:e=>{let t=Lm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))}}}};Il.CallHierarchyFeature=xN});var AT=H(Pl=>{"use strict";Object.defineProperty(Pl,"__esModule",{value:!0});Pl.ShowDocumentFeature=void 0;var RN=Ct(),bN=r=>class extends r{showDocument(e){return this.connection.sendRequest(RN.ShowDocumentRequest.type,e)}};Pl.ShowDocumentFeature=bN});var wT=H(Dl=>{"use strict";Object.defineProperty(Dl,"__esModule",{value:!0});Dl.FileOperationsFeature=void 0;var es=Ct(),AN=r=>class extends r{onDidCreateFiles(e){return this.connection.onNotification(es.DidCreateFilesNotification.type,t=>{e(t)})}onDidRenameFiles(e){return this.connection.onNotification(es.DidRenameFilesNotification.type,t=>{e(t)})}onDidDeleteFiles(e){return this.connection.onNotification(es.DidDeleteFilesNotification.type,t=>{e(t)})}onWillCreateFiles(e){return this.connection.onRequest(es.WillCreateFilesRequest.type,(t,n)=>e(t,n))}onWillRenameFiles(e){return this.connection.onRequest(es.WillRenameFilesRequest.type,(t,n)=>e(t,n))}onWillDeleteFiles(e){return this.connection.onRequest(es.WillDeleteFilesRequest.type,(t,n)=>e(t,n))}};Dl.FileOperationsFeature=AN});var ST=H(Ol=>{"use strict";Object.defineProperty(Ol,"__esModule",{value:!0});Ol.LinkedEditingRangeFeature=void 0;var wN=Ct(),SN=r=>class extends r{onLinkedEditingRange(e){return this.connection.onRequest(wN.LinkedEditingRangeRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t),void 0))}};Ol.LinkedEditingRangeFeature=SN});var CT=H(Ll=>{"use strict";Object.defineProperty(Ll,"__esModule",{value:!0});Ll.TypeHierarchyFeature=void 0;var Mm=Ct(),CN=r=>class extends r{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(Mm.TypeHierarchyPrepareRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t),void 0)),onSupertypes:e=>{let t=Mm.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))},onSubtypes:e=>{let t=Mm.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))}}}};Ll.TypeHierarchyFeature=CN});var ET=H(Ml=>{"use strict";Object.defineProperty(Ml,"__esModule",{value:!0});Ml.InlineValueFeature=void 0;var kT=Ct(),kN=r=>class extends r{get inlineValue(){return{refresh:()=>this.connection.sendRequest(kT.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(kT.InlineValueRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t)))}}};Ml.InlineValueFeature=kN});var $T=H(Fl=>{"use strict";Object.defineProperty(Fl,"__esModule",{value:!0});Fl.InlayHintFeature=void 0;var Fm=Ct(),EN=r=>class extends r{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Fm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Fm.InlayHintRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t))),resolve:e=>this.connection.onRequest(Fm.InlayHintResolveRequest.type,(t,n)=>e(t,n))}}};Fl.InlayHintFeature=EN});var NT=H(ql=>{"use strict";Object.defineProperty(ql,"__esModule",{value:!0});ql.DiagnosticFeature=void 0;var Va=Ct(),$N=r=>class extends r{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Va.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Va.DocumentDiagnosticRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t),this.attachPartialResultProgress(Va.DocumentDiagnosticRequest.partialResult,t))),onWorkspace:e=>this.connection.onRequest(Va.WorkspaceDiagnosticRequest.type,(t,n)=>e(t,n,this.attachWorkDoneProgress(t),this.attachPartialResultProgress(Va.WorkspaceDiagnosticRequest.partialResult,t)))}}};ql.DiagnosticFeature=$N});var _T=H(Ul=>{"use strict";Object.defineProperty(Ul,"__esModule",{value:!0});Ul.MonikerFeature=void 0;var NN=Ct(),_N=r=>class extends r{get moniker(){return{on:e=>{let t=NN.MonikerRequest.type;return this.connection.onRequest(t,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(t,n)))}}}};Ul.MonikerFeature=_N});var BT=H(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.createConnection=he.combineFeatures=he.combineNotebooksFeatures=he.combineLanguagesFeatures=he.combineWorkspaceFeatures=he.combineWindowFeatures=he.combineClientFeatures=he.combineTracerFeatures=he.combineTelemetryFeatures=he.combineConsoleFeatures=he._NotebooksImpl=he._LanguagesImpl=he.BulkUnregistration=he.BulkRegistration=he.ErrorMessageTracker=void 0;var q=Ct(),Kr=Im(),Um=Pm(),te=vT(),IN=xT(),PN=RT(),DN=bT(),ON=km(),LN=AT(),MN=wT(),FN=ST(),qN=CT(),UN=ET(),GN=$T(),jN=NT(),HN=_m(),BN=_T();function qm(r){if(r!==null)return r}var Gm=class{constructor(){this._messages=Object.create(null)}add(e){let t=this._messages[e];t||(t=0),t++,this._messages[e]=t}sendErrors(e){Object.keys(this._messages).forEach(t=>{e.window.showErrorMessage(t)})}};he.ErrorMessageTracker=Gm;var Gl=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(q.MessageType.Error,e)}warn(e){this.send(q.MessageType.Warning,e)}info(e){this.send(q.MessageType.Info,e)}log(e){this.send(q.MessageType.Log,e)}send(e,t){this._rawConnection&&this._rawConnection.sendNotification(q.LogMessageNotification.type,{type:e,message:t}).catch(()=>{(0,q.RAL)().console.error("Sending log message failed")})}},jm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...t){let n={type:q.MessageType.Error,message:e,actions:t};return this.connection.sendRequest(q.ShowMessageRequest.type,n).then(qm)}showWarningMessage(e,...t){let n={type:q.MessageType.Warning,message:e,actions:t};return this.connection.sendRequest(q.ShowMessageRequest.type,n).then(qm)}showInformationMessage(e,...t){let n={type:q.MessageType.Info,message:e,actions:t};return this.connection.sendRequest(q.ShowMessageRequest.type,n).then(qm)}},IT=(0,LN.ShowDocumentFeature)((0,te.ProgressFeature)(jm)),KN;(function(r){function e(){return new jl}r.create=e})(KN=he.BulkRegistration||(he.BulkRegistration={}));var jl=class{constructor(){this._registrations=[],this._registered=new Set}add(e,t){let n=Kr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Um.generateUuid();this._registrations.push({id:i,method:n,registerOptions:t||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},WN;(function(r){function e(){return new za(void 0,[])}r.create=e})(WN=he.BulkUnregistration||(he.BulkUnregistration={}));var za=class{constructor(e,t){this._connection=e,this._unregistrations=new Map,t.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let t={unregisterations:e};this._connection.sendRequest(q.UnregistrationRequest.type,t).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let t=Kr.string(e)?e:e.method,n=this._unregistrations.get(t);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(q.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(t)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Hl=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,t,n){return e instanceof jl?this.registerMany(e):e instanceof za?this.registerSingle1(e,t,n):this.registerSingle2(e,t)}registerSingle1(e,t,n){let i=Kr.string(t)?t:t.method,o=Um.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(q.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,t){let n=Kr.string(e)?e:e.method,i=Um.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:t||{}}]};return this.connection.sendRequest(q.RegistrationRequest.type,o).then(s=>q.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,t){let n={unregisterations:[{id:e,method:t}]};return this.connection.sendRequest(q.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let t=e.asRegistrationParams();return this.connection.sendRequest(q.RegistrationRequest.type,t).then(()=>new za(this._connection,t.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Hm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function t(i){return i&&!!i.edit}let n=t(e)?e:{edit:e};return this.connection.sendRequest(q.ApplyWorkspaceEditRequest.type,n)}},PT=(0,MN.FileOperationsFeature)((0,PN.WorkspaceFoldersFeature)((0,IN.ConfigurationFeature)(Hm))),Bl=class{constructor(){this._trace=q.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,t){this._trace!==q.Trace.Off&&this.connection.sendNotification(q.LogTraceNotification.type,{message:e,verbose:this._trace===q.Trace.Verbose?t:void 0}).catch(()=>{})}},Kl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(q.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Wl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,t){return(0,te.attachPartialResult)(this.connection,t)}};he._LanguagesImpl=Wl;var DT=(0,BN.MonikerFeature)((0,jN.DiagnosticFeature)((0,GN.InlayHintFeature)((0,UN.InlineValueFeature)((0,qN.TypeHierarchyFeature)((0,FN.LinkedEditingRangeFeature)((0,ON.SemanticTokensFeature)((0,DN.CallHierarchyFeature)(Wl)))))))),Vl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,t){return(0,te.attachPartialResult)(this.connection,t)}};he._NotebooksImpl=Vl;var OT=(0,HN.NotebookSyncFeature)(Vl);function LT(r,e){return function(t){return e(r(t))}}he.combineConsoleFeatures=LT;function MT(r,e){return function(t){return e(r(t))}}he.combineTelemetryFeatures=MT;function FT(r,e){return function(t){return e(r(t))}}he.combineTracerFeatures=FT;function qT(r,e){return function(t){return e(r(t))}}he.combineClientFeatures=qT;function UT(r,e){return function(t){return e(r(t))}}he.combineWindowFeatures=UT;function GT(r,e){return function(t){return e(r(t))}}he.combineWorkspaceFeatures=GT;function jT(r,e){return function(t){return e(r(t))}}he.combineLanguagesFeatures=jT;function HT(r,e){return function(t){return e(r(t))}}he.combineNotebooksFeatures=HT;function VN(r,e){function t(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:t(r.console,e.console,LT),tracer:t(r.tracer,e.tracer,FT),telemetry:t(r.telemetry,e.telemetry,MT),client:t(r.client,e.client,qT),window:t(r.window,e.window,UT),workspace:t(r.workspace,e.workspace,GT),languages:t(r.languages,e.languages,jT),notebooks:t(r.notebooks,e.notebooks,HT)}}he.combineFeatures=VN;function zN(r,e,t){let n=t&&t.console?new(t.console(Gl)):new Gl,i=r(n);n.rawAttach(i);let o=t&&t.tracer?new(t.tracer(Bl)):new Bl,s=t&&t.telemetry?new(t.telemetry(Kl)):new Kl,a=t&&t.client?new(t.client(Hl)):new Hl,c=t&&t.window?new(t.window(IT)):new IT,l=t&&t.workspace?new(t.workspace(PT)):new PT,u=t&&t.languages?new(t.languages(DT)):new DT,f=t&&t.notebooks?new(t.notebooks(OT)):new OT,m=[n,o,s,a,c,l,u,f];function T(v){return v instanceof Promise?v:Kr.thenable(v)?new Promise((y,$)=>{v.then(D=>y(D),D=>$(D))}):Promise.resolve(v)}let A,S,N,C={listen:()=>i.listen(),sendRequest:(v,...y)=>i.sendRequest(Kr.string(v)?v:v.method,...y),onRequest:(v,y)=>i.onRequest(v,y),sendNotification:(v,y)=>{let $=Kr.string(v)?v:v.method;return arguments.length===1?i.sendNotification($):i.sendNotification($,y)},onNotification:(v,y)=>i.onNotification(v,y),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:v=>(S=v,{dispose:()=>{S=void 0}}),onInitialized:v=>i.onNotification(q.InitializedNotification.type,v),onShutdown:v=>(A=v,{dispose:()=>{A=void 0}}),onExit:v=>(N=v,{dispose:()=>{N=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return c},get workspace(){return l},get languages(){return u},get notebooks(){return f},onDidChangeConfiguration:v=>i.onNotification(q.DidChangeConfigurationNotification.type,v),onDidChangeWatchedFiles:v=>i.onNotification(q.DidChangeWatchedFilesNotification.type,v),__textDocumentSync:void 0,onDidOpenTextDocument:v=>i.onNotification(q.DidOpenTextDocumentNotification.type,v),onDidChangeTextDocument:v=>i.onNotification(q.DidChangeTextDocumentNotification.type,v),onDidCloseTextDocument:v=>i.onNotification(q.DidCloseTextDocumentNotification.type,v),onWillSaveTextDocument:v=>i.onNotification(q.WillSaveTextDocumentNotification.type,v),onWillSaveTextDocumentWaitUntil:v=>i.onRequest(q.WillSaveTextDocumentWaitUntilRequest.type,v),onDidSaveTextDocument:v=>i.onNotification(q.DidSaveTextDocumentNotification.type,v),sendDiagnostics:v=>i.sendNotification(q.PublishDiagnosticsNotification.type,v),onHover:v=>i.onRequest(q.HoverRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onCompletion:v=>i.onRequest(q.CompletionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCompletionResolve:v=>i.onRequest(q.CompletionResolveRequest.type,v),onSignatureHelp:v=>i.onRequest(q.SignatureHelpRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDeclaration:v=>i.onRequest(q.DeclarationRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDefinition:v=>i.onRequest(q.DefinitionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onTypeDefinition:v=>i.onRequest(q.TypeDefinitionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onImplementation:v=>i.onRequest(q.ImplementationRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onReferences:v=>i.onRequest(q.ReferencesRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentHighlight:v=>i.onRequest(q.DocumentHighlightRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentSymbol:v=>i.onRequest(q.DocumentSymbolRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbol:v=>i.onRequest(q.WorkspaceSymbolRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbolResolve:v=>i.onRequest(q.WorkspaceSymbolResolveRequest.type,v),onCodeAction:v=>i.onRequest(q.CodeActionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeActionResolve:v=>i.onRequest(q.CodeActionResolveRequest.type,(y,$)=>v(y,$)),onCodeLens:v=>i.onRequest(q.CodeLensRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeLensResolve:v=>i.onRequest(q.CodeLensResolveRequest.type,(y,$)=>v(y,$)),onDocumentFormatting:v=>i.onRequest(q.DocumentFormattingRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDocumentRangeFormatting:v=>i.onRequest(q.DocumentRangeFormattingRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDocumentOnTypeFormatting:v=>i.onRequest(q.DocumentOnTypeFormattingRequest.type,(y,$)=>v(y,$)),onRenameRequest:v=>i.onRequest(q.RenameRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onPrepareRename:v=>i.onRequest(q.PrepareRenameRequest.type,(y,$)=>v(y,$)),onDocumentLinks:v=>i.onRequest(q.DocumentLinkRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentLinkResolve:v=>i.onRequest(q.DocumentLinkResolveRequest.type,(y,$)=>v(y,$)),onDocumentColor:v=>i.onRequest(q.DocumentColorRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onColorPresentation:v=>i.onRequest(q.ColorPresentationRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onFoldingRanges:v=>i.onRequest(q.FoldingRangeRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onSelectionRanges:v=>i.onRequest(q.SelectionRangeRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onExecuteCommand:v=>i.onRequest(q.ExecuteCommandRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),dispose:()=>i.dispose()};for(let v of m)v.attach(C);return i.onRequest(q.InitializeRequest.type,v=>{e.initialize(v),Kr.string(v.trace)&&(o.trace=q.Trace.fromString(v.trace));for(let y of m)y.initialize(v.capabilities);if(S){let y=S(v,new q.CancellationTokenSource().token,(0,te.attachWorkDone)(i,v),void 0);return T(y).then($=>{if($ instanceof q.ResponseError)return $;let D=$;D||(D={capabilities:{}});let X=D.capabilities;X||(X={},D.capabilities=X),X.textDocumentSync===void 0||X.textDocumentSync===null?X.textDocumentSync=Kr.number(C.__textDocumentSync)?C.__textDocumentSync:q.TextDocumentSyncKind.None:!Kr.number(X.textDocumentSync)&&!Kr.number(X.textDocumentSync.change)&&(X.textDocumentSync.change=Kr.number(C.__textDocumentSync)?C.__textDocumentSync:q.TextDocumentSyncKind.None);for(let ye of m)ye.fillServerCapabilities(X);return D})}else{let y={capabilities:{textDocumentSync:q.TextDocumentSyncKind.None}};for(let $ of m)$.fillServerCapabilities(y.capabilities);return y}}),i.onRequest(q.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,A)return A(new q.CancellationTokenSource().token)}),i.onNotification(q.ExitNotification.type,()=>{try{N&&N()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(q.SetTraceNotification.type,v=>{o.trace=q.Trace.fromString(v.value)}),C}he.createConnection=zN});var Bm=H(Vt=>{"use strict";var XN=Vt&&Vt.__createBinding||(Object.create?function(r,e,t,n){n===void 0&&(n=t);var i=Object.getOwnPropertyDescriptor(e,t);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,n,i)}:function(r,e,t,n){n===void 0&&(n=t),r[n]=e[t]}),KT=Vt&&Vt.__exportStar||function(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&XN(e,r,t)};Object.defineProperty(Vt,"__esModule",{value:!0});Vt.ProposedFeatures=Vt.NotebookDocuments=Vt.TextDocuments=Vt.SemanticTokensBuilder=void 0;var YN=km();Object.defineProperty(Vt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return YN.SemanticTokensBuilder}});KT(Ct(),Vt);var JN=$m();Object.defineProperty(Vt,"TextDocuments",{enumerable:!0,get:function(){return JN.TextDocuments}});var QN=_m();Object.defineProperty(Vt,"NotebookDocuments",{enumerable:!0,get:function(){return QN.NotebookDocuments}});KT(BT(),Vt);var ZN;(function(r){r.all={__brand:"features"}})(ZN=Vt.ProposedFeatures||(Vt.ProposedFeatures={}))});var VT=H((kH,WT)=>{"use strict";WT.exports=Ct()});var Ae=H(kn=>{"use strict";var e_=kn&&kn.__createBinding||(Object.create?function(r,e,t,n){n===void 0&&(n=t);var i=Object.getOwnPropertyDescriptor(e,t);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,n,i)}:function(r,e,t,n){n===void 0&&(n=t),r[n]=e[t]}),XT=kn&&kn.__exportStar||function(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&e_(e,r,t)};Object.defineProperty(kn,"__esModule",{value:!0});kn.createConnection=void 0;var zl=Bm();XT(VT(),kn);XT(Bm(),kn);var zT=!1,t_={initialize:r=>{},get shutdownReceived(){return zT},set shutdownReceived(r){zT=r},exit:r=>{}};function r_(r,e,t,n){let i,o,s,a;r!==void 0&&r.__brand==="features"&&(i=r,r=e,e=t,t=n),zl.ConnectionStrategy.is(r)||zl.ConnectionOptions.is(r)?a=r:(o=r,s=e,a=t);let c=l=>(0,zl.createProtocolConnection)(o,s,l,a);return(0,zl.createConnection)(c,t_,i)}kn.createConnection=r_});var fC=H((Yce,uC)=>{"use strict";uC.exports=Ae()});var lC=de(Ae(),1);var Xl=class r{constructor(e,t,n,i){this._uri=e,this._languageId=t,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let t=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(t,n)}return this._content}update(e,t){for(let n of e)if(r.isIncremental(n)){let i=QT(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),c=Math.max(i.end.line,0),l=this._lineOffsets,u=YT(n.text,!1,o);if(c-a===u.length)for(let m=0,T=u.length;m<T;m++)l[m+a+1]=u[m];else u.length<1e4?l.splice(a+1,c-a,...u):this._lineOffsets=l=l.slice(0,a+1).concat(u,l.slice(c+1));let f=n.text.length-(s-o);if(f!==0)for(let m=a+1+u.length,T=l.length;m<T;m++)l[m]=l[m]+f}else if(r.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=t}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=YT(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let t=this.getLineOffsets(),n=0,i=t.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);t[s]>e?i=s:n=s+1}let o=n-1;return e=this.ensureBeforeEOL(e,t[o]),{line:o,character:e-t[o]}}offsetAt(e){let t=this.getLineOffsets();if(e.line>=t.length)return this._content.length;if(e.line<0)return 0;let n=t[e.line];if(e.character<=0)return n;let i=e.line+1<t.length?t[e.line+1]:this._content.length,o=Math.min(n+e.character,i);return this.ensureBeforeEOL(o,n)}ensureBeforeEOL(e,t){for(;e>t&&JT(this._content.charCodeAt(e-1));)e--;return e}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let t=e;return t!=null&&typeof t.text=="string"&&t.range!==void 0&&(t.rangeLength===void 0||typeof t.rangeLength=="number")}static isFull(e){let t=e;return t!=null&&typeof t.text=="string"&&t.range===void 0&&t.rangeLength===void 0}},ts;(function(r){function e(i,o,s,a){return new Xl(i,o,s,a)}r.create=e;function t(i,o,s){if(i instanceof Xl)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}r.update=t;function n(i,o){let s=i.getText(),a=Km(o.map(n_),(u,f)=>{let m=u.range.start.line-f.range.start.line;return m===0?u.range.start.character-f.range.start.character:m}),c=0,l=[];for(let u of a){let f=i.offsetAt(u.range.start);if(f<c)throw new Error("Overlapping edit");f>c&&l.push(s.substring(c,f)),u.newText.length&&l.push(u.newText),c=i.offsetAt(u.range.end)}return l.push(s.substr(c)),l.join("")}r.applyEdits=n})(ts||(ts={}));function Km(r,e){if(r.length<=1)return r;let t=r.length/2|0,n=r.slice(0,t),i=r.slice(t);Km(n,e),Km(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?r[a++]=n[o++]:r[a++]=i[s++];for(;o<n.length;)r[a++]=n[o++];for(;s<i.length;)r[a++]=i[s++];return r}function YT(r,e,t=0){let n=e?[t]:[];for(let i=0;i<r.length;i++){let o=r.charCodeAt(i);JT(o)&&(o===13&&i+1<r.length&&r.charCodeAt(i+1)===10&&i++,n.push(t+i+1))}return n}function JT(r){return r===13||r===10}function QT(r){let e=r.start,t=r.end;return e.line>t.line||e.line===t.line&&e.character>t.character?{start:t,end:e}:r}function n_(r){let e=QT(r.range);return e!==r.range?{newText:r.newText,range:e}:r}function Et(r){return typeof r=="object"&&r!==null&&typeof r.$type=="string"}function Zn(r){return typeof r=="object"&&r!==null&&typeof r.$refText=="string"}function ZT(r){return typeof r=="object"&&r!==null&&typeof r.name=="string"&&typeof r.type=="string"&&typeof r.path=="string"}function rs(r){return typeof r=="object"&&r!==null&&Et(r.container)&&Zn(r.reference)&&typeof r.message=="string"}var po=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,t){return Et(e)&&this.isSubtype(e.$type,t)}isSubtype(e,t){if(e===t)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[t];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,t);return n[t]=o,o}}getAllSubTypes(e){let t=this.allSubtypes[e];if(t)return t;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function En(r){return typeof r=="object"&&r!==null&&Array.isArray(r.content)}function mo(r){return typeof r=="object"&&r!==null&&typeof r.tokenType=="object"}function ev(r){return En(r)&&typeof r.fullText=="string"}var Ir=class r{constructor(e,t){this.startFn=e,this.nextFn=t}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),t=0,n=e.next();for(;!n.done;)t++,n=e.next();return t}toArray(){let e=[],t=this.iterator(),n;do n=t.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,t){let n=this.map(i=>[e?e(i):i,t?t(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let t=e[Symbol.iterator]();return new r(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=t.next(),!i.done)return i;while(!i.done);return mr})}join(e=","){let t=this.iterator(),n="",i,o=!1;do i=t.next(),i.done||(o&&(n+=e),n+=i_(i.value)),o=!0;while(!i.done);return n}indexOf(e,t=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=t&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let t=this.iterator(),n=t.next();for(;!n.done;){if(!e(n.value))return!1;n=t.next()}return!0}some(e){let t=this.iterator(),n=t.next();for(;!n.done;){if(e(n.value))return!0;n=t.next()}return!1}forEach(e){let t=this.iterator(),n=0,i=t.next();for(;!i.done;)e(i.value,n),i=t.next(),n++}map(e){return new r(this.startFn,t=>{let{done:n,value:i}=this.nextFn(t);return n?mr:{done:!1,value:e(i)}})}filter(e){return new r(this.startFn,t=>{let n;do if(n=this.nextFn(t),!n.done&&e(n.value))return n;while(!n.done);return mr})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,t){let n=this.iterator(),i=t,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,t){return this.recursiveReduce(this.iterator(),e,t)}recursiveReduce(e,t,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,t,n);return o===void 0?i.value:t(o,i.value)}find(e){let t=this.iterator(),n=t.next();for(;!n.done;){if(e(n.value))return n.value;n=t.next()}}findIndex(e){let t=this.iterator(),n=0,i=t.next();for(;!i.done;){if(e(i.value))return n;i=t.next(),n++}return-1}includes(e){let t=this.iterator(),n=t.next();for(;!n.done;){if(n.value===e)return!0;n=t.next()}return!1}flatMap(e){return new r(()=>({this:this.startFn()}),t=>{do{if(t.iterator){let o=t.iterator.next();if(o.done)t.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(t.this);if(!n){let o=e(i);if(Yl(o))t.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(t.iterator);return mr})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let t=e>1?this.flat(e-1):this;return new r(()=>({this:t.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=t.nextFn(n.this);if(!i)if(Yl(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return mr})}head(){let t=this.iterator().next();if(!t.done)return t.value}tail(e=1){return new r(()=>{let t=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(t).done)return t;return t},this.nextFn)}limit(e){return new r(()=>({size:0,state:this.startFn()}),t=>(t.size++,t.size>e?mr:this.nextFn(t.state)))}distinct(e){let t=new Set;return this.filter(n=>{let i=e?e(n):n;return t.has(i)?!1:(t.add(i),!0)})}exclude(e,t){let n=new Set;for(let i of e){let o=t?t(i):i;n.add(o)}return this.filter(i=>{let o=t?t(i):i;return!n.has(o)})}};function i_(r){return typeof r=="string"?r:typeof r>"u"?"undefined":typeof r.toString=="function"?r.toString():Object.prototype.toString.call(r)}function Yl(r){return!!r&&typeof r[Symbol.iterator]=="function"}var ns=new Ir(()=>{},()=>mr),mr=Object.freeze({done:!0,value:void 0});function ie(...r){if(r.length===1){let e=r[0];if(e instanceof Ir)return e;if(Yl(e))return new Ir(()=>e[Symbol.iterator](),t=>t.next());if(typeof e.length=="number")return new Ir(()=>({index:0}),t=>t.index<e.length?{done:!1,value:e[t.index++]}:mr)}return r.length>1?new Ir(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let t=e.iterator.next();if(!t.done)return t;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<r.length){let t=r[e.collIndex++];Yl(t)?e.iterator=t[Symbol.iterator]():t&&typeof t.length=="number"&&(e.array=t)}}while(e.iterator||e.array||e.collIndex<r.length);return mr}):ns}var Wr=class extends Ir{constructor(e,t,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[t(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(t(s.value)[Symbol.iterator]()),s}return mr})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},Xa;(function(r){function e(o){return o.reduce((s,a)=>s+a,0)}r.sum=e;function t(o){return o.reduce((s,a)=>s*a,0)}r.product=t;function n(o){return o.reduce((s,a)=>Math.min(s,a))}r.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}r.max=i})(Xa=Xa||(Xa={}));function Wm(r){return new Wr(r,e=>En(e)?e.content:[],{includeRoot:!0})}function nv(r){return Wm(r).filter(mo)}function iv(r,e){for(;r.container;)if(r=r.container,r===e)return!0;return!1}function Ya(r){return{start:{character:r.startColumn-1,line:r.startLine-1},end:{character:r.endColumn,line:r.endLine-1}}}function ir(r){if(!r)return;let{offset:e,end:t,range:n}=r;return{range:n,offset:e,end:t,length:t-e}}var ei;(function(r){r[r.Before=0]="Before",r[r.After=1]="After",r[r.OverlapFront=2]="OverlapFront",r[r.OverlapBack=3]="OverlapBack",r[r.Inside=4]="Inside"})(ei=ei||(ei={}));function o_(r,e){if(r.end.line<e.start.line||r.end.line===e.start.line&&r.end.character<r.start.character)return ei.Before;if(r.start.line>e.end.line||r.start.line===e.end.line&&r.start.character>e.end.character)return ei.After;let t=r.start.line>e.start.line||r.start.line===e.start.line&&r.start.character>=e.start.character,n=r.end.line<e.end.line||r.end.line===e.end.line&&r.end.character<=e.end.character;return t&&n?ei.Inside:t?ei.OverlapBack:ei.OverlapFront}function Jl(r,e){return o_(r,e)>ei.After}var Vm=/^[\w\p{L}]$/u;function Pt(r,e,t=Vm){if(r){if(e>0){let n=e-r.offset,i=r.text.charAt(n);t.test(i)||e--}return br(r,e)}}function ov(r,e){if(r){let t=s_(r,!0);if(t&&tv(t,e))return t;if(ev(r)){let n=r.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=r.content[i];if(tv(o,e))return o}}}}function tv(r,e){return mo(r)&&e.includes(r.tokenType.name)}function br(r,e){if(mo(r))return r;if(En(r)){let t=0,n=r.content.length-1;for(;t<n;){let i=Math.floor((t+n)/2),o=r.content[i];if(o.offset>e)n=i-1;else if(o.end<=e)t=i+1;else return br(o,e)}if(t===n)return br(r.content[t],e)}}function s_(r,e=!0){for(;r.container;){let t=r.container,n=t.content.indexOf(r);for(;n>0;){n--;let i=t.content[n];if(e||!i.hidden)return i}r=t}}function sv(r,e=!0){for(;r.container;){let t=r.container,n=t.content.indexOf(r),i=t.content.length-1;for(;n<i;){n++;let o=t.content[n];if(e||!o.hidden)return o}r=t}}function av(r,e){let t=a_(r,e);return t?t.parent.content.slice(t.a+1,t.b):[]}function a_(r,e){let t=rv(r),n=rv(e),i;for(let o=0;o<t.length&&o<n.length;o++){let s=t[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function rv(r){let e=[];for(;r.container;){let t=r.container,n=t.content.indexOf(r);e.push({parent:t,index:n}),r=t}return e.reverse()}function ho(r,e,t,n){let i=[r,e,t,n].reduce(fv,{});return uv(i)}var zm=Symbol("isProxy");function Ql(r){if(r&&r[zm])for(let e of Object.values(r))Ql(e);return r}function uv(r,e){let t=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>lv(n,i,r,e||t),getOwnPropertyDescriptor:(n,i)=>(lv(n,i,r,e||t),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in r,ownKeys:()=>[...Reflect.ownKeys(r),zm]});return t[zm]=!0,t}var cv=Symbol();function lv(r,e,t,n){if(e in r){if(r[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:r[e]});if(r[e]===cv)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/configuration-services/#resolving-cyclic-dependencies');return r[e]}else if(e in t){let i=t[e];r[e]=cv;try{r[e]=typeof i=="function"?i(n):uv(i,n)}catch(o){throw r[e]=o instanceof Error?o:void 0,o}return r[e]}else return}function fv(r,e){if(e){for(let[t,n]of Object.entries(e))if(n!==void 0){let i=r[t];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?r[t]=fv(i,n):r[t]=n}}return r}var Le=class{constructor(e){if(this.map=new Map,e)for(let[t,n]of e)this.add(t,n)}get size(){return Xa.sum(ie(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,t){if(t===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(t);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var t;return(t=this.map.get(e))!==null&&t!==void 0?t:[]}has(e,t){if(t===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(t)>=0:!1}}add(e,t){return this.map.has(e)?this.map.get(e).push(t):this.map.set(e,[t]),this}addAll(e,t){return this.map.has(e)?this.map.get(e).push(...t):this.map.set(e,Array.from(t)),this}forEach(e){this.map.forEach((t,n)=>t.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return ie(this.map.entries()).flatMap(([e,t])=>t.map(n=>[e,n]))}keys(){return ie(this.map.keys())}values(){return ie(this.map.values()).flat()}entriesGroupedByKey(){return ie(this.map.entries())}};var Xm="AbstractRule";var go="AbstractType";var c_="Condition";var l_="TypeDefinition";var Ym="AbstractElement";function is(r){return le.isInstance(r,Ym)}var dv="ArrayType";function yo(r){return le.isInstance(r,dv)}var pv="Conjunction";function mv(r){return le.isInstance(r,pv)}var hv="Disjunction";function gv(r){return le.isInstance(r,hv)}var yv="Grammar";function os(r){return le.isInstance(r,yv)}var u_="GrammarImport";function Zl(r){return le.isInstance(r,u_)}var f_="InferredType";function ss(r){return le.isInstance(r,f_)}var Qa="Interface";function Ar(r){return le.isInstance(r,Qa)}var Tv="LiteralCondition";function vv(r){return le.isInstance(r,Tv)}var xv="Negation";function Rv(r){return le.isInstance(r,xv)}var bv="Parameter";function Av(r){return le.isInstance(r,bv)}var wv="ParameterReference";function as(r){return le.isInstance(r,wv)}var Sv="ParserRule";function B(r){return le.isInstance(r,Sv)}var Cv="ReferenceType";function To(r){return le.isInstance(r,Cv)}var d_="ReturnType";function cs(r){return le.isInstance(r,d_)}var kv="SimpleType";function or(r){return le.isInstance(r,kv)}var Jm="TerminalRule";function we(r){return le.isInstance(r,Jm)}var Za="Type";function Mt(r){return le.isInstance(r,Za)}var p_="TypeAttribute";function eu(r){return le.isInstance(r,p_)}var Ev="UnionType";function Vr(r){return le.isInstance(r,Ev)}var $v="Action";function Ne(r){return le.isInstance(r,$v)}var Nv="Alternatives";function Pr(r){return le.isInstance(r,Nv)}var _v="Assignment";function Re(r){return le.isInstance(r,_v)}var Iv="CharacterRange";function tu(r){return le.isInstance(r,Iv)}var Pv="CrossReference";function zt(r){return le.isInstance(r,Pv)}var Dv="Group";function Ft(r){return le.isInstance(r,Dv)}var Ov="Keyword";function pt(r){return le.isInstance(r,Ov)}var Lv="NegatedToken";function Mv(r){return le.isInstance(r,Lv)}var Fv="RegexToken";function qv(r){return le.isInstance(r,Fv)}var Uv="RuleCall";function _e(r){return le.isInstance(r,Uv)}var Gv="TerminalAlternatives";function jv(r){return le.isInstance(r,Gv)}var Hv="TerminalGroup";function Bv(r){return le.isInstance(r,Hv)}var Kv="TerminalRuleCall";function ru(r){return le.isInstance(r,Kv)}var Wv="UnorderedGroup";function Dr(r){return le.isInstance(r,Wv)}var Vv="UntilToken";function zv(r){return le.isInstance(r,Vv)}var Xv="Wildcard";function Yv(r){return le.isInstance(r,Xv)}var Ja=class extends po{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,t){switch(e){case $v:return this.isSubtype(Ym,t)||this.isSubtype(go,t);case Nv:case _v:case Iv:case Pv:case Dv:case Ov:case Lv:case Fv:case Uv:case Gv:case Hv:case Kv:case Wv:case Vv:case Xv:return this.isSubtype(Ym,t);case dv:case Cv:case kv:case Ev:return this.isSubtype(l_,t);case pv:case hv:case Tv:case xv:case wv:return this.isSubtype(c_,t);case Qa:case Za:return this.isSubtype(go,t);case Sv:return this.isSubtype(Xm,t)||this.isSubtype(go,t);case Jm:return this.isSubtype(Xm,t);default:return!1}}getReferenceType(e){let t=`${e.container.$type}:${e.property}`;switch(t){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return go;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return Xm;case"Grammar:usedGrammars":return yv;case"NamedArgument:parameter":case"ParameterReference:parameter":return bv;case"TerminalRuleCall:rule":return Jm;default:throw new Error(`${t} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}},le=new Ja;function Jv(r){for(let[e,t]of Object.entries(r))e.startsWith("$")||(Array.isArray(t)?t.forEach((n,i)=>{Et(n)&&(n.$container=r,n.$containerProperty=e,n.$containerIndex=i)}):Et(t)&&(t.$container=r,t.$containerProperty=e))}function Ie(r,e){let t=r;for(;t;){if(e(t))return t;t=t.$container}}function ne(r){let t=nu(r).$document;if(!t)throw new Error("AST node has no document.");return t}function nu(r){for(;r.$container;)r=r.$container;return r}function Ni(r,e){if(!r)throw new Error("Node must be an AstNode.");let t=e?.range;return new Ir(()=>({keys:Object.keys(r),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=r[i];if(Et(o)){if(n.keyIndex++,Qm(o,t))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if(Et(a)&&Qm(a,t))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return mr})}function Qe(r,e){if(!r)throw new Error("Root node must be an AstNode.");return new Wr(r,t=>Ni(t,e))}function ri(r,e){if(r){if(e?.range&&!Qm(r,e.range))return new Wr(r,()=>[])}else throw new Error("Root node must be an AstNode.");return new Wr(r,t=>Ni(t,e),{includeRoot:!0})}function Qm(r,e){var t;if(!e)return!0;let n=(t=r.$cstNode)===null||t===void 0?void 0:t.range;return n?Jl(n,e):!1}function iu(r){return new Ir(()=>({keys:Object.keys(r),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let t=e.keys[e.keyIndex];if(!t.startsWith("$")){let n=r[t];if(Zn(n))return e.keyIndex++,{done:!1,value:{reference:n,container:r,property:t}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(Zn(o))return{done:!1,value:{reference:o,container:r,property:t,index:i}}}e.arrayIndex=0}}e.keyIndex++}return mr})}function Qv(r){var e,t;if(r){if("astNode"in r)return g_(r);if(Array.isArray(r))return r.reduce(Zv,void 0);{let n=r,i=m_(n)?h_((t=(e=n?.root)===null||e===void 0?void 0:e.astNode)!==null&&t!==void 0?t:n?.astNode):void 0;return ls(n,i)}}else return}function m_(r){return typeof r<"u"&&"element"in r&&"text"in r}function h_(r){try{return ne(r).uri.toString()}catch{return}}function g_(r){var e,t;let{astNode:n,property:i,index:o}=r??{},s=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||s===void 0)){if(i===void 0)return ls(s,Zm(n));{let a=c=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<c.length?c[o]:void 0:c.reduce(Zv,void 0);if(!((t=s.assignments)===null||t===void 0)&&t[i]){let c=a(s.assignments[i]);return c&&ls(c,Zm(n))}else if(n.$cstNode){let c=a(_i(n.$cstNode,i));return c&&ls(c,Zm(n))}else return}}}function Zm(r){var e,t,n,i;return r.$cstNode?(t=(e=ne(r))===null||e===void 0?void 0:e.uri)===null||t===void 0?void 0:t.toString():r.$textRegion?r.$textRegion.documentURI||((i=(n=new Wr(r,o=>o.$container?[o.$container]:[]).find(o=>{var s;return(s=o.$textRegion)===null||s===void 0?void 0:s.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function ls(r,e){var t,n;let i={offset:r.offset,end:(t=r.end)!==null&&t!==void 0?t:r.offset+r.length,length:(n=r.length)!==null&&n!==void 0?n:r.end-r.offset};return r.range&&(i.range=r.range),e??(e=r.fileURI),e&&(i.fileURI=e),i}function Zv(r,e){var t,n;if(r){if(!e)return r&&ls(r)}else return e&&ls(e);let i=(t=r.end)!==null&&t!==void 0?t:r.offset+r.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,s=Math.min(r.offset,e.offset),a=Math.max(i,o),c=a-s,l={offset:s,end:a,length:c};if(r.range&&e.range&&(l.range={start:e.range.start.line<r.range.start.line||e.range.start.line===r.range.start.line&&e.range.start.character<r.range.start.character?e.range.start:r.range.start,end:e.range.end.line>r.range.end.line||e.range.end.line===r.range.end.line&&e.range.end.character>r.range.end.character?e.range.end:r.range.end}),r.fileURI||e.fileURI){let u=r.fileURI,f=e.fileURI,m=u&&f&&u!==f?`<unmergable text regions of ${u}, ${f}>`:u??f;l.fileURI=m}return l}var eh=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,t){if(e.length>0){let n=t&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let t=this.traceData.length-1;t>=0;t--){let n=this.traceData[t];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[],this.pendingIndent=!0}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let t=y_(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(t),t}popTraceRegion(e){let t=this.traceData.pop();return this.assertTrue(t===e,"Trace region mismatch!"),t}getParentTraceSourceFileURI(){var e;for(let t=this.traceData.length-1;t>-1;t--){let n=(e=this.traceData[t].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,t){if(!e)throw new Error(t)}};function y_(r,e,t){let n={sourceRegion:r,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,s;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((s=n.targetRegion)===null||s===void 0)&&s.length&&t(n),delete n.complete,n}};return n}function ex(r,e){let t=new eh(e),n=t.pushTraceRegion(void 0);tx(r,t),t.popTraceRegion(n),n.complete&&n.complete(t.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i?.targetRegion,s=n.targetRegion;return o&&i.sourceRegion&&o.offset===s.offset&&o.length===s.length?{text:t.content,trace:i}:{text:t.content,trace:n}}function tx(r,e){typeof r=="string"?T_(r,e):r instanceof us?v_(r,e):r instanceof Xt?ix(r,e):r instanceof Ii&&x_(r,e)}function rx(r,e){return typeof r=="string"?r.length!==0:r instanceof Xt?r.contents.some(t=>rx(t,e)):r instanceof Ii?!(r.ifNotEmpty&&e.currentLineContent.length===0):!1}function T_(r,e){r&&(e.pendingIndent&&nx(e,!1),e.append(r))}function nx(r,e){var t;let n="";for(let i of r.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(t=i.indentation)!==null&&t!==void 0?t:r.defaultIndentation;r.append(n,!0),r.pendingIndent=!1}function ix(r,e){let t,n=Qv(r.tracedSource);n&&(t=e.pushTraceRegion(n));for(let i of r.contents)tx(i,e);if(t){e.popTraceRegion(t);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,t.complete&&t.complete(e.currentPosition)}}function v_(r,e){var t;if(rx(r,e)){r.indentImmediately&&!e.pendingIndent&&e.append((t=r.indentation)!==null&&t!==void 0?t:e.defaultIndentation,!0);try{e.increaseIndent(r),ix(r,e)}finally{e.decreaseIndent()}}}function x_(r,e){r.ifNotEmpty&&!R_(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&nx(e,!0),e.append(r.lineDelimiter),e.addNewLine())}function R_(r){return r.trimStart()!==""}var JH=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"),ec=/\r?\n/g,b_=/\S|$/;function ox(r){let e=r.filter(n=>n.length>0).map(n=>n.search(b_)),t=e.length===0?0:Math.min(...e);return Math.max(0,t)}function rh(r,...e){let t=A_(r),n=w_(r,e,t);return C_(n)}function cx(r,e,t){return(n,...i)=>nh(r,e,t)(rh(n,...i))}function A_(r){let e=r.join("_").split(ec),t=e.length>1&&e[0].trim().length===0,n=t&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:t,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=t?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(s=>s.length!==0);let o=ox(i);return{indentation:o,omitFirstLine:t,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function w_(r,e,{indentation:t,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let s=[];r.forEach((l,u)=>{s.push(...l.split(ec).map((f,m)=>m===0||f.length<t?f:f.substring(t)).reduce(u===0?(f,m,T)=>T===0?n?[]:[m]:T===1&&f.length===0?[m]:f.concat(ou,m):(f,m,T)=>T===0?[m]:f.concat(ou,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat(tc(e[u])?e[u]:e[u]!==void 0?{content:String(e[u])}:u<e.length?lx:[]))});let a=s.length,c=a!==0?s[a-1]:void 0;return(i||o)&&typeof c=="string"&&c.trim().length===0?n&&a!==1&&s[a-2]===ou?s.slice(0,a-2):s.slice(0,a-1):s}var ou={isNewLine:!0},lx={isUndefinedSegment:!0},ax=r=>r===ou,th=r=>r===lx,S_=r=>r.content!==void 0;function C_(r){return r.reduce((t,n,i)=>th(n)?t:ax(n)?{node:i!==0&&(th(r[i-1])||tc(r[i-1]))||i>1&&typeof r[i-1]=="string"&&(th(r[i-2])||tc(r[i-2]))?t.node.appendNewLineIfNotEmpty():t.node.appendNewLine()}:(()=>{var o;let s=(i===0||ax(r[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimStart().length):"",a=S_(n)?n.content:n,c;return{node:t.indented?t.node:s.length!==0?t.node.indent({indentation:s,indentImmediately:!1,indentedChildren:l=>c=l.append(a)}):t.node.append(a),indented:c??((o=t.indented)===null||o===void 0?void 0:o.append(a))}})(),{node:new Xt}).node}var sx=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function tc(r){return r instanceof Xt||r instanceof us||r instanceof Ii}function fs(r,e){return tc(r)?ex(r,e).text:String(r)}var Xt=class r{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,t,n){if(Et(e)){if(this.tracedSource={astNode:e,property:t,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let t of e)typeof t=="function"?t(this):t&&this.contents.push(t);return this}appendIf(e,...t){return e?this.append(...t):this}appendNewLine(){return this.append(st)}appendNewLineIf(e){return e?this.append(st):this}appendNewLineIfNotEmpty(){return this.append(k_)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...t){return this.append(rh(e,...t))}appendTemplateIf(e){return e?(t,...n)=>this.appendTemplate(t,...n):()=>this}indent(e){let{indentedChildren:t,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},s=new us(n,o,i);return this.contents.push(s),Array.isArray(t)?s.append(...t):t&&s.append(t),this}appendTraced(e,t,n){return i=>this.append(new r().trace(e,t,n).append(i))}appendTracedIf(e,t,n,i){return e?this.appendTraced(typeof t=="function"?t():t,n,i):()=>this}appendTracedTemplate(e,t,n){return(i,...o)=>this.append(cx(e,t,n)(i,...o))}appendTracedTemplateIf(e,t,n,i){return e?this.appendTracedTemplate(typeof t=="function"?t():t,n,i):()=>this}};function nh(r,e,t){return n=>n instanceof Xt&&n.tracedSource===void 0?n.trace(r,e,t):new Xt().trace(r,e,t).append(n)}var us=class extends Xt{constructor(e,t=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=t,this.indentEmptyLines=n}},Ii=class{constructor(e,t=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??sx,this.ifNotEmpty=t}},st=new Ii,k_=new Ii(void 0,!0);function ni(r){return"referenceType"in r}function ii(r){return"elementType"in r}function Dt(r){return"types"in r}function sh(r){if(Dt(r)){let e=[];for(let t of r.types)e.push(...sh(t));return e}else return[r]}function Or(r){return"value"in r}function Lr(r){return"primitive"in r}function $n(r){return"string"in r}function fn(r){return r&&"type"in r}function pn(r){return r&&"properties"in r}var au=class{constructor(e,t){var n;this.superTypes=new Set,this.subTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=t?.declared)!==null&&n!==void 0?n:!1,this.dataType=t?.dataType}toAstTypesString(e){let t=new Xt;return t.append(`export type ${this.name} = ${dn(this.type,"AstType")};`,st),e&&(t.append(st),dx(t,this.name)),this.dataType&&E_(t,this),fs(t)}toDeclaredTypesString(e){let t=new Xt;return t.append(`type ${ah(this.name,e)} = ${dn(this.type,"DeclaredType")};`,st),fs(t)}},ds=class r{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let t=new Map;for(let n of this.properties)t.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let o of i)t.has(o.name)||t.set(o.name,o)}return Array.from(t.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,t,n){if(n.has(this.name))return;n.add(this.name);let i=pn(e)?e.properties:[];for(let o of i)t.has(o.name)||t.set(o.name,o);for(let o of e.subTypes)this.getSubTypeProperties(o,t,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof r)}constructor(e,t,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=t,this.abstract=n}toAstTypesString(e){let t=new Xt,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?vo([...n]):["AstNode"];return t.append(`export interface ${this.name} extends ${i.join(", ")} {`,st),t.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${vo([...this.containerTypes].map(s=>s.name)).join(" | ")};`,st),this.typeNames.size>0&&o.append(`readonly $type: ${vo([...this.typeNames]).map(s=>`'${s}'`).join(" | ")};`,st),ux(o,this.properties,"AstType")}),t.append("}",st),e&&(t.append(st),dx(t,this.name)),fs(t)}toDeclaredTypesString(e){let t=new Xt,n=ah(this.name,e),i=vo(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return t.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,st),t.indent(o=>ux(o,this.properties,"DeclaredType",e)),t.append("}",st),fs(t)}},cu=class extends Error{constructor(e,t){super(e),this.name="TypeResolutionError",this.target=t}};function nc(r,e){return Pi(r,e,new Map)}function Pi(r,e,t){let n=`${rc(r)}\xBB${rc(e)}`,i=t.get(n);return i!==void 0||(t.set(n,!1),i=!1,Dt(r)?i=r.types.every(o=>Pi(o,e,t)):Dt(e)?i=e.types.some(o=>Pi(r,o,t)):Or(e)&&fn(e.value)?Or(r)&&fn(r.value)&&e.value.name===r.value.name?i=!0:i=Pi(r,e.value.type,t):ni(r)?i=ni(e)&&Pi(r.referenceType,e.referenceType,t):ii(r)?i=ii(e)&&Pi(r.elementType,e.elementType,t):Or(r)?fn(r.value)?i=Pi(r.value.type,e,t):Or(e)?fn(e.value)?i=Pi(r,e.value.type,t):i=fx(r.value,e.value,new Set):i=!1:Lr(r)?i=Lr(e)&&r.primitive===e.primitive:$n(r)&&(i=Lr(e)&&e.primitive==="string"||$n(e)&&e.string===r.string),i&&t.set(n,i)),i}function fx(r,e,t){let n=r.name;if(t.has(n))return!1;if(t.add(n),r.name===e.name)return!0;for(let i of r.superTypes)if(pn(i)&&fx(i,e,t))return!0;return!1}function rc(r){if(ni(r))return`@(${rc(r.referenceType)})}`;if(ii(r))return`(${rc(r.elementType)})[]`;if(Dt(r)){let e=r.types.map(t=>rc(t)).join(" | ");return r.types.length<=1?`Union<${e}>`:e}else{if(Or(r))return`Value<${r.value.name}>`;if(Lr(r))return r.primitive;if($n(r))return`'${r.string}'`}throw new Error("Invalid type")}function dn(r,e="AstType"){if(ni(r)){let t=dn(r.referenceType,e);return e==="AstType"?`Reference<${t}>`:`@${ih(r.referenceType,t)}`}else if(ii(r)){let t=dn(r.elementType,e);return e==="AstType"?`Array<${t}>`:`${ih(r.elementType,t)}[]`}else if(Dt(r)){let t=r.types.map(n=>ih(n,dn(n,e)));return vo(t).join(" | ")}else{if(Or(r))return r.value.name;if(Lr(r))return r.primitive;if($n(r)){let t=e==="AstType"?"'":'"';return`${t}${r.string}${t}`}}throw new Error("Invalid type")}function ih(r,e){return Dt(r)&&(e=`(${e})`),e}function ux(r,e,t,n=new Set){function i(o){let s=t==="AstType"?o.name:ah(o.name,n),a=o.optional&&!lu(o.type),c=dn(o.type,t);return`${s}${a?"?":""}: ${c}`}vo(e,(o,s)=>o.name.localeCompare(s.name)).forEach(o=>r.append(i(o),st))}function lu(r){return ii(r)?!0:ni(r)?!1:Dt(r)?r.types.every(e=>lu(e)):Lr(r)?r.primitive==="boolean":!1}function dx(r,e){r.append(`export const ${e} = '${e}';`,st),r.append(st),r.append(`export function is${e}(item: unknown): item is ${e} {`,st),r.indent(t=>t.append(`return reflection.isInstance(item, ${e});`,st)),r.append("}",st)}function E_(r,e){switch(e.dataType){case"string":if(oh(e.type)){let t=Array.from(e.subTypes).map(o=>o.name),n=px(e.type),i=mx(e.type);if(t.length===0&&n.length===0&&i.length===0)su(r,e.name,`typeof item === '${e.dataType}'`);else{let o=$_(t,n,i);su(r,e.name,o)}}break;case"number":case"boolean":case"bigint":su(r,e.name,`typeof item === '${e.dataType}'`);break;case"Date":su(r,e.name,"item instanceof Date");break;default:return}}function oh(r){let e=!0;if(Lr(r))return r.primitive==="string";if($n(r))return!0;if(Dt(r)){for(let t of r.types)if(Or(t))if(fn(t.value)){if(!oh(t.value.type))return!1}else return!1;else if(Lr(t)){if(t.primitive!=="string"||!t.regex)return!1}else if(Dt(t))e=oh(t);else if(!$n(t))return!1}else return!1;return e}function $_(r,e,t){let n=[...r.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(t.length>0){let i=t.map(o=>`${o}.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function ah(r,e){return e.has(r)?`^${r}`:r}function px(r){let e=[];if($n(r))return[r.string];if(Dt(r))for(let t of r.types)$n(t)?e.push(t.string):Dt(t)&&e.push(...px(t));return e}function mx(r){let e=[];if(Lr(r)&&r.primitive==="string"&&r.regex&&e.push(r.regex),Dt(r))for(let t of r.types)Lr(t)&&t.primitive==="string"&&t.regex?e.push(t.regex):Dt(t)&&e.push(...mx(t));return e}function su(r,e,t){r.append(st,`export function is${e}(item: unknown): item is ${e} {`,st),r.indent(n=>n.append(`return ${t};`,st)),r.append("}",st)}function vo(r,e){return Array.from(new Set(r)).sort(e)}function ch(r,e,t,n){let i=new Set;return i.add(r),e.findReferences(r,{}).forEach(s=>{let a=t.getOrCreateDocument(s.sourceUri),c=n.getAstNode(a.parseResult.value,s.sourcePath);Ar(c)?(i.add(c),ch(c,e,t,n).forEach(u=>i.add(u))):c&&Mt(c.$container)&&i.add(c.$container)}),i}function ic(r){let e=new Set;if(Ar(r))e.add(r),r.superTypes.forEach(t=>{if(Ar(t.ref)){e.add(t.ref);let n=ic(t.ref);for(let i of n)e.add(i)}});else if(Mt(r)){let t=hx(r.type);for(let n of t){let i=ic(n);for(let o of i)e.add(o)}}return e}function hx(r){var e;if(Vr(r))return r.types.flatMap(t=>hx(t));if(or(r)){let t=(e=r.typeRef)===null||e===void 0?void 0:e.ref;if(Mt(t)||Ar(t))return[t]}return[]}function lh(r,e){return r.interfaces.concat(e.interfaces)}function fu(r){return r.interfaces.concat(r.unions)}function gx(r){let e=r.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let t=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();t.includes(i)||(t.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return t.map(i=>i.value)}function yx(r){return uu(r,new Set)}function uu(r,e){if(e.has(r))return[];if(e.add(r),Dt(r))return r.types.flatMap(t=>uu(t,e));if(Or(r)){let t=r.value;return"type"in t?uu(t.type,e):[t.name]}else if(ii(r))return uu(r.elementType,e);return[]}function oc(r){return typeof r.name=="string"}var ps=class{getName(e){if(oc(e))return e.name}getNameNode(e){return Yt(e.$cstNode,"name")}};function J(r){return r.charCodeAt(0)}function du(r,e){Array.isArray(r)?r.forEach(function(t){e.push(t)}):e.push(r)}function ms(r,e){if(r[e]===!0)throw"duplicate flag "+e;let t=r[e];r[e]=!0}function xo(r){if(r===void 0)throw Error("Internal Error - Should never get here!");return!0}function sc(){throw Error("Internal Error - Should never get here!")}function uh(r){return r.type==="Character"}var ac=[];for(let r=J("0");r<=J("9");r++)ac.push(r);var cc=[J("_")].concat(ac);for(let r=J("a");r<=J("z");r++)cc.push(r);for(let r=J("A");r<=J("Z");r++)cc.push(r);var fh=[J(" "),J("\f"),J(`
`),J("\r"),J("	"),J("\v"),J("	"),J("\xA0"),J("\u1680"),J("\u2000"),J("\u2001"),J("\u2002"),J("\u2003"),J("\u2004"),J("\u2005"),J("\u2006"),J("\u2007"),J("\u2008"),J("\u2009"),J("\u200A"),J("\u2028"),J("\u2029"),J("\u202F"),J("\u205F"),J("\u3000"),J("\uFEFF")];var N_=/[0-9a-fA-F]/,pu=/[0-9]/,__=/[1-9]/,Ro=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let t=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":ms(n,"global");break;case"i":ms(n,"ignoreCase");break;case"m":ms(n,"multiLine");break;case"u":ms(n,"unicode");break;case"y":ms(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:t,loc:this.loc(0)}}disjunction(){let e=[],t=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(t)}}alternative(){let e=[],t=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(t)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let t;switch(this.popChar()){case"=":t="Lookahead";break;case"!":t="NegativeLookahead";break}xo(t);let n=this.disjunction();return this.consumeChar(")"),{type:t,value:n,loc:this.loc(e)}}return sc()}quantifier(e=!1){let t,n=this.idx;switch(this.popChar()){case"*":t={atLeast:0,atMost:1/0};break;case"+":t={atLeast:1,atMost:1/0};break;case"?":t={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":t={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),t={atLeast:i,atMost:o}):t={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&t===void 0)return;xo(t);break}if(!(e===!0&&t===void 0)&&xo(t))return this.peekChar(0)==="?"?(this.consumeChar("?"),t.greedy=!1):t.greedy=!0,t.type="Quantifier",t.loc=this.loc(n),t}atom(){let e,t=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),xo(e)?(e.loc=this.loc(t),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):sc()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[J(`
`),J("\r"),J("\u2028"),J("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,t=!1;switch(this.popChar()){case"d":e=ac;break;case"D":e=ac,t=!0;break;case"s":e=fh;break;case"S":e=fh,t=!0;break;case"w":e=cc;break;case"W":e=cc,t=!0;break}return xo(e)?{type:"Set",value:e,complement:t}:sc()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=J("\f");break;case"n":e=J(`
`);break;case"r":e=J("\r");break;case"t":e=J("	");break;case"v":e=J("\v");break}return xo(e)?{type:"Character",value:e}:sc()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:J("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:J(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:J(e)}}}characterClass(){let e=[],t=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),t=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(uh(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(uh(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else du(n.value,e),e.push(J("-")),du(o.value,e)}else du(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:t,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:J("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let t=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:t};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(__.test(e)===!1)throw Error("Expecting a positive integer");for(;pu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(pu.test(e)===!1)throw Error("Expecting an integer");for(;pu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:J(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return pu.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let t="";for(let i=0;i<e;i++){let o=this.popChar();if(N_.test(o)===!1)throw Error("Expecting a HexDecimal digits");t+=o}return{type:"Character",value:parseInt(t,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var Nn=class{visitChildren(e){for(let t in e){let n=e[t];e.hasOwnProperty(t)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var I_=new Ro,ph=class extends Nn{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let t=String.fromCharCode(e.value);if(!this.multiline&&t===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=oi(t);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let t=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(t);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let t=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(t),this.isStarting&&(this.startRegex+=t)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},dh=new ph;function Tx(r){try{return typeof r=="string"&&(r=new RegExp(r)),r=r.toString(),dh.reset(r),dh.visit(I_.pattern(r)),dh.multiline}catch{return!1}}function mh(r){return(typeof r=="string"?new RegExp(r):r).test(" ")}function oi(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function vx(r){return Array.prototype.map.call(r,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:oi(e)).join("")}function xx(r,e){let t=P_(r),n=e.match(t);return!!n&&n[0].length>0}function P_(r){typeof r=="string"&&(r=new RegExp(r));let e=r,t=r.source,n=0;function i(){let o="",s;function a(l){o+=t.substr(n,l),n+=l}function c(l){o+="(?:"+t.substr(n,l)+"|$)",n+=l}for(;n<t.length;)switch(t[n]){case"\\":switch(t[n+1]){case"c":c(3);break;case"x":c(4);break;case"u":e.unicode?t[n+2]==="{"?c(t.indexOf("}",n)-n+1):c(6):c(2);break;case"p":case"P":e.unicode?c(t.indexOf("}",n)-n+1):c(2);break;case"k":c(t.indexOf(">",n)-n+1);break;default:c(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(t)||[],c(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(t),s?a(s[0].length):c(1);break;case"(":if(t[n+1]==="?")switch(t[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=t.substr(s,n-s);break;case"<":switch(t[n+3]){case"=":case"!":s=n,n+=4,i(),o+=t.substr(s,n-s);break;default:a(t.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:c(1);break}return o}return new RegExp(i(),r.flags)}var gh={};WC(gh,{URI:()=>hh,Utils:()=>D_});var Rx;(()=>{"use strict";var r={470:i=>{function o(c){if(typeof c!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(c))}function s(c,l){for(var u,f="",m=0,T=-1,A=0,S=0;S<=c.length;++S){if(S<c.length)u=c.charCodeAt(S);else{if(u===47)break;u=47}if(u===47){if(!(T===S-1||A===1))if(T!==S-1&&A===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var N=f.lastIndexOf("/");if(N!==f.length-1){N===-1?(f="",m=0):m=(f=f.slice(0,N)).length-1-f.lastIndexOf("/"),T=S,A=0;continue}}else if(f.length===2||f.length===1){f="",m=0,T=S,A=0;continue}}l&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+c.slice(T+1,S):f=c.slice(T+1,S),m=S-T-1;T=S,A=0}else u===46&&A!==-1?++A:A=-1}return f}var a={resolve:function(){for(var c,l="",u=!1,f=arguments.length-1;f>=-1&&!u;f--){var m;f>=0?m=arguments[f]:(c===void 0&&(c=process.cwd()),m=c),o(m),m.length!==0&&(l=m+"/"+l,u=m.charCodeAt(0)===47)}return l=s(l,!u),u?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(c){if(o(c),c.length===0)return".";var l=c.charCodeAt(0)===47,u=c.charCodeAt(c.length-1)===47;return(c=s(c,!l)).length!==0||l||(c="."),c.length>0&&u&&(c+="/"),l?"/"+c:c},isAbsolute:function(c){return o(c),c.length>0&&c.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var c,l=0;l<arguments.length;++l){var u=arguments[l];o(u),u.length>0&&(c===void 0?c=u:c+="/"+u)}return c===void 0?".":a.normalize(c)},relative:function(c,l){if(o(c),o(l),c===l||(c=a.resolve(c))===(l=a.resolve(l)))return"";for(var u=1;u<c.length&&c.charCodeAt(u)===47;++u);for(var f=c.length,m=f-u,T=1;T<l.length&&l.charCodeAt(T)===47;++T);for(var A=l.length-T,S=m<A?m:A,N=-1,C=0;C<=S;++C){if(C===S){if(A>S){if(l.charCodeAt(T+C)===47)return l.slice(T+C+1);if(C===0)return l.slice(T+C)}else m>S&&(c.charCodeAt(u+C)===47?N=C:C===0&&(N=0));break}var v=c.charCodeAt(u+C);if(v!==l.charCodeAt(T+C))break;v===47&&(N=C)}var y="";for(C=u+N+1;C<=f;++C)C!==f&&c.charCodeAt(C)!==47||(y.length===0?y+="..":y+="/..");return y.length>0?y+l.slice(T+N):(T+=N,l.charCodeAt(T)===47&&++T,l.slice(T))},_makeLong:function(c){return c},dirname:function(c){if(o(c),c.length===0)return".";for(var l=c.charCodeAt(0),u=l===47,f=-1,m=!0,T=c.length-1;T>=1;--T)if((l=c.charCodeAt(T))===47){if(!m){f=T;break}}else m=!1;return f===-1?u?"/":".":u&&f===1?"//":c.slice(0,f)},basename:function(c,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');o(c);var u,f=0,m=-1,T=!0;if(l!==void 0&&l.length>0&&l.length<=c.length){if(l.length===c.length&&l===c)return"";var A=l.length-1,S=-1;for(u=c.length-1;u>=0;--u){var N=c.charCodeAt(u);if(N===47){if(!T){f=u+1;break}}else S===-1&&(T=!1,S=u+1),A>=0&&(N===l.charCodeAt(A)?--A==-1&&(m=u):(A=-1,m=S))}return f===m?m=S:m===-1&&(m=c.length),c.slice(f,m)}for(u=c.length-1;u>=0;--u)if(c.charCodeAt(u)===47){if(!T){f=u+1;break}}else m===-1&&(T=!1,m=u+1);return m===-1?"":c.slice(f,m)},extname:function(c){o(c);for(var l=-1,u=0,f=-1,m=!0,T=0,A=c.length-1;A>=0;--A){var S=c.charCodeAt(A);if(S!==47)f===-1&&(m=!1,f=A+1),S===46?l===-1?l=A:T!==1&&(T=1):l!==-1&&(T=-1);else if(!m){u=A+1;break}}return l===-1||f===-1||T===0||T===1&&l===f-1&&l===u+1?"":c.slice(l,f)},format:function(c){if(c===null||typeof c!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof c);return function(l,u){var f=u.dir||u.root,m=u.base||(u.name||"")+(u.ext||"");return f?f===u.root?f+m:f+"/"+m:m}(0,c)},parse:function(c){o(c);var l={root:"",dir:"",base:"",ext:"",name:""};if(c.length===0)return l;var u,f=c.charCodeAt(0),m=f===47;m?(l.root="/",u=1):u=0;for(var T=-1,A=0,S=-1,N=!0,C=c.length-1,v=0;C>=u;--C)if((f=c.charCodeAt(C))!==47)S===-1&&(N=!1,S=C+1),f===46?T===-1?T=C:v!==1&&(v=1):T!==-1&&(v=-1);else if(!N){A=C+1;break}return T===-1||S===-1||v===0||v===1&&T===S-1&&T===A+1?S!==-1&&(l.base=l.name=A===0&&m?c.slice(1,S):c.slice(A,S)):(A===0&&m?(l.name=c.slice(1,T),l.base=c.slice(1,S)):(l.name=c.slice(A,T),l.base=c.slice(A,S)),l.ext=c.slice(T,S)),A>0?l.dir=c.slice(0,A-1):m&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function t(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return r[i](s,s.exports,t),s.exports}t.d=(i,o)=>{for(var s in o)t.o(o,s)&&!t.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},t.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),t.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;t.r(n),t.d(n,{URI:()=>m,Utils:()=>xt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function c(M,w){if(!M.scheme&&w)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);if(M.scheme&&!o.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!s.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let l="",u="/",f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class m{static isUri(w){return w instanceof m||!!w&&typeof w.authority=="string"&&typeof w.fragment=="string"&&typeof w.path=="string"&&typeof w.query=="string"&&typeof w.scheme=="string"&&typeof w.fsPath=="string"&&typeof w.with=="function"&&typeof w.toString=="function"}scheme;authority;path;query;fragment;constructor(w,U,j,ce,ee,Q=!1){typeof w=="object"?(this.scheme=w.scheme||l,this.authority=w.authority||l,this.path=w.path||l,this.query=w.query||l,this.fragment=w.fragment||l):(this.scheme=function(Rt,ut){return Rt||ut?Rt:"file"}(w,Q),this.authority=U||l,this.path=function(Rt,ut){switch(Rt){case"https":case"http":case"file":ut?ut[0]!==u&&(ut=u+ut):ut=u}return ut}(this.scheme,j||l),this.query=ce||l,this.fragment=ee||l,c(this,Q))}get fsPath(){return v(this,!1)}with(w){if(!w)return this;let{scheme:U,authority:j,path:ce,query:ee,fragment:Q}=w;return U===void 0?U=this.scheme:U===null&&(U=l),j===void 0?j=this.authority:j===null&&(j=l),ce===void 0?ce=this.path:ce===null&&(ce=l),ee===void 0?ee=this.query:ee===null&&(ee=l),Q===void 0?Q=this.fragment:Q===null&&(Q=l),U===this.scheme&&j===this.authority&&ce===this.path&&ee===this.query&&Q===this.fragment?this:new A(U,j,ce,ee,Q)}static parse(w,U=!1){let j=f.exec(w);return j?new A(j[2]||l,X(j[4]||l),X(j[5]||l),X(j[7]||l),X(j[9]||l),U):new A(l,l,l,l,l)}static file(w){let U=l;if(i&&(w=w.replace(/\\/g,u)),w[0]===u&&w[1]===u){let j=w.indexOf(u,2);j===-1?(U=w.substring(2),w=u):(U=w.substring(2,j),w=w.substring(j)||u)}return new A("file",U,w,l,l)}static from(w){let U=new A(w.scheme,w.authority,w.path,w.query,w.fragment);return c(U,!0),U}toString(w=!1){return y(this,w)}toJSON(){return this}static revive(w){if(w){if(w instanceof m)return w;{let U=new A(w);return U._formatted=w.external,U._fsPath=w._sep===T?w.fsPath:null,U}}return w}}let T=i?1:void 0;class A extends m{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=v(this,!1)),this._fsPath}toString(w=!1){return w?y(this,!0):(this._formatted||(this._formatted=y(this,!1)),this._formatted)}toJSON(){let w={$mid:1};return this._fsPath&&(w.fsPath=this._fsPath,w._sep=T),this._formatted&&(w.external=this._formatted),this.path&&(w.path=this.path),this.scheme&&(w.scheme=this.scheme),this.authority&&(w.authority=this.authority),this.query&&(w.query=this.query),this.fragment&&(w.fragment=this.fragment),w}}let S={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function N(M,w,U){let j,ce=-1;for(let ee=0;ee<M.length;ee++){let Q=M.charCodeAt(ee);if(Q>=97&&Q<=122||Q>=65&&Q<=90||Q>=48&&Q<=57||Q===45||Q===46||Q===95||Q===126||w&&Q===47||U&&Q===91||U&&Q===93||U&&Q===58)ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j!==void 0&&(j+=M.charAt(ee));else{j===void 0&&(j=M.substr(0,ee));let Rt=S[Q];Rt!==void 0?(ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j+=Rt):ce===-1&&(ce=ee)}}return ce!==-1&&(j+=encodeURIComponent(M.substring(ce))),j!==void 0?j:M}function C(M){let w;for(let U=0;U<M.length;U++){let j=M.charCodeAt(U);j===35||j===63?(w===void 0&&(w=M.substr(0,U)),w+=S[j]):w!==void 0&&(w+=M[U])}return w!==void 0?w:M}function v(M,w){let U;return U=M.authority&&M.path.length>1&&M.scheme==="file"?`//${M.authority}${M.path}`:M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?w?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,i&&(U=U.replace(/\//g,"\\")),U}function y(M,w){let U=w?C:N,j="",{scheme:ce,authority:ee,path:Q,query:Rt,fragment:ut}=M;if(ce&&(j+=ce,j+=":"),(ee||ce==="file")&&(j+=u,j+=u),ee){let me=ee.indexOf("@");if(me!==-1){let $r=ee.substr(0,me);ee=ee.substr(me+1),me=$r.lastIndexOf(":"),me===-1?j+=U($r,!1,!1):(j+=U($r.substr(0,me),!1,!1),j+=":",j+=U($r.substr(me+1),!1,!0)),j+="@"}ee=ee.toLowerCase(),me=ee.lastIndexOf(":"),me===-1?j+=U(ee,!1,!0):(j+=U(ee.substr(0,me),!1,!0),j+=ee.substr(me))}if(Q){if(Q.length>=3&&Q.charCodeAt(0)===47&&Q.charCodeAt(2)===58){let me=Q.charCodeAt(1);me>=65&&me<=90&&(Q=`/${String.fromCharCode(me+32)}:${Q.substr(3)}`)}else if(Q.length>=2&&Q.charCodeAt(1)===58){let me=Q.charCodeAt(0);me>=65&&me<=90&&(Q=`${String.fromCharCode(me+32)}:${Q.substr(2)}`)}j+=U(Q,!0,!1)}return Rt&&(j+="?",j+=U(Rt,!1,!1)),ut&&(j+="#",j+=w?ut:N(ut,!1,!1)),j}function $(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+$(M.substr(3)):M}}let D=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function X(M){return M.match(D)?M.replace(D,w=>$(w)):M}var ye=t(470);let Ee=ye.posix||ye,Ht="/";var xt;(function(M){M.joinPath=function(w,...U){return w.with({path:Ee.join(w.path,...U)})},M.resolvePath=function(w,...U){let j=w.path,ce=!1;j[0]!==Ht&&(j=Ht+j,ce=!0);let ee=Ee.resolve(j,...U);return ce&&ee[0]===Ht&&!w.authority&&(ee=ee.substring(1)),w.with({path:ee})},M.dirname=function(w){if(w.path.length===0||w.path===Ht)return w;let U=Ee.dirname(w.path);return U.length===1&&U.charCodeAt(0)===46&&(U=""),w.with({path:U})},M.basename=function(w){return Ee.basename(w.path)},M.extname=function(w){return Ee.extname(w.path)}})(xt||(xt={}))})(),Rx=n})();var{URI:hh,Utils:D_}=Rx;var si=gh;"default"in si&&(si=si.default);var Jt=si.URI;var ve;(function(r){r.basename=si.Utils.basename,r.dirname=si.Utils.dirname,r.extname=si.Utils.extname,r.joinPath=si.Utils.joinPath,r.resolvePath=si.Utils.resolvePath;function e(n,i){return n?.toString()===i?.toString()}r.equals=e;function t(n,i){let o=typeof n=="string"?n:n.path,s=typeof i=="string"?i:i.path,a=o.split("/").filter(m=>m.length>0),c=s.split("/").filter(m=>m.length>0),l=0;for(;l<a.length&&a[l]===c[l];l++);let u="../".repeat(a.length-l),f=c.slice(l).join("/");return u+f}r.relative=t})(ve=ve||(ve={}));var kB=ve.equals,EB=ve.relative;var mu,bx=()=>mu??(mu=hu(`{"$type":"Grammar","isDeclared":true,"name":"LangiumGrammar","rules":[{"$type":"ParserRule","name":"Grammar","entry":true,"definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"isDeclared","operator":"?=","terminal":{"$type":"Keyword","value":"grammar"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"with"},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"}],"cardinality":"?"},{"$type":"Assignment","feature":"imports","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"interfaces","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}],"cardinality":"+"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Interface","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"interface"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"extends"},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SchemaType","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"attributes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},"cardinality":"*"},{"$type":"Keyword","value":"}"},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeAttribute","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"isOptional","operator":"?=","terminal":{"$type":"Keyword","value":"?"},"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeDefinition","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnionType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnionType"},"feature":"types","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ArrayType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ArrayType"},"feature":"elementType","operator":"="},{"$type":"Keyword","value":"["},{"$type":"Keyword","value":"]"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReferenceType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ReferenceType"}},{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"referenceType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SimpleType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":")"}]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"SimpleType"}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"typeRef","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"primitiveType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"stringType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PrimitiveType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"string"},{"$type":"Keyword","value":"number"},{"$type":"Keyword","value":"boolean"},{"$type":"Keyword","value":"Date"},{"$type":"Keyword","value":"bigint"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Type","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"type"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractRule","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"GrammarImport","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"import"},{"$type":"Assignment","feature":"path","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParserRule","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"entry","operator":"?=","terminal":{"$type":"Keyword","value":"entry"}},{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"wildcard","operator":"?=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"returnType","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":false},"calledByName":false}]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"InferredType","parameters":[{"$type":"Parameter","name":"imperative"}],"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","guardCondition":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}},"elements":[{"$type":"Keyword","value":"infer"}]},{"$type":"Group","guardCondition":{"$type":"Negation","value":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}}},"elements":[{"$type":"Keyword","value":"infers"}]}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"wildcard":false},{"$type":"ParserRule","name":"RuleNameAndParams","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Parameter","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Alternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ConditionalBranch","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"}},{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"guardCondition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":">"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnorderedGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnorderedGroup"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTokenWithCardinality","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Action","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Action"}},{"$type":"Keyword","value":"{"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":true},"calledByName":false}]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"+="}]}},{"$type":"Keyword","value":"current"}],"cardinality":"?"},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@43"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Keyword","definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RuleCall","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NamedArgument","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"calledByName","operator":"?=","terminal":{"$type":"Keyword","value":"="}}],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"LiteralCondition","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"true","operator":"?=","terminal":{"$type":"Keyword","value":"true"}},{"$type":"Keyword","value":"false"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Disjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Disjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Conjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Conjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Negation","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Negation"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Atom","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedCondition","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParameterReference","definition":{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedKeyword","inferredType":{"$type":"InferredType","name":"Keyword"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedRuleCall","inferredType":{"$type":"InferredType","name":"RuleCall"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Assignment","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Assignment"}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}],"cardinality":"?"},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"+="},{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"?="}]}},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedAssignableElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@40"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReference","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CrossReference"}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"deprecatedSyntax","operator":"?=","terminal":{"$type":"Keyword","value":"|"}},{"$type":"Keyword","value":":"}]},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]}}],"cardinality":"?"},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReferenceableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedGroup","inferredType":{"$type":"InferredType","name":"Group"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReturnType","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRule","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"hidden","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"},"cardinality":"?"},{"$type":"Keyword","value":"terminal"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}}],"cardinality":"?"}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalAlternatives"},"feature":"elements","operator":"+="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalGroup"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalTokenElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@57"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@53"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@54"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@55"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@56"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedTerminalElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"lookahead","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?="},{"$type":"Keyword","value":"?!"}]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRuleCall","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalRuleCall"}},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@46"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NegatedToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"NegatedToken"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UntilToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UntilToken"}},{"$type":"Keyword","value":"->"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RegexToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"RegexToken"}},{"$type":"Assignment","feature":"regex","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@61"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Wildcard","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Wildcard"}},{"$type":"Keyword","value":"."}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CharacterRange","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CharacterRange"}},{"$type":"Assignment","feature":"left","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":".."},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"FeatureName","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"current"},{"$type":"Keyword","value":"entry"},{"$type":"Keyword","value":"extends"},{"$type":"Keyword","value":"false"},{"$type":"Keyword","value":"fragment"},{"$type":"Keyword","value":"grammar"},{"$type":"Keyword","value":"hidden"},{"$type":"Keyword","value":"import"},{"$type":"Keyword","value":"interface"},{"$type":"Keyword","value":"returns"},{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"true"},{"$type":"Keyword","value":"type"},{"$type":"Keyword","value":"infer"},{"$type":"Keyword","value":"infers"},{"$type":"Keyword","value":"with"},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ID","definition":{"$type":"RegexToken","regex":"/\\\\^?[_a-zA-Z][\\\\w_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","definition":{"$type":"RegexToken","regex":"/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RegexLiteral","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/[a-z]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/"},"fragment":false}],"types":[{"$type":"Type","name":"AbstractType","type":{"$type":"UnionType","types":[{"$type":"SimpleType","typeRef":{"$ref":"#/rules@1"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@10"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@23/definition/elements@0"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@13"}}]}}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"interfaces":[],"usedGrammars":[]}`));var Tu=de(co(),1);var lc=de(Jn(),1);function O_(){return new Promise(r=>{typeof setImmediate>"u"?setTimeout(r,0):setImmediate(r)})}var Ax=0,L_=10;var wx=Symbol("OperationCancelled");function bo(r){return r===wx}async function Ze(r){if(r===lc.CancellationToken.None)return;let e=Date.now();if(e-Ax>=L_&&(Ax=e,await O_()),r.isCancellationRequested)throw wx}var gu=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new lc.CancellationTokenSource}lock(e){this.cancel();let t=new lc.CancellationTokenSource;return this.previousTokenSource=t,this.previousAction=this.previousAction.then(()=>e(t.token).catch(n=>{bo(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};function Mr(r){return{code:r}}var hs;(function(r){r.all=["fast","slow","built-in"]})(hs=hs||(hs={}));var yu=class{constructor(e){this.entries=new Le,this.reflection=e.shared.AstReflection}register(e,t=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let c={check:this.wrapValidationException(a,t),category:n};this.addEntry(i,c)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,t),category:n};this.addEntry(i,a)}}}wrapValidationException(e,t){return async(n,i,o)=>{try{await e.call(t,n,i,o)}catch(s){if(bo(s))throw s;console.error("An error occurred during validation:",s);let a=s instanceof Error?s.message:String(s);s instanceof Error&&s.stack&&console.error(s.stack),i("error","An error occurred during validation: "+a,{node:n})}}}addEntry(e,t){if(e==="AstNode"){this.entries.add("AstNode",t);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,t)}getChecks(e,t){let n=ie(this.entries.get(e)).concat(this.entries.get("AstNode"));return t&&(n=n.filter(i=>t.includes(i.category))),n.map(i=>i.check)}};function Sx(r,e){let t={unions:[],interfaces:[]};for(let n of r){let i=[];for(let a of n.attributes)i.push({name:a.name,optional:a.isOptional,astNodes:new Set([a]),type:Ao(a.type)});let o=new Set;for(let a of n.superTypes)a.ref&&o.add(mn(a.ref));let s={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};t.interfaces.push(s)}for(let n of e){let i={name:n.name,declared:!0,type:Ao(n.type),superTypes:new Set,subTypes:new Set};t.unions.push(i)}return t}function Ao(r){if(yo(r))return{elementType:Ao(r.elementType)};if(To(r))return{referenceType:Ao(r.referenceType)};if(Vr(r))return{types:r.types.map(Ao)};if(or(r)){let e;if(r.primitiveType)return e=r.primitiveType,{primitive:e};if(r.stringType)return e=r.stringType,{string:e};if(r.typeRef){let t=r.typeRef.ref,n=_n(t);if(n)return gs(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}function ys(r){return"referenceType"in r}function yh(r){return"elementType"in r}function Cx(r){return"types"in r}function Th(r){return"value"in r}function M_(r){return"primitive"in r}function F_(r){return"string"in r}function kx(r){let e=new Map,t=new Map;for(let n of r.interfaces){let i=new ds(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of r.unions){let i=new au(n.name,{declared:n.declared,dataType:n.dataType});t.set(n.name,i)}for(let n of r.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let s=e.get(o)||t.get(o);s&&i.superTypes.add(s)}for(let o of n.subTypes){let s=e.get(o)||t.get(o);s&&i.subTypes.add(s)}for(let o of n.properties){let s=q_(o,e,t);i.properties.push(s)}}for(let n of r.unions){let i=t.get(n.name);i.type=uc(n.type,i,e,t)}return{interfaces:Array.from(e.values()),unions:Array.from(t.values())}}function q_(r,e,t){return{name:r.name,optional:r.optional,astNodes:r.astNodes,type:uc(r.type,void 0,e,t)}}function uc(r,e,t,n){if(yh(r))return{elementType:uc(r.elementType,e,t,n)};if(ys(r))return{referenceType:uc(r.referenceType,void 0,t,n)};if(Cx(r))return{types:r.types.map(i=>uc(i,e,t,n))};if(F_(r))return{string:r.string};if(M_(r))return{primitive:r.primitive,regex:r.regex};if(Th(r)){let i=t.get(r.value)||n.get(r.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function xh(r,e){let t=fc(r),n=fc(e);for(let i of n)U_(t,i)||t.push(i);return t.length===1?t[0]:{types:t}}function U_(r,e){return r.some(t=>vh(t,e))}function vh(r,e){return yh(r)&&yh(e)?vh(r.elementType,e.elementType):ys(r)&&ys(e)?vh(r.referenceType,e.referenceType):Th(r)&&Th(e)?r.value===e.value:!1}function fc(r){return Cx(r)?r.types.flatMap(e=>fc(e)):[r]}function Ex(r){let e=r.validation.ValidationRegistry,t=r.validation.LangiumGrammarValidator,n={Action:[t.checkAssignmentReservedName],AbstractRule:t.checkRuleName,Assignment:[t.checkAssignmentWithFeatureName,t.checkAssignmentToFragmentRule,t.checkAssignmentTypes,t.checkAssignmentReservedName],ParserRule:[t.checkParserRuleDataType,t.checkRuleParametersUsed,t.checkParserRuleReservedName],TerminalRule:[t.checkTerminalRuleReturnType,t.checkHiddenTerminalRule,t.checkEmptyTerminalRule],InferredType:t.checkTypeReservedName,Keyword:t.checkKeyword,UnorderedGroup:t.checkUnorderedGroup,Grammar:[t.checkGrammarName,t.checkEntryGrammarRule,t.checkUniqueRuleName,t.checkUniqueTypeName,t.checkUniqueImportedRules,t.checkDuplicateImportedGrammar,t.checkGrammarHiddenTokens,t.checkGrammarForUnusedRules,t.checkGrammarTypeInfer,t.checkClashingTerminalNames],GrammarImport:t.checkPackageImport,CharacterRange:t.checkInvalidCharacterRange,Interface:[t.checkTypeReservedName,t.checkInterfacePropertyTypes],Type:[t.checkTypeReservedName],TypeAttribute:t.checkTypeReservedName,RuleCall:[t.checkUsedHiddenTerminalRule,t.checkUsedFragmentTerminalRule,t.checkRuleCallParameters],TerminalRuleCall:t.checkUsedHiddenTerminalRule,CrossReference:[t.checkCrossReferenceSyntax,t.checkCrossRefNameAssignment,t.checkCrossRefTerminalType,t.checkCrossRefType,t.checkCrossReferenceToTypeUnion],SimpleType:t.checkFragmentsInTypes,ReferenceType:t.checkReferenceTypeUnion,RegexToken:[t.checkInvalidRegexFlags,t.checkDirectlyUsedRegexFlags]};e.register(n,t)}var Se;(function(r){r.GrammarNameUppercase="grammar-name-uppercase",r.RuleNameUppercase="rule-name-uppercase",r.HiddenGrammarTokens="hidden-grammar-tokens",r.UseRegexTokens="use-regex-tokens",r.EntryRuleTokenSyntax="entry-rule-token-syntax",r.CrossRefTokenSyntax="cross-ref-token-syntax",r.UnnecessaryFileExtension="unnecessary-file-extension",r.InvalidReturns="invalid-returns",r.InvalidInfers="invalid-infers",r.MissingInfer="missing-infer",r.MissingReturns="missing-returns",r.SuperfluousInfer="superfluous-infer",r.OptionalUnorderedGroup="optional-unordered-group"})(Se=Se||(Se={}));var vu=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,t){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&t("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",data:Mr(Se.GrammarNameUppercase)})}}checkEntryGrammarRule(e,t){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>B(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>B(o)&&!Fr(o));i?t("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",data:Mr(Se.EntryRuleTokenSyntax)}):t("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>t("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>t("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&Fr(n[0])&&t("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,t){let n=i=>ie(i.rules).filter(o=>!dc(o));this.checkUniqueName(e,t,n,"rule")}checkUniqueTypeName(e,t){let n=i=>ie(i.types).concat(i.interfaces);this.checkUniqueName(e,t,n,"type")}checkUniqueName(e,t,n,i){let o=new Le;n(e).forEach(c=>o.add(c.name,c));for(let[,c]of o.entriesGroupedByKey())c.length>1&&c.forEach(l=>{t("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let s=new Set,a=pc(this.documents,e);for(let c of a)n(c).forEach(l=>s.add(l.name));for(let c of o.keys())s.has(c)&&o.get(c).forEach(u=>{t("error",`A ${i} with the name '${u.name}' already exists in an imported grammar.`,{node:u,property:"name"})})}checkDuplicateImportedGrammar(e,t){let n=new Le;for(let i of e.imports){let o=ai(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,s)=>{s>0&&t("warning","The grammar is already being directly imported.",{node:o,tags:[Tu.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,t){let n=new Map;for(let o of e.imports){let s=pc(this.documents,o);n.set(o,s)}let i=new Le;for(let o of e.imports){let s=n.get(o);for(let a of e.imports){if(o===a)continue;let c=n.get(a),l=this.getDuplicateExportedRules(s,c);for(let u of l)i.add(o,u)}}for(let o of e.imports){let s=i.get(o);s.length>0&&t("error","Some rules exported by this grammar are also included in other imports: "+ie(s).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,t){let i=e.filter(a=>!t.includes(a)).flatMap(a=>a.rules),o=t.flatMap(a=>a.rules),s=new Set;for(let a of i){let c=a.name;for(let l of o){let u=l.name;c===u&&s.add(l.name)}}return s}checkGrammarTypeInfer(e,t){var n,i,o;let s=new Set;for(let c of e.types)s.add(c.name);for(let c of e.interfaces)s.add(c.name);for(let c of pc(this.documents,e))c.types.forEach(l=>s.add(l.name)),c.interfaces.forEach(l=>s.add(l.name));for(let c of e.rules.filter(B)){if(dc(c))continue;let l=Fr(c),u=!c.returnType&&!c.dataType,f=_n(c);if(!l&&f&&s.has(f)===u){if((u||((n=c.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&c.inferredType===void 0)t("error",a(f,u),{node:c,property:"name",data:Mr(Se.MissingReturns)});else if(u||((i=c.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=zr(c.inferredType.$cstNode,"infers");t("error",a(f,u),{node:c.inferredType,property:"name",data:{code:Se.InvalidInfers,actionSegment:ir(m)}})}}else if(l&&u){let m=zr(c.$cstNode,"infer");t("error","Data type rules cannot infer a type.",{node:c,property:"inferredType",data:{code:Se.InvalidInfers,actionSegment:ir(m)}})}}for(let c of Qe(e).filter(Ne)){let l=this.getActionType(c);if(l){let u=!!c.inferredType,f=_n(c);if(c.type&&f&&s.has(f)===u){let m=u?zr(c.$cstNode,"infer"):zr(c.$cstNode,"{");t("error",a(f,u),{node:c,property:"type",data:{code:u?Se.SuperfluousInfer:Se.MissingInfer,actionSegment:ir(m)}})}else if(l&&f&&s.has(f)&&u&&c.$cstNode){let m=Yt((o=c.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),T=zr(c.$cstNode,"{");m&&T&&t("error",`${f} is a declared type and cannot be redefined.`,{node:c,property:"type",data:{code:Se.SuperfluousInfer,actionRange:{start:T.range.end,end:m.range.start}}})}}}function a(c,l){return l?`The type '${c}' is already explicitly declared and cannot be inferred.`:`The type '${c}' is not explicitly declared and must be inferred.`}}getActionType(e){var t;if(e.type)return(t=e.type)===null||t===void 0?void 0:t.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,t){e.definesHiddenTokens&&t("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",data:Mr(Se.HiddenGrammarTokens)})}checkHiddenTerminalRule(e,t){e.hidden&&e.fragment&&t("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,t){try{let n=Yr(e);new RegExp(n).test("")&&t("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkInvalidRegexFlags(e,t){let n=e.regex;if(n){let i=n.lastIndexOf("/"),o=n.substring(i+1),s="gmy",c=s+"isu",l=new Set,u=new Set;for(let m=0;m<o.length;m++){let T=o.charAt(m);c.includes(T)?s.includes(T)&&u.add(T):l.add(T)}let f=this.getFlagRange(e);f&&(l.size>0?t("error",`'${Array.from(l).join("")}' ${l.size>1?"are":"is"} not valid regular expression flag${l.size>1?"s":""}.`,{node:e,range:f}):u.size>0&&t("warning",`'${Array.from(u).join("")}' regular expression flag${u.size>1?"s":""} will be ignored by Langium.`,{node:e,range:f}))}}checkDirectlyUsedRegexFlags(e,t){if(!we(e.$container)){let n=this.getFlagRange(e);n&&t("warning","Regular expression flags are only applied if the terminal is not a composition",{node:e,range:n})}}getFlagRange(e){let t=Yt(e.$cstNode,"regex");if(!t||!e.regex)return;let n=e.regex,i=n.lastIndexOf("/")+1;return{start:{line:t.range.end.line,character:t.range.end.character-n.length+i},end:t.range.end}}checkUsedHiddenTerminalRule(e,t){let n=Ie(e,i=>we(i)||B(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;we(i)&&i.hidden&&t("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,t){let n=e.rule.ref;we(n)&&n.fragment&&Ie(e,B)&&t("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,t){e.deprecatedSyntax&&t("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",data:Mr(Se.CrossRefTokenSyntax)})}checkPackageImport(e,t){ai(this.documents,e)===void 0?t("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&t("warning","Imports do not need file extensions.",{node:e,property:"path",data:Mr(Se.UnnecessaryFileExtension)})}checkInvalidCharacterRange(e,t){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,t("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,t("error",n,{node:e.right,property:"value"})),i||t("hint","Consider using regex instead of character ranges",{node:e,data:Mr(Se.UseRegexTokens)})}}checkGrammarForUnusedRules(e,t){let n=Ts(e,!0);for(let i of e.rules)we(i)&&i.hidden||dc(i)||n.has(i)||t("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[Tu.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,t){let n=new Le,i=new Set;for(let l of e.rules)we(l)&&l.name&&n.add(l.name,l),B(l)&&Qe(l).filter(pt).forEach(f=>i.add(f.value));let o=new Le,s=new Le;for(let l of e.imports){let u=pc(this.documents,l);for(let f of u)for(let m of f.rules)we(m)&&m.name?o.add(m.name,l):B(m)&&m.name&&Qe(m).filter(pt).forEach(A=>s.add(A.value,l))}for(let l of n.values())if(i.has(l.name))t("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(s.has(l.name)){let u=s.get(l.name);t("error",`Terminal name clashes with imported keyword from "${u[0].path}".`,{node:l,property:"name"})}let a=new Le;for(let l of i)for(let u of o.get(l))a.add(u,l);for(let[l,u]of a.entriesGroupedByKey())u.length>0&&t("error",`Imported terminals (${u.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let c=new Le;for(let[l,u]of o.entriesGroupedByKey()){let f=s.get(l);f.length>0&&u.filter(m=>!f.includes(m)).forEach(m=>c.add(m,l))}for(let[l,u]of c.entriesGroupedByKey())u.length>0&&t("error",`Imported terminals (${u.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,t){if(e.name&&!dc(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&t("warning","Rule name should start with an upper case letter.",{node:e,property:"name",data:Mr(Se.RuleNameUppercase)})}}checkTypeReservedName(e,t){this.checkReservedName(e,"name",t)}checkAssignmentReservedName(e,t){this.checkReservedName(e,"feature",t)}checkParserRuleReservedName(e,t){e.inferredType||this.checkReservedName(e,"name",t)}checkReservedName(e,t,n){let i=e[t];typeof i=="string"&&G_.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:t})}checkKeyword(e,t){Ie(e,B)&&(e.value.length===0?t("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?t("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&t("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,t){e.elements.forEach(n=>{Xr(n.cardinality)&&t("error","Optional elements in Unordered groups are currently not supported",{node:n,data:Mr(Se.OptionalUnorderedGroup)})})}checkRuleParametersUsed(e,t){let n=e.parameters;if(n.length>0){let i=Qe(e).filter(as);for(let o of n)i.some(s=>s.parameter.ref===o)||t("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[Tu.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,t){if(dc(e))return;let n=Nx(e),i=Fr(e);!n&&i?t("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&t("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,t){e.terminal&&_e(e.terminal)&&B(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&t("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,t){if(!e.terminal)return;let n;Qe(e.terminal).map(o=>zt(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&t("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,t){for(let n of e.attributes)if(n.type){let i=Ao(n.type),o=fc(i),s=!1,a=!1;for(let c of o)ys(c)?s=!0:ys(c)||(a=!0);s&&a&&t("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,t){var n;!((n=e.type)===null||n===void 0)&&n.name&&!gs(e.type.name)&&t("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,t){let n=e.rule.ref;if(B(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&t("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else we(n)&&e.arguments.length>0&&t("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,t){!e.terminal&&e.type.ref&&!mc(e.type.ref)&&t("error","Cannot infer terminal or data type rule for cross-reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,t){var n;let i=e.terminal;if(_e(i)){let o=i.rule.ref;B(o)&&!Fr(o)?t("error","Parser rules cannot be used for cross-references.",{node:i,property:"rule"}):B(o)&&!_x(o)?t("error","Data type rules for cross-references must be of type string.",{node:i,property:"rule"}):we(o)&&(!((n=o.type)===null||n===void 0)&&n.name)&&o.type.name!=="string"&&t("error","Terminal rules for cross-references must be of type string.",{node:i,property:"rule"})}}checkCrossRefType(e,t){let n=this.checkReferenceToRuleButNotType(e?.type);n&&t("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,t){if(Mt(e.type.ref)&&Vr(e.type.ref.type)){let n=$x(e.type.ref.type);n.length>0&&t("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,t){var n,i;B((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&t("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,t){or(e.referenceType)||t("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&B(e.ref)&&!Fr(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let t=_n(e.ref);if(t)return`Use the rule type '${t}' instead of the typed rule name '${e.ref.name}' for cross-references.`}}checkAssignmentWithFeatureName(e,t){e.feature==="name"&&zt(e.terminal)&&t("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};function dc(r){return!r.definition||!r.definition.$cstNode||r.definition.$cstNode.length===0}var G_=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function $x(r){let e=[];return r.types.forEach(t=>{var n;or(t)&&(!((n=t.typeRef)===null||n===void 0)&&n.ref?Mt(t.typeRef.ref)&&(Vr(t.typeRef.ref.type)?e.push(...$x(t.typeRef.ref.type)):e.push(t.typeRef.ref.name)):t.stringType?e.push(`"${t.stringType}"`):t.primitiveType&&e.push(t.primitiveType))}),Array.from(new Set(e))}function Xr(r,e){return r==="?"||r==="*"||Ft(e)&&!!e.guardCondition}function Ix(r){return r==="*"||r==="+"}function Fr(r){return Px(r,new Set)}function Px(r,e){if(e.has(r))return!0;e.add(r);for(let t of Qe(r))if(_e(t)){if(!t.rule.ref||B(t.rule.ref)&&!Px(t.rule.ref,e))return!1}else{if(Re(t))return!1;if(Ne(t))return!1}return!!r.definition}function Nx(r){var e;let t=(e=r.returnType)===null||e===void 0?void 0:e.ref;return r.dataType!==void 0||Mt(t)&&j_(t)}function j_(r){return bh(r.type,new Set)}function bh(r,e){if(e.has(r))return!0;if(e.add(r),yo(r))return!1;if(To(r))return!1;if(Vr(r))return r.types.every(t=>bh(t,e));if(or(r)){if(r.primitiveType!==void 0)return!0;if(r.stringType!==void 0)return!0;if(r.typeRef!==void 0){let t=r.typeRef.ref;return Mt(t)?bh(t.type,e):!1}else return!1}else return!1}function _x(r){return hc(r,new Set)}function hc(r,e){var t,n;if(e.has(r))return!0;if(e.add(r),B(r)){if(r.dataType)return r.dataType==="string";if(!((t=r.returnType)===null||t===void 0)&&t.ref)return hc(r.returnType.ref,e)}else{if(Mt(r))return hc(r.type,e);if(yo(r))return!1;if(To(r))return!1;if(Vr(r))return r.types.every(i=>hc(i,e));if(or(r)){if(r.primitiveType==="string")return!0;if(r.stringType)return!0;if(!((n=r.typeRef)===null||n===void 0)&&n.ref)return hc(r.typeRef.ref,e)}}return!1}function wh(r){let e=r.$container;if(Ft(e)){let t=e.elements,n=t.indexOf(r);for(let i=n-1;i>=0;i--){let o=t[i];if(Ne(o))return o;{let s=Qe(t[i]).find(Ne);if(s)return s}}}if(is(e))return wh(e)}function mn(r){var e;if(B(r))return Fr(r)?r.name:(e=xs(r))!==null&&e!==void 0?e:r.name;if(Ar(r)||Mt(r)||cs(r))return r.name;if(Ne(r)){let t=Rs(r);if(t)return t}else if(ss(r))return r.name;throw new cu("Cannot get name of Unknown Type",r.$cstNode)}function _n(r){if(r)try{return mn(r)}catch{return}}function xs(r){if(r.inferredType)return r.inferredType.name;if(r.dataType)return r.dataType;if(r.returnType){let e=r.returnType.ref;if(e){if(B(e))return e.name;if(Ar(e)||Mt(e))return e.name}}}function Rs(r){var e;if(r.inferredType)return r.inferredType.name;if(!((e=r.type)===null||e===void 0)&&e.ref)return mn(r.type.ref)}function wo(r){var e,t,n;return we(r)?(t=(e=r.type)===null||e===void 0?void 0:e.name)!==null&&t!==void 0?t:"string":Fr(r)?r.name:(n=xs(r))!==null&&n!==void 0?n:r.name}function Yr(r){let e={s:!1,i:!1,u:!1},t=bs(r.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(t,n)}var Sh=/[\s\S]/.source;function bs(r,e){if(jv(r))return H_(r);if(Bv(r))return B_(r);if(tu(r))return V_(r);if(ru(r)){let t=r.rule.ref;if(!t)throw new Error("Missing rule reference.");return ci(bs(t.definition),{cardinality:r.cardinality,lookahead:r.lookahead})}else{if(Mv(r))return W_(r);if(zv(r))return K_(r);if(qv(r)){let t=r.regex.lastIndexOf("/"),n=r.regex.substring(1,t),i=r.regex.substring(t+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),ci(n,{cardinality:r.cardinality,lookahead:r.lookahead,wrap:!1})}else{if(Yv(r))return ci(Sh,{cardinality:r.cardinality,lookahead:r.lookahead});throw new Error(`Invalid terminal element: ${r?.$type}`)}}}function H_(r){return ci(r.elements.map(e=>bs(e)).join("|"),{cardinality:r.cardinality,lookahead:r.lookahead})}function B_(r){return ci(r.elements.map(e=>bs(e)).join(""),{cardinality:r.cardinality,lookahead:r.lookahead})}function K_(r){return ci(`${Sh}*?${bs(r.terminal)}`,{cardinality:r.cardinality,lookahead:r.lookahead})}function W_(r){return ci(`(?!${bs(r.terminal)})${Sh}*?`,{cardinality:r.cardinality,lookahead:r.lookahead})}function V_(r){return r.right?ci(`[${Rh(r.left)}-${Rh(r.right)}]`,{cardinality:r.cardinality,lookahead:r.lookahead,wrap:!1}):ci(Rh(r.left),{cardinality:r.cardinality,lookahead:r.lookahead,wrap:!1})}function Rh(r){return oi(r.value)}function ci(r,e){var t;return(e.wrap!==!1||e.lookahead)&&(r=`(${(t=e.lookahead)!==null&&t!==void 0?t:""}${r})`),e.cardinality?`${r}${e.cardinality}`:r}function Ch(r){if(r.path===void 0||r.path.length===0)return;let e=ve.dirname(ne(r).uri),t=r.path;return t.endsWith(".langium")||(t+=".langium"),ve.resolvePath(e,t)}function ai(r,e){let t=Ch(e);try{if(t){let i=r.getOrCreateDocument(t).parseResult.value;if(os(i))return i}}catch{}}function pc(r,e){if(Zl(e)){let t=ai(r,e);if(t){let n=Ah(r,t);return n.push(t),n}return[]}else return Ah(r,e)}function Ah(r,e,t=e,n=new Set,i=new Set){let o=ne(e);if(t!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let s of e.imports){let a=ai(r,s);a&&Ah(r,a,t,n,i)}}return Array.from(i)}function vs(r){return Re(r)?[r]:Pr(r)||Ft(r)||Dr(r)?r.elements.flatMap(e=>vs(e)):_e(r)&&r.rule.ref?vs(r.rule.ref.definition):[]}var z_=["string","number","boolean","Date","bigint"];function gs(r){return z_.includes(r)}var kh=class{constructor(e,t){this.context=e,this.root=t}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,t){let n=this.splitType(t.alt,t.next.length),i=[];for(let o=0;o<t.next.length;o++){let s=n[o],a=t.next[o];a.actionWithAssignment&&i.push({alt:Dx(s),next:[]}),a.name!==void 0&&a.name!==s.name&&(a.actionWithAssignment?(s.properties=[],s.ruleCalls=[],s.super=[e.name],s.name=a.name):(s.super=[s.name,...s.ruleCalls],s.properties=[],s.ruleCalls=[],s.name=a.name)),s.properties.push(...a.properties),s.ruleCalls.push(...a.ruleCalls);let c={alt:s,next:a.children};c.next.length===0?(c.alt.super=c.alt.super.filter(l=>l!==c.alt.name),i.push(c)):i.push(...this.applyNext(e,c))}return qx(i)}splitType(e,t){let n=[];for(let i=0;i<t;i++)n.push(Dx(e));return n}getSuperTypes(e){let t=new Set;return this.collectSuperTypes(e,e,t),Array.from(t)}collectSuperTypes(e,t,n){if(t.ruleCalls.length>0){for(let i of t.ruleCalls)n.add(i);return}for(let i of t.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);t.parents.length===0&&t.name&&n.add(t.name)}connect(e,t){return t.parents.push(e),e.children.push(t),t}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let t=So();t.parents=e;for(let n of e)n.children.push(t);return t}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,t){return e.children.some(n=>n!==t)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function X_(r){return{name:r.name,children:[],parents:[],actionWithAssignment:r.actionWithAssignment,ruleCalls:[...r.ruleCalls],properties:r.properties.map(Ox)}}function Dx(r){return{name:r.name,super:r.super,ruleCalls:r.ruleCalls,properties:r.properties.map(e=>Ox(e))}}function Ox(r){return{name:r.name,optional:r.optional,type:r.type,astNodes:r.astNodes}}function Lx(r,e,t){let n=[],i={fragments:new Map};for(let c of r)n.push(...Mx(i,c));let o=tI(n),s=rI(o),a=nI(o,s,t);for(let c of e){let l=Y_(c);a.unions.push({name:c.name,declared:!1,type:l,subTypes:new Set,superTypes:new Set,dataType:c.dataType})}return a}function Y_(r){if(r.dataType&&r.dataType!=="string")return{primitive:r.dataType};let e=!1,t=()=>(e=!0,{primitive:"unknown"}),n=Eh(r.definition,t);return e?{primitive:"string"}:n}function Eh(r,e){var t,n,i;if(r.cardinality)return e();if(Pr(r))return{types:r.elements.map(o=>Eh(o,e))};if(Ft(r)||Dr(r))return r.elements.length!==1?e():Eh(r.elements[0],e);if(_e(r)){let o=(t=r.rule)===null||t===void 0?void 0:t.ref;return o?we(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:Yr(o).toString()}:{value:o.name}:e()}else if(pt(r))return{string:r.value};return e()}function Mx(r,e){let t=So(e),n=new kh(r,t);return e.definition&&$h(n,n.root,e.definition),n.getTypes()}function So(r){return{name:B(r)||Ne(r)?_n(r):r,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function $h(r,e,t){let n=Xr(t.cardinality,t);if(Pr(t)){let i=[];n&&i.push(r.connect(e,So()));for(let o of t.elements){let s=r.connect(e,So());i.push($h(r,s,o))}return r.merge(...i)}else if(Ft(t)||Dr(t)){let i=r.connect(e,So()),o;n&&(o=r.connect(e,So()));for(let s of t.elements)i=$h(r,i,s);return o?r.merge(o,i):i}else{if(Ne(t))return J_(r,e,t);Re(t)?Q_(e,t):_e(t)&&Z_(r,e,t)}return e}function J_(r,e,t){var n;if(!r.hasLeafNode(e)){let o=X_(e);r.connect(e,o)}let i=r.connect(e,So(t));if(t.type){let o=(n=t.type)===null||n===void 0?void 0:n.ref;o&&oc(o)&&(i.name=o.name)}return t.feature&&t.operator&&(i.actionWithAssignment=!0,i.properties.push({name:t.feature,optional:!1,type:Co(t.operator==="+=",!1,r.root.ruleCalls.length!==0?r.root.ruleCalls:r.getSuperTypes(i)),astNodes:new Set([t])})),i}function Q_(r,e){let t={types:new Set,reference:!1};Fx(e.terminal,t);let n=Co(e.operator==="+=",t.reference,e.operator==="?="?["boolean"]:Array.from(t.types));r.properties.push({name:e.feature,optional:Xr(e.cardinality),type:n,astNodes:new Set([e])})}function Fx(r,e){if(Pr(r)||Dr(r)||Ft(r))for(let t of r.elements)Fx(t,e);else if(pt(r))e.types.add(`'${r.value}'`);else if(_e(r)&&r.rule.ref)e.types.add(wo(r.rule.ref));else if(zt(r)&&r.type.ref){let t=_n(r.type.ref);t&&e.types.add(t),e.reference=!0}}function Z_(r,e,t){let n=t.rule.ref;if(B(n)&&n.fragment){let i=eI(n,r.context);Xr(t.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else B(n)&&e.ruleCalls.push(wo(n))}function eI(r,e){let t=e.fragments.get(r);if(t)return t;let n=[];e.fragments.set(r,n);let i=_n(r),o=Mx(e,r).filter(s=>s.alt.name===i);return n.push(...o.flatMap(s=>s.alt.properties)),n}function tI(r){let e=new Map,t=[],n=qx(r).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(t.push(i),i.ruleCalls.forEach(s=>{s!==o.name&&o.subTypes.add(s)}))}for(let i of t)for(let o of i.ruleCalls){let s=e.get(o);s&&s.name!==i.name&&s.superTypes.add(i.name)}return Array.from(e.values())}function qx(r){let e=r.reduce((n,i)=>n.add(i.alt.name,i),new Le),t=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],s=new Set,a={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let c of i){let l=c.alt;a.alt.super.push(...l.super),a.next.push(...c.next);let u=l.properties;for(let f of u){let m=o.find(T=>T.name===f.name);m?(m.type=xh(m.type,f.type),f.astNodes.forEach(T=>m.astNodes.add(T))):o.push(Object.assign({},f))}l.ruleCalls.forEach(f=>s.add(f))}for(let c of i){let l=c.alt;if(l.ruleCalls.length===0)for(let u of o)l.properties.find(f=>f.name===u.name)||(u.optional=!0)}a.alt.ruleCalls=Array.from(s),t.push(a)}return t}function rI(r){let e=new Map(r.map(i=>[i.name,i])),t=[],n=new Le;for(let i of r)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let s={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:Co(!1,!1,o)};t.push(s)}return t}function nI(r,e,t){let n=new Le;for(let a of r)for(let c of a.superTypes)n.add(c,a.name);let i=new Set(t.interfaces.map(a=>a.name)),o={interfaces:[],unions:e},s=new Map(e.map(a=>[a.name,a]));for(let a of r){let c=new Set(n.get(a.name));if(a.properties.length===0&&c.size>0)if(i.has(a.name))a.abstract=!0,o.interfaces.push(a);else{let l=Co(!1,!1,Array.from(c)),u=s.get(a.name);if(u)u.type=xh(u.type,l);else{let f={name:a.name,declared:!1,subTypes:c,superTypes:a.superTypes,type:l};o.unions.push(f),s.set(a.name,f)}}else o.interfaces.push(a)}for(let a of o.interfaces)a.superTypes=new Set([...a.superTypes].filter(c=>!s.has(c)));return o}function Co(r,e,t){if(r)return{elementType:Co(!1,e,t)};if(e)return{referenceType:Co(!1,!1,t)};if(t.length===1){let n=t[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:gs(n)?{primitive:n}:{value:n}}else return{types:t.map(n=>Co(!1,!1,[n]))}}function Ux(r,e){let t=Gx(r,e),n=Sx(t.interfaces,t.types),i=Lx(t.parserRules,t.datatypeRules,n);return{astResources:t,inferred:i,declared:n}}function Gx(r,e,t=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(r)||(r=[r]);for(let i of r){let o=ne(i);if(!t.has(o.uri)){t.add(o.uri);for(let s of i.rules)B(s)&&!s.fragment&&(Fr(s)?n.datatypeRules.push(s):n.parserRules.push(s));if(i.interfaces.forEach(s=>n.interfaces.push(s)),i.types.forEach(s=>n.types.push(s)),e){let s=i.imports.map(a=>ai(e,a)).filter(a=>a!==void 0);Gx(s,e,t,n)}}}return n}function Bx(r,e){let{inferred:t,declared:n,astResources:i}=Ux(r,e);return{astResources:i,inferred:jx(n,t),declared:jx(t,n)}}function jx(r,e){var t,n;let i={interfaces:gx(Hx(...r.interfaces,...(t=e?.interfaces)!==null&&t!==void 0?t:[])),unions:Hx(...r.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},o=kx(i);return iI(o),o}function Hx(...r){return Array.from(r.reduce((e,t)=>(e.set(t.name,t),e),new Map).values()).sort((e,t)=>e.name.localeCompare(t.name))}function iI(r){let e=sI(r),t=Array.from(e.values());aI(t),cI(r.interfaces),oI(t)}function oI(r){let e=new Set,t=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)t(i),i.typeNames.forEach(o=>n.typeNames.add(o))}};r.forEach(t)}function sI({interfaces:r,unions:e}){let t=r.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,Nh(i.type,new Set));for(let[i,o]of n)o&&t.delete(i.name);return t}function Nh(r,e){if(e.has(r))return!0;if(e.add(r),Dt(r))return r.types.every(t=>Nh(t,e));if(Or(r)){let t=r.value;return fn(t)?Nh(t.type,e):!1}else return Lr(r)||$n(r)}function aI(r){for(let e of r)for(let t of e.superTypes)t.subTypes.add(e)}function cI(r){var e;let t=r.reduce((s,a)=>(s.set(a.name,a),s),new Map);for(let s of r){let a=s.properties.flatMap(c=>yx(c.type));for(let c of a)(e=t.get(c))===null||e===void 0||e.containerTypes.add(s)}let n=new Set,i=r.filter(s=>s.subTypes.size===0),o=new Set(i);for(;i.length>0;){let s=i.shift();if(s)for(let a of s.superTypes)pn(a)&&(s.containerTypes.size===0?(n.add(a.name),a.containerTypes.clear()):n.has(a.name)||s.containerTypes.forEach(c=>a.containerTypes.add(c)),o.has(a)||(o.add(a),i.push(a)))}}var lI={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1},uI={maxLookahead:3},Kx={AstReflection:()=>new Ja},Wx={Grammar:()=>bx(),LanguageMetaData:()=>lI,parser:{ParserConfig:()=>uI}};var gc=class{constructor(e,t,n){var i;this.elements=e,this.outerScope=t,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let t=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(t)return t;if(this.outerScope)return this.outerScope.getElement(e)}},As=class{constructor(e,t,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=t}getElement(e){let t=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(t);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=ie(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},Vx={getElement(){},getAllElements(){return ns}};var xu=de(Jn(),1);var ws=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,t=xu.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,t)}async computeExportsForNode(e,t,n=Ni,i=xu.CancellationToken.None){let o=[];this.exportNode(e,o,t);for(let s of n(e))await Ze(i),this.exportNode(s,o,t);return o}exportNode(e,t,n){let i=this.nameProvider.getName(e);i&&t.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,t=xu.CancellationToken.None){let n=e.parseResult.value,i=new Le;for(let o of Qe(n))await Ze(t),this.processNode(o,e,i);return i}processNode(e,t,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,t))}}};var Ru=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},_h=class extends Ru{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,t){this.throwIfDisposed(),this.cache.set(e,t)}get(e,t){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(t){let n=t();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},bu=class extends Ru{constructor(e){super(),this.cache=new Map,this.converter=e??(t=>t)}has(e,t){return this.throwIfDisposed(),this.cacheForContext(e).has(t)}set(e,t,n){this.throwIfDisposed(),this.cacheForContext(e).set(t,n)}get(e,t,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(t))return i.get(t);if(n){let o=n();return i.set(t,o),o}else return}delete(e,t){return this.throwIfDisposed(),this.cacheForContext(e).delete(t)}clear(e){if(this.throwIfDisposed(),e){let t=this.converter(e);this.cache.delete(t)}else this.cache.clear()}cacheForContext(e){let t=this.converter(e),n=this.cache.get(t);return n||(n=new Map,this.cache.set(t,n)),n}};var Au=class extends _h{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var Ss=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new Au(e.shared)}getScope(e){let t=[],n=this.reflection.getReferenceType(e),i=ne(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&t.push(ie(a).filter(c=>this.reflection.isSubtype(c.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=t.length-1;s>=0;s--)o=this.createScope(t[s],o);return o}createScope(e,t,n){return new gc(ie(e),t,n)}createScopeForNodes(e,t,n){let i=ie(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new gc(i,t,n)}getGlobalScope(e,t){return this.globalScopeCache.get(e,()=>new As(this.indexManager.allElements(e)))}};var wu=class extends Ss{constructor(e){super(e),this.langiumDocuments=e.shared.workspace.LangiumDocuments}getScope(e){let t=this.reflection.getReferenceType(e);return t===go?this.getTypeScope(t,e):super.getScope(e)}getTypeScope(e,t){let n,i=ne(t.container).precomputedScopes,o=nu(t.container);if(i&&o){let a=i.get(o);a.length>0&&(n=ie(a).filter(c=>c.type===Qa||c.type===Za))}let s=this.getGlobalScope(e,t);return n?this.createScope(n,s):s}getGlobalScope(e,t){let n=Ie(t.container,os);if(!n)return Vx;let i=new Set;this.gatherImports(n,i);let o=this.indexManager.allElements(e,i);return e===go&&(o=o.filter(s=>s.type===Qa||s.type===Za)),new As(o)}gatherImports(e,t){for(let n of e.imports){let i=Ch(n);if(i&&!t.has(i.toString())&&(t.add(i.toString()),this.langiumDocuments.hasDocument(i))){let s=this.langiumDocuments.getOrCreateDocument(i).parseResult.value;os(s)&&this.gatherImports(s,t)}}}},Su=class extends ws{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,t,n){var i;if(super.exportNode(e,t,n),B(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;t.push(this.createInterfaceDescription(o,o.name,n))}Qe(e).forEach(o=>{if(Ne(o)&&o.inferredType){let s=Rs(o);s&&t.push(this.createInterfaceDescription(o,s,n))}})}}processNode(e,t,n){cs(e)||(this.processTypeNode(e,t,n),this.processActionNode(e,t,n),super.processNode(e,t,n))}processTypeNode(e,t,n){var i;let o=e.$container;if(o&&B(e)&&!e.returnType&&!e.dataType){let s=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(s,s.name,t))}}processActionNode(e,t,n){let i=nu(e);if(i&&Ne(e)&&e.inferredType){let o=Rs(e);o&&n.add(i,this.createInterfaceDescription(e,o,t))}}createInterfaceDescription(e,t,n=ne(e)){let i,o=()=>{var s;return i??(i=ir((s=this.nameProvider.getNameNode(e))!==null&&s!==void 0?s:e.$cstNode))};return{node:e,name:t,get nameSegment(){return o()},selectionSegment:ir(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};var qr=de(Ae(),1);var sr=de(Ae(),1);var Cu=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,t={},n=sr.CancellationToken.None){let i=e.parseResult,o=[];if(await Ze(n),(!t.categories||t.categories.includes("built-in"))&&(this.processLexingErrors(i,o,t),t.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===hn.LexingError})||(this.processParsingErrors(i,o,t),t.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===hn.ParsingError}))||(this.processLinkingErrors(e,o,t),t.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===hn.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,t,n))}catch(s){if(bo(s))throw s;console.error("An error occurred during validation:",s)}return await Ze(n),o}processLexingErrors(e,t,n){for(let i of e.lexerErrors){let o={severity:sr.DiagnosticSeverity.Error,range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Mr(hn.LexingError),source:this.getSource()};t.push(o)}}processParsingErrors(e,t,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset))o=sr.Range.create(0,0,0,0);else{let a=sr.Position.create(s.endLine-1,s.endColumn);o=sr.Range.create(a,a)}}}else o=Ya(i.token);if(o){let s={severity:sr.DiagnosticSeverity.Error,range:o,message:i.message,data:Mr(hn.ParsingError),source:this.getSource()};t.push(s)}}}processLinkingErrors(e,t,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:hn.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};t.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,t,n=sr.CancellationToken.None){let i=[],o=(s,a,c)=>{i.push(this.toDiagnostic(s,a,c))};return await Promise.all(ri(e).map(async s=>{await Ze(n);let a=this.validationRegistry.getChecks(s.$type,t.categories);for(let c of a)await c(s,o,n)})),i}toDiagnostic(e,t,n){return{message:t,range:fI(n),severity:dI(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function fI(r){if(sr.Range.is(r.range))return r.range;let e;return typeof r.property=="string"?e=Yt(r.node.$cstNode,r.property,r.index):typeof r.keyword=="string"&&(e=zr(r.node.$cstNode,r.keyword,r.index)),e??(e=r.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function dI(r){switch(r){case"error":return sr.DiagnosticSeverity.Error;case"warning":return sr.DiagnosticSeverity.Warning;case"info":return sr.DiagnosticSeverity.Information;case"hint":return sr.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+r)}}var hn;(function(r){r.LexingError="lexing-error",r.ParsingError="parsing-error",r.LinkingError="linking-error"})(hn=hn||(hn={}));var ku=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,t){let n=[],i=o=>o&&n.push(o);for(let o of t.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,t,n){var i;switch((i=e.data)===null||i===void 0?void 0:i.code){case Se.GrammarNameUppercase:case Se.RuleNameUppercase:n(this.makeUpperCase(e,t));break;case Se.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,t));break;case Se.UseRegexTokens:n(this.fixRegexTokens(e,t));break;case Se.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,t));break;case Se.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,t));break;case Se.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,t));break;case Se.MissingReturns:n(this.fixMissingReturns(e,t));break;case Se.InvalidInfers:case Se.InvalidReturns:n(this.fixInvalidReturnsInfers(e,t));break;case Se.MissingInfer:n(this.fixMissingInfer(e,t));break;case Se.SuperfluousInfer:n(this.fixSuperfluousInfer(e,t));break;case hn.LinkingError:{let o=e.data;o&&o.containerType==="RuleCall"&&o.property==="rule"&&n(this.addNewRule(e,o,t)),o&&this.lookInGlobalScope(e,o,t).forEach(n);break}}}fixMissingReturns(e,t){let n=t.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[t.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,t){let n=e.data;if(n&&n.actionSegment){let i=t.textDocument.getText(n.actionSegment.range);return{title:`Correct ${i} usage`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[t.textDocument.uri]:[{range:n.actionSegment.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,t){let n=e.data;if(n&&n.actionSegment)return{title:"Correct 'infer' usage",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[t.textDocument.uri]:[{range:{start:n.actionSegment.range.end,end:n.actionSegment.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,t){let n=e.data;if(n&&n.actionRange)return{title:"Remove the 'infer' keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[t.textDocument.uri]:[{range:n.actionRange,newText:""}]}}}}fixUnnecessaryFileExtension(e,t){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[t.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,t){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[t.textDocument.uri]:[{range:n,newText:t.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,t){return{title:"Add entry keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[t.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,t){let n=t.textDocument.offsetAt(e.range.start),i=t.parseResult.value.$cstNode;if(i){let o=br(i,n),s=Ie(o?.astNode,tu);if(s&&s.right&&s.$cstNode){let a=s.left.value,c=s.right.value;return{title:"Refactor into regular expression",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[t.textDocument.uri]:[{range:s.$cstNode.range,newText:`/[${oi(a)}-${oi(c)}]/`}]}}}}}}fixCrossRefSyntax(e,t){return{title:"Replace '|' with ':'",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[t.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,t){let n=t.parseResult.value,i=n.hiddenTokens,o=[],s=Yt(n.$cstNode,"definesHiddenTokens");if(s){let a=s.range.start,c=s.offset,l=n.$cstNode.text.indexOf(")",c)+1;o.push({newText:"",range:{start:a,end:t.textDocument.positionAt(l)}})}for(let a of i){let c=a.ref;if(c&&we(c)&&!c.hidden&&c.$cstNode){let l=c.$cstNode.range.start;o.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[t.textDocument.uri]:o}}}}addNewRule(e,t,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let s=br(o,i),a=Ie(s?.astNode,B);if(a&&a.$cstNode)return{title:`Add new rule '${t.refText}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:a.$cstNode.range.end,end:a.$cstNode.range.end},newText:`

`+t.refText+`:
    /* TODO implement rule */ {infer `+t.refText+"};"}]}}}}}lookInGlobalScope(e,t,n){var i,o;let s={container:{$type:t.containerType},property:t.property,reference:{$refText:t.refText}},a=this.reflection.getReferenceType(s),c=this.indexManager.allElements(a).filter(m=>m.name===t.refText),l=[],u=-1,f=-1;for(let m of c){if(ve.equals(m.documentUri,n.uri))continue;let T=pI(n.uri,m.documentUri),A,S="",N=n.parseResult.value,C=N.imports.find(v=>v.path&&T<v.path);if(C)A=(i=C.$cstNode)===null||i===void 0?void 0:i.range.start;else if(N.imports.length>0){let v=N.imports[N.imports.length-1].$cstNode.range.end;v&&(A={line:v.line+1,character:0})}else N.rules.length>0&&(A=(o=N.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,S=`
`);A&&((u<0||T.length<f)&&(u=l.length,f=T.length),l.push({title:`Add import to '${T}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:A,end:A},newText:`import '${T}'
${S}`}]}}}))}return u>=0&&(l[u].isPreferred=!0),l}};function pI(r,e){let t=ve.dirname(r),n=ve.relative(t,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}var Jx=de(co(),1);var Es=de(Ae(),1);function Ih(r,e){let t={stacks:r,tokens:e};return mI(t),t.stacks.flat().forEach(i=>{i.property=void 0}),Xx(t.stacks).map(i=>i[i.length-1])}function Ph(r){let{next:e,cardinalities:t,visited:n,plus:i}=r,o=[],s=e.feature;if(n.has(s))return[];n.add(s);let a,c=s;for(;c.$container;)if(Ft(c.$container)){a=c.$container;break}else if(is(c.$container))c=c.$container;else break;if(Ix(c.cardinality)){let l=Cs({next:{feature:c,type:e.type,new:!1},cardinalities:t,visited:n,plus:i});for(let u of l)i.add(u.feature);o.push(...l)}if(a){let l=a.elements.indexOf(c);l!==void 0&&l<a.elements.length-1&&o.push(...zx({feature:a,type:e.type,new:!1},l+1,t,n,i)),o.every(u=>Xr(u.feature.cardinality,u.feature)||Xr(t.get(u.feature))||i.has(u.feature))&&o.push(...Ph({next:{feature:a,type:e.type,new:!1},cardinalities:t,visited:n,plus:i}))}return o}function yc(r){return Et(r)&&(r={feature:r}),Cs({next:r,cardinalities:new Map,visited:new Set,plus:new Set})}function Cs(r){var e,t,n;let{next:i,cardinalities:o,visited:s,plus:a}=r;if(i===void 0)return[];let{feature:c,type:l}=i;if(Ft(c)){if(s.has(c))return[];s.add(c)}if(Ft(c))return zx(i,0,o,s,a).map(u=>Eu(u,c.cardinality,o));if(Pr(c)||Dr(c))return c.elements.flatMap(u=>Cs({next:{feature:u,new:!1,type:l},cardinalities:o,visited:s,plus:a})).map(u=>Eu(u,c.cardinality,o));if(Re(c)){let u={feature:c.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:c.feature};return Cs({next:u,cardinalities:o,visited:s,plus:a}).map(f=>Eu(f,c.cardinality,o))}else{if(Ne(c))return Ph({next:{feature:c,new:!0,type:mn(c),property:(t=i.property)!==null&&t!==void 0?t:c.feature},cardinalities:o,visited:s,plus:a});if(_e(c)&&B(c.rule.ref)){let u=c.rule.ref,f={feature:u.definition,new:!0,type:u.fragment?void 0:(n=xs(u))!==null&&n!==void 0?n:u.name,property:i.property};return Cs({next:f,cardinalities:o,visited:s,plus:a}).map(m=>Eu(m,c.cardinality,o))}else return[i]}}function Eu(r,e,t){return t.set(r.feature,e),r}function zx(r,e,t,n,i){var o;let s=[],a;for(;e<r.feature.elements.length&&(a={feature:r.feature.elements[e++],new:!1,type:r.type},s.push(...Cs({next:a,cardinalities:t,visited:n,plus:i})),!!Xr((o=a.feature.cardinality)!==null&&o!==void 0?o:t.get(a.feature),a.feature)););return s}function mI(r){for(let e of r.tokens){let t=Xx(r.stacks,e);r.stacks=t}}function Xx(r,e){let t=[];for(let n of r)t.push(...hI(n,e));return t}function hI(r,e){let t=new Map,n=new Set(r.map(o=>o.feature).filter(gI)),i=[];for(;r.length>0;){let o=r.pop(),s=Ph({next:o,cardinalities:t,plus:n,visited:new Set}).filter(a=>e?Dh(a.feature,e):!0);for(let a of s)i.push([...r,a]);if(!s.every(a=>Xr(a.feature.cardinality,a.feature)||Xr(t.get(a.feature))))break}return i}function gI(r){if(r.cardinality==="+")return!0;let e=Ie(r,Re);return!!(e&&e.cardinality==="+")}function Dh(r,e){if(pt(r))return r.value===e.image;if(_e(r))return yI(r.rule.ref,e);if(zt(r)){let t=$u(r);if(t)return Dh(t,e)}return!1}function yI(r,e){return B(r)?yc(r.definition).some(n=>Dh(n.feature,e)):we(r)?Yr(r).test(e.image):!1}function Yx(r){let e=Array.from(new Set(r.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),t=Array.from(new Set(r.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:t.length>0?t:void 0}}var ks=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,t){let n=[],i=this.buildContexts(e,t.position),o=(c,l)=>{let u=this.fillCompletionItem(c,l);u&&n.push(u)},s=c=>pt(c.feature)?c.feature.value:c.feature,a=[];for(let c of i)if(await Promise.all(ie(c.features).distinct(s).exclude(a).map(l=>this.completionFor(c,l,o))),a.push(...c.features),!this.continueCompletion(n))break;return Es.CompletionList.create(this.deduplicateItems(n),!0)}deduplicateItems(e){return ie(e).distinct(t=>`${t.kind}_${t.label}_${t.detail}`).toArray()}findFeaturesAt(e,t){let n=e.getText({start:Es.Position.create(0,0),end:e.positionAt(t)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let c=Nu(this.grammar),l=yc({feature:c.definition,new:!0,type:xs(c)});return o.length>0?(o.shift(),Ih(l.map(u=>[u]),o)):l}let s=[...o].splice(i.tokenIndex);return Ih([i.elementStack.map(c=>({feature:c}))],s)}*buildContexts(e,t){var n,i,o,s,a;let c=e.parseResult.value.$cstNode;if(!c)return;let l=e.textDocument,u=l.getText(),f=l.offsetAt(t),m={document:e,textDocument:l,offset:f,position:t},T=this.findDataTypeRuleStart(c,f);if(T){let[y,$]=T,D=(n=br(c,y))===null||n===void 0?void 0:n.astNode,X=this.findFeaturesAt(l,y);yield Object.assign(Object.assign({},m),{node:D,tokenOffset:y,tokenEndOffset:$,features:X})}let{nextTokenStart:A,nextTokenEnd:S,previousTokenStart:N,previousTokenEnd:C}=this.backtrackToAnyToken(u,f),v;if(N!==void 0&&C!==void 0&&C===f){v=(i=br(c,N))===null||i===void 0?void 0:i.astNode;let y=this.findFeaturesAt(l,N);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:N,tokenEndOffset:C,features:y})}if(v=(s=(o=br(c,A))===null||o===void 0?void 0:o.astNode)!==null&&s!==void 0?s:N===void 0||(a=br(c,N))===null||a===void 0?void 0:a.astNode,v){let y=this.findFeaturesAt(l,A);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:A,tokenEndOffset:S,features:y})}else{let y=Nu(this.grammar),$=yc(y.definition);yield Object.assign(Object.assign({},m),{tokenOffset:A,tokenEndOffset:S,features:$})}}findDataTypeRuleStart(e,t){var n,i;let o=Pt(e,t,this.grammarConfig.nameRegexp),s=!!(!((n=Ie(o?.grammarSource,B))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=Ie(o?.grammarSource,B))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,t){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:t,nextTokenEnd:t};let i;for(let o of n){if(o.startOffset>=t)return{nextTokenStart:t,nextTokenEnd:t,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=t)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:t,nextTokenEnd:t,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}async completionForRule(e,t,n){if(B(t)){let i=yc(t.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,t,n){if(pt(t.feature))return this.completionForKeyword(e,t.feature,n);if(zt(t.feature)&&e.node)return this.completionForCrossReference(e,t,n)}completionForCrossReference(e,t,n){let i=Ie(t.feature,Re),o=e.node;if(i&&o){if(t.type&&(t.new||o.$type!==t.type)&&(o={$type:t.type,$container:o,$containerProperty:t.property}),!e)return;let s={reference:{},container:o,property:i.feature};try{let a=this.scopeProvider.getScope(s),c=new Set;a.getAllElements().forEach(l=>{!c.has(l.name)&&this.filterCrossReference(l)&&(n(e,this.createReferenceCompletionItem(l)),c.add(l.name))})}catch(a){console.error(a)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:this.nodeKindProvider.getCompletionItemKind(e),detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,t,n){t.value.match(/[\w]/)&&n(e,{label:t.value,kind:Es.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,t){var n,i;let o;if(typeof t.label=="string")o=t.label;else if("node"in t){let l=this.nameProvider.getName(t.node);if(!l)return;o=l}else if("nodeDescription"in t)o=t.nodeDescription.name;else return;let s;typeof((n=t.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=t.textEdit.newText:typeof t.insertText=="string"?s=t.insertText:s=o;let a=(i=t.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:t.additionalTextEdits,command:t.command,commitCharacters:t.commitCharacters,data:t.data,detail:t.detail,documentation:t.documentation,filterText:t.filterText,insertText:t.insertText,insertTextFormat:t.insertTextFormat,insertTextMode:t.insertTextMode,kind:t.kind,labelDetails:t.labelDetails,preselect:t.preselect,sortText:t.sortText,tags:t.tags,textEditText:t.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,t,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,t)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var _u=class extends ks{constructor(e){super(e),this.documents=()=>e.shared.workspace.LangiumDocuments}completionFor(e,t,n){let i=Ie(t.feature,Re);if(i?.feature==="path")this.completeImportPath(e,n);else return super.completionFor(e,t,n)}completeImportPath(e,t){let i=e.textDocument.getText().substring(e.tokenOffset,e.offset),o=this.getAllFiles(e.document),s={start:e.position,end:e.position};if(i.length>0){let a=i.substring(1);o=o.filter(u=>u.startsWith(a));let c=e.textDocument.positionAt(e.tokenOffset+1),l=e.textDocument.positionAt(e.tokenEndOffset-1);s={start:c,end:l}}for(let a of o){let c=i.length>0?"":'"',l=`${c}${a}${c}`;t(e,{label:a,textEdit:{newText:l,range:s},kind:Jx.CompletionItemKind.File,sortText:"0"})}}getAllFiles(e){let t=this.documents().all,n=e.uri.toString(),i=ve.dirname(e.uri).toString(),o=[];for(let s of t)if(!ve.equals(s.uri,n)){let a=s.uri.toString(),c=a.substring(0,a.length-ve.extname(s.uri).length),l=ve.relative(i,c);l.startsWith(".")||(l=`./${l}`),o.push(l)}return o}};var Tc=de(Ae(),1);var $s=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let t=[],n=i=>t.push(i);return this.collectFolding(e,n),t}collectFolding(e,t){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=Qe(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,t),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,t)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,t,n){let i=t.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,t,n){let i=t.$cstNode;if(i){for(let o of nv(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,Tc.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,t,n){let i=t.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(t,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),Tc.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,t){if(t===Tc.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var Iu=class extends $s{shouldProcessContent(e){return!B(e)}};var Pu=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Oh(e,this.collector)}formatDocument(e,t){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,t.options):[]}isFormatRangeErrorFree(e,t){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(o=>{var s;return(s=o.line)!==null&&s!==void 0?s:Number.MAX_VALUE}),...n.parserErrors.map(o=>{var s;return(s=o.token.startLine)!==null&&s!==void 0?s:Number.MAX_VALUE}))>t.end.line:!0}formatDocumentRange(e,t){return this.isFormatRangeErrorFree(e,t.range)?this.doDocumentFormat(e,t.options,t.range):[]}formatDocumentOnType(e,t){let n={start:{character:0,line:t.position.line},end:t.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,t.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,t,n){let i=new Map,o=(a,c,l)=>{var u,f;let m=this.nodeModeToKey(a,c),T=i.get(m),A=(u=l.options.priority)!==null&&u!==void 0?u:0,S=(f=T?.options.priority)!==null&&f!==void 0?f:0;(!T||S<=A)&&i.set(m,l)};this.collector=o,this.iterateAstFormatting(e,n);let s=this.iterateCstFormatting(e,i,t,n);return this.avoidOverlappingEdits(e.textDocument,s)}avoidOverlappingEdits(e,t){let n=[];for(let i of t){let o=n[n.length-1];if(o){let s=e.offsetAt(i.range.start),a=e.offsetAt(o.range.end);s<a&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,t){let n=e.parseResult.value;this.format(n);let i=Qe(n).iterator(),o;do if(o=i.next(),!o.done){let s=o.value;this.insideRange(s.$cstNode.range,t)?this.format(s):i.prune()}while(!o.done)}nodeModeToKey(e,t){return`${e.offset}:${e.end}:${t}`}insideRange(e,t){return!t||e.start.line<=t.start.line&&e.end.line>=t.end.line||e.start.line>=t.start.line&&e.end.line<=t.end.line||e.start.line<=t.end.line&&e.end.line>=t.end.line}isNecessary(e,t){return t.getText(e.range)!==e.newText}iterateCstFormatting(e,t,n,i){let o={indentation:0,options:n,document:e.textDocument},s=[],c=this.iterateCstTree(e,o).iterator(),l,u;do if(u=c.next(),!u.done){let f=u.value,m=mo(f),T=this.nodeModeToKey(f,"prepend"),A=t.get(T);if(t.delete(T),A){let C=this.createTextEdit(l,f,A,o);for(let v of C)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}let S=this.nodeModeToKey(f,"append"),N=t.get(S);if(t.delete(S),N){let C=sv(f);if(C){let v=this.createTextEdit(f,C,N,o);for(let y of v)y&&this.insideRange(y.range,i)&&this.isNecessary(y,e.textDocument)&&s.push(y)}}if(!A&&f.hidden){let C=this.createHiddenTextEdits(l,f,void 0,o);for(let v of C)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}m&&(l=f)}while(!u.done);return s}createHiddenTextEdits(e,t,n,i){var o;let s=t.range.start.line;if(e&&e.range.end.line===s)return[];let a=[],c={start:{character:0,line:s},end:t.range.start},l=i.document.getText(c),u=this.findFittingMove(c,(o=n?.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(l,i),T=this.getIndentationCharacterCount(i,u)-f;if(T===0)return[];let A="";T>0&&(A=(i.options.insertSpaces?" ":"	").repeat(T));let S=t.text.split(`
`);S[0]=l+S[0];for(let N=0;N<S.length;N++){let C=s+N,v={character:0,line:C};if(T>0)a.push({newText:A,range:{start:v,end:v}});else{let y=S[N],$=0;for(;$<y.length;$++){let D=y.charAt($);if(D!==" "&&D!=="	")break}a.push({newText:"",range:{start:v,end:{line:C,character:Math.min($,Math.abs(T))}}})}}return a}getExistingIndentationCharacterCount(e,t){let n=" ".repeat(t.options.tabSize);return(t.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,t){let n=e.indentation;return t&&t.tabs&&(n+=t.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,t,n,i){var o;if(t.hidden)return this.createHiddenTextEdits(e,t,n,i);let s={start:(o=e?.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:t.range.start},a=this.findFittingMove(s,n.moves,i);if(!a)return[];let c=a.characters,l=a.lines,u=a.tabs,f=i.indentation;i.indentation+=u??0;let m=[];return c!==void 0?m.push(this.createSpaceTextEdit(s,c,n.options)):l!==void 0?m.push(this.createLineTextEdit(s,l,i,n.options)):u!==void 0&&m.push(this.createTabTextEdit(s,!!e,i)),mo(t)&&(i.indentation=f),m}createSpaceTextEdit(e,t,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;t=this.fitIntoOptions(t,o,n)}return{newText:" ".repeat(t),range:e}}createLineTextEdit(e,t,n,i){let o=e.end.line-e.start.line;t=this.fitIntoOptions(t,o,i);let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(t)}${a}`,range:e}}createTabTextEdit(e,t,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),s=t?1:0,a=Math.max(e.end.line-e.start.line,s);return{newText:`${`
`.repeat(a)}${o}`,range:e}}fitIntoOptions(e,t,n){return n.allowMore?e=Math.max(t,e):n.allowLess&&(e=Math.min(t,e)),e}findFittingMove(e,t,n){if(t.length===0)return;if(t.length===1)return t[0];let i=e.end.line-e.start.line;for(let o of t){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return t[t.length-1]}iterateCstTree(e,t){let i=e.parseResult.value.$cstNode;return i?new Wr(i,o=>this.iterateCst(o,t)):ns}iterateCst(e,t){if(!En(e))return ns;let n=t.indentation;return new Ir(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(t.indentation=n,mr))}},Oh=class{constructor(e,t){this.astNode=e,this.collector=t}node(e){return new gn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let t=[];for(let n of e)n.$cstNode&&t.push(n.$cstNode);return new gn(t,this.collector)}property(e,t){let n=Yt(this.astNode.$cstNode,e,t);return new gn(n?[n]:[],this.collector)}properties(...e){let t=[];for(let n of e){let i=_i(this.astNode.$cstNode,n);t.push(...i)}return new gn(t,this.collector)}keyword(e,t){let n=zr(this.astNode.$cstNode,e,t);return new gn(n?[n]:[],this.collector)}keywords(...e){let t=[];for(let n of e){let i=Du(this.astNode.$cstNode,n);t.push(...i)}return new gn(t,this.collector)}cst(e){return new gn([...e],this.collector)}interior(e,t){let n=e.nodes,i=t.nodes;if(n.length!==1||i.length!==1)return new gn([],this.collector);let o=n[0],s=i[0];if(o.offset>s.offset){let a=o;o=s,s=a}return new gn(av(o,s),this.collector)}},gn=class r{constructor(e,t){this.nodes=e,this.collector=t}prepend(e){for(let t of this.nodes)this.collector(t,"prepend",e);return this}append(e){for(let t of this.nodes)this.collector(t,"append",e);return this}surround(e){for(let t of this.nodes)this.collector(t,"prepend",e),this.collector(t,"append",e);return this}slice(e,t){return new r(this.nodes.slice(e,t),this.collector)}},ge;(function(r){function e(...u){return{options:{},moves:u.flatMap(f=>f.moves).sort(l)}}r.fit=e;function t(u){return i(0,u)}r.noSpace=t;function n(u){return i(1,u)}r.oneSpace=n;function i(u,f){return{options:f??{},moves:[{characters:u}]}}r.spaces=i;function o(u){return s(1,u)}r.newLine=o;function s(u,f){return{options:f??{},moves:[{lines:u}]}}r.newLines=s;function a(u){return{options:u??{},moves:[{tabs:1,lines:1}]}}r.indent=a;function c(u){return{options:u??{},moves:[{tabs:0}]}}r.noIndent=c;function l(u,f){var m,T,A,S,N,C;let v=(m=u.lines)!==null&&m!==void 0?m:0,y=(T=f.lines)!==null&&T!==void 0?T:0,$=(A=u.tabs)!==null&&A!==void 0?A:0,D=(S=f.tabs)!==null&&S!==void 0?S:0,X=(N=u.characters)!==null&&N!==void 0?N:0,ye=(C=f.characters)!==null&&C!==void 0?C:0;return v<y?-1:v>y?1:$<D?-1:$>D?1:X<ye?-1:X>ye?1:0}})(ge=ge||(ge={}));var Ou=class extends Pu{format(e){if(zt(e))this.getNodeFormatter(e).properties("type","terminal").surround(ge.noSpace());else if(B(e)){let t=this.getNodeFormatter(e);t.keywords("entry","fragment","returns").append(ge.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?t.property("name").append(ge.oneSpace()):t.property("name").append(ge.noSpace()),t.properties("parameters").append(ge.noSpace()),t.keywords(",").append(ge.oneSpace()),t.keywords("<").append(ge.noSpace());let n=t.keyword(";"),i=t.keyword(":");i.prepend(ge.noSpace()),t.interior(i,n).prepend(ge.indent()),n.prepend(ge.fit(ge.noSpace(),ge.newLine())),t.node(e).prepend(ge.noIndent())}else if(we(e)){let t=this.getNodeFormatter(e);e.type&&(t.property("name").append(ge.oneSpace()),t.keyword("returns").append(ge.oneSpace())),t.keywords("hidden","terminal","fragment").append(ge.oneSpace()),t.keyword(":").prepend(ge.noSpace()),t.keyword(";").prepend(ge.fit(ge.noSpace(),ge.newLine())),t.node(e).prepend(ge.noIndent())}else if(Ne(e)){let t=this.getNodeFormatter(e);t.keyword("{").append(ge.noSpace()),t.keywords(".","+=","=").surround(ge.noSpace()),t.keyword("}").prepend(ge.noSpace())}else if(ss(e))this.getNodeFormatter(e).keywords("infer","infers").append(ge.oneSpace());else if(Re(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(ge.noSpace());else if(_e(e)){let t=this.getNodeFormatter(e);t.keyword("<").surround(ge.noSpace()),t.keyword(",").append(ge.oneSpace()),t.properties("arguments").append(ge.noSpace())}is(e)&&this.getNodeFormatter(e).property("cardinality").prepend(ge.noSpace())}};var li=de(Ae(),1);var oe=de(Ae(),1);var Fh={[oe.SemanticTokenTypes.class]:0,[oe.SemanticTokenTypes.comment]:1,[oe.SemanticTokenTypes.enum]:2,[oe.SemanticTokenTypes.enumMember]:3,[oe.SemanticTokenTypes.event]:4,[oe.SemanticTokenTypes.function]:5,[oe.SemanticTokenTypes.interface]:6,[oe.SemanticTokenTypes.keyword]:7,[oe.SemanticTokenTypes.macro]:8,[oe.SemanticTokenTypes.method]:9,[oe.SemanticTokenTypes.modifier]:10,[oe.SemanticTokenTypes.namespace]:11,[oe.SemanticTokenTypes.number]:12,[oe.SemanticTokenTypes.operator]:13,[oe.SemanticTokenTypes.parameter]:14,[oe.SemanticTokenTypes.property]:15,[oe.SemanticTokenTypes.regexp]:16,[oe.SemanticTokenTypes.string]:17,[oe.SemanticTokenTypes.struct]:18,[oe.SemanticTokenTypes.type]:19,[oe.SemanticTokenTypes.typeParameter]:20,[oe.SemanticTokenTypes.variable]:21},Qx={[oe.SemanticTokenModifiers.abstract]:1,[oe.SemanticTokenModifiers.async]:2,[oe.SemanticTokenModifiers.declaration]:4,[oe.SemanticTokenModifiers.defaultLibrary]:8,[oe.SemanticTokenModifiers.definition]:16,[oe.SemanticTokenModifiers.deprecated]:32,[oe.SemanticTokenModifiers.documentation]:64,[oe.SemanticTokenModifiers.modification]:128,[oe.SemanticTokenModifiers.readonly]:256,[oe.SemanticTokenModifiers.static]:512},Zx={legend:{tokenTypes:Object.keys(Fh),tokenModifiers:Object.keys(Qx)},full:{delta:!0},range:!0},Mh=class extends oe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,t,n,i,o){this._tokens.push({line:e,char:t,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,t){return e.line===t.line?e.char-t.char:e.line-t.line}},Lu=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(t=>{this.tokensBuilders.delete(t.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(t=>{var n;this.initialize((n=t.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,t,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,t,n=oe.CancellationToken.None){return this.currentRange=t.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,t,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(t.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return t=>{"line"in t?this.highlightToken({range:{start:{line:t.line,character:t.char},end:{line:t.line,character:t.char+t.length}},type:t.type,modifier:t.modifier}):"range"in t?this.highlightToken(t):"keyword"in t?this.highlightKeyword(t):"property"in t?this.highlightProperty(t):this.highlightNode({node:t.cst,type:t.type,modifier:t.modifier})}}getDocumentTokensBuilder(e){let t=this.tokensBuilders.get(e.uri.toString());if(t)return t;let n=new Mh;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,t,n){let i=e.parseResult.value,o=ri(i,{range:this.currentRange}).iterator(),s;do if(s=o.next(),!s.done){await Ze(n);let a=s.value;this.highlightElement(a,t)==="prune"&&o.prune()}while(!s.done)}highlightToken(e){var t;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!Jl(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let s=Fh[i],a=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let u of o){let f=Qx[u];a|=f}}let c=n.start.line,l=n.end.line;if(c===l){let u=n.start.character,f=n.end.character-u;this.currentTokensBuilder.push(c,u,f,s,a)}else if(!((t=this.clientCapabilities)===null||t===void 0)&&t.multilineTokenSupport){let u=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(c,u,m-f,s,a)}else{let u=n.start,f=this.currentDocument.textDocument.offsetAt({line:c+1,character:0});this.currentTokensBuilder.push(u.line,u.character,f-u.character-1,s,a);for(let m=c+1;m<l;m++){let T=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-T-1,s,a)}this.currentTokensBuilder.push(l,0,n.end.character,s,a)}}highlightProperty(e){let t=[];if(typeof e.index=="number"){let o=Yt(e.node.$cstNode,e.property,e.index);o&&t.push(o)}else t.push(..._i(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of t)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:t,keyword:n,type:i,index:o,modifier:s}=e,a=[];if(typeof o=="number"){let c=zr(t.$cstNode,n,o);c&&a.push(c)}else a.push(...Du(t.$cstNode,n));for(let c of a)this.highlightNode({node:c,type:i,modifier:s})}highlightNode(e){let{node:t,type:n,modifier:i}=e,o=t.range;this.highlightToken({range:o,type:n,modifier:i})}},Lh;(function(r){function e(n,i){let o=new Map;Object.entries(Fh).forEach(([c,l])=>o.set(l,c));let s=0,a=0;return t(n.data,5).map(c=>{s+=c[0],c[0]!==0&&(a=0),a+=c[1];let l=c[2];return{offset:i.textDocument.offsetAt({line:s,character:a}),tokenType:o.get(c[3]),tokenModifiers:c[4],text:i.textDocument.getText({start:{line:s,character:a},end:{line:s,character:a+l}})}})}r.decode=e;function t(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(Lh=Lh||(Lh={}));var Mu=class extends Lu{highlightElement(e,t){var n;Re(e)?t({node:e,property:"feature",type:li.SemanticTokenTypes.property}):Ne(e)?e.feature&&t({node:e,property:"feature",type:li.SemanticTokenTypes.property}):cs(e)?t({node:e,property:"name",type:li.SemanticTokenTypes.type}):or(e)?(e.primitiveType||e.typeRef)&&t({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:li.SemanticTokenTypes.type}):Av(e)?t({node:e,property:"name",type:li.SemanticTokenTypes.parameter}):as(e)?t({node:e,property:"parameter",type:li.SemanticTokenTypes.parameter}):_e(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&t({node:e,property:"rule",type:li.SemanticTokenTypes.type}):eu(e)&&t({node:e,property:"name",type:li.SemanticTokenTypes.property})}};var Fu=class extends ps{getName(e){return Re(e)?e.feature:super.getName(e)}getNameNode(e){return Re(e)?Yt(e.$cstNode,"feature"):super.getNameNode(e)}};var Ns=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let t=_s(e),n=e.astNode;if(t&&n){let i=n[t.feature];if(Zn(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(Zn(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||iv(e,i)))return n}}}findDeclarationNode(e){let t=this.findDeclaration(e);if(t?.$cstNode){let n=this.nameProvider.getNameNode(t);return n??t.$cstNode}}findReferences(e,t){let n=[];if(t.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return t.documentUri&&(i=i.filter(o=>ve.equals(o.sourceUri,t.documentUri))),n.push(...i),ie(n)}getReferenceToSelf(e){let t=this.nameProvider.getNameNode(e);if(t){let n=ne(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:ir(t),local:!0}}}};var qu=class extends Ns{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let t=e.astNode,n=_s(e);if(n&&n.feature==="feature"){if(Re(t))return this.findAssignmentDeclaration(t);if(Ne(t))return this.findActionDeclaration(t)}return super.findDeclaration(e)}findReferences(e,t){var n;return eu(e)?this.findReferencesToTypeAttribute(e,(n=t.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,t)}findReferencesToTypeAttribute(e,t){let n=[],i=Ie(e,Ar);if(i){if(t){let a=this.getReferenceToSelf(e);a&&n.push(a)}let o=ch(i,this,this.documents,this.nodeLocator),s=[];o.forEach(a=>{let c=this.findRulesWithReturnType(a);s.push(...c)}),s.forEach(a=>{let c=this.createReferencesToAttribute(a,e);n.push(...c)})}return ie(n)}createReferencesToAttribute(e,t){let n=[];if(B(e)){let i=vs(e.definition).find(o=>o.feature===t.name);if(i?.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:ne(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:ne(t).uri,targetPath:this.nodeLocator.getAstNodePath(t),segment:ir(o),local:ve.equals(ne(i).uri,ne(t).uri)})}}else{if(e.feature===t.name){let o=Yt(e.$cstNode,"feature");o&&n.push({sourceUri:ne(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:ne(t).uri,targetPath:this.nodeLocator.getAstNodePath(t),segment:ir(o),local:ve.equals(ne(e).uri,ne(t).uri)})}let i=Ie(e,B);n.push(...this.createReferencesToAttribute(i,t))}return n}findAssignmentDeclaration(e){var t;let n=Ie(e,B),i=wh(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((t=n?.returnType)===null||t===void 0)&&t.ref&&(Ar(n.returnType.ref)||Mt(n.returnType.ref))){let o=ic(n.returnType.ref);for(let s of o){let a=s.attributes.find(c=>c.name===e.feature);if(a)return a}}return e}findActionDeclaration(e,t){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=t??e.feature,o=ic(e.type.ref);for(let s of o){let a=s.attributes.find(c=>c.name===i);if(a)return a}}}findRulesWithReturnType(e){let t=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),s=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);(B(s)||Ne(s))&&t.push(s)}),t}};var vc=de(Ae(),1);var eR=de(Ae(),1);var Uu=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,t){let n=e.parseResult.value,i=Pt(n.$cstNode,e.textDocument.offsetAt(t.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.astNode,e)}getCallHierarchyItems(e,t){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:eR.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:t.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let t=this.documents.getOrCreateDocument(Jt.parse(e.item.uri)),n=t.parseResult.value,i=Pt(n.$cstNode,t.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.astNode,{includeDeclaration:!1});return this.getIncomingCalls(i.astNode,o)}outgoingCalls(e){let t=this.documents.getOrCreateDocument(Jt.parse(e.item.uri)),n=t.parseResult.value,i=Pt(n.$cstNode,t.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.astNode)}};var tR=de(Ae(),1);var Is=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,t){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=Pt(i,e.textDocument.offsetAt(t.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,t)}}collectLocationLinks(e,t){var n;let i=this.findLink(e);if(i)return[tR.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let t=this.references.findDeclarationNode(e);if(t?.astNode){let n=ne(t.astNode);if(t&&n)return{source:e,target:t,targetDocument:n}}}};var rR=de(Ae(),1);var Gu=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,t){let n=e.parseResult.value.$cstNode;if(!n)return;let i=Pt(n,e.textDocument.offsetAt(t.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let s=ve.equals(ne(o).uri,e.uri),a={documentUri:e.uri,includeDeclaration:s};return this.references.findReferences(o,a).map(l=>this.createDocumentHighlight(l)).toArray()}}createDocumentHighlight(e){return rR.DocumentHighlight.create(e.segment.range)}};var ju=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,t){let n=t.$cstNode,i=this.nameProvider.getNameNode(t);if(i&&n){let o=this.nameProvider.getName(t);return[{kind:this.nodeKindProvider.getSymbolKind(t),name:o??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,t)}]}else return this.getChildSymbols(e,t)||[]}getChildSymbols(e,t){let n=[];for(let i of Ni(t)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var nR=de(Ae(),1),Hu=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,t,n=nR.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(t,n)}createCommandAcceptor(){return(e,t)=>this.registeredCommands.set(e,t)}};var Bu=class{match(e,t){if(e.length===0)return!0;t=t.toLowerCase();let n=!1,i,o=0,s=t.length;for(let a=0;a<s;a++){let c=t.charCodeAt(a),l=e.charCodeAt(o);if((c===l||this.toUpperCharCode(c)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,c)),n&&o++,o===e.length))return!0;i=c}return!1}isWordTransition(e,t){return iR<=e&&e<=oR&&TI<=t&&t<=vI||e===sR&&t!==sR}toUpperCharCode(e){return iR<=e&&e<=oR?e-32:e}},iR="a".charCodeAt(0),oR="z".charCodeAt(0),TI="A".charCodeAt(0),vI="Z".charCodeAt(0),sR="_".charCodeAt(0);var qh=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,t){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(t.position),a=Pt(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let c=this.references.findDeclaration(a);if(c)return this.getAstNodeHoverContent(c)}}}},Ku=class extends qh{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let t=this.documentationProvider.getDocumentation(e);if(t)return{contents:{kind:"markdown",value:t}}}};var xI=de(Ae(),1);var RI=de(Ae(),1);var Jr=de(Ae(),1);var je;(function(r){r[r.Changed=0]="Changed",r[r.Parsed=1]="Parsed",r[r.IndexedContent=2]="IndexedContent",r[r.ComputedScopes=3]="ComputedScopes",r[r.Linked=4]="Linked",r[r.IndexedReferences=5]="IndexedReferences",r[r.Validated=6]="Validated"})(je=je||(je={}));var Wu=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,t){return this.create(t??Jt.parse(e.uri),e)}fromString(e,t){return this.create(t,e)}fromModel(e,t){return this.create(t,{$model:e})}create(e,t){if(t??(t=this.textDocuments.get(e.toString())),t??(t=this.getContentFromFileSystem(e)),typeof t=="string"){let n=this.parse(e,t);return this.createLangiumDocument(n,e,void 0,t)}else if("$model"in t){let n={value:t.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,t.getText());return this.createLangiumDocument(n,e,t)}}createLangiumDocument(e,t,n,i){let o;if(n)o={parseResult:e,uri:t,state:je.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(t,i);o={parseResult:e,uri:t,state:je.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}update(e){let t=this.textDocuments.get(e.uri.toString()),n=t?t.getText():this.getContentFromFileSystem(e.uri);if(t)Object.defineProperty(e,"textDocument",{value:t});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,t){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(t)}createTextDocumentGetter(e,t){let n=this.serviceRegistry,i;return()=>i??(i=ts.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,t??""))}},Vu=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return ie(this.documentMap.values())}addDocument(e){let t=e.uri.toString();if(this.documentMap.has(t))throw new Error(`A document with the URI '${t}' is already present.`);this.documentMap.set(t,e)}getOrCreateDocument(e){let t=e.toString(),n=this.documentMap.get(t);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(t,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let t=e.toString(),n=this.documentMap.get(t);return n&&(n.state=je.Changed,n.precomputedScopes=void 0,n.references=[],n.diagnostics=void 0),n}deleteDocument(e){let t=e.toString(),n=this.documentMap.get(t);return n&&(n.state=je.Changed,this.documentMap.delete(t)),n}};var bI=de(Ae(),1);function aR(r){let e=[],t=[];r.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&t.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:t.length>0?Array.from(new Set(t)).sort():void 0};return n.triggerCharacters?n:void 0}var zu=class{constructor(e){this.onInitializeEmitter=new Jr.Emitter,this.onInitializedEmitter=new Jr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){Ql(this.services),this.services.ServiceRegistry.all.forEach(e=>Ql(e))}hasService(e){return this.services.ServiceRegistry.all.some(t=>e(t)!==void 0)}buildInitializeResult(e){var t;let n=this.services.ServiceRegistry.all,i=this.hasService(w=>w.lsp.Formatter),o=n.map(w=>{var U;return(U=w.lsp.Formatter)===null||U===void 0?void 0:U.formatOnTypeOptions}).find(w=>!!w),s=this.hasService(w=>w.lsp.CodeActionProvider),a=this.hasService(w=>w.lsp.SemanticTokenProvider),c=(t=this.services.lsp.ExecuteCommandHandler)===null||t===void 0?void 0:t.commands,l=this.hasService(w=>w.lsp.DocumentLinkProvider),u=aR(n.map(w=>{var U;return(U=w.lsp.SignatureHelp)===null||U===void 0?void 0:U.signatureHelpOptions})),f=this.hasService(w=>w.lsp.TypeProvider),m=this.hasService(w=>w.lsp.ImplementationProvider),T=this.hasService(w=>w.lsp.CompletionProvider),A=Yx(n.map(w=>{var U;return(U=w.lsp.CompletionProvider)===null||U===void 0?void 0:U.completionOptions})),S=this.hasService(w=>w.lsp.ReferencesProvider),N=this.hasService(w=>w.lsp.DocumentSymbolProvider),C=this.hasService(w=>w.lsp.DefinitionProvider),v=this.hasService(w=>w.lsp.DocumentHighlightProvider),y=this.hasService(w=>w.lsp.FoldingRangeProvider),$=this.hasService(w=>w.lsp.HoverProvider),D=this.hasService(w=>w.lsp.RenameProvider),X=this.hasService(w=>w.lsp.CallHierarchyProvider),ye=this.hasService(w=>w.lsp.CodeLensProvider),Ee=this.hasService(w=>w.lsp.DeclarationProvider),Ht=this.hasService(w=>w.lsp.InlayHintProvider),xt=this.services.lsp.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:c&&{commands:c},textDocumentSync:Jr.TextDocumentSyncKind.Incremental,completionProvider:T?A:void 0,referencesProvider:S,documentSymbolProvider:N,definitionProvider:C,typeDefinitionProvider:f,documentHighlightProvider:v,codeActionProvider:s,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:y,hoverProvider:$,renameProvider:D?{prepareProvider:!0}:void 0,semanticTokensProvider:a?Zx:void 0,signatureHelpProvider:u,implementationProvider:m,callHierarchyProvider:X?{}:void 0,documentLinkProvider:l?{resolveProvider:!1}:void 0,codeLensProvider:ye?{resolveProvider:!1}:void 0,declarationProvider:Ee,inlayHintProvider:Ht?{resolveProvider:!1}:void 0,workspaceSymbolProvider:xt?{resolveProvider:!!xt.resolveSymbol}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};function lR(r){let e=r.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");AI(e,r),wI(e,r),SI(e,r),CI(e,r),EI(e,r),$I(e,r),NI(e,r),_I(e,r),PI(e,r),OI(e,r),LI(e,r),kI(e,r),MI(e,r),DI(e,r),FI(e,r),qI(e,r),GI(e,r),HI(e,r),WI(e,r),BI(e,r),jI(e,r),UI(e,r),II(e,r),KI(e,r),e.onInitialize(n=>r.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>r.lsp.LanguageServer.initialized(n)),r.workspace.TextDocuments.listen(e),e.listen()}function AI(r,e){let t=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(s,a){n.lock(c=>t.update(s,a,c))}e.workspace.TextDocuments.onDidChangeContent(s=>{i([Jt.parse(s.document.uri)],[])}),r.onDidChangeWatchedFiles(s=>{let a=[],c=[];for(let l of s.changes){let u=Jt.parse(l.uri);l.type===Jr.FileChangeType.Deleted?c.push(u):a.push(u)}i(a,c)})}function wI(r,e){e.workspace.DocumentBuilder.onBuildPhase(je.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&r.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}function SI(r,e){r.onCompletion(ar((t,n,i,o)=>{var s;return(s=t.lsp.CompletionProvider)===null||s===void 0?void 0:s.getCompletion(n,i,o)},e))}function CI(r,e){r.onReferences(ar((t,n,i,o)=>{var s;return(s=t.lsp.ReferencesProvider)===null||s===void 0?void 0:s.findReferences(n,i,o)},e))}function kI(r,e){r.onCodeAction(ar((t,n,i,o)=>{var s;return(s=t.lsp.CodeActionProvider)===null||s===void 0?void 0:s.getCodeActions(n,i,o)},e))}function EI(r,e){r.onDocumentSymbol(ar((t,n,i,o)=>{var s;return(s=t.lsp.DocumentSymbolProvider)===null||s===void 0?void 0:s.getSymbols(n,i,o)},e))}function $I(r,e){r.onDefinition(ar((t,n,i,o)=>{var s;return(s=t.lsp.DefinitionProvider)===null||s===void 0?void 0:s.getDefinition(n,i,o)},e))}function NI(r,e){r.onTypeDefinition(ar((t,n,i,o)=>{var s;return(s=t.lsp.TypeProvider)===null||s===void 0?void 0:s.getTypeDefinition(n,i,o)},e))}function _I(r,e){r.onImplementation(ar((t,n,i,o)=>{var s;return(s=t.lsp.ImplementationProvider)===null||s===void 0?void 0:s.getImplementation(n,i,o)},e))}function II(r,e){r.onDeclaration(ar((t,n,i,o)=>{var s;return(s=t.lsp.DeclarationProvider)===null||s===void 0?void 0:s.getDeclaration(n,i,o)},e))}function PI(r,e){r.onDocumentHighlight(ar((t,n,i,o)=>{var s;return(s=t.lsp.DocumentHighlightProvider)===null||s===void 0?void 0:s.getDocumentHighlight(n,i,o)},e))}function DI(r,e){r.onHover(ar((t,n,i,o)=>{var s;return(s=t.lsp.HoverProvider)===null||s===void 0?void 0:s.getHoverContent(n,i,o)},e))}function OI(r,e){r.onFoldingRanges(ar((t,n,i,o)=>{var s;return(s=t.lsp.FoldingRangeProvider)===null||s===void 0?void 0:s.getFoldingRanges(n,i,o)},e))}function LI(r,e){r.onDocumentFormatting(ar((t,n,i,o)=>{var s;return(s=t.lsp.Formatter)===null||s===void 0?void 0:s.formatDocument(n,i,o)},e)),r.onDocumentRangeFormatting(ar((t,n,i,o)=>{var s;return(s=t.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentRange(n,i,o)},e)),r.onDocumentOnTypeFormatting(ar((t,n,i,o)=>{var s;return(s=t.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentOnType(n,i,o)},e))}function MI(r,e){r.onRenameRequest(ar((t,n,i,o)=>{var s;return(s=t.lsp.RenameProvider)===null||s===void 0?void 0:s.rename(n,i,o)},e)),r.onPrepareRename(ar((t,n,i,o)=>{var s;return(s=t.lsp.RenameProvider)===null||s===void 0?void 0:s.prepareRename(n,i,o)},e))}function FI(r,e){r.languages.inlayHint.on(Di((t,n,i,o)=>{var s;return(s=t.lsp.InlayHintProvider)===null||s===void 0?void 0:s.getInlayHints(n,i,o)},e))}function qI(r,e){let t={data:[]};r.languages.semanticTokens.on(Di((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):t,e)),r.languages.semanticTokens.onDelta(Di((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):t,e)),r.languages.semanticTokens.onRange(Di((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):t,e))}function UI(r,e){r.onDidChangeConfiguration(t=>{t.settings&&e.workspace.ConfigurationProvider.updateConfiguration(t)})}function GI(r,e){let t=e.lsp.ExecuteCommandHandler;t&&r.onExecuteCommand(async(n,i)=>{var o;try{return await t.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return Ps(s)}})}function jI(r,e){r.onDocumentLinks(Di((t,n,i,o)=>{var s;return(s=t.lsp.DocumentLinkProvider)===null||s===void 0?void 0:s.getDocumentLinks(n,i,o)},e))}function HI(r,e){r.onSignatureHelp(Di((t,n,i,o)=>{var s;return(s=t.lsp.SignatureHelp)===null||s===void 0?void 0:s.provideSignatureHelp(n,i,o)},e))}function BI(r,e){r.onCodeLens(Di((t,n,i,o)=>{var s;return(s=t.lsp.CodeLensProvider)===null||s===void 0?void 0:s.provideCodeLens(n,i,o)},e))}function KI(r,e){var t;let n=e.lsp.WorkspaceSymbolProvider;if(n){r.onWorkspaceSymbol(async(o,s)=>{try{return await n.getSymbols(o,s)}catch(a){return Ps(a)}});let i=(t=n.resolveSymbol)===null||t===void 0?void 0:t.bind(n);i&&r.onWorkspaceSymbolResolve(async(o,s)=>{try{return await i(o,s)}catch(a){return Ps(a)}})}}function WI(r,e){r.languages.callHierarchy.onPrepare(Di((t,n,i,o)=>{var s;return t.lsp.CallHierarchyProvider&&(s=t.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&s!==void 0?s:null},e)),r.languages.callHierarchy.onIncomingCalls(cR((t,n,i)=>{var o;return t.lsp.CallHierarchyProvider&&(o=t.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),r.languages.callHierarchy.onOutgoingCalls(cR((t,n,i)=>{var o;return t.lsp.CallHierarchyProvider&&(o=t.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}function cR(r,e){let t=e.ServiceRegistry;return async(n,i)=>{let o=Jt.parse(n.item.uri),s=t.getServices(o);if(!s){let a=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(a),new Error(a)}try{return await r(s,n,i)}catch(a){return Ps(a)}}}function Di(r,e){let t=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Jt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)throw console.error(`Could not find service instance for uri: '${s.toString()}'`),new Error;let c=t.getOrCreateDocument(s);if(!c)throw new Error;try{return await r(a,c,i,o)}catch(l){return Ps(l)}}}function ar(r,e){let t=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Jt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)return console.error(`Could not find service instance for uri: '${s.toString()}'`),null;let c=t.getOrCreateDocument(s);if(!c)return null;try{return await r(a,c,i,o)}catch(l){return Ps(l)}}}function Ps(r){if(bo(r))return new Jr.ResponseError(Jr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(r instanceof Jr.ResponseError)return r;throw r}var Yu=de(Ae(),1),Xu=class{getSymbolKind(){return Yu.SymbolKind.Field}getCompletionItemKind(){return Yu.CompletionItemKind.Reference}};var uR=de(Ae(),1);var Ju=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,t){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=Pt(n,e.textDocument.offsetAt(t.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,t,e):[]}getReferences(e,t,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:t.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(uR.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};var fR=de(Ae(),1);var Qu=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,t){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(t.position),s=Pt(i,o,this.grammarConfig.nameRegexp);if(!s)return;let a=this.references.findDeclaration(s);if(!a)return;let c={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,c).forEach(u=>{let f=fR.TextEdit.replace(u.segment.range,t.newName),m=u.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,t){return this.renameNodeRange(e,t.position)}renameNodeRange(e,t){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(t);if(n&&i){let o=Pt(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&oc(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var VI=de(Ae(),1);var dR=de(Ae(),1);var Zu=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,t=dR.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await Ze(t),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let t=e.nameSegment;if(t)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:t.range,uri:e.documentUri.toString()}}}};var ef=class extends Is{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,t){var n,i,o,s,a,c;let l="path";if(Zl(e.astNode)&&((n=_s(e))===null||n===void 0?void 0:n.feature)===l){let u=ai(this.documents,e.astNode);if(u?.$document){let f=(i=this.findTargetObject(u))!==null&&i!==void 0?i:u,m=(s=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&s!==void 0?s:vc.Range.create(0,0,0,0),T=(c=(a=f.$cstNode)===null||a===void 0?void 0:a.range)!==null&&c!==void 0?c:vc.Range.create(0,0,0,0);return[vc.LocationLink.create(u.$document.uri.toString(),T,m,e.range)]}return}return super.collectLocationLinks(e,t)}findTargetObject(e){return e.isDeclared?e:Ni(e).head()}};var Uh=de(Ae(),1);var tf=class extends Uu{getIncomingCalls(e,t){if(!B(e))return;let n=new Map;if(t.forEach(i=>{let s=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!s.$cstNode)return;let a=br(s.$cstNode,i.segment.offset);if(!a)return;let c=Ie(a.astNode,B);if(!c||!c.$cstNode)return;let l=this.nameProvider.getNameNode(c);if(!l)return;let u=i.sourceUri.toString(),f=u+"@"+l.text;n.has(f)?n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,a],docUri:u}):n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[a],docUri:u})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:Uh.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!B(e))return;let t=Qe(e).filter(_e).toArray(),n=new Map;if(t.forEach(i=>{var o;let s=i.$cstNode;if(!s)return;let a=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!a)return;let c=this.nameProvider.getNameNode(a.astNode);if(!c)return;let l=ne(a.astNode).uri.toString(),u=l+"@"+c.text;n.has(u)?n.set(u,{refCstNode:a,to:c,from:[...n.get(u).from,s.range],docUri:l}):n.set(u,{refCstNode:a,to:c,from:[s.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:Uh.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};var rf=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let t=Bx(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(t),typeToSuperProperties:this.collectSuperProperties(t)}}collectValidationInfo({astResources:e,inferred:t,declared:n}){let i=new Map,o=zI(e);for(let a of fu(t))i.set(a.name,{inferred:a,inferredNodes:o.get(a.name)});let s=ie(e.interfaces).concat(e.types).reduce((a,c)=>a.set(c.name,c),new Map);for(let a of fu(n)){let c=s.get(a.name);if(c){let l=i.get(a.name);i.set(a.name,Object.assign(Object.assign({},l??{}),{declared:a,declaredNode:c}))}}return i}collectSuperProperties({inferred:e,declared:t}){let n=new Map,i=lh(e,t),o=new Map(i.map(s=>[s.name,s]));for(let s of lh(e,t))n.set(s.name,this.addSuperProperties(s,o,new Set));return n}addSuperProperties(e,t,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let s=t.get(o.name);s&&i.push(...this.addSuperProperties(s,t,n))}return i}};function zI({parserRules:r,datatypeRules:e}){let t=new Le;ie(r).concat(e).forEach(i=>t.add(wo(i),i));function n(i){if(Ne(i)){let o=Rs(i);o&&t.add(o,i)}(Pr(i)||Ft(i)||Dr(i))&&i.elements.forEach(o=>n(o))}return r.forEach(i=>n(i.definition)),t}function pR(r){return r&&"declared"in r}function mR(r){return r&&"inferred"in r}function hR(r){return r&&"inferred"in r&&"declared"in r}function yR(r){let e=r.validation.ValidationRegistry,t=r.validation.LangiumGrammarTypesValidator,n={Action:[t.checkActionIsNotUnionType],Grammar:[t.checkDeclaredTypesConsistency,t.checkDeclaredAndInferredTypesConsistency],Interface:[t.checkCyclicInterface],Type:[t.checkCyclicType]};e.register(n,t)}var nf=class{checkCyclicType(e,t){Oi(e,new Set)&&t("error",`Type alias '${e.name}' circularly references itself.`,{node:e,property:"name"})}checkCyclicInterface(e,t){Oi(e,new Set)&&t("error",`Type '${e.name}' recursively references itself as a base type.`,{node:e,property:"name"})}checkDeclaredTypesConsistency(e,t){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if(pR(o)&&pn(o.declared)&&Ar(o.declaredNode)){let s=o;YI(s,t),JI(s,t)}}}checkDeclaredAndInferredTypesConsistency(e,t){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())mR(o)&&o.inferred instanceof ds&&XI(o.inferred,t),hR(o)&&eP(o,i,t)}checkActionIsNotUnionType(e,t){Mt(e.type)&&t("error","Actions cannot create union types.",{node:e,property:"type"})}};function Oi(r,e){var t;if(e.has(r))return!0;if(e.add(r),Mt(r))return Oi(r.type,e);if(Ar(r))return r.superTypes.some(n=>n.ref&&Oi(n.ref,new Set(e)));if(or(r)){if(!((t=r.typeRef)===null||t===void 0)&&t.ref)return Oi(r.typeRef.ref,e)}else{if(To(r))return Oi(r.referenceType,e);if(yo(r))return Oi(r.elementType,e);if(Vr(r))return r.types.some(n=>Oi(n,new Set(e)))}return!1}function XI(r,e){r.properties.forEach(t=>{var n;let i=sh(t.type);if(i.length>1){let o=a=>ni(a)?"ref":"other",s=o(i[0]);if(i.slice(1).some(a=>o(a)!==s)){let a=(n=t.astNodes.values().next())===null||n===void 0?void 0:n.value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${t.name}" into two or more different properties.`,{node:a})}}})}function YI({declared:r,declaredNode:e},t){Array.from(r.superTypes).forEach((n,i)=>{n&&(fn(n)&&t("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||t("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function JI({declared:r,declaredNode:e},t){let n=r.properties.reduce((s,a)=>s.add(a.name,a),new Le);for(let[s,a]of n.entriesGroupedByKey())if(a.length>1)for(let c of a)t("error",`Cannot have two properties with the same name '${s}'.`,{node:Array.from(c.astNodes)[0],property:"name"});let i=Array.from(r.superTypes);for(let s=0;s<i.length;s++)for(let a=s+1;a<i.length;a++){let c=i[s],l=i[a],u=pn(c)?c.superProperties:[],f=pn(l)?l.superProperties:[],m=QI(u,f);m.length>0&&t("error",`Cannot simultaneously inherit from '${c}' and '${l}'. Their ${m.map(T=>"'"+T+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let s of i){let a=pn(s)?s.superProperties:[];for(let c of a)o.add(c.name)}for(let s of r.properties)if(o.has(s.name)){let a=e.attributes.find(c=>c.name===s.name);a&&t("error",`Cannot redeclare property '${s.name}'. It is already inherited from another interface.`,{node:a,property:"name"})}}function QI(r,e){let t=[];for(let n of r){let i=e.find(o=>o.name===n.name);i&&!ZI(n,i)&&t.push(n.name)}return t}function ZI(r,e){return nc(r.type,e.type)&&nc(e.type,r.type)}function eP(r,e,t){let{inferred:n,declared:i,declaredNode:o,inferredNodes:s}=r,a=i.name,c=f=>m=>s.forEach(T=>t("error",`${m}${f?` ${f}`:""}.`,T?.inferredType?{node:T?.inferredType,property:"name"}:{node:T,property:Ne(T)?"type":"name"})),l=(f,m)=>f.forEach(T=>t("error",m,{node:T,property:Re(T)||Ne(T)?"feature":"name"})),u=f=>{s.forEach(m=>{B(m)&&vs(m.definition).find(A=>A.feature===f)===void 0&&t("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${a}'.`,{node:m,property:"parameters"})})};if(fn(n)&&fn(i))tP(n.type,i.type,c(`in a rule that returns type '${a}'`));else if(pn(n)&&pn(i))rP(n,i,e,c(`in a rule that returns type '${a}'`),l,u);else{let f=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;c()(f),t("error",f,{node:o,property:"name"})}}function tP(r,e,t){nc(r,e)||t(`Cannot assign type '${dn(r,"DeclaredType")}' to '${dn(e,"DeclaredType")}'`)}function gR(r){return r.optional||lu(r.type)}function rP(r,e,t,n,i,o){let s=new Set(r.properties.map(f=>f.name)),a=new Map(r.allProperties.map(f=>[f.name,f])),c=new Map(e.superProperties.map(f=>[f.name,f])),l=f=>{if(Dt(f))return{types:f.types.map(m=>l(m))};if(ni(f))return{referenceType:l(f.referenceType)};if(ii(f))return{elementType:l(f.elementType)};if(Or(f)){let m=t.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of a.entries()){let T=c.get(f);if(T){let A=dn(m.type,"DeclaredType"),S=dn(T.type,"DeclaredType");if(!nc(l(m.type),T.type)&&S!=="unknown"){let C=`The assigned type '${A}' is not compatible with the declared property '${f}' of type '${S}'.`;i(m.astNodes,C)}m.optional&&!gR(T)&&o(f)}else s.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let u=new Set;for(let[f,m]of c.entries())!a.get(f)&&!gR(m)&&u.add(f);if(u.size>0){let f=u.size>1?"Properties":"A property",m=u.size>1?"are expected":"is expected",T=Array.from(u).map(A=>`'${A}'`).sort().join(", ");n(`${f} ${T} ${m}.`)}}var nP={validation:{LangiumGrammarValidator:r=>new vu(r),ValidationResourcesCollector:r=>new rf(r),LangiumGrammarTypesValidator:()=>new nf},lsp:{FoldingRangeProvider:r=>new Iu(r),CodeActionProvider:r=>new ku(r),SemanticTokenProvider:r=>new Mu(r),Formatter:()=>new Ou,DefinitionProvider:r=>new ef(r),CallHierarchyProvider:r=>new tf(r),CompletionProvider:r=>new _u(r)},references:{ScopeComputation:r=>new Su(r),ScopeProvider:r=>new wu(r),References:r=>new qu(r),NameProvider:()=>new Fu}};function TR(r,e){let t=ho(Rc(r),Kx,e),n=ho(xc({shared:t}),Wx,nP);return iP(t,n),t.ServiceRegistry.register(n),Ex(n),yR(n),{shared:t,grammar:n}}function iP(r,e){r.workspace.DocumentBuilder.onBuildPhase(je.IndexedReferences,async(n,i)=>{for(let o of n){await Ze(i);let s=e.validation.ValidationResourcesCollector,a=o.parseResult.value;o.validationResources=s.collectValidationResources(a)}})}var Gh=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}},Li={fileSystemProvider:()=>new Gh};function Nu(r){return r.rules.find(e=>B(e)&&e.entry)}function oP(r){return r.rules.filter(e=>we(e)&&e.hidden)}function Ts(r,e){let t=new Set,n=Nu(r);if(!n)return new Set(r.rules);let i=[n].concat(oP(r));for(let s of i)vR(s,t,e);let o=new Set;for(let s of r.rules)(t.has(s.name)||we(s)&&s.hidden)&&o.add(s);return o}function vR(r,e,t){e.add(r.name),Qe(r).forEach(n=>{if(_e(n)||t&&ru(n)){let i=n.rule.ref;i&&!e.has(i.name)&&vR(i,e,t)}})}function $u(r){if(r.terminal)return r.terminal;if(r.type.ref){let e=mc(r.type.ref);return e?.terminal}}function xR(r){return r.hidden&&!Yr(r).test(" ")}function _i(r,e){return!r||!e?[]:jh(r,e,r.astNode,!0)}function Yt(r,e,t){if(!r||!e)return;let n=jh(r,e,r.astNode,!0);if(n.length!==0)return t!==void 0?t=Math.max(0,Math.min(t,n.length-1)):t=0,n[t]}function jh(r,e,t,n){if(!n){let i=Ie(r.grammarSource,Re);if(i&&i.feature===e)return[r]}return En(r)&&r.astNode===t?r.content.flatMap(i=>jh(i,e,t,!1)):[]}function Du(r,e){return r?RR(r,e,r?.astNode):[]}function zr(r,e,t){if(!r)return;let n=RR(r,e,r?.astNode);if(n.length!==0)return t!==void 0?t=Math.max(0,Math.min(t,n.length-1)):t=0,n[t]}function RR(r,e,t){if(r.astNode!==t)return[];if(pt(r.grammarSource)&&r.grammarSource.value===e)return[r];let n=Wm(r).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===t?pt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function _s(r){var e;let t=r.astNode;for(;t===((e=r.container)===null||e===void 0?void 0:e.astNode);){let n=Ie(r.grammarSource,Re);if(n)return n;r=r.container}}function mc(r){return ss(r)&&(r=r.$container),bR(r,new Map)}function bR(r,e){var t;function n(i,o){let s;return Ie(i,Re)||(s=bR(o,e)),e.set(r,s),s}if(e.has(r))return e.get(r);e.set(r,void 0);for(let i of Qe(r)){if(Re(i)&&i.feature.toLowerCase()==="name")return e.set(r,i),i;if(_e(i)&&B(i.rule.ref))return n(i,i.rule.ref);if(or(i)&&(!((t=i.typeRef)===null||t===void 0)&&t.ref))return n(i,i.typeRef.ref)}}function hu(r){var e;let t=TR(Li).grammar,n=t.serializer.JsonSerializer.deserialize(r);return t.shared.workspace.LangiumDocumentFactory.fromModel(n,Jt.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}function AR(r){let e=[],t=r.Grammar;for(let n of t.rules)we(n)&&xR(n)&&Tx(Yr(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:Vm}}var sP=typeof global=="object"&&global&&global.Object===Object&&global,of=sP;var aP=typeof self=="object"&&self&&self.Object===Object&&self,cP=of||aP||Function("return this")(),$t=cP;var lP=$t.Symbol,qt=lP;var wR=Object.prototype,uP=wR.hasOwnProperty,fP=wR.toString,bc=qt?qt.toStringTag:void 0;function dP(r){var e=uP.call(r,bc),t=r[bc];try{r[bc]=void 0;var n=!0}catch{}var i=fP.call(r);return n&&(e?r[bc]=t:delete r[bc]),i}var SR=dP;var pP=Object.prototype,mP=pP.toString;function hP(r){return mP.call(r)}var CR=hP;var gP="[object Null]",yP="[object Undefined]",kR=qt?qt.toStringTag:void 0;function TP(r){return r==null?r===void 0?yP:gP:kR&&kR in Object(r)?SR(r):CR(r)}var hr=TP;function vP(r){return r!=null&&typeof r=="object"}var yt=vP;var xP="[object Symbol]";function RP(r){return typeof r=="symbol"||yt(r)&&hr(r)==xP}var In=RP;function bP(r,e){for(var t=-1,n=r==null?0:r.length,i=Array(n);++t<n;)i[t]=e(r[t],t,r);return i}var Pn=bP;var AP=Array.isArray,V=AP;var wP=1/0,ER=qt?qt.prototype:void 0,$R=ER?ER.toString:void 0;function NR(r){if(typeof r=="string")return r;if(V(r))return Pn(r,NR)+"";if(In(r))return $R?$R.call(r):"";var e=r+"";return e=="0"&&1/r==-wP?"-0":e}var _R=NR;var SP=/\s/;function CP(r){for(var e=r.length;e--&&SP.test(r.charAt(e)););return e}var IR=CP;var kP=/^\s+/;function EP(r){return r&&r.slice(0,IR(r)+1).replace(kP,"")}var PR=EP;function $P(r){var e=typeof r;return r!=null&&(e=="object"||e=="function")}var at=$P;var DR=0/0,NP=/^[-+]0x[0-9a-f]+$/i,_P=/^0b[01]+$/i,IP=/^0o[0-7]+$/i,PP=parseInt;function DP(r){if(typeof r=="number")return r;if(In(r))return DR;if(at(r)){var e=typeof r.valueOf=="function"?r.valueOf():r;r=at(e)?e+"":e}if(typeof r!="string")return r===0?r:+r;r=PR(r);var t=_P.test(r);return t||IP.test(r)?PP(r.slice(2),t?2:8):NP.test(r)?DR:+r}var OR=DP;var LR=1/0,OP=17976931348623157e292;function LP(r){if(!r)return r===0?r:0;if(r=OR(r),r===LR||r===-LR){var e=r<0?-1:1;return e*OP}return r===r?r:0}var MR=LP;function MP(r){var e=MR(r),t=e%1;return e===e?t?e-t:e:0}var Dn=MP;function FP(r){return r}var wr=FP;var qP="[object AsyncFunction]",UP="[object Function]",GP="[object GeneratorFunction]",jP="[object Proxy]";function HP(r){if(!at(r))return!1;var e=hr(r);return e==UP||e==GP||e==qP||e==jP}var gr=HP;var BP=$t["__core-js_shared__"],sf=BP;var FR=function(){var r=/[^.]+$/.exec(sf&&sf.keys&&sf.keys.IE_PROTO||"");return r?"Symbol(src)_1."+r:""}();function KP(r){return!!FR&&FR in r}var qR=KP;var WP=Function.prototype,VP=WP.toString;function zP(r){if(r!=null){try{return VP.call(r)}catch{}try{return r+""}catch{}}return""}var ui=zP;var XP=/[\\^$.*+?()[\]{}|]/g,YP=/^\[object .+?Constructor\]$/,JP=Function.prototype,QP=Object.prototype,ZP=JP.toString,e0=QP.hasOwnProperty,t0=RegExp("^"+ZP.call(e0).replace(XP,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function r0(r){if(!at(r)||qR(r))return!1;var e=gr(r)?t0:YP;return e.test(ui(r))}var UR=r0;function n0(r,e){return r?.[e]}var GR=n0;function i0(r,e){var t=GR(r,e);return UR(t)?t:void 0}var Sr=i0;var o0=Sr($t,"WeakMap"),af=o0;var jR=Object.create,s0=function(){function r(){}return function(e){if(!at(e))return{};if(jR)return jR(e);r.prototype=e;var t=new r;return r.prototype=void 0,t}}(),HR=s0;function a0(r,e,t){switch(t.length){case 0:return r.call(e);case 1:return r.call(e,t[0]);case 2:return r.call(e,t[0],t[1]);case 3:return r.call(e,t[0],t[1],t[2])}return r.apply(e,t)}var BR=a0;function c0(){}var ct=c0;function l0(r,e){var t=-1,n=r.length;for(e||(e=Array(n));++t<n;)e[t]=r[t];return e}var KR=l0;var u0=800,f0=16,d0=Date.now;function p0(r){var e=0,t=0;return function(){var n=d0(),i=f0-(n-t);if(t=n,i>0){if(++e>=u0)return arguments[0]}else e=0;return r.apply(void 0,arguments)}}var WR=p0;function m0(r){return function(){return r}}var VR=m0;var h0=function(){try{var r=Sr(Object,"defineProperty");return r({},"",{}),r}catch{}}(),Ds=h0;var g0=Ds?function(r,e){return Ds(r,"toString",{configurable:!0,enumerable:!1,value:VR(e),writable:!0})}:wr,zR=g0;var y0=WR(zR),XR=y0;function T0(r,e){for(var t=-1,n=r==null?0:r.length;++t<n&&e(r[t],t,r)!==!1;);return r}var cf=T0;function v0(r,e,t,n){for(var i=r.length,o=t+(n?1:-1);n?o--:++o<i;)if(e(r[o],o,r))return o;return-1}var lf=v0;function x0(r){return r!==r}var YR=x0;function R0(r,e,t){for(var n=t-1,i=r.length;++n<i;)if(r[n]===e)return n;return-1}var JR=R0;function b0(r,e,t){return e===e?JR(r,e,t):lf(r,YR,t)}var Os=b0;function A0(r,e){var t=r==null?0:r.length;return!!t&&Os(r,e,0)>-1}var uf=A0;var w0=9007199254740991,S0=/^(?:0|[1-9]\d*)$/;function C0(r,e){var t=typeof r;return e=e??w0,!!e&&(t=="number"||t!="symbol"&&S0.test(r))&&r>-1&&r%1==0&&r<e}var Mi=C0;function k0(r,e,t){e=="__proto__"&&Ds?Ds(r,e,{configurable:!0,enumerable:!0,value:t,writable:!0}):r[e]=t}var Ls=k0;function E0(r,e){return r===e||r!==r&&e!==e}var On=E0;var $0=Object.prototype,N0=$0.hasOwnProperty;function _0(r,e,t){var n=r[e];(!(N0.call(r,e)&&On(n,t))||t===void 0&&!(e in r))&&Ls(r,e,t)}var Fi=_0;function I0(r,e,t,n){var i=!t;t||(t={});for(var o=-1,s=e.length;++o<s;){var a=e[o],c=n?n(t[a],r[a],a,t,r):void 0;c===void 0&&(c=r[a]),i?Ls(t,a,c):Fi(t,a,c)}return t}var Ln=I0;var QR=Math.max;function P0(r,e,t){return e=QR(e===void 0?r.length-1:e,0),function(){for(var n=arguments,i=-1,o=QR(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=t(s),BR(r,this,a)}}var ZR=P0;function D0(r,e){return XR(ZR(r,e,wr),r+"")}var Ms=D0;var O0=9007199254740991;function L0(r){return typeof r=="number"&&r>-1&&r%1==0&&r<=O0}var Fs=L0;function M0(r){return r!=null&&Fs(r.length)&&!gr(r)}var Nt=M0;function F0(r,e,t){if(!at(t))return!1;var n=typeof e;return(n=="number"?Nt(t)&&Mi(e,t.length):n=="string"&&e in t)?On(t[e],r):!1}var qi=F0;function q0(r){return Ms(function(e,t){var n=-1,i=t.length,o=i>1?t[i-1]:void 0,s=i>2?t[2]:void 0;for(o=r.length>3&&typeof o=="function"?(i--,o):void 0,s&&qi(t[0],t[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=t[n];a&&r(e,a,n,o)}return e})}var eb=q0;var U0=Object.prototype;function G0(r){var e=r&&r.constructor,t=typeof e=="function"&&e.prototype||U0;return r===t}var Mn=G0;function j0(r,e){for(var t=-1,n=Array(r);++t<r;)n[t]=e(t);return n}var tb=j0;var H0="[object Arguments]";function B0(r){return yt(r)&&hr(r)==H0}var Hh=B0;var rb=Object.prototype,K0=rb.hasOwnProperty,W0=rb.propertyIsEnumerable,V0=Hh(function(){return arguments}())?Hh:function(r){return yt(r)&&K0.call(r,"callee")&&!W0.call(r,"callee")},Ui=V0;function z0(){return!1}var nb=z0;var sb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,ib=sb&&typeof module=="object"&&module&&!module.nodeType&&module,X0=ib&&ib.exports===sb,ob=X0?$t.Buffer:void 0,Y0=ob?ob.isBuffer:void 0,J0=Y0||nb,fi=J0;var Q0="[object Arguments]",Z0="[object Array]",eD="[object Boolean]",tD="[object Date]",rD="[object Error]",nD="[object Function]",iD="[object Map]",oD="[object Number]",sD="[object Object]",aD="[object RegExp]",cD="[object Set]",lD="[object String]",uD="[object WeakMap]",fD="[object ArrayBuffer]",dD="[object DataView]",pD="[object Float32Array]",mD="[object Float64Array]",hD="[object Int8Array]",gD="[object Int16Array]",yD="[object Int32Array]",TD="[object Uint8Array]",vD="[object Uint8ClampedArray]",xD="[object Uint16Array]",RD="[object Uint32Array]",Ye={};Ye[pD]=Ye[mD]=Ye[hD]=Ye[gD]=Ye[yD]=Ye[TD]=Ye[vD]=Ye[xD]=Ye[RD]=!0;Ye[Q0]=Ye[Z0]=Ye[fD]=Ye[eD]=Ye[dD]=Ye[tD]=Ye[rD]=Ye[nD]=Ye[iD]=Ye[oD]=Ye[sD]=Ye[aD]=Ye[cD]=Ye[lD]=Ye[uD]=!1;function bD(r){return yt(r)&&Fs(r.length)&&!!Ye[hr(r)]}var ab=bD;function AD(r){return function(e){return r(e)}}var Fn=AD;var cb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Ac=cb&&typeof module=="object"&&module&&!module.nodeType&&module,wD=Ac&&Ac.exports===cb,Bh=wD&&of.process,SD=function(){try{var r=Ac&&Ac.require&&Ac.require("util").types;return r||Bh&&Bh.binding&&Bh.binding("util")}catch{}}(),Qr=SD;var lb=Qr&&Qr.isTypedArray,CD=lb?Fn(lb):ab,qs=CD;var kD=Object.prototype,ED=kD.hasOwnProperty;function $D(r,e){var t=V(r),n=!t&&Ui(r),i=!t&&!n&&fi(r),o=!t&&!n&&!i&&qs(r),s=t||n||i||o,a=s?tb(r.length,String):[],c=a.length;for(var l in r)(e||ED.call(r,l))&&!(s&&(l=="length"||i&&(l=="offset"||l=="parent")||o&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||Mi(l,c)))&&a.push(l);return a}var ff=$D;function ND(r,e){return function(t){return r(e(t))}}var df=ND;var _D=df(Object.keys,Object),ub=_D;var ID=Object.prototype,PD=ID.hasOwnProperty;function DD(r){if(!Mn(r))return ub(r);var e=[];for(var t in Object(r))PD.call(r,t)&&t!="constructor"&&e.push(t);return e}var pf=DD;function OD(r){return Nt(r)?ff(r):pf(r)}var He=OD;var LD=Object.prototype,MD=LD.hasOwnProperty,FD=eb(function(r,e){if(Mn(e)||Nt(e)){Ln(e,He(e),r);return}for(var t in e)MD.call(e,t)&&Fi(r,t,e[t])}),Qt=FD;function qD(r){var e=[];if(r!=null)for(var t in Object(r))e.push(t);return e}var fb=qD;var UD=Object.prototype,GD=UD.hasOwnProperty;function jD(r){if(!at(r))return fb(r);var e=Mn(r),t=[];for(var n in r)n=="constructor"&&(e||!GD.call(r,n))||t.push(n);return t}var db=jD;function HD(r){return Nt(r)?ff(r,!0):db(r)}var Gi=HD;var BD=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,KD=/^\w*$/;function WD(r,e){if(V(r))return!1;var t=typeof r;return t=="number"||t=="symbol"||t=="boolean"||r==null||In(r)?!0:KD.test(r)||!BD.test(r)||e!=null&&r in Object(e)}var Us=WD;var VD=Sr(Object,"create"),di=VD;function zD(){this.__data__=di?di(null):{},this.size=0}var pb=zD;function XD(r){var e=this.has(r)&&delete this.__data__[r];return this.size-=e?1:0,e}var mb=XD;var YD="__lodash_hash_undefined__",JD=Object.prototype,QD=JD.hasOwnProperty;function ZD(r){var e=this.__data__;if(di){var t=e[r];return t===YD?void 0:t}return QD.call(e,r)?e[r]:void 0}var hb=ZD;var eO=Object.prototype,tO=eO.hasOwnProperty;function rO(r){var e=this.__data__;return di?e[r]!==void 0:tO.call(e,r)}var gb=rO;var nO="__lodash_hash_undefined__";function iO(r,e){var t=this.__data__;return this.size+=this.has(r)?0:1,t[r]=di&&e===void 0?nO:e,this}var yb=iO;function Gs(r){var e=-1,t=r==null?0:r.length;for(this.clear();++e<t;){var n=r[e];this.set(n[0],n[1])}}Gs.prototype.clear=pb;Gs.prototype.delete=mb;Gs.prototype.get=hb;Gs.prototype.has=gb;Gs.prototype.set=yb;var Kh=Gs;function oO(){this.__data__=[],this.size=0}var Tb=oO;function sO(r,e){for(var t=r.length;t--;)if(On(r[t][0],e))return t;return-1}var ji=sO;var aO=Array.prototype,cO=aO.splice;function lO(r){var e=this.__data__,t=ji(e,r);if(t<0)return!1;var n=e.length-1;return t==n?e.pop():cO.call(e,t,1),--this.size,!0}var vb=lO;function uO(r){var e=this.__data__,t=ji(e,r);return t<0?void 0:e[t][1]}var xb=uO;function fO(r){return ji(this.__data__,r)>-1}var Rb=fO;function dO(r,e){var t=this.__data__,n=ji(t,r);return n<0?(++this.size,t.push([r,e])):t[n][1]=e,this}var bb=dO;function js(r){var e=-1,t=r==null?0:r.length;for(this.clear();++e<t;){var n=r[e];this.set(n[0],n[1])}}js.prototype.clear=Tb;js.prototype.delete=vb;js.prototype.get=xb;js.prototype.has=Rb;js.prototype.set=bb;var Hi=js;var pO=Sr($t,"Map"),Bi=pO;function mO(){this.size=0,this.__data__={hash:new Kh,map:new(Bi||Hi),string:new Kh}}var Ab=mO;function hO(r){var e=typeof r;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?r!=="__proto__":r===null}var wb=hO;function gO(r,e){var t=r.__data__;return wb(e)?t[typeof e=="string"?"string":"hash"]:t.map}var Ki=gO;function yO(r){var e=Ki(this,r).delete(r);return this.size-=e?1:0,e}var Sb=yO;function TO(r){return Ki(this,r).get(r)}var Cb=TO;function vO(r){return Ki(this,r).has(r)}var kb=vO;function xO(r,e){var t=Ki(this,r),n=t.size;return t.set(r,e),this.size+=t.size==n?0:1,this}var Eb=xO;function Hs(r){var e=-1,t=r==null?0:r.length;for(this.clear();++e<t;){var n=r[e];this.set(n[0],n[1])}}Hs.prototype.clear=Ab;Hs.prototype.delete=Sb;Hs.prototype.get=Cb;Hs.prototype.has=kb;Hs.prototype.set=Eb;var ko=Hs;var RO="Expected a function";function Wh(r,e){if(typeof r!="function"||e!=null&&typeof e!="function")throw new TypeError(RO);var t=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=t.cache;if(o.has(i))return o.get(i);var s=r.apply(this,n);return t.cache=o.set(i,s)||o,s};return t.cache=new(Wh.Cache||ko),t}Wh.Cache=ko;var $b=Wh;var bO=500;function AO(r){var e=$b(r,function(n){return t.size===bO&&t.clear(),n}),t=e.cache;return e}var Nb=AO;var wO=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,SO=/\\(\\)?/g,CO=Nb(function(r){var e=[];return r.charCodeAt(0)===46&&e.push(""),r.replace(wO,function(t,n,i,o){e.push(i?o.replace(SO,"$1"):n||t)}),e}),_b=CO;function kO(r){return r==null?"":_R(r)}var Ib=kO;function EO(r,e){return V(r)?r:Us(r,e)?[r]:_b(Ib(r))}var Wi=EO;var $O=1/0;function NO(r){if(typeof r=="string"||In(r))return r;var e=r+"";return e=="0"&&1/r==-$O?"-0":e}var qn=NO;function _O(r,e){e=Wi(e,r);for(var t=0,n=e.length;r!=null&&t<n;)r=r[qn(e[t++])];return t&&t==n?r:void 0}var Bs=_O;function IO(r,e,t){var n=r==null?void 0:Bs(r,e);return n===void 0?t:n}var Pb=IO;function PO(r,e){for(var t=-1,n=e.length,i=r.length;++t<n;)r[i+t]=e[t];return r}var Ks=PO;var Db=qt?qt.isConcatSpreadable:void 0;function DO(r){return V(r)||Ui(r)||!!(Db&&r&&r[Db])}var Ob=DO;function Lb(r,e,t,n,i){var o=-1,s=r.length;for(t||(t=Ob),i||(i=[]);++o<s;){var a=r[o];e>0&&t(a)?e>1?Lb(a,e-1,t,n,i):Ks(i,a):n||(i[i.length]=a)}return i}var Ws=Lb;function OO(r){var e=r==null?0:r.length;return e?Ws(r,1):[]}var Tt=OO;var LO=df(Object.getPrototypeOf,Object),mf=LO;function MO(r,e,t){var n=-1,i=r.length;e<0&&(e=-e>i?0:i+e),t=t>i?i:t,t<0&&(t+=i),i=e>t?0:t-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=r[n+e];return o}var hf=MO;function FO(r,e,t,n){var i=-1,o=r==null?0:r.length;for(n&&o&&(t=r[++i]);++i<o;)t=e(t,r[i],i,r);return t}var Mb=FO;function qO(){this.__data__=new Hi,this.size=0}var Fb=qO;function UO(r){var e=this.__data__,t=e.delete(r);return this.size=e.size,t}var qb=UO;function GO(r){return this.__data__.get(r)}var Ub=GO;function jO(r){return this.__data__.has(r)}var Gb=jO;var HO=200;function BO(r,e){var t=this.__data__;if(t instanceof Hi){var n=t.__data__;if(!Bi||n.length<HO-1)return n.push([r,e]),this.size=++t.size,this;t=this.__data__=new ko(n)}return t.set(r,e),this.size=t.size,this}var jb=BO;function Vs(r){var e=this.__data__=new Hi(r);this.size=e.size}Vs.prototype.clear=Fb;Vs.prototype.delete=qb;Vs.prototype.get=Ub;Vs.prototype.has=Gb;Vs.prototype.set=jb;var Vi=Vs;function KO(r,e){return r&&Ln(e,He(e),r)}var Hb=KO;function WO(r,e){return r&&Ln(e,Gi(e),r)}var Bb=WO;var zb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Kb=zb&&typeof module=="object"&&module&&!module.nodeType&&module,VO=Kb&&Kb.exports===zb,Wb=VO?$t.Buffer:void 0,Vb=Wb?Wb.allocUnsafe:void 0;function zO(r,e){if(e)return r.slice();var t=r.length,n=Vb?Vb(t):new r.constructor(t);return r.copy(n),n}var Xb=zO;function XO(r,e){for(var t=-1,n=r==null?0:r.length,i=0,o=[];++t<n;){var s=r[t];e(s,t,r)&&(o[i++]=s)}return o}var zs=XO;function YO(){return[]}var gf=YO;var JO=Object.prototype,QO=JO.propertyIsEnumerable,Yb=Object.getOwnPropertySymbols,ZO=Yb?function(r){return r==null?[]:(r=Object(r),zs(Yb(r),function(e){return QO.call(r,e)}))}:gf,Xs=ZO;function eL(r,e){return Ln(r,Xs(r),e)}var Jb=eL;var tL=Object.getOwnPropertySymbols,rL=tL?function(r){for(var e=[];r;)Ks(e,Xs(r)),r=mf(r);return e}:gf,yf=rL;function nL(r,e){return Ln(r,yf(r),e)}var Qb=nL;function iL(r,e,t){var n=e(r);return V(r)?n:Ks(n,t(r))}var Tf=iL;function oL(r){return Tf(r,He,Xs)}var wc=oL;function sL(r){return Tf(r,Gi,yf)}var vf=sL;var aL=Sr($t,"DataView"),xf=aL;var cL=Sr($t,"Promise"),Rf=cL;var lL=Sr($t,"Set"),zi=lL;var Zb="[object Map]",uL="[object Object]",eA="[object Promise]",tA="[object Set]",rA="[object WeakMap]",nA="[object DataView]",fL=ui(xf),dL=ui(Bi),pL=ui(Rf),mL=ui(zi),hL=ui(af),Eo=hr;(xf&&Eo(new xf(new ArrayBuffer(1)))!=nA||Bi&&Eo(new Bi)!=Zb||Rf&&Eo(Rf.resolve())!=eA||zi&&Eo(new zi)!=tA||af&&Eo(new af)!=rA)&&(Eo=function(r){var e=hr(r),t=e==uL?r.constructor:void 0,n=t?ui(t):"";if(n)switch(n){case fL:return nA;case dL:return Zb;case pL:return eA;case mL:return tA;case hL:return rA}return e});var yn=Eo;var gL=Object.prototype,yL=gL.hasOwnProperty;function TL(r){var e=r.length,t=new r.constructor(e);return e&&typeof r[0]=="string"&&yL.call(r,"index")&&(t.index=r.index,t.input=r.input),t}var iA=TL;var vL=$t.Uint8Array,Ys=vL;function xL(r){var e=new r.constructor(r.byteLength);return new Ys(e).set(new Ys(r)),e}var Js=xL;function RL(r,e){var t=e?Js(r.buffer):r.buffer;return new r.constructor(t,r.byteOffset,r.byteLength)}var oA=RL;var bL=/\w*$/;function AL(r){var e=new r.constructor(r.source,bL.exec(r));return e.lastIndex=r.lastIndex,e}var sA=AL;var aA=qt?qt.prototype:void 0,cA=aA?aA.valueOf:void 0;function wL(r){return cA?Object(cA.call(r)):{}}var lA=wL;function SL(r,e){var t=e?Js(r.buffer):r.buffer;return new r.constructor(t,r.byteOffset,r.length)}var uA=SL;var CL="[object Boolean]",kL="[object Date]",EL="[object Map]",$L="[object Number]",NL="[object RegExp]",_L="[object Set]",IL="[object String]",PL="[object Symbol]",DL="[object ArrayBuffer]",OL="[object DataView]",LL="[object Float32Array]",ML="[object Float64Array]",FL="[object Int8Array]",qL="[object Int16Array]",UL="[object Int32Array]",GL="[object Uint8Array]",jL="[object Uint8ClampedArray]",HL="[object Uint16Array]",BL="[object Uint32Array]";function KL(r,e,t){var n=r.constructor;switch(e){case DL:return Js(r);case CL:case kL:return new n(+r);case OL:return oA(r,t);case LL:case ML:case FL:case qL:case UL:case GL:case jL:case HL:case BL:return uA(r,t);case EL:return new n;case $L:case IL:return new n(r);case NL:return sA(r);case _L:return new n;case PL:return lA(r)}}var fA=KL;function WL(r){return typeof r.constructor=="function"&&!Mn(r)?HR(mf(r)):{}}var dA=WL;var VL="[object Map]";function zL(r){return yt(r)&&yn(r)==VL}var pA=zL;var mA=Qr&&Qr.isMap,XL=mA?Fn(mA):pA,hA=XL;var YL="[object Set]";function JL(r){return yt(r)&&yn(r)==YL}var gA=JL;var yA=Qr&&Qr.isSet,QL=yA?Fn(yA):gA,TA=QL;var ZL=1,eM=2,tM=4,vA="[object Arguments]",rM="[object Array]",nM="[object Boolean]",iM="[object Date]",oM="[object Error]",xA="[object Function]",sM="[object GeneratorFunction]",aM="[object Map]",cM="[object Number]",RA="[object Object]",lM="[object RegExp]",uM="[object Set]",fM="[object String]",dM="[object Symbol]",pM="[object WeakMap]",mM="[object ArrayBuffer]",hM="[object DataView]",gM="[object Float32Array]",yM="[object Float64Array]",TM="[object Int8Array]",vM="[object Int16Array]",xM="[object Int32Array]",RM="[object Uint8Array]",bM="[object Uint8ClampedArray]",AM="[object Uint16Array]",wM="[object Uint32Array]",Be={};Be[vA]=Be[rM]=Be[mM]=Be[hM]=Be[nM]=Be[iM]=Be[gM]=Be[yM]=Be[TM]=Be[vM]=Be[xM]=Be[aM]=Be[cM]=Be[RA]=Be[lM]=Be[uM]=Be[fM]=Be[dM]=Be[RM]=Be[bM]=Be[AM]=Be[wM]=!0;Be[oM]=Be[xA]=Be[pM]=!1;function bf(r,e,t,n,i,o){var s,a=e&ZL,c=e&eM,l=e&tM;if(t&&(s=i?t(r,n,i,o):t(r)),s!==void 0)return s;if(!at(r))return r;var u=V(r);if(u){if(s=iA(r),!a)return KR(r,s)}else{var f=yn(r),m=f==xA||f==sM;if(fi(r))return Xb(r,a);if(f==RA||f==vA||m&&!i){if(s=c||m?{}:dA(r),!a)return c?Qb(r,Bb(s,r)):Jb(r,Hb(s,r))}else{if(!Be[f])return i?r:{};s=fA(r,f,a)}}o||(o=new Vi);var T=o.get(r);if(T)return T;o.set(r,s),TA(r)?r.forEach(function(N){s.add(bf(N,e,t,N,r,o))}):hA(r)&&r.forEach(function(N,C){s.set(C,bf(N,e,t,C,r,o))});var A=l?c?vf:wc:c?Gi:He,S=u?void 0:A(r);return cf(S||r,function(N,C){S&&(C=N,N=r[C]),Fi(s,C,bf(N,e,t,C,r,o))}),s}var bA=bf;var SM=4;function CM(r){return bA(r,SM)}var Ke=CM;function kM(r){for(var e=-1,t=r==null?0:r.length,n=0,i=[];++e<t;){var o=r[e];o&&(i[n++]=o)}return i}var Un=kM;var EM="__lodash_hash_undefined__";function $M(r){return this.__data__.set(r,EM),this}var AA=$M;function NM(r){return this.__data__.has(r)}var wA=NM;function Af(r){var e=-1,t=r==null?0:r.length;for(this.__data__=new ko;++e<t;)this.add(r[e])}Af.prototype.add=Af.prototype.push=AA;Af.prototype.has=wA;var Qs=Af;function _M(r,e){for(var t=-1,n=r==null?0:r.length;++t<n;)if(e(r[t],t,r))return!0;return!1}var wf=_M;function IM(r,e){return r.has(e)}var Zs=IM;var PM=1,DM=2;function OM(r,e,t,n,i,o){var s=t&PM,a=r.length,c=e.length;if(a!=c&&!(s&&c>a))return!1;var l=o.get(r),u=o.get(e);if(l&&u)return l==e&&u==r;var f=-1,m=!0,T=t&DM?new Qs:void 0;for(o.set(r,e),o.set(e,r);++f<a;){var A=r[f],S=e[f];if(n)var N=s?n(S,A,f,e,r,o):n(A,S,f,r,e,o);if(N!==void 0){if(N)continue;m=!1;break}if(T){if(!wf(e,function(C,v){if(!Zs(T,v)&&(A===C||i(A,C,t,n,o)))return T.push(v)})){m=!1;break}}else if(!(A===S||i(A,S,t,n,o))){m=!1;break}}return o.delete(r),o.delete(e),m}var Sf=OM;function LM(r){var e=-1,t=Array(r.size);return r.forEach(function(n,i){t[++e]=[i,n]}),t}var SA=LM;function MM(r){var e=-1,t=Array(r.size);return r.forEach(function(n){t[++e]=n}),t}var ea=MM;var FM=1,qM=2,UM="[object Boolean]",GM="[object Date]",jM="[object Error]",HM="[object Map]",BM="[object Number]",KM="[object RegExp]",WM="[object Set]",VM="[object String]",zM="[object Symbol]",XM="[object ArrayBuffer]",YM="[object DataView]",CA=qt?qt.prototype:void 0,Vh=CA?CA.valueOf:void 0;function JM(r,e,t,n,i,o,s){switch(t){case YM:if(r.byteLength!=e.byteLength||r.byteOffset!=e.byteOffset)return!1;r=r.buffer,e=e.buffer;case XM:return!(r.byteLength!=e.byteLength||!o(new Ys(r),new Ys(e)));case UM:case GM:case BM:return On(+r,+e);case jM:return r.name==e.name&&r.message==e.message;case KM:case VM:return r==e+"";case HM:var a=SA;case WM:var c=n&FM;if(a||(a=ea),r.size!=e.size&&!c)return!1;var l=s.get(r);if(l)return l==e;n|=qM,s.set(r,e);var u=Sf(a(r),a(e),n,i,o,s);return s.delete(r),u;case zM:if(Vh)return Vh.call(r)==Vh.call(e)}return!1}var kA=JM;var QM=1,ZM=Object.prototype,e1=ZM.hasOwnProperty;function t1(r,e,t,n,i,o){var s=t&QM,a=wc(r),c=a.length,l=wc(e),u=l.length;if(c!=u&&!s)return!1;for(var f=c;f--;){var m=a[f];if(!(s?m in e:e1.call(e,m)))return!1}var T=o.get(r),A=o.get(e);if(T&&A)return T==e&&A==r;var S=!0;o.set(r,e),o.set(e,r);for(var N=s;++f<c;){m=a[f];var C=r[m],v=e[m];if(n)var y=s?n(v,C,m,e,r,o):n(C,v,m,r,e,o);if(!(y===void 0?C===v||i(C,v,t,n,o):y)){S=!1;break}N||(N=m=="constructor")}if(S&&!N){var $=r.constructor,D=e.constructor;$!=D&&"constructor"in r&&"constructor"in e&&!(typeof $=="function"&&$ instanceof $&&typeof D=="function"&&D instanceof D)&&(S=!1)}return o.delete(r),o.delete(e),S}var EA=t1;var r1=1,$A="[object Arguments]",NA="[object Array]",Cf="[object Object]",n1=Object.prototype,_A=n1.hasOwnProperty;function i1(r,e,t,n,i,o){var s=V(r),a=V(e),c=s?NA:yn(r),l=a?NA:yn(e);c=c==$A?Cf:c,l=l==$A?Cf:l;var u=c==Cf,f=l==Cf,m=c==l;if(m&&fi(r)){if(!fi(e))return!1;s=!0,u=!1}if(m&&!u)return o||(o=new Vi),s||qs(r)?Sf(r,e,t,n,i,o):kA(r,e,c,t,n,i,o);if(!(t&r1)){var T=u&&_A.call(r,"__wrapped__"),A=f&&_A.call(e,"__wrapped__");if(T||A){var S=T?r.value():r,N=A?e.value():e;return o||(o=new Vi),i(S,N,t,n,o)}}return m?(o||(o=new Vi),EA(r,e,t,n,i,o)):!1}var IA=i1;function PA(r,e,t,n,i){return r===e?!0:r==null||e==null||!yt(r)&&!yt(e)?r!==r&&e!==e:IA(r,e,t,n,PA,i)}var kf=PA;var o1=1,s1=2;function a1(r,e,t,n){var i=t.length,o=i,s=!n;if(r==null)return!o;for(r=Object(r);i--;){var a=t[i];if(s&&a[2]?a[1]!==r[a[0]]:!(a[0]in r))return!1}for(;++i<o;){a=t[i];var c=a[0],l=r[c],u=a[1];if(s&&a[2]){if(l===void 0&&!(c in r))return!1}else{var f=new Vi;if(n)var m=n(l,u,c,r,e,f);if(!(m===void 0?kf(u,l,o1|s1,n,f):m))return!1}}return!0}var DA=a1;function c1(r){return r===r&&!at(r)}var Ef=c1;function l1(r){for(var e=He(r),t=e.length;t--;){var n=e[t],i=r[n];e[t]=[n,i,Ef(i)]}return e}var OA=l1;function u1(r,e){return function(t){return t==null?!1:t[r]===e&&(e!==void 0||r in Object(t))}}var $f=u1;function f1(r){var e=OA(r);return e.length==1&&e[0][2]?$f(e[0][0],e[0][1]):function(t){return t===r||DA(t,r,e)}}var LA=f1;function d1(r,e){return r!=null&&e in Object(r)}var MA=d1;function p1(r,e,t){e=Wi(e,r);for(var n=-1,i=e.length,o=!1;++n<i;){var s=qn(e[n]);if(!(o=r!=null&&t(r,s)))break;r=r[s]}return o||++n!=i?o:(i=r==null?0:r.length,!!i&&Fs(i)&&Mi(s,i)&&(V(r)||Ui(r)))}var Nf=p1;function m1(r,e){return r!=null&&Nf(r,e,MA)}var FA=m1;var h1=1,g1=2;function y1(r,e){return Us(r)&&Ef(e)?$f(qn(r),e):function(t){var n=Pb(t,r);return n===void 0&&n===e?FA(t,r):kf(e,n,h1|g1)}}var qA=y1;function T1(r){return function(e){return e?.[r]}}var UA=T1;function v1(r){return function(e){return Bs(e,r)}}var GA=v1;function x1(r){return Us(r)?UA(qn(r)):GA(r)}var jA=x1;function R1(r){return typeof r=="function"?r:r==null?wr:typeof r=="object"?V(r)?qA(r[0],r[1]):LA(r):jA(r)}var mt=R1;function b1(r,e,t,n){for(var i=-1,o=r==null?0:r.length;++i<o;){var s=r[i];e(n,s,t(s),r)}return n}var HA=b1;function A1(r){return function(e,t,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var c=s[r?a:++i];if(t(o[c],c,o)===!1)break}return e}}var BA=A1;var w1=BA(),KA=w1;function S1(r,e){return r&&KA(r,e,He)}var WA=S1;function C1(r,e){return function(t,n){if(t==null)return t;if(!Nt(t))return r(t,n);for(var i=t.length,o=e?i:-1,s=Object(t);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return t}}var VA=C1;var k1=VA(WA),Cr=k1;function E1(r,e,t,n){return Cr(r,function(i,o,s){e(n,i,t(i),s)}),n}var zA=E1;function $1(r,e){return function(t,n){var i=V(t)?HA:zA,o=e?e():{};return i(t,r,mt(n,2),o)}}var XA=$1;var YA=Object.prototype,N1=YA.hasOwnProperty,_1=Ms(function(r,e){r=Object(r);var t=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&qi(e[0],e[1],i)&&(n=1);++t<n;)for(var o=e[t],s=Gi(o),a=-1,c=s.length;++a<c;){var l=s[a],u=r[l];(u===void 0||On(u,YA[l])&&!N1.call(r,l))&&(r[l]=o[l])}return r}),ta=_1;function I1(r){return yt(r)&&Nt(r)}var zh=I1;function P1(r,e,t){for(var n=-1,i=r==null?0:r.length;++n<i;)if(t(e,r[n]))return!0;return!1}var _f=P1;var D1=200;function O1(r,e,t,n){var i=-1,o=uf,s=!0,a=r.length,c=[],l=e.length;if(!a)return c;t&&(e=Pn(e,Fn(t))),n?(o=_f,s=!1):e.length>=D1&&(o=Zs,s=!1,e=new Qs(e));e:for(;++i<a;){var u=r[i],f=t==null?u:t(u);if(u=n||u!==0?u:0,s&&f===f){for(var m=l;m--;)if(e[m]===f)continue e;c.push(u)}else o(e,f,n)||c.push(u)}return c}var JA=O1;var L1=Ms(function(r,e){return zh(r)?JA(r,Ws(e,1,zh,!0)):[]}),Xi=L1;function M1(r){var e=r==null?0:r.length;return e?r[e-1]:void 0}var Gn=M1;function F1(r,e,t){var n=r==null?0:r.length;return n?(e=t||e===void 0?1:Dn(e),hf(r,e<0?0:e,n)):[]}var vt=F1;function q1(r,e,t){var n=r==null?0:r.length;return n?(e=t||e===void 0?1:Dn(e),e=n-e,hf(r,0,e<0?0:e)):[]}var pi=q1;function U1(r){return typeof r=="function"?r:wr}var QA=U1;function G1(r,e){var t=V(r)?cf:Cr;return t(r,QA(e))}var G=G1;function j1(r,e){for(var t=-1,n=r==null?0:r.length;++t<n;)if(!e(r[t],t,r))return!1;return!0}var ZA=j1;function H1(r,e){var t=!0;return Cr(r,function(n,i,o){return t=!!e(n,i,o),t}),t}var ew=H1;function B1(r,e,t){var n=V(r)?ZA:ew;return t&&qi(r,e,t)&&(e=void 0),n(r,mt(e,3))}var cr=B1;function K1(r,e){var t=[];return Cr(r,function(n,i,o){e(n,i,o)&&t.push(n)}),t}var If=K1;function W1(r,e){var t=V(r)?zs:If;return t(r,mt(e,3))}var Ut=W1;function V1(r){return function(e,t,n){var i=Object(e);if(!Nt(e)){var o=mt(t,3);e=He(e),t=function(a){return o(i[a],a,i)}}var s=r(e,t,n);return s>-1?i[o?e[s]:s]:void 0}}var tw=V1;var z1=Math.max;function X1(r,e,t){var n=r==null?0:r.length;if(!n)return-1;var i=t==null?0:Dn(t);return i<0&&(i=z1(n+i,0)),lf(r,mt(e,3),i)}var rw=X1;var Y1=tw(rw),jn=Y1;function J1(r){return r&&r.length?r[0]:void 0}var Gt=J1;function Q1(r,e){var t=-1,n=Nt(r)?Array(r.length):[];return Cr(r,function(i,o,s){n[++t]=e(i,o,s)}),n}var nw=Q1;function Z1(r,e){var t=V(r)?Pn:nw;return t(r,mt(e,3))}var L=Z1;function eF(r,e){return Ws(L(r,e),1)}var Zt=eF;var tF=Object.prototype,rF=tF.hasOwnProperty,nF=XA(function(r,e,t){rF.call(r,t)?r[t].push(e):Ls(r,t,[e])}),Xh=nF;var iF=Object.prototype,oF=iF.hasOwnProperty;function sF(r,e){return r!=null&&oF.call(r,e)}var iw=sF;function aF(r,e){return r!=null&&Nf(r,e,iw)}var K=aF;var cF="[object String]";function lF(r){return typeof r=="string"||!V(r)&&yt(r)&&hr(r)==cF}var Ot=lF;function uF(r,e){return Pn(e,function(t){return r[t]})}var ow=uF;function fF(r){return r==null?[]:ow(r,He(r))}var Pe=fF;var dF=Math.max;function pF(r,e,t,n){r=Nt(r)?r:Pe(r),t=t&&!n?Dn(t):0;var i=r.length;return t<0&&(t=dF(i+t,0)),Ot(r)?t<=i&&r.indexOf(e,t)>-1:!!i&&Os(r,e,t)>-1}var et=pF;var mF=Math.max;function hF(r,e,t){var n=r==null?0:r.length;if(!n)return-1;var i=t==null?0:Dn(t);return i<0&&(i=mF(n+i,0)),Os(r,e,i)}var Pf=hF;var gF="[object Map]",yF="[object Set]",TF=Object.prototype,vF=TF.hasOwnProperty;function xF(r){if(r==null)return!0;if(Nt(r)&&(V(r)||typeof r=="string"||typeof r.splice=="function"||fi(r)||qs(r)||Ui(r)))return!r.length;var e=yn(r);if(e==gF||e==yF)return!r.size;if(Mn(r))return!pf(r).length;for(var t in r)if(vF.call(r,t))return!1;return!0}var se=xF;var RF="[object RegExp]";function bF(r){return yt(r)&&hr(r)==RF}var sw=bF;var aw=Qr&&Qr.isRegExp,AF=aw?Fn(aw):sw,Zr=AF;function wF(r){return r===void 0}var lr=wF;function SF(r,e){return r<e}var cw=SF;function CF(r,e,t){for(var n=-1,i=r.length;++n<i;){var o=r[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!In(s):t(s,a)))var a=s,c=o}return c}var lw=CF;function kF(r){return r&&r.length?lw(r,wr,cw):void 0}var uw=kF;var EF="Expected a function";function $F(r){if(typeof r!="function")throw new TypeError(EF);return function(){var e=arguments;switch(e.length){case 0:return!r.call(this);case 1:return!r.call(this,e[0]);case 2:return!r.call(this,e[0],e[1]);case 3:return!r.call(this,e[0],e[1],e[2])}return!r.apply(this,e)}}var fw=$F;function NF(r,e,t,n){if(!at(r))return r;e=Wi(e,r);for(var i=-1,o=e.length,s=o-1,a=r;a!=null&&++i<o;){var c=qn(e[i]),l=t;if(c==="__proto__"||c==="constructor"||c==="prototype")return r;if(i!=s){var u=a[c];l=n?n(u,c,a):void 0,l===void 0&&(l=at(u)?u:Mi(e[i+1])?[]:{})}Fi(a,c,l),a=a[c]}return r}var dw=NF;function _F(r,e,t){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=Bs(r,s);t(a,s)&&dw(o,Wi(s,r),a)}return o}var pw=_F;function IF(r,e){if(r==null)return{};var t=Pn(vf(r),function(n){return[n]});return e=mt(e),pw(r,t,function(n,i){return e(n,i[0])})}var kr=IF;function PF(r,e,t,n,i){return i(r,function(o,s,a){t=n?(n=!1,o):e(t,o,s,a)}),t}var mw=PF;function DF(r,e,t){var n=V(r)?Mb:mw,i=arguments.length<3;return n(r,mt(e,4),t,i,Cr)}var lt=DF;function OF(r,e){var t=V(r)?zs:If;return t(r,fw(mt(e,3)))}var Yi=OF;function LF(r,e){var t;return Cr(r,function(n,i,o){return t=e(n,i,o),!t}),!!t}var hw=LF;function MF(r,e,t){var n=V(r)?wf:hw;return t&&qi(r,e,t)&&(e=void 0),n(r,mt(e,3))}var Sc=MF;var FF=1/0,qF=zi&&1/ea(new zi([,-0]))[1]==FF?function(r){return new zi(r)}:ct,gw=qF;var UF=200;function GF(r,e,t){var n=-1,i=uf,o=r.length,s=!0,a=[],c=a;if(t)s=!1,i=_f;else if(o>=UF){var l=e?null:gw(r);if(l)return ea(l);s=!1,i=Zs,c=new Qs}else c=e?[]:a;e:for(;++n<o;){var u=r[n],f=e?e(u):u;if(u=t||u!==0?u:0,s&&f===f){for(var m=c.length;m--;)if(c[m]===f)continue e;e&&c.push(f),a.push(u)}else i(c,f,t)||(c!==a&&c.push(f),a.push(u))}return a}var Df=GF;function jF(r){return r&&r.length?Df(r):[]}var ra=jF;function HF(r,e){return r&&r.length?Df(r,mt(e,2)):[]}var yw=HF;function na(r){console&&console.error&&console.error(`Error: ${r}`)}function Cc(r){console&&console.warn&&console.warn(`Warning: ${r}`)}function kc(r){let e=new Date().getTime(),t=r();return{time:new Date().getTime()-e,value:t}}function Ec(r){function e(){}e.prototype=r;let t=new e;function n(){return typeof t.bar}return n(),n(),r;(0,eval)(r)}function BF(r){return KF(r)?r.LABEL:r.name}function KF(r){return Ot(r.LABEL)&&r.LABEL!==""}var Ur=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),G(this.definition,t=>{t.accept(e)})}},Ce=class extends Ur{constructor(e){super([]),this.idx=1,Qt(this,kr(e,t=>t!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},yr=class extends Ur{constructor(e){super(e.definition),this.orgText="",Qt(this,kr(e,t=>t!==void 0))}},We=class extends Ur{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Qt(this,kr(e,t=>t!==void 0))}},ke=class extends Ur{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,t=>t!==void 0))}},Ve=class extends Ur{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,t=>t!==void 0))}},ze=class extends Ur{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,t=>t!==void 0))}},pe=class extends Ur{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,t=>t!==void 0))}},Me=class extends Ur{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,t=>t!==void 0))}},Fe=class extends Ur{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Qt(this,kr(e,t=>t!==void 0))}},ae=class{constructor(e){this.idx=1,Qt(this,kr(e,t=>t!==void 0))}accept(e){e.visit(this)}};function Of(r){return L(r,ia)}function ia(r){function e(t){return L(t,ia)}if(r instanceof Ce){let t={type:"NonTerminal",name:r.nonTerminalName,idx:r.idx};return Ot(r.label)&&(t.label=r.label),t}else{if(r instanceof We)return{type:"Alternative",definition:e(r.definition)};if(r instanceof ke)return{type:"Option",idx:r.idx,definition:e(r.definition)};if(r instanceof Ve)return{type:"RepetitionMandatory",idx:r.idx,definition:e(r.definition)};if(r instanceof ze)return{type:"RepetitionMandatoryWithSeparator",idx:r.idx,separator:ia(new ae({terminalType:r.separator})),definition:e(r.definition)};if(r instanceof Me)return{type:"RepetitionWithSeparator",idx:r.idx,separator:ia(new ae({terminalType:r.separator})),definition:e(r.definition)};if(r instanceof pe)return{type:"Repetition",idx:r.idx,definition:e(r.definition)};if(r instanceof Fe)return{type:"Alternation",idx:r.idx,definition:e(r.definition)};if(r instanceof ae){let t={type:"Terminal",name:r.terminalType.name,label:BF(r.terminalType),idx:r.idx};Ot(r.label)&&(t.terminalLabel=r.label);let n=r.terminalType.PATTERN;return r.terminalType.PATTERN&&(t.pattern=Zr(n)?n.source:n),t}else{if(r instanceof yr)return{type:"Rule",name:r.name,orgText:r.orgText,definition:e(r.definition)};throw Error("non exhaustive match")}}}var Tr=class{visit(e){let t=e;switch(t.constructor){case Ce:return this.visitNonTerminal(t);case We:return this.visitAlternative(t);case ke:return this.visitOption(t);case Ve:return this.visitRepetitionMandatory(t);case ze:return this.visitRepetitionMandatoryWithSeparator(t);case Me:return this.visitRepetitionWithSeparator(t);case pe:return this.visitRepetition(t);case Fe:return this.visitAlternation(t);case ae:return this.visitTerminal(t);case yr:return this.visitRule(t);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function Yh(r){return r instanceof We||r instanceof ke||r instanceof pe||r instanceof Ve||r instanceof ze||r instanceof Me||r instanceof ae||r instanceof yr}function $o(r,e=[]){return r instanceof ke||r instanceof pe||r instanceof Me?!0:r instanceof Fe?Sc(r.definition,n=>$o(n,e)):r instanceof Ce&&et(e,r)?!1:r instanceof Ur?(r instanceof Ce&&e.push(r),cr(r.definition,n=>$o(n,e))):!1}function Jh(r){return r instanceof Fe}function Er(r){if(r instanceof Ce)return"SUBRULE";if(r instanceof ke)return"OPTION";if(r instanceof Fe)return"OR";if(r instanceof Ve)return"AT_LEAST_ONE";if(r instanceof ze)return"AT_LEAST_ONE_SEP";if(r instanceof Me)return"MANY_SEP";if(r instanceof pe)return"MANY";if(r instanceof ae)return"CONSUME";throw Error("non exhaustive match")}var mi=class{walk(e,t=[]){G(e.definition,(n,i)=>{let o=vt(e.definition,i+1);if(n instanceof Ce)this.walkProdRef(n,o,t);else if(n instanceof ae)this.walkTerminal(n,o,t);else if(n instanceof We)this.walkFlat(n,o,t);else if(n instanceof ke)this.walkOption(n,o,t);else if(n instanceof Ve)this.walkAtLeastOne(n,o,t);else if(n instanceof ze)this.walkAtLeastOneSep(n,o,t);else if(n instanceof Me)this.walkManySep(n,o,t);else if(n instanceof pe)this.walkMany(n,o,t);else if(n instanceof Fe)this.walkOr(n,o,t);else throw Error("non exhaustive match")})}walkTerminal(e,t,n){}walkProdRef(e,t,n){}walkFlat(e,t,n){let i=t.concat(n);this.walk(e,i)}walkOption(e,t,n){let i=t.concat(n);this.walk(e,i)}walkAtLeastOne(e,t,n){let i=[new ke({definition:e.definition})].concat(t,n);this.walk(e,i)}walkAtLeastOneSep(e,t,n){let i=Tw(e,t,n);this.walk(e,i)}walkMany(e,t,n){let i=[new ke({definition:e.definition})].concat(t,n);this.walk(e,i)}walkManySep(e,t,n){let i=Tw(e,t,n);this.walk(e,i)}walkOr(e,t,n){let i=t.concat(n);G(e.definition,o=>{let s=new We({definition:[o]});this.walk(s,i)})}};function Tw(r,e,t){return[new ke({definition:[new ae({terminalType:r.separator})].concat(r.definition)})].concat(e,t)}function No(r){if(r instanceof Ce)return No(r.referencedRule);if(r instanceof ae)return zF(r);if(Yh(r))return WF(r);if(Jh(r))return VF(r);throw Error("non exhaustive match")}function WF(r){let e=[],t=r.definition,n=0,i=t.length>n,o,s=!0;for(;i&&s;)o=t[n],s=$o(o),e=e.concat(No(o)),n=n+1,i=t.length>n;return ra(e)}function VF(r){let e=L(r.definition,t=>No(t));return ra(Tt(e))}function zF(r){return[r.terminalType]}var Lf="_~IN~_";var Qh=class extends mi{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,t,n){}walkProdRef(e,t,n){let i=XF(e.referencedRule,e.idx)+this.topProd.name,o=t.concat(n),s=new We({definition:o}),a=No(s);this.follows[i]=a}};function vw(r){let e={};return G(r,t=>{let n=new Qh(t).startWalking();Qt(e,n)}),e}function XF(r,e){return r.name+e+Lf}var Mf={},YF=new Ro;function oa(r){let e=r.toString();if(Mf.hasOwnProperty(e))return Mf[e];{let t=YF.pattern(e);return Mf[e]=t,t}}function xw(){Mf={}}var bw="Complement Sets are not supported for first char optimization",$c=`Unable to use "first char" lexer optimizations:
`;function Aw(r,e=!1){try{let t=oa(r);return Zh(t.value,{},t.flags.ignoreCase)}catch(t){if(t.message===bw)e&&Cc(`${$c}	Unable to optimize: < ${r.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),na(`${$c}
	Failed parsing: < ${r.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function Zh(r,e,t){switch(r.type){case"Disjunction":for(let i=0;i<r.value.length;i++)Zh(r.value[i],e,t);break;case"Alternative":let n=r.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":Ff(s.value,e,t);break;case"Set":if(s.complement===!0)throw Error(bw);G(s.value,c=>{if(typeof c=="number")Ff(c,e,t);else{let l=c;if(t===!0)for(let u=l.from;u<=l.to;u++)Ff(u,e,t);else{for(let u=l.from;u<=l.to&&u<sa;u++)Ff(u,e,t);if(l.to>=sa){let u=l.from>=sa?l.from:sa,f=l.to,m=Hn(u),T=Hn(f);for(let A=m;A<=T;A++)e[A]=A}}}});break;case"Group":Zh(s.value,e,t);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&eg(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return Pe(e)}function Ff(r,e,t){let n=Hn(r);e[n]=n,t===!0&&JF(r,e)}function JF(r,e){let t=String.fromCharCode(r),n=t.toUpperCase();if(n!==t){let i=Hn(n.charCodeAt(0));e[i]=i}else{let i=t.toLowerCase();if(i!==t){let o=Hn(i.charCodeAt(0));e[o]=o}}}function Rw(r,e){return jn(r.value,t=>{if(typeof t=="number")return et(e,t);{let n=t;return jn(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function eg(r){let e=r.quantifier;return e&&e.atLeast===0?!0:r.value?V(r.value)?cr(r.value,eg):eg(r.value):!1}var tg=class extends Nn{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){et(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?Rw(e,this.targetCharCodes)===void 0&&(this.found=!0):Rw(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function qf(r,e){if(e instanceof RegExp){let t=oa(e),n=new tg(r);return n.visit(t),n.found}else return jn(e,t=>et(r,t.charCodeAt(0)))!==void 0}var _o="PATTERN",aa="defaultMode",Uf="modes",ng=typeof new RegExp("(?:)").sticky=="boolean";function Cw(r,e){e=ta(e,{useSticky:ng,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(v,y)=>y()});let t=e.tracer;t("initCharCodeToOptimizedIndexMap",()=>{hq()});let n;t("Reject Lexer.NA",()=>{n=Yi(r,v=>v[_o]===ht.NA)});let i=!1,o;t("Transform Patterns",()=>{i=!1,o=L(n,v=>{let y=v[_o];if(Zr(y)){let $=y.source;return $.length===1&&$!=="^"&&$!=="$"&&$!=="."&&!y.ignoreCase?$:$.length===2&&$[0]==="\\"&&!et(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],$[1])?$[1]:e.useSticky?Sw(y):ww(y)}else{if(gr(y))return i=!0,{exec:y};if(typeof y=="object")return i=!0,y;if(typeof y=="string"){if(y.length===1)return y;{let $=y.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),D=new RegExp($);return e.useSticky?Sw(D):ww(D)}}else throw Error("non exhaustive match")}})});let s,a,c,l,u;t("misc mapping",()=>{s=L(n,v=>v.tokenTypeIdx),a=L(n,v=>{let y=v.GROUP;if(y!==ht.SKIPPED){if(Ot(y))return y;if(lr(y))return!1;throw Error("non exhaustive match")}}),c=L(n,v=>{let y=v.LONGER_ALT;if(y)return V(y)?L(y,D=>Pf(n,D)):[Pf(n,y)]}),l=L(n,v=>v.PUSH_MODE),u=L(n,v=>K(v,"POP_MODE"))});let f;t("Line Terminator Handling",()=>{let v=Dw(e.lineTerminatorCharacters);f=L(n,y=>!1),e.positionTracking!=="onlyOffset"&&(f=L(n,y=>K(y,"LINE_BREAKS")?!!y.LINE_BREAKS:Pw(y,v)===!1&&qf(v,y.PATTERN)))});let m,T,A,S;t("Misc Mapping #2",()=>{m=L(n,_w),T=L(o,pq),A=lt(n,(v,y)=>{let $=y.GROUP;return Ot($)&&$!==ht.SKIPPED&&(v[$]=[]),v},{}),S=L(o,(v,y)=>({pattern:o[y],longerAlt:c[y],canLineTerminator:f[y],isCustom:m[y],short:T[y],group:a[y],push:l[y],pop:u[y],tokenTypeIdx:s[y],tokenType:n[y]}))});let N=!0,C=[];return e.safeMode||t("First Char Optimization",()=>{C=lt(n,(v,y,$)=>{if(typeof y.PATTERN=="string"){let D=y.PATTERN.charCodeAt(0),X=Hn(D);rg(v,X,S[$])}else if(V(y.START_CHARS_HINT)){let D;G(y.START_CHARS_HINT,X=>{let ye=typeof X=="string"?X.charCodeAt(0):X,Ee=Hn(ye);D!==Ee&&(D=Ee,rg(v,Ee,S[$]))})}else if(Zr(y.PATTERN))if(y.PATTERN.unicode)N=!1,e.ensureOptimizations&&na(`${$c}	Unable to analyze < ${y.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let D=Aw(y.PATTERN,e.ensureOptimizations);se(D)&&(N=!1),G(D,X=>{rg(v,X,S[$])})}else e.ensureOptimizations&&na(`${$c}	TokenType: <${y.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),N=!1;return v},[])}),{emptyGroups:A,patternIdxToConfig:S,charCodeToPatternIdxToConfig:C,hasCustom:i,canBeOptimized:N}}function kw(r,e){let t=[],n=ZF(r);t=t.concat(n.errors);let i=eq(n.valid),o=i.valid;return t=t.concat(i.errors),t=t.concat(QF(o)),t=t.concat(cq(o)),t=t.concat(lq(o,e)),t=t.concat(uq(o)),t}function QF(r){let e=[],t=Ut(r,n=>Zr(n[_o]));return e=e.concat(rq(t)),e=e.concat(oq(t)),e=e.concat(sq(t)),e=e.concat(aq(t)),e=e.concat(nq(t)),e}function ZF(r){let e=Ut(r,i=>!K(i,_o)),t=L(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:tt.MISSING_PATTERN,tokenTypes:[i]})),n=Xi(r,e);return{errors:t,valid:n}}function eq(r){let e=Ut(r,i=>{let o=i[_o];return!Zr(o)&&!gr(o)&&!K(o,"exec")&&!Ot(o)}),t=L(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:tt.INVALID_PATTERN,tokenTypes:[i]})),n=Xi(r,e);return{errors:t,valid:n}}var tq=/[^\\][$]/;function rq(r){class e extends Nn{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let t=Ut(r,i=>{let o=i.PATTERN;try{let s=oa(o),a=new e;return a.visit(s),a.found}catch{return tq.test(o.source)}});return L(t,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function nq(r){let e=Ut(r,n=>n.PATTERN.test(""));return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:tt.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var iq=/[^\\[][\^]|^\^/;function oq(r){class e extends Nn{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let t=Ut(r,i=>{let o=i.PATTERN;try{let s=oa(o),a=new e;return a.visit(s),a.found}catch{return iq.test(o.source)}});return L(t,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function sq(r){let e=Ut(r,n=>{let i=n[_o];return i instanceof RegExp&&(i.multiline||i.global)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:tt.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function aq(r){let e=[],t=L(r,o=>lt(r,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!et(e,a)&&a.PATTERN!==ht.NA&&(e.push(a),s.push(a)),s),[]));t=Un(t);let n=Ut(t,o=>o.length>1);return L(n,o=>{let s=L(o,c=>c.name);return{message:`The same RegExp pattern ->${Gt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:tt.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function cq(r){let e=Ut(r,n=>{if(!K(n,"GROUP"))return!1;let i=n.GROUP;return i!==ht.SKIPPED&&i!==ht.NA&&!Ot(i)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:tt.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function lq(r,e){let t=Ut(r,i=>i.PUSH_MODE!==void 0&&!et(e,i.PUSH_MODE));return L(t,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:tt.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function uq(r){let e=[],t=lt(r,(n,i,o)=>{let s=i.PATTERN;return s===ht.NA||(Ot(s)?n.push({str:s,idx:o,tokenType:i}):Zr(s)&&dq(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return G(r,(n,i)=>{G(t,({str:o,idx:s,tokenType:a})=>{if(i<s&&fq(o,n.PATTERN)){let c=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:c,type:tt.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function fq(r,e){if(Zr(e)){let t=e.exec(r);return t!==null&&t.index===0}else{if(gr(e))return e(r,0,[],{});if(K(e,"exec"))return e.exec(r,0,[],{});if(typeof e=="string")return e===r;throw Error("non exhaustive match")}}function dq(r){return jn([".","\\","[","]","|","^","$","(",")","?","*","+","{"],t=>r.source.indexOf(t)!==-1)===void 0}function ww(r){let e=r.ignoreCase?"i":"";return new RegExp(`^(?:${r.source})`,e)}function Sw(r){let e=r.ignoreCase?"iy":"y";return new RegExp(`${r.source}`,e)}function Ew(r,e,t){let n=[];return K(r,aa)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+aa+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),K(r,Uf)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+Uf+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),K(r,Uf)&&K(r,aa)&&!K(r.modes,r.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${aa}: <${r.defaultMode}>which does not exist
`,type:tt.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),K(r,Uf)&&G(r.modes,(i,o)=>{G(i,(s,a)=>{if(lr(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:tt.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(K(s,"LONGER_ALT")){let c=V(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];G(c,l=>{!lr(l)&&!et(i,l)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${l.name}> on token <${s.name}> outside of mode <${o}>
`,type:tt.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function $w(r,e,t){let n=[],i=!1,o=Un(Tt(Pe(r.modes))),s=Yi(o,c=>c[_o]===ht.NA),a=Dw(t);return e&&G(s,c=>{let l=Pw(c,a);if(l!==!1){let f={message:mq(c,l),type:l.issue,tokenType:c};n.push(f)}else K(c,"LINE_BREAKS")?c.LINE_BREAKS===!0&&(i=!0):qf(a,c.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:tt.NO_LINE_BREAKS_FLAGS}),n}function Nw(r){let e={},t=He(r);return G(t,n=>{let i=r[n];if(V(i))e[n]=[];else throw Error("non exhaustive match")}),e}function _w(r){let e=r.PATTERN;if(Zr(e))return!1;if(gr(e))return!0;if(K(e,"exec"))return!0;if(Ot(e))return!1;throw Error("non exhaustive match")}function pq(r){return Ot(r)&&r.length===1?r.charCodeAt(0):!1}var Iw={test:function(r){let e=r.length;for(let t=this.lastIndex;t<e;t++){let n=r.charCodeAt(t);if(n===10)return this.lastIndex=t+1,!0;if(n===13)return r.charCodeAt(t+1)===10?this.lastIndex=t+2:this.lastIndex=t+1,!0}return!1},lastIndex:0};function Pw(r,e){if(K(r,"LINE_BREAKS"))return!1;if(Zr(r.PATTERN)){try{qf(e,r.PATTERN)}catch(t){return{issue:tt.IDENTIFY_TERMINATOR,errMsg:t.message}}return!1}else{if(Ot(r.PATTERN))return!1;if(_w(r))return{issue:tt.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function mq(r,e){if(e.issue===tt.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${r.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===tt.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${r.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function Dw(r){return L(r,t=>Ot(t)?t.charCodeAt(0):t)}function rg(r,e,t){r[e]===void 0?r[e]=[t]:r[e].push(t)}var sa=256,Gf=[];function Hn(r){return r<sa?r:Gf[r]}function hq(){if(se(Gf)){Gf=new Array(65536);for(let r=0;r<65536;r++)Gf[r]=r>255?255+~~(r/255):r}}function hi(r,e){let t=r.tokenTypeIdx;return t===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[t]===!0}function ca(r,e){return r.tokenTypeIdx===e.tokenTypeIdx}var Ow=1,Mw={};function gi(r){let e=gq(r);yq(e),vq(e),Tq(e),G(e,t=>{t.isParent=t.categoryMatches.length>0})}function gq(r){let e=Ke(r),t=r,n=!0;for(;n;){t=Un(Tt(L(t,o=>o.CATEGORIES)));let i=Xi(t,e);e=e.concat(i),se(i)?n=!1:t=i}return e}function yq(r){G(r,e=>{ig(e)||(Mw[Ow]=e,e.tokenTypeIdx=Ow++),Lw(e)&&!V(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),Lw(e)||(e.CATEGORIES=[]),xq(e)||(e.categoryMatches=[]),Rq(e)||(e.categoryMatchesMap={})})}function Tq(r){G(r,e=>{e.categoryMatches=[],G(e.categoryMatchesMap,(t,n)=>{e.categoryMatches.push(Mw[n].tokenTypeIdx)})})}function vq(r){G(r,e=>{Fw([],e)})}function Fw(r,e){G(r,t=>{e.categoryMatchesMap[t.tokenTypeIdx]=!0}),G(e.CATEGORIES,t=>{let n=r.concat(e);et(n,t)||Fw(n,t)})}function ig(r){return K(r,"tokenTypeIdx")}function Lw(r){return K(r,"CATEGORIES")}function xq(r){return K(r,"categoryMatches")}function Rq(r){return K(r,"categoryMatchesMap")}function qw(r){return K(r,"tokenTypeIdx")}var og={buildUnableToPopLexerModeMessage(r){return`Unable to pop Lexer Mode after encountering Token ->${r.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(r,e,t,n,i){return`unexpected character: ->${r.charAt(e)}<- at offset: ${e}, skipped ${t} characters.`}};var tt;(function(r){r[r.MISSING_PATTERN=0]="MISSING_PATTERN",r[r.INVALID_PATTERN=1]="INVALID_PATTERN",r[r.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",r[r.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",r[r.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",r[r.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",r[r.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",r[r.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",r[r.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",r[r.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",r[r.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",r[r.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",r[r.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",r[r.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",r[r.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",r[r.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",r[r.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",r[r.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(tt||(tt={}));var Nc={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:og,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(Nc);var ht=class{constructor(e,t=Nc){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:c}=kc(o),l=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&l(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,c}else return o()},typeof t=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Qt({},Nc,t);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===Nc.lineTerminatorsPattern)this.config.lineTerminatorsPattern=Iw;else if(this.config.lineTerminatorCharacters===Nc.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(t.safeMode&&t.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),V(e)?i={modes:{defaultMode:Ke(e)},defaultMode:aa}:(o=!1,i=Ke(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(Ew(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat($w(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},G(i.modes,(a,c)=>{i.modes[c]=Yi(a,l=>lr(l))});let s=He(i.modes);if(G(i.modes,(a,c)=>{this.TRACE_INIT(`Mode: <${c}> processing`,()=>{if(this.modes.push(c),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(kw(a,s))}),se(this.lexerDefinitionErrors)){gi(a);let l;this.TRACE_INIT("analyzeTokenTypes",()=>{l=Cw(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:t.positionTracking,ensureOptimizations:t.ensureOptimizations,safeMode:t.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[c]=l.patternIdxToConfig,this.charCodeToPatternIdxToConfig[c]=l.charCodeToPatternIdxToConfig,this.emptyGroups=Qt({},this.emptyGroups,l.emptyGroups),this.hasCustom=l.hasCustom||this.hasCustom,this.canModeBeOptimized[c]=l.canBeOptimized}})}),this.defaultMode=i.defaultMode,!se(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let c=L(this.lexerDefinitionErrors,l=>l.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+c)}G(this.lexerDefinitionWarning,a=>{Cc(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(ng?(this.chopInput=wr,this.match=this.matchWithTest):(this.updateLastIndex=ct,this.match=this.matchWithExec),o&&(this.handleModes=ct),this.trackStartLines===!1&&(this.computeNewColumn=wr),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=ct),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=lt(this.canModeBeOptimized,(c,l,u)=>(l===!1&&c.push(u),c),[]);if(t.ensureOptimizations&&!se(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{xw()}),this.TRACE_INIT("toFastProperties",()=>{Ec(this)})})}tokenize(e,t=this.defaultMode){if(!se(this.lexerDefinitionErrors)){let i=L(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,t)}tokenizeInternal(e,t){let n,i,o,s,a,c,l,u,f,m,T,A,S,N,C,v,y=e,$=y.length,D=0,X=0,ye=this.hasCustom?0:Math.floor(e.length/10),Ee=new Array(ye),Ht=[],xt=this.trackStartLines?1:void 0,M=this.trackStartLines?1:void 0,w=Nw(this.emptyGroups),U=this.trackStartLines,j=this.config.lineTerminatorsPattern,ce=0,ee=[],Q=[],Rt=[],ut=[];Object.freeze(ut);let me;function $r(){return ee}function Bn(bt){let er=Hn(bt),bn=Q[er];return bn===void 0?ut:bn}let Ca=bt=>{if(Rt.length===1&&bt.tokenType.PUSH_MODE===void 0){let er=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(bt);Ht.push({offset:bt.startOffset,line:bt.startLine,column:bt.startColumn,length:bt.image.length,message:er})}else{Rt.pop();let er=Gn(Rt);ee=this.patternIdxToConfig[er],Q=this.charCodeToPatternIdxToConfig[er],ce=ee.length;let bn=this.canModeBeOptimized[er]&&this.config.safeMode===!1;Q&&bn?me=Bn:me=$r}};function eo(bt){Rt.push(bt),Q=this.charCodeToPatternIdxToConfig[bt],ee=this.patternIdxToConfig[bt],ce=ee.length,ce=ee.length;let er=this.canModeBeOptimized[bt]&&this.config.safeMode===!1;Q&&er?me=Bn:me=$r}eo.call(this,t);let ur,qo=this.config.recoveryEnabled;for(;D<$;){c=null;let bt=y.charCodeAt(D),er=me(bt),bn=er.length;for(n=0;n<bn;n++){ur=er[n];let Bt=ur.pattern;l=null;let ft=ur.short;if(ft!==!1?bt===ft&&(c=Bt):ur.isCustom===!0?(v=Bt.exec(y,D,Ee,w),v!==null?(c=v[0],v.payload!==void 0&&(l=v.payload)):c=null):(this.updateLastIndex(Bt,D),c=this.match(Bt,e,D)),c!==null){if(a=ur.longerAlt,a!==void 0){let Gr=a.length;for(o=0;o<Gr;o++){let Nr=ee[a[o]],xr=Nr.pattern;if(u=null,Nr.isCustom===!0?(v=xr.exec(y,D,Ee,w),v!==null?(s=v[0],v.payload!==void 0&&(u=v.payload)):s=null):(this.updateLastIndex(xr,D),s=this.match(xr,e,D)),s&&s.length>c.length){c=s,l=u,ur=Nr;break}}}break}}if(c!==null){if(f=c.length,m=ur.group,m!==void 0&&(T=ur.tokenTypeIdx,A=this.createTokenInstance(c,D,T,ur.tokenType,xt,M,f),this.handlePayload(A,l),m===!1?X=this.addToken(Ee,X,A):w[m].push(A)),e=this.chopInput(e,f),D=D+f,M=this.computeNewColumn(M,f),U===!0&&ur.canLineTerminator===!0){let Bt=0,ft,Gr;j.lastIndex=0;do ft=j.test(c),ft===!0&&(Gr=j.lastIndex-1,Bt++);while(ft===!0);Bt!==0&&(xt=xt+Bt,M=f-Gr,this.updateTokenEndLineColumnLocation(A,m,Gr,Bt,xt,M,f))}this.handleModes(ur,Ca,eo,A)}else{let Bt=D,ft=xt,Gr=M,Nr=qo===!1;for(;Nr===!1&&D<$;)for(e=this.chopInput(e,1),D++,i=0;i<ce;i++){let xr=ee[i],to=xr.pattern,Ri=xr.short;if(Ri!==!1?y.charCodeAt(D)===Ri&&(Nr=!0):xr.isCustom===!0?Nr=to.exec(y,D,Ee,w)!==null:(this.updateLastIndex(to,D),Nr=to.exec(e)!==null),Nr===!0)break}if(S=D-Bt,M=this.computeNewColumn(M,S),C=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(y,Bt,S,ft,Gr),Ht.push({offset:Bt,line:ft,column:Gr,length:S,message:C}),qo===!1)break}}return this.hasCustom||(Ee.length=X),{tokens:Ee,groups:w,errors:Ht}}handleModes(e,t,n,i){if(e.pop===!0){let o=e.push;t(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,t){return e.substring(t)}updateLastIndex(e,t){e.lastIndex=t}updateTokenEndLineColumnLocation(e,t,n,i,o,s,a){let c,l;t!==void 0&&(c=n===a-1,l=c?-1:0,i===1&&c===!0||(e.endLine=o+l,e.endColumn=s-1+-l))}computeNewColumn(e,t){return e+t}createOffsetOnlyToken(e,t,n,i){return{image:e,startOffset:t,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,t,n,i,o,s){return{image:e,startOffset:t,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,t,n,i,o,s,a){return{image:e,startOffset:t,endOffset:t+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,t,n){return e.push(n),t}addTokenUsingMemberAccess(e,t,n){return e[t]=n,t++,t}handlePayloadNoCustom(e,t){}handlePayloadWithCustom(e,t){t!==null&&(e.payload=t)}matchWithTest(e,t,n){return e.test(t)===!0?t.substring(n,e.lastIndex):null}matchWithExec(e,t){let n=e.exec(t);return n!==null?n[0]:null}};ht.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";ht.NA=/NOT_APPLICABLE/;function yi(r){return sg(r)?r.LABEL:r.name}function sg(r){return Ot(r.LABEL)&&r.LABEL!==""}var bq="parent",Uw="categories",Gw="label",jw="group",Hw="push_mode",Bw="pop_mode",Kw="longer_alt",Ww="line_breaks",Vw="start_chars_hint";function jf(r){return Aq(r)}function Aq(r){let e=r.pattern,t={};if(t.name=r.name,lr(e)||(t.PATTERN=e),K(r,bq))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return K(r,Uw)&&(t.CATEGORIES=r[Uw]),gi([t]),K(r,Gw)&&(t.LABEL=r[Gw]),K(r,jw)&&(t.GROUP=r[jw]),K(r,Bw)&&(t.POP_MODE=r[Bw]),K(r,Hw)&&(t.PUSH_MODE=r[Hw]),K(r,Kw)&&(t.LONGER_ALT=r[Kw]),K(r,Ww)&&(t.LINE_BREAKS=r[Ww]),K(r,Vw)&&(t.START_CHARS_HINT=r[Vw]),t}var Tn=jf({name:"EOF",pattern:ht.NA});gi([Tn]);function Io(r,e,t,n,i,o,s,a){return{image:e,startOffset:t,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:r.tokenTypeIdx,tokenType:r}}function _c(r,e){return hi(r,e)}var Ti={buildMismatchTokenMessage({expected:r,actual:e,previous:t,ruleName:n}){return`Expecting ${sg(r)?`--> ${yi(r)} <--`:`token of type --> ${r.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:r,ruleName:e}){return"Redundant input, expecting EOF but found: "+r.image},buildNoViableAltMessage({expectedPathsPerAlt:r,actual:e,previous:t,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+Gt(e).image+"'";if(n)return o+n+a;{let c=lt(r,(m,T)=>m.concat(T),[]),l=L(c,m=>`[${L(m,T=>yi(T)).join(", ")}]`),f=`one of these possible Token sequences:
${L(l,(m,T)=>`  ${T+1}. ${m}`).join(`
`)}`;return o+f+a}},buildEarlyExitMessage({expectedIterationPaths:r,actual:e,customUserDescription:t,ruleName:n}){let i="Expecting: ",s=`
but found: '`+Gt(e).image+"'";if(t)return i+t+s;{let c=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${L(r,l=>`[${L(l,u=>yi(u)).join(",")}]`).join(" ,")}>`;return i+c+s}}};Object.freeze(Ti);var zw={buildRuleNotFoundError(r,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+r.name+"<-"}},vn={buildDuplicateFoundError(r,e){function t(u){return u instanceof ae?u.terminalType.name:u instanceof Ce?u.nonTerminalName:""}let n=r.name,i=Gt(e),o=i.idx,s=Er(i),a=t(i),c=o>0,l=`->${s}${c?o:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError(r){return`Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${r.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`},buildAlternationPrefixAmbiguityError(r){let e=L(r.prefixPath,i=>yi(i)).join(", "),t=r.alternation.idx===0?"":r.alternation.idx;return`Ambiguous alternatives: <${r.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${t}> inside <${r.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`},buildAlternationAmbiguityError(r){let e=L(r.prefixPath,i=>yi(i)).join(", "),t=r.alternation.idx===0?"":r.alternation.idx,n=`Ambiguous Alternatives Detected: <${r.ambiguityIndices.join(" ,")}> in <OR${t}> inside <${r.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError(r){let e=Er(r.repetition);return r.repetition.idx!==0&&(e+=r.repetition.idx),`The repetition <${e}> within Rule <${r.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`},buildTokenNameError(r){return"deprecated"},buildEmptyAlternationError(r){return`Ambiguous empty alternative: <${r.emptyChoiceIdx+1}> in <OR${r.alternation.idx}> inside <${r.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`},buildTooManyAlternativesError(r){return`An Alternation cannot have more than 256 alternatives:
<OR${r.alternation.idx}> inside <${r.topLevelRule.name}> Rule.
 has ${r.alternation.definition.length+1} alternatives.`},buildLeftRecursionError(r){let e=r.topLevelRule.name,t=L(r.leftRecursionPath,o=>o.name),n=`${e} --> ${t.concat([e]).join(" --> ")}`;return`Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(r){return"deprecated"},buildDuplicateRuleNameError(r){let e;return r.topLevelRule instanceof yr?e=r.topLevelRule.name:e=r.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${r.grammarName}<-`}};function Xw(r,e){let t=new ag(r,e);return t.resolveRefs(),t.errors}var ag=class extends Tr{constructor(e,t){super(),this.nameToTopRule=e,this.errMsgProvider=t,this.errors=[]}resolveRefs(){G(Pe(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let t=this.nameToTopRule[e.nonTerminalName];if(t)e.referencedRule=t;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:Lt.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var cg=class extends mi{constructor(e,t){super(),this.topProd=e,this.path=t,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=Ke(this.path.ruleStack).reverse(),this.occurrenceStack=Ke(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,t=[]){this.found||super.walk(e,t)}walkProdRef(e,t,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=t.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){se(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},Hf=class extends cg{constructor(e,t){super(e,t),this.path=t,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,t,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=t.concat(n),o=new We({definition:i});this.possibleTokTypes=No(o),this.found=!0}}},la=class extends mi{constructor(e,t){super(),this.topRule=e,this.occurrence=t,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},Bf=class extends la{walkMany(e,t,n){if(e.idx===this.occurrence){let i=Gt(t.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,t,n)}},Ic=class extends la{walkManySep(e,t,n){if(e.idx===this.occurrence){let i=Gt(t.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,t,n)}},Kf=class extends la{walkAtLeastOne(e,t,n){if(e.idx===this.occurrence){let i=Gt(t.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,t,n)}},Pc=class extends la{walkAtLeastOneSep(e,t,n){if(e.idx===this.occurrence){let i=Gt(t.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,t,n)}};function Wf(r,e,t=[]){t=Ke(t);let n=[],i=0;function o(a){return a.concat(vt(r,i+1))}function s(a){let c=Wf(o(a),e,t);return n.concat(c)}for(;t.length<e&&i<r.length;){let a=r[i];if(a instanceof We)return s(a.definition);if(a instanceof Ce)return s(a.definition);if(a instanceof ke)n=s(a.definition);else if(a instanceof Ve){let c=a.definition.concat([new pe({definition:a.definition})]);return s(c)}else if(a instanceof ze){let c=[new We({definition:a.definition}),new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})];return s(c)}else if(a instanceof Me){let c=a.definition.concat([new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})]);n=s(c)}else if(a instanceof pe){let c=a.definition.concat([new pe({definition:a.definition})]);n=s(c)}else{if(a instanceof Fe)return G(a.definition,c=>{se(c.definition)===!1&&(n=s(c.definition))}),n;if(a instanceof ae)t.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:t,suffixDef:vt(r,i)}),n}function Vf(r,e,t,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,c=e.length,l=c-n-1,u=[],f=[];for(f.push({idx:-1,def:r,ruleStack:[],occurrenceStack:[]});!se(f);){let m=f.pop();if(m===s){a&&Gn(f).idx<=l&&f.pop();continue}let T=m.def,A=m.idx,S=m.ruleStack,N=m.occurrenceStack;if(se(T))continue;let C=T[0];if(C===i){let v={idx:A,def:vt(T),ruleStack:pi(S),occurrenceStack:pi(N)};f.push(v)}else if(C instanceof ae)if(A<c-1){let v=A+1,y=e[v];if(t(y,C.terminalType)){let $={idx:v,def:vt(T),ruleStack:S,occurrenceStack:N};f.push($)}}else if(A===c-1)u.push({nextTokenType:C.terminalType,nextTokenOccurrence:C.idx,ruleStack:S,occurrenceStack:N}),a=!0;else throw Error("non exhaustive match");else if(C instanceof Ce){let v=Ke(S);v.push(C.nonTerminalName);let y=Ke(N);y.push(C.idx);let $={idx:A,def:C.definition.concat(o,vt(T)),ruleStack:v,occurrenceStack:y};f.push($)}else if(C instanceof ke){let v={idx:A,def:vt(T),ruleStack:S,occurrenceStack:N};f.push(v),f.push(s);let y={idx:A,def:C.definition.concat(vt(T)),ruleStack:S,occurrenceStack:N};f.push(y)}else if(C instanceof Ve){let v=new pe({definition:C.definition,idx:C.idx}),y=C.definition.concat([v],vt(T)),$={idx:A,def:y,ruleStack:S,occurrenceStack:N};f.push($)}else if(C instanceof ze){let v=new ae({terminalType:C.separator}),y=new pe({definition:[v].concat(C.definition),idx:C.idx}),$=C.definition.concat([y],vt(T)),D={idx:A,def:$,ruleStack:S,occurrenceStack:N};f.push(D)}else if(C instanceof Me){let v={idx:A,def:vt(T),ruleStack:S,occurrenceStack:N};f.push(v),f.push(s);let y=new ae({terminalType:C.separator}),$=new pe({definition:[y].concat(C.definition),idx:C.idx}),D=C.definition.concat([$],vt(T)),X={idx:A,def:D,ruleStack:S,occurrenceStack:N};f.push(X)}else if(C instanceof pe){let v={idx:A,def:vt(T),ruleStack:S,occurrenceStack:N};f.push(v),f.push(s);let y=new pe({definition:C.definition,idx:C.idx}),$=C.definition.concat([y],vt(T)),D={idx:A,def:$,ruleStack:S,occurrenceStack:N};f.push(D)}else if(C instanceof Fe)for(let v=C.definition.length-1;v>=0;v--){let y=C.definition[v],$={idx:A,def:y.definition.concat(vt(T)),ruleStack:S,occurrenceStack:N};f.push($),f.push(s)}else if(C instanceof We)f.push({idx:A,def:C.definition.concat(vt(T)),ruleStack:S,occurrenceStack:N});else if(C instanceof yr)f.push(wq(C,A,S,N));else throw Error("non exhaustive match")}return u}function wq(r,e,t,n){let i=Ke(t);i.push(r.name);let o=Ke(n);return o.push(1),{idx:e,def:r.definition,ruleStack:i,occurrenceStack:o}}var rt;(function(r){r[r.OPTION=0]="OPTION",r[r.REPETITION=1]="REPETITION",r[r.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",r[r.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",r[r.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",r[r.ALTERNATION=5]="ALTERNATION"})(rt||(rt={}));function Dc(r){if(r instanceof ke||r==="Option")return rt.OPTION;if(r instanceof pe||r==="Repetition")return rt.REPETITION;if(r instanceof Ve||r==="RepetitionMandatory")return rt.REPETITION_MANDATORY;if(r instanceof ze||r==="RepetitionMandatoryWithSeparator")return rt.REPETITION_MANDATORY_WITH_SEPARATOR;if(r instanceof Me||r==="RepetitionWithSeparator")return rt.REPETITION_WITH_SEPARATOR;if(r instanceof Fe||r==="Alternation")return rt.ALTERNATION;throw Error("non exhaustive match")}function Xf(r){let{occurrence:e,rule:t,prodType:n,maxLookahead:i}=r,o=Dc(n);return o===rt.ALTERNATION?ua(e,t,i):fa(e,t,o,i)}function Jw(r,e,t,n,i,o){let s=ua(r,e,t),a=nS(s)?ca:hi;return o(s,n,a,i)}function Qw(r,e,t,n,i,o){let s=fa(r,e,i,t),a=nS(s)?ca:hi;return o(s[0],a,n)}function Zw(r,e,t,n){let i=r.length,o=cr(r,s=>cr(s,a=>a.length===1));if(e)return function(s){let a=L(s,c=>c.GATE);for(let c=0;c<i;c++){let l=r[c],u=l.length,f=a[c];if(!(f!==void 0&&f.call(this)===!1))e:for(let m=0;m<u;m++){let T=l[m],A=T.length;for(let S=0;S<A;S++){let N=this.LA(S+1);if(t(N,T[S])===!1)continue e}return c}}};if(o&&!n){let s=L(r,c=>Tt(c)),a=lt(s,(c,l,u)=>(G(l,f=>{K(c,f.tokenTypeIdx)||(c[f.tokenTypeIdx]=u),G(f.categoryMatches,m=>{K(c,m)||(c[m]=u)})}),c),{});return function(){let c=this.LA(1);return a[c.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=r[s],c=a.length;e:for(let l=0;l<c;l++){let u=a[l],f=u.length;for(let m=0;m<f;m++){let T=this.LA(m+1);if(t(T,u[m])===!1)continue e}return s}}}}function eS(r,e,t){let n=cr(r,o=>o.length===1),i=r.length;if(n&&!t){let o=Tt(r);if(o.length===1&&se(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=lt(o,(a,c,l)=>(a[c.tokenTypeIdx]=!0,G(c.categoryMatches,u=>{a[u]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=r[o],a=s.length;for(let c=0;c<a;c++){let l=this.LA(c+1);if(e(l,s[c])===!1)continue e}return!0}return!1}}var ug=class extends mi{constructor(e,t,n){super(),this.topProd=e,this.targetOccurrence=t,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,t,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===t?(this.restDef=n.concat(i),!0):!1}walkOption(e,t,n){this.checkIsTarget(e,rt.OPTION,t,n)||super.walkOption(e,t,n)}walkAtLeastOne(e,t,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY,t,n)||super.walkOption(e,t,n)}walkAtLeastOneSep(e,t,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,t,n)||super.walkOption(e,t,n)}walkMany(e,t,n){this.checkIsTarget(e,rt.REPETITION,t,n)||super.walkOption(e,t,n)}walkManySep(e,t,n){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR,t,n)||super.walkOption(e,t,n)}},zf=class extends Tr{constructor(e,t,n){super(),this.targetOccurrence=e,this.targetProdType=t,this.targetRef=n,this.result=[]}checkIsTarget(e,t){e.idx===this.targetOccurrence&&this.targetProdType===t&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,rt.OPTION)}visitRepetition(e){this.checkIsTarget(e,rt.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,rt.ALTERNATION)}};function Yw(r){let e=new Array(r);for(let t=0;t<r;t++)e[t]=[];return e}function lg(r){let e=[""];for(let t=0;t<r.length;t++){let n=r[t],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let c="_"+n.categoryMatches[a];i.push(s+c)}}e=i}return e}function Sq(r,e,t){for(let n=0;n<r.length;n++){if(n===t)continue;let i=r[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function tS(r,e){let t=L(r,s=>Wf([s],1)),n=Yw(t.length),i=L(t,s=>{let a={};return G(s,c=>{let l=lg(c.partialPath);G(l,u=>{a[u]=!0})}),a}),o=t;for(let s=1;s<=e;s++){let a=o;o=Yw(a.length);for(let c=0;c<a.length;c++){let l=a[c];for(let u=0;u<l.length;u++){let f=l[u].partialPath,m=l[u].suffixDef,T=lg(f);if(Sq(i,T,c)||se(m)||f.length===e){let S=n[c];if(Yf(S,f)===!1){S.push(f);for(let N=0;N<T.length;N++){let C=T[N];i[c][C]=!0}}}else{let S=Wf(m,s+1,f);o[c]=o[c].concat(S),G(S,N=>{let C=lg(N.partialPath);G(C,v=>{i[c][v]=!0})})}}}}return n}function ua(r,e,t,n){let i=new zf(r,rt.ALTERNATION,n);return e.accept(i),tS(i.result,t)}function fa(r,e,t,n){let i=new zf(r,t);e.accept(i);let o=i.result,a=new ug(e,r,t).startWalking(),c=new We({definition:o}),l=new We({definition:a});return tS([c,l],n)}function Yf(r,e){e:for(let t=0;t<r.length;t++){let n=r[t];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function rS(r,e){return r.length<e.length&&cr(r,(t,n)=>{let i=e[n];return t===i||i.categoryMatchesMap[t.tokenTypeIdx]})}function nS(r){return cr(r,e=>cr(e,t=>cr(t,n=>se(n.categoryMatches))))}function iS(r){let e=r.lookaheadStrategy.validate({rules:r.rules,tokenTypes:r.tokenTypes,grammarName:r.grammarName});return L(e,t=>Object.assign({type:Lt.CUSTOM_LOOKAHEAD_VALIDATION},t))}function oS(r,e,t,n){let i=Zt(r,c=>Cq(c,t)),o=Iq(r,e,t),s=Zt(r,c=>$q(c,t)),a=Zt(r,c=>Eq(c,r,n,t));return i.concat(o,s,a)}function Cq(r,e){let t=new fg;r.accept(t);let n=t.allProductions,i=Xh(n,kq),o=kr(i,a=>a.length>1);return L(Pe(o),a=>{let c=Gt(a),l=e.buildDuplicateFoundError(r,a),u=Er(c),f={message:l,type:Lt.DUPLICATE_PRODUCTIONS,ruleName:r.name,dslName:u,occurrence:c.idx},m=sS(c);return m&&(f.parameter=m),f})}function kq(r){return`${Er(r)}_#_${r.idx}_#_${sS(r)}`}function sS(r){return r instanceof ae?r.terminalType.name:r instanceof Ce?r.nonTerminalName:""}var fg=class extends Tr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function Eq(r,e,t,n){let i=[];if(lt(e,(s,a)=>a.name===r.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:r,grammarName:t});i.push({message:s,type:Lt.DUPLICATE_RULE_NAME,ruleName:r.name})}return i}function aS(r,e,t){let n=[],i;return et(e,r)||(i=`Invalid rule override, rule: ->${r}<- cannot be overridden in the grammar: ->${t}<-as it is not defined in any of the super grammars `,n.push({message:i,type:Lt.INVALID_RULE_OVERRIDE,ruleName:r})),n}function pg(r,e,t,n=[]){let i=[],o=Jf(e.definition);if(se(o))return[];{let s=r.name;et(o,r)&&i.push({message:t.buildLeftRecursionError({topLevelRule:r,leftRecursionPath:n}),type:Lt.LEFT_RECURSION,ruleName:s});let c=Xi(o,n.concat([r])),l=Zt(c,u=>{let f=Ke(n);return f.push(u),pg(r,u,t,f)});return i.concat(l)}}function Jf(r){let e=[];if(se(r))return e;let t=Gt(r);if(t instanceof Ce)e.push(t.referencedRule);else if(t instanceof We||t instanceof ke||t instanceof Ve||t instanceof ze||t instanceof Me||t instanceof pe)e=e.concat(Jf(t.definition));else if(t instanceof Fe)e=Tt(L(t.definition,o=>Jf(o.definition)));else if(!(t instanceof ae))throw Error("non exhaustive match");let n=$o(t),i=r.length>1;if(n&&i){let o=vt(r);return e.concat(Jf(o))}else return e}var Oc=class extends Tr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function cS(r,e){let t=new Oc;r.accept(t);let n=t.alternations;return Zt(n,o=>{let s=pi(o.definition);return Zt(s,(a,c)=>{let l=Vf([a],[],hi,1);return se(l)?[{message:e.buildEmptyAlternationError({topLevelRule:r,alternation:o,emptyChoiceIdx:c}),type:Lt.NONE_LAST_EMPTY_ALT,ruleName:r.name,occurrence:o.idx,alternative:c+1}]:[]})})}function lS(r,e,t){let n=new Oc;r.accept(n);let i=n.alternations;return i=Yi(i,s=>s.ignoreAmbiguities===!0),Zt(i,s=>{let a=s.idx,c=s.maxLookahead||e,l=ua(a,r,c,s),u=Nq(l,s,r,t),f=_q(l,s,r,t);return u.concat(f)})}var dg=class extends Tr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function $q(r,e){let t=new Oc;r.accept(t);let n=t.alternations;return Zt(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:r,alternation:o}),type:Lt.TOO_MANY_ALTS,ruleName:r.name,occurrence:o.idx}]:[])}function uS(r,e,t){let n=[];return G(r,i=>{let o=new dg;i.accept(o);let s=o.allProductions;G(s,a=>{let c=Dc(a),l=a.maxLookahead||e,u=a.idx,m=fa(u,i,c,l)[0];if(se(Tt(m))){let T=t.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:T,type:Lt.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function Nq(r,e,t,n){let i=[],o=lt(r,(a,c,l)=>(e.definition[l].ignoreAmbiguities===!0||G(c,u=>{let f=[l];G(r,(m,T)=>{l!==T&&Yf(m,u)&&e.definition[T].ignoreAmbiguities!==!0&&f.push(T)}),f.length>1&&!Yf(i,u)&&(i.push(u),a.push({alts:f,path:u}))}),a),[]);return L(o,a=>{let c=L(a.alts,u=>u+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:t,alternation:e,ambiguityIndices:c,prefixPath:a.path}),type:Lt.AMBIGUOUS_ALTS,ruleName:t.name,occurrence:e.idx,alternatives:a.alts}})}function _q(r,e,t,n){let i=lt(r,(s,a,c)=>{let l=L(a,u=>({idx:c,path:u}));return s.concat(l)},[]);return Un(Zt(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let c=s.idx,l=s.path,u=Ut(i,m=>e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<c&&rS(m.path,l));return L(u,m=>{let T=[m.idx+1,c+1],A=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:t,alternation:e,ambiguityIndices:T,prefixPath:m.path}),type:Lt.AMBIGUOUS_PREFIX_ALTS,ruleName:t.name,occurrence:A,alternatives:T}})}))}function Iq(r,e,t){let n=[],i=L(e,o=>o.name);return G(r,o=>{let s=o.name;if(et(i,s)){let a=t.buildNamespaceConflictError(o);n.push({message:a,type:Lt.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function fS(r){let e=ta(r,{errMsgProvider:zw}),t={};return G(r.rules,n=>{t[n.name]=n}),Xw(t,e.errMsgProvider)}function dS(r){return r=ta(r,{errMsgProvider:vn}),oS(r.rules,r.tokenTypes,r.errMsgProvider,r.grammarName)}var pS="MismatchedTokenException",mS="NoViableAltException",hS="EarlyExitException",gS="NotAllInputParsedException",yS=[pS,mS,hS,gS];Object.freeze(yS);function Ji(r){return et(yS,r.name)}var da=class extends Error{constructor(e,t){super(e),this.token=t,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},Po=class extends da{constructor(e,t,n){super(e,t),this.previousToken=n,this.name=pS}},Lc=class extends da{constructor(e,t,n){super(e,t),this.previousToken=n,this.name=mS}},Mc=class extends da{constructor(e,t){super(e,t),this.name=gS}},Fc=class extends da{constructor(e,t,n){super(e,t),this.previousToken=n,this.name=hS}};var mg={},gg="InRuleRecoveryException",hg=class extends Error{constructor(e){super(e),this.name=gg}},Qf=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=K(e,"recoveryEnabled")?e.recoveryEnabled:vr.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=Pq)}getTokenToInsert(e){let t=Io(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return t.isInsertedInRecovery=!0,t}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,t,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],c=!1,l=this.LA(1),u=this.LA(1),f=()=>{let m=this.LA(0),T=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:l,previous:m,ruleName:this.getCurrRuleFullName()}),A=new Po(T,l,this.LA(0));A.resyncedTokens=pi(a),this.SAVE_ERROR(A)};for(;!c;)if(this.tokenMatcher(u,i)){f();return}else if(n.call(this)){f(),e.apply(this,t);return}else this.tokenMatcher(u,o)?c=!0:(u=this.SKIP_TOKEN(),this.addToResyncTokens(u,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,t,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,t)))}getFollowsForInRuleRecovery(e,t){let n=this.getCurrentGrammarPath(e,t);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,t){if(this.canRecoverWithSingleTokenInsertion(e,t))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new hg("sad sad panda")}canPerformInRuleRecovery(e,t){return this.canRecoverWithSingleTokenInsertion(e,t)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,t){if(!this.canTokenTypeBeInsertedInRecovery(e)||se(t))return!1;let n=this.LA(1);return jn(t,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let t=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(t);return et(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),t=this.LA(1),n=2;for(;;){let i=jn(e,o=>_c(t,o));if(i!==void 0)return i;t=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return mg;let e=this.getLastExplicitRuleShortName(),t=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:t,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,t=this.RULE_OCCURRENCE_STACK;return L(e,(n,i)=>i===0?mg:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:t[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=L(this.buildFullFollowKeyStack(),t=>this.getFollowSetFromFollowKey(t));return Tt(e)}getFollowSetFromFollowKey(e){if(e===mg)return[Tn];let t=e.ruleName+e.idxInCallingRule+Lf+e.inRule;return this.resyncFollows[t]}addToResyncTokens(e,t){return this.tokenMatcher(e,Tn)||t.push(e),t}reSyncTo(e){let t=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,t);return pi(t)}attemptInRepetitionRecovery(e,t,n,i,o,s,a){}getCurrentGrammarPath(e,t){let n=this.getHumanReadableRuleStack(),i=Ke(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:t}}getHumanReadableRuleStack(){return L(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function Pq(r,e,t,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),c=this.firstAfterRepMap[a];if(c===void 0){let m=this.getCurrRuleFullName(),T=this.getGAstProductions()[m];c=new o(T,i).startWalking(),this.firstAfterRepMap[a]=c}let l=c.token,u=c.occurrence,f=c.isEndOfRule;this.RULE_STACK.length===1&&f&&l===void 0&&(l=Tn,u=1),!(l===void 0||u===void 0)&&this.shouldInRepetitionRecoveryBeTried(l,u,s)&&this.tryInRepetitionRecovery(r,e,t,l)}function Zf(r,e,t){return t|e|r}var Wre=32-8;var vi=class{constructor(e){var t;this.maxLookahead=(t=e?.maxLookahead)!==null&&t!==void 0?t:vr.maxLookahead}validate(e){let t=this.validateNoLeftRecursion(e.rules);if(se(t)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...t,...n,...i,...o]}return t}validateNoLeftRecursion(e){return Zt(e,t=>pg(t,t,vn))}validateEmptyOrAlternatives(e){return Zt(e,t=>cS(t,vn))}validateAmbiguousAlternationAlternatives(e,t){return Zt(e,n=>lS(n,t,vn))}validateSomeNonEmptyLookaheadPath(e,t){return uS(e,t,vn)}buildLookaheadForAlternation(e){return Jw(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,Zw)}buildLookaheadForOptional(e){return Qw(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,Dc(e.prodType),eS)}};var td=class{initLooksAhead(e){this.dynamicTokensEnabled=K(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:vr.dynamicTokensEnabled,this.maxLookahead=K(e,"maxLookahead")?e.maxLookahead:vr.maxLookahead,this.lookaheadStrategy=K(e,"lookaheadStrategy")?e.lookaheadStrategy:new vi({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){G(e,t=>{this.TRACE_INIT(`${t.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:c}=Dq(t);G(n,l=>{let u=l.idx===0?"":l.idx;this.TRACE_INIT(`${Er(l)}${u}`,()=>{let f=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:l.idx,rule:t,maxLookahead:l.maxLookahead||this.maxLookahead,hasPredicates:l.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),m=Zf(this.fullRuleNameToShort[t.name],256,l.idx);this.setLaFuncCache(m,f)})}),G(i,l=>{this.computeLookaheadFunc(t,l.idx,768,"Repetition",l.maxLookahead,Er(l))}),G(o,l=>{this.computeLookaheadFunc(t,l.idx,512,"Option",l.maxLookahead,Er(l))}),G(s,l=>{this.computeLookaheadFunc(t,l.idx,1024,"RepetitionMandatory",l.maxLookahead,Er(l))}),G(a,l=>{this.computeLookaheadFunc(t,l.idx,1536,"RepetitionMandatoryWithSeparator",l.maxLookahead,Er(l))}),G(c,l=>{this.computeLookaheadFunc(t,l.idx,1280,"RepetitionWithSeparator",l.maxLookahead,Er(l))})})})}computeLookaheadFunc(e,t,n,i,o,s){this.TRACE_INIT(`${s}${t===0?"":t}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:t,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),c=Zf(this.fullRuleNameToShort[e.name],n,t);this.setLaFuncCache(c,a)})}getKeyForAutomaticLookahead(e,t){let n=this.getLastExplicitRuleShortName();return Zf(n,e,t)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,t){this.lookAheadFuncsCache.set(e,t)}},yg=class extends Tr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},ed=new yg;function Dq(r){ed.reset(),r.accept(ed);let e=ed.dslMethods;return ed.reset(),e}function xg(r,e){isNaN(r.startOffset)===!0?(r.startOffset=e.startOffset,r.endOffset=e.endOffset):r.endOffset<e.endOffset&&(r.endOffset=e.endOffset)}function Rg(r,e){isNaN(r.startOffset)===!0?(r.startOffset=e.startOffset,r.startColumn=e.startColumn,r.startLine=e.startLine,r.endOffset=e.endOffset,r.endColumn=e.endColumn,r.endLine=e.endLine):r.endOffset<e.endOffset&&(r.endOffset=e.endOffset,r.endColumn=e.endColumn,r.endLine=e.endLine)}function TS(r,e,t){r.children[t]===void 0?r.children[t]=[e]:r.children[t].push(e)}function vS(r,e,t){r.children[e]===void 0?r.children[e]=[t]:r.children[e].push(t)}var Oq="name";function bg(r,e){Object.defineProperty(r,Oq,{enumerable:!1,configurable:!0,writable:!1,value:e})}function Lq(r,e){let t=He(r),n=t.length;for(let i=0;i<n;i++){let o=t[i],s=r[o],a=s.length;for(let c=0;c<a;c++){let l=s[c];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}}function xS(r,e){let t=function(){};bg(t,r+"BaseSemantics");let n={visit:function(i,o){if(V(i)&&(i=i[0]),!lr(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=Mq(this,e);if(!se(i)){let o=L(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return t.prototype=n,t.prototype.constructor=t,t._RULE_NAMES=e,t}function RS(r,e,t){let n=function(){};bg(n,r+"BaseSemanticsWithDefaults");let i=Object.create(t.prototype);return G(e,o=>{i[o]=Lq}),n.prototype=i,n.prototype.constructor=n,n}var Ag;(function(r){r[r.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",r[r.MISSING_METHOD=1]="MISSING_METHOD"})(Ag||(Ag={}));function Mq(r,e){return Fq(r,e)}function Fq(r,e){let t=Ut(e,i=>gr(r[i])===!1),n=L(t,i=>({msg:`Missing visitor method: <${i}> on ${r.constructor.name} CST Visitor.`,type:Ag.MISSING_METHOD,methodName:i}));return Un(n)}var od=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=K(e,"nodeLocationTracking")?e.nodeLocationTracking:vr.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=ct,this.cstFinallyStateUpdate=ct,this.cstPostTerminal=ct,this.cstPostNonTerminal=ct,this.cstPostRule=ct;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Rg,this.setNodeLocationFromNode=Rg,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=xg,this.setNodeLocationFromNode=xg,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=ct,this.setInitialNodeLocation=ct;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let t=this.LA(1);e.location={startOffset:t.startOffset,startLine:t.startLine,startColumn:t.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let t={name:e,children:Object.create(null)};this.setInitialNodeLocation(t),this.CST_STACK.push(t)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let t=this.LA(0),n=e.location;n.startOffset<=t.startOffset?(n.endOffset=t.endOffset,n.endLine=t.endLine,n.endColumn=t.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let t=this.LA(0),n=e.location;n.startOffset<=t.startOffset?n.endOffset=t.endOffset:n.startOffset=NaN}cstPostTerminal(e,t){let n=this.CST_STACK[this.CST_STACK.length-1];TS(n,t,e),this.setNodeLocationFromToken(n.location,t)}cstPostNonTerminal(e,t){let n=this.CST_STACK[this.CST_STACK.length-1];vS(n,t,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(lr(this.baseCstVisitorConstructor)){let e=xS(this.className,He(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(lr(this.baseCstVisitorWithDefaultsConstructor)){let e=RS(this.className,He(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var sd=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):pa}LA(e){let t=this.currIdx+e;return t<0||this.tokVectorLength<=t?pa:this.tokVector[t]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var ad=class{ACTION(e){return e.call(this)}consume(e,t,n){return this.consumeInternal(t,e,n)}subrule(e,t,n){return this.subruleInternal(t,e,n)}option(e,t){return this.optionInternal(t,e)}or(e,t){return this.orInternal(t,e)}many(e,t){return this.manyInternal(e,t)}atLeastOne(e,t){return this.atLeastOneInternal(e,t)}CONSUME(e,t){return this.consumeInternal(e,0,t)}CONSUME1(e,t){return this.consumeInternal(e,1,t)}CONSUME2(e,t){return this.consumeInternal(e,2,t)}CONSUME3(e,t){return this.consumeInternal(e,3,t)}CONSUME4(e,t){return this.consumeInternal(e,4,t)}CONSUME5(e,t){return this.consumeInternal(e,5,t)}CONSUME6(e,t){return this.consumeInternal(e,6,t)}CONSUME7(e,t){return this.consumeInternal(e,7,t)}CONSUME8(e,t){return this.consumeInternal(e,8,t)}CONSUME9(e,t){return this.consumeInternal(e,9,t)}SUBRULE(e,t){return this.subruleInternal(e,0,t)}SUBRULE1(e,t){return this.subruleInternal(e,1,t)}SUBRULE2(e,t){return this.subruleInternal(e,2,t)}SUBRULE3(e,t){return this.subruleInternal(e,3,t)}SUBRULE4(e,t){return this.subruleInternal(e,4,t)}SUBRULE5(e,t){return this.subruleInternal(e,5,t)}SUBRULE6(e,t){return this.subruleInternal(e,6,t)}SUBRULE7(e,t){return this.subruleInternal(e,7,t)}SUBRULE8(e,t){return this.subruleInternal(e,8,t)}SUBRULE9(e,t){return this.subruleInternal(e,9,t)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,t,n=ma){if(et(this.definedRulesNames,e)){let s={message:vn.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:Lt.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,t,n);return this[e]=i,i}OVERRIDE_RULE(e,t,n=ma){let i=aS(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,t,n);return this[e]=o,o}BACKTRACK(e,t){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,t),!0}catch(i){if(Ji(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return Of(Pe(this.gastProductionsCache))}};var cd=class{initRecognizerEngine(e,t){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=ca,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},K(t,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(V(e)){if(se(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(V(e))this.tokensMap=lt(e,(o,s)=>(o[s.name]=s,o),{});else if(K(e,"modes")&&cr(Tt(Pe(e.modes)),qw)){let o=Tt(Pe(e.modes)),s=ra(o);this.tokensMap=lt(s,(a,c)=>(a[c.name]=c,a),{})}else if(at(e))this.tokensMap=Ke(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=Tn;let n=K(e,"modes")?Tt(Pe(e.modes)):Pe(e),i=cr(n,o=>se(o.categoryMatches));this.tokenMatcher=i?ca:hi,gi(Pe(this.tokensMap))}defineRule(e,t,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=K(n,"resyncEnabled")?n.resyncEnabled:ma.resyncEnabled,o=K(n,"recoveryValueFunc")?n.recoveryValueFunc:ma.recoveryValueFunc,s=this.ruleShortNameIdx<<4+8;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...u){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),t.apply(this,u);let f=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(f),f}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...u){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),t.apply(this,u)}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:t})}invokeRuleCatch(e,t,n){let i=this.RULE_STACK.length===1,o=t&&!this.isBackTracking()&&this.recoveryEnabled;if(Ji(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];return c.recoveredNode=!0,c}else return n(e);else{if(this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];c.recoveredNode=!0,s.partialCstResult=c}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,t){let n=this.getKeyForAutomaticLookahead(512,t);return this.optionInternalLogic(e,t,n)}optionInternalLogic(e,t,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,t){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,t,n)}atLeastOneInternalLogic(e,t,n){let i=this.getLaFuncFromCache(n),o;if(typeof t!="function"){o=t.DEF;let s=t.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=t;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY,t.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,t],i,1024,e,Kf)}atLeastOneSepFirstInternal(e,t){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,t,n)}atLeastOneSepFirstInternalLogic(e,t,n){let i=t.DEF,o=t.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Pc],a,1536,e,Pc)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,t.ERR_MSG)}manyInternal(e,t){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,t,n)}manyInternalLogic(e,t,n){let i=this.getLaFuncFromCache(n),o;if(typeof t!="function"){o=t.DEF;let a=t.GATE;if(a!==void 0){let c=i;i=()=>a.call(this)&&c.call(this)}}else o=t;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,t],i,768,e,Bf,s)}manySepFirstInternal(e,t){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,t,n)}manySepFirstInternalLogic(e,t,n){let i=t.DEF,o=t.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Ic],a,1280,e,Ic)}}repetitionSepSecondInternal(e,t,n,i,o){for(;n();)this.CONSUME(t),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,t,n,i,o],n,1536,e,o)}doSingleRepetition(e){let t=this.getLexerPosition();return e.call(this),this.getLexerPosition()>t}orInternal(e,t){let n=this.getKeyForAutomaticLookahead(256,t),i=V(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(t,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),t=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Mc(t,e))}}subruleInternal(e,t,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=t,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,t,n){throw Ji(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,t!==void 0&&t.LABEL!==void 0?t.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,t,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,t,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,t,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:t,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Po(i,t,o))}consumeInternalRecovery(e,t,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,t);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===gg?n:o}}else throw n}saveRecogState(){let e=this.errors,t=Ke(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:t,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,t,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(t)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),Tn)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var ld=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=K(e,"errorMessageProvider")?e.errorMessageProvider:vr.errorMessageProvider}SAVE_ERROR(e){if(Ji(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:Ke(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return Ke(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,t,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=fa(e,o,t,this.maxLookahead)[0],c=[];for(let u=1;u<=this.maxLookahead;u++)c.push(this.LA(u));let l=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:c,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new Fc(l,this.LA(1),this.LA(0)))}raiseNoAltException(e,t){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=ua(e,i,this.maxLookahead),s=[];for(let l=1;l<=this.maxLookahead;l++)s.push(this.LA(l));let a=this.LA(0),c=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:t,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new Lc(c,this.LA(1),a))}};var ud=class{initContentAssist(){}computeContentAssist(e,t){let n=this.gastProductionsCache[e];if(lr(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return Vf([n],t,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let t=Gt(e.ruleStack),i=this.getGAstProductions()[t];return new Hf(i,e).startWalking()}};var pd={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(pd);var bS=!0,AS=Math.pow(2,8)-1,SS=jf({name:"RECORDING_PHASE_TOKEN",pattern:ht.NA});gi([SS]);var CS=Io(SS,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(CS);var Uq={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},fd=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let t=e>0?e:"";this[`CONSUME${t}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${t}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${t}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${t}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${t}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${t}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${t}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${t}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,t,n){return this.consumeInternalRecord(t,e,n)},this.subrule=function(e,t,n){return this.subruleInternalRecord(t,e,n)},this.option=function(e,t){return this.optionInternalRecord(t,e)},this.or=function(e,t){return this.orInternalRecord(t,e)},this.many=function(e,t){this.manyInternalRecord(e,t)},this.atLeastOne=function(e,t){this.atLeastOneInternalRecord(e,t)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let t=0;t<10;t++){let n=t>0?t:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,t){return()=>!0}LA_RECORD(e){return pa}topLevelRuleRecord(e,t){try{let n=new yr({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),t.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,t){return Uc.call(this,ke,e,t)}atLeastOneInternalRecord(e,t){Uc.call(this,Ve,t,e)}atLeastOneSepFirstInternalRecord(e,t){Uc.call(this,ze,t,e,bS)}manyInternalRecord(e,t){Uc.call(this,pe,t,e)}manySepFirstInternalRecord(e,t){Uc.call(this,Me,t,e,bS)}orInternalRecord(e,t){return Gq.call(this,e,t)}subruleInternalRecord(e,t,n){if(dd(t),!e||K(e,"ruleName")===!1){let a=new Error(`<SUBRULE${wS(t)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=Gn(this.recordingProdStack),o=e.ruleName,s=new Ce({idx:t,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?Uq:pd}consumeInternalRecord(e,t,n){if(dd(t),!ig(e)){let s=new Error(`<CONSUME${wS(t)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=Gn(this.recordingProdStack),o=new ae({idx:t,terminalType:e,label:n?.LABEL});return i.definition.push(o),CS}};function Uc(r,e,t,n=!1){dd(t);let i=Gn(this.recordingProdStack),o=gr(e)?e:e.DEF,s=new r({definition:[],idx:t});return n&&(s.separator=e.SEP),K(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),pd}function Gq(r,e){dd(e);let t=Gn(this.recordingProdStack),n=V(r)===!1,i=n===!1?r:r.DEF,o=new Fe({definition:[],idx:e,ignoreAmbiguities:n&&r.IGNORE_AMBIGUITIES===!0});K(r,"MAX_LOOKAHEAD")&&(o.maxLookahead=r.MAX_LOOKAHEAD);let s=Sc(i,a=>gr(a.GATE));return o.hasPredicates=s,t.definition.push(o),G(i,a=>{let c=new We({definition:[]});o.definition.push(c),K(a,"IGNORE_AMBIGUITIES")?c.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:K(a,"GATE")&&(c.ignoreAmbiguities=!0),this.recordingProdStack.push(c),a.ALT.call(this),this.recordingProdStack.pop()}),pd}function wS(r){return r===0?"":`${r}`}function dd(r){if(r<0||r>AS){let e=new Error(`Invalid DSL Method idx value: <${r}>
	Idx value must be a none negative value smaller than ${AS+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var md=class{initPerformanceTracer(e){if(K(e,"traceInitPerf")){let t=e.traceInitPerf,n=typeof t=="number";this.traceInitMaxIdent=n?t:1/0,this.traceInitPerf=n?t>0:t}else this.traceInitMaxIdent=0,this.traceInitPerf=vr.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,t){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=kc(t),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return t()}};function kS(r,e){e.forEach(t=>{let n=t.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(r.prototype,i,o):r.prototype[i]=t.prototype[i]})})}var pa=Io(Tn,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(pa);var vr=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:Ti,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),ma=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),Lt;(function(r){r[r.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",r[r.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",r[r.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",r[r.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",r[r.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",r[r.LEFT_RECURSION=5]="LEFT_RECURSION",r[r.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",r[r.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",r[r.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",r[r.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",r[r.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",r[r.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",r[r.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",r[r.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Lt||(Lt={}));function hd(r=void 0){return function(){return r}}var Gc=class r{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let t=this.className;this.TRACE_INIT("toFastProps",()=>{Ec(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),G(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=fS({rules:Pe(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(se(n)&&this.skipValidations===!1){let i=dS({rules:Pe(this.gastProductionsCache),tokenTypes:Pe(this.tokensMap),errMsgProvider:vn,grammarName:t}),o=iS({lookaheadStrategy:this.lookaheadStrategy,rules:Pe(this.gastProductionsCache),tokenTypes:Pe(this.tokensMap),grammarName:t});this.definitionErrors=this.definitionErrors.concat(i,o)}}),se(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=vw(Pe(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:Pe(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(Pe(this.gastProductionsCache))})),!r.DEFER_DEFINITION_ERRORS_HANDLING&&!se(this.definitionErrors))throw e=L(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,t){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(t),n.initLexerAdapter(),n.initLooksAhead(t),n.initRecognizerEngine(e,t),n.initRecoverable(t),n.initTreeBuilder(t),n.initContentAssist(),n.initGastRecorder(t),n.initPerformanceTracer(t),K(t,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=K(t,"skipValidations")?t.skipValidations:vr.skipValidations}};Gc.DEFER_DEFINITION_ERRORS_HANDLING=!1;kS(Gc,[Qf,td,od,sd,cd,ad,ld,ud,fd,md]);var jc=class extends Gc{constructor(e,t=vr){let n=Ke(t);n.outputCst=!1,super(e,n)}};function Do(r,e,t){return`${r.name}_${e}_${t}`}var Qi=1,Hq=2,ES=4,$S=5;var ya=7,Bq=8,Kq=9,Wq=10,Vq=11,NS=12,Hc=class{constructor(e){this.target=e}isEpsilon(){return!1}},ha=class extends Hc{constructor(e,t){super(e),this.tokenType=t}},Bc=class extends Hc{constructor(e){super(e)}isEpsilon(){return!0}},ga=class extends Hc{constructor(e,t,n){super(e),this.rule=t,this.followState=n}isEpsilon(){return!0}};function _S(r){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};zq(e,r);let t=r.length;for(let n=0;n<t;n++){let i=r[n],o=Oo(e,i,i);o!==void 0&&oU(e,i,o)}return e}function zq(r,e){let t=e.length;for(let n=0;n<t;n++){let i=e[n],o=jt(r,i,void 0,{type:Hq}),s=jt(r,i,void 0,{type:ya});o.stop=s,r.ruleToStartState.set(i,o),r.ruleToStopState.set(i,s)}}function IS(r,e,t){return t instanceof ae?Sg(r,e,t.terminalType,t):t instanceof Ce?iU(r,e,t):t instanceof Fe?Zq(r,e,t):t instanceof ke?eU(r,e,t):t instanceof pe?Xq(r,e,t):t instanceof Me?Yq(r,e,t):t instanceof Ve?Jq(r,e,t):t instanceof ze?Qq(r,e,t):Oo(r,e,t)}function Xq(r,e,t){let n=jt(r,e,t,{type:$S});Zi(r,n);let i=Ta(r,e,n,t,Oo(r,e,t));return DS(r,e,t,i)}function Yq(r,e,t){let n=jt(r,e,t,{type:$S});Zi(r,n);let i=Ta(r,e,n,t,Oo(r,e,t)),o=Sg(r,e,t.separator,t);return DS(r,e,t,i,o)}function Jq(r,e,t){let n=jt(r,e,t,{type:ES});Zi(r,n);let i=Ta(r,e,n,t,Oo(r,e,t));return PS(r,e,t,i)}function Qq(r,e,t){let n=jt(r,e,t,{type:ES});Zi(r,n);let i=Ta(r,e,n,t,Oo(r,e,t)),o=Sg(r,e,t.separator,t);return PS(r,e,t,i,o)}function Zq(r,e,t){let n=jt(r,e,t,{type:Qi});Zi(r,n);let i=L(t.definition,s=>IS(r,e,s));return Ta(r,e,n,t,...i)}function eU(r,e,t){let n=jt(r,e,t,{type:Qi});Zi(r,n);let i=Ta(r,e,n,t,Oo(r,e,t));return tU(r,e,t,i)}function Oo(r,e,t){let n=Ut(L(t.definition,i=>IS(r,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:nU(r,n)}function PS(r,e,t,n,i){let o=n.left,s=n.right,a=jt(r,e,t,{type:Vq});Zi(r,a);let c=jt(r,e,t,{type:NS});return o.loopback=a,c.loopback=a,r.decisionMap[Do(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",t.idx)]=a,_t(s,a),i===void 0?(_t(a,o),_t(a,c)):(_t(a,c),_t(a,i.left),_t(i.right,o)),{left:o,right:c}}function DS(r,e,t,n,i){let o=n.left,s=n.right,a=jt(r,e,t,{type:Wq});Zi(r,a);let c=jt(r,e,t,{type:NS}),l=jt(r,e,t,{type:Kq});return a.loopback=l,c.loopback=l,_t(a,o),_t(a,c),_t(s,l),i!==void 0?(_t(l,c),_t(l,i.left),_t(i.right,o)):_t(l,a),r.decisionMap[Do(e,i?"RepetitionWithSeparator":"Repetition",t.idx)]=a,{left:a,right:c}}function tU(r,e,t,n){let i=n.left,o=n.right;return _t(i,o),r.decisionMap[Do(e,"Option",t.idx)]=i,n}function Zi(r,e){return r.decisionStates.push(e),e.decision=r.decisionStates.length-1,e.decision}function Ta(r,e,t,n,...i){let o=jt(r,e,n,{type:Bq,start:t});t.end=o;for(let a of i)a!==void 0?(_t(t,a.left),_t(a.right,o)):_t(t,o);let s={left:t,right:o};return r.decisionMap[Do(e,rU(n),n.idx)]=t,s}function rU(r){if(r instanceof Fe)return"Alternation";if(r instanceof ke)return"Option";if(r instanceof pe)return"Repetition";if(r instanceof Me)return"RepetitionWithSeparator";if(r instanceof Ve)return"RepetitionMandatory";if(r instanceof ze)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function nU(r,e){let t=e.length;for(let o=0;o<t-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let c=a instanceof ga,l=a,u=e[o+1].left;s.left.type===Qi&&s.right.type===Qi&&a!==void 0&&(c&&l.followState===s.right||a.target===s.right)?(c?l.followState=u:a.target=u,sU(r,s.right)):_t(s.right,u)}let n=e[0],i=e[t-1];return{left:n.left,right:i.right}}function Sg(r,e,t,n){let i=jt(r,e,n,{type:Qi}),o=jt(r,e,n,{type:Qi});return Cg(i,new ha(o,t)),{left:i,right:o}}function iU(r,e,t){let n=t.referencedRule,i=r.ruleToStartState.get(n),o=jt(r,e,t,{type:Qi}),s=jt(r,e,t,{type:Qi}),a=new ga(i,n,s);return Cg(o,a),{left:o,right:s}}function oU(r,e,t){let n=r.ruleToStartState.get(e);_t(n,t.left);let i=r.ruleToStopState.get(e);return _t(t.right,i),{left:n,right:i}}function _t(r,e){let t=new Bc(e);Cg(r,t)}function jt(r,e,t,n){let i=Object.assign({atn:r,production:t,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:r.states.length},n);return r.states.push(i),i}function Cg(r,e){r.transitions.length===0&&(r.epsilonOnlyTransitions=e.isEpsilon()),r.transitions.push(e)}function sU(r,e){r.states.splice(r.states.indexOf(e),1)}var Kc={},va=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let t=kg(e);t in this.map||(this.map[t]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return L(this.configs,e=>e.alt)}get key(){let e="";for(let t in this.map)e+=t+":";return e}};function kg(r,e=!0){return`${e?`a${r.alt}`:""}s${r.state.stateNumber}:${r.stack.map(t=>t.stateNumber.toString()).join("_")}`}function aU(r,e){let t={};return n=>{let i=n.toString(),o=t[i];return o!==void 0||(o={atnStartState:r,decision:e,states:{}},t[i]=o),o}}var gd=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,t){this.predicates[e]=t}toString(){let e="",t=this.predicates.length;for(let n=0;n<t;n++)e+=this.predicates[n]===!0?"1":"0";return e}},OS=new gd,Wc=class extends vi{constructor(e){var t;super(),this.logging=(t=e?.logging)!==null&&t!==void 0?t:n=>console.log(n)}initialize(e){this.atn=_S(e.rules),this.dfas=cU(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:t,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Do(n,"Alternation",t),u=this.atn.decisionMap[c].decision,f=L(Xf({maxLookahead:1,occurrence:t,prodType:"Alternation",rule:n}),m=>L(m,T=>T[0]));if(LS(f,!1)&&!o){let m=lt(f,(T,A,S)=>(G(A,N=>{N&&(T[N.tokenTypeIdx]=S,G(N.categoryMatches,C=>{T[C]=S}))}),T),{});return i?function(T){var A;let S=this.LA(1),N=m[S.tokenTypeIdx];if(T!==void 0&&N!==void 0){let C=(A=T[N])===null||A===void 0?void 0:A.GATE;if(C!==void 0&&C.call(this)===!1)return}return N}:function(){let T=this.LA(1);return m[T.tokenTypeIdx]}}else return i?function(m){let T=new gd,A=m===void 0?0:m.length;for(let N=0;N<A;N++){let C=m?.[N].GATE;T.set(N,C===void 0||C.call(this))}let S=Eg.call(this,s,u,T,a);return typeof S=="number"?S:void 0}:function(){let m=Eg.call(this,s,u,OS,a);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:t,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Do(n,i,t),u=this.atn.decisionMap[c].decision,f=L(Xf({maxLookahead:1,occurrence:t,prodType:i,rule:n}),m=>L(m,T=>T[0]));if(LS(f)&&f[0][0]&&!o){let m=f[0],T=Tt(m);if(T.length===1&&se(T[0].categoryMatches)){let S=T[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===S}}else{let A=lt(T,(S,N)=>(N!==void 0&&(S[N.tokenTypeIdx]=!0,G(N.categoryMatches,C=>{S[C]=!0})),S),{});return function(){let S=this.LA(1);return A[S.tokenTypeIdx]===!0}}}return function(){let m=Eg.call(this,s,u,OS,a);return typeof m=="object"?!1:m===0}}};function LS(r,e=!0){let t=new Set;for(let n of r){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(t.has(a)){if(!i.has(a))return!1}else t.add(a),i.add(a)}}return!0}function cU(r){let e=r.decisionStates.length,t=Array(e);for(let n=0;n<e;n++)t[n]=aU(r.decisionStates[n],n);return t}function Eg(r,e,t,n){let i=r[e](t),o=i.start;if(o===void 0){let a=vU(i.atnStartState);o=qS(i,FS(a)),i.start=o}return lU.apply(this,[i,o,t,n])}function lU(r,e,t,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let c=hU(i,a);if(c===void 0&&(c=uU.apply(this,[r,i,a,o,t,n])),c===Kc)return mU(s,i,a);if(c.isAcceptState===!0)return c.prediction;i=c,s.push(a),a=this.LA(o++)}}function uU(r,e,t,n,i,o){let s=gU(e.configs,t,i);if(s.size===0)return MS(r,e,t,Kc),Kc;let a=FS(s),c=TU(s,i);if(c!==void 0)a.isAcceptState=!0,a.prediction=c,a.configs.uniqueAlt=c;else if(AU(s)){let l=uw(s.alts);a.isAcceptState=!0,a.prediction=l,a.configs.uniqueAlt=l,fU.apply(this,[r,n,s.alts,o])}return a=MS(r,e,t,a),a}function fU(r,e,t,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let o=r.atnStartState,s=o.rule,a=o.production,c=dU({topLevelRule:s,ambiguityIndices:t,production:a,prefixPath:i});n(c)}function dU(r){let e=L(r.prefixPath,i=>yi(i)).join(", "),t=r.production.idx===0?"":r.production.idx,n=`Ambiguous Alternatives Detected: <${r.ambiguityIndices.join(", ")}> in <${pU(r.production)}${t}> inside <${r.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function pU(r){if(r instanceof Ce)return"SUBRULE";if(r instanceof ke)return"OPTION";if(r instanceof Fe)return"OR";if(r instanceof Ve)return"AT_LEAST_ONE";if(r instanceof ze)return"AT_LEAST_ONE_SEP";if(r instanceof Me)return"MANY_SEP";if(r instanceof pe)return"MANY";if(r instanceof ae)return"CONSUME";throw Error("non exhaustive match")}function mU(r,e,t){let n=Zt(e.configs.elements,o=>o.state.transitions),i=yw(n.filter(o=>o instanceof ha).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:t,possibleTokenTypes:i,tokenPath:r}}function hU(r,e){return r.edges[e.tokenTypeIdx]}function gU(r,e,t){let n=new va,i=[];for(let s of r.elements){if(t.is(s.alt)===!1)continue;if(s.state.type===ya){i.push(s);continue}let a=s.state.transitions.length;for(let c=0;c<a;c++){let l=s.state.transitions[c],u=yU(l,e);u!==void 0&&n.add({state:u,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new va;for(let s of n.elements)yd(s,o)}if(i.length>0&&!RU(o))for(let s of i)o.add(s);return o}function yU(r,e){if(r instanceof ha&&_c(e,r.tokenType))return r.target}function TU(r,e){let t;for(let n of r.elements)if(e.is(n.alt)===!0){if(t===void 0)t=n.alt;else if(t!==n.alt)return}return t}function FS(r){return{configs:r,edges:{},isAcceptState:!1,prediction:-1}}function MS(r,e,t,n){return n=qS(r,n),e.edges[t.tokenTypeIdx]=n,n}function qS(r,e){if(e===Kc)return e;let t=e.configs.key,n=r.states[t];return n!==void 0?n:(e.configs.finalize(),r.states[t]=e,e)}function vU(r){let e=new va,t=r.transitions.length;for(let n=0;n<t;n++){let o={state:r.transitions[n].target,alt:n,stack:[]};yd(o,e)}return e}function yd(r,e){let t=r.state;if(t.type===ya){if(r.stack.length>0){let i=[...r.stack],s={state:i.pop(),alt:r.alt,stack:i};yd(s,e)}else e.add(r);return}t.epsilonOnlyTransitions||e.add(r);let n=t.transitions.length;for(let i=0;i<n;i++){let o=t.transitions[i],s=xU(r,o);s!==void 0&&yd(s,e)}}function xU(r,e){if(e instanceof Bc)return{state:e.target,alt:r.alt,stack:r.stack};if(e instanceof ga){let t=[...r.stack,e.followState];return{state:e.target,alt:r.alt,stack:t}}}function RU(r){for(let e of r.elements)if(e.state.type===ya)return!0;return!1}function bU(r){for(let e of r.elements)if(e.state.type!==ya)return!1;return!0}function AU(r){if(bU(r))return!0;let e=wU(r.elements);return SU(e)&&!CU(e)}function wU(r){let e=new Map;for(let t of r){let n=kg(t,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[t.alt]=!0}return e}function SU(r){for(let e of Array.from(r.values()))if(Object.keys(e).length>1)return!0;return!1}function CU(r){for(let e of Array.from(r.values()))if(Object.keys(e).length===1)return!0;return!1}var $g=de(co(),1);var Td=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new _g(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let t=new Rd;return t.grammarSource=e,t.root=this.rootNode,this.current.content.push(t),this.nodeStack.push(t),t}buildLeafNode(e,t){let n=new xd(e.startOffset,e.image.length,Ya(e),e.tokenType,!1);return n.grammarSource=t,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let t=e.container;if(t){let n=t.content.indexOf(e);n>=0&&t.content.splice(n,1)}}construct(e){let t=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=t;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let t of e){let n=new xd(t.startOffset,t.image.length,Ya(t),t.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,t){let{offset:n,end:i}=t;for(let o=0;o<e.content.length;o++){let s=e.content[o],{offset:a,end:c}=s;if(En(s)&&n>a&&i<c){this.addHiddenToken(s,t);return}else if(i<=a){e.content.splice(o,0,t);return}}e.content.push(t)}},vd=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,t;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(t=this.container)===null||t===void 0?void 0:t.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},xd=class extends vd{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,t,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=t,this._range=n}},Rd=class extends vd{constructor(){super(...arguments),this.content=new Ng(this)}get children(){return this.content}get offset(){var e,t;return(t=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&t!==void 0?t:0}get length(){return this.end-this.offset}get end(){var e,t;return(t=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&t!==void 0?t:0}get range(){let e=this.firstNonHiddenNode,t=this.lastNonHiddenNode;if(e&&t){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=t;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:$g.Position.create(0,0),end:$g.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let t=this.content[e];if(!t.hidden)return t}return this.content[this.content.length-1]}},Ng=class r extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,r.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,t,...n){return this.addParents(n),super.splice(e,t,...n)}addParents(e){for(let t of e)t.container=this.parent}},_g=class extends Rd{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var Pg=Symbol("Datatype");function Ig(r){return r.$type===Pg}var US="\u200B",GS=r=>r.endsWith(US)?r:r+US,bd=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let t=this.lexer.definition;this.wrapper=new Og(t,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,t){this.wrapper.wrapOr(e,t)}optional(e,t){this.wrapper.wrapOption(e,t)}many(e,t){this.wrapper.wrapMany(e,t)}atLeastOne(e,t){this.wrapper.wrapAtLeastOne(e,t)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},Ad=class extends bd{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new Td,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,t){let n=e.fragment?void 0:Fr(e)?Pg:mn(e),i=this.wrapper.DEFINE_RULE(GS(e.name),this.startImplementation(n,t).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let t=this.lexer.tokenize(e);this.wrapper.input=t.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(t.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:t.errors,parserErrors:this.wrapper.errors}}startImplementation(e,t){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===Pg&&(o.value="")}let i;try{i=t(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,t,n){let i=this.wrapper.wrapConsume(e,t);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:s,isCrossRef:a}=this.getAssignment(n),c=this.current;if(s){let l=pt(n)?i.image:this.converter.convert(i.image,o);this.assign(s.operator,s.feature,l,o,a)}else if(Ig(c)){let l=i.image;pt(n)||(l=this.converter.convert(l,o).toString()),c.value+=l}}}subrule(e,t,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let s=this.wrapper.wrapSubrule(e,t,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(s,n,o)}performSubruleAssignment(e,t,n){let{assignment:i,isCrossRef:o}=this.getAssignment(t);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(Ig(s))s.value+=e.toString();else{let a=e.$type,c=this.assignWithoutOverride(e,s);a&&(c.$type=a);let l=c;this.stack.pop(),this.stack.push(l)}}}action(e,t){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&t.feature&&t.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),t.feature&&t.operator&&this.assign(t.operator,t.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let t=this.current;return Jv(t),this.nodeBuilder.construct(t),e&&this.stack.pop(),Ig(t)?this.converter.convert(t.value,t.$cstNode):(this.assignMandatoryProperties(t),t)}assignMandatoryProperties(e){let t=this.astReflection.getTypeMetaData(e.$type);for(let n of t.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let t=Ie(e,Re);this.assignmentMap.set(e,{assignment:t,isCrossRef:t?zt(t.terminal):!1})}return this.assignmentMap.get(e)}assign(e,t,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,t,i,n):a=n,e){case"=":{s[t]=a;break}case"?=":{s[t]=!0;break}case"+=":Array.isArray(s[t])||(s[t]=[]),s[t].push(a)}}assignWithoutOverride(e,t){for(let[n,i]of Object.entries(t)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}},Dg=class{buildMismatchTokenMessage(e){return Ti.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return Ti.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return Ti.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return Ti.buildEarlyExitMessage(e)}},Vc=class extends Dg{buildMismatchTokenMessage({expected:e,actual:t}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${t.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},wd=class extends bd{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let t=this.lexer.tokenize(e);return this.tokens=t.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,t){let n=this.wrapper.DEFINE_RULE(GS(e.name),this.startImplementation(t).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return t=>{let n=this.keepStackSize();try{e(t)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,t,n){this.wrapper.wrapConsume(e,t),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,t,n,i){this.before(n),this.wrapper.wrapSubrule(e,t,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let t=this.elementStack.lastIndexOf(e);t>=0&&this.elementStack.splice(t)}}get currIdx(){return this.wrapper.currIdx}},kU={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new Vc},Og=class extends jc{constructor(e,t){let n=t&&"maxLookahead"in t;super(e,Object.assign(Object.assign(Object.assign({},kU),{lookaheadStrategy:n?new vi({maxLookahead:t.maxLookahead}):new Wc}),t))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,t){return this.RULE(e,t)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,t){return this.consume(e,t)}wrapSubrule(e,t,n){return this.subrule(e,t,{ARGS:[n]})}wrapOr(e,t){this.or(e,t)}wrapOption(e,t){this.option(e,t)}wrapMany(e,t){this.many(e,t)}wrapAtLeastOne(e,t){this.atLeastOne(e,t)}};var zc=class extends Error{constructor(e,t){super(e?`${t} at ${e.range.start.line}:${e.range.start.character}`:t)}};function Sd(r){throw new Error("Error! The input value was not handled.")}function kd(r,e,t){return EU({parser:e,tokens:t,rules:new Map,ruleNames:new Map},r),e}function EU(r,e){let t=Ts(e,!1),n=ie(e.rules).filter(B).filter(i=>t.has(i));for(let i of n){let o=Object.assign(Object.assign({},r),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,r.parser.rule(i,Lo(o,i.definition)))}}function Lo(r,e,t=!1){let n;if(pt(e))n=OU(r,e);else if(Ne(e))n=$U(r,e);else if(Re(e))n=Lo(r,e.terminal);else if(zt(e))n=jS(r,e);else if(_e(e))n=NU(r,e);else if(Pr(e))n=IU(r,e);else if(Dr(e))n=PU(r,e);else if(Ft(e))n=DU(r,e);else throw new zc(e.$cstNode,`Unexpected element type: ${e.$type}`);return HS(r,t?void 0:Cd(e),n,e.cardinality)}function $U(r,e){let t=mn(e);return()=>r.parser.action(t,e)}function NU(r,e){let t=e.rule.ref;if(B(t)){let n=r.subrule++,i=e.arguments.length>0?_U(t,e.arguments):()=>({});return o=>r.parser.subrule(n,BS(r,t),e,i(o))}else if(we(t)){let n=r.consume++,i=Lg(r,t.name);return()=>r.parser.consume(n,i,e)}else if(t)Sd(t);else throw new zc(e.$cstNode,`Undefined rule type: ${e.$type}`)}function _U(r,e){let t=e.map(n=>xi(n.value));return n=>{let i={};for(let o=0;o<t.length;o++){let s=r.parameters[o],a=t[o];i[s.name]=a(n)}return i}}function xi(r){if(gv(r)){let e=xi(r.left),t=xi(r.right);return n=>e(n)||t(n)}else if(mv(r)){let e=xi(r.left),t=xi(r.right);return n=>e(n)&&t(n)}else if(Rv(r)){let e=xi(r.value);return t=>!e(t)}else if(as(r)){let e=r.parameter.ref.name;return t=>t!==void 0&&t[e]===!0}else if(vv(r)){let e=!!r.true;return()=>e}Sd(r)}function IU(r,e){if(e.elements.length===1)return Lo(r,e.elements[0]);{let t=[];for(let i of e.elements){let o={ALT:Lo(r,i,!0)},s=Cd(i);s&&(o.GATE=xi(s)),t.push(o)}let n=r.or++;return i=>r.parser.alternatives(n,t.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function PU(r,e){if(e.elements.length===1)return Lo(r,e.elements[0]);let t=[];for(let a of e.elements){let c={ALT:Lo(r,a,!0)},l=Cd(a);l&&(c.GATE=xi(l)),t.push(c)}let n=r.or++,i=(a,c)=>{let l=c.getRuleStack().join("-");return`uGroup_${a}_${l}`},o=a=>r.parser.alternatives(n,t.map((c,l)=>{let u={ALT:()=>!0},f=r.parser;u.ALT=()=>{if(c.ALT(a),!f.isRecording()){let T=i(n,f);f.unorderedGroups.get(T)||f.unorderedGroups.set(T,[]);let A=f.unorderedGroups.get(T);typeof A?.[l]>"u"&&(A[l]=!0)}};let m=c.GATE;return m?u.GATE=()=>m(a):u.GATE=()=>{let T=f.unorderedGroups.get(i(n,f));return!T?.[l]},u})),s=HS(r,Cd(e),o,"*");return a=>{s(a),r.parser.isRecording()||r.parser.unorderedGroups.delete(i(n,r.parser))}}function DU(r,e){let t=e.elements.map(n=>Lo(r,n));return n=>t.forEach(i=>i(n))}function Cd(r){if(Ft(r))return r.guardCondition}function jS(r,e,t=e.terminal){if(t)if(_e(t)&&B(t.rule.ref)){let n=r.subrule++;return i=>r.parser.subrule(n,BS(r,t.rule.ref),e,i)}else if(_e(t)&&we(t.rule.ref)){let n=r.consume++,i=Lg(r,t.rule.ref.name);return()=>r.parser.consume(n,i,e)}else if(pt(t)){let n=r.consume++,i=Lg(r,t.value);return()=>r.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=mc(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+mn(e.type.ref));return jS(r,e,i)}}function OU(r,e){let t=r.consume++,n=r.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>r.parser.consume(t,n,e)}function HS(r,e,t,n){let i=e&&xi(e);if(!n)if(i){let o=r.or++;return s=>r.parser.alternatives(o,[{ALT:()=>t(s),GATE:()=>i(s)},{ALT:hd(),GATE:()=>!i(s)}])}else return t;if(n==="*"){let o=r.many++;return s=>r.parser.many(o,{DEF:()=>t(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=r.many++;if(i){let s=r.or++;return a=>r.parser.alternatives(s,[{ALT:()=>r.parser.atLeastOne(o,{DEF:()=>t(a)}),GATE:()=>i(a)},{ALT:hd(),GATE:()=>!i(a)}])}else return s=>r.parser.atLeastOne(o,{DEF:()=>t(s)})}else if(n==="?"){let o=r.optional++;return s=>r.parser.optional(o,{DEF:()=>t(s),GATE:i?()=>i(s):void 0})}else Sd(n)}function BS(r,e){let t=LU(r,e),n=r.rules.get(t);if(!n)throw new Error(`Rule "${t}" not found."`);return n}function LU(r,e){if(B(e))return e.name;if(r.ruleNames.has(e))return r.ruleNames.get(e);{let t=e,n=t.$container,i=e.$type;for(;!B(n);)(Ft(n)||Pr(n)||Dr(n))&&(i=n.elements.indexOf(t).toString()+":"+i),t=n,n=n.$container;return i=n.name+":"+i,r.ruleNames.set(e,i),i}}function Lg(r,e){let t=r.tokens[e];if(!t)throw new Error(`Token "${e}" not found."`);return t}function KS(r){let e=r.Grammar,t=r.parser.Lexer,n=new wd(r);return kd(e,n,t.definition),n.finalize(),n}function WS(r){let e=MU(r);return e.finalize(),e}function MU(r){let e=r.Grammar,t=r.parser.Lexer,n=new Ad(r);return kd(e,n,t.definition)}var Ed=class{buildTokens(e,t){let n=ie(Ts(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,t);return i.forEach(s=>{let a=s.PATTERN;typeof a=="object"&&a&&"test"in a&&mh(a)?o.unshift(s):o.push(s)}),o}buildTerminalTokens(e){return e.filter(we).filter(t=>!t.fragment).map(t=>this.buildTerminalToken(t)).toArray()}buildTerminalToken(e){let t=Yr(e),n=t.flags.includes("u")?this.regexPatternFunction(t):t,i={name:e.name,PATTERN:n,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=mh(t)?ht.SKIPPED:"hidden"),i}regexPatternFunction(e){let t=new RegExp(e,e.flags+"y");return(n,i)=>(t.lastIndex=i,t.exec(n))}buildKeywordTokens(e,t,n){return e.filter(B).flatMap(i=>Qe(i).filter(pt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,t,!!n?.caseInsensitive))}buildKeywordToken(e,t,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,t)}}buildKeywordPattern(e,t){return t?new RegExp(vx(e.value)):e.value}findLongerAlt(e,t){return t.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&xx("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var $d=class{convert(e,t){let n=t.grammarSource;if(zt(n)&&(n=$u(n)),_e(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,t)}return e}runConverter(e,t,n){var i;switch(e.name.toUpperCase()){case"INT":return GU(t);case"STRING":return FU(t);case"ID":return UU(t)}switch((i=wo(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return BU(t);case"boolean":return KU(t);case"bigint":return jU(t);case"date":return HU(t);default:return t}}};function FU(r){let e="";for(let t=1;t<r.length-1;t++){let n=r.charAt(t);if(n==="\\"){let i=r.charAt(++t);e+=qU(i)}else e+=n}return e}function qU(r){switch(r){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return r}}function UU(r){return r.charAt(0)==="^"?r.substring(1):r}function GU(r){return parseInt(r)}function jU(r){return BigInt(r)}function HU(r){return new Date(r)}function BU(r){return Number(r)}function KU(r){return r.toLowerCase()==="true"}var VS=de(Ae(),1);var Nd=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,t=VS.CancellationToken.None){for(let n of ri(e.parseResult.value))await Ze(t),iu(n).forEach(i=>this.doLink(i,e))}doLink(e,t){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if(rs(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}t.references.push(n)}unlink(e){for(let t of e.references)delete t._ref,delete t._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,t,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if(Et(this._ref))return this._ref;if(ZT(this._nodeDescription)){let c=o.loadAstNode(this._nodeDescription);this._ref=c??o.createLinkingError({reference:s,container:e,property:t},this._nodeDescription)}else if(this._ref===void 0){let c=o.getLinkedNode({reference:s,container:e,property:t});if(c.error&&ne(e).state<je.ComputedScopes)return;this._ref=(a=c.node)!==null&&a!==void 0?a:c.error,this._nodeDescription=c.descr}return Et(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return rs(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){try{let t=this.getCandidate(e);if(rs(t))return{error:t};let n=this.loadAstNode(t);return n?{node:n,descr:t}:{descr:t,error:this.createLinkingError(e,t)}}catch(t){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${t}`})}}}loadAstNode(e){if(e.node)return e.node;let t=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(t.parseResult.value,e.path)}createLinkingError(e,t){let n=ne(e.container);n.state<je.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:t})}};function XS(r){return typeof r.$comment=="string"}function zS(r){return typeof r=="object"&&!!r&&("$ref"in r||"$error"in r)}var _d=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,t){let n=t?.replacer,i=(s,a)=>this.replacer(s,a,t);return JSON.stringify(e,n?(s,a)=>n(s,a,i):i,t?.space)}deserialize(e){let t=JSON.parse(e);return this.linkNode(t,t),t}replacer(e,t,{refText:n,sourceText:i,textRegions:o,comments:s}={}){var a,c,l;if(!this.ignoreProperties.has(e))if(Zn(t)){let u=t.ref,f=n?t.$refText:void 0;return u?{$refText:f,$ref:"#"+(u&&this.astNodeLocator.getAstNodePath(u))}:{$refText:f,$error:(c=(a=t.error)===null||a===void 0?void 0:a.message)!==null&&c!==void 0?c:"Could not resolve reference"}}else{let u;if(o&&Et(t)&&(u=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},t)),(!e||t.$document)&&u?.$textRegion))try{u.$textRegion.documentURI=ne(t).uri.toString()}catch{}return i&&!e&&Et(t)&&(u??(u=Object.assign({},t)),u.$sourceText=(l=t.$cstNode)===null||l===void 0?void 0:l.text),s&&Et(t)&&(u??(u=Object.assign({},t)),u.$comment=this.commentProvider.getComment(t)),u??t}}addAstNodeRegionWithAssignmentsTo(e){let t=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=t(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=_i(e.$cstNode,o).map(t);s.length!==0&&(i[o]=s)}),e}}linkNode(e,t,n,i,o){for(let[a,c]of Object.entries(e))if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];zS(u)?c[l]=this.reviveReference(e,a,t,u):Et(u)&&this.linkNode(u,t,e,a,l)}else zS(c)?e[a]=this.reviveReference(e,a,t,c):Et(c)&&this.linkNode(c,t,e,a);let s=e;s.$container=n,s.$containerProperty=i,s.$containerIndex=o}reviveReference(e,t,n,i){let o=i.$refText;if(i.$ref){let s=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(s)),{$refText:o??"",ref:s}}else if(i.$error){let s={$refText:o??""};return s.error={container:e,property:t,message:i.$error,reference:s},s}else return}getRefNode(e,t){return this.astNodeLocator.getAstNode(e,t.substring(1))}};var Id=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let t of this.singleton.LanguageMetaData.fileExtensions)this.map[t]=this.singleton;this.singleton=void 0}for(let t of e.LanguageMetaData.fileExtensions)this.map[t]!==void 0&&this.map[t]!==e&&console.warn(`The file extension ${t} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[t]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let t=ve.extname(e),n=this.map[t];if(!n)throw new Error(`The service registry contains no services for the extension '${t}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};var YS=de(Ae(),1);var Pd=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,t,n=ne(e)){t??(t=this.nameProvider.getName(e));let i=this.astNodeLocator.getAstNodePath(e);if(!t)throw new Error(`Node at path ${i} has no name.`);let o,s=()=>{var a;return o??(o=ir((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:t,get nameSegment(){return s()},selectionSegment:ir(e.$cstNode),type:e.$type,documentUri:n.uri,path:i}}},Dd=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,t=YS.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of ri(i))await Ze(t),iu(o).filter(s=>!rs(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let t=e.reference.$nodeDescription,n=e.reference.$refNode;if(!t||!n)return;let i=ne(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:t.documentUri,targetPath:t.path,segment:ir(n),local:ve.equals(t.documentUri,i)}}};var Od=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let t=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return t+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:t}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return t!==void 0?e+this.indexSeparator+t:e}getAstNode(e,t){return t.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),c=parseInt(o.substring(s+1)),l=i[a];return l?.[c]}return i[o]},e)}};var JS=de(Ct(),1),Ld=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(t=>{var n,i;this.workspaceConfig=(i=(n=t.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(t=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(JS.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let t=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(t);t.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(t=>{this.updateSectionConfiguration(t,e.settings[t])})}updateSectionConfiguration(e,t){this.settings[e]=t}async getConfiguration(e,t){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][t]}toSectionName(e){return`${e}`}};var xa=de(Ae(),1);var Md=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Le,this.buildState=new Map,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,t={},n=xa.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===je.Validated){if(typeof t.validation=="boolean"&&t.validation)s.state=je.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof t.validation=="object"){let c=this.buildState.get(a),l=(i=c?.result)===null||i===void 0?void 0:i.validationChecks;if(l){let f=((o=t.validation.categories)!==null&&o!==void 0?o:hs.all).filter(m=>!l.includes(m));f.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},t.validation),{categories:f})},result:c.result}),s.state=je.IndexedReferences)}}}else this.buildState.delete(a)}await this.buildDocuments(e,t,n)}async update(e,t,n=xa.CancellationToken.None){for(let s of t)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString());this.indexManager.remove(t);for(let s of e)this.langiumDocuments.invalidateDocument(s)||this.langiumDocuments.getOrCreateDocument(s),this.buildState.delete(s.toString());let i=ie(e).concat(t).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,je.ComputedScopes),s.diagnostics=void 0});for(let s of this.updateListeners)s(e,t);await Ze(n);let o=this.langiumDocuments.all.filter(s=>{var a;return s.state<je.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray();await this.buildDocuments(o,this.updateBuildOptions,n)}shouldRelink(e,t){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,t)}onUpdate(e){return this.updateListeners.push(e),xa.Disposable.create(()=>{let t=this.updateListeners.indexOf(e);t>=0&&this.updateListeners.splice(t,1)})}async buildDocuments(e,t,n){this.prepareBuild(e,t),await this.runCancelable(e,je.Parsed,n,o=>{this.langiumDocumentFactory.update(o)}),await this.runCancelable(e,je.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,je.ComputedScopes,n,async o=>{let s=this.serviceRegistry.getServices(o.uri).references.ScopeComputation;o.precomputedScopes=await s.computeLocalScopes(o,n)}),await this.runCancelable(e,je.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,je.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o));await this.runCancelable(i,je.Validated,n,o=>this.validate(o,n));for(let o of e){let s=this.buildState.get(o.uri.toString());s&&(s.completed=!0)}}prepareBuild(e,t){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:t,result:o?.result})}}async runCancelable(e,t,n,i){let o=e.filter(s=>s.state<t);for(let s of o)await Ze(n),await i(s),s.state=t;await this.notifyBuildPhase(o,t,n)}onBuildPhase(e,t){return this.buildPhaseListeners.add(e,t),xa.Disposable.create(()=>{this.buildPhaseListeners.delete(e,t)})}async notifyBuildPhase(e,t,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(t);for(let o of i)await Ze(n),await o(e,n)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,t){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,c=await o.validateDocument(e,a,t);e.diagnostics?e.diagnostics.push(...c):e.diagnostics=c;let l=this.buildState.get(e.uri.toString());if(l){(n=l.result)!==null&&n!==void 0||(l.result={});let u=(i=a?.categories)!==null&&i!==void 0?i:hs.all;l.result.validationChecks?l.result.validationChecks.push(...u):l.result.validationChecks=[...u]}}getBuildOptions(e){var t,n;return(n=(t=this.buildState.get(e.uri.toString()))===null||t===void 0?void 0:t.options)!==null&&n!==void 0?n:{}}};var Mg=de(Ae(),1);var Fd=class{constructor(e){this.simpleIndex=new Map,this.simpleTypeIndex=new bu,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,t){let n=ne(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{ve.equals(s.targetUri,n)&&s.targetPath===t&&i.push(s)})}),ie(i)}allElements(e,t){let n=ie(this.simpleIndex.keys());return t&&(n=n.filter(i=>!t||t.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,t){var n;return t?this.simpleTypeIndex.get(e,t,()=>{var o;return((o=this.simpleIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,t))}):(n=this.simpleIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){for(let t of e){let n=t.toString();this.simpleIndex.delete(n),this.simpleTypeIndex.clear(n),this.referenceIndex.delete(n)}}async updateContent(e,t=Mg.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,t);for(let s of i)s.node=void 0;let o=e.uri.toString();this.simpleIndex.set(o,i),this.simpleTypeIndex.clear(o)}async updateReferences(e,t=Mg.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,t);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,t){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&t.has(i.targetUri.toString())):!1}};var QS=de(Ae(),1);var qd=class{constructor(e){this.initialBuildOptions={},this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(t=>{var n;this.folders=(n=t.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(t=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,t=QS.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,o))),await Ze(t),await this.documentBuilder.build(i,this.initialBuildOptions,t)}loadAdditionalDocuments(e,t){return Promise.resolve()}getRootFolder(e){return Jt.parse(e.uri)}async traverseFolder(e,t,n,i){let o=await this.fileSystemProvider.readDirectory(t);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,t,n){let i=ve.basename(t.uri);if(i.startsWith("."))return!1;if(t.isDirectory)return i!=="node_modules"&&i!=="out";if(t.isFile){let o=ve.extname(t.uri);return n.includes(o)}return!1}};var Ud=class{constructor(e){let t=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(t);let n=ZS(t)?Object.values(t):t;this.chevrotainLexer=new ht(n,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var t;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(t=n.groups.hidden)!==null&&t!==void 0?t:[]}}toTokenTypeDictionary(e){if(ZS(e))return e;let t=eC(e)?Object.values(e.modes).flat():e,n={};return t.forEach(i=>n[i.name]=i),n}};function WU(r){return Array.isArray(r)&&(r.length===0||"name"in r[0])}function eC(r){return r&&"modes"in r&&"defaultMode"in r}function ZS(r){return!WU(r)&&!eC(r)}var be=de(Ae(),1);function nC(r,e,t){let n,i;typeof r=="string"?(i=e,n=t):(i=r.range.start,n=e),i||(i=be.Position.create(0,0));let o=oC(r),s=Ug(n),a=zU({lines:o,position:i,options:s});return ZU({index:0,tokens:a,position:i})}function iC(r,e){let t=Ug(e),n=oC(r);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=t.start,a=t.end;return!!s?.exec(i)&&!!a?.exec(o)}function oC(r){let e="";return typeof r=="string"?e=r:e=r.text,e.split(ec)}var tC=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,VU=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function zU(r){var e,t,n;let i=[],o=r.position.line,s=r.position.character;for(let a=0;a<r.lines.length;a++){let c=a===0,l=a===r.lines.length-1,u=r.lines[a],f=0;if(c&&r.options.start){let T=(e=r.options.start)===null||e===void 0?void 0:e.exec(u);T&&(f=T.index+T[0].length)}else{let T=(t=r.options.line)===null||t===void 0?void 0:t.exec(u);T&&(f=T.index+T[0].length)}if(l){let T=(n=r.options.end)===null||n===void 0?void 0:n.exec(u);T&&(u=u.substring(0,T.index))}if(u=u.substring(0,QU(u)),qg(u,0)>=u.length){if(i.length>0){let T=be.Position.create(o,s);i.push({type:"break",content:"",range:be.Range.create(T,T)})}}else{tC.lastIndex=f;let T=tC.exec(u);if(T){let A=T[0],S=T[1],N=be.Position.create(o,s+f),C=be.Position.create(o,s+f+A.length);i.push({type:"tag",content:S,range:be.Range.create(N,C)}),f+=A.length,f=qg(u,f)}if(f<u.length){let A=u.substring(f),S=Array.from(A.matchAll(VU));i.push(...XU(S,A,o,s+f))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function XU(r,e,t,n){let i=[];if(r.length===0){let o=be.Position.create(t,n),s=be.Position.create(t,n+e.length);i.push({type:"text",content:e,range:be.Range.create(o,s)})}else{let o=0;for(let a of r){let c=a.index,l=e.substring(o,c);l.length>0&&i.push({type:"text",content:e.substring(o,c),range:be.Range.create(be.Position.create(t,o+n),be.Position.create(t,c+n))});let u=l.length+1,f=a[1];if(i.push({type:"inline-tag",content:f,range:be.Range.create(be.Position.create(t,o+u+n),be.Position.create(t,o+u+f.length+n))}),u+=f.length,a.length===4){u+=a[2].length;let m=a[3];i.push({type:"text",content:m,range:be.Range.create(be.Position.create(t,o+u+n),be.Position.create(t,o+u+m.length+n))})}else i.push({type:"text",content:"",range:be.Range.create(be.Position.create(t,o+u+n),be.Position.create(t,o+u+n))});o=c+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:be.Range.create(be.Position.create(t,o+n),be.Position.create(t,o+n+s.length))})}return i}var YU=/\S/,JU=/\s*$/;function qg(r,e){let t=r.substring(e).match(YU);return t?e+t.index:r.length}function QU(r){let e=r.match(JU);if(e&&typeof e.index=="number")return e.index}function ZU(r){var e,t,n,i;let o=be.Position.create(r.position.line,r.position.character);if(r.tokens.length===0)return new Gd([],be.Range.create(o,o));let s=[];for(;r.index<r.tokens.length;){let l=eG(r,s[s.length-1]);l&&s.push(l)}let a=(t=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&t!==void 0?t:o,c=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new Gd(s,be.Range.create(a,c))}function eG(r,e){let t=r.tokens[r.index];if(t.type==="tag")return aC(r,!1);if(t.type==="text"||t.type==="inline-tag")return sC(r);tG(t,e),r.index++}function tG(r,e){if(e){let t=new jd("",r.range);"inlines"in e?e.inlines.push(t):e.content.inlines.push(t)}}function sC(r){let e=r.tokens[r.index],t=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(rG(r)),n=e,e=r.tokens[r.index];return new Yc(i,be.Range.create(t.range.start,n.range.end))}function rG(r){return r.tokens[r.index].type==="inline-tag"?aC(r,!0):cC(r)}function aC(r,e){let t=r.tokens[r.index++],n=t.content.substring(1),i=r.tokens[r.index];if(i?.type==="text")if(e){let o=cC(r);return new Xc(n,new Yc([o],o.range),e,be.Range.create(t.range.start,o.range.end))}else{let o=sC(r);return new Xc(n,o,e,be.Range.create(t.range.start,o.range.end))}else{let o=t.range;return new Xc(n,new Yc([],o),e,o)}}function cC(r){let e=r.tokens[r.index++];return new jd(e.content,e.range)}function Ug(r){if(!r)return Ug({start:"/**",end:"*/",line:"*"});let{start:e,end:t,line:n}=r;return{start:Fg(e,!0),end:Fg(t,!1),line:Fg(n,!0)}}function Fg(r,e){if(typeof r=="string"||typeof r=="object"){let t=typeof r=="string"?oi(r):r.source;return e?new RegExp(`^\\s*${t}`):new RegExp(`\\s*${t}\\s*$`)}else return r}var Gd=class{constructor(e,t){this.elements=e,this.range=t}getTag(e){return this.getAllTags().find(t=>t.name===e)}getTags(e){return this.getAllTags().filter(t=>t.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let t of this.elements)if(e.length===0)e=t.toString();else{let n=t.toString();e+=rC(e)+n}return e.trim()}toMarkdown(e){let t="";for(let n of this.elements)if(t.length===0)t=n.toMarkdown(e);else{let i=n.toMarkdown(e);t+=rC(t)+i}return t.trim()}},Xc=class{constructor(e,t,n,i){this.name=e,this.content=t,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,t=this.content.toString();return this.content.inlines.length===1?e=`${e} ${t}`:this.content.inlines.length>1&&(e=`${e}
${t}`),this.inline?`{${e}}`:e}toMarkdown(e){let t=this.content.toMarkdown(e);if(this.inline){let o=nG(this.name,t,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${t}`:this.content.inlines.length>1&&(i=`${i}
${t}`),this.inline?`{${i}}`:i}};function nG(r,e,t){var n,i;if(r==="linkplain"||r==="linkcode"||r==="link"){let o=e.indexOf(" "),s=e;if(o>0){let c=qg(e,o);s=e.substring(c),e=e.substring(0,o)}return(r==="linkcode"||r==="link"&&t.link==="code")&&(s=`\`${s}\``),(i=(n=t.renderLink)===null||n===void 0?void 0:n.call(t,e,s))!==null&&i!==void 0?i:iG(e,s)}}function iG(r,e){try{return Jt.parse(r,!0),`[${e}](${r})`}catch{return r}}var Yc=class{constructor(e,t){this.inlines=e,this.range=t}toString(){let e="";for(let t=0;t<this.inlines.length;t++){let n=this.inlines[t],i=this.inlines[t+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let t="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];t+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(t+=`
`)}return t}},jd=class{constructor(e,t){this.text=e,this.range=t}toString(){return this.text}toMarkdown(){return this.text}};function rC(r){return r.endsWith(`
`)?`
`:`

`}var Hd=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let t=this.commentProvider.getComment(e);if(t&&iC(t))return nC(t).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,t,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,t))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,t);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,c=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${c.toString()})`}else return}findNameInPrecomputedScopes(e,t){let i=ne(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(c=>c.name===t);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,t){return this.indexManager.allElements().find(i=>i.name===t)}};var Bd=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var t;return XS(e)?e.$comment:(t=ov(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||t===void 0?void 0:t.text}};function xc(r){return{documentation:{CommentProvider:e=>new Bd(e),DocumentationProvider:e=>new Hd(e)},parser:{GrammarConfig:e=>AR(e),LangiumParser:e=>WS(e),CompletionParser:e=>KS(e),ValueConverter:()=>new $d,TokenBuilder:()=>new Ed,Lexer:e=>new Ud(e),ParserErrorMessageProvider:()=>new Vc},lsp:{CompletionProvider:e=>new ks(e),DocumentSymbolProvider:e=>new ju(e),HoverProvider:e=>new Ku(e),FoldingRangeProvider:e=>new $s(e),ReferencesProvider:e=>new Ju(e),DefinitionProvider:e=>new Is(e),DocumentHighlightProvider:e=>new Gu(e),RenameProvider:e=>new Qu(e)},workspace:{AstNodeLocator:()=>new Od,AstNodeDescriptionProvider:e=>new Pd(e),ReferenceDescriptionProvider:e=>new Dd(e)},references:{Linker:e=>new Nd(e),NameProvider:()=>new ps,ScopeProvider:e=>new Ss(e),ScopeComputation:e=>new ws(e),References:e=>new Ns(e)},serializer:{JsonSerializer:e=>new _d(e)},validation:{DocumentValidator:e=>new Cu(e),ValidationRegistry:e=>new yu(e)},shared:()=>r.shared}}function Rc(r){return{ServiceRegistry:()=>new Id,lsp:{Connection:()=>r.connection,LanguageServer:e=>new zu(e),WorkspaceSymbolProvider:e=>new Zu(e),NodeKindProvider:()=>new Xu,FuzzyMatcher:()=>new Bu},workspace:{LangiumDocuments:e=>new Vu(e),LangiumDocumentFactory:e=>new Wu(e),DocumentBuilder:e=>new Md(e),TextDocuments:()=>new lC.TextDocuments(ts),IndexManager:e=>new Fd(e),WorkspaceManager:e=>new qd(e),FileSystemProvider:e=>r.fileSystemProvider(e),MutexLock:()=>new gu,ConfigurationProvider:e=>new Ld(e)}}}var Sa=de(fC(),1);var dC="Condition";var pC="Expression";var mC="Statement";var oG="Type";var sG="Unit";var hC="ArithmeticCondition";var gC="BoolCondition";var yC="ArithmeticExpression";var TC="BoolExpression";var vC="RobotFunc";var aG="AssignVar";var xC="ControlStructure";var cG="declaVar";var lG="FunCall";var uG="Return";var Gg="RobotLogic";var fG="Bool";var dG="Nbr";var pG="Void";var mG="cm";var hG="mm";var RC="Comparison";var gG="And";var yG="EqualBool";var TG="NotEqualBool";var vG="Or";var Kd="SingleValueBool";var xG="AddExpression";var RG="ArithmeticOperation";var bG="MultExpression";var Wd="SingleValue";var AG="getDistance";var wG="getTimestamp";var SG="setSpeed";var CG="If";var kG="Loop";var bC="Movement";var EG="Rotation";var $G="EqualInt";var NG="Greater";var _G="Lower";var IG="NotEqualInt";var PG="ConstBool";var DG="Var";var OG="ConstInt";var LG="Back";var MG="Front";var FG="LeftSide";var qG="RightSide";var Jc=class extends po{getAllTypes(){return["AddExpression","And","ArithmeticCondition","ArithmeticExpression","ArithmeticOperation","AssignVar","Back","Bool","BoolCondition","BoolExpression","Comparison","Condition","ConstBool","ConstInt","ControlStructure","Else","Elseif","EqualBool","EqualInt","Expression","Front","FunCall","Func","Greater","If","LeftSide","Loop","Lower","Movement","MultExpression","Nbr","NotEqualBool","NotEqualInt","Or","Parameter","Program","Return","RightSide","RobotFunc","RobotLogic","Rotation","SingleValue","SingleValueBool","Statement","Type","Unit","Var","Void","cm","declaVar","getDistance","getTimestamp","mm","setSpeed"]}computeIsSubtype(e,t){switch(e){case xG:case RG:case bG:case Wd:return this.isSubtype(yC,t);case gG:case yG:case TG:case vG:case Kd:return this.isSubtype(gC,t);case hC:return this.isSubtype(dC,t);case yC:case TC:return this.isSubtype(pC,t);case aG:case xC:case cG:case uG:case Gg:return this.isSubtype(mC,t);case LG:case MG:case FG:case qG:return this.isSubtype(bC,t);case fG:case dG:case pG:return this.isSubtype(oG,t);case gC:return this.isSubtype(TC,t)||this.isSubtype(dC,t);case mG:case hG:return this.isSubtype(sG,t);case RC:return this.isSubtype(hC,t);case PG:return this.isSubtype(Kd,t);case OG:return this.isSubtype(Wd,t);case $G:case NG:case _G:case IG:return this.isSubtype(RC,t);case lG:return this.isSubtype(Wd,t)||this.isSubtype(Kd,t)||this.isSubtype(mC,t);case AG:case wG:case SG:return this.isSubtype(vC,t);case CG:case kG:return this.isSubtype(xC,t);case bC:case EG:return this.isSubtype(Gg,t);case vC:return this.isSubtype(pC,t)||this.isSubtype(Gg,t);case DG:return this.isSubtype(Wd,t)||this.isSubtype(Kd,t);default:return!1}}getReferenceType(e){let t=`${e.container.$type}:${e.property}`;switch(t){default:throw new Error(`${t} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Else":return{name:"Else",mandatory:[{name:"statement",type:"array"}]};case"Elseif":return{name:"Elseif",mandatory:[{name:"statement",type:"array"}]};case"Func":return{name:"Func",mandatory:[{name:"parameter",type:"array"},{name:"statement",type:"array"}]};case"Program":return{name:"Program",mandatory:[{name:"Func",type:"array"}]};case"ArithmeticCondition":return{name:"ArithmeticCondition",mandatory:[{name:"arithmeticexpression",type:"array"}]};case"ControlStructure":return{name:"ControlStructure",mandatory:[{name:"statement",type:"array"}]};case"FunCall":return{name:"FunCall",mandatory:[{name:"parameters",type:"array"}]};case"And":return{name:"And",mandatory:[{name:"condition",type:"array"}]};case"EqualBool":return{name:"EqualBool",mandatory:[{name:"singlevaluebool",type:"array"}]};case"NotEqualBool":return{name:"NotEqualBool",mandatory:[{name:"singlevaluebool",type:"array"}]};case"Or":return{name:"Or",mandatory:[{name:"condition",type:"array"}]};case"AddExpression":return{name:"AddExpression",mandatory:[{name:"multexpression",type:"array"}]};case"MultExpression":return{name:"MultExpression",mandatory:[{name:"singlevalue",type:"array"}]};case"If":return{name:"If",mandatory:[{name:"elseif",type:"array"}]};case"ConstBool":return{name:"ConstBool",mandatory:[{name:"BoolValue",type:"boolean"}]};default:return{name:e,mandatory:[]}}}},Qce=new Jc;var Vd,AC=()=>Vd??(Vd=hu(`{
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
                "$ref": "#/rules@50"
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
                "$ref": "#/rules@50"
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
                "$ref": "#/rules@50"
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
                    "$ref": "#/rules@50"
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
}`));var UG={languageId:"ase-robot",fileExtensions:[".rob"],caseInsensitive:!1},wC={AstReflection:()=>new Jc},SC={Grammar:()=>AC(),LanguageMetaData:()=>UG,parser:{}};var zd=class{constructor(e,t,n){this.name=e,this.parameters=t,this.returnType=n}};function CC(r){let e=r.validation.ValidationRegistry,t=r.validation.AseRobotValidator,n={Program:t.checkProgram,Func:t.checkFunction};e.register(n,t)}var Xd=class{constructor(){this.vars=new Map}checkFunctions(e,t){let n=new Map,i=e.Func;for(let o of i){for(let a of n.values())a.name===o.name&&t("error","Function already exists",{node:o,property:"name"});let s=new Map;for(let a of o.parameter)s.set(a.name,a.type);n.set(o.name,new zd(o.name,s,o.type))}for(let o of i)for(let s of o.statement)if(this.isFunCall(s)){let a=!1;for(let c of n.values())s.callName===c.name&&(a=!0);if(!a)t("error","Function doesnt exist",{node:s,property:"callName"});else{let c=n.get(s.callName);c?.parameters.size!=s.parameters.length&&t("error","Wrong number of arguments",{node:s,property:"parameters"})}}}checkProgram(e,t){this.checkFunctions(e,t)}isDeclaVar(e){return"declaName"in e}isFunCall(e){return"callName"in e}isAssignVar(e){return"var_to_assign"in e}checkAssignVarExist(e,t){let n=[];for(let i of e.statement)if(this.isAssignVar(i)){let o=!1;for(let s of n)i.var_to_assign.name===s.declaName&&(o=!0);for(let s of e.parameter)i.var_to_assign.name===s.name&&(o=!0);o||t("error","Variable doesnt exist",{node:i,property:"var_to_assign"})}else this.isDeclaVar(i)&&n.push(i)}checkDeclaVar(e,t){let n=[],i=[];for(let o of e.statement)this.isDeclaVar(o)&&i.push(o);for(let o of i){let s=!1;for(let a of n)o.declaName===a&&(t("error","Variable already exists",{node:o,property:"declaName"}),s=!0);s||n.push(o.declaName)}}checkFunction(e,t){this.checkAssignVarExist(e,t),this.checkDeclaVar(e,t)}variableExists(e){for(let t of this.vars.keys())if(t===e)return!0;return!1}};function kC(r){let e=r.validation.ValidationRegistry,t=r.validation.AseRobotAcceptWeaver;e.register(t.checks,t)}var Yd=class{constructor(){this.checks={Else:this.weaveElse,Elseif:this.weaveElseif,Func:this.weaveFunc,Program:this.weaveProgram,FunCall:this.weaveFunCall,AssignVar:this.weaveAssignVar,declaVar:this.weavedeclaVar,Return:this.weaveReturn,And:this.weaveAnd,Or:this.weaveOr,EqualBool:this.weaveEqualBool,NotEqualBool:this.weaveNotEqualBool,getDistance:this.weavegetDistance,getTimestamp:this.weavegetTimestamp,setSpeed:this.weavesetSpeed,If:this.weaveIf,Loop:this.weaveLoop,Rotation:this.weaveRotation,EqualInt:this.weaveEqualInt,NotEqualInt:this.weaveNotEqualInt,Greater:this.weaveGreater,Lower:this.weaveLower,ConstBool:this.weaveConstBool,Var:this.weaveVar,ConstInt:this.weaveConstInt,Back:this.weaveBack,Front:this.weaveFront,LeftSide:this.weaveLeftSide,RightSide:this.weaveRightSide,AddExpression:this.weaveAddExpression,MultExpression:this.weaveMultExpression,mm:this.weaveMm,cm:this.weaveCm,Parameter:this.weaveParam}}weaveMm(e){e.accept=t=>t.visitMm(e)}weaveCm(e){e.accept=t=>t.visitCm(e)}weaveElse(e){e.accept=t=>t.visitElse(e)}weaveElseif(e){e.accept=t=>t.visitElseif(e)}weaveAddExpression(e){e.accept=t=>t.visitAddExpression(e)}weaveOr(e){e.accept=t=>t.visitOr(e)}weaveParam(e){e.accept=t=>t.visitParam(e)}weaveMultExpression(e){e.accept=t=>t.visitMultExpression(e)}weaveFunc(e){e.accept=t=>t.visitFunc(e)}weaveProgram(e){e.accept=t=>t.visitProgram(e)}weaveFunCall(e){e.accept=t=>t.visitFunCall(e)}weaveAssignVar(e){e.accept=t=>t.visitAssignVar(e)}weavedeclaVar(e){e.accept=t=>t.visitdeclaVar(e)}weaveReturn(e){e.accept=t=>t.visitReturn(e)}weaveAnd(e){e.accept=t=>t.visitAnd(e)}weaveEqualBool(e){e.accept=t=>t.visitEqualBool(e)}weaveNotEqualBool(e){e.accept=t=>t.visitNotEqualBool(e)}weavegetDistance(e){e.accept=t=>t.visitgetDistance(e)}weavegetTimestamp(e){e.accept=t=>t.visitgetTimestamp(e)}weavesetSpeed(e){e.accept=t=>t.visitsetSpeed(e)}weaveIf(e){e.accept=t=>t.visitIf(e)}weaveLoop(e){e.accept=t=>t.visitLoop(e)}weaveRotation(e){e.accept=t=>t.visitRotation(e)}weaveEqualInt(e){e.accept=t=>t.visitEqualInt(e)}weaveNotEqualInt(e){e.accept=t=>t.visitNotEqualInt(e)}weaveGreater(e){e.accept=t=>t.visitGreater(e)}weaveLower(e){e.accept=t=>t.visitLower(e)}weaveConstBool(e){e.accept=t=>t.visitConstBool(e)}weaveVar(e){e.accept=t=>t.visitVar(e)}weaveConstInt(e){e.accept=t=>t.visitConstInt(e)}weaveBack(e){e.accept=t=>t.visitBack(e)}weaveFront(e){e.accept=t=>t.visitFront(e)}weaveLeftSide(e){e.accept=t=>t.visitLeftSide(e)}weaveRightSide(e){e.accept=t=>t.visitRightSide(e)}};var EC=(r=0)=>e=>`\x1B[${e+r}m`,$C=(r=0)=>e=>`\x1B[${38+r};5;${e}m`,NC=(r=0)=>(e,t,n)=>`\x1B[${38+r};2;${e};${t};${n}m`,nt={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}},lle=Object.keys(nt.modifier),GG=Object.keys(nt.color),jG=Object.keys(nt.bgColor),ule=[...GG,...jG];function HG(){let r=new Map;for(let[e,t]of Object.entries(nt)){for(let[n,i]of Object.entries(t))nt[n]={open:`\x1B[${i[0]}m`,close:`\x1B[${i[1]}m`},t[n]=nt[n],r.set(i[0],i[1]);Object.defineProperty(nt,e,{value:t,enumerable:!1})}return Object.defineProperty(nt,"codes",{value:r,enumerable:!1}),nt.color.close="\x1B[39m",nt.bgColor.close="\x1B[49m",nt.color.ansi=EC(),nt.color.ansi256=$C(),nt.color.ansi16m=NC(),nt.bgColor.ansi=EC(10),nt.bgColor.ansi256=$C(10),nt.bgColor.ansi16m=NC(10),Object.defineProperties(nt,{rgbToAnsi256:{value(e,t,n){return e===t&&t===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(t/255*5)+Math.round(n/255*5)},enumerable:!1},hexToRgb:{value(e){let t=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!t)return[0,0,0];let[n]=t;n.length===3&&(n=[...n].map(o=>o+o).join(""));let i=Number.parseInt(n,16);return[i>>16&255,i>>8&255,i&255]},enumerable:!1},hexToAnsi256:{value:e=>nt.rgbToAnsi256(...nt.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return 90+(e-8);let t,n,i;if(e>=232)t=((e-232)*10+8)/255,n=t,i=t;else{e-=16;let a=e%36;t=Math.floor(e/36)/5,n=Math.floor(a/6)/5,i=a%6/5}let o=Math.max(t,n,i)*2;if(o===0)return 30;let s=30+(Math.round(i)<<2|Math.round(n)<<1|Math.round(t));return o===2&&(s+=60),s},enumerable:!1},rgbToAnsi:{value:(e,t,n)=>nt.ansi256ToAnsi(nt.rgbToAnsi256(e,t,n)),enumerable:!1},hexToAnsi:{value:e=>nt.ansi256ToAnsi(nt.hexToAnsi256(e)),enumerable:!1}}),nt}var BG=HG(),xn=BG;var Jd=(()=>{if(navigator.userAgentData){let r=navigator.userAgentData.brands.find(({brand:e})=>e==="Chromium");if(r&&r.version>93)return 3}return/\b(Chrome|Chromium)\//.test(navigator.userAgent)?1:0})(),_C=Jd!==0&&{level:Jd,hasBasic:!0,has256:Jd>=2,has16m:Jd>=3},KG={stdout:_C,stderr:_C},IC=KG;function PC(r,e,t){let n=r.indexOf(e);if(n===-1)return r;let i=e.length,o=0,s="";do s+=r.slice(o,n)+e+t,o=n+i,n=r.indexOf(e,o);while(n!==-1);return s+=r.slice(o),s}function DC(r,e,t,n){let i=0,o="";do{let s=r[n-1]==="\r";o+=r.slice(i,s?n-1:n)+e+(s?`\r
`:`
`)+t,i=n+1,n=r.indexOf(`
`,i)}while(n!==-1);return o+=r.slice(i),o}var{stdout:OC,stderr:LC}=IC,jg=Symbol("GENERATOR"),Ra=Symbol("STYLER"),Qc=Symbol("IS_EMPTY"),MC=["ansi","ansi","ansi256","ansi16m"],ba=Object.create(null),WG=(r,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let t=OC?OC.level:0;r.level=e.level===void 0?t:e.level};var VG=r=>{let e=(...t)=>t.join(" ");return WG(e,r),Object.setPrototypeOf(e,Zc.prototype),e};function Zc(r){return VG(r)}Object.setPrototypeOf(Zc.prototype,Function.prototype);for(let[r,e]of Object.entries(xn))ba[r]={get(){let t=Qd(this,Bg(e.open,e.close,this[Ra]),this[Qc]);return Object.defineProperty(this,r,{value:t}),t}};ba.visible={get(){let r=Qd(this,this[Ra],!0);return Object.defineProperty(this,"visible",{value:r}),r}};var Hg=(r,e,t,...n)=>r==="rgb"?e==="ansi16m"?xn[t].ansi16m(...n):e==="ansi256"?xn[t].ansi256(xn.rgbToAnsi256(...n)):xn[t].ansi(xn.rgbToAnsi(...n)):r==="hex"?Hg("rgb",e,t,...xn.hexToRgb(...n)):xn[t][r](...n),zG=["rgb","hex","ansi256"];for(let r of zG){ba[r]={get(){let{level:t}=this;return function(...n){let i=Bg(Hg(r,MC[t],"color",...n),xn.color.close,this[Ra]);return Qd(this,i,this[Qc])}}};let e="bg"+r[0].toUpperCase()+r.slice(1);ba[e]={get(){let{level:t}=this;return function(...n){let i=Bg(Hg(r,MC[t],"bgColor",...n),xn.bgColor.close,this[Ra]);return Qd(this,i,this[Qc])}}}}var XG=Object.defineProperties(()=>{},{...ba,level:{enumerable:!0,get(){return this[jg].level},set(r){this[jg].level=r}}}),Bg=(r,e,t)=>{let n,i;return t===void 0?(n=r,i=e):(n=t.openAll+r,i=e+t.closeAll),{open:r,close:e,openAll:n,closeAll:i,parent:t}},Qd=(r,e,t)=>{let n=(...i)=>YG(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,XG),n[jg]=r,n[Ra]=e,n[Qc]=t,n},YG=(r,e)=>{if(r.level<=0||!e)return r[Qc]?"":e;let t=r[Ra];if(t===void 0)return e;let{openAll:n,closeAll:i}=t;if(e.includes("\x1B"))for(;t!==void 0;)e=PC(e,t.close,t.open),t=t.parent;let o=e.indexOf(`
`);return o!==-1&&(e=DC(e,i,n,o)),n+e+i};Object.defineProperties(Zc.prototype,ba);var JG=Zc(),yle=Zc({level:LC?LC.level:0});var Kg=JG;var Aa=class{constructor(e){this.$type=e}accept(e){console.log("acceptProgram concrete"),e.visitProgram(this)}};var Zd=class{constructor(e){this.$type=e}accept(e){}},ep=class{constructor(e){this.$type=e}accept(e){}};var tp=class{constructor(e){this.vars=[],this.program=new Aa("Program"),this.scene=e}visitParam(e){}visitMultExpression(e){console.log(e.singlevalue[0].$type);let t=e.singlevalue[0].accept(this);for(let n=1;n<e.singlevalue.length;n++)if(e.op[n-1]==="*"){let i=e.singlevalue[n].accept(this);t=t*i}else e.op[n-1]==="/"&&(t=t/e.singlevalue[n].accept(this));return console.log("Return Mult: "+t),t}visitAddExpression(e){console.log("In Add");let t=e.multexpression[0].accept(this);for(let n=1;n<e.multexpression.length;n++)if(e.op[n-1]==="+"){let i=e.multexpression[n].accept(this);t=t+i}else e.op[n-1]==="-"&&(t=t-e.multexpression[n].accept(this));return t}visitElse(e){e.statement.forEach(t=>t.accept(this))}visitElseif(e){e.condition.accept(this)&&e.statement.forEach(t=>t.accept(this))}visitFunc(e){for(let t of e.statement){let n=this.isReturn(t),i=this.isControleStructure(t),o=t.accept(this);if(n||i&&o!=null)return this.vars.pop(),console.log("Return VisitFunc: "+o),o}}visitFunCall(e){this.program.Func.forEach(t=>{if(t.name==e.callName){let n=new Map;for(let o=0;o<e.parameters.length;o++){let s=e.parameters[o].accept(this);n.set(t.parameter[o].name,s)}this.vars.push(n);let i=t.accept(this);return this.vars.pop(),console.log("Return FunCall: "+i),i}})}visitAssignVar(e){console.log("In AssignVar"),this.vars[this.vars.length-1].set(e.var_to_assign.name,e.expression.accept(this))}visitdeclaVar(e){this.vars[this.vars.length-1].set(e.declaName,e.expression.accept(this))}visitReturn(e){return e.return.accept(this)}visitAnd(e){let t=e.condition[0].accept(this);for(let n=1;n<e.condition.length;n++)t=t&&e.condition[n].accept(this);return t}visitOr(e){let t=e.condition[0].accept(this);for(let n=1;n<e.condition.length;n++)t=t||e.condition[n].accept(this);return t}visitEqualBool(e){return e.singlevaluebool[0].accept(this)===e.singlevaluebool[1].accept(this)}visitNotEqualBool(e){return e.singlevaluebool[0].accept(this)!==e.singlevaluebool[1].accept(this)}visitgetDistance(e){let t=this.scene.robot.getRay().intersect(this.scene.entities);return Math.sqrt(Math.pow(t.x-this.scene.robot.pos.x,2)+Math.pow(t.y-this.scene.robot.pos.y,2))}visitgetTimestamp(e){return this.scene.timestamps[this.scene.timestamps.length-1]}visitsetSpeed(e){let t=e.speed.accept(this);e.unit.accept(this)==="cm"?this.scene.robot.speed=t/10:this.scene.robot.speed=t/100}visitIf(e){return e.condition.accept(this)&&e.statement.forEach(t=>{if(this.isReturn(t)){let i=t.accept(this);return this.vars.pop(),i}else t.accept(this)}),null}visitLoop(e){for(;e.condition.accept(this);)e.statement.forEach(t=>{if(this.isReturn(t)){let i=t.accept(this);return this.vars.pop(),i}else t.accept(this)});return null}visitRotation(e){this.scene.robot.turn(e.angle.accept(this))}visitEqualInt(e){return e.arithmeticexpression[0].accept(this)===e.arithmeticexpression[1].accept(this)}visitNotEqualInt(e){return e.arithmeticexpression[0].accept(this)!==e.arithmeticexpression[1].accept(this)}visitGreater(e){return console.log(e.arithmeticexpression[0].accept(this)+" > "+e.arithmeticexpression[1].accept(this)),e.arithmeticexpression[0].accept(this)>e.arithmeticexpression[1].accept(this)}visitLower(e){return e.arithmeticexpression[0].accept(this)<e.arithmeticexpression[1].accept(this)}visitConstBool(e){return e.BoolValue}visitVar(e){return this.vars[this.vars.length-1].get(e.name)}visitConstInt(e){return e.integerValue}visitBack(e){e.unit1.accept(this)==="cm"?this.scene.robot.move(-e.expression.accept(this)*100):this.scene.robot.move(-e.expression.accept(this))}visitFront(e){e.unit1.accept(this)==="cm"?this.scene.robot.move(e.expression.accept(this)*100):this.scene.robot.move(e.expression.accept(this))}visitLeftSide(e){e.unit1.accept(this)==="cm"?this.scene.robot.side(e.expression.accept(this)*100):this.scene.robot.side(e.expression.accept(this))}visitRightSide(e){e.unit1.accept(this)==="cm"?this.scene.robot.side(-e.expression.accept(this)*100):this.scene.robot.side(-e.expression.accept(this))}visitCm(e){return"cm"}visitMm(e){return"mm"}visitProgram(e){this.program=e,e.Func.forEach(t=>{t.name=="entry"&&(this.vars.push(new Map),t.accept(this),this.vars.pop())})}isReturn(e){return"return"in e}isControleStructure(e){return"condition"in e&&"statement"in e}};var Rn=class r{static fromAngle(e,t){return new r(Math.cos(e)*t,Math.sin(e)*t)}static null(){return new r(0,0)}constructor(e,t){this.x=e,this.y=t}plus(e){return new r(this.x+e.x,this.y+e.y)}minus(e){return new r(this.x-e.x,this.y-e.y)}scale(e){return new r(this.x*e,this.y*e)}projX(){return new r(this.x,0)}normalize(){return this.scale(1/this.norm())}projY(){return new r(0,this.y)}norm(){return Math.sqrt(this.x*this.x+this.y*this.y)}},rp=class{constructor(e,t){this.origin=e,this.vector=t}intersect(e){let t=[];for(var n=0;n<e.length;n++){let o=e[n].intersect(this);console.log(o),t=t.concat(o)}return this.findClosestIntersection(t)}findClosestIntersection(e){let t=0,n=1/0;if(e.length>0){for(var i=0;i<e.length;i++){let o=this.origin.minus(e[i]).norm();o<n&&(n=o,t=i)}return e[t]}else return}getPoiFinder(){return(e,t)=>{let n=e.minus(t),i=this.vector,o=n.x*i.y-i.x*n.y;if(o!=0){let s=e.minus(this.origin),a=s.x*i.y-i.x*s.y,c=n.x*s.y-s.x*n.y,l=a/o,u=-c/o;if(l>0&&l<1&&u>0)return e.plus(n.scale(-l))}}}};var el=class{constructor(e,t,n,i,o){this.type="Robot",this.pos=e,this.size=t,this.rad=n*Math.PI/180,this.speed=i,this.scene=o}intersect(e){let t=e.getPoiFinder()(this.pos,this.size);return t?[t]:[]}turn(e){this.rad+=e*Math.PI/180,this.scene.time+=1;let t=new Mo(this.scene.time,this);this.scene.timestamps.push(t),console.log("Turn : "+this.pos.x+" "+this.pos.y)}move(e){let t=Rn.fromAngle(this.rad,Math.abs(e)).normalize();this.pos=this.pos.plus(t.scale(e)),this.scene.time+=Math.abs(e)/this.speed;let n=new Mo(this.scene.time,this);this.scene.timestamps.push(n)}side(e){let t=Rn.fromAngle(this.rad+Math.PI/2,Math.abs(e)).normalize();this.pos=this.pos.plus(t.scale(e)),this.scene.time+=Math.abs(e)/this.speed;let n=new Mo(this.scene.time,this);this.scene.timestamps.push(n)}getRay(){return new rp(this.pos,Rn.fromAngle(this.rad,1e4).scale(-1))}},Mo=class extends el{constructor(e,t){super(t.pos.scale(1),t.size.scale(1),t.rad,t.speed,t.scene),this.rad=t.rad,this.time=e}};var Fo=class{constructor(e,t){this.type="Wall",this.pos=e,this.size=t}intersect(e){let t=e.getPoiFinder()(this.pos,this.size);return t?[t]:[]}};var np=class{constructor(e=new Rn(1e4,1e4)){this.entities=[],this.time=0,this.timestamps=[],this.size=e,this.robot=new el(this.size.scale(.5),new Rn(250,250),0,30,this),this.entities.push(new Fo(Rn.null(),this.size.projX())),this.entities.push(new Fo(Rn.null(),this.size.projY())),this.entities.push(new Fo(this.size,this.size.projY())),this.entities.push(new Fo(this.size,this.size.projX())),this.timestamps.push(new Mo(0,this.robot))}};var tl=class{constructor(){this.vars=[],this.funcs=new Map,this.program=new Aa("Program")}visitParam(e){}visitElse(e){e.statement.forEach(t=>t.accept(this))}visitElseif(e){e.condition.accept(this)&&e.statement.forEach(t=>t.accept(this))}visitFunc(e){var t;for(let n of e.statement){let i=this.isReturn(n),o=this.isControleStructure(n),s=n.accept(this);if((i||o&&s!=null)&&s.type!=this.normalizeType((t=this.funcs.get(e.name))===null||t===void 0?void 0:t[0].$type))throw new Error("Return type does not match function type")}}visitProgram(e){this.program=e;let t=!1;if(e.Func.forEach(n=>{this.funcs.set(n.name,[n.type,n.parameter.map(i=>i.type)]),n.name==="entry"&&(t=!0)}),!t)throw new Error("No entry function found");e.Func.forEach(n=>{this.vars.push(new Map),n.accept(this),this.vars.pop()})}visitFunCall(e){var t;let n=this.funcs.get(e.callName);if(!n)throw new Error(`Function ${e.callName} not found`);let[i,o]=n;if(e.parameters.length!==o.length)throw new Error(`Parameter count mismatch for function ${e.callName}`);let s=e.parameters.map((l,u)=>{let f=l.accept(this);if(f.type!==this.normalizeType(o[u].$type))throw new Error(`Parameter type mismatch in function ${e.callName}`);return f}),a=new Map(s.map((l,u)=>{var f;return[(f=this.program.Func.find(m=>m.name===e.callName))===null||f===void 0?void 0:f.parameter[u].name,l]}));this.vars.push(a);let c=(t=this.funcs.get(e.callName))===null||t===void 0?void 0:t[0].$type;if(this.vars.pop(),this.normalizeType(c)!==this.normalizeType(i.$type))throw new Error(`Return type mismatch for function ${e.callName}`);return c}visitAssignVar(e){let t=e.expression.accept(this),n=this.lookupVar(e.var_to_assign.name).type;if(this.normalizeType(t.type)!==this.normalizeType(n))throw new Error(`Type mismatch in assignment to ${e.var_to_assign.name}`);this.updateVar(e.var_to_assign.name,t)}visitdeclaVar(e){if(this.vars.length===0)throw new Error("Variable declaration outside any scope");if(this.vars[this.vars.length-1].has(e.declaName))throw new Error(`Variable ${e.declaName} already declared`);let t=e.expression.accept(this);if(t.type!==this.normalizeType(e.type.$type))throw new Error(`Type mismatch in declaration of ${e.declaName}`);this.vars[this.vars.length-1].set(e.declaName,t)}visitReturn(e){var t;return(t=e.return)===null||t===void 0?void 0:t.accept(this)}visitIf(e){let t=e.condition.accept(this);if(t.type!=="bool")throw new Error("Condition in if statement must be a boolean");return t.value&&e.statement.forEach(n=>n.accept(this)),null}visitLoop(e){if(e.condition.accept(this).type!=="bool")throw new Error("Condition in loop statement must be a boolean");e.statement.forEach(n=>n.accept(this))}visitVar(e){return this.lookupVar(e.name)}visitConstInt(e){return{type:"int",value:e.integerValue}}visitConstBool(e){return{type:"bool",value:e.BoolValue}}visitAddExpression(e){let t=e.multexpression[0].accept(this);for(let n=1;n<e.multexpression.length;n++){let i=e.multexpression[n].accept(this);if(e.op[n-1]==="+"){if(i.type!=="int")throw new Error("Addition requires integer operands");t.value+=i.value}else if(e.op[n-1]==="-"){if(i.type!=="int")throw new Error("Soustraction requires integer operands");t.value-=i.value}}return t}visitMultExpression(e){let t=e.singlevalue[0].accept(this);for(let n=1;n<e.singlevalue.length;n++){let i=e.singlevalue[n].accept(this);if(e.op[n-1]==="*"){if(i.type!=="int")throw new Error("Multiplication requires integer operands");t.value*=i.value}else if(e.op[n-1]==="/"){if(i.type!=="int")throw new Error("Division requires integer operands");if(i.value===0)throw new Error("Division by zero is not allowed");t.value/=i.value}}return t}visitAnd(e){for(let n of e.condition)if(n.accept(this).type!=="bool")throw new Error("Logical AND requires boolean operands");let t=!0;for(let n of e.condition){let i=n.accept(this);if(t=t&&i.value,!t)break}return{type:"bool",value:t}}visitOr(e){for(let n of e.condition)if(n.accept(this).type!=="bool")throw new Error("Logical OR requires boolean operands");let t=!1;for(let n of e.condition){let i=n.accept(this);if(t=t||i.value,t)break}return{type:"bool",value:t}}visitEqualBool(e){let t=e.singlevaluebool[0].accept(this),n=e.singlevaluebool[1].accept(this);if(t.type!=="bool"||n.type!=="bool")throw new Error("Equality check requires boolean operands");return{type:"bool",value:t.value===n.value}}visitNotEqualBool(e){let t=e.singlevaluebool[0].accept(this),n=e.singlevaluebool[1].accept(this);if(t.type!=="bool"||n.type!=="bool")throw new Error("Inequality check requires boolean operands");return{type:"bool",value:t.value!==n.value}}visitgetDistance(e){return{type:"int",value:0}}visitgetTimestamp(e){return{type:"int",value:Date.now()}}visitsetSpeed(e){let t=e.speed.accept(this);if(t.type!=="int")throw new Error("Speed must be an integer");if(e.unit.$type.toString()==="cm"){if(t.value>15)throw new Error("Speed must be less than 15 cm/s")}else if(t.value>150)throw new Error("Speed must be less than 150 mm/s");return{type:"void"}}visitRotation(e){if(e.angle.accept(this).type!=="int")throw new Error("Rotation angle must be an integer");return{type:"void"}}visitEqualInt(e){let t=e.arithmeticexpression[0].accept(this),n=e.arithmeticexpression[1].accept(this);if(t.type!=="int"||n.type!=="int")throw new Error("Equality check requires integer operands");return{type:"bool",value:t.value===n.value}}visitNotEqualInt(e){let t=e.arithmeticexpression[0].accept(this),n=e.arithmeticexpression[1].accept(this);if(t.type!=="int"||n.type!=="int")throw new Error("Inequality check requires integer operands");return{type:"bool",value:t.value!==n.value}}visitGreater(e){let t=e.arithmeticexpression[0].accept(this),n=e.arithmeticexpression[1].accept(this);if(t.type!=="int"||n.type!=="int")throw new Error("Greater-than comparison requires integer operands");return{type:"bool",value:t.value>n.value}}visitLower(e){let t=e.arithmeticexpression[0].accept(this),n=e.arithmeticexpression[1].accept(this);if(t.type!=="int"||n.type!=="int")throw new Error("Less-than comparison requires integer operands");return{type:"bool",value:t.value<n.value}}visitMm(e){return{type:"int",value:e.accept(this).value}}visitCm(e){return{type:"int",value:e.accept(this).value*10}}visitBack(e){let t=e.expression.accept(this);if(t.type!=="int")throw new Error("Back movement distance must be an integer");if(e.unit1.$type.toString()==="cm"){if(t.value>300)throw new Error("Distance to parkour must be less than 300 cm")}else if(t.value>3e3)throw new Error("Distance to parkour must be less than 3000 mm");return{type:"void"}}visitFront(e){let t=e.expression.accept(this);if(t.type!=="int")throw new Error("Front movement distance must be an integer");if(e.unit1.$type.toString()==="cm"){if(t.value>300)throw new Error("Distance to parkour must be less than 300 cm")}else if(t.value>3e3)throw new Error("Distance to parkour must be less than 3000 mm");return{type:"void"}}visitLeftSide(e){let t=e.expression.accept(this);if(t.type!=="int")throw new Error("Left movement distance must be an integer");if(e.unit1.$type.toString()==="cm"){if(t.value>300)throw new Error("Distance to parkour must be less than 300 cm")}else if(t.value>3e3)throw new Error("Distance to parkour must be less than 3000 mm");return{type:"void"}}visitRightSide(e){let t=e.expression.accept(this);if(t.type!=="int")throw new Error("Right movement distance must be an integer");if(e.unit1.$type.toString()==="cm"){if(t.value>300)throw new Error("Distance to parkour must be less than 300 cm")}else if(t.value>3e3)throw new Error("Distance to parkour must be less than 3000 mm");return{type:"void"}}lookupVar(e){for(let t=this.vars.length-1;t>=0;t--)if(this.vars[t].has(e))return this.vars[t].get(e);throw new Error(`Variable ${e} not found`)}updateVar(e,t){for(let n=this.vars.length-1;n>=0;n--)if(this.vars[n].has(e)){this.vars[n].set(e,t);return}throw new Error(`Variable ${e} not found`)}isReturn(e){return"return"in e}isControleStructure(e){return e instanceof Zd||e instanceof ep}normalizeType(e){switch(e??""){case"Nbr":return"int";case"Bool":return"bool";default:return e??""}}};async function Wg(r,e){let t=e.shared.workspace.LangiumDocumentFactory.fromString(r,hh.parse("memory://aserobot.document"));await e.shared.workspace.DocumentBuilder.build([t],{validation:!0});let n=t.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?console.log(Kg.green("Parsed and validated your code successfully!")):console.log(Kg.red("Failed to parse and validate your codes!")),n?.value}async function FC(r){let e=wa(Li).AseRobot,t=await Wg(r,e);return Promise.resolve(t)}async function qC(r){let e=wa(Li).AseRobot,t=await Wg(r,e),n=new tl;return t.accept(n),Promise.resolve(t)}async function UC(r,e){let t=wa(Li).AseRobot,n=await Wg(r,t);e=new np;let i=new tp(e),o=new tl;return n.accept(o),n.accept(i),e}var ZG={validation:{AseRobotValidator:()=>new Xd,AseRobotAcceptWeaver:()=>new Yd}};function wa(r){let e=ho(Rc(r),wC),t=ho(xc({shared:e}),SC,ZG);return e.lsp.ExecuteCommandHandler=new Vg,e.ServiceRegistry.register(t),CC(t),kC(t),{shared:e,AseRobot:t}}var Vg=class extends Hu{registerCommands(e){e("parseAndValidate",t=>FC(t[0])),e("interprate",t=>UC(t[0],t[1])),e("typeCheck",t=>qC(t[0]))}};var ej=new Sa.BrowserMessageReader(self),tj=new Sa.BrowserMessageWriter(self),rj=(0,Sa.createConnection)(ej,tj),{shared:nj}=wa(Object.assign({connection:rj},Li));lR(nj);})();
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
