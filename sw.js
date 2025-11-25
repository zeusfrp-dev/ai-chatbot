const CACHE_NAME = "my-pwa-cache-v3";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

// INSTALAÇÃO
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// INTERCEPTAÇÃO DE REQUISIÇÕES
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // ❗ NÃO interceptar requisições para seu backend no Render
  if (url.origin.includes("ai-chatbot-3gyw.onrender.com")) {
    return; // deixa ir direto para a internet
  }

  // ❗ NÃO interceptar POST
  if (event.request.method !== "GET") {
    return;
  }

  // Cache first
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          return caches.match("./index.html");
        })
      );
    })
  );
});

// ATIVAÇÃO
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(oldKey => caches.delete(oldKey))
      );
    })
  );
});
