# MinaDent Application: Master Specification (LOCKED)

**Status:** LOCKED  
**Version:** 1.1  
**Date:** 2026-06-19  
**Author:** Manus AI  
**Authority:** User Directives, Enterprise Banking Standards (Bank Mehr, Qbank), Global Development Best Practices, Competitor Audit (MinaDent شرکتی بازار, برنامه لبخند)

---

## 1. MISSION & VISION

MinaDent aims to be the world's leading dental practice management application, setting new benchmarks in user experience, technological sophistication, security, and operational efficiency. Inspired by the stringent standards of top-tier Iranian banking applications (Bank Mehr, Qbank) and adhering to the latest global technology trends (e.g., iOS 26 Class), MinaDent will provide a seamless, intelligent, and robust platform for dental professionals and their patients, surpassing existing market solutions like MinaDent شرکتی بازار and برنامه لبخند.

---

## 2. CORE PRINCIPLES (LOCKED)

1.  **Evidence-Based, Auditable, Testable, Documented, Production-Oriented:** Every component, feature, and process must meet these criteria. This aligns with the MINADENT_ENTERPRISE_CONSTITUTION_v2. 
2.  **Global Best Practices:** Adherence to world-class development standards, security protocols (OWASP, ISO 27001, PCI DSS), and UI/UX guidelines (Apple HIG, Material Design 3). The development process will follow the global standard for software engineering, building foundational elements first and then progressively adding features.
3.  **No Deviation, No Shortcuts, No Exceptions:** The defined development process and specifications are immutable. Any conflict or ambiguity will be immediately reported for clarification. All instructions from voice and text will be 100% documented and complied with.
4.  **Phased, Sequential Development:** Each development step must be 100% complete, thoroughly tested, and explicitly approved by the user before proceeding to the next. This includes real-world testing on devices like Expo Go.
5.  **Data Integrity & Security:** Absolute prevention of data loss. All sensitive data must be encrypted at rest and in transit. Robust authentication and authorization mechanisms are paramount. Information will never be lost under any circumstances.
6.  **User-Centric Design:** Intuitive, efficient, and delightful user experience across all platforms, prioritizing one-handed mobile usage and accessibility. The design will be **iOS 26 Class** with advanced animations and interactions, inspired by the best banking applications.

---

## 3. PLATFORM SUPPORT (Multi-Platform)

MinaDent will be a truly multi-platform application, providing a consistent and high-quality experience across various devices and operating systems.

| Platform | Type | Target | Notes |
|:---------|:-----|:-------|:------|
| **iOS** | Native App | iPhone, iPad | IPA build, distributed via Apple App Store. Must adhere to iOS 26 Class standards, including UI/UX, animations, and system integrations. |
| **Android** | Native App | Android Phones, Tablets | APK build, distributed via Google Play Store. Must follow Material Design 3 guidelines while maintaining a consistent brand identity with iOS. |
| **Web** | PWA / Web App | Windows, macOS, Linux (Browsers) | Progressive Web App (PWA) for installability, offline capabilities, and desktop integration. Standard web application for desktop browsers. |
| **Windows** | Desktop App (PWA/Web) | Windows Desktops/Laptops | Accessible via PWA installation or web browser. |

---

## 4. FUNCTIONAL REQUIREMENTS

### 4.1 Core Dental Practice Management

#### 4.1.1 Patient Master (CRM)
-   **Patient List:** Efficient display and search for **200,000+ patients** with high performance (60 FPS scrolling).
-   **Patient Profile:** Comprehensive patient records including personal details, medical history, dental charts, treatment plans, and communication logs. Customizable fields.
-   **3D Dental View:** Interactive 3D representation of patient dentition, allowing for **touch and stylus input** for annotations and treatment planning (similar to MinaDent market app).
-   **Patient Search & Filter:** Advanced global search capabilities by name, phone, ID, and various criteria. Dynamic filtering and sorting.
-   **Communication:** Direct call, SMS, and email integration from patient profile. Automated communication workflows.
-   **CRM Features:** Advanced CRM functionalities for patient engagement, loyalty programs, and personalized communication, surpassing existing solutions.

#### 4.1.2 Scheduling & Appointment Management
-   **Real-time Timeline:** A dynamic, interactive timeline view for appointments, showing all events related to a patient or a specific time slot. **Every event and action must be recorded in the timeline.**
-   **Jalali Calendar Integration:** Full support for the Persian (Jalali) calendar for all scheduling and date-related functionalities, including advanced Razchin calendar features.
-   **Appointment Booking:** Intuitive interface for creating, modifying, and canceling appointments. Support for multiple doctors/chairs. AI-optimized scheduling.
-   **Automated Reminders:** Configurable SMS/push notification reminders for patients and staff.
-   **Conflict Detection:** Prevention of double-booking and resource conflicts.

