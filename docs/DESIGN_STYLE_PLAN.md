# Design Style Plan — Platform DSM (Mode 1)

This document plans the design style based on the Figma DSM tokens you provided. Once you share existing design references, we can refine layout, components, and patterns.

---

## 1. Token files saved

| File | Purpose |
|------|--------|
| `design-tokens/figma/Mode1-primitive.json` | Primitive colors, type families/weights, spacing scale |
| `design-tokens/figma/Mode1-semantic-colors.json` | Semantic colors (e.g. Primary → Deep Blue) |
| `design-tokens/figma/Mode1-surfaces.json` | Surface / page / UI role colors |
| `design-tokens/figma/Mode1-typography.json` | Body & heading sizes, line heights, weights, paragraph spacing |

---

## 2. Color system

### 2.1 Primitive palettes (Mode 1 – Primitive)

- **Deep Blue** — Primary brand (main blue). Base: `#264CBD` (500), light: `#F7F9FF` (25), dark: `#081026` (1000).
- **Blue** — Slightly brighter blue variant; shares 500/600/700 with Deep Blue.
- **Warm Orange** — Accent / CTA. Base: `#FF512E` (500).
- **Teal** — Secondary / success-ish. Base: `#269CBD` (500).
- **Purple** — Secondary. Base: `#964DCE` (500).
- **Green** — Success / positive. Base: `#2DAC79` (500).
- **Orange** — Warning / highlight. Base: `#F78B1F` (500).
- **Red** — Error / destructive. Base: `#F3463D` (500).
- **Slate** — Cool neutrals for text and borders. 25–1000 scale.
- **Neutral** — Neutral grays. 25–1000.
- **Grey** — Pure grays. 25–1000.

Each palette uses steps: **25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000** (light → dark).

### 2.2 Semantic & surface (from tokens 3 & 4)

- **Primary** maps to **Deep Blue** (primary actions, links, selected states).
- **Surface**: default (white), page (e.g. `#F8F9FD`), subtle (e.g. Primary/25) for backgrounds and cards.

**Design direction:** Use Deep Blue as primary; Warm Orange for important CTAs or highlights; Slate/Neutral for text and borders; semantic Red/Green for error/success.

---

## 3. Typography

### 3.1 Font family

- **Headings & body:** Noto Sans Hebrew (RTL-friendly; good for Hebrew + Latin).

**Implementation:** Load **Noto Sans Hebrew** (e.g. Google Fonts) and set as default font stack.

### 3.2 Weights

- Thin, Light, **Regular**, **Medium**, **Semibold**, **Bold**.  
- Use Regular/Medium for body, Medium/Semibold/Bold for headings and emphasis.

### 3.3 Body (Mode 1 – Typography)

| Size key   | Font size | Line height |
|-----------|-----------|-------------|
| large     | 18px      | 28px       |
| medium    | 16px      | 24px       |
| small     | 14px      | 16px       |
| small-sub | 13px      | 18px       |
| xsmall    | 12px      | 18px       |
| tiny      | 11px      | 16px       |

### 3.4 Headings

| Level | Size | Line height |
|-------|------|-------------|
| h1    | 36px | 40px       |
| h2    | 28px | 32px       |
| h3    | 24px | 28px       |
| h4    | 20px | 26px       |
| h5    | 18px | 20px       |

### 3.5 Paragraph spacing

Steps 1–8: 16, 18, 20, 24, 28, 32, 36, 44 (e.g. for margin-bottom or gap between paragraphs).

**Design direction:** Use body medium/small for most UI text; headings for page/section titles; keep line heights as in tokens for readability, especially for Hebrew.

---

## 4. Spacing scale (Mode 1 – Primitive)

Scale keys map to pixel values:

| Key  | 0 | 25 | 50 | 100 | 150 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000 | 1200 | 1400 | 1600 | 1800 | 2000 | 2200 | 2400 | 2600 | 2800 | 3000 | 3200 |
|------|---|----|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|------|------|------|------|------|------|------|------|------|------|------|------|
| **px** | 0 | 1 | 2 | 4  | 6   | 8   | 12  | 16  | 20  | 24  | 28  | 32  | 36  | 40   | 48   | 56   | 64   | 72   | 80   | 88   | 96   | 112  | 128  | 144  | 160  |

Use for: padding, margin, gap, and component spacing so the UI stays aligned with Figma.

---

## 5. Design style summary

