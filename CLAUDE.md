# Catatan untuk Claude

## Tentang pemilik repo
- Pemilik repo **bukan programmer**. Jelaskan semuanya dengan bahasa Indonesia
  yang santai dan sederhana, langkah demi langkah, tanpa jargon teknis.
  Kalau istilah teknis tak terhindarkan, beri analogi sehari-hari.
- Jangan berasumsi user paham git/terminal/SQL — tawarkan jalur lewat
  tampilan web (dashboard) dulu sebelum jalur command line.

## Tentang proyek
- **TaskFlow Pro** — daily task tracker berbentuk PWA (HTML/CSS/JS murni,
  tanpa framework/build step). Satu halaman, file utama: `index.html`,
  `app.js`, `styles.css`, `sw.js`.
- Hosting: **Cloudflare Workers** (`wrangler.jsonc`), deploy otomatis lewat
  integrasi git — merge ke `main` = langsung naik produksi.
- Backend: `worker.js` (API login akun + sinkronisasi data) dengan database
  **Cloudflare D1** (skema di `schema.sql`). Login pakai email + password.
- Kalau mengubah `app.js`/`styles.css`, naikkan versi `?v=` di `index.html`
  dan `sw.js`, serta `APP_VERSION` di `app.js`, agar cache pengguna terganti.
