import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = join(__dirname, '..', 'index.html');

let s = fs.readFileSync(indexPath, 'utf8');

s = s.replace(
  /<img src="data:image[^"]*" alt="([^"]*)" class="nav__logo-img" \/>/,
  '<img src="assets/images/logo-full.png" alt="$1" class="nav__logo-img" width="200" height="44" />'
);

s = s.replace(
  /<div class="hero__card hero__card--main"><img src="data:image[^"]*" alt="([^"]*)"[^>]*\/>/,
  '<div class="hero__card hero__card--main"><img src="assets/images/hero/hero-main.jpg" alt="$1" width="560" height="420" loading="eager" fetchpriority="high" />'
);

const portfolioSrcs = [
  'assets/images/ss-helloyugo.png',
  'assets/images/ss-abrahams.png',
  'assets/images/ss-declutter.png',
  'assets/images/ss-sparrow.png',
  'assets/images/ss-askhill.png',
  'assets/images/ss-mccowan.png',
];

let i = 0;
s = s.replace(
  /<div class="port-card__thumb"><img src="data:image[^"]*" (alt="[^"]*")[^>]*>/g,
  (_, altAttr) => {
    const src = portfolioSrcs[i] ?? 'assets/images/hero/hero-main.jpg';
    i++;
    return `<div class="port-card__thumb"><img src="${src}" ${altAttr} width="640" height="200" loading="lazy" />`;
  }
);

s = s.replace(
  /<a href="/" style="display:inline-flex;margin-bottom:14px;"><img src="data:image[^"]*"[^>]*><\/a>/,
  '<a href="/" style="display:inline-flex;margin-bottom:14px;"><img src="assets/images/logo-full.png" alt="Craigmillar Studio" class="footer__logo-img" width="180" height="40" /></a>'
);

fs.writeFileSync(indexPath, s);
console.log('strip-base64-index: portfolio images replaced:', i);
