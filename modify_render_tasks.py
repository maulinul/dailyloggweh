import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# renderTasks filtering logic
old_filter = '''      let filtered = tasks.filter(t => {
        if (currentFilter === 'pending') return !t.done;
        if (currentFilter === 'done') return t.done;
        if (currentFilter === 'high') return t.priority === 'high';
        return true;
      });'''

new_filter = '''      let filtered = tasks.filter(t => {
        if (currentFilter === 'pending' && t.done) return false;
        if (currentFilter === 'done' && !t.done) return false;
        
        const prioFilter = els.priorityFilter ? els.priorityFilter.value : 'all';
        if (prioFilter !== 'all' && t.priority !== prioFilter) return false;
        
        return true;
      });'''
content = content.replace(old_filter, new_filter)

# renderTasks sorting logic
old_sort = '''      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(t => t.title.toLowerCase().includes(q) || (t.desc && t.desc.toLowerCase().includes(q)));
      }'''

new_sort = '''      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(t => t.title.toLowerCase().includes(q) || (t.desc && t.desc.toLowerCase().includes(q)) || (t.category && t.category.toLowerCase().includes(q)));
      }

      if (els.sortFilter) {
        const sortOptions = Array.from(els.sortFilter.selectedOptions).map(opt => opt.value);
        if (sortOptions.length > 0) {
          filtered.sort((a, b) => {
            for (let sortType of sortOptions) {
              if (sortType === 'date') {
                const dateA = new Date(a.dateTime || a.createdAt).getTime();
                const dateB = new Date(b.dateTime || b.createdAt).getTime();
                if (dateA !== dateB) return dateB - dateA; // Newest first
              } else if (sortType === 'priority') {
                const pMap = { superhigh: 4, high: 3, medium: 2, low: 1 };
                const pA = pMap[a.priority] || 0;
                const pB = pMap[b.priority] || 0;
                if (pA !== pB) return pB - pA; // Highest priority first
              } else if (sortType === 'status') {
                if (a.done !== b.done) return a.done ? 1 : -1; // Pending first
              }
            }
            return 0;
          });
        }
      }'''
content = content.replace(old_sort, new_sort)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done filter and sort")
