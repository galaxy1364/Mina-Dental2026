# MinaDent Design System & Interface Specification

## Overview
MinaDent is a professional dental management application inspired by the design language and technical standards of leading Iranian neobanks (Blubank, Vypod, Tobank, Abank). The app prioritizes security, performance, and a seamless user experience with full RTL (Right-to-Left) support and Jalali calendar integration.

---

## 1. Design Language & Visual Standards

### 1.1 Color Palette (Primary)
- **Primary Accent:** `#0066CC` (Professional Blue) - Used for CTAs, highlights, and key interactions
- **Secondary Accent:** `#00A86B` (Success Green) - Used for confirmations and positive states
- **Background (Light):** `#FFFFFF` (Pure White) - Main screen background
- **Background (Dark):** `#0F1419` (Deep Navy) - Dark mode background
- **Surface (Light):** `#F5F7FA` (Light Gray) - Card and elevated surfaces
- **Surface (Dark):** `#1A1F28` (Dark Gray) - Dark mode surfaces
- **Text Primary (Light):** `#1A1F28` (Near Black) - Main text
- **Text Primary (Dark):** `#FFFFFF` (White) - Dark mode text
- **Text Secondary (Light):** `#6B7280` (Medium Gray) - Secondary text
- **Text Secondary (Dark):** `#D1D5DB` (Light Gray) - Dark mode secondary text
- **Border (Light):** `#E5E7EB` (Very Light Gray) - Borders and dividers
- **Border (Dark):** `#374151` (Dark Gray) - Dark mode borders
- **Error:** `#DC2626` (Red) - Error states
- **Warning:** `#F59E0B` (Amber) - Warning states

### 1.2 Typography
- **Font Family (Persian):** Vazirmatn (Primary), IRANSans (Fallback)
- **Font Family (English):** Inter (for numbers and English text)
- **Heading 1 (H1):** 32px, Bold (700), Line Height 1.2
- **Heading 2 (H2):** 24px, Bold (700), Line Height 1.3
- **Heading 3 (H3):** 20px, Semi-Bold (600), Line Height 1.4
- **Body Large:** 16px, Regular (400), Line Height 1.5
- **Body Regular:** 14px, Regular (400), Line Height 1.5
- **Body Small:** 12px, Regular (400), Line Height 1.4
- **Caption:** 11px, Regular (400), Line Height 1.3

### 1.3 Layout & Spacing
- **Safe Area Padding:** 16px (left/right), 12px (top/bottom)
- **Card Padding:** 16px
- **Element Spacing:** 8px (tight), 12px (normal), 16px (loose), 24px (section)
- **Border Radius:** 8px (small), 12px (medium), 16px (large), 24px (buttons)
- **Elevation/Shadow:** Subtle shadow (0 2px 8px rgba(0,0,0,0.08)) for cards

### 1.4 RTL (Right-to-Left) Implementation
- **Text Alignment:** All text flows right-to-left in Persian
- **Component Mirroring:** Navigation, buttons, and icons are mirrored appropriately
- **Flexbox Direction:** `flex-direction: row-reverse` for horizontal layouts
- **Margin/Padding:** Right-side spacing for RTL (e.g., `marginRight` instead of `marginLeft`)
- **Icons:** Directional icons (arrows, chevrons) are flipped for RTL

### 1.5 Micro-Interactions & Animations
- **Press Feedback:** Scale 0.97 + opacity 0.9 on button press
- **Transition Duration:** 200-300ms for all animations
- **Haptic Feedback:** Light haptic on button tap, medium on toggle, success/error notifications
- **Bottom Sheet Animation:** Slide up from bottom with ease-out timing (300ms)
- **List Item Feedback:** Opacity 0.7 on press

---

## 2. Screen Architecture & Navigation

### 2.1 Navigation Structure
```
Root
├── Auth Stack (Unauthenticated)
│   ├── Login Screen
│   ├── Register Screen
│   └── Forgot Password Screen
├── Main Stack (Authenticated)
│   ├── Dashboard (Home)
│   ├── Patients (Patient Master)
│   ├── Scheduling (Appointments)
│   ├── Payments (Financial)
│   ├── Inventory (Stock Management)
│   ├── Settings
│   └── Profile
└── Modals
    ├── Patient Detail
    ├── Appointment Detail
    ├── Payment Detail
    └── Settings Sheets
```

