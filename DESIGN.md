---
name: MeriHaat
description: Tomorrow's leaf of a household wall calendar; a curated fresh-food haat delivered by 7 AM.
colors:
  vermilion: "#e0301e"
  vermilion-deep: "#b8240f"
  leaf: "#1f4d2b"
  leaf-soft: "#e3ebe2"
  ink: "#17140f"
  ink-soft: "#4f4a42"
  ink-mute: "#6b655b"
  rule: "#d6d3ca"
  paper: "#f6f5f1"
  paper-deep: "#ecebe5"
typography:
  numeral:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(9rem, 26vw, 15.5rem)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 62"
  display:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 80"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.05
    fontVariation: "'wdth' 80"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.25
    fontVariation: "'wdth' 80"
  body:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.05em"
  price:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "'tnum' 1"
  devanagari:
    fontFamily: "'Tiro Devanagari Hindi', serif"
    fontSize: "0.875rem"
    fontWeight: 400
rounded:
  none: "0px"
  circle: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "32px"
  gutter-lg: "64px"
  section-sm: "64px"
  section-lg: "96px"
  container: "1440px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paper}"
  button-basket:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "48px"
  button-basket-hover:
    backgroundColor: "{colors.vermilion-deep}"
  button-add:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "40px"
  button-add-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  stepper:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "40px"
  chip-pack:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
  chip-pack-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  input-search:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "48px"
  badge-discount:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  month-tab:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "16px 16px"
  month-tab-selected:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paper}"
---

# Design System: MeriHaat

## Overview

**Creative North Star: "The Tear-Off Date Pad"**

MeriHaat is printed, not rendered. Every surface reads as a two-ink household wall calendar on off-white stock: carbon ink for type and rules, vermilion for whatever has been committed to tomorrow, and a single leaf green for season and origin. The delivery date is the loudest object on the page, set as an ultra-condensed black numeral; products sit in a ruled ink grid like the days of a month; real photography is the only full colour.

Density is that of a working calendar: tight ruled cells, honest per-unit prices in tabular figures, Hindi names set in Tiro Devanagari beside the English. Ornament is replaced by print devices the calendar already owns: binding holes, a pad masthead, a month strip, a rubber stamp. Corners are square everywhere except where the physical object is round (stamp, punch hole, count badge).

**Key Characteristics:**
- Two inks plus leaf green on paper stock; photography carries all other colour.
- Archivo across widths: condensed black numerals, semicondensed headings, normal-width UI.
- Ruled 1-2px ink grid; square corners; no cards floating on shadows.
- Vermilion means committed: tomorrow's date, basket, active month, discount, in-basket stamp.
- Bilingual: Devanagari names accompany English at a quieter weight and colour.

## Colors

A printer's two-ink palette (ink and vermilion) on warm off-white stock, with leaf green as the one seasonal spot colour.

### Primary
- **Calendar Vermilion** (vermilion): tomorrow's day numeral, the basket button, the selected month tab, discount badges, the "in basket" stamp, countdown figures, focus outlines, text selection and caret. Never body text, never decoration.
- **Pressed Vermilion** (vermilion-deep): hover state for vermilion-filled controls only.

### Secondary
- **Haat Leaf** (leaf): the season band, origin lines under product names, provenance check marks, the vegetables promotion panel, the free-delivery progress fill.
- **Leaf Wash** (leaf-soft): reserved pale tint of leaf for quiet seasonal fills; defined in the theme and lightly used.

### Neutral
- **Carbon Ink** (ink): all primary type, 2px rules, primary buttons, the announcement strip, the pad binding, the overnight and footer bands (inverted surfaces).
- **Soft Ink** (ink-soft): secondary copy, Devanagari names, search icon.
- **Muted Ink** (ink-mute): pack labels, struck-through MRP, sidebar group labels, placeholders.
- **Hairline** (rule): 1px dividers inside lists and menus, unselected pack chips, dashed "back in" placeholders.
- **Paper Stock** (paper): page background and the text colour on every ink or vermilion fill.
- **Deep Stock** (paper-deep): photo wells before load, testimonial band, active listbox row, progress track.

