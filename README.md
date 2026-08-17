# Lauren Amour — Official Site

React + Vite rebuild of laurenamour.com. Bold, glossy Y2K-revival look with
scroll-driven animations (Framer Motion), built as a single-page site.

## Run it

```bash
npm install
npm run dev
```

## Things to plug in before launch

All of these live in `src/data/links.js` and the relevant components —
nothing else needs to change.

1. **Photos.** `src/components/Gallery.jsx` and `src/components/Hero.jsx`
   currently use `<PlaceholderImage>` gradient blocks as stand-ins. Drop real
   photos into `src/assets/`, then swap each `<PlaceholderImage label="…" />`
   for an `<img src={...} />`.

2. **Instagram feed.** Set `SNAPWIDGET_EMBED_URL` in `src/data/links.js` once
   you've connected the `@laurenamourmusic` account at
   [snapwidget.com](https://snapwidget.com) — the placeholder in
   `InstagramFeed.jsx` auto-switches to the live iframe embed.

3. **Mailing list.** Set `MAILING_LIST_ENDPOINT` in `src/data/links.js` to
   your provider's form-submit endpoint (Mailchimp, ConvertKit, etc.). Until
   then, `MailingList.jsx` just simulates a successful signup — no emails are
   actually collected.

4. **Links already wired up** (from the current live site): Instagram,
   TikTok, YouTube, Facebook, the Ko-fi shop, and the Spotify artist page —
   all in `src/data/links.js`.

## Structure

- `src/components/Hero.jsx` — parallax hero with scroll-linked blobs
- `src/components/Gallery.jsx` — staggered scroll-reveal photo grid
- `src/components/ListenShop.jsx` — Spotify + shop CTA band
- `src/components/InstagramFeed.jsx` — IG embed section
- `src/components/MailingList.jsx` — reusable signup form (used twice)
- `src/components/NavBar.jsx` / `Footer.jsx` — nav + footer, both with socials
