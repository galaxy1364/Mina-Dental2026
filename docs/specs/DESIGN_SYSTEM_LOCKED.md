# MinaDent Application: Design System (LOCKED)

**Status:** Draft  
**Version:** 1.0  
**Date:** 2026-06-19  
**Author:** Manus AI  
**Authority:** MASTER_SPECIFICATION.md, BANKING_DESIGN_RESEARCH.md, iOS 26 Design Guidelines, Material Design 3

---

## 1. Introduction

This document defines the comprehensive Design System for the MinaDent application. It establishes a unified set of visual and interactive guidelines, components, and patterns to ensure a consistent, high-quality, and intuitive user experience across all platforms (iOS, Android, Web/PWA). The design system is heavily inspired by the sophisticated aesthetics and usability of leading Iranian banking applications (Bank Mehr, Qbank) and adheres to the latest iOS 26 Class design principles, while also considering Material Design 3 for Android consistency.

---

## 2. Core Principles

-   **Clarity & Simplicity:** Clean, uncluttered interfaces that prioritize essential information and actions.
-   **Consistency:** Uniformity in visual elements, interactions, and behavior across the entire application.
-   **Elegance & Modernity:** A sophisticated and contemporary aesthetic, reflecting the professionalism of a dental practice and the trustworthiness of a banking application.
-   **Accessibility:** Designed to be usable by a wide range of users, including those with disabilities.
-   **Performance:** UI elements and animations are optimized for smooth and responsive interactions.
-   **RTL First:** All design elements are conceived with Right-to-Left (RTL) layout as the primary consideration.

---

## 3. Color Palette

The color palette is designed to evoke trust, professionalism, and a sense of calm, drawing inspiration from the modern and clean aesthetics of Bank Mehr and Qbank. It includes primary, accent, neutral, and semantic colors, with distinct variations for light and dark modes.

### 3.1 Primary & Accent Colors

| Name | Light Mode Hex | Dark Mode Hex | Usage | Inspiration |
|:-----|:---------------|:--------------|:------|:------------|
| **Primary Blue** | `#0066CC` | `#007AFF` | Main branding, primary actions, active states. | Bank Mehr, Qbank (core blue) |
| **Accent Green** | `#00A86B` | `#34C759` | Success states, positive indicators, secondary actions. | Qbank (accent green) |
| **Gradient Start** | `#0066CC` | `#1A1A2E` | Start of background/element gradients. | Bank Mehr, Qbank |
| **Gradient End** | `#00A86B` | `#CCFF00` | End of background/element gradients. | Bank Mehr, Qbank |

### 3.2 Neutral Colors (Background, Surface, Text)

| Name | Light Mode Hex | Dark Mode Hex | Usage |
|:-----|:---------------|:--------------|:------|
| **Background** | `#FFFFFF` | `#121212` | Main screen backgrounds. |
| **Surface** | `#F5F5F5` | `#1E1E1E` | Cards, elevated elements, modals. |
| **Foreground** | `#1A1A1A` | `#E0E0E0` | Primary text, headings. |
| **Muted** | `#666666` | `#A0A0A0` | Secondary text, placeholders, disabled states. |
| **Border** | `#E0E0E0` | `#333333` | Separators, outlines. |

### 3.3 Semantic Colors

| Name | Light Mode Hex | Dark Mode Hex | Usage |
|:-----|:---------------|:--------------|:------|
| **Success** | `#28A745` | `#2ECC71` | Success messages, positive feedback. |
| **Warning** | `#FFC107` | `#F1C40F` | Warning messages, alerts. |
| **Error** | `#DC3545` | `#E74C3C` | Error messages, destructive actions. |

---

## 4. Typography

Typography is crucial for readability and conveying information effectively, especially in RTL languages. A clear hierarchy and consistent application of fonts are essential.

### 4.1 Font Families

-   **Persian:** Vazirmatn (Primary), IRANSans (Secondary/Display)
-   **English:** Inter (Primary)

### 4.2 Font Sizing & Hierarchy

| Type Scale | Font Size (pt) | Line Height (pt) | Font Weight | Usage |
|:-----------|:---------------|:-----------------|:------------|:------|
| **Display** | 34 | 41 | Bold | Large titles, hero sections. |
| **Title 1** | 28 | 34 | Bold | Screen titles. |
| **Title 2** | 22 | 28 | Semibold | Section headings. |
| **Headline** | 17 | 22 | Semibold | Card titles, important labels. |
| **Body** | 17 | 22 | Regular | Main content text. |
| **Callout** | 16 | 21 | Regular | Secondary information, captions. |
| **Subhead** | 15 | 20 | Regular | Subheadings, smaller labels. |
| **Footnote** | 13 | 18 | Regular | Legal text, footnotes. |
| **Caption** | 12 | 16 | Regular | Smallest text, metadata. |