### Named Rules
**The Committed Ink Rule.** Vermilion marks only what the visitor has committed to or must act on before the cut-off: the delivery date, the basket, the selected month, a discount, the stamp. If an element is not one of these, it is ink or leaf.

**The Photo Is The Colour Rule.** No gradients, tints or illustrative colour beyond the ten theme tokens; product and produce photography supplies every other hue.

## Typography

**Display Font:** Archivo Variable (with Archivo, ui-sans-serif, system-ui) used across its width axis
**Body Font:** Archivo Variable at normal width
**Devanagari Font:** Tiro Devanagari Hindi (with serif)

**Character:** One grotesque stretched like calendar type: ultra-condensed black for numerals and the wordmark, semicondensed extra-bold for headings, normal width for UI. Tiro's calligraphic Devanagari is the warm counter-voice.

### Hierarchy
- **Numeral** (900, condensed 62% width, clamp(9rem, 26vw, 15.5rem), 0.82): the date leaf's day number; the same treatment at clamp(3.5rem, 6vw, 5.25rem) sets overnight timeline hours, and at 30px the wordmark.
- **Display** (800, semicondensed 80%, clamp(1.9rem, 3.6vw, 3.25rem), 1.0, -0.015em): section headings over a 2px ink rule; larger clamps up to 4rem on inverted bands.
- **Headline** (800, semicondensed, 1.75rem / clamp(1.75rem, 2.6vw, 2.4rem), 1.05): hero H1 and shelf headings.
- **Title** (700, semicondensed, 16-18px, tight): product names, step titles.
- **Body** (400, 15-16px, 1.625, 38-52ch): descriptions and supporting copy in ink-soft.
- **Label** (700, 14px or 12px, uppercase, 0.05em; 0.18em on the pad masthead): month tabs, the pad masthead, footer column and filter group headings. Labels head a column or name a control; they never sit above a headline.
- **Price** (800, 18-20px, tabular figures): every INR amount; MRP struck through in ink-mute at 14px.
- **Devanagari** (400, 14-18px, ink-soft or ink-mute): Hindi names beside English, never replacing it.

### Named Rules
**The Width Axis Rule.** Hierarchy is set by width and weight of one family, not by adding faces: condensed for numbers that must be seen across a room, semicondensed for headings, normal for reading.

**The Tabular Price Rule.** Every price, count and countdown uses tabular figures.

## Layout

A 1440px max container with gutters of 16px (mobile), 32px (md) and 64px (lg). Sections breathe at 64px vertical (96px at md and up); inside sections the grid is tight and ruled. The first viewport splits a 4fr date leaf from an 8fr product shelf (min 340px leaf), with the leaf stacking above the shelf below lg and turning into a two-column numeral/copy row at md. Product grids run 2 / 3 / 4 columns (mobile / sm / lg) with shared ink borders rather than gaps. The season band is a horizontal month rail that scrolls with snap and edge mask on narrow screens and lays flat on desktop. The header is sticky with a category nav row at lg; below lg the nav becomes a left sheet (min(86vw, 360px)).

## Elevation & Depth

Flat and printed. Depth comes from inversion (ink bands with paper type) and rules, not shadows. Shadows exist only on layers that genuinely float above the page.

### Shadow Vocabulary
- **Dropdown lift** (`box-shadow: 0 18px 40px -12px rgb(23 20 15 / 0.35)`): the search suggestion listbox.
- **Drawer edge** (`box-shadow: -24px 0 60px -20px rgb(23 20 15 / 0.4)`): the open basket drawer.

### Named Rules
**The Printed Sheet Rule.** Resting surfaces never cast shadows; only overlays (listbox, drawer, menu sheet with its ink/50 scrim) lift off the page.

## Shapes

