# Public Facility Feedback System (Public Voice)
## Comprehensive Viva Voce Questions & Answers Guide

---

### Welcome to the Viva Voce Preparation Guide!

This document contains **130 beginner-friendly viva questions and answers** covering all aspects of the **Public Voice** project. 

Whether you are preparing for your college mini-project evaluation, a lab viva, or a technical interview, these explanations are written in simple, plain English with technical accuracy.

---

## Section 1: Basic Project Questions (25 Questions)

#### Q1: What is the name of your project?
**Answer:** The project is called **Public Voice**, officially titled the **Public Facility Feedback System**.

#### Q2: What is the main purpose of Public Voice?
**Answer:** It is a web application that allows community residents to report civic problems (such as broken streetlights, potholes, water leaks, and sanitation issues) and track their repair progress in real time.

#### Q3: Who are the target users of this system?
**Answer:** There are two main user groups:
1. **Residents / Citizens:** People living in the municipality who lodge feedback and track complaints.
2. **Municipal Administrators / Supervisors:** Civic officers who review, prioritize, assign, and mark complaints as completed.

#### Q4: What problems does Public Voice solve?
**Answer:** It eliminates the need to physically visit municipal offices or wait on busy telephone lines. It provides an instant tracking reference code so citizens know their complaints are being addressed rather than forgotten.

#### Q5: What technology stack is used in this project?
**Answer:** The project uses pure front-end web standards: **HTML5** for structure, **CSS3** for styling, **Vanilla JavaScript (ES6+)** for logic, and browser **LocalStorage** for data persistence.

#### Q6: Why did you not use frameworks like React, Angular, or Vue?
**Answer:** To demonstrate mastery of core web fundamentals. Vanilla web technologies load instantly, have zero external dependencies, require no build tools or package managers (like npm), and work on any browser.

#### Q7: Why did you not use CSS frameworks like Bootstrap or Tailwind?
**Answer:** Writing custom CSS using modern features like CSS variables, Flexbox, and CSS Grid allows full control over layout, styling, and accessibility while keeping the application extremely lightweight.

#### Q8: Does this project have a database server like MySQL or MongoDB?
**Answer:** No. It is an offline-capable, client-side application that stores data directly inside the browser using `LocalStorage`.

#### Q9: What happens when a user submits a feedback form?
**Answer:** The JavaScript controller validates the inputs, generates a random 6-digit reference code (`PF-XXXXXX`), creates a feedback object with status "Pending", saves it to `LocalStorage`, and displays a confirmation banner.

#### Q10: What format is used for the tracking reference code?
**Answer:** The format is `PF-XXXXXX`, where "PF" stands for Public Facility and "XXXXXX" is a random six-digit number between 100000 and 999999 (e.g., `PF-849201`).

#### Q11: What are the primary feedback categories available in the system?
**Answer:** 
1. Roads & Footpaths
2. Street Lighting & Electrical
3. Public Parks & Green Spaces
4. Water Supply & Drainage
5. Waste Management & Sanitation
6. Public Restrooms

#### Q12: What are the lifecycle statuses of a feedback report?
**Answer:** 
1. **Pending:** Newly submitted, awaiting officer review.
2. **Under Review:** Assigned to an inspection team.
3. **In Progress:** Field maintenance crews are actively working.
4. **Resolved:** Work has been verified complete.

#### Q13: What does the Resident Portal (`index.html`) do?
**Answer:** It provides an introductory hero banner, a "How It Works" 4-step guide, an official feedback submission form, and a tracking search box where residents can look up their report status.

#### Q14: What does the Admin Dashboard (`admin.html`) do?
**Answer:** It provides an executive overview with 4 summary metric cards, a search and multi-filter toolbar, an interactive data table of all reports, a details modal window, and quick action buttons to resolve or delete records.

#### Q15: What is the "Mark as Completed" feature?
**Answer:** It is a single-click action in the Admin Dashboard that prompts the supervisor for confirmation and immediately updates an active complaint's status to "Resolved".

