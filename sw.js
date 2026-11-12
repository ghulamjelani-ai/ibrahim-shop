const CACHE='ibrahim-shop-v11';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.map(function(k){if(k!==CACHE)return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var req=e.request;
  if(req.mode==='navigate'){
    e.respondWith(fetch(req).then(function(resp){var c=resp.clone();caches.open(CACHE).then(function(ch){ch.put('./index.html',c);});return resp;}).catch(function(){return caches.match('./index.html').then(function(r){return r||caches.match('./');});}));
    return;
  }
  e.respondWith(caches.match(req).then(function(r){return r||fetch(req).then(function(resp){var c=resp.clone();caches.open(CACHE).then(function(ch){try{ch.put(req,c);}catch(_){}});return resp;}).catch(function(){return caches.match('./index.html');});}));
});
