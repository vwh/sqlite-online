import{R as E}from"./react-DmpIMwDM.js";import{u as m}from"./use-sync-external-store-ByYeed7R.js";const g={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},a=t=>{let e;const o=new Set,n=(s,u)=>{const r=typeof s=="function"?s(e):s;if(!Object.is(r,e)){const S=e;e=u??(typeof r!="object"||r===null)?r:Object.assign({},e,r),o.forEach(b=>b(e,S))}},i=()=>e,c={setState:n,getState:i,getInitialState:()=>p,subscribe:s=>(o.add(s),()=>o.delete(s)),destroy:()=>{(g?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),o.clear()}},p=e=t(n,i,c);return c},_=t=>t?a(t):a,f={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},{useDebugValue:y}=E,{useSyncExternalStoreWithSelector:v}=m;let l=!1;const D=t=>t;function R(t,e=D,o){(f?"production":void 0)!=="production"&&o&&!l&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),l=!0);const n=v(t.subscribe,t.getState,t.getServerState||t.getInitialState,e,o);return y(n),n}const d=t=>{(f?"production":void 0)!=="production"&&typeof t!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const e=typeof t=="function"?_(t):t,o=(n,i)=>R(e,n,i);return Object.assign(o,e),o},P=t=>t?d(t):d;export{P as c};
