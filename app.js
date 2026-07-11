// State & Config
let tasks = [];
const prefersLight = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
let settings = {
  sound: true, haptic: true, dayMode: false, reminders: false,
  githubToken: '', githubGistId: '', githubAutoSync: false
};
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
let currentPriority = 'medium';
let tempSubtasks = [];
let userSetDateTime = false;
let isInitialized = false;

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
    'themeToggle','themeIcon','themeLabel','clearData','calendarGrid','calendarTitle',
    'prevMonth','nextMonth','prevYear','nextYear','backToToday','dayDetailPanel',
    'dayDetailTitle','dayDetailContent','dayDetailClose','focusOverlay','focusTitle',
    'focusTimer','focusPause','focusClear','editModal','editTitle','editDesc',
    'editDateTime','editPriority','editStatus','editSave','editCancel','cursorDot','cursorOutline',
    'githubToken','githubGistId','githubAutoSync','syncToGithub','loadFromGithub',
    'githubStatus','categoryInput','editCategory',
    'priorityFilterSelect','sortControls','githubMiniSync',
    'kanbanBoard','listViewBtn','kanbanViewBtn',
    'kanbanPending','kanbanOngoing','kanbanDone',
    'kanbanPendingCount','kanbanOngoingCount','kanbanDoneCount',
    'quickTemplates','exportJsonBtn','exportCsvBtn','importJsonBtn','importFileInput',
    'batchBar','batchCount','batchDone','batchDelete','batchCancel','multiSelectBtn',
    'openParsingEditor','parsingEditorModal','parsingEditorClose','parsingSave','parsingCancel','parsingResetDefault',
    'repeatSelect','editRepeat','reminderToggle',
    'appDialog','appDialogTitle','appDialogMessage','appDialogInput','appDialogActions'
  ];
  ids.forEach(id => els[id] = getEl(id));
}

// Safe init wrapper
function safeInit() {
  if (isInitialized) return;
  try {
    cacheElements();
    loadData();
    initClock();
    initInputClock();
    initCursor();
    initCalendar();
    initCustomSelect();
    initSubtaskInput();
    initEnterKey();
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
    isInitialized = true;
    console.log('TaskFlow initialized successfully');
  } catch (err) {
    console.error('Init error:', err);
  }
}

function loadData() {
  try {
    const savedTasks = localStorage.getItem('tf_tasks');
    if (savedTasks) tasks = JSON.parse(savedTasks);
    const savedSettings = localStorage.getItem('tf_settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      settings = { ...settings, ...parsed };
      // Belum pernah memilih tema secara eksplisit → ikuti preferensi sistem
      if (!('dayMode' in parsed)) settings.dayMode = prefersLight();
    } else {
      settings.dayMode = prefersLight();
    }
  } catch (e) {
    console.error('Load data error:', e);
  }
}

// Set default datetime to now
function setDefaultDateTime() {
  if (!els.dateTimeInput) return;
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  els.dateTimeInput.value = now.toISOString().slice(0, 16);
  userSetDateTime = false;
  els.dateTimeInput.addEventListener('change', () => { userSetDateTime = true; });
  els.dateTimeInput.addEventListener('input', () => { userSetDateTime = true; });
}

// Custom Cursor - Fixed
function initCursor() {
  if (!els.cursorDot || !els.cursorOutline) return;
  
  // Show cursors
  els.cursorDot.style.display = 'block';
  els.cursorOutline.style.display = 'block';
  
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let outlineX = 0, outlineY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update CSS variables for calendar hover glow
    const calDays = document.querySelectorAll('.cal-day');
    calDays.forEach(day => {
      const rect = day.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      day.style.setProperty('--mx', x + '%');
      day.style.setProperty('--my', y + '%');
    });

    // Trail effect
    if (Math.random() > 0.85) {
      createTrail(e.clientX, e.clientY);
    }
  });

  // Smooth follow animation
  function animateCursor() {
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    outlineX += (mouseX - outlineX) * 0.1;
    outlineY += (mouseY - outlineY) * 0.1;
    
    els.cursorDot.style.left = dotX + 'px';
    els.cursorDot.style.top = dotY + 'px';
    els.cursorOutline.style.left = outlineX + 'px';
    els.cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  function addHoverListeners() {
    const interactiveElements = document.querySelectorAll('button, .cal-day, .filter-chip, .task-item, .action-btn, .switch, .grip, .select-trigger, .select-option, .chip-remove, .sort-chip, .github-mini-btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }
  addHoverListeners();
  setInterval(addHoverListeners, 2000);
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
    dateEl.textContent = now.toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
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
      els.dateDisplay.textContent = now.toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'short', year:'numeric' });
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
  if (els.priorityCustomSelect) els.priorityCustomSelect.classList.add('is-open');
  // Ensure parent glass doesn't clip
  const glass = els.priorityCustomSelect.closest('.glass');
  if (glass) glass.classList.add('dropdown-active');
}

function closePrioritySelect() {
  if (els.priorityOptions) els.priorityOptions.classList.remove('open');
  if (els.priorityTrigger) els.priorityTrigger.classList.remove('open');
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
  });
}

