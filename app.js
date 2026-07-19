// State & Config
const APP_VERSION = '20260719b';

// ===== I18N: dukungan dwibahasa (Indonesia / English) =====
// currentLang menentukan bahasa aktif. t(key, vars) mengambil teks dari kamus,
// {placeholder} pada string diganti dengan nilai di vars.
const I18N = {
  id: {
    // Focus mode
    'focus.title': 'Fokus Mode',
    'focus.pause': '⏸ Pause',
    'focus.resume': '▶ Resume',
    'focus.clear': '✕ Clear Focus',
    'focus.deep': '🌌 Deep Focus',
    'focus.calm': '🌿 Calm',
    'focus.night': '🌙 Night',
    // Edit modal
    'edit.title': '✏️ Edit Tugas',
    'ph.editTitle': 'Judul tugas',
    'ph.editDesc': 'Deskripsi (opsional)',
    'ph.editCategory': '📁 Kategori (cth: Kerja, Meeting, Personal)',
    'opt.super_high': '💥 Super High',
    'opt.high': '🔥 High',
    'opt.medium': '⚡ Medium',
    'opt.low': '🌿 Low',
    'opt.pending': '⏳ Pending',
    'opt.ongoing': '🔥 On Going',
    'opt.done': '✅ Selesai',
    'repeat.none': '🔁 Tidak berulang',
    'repeat.none.short': '🔁 Tidak',
    'repeat.daily': '🔁 Harian',
    'repeat.weekly': '🔁 Mingguan',
    'repeat.monthly': '🔁 Bulanan',
    'repeat.tag.daily': 'Harian',
    'repeat.tag.weekly': 'Mingguan',
    'repeat.tag.monthly': 'Bulanan',
    'btn.cancel': 'Batal',
    'btn.save': 'Simpan',
    'btn.add': 'Tambah',
    'title.repeat': 'Pengulangan tugas',
    // Parsing editor
    'pe.title': '⚙️ Pengaturan Parsing Kata',
    'pe.desc': 'Edit kata kunci yang diparsing untuk prioritas, status, tanggal, waktu, dan kategori. Setiap baris: kata kunci (pisahkan dengan koma) → hasil.',
    'pe.tab.priority': '🎯 Prioritas',
    'pe.tab.status': '🏷️ Status',
    'pe.tab.dates': '📅 Tanggal',
    'pe.tab.timeOfDay': '⏰ Waktu',
    'pe.tab.categories': '📁 Kategori',
    'pe.col.keywords': 'Kata Kunci (pisah koma)',
    'pe.col.priority': 'Prioritas',
    'pe.col.status': 'Status',
    'pe.col.days': '+Hari',
    'pe.col.hour': 'Jam',
    'pe.col.catName': 'Nama Kategori',
    'pe.add': '+ Tambah',
    'pe.cat.desc': 'Kata kunci (opsional) untuk auto-parsing kategori dari nama tugas. Kosongkan kata kunci jika hanya ingin menambah pilihan kategori tanpa deteksi otomatis.',
    'pe.reset': '🔄 Reset Default',
    'title.pe.reset': 'Reset ke Default',
    // Left column
    'wi.title': '📈 Weekly Insight',
    'wi.legend.done': 'Selesai',
    'wi.legend.pending': 'Tertunda',
    'wi.heatLabel': '⏰ Jam produktif (30 hari terakhir)',
    'wi.stat.done7': 'Selesai 7 hari',
    'wi.stat.pending': 'Tertunda',
    'wi.stat.streak': 'Streak',
    'wi.bar.done': '{n} selesai',
    'wi.bar.pending': '{n} tertunda',
    'wi.cell': '{h}:00 — {n} selesai',
    'chip.status.done': '✅ Selesai',
    'chip.status.ongoing': '🔥 On Going',
    'chip.status.pending': '⏳ Pending',
    'chip.titleHint': 'Judul setelah parsing',
    'chip.dateHint': 'Klik untuk ubah manual, × untuk hapus',
    'chip.errorHint': 'Perbaiki input sebelum menambahkan tugas',
    'chip.categoryHint': 'Kategori terdeteksi otomatis dari nama tugas',
    'chip.priorityHint': 'Klik untuk ganti prioritas',
    'chip.statusHint': 'Klik untuk ganti status',
    'bento.progressToday': 'Progress Hari Ini',
    'bento.progressAll': 'Progress Semua',
    'bento.total': 'Total',
    'bento.done': 'Selesai',
    'bento.pending': 'Pending',
    'bento.high': '🔥 High+',
    'bento.streak': 'Streak 🔥',
    // Center column
    'ph.taskInput': 'Tulis tugas… (cth: Beli susu besok jam 8 high)',
    'title.detailToggle': 'Detail: deskripsi, kategori, subtask, tanggal, pengulangan',
    'ph.descInput': 'Deskripsi (opsional)',
    'ph.categoryInput': '📁 Kategori (cth: Kerja, Meeting, Personal, Admin)',
    'ph.subtaskInput': '➕ Subtask (tekan Enter untuk tambah, bisa banyak)',
    'aria.priority': 'Prioritas tugas',
    'title.cloudSync': 'Sinkronisasi Cloud',
    'cloud.sync': '☁️ Sync',
    'hint.format': '💡 <strong>Format:</strong> <code style="background:rgba(176,38,255,0.15); padding:1px 6px; border-radius:4px; color:var(--neon-purple);">Tugas | tanggal | status | waktu | prioritas</code><br>\n            <span style="margin-left:1.2rem;">📅 <em>hari ini, besok, lusa, 2 hari lagi, seminggu, sebulan, 2 bulan…</em> | 🏷️ <em>DNE, OGG, PND</em> | 🕐 <em>jam 19, 19.00, 12am, 12pm</em> | ⚡ <em>high, med, low, superh</em></span><br>\n            <span style="margin-left:1.2rem;">📝 Contoh: <code style="background:rgba(255,255,255,0.05); padding:1px 5px; border-radius:3px;">Beli susu | besok | OGG | jam 8 | high</code> atau cukup: <code style="background:rgba(255,255,255,0.05); padding:1px 5px; border-radius:3px;">Beli susu</code> (default hari ini)</span>',
    'tf.title': '🎯 Today Focus',
    'title.today': 'Hari Ini',
    'dayDetail.pick': '📅 Pilih tanggal',
    'empty.dayDetail': '✨ Tidak ada tugas di hari ini',
    // Right column
    'ph.search': 'Cari tugas lama...',
    'filter.sheetBtn': '⚙️ Filter & Urutkan',
    'filter.all': 'Semua',
    'filter.pending': 'Pending',
    'filter.ongoing': 'On Going',
    'filter.done': 'Selesai',
    'filter.priorityLabel': 'Prioritas:',
    'filter.sortLabel': 'Urutkan (pilih satu atau lebih):',
    'sort.date': '📅 Tanggal',
    'sort.priority': '🔥 Prioritas',
    'sort.status': '✅ Status',
    'data.exportJson': '📦 Export JSON',
    'data.exportCsv': '📊 Export CSV',
    'data.import': '📥 Import',
    'data.multiSelect': '☑️ Multi Select',
    'batch.done': '✅ Selesaikan',
    'batch.delete': '🗑️ Hapus',
    'view.list': '📋 List',
    'view.kanban': '🎯 Kanban',
    'empty.tasksIcon': '📭 Tidak ada tugas',
    'empty.tasks': 'Tidak ada tugas',
    'kanban.pending': '⏳ Pending',
    'kanban.ongoing': '🔥 On Going',
    'kanban.done': '✅ Selesai',
    'kanban.empty': '📭 Kosong',
    // Settings
    'set.sound': '🔊 Suara',
    'set.haptic': '📳 Haptic',
    'set.reducedMotion': '🌀 Reduced Motion',
    'set.customCursor': '✨ Custom Cursor',
    'set.reminder': '🔔 Reminder Notifikasi',
    'account.title': '☁️ Akun & Sinkronisasi',
    'ph.password': 'Password (min. 8 karakter)',
    'account.login': '🔑 Masuk',
    'account.register': '✨ Daftar',
    'account.privacy': 'Satu akun untuk sinkronisasi data antar perangkat.',
    'account.loggedInAs': 'Masuk sebagai',
    'account.autoSync': 'Auto Sync',
    'account.saveCloud': '☁️ Simpan ke Cloud',
    'title.loadCloud': 'Muat dari Cloud',
    'account.logout': '🚪 Keluar',
    'set.editParsing': '⚙️ Edit Kata Kunci Parsing',
    'set.storageNote': 'Data tersimpan di LocalStorage',
    'set.restore': 'Pulihkan Snapshot Terakhir',
    'set.clear': 'Hapus Semua Data',
    'aria.openSettings': 'Buka pengaturan',
    // Bottom nav
    'nav.today': 'Hari Ini',
    'nav.calendar': 'Kalender',
    'nav.tasks': 'Tugas',
    'nav.focus': 'Fokus',
    'nav.menu': 'Menu',
    'title.addTask': 'Tambah tugas',
    'aria.bottomNav': 'Navigasi utama mobile',
    // Task card / actions
    'title.focusTimer': 'Focus Timer',
    'title.editTask': 'Edit Tugas',
    'title.addSubtask': 'Add Subtask',
    'title.postpone': 'Lanjut ke besok',
    'title.delete': 'Hapus',
    'title.drag': 'Drag to reorder',
    'title.setPending': 'Klik untuk set Pending',
    'title.setOngoing': 'Klik untuk set On Going',
    'title.clearFocus': 'Clear Focus',
    'task.ongoing': '🔥 On Going',
    'task.pending': '⏳ Pending',
    'tag.overdue': '⏰ Terlambat',
    'tf.allDone': '🎉 Semua tugas penting hari ini beres!',
    'tf.empty': '✨ Belum ada tugas untuk hari ini',
    'tf.overdueBadge': '⏰ {n} terlambat',
    'tf.markDone': 'Tandai selesai',
    'tf.next': 'Tugas berikutnya',
    'day.postpone': 'Lanjut ke besok',
    // Smart date
    'date.today': 'Hari ini, {t}',
    'date.tomorrow': 'Besok, {t}',
    'date.dayAfter': 'Lusa, {t}',
    'date.yesterday': 'Kemarin, {t}',
    'date.inDays': '{n} hari lagi, {t}',
    // Dynamic toasts / dialogs
    'toast.localReadError': 'Data lokal tidak dapat dibaca. Salinan mentah tetap dipertahankan.',
    'toast.noTaskToFocus': 'Belum ada tugas untuk difokuskan.',
    'toast.checkDateTime': 'Periksa tanggal atau waktu pada input.',
    'parse.invalidTime': 'Waktu tidak valid',
    'parse.invalidDate': 'Tanggal tidak valid',
    'toast.postponed': '⏩ "{title}" dilanjut ke {when}',
    'toast.taskDeleted': 'Tugas dihapus',
    'undo.label': '↩️ Undo',
    'undo.plain': 'Undo',
    'prompt.subtaskTitle': '📋 Subtask Baru',
    'prompt.subtaskPh': 'Tulis subtask…',
    'toast.focusDone': '⏰ Fokus selesai!',
    'toast.noFocusTarget': 'Tidak ada tugas untuk difokuskan',
    'toast.focusDoneFor': '⏰ Fokus selesai untuk: {title}',
    'progress.label': '{pct}% Selesai Hari Ini',
    'toast.exportedJson': '{n} tugas diekspor ke JSON',
    'toast.exportedCsv': '{n} tugas diekspor ke CSV',
    'toast.restoreSnapFail': 'Restore dibatalkan karena snapshot lokal tidak dapat dibuat.',
    'toast.noSnapshot': 'Belum ada snapshot pemulihan.',
    'toast.snapshotRestored': 'Snapshot berhasil dipulihkan.',
    'toast.snapshotRestoreFail': 'Snapshot tidak dapat dipulihkan: {msg}',
    'confirm.replaceTitle': 'Ganti Data Tugas?',
    'confirm.replaceMsg': '{source} berisi {n} tugas. Data lokal saat ini ({cur} tugas) akan diganti. Snapshot pemulihan dan Undo akan dibuat terlebih dahulu.',
    'confirm.replaceOk': 'Ganti Data',
    'source.snapshot': 'Snapshot {label}',
    'source.import': 'Import {name}',
    'source.cloud': 'Cloud',
    'toast.importOk': 'Import berhasil: {n} tugas',
    'toast.importErr': 'Error import: {msg}',
    'toast.multiSelectOn': 'Mode Multi-Select aktif. Klik task untuk memilih.',
    'batch.selected': '{n} tugas terpilih',
    'toast.markedDone': 'Tugas ditandai selesai',
    'toast.nothingUndo': 'Tidak ada yang bisa di-undo',
    'toast.undoRestore': 'Undo: Task dikembalikan',
    'toast.undoBatchRestore': 'Undo: {n} task dikembalikan',
    'toast.undoStatus': 'Undo: Status dikembalikan',
    'toast.undoData': 'Undo: Data dikembalikan',
    'confirm.resetTitle': '🔄 Reset Default',
    'confirm.resetMsg': 'Reset semua kata kunci ke default? Perubahan yang belum disimpan akan hilang.',
    'confirm.resetOk': 'Reset',
    'toast.resetDone': 'Kata kunci direset ke default',
    'toast.keywordsSaved': 'Kata kunci & kategori tersimpan',
    'toast.noNotifSupport': 'Browser ini tidak mendukung notifikasi',
    'toast.notifDenied': 'Izin notifikasi ditolak oleh browser',
    'toast.reminderOn': '🔔 Reminder aktif — notifikasi saat tugas jatuh tempo',
    'confirm.clearTitle': '🗑️ Hapus Semua Data',
    'confirm.clearMsg': 'Semua tugas akan dihapus. Kamu masih bisa membatalkannya lewat tombol Undo setelah ini.',
    'confirm.clearOk': 'Hapus Semua',
    'toast.allCleared': 'Semua data dihapus.',
    'confirm.clearFocusTitle': '✕ Clear Focus',
    'confirm.clearFocusMsg': 'Yakin ingin menghentikan focus mode?',
    'confirm.clearFocusOk': 'Hentikan',
    'toast.allDoneCelebrate': '🎉 Semua tugas hari ini selesai! Kerja bagus!',
    'toast.recurringCreated': '🔁 Tugas berulang dibuat: {when}',
    'notif.dueTitle': '⏰ TaskFlow: {title}',
    'notif.dueBody': 'Jatuh tempo sekarang',
    'acc.invalidEmail': '❌ Email tidak valid',
    'acc.pwMin': '❌ Password minimal 8 karakter',
    'acc.registering': '✨ Mendaftarkan akun...',
    'acc.loggingIn': '🔑 Masuk...',
    'acc.loginOk': '✅ Berhasil masuk',
    'toast.accountCreated': 'Akun dibuat. Data lokal tersimpan ke cloud.',
    'dialog.cloudFoundTitle': '☁️ Data Cloud Ditemukan',
    'dialog.cloudFoundMsg': 'Terakhir disimpan: {when}.\nMuat data cloud (menggantikan data lokal), atau simpan data lokal ke cloud?',
    'dialog.later': 'Nanti',
    'dialog.pushLocal': '☁️ Simpan Lokal ke Cloud',
    'dialog.pullCloud': '📥 Muat dari Cloud',
    'toast.localSavedCloud': 'Data lokal tersimpan ke cloud.',
    'toast.loggedOut': 'Kamu sudah keluar. Data lokal tetap tersimpan di perangkat ini.',
    'acc.loginFirstSync': '❌ Masuk dulu untuk sinkronisasi',
    'acc.syncing': '☁️ Menyinkronkan...',
    'acc.savedCloud': '✅ Tersimpan ke cloud',
    'toast.savedCloud': 'Data tersimpan ke cloud',
    'acc.sessionExpired': '❌ Sesi berakhir. Silakan masuk lagi.',
    'acc.error': '❌ Error: {msg}',
    'acc.loadCancelled': 'Load dibatalkan',
    'acc.dataLoaded': '✅ Data dimuat ({n} tugas)',
    'toast.tasksLoadedCloud': '{n} tugas dimuat dari cloud',
    'acc.loginFirstLoad': '❌ Masuk dulu untuk memuat data',
    'acc.loading': '📥 Memuat...',
    'acc.noCloudData': 'Belum ada data di cloud',
    'toast.storageFull': 'Penyimpanan lokal penuh atau tidak tersedia. Perubahan belum aman.',
    'toast.settingsSaveFail': 'Pengaturan tidak dapat disimpan.',
    'toast.loginPrompt': '⚠️ Masuk dengan akunmu di Settings (⚙️) terlebih dulu.',
    'dialog.cloudSyncTitle': '☁️ Sinkronisasi Cloud',
    'dialog.cloudSyncMsg': 'Pilih arah sinkronisasi:',
    'dialog.download': '📥 Download (Load)',
    'dialog.upload': '☁️ Upload (Save)',
    'err.backendOff': 'Backend akun belum aktif di hosting ini. Deploy lewat Cloudflare Worker, bukan static hosting/GitHub Pages.',
    'err.http': 'HTTP {status}',
    'toast.langChanged': '🌐 Bahasa diubah ke Indonesia',
    'acc.cloudConflict': '⚠️ Data di cloud lebih baru dari perangkat ini',
    'toast.cloudConflict': '⚠️ Auto-sync ditunda: data di cloud lebih baru (mungkin dari perangkat lain). Buka Settings → pilih 📥 Muat dari Cloud, atau ☁️ Simpan ke Cloud untuk menimpanya.',
    'toast.syncDeferred': 'Auto-sync ditunda sampai kamu memilih Muat/Simpan di Settings.'
  },
  en: {
    'focus.title': 'Focus Mode',
    'focus.pause': '⏸ Pause',
    'focus.resume': '▶ Resume',
    'focus.clear': '✕ Clear Focus',
    'focus.deep': '🌌 Deep Focus',
    'focus.calm': '🌿 Calm',
    'focus.night': '🌙 Night',
    'edit.title': '✏️ Edit Task',
    'ph.editTitle': 'Task title',
    'ph.editDesc': 'Description (optional)',
    'ph.editCategory': '📁 Category (e.g. Work, Meeting, Personal)',
    'opt.super_high': '💥 Super High',
    'opt.high': '🔥 High',
    'opt.medium': '⚡ Medium',
    'opt.low': '🌿 Low',
    'opt.pending': '⏳ Pending',
    'opt.ongoing': '🔥 On Going',
    'opt.done': '✅ Done',
    'repeat.none': '🔁 No repeat',
    'repeat.none.short': '🔁 None',
    'repeat.daily': '🔁 Daily',
    'repeat.weekly': '🔁 Weekly',
    'repeat.monthly': '🔁 Monthly',
    'repeat.tag.daily': 'Daily',
    'repeat.tag.weekly': 'Weekly',
    'repeat.tag.monthly': 'Monthly',
    'btn.cancel': 'Cancel',
    'btn.save': 'Save',
    'btn.add': 'Add',
    'title.repeat': 'Task repeat',
    'pe.title': '⚙️ Word Parsing Settings',
    'pe.desc': 'Edit the keywords parsed for priority, status, date, time, and category. Each row: keywords (comma separated) → result.',
    'pe.tab.priority': '🎯 Priority',
    'pe.tab.status': '🏷️ Status',
    'pe.tab.dates': '📅 Dates',
    'pe.tab.timeOfDay': '⏰ Time',
    'pe.tab.categories': '📁 Categories',
    'pe.col.keywords': 'Keywords (comma separated)',
    'pe.col.priority': 'Priority',
    'pe.col.status': 'Status',
    'pe.col.days': '+Days',
    'pe.col.hour': 'Hour',
    'pe.col.catName': 'Category Name',
    'pe.add': '+ Add',
    'pe.cat.desc': 'Optional keywords to auto-detect a category from the task name. Leave keywords empty if you only want to add a category option without automatic detection.',
    'pe.reset': '🔄 Reset Default',
    'title.pe.reset': 'Reset to Default',
    'wi.title': '📈 Weekly Insight',
    'wi.legend.done': 'Done',
    'wi.legend.pending': 'Pending',
    'wi.heatLabel': '⏰ Productive hours (last 30 days)',
    'wi.stat.done7': 'Done in 7 days',
    'wi.stat.pending': 'Pending',
    'wi.stat.streak': 'Streak',
    'wi.bar.done': '{n} done',
    'wi.bar.pending': '{n} pending',
    'wi.cell': '{h}:00 — {n} done',
    'chip.status.done': '✅ Done',
    'chip.status.ongoing': '🔥 On Going',
    'chip.status.pending': '⏳ Pending',
    'chip.titleHint': 'Title after parsing',
    'chip.dateHint': 'Click to edit manually, × to remove',
    'chip.errorHint': 'Fix the input before adding the task',
    'chip.categoryHint': 'Category auto-detected from the task name',
    'chip.priorityHint': 'Click to change priority',
    'chip.statusHint': 'Click to change status',
    'bento.progressToday': "Today's Progress",
    'bento.progressAll': 'Overall Progress',
    'bento.total': 'Total',
    'bento.done': 'Done',
    'bento.pending': 'Pending',
    'bento.high': '🔥 High+',
    'bento.streak': 'Streak 🔥',
    'ph.taskInput': 'Write a task… (e.g. Buy milk tomorrow 8am high)',
    'title.detailToggle': 'Details: description, category, subtask, date, repeat',
    'ph.descInput': 'Description (optional)',
    'ph.categoryInput': '📁 Category (e.g. Work, Meeting, Personal, Admin)',
    'ph.subtaskInput': '➕ Subtask (press Enter to add, multiple allowed)',
    'aria.priority': 'Task priority',
    'title.cloudSync': 'Cloud Sync',
    'cloud.sync': '☁️ Sync',
    'hint.format': '💡 <strong>Format:</strong> <code style="background:rgba(176,38,255,0.15); padding:1px 6px; border-radius:4px; color:var(--neon-purple);">Task | date | status | time | priority</code><br>\n            <span style="margin-left:1.2rem;">📅 <em>today, tomorrow, in 2 days, a week, a month, 2 months…</em> | 🏷️ <em>DNE, OGG, PND</em> | 🕐 <em>jam 19, 19.00, 12am, 12pm</em> | ⚡ <em>high, med, low, superh</em></span><br>\n            <span style="margin-left:1.2rem;">📝 Example: <code style="background:rgba(255,255,255,0.05); padding:1px 5px; border-radius:3px;">Buy milk | besok | OGG | jam 8 | high</code> or just: <code style="background:rgba(255,255,255,0.05); padding:1px 5px; border-radius:3px;">Buy milk</code> (defaults to today)</span>',
    'tf.title': '🎯 Today Focus',
    'title.today': 'Today',
    'dayDetail.pick': '📅 Pick a date',
    'empty.dayDetail': '✨ No tasks on this day',
    'ph.search': 'Search old tasks...',
    'filter.sheetBtn': '⚙️ Filter & Sort',
    'filter.all': 'All',
    'filter.pending': 'Pending',
    'filter.ongoing': 'On Going',
    'filter.done': 'Done',
    'filter.priorityLabel': 'Priority:',
    'filter.sortLabel': 'Sort (pick one or more):',
    'sort.date': '📅 Date',
    'sort.priority': '🔥 Priority',
    'sort.status': '✅ Status',
    'data.exportJson': '📦 Export JSON',
    'data.exportCsv': '📊 Export CSV',
    'data.import': '📥 Import',
    'data.multiSelect': '☑️ Multi Select',
    'batch.done': '✅ Complete',
    'batch.delete': '🗑️ Delete',
    'view.list': '📋 List',
    'view.kanban': '🎯 Kanban',
    'empty.tasksIcon': '📭 No tasks',
    'empty.tasks': 'No tasks',
    'kanban.pending': '⏳ Pending',
    'kanban.ongoing': '🔥 On Going',
    'kanban.done': '✅ Done',
    'kanban.empty': '📭 Empty',
    'set.sound': '🔊 Sound',
    'set.haptic': '📳 Haptic',
    'set.reducedMotion': '🌀 Reduced Motion',
    'set.customCursor': '✨ Custom Cursor',
    'set.reminder': '🔔 Reminder Notifications',
    'account.title': '☁️ Account & Sync',
    'ph.password': 'Password (min. 8 characters)',
    'account.login': '🔑 Log In',
    'account.register': '✨ Sign Up',
    'account.privacy': 'One account to sync your data across devices.',
    'account.loggedInAs': 'Logged in as',
    'account.autoSync': 'Auto Sync',
    'account.saveCloud': '☁️ Save to Cloud',
    'title.loadCloud': 'Load from Cloud',
    'account.logout': '🚪 Log Out',
    'set.editParsing': '⚙️ Edit Parsing Keywords',
    'set.storageNote': 'Data stored in LocalStorage',
    'set.restore': 'Restore Last Snapshot',
    'set.clear': 'Clear All Data',
    'aria.openSettings': 'Open settings',
    'nav.today': 'Today',
    'nav.calendar': 'Calendar',
    'nav.tasks': 'Tasks',
    'nav.focus': 'Focus',
    'nav.menu': 'Menu',
    'title.addTask': 'Add task',
    'aria.bottomNav': 'Main mobile navigation',
    'title.focusTimer': 'Focus Timer',
    'title.editTask': 'Edit Task',
    'title.addSubtask': 'Add Subtask',
    'title.postpone': 'Move to tomorrow',
    'title.delete': 'Delete',
    'title.drag': 'Drag to reorder',
    'title.setPending': 'Click to set Pending',
    'title.setOngoing': 'Click to set On Going',
    'title.clearFocus': 'Clear Focus',
    'task.ongoing': '🔥 On Going',
    'task.pending': '⏳ Pending',
    'tag.overdue': '⏰ Overdue',
    'tf.allDone': '🎉 All important tasks for today are done!',
    'tf.empty': '✨ No tasks for today yet',
    'tf.overdueBadge': '⏰ {n} overdue',
    'tf.markDone': 'Mark as done',
    'tf.next': 'Next task',
    'day.postpone': 'Move to tomorrow',
    'date.today': 'Today, {t}',
    'date.tomorrow': 'Tomorrow, {t}',
    'date.dayAfter': 'In 2 days, {t}',
    'date.yesterday': 'Yesterday, {t}',
    'date.inDays': 'In {n} days, {t}',
    'toast.localReadError': 'Local data could not be read. A raw copy is still kept.',
    'toast.noTaskToFocus': 'No task to focus on yet.',
    'toast.checkDateTime': 'Check the date or time in the input.',
    'parse.invalidTime': 'Invalid time',
    'parse.invalidDate': 'Invalid date',
    'toast.postponed': '⏩ "{title}" moved to {when}',
    'toast.taskDeleted': 'Task deleted',
    'undo.label': '↩️ Undo',
    'undo.plain': 'Undo',
    'prompt.subtaskTitle': '📋 New Subtask',
    'prompt.subtaskPh': 'Write a subtask…',
    'toast.focusDone': '⏰ Focus complete!',
    'toast.noFocusTarget': 'No task to focus on',
    'toast.focusDoneFor': '⏰ Focus complete for: {title}',
    'progress.label': '{pct}% Done Today',
    'toast.exportedJson': '{n} tasks exported to JSON',
    'toast.exportedCsv': '{n} tasks exported to CSV',
    'toast.restoreSnapFail': 'Restore cancelled because a local snapshot could not be created.',
    'toast.noSnapshot': 'No recovery snapshot yet.',
    'toast.snapshotRestored': 'Snapshot restored successfully.',
    'toast.snapshotRestoreFail': 'Snapshot could not be restored: {msg}',
    'confirm.replaceTitle': 'Replace Task Data?',
    'confirm.replaceMsg': '{source} contains {n} tasks. Your current local data ({cur} tasks) will be replaced. A recovery snapshot and Undo will be created first.',
    'confirm.replaceOk': 'Replace Data',
    'source.snapshot': 'Snapshot {label}',
    'source.import': 'Import {name}',
    'source.cloud': 'Cloud',
    'toast.importOk': 'Import successful: {n} tasks',
    'toast.importErr': 'Import error: {msg}',
    'toast.multiSelectOn': 'Multi-Select mode on. Click a task to select it.',
    'batch.selected': '{n} tasks selected',
    'toast.markedDone': 'Tasks marked done',
    'toast.nothingUndo': 'Nothing to undo',
    'toast.undoRestore': 'Undo: Task restored',
    'toast.undoBatchRestore': 'Undo: {n} tasks restored',
    'toast.undoStatus': 'Undo: Status restored',
    'toast.undoData': 'Undo: Data restored',
    'confirm.resetTitle': '🔄 Reset Default',
    'confirm.resetMsg': 'Reset all keywords to default? Unsaved changes will be lost.',
    'confirm.resetOk': 'Reset',
    'toast.resetDone': 'Keywords reset to default',
    'toast.keywordsSaved': 'Keywords & categories saved',
    'toast.noNotifSupport': 'This browser does not support notifications',
    'toast.notifDenied': 'Notification permission denied by the browser',
    'toast.reminderOn': '🔔 Reminders on — notification when a task is due',
    'confirm.clearTitle': '🗑️ Clear All Data',
    'confirm.clearMsg': 'All tasks will be deleted. You can still undo this with the Undo button afterwards.',
    'confirm.clearOk': 'Clear All',
    'toast.allCleared': 'All data cleared.',
    'confirm.clearFocusTitle': '✕ Clear Focus',
    'confirm.clearFocusMsg': 'Are you sure you want to stop focus mode?',
    'confirm.clearFocusOk': 'Stop',
    'toast.allDoneCelebrate': '🎉 All of today\'s tasks are done! Great work!',
    'toast.recurringCreated': '🔁 Recurring task created: {when}',
    'notif.dueTitle': '⏰ TaskFlow: {title}',
    'notif.dueBody': 'Due now',
    'acc.invalidEmail': '❌ Invalid email',
    'acc.pwMin': '❌ Password must be at least 8 characters',
    'acc.registering': '✨ Creating account...',
    'acc.loggingIn': '🔑 Logging in...',
    'acc.loginOk': '✅ Logged in',
    'toast.accountCreated': 'Account created. Local data saved to the cloud.',
    'dialog.cloudFoundTitle': '☁️ Cloud Data Found',
    'dialog.cloudFoundMsg': 'Last saved: {when}.\nLoad the cloud data (replacing local data), or save local data to the cloud?',
    'dialog.later': 'Later',
    'dialog.pushLocal': '☁️ Save Local to Cloud',
    'dialog.pullCloud': '📥 Load from Cloud',
    'toast.localSavedCloud': 'Local data saved to the cloud.',
    'toast.loggedOut': 'You have logged out. Your local data stays on this device.',
    'acc.loginFirstSync': '❌ Log in first to sync',
    'acc.syncing': '☁️ Syncing...',
    'acc.savedCloud': '✅ Saved to cloud',
    'toast.savedCloud': 'Data saved to the cloud',
    'acc.sessionExpired': '❌ Session expired. Please log in again.',
    'acc.error': '❌ Error: {msg}',
    'acc.loadCancelled': 'Load cancelled',
    'acc.dataLoaded': '✅ Data loaded ({n} tasks)',
    'toast.tasksLoadedCloud': '{n} tasks loaded from the cloud',
    'acc.loginFirstLoad': '❌ Log in first to load data',
    'acc.loading': '📥 Loading...',
    'acc.noCloudData': 'No data in the cloud yet',
    'toast.storageFull': 'Local storage is full or unavailable. Changes are not safe yet.',
    'toast.settingsSaveFail': 'Settings could not be saved.',
    'toast.loginPrompt': '⚠️ Log in with your account in Settings (⚙️) first.',
    'dialog.cloudSyncTitle': '☁️ Cloud Sync',
    'dialog.cloudSyncMsg': 'Choose sync direction:',
    'dialog.download': '📥 Download (Load)',
    'dialog.upload': '☁️ Upload (Save)',
    'err.backendOff': 'The account backend is not active on this host. Deploy via a Cloudflare Worker, not static hosting/GitHub Pages.',
    'err.http': 'HTTP {status}',
    'toast.langChanged': '🌐 Language changed to English',
    'acc.cloudConflict': '⚠️ Cloud data is newer than this device',
    'toast.cloudConflict': '⚠️ Auto-sync paused: the cloud data is newer (possibly from another device). Open Settings → choose 📥 Load from Cloud, or ☁️ Save to Cloud to overwrite it.',
    'toast.syncDeferred': 'Auto-sync is paused until you choose Load/Save in Settings.'
  }
};

