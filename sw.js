// TaskFlow Pro — Service Worker
// App shell di-cache saat install; dokumen pakai network-first supaya update
// cepat terlihat, aset lain cache-first dengan pengisian cache saat runtime.
const CACHE = 'taskflow-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function fetchAndCache(request) {
  return fetch(request).then((res) => {
    if (res && res.ok) {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(request, copy));
    }
    return res;
  });
}

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  // Navigasi/dokumen: network-first, fallback ke cache saat offline
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetchAndCache(e.request).catch(() =>
        caches.match(e.request).then((r) => r || caches.match('./index.html'))
      )
    );
    return;
  }

  // Aset lain (termasuk font Google): cache-first, isi cache saat runtime
  e.respondWith(
    caches.match(e.request).then((cached) =>
      cached || fetchAndCache(e.request).catch(() => cached)
    )
  );
});