function updatePrioritySelect(val) {
  currentPriority = val;
  updatePrioritySelectUI(val);
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
  const inputs = ['taskInput', 'descInput', 'categoryInput', 'subtaskInput', 'dateTimeInput'];
  inputs.forEach(id => {
    const el = els[id];
    if (el) {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          // If subtask input and has value, add subtask chip instead
          if (id === 'subtaskInput' && el.value.trim()) {
            tempSubtasks.push({ text: el.value.trim(), done: false });
            renderSubtaskChips();
            el.value = '';
            playSound('add');
            return;
          }
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
  els.calendarTitle.textContent = new Date(year, month).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
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
}

function showDayDetail(dateStr, dayNum) {
  if (!els.dayDetailPanel || !els.dayDetailTitle || !els.dayDetailContent) return;
  const date = new Date(dateStr);
  const formatted = date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  els.dayDetailTitle.textContent = `📅 ${formatted}`;

  const dayTasks = tasks.filter(t => {
    if (t.dateTime) {
      const tDate = new Date(t.dateTime);
      return tDate.toDateString() === dateStr;
    }
    return new Date(t.createdAt).toDateString() === dateStr;
  });

  if (dayTasks.length === 0) {
    els.dayDetailContent.innerHTML = '<div class="empty-state">✨ Tidak ada tugas di hari ini</div>';
  } else {
    els.dayDetailContent.innerHTML = dayTasks.map((t, i) => `
      <div class="day-task-item ${t.priority} ${t.done ? 'done' : ''}" style="animation-delay:${i * 0.1}s">
        <input type="checkbox" class="task-check" ${t.done ? 'checked' : ''} onchange="toggleTaskFromCalendar('${t.id}')">
        <div>
          <div style="font-weight:600; ${t.done ? 'text-decoration:line-through;opacity:0.6' : ''}">${escapeHtml(t.title)}</div>
          <div style="font-size:0.75rem; color:var(--text-dim); margin-top:2px;">
            ${t.timeHint ? '🕒 ' + escapeHtml(t.timeHint) + ' · ' : ''}
            <span class="priority-tag p-${t.priority}">${getPriorityIcon(t.priority)} ${t.priority === 'super_high' ? 'Super High' : t.priority}</span>
            ${t.category ? `<span class="category-tag" style="margin-left:3px;">📁 ${escapeHtml(t.category)}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  }
  els.dayDetailPanel.classList.add('show');
}

function toggleTaskFromCalendar(id) {
  const t = tasks.find(x => x.id === id);
  if (t) {
    t.done = !t.done;
    if (t.done) { t.ongoing = false; spawnRecurring(t); playSound('complete'); vibrate(); checkStreak(); setTimeout(checkAllDoneCelebration, 300); }
    else { t.ongoing = false; }
    save(); renderCurrentView(); updateStats(); renderCalendar();
    if (selectedDate) showDayDetail(selectedDate, new Date(selectedDate).getDate());
  }
}

    // Smart Parser — FIXED v2
function smartParse(text) {
  let priority = currentPriority;
  let desc = els.descInput ? els.descInput.value : '';
  let timeHint = '';
  let cleanedText = text;
  let parsedDateTime = null;
  const config = loadParsingConfig();

  // ── Priority ──
  for (const item of config.priority) {
    const regex = new RegExp('\\b(' + item.keywords.map(escapeRegex).join('|') + ')\\b', 'gi');
    if (regex.test(cleanedText)) {
      priority = item.val;
      cleanedText = cleanedText.replace(regex, '').trim();
      updatePrioritySelect(item.val);
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

  // ── Time parsing (jam/pukul) ──
  const timeMatch = cleanedText.match(/(jam|pukul)\s+(\d{1,2})(?:[.:](\d{2}))?\s*(pagi|siang|sore|malam)?/i);
  if (timeMatch) {
    let h = parseInt(timeMatch[2]);
    const period = timeMatch[4]?.toLowerCase();
    const m = timeMatch[3] || '00';
    if (period === 'sore' || period === 'malam') {
      if (h < 12) h += 12;
    } else if (period === 'pagi' || period === 'siang') {
      if (h === 12) h = 0;
    }
    if (h >= 24) h -= 24;
    timeHint = `${String(h).padStart(2,'0')}:${m}`;
    cleanedText = cleanedText.replace(timeMatch[0], '').trim();
  }
  const standaloneTime = cleanedText.match(/\b(\d{1,2})[.:](\d{2})\b/);
  if (standaloneTime && !timeHint) {
    const h = parseInt(standaloneTime[1]);
    const m = standaloneTime[2];
    if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
      timeHint = `${String(h).padStart(2,'0')}:${m}`;
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
    const absDateMatch = cleanedText.match(/\b(\d{1,2})[\/.](\d{1,2})(?:[\/.](\d{4}))?\b/);
    if (absDateMatch) {
      const dd = parseInt(absDateMatch[1]);
      const mm = parseInt(absDateMatch[2]) - 1;
      const yyyy = absDateMatch[3] ? parseInt(absDateMatch[3]) : now.getFullYear();
      const d = new Date(yyyy, mm, dd,
                        timeHint ? parseInt(timeHint.split(':')[0]) : 8,
                        timeHint ? parseInt(timeHint.split(':')[1]) : 0, 0);
      if (!isNaN(d.getTime())) {
        parsedDateTime = d.toISOString();
        cleanedText = cleanedText.replace(absDateMatch[0], '').trim();
        hasDateKeyword = true;
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
  if (!parsedDateTime && timeHint) {
    const d = new Date(now);
    const [th, tm] = timeHint.split(':');
    d.setHours(parseInt(th), parseInt(tm), 0, 0);
    parsedDateTime = d.toISOString();
  }

  // ── Final cleanup ──
  cleanedText = cleanedText.replace(/\s+/g, ' ').trim();
  // Remove pipe-separated leftover keywords
  cleanedText = cleanedText.replace(/\s*[|\/]\s*(super|superh|shigh|sh|sup|high|medium|low|done|selesai|ogg|pnd)\b/gi, '').trim();
  cleanedText = cleanedText.replace(/\b(super|superh|shigh|sh|sup|high|medium|low|done|selesai|ogg|pnd)\b/gi, '').trim();
  cleanedText = cleanedText.replace(/^[|\s—-]+|[|\s—-]+$/g, '').trim();
  cleanedText = cleanedText.replace(/\s+/g, ' ').trim();
  cleanedText = cleanedText.replace(/\b\d{1,2}\.\d{2}\b/g, '').trim();
  cleanedText = cleanedText.replace(/\s+/g, ' ').trim();
  cleanedText = cleanedText.replace(/\s*\|\s*/g, ' ').trim();
  cleanedText = cleanedText.replace(/\s+/g, ' ').trim();

  // Auto-desc from keywords
  if (!desc && /(beli|bayar|rapat|meeting|olahraga|belajar|kerja)/i.test(cleanedText)) {
    const match = cleanedText.match(/(beli|bayar|rapat|meeting|olahraga|belajar|kerja)/i);
    if (match) desc = match[0];
  }

  return { title: cleanedText || text, priority, desc, timeHint, statusDone, statusOngoing, dateTime: parsedDateTime };
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
// ===== PARSING CONFIG MANAGEMENT =====
const DEFAULT_PARSING_CONFIG = {
  priority: [
    { keywords: ['super','superh','shigh','sh','sup','super_high','super high'], val: 'super_high', label: '💥 Super High' },
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
  ]
};

let parsingConfig = null;
function loadParsingConfig() {
  if (parsingConfig) return parsingConfig;
  try {
    const saved = localStorage.getItem('tf_parsingConfig');
    if (saved) {
      parsingConfig = JSON.parse(saved);
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

  const parsed = smartParse(raw);

  const newTask = {
    id: Date.now().toString(),
    title: parsed.title || raw,
    desc: parsed.desc || (els.descInput ? els.descInput.value.trim() : ''),
    category: els.categoryInput ? els.categoryInput.value.trim() : '',
    priority: parsed.priority,
    done: parsed.statusDone || false,
    ongoing: (!parsed.statusDone && parsed.statusOngoing) || false,
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
  if (els.descInput) els.descInput.value = '';
  if (els.categoryInput) els.categoryInput.value = '';
  tempSubtasks = [];
  renderSubtaskChips();
  updatePrioritySelect(parsed.priority || 'medium');
  if (els.repeatSelect) els.repeatSelect.value = 'none';
  userSetDateTime = false;
  setDefaultDateTime();
  
  if (settings.githubAutoSync && settings.githubToken) {
    syncToGitHub();
  }
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
    el.style.animationDelay = (index * 0.05) + 's';

    const created = new Date(t.createdAt);
    const timeStr = created.toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' });
    const dateStr = created.toLocaleDateString('id-ID', { day:'numeric', month:'short' });
    const taskDateTime = t.dateTime ? new Date(t.dateTime) : null;
    const scheduledStr = taskDateTime ? smartDateDisplay(t.dateTime) : '';

    el.innerHTML = `
      ${multiSelectMode ? `<input type="checkbox" class="task-select" ${selectedTaskIds.includes(t.id) ? 'checked' : ''}>` : ''}
      <div class="grip" title="Drag to reorder">⋮⋮</div>
      <input type="checkbox" class="task-check" ${t.done ? 'checked' : ''}>
      <div class="task-content">
        <div class="task-header">
          <span class="task-title">${escapeHtml(t.title)}</span>
          <div class="task-actions">
            <button class="action-btn focus-btn" title="Focus Timer">🎯</button>
            <button class="action-btn edit-btn" title="Edit Tugas">✏️</button>
            <button class="action-btn subtask-btn" title="Add Subtask">📋</button>
            <button class="action-btn delete-btn" title="Hapus">🗑️</button>
          </div>
        </div>
        <div class="task-meta">
          <span class="task-time">🕒 ${scheduledStr || dateStr + ' ' + timeStr}${t.timeHint ? ' → ' + escapeHtml(t.timeHint) : ''}</span>
          <span class="priority-tag p-${t.priority}">${getPriorityIcon(t.priority)} ${t.priority === 'super_high' ? 'Super High' : t.priority}</span>
          ${t.category ? `<span class="category-tag">📁 ${escapeHtml(t.category)}</span>` : ''}
          ${t.repeat && t.repeat !== 'none' ? `<span class="repeat-tag">🔁 ${REPEAT_LABELS[t.repeat] || t.repeat}</span>` : ''}
          ${isOverdue(t) ? `<span class="overdue-tag">⏰ Terlambat</span>` : ''}
          ${t.ongoing ? `<span class="status-tag s-ongoing">🔥 On Going</span>` : ''}
          ${t.desc ? `<span style="font-size:0.72rem; color:var(--text-dim)">📝 ${escapeHtml(t.desc.length > 40 ? t.desc.slice(0,40)+'…' : t.desc)}</span>` : ''}
        </div>
        ${t.subtasks.length ? `<ul class="subtasks">${t.subtasks.map((s,i)=>`<li class="subtask ${s.done ? 'done' : ''}"><input type="checkbox" class="subtask-check" ${s.done?'checked':''} data-idx="${i}"><span>${escapeHtml(s.text)}</span></li>`).join('')}</ul>` : ''}
        <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.4rem; flex-wrap:wrap;">
          <div class="pomodoro-wrap" style="display:${t.pomodoro.active||t.pomodoro.timeLeft<1500?'flex':'none'}; margin-top:0;">
            <svg class="pomo-circle" viewBox="0 0 36 36"><path class="pomo-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><path class="pomo-progress" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke-dasharray="100" stroke-dashoffset="${100 - (t.pomodoro.timeLeft/1500)*100}"/></svg>
            <span class="pomo-time">${formatTime(t.pomodoro.timeLeft)}</span>
            <button class="pomo-btn">${t.pomodoro.active ? '⏸' : '▶'}</button>
            ${t.pomodoro.active ? '<button class="pomo-clear-btn" title="Clear Focus">✕</button>' : ''}
          </div>
          ${!t.done ? `<button class="status-toggle-btn ${t.ongoing ? 's-ongoing' : 's-pending'}" data-id="${t.id}" title="${t.ongoing ? 'Klik untuk set Pending' : 'Klik untuk set On Going'}">${t.ongoing ? '🔥 On Going' : '⏳ Pending'}</button>` : ''}
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
    els.taskList.innerHTML = '<div class="empty-state"><div class="empty-illustration"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="40" stroke="rgba(176,38,255,0.3)" stroke-width="2" stroke-dasharray="6 4"/><circle cx="60" cy="60" r="28" fill="rgba(176,38,255,0.08)" stroke="rgba(176,38,255,0.4)" stroke-width="1.5"/><path d="M48 58L56 66L72 50" stroke="#00f5a0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/><circle cx="60" cy="60" r="4" fill="#b026ff" opacity="0.6"/><circle cx="35" cy="35" r="3" fill="#ff4d6d" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/></circle><circle cx="85" cy="30" r="2" fill="#ffd166" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/></circle><circle cx="90" cy="80" r="2.5" fill="#4facfe" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/></circle></svg></div>Tidak ada tugas</div>';
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
    card.style.animationDelay = (index * 0.03) + 's';

    const taskDateTime = t.dateTime ? new Date(t.dateTime) : null;
    const scheduledStr = taskDateTime ? taskDateTime.toLocaleDateString('id-ID',{day:'numeric', month:'short'}) : '';
    const timeStr = taskDateTime ? taskDateTime.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}) : '';

    card.innerHTML = `
      <div class="kanban-card-title">${escapeHtml(t.title)}</div>
      <div class="kanban-card-meta">
        ${t.timeHint || timeStr ? `<span class="kanban-card-time">🕒 ${escapeHtml(t.timeHint || timeStr)}</span>` : ''}
        <span class="kanban-card-tag" style="background:${getPriorityBg(t.priority)};color:${getPriorityColor(t.priority)};">${getPriorityIcon(t.priority)} ${t.priority === 'super_high' ? 'S-High' : t.priority}</span>
        ${t.category ? `<span class="kanban-card-tag" style="background:rgba(79,172,254,0.15);color:var(--neon-blue);">📁 ${escapeHtml(t.category)}</span>` : ''}
        ${t.repeat && t.repeat !== 'none' ? `<span class="kanban-card-tag" style="background:rgba(199,210,254,0.12);color:var(--neon-silver);">🔁 ${REPEAT_LABELS[t.repeat] || t.repeat}</span>` : ''}
        ${isOverdue(t) ? `<span class="kanban-card-tag" style="background:rgba(255,77,109,0.2);color:var(--neon-coral);">⏰ Terlambat</span>` : ''}
      </div>
      <div class="kanban-card-actions">
        <button class="action-btn edit-btn" title="Edit">✏️</button>
        <button class="action-btn delete-btn" title="Hapus">🗑️</button>
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
    });

    // Action buttons
    const editBtn = card.querySelector('.edit-btn');
    if (editBtn) editBtn.addEventListener('click', (e) => { e.stopPropagation(); openEditModal(t.id); });

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
  if (pendingCount === 0) els.kanbanPending.innerHTML = '<div class="empty-state" style="padding:1rem;font-size:0.75rem;">📭 Kosong</div>';
  if (ongoingCount === 0) els.kanbanOngoing.innerHTML = '<div class="empty-state" style="padding:1rem;font-size:0.75rem;">📭 Kosong</div>';
  if (doneCount === 0) els.kanbanDone.innerHTML = '<div class="empty-state" style="padding:1rem;font-size:0.75rem;">📭 Kosong</div>';
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
  document.querySelectorAll('.kanban-column').forEach(col => {
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      col.classList.add('drag-over');
    });
    col.addEventListener('dragleave', (e) => {
      if (!col.contains(e.relatedTarget)) {
        col.classList.remove('drag-over');
      }
    });
    col.addEventListener('drop', (e) => {
      e.preventDefault();
      col.classList.remove('drag-over');
      const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
      if (!taskId) return;

      const newStatus = col.dataset.status;
      const t = tasks.find(x => x.id === taskId);
      if (!t) return;

      // Update task status based on column
      if (newStatus === 'done') {
        if (!t.done) { t.done = true; t.ongoing = false; spawnRecurring(t); playSound('complete'); vibrate(); checkStreak(); }
      } else if (newStatus === 'ongoing') {
        if (!t.ongoing || t.done) { t.ongoing = true; t.done = false; }
      } else {
        // pending
        if (t.done || t.ongoing) { t.done = false; t.ongoing = false; }
      }

      save();
      renderKanban();
      updateStats();
      renderCalendar();
      playSound('add');

      if (settings.githubAutoSync && settings.githubToken) syncToGitHub();
    });
  });
}

function getPriorityIcon(p) {
  const icons = { super_high: '💥', high: '🔥', medium: '⚡', low: '🌿' };
  return icons[p] || '⚡';
}
const PRIORITY_ORDER = { super_high: 4, high: 3, medium: 2, low: 1 };

function toggleStatus(id) {
  const t = tasks.find(x => x.id === id);
  if (!t || t.done) return;
  t.ongoing = !t.ongoing;
  save();
  renderCurrentView();
  playSound('add');
}

function toggleTask(id, checkbox) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.done = checkbox.checked;
  if (t.done) { t.ongoing = false; spawnRecurring(t); playSound('complete'); vibrate(); checkStreak(); setTimeout(checkAllDoneCelebration, 300); }
  else { t.ongoing = false; }
  save();
  setTimeout(() => { renderCurrentView(); updateStats(); renderCalendar(); }, 50);
  
  if (settings.githubAutoSync && settings.githubToken) {
    syncToGitHub();
  }
}

function deleteTask(id) {
  const idx = tasks.findIndex(x => x.id === id);
  if (idx >= 0) pushUndo({ type: 'delete', task: Object.assign({}, tasks[idx]), index: idx });
  stopPomodoro(id);
  tasks = tasks.filter(x => x.id !== id);
  save(); renderCurrentView(); updateStats(); updateSuggestions(); renderCalendar();
  playSound('delete'); vibrate();
  showToast('Tugas dihapus', 'info', { label: '↩️ Undo', onClick: undo });
  if (settings.githubAutoSync && settings.githubToken) syncToGitHub();
}

async function addSubtask(id) {
  const text = await showPrompt('📋 Subtask Baru', 'Tulis subtask…');
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
function enterFocusMode(id) {
  const t = tasks.find(x => x.id === id);
  if (!t || !els.focusOverlay) return;
  focusTaskId = id;
  focusTimeLeft = t.pomodoro.timeLeft;
  els.focusTitle.textContent = `🎯 ${t.title}`;
  els.focusOverlay.classList.add('active');
  startFocusTimer();
}

function startFocusTimer() {
  if (focusInterval) clearInterval(focusInterval);
  if (els.focusPause) els.focusPause.textContent = '⏸ Pause';
  focusInterval = setInterval(() => {
    if (focusTimeLeft > 0) {
      focusTimeLeft--;
      if (els.focusTimer) els.focusTimer.textContent = formatTime(focusTimeLeft);
      const t = tasks.find(x => x.id === focusTaskId);
      if (t) { t.pomodoro.timeLeft = focusTimeLeft; save(); }
    } else {
      clearInterval(focusInterval);
      playSound('complete');
      showToast('⏰ Fokus selesai!', 'success');
      exitFocusMode();
    }
  }, 1000);
}





function exitFocusMode() {
  if (focusInterval) clearInterval(focusInterval);
  focusInterval = null;
  focusTaskId = null;
  focusTimeLeft = 1500;
  if (els.focusOverlay) els.focusOverlay.classList.remove('active');
  renderTasks();
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
  t.pomodoro.active = !t.pomodoro.active;

  if (t.pomodoro.active && !pomoIntervals[id]) {
    pomoIntervals[id] = setInterval(() => {
      // Cari ulang task & elemen DOM tiap tick — referensi lama bisa basi
      // setelah re-render, import, atau load dari Gist
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
        save();
        renderCurrentView();
        playSound('complete');
        showToast(`⏰ Fokus selesai untuk: ${task.title}`, 'success');
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
  if (els.progressLabel) els.progressLabel.textContent = `${todayPct}% Selesai Hari Ini`;
  if (els.progressRatio) els.progressRatio.textContent = `${todayDone}/${todayTotal}`;
  if (els.bentoProgress) els.bentoProgress.textContent = `${todayPct}%`;
  if (els.bentoProgressAll) els.bentoProgressAll.textContent = `${pctAll}%`;
  if (els.bentoTotal) els.bentoTotal.textContent = total;
  if (els.bentoDone) els.bentoDone.textContent = done;
  if (els.bentoPending) els.bentoPending.textContent = pending;
  if (els.bentoHigh) els.bentoHigh.textContent = high;

  let color1, color2;
  if (todayPct <= 25) { color1 = '#ff4d6d'; color2 = '#ff8fa3'; }
  else if (todayPct <= 50) { color1 = '#ffd166'; color2 = '#ffe399'; }
  else if (todayPct <= 75) { color1 = '#00f5a0'; color2 = '#66f8c6'; }
  else { color1 = '#4facfe'; color2 = '#00f2fe'; }
  if (els.progressFill) els.progressFill.style.background = `linear-gradient(90deg, ${color1}, ${color2})`;
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
  const data = { tasks: tasks, settings: Object.assign({}, settings, {githubToken: undefined}), exportDate: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'taskflow-backup-' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast(tasks.length + ' tugas diekspor ke JSON', 'success');
}
function exportToCsv() {
  const headers = ['ID','Title','Description','Category','Priority','Status','DateTime','CreatedAt','Subtasks'];
  const rows = tasks.map(t => [
    t.id, '"' + (t.title || '').replace(/"/g, '""') + '"',
    '"' + (t.desc || '').replace(/"/g, '""') + '"',
    t.category || '', t.priority || '',
    t.done ? 'done' : (t.ongoing ? 'ongoing' : 'pending'),
    t.dateTime || '', t.createdAt || '',
    (t.subtasks || []).map(s => s.text).join('; ')
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'taskflow-export-' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast(tasks.length + ' tugas diekspor ke CSV', 'success');
}
// Pastikan task dari import/sync punya semua field yang dibutuhkan renderer
function normalizeTask(t) {
  const priorities = ['super_high', 'high', 'medium', 'low'];
  return {
    id: String(t.id || (Date.now().toString() + Math.random().toString(36).slice(2, 7))),
    title: String(t.title || ''),
    desc: t.desc ? String(t.desc) : '',
    category: t.category ? String(t.category) : '',
    priority: priorities.includes(t.priority) ? t.priority : 'medium',
    done: !!t.done,
    ongoing: !t.done && !!t.ongoing,
    createdAt: t.createdAt || new Date().toISOString(),
    dateTime: t.dateTime || null,
    // timeHint ikut dirender ke innerHTML — hanya terima format jam (H:MM/HH:MM)
    timeHint: /^\d{1,2}:\d{2}$/.test(String(t.timeHint || '').trim()) ? String(t.timeHint).trim() : '',
    repeat: ['daily', 'weekly', 'monthly'].includes(t.repeat) ? t.repeat : 'none',
    notified: !!t.notified,
    subtasks: Array.isArray(t.subtasks)
      ? t.subtasks.map(s => ({ text: String(s.text || ''), done: !!s.done })).filter(s => s.text)
      : [],
    pomodoro: {
      active: false,
      timeLeft: (t.pomodoro && Number.isFinite(t.pomodoro.timeLeft)) ? t.pomodoro.timeLeft : 1500
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
  reader.onload = (e) => {
    try {
      let imported;
      if (/\.csv$/i.test(file.name)) {
        imported = parseCsvTasks(e.target.result);
      } else {
        const data = JSON.parse(e.target.result);
        if (!data.tasks || !Array.isArray(data.tasks)) throw new Error('Format JSON tidak valid');
        imported = data.tasks;
      }
      stopAllPomodoros();
      tasks = imported.map(normalizeTask);
      save();
      renderCurrentView();
      updateStats(); renderCalendar(); updateSuggestions();
      showToast('Import berhasil: ' + tasks.length + ' tugas', 'success');
    } catch (err) {
      showToast('Error import: ' + err.message, 'error');
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
    showToast('Mode Multi-Select aktif. Klik task untuk memilih.', 'info');
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
  if (els.batchCount) els.batchCount.textContent = selectedTaskIds.length + ' tugas terpilih';
}
function batchMarkDone() {
  if (selectedTaskIds.length === 0) return;
  pushUndo({ type: 'batch-update', ids: selectedTaskIds.slice(), oldStates: selectedTaskIds.map(id => {
    const t = tasks.find(x => x.id === id);
    return t ? { done: t.done, ongoing: t.ongoing } : {};
  })});
  selectedTaskIds.forEach(id => {
    const t = tasks.find(x => x.id === id);
    if (t && !t.done) { t.done = true; t.ongoing = false; spawnRecurring(t); }
    else if (t) { t.ongoing = false; }
  });
  save();
  selectedTaskIds = [];
  updateBatchBar();
  renderCurrentView();
  updateStats(); renderCalendar();
  playSound('complete');
  showToast('Tugas ditandai selesai', 'success');
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
  showToast('Tugas dihapus', 'info', { label: '↩️ Undo', onClick: undo });
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
  if (undoStack.length === 0) { showToast('Tidak ada yang bisa di-undo', 'warn'); return; }
  const action = undoStack.pop();
  if (action.type === 'delete' && action.task) {
    const idx = Math.min(action.index ?? tasks.length, tasks.length);
    tasks.splice(idx, 0, action.task);
    showToast('Undo: Task dikembalikan', 'success');
  } else if (action.type === 'batch-delete' && action.tasks) {
    tasks = tasks.concat(action.tasks);
    showToast('Undo: ' + action.tasks.length + ' task dikembalikan', 'success');
  } else if (action.type === 'batch-update' && action.ids && action.oldStates) {
    action.ids.forEach((id, i) => {
      const t = tasks.find(x => x.id === id);
      if (t && action.oldStates[i]) { t.done = action.oldStates[i].done; t.ongoing = action.oldStates[i].ongoing; }
    });
    showToast('Undo: Status dikembalikan', 'success');
  } else if (action.type === 'clear') {
    tasks = action.tasks ? JSON.parse(JSON.stringify(action.tasks)) : [];
    showToast('Undo: Data dikembalikan', 'success');
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
    if (await showConfirm('🔄 Reset Default',
      'Reset semua kata kunci ke default? Perubahan yang belum disimpan akan hilang.', 'Reset')) {
      peTempConfig = JSON.parse(JSON.stringify(DEFAULT_PARSING_CONFIG));
      renderParsingEditorTable(peCurrentTab);
      showToast('Kata kunci direset ke default', 'info');
    }
  });

  // Tabs
  document.querySelectorAll('.pe-tab').forEach(tab => {
    tab.addEventListener('click', () => {
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

function openParsingEditor() {
  peTempConfig = JSON.parse(JSON.stringify(loadParsingConfig()));
  renderParsingEditorTable(peCurrentTab);
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
    }
  }).join('');

  // Attach delete handlers
  body.querySelectorAll('.pe-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.pe-row');
      const idx = parseInt(row.dataset.idx);
      peTempConfig[type].splice(idx, 1);
      renderParsingEditorTable(type);
    });
  });
}

function addParsingRow(type) {
  if (!peTempConfig) return;
  const defaults = {
    priority: { keywords: [''], val: 'medium' },
    status: { keywords: [''], val: 'pending' },
    dates: { keywords: [''], days: 1 },
    timeOfDay: { keywords: [''], h: 8, m: 0 }
  };
  peTempConfig[type].push(JSON.parse(JSON.stringify(defaults[type])));
  renderParsingEditorTable(type);
}

function saveParsingEditor() {
  if (!peTempConfig) return;

  // Collect data from all visible and hidden tabs
  ['priority', 'status', 'dates', 'timeOfDay'].forEach(type => {
    const body = document.getElementById('pe-body-' + type);
    if (!body) return;
    const rows = body.querySelectorAll('.pe-row');
    peTempConfig[type] = [];
    rows.forEach(row => {
      const inputs = row.querySelectorAll('input, select');
      const keywords = inputs[0].value.split(',').map(k => k.trim()).filter(Boolean);
      if (keywords.length === 0) return;

      if (type === 'priority') {
        peTempConfig[type].push({ keywords, val: inputs[1].value });
      } else if (type === 'status') {
        peTempConfig[type].push({ keywords, val: inputs[1].value });
      } else if (type === 'dates') {
        peTempConfig[type].push({ keywords, val: keywords[0], days: parseInt(inputs[1].value) || 0, label: keywords[0] });
      } else if (type === 'timeOfDay') {
        const [h, m] = inputs[1].value.split(':');
        peTempConfig[type].push({ keywords, h: parseInt(h) || 0, m: parseInt(m) || 0, label: keywords[0] });
      }
    });
  });

  saveParsingConfig(peTempConfig);
  closeParsingEditor();
  showToast('Kata kunci parsing tersimpan', 'success');
}

function initButtonListeners() {
  // Status filters
  document.querySelectorAll('#statusFilters .filter-chip').forEach(f => {
    f.addEventListener('click', () => {
      document.querySelectorAll('#statusFilters .filter-chip').forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      currentFilter = f.dataset.filter;
      renderCurrentView();
    });
  });

  // Priority filter
  if (els.priorityFilterSelect) {
    els.priorityFilterSelect.addEventListener('change', () => {
      currentPriorityFilter = els.priorityFilterSelect.value;
      renderCurrentView();
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
        renderCurrentView();
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

  if (els.reminderToggle) els.reminderToggle.addEventListener('click', async () => {
    if (!settings.reminders) {
      if (!('Notification' in window)) {
        showToast('Browser ini tidak mendukung notifikasi', 'error');
        return;
      }
      let perm = Notification.permission;
      if (perm === 'default') perm = await Notification.requestPermission();
      if (perm !== 'granted') {
        showToast('Izin notifikasi ditolak oleh browser', 'error');
        return;
      }
      settings.reminders = true;
      showToast('🔔 Reminder aktif — notifikasi saat tugas jatuh tempo', 'success');
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

  if (els.githubAutoSync) els.githubAutoSync.addEventListener('click', () => {
    settings.githubAutoSync = !settings.githubAutoSync;
    els.githubAutoSync.classList.toggle('on');
    saveSettings();
  });

  if (els.githubToken) els.githubToken.addEventListener('change', () => {
    settings.githubToken = els.githubToken.value.trim();
    saveSettings();
  });

  if (els.githubGistId) els.githubGistId.addEventListener('change', () => {
    settings.githubGistId = els.githubGistId.value.trim();
    saveSettings();
  });

  

  if (els.clearData) els.clearData.addEventListener('click', async () => {
    const ok = await showConfirm('🗑️ Hapus Semua Data',
      'Semua tugas akan dihapus. Kamu masih bisa membatalkannya lewat tombol Undo setelah ini.',
      'Hapus Semua');
    if (!ok) return;
    pushUndo({ type: 'clear', tasks: JSON.parse(JSON.stringify(tasks)) });
    stopAllPomodoros();
    tasks = []; save(); renderCurrentView(); updateStats(); renderCalendar();
    localStorage.removeItem('tf_streak'); localStorage.removeItem('tf_lastComplete');
    showToast('Semua data dihapus.', 'info', { label: '↩️ Undo', onClick: undo });
  });

  // GitHub buttons
  if (els.syncToGithub) els.syncToGithub.addEventListener('click', syncToGitHub);
  if (els.loadFromGithub) els.loadFromGithub.addEventListener('click', loadFromGitHub);

  // GitHub mini sync
  if (els.githubMiniSync) els.githubMiniSync.addEventListener('click', githubMiniHandler);

  // Search input
  if (els.searchInput) els.searchInput.addEventListener('input', e => { searchQuery = e.target.value; renderCurrentView(); });

  // Focus mode controls
  if (els.focusPause) els.focusPause.addEventListener('click', () => {
    if (focusInterval) {
      clearInterval(focusInterval);
      focusInterval = null;
      els.focusPause.textContent = '▶ Resume';
    } else {
      startFocusTimer();
    }
  });

  if (els.focusClear) els.focusClear.addEventListener('click', async () => {
    if (await showConfirm('✕ Clear Focus', 'Yakin ingin menghentikan focus mode?', 'Hentikan')) {
      exitFocusMode();
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
      if (st === 'done') { t.done = true; t.ongoing = false; }
      else if (st === 'ongoing') { t.done = false; t.ongoing = true; }
      else { t.done = false; t.ongoing = false; }
    }
    if (els.editDateTime.value) {
      t.dateTime = new Date(els.editDateTime.value).toISOString();
      t.notified = false;
    }
    if (!wasDone && t.done) spawnRecurring(t);
    save(); renderCurrentView(); updateStats(); renderCalendar();
    if (els.editModal) els.editModal.classList.remove('show');
    editingId = null;
    playSound('add');
    if (settings.githubAutoSync && settings.githubToken) syncToGitHub();
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
    showToast('🎉 Semua tugas hari ini selesai! Kerja bagus!', 'success');
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
  const timePart = timeStr || d.toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' });
  if (diffDays === 0) return `Hari ini, ${timePart}`;
  if (diffDays === 1) return `Besok, ${timePart}`;
  if (diffDays === 2) return `Lusa, ${timePart}`;
  if (diffDays === -1) return `Kemarin, ${timePart}`;
  if (diffDays > 2 && diffDays <= 6) return `${diffDays} hari lagi, ${timePart}`;
  return d.toLocaleDateString('id-ID', { day:'numeric', month:'short' }) + (timePart ? `, ${timePart}` : '');
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
const REPEAT_LABELS = { daily: 'Harian', weekly: 'Mingguan', monthly: 'Bulanan' };
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
  showToast(`🔁 Tugas berulang dibuat: ${smartDateDisplay(nextIso)}`, 'info');
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
        new Notification('⏰ TaskFlow: ' + t.title, {
          body: (t.desc ? t.desc + ' · ' : '') + 'Jatuh tempo sekarang',
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
function showConfirm(title, message, okLabel = 'OK', cancelLabel = 'Batal') {
  return showDialog({ title, message, buttons: [
    { label: cancelLabel, value: false },
    { label: okLabel, value: true, primary: true }
  ]});
}
function showPrompt(title, placeholder) {
  return showDialog({ title, input: true, placeholder, buttons: [
    { label: 'Batal', value: null },
    { label: 'OK', value: true, primary: true }
  ]});
}

// GitHub Gist Sync
function showGithubStatus(msg, type) {
  if (!els.githubStatus) return;
  els.githubStatus.textContent = msg;
  els.githubStatus.className = 'github-status ' + (type || '');
  if (type === 'success' || type === 'error') {
    setTimeout(() => { 
      if(els.githubStatus) { els.githubStatus.textContent = ''; els.githubStatus.className = 'github-status'; }
    }, 5000);
  }
}

async function syncToGitHub() {
  const token = els.githubToken ? els.githubToken.value.trim() : '';
  if (!token) { showGithubStatus('❌ Token diperlukan', 'error'); return; }
  
  showGithubStatus('☁️ Menyinkronkan...', 'info');
  try {
    const data = {
      tasks,
      settings: {...settings, githubToken: undefined, githubGistId: undefined},
      parsingConfig: loadParsingConfig(),
      streak: {
        count: parseInt(localStorage.getItem('tf_streak') || '0'),
        lastComplete: localStorage.getItem('tf_lastComplete') || null
      },
      lastSync: new Date().toISOString()
    };
    const content = JSON.stringify(data, null, 2);
    
    const gistId = els.githubGistId ? els.githubGistId.value.trim() : '';
    
    if (gistId) {
      const res = await fetch(`https://api.github.com/gists/${gistId}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          files: {
            'taskflow-data.json': { content }
          }
        })
      });
      if (!res.ok) throw new Error('Gagal update Gist: ' + res.status);
      showGithubStatus('✅ Tersimpan ke GitHub', 'success'); showToast('Data tersimpan ke GitHub', 'success');
    } else {
      const res = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          description: 'TaskFlow Pro Data Backup',
          public: false,
          files: { 'taskflow-data.json': { content } }
        })
      });
      if (!res.ok) throw new Error('Gagal membuat Gist: ' + res.status);
      const json = await res.json();
      if (els.githubGistId) els.githubGistId.value = json.id;
      settings.githubGistId = json.id;
      saveSettings();
      showGithubStatus(`✅ Gist dibuat: ${json.id}`, 'success'); showToast('Gist baru berhasil dibuat', 'success');
    }
  } catch (err) {
    showGithubStatus('❌ Error: ' + err.message, 'error'); showToast('Error: ' + err.message, 'error');
  }
}

async function loadFromGitHub() {
  const token = els.githubToken ? els.githubToken.value.trim() : '';
  const gistId = els.githubGistId ? els.githubGistId.value.trim() : '';
  
  if (!token) { showGithubStatus('❌ Token diperlukan', 'error'); return; }
  if (!gistId) { showGithubStatus('❌ Gist ID diperlukan', 'error'); return; }
  
  showGithubStatus('📥 Memuat...', 'info');
  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (!res.ok) throw new Error('Gist tidak ditemukan: ' + res.status);
    const json = await res.json();
    const file = json.files['taskflow-data.json'];
    if (!file) throw new Error('File taskflow-data.json tidak ditemukan');
    
    const data = JSON.parse(file.content);
    if (data.parsingConfig) saveParsingConfig(data.parsingConfig);
    if (data.streak) {
      const count = parseInt(data.streak.count);
      if (!isNaN(count)) localStorage.setItem('tf_streak', count);
      if (data.streak.lastComplete) localStorage.setItem('tf_lastComplete', data.streak.lastComplete);
    }
    if (data.tasks) {
      stopAllPomodoros();
      tasks = data.tasks.map(normalizeTask);
      save();
      renderCurrentView();
      updateStats();
      renderCalendar();
      updateSuggestions();
      checkStreak();
      showGithubStatus(`✅ Data dimuat (${tasks.length} tugas)`, 'success'); showToast(`${tasks.length} tugas dimuat dari GitHub`, 'success');
    }
  } catch (err) {
    showGithubStatus('❌ Error: ' + err.message, 'error'); showToast('Error: ' + err.message, 'error');
  }
}

// Settings
function loadSettings() {
  if (!els.soundToggle || !els.hapticToggle || !els.themeToggle) return;
  els.soundToggle.classList.toggle('on', settings.sound);
  els.hapticToggle.classList.toggle('on', settings.haptic);
  els.themeToggle.classList.toggle('on', settings.dayMode);
  if (els.reminderToggle) {
    // izin bisa dicabut dari browser — jangan tampilkan "on" kalau tidak granted
    const granted = ('Notification' in window) && Notification.permission === 'granted';
    settings.reminders = settings.reminders && granted;
    els.reminderToggle.classList.toggle('on', settings.reminders);
  }
  if (els.githubAutoSync) els.githubAutoSync.classList.toggle('on', settings.githubAutoSync);
  if (els.githubToken) els.githubToken.value = settings.githubToken || '';
  if (els.githubGistId) els.githubGistId.value = settings.githubGistId || '';
  if (els.aiApiKey) els.aiApiKey.value = settings.aiApiKey || '';
  
  if (settings.dayMode) {
    document.body.classList.add('day-mode');
    if (els.themeIcon) els.themeIcon.textContent = '☀️';
    if (els.themeLabel) els.themeLabel.textContent = 'Day Mode';
  }
}

function save() { 
  try { localStorage.setItem('tf_tasks', JSON.stringify(tasks)); } catch(e) { console.error('Save error:', e); }
}
function saveSettings() { 
  try { localStorage.setItem('tf_settings', JSON.stringify(settings)); } catch(e) { console.error('Save settings error:', e); }
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

async function githubMiniHandler() {
  const token = settings.githubToken;
  const gistId = settings.githubGistId;
  if (!token) {
    showToast('⚠️ Masukkan GitHub Token di Settings (⚙️) terlebih dulu.', 'warn');
    if (els.settingsPanel) els.settingsPanel.classList.add('show');
    return;
  }
  if (gistId) {
    const choice = await showDialog({
      title: '☁️ GitHub Gist Sync',
      message: 'Pilih arah sinkronisasi:',
      buttons: [
        { label: 'Batal', value: null },
        { label: '📥 Download (Load)', value: 'load' },
        { label: '☁️ Upload (Save)', value: 'save', primary: true }
      ]
    });
    if (choice === 'save') syncToGitHub();
    else if (choice === 'load') loadFromGitHub();
  } else {
    syncToGitHub();
  }
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
