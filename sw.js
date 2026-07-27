// VS Travels India — minimal service worker
// Required so the site qualifies as an installable PWA (needed for the
// Play Store TWA build). Keeps things simple: no offline caching logic
// that could serve stale WhatsApp/UPI links.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Pass-through — always fetch fresh from network.
  event.respondWith(fetch(event.request));
});
