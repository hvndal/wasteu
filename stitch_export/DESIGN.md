---
name: Midnight Forest
colors:
  surface: '#001712'
  surface-dim: '#001712'
  surface-bright: '#004137'
  surface-container-lowest: '#00110d'
  surface-container-low: '#00201a'
  surface-container: '#00251e'
  surface-container-high: '#003028'
  surface-container-highest: '#003c33'
  on-surface: '#9bf3dd'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#9bf3dd'
  inverse-on-surface: '#00382e'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#303030'
  primary-container: '#202020'
  on-primary-container: '#898787'
  inverse-primary: '#5f5e5e'
  secondary: '#b6cbc2'
  on-secondary: '#21342e'
  secondary-container: '#374b44'
  on-secondary-container: '#a4bab1'
  tertiary: '#a1cfcb'
  on-tertiary: '#023734'
  tertiary-container: '#002523'
  on-tertiary-container: '#63908c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1b1c1c'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#d1e7de'
  secondary-fixed-dim: '#b6cbc2'
  on-secondary-fixed: '#0c1f19'
  on-secondary-fixed-variant: '#374b44'
  tertiary-fixed: '#bdece7'
  tertiary-fixed-dim: '#a1cfcb'
  on-tertiary-fixed: '#00201e'
  on-tertiary-fixed-variant: '#204e4b'
  background: '#001712'
  on-background: '#9bf3dd'
  surface-variant: '#003c33'
typography:
  headline-lg:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Arimo
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Arimo
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
---

# Design System: Midnight Forest

## Brand & Style
The brand personality is sophisticated, deep, and atmospheric. The style is a blend of **Minimalism** and **High-Contrast Dark Mode**, evoking a sense of focused intensity and professional precision. It targets users who prefer low-light environments and high-density information layouts.

## Colors
The system is anchored in a **dark color mode**. 
*   **Primary:** #202020 (Deep Neutral Black)
*   **Secondary:** #1b2e28 (Deep Forest Green)
*   **Tertiary:** #1c4a47 (Oceanic Teal)
*   **Neutral/Accent:** #007261 (Emerald Green)

This palette prioritizes legibility and reduces eye strain in dark environments.

## Typography
The typography is designed for maximum impact and accessibility.
*   **Headlines:** **Anton** — Bold, condensed, and powerful.
*   **Body:** **Arimo** — Clean, reliable sans-serif for reading.
*   **Labels/UI:** **Atkinson Hyperlegible Next** — Optimized for readability in micro-copy.

## Layout & Spacing
The layout follows a fluid grid system with a base-8 rhythmic scale. 
*   **Gutter:** 16px (md)
*   **Margin:** 32px (lg) on desktop, 16px on mobile.
The spacing logic emphasizes structural clarity, using negative space to define boundaries.

## Elevation & Depth
Depth is communicated through **tonal layering**. Surfaces closer to the user are rendered in slightly lighter shades of the primary dark gray. Low-opacity forest green borders provide object separation, while background blurs are used for navigation overlays.

## Shapes
The design utilizes a **Rounded** shape language:
*   **Standard Radius:** 0.5rem (8px) for buttons and inputs.
*   **Large Radius:** 1rem (16px) for cards and containers.
This rounding softens the condensed headlines and the dark palette.

## Components
- **Buttons:** Primary buttons use the emerald accent (#007261) with high-contrast text and 8px corners.
- **Cards:** Defined by deep green (#1b2e28) backgrounds with 1px teal borders.
- **Inputs:** Darker than the surface, utilizing Arimo for input text and Atkinson Hyperlegible Next for labels.
- **Chips:** Pill-shaped using tertiary teal backgrounds.
- **Lists:** Separated by subtle tonal shifts to maintain a clean, minimalist aesthetic.