| Area | Decision |
|------|----------|
| **Primary brand** | Deep Blue (500) for primary actions and key UI. |
| **Accent / CTA** | Warm Orange (500) for prominent CTAs if desired. |
| **Backgrounds** | White (surface default), page tint (e.g. Slate 50), subtle (Primary 25). |
| **Text** | Slate or Neutral 800–1000 for primary text; 500–600 for secondary. |
| **Font** | Noto Sans Hebrew everywhere; weights as above. |
| **Spacing** | 4px base grid; use the scale (4, 8, 12, 16, 20, 24, 32, …) for consistency. |
| **RTL** | Noto Sans Hebrew supports RTL; layout should use logical CSS (e.g. `margin-inline-start`) and RTL-aware components. |

---

## 6. Reference alignment (existing platform)

Based on the provided Gmach portal screens, the following patterns are confirmed and should drive implementation.

### 6.1 Layout structure

| Area | Description |
|------|-------------|
| **Sidebar** | Fixed **right** (RTL) vertical strip. Dark blue background; white text and line icons. Logo at top (“הגמ"ח המרכזי”) with **gold** accent. |
| **Active nav item** | Lighter dark blue background (not white text only). |
| **Main content** | Left side; white or very light grey (`#F8F9FD`-style) background. Scrollable. |
| **Header (optional)** | Top bar: greeting + donor ID + last login on one side; profile avatar + notification bell (with red badge) on the other. |

**RTL:** Sidebar on the right, content on the left; all text and inline layout RTL. Use logical CSS (`margin-inline-start`, `padding-inline-end`, etc.) and `dir="rtl"` where needed.

### 6.2 Component patterns (from references)

| Component | Usage in references |
|-----------|----------------------|
| **Primary button** | Dark blue fill, white text, optional leading icon (e.g. plus). Example: “הוספת אמצעי תשלום”. |
| **Tabs (section)** | Two styles: (1) Underline — text with grey underline for active; (2) Pill/segmented — “פעילים (3)” / “לא פעילים (1)” with dark blue for selected, grey for unselected. |
| **Cards** | White background, rounded corners, **subtle drop shadow**. Used for payment methods, content blocks. |
| **Selected card** | Same card but **dark blue background**, white text (e.g. selected payment method). |
| **Tables** | Clean rows; optional icon at row start (RTL). Headers: e.g. “סכום חודשי”, “מס' מזהה”, “תשלום עבור”. |
| **Timeline / bar chart** | Horizontal bars; **dark blue** for active/completed period, **light blue** for future; percentages inside dark segment. X-axis: years; Y-axis: labels (e.g. names). |
| **Export strip** | **Light green** background band; “יצוא ל-PDF” / “יצוא לאקסל” with icons. |
| **Notification badge** | Red dot or red pill with count (e.g. “2”) on bell or nav item. |

### 6.3 Color mapping from references

| UI element | Token / variable |
|------------|-------------------|
| Sidebar background | Deep Blue 800–900 (`#13255c`–`#0d1a42`) |
| Sidebar active item | Lighter blue (e.g. Deep Blue 700 or 600 with opacity) |
| Logo gold accent | Add to tokens if not in DSM; use for “הגמ"ח המרכזי” highlight |
| Main background | Surface page (`#F8F9FD`) or white |
| Primary button / selected tab | Deep Blue 500 (`--color-primary`) |
| Cards | White, `--color-surface-default` |
| Selected card | Deep Blue 500–600 (same as primary) |
| Chart active segment | Deep Blue 500–700 |
| Chart future segment | Deep Blue 200–300 (light blue) |
| Export strip | Green 100–200 (`--color-success-muted` or similar light green) |
| Notification badge | Red 500 (`--color-error`) |

### 6.4 Summary

- **Layout:** Fixed right sidebar + main content; optional top header with greeting and actions.
- **Visual hierarchy:** Dark blue for nav and primary actions; white/light grey for content; gold for logo accent; red for alerts/badges; light green for export strip.
- **Components:** Buttons (dark blue), underline and pill tabs, elevated cards (shadow), selected state (dark blue card), tables, horizontal bar chart (dark/light blue), export strip (green).
- **RTL and font:** Noto Sans Hebrew; all layout and spacing RTL-aware.

---

## 7. Next steps

1. **Implement layout** — `AppShell` with right sidebar + main area; optional header.
2. **Implement components** — Buttons, tabs, cards, tables, chart, export strip using the tokens above.
3. **Add any missing tokens** — Shadows, radii, border widths from Figma if needed.
4. **Load Noto Sans Hebrew** — Google Fonts (or self-host) and set as default in `design-tokens.css` / layout.

The tokens are saved under `design-tokens/figma/`. Use `src/styles/design-tokens.css` (and the reference-specific variables added there) for implementation.
