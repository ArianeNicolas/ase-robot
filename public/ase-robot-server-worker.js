"use strict";(()=>{var VA=Object.create;var Fd=Object.defineProperty;var XA=Object.getOwnPropertyDescriptor;var YA=Object.getOwnPropertyNames;var JA=Object.getPrototypeOf,QA=Object.prototype.hasOwnProperty;var by=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var j=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),ZA=(t,e)=>{for(var r in e)Fd(t,r,{get:e[r],enumerable:!0})},eC=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of YA(e))!QA.call(t,i)&&i!==r&&Fd(t,i,{get:()=>e[i],enumerable:!(n=XA(e,i))||n.enumerable});return t};var de=(t,e,r)=>(r=t!=null?VA(JA(t)):{},eC(e||!t||!t.__esModule?Fd(r,"default",{value:t,enumerable:!0}):r,t));var Hn=j(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});var Ud;function qd(){if(Ud===void 0)throw new Error("No runtime abstraction layer installed");return Ud}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Ud=r}t.install=e})(qd||(qd={}));Kd.default=qd});var Gd=j(Ta=>{"use strict";Object.defineProperty(Ta,"__esModule",{value:!0});Ta.Disposable=void 0;var tC;(function(t){function e(r){return{dispose:r}}t.create=e})(tC=Ta.Disposable||(Ta.Disposable={}))});var to=j(eo=>{"use strict";Object.defineProperty(eo,"__esModule",{value:!0});eo.Emitter=eo.Event=void 0;var rC=Hn(),nC;(function(t){let e={dispose(){}};t.None=function(){return e}})(nC=eo.Event||(eo.Event={}));var jd=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{r.push(n[o].apply(i[o],e))}catch(a){(0,rC.default)().console.error(a)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},Bu=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new jd),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};eo.Emitter=Bu;Bu._noop=function(){}});var wy=j(zu=>{"use strict";Object.defineProperty(zu,"__esModule",{value:!0});zu.AbstractMessageBuffer=void 0;var iC=13,oC=10,sC=`\r
`,Hd=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let u=this._chunks[r];for(n=0;n<u.length;){switch(u[n]){case iC:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case oC:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=u.byteLength,r++}if(e!==4)return;let o=this._read(i+n),s=new Map,a=this.toString(o,"ascii").split(sC);if(a.length<2)return s;for(let u=0;u<a.length-2;u++){let l=a[u],c=l.indexOf(":");if(c===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,c),m=l.substr(c+1).trim();s.set(f,m)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);r.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else r.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return r}};zu.AbstractMessageBuffer=Hd});var Cy=j(Vd=>{"use strict";Object.defineProperty(Vd,"__esModule",{value:!0});var Sy=Hn(),Lo=Gd(),aC=to(),uC=wy(),Vu=class t extends uC.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};Vu.emptyBuffer=new Uint8Array(0);var Wd=class{constructor(e){this.socket=e,this._onData=new aC.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,Sy.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),Lo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Lo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Lo.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},Bd=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),Lo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Lo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Lo.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},lC=new TextEncoder,Ay=Object.freeze({messageBuffer:Object.freeze({create:t=>new Vu(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(lC.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new Wd(t),asWritableStream:t=>new Bd(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function zd(){return Ay}(function(t){function e(){Sy.default.install(Ay)}t.install=e})(zd||(zd={}));Vd.default=zd});var Mo=j(tr=>{"use strict";Object.defineProperty(tr,"__esModule",{value:!0});tr.stringArray=tr.array=tr.func=tr.error=tr.number=tr.string=tr.boolean=void 0;function cC(t){return t===!0||t===!1}tr.boolean=cC;function ky(t){return typeof t=="string"||t instanceof String}tr.string=ky;function fC(t){return typeof t=="number"||t instanceof Number}tr.number=fC;function dC(t){return t instanceof Error}tr.error=dC;function pC(t){return typeof t=="function"}tr.func=pC;function $y(t){return Array.isArray(t)}tr.array=$y;function mC(t){return $y(t)&&t.every(e=>ky(e))}tr.stringArray=mC});var Tp=j(V=>{"use strict";Object.defineProperty(V,"__esModule",{value:!0});V.Message=V.NotificationType9=V.NotificationType8=V.NotificationType7=V.NotificationType6=V.NotificationType5=V.NotificationType4=V.NotificationType3=V.NotificationType2=V.NotificationType1=V.NotificationType0=V.NotificationType=V.RequestType9=V.RequestType8=V.RequestType7=V.RequestType6=V.RequestType5=V.RequestType4=V.RequestType3=V.RequestType2=V.RequestType1=V.RequestType=V.RequestType0=V.AbstractMessageSignature=V.ParameterStructures=V.ResponseError=V.ErrorCodes=void 0;var ro=Mo(),Ey;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(Ey=V.ErrorCodes||(V.ErrorCodes={}));var Xd=class t extends Error{constructor(e,r,n){super(r),this.code=ro.number(e)?e:Ey.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};V.ResponseError=Xd;var xr=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};V.ParameterStructures=xr;xr.auto=new xr("auto");xr.byPosition=new xr("byPosition");xr.byName=new xr("byName");var Xe=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return xr.auto}};V.AbstractMessageSignature=Xe;var Yd=class extends Xe{constructor(e){super(e,0)}};V.RequestType0=Yd;var Jd=class extends Xe{constructor(e,r=xr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType=Jd;var Qd=class extends Xe{constructor(e,r=xr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType1=Qd;var Zd=class extends Xe{constructor(e){super(e,2)}};V.RequestType2=Zd;var ep=class extends Xe{constructor(e){super(e,3)}};V.RequestType3=ep;var tp=class extends Xe{constructor(e){super(e,4)}};V.RequestType4=tp;var rp=class extends Xe{constructor(e){super(e,5)}};V.RequestType5=rp;var np=class extends Xe{constructor(e){super(e,6)}};V.RequestType6=np;var ip=class extends Xe{constructor(e){super(e,7)}};V.RequestType7=ip;var op=class extends Xe{constructor(e){super(e,8)}};V.RequestType8=op;var sp=class extends Xe{constructor(e){super(e,9)}};V.RequestType9=sp;var ap=class extends Xe{constructor(e,r=xr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType=ap;var up=class extends Xe{constructor(e){super(e,0)}};V.NotificationType0=up;var lp=class extends Xe{constructor(e,r=xr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType1=lp;var cp=class extends Xe{constructor(e){super(e,2)}};V.NotificationType2=cp;var fp=class extends Xe{constructor(e){super(e,3)}};V.NotificationType3=fp;var dp=class extends Xe{constructor(e){super(e,4)}};V.NotificationType4=dp;var pp=class extends Xe{constructor(e){super(e,5)}};V.NotificationType5=pp;var mp=class extends Xe{constructor(e){super(e,6)}};V.NotificationType6=mp;var hp=class extends Xe{constructor(e){super(e,7)}};V.NotificationType7=hp;var yp=class extends Xe{constructor(e){super(e,8)}};V.NotificationType8=yp;var gp=class extends Xe{constructor(e){super(e,9)}};V.NotificationType9=gp;var hC;(function(t){function e(i){let o=i;return o&&ro.string(o.method)&&(ro.string(o.id)||ro.number(o.id))}t.isRequest=e;function r(i){let o=i;return o&&ro.string(o.method)&&i.id===void 0}t.isNotification=r;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(ro.string(o.id)||ro.number(o.id)||o.id===null)}t.isResponse=n})(hC=V.Message||(V.Message={}))});var xp=j(Wn=>{"use strict";var _y;Object.defineProperty(Wn,"__esModule",{value:!0});Wn.LRUCache=Wn.LinkedMap=Wn.Touch=void 0;var cr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(cr=Wn.Touch||(Wn.Touch={}));var Xu=class{constructor(){this[_y]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=cr.None){let n=this._map.get(e);if(n)return r!==cr.None&&this.touch(n,r),n.value}set(e,r,n=cr.None){let i=this._map.get(e);if(i)i.value=r,n!==cr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case cr.None:this.addItemLast(i);break;case cr.First:this.addItemFirst(i);break;case cr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(_y=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==cr.First&&r!==cr.Last)){if(r===cr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===cr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};Wn.LinkedMap=Xu;var vp=class extends Xu{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=cr.AsNew){return super.get(e,r)}peek(e){return super.get(e,cr.None)}set(e,r){return super.set(e,r,cr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Wn.LRUCache=vp});var Sp=j(no=>{"use strict";Object.defineProperty(no,"__esModule",{value:!0});no.CancellationTokenSource=no.CancellationToken=void 0;var yC=Hn(),gC=Mo(),Rp=to(),bp;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Rp.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Rp.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||gC.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(bp=no.CancellationToken||(no.CancellationToken={}));var TC=Object.freeze(function(t,e){let r=(0,yC.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),Yu=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?TC:(this._emitter||(this._emitter=new Rp.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},wp=class{get token(){return this._token||(this._token=new Yu),this._token}cancel(){this._token?this._token.cancel():this._token=bp.Cancelled}dispose(){this._token?this._token instanceof Yu&&this._token.dispose():this._token=bp.None}};no.CancellationTokenSource=wp});var Ny=j(Bn=>{"use strict";Object.defineProperty(Bn,"__esModule",{value:!0});Bn.ReadableStreamMessageReader=Bn.AbstractMessageReader=Bn.MessageReader=void 0;var Cp=Hn(),Fo=Mo(),Ap=to(),vC;(function(t){function e(r){let n=r;return n&&Fo.func(n.listen)&&Fo.func(n.dispose)&&Fo.func(n.onError)&&Fo.func(n.onClose)&&Fo.func(n.onPartialMessage)}t.is=e})(vC=Bn.MessageReader||(Bn.MessageReader={}));var Ju=class{constructor(){this.errorEmitter=new Ap.Emitter,this.closeEmitter=new Ap.Emitter,this.partialMessageEmitter=new Ap.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${Fo.string(e.message)?e.message:"unknown"}`)}};Bn.AbstractMessageReader=Ju;var kp;(function(t){function e(r){let n,i,o,s=new Map,a,u=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(o=r.contentDecoder,s.set(o.name,o)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)s.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(a=r.contentTypeDecoder,u.set(a.name,a)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)u.set(l.name,l)}return a===void 0&&(a=(0,Cp.default)().applicationJson.decoder,u.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:u}}t.fromOptions=e})(kp||(kp={}));var $p=class extends Ju{constructor(e,r){super(),this.readable=e,this.options=kp.fromOptions(r),this.buffer=(0,Cp.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let s=parseInt(o);if(isNaN(s))throw new Error("Content-Length value must be a number.");this.nextMessageLength=s}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Cp.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Bn.ReadableStreamMessageReader=$p});var Iy=j(Qu=>{"use strict";Object.defineProperty(Qu,"__esModule",{value:!0});Qu.Semaphore=void 0;var xC=Hn(),Ep=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,xC.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};Qu.Semaphore=Ep});var Ly=j(zn=>{"use strict";Object.defineProperty(zn,"__esModule",{value:!0});zn.WriteableStreamMessageWriter=zn.AbstractMessageWriter=zn.MessageWriter=void 0;var Py=Hn(),va=Mo(),RC=Iy(),Dy=to(),bC="Content-Length: ",Oy=`\r
`,wC;(function(t){function e(r){let n=r;return n&&va.func(n.dispose)&&va.func(n.onClose)&&va.func(n.onError)&&va.func(n.write)}t.is=e})(wC=zn.MessageWriter||(zn.MessageWriter={}));var Zu=class{constructor(){this.errorEmitter=new Dy.Emitter,this.closeEmitter=new Dy.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${va.string(e.message)?e.message:"unknown"}`)}};zn.AbstractMessageWriter=Zu;var _p;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,Py.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,Py.default)().applicationJson.encoder}}t.fromOptions=e})(_p||(_p={}));var Np=class extends Zu{constructor(e,r){super(),this.writable=e,this.options=_p.fromOptions(r),this.errorCount=0,this.writeSemaphore=new RC.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(bC,n.byteLength.toString(),Oy),i.push(Oy),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};zn.WriteableStreamMessageWriter=Np});var Gy=j(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.createMessageConnection=Y.ConnectionOptions=Y.CancellationStrategy=Y.CancellationSenderStrategy=Y.CancellationReceiverStrategy=Y.ConnectionStrategy=Y.ConnectionError=Y.ConnectionErrors=Y.LogTraceNotification=Y.SetTraceNotification=Y.TraceFormat=Y.TraceValues=Y.Trace=Y.NullLogger=Y.ProgressType=Y.ProgressToken=void 0;var My=Hn(),Nt=Mo(),Z=Tp(),Fy=xp(),xa=to(),Ip=Sp(),ba;(function(t){t.type=new Z.NotificationType("$/cancelRequest")})(ba||(ba={}));var Uy;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(Uy=Y.ProgressToken||(Y.ProgressToken={}));var Ra;(function(t){t.type=new Z.NotificationType("$/progress")})(Ra||(Ra={}));var Pp=class{constructor(){}};Y.ProgressType=Pp;var Dp;(function(t){function e(r){return Nt.func(r)}t.is=e})(Dp||(Dp={}));Y.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var Ee;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(Ee=Y.Trace||(Y.Trace={}));var SC;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(SC=Y.TraceValues||(Y.TraceValues={}));(function(t){function e(n){if(!Nt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(Ee=Y.Trace||(Y.Trace={}));var tn;(function(t){t.Text="text",t.JSON="json"})(tn=Y.TraceFormat||(Y.TraceFormat={}));(function(t){function e(r){return Nt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(tn=Y.TraceFormat||(Y.TraceFormat={}));var qy;(function(t){t.type=new Z.NotificationType("$/setTrace")})(qy=Y.SetTraceNotification||(Y.SetTraceNotification={}));var Op;(function(t){t.type=new Z.NotificationType("$/logTrace")})(Op=Y.LogTraceNotification||(Y.LogTraceNotification={}));var el;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(el=Y.ConnectionErrors||(Y.ConnectionErrors={}));var Uo=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};Y.ConnectionError=Uo;var Ky;(function(t){function e(r){let n=r;return n&&Nt.func(n.cancelUndispatched)}t.is=e})(Ky=Y.ConnectionStrategy||(Y.ConnectionStrategy={}));var Lp;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Ip.CancellationTokenSource}});function e(r){let n=r;return n&&Nt.func(n.createCancellationTokenSource)}t.is=e})(Lp=Y.CancellationReceiverStrategy||(Y.CancellationReceiverStrategy={}));var Mp;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(ba.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&Nt.func(n.sendCancellation)&&Nt.func(n.cleanup)}t.is=e})(Mp=Y.CancellationSenderStrategy||(Y.CancellationSenderStrategy={}));var Fp;(function(t){t.Message=Object.freeze({receiver:Lp.Message,sender:Mp.Message});function e(r){let n=r;return n&&Lp.is(n.receiver)&&Mp.is(n.sender)}t.is=e})(Fp=Y.CancellationStrategy||(Y.CancellationStrategy={}));var AC;(function(t){function e(r){let n=r;return n&&(Fp.is(n.cancellationStrategy)||Ky.is(n.connectionStrategy))}t.is=e})(AC=Y.ConnectionOptions||(Y.ConnectionOptions={}));var rn;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(rn||(rn={}));function CC(t,e,r,n){let i=r!==void 0?r:Y.NullLogger,o=0,s=0,a=0,u="2.0",l,c=new Map,f,m=new Map,T=new Map,w,A=new Fy.LinkedMap,_=new Map,C=new Set,v=new Map,g=Ee.Off,E=tn.Text,D,X=rn.New,ge=new xa.Emitter,$e=new xa.Emitter,Gt=new xa.Emitter,vt=new xa.Emitter,M=new xa.Emitter,S=n&&n.cancellationStrategy?n.cancellationStrategy:Fp.Message;function q(x){if(x===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+x.toString()}function G(x){return x===null?"res-unknown-"+(++a).toString():"res-"+x.toString()}function ue(){return"not-"+(++s).toString()}function ee(x,P){Z.Message.isRequest(P)?x.set(q(P.id),P):Z.Message.isResponse(P)?x.set(G(P.id),P):x.set(ue(),P)}function Q(x){}function xt(){return X===rn.Listening}function lt(){return X===rn.Closed}function me(){return X===rn.Disposed}function $r(){(X===rn.New||X===rn.Listening)&&(X=rn.Closed,$e.fire(void 0))}function Kn(x){ge.fire([x,void 0,void 0])}function ya(x){ge.fire(x)}t.onClose($r),t.onError(Kn),e.onClose($r),e.onError(ya);function Yi(){w||A.size===0||(w=(0,My.default)().timer.setImmediate(()=>{w=void 0,lr()}))}function lr(){if(A.size===0)return;let x=A.shift();try{Z.Message.isRequest(x)?Rt(x):Z.Message.isNotification(x)?vn(x):Z.Message.isResponse(x)?Zt(x):jt(x)}finally{Yi()}}let Po=x=>{try{if(Z.Message.isNotification(x)&&x.method===ba.type.method){let P=x.params.id,F=q(P),B=A.get(F);if(Z.Message.isRequest(B)){let Oe=n?.connectionStrategy,Je=Oe&&Oe.cancelUndispatched?Oe.cancelUndispatched(B,Q):void 0;if(Je&&(Je.error!==void 0||Je.result!==void 0)){A.delete(F),v.delete(P),Je.id=B.id,vr(Je,x.method,Date.now()),e.write(Je).catch(()=>i.error("Sending response for canceled message failed."));return}}let De=v.get(P);if(De!==void 0){De.cancel(),Ti(x);return}else C.add(P)}ee(A,x)}finally{Yi()}};function Rt(x){if(me())return;function P(ce,Ue,Te){let ht={jsonrpc:u,id:x.id};ce instanceof Z.ResponseError?ht.error=ce.toJson():ht.result=ce===void 0?null:ce,vr(ht,Ue,Te),e.write(ht).catch(()=>i.error("Sending response failed."))}function F(ce,Ue,Te){let ht={jsonrpc:u,id:x.id,error:ce.toJson()};vr(ht,Ue,Te),e.write(ht).catch(()=>i.error("Sending response failed."))}function B(ce,Ue,Te){ce===void 0&&(ce=null);let ht={jsonrpc:u,id:x.id,result:ce};vr(ht,Ue,Te),e.write(ht).catch(()=>i.error("Sending response failed."))}Ji(x);let De=c.get(x.method),Oe,Je;De&&(Oe=De.type,Je=De.handler);let bt=Date.now();if(Je||l){let ce=x.id??String(Date.now()),Ue=S.receiver.createCancellationTokenSource(ce);x.id!==null&&C.has(x.id)&&Ue.cancel(),x.id!==null&&v.set(ce,Ue);try{let Te;if(Je)if(x.params===void 0){if(Oe!==void 0&&Oe.numberOfParams!==0){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines ${Oe.numberOfParams} params but received none.`),x.method,bt);return}Te=Je(Ue.token)}else if(Array.isArray(x.params)){if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byName){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by name but received parameters by position`),x.method,bt);return}Te=Je(...x.params,Ue.token)}else{if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byPosition){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by position but received parameters by name`),x.method,bt);return}Te=Je(x.params,Ue.token)}else l&&(Te=l(x.method,x.params,Ue.token));let ht=Te;Te?ht.then?ht.then(er=>{v.delete(ce),P(er,x.method,bt)},er=>{v.delete(ce),er instanceof Z.ResponseError?F(er,x.method,bt):er&&Nt.string(er.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${er.message}`),x.method,bt):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,bt)}):(v.delete(ce),P(Te,x.method,bt)):(v.delete(ce),B(Te,x.method,bt))}catch(Te){v.delete(ce),Te instanceof Z.ResponseError?P(Te,x.method,bt):Te&&Nt.string(Te.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${Te.message}`),x.method,bt):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,bt)}}else F(new Z.ResponseError(Z.ErrorCodes.MethodNotFound,`Unhandled method ${x.method}`),x.method,bt)}function Zt(x){if(!me())if(x.id===null)x.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(x.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let P=x.id,F=_.get(P);if(Od(x,F),F!==void 0){_.delete(P);try{if(x.error){let B=x.error;F.reject(new Z.ResponseError(B.code,B.message,B.data))}else if(x.result!==void 0)F.resolve(x.result);else throw new Error("Should never happen.")}catch(B){B.message?i.error(`Response handler '${F.method}' failed with message: ${B.message}`):i.error(`Response handler '${F.method}' failed unexpectedly.`)}}}}function vn(x){if(me())return;let P,F;if(x.method===ba.type.method){let B=x.params.id;C.delete(B),Ti(x);return}else{let B=m.get(x.method);B&&(F=B.handler,P=B.type)}if(F||f)try{if(Ti(x),F)if(x.params===void 0)P!==void 0&&P.numberOfParams!==0&&P.parameterStructures!==Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines ${P.numberOfParams} params but received none.`),F();else if(Array.isArray(x.params)){let B=x.params;x.method===Ra.type.method&&B.length===2&&Uy.is(B[0])?F({token:B[0],value:B[1]}):(P!==void 0&&(P.parameterStructures===Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines parameters by name but received parameters by position`),P.numberOfParams!==x.params.length&&i.error(`Notification ${x.method} defines ${P.numberOfParams} params but received ${B.length} arguments`)),F(...B))}else P!==void 0&&P.parameterStructures===Z.ParameterStructures.byPosition&&i.error(`Notification ${x.method} defines parameters by position but received parameters by name`),F(x.params);else f&&f(x.method,x.params)}catch(B){B.message?i.error(`Notification handler '${x.method}' failed with message: ${B.message}`):i.error(`Notification handler '${x.method}' failed unexpectedly.`)}else Gt.fire(x)}function jt(x){if(!x){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(x,null,4)}`);let P=x;if(Nt.string(P.id)||Nt.number(P.id)){let F=P.id,B=_.get(F);B&&B.reject(new Error("The received response has neither a result nor an error property."))}}function ct(x){if(x!=null)switch(g){case Ee.Verbose:return JSON.stringify(x,null,4);case Ee.Compact:return JSON.stringify(x);default:return}}function qr(x){if(!(g===Ee.Off||!D))if(E===tn.Text){let P;(g===Ee.Verbose||g===Ee.Compact)&&x.params&&(P=`Params: ${ct(x.params)}

`),D.log(`Sending request '${x.method} - (${x.id})'.`,P)}else vi("send-request",x)}function Er(x){if(!(g===Ee.Off||!D))if(E===tn.Text){let P;(g===Ee.Verbose||g===Ee.Compact)&&(x.params?P=`Params: ${ct(x.params)}

`:P=`No parameters provided.

`),D.log(`Sending notification '${x.method}'.`,P)}else vi("send-notification",x)}function vr(x,P,F){if(!(g===Ee.Off||!D))if(E===tn.Text){let B;(g===Ee.Verbose||g===Ee.Compact)&&(x.error&&x.error.data?B=`Error data: ${ct(x.error.data)}

`:x.result?B=`Result: ${ct(x.result)}

`:x.error===void 0&&(B=`No result returned.

`)),D.log(`Sending response '${P} - (${x.id})'. Processing request took ${Date.now()-F}ms`,B)}else vi("send-response",x)}function Ji(x){if(!(g===Ee.Off||!D))if(E===tn.Text){let P;(g===Ee.Verbose||g===Ee.Compact)&&x.params&&(P=`Params: ${ct(x.params)}

`),D.log(`Received request '${x.method} - (${x.id})'.`,P)}else vi("receive-request",x)}function Ti(x){if(!(g===Ee.Off||!D||x.method===Op.type.method))if(E===tn.Text){let P;(g===Ee.Verbose||g===Ee.Compact)&&(x.params?P=`Params: ${ct(x.params)}

`:P=`No parameters provided.

`),D.log(`Received notification '${x.method}'.`,P)}else vi("receive-notification",x)}function Od(x,P){if(!(g===Ee.Off||!D))if(E===tn.Text){let F;if((g===Ee.Verbose||g===Ee.Compact)&&(x.error&&x.error.data?F=`Error data: ${ct(x.error.data)}

`:x.result?F=`Result: ${ct(x.result)}

`:x.error===void 0&&(F=`No result returned.

`)),P){let B=x.error?` Request failed: ${x.error.message} (${x.error.code}).`:"";D.log(`Received response '${P.method} - (${x.id})' in ${Date.now()-P.timerStart}ms.${B}`,F)}else D.log(`Received response ${x.id} without active response promise.`,F)}else vi("receive-response",x)}function vi(x,P){if(!D||g===Ee.Off)return;let F={isLSPMessage:!0,type:x,message:P,timestamp:Date.now()};D.log(F)}function Qi(){if(lt())throw new Uo(el.Closed,"Connection is closed.");if(me())throw new Uo(el.Disposed,"Connection is disposed.")}function Ld(){if(xt())throw new Uo(el.AlreadyListening,"Connection is already listening")}function Md(){if(!xt())throw new Error("Call listen() first.")}function Zi(x){return x===void 0?null:x}function Do(x){if(x!==null)return x}function ju(x){return x!=null&&!Array.isArray(x)&&typeof x=="object"}function ga(x,P){switch(x){case Z.ParameterStructures.auto:return ju(P)?Do(P):[Zi(P)];case Z.ParameterStructures.byName:if(!ju(P))throw new Error("Received parameters by name but param is not an object literal.");return Do(P);case Z.ParameterStructures.byPosition:return[Zi(P)];default:throw new Error(`Unknown parameter structure ${x.toString()}`)}}function Hu(x,P){let F,B=x.numberOfParams;switch(B){case 0:F=void 0;break;case 1:F=ga(x.parameterStructures,P[0]);break;default:F=[];for(let De=0;De<P.length&&De<B;De++)F.push(Zi(P[De]));if(P.length<B)for(let De=P.length;De<B;De++)F.push(null);break}return F}let xi={sendNotification:(x,...P)=>{Qi();let F,B;if(Nt.string(x)){F=x;let Oe=P[0],Je=0,bt=Z.ParameterStructures.auto;Z.ParameterStructures.is(Oe)&&(Je=1,bt=Oe);let ce=P.length,Ue=ce-Je;switch(Ue){case 0:B=void 0;break;case 1:B=ga(bt,P[Je]);break;default:if(bt===Z.ParameterStructures.byName)throw new Error(`Received ${Ue} parameters for 'by Name' notification parameter structure.`);B=P.slice(Je,ce).map(Te=>Zi(Te));break}}else{let Oe=P;F=x.method,B=Hu(x,Oe)}let De={jsonrpc:u,method:F,params:B};return Er(De),e.write(De).catch(()=>i.error("Sending notification failed."))},onNotification:(x,P)=>{Qi();let F;return Nt.func(x)?f=x:P&&(Nt.string(x)?(F=x,m.set(x,{type:void 0,handler:P})):(F=x.method,m.set(x.method,{type:x,handler:P}))),{dispose:()=>{F!==void 0?m.delete(F):f=void 0}}},onProgress:(x,P,F)=>{if(T.has(P))throw new Error(`Progress handler for token ${P} already registered`);return T.set(P,F),{dispose:()=>{T.delete(P)}}},sendProgress:(x,P,F)=>xi.sendNotification(Ra.type,{token:P,value:F}),onUnhandledProgress:vt.event,sendRequest:(x,...P)=>{Qi(),Md();let F,B,De;if(Nt.string(x)){F=x;let ce=P[0],Ue=P[P.length-1],Te=0,ht=Z.ParameterStructures.auto;Z.ParameterStructures.is(ce)&&(Te=1,ht=ce);let er=P.length;Ip.CancellationToken.is(Ue)&&(er=er-1,De=Ue);let Gn=er-Te;switch(Gn){case 0:B=void 0;break;case 1:B=ga(ht,P[Te]);break;default:if(ht===Z.ParameterStructures.byName)throw new Error(`Received ${Gn} parameters for 'by Name' request parameter structure.`);B=P.slice(Te,er).map(xn=>Zi(xn));break}}else{let ce=P;F=x.method,B=Hu(x,ce);let Ue=x.numberOfParams;De=Ip.CancellationToken.is(ce[Ue])?ce[Ue]:void 0}let Oe=o++,Je;return De&&(Je=De.onCancellationRequested(()=>{let ce=S.sender.sendCancellation(xi,Oe);return ce===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Oe}`),Promise.resolve()):ce.catch(()=>{i.log(`Sending cancellation messages for id ${Oe} failed`)})})),new Promise((ce,Ue)=>{let Te={jsonrpc:u,id:Oe,method:F,params:B},ht=xn=>{ce(xn),S.sender.cleanup(Oe),Je?.dispose()},er=xn=>{Ue(xn),S.sender.cleanup(Oe),Je?.dispose()},Gn={method:F,timerStart:Date.now(),resolve:ht,reject:er};qr(Te);try{e.write(Te).catch(()=>i.error("Sending request failed."))}catch(xn){Gn.reject(new Z.ResponseError(Z.ErrorCodes.MessageWriteError,xn.message?xn.message:"Unknown reason")),Gn=null}Gn&&_.set(Oe,Gn)})},onRequest:(x,P)=>{Qi();let F=null;return Dp.is(x)?(F=void 0,l=x):Nt.string(x)?(F=null,P!==void 0&&(F=x,c.set(x,{handler:P,type:void 0}))):P!==void 0&&(F=x.method,c.set(x.method,{type:x,handler:P})),{dispose:()=>{F!==null&&(F!==void 0?c.delete(F):l=void 0)}}},hasPendingResponse:()=>_.size>0,trace:async(x,P,F)=>{let B=!1,De=tn.Text;F!==void 0&&(Nt.boolean(F)?B=F:(B=F.sendNotification||!1,De=F.traceFormat||tn.Text)),g=x,E=De,g===Ee.Off?D=void 0:D=P,B&&!lt()&&!me()&&await xi.sendNotification(qy.type,{value:Ee.toString(x)})},onError:ge.event,onClose:$e.event,onUnhandledNotification:Gt.event,onDispose:M.event,end:()=>{e.end()},dispose:()=>{if(me())return;X=rn.Disposed,M.fire(void 0);let x=new Z.ResponseError(Z.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let P of _.values())P.reject(x);_=new Map,v=new Map,C=new Set,A=new Fy.LinkedMap,Nt.func(e.dispose)&&e.dispose(),Nt.func(t.dispose)&&t.dispose()},listen:()=>{Qi(),Ld(),X=rn.Listening,t.listen(Po)},inspect:()=>{(0,My.default)().console.log("inspect")}};return xi.onNotification(Op.type,x=>{if(g===Ee.Off||!D)return;let P=g===Ee.Verbose||g===Ee.Compact;D.log(x.message,P?x.verbose:void 0)}),xi.onNotification(Ra.type,x=>{let P=T.get(x.token);P?P(x.value):vt.fire(x)}),xi}Y.createMessageConnection=CC});var Gp=j(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});N.TraceFormat=N.TraceValues=N.Trace=N.ProgressType=N.ProgressToken=N.createMessageConnection=N.NullLogger=N.ConnectionOptions=N.ConnectionStrategy=N.WriteableStreamMessageWriter=N.AbstractMessageWriter=N.MessageWriter=N.ReadableStreamMessageReader=N.AbstractMessageReader=N.MessageReader=N.CancellationToken=N.CancellationTokenSource=N.Emitter=N.Event=N.Disposable=N.LRUCache=N.Touch=N.LinkedMap=N.ParameterStructures=N.NotificationType9=N.NotificationType8=N.NotificationType7=N.NotificationType6=N.NotificationType5=N.NotificationType4=N.NotificationType3=N.NotificationType2=N.NotificationType1=N.NotificationType0=N.NotificationType=N.ErrorCodes=N.ResponseError=N.RequestType9=N.RequestType8=N.RequestType7=N.RequestType6=N.RequestType5=N.RequestType4=N.RequestType3=N.RequestType2=N.RequestType1=N.RequestType0=N.RequestType=N.Message=N.RAL=void 0;N.CancellationStrategy=N.CancellationSenderStrategy=N.CancellationReceiverStrategy=N.ConnectionError=N.ConnectionErrors=N.LogTraceNotification=N.SetTraceNotification=void 0;var Ke=Tp();Object.defineProperty(N,"Message",{enumerable:!0,get:function(){return Ke.Message}});Object.defineProperty(N,"RequestType",{enumerable:!0,get:function(){return Ke.RequestType}});Object.defineProperty(N,"RequestType0",{enumerable:!0,get:function(){return Ke.RequestType0}});Object.defineProperty(N,"RequestType1",{enumerable:!0,get:function(){return Ke.RequestType1}});Object.defineProperty(N,"RequestType2",{enumerable:!0,get:function(){return Ke.RequestType2}});Object.defineProperty(N,"RequestType3",{enumerable:!0,get:function(){return Ke.RequestType3}});Object.defineProperty(N,"RequestType4",{enumerable:!0,get:function(){return Ke.RequestType4}});Object.defineProperty(N,"RequestType5",{enumerable:!0,get:function(){return Ke.RequestType5}});Object.defineProperty(N,"RequestType6",{enumerable:!0,get:function(){return Ke.RequestType6}});Object.defineProperty(N,"RequestType7",{enumerable:!0,get:function(){return Ke.RequestType7}});Object.defineProperty(N,"RequestType8",{enumerable:!0,get:function(){return Ke.RequestType8}});Object.defineProperty(N,"RequestType9",{enumerable:!0,get:function(){return Ke.RequestType9}});Object.defineProperty(N,"ResponseError",{enumerable:!0,get:function(){return Ke.ResponseError}});Object.defineProperty(N,"ErrorCodes",{enumerable:!0,get:function(){return Ke.ErrorCodes}});Object.defineProperty(N,"NotificationType",{enumerable:!0,get:function(){return Ke.NotificationType}});Object.defineProperty(N,"NotificationType0",{enumerable:!0,get:function(){return Ke.NotificationType0}});Object.defineProperty(N,"NotificationType1",{enumerable:!0,get:function(){return Ke.NotificationType1}});Object.defineProperty(N,"NotificationType2",{enumerable:!0,get:function(){return Ke.NotificationType2}});Object.defineProperty(N,"NotificationType3",{enumerable:!0,get:function(){return Ke.NotificationType3}});Object.defineProperty(N,"NotificationType4",{enumerable:!0,get:function(){return Ke.NotificationType4}});Object.defineProperty(N,"NotificationType5",{enumerable:!0,get:function(){return Ke.NotificationType5}});Object.defineProperty(N,"NotificationType6",{enumerable:!0,get:function(){return Ke.NotificationType6}});Object.defineProperty(N,"NotificationType7",{enumerable:!0,get:function(){return Ke.NotificationType7}});Object.defineProperty(N,"NotificationType8",{enumerable:!0,get:function(){return Ke.NotificationType8}});Object.defineProperty(N,"NotificationType9",{enumerable:!0,get:function(){return Ke.NotificationType9}});Object.defineProperty(N,"ParameterStructures",{enumerable:!0,get:function(){return Ke.ParameterStructures}});var Up=xp();Object.defineProperty(N,"LinkedMap",{enumerable:!0,get:function(){return Up.LinkedMap}});Object.defineProperty(N,"LRUCache",{enumerable:!0,get:function(){return Up.LRUCache}});Object.defineProperty(N,"Touch",{enumerable:!0,get:function(){return Up.Touch}});var kC=Gd();Object.defineProperty(N,"Disposable",{enumerable:!0,get:function(){return kC.Disposable}});var jy=to();Object.defineProperty(N,"Event",{enumerable:!0,get:function(){return jy.Event}});Object.defineProperty(N,"Emitter",{enumerable:!0,get:function(){return jy.Emitter}});var Hy=Sp();Object.defineProperty(N,"CancellationTokenSource",{enumerable:!0,get:function(){return Hy.CancellationTokenSource}});Object.defineProperty(N,"CancellationToken",{enumerable:!0,get:function(){return Hy.CancellationToken}});var qp=Ny();Object.defineProperty(N,"MessageReader",{enumerable:!0,get:function(){return qp.MessageReader}});Object.defineProperty(N,"AbstractMessageReader",{enumerable:!0,get:function(){return qp.AbstractMessageReader}});Object.defineProperty(N,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return qp.ReadableStreamMessageReader}});var Kp=Ly();Object.defineProperty(N,"MessageWriter",{enumerable:!0,get:function(){return Kp.MessageWriter}});Object.defineProperty(N,"AbstractMessageWriter",{enumerable:!0,get:function(){return Kp.AbstractMessageWriter}});Object.defineProperty(N,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return Kp.WriteableStreamMessageWriter}});var rr=Gy();Object.defineProperty(N,"ConnectionStrategy",{enumerable:!0,get:function(){return rr.ConnectionStrategy}});Object.defineProperty(N,"ConnectionOptions",{enumerable:!0,get:function(){return rr.ConnectionOptions}});Object.defineProperty(N,"NullLogger",{enumerable:!0,get:function(){return rr.NullLogger}});Object.defineProperty(N,"createMessageConnection",{enumerable:!0,get:function(){return rr.createMessageConnection}});Object.defineProperty(N,"ProgressToken",{enumerable:!0,get:function(){return rr.ProgressToken}});Object.defineProperty(N,"ProgressType",{enumerable:!0,get:function(){return rr.ProgressType}});Object.defineProperty(N,"Trace",{enumerable:!0,get:function(){return rr.Trace}});Object.defineProperty(N,"TraceValues",{enumerable:!0,get:function(){return rr.TraceValues}});Object.defineProperty(N,"TraceFormat",{enumerable:!0,get:function(){return rr.TraceFormat}});Object.defineProperty(N,"SetTraceNotification",{enumerable:!0,get:function(){return rr.SetTraceNotification}});Object.defineProperty(N,"LogTraceNotification",{enumerable:!0,get:function(){return rr.LogTraceNotification}});Object.defineProperty(N,"ConnectionErrors",{enumerable:!0,get:function(){return rr.ConnectionErrors}});Object.defineProperty(N,"ConnectionError",{enumerable:!0,get:function(){return rr.ConnectionError}});Object.defineProperty(N,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return rr.CancellationReceiverStrategy}});Object.defineProperty(N,"CancellationSenderStrategy",{enumerable:!0,get:function(){return rr.CancellationSenderStrategy}});Object.defineProperty(N,"CancellationStrategy",{enumerable:!0,get:function(){return rr.CancellationStrategy}});var $C=Hn();N.RAL=$C.default});var Vn=j(_r=>{"use strict";var EC=_r&&_r.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),_C=_r&&_r.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&EC(e,t,r)};Object.defineProperty(_r,"__esModule",{value:!0});_r.createMessageConnection=_r.BrowserMessageWriter=_r.BrowserMessageReader=void 0;var NC=Cy();NC.default.install();var qo=Gp();_C(Gp(),_r);var jp=class extends qo.AbstractMessageReader{constructor(e){super(),this._onData=new qo.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};_r.BrowserMessageReader=jp;var Hp=class extends qo.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};_r.BrowserMessageWriter=Hp;function IC(t,e,r,n){return r===void 0&&(r=qo.NullLogger),qo.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,qo.createMessageConnection)(t,e,r,n)}_r.createMessageConnection=IC});var Wp=j((yK,Wy)=>{"use strict";Wy.exports=Vn()});var io=j((By,tl)=>{(function(t){if(typeof tl=="object"&&typeof tl.exports=="object"){var e=t(by,By);e!==void 0&&(tl.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(p){function R(b){return typeof b=="string"}p.is=R})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(p){function R(b){return typeof b=="string"}p.is=R})(n=e.URI||(e.URI={}));var i;(function(p){p.MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(i=e.integer||(e.integer={}));var o;(function(p){p.MIN_VALUE=0,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(o=e.uinteger||(e.uinteger={}));var s;(function(p){function R(y,d){return y===Number.MAX_VALUE&&(y=o.MAX_VALUE),d===Number.MAX_VALUE&&(d=o.MAX_VALUE),{line:y,character:d}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.uinteger(d.line)&&k.uinteger(d.character)}p.is=b})(s=e.Position||(e.Position={}));var a;(function(p){function R(y,d,$,I){if(k.uinteger(y)&&k.uinteger(d)&&k.uinteger($)&&k.uinteger(I))return{start:s.create(y,d),end:s.create($,I)};if(s.is(y)&&s.is(d))return{start:y,end:d};throw new Error("Range#create called with invalid arguments[".concat(y,", ").concat(d,", ").concat($,", ").concat(I,"]"))}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&s.is(d.start)&&s.is(d.end)}p.is=b})(a=e.Range||(e.Range={}));var u;(function(p){function R(y,d){return{uri:y,range:d}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&a.is(d.range)&&(k.string(d.uri)||k.undefined(d.uri))}p.is=b})(u=e.Location||(e.Location={}));var l;(function(p){function R(y,d,$,I){return{targetUri:y,targetRange:d,targetSelectionRange:$,originSelectionRange:I}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&a.is(d.targetRange)&&k.string(d.targetUri)&&a.is(d.targetSelectionRange)&&(a.is(d.originSelectionRange)||k.undefined(d.originSelectionRange))}p.is=b})(l=e.LocationLink||(e.LocationLink={}));var c;(function(p){function R(y,d,$,I){return{red:y,green:d,blue:$,alpha:I}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.numberRange(d.red,0,1)&&k.numberRange(d.green,0,1)&&k.numberRange(d.blue,0,1)&&k.numberRange(d.alpha,0,1)}p.is=b})(c=e.Color||(e.Color={}));var f;(function(p){function R(y,d){return{range:y,color:d}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&a.is(d.range)&&c.is(d.color)}p.is=b})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(p){function R(y,d,$){return{label:y,textEdit:d,additionalTextEdits:$}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.string(d.label)&&(k.undefined(d.textEdit)||D.is(d))&&(k.undefined(d.additionalTextEdits)||k.typedArray(d.additionalTextEdits,D.is))}p.is=b})(m=e.ColorPresentation||(e.ColorPresentation={}));var T;(function(p){p.Comment="comment",p.Imports="imports",p.Region="region"})(T=e.FoldingRangeKind||(e.FoldingRangeKind={}));var w;(function(p){function R(y,d,$,I,re,ft){var qe={startLine:y,endLine:d};return k.defined($)&&(qe.startCharacter=$),k.defined(I)&&(qe.endCharacter=I),k.defined(re)&&(qe.kind=re),k.defined(ft)&&(qe.collapsedText=ft),qe}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.uinteger(d.startLine)&&k.uinteger(d.startLine)&&(k.undefined(d.startCharacter)||k.uinteger(d.startCharacter))&&(k.undefined(d.endCharacter)||k.uinteger(d.endCharacter))&&(k.undefined(d.kind)||k.string(d.kind))}p.is=b})(w=e.FoldingRange||(e.FoldingRange={}));var A;(function(p){function R(y,d){return{location:y,message:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&u.is(d.location)&&k.string(d.message)}p.is=b})(A=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var _;(function(p){p.Error=1,p.Warning=2,p.Information=3,p.Hint=4})(_=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var C;(function(p){p.Unnecessary=1,p.Deprecated=2})(C=e.DiagnosticTag||(e.DiagnosticTag={}));var v;(function(p){function R(b){var y=b;return k.objectLiteral(y)&&k.string(y.href)}p.is=R})(v=e.CodeDescription||(e.CodeDescription={}));var g;(function(p){function R(y,d,$,I,re,ft){var qe={range:y,message:d};return k.defined($)&&(qe.severity=$),k.defined(I)&&(qe.code=I),k.defined(re)&&(qe.source=re),k.defined(ft)&&(qe.relatedInformation=ft),qe}p.create=R;function b(y){var d,$=y;return k.defined($)&&a.is($.range)&&k.string($.message)&&(k.number($.severity)||k.undefined($.severity))&&(k.integer($.code)||k.string($.code)||k.undefined($.code))&&(k.undefined($.codeDescription)||k.string((d=$.codeDescription)===null||d===void 0?void 0:d.href))&&(k.string($.source)||k.undefined($.source))&&(k.undefined($.relatedInformation)||k.typedArray($.relatedInformation,A.is))}p.is=b})(g=e.Diagnostic||(e.Diagnostic={}));var E;(function(p){function R(y,d){for(var $=[],I=2;I<arguments.length;I++)$[I-2]=arguments[I];var re={title:y,command:d};return k.defined($)&&$.length>0&&(re.arguments=$),re}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.title)&&k.string(d.command)}p.is=b})(E=e.Command||(e.Command={}));var D;(function(p){function R($,I){return{range:$,newText:I}}p.replace=R;function b($,I){return{range:{start:$,end:$},newText:I}}p.insert=b;function y($){return{range:$,newText:""}}p.del=y;function d($){var I=$;return k.objectLiteral(I)&&k.string(I.newText)&&a.is(I.range)}p.is=d})(D=e.TextEdit||(e.TextEdit={}));var X;(function(p){function R(y,d,$){var I={label:y};return d!==void 0&&(I.needsConfirmation=d),$!==void 0&&(I.description=$),I}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.string(d.label)&&(k.boolean(d.needsConfirmation)||d.needsConfirmation===void 0)&&(k.string(d.description)||d.description===void 0)}p.is=b})(X=e.ChangeAnnotation||(e.ChangeAnnotation={}));var ge;(function(p){function R(b){var y=b;return k.string(y)}p.is=R})(ge=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var $e;(function(p){function R($,I,re){return{range:$,newText:I,annotationId:re}}p.replace=R;function b($,I,re){return{range:{start:$,end:$},newText:I,annotationId:re}}p.insert=b;function y($,I){return{range:$,newText:"",annotationId:I}}p.del=y;function d($){var I=$;return D.is(I)&&(X.is(I.annotationId)||ge.is(I.annotationId))}p.is=d})($e=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Gt;(function(p){function R(y,d){return{textDocument:y,edits:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&lt.is(d.textDocument)&&Array.isArray(d.edits)}p.is=b})(Gt=e.TextDocumentEdit||(e.TextDocumentEdit={}));var vt;(function(p){function R(y,d,$){var I={kind:"create",uri:y};return d!==void 0&&(d.overwrite!==void 0||d.ignoreIfExists!==void 0)&&(I.options=d),$!==void 0&&(I.annotationId=$),I}p.create=R;function b(y){var d=y;return d&&d.kind==="create"&&k.string(d.uri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=b})(vt=e.CreateFile||(e.CreateFile={}));var M;(function(p){function R(y,d,$,I){var re={kind:"rename",oldUri:y,newUri:d};return $!==void 0&&($.overwrite!==void 0||$.ignoreIfExists!==void 0)&&(re.options=$),I!==void 0&&(re.annotationId=I),re}p.create=R;function b(y){var d=y;return d&&d.kind==="rename"&&k.string(d.oldUri)&&k.string(d.newUri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=b})(M=e.RenameFile||(e.RenameFile={}));var S;(function(p){function R(y,d,$){var I={kind:"delete",uri:y};return d!==void 0&&(d.recursive!==void 0||d.ignoreIfNotExists!==void 0)&&(I.options=d),$!==void 0&&(I.annotationId=$),I}p.create=R;function b(y){var d=y;return d&&d.kind==="delete"&&k.string(d.uri)&&(d.options===void 0||(d.options.recursive===void 0||k.boolean(d.options.recursive))&&(d.options.ignoreIfNotExists===void 0||k.boolean(d.options.ignoreIfNotExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=b})(S=e.DeleteFile||(e.DeleteFile={}));var q;(function(p){function R(b){var y=b;return y&&(y.changes!==void 0||y.documentChanges!==void 0)&&(y.documentChanges===void 0||y.documentChanges.every(function(d){return k.string(d.kind)?vt.is(d)||M.is(d)||S.is(d):Gt.is(d)}))}p.is=R})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var G=function(){function p(R,b){this.edits=R,this.changeAnnotations=b}return p.prototype.insert=function(R,b,y){var d,$;if(y===void 0?d=D.insert(R,b):ge.is(y)?($=y,d=$e.insert(R,b,y)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(y),d=$e.insert(R,b,$)),this.edits.push(d),$!==void 0)return $},p.prototype.replace=function(R,b,y){var d,$;if(y===void 0?d=D.replace(R,b):ge.is(y)?($=y,d=$e.replace(R,b,y)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(y),d=$e.replace(R,b,$)),this.edits.push(d),$!==void 0)return $},p.prototype.delete=function(R,b){var y,d;if(b===void 0?y=D.del(R):ge.is(b)?(d=b,y=$e.del(R,b)):(this.assertChangeAnnotations(this.changeAnnotations),d=this.changeAnnotations.manage(b),y=$e.del(R,d)),this.edits.push(y),d!==void 0)return d},p.prototype.add=function(R){this.edits.push(R)},p.prototype.all=function(){return this.edits},p.prototype.clear=function(){this.edits.splice(0,this.edits.length)},p.prototype.assertChangeAnnotations=function(R){if(R===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},p}(),ue=function(){function p(R){this._annotations=R===void 0?Object.create(null):R,this._counter=0,this._size=0}return p.prototype.all=function(){return this._annotations},Object.defineProperty(p.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),p.prototype.manage=function(R,b){var y;if(ge.is(R)?y=R:(y=this.nextId(),b=R),this._annotations[y]!==void 0)throw new Error("Id ".concat(y," is already in use."));if(b===void 0)throw new Error("No annotation provided for id ".concat(y));return this._annotations[y]=b,this._size++,y},p.prototype.nextId=function(){return this._counter++,this._counter.toString()},p}(),ee=function(){function p(R){var b=this;this._textEditChanges=Object.create(null),R!==void 0?(this._workspaceEdit=R,R.documentChanges?(this._changeAnnotations=new ue(R.changeAnnotations),R.changeAnnotations=this._changeAnnotations.all(),R.documentChanges.forEach(function(y){if(Gt.is(y)){var d=new G(y.edits,b._changeAnnotations);b._textEditChanges[y.textDocument.uri]=d}})):R.changes&&Object.keys(R.changes).forEach(function(y){var d=new G(R.changes[y]);b._textEditChanges[y]=d})):this._workspaceEdit={}}return Object.defineProperty(p.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),p.prototype.getTextEditChange=function(R){if(lt.is(R)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var b={uri:R.uri,version:R.version},y=this._textEditChanges[b.uri];if(!y){var d=[],$={textDocument:b,edits:d};this._workspaceEdit.documentChanges.push($),y=new G(d,this._changeAnnotations),this._textEditChanges[b.uri]=y}return y}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var y=this._textEditChanges[R];if(!y){var d=[];this._workspaceEdit.changes[R]=d,y=new G(d),this._textEditChanges[R]=y}return y}},p.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new ue,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},p.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},p.prototype.createFile=function(R,b,y){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ge.is(b)?d=b:y=b;var $,I;if(d===void 0?$=vt.create(R,y):(I=ge.is(d)?d:this._changeAnnotations.manage(d),$=vt.create(R,y,I)),this._workspaceEdit.documentChanges.push($),I!==void 0)return I},p.prototype.renameFile=function(R,b,y,d){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var $;X.is(y)||ge.is(y)?$=y:d=y;var I,re;if($===void 0?I=M.create(R,b,d):(re=ge.is($)?$:this._changeAnnotations.manage($),I=M.create(R,b,d,re)),this._workspaceEdit.documentChanges.push(I),re!==void 0)return re},p.prototype.deleteFile=function(R,b,y){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ge.is(b)?d=b:y=b;var $,I;if(d===void 0?$=S.create(R,y):(I=ge.is(d)?d:this._changeAnnotations.manage(d),$=S.create(R,y,I)),this._workspaceEdit.documentChanges.push($),I!==void 0)return I},p}();e.WorkspaceChange=ee;var Q;(function(p){function R(y){return{uri:y}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.uri)}p.is=b})(Q=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var xt;(function(p){function R(y,d){return{uri:y,version:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.uri)&&k.integer(d.version)}p.is=b})(xt=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var lt;(function(p){function R(y,d){return{uri:y,version:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.uri)&&(d.version===null||k.integer(d.version))}p.is=b})(lt=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var me;(function(p){function R(y,d,$,I){return{uri:y,languageId:d,version:$,text:I}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.uri)&&k.string(d.languageId)&&k.integer(d.version)&&k.string(d.text)}p.is=b})(me=e.TextDocumentItem||(e.TextDocumentItem={}));var $r;(function(p){p.PlainText="plaintext",p.Markdown="markdown";function R(b){var y=b;return y===p.PlainText||y===p.Markdown}p.is=R})($r=e.MarkupKind||(e.MarkupKind={}));var Kn;(function(p){function R(b){var y=b;return k.objectLiteral(b)&&$r.is(y.kind)&&k.string(y.value)}p.is=R})(Kn=e.MarkupContent||(e.MarkupContent={}));var ya;(function(p){p.Text=1,p.Method=2,p.Function=3,p.Constructor=4,p.Field=5,p.Variable=6,p.Class=7,p.Interface=8,p.Module=9,p.Property=10,p.Unit=11,p.Value=12,p.Enum=13,p.Keyword=14,p.Snippet=15,p.Color=16,p.File=17,p.Reference=18,p.Folder=19,p.EnumMember=20,p.Constant=21,p.Struct=22,p.Event=23,p.Operator=24,p.TypeParameter=25})(ya=e.CompletionItemKind||(e.CompletionItemKind={}));var Yi;(function(p){p.PlainText=1,p.Snippet=2})(Yi=e.InsertTextFormat||(e.InsertTextFormat={}));var lr;(function(p){p.Deprecated=1})(lr=e.CompletionItemTag||(e.CompletionItemTag={}));var Po;(function(p){function R(y,d,$){return{newText:y,insert:d,replace:$}}p.create=R;function b(y){var d=y;return d&&k.string(d.newText)&&a.is(d.insert)&&a.is(d.replace)}p.is=b})(Po=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var Rt;(function(p){p.asIs=1,p.adjustIndentation=2})(Rt=e.InsertTextMode||(e.InsertTextMode={}));var Zt;(function(p){function R(b){var y=b;return y&&(k.string(y.detail)||y.detail===void 0)&&(k.string(y.description)||y.description===void 0)}p.is=R})(Zt=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var vn;(function(p){function R(b){return{label:b}}p.create=R})(vn=e.CompletionItem||(e.CompletionItem={}));var jt;(function(p){function R(b,y){return{items:b||[],isIncomplete:!!y}}p.create=R})(jt=e.CompletionList||(e.CompletionList={}));var ct;(function(p){function R(y){return y.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}p.fromPlainText=R;function b(y){var d=y;return k.string(d)||k.objectLiteral(d)&&k.string(d.language)&&k.string(d.value)}p.is=b})(ct=e.MarkedString||(e.MarkedString={}));var qr;(function(p){function R(b){var y=b;return!!y&&k.objectLiteral(y)&&(Kn.is(y.contents)||ct.is(y.contents)||k.typedArray(y.contents,ct.is))&&(b.range===void 0||a.is(b.range))}p.is=R})(qr=e.Hover||(e.Hover={}));var Er;(function(p){function R(b,y){return y?{label:b,documentation:y}:{label:b}}p.create=R})(Er=e.ParameterInformation||(e.ParameterInformation={}));var vr;(function(p){function R(b,y){for(var d=[],$=2;$<arguments.length;$++)d[$-2]=arguments[$];var I={label:b};return k.defined(y)&&(I.documentation=y),k.defined(d)?I.parameters=d:I.parameters=[],I}p.create=R})(vr=e.SignatureInformation||(e.SignatureInformation={}));var Ji;(function(p){p.Text=1,p.Read=2,p.Write=3})(Ji=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var Ti;(function(p){function R(b,y){var d={range:b};return k.number(y)&&(d.kind=y),d}p.create=R})(Ti=e.DocumentHighlight||(e.DocumentHighlight={}));var Od;(function(p){p.File=1,p.Module=2,p.Namespace=3,p.Package=4,p.Class=5,p.Method=6,p.Property=7,p.Field=8,p.Constructor=9,p.Enum=10,p.Interface=11,p.Function=12,p.Variable=13,p.Constant=14,p.String=15,p.Number=16,p.Boolean=17,p.Array=18,p.Object=19,p.Key=20,p.Null=21,p.EnumMember=22,p.Struct=23,p.Event=24,p.Operator=25,p.TypeParameter=26})(Od=e.SymbolKind||(e.SymbolKind={}));var vi;(function(p){p.Deprecated=1})(vi=e.SymbolTag||(e.SymbolTag={}));var Qi;(function(p){function R(b,y,d,$,I){var re={name:b,kind:y,location:{uri:$,range:d}};return I&&(re.containerName=I),re}p.create=R})(Qi=e.SymbolInformation||(e.SymbolInformation={}));var Ld;(function(p){function R(b,y,d,$){return $!==void 0?{name:b,kind:y,location:{uri:d,range:$}}:{name:b,kind:y,location:{uri:d}}}p.create=R})(Ld=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var Md;(function(p){function R(y,d,$,I,re,ft){var qe={name:y,detail:d,kind:$,range:I,selectionRange:re};return ft!==void 0&&(qe.children=ft),qe}p.create=R;function b(y){var d=y;return d&&k.string(d.name)&&k.number(d.kind)&&a.is(d.range)&&a.is(d.selectionRange)&&(d.detail===void 0||k.string(d.detail))&&(d.deprecated===void 0||k.boolean(d.deprecated))&&(d.children===void 0||Array.isArray(d.children))&&(d.tags===void 0||Array.isArray(d.tags))}p.is=b})(Md=e.DocumentSymbol||(e.DocumentSymbol={}));var Zi;(function(p){p.Empty="",p.QuickFix="quickfix",p.Refactor="refactor",p.RefactorExtract="refactor.extract",p.RefactorInline="refactor.inline",p.RefactorRewrite="refactor.rewrite",p.Source="source",p.SourceOrganizeImports="source.organizeImports",p.SourceFixAll="source.fixAll"})(Zi=e.CodeActionKind||(e.CodeActionKind={}));var Do;(function(p){p.Invoked=1,p.Automatic=2})(Do=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var ju;(function(p){function R(y,d,$){var I={diagnostics:y};return d!=null&&(I.only=d),$!=null&&(I.triggerKind=$),I}p.create=R;function b(y){var d=y;return k.defined(d)&&k.typedArray(d.diagnostics,g.is)&&(d.only===void 0||k.typedArray(d.only,k.string))&&(d.triggerKind===void 0||d.triggerKind===Do.Invoked||d.triggerKind===Do.Automatic)}p.is=b})(ju=e.CodeActionContext||(e.CodeActionContext={}));var ga;(function(p){function R(y,d,$){var I={title:y},re=!0;return typeof d=="string"?(re=!1,I.kind=d):E.is(d)?I.command=d:I.edit=d,re&&$!==void 0&&(I.kind=$),I}p.create=R;function b(y){var d=y;return d&&k.string(d.title)&&(d.diagnostics===void 0||k.typedArray(d.diagnostics,g.is))&&(d.kind===void 0||k.string(d.kind))&&(d.edit!==void 0||d.command!==void 0)&&(d.command===void 0||E.is(d.command))&&(d.isPreferred===void 0||k.boolean(d.isPreferred))&&(d.edit===void 0||q.is(d.edit))}p.is=b})(ga=e.CodeAction||(e.CodeAction={}));var Hu;(function(p){function R(y,d){var $={range:y};return k.defined(d)&&($.data=d),$}p.create=R;function b(y){var d=y;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.command)||E.is(d.command))}p.is=b})(Hu=e.CodeLens||(e.CodeLens={}));var xi;(function(p){function R(y,d){return{tabSize:y,insertSpaces:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.uinteger(d.tabSize)&&k.boolean(d.insertSpaces)}p.is=b})(xi=e.FormattingOptions||(e.FormattingOptions={}));var x;(function(p){function R(y,d,$){return{range:y,target:d,data:$}}p.create=R;function b(y){var d=y;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.target)||k.string(d.target))}p.is=b})(x=e.DocumentLink||(e.DocumentLink={}));var P;(function(p){function R(y,d){return{range:y,parent:d}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&a.is(d.range)&&(d.parent===void 0||p.is(d.parent))}p.is=b})(P=e.SelectionRange||(e.SelectionRange={}));var F;(function(p){p.namespace="namespace",p.type="type",p.class="class",p.enum="enum",p.interface="interface",p.struct="struct",p.typeParameter="typeParameter",p.parameter="parameter",p.variable="variable",p.property="property",p.enumMember="enumMember",p.event="event",p.function="function",p.method="method",p.macro="macro",p.keyword="keyword",p.modifier="modifier",p.comment="comment",p.string="string",p.number="number",p.regexp="regexp",p.operator="operator",p.decorator="decorator"})(F=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var B;(function(p){p.declaration="declaration",p.definition="definition",p.readonly="readonly",p.static="static",p.deprecated="deprecated",p.abstract="abstract",p.async="async",p.modification="modification",p.documentation="documentation",p.defaultLibrary="defaultLibrary"})(B=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var De;(function(p){function R(b){var y=b;return k.objectLiteral(y)&&(y.resultId===void 0||typeof y.resultId=="string")&&Array.isArray(y.data)&&(y.data.length===0||typeof y.data[0]=="number")}p.is=R})(De=e.SemanticTokens||(e.SemanticTokens={}));var Oe;(function(p){function R(y,d){return{range:y,text:d}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&k.string(d.text)}p.is=b})(Oe=e.InlineValueText||(e.InlineValueText={}));var Je;(function(p){function R(y,d,$){return{range:y,variableName:d,caseSensitiveLookup:$}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&k.boolean(d.caseSensitiveLookup)&&(k.string(d.variableName)||d.variableName===void 0)}p.is=b})(Je=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var bt;(function(p){function R(y,d){return{range:y,expression:d}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&(k.string(d.expression)||d.expression===void 0)}p.is=b})(bt=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ce;(function(p){function R(y,d){return{frameId:y,stoppedLocation:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&a.is(y.stoppedLocation)}p.is=b})(ce=e.InlineValueContext||(e.InlineValueContext={}));var Ue;(function(p){p.Type=1,p.Parameter=2;function R(b){return b===1||b===2}p.is=R})(Ue=e.InlayHintKind||(e.InlayHintKind={}));var Te;(function(p){function R(y){return{value:y}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&(d.tooltip===void 0||k.string(d.tooltip)||Kn.is(d.tooltip))&&(d.location===void 0||u.is(d.location))&&(d.command===void 0||E.is(d.command))}p.is=b})(Te=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var ht;(function(p){function R(y,d,$){var I={position:y,label:d};return $!==void 0&&(I.kind=$),I}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&s.is(d.position)&&(k.string(d.label)||k.typedArray(d.label,Te.is))&&(d.kind===void 0||Ue.is(d.kind))&&d.textEdits===void 0||k.typedArray(d.textEdits,D.is)&&(d.tooltip===void 0||k.string(d.tooltip)||Kn.is(d.tooltip))&&(d.paddingLeft===void 0||k.boolean(d.paddingLeft))&&(d.paddingRight===void 0||k.boolean(d.paddingRight))}p.is=b})(ht=e.InlayHint||(e.InlayHint={}));var er;(function(p){function R(b){var y=b;return k.objectLiteral(y)&&n.is(y.uri)&&k.string(y.name)}p.is=R})(er=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var Gn;(function(p){function R($,I,re,ft){return new xn($,I,re,ft)}p.create=R;function b($){var I=$;return!!(k.defined(I)&&k.string(I.uri)&&(k.undefined(I.languageId)||k.string(I.languageId))&&k.uinteger(I.lineCount)&&k.func(I.getText)&&k.func(I.positionAt)&&k.func(I.offsetAt))}p.is=b;function y($,I){for(var re=$.getText(),ft=d(I,function(Oo,Wu){var Ry=Oo.range.start.line-Wu.range.start.line;return Ry===0?Oo.range.start.character-Wu.range.start.character:Ry}),qe=re.length,Zr=ft.length-1;Zr>=0;Zr--){var en=ft[Zr],jn=$.offsetAt(en.range.start),fe=$.offsetAt(en.range.end);if(fe<=qe)re=re.substring(0,jn)+en.newText+re.substring(fe,re.length);else throw new Error("Overlapping edit");qe=jn}return re}p.applyEdits=y;function d($,I){if($.length<=1)return $;var re=$.length/2|0,ft=$.slice(0,re),qe=$.slice(re);d(ft,I),d(qe,I);for(var Zr=0,en=0,jn=0;Zr<ft.length&&en<qe.length;){var fe=I(ft[Zr],qe[en]);fe<=0?$[jn++]=ft[Zr++]:$[jn++]=qe[en++]}for(;Zr<ft.length;)$[jn++]=ft[Zr++];for(;en<qe.length;)$[jn++]=qe[en++];return $}})(Gn=e.TextDocument||(e.TextDocument={}));var xn=function(){function p(R,b,y,d){this._uri=R,this._languageId=b,this._version=y,this._content=d,this._lineOffsets=void 0}return Object.defineProperty(p.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),p.prototype.getText=function(R){if(R){var b=this.offsetAt(R.start),y=this.offsetAt(R.end);return this._content.substring(b,y)}return this._content},p.prototype.update=function(R,b){this._content=R.text,this._version=b,this._lineOffsets=void 0},p.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var R=[],b=this._content,y=!0,d=0;d<b.length;d++){y&&(R.push(d),y=!1);var $=b.charAt(d);y=$==="\r"||$===`
`,$==="\r"&&d+1<b.length&&b.charAt(d+1)===`
`&&d++}y&&b.length>0&&R.push(b.length),this._lineOffsets=R}return this._lineOffsets},p.prototype.positionAt=function(R){R=Math.max(Math.min(R,this._content.length),0);var b=this.getLineOffsets(),y=0,d=b.length;if(d===0)return s.create(0,R);for(;y<d;){var $=Math.floor((y+d)/2);b[$]>R?d=$:y=$+1}var I=y-1;return s.create(I,R-b[I])},p.prototype.offsetAt=function(R){var b=this.getLineOffsets();if(R.line>=b.length)return this._content.length;if(R.line<0)return 0;var y=b[R.line],d=R.line+1<b.length?b[R.line+1]:this._content.length;return Math.max(Math.min(y+R.character,d),y)},Object.defineProperty(p.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),p}(),k;(function(p){var R=Object.prototype.toString;function b(fe){return typeof fe<"u"}p.defined=b;function y(fe){return typeof fe>"u"}p.undefined=y;function d(fe){return fe===!0||fe===!1}p.boolean=d;function $(fe){return R.call(fe)==="[object String]"}p.string=$;function I(fe){return R.call(fe)==="[object Number]"}p.number=I;function re(fe,Oo,Wu){return R.call(fe)==="[object Number]"&&Oo<=fe&&fe<=Wu}p.numberRange=re;function ft(fe){return R.call(fe)==="[object Number]"&&-2147483648<=fe&&fe<=2147483647}p.integer=ft;function qe(fe){return R.call(fe)==="[object Number]"&&0<=fe&&fe<=2147483647}p.uinteger=qe;function Zr(fe){return R.call(fe)==="[object Function]"}p.func=Zr;function en(fe){return fe!==null&&typeof fe=="object"}p.objectLiteral=en;function jn(fe,Oo){return Array.isArray(fe)&&fe.every(Oo)}p.typedArray=jn})(k||(k={}))})});var nt=j(fr=>{"use strict";Object.defineProperty(fr,"__esModule",{value:!0});fr.ProtocolNotificationType=fr.ProtocolNotificationType0=fr.ProtocolRequestType=fr.ProtocolRequestType0=fr.RegistrationType=fr.MessageDirection=void 0;var Ko=Vn(),PC;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(PC=fr.MessageDirection||(fr.MessageDirection={}));var Bp=class{constructor(e){this.method=e}};fr.RegistrationType=Bp;var zp=class extends Ko.RequestType0{constructor(e){super(e)}};fr.ProtocolRequestType0=zp;var Vp=class extends Ko.RequestType{constructor(e){super(e,Ko.ParameterStructures.byName)}};fr.ProtocolRequestType=Vp;var Xp=class extends Ko.NotificationType0{constructor(e){super(e)}};fr.ProtocolNotificationType0=Xp;var Yp=class extends Ko.NotificationType{constructor(e){super(e,Ko.ParameterStructures.byName)}};fr.ProtocolNotificationType=Yp});var rl=j(wt=>{"use strict";Object.defineProperty(wt,"__esModule",{value:!0});wt.objectLiteral=wt.typedArray=wt.stringArray=wt.array=wt.func=wt.error=wt.number=wt.string=wt.boolean=void 0;function DC(t){return t===!0||t===!1}wt.boolean=DC;function zy(t){return typeof t=="string"||t instanceof String}wt.string=zy;function OC(t){return typeof t=="number"||t instanceof Number}wt.number=OC;function LC(t){return t instanceof Error}wt.error=LC;function MC(t){return typeof t=="function"}wt.func=MC;function Vy(t){return Array.isArray(t)}wt.array=Vy;function FC(t){return Vy(t)&&t.every(e=>zy(e))}wt.stringArray=FC;function UC(t,e){return Array.isArray(t)&&t.every(e)}wt.typedArray=UC;function qC(t){return t!==null&&typeof t=="object"}wt.objectLiteral=qC});var Yy=j(wa=>{"use strict";Object.defineProperty(wa,"__esModule",{value:!0});wa.ImplementationRequest=void 0;var Xy=nt(),KC;(function(t){t.method="textDocument/implementation",t.messageDirection=Xy.MessageDirection.clientToServer,t.type=new Xy.ProtocolRequestType(t.method)})(KC=wa.ImplementationRequest||(wa.ImplementationRequest={}))});var Qy=j(Sa=>{"use strict";Object.defineProperty(Sa,"__esModule",{value:!0});Sa.TypeDefinitionRequest=void 0;var Jy=nt(),GC;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=Jy.MessageDirection.clientToServer,t.type=new Jy.ProtocolRequestType(t.method)})(GC=Sa.TypeDefinitionRequest||(Sa.TypeDefinitionRequest={}))});var Zy=j(Ri=>{"use strict";Object.defineProperty(Ri,"__esModule",{value:!0});Ri.DidChangeWorkspaceFoldersNotification=Ri.WorkspaceFoldersRequest=void 0;var nl=nt(),jC;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=nl.MessageDirection.serverToClient,t.type=new nl.ProtocolRequestType0(t.method)})(jC=Ri.WorkspaceFoldersRequest||(Ri.WorkspaceFoldersRequest={}));var HC;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=nl.MessageDirection.clientToServer,t.type=new nl.ProtocolNotificationType(t.method)})(HC=Ri.DidChangeWorkspaceFoldersNotification||(Ri.DidChangeWorkspaceFoldersNotification={}))});var tg=j(Aa=>{"use strict";Object.defineProperty(Aa,"__esModule",{value:!0});Aa.ConfigurationRequest=void 0;var eg=nt(),WC;(function(t){t.method="workspace/configuration",t.messageDirection=eg.MessageDirection.serverToClient,t.type=new eg.ProtocolRequestType(t.method)})(WC=Aa.ConfigurationRequest||(Aa.ConfigurationRequest={}))});var rg=j(bi=>{"use strict";Object.defineProperty(bi,"__esModule",{value:!0});bi.ColorPresentationRequest=bi.DocumentColorRequest=void 0;var il=nt(),BC;(function(t){t.method="textDocument/documentColor",t.messageDirection=il.MessageDirection.clientToServer,t.type=new il.ProtocolRequestType(t.method)})(BC=bi.DocumentColorRequest||(bi.DocumentColorRequest={}));var zC;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=il.MessageDirection.clientToServer,t.type=new il.ProtocolRequestType(t.method)})(zC=bi.ColorPresentationRequest||(bi.ColorPresentationRequest={}))});var ig=j(Ca=>{"use strict";Object.defineProperty(Ca,"__esModule",{value:!0});Ca.FoldingRangeRequest=void 0;var ng=nt(),VC;(function(t){t.method="textDocument/foldingRange",t.messageDirection=ng.MessageDirection.clientToServer,t.type=new ng.ProtocolRequestType(t.method)})(VC=Ca.FoldingRangeRequest||(Ca.FoldingRangeRequest={}))});var sg=j(ka=>{"use strict";Object.defineProperty(ka,"__esModule",{value:!0});ka.DeclarationRequest=void 0;var og=nt(),XC;(function(t){t.method="textDocument/declaration",t.messageDirection=og.MessageDirection.clientToServer,t.type=new og.ProtocolRequestType(t.method)})(XC=ka.DeclarationRequest||(ka.DeclarationRequest={}))});var ug=j($a=>{"use strict";Object.defineProperty($a,"__esModule",{value:!0});$a.SelectionRangeRequest=void 0;var ag=nt(),YC;(function(t){t.method="textDocument/selectionRange",t.messageDirection=ag.MessageDirection.clientToServer,t.type=new ag.ProtocolRequestType(t.method)})(YC=$a.SelectionRangeRequest||($a.SelectionRangeRequest={}))});var lg=j(nn=>{"use strict";Object.defineProperty(nn,"__esModule",{value:!0});nn.WorkDoneProgressCancelNotification=nn.WorkDoneProgressCreateRequest=nn.WorkDoneProgress=void 0;var JC=Vn(),ol=nt(),QC;(function(t){t.type=new JC.ProgressType;function e(r){return r===t.type}t.is=e})(QC=nn.WorkDoneProgress||(nn.WorkDoneProgress={}));var ZC;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=ol.MessageDirection.serverToClient,t.type=new ol.ProtocolRequestType(t.method)})(ZC=nn.WorkDoneProgressCreateRequest||(nn.WorkDoneProgressCreateRequest={}));var ek;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=ol.MessageDirection.clientToServer,t.type=new ol.ProtocolNotificationType(t.method)})(ek=nn.WorkDoneProgressCancelNotification||(nn.WorkDoneProgressCancelNotification={}))});var cg=j(on=>{"use strict";Object.defineProperty(on,"__esModule",{value:!0});on.CallHierarchyOutgoingCallsRequest=on.CallHierarchyIncomingCallsRequest=on.CallHierarchyPrepareRequest=void 0;var Go=nt(),tk;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Go.MessageDirection.clientToServer,t.type=new Go.ProtocolRequestType(t.method)})(tk=on.CallHierarchyPrepareRequest||(on.CallHierarchyPrepareRequest={}));var rk;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Go.MessageDirection.clientToServer,t.type=new Go.ProtocolRequestType(t.method)})(rk=on.CallHierarchyIncomingCallsRequest||(on.CallHierarchyIncomingCallsRequest={}));var nk;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Go.MessageDirection.clientToServer,t.type=new Go.ProtocolRequestType(t.method)})(nk=on.CallHierarchyOutgoingCallsRequest||(on.CallHierarchyOutgoingCallsRequest={}))});var fg=j(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.SemanticTokensRefreshRequest=St.SemanticTokensRangeRequest=St.SemanticTokensDeltaRequest=St.SemanticTokensRequest=St.SemanticTokensRegistrationType=St.TokenFormat=void 0;var Xn=nt(),ik;(function(t){t.Relative="relative"})(ik=St.TokenFormat||(St.TokenFormat={}));var sl;(function(t){t.method="textDocument/semanticTokens",t.type=new Xn.RegistrationType(t.method)})(sl=St.SemanticTokensRegistrationType||(St.SemanticTokensRegistrationType={}));var ok;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Xn.MessageDirection.clientToServer,t.type=new Xn.ProtocolRequestType(t.method),t.registrationMethod=sl.method})(ok=St.SemanticTokensRequest||(St.SemanticTokensRequest={}));var sk;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Xn.MessageDirection.clientToServer,t.type=new Xn.ProtocolRequestType(t.method),t.registrationMethod=sl.method})(sk=St.SemanticTokensDeltaRequest||(St.SemanticTokensDeltaRequest={}));var ak;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Xn.MessageDirection.clientToServer,t.type=new Xn.ProtocolRequestType(t.method),t.registrationMethod=sl.method})(ak=St.SemanticTokensRangeRequest||(St.SemanticTokensRangeRequest={}));var uk;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Xn.MessageDirection.clientToServer,t.type=new Xn.ProtocolRequestType0(t.method)})(uk=St.SemanticTokensRefreshRequest||(St.SemanticTokensRefreshRequest={}))});var pg=j(Ea=>{"use strict";Object.defineProperty(Ea,"__esModule",{value:!0});Ea.ShowDocumentRequest=void 0;var dg=nt(),lk;(function(t){t.method="window/showDocument",t.messageDirection=dg.MessageDirection.serverToClient,t.type=new dg.ProtocolRequestType(t.method)})(lk=Ea.ShowDocumentRequest||(Ea.ShowDocumentRequest={}))});var hg=j(_a=>{"use strict";Object.defineProperty(_a,"__esModule",{value:!0});_a.LinkedEditingRangeRequest=void 0;var mg=nt(),ck;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=mg.MessageDirection.clientToServer,t.type=new mg.ProtocolRequestType(t.method)})(ck=_a.LinkedEditingRangeRequest||(_a.LinkedEditingRangeRequest={}))});var yg=j(it=>{"use strict";Object.defineProperty(it,"__esModule",{value:!0});it.WillDeleteFilesRequest=it.DidDeleteFilesNotification=it.DidRenameFilesNotification=it.WillRenameFilesRequest=it.DidCreateFilesNotification=it.WillCreateFilesRequest=it.FileOperationPatternKind=void 0;var Kr=nt(),fk;(function(t){t.file="file",t.folder="folder"})(fk=it.FileOperationPatternKind||(it.FileOperationPatternKind={}));var dk;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(dk=it.WillCreateFilesRequest||(it.WillCreateFilesRequest={}));var pk;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(pk=it.DidCreateFilesNotification||(it.DidCreateFilesNotification={}));var mk;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(mk=it.WillRenameFilesRequest||(it.WillRenameFilesRequest={}));var hk;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(hk=it.DidRenameFilesNotification||(it.DidRenameFilesNotification={}));var yk;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(yk=it.DidDeleteFilesNotification||(it.DidDeleteFilesNotification={}));var gk;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(gk=it.WillDeleteFilesRequest||(it.WillDeleteFilesRequest={}))});var Tg=j(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.MonikerRequest=sn.MonikerKind=sn.UniquenessLevel=void 0;var gg=nt(),Tk;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(Tk=sn.UniquenessLevel||(sn.UniquenessLevel={}));var vk;(function(t){t.$import="import",t.$export="export",t.local="local"})(vk=sn.MonikerKind||(sn.MonikerKind={}));var xk;(function(t){t.method="textDocument/moniker",t.messageDirection=gg.MessageDirection.clientToServer,t.type=new gg.ProtocolRequestType(t.method)})(xk=sn.MonikerRequest||(sn.MonikerRequest={}))});var vg=j(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.TypeHierarchySubtypesRequest=an.TypeHierarchySupertypesRequest=an.TypeHierarchyPrepareRequest=void 0;var jo=nt(),Rk;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=jo.MessageDirection.clientToServer,t.type=new jo.ProtocolRequestType(t.method)})(Rk=an.TypeHierarchyPrepareRequest||(an.TypeHierarchyPrepareRequest={}));var bk;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=jo.MessageDirection.clientToServer,t.type=new jo.ProtocolRequestType(t.method)})(bk=an.TypeHierarchySupertypesRequest||(an.TypeHierarchySupertypesRequest={}));var wk;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=jo.MessageDirection.clientToServer,t.type=new jo.ProtocolRequestType(t.method)})(wk=an.TypeHierarchySubtypesRequest||(an.TypeHierarchySubtypesRequest={}))});var xg=j(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.InlineValueRefreshRequest=wi.InlineValueRequest=void 0;var al=nt(),Sk;(function(t){t.method="textDocument/inlineValue",t.messageDirection=al.MessageDirection.clientToServer,t.type=new al.ProtocolRequestType(t.method)})(Sk=wi.InlineValueRequest||(wi.InlineValueRequest={}));var Ak;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=al.MessageDirection.clientToServer,t.type=new al.ProtocolRequestType0(t.method)})(Ak=wi.InlineValueRefreshRequest||(wi.InlineValueRefreshRequest={}))});var Rg=j(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});un.InlayHintRefreshRequest=un.InlayHintResolveRequest=un.InlayHintRequest=void 0;var Ho=nt(),Ck;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Ho.MessageDirection.clientToServer,t.type=new Ho.ProtocolRequestType(t.method)})(Ck=un.InlayHintRequest||(un.InlayHintRequest={}));var kk;(function(t){t.method="inlayHint/resolve",t.messageDirection=Ho.MessageDirection.clientToServer,t.type=new Ho.ProtocolRequestType(t.method)})(kk=un.InlayHintResolveRequest||(un.InlayHintResolveRequest={}));var $k;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Ho.MessageDirection.clientToServer,t.type=new Ho.ProtocolRequestType0(t.method)})($k=un.InlayHintRefreshRequest||(un.InlayHintRefreshRequest={}))});var wg=j(Ht=>{"use strict";Object.defineProperty(Ht,"__esModule",{value:!0});Ht.DiagnosticRefreshRequest=Ht.WorkspaceDiagnosticRequest=Ht.DocumentDiagnosticRequest=Ht.DocumentDiagnosticReportKind=Ht.DiagnosticServerCancellationData=void 0;var bg=Vn(),Ek=rl(),Wo=nt(),_k;(function(t){function e(r){let n=r;return n&&Ek.boolean(n.retriggerRequest)}t.is=e})(_k=Ht.DiagnosticServerCancellationData||(Ht.DiagnosticServerCancellationData={}));var Nk;(function(t){t.Full="full",t.Unchanged="unchanged"})(Nk=Ht.DocumentDiagnosticReportKind||(Ht.DocumentDiagnosticReportKind={}));var Ik;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method),t.partialResult=new bg.ProgressType})(Ik=Ht.DocumentDiagnosticRequest||(Ht.DocumentDiagnosticRequest={}));var Pk;(function(t){t.method="workspace/diagnostic",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method),t.partialResult=new bg.ProgressType})(Pk=Ht.WorkspaceDiagnosticRequest||(Ht.WorkspaceDiagnosticRequest={}));var Dk;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType0(t.method)})(Dk=Ht.DiagnosticRefreshRequest||(Ht.DiagnosticRefreshRequest={}))});var Cg=j(xe=>{"use strict";Object.defineProperty(xe,"__esModule",{value:!0});xe.DidCloseNotebookDocumentNotification=xe.DidSaveNotebookDocumentNotification=xe.DidChangeNotebookDocumentNotification=xe.NotebookCellArrayChange=xe.DidOpenNotebookDocumentNotification=xe.NotebookDocumentSyncRegistrationType=xe.NotebookDocument=xe.NotebookCell=xe.ExecutionSummary=xe.NotebookCellKind=void 0;var Na=io(),ln=rl(),Rn=nt(),Sg;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(Sg=xe.NotebookCellKind||(xe.NotebookCellKind={}));var Ag;(function(t){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}t.create=e;function r(i){let o=i;return ln.objectLiteral(o)&&Na.uinteger.is(o.executionOrder)&&(o.success===void 0||ln.boolean(o.success))}t.is=r;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}t.equals=n})(Ag=xe.ExecutionSummary||(xe.ExecutionSummary={}));var Jp;(function(t){function e(o,s){return{kind:o,document:s}}t.create=e;function r(o){let s=o;return ln.objectLiteral(s)&&Sg.is(s.kind)&&Na.DocumentUri.is(s.document)&&(s.metadata===void 0||ln.objectLiteral(s.metadata))}t.is=r;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!Ag.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}t.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),u=Array.isArray(s);if(a!==u)return!1;if(a&&u){if(o.length!==s.length)return!1;for(let l=0;l<o.length;l++)if(!i(o[l],s[l]))return!1}if(ln.objectLiteral(o)&&ln.objectLiteral(s)){let l=Object.keys(o),c=Object.keys(s);if(l.length!==c.length||(l.sort(),c.sort(),!i(l,c)))return!1;for(let f=0;f<l.length;f++){let m=l[f];if(!i(o[m],s[m]))return!1}}return!0}})(Jp=xe.NotebookCell||(xe.NotebookCell={}));var Ok;(function(t){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}t.create=e;function r(n){let i=n;return ln.objectLiteral(i)&&ln.string(i.uri)&&Na.integer.is(i.version)&&ln.typedArray(i.cells,Jp.is)}t.is=r})(Ok=xe.NotebookDocument||(xe.NotebookDocument={}));var Ia;(function(t){t.method="notebookDocument/sync",t.messageDirection=Rn.MessageDirection.clientToServer,t.type=new Rn.RegistrationType(t.method)})(Ia=xe.NotebookDocumentSyncRegistrationType||(xe.NotebookDocumentSyncRegistrationType={}));var Lk;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=Rn.MessageDirection.clientToServer,t.type=new Rn.ProtocolNotificationType(t.method),t.registrationMethod=Ia.method})(Lk=xe.DidOpenNotebookDocumentNotification||(xe.DidOpenNotebookDocumentNotification={}));var Mk;(function(t){function e(n){let i=n;return ln.objectLiteral(i)&&Na.uinteger.is(i.start)&&Na.uinteger.is(i.deleteCount)&&(i.cells===void 0||ln.typedArray(i.cells,Jp.is))}t.is=e;function r(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}t.create=r})(Mk=xe.NotebookCellArrayChange||(xe.NotebookCellArrayChange={}));var Fk;(function(t){t.method="notebookDocument/didChange",t.messageDirection=Rn.MessageDirection.clientToServer,t.type=new Rn.ProtocolNotificationType(t.method),t.registrationMethod=Ia.method})(Fk=xe.DidChangeNotebookDocumentNotification||(xe.DidChangeNotebookDocumentNotification={}));var Uk;(function(t){t.method="notebookDocument/didSave",t.messageDirection=Rn.MessageDirection.clientToServer,t.type=new Rn.ProtocolNotificationType(t.method),t.registrationMethod=Ia.method})(Uk=xe.DidSaveNotebookDocumentNotification||(xe.DidSaveNotebookDocumentNotification={}));var qk;(function(t){t.method="notebookDocument/didClose",t.messageDirection=Rn.MessageDirection.clientToServer,t.type=new Rn.ProtocolNotificationType(t.method),t.registrationMethod=Ia.method})(qk=xe.DidCloseNotebookDocumentNotification||(xe.DidCloseNotebookDocumentNotification={}))});var Og=j(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=void 0;var O=nt(),kg=io(),Wt=rl(),Kk=Yy();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return Kk.ImplementationRequest}});var Gk=Qy();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return Gk.TypeDefinitionRequest}});var $g=Zy();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return $g.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return $g.DidChangeWorkspaceFoldersNotification}});var jk=tg();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return jk.ConfigurationRequest}});var Eg=rg();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return Eg.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return Eg.ColorPresentationRequest}});var Hk=ig();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return Hk.FoldingRangeRequest}});var Wk=sg();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return Wk.DeclarationRequest}});var Bk=ug();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return Bk.SelectionRangeRequest}});var Qp=lg();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return Qp.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return Qp.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return Qp.WorkDoneProgressCancelNotification}});var Zp=cg();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return Zp.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return Zp.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return Zp.CallHierarchyPrepareRequest}});var Bo=fg();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return Bo.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return Bo.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Bo.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Bo.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Bo.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Bo.SemanticTokensRegistrationType}});var zk=pg();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return zk.ShowDocumentRequest}});var Vk=hg();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return Vk.LinkedEditingRangeRequest}});var oo=yg();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return oo.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return oo.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return oo.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return oo.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return oo.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return oo.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return oo.WillDeleteFilesRequest}});var em=Tg();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return em.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return em.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return em.MonikerRequest}});var tm=vg();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return tm.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return tm.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return tm.TypeHierarchySupertypesRequest}});var _g=xg();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return _g.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return _g.InlineValueRefreshRequest}});var rm=Rg();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return rm.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return rm.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return rm.InlayHintRefreshRequest}});var Pa=wg();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Pa.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Pa.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Pa.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Pa.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Pa.DiagnosticRefreshRequest}});var bn=Cg();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return bn.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return bn.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return bn.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return bn.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return bn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return bn.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return bn.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return bn.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return bn.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return bn.DidCloseNotebookDocumentNotification}});var Ng;(function(t){function e(r){let n=r;return Wt.string(n.language)||Wt.string(n.scheme)||Wt.string(n.pattern)}t.is=e})(Ng=h.TextDocumentFilter||(h.TextDocumentFilter={}));var Ig;(function(t){function e(r){let n=r;return Wt.objectLiteral(n)&&(Wt.string(n.notebookType)||Wt.string(n.scheme)||Wt.string(n.pattern))}t.is=e})(Ig=h.NotebookDocumentFilter||(h.NotebookDocumentFilter={}));var Pg;(function(t){function e(r){let n=r;return Wt.objectLiteral(n)&&(Wt.string(n.notebook)||Ig.is(n.notebook))&&(n.language===void 0||Wt.string(n.language))}t.is=e})(Pg=h.NotebookCellTextDocumentFilter||(h.NotebookCellTextDocumentFilter={}));var Dg;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Wt.string(n)&&!Ng.is(n)&&!Pg.is(n))return!1;return!0}t.is=e})(Dg=h.DocumentSelector||(h.DocumentSelector={}));var Xk;(function(t){t.method="client/registerCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(Xk=h.RegistrationRequest||(h.RegistrationRequest={}));var Yk;(function(t){t.method="client/unregisterCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(Yk=h.UnregistrationRequest||(h.UnregistrationRequest={}));var Jk;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(Jk=h.ResourceOperationKind||(h.ResourceOperationKind={}));var Qk;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(Qk=h.FailureHandlingKind||(h.FailureHandlingKind={}));var Zk;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(Zk=h.PositionEncodingKind||(h.PositionEncodingKind={}));var e$;(function(t){function e(r){let n=r;return n&&Wt.string(n.id)&&n.id.length>0}t.hasId=e})(e$=h.StaticRegistrationOptions||(h.StaticRegistrationOptions={}));var t$;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||Dg.is(n.documentSelector))}t.is=e})(t$=h.TextDocumentRegistrationOptions||(h.TextDocumentRegistrationOptions={}));var r$;(function(t){function e(n){let i=n;return Wt.objectLiteral(i)&&(i.workDoneProgress===void 0||Wt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Wt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(r$=h.WorkDoneProgressOptions||(h.WorkDoneProgressOptions={}));var n$;(function(t){t.method="initialize",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(n$=h.InitializeRequest||(h.InitializeRequest={}));var i$;(function(t){t.unknownProtocolVersion=1})(i$=h.InitializeErrorCodes||(h.InitializeErrorCodes={}));var o$;(function(t){t.method="initialized",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(o$=h.InitializedNotification||(h.InitializedNotification={}));var s$;(function(t){t.method="shutdown",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType0(t.method)})(s$=h.ShutdownRequest||(h.ShutdownRequest={}));var a$;(function(t){t.method="exit",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType0(t.method)})(a$=h.ExitNotification||(h.ExitNotification={}));var u$;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(u$=h.DidChangeConfigurationNotification||(h.DidChangeConfigurationNotification={}));var l$;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(l$=h.MessageType||(h.MessageType={}));var c$;(function(t){t.method="window/showMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(c$=h.ShowMessageNotification||(h.ShowMessageNotification={}));var f$;(function(t){t.method="window/showMessageRequest",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(f$=h.ShowMessageRequest||(h.ShowMessageRequest={}));var d$;(function(t){t.method="window/logMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(d$=h.LogMessageNotification||(h.LogMessageNotification={}));var p$;(function(t){t.method="telemetry/event",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(p$=h.TelemetryEventNotification||(h.TelemetryEventNotification={}));var m$;(function(t){t.None=0,t.Full=1,t.Incremental=2})(m$=h.TextDocumentSyncKind||(h.TextDocumentSyncKind={}));var h$;(function(t){t.method="textDocument/didOpen",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(h$=h.DidOpenTextDocumentNotification||(h.DidOpenTextDocumentNotification={}));var y$;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(y$=h.TextDocumentContentChangeEvent||(h.TextDocumentContentChangeEvent={}));var g$;(function(t){t.method="textDocument/didChange",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(g$=h.DidChangeTextDocumentNotification||(h.DidChangeTextDocumentNotification={}));var T$;(function(t){t.method="textDocument/didClose",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(T$=h.DidCloseTextDocumentNotification||(h.DidCloseTextDocumentNotification={}));var v$;(function(t){t.method="textDocument/didSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(v$=h.DidSaveTextDocumentNotification||(h.DidSaveTextDocumentNotification={}));var x$;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(x$=h.TextDocumentSaveReason||(h.TextDocumentSaveReason={}));var R$;(function(t){t.method="textDocument/willSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(R$=h.WillSaveTextDocumentNotification||(h.WillSaveTextDocumentNotification={}));var b$;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(b$=h.WillSaveTextDocumentWaitUntilRequest||(h.WillSaveTextDocumentWaitUntilRequest={}));var w$;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(w$=h.DidChangeWatchedFilesNotification||(h.DidChangeWatchedFilesNotification={}));var S$;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(S$=h.FileChangeType||(h.FileChangeType={}));var A$;(function(t){function e(r){let n=r;return Wt.objectLiteral(n)&&(kg.URI.is(n.baseUri)||kg.WorkspaceFolder.is(n.baseUri))&&Wt.string(n.pattern)}t.is=e})(A$=h.RelativePattern||(h.RelativePattern={}));var C$;(function(t){t.Create=1,t.Change=2,t.Delete=4})(C$=h.WatchKind||(h.WatchKind={}));var k$;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(k$=h.PublishDiagnosticsNotification||(h.PublishDiagnosticsNotification={}));var $$;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})($$=h.CompletionTriggerKind||(h.CompletionTriggerKind={}));var E$;(function(t){t.method="textDocument/completion",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(E$=h.CompletionRequest||(h.CompletionRequest={}));var _$;(function(t){t.method="completionItem/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(_$=h.CompletionResolveRequest||(h.CompletionResolveRequest={}));var N$;(function(t){t.method="textDocument/hover",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(N$=h.HoverRequest||(h.HoverRequest={}));var I$;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(I$=h.SignatureHelpTriggerKind||(h.SignatureHelpTriggerKind={}));var P$;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(P$=h.SignatureHelpRequest||(h.SignatureHelpRequest={}));var D$;(function(t){t.method="textDocument/definition",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(D$=h.DefinitionRequest||(h.DefinitionRequest={}));var O$;(function(t){t.method="textDocument/references",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(O$=h.ReferencesRequest||(h.ReferencesRequest={}));var L$;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(L$=h.DocumentHighlightRequest||(h.DocumentHighlightRequest={}));var M$;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(M$=h.DocumentSymbolRequest||(h.DocumentSymbolRequest={}));var F$;(function(t){t.method="textDocument/codeAction",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(F$=h.CodeActionRequest||(h.CodeActionRequest={}));var U$;(function(t){t.method="codeAction/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(U$=h.CodeActionResolveRequest||(h.CodeActionResolveRequest={}));var q$;(function(t){t.method="workspace/symbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(q$=h.WorkspaceSymbolRequest||(h.WorkspaceSymbolRequest={}));var K$;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(K$=h.WorkspaceSymbolResolveRequest||(h.WorkspaceSymbolResolveRequest={}));var G$;(function(t){t.method="textDocument/codeLens",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(G$=h.CodeLensRequest||(h.CodeLensRequest={}));var j$;(function(t){t.method="codeLens/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(j$=h.CodeLensResolveRequest||(h.CodeLensResolveRequest={}));var H$;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType0(t.method)})(H$=h.CodeLensRefreshRequest||(h.CodeLensRefreshRequest={}));var W$;(function(t){t.method="textDocument/documentLink",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(W$=h.DocumentLinkRequest||(h.DocumentLinkRequest={}));var B$;(function(t){t.method="documentLink/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(B$=h.DocumentLinkResolveRequest||(h.DocumentLinkResolveRequest={}));var z$;(function(t){t.method="textDocument/formatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(z$=h.DocumentFormattingRequest||(h.DocumentFormattingRequest={}));var V$;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(V$=h.DocumentRangeFormattingRequest||(h.DocumentRangeFormattingRequest={}));var X$;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(X$=h.DocumentOnTypeFormattingRequest||(h.DocumentOnTypeFormattingRequest={}));var Y$;(function(t){t.Identifier=1})(Y$=h.PrepareSupportDefaultBehavior||(h.PrepareSupportDefaultBehavior={}));var J$;(function(t){t.method="textDocument/rename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(J$=h.RenameRequest||(h.RenameRequest={}));var Q$;(function(t){t.method="textDocument/prepareRename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Q$=h.PrepareRenameRequest||(h.PrepareRenameRequest={}));var Z$;(function(t){t.method="workspace/executeCommand",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Z$=h.ExecuteCommandRequest||(h.ExecuteCommandRequest={}));var eE;(function(t){t.method="workspace/applyEdit",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType("workspace/applyEdit")})(eE=h.ApplyWorkspaceEditRequest||(h.ApplyWorkspaceEditRequest={}))});var Mg=j(ul=>{"use strict";Object.defineProperty(ul,"__esModule",{value:!0});ul.createProtocolConnection=void 0;var Lg=Vn();function tE(t,e,r,n){return Lg.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Lg.createMessageConnection)(t,e,r,n)}ul.createProtocolConnection=tE});var Fg=j(dr=>{"use strict";var rE=dr&&dr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ll=dr&&dr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&rE(e,t,r)};Object.defineProperty(dr,"__esModule",{value:!0});dr.LSPErrorCodes=dr.createProtocolConnection=void 0;ll(Vn(),dr);ll(io(),dr);ll(nt(),dr);ll(Og(),dr);var nE=Mg();Object.defineProperty(dr,"createProtocolConnection",{enumerable:!0,get:function(){return nE.createProtocolConnection}});var iE;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(iE=dr.LSPErrorCodes||(dr.LSPErrorCodes={}))});var At=j(wn=>{"use strict";var oE=wn&&wn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Ug=wn&&wn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&oE(e,t,r)};Object.defineProperty(wn,"__esModule",{value:!0});wn.createProtocolConnection=void 0;var sE=Wp();Ug(Wp(),wn);Ug(Fg(),wn);function aE(t,e,r,n){return(0,sE.createMessageConnection)(t,e,r,n)}wn.createProtocolConnection=aE});var im=j(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.SemanticTokensBuilder=Si.SemanticTokensDiff=Si.SemanticTokensFeature=void 0;var cl=At(),uE=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(cl.SemanticTokensRefreshRequest.type),on:e=>{let r=cl.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=cl.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=cl.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Si.SemanticTokensFeature=uE;var fl=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,o=r-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Si.SemanticTokensDiff=fl;var nm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,o){let s=e,a=r;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new fl(this._prevData,this._data).computeDiff()}:this.build()}};Si.SemanticTokensBuilder=nm});var sm=j(dl=>{"use strict";Object.defineProperty(dl,"__esModule",{value:!0});dl.TextDocuments=void 0;var so=At(),om=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new so.Emitter,this._onDidOpen=new so.Emitter,this._onDidClose=new so.Emitter,this._onDidSave=new so.Emitter,this._onWillSave=new so.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=so.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),so.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};dl.TextDocuments=om});var um=j(zo=>{"use strict";Object.defineProperty(zo,"__esModule",{value:!0});zo.NotebookDocuments=zo.NotebookSyncFeature=void 0;var Gr=At(),qg=sm(),lE=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Gr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Gr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Gr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Gr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};zo.NotebookSyncFeature=lE;var pl=class t{onDidOpenTextDocument(e){return this.openHandler=e,Gr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Gr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Gr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};pl.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var am=class{constructor(e){e instanceof qg.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new qg.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Gr.Emitter,this._onDidChange=new Gr.Emitter,this._onDidSave=new Gr.Emitter,this._onDidClose=new Gr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new pl,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)r.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,u=i.change;u.metadata!==void 0&&(a=!0,o.metadata=u.metadata);let l=[],c=[],f=[],m=[];if(u.cells!==void 0){let C=u.cells;if(C.structure!==void 0){let v=C.structure.array;if(o.cells.splice(v.start,v.deleteCount,...v.cells!==void 0?v.cells:[]),C.structure.didOpen!==void 0)for(let g of C.structure.didOpen)r.openTextDocument({textDocument:g}),l.push(g.uri);if(C.structure.didClose)for(let g of C.structure.didClose)r.closeTextDocument({textDocument:g}),c.push(g.uri)}if(C.data!==void 0){let v=new Map(C.data.map(g=>[g.document,g]));for(let g=0;g<=o.cells.length;g++){let E=v.get(o.cells[g].document);if(E!==void 0){let D=o.cells.splice(g,1,E);if(f.push({old:D[0],new:E}),v.delete(E.document),v.size===0)break}}}if(C.textContent!==void 0)for(let v of C.textContent)r.changeTextDocument({textDocument:v.document,contentChanges:v.changes}),m.push(v.document.uri)}this.updateCellMap(o);let T={notebookDocument:o};a&&(T.metadata={old:s,new:o.metadata});let w=[];for(let C of l)w.push(this.getNotebookCell(C));let A=[];for(let C of c)A.push(this.getNotebookCell(C));let _=[];for(let C of m)_.push(this.getNotebookCell(C));(w.length>0||A.length>0||f.length>0||_.length>0)&&(T.cells={added:w,removed:A,changed:{data:f,textContent:_}}),(T.metadata!==void 0||T.cells!==void 0)&&this._onDidChange.fire(T)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)r.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),Gr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};zo.NotebookDocuments=am});var lm=j(Ct=>{"use strict";Object.defineProperty(Ct,"__esModule",{value:!0});Ct.thenable=Ct.typedArray=Ct.stringArray=Ct.array=Ct.func=Ct.error=Ct.number=Ct.string=Ct.boolean=void 0;function cE(t){return t===!0||t===!1}Ct.boolean=cE;function Kg(t){return typeof t=="string"||t instanceof String}Ct.string=Kg;function fE(t){return typeof t=="number"||t instanceof Number}Ct.number=fE;function dE(t){return t instanceof Error}Ct.error=dE;function Gg(t){return typeof t=="function"}Ct.func=Gg;function jg(t){return Array.isArray(t)}Ct.array=jg;function pE(t){return jg(t)&&t.every(e=>Kg(e))}Ct.stringArray=pE;function mE(t,e){return Array.isArray(t)&&t.every(e)}Ct.typedArray=mE;function hE(t){return t&&Gg(t.then)}Ct.thenable=hE});var cm=j(jr=>{"use strict";Object.defineProperty(jr,"__esModule",{value:!0});jr.generateUuid=jr.parse=jr.isUUID=jr.v4=jr.empty=void 0;var Da=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},Oa=class t extends Da{constructor(){super([t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-","4",t._randomHex(),t._randomHex(),t._randomHex(),"-",t._oneOf(t._timeHighBits),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return t._oneOf(t._chars)}};Oa._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];Oa._timeHighBits=["8","9","a","b"];jr.empty=new Da("00000000-0000-0000-0000-000000000000");function Hg(){return new Oa}jr.v4=Hg;var yE=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function Wg(t){return yE.test(t)}jr.isUUID=Wg;function gE(t){if(!Wg(t))throw new Error("invalid uuid");return new Da(t)}jr.parse=gE;function TE(){return Hg().asHex()}jr.generateUuid=TE});var Bg=j(Ci=>{"use strict";Object.defineProperty(Ci,"__esModule",{value:!0});Ci.attachPartialResult=Ci.ProgressFeature=Ci.attachWorkDone=void 0;var Ai=At(),vE=cm(),ao=class t{constructor(e,r){this._connection=e,this._token=r,t.Instances.set(this._token,this)}begin(e,r,n,i){let o={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(Ai.WorkDoneProgress.type,this._token,o)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(Ai.WorkDoneProgress.type,this._token,n)}done(){t.Instances.delete(this._token),this._connection.sendProgress(Ai.WorkDoneProgress.type,this._token,{kind:"end"})}};ao.Instances=new Map;var ml=class extends ao{constructor(e,r){super(e,r),this._source=new Ai.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},La=class{constructor(){}begin(){}report(){}done(){}},hl=class extends La{constructor(){super(),this._source=new Ai.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function xE(t,e){if(e===void 0||e.workDoneToken===void 0)return new La;let r=e.workDoneToken;return delete e.workDoneToken,new ao(t,r)}Ci.attachWorkDone=xE;var RE=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(Ai.WorkDoneProgressCancelNotification.type,r=>{let n=ao.Instances.get(r.token);(n instanceof ml||n instanceof hl)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new La:new ao(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,vE.generateUuid)();return this.connection.sendRequest(Ai.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new ml(this.connection,e))}else return Promise.resolve(new hl)}};Ci.ProgressFeature=RE;var fm;(function(t){t.type=new Ai.ProgressType})(fm||(fm={}));var dm=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(fm.type,this._token,e)}};function bE(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new dm(t,r)}Ci.attachPartialResult=bE});var zg=j(yl=>{"use strict";Object.defineProperty(yl,"__esModule",{value:!0});yl.ConfigurationFeature=void 0;var wE=At(),SE=lm(),AE=t=>class extends t{getConfiguration(e){return e?SE.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(wE.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};yl.ConfigurationFeature=AE});var Vg=j(Tl=>{"use strict";Object.defineProperty(Tl,"__esModule",{value:!0});Tl.WorkspaceFoldersFeature=void 0;var gl=At(),CE=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new gl.Emitter,this.connection.onNotification(gl.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(gl.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(gl.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};Tl.WorkspaceFoldersFeature=CE});var Xg=j(vl=>{"use strict";Object.defineProperty(vl,"__esModule",{value:!0});vl.CallHierarchyFeature=void 0;var pm=At(),kE=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(pm.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=pm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=pm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};vl.CallHierarchyFeature=kE});var Yg=j(xl=>{"use strict";Object.defineProperty(xl,"__esModule",{value:!0});xl.ShowDocumentFeature=void 0;var $E=At(),EE=t=>class extends t{showDocument(e){return this.connection.sendRequest($E.ShowDocumentRequest.type,e)}};xl.ShowDocumentFeature=EE});var Jg=j(Rl=>{"use strict";Object.defineProperty(Rl,"__esModule",{value:!0});Rl.FileOperationsFeature=void 0;var Vo=At(),_E=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(Vo.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(Vo.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(Vo.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(Vo.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(Vo.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(Vo.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Rl.FileOperationsFeature=_E});var Qg=j(bl=>{"use strict";Object.defineProperty(bl,"__esModule",{value:!0});bl.LinkedEditingRangeFeature=void 0;var NE=At(),IE=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(NE.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};bl.LinkedEditingRangeFeature=IE});var Zg=j(wl=>{"use strict";Object.defineProperty(wl,"__esModule",{value:!0});wl.TypeHierarchyFeature=void 0;var mm=At(),PE=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(mm.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=mm.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=mm.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};wl.TypeHierarchyFeature=PE});var tT=j(Sl=>{"use strict";Object.defineProperty(Sl,"__esModule",{value:!0});Sl.InlineValueFeature=void 0;var eT=At(),DE=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(eT.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(eT.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};Sl.InlineValueFeature=DE});var rT=j(Al=>{"use strict";Object.defineProperty(Al,"__esModule",{value:!0});Al.InlayHintFeature=void 0;var hm=At(),OE=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(hm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(hm.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(hm.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};Al.InlayHintFeature=OE});var nT=j(Cl=>{"use strict";Object.defineProperty(Cl,"__esModule",{value:!0});Cl.DiagnosticFeature=void 0;var Ma=At(),LE=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Ma.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Ma.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Ma.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Ma.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Ma.WorkspaceDiagnosticRequest.partialResult,r)))}}};Cl.DiagnosticFeature=LE});var iT=j(kl=>{"use strict";Object.defineProperty(kl,"__esModule",{value:!0});kl.MonikerFeature=void 0;var ME=At(),FE=t=>class extends t{get moniker(){return{on:e=>{let r=ME.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};kl.MonikerFeature=FE});var gT=j(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.createConnection=he.combineFeatures=he.combineNotebooksFeatures=he.combineLanguagesFeatures=he.combineWorkspaceFeatures=he.combineWindowFeatures=he.combineClientFeatures=he.combineTracerFeatures=he.combineTelemetryFeatures=he.combineConsoleFeatures=he._NotebooksImpl=he._LanguagesImpl=he.BulkUnregistration=he.BulkRegistration=he.ErrorMessageTracker=void 0;var U=At(),Hr=lm(),gm=cm(),te=Bg(),UE=zg(),qE=Vg(),KE=Xg(),GE=im(),jE=Yg(),HE=Jg(),WE=Qg(),BE=Zg(),zE=tT(),VE=rT(),XE=nT(),YE=um(),JE=iT();function ym(t){if(t!==null)return t}var Tm=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};he.ErrorMessageTracker=Tm;var $l=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(U.MessageType.Error,e)}warn(e){this.send(U.MessageType.Warning,e)}info(e){this.send(U.MessageType.Info,e)}log(e){this.send(U.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(U.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,U.RAL)().console.error("Sending log message failed")})}},vm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:U.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(ym)}showWarningMessage(e,...r){let n={type:U.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(ym)}showInformationMessage(e,...r){let n={type:U.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(ym)}},oT=(0,jE.ShowDocumentFeature)((0,te.ProgressFeature)(vm)),QE;(function(t){function e(){return new El}t.create=e})(QE=he.BulkRegistration||(he.BulkRegistration={}));var El=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Hr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=gm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},ZE;(function(t){function e(){return new Fa(void 0,[])}t.create=e})(ZE=he.BulkUnregistration||(he.BulkUnregistration={}));var Fa=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(U.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Hr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(U.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},_l=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof El?this.registerMany(e):e instanceof Fa?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Hr.string(r)?r:r.method,o=gm.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(U.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,r){let n=Hr.string(e)?e:e.method,i=gm.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(U.RegistrationRequest.type,o).then(s=>U.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(U.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(U.RegistrationRequest.type,r).then(()=>new Fa(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},xm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(U.ApplyWorkspaceEditRequest.type,n)}},sT=(0,HE.FileOperationsFeature)((0,qE.WorkspaceFoldersFeature)((0,UE.ConfigurationFeature)(xm))),Nl=class{constructor(){this._trace=U.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==U.Trace.Off&&this.connection.sendNotification(U.LogTraceNotification.type,{message:e,verbose:this._trace===U.Trace.Verbose?r:void 0}).catch(()=>{})}},Il=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(U.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Pl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._LanguagesImpl=Pl;var aT=(0,JE.MonikerFeature)((0,XE.DiagnosticFeature)((0,VE.InlayHintFeature)((0,zE.InlineValueFeature)((0,BE.TypeHierarchyFeature)((0,WE.LinkedEditingRangeFeature)((0,GE.SemanticTokensFeature)((0,KE.CallHierarchyFeature)(Pl)))))))),Dl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._NotebooksImpl=Dl;var uT=(0,YE.NotebookSyncFeature)(Dl);function lT(t,e){return function(r){return e(t(r))}}he.combineConsoleFeatures=lT;function cT(t,e){return function(r){return e(t(r))}}he.combineTelemetryFeatures=cT;function fT(t,e){return function(r){return e(t(r))}}he.combineTracerFeatures=fT;function dT(t,e){return function(r){return e(t(r))}}he.combineClientFeatures=dT;function pT(t,e){return function(r){return e(t(r))}}he.combineWindowFeatures=pT;function mT(t,e){return function(r){return e(t(r))}}he.combineWorkspaceFeatures=mT;function hT(t,e){return function(r){return e(t(r))}}he.combineLanguagesFeatures=hT;function yT(t,e){return function(r){return e(t(r))}}he.combineNotebooksFeatures=yT;function e_(t,e){function r(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:r(t.console,e.console,lT),tracer:r(t.tracer,e.tracer,fT),telemetry:r(t.telemetry,e.telemetry,cT),client:r(t.client,e.client,dT),window:r(t.window,e.window,pT),workspace:r(t.workspace,e.workspace,mT),languages:r(t.languages,e.languages,hT),notebooks:r(t.notebooks,e.notebooks,yT)}}he.combineFeatures=e_;function t_(t,e,r){let n=r&&r.console?new(r.console($l)):new $l,i=t(n);n.rawAttach(i);let o=r&&r.tracer?new(r.tracer(Nl)):new Nl,s=r&&r.telemetry?new(r.telemetry(Il)):new Il,a=r&&r.client?new(r.client(_l)):new _l,u=r&&r.window?new(r.window(oT)):new oT,l=r&&r.workspace?new(r.workspace(sT)):new sT,c=r&&r.languages?new(r.languages(aT)):new aT,f=r&&r.notebooks?new(r.notebooks(uT)):new uT,m=[n,o,s,a,u,l,c,f];function T(v){return v instanceof Promise?v:Hr.thenable(v)?new Promise((g,E)=>{v.then(D=>g(D),D=>E(D))}):Promise.resolve(v)}let w,A,_,C={listen:()=>i.listen(),sendRequest:(v,...g)=>i.sendRequest(Hr.string(v)?v:v.method,...g),onRequest:(v,g)=>i.onRequest(v,g),sendNotification:(v,g)=>{let E=Hr.string(v)?v:v.method;return arguments.length===1?i.sendNotification(E):i.sendNotification(E,g)},onNotification:(v,g)=>i.onNotification(v,g),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:v=>(A=v,{dispose:()=>{A=void 0}}),onInitialized:v=>i.onNotification(U.InitializedNotification.type,v),onShutdown:v=>(w=v,{dispose:()=>{w=void 0}}),onExit:v=>(_=v,{dispose:()=>{_=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return u},get workspace(){return l},get languages(){return c},get notebooks(){return f},onDidChangeConfiguration:v=>i.onNotification(U.DidChangeConfigurationNotification.type,v),onDidChangeWatchedFiles:v=>i.onNotification(U.DidChangeWatchedFilesNotification.type,v),__textDocumentSync:void 0,onDidOpenTextDocument:v=>i.onNotification(U.DidOpenTextDocumentNotification.type,v),onDidChangeTextDocument:v=>i.onNotification(U.DidChangeTextDocumentNotification.type,v),onDidCloseTextDocument:v=>i.onNotification(U.DidCloseTextDocumentNotification.type,v),onWillSaveTextDocument:v=>i.onNotification(U.WillSaveTextDocumentNotification.type,v),onWillSaveTextDocumentWaitUntil:v=>i.onRequest(U.WillSaveTextDocumentWaitUntilRequest.type,v),onDidSaveTextDocument:v=>i.onNotification(U.DidSaveTextDocumentNotification.type,v),sendDiagnostics:v=>i.sendNotification(U.PublishDiagnosticsNotification.type,v),onHover:v=>i.onRequest(U.HoverRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),void 0)),onCompletion:v=>i.onRequest(U.CompletionRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onCompletionResolve:v=>i.onRequest(U.CompletionResolveRequest.type,v),onSignatureHelp:v=>i.onRequest(U.SignatureHelpRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),void 0)),onDeclaration:v=>i.onRequest(U.DeclarationRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDefinition:v=>i.onRequest(U.DefinitionRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onTypeDefinition:v=>i.onRequest(U.TypeDefinitionRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onImplementation:v=>i.onRequest(U.ImplementationRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onReferences:v=>i.onRequest(U.ReferencesRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDocumentHighlight:v=>i.onRequest(U.DocumentHighlightRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDocumentSymbol:v=>i.onRequest(U.DocumentSymbolRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onWorkspaceSymbol:v=>i.onRequest(U.WorkspaceSymbolRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onWorkspaceSymbolResolve:v=>i.onRequest(U.WorkspaceSymbolResolveRequest.type,v),onCodeAction:v=>i.onRequest(U.CodeActionRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onCodeActionResolve:v=>i.onRequest(U.CodeActionResolveRequest.type,(g,E)=>v(g,E)),onCodeLens:v=>i.onRequest(U.CodeLensRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onCodeLensResolve:v=>i.onRequest(U.CodeLensResolveRequest.type,(g,E)=>v(g,E)),onDocumentFormatting:v=>i.onRequest(U.DocumentFormattingRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),void 0)),onDocumentRangeFormatting:v=>i.onRequest(U.DocumentRangeFormattingRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),void 0)),onDocumentOnTypeFormatting:v=>i.onRequest(U.DocumentOnTypeFormattingRequest.type,(g,E)=>v(g,E)),onRenameRequest:v=>i.onRequest(U.RenameRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),void 0)),onPrepareRename:v=>i.onRequest(U.PrepareRenameRequest.type,(g,E)=>v(g,E)),onDocumentLinks:v=>i.onRequest(U.DocumentLinkRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDocumentLinkResolve:v=>i.onRequest(U.DocumentLinkResolveRequest.type,(g,E)=>v(g,E)),onDocumentColor:v=>i.onRequest(U.DocumentColorRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onColorPresentation:v=>i.onRequest(U.ColorPresentationRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onFoldingRanges:v=>i.onRequest(U.FoldingRangeRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onSelectionRanges:v=>i.onRequest(U.SelectionRangeRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onExecuteCommand:v=>i.onRequest(U.ExecuteCommandRequest.type,(g,E)=>v(g,E,(0,te.attachWorkDone)(i,g),void 0)),dispose:()=>i.dispose()};for(let v of m)v.attach(C);return i.onRequest(U.InitializeRequest.type,v=>{e.initialize(v),Hr.string(v.trace)&&(o.trace=U.Trace.fromString(v.trace));for(let g of m)g.initialize(v.capabilities);if(A){let g=A(v,new U.CancellationTokenSource().token,(0,te.attachWorkDone)(i,v),void 0);return T(g).then(E=>{if(E instanceof U.ResponseError)return E;let D=E;D||(D={capabilities:{}});let X=D.capabilities;X||(X={},D.capabilities=X),X.textDocumentSync===void 0||X.textDocumentSync===null?X.textDocumentSync=Hr.number(C.__textDocumentSync)?C.__textDocumentSync:U.TextDocumentSyncKind.None:!Hr.number(X.textDocumentSync)&&!Hr.number(X.textDocumentSync.change)&&(X.textDocumentSync.change=Hr.number(C.__textDocumentSync)?C.__textDocumentSync:U.TextDocumentSyncKind.None);for(let ge of m)ge.fillServerCapabilities(X);return D})}else{let g={capabilities:{textDocumentSync:U.TextDocumentSyncKind.None}};for(let E of m)E.fillServerCapabilities(g.capabilities);return g}}),i.onRequest(U.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,w)return w(new U.CancellationTokenSource().token)}),i.onNotification(U.ExitNotification.type,()=>{try{_&&_()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(U.SetTraceNotification.type,v=>{o.trace=U.Trace.fromString(v.value)}),C}he.createConnection=t_});var Rm=j(Bt=>{"use strict";var r_=Bt&&Bt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),TT=Bt&&Bt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&r_(e,t,r)};Object.defineProperty(Bt,"__esModule",{value:!0});Bt.ProposedFeatures=Bt.NotebookDocuments=Bt.TextDocuments=Bt.SemanticTokensBuilder=void 0;var n_=im();Object.defineProperty(Bt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return n_.SemanticTokensBuilder}});TT(At(),Bt);var i_=sm();Object.defineProperty(Bt,"TextDocuments",{enumerable:!0,get:function(){return i_.TextDocuments}});var o_=um();Object.defineProperty(Bt,"NotebookDocuments",{enumerable:!0,get:function(){return o_.NotebookDocuments}});TT(gT(),Bt);var s_;(function(t){t.all={__brand:"features"}})(s_=Bt.ProposedFeatures||(Bt.ProposedFeatures={}))});var xT=j((wG,vT)=>{"use strict";vT.exports=At()});var we=j(Sn=>{"use strict";var a_=Sn&&Sn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),bT=Sn&&Sn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&a_(e,t,r)};Object.defineProperty(Sn,"__esModule",{value:!0});Sn.createConnection=void 0;var Ol=Rm();bT(xT(),Sn);bT(Rm(),Sn);var RT=!1,u_={initialize:t=>{},get shutdownReceived(){return RT},set shutdownReceived(t){RT=t},exit:t=>{}};function l_(t,e,r,n){let i,o,s,a;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),Ol.ConnectionStrategy.is(t)||Ol.ConnectionOptions.is(t)?a=t:(o=t,s=e,a=r);let u=l=>(0,Ol.createProtocolConnection)(o,s,l,a);return(0,Ol.createConnection)(u,u_,i)}Sn.createConnection=l_});var MA=j((Bae,LA)=>{"use strict";LA.exports=we()});var OA=de(we(),1);var Ll=class t{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){for(let n of e)if(t.isIncremental(n)){let i=AT(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),u=Math.max(i.end.line,0),l=this._lineOffsets,c=wT(n.text,!1,o);if(u-a===c.length)for(let m=0,T=c.length;m<T;m++)l[m+a+1]=c[m];else c.length<1e4?l.splice(a+1,u-a,...c):this._lineOffsets=l=l.slice(0,a+1).concat(c,l.slice(u+1));let f=n.text.length-(s-o);if(f!==0)for(let m=a+1+c.length,T=l.length;m<T;m++)l[m]=l[m]+f}else if(t.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=r}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=wT(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);r[s]>e?i=s:n=s+1}let o=n-1;return e=this.ensureBeforeEOL(e,r[o]),{line:o,character:e-r[o]}}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line];if(e.character<=0)return n;let i=e.line+1<r.length?r[e.line+1]:this._content.length,o=Math.min(n+e.character,i);return this.ensureBeforeEOL(o,n)}ensureBeforeEOL(e,r){for(;e>r&&ST(this._content.charCodeAt(e-1));)e--;return e}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range!==void 0&&(r.rangeLength===void 0||typeof r.rangeLength=="number")}static isFull(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range===void 0&&r.rangeLength===void 0}},Xo;(function(t){function e(i,o,s,a){return new Ll(i,o,s,a)}t.create=e;function r(i,o,s){if(i instanceof Ll)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=r;function n(i,o){let s=i.getText(),a=bm(o.map(c_),(c,f)=>{let m=c.range.start.line-f.range.start.line;return m===0?c.range.start.character-f.range.start.character:m}),u=0,l=[];for(let c of a){let f=i.offsetAt(c.range.start);if(f<u)throw new Error("Overlapping edit");f>u&&l.push(s.substring(u,f)),c.newText.length&&l.push(c.newText),u=i.offsetAt(c.range.end)}return l.push(s.substr(u)),l.join("")}t.applyEdits=n})(Xo||(Xo={}));function bm(t,e){if(t.length<=1)return t;let r=t.length/2|0,n=t.slice(0,r),i=t.slice(r);bm(n,e),bm(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?t[a++]=n[o++]:t[a++]=i[s++];for(;o<n.length;)t[a++]=n[o++];for(;s<i.length;)t[a++]=i[s++];return t}function wT(t,e,r=0){let n=e?[r]:[];for(let i=0;i<t.length;i++){let o=t.charCodeAt(i);ST(o)&&(o===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,n.push(r+i+1))}return n}function ST(t){return t===13||t===10}function AT(t){let e=t.start,r=t.end;return e.line>r.line||e.line===r.line&&e.character>r.character?{start:r,end:e}:t}function c_(t){let e=AT(t.range);return e!==t.range?{newText:t.newText,range:e}:t}function kt(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}function Yn(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}function CT(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}function Yo(t){return typeof t=="object"&&t!==null&&kt(t.container)&&Yn(t.reference)&&typeof t.message=="string"}var uo=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,r){return kt(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,r);return n[r]=o,o}}getAllSubTypes(e){let r=this.allSubtypes[e];if(r)return r;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function An(t){return typeof t=="object"&&t!==null&&Array.isArray(t.content)}function lo(t){return typeof t=="object"&&t!==null&&typeof t.tokenType=="object"}function kT(t){return An(t)&&typeof t.fullText=="string"}var Nr=class t{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new t(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return pr})}join(e=","){let r=this.iterator(),n="",i,o=!1;do i=r.next(),i.done||(o&&(n+=e),n+=f_(i.value)),o=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=r&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new t(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?pr:{done:!1,value:e(i)}})}filter(e){return new t(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return pr})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,r,n);return o===void 0?i.value:r(o,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new t(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(r.this);if(!n){let o=e(i);if(Ml(o))r.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(r.iterator);return pr})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new t(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=r.nextFn(n.this);if(!i)if(Ml(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return pr})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new t(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new t(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?pr:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let o=r?r(i):i;n.add(o)}return this.filter(i=>{let o=r?r(i):i;return!n.has(o)})}};function f_(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function Ml(t){return!!t&&typeof t[Symbol.iterator]=="function"}var Jo=new Nr(()=>{},()=>pr),pr=Object.freeze({done:!0,value:void 0});function ie(...t){if(t.length===1){let e=t[0];if(e instanceof Nr)return e;if(Ml(e))return new Nr(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Nr(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:pr)}return t.length>1?new Nr(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];Ml(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return pr}):Jo}var Wr=class extends Nr{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(r(s.value)[Symbol.iterator]()),s}return pr})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},Ua;(function(t){function e(o){return o.reduce((s,a)=>s+a,0)}t.sum=e;function r(o){return o.reduce((s,a)=>s*a,0)}t.product=r;function n(o){return o.reduce((s,a)=>Math.min(s,a))}t.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}t.max=i})(Ua=Ua||(Ua={}));function wm(t){return new Wr(t,e=>An(e)?e.content:[],{includeRoot:!0})}function _T(t){return wm(t).filter(lo)}function NT(t,e){for(;t.container;)if(t=t.container,t===e)return!0;return!1}function qa(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}function nr(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}var Jn;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(Jn=Jn||(Jn={}));function d_(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return Jn.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return Jn.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?Jn.Inside:r?Jn.OverlapBack:Jn.OverlapFront}function Fl(t,e){return d_(t,e)>Jn.After}var Sm=/^[\w\p{L}]$/u;function It(t,e,r=Sm){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return Rr(t,e)}}function IT(t,e){if(t){let r=p_(t,!0);if(r&&$T(r,e))return r;if(kT(t)){let n=t.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=t.content[i];if($T(o,e))return o}}}}function $T(t,e){return lo(t)&&e.includes(t.tokenType.name)}function Rr(t,e){if(lo(t))return t;if(An(t)){let r=0,n=t.content.length-1;for(;r<n;){let i=Math.floor((r+n)/2),o=t.content[i];if(o.offset>e)n=i-1;else if(o.end<=e)r=i+1;else return Rr(o,e)}if(r===n)return Rr(t.content[r],e)}}function p_(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t);for(;n>0;){n--;let i=r.content[n];if(e||!i.hidden)return i}t=r}}function PT(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t),i=r.content.length-1;for(;n<i;){n++;let o=r.content[n];if(e||!o.hidden)return o}t=r}}function DT(t,e){let r=m_(t,e);return r?r.parent.content.slice(r.a+1,r.b):[]}function m_(t,e){let r=ET(t),n=ET(e),i;for(let o=0;o<r.length&&o<n.length;o++){let s=r[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function ET(t){let e=[];for(;t.container;){let r=t.container,n=r.content.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}function co(t,e,r,n){let i=[t,e,r,n].reduce(FT,{});return MT(i)}var Am=Symbol("isProxy");function Ul(t){if(t&&t[Am])for(let e of Object.values(t))Ul(e);return t}function MT(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>LT(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(LT(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Am]});return r[Am]=!0,r}var OT=Symbol();function LT(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===OT)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/configuration-services/#resolving-cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=OT;try{t[e]=typeof i=="function"?i(n):MT(i,n)}catch(o){throw t[e]=o instanceof Error?o:void 0,o}return t[e]}else return}function FT(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=FT(i,n):t[r]=n}}return t}var Le=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Ua.sum(ie(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return ie(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return ie(this.map.keys())}values(){return ie(this.map.values()).flat()}entriesGroupedByKey(){return ie(this.map.entries())}};var Cm="AbstractRule";var fo="AbstractType";var h_="Condition";var y_="TypeDefinition";var km="AbstractElement";function Qo(t){return le.isInstance(t,km)}var UT="ArrayType";function po(t){return le.isInstance(t,UT)}var qT="Conjunction";function KT(t){return le.isInstance(t,qT)}var GT="Disjunction";function jT(t){return le.isInstance(t,GT)}var HT="Grammar";function Zo(t){return le.isInstance(t,HT)}var g_="GrammarImport";function ql(t){return le.isInstance(t,g_)}var T_="InferredType";function es(t){return le.isInstance(t,T_)}var Ga="Interface";function br(t){return le.isInstance(t,Ga)}var WT="LiteralCondition";function BT(t){return le.isInstance(t,WT)}var zT="Negation";function VT(t){return le.isInstance(t,zT)}var XT="Parameter";function YT(t){return le.isInstance(t,XT)}var JT="ParameterReference";function ts(t){return le.isInstance(t,JT)}var QT="ParserRule";function H(t){return le.isInstance(t,QT)}var ZT="ReferenceType";function mo(t){return le.isInstance(t,ZT)}var v_="ReturnType";function rs(t){return le.isInstance(t,v_)}var ev="SimpleType";function ir(t){return le.isInstance(t,ev)}var $m="TerminalRule";function Se(t){return le.isInstance(t,$m)}var ja="Type";function Lt(t){return le.isInstance(t,ja)}var x_="TypeAttribute";function Kl(t){return le.isInstance(t,x_)}var tv="UnionType";function Br(t){return le.isInstance(t,tv)}var rv="Action";function _e(t){return le.isInstance(t,rv)}var nv="Alternatives";function Ir(t){return le.isInstance(t,nv)}var iv="Assignment";function Re(t){return le.isInstance(t,iv)}var ov="CharacterRange";function Gl(t){return le.isInstance(t,ov)}var sv="CrossReference";function zt(t){return le.isInstance(t,sv)}var av="Group";function Mt(t){return le.isInstance(t,av)}var uv="Keyword";function dt(t){return le.isInstance(t,uv)}var lv="NegatedToken";function cv(t){return le.isInstance(t,lv)}var fv="RegexToken";function dv(t){return le.isInstance(t,fv)}var pv="RuleCall";function Ne(t){return le.isInstance(t,pv)}var mv="TerminalAlternatives";function hv(t){return le.isInstance(t,mv)}var yv="TerminalGroup";function gv(t){return le.isInstance(t,yv)}var Tv="TerminalRuleCall";function jl(t){return le.isInstance(t,Tv)}var vv="UnorderedGroup";function Pr(t){return le.isInstance(t,vv)}var xv="UntilToken";function Rv(t){return le.isInstance(t,xv)}var bv="Wildcard";function wv(t){return le.isInstance(t,bv)}var Ka=class extends uo{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case rv:return this.isSubtype(km,r)||this.isSubtype(fo,r);case nv:case iv:case ov:case sv:case av:case uv:case lv:case fv:case pv:case mv:case yv:case Tv:case vv:case xv:case bv:return this.isSubtype(km,r);case UT:case ZT:case ev:case tv:return this.isSubtype(y_,r);case qT:case GT:case WT:case zT:case JT:return this.isSubtype(h_,r);case Ga:case ja:return this.isSubtype(fo,r);case QT:return this.isSubtype(Cm,r)||this.isSubtype(fo,r);case $m:return this.isSubtype(Cm,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return fo;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return Cm;case"Grammar:usedGrammars":return HT;case"NamedArgument:parameter":case"ParameterReference:parameter":return XT;case"TerminalRuleCall:rule":return $m;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}},le=new Ka;function Sv(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{kt(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):kt(r)&&(r.$container=t,r.$containerProperty=e))}function Ie(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}function ne(t){let r=Hl(t).$document;if(!r)throw new Error("AST node has no document.");return r}function Hl(t){for(;t.$container;)t=t.$container;return t}function ki(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new Nr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=t[i];if(kt(o)){if(n.keyIndex++,Em(o,r))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if(kt(a)&&Em(a,r))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return pr})}function Qe(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new Wr(t,r=>ki(r,e))}function Zn(t,e){if(t){if(e?.range&&!Em(t,e.range))return new Wr(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new Wr(t,r=>ki(r,e),{includeRoot:!0})}function Em(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?Fl(n,e):!1}function Wl(t){return new Nr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if(Yn(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(Yn(o))return{done:!1,value:{reference:o,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return pr})}function Av(t){var e,r;if(t){if("astNode"in t)return w_(t);if(Array.isArray(t))return t.reduce(Cv,void 0);{let n=t,i=R_(n)?b_((r=(e=n?.root)===null||e===void 0?void 0:e.astNode)!==null&&r!==void 0?r:n?.astNode):void 0;return ns(n,i)}}else return}function R_(t){return typeof t<"u"&&"element"in t&&"text"in t}function b_(t){try{return ne(t).uri.toString()}catch{return}}function w_(t){var e,r;let{astNode:n,property:i,index:o}=t??{},s=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||s===void 0)){if(i===void 0)return ns(s,_m(n));{let a=u=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<u.length?u[o]:void 0:u.reduce(Cv,void 0);if(!((r=s.assignments)===null||r===void 0)&&r[i]){let u=a(s.assignments[i]);return u&&ns(u,_m(n))}else if(n.$cstNode){let u=a($i(n.$cstNode,i));return u&&ns(u,_m(n))}else return}}}function _m(t){var e,r,n,i;return t.$cstNode?(r=(e=ne(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new Wr(t,o=>o.$container?[o.$container]:[]).find(o=>{var s;return(s=o.$textRegion)===null||s===void 0?void 0:s.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function ns(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function Cv(t,e){var r,n;if(t){if(!e)return t&&ns(t)}else return e&&ns(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,s=Math.min(t.offset,e.offset),a=Math.max(i,o),u=a-s,l={offset:s,end:a,length:u};if(t.range&&e.range&&(l.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let c=t.fileURI,f=e.fileURI,m=c&&f&&c!==f?`<unmergable text regions of ${c}, ${f}>`:c??f;l.fileURI=m}return l}var Nm=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[],this.pendingIndent=!0}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=S_(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function S_(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,s;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((s=n.targetRegion)===null||s===void 0)&&s.length&&r(n),delete n.complete,n}};return n}function kv(t,e){let r=new Nm(e),n=r.pushTraceRegion(void 0);$v(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i?.targetRegion,s=n.targetRegion;return o&&i.sourceRegion&&o.offset===s.offset&&o.length===s.length?{text:r.content,trace:i}:{text:r.content,trace:n}}function $v(t,e){typeof t=="string"?A_(t,e):t instanceof is?C_(t,e):t instanceof Vt?Nv(t,e):t instanceof Ei&&k_(t,e)}function Ev(t,e){return typeof t=="string"?t.length!==0:t instanceof Vt?t.contents.some(r=>Ev(r,e)):t instanceof Ei?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function A_(t,e){t&&(e.pendingIndent&&_v(e,!1),e.append(t))}function _v(t,e){var r;let n="";for(let i of t.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function Nv(t,e){let r,n=Av(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)$v(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function C_(t,e){var r;if(Ev(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),Nv(t,e)}finally{e.decreaseIndent()}}}function k_(t,e){t.ifNotEmpty&&!$_(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&_v(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function $_(t){return t.trimStart()!==""}var zG=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"),Ha=/\r?\n/g,E_=/\S|$/;function Iv(t){let e=t.filter(n=>n.length>0).map(n=>n.search(E_)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}function Pm(t,...e){let r=__(t),n=N_(t,e,r);return P_(n)}function Ov(t,e,r){return(n,...i)=>Dm(t,e,r)(Pm(n,...i))}function __(t){let e=t.join("_").split(Ha),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(s=>s.length!==0);let o=Iv(i);return{indentation:o,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function N_(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let s=[];t.forEach((l,c)=>{s.push(...l.split(Ha).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(c===0?(f,m,T)=>T===0?n?[]:[m]:T===1&&f.length===0?[m]:f.concat(Bl,m):(f,m,T)=>T===0?[m]:f.concat(Bl,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat(Wa(e[c])?e[c]:e[c]!==void 0?{content:String(e[c])}:c<e.length?Lv:[]))});let a=s.length,u=a!==0?s[a-1]:void 0;return(i||o)&&typeof u=="string"&&u.trim().length===0?n&&a!==1&&s[a-2]===Bl?s.slice(0,a-2):s.slice(0,a-1):s}var Bl={isNewLine:!0},Lv={isUndefinedSegment:!0},Dv=t=>t===Bl,Im=t=>t===Lv,I_=t=>t.content!==void 0;function P_(t){return t.reduce((r,n,i)=>Im(n)?r:Dv(n)?{node:i!==0&&(Im(t[i-1])||Wa(t[i-1]))||i>1&&typeof t[i-1]=="string"&&(Im(t[i-2])||Wa(t[i-2]))?r.node.appendNewLineIfNotEmpty():r.node.appendNewLine()}:(()=>{var o;let s=(i===0||Dv(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimStart().length):"",a=I_(n)?n.content:n,u;return{node:r.indented?r.node:s.length!==0?r.node.indent({indentation:s,indentImmediately:!1,indentedChildren:l=>u=l.append(a)}):r.node.append(a),indented:u??((o=r.indented)===null||o===void 0?void 0:o.append(a))}})(),{node:new Vt}).node}var Pv=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function Wa(t){return t instanceof Vt||t instanceof is||t instanceof Ei}function os(t,e){return Wa(t)?kv(t,e).text:String(t)}var Vt=class t{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if(kt(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(ot)}appendNewLineIf(e){return e?this.append(ot):this}appendNewLineIfNotEmpty(){return this.append(D_)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append(Pm(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},s=new is(n,o,i);return this.contents.push(s),Array.isArray(r)?s.append(...r):r&&s.append(r),this}appendTraced(e,r,n){return i=>this.append(new t().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...o)=>this.append(Ov(e,r,n)(i,...o))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};function Dm(t,e,r){return n=>n instanceof Vt&&n.tracedSource===void 0?n.trace(t,e,r):new Vt().trace(t,e,r).append(n)}var is=class extends Vt{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}},Ei=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Pv,this.ifNotEmpty=r}},ot=new Ei,D_=new Ei(void 0,!0);function ei(t){return"referenceType"in t}function ti(t){return"elementType"in t}function Pt(t){return"types"in t}function Mm(t){if(Pt(t)){let e=[];for(let r of t.types)e.push(...Mm(r));return e}else return[t]}function Dr(t){return"value"in t}function Or(t){return"primitive"in t}function Cn(t){return"string"in t}function cn(t){return t&&"type"in t}function dn(t){return t&&"properties"in t}var Vl=class{constructor(e,r){var n;this.superTypes=new Set,this.subTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=r?.declared)!==null&&n!==void 0?n:!1,this.dataType=r?.dataType}toAstTypesString(e){let r=new Vt;return r.append(`export type ${this.name} = ${fn(this.type,"AstType")};`,ot),e&&(r.append(ot),Uv(r,this.name)),this.dataType&&O_(r,this),os(r)}toDeclaredTypesString(e){let r=new Vt;return r.append(`type ${Fm(this.name,e)} = ${fn(this.type,"DeclaredType")};`,ot),os(r)}},ss=class t{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let r=new Map;for(let n of this.properties)r.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let o of i)r.has(o.name)||r.set(o.name,o)}return Array.from(r.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,r,n){if(n.has(this.name))return;n.add(this.name);let i=dn(e)?e.properties:[];for(let o of i)r.has(o.name)||r.set(o.name,o);for(let o of e.subTypes)this.getSubTypeProperties(o,r,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof t)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new Vt,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?ho([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,ot),r.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${ho([...this.containerTypes].map(s=>s.name)).join(" | ")};`,ot),this.typeNames.size>0&&o.append(`readonly $type: ${ho([...this.typeNames]).map(s=>`'${s}'`).join(" | ")};`,ot),Mv(o,this.properties,"AstType")}),r.append("}",ot),e&&(r.append(ot),Uv(r,this.name)),os(r)}toDeclaredTypesString(e){let r=new Vt,n=Fm(this.name,e),i=ho(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,ot),r.indent(o=>Mv(o,this.properties,"DeclaredType",e)),r.append("}",ot),os(r)}},Xl=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};function za(t,e){return _i(t,e,new Map)}function _i(t,e,r){let n=`${Ba(t)}\xBB${Ba(e)}`,i=r.get(n);return i!==void 0||(r.set(n,!1),i=!1,Pt(t)?i=t.types.every(o=>_i(o,e,r)):Pt(e)?i=e.types.some(o=>_i(t,o,r)):Dr(e)&&cn(e.value)?Dr(t)&&cn(t.value)&&e.value.name===t.value.name?i=!0:i=_i(t,e.value.type,r):ei(t)?i=ei(e)&&_i(t.referenceType,e.referenceType,r):ti(t)?i=ti(e)&&_i(t.elementType,e.elementType,r):Dr(t)?cn(t.value)?i=_i(t.value.type,e,r):Dr(e)?cn(e.value)?i=_i(t,e.value.type,r):i=Fv(t.value,e.value,new Set):i=!1:Or(t)?i=Or(e)&&t.primitive===e.primitive:Cn(t)&&(i=Or(e)&&e.primitive==="string"||Cn(e)&&e.string===t.string),i&&r.set(n,i)),i}function Fv(t,e,r){let n=t.name;if(r.has(n))return!1;if(r.add(n),t.name===e.name)return!0;for(let i of t.superTypes)if(dn(i)&&Fv(i,e,r))return!0;return!1}function Ba(t){if(ei(t))return`@(${Ba(t.referenceType)})}`;if(ti(t))return`(${Ba(t.elementType)})[]`;if(Pt(t)){let e=t.types.map(r=>Ba(r)).join(" | ");return t.types.length<=1?`Union<${e}>`:e}else{if(Dr(t))return`Value<${t.value.name}>`;if(Or(t))return t.primitive;if(Cn(t))return`'${t.string}'`}throw new Error("Invalid type")}function fn(t,e="AstType"){if(ei(t)){let r=fn(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${Om(t.referenceType,r)}`}else if(ti(t)){let r=fn(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${Om(t.elementType,r)}[]`}else if(Pt(t)){let r=t.types.map(n=>Om(n,fn(n,e)));return ho(r).join(" | ")}else{if(Dr(t))return t.value.name;if(Or(t))return t.primitive;if(Cn(t)){let r=e==="AstType"?"'":'"';return`${r}${t.string}${r}`}}throw new Error("Invalid type")}function Om(t,e){return Pt(t)&&(e=`(${e})`),e}function Mv(t,e,r,n=new Set){function i(o){let s=r==="AstType"?o.name:Fm(o.name,n),a=o.optional&&!Yl(o.type),u=fn(o.type,r);return`${s}${a?"?":""}: ${u}`}ho(e,(o,s)=>o.name.localeCompare(s.name)).forEach(o=>t.append(i(o),ot))}function Yl(t){return ti(t)?!0:ei(t)?!1:Pt(t)?t.types.every(e=>Yl(e)):Or(t)?t.primitive==="boolean":!1}function Uv(t,e){t.append(`export const ${e} = '${e}';`,ot),t.append(ot),t.append(`export function is${e}(item: unknown): item is ${e} {`,ot),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,ot)),t.append("}",ot)}function O_(t,e){switch(e.dataType){case"string":if(Lm(e.type)){let r=Array.from(e.subTypes).map(o=>o.name),n=qv(e.type),i=Kv(e.type);if(r.length===0&&n.length===0&&i.length===0)zl(t,e.name,`typeof item === '${e.dataType}'`);else{let o=L_(r,n,i);zl(t,e.name,o)}}break;case"number":case"boolean":case"bigint":zl(t,e.name,`typeof item === '${e.dataType}'`);break;case"Date":zl(t,e.name,"item instanceof Date");break;default:return}}function Lm(t){let e=!0;if(Or(t))return t.primitive==="string";if(Cn(t))return!0;if(Pt(t)){for(let r of t.types)if(Dr(r))if(cn(r.value)){if(!Lm(r.value.type))return!1}else return!1;else if(Or(r)){if(r.primitive!=="string"||!r.regex)return!1}else if(Pt(r))e=Lm(r);else if(!Cn(r))return!1}else return!1;return e}function L_(t,e,r){let n=[...t.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(r.length>0){let i=r.map(o=>`${o}.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function Fm(t,e){return e.has(t)?`^${t}`:t}function qv(t){let e=[];if(Cn(t))return[t.string];if(Pt(t))for(let r of t.types)Cn(r)?e.push(r.string):Pt(r)&&e.push(...qv(r));return e}function Kv(t){let e=[];if(Or(t)&&t.primitive==="string"&&t.regex&&e.push(t.regex),Pt(t))for(let r of t.types)Or(r)&&r.primitive==="string"&&r.regex?e.push(r.regex):Pt(r)&&e.push(...Kv(r));return e}function zl(t,e,r){t.append(ot,`export function is${e}(item: unknown): item is ${e} {`,ot),t.indent(n=>n.append(`return ${r};`,ot)),t.append("}",ot)}function ho(t,e){return Array.from(new Set(t)).sort(e)}function Um(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(s=>{let a=r.getOrCreateDocument(s.sourceUri),u=n.getAstNode(a.parseResult.value,s.sourcePath);br(u)?(i.add(u),Um(u,e,r,n).forEach(c=>i.add(c))):u&&Lt(u.$container)&&i.add(u.$container)}),i}function Va(t){let e=new Set;if(br(t))e.add(t),t.superTypes.forEach(r=>{if(br(r.ref)){e.add(r.ref);let n=Va(r.ref);for(let i of n)e.add(i)}});else if(Lt(t)){let r=Gv(t.type);for(let n of r){let i=Va(n);for(let o of i)e.add(o)}}return e}function Gv(t){var e;if(Br(t))return t.types.flatMap(r=>Gv(r));if(ir(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if(Lt(r)||br(r))return[r]}return[]}function qm(t,e){return t.interfaces.concat(e.interfaces)}function Ql(t){return t.interfaces.concat(t.unions)}function jv(t){let e=t.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return r.map(i=>i.value)}function Hv(t){return Jl(t,new Set)}function Jl(t,e){if(e.has(t))return[];if(e.add(t),Pt(t))return t.types.flatMap(r=>Jl(r,e));if(Dr(t)){let r=t.value;return"type"in r?Jl(r.type,e):[r.name]}else if(ti(t))return Jl(t.elementType,e);return[]}function Xa(t){return typeof t.name=="string"}var as=class{getName(e){if(Xa(e))return e.name}getNameNode(e){return Xt(e.$cstNode,"name")}};function J(t){return t.charCodeAt(0)}function Zl(t,e){Array.isArray(t)?t.forEach(function(r){e.push(r)}):e.push(t)}function us(t,e){if(t[e]===!0)throw"duplicate flag "+e;let r=t[e];t[e]=!0}function yo(t){if(t===void 0)throw Error("Internal Error - Should never get here!");return!0}function Ya(){throw Error("Internal Error - Should never get here!")}function Km(t){return t.type==="Character"}var Ja=[];for(let t=J("0");t<=J("9");t++)Ja.push(t);var Qa=[J("_")].concat(Ja);for(let t=J("a");t<=J("z");t++)Qa.push(t);for(let t=J("A");t<=J("Z");t++)Qa.push(t);var Gm=[J(" "),J("\f"),J(`
`),J("\r"),J("	"),J("\v"),J("	"),J("\xA0"),J("\u1680"),J("\u2000"),J("\u2001"),J("\u2002"),J("\u2003"),J("\u2004"),J("\u2005"),J("\u2006"),J("\u2007"),J("\u2008"),J("\u2009"),J("\u200A"),J("\u2028"),J("\u2029"),J("\u202F"),J("\u205F"),J("\u3000"),J("\uFEFF")];var M_=/[0-9a-fA-F]/,ec=/[0-9]/,F_=/[1-9]/,go=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let r=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":us(n,"global");break;case"i":us(n,"ignoreCase");break;case"m":us(n,"multiLine");break;case"u":us(n,"unicode");break;case"y":us(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:r,loc:this.loc(0)}}disjunction(){let e=[],r=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(r)}}alternative(){let e=[],r=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(r)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let r;switch(this.popChar()){case"=":r="Lookahead";break;case"!":r="NegativeLookahead";break}yo(r);let n=this.disjunction();return this.consumeChar(")"),{type:r,value:n,loc:this.loc(e)}}return Ya()}quantifier(e=!1){let r,n=this.idx;switch(this.popChar()){case"*":r={atLeast:0,atMost:1/0};break;case"+":r={atLeast:1,atMost:1/0};break;case"?":r={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":r={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),r={atLeast:i,atMost:o}):r={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&r===void 0)return;yo(r);break}if(!(e===!0&&r===void 0)&&yo(r))return this.peekChar(0)==="?"?(this.consumeChar("?"),r.greedy=!1):r.greedy=!0,r.type="Quantifier",r.loc=this.loc(n),r}atom(){let e,r=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),yo(e)?(e.loc=this.loc(r),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):Ya()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[J(`
`),J("\r"),J("\u2028"),J("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,r=!1;switch(this.popChar()){case"d":e=Ja;break;case"D":e=Ja,r=!0;break;case"s":e=Gm;break;case"S":e=Gm,r=!0;break;case"w":e=Qa;break;case"W":e=Qa,r=!0;break}return yo(e)?{type:"Set",value:e,complement:r}:Ya()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=J("\f");break;case"n":e=J(`
`);break;case"r":e=J("\r");break;case"t":e=J("	");break;case"v":e=J("\v");break}return yo(e)?{type:"Character",value:e}:Ya()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:J("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:J(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:J(e)}}}characterClass(){let e=[],r=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),r=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(Km(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(Km(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else Zl(n.value,e),e.push(J("-")),Zl(o.value,e)}else Zl(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:r,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:J("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let r=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:r};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(F_.test(e)===!1)throw Error("Expecting a positive integer");for(;ec.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(ec.test(e)===!1)throw Error("Expecting an integer");for(;ec.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:J(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return ec.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let r="";for(let i=0;i<e;i++){let o=this.popChar();if(M_.test(o)===!1)throw Error("Expecting a HexDecimal digits");r+=o}return{type:"Character",value:parseInt(r,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var kn=class{visitChildren(e){for(let r in e){let n=e[r];e.hasOwnProperty(r)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var U_=new go,Hm=class extends kn{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=ri(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},jm=new Hm;function Wv(t){try{return typeof t=="string"&&(t=new RegExp(t)),t=t.toString(),jm.reset(t),jm.visit(U_.pattern(t)),jm.multiline}catch{return!1}}function Wm(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}function ri(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Bv(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:ri(e)).join("")}function zv(t,e){let r=q_(t),n=e.match(r);return!!n&&n[0].length>0}function q_(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let o="",s;function a(l){o+=r.substr(n,l),n+=l}function u(l){o+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":u(3);break;case"x":u(4);break;case"u":e.unicode?r[n+2]==="{"?u(r.indexOf("}",n)-n+1):u(6):u(2);break;case"p":case"P":e.unicode?u(r.indexOf("}",n)-n+1):u(2);break;case"k":u(r.indexOf(">",n)-n+1);break;default:u(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(r)||[],u(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(r),s?a(s[0].length):u(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=r.substr(s,n-s);break;case"<":switch(r[n+3]){case"=":case"!":s=n,n+=4,i(),o+=r.substr(s,n-s);break;default:a(r.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:u(1);break}return o}return new RegExp(i(),t.flags)}var Bm={};ZA(Bm,{URI:()=>K_,Utils:()=>G_});var Vv;(()=>{"use strict";var t={470:i=>{function o(u){if(typeof u!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(u))}function s(u,l){for(var c,f="",m=0,T=-1,w=0,A=0;A<=u.length;++A){if(A<u.length)c=u.charCodeAt(A);else{if(c===47)break;c=47}if(c===47){if(!(T===A-1||w===1))if(T!==A-1&&w===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var _=f.lastIndexOf("/");if(_!==f.length-1){_===-1?(f="",m=0):m=(f=f.slice(0,_)).length-1-f.lastIndexOf("/"),T=A,w=0;continue}}else if(f.length===2||f.length===1){f="",m=0,T=A,w=0;continue}}l&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+u.slice(T+1,A):f=u.slice(T+1,A),m=A-T-1;T=A,w=0}else c===46&&w!==-1?++w:w=-1}return f}var a={resolve:function(){for(var u,l="",c=!1,f=arguments.length-1;f>=-1&&!c;f--){var m;f>=0?m=arguments[f]:(u===void 0&&(u=process.cwd()),m=u),o(m),m.length!==0&&(l=m+"/"+l,c=m.charCodeAt(0)===47)}return l=s(l,!c),c?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(u){if(o(u),u.length===0)return".";var l=u.charCodeAt(0)===47,c=u.charCodeAt(u.length-1)===47;return(u=s(u,!l)).length!==0||l||(u="."),u.length>0&&c&&(u+="/"),l?"/"+u:u},isAbsolute:function(u){return o(u),u.length>0&&u.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var u,l=0;l<arguments.length;++l){var c=arguments[l];o(c),c.length>0&&(u===void 0?u=c:u+="/"+c)}return u===void 0?".":a.normalize(u)},relative:function(u,l){if(o(u),o(l),u===l||(u=a.resolve(u))===(l=a.resolve(l)))return"";for(var c=1;c<u.length&&u.charCodeAt(c)===47;++c);for(var f=u.length,m=f-c,T=1;T<l.length&&l.charCodeAt(T)===47;++T);for(var w=l.length-T,A=m<w?m:w,_=-1,C=0;C<=A;++C){if(C===A){if(w>A){if(l.charCodeAt(T+C)===47)return l.slice(T+C+1);if(C===0)return l.slice(T+C)}else m>A&&(u.charCodeAt(c+C)===47?_=C:C===0&&(_=0));break}var v=u.charCodeAt(c+C);if(v!==l.charCodeAt(T+C))break;v===47&&(_=C)}var g="";for(C=c+_+1;C<=f;++C)C!==f&&u.charCodeAt(C)!==47||(g.length===0?g+="..":g+="/..");return g.length>0?g+l.slice(T+_):(T+=_,l.charCodeAt(T)===47&&++T,l.slice(T))},_makeLong:function(u){return u},dirname:function(u){if(o(u),u.length===0)return".";for(var l=u.charCodeAt(0),c=l===47,f=-1,m=!0,T=u.length-1;T>=1;--T)if((l=u.charCodeAt(T))===47){if(!m){f=T;break}}else m=!1;return f===-1?c?"/":".":c&&f===1?"//":u.slice(0,f)},basename:function(u,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');o(u);var c,f=0,m=-1,T=!0;if(l!==void 0&&l.length>0&&l.length<=u.length){if(l.length===u.length&&l===u)return"";var w=l.length-1,A=-1;for(c=u.length-1;c>=0;--c){var _=u.charCodeAt(c);if(_===47){if(!T){f=c+1;break}}else A===-1&&(T=!1,A=c+1),w>=0&&(_===l.charCodeAt(w)?--w==-1&&(m=c):(w=-1,m=A))}return f===m?m=A:m===-1&&(m=u.length),u.slice(f,m)}for(c=u.length-1;c>=0;--c)if(u.charCodeAt(c)===47){if(!T){f=c+1;break}}else m===-1&&(T=!1,m=c+1);return m===-1?"":u.slice(f,m)},extname:function(u){o(u);for(var l=-1,c=0,f=-1,m=!0,T=0,w=u.length-1;w>=0;--w){var A=u.charCodeAt(w);if(A!==47)f===-1&&(m=!1,f=w+1),A===46?l===-1?l=w:T!==1&&(T=1):l!==-1&&(T=-1);else if(!m){c=w+1;break}}return l===-1||f===-1||T===0||T===1&&l===f-1&&l===c+1?"":u.slice(l,f)},format:function(u){if(u===null||typeof u!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof u);return function(l,c){var f=c.dir||c.root,m=c.base||(c.name||"")+(c.ext||"");return f?f===c.root?f+m:f+"/"+m:m}(0,u)},parse:function(u){o(u);var l={root:"",dir:"",base:"",ext:"",name:""};if(u.length===0)return l;var c,f=u.charCodeAt(0),m=f===47;m?(l.root="/",c=1):c=0;for(var T=-1,w=0,A=-1,_=!0,C=u.length-1,v=0;C>=c;--C)if((f=u.charCodeAt(C))!==47)A===-1&&(_=!1,A=C+1),f===46?T===-1?T=C:v!==1&&(v=1):T!==-1&&(v=-1);else if(!_){w=C+1;break}return T===-1||A===-1||v===0||v===1&&T===A-1&&T===w+1?A!==-1&&(l.base=l.name=w===0&&m?u.slice(1,A):u.slice(w,A)):(w===0&&m?(l.name=u.slice(1,T),l.base=u.slice(1,A)):(l.name=u.slice(w,T),l.base=u.slice(w,A)),l.ext=u.slice(T,A)),w>0?l.dir=u.slice(0,w-1):m&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function r(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,r),s.exports}r.d=(i,o)=>{for(var s in o)r.o(o,s)&&!r.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},r.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),r.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;r.r(n),r.d(n,{URI:()=>m,Utils:()=>vt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function u(M,S){if(!M.scheme&&S)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);if(M.scheme&&!o.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!s.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let l="",c="/",f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class m{static isUri(S){return S instanceof m||!!S&&typeof S.authority=="string"&&typeof S.fragment=="string"&&typeof S.path=="string"&&typeof S.query=="string"&&typeof S.scheme=="string"&&typeof S.fsPath=="string"&&typeof S.with=="function"&&typeof S.toString=="function"}scheme;authority;path;query;fragment;constructor(S,q,G,ue,ee,Q=!1){typeof S=="object"?(this.scheme=S.scheme||l,this.authority=S.authority||l,this.path=S.path||l,this.query=S.query||l,this.fragment=S.fragment||l):(this.scheme=function(xt,lt){return xt||lt?xt:"file"}(S,Q),this.authority=q||l,this.path=function(xt,lt){switch(xt){case"https":case"http":case"file":lt?lt[0]!==c&&(lt=c+lt):lt=c}return lt}(this.scheme,G||l),this.query=ue||l,this.fragment=ee||l,u(this,Q))}get fsPath(){return v(this,!1)}with(S){if(!S)return this;let{scheme:q,authority:G,path:ue,query:ee,fragment:Q}=S;return q===void 0?q=this.scheme:q===null&&(q=l),G===void 0?G=this.authority:G===null&&(G=l),ue===void 0?ue=this.path:ue===null&&(ue=l),ee===void 0?ee=this.query:ee===null&&(ee=l),Q===void 0?Q=this.fragment:Q===null&&(Q=l),q===this.scheme&&G===this.authority&&ue===this.path&&ee===this.query&&Q===this.fragment?this:new w(q,G,ue,ee,Q)}static parse(S,q=!1){let G=f.exec(S);return G?new w(G[2]||l,X(G[4]||l),X(G[5]||l),X(G[7]||l),X(G[9]||l),q):new w(l,l,l,l,l)}static file(S){let q=l;if(i&&(S=S.replace(/\\/g,c)),S[0]===c&&S[1]===c){let G=S.indexOf(c,2);G===-1?(q=S.substring(2),S=c):(q=S.substring(2,G),S=S.substring(G)||c)}return new w("file",q,S,l,l)}static from(S){let q=new w(S.scheme,S.authority,S.path,S.query,S.fragment);return u(q,!0),q}toString(S=!1){return g(this,S)}toJSON(){return this}static revive(S){if(S){if(S instanceof m)return S;{let q=new w(S);return q._formatted=S.external,q._fsPath=S._sep===T?S.fsPath:null,q}}return S}}let T=i?1:void 0;class w extends m{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=v(this,!1)),this._fsPath}toString(S=!1){return S?g(this,!0):(this._formatted||(this._formatted=g(this,!1)),this._formatted)}toJSON(){let S={$mid:1};return this._fsPath&&(S.fsPath=this._fsPath,S._sep=T),this._formatted&&(S.external=this._formatted),this.path&&(S.path=this.path),this.scheme&&(S.scheme=this.scheme),this.authority&&(S.authority=this.authority),this.query&&(S.query=this.query),this.fragment&&(S.fragment=this.fragment),S}}let A={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function _(M,S,q){let G,ue=-1;for(let ee=0;ee<M.length;ee++){let Q=M.charCodeAt(ee);if(Q>=97&&Q<=122||Q>=65&&Q<=90||Q>=48&&Q<=57||Q===45||Q===46||Q===95||Q===126||S&&Q===47||q&&Q===91||q&&Q===93||q&&Q===58)ue!==-1&&(G+=encodeURIComponent(M.substring(ue,ee)),ue=-1),G!==void 0&&(G+=M.charAt(ee));else{G===void 0&&(G=M.substr(0,ee));let xt=A[Q];xt!==void 0?(ue!==-1&&(G+=encodeURIComponent(M.substring(ue,ee)),ue=-1),G+=xt):ue===-1&&(ue=ee)}}return ue!==-1&&(G+=encodeURIComponent(M.substring(ue))),G!==void 0?G:M}function C(M){let S;for(let q=0;q<M.length;q++){let G=M.charCodeAt(q);G===35||G===63?(S===void 0&&(S=M.substr(0,q)),S+=A[G]):S!==void 0&&(S+=M[q])}return S!==void 0?S:M}function v(M,S){let q;return q=M.authority&&M.path.length>1&&M.scheme==="file"?`//${M.authority}${M.path}`:M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?S?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,i&&(q=q.replace(/\//g,"\\")),q}function g(M,S){let q=S?C:_,G="",{scheme:ue,authority:ee,path:Q,query:xt,fragment:lt}=M;if(ue&&(G+=ue,G+=":"),(ee||ue==="file")&&(G+=c,G+=c),ee){let me=ee.indexOf("@");if(me!==-1){let $r=ee.substr(0,me);ee=ee.substr(me+1),me=$r.lastIndexOf(":"),me===-1?G+=q($r,!1,!1):(G+=q($r.substr(0,me),!1,!1),G+=":",G+=q($r.substr(me+1),!1,!0)),G+="@"}ee=ee.toLowerCase(),me=ee.lastIndexOf(":"),me===-1?G+=q(ee,!1,!0):(G+=q(ee.substr(0,me),!1,!0),G+=ee.substr(me))}if(Q){if(Q.length>=3&&Q.charCodeAt(0)===47&&Q.charCodeAt(2)===58){let me=Q.charCodeAt(1);me>=65&&me<=90&&(Q=`/${String.fromCharCode(me+32)}:${Q.substr(3)}`)}else if(Q.length>=2&&Q.charCodeAt(1)===58){let me=Q.charCodeAt(0);me>=65&&me<=90&&(Q=`${String.fromCharCode(me+32)}:${Q.substr(2)}`)}G+=q(Q,!0,!1)}return xt&&(G+="?",G+=q(xt,!1,!1)),lt&&(G+="#",G+=S?lt:_(lt,!1,!1)),G}function E(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+E(M.substr(3)):M}}let D=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function X(M){return M.match(D)?M.replace(D,S=>E(S)):M}var ge=r(470);let $e=ge.posix||ge,Gt="/";var vt;(function(M){M.joinPath=function(S,...q){return S.with({path:$e.join(S.path,...q)})},M.resolvePath=function(S,...q){let G=S.path,ue=!1;G[0]!==Gt&&(G=Gt+G,ue=!0);let ee=$e.resolve(G,...q);return ue&&ee[0]===Gt&&!S.authority&&(ee=ee.substring(1)),S.with({path:ee})},M.dirname=function(S){if(S.path.length===0||S.path===Gt)return S;let q=$e.dirname(S.path);return q.length===1&&q.charCodeAt(0)===46&&(q=""),S.with({path:q})},M.basename=function(S){return $e.basename(S.path)},M.extname=function(S){return $e.extname(S.path)}})(vt||(vt={}))})(),Vv=n})();var{URI:K_,Utils:G_}=Vv;var ni=Bm;"default"in ni&&(ni=ni.default);var Yt=ni.URI;var ve;(function(t){t.basename=ni.Utils.basename,t.dirname=ni.Utils.dirname,t.extname=ni.Utils.extname,t.joinPath=ni.Utils.joinPath,t.resolvePath=ni.Utils.resolvePath;function e(n,i){return n?.toString()===i?.toString()}t.equals=e;function r(n,i){let o=typeof n=="string"?n:n.path,s=typeof i=="string"?i:i.path,a=o.split("/").filter(m=>m.length>0),u=s.split("/").filter(m=>m.length>0),l=0;for(;l<a.length&&a[l]===u[l];l++);let c="../".repeat(a.length-l),f=u.slice(l).join("/");return c+f}t.relative=r})(ve=ve||(ve={}));var wj=ve.equals,Sj=ve.relative;var tc,Xv=()=>tc??(tc=rc(`{"$type":"Grammar","isDeclared":true,"name":"LangiumGrammar","rules":[{"$type":"ParserRule","name":"Grammar","entry":true,"definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"isDeclared","operator":"?=","terminal":{"$type":"Keyword","value":"grammar"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"with"},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"}],"cardinality":"?"},{"$type":"Assignment","feature":"imports","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"interfaces","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}],"cardinality":"+"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Interface","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"interface"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"extends"},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SchemaType","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"attributes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},"cardinality":"*"},{"$type":"Keyword","value":"}"},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeAttribute","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"isOptional","operator":"?=","terminal":{"$type":"Keyword","value":"?"},"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeDefinition","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnionType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnionType"},"feature":"types","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ArrayType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ArrayType"},"feature":"elementType","operator":"="},{"$type":"Keyword","value":"["},{"$type":"Keyword","value":"]"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReferenceType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ReferenceType"}},{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"referenceType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SimpleType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":")"}]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"SimpleType"}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"typeRef","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"primitiveType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"stringType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PrimitiveType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"string"},{"$type":"Keyword","value":"number"},{"$type":"Keyword","value":"boolean"},{"$type":"Keyword","value":"Date"},{"$type":"Keyword","value":"bigint"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Type","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"type"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractRule","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"GrammarImport","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"import"},{"$type":"Assignment","feature":"path","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParserRule","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"entry","operator":"?=","terminal":{"$type":"Keyword","value":"entry"}},{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"wildcard","operator":"?=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"returnType","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":false},"calledByName":false}]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"InferredType","parameters":[{"$type":"Parameter","name":"imperative"}],"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","guardCondition":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}},"elements":[{"$type":"Keyword","value":"infer"}]},{"$type":"Group","guardCondition":{"$type":"Negation","value":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}}},"elements":[{"$type":"Keyword","value":"infers"}]}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"wildcard":false},{"$type":"ParserRule","name":"RuleNameAndParams","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Parameter","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Alternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ConditionalBranch","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"}},{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"guardCondition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":">"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnorderedGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnorderedGroup"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTokenWithCardinality","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Action","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Action"}},{"$type":"Keyword","value":"{"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":true},"calledByName":false}]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"+="}]}},{"$type":"Keyword","value":"current"}],"cardinality":"?"},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@43"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Keyword","definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RuleCall","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NamedArgument","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"calledByName","operator":"?=","terminal":{"$type":"Keyword","value":"="}}],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"LiteralCondition","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"true","operator":"?=","terminal":{"$type":"Keyword","value":"true"}},{"$type":"Keyword","value":"false"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Disjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Disjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Conjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Conjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Negation","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Negation"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Atom","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedCondition","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParameterReference","definition":{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedKeyword","inferredType":{"$type":"InferredType","name":"Keyword"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedRuleCall","inferredType":{"$type":"InferredType","name":"RuleCall"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Assignment","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Assignment"}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}],"cardinality":"?"},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"+="},{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"?="}]}},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedAssignableElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@40"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReference","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CrossReference"}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"deprecatedSyntax","operator":"?=","terminal":{"$type":"Keyword","value":"|"}},{"$type":"Keyword","value":":"}]},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]}}],"cardinality":"?"},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReferenceableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedGroup","inferredType":{"$type":"InferredType","name":"Group"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReturnType","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRule","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"hidden","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"},"cardinality":"?"},{"$type":"Keyword","value":"terminal"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}}],"cardinality":"?"}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalAlternatives"},"feature":"elements","operator":"+="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalGroup"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalTokenElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@57"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@53"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@54"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@55"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@56"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedTerminalElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"lookahead","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?="},{"$type":"Keyword","value":"?!"}]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRuleCall","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalRuleCall"}},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@46"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NegatedToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"NegatedToken"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UntilToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UntilToken"}},{"$type":"Keyword","value":"->"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RegexToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"RegexToken"}},{"$type":"Assignment","feature":"regex","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@61"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Wildcard","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Wildcard"}},{"$type":"Keyword","value":"."}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CharacterRange","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CharacterRange"}},{"$type":"Assignment","feature":"left","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":".."},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"FeatureName","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"current"},{"$type":"Keyword","value":"entry"},{"$type":"Keyword","value":"extends"},{"$type":"Keyword","value":"false"},{"$type":"Keyword","value":"fragment"},{"$type":"Keyword","value":"grammar"},{"$type":"Keyword","value":"hidden"},{"$type":"Keyword","value":"import"},{"$type":"Keyword","value":"interface"},{"$type":"Keyword","value":"returns"},{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"true"},{"$type":"Keyword","value":"type"},{"$type":"Keyword","value":"infer"},{"$type":"Keyword","value":"infers"},{"$type":"Keyword","value":"with"},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ID","definition":{"$type":"RegexToken","regex":"/\\\\^?[_a-zA-Z][\\\\w_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","definition":{"$type":"RegexToken","regex":"/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RegexLiteral","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/[a-z]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/"},"fragment":false}],"types":[{"$type":"Type","name":"AbstractType","type":{"$type":"UnionType","types":[{"$type":"SimpleType","typeRef":{"$ref":"#/rules@1"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@10"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@23/definition/elements@0"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@13"}}]}}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"interfaces":[],"usedGrammars":[]}`));var oc=de(io(),1);var Za=de(Vn(),1);function j_(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}var Yv=0,H_=10;var Jv=Symbol("OperationCancelled");function To(t){return t===Jv}async function Ze(t){if(t===Za.CancellationToken.None)return;let e=Date.now();if(e-Yv>=H_&&(Yv=e,await j_()),t.isCancellationRequested)throw Jv}var nc=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new Za.CancellationTokenSource}lock(e){this.cancel();let r=new Za.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{To(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};function Lr(t){return{code:t}}var ls;(function(t){t.all=["fast","slow","built-in"]})(ls=ls||(ls={}));var ic=class{constructor(e){this.entries=new Le,this.reflection=e.shared.AstReflection}register(e,r=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let u={check:this.wrapValidationException(a,r),category:n};this.addEntry(i,u)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,r),category:n};this.addEntry(i,a)}}}wrapValidationException(e,r){return async(n,i,o)=>{try{await e.call(r,n,i,o)}catch(s){if(To(s))throw s;console.error("An error occurred during validation:",s);let a=s instanceof Error?s.message:String(s);s instanceof Error&&s.stack&&console.error(s.stack),i("error","An error occurred during validation: "+a,{node:n})}}}addEntry(e,r){if(e==="AstNode"){this.entries.add("AstNode",r);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,r)}getChecks(e,r){let n=ie(this.entries.get(e)).concat(this.entries.get("AstNode"));return r&&(n=n.filter(i=>r.includes(i.category))),n.map(i=>i.check)}};function Qv(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let a of n.attributes)i.push({name:a.name,optional:a.isOptional,astNodes:new Set([a]),type:vo(a.type)});let o=new Set;for(let a of n.superTypes)a.ref&&o.add(pn(a.ref));let s={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};r.interfaces.push(s)}for(let n of e){let i={name:n.name,declared:!0,type:vo(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}function vo(t){if(po(t))return{elementType:vo(t.elementType)};if(mo(t))return{referenceType:vo(t.referenceType)};if(Br(t))return{types:t.types.map(vo)};if(ir(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=$n(r);if(n)return cs(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}function fs(t){return"referenceType"in t}function zm(t){return"elementType"in t}function Zv(t){return"types"in t}function Vm(t){return"value"in t}function W_(t){return"primitive"in t}function B_(t){return"string"in t}function ex(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new ss(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new Vl(n.name,{declared:n.declared,dataType:n.dataType});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let s=e.get(o)||r.get(o);s&&i.superTypes.add(s)}for(let o of n.subTypes){let s=e.get(o)||r.get(o);s&&i.subTypes.add(s)}for(let o of n.properties){let s=z_(o,e,r);i.properties.push(s)}}for(let n of t.unions){let i=r.get(n.name);i.type=eu(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}function z_(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:eu(t.type,void 0,e,r)}}function eu(t,e,r,n){if(zm(t))return{elementType:eu(t.elementType,e,r,n)};if(fs(t))return{referenceType:eu(t.referenceType,void 0,r,n)};if(Zv(t))return{types:t.types.map(i=>eu(i,e,r,n))};if(B_(t))return{string:t.string};if(W_(t))return{primitive:t.primitive,regex:t.regex};if(Vm(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function Ym(t,e){let r=tu(t),n=tu(e);for(let i of n)V_(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}function V_(t,e){return t.some(r=>Xm(r,e))}function Xm(t,e){return zm(t)&&zm(e)?Xm(t.elementType,e.elementType):fs(t)&&fs(e)?Xm(t.referenceType,e.referenceType):Vm(t)&&Vm(e)?t.value===e.value:!1}function tu(t){return Zv(t)?t.types.flatMap(e=>tu(e)):[t]}function tx(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType,r.checkCrossReferenceToTypeUnion],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion,RegexToken:[r.checkInvalidRegexFlags,r.checkDirectlyUsedRegexFlags]};e.register(n,r)}var Ae;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(Ae=Ae||(Ae={}));var sc=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",data:Lr(Ae.GrammarNameUppercase)})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>H(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>H(o)&&!Mr(o));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",data:Lr(Ae.EntryRuleTokenSyntax)}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&Mr(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>ie(i.rules).filter(o=>!ru(o));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>ie(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let o=new Le;n(e).forEach(u=>o.add(u.name,u));for(let[,u]of o.entriesGroupedByKey())u.length>1&&u.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let s=new Set,a=nu(this.documents,e);for(let u of a)n(u).forEach(l=>s.add(l.name));for(let u of o.keys())s.has(u)&&o.get(u).forEach(c=>{r("error",`A ${i} with the name '${c.name}' already exists in an imported grammar.`,{node:c,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Le;for(let i of e.imports){let o=ii(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,s)=>{s>0&&r("warning","The grammar is already being directly imported.",{node:o,tags:[oc.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let o of e.imports){let s=nu(this.documents,o);n.set(o,s)}let i=new Le;for(let o of e.imports){let s=n.get(o);for(let a of e.imports){if(o===a)continue;let u=n.get(a),l=this.getDuplicateExportedRules(s,u);for(let c of l)i.add(o,c)}}for(let o of e.imports){let s=i.get(o);s.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+ie(s).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(a=>!r.includes(a)).flatMap(a=>a.rules),o=r.flatMap(a=>a.rules),s=new Set;for(let a of i){let u=a.name;for(let l of o){let c=l.name;u===c&&s.add(l.name)}}return s}checkGrammarTypeInfer(e,r){var n,i,o;let s=new Set;for(let u of e.types)s.add(u.name);for(let u of e.interfaces)s.add(u.name);for(let u of nu(this.documents,e))u.types.forEach(l=>s.add(l.name)),u.interfaces.forEach(l=>s.add(l.name));for(let u of e.rules.filter(H)){if(ru(u))continue;let l=Mr(u),c=!u.returnType&&!u.dataType,f=$n(u);if(!l&&f&&s.has(f)===c){if((c||((n=u.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&u.inferredType===void 0)r("error",a(f,c),{node:u,property:"name",data:Lr(Ae.MissingReturns)});else if(c||((i=u.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=zr(u.inferredType.$cstNode,"infers");r("error",a(f,c),{node:u.inferredType,property:"name",data:{code:Ae.InvalidInfers,actionSegment:nr(m)}})}}else if(l&&c){let m=zr(u.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:u,property:"inferredType",data:{code:Ae.InvalidInfers,actionSegment:nr(m)}})}}for(let u of Qe(e).filter(_e)){let l=this.getActionType(u);if(l){let c=!!u.inferredType,f=$n(u);if(u.type&&f&&s.has(f)===c){let m=c?zr(u.$cstNode,"infer"):zr(u.$cstNode,"{");r("error",a(f,c),{node:u,property:"type",data:{code:c?Ae.SuperfluousInfer:Ae.MissingInfer,actionSegment:nr(m)}})}else if(l&&f&&s.has(f)&&c&&u.$cstNode){let m=Xt((o=u.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),T=zr(u.$cstNode,"{");m&&T&&r("error",`${f} is a declared type and cannot be redefined.`,{node:u,property:"type",data:{code:Ae.SuperfluousInfer,actionRange:{start:T.range.end,end:m.range.start}}})}}}function a(u,l){return l?`The type '${u}' is already explicitly declared and cannot be inferred.`:`The type '${u}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",data:Lr(Ae.HiddenGrammarTokens)})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=Xr(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkInvalidRegexFlags(e,r){let n=e.regex;if(n){let i=n.lastIndexOf("/"),o=n.substring(i+1),s="gmy",u=s+"isu",l=new Set,c=new Set;for(let m=0;m<o.length;m++){let T=o.charAt(m);u.includes(T)?s.includes(T)&&c.add(T):l.add(T)}let f=this.getFlagRange(e);f&&(l.size>0?r("error",`'${Array.from(l).join("")}' ${l.size>1?"are":"is"} not valid regular expression flag${l.size>1?"s":""}.`,{node:e,range:f}):c.size>0&&r("warning",`'${Array.from(c).join("")}' regular expression flag${c.size>1?"s":""} will be ignored by Langium.`,{node:e,range:f}))}}checkDirectlyUsedRegexFlags(e,r){if(!Se(e.$container)){let n=this.getFlagRange(e);n&&r("warning","Regular expression flags are only applied if the terminal is not a composition",{node:e,range:n})}}getFlagRange(e){let r=Xt(e.$cstNode,"regex");if(!r||!e.regex)return;let n=e.regex,i=n.lastIndexOf("/")+1;return{start:{line:r.range.end.line,character:r.range.end.character-n.length+i},end:r.range.end}}checkUsedHiddenTerminalRule(e,r){let n=Ie(e,i=>Se(i)||H(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Se(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Se(n)&&n.fragment&&Ie(e,H)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",data:Lr(Ae.CrossRefTokenSyntax)})}checkPackageImport(e,r){ii(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",data:Lr(Ae.UnnecessaryFileExtension)})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,data:Lr(Ae.UseRegexTokens)})}}checkGrammarForUnusedRules(e,r){let n=ds(e,!0);for(let i of e.rules)Se(i)&&i.hidden||ru(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[oc.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Le,i=new Set;for(let l of e.rules)Se(l)&&l.name&&n.add(l.name,l),H(l)&&Qe(l).filter(dt).forEach(f=>i.add(f.value));let o=new Le,s=new Le;for(let l of e.imports){let c=nu(this.documents,l);for(let f of c)for(let m of f.rules)Se(m)&&m.name?o.add(m.name,l):H(m)&&m.name&&Qe(m).filter(dt).forEach(w=>s.add(w.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(s.has(l.name)){let c=s.get(l.name);r("error",`Terminal name clashes with imported keyword from "${c[0].path}".`,{node:l,property:"name"})}let a=new Le;for(let l of i)for(let c of o.get(l))a.add(c,l);for(let[l,c]of a.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let u=new Le;for(let[l,c]of o.entriesGroupedByKey()){let f=s.get(l);f.length>0&&c.filter(m=>!f.includes(m)).forEach(m=>u.add(m,l))}for(let[l,c]of u.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!ru(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",data:Lr(Ae.RuleNameUppercase)})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&X_.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){Ie(e,H)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{Vr(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,data:Lr(Ae.OptionalUnorderedGroup)})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=Qe(e).filter(ts);for(let o of n)i.some(s=>s.parameter.ref===o)||r("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[oc.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(ru(e))return;let n=nx(e),i=Mr(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&Ne(e.terminal)&&H(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;Qe(e.terminal).map(o=>zt(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=vo(n.type),o=tu(i),s=!1,a=!1;for(let u of o)fs(u)?s=!0:fs(u)||(a=!0);s&&a&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!cs(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(H(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else Se(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!iu(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross-reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){var n;let i=e.terminal;if(Ne(i)){let o=i.rule.ref;H(o)&&!Mr(o)?r("error","Parser rules cannot be used for cross-references.",{node:i,property:"rule"}):H(o)&&!ix(o)?r("error","Data type rules for cross-references must be of type string.",{node:i,property:"rule"}):Se(o)&&(!((n=o.type)===null||n===void 0)&&n.name)&&o.type.name!=="string"&&r("error","Terminal rules for cross-references must be of type string.",{node:i,property:"rule"})}}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,r){if(Lt(e.type.ref)&&Br(e.type.ref.type)){let n=rx(e.type.ref.type);n.length>0&&r("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,r){var n,i;H((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){ir(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&H(e.ref)&&!Mr(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=$n(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross-references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&zt(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};function ru(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var X_=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function rx(t){let e=[];return t.types.forEach(r=>{var n;ir(r)&&(!((n=r.typeRef)===null||n===void 0)&&n.ref?Lt(r.typeRef.ref)&&(Br(r.typeRef.ref.type)?e.push(...rx(r.typeRef.ref.type)):e.push(r.typeRef.ref.name)):r.stringType?e.push(`"${r.stringType}"`):r.primitiveType&&e.push(r.primitiveType))}),Array.from(new Set(e))}function Vr(t,e){return t==="?"||t==="*"||Mt(e)&&!!e.guardCondition}function ox(t){return t==="*"||t==="+"}function Mr(t){return sx(t,new Set)}function sx(t,e){if(e.has(t))return!0;e.add(t);for(let r of Qe(t))if(Ne(r)){if(!r.rule.ref||H(r.rule.ref)&&!sx(r.rule.ref,e))return!1}else{if(Re(r))return!1;if(_e(r))return!1}return!!t.definition}function nx(t){var e;let r=(e=t.returnType)===null||e===void 0?void 0:e.ref;return t.dataType!==void 0||Lt(r)&&Y_(r)}function Y_(t){return Qm(t.type,new Set)}function Qm(t,e){if(e.has(t))return!0;if(e.add(t),po(t))return!1;if(mo(t))return!1;if(Br(t))return t.types.every(r=>Qm(r,e));if(ir(t)){if(t.primitiveType!==void 0)return!0;if(t.stringType!==void 0)return!0;if(t.typeRef!==void 0){let r=t.typeRef.ref;return Lt(r)?Qm(r.type,e):!1}else return!1}else return!1}function ix(t){return ou(t,new Set)}function ou(t,e){var r,n;if(e.has(t))return!0;if(e.add(t),H(t)){if(t.dataType)return t.dataType==="string";if(!((r=t.returnType)===null||r===void 0)&&r.ref)return ou(t.returnType.ref,e)}else{if(Lt(t))return ou(t.type,e);if(po(t))return!1;if(mo(t))return!1;if(Br(t))return t.types.every(i=>ou(i,e));if(ir(t)){if(t.primitiveType==="string")return!0;if(t.stringType)return!0;if(!((n=t.typeRef)===null||n===void 0)&&n.ref)return ou(t.typeRef.ref,e)}}return!1}function eh(t){let e=t.$container;if(Mt(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let o=r[i];if(_e(o))return o;{let s=Qe(r[i]).find(_e);if(s)return s}}}if(Qo(e))return eh(e)}function pn(t){var e;if(H(t))return Mr(t)?t.name:(e=ms(t))!==null&&e!==void 0?e:t.name;if(br(t)||Lt(t)||rs(t))return t.name;if(_e(t)){let r=hs(t);if(r)return r}else if(es(t))return t.name;throw new Xl("Cannot get name of Unknown Type",t.$cstNode)}function $n(t){if(t)try{return pn(t)}catch{return}}function ms(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(H(e))return e.name;if(br(e)||Lt(e))return e.name}}}function hs(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return pn(t.type.ref)}function xo(t){var e,r,n;return Se(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Mr(t)?t.name:(n=ms(t))!==null&&n!==void 0?n:t.name}function Xr(t){let e={s:!1,i:!1,u:!1},r=ys(t.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(r,n)}var th=/[\s\S]/.source;function ys(t,e){if(hv(t))return J_(t);if(gv(t))return Q_(t);if(Gl(t))return tN(t);if(jl(t)){let r=t.rule.ref;if(!r)throw new Error("Missing rule reference.");return oi(ys(r.definition),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(cv(t))return eN(t);if(Rv(t))return Z_(t);if(dv(t)){let r=t.regex.lastIndexOf("/"),n=t.regex.substring(1,r),i=t.regex.substring(r+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),oi(n,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}else{if(wv(t))return oi(th,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}}function J_(t){return oi(t.elements.map(e=>ys(e)).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function Q_(t){return oi(t.elements.map(e=>ys(e)).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function Z_(t){return oi(`${th}*?${ys(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function eN(t){return oi(`(?!${ys(t.terminal)})${th}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function tN(t){return t.right?oi(`[${Jm(t.left)}-${Jm(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):oi(Jm(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function Jm(t){return ri(t.value)}function oi(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function rh(t){if(t.path===void 0||t.path.length===0)return;let e=ve.dirname(ne(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),ve.resolvePath(e,r)}function ii(t,e){let r=rh(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(Zo(i))return i}}catch{}}function nu(t,e){if(ql(e)){let r=ii(t,e);if(r){let n=Zm(t,r);return n.push(r),n}return[]}else return Zm(t,e)}function Zm(t,e,r=e,n=new Set,i=new Set){let o=ne(e);if(r!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let s of e.imports){let a=ii(t,s);a&&Zm(t,a,r,n,i)}}return Array.from(i)}function ps(t){return Re(t)?[t]:Ir(t)||Mt(t)||Pr(t)?t.elements.flatMap(e=>ps(e)):Ne(t)&&t.rule.ref?ps(t.rule.ref.definition):[]}var rN=["string","number","boolean","Date","bigint"];function cs(t){return rN.includes(t)}var nh=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let o=0;o<r.next.length;o++){let s=n[o],a=r.next[o];a.actionWithAssignment&&i.push({alt:ax(s),next:[]}),a.name!==void 0&&a.name!==s.name&&(a.actionWithAssignment?(s.properties=[],s.ruleCalls=[],s.super=[e.name],s.name=a.name):(s.super=[s.name,...s.ruleCalls],s.properties=[],s.ruleCalls=[],s.name=a.name)),s.properties.push(...a.properties),s.ruleCalls.push(...a.ruleCalls);let u={alt:s,next:a.children};u.next.length===0?(u.alt.super=u.alt.super.filter(l=>l!==u.alt.name),i.push(u)):i.push(...this.applyNext(e,u))}return dx(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(ax(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=Ro();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function nN(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(ux)}}function ax(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>ux(e))}}function ux(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function lx(t,e,r){let n=[],i={fragments:new Map};for(let u of t)n.push(...cx(i,u));let o=lN(n),s=cN(o),a=fN(o,s,r);for(let u of e){let l=iN(u);a.unions.push({name:u.name,declared:!1,type:l,subTypes:new Set,superTypes:new Set,dataType:u.dataType})}return a}function iN(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=ih(t.definition,r);return e?{primitive:"string"}:n}function ih(t,e){var r,n,i;if(t.cardinality)return e();if(Ir(t))return{types:t.elements.map(o=>ih(o,e))};if(Mt(t)||Pr(t))return t.elements.length!==1?e():ih(t.elements[0],e);if(Ne(t)){let o=(r=t.rule)===null||r===void 0?void 0:r.ref;return o?Se(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:Xr(o).toString()}:{value:o.name}:e()}else if(dt(t))return{string:t.value};return e()}function cx(t,e){let r=Ro(e),n=new nh(t,r);return e.definition&&oh(n,n.root,e.definition),n.getTypes()}function Ro(t){return{name:H(t)||_e(t)?$n(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function oh(t,e,r){let n=Vr(r.cardinality,r);if(Ir(r)){let i=[];n&&i.push(t.connect(e,Ro()));for(let o of r.elements){let s=t.connect(e,Ro());i.push(oh(t,s,o))}return t.merge(...i)}else if(Mt(r)||Pr(r)){let i=t.connect(e,Ro()),o;n&&(o=t.connect(e,Ro()));for(let s of r.elements)i=oh(t,i,s);return o?t.merge(o,i):i}else{if(_e(r))return oN(t,e,r);Re(r)?sN(e,r):Ne(r)&&aN(t,e,r)}return e}function oN(t,e,r){var n;if(!t.hasLeafNode(e)){let o=nN(e);t.connect(e,o)}let i=t.connect(e,Ro(r));if(r.type){let o=(n=r.type)===null||n===void 0?void 0:n.ref;o&&Xa(o)&&(i.name=o.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:bo(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function sN(t,e){let r={types:new Set,reference:!1};fx(e.terminal,r);let n=bo(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:Vr(e.cardinality),type:n,astNodes:new Set([e])})}function fx(t,e){if(Ir(t)||Pr(t)||Mt(t))for(let r of t.elements)fx(r,e);else if(dt(t))e.types.add(`'${t.value}'`);else if(Ne(t)&&t.rule.ref)e.types.add(xo(t.rule.ref));else if(zt(t)&&t.type.ref){let r=$n(t.type.ref);r&&e.types.add(r),e.reference=!0}}function aN(t,e,r){let n=r.rule.ref;if(H(n)&&n.fragment){let i=uN(n,t.context);Vr(r.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else H(n)&&e.ruleCalls.push(xo(n))}function uN(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=$n(t),o=cx(e,t).filter(s=>s.alt.name===i);return n.push(...o.flatMap(s=>s.alt.properties)),n}function lN(t){let e=new Map,r=[],n=dx(t).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(s=>{s!==o.name&&o.subTypes.add(s)}))}for(let i of r)for(let o of i.ruleCalls){let s=e.get(o);s&&s.name!==i.name&&s.superTypes.add(i.name)}return Array.from(e.values())}function dx(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Le),r=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],s=new Set,a={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let u of i){let l=u.alt;a.alt.super.push(...l.super),a.next.push(...u.next);let c=l.properties;for(let f of c){let m=o.find(T=>T.name===f.name);m?(m.type=Ym(m.type,f.type),f.astNodes.forEach(T=>m.astNodes.add(T))):o.push(Object.assign({},f))}l.ruleCalls.forEach(f=>s.add(f))}for(let u of i){let l=u.alt;if(l.ruleCalls.length===0)for(let c of o)l.properties.find(f=>f.name===c.name)||(c.optional=!0)}a.alt.ruleCalls=Array.from(s),r.push(a)}return r}function cN(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Le;for(let i of t)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let s={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:bo(!1,!1,o)};r.push(s)}return r}function fN(t,e,r){let n=new Le;for(let a of t)for(let u of a.superTypes)n.add(u,a.name);let i=new Set(r.interfaces.map(a=>a.name)),o={interfaces:[],unions:e},s=new Map(e.map(a=>[a.name,a]));for(let a of t){let u=new Set(n.get(a.name));if(a.properties.length===0&&u.size>0)if(i.has(a.name))a.abstract=!0,o.interfaces.push(a);else{let l=bo(!1,!1,Array.from(u)),c=s.get(a.name);if(c)c.type=Ym(c.type,l);else{let f={name:a.name,declared:!1,subTypes:u,superTypes:a.superTypes,type:l};o.unions.push(f),s.set(a.name,f)}}else o.interfaces.push(a)}for(let a of o.interfaces)a.superTypes=new Set([...a.superTypes].filter(u=>!s.has(u)));return o}function bo(t,e,r){if(t)return{elementType:bo(!1,e,r)};if(e)return{referenceType:bo(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:cs(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>bo(!1,!1,[n]))}}function px(t,e){let r=mx(t,e),n=Qv(r.interfaces,r.types),i=lx(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}function mx(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let o=ne(i);if(!r.has(o.uri)){r.add(o.uri);for(let s of i.rules)H(s)&&!s.fragment&&(Mr(s)?n.datatypeRules.push(s):n.parserRules.push(s));if(i.interfaces.forEach(s=>n.interfaces.push(s)),i.types.forEach(s=>n.types.push(s)),e){let s=i.imports.map(a=>ii(e,a)).filter(a=>a!==void 0);mx(s,e,r,n)}}}return n}function gx(t,e){let{inferred:r,declared:n,astResources:i}=px(t,e);return{astResources:i,inferred:hx(n,r),declared:hx(r,n)}}function hx(t,e){var r,n;let i={interfaces:jv(yx(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:yx(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},o=ex(i);return dN(o),o}function yx(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function dN(t){let e=mN(t),r=Array.from(e.values());hN(r),yN(t.interfaces),pN(r)}function pN(t){let e=new Set,r=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)r(i),i.typeNames.forEach(o=>n.typeNames.add(o))}};t.forEach(r)}function mN({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,sh(i.type,new Set));for(let[i,o]of n)o&&r.delete(i.name);return r}function sh(t,e){if(e.has(t))return!0;if(e.add(t),Pt(t))return t.types.every(r=>sh(r,e));if(Dr(t)){let r=t.value;return cn(r)?sh(r.type,e):!1}else return Or(t)||Cn(t)}function hN(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function yN(t){var e;let r=t.reduce((s,a)=>(s.set(a.name,a),s),new Map);for(let s of t){let a=s.properties.flatMap(u=>Hv(u.type));for(let u of a)(e=r.get(u))===null||e===void 0||e.containerTypes.add(s)}let n=new Set,i=t.filter(s=>s.subTypes.size===0),o=new Set(i);for(;i.length>0;){let s=i.shift();if(s)for(let a of s.superTypes)dn(a)&&(s.containerTypes.size===0?(n.add(a.name),a.containerTypes.clear()):n.has(a.name)||s.containerTypes.forEach(u=>a.containerTypes.add(u)),o.has(a)||(o.add(a),i.push(a)))}}var gN={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1},TN={maxLookahead:3},Tx={AstReflection:()=>new Ka},vx={Grammar:()=>Xv(),LanguageMetaData:()=>gN,parser:{ParserConfig:()=>TN}};var su=class{constructor(e,r,n){var i;this.elements=e,this.outerScope=r,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}},gs=class{constructor(e,r,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=r}getElement(e){let r=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(r);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=ie(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},xx={getElement(){},getAllElements(){return Jo}};var ac=de(Vn(),1);var Ts=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=ac.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=ki,i=ac.CancellationToken.None){let o=[];this.exportNode(e,o,r);for(let s of n(e))await Ze(i),this.exportNode(s,o,r);return o}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=ac.CancellationToken.None){let n=e.parseResult.value,i=new Le;for(let o of Qe(n))await Ze(r),this.processNode(o,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,r))}}};var uc=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},ah=class extends uc{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,r){this.throwIfDisposed(),this.cache.set(e,r)}get(e,r){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(r){let n=r();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},lc=class extends uc{constructor(e){super(),this.cache=new Map,this.converter=e??(r=>r)}has(e,r){return this.throwIfDisposed(),this.cacheForContext(e).has(r)}set(e,r,n){this.throwIfDisposed(),this.cacheForContext(e).set(r,n)}get(e,r,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(r))return i.get(r);if(n){let o=n();return i.set(r,o),o}else return}delete(e,r){return this.throwIfDisposed(),this.cacheForContext(e).delete(r)}clear(e){if(this.throwIfDisposed(),e){let r=this.converter(e);this.cache.delete(r)}else this.cache.clear()}cacheForContext(e){let r=this.converter(e),n=this.cache.get(r);return n||(n=new Map,this.cache.set(r,n)),n}};var cc=class extends ah{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var vs=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new cc(e.shared)}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=ne(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&r.push(ie(a).filter(u=>this.reflection.isSubtype(u.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=r.length-1;s>=0;s--)o=this.createScope(r[s],o);return o}createScope(e,r,n){return new su(ie(e),r,n)}createScopeForNodes(e,r,n){let i=ie(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new su(i,r,n)}getGlobalScope(e,r){return this.globalScopeCache.get(e,()=>new gs(this.indexManager.allElements(e)))}};var fc=class extends vs{constructor(e){super(e),this.langiumDocuments=e.shared.workspace.LangiumDocuments}getScope(e){let r=this.reflection.getReferenceType(e);return r===fo?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=ne(r.container).precomputedScopes,o=Hl(r.container);if(i&&o){let a=i.get(o);a.length>0&&(n=ie(a).filter(u=>u.type===Ga||u.type===ja))}let s=this.getGlobalScope(e,r);return n?this.createScope(n,s):s}getGlobalScope(e,r){let n=Ie(r.container,Zo);if(!n)return xx;let i=new Set;this.gatherImports(n,i);let o=this.indexManager.allElements(e,i);return e===fo&&(o=o.filter(s=>s.type===Ga||s.type===ja)),new gs(o)}gatherImports(e,r){for(let n of e.imports){let i=rh(n);if(i&&!r.has(i.toString())&&(r.add(i.toString()),this.langiumDocuments.hasDocument(i))){let s=this.langiumDocuments.getOrCreateDocument(i).parseResult.value;Zo(s)&&this.gatherImports(s,r)}}}},dc=class extends Ts{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),H(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(o,o.name,n))}Qe(e).forEach(o=>{if(_e(o)&&o.inferredType){let s=hs(o);s&&r.push(this.createInterfaceDescription(o,s,n))}})}}processNode(e,r,n){rs(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let o=e.$container;if(o&&H(e)&&!e.returnType&&!e.dataType){let s=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(s,s.name,r))}}processActionNode(e,r,n){let i=Hl(e);if(i&&_e(e)&&e.inferredType){let o=hs(e);o&&n.add(i,this.createInterfaceDescription(e,o,r))}}createInterfaceDescription(e,r,n=ne(e)){let i,o=()=>{var s;return i??(i=nr((s=this.nameProvider.getNameNode(e))!==null&&s!==void 0?s:e.$cstNode))};return{node:e,name:r,get nameSegment(){return o()},selectionSegment:nr(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};var Fr=de(we(),1);var or=de(we(),1);var pc=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r={},n=or.CancellationToken.None){let i=e.parseResult,o=[];if(await Ze(n),(!r.categories||r.categories.includes("built-in"))&&(this.processLexingErrors(i,o,r),r.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===mn.LexingError})||(this.processParsingErrors(i,o,r),r.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===mn.ParsingError}))||(this.processLinkingErrors(e,o,r),r.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===mn.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,r,n))}catch(s){if(To(s))throw s;console.error("An error occurred during validation:",s)}return await Ze(n),o}processLexingErrors(e,r,n){for(let i of e.lexerErrors){let o={severity:or.DiagnosticSeverity.Error,range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Lr(mn.LexingError),source:this.getSource()};r.push(o)}}processParsingErrors(e,r,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset))o=or.Range.create(0,0,0,0);else{let a=or.Position.create(s.endLine-1,s.endColumn);o=or.Range.create(a,a)}}}else o=qa(i.token);if(o){let s={severity:or.DiagnosticSeverity.Error,range:o,message:i.message,data:Lr(mn.ParsingError),source:this.getSource()};r.push(s)}}}processLinkingErrors(e,r,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:mn.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};r.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,r,n=or.CancellationToken.None){let i=[],o=(s,a,u)=>{i.push(this.toDiagnostic(s,a,u))};return await Promise.all(Zn(e).map(async s=>{await Ze(n);let a=this.validationRegistry.getChecks(s.$type,r.categories);for(let u of a)await u(s,o,n)})),i}toDiagnostic(e,r,n){return{message:r,range:vN(n),severity:xN(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function vN(t){if(or.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=Xt(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=zr(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function xN(t){switch(t){case"error":return or.DiagnosticSeverity.Error;case"warning":return or.DiagnosticSeverity.Warning;case"info":return or.DiagnosticSeverity.Information;case"hint":return or.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}var mn;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(mn=mn||(mn={}));var mc=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=o=>o&&n.push(o);for(let o of r.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,r,n){var i;switch((i=e.data)===null||i===void 0?void 0:i.code){case Ae.GrammarNameUppercase:case Ae.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Ae.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Ae.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Ae.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Ae.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Ae.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Ae.MissingReturns:n(this.fixMissingReturns(e,r));break;case Ae.InvalidInfers:case Ae.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Ae.MissingInfer:n(this.fixMissingInfer(e,r));break;case Ae.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case mn.LinkingError:{let o=e.data;o&&o.containerType==="RuleCall"&&o.property==="rule"&&n(this.addNewRule(e,o,r)),o&&this.lookInGlobalScope(e,o,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n&&n.actionSegment){let i=r.textDocument.getText(n.actionSegment.range);return{title:`Correct ${i} usage`,kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionSegment.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n&&n.actionSegment)return{title:"Correct 'infer' usage",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.actionSegment.range.end,end:n.actionSegment.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){let n=e.data;if(n&&n.actionRange)return{title:"Remove the 'infer' keyword",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionRange,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let o=Rr(i,n),s=Ie(o?.astNode,Gl);if(s&&s.right&&s.$cstNode){let a=s.left.value,u=s.right.value;return{title:"Refactor into regular expression",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:s.$cstNode.range,newText:`/[${ri(a)}-${ri(u)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,o=[],s=Xt(n.$cstNode,"definesHiddenTokens");if(s){let a=s.range.start,u=s.offset,l=n.$cstNode.text.indexOf(")",u)+1;o.push({newText:"",range:{start:a,end:r.textDocument.positionAt(l)}})}for(let a of i){let u=a.ref;if(u&&Se(u)&&!u.hidden&&u.$cstNode){let l=u.$cstNode.range.start;o.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:o}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let s=Rr(o,i),a=Ie(s?.astNode,H);if(a&&a.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:a.$cstNode.range.end,end:a.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,o;let s={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},a=this.reflection.getReferenceType(s),u=this.indexManager.allElements(a).filter(m=>m.name===r.refText),l=[],c=-1,f=-1;for(let m of u){if(ve.equals(m.documentUri,n.uri))continue;let T=RN(n.uri,m.documentUri),w,A="",_=n.parseResult.value,C=_.imports.find(v=>v.path&&T<v.path);if(C)w=(i=C.$cstNode)===null||i===void 0?void 0:i.range.start;else if(_.imports.length>0){let v=_.imports[_.imports.length-1].$cstNode.range.end;v&&(w={line:v.line+1,character:0})}else _.rules.length>0&&(w=(o=_.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,A=`
`);w&&((c<0||T.length<f)&&(c=l.length,f=T.length),l.push({title:`Add import to '${T}'`,kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:w,end:w},newText:`import '${T}'
${A}`}]}}}))}return c>=0&&(l[c].isPreferred=!0),l}};function RN(t,e){let r=ve.dirname(t),n=ve.relative(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}var Sx=de(io(),1);var bs=de(we(),1);function uh(t,e){let r={stacks:t,tokens:e};return bN(r),r.stacks.flat().forEach(i=>{i.property=void 0}),bx(r.stacks).map(i=>i[i.length-1])}function lh(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,o=[],s=e.feature;if(n.has(s))return[];n.add(s);let a,u=s;for(;u.$container;)if(Mt(u.$container)){a=u.$container;break}else if(Qo(u.$container))u=u.$container;else break;if(ox(u.cardinality)){let l=xs({next:{feature:u,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let c of l)i.add(c.feature);o.push(...l)}if(a){let l=a.elements.indexOf(u);l!==void 0&&l<a.elements.length-1&&o.push(...Rx({feature:a,type:e.type,new:!1},l+1,r,n,i)),o.every(c=>Vr(c.feature.cardinality,c.feature)||Vr(r.get(c.feature))||i.has(c.feature))&&o.push(...lh({next:{feature:a,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return o}function au(t){return kt(t)&&(t={feature:t}),xs({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}function xs(t){var e,r,n;let{next:i,cardinalities:o,visited:s,plus:a}=t;if(i===void 0)return[];let{feature:u,type:l}=i;if(Mt(u)){if(s.has(u))return[];s.add(u)}if(Mt(u))return Rx(i,0,o,s,a).map(c=>hc(c,u.cardinality,o));if(Ir(u)||Pr(u))return u.elements.flatMap(c=>xs({next:{feature:c,new:!1,type:l},cardinalities:o,visited:s,plus:a})).map(c=>hc(c,u.cardinality,o));if(Re(u)){let c={feature:u.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:u.feature};return xs({next:c,cardinalities:o,visited:s,plus:a}).map(f=>hc(f,u.cardinality,o))}else{if(_e(u))return lh({next:{feature:u,new:!0,type:pn(u),property:(r=i.property)!==null&&r!==void 0?r:u.feature},cardinalities:o,visited:s,plus:a});if(Ne(u)&&H(u.rule.ref)){let c=u.rule.ref,f={feature:c.definition,new:!0,type:c.fragment?void 0:(n=ms(c))!==null&&n!==void 0?n:c.name,property:i.property};return xs({next:f,cardinalities:o,visited:s,plus:a}).map(m=>hc(m,u.cardinality,o))}else return[i]}}function hc(t,e,r){return r.set(t.feature,e),t}function Rx(t,e,r,n,i){var o;let s=[],a;for(;e<t.feature.elements.length&&(a={feature:t.feature.elements[e++],new:!1,type:t.type},s.push(...xs({next:a,cardinalities:r,visited:n,plus:i})),!!Vr((o=a.feature.cardinality)!==null&&o!==void 0?o:r.get(a.feature),a.feature)););return s}function bN(t){for(let e of t.tokens){let r=bx(t.stacks,e);t.stacks=r}}function bx(t,e){let r=[];for(let n of t)r.push(...wN(n,e));return r}function wN(t,e){let r=new Map,n=new Set(t.map(o=>o.feature).filter(SN)),i=[];for(;t.length>0;){let o=t.pop(),s=lh({next:o,cardinalities:r,plus:n,visited:new Set}).filter(a=>e?ch(a.feature,e):!0);for(let a of s)i.push([...t,a]);if(!s.every(a=>Vr(a.feature.cardinality,a.feature)||Vr(r.get(a.feature))))break}return i}function SN(t){if(t.cardinality==="+")return!0;let e=Ie(t,Re);return!!(e&&e.cardinality==="+")}function ch(t,e){if(dt(t))return t.value===e.image;if(Ne(t))return AN(t.rule.ref,e);if(zt(t)){let r=yc(t);if(r)return ch(r,e)}return!1}function AN(t,e){return H(t)?au(t.definition).some(n=>ch(n.feature,e)):Se(t)?Xr(t).test(e.image):!1}function wx(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}var Rs=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let n=[],i=this.buildContexts(e,r.position),o=(u,l)=>{let c=this.fillCompletionItem(u,l);c&&n.push(c)},s=u=>dt(u.feature)?u.feature.value:u.feature,a=[];for(let u of i)if(await Promise.all(ie(u.features).distinct(s).exclude(a).map(l=>this.completionFor(u,l,o))),a.push(...u.features),!this.continueCompletion(n))break;return bs.CompletionList.create(this.deduplicateItems(n),!0)}deduplicateItems(e){return ie(e).distinct(r=>`${r.kind}_${r.label}_${r.detail}`).toArray()}findFeaturesAt(e,r){let n=e.getText({start:bs.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let u=gc(this.grammar),l=au({feature:u.definition,new:!0,type:ms(u)});return o.length>0?(o.shift(),uh(l.map(c=>[c]),o)):l}let s=[...o].splice(i.tokenIndex);return uh([i.elementStack.map(u=>({feature:u}))],s)}*buildContexts(e,r){var n,i,o,s,a;let u=e.parseResult.value.$cstNode;if(!u)return;let l=e.textDocument,c=l.getText(),f=l.offsetAt(r),m={document:e,textDocument:l,offset:f,position:r},T=this.findDataTypeRuleStart(u,f);if(T){let[g,E]=T,D=(n=Rr(u,g))===null||n===void 0?void 0:n.astNode,X=this.findFeaturesAt(l,g);yield Object.assign(Object.assign({},m),{node:D,tokenOffset:g,tokenEndOffset:E,features:X})}let{nextTokenStart:w,nextTokenEnd:A,previousTokenStart:_,previousTokenEnd:C}=this.backtrackToAnyToken(c,f),v;if(_!==void 0&&C!==void 0&&C===f){v=(i=Rr(u,_))===null||i===void 0?void 0:i.astNode;let g=this.findFeaturesAt(l,_);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:_,tokenEndOffset:C,features:g})}if(v=(s=(o=Rr(u,w))===null||o===void 0?void 0:o.astNode)!==null&&s!==void 0?s:_===void 0||(a=Rr(u,_))===null||a===void 0?void 0:a.astNode,v){let g=this.findFeaturesAt(l,w);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:w,tokenEndOffset:A,features:g})}else{let g=gc(this.grammar),E=au(g.definition);yield Object.assign(Object.assign({},m),{tokenOffset:w,tokenEndOffset:A,features:E})}}findDataTypeRuleStart(e,r){var n,i;let o=It(e,r,this.grammarConfig.nameRegexp),s=!!(!((n=Ie(o?.grammarSource,H))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=Ie(o?.grammarSource,H))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,r){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:r,nextTokenEnd:r};let i;for(let o of n){if(o.startOffset>=r)return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=r)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}async completionForRule(e,r,n){if(H(r)){let i=au(r.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,r,n){if(dt(r.feature))return this.completionForKeyword(e,r.feature,n);if(zt(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=Ie(r.feature,Re),o=e.node;if(i&&o){if(r.type&&(r.new||o.$type!==r.type)&&(o={$type:r.type,$container:o,$containerProperty:r.property}),!e)return;let s={reference:{},container:o,property:i.feature};try{let a=this.scopeProvider.getScope(s),u=new Set;a.getAllElements().forEach(l=>{!u.has(l.name)&&this.filterCrossReference(l)&&(n(e,this.createReferenceCompletionItem(l)),u.add(l.name))})}catch(a){console.error(a)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:this.nodeKindProvider.getCompletionItemKind(e),detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n(e,{label:r.value,kind:bs.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r){var n,i;let o;if(typeof r.label=="string")o=r.label;else if("node"in r){let l=this.nameProvider.getName(r.node);if(!l)return;o=l}else if("nodeDescription"in r)o=r.nodeDescription.name;else return;let s;typeof((n=r.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=r.textEdit.newText:typeof r.insertText=="string"?s=r.insertText:s=o;let a=(i=r.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:r.additionalTextEdits,command:r.command,commitCharacters:r.commitCharacters,data:r.data,detail:r.detail,documentation:r.documentation,filterText:r.filterText,insertText:r.insertText,insertTextFormat:r.insertTextFormat,insertTextMode:r.insertTextMode,kind:r.kind,labelDetails:r.labelDetails,preselect:r.preselect,sortText:r.sortText,tags:r.tags,textEditText:r.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,r,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,r)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var Tc=class extends Rs{constructor(e){super(e),this.documents=()=>e.shared.workspace.LangiumDocuments}completionFor(e,r,n){let i=Ie(r.feature,Re);if(i?.feature==="path")this.completeImportPath(e,n);else return super.completionFor(e,r,n)}completeImportPath(e,r){let i=e.textDocument.getText().substring(e.tokenOffset,e.offset),o=this.getAllFiles(e.document),s={start:e.position,end:e.position};if(i.length>0){let a=i.substring(1);o=o.filter(c=>c.startsWith(a));let u=e.textDocument.positionAt(e.tokenOffset+1),l=e.textDocument.positionAt(e.tokenEndOffset-1);s={start:u,end:l}}for(let a of o){let u=i.length>0?"":'"',l=`${u}${a}${u}`;r(e,{label:a,textEdit:{newText:l,range:s},kind:Sx.CompletionItemKind.File,sortText:"0"})}}getAllFiles(e){let r=this.documents().all,n=e.uri.toString(),i=ve.dirname(e.uri).toString(),o=[];for(let s of r)if(!ve.equals(s.uri,n)){let a=s.uri.toString(),u=a.substring(0,a.length-ve.extname(s.uri).length),l=ve.relative(i,u);l.startsWith(".")||(l=`./${l}`),o.push(l)}return o}};var uu=de(we(),1);var ws=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=Qe(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,r),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let o of _T(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,uu.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,r,n){let i=r.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(r,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),uu.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,r){if(r===uu.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var vc=class extends ws{shouldProcessContent(e){return!H(e)}};var xc=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new fh(e,this.collector)}formatDocument(e,r){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,r.options):[]}isFormatRangeErrorFree(e,r){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(o=>{var s;return(s=o.line)!==null&&s!==void 0?s:Number.MAX_VALUE}),...n.parserErrors.map(o=>{var s;return(s=o.token.startLine)!==null&&s!==void 0?s:Number.MAX_VALUE}))>r.end.line:!0}formatDocumentRange(e,r){return this.isFormatRangeErrorFree(e,r.range)?this.doDocumentFormat(e,r.options,r.range):[]}formatDocumentOnType(e,r){let n={start:{character:0,line:r.position.line},end:r.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,r.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,o=(a,u,l)=>{var c,f;let m=this.nodeModeToKey(a,u),T=i.get(m),w=(c=l.options.priority)!==null&&c!==void 0?c:0,A=(f=T?.options.priority)!==null&&f!==void 0?f:0;(!T||A<=w)&&i.set(m,l)};this.collector=o,this.iterateAstFormatting(e,n);let s=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,s)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let o=n[n.length-1];if(o){let s=e.offsetAt(i.range.start),a=e.offsetAt(o.range.end);s<a&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=Qe(n).iterator(),o;do if(o=i.next(),!o.done){let s=o.value;this.insideRange(s.$cstNode.range,r)?this.format(s):i.prune()}while(!o.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let o={indentation:0,options:n,document:e.textDocument},s=[],u=this.iterateCstTree(e,o).iterator(),l,c;do if(c=u.next(),!c.done){let f=c.value,m=lo(f),T=this.nodeModeToKey(f,"prepend"),w=r.get(T);if(r.delete(T),w){let C=this.createTextEdit(l,f,w,o);for(let v of C)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}let A=this.nodeModeToKey(f,"append"),_=r.get(A);if(r.delete(A),_){let C=PT(f);if(C){let v=this.createTextEdit(f,C,_,o);for(let g of v)g&&this.insideRange(g.range,i)&&this.isNecessary(g,e.textDocument)&&s.push(g)}}if(!w&&f.hidden){let C=this.createHiddenTextEdits(l,f,void 0,o);for(let v of C)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}m&&(l=f)}while(!c.done);return s}createHiddenTextEdits(e,r,n,i){var o;let s=r.range.start.line;if(e&&e.range.end.line===s)return[];let a=[],u={start:{character:0,line:s},end:r.range.start},l=i.document.getText(u),c=this.findFittingMove(u,(o=n?.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(l,i),T=this.getIndentationCharacterCount(i,c)-f;if(T===0)return[];let w="";T>0&&(w=(i.options.insertSpaces?" ":"	").repeat(T));let A=r.text.split(`
`);A[0]=l+A[0];for(let _=0;_<A.length;_++){let C=s+_,v={character:0,line:C};if(T>0)a.push({newText:w,range:{start:v,end:v}});else{let g=A[_],E=0;for(;E<g.length;E++){let D=g.charAt(E);if(D!==" "&&D!=="	")break}a.push({newText:"",range:{start:v,end:{line:C,character:Math.min(E,Math.abs(T))}}})}}return a}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var o;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let s={start:(o=e?.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:r.range.start},a=this.findFittingMove(s,n.moves,i);if(!a)return[];let u=a.characters,l=a.lines,c=a.tabs,f=i.indentation;i.indentation+=c??0;let m=[];return u!==void 0?m.push(this.createSpaceTextEdit(s,u,n.options)):l!==void 0?m.push(this.createLineTextEdit(s,l,i,n.options)):c!==void 0&&m.push(this.createTabTextEdit(s,!!e,i)),lo(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;r=this.fitIntoOptions(r,o,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let o=e.end.line-e.start.line;r=this.fitIntoOptions(r,o,i);let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${a}`,range:e}}createTabTextEdit(e,r,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),s=r?1:0,a=Math.max(e.end.line-e.start.line,s);return{newText:`${`
`.repeat(a)}${o}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let o of r){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new Wr(i,o=>this.iterateCst(o,r)):Jo}iterateCst(e,r){if(!An(e))return Jo;let n=r.indentation;return new Nr(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(r.indentation=n,pr))}},fh=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new hn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new hn(r,this.collector)}property(e,r){let n=Xt(this.astNode.$cstNode,e,r);return new hn(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=$i(this.astNode.$cstNode,n);r.push(...i)}return new hn(r,this.collector)}keyword(e,r){let n=zr(this.astNode.$cstNode,e,r);return new hn(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=Rc(this.astNode.$cstNode,n);r.push(...i)}return new hn(r,this.collector)}cst(e){return new hn([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new hn([],this.collector);let o=n[0],s=i[0];if(o.offset>s.offset){let a=o;o=s,s=a}return new hn(DT(o,s),this.collector)}},hn=class t{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new t(this.nodes.slice(e,r),this.collector)}},ye;(function(t){function e(...c){return{options:{},moves:c.flatMap(f=>f.moves).sort(l)}}t.fit=e;function r(c){return i(0,c)}t.noSpace=r;function n(c){return i(1,c)}t.oneSpace=n;function i(c,f){return{options:f??{},moves:[{characters:c}]}}t.spaces=i;function o(c){return s(1,c)}t.newLine=o;function s(c,f){return{options:f??{},moves:[{lines:c}]}}t.newLines=s;function a(c){return{options:c??{},moves:[{tabs:1,lines:1}]}}t.indent=a;function u(c){return{options:c??{},moves:[{tabs:0}]}}t.noIndent=u;function l(c,f){var m,T,w,A,_,C;let v=(m=c.lines)!==null&&m!==void 0?m:0,g=(T=f.lines)!==null&&T!==void 0?T:0,E=(w=c.tabs)!==null&&w!==void 0?w:0,D=(A=f.tabs)!==null&&A!==void 0?A:0,X=(_=c.characters)!==null&&_!==void 0?_:0,ge=(C=f.characters)!==null&&C!==void 0?C:0;return v<g?-1:v>g?1:E<D?-1:E>D?1:X<ge?-1:X>ge?1:0}})(ye=ye||(ye={}));var bc=class extends xc{format(e){if(zt(e))this.getNodeFormatter(e).properties("type","terminal").surround(ye.noSpace());else if(H(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(ye.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(ye.oneSpace()):r.property("name").append(ye.noSpace()),r.properties("parameters").append(ye.noSpace()),r.keywords(",").append(ye.oneSpace()),r.keywords("<").append(ye.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(ye.noSpace()),r.interior(i,n).prepend(ye.indent()),n.prepend(ye.fit(ye.noSpace(),ye.newLine())),r.node(e).prepend(ye.noIndent())}else if(Se(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(ye.oneSpace()),r.keyword("returns").append(ye.oneSpace())),r.keywords("hidden","terminal","fragment").append(ye.oneSpace()),r.keyword(":").prepend(ye.noSpace()),r.keyword(";").prepend(ye.fit(ye.noSpace(),ye.newLine())),r.node(e).prepend(ye.noIndent())}else if(_e(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(ye.noSpace()),r.keywords(".","+=","=").surround(ye.noSpace()),r.keyword("}").prepend(ye.noSpace())}else if(es(e))this.getNodeFormatter(e).keywords("infer","infers").append(ye.oneSpace());else if(Re(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(ye.noSpace());else if(Ne(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(ye.noSpace()),r.keyword(",").append(ye.oneSpace()),r.properties("arguments").append(ye.noSpace())}Qo(e)&&this.getNodeFormatter(e).property("cardinality").prepend(ye.noSpace())}};var si=de(we(),1);var oe=de(we(),1);var mh={[oe.SemanticTokenTypes.class]:0,[oe.SemanticTokenTypes.comment]:1,[oe.SemanticTokenTypes.enum]:2,[oe.SemanticTokenTypes.enumMember]:3,[oe.SemanticTokenTypes.event]:4,[oe.SemanticTokenTypes.function]:5,[oe.SemanticTokenTypes.interface]:6,[oe.SemanticTokenTypes.keyword]:7,[oe.SemanticTokenTypes.macro]:8,[oe.SemanticTokenTypes.method]:9,[oe.SemanticTokenTypes.modifier]:10,[oe.SemanticTokenTypes.namespace]:11,[oe.SemanticTokenTypes.number]:12,[oe.SemanticTokenTypes.operator]:13,[oe.SemanticTokenTypes.parameter]:14,[oe.SemanticTokenTypes.property]:15,[oe.SemanticTokenTypes.regexp]:16,[oe.SemanticTokenTypes.string]:17,[oe.SemanticTokenTypes.struct]:18,[oe.SemanticTokenTypes.type]:19,[oe.SemanticTokenTypes.typeParameter]:20,[oe.SemanticTokenTypes.variable]:21},Ax={[oe.SemanticTokenModifiers.abstract]:1,[oe.SemanticTokenModifiers.async]:2,[oe.SemanticTokenModifiers.declaration]:4,[oe.SemanticTokenModifiers.defaultLibrary]:8,[oe.SemanticTokenModifiers.definition]:16,[oe.SemanticTokenModifiers.deprecated]:32,[oe.SemanticTokenModifiers.documentation]:64,[oe.SemanticTokenModifiers.modification]:128,[oe.SemanticTokenModifiers.readonly]:256,[oe.SemanticTokenModifiers.static]:512},Cx={legend:{tokenTypes:Object.keys(mh),tokenModifiers:Object.keys(Ax)},full:{delta:!0},range:!0},ph=class extends oe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,o){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}},wc=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=oe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new ph;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,o=Zn(i,{range:this.currentRange}).iterator(),s;do if(s=o.next(),!s.done){await Ze(n);let a=s.value;this.highlightElement(a,r)==="prune"&&o.prune()}while(!s.done)}highlightToken(e){var r;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!Fl(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let s=mh[i],a=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let c of o){let f=Ax[c];a|=f}}let u=n.start.line,l=n.end.line;if(u===l){let c=n.start.character,f=n.end.character-c;this.currentTokensBuilder.push(u,c,f,s,a)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let c=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(u,c,m-f,s,a)}else{let c=n.start,f=this.currentDocument.textDocument.offsetAt({line:u+1,character:0});this.currentTokensBuilder.push(c.line,c.character,f-c.character-1,s,a);for(let m=u+1;m<l;m++){let T=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-T-1,s,a)}this.currentTokensBuilder.push(l,0,n.end.character,s,a)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let o=Xt(e.node.$cstNode,e.property,e.index);o&&r.push(o)}else r.push(...$i(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of r)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:o,modifier:s}=e,a=[];if(typeof o=="number"){let u=zr(r.$cstNode,n,o);u&&a.push(u)}else a.push(...Rc(r.$cstNode,n));for(let u of a)this.highlightNode({node:u,type:i,modifier:s})}highlightNode(e){let{node:r,type:n,modifier:i}=e,o=r.range;this.highlightToken({range:o,type:n,modifier:i})}},dh;(function(t){function e(n,i){let o=new Map;Object.entries(mh).forEach(([u,l])=>o.set(l,u));let s=0,a=0;return r(n.data,5).map(u=>{s+=u[0],u[0]!==0&&(a=0),a+=u[1];let l=u[2];return{offset:i.textDocument.offsetAt({line:s,character:a}),tokenType:o.get(u[3]),tokenModifiers:u[4],text:i.textDocument.getText({start:{line:s,character:a},end:{line:s,character:a+l}})}})}t.decode=e;function r(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(dh=dh||(dh={}));var Sc=class extends wc{highlightElement(e,r){var n;Re(e)?r({node:e,property:"feature",type:si.SemanticTokenTypes.property}):_e(e)?e.feature&&r({node:e,property:"feature",type:si.SemanticTokenTypes.property}):rs(e)?r({node:e,property:"name",type:si.SemanticTokenTypes.type}):ir(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:si.SemanticTokenTypes.type}):YT(e)?r({node:e,property:"name",type:si.SemanticTokenTypes.parameter}):ts(e)?r({node:e,property:"parameter",type:si.SemanticTokenTypes.parameter}):Ne(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:si.SemanticTokenTypes.type}):Kl(e)&&r({node:e,property:"name",type:si.SemanticTokenTypes.property})}};var Ac=class extends as{getName(e){return Re(e)?e.feature:super.getName(e)}getNameNode(e){return Re(e)?Xt(e.$cstNode,"feature"):super.getNameNode(e)}};var Ss=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=As(e),n=e.astNode;if(r&&n){let i=n[r.feature];if(Yn(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(Yn(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||NT(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){let n=[];if(r.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return r.documentUri&&(i=i.filter(o=>ve.equals(o.sourceUri,r.documentUri))),n.push(...i),ie(n)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=ne(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:nr(r),local:!0}}}};var Cc=class extends Ss{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.astNode,n=As(e);if(n&&n.feature==="feature"){if(Re(r))return this.findAssignmentDeclaration(r);if(_e(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findReferences(e,r){var n;return Kl(e)?this.findReferencesToTypeAttribute(e,(n=r.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,r)}findReferencesToTypeAttribute(e,r){let n=[],i=Ie(e,br);if(i){if(r){let a=this.getReferenceToSelf(e);a&&n.push(a)}let o=Um(i,this,this.documents,this.nodeLocator),s=[];o.forEach(a=>{let u=this.findRulesWithReturnType(a);s.push(...u)}),s.forEach(a=>{let u=this.createReferencesToAttribute(a,e);n.push(...u)})}return ie(n)}createReferencesToAttribute(e,r){let n=[];if(H(e)){let i=ps(e.definition).find(o=>o.feature===r.name);if(i?.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:ne(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:nr(o),local:ve.equals(ne(i).uri,ne(r).uri)})}}else{if(e.feature===r.name){let o=Xt(e.$cstNode,"feature");o&&n.push({sourceUri:ne(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:nr(o),local:ve.equals(ne(e).uri,ne(r).uri)})}let i=Ie(e,H);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=Ie(e,H),i=eh(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&(br(n.returnType.ref)||Lt(n.returnType.ref))){let o=Va(n.returnType.ref);for(let s of o){let a=s.attributes.find(u=>u.name===e.feature);if(a)return a}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,o=Va(e.type.ref);for(let s of o){let a=s.attributes.find(u=>u.name===i);if(a)return a}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),s=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);(H(s)||_e(s))&&r.push(s)}),r}};var lu=de(we(),1);var kx=de(we(),1);var kc=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=It(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.astNode,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:kx.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(Yt.parse(e.item.uri)),n=r.parseResult.value,i=It(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.astNode,{includeDeclaration:!1});return this.getIncomingCalls(i.astNode,o)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(Yt.parse(e.item.uri)),n=r.parseResult.value,i=It(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.astNode)}};var $x=de(we(),1);var Cs=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=It(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[$x.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.astNode){let n=ne(r.astNode);if(r&&n)return{source:e,target:r,targetDocument:n}}}};var Ex=de(we(),1);var $c=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=It(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let s=ve.equals(ne(o).uri,e.uri),a={documentUri:e.uri,includeDeclaration:s};return this.references.findReferences(o,a).map(l=>this.createDocumentHighlight(l)).toArray()}}createDocumentHighlight(e){return Ex.DocumentHighlight.create(e.segment.range)}};var Ec=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let o=this.nameProvider.getName(r);return[{kind:this.nodeKindProvider.getSymbolKind(r),name:o??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of ki(r)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var CN=de(we(),1);var _c=class{match(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,o=0,s=r.length;for(let a=0;a<s;a++){let u=r.charCodeAt(a),l=e.charCodeAt(o);if((u===l||this.toUpperCharCode(u)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,u)),n&&o++,o===e.length))return!0;i=u}return!1}isWordTransition(e,r){return _x<=e&&e<=Nx&&kN<=r&&r<=$N||e===Ix&&r!==Ix}toUpperCharCode(e){return _x<=e&&e<=Nx?e-32:e}},_x="a".charCodeAt(0),Nx="z".charCodeAt(0),kN="A".charCodeAt(0),$N="Z".charCodeAt(0),Ix="_".charCodeAt(0);var hh=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(r.position),a=It(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let u=this.references.findDeclaration(a);if(u)return this.getAstNodeHoverContent(u)}}}},Nc=class extends hh{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};var EN=de(we(),1);var _N=de(we(),1);var Yr=de(we(),1);var Ge;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(Ge=Ge||(Ge={}));var Ic=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??Yt.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let o;if(n)o={parseResult:e,uri:r,state:Ge.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(r,i);o={parseResult:e,uri:r,state:Ge.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=Xo.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}},Pc=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return ie(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Ge.Changed,n.precomputedScopes=void 0,n.references=[],n.diagnostics=void 0),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Ge.Changed,this.documentMap.delete(r)),n}};var NN=de(we(),1);function Px(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}var Dc=class{constructor(e){this.onInitializeEmitter=new Yr.Emitter,this.onInitializedEmitter=new Yr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){Ul(this.services),this.services.ServiceRegistry.all.forEach(e=>Ul(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(S=>S.lsp.Formatter),o=n.map(S=>{var q;return(q=S.lsp.Formatter)===null||q===void 0?void 0:q.formatOnTypeOptions}).find(S=>!!S),s=this.hasService(S=>S.lsp.CodeActionProvider),a=this.hasService(S=>S.lsp.SemanticTokenProvider),u=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.hasService(S=>S.lsp.DocumentLinkProvider),c=Px(n.map(S=>{var q;return(q=S.lsp.SignatureHelp)===null||q===void 0?void 0:q.signatureHelpOptions})),f=this.hasService(S=>S.lsp.TypeProvider),m=this.hasService(S=>S.lsp.ImplementationProvider),T=this.hasService(S=>S.lsp.CompletionProvider),w=wx(n.map(S=>{var q;return(q=S.lsp.CompletionProvider)===null||q===void 0?void 0:q.completionOptions})),A=this.hasService(S=>S.lsp.ReferencesProvider),_=this.hasService(S=>S.lsp.DocumentSymbolProvider),C=this.hasService(S=>S.lsp.DefinitionProvider),v=this.hasService(S=>S.lsp.DocumentHighlightProvider),g=this.hasService(S=>S.lsp.FoldingRangeProvider),E=this.hasService(S=>S.lsp.HoverProvider),D=this.hasService(S=>S.lsp.RenameProvider),X=this.hasService(S=>S.lsp.CallHierarchyProvider),ge=this.hasService(S=>S.lsp.CodeLensProvider),$e=this.hasService(S=>S.lsp.DeclarationProvider),Gt=this.hasService(S=>S.lsp.InlayHintProvider),vt=this.services.lsp.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:u&&{commands:u},textDocumentSync:Yr.TextDocumentSyncKind.Incremental,completionProvider:T?w:void 0,referencesProvider:A,documentSymbolProvider:_,definitionProvider:C,typeDefinitionProvider:f,documentHighlightProvider:v,codeActionProvider:s,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:g,hoverProvider:E,renameProvider:D?{prepareProvider:!0}:void 0,semanticTokensProvider:a?Cx:void 0,signatureHelpProvider:c,implementationProvider:m,callHierarchyProvider:X?{}:void 0,documentLinkProvider:l?{resolveProvider:!1}:void 0,codeLensProvider:ge?{resolveProvider:!1}:void 0,declarationProvider:$e,inlayHintProvider:Gt?{resolveProvider:!1}:void 0,workspaceSymbolProvider:vt?{resolveProvider:!!vt.resolveSymbol}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};function Ox(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");IN(e,t),PN(e,t),DN(e,t),ON(e,t),MN(e,t),FN(e,t),UN(e,t),qN(e,t),GN(e,t),HN(e,t),WN(e,t),LN(e,t),BN(e,t),jN(e,t),zN(e,t),VN(e,t),YN(e,t),QN(e,t),tI(e,t),ZN(e,t),JN(e,t),XN(e,t),KN(e,t),eI(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}function IN(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(s,a){n.lock(u=>r.update(s,a,u))}e.workspace.TextDocuments.onDidChangeContent(s=>{i([Yt.parse(s.document.uri)],[])}),t.onDidChangeWatchedFiles(s=>{let a=[],u=[];for(let l of s.changes){let c=Yt.parse(l.uri);l.type===Yr.FileChangeType.Deleted?u.push(c):a.push(c)}i(a,u)})}function PN(t,e){e.workspace.DocumentBuilder.onBuildPhase(Ge.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&t.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}function DN(t,e){t.onCompletion(sr((r,n,i,o)=>{var s;return(s=r.lsp.CompletionProvider)===null||s===void 0?void 0:s.getCompletion(n,i,o)},e))}function ON(t,e){t.onReferences(sr((r,n,i,o)=>{var s;return(s=r.lsp.ReferencesProvider)===null||s===void 0?void 0:s.findReferences(n,i,o)},e))}function LN(t,e){t.onCodeAction(sr((r,n,i,o)=>{var s;return(s=r.lsp.CodeActionProvider)===null||s===void 0?void 0:s.getCodeActions(n,i,o)},e))}function MN(t,e){t.onDocumentSymbol(sr((r,n,i,o)=>{var s;return(s=r.lsp.DocumentSymbolProvider)===null||s===void 0?void 0:s.getSymbols(n,i,o)},e))}function FN(t,e){t.onDefinition(sr((r,n,i,o)=>{var s;return(s=r.lsp.DefinitionProvider)===null||s===void 0?void 0:s.getDefinition(n,i,o)},e))}function UN(t,e){t.onTypeDefinition(sr((r,n,i,o)=>{var s;return(s=r.lsp.TypeProvider)===null||s===void 0?void 0:s.getTypeDefinition(n,i,o)},e))}function qN(t,e){t.onImplementation(sr((r,n,i,o)=>{var s;return(s=r.lsp.ImplementationProvider)===null||s===void 0?void 0:s.getImplementation(n,i,o)},e))}function KN(t,e){t.onDeclaration(sr((r,n,i,o)=>{var s;return(s=r.lsp.DeclarationProvider)===null||s===void 0?void 0:s.getDeclaration(n,i,o)},e))}function GN(t,e){t.onDocumentHighlight(sr((r,n,i,o)=>{var s;return(s=r.lsp.DocumentHighlightProvider)===null||s===void 0?void 0:s.getDocumentHighlight(n,i,o)},e))}function jN(t,e){t.onHover(sr((r,n,i,o)=>{var s;return(s=r.lsp.HoverProvider)===null||s===void 0?void 0:s.getHoverContent(n,i,o)},e))}function HN(t,e){t.onFoldingRanges(sr((r,n,i,o)=>{var s;return(s=r.lsp.FoldingRangeProvider)===null||s===void 0?void 0:s.getFoldingRanges(n,i,o)},e))}function WN(t,e){t.onDocumentFormatting(sr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocument(n,i,o)},e)),t.onDocumentRangeFormatting(sr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentRange(n,i,o)},e)),t.onDocumentOnTypeFormatting(sr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentOnType(n,i,o)},e))}function BN(t,e){t.onRenameRequest(sr((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.rename(n,i,o)},e)),t.onPrepareRename(sr((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.prepareRename(n,i,o)},e))}function zN(t,e){t.languages.inlayHint.on(Ni((r,n,i,o)=>{var s;return(s=r.lsp.InlayHintProvider)===null||s===void 0?void 0:s.getInlayHints(n,i,o)},e))}function VN(t,e){let r={data:[]};t.languages.semanticTokens.on(Ni((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):r,e)),t.languages.semanticTokens.onDelta(Ni((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):r,e)),t.languages.semanticTokens.onRange(Ni((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):r,e))}function XN(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}function YN(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var o;try{return await r.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return ks(s)}})}function JN(t,e){t.onDocumentLinks(Ni((r,n,i,o)=>{var s;return(s=r.lsp.DocumentLinkProvider)===null||s===void 0?void 0:s.getDocumentLinks(n,i,o)},e))}function QN(t,e){t.onSignatureHelp(Ni((r,n,i,o)=>{var s;return(s=r.lsp.SignatureHelp)===null||s===void 0?void 0:s.provideSignatureHelp(n,i,o)},e))}function ZN(t,e){t.onCodeLens(Ni((r,n,i,o)=>{var s;return(s=r.lsp.CodeLensProvider)===null||s===void 0?void 0:s.provideCodeLens(n,i,o)},e))}function eI(t,e){var r;let n=e.lsp.WorkspaceSymbolProvider;if(n){t.onWorkspaceSymbol(async(o,s)=>{try{return await n.getSymbols(o,s)}catch(a){return ks(a)}});let i=(r=n.resolveSymbol)===null||r===void 0?void 0:r.bind(n);i&&t.onWorkspaceSymbolResolve(async(o,s)=>{try{return await i(o,s)}catch(a){return ks(a)}})}}function tI(t,e){t.languages.callHierarchy.onPrepare(Ni((r,n,i,o)=>{var s;return r.lsp.CallHierarchyProvider&&(s=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&s!==void 0?s:null},e)),t.languages.callHierarchy.onIncomingCalls(Dx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onOutgoingCalls(Dx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}function Dx(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let o=Yt.parse(n.item.uri),s=r.getServices(o);if(!s){let a=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(a),new Error(a)}try{return await t(s,n,i)}catch(a){return ks(a)}}}function Ni(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Yt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)throw console.error(`Could not find service instance for uri: '${s.toString()}'`),new Error;let u=r.getOrCreateDocument(s);if(!u)throw new Error;try{return await t(a,u,i,o)}catch(l){return ks(l)}}}function sr(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Yt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)return console.error(`Could not find service instance for uri: '${s.toString()}'`),null;let u=r.getOrCreateDocument(s);if(!u)return null;try{return await t(a,u,i,o)}catch(l){return ks(l)}}}function ks(t){if(To(t))return new Yr.ResponseError(Yr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Yr.ResponseError)return t;throw t}var Lc=de(we(),1),Oc=class{getSymbolKind(){return Lc.SymbolKind.Field}getCompletionItemKind(){return Lc.CompletionItemKind.Reference}};var Lx=de(we(),1);var Mc=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=It(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(Lx.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};var Mx=de(we(),1);var Fc=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(r.position),s=It(i,o,this.grammarConfig.nameRegexp);if(!s)return;let a=this.references.findDeclaration(s);if(!a)return;let u={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,u).forEach(c=>{let f=Mx.TextEdit.replace(c.segment.range,r.newName),m=c.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let o=It(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&Xa(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var rI=de(we(),1);var Fx=de(we(),1);var Uc=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,r=Fx.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await Ze(r),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let r=e.nameSegment;if(r)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:r.range,uri:e.documentUri.toString()}}}};var qc=class extends Cs{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,o,s,a,u;let l="path";if(ql(e.astNode)&&((n=As(e))===null||n===void 0?void 0:n.feature)===l){let c=ii(this.documents,e.astNode);if(c?.$document){let f=(i=this.findTargetObject(c))!==null&&i!==void 0?i:c,m=(s=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&s!==void 0?s:lu.Range.create(0,0,0,0),T=(u=(a=f.$cstNode)===null||a===void 0?void 0:a.range)!==null&&u!==void 0?u:lu.Range.create(0,0,0,0);return[lu.LocationLink.create(c.$document.uri.toString(),T,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:ki(e).head()}};var yh=de(we(),1);var Kc=class extends kc{getIncomingCalls(e,r){if(!H(e))return;let n=new Map;if(r.forEach(i=>{let s=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!s.$cstNode)return;let a=Rr(s.$cstNode,i.segment.offset);if(!a)return;let u=Ie(a.astNode,H);if(!u||!u.$cstNode)return;let l=this.nameProvider.getNameNode(u);if(!l)return;let c=i.sourceUri.toString(),f=c+"@"+l.text;n.has(f)?n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,a],docUri:c}):n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[a],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:yh.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!H(e))return;let r=Qe(e).filter(Ne).toArray(),n=new Map;if(r.forEach(i=>{var o;let s=i.$cstNode;if(!s)return;let a=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!a)return;let u=this.nameProvider.getNameNode(a.astNode);if(!u)return;let l=ne(a.astNode).uri.toString(),c=l+"@"+u.text;n.has(c)?n.set(c,{refCstNode:a,to:u,from:[...n.get(c).from,s.range],docUri:l}):n.set(c,{refCstNode:a,to:u,from:[s.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:yh.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};var Gc=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=gx(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,o=nI(e);for(let a of Ql(r))i.set(a.name,{inferred:a,inferredNodes:o.get(a.name)});let s=ie(e.interfaces).concat(e.types).reduce((a,u)=>a.set(u.name,u),new Map);for(let a of Ql(n)){let u=s.get(a.name);if(u){let l=i.get(a.name);i.set(a.name,Object.assign(Object.assign({},l??{}),{declared:a,declaredNode:u}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=qm(e,r),o=new Map(i.map(s=>[s.name,s]));for(let s of qm(e,r))n.set(s.name,this.addSuperProperties(s,o,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let s=r.get(o.name);s&&i.push(...this.addSuperProperties(s,r,n))}return i}};function nI({parserRules:t,datatypeRules:e}){let r=new Le;ie(t).concat(e).forEach(i=>r.add(xo(i),i));function n(i){if(_e(i)){let o=hs(i);o&&r.add(o,i)}(Ir(i)||Mt(i)||Pr(i))&&i.elements.forEach(o=>n(o))}return t.forEach(i=>n(i.definition)),r}function Ux(t){return t&&"declared"in t}function qx(t){return t&&"inferred"in t}function Kx(t){return t&&"inferred"in t&&"declared"in t}function jx(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency],Interface:[r.checkCyclicInterface],Type:[r.checkCyclicType]};e.register(n,r)}var jc=class{checkCyclicType(e,r){Ii(e,new Set)&&r("error",`Type alias '${e.name}' circularly references itself.`,{node:e,property:"name"})}checkCyclicInterface(e,r){Ii(e,new Set)&&r("error",`Type '${e.name}' recursively references itself as a base type.`,{node:e,property:"name"})}checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if(Ux(o)&&dn(o.declared)&&br(o.declaredNode)){let s=o;oI(s,r),sI(s,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())qx(o)&&o.inferred instanceof ss&&iI(o.inferred,r),Kx(o)&&lI(o,i,r)}checkActionIsNotUnionType(e,r){Lt(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};function Ii(t,e){var r;if(e.has(t))return!0;if(e.add(t),Lt(t))return Ii(t.type,e);if(br(t))return t.superTypes.some(n=>n.ref&&Ii(n.ref,new Set(e)));if(ir(t)){if(!((r=t.typeRef)===null||r===void 0)&&r.ref)return Ii(t.typeRef.ref,e)}else{if(mo(t))return Ii(t.referenceType,e);if(po(t))return Ii(t.elementType,e);if(Br(t))return t.types.some(n=>Ii(n,new Set(e)))}return!1}function iI(t,e){t.properties.forEach(r=>{var n;let i=Mm(r.type);if(i.length>1){let o=a=>ei(a)?"ref":"other",s=o(i[0]);if(i.slice(1).some(a=>o(a)!==s)){let a=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}}})}function oI({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&(cn(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function sI({declared:t,declaredNode:e},r){let n=t.properties.reduce((s,a)=>s.add(a.name,a),new Le);for(let[s,a]of n.entriesGroupedByKey())if(a.length>1)for(let u of a)r("error",`Cannot have two properties with the same name '${s}'.`,{node:Array.from(u.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let s=0;s<i.length;s++)for(let a=s+1;a<i.length;a++){let u=i[s],l=i[a],c=dn(u)?u.superProperties:[],f=dn(l)?l.superProperties:[],m=aI(c,f);m.length>0&&r("error",`Cannot simultaneously inherit from '${u}' and '${l}'. Their ${m.map(T=>"'"+T+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let s of i){let a=dn(s)?s.superProperties:[];for(let u of a)o.add(u.name)}for(let s of t.properties)if(o.has(s.name)){let a=e.attributes.find(u=>u.name===s.name);a&&r("error",`Cannot redeclare property '${s.name}'. It is already inherited from another interface.`,{node:a,property:"name"})}}function aI(t,e){let r=[];for(let n of t){let i=e.find(o=>o.name===n.name);i&&!uI(n,i)&&r.push(n.name)}return r}function uI(t,e){return za(t.type,e.type)&&za(e.type,t.type)}function lI(t,e,r){let{inferred:n,declared:i,declaredNode:o,inferredNodes:s}=t,a=i.name,u=f=>m=>s.forEach(T=>r("error",`${m}${f?` ${f}`:""}.`,T?.inferredType?{node:T?.inferredType,property:"name"}:{node:T,property:_e(T)?"type":"name"})),l=(f,m)=>f.forEach(T=>r("error",m,{node:T,property:Re(T)||_e(T)?"feature":"name"})),c=f=>{s.forEach(m=>{H(m)&&ps(m.definition).find(w=>w.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${a}'.`,{node:m,property:"parameters"})})};if(cn(n)&&cn(i))cI(n.type,i.type,u(`in a rule that returns type '${a}'`));else if(dn(n)&&dn(i))fI(n,i,e,u(`in a rule that returns type '${a}'`),l,c);else{let f=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;u()(f),r("error",f,{node:o,property:"name"})}}function cI(t,e,r){za(t,e)||r(`Cannot assign type '${fn(t,"DeclaredType")}' to '${fn(e,"DeclaredType")}'`)}function Gx(t){return t.optional||Yl(t.type)}function fI(t,e,r,n,i,o){let s=new Set(t.properties.map(f=>f.name)),a=new Map(t.allProperties.map(f=>[f.name,f])),u=new Map(e.superProperties.map(f=>[f.name,f])),l=f=>{if(Pt(f))return{types:f.types.map(m=>l(m))};if(ei(f))return{referenceType:l(f.referenceType)};if(ti(f))return{elementType:l(f.elementType)};if(Dr(f)){let m=r.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of a.entries()){let T=u.get(f);if(T){let w=fn(m.type,"DeclaredType"),A=fn(T.type,"DeclaredType");if(!za(l(m.type),T.type)&&A!=="unknown"){let C=`The assigned type '${w}' is not compatible with the declared property '${f}' of type '${A}'.`;i(m.astNodes,C)}m.optional&&!Gx(T)&&o(f)}else s.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let c=new Set;for(let[f,m]of u.entries())!a.get(f)&&!Gx(m)&&c.add(f);if(c.size>0){let f=c.size>1?"Properties":"A property",m=c.size>1?"are expected":"is expected",T=Array.from(c).map(w=>`'${w}'`).sort().join(", ");n(`${f} ${T} ${m}.`)}}var dI={validation:{LangiumGrammarValidator:t=>new sc(t),ValidationResourcesCollector:t=>new Gc(t),LangiumGrammarTypesValidator:()=>new jc},lsp:{FoldingRangeProvider:t=>new vc(t),CodeActionProvider:t=>new mc(t),SemanticTokenProvider:t=>new Sc(t),Formatter:()=>new bc,DefinitionProvider:t=>new qc(t),CallHierarchyProvider:t=>new Kc(t),CompletionProvider:t=>new Tc(t)},references:{ScopeComputation:t=>new dc(t),ScopeProvider:t=>new fc(t),References:t=>new Cc(t),NameProvider:()=>new Ac}};function Hx(t,e){let r=co(fu(t),Tx,e),n=co(cu({shared:r}),vx,dI);return pI(r,n),r.ServiceRegistry.register(n),tx(n),jx(n),{shared:r,grammar:n}}function pI(t,e){t.workspace.DocumentBuilder.onBuildPhase(Ge.IndexedReferences,async(n,i)=>{for(let o of n){await Ze(i);let s=e.validation.ValidationResourcesCollector,a=o.parseResult.value;o.validationResources=s.collectValidationResources(a)}})}var gh=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}},Hc={fileSystemProvider:()=>new gh};function gc(t){return t.rules.find(e=>H(e)&&e.entry)}function mI(t){return t.rules.filter(e=>Se(e)&&e.hidden)}function ds(t,e){let r=new Set,n=gc(t);if(!n)return new Set(t.rules);let i=[n].concat(mI(t));for(let s of i)Wx(s,r,e);let o=new Set;for(let s of t.rules)(r.has(s.name)||Se(s)&&s.hidden)&&o.add(s);return o}function Wx(t,e,r){e.add(t.name),Qe(t).forEach(n=>{if(Ne(n)||r&&jl(n)){let i=n.rule.ref;i&&!e.has(i.name)&&Wx(i,e,r)}})}function yc(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=iu(t.type.ref);return e?.terminal}}function Bx(t){return t.hidden&&!Xr(t).test(" ")}function $i(t,e){return!t||!e?[]:Th(t,e,t.astNode,!0)}function Xt(t,e,r){if(!t||!e)return;let n=Th(t,e,t.astNode,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function Th(t,e,r,n){if(!n){let i=Ie(t.grammarSource,Re);if(i&&i.feature===e)return[t]}return An(t)&&t.astNode===r?t.content.flatMap(i=>Th(i,e,r,!1)):[]}function Rc(t,e){return t?zx(t,e,t?.astNode):[]}function zr(t,e,r){if(!t)return;let n=zx(t,e,t?.astNode);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function zx(t,e,r){if(t.astNode!==r)return[];if(dt(t.grammarSource)&&t.grammarSource.value===e)return[t];let n=wm(t).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===r?dt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function As(t){var e;let r=t.astNode;for(;r===((e=t.container)===null||e===void 0?void 0:e.astNode);){let n=Ie(t.grammarSource,Re);if(n)return n;t=t.container}}function iu(t){return es(t)&&(t=t.$container),Vx(t,new Map)}function Vx(t,e){var r;function n(i,o){let s;return Ie(i,Re)||(s=Vx(o,e)),e.set(t,s),s}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of Qe(t)){if(Re(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(Ne(i)&&H(i.rule.ref))return n(i,i.rule.ref);if(ir(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function rc(t){var e;let r=Hx(Hc).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,Yt.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}function Xx(t){let e=[],r=t.Grammar;for(let n of r.rules)Se(n)&&Bx(n)&&Wv(Xr(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:Sm}}var hI=typeof global=="object"&&global&&global.Object===Object&&global,Wc=hI;var yI=typeof self=="object"&&self&&self.Object===Object&&self,gI=Wc||yI||Function("return this")(),$t=gI;var TI=$t.Symbol,Ft=TI;var Yx=Object.prototype,vI=Yx.hasOwnProperty,xI=Yx.toString,du=Ft?Ft.toStringTag:void 0;function RI(t){var e=vI.call(t,du),r=t[du];try{t[du]=void 0;var n=!0}catch{}var i=xI.call(t);return n&&(e?t[du]=r:delete t[du]),i}var Jx=RI;var bI=Object.prototype,wI=bI.toString;function SI(t){return wI.call(t)}var Qx=SI;var AI="[object Null]",CI="[object Undefined]",Zx=Ft?Ft.toStringTag:void 0;function kI(t){return t==null?t===void 0?CI:AI:Zx&&Zx in Object(t)?Jx(t):Qx(t)}var mr=kI;function $I(t){return t!=null&&typeof t=="object"}var yt=$I;var EI="[object Symbol]";function _I(t){return typeof t=="symbol"||yt(t)&&mr(t)==EI}var En=_I;function NI(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var _n=NI;var II=Array.isArray,z=II;var PI=1/0,eR=Ft?Ft.prototype:void 0,tR=eR?eR.toString:void 0;function rR(t){if(typeof t=="string")return t;if(z(t))return _n(t,rR)+"";if(En(t))return tR?tR.call(t):"";var e=t+"";return e=="0"&&1/t==-PI?"-0":e}var nR=rR;var DI=/\s/;function OI(t){for(var e=t.length;e--&&DI.test(t.charAt(e)););return e}var iR=OI;var LI=/^\s+/;function MI(t){return t&&t.slice(0,iR(t)+1).replace(LI,"")}var oR=MI;function FI(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var st=FI;var sR=0/0,UI=/^[-+]0x[0-9a-f]+$/i,qI=/^0b[01]+$/i,KI=/^0o[0-7]+$/i,GI=parseInt;function jI(t){if(typeof t=="number")return t;if(En(t))return sR;if(st(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=st(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=oR(t);var r=qI.test(t);return r||KI.test(t)?GI(t.slice(2),r?2:8):UI.test(t)?sR:+t}var aR=jI;var uR=1/0,HI=17976931348623157e292;function WI(t){if(!t)return t===0?t:0;if(t=aR(t),t===uR||t===-uR){var e=t<0?-1:1;return e*HI}return t===t?t:0}var lR=WI;function BI(t){var e=lR(t),r=e%1;return e===e?r?e-r:e:0}var Nn=BI;function zI(t){return t}var wr=zI;var VI="[object AsyncFunction]",XI="[object Function]",YI="[object GeneratorFunction]",JI="[object Proxy]";function QI(t){if(!st(t))return!1;var e=mr(t);return e==XI||e==YI||e==VI||e==JI}var hr=QI;var ZI=$t["__core-js_shared__"],Bc=ZI;var cR=function(){var t=/[^.]+$/.exec(Bc&&Bc.keys&&Bc.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function eP(t){return!!cR&&cR in t}var fR=eP;var tP=Function.prototype,rP=tP.toString;function nP(t){if(t!=null){try{return rP.call(t)}catch{}try{return t+""}catch{}}return""}var ai=nP;var iP=/[\\^$.*+?()[\]{}|]/g,oP=/^\[object .+?Constructor\]$/,sP=Function.prototype,aP=Object.prototype,uP=sP.toString,lP=aP.hasOwnProperty,cP=RegExp("^"+uP.call(lP).replace(iP,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function fP(t){if(!st(t)||fR(t))return!1;var e=hr(t)?cP:oP;return e.test(ai(t))}var dR=fP;function dP(t,e){return t?.[e]}var pR=dP;function pP(t,e){var r=pR(t,e);return dR(r)?r:void 0}var Sr=pP;var mP=Sr($t,"WeakMap"),zc=mP;var mR=Object.create,hP=function(){function t(){}return function(e){if(!st(e))return{};if(mR)return mR(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),hR=hP;function yP(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var yR=yP;function gP(){}var at=gP;function TP(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var gR=TP;var vP=800,xP=16,RP=Date.now;function bP(t){var e=0,r=0;return function(){var n=RP(),i=xP-(n-r);if(r=n,i>0){if(++e>=vP)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var TR=bP;function wP(t){return function(){return t}}var vR=wP;var SP=function(){try{var t=Sr(Object,"defineProperty");return t({},"",{}),t}catch{}}(),$s=SP;var AP=$s?function(t,e){return $s(t,"toString",{configurable:!0,enumerable:!1,value:vR(e),writable:!0})}:wr,xR=AP;var CP=TR(xR),RR=CP;function kP(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var Vc=kP;function $P(t,e,r,n){for(var i=t.length,o=r+(n?1:-1);n?o--:++o<i;)if(e(t[o],o,t))return o;return-1}var Xc=$P;function EP(t){return t!==t}var bR=EP;function _P(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var wR=_P;function NP(t,e,r){return e===e?wR(t,e,r):Xc(t,bR,r)}var Es=NP;function IP(t,e){var r=t==null?0:t.length;return!!r&&Es(t,e,0)>-1}var Yc=IP;var PP=9007199254740991,DP=/^(?:0|[1-9]\d*)$/;function OP(t,e){var r=typeof t;return e=e??PP,!!e&&(r=="number"||r!="symbol"&&DP.test(t))&&t>-1&&t%1==0&&t<e}var Pi=OP;function LP(t,e,r){e=="__proto__"&&$s?$s(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var _s=LP;function MP(t,e){return t===e||t!==t&&e!==e}var In=MP;var FP=Object.prototype,UP=FP.hasOwnProperty;function qP(t,e,r){var n=t[e];(!(UP.call(t,e)&&In(n,r))||r===void 0&&!(e in t))&&_s(t,e,r)}var Di=qP;function KP(t,e,r,n){var i=!r;r||(r={});for(var o=-1,s=e.length;++o<s;){var a=e[o],u=n?n(r[a],t[a],a,r,t):void 0;u===void 0&&(u=t[a]),i?_s(r,a,u):Di(r,a,u)}return r}var Pn=KP;var SR=Math.max;function GP(t,e,r){return e=SR(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,o=SR(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=r(s),yR(t,this,a)}}var AR=GP;function jP(t,e){return RR(AR(t,e,wr),t+"")}var Ns=jP;var HP=9007199254740991;function WP(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=HP}var Is=WP;function BP(t){return t!=null&&Is(t.length)&&!hr(t)}var Et=BP;function zP(t,e,r){if(!st(r))return!1;var n=typeof e;return(n=="number"?Et(r)&&Pi(e,r.length):n=="string"&&e in r)?In(r[e],t):!1}var Oi=zP;function VP(t){return Ns(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,s=i>2?r[2]:void 0;for(o=t.length>3&&typeof o=="function"?(i--,o):void 0,s&&Oi(r[0],r[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=r[n];a&&t(e,a,n,o)}return e})}var CR=VP;var XP=Object.prototype;function YP(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||XP;return t===r}var Dn=YP;function JP(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var kR=JP;var QP="[object Arguments]";function ZP(t){return yt(t)&&mr(t)==QP}var vh=ZP;var $R=Object.prototype,eD=$R.hasOwnProperty,tD=$R.propertyIsEnumerable,rD=vh(function(){return arguments}())?vh:function(t){return yt(t)&&eD.call(t,"callee")&&!tD.call(t,"callee")},Li=rD;function nD(){return!1}var ER=nD;var IR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,_R=IR&&typeof module=="object"&&module&&!module.nodeType&&module,iD=_R&&_R.exports===IR,NR=iD?$t.Buffer:void 0,oD=NR?NR.isBuffer:void 0,sD=oD||ER,ui=sD;var aD="[object Arguments]",uD="[object Array]",lD="[object Boolean]",cD="[object Date]",fD="[object Error]",dD="[object Function]",pD="[object Map]",mD="[object Number]",hD="[object Object]",yD="[object RegExp]",gD="[object Set]",TD="[object String]",vD="[object WeakMap]",xD="[object ArrayBuffer]",RD="[object DataView]",bD="[object Float32Array]",wD="[object Float64Array]",SD="[object Int8Array]",AD="[object Int16Array]",CD="[object Int32Array]",kD="[object Uint8Array]",$D="[object Uint8ClampedArray]",ED="[object Uint16Array]",_D="[object Uint32Array]",Ye={};Ye[bD]=Ye[wD]=Ye[SD]=Ye[AD]=Ye[CD]=Ye[kD]=Ye[$D]=Ye[ED]=Ye[_D]=!0;Ye[aD]=Ye[uD]=Ye[xD]=Ye[lD]=Ye[RD]=Ye[cD]=Ye[fD]=Ye[dD]=Ye[pD]=Ye[mD]=Ye[hD]=Ye[yD]=Ye[gD]=Ye[TD]=Ye[vD]=!1;function ND(t){return yt(t)&&Is(t.length)&&!!Ye[mr(t)]}var PR=ND;function ID(t){return function(e){return t(e)}}var On=ID;var DR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,pu=DR&&typeof module=="object"&&module&&!module.nodeType&&module,PD=pu&&pu.exports===DR,xh=PD&&Wc.process,DD=function(){try{var t=pu&&pu.require&&pu.require("util").types;return t||xh&&xh.binding&&xh.binding("util")}catch{}}(),Jr=DD;var OR=Jr&&Jr.isTypedArray,OD=OR?On(OR):PR,Ps=OD;var LD=Object.prototype,MD=LD.hasOwnProperty;function FD(t,e){var r=z(t),n=!r&&Li(t),i=!r&&!n&&ui(t),o=!r&&!n&&!i&&Ps(t),s=r||n||i||o,a=s?kR(t.length,String):[],u=a.length;for(var l in t)(e||MD.call(t,l))&&!(s&&(l=="length"||i&&(l=="offset"||l=="parent")||o&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||Pi(l,u)))&&a.push(l);return a}var Jc=FD;function UD(t,e){return function(r){return t(e(r))}}var Qc=UD;var qD=Qc(Object.keys,Object),LR=qD;var KD=Object.prototype,GD=KD.hasOwnProperty;function jD(t){if(!Dn(t))return LR(t);var e=[];for(var r in Object(t))GD.call(t,r)&&r!="constructor"&&e.push(r);return e}var Zc=jD;function HD(t){return Et(t)?Jc(t):Zc(t)}var je=HD;var WD=Object.prototype,BD=WD.hasOwnProperty,zD=CR(function(t,e){if(Dn(e)||Et(e)){Pn(e,je(e),t);return}for(var r in e)BD.call(e,r)&&Di(t,r,e[r])}),Jt=zD;function VD(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var MR=VD;var XD=Object.prototype,YD=XD.hasOwnProperty;function JD(t){if(!st(t))return MR(t);var e=Dn(t),r=[];for(var n in t)n=="constructor"&&(e||!YD.call(t,n))||r.push(n);return r}var FR=JD;function QD(t){return Et(t)?Jc(t,!0):FR(t)}var Mi=QD;var ZD=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,eO=/^\w*$/;function tO(t,e){if(z(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||En(t)?!0:eO.test(t)||!ZD.test(t)||e!=null&&t in Object(e)}var Ds=tO;var rO=Sr(Object,"create"),li=rO;function nO(){this.__data__=li?li(null):{},this.size=0}var UR=nO;function iO(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var qR=iO;var oO="__lodash_hash_undefined__",sO=Object.prototype,aO=sO.hasOwnProperty;function uO(t){var e=this.__data__;if(li){var r=e[t];return r===oO?void 0:r}return aO.call(e,t)?e[t]:void 0}var KR=uO;var lO=Object.prototype,cO=lO.hasOwnProperty;function fO(t){var e=this.__data__;return li?e[t]!==void 0:cO.call(e,t)}var GR=fO;var dO="__lodash_hash_undefined__";function pO(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=li&&e===void 0?dO:e,this}var jR=pO;function Os(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Os.prototype.clear=UR;Os.prototype.delete=qR;Os.prototype.get=KR;Os.prototype.has=GR;Os.prototype.set=jR;var Rh=Os;function mO(){this.__data__=[],this.size=0}var HR=mO;function hO(t,e){for(var r=t.length;r--;)if(In(t[r][0],e))return r;return-1}var Fi=hO;var yO=Array.prototype,gO=yO.splice;function TO(t){var e=this.__data__,r=Fi(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():gO.call(e,r,1),--this.size,!0}var WR=TO;function vO(t){var e=this.__data__,r=Fi(e,t);return r<0?void 0:e[r][1]}var BR=vO;function xO(t){return Fi(this.__data__,t)>-1}var zR=xO;function RO(t,e){var r=this.__data__,n=Fi(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var VR=RO;function Ls(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Ls.prototype.clear=HR;Ls.prototype.delete=WR;Ls.prototype.get=BR;Ls.prototype.has=zR;Ls.prototype.set=VR;var Ui=Ls;var bO=Sr($t,"Map"),qi=bO;function wO(){this.size=0,this.__data__={hash:new Rh,map:new(qi||Ui),string:new Rh}}var XR=wO;function SO(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var YR=SO;function AO(t,e){var r=t.__data__;return YR(e)?r[typeof e=="string"?"string":"hash"]:r.map}var Ki=AO;function CO(t){var e=Ki(this,t).delete(t);return this.size-=e?1:0,e}var JR=CO;function kO(t){return Ki(this,t).get(t)}var QR=kO;function $O(t){return Ki(this,t).has(t)}var ZR=$O;function EO(t,e){var r=Ki(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var eb=EO;function Ms(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Ms.prototype.clear=XR;Ms.prototype.delete=JR;Ms.prototype.get=QR;Ms.prototype.has=ZR;Ms.prototype.set=eb;var wo=Ms;var _O="Expected a function";function bh(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(_O);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var s=t.apply(this,n);return r.cache=o.set(i,s)||o,s};return r.cache=new(bh.Cache||wo),r}bh.Cache=wo;var tb=bh;var NO=500;function IO(t){var e=tb(t,function(n){return r.size===NO&&r.clear(),n}),r=e.cache;return e}var rb=IO;var PO=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,DO=/\\(\\)?/g,OO=rb(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(PO,function(r,n,i,o){e.push(i?o.replace(DO,"$1"):n||r)}),e}),nb=OO;function LO(t){return t==null?"":nR(t)}var ib=LO;function MO(t,e){return z(t)?t:Ds(t,e)?[t]:nb(ib(t))}var Gi=MO;var FO=1/0;function UO(t){if(typeof t=="string"||En(t))return t;var e=t+"";return e=="0"&&1/t==-FO?"-0":e}var Ln=UO;function qO(t,e){e=Gi(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[Ln(e[r++])];return r&&r==n?t:void 0}var Fs=qO;function KO(t,e,r){var n=t==null?void 0:Fs(t,e);return n===void 0?r:n}var ob=KO;function GO(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}var Us=GO;var sb=Ft?Ft.isConcatSpreadable:void 0;function jO(t){return z(t)||Li(t)||!!(sb&&t&&t[sb])}var ab=jO;function ub(t,e,r,n,i){var o=-1,s=t.length;for(r||(r=ab),i||(i=[]);++o<s;){var a=t[o];e>0&&r(a)?e>1?ub(a,e-1,r,n,i):Us(i,a):n||(i[i.length]=a)}return i}var qs=ub;function HO(t){var e=t==null?0:t.length;return e?qs(t,1):[]}var gt=HO;var WO=Qc(Object.getPrototypeOf,Object),ef=WO;function BO(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=t[n+e];return o}var tf=BO;function zO(t,e,r,n){var i=-1,o=t==null?0:t.length;for(n&&o&&(r=t[++i]);++i<o;)r=e(r,t[i],i,t);return r}var lb=zO;function VO(){this.__data__=new Ui,this.size=0}var cb=VO;function XO(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}var fb=XO;function YO(t){return this.__data__.get(t)}var db=YO;function JO(t){return this.__data__.has(t)}var pb=JO;var QO=200;function ZO(t,e){var r=this.__data__;if(r instanceof Ui){var n=r.__data__;if(!qi||n.length<QO-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new wo(n)}return r.set(t,e),this.size=r.size,this}var mb=ZO;function Ks(t){var e=this.__data__=new Ui(t);this.size=e.size}Ks.prototype.clear=cb;Ks.prototype.delete=fb;Ks.prototype.get=db;Ks.prototype.has=pb;Ks.prototype.set=mb;var ji=Ks;function e0(t,e){return t&&Pn(e,je(e),t)}var hb=e0;function t0(t,e){return t&&Pn(e,Mi(e),t)}var yb=t0;var xb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,gb=xb&&typeof module=="object"&&module&&!module.nodeType&&module,r0=gb&&gb.exports===xb,Tb=r0?$t.Buffer:void 0,vb=Tb?Tb.allocUnsafe:void 0;function n0(t,e){if(e)return t.slice();var r=t.length,n=vb?vb(r):new t.constructor(r);return t.copy(n),n}var Rb=n0;function i0(t,e){for(var r=-1,n=t==null?0:t.length,i=0,o=[];++r<n;){var s=t[r];e(s,r,t)&&(o[i++]=s)}return o}var Gs=i0;function o0(){return[]}var rf=o0;var s0=Object.prototype,a0=s0.propertyIsEnumerable,bb=Object.getOwnPropertySymbols,u0=bb?function(t){return t==null?[]:(t=Object(t),Gs(bb(t),function(e){return a0.call(t,e)}))}:rf,js=u0;function l0(t,e){return Pn(t,js(t),e)}var wb=l0;var c0=Object.getOwnPropertySymbols,f0=c0?function(t){for(var e=[];t;)Us(e,js(t)),t=ef(t);return e}:rf,nf=f0;function d0(t,e){return Pn(t,nf(t),e)}var Sb=d0;function p0(t,e,r){var n=e(t);return z(t)?n:Us(n,r(t))}var of=p0;function m0(t){return of(t,je,js)}var mu=m0;function h0(t){return of(t,Mi,nf)}var sf=h0;var y0=Sr($t,"DataView"),af=y0;var g0=Sr($t,"Promise"),uf=g0;var T0=Sr($t,"Set"),Hi=T0;var Ab="[object Map]",v0="[object Object]",Cb="[object Promise]",kb="[object Set]",$b="[object WeakMap]",Eb="[object DataView]",x0=ai(af),R0=ai(qi),b0=ai(uf),w0=ai(Hi),S0=ai(zc),So=mr;(af&&So(new af(new ArrayBuffer(1)))!=Eb||qi&&So(new qi)!=Ab||uf&&So(uf.resolve())!=Cb||Hi&&So(new Hi)!=kb||zc&&So(new zc)!=$b)&&(So=function(t){var e=mr(t),r=e==v0?t.constructor:void 0,n=r?ai(r):"";if(n)switch(n){case x0:return Eb;case R0:return Ab;case b0:return Cb;case w0:return kb;case S0:return $b}return e});var yn=So;var A0=Object.prototype,C0=A0.hasOwnProperty;function k0(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&C0.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var _b=k0;var $0=$t.Uint8Array,Hs=$0;function E0(t){var e=new t.constructor(t.byteLength);return new Hs(e).set(new Hs(t)),e}var Ws=E0;function _0(t,e){var r=e?Ws(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var Nb=_0;var N0=/\w*$/;function I0(t){var e=new t.constructor(t.source,N0.exec(t));return e.lastIndex=t.lastIndex,e}var Ib=I0;var Pb=Ft?Ft.prototype:void 0,Db=Pb?Pb.valueOf:void 0;function P0(t){return Db?Object(Db.call(t)):{}}var Ob=P0;function D0(t,e){var r=e?Ws(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var Lb=D0;var O0="[object Boolean]",L0="[object Date]",M0="[object Map]",F0="[object Number]",U0="[object RegExp]",q0="[object Set]",K0="[object String]",G0="[object Symbol]",j0="[object ArrayBuffer]",H0="[object DataView]",W0="[object Float32Array]",B0="[object Float64Array]",z0="[object Int8Array]",V0="[object Int16Array]",X0="[object Int32Array]",Y0="[object Uint8Array]",J0="[object Uint8ClampedArray]",Q0="[object Uint16Array]",Z0="[object Uint32Array]";function eL(t,e,r){var n=t.constructor;switch(e){case j0:return Ws(t);case O0:case L0:return new n(+t);case H0:return Nb(t,r);case W0:case B0:case z0:case V0:case X0:case Y0:case J0:case Q0:case Z0:return Lb(t,r);case M0:return new n;case F0:case K0:return new n(t);case U0:return Ib(t);case q0:return new n;case G0:return Ob(t)}}var Mb=eL;function tL(t){return typeof t.constructor=="function"&&!Dn(t)?hR(ef(t)):{}}var Fb=tL;var rL="[object Map]";function nL(t){return yt(t)&&yn(t)==rL}var Ub=nL;var qb=Jr&&Jr.isMap,iL=qb?On(qb):Ub,Kb=iL;var oL="[object Set]";function sL(t){return yt(t)&&yn(t)==oL}var Gb=sL;var jb=Jr&&Jr.isSet,aL=jb?On(jb):Gb,Hb=aL;var uL=1,lL=2,cL=4,Wb="[object Arguments]",fL="[object Array]",dL="[object Boolean]",pL="[object Date]",mL="[object Error]",Bb="[object Function]",hL="[object GeneratorFunction]",yL="[object Map]",gL="[object Number]",zb="[object Object]",TL="[object RegExp]",vL="[object Set]",xL="[object String]",RL="[object Symbol]",bL="[object WeakMap]",wL="[object ArrayBuffer]",SL="[object DataView]",AL="[object Float32Array]",CL="[object Float64Array]",kL="[object Int8Array]",$L="[object Int16Array]",EL="[object Int32Array]",_L="[object Uint8Array]",NL="[object Uint8ClampedArray]",IL="[object Uint16Array]",PL="[object Uint32Array]",He={};He[Wb]=He[fL]=He[wL]=He[SL]=He[dL]=He[pL]=He[AL]=He[CL]=He[kL]=He[$L]=He[EL]=He[yL]=He[gL]=He[zb]=He[TL]=He[vL]=He[xL]=He[RL]=He[_L]=He[NL]=He[IL]=He[PL]=!0;He[mL]=He[Bb]=He[bL]=!1;function lf(t,e,r,n,i,o){var s,a=e&uL,u=e&lL,l=e&cL;if(r&&(s=i?r(t,n,i,o):r(t)),s!==void 0)return s;if(!st(t))return t;var c=z(t);if(c){if(s=_b(t),!a)return gR(t,s)}else{var f=yn(t),m=f==Bb||f==hL;if(ui(t))return Rb(t,a);if(f==zb||f==Wb||m&&!i){if(s=u||m?{}:Fb(t),!a)return u?Sb(t,yb(s,t)):wb(t,hb(s,t))}else{if(!He[f])return i?t:{};s=Mb(t,f,a)}}o||(o=new ji);var T=o.get(t);if(T)return T;o.set(t,s),Hb(t)?t.forEach(function(_){s.add(lf(_,e,r,_,t,o))}):Kb(t)&&t.forEach(function(_,C){s.set(C,lf(_,e,r,C,t,o))});var w=l?u?sf:mu:u?Mi:je,A=c?void 0:w(t);return Vc(A||t,function(_,C){A&&(C=_,_=t[C]),Di(s,C,lf(_,e,r,C,t,o))}),s}var Vb=lf;var DL=4;function OL(t){return Vb(t,DL)}var We=OL;function LL(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var o=t[e];o&&(i[n++]=o)}return i}var Mn=LL;var ML="__lodash_hash_undefined__";function FL(t){return this.__data__.set(t,ML),this}var Xb=FL;function UL(t){return this.__data__.has(t)}var Yb=UL;function cf(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new wo;++e<r;)this.add(t[e])}cf.prototype.add=cf.prototype.push=Xb;cf.prototype.has=Yb;var Bs=cf;function qL(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}var ff=qL;function KL(t,e){return t.has(e)}var zs=KL;var GL=1,jL=2;function HL(t,e,r,n,i,o){var s=r&GL,a=t.length,u=e.length;if(a!=u&&!(s&&u>a))return!1;var l=o.get(t),c=o.get(e);if(l&&c)return l==e&&c==t;var f=-1,m=!0,T=r&jL?new Bs:void 0;for(o.set(t,e),o.set(e,t);++f<a;){var w=t[f],A=e[f];if(n)var _=s?n(A,w,f,e,t,o):n(w,A,f,t,e,o);if(_!==void 0){if(_)continue;m=!1;break}if(T){if(!ff(e,function(C,v){if(!zs(T,v)&&(w===C||i(w,C,r,n,o)))return T.push(v)})){m=!1;break}}else if(!(w===A||i(w,A,r,n,o))){m=!1;break}}return o.delete(t),o.delete(e),m}var df=HL;function WL(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}var Jb=WL;function BL(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}var Vs=BL;var zL=1,VL=2,XL="[object Boolean]",YL="[object Date]",JL="[object Error]",QL="[object Map]",ZL="[object Number]",eM="[object RegExp]",tM="[object Set]",rM="[object String]",nM="[object Symbol]",iM="[object ArrayBuffer]",oM="[object DataView]",Qb=Ft?Ft.prototype:void 0,wh=Qb?Qb.valueOf:void 0;function sM(t,e,r,n,i,o,s){switch(r){case oM:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case iM:return!(t.byteLength!=e.byteLength||!o(new Hs(t),new Hs(e)));case XL:case YL:case ZL:return In(+t,+e);case JL:return t.name==e.name&&t.message==e.message;case eM:case rM:return t==e+"";case QL:var a=Jb;case tM:var u=n&zL;if(a||(a=Vs),t.size!=e.size&&!u)return!1;var l=s.get(t);if(l)return l==e;n|=VL,s.set(t,e);var c=df(a(t),a(e),n,i,o,s);return s.delete(t),c;case nM:if(wh)return wh.call(t)==wh.call(e)}return!1}var Zb=sM;var aM=1,uM=Object.prototype,lM=uM.hasOwnProperty;function cM(t,e,r,n,i,o){var s=r&aM,a=mu(t),u=a.length,l=mu(e),c=l.length;if(u!=c&&!s)return!1;for(var f=u;f--;){var m=a[f];if(!(s?m in e:lM.call(e,m)))return!1}var T=o.get(t),w=o.get(e);if(T&&w)return T==e&&w==t;var A=!0;o.set(t,e),o.set(e,t);for(var _=s;++f<u;){m=a[f];var C=t[m],v=e[m];if(n)var g=s?n(v,C,m,e,t,o):n(C,v,m,t,e,o);if(!(g===void 0?C===v||i(C,v,r,n,o):g)){A=!1;break}_||(_=m=="constructor")}if(A&&!_){var E=t.constructor,D=e.constructor;E!=D&&"constructor"in t&&"constructor"in e&&!(typeof E=="function"&&E instanceof E&&typeof D=="function"&&D instanceof D)&&(A=!1)}return o.delete(t),o.delete(e),A}var ew=cM;var fM=1,tw="[object Arguments]",rw="[object Array]",pf="[object Object]",dM=Object.prototype,nw=dM.hasOwnProperty;function pM(t,e,r,n,i,o){var s=z(t),a=z(e),u=s?rw:yn(t),l=a?rw:yn(e);u=u==tw?pf:u,l=l==tw?pf:l;var c=u==pf,f=l==pf,m=u==l;if(m&&ui(t)){if(!ui(e))return!1;s=!0,c=!1}if(m&&!c)return o||(o=new ji),s||Ps(t)?df(t,e,r,n,i,o):Zb(t,e,u,r,n,i,o);if(!(r&fM)){var T=c&&nw.call(t,"__wrapped__"),w=f&&nw.call(e,"__wrapped__");if(T||w){var A=T?t.value():t,_=w?e.value():e;return o||(o=new ji),i(A,_,r,n,o)}}return m?(o||(o=new ji),ew(t,e,r,n,i,o)):!1}var iw=pM;function ow(t,e,r,n,i){return t===e?!0:t==null||e==null||!yt(t)&&!yt(e)?t!==t&&e!==e:iw(t,e,r,n,ow,i)}var mf=ow;var mM=1,hM=2;function yM(t,e,r,n){var i=r.length,o=i,s=!n;if(t==null)return!o;for(t=Object(t);i--;){var a=r[i];if(s&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++i<o;){a=r[i];var u=a[0],l=t[u],c=a[1];if(s&&a[2]){if(l===void 0&&!(u in t))return!1}else{var f=new ji;if(n)var m=n(l,c,u,t,e,f);if(!(m===void 0?mf(c,l,mM|hM,n,f):m))return!1}}return!0}var sw=yM;function gM(t){return t===t&&!st(t)}var hf=gM;function TM(t){for(var e=je(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,hf(i)]}return e}var aw=TM;function vM(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}var yf=vM;function xM(t){var e=aw(t);return e.length==1&&e[0][2]?yf(e[0][0],e[0][1]):function(r){return r===t||sw(r,t,e)}}var uw=xM;function RM(t,e){return t!=null&&e in Object(t)}var lw=RM;function bM(t,e,r){e=Gi(e,t);for(var n=-1,i=e.length,o=!1;++n<i;){var s=Ln(e[n]);if(!(o=t!=null&&r(t,s)))break;t=t[s]}return o||++n!=i?o:(i=t==null?0:t.length,!!i&&Is(i)&&Pi(s,i)&&(z(t)||Li(t)))}var gf=bM;function wM(t,e){return t!=null&&gf(t,e,lw)}var cw=wM;var SM=1,AM=2;function CM(t,e){return Ds(t)&&hf(e)?yf(Ln(t),e):function(r){var n=ob(r,t);return n===void 0&&n===e?cw(r,t):mf(e,n,SM|AM)}}var fw=CM;function kM(t){return function(e){return e?.[t]}}var dw=kM;function $M(t){return function(e){return Fs(e,t)}}var pw=$M;function EM(t){return Ds(t)?dw(Ln(t)):pw(t)}var mw=EM;function _M(t){return typeof t=="function"?t:t==null?wr:typeof t=="object"?z(t)?fw(t[0],t[1]):uw(t):mw(t)}var pt=_M;function NM(t,e,r,n){for(var i=-1,o=t==null?0:t.length;++i<o;){var s=t[i];e(n,s,r(s),t)}return n}var hw=NM;function IM(t){return function(e,r,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var u=s[t?a:++i];if(r(o[u],u,o)===!1)break}return e}}var yw=IM;var PM=yw(),gw=PM;function DM(t,e){return t&&gw(t,e,je)}var Tw=DM;function OM(t,e){return function(r,n){if(r==null)return r;if(!Et(r))return t(r,n);for(var i=r.length,o=e?i:-1,s=Object(r);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return r}}var vw=OM;var LM=vw(Tw),Ar=LM;function MM(t,e,r,n){return Ar(t,function(i,o,s){e(n,i,r(i),s)}),n}var xw=MM;function FM(t,e){return function(r,n){var i=z(r)?hw:xw,o=e?e():{};return i(r,t,pt(n,2),o)}}var Rw=FM;var bw=Object.prototype,UM=bw.hasOwnProperty,qM=Ns(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Oi(e[0],e[1],i)&&(n=1);++r<n;)for(var o=e[r],s=Mi(o),a=-1,u=s.length;++a<u;){var l=s[a],c=t[l];(c===void 0||In(c,bw[l])&&!UM.call(t,l))&&(t[l]=o[l])}return t}),Xs=qM;function KM(t){return yt(t)&&Et(t)}var Sh=KM;function GM(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}var Tf=GM;var jM=200;function HM(t,e,r,n){var i=-1,o=Yc,s=!0,a=t.length,u=[],l=e.length;if(!a)return u;r&&(e=_n(e,On(r))),n?(o=Tf,s=!1):e.length>=jM&&(o=zs,s=!1,e=new Bs(e));e:for(;++i<a;){var c=t[i],f=r==null?c:r(c);if(c=n||c!==0?c:0,s&&f===f){for(var m=l;m--;)if(e[m]===f)continue e;u.push(c)}else o(e,f,n)||u.push(c)}return u}var ww=HM;var WM=Ns(function(t,e){return Sh(t)?ww(t,qs(e,1,Sh,!0)):[]}),Wi=WM;function BM(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}var Fn=BM;function zM(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Nn(e),tf(t,e<0?0:e,n)):[]}var Tt=zM;function VM(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Nn(e),e=n-e,tf(t,0,e<0?0:e)):[]}var ci=VM;function XM(t){return typeof t=="function"?t:wr}var Sw=XM;function YM(t,e){var r=z(t)?Vc:Ar;return r(t,Sw(e))}var K=YM;function JM(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}var Aw=JM;function QM(t,e){var r=!0;return Ar(t,function(n,i,o){return r=!!e(n,i,o),r}),r}var Cw=QM;function ZM(t,e,r){var n=z(t)?Aw:Cw;return r&&Oi(t,e,r)&&(e=void 0),n(t,pt(e,3))}var ar=ZM;function eF(t,e){var r=[];return Ar(t,function(n,i,o){e(n,i,o)&&r.push(n)}),r}var vf=eF;function tF(t,e){var r=z(t)?Gs:vf;return r(t,pt(e,3))}var Ut=tF;function rF(t){return function(e,r,n){var i=Object(e);if(!Et(e)){var o=pt(r,3);e=je(e),r=function(a){return o(i[a],a,i)}}var s=t(e,r,n);return s>-1?i[o?e[s]:s]:void 0}}var kw=rF;var nF=Math.max;function iF(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Nn(r);return i<0&&(i=nF(n+i,0)),Xc(t,pt(e,3),i)}var $w=iF;var oF=kw($w),Un=oF;function sF(t){return t&&t.length?t[0]:void 0}var qt=sF;function aF(t,e){var r=-1,n=Et(t)?Array(t.length):[];return Ar(t,function(i,o,s){n[++r]=e(i,o,s)}),n}var Ew=aF;function uF(t,e){var r=z(t)?_n:Ew;return r(t,pt(e,3))}var L=uF;function lF(t,e){return qs(L(t,e),1)}var Qt=lF;var cF=Object.prototype,fF=cF.hasOwnProperty,dF=Rw(function(t,e,r){fF.call(t,r)?t[r].push(e):_s(t,r,[e])}),Ah=dF;var pF=Object.prototype,mF=pF.hasOwnProperty;function hF(t,e){return t!=null&&mF.call(t,e)}var _w=hF;function yF(t,e){return t!=null&&gf(t,e,_w)}var W=yF;var gF="[object String]";function TF(t){return typeof t=="string"||!z(t)&&yt(t)&&mr(t)==gF}var Dt=TF;function vF(t,e){return _n(e,function(r){return t[r]})}var Nw=vF;function xF(t){return t==null?[]:Nw(t,je(t))}var Pe=xF;var RF=Math.max;function bF(t,e,r,n){t=Et(t)?t:Pe(t),r=r&&!n?Nn(r):0;var i=t.length;return r<0&&(r=RF(i+r,0)),Dt(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&Es(t,e,r)>-1}var et=bF;var wF=Math.max;function SF(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Nn(r);return i<0&&(i=wF(n+i,0)),Es(t,e,i)}var xf=SF;var AF="[object Map]",CF="[object Set]",kF=Object.prototype,$F=kF.hasOwnProperty;function EF(t){if(t==null)return!0;if(Et(t)&&(z(t)||typeof t=="string"||typeof t.splice=="function"||ui(t)||Ps(t)||Li(t)))return!t.length;var e=yn(t);if(e==AF||e==CF)return!t.size;if(Dn(t))return!Zc(t).length;for(var r in t)if($F.call(t,r))return!1;return!0}var se=EF;var _F="[object RegExp]";function NF(t){return yt(t)&&mr(t)==_F}var Iw=NF;var Pw=Jr&&Jr.isRegExp,IF=Pw?On(Pw):Iw,Qr=IF;function PF(t){return t===void 0}var ur=PF;function DF(t,e){return t<e}var Dw=DF;function OF(t,e,r){for(var n=-1,i=t.length;++n<i;){var o=t[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!En(s):r(s,a)))var a=s,u=o}return u}var Ow=OF;function LF(t){return t&&t.length?Ow(t,wr,Dw):void 0}var Lw=LF;var MF="Expected a function";function FF(t){if(typeof t!="function")throw new TypeError(MF);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}var Mw=FF;function UF(t,e,r,n){if(!st(t))return t;e=Gi(e,t);for(var i=-1,o=e.length,s=o-1,a=t;a!=null&&++i<o;){var u=Ln(e[i]),l=r;if(u==="__proto__"||u==="constructor"||u==="prototype")return t;if(i!=s){var c=a[u];l=n?n(c,u,a):void 0,l===void 0&&(l=st(c)?c:Pi(e[i+1])?[]:{})}Di(a,u,l),a=a[u]}return t}var Fw=UF;function qF(t,e,r){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=Fs(t,s);r(a,s)&&Fw(o,Gi(s,t),a)}return o}var Uw=qF;function KF(t,e){if(t==null)return{};var r=_n(sf(t),function(n){return[n]});return e=pt(e),Uw(t,r,function(n,i){return e(n,i[0])})}var Cr=KF;function GF(t,e,r,n,i){return i(t,function(o,s,a){r=n?(n=!1,o):e(r,o,s,a)}),r}var qw=GF;function jF(t,e,r){var n=z(t)?lb:qw,i=arguments.length<3;return n(t,pt(e,4),r,i,Ar)}var ut=jF;function HF(t,e){var r=z(t)?Gs:vf;return r(t,Mw(pt(e,3)))}var Bi=HF;function WF(t,e){var r;return Ar(t,function(n,i,o){return r=e(n,i,o),!r}),!!r}var Kw=WF;function BF(t,e,r){var n=z(t)?ff:Kw;return r&&Oi(t,e,r)&&(e=void 0),n(t,pt(e,3))}var hu=BF;var zF=1/0,VF=Hi&&1/Vs(new Hi([,-0]))[1]==zF?function(t){return new Hi(t)}:at,Gw=VF;var XF=200;function YF(t,e,r){var n=-1,i=Yc,o=t.length,s=!0,a=[],u=a;if(r)s=!1,i=Tf;else if(o>=XF){var l=e?null:Gw(t);if(l)return Vs(l);s=!1,i=zs,u=new Bs}else u=e?[]:a;e:for(;++n<o;){var c=t[n],f=e?e(c):c;if(c=r||c!==0?c:0,s&&f===f){for(var m=u.length;m--;)if(u[m]===f)continue e;e&&u.push(f),a.push(c)}else i(u,f,r)||(u!==a&&u.push(f),a.push(c))}return a}var Rf=YF;function JF(t){return t&&t.length?Rf(t):[]}var Ys=JF;function QF(t,e){return t&&t.length?Rf(t,pt(e,2)):[]}var jw=QF;function Js(t){console&&console.error&&console.error(`Error: ${t}`)}function yu(t){console&&console.warn&&console.warn(`Warning: ${t}`)}function gu(t){let e=new Date().getTime(),r=t();return{time:new Date().getTime()-e,value:r}}function Tu(t){function e(){}e.prototype=t;let r=new e;function n(){return typeof r.bar}return n(),n(),t;(0,eval)(t)}function ZF(t){return e1(t)?t.LABEL:t.name}function e1(t){return Dt(t.LABEL)&&t.LABEL!==""}var Ur=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),K(this.definition,r=>{r.accept(e)})}},Ce=class extends Ur{constructor(e){super([]),this.idx=1,Jt(this,Cr(e,r=>r!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},yr=class extends Ur{constructor(e){super(e.definition),this.orgText="",Jt(this,Cr(e,r=>r!==void 0))}},Be=class extends Ur{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Jt(this,Cr(e,r=>r!==void 0))}},ke=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,Cr(e,r=>r!==void 0))}},ze=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,Cr(e,r=>r!==void 0))}},Ve=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,Cr(e,r=>r!==void 0))}},pe=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,Cr(e,r=>r!==void 0))}},Me=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,Cr(e,r=>r!==void 0))}},Fe=class extends Ur{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Jt(this,Cr(e,r=>r!==void 0))}},ae=class{constructor(e){this.idx=1,Jt(this,Cr(e,r=>r!==void 0))}accept(e){e.visit(this)}};function bf(t){return L(t,Qs)}function Qs(t){function e(r){return L(r,Qs)}if(t instanceof Ce){let r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return Dt(t.label)&&(r.label=t.label),r}else{if(t instanceof Be)return{type:"Alternative",definition:e(t.definition)};if(t instanceof ke)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof ze)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof Ve)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:Qs(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Me)return{type:"RepetitionWithSeparator",idx:t.idx,separator:Qs(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof pe)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof Fe)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof ae){let r={type:"Terminal",name:t.terminalType.name,label:ZF(t.terminalType),idx:t.idx};Dt(t.label)&&(r.terminalLabel=t.label);let n=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(r.pattern=Qr(n)?n.source:n),r}else{if(t instanceof yr)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}var gr=class{visit(e){let r=e;switch(r.constructor){case Ce:return this.visitNonTerminal(r);case Be:return this.visitAlternative(r);case ke:return this.visitOption(r);case ze:return this.visitRepetitionMandatory(r);case Ve:return this.visitRepetitionMandatoryWithSeparator(r);case Me:return this.visitRepetitionWithSeparator(r);case pe:return this.visitRepetition(r);case Fe:return this.visitAlternation(r);case ae:return this.visitTerminal(r);case yr:return this.visitRule(r);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function Ch(t){return t instanceof Be||t instanceof ke||t instanceof pe||t instanceof ze||t instanceof Ve||t instanceof Me||t instanceof ae||t instanceof yr}function Ao(t,e=[]){return t instanceof ke||t instanceof pe||t instanceof Me?!0:t instanceof Fe?hu(t.definition,n=>Ao(n,e)):t instanceof Ce&&et(e,t)?!1:t instanceof Ur?(t instanceof Ce&&e.push(t),ar(t.definition,n=>Ao(n,e))):!1}function kh(t){return t instanceof Fe}function kr(t){if(t instanceof Ce)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof ze)return"AT_LEAST_ONE";if(t instanceof Ve)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}var fi=class{walk(e,r=[]){K(e.definition,(n,i)=>{let o=Tt(e.definition,i+1);if(n instanceof Ce)this.walkProdRef(n,o,r);else if(n instanceof ae)this.walkTerminal(n,o,r);else if(n instanceof Be)this.walkFlat(n,o,r);else if(n instanceof ke)this.walkOption(n,o,r);else if(n instanceof ze)this.walkAtLeastOne(n,o,r);else if(n instanceof Ve)this.walkAtLeastOneSep(n,o,r);else if(n instanceof Me)this.walkManySep(n,o,r);else if(n instanceof pe)this.walkMany(n,o,r);else if(n instanceof Fe)this.walkOr(n,o,r);else throw Error("non exhaustive match")})}walkTerminal(e,r,n){}walkProdRef(e,r,n){}walkFlat(e,r,n){let i=r.concat(n);this.walk(e,i)}walkOption(e,r,n){let i=r.concat(n);this.walk(e,i)}walkAtLeastOne(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkAtLeastOneSep(e,r,n){let i=Hw(e,r,n);this.walk(e,i)}walkMany(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkManySep(e,r,n){let i=Hw(e,r,n);this.walk(e,i)}walkOr(e,r,n){let i=r.concat(n);K(e.definition,o=>{let s=new Be({definition:[o]});this.walk(s,i)})}};function Hw(t,e,r){return[new ke({definition:[new ae({terminalType:t.separator})].concat(t.definition)})].concat(e,r)}function Co(t){if(t instanceof Ce)return Co(t.referencedRule);if(t instanceof ae)return n1(t);if(Ch(t))return t1(t);if(kh(t))return r1(t);throw Error("non exhaustive match")}function t1(t){let e=[],r=t.definition,n=0,i=r.length>n,o,s=!0;for(;i&&s;)o=r[n],s=Ao(o),e=e.concat(Co(o)),n=n+1,i=r.length>n;return Ys(e)}function r1(t){let e=L(t.definition,r=>Co(r));return Ys(gt(e))}function n1(t){return[t.terminalType]}var wf="_~IN~_";var $h=class extends fi{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,r,n){}walkProdRef(e,r,n){let i=i1(e.referencedRule,e.idx)+this.topProd.name,o=r.concat(n),s=new Be({definition:o}),a=Co(s);this.follows[i]=a}};function Ww(t){let e={};return K(t,r=>{let n=new $h(r).startWalking();Jt(e,n)}),e}function i1(t,e){return t.name+e+wf}var Sf={},o1=new go;function Zs(t){let e=t.toString();if(Sf.hasOwnProperty(e))return Sf[e];{let r=o1.pattern(e);return Sf[e]=r,r}}function Bw(){Sf={}}var Vw="Complement Sets are not supported for first char optimization",vu=`Unable to use "first char" lexer optimizations:
`;function Xw(t,e=!1){try{let r=Zs(t);return Eh(r.value,{},r.flags.ignoreCase)}catch(r){if(r.message===Vw)e&&yu(`${vu}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),Js(`${vu}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function Eh(t,e,r){switch(t.type){case"Disjunction":for(let i=0;i<t.value.length;i++)Eh(t.value[i],e,r);break;case"Alternative":let n=t.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":Af(s.value,e,r);break;case"Set":if(s.complement===!0)throw Error(Vw);K(s.value,u=>{if(typeof u=="number")Af(u,e,r);else{let l=u;if(r===!0)for(let c=l.from;c<=l.to;c++)Af(c,e,r);else{for(let c=l.from;c<=l.to&&c<ea;c++)Af(c,e,r);if(l.to>=ea){let c=l.from>=ea?l.from:ea,f=l.to,m=qn(c),T=qn(f);for(let w=m;w<=T;w++)e[w]=w}}}});break;case"Group":Eh(s.value,e,r);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&_h(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return Pe(e)}function Af(t,e,r){let n=qn(t);e[n]=n,r===!0&&s1(t,e)}function s1(t,e){let r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){let i=qn(n.charCodeAt(0));e[i]=i}else{let i=r.toLowerCase();if(i!==r){let o=qn(i.charCodeAt(0));e[o]=o}}}function zw(t,e){return Un(t.value,r=>{if(typeof r=="number")return et(e,r);{let n=r;return Un(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function _h(t){let e=t.quantifier;return e&&e.atLeast===0?!0:t.value?z(t.value)?ar(t.value,_h):_h(t.value):!1}var Nh=class extends kn{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){et(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?zw(e,this.targetCharCodes)===void 0&&(this.found=!0):zw(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function Cf(t,e){if(e instanceof RegExp){let r=Zs(e),n=new Nh(t);return n.visit(r),n.found}else return Un(e,r=>et(t,r.charCodeAt(0)))!==void 0}var ko="PATTERN",ta="defaultMode",kf="modes",Ph=typeof new RegExp("(?:)").sticky=="boolean";function Qw(t,e){e=Xs(e,{useSticky:Ph,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(v,g)=>g()});let r=e.tracer;r("initCharCodeToOptimizedIndexMap",()=>{S1()});let n;r("Reject Lexer.NA",()=>{n=Bi(t,v=>v[ko]===mt.NA)});let i=!1,o;r("Transform Patterns",()=>{i=!1,o=L(n,v=>{let g=v[ko];if(Qr(g)){let E=g.source;return E.length===1&&E!=="^"&&E!=="$"&&E!=="."&&!g.ignoreCase?E:E.length===2&&E[0]==="\\"&&!et(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],E[1])?E[1]:e.useSticky?Jw(g):Yw(g)}else{if(hr(g))return i=!0,{exec:g};if(typeof g=="object")return i=!0,g;if(typeof g=="string"){if(g.length===1)return g;{let E=g.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),D=new RegExp(E);return e.useSticky?Jw(D):Yw(D)}}else throw Error("non exhaustive match")}})});let s,a,u,l,c;r("misc mapping",()=>{s=L(n,v=>v.tokenTypeIdx),a=L(n,v=>{let g=v.GROUP;if(g!==mt.SKIPPED){if(Dt(g))return g;if(ur(g))return!1;throw Error("non exhaustive match")}}),u=L(n,v=>{let g=v.LONGER_ALT;if(g)return z(g)?L(g,D=>xf(n,D)):[xf(n,g)]}),l=L(n,v=>v.PUSH_MODE),c=L(n,v=>W(v,"POP_MODE"))});let f;r("Line Terminator Handling",()=>{let v=sS(e.lineTerminatorCharacters);f=L(n,g=>!1),e.positionTracking!=="onlyOffset"&&(f=L(n,g=>W(g,"LINE_BREAKS")?!!g.LINE_BREAKS:oS(g,v)===!1&&Cf(v,g.PATTERN)))});let m,T,w,A;r("Misc Mapping #2",()=>{m=L(n,nS),T=L(o,b1),w=ut(n,(v,g)=>{let E=g.GROUP;return Dt(E)&&E!==mt.SKIPPED&&(v[E]=[]),v},{}),A=L(o,(v,g)=>({pattern:o[g],longerAlt:u[g],canLineTerminator:f[g],isCustom:m[g],short:T[g],group:a[g],push:l[g],pop:c[g],tokenTypeIdx:s[g],tokenType:n[g]}))});let _=!0,C=[];return e.safeMode||r("First Char Optimization",()=>{C=ut(n,(v,g,E)=>{if(typeof g.PATTERN=="string"){let D=g.PATTERN.charCodeAt(0),X=qn(D);Ih(v,X,A[E])}else if(z(g.START_CHARS_HINT)){let D;K(g.START_CHARS_HINT,X=>{let ge=typeof X=="string"?X.charCodeAt(0):X,$e=qn(ge);D!==$e&&(D=$e,Ih(v,$e,A[E]))})}else if(Qr(g.PATTERN))if(g.PATTERN.unicode)_=!1,e.ensureOptimizations&&Js(`${vu}	Unable to analyze < ${g.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let D=Xw(g.PATTERN,e.ensureOptimizations);se(D)&&(_=!1),K(D,X=>{Ih(v,X,A[E])})}else e.ensureOptimizations&&Js(`${vu}	TokenType: <${g.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),_=!1;return v},[])}),{emptyGroups:w,patternIdxToConfig:A,charCodeToPatternIdxToConfig:C,hasCustom:i,canBeOptimized:_}}function Zw(t,e){let r=[],n=u1(t);r=r.concat(n.errors);let i=l1(n.valid),o=i.valid;return r=r.concat(i.errors),r=r.concat(a1(o)),r=r.concat(g1(o)),r=r.concat(T1(o,e)),r=r.concat(v1(o)),r}function a1(t){let e=[],r=Ut(t,n=>Qr(n[ko]));return e=e.concat(f1(r)),e=e.concat(m1(r)),e=e.concat(h1(r)),e=e.concat(y1(r)),e=e.concat(d1(r)),e}function u1(t){let e=Ut(t,i=>!W(i,ko)),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:tt.MISSING_PATTERN,tokenTypes:[i]})),n=Wi(t,e);return{errors:r,valid:n}}function l1(t){let e=Ut(t,i=>{let o=i[ko];return!Qr(o)&&!hr(o)&&!W(o,"exec")&&!Dt(o)}),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:tt.INVALID_PATTERN,tokenTypes:[i]})),n=Wi(t,e);return{errors:r,valid:n}}var c1=/[^\\][$]/;function f1(t){class e extends kn{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let r=Ut(t,i=>{let o=i.PATTERN;try{let s=Zs(o),a=new e;return a.visit(s),a.found}catch{return c1.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function d1(t){let e=Ut(t,n=>n.PATTERN.test(""));return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:tt.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var p1=/[^\\[][\^]|^\^/;function m1(t){class e extends kn{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let r=Ut(t,i=>{let o=i.PATTERN;try{let s=Zs(o),a=new e;return a.visit(s),a.found}catch{return p1.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function h1(t){let e=Ut(t,n=>{let i=n[ko];return i instanceof RegExp&&(i.multiline||i.global)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:tt.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function y1(t){let e=[],r=L(t,o=>ut(t,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!et(e,a)&&a.PATTERN!==mt.NA&&(e.push(a),s.push(a)),s),[]));r=Mn(r);let n=Ut(r,o=>o.length>1);return L(n,o=>{let s=L(o,u=>u.name);return{message:`The same RegExp pattern ->${qt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:tt.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function g1(t){let e=Ut(t,n=>{if(!W(n,"GROUP"))return!1;let i=n.GROUP;return i!==mt.SKIPPED&&i!==mt.NA&&!Dt(i)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:tt.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function T1(t,e){let r=Ut(t,i=>i.PUSH_MODE!==void 0&&!et(e,i.PUSH_MODE));return L(r,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:tt.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function v1(t){let e=[],r=ut(t,(n,i,o)=>{let s=i.PATTERN;return s===mt.NA||(Dt(s)?n.push({str:s,idx:o,tokenType:i}):Qr(s)&&R1(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return K(t,(n,i)=>{K(r,({str:o,idx:s,tokenType:a})=>{if(i<s&&x1(o,n.PATTERN)){let u=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:u,type:tt.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function x1(t,e){if(Qr(e)){let r=e.exec(t);return r!==null&&r.index===0}else{if(hr(e))return e(t,0,[],{});if(W(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function R1(t){return Un([".","\\","[","]","|","^","$","(",")","?","*","+","{"],r=>t.source.indexOf(r)!==-1)===void 0}function Yw(t){let e=t.ignoreCase?"i":"";return new RegExp(`^(?:${t.source})`,e)}function Jw(t){let e=t.ignoreCase?"iy":"y";return new RegExp(`${t.source}`,e)}function eS(t,e,r){let n=[];return W(t,ta)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+ta+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),W(t,kf)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+kf+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),W(t,kf)&&W(t,ta)&&!W(t.modes,t.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${ta}: <${t.defaultMode}>which does not exist
`,type:tt.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),W(t,kf)&&K(t.modes,(i,o)=>{K(i,(s,a)=>{if(ur(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:tt.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(W(s,"LONGER_ALT")){let u=z(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];K(u,l=>{!ur(l)&&!et(i,l)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${l.name}> on token <${s.name}> outside of mode <${o}>
`,type:tt.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function tS(t,e,r){let n=[],i=!1,o=Mn(gt(Pe(t.modes))),s=Bi(o,u=>u[ko]===mt.NA),a=sS(r);return e&&K(s,u=>{let l=oS(u,a);if(l!==!1){let f={message:w1(u,l),type:l.issue,tokenType:u};n.push(f)}else W(u,"LINE_BREAKS")?u.LINE_BREAKS===!0&&(i=!0):Cf(a,u.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:tt.NO_LINE_BREAKS_FLAGS}),n}function rS(t){let e={},r=je(t);return K(r,n=>{let i=t[n];if(z(i))e[n]=[];else throw Error("non exhaustive match")}),e}function nS(t){let e=t.PATTERN;if(Qr(e))return!1;if(hr(e))return!0;if(W(e,"exec"))return!0;if(Dt(e))return!1;throw Error("non exhaustive match")}function b1(t){return Dt(t)&&t.length===1?t.charCodeAt(0):!1}var iS={test:function(t){let e=t.length;for(let r=this.lastIndex;r<e;r++){let n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function oS(t,e){if(W(t,"LINE_BREAKS"))return!1;if(Qr(t.PATTERN)){try{Cf(e,t.PATTERN)}catch(r){return{issue:tt.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if(Dt(t.PATTERN))return!1;if(nS(t))return{issue:tt.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function w1(t,e){if(e.issue===tt.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===tt.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function sS(t){return L(t,r=>Dt(r)?r.charCodeAt(0):r)}function Ih(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}var ea=256,$f=[];function qn(t){return t<ea?t:$f[t]}function S1(){if(se($f)){$f=new Array(65536);for(let t=0;t<65536;t++)$f[t]=t>255?255+~~(t/255):t}}function di(t,e){let r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}function ra(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}var aS=1,lS={};function pi(t){let e=A1(t);C1(e),$1(e),k1(e),K(e,r=>{r.isParent=r.categoryMatches.length>0})}function A1(t){let e=We(t),r=t,n=!0;for(;n;){r=Mn(gt(L(r,o=>o.CATEGORIES)));let i=Wi(r,e);e=e.concat(i),se(i)?n=!1:r=i}return e}function C1(t){K(t,e=>{Dh(e)||(lS[aS]=e,e.tokenTypeIdx=aS++),uS(e)&&!z(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),uS(e)||(e.CATEGORIES=[]),E1(e)||(e.categoryMatches=[]),_1(e)||(e.categoryMatchesMap={})})}function k1(t){K(t,e=>{e.categoryMatches=[],K(e.categoryMatchesMap,(r,n)=>{e.categoryMatches.push(lS[n].tokenTypeIdx)})})}function $1(t){K(t,e=>{cS([],e)})}function cS(t,e){K(t,r=>{e.categoryMatchesMap[r.tokenTypeIdx]=!0}),K(e.CATEGORIES,r=>{let n=t.concat(e);et(n,r)||cS(n,r)})}function Dh(t){return W(t,"tokenTypeIdx")}function uS(t){return W(t,"CATEGORIES")}function E1(t){return W(t,"categoryMatches")}function _1(t){return W(t,"categoryMatchesMap")}function fS(t){return W(t,"tokenTypeIdx")}var Oh={buildUnableToPopLexerModeMessage(t){return`Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(t,e,r,n,i){return`unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${r} characters.`}};var tt;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(tt||(tt={}));var xu={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:Oh,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(xu);var mt=class{constructor(e,r=xu){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:u}=gu(o),l=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&l(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,u}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Jt({},xu,r);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===xu.lineTerminatorsPattern)this.config.lineTerminatorsPattern=iS;else if(this.config.lineTerminatorCharacters===xu.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),z(e)?i={modes:{defaultMode:We(e)},defaultMode:ta}:(o=!1,i=We(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(eS(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat(tS(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},K(i.modes,(a,u)=>{i.modes[u]=Bi(a,l=>ur(l))});let s=je(i.modes);if(K(i.modes,(a,u)=>{this.TRACE_INIT(`Mode: <${u}> processing`,()=>{if(this.modes.push(u),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(Zw(a,s))}),se(this.lexerDefinitionErrors)){pi(a);let l;this.TRACE_INIT("analyzeTokenTypes",()=>{l=Qw(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[u]=l.patternIdxToConfig,this.charCodeToPatternIdxToConfig[u]=l.charCodeToPatternIdxToConfig,this.emptyGroups=Jt({},this.emptyGroups,l.emptyGroups),this.hasCustom=l.hasCustom||this.hasCustom,this.canModeBeOptimized[u]=l.canBeOptimized}})}),this.defaultMode=i.defaultMode,!se(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let u=L(this.lexerDefinitionErrors,l=>l.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+u)}K(this.lexerDefinitionWarning,a=>{yu(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(Ph?(this.chopInput=wr,this.match=this.matchWithTest):(this.updateLastIndex=at,this.match=this.matchWithExec),o&&(this.handleModes=at),this.trackStartLines===!1&&(this.computeNewColumn=wr),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=at),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=ut(this.canModeBeOptimized,(u,l,c)=>(l===!1&&u.push(c),u),[]);if(r.ensureOptimizations&&!se(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{Bw()}),this.TRACE_INIT("toFastProperties",()=>{Tu(this)})})}tokenize(e,r=this.defaultMode){if(!se(this.lexerDefinitionErrors)){let i=L(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)}tokenizeInternal(e,r){let n,i,o,s,a,u,l,c,f,m,T,w,A,_,C,v,g=e,E=g.length,D=0,X=0,ge=this.hasCustom?0:Math.floor(e.length/10),$e=new Array(ge),Gt=[],vt=this.trackStartLines?1:void 0,M=this.trackStartLines?1:void 0,S=rS(this.emptyGroups),q=this.trackStartLines,G=this.config.lineTerminatorsPattern,ue=0,ee=[],Q=[],xt=[],lt=[];Object.freeze(lt);let me;function $r(){return ee}function Kn(Rt){let Zt=qn(Rt),vn=Q[Zt];return vn===void 0?lt:vn}let ya=Rt=>{if(xt.length===1&&Rt.tokenType.PUSH_MODE===void 0){let Zt=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(Rt);Gt.push({offset:Rt.startOffset,line:Rt.startLine,column:Rt.startColumn,length:Rt.image.length,message:Zt})}else{xt.pop();let Zt=Fn(xt);ee=this.patternIdxToConfig[Zt],Q=this.charCodeToPatternIdxToConfig[Zt],ue=ee.length;let vn=this.canModeBeOptimized[Zt]&&this.config.safeMode===!1;Q&&vn?me=Kn:me=$r}};function Yi(Rt){xt.push(Rt),Q=this.charCodeToPatternIdxToConfig[Rt],ee=this.patternIdxToConfig[Rt],ue=ee.length,ue=ee.length;let Zt=this.canModeBeOptimized[Rt]&&this.config.safeMode===!1;Q&&Zt?me=Kn:me=$r}Yi.call(this,r);let lr,Po=this.config.recoveryEnabled;for(;D<E;){u=null;let Rt=g.charCodeAt(D),Zt=me(Rt),vn=Zt.length;for(n=0;n<vn;n++){lr=Zt[n];let jt=lr.pattern;l=null;let ct=lr.short;if(ct!==!1?Rt===ct&&(u=jt):lr.isCustom===!0?(v=jt.exec(g,D,$e,S),v!==null?(u=v[0],v.payload!==void 0&&(l=v.payload)):u=null):(this.updateLastIndex(jt,D),u=this.match(jt,e,D)),u!==null){if(a=lr.longerAlt,a!==void 0){let qr=a.length;for(o=0;o<qr;o++){let Er=ee[a[o]],vr=Er.pattern;if(c=null,Er.isCustom===!0?(v=vr.exec(g,D,$e,S),v!==null?(s=v[0],v.payload!==void 0&&(c=v.payload)):s=null):(this.updateLastIndex(vr,D),s=this.match(vr,e,D)),s&&s.length>u.length){u=s,l=c,lr=Er;break}}}break}}if(u!==null){if(f=u.length,m=lr.group,m!==void 0&&(T=lr.tokenTypeIdx,w=this.createTokenInstance(u,D,T,lr.tokenType,vt,M,f),this.handlePayload(w,l),m===!1?X=this.addToken($e,X,w):S[m].push(w)),e=this.chopInput(e,f),D=D+f,M=this.computeNewColumn(M,f),q===!0&&lr.canLineTerminator===!0){let jt=0,ct,qr;G.lastIndex=0;do ct=G.test(u),ct===!0&&(qr=G.lastIndex-1,jt++);while(ct===!0);jt!==0&&(vt=vt+jt,M=f-qr,this.updateTokenEndLineColumnLocation(w,m,qr,jt,vt,M,f))}this.handleModes(lr,ya,Yi,w)}else{let jt=D,ct=vt,qr=M,Er=Po===!1;for(;Er===!1&&D<E;)for(e=this.chopInput(e,1),D++,i=0;i<ue;i++){let vr=ee[i],Ji=vr.pattern,Ti=vr.short;if(Ti!==!1?g.charCodeAt(D)===Ti&&(Er=!0):vr.isCustom===!0?Er=Ji.exec(g,D,$e,S)!==null:(this.updateLastIndex(Ji,D),Er=Ji.exec(e)!==null),Er===!0)break}if(A=D-jt,M=this.computeNewColumn(M,A),C=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(g,jt,A,ct,qr),Gt.push({offset:jt,line:ct,column:qr,length:A,message:C}),Po===!1)break}}return this.hasCustom||($e.length=X),{tokens:$e,groups:S,errors:Gt}}handleModes(e,r,n,i){if(e.pop===!0){let o=e.push;r(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,r){return e.substring(r)}updateLastIndex(e,r){e.lastIndex=r}updateTokenEndLineColumnLocation(e,r,n,i,o,s,a){let u,l;r!==void 0&&(u=n===a-1,l=u?-1:0,i===1&&u===!0||(e.endLine=o+l,e.endColumn=s-1+-l))}computeNewColumn(e,r){return e+r}createOffsetOnlyToken(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,r,n,i,o,s){return{image:e,startOffset:r,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:r+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,r,n){return e.push(n),r}addTokenUsingMemberAccess(e,r,n){return e[r]=n,r++,r}handlePayloadNoCustom(e,r){}handlePayloadWithCustom(e,r){r!==null&&(e.payload=r)}matchWithTest(e,r,n){return e.test(r)===!0?r.substring(n,e.lastIndex):null}matchWithExec(e,r){let n=e.exec(r);return n!==null?n[0]:null}};mt.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";mt.NA=/NOT_APPLICABLE/;function mi(t){return Lh(t)?t.LABEL:t.name}function Lh(t){return Dt(t.LABEL)&&t.LABEL!==""}var N1="parent",dS="categories",pS="label",mS="group",hS="push_mode",yS="pop_mode",gS="longer_alt",TS="line_breaks",vS="start_chars_hint";function Ef(t){return I1(t)}function I1(t){let e=t.pattern,r={};if(r.name=t.name,ur(e)||(r.PATTERN=e),W(t,N1))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return W(t,dS)&&(r.CATEGORIES=t[dS]),pi([r]),W(t,pS)&&(r.LABEL=t[pS]),W(t,mS)&&(r.GROUP=t[mS]),W(t,yS)&&(r.POP_MODE=t[yS]),W(t,hS)&&(r.PUSH_MODE=t[hS]),W(t,gS)&&(r.LONGER_ALT=t[gS]),W(t,TS)&&(r.LINE_BREAKS=t[TS]),W(t,vS)&&(r.START_CHARS_HINT=t[vS]),r}var gn=Ef({name:"EOF",pattern:mt.NA});pi([gn]);function $o(t,e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function Ru(t,e){return di(t,e)}var hi={buildMismatchTokenMessage({expected:t,actual:e,previous:r,ruleName:n}){return`Expecting ${Lh(t)?`--> ${mi(t)} <--`:`token of type --> ${t.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:t,ruleName:e}){return"Redundant input, expecting EOF but found: "+t.image},buildNoViableAltMessage({expectedPathsPerAlt:t,actual:e,previous:r,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+qt(e).image+"'";if(n)return o+n+a;{let u=ut(t,(m,T)=>m.concat(T),[]),l=L(u,m=>`[${L(m,T=>mi(T)).join(", ")}]`),f=`one of these possible Token sequences:
${L(l,(m,T)=>`  ${T+1}. ${m}`).join(`
`)}`;return o+f+a}},buildEarlyExitMessage({expectedIterationPaths:t,actual:e,customUserDescription:r,ruleName:n}){let i="Expecting: ",s=`
but found: '`+qt(e).image+"'";if(r)return i+r+s;{let u=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${L(t,l=>`[${L(l,c=>mi(c)).join(",")}]`).join(" ,")}>`;return i+u+s}}};Object.freeze(hi);var xS={buildRuleNotFoundError(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-"}},Tn={buildDuplicateFoundError(t,e){function r(c){return c instanceof ae?c.terminalType.name:c instanceof Ce?c.nonTerminalName:""}let n=t.name,i=qt(e),o=i.idx,s=kr(i),a=r(i),u=o>0,l=`->${s}${u?o:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError(t){return`Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`},buildAlternationPrefixAmbiguityError(t){let e=L(t.prefixPath,i=>mi(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx;return`Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`},buildAlternationAmbiguityError(t){let e=L(t.prefixPath,i=>mi(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError(t){let e=kr(t.repetition);return t.repetition.idx!==0&&(e+=t.repetition.idx),`The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`},buildTokenNameError(t){return"deprecated"},buildEmptyAlternationError(t){return`Ambiguous empty alternative: <${t.emptyChoiceIdx+1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`},buildTooManyAlternativesError(t){return`An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length+1} alternatives.`},buildLeftRecursionError(t){let e=t.topLevelRule.name,r=L(t.leftRecursionPath,o=>o.name),n=`${e} --> ${r.concat([e]).join(" --> ")}`;return`Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(t){return"deprecated"},buildDuplicateRuleNameError(t){let e;return t.topLevelRule instanceof yr?e=t.topLevelRule.name:e=t.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`}};function RS(t,e){let r=new Mh(t,e);return r.resolveRefs(),r.errors}var Mh=class extends gr{constructor(e,r){super(),this.nameToTopRule=e,this.errMsgProvider=r,this.errors=[]}resolveRefs(){K(Pe(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let r=this.nameToTopRule[e.nonTerminalName];if(r)e.referencedRule=r;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:Ot.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var Fh=class extends fi{constructor(e,r){super(),this.topProd=e,this.path=r,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=We(this.path.ruleStack).reverse(),this.occurrenceStack=We(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,r=[]){this.found||super.walk(e,r)}walkProdRef(e,r,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=r.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){se(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},_f=class extends Fh{constructor(e,r){super(e,r),this.path=r,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,r,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=r.concat(n),o=new Be({definition:i});this.possibleTokTypes=Co(o),this.found=!0}}},na=class extends fi{constructor(e,r){super(),this.topRule=e,this.occurrence=r,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},Nf=class extends na{walkMany(e,r,n){if(e.idx===this.occurrence){let i=qt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,r,n)}},bu=class extends na{walkManySep(e,r,n){if(e.idx===this.occurrence){let i=qt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,r,n)}},If=class extends na{walkAtLeastOne(e,r,n){if(e.idx===this.occurrence){let i=qt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,r,n)}},wu=class extends na{walkAtLeastOneSep(e,r,n){if(e.idx===this.occurrence){let i=qt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,r,n)}};function Pf(t,e,r=[]){r=We(r);let n=[],i=0;function o(a){return a.concat(Tt(t,i+1))}function s(a){let u=Pf(o(a),e,r);return n.concat(u)}for(;r.length<e&&i<t.length;){let a=t[i];if(a instanceof Be)return s(a.definition);if(a instanceof Ce)return s(a.definition);if(a instanceof ke)n=s(a.definition);else if(a instanceof ze){let u=a.definition.concat([new pe({definition:a.definition})]);return s(u)}else if(a instanceof Ve){let u=[new Be({definition:a.definition}),new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})];return s(u)}else if(a instanceof Me){let u=a.definition.concat([new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})]);n=s(u)}else if(a instanceof pe){let u=a.definition.concat([new pe({definition:a.definition})]);n=s(u)}else{if(a instanceof Fe)return K(a.definition,u=>{se(u.definition)===!1&&(n=s(u.definition))}),n;if(a instanceof ae)r.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:Tt(t,i)}),n}function Df(t,e,r,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,u=e.length,l=u-n-1,c=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!se(f);){let m=f.pop();if(m===s){a&&Fn(f).idx<=l&&f.pop();continue}let T=m.def,w=m.idx,A=m.ruleStack,_=m.occurrenceStack;if(se(T))continue;let C=T[0];if(C===i){let v={idx:w,def:Tt(T),ruleStack:ci(A),occurrenceStack:ci(_)};f.push(v)}else if(C instanceof ae)if(w<u-1){let v=w+1,g=e[v];if(r(g,C.terminalType)){let E={idx:v,def:Tt(T),ruleStack:A,occurrenceStack:_};f.push(E)}}else if(w===u-1)c.push({nextTokenType:C.terminalType,nextTokenOccurrence:C.idx,ruleStack:A,occurrenceStack:_}),a=!0;else throw Error("non exhaustive match");else if(C instanceof Ce){let v=We(A);v.push(C.nonTerminalName);let g=We(_);g.push(C.idx);let E={idx:w,def:C.definition.concat(o,Tt(T)),ruleStack:v,occurrenceStack:g};f.push(E)}else if(C instanceof ke){let v={idx:w,def:Tt(T),ruleStack:A,occurrenceStack:_};f.push(v),f.push(s);let g={idx:w,def:C.definition.concat(Tt(T)),ruleStack:A,occurrenceStack:_};f.push(g)}else if(C instanceof ze){let v=new pe({definition:C.definition,idx:C.idx}),g=C.definition.concat([v],Tt(T)),E={idx:w,def:g,ruleStack:A,occurrenceStack:_};f.push(E)}else if(C instanceof Ve){let v=new ae({terminalType:C.separator}),g=new pe({definition:[v].concat(C.definition),idx:C.idx}),E=C.definition.concat([g],Tt(T)),D={idx:w,def:E,ruleStack:A,occurrenceStack:_};f.push(D)}else if(C instanceof Me){let v={idx:w,def:Tt(T),ruleStack:A,occurrenceStack:_};f.push(v),f.push(s);let g=new ae({terminalType:C.separator}),E=new pe({definition:[g].concat(C.definition),idx:C.idx}),D=C.definition.concat([E],Tt(T)),X={idx:w,def:D,ruleStack:A,occurrenceStack:_};f.push(X)}else if(C instanceof pe){let v={idx:w,def:Tt(T),ruleStack:A,occurrenceStack:_};f.push(v),f.push(s);let g=new pe({definition:C.definition,idx:C.idx}),E=C.definition.concat([g],Tt(T)),D={idx:w,def:E,ruleStack:A,occurrenceStack:_};f.push(D)}else if(C instanceof Fe)for(let v=C.definition.length-1;v>=0;v--){let g=C.definition[v],E={idx:w,def:g.definition.concat(Tt(T)),ruleStack:A,occurrenceStack:_};f.push(E),f.push(s)}else if(C instanceof Be)f.push({idx:w,def:C.definition.concat(Tt(T)),ruleStack:A,occurrenceStack:_});else if(C instanceof yr)f.push(P1(C,w,A,_));else throw Error("non exhaustive match")}return c}function P1(t,e,r,n){let i=We(r);i.push(t.name);let o=We(n);return o.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:o}}var rt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(rt||(rt={}));function Su(t){if(t instanceof ke||t==="Option")return rt.OPTION;if(t instanceof pe||t==="Repetition")return rt.REPETITION;if(t instanceof ze||t==="RepetitionMandatory")return rt.REPETITION_MANDATORY;if(t instanceof Ve||t==="RepetitionMandatoryWithSeparator")return rt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof Me||t==="RepetitionWithSeparator")return rt.REPETITION_WITH_SEPARATOR;if(t instanceof Fe||t==="Alternation")return rt.ALTERNATION;throw Error("non exhaustive match")}function Lf(t){let{occurrence:e,rule:r,prodType:n,maxLookahead:i}=t,o=Su(n);return o===rt.ALTERNATION?ia(e,r,i):oa(e,r,o,i)}function wS(t,e,r,n,i,o){let s=ia(t,e,r),a=ES(s)?ra:di;return o(s,n,a,i)}function SS(t,e,r,n,i,o){let s=oa(t,e,i,r),a=ES(s)?ra:di;return o(s[0],a,n)}function AS(t,e,r,n){let i=t.length,o=ar(t,s=>ar(s,a=>a.length===1));if(e)return function(s){let a=L(s,u=>u.GATE);for(let u=0;u<i;u++){let l=t[u],c=l.length,f=a[u];if(!(f!==void 0&&f.call(this)===!1))e:for(let m=0;m<c;m++){let T=l[m],w=T.length;for(let A=0;A<w;A++){let _=this.LA(A+1);if(r(_,T[A])===!1)continue e}return u}}};if(o&&!n){let s=L(t,u=>gt(u)),a=ut(s,(u,l,c)=>(K(l,f=>{W(u,f.tokenTypeIdx)||(u[f.tokenTypeIdx]=c),K(f.categoryMatches,m=>{W(u,m)||(u[m]=c)})}),u),{});return function(){let u=this.LA(1);return a[u.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=t[s],u=a.length;e:for(let l=0;l<u;l++){let c=a[l],f=c.length;for(let m=0;m<f;m++){let T=this.LA(m+1);if(r(T,c[m])===!1)continue e}return s}}}}function CS(t,e,r){let n=ar(t,o=>o.length===1),i=t.length;if(n&&!r){let o=gt(t);if(o.length===1&&se(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=ut(o,(a,u,l)=>(a[u.tokenTypeIdx]=!0,K(u.categoryMatches,c=>{a[c]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=t[o],a=s.length;for(let u=0;u<a;u++){let l=this.LA(u+1);if(e(l,s[u])===!1)continue e}return!0}return!1}}var qh=class extends fi{constructor(e,r,n){super(),this.topProd=e,this.targetOccurrence=r,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,r,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===r?(this.restDef=n.concat(i),!0):!1}walkOption(e,r,n){this.checkIsTarget(e,rt.OPTION,r,n)||super.walkOption(e,r,n)}walkAtLeastOne(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY,r,n)||super.walkOption(e,r,n)}walkAtLeastOneSep(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}walkMany(e,r,n){this.checkIsTarget(e,rt.REPETITION,r,n)||super.walkOption(e,r,n)}walkManySep(e,r,n){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}},Of=class extends gr{constructor(e,r,n){super(),this.targetOccurrence=e,this.targetProdType=r,this.targetRef=n,this.result=[]}checkIsTarget(e,r){e.idx===this.targetOccurrence&&this.targetProdType===r&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,rt.OPTION)}visitRepetition(e){this.checkIsTarget(e,rt.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,rt.ALTERNATION)}};function bS(t){let e=new Array(t);for(let r=0;r<t;r++)e[r]=[];return e}function Uh(t){let e=[""];for(let r=0;r<t.length;r++){let n=t[r],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let u="_"+n.categoryMatches[a];i.push(s+u)}}e=i}return e}function D1(t,e,r){for(let n=0;n<t.length;n++){if(n===r)continue;let i=t[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function kS(t,e){let r=L(t,s=>Pf([s],1)),n=bS(r.length),i=L(r,s=>{let a={};return K(s,u=>{let l=Uh(u.partialPath);K(l,c=>{a[c]=!0})}),a}),o=r;for(let s=1;s<=e;s++){let a=o;o=bS(a.length);for(let u=0;u<a.length;u++){let l=a[u];for(let c=0;c<l.length;c++){let f=l[c].partialPath,m=l[c].suffixDef,T=Uh(f);if(D1(i,T,u)||se(m)||f.length===e){let A=n[u];if(Mf(A,f)===!1){A.push(f);for(let _=0;_<T.length;_++){let C=T[_];i[u][C]=!0}}}else{let A=Pf(m,s+1,f);o[u]=o[u].concat(A),K(A,_=>{let C=Uh(_.partialPath);K(C,v=>{i[u][v]=!0})})}}}}return n}function ia(t,e,r,n){let i=new Of(t,rt.ALTERNATION,n);return e.accept(i),kS(i.result,r)}function oa(t,e,r,n){let i=new Of(t,r);e.accept(i);let o=i.result,a=new qh(e,t,r).startWalking(),u=new Be({definition:o}),l=new Be({definition:a});return kS([u,l],n)}function Mf(t,e){e:for(let r=0;r<t.length;r++){let n=t[r];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function $S(t,e){return t.length<e.length&&ar(t,(r,n)=>{let i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}function ES(t){return ar(t,e=>ar(e,r=>ar(r,n=>se(n.categoryMatches))))}function _S(t){let e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return L(e,r=>Object.assign({type:Ot.CUSTOM_LOOKAHEAD_VALIDATION},r))}function NS(t,e,r,n){let i=Qt(t,u=>O1(u,r)),o=K1(t,e,r),s=Qt(t,u=>F1(u,r)),a=Qt(t,u=>M1(u,t,n,r));return i.concat(o,s,a)}function O1(t,e){let r=new Kh;t.accept(r);let n=r.allProductions,i=Ah(n,L1),o=Cr(i,a=>a.length>1);return L(Pe(o),a=>{let u=qt(a),l=e.buildDuplicateFoundError(t,a),c=kr(u),f={message:l,type:Ot.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:c,occurrence:u.idx},m=IS(u);return m&&(f.parameter=m),f})}function L1(t){return`${kr(t)}_#_${t.idx}_#_${IS(t)}`}function IS(t){return t instanceof ae?t.terminalType.name:t instanceof Ce?t.nonTerminalName:""}var Kh=class extends gr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function M1(t,e,r,n){let i=[];if(ut(e,(s,a)=>a.name===t.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:s,type:Ot.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}function PS(t,e,r){let n=[],i;return et(e,t)||(i=`Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `,n.push({message:i,type:Ot.INVALID_RULE_OVERRIDE,ruleName:t})),n}function jh(t,e,r,n=[]){let i=[],o=Ff(e.definition);if(se(o))return[];{let s=t.name;et(o,t)&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:Ot.LEFT_RECURSION,ruleName:s});let u=Wi(o,n.concat([t])),l=Qt(u,c=>{let f=We(n);return f.push(c),jh(t,c,r,f)});return i.concat(l)}}function Ff(t){let e=[];if(se(t))return e;let r=qt(t);if(r instanceof Ce)e.push(r.referencedRule);else if(r instanceof Be||r instanceof ke||r instanceof ze||r instanceof Ve||r instanceof Me||r instanceof pe)e=e.concat(Ff(r.definition));else if(r instanceof Fe)e=gt(L(r.definition,o=>Ff(o.definition)));else if(!(r instanceof ae))throw Error("non exhaustive match");let n=Ao(r),i=t.length>1;if(n&&i){let o=Tt(t);return e.concat(Ff(o))}else return e}var Au=class extends gr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function DS(t,e){let r=new Au;t.accept(r);let n=r.alternations;return Qt(n,o=>{let s=ci(o.definition);return Qt(s,(a,u)=>{let l=Df([a],[],di,1);return se(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:o,emptyChoiceIdx:u}),type:Ot.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:o.idx,alternative:u+1}]:[]})})}function OS(t,e,r){let n=new Au;t.accept(n);let i=n.alternations;return i=Bi(i,s=>s.ignoreAmbiguities===!0),Qt(i,s=>{let a=s.idx,u=s.maxLookahead||e,l=ia(a,t,u,s),c=U1(l,s,t,r),f=q1(l,s,t,r);return c.concat(f)})}var Gh=class extends gr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function F1(t,e){let r=new Au;t.accept(r);let n=r.alternations;return Qt(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:o}),type:Ot.TOO_MANY_ALTS,ruleName:t.name,occurrence:o.idx}]:[])}function LS(t,e,r){let n=[];return K(t,i=>{let o=new Gh;i.accept(o);let s=o.allProductions;K(s,a=>{let u=Su(a),l=a.maxLookahead||e,c=a.idx,m=oa(c,i,u,l)[0];if(se(gt(m))){let T=r.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:T,type:Ot.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function U1(t,e,r,n){let i=[],o=ut(t,(a,u,l)=>(e.definition[l].ignoreAmbiguities===!0||K(u,c=>{let f=[l];K(t,(m,T)=>{l!==T&&Mf(m,c)&&e.definition[T].ignoreAmbiguities!==!0&&f.push(T)}),f.length>1&&!Mf(i,c)&&(i.push(c),a.push({alts:f,path:c}))}),a),[]);return L(o,a=>{let u=L(a.alts,c=>c+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:u,prefixPath:a.path}),type:Ot.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:a.alts}})}function q1(t,e,r,n){let i=ut(t,(s,a,u)=>{let l=L(a,c=>({idx:u,path:c}));return s.concat(l)},[]);return Mn(Qt(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let u=s.idx,l=s.path,c=Ut(i,m=>e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<u&&$S(m.path,l));return L(c,m=>{let T=[m.idx+1,u+1],w=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:T,prefixPath:m.path}),type:Ot.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:w,alternatives:T}})}))}function K1(t,e,r){let n=[],i=L(e,o=>o.name);return K(t,o=>{let s=o.name;if(et(i,s)){let a=r.buildNamespaceConflictError(o);n.push({message:a,type:Ot.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function MS(t){let e=Xs(t,{errMsgProvider:xS}),r={};return K(t.rules,n=>{r[n.name]=n}),RS(r,e.errMsgProvider)}function FS(t){return t=Xs(t,{errMsgProvider:Tn}),NS(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}var US="MismatchedTokenException",qS="NoViableAltException",KS="EarlyExitException",GS="NotAllInputParsedException",jS=[US,qS,KS,GS];Object.freeze(jS);function zi(t){return et(jS,t.name)}var sa=class extends Error{constructor(e,r){super(e),this.token=r,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},Eo=class extends sa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=US}},Cu=class extends sa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=qS}},ku=class extends sa{constructor(e,r){super(e,r),this.name=GS}},$u=class extends sa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=KS}};var Hh={},Bh="InRuleRecoveryException",Wh=class extends Error{constructor(e){super(e),this.name=Bh}},Uf=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=W(e,"recoveryEnabled")?e.recoveryEnabled:Tr.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=G1)}getTokenToInsert(e){let r=$o(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,r,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],u=!1,l=this.LA(1),c=this.LA(1),f=()=>{let m=this.LA(0),T=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:l,previous:m,ruleName:this.getCurrRuleFullName()}),w=new Eo(T,l,this.LA(0));w.resyncedTokens=ci(a),this.SAVE_ERROR(w)};for(;!u;)if(this.tokenMatcher(c,i)){f();return}else if(n.call(this)){f(),e.apply(this,r);return}else this.tokenMatcher(c,o)?u=!0:(c=this.SKIP_TOKEN(),this.addToResyncTokens(c,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))}getFollowsForInRuleRecovery(e,r){let n=this.getCurrentGrammarPath(e,r);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new Wh("sad sad panda")}canPerformInRuleRecovery(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,r){if(!this.canTokenTypeBeInsertedInRecovery(e)||se(r))return!1;let n=this.LA(1);return Un(r,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return et(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),r=this.LA(1),n=2;for(;;){let i=Un(e,o=>Ru(r,o));if(i!==void 0)return i;r=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return Hh;let e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,r=this.RULE_OCCURRENCE_STACK;return L(e,(n,i)=>i===0?Hh:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:r[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=L(this.buildFullFollowKeyStack(),r=>this.getFollowSetFromFollowKey(r));return gt(e)}getFollowSetFromFollowKey(e){if(e===Hh)return[gn];let r=e.ruleName+e.idxInCallingRule+wf+e.inRule;return this.resyncFollows[r]}addToResyncTokens(e,r){return this.tokenMatcher(e,gn)||r.push(e),r}reSyncTo(e){let r=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return ci(r)}attemptInRepetitionRecovery(e,r,n,i,o,s,a){}getCurrentGrammarPath(e,r){let n=this.getHumanReadableRuleStack(),i=We(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r}}getHumanReadableRuleStack(){return L(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function G1(t,e,r,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),u=this.firstAfterRepMap[a];if(u===void 0){let m=this.getCurrRuleFullName(),T=this.getGAstProductions()[m];u=new o(T,i).startWalking(),this.firstAfterRepMap[a]=u}let l=u.token,c=u.occurrence,f=u.isEndOfRule;this.RULE_STACK.length===1&&f&&l===void 0&&(l=gn,c=1),!(l===void 0||c===void 0)&&this.shouldInRepetitionRecoveryBeTried(l,c,s)&&this.tryInRepetitionRecovery(t,e,r,l)}function qf(t,e,r){return r|e|t}var Gte=32-8;var yi=class{constructor(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:Tr.maxLookahead}validate(e){let r=this.validateNoLeftRecursion(e.rules);if(se(r)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...r,...n,...i,...o]}return r}validateNoLeftRecursion(e){return Qt(e,r=>jh(r,r,Tn))}validateEmptyOrAlternatives(e){return Qt(e,r=>DS(r,Tn))}validateAmbiguousAlternationAlternatives(e,r){return Qt(e,n=>OS(n,r,Tn))}validateSomeNonEmptyLookaheadPath(e,r){return LS(e,r,Tn)}buildLookaheadForAlternation(e){return wS(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,AS)}buildLookaheadForOptional(e){return SS(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,Su(e.prodType),CS)}};var Gf=class{initLooksAhead(e){this.dynamicTokensEnabled=W(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:Tr.dynamicTokensEnabled,this.maxLookahead=W(e,"maxLookahead")?e.maxLookahead:Tr.maxLookahead,this.lookaheadStrategy=W(e,"lookaheadStrategy")?e.lookaheadStrategy:new yi({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){K(e,r=>{this.TRACE_INIT(`${r.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:u}=j1(r);K(n,l=>{let c=l.idx===0?"":l.idx;this.TRACE_INIT(`${kr(l)}${c}`,()=>{let f=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:l.idx,rule:r,maxLookahead:l.maxLookahead||this.maxLookahead,hasPredicates:l.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),m=qf(this.fullRuleNameToShort[r.name],256,l.idx);this.setLaFuncCache(m,f)})}),K(i,l=>{this.computeLookaheadFunc(r,l.idx,768,"Repetition",l.maxLookahead,kr(l))}),K(o,l=>{this.computeLookaheadFunc(r,l.idx,512,"Option",l.maxLookahead,kr(l))}),K(s,l=>{this.computeLookaheadFunc(r,l.idx,1024,"RepetitionMandatory",l.maxLookahead,kr(l))}),K(a,l=>{this.computeLookaheadFunc(r,l.idx,1536,"RepetitionMandatoryWithSeparator",l.maxLookahead,kr(l))}),K(u,l=>{this.computeLookaheadFunc(r,l.idx,1280,"RepetitionWithSeparator",l.maxLookahead,kr(l))})})})}computeLookaheadFunc(e,r,n,i,o,s){this.TRACE_INIT(`${s}${r===0?"":r}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),u=qf(this.fullRuleNameToShort[e.name],n,r);this.setLaFuncCache(u,a)})}getKeyForAutomaticLookahead(e,r){let n=this.getLastExplicitRuleShortName();return qf(n,e,r)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,r){this.lookAheadFuncsCache.set(e,r)}},zh=class extends gr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},Kf=new zh;function j1(t){Kf.reset(),t.accept(Kf);let e=Kf.dslMethods;return Kf.reset(),e}function Yh(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}function Jh(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}function HS(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}function WS(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}var H1="name";function Qh(t,e){Object.defineProperty(t,H1,{enumerable:!1,configurable:!0,writable:!1,value:e})}function W1(t,e){let r=je(t),n=r.length;for(let i=0;i<n;i++){let o=r[i],s=t[o],a=s.length;for(let u=0;u<a;u++){let l=s[u];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}}function BS(t,e){let r=function(){};Qh(r,t+"BaseSemantics");let n={visit:function(i,o){if(z(i)&&(i=i[0]),!ur(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=B1(this,e);if(!se(i)){let o=L(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}function zS(t,e,r){let n=function(){};Qh(n,t+"BaseSemanticsWithDefaults");let i=Object.create(r.prototype);return K(e,o=>{i[o]=W1}),n.prototype=i,n.prototype.constructor=n,n}var Zh;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(Zh||(Zh={}));function B1(t,e){return z1(t,e)}function z1(t,e){let r=Ut(e,i=>hr(t[i])===!1),n=L(r,i=>({msg:`Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,type:Zh.MISSING_METHOD,methodName:i}));return Mn(n)}var Bf=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=W(e,"nodeLocationTracking")?e.nodeLocationTracking:Tr.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=at,this.cstFinallyStateUpdate=at,this.cstPostTerminal=at,this.cstPostNonTerminal=at,this.cstPostRule=at;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Jh,this.setNodeLocationFromNode=Jh,this.cstPostRule=at,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=at,this.setNodeLocationFromNode=at,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Yh,this.setNodeLocationFromNode=Yh,this.cstPostRule=at,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=at,this.setNodeLocationFromNode=at,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=at,this.setNodeLocationFromNode=at,this.cstPostRule=at,this.setInitialNodeLocation=at;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN}cstPostTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];HS(n,r,e),this.setNodeLocationFromToken(n.location,r)}cstPostNonTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];WS(n,r,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(ur(this.baseCstVisitorConstructor)){let e=BS(this.className,je(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(ur(this.baseCstVisitorWithDefaultsConstructor)){let e=zS(this.className,je(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var zf=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):aa}LA(e){let r=this.currIdx+e;return r<0||this.tokVectorLength<=r?aa:this.tokVector[r]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var Vf=class{ACTION(e){return e.call(this)}consume(e,r,n){return this.consumeInternal(r,e,n)}subrule(e,r,n){return this.subruleInternal(r,e,n)}option(e,r){return this.optionInternal(r,e)}or(e,r){return this.orInternal(r,e)}many(e,r){return this.manyInternal(e,r)}atLeastOne(e,r){return this.atLeastOneInternal(e,r)}CONSUME(e,r){return this.consumeInternal(e,0,r)}CONSUME1(e,r){return this.consumeInternal(e,1,r)}CONSUME2(e,r){return this.consumeInternal(e,2,r)}CONSUME3(e,r){return this.consumeInternal(e,3,r)}CONSUME4(e,r){return this.consumeInternal(e,4,r)}CONSUME5(e,r){return this.consumeInternal(e,5,r)}CONSUME6(e,r){return this.consumeInternal(e,6,r)}CONSUME7(e,r){return this.consumeInternal(e,7,r)}CONSUME8(e,r){return this.consumeInternal(e,8,r)}CONSUME9(e,r){return this.consumeInternal(e,9,r)}SUBRULE(e,r){return this.subruleInternal(e,0,r)}SUBRULE1(e,r){return this.subruleInternal(e,1,r)}SUBRULE2(e,r){return this.subruleInternal(e,2,r)}SUBRULE3(e,r){return this.subruleInternal(e,3,r)}SUBRULE4(e,r){return this.subruleInternal(e,4,r)}SUBRULE5(e,r){return this.subruleInternal(e,5,r)}SUBRULE6(e,r){return this.subruleInternal(e,6,r)}SUBRULE7(e,r){return this.subruleInternal(e,7,r)}SUBRULE8(e,r){return this.subruleInternal(e,8,r)}SUBRULE9(e,r){return this.subruleInternal(e,9,r)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,r,n=ua){if(et(this.definedRulesNames,e)){let s={message:Tn.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:Ot.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,r,n);return this[e]=i,i}OVERRIDE_RULE(e,r,n=ua){let i=PS(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,r,n);return this[e]=o,o}BACKTRACK(e,r){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if(zi(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return bf(Pe(this.gastProductionsCache))}};var Xf=class{initRecognizerEngine(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=ra,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},W(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(z(e)){if(se(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(z(e))this.tokensMap=ut(e,(o,s)=>(o[s.name]=s,o),{});else if(W(e,"modes")&&ar(gt(Pe(e.modes)),fS)){let o=gt(Pe(e.modes)),s=Ys(o);this.tokensMap=ut(s,(a,u)=>(a[u.name]=u,a),{})}else if(st(e))this.tokensMap=We(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=gn;let n=W(e,"modes")?gt(Pe(e.modes)):Pe(e),i=ar(n,o=>se(o.categoryMatches));this.tokenMatcher=i?ra:di,pi(Pe(this.tokensMap))}defineRule(e,r,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=W(n,"resyncEnabled")?n.resyncEnabled:ua.resyncEnabled,o=W(n,"recoveryValueFunc")?n.recoveryValueFunc:ua.recoveryValueFunc,s=this.ruleShortNameIdx<<4+8;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...c){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,c);let f=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(f),f}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...c){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,c)}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:r})}invokeRuleCatch(e,r,n){let i=this.RULE_STACK.length===1,o=r&&!this.isBackTracking()&&this.recoveryEnabled;if(zi(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let u=this.CST_STACK[this.CST_STACK.length-1];return u.recoveredNode=!0,u}else return n(e);else{if(this.outputCst){let u=this.CST_STACK[this.CST_STACK.length-1];u.recoveredNode=!0,s.partialCstResult=u}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,r){let n=this.getKeyForAutomaticLookahead(512,r);return this.optionInternalLogic(e,r,n)}optionInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,r){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,r,n)}atLeastOneInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let s=r.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=r;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],i,1024,e,If)}atLeastOneSepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,r,n)}atLeastOneSepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,wu],a,1536,e,wu)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)}manyInternal(e,r){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,r,n)}manyInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let a=r.GATE;if(a!==void 0){let u=i;i=()=>a.call(this)&&u.call(this)}}else o=r;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],i,768,e,Nf,s)}manySepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,r,n)}manySepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,bu],a,1280,e,bu)}}repetitionSepSecondInternal(e,r,n,i,o){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,o],n,1536,e,o)}doSingleRepetition(e){let r=this.getLexerPosition();return e.call(this),this.getLexerPosition()>r}orInternal(e,r){let n=this.getKeyForAutomaticLookahead(256,r),i=z(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(r,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new ku(r,e))}}subruleInternal(e,r,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,r,n){throw zi(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,r,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,r,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Eo(i,r,o))}consumeInternalRecovery(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===Bh?n:o}}else throw n}saveRecogState(){let e=this.errors,r=We(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),gn)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var Yf=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=W(e,"errorMessageProvider")?e.errorMessageProvider:Tr.errorMessageProvider}SAVE_ERROR(e){if(zi(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:We(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return We(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,r,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=oa(e,o,r,this.maxLookahead)[0],u=[];for(let c=1;c<=this.maxLookahead;c++)u.push(this.LA(c));let l=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:u,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new $u(l,this.LA(1),this.LA(0)))}raiseNoAltException(e,r){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=ia(e,i,this.maxLookahead),s=[];for(let l=1;l<=this.maxLookahead;l++)s.push(this.LA(l));let a=this.LA(0),u=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new Cu(u,this.LA(1),a))}};var Jf=class{initContentAssist(){}computeContentAssist(e,r){let n=this.gastProductionsCache[e];if(ur(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return Df([n],r,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let r=qt(e.ruleStack),i=this.getGAstProductions()[r];return new _f(i,e).startWalking()}};var ed={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(ed);var VS=!0,XS=Math.pow(2,8)-1,JS=Ef({name:"RECORDING_PHASE_TOKEN",pattern:mt.NA});pi([JS]);var QS=$o(JS,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(QS);var X1={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},Qf=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let r=e>0?e:"";this[`CONSUME${r}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${r}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${r}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${r}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${r}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${r}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${r}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${r}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,r,n){return this.consumeInternalRecord(r,e,n)},this.subrule=function(e,r,n){return this.subruleInternalRecord(r,e,n)},this.option=function(e,r){return this.optionInternalRecord(r,e)},this.or=function(e,r){return this.orInternalRecord(r,e)},this.many=function(e,r){this.manyInternalRecord(e,r)},this.atLeastOne=function(e,r){this.atLeastOneInternalRecord(e,r)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let r=0;r<10;r++){let n=r>0?r:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,r){return()=>!0}LA_RECORD(e){return aa}topLevelRuleRecord(e,r){try{let n=new yr({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,r){return _u.call(this,ke,e,r)}atLeastOneInternalRecord(e,r){_u.call(this,ze,r,e)}atLeastOneSepFirstInternalRecord(e,r){_u.call(this,Ve,r,e,VS)}manyInternalRecord(e,r){_u.call(this,pe,r,e)}manySepFirstInternalRecord(e,r){_u.call(this,Me,r,e,VS)}orInternalRecord(e,r){return Y1.call(this,e,r)}subruleInternalRecord(e,r,n){if(Zf(r),!e||W(e,"ruleName")===!1){let a=new Error(`<SUBRULE${YS(r)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=Fn(this.recordingProdStack),o=e.ruleName,s=new Ce({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?X1:ed}consumeInternalRecord(e,r,n){if(Zf(r),!Dh(e)){let s=new Error(`<CONSUME${YS(r)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=Fn(this.recordingProdStack),o=new ae({idx:r,terminalType:e,label:n?.LABEL});return i.definition.push(o),QS}};function _u(t,e,r,n=!1){Zf(r);let i=Fn(this.recordingProdStack),o=hr(e)?e:e.DEF,s=new t({definition:[],idx:r});return n&&(s.separator=e.SEP),W(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),ed}function Y1(t,e){Zf(e);let r=Fn(this.recordingProdStack),n=z(t)===!1,i=n===!1?t:t.DEF,o=new Fe({definition:[],idx:e,ignoreAmbiguities:n&&t.IGNORE_AMBIGUITIES===!0});W(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);let s=hu(i,a=>hr(a.GATE));return o.hasPredicates=s,r.definition.push(o),K(i,a=>{let u=new Be({definition:[]});o.definition.push(u),W(a,"IGNORE_AMBIGUITIES")?u.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:W(a,"GATE")&&(u.ignoreAmbiguities=!0),this.recordingProdStack.push(u),a.ALT.call(this),this.recordingProdStack.pop()}),ed}function YS(t){return t===0?"":`${t}`}function Zf(t){if(t<0||t>XS){let e=new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${XS+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var td=class{initPerformanceTracer(e){if(W(e,"traceInitPerf")){let r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=Tr.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=gu(r),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return r()}};function ZS(t,e){e.forEach(r=>{let n=r.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(t.prototype,i,o):t.prototype[i]=r.prototype[i]})})}var aa=$o(gn,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(aa);var Tr=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:hi,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),ua=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),Ot;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Ot||(Ot={}));function rd(t=void 0){return function(){return t}}var Nu=class t{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let r=this.className;this.TRACE_INIT("toFastProps",()=>{Tu(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),K(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=MS({rules:Pe(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(se(n)&&this.skipValidations===!1){let i=FS({rules:Pe(this.gastProductionsCache),tokenTypes:Pe(this.tokensMap),errMsgProvider:Tn,grammarName:r}),o=_S({lookaheadStrategy:this.lookaheadStrategy,rules:Pe(this.gastProductionsCache),tokenTypes:Pe(this.tokensMap),grammarName:r});this.definitionErrors=this.definitionErrors.concat(i,o)}}),se(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=Ww(Pe(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:Pe(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(Pe(this.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!se(this.definitionErrors))throw e=L(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),W(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=W(r,"skipValidations")?r.skipValidations:Tr.skipValidations}};Nu.DEFER_DEFINITION_ERRORS_HANDLING=!1;ZS(Nu,[Uf,Gf,Bf,zf,Xf,Vf,Yf,Jf,Qf,td]);var Iu=class extends Nu{constructor(e,r=Tr){let n=We(r);n.outputCst=!1,super(e,n)}};function _o(t,e,r){return`${t.name}_${e}_${r}`}var Vi=1,Q1=2,eA=4,tA=5;var fa=7,Z1=8,eU=9,tU=10,rU=11,rA=12,Pu=class{constructor(e){this.target=e}isEpsilon(){return!1}},la=class extends Pu{constructor(e,r){super(e),this.tokenType=r}},Du=class extends Pu{constructor(e){super(e)}isEpsilon(){return!0}},ca=class extends Pu{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};function nA(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};nU(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],o=No(e,i,i);o!==void 0&&mU(e,i,o)}return e}function nU(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],o=Kt(t,i,void 0,{type:Q1}),s=Kt(t,i,void 0,{type:fa});o.stop=s,t.ruleToStartState.set(i,o),t.ruleToStopState.set(i,s)}}function iA(t,e,r){return r instanceof ae?ty(t,e,r.terminalType,r):r instanceof Ce?pU(t,e,r):r instanceof Fe?uU(t,e,r):r instanceof ke?lU(t,e,r):r instanceof pe?iU(t,e,r):r instanceof Me?oU(t,e,r):r instanceof ze?sU(t,e,r):r instanceof Ve?aU(t,e,r):No(t,e,r)}function iU(t,e,r){let n=Kt(t,e,r,{type:tA});Xi(t,n);let i=da(t,e,n,r,No(t,e,r));return sA(t,e,r,i)}function oU(t,e,r){let n=Kt(t,e,r,{type:tA});Xi(t,n);let i=da(t,e,n,r,No(t,e,r)),o=ty(t,e,r.separator,r);return sA(t,e,r,i,o)}function sU(t,e,r){let n=Kt(t,e,r,{type:eA});Xi(t,n);let i=da(t,e,n,r,No(t,e,r));return oA(t,e,r,i)}function aU(t,e,r){let n=Kt(t,e,r,{type:eA});Xi(t,n);let i=da(t,e,n,r,No(t,e,r)),o=ty(t,e,r.separator,r);return oA(t,e,r,i,o)}function uU(t,e,r){let n=Kt(t,e,r,{type:Vi});Xi(t,n);let i=L(r.definition,s=>iA(t,e,s));return da(t,e,n,r,...i)}function lU(t,e,r){let n=Kt(t,e,r,{type:Vi});Xi(t,n);let i=da(t,e,n,r,No(t,e,r));return cU(t,e,r,i)}function No(t,e,r){let n=Ut(L(r.definition,i=>iA(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:dU(t,n)}function oA(t,e,r,n,i){let o=n.left,s=n.right,a=Kt(t,e,r,{type:rU});Xi(t,a);let u=Kt(t,e,r,{type:rA});return o.loopback=a,u.loopback=a,t.decisionMap[_o(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=a,_t(s,a),i===void 0?(_t(a,o),_t(a,u)):(_t(a,u),_t(a,i.left),_t(i.right,o)),{left:o,right:u}}function sA(t,e,r,n,i){let o=n.left,s=n.right,a=Kt(t,e,r,{type:tU});Xi(t,a);let u=Kt(t,e,r,{type:rA}),l=Kt(t,e,r,{type:eU});return a.loopback=l,u.loopback=l,_t(a,o),_t(a,u),_t(s,l),i!==void 0?(_t(l,u),_t(l,i.left),_t(i.right,o)):_t(l,a),t.decisionMap[_o(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=a,{left:a,right:u}}function cU(t,e,r,n){let i=n.left,o=n.right;return _t(i,o),t.decisionMap[_o(e,"Option",r.idx)]=i,n}function Xi(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function da(t,e,r,n,...i){let o=Kt(t,e,n,{type:Z1,start:r});r.end=o;for(let a of i)a!==void 0?(_t(r,a.left),_t(a.right,o)):_t(r,o);let s={left:r,right:o};return t.decisionMap[_o(e,fU(n),n.idx)]=r,s}function fU(t){if(t instanceof Fe)return"Alternation";if(t instanceof ke)return"Option";if(t instanceof pe)return"Repetition";if(t instanceof Me)return"RepetitionWithSeparator";if(t instanceof ze)return"RepetitionMandatory";if(t instanceof Ve)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function dU(t,e){let r=e.length;for(let o=0;o<r-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let u=a instanceof ca,l=a,c=e[o+1].left;s.left.type===Vi&&s.right.type===Vi&&a!==void 0&&(u&&l.followState===s.right||a.target===s.right)?(u?l.followState=c:a.target=c,hU(t,s.right)):_t(s.right,c)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function ty(t,e,r,n){let i=Kt(t,e,n,{type:Vi}),o=Kt(t,e,n,{type:Vi});return ry(i,new la(o,r)),{left:i,right:o}}function pU(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),o=Kt(t,e,r,{type:Vi}),s=Kt(t,e,r,{type:Vi}),a=new ca(i,n,s);return ry(o,a),{left:o,right:s}}function mU(t,e,r){let n=t.ruleToStartState.get(e);_t(n,r.left);let i=t.ruleToStopState.get(e);return _t(r.right,i),{left:n,right:i}}function _t(t,e){let r=new Du(e);ry(t,r)}function Kt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function ry(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function hU(t,e){t.states.splice(t.states.indexOf(e),1)}var Ou={},pa=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=ny(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return L(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};function ny(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}function yU(t,e){let r={};return n=>{let i=n.toString(),o=r[i];return o!==void 0||(o={atnStartState:t,decision:e,states:{}},r[i]=o),o}}var nd=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},aA=new nd,Lu=class extends yi{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=nA(e.rules),this.dfas=gU(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,u=_o(n,"Alternation",r),c=this.atn.decisionMap[u].decision,f=L(Lf({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>L(m,T=>T[0]));if(uA(f,!1)&&!o){let m=ut(f,(T,w,A)=>(K(w,_=>{_&&(T[_.tokenTypeIdx]=A,K(_.categoryMatches,C=>{T[C]=A}))}),T),{});return i?function(T){var w;let A=this.LA(1),_=m[A.tokenTypeIdx];if(T!==void 0&&_!==void 0){let C=(w=T[_])===null||w===void 0?void 0:w.GATE;if(C!==void 0&&C.call(this)===!1)return}return _}:function(){let T=this.LA(1);return m[T.tokenTypeIdx]}}else return i?function(m){let T=new nd,w=m===void 0?0:m.length;for(let _=0;_<w;_++){let C=m?.[_].GATE;T.set(_,C===void 0||C.call(this))}let A=iy.call(this,s,c,T,a);return typeof A=="number"?A:void 0}:function(){let m=iy.call(this,s,c,aA,a);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,u=_o(n,i,r),c=this.atn.decisionMap[u].decision,f=L(Lf({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>L(m,T=>T[0]));if(uA(f)&&f[0][0]&&!o){let m=f[0],T=gt(m);if(T.length===1&&se(T[0].categoryMatches)){let A=T[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===A}}else{let w=ut(T,(A,_)=>(_!==void 0&&(A[_.tokenTypeIdx]=!0,K(_.categoryMatches,C=>{A[C]=!0})),A),{});return function(){let A=this.LA(1);return w[A.tokenTypeIdx]===!0}}}return function(){let m=iy.call(this,s,c,aA,a);return typeof m=="object"?!1:m===0}}};function uA(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(r.has(a)){if(!i.has(a))return!1}else r.add(a),i.add(a)}}return!0}function gU(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=yU(t.decisionStates[n],n);return r}function iy(t,e,r,n){let i=t[e](r),o=i.start;if(o===void 0){let a=$U(i.atnStartState);o=fA(i,cA(a)),i.start=o}return TU.apply(this,[i,o,r,n])}function TU(t,e,r,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let u=SU(i,a);if(u===void 0&&(u=vU.apply(this,[t,i,a,o,r,n])),u===Ou)return wU(s,i,a);if(u.isAcceptState===!0)return u.prediction;i=u,s.push(a),a=this.LA(o++)}}function vU(t,e,r,n,i,o){let s=AU(e.configs,r,i);if(s.size===0)return lA(t,e,r,Ou),Ou;let a=cA(s),u=kU(s,i);if(u!==void 0)a.isAcceptState=!0,a.prediction=u,a.configs.uniqueAlt=u;else if(IU(s)){let l=Lw(s.alts);a.isAcceptState=!0,a.prediction=l,a.configs.uniqueAlt=l,xU.apply(this,[t,n,s.alts,o])}return a=lA(t,e,r,a),a}function xU(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let o=t.atnStartState,s=o.rule,a=o.production,u=RU({topLevelRule:s,ambiguityIndices:r,production:a,prefixPath:i});n(u)}function RU(t){let e=L(t.prefixPath,i=>mi(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${bU(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function bU(t){if(t instanceof Ce)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof ze)return"AT_LEAST_ONE";if(t instanceof Ve)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}function wU(t,e,r){let n=Qt(e.configs.elements,o=>o.state.transitions),i=jw(n.filter(o=>o instanceof la).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function SU(t,e){return t.edges[e.tokenTypeIdx]}function AU(t,e,r){let n=new pa,i=[];for(let s of t.elements){if(r.is(s.alt)===!1)continue;if(s.state.type===fa){i.push(s);continue}let a=s.state.transitions.length;for(let u=0;u<a;u++){let l=s.state.transitions[u],c=CU(l,e);c!==void 0&&n.add({state:c,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new pa;for(let s of n.elements)id(s,o)}if(i.length>0&&!_U(o))for(let s of i)o.add(s);return o}function CU(t,e){if(t instanceof la&&Ru(e,t.tokenType))return t.target}function kU(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function cA(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function lA(t,e,r,n){return n=fA(t,n),e.edges[r.tokenTypeIdx]=n,n}function fA(t,e){if(e===Ou)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function $U(t){let e=new pa,r=t.transitions.length;for(let n=0;n<r;n++){let o={state:t.transitions[n].target,alt:n,stack:[]};id(o,e)}return e}function id(t,e){let r=t.state;if(r.type===fa){if(t.stack.length>0){let i=[...t.stack],s={state:i.pop(),alt:t.alt,stack:i};id(s,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let o=r.transitions[i],s=EU(t,o);s!==void 0&&id(s,e)}}function EU(t,e){if(e instanceof Du)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof ca){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function _U(t){for(let e of t.elements)if(e.state.type===fa)return!0;return!1}function NU(t){for(let e of t.elements)if(e.state.type!==fa)return!1;return!0}function IU(t){if(NU(t))return!0;let e=PU(t.elements);return DU(e)&&!OU(e)}function PU(t){let e=new Map;for(let r of t){let n=ny(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function DU(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function OU(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}var oy=de(io(),1);var od=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new ay(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new ud;return r.grammarSource=e,r.root=this.rootNode,this.current.content.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new ad(e.startOffset,e.image.length,qa(e),e.tokenType,!1);return n.grammarSource=r,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let r=e.container;if(r){let n=r.content.indexOf(e);n>=0&&r.content.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new ad(r.startOffset,r.image.length,qa(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let o=0;o<e.content.length;o++){let s=e.content[o],{offset:a,end:u}=s;if(An(s)&&n>a&&i<u){this.addHiddenToken(s,r);return}else if(i<=a){e.content.splice(o,0,r);return}}e.content.push(r)}},sd=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,r;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(r=this.container)===null||r===void 0?void 0:r.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},ad=class extends sd{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=r,this._range=n}},ud=class extends sd{constructor(){super(...arguments),this.content=new sy(this)}get children(){return this.content}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:oy.Position.create(0,0),end:oy.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let r=this.content[e];if(!r.hidden)return r}return this.content[this.content.length-1]}},sy=class t extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,t.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.container=this.parent}},ay=class extends ud{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var ly=Symbol("Datatype");function uy(t){return t.$type===ly}var dA="\u200B",pA=t=>t.endsWith(dA)?t:t+dA,ld=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new fy(r,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},cd=class extends ld{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new od,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:Mr(e)?ly:pn(e),i=this.wrapper.DEFINE_RULE(pA(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===ly&&(o.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:s,isCrossRef:a}=this.getAssignment(n),u=this.current;if(s){let l=dt(n)?i.image:this.converter.convert(i.image,o);this.assign(s.operator,s.feature,l,o,a)}else if(uy(u)){let l=i.image;dt(n)||(l=this.converter.convert(l,o).toString()),u.value+=l}}}subrule(e,r,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let s=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(s,n,o)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:o}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(uy(s))s.value+=e.toString();else{let a=e.$type,u=this.assignWithoutOverride(e,s);a&&(u.$type=a);let l=u;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return Sv(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),uy(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=Ie(e,Re);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?zt(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,r,i,n):a=n,e){case"=":{s[r]=a;break}case"?=":{s[r]=!0;break}case"+=":Array.isArray(s[r])||(s[r]=[]),s[r].push(a)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}},cy=class{buildMismatchTokenMessage(e){return hi.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return hi.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return hi.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return hi.buildEarlyExitMessage(e)}},Mu=class extends cy{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},fd=class extends ld{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(pA(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}},LU={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new Mu},fy=class extends Iu{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},LU),{lookaheadStrategy:n?new yi({maxLookahead:r.maxLookahead}):new Lu}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}};var Fu=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};function dd(t){throw new Error("Error! The input value was not handled.")}function md(t,e,r){return MU({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}function MU(t,e){let r=ds(e,!1),n=ie(e.rules).filter(H).filter(i=>r.has(i));for(let i of n){let o=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,t.parser.rule(i,Io(o,i.definition)))}}function Io(t,e,r=!1){let n;if(dt(e))n=HU(t,e);else if(_e(e))n=FU(t,e);else if(Re(e))n=Io(t,e.terminal);else if(zt(e))n=mA(t,e);else if(Ne(e))n=UU(t,e);else if(Ir(e))n=KU(t,e);else if(Pr(e))n=GU(t,e);else if(Mt(e))n=jU(t,e);else throw new Fu(e.$cstNode,`Unexpected element type: ${e.$type}`);return hA(t,r?void 0:pd(e),n,e.cardinality)}function FU(t,e){let r=pn(e);return()=>t.parser.action(r,e)}function UU(t,e){let r=e.rule.ref;if(H(r)){let n=t.subrule++,i=e.arguments.length>0?qU(r,e.arguments):()=>({});return o=>t.parser.subrule(n,yA(t,r),e,i(o))}else if(Se(r)){let n=t.consume++,i=dy(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)dd(r);else throw new Fu(e.$cstNode,`Undefined rule type: ${e.$type}`)}function qU(t,e){let r=e.map(n=>gi(n.value));return n=>{let i={};for(let o=0;o<r.length;o++){let s=t.parameters[o],a=r[o];i[s.name]=a(n)}return i}}function gi(t){if(jT(t)){let e=gi(t.left),r=gi(t.right);return n=>e(n)||r(n)}else if(KT(t)){let e=gi(t.left),r=gi(t.right);return n=>e(n)&&r(n)}else if(VT(t)){let e=gi(t.value);return r=>!e(r)}else if(ts(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if(BT(t)){let e=!!t.true;return()=>e}dd(t)}function KU(t,e){if(e.elements.length===1)return Io(t,e.elements[0]);{let r=[];for(let i of e.elements){let o={ALT:Io(t,i,!0)},s=pd(i);s&&(o.GATE=gi(s)),r.push(o)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function GU(t,e){if(e.elements.length===1)return Io(t,e.elements[0]);let r=[];for(let a of e.elements){let u={ALT:Io(t,a,!0)},l=pd(a);l&&(u.GATE=gi(l)),r.push(u)}let n=t.or++,i=(a,u)=>{let l=u.getRuleStack().join("-");return`uGroup_${a}_${l}`},o=a=>t.parser.alternatives(n,r.map((u,l)=>{let c={ALT:()=>!0},f=t.parser;c.ALT=()=>{if(u.ALT(a),!f.isRecording()){let T=i(n,f);f.unorderedGroups.get(T)||f.unorderedGroups.set(T,[]);let w=f.unorderedGroups.get(T);typeof w?.[l]>"u"&&(w[l]=!0)}};let m=u.GATE;return m?c.GATE=()=>m(a):c.GATE=()=>{let T=f.unorderedGroups.get(i(n,f));return!T?.[l]},c})),s=hA(t,pd(e),o,"*");return a=>{s(a),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function jU(t,e){let r=e.elements.map(n=>Io(t,n));return n=>r.forEach(i=>i(n))}function pd(t){if(Mt(t))return t.guardCondition}function mA(t,e,r=e.terminal){if(r)if(Ne(r)&&H(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,yA(t,r.rule.ref),e,i)}else if(Ne(r)&&Se(r.rule.ref)){let n=t.consume++,i=dy(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if(dt(r)){let n=t.consume++,i=dy(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=iu(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+pn(e.type.ref));return mA(t,e,i)}}function HU(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function hA(t,e,r,n){let i=e&&gi(e);if(!n)if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>r(s),GATE:()=>i(s)},{ALT:rd(),GATE:()=>!i(s)}])}else return r;if(n==="*"){let o=t.many++;return s=>t.parser.many(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=t.many++;if(i){let s=t.or++;return a=>t.parser.alternatives(s,[{ALT:()=>t.parser.atLeastOne(o,{DEF:()=>r(a)}),GATE:()=>i(a)},{ALT:rd(),GATE:()=>!i(a)}])}else return s=>t.parser.atLeastOne(o,{DEF:()=>r(s)})}else if(n==="?"){let o=t.optional++;return s=>t.parser.optional(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else dd(n)}function yA(t,e){let r=WU(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function WU(t,e){if(H(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!H(n);)(Mt(n)||Ir(n)||Pr(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function dy(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}function gA(t){let e=t.Grammar,r=t.parser.Lexer,n=new fd(t);return md(e,n,r.definition),n.finalize(),n}function TA(t){let e=BU(t);return e.finalize(),e}function BU(t){let e=t.Grammar,r=t.parser.Lexer,n=new cd(t);return md(e,n,r.definition)}var hd=class{buildTokens(e,r){let n=ie(ds(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,r);return i.forEach(s=>{let a=s.PATTERN;typeof a=="object"&&a&&"test"in a&&Wm(a)?o.unshift(s):o.push(s)}),o}buildTerminalTokens(e){return e.filter(Se).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=Xr(e),n=r.flags.includes("u")?this.regexPatternFunction(r):r,i={name:e.name,PATTERN:n,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=Wm(r)?mt.SKIPPED:"hidden"),i}regexPatternFunction(e){let r=new RegExp(e,e.flags+"y");return(n,i)=>(r.lastIndex=i,r.exec(n))}buildKeywordTokens(e,r,n){return e.filter(H).flatMap(i=>Qe(i).filter(dt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,!!n?.caseInsensitive))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp(Bv(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&zv("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var yd=class{convert(e,r){let n=r.grammarSource;if(zt(n)&&(n=yc(n)),Ne(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return YU(r);case"STRING":return zU(r);case"ID":return XU(r)}switch((i=xo(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return ZU(r);case"boolean":return eq(r);case"bigint":return JU(r);case"date":return QU(r);default:return r}}};function zU(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=VU(i)}else e+=n}return e}function VU(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function XU(t){return t.charAt(0)==="^"?t.substring(1):t}function YU(t){return parseInt(t)}function JU(t){return BigInt(t)}function QU(t){return new Date(t)}function ZU(t){return Number(t)}function eq(t){return t.toLowerCase()==="true"}var vA=de(we(),1);var gd=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=vA.CancellationToken.None){for(let n of Zn(e.parseResult.value))await Ze(r),Wl(n).forEach(i=>this.doLink(i,e))}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if(Yo(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if(kt(this._ref))return this._ref;if(CT(this._nodeDescription)){let u=o.loadAstNode(this._nodeDescription);this._ref=u??o.createLinkingError({reference:s,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let u=o.getLinkedNode({reference:s,container:e,property:r});if(u.error&&ne(e).state<Ge.ComputedScopes)return;this._ref=(a=u.node)!==null&&a!==void 0?a:u.error,this._nodeDescription=u.descr}return kt(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return Yo(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){try{let r=this.getCandidate(e);if(Yo(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=ne(e.container);n.state<Ge.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};function RA(t){return typeof t.$comment=="string"}function xA(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var Td=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,r){let n=r?.replacer,i=(s,a)=>this.replacer(s,a,r);return JSON.stringify(e,n?(s,a)=>n(s,a,i):i,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:o,comments:s}={}){var a,u,l;if(!this.ignoreProperties.has(e))if(Yn(r)){let c=r.ref,f=n?r.$refText:void 0;return c?{$refText:f,$ref:"#"+(c&&this.astNodeLocator.getAstNodePath(c))}:{$refText:f,$error:(u=(a=r.error)===null||a===void 0?void 0:a.message)!==null&&u!==void 0?u:"Could not resolve reference"}}else{let c;if(o&&kt(r)&&(c=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&c?.$textRegion))try{c.$textRegion.documentURI=ne(r).uri.toString()}catch{}return i&&!e&&kt(r)&&(c??(c=Object.assign({},r)),c.$sourceText=(l=r.$cstNode)===null||l===void 0?void 0:l.text),s&&kt(r)&&(c??(c=Object.assign({},r)),c.$comment=this.commentProvider.getComment(r)),c??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=$i(e.$cstNode,o).map(r);s.length!==0&&(i[o]=s)}),e}}linkNode(e,r,n,i,o){for(let[a,u]of Object.entries(e))if(Array.isArray(u))for(let l=0;l<u.length;l++){let c=u[l];xA(c)?u[l]=this.reviveReference(e,a,r,c):kt(c)&&this.linkNode(c,r,e,a,l)}else xA(u)?e[a]=this.reviveReference(e,a,r,u):kt(u)&&this.linkNode(u,r,e,a);let s=e;s.$container=n,s.$containerProperty=i,s.$containerIndex=o}reviveReference(e,r,n,i){let o=i.$refText;if(i.$ref){let s=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(s)),{$refText:o??"",ref:s}}else if(i.$error){let s={$refText:o??""};return s.error={container:e,property:r,message:i.$error,reference:s},s}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};var vd=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=ve.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};var bA=de(we(),1);var xd=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=ne(e)){r??(r=this.nameProvider.getName(e));let i=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${i} has no name.`);let o,s=()=>{var a;return o??(o=nr((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:r,get nameSegment(){return s()},selectionSegment:nr(e.$cstNode),type:e.$type,documentUri:n.uri,path:i}}},Rd=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=bA.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of Zn(i))await Ze(r),Wl(o).filter(s=>!Yo(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=ne(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:nr(n),local:ve.equals(r.documentUri,i)}}};var bd=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),u=parseInt(o.substring(s+1)),l=i[a];return l?.[u]}return i[o]},e)}};var wA=de(At(),1),wd=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(wA.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};var ma=de(we(),1);var Sd=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Le,this.buildState=new Map,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=ma.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===Ge.Validated){if(typeof r.validation=="boolean"&&r.validation)s.state=Ge.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof r.validation=="object"){let u=this.buildState.get(a),l=(i=u?.result)===null||i===void 0?void 0:i.validationChecks;if(l){let f=((o=r.validation.categories)!==null&&o!==void 0?o:ls.all).filter(m=>!l.includes(m));f.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},r.validation),{categories:f})},result:u.result}),s.state=Ge.IndexedReferences)}}}else this.buildState.delete(a)}await this.buildDocuments(e,r,n)}async update(e,r,n=ma.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString());this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s)||this.langiumDocuments.getOrCreateDocument(s),this.buildState.delete(s.toString());let i=ie(e).concat(r).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,Ge.ComputedScopes),s.diagnostics=void 0});for(let s of this.updateListeners)s(e,r);await Ze(n);let o=this.langiumDocuments.all.filter(s=>{var a;return s.state<Ge.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray();await this.buildDocuments(o,this.updateBuildOptions,n)}shouldRelink(e,r){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,r)}onUpdate(e){return this.updateListeners.push(e),ma.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}async buildDocuments(e,r,n){this.prepareBuild(e,r),await this.runCancelable(e,Ge.Parsed,n,o=>{this.langiumDocumentFactory.update(o)}),await this.runCancelable(e,Ge.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,Ge.ComputedScopes,n,async o=>{let s=this.serviceRegistry.getServices(o.uri).references.ScopeComputation;o.precomputedScopes=await s.computeLocalScopes(o,n)}),await this.runCancelable(e,Ge.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,Ge.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o));await this.runCancelable(i,Ge.Validated,n,o=>this.validate(o,n));for(let o of e){let s=this.buildState.get(o.uri.toString());s&&(s.completed=!0)}}prepareBuild(e,r){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:r,result:o?.result})}}async runCancelable(e,r,n,i){let o=e.filter(s=>s.state<r);for(let s of o)await Ze(n),await i(s),s.state=r;await this.notifyBuildPhase(o,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),ma.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let o of i)await Ze(n),await o(e,n)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,r){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,u=await o.validateDocument(e,a,r);e.diagnostics?e.diagnostics.push(...u):e.diagnostics=u;let l=this.buildState.get(e.uri.toString());if(l){(n=l.result)!==null&&n!==void 0||(l.result={});let c=(i=a?.categories)!==null&&i!==void 0?i:ls.all;l.result.validationChecks?l.result.validationChecks.push(...c):l.result.validationChecks=[...c]}}getBuildOptions(e){var r,n;return(n=(r=this.buildState.get(e.uri.toString()))===null||r===void 0?void 0:r.options)!==null&&n!==void 0?n:{}}};var py=de(we(),1);var Ad=class{constructor(e){this.simpleIndex=new Map,this.simpleTypeIndex=new lc,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,r){let n=ne(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{ve.equals(s.targetUri,n)&&s.targetPath===r&&i.push(s)})}),ie(i)}allElements(e,r){let n=ie(this.simpleIndex.keys());return r&&(n=n.filter(i=>!r||r.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,r){var n;return r?this.simpleTypeIndex.get(e,r,()=>{var o;return((o=this.simpleIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,r))}):(n=this.simpleIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.simpleTypeIndex.clear(n),this.referenceIndex.delete(n)}}async updateContent(e,r=py.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let s of i)s.node=void 0;let o=e.uri.toString();this.simpleIndex.set(o,i),this.simpleTypeIndex.clear(o)}async updateReferences(e,r=py.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,r){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&r.has(i.targetUri.toString())):!1}};var SA=de(we(),1);var Cd=class{constructor(e){this.initialBuildOptions={},this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=SA.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,o))),await Ze(r),await this.documentBuilder.build(i,this.initialBuildOptions,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return Yt.parse(e.uri)}async traverseFolder(e,r,n,i){let o=await this.fileSystemProvider.readDirectory(r);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,r,n){let i=ve.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let o=ve.extname(r.uri);return n.includes(o)}return!1}};var kd=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=AA(r)?Object.values(r):r;this.chevrotainLexer=new mt(n,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(AA(e))return e;let r=CA(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};function tq(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}function CA(t){return t&&"modes"in t&&"defaultMode"in t}function AA(t){return!tq(t)&&!CA(t)}var be=de(we(),1);function EA(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=be.Position.create(0,0));let o=NA(t),s=yy(n),a=nq({lines:o,position:i,options:s});return uq({index:0,tokens:a,position:i})}function _A(t,e){let r=yy(e),n=NA(t);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=r.start,a=r.end;return!!s?.exec(i)&&!!a?.exec(o)}function NA(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Ha)}var kA=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,rq=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function nq(t){var e,r,n;let i=[],o=t.position.line,s=t.position.character;for(let a=0;a<t.lines.length;a++){let u=a===0,l=a===t.lines.length-1,c=t.lines[a],f=0;if(u&&t.options.start){let T=(e=t.options.start)===null||e===void 0?void 0:e.exec(c);T&&(f=T.index+T[0].length)}else{let T=(r=t.options.line)===null||r===void 0?void 0:r.exec(c);T&&(f=T.index+T[0].length)}if(l){let T=(n=t.options.end)===null||n===void 0?void 0:n.exec(c);T&&(c=c.substring(0,T.index))}if(c=c.substring(0,aq(c)),hy(c,0)>=c.length){if(i.length>0){let T=be.Position.create(o,s);i.push({type:"break",content:"",range:be.Range.create(T,T)})}}else{kA.lastIndex=f;let T=kA.exec(c);if(T){let w=T[0],A=T[1],_=be.Position.create(o,s+f),C=be.Position.create(o,s+f+w.length);i.push({type:"tag",content:A,range:be.Range.create(_,C)}),f+=w.length,f=hy(c,f)}if(f<c.length){let w=c.substring(f),A=Array.from(w.matchAll(rq));i.push(...iq(A,w,o,s+f))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function iq(t,e,r,n){let i=[];if(t.length===0){let o=be.Position.create(r,n),s=be.Position.create(r,n+e.length);i.push({type:"text",content:e,range:be.Range.create(o,s)})}else{let o=0;for(let a of t){let u=a.index,l=e.substring(o,u);l.length>0&&i.push({type:"text",content:e.substring(o,u),range:be.Range.create(be.Position.create(r,o+n),be.Position.create(r,u+n))});let c=l.length+1,f=a[1];if(i.push({type:"inline-tag",content:f,range:be.Range.create(be.Position.create(r,o+c+n),be.Position.create(r,o+c+f.length+n))}),c+=f.length,a.length===4){c+=a[2].length;let m=a[3];i.push({type:"text",content:m,range:be.Range.create(be.Position.create(r,o+c+n),be.Position.create(r,o+c+m.length+n))})}else i.push({type:"text",content:"",range:be.Range.create(be.Position.create(r,o+c+n),be.Position.create(r,o+c+n))});o=u+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:be.Range.create(be.Position.create(r,o+n),be.Position.create(r,o+n+s.length))})}return i}var oq=/\S/,sq=/\s*$/;function hy(t,e){let r=t.substring(e).match(oq);return r?e+r.index:t.length}function aq(t){let e=t.match(sq);if(e&&typeof e.index=="number")return e.index}function uq(t){var e,r,n,i;let o=be.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new $d([],be.Range.create(o,o));let s=[];for(;t.index<t.tokens.length;){let l=lq(t,s[s.length-1]);l&&s.push(l)}let a=(r=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:o,u=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new $d(s,be.Range.create(a,u))}function lq(t,e){let r=t.tokens[t.index];if(r.type==="tag")return PA(t,!1);if(r.type==="text"||r.type==="inline-tag")return IA(t);cq(r,e),t.index++}function cq(t,e){if(e){let r=new Ed("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function IA(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(fq(t)),n=e,e=t.tokens[t.index];return new qu(i,be.Range.create(r.range.start,n.range.end))}function fq(t){return t.tokens[t.index].type==="inline-tag"?PA(t,!0):DA(t)}function PA(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let o=DA(t);return new Uu(n,new qu([o],o.range),e,be.Range.create(r.range.start,o.range.end))}else{let o=IA(t);return new Uu(n,o,e,be.Range.create(r.range.start,o.range.end))}else{let o=r.range;return new Uu(n,new qu([],o),e,o)}}function DA(t){let e=t.tokens[t.index++];return new Ed(e.content,e.range)}function yy(t){if(!t)return yy({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:my(e,!0),end:my(r,!1),line:my(n,!0)}}function my(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?ri(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var $d=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=$A(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=$A(r)+i}return r.trim()}},Uu=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let o=dq(this.name,r,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function dq(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let o=e.indexOf(" "),s=e;if(o>0){let u=hy(e,o);s=e.substring(u),e=e.substring(0,o)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(s=`\`${s}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,s))!==null&&i!==void 0?i:pq(e,s)}}function pq(t,e){try{return Yt.parse(t,!0),`[${e}](${t})`}catch{return t}}var qu=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];r+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(r+=`
`)}return r}},Ed=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function $A(t){return t.endsWith(`
`)?`
`:`

`}var _d=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let r=this.commentProvider.getComment(e);if(r&&_A(r))return EA(r).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,r,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,u=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${u.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=ne(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(u=>u.name===r);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};var Nd=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var r;return RA(e)?e.$comment:(r=IT(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||r===void 0?void 0:r.text}};function cu(t){return{documentation:{CommentProvider:e=>new Nd(e),DocumentationProvider:e=>new _d(e)},parser:{GrammarConfig:e=>Xx(e),LangiumParser:e=>TA(e),CompletionParser:e=>gA(e),ValueConverter:()=>new yd,TokenBuilder:()=>new hd,Lexer:e=>new kd(e),ParserErrorMessageProvider:()=>new Mu},lsp:{CompletionProvider:e=>new Rs(e),DocumentSymbolProvider:e=>new Ec(e),HoverProvider:e=>new Nc(e),FoldingRangeProvider:e=>new ws(e),ReferencesProvider:e=>new Mc(e),DefinitionProvider:e=>new Cs(e),DocumentHighlightProvider:e=>new $c(e),RenameProvider:e=>new Fc(e)},workspace:{AstNodeLocator:()=>new bd,AstNodeDescriptionProvider:e=>new xd(e),ReferenceDescriptionProvider:e=>new Rd(e)},references:{Linker:e=>new gd(e),NameProvider:()=>new as,ScopeProvider:e=>new vs(e),ScopeComputation:e=>new Ts(e),References:e=>new Ss(e)},serializer:{JsonSerializer:e=>new Td(e)},validation:{DocumentValidator:e=>new pc(e),ValidationRegistry:e=>new ic(e)},shared:()=>t.shared}}function fu(t){return{ServiceRegistry:()=>new vd,lsp:{Connection:()=>t.connection,LanguageServer:e=>new Dc(e),WorkspaceSymbolProvider:e=>new Uc(e),NodeKindProvider:()=>new Oc,FuzzyMatcher:()=>new _c},workspace:{LangiumDocuments:e=>new Pc(e),LangiumDocumentFactory:e=>new Ic(e),DocumentBuilder:e=>new Sd(e),TextDocuments:()=>new OA.TextDocuments(Xo),IndexManager:e=>new Ad(e),WorkspaceManager:e=>new Cd(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new nc,ConfigurationProvider:e=>new wd(e)}}}var ha=de(MA(),1);var FA="Expression";var UA="Statement";var mq="Type";var hq="Unit";var Id="ArithmeticExpression";var Ku="BoolExpression";var qA="RobotFunc";var yq="AssignVar";var KA="ControlStructure";var gq="declaVar";var Tq="FunCall";var vq="Return";var gy="RobotLogic";var xq="Bool";var Rq="Nbr";var bq="Void";var wq="cm";var Sq="mm";var GA="ArithmeticOperation";var Aq="ConstInt";var Cq="Var";var Ty="BoolCondition";var vy="Condition";var kq="ConstBool";var $q="getDistance";var Eq="getTimestamp";var _q="setSpeed";var Nq="If";var Iq="Loop";var jA="Movement";var Pq="Rotation";var Dq="Addition";var Oq="Division";var Lq="Multiplication";var Mq="Substraction";var Fq="And";var Uq="Equal";var qq="NotEqual";var Kq="Or";var xy="ArithmeticCondition";var Gq="Back";var jq="Front";var Hq="LeftSide";var Wq="RightSide";var Bq="Greater";var zq="Lower";var Gu=class extends uo{getAllTypes(){return["Addition","And","ArithmeticCondition","ArithmeticExpression","ArithmeticOperation","AssignVar","Back","Bool","BoolCondition","BoolExpression","Condition","ConstBool","ConstInt","ControlStructure","Division","Equal","Expression","Front","FunCall","Func","Greater","If","LeftSide","Loop","Lower","Movement","Multiplication","Nbr","NotEqual","Or","Parameter","Program","Return","RightSide","RobotFunc","RobotLogic","Rotation","Statement","Substraction","Type","Unit","Var","Void","cm","declaVar","getDistance","getTimestamp","mm","setSpeed"]}computeIsSubtype(e,r){switch(e){case Dq:case Oq:case Lq:case Mq:return this.isSubtype(GA,r);case Fq:case Kq:return this.isSubtype(Ty,r);case xy:return this.isSubtype(vy,r);case Id:case Ku:return this.isSubtype(FA,r);case GA:case Aq:return this.isSubtype(Id,r);case yq:case KA:case gq:case vq:case gy:return this.isSubtype(UA,r);case Gq:case jq:case Hq:case Wq:return this.isSubtype(jA,r);case xq:case Rq:case bq:return this.isSubtype(mq,r);case Ty:return this.isSubtype(Ku,r)||this.isSubtype(vy,r);case wq:case Sq:return this.isSubtype(hq,r);case vy:case kq:return this.isSubtype(Ku,r);case Uq:case qq:return this.isSubtype(xy,r)||this.isSubtype(Ty,r);case Tq:return this.isSubtype(Id,r)||this.isSubtype(Ku,r)||this.isSubtype(UA,r);case $q:case Eq:case _q:return this.isSubtype(qA,r);case Bq:case zq:return this.isSubtype(xy,r);case Nq:case Iq:return this.isSubtype(KA,r);case jA:case Pq:return this.isSubtype(gy,r);case qA:return this.isSubtype(FA,r)||this.isSubtype(gy,r);case Cq:return this.isSubtype(Id,r)||this.isSubtype(Ku,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Func":return{name:"Func",mandatory:[{name:"parameter",type:"array"},{name:"statement",type:"array"}]};case"Program":return{name:"Program",mandatory:[{name:"Func",type:"array"}]};case"ControlStructure":return{name:"ControlStructure",mandatory:[{name:"statement",type:"array"}]};case"ArithmeticOperation":return{name:"ArithmeticOperation",mandatory:[{name:"arithmeticexpression",type:"array"}]};case"Condition":return{name:"Condition",mandatory:[{name:"expression",type:"array"}]};case"ArithmeticCondition":return{name:"ArithmeticCondition",mandatory:[{name:"arithmeticexpression",type:"array"}]};default:return{name:e,mandatory:[]}}}},Vae=new Gu;var Pd,HA=()=>Pd??(Pd=rc(`{
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
            "$type": "Keyword",
            "value": "Program"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "Func"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "Func",
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
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "Func",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@7"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": "}"
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
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@12"
            },
            "arguments": []
          },
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
              "$ref": "#/rules@14"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@15"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@16"
            },
            "arguments": []
          },
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
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
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
              "$ref": "#/rules@41"
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
              "$ref": "#/rules@43"
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
              "$ref": "#/rules@16"
            },
            "arguments": []
          },
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
              "$ref": "#/rules@18"
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
              "$ref": "#/rules@27"
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
              "$ref": "#/rules@39"
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
      "name": "ArithmeticExpression",
      "returnType": {
        "$ref": "#/interfaces@9"
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
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
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
      "name": "Func",
      "returnType": {
        "$ref": "#/interfaces@1"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Func"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "name"
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "statement"
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
                    "feature": "statement",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@1"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": "}"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "type"
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
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "parameter"
              },
              {
                "$type": "Keyword",
                "value": "{"
              },
              {
                "$type": "Assignment",
                "feature": "parameter",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@9"
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
                        "$ref": "#/rules@9"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": "}"
              }
            ],
            "cardinality": "?"
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
      "name": "Str0",
      "returnType": {
        "$ref": "#/types@0"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Str"
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
            "$type": "Keyword",
            "value": "Parameter"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "name"
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "type"
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
      "name": "If",
      "returnType": {
        "$ref": "#/interfaces@10"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "If"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "condition"
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
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "statement"
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
                    "feature": "statement",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@1"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": "}"
              }
            ],
            "cardinality": "?"
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
        "$ref": "#/interfaces@12"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Loop"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "condition"
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
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "statement"
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
                    "feature": "statement",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@1"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": "}"
              }
            ],
            "cardinality": "?"
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
        "$ref": "#/interfaces@13"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Front"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "expression"
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
          },
          {
            "$type": "Keyword",
            "value": "unit1"
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
      "name": "Back",
      "returnType": {
        "$ref": "#/interfaces@16"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Back"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "expression"
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
          },
          {
            "$type": "Keyword",
            "value": "unit1"
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
      "name": "RightSide",
      "returnType": {
        "$ref": "#/interfaces@17"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "RightSide"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "expression"
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
          },
          {
            "$type": "Keyword",
            "value": "unit1"
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
      "name": "Rotation",
      "returnType": {
        "$ref": "#/interfaces@18"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@18"
            }
          },
          {
            "$type": "Keyword",
            "value": "Rotation"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "angle"
              },
              {
                "$type": "Assignment",
                "feature": "angle",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@37"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
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
      "name": "setSpeed",
      "returnType": {
        "$ref": "#/interfaces@19"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "setSpeed"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "unit"
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
      "name": "getDistance",
      "returnType": {
        "$ref": "#/interfaces@21"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@21"
            }
          },
          {
            "$type": "Keyword",
            "value": "getDistance"
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
        "$ref": "#/interfaces@22"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@22"
            }
          },
          {
            "$type": "Keyword",
            "value": "getTimestamp"
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
        "$ref": "#/interfaces@23"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "declaVar"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "name"
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "type"
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
            "$type": "Keyword",
            "value": "expression"
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
      "name": "FunCall",
      "returnType": {
        "$ref": "#/interfaces@24"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@24"
            }
          },
          {
            "$type": "Keyword",
            "value": "FunCall"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "name"
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
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
      "name": "Return",
      "returnType": {
        "$ref": "#/interfaces@25"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Return"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "expression"
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
      "name": "AssignVar",
      "returnType": {
        "$ref": "#/interfaces@26"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "AssignVar"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "var"
          },
          {
            "$type": "Assignment",
            "feature": "var",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@35"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "expression"
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
      "name": "LeftSide",
      "returnType": {
        "$ref": "#/interfaces@28"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "LeftSide"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "expression"
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
          },
          {
            "$type": "Keyword",
            "value": "unit1"
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
      "name": "Lower",
      "returnType": {
        "$ref": "#/interfaces@29"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Lower"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "expression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "expression",
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
                "feature": "expression",
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
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": "arithmeticexpression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "arithmeticexpression",
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
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "arithmeticexpression",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@6"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
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
      "name": "Greater",
      "returnType": {
        "$ref": "#/interfaces@31"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Greater"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "expression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "expression",
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
                "feature": "expression",
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
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": "arithmeticexpression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "arithmeticexpression",
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
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "arithmeticexpression",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@6"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
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
      "name": "Equal",
      "returnType": {
        "$ref": "#/interfaces@32"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Equal"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "expression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "expression",
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
                "feature": "expression",
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
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": "arithmeticexpression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "arithmeticexpression",
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
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "arithmeticexpression",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@6"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
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
      "name": "NotEqual",
      "returnType": {
        "$ref": "#/interfaces@34"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "NotEqual"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "expression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "expression",
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
                "feature": "expression",
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
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": "arithmeticexpression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "arithmeticexpression",
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
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "arithmeticexpression",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@6"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
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
      "name": "And",
      "returnType": {
        "$ref": "#/interfaces@35"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "And"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "expression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "expression",
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
                "feature": "expression",
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
          },
          {
            "$type": "Keyword",
            "value": "}"
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
      "name": "Or",
      "returnType": {
        "$ref": "#/interfaces@36"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Or"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "expression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "expression",
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
                "feature": "expression",
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
          },
          {
            "$type": "Keyword",
            "value": "}"
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
      "name": "ConstInt",
      "returnType": {
        "$ref": "#/interfaces@37"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@37"
            }
          },
          {
            "$type": "Keyword",
            "value": "ConstInt"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "integerValue"
              },
              {
                "$type": "Assignment",
                "feature": "integerValue",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@37"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
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
      "name": "Addition",
      "returnType": {
        "$ref": "#/interfaces@38"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Addition"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "arithmeticexpression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "arithmeticexpression",
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
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "arithmeticexpression",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@6"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
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
      "name": "Substraction",
      "returnType": {
        "$ref": "#/interfaces@40"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Substraction"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "arithmeticexpression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "arithmeticexpression",
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
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "arithmeticexpression",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@6"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
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
      "name": "Multiplication",
      "returnType": {
        "$ref": "#/interfaces@41"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Multiplication"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "arithmeticexpression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "arithmeticexpression",
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
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "arithmeticexpression",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@6"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
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
      "name": "Division",
      "returnType": {
        "$ref": "#/interfaces@42"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Division"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "arithmeticexpression"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "arithmeticexpression",
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
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "arithmeticexpression",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@6"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
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
      "name": "Var",
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
            "value": "Var"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "name"
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
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
      "name": "ConstBool",
      "returnType": {
        "$ref": "#/interfaces@43"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@43"
            }
          },
          {
            "$type": "Keyword",
            "value": "ConstBool"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "BoolValue"
              },
              {
                "$type": "Assignment",
                "feature": "BoolValue",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@38"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
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
      "name": "Int0",
      "returnType": {
        "$ref": "#/types@1"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Int"
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
      "name": "Bool0",
      "returnType": {
        "$ref": "#/types@2"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Boolean"
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
        "$ref": "#/interfaces@44"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@44"
            }
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
        "$ref": "#/interfaces@45"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@45"
            }
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
        "$ref": "#/interfaces@46"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@46"
            }
          },
          {
            "$type": "Keyword",
            "value": "Nbr"
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
        "$ref": "#/interfaces@47"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@47"
            }
          },
          {
            "$type": "Keyword",
            "value": "Bool"
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
        "$ref": "#/interfaces@48"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@48"
            }
          },
          {
            "$type": "Keyword",
            "value": "Void"
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
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          }
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
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          }
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
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "expression",
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
      "name": "Condition",
      "superTypes": [
        {
          "$ref": "#/interfaces@6"
        }
      ]
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
      "name": "If",
      "superTypes": [
        {
          "$ref": "#/interfaces@11"
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
          "$ref": "#/interfaces@11"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Front",
      "superTypes": [
        {
          "$ref": "#/interfaces@14"
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
              "$ref": "#/interfaces@7"
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
          "$ref": "#/interfaces@15"
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
          "$ref": "#/interfaces@14"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "RightSide",
      "superTypes": [
        {
          "$ref": "#/interfaces@14"
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
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@1"
            }
          }
        }
      ],
      "name": "Rotation",
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
          "name": "unit",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@8"
            }
          },
          "isOptional": false
        }
      ],
      "name": "setSpeed",
      "superTypes": [
        {
          "$ref": "#/interfaces@20"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "RobotFunc",
      "superTypes": [
        {
          "$ref": "#/interfaces@15"
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
          "$ref": "#/interfaces@20"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "getTimestamp",
      "superTypes": [
        {
          "$ref": "#/interfaces@20"
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
          "name": "name",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          }
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
          "name": "name",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          }
        }
      ],
      "name": "FunCall",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        },
        {
          "$ref": "#/interfaces@9"
        },
        {
          "$ref": "#/interfaces@6"
        }
      ]
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
          "name": "var",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@27"
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
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          }
        }
      ],
      "name": "Var",
      "superTypes": [
        {
          "$ref": "#/interfaces@9"
        },
        {
          "$ref": "#/interfaces@6"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "LeftSide",
      "superTypes": [
        {
          "$ref": "#/interfaces@14"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Lower",
      "superTypes": [
        {
          "$ref": "#/interfaces@30"
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
      "name": "Greater",
      "superTypes": [
        {
          "$ref": "#/interfaces@30"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Equal",
      "superTypes": [
        {
          "$ref": "#/interfaces@30"
        },
        {
          "$ref": "#/interfaces@33"
        }
      ],
      "attributes": []
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
      "name": "NotEqual",
      "superTypes": [
        {
          "$ref": "#/interfaces@30"
        },
        {
          "$ref": "#/interfaces@33"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "And",
      "superTypes": [
        {
          "$ref": "#/interfaces@33"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Or",
      "superTypes": [
        {
          "$ref": "#/interfaces@33"
        }
      ],
      "attributes": []
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
            "typeRef": {
              "$ref": "#/types@1"
            }
          }
        }
      ],
      "name": "ConstInt",
      "superTypes": [
        {
          "$ref": "#/interfaces@9"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Addition",
      "superTypes": [
        {
          "$ref": "#/interfaces@39"
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
      "name": "ArithmeticOperation",
      "superTypes": [
        {
          "$ref": "#/interfaces@9"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Substraction",
      "superTypes": [
        {
          "$ref": "#/interfaces@39"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Multiplication",
      "superTypes": [
        {
          "$ref": "#/interfaces@39"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Division",
      "superTypes": [
        {
          "$ref": "#/interfaces@39"
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
            "typeRef": {
              "$ref": "#/types@2"
            }
          }
        }
      ],
      "name": "ConstBool",
      "superTypes": [
        {
          "$ref": "#/interfaces@6"
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
}`));var Vq={languageId:"ase-robot",fileExtensions:[".rob"],caseInsensitive:!1},WA={AstReflection:()=>new Gu},BA={Grammar:()=>HA(),LanguageMetaData:()=>Vq,parser:{}};var Dd=class{};var Xq={validation:{AseRobotValidator:()=>new Dd}};function zA(t){let e=co(fu(t),WA),r=co(cu({shared:e}),BA,Xq);return e.ServiceRegistry.register(r),{shared:e,AseRobot:r}}var Yq=new ha.BrowserMessageReader(self),Jq=new ha.BrowserMessageWriter(self),Qq=(0,ha.createConnection)(Yq,Jq),{shared:Zq}=zA(Object.assign({connection:Qq},Hc));Ox(Zq);})();
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