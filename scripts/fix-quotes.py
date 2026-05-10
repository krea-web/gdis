"""Replace problematic curly-quote pairs INSIDE TS frontmatter strings.
The pattern `"...„content"..."` confuses esbuild because the interior `"`
gets parsed as the end of the JS string. We replace `„X"` → `«X»` (or simpler,
strip them).
"""
import re
from pathlib import Path

# Replace pattern: opening German curly „ ... „ inside a JS string-literal context.
# Strategy: any occurrence of „ followed by content followed by " (ascii) inside frontmatter — replace with single quotes.
# Safer: globally replace the curly pair „...„ with 'X' inside frontmatter only.

curly_pairs = [
    # German low-9 + high-9
    ('„', '"'),  # opening „ → curly close-double "
    # We'll convert curly „...„ to safe «...» since FR style is also unicode
]

DELETE = ['„']  # remove (these are the problem chars in TS literals)

files = list(Path('src/pages').rglob('*.astro'))
fixed = 0
for f in files:
    text = f.read_text(encoding='utf-8')
    m = re.match(r'^(---\n.*?\n---)(.*)$', text, re.DOTALL)
    if not m:
        continue
    frontmatter = m.group(1)
    rest = m.group(2)
    new_fm = frontmatter
    # In frontmatter, replace „X" pattern (curly opening + content + ASCII close-quote)
    # with «X» using French guillemets which are safe in JS strings as plain unicode.
    new_fm = re.sub(r'„([^„"]*)"', r'«\1»', new_fm)
    # Also replace standalone „ that escaped the pattern with «
    new_fm = new_fm.replace('„', '«')
    if new_fm != frontmatter:
        f.write_text(new_fm + rest, encoding='utf-8')
        fixed += 1
        print(f'fixed {f}')

print(f'\nTotal fixed: {fixed}')