### 2.2 Tab Bar Navigation (Main Stack)
- **Position:** Bottom of screen
- **Tabs:** 5 primary actions
  1. **Dashboard** (Home Icon) - Overview and quick actions
  2. **Patients** (People Icon) - Patient list and management
  3. **Appointments** (Calendar Icon) - Scheduling and calendar
  4. **Payments** (Wallet Icon) - Financial transactions
  5. **More** (Menu Icon) - Additional options and settings
- **Active State:** Color changes to primary accent, label visible
- **Inactive State:** Muted gray color, label visible

---

## 3. Screen Specifications

### 3.1 Authentication Screens

#### Login Screen
- **Header:** App logo + "MinaDent" title
- **Fields:** Phone number (with country code), Password
- **CTA:** "ورود" (Login) button (full width, primary color)
- **Secondary Actions:** "ثبت‌نام" (Register), "فراموشی رمز" (Forgot Password)
- **Biometric Option:** "ورود با اثرانگشت" (Fingerprint Login) if available
- **Session Persistence:** Remember device toggle (optional)

#### Register Screen
- **Header:** Back button + "ثبت‌نام" (Register) title
- **Fields:** Full name, Phone number, Email, Password, Confirm password
- **Validation:** Real-time feedback for each field
- **CTA:** "ثبت‌نام" (Register) button
- **Terms:** Checkbox for terms and conditions

#### Forgot Password Screen
- **Header:** Back button + "بازیابی رمز" (Recover Password) title
- **Field:** Phone number
- **Verification:** OTP verification flow
- **Reset:** New password entry and confirmation

### 3.2 Dashboard Screen (Home)
- **Header:** Greeting + Date (Jalali calendar format)
- **Quick Stats:** Cards showing:
  - Total patients
  - Appointments today
  - Pending payments
  - Inventory alerts
- **Quick Actions:** Bottom sheet with:
  - Add new patient
  - Schedule appointment
  - Record payment
  - View reports
- **Recent Activity:** List of recent transactions/appointments
- **Navigation:** Tab bar at bottom

### 3.3 Patients Screen (Patient Master)
- **Header:** "بیماران" (Patients) + Search bar
- **List:** Patient cards with:
  - Patient name
  - Phone number
  - Last visit date
  - Next appointment (if scheduled)
  - Quick action buttons (call, message, edit)
- **Floating Action Button (FAB):** "+" button to add new patient
- **Filters:** By status (active, inactive), by appointment date
- **Search:** Real-time search by name, phone, ID

#### Patient Detail Screen
- **Header:** Back button + Patient name
- **Sections:**
  - Personal info (name, phone, email, address)
  - Medical history (allergies, conditions)
  - Appointment history (list of past appointments)
  - Treatment notes (clinical notes)
  - Contact preferences
- **Actions:** Edit, Delete, Schedule appointment, Send message
- **Bottom Sheet:** Edit patient details or add notes

### 3.4 Scheduling Screen (Appointments)
- **Header:** "نوبت‌ها" (Appointments) + Month/Year selector
- **Calendar View:** Jalali calendar with:
  - Highlighted dates with appointments
  - Color coding by appointment type/status
  - Swipe to navigate months
- **Appointment List:** Below calendar showing:
  - Time
  - Patient name
  - Appointment type
  - Status (confirmed, pending, completed)
- **Floating Action Button:** "+" to add new appointment
- **Filters:** By status, by patient, by appointment type

#### Appointment Detail Screen
- **Header:** Back button + Appointment date/time
- **Sections:**
  - Patient details
  - Appointment type and duration
  - Notes and treatment plan
  - Reminders (SMS/notification status)
- **Actions:** Edit, Cancel, Complete, Send reminder
- **Bottom Sheet:** Reschedule or add notes

### 3.5 Payments Screen (Financial)
- **Header:** "پرداخت‌ها" (Payments) + Balance summary
- **Summary Cards:**
  - Total revenue (today, this month, this year)
  - Pending payments
  - Overdue payments
