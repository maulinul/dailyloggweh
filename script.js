// ============================================
// TASK MANAGEMENT SYSTEM
// ============================================

let tasks = [];
let editingId = null;
let currentPriority = 'medium';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  setupEventListeners();
  updateStats();
  updateCalendar();
  setupCustomCursor();
  updateClock();
  setInterval(updateClock, 1000);
});

// ============================================
// LOAD & SAVE TASKS
// ============================================

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
  } else {
    // Sample data for testing
    tasks = [
      { id: 1, title: 'Beli susu', priority: 'medium', done: false, date: new Date().toISOString(), subtasks: [] },
      { id: 2, title: 'Rapat tim', priority: 'high', done: true, date: new Date().toISOString(), subtasks: [] }
    ];
  }
  renderTaskList();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
  // Add Task Button
  document.getElementById('addBtn').addEventListener('click', addTask);
  
  // Enter key on main input
  document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  // Enter key on subtask input
  document.getElementById('subtaskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addSubtask();
  });

  // Priority selector
  document.getElementById('priorityTrigger').addEventListener('click', togglePriorityMenu);
  
  document.querySelectorAll('.select-option').forEach(option => {
    option.addEventListener('click', selectPriority);
  });

  // Edit Modal
  document.getElementById('editCancel').addEventListener('click', closeEditModal);
  document.getElementById('editSave').addEventListener('click', saveEditTask);

  // Focus Mode
  document.getElementById('focusClear').addEventListener('click', closeFocusMode);
  document.getElementById('focusPause').addEventListener('click', pauseFocusMode);

  // Calendar navigation
  document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));
  document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
  document.getElementById('nextYear').addEventListener('click', () => changeMonth(12));
  document.getElementById('prevYear').addEventListener('click', () => changeMonth(-12));
  document.getElementById('backToToday').addEventListener('click', goToToday);

  // Settings
  document.getElementById('settingsToggle')?.addEventListener('click', toggleSettings);
}

// ============================================
// ADD TASK
// ============================================

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const descInput = document.getElementById('descInput');
  const dateTimeInput = document.getElementById('dateTimeInput');
  const subtaskChips = document.getElementById('subtaskChips');

  const title = taskInput.value.trim();
  if (!title) {
    alert('Masukkan judul tugas!');
    return;
  }

  // Get subtasks from chips
  const subtasks = [];
  document.querySelectorAll('.subtask-chip').forEach(chip => {
    const text = chip.textContent.replace('×', '').trim();
    if (text) subtasks.push({ text, done: false });
  });

  const task = {
    id: Date.now(),
    title: title,
    description: descInput.value.trim(),
    priority: currentPriority,
    date: dateTimeInput.value || new Date().toISOString(),
    done: false,
    subtasks: subtasks,
    createdAt: new Date().toISOString()
  };

  tasks.push(task);
  saveTasks();
  renderTaskList();
  updateStats();
  updateCalendar();

  // Clear inputs
  taskInput.value = '';
  descInput.value = '';
  dateTimeInput.value = '';
  subtaskChips.innerHTML = '';
  currentPriority = 'medium';
  updatePriorityDisplay();

  console.log('✅ Task added:', task);
}

// ============================================
// RENDER TASK LIST
// ============================================

