# GH-1 screenshot evidence

- `figma-1440.png`: Accounts · 1440, node 125:2844, 1440 × 800, Light, initial state.
- `implementation-1440.png`: `/accounts`, 1440 × 800, Light, initial state.
- `implementation-900.png`: `/accounts`, 900 × 1024 viewport, full page, Light, initial state.
- `implementation-480.png`: `/accounts`, 480 × 1400 viewport, full page, Light, initial state.

Browser screenshots were captured through the Chrome extension and losslessly
converted from JPEG to PNG for storage. Preview records and contacts are
illustrative. The implementation retains the existing design-system font stack
(system fonts in Light/Dark, monospace in retro themes), required-field markers,
and component border sizing; Figma uses Inter in Light and does not show the
required markers. These inherited component differences are visible in the
comparison.

Browser checks covered combined case-insensitive customer filters, empty results,
ascending/descending numeric MRR sorting, Cancel, required-field and email
validation, invalid-field focus, valid creation and count updates, keyboard mobile
sorting, navigation, and Light/Dark/16-bit/32-bit appearance. No app-sourced runtime
errors were captured; unrelated browser-extension errors and existing React
Router future-flag warnings appeared in the console.
