const CACHE_NAME = "airbus-wind-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Uygulamayı cihaza kur ve dosyaları önbelleğe al
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// İnternet yoksa bile cihazdaki kayıtlı dosyaları aç
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});