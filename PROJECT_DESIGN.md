# Public Facility Feedback System (Public Voice)
## Design & Architecture Specification Document (`PROJECT_DESIGN.md`)

---

## 1. Executive Summary & Project Overview

- **Project Name:** Public Facility Feedback System (Public Voice)
- **Nature of Project:** College Mini-Project
- **Domain:** Municipal / Civic Technology & E-Governance
- **Technology Stack:**
  - **Markup:** HTML5 (Semantic elements)
  - **Styling:** CSS3 (Custom Properties / Variables, Flexbox, CSS Grid)
  - **Scripting:** Vanilla JavaScript (ES6+, DOM Manipulation, Event Listeners)
  - **Data Persistence:** Browser `LocalStorage` (JSON serialization)
  - **Third-Party Dependencies:** None (Zero external frameworks, no CSS libraries, no runtime dependencies)

The **Public Facility Feedback System (Public Voice)** serves as a lightweight, reliable, and accessible bridge between citizens and civic administrators. It empowers residents to lodge feedback, report facility issues (e.g., roads, parks, streetlights, public sanitation, water supply), and track remediation progress without friction. It simultaneously supplies facility administrators with a clear management interface to review, filter, update, and resolve civic complaints.

---

## 2. Design Direction

- **Style:** Clean, minimal, trustworthy government-service portal.
- **Tone:** Authoritative, accessible, neutral, transparent, and purposeful.
- **Visual Aesthetic:**
  - Crisp borders, flat surfaces, generous whitespace, and high contrast.
  - **Strict constraints:**
    - **No gradients** (solid color fills only).
    - **No glassmorphism, blur, or artificial translucent gimmicks.**
    - **No skeuomorphism or heavy drop-shadows** (subtle 1px borders and slight elevation tokens only).
    - **No loud marketing banners or distracting motion.**

---

## 3. Color Palette

The color system is inspired by public institutions and civic services, emphasizing clarity, stability, and high accessibility compliance (WCAG 2.1 AA/AAA).

| Role | Color Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Forest Green | `#236B50` | Primary buttons, active navigation states, primary headings, key action points |
| **Dark Green** | Deep Pine | `#174B39` | Top header, navbar, footer, hover states on primary buttons, table header bands |
| **Background** | Pale Off-White | `#F8FAF8` | Base page background canvas, giving warmth and high contrast with white cards |
| **Surface / Card** | Pure White | `#FFFFFF` | Form containers, modal dialogs, data table rows, card backgrounds |
| **Main Text** | Slate Black | `#202B27` | Headings, body text, form input labels, high-emphasis text |
| **Secondary Text** | Muted Moss Gray | `#68756F` | Helper text, timestamps, breadcrumbs, placeholder text, table metadata |
| **Borders & Dividers**| Soft Sage Gray | `#DFE7E1` | Card borders, input outlines, table cell dividers, horizontal rules |

### Status Badges (Flat, high-contrast tints using palette guidelines)
- **Pending / New:** Light amber/sand background with dark brown/charcoal text.
- **In Progress / Under Review:** Neutral soft green tint (`#E8F2EC`) with Primary Green text (`#236B50`).
- **Resolved:** Muted sage green fill with `#174B39` text.
- **Rejected / Closed:** Subtle slate border with `#68756F` text.

---

## 4. Typography System

- **Primary Font Family:** `Inter`, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif.
- **Font Weights:**
  - `400` (Regular): Body copy, input fields, descriptions.
  - `500` (Medium): Navigation links, table cells, secondary buttons, labels.
  - `600` (Semi-Bold): Section headings, card titles, table headers, status badges.
  - `700` (Bold): Main hero header, dashboard metric numbers.

### Type Scale (Desktop & Responsive Base)
- **Hero Title (Display):** `32px` – `36px` / Line-height: `1.2`
- **Section Heading (H1 / H2):** `24px` – `28px` / Line-height: `1.3`
- **Sub-section / Card Title (H3):** `18px` – `20px` / Line-height: `1.4`
- **Body Regular:** `15px` – `16px` / Line-height: `1.5`
- **Small / Metadata / Form Hints:** `13px` – `14px` / Line-height: `1.4`
- **Micro / Badges:** `11px` – `12px` / Letter-spacing: `0.5px` (Uppercase / Semi-bold)

---

## 5. Design Principles

1. **Simple and Accessible Navigation:**
   - Persistent top bar with unambiguous section anchors (`Home`, `How It Works`, `Submit Feedback`, `Track Status`, `Admin Portal`).
   - Clear skip-links and accessible keyboard tab orders.
