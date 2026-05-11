import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Smart parse priority patterns
old_patterns = '''      const priorityPatterns = [
        { regex: /\\b(tinggi|high|penting|urgent)\\b/gi, val: 'high' },
        { regex: /\\b(sedang|medium|biasa)\\b/gi, val: 'medium' },
        { regex: /\\b(rendah|low|nanti)\\b/gi, val: 'low' }
      ];'''

new_patterns = '''      const priorityPatterns = [
        { regex: /\\b(super\\s*high|kritis|darurat|sangat\\s*penting)\\b/gi, val: 'superhigh' },
        { regex: /\\b(tinggi|high|penting|urgent)\\b/gi, val: 'high' },
        { regex: /\\b(sedang|medium|biasa)\\b/gi, val: 'medium' },
        { regex: /\\b(rendah|low|nanti)\\b/gi, val: 'low' }
      ];'''

content = content.replace(old_patterns, new_patterns)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done smart parse")