let currentLang = 'id';
// tr(key, vars) = penerjemah. Sengaja dinamai 'tr' (bukan 't') karena di banyak
// bagian kode variabel 't' sudah dipakai untuk objek task.
function tr(key, vars) {
  const dict = I18N[currentLang] || I18N.id;
  let s = (dict && dict[key] != null) ? dict[key] : (I18N.id[key] != null ? I18N.id[key] : key);
  if (vars) {
    for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  }
  return s;
}
// Locale untuk format tanggal/jam bawaan browser
function dateLocale() { return currentLang === 'en' ? 'en-US' : 'id-ID'; }
function repeatLabel(r) { return tr('repeat.tag.' + r) || r; }

// Terjemahkan semua teks statis di HTML sesuai currentLang
function applyStaticTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = tr(el.getAttribute('data-i18n'));
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = tr(el.getAttribute('data-i18n-html'));
    if (v != null) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const v = tr(el.getAttribute('data-i18n-ph'));
    if (v != null) el.setAttribute('placeholder', v);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const v = tr(el.getAttribute('data-i18n-title'));
    if (v != null) el.setAttribute('title', v);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const v = tr(el.getAttribute('data-i18n-aria'));
    if (v != null) el.setAttribute('aria-label', v);
  });
}

// Ganti bahasa aktif lalu segarkan seluruh tampilan
function applyLang(lang, { rerender = true } = {}) {
  currentLang = (lang === 'en') ? 'en' : 'id';
  settings.lang = currentLang;
  document.documentElement.lang = currentLang;
  applyStaticTranslations();
  if (els.langLabel) els.langLabel.textContent = currentLang === 'en' ? 'English' : 'Bahasa Indonesia';
  if (els.langToggle) {
    els.langToggle.classList.toggle('on', currentLang === 'en');
    els.langToggle.setAttribute('aria-checked', currentLang === 'en' ? 'true' : 'false');
  }
  if (!rerender || !isInitialized) return;
  updatePrioritySelectUI(currentPriority);
  renderQuickTemplates();
  renderParseChips();
  renderCurrentView();
  updateStats();
  renderCalendar();
  updateSuggestions();
  loadSettings();
  refreshAccountUI();
}

let tasks = [];
const STORAGE_SCHEMA_VERSION = 3;
const RESTORE_POINT_KEY = 'tf_restore_point';
const prefersLight = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
let settings = {
  sound: true, haptic: true, dayMode: false, reminders: false,
  // reducedMotion null = ikuti preferensi sistem (prefers-reduced-motion)
  reducedMotion: null, customCursor: true, focusMood: 'deep',
  cloudAutoSync: false,
  // lang: 'id' (default) atau 'en'
  lang: 'id'
};

const systemReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function isReducedMotion() {
  return settings.reducedMotion === null ? systemReducedMotion() : !!settings.reducedMotion;
}
function applyMotionSettings() {
  document.documentElement.classList.toggle('reduced-motion', isReducedMotion());
  const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  const cursorOn = settings.customCursor && !coarse && !isReducedMotion();
  document.documentElement.classList.toggle('no-custom-cursor', !cursorOn);
  if (cursorOn) startCursor(); else stopCursor();
}

// ===== View Transitions: perpindahan card mulus saat re-render =====
function vtName(prefix, id) { return prefix + '-' + String(id).replace(/[^a-zA-Z0-9_-]/g, ''); }
function withViewTransition(fn) {
  if (!document.startViewTransition || isReducedMotion()) { fn(); return; }
  document.startViewTransition(fn);
}

// Angka statistik count-up halus
const statAnims = new WeakMap();
function setStatNumber(el, to, suffix = '') {
  if (!el) return;
  const from = parseInt(String(el.textContent).replace(/[^\d-]/g, ''), 10) || 0;
  if (statAnims.has(el)) cancelAnimationFrame(statAnims.get(el));
  if (from === to || isReducedMotion()) { el.textContent = to + suffix; return; }
  const dur = 500, t0 = performance.now();
  const step = (nowT) => {
    const p = Math.min(1, (nowT - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (to - from) * eased) + suffix;
    if (p < 1) statAnims.set(el, requestAnimationFrame(step));
  };
  statAnims.set(el, requestAnimationFrame(step));
}

// Transisi status selesai satu pintu — completedAt jadi sumber data Weekly Insight
function markDone(t, done) {
  if (done) {
    if (!t.done || !t.completedAt) t.completedAt = new Date().toISOString();
    t.done = true; t.ongoing = false;
  } else {
    t.done = false; t.completedAt = null;
  }
}
const CATEGORY_COLORS = {
  'Kerja': { bg: 'rgba(79,172,254,0.15)', color: '#4facfe', border: 'rgba(79,172,254,0.3)' },
  'Meeting': { bg: 'rgba(176,38,255,0.15)', color: '#b026ff', border: 'rgba(176,38,255,0.3)' },
  'Laporan': { bg: 'rgba(0,245,160,0.12)', color: '#00f5a0', border: 'rgba(0,245,160,0.3)' },
  'Personal': { bg: 'rgba(255,209,102,0.15)', color: '#ffd166', border: 'rgba(255,209,102,0.3)' },
  'Admin': { bg: 'rgba(255,77,109,0.12)', color: '#ff4d6d', border: 'rgba(255,77,109,0.3)' },
  'Keuangan': { bg: 'rgba(0,245,160,0.15)', color: '#00f5a0', border: 'rgba(0,245,160,0.4)' },
  'Proyek': { bg: 'rgba(176,38,255,0.12)', color: '#c7d2fe', border: 'rgba(199,210,254,0.3)' },
  'Urgent': { bg: 'rgba(255,120,0,0.2)', color: '#ff7800', border: 'rgba(255,120,0,0.4)' },
  'Follow-up': { bg: 'rgba(79,172,254,0.1)', color: '#4facfe', border: 'rgba(79,172,254,0.2)' },
  'Review': { bg: 'rgba(255,77,109,0.1)', color: '#ff8fa3', border: 'rgba(255,143,163,0.3)' }
};
const QUICK_TEMPLATES = [
  { icon: '📅', label: 'Meeting', title: 'Meeting ', category: 'Meeting', priority: 'medium' },
  { icon: '📋', label: 'Review', title: 'Review ', category: 'Review', priority: 'medium' },
  { icon: '🔥', label: 'Urgent', title: '', category: 'Urgent', priority: 'high' },
  { icon: '📊', label: 'Laporan', title: 'Laporan ', category: 'Laporan', priority: 'medium' },
  { icon: '💰', label: 'Keuangan', title: '', category: 'Keuangan', priority: 'medium' },
  { icon: '📞', label: 'Follow-up', title: 'Follow up ', category: 'Follow-up', priority: 'medium' }
];
let currentFilter = 'all';
let currentPriorityFilter = 'all';
let currentView = 'list'; // 'list' | 'kanban'
let currentSortFields = [];
let searchQuery = '';
let audioCtx = null;
let currentCalendarDate = new Date();
let selectedDate = null;
let editingId = null;
let focusTaskId = null;
let focusInterval = null;
let focusTimeLeft = 1500;
let focusEndsAt = null;
let currentPriority = 'medium';
let tempSubtasks = [];
let userSetDateTime = false;
let isInitialized = false;
let cloudSyncTimer = null;
let cloudSyncInFlight = false;
let cloudSyncQueued = false;
// true = auto-sync ditunda (user pilih "Nanti" saat login, atau data cloud
// terdeteksi lebih baru). Sinkronisasi manual dari Settings membatalkannya.
let cloudSyncDeferred = false;
let currentUser = null; // { email } saat login, null saat logout

// Stempel waktu data cloud yang terakhir dilihat perangkat ini — dipakai
// untuk mendeteksi bila perangkat lain menyimpan lebih dulu (anti-timpa).
const CLOUD_STAMP_KEY = 'tf_cloudUpdatedAt';
function getCloudStamp() {
  try { return localStorage.getItem(CLOUD_STAMP_KEY); } catch (_) { return null; }
}
function setCloudStamp(value) {
  try {
    if (value) localStorage.setItem(CLOUD_STAMP_KEY, value);
    else localStorage.removeItem(CLOUD_STAMP_KEY);
  } catch (_) {}
}

// Close all popup elements to prevent stacking
function closeAllPopups() {
  closePrioritySelect();
  if (els.settingsPanel) els.settingsPanel.classList.remove('show');
  if (els.dayDetailPanel) els.dayDetailPanel.classList.remove('show');
}

// DOM Elements cache
const els = {};

function getEl(id) {
  const el = document.getElementById(id);
  if (!el && !isInitialized) console.warn('Element not found:', id);
  return el;
}

function cacheElements() {
  const ids = [
    'clock','dateDisplay','progressFill','progressLabel','progressRatio',
    'bentoProgress','bentoProgressAll','bentoTotal','bentoDone','bentoPending',
    'bentoHigh','streakCount','streakFire','taskInput','descInput','subtaskInput',
    'subtaskChips','priorityCustomSelect','priorityTrigger','priorityTriggerIcon',
    'priorityTriggerText','priorityOptions','dateTimeInput','addBtn','taskSuggestions',
    'searchInput','taskList','settingsToggle','settingsPanel','soundToggle','hapticToggle',
    'themeToggle','themeIcon','themeLabel','reducedMotionToggle','cursorToggle','restoreData','clearData','calendarGrid','calendarTitle',
    'prevMonth','nextMonth','prevYear','nextYear','backToToday','dayDetailPanel',
    'dayDetailTitle','dayDetailContent','dayDetailClose','focusOverlay','focusTitle',
    'focusTimer','focusPause','focusClear','editModal','editTitle','editDesc',
    'editDateTime','editPriority','editStatus','editSave','editCancel','cursorDot','cursorOutline',
    'authForms','authEmail','authPassword','loginBtn','registerBtn',
    'accountInfo','accountEmail','cloudAutoSync','syncToCloud','loadFromCloud',
    'logoutBtn','accountStatus','categoryInput','editCategory',
    'priorityFilterSelect','sortControls','cloudMiniSync',
    'kanbanBoard','listViewBtn','kanbanViewBtn',
    'kanbanPending','kanbanOngoing','kanbanDone',
    'kanbanPendingCount','kanbanOngoingCount','kanbanDoneCount',
    'quickTemplates','exportJsonBtn','exportCsvBtn','importJsonBtn','importFileInput',
    'batchBar','batchCount','batchDone','batchDelete','batchCancel','multiSelectBtn',
    'openParsingEditor','parsingEditorModal','parsingEditorClose','parsingSave','parsingCancel','parsingResetDefault',
    'repeatSelect','editRepeat','reminderToggle',
    'formDetails','detailToggle','parseChips',
    'todayFocus','tfMeta','tfTop3','tfTimeline',
    'focusSubtasks','focusMoods',
    'weeklyInsight','wiToggle','wiBody','wiStats','wiChart','wiHeatmap',
    'appDialog','appDialogTitle','appDialogMessage','appDialogInput','appDialogActions',
    'langToggle','langLabel'
  ];
  ids.forEach(id => els[id] = getEl(id));
}

// Safe init wrapper
function safeInit() {
  if (isInitialized) return;
  try {
    cacheElements();
    loadData();
    // Terapkan bahasa tersimpan ke teks statis sebelum render pertama
    applyLang(settings.lang, { rerender: false });
    initClock();
    initInputClock();
    initCursor();
    initCalendar();
    initCustomSelect();
    initSubtaskInput();
    initEnterKey();
    initCommandBar();
    initTodayFocus();
    initFocusMode();
    initMobileNav();
    initWeeklyInsight();
    refreshCategoryDatalists();
    setDefaultDateTime();
    renderTasks();
    updateStats();
    updateSuggestions();
    loadSettings();
    checkStreak();
    initKeyboard();
    initButtonListeners();
    renderQuickTemplates();
    initParsingEditor();
    initReminders();
    initAuth(); // async — cek sesi login di latar belakang
    isInitialized = true;
    handleLaunchShortcut();
    // Penanda versi: terlihat di bawah panel Settings untuk memastikan
    // browser tidak menyajikan build lama dari cache
    if (els.settingsPanel) {
      els.settingsPanel.insertAdjacentHTML('beforeend',
        `<div style="text-align:center; font-size:0.65rem; color:var(--text-dim); opacity:0.7; padding:0.5rem 0 0.2rem;">build ${APP_VERSION}</div>`);
    }
    console.log('TaskFlow initialized successfully — build', APP_VERSION);
  } catch (err) {
    console.error('Init error:', err);
  }
}

function loadData() {
  try {
    const savedTasks = localStorage.getItem('tf_tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      if (!Array.isArray(parsedTasks)) throw new Error('Format task lokal tidak valid');
      tasks = parsedTasks.map(normalizeTask);
    }
    const savedSettings = localStorage.getItem('tf_settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      // Migrasi dari era GitHub Gist: auto-sync lama dipertahankan,
      // sisa field Gist (token/gist id) dibuang.
      if (typeof parsed.githubAutoSync === 'boolean' && !('cloudAutoSync' in parsed)) {
        parsed.cloudAutoSync = parsed.githubAutoSync;
      }
      delete parsed.githubToken; delete parsed.githubGistId; delete parsed.githubAutoSync;
      settings = { ...settings, ...parsed };
      // Belum pernah memilih tema secara eksplisit → ikuti preferensi sistem
      if (!('dayMode' in parsed)) settings.dayMode = prefersLight();
    } else {
      settings.dayMode = prefersLight();
    }
    try { sessionStorage.removeItem('tf_githubToken'); } catch (_) {}
    saveSettings();
  } catch (e) {
    console.error('Load data error:', e);
    showToast(tr('toast.localReadError'), 'error');
  }
}

function handleLaunchShortcut() {
  const shortcut = window.location.hash;
  if (!shortcut) return;
  setTimeout(() => {
    if (shortcut === '#quick-add') {
      setMobileView('today');
      if (els.taskInput) els.taskInput.focus();
    } else if (shortcut === '#today') {
      setMobileView('today');
    } else if (shortcut === '#focus') {
      const nextTask = tasks.find(t => !t.done);
      if (nextTask) enterFocusMode(nextTask.id);
      else showToast(tr('toast.noTaskToFocus'), 'info');
    }
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }, 0);
}

// Set default datetime to now
function setDefaultDateTime() {
  if (!els.dateTimeInput) return;
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  els.dateTimeInput.value = now.toISOString().slice(0, 16);
  userSetDateTime = false;
  if (!els.dateTimeInput.dataset.changeReady) {
    els.dateTimeInput.dataset.changeReady = 'true';
    els.dateTimeInput.addEventListener('change', () => { userSetDateTime = true; });
    els.dateTimeInput.addEventListener('input', () => { userSetDateTime = true; });
  }
}

// Custom Cursor — opsional (settings), auto-off di layar sentuh & saat reduced motion
let cursorRunning = false;
let cursorListenersReady = false;
let cursorMouseX = 0, cursorMouseY = 0;

function startCursor() {
  if (cursorRunning || !els.cursorDot || !els.cursorOutline) return;
  cursorRunning = true;
  els.cursorDot.style.display = 'block';
  els.cursorOutline.style.display = 'block';

  if (!cursorListenersReady) {
    cursorListenersReady = true;
    let cursorFrame = null;
    document.addEventListener('mousemove', (e) => {
      cursorMouseX = e.clientX;
      cursorMouseY = e.clientY;
      if (!cursorRunning) return;

      // Hanya hitung elemen kalender yang sedang di-hover, maksimal sekali per frame.
      if (!cursorFrame) cursorFrame = requestAnimationFrame(() => {
        cursorFrame = null;
        const day = document.elementFromPoint(cursorMouseX, cursorMouseY)?.closest('.cal-day');
        if (!day) return;
        const rect = day.getBoundingClientRect();
        day.style.setProperty('--mx', ((cursorMouseX - rect.left) / rect.width) * 100 + '%');
        day.style.setProperty('--my', ((cursorMouseY - rect.top) / rect.height) * 100 + '%');
      });

      // Trail effect
      if (Math.random() > 0.85) {
        createTrail(e.clientX, e.clientY);
      }
    });

    // Delegasi sekali untuk elemen statis maupun elemen hasil render ulang.
    const interactiveSelector = 'button, .cal-day, .filter-chip, .task-item, .action-btn, .switch, .grip, .select-trigger, .select-option, .chip-remove, .sort-chip, .cloud-mini-btn';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelector)) document.body.classList.add('hovering');
    });
    document.addEventListener('mouseout', (e) => {
      const from = e.target.closest(interactiveSelector);
      const to = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest(interactiveSelector) : null;
      if (from && !to) document.body.classList.remove('hovering');
    });
  }

  let dotX = cursorMouseX, dotY = cursorMouseY;
  let outlineX = cursorMouseX, outlineY = cursorMouseY;

  // Smooth follow animation — loop berhenti total saat cursorRunning false
  (function animateCursor() {
    if (!cursorRunning) return;
    dotX += (cursorMouseX - dotX) * 0.2;
    dotY += (cursorMouseY - dotY) * 0.2;
    outlineX += (cursorMouseX - outlineX) * 0.1;
    outlineY += (cursorMouseY - outlineY) * 0.1;

    els.cursorDot.style.left = dotX + 'px';
    els.cursorDot.style.top = dotY + 'px';
    els.cursorOutline.style.left = outlineX + 'px';
    els.cursorOutline.style.top = outlineY + 'px';

    requestAnimationFrame(animateCursor);
  })();
}

