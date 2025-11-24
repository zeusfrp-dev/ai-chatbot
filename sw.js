const CACHE_NAME = 'my-pwa-cache-v2'; // <--- AQUI ESTÁ A MUDANÇA
const urlsToCache = [
  '/',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './sw.js',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retorna a resposta
        if (response) {
          return response;
        }
        // Nenhuma resposta no cache - busca na rede
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Remove caches antigos
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
