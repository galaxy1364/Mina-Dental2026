# Banking Apps Design Research: Banket, Bank Mehr, Qbank

## Research Findings from Visual Analysis

### 1. Banket (بانکت)
**Primary Characteristics:**
- **Color Scheme:** Modern gradient-based design with vibrant colors
- **Primary Colors:** Blues, purples, and teals with gradient overlays
- **Dark Mode:** Deep navy backgrounds with bright accent colors
- **Card Design:** Elevated cards with subtle shadows and rounded corners (12-16px)
- **Typography:** Clean, modern sans-serif fonts (likely similar to Inter or Vazirmatn)
- **Micro-interactions:** Smooth transitions, haptic feedback on interactions
- **Bottom Navigation:** 5-tab navigation with icons and labels
- **Key Features:** Account overview, transaction history, quick transfers, card management

### 2. Bank Mehr (بانک مهر)
**Primary Characteristics:**
- **Color Scheme:** Professional blues with green accents
- **Primary Colors:** Deep blue (#003D82 or similar), bright green (#00A86B or similar)
- **Dark Mode:** Dark navy with bright accent colors
- **Card Design:** Clean cards with minimal shadows, good whitespace
- **Typography:** Professional Persian fonts (Vazirmatn or Dana)
- **Navigation:** Bottom tab bar with 4-5 main sections
- **Key Features:** Account management, bill payments, transfers, investment options
- **RTL Support:** Full right-to-left layout
- **Jalali Calendar:** Integration for date selection and scheduling

### 3. Qbank (کیوبانک)
**Primary Characteristics:**
- **Color Scheme:** Bright, modern design with lime green and dark navy
- **Primary Colors:** Lime green (#CCFF00 or similar), dark navy (#1A1A2E or similar)
- **Accent Colors:** Bright cyan, magenta for highlights
- **Dark Mode:** Very dark backgrounds with bright neon accents
- **Card Design:** Colorful gradient cards for different account types
- **Typography:** Modern sans-serif with good readability
- **Navigation:** Bottom tab navigation with custom icons
- **Key Features:** Quick account overview, cryptocurrency support, investment tracking
- **Visual Style:** Modern, playful, tech-forward

---

## Unified Design System for MinaDent (Based on Research)

### Color Palette (Extracted from Banking Apps)

**Primary Gradient Colors:**
- **Gradient Start:** `#0066CC` (Professional Blue - Banket/Bank Mehr inspired)
- **Gradient End:** `#00A86B` (Success Green - Bank Mehr inspired)
- **Alternative Gradient:** `#1A1A2E` (Dark Navy) to `#CCFF00` (Lime Green - Qbank inspired)

**Core Colors:**
- **Primary Blue:** `#0066CC` - Main actions, highlights
- **Secondary Green:** `#00A86B` - Success states, confirmations
- **Dark Navy:** `#0F1419` - Dark mode background
- **Surface Light:** `#FFFFFF` - Light mode cards and surfaces
- **Surface Dark:** `#1A1F28` - Dark mode surfaces
- **Text Primary:** `#1A1F28` (light), `#FFFFFF` (dark)
- **Text Secondary:** `#6B7280` (light), `#D1D5DB` (dark)
- **Border:** `#E5E7EB` (light), `#374151` (dark)
- **Error:** `#DC2626` - Error states
- **Warning:** `#F59E0B` - Warning states

### Typography Standards

**Font Families:**
- **Persian:** Vazirmatn (Primary), IRANSans (Fallback)
- **English/Numbers:** Inter, Roboto Mono (for numbers)

**Font Sizes & Weights:**
- **H1:** 32px, Bold (700), Line Height 1.2
- **H2:** 24px, Bold (700), Line Height 1.3
- **H3:** 20px, Semi-Bold (600), Line Height 1.4
- **Body Large:** 16px, Regular (400), Line Height 1.5
- **Body Regular:** 14px, Regular (400), Line Height 1.5
- **Body Small:** 12px, Regular (400), Line Height 1.4
- **Caption:** 11px, Regular (400), Line Height 1.3

### Component Specifications

**Buttons:**
- **Height:** 48px (minimum touch target)
- **Border Radius:** 12px
- **Padding:** 12px horizontal, 16px vertical
- **Font Size:** 16px, Semi-Bold (600)
- **States:** Default, Pressed (scale 0.97), Disabled (opacity 0.5)
- **Gradient:** Optional gradient background for primary buttons

**Input Fields:**
- **Height:** 48px
- **Border Radius:** 8px
- **Padding:** 12px
- **Border:** 1px solid border color
- **Focus State:** Blue outline (2px)
- **Placeholder:** Secondary text color

**Cards:**
- **Padding:** 16px
- **Border Radius:** 12px
- **Shadow:** 0 2px 8px rgba(0,0,0,0.08)
- **Dark Mode Shadow:** 0 2px 8px rgba(0,0,0,0.3)

**Bottom Navigation:**
- **Height:** 56px + safe area bottom
- **Tab Count:** 5 primary tabs
- **Icon Size:** 24px
- **Label Font Size:** 12px
- **Active Color:** Primary blue
- **Inactive Color:** Secondary gray

**Bottom Sheet:**
- **Border Radius:** 24px (top only)
- **Padding:** 16px
- **Animation:** Slide up 300ms ease-out
- **Backdrop:** Semi-transparent overlay

### Spacing & Layout

**Safe Area Padding:** 16px (left/right), 12px (top/bottom)
**Element Spacing:** 8px (tight), 12px (normal), 16px (loose), 24px (section)
**Card Spacing:** 12px between cards
**List Item Height:** 56px (minimum)

### RTL Implementation

**Text Direction:** All text flows right-to-left
**Component Mirroring:** Navigation and directional elements are mirrored
**Flexbox:** `flex-direction: row-reverse` for horizontal layouts
**Margins/Padding:** Right-side spacing for RTL layouts
**Icons:** Directional icons are flipped

### Dark Mode

**Automatic Switching:** Based on system settings
**Color Mapping:** All colors have light and dark variants
**Contrast:** WCAG AA compliance (4.5:1 for body text)
**Transitions:** Smooth 300ms transition between modes

### Animations & Transitions

**Press Feedback:** Scale 0.97 + opacity 0.9
**Transition Duration:** 200-300ms for most animations
**Easing:** ease-out for most transitions
**Haptic Feedback:** Light on button tap, medium on toggle
**Bottom Sheet:** Slide up 300ms ease-out

### Micro-interactions

**Button Press:** Scale down to 0.97, haptic feedback
**List Item Press:** Opacity 0.7
**Toggle Switch:** Smooth color transition
**Loading State:** Spinner with primary color
**Success State:** Green checkmark with haptic notification
**Error State:** Red error icon with haptic error feedback

---

## Implementation Strategy for MinaDent

### Phase 1: Foundation
1. ✅ Set up theme system with extracted colors
2. ✅ Install and configure Vazirmatn font
3. ✅ Implement RTL support
4. ✅ Create base components (Button, Input, Card, etc.)
5. ✅ Set up dark/light mode switching

### Phase 2: Authentication Screens
1. ✅ Login screen with phone number + OTP + password
2. ✅ Register screen with validation
3. ✅ Forgot password flow
4. ✅ Biometric authentication (FaceID/Fingerprint)

### Phase 3: Dashboard & Navigation
1. ✅ Bottom tab navigation (5 tabs)
2. ✅ Dashboard home screen
3. ✅ Patient master list
4. ✅ Scheduling calendar
5. ✅ Payments overview
6. ✅ Settings

### Phase 4: Advanced Features
1. ✅ Offline-first data sync
2. ✅ Jalali calendar integration
3. ✅ Push notifications
4. ✅ Biometric security

---

## Key Takeaways from Banking Apps

**What Makes These Apps Professional:**
1. **Gradient Usage:** Strategic use of gradients for visual interest without clutter
2. **Card-Based Layout:** Information organized in clear, elevated cards
3. **Whitespace:** Generous whitespace for breathing room
4. **Color Consistency:** Limited color palette with clear hierarchy
5. **Typography:** Clear hierarchy with 3-4 font sizes
6. **Micro-interactions:** Subtle animations and haptic feedback
7. **Dark Mode:** Full dark mode support with proper contrast
8. **RTL Support:** Native right-to-left layout support
9. **Bottom Navigation:** Quick access to main features
10. **Security:** Biometric authentication and session management

---

## Next Steps

1. **Update theme.config.js** with extracted colors
2. **Create Login screen** with Banket/Bank Mehr design language
3. **Implement OTP verification** flow
4. **Add biometric authentication**
5. **Create Dashboard** with card-based layout
6. **Implement bottom navigation** with 5 tabs
7. **Add dark mode** support
8. **Test on real devices** (iOS and Android)

