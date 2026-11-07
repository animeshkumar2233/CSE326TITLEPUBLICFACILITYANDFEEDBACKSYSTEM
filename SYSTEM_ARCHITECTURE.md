# Public Facility Feedback System (Public Voice)
## System Architecture & Workflow Specifications

---

### Table of Contents
1. [Architectural Overview](#1-architectural-overview)
2. [High-Level System Architecture Diagram](#2-high-level-system-architecture-diagram)
3. [Resident Portal Workflow](#3-resident-portal-workflow)
4. [Admin Dashboard Workflow](#4-admin-dashboard-workflow)
5. [Feedback Submission Sequence Flow](#5-feedback-submission-sequence-flow)
6. [Feedback Tracking Sequence Flow](#6-feedback-tracking-sequence-flow)
7. [Status Update & Completion Workflow](#7-status-update--completion-workflow)
8. [LocalStorage Data Flow & Lifecycle](#8-localstorage-data-flow--lifecycle)
9. [Component Relationship & State Diagram](#9-component-relationship--state-diagram)

---

### 1. Architectural Overview

The **Public Facility Feedback System (Public Voice)** employs a **Single-Origin Client-Side Web Architecture**. 

Because it operates completely without a back-end server or external database, all core components—presentation, business logic, validation, and data persistence—execute entirely inside the user's web browser:

1. **Presentation Layer (View):** Semantic HTML5 pages (`index.html` and `admin.html`) styled by a unified, responsive CSS3 design system (`css/style.css`).
2. **Controller & Business Logic Layer:** A native Vanilla JavaScript engine (`js/script.js`) managing DOM manipulation, user event handling, validation algorithms, array filtering, and security sanitation.
3. **Storage & Persistence Layer (Model):** The browser's native `LocalStorage` subsystem using JSON serialization (`JSON.stringify` and `JSON.parse`) keyed under `'publicVoiceFeedback'`.

---

### 2. High-Level System Architecture Diagram

```mermaid
flowchart TD
    subgraph ClientBrowser["Client Web Browser (Chrome / Edge / Firefox / Safari)"]
        subgraph Views["Presentation Views (HTML5 & CSS3)"]
            RP["Resident Portal (index.html)"]
            AP["Admin Dashboard (admin.html)"]
        end

        subgraph Controller["Application Controller (js/script.js)"]
            Init["Page Initializer (init)"]
            Val["Form Validation Engine"]
            IDGen["ID Generator (PF-XXXXXX)"]
            TrackEng["Tracking & Stepper Engine"]
            FilterEng["Search & Multi-Filter Engine"]
            MetricEng["Statistics Counter Engine"]
            ModalEng["Details Modal Controller"]
            CompEng["Mark as Completed Controller"]
        end

        subgraph StorageLayer["Browser Local Storage Subsystem"]
            LS[("LocalStorage Engine: 'publicVoiceFeedback'")]
        end
    end

    RP -->|"Form Input / Search Query"| Controller
    AP -->|"Filters / Status Updates / Deletions"| Controller
    Controller -->|"Safe DOM Updates (textContent)"| Views
    Controller <-->|"Read (getItem) & Write (setItem)"| StorageLayer
```

---

### 3. Resident Portal Workflow

The Resident Portal prioritizes zero-friction public service:

```mermaid
flowchart TD
    Start([Citizen Visits Portal]) --> Choice{What does the citizen want to do?}
    
    Choice -->|Lodge New Grievance| FormSect[Navigate to Feedback Form]
    Choice -->|Check Existing Report| TrackSect[Navigate to Tracking Search]
    
    FormSect --> FillForm[Fill Required Details: Name, Email, Facility, Category, Location, Rating, Description]
    FillForm --> ClickSubmit[Click 'Submit Official Feedback']
    ClickSubmit --> Validate{Validation Passed?}
    
    Validate -->|No| ShowErr[Display Inline Error Alert]
    ShowErr --> FillForm
    
    Validate -->|Yes| GenID[Generate Unique ID: PF-XXXXXX]
    GenID --> SaveLS[Prepend to LocalStorage Array]
    SaveLS --> ShowConf[Display Success Banner with Tracking Code]
    ShowConf --> AutoFill[Auto-fill Code in Tracking Input & Reset Form]
    
    TrackSect --> EnterID[Enter Feedback Reference Code]
    EnterID --> ClickTrack[Click 'Track Progress']
    ClickTrack --> SearchStorage{Search LocalStorage}
    
    SearchStorage -->|Not Found| ShowNotFound[Display 'Reference ID Not Found' Message]
    SearchStorage -->|Found| RenderCard[Display Tracking Card]
    RenderCard --> ShowBanner[Show Status Banner: Pending / In Progress / Resolved]
    ShowBanner --> ShowSteps[Highlight 4-Step Resolution Stepper]
    ShowSteps --> ShowRemarks[Display Official Administrator Remarks]
```

---

### 4. Admin Dashboard Workflow

The Admin Dashboard empowers municipal supervisors to review and resolve civic grievances:

```mermaid
flowchart TD
    AdminStart([Officer Opens admin.html]) --> LoadData[Retrieve Records from LocalStorage]
    LoadData --> CalcStats[Calculate Dashboard Metrics: Total, Pending, Progress, Resolved]
    CalcStats --> RenderTbl[Render Feedback Table with Action Buttons]
    
    RenderTbl --> ActionChoice{Supervisor Action}
    
    ActionChoice -->|Search / Filter| ApplyFilters[Input Query / Select Facility, Category, or Status]
    ApplyFilters --> FilterTbl[Filter Array & Re-render Matching Rows]
    FilterTbl --> MatchCheck{Any Matches?}
    MatchCheck -->|No| EmptyRow[Display 'No feedback submissions found.']
    MatchCheck -->|Yes| ShowMatches[Display Matching Rows]
    
    ActionChoice -->|Quick Completion| ClickComp[Click 'Mark as Completed']
    ClickComp --> ConfirmComp{Confirm Dialog?}
    ConfirmComp -->|Cancel| AbortComp[No Changes Made]
    ConfirmComp -->|OK| SetResolved[Set Status to 'Resolved' & Save LocalStorage]
    SetResolved --> RefreshUI[Refresh Table, Update Stat Cards, Show Toast Notification]
    
    ActionChoice -->|Inspect Details| ClickDetails[Click 'View Details']
    ClickDetails --> OpenModal[Open Accessible Details Modal]
    OpenModal --> ModalActions{Modal Actions}
    
    ModalActions -->|Update Status & Remarks| SubmitModalForm[Select New Status & Enter Notes]
    SubmitModalForm --> SaveModalLS[Save to LocalStorage & Refresh Dashboard]
    
    ModalActions -->|Delete Record| ClickDelete[Click 'Delete Record']
    ClickDelete --> ConfirmDel{Confirm Permanent Deletion?}
    ConfirmDel -->|OK| RemoveRec[Remove Record from Array & Update Storage]
    ConfirmDel -->|Cancel| AbortDel[No Changes Made]
    
    ModalActions -->|Close Modal| DismissModal[Click Close, Cancel, Backdrop, or Press Escape]
```

---

### 5. Feedback Submission Sequence Flow

```mermaid
sequenceDiagram
    autonumber
    actor Citizen as Resident
    participant Form as Feedback Form (HTML)
    participant Ctrl as JS Controller (script.js)
    participant Storage as LocalStorage Engine
    participant UI as DOM Display

    Citizen->>Form: Enters Name, Email, Facility, Location, Category, Rating, Description
    Citizen->>Form: Clicks "Submit Official Feedback"
    Form->>Ctrl: Triggers submit event (handleFormSubmit)
    Ctrl->>Ctrl: event.preventDefault()
    Ctrl->>Ctrl: Collects and trims input values
    Ctrl->>Ctrl: Validates mandatory fields & email syntax
    alt Validation Failed
        Ctrl->>UI: Displays error banner above form actions
    else Validation Succeeded
        Ctrl->>Ctrl: Generates unique code "PF-XXXXXX"
        Ctrl->>Ctrl: Builds feedback object (status: "Pending")
        Ctrl->>Storage: getFeedback()
        Storage-->>Ctrl: Returns existing array
        Ctrl->>Ctrl: unshift(feedbackObject)
        Ctrl->>Storage: saveFeedback(updatedArray)
        Storage-->>Ctrl: Storage confirmed (true)
        Ctrl->>UI: Displays green confirmation banner with Reference ID
        Ctrl->>UI: Resets form input fields
    end
```

---

### 6. Feedback Tracking Sequence Flow

```mermaid
sequenceDiagram
    autonumber
    actor Citizen as Resident
    participant Input as Tracking Input Field
    participant Ctrl as JS Controller (script.js)
    participant Storage as LocalStorage Engine
    participant Card as Result Card DOM

    Citizen->>Input: Enters Tracking Code (e.g., "pf-849201")
    Citizen->>Input: Clicks "Track Progress"
    Input->>Ctrl: Triggers submit event (handleTrackingSubmit)
    Ctrl->>Ctrl: Trims whitespace and normalizes to uppercase
    Ctrl->>Storage: getFeedback()
    Storage-->>Ctrl: Returns complete feedback array
    Ctrl->>Ctrl: Searches array: item.id === searchId
    alt Record Not Found
        Ctrl->>Card: Renders informative "Not Found" message box
    else Record Found
        Ctrl->>Card: Constructs header with ID and status badge
        Ctrl->>Card: Builds Status Message Banner (Pending / Progress / Resolved)
        Ctrl->>Card: Builds 4-Step Resolution Stepper
        Ctrl->>Card: Builds 2-column Metadata Grid
        Ctrl->>Card: Appends Description & Official Remediation Remarks
        Ctrl->>Card: Displays result card container (classList.add active)
    end
```

---

### 7. Status Update & Completion Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Municipal Supervisor
    participant Table as Admin Table (admin.html)
    participant Modal as Details Modal
    participant Ctrl as JS Controller
    participant Storage as LocalStorage Engine
    actor Resident as Citizen

    Note over Admin,Table: Path A: One-Click "Mark as Completed" from Table Row
    Admin->>Table: Clicks "Mark as Completed"
    Table->>Ctrl: markFeedbackAsCompleted(id)
    Ctrl->>Admin: window.confirm("Mark as Completed (Resolved)?")
    Admin-->>Ctrl: Clicks OK
    Ctrl->>Storage: getFeedback()
    Storage-->>Ctrl: Returns records array
    Ctrl->>Ctrl: target.status = "Resolved"
    Ctrl->>Storage: saveFeedback(records)
    Ctrl->>Table: re-renders table rows (button becomes "Completed ✓")
    Ctrl->>Table: recalculates statistics (Resolved count increments)
    Ctrl->>Table: displays top success toast notification

    Note over Resident: Citizen tracks the same ID on index.html
    Resident->>Ctrl: Enters reference code in Resident Portal
    Ctrl->>Storage: getFeedback()
    Storage-->>Ctrl: Reads freshly updated records
    Ctrl->>Resident: Renders Status as "Resolved", Stepper at step 4, and "Your feedback has been marked as completed."
```

---

### 8. LocalStorage Data Flow & Lifecycle

The application relies on a single storage key (`publicVoiceFeedback`). All records follow a structured, predictable lifecycle:

```
[ New Submission ] ---> unshift() ---> [ Stored Array in LocalStorage ]
                                                  |
           +--------------------------------------+--------------------------------------+
           |                                      |                                      |
           v                                      v                                      v
    [ Read by Admin ]                     [ Read by Resident ]                   [ Delete Record ]
    - Overview Metrics                    - Progress Stepper                     - Filtered out
    - Table Listing                       - Status Indicator                     - Array saved
    - Details Modal                       - Official Remarks                     - Record removed
           |
           v
    [ Status Update / Completed ]
    - Status: "Resolved"
    - Admin remarks added
    - saveFeedback() persists
```

---

### 9. Component Relationship & State Diagram

```mermaid
stateDiagram-v2
    [*] --> Submitted: Resident Submits Form (ID Generated)
    
    state Submitted {
        [*] --> Pending: Stored in LocalStorage
        Pending: "Your feedback has been received and is awaiting review."
        Pending: Step 1 Active
    }

    Pending --> UnderReview: Officer opens Details Modal / Assigns Crew
    UnderReview: Status: Under Review
    UnderReview: Step 2 Active

    UnderReview --> InProgress: Work Squad Dispatched
    Pending --> InProgress: Direct Status Change
    
    state InProgress {
        InProgress: "Your feedback is currently being addressed."
        InProgress: Step 3 Active
    }

    InProgress --> Resolved: Supervisor clicks "Mark as Completed"
    Pending --> Resolved: Immediate Resolution
    
    state Resolved {
        Resolved: "Your feedback has been marked as completed."
        Resolved: Step 4 Active (All Steps Checked)
        Resolved: Action Button Disabled ("Completed ✓")
    }

    Resolved --> [*]: Lifecycle Closed
```

