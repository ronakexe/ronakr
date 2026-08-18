# CLAUDE.md

## Project Overview
Personal portfolio for Ronak Ramnani built in Next.js.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS variables (no component libraries — no shadcn, no Radix, no Headless UI)
- **Deployment:** Vercel

## Colors

The site palette is defined as CSS variables in `globals.css`. Pages consume the
three aliases (`--bg`, `--text`, `--name`), which resolve through the active theme.

| Role | Light | Dark |
|---|---|---|
| Background (`--bg`) | `#F8EFEF` | `#1A0808` |
| Text (`--text`) | `#330000` | `#F8EFEF` |
| "Ronak Ramnani" (`--name`) | `#E81E1E` | `#E81E1E` |

## Logo
- Clover SVG located at `ronak-ramnani/assets/clover.svg`
- Do not use any other logo or placeholder

---

# Typography

## Fonts

### Redaction 50 — Display / Name
Used for: "Ronak Ramnani" in the sidebar. Self-hosted from `public/fonts/`
(`Redaction_50-Regular.woff2`, `Redaction_50-Bold.woff2`, `Redaction_50-Italic.woff2`),
declared via `@font-face` in `globals.css`. Redaction 20 and Redaction 35 are also
available; Redaction 20 is used for piece-page titles.

```css
font-family: 'Redaction 50', var(--font-dm-sans), sans-serif;
```

### DM Sans — UI Font
Used for: navigation, headings, labels, buttons, any non-body text

```js
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})
```

### EB Garamond — Body Font
Used for: paragraph text, descriptions, long-form content

```js
import { EB_Garamond } from 'next/font/google'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
})
```

## Root Layout Setup
Apply both Google fonts as CSS variables in `app/layout.tsx`:

```js
<html lang="en" className={`${dmSans.variable} ${ebGaramond.variable}`}>
```

## CSS Usage
```css
:root {
  --font-ui: var(--font-dm-sans);
  --font-body: var(--font-garamond);
}

body {
  font-family: var(--font-dm-sans); /* DM Sans as default */
}

p, .body-text {
  font-family: var(--font-garamond); /* EB Garamond for body */
}
```

## Rules
- Default font everywhere: DM Sans
- Body/paragraph text only: EB Garamond
- The name "Ronak Ramnani" only: Redaction 50
- Do not use any other fonts
- Do not use system fonts or fallbacks as primary

## Section labels
Initiatives / Pieces / Finds always render **bold and uppercase**, via the
`.section-label` class in `globals.css`.

---

## Type Scale

Use these sizes consistently across all pages. Tailwind breakpoint syntax: `text-[mobile] md:text-[desktop]`.

| Role | Mobile | Desktop | Font | Weight |
|---|---|---|---|---|
| Nav name | 36px | 50px | DM Sans | 600 |
| Nav items | 21px | 21px | DM Sans | 400 |
| H1 — page/section title | 32px | 48px | DM Sans | 700 |
| H2 — subsection title | 24px | 36px | DM Sans | 600 |
| Body | 18px | 18px | EB Garamond | 400 |
| Card label | 18px | 18px | DM Sans | 600 |

```tsx
// H1
<h1 className="text-[32px] md:text-[48px]" style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 700 }}>

// H2
<h2 className="text-[24px] md:text-[36px]" style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 600 }}>

// Body paragraph
<p className="text-[18px]" style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400 }}>

// Card label
<h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '18px', fontWeight: 600 }}>
```
