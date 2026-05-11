import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add getPriorityIcon update for superhigh
old_icon = '''      const icons = { high: '🔥', medium: '⚡', low: '🌿' };'''
new_icon = '''      const icons = { superhigh: '💥', high: '🔥', medium: '⚡', low: '🌿' };'''
content = content.replace(old_icon, new_icon)

# Update CSS for superhigh
css_insert = '''    .p-high { color: var(--neon-coral); border-color: rgba(255,77,109,0.3); background: rgba(255,77,109,0.05); }'''
new_css = '''    .p-superhigh { color: #ff0000; border-color: rgba(255,0,0,0.5); background: rgba(255,0,0,0.1); text-shadow: 0 0 5px #ff0000; }
    .p-high { color: var(--neon-coral); border-color: rgba(255,77,109,0.3); background: rgba(255,77,109,0.05); }'''
content = content.replace(css_insert, new_css)

# Update Task creation
task_creation_old = '''        desc: parsed.desc || els.descInput.value.trim(),
        priority: parsed.priority,'''
task_creation_new = '''        desc: parsed.desc || els.descInput.value.trim(),
        category: els.categoryInput ? els.categoryInput.value.trim() : '',
        priority: parsed.priority,'''
content = content.replace(task_creation_old, task_creation_new)

# Update Task meta display to show category
task_meta_old = '''${t.desc ? `<span style="font-size:0.75rem; color:var(--text-dim)">📝 ${escapeHtml(t.desc)}</span>` : ''}'''
task_meta_new = '''${t.desc ? `<span style="font-size:0.75rem; color:var(--text-dim)">📝 ${escapeHtml(t.desc)}</span>` : ''}
              ${t.category ? `<span style="font-size:0.75rem; color:var(--neon-blue); border: 1px solid var(--neon-blue); padding: 0.1rem 0.4rem; border-radius: 4px;">🏷️ ${escapeHtml(t.category)}</span>` : ''}'''
content = content.replace(task_meta_old, task_meta_new)

# Update reset inputs
reset_inputs_old = '''      els.taskInput.value = '';
      els.descInput.value = '';'''
reset_inputs_new = '''      els.taskInput.value = '';
      els.descInput.value = '';
      if(els.categoryInput) els.categoryInput.value = '';'''
content = content.replace(reset_inputs_old, reset_inputs_new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done JS logic 1")
