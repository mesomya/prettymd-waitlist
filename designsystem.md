# PrettyMD Design System

This document is the single source of truth for all visual decisions in PrettyMD. Every component, every screen, every new feature must follow these rules. If something isn't covered here, extend this document — don't improvise.

## Design Philosophy

**Neutral-first, accent-sparse.** The app is 95% black, white, and warm grays. The accent color appears only on interactive elements. Nothing decorative, nothing gratuitous.

**Warm personality.** Every neutral is warm-tinted (cream, not cool gray). This makes the app feel calm and literary — appropriate for a reading tool.

**Invisible design.** The interface should disappear. The user sees their Markdown content, not the app chrome. Every UI element earns its pixels or gets removed.

**Consistent to the pixel.** Every spacing value is on the 8px grid. Every font size follows the type scale. Every shadow follows the elevation system. No exceptions.

---

## Color Palette

### Design Principle

One accent color. Warm neutrals. No secondary color. The accent is used ONLY for interactive elements (links, active states, primary buttons, toggles). Everything else is neutral.

### Light Mode

```
Token                    Hex / Value                   Usage
─────────────────────────────────────────────────────────────────
--bg                     #F7F5F2                       App background, empty areas
--bg-subtle              #EFEDEA                       Sidebar background, recessed areas
--surface                #FDFCFA                       Content area, cards, elevated panels
--surface-raised         #FFFFFF                       Modals, dropdowns, popovers

--ink                    #1C1B19                       Primary text, headings
--ink-muted              #6E6A63                       Secondary text, labels, metadata
--ink-faint              #A8A39C                       Tertiary text, placeholders, disabled

--accent                 #34B892                       Links, active states, primary buttons
--accent-hover           #2DA37F                       Accent on hover (slightly darker)
--accent-soft            rgba(52, 184, 146, 0.08)     Accent backgrounds (active tab, hover)
--accent-softer          rgba(52, 184, 146, 0.04)     Subtle accent tint

--border                 rgba(28, 27, 25, 0.08)       Default borders, dividers
--border-strong          rgba(28, 27, 25, 0.15)       Emphasized borders

--shadow-sm              0 1px 3px rgba(28, 27, 25, 0.04)
--shadow-md              0 4px 16px rgba(28, 27, 25, 0.06), 0 1px 3px rgba(28, 27, 25, 0.03)
--shadow-lg              0 12px 40px rgba(28, 27, 25, 0.08)

--code-bg                #1E1C1A                       Code block background (warm dark)
--code-text              #E8E4DF                       Code block text

--search-bg              rgba(250, 204, 21, 0.35)     Search highlight
--search-active          rgba(250, 204, 21, 0.75)     Active search match

--dirty-color            #C2850E                       Unsaved indicator (warm amber)
--dirty-bg               rgba(194, 133, 14, 0.08)     Unsaved background tint

--selection              rgba(52, 184, 146, 0.14)     Text selection
```

### Dark Mode

```
Token                    Hex / Value                   Usage
─────────────────────────────────────────────────────────────────
--bg                     #141312                       App background
--bg-subtle              #1C1B19                       Sidebar, recessed areas
--surface                #201F1D                       Content area
--surface-raised         #2A2826                       Modals, dropdowns

--ink                    #E8E4DF                       Primary text
--ink-muted              #8A8580                       Secondary text
--ink-faint              #5A5651                       Tertiary text

--accent                 #4ECBA5                       Slightly brighter for dark contrast
--accent-hover           #5DD6B2                       Accent hover (lighter in dark mode)
--accent-soft            rgba(78, 203, 165, 0.10)     Accent backgrounds
--accent-softer          rgba(78, 203, 165, 0.05)     Subtle accent tint

--border                 rgba(232, 228, 223, 0.07)    Default borders
--border-strong          rgba(232, 228, 223, 0.12)    Emphasized borders

--shadow-sm              0 1px 3px rgba(0, 0, 0, 0.20)
--shadow-md              0 4px 16px rgba(0, 0, 0, 0.28)
--shadow-lg              0 12px 40px rgba(0, 0, 0, 0.36)

--code-bg                #131211                       Code block background
--code-text              #E8E4DF                       Code block text

--search-bg              rgba(202, 160, 0, 0.30)
--search-active          rgba(250, 204, 21, 0.60)

--dirty-color            #E5A220
--dirty-bg               rgba(229, 162, 32, 0.12)

--selection              rgba(78, 203, 165, 0.18)
```

### What the Accent Is Used For (Exhaustive List)

- Links in rendered Markdown
- Active tab indicator (thin bottom border or background tint)
- Primary action buttons ("Open File", "Open Folder")
- Active outline heading
- Toggle switches when ON
- Selected text cursor
- Focus ring on inputs
- Inline comment indicators (future)

