// TaskFlow Pro — Service Worker
// App shell di-cache saat install; dokumen pakai network-first supaya update
// cepat terlihat, aset lain cache-first dengan pengisian cache saat runtime.
const CACHE = 'taskflow-v16';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css?v=20260721a',
  './app.js?v=20260721a',
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
  // 'no-cache' = selalu revalidasi ke server (ETag/304), tidak percaya
  // HTTP cache browser — GitHub Pages set max-age=600 sehingga update
  // deploy bisa tertahan sampai 10 menit kalau pakai fetch biasa.
  const res = await fetch(request, { cache: 'no-cache' });
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

  // Jangan pernah cache API/cross-origin — respons /api/ berisi data privat
  // per akun dan tidak boleh masuk cache.
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;

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
  // Fallback HANYA ke cache aset yang sama — jangan pernah mengirim
  // index.html sebagai pengganti CSS/JS/gambar (membuat tampilan rusak).
  e.respondWith(
    fetchAndCache(e.request).catch(() =>
      caches.match(e.request).then((cached) => cached || Response.error())
    )
  );
});
