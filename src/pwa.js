const cacheName = "sgtoilet-cache-" + Date.now();
const filesToCache = [
  "/",
  "/index.html",
  "/build/bundle.css",
  "/build/bundle.js",
  "DerivedName.txt",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(thisCacheName => {
          if (thisCacheName !== cacheName) {
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    (async () => {
      const response = await caches.match(e.request);
      return response || fetch(e.request);
    })()
  );
});