2. **Consistent Spacing and Alignment:**
   - 8-point spatial grid system (e.g., `8px`, `16px`, `24px`, `32px`, `48px`, `64px`).
   - All form inputs, cards, and data tables maintain uniform margins and padding.
3. **Clear Visual Hierarchy:**
   - Distinct separation between primary actions (e.g., "Submit Report") and secondary actions (e.g., "Reset Form", "Search Again").
   - Informative headings that immediately orient the user.
4. **Minimal Animations:**
   - No bouncy transitions or superfluous parallax effects.
   - Transitions strictly limited to standard hover and focus states (`transition: background-color 0.15s ease, border-color 0.15s ease`).
5. **Responsive Design:**
   - Fluid multi-column to single-column degradation.
   - Touch-friendly tap targets (minimum 44x44px for inputs, buttons, and navigation elements on mobile).
6. **No Gradients or Glassmorphism:**
   - Flat, solid fills with clean 1px borders (`#DFE7E1`) to separate content sections.

---

## 6. Resident Portal Architecture

The Resident Portal prioritizes ease of use for citizens of all digital literacy levels.

### 6.1 Home Section
- **Header & Navigation:** Official branding ("Public Voice - Municipal Facility Portal"), navigation anchors, and a quick switch button to "Admin View".
- **Hero Area:**
  - Clear statement of public purpose: *"Official portal for reporting public facility conditions and municipal service issues."*
  - Dual Call-to-Action (CTA):
    - Primary CTA: **"Lodge New Feedback"** (Smooth scrolls to the submission form).
    - Secondary CTA: **"Track Existing Report"** (Scrolls to tracking search).
  - Quick summary cards indicating common reporting categories (Roads & Footpaths, Parks & Playgrounds, Water Supply, Waste & Sanitation, Street Lighting).

### 6.2 How It Works Section
A four-step linear guide that demystifies the municipal resolution process:
1. **Step 1: Submit Details:** Select the facility type, specify the location, and describe the issue.
2. **Step 2: Receive Tracking Code:** An instant, unique reference ID (e.g., `PV-2026-8941`) is generated and stored.
3. **Step 3: Administrative Action:** Municipal officers review the submission, assign priority, and update status.
4. **Step 4: Resolution & Verification:** View resolution notes and track completion directly on the portal.

### 6.3 Feedback Submission Form
A structured, validation-checked form storing entries directly into `LocalStorage`:
- **Facility / Department Category (Dropdown):**
  - Roads & Pavements
  - Street Lighting & Electrical
  - Public Parks & Green Spaces
  - Water Supply & Drainage
  - Waste Management & Sanitation
  - Public Buildings & Restrooms
- **Issue Severity / Priority (Radio / Select):** Low, Medium, High, Urgent.
- **Specific Location / Landmark (Text Input):** Exact address, street name, or facility landmark.
- **Issue Title (Text Input):** Concise description (e.g., *"Broken water pipe near City Library"*).
- **Detailed Description (Textarea):** In-depth observations, duration of issue, hazards.
- **Citizen Information (Optional / Anonymous toggle):**
  - Name (optional)
  - Contact Email or Phone (optional, for status updates)
  - "Submit Anonymously" checkbox.
- **Form Actions:**
  - Primary button: "Submit Feedback"
  - Secondary button: "Clear Form"
- **Post-Submission Confirmation Banner:** Shows newly generated Tracking ID with a single-click "Copy ID" option.

### 6.4 Feedback Tracking Section
- **Search Input:** Clean text box with tracking ID validation (e.g., `PV-XXXX-XXXX`).
- **Submit / Lookup Button:** "Check Status".
- **Status Results Card (Appears on match):**
  - Tracking ID & Submission Date.
  - Facility Category & Location.
  - Current Status Badge: `Pending` | `Under Review` | `In Progress` | `Resolved` | `Closed`.
  - Resolution Timeline / Progress Steps (Submitted → Inspected → In Work → Resolved).
  - Official Administrator Remarks / Resolution Notes.

---

## 7. Admin Portal Architecture

The Admin Portal provides municipal staff with a centralized dashboard for feedback triage, status workflow updates, and civic metric monitoring.

### 7.1 Dashboard Statistics
Top summary metric cards displaying real-time data calculated from `LocalStorage`:
- **Total Feedback Received:** Cumulative total of citizen submissions.
- **Pending Review:** Awaiting officer triage.
- **Under Action / In Progress:** Active maintenance teams dispatched.
- **Resolved:** Successfully addressed issues.
- **Average Resolution Rate (%):** Proportion of resolved complaints to total complaints.

