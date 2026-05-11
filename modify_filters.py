import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace filters HTML
old_filters = '''        <div class="filters">
          <div class="filter-chip active" data-filter="all">Semua</div>
          <div class="filter-chip" data-filter="pending">Pending</div>
          <div class="filter-chip" data-filter="done">Selesai</div>
          <div class="filter-chip" data-filter="high">High</div>
        </div>'''

new_filters = '''        <div class="filters" style="display:flex; flex-direction:column; gap:0.5rem;">
          <div class="status-filters" id="statusFilters" style="display:flex; gap:0.4rem;">
            <div class="filter-chip active" data-filter="all">Semua</div>
            <div class="filter-chip" data-filter="pending">Pending</div>
            <div class="filter-chip" data-filter="done">Selesai</div>
          </div>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <select id="priorityFilter" class="task-input" style="padding:0.4rem; font-size:0.8rem; flex:1;">
              <option value="all">Semua Priority</option>
              <option value="superhigh">Super High</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select id="sortFilter" class="task-input" multiple style="padding:0.4rem; font-size:0.8rem; flex:1; height:60px;">
              <option value="date" selected>Urut: Tanggal</option>
              <option value="priority">Urut: Prioritas</option>
              <option value="status">Urut: Status</option>
            </select>
          </div>
        </div>'''

content = content.replace(old_filters, new_filters)

# Add superhigh to priority Custom Select
old_priority_select = '''              <div class="select-options" id="priorityOptions">
                <div class="select-option" data-value="high"><span class="opt-icon">🔥</span> High</div>
                <div class="select-option" data-value="medium"><span class="opt-icon">⚡</span> Medium</div>
                <div class="select-option" data-value="low"><span class="opt-icon">🌿</span> Low</div>
              </div>'''

new_priority_select = '''              <div class="select-options" id="priorityOptions">
                <div class="select-option" data-value="superhigh"><span class="opt-icon">💥</span> Super High</div>
                <div class="select-option" data-value="high"><span class="opt-icon">🔥</span> High</div>
                <div class="select-option" data-value="medium"><span class="opt-icon">⚡</span> Medium</div>
                <div class="select-option" data-value="low"><span class="opt-icon">🌿</span> Low</div>
              </div>'''

content = content.replace(old_priority_select, new_priority_select)

# Add superhigh to editPriority
old_edit_priority = '''        <select class="task-input" id="editPriority" style="width:120px">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>'''

new_edit_priority = '''        <select class="task-input" id="editPriority" style="width:120px">
          <option value="superhigh">Super High</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>'''

content = content.replace(old_edit_priority, new_edit_priority)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done filters and priorities")
