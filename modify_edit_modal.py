import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# openEditModal
open_edit_old = '''      els.editTitle.value = t.title;
      els.editDesc.value = t.desc || '';
      els.editPriority.value = t.priority;'''
open_edit_new = '''      els.editTitle.value = t.title;
      els.editDesc.value = t.desc || '';
      if(els.editCategory) els.editCategory.value = t.category || '';
      els.editPriority.value = t.priority;'''
content = content.replace(open_edit_old, open_edit_new)

# editSave
save_edit_old = '''      t.title = els.editTitle.value.trim() || t.title;
      t.desc = els.editDesc.value.trim();
      t.priority = els.editPriority.value;'''
save_edit_new = '''      t.title = els.editTitle.value.trim() || t.title;
      t.desc = els.editDesc.value.trim();
      if(els.editCategory) t.category = els.editCategory.value.trim();
      t.priority = els.editPriority.value;'''
content = content.replace(save_edit_old, save_edit_new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done edit modal")
