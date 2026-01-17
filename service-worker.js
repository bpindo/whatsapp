const CACHE_NAME = "p2p-chat-v1";

self.addEventListener("install", e => {
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  clients.claim();
});

self.addEventListener("fetch", e => {
  const req = e.request;

  // Jangan cache WebSocket / signaling
  if (req.url.startsWith("ws") || req.url.includes("railway")) {
    return;
  }

  e.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});