#### 4.1.3 Financial Management
-   **Payment Recording:** Manual and automated recording of payments (cash, card, check, online transfers).
-   **POS Integration:** Ability to connect to POS devices. If not connected, provide a **scan-from-receipt feature (OCR)** for amount and details, and manual entry.
-   **Invoice & Receipt Generation:** Automated generation and printing/sharing of invoices and receipts.
-   **Financial Reporting:** Overview of revenue, expenses, pending payments, and overdue accounts. Advanced analytics and customizable reports.
-   **Insurance Management:** Tracking of patient insurance details and claims. Automated claim submission.
-   **دفتر معین (General Ledger):** Excluded as per user request.

#### 4.1.4 Inventory Management
-   **Comprehensive Inventory:** Tracking of dental supplies, materials, and equipment.
-   **Iranian Database:** Integration with **real Iranian dental product databases** for implants, brands, and supplies.
-   **Low-Stock Alerts:** Automated notifications for low stock levels.
-   **Usage Tracking:** Link inventory usage to patient treatments.
-   **Supplier Management:** Tracking supplier information and order history.

#### 4.1.5 Laboratory Management
-   **Fixed Lab Integration:** Management of fixed laboratory orders and tracking (e.g., crowns, bridges).
-   **Mobile Lab Integration:** Management of mobile laboratory orders with **cloud-based AI** for dynamic tracking and communication.
-   **Implant Management:** Detailed tracking of implant brands, types, and batches, integrated with **Iranian databases**.
-   **Order Status Tracking:** Real-time updates on lab order progress.

#### 4.1.6 Staff Management
-   **Unlimited Users:** Support for an **unlimited number of doctors, secretaries, and assistants**.
-   **Role-Based Access Control (RBAC):** Granular permissions for each user role.
-   **Activity Log:** Comprehensive logging of all user actions for audit purposes.

### 4.2 Advanced Features

#### 4.2.1 AI Integration
-   **Intelligent Assistant (Mona):** AI-powered virtual assistant for scheduling, patient inquiries, and operational support (mimicking a real secretary), capable of handling unexpected events.
-   **OCR for Receipts:** AI-driven scanning of payment receipts to extract transaction details.
-   **Cloud AI for Mobile Lab:** Dynamic tracking and communication for mobile lab orders.
-   **AI-powered Diagnostics:** (Future consideration, if applicable and approved).

#### 4.2.2 Advanced Notifications
-   **Manager Dashboard Notifications:** Real-time alerts for managers on payments, appointments, and critical events.
-   **Staff Notifications:** Alerts for secretaries and assistants regarding new appointments, patient arrivals, and task assignments.
-   **Patient Notifications:** Appointment reminders, follow-up messages, and promotional offers.
-   **Customizable Alerts:** User-configurable notification preferences.
-   **All actions by staff (e.g., booking an appointment, registering a payment) must trigger a notification for the manager.**

#### 4.2.3 Search & Edit Engine
-   **Global Search:** Powerful search functionality across all modules (patients, appointments, inventory, etc.).
-   **Inline Editing:** Ability to edit critical information directly within lists or detail views.
-   **Theme Customization:** User-changeable themes and customizable accent colors.
-   **Icon Management:** Ability to add and edit essential icons in various places.

---

## 5. NON-FUNCTIONAL REQUIREMENTS

### 5.1 Performance & Scalability
-   **App Launch:** < 2 seconds.
-   **Screen Transition:** < 300ms.
-   **List Rendering:** **60 FPS for lists with 200,000+ items.**
-   **Data Sync:** < 5 seconds for typical sync operations.
-   **API Response:** < 1 second for typical requests.
-   **Scalability:** Designed to handle millions of records and thousands of concurrent users.

### 5.2 Security (Banking Grade)
-   **Authentication:** Multi-Factor Authentication (MFA) with Biometric (FaceID/Fingerprint), OTP, and strong password policies.
-   **Authorization:** Granular Role-Based Access Control (RBAC).
-   **Data Encryption:** AES-256-GCM for data at rest and TLS 1.3 with Certificate Pinning for data in transit.
-   **Secure Storage:** Sensitive data stored in device keychain/keystore.
-   **Session Management:** JWT tokens with short expiration, refresh tokens, automatic logout on inactivity (15 minutes).
-   **Compliance:** OWASP Top 10, OWASP Mobile Top 10, ISO 27001, PCI DSS 3.2.1.
-   **Audit Trails:** Comprehensive logging of all user actions and system events.

### 5.3 Offline-First & Data Synchronization
-   **Offline Access:** Full access to all cached patient data, appointments, and inventory without internet. **More than 200,000 patient records must be available offline.**
-   **Offline Operations:** Ability to create, edit, and delete records offline, with changes queued for synchronization.
-   **Automatic Sync:** Seamless, **automatic cloud backup and local synchronization** when internet is available.
-   **Conflict Resolution:** Server-side timestamp wins for data conflicts, with local changes preserved where possible.
-   **Data Volume:** Support for 200,000+ patient records and associated data offline.

