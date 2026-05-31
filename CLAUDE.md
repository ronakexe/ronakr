# CLAUDE.md

## Project Overview
Personal portfolio for Ronak Ramnani built in Next.js.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS variables (no component libraries — no shadcn, no Radix, no Headless UI)
- **Deployment:** Vercel

## Colors

Defined as CSS variables in `globals.css`:

```css
:root {
  --color-blue: #0000FF;
  --color-green: #109066;
  --color-red: #FF0000;
}
```

## Logo
- Clover SVG located at `ronak-ramnani/assets/clover.svg`
- Do not use any other logo or placeholder

---

# Typography

## Fonts
Both fonts are loaded via `next/font/google` — no manual installation needed.

### DM Sans — UI Font
Used for: navigation, headings, labels, buttons, any non-body text

```js
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})
```

### Crimson Pro — Body Font
Used for: paragraph text, descriptions, long-form content

```js
import { Crimson_Pro } from 'next/font/google'

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson-pro',
})
```

## Root Layout Setup
Apply both fonts as CSS variables in `app/layout.tsx`:

```js
<html lang="en" className={`${dmSans.variable} ${crimsonPro.variable}`}>
```

## CSS Usage
```css
:root {
  --font-ui: var(--font-dm-sans);
  --font-body: var(--font-crimson-pro);
}

body {
  font-family: var(--font-dm-sans); /* DM Sans as default */
}

p, .body-text {
  font-family: var(--font-crimson-pro); /* Crimson Pro for body */
}
```

## Rules
- Default font everywhere: DM Sans
- Body/paragraph text only: Crimson Pro
- Do not use any other fonts
- Do not use system fonts or fallbacks as primary

---

## Type Scale

Use these sizes consistently across all pages. Tailwind breakpoint syntax: `text-[mobile] md:text-[desktop]`.

| Role | Mobile | Desktop | Font | Weight |
|---|---|---|---|---|
| Nav name | 36px | 50px | DM Sans | 600 |
| Nav items | 21px | 21px | DM Sans | 400 |
| H1 — page/section title | 32px | 52px | DM Sans | 700 |
| H2 — subsection title | 24px | 36px | DM Sans | 600 |
| Body | 16px | 20px | Crimson Pro | 400 |
| Card label | 18px | 18px | DM Sans | 600 |

```tsx
// H1
<h1 className="text-[32px] md:text-[52px]" style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 700 }}>

// H2
<h2 className="text-[24px] md:text-[36px]" style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 600 }}>

// Body paragraph
<p className="text-[16px] md:text-[20px]" style={{ fontFamily: 'var(--font-crimson-pro)', fontWeight: 400 }}>

// Card label
<h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '18px', fontWeight: 600 }}>
```
