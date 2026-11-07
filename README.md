# Public Facility Feedback System (Public Voice)

## Project Description
**Public Voice** is a lightweight, accessible, and citizen-centric web application designed for municipal facility management. It allows residents to easily report civic infrastructure issues (such as damaged roads, broken streetlights, water supply leaks, sanitation concerns, and public park maintenance) and track remediation progress using a unique reference code. It also provides municipal administrators with an operational dashboard to triage, filter, update, and resolve reported issues in real time.

---

## Technology Stack
- **HTML5:** Semantic markup structure
- **CSS3:** Responsive styling, CSS variables, Flexbox, and CSS Grid (strictly no external CSS frameworks)
- **Vanilla JavaScript:** Native ES6+ DOM manipulation and event handling
- **LocalStorage:** Client-side data persistence for submissions and administrative updates
- **Dependencies:** None (Zero third-party libraries, frameworks, or runtime dependencies)

---

## Main Features

### 1. Resident Portal
- **Home Section:** Clear civic service introduction and quick navigation to reporting or tracking workflows.
- **How It Works:** Step-by-step visual guide outlining the submission, inspection, and resolution lifecycle.
- **Feedback Submission Form:**
  - Facility category selection (Roads, Lighting, Parks, Water, Sanitation, Public Buildings).
  - Issue priority/urgency selection (Low, Medium, High, Urgent).
  - Location input with landmark specification.
  - Detailed description with optional contact details or anonymous reporting toggle.
  - Automatic generation of a unique reference tracking code (e.g., `PV-2026-XXXX`).
- **Feedback Tracking Section:**
  - Real-time status lookup using the reference tracking ID.
  - Visual status indicator (`Pending`, `Under Review`, `In Progress`, `Resolved`, `Closed`).
  - Progress stepper and official administrator remediation remarks.

### 2. Admin Portal
- **Dashboard Statistics:** Metric cards tracking total submissions, pending triage, active remediations, and resolved complaints.
- **Feedback Listing:** Tabular/card view of all resident feedback submissions.
- **Search & Filtering:** Real-time search by ID, location, or keyword, with multi-criteria filters for category, status, and priority sorting.
- **Status Management & Details:** Interactive management view to review full submission details, update resolution status, log official notes, or manage records.

---

## Project Structure

```
Public-Voice/
├── index.html            # Resident Portal entry page
├── admin.html            # Admin Portal entry page
├── css/
│   └── style.css         # Application stylesheet (pure CSS3)
├── js/
│   └── script.js         # Application logic & LocalStorage handling (vanilla JS)
├── assets/
│   ├── images/           # Graphic assets and illustrations
│   └── icons/            # SVG/PNG icon assets
├── PROJECT_DESIGN.md     # Complete design & architectural specifications
└── README.md             # Project documentation & overview
```

