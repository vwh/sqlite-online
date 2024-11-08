import{d as z,e as B,b as j}from"./tslib-CuZy2iRz.js";import{r as a}from"./react-DmpIMwDM.js";import{f as O,z as Q,R as p}from"./react-remove-scroll-bar-DZjhPxUV.js";import{c as q,e as G}from"./use-sidecar-D8_hMcUG.js";import{u as J}from"./use-callback-ref-DRzK4jWO.js";import{s as K}from"./react-style-singleton-CpxBwIWS.js";var V=q(),Y=function(){},X=a.forwardRef(function(e,r){var c=a.useRef(null),l=a.useState({onScrollCapture:Y,onWheelCapture:Y,onTouchMoveCapture:Y}),u=l[0],s=l[1],v=e.forwardProps,o=e.children,m=e.className,g=e.removeScrollBar,w=e.enabled,C=e.shards,y=e.sideCar,b=e.noIsolation,R=e.inert,t=e.allowPinchZoom,n=e.as,f=n===void 0?"div":n,h=e.gapMode,d=z(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),S=y,i=J([c,r]),E=B(B({},d),u);return a.createElement(a.Fragment,null,w&&a.createElement(S,{sideCar:V,removeScrollBar:g,shards:C,noIsolation:b,inert:R,setCallbacks:s,allowPinchZoom:!!t,lockRef:c,gapMode:h}),v?a.cloneElement(a.Children.only(o),B(B({},E),{ref:i})):a.createElement(f,B({},E,{className:m,ref:i}),o))});X.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};X.classNames={fullWidth:O,zeroRight:Q};var D=!1;if(typeof window<"u")try{var N=Object.defineProperty({},"passive",{get:function(){return D=!0,!0}});window.addEventListener("test",N,N),window.removeEventListener("test",N,N)}catch{D=!1}var k=D?{passive:!1}:!1,U=function(e){return e.tagName==="TEXTAREA"},Z=function(e,r){var c=window.getComputedStyle(e);return c[r]!=="hidden"&&!(c.overflowY===c.overflowX&&!U(e)&&c[r]==="visible")},_=function(e){return Z(e,"overflowY")},$=function(e){return Z(e,"overflowX")},I=function(e,r){var c=r.ownerDocument,l=r;do{typeof ShadowRoot<"u"&&l instanceof ShadowRoot&&(l=l.host);var u=F(e,l);if(u){var s=x(e,l),v=s[1],o=s[2];if(v>o)return!0}l=l.parentNode}while(l&&l!==c.body);return!1},ee=function(e){var r=e.scrollTop,c=e.scrollHeight,l=e.clientHeight;return[r,c,l]},re=function(e){var r=e.scrollLeft,c=e.scrollWidth,l=e.clientWidth;return[r,c,l]},F=function(e,r){return e==="v"?_(r):$(r)},x=function(e,r){return e==="v"?ee(r):re(r)},te=function(e,r){return e==="h"&&r==="rtl"?-1:1},ae=function(e,r,c,l,u){var s=te(e,window.getComputedStyle(r).direction),v=s*l,o=c.target,m=r.contains(o),g=!1,w=v>0,C=0,y=0;do{var b=x(e,o),R=b[0],t=b[1],n=b[2],f=t-n-s*R;(R||f)&&F(e,o)&&(C+=f,y+=R),o instanceof ShadowRoot?o=o.host:o=o.parentNode}while(!m&&o!==document.body||m&&(r.contains(o)||r===o));return(w&&(Math.abs(C)<1||!u)||!w&&(Math.abs(y)<1||!u))&&(g=!0),g},T=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},A=function(e){return[e.deltaX,e.deltaY]},H=function(e){return e&&"current"in e?e.current:e},ne=function(e,r){return e[0]===r[0]&&e[1]===r[1]},le=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},oe=0,P=[];function ce(e){var r=a.useRef([]),c=a.useRef([0,0]),l=a.useRef(),u=a.useState(oe++)[0],s=a.useState(K)[0],v=a.useRef(e);a.useEffect(function(){v.current=e},[e]),a.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(u));var t=j([e.lockRef.current],(e.shards||[]).map(H),!0).filter(Boolean);return t.forEach(function(n){return n.classList.add("allow-interactivity-".concat(u))}),function(){document.body.classList.remove("block-interactivity-".concat(u)),t.forEach(function(n){return n.classList.remove("allow-interactivity-".concat(u))})}}},[e.inert,e.lockRef.current,e.shards]);var o=a.useCallback(function(t,n){if("touches"in t&&t.touches.length===2)return!v.current.allowPinchZoom;var f=T(t),h=c.current,d="deltaX"in t?t.deltaX:h[0]-f[0],S="deltaY"in t?t.deltaY:h[1]-f[1],i,E=t.target,M=Math.abs(d)>Math.abs(S)?"h":"v";if("touches"in t&&M==="h"&&E.type==="range")return!1;var L=I(M,E);if(!L)return!0;if(L?i=M:(i=M==="v"?"h":"v",L=I(M,E)),!L)return!1;if(!l.current&&"changedTouches"in t&&(d||S)&&(l.current=i),!i)return!0;var W=l.current||i;return ae(W,n,t,W==="h"?d:S,!0)},[]),m=a.useCallback(function(t){var n=t;if(!(!P.length||P[P.length-1]!==s)){var f="deltaY"in n?A(n):T(n),h=r.current.filter(function(i){return i.name===n.type&&(i.target===n.target||n.target===i.shadowParent)&&ne(i.delta,f)})[0];if(h&&h.should){n.cancelable&&n.preventDefault();return}if(!h){var d=(v.current.shards||[]).map(H).filter(Boolean).filter(function(i){return i.contains(n.target)}),S=d.length>0?o(n,d[0]):!v.current.noIsolation;S&&n.cancelable&&n.preventDefault()}}},[]),g=a.useCallback(function(t,n,f,h){var d={name:t,delta:n,target:f,should:h,shadowParent:ie(f)};r.current.push(d),setTimeout(function(){r.current=r.current.filter(function(S){return S!==d})},1)},[]),w=a.useCallback(function(t){c.current=T(t),l.current=void 0},[]),C=a.useCallback(function(t){g(t.type,A(t),t.target,o(t,e.lockRef.current))},[]),y=a.useCallback(function(t){g(t.type,T(t),t.target,o(t,e.lockRef.current))},[]);a.useEffect(function(){return P.push(s),e.setCallbacks({onScrollCapture:C,onWheelCapture:C,onTouchMoveCapture:y}),document.addEventListener("wheel",m,k),document.addEventListener("touchmove",m,k),document.addEventListener("touchstart",w,k),function(){P=P.filter(function(t){return t!==s}),document.removeEventListener("wheel",m,k),document.removeEventListener("touchmove",m,k),document.removeEventListener("touchstart",w,k)}},[]);var b=e.removeScrollBar,R=e.inert;return a.createElement(a.Fragment,null,R?a.createElement(s,{styles:le(u)}):null,b?a.createElement(p,{gapMode:e.gapMode}):null)}function ie(e){for(var r=null;e!==null;)e instanceof ShadowRoot&&(r=e.host,e=e.host),e=e.parentNode;return r}const ue=G(V,ce);var se=a.forwardRef(function(e,r){return a.createElement(X,B({},e,{ref:r,sideCar:ue}))});se.classNames=X.classNames;export{se as R};
