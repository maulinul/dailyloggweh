import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add new els
old_els = '''      filters: document.querySelectorAll('.filter-chip'),'''
new_els = '''      filters: document.querySelectorAll('.filter-chip'),
      priorityFilter: document.getElementById('priorityFilter'),
      sortFilter: document.getElementById('sortFilter'),
      testAiKeyBtn: document.getElementById('testAiKeyBtn'),
      aiTestStatus: document.getElementById('aiTestStatus'),
      descInput: document.getElementById('descInput'),
      categoryInput: document.getElementById('categoryInput'),
      editCategory: document.getElementById('editCategory'),'''

content = content.replace(old_els, new_els)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done JS els")
