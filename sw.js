if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const t=s=>l(s,n),o={module:{uri:n},exports:u,require:t};e[n]=Promise.all(r.map((s=>o[s]||t(s)))).then((s=>(i(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/@babel-BjXSgPXB.js",revision:null},{url:"assets/@codemirror-CCjSF3Vf.js",revision:null},{url:"assets/@floating-ui-DdUjdMBw.js",revision:null},{url:"assets/@lezer-DgLl1T_N.js",revision:null},{url:"assets/@radix-ui-E10elJI3.js",revision:null},{url:"assets/@uiw-CvcbIrPa.js",revision:null},{url:"assets/aria-hidden-DQ5UC2Eg.js",revision:null},{url:"assets/attr-accept-BWI1aNlo.js",revision:null},{url:"assets/class-variance-authority-Bb4qSo10.js",revision:null},{url:"assets/clsx-B-dksMZM.js",revision:null},{url:"assets/crelt-C8TCjufn.js",revision:null},{url:"assets/date-fns-fqmN70Xj.js",revision:null},{url:"assets/detect-node-es-l0sNRNKZ.js",revision:null},{url:"assets/file-saver-DhbZvGod.js",revision:null},{url:"assets/file-selector-CBHVlu32.js",revision:null},{url:"assets/get-nonce-C-Z93AgS.js",revision:null},{url:"assets/index-3WB_jjc1.css",revision:null},{url:"assets/index-B79UIr58.js",revision:null},{url:"assets/lucide-react-C1VID-M1.js",revision:null},{url:"assets/nearley-CG12bGQB.js",revision:null},{url:"assets/prop-types-psm7UO16.js",revision:null},{url:"assets/react-DmpIMwDM.js",revision:null},{url:"assets/react-dom-tIxIBQuZ.js",revision:null},{url:"assets/react-dropzone-D-IBOhIS.js",revision:null},{url:"assets/react-remove-scroll-bar-DZjhPxUV.js",revision:null},{url:"assets/react-remove-scroll-BOyN_WUU.js",revision:null},{url:"assets/react-style-singleton-CpxBwIWS.js",revision:null},{url:"assets/scheduler-CzFDRTuY.js",revision:null},{url:"assets/sonner-BJG0sXho.js",revision:null},{url:"assets/sql-formatter-BoZ82dp4.js",revision:null},{url:"assets/sql.js-Ch_tM77n.js",revision:null},{url:"assets/style-mod-Bc2inJdb.js",revision:null},{url:"assets/tailwind-merge-BkWO730n.js",revision:null},{url:"assets/tslib-CuZy2iRz.js",revision:null},{url:"assets/use-callback-ref-DRzK4jWO.js",revision:null},{url:"assets/use-sidecar-D8_hMcUG.js",revision:null},{url:"assets/use-sync-external-store-ByYeed7R.js",revision:null},{url:"assets/vaul-LE4MEETp.js",revision:null},{url:"assets/w3c-keyname-Vcq4gwWv.js",revision:null},{url:"assets/zustand-BpWCCnYR.js",revision:null},{url:"index.html",revision:"d2d970ba216c602980a99d4baf9fc80c"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"sql.wasm",revision:"f6ad6454f4630b310eb8473858eb33bb"},{url:"manifest.webmanifest",revision:"662c9ac5fe5300a257a596b0ad6130ea"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
