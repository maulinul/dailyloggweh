import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove old buttons from settings panel
old_buttons = '''      <div class="input-row">
        <button class="btn" id="syncToGithub" style="flex:1; font-size:0.8rem; padding:0.6rem;">☁️ Save to GitHub</button>
        <button class="btn-icon" id="loadFromGithub" style="padding:0.6rem;" title="Load from GitHub">📥</button>
      </div>
      <div class="github-status" id="githubStatus"></div>'''

new_status_only = '''      <div class="github-status" id="githubStatus"></div>'''

content = content.replace(old_buttons, new_status_only)

# Add new buttons next to task input
add_btn_pattern = '<button class="btn" id="addBtn">Tambah</button>'
new_add_btn = '''<button class="btn" id="addBtn">Tambah</button>
            <button class="btn-icon" id="syncToGithub" style="padding:0.5rem; font-size:1rem; border-radius:8px;" title="Save to GitHub">☁️</button>
            <button class="btn-icon" id="loadFromGithub" style="padding:0.5rem; font-size:1rem; border-radius:8px;" title="Load from GitHub">📥</button>'''

content = content.replace(add_btn_pattern, new_add_btn)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done github buttons")