function stopCursor() {
  cursorRunning = false;
  if (els.cursorDot) els.cursorDot.style.display = 'none';
  if (els.cursorOutline) els.cursorOutline.style.display = 'none';
}

function initCursor() {
  applyMotionSettings();
}

function createTrail(x, y) {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  const colors = ['var(--neon-purple)', 'var(--neon-coral)', 'var(--neon-blue)'];
  trail.style.background = colors[Math.floor(Math.random() * colors.length)];
  trail.style.left = (x + (Math.random() - 0.5) * 20) + 'px';
  trail.style.top = (y + (Math.random() - 0.5) * 20) + 'px';
  document.body.appendChild(trail);
  setTimeout(() => { if(trail.parentNode) trail.remove(); }, 800);
}

// Input Section Real-time Clock
function initInputClock() {
  const clockEl = document.getElementById('inputClock');
  const dateEl = document.getElementById('inputDate');
  if (!clockEl || !dateEl) return;
  const update = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');
    clockEl.textContent = `${h}:${m}:${s}`;
    dateEl.textContent = now.toLocaleDateString(dateLocale(), { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  };
  update();
  setInterval(update, 1000);
}

// Clock & Kinetic Typography
function initClock() {
  if (!els.clock) return;
  const update = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');
    els.clock.innerHTML = `${h}:${m}<span class="seconds">:${s}</span>`;
    if (els.dateDisplay) {
      els.dateDisplay.textContent = now.toLocaleDateString(dateLocale(), { weekday:'long', day:'numeric', month:'short', year:'numeric' });
    }
    const weight = 400 + (now.getSeconds() % 60) * 3;
    els.clock.style.fontVariationSettings = `'wght' ${weight}`;
  };
  update();
  setInterval(update, 1000);
}

// Custom Priority Select
function initCustomSelect() {
  if (!els.priorityTrigger || !els.priorityOptions || !els.priorityCustomSelect) return;

  const hasHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;

  // Klik/tap: buka dropdown; toggle-tutup hanya di perangkat tanpa hover
  // (di desktop hover sudah membuka, klik tidak boleh menutupnya lagi)
  els.priorityTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (els.priorityOptions.classList.contains('open')) {
      if (!hasHover) closePrioritySelect();
    } else {
      closeAllPopups();
      openPrioritySelect();
    }
  });
  els.priorityTrigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      els.priorityOptions.classList.contains('open') ? closePrioritySelect() : openPrioritySelect();
    } else if (e.key === 'Escape') {
      closePrioritySelect();
    }
  });

  // Hover: hanya di perangkat yang benar-benar punya hover.
  // Di layar sentuh tap memicu mouseenter simulasi yang akan
  // bertabrakan dengan handler klik di atas.
  if (hasHover) {
    els.priorityCustomSelect.addEventListener('mouseenter', () => {
      closeAllPopups();
      openPrioritySelect();
    });
    // Leave select wrapper -> close if not entering options
    els.priorityCustomSelect.addEventListener('mouseleave', (e) => {
      if (!els.priorityOptions.contains(e.relatedTarget)) {
        closePrioritySelect();
      }
    });
    // Leave options -> close if not entering select wrapper
    els.priorityOptions.addEventListener('mouseleave', (e) => {
      if (!els.priorityCustomSelect.contains(e.relatedTarget)) {
        closePrioritySelect();
      }
    });
  }

  document.querySelectorAll('.select-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = opt.dataset.value;
      currentPriority = val;
      updatePrioritySelectUI(val);
      closePrioritySelect();
    });
  });

  document.addEventListener('click', () => closePrioritySelect());
}

function openPrioritySelect() {
  if (els.priorityOptions) els.priorityOptions.classList.add('open');
  if (els.priorityTrigger) els.priorityTrigger.classList.add('open');
  if (els.priorityTrigger) els.priorityTrigger.setAttribute('aria-expanded', 'true');
  if (els.priorityCustomSelect) els.priorityCustomSelect.classList.add('is-open');
  // Ensure parent glass doesn't clip
  const glass = els.priorityCustomSelect.closest('.glass');
  if (glass) glass.classList.add('dropdown-active');
}

function closePrioritySelect() {
  if (els.priorityOptions) els.priorityOptions.classList.remove('open');
  if (els.priorityTrigger) els.priorityTrigger.classList.remove('open');
  if (els.priorityTrigger) els.priorityTrigger.setAttribute('aria-expanded', 'false');
  if (els.priorityCustomSelect) els.priorityCustomSelect.classList.remove('is-open');
  const glass = (els.priorityCustomSelect && els.priorityCustomSelect.closest('.glass'));
  if (glass) glass.classList.remove('dropdown-active');
}

function updatePrioritySelectUI(val) {
  const icons = { super_high: '💥', high: '🔥', medium: '⚡', low: '🌿' };
  const labels = { super_high: 'Super High', high: 'High', medium: 'Medium', low: 'Low' };
  if (els.priorityTriggerIcon) els.priorityTriggerIcon.textContent = icons[val] || '⚡';
  if (els.priorityTriggerText) els.priorityTriggerText.textContent = labels[val] || val;
  
  document.querySelectorAll('.select-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.value === val);
    opt.setAttribute('aria-selected', opt.dataset.value === val ? 'true' : 'false');
  });
}

function updatePrioritySelect(val) {
  currentPriority = val;
  updatePrioritySelectUI(val);
}

// ===== Command Bar: chip hasil smart parser + panel detail bertahap =====
let chipOverrides = { priority: null, status: null, clearDate: false };
let chipDebounce = null;

function resetChipOverrides() {
  chipOverrides = { priority: null, status: null, clearDate: false };
}

// smartParse + koreksi user via chip — dipakai preview chip DAN addTask
function effectiveParse(raw) {
  const parsed = smartParse(raw);
  const status = chipOverrides.status ||
    (parsed.statusDone ? 'done' : parsed.statusOngoing ? 'ongoing' : 'pending');
  return {
    ...parsed,
    priority: chipOverrides.priority || parsed.priority,
    statusDone: status === 'done',
    statusOngoing: status === 'ongoing',
    dateTime: chipOverrides.clearDate ? null : parsed.dateTime,
    timeHint: chipOverrides.clearDate ? '' : parsed.timeHint
  };
}

function renderParseChips() {
  if (!els.parseChips || !els.taskInput) return;
  const raw = els.taskInput.value.trim();
  if (!raw) { els.parseChips.innerHTML = ''; resetChipOverrides(); return; }
  const p = effectiveParse(raw);
  const labels = { super_high: 'Super High', high: 'High', medium: 'Medium', low: 'Low' };
  const statusKey = p.statusDone ? 'done' : p.statusOngoing ? 'ongoing' : 'pending';
  const statusLabel = tr('chip.status.' + statusKey);
  let html = '';
  if (p.title && p.title !== raw) {
    html += `<span class="parse-chip chip-title" title="${escapeHtml(tr('chip.titleHint'))}">✏️ ${escapeHtml(p.title)}</span>`;
  }
  if (p.dateTime) {
    html += `<span class="parse-chip chip-date" data-chip="date" title="${escapeHtml(tr('chip.dateHint'))}">📅 ${escapeHtml(smartDateDisplay(p.dateTime, p.timeHint))}<span class="chip-x" data-x="date">×</span></span>`;
  }
  if (p.parseError) {
    html += `<span class="parse-chip chip-error" title="${escapeHtml(tr('chip.errorHint'))}">⚠️ ${escapeHtml(p.parseError)}</span>`;
  }
  if (p.category) {
    html += `<span class="parse-chip chip-category" title="${escapeHtml(tr('chip.categoryHint'))}">📁 ${escapeHtml(p.category)}</span>`;
  }
  html += `<span class="parse-chip chip-priority" data-chip="priority" title="${escapeHtml(tr('chip.priorityHint'))}">${getPriorityIcon(p.priority)} ${labels[p.priority] || p.priority}</span>`;
  html += `<span class="parse-chip chip-status chip-status-${statusKey}" data-chip="status" title="${escapeHtml(tr('chip.statusHint'))}">${escapeHtml(statusLabel)}</span>`;
  els.parseChips.innerHTML = html;
}

function initCommandBar() {
  if (els.detailToggle && els.formDetails) {
    els.detailToggle.addEventListener('click', () => {
      const open = els.formDetails.classList.toggle('open');
      els.detailToggle.classList.toggle('active', open);
    });
  }
  if (!els.taskInput || !els.parseChips) return;
  els.taskInput.addEventListener('input', () => {
    clearTimeout(chipDebounce);
    chipDebounce = setTimeout(renderParseChips, 120);
  });
  els.parseChips.addEventListener('click', (e) => {
    const x = e.target.closest('[data-x]');
    if (x) {
      if (x.dataset.x === 'date') chipOverrides.clearDate = true;
      renderParseChips();
      return;
    }
    const chip = e.target.closest('[data-chip]');
    if (!chip) return;
    const raw = els.taskInput.value.trim();
    if (chip.dataset.chip === 'priority') {
      const order = ['low', 'medium', 'high', 'super_high'];
      const cur = effectiveParse(raw).priority;
      const next = order[(order.indexOf(cur) + 1) % order.length];
      chipOverrides.priority = next;
      updatePrioritySelect(next); // sinkron dengan select di panel detail
    } else if (chip.dataset.chip === 'status') {
      const cycle = ['pending', 'ongoing', 'done'];
      const p = effectiveParse(raw);
      const cur = p.statusDone ? 'done' : p.statusOngoing ? 'ongoing' : 'pending';
      chipOverrides.status = cycle[(cycle.indexOf(cur) + 1) % cycle.length];
    } else if (chip.dataset.chip === 'date') {
      // koreksi tanggal/jam manual lewat panel detail
      if (els.formDetails && !els.formDetails.classList.contains('open')) {
        els.formDetails.classList.add('open');
        if (els.detailToggle) els.detailToggle.classList.add('active');
      }
      if (els.dateTimeInput) els.dateTimeInput.focus();
      return;
    }
    renderParseChips();
  });
}

// Subtask Input
function initSubtaskInput() {
  if (!els.subtaskInput) return;
  els.subtaskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = els.subtaskInput.value.trim();
      if (text) {
        tempSubtasks.push({ text, done: false });
        renderSubtaskChips();
        els.subtaskInput.value = '';
        playSound('add');
      }
    }
  });
}

function renderSubtaskChips() {
  if (!els.subtaskChips) return;
  els.subtaskChips.innerHTML = tempSubtasks.map((s, i) => `
    <span class="subtask-chip">
      ${escapeHtml(s.text)}
      <button class="chip-remove" data-idx="${i}">×</button>
    </span>
  `).join('');
  
  els.subtaskChips.querySelectorAll('.chip-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.idx);
      tempSubtasks.splice(idx, 1);
      renderSubtaskChips();
      playSound('delete');
    });
  });
}

// Enter key on ALL inputs
function initEnterKey() {
  // Subtask punya handler Enter sendiri agar tidak ikut men-submit task utama.
  const inputs = ['taskInput', 'descInput', 'categoryInput', 'dateTimeInput'];
  inputs.forEach(id => {
    const el = els[id];
    if (el) {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addTask();
        }
      });
    }
  });
}

// Calendar Logic
function initCalendar() {
  if (!els.calendarGrid) return;
  renderCalendar();
  if (els.prevMonth) els.prevMonth.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1); renderCalendar('right'); });
  if (els.nextMonth) els.nextMonth.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1); renderCalendar('left'); });
  if (els.prevYear) els.prevYear.addEventListener('click', () => { currentCalendarDate.setFullYear(currentCalendarDate.getFullYear() - 1); renderCalendar('right'); });
  if (els.nextYear) els.nextYear.addEventListener('click', () => { currentCalendarDate.setFullYear(currentCalendarDate.getFullYear() + 1); renderCalendar('left'); });
  if (els.backToToday) els.backToToday.addEventListener('click', () => { 
    currentCalendarDate = new Date(); 
    selectedDate = new Date().toDateString(); 
    renderCalendar(); 
    showDayDetail(selectedDate, new Date().getDate()); 
  });
  if (els.dayDetailClose) els.dayDetailClose.addEventListener('click', () => {
    if (els.dayDetailPanel) els.dayDetailPanel.classList.remove('show');
    selectedDate = null;
    renderCalendar();
  });
}

function renderCalendar(direction) {
  if (!els.calendarGrid || !els.calendarTitle) return;
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  els.calendarTitle.textContent = new Date(year, month).toLocaleDateString(dateLocale(), { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const dayNames = currentLang === 'en'
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  let html = '';

  dayNames.forEach(d => html += `<div class="cal-day-header">${d}</div>`);

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    html += `<div class="cal-day other-month"><span class="day-number">${day}</span></div>`;
  }

  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = new Date(year, month, day).toDateString();
    const isToday = today.toDateString() === dateStr;
    const isSelected = selectedDate === dateStr;

    const dayTasks = tasks.filter(t => {
      if (t.dateTime) {
        const tDate = new Date(t.dateTime);
        return tDate.toDateString() === dateStr;
      }
      return new Date(t.createdAt).toDateString() === dateStr;
    });

    let dotsHtml = '';
    dayTasks.slice(0, 5).forEach((t, i) => {
      const dotClass = t.done ? 'done' : (t.priority || 'medium');
      dotsHtml += `<div class="task-dot ${dotClass}" style="animation-delay:${i * 0.05}s"></div>`;
    });
    if (dayTasks.length > 5) dotsHtml += `<div class="task-dot" style="background:var(--text-dim)"></div>`;

    html += `
      <div class="cal-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" data-date="${dateStr}" data-day="${day}">
        <span class="day-number">${day}</span>
        <div class="day-tasks-preview">${dotsHtml}</div>
      </div>
    `;
  }

  const remainingCells = (7 - ((firstDay + daysInMonth) % 7)) % 7;
  for (let day = 1; day <= remainingCells; day++) {
    html += `<div class="cal-day other-month"><span class="day-number">${day}</span></div>`;
  }

  els.calendarGrid.innerHTML = html;

  if (direction) {
    els.calendarGrid.className = 'calendar-grid slide-' + direction;
    setTimeout(() => els.calendarGrid.className = 'calendar-grid', 400);
  }

  document.querySelectorAll('.cal-day:not(.other-month)').forEach(dayEl => {
    dayEl.addEventListener('click', () => {
      const dateStr = dayEl.dataset.date;
      selectedDate = dateStr;
      closeAllPopups();
      showDayDetail(dateStr, parseInt(dayEl.dataset.day));
      renderCalendar();
    });
  });

  // Panel detail tanggal ikut segar setiap kalender di-render ulang
  // (tambah/centang/hapus/edit tugas semuanya lewat renderCalendar)
  refreshDayDetail();
}

function refreshDayDetail() {
  if (selectedDate && els.dayDetailPanel && els.dayDetailPanel.classList.contains('show')) {
    showDayDetail(selectedDate, new Date(selectedDate).getDate());
  }
}

