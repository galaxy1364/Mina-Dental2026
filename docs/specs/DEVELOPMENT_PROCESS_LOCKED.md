# MinaDent Application: Development Process (LOCKED)

**Status:** LOCKED  
**Version:** 1.1  
**Date:** 2026-06-19  
**Author:** Manus AI  
**Authority:** User Directives, MASTER_SPECIFICATION.md

---

## 1. CORE PRINCIPLES (LOCKED)

1.  **Phased, Sequential Development:** Each development step must be 100% complete, thoroughly tested, and explicitly approved by the user before proceeding to the next. No skipping phases or steps.
2.  **Evidence-Based, Auditable, Testable, Documented, Production-Oriented:** Every deliverable must meet these criteria.
3.  **No Deviation, No Shortcuts, No Exceptions:** The defined process is immutable. Any conflict or ambiguity will be immediately reported for clarification.
4.  **User-Centric Validation:** User approval is mandatory at key milestones, especially after each phase completion.
5.  **Global Best Practices:** Adherence to world-class software engineering standards throughout the lifecycle.

---

## 2. DEVELOPMENT PHASES & STEPS

### Phase 1: Analysis & Design

-   **Step 1.1: Requirements Gathering & Competitor Audit**
    *   **Description:** Comprehensive collection of all user requirements (functional, non-functional, UI/UX, security, performance). Deep dive into competitor analysis (MinaDent شرکتی بازار, برنامه لبخند) to identify best practices and areas for differentiation.
    *   **Deliverables:** `MASTER_SPECIFICATION.md`, `COMPETITOR_AUDIT.md`.
    *   **Approval Gate:** User review and explicit approval of all specifications and audit findings.

-   **Step 1.2: Architecture & Infrastructure Design**
    *   **Description:** Detailed design of the system architecture, including frontend (mobile, web/PWA), backend (microservices), database (PostgreSQL/Supabase, SQLite), security mechanisms, offline-first strategy, and technology stack. This step defines the foundational technical blueprint.
    *   **Deliverables:** `ARCHITECTURE_BLUEPRINT.md`, updated `MASTER_SPECIFICATION.md`.
    *   **Approval Gate:** User review and explicit approval of the architectural blueprint.

-   **Step 1.3: UI/UX Design (Wireframes, Mockups, Theme, RTL, Animations)**
    *   **Description:** Creation of detailed UI/UX designs based on the architectural blueprint and banking app aesthetics (Qbank, Bank Mehr). This includes wireframes, high-fidelity mockups, definition of color palettes, typography, RTL layouts, and animation specifications.
    *   **Deliverables:** `DESIGN_SYSTEM.md`, `UI_MOCKUPS.md` (or visual assets).
    *   **Approval Gate:** User review and explicit approval of the complete UI/UX design.

-   **Step 1.4: Test Plan Development**
    *   **Description:** Formulation of a comprehensive test plan covering unit, integration, end-to-end, performance, security, and UI/UX testing strategies for all platforms.
    *   **Deliverables:** `TEST_PLAN.md`.
    *   **Approval Gate:** User review and explicit approval of the test plan.

### Phase 2: Setup & Infrastructure

-   **Step 2.1: Multi-Platform Project Initialization (Expo/React Native, Next.js)**
    *   **Description:** Setting up the core multi-platform project structure, including Expo/React Native for mobile and Next.js for web/PWA. Configuration of development environments and version control.
    *   **Deliverables:** Initialized project codebase, `README.md` for setup.
    *   **Approval Gate:** Verification of project setup and successful initial build.

-   **Step 2.2: Supabase Setup (PostgreSQL, RLS, Initial Schema)**
    *   **Description:** Provisioning and configuring the Supabase project, including PostgreSQL database setup, initial schema definition, and implementation of Row-Level Security (RLS) policies.
    *   **Deliverables:** Supabase project configured, initial database schema scripts.
    *   **Approval Gate:** Verification of Supabase setup and RLS functionality.

-   **Step 2.3: Offline-First Infrastructure (SQLite, Sync, Local Backup)**
    *   **Description:** Implementing the local SQLite database, designing its schema, and developing the core synchronization engine for seamless offline operation, cloud backup, and local data persistence.
    *   **Deliverables:** Local database integration, sync engine codebase.
    *   **Approval Gate:** Demonstration of basic offline data storage and synchronization.

-   **Step 2.4: Theme System & RTL Implementation**
    *   **Description:** Full implementation of the defined theme system (color palettes, typography, light/dark mode) and comprehensive RTL support across all UI components.
    *   **Deliverables:** Themed application with full RTL support.
    *   **Approval Gate:** User review and explicit approval of theme and RTL implementation.

### Phase 3: Authentication & User Management

-   **Step 3.1: Authentication Implementation (Login, OTP, Password, Biometric)**
    *   **Description:** Developing the complete authentication flow, including user registration, login with mobile number/OTP/password, and biometric authentication (Face ID/Fingerprint).
    *   **Deliverables:** Functional authentication module.
    *   **Approval Gate:** User testing and approval of authentication flows.