#### Q16: Can a complaint that is already "Resolved" be marked as completed again?
**Answer:** No. The "Mark as Completed" button is automatically disabled and displays `Completed ✓` for any record that is already resolved.

#### Q17: What visual tool does the resident see when tracking their complaint?
**Answer:** A linear 4-step visual **progress stepper** (`Submitted` → `Under Review` → `In Progress` → `Resolved`), with completed steps marked by green checkmarks.

#### Q18: What status message does a resident see when an issue is Pending?
**Answer:** *"Your feedback has been received and is awaiting review."*

#### Q19: What status message does a resident see when an issue is In Progress?
**Answer:** *"Your feedback is currently being addressed."*

#### Q20: What status message does a resident see when an issue is Resolved?
**Answer:** *"Your feedback has been marked as completed."*

#### Q21: Can an administrator delete a feedback submission?
**Answer:** Yes. From the Details Modal, the administrator can click "Delete Record", confirm the action via a prompt, and the record is permanently removed from `LocalStorage`.

#### Q22: What happens if a citizen enters an invalid or non-existent tracking code?
**Answer:** The system displays an informative message stating that no record was found for that specific ID and asks the resident to verify their reference code.

#### Q23: Is the application mobile-friendly?
**Answer:** Yes. It uses responsive CSS with media queries so layouts comfortably adapt between desktop monitors, tablets, and mobile phones.

#### Q24: What is the color palette theme of Public Voice?
**Answer:** A trustworthy, civic-inspired forest green color palette (`#236B50` primary green, `#174B39` deep pine, `#F8FAF8` off-white canvas, and `#FFFFFF` white cards).

#### Q25: What is the main academic takeaway of this project?
**Answer:** It proves that functional, accessible, and attractive enterprise software can be constructed using only native browser APIs without relying on complex external software libraries.

---

## Section 2: HTML Questions (25 Questions)

#### Q26: What does HTML stand for?
**Answer:** HyperText Markup Language. It is the standard code used to structure web pages.

#### Q27: What is the purpose of `<!DOCTYPE html>`?
**Answer:** It tells the browser that the document is written in modern HTML5 so it renders the page correctly using standard mode.

#### Q28: What is semantic HTML?
**Answer:** Semantic HTML means using tags that clearly describe their meaning to both the browser and developer (e.g., `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`) rather than generic `<div>` tags.

#### Q29: Where did you use semantic HTML in Public Voice?
**Answer:** We used `<header>` for top branding, `<nav>` for menus, `<main>` for primary page content, `<section>` for distinct page areas, `<article>` for statistic cards, `<aside>` for official notices, and `<footer>` for bottom links.

#### Q30: What is the difference between an `id` and a `class` in HTML?
**Answer:** An `id` is unique and should only appear once on a page (e.g., `id="feedback-form"`), while a `class` can be reused on multiple elements that share the same styling (e.g., `class="btn btn-primary"`).

#### Q31: What does the `<meta name="viewport" ...>` tag do?
**Answer:** It configures the browser's viewport width to match the device's physical screen width, preventing mobile phones from rendering desktop-sized pages that require pinch-to-zoom.

#### Q32: What does the `novalidate` attribute do on a `<form>` tag?
**Answer:** It disables the browser's default generic validation tooltips so our custom JavaScript validation logic can run and display styled error alerts.

#### Q33: Why is the `for` attribute in a `<label>` important?
**Answer:** It matches the `id` of an `<input>` element. When a user clicks or taps the label text, the browser automatically focuses the linked input field.

#### Q34: What is the purpose of `<input type="hidden">` in the Admin Modal?
**Answer:** It invisibly stores the current feedback ID (`id="modal-hidden-id"`) so the modal form knows exactly which record to update when the administrator clicks "Save Changes".