### What the Accent Is NOT Used For

- Headings, body text, or any non-interactive text
- Background fills or decorative areas
- Icons in their default state (icons are --ink-muted by default)
- Borders (borders are always neutral)
- The edit/preview toggle (this should be neutral with accent only when active)

---

## Typography

### Font Stack

```
Layer            Font                     Fallback Stack
──────────────────────────────────────────────────────────────────
UI Chrome        Geist Sans               'Segoe UI', system-ui, sans-serif
Document Body    Source Serif 4            Charter, Georgia, serif
Document Heads   Source Serif 4            Charter, Georgia, serif
Code Blocks      JetBrains Mono           'Cascadia Code', Consolas, monospace
Inline Code      JetBrains Mono           'Cascadia Code', Consolas, monospace
```

All three fonts are free, open source, and commercially licensed. They must be bundled with the app (not loaded from a CDN).

### Type Scale

```
Token / Usage              Size      Weight    Line-Height   Letter-Spacing
──────────────────────────────────────────────────────────────────────────────
UI — Tiny (badge, hint)    12px      500       1.3           0
UI — Small (shortcut key)  13px      400       1.4           0
UI — Base (buttons, tabs)  14px      500       1.4           -0.01em
UI — Label (sidebar item)  14px      400       1.4           0
UI — Title (panel header)  15px      600       1.3           -0.01em

Body — Paragraph           17px      400       1.72          0
Body — List item           17px      400       1.72          0

Heading — H1               2.6rem    650       1.12          -0.035em
Heading — H2               1.9rem    650       1.15          -0.03em
Heading — H3               1.4rem    600       1.2           -0.02em
Heading — H4               1.15rem   600       1.25          -0.01em

Code — Block               14.5px    400       1.55          0
Code — Inline              0.88em    400       inherit       0

Outline — L1 heading       15px      500       1.35          0
Outline — L2 heading       14px      400       1.35          0
Outline — L3+ heading      13.5px    400       1.35          0
```

### Typography Rules

- **Minimum font size in the entire app: 12px.** Nothing smaller, ever.
- **UI chrome minimum: 14px** for anything the user needs to read regularly (tabs, sidebar items, buttons).
- **Document body: 17px minimum.** This is a reading app — readability is non-negotiable.
- **Headings use Source Serif 4 (same as body)** for cohesion. The hierarchy comes from size + weight, not font change.
- **UI chrome uses Geist Sans** — the clean geometric sans creates clear contrast with the serif content, signaling "this is the app" vs "this is your document."
- **Reader width: 720px.** At 17px body text, this produces ~68 characters per line (within the optimal 60-75 range).
- **All font sizes in the document body scale with `--ui-zoom`.**
- **UI chrome font sizes do NOT scale with zoom** — only the document content does.

---

## Spacing System

### Base: 8px Grid

All spacing values must be multiples of 4px (for tight spacing) or 8px (for standard spacing).

```
Token          Value     Usage
──────────────────────────────────────────────
--space-1      4px       Icon-label gap, tight internal padding
--space-2      8px       Small gaps between related items, input padding
--space-3      12px      Button horizontal padding, list item padding
--space-4      16px      Standard section padding, card padding
--space-5      20px      Medium section spacing
--space-6      24px      Sidebar content padding, panel margin
--space-8      32px      Section dividers, major gaps
--space-10     40px      Content area top/bottom padding
--space-12     48px      Page-level vertical padding
--space-16     64px      Welcome screen vertical spacing
```

### Key Structural Dimensions

```
Element                 Value       Notes
───────────────────────────────────────────
Title bar height        48px        6 * 8px grid
Status bar height       32px        4 * 8px grid
Sidebar width           260px       Collapsible
Outline width           220px       Sticky in content area
Reader max-width        720px       Optimal line length
Border radius (small)   6px         Buttons, inputs, chips
Border radius (medium)  10px        Cards, panels, code blocks
Border radius (large)   14px        Modals, dialogs
```

---

## Elevation & Shadows

### Levels

```
Level      Shadow                                         Usage
──────────────────────────────────────────────────────────────────
0          none                                           Flat (most UI)
1          --shadow-sm                                    Subtle lift (cards, hover)
2          --shadow-md                                    Dropdowns, popovers
3          --shadow-lg                                    Modals, dialogs
```

### Rules

