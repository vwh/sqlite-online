import{r as c,R as er}from"./react-D3M8TY1j.js";import{P as l}from"./prop-types-C70NJO-m.js";import{f as rr}from"./file-selector-Bf0AE8ON.js";import{_ as le}from"./attr-accept-DSH7EMVE.js";function Te(e){return or(e)||tr(e)||He(e)||nr()}function nr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function tr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function or(e){if(Array.isArray(e))return fe(e)}function Ie(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,o)}return n}function ke(e){for(var r=1;r<arguments.length;r++){var n=arguments[r]!=null?arguments[r]:{};r%2?Ie(Object(n),!0).forEach(function(o){$e(e,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ie(Object(n)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o))})}return e}function $e(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function z(e,r){return ur(e)||ar(e,r)||He(e,r)||ir()}function ir(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function He(e,r){if(e){if(typeof e=="string")return fe(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return fe(e,r)}}function fe(e,r){(r==null||r>e.length)&&(r=e.length);for(var n=0,o=new Array(r);n<r;n++)o[n]=e[n];return o}function ar(e,r){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var o=[],a=!0,u=!1,s,p;try{for(n=n.call(e);!(a=(s=n.next()).done)&&(o.push(s.value),!(r&&o.length===r));a=!0);}catch(m){u=!0,p=m}finally{try{!a&&n.return!=null&&n.return()}finally{if(u)throw p}}return o}}function ur(e){if(Array.isArray(e))return e}var cr=typeof le=="function"?le:le.default,lr="file-invalid-type",sr="file-too-large",fr="file-too-small",pr="too-many-files",dr=function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",n=r.split(","),o=n.length>1?"one of ".concat(n.join(", ")):n[0];return{code:lr,message:"File type must be ".concat(o)}},xe=function(r){return{code:sr,message:"File is larger than ".concat(r," ").concat(r===1?"byte":"bytes")}},Me=function(r){return{code:fr,message:"File is smaller than ".concat(r," ").concat(r===1?"byte":"bytes")}},gr={code:pr,message:"Too many files"};function Be(e,r){var n=e.type==="application/x-moz-file"||cr(e,r);return[n,n?null:dr(r)]}function We(e,r,n){if(E(e.size))if(E(r)&&E(n)){if(e.size>n)return[!1,xe(n)];if(e.size<r)return[!1,Me(r)]}else{if(E(r)&&e.size<r)return[!1,Me(r)];if(E(n)&&e.size>n)return[!1,xe(n)]}return[!0,null]}function E(e){return e!=null}function yr(e){var r=e.files,n=e.accept,o=e.minSize,a=e.maxSize,u=e.multiple,s=e.maxFiles,p=e.validator;return!u&&r.length>1||u&&s>=1&&r.length>s?!1:r.every(function(m){var C=Be(m,n),P=z(C,1),S=P[0],R=We(m,o,a),T=z(R,1),I=T[0],k=p?p(m):null;return S&&I&&!k})}function q(e){return typeof e.isPropagationStopped=="function"?e.isPropagationStopped():typeof e.cancelBubble<"u"?e.cancelBubble:!1}function Y(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,function(r){return r==="Files"||r==="application/x-moz-file"}):!!e.target&&!!e.target.files}function Le(e){e.preventDefault()}function mr(e){return e.indexOf("MSIE")!==-1||e.indexOf("Trident/")!==-1}function br(e){return e.indexOf("Edge/")!==-1}function vr(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.navigator.userAgent;return mr(e)||br(e)}function h(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return function(o){for(var a=arguments.length,u=new Array(a>1?a-1:0),s=1;s<a;s++)u[s-1]=arguments[s];return r.some(function(p){return!q(o)&&p&&p.apply(void 0,[o].concat(u)),q(o)})}}function Dr(){return"showOpenFilePicker"in window}function hr(e){if(E(e)){var r=Object.entries(e).filter(function(n){var o=z(n,2),a=o[0],u=o[1],s=!0;return Ne(a)||(console.warn('Skipped "'.concat(a,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),s=!1),(!Array.isArray(u)||!u.every(Ue))&&(console.warn('Skipped "'.concat(a,'" because an invalid file extension was provided.')),s=!1),s}).reduce(function(n,o){var a=z(o,2),u=a[0],s=a[1];return ke(ke({},n),{},$e({},u,s))},{});return[{description:"Files",accept:r}]}return e}function Ar(e){if(E(e))return Object.entries(e).reduce(function(r,n){var o=z(n,2),a=o[0],u=o[1];return[].concat(Te(r),[a],Te(u))},[]).filter(function(r){return Ne(r)||Ue(r)}).join(",")}function Or(e){return e instanceof DOMException&&(e.name==="AbortError"||e.code===e.ABORT_ERR)}function Er(e){return e instanceof DOMException&&(e.name==="SecurityError"||e.code===e.SECURITY_ERR)}function Ne(e){return e==="audio/*"||e==="video/*"||e==="image/*"||e==="text/*"||e==="application/*"||/\w+\/[-+.\w]+/g.test(e)}function Ue(e){return/^.*\.[\w]+$/.test(e)}var Fr=["children"],wr=["open"],_r=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],jr=["refKey","onChange","onClick"];function Cr(e){return Rr(e)||Sr(e)||Ye(e)||Pr()}function Pr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Sr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Rr(e){if(Array.isArray(e))return pe(e)}function se(e,r){return kr(e)||Ir(e,r)||Ye(e,r)||Tr()}function Tr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ye(e,r){if(e){if(typeof e=="string")return pe(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return pe(e,r)}}function pe(e,r){(r==null||r>e.length)&&(r=e.length);for(var n=0,o=new Array(r);n<r;n++)o[n]=e[n];return o}function Ir(e,r){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var o=[],a=!0,u=!1,s,p;try{for(n=n.call(e);!(a=(s=n.next()).done)&&(o.push(s.value),!(r&&o.length===r));a=!0);}catch(m){u=!0,p=m}finally{try{!a&&n.return!=null&&n.return()}finally{if(u)throw p}}return o}}function kr(e){if(Array.isArray(e))return e}function ze(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,o)}return n}function f(e){for(var r=1;r<arguments.length;r++){var n=arguments[r]!=null?arguments[r]:{};r%2?ze(Object(n),!0).forEach(function(o){de(e,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ze(Object(n)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o))})}return e}function de(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function G(e,r){if(e==null)return{};var n=xr(e,r),o,a;if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(a=0;a<u.length;a++)o=u[a],!(r.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}function xr(e,r){if(e==null)return{};var n={},o=Object.keys(e),a,u;for(u=0;u<o.length;u++)a=o[u],!(r.indexOf(a)>=0)&&(n[a]=e[a]);return n}var ye=c.forwardRef(function(e,r){var n=e.children,o=G(e,Fr),a=Mr(o),u=a.open,s=G(a,wr);return c.useImperativeHandle(r,function(){return{open:u}},[u]),er.createElement(c.Fragment,null,n(f(f({},s),{},{open:u})))});ye.displayName="Dropzone";var qe={disabled:!1,getFilesFromEvent:rr,maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!1,autoFocus:!1};ye.defaultProps=qe;ye.propTypes={children:l.func,accept:l.objectOf(l.arrayOf(l.string)),multiple:l.bool,preventDropOnDocument:l.bool,noClick:l.bool,noKeyboard:l.bool,noDrag:l.bool,noDragEventsBubbling:l.bool,minSize:l.number,maxSize:l.number,maxFiles:l.number,disabled:l.bool,getFilesFromEvent:l.func,onFileDialogCancel:l.func,onFileDialogOpen:l.func,useFsAccessApi:l.bool,autoFocus:l.bool,onDragEnter:l.func,onDragLeave:l.func,onDragOver:l.func,onDrop:l.func,onDropAccepted:l.func,onDropRejected:l.func,onError:l.func,validator:l.func};var ge={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,acceptedFiles:[],fileRejections:[]};function Mr(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=f(f({},qe),e),n=r.accept,o=r.disabled,a=r.getFilesFromEvent,u=r.maxSize,s=r.minSize,p=r.multiple,m=r.maxFiles,C=r.onDragEnter,P=r.onDragLeave,S=r.onDragOver,R=r.onDrop,T=r.onDropAccepted,I=r.onDropRejected,k=r.onFileDialogCancel,J=r.onFileDialogOpen,me=r.useFsAccessApi,be=r.autoFocus,V=r.preventDropOnDocument,ve=r.noClick,Q=r.noKeyboard,De=r.noDrag,A=r.noDragEventsBubbling,X=r.onError,x=r.validator,M=c.useMemo(function(){return Ar(n)},[n]),he=c.useMemo(function(){return hr(n)},[n]),Z=c.useMemo(function(){return typeof J=="function"?J:Ke},[J]),K=c.useMemo(function(){return typeof k=="function"?k:Ke},[k]),y=c.useRef(null),D=c.useRef(null),Ge=c.useReducer(Lr,ge),Ae=se(Ge,2),ee=Ae[0],b=Ae[1],Je=ee.isFocused,Oe=ee.isFileDialogActive,$=c.useRef(typeof window<"u"&&window.isSecureContext&&me&&Dr()),Ee=function(){!$.current&&Oe&&setTimeout(function(){if(D.current){var i=D.current.files;i.length||(b({type:"closeDialog"}),K())}},300)};c.useEffect(function(){return window.addEventListener("focus",Ee,!1),function(){window.removeEventListener("focus",Ee,!1)}},[D,Oe,K,$]);var F=c.useRef([]),Fe=function(i){y.current&&y.current.contains(i.target)||(i.preventDefault(),F.current=[])};c.useEffect(function(){return V&&(document.addEventListener("dragover",Le,!1),document.addEventListener("drop",Fe,!1)),function(){V&&(document.removeEventListener("dragover",Le),document.removeEventListener("drop",Fe))}},[y,V]),c.useEffect(function(){return!o&&be&&y.current&&y.current.focus(),function(){}},[y,be,o]);var O=c.useCallback(function(t){X?X(t):console.error(t)},[X]),we=c.useCallback(function(t){t.preventDefault(),t.persist(),N(t),F.current=[].concat(Cr(F.current),[t.target]),Y(t)&&Promise.resolve(a(t)).then(function(i){if(!(q(t)&&!A)){var d=i.length,g=d>0&&yr({files:i,accept:M,minSize:s,maxSize:u,multiple:p,maxFiles:m,validator:x}),v=d>0&&!g;b({isDragAccept:g,isDragReject:v,isDragActive:!0,type:"setDraggedFiles"}),C&&C(t)}}).catch(function(i){return O(i)})},[a,C,O,A,M,s,u,p,m,x]),_e=c.useCallback(function(t){t.preventDefault(),t.persist(),N(t);var i=Y(t);if(i&&t.dataTransfer)try{t.dataTransfer.dropEffect="copy"}catch{}return i&&S&&S(t),!1},[S,A]),je=c.useCallback(function(t){t.preventDefault(),t.persist(),N(t);var i=F.current.filter(function(g){return y.current&&y.current.contains(g)}),d=i.indexOf(t.target);d!==-1&&i.splice(d,1),F.current=i,!(i.length>0)&&(b({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),Y(t)&&P&&P(t))},[y,P,A]),H=c.useCallback(function(t,i){var d=[],g=[];t.forEach(function(v){var L=Be(v,M),j=se(L,2),ne=j[0],te=j[1],oe=We(v,s,u),U=se(oe,2),ie=U[0],ae=U[1],ue=x?x(v):null;if(ne&&ie&&!ue)d.push(v);else{var ce=[te,ae];ue&&(ce=ce.concat(ue)),g.push({file:v,errors:ce.filter(function(Ze){return Ze})})}}),(!p&&d.length>1||p&&m>=1&&d.length>m)&&(d.forEach(function(v){g.push({file:v,errors:[gr]})}),d.splice(0)),b({acceptedFiles:d,fileRejections:g,isDragReject:g.length>0,type:"setFiles"}),R&&R(d,g,i),g.length>0&&I&&I(g,i),d.length>0&&T&&T(d,i)},[b,p,M,s,u,m,R,T,I,x]),B=c.useCallback(function(t){t.preventDefault(),t.persist(),N(t),F.current=[],Y(t)&&Promise.resolve(a(t)).then(function(i){q(t)&&!A||H(i,t)}).catch(function(i){return O(i)}),b({type:"reset"})},[a,H,O,A]),w=c.useCallback(function(){if($.current){b({type:"openDialog"}),Z();var t={multiple:p,types:he};window.showOpenFilePicker(t).then(function(i){return a(i)}).then(function(i){H(i,null),b({type:"closeDialog"})}).catch(function(i){Or(i)?(K(i),b({type:"closeDialog"})):Er(i)?($.current=!1,D.current?(D.current.value=null,D.current.click()):O(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):O(i)});return}D.current&&(b({type:"openDialog"}),Z(),D.current.value=null,D.current.click())},[b,Z,K,me,H,O,he,p]),Ce=c.useCallback(function(t){!y.current||!y.current.isEqualNode(t.target)||(t.key===" "||t.key==="Enter"||t.keyCode===32||t.keyCode===13)&&(t.preventDefault(),w())},[y,w]),Pe=c.useCallback(function(){b({type:"focus"})},[]),Se=c.useCallback(function(){b({type:"blur"})},[]),Re=c.useCallback(function(){ve||(vr()?setTimeout(w,0):w())},[ve,w]),_=function(i){return o?null:i},re=function(i){return Q?null:_(i)},W=function(i){return De?null:_(i)},N=function(i){A&&i.stopPropagation()},Ve=c.useMemo(function(){return function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},i=t.refKey,d=i===void 0?"ref":i,g=t.role,v=t.onKeyDown,L=t.onFocus,j=t.onBlur,ne=t.onClick,te=t.onDragEnter,oe=t.onDragOver,U=t.onDragLeave,ie=t.onDrop,ae=G(t,_r);return f(f(de({onKeyDown:re(h(v,Ce)),onFocus:re(h(L,Pe)),onBlur:re(h(j,Se)),onClick:_(h(ne,Re)),onDragEnter:W(h(te,we)),onDragOver:W(h(oe,_e)),onDragLeave:W(h(U,je)),onDrop:W(h(ie,B)),role:typeof g=="string"&&g!==""?g:"presentation"},d,y),!o&&!Q?{tabIndex:0}:{}),ae)}},[y,Ce,Pe,Se,Re,we,_e,je,B,Q,De,o]),Qe=c.useCallback(function(t){t.stopPropagation()},[]),Xe=c.useMemo(function(){return function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},i=t.refKey,d=i===void 0?"ref":i,g=t.onChange,v=t.onClick,L=G(t,jr),j=de({accept:M,multiple:p,type:"file",style:{border:0,clip:"rect(0, 0, 0, 0)",clipPath:"inset(50%)",height:"1px",margin:"0 -1px -1px 0",overflow:"hidden",padding:0,position:"absolute",width:"1px",whiteSpace:"nowrap"},onChange:_(h(g,B)),onClick:_(h(v,Qe)),tabIndex:-1},d,D);return f(f({},j),L)}},[D,n,p,B,o]);return f(f({},ee),{},{isFocused:Je&&!o,getRootProps:Ve,getInputProps:Xe,rootRef:y,inputRef:D,open:_(w)})}function Lr(e,r){switch(r.type){case"focus":return f(f({},e),{},{isFocused:!0});case"blur":return f(f({},e),{},{isFocused:!1});case"openDialog":return f(f({},ge),{},{isFileDialogActive:!0});case"closeDialog":return f(f({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":return f(f({},e),{},{isDragActive:r.isDragActive,isDragAccept:r.isDragAccept,isDragReject:r.isDragReject});case"setFiles":return f(f({},e),{},{acceptedFiles:r.acceptedFiles,fileRejections:r.fileRejections,isDragReject:r.isDragReject});case"reset":return f({},ge);default:return e}}function Ke(){}export{Mr as u};