-   **Step 3.2: Session Management**
    *   **Description:** Implementing secure session management using JWTs, refresh tokens, and automatic logout mechanisms.
    *   **Deliverables:** Secure session management in place.
    *   **Approval Gate:** Verification of session security and persistence.

-   **Step 3.3: Role-Based Access Control (RBAC) & User Management Panel**
    *   **Description:** Developing a robust RBAC system and an administrative panel for managing users (doctors, secretaries, assistants) and their permissions.
    *   **Deliverables:** Functional RBAC and user management UI.
    *   **Approval Gate:** User review and approval of RBAC and user management.

### Phase 4: Patient Management & CRM

-   **Step 4.1: Patient Master Implementation (Comprehensive Patient Files)**
    *   **Description:** Building the core patient management module, including comprehensive patient profiles, medical history, and customizable dental charts.
    *   **Deliverables:** Functional patient master module.
    *   **Approval Gate:** User review and approval of patient management features.

-   **Step 4.2: 3D Dental View Implementation**
    *   **Description:** Integrating and developing the interactive 3D dental view with touch and stylus support.
    *   **Deliverables:** Functional 3D dental view.
    *   **Approval Gate:** User review and approval of 3D dental view.

-   **Step 4.3: Advanced CRM Features**
    *   **Description:** Implementing advanced CRM functionalities for patient engagement, communication, and loyalty programs.
    *   **Deliverables:** Functional CRM module.
    *   **Approval Gate:** User review and approval of CRM features.

### Phase 5: Scheduling & Timeline

-   **Step 5.1: Advanced Scheduling System (Jalali Calendar, Resource Management)**
    *   **Description:** Developing the sophisticated appointment scheduling system with full Jalali calendar integration and resource management capabilities.
    *   **Deliverables:** Functional scheduling system.
    *   **Approval Gate:** User review and approval of scheduling features.

-   **Step 5.2: Real-time Interactive Timeline**
    *   **Description:** Implementing a dynamic, real-time interactive timeline to track all patient and clinic events.
    *   **Deliverables:** Functional timeline view.
    *   **Approval Gate:** User review and approval of timeline features.

### Phase 6: Lab, Implant & Financial

-   **Step 6.1: Laboratory Management (Fixed & Mobile Lab)**
    *   **Description:** Developing modules for managing fixed and mobile laboratory orders and tracking.
    *   **Deliverables:** Functional laboratory management module.
    *   **Approval Gate:** User review and approval of lab management features.

-   **Step 6.2: Implant & Inventory Management (Iranian Databases)**
    *   **Description:** Implementing detailed management for implants and inventory, integrated with Iranian product databases.
    *   **Deliverables:** Functional implant and inventory modules.
    *   **Approval Gate:** User review and approval of implant and inventory features.

-   **Step 6.3: Financial Management (Payments, Invoicing, OCR Receipt)**
    *   **Description:** Developing the financial management system, including payment processing, invoicing, reporting, and OCR for receipts.
    *   **Deliverables:** Functional financial management module.
    *   **Approval Gate:** User review and approval of financial features.

### Phase 7: AI & Notifications

-   **Step 7.1: AI Assistant Implementation (Mona)**
    *   **Description:** Integrating and developing the AI-powered virtual assistant (Mona) and other AI functionalities.
    *   **Deliverables:** Functional AI assistant.
    *   **Approval Gate:** User review and approval of AI features.

-   **Step 7.2: Advanced Notification System**
    *   **Description:** Implementing a comprehensive notification system for managers, doctors, and staff.
    *   **Deliverables:** Functional notification system.
    *   **Approval Gate:** User review and approval of notification features.

### Phase 8: Testing, Optimization & Deployment

-   **Step 8.1: Comprehensive Testing (Security, Performance, UI/UX, E2E)**
    *   **Description:** Conducting thorough testing across all aspects of the application to ensure quality, security, and performance.
    *   **Deliverables:** Test reports, bug fixes.
    *   **Approval Gate:** User review and approval of test results.

-   **Step 8.2: Performance Optimization**
    *   **Description:** Optimizing application performance, including startup time, rendering, and resource usage.
    *   **Deliverables:** Performance reports, optimized codebase.
    *   **Approval Gate:** User review and approval of performance metrics.

-   **Step 8.3: Deployment Preparation (App Store, Google Play, PWA)**
    *   **Description:** Preparing the application for deployment to various platforms, including app store listings and build processes.
    *   **Deliverables:** Deployment artifacts, app store assets.
    *   **Approval Gate:** User review and approval of deployment readiness.

---

## 3. APPROVAL & GOVERNANCE

-   **Explicit Approval:** Progression to the next step or phase is strictly contingent upon explicit user approval.
-   **Documentation:** All decisions, approvals, and changes will be meticulously documented.
-   **No Guessing:** In case of ambiguity or missing information, clarification will be sought from the user.
-   **Locked Specifications:** The `MASTER_SPECIFICATION.md` and this `DEVELOPMENT_PROCESS_LOCKED.md` are immutable once approved. Any proposed changes will require a formal review and update process.
