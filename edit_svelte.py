import pathlib
path = pathlib.Path(r'c:\Users\navap\Desktop\Nav\Coding\Portfolio\src\routes\+page.svelte')
text = path.read_text(encoding='utf-8')
text = text.replace('<script lang="ts">', '<script lang="ts">\n    import "./page.css";')
start_idx = text.find('<style>')
if start_idx != -1:
    text = text[:start_idx]
path.write_text(text.strip() + '\n', encoding='utf-8')