- **Transaction List:**
  - Date (Jalali)
  - Patient name
  - Amount
  - Payment method (cash, card, check)
  - Status (completed, pending, failed)
- **Filters:** By date range, by status, by payment method
- **Floating Action Button:** "+" to record new payment

#### Payment Detail Screen
- **Header:** Back button + Transaction details
- **Sections:**
  - Patient details
  - Amount and payment method
  - Date and time
  - Invoice/receipt
  - Notes
- **Actions:** Print receipt, Send receipt, Edit, Delete

### 3.6 Settings Screen
- **Header:** "تنظیمات" (Settings)
- **Sections:**
  - **Account:** Profile, Change password, Logout
  - **Preferences:** Language, Theme (light/dark), Notifications
  - **Clinic:** Clinic name, Address, Phone, Hours
  - **Data:** Backup, Restore, Export
  - **About:** Version, Help, Terms, Privacy

---

## 4. Component Library

### 4.1 Common Components
- **Button:** Primary, Secondary, Tertiary, Danger (with loading state)
- **Input Field:** Text, Phone, Email, Password (with validation feedback)
- **Card:** Elevated, Outlined, Filled (with optional action buttons)
- **List Item:** Simple, with avatar, with action buttons
- **Bottom Sheet:** Modal drawer from bottom (for forms, menus, details)
- **Dialog:** Modal overlay for confirmations
- **Chip:** Tag-like component for filters and labels
- **Badge:** Status indicator (e.g., "Pending", "Confirmed")
- **Divider:** Horizontal line separator
- **Avatar:** User/patient profile picture placeholder
- **Icon Button:** Icon-only button with press feedback
- **Checkbox:** Toggle for boolean options
- **Radio Button:** Single selection from multiple options
- **Toggle Switch:** On/off switch
- **Slider:** Range selector for dates, amounts
- **Date Picker:** Jalali calendar picker
- **Time Picker:** Hour and minute selector
- **Dropdown:** Select from predefined options

### 4.2 Specialized Components
- **Patient Card:** Displays patient info with quick actions
- **Appointment Card:** Shows appointment details with status
- **Transaction Card:** Displays payment information
- **Calendar View:** Jalali calendar with event indicators
- **Chart:** Bar/line chart for statistics (revenue, appointments)
- **Notification Badge:** Red badge with count (e.g., on tab icons)

---

## 5. Offline-First & Sync Architecture

### 5.1 Local Storage (SQLite)
- **Patient Data:** Full patient records stored locally
- **Appointments:** Appointment schedule cached locally
- **Payments:** Transaction history cached locally
- **Settings:** User preferences and clinic info
- **Sync Status:** Flag to track which records need sync

### 5.2 Sync Strategy
- **On App Launch:** Check for network, sync pending changes
- **On Network Change:** Detect network restoration, trigger sync
- **Periodic Sync:** Background sync every 15 minutes (if online)
- **Conflict Resolution:** Server-side timestamp wins, local changes preserved
- **Offline Indicator:** Banner at top showing sync status

### 5.3 Biometric Security
- **Face ID / Fingerprint:** Required for app unlock and sensitive actions
- **Session Timeout:** 15 minutes of inactivity triggers re-authentication
- **Secure Storage:** Sensitive data encrypted using device keychain

---

## 6. Accessibility & Localization

### 6.1 Accessibility
- **Text Contrast:** WCAG AA compliance (4.5:1 for body text)
- **Touch Targets:** Minimum 44x44 points for interactive elements
- **Screen Reader:** Full VoiceOver/TalkBack support
- **Keyboard Navigation:** Full keyboard support for web

### 6.2 Localization
- **Language:** Persian (Farsi) as primary, English as fallback
- **Date Format:** Jalali (Solar Hijri) calendar
- **Number Format:** Persian numerals with proper formatting
- **Currency:** Iranian Rial (IRR) with proper formatting
- **RTL:** Full right-to-left layout support

---

## 7. Performance & Quality Standards

### 7.1 Performance Targets
- **App Launch:** < 2 seconds
- **Screen Transition:** < 300ms
- **List Rendering:** 60 FPS (FlashList for large lists)
- **Data Sync:** < 5 seconds for typical sync
- **API Response:** < 1 second for typical requests

