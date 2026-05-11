import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_edit_priority = '''        <select class="task-input" id="editPriority" style="width:120px">
          <option value="high">🔥 High</option>
          <option value="medium">⚡ Medium</option>
          <option value="low">🌿 Low</option>
        </select>'''

new_edit_priority = '''        <select class="task-input" id="editPriority" style="width:120px">
          <option value="superhigh">💥 Super High</option>
          <option value="high">🔥 High</option>
          <option value="medium">⚡ Medium</option>
          <option value="low">🌿 Low</option>
        </select>'''

content = content.replace(old_edit_priority, new_edit_priority)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done fixing edit priority")
