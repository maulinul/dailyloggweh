# TaskFlow Pro ✨

![TaskFlow Pro](https://img.shields.io/badge/TaskFlow-Pro-8A2BE2?style=for-the-badge&logo=checkmarx&logoColor=white)
![Version](https://img.shields.io/badge/version-2.0.0-00f5a0?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-ff4d6d?style=for-the-badge)

&gt; **TaskFlow Pro** adalah daily task tracker premium berbasis web dengan desain glassmorphism, animasi kinetik, dan sinkronisasi cloud dengan akun email + password (Cloudflare Workers + D1). Dibangun untuk produktivitas maksimal dengan pengalaman visual yang memukau.

---

## 🎯 Fitur Unggulan

### 🧠 Smart Parser
Ketik tugas secara natural dan sistem otomatis mendeteksi:
- **Waktu** — `jam 7 malam`, `pukul 14:00` → terdeteksi & dihapus dari judul
- **Prioritas** — `high`, `medium`, `low`, `urgent`, `penting` → terdeteksi & dihapus dari judul

### 🎨 Glassmorphism UI
- Desain liquid glass dengan backdrop blur
- Gradient neon (Ungu, Coral, Silver, Green, Yellow, Blue)
- Animasi staggered load, spring physics, dan hover effects
- Custom plasma cursor dengan trail particle

### 📊 Statistik Real-time
- **Progress Hari Ini** — tracking task harian
- **Progress Semua Task** — tracking keseluruhan
- Bento grid stats: Total, Selesai, Pending, High Priority, Streak 🔥

### 📅 Kalender Interaktif
- Navigasi bulan/tahun dengan slide animation
- **Back to Today** — lompat instan ke hari ini
- Preview task dots per hari (warna sesuai prioritas)
- Panel detail tugas per hari

### ⏱️ Pomodoro Timer
- Timer 25 menit built-in per tugas
- Focus mode overlay fullscreen
- Progress circle SVG animasi

### ☁️ Cloud Sync dengan Akun
- Daftar & masuk cukup dengan email + password — tanpa token GitHub
- Data tersimpan per akun di Cloudflare D1 lewat Worker API
- Auto-sync opsional setiap perubahan
- Backup & restore antar perangkat

**Setup backend (sekali saja):**
```bash
# 1. Buat database D1 (kalau belum ada)
npx wrangler d1 create dailyloggweh-db

# 2. Sesuaikan database_name & database_id di wrangler.jsonc

# 3. Terapkan skema tabel
npx wrangler d1 execute dailyloggweh-db --remote --file=./schema.sql

# 4. Deploy
npx wrangler deploy
```

---

## 🚀 Cara Penggunaan

### 1. Clone atau Download
```bash
git clone https://github.com/username/taskflow-pro.git
cd taskflow-pro
