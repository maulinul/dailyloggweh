import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add event listeners for new filters
events_old = '''    // Search & Filter
    els.searchInput.addEventListener('input', e => { searchQuery = e.target.value; renderTasks(); });
    els.filters.forEach(f => {
      f.addEventListener('click', () => {
        els.filters.forEach(x => x.classList.remove('active'));
        f.classList.add('active');
        currentFilter = f.dataset.filter;
        renderTasks();
      });
    });'''

events_new = '''    // Search & Filter
    els.searchInput.addEventListener('input', e => { searchQuery = e.target.value; renderTasks(); });
    if(els.filters) {
      els.filters.forEach(f => {
        f.addEventListener('click', () => {
          els.filters.forEach(x => x.classList.remove('active'));
          f.classList.add('active');
          currentFilter = f.dataset.filter;
          renderTasks();
        });
      });
    }
    if(els.priorityFilter) {
      els.priorityFilter.addEventListener('change', renderTasks);
    }
    if(els.sortFilter) {
      els.sortFilter.addEventListener('change', renderTasks);
    }'''

content = content.replace(events_old, events_new)

# Add event listener for AI Test button
ai_test_code = '''    if (els.testAiKeyBtn) {
      els.testAiKeyBtn.addEventListener('click', async () => {
        if(els.aiTestStatus) els.aiTestStatus.innerHTML = '⏳ Mengetes API Key...';
        const res = await callAI("Balas dengan kata 'OK' jika kamu menerima pesan ini.", "Test");
        if(els.aiTestStatus) {
           if(res.includes("Error") || res.includes("tidak valid")) {
               els.aiTestStatus.innerHTML = '❌ ' + res;
               els.aiTestStatus.style.color = '#ff4d6d';
           } else {
               els.aiTestStatus.innerHTML = '✅ API Key Valid! (' + res + ')';
               els.aiTestStatus.style.color = '#00f5a0';
           }
        }
      });
    }'''

if 'initAI()' in content:
    content = content.replace('    function initAI() {', ai_test_code + '\n\n    function initAI() {')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done events")