Square corners on every control, cell, panel and photo. Borders are the form language: 2px ink for structural rules, controls and section heads; 1px ink between grid cells; 1px rule inside lists; 2px dashed rule for unavailable states. Circles appear only where the calendar object is round: the binding holes on the pad masthead, the rubber "in basket" stamp (rotated -8deg), basket count badges, and overnight timeline dots.

## Components

### Buttons
- **Shape:** square (0px), heights 48px for primary actions, 40px in product cells, 56px for drawer checkout.
- **Primary:** carbon ink fill, paper text, bold, 20px horizontal padding; hover fills vermilion. Trailing arrow nudges 4px on hover.
- **Basket:** vermilion fill with basket icon, count badge and running total; hover vermilion-deep; the icon bumps (scale 1.25, 380ms) when an item is added.
- **Add (outline):** 2px ink border on paper; hover inverts to ink; active flashes vermilion.
- **On inverted bands:** paper fill with ink text (hover vermilion), or 2px paper outline (hover fills paper).
- **Text link:** underlined with ink at 30% opacity, offset 0.2em; hover turns the decoration (or text) vermilion.

### Chips
- **Pack size:** 1px rule border, ink-soft 12px semibold; selected is solid ink with paper text; acts as a radio group.

### Cards / Containers
- **Product cell:** square, paper background, sits in a shared 1px ink grid; photo well in paper-deep at 16:10 (compact) or 4:3, scaling 1.04 on hover over 700ms expo. Discount badge flush to the photo's top-left corner. Body padding 12px compact / 16px full.
- **Shadow Strategy:** none (see Elevation).

### Inputs / Fields
- **Search:** 48px, 2px ink border, paper fill, attached ink "Search" button; border turns vermilion on focus-within; caret vermilion.
- **Global focus:** 2px vermilion outline, 2px offset.

### Navigation
- **Announcement strip:** ink band, 13px, city select and cut-off times.
- **Header:** sticky, paper at 95% with light blur, 2px ink bottom rule. Category links 15px semibold; active link vermilion with a 3px vermilion underbar.
- **Mobile:** menu sheet slides from the left (500ms expo), rows separated by rule, Devanagari names right-aligned.

### Date Leaf (signature)
The tear-off pad: ink masthead with month and year in tracked caps and two paper binding holes; tomorrow's day as the vermilion condensed numeral with weekday in English and Hindi. On load, today's ink leaf rotates away on its top edge (1100ms, 700ms delay, ease-out-quart) to reveal tomorrow; hidden under reduced motion.

### In-Basket Stamp (signature)
A 64px vermilion ring stamp, "In basket ×n", pressed onto the photo when a cell is added (scale 1.8 to 1, rotate -18 to -8deg, 420ms ease-out-expo). The same stamp at 112px confirms the basket drawer.

### Season Band (signature)
Leaf-green month rail of uppercase tabs; the selected month fills vermilion, the current month (when not selected) carries a 2px vermilion underline. The adjacent panel names the month in Devanagari and what it brings; selecting a month filters the shelf.

## Do's and Don'ts

### Do:
- **Do** keep vermilion for committed or time-critical things only (date, basket, active month, discount, stamp).
- **Do** set every price, count and countdown in tabular figures, with MRP struck through in ink-mute beside the price.
- **Do** pair English product and category names with their Devanagari names in Tiro at a quieter colour.
- **Do** separate cells with shared 1px ink rules and head sections with a 2px ink rule.
- **Do** honour reduced motion: the leaf tear is removed and stamp/bump animations stop.

### Don't:
- **Don't** round corners on controls, cells or photos; circles are reserved for stamps, binding holes, counts and timeline dots.
- **Don't** put shadows on resting cards or panels; only floating overlays lift.
- **Don't** introduce colours outside the ten theme tokens; photography is the only full colour.
- **Don't** add a photo-carousel hero or round category chips.
- **Don't** set small tracked uppercase labels above headlines; uppercase labels name tabs, mastheads and column groups only.