function renderTaskList() {
  const taskListContainer = document.querySelector('.task-list') || document.getElementById('taskListContainer');
  
  if (!taskListContainer) {
    console.warn('Task list container not found');
    return;
  }

  if (tasks.length === 0) {
    taskListContainer.innerHTML = '<div class="empty-state">📝 Tidak ada tugas. Tambah tugas baru!</div>';
    return;
  }

  taskListContainer.innerHTML = tasks.map(task => `
    <div class="task-item ${task.done ? 'task-done' : ''}" data-id="${task.id}">
      <input type="checkbox" class="task-check" ${task.done ? 'checked' : ''} onchange="toggleTask(${task.id})">
      <div class="task-content">
        <div class="task-header">
          <span class="task-title">${escapeHtml(task.title)}</span>
          <div class="task-actions">
            <button class="action-btn edit-btn" onclick="editTask(${task.id})" title="Edit">✏️</button>
            <button class="action-btn focus-btn" onclick="startFocusMode(${task.id})" title="Focus">🎯</button>
            <button class="action-btn delete-btn" onclick="deleteTask(${task.id})" title="Hapus">🗑️</button>
          </div>
        </div>
        <div class="task-meta">
          <span class="priority-tag p-${task.priority}">
            ${getPriorityIcon(task.priority)} ${task.priority.toUpperCase()}
          </span>
          ${task.date ? `<span class="task-time">📅 ${formatDate(task.date)}</span>` : ''}
        </div>
        ${task.subtasks && task.subtasks.length > 0 ? `
          <ul class="subtasks">
            ${task.subtasks.map((st, i) => `
              <li class="subtask ${st.done ? 'done' : ''}">
                <input type="checkbox" class="subtask-check" ${st.done ? 'checked' : ''} 
                  onchange="toggleSubtask(${task.id}, ${i})">
                ${st.text}
              </li>
            `).join('')}
          </ul>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// ============================================
// TASK ACTIONS
// ============================================

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTasks();
    renderTaskList();
    updateStats();
    updateCalendar();
  }
}

function deleteTask(id) {
  if (confirm('Hapus tugas ini?')) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTaskList();
    updateStats();
    updateCalendar();
  }
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  editingId = id;
  document.getElementById('editTitle').value = task.title;
  document.getElementById('editDesc').value = task.description || '';
  document.getElementById('editDateTime').value = formatDateTimeInput(task.date);
  document.getElementById('editPriority').value = task.priority;

  document.getElementById('editModal').classList.add('show');
}

function closeEditModal() {
  document.getElementById('editModal').classList.remove('show');
  editingId = null;
}

function saveEditTask() {
  if (!editingId) return;

  const task = tasks.find(t => t.id === editingId);
  if (task) {
    task.title = document.getElementById('editTitle').value;
    task.description = document.getElementById('editDesc').value;
    task.date = document.getElementById('editDateTime').value;
    task.priority = document.getElementById('editPriority').value;

    saveTasks();
    renderTaskList();
    updateStats();
    updateCalendar();
    closeEditModal();
  }
}

// ============================================
// SUBTASKS
// ============================================

