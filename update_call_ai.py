with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

import re

old_call_ai = r"""    // --- AI Features ---
    async function callAI\(systemPrompt, userPrompt\) \{
      const model = els.aiModelSelect \? els.aiModelSelect.value : KONEKTIKA_CONFIG.model;
      
      let baseURL = KONEKTIKA_CONFIG.baseURL;
      let finalModel = model;
      
      // Auto-detect Provider based on model selection to avoid proxy issues if they use direct keys
      if \(model.includes\('groq'\)\) \{
        baseURL = 'https://api.groq.com/openai/v1';
        finalModel = 'llama3-8b-8192'; // fallback groq model
      \} else if \(model.includes\('gemini'\)\) \{
        // Just an example, if they use konektika it uses the proxy, otherwise maybe direct\?
        // Keep Konektika proxy for others
      \}"""

new_call_ai = """    // --- AI Features ---
    async function callAI(systemPrompt, userPrompt) {
      const model = els.aiModelSelect ? els.aiModelSelect.value : KONEKTIKA_CONFIG.model;
      
      let baseURL = KONEKTIKA_CONFIG.baseURL;
      let finalModel = model;
      
      // Auto-detect Provider based on model selection to avoid proxy issues if they use direct keys
      if (model.includes('groq')) {
        baseURL = 'https://api.groq.com/openai/v1';
        finalModel = 'llama3-8b-8192'; // fallback groq model
      } else if (model.includes('gemini')) {
        baseURL = 'https://generativelanguage.googleapis.com/v1beta/openai';
        finalModel = 'gemini-1.5-flash';
      } else if (model.includes('mistral')) {
        baseURL = 'https://api.mistral.ai/v1';
        finalModel = 'open-mistral-7b';
      }"""

# Use re.sub to do exact or regex replace
content = re.sub(old_call_ai, new_call_ai, content, count=1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done updating index.html")