function showDayDetail(dateStr, dayNum) {
  if (!els.dayDetailPanel || !els.dayDetailTitle || !els.dayDetailContent) return;
  const date = new Date(dateStr);
  const formatted = date.toLocaleDateString(dateLocale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  els.dayDetailTitle.textContent = `📅 ${formatted}`;

  const dayTasks = tasks.filter(t => {
    if (t.dateTime) {
      const tDate = new Date(t.dateTime);
      return tDate.toDateString() === dateStr;
    }
    return new Date(t.createdAt).toDateString() === dateStr;
  });

  if (dayTasks.length === 0) {
    els.dayDetailContent.innerHTML = '<div class="empty-state">' + escapeHtml(tr('empty.dayDetail')) + '</div>';
  } else {
    els.dayDetailContent.innerHTML = dayTasks.map((t, i) => `
      <div class="day-task-item ${t.priority} ${t.done ? 'done' : ''}" style="animation-delay:${i * 0.1}s">
        <input type="checkbox" class="task-check" data-task-id="${escapeHtml(t.id)}" ${t.done ? 'checked' : ''}>
        <div style="flex:1; min-width:0;">
          <div style="font-weight:600; ${t.done ? 'text-decoration:line-through;opacity:0.6' : ''}">${escapeHtml(t.title)}</div>
          <div style="font-size:0.75rem; color:var(--text-dim); margin-top:2px;">
            ${t.timeHint ? '🕒 ' + escapeHtml(t.timeHint) + ' · ' : ''}
            <span class="priority-tag p-${t.priority}">${getPriorityIcon(t.priority)} ${t.priority === 'super_high' ? 'Super High' : t.priority}</span>
            ${t.category ? `<span class="category-tag" style="margin-left:3px;">📁 ${escapeHtml(t.category)}</span>` : ''}
          </div>
        </div>
        ${!t.done ? `<button class="action-btn postpone-btn" data-task-id="${escapeHtml(t.id)}" title="${escapeHtml(tr('title.postpone'))}">⏩</button>` : ''}
      </div>
    `).join('');
    els.dayDetailContent.querySelectorAll('.task-check[data-task-id]').forEach(checkbox => {
      checkbox.addEventListener('change', () => toggleTaskFromCalendar(checkbox.dataset.taskId));
    });
    els.dayDetailContent.querySelectorAll('.postpone-btn[data-task-id]').forEach(btn => {
      btn.addEventListener('click', () => postponeTask(btn.dataset.taskId));
    });
  }
  els.dayDetailPanel.classList.add('show');
}

function toggleTaskFromCalendar(id) {
  const t = tasks.find(x => x.id === id);
  if (t) {
    markDone(t, !t.done);
    if (t.done) { spawnRecurring(t); playSound('complete'); vibrate(); checkStreak(); setTimeout(checkAllDoneCelebration, 300); }
    else { t.ongoing = false; }
    save();
    // renderCalendar sudah otomatis me-refresh panel detail tanggal
    withViewTransition(() => { renderCurrentView(); updateStats(); renderCalendar(); });
  }
}

    // Smart Parser — FIXED v2
function smartParse(text) {
  let priority = currentPriority;
  let desc = els.descInput ? els.descInput.value : '';
  let timeHint = '';
  let cleanedText = text;
  let parsedDateTime = null;
  let parseError = '';
  const config = loadParsingConfig();

  // ── Priority ──
  // Catatan: smartParse harus bebas efek samping — ia dipanggil untuk preview
  // chip di setiap ketikan. Mengubah select prioritas di sini membuat pilihan
  // "nyangkut" walau kata kuncinya sudah dihapus dari input.
  for (const item of config.priority) {
    const regex = new RegExp('\\b(' + item.keywords.map(escapeRegex).join('|') + ')\\b', 'gi');
    if (regex.test(cleanedText)) {
      priority = item.val;
      cleanedText = cleanedText.replace(regex, '').trim();
      break;
    }
  }

  // ── Status keywords ──
  let statusDone = false;
  let statusOngoing = false;
  for (const item of config.status) {
    const regex = new RegExp('\\b(' + item.keywords.map(escapeRegex).join('|') + ')\\b', 'gi');
    if (regex.test(cleanedText)) {
      if (item.val === 'done') statusDone = true;
      if (item.val === 'ongoing') statusOngoing = true;
      cleanedText = cleanedText.replace(regex, '').trim();
    }
  }
  cleanedText = cleanedText.replace(/\s+/g, ' ').trim();

  // ── Category (otomatis, hanya jika cocok dengan daftar kategori) ──
  let category = '';
  for (const item of (config.categories || [])) {
    const kws = (item.keywords || []).filter(Boolean);
    if (!kws.length) continue;
    const regex = new RegExp('\\b(' + kws.map(escapeRegex).join('|') + ')\\b', 'i');
    if (regex.test(cleanedText)) { category = item.val; break; }
  }

  // ── Time parsing (jam/pukul) ──
  const timeMatch = cleanedText.match(/(jam|pukul)\s+(\d{1,2})(?:[.:](\d{2}))?\s*(pagi|siang|sore|malam|am|pm)?/i);
  if (timeMatch) {
    let h = parseInt(timeMatch[2]);
    const period = timeMatch[4]?.toLowerCase();
    const minute = parseInt(timeMatch[3] || '00');
    const usesTwelveHourClock = !!period;
    const validHour = usesTwelveHourClock ? h >= 1 && h <= 12 : h >= 0 && h <= 23;
    if (validHour && minute >= 0 && minute <= 59) {
      if (period === 'pagi' || period === 'am') {
        if (h === 12) h = 0;
      } else if (period === 'siang' || period === 'sore' || period === 'pm') {
        if (h < 12) h += 12;
      } else if (period === 'malam') {
        h = h === 12 ? 0 : h + 12;
      }
      timeHint = `${String(h).padStart(2,'0')}:${String(minute).padStart(2,'0')}`;
      cleanedText = cleanedText.replace(timeMatch[0], '').trim();
    } else {
      parseError = tr('parse.invalidTime');
    }
  }
  // Angka berformat 19.30 tanpa kata "jam/pukul" dianggap waktu HANYA bila
  // nilainya masuk akal sebagai jam. Selain itu (mis. harga "25.99") biarkan
  // apa adanya di judul — jangan dianggap error.
  const standaloneTime = cleanedText.match(/\b(\d{1,2})[.:](\d{2})\b/);
  if (standaloneTime && !timeHint) {
    const h = parseInt(standaloneTime[1]);
    const m = parseInt(standaloneTime[2]);
    if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
      timeHint = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
      cleanedText = cleanedText.replace(standaloneTime[0], '').trim();
    }
  }

  // ── Date parsing ──
  const now = new Date();
  let hasDateKeyword = false;
  let todHint = null;

  // Relative dates
  for (const item of config.dates) {
    const regex = new RegExp('\\b(' + item.keywords.map(escapeRegex).join('|') + ')\\b', 'gi');
    if (regex.test(cleanedText)) {
      const d = new Date(now);
      d.setDate(d.getDate() + item.days);
      d.setHours(timeHint ? parseInt(timeHint.split(':')[0]) : 8,
                 timeHint ? parseInt(timeHint.split(':')[1]) : 0, 0, 0);
      parsedDateTime = d.toISOString();
      cleanedText = cleanedText.replace(regex, '').trim();
      hasDateKeyword = true;
      break;
    }
  }

  // Absolute date: DD/MM or DD/MM/YYYY
  if (!parsedDateTime) {
    const absDateMatch = cleanedText.match(/\b(\d{1,2})([\/.])(\d{1,2})(?:[\/.](\d{4}))?\b/);
    if (absDateMatch) {
      const dd = parseInt(absDateMatch[1]);
      const sep = absDateMatch[2];
      const mm = parseInt(absDateMatch[3]) - 1;
      const yyyy = absDateMatch[4] ? parseInt(absDateMatch[4]) : now.getFullYear();
      const d = new Date(yyyy, mm, dd,
                        timeHint ? parseInt(timeHint.split(':')[0]) : 8,
                        timeHint ? parseInt(timeHint.split(':')[1]) : 0, 0);
      // Date akan di-rollover otomatis oleh JS; validasi kembali komponennya.
      if (!isNaN(d.getTime()) && d.getFullYear() === yyyy && d.getMonth() === mm && d.getDate() === dd) {
        parsedDateTime = d.toISOString();
        cleanedText = cleanedText.replace(absDateMatch[0], '').trim();
        hasDateKeyword = true;
      } else if (sep === '/') {
        // Format garis miring jelas dimaksudkan sebagai tanggal → beri tahu user.
        // Format titik ambigu (bisa harga/angka biasa) → biarkan di judul.
        parseError = tr('parse.invalidDate');
      }
    }
  }

  // Day-of-week parsing
  if (!parsedDateTime) {
    const dayNames = ['minggu','senin','selasa','rabu','kamis','jumat','sabtu'];
    const dowRegex = new RegExp('\\b(' + dayNames.join('|') + ')(?:\\s+depan|\\s+minggu\\s+depan)?\\b', 'i');
    const dowMatch = cleanedText.match(dowRegex);
    if (dowMatch) {
      const targetDay = dayNames.indexOf(dowMatch[1].toLowerCase());
      const isNextWeek = /\b(depan|minggu\s+depan)\b/i.test(dowMatch[0]);
      const d = new Date(now);
      let daysDiff = targetDay - d.getDay();
      if (daysDiff <= 0 || isNextWeek) daysDiff += 7;
      d.setDate(d.getDate() + daysDiff);
      d.setHours(timeHint ? parseInt(timeHint.split(':')[0]) : 8,
                 timeHint ? parseInt(timeHint.split(':')[1]) : 0, 0, 0);
      parsedDateTime = d.toISOString();
      cleanedText = cleanedText.replace(dowMatch[0], '').trim();
      hasDateKeyword = true;
    }
  }

  // Time-of-day hints (only when date keyword present)
  if (hasDateKeyword) {
    for (const item of config.timeOfDay) {
      const regex = new RegExp('\\b(' + item.keywords.map(escapeRegex).join('|') + ')\\b', 'gi');
      if (regex.test(cleanedText)) {
        todHint = { h: item.h, m: item.m };
        if (!cleanedText.match(/(jam|pukul)\s*\d/)) {
          cleanedText = cleanedText.replace(regex, '').trim();
        }
        break;
      }
    }
  }

  // Apply todHint to parsedDateTime
  if (parsedDateTime && todHint && !timeHint) {
    const d = new Date(parsedDateTime);
    d.setHours(todHint.h, todHint.m, 0, 0);
    parsedDateTime = d.toISOString();
  }

  // If still no date but there's a timeHint, default to today
  if (!parsedDateTime && timeHint && !parseError) {
    const d = new Date(now);
    const [th, tm] = timeHint.split(':');
    d.setHours(parseInt(th), parseInt(tm), 0, 0);
    parsedDateTime = d.toISOString();
  }

  // ── Final cleanup ──
  // Kata kunci sudah dihapus oleh masing-masing loop parsing di atas (sesuai
  // config user). Di sini cukup rapikan pemisah "|" dan spasi sisa parsing —
  // JANGAN menghapus daftar kata hardcoded, karena itu ikut memakan kata
  // biasa dari judul (mis. "sup" pada "masak sup ayam", atau angka "25.99").
  cleanedText = cleanedText.replace(/^[|\s—-]+|[|\s—-]+$/g, '').trim();
  cleanedText = cleanedText.replace(/\s*\|\s*/g, ' ').trim();
  cleanedText = cleanedText.replace(/\s+/g, ' ').trim();

  // Auto-desc from keywords
  if (!desc && /(beli|bayar|rapat|meeting|olahraga|belajar|kerja)/i.test(cleanedText)) {
    const match = cleanedText.match(/(beli|bayar|rapat|meeting|olahraga|belajar|kerja)/i);
    if (match) desc = match[0];
  }

  return { title: cleanedText || text, priority, desc, timeHint, statusDone, statusOngoing, dateTime: parsedDateTime, parseError, category };
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
// ===== PARSING CONFIG MANAGEMENT =====
const DEFAULT_PARSING_CONFIG = {
  priority: [
    // 'sup' sengaja tidak dipakai — itu kata umum ("sup ayam") dan membuat
    // judul tugas terpotong + prioritas melonjak tanpa disadari.
    { keywords: ['super','superh','shigh','sh','super_high','super high'], val: 'super_high', label: '💥 Super High' },
    { keywords: ['tinggi','high','penting','urgent'], val: 'high', label: '🔥 High' },
    { keywords: ['sedang','medium','biasa'], val: 'medium', label: '⚡ Medium' },
    { keywords: ['rendah','low','nanti'], val: 'low', label: '🌿 Low' }
  ],
  status: [
    { keywords: ['selesai','done','sudah'], val: 'done', label: '✅ Selesai' },
    { keywords: ['OGG'], val: 'ongoing', label: '🔥 On Going' },
    { keywords: ['PND'], val: 'pending', label: '⏳ Pending' }
  ],
  dates: [
    { keywords: ['hari ini','hariini'], days: 0, label: 'Hari Ini' },
    { keywords: ['besok','bsk'], days: 1, label: 'Besok' },
    { keywords: ['lusa'], days: 2, label: 'Lusa' },
    { keywords: ['3 hari lagi','tiga hari lagi'], days: 3, label: '3 Hari Lagi' },
    { keywords: ['4 hari lagi'], days: 4, label: '4 Hari Lagi' },
    { keywords: ['5 hari lagi'], days: 5, label: '5 Hari Lagi' },
    { keywords: ['6 hari lagi'], days: 6, label: '6 Hari Lagi' },
    { keywords: ['seminggu','1 minggu'], days: 7, label: 'Seminggu' },
    { keywords: ['2 minggu'], days: 14, label: '2 Minggu' },
    { keywords: ['3 minggu'], days: 21, label: '3 Minggu' },
    { keywords: ['sebulan','1 bulan'], days: 30, label: 'Sebulan' },
    { keywords: ['2 bulan'], days: 60, label: '2 Bulan' },
    { keywords: ['3 bulan'], days: 90, label: '3 Bulan' }
  ],
  timeOfDay: [
    { keywords: ['pagi'], h: 8, m: 0, label: '🌅 Pagi (08:00)' },
    { keywords: ['siang'], h: 12, m: 0, label: '☀️ Siang (12:00)' },
    { keywords: ['sore'], h: 15, m: 0, label: '🌇 Sore (15:00)' },
    { keywords: ['malam'], h: 19, m: 0, label: '🌙 Malam (19:00)' },
    { keywords: ['nanti'], h: 14, m: 0, label: '⏰ Nanti (14:00)' }
  ],
  categories: [
    { keywords: ['kerja','kerjaan'], val: 'Kerja' },
    { keywords: ['meeting','rapat'], val: 'Meeting' },
    { keywords: ['laporan','report'], val: 'Laporan' },
    { keywords: ['personal','pribadi'], val: 'Personal' },
    { keywords: ['admin'], val: 'Admin' },
    { keywords: ['keuangan','finance'], val: 'Keuangan' },
    { keywords: ['proyek','project'], val: 'Proyek' },
    { keywords: ['urgent','mendesak'], val: 'Urgent' },
    { keywords: ['follow-up','followup','follow up'], val: 'Follow-up' },
    { keywords: ['review'], val: 'Review' }
  ]
};

let parsingConfig = null;
function loadParsingConfig() {
  if (parsingConfig) return parsingConfig;
  try {
    const saved = localStorage.getItem('tf_parsingConfig');
    if (saved) {
      parsingConfig = JSON.parse(saved);
      // Config lama (sebelum fitur kategori) bisa kehilangan key baru — isi dari default
      Object.keys(DEFAULT_PARSING_CONFIG).forEach(key => {
        if (!Array.isArray(parsingConfig[key])) {
          parsingConfig[key] = JSON.parse(JSON.stringify(DEFAULT_PARSING_CONFIG[key]));
        }
      });
      return parsingConfig;
    }
  } catch(e) { console.error('loadParsingConfig error:', e); }
  parsingConfig = JSON.parse(JSON.stringify(DEFAULT_PARSING_CONFIG));
  return parsingConfig;
}
function saveParsingConfig(config) {
  parsingConfig = config;
  try {
    localStorage.setItem('tf_parsingConfig', JSON.stringify(config));
    // Perubahan kata kunci parsing ikut payload sync — tanpa ini, edit
    // kategori dkk. tidak pernah naik ke cloud sampai ada tugas berubah
    scheduleCloudSync();
  } catch(e) { console.error('saveParsingConfig error:', e); }
}
function resetParsingConfig() {
  parsingConfig = JSON.parse(JSON.stringify(DEFAULT_PARSING_CONFIG));
  saveParsingConfig(parsingConfig);
  return parsingConfig;
}


// Add Task
function addTask() {
  if (!els.taskInput) return;
  const raw = els.taskInput.value.trim();
  if (!raw) return;

  const parsed = effectiveParse(raw);
  if (parsed.parseError) {
    showToast(parsed.parseError + '. ' + tr('toast.checkDateTime'), 'error');
    els.taskInput.focus();
    return;
  }

  const newTask = {
    id: Date.now().toString(),
    title: parsed.title || raw,
    desc: parsed.desc || (els.descInput ? els.descInput.value.trim() : ''),
    category: (els.categoryInput && els.categoryInput.value.trim()) || parsed.category || '',
    priority: parsed.priority,
    done: parsed.statusDone || false,
    ongoing: (!parsed.statusDone && parsed.statusOngoing) || false,
    completedAt: parsed.statusDone ? new Date().toISOString() : null,
    createdAt: new Date().toISOString(),
    dateTime: parsed.dateTime || (userSetDateTime && els.dateTimeInput && els.dateTimeInput.value ? new Date(els.dateTimeInput.value).toISOString() : null),
    repeat: els.repeatSelect ? els.repeatSelect.value : 'none',
    notified: false,
    subtasks: [...tempSubtasks],
    pomodoro: { active: false, timeLeft: 1500 }
  };

  tasks.unshift(newTask);
  save();
  renderCurrentView();
  updateStats();
  updateSuggestions();
  renderCalendar();
  playSound('add');
  vibrate();
  
  // Reset inputs & update UI
  els.taskInput.value = '';
  renderParseChips(); // input kosong → chip bersih + override reset
  if (els.descInput) els.descInput.value = '';
  if (els.categoryInput) els.categoryInput.value = '';
  tempSubtasks = [];
  renderSubtaskChips();
  updatePrioritySelect(parsed.priority || 'medium');
  if (els.repeatSelect) els.repeatSelect.value = 'none';
  userSetDateTime = false;
  setDefaultDateTime();
  
}



// Render Tasks
function renderTasks() {
  if (!els.taskList) return;
  const frag = document.createDocumentFragment();
  let filtered = tasks.filter(t => {
    if (currentFilter === 'pending') return !t.done && !t.ongoing;
    if (currentFilter === 'done') return t.done;
    if (currentFilter === 'ongoing') return t.ongoing && !t.done;
    return true;
  });
  
  if (currentPriorityFilter && currentPriorityFilter !== 'all') {
    filtered = filtered.filter(t => t.priority === currentPriorityFilter);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.desc && t.desc.toLowerCase().includes(q)) ||
      (t.category && t.category.toLowerCase().includes(q))
    );
  }
  
  if (currentSortFields.length > 0) {
    filtered.sort((a, b) => {
      for (const field of currentSortFields) {
        let diff = 0;
        if (field === 'date') {
          diff = new Date(b.dateTime || b.createdAt) - new Date(a.dateTime || a.createdAt);
        } else if (field === 'priority') {
          diff = (PRIORITY_ORDER[b.priority] || 2) - (PRIORITY_ORDER[a.priority] || 2);
        } else if (field === 'status') {
          diff = (a.done ? 1 : 0) - (b.done ? 1 : 0);
        }
        if (diff !== 0) return diff;
      }
      return 0;
    });
  }

  filtered.forEach((t, index) => {
    const el = document.createElement('div');
    el.className = `task-item ${t.done ? 'task-done' : ''} ${t.ongoing ? 'ongoing-active' : ''} ${isOverdue(t) ? 'overdue' : ''} ${getGlowClass(t.priority)} ${multiSelectMode && selectedTaskIds.includes(t.id) ? 'selecting' : ''}`;
    el.draggable = true;
    el.dataset.id = t.id;
    el.style.viewTransitionName = vtName('task', t.id);
    el.style.animationDelay = (index * 0.05) + 's';

    const created = new Date(t.createdAt);
    const timeStr = created.toLocaleTimeString(dateLocale(), { hour:'2-digit', minute:'2-digit' });
    const dateStr = created.toLocaleDateString(dateLocale(), { day:'numeric', month:'short' });
    const taskDateTime = t.dateTime ? new Date(t.dateTime) : null;
    const scheduledStr = taskDateTime ? smartDateDisplay(t.dateTime) : '';

    el.innerHTML = `
      ${multiSelectMode ? `<input type="checkbox" class="task-select" ${selectedTaskIds.includes(t.id) ? 'checked' : ''}>` : ''}
      <div class="grip" title="${escapeHtml(tr('title.drag'))}">⋮⋮</div>
      <input type="checkbox" class="task-check" ${t.done ? 'checked' : ''}>
      <div class="task-content">
        <div class="task-header">
          <span class="task-title">${escapeHtml(t.title)}</span>
        </div>
        <div class="task-meta">
          <span class="task-time">🕒 ${scheduledStr || dateStr + ' ' + timeStr}${t.timeHint ? ' → ' + escapeHtml(t.timeHint) : ''}</span>
          <span class="priority-tag p-${t.priority}">${getPriorityIcon(t.priority)} ${t.priority === 'super_high' ? 'Super High' : t.priority}</span>
          ${t.category ? `<span class="category-tag">📁 ${escapeHtml(t.category)}</span>` : ''}
          ${t.repeat && t.repeat !== 'none' ? `<span class="repeat-tag">🔁 ${escapeHtml(repeatLabel(t.repeat))}</span>` : ''}
          ${isOverdue(t) ? `<span class="overdue-tag">${escapeHtml(tr('tag.overdue'))}</span>` : ''}
          ${t.desc ? `<span style="font-size:0.72rem; color:var(--text-dim)">📝 ${escapeHtml(t.desc.length > 40 ? t.desc.slice(0,40)+'…' : t.desc)}</span>` : ''}
        </div>
        ${t.subtasks.length ? `<ul class="subtasks">${t.subtasks.map((s,i)=>`<li class="subtask ${s.done ? 'done' : ''}"><input type="checkbox" class="subtask-check" ${s.done?'checked':''} data-idx="${i}"><span>${escapeHtml(s.text)}</span></li>`).join('')}</ul>` : ''}
        <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.6rem; flex-wrap:wrap;">
          <div class="pomodoro-wrap" style="display:${t.pomodoro.active||t.pomodoro.timeLeft<1500?'flex':'none'}; margin-top:0;">
            <svg class="pomo-circle" viewBox="0 0 36 36"><path class="pomo-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><path class="pomo-progress" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke-dasharray="100" stroke-dashoffset="${100 - (t.pomodoro.timeLeft/1500)*100}"/></svg>
            <span class="pomo-time">${formatTime(t.pomodoro.timeLeft)}</span>
            <button class="pomo-btn">${t.pomodoro.active ? '⏸' : '▶'}</button>
            ${t.pomodoro.active || t.pomodoro.timeLeft < 1500 ? `<button class="pomo-clear-btn" title="${escapeHtml(tr('title.clearFocus'))}">✕</button>` : ''}
          </div>
          ${!t.done ? `<button class="status-toggle-btn ${t.ongoing ? 's-ongoing' : 's-pending'}" data-id="${t.id}" title="${escapeHtml(t.ongoing ? tr('title.setPending') : tr('title.setOngoing'))}">${escapeHtml(t.ongoing ? tr('task.ongoing') : tr('task.pending'))}</button>` : ''}
          <div class="task-actions">
            <button class="action-btn focus-btn" title="${escapeHtml(tr('title.focusTimer'))}">🎯</button>
            <button class="action-btn edit-btn" title="${escapeHtml(tr('title.editTask'))}">✏️</button>
            <button class="action-btn subtask-btn" title="${escapeHtml(tr('title.addSubtask'))}">📋</button>
            ${!t.done ? `<button class="action-btn postpone-btn" title="${escapeHtml(tr('title.postpone'))}">⏩</button>` : ''}
            <button class="action-btn delete-btn" title="${escapeHtml(tr('title.delete'))}">🗑️</button>
          </div>
        </div>
      </div>
    `;

    const check = el.querySelector('.task-check');
    if (check) check.addEventListener('change', () => toggleTask(t.id, check));

    // Multi-select click handler
    const selectBox = el.querySelector('.task-select');
    if (selectBox) selectBox.addEventListener('change', () => toggleTaskSelection(t.id));

    const delBtn = el.querySelector('.delete-btn');
    if (delBtn) delBtn.addEventListener('click', function() {
      this.classList.add('poof');
      setTimeout(() => deleteTask(t.id), 300);
    });

    const editBtn = el.querySelector('.edit-btn');
    if (editBtn) editBtn.addEventListener('click', () => openEditModal(t.id));

    const subBtn = el.querySelector('.subtask-btn');
    if (subBtn) subBtn.addEventListener('click', () => addSubtask(t.id));

    el.querySelectorAll('.subtask-check').forEach(cb => {
      cb.addEventListener('change', (e) => toggleSubtask(t.id, e.target.dataset.idx, e.target.checked));
    });

    const focusBtn = el.querySelector('.focus-btn');
    if (focusBtn) focusBtn.addEventListener('click', () => enterFocusMode(t.id));

    const pomoBtn = el.querySelector('.pomo-btn');
    if (pomoBtn) pomoBtn.addEventListener('click', () => togglePomodoro(t.id));

    const clearBtn = el.querySelector('.pomo-clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', () => clearPomodoro(t.id));

    const statusToggleBtn = el.querySelector('.status-toggle-btn');
    if (statusToggleBtn) statusToggleBtn.addEventListener('click', () => toggleStatus(t.id));

    const postponeBtn = el.querySelector('.postpone-btn');
    if (postponeBtn) postponeBtn.addEventListener('click', () => postponeTask(t.id));

    el.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', t.id); el.classList.add('dragging'); });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
    el.addEventListener('dragover', e => e.preventDefault());
    el.addEventListener('drop', e => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData('text/plain');
      if (draggedId === t.id) return;
      const fromIdx = tasks.findIndex(x => x.id === draggedId);
      const toIdx = tasks.findIndex(x => x.id === t.id);
      if (fromIdx >= 0 && toIdx >= 0) {
        const [moved] = tasks.splice(fromIdx, 1);
        tasks.splice(toIdx, 0, moved);
        save(); renderTasks();
      }
    });

    frag.appendChild(el);
  });

  els.taskList.innerHTML = '';
  els.taskList.appendChild(frag);

  if (filtered.length === 0) {
    els.taskList.innerHTML = '<div class="empty-state"><div class="empty-illustration"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="40" stroke="rgba(176,38,255,0.3)" stroke-width="2" stroke-dasharray="6 4"/><circle cx="60" cy="60" r="28" fill="rgba(176,38,255,0.08)" stroke="rgba(176,38,255,0.4)" stroke-width="1.5"/><path d="M48 58L56 66L72 50" stroke="#00f5a0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/><circle cx="60" cy="60" r="4" fill="#b026ff" opacity="0.6"/><circle cx="35" cy="35" r="3" fill="#ff4d6d" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/></circle><circle cx="85" cy="30" r="2" fill="#ffd166" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/></circle><circle cx="90" cy="80" r="2.5" fill="#4facfe" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/></circle></svg></div>' + escapeHtml(tr('empty.tasks')) + '</div>';
  }
}