### 7.2 Feedback Listing (Data Table)
A clean, tabular view showing all records:
- **Columns:**
  - Tracking ID
  - Date & Time
  - Category / Facility
  - Location
  - Citizen Contact (or "Anonymous")
  - Priority Level (Low / Medium / High / Urgent)
  - Current Status
  - Action ("View & Manage")

### 7.3 Search and Filtering Controls
A dedicated filter bar positioned directly above the listing:
- **Text Search:** Real-time query matching against Tracking ID, Location, or Title keywords.
- **Category Filter:** Dropdown to filter by specific facility department.
- **Status Filter:** Dropdown (`All`, `Pending`, `Under Review`, `In Progress`, `Resolved`, `Closed`).
- **Sort Options:** By Date (Newest first, Oldest first) or by Priority (Highest first).
- **Reset Filters Button:** Revert all view controls to default state.

### 7.4 Feedback Status Management & Details View
Clicking on any row triggers a structured **Detail & Management View** (Modal or dedicated drawer):
- **Full Citizen Submission Review:** Complete incident report, submission timestamp, citizen info.
- **Status Update Control:**
  - Status select dropdown (`Pending`, `Under Review`, `In Progress`, `Resolved`, `Closed`).
  - Priority adjustment control.
- **Official Notes & Resolution Remarks (Textarea):** Officer writes public or internal resolution notes.
- **Action Buttons:**
  - "Save Status & Notes" (Updates `LocalStorage` record instantly).
  - "Delete Record" (With confirmation prompt for admin hygiene).
  - "Close Details".

---

## 8. Responsive Layout & Breakpoint Specifications

| Device Category | Viewport Width | Layout Adjustments |
| :--- | :--- | :--- |
| **Desktop** | `>= 1024px` | - Full multi-column navigation with persistent header.<br>- 4-column statistic cards.<br>- Full data table layout for admin listing.<br>- 2-column layout for feedback form (inputs side-by-side where logical). |
| **Tablet** | `768px – 1023px` | - 2-column statistic cards.<br>- Table with horizontal scroll container or condensed cell content.<br>- Form inputs stack into single column.<br>- Centered container with fixed 32px side margins. |
| **Mobile** | `< 768px` | - Stacked vertical mobile menu.<br>- Single-column stat cards (1-per-row or 2x2 grid).<br>- Admin listing transforms from standard table to responsive card list.<br>- 100% width button and input elements.<br>- Minimum 16px edge-to-edge content gutters. |

---

## 9. Wireframe Descriptions

### 9.1 Resident Portal Wireframe

```
+-----------------------------------------------------------------------------------+
|  [LOGO] Public Voice | Municipal Facility Portal       [How It Works] [Submit] [Track] [Admin View] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  HERO SECTION                                                                     |
|  ===============================================================================  |
|  Report Public Facility Issues in Your City                                       |
|  Help local municipal authorities maintain infrastructure, parks, and sanitation.  |
|                                                                                   |
|  [ + Lodge New Feedback ]         [ Track Existing Status ]                       |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|  HOW IT WORKS                                                                     |
|  -------------------------------------------------------------------------------  |
|  [ 1. Select Facility ] -> [ 2. Get Tracking ID ] -> [ 3. Inspection ] -> [ 4. Resolved ] |
+-----------------------------------------------------------------------------------+
|  SUBMIT FEEDBACK                                                                  |
|  -------------------------------------------------------------------------------  |
|  Facility Category:       [ Select: Roads / Lighting / Water / Waste / Parks v ]   |
|  Priority / Urgency:      ( ) Low    ( ) Medium    (*) High    ( ) Urgent         |
|  Location / Landmark:     [ e.g. 5th Main Rd, Near City Water Tank            ]   |
|  Issue Title:             [ e.g. Streetlight not working for 3 days           ]   |
|  Detailed Description:    +---------------------------------------------------+   |
|                           | Please describe the fault, hazards, duration...   |   |
|                           +---------------------------------------------------+   |
|  Citizen Name (Optional): [ Your full name                                    ]   |
|  Citizen Contact (Opt):   [ Email or phone number                             ]   |
|  [ ] Submit anonymously                                                           |
|                                                                                   |
|  [ Submit Feedback Now ]                  [ Clear Form ]                          |
+-----------------------------------------------------------------------------------+
|  TRACK YOUR FEEDBACK                                                              |
|  -------------------------------------------------------------------------------  |
|  Enter Tracking Reference: [ PV-2026-XXXX                     ]  [ Check Status ] |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | Result Card: PV-2026-1042                     [ STATUS: IN PROGRESS ]       |  |
|  | Facility: Water Supply & Drainage    | Date Filed: 2026-11-05               |  |
|  | Location: Ward 12, South Cross Rd                                           |  |
|  | Latest Note: "Inspection team dispatched; repair underway."                  |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
|  (C) 2026 Public Voice Portal - Designed for Municipal Service Excellence         |
+-----------------------------------------------------------------------------------+
```