- Most elements are Level 0 (flat). Don't add shadows by default.
- Borders are preferred over shadows for separating adjacent panels.
- Shadows are reserved for elements that float ABOVE the page (dropdowns, modals, tooltips).
- All shadows are warm-tinted (using the ink color's rgba, not pure black).

---

## Animation & Transitions

### Timing Tokens

```
Token              Duration     Easing                              Usage
──────────────────────────────────────────────────────────────────────────────
--ease-fast        150ms        cubic-bezier(0.22, 0.68, 0, 1)     Hover, focus, press
--ease-smooth      250ms        cubic-bezier(0.22, 0.68, 0, 1)     Panel show/hide, sidebar toggle
--ease-enter       200ms        cubic-bezier(0.0, 0.0, 0.2, 1)     Modal/dropdown appear
--ease-exit        150ms        cubic-bezier(0.4, 0.0, 1, 1)       Modal/dropdown dismiss
--ease-theme       300ms        ease                                 Theme switch (light ↔ dark)
```

### What Gets Animated

| Element | Animate? | Token |
|---|---|---|
| Button hover/press | Yes | --ease-fast |
| Sidebar show/hide | Yes | --ease-smooth |
| Dropdown appear | Yes | --ease-enter |
| Dropdown dismiss | Yes | --ease-exit |
| Theme switch | Yes | --ease-theme |
| Tooltip appear | Yes | --ease-fast |
| Tab switch content | No — instant swap | — |
| Scrolling | No — native only | — |
| File load/content change | No — instant | — |

### Rules

- **Never apply transitions globally.** No `* { transition: ... }`. Apply only to elements that need animation.
- **Exit faster than enter.** Dismissing something should feel instant; appearing should feel smooth.
- **Only animate `transform` and `opacity`.** Never animate `width`, `height`, `margin`, `padding`, or `top`/`left`. This ensures 60fps.
- **Respect `prefers-reduced-motion`.** Disable all non-essential animations.
- **No bounces, springs, or overshoot** on standard UI elements. Keep it calm and professional.

---

## Iconography

- Use **Lucide icons** (already the de facto standard, feather-icon family)
- Stroke-based, 1.5px or 2px stroke width
- Default size: 18px for toolbar/sidebar, 16px for inline, 20px for primary actions
- Default color: `--ink-muted`
- Hover color: `--ink`
- Active color: `--accent`

---

## Component Patterns

### Buttons

**Primary** (used sparingly — max 1 per screen):
- Background: `--accent`
- Text: white
- Hover: `--accent-hover`
- Border-radius: 6px
- Padding: 8px 16px
- Font: 14px / 500 weight

**Secondary/Ghost** (default for most actions):
- Background: transparent
- Text: `--ink-muted`
- Hover background: `rgba(28, 27, 25, 0.05)`
- Hover text: `--ink`

**Icon button** (toolbar, sidebar rail):
- 36px square, centered icon
- Same hover behavior as ghost button
- Border-radius: 6px

### Inputs

- Height: 36px
- Padding: 8px 12px
- Border: 1px solid `--border`
- Border-radius: 6px
- Focus: border-color `--accent`, box-shadow `0 0 0 3px var(--accent-soft)`

### Tabs

- Height: 36px within the 48px title bar
- Font: 14px / 500 weight
- Inactive: `--ink-muted`
- Active: `--ink` with subtle `--accent-soft` background or thin bottom accent border
- Close button: 14px X, visible on hover only
- Dirty indicator: small dot in `--dirty-color`

---

## What This System Replaces

The following current design decisions are superseded by this system:

| Old | New | Why |
|---|---|---|
| `--bg: #f6f2ea` | `--bg: #F7F5F2` | Slightly lighter, still warm |
| `--accent: #0d7468` (teal) | `--accent: #34B892` (muted emerald) | Warmer, more distinctive |
| `--secondary: #6EE7B7` (mint) | **Removed entirely** | One accent color only |
| `font-family: 'Segoe UI'` for UI | `'Geist Sans'` | Premium, purpose-built for UI |
| `font-family: 'Palatino Linotype'` for body | `'Source Serif 4'` | Better screen rendering |
| `--bar-h: 54px` | `48px` | Aligns to 8px grid |
| `--reader-w: 780px` | `720px` | Optimal line length |
| Global `*` transition | Per-element transitions only | Performance |
| `--ink-muted: #6b7280` (cool gray) | `#6E6A63` (warm gray) | Matches warm palette |
| `font-size: 15px` base | `14px` UI / `17px` body | Appropriate for each context |

---

## Extending This System

When adding a new feature or component:

1. Use only the colors defined above. If you need a new color, add it here first with a rationale.
2. Use only the spacing tokens. No magic numbers.
3. Use only the type scale. If you need a new size, add it here first.
4. Use only the animation tokens. No custom durations.
5. Test in both light and dark mode.
6. Test at 100% and 150% zoom.