// ===== KANBAN BOARD FUNCTIONS =====
let draggedTaskId = null;
let undoStack = [];
const MAX_UNDO = 20;

function renderCurrentView() {
  if (currentView === 'kanban') renderKanban();
  else renderTasks();
}

function toggleView(view) {
  currentView = view || (currentView === 'list' ? 'kanban' : 'list');
  const isKanban = currentView === 'kanban';

  if (els.taskList) els.taskList.classList.toggle('hidden', isKanban);
  if (els.kanbanBoard) els.kanbanBoard.classList.toggle('active', isKanban);
  if (els.listViewBtn) els.listViewBtn.classList.toggle('active', !isKanban);
  if (els.kanbanViewBtn) els.kanbanViewBtn.classList.toggle('active', isKanban);

  if (isKanban) {
    renderKanban();
  } else {
    renderTasks();
  }
}

function renderKanban() {
  if (!els.kanbanPending || !els.kanbanOngoing || !els.kanbanDone) return;

  // Build off-DOM first, satu kali append per kolom
  const fragPending = document.createDocumentFragment();
  const fragOngoing = document.createDocumentFragment();
  const fragDone = document.createDocumentFragment();

  // Apply filters (search + priority only, status is column-based)
  let filtered = [...tasks];
  if (currentPriorityFilter && currentPriorityFilter !== 'all') {
    filtered = filtered.filter(t => t.priority === currentPriorityFilter);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.desc && t.desc.toLowerCase().includes(q)) ||
      (t.category && t.category.toLowerCase().includes(q))
    );
  }

  // Sort if applicable
  if (currentSortFields.length > 0) {
    filtered.sort((a, b) => {
      for (const field of currentSortFields) {
        let diff = 0;
        if (field === 'date') {
          diff = new Date(b.dateTime || b.createdAt) - new Date(a.dateTime || a.createdAt);
        } else if (field === 'priority') {
          diff = (PRIORITY_ORDER[b.priority] || 2) - (PRIORITY_ORDER[a.priority] || 2);
        } else if (field === 'status') {
          diff = (a.done ? 1 : 0) - (b.done ? 1 : 0);
        }
        if (diff !== 0) return diff;
      }
      return 0;
    });
  }

  let pendingCount = 0, ongoingCount = 0, doneCount = 0;

  filtered.forEach((t, index) => {
    const card = document.createElement('div');
    card.className = `kanban-card priority-${t.priority} ${t.done ? 'done-card' : ''} ${isOverdue(t) ? 'overdue' : ''}`;
    card.draggable = true;
    card.dataset.id = t.id;
    card.style.viewTransitionName = vtName('kanban', t.id);
    card.style.animationDelay = (index * 0.03) + 's';

    const taskDateTime = t.dateTime ? new Date(t.dateTime) : null;
    const scheduledStr = taskDateTime ? taskDateTime.toLocaleDateString(dateLocale(),{day:'numeric', month:'short'}) : '';
    const timeStr = taskDateTime ? taskDateTime.toLocaleTimeString(dateLocale(),{hour:'2-digit',minute:'2-digit'}) : '';

    card.innerHTML = `
      <div class="kanban-card-title">${escapeHtml(t.title)}</div>
      <div class="kanban-card-meta">
        ${t.timeHint || timeStr ? `<span class="kanban-card-time">🕒 ${escapeHtml(t.timeHint || timeStr)}</span>` : ''}
        <span class="kanban-card-tag" style="background:${getPriorityBg(t.priority)};color:${getPriorityColor(t.priority)};">${getPriorityIcon(t.priority)} ${t.priority === 'super_high' ? 'S-High' : t.priority}</span>
        ${t.category ? `<span class="kanban-card-tag" style="background:rgba(79,172,254,0.15);color:var(--neon-blue);">📁 ${escapeHtml(t.category)}</span>` : ''}
        ${t.repeat && t.repeat !== 'none' ? `<span class="kanban-card-tag" style="background:rgba(199,210,254,0.12);color:var(--neon-silver);">🔁 ${escapeHtml(repeatLabel(t.repeat))}</span>` : ''}
        ${isOverdue(t) ? `<span class="kanban-card-tag" style="background:rgba(255,77,109,0.2);color:var(--neon-coral);">${escapeHtml(tr('tag.overdue'))}</span>` : ''}
      </div>
      <div class="kanban-card-actions">
        <button class="action-btn edit-btn" title="${escapeHtml(tr('title.editTask'))}">✏️</button>
        ${!t.done ? `<button class="action-btn postpone-btn" title="${escapeHtml(tr('title.postpone'))}">⏩</button>` : ''}
        <button class="action-btn delete-btn" title="${escapeHtml(tr('title.delete'))}">🗑️</button>
      </div>
    `;

    // Drag events
    card.addEventListener('dragstart', (e) => {
      draggedTaskId = t.id;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', t.id);
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      draggedTaskId = null;
      document.querySelectorAll('.kanban-column').forEach(c => c.classList.remove('drag-over'));
      document.querySelectorAll('.kanban-placeholder').forEach(p => p.remove());
    });

    // Action buttons
    const editBtn = card.querySelector('.edit-btn');
    if (editBtn) editBtn.addEventListener('click', (e) => { e.stopPropagation(); openEditModal(t.id); });

    const postponeBtn = card.querySelector('.postpone-btn');
    if (postponeBtn) postponeBtn.addEventListener('click', (e) => { e.stopPropagation(); postponeTask(t.id); });

    const delBtn = card.querySelector('.delete-btn');
    if (delBtn) delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      delBtn.classList.add('poof');
      setTimeout(() => deleteTask(t.id), 300);
    });

    // Place in correct column
    if (t.done) {
      fragDone.appendChild(card);
      doneCount++;
    } else if (t.ongoing) {
      fragOngoing.appendChild(card);
      ongoingCount++;
    } else {
      fragPending.appendChild(card);
      pendingCount++;
    }
  });

  els.kanbanPending.innerHTML = '';
  els.kanbanOngoing.innerHTML = '';
  els.kanbanDone.innerHTML = '';
  els.kanbanPending.appendChild(fragPending);
  els.kanbanOngoing.appendChild(fragOngoing);
  els.kanbanDone.appendChild(fragDone);

  // Update counts
  if (els.kanbanPendingCount) els.kanbanPendingCount.textContent = pendingCount;
  if (els.kanbanOngoingCount) els.kanbanOngoingCount.textContent = ongoingCount;
  if (els.kanbanDoneCount) els.kanbanDoneCount.textContent = doneCount;

  // Empty states
  const kanbanEmpty = '<div class="empty-state" style="padding:1rem;font-size:0.75rem;">' + escapeHtml(tr('kanban.empty')) + '</div>';
  if (pendingCount === 0) els.kanbanPending.innerHTML = kanbanEmpty;
  if (ongoingCount === 0) els.kanbanOngoing.innerHTML = kanbanEmpty;
  if (doneCount === 0) els.kanbanDone.innerHTML = kanbanEmpty;
}

function getPriorityBg(p) {
  const bgs = { super_high: 'rgba(255,120,0,0.2)', high: 'rgba(255,77,109,0.2)', medium: 'rgba(255,209,102,0.2)', low: 'rgba(0,245,160,0.2)' };
  return bgs[p] || 'rgba(255,255,255,0.08)';
}
function getPriorityColor(p) {
  const colors = { super_high: '#ff7800', high: 'var(--neon-coral)', medium: 'var(--neon-yellow)', low: 'var(--neon-green)' };
  return colors[p] || 'var(--text-dim)';
}

function initKanbanDragDrop() {
  // slot preview di kolom target saat drag
  const placeholder = document.createElement('div');
  placeholder.className = 'kanban-placeholder';
  document.querySelectorAll('.kanban-column').forEach(col => {
    const zone = col.querySelector('.kanban-dropzone');
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      col.classList.add('drag-over');
      if (zone && placeholder.parentNode !== zone) zone.appendChild(placeholder);
    });
    col.addEventListener('dragleave', (e) => {
      if (!col.contains(e.relatedTarget)) {
        col.classList.remove('drag-over');
        if (placeholder.parentNode === zone) placeholder.remove();
      }
    });
    col.addEventListener('drop', (e) => {
      e.preventDefault();
      col.classList.remove('drag-over');
      placeholder.remove();
      const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
      if (!taskId) return;

      const newStatus = col.dataset.status;
      const t = tasks.find(x => x.id === taskId);
      if (!t) return;

      // Update task status based on column
      if (newStatus === 'done') {
        if (!t.done) { markDone(t, true); spawnRecurring(t); playSound('complete'); vibrate(); checkStreak(); }
      } else if (newStatus === 'ongoing') {
        if (!t.ongoing || t.done) { markDone(t, false); t.ongoing = true; }
      } else {
        // pending
        if (t.done || t.ongoing) { markDone(t, false); t.ongoing = false; }
      }

      save();
      withViewTransition(() => { renderKanban(); updateStats(); renderCalendar(); });
      playSound('add');

    });
  });
}

function getPriorityIcon(p) {
  const icons = { super_high: '💥', high: '🔥', medium: '⚡', low: '🌿' };
  return icons[p] || '⚡';
}
const PRIORITY_ORDER = { super_high: 4, high: 3, medium: 2, low: 1 };

// Lanjutkan tugas ke hari berikutnya: deadline pindah ke besok (jam dipertahankan).
// Tugas yang dipindah keluar dari hitungan "hari ini", jadi streak hari ini tidak
// terganjal — dan kalau besok diselesaikan, ia dihitung streak di hari itu.
function postponeTask(id) {
  const t = tasks.find(x => x.id === id);
  if (!t || t.done) return;
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const prev = t.dateTime ? new Date(t.dateTime) : null;
  if (prev && !isNaN(prev.getTime())) {
    target.setHours(prev.getHours(), prev.getMinutes(), 0, 0);
    // sudah terjadwal besok atau setelahnya → geser satu hari dari jadwalnya
    if (prev.getTime() >= target.getTime()) {
      target.setTime(prev.getTime());
      target.setDate(target.getDate() + 1);
    }
  } else {
    target.setHours(8, 0, 0, 0);
  }
  t.dateTime = target.toISOString();
  t.notified = false;
  save();
  withViewTransition(() => { renderCurrentView(); updateStats(); renderCalendar(); });
  checkStreak(); // sisa tugas hari ini bisa jadi sudah beres semua
  playSound('add');
  vibrate();
  showToast(tr('toast.postponed', { title: t.title, when: smartDateDisplay(t.dateTime) }), 'info');
}

function toggleStatus(id) {
  const t = tasks.find(x => x.id === id);
  if (!t || t.done) return;
  t.ongoing = !t.ongoing;
  save();
  withViewTransition(renderCurrentView);
  playSound('add');
}

function toggleTask(id, checkbox) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  markDone(t, checkbox.checked);
  if (t.done) { spawnRecurring(t); playSound('complete'); vibrate(); checkStreak(); setTimeout(checkAllDoneCelebration, 300); }
  else { t.ongoing = false; }
  save();
  // micro-interaction dulu (centang pop + card settle), re-render menyusul via view transition
  let delay = 50;
  if (t.done && checkbox && checkbox.classList) {
    checkbox.classList.add('completing');
    const card = checkbox.closest('.task-item, .tf-task, .kanban-card');
    if (card) card.classList.add('task-completing');
    if (!isReducedMotion()) delay = 380;
  }
  setTimeout(() => withViewTransition(() => { renderCurrentView(); updateStats(); renderCalendar(); }), delay);
  
}

function deleteTask(id) {
  const idx = tasks.findIndex(x => x.id === id);
  if (idx >= 0) pushUndo({ type: 'delete', task: Object.assign({}, tasks[idx]), index: idx });
  stopPomodoro(id);
  tasks = tasks.filter(x => x.id !== id);
  save();
  withViewTransition(() => { renderCurrentView(); updateStats(); renderCalendar(); });
  updateSuggestions();
  playSound('delete'); vibrate();
  showToast(tr('toast.taskDeleted'), 'info', { label: tr('undo.label'), onClick: undo });
}

async function addSubtask(id) {
  const text = await showPrompt(tr('prompt.subtaskTitle'), tr('prompt.subtaskPh'));
  if (!text) return;
  const t = tasks.find(x => x.id === id);
  if (t) {
    t.subtasks.push({ text, done: false });
    save(); renderCurrentView();
    playSound('add');
  }
}

function toggleSubtask(id, idx, done) {
  const t = tasks.find(x => x.id === id);
  if (!t || !t.subtasks[idx]) return;
  t.subtasks[idx].done = done;
  save(); renderCurrentView();
  if (done) { playSound('complete'); vibrate(); }
}

// Edit Modal
function openEditModal(id) {
  const t = tasks.find(x => x.id === id);
  if (!t || !els.editModal) return;
  closeAllPopups();
  editingId = id;
  els.editTitle.value = t.title;
  els.editDesc.value = t.desc || '';
  if (els.editCategory) els.editCategory.value = t.category || '';
  els.editPriority.value = t.priority;
  if (els.editRepeat) els.editRepeat.value = t.repeat || 'none';
  if (els.editStatus) els.editStatus.value = t.done ? 'done' : (t.ongoing ? 'ongoing' : 'pending');
  if (t.dateTime) {
    const d = new Date(t.dateTime);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    els.editDateTime.value = d.toISOString().slice(0, 16);
  } else {
    els.editDateTime.value = '';
  }
  els.editModal.classList.add('show');
}







// Focus Mode
function applyFocusMood(mood) {
  if (!els.focusOverlay) return;
  settings.focusMood = ['deep', 'calm', 'night'].includes(mood) ? mood : 'deep';
  els.focusOverlay.classList.remove('mood-calm', 'mood-night');
  if (settings.focusMood === 'calm') els.focusOverlay.classList.add('mood-calm');
  if (settings.focusMood === 'night') els.focusOverlay.classList.add('mood-night');
  if (els.focusMoods) {
    els.focusMoods.querySelectorAll('.focus-mood').forEach(b =>
      b.classList.toggle('active', b.dataset.mood === settings.focusMood));
  }
}

function renderFocusSubtasks() {
  if (!els.focusSubtasks) return;
  const t = tasks.find(x => x.id === focusTaskId);
  if (!t || !t.subtasks.length) { els.focusSubtasks.innerHTML = ''; return; }
  els.focusSubtasks.innerHTML = t.subtasks.map((s, i) => `
    <label class="focus-subtask ${s.done ? 'done' : ''}">
      <input type="checkbox" data-idx="${i}" ${s.done ? 'checked' : ''}>
      <span>${escapeHtml(s.text)}</span>
    </label>`).join('');
}

function enterFocusMode(id) {
  const t = tasks.find(x => x.id === id);
  if (!t || !els.focusOverlay) return;
  focusTaskId = id;
  focusTimeLeft = t.pomodoro.timeLeft > 0 ? t.pomodoro.timeLeft : 1500;
  t.pomodoro.timeLeft = focusTimeLeft;
  if (els.focusTimer) els.focusTimer.textContent = formatTime(focusTimeLeft);
  const open = () => {
    els.focusTitle.textContent = `🎯 ${t.title}`;
    applyFocusMood(settings.focusMood);
    renderFocusSubtasks();
    els.focusOverlay.classList.add('active');
  };
  // transisi menyambung: card tugas jadi hero yang membesar ke layar fokus
  const card = document.querySelector(`.task-item[data-id="${CSS.escape(id)}"], .kanban-card[data-id="${CSS.escape(id)}"]`);
  if (document.startViewTransition && !isReducedMotion() && card) {
    const oldName = card.style.viewTransitionName;
    card.style.viewTransitionName = 'focus-hero';
    const vt = document.startViewTransition(() => {
      card.style.viewTransitionName = oldName;
      open();
    });
    if (vt.finished && vt.finished.catch) vt.finished.catch(() => {});
  } else {
    open();
  }
  startFocusTimer();
}

function startFocusTimer() {
  if (focusInterval) clearInterval(focusInterval);
  if (focusTimeLeft <= 0) focusTimeLeft = 1500;
  focusEndsAt = Date.now() + focusTimeLeft * 1000;
  if (els.focusPause) els.focusPause.textContent = tr('focus.pause');
  const activeTask = tasks.find(x => x.id === focusTaskId);
  if (activeTask) {
    activeTask.pomodoro.active = true;
    activeTask.pomodoro.timeLeft = focusTimeLeft;
    save();
  }
  const tick = () => {
    focusTimeLeft = Math.max(0, Math.ceil((focusEndsAt - Date.now()) / 1000));
    if (els.focusTimer) els.focusTimer.textContent = formatTime(focusTimeLeft);
    const t = tasks.find(x => x.id === focusTaskId);
    if (t) t.pomodoro.timeLeft = focusTimeLeft;
    if (focusTimeLeft <= 0) {
      clearInterval(focusInterval);
      focusInterval = null;
      if (t) {
        t.pomodoro.active = false;
        t.pomodoro.timeLeft = 1500;
        save();
      }
      playSound('complete');
      showToast(tr('toast.focusDone'), 'success');
      exitFocusMode();
    }
  };
  tick();
  focusInterval = setInterval(tick, 250);
}





function exitFocusMode(reset = false) {
  if (focusInterval) clearInterval(focusInterval);
  const t = tasks.find(x => x.id === focusTaskId);
  if (t) {
    t.pomodoro.active = false;
    if (reset) t.pomodoro.timeLeft = 1500;
    else if (focusTimeLeft > 0) t.pomodoro.timeLeft = focusTimeLeft;
    save();
  }
  focusInterval = null;
  focusEndsAt = null;
  focusTaskId = null;
  focusTimeLeft = 1500;
  if (els.focusOverlay) els.focusOverlay.classList.remove('active');
  withViewTransition(renderTasks);
}

// ===== Navigasi mobile: bottom nav + FAB + filter bottom sheet =====
function setMobileView(view) {
  document.body.classList.remove('mview-today', 'mview-calendar', 'mview-tasks');
  document.body.classList.add('mview-' + view);
  document.querySelectorAll('.bnav-item').forEach(b =>
    b.classList.toggle('active', b.dataset.mview === view));
  window.scrollTo({ top: 0 });
}

function initMobileNav() {
  const nav = document.getElementById('bottomNav');
  if (!nav) return;
  setMobileView('today');
  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('.bnav-item');
    if (!btn) return;
    const v = btn.dataset.mview;
    if (v === 'menu') {
      // Menu = settings panel sebagai sheet
      const wasOpen = els.settingsPanel && els.settingsPanel.classList.contains('show');
      closeAllPopups();
      if (els.settingsPanel && !wasOpen) els.settingsPanel.classList.add('show');
      return;
    }
    if (v === 'focus') {
      // langsung fokus ke tugas paling penting hari ini
      const { top3 } = todayFocusData();
      const target = top3[0] || tasks.find(t => !t.done);
      if (target) enterFocusMode(target.id);
      else showToast(tr('toast.noFocusTarget'), 'info');
      return;
    }
    setMobileView(v);
  });

  const fab = document.getElementById('fabAdd');
  if (fab) fab.addEventListener('click', () => {
    setMobileView('today');
    if (els.taskInput) {
      els.taskInput.scrollIntoView({ behavior: isReducedMotion() ? 'auto' : 'smooth', block: 'center' });
      els.taskInput.focus();
    }
  });

  const sheetBtn = document.getElementById('filterSheetBtn');
  const sheetClose = document.getElementById('filterSheetClose');
  const backdrop = document.getElementById('sheetBackdrop');
  const closeSheet = () => document.body.classList.remove('filter-sheet-open');
  if (sheetBtn) sheetBtn.addEventListener('click', () => document.body.classList.toggle('filter-sheet-open'));
  if (sheetClose) sheetClose.addEventListener('click', closeSheet);
  if (backdrop) backdrop.addEventListener('click', closeSheet);
}

function initFocusMode() {
  if (els.focusMoods) {
    els.focusMoods.addEventListener('click', (e) => {
      const btn = e.target.closest('.focus-mood');
      if (!btn) return;
      applyFocusMood(btn.dataset.mood);
      saveSettings();
    });
  }
  if (els.focusSubtasks) {
    els.focusSubtasks.addEventListener('change', (e) => {
      const cb = e.target.closest('input[data-idx]');
      if (!cb || focusTaskId === null) return;
      toggleSubtask(focusTaskId, parseInt(cb.dataset.idx, 10), cb.checked);
      renderFocusSubtasks();
    });
  }
}

