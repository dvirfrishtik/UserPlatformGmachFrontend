# Design tokens (Figma DSM)

Raw token exports from the platform’s Figma Design System (Mode 1).

| File | Description |
|------|-------------|
| `figma/Mode1-primitive.json` | **Primitive** — Color palettes (Deep Blue, Slate, etc.), type families/weights, spacing scale |
| `figma/Mode1-semantic-colors.json` | **Semantic** — Primary and other semantic colors (alias to primitives) |
| `figma/Mode1-surfaces.json` | **Surfaces** — Surface default, page, subtle, etc. |
| `figma/Mode1-typography.json` | **Typography** — Body/heading sizes, line heights, weights, paragraph spacing |

For implementation in the app, use **`src/styles/design-tokens.css`**, which turns these into CSS custom properties.

Design decisions and usage notes: **`docs/DESIGN_STYLE_PLAN.md`**.
