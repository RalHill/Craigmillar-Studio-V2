import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = join(__dirname, '..');
const files = ['web-design.html', 'blog.html', 'ai-automation.html', 'our-work.html'];

const navRe = /<img src="data:image[^"]*"[^>]*class="nav__logo-img"[^>]*>/;
const footRe = /<a href="/" style="display:inline-flex;margin-bottom:14px;"><img src="data:image[^"]*"[^>]*><\/a>/;

for (const f of files) {
  const p = join(base, f);
  let s = fs.readFileSync(p, 'utf8');
  s = s.replace(navRe, '<img src="assets/images/logo-full.png" alt="Craigmillar Studio" class="nav__logo-img" width="200" height="44" />');
  s = s.replace(footRe, '<a href="/" style="display:inline-flex;margin-bottom:14px;"><img src="assets/images/logo-full.png" alt="Craigmillar Studio" class="footer__logo-img" width="180" height="40" /></a>');
  fs.writeFileSync(p, s);
  console.log('OK', f);
}