// Pomodoro
const pomoIntervals = {};
function stopPomodoro(id) {
  if (pomoIntervals[id]) {
    clearInterval(pomoIntervals[id]);
    delete pomoIntervals[id];
  }
}
function stopAllPomodoros() {
  Object.keys(pomoIntervals).forEach(stopPomodoro);
}
function togglePomodoro(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  if (!t.pomodoro.active && t.pomodoro.timeLeft <= 0) t.pomodoro.timeLeft = 1500;
  t.pomodoro.active = !t.pomodoro.active;

  if (t.pomodoro.active && !pomoIntervals[id]) {
    pomoIntervals[id] = setInterval(() => {
      // Cari ulang task & elemen DOM tiap tick — referensi lama bisa basi
      // setelah re-render, import, atau load dari cloud
      const task = tasks.find(x => x.id === id);
      if (!task) { stopPomodoro(id); return; }
      if (task.pomodoro.timeLeft > 0) {
        task.pomodoro.timeLeft--;
        const row = els.taskList ? els.taskList.querySelector(`.task-item[data-id="${id}"]`) : null;
        if (row) {
          const circle = row.querySelector('.pomo-progress');
          const timeSpan = row.querySelector('.pomo-time');
          if (circle) circle.style.strokeDashoffset = 100 - (task.pomodoro.timeLeft/1500)*100;
          if (timeSpan) timeSpan.textContent = formatTime(task.pomodoro.timeLeft);
        }
      } else {
        stopPomodoro(id);
        task.pomodoro.active = false;
        task.pomodoro.timeLeft = 1500;
        save();
        renderCurrentView();
        playSound('complete');
        showToast(tr('toast.focusDoneFor', { title: task.title }), 'success');
      }
    }, 1000);
  } else if (!t.pomodoro.active) {
    stopPomodoro(id);
  }
  save();
  renderTasks();
}

function clearPomodoro(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  stopPomodoro(id);
  t.pomodoro.active = false;
  t.pomodoro.timeLeft = 1500;
  save(); renderTasks();
  playSound('delete');
}

// Stats & Progress
function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const pending = total - done;
  const high = tasks.filter(t => (t.priority === 'high' || t.priority === 'super_high') && !t.done).length;
  const pctAll = total ? Math.round((done/total)*100) : 0;

  const todayStr = new Date().toDateString();
  const todayTasks = tasks.filter(t => {
    if (t.dateTime) return new Date(t.dateTime).toDateString() === todayStr;
    return new Date(t.createdAt).toDateString() === todayStr;
  });
  const todayTotal = todayTasks.length;
  const todayDone = todayTasks.filter(t => t.done).length;
  const todayPct = todayTotal ? Math.round((todayDone/todayTotal)*100) : 0;

  if (els.progressFill) els.progressFill.style.width = `${todayPct}%`;
  if (els.progressLabel) els.progressLabel.textContent = tr('progress.label', { pct: todayPct });
  if (els.progressRatio) els.progressRatio.textContent = `${todayDone}/${todayTotal}`;
  setStatNumber(els.bentoProgress, todayPct, '%');
  setStatNumber(els.bentoProgressAll, pctAll, '%');
  setStatNumber(els.bentoTotal, total);
  setStatNumber(els.bentoDone, done);
  setStatNumber(els.bentoPending, pending);
  setStatNumber(els.bentoHigh, high);

  let color1, color2;
  if (todayPct <= 25) { color1 = '#ff4d6d'; color2 = '#ff8fa3'; }
  else if (todayPct <= 50) { color1 = '#ffd166'; color2 = '#ffe399'; }
  else if (todayPct <= 75) { color1 = '#00f5a0'; color2 = '#66f8c6'; }
  else { color1 = '#4facfe'; color2 = '#00f2fe'; }
  if (els.progressFill) els.progressFill.style.background = `linear-gradient(90deg, ${color1}, ${color2})`;

  renderTodayFocus();
  if (els.weeklyInsight && els.weeklyInsight.classList.contains('open')) renderWeeklyInsight();
}

// ===== WEEKLY INSIGHT: aktivitas 7 hari + heatmap jam produktif =====
let wiAnimated = false; // animasi grafik hanya sekali per sesi

function weeklyInsightData() {
  const now = new Date();
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = d.toDateString();
    days.push({
      label: d.toLocaleDateString(dateLocale(), { weekday: 'short' }),
      doneCount: tasks.filter(t => t.completedAt && new Date(t.completedAt).toDateString() === key).length,
      pendingCount: tasks.filter(t => !t.done && t.dateTime && new Date(t.dateTime).toDateString() === key).length,
      isToday: i === 0
    });
  }
  const hours = new Array(24).fill(0);
  const cutoff = Date.now() - 30 * 86400000;
  tasks.forEach(t => {
    if (!t.completedAt) return;
    const d = new Date(t.completedAt);
    if (!isNaN(d.getTime()) && d.getTime() >= cutoff) hours[d.getHours()]++;
  });
  return { days, hours };
}

function renderWeeklyInsight() {
  if (!els.wiStats || !els.wiChart || !els.wiHeatmap) return;
  const { days, hours } = weeklyInsightData();
  const doneTotal = days.reduce((s, d) => s + d.doneCount, 0);
  const pendingTotal = days.reduce((s, d) => s + d.pendingCount, 0);
  const streak = parseInt(localStorage.getItem('tf_streak') || '0', 10);
  els.wiStats.innerHTML = `
    <div class="wi-stat"><span class="wi-num" style="color:var(--status-done)">${doneTotal}</span>${escapeHtml(tr('wi.stat.done7'))}</div>
    <div class="wi-stat"><span class="wi-num" style="color:var(--status-pending)">${pendingTotal}</span>${escapeHtml(tr('wi.stat.pending'))}</div>
    <div class="wi-stat"><span class="wi-num">${streak}🔥</span>${escapeHtml(tr('wi.stat.streak'))}</div>`;
  const max = Math.max(1, ...days.map(d => Math.max(d.doneCount, d.pendingCount)));
  els.wiChart.innerHTML = days.map(d => `
    <div class="wi-day ${d.isToday ? 'today' : ''}">
      <div class="wi-bars">
        <div class="wi-bar wi-done" style="height:${Math.round((d.doneCount / max) * 100)}%" title="${escapeHtml(tr('wi.bar.done', { n: d.doneCount }))}"></div>
        <div class="wi-bar wi-pending" style="height:${Math.round((d.pendingCount / max) * 100)}%" title="${escapeHtml(tr('wi.bar.pending', { n: d.pendingCount }))}"></div>
      </div>
      <span class="wi-day-label">${d.label}</span>
    </div>`).join('');
  const hmax = Math.max(1, ...hours);
  els.wiHeatmap.innerHTML = hours.map((c, h) => {
    const alpha = c === 0 ? 0.06 : 0.15 + 0.85 * (c / hmax);
    return `<div class="wi-cell" title="${escapeHtml(tr('wi.cell', { h: String(h).padStart(2, '0'), n: c }))}" style="background:rgba(0,245,160,${alpha.toFixed(2)})"></div>`;
  }).join('');
}

function initWeeklyInsight() {
  if (!els.wiToggle || !els.weeklyInsight) return;
  // Terbuka secara default: render isi sekali saat load
  if (els.weeklyInsight.classList.contains('open')) renderWeeklyInsight();
  els.wiToggle.addEventListener('click', () => {
    const open = els.weeklyInsight.classList.toggle('open');
    if (!open) return;
    renderWeeklyInsight();
    if (!wiAnimated && !isReducedMotion()) {
      els.wiBody.classList.add('animate-once');
      wiAnimated = true;
    } else {
      els.wiBody.classList.remove('animate-once');
    }
  });
}

// ===== TODAY FOCUS: 3 tugas terpenting + timeline jam =====
function todayFocusData() {
  const todayStr = new Date().toDateString();
  const isToday = (t) => {
    if (t.dateTime) return new Date(t.dateTime).toDateString() === todayStr;
    return new Date(t.createdAt).toDateString() === todayStr;
  };
  const todays = tasks.filter(isToday);
  const overdues = tasks.filter(t => isOverdue(t)); // termasuk terlambat dari hari sebelumnya
  const seen = new Set();
  const candidates = [...overdues, ...todays.filter(t => !t.done)].filter(t => {
    if (t.done || seen.has(t.id)) return false;
    seen.add(t.id);
    return true;
  });
  candidates.sort((a, b) => {
    const oa = isOverdue(a) ? 1 : 0, ob = isOverdue(b) ? 1 : 0;
    if (oa !== ob) return ob - oa;                                        // terlambat dulu
    const pa = PRIORITY_ORDER[a.priority] || 2, pb = PRIORITY_ORDER[b.priority] || 2;
    if (pa !== pb) return pb - pa;                                        // prioritas tinggi dulu
    const ta = a.dateTime ? new Date(a.dateTime).getTime() : Infinity;
    const tb = b.dateTime ? new Date(b.dateTime).getTime() : Infinity;
    return ta - tb;                                                       // waktu terdekat dulu
  });
  const now = Date.now();
  const next = todays
    .filter(t => !t.done && t.dateTime && new Date(t.dateTime).getTime() > now)
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))[0] || null;
  return { todays, overdueCount: overdues.length, top3: candidates.slice(0, 3), next };
}

function renderTodayFocus() {
  if (!els.todayFocus || !els.tfTop3) return;
  const { todays, overdueCount, top3, next } = todayFocusData();

  let meta = '';
  if (next) {
    const jam = new Date(next.dateTime).toLocaleTimeString(dateLocale(), { hour: '2-digit', minute: '2-digit' });
    meta += `<span class="tf-badge tf-next-badge" title="${escapeHtml(tr('tf.next'))}">⏭ ${escapeHtml(next.title)} · ${jam}</span>`;
  }
  if (overdueCount) meta += `<span class="tf-badge tf-overdue-badge">${escapeHtml(tr('tf.overdueBadge', { n: overdueCount }))}</span>`;
  els.tfMeta.innerHTML = meta;

  if (!top3.length) {
    els.tfTop3.innerHTML = `<div class="tf-empty">${escapeHtml(todays.length ? tr('tf.allDone') : tr('tf.empty'))}</div>`;
  } else {
    els.tfTop3.innerHTML = top3.map((t, i) => {
      const overdue = isOverdue(t);
      const jam = t.dateTime ? new Date(t.dateTime).toLocaleTimeString(dateLocale(), { hour: '2-digit', minute: '2-digit' }) : '';
      return `
      <div class="tf-task ${overdue ? 'tf-overdue' : ''}" data-id="${t.id}">
        <span class="tf-rank">${i + 1}</span>
        <div class="tf-task-body">
          <div class="tf-task-title">${escapeHtml(t.title)}</div>
          <div class="tf-task-meta">
            ${jam ? `<span>🕒 ${jam}</span>` : ''}
            <span style="color:${getPriorityColor(t.priority)}">${getPriorityIcon(t.priority)} ${t.priority === 'super_high' ? 'S-High' : t.priority}</span>
            ${overdue ? `<span class="tf-late">${escapeHtml(tr('tag.overdue'))}</span>` : ''}
          </div>
        </div>
        <input type="checkbox" class="task-check tf-check" title="${escapeHtml(tr('tf.markDone'))}">
      </div>`;
    }).join('');
  }

  // Timeline jam — dot per tugas hari ini yang punya waktu, garis "sekarang"
  const timed = todays.filter(t => t.dateTime);
  const hourList = timed.map(t => new Date(t.dateTime).getHours());
  const now = new Date();
  const start = Math.min(6, now.getHours(), ...hourList);
  const end = Math.max(21, now.getHours(), ...hourList);
  let cells = '';
  for (let h = start; h <= end; h++) {
    const dots = timed
      .filter(t => new Date(t.dateTime).getHours() === h)
      .map(t => {
        const color = t.done ? 'var(--status-done)' : (isOverdue(t) ? 'var(--status-danger)' : getPriorityColor(t.priority));
        return `<span class="tf-dot" data-id="${t.id}" title="${escapeHtml(t.title)}" style="background:${color}"></span>`;
      }).join('');
    cells += `<div class="tf-hour"><div class="tf-hour-dots">${dots}</div><span class="tf-hour-label">${String(h).padStart(2, '0')}</span></div>`;
  }
  const span = end - start + 1;
  // titik jam = tengah sel; garis "sekarang" diinterpolasi antar tengah sel
  const frac = Math.min(1, Math.max(0, (now.getHours() - start + 0.5 + now.getMinutes() / 60) / span));
  els.tfTimeline.innerHTML = `<div class="tf-hours">${cells}</div><div class="tf-now" style="left:${(frac * 100).toFixed(2)}%"></div>`;
}

function initTodayFocus() {
  if (!els.tfTop3 || !els.tfTimeline) return;
  els.tfTop3.addEventListener('click', (e) => {
    const row = e.target.closest('.tf-task');
    if (!row) return;
    const check = e.target.closest('.tf-check');
    if (check) { toggleTask(row.dataset.id, check); return; }
    openEditModal(row.dataset.id);
  });
  els.tfTimeline.addEventListener('click', (e) => {
    const dot = e.target.closest('.tf-dot');
    if (dot) openEditModal(dot.dataset.id);
  });
  setInterval(renderTodayFocus, 60000); // garis "sekarang" bergeser tiap menit
}

// Streak Logic — streak dihitung dari tugas HARI INI saja,
// konsisten dengan checkAllDoneCelebration
function checkStreak() {
  const today = new Date().toDateString();
  const last = localStorage.getItem('tf_lastComplete');
  let streak = parseInt(localStorage.getItem('tf_streak') || '0');

  const todayTasks = tasks.filter(t => {
    if (t.dateTime) return new Date(t.dateTime).toDateString() === today;
    return new Date(t.createdAt).toDateString() === today;
  });
  const allDoneToday = todayTasks.length > 0 && todayTasks.every(t => t.done);
  if (allDoneToday && last !== today) {
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    streak = (last === yesterday.toDateString()) ? streak + 1 : 1;
    localStorage.setItem('tf_streak', streak);
    localStorage.setItem('tf_lastComplete', today);
  }
  if (els.streakCount) els.streakCount.textContent = streak;
  if (els.streakFire) els.streakFire.classList.toggle('active', streak >= 3);
}

// Search & Filter



// ===== QUICK ADD TEMPLATES =====
function renderQuickTemplates() {
  if (!els.quickTemplates) return;
  els.quickTemplates.innerHTML = QUICK_TEMPLATES.map((tmpl, i) => 
    '<button class="template-chip" data-idx="' + i + '">' + tmpl.icon + ' ' + tmpl.label + '</button>'
  ).join('');
  els.quickTemplates.querySelectorAll('.template-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const tmpl = QUICK_TEMPLATES[parseInt(btn.dataset.idx)];
      if (els.taskInput) els.taskInput.value = tmpl.title;
      if (els.categoryInput) els.categoryInput.value = tmpl.category;
      updatePrioritySelect(tmpl.priority);
      currentPriority = tmpl.priority;
      if (els.taskInput) els.taskInput.focus();
      playSound('add');
    });
  });
}

// ===== EXPORT / IMPORT =====
function exportToJson() {
  const data = {
    schemaVersion: STORAGE_SCHEMA_VERSION,
    tasks,
    settings: Object.assign({}, settings),
    parsingConfig: loadParsingConfig(),
    streak: {
      count: parseInt(localStorage.getItem('tf_streak') || '0'),
      lastComplete: localStorage.getItem('tf_lastComplete') || null
    },
    exportDate: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'taskflow-backup-' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast(tr('toast.exportedJson', { n: tasks.length }), 'success');
}
function exportToCsv() {
  const headers = ['ID','Title','Description','Category','Priority','Status','DateTime','CreatedAt','Subtasks'];
  const csvCell = (value) => {
    let text = String(value ?? '');
    if (/^[=+\-@]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
  };
  const rows = tasks.map(t => [
    t.id, t.title || '', t.desc || '',
    t.category || '', t.priority || '',
    t.done ? 'done' : (t.ongoing ? 'ongoing' : 'pending'),
    t.dateTime || '', t.createdAt || '',
    (t.subtasks || []).map(s => s.text).join('; ')
  ]);
  const csv = '\uFEFF' + [headers.map(csvCell).join(','), ...rows.map(r => r.map(csvCell).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'taskflow-export-' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast(tr('toast.exportedCsv', { n: tasks.length }), 'success');
}

function createTaskId() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}

function normalizeDateValue(value, fallback = null) {
  if (!value) return fallback;
  const date = new Date(value);
  return isNaN(date.getTime()) ? fallback : date.toISOString();
}

function createRestorePoint(source) {
  try {
    localStorage.setItem(RESTORE_POINT_KEY, JSON.stringify({
      schemaVersion: STORAGE_SCHEMA_VERSION,
      source,
      createdAt: new Date().toISOString(),
      tasks,
      settings: Object.assign({}, settings),
      parsingConfig: loadParsingConfig()
    }));
    return true;
  } catch (error) {
    console.error('Restore point error:', error);
    showToast(tr('toast.restoreSnapFail'), 'error');
    return false;
  }
}

async function restoreLastSnapshot() {
  try {
    const raw = localStorage.getItem(RESTORE_POINT_KEY);
    if (!raw) {
      showToast(tr('toast.noSnapshot'), 'info');
      return;
    }
    const snapshot = JSON.parse(raw);
    if (!Array.isArray(snapshot.tasks)) throw new Error('Snapshot tidak valid');
    const label = snapshot.createdAt
      ? new Date(snapshot.createdAt).toLocaleString(dateLocale())
      : (currentLang === 'en' ? 'last snapshot' : 'snapshot terakhir');
    const replaced = await replaceTasksSafely(snapshot.tasks, tr('source.snapshot', { label }));
    if (!replaced) return;
    applyImportedSettings(snapshot.settings);
    if (snapshot.parsingConfig) saveParsingConfig(snapshot.parsingConfig);
    showToast(tr('toast.snapshotRestored'), 'success', { label: tr('undo.plain'), onClick: undo });
  } catch (error) {
    showToast(tr('toast.snapshotRestoreFail', { msg: error.message }), 'error');
  }
}

function applyImportedSettings(importedSettings) {
  if (!importedSettings || typeof importedSettings !== 'object') return;
  ['sound', 'haptic', 'dayMode', 'reminders', 'customCursor', 'cloudAutoSync'].forEach(key => {
    if (typeof importedSettings[key] === 'boolean') settings[key] = importedSettings[key];
  });
  if (typeof importedSettings.githubAutoSync === 'boolean' && typeof importedSettings.cloudAutoSync !== 'boolean') {
    settings.cloudAutoSync = importedSettings.githubAutoSync; // backup era Gist
  }
  if (typeof importedSettings.reducedMotion === 'boolean' || importedSettings.reducedMotion === null) {
    settings.reducedMotion = importedSettings.reducedMotion;
  }
  if (['deep', 'calm', 'night'].includes(importedSettings.focusMood)) settings.focusMood = importedSettings.focusMood;
  const langChanged = (importedSettings.lang === 'id' || importedSettings.lang === 'en') && importedSettings.lang !== currentLang;
  if (importedSettings.lang === 'id' || importedSettings.lang === 'en') settings.lang = importedSettings.lang;
  saveSettings();
  loadSettings();
  applyMotionSettings();
  if (langChanged) applyLang(settings.lang);
}

async function replaceTasksSafely(imported, source, syncAfterReplace = true) {
  if (!Array.isArray(imported)) throw new Error('Daftar tugas tidak valid');
  const normalized = imported.map(normalizeTask).filter(t => t.title);
  const confirmed = await showConfirm(
    tr('confirm.replaceTitle'),
    tr('confirm.replaceMsg', { source, n: normalized.length, cur: tasks.length }),
    tr('confirm.replaceOk')
  );
  if (!confirmed) return false;
  if (tasks.length && !createRestorePoint(source)) return false;

  const previous = JSON.parse(JSON.stringify(tasks));
  pushUndo({ type: 'clear', tasks: previous });
  stopAllPomodoros();
  if (focusInterval) clearInterval(focusInterval);
  focusInterval = null;
  focusEndsAt = null;
  focusTaskId = null;
  focusTimeLeft = 1500;
  if (els.focusOverlay) els.focusOverlay.classList.remove('active');
  tasks = normalized;
  if (!save({ sync: syncAfterReplace })) {
    tasks = previous;
    return false;
  }
  renderCurrentView();
  updateStats();
  renderCalendar();
  updateSuggestions();
  checkStreak();
  return true;
}

// Pastikan task dari import/sync punya semua field yang dibutuhkan renderer
function normalizeTask(t) {
  t = t && typeof t === 'object' ? t : {};
  const priorities = ['super_high', 'high', 'medium', 'low'];
  const rawId = String((t && t.id) || '');
  const safeId = /^[a-zA-Z0-9_-]{1,128}$/.test(rawId) ? rawId : createTaskId();
  const createdAt = normalizeDateValue(t && t.createdAt, new Date().toISOString());
  const timeLeft = t && t.pomodoro && Number.isFinite(Number(t.pomodoro.timeLeft))
    ? Math.max(0, Math.min(1500, Math.floor(Number(t.pomodoro.timeLeft))))
    : 1500;
  return {
    id: safeId,
    title: String((t && t.title) || ''),
    desc: t && t.desc ? String(t.desc) : '',
    category: t && t.category ? String(t.category) : '',
    priority: t && priorities.includes(t.priority) ? t.priority : 'medium',
    done: !!(t && t.done),
    ongoing: !(t && t.done) && !!(t && t.ongoing),
    completedAt: t && t.done ? normalizeDateValue(t.completedAt) : null,
    createdAt,
    dateTime: normalizeDateValue(t && t.dateTime),
    // timeHint ikut dirender ke innerHTML — hanya terima format jam (H:MM/HH:MM)
    timeHint: /^\d{1,2}:\d{2}$/.test(String(t.timeHint || '').trim()) ? String(t.timeHint).trim() : '',
    repeat: ['daily', 'weekly', 'monthly'].includes(t.repeat) ? t.repeat : 'none',
    notified: !!t.notified,
    subtasks: Array.isArray(t.subtasks)
      ? t.subtasks.map(s => ({ text: String(s.text || ''), done: !!s.done })).filter(s => s.text)
      : [],
    pomodoro: {
      active: false,
      timeLeft: timeLeft > 0 ? timeLeft : 1500
    }
  };
}

function parseCsvRows(text) {
  const rows = [];
  let row = [], cur = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = false;
      } else cur += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(cur); cur = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cur); cur = '';
      if (row.some(v => v !== '')) rows.push(row);
      row = [];
    } else cur += c;
  }
  if (cur !== '' || row.length) {
    row.push(cur);
    if (row.some(v => v !== '')) rows.push(row);
  }
  return rows;
}

function parseCsvTasks(text) {
  const rows = parseCsvRows(text);
  if (rows.length < 2) throw new Error('CSV kosong atau tidak valid');
  const header = rows[0].map(h => h.trim().toLowerCase());
  const col = name => header.indexOf(name);
  if (col('title') === -1) throw new Error('Kolom "Title" tidak ditemukan di CSV');
  return rows.slice(1).map(r => {
    const get = name => { const i = col(name); return i >= 0 ? (r[i] || '').trim() : ''; };
    const status = get('status').toLowerCase();
    return {
      id: get('id'),
      title: get('title'),
      desc: get('description'),
      category: get('category'),
      priority: get('priority'),
      done: status === 'done',
      ongoing: status === 'ongoing',
      dateTime: get('datetime') || null,
      createdAt: get('createdat') || null,
      subtasks: get('subtasks')
        ? get('subtasks').split(';').map(s => ({ text: s.trim(), done: false })).filter(s => s.text)
        : []
    };
  }).filter(t => t.title);
}