#### Q35: What is the difference between `<input>` and `<textarea>`?
**Answer:** An `<input type="text">` is for single-line entries (like a resident's name), whereas a `<textarea>` is for multi-line paragraphs (like a detailed description).

#### Q36: What does `<select>` and `<option>` do?
**Answer:** `<select>` creates a drop-down menu, and `<option>` defines each selectable item inside the menu.

#### Q37: What is the difference between `<button type="submit">` and `<button type="button">`?
**Answer:** A `type="submit"` button submits its enclosing form, while a `type="button"` has no default action and only triggers JavaScript event listeners when clicked.

#### Q38: What does `<button type="reset">` do?
**Answer:** It automatically resets all input fields inside its parent form back to their initial blank values.

#### Q39: What is the `required` attribute in HTML form inputs?
**Answer:** It indicates to assistive technologies and forms that the input must not be left empty before submission.

#### Q40: What is an ARIA attribute?
**Answer:** ARIA stands for Accessible Rich Internet Applications. ARIA attributes (like `aria-label`, `aria-hidden`, `aria-live`) provide extra accessibility context for screen readers used by visually impaired people.

#### Q41: What does `aria-live="polite"` do on the tracking result container?
**Answer:** It tells screen readers to announce new content that appears inside that container without rudely interrupting what the reader was already speaking.

#### Q42: What does `role="dialog"` and `aria-modal="true"` do on the modal?
**Answer:** It tells the operating system and screen reader that a pop-up window has opened, trapping focus inside it.

#### Q43: What does `aria-hidden="true"` do?
**Answer:** It tells screen readers to ignore decorative elements, such as emoji icons or background overlays, so they are not announced unnecessarily.

#### Q44: What is the difference between `<aside>` and `<section>`?
**Answer:** `<section>` represents a major standalone thematic block of content, whereas `<aside>` represents secondary or auxiliary information (like an official disclaimer banner or sidebar menu).

#### Q45: How does a link with `href="#submit-feedback"` work?
**Answer:** It is an internal anchor link. When clicked, the browser smoothly scrolls the page down to the element with `id="submit-feedback"`.

#### Q46: What does the `colspan="8"` attribute mean in a `<td>` cell?
**Answer:** It makes a single table cell stretch horizontally across all 8 columns of the table, used for displaying the "No feedback submissions found" empty state message.

#### Q47: What does `disabled selected` mean in a default `<option>`?
**Answer:** It displays a placeholder prompt (e.g., "Select a public facility...") that cannot be re-selected once a valid option is picked.

#### Q48: Why do we place `<script src="..." defer>` in the `<head>`?
**Answer:** The `defer` attribute downloads the script file in the background while the HTML is parsing, but waits to execute the script until the entire HTML document is fully built.

#### Q49: What is the `scope="col"` attribute in a `<th>` tag?
**Answer:** It explicitly declares that the table header cell applies to the entire column beneath it, improving accessibility for screen readers.

#### Q50: What is the difference between an inline element and a block element?
**Answer:** A block element (like `<div>`, `<p>`, `<h1>`) starts on a new line and stretches across the full width available. An inline element (like `<span>`, `<a>`, `<strong>`) only takes up as much width as its content and sits in line with text.

---

## Section 3: CSS Questions (25 Questions)

#### Q51: What does CSS stand for?
**Answer:** Cascading Style Sheets. It controls the visual presentation, formatting, and layout of an HTML document.

#### Q52: What are CSS Custom Properties (Variables)?
**Answer:** Reusable values defined with two dashes (e.g., `--primary: #236B50;`) that can be applied across a stylesheet using the `var()` function.

#### Q53: What is the benefit of defining CSS variables inside `:root`?
**Answer:** `:root` matches the root element of the document (`<html>`), making those variables globally accessible to every single selector in the stylesheet.

#### Q54: What does the CSS `box-sizing: border-box;` rule do?
**Answer:** It includes padding and borders inside the element's total calculated width and height, preventing layout breakage when adding padding to containers.

#### Q55: What is CSS Flexbox and where did you use it?
**Answer:** Flexbox (`display: flex;`) is a one-dimensional layout system used for aligning items along a row or column. We used it in navigation bars, card headers, button groups, and modal footers.

#### Q56: What does `justify-content: space-between;` do in Flexbox?
**Answer:** It distributes items evenly along the main horizontal axis, placing the first item against the start edge and the last item against the end edge.

#### Q57: What does `align-items: center;` do in Flexbox?
**Answer:** It vertically centers all child items along the cross axis.

#### Q58: What is CSS Grid and where did you use it?
**Answer:** CSS Grid (`display: grid;`) is a two-dimensional layout system organizing content into rows and columns. We used it for the statistics cards grid, form input columns, and metadata detail grids.

#### Q59: What does `grid-template-columns: repeat(4, 1fr);` mean?
**Answer:** It creates 4 equal-width columns, where each column takes up 1 fraction (`1fr`) of the total available width.

#### Q60: What does `grid-column: 1 / -1;` do?
**Answer:** It instructs an element to stretch all the way across from the first grid column line to the very last grid column line.

#### Q61: What is a CSS Media Query?
**Answer:** A conditional rule (e.g., `@media (max-width: 768px)`) that applies specific CSS styles only when the user's screen meets certain criteria, such as a narrow screen width.

#### Q62: What is the mobile breakpoint in Public Voice?
**Answer:** `768px` is our primary breakpoint. Screens below 768 pixels switch multi-column forms and cards into single-column vertical stacks.

#### Q63: What does `display: none;` do?
**Answer:** It completely hides the element from the screen and removes it from the document layout flow, as if it did not exist.

#### Q64: How does the modal pop-up open using CSS?
**Answer:** The modal overlay has `display: none;` by default. When JavaScript adds the `.active` class (`.modal-overlay.active`), its rule changes to `display: flex;`, making it visible and centered.

#### Q65: What does `position: fixed;` do on the modal overlay?
**Answer:** It pins the overlay to the browser window so that even if the user attempts to scroll, the overlay stays anchored to all four edges (`top: 0; left: 0; width: 100%; height: 100%;`).

#### Q66: What is `z-index` in CSS?
**Answer:** It specifies the stacking order of elements along the virtual 3D depth axis. An element with `z-index: 1000;` will appear on top of elements with lower z-index numbers.

#### Q67: What does the CSS `:hover` pseudo-class do?
**Answer:** It applies special styling when the user points their mouse cursor over an element (e.g., darkening a button's green background).

#### Q68: What does the CSS `:focus` pseudo-class do?
**Answer:** It applies styling when an element (like a textbox or button) receives keyboard focus or mouse clicks, such as showing an accessibility outline.

#### Q69: What does `cursor: pointer;` do?
**Answer:** It changes the mouse arrow into a pointing hand symbol when hovering over clickable elements like buttons and links.

#### Q70: What does `cursor: not-allowed;` do?
**Answer:** It changes the mouse arrow into a circle-with-a-slash symbol to communicate that a button is disabled.

#### Q71: What is the purpose of the `gap` property in Flexbox and Grid?
**Answer:** It automatically adds uniform spacing between neighboring child elements without needing manual margins.

#### Q72: What does `overflow-x: auto;` do on `.table-responsive`?
**Answer:** On small mobile screens where a wide data table cannot fit, it adds a smooth horizontal scrollbar so the user can swipe to view all columns without breaking the page layout.

#### Q73: Why are there no linear gradients or glassmorphism blurs in this project?
**Answer:** As specified in the design document (`PROJECT_DESIGN.md`), municipal portals prioritize trustworthiness, extreme legibility, high contrast, and accessibility over flashy visual trends.

#### Q74: What is the CSS `transition` property used for?
**Answer:** It smooths out changes between property values over a short duration (such as changing background colors over 0.15 seconds) so interactions feel polished.

#### Q75: What is the difference between `margin` and `padding`?
**Answer:** `padding` is the space *inside* the element's border, while `margin` is the clear space *outside* the element's border pushing other elements away.

---

## Section 4: JavaScript Questions (25 Questions)

#### Q76: What is Vanilla JavaScript?
**Answer:** Pure, native JavaScript written directly without using external libraries or frameworks such as jQuery, React, or Angular.

#### Q77: What does `'use strict';` do at the top of `script.js`?
**Answer:** It enables Strict Mode, which prevents common coding mistakes such as using undeclared variables or assigning values to read-only properties.

#### Q78: What is an IIFE (Immediately Invoked Function Expression)?
**Answer:** A function that runs as soon as it is defined: `(function () { ... })();`. It encapsulates all variables so they do not pollute or conflict with the global browser namespace.

#### Q79: What is the DOM (Document Object Model)?
**Answer:** The browser's structured tree representation of the HTML document. JavaScript interacts with the DOM to read, create, modify, or remove elements on the screen.

#### Q80: What does `document.getElementById('...')` do?
**Answer:** It searches the HTML document and returns the specific element that matches the provided unique ID.

#### Q81: What does `addEventListener('event', function)` do?
**Answer:** It sets up an event listener that waits for a specific user action (such as a `'click'`, `'submit'`, or `'input'`) and executes a callback function when that action occurs.

#### Q82: Why do we call `event.preventDefault()` inside a form submit handler?
**Answer:** Forms in HTML naturally refresh the entire webpage when submitted. `event.preventDefault()` stops that reload so JavaScript can validate and save data smoothly behind the scenes.

#### Q83: What is the difference between `textContent` and `innerHTML`?
**Answer:** `textContent` sets only plain text and treats code characters literally, preventing malicious script execution. `innerHTML` parses strings as live HTML tags, which introduces dangerous security risks (XSS).

#### Q84: What is an XSS (Cross-Site Scripting) attack?
**Answer:** A security vulnerability where an attacker types malicious `<script>` tags into a form input. If rendered via `innerHTML`, the browser executes the attacker's script. Public Voice uses `textContent` to eliminate this vulnerability.

#### Q85: What does the JavaScript `.trim()` method do?
**Answer:** It removes accidental spaces from the beginning and end of a text string (e.g., `"  PF-123456  "` becomes `"PF-123456"`).

#### Q86: What does `.toUpperCase()` do?
**Answer:** It converts all lowercase letters in a string to uppercase, enabling case-insensitive searches (so typing `"pf-1234"` matches `"PF-1234"`).

#### Q87: What does the `.unshift()` array method do?
**Answer:** It adds a new item to the **very beginning** of an array (index 0), pushing older items down so new complaints appear at the top.

#### Q88: What does the `.filter()` array method do?
**Answer:** It creates a brand-new array containing only the items that pass a specific true/false condition (used for searching and filtering complaints).

#### Q89: What does the `.find()` array method do?
**Answer:** It scans an array and returns the **first single item** that matches a condition (used when tracking a specific feedback ID).

#### Q90: What is the difference between `let` and `const`?
**Answer:** `const` is for variables whose reference will never be reassigned. `let` is for variables that may be reassigned later.

#### Q91: What is a JavaScript Object?
**Answer:** A collection of key-value pairs enclosed in curly braces `{}` representing an entity (e.g., our feedback report has keys like `id`, `name`, `status`, and `date`).

#### Q92: What does `document.createElement('tag')` do?
**Answer:** It creates a new HTML element node in the browser's memory, which can then be styled and appended to the visible page using `.appendChild()`.

#### Q93: What does `element.classList.add('active')` do?
**Answer:** It adds the CSS class `"active"` to the element, triggering any visual rules connected to that class.

#### Q94: What does `element.classList.remove('active')` do?
**Answer:** It removes the CSS class `"active"`, returning the element to its inactive styling.

#### Q95: What does `window.confirm('message')` do?
**Answer:** It opens a native browser confirmation modal with "OK" and "Cancel" buttons. It returns `true` if the user clicks OK, or `false` if they click Cancel.

#### Q96: What does `setTimeout(function, 5000)` do?
**Answer:** It schedules a function to run once after a specified delay in milliseconds (5000 milliseconds = 5 seconds), used to auto-hide the admin success toast banner.

#### Q97: What does `parseInt('2', 10)` do?
**Answer:** It converts the text string `"2"` into a real mathematical integer number `2` using base-10 radix.

#### Q98: How do we detect when the user presses the `Escape` key?
**Answer:** We listen to the global `keydown` event and check if `event.key === 'Escape'`. If true and the modal is open, we call `closeModal()`.

#### Q99: What does `document.addEventListener('DOMContentLoaded', init);` do?
**Answer:** It ensures that our JavaScript initialization code (`init`) does not run until the browser has completely parsed and constructed the HTML DOM tree.

#### Q100: What does `document.body.style.overflow = 'hidden';` do when a modal opens?
**Answer:** It disables scrolling on the main page background while the modal is open, preventing disorienting background movements.

---

## Section 5: LocalStorage Questions (15 Questions)

#### Q101: What is browser `LocalStorage`?
**Answer:** A built-in web storage API that lets web applications store key-value data persistently inside the user's browser with no expiration date.

#### Q102: What is the storage key used in Public Voice?
**Answer:** `'publicVoiceFeedback'`. Both the Resident Portal and the Admin Dashboard read and write exclusively to this single key.

#### Q103: Does data in `LocalStorage` disappear when the user closes their browser?
**Answer:** No. Unlike `SessionStorage` (which clears when a tab closes), `LocalStorage` data remains permanently until cleared by code or manually by the user.

#### Q104: What is the typical storage capacity limit of `LocalStorage`?
**Answer:** Approximately **5 Megabytes (MB)** per origin. In Public Voice, this is sufficient to hold thousands of text complaints.

#### Q105: What data types can `LocalStorage` directly store?
**Answer:** Only **strings** (plain text). It cannot store complex objects, arrays, or functions directly.

#### Q106: How do we store a JavaScript array of objects inside `LocalStorage`?
**Answer:** We use `JSON.stringify(array)` to convert the array of objects into a text string, then call `localStorage.setItem('publicVoiceFeedback', jsonString);`.

#### Q107: How do we read a stored array of objects back out of `LocalStorage`?
**Answer:** We call `localStorage.getItem('publicVoiceFeedback')`, which returns a text string, and then parse it back into JavaScript using `JSON.parse(string)`.

#### Q108: What does `JSON.stringify()` do?
**Answer:** It takes a JavaScript object or array and serializes it into a standard JSON-formatted text string.

#### Q109: What does `JSON.parse()` do?
**Answer:** It takes a JSON-formatted text string and deserializes it back into a native JavaScript object or array.

#### Q110: What happens if `JSON.parse()` receives invalid or corrupted text?
**Answer:** It throws a syntax error. To prevent our app from crashing, we wrap `JSON.parse()` inside a `try { ... } catch (error) { ... }` block that returns an empty array `[]` on error.

#### Q111: What does `localStorage.getItem('key')` return if the key does not exist?
**Answer:** It returns `null`.

#### Q112: What does `localStorage.removeItem('key')` do?
**Answer:** It deletes that specific key and all its associated data from storage.

#### Q113: What does `localStorage.clear()` do?
**Answer:** It wipes out every single key-value pair stored for that website origin.

#### Q114: Can another website read data stored by Public Voice in `LocalStorage`?
**Answer:** No. Web browsers enforce the **Same-Origin Policy**, which strictly isolates storage between different domains, protocols, and port numbers.

#### Q115: How does Public Voice initialize sample demo data for first-time visitors?
**Answer:** During page initialization, if `localStorage.getItem('publicVoiceFeedback') === null`, the system saves an array of realistic seed records (`SEED_FEEDBACKS`) so the evaluator sees sample data immediately.

---

## Section 6: Project Implementation Questions (15 Questions)

#### Q116: How are resident complaints synchronized with the Admin Dashboard?
**Answer:** Both portals read from the same `LocalStorage` key. When an admin updates a status or a citizen submits a complaint, the data is saved into that shared key, ensuring instant consistency.

#### Q117: What happens when an administrator clicks "Mark as Completed"?
**Answer:** 
1. The browser shows a confirmation dialog asking: *"Are you sure you want to mark feedback PF-XXXXXX as Completed (Resolved)?"*
2. If confirmed, the record's `status` changes to `"Resolved"`.
3. The change is saved to `LocalStorage` via `saveFeedback()`.
4. The table rows and statistics cards re-render immediately.
5. The button changes to a disabled `Completed ✓` button.
6. A green success toast banner appears at the top of the dashboard.

#### Q118: How does the system handle an empty search or no filter matches?
**Answer:** If no records match the criteria, `renderTable()` removes old rows and inserts a single table row with `<td colspan="8" class="empty-state">No feedback submissions found.</td>`.

#### Q119: How does the search bar work in the Admin Dashboard?
**Answer:** As the user types in `#search-input`, an `input` event triggers `renderTable()`. It converts the query to lowercase and checks if it appears in `item.id`, `item.name`, `item.facility`, `item.location`, or `item.description`.

#### Q120: How does the Category filter handle broad groups like "Complaint"?
**Answer:** A helper function `checkCategoryMatch()` checks if the selected filter is `"Complaint"`. If so, it matches subcategories including *Damage*, *Cleanliness*, *Safety Hazards*, and *Service Outages*.

#### Q121: How does the Filter Reset button work?
**Answer:** It sets `#search-input.value = ''` and resets the facility, category, and status dropdowns back to `'ALL'`, then calls `renderTable()` to show all records again.

#### Q122: How does the Resident Stepper know which step to highlight?
**Answer:** `createStepperElement(status)` checks the status string:
- If `"Submitted"` or `"Pending"`: Step 1 is active.
- If `"Under Review"`: Step 1 is completed (checkmarked), Step 2 is active.
- If `"In Progress"`: Steps 1 and 2 are completed, Step 3 is active.
- If `"Resolved"`: Steps 1, 2, and 3 are completed, and Step 4 is active.

#### Q123: What happens when an administrator deletes a record?
**Answer:** The system prompts the administrator for confirmation (`window.confirm`). If accepted, it filters out the record matching that ID using `.filter(f => f.id !== id)`, saves the remaining array to storage, re-renders the dashboard, and displays a deletion toast.

#### Q124: Why is the feedback form reset only after saving succeeds?
**Answer:** If storage fails (due to storage quota exhaustion or private browser restrictions), we do not want the citizen to lose what they typed. Clearing the form only happens after `saveFeedback()` returns `true`.

#### Q125: How does the modal prevent users from interacting with the background?
**Answer:** The dark overlay covers 100% of the viewport with a high `z-index`, and JavaScript sets `document.body.style.overflow = 'hidden'`, preventing the background page from scrolling.

#### Q126: What ways can a user close the Details Modal?
**Answer:** Four different ways:
1. Clicking the top-right close button (`&times;`).
2. Clicking the bottom "Cancel" button.
3. Clicking on the dark background overlay outside the modal box.
4. Pressing the `Escape` key on their physical keyboard.

#### Q127: How does Public Voice prevent duplicate code between resident and admin portals?
**Answer:** Both portals link to the exact same [js/script.js](file:///c:/Users/Bloodblade/Desktop/PROJECTS/response%20system/Public-Voice/js/script.js) and [css/style.css](file:///c:/Users/Bloodblade/Desktop/PROJECTS/response%20system/Public-Voice/css/style.css) files. Functions like `getFeedback()` and `saveFeedback()` serve as a single shared data engine.

#### Q128: What happens if a resident refreshes their browser after submitting feedback?
**Answer:** The submitted complaint remains safely preserved in `LocalStorage`. The resident can immediately re-enter their tracking code to view the live status.

#### Q129: What are the main limitations of the current implementation?
**Answer:** Data is stored locally within that specific web browser. To view reports across multiple devices or central offices, a back-end REST API and database (such as Node.js and PostgreSQL) would need to be added.

#### Q130: If you had two more weeks to work on this project, what would you add?
**Answer:**
1. Direct photo attachment so citizens can take pictures of potholes or leaks.
2. An interactive city map (using Leaflet.js) plotting complaint markers.
3. An export-to-CSV button allowing administrators to download monthly Excel reports.
4. Automated SMS or email notifications when an issue transitions to "Resolved".

