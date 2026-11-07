# Public Facility Feedback System (Public Voice)
## Formal Testing Documentation & Verification Log

---

### Table of Contents
1. [Testing Strategy & Scope](#1-testing-strategy--scope)
2. [Test Environment Specifications](#2-test-environment-specifications)
3. [Automated Verification Test Matrix](#3-automated-verification-test-matrix)
4. [Manual Verification Test Matrix](#4-manual-verification-test-matrix)
5. [Regression & Security Test Log](#5-regression--security-test-log)
6. [Summary of Test Execution & Evidence](#6-summary-of-test-execution--evidence)

---

### 1. Testing Strategy & Scope

The testing strategy for the **Public Voice** application validates that:
1. **Client-Side Data Integrity:** Submissions, status updates, and deletions reliably persist in browser `LocalStorage` under the key `'publicVoiceFeedback'` without data loss or corruption.
2. **Bidirectional Synchronization:** Status updates performed on the Admin Dashboard immediately reflect in the Resident Tracking interface without maintaining divergent state values.
3. **Defensive Validation:** Forms strictly prevent incomplete or malformed submissions (invalid emails, out-of-range ratings, whitespace-only descriptions).
4. **Accessible & Safe DOM Manipulation:** All citizen data is rendered using `textContent` and `createElement()` to protect against Cross-Site Scripting (XSS) injections.
5. **Responsiveness & Keyboard Accessibility:** Interactive elements support standard keyboard events (such as the `Escape` key to close modals) and touch viewports.

---

### 2. Test Environment Specifications

- **Operating System:** Windows 11 / Windows 10
- **Browsers Tested:** Google Chrome (v120+), Microsoft Edge (v120+), Mozilla Firefox (v121+)
- **Resolution Ranges:**
  - Desktop: 1920x1080, 1440x900
  - Tablet: 768x1024 (iPad vertical/horizontal)
  - Mobile: 375x667 (iPhone SE), 412x915 (Pixel 7)
- **Runtime Dependencies:** Zero external libraries, standard ECMAScript 6+ runtime.

---

### 3. Automated Verification Test Matrix

The following test cases were executed and verified using a simulated DOM environment in Node.js against the production source code ([js/script.js](file:///c:/Users/Bloodblade/Desktop/PROJECTS/response%20system/Public-Voice/js/script.js)).

| Test Case ID | Feature Under Test | Testing Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Empty Storage Handling | 1. Clear `LocalStorage` (`[]`).<br>2. Initialize Admin Dashboard.<br>3. Inspect table body. | Table displays a single row spanning 8 columns: `"No feedback submissions found."` | Table renders 8-column empty state message. | **PASSED** |
| **TC-02** | Feedback Submission | 1. Enter valid resident name, email, facility, location, rating, and description.<br>2. Submit form. | Generates valid ID matching `PF-XXXXXX`, saves record to storage with initial status `'Pending'`, resets form. | Record added to storage with format `PF-XXXXXX`, status `'Pending'`. Form reset. | **PASSED** |
| **TC-03** | Multiple Submissions Accumulation | 1. Submit three distinct feedback reports sequentially.<br>2. Inspect `LocalStorage`. | All three records exist in storage, with the newest record prepended to index 0. | Storage array length equals 3, ordered by newest first. | **PASSED** |
| **TC-04** | Dynamic Metrics Calculation | 1. Load 3 pending records.<br>2. Check values in `#stat-total`, `#stat-pending`, `#stat-progress`, `#stat-resolved`. | Total = 3, Pending = 3, In Progress = 0, Resolved = 0. | Values matched: Total 3, Pending 3, Progress 0, Resolved 0. | **PASSED** |
| **TC-05** | Case-Insensitive Name Search | 1. Input lowercase query `"sarah"` into search box.<br>2. Dispatch `input` event. | Only records where resident name contains "Sarah" (case-insensitive) are rendered in table. | Table isolates "Sarah Connor", excludes other records. | **PASSED** |
| **TC-06** | Reference ID Search | 1. Input exact reference ID in lowercase (e.g., `"pf-849201"`).<br>2. Dispatch `input` event. | Matches record with ID `PF-849201`. | Table displays matching record. | **PASSED** |
| **TC-07** | Facility Dropdown Filtering | 1. Select `"Public Restrooms"` from facility filter dropdown.<br>2. Dispatch `change` event. | Only reports categorized under "Public Restrooms" are displayed. | Table displays only "Public Restrooms" submissions. | **PASSED** |
| **TC-08** | Broad Category Filter (Complaint) | 1. Select `"Complaint"` from category filter dropdown.<br>2. Dispatch `change` event. | Matches reports under Damage, Cleanliness, Safety Hazards, and Outages. | All complaint records matched and displayed. | **PASSED** |
| **TC-09** | Broad Category Filter (Suggestion) | 1. Select `"Suggestion"` from category filter dropdown.<br>2. Dispatch `change` event. | Matches reports under Improvement Suggestion. | Only suggestion records displayed. | **PASSED** |
| **TC-10** | Status Dropdown Filter | 1. Select `"Resolved"` when 0 records are resolved.<br>2. Dispatch `change` event. | Table renders `"No feedback submissions found."`. | Empty state message rendered. | **PASSED** |
| **TC-11** | Multi-Filter Combination | 1. Combine facility filter, category filter, status filter, and name search concurrently. | Returns only records that simultaneously satisfy all 4 criteria. | Exact matching record rendered. | **PASSED** |
| **TC-12** | Filter Reset Button | 1. Apply multiple filters and search query.<br>2. Click `#reset-filters-btn`. | All dropdowns revert to `"ALL"`, search input cleared to `""`, all records displayed. | All controls reset and full dataset re-rendered. | **PASSED** |
| **TC-13** | Details Modal Population | 1. Click `"View Details"` on table row.<br>2. Inspect modal elements. | Modal receives `active` class, `aria-hidden="false"`, all fields populated safely via `textContent`. | Modal activated, values safely populated. | **PASSED** |
| **TC-14** | Modal Dismissal (Close Button) | 1. Open modal.<br>2. Click `#modal-close-btn` (`&times;`). | Modal loses `active` class, `aria-hidden="true"`, body scrolling restored. | Modal closes cleanly. | **PASSED** |
| **TC-15** | Modal Dismissal (Cancel Button) | 1. Open modal.<br>2. Click `#modal-cancel-btn`. | Modal closes cleanly without saving changes. | Modal closes cleanly. | **PASSED** |
| **TC-16** | Modal Dismissal (Backdrop Click) | 1. Open modal.<br>2. Click dark overlay backdrop (`#feedback-modal`). | Modal closes cleanly. | Modal closes cleanly. | **PASSED** |
| **TC-17** | Modal Dismissal (Escape Key) | 1. Open modal.<br>2. Press `Escape` key on keyboard. | Modal closes cleanly. | Modal closes cleanly. | **PASSED** |
| **TC-18** | Administrative Status Update | 1. Open modal for a Pending record.<br>2. Change status to `"In Progress"`.<br>3. Save form. | Record status in `LocalStorage` changes to `"In Progress"`, modal closes, metrics update. | Status persisted as `"In Progress"`, Pending metric decremented, Progress metric incremented. | **PASSED** |
| **TC-19** | Resident Tracking Synchronization | 1. Update record to `"In Progress"` in Admin Portal.<br>2. Query same ID in Resident Portal. | Resident Portal displays `"In Progress"`, stepper active at step 3, and status banner: *"Your feedback is currently being addressed."* | Resident Portal displays updated status, stepper, and matching banner. | **PASSED** |
| **TC-20** | "Mark as Completed" Confirmation Prompt | 1. Click `"Mark as Completed"` on a row.<br>2. User cancels confirmation prompt (`false`). | No status change occurs; record remains in current status. | Record status remains unchanged. | **PASSED** |
| **TC-21** | "Mark as Completed" Execution | 1. Click `"Mark as Completed"` on a row.<br>2. User confirms prompt (`true`). | Status transitions to `"Resolved"`, action button becomes disabled `"Completed ✓"`, admin success toast appears. | Status updated to `"Resolved"`, button disabled with checkmark, success banner activated. | **PASSED** |
| **TC-22** | Resident Portal "Resolved" Sync | 1. Track completed ID in Resident Portal. | Resident Portal displays `"Resolved"`, all stepper steps completed, and banner: *"Your feedback has been marked as completed."* | Resident Portal displays `"Resolved"`, 4 completed steps, and matching banner. | **PASSED** |
| **TC-23** | Feedback Record Deletion | 1. Open modal for record.<br>2. Click `"Delete Record"`.<br>3. Confirm prompt. | Record removed from `LocalStorage`, table re-renders, metrics recalculate, modal closes. | Record deleted from storage, count decremented by 1. | **PASSED** |
| **TC-24** | Tracking Non-Existent ID | 1. Enter non-existent ID (e.g., `"PF-000000"`).<br>2. Click "Track Progress". | Displays clear message: *"No feedback record found for Reference ID: PF-000000"*; does not display empty card. | Informative not-found box rendered. | **PASSED** |
| **TC-25** | Data Persistence Across Reload | 1. Perform status updates.<br>2. Re-read storage directly using `JSON.parse(localStorage.getItem('publicVoiceFeedback'))`. | All changes remain intact exactly as saved. | Data persists with 100% fidelity. | **PASSED** |

---

### 4. Manual Verification Test Matrix (Visual & Device Checks)

The following tests require manual human observation and were verified across web browsers:

| Test Case ID | Test Description | Verification Steps | Expected Visual / Behavioral Result | Verification Status |
| :--- | :--- | :--- | :--- | :---: |
| **MV-01** | Mobile Navigation Drawer | 1. Resize viewport to < 768px.<br>2. Tap hamburger button (`#mobile-nav-toggle`). | Navigation links expand vertically; `aria-expanded` toggles between `true` and `false`. | Verified in Chrome DevTools |
| **MV-02** | Visual Stepper Progression | 1. Inspect tracking result card across different statuses (`Pending`, `In Progress`, `Resolved`). | Step circles change from empty numbers to green checkmarks `✓` with connecting bar highlight. | Verified in Chrome DevTools |
| **MV-03** | Modal Background Scroll Lock | 1. Open details modal on desktop.<br>2. Attempt mouse scroll on background page. | Background page scrolling is locked (`body { overflow: hidden }`); background does not jitter. | Verified in Chrome DevTools |
| **MV-04** | Table Action Buttons Alignment | 1. Inspect table column 8 on desktop and tablet views. | "View Details" and "Mark as Completed" sit side-by-side with 8px gap without overlapping. | Verified in Chrome DevTools |
| **MV-05** | Color Palette Compliance | 1. Inspect CSS color values across buttons, badges, topbars, and borders. | Only solid colors used (`#236B50`, `#174B39`, `#F8FAF8`, `#FFFFFF`); no gradients or blurs. | Verified in Source Inspection |

---

### 5. Regression & Security Test Log

- **XSS Script Injection Test:**
  - *Input:* `<script>alert('XSS')</script>` typed into the resident Name and Description fields.
  - *Behavior:* JavaScript creates DOM nodes using `element.textContent = input`.
  - *Result:* Browser displays literal string `<script>alert('XSS')</script>`. No script execution occurred. **PASSED**.
- **Malformed JSON Recovery:**
  - *Simulation:* Corrupted data (`"INVALID_JSON{{{"`) manually injected into `localStorage.setItem('publicVoiceFeedback', ...)`.
  - *Behavior:* `getFeedback()` catches the parse error inside `try/catch` and safely returns an empty array `[]`.
  - *Result:* Page loads without crashing, displaying `"No feedback submissions found."`. **PASSED**.

---

### 6. Summary of Test Execution & Evidence

- **Total Automated Test Assertions:** 25/25 **PASSED** (100% Pass Rate).
- **Manual Visual Assertions:** 5/5 **VERIFIED**.
- **Regressions Identified:** None.
- **Backend Dependencies:** Zero.
- **LocalStorage Data Consistency:** Verified identical across resident tracking and admin operations.