function importFile(file) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      let imported;
      let importedData = null;
      if (/\.csv$/i.test(file.name)) {
        imported = parseCsvTasks(e.target.result);
      } else {
        importedData = JSON.parse(e.target.result);
        if (!importedData.tasks || !Array.isArray(importedData.tasks)) throw new Error('Format JSON tidak valid');
        imported = importedData.tasks;
      }
      const replaced = await replaceTasksSafely(imported, tr('source.import', { name: file.name }));
      if (!replaced) return;
      if (importedData) {
        applyImportedSettings(importedData.settings);
        if (importedData.parsingConfig) saveParsingConfig(importedData.parsingConfig);
        if (importedData.streak) {
          const count = parseInt(importedData.streak.count);
          if (!isNaN(count)) localStorage.setItem('tf_streak', count);
          if (importedData.streak.lastComplete) localStorage.setItem('tf_lastComplete', importedData.streak.lastComplete);
        }
      }
      showToast(tr('toast.importOk', { n: tasks.length }), 'success', { label: tr('undo.plain'), onClick: undo });
    } catch (err) {
      showToast(tr('toast.importErr', { msg: err.message }), 'error');
    }
  };
  reader.readAsText(file);
}


// ===== MULTI-SELECT =====
let multiSelectMode = false;
let selectedTaskIds = [];

function toggleMultiSelectMode() {
  multiSelectMode = !multiSelectMode;
  selectedTaskIds = [];
  if (els.batchBar) els.batchBar.classList.toggle('active', multiSelectMode);
  if (multiSelectMode) {
    showToast(tr('toast.multiSelectOn'), 'info');
  }
  renderCurrentView();
}
function toggleTaskSelection(id) {
  if (!multiSelectMode) return;
  if (selectedTaskIds.includes(id)) {
    selectedTaskIds = selectedTaskIds.filter(x => x !== id);
  } else {
    selectedTaskIds.push(id);
  }
  updateBatchBar();
  // Re-render to show selection
  renderCurrentView();
}
function updateBatchBar() {
  if (els.batchCount) els.batchCount.textContent = tr('batch.selected', { n: selectedTaskIds.length });
}
function batchMarkDone() {
  if (selectedTaskIds.length === 0) return;
  pushUndo({ type: 'batch-update', ids: selectedTaskIds.slice(), oldStates: selectedTaskIds.map(id => {
    const t = tasks.find(x => x.id === id);
    return t ? { done: t.done, ongoing: t.ongoing, completedAt: t.completedAt || null } : {};
  })});
  selectedTaskIds.forEach(id => {
    const t = tasks.find(x => x.id === id);
    if (t && !t.done) { markDone(t, true); spawnRecurring(t); }
    else if (t) { t.ongoing = false; }
  });
  save();
  selectedTaskIds = [];
  updateBatchBar();
  renderCurrentView();
  updateStats(); renderCalendar();
  playSound('complete');
  checkStreak();
  showToast(tr('toast.markedDone'), 'success');
  setTimeout(checkAllDoneCelebration, 300);
}
function batchDelete() {
  if (selectedTaskIds.length === 0) return;
  const toDelete = tasks.filter(t => selectedTaskIds.includes(t.id));
  pushUndo({ type: 'batch-delete', tasks: JSON.parse(JSON.stringify(toDelete)) });
  toDelete.forEach(t => stopPomodoro(t.id));
  tasks = tasks.filter(t => !selectedTaskIds.includes(t.id));
  save();
  selectedTaskIds = [];
  updateBatchBar();
  renderCurrentView();
  updateStats(); updateSuggestions(); renderCalendar();
  playSound('delete');
  showToast(tr('toast.taskDeleted'), 'info', { label: tr('undo.label'), onClick: undo });
}
function exitMultiSelect() {
  multiSelectMode = false;
  selectedTaskIds = [];
  if (els.batchBar) els.batchBar.classList.remove('active');
  renderCurrentView();
}

// ===== UNDO =====
function pushUndo(action) {
  undoStack.push(Object.assign({ timestamp: Date.now() }, action));
  if (undoStack.length > MAX_UNDO) undoStack.shift();
}
function undo() {
  if (undoStack.length === 0) { showToast(tr('toast.nothingUndo'), 'warn'); return; }
  const action = undoStack.pop();
  if (action.type === 'delete' && action.task) {
    const idx = Math.min(action.index ?? tasks.length, tasks.length);
    tasks.splice(idx, 0, action.task);
    showToast(tr('toast.undoRestore'), 'success');
  } else if (action.type === 'batch-delete' && action.tasks) {
    tasks = tasks.concat(action.tasks);
    showToast(tr('toast.undoBatchRestore', { n: action.tasks.length }), 'success');
  } else if (action.type === 'batch-update' && action.ids && action.oldStates) {
    action.ids.forEach((id, i) => {
      const t = tasks.find(x => x.id === id);
      if (t && action.oldStates[i]) { t.done = action.oldStates[i].done; t.ongoing = action.oldStates[i].ongoing; t.completedAt = action.oldStates[i].completedAt || null; }
    });
    showToast(tr('toast.undoStatus'), 'success');
  } else if (action.type === 'clear') {
    tasks = action.tasks ? JSON.parse(JSON.stringify(action.tasks)) : [];
    showToast(tr('toast.undoData'), 'success');
  }
  save();
  renderCurrentView();
  updateStats(); updateSuggestions(); renderCalendar();
}


// ===== PARSING EDITOR UI =====
let peCurrentTab = 'priority';
let peTempConfig = null;

function initParsingEditor() {
  // Open button in settings
  const openBtn = document.getElementById('openParsingEditor');
  if (openBtn) openBtn.addEventListener('click', openParsingEditor);

  // Close buttons
  const closeBtn = document.getElementById('parsingEditorClose');
  const cancelBtn = document.getElementById('parsingCancel');
  const modal = document.getElementById('parsingEditorModal');
  if (closeBtn) closeBtn.addEventListener('click', closeParsingEditor);
  if (cancelBtn) cancelBtn.addEventListener('click', closeParsingEditor);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeParsingEditor(); });

  // Save
  const saveBtn = document.getElementById('parsingSave');
  if (saveBtn) saveBtn.addEventListener('click', saveParsingEditor);

  // Reset
  const resetBtn = document.getElementById('parsingResetDefault');
  if (resetBtn) resetBtn.addEventListener('click', async () => {
    if (await showConfirm(tr('confirm.resetTitle'),
      tr('confirm.resetMsg'), tr('confirm.resetOk'))) {
      peTempConfig = JSON.parse(JSON.stringify(DEFAULT_PARSING_CONFIG));
      renderParsingEditorTable(peCurrentTab);
      showToast(tr('toast.resetDone'), 'info');
    }
  });

  // Tabs
  document.querySelectorAll('.pe-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      syncParsingEditorTable(peCurrentTab);
      document.querySelectorAll('.pe-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.pe-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      peCurrentTab = tab.dataset.tab;
      document.getElementById('pe-panel-' + peCurrentTab).classList.add('active');
      renderParsingEditorTable(peCurrentTab);
    });
  });

  // Add buttons
  document.querySelectorAll('.pe-add-btn').forEach(btn => {
    btn.addEventListener('click', () => addParsingRow(btn.dataset.type));
  });
}

function refreshCategoryDatalists() {
  const cfg = loadParsingConfig();
  const names = (cfg.categories || []).map(c => c.val).filter(Boolean);
  const opts = names.map(n => '<option value="' + escapeHtml(n) + '"></option>').join('');
  ['categorySuggestions', 'editCategorySuggestions'].forEach(id => {
    const dl = document.getElementById(id);
    if (dl) dl.innerHTML = opts;
  });
}

function openParsingEditor() {
  peTempConfig = JSON.parse(JSON.stringify(loadParsingConfig()));
  ['priority', 'status', 'dates', 'timeOfDay', 'categories'].forEach(renderParsingEditorTable);
  const modal = document.getElementById('parsingEditorModal');
  if (modal) modal.classList.add('show');
}

function closeParsingEditor() {
  const modal = document.getElementById('parsingEditorModal');
  if (modal) modal.classList.remove('show');
  peTempConfig = null;
}

function renderParsingEditorTable(type) {
  const body = document.getElementById('pe-body-' + type);
  if (!body || !peTempConfig) return;

  const items = peTempConfig[type];
  if (!items || items.length === 0) {
    body.innerHTML = '<div style="text-align:center; padding:1rem; color:var(--text-dim); font-size:0.8rem;">Kosong — klik + Tambah</div>';
    return;
  }

  body.innerHTML = items.map((item, idx) => {
    const keywords = Array.isArray(item.keywords) ? item.keywords.join(', ') : item.keywords;
    if (type === 'priority') {
      return '<div class="pe-row" data-idx="' + idx + '"><input class="pe-input" value="' + escapeHtml(keywords) + '" placeholder="super, superh, shigh"><select class="pe-select">' + 
        ['super_high','high','medium','low'].map(v => '<option value="' + v + '"' + (item.val === v ? ' selected' : '') + '>' + v + '</option>').join('') + 
        '</select><button class="pe-delete" title="Hapus">🗑️</button></div>';
    } else if (type === 'status') {
      return '<div class="pe-row" data-idx="' + idx + '"><input class="pe-input" value="' + escapeHtml(keywords) + '" placeholder="selesai, done"><select class="pe-select">' + 
        [['done','done'],['ongoing','ongoing'],['pending','pending']].map(([v,l]) => '<option value="' + v + '"' + (item.val === v ? ' selected' : '') + '>' + l + '</option>').join('') + 
        '</select><button class="pe-delete" title="Hapus">🗑️</button></div>';
    } else if (type === 'dates') {
      return '<div class="pe-row" data-idx="' + idx + '"><input class="pe-input" value="' + escapeHtml(keywords) + '" placeholder="besok, bsk"><input type="number" class="pe-number" value="' + item.days + '"><button class="pe-delete" title="Hapus">🗑️</button></div>';
    } else if (type === 'timeOfDay') {
      const h = String(item.h).padStart(2,'0');
      const m = String(item.m).padStart(2,'0');
      return '<div class="pe-row" data-idx="' + idx + '"><input class="pe-input" value="' + escapeHtml(keywords) + '" placeholder="pagi, sore"><input type="time" class="pe-number" value="' + h + ':' + m + '"><button class="pe-delete" title="Hapus">🗑️</button></div>';
    } else if (type === 'categories') {
      return '<div class="pe-row" data-idx="' + idx + '"><input class="pe-input" value="' + escapeHtml(keywords) + '" placeholder="kerja, kerjaan (opsional)"><input class="pe-input" style="flex:0 0 140px; max-width:140px;" value="' + escapeHtml(item.val || '') + '" placeholder="Nama kategori"><button class="pe-delete" title="Hapus">🗑️</button></div>';
    }
  }).join('');

  // Attach delete handlers
  body.querySelectorAll('.pe-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.pe-row');
      const idx = parseInt(row.dataset.idx);
      syncParsingEditorTable(type);
      peTempConfig[type].splice(idx, 1);
      renderParsingEditorTable(type);
    });
  });
}

function addParsingRow(type) {
  if (!peTempConfig) return;
  if (!Array.isArray(peTempConfig[type])) peTempConfig[type] = [];
  syncParsingEditorTable(type);
  const defaults = {
    priority: { keywords: [''], val: 'medium' },
    status: { keywords: [''], val: 'pending' },
    dates: { keywords: [''], days: 1 },
    timeOfDay: { keywords: [''], h: 8, m: 0 },
    categories: { keywords: [''], val: '' }
  };
  peTempConfig[type].push(JSON.parse(JSON.stringify(defaults[type])));
  renderParsingEditorTable(type);
}

function syncParsingEditorTable(type) {
  if (!peTempConfig) return;
  const body = document.getElementById('pe-body-' + type);
  if (!body || body.querySelectorAll('.pe-row').length === 0) return;

  const next = [];
  body.querySelectorAll('.pe-row').forEach(row => {
    const inputs = row.querySelectorAll('input, select');
    const keywords = (inputs[0] && inputs[0].value ? inputs[0].value : '')
      .split(',')
      .map(k => k.trim())
      .filter(Boolean);

    if (type === 'categories') {
      const name = (inputs[1] && inputs[1].value ? inputs[1].value : '').trim();
      if (!name && keywords.length === 0) return;
      next.push({ keywords, val: name });
    } else if (type === 'priority') {
      if (keywords.length === 0) return;
      next.push({ keywords, val: inputs[1].value });
    } else if (type === 'status') {
      if (keywords.length === 0) return;
      next.push({ keywords, val: inputs[1].value });
    } else if (type === 'dates') {
      if (keywords.length === 0) return;
      next.push({ keywords, val: keywords[0], days: parseInt(inputs[1].value) || 0, label: keywords[0] });
    } else if (type === 'timeOfDay') {
      if (keywords.length === 0) return;
      const [h, m] = inputs[1].value.split(':');
      next.push({ keywords, h: parseInt(h) || 0, m: parseInt(m) || 0, label: keywords[0] });
    }
  });
  peTempConfig[type] = next;
}

function saveParsingEditor() {
  if (!peTempConfig) return;

  ['priority', 'status', 'dates', 'timeOfDay', 'categories'].forEach(syncParsingEditorTable);

  saveParsingConfig(peTempConfig);
  refreshCategoryDatalists();
  closeParsingEditor();
  showToast(tr('toast.keywordsSaved'), 'success');
}

function initButtonListeners() {
  document.querySelectorAll('[role="switch"]').forEach(sw => {
    sw.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        sw.click();
      }
    });
    sw.addEventListener('click', () => setTimeout(() => {
      sw.setAttribute('aria-checked', sw.classList.contains('on') ? 'true' : 'false');
    }, 0));
  });

  // Status filters
  document.querySelectorAll('#statusFilters .filter-chip').forEach(f => {
    f.addEventListener('click', () => {
      document.querySelectorAll('#statusFilters .filter-chip').forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      currentFilter = f.dataset.filter;
      withViewTransition(renderCurrentView);
    });
  });

  // Priority filter
  if (els.priorityFilterSelect) {
    els.priorityFilterSelect.addEventListener('change', () => {
      currentPriorityFilter = els.priorityFilterSelect.value;
      withViewTransition(renderCurrentView);
    });
  }

  // Sort chips
  if (els.sortControls) {
    els.sortControls.querySelectorAll('.sort-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const field = chip.dataset.sort;
        if (currentSortFields.includes(field)) {
          currentSortFields = currentSortFields.filter(f => f !== field);
          chip.classList.remove('active');
        } else {
          currentSortFields.push(field);
          chip.classList.add('active');
        }
        withViewTransition(renderCurrentView);
      });
    });
  }

  // Add Task button
  if (els.addBtn) els.addBtn.addEventListener('click', addTask);

  // Settings
  if (els.settingsToggle) els.settingsToggle.addEventListener('click', () => {
    closePrioritySelect();
    if (els.settingsPanel) els.settingsPanel.classList.toggle('show');
  });

  if (els.soundToggle) els.soundToggle.addEventListener('click', () => { 
    settings.sound = !settings.sound; 
    els.soundToggle.classList.toggle('on'); 
    saveSettings(); 
  });

  if (els.hapticToggle) els.hapticToggle.addEventListener('click', () => {
    settings.haptic = !settings.haptic;
    els.hapticToggle.classList.toggle('on');
    saveSettings();
  });

  if (els.reducedMotionToggle) els.reducedMotionToggle.addEventListener('click', () => {
    settings.reducedMotion = !isReducedMotion();
    els.reducedMotionToggle.classList.toggle('on', isReducedMotion());
    saveSettings();
    applyMotionSettings();
  });

  if (els.cursorToggle) els.cursorToggle.addEventListener('click', () => {
    settings.customCursor = !settings.customCursor;
    els.cursorToggle.classList.toggle('on', settings.customCursor);
    saveSettings();
    applyMotionSettings();
  });

  if (els.langToggle) els.langToggle.addEventListener('click', () => {
    const nextLang = currentLang === 'en' ? 'id' : 'en';
    applyLang(nextLang);
    saveSettings();
    showToast(tr('toast.langChanged'), 'success');
  });

  if (els.reminderToggle) els.reminderToggle.addEventListener('click', async () => {
    if (!settings.reminders) {
      if (!('Notification' in window)) {
        showToast(tr('toast.noNotifSupport'), 'error');
        return;
      }
      let perm = Notification.permission;
      if (perm === 'default') perm = await Notification.requestPermission();
      if (perm !== 'granted') {
        showToast(tr('toast.notifDenied'), 'error');
        return;
      }
      settings.reminders = true;
      showToast(tr('toast.reminderOn'), 'success');
      checkReminders();
    } else {
      settings.reminders = false;
    }
    els.reminderToggle.classList.toggle('on', settings.reminders);
    saveSettings();
  });

  if (els.themeToggle) els.themeToggle.addEventListener('click', () => { 
    settings.dayMode = !settings.dayMode; 
    els.themeToggle.classList.toggle('on');
    document.body.classList.toggle('day-mode');
    if (els.themeIcon) els.themeIcon.classList.add('spin');
    setTimeout(() => { if(els.themeIcon) els.themeIcon.classList.remove('spin'); }, 500);
    if (settings.dayMode) {
      if (els.themeIcon) els.themeIcon.textContent = '☀️';
      if (els.themeLabel) els.themeLabel.textContent = 'Day Mode';
    } else {
      if (els.themeIcon) els.themeIcon.textContent = '🌙';
      if (els.themeLabel) els.themeLabel.textContent = 'Night Mode';
    }
    saveSettings(); 
  });

  if (els.cloudAutoSync) els.cloudAutoSync.addEventListener('click', () => {
    settings.cloudAutoSync = !settings.cloudAutoSync;
    els.cloudAutoSync.classList.toggle('on');
    saveSettings();
    if (settings.cloudAutoSync) scheduleCloudSync();
  });

  if (els.loginBtn) els.loginBtn.addEventListener('click', () => doAuth('login'));
  if (els.registerBtn) els.registerBtn.addEventListener('click', () => doAuth('register'));
  if (els.logoutBtn) els.logoutBtn.addEventListener('click', doLogout);
  if (els.authPassword) els.authPassword.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doAuth('login');
  });

  if (els.restoreData) els.restoreData.addEventListener('click', restoreLastSnapshot);

  if (els.clearData) els.clearData.addEventListener('click', async () => {
    const ok = await showConfirm(tr('confirm.clearTitle'),
      tr('confirm.clearMsg'),
      tr('confirm.clearOk'));
    if (!ok) return;
    pushUndo({ type: 'clear', tasks: JSON.parse(JSON.stringify(tasks)) });
    stopAllPomodoros();
    tasks = []; save(); renderCurrentView(); updateStats(); renderCalendar();
    localStorage.removeItem('tf_streak'); localStorage.removeItem('tf_lastComplete');
    showToast(tr('toast.allCleared'), 'info', { label: tr('undo.label'), onClick: undo });
  });

  // Cloud sync buttons
  if (els.syncToCloud) els.syncToCloud.addEventListener('click', () => syncToCloud());
  if (els.loadFromCloud) els.loadFromCloud.addEventListener('click', loadFromCloud);

  // Cloud mini sync
  if (els.cloudMiniSync) els.cloudMiniSync.addEventListener('click', cloudMiniHandler);

  // Search input
  if (els.searchInput) els.searchInput.addEventListener('input', e => { searchQuery = e.target.value; renderCurrentView(); });

  // Focus mode controls
  if (els.focusPause) els.focusPause.addEventListener('click', () => {
    if (focusInterval) {
      clearInterval(focusInterval);
      focusInterval = null;
      focusEndsAt = null;
      const t = tasks.find(x => x.id === focusTaskId);
      if (t) {
        t.pomodoro.active = false;
        t.pomodoro.timeLeft = focusTimeLeft;
        save();
      }
      els.focusPause.textContent = tr('focus.resume');
    } else {
      startFocusTimer();
    }
  });

  if (els.focusClear) els.focusClear.addEventListener('click', async () => {
    if (await showConfirm(tr('confirm.clearFocusTitle'), tr('confirm.clearFocusMsg'), tr('confirm.clearFocusOk'))) {
      exitFocusMode(true);
    }
  });

  // Edit Modal listeners (must be here after cacheElements runs)
  if (els.editSave) els.editSave.addEventListener('click', () => {
    if (!editingId) return;
    const t = tasks.find(x => x.id === editingId);
    if (!t) return;
    const wasDone = t.done;
    t.title = els.editTitle.value.trim() || t.title;
    t.desc = els.editDesc.value.trim();
    t.category = els.editCategory ? els.editCategory.value.trim() : (t.category || '');
    t.priority = els.editPriority.value;
    if (els.editRepeat) t.repeat = els.editRepeat.value;
    if (els.editStatus) {
      const st = els.editStatus.value;
      if (st === 'done') { markDone(t, true); }
      else if (st === 'ongoing') { markDone(t, false); t.ongoing = true; }
      else { markDone(t, false); t.ongoing = false; }
    }
    if (els.editDateTime.value) {
      t.dateTime = new Date(els.editDateTime.value).toISOString();
      t.notified = false;
    } else {
      t.dateTime = null;
      t.timeHint = '';
      t.notified = false;
    }
    if (!wasDone && t.done) spawnRecurring(t);
    save(); renderCurrentView(); updateStats(); renderCalendar();
    if (els.editModal) els.editModal.classList.remove('show');
    editingId = null;
    playSound('add');
  });

  if (els.editCancel) els.editCancel.addEventListener('click', () => {
    if (els.editModal) els.editModal.classList.remove('show');
    editingId = null;
  });

  if (els.editModal) els.editModal.addEventListener('click', (e) => {
    if (e.target === els.editModal) {
      els.editModal.classList.remove('show');
      editingId = null;
    }
  });

  // View toggle buttons
  if (els.listViewBtn) els.listViewBtn.addEventListener('click', () => toggleView('list'));
  if (els.kanbanViewBtn) els.kanbanViewBtn.addEventListener('click', () => toggleView('kanban'));

  // Init kanban drag & drop
  initKanbanDragDrop();

  // Quick templates
  renderQuickTemplates();

  // Export / Import
  if (els.exportJsonBtn) els.exportJsonBtn.addEventListener('click', exportToJson);
  if (els.exportCsvBtn) els.exportCsvBtn.addEventListener('click', exportToCsv);
  if (els.importJsonBtn && els.importFileInput) {
    els.importJsonBtn.addEventListener('click', () => els.importFileInput.click());
    els.importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) importFile(file);
      e.target.value = '';
    });
  }

  // Multi-select
  if (els.multiSelectBtn) els.multiSelectBtn.addEventListener('click', toggleMultiSelectMode);
  if (els.batchDone) els.batchDone.addEventListener('click', batchMarkDone);
  if (els.batchDelete) els.batchDelete.addEventListener('click', batchDelete);
  if (els.batchCancel) els.batchCancel.addEventListener('click', exitMultiSelect);
}

