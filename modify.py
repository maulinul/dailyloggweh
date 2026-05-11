import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Try exact string replace
edit_desc_pattern = '<input type="text" class="task-input modal-input" id="editDesc" placeholder="Deskripsi">'
edit_desc_replacement = '<input type="text" class="task-input modal-input" id="editDesc" placeholder="Deskripsi">\n      <input type="text" class="task-input modal-input" id="editCategory" placeholder="Kategori">'
if edit_desc_pattern in content:
    content = content.replace(edit_desc_pattern, edit_desc_replacement)
    print("Found and replaced editDesc")
else:
    print("editDesc pattern not found")

desc_input_pattern = '<input type="text" class="task-input" id="descInput" placeholder="Deskripsi / Kategori (opsional)">'
desc_input_replacement = '<input type="text" class="task-input" id="descInput" placeholder="Deskripsi (opsional)">\n          <input type="text" class="task-input" id="categoryInput" placeholder="Kategori (opsional)">'
if desc_input_pattern in content:
    content = content.replace(desc_input_pattern, desc_input_replacement)
    print("Found and replaced descInput")
else:
    print("descInput pattern not found")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
