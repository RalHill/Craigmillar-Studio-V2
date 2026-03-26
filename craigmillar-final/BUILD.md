# Craigmillar Studio — deploy & launch checklist

Static site output lives in this folder (`craigmillar-final`). Production domain: **https://craigmillar.com**

## Vercel

- Connect the GitHub repo and set the **Root Directory** to `craigmillar-final` (or deploy this folder as the project root).
- Add **craigmillar.com** under **Project → Settings → Domains** and set it as the primary production domain.
- Configure **www** → redirect to apex (or the reverse), so only one canonical host serves HTML.
- Ensure **HTTPS** is enabled (automatic on Vercel).

## DNS

- At your registrar, point **A/AAAA** or **CNAME** for `craigmillar.com` (and `www` if used) to Vercel’s records per the Vercel domain UI.

## Favicon & PWA

- Tab icon: `/favicon.ico` (copy of generated ICO in `assets/favicons/`).
- PNG set: `/assets/favicons/` (`favicon-32x32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`).
- Manifest: `/site.webmanifest` (icons + theme colors).
- Regenerate sizes from `assets/favicons/icon-512.png` if the master asset changes:

  ```bash
  npm install
  npm run generate-favicons
  ```

  Then copy `assets/favicons/favicon.ico` to the site root again (`favicon.ico`).

## Post-deploy verification

- Open `/`, `/blog.html`, and one `/blog/*.html` URL: favicon appears; **Add to Home Screen** uses the new icon (mobile).
- Confirm **200** responses for `/favicon.ico`, `/site.webmanifest`, and `/assets/favicons/*.png`.
- [Rich Results Test](https://search.google.com/test/rich-results): JSON-LD URLs use `https://craigmillar.com`.

## Google Search Console (optional next step)

- Add a **Domain** or **URL prefix** property for `craigmillar.com` and verify.
- When `sitemap.xml` exists, submit it under **Sitemaps**.

## Old domain

- If **craigmillarstudio.ca** still receives traffic, add **301 redirects** to `craigmillar.com` at DNS or Vercel (not handled in this static bundle).