// Autocomplete Suggestions
function updateSuggestions() {
  if (!els.taskSuggestions) return;
  els.taskSuggestions.innerHTML = '';
  const titles = [...new Set(tasks.map(t => t.title))].filter(Boolean);
  titles.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    els.taskSuggestions.appendChild(opt);
  });
}

// Sound & Haptic
function initAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
function playSound(type) {
  if (!settings.sound) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    if (type === 'add') { 
      osc.frequency.value = 600; 
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime+0.1); 
      osc.start(); osc.stop(audioCtx.currentTime+0.1); 
    }
    else if (type === 'complete') { 
      osc.type='sine'; 
      osc.frequency.setValueAtTime(500, audioCtx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime+0.2); 
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime+0.4); 
      osc.start(); osc.stop(audioCtx.currentTime+0.4); 
    }
    else if (type === 'delete') { 
      osc.frequency.value = 300; 
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime+0.15); 
      osc.start(); osc.stop(audioCtx.currentTime+0.15); 
    }
  } catch(e) { console.error('Sound error:', e); }
}
function vibrate() { 
  if (settings.haptic && navigator.vibrate) navigator.vibrate(40); 
}

// ===== CONFETTI CELEBRATION =====
function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;
  container.innerHTML = '';
  const colors = ['#b026ff', '#ff4d6d', '#00f5a0', '#ffd166', '#4facfe', '#ff7800', '#c7d2fe'];
  const shapes = ['circle', 'square', 'triangle'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = 2 + Math.random() * 3;
    const delay = Math.random() * 1.5;
    const size = 6 + Math.random() * 8;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    piece.style.cssText = `left:${left}vw;animation-duration:${duration}s;animation-delay:${delay}s;width:${size}px;height:${size}px;background:${color};border-radius:${shape==='circle'?'50%':shape==='square'?'2px':'0'};clip-path:${shape==='triangle'?'polygon(50% 0%,0% 100%,100% 100%)':'none'};`;
    container.appendChild(piece);
  }
  setTimeout(() => { if(container) container.innerHTML = ''; }, 6000);
}

function checkAllDoneCelebration() {
  const todayStr = new Date().toDateString();
  const todayTasks = tasks.filter(t => {
    if (t.dateTime) return new Date(t.dateTime).toDateString() === todayStr;
    return new Date(t.createdAt).toDateString() === todayStr;
  });
  if (todayTasks.length > 0 && todayTasks.every(t => t.done)) {
    launchConfetti();
    showToast(tr('toast.allDoneCelebrate'), 'success');
  }
}

// ===== BETTER DATETIME DISPLAY =====
function smartDateDisplay(dateStr, timeStr) {
  if (!dateStr) return timeStr || '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffMs = target - today;
  const diffDays = Math.round(diffMs / 86400000);
  const timePart = timeStr || d.toLocaleTimeString(dateLocale(), { hour:'2-digit', minute:'2-digit' });
  if (diffDays === 0) return tr('date.today', { t: timePart });
  if (diffDays === 1) return tr('date.tomorrow', { t: timePart });
  if (diffDays === 2) return tr('date.dayAfter', { t: timePart });
  if (diffDays === -1) return tr('date.yesterday', { t: timePart });
  if (diffDays > 2 && diffDays <= 6) return tr('date.inDays', { n: diffDays, t: timePart });
  return d.toLocaleDateString(dateLocale(), { day:'numeric', month:'short' }) + (timePart ? `, ${timePart}` : '');
}

// ===== PRIORITY GLOW =====
function getGlowClass(priority) {
  if (priority === 'super_high') return 'glow-super_high';
  if (priority === 'high') return 'glow-high';
  return '';
}

// ===== OVERDUE =====
function isOverdue(t) {
  if (t.done || !t.dateTime) return false;
  const due = new Date(t.dateTime).getTime();
  return !isNaN(due) && due < Date.now();
}

// ===== RECURRING TASKS =====
function spawnRecurring(t) {
  if (!t.repeat || t.repeat === 'none') return;
  const base = t.dateTime ? new Date(t.dateTime) : new Date();
  if (isNaN(base.getTime())) return;
  const next = new Date(base);
  if (t.repeat === 'daily') next.setDate(next.getDate() + 1);
  else if (t.repeat === 'weekly') next.setDate(next.getDate() + 7);
  else if (t.repeat === 'monthly') next.setMonth(next.getMonth() + 1);
  const nextIso = next.toISOString();
  // jangan buat duplikat kalau okurensi berikutnya sudah ada
  if (tasks.some(x => !x.done && x.title === t.title && x.dateTime === nextIso)) return;
  tasks.unshift(normalizeTask({
    ...t,
    id: null,
    done: false,
    ongoing: false,
    notified: false,
    createdAt: new Date().toISOString(),
    dateTime: nextIso,
    subtasks: (t.subtasks || []).map(s => ({ text: s.text, done: false })),
    pomodoro: { active: false, timeLeft: 1500 }
  }));
  showToast(tr('toast.recurringCreated', { when: smartDateDisplay(nextIso) }), 'info');
}

// ===== REMINDER NOTIFIKASI =====
function checkReminders() {
  if (!settings.reminders || !('Notification' in window) || Notification.permission !== 'granted') return;
  const now = Date.now();
  let changed = false;
  tasks.forEach(t => {
    if (t.done || t.notified || !t.dateTime) return;
    const due = new Date(t.dateTime).getTime();
    if (isNaN(due)) return;
    // notifikasi saat jatuh tempo; task yang sudah lama lewat tidak di-spam
    if (due <= now && now - due < 10 * 60 * 1000) {
      try {
        new Notification(tr('notif.dueTitle', { title: t.title }), {
          body: (t.desc ? t.desc + ' · ' : '') + tr('notif.dueBody'),
          tag: 'tf-' + t.id
        });
      } catch (e) { console.warn('Notification error:', e); }
      t.notified = true;
      changed = true;
    }
  });
  if (changed) save();
}
function initReminders() {
  checkReminders();
  setInterval(checkReminders, 30000);
}

// Toast Notifications — action = { label, onClick } menampilkan tombol (mis. Undo)
function showToast(message, type, action) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warn: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type || 'info'}${action ? ' toast-sticky' : ''}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span style="flex:1;">${escapeHtml(message)}</span>`;
  if (action) {
    const btn = document.createElement('button');
    btn.className = 'toast-action-btn';
    btn.textContent = action.label;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toast.remove();
      action.onClick();
    });
    toast.appendChild(btn);
  }
  container.appendChild(toast);
  toast.addEventListener('click', () => toast.remove());
  setTimeout(() => { if(toast.parentNode) toast.remove(); }, action ? 6000 : 3000);
}

// ===== DIALOG KUSTOM (pengganti prompt/confirm bawaan browser) =====
function showDialog({ title, message = '', input = false, placeholder = '', buttons }) {
  return new Promise(resolve => {
    const overlay = els.appDialog;
    if (!overlay) { resolve(null); return; }
    els.appDialogTitle.textContent = title || '';
    els.appDialogMessage.textContent = message;
    els.appDialogMessage.style.display = message ? '' : 'none';
    els.appDialogInput.style.display = input ? '' : 'none';
    els.appDialogInput.placeholder = placeholder;
    els.appDialogInput.value = '';

    const close = (result) => {
      overlay.classList.remove('show');
      overlay.removeEventListener('click', onOverlay);
      document.removeEventListener('keydown', onKey, true);
      resolve(result);
    };
    const onOverlay = (e) => { if (e.target === overlay) close(null); };
    // capture: cegah handler Escape global (yang mengosongkan input form) ikut jalan
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); close(null); }
      else if (e.key === 'Enter' && input) { e.preventDefault(); close(els.appDialogInput.value.trim() || null); }
    };

    els.appDialogActions.innerHTML = '';
    (buttons || [{ label: 'OK', value: true, primary: true }]).forEach(b => {
      const btn = document.createElement('button');
      btn.className = b.primary ? 'btn' : 'btn-icon';
      if (!b.primary) btn.style.padding = '0.6rem 1.2rem';
      btn.textContent = b.label;
      btn.addEventListener('click', () =>
        close(input && b.primary ? (els.appDialogInput.value.trim() || null) : b.value));
      els.appDialogActions.appendChild(btn);
    });

    overlay.addEventListener('click', onOverlay);
    document.addEventListener('keydown', onKey, true);
    overlay.classList.add('show');
    if (input) setTimeout(() => els.appDialogInput.focus(), 60);
  });
}
function showConfirm(title, message, okLabel, cancelLabel) {
  return showDialog({ title, message, buttons: [
    { label: cancelLabel || tr('btn.cancel'), value: false },
    { label: okLabel || 'OK', value: true, primary: true }
  ]});
}
function showPrompt(title, placeholder) {
  return showDialog({ title, input: true, placeholder, buttons: [
    { label: tr('btn.cancel'), value: null },
    { label: 'OK', value: true, primary: true }
  ]});
}

// Cloud Sync — akun email+password, data tersimpan di D1 lewat Worker API
async function api(path, options = {}) {
  const res = await fetch('./api/' + path, {
    credentials: 'same-origin',
    ...options,
    headers: options.body
      ? { ...(options.headers || {}), 'Content-Type': 'application/json' }
      : options.headers
  });
  let payload = null;
  try { payload = await res.json(); } catch (_) {}
  if (!res.ok) {
    const fallback = getApiErrorMessage(res.status, path);
    const err = new Error((payload && payload.error) || fallback);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }
  return payload;
}

function getApiErrorMessage(status, path) {
  if (status === 404 || status === 405) {
    return tr('err.backendOff');
  }
  return tr('err.http', { status });
}

function showAccountStatus(msg, type) {
  if (!els.accountStatus) return;
  els.accountStatus.textContent = msg;
  els.accountStatus.className = 'account-status ' + (type || '');
  if (type === 'success' || type === 'error') {
    setTimeout(() => {
      if (els.accountStatus) { els.accountStatus.textContent = ''; els.accountStatus.className = 'account-status'; }
    }, 5000);
  }
}

function refreshAccountUI() {
  if (els.authForms) els.authForms.style.display = currentUser ? 'none' : '';
  if (els.accountInfo) els.accountInfo.style.display = currentUser ? '' : 'none';
  if (els.accountEmail) els.accountEmail.textContent = currentUser ? currentUser.email : '';
  if (els.cloudAutoSync) {
    els.cloudAutoSync.classList.toggle('on', !!settings.cloudAutoSync);
    els.cloudAutoSync.setAttribute('aria-checked', settings.cloudAutoSync ? 'true' : 'false');
  }
}

// Cek sesi tersimpan (cookie HttpOnly) saat aplikasi dibuka
async function initAuth() {
  try {
    const info = await api('me');
    currentUser = { email: info.email };
  } catch (_) {
    currentUser = null;
  }
  refreshAccountUI();
}

async function doAuth(mode) {
  const email = els.authEmail ? els.authEmail.value.trim() : '';
  const password = els.authPassword ? els.authPassword.value : '';
  if (!email || !email.includes('@')) { showAccountStatus(tr('acc.invalidEmail'), 'error'); return; }
  if (password.length < 8) { showAccountStatus(tr('acc.pwMin'), 'error'); return; }

  showAccountStatus(mode === 'register' ? tr('acc.registering') : tr('acc.loggingIn'), 'info');
  try {
    const info = await api(mode, { method: 'POST', body: JSON.stringify({ email, password }) });
    currentUser = { email: info.email };
    if (els.authPassword) els.authPassword.value = '';
    // Mulai bersih: stempel milik sesi/akun sebelumnya tidak berlaku lagi.
    setCloudStamp(null);
    cloudSyncDeferred = false;
    refreshAccountUI();
    showAccountStatus(tr('acc.loginOk'), 'success');

    if (mode === 'register') {
      // Akun baru: langsung amankan data lokal ke cloud
      if (tasks.length) await syncToCloud({ automatic: true });
      showToast(tr('toast.accountCreated'), 'success');
      return;
    }
    // Login: tawarkan muat data cloud bila ada
    const remote = await api('data');
    if (remote && remote.data) {
      const when = remote.updatedAt ? new Date(remote.updatedAt).toLocaleString(dateLocale()) : '';
      const choice = await showDialog({
        title: tr('dialog.cloudFoundTitle'),
        message: tr('dialog.cloudFoundMsg', { when }),
        buttons: [
          { label: tr('dialog.later'), value: null },
          { label: tr('dialog.pushLocal'), value: 'push' },
          { label: tr('dialog.pullCloud'), value: 'pull', primary: true }
        ]
      });
      if (choice === 'pull') {
        await applyCloudData(remote);
      } else if (choice === 'push') {
        await syncToCloud();
      } else {
        // "Nanti" = user belum memutuskan. Tanpa penundaan ini, auto-sync
        // akan diam-diam menimpa data cloud yang lebih baru beberapa detik
        // kemudian saat ada perubahan lokal.
        cloudSyncDeferred = true;
        if (settings.cloudAutoSync) showToast(tr('toast.syncDeferred'), 'info');
      }
    } else if (tasks.length) {
      await syncToCloud({ automatic: true });
      showToast(tr('toast.localSavedCloud'), 'success');
    }
  } catch (err) {
    showAccountStatus('❌ ' + err.message, 'error');
  }
}

async function doLogout() {
  try { await api('logout', { method: 'POST' }); } catch (_) {}
  currentUser = null;
  setCloudStamp(null);
  cloudSyncDeferred = false;
  refreshAccountUI();
  showToast(tr('toast.loggedOut'), 'info');
}

function scheduleCloudSync() {
  if (!isInitialized || !settings.cloudAutoSync || !currentUser) return;
  // Ditunda: user memilih "Nanti" saat login, atau cloud terdeteksi lebih baru.
  // Jangan menimpa otomatis — tunggu keputusan Muat/Simpan dari user.
  if (cloudSyncDeferred) return;
  clearTimeout(cloudSyncTimer);
  cloudSyncTimer = setTimeout(() => {
    cloudSyncTimer = null;
    if (cloudSyncInFlight) {
      cloudSyncQueued = true;
      return;
    }
    syncToCloud({ automatic: true });
  }, 900);
}

async function syncToCloud({ automatic = false } = {}) {
  if (!currentUser) { showAccountStatus(tr('acc.loginFirstSync'), 'error'); return; }
  if (cloudSyncInFlight) {
    cloudSyncQueued = true;
    return;
  }
  cloudSyncInFlight = true;
  // Simpan manual = keputusan sadar user untuk menimpa → batalkan penundaan.
  if (!automatic) cloudSyncDeferred = false;

  if (!automatic) showAccountStatus(tr('acc.syncing'), 'info');
  try {
    const data = {
      schemaVersion: STORAGE_SCHEMA_VERSION,
      tasks,
      settings: { ...settings },
      parsingConfig: loadParsingConfig(),
      streak: {
        count: parseInt(localStorage.getItem('tf_streak') || '0'),
        lastComplete: localStorage.getItem('tf_lastComplete') || null
      },
      lastSync: new Date().toISOString()
    };
    const payload = { data };
    // Auto-sync menyertakan stempel anti-timpa: server menolak (409) bila
    // data cloud sudah berubah sejak terakhir dilihat perangkat ini.
    // Simpan manual tidak menyertakannya = timpa dengan sengaja.
    if (automatic) payload.ifUpdatedAt = getCloudStamp();
    const res = await api('data', { method: 'PUT', body: JSON.stringify(payload) });
    if (res && res.updatedAt) setCloudStamp(res.updatedAt);
    showAccountStatus(tr('acc.savedCloud'), 'success');
    if (!automatic) showToast(tr('toast.savedCloud'), 'success');
  } catch (err) {
    if (err.status === 401) {
      currentUser = null;
      refreshAccountUI();
      showAccountStatus(tr('acc.sessionExpired'), 'error');
    } else if (err.status === 409) {
      // Perangkat lain menyimpan lebih dulu — tunda auto-sync, minta user memilih.
      cloudSyncDeferred = true;
      showAccountStatus(tr('acc.cloudConflict'), 'error');
      showToast(tr('toast.cloudConflict'), 'warn');
    } else {
      showAccountStatus(tr('acc.error', { msg: err.message }), 'error');
      if (!automatic) showToast(tr('acc.error', { msg: err.message }), 'error');
    }
  } finally {
    cloudSyncInFlight = false;
    if (cloudSyncQueued) {
      cloudSyncQueued = false;
      scheduleCloudSync();
    }
  }
}

async function applyCloudData(remote) {
  const data = remote.data;
  if (!data || !Array.isArray(data.tasks)) throw new Error('Format data cloud tidak valid');
  const replaced = await replaceTasksSafely(data.tasks, tr('source.cloud'), false);
  if (!replaced) {
    showAccountStatus(tr('acc.loadCancelled'), 'info');
    return;
  }
  // Data cloud sudah diterima perangkat ini → catat stempelnya dan
  // aktifkan lagi auto-sync.
  setCloudStamp(remote.updatedAt || null);
  cloudSyncDeferred = false;
  applyImportedSettings(data.settings);
  if (data.parsingConfig) saveParsingConfig(data.parsingConfig);
  if (data.streak) {
    const count = parseInt(data.streak.count);
    if (!isNaN(count)) localStorage.setItem('tf_streak', count);
    if (data.streak.lastComplete) localStorage.setItem('tf_lastComplete', data.streak.lastComplete);
  }
  checkStreak();
  showAccountStatus(tr('acc.dataLoaded', { n: tasks.length }), 'success');
  showToast(tr('toast.tasksLoadedCloud', { n: tasks.length }), 'success', { label: tr('undo.plain'), onClick: undo });
}

async function loadFromCloud() {
  if (!currentUser) { showAccountStatus(tr('acc.loginFirstLoad'), 'error'); return; }
  showAccountStatus(tr('acc.loading'), 'info');
  try {
    const remote = await api('data');
    if (!remote || !remote.data) {
      showAccountStatus(tr('acc.noCloudData'), 'info');
      return;
    }
    await applyCloudData(remote);
  } catch (err) {
    if (err.status === 401) {
      currentUser = null;
      refreshAccountUI();
      showAccountStatus(tr('acc.sessionExpired'), 'error');
    } else {
      showAccountStatus(tr('acc.error', { msg: err.message }), 'error');
      showToast(tr('acc.error', { msg: err.message }), 'error');
    }
  }
}

// Settings
function loadSettings() {
  if (!els.soundToggle || !els.hapticToggle || !els.themeToggle) return;
  els.soundToggle.classList.toggle('on', settings.sound);
  els.hapticToggle.classList.toggle('on', settings.haptic);
  els.themeToggle.classList.toggle('on', settings.dayMode);
  if (els.reducedMotionToggle) els.reducedMotionToggle.classList.toggle('on', isReducedMotion());
  if (els.cursorToggle) els.cursorToggle.classList.toggle('on', !!settings.customCursor);
  if (els.reminderToggle) {
    // izin bisa dicabut dari browser — jangan tampilkan "on" kalau tidak granted
    const granted = ('Notification' in window) && Notification.permission === 'granted';
    settings.reminders = settings.reminders && granted;
    els.reminderToggle.classList.toggle('on', settings.reminders);
  }
  if (els.cloudAutoSync) els.cloudAutoSync.classList.toggle('on', !!settings.cloudAutoSync);
  if (els.langToggle) els.langToggle.classList.toggle('on', currentLang === 'en');
  if (els.langLabel) els.langLabel.textContent = currentLang === 'en' ? 'English' : 'Bahasa Indonesia';

  document.body.classList.toggle('day-mode', !!settings.dayMode);
  if (els.themeIcon) els.themeIcon.textContent = settings.dayMode ? '☀️' : '🌙';
  if (els.themeLabel) els.themeLabel.textContent = settings.dayMode ? 'Day Mode' : 'Night Mode';
  document.querySelectorAll('[role="switch"]').forEach(sw =>
    sw.setAttribute('aria-checked', sw.classList.contains('on') ? 'true' : 'false'));
}

function save({ sync = true } = {}) {
  try {
    localStorage.setItem('tf_tasks', JSON.stringify(tasks));
    if (sync) scheduleCloudSync();
    return true;
  } catch(e) {
    console.error('Save error:', e);
    showToast(tr('toast.storageFull'), 'error');
    return false;
  }
}
function saveSettings() {
  try {
    localStorage.setItem('tf_settings', JSON.stringify(settings));
    scheduleCloudSync();
    return true;
  } catch(e) {
    console.error('Save settings error:', e);
    showToast(tr('toast.settingsSaveFail'), 'error');
    return false;
  }
}
function escapeHtml(str) {
  if (!str) return '';
  const d=document.createElement('div'); d.textContent=str; return d.innerHTML;
}
function formatTime(s) { const m=Math.floor(s/60); const sec=s%60; return `${m}:${String(sec).padStart(2,'0')}`; }

// Keyboard
function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      undo();
      return;
    }
    if (e.key === 'Escape') {
      if (els.taskInput) els.taskInput.value = '';
      if (els.descInput) els.descInput.value = '';
      if (els.subtaskInput) els.subtaskInput.value = '';
      tempSubtasks = [];
      renderSubtaskChips();
      if (document.activeElement) document.activeElement.blur();
      if (els.settingsPanel) els.settingsPanel.classList.remove('show');
      if (els.editModal) els.editModal.classList.remove('show');
      if (els.dayDetailPanel) els.dayDetailPanel.classList.remove('show');
      closePrioritySelect();
    }
  });
}

async function cloudMiniHandler() {
  if (!currentUser) {
    showToast(tr('toast.loginPrompt'), 'warn');
    if (els.settingsPanel) els.settingsPanel.classList.add('show');
    return;
  }
  const choice = await showDialog({
    title: tr('dialog.cloudSyncTitle'),
    message: tr('dialog.cloudSyncMsg'),
    buttons: [
      { label: tr('btn.cancel'), value: null },
      { label: tr('dialog.download'), value: 'load' },
      { label: tr('dialog.upload'), value: 'save', primary: true }
    ]
  });
  if (choice === 'save') syncToCloud();
  else if (choice === 'load') loadFromCloud();
}

// PWA — daftarkan service worker (butuh HTTPS atau localhost)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .catch(err => console.warn('Service worker tidak terdaftar:', err));
  });
}

// Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', safeInit);
} else {
  safeInit();
}
