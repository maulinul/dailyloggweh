import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_call_ai = '''    async function callAI(systemPrompt, userPrompt) {
      const model = els.aiModelSelect ? els.aiModelSelect.value : KONEKTIKA_CONFIG.model;
      try {
        const response = await fetch(KONEKTIKA_CONFIG.baseURL + '/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + KONEKTIKA_CONFIG.apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {role: "system", content: systemPrompt},
              {role: "user", content: userPrompt}
            ]
          })
        });
        const data = await response.json();
        if (data && data.choices && data.choices[0]) {
          return data.choices[0].message.content;
        }
        return "Respon tidak valid.";
      } catch (err) {
        console.error("AI Error:", err);
        return "Error: " + err.message;
      }
    }'''

new_call_ai = '''    async function callAI(systemPrompt, userPrompt) {
      const model = els.aiModelSelect ? els.aiModelSelect.value : KONEKTIKA_CONFIG.model;
      
      let baseURL = KONEKTIKA_CONFIG.baseURL;
      let finalModel = model;
      
      // Auto-detect Provider based on model selection to avoid proxy issues if they use direct keys
      if (model.includes('groq')) {
        baseURL = 'https://api.groq.com/openai/v1';
        finalModel = 'llama3-8b-8192'; // fallback groq model
      } else if (model.includes('gemini')) {
        // Just an example, if they use konektika it uses the proxy, otherwise maybe direct?
        // Keep Konektika proxy for others
      }

      try {
        const response = await fetch(baseURL + '/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + KONEKTIKA_CONFIG.apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: finalModel,
            messages: [
              {role: "system", content: systemPrompt},
              {role: "user", content: userPrompt}
            ]
          })
        });
        
        if (!response.ok) {
           const errText = await response.text();
           try { const errJson = JSON.parse(errText); return "Error API: " + (errJson.error?.message || response.statusText); } 
           catch(e) { return "Error API: " + response.status + " " + response.statusText; }
        }
        
        const data = await response.json();
        if (data && data.choices && data.choices[0]) {
          return data.choices[0].message.content;
        }
        return "Respon tidak valid: " + JSON.stringify(data).substring(0, 50);
      } catch (err) {
        console.error("AI Error:", err);
        return "Error Request: " + err.message;
      }
    }'''

content = content.replace(old_call_ai, new_call_ai)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done call AI")
