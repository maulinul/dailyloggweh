// TaskFlow Pro — Service Worker
// App shell di-cache saat install; dokumen pakai network-first supaya update
// cepat terlihat, aset lain cache-first dengan pengisian cache saat runtime.
const CACHE = 'taskflow-v3';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
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

async function fetchAndCache(request) {
  const res = await fetch(request);
  const url = new URL(request.url);
  if (res && res.ok && url.origin === self.location.origin) {
    const cache = await caches.open(CACHE);
    await cache.put(request, res.clone());
  }
  return res;
}

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Jangan pernah cache API/cross-origin, terutama respons private GitHub Gist.
  if (url.origin !== self.location.origin) return;

  // Navigasi/dokumen: network-first, fallback ke cache saat offline
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetchAndCache(e.request).catch(() =>
        caches.match(e.request).then((r) => r || caches.match('./index.html'))
      )
    );
    return;
  }

  // Aset same-origin: network-first agar HTML, JS, dan CSS selalu satu versi.
  e.respondWith(
    fetchAndCache(e.request).catch(() =>
      caches.match(e.request).then((cached) => cached || caches.match('./index.html'))
    )
  );
});
