if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const l=e=>i(e,o),d={module:{uri:o},exports:t,require:l};s[o]=Promise.all(n.map((e=>d[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-0987a8b7.css",revision:null},{url:"assets/index-1429e60a.js",revision:null},{url:"assets/workbox-window.prod.es5-a7b12eab.js",revision:null},{url:"assets/worker-732bd9ad.js",revision:null},{url:"index.html",revision:"d2963ad86931eab198e1c69227ebba00"},{url:"icon192.png",revision:"a5f3c98b9862d71568447182634ac0ba"},{url:"icon512.png",revision:"205b23aecb8db4fa7d0fde734507f04d"},{url:"manifest.webmanifest",revision:"f21733f31c5190ae7ec35883710911a9"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