---

## 5. Iconography

Icons will be clear, minimalist, and consistent in style. SF Symbols will be used for iOS where appropriate, with Material Icons as a fallback for Android and Web, ensuring a unified visual language.

-   **Style:** Outline or filled, consistent stroke weight.
-   **Size:** Standard sizes (e.g., 24pt, 28pt, 32pt) with scalability.
-   **Usage:** Clear visual representation of actions and categories.

---

## 6. Components

All components will be designed to be reusable, accessible, and consistent across the application. They will reflect the banking app aesthetic with clean lines, subtle shadows, and responsive behavior.

### 6.1 Buttons

-   **Primary:** Filled with Primary Blue, white text. Subtle press animation (scale, opacity) and haptic feedback.
-   **Secondary:** Outlined with Primary Blue, blue text. Subtle press animation.
-   **Tertiary:** Text-only, blue text. Subtle press animation.
-   **Destructive:** Filled with Error Red, white text.
-   **States:** Normal, Hover (Web), Pressed, Disabled, Loading.

### 6.2 Input Fields

-   **Style:** Clean, minimalist design with clear labels and placeholder text. Underline or subtle border.
-   **States:** Normal, Focused, Error, Disabled.
-   **Validation:** Real-time feedback for input validation.
-   **RTL:** Text alignment and icon placement adjusted for RTL.

### 6.3 Cards & Surfaces

-   **Style:** Elevated surfaces with rounded corners and subtle shadows (Glassmorphism/Neumorphism light effects).
-   **Usage:** Grouping related content, displaying information.

### 6.4 Navigation (Dock)

-   **Bottom Navigation Bar (Dock):** Inspired by iOS, with a clean, translucent background (Glassmorphism effect) and prominent icons.
-   **Scrollable Icons:** If the number of navigation items exceeds available space, the dock will support horizontal scrolling for additional icons.
-   **Active State:** Distinct visual indicator for the active tab/icon.

### 6.5 Modals & Bottom Sheets

-   **Style:** Full-screen modals or context-sensitive bottom sheets with rounded corners and subtle background blur.
-   **Animations:** Smooth entry and exit animations.

---

## 7. Layout & Grid System

-   **Grid:** A flexible 8pt grid system will be used for consistent spacing and alignment.
-   **Margins & Paddings:** Consistent use of margins and paddings to create visual hierarchy and readability.
-   **Safe Area:** All content will respect device safe areas (notches, home indicators).
-   **RTL Layout:** All layouts will be designed and implemented with full RTL support, ensuring correct alignment of text, icons, and components.

---

## 8. Animations & Micro-interactions

Animations will be subtle, purposeful, and contribute to a fluid user experience, adhering to iOS 26 Class standards.

-   **Transitions:** Smooth transitions between screens and states (e.g., fade, slide, scale).
-   **Haptic Feedback:** Strategic use of haptic feedback for key interactions (e.g., button presses, success/error states).
-   **Loading States:** Elegant loading indicators and skeleton screens.
-   **Error States:** Clear and visually distinct error messages and states.

---

## 9. Accessibility

-   **Color Contrast:** Ensuring sufficient color contrast for all text and interactive elements (WCAG AA compliance).
-   **Touch Targets:** Minimum touch target size of 44x44pt.
-   **Dynamic Type:** Support for dynamic type sizing for users with visual impairments.
-   **Screen Reader Support:** Proper labeling and semantic structure for screen readers.

---

## 10. 3D Dental View Design

-   **Interactive Model:** A high-fidelity 3D model of the human dentition.
-   **Touch & Stylus Support:** Intuitive interaction for rotation, zoom, and selection of individual teeth.
-   **Annotation Tools:** Ability to add notes, highlight areas, and mark treatment plans directly on the 3D model.
-   **Layering:** Option to toggle different layers (e.g., bone, nerves, existing restorations).

---

## 11. References

-   [MASTER_SPECIFICATION.md]
-   [BANKING_DESIGN_RESEARCH.md]
-   [COMPETITOR_AUDIT.md]
-   Apple Human Interface Guidelines (HIG)
-   Material Design 3 Guidelines
-   Qbank Mobile Application
-   Bank Mehr Mobile Application