---

### 9.2 Admin Portal Wireframe

```
+-----------------------------------------------------------------------------------+
|  [LOGO] Public Voice Admin Console                 [Resident Portal] [Admin User] |
+-----------------------------------------------------------------------------------+
|  DASHBOARD METRICS OVERVIEW                                                       |
|  +-----------------+  +-----------------+  +-----------------+  +-----------------+
|  | TOTAL REPORTS   |  | PENDING TRIAGE  |  | IN PROGRESS     |  | RESOLVED        |
|  | 142             |  | 28              |  | 19              |  | 95              |
|  +-----------------+  +-----------------+  +-----------------+  +-----------------+
+-----------------------------------------------------------------------------------+
|  FEEDBACK MANAGEMENT                                                              |
|  -------------------------------------------------------------------------------  |
|  Search: [ Search ID, Location or Title... ]                                      |
|  Filter Category: [ All Categories v ]   Filter Status: [ All Statuses v ]        |
|                                                                                   |
|  +--------------+------------+----------------+--------------+-----------+--------+
|  | ID           | Date       | Category       | Location     | Status    | Action |
|  +--------------+------------+----------------+--------------+-----------+--------+
|  | PV-2026-1042 | 2026-11-05 | Water Supply   | Ward 12      | IN PROG   | [Edit] |
|  | PV-2026-1041 | 2026-11-05 | Streetlight    | Park Ave     | RESOLVED  | [Edit] |
|  | PV-2026-1040 | 2026-11-04 | Waste Mgmt     | Market St    | PENDING   | [Edit] |
|  +--------------+------------+----------------+--------------+-----------+--------+
+-----------------------------------------------------------------------------------+
|  DETAIL & STATUS UPDATE MODAL (Opens when [Edit] is clicked)                       |
|  +-----------------------------------------------------------------------------+  |
|  | Manage Feedback: PV-2026-1042                                          [X] |  |
|  | -------------------------------------------------------------------------   |  |
|  | Date: 2026-11-05 10:14 AM  | Category: Water Supply & Drainage              |  |
|  | Location: Ward 12, South Cross Rd                                           |  |
|  | Citizen: John Doe (john@example.com)                                        |  |
|  | Description: "Major pipeline leak causing water overflow across road."      |  |
|  |                                                                             |  |
|  | Update Status:  [ In Progress                     v ]                       |  |
|  | Official Note:  +---------------------------------------------------------+ |  |
|  |                 | Field team scheduled for pipeline replacement Nov 7.   | |  |
|  |                 +---------------------------------------------------------+ |  |
|  | [ Save Changes ]         [ Delete Report ]            [ Cancel ]            |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 10. Data Model Definition (`LocalStorage` Schema)

All application data is maintained under a single JSON array key in `LocalStorage`: `'pv_feedbacks'`.

```javascript
[
  {
    "id": "PV-2026-0001",
    "timestamp": "2026-11-07T16:57:35.000Z",
    "category": "Water Supply & Drainage",
    "priority": "High",
    "location": "Ward 12, South Cross Rd",
    "title": "Major pipeline leak",
    "description": "Clean water leaking onto street for over 24 hours.",
    "isAnonymous": false,
    "citizenName": "John Doe",
    "citizenContact": "john@example.com",
    "status": "In Progress", // "Pending" | "Under Review" | "In Progress" | "Resolved" | "Closed"
    "adminNotes": "Inspection completed. Maintenance squad scheduled."
  }
]
```

---

## 11. Implementation Guidelines (Phase 2 Readiness)

- **Pure Semantics:** Use semantic HTML5 `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` tags.
- **Zero Third-Party Assets:** No CDN links for CSS/JS libraries (Bootstrap, Tailwind, jQuery, etc.) or external font CDNs unless specified.
- **State Management:** All state queries (metrics counting, filtering, search) run on lightweight ES6 Array methods (`.filter()`, `.map()`, `.reduce()`, `.find()`).
- **Resilience:** Fallback mock seed data will be safely initialized if `LocalStorage` is empty on first launch.