function addSubtask() {
  const input = document.getElementById('subtaskInput');
  const text = input.value.trim();
  
  if (!text) return;

  const container = document.getElementById('subtaskChips');
  const chip = document.createElement('div');
  chip.className = 'subtask-chip';
  chip.innerHTML = `
    ${text}
    <button class="chip-remove" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(chip);
  input.value = '';
}

function toggleSubtask(taskId, subtaskIndex) {
  const task = tasks.find(t => t.id === taskId);
  if (task && task.subtasks[subtaskIndex]) {
    task.subtasks[subtaskIndex].done = !task.subtasks[subtaskIndex].done;
    saveTasks();
    renderTaskList();
  }
}

// ============================================
// PRIORITY MANAGEMENT
// ============================================

function togglePriorityMenu() {
  const options = document.getElementById('priorityOptions');
  const trigger = document.getElementById('priorityTrigger');
  
  options.classList.toggle('open');
  trigger.classList.toggle('open');
}

function selectPriority(e) {
  const option = e.target.closest('.select-option');
  if (!option) return;

  currentPriority = option.dataset.value;
  updatePriorityDisplay();
  togglePriorityMenu();
}

function updatePriorityDisplay() {
  document.getElementById('priorityTriggerText').textContent = currentPriority.charAt(0).toUpperCase() + currentPriority.slice(1);
  document.getElementById('priorityTriggerIcon').textContent = getPriorityIcon(currentPriority);

  document.querySelectorAll('.select-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.value === currentPriority);
  });
}

function getPriorityIcon(priority) {
  const icons = { high: '🔥', medium: '⚡', low: '🌿' };
  return icons[priority] || '⚡';
}

// ============================================
// STATS UPDATE
// ============================================

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const pending = total - done;
  const highPriority = tasks.filter(t => t.priority === 'high').length;
  
  const today = new Date().toDateString();
  const todayTasks = tasks.filter(t => new Date(t.date).toDateString() === today);
  const todayDone = todayTasks.filter(t => t.done).length;
  const todayProgress = todayTasks.length > 0 ? Math.round((todayDone / todayTasks.length) * 100) : 0;

  document.getElementById('bentoTotal').textContent = total;
  document.getElementById('bentoDone').textContent = done;
  document.getElementById('bentoPending').textContent = pending;
  document.getElementById('bentoHigh').textContent = highPriority;
  document.getElementById('bentoProgress').textContent = todayProgress + '%';
  document.getElementById('bentoProgressAll').textContent = total > 0 ? Math.round((done / total) * 100) + '%' : '0%';

  // Update progress bar
  document.getElementById('progressFill').style.width = todayProgress + '%';
  document.getElementById('progressLabel').textContent = `${todayProgress}% Selesai Hari Ini`;
  document.getElementById('progressRatio').textContent = `${todayDone}/${todayTasks.length}`;
}

// ============================================
// CALENDAR
// ============================================

let currentMonth = new Date();

function updateCalendar() {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  document.getElementById('calendarTitle').textContent = 
    new Date(year, month).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarGrid = document.getElementById('calendarGrid');
  calendarGrid.innerHTML = `
    <div class="cal-day-header">Min</div>
    <div class="cal-day-header">Sen</div>
    <div class="cal-day-header">Sel</div>
    <div class="cal-day-header">Rab</div>
    <div class="cal-day-header">Kam</div>
    <div class="cal-day-header">Jum</div>
    <div class="cal-day-header">Sab</div>
  `;

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    calendarGrid.innerHTML += `<div class="cal-day other-month"><span class="day-number">${day}</span></div>`;
  }

  // Current month days
  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isToday = date.toDateString() === today.toDateString();
    const dayTasks = tasks.filter(t => new Date(t.date).toDateString() === date.toDateString());

    const taskDotsHTML = dayTasks.map(t => 
      `<div class="task-dot ${t.done ? 'done' : t.priority}"></div>`
    ).join('');

    calendarGrid.innerHTML += `
      <div class="cal-day ${isToday ? 'today' : ''}" data-date="${date.toDateString()}">
        <span class="day-number">${day}</span>
        <div class="day-tasks-preview">${taskDotsHTML}</div>
      </div>
    `;
  }

  // Next month days
  const totalCells = calendarGrid.querySelectorAll('.cal-day-header').length + firstDay + daysInMonth;
  const remainingCells = 42 - totalCells;
  for (let i = 1; i <= remainingCells; i++) {
    calendarGrid.innerHTML += `<div class="cal-day other-month"><span class="day-number">${i}</span></div>`;
  }
}

function changeMonth(months) {
  currentMonth.setMonth(currentMonth.getMonth() + months);
  updateCalendar();
}

function goToToday() {
  currentMonth = new Date();
  updateCalendar();
}

// ============================================
// FOCUS MODE
// ============================================

function startFocusMode(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  document.getElementById('focusTitle').textContent = `🎯 ${task.title}`;
  document.getElementById('focusOverlay').classList.add('active');

  let timeLeft = 25 * 60;
  const timerInterval = setInterval(() => {
    timeLeft--;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('focusTimer').textContent = 
      `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      closeFocusMode();
    }
  }, 1000);

  document.getElementById('focusPause').onclick = () => pauseFocusMode(timerInterval);
}

function closeFocusMode() {
  document.getElementById('focusOverlay').classList.remove('active');
}

function pauseFocusMode(interval) {
  clearInterval(interval);
  closeFocusMode();
}

// ============================================
// CLOCK
// ============================================

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  document.getElementById('clock').innerHTML = 
    `${hours}:${minutes}<span class="seconds">:${seconds}</span>`;

  const dateDisplay = now.toLocaleDateString('id-ID', 
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('dateDisplay').textContent = dateDisplay;
}

// ============================================
// CUSTOM CURSOR
// ============================================

function setupCustomCursor() {
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');

  document.addEventListener('mousemove', (e) => {
    if (cursorDot) {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    }
    if (cursorOutline) {
      cursorOutline.style.left = e.clientX + 'px';
      cursorOutline.style.top = e.clientY + 'px';
    }
  });

  document.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  document.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
}

function formatDateTimeInput(dateStr) {
  const date = new Date(dateStr);
  return date.toISOString().slice(0, 16);
}

function toggleSettings() {
  const panel = document.querySelector('.settings-panel');
  panel?.classList.toggle('show');
}
