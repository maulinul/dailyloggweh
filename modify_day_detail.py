import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# showDayDetail HTML
old_day_detail = '''              <div style="font-size:0.75rem; color:var(--text-dim); margin-top:0.2rem;">
                🕒 ${t.timeHint || new Date(t.createdAt).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'})}
                <span class="priority-tag p-${t.priority}" style="margin-left:0.5rem; font-size:0.65rem;">${t.priority}</span>
              </div>
            </div>
          </div>
        `).join('');'''

new_day_detail = '''              <div style="font-size:0.75rem; color:var(--text-dim); margin-top:0.2rem;">
                🕒 ${t.timeHint || new Date(t.createdAt).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'})}
                <span class="priority-tag p-${t.priority}" style="margin-left:0.5rem; font-size:0.65rem;">${t.priority}</span>
                ${t.category ? `<span style="font-size:0.65rem; color:var(--neon-blue); border: 1px solid var(--neon-blue); padding: 0.1rem 0.3rem; border-radius: 4px; margin-left:0.5rem;">🏷️ ${escapeHtml(t.category)}</span>` : ''}
              </div>
            </div>
            <button class="action-btn edit-btn" style="margin-left:auto; padding:0.4rem;" title="Edit Tugas" onclick="openEditModal('${t.id}')">✏️</button>
          </div>
        `).join('');'''

content = content.replace(old_day_detail, new_day_detail)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done day detail")