### 5.4 User Experience (UI/UX) - iOS 26 Class & Banking Standards
-   **Design Language:** Inspired by Bank Mehr and Qbank, with a focus on minimalism, clean aesthetics, and modern gradients. **The design should be iOS 26 Class.**
-   **RTL Support:** Full Right-to-Left layout for all UI elements, text, and navigation.
-   **Typography:** High-quality Persian fonts (Vazirmatn, IRANSans) and English fonts (Inter).
-   **Animations & Micro-interactions:** Smooth, subtle, and meaningful animations (iOS 26 Class style) with haptic feedback. **Every section should be colorful and have standard global animations.**
-   **Dock Navigation:** Advanced bottom navigation bar (Dock) with dynamic scrolling for many icons (left/right scroll if icons exceed space).
-   **Theme Customization:** User-changeable themes (light/dark mode) and customizable accent colors.
-   **Accessibility:** WCAG AA compliance, large touch targets, screen reader support.

### 5.5 Maintainability & Extensibility
-   **Modular Architecture:** Microservices backend, clear separation of concerns.
-   **Code Quality:** Strict adherence to coding standards, linting, and code reviews.
-   **Test Coverage:** High unit, integration, and end-to-end test coverage. **Every stage must be tested and performed.**
-   **Documentation:** Comprehensive API, architecture, and user documentation.

---

## 6. TECHNOLOGY STACK (LOCKED)

| Layer | Technology | Rationale | Notes |
|:------|:-----------|:----------|:------|
| **Frontend (Mobile)** | React Native (Expo SDK 54+) | Cross-platform efficiency, native performance via Expo. | Will use native modules for specific iOS/Android features. |
| **Frontend (Web/PWA)** | Next.js / React | Robust framework for PWA and web app. | Leverages React Native codebase for shared components. |
| **Backend** | Microservices (Node.js/TypeScript) | Scalability, resilience, independent deployment. | Express.js, tRPC for type-safe APIs. |
| **Database (Primary)** | PostgreSQL 15+ | ACID compliance, robust, scalable, JSON support. | Multi-master replication, sharding. |
| **Database (Local)** | SQLite (via Expo SQLite) | Offline-first data storage on device. | Data synchronization with PostgreSQL. |
| **Cache** | Redis 7.0+ | High-performance caching, session management. | Sentinel for high availability. |
| **API Gateway** | Nginx / Kong | Centralized API management, security, rate limiting. | WAF integration. |
| **Orchestration** | Kubernetes (K8s) | Container management, auto-scaling, high availability. | Helm for package management. |
| **CI/CD** | GitHub Actions / GitLab CI | Automated testing, building, deployment. | Blue-green/Canary deployments. |
| **Monitoring** | Prometheus / Grafana | Real-time metrics, dashboards, alerting. | ELK Stack for logging. |
| **AI/ML** | Custom Models / Cloud AI | Intelligent assistant, OCR, dynamic lab tracking. | Leveraging Google Cloud AI or similar services. **Truly advanced global AI.** |
| **Jalali Calendar** | `jalaali-js` / Custom | Accurate Persian calendar implementation. | Full localization support. |
| **Styling** | NativeWind (Tailwind CSS) | Utility-first CSS for rapid UI development. | Consistent styling across platforms. |
| **Fonts** | Vazirmatn, IRANSans, Inter | High-quality Persian and English typography. | Optimized for mobile readability. |

---

## 7. DEVELOPMENT PROCESS (LOCKED)

Refer to `DEVELOPMENT_PROCESS_LOCKED.md` for the detailed, immutable, step-by-step development process, including approval gates and testing requirements for each stage. **The process will adhere to global programmer standards: what is built first, then what is built next, to complete the program.**

---

## 8. KEY DELIVERABLES

-   **Functional Application:** Fully working MinaDent app across all specified platforms (APK, IPA, PWA, Web for Windows, iPad, Android, iOS).
-   **Source Code:** Clean, well-documented, and tested codebase.
-   **Comprehensive Documentation:** Master Specification, Architecture Blueprint, Implementation Roadmap, API Docs, User Guides, Security Reports, Test Reports. **All documentation will be within the project for future use and to surpass competitors.**
-   **Deployment Artifacts:** APK, IPA, PWA bundles, Web deployment files.
-   **Continuous Integration/Deployment (CI/CD) Pipeline:** Automated build, test, and deployment processes.

---

## 9. REFERENCES

-   [MINADENT_ENTERPRISE_CONSTITUTION_v2 (Project Instructions)]
-   [BANKING_DESIGN_RESEARCH.md]
-   [INFRASTRUCTURE_FOUNDATION_SPECS.md]
-   [COMPETITOR_AUDIT.md]
-   Apple Human Interface Guidelines (HIG)
-   Material Design 3
-   OWASP Top 10 & Mobile Top 10
-   ISO 27001 Information Security Management
-   PCI DSS 3.2.1 Payment Card Security
-   NIST Cybersecurity Framework
-   Latest iOS 26 Development Standards (as they emerge)
-   Best practices from Bank Mehr and Qbank mobile applications
-   MinaDent شرکتی بازار (market application)
-   برنامه لبخند (market application)