### 7.2 Offline Capabilities
- **Viewing:** All cached data accessible offline
- **Creating:** New records can be created offline (queued for sync)
- **Editing:** Existing records can be edited offline (queued for sync)
- **Sync Indicator:** Clear indication of sync status and pending changes

### 7.3 Security Standards
- **Authentication:** Secure token-based auth with refresh tokens
- **Data Encryption:** All sensitive data encrypted at rest and in transit
- **Session Management:** Automatic logout after 15 minutes of inactivity
- **Biometric:** FaceID/Fingerprint for app unlock
- **Network:** HTTPS only, certificate pinning for API

---

## 8. Technical Implementation Details

### 8.1 Tech Stack
- **Framework:** React Native (Expo SDK 54)
- **Language:** TypeScript
- **State Management:** React Context + Zustand
- **Local Storage:** SQLite (via expo-sqlite)
- **Remote Storage:** Supabase PostgreSQL
- **API:** tRPC for type-safe API calls
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Fonts:** Vazirmatn (Persian), Inter (English)
- **Calendar:** jalaali-js for Jalali date handling
- **Authentication:** JWT tokens with refresh mechanism
- **Sync Engine:** Custom sync queue with conflict resolution

### 8.2 Database Schema (High-Level)
- **Users:** id, phone, email, password_hash, clinic_id, created_at
- **Patients:** id, clinic_id, name, phone, email, address, allergies, created_at
- **Appointments:** id, clinic_id, patient_id, date, time, type, status, notes, created_at
- **Payments:** id, clinic_id, patient_id, amount, method, status, date, created_at
- **Inventory:** id, clinic_id, item_name, quantity, unit_cost, created_at
- **SyncQueue:** id, table_name, record_id, action, data, status, created_at

### 8.3 API Endpoints (tRPC Routers)
- **auth:** login, register, logout, refresh, verify-biometric
- **patients:** list, get, create, update, delete, search
- **appointments:** list, get, create, update, delete, get-by-date
- **payments:** list, get, create, update, delete, get-summary
- **inventory:** list, get, create, update, delete
- **sync:** get-pending, mark-synced, resolve-conflict

---

## 9. Branding & Logo

### 9.1 App Name & Slug
- **Display Name:** MinaDent
- **App Slug:** minadent-mobile
- **Bundle ID:** space.manus.minadent.mobile

### 9.2 Logo & Icons
- **App Icon:** Professional dental-themed icon (to be generated)
- **Splash Icon:** Same as app icon with app name
- **Tab Icons:** Custom icons for each tab (Dashboard, Patients, Appointments, Payments, More)
- **Status Bar:** Dark text on light background (or light on dark)

---

## 10. Development Phases

### Phase 1: Authentication & Foundation
- Login/Register screens
- Session management
- Biometric authentication
- Theme system (light/dark)
- RTL support

### Phase 2: Patient Master
- Patient list and search
- Patient detail and editing
- Local SQLite storage
- Sync to Supabase

### Phase 3: Scheduling
- Jalali calendar integration
- Appointment creation/editing
- Appointment list and filtering
- Appointment reminders

### Phase 4: Payments & Inventory
- Payment recording and history
- Inventory management
- Reports and analytics
- Notifications

### Phase 5: Polish & Deployment
- Performance optimization
- Bug fixes and testing
- App store submission
- Continuous deployment

---

## 11. Quality Assurance Checklist

- [ ] All screens render correctly in light and dark modes
- [ ] RTL layout is correct on all screens
- [ ] All buttons and links are functional
- [ ] Offline functionality works as expected
- [ ] Sync mechanism handles conflicts correctly
- [ ] Biometric authentication works on iOS and Android
- [ ] Jalali calendar displays correctly
- [ ] Persian fonts render properly
- [ ] Performance targets are met
- [ ] No console errors or warnings
- [ ] Accessibility standards are met
- [ ] Security standards are implemented

---

## References
- Iranian Neobank Design Standards (Blubank, Vypod, Tobank, Abank)
- Apple Human Interface Guidelines (HIG)
- Material Design 3 (for component inspiration)
- WCAG 2.1 Accessibility Guidelines
- Jalali Calendar Documentation
