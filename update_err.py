import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_err = r"""        if \(!response\.ok\) \{
           const errText = await response\.text\(\);
           try \{ const errJson = JSON\.parse\(errText\); return "Error API: " \+ \(errJson\.error\?\.message \|\| response\.statusText\); \} 
           catch\(e\) \{ return "Error API: " \+ response\.status \+ " " \+ response\.statusText; \}
        \}"""

new_err = """        if (!response.ok) {
           const errText = await response.text();
           try { 
             let errJson = JSON.parse(errText); 
             if (Array.isArray(errJson)) errJson = errJson[0];
             return "Error API: " + (errJson?.error?.message || response.statusText); 
           } catch(e) { return "Error API: " + response.status + " " + response.statusText; }
        }"""

content = re.sub(old_err, new_err, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done updating error handler")
