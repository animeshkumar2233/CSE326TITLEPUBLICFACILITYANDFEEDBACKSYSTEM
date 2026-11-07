/**
 * Public Facility Feedback System (Public Voice)
 * File: js/script.js
 * Comprehensive Client Script: Resident Portal & Admin Console
 *
 * Strictly Vanilla JavaScript (No Frameworks, No External Libraries)
 * Client-Side Persistence via LocalStorage (Key: "publicVoiceFeedback")
 */

(function () {
  'use strict';

  // Storage key for LocalStorage (Single source of truth)
  const STORAGE_KEY = 'publicVoiceFeedback';

  // Default seed data: provides realistic municipal records if storage is currently empty
  const SEED_FEEDBACKS = [
    {
      id: 'PF-849201',
      name: 'Anita Sharma',
      email: 'anita.sharma@example.com',
      facility: 'Water Supply & Drainage',
      location: 'Ward 12, South Cross Road, near Community Park',
      category: 'Damage / Broken Infrastructure',
      rating: 2,
      description: 'Major underground pipeline leakage causing continuous water overflow across the road for 48 hours.',
      date: '2026-11-05',
      status: 'In Progress',
      adminNotes: 'Inspection conducted on Nov 6. Maintenance squad assigned to replace cracked section.'
    },
    {
      id: 'PF-593021',
      name: 'David Miller',
      email: 'd.miller@example.org',
      facility: 'Street Lighting & Electrical',
      location: 'Park Avenue, Streetlight Pole #41',
      category: 'Service Outage / Malfunction',
      rating: 1,
      description: 'Streetlight has been flickering and completely non-functional at night, causing safety concerns.',
      date: '2026-11-04',
      status: 'Resolved',
      adminNotes: 'Field electrician replaced faulty LED fixture and wiring harness. Verified operational on Nov 5.'
    },
    {
      id: 'PF-284910',
      name: 'Farhan Ali',
      email: 'farhan.ali@example.com',
      facility: 'Waste Management & Sanitation',
      location: 'Central Market Square, East Gate',
      category: 'Cleanliness & Sanitation',
      rating: 2,
      description: 'Public waste bins overflowing since yesterday morning. Spillage is obstructing the pedestrian walkway.',
      date: '2026-11-04',
      status: 'Pending',
      adminNotes: 'Feedback logged into dispatch system. Assigned to morning sanitation pickup route.'
    },
    {
      id: 'PF-918234',
      name: 'Meera Patel',
      email: 'meera.p@example.net',
      facility: 'Public Parks & Green Spaces',
      location: 'Sunrise Municipal Park, Children Play Area',
      category: 'Safety Hazard / Urgent Risk',
      rating: 1,
      description: 'Broken metal swing chains and exposed rusty bolts near the toddler slide area.',
      date: '2026-11-03',
      status: 'Under Review',
      adminNotes: 'Safety team inspected and temporarily barricaded the damaged swings pending replacement parts.'
    }
  ];

  // In-memory reference populated from LocalStorage on page initialization
  let currentFeedbacks = [];

  /* --------------------------------------------------------------------------
     1. LocalStorage Integration Functions
     -------------------------------------------------------------------------- */

  /**
   * Retrieves feedback records from LocalStorage.
   * Safely parses JSON and returns an empty array if no records exist or on error.
   * @returns {Array} Array of feedback objects.
   */
  function getFeedback() {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (!storedData) {
        return [];
      }
      const parsedData = JSON.parse(storedData);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error('Error reading feedback from LocalStorage:', error);
      return [];
    }
  }

  /**
   * Converts the feedback array into JSON and saves it in LocalStorage.
   * Handles storage write errors (such as quota exceeded or restricted storage).
   * @param {Array} feedbackList - The array of feedback objects to store.
   * @returns {boolean} True if successfully saved, false if an error occurred.
   */
  function saveFeedback(feedbackList) {
    try {
      const jsonString = JSON.stringify(feedbackList);
      localStorage.setItem(STORAGE_KEY, jsonString);
      return true;
    } catch (error) {
      console.error('Error saving feedback to LocalStorage:', error);
      return false;
    }
  }

  /* --------------------------------------------------------------------------
     2. Utility & Helper Functions
     -------------------------------------------------------------------------- */

  /**
   * Generates a random unique feedback ID in the format PF-XXXXXX
   * Uses a random six-digit number (100000 to 999999).
   * @returns {string} The formatted feedback ID.
   */
  function generateFeedbackId() {
    const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
    return 'PF-' + randomSixDigits;
  }

  /**
   * Returns the current date in YYYY-MM-DD format.
   * @returns {string} Formatted date string.
   */
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Validates an email address format using standard pattern matching.
   * @param {string} email - The email address to test.
   * @returns {boolean} True if valid, false otherwise.
   */
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  /**
   * Creates a DOM element badge for status safely using textContent.
   * @param {string} status - Feedback status.
   * @returns {HTMLElement} The created span element.
   */
  function createStatusBadgeElement(status) {
    const badge = document.createElement('span');
    const s = (status || '').toLowerCase();
    let badgeClass = 'badge-pending';

    if (s === 'resolved') {
      badgeClass = 'badge-resolved';
    } else if (s === 'in progress') {
      badgeClass = 'badge-progress';
    } else if (s === 'under review') {
      badgeClass = 'badge-review';
    } else if (s === 'closed') {
      badgeClass = 'badge-closed';
    }

    badge.className = 'badge ' + badgeClass;
    badge.textContent = status || 'Pending';
    return badge;
  }

  /**
   * Displays an understandable validation or storage error message to the resident.
   * Creates or updates a message container directly above the form actions.
   * @param {string} message - The error message to display.
   */
  function showErrorMessage(message) {
    let errorBox = document.getElementById('form-validation-error');
    const formActions = document.querySelector('.form-actions');

    if (!errorBox) {
      errorBox = document.createElement('div');
      errorBox.id = 'form-validation-error';
      errorBox.style.backgroundColor = '#FDF2F2';
      errorBox.style.color = '#B3261E';
      errorBox.style.border = '1px solid #F5C6C3';
      errorBox.style.borderRadius = '4px';
      errorBox.style.padding = '10px 14px';
      errorBox.style.fontSize = '0.875rem';
      errorBox.style.fontWeight = '500';
      errorBox.style.marginBottom = '16px';
      errorBox.setAttribute('role', 'alert');

      if (formActions && formActions.parentNode) {
        formActions.parentNode.insertBefore(errorBox, formActions);
      }
    }

    errorBox.textContent = message;
    errorBox.style.display = 'block';
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /**
   * Clears any active error message.
   */
  function clearErrorMessage() {
    const errorBox = document.getElementById('form-validation-error');
    if (errorBox) {
      errorBox.textContent = '';
      errorBox.style.display = 'none';
    }
  }

  /**
   * Validates all required form values.
   * Checks for mandatory completion, valid email, rating range, and non-empty description.
   * @param {Object} formData - Collected and trimmed form values.
   * @returns {string|null} Error message if invalid, or null if validation passes.
   */
  function validateFormData(formData) {
    if (!formData.name) {
      return 'Please enter your full name.';
    }

    if (!formData.email) {
      return 'Please enter your email address.';
    }

    if (!isValidEmail(formData.email)) {
      return 'Please enter a valid email address (e.g., citizen@example.com).';
    }

    if (!formData.facility) {
      return 'Please select a facility type from the list.';
    }

    if (!formData.category) {
      return 'Please select a feedback category.';
    }

    if (!formData.location) {
      return 'Please specify the facility location or landmark.';
    }

    if (!formData.rating || isNaN(formData.rating) || formData.rating < 1 || formData.rating > 5) {
      return 'Please select a valid condition rating between 1 and 5.';
    }

    if (!formData.description) {
      return 'Please provide a detailed feedback description explaining the issue or observation.';
    }

    return null; // All validation checks passed
  }

  /**
   * Displays the success banner and shows the newly generated Feedback ID.
   * @param {string} feedbackId - The newly generated ID (PF-XXXXXX).
   */
  function showSuccessMessage(feedbackId) {
    const successBanner = document.getElementById('submission-success-banner');
    const idDisplay = document.getElementById('new-tracking-id-display');
    const trackingInput = document.getElementById('tracking-id');

    if (idDisplay) {
      idDisplay.textContent = feedbackId;
    }

    if (successBanner) {
      successBanner.classList.add('active');
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Auto-populate the tracking search box so the resident can easily reference it
    if (trackingInput) {
      trackingInput.value = feedbackId;
    }
  }

  /* --------------------------------------------------------------------------
     3. Form Submission Handling with LocalStorage Persistence
     -------------------------------------------------------------------------- */

  /**
   * Handles the feedback form submission event.
   * Collects input, validates data, creates the feedback object,
   * updates LocalStorage, and manages UI feedback.
   * @param {Event} event - The form submit event.
   */
  function handleFormSubmit(event) {
    event.preventDefault();

    // 1. Collect and trim all input values using the existing HTML IDs
    const nameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const facilitySelect = document.getElementById('facility-type');
    const categorySelect = document.getElementById('feedback-category');
    const locationInput = document.getElementById('facility-location');
    const ratingSelect = document.getElementById('rating');
    const descriptionInput = document.getElementById('feedback-description');

    const collectedData = {
      name: nameInput ? nameInput.value.trim() : '',
      email: emailInput ? emailInput.value.trim() : '',
      facility: facilitySelect ? facilitySelect.value : '',
      category: categorySelect ? categorySelect.value : '',
      location: locationInput ? locationInput.value.trim() : '',
      rating: ratingSelect ? parseInt(ratingSelect.value, 10) : NaN,
      description: descriptionInput ? descriptionInput.value.trim() : ''
    };

    // 2. Perform field validation
    const validationError = validateFormData(collectedData);

    if (validationError) {
      showErrorMessage(validationError);
      return;
    }

    // Clear any previous error message
    clearErrorMessage();

    // 3. Generate Feedback ID in format PF-XXXXXX
    const newId = generateFeedbackId();

    // 4. Create the feedback object according to specifications
    const feedbackObject = {
      id: newId,
      name: collectedData.name,
      email: collectedData.email,
      facility: collectedData.facility,
      location: collectedData.location,
      category: collectedData.category,
      rating: collectedData.rating,
      description: collectedData.description,
      date: getCurrentDate(),
      status: 'Pending',
      adminNotes: 'Feedback logged. Awaiting municipal officer review and triage.'
    };

    // 5. Retrieve existing feedback records from LocalStorage
    const existingFeedbackList = getFeedback();

    // 6. Add the new feedback record without deleting existing records
    existingFeedbackList.unshift(feedbackObject);

    // 7. Save the updated array to LocalStorage
    const saveSuccessful = saveFeedback(existingFeedbackList);

    // 8. Error handling: If saving fails, show error and NEVER show success
    if (!saveSuccessful) {
      showErrorMessage('Unable to save feedback to local storage. Please check your browser storage settings and try again.');
      return;
    }

    // Update in-memory reference
    currentFeedbacks = existingFeedbackList;

    // 9. Display success message and generated feedback ID
    showSuccessMessage(newId);

    // 10. Reset the form only after successful saving
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
      feedbackForm.reset();
    }
  }

  /* --------------------------------------------------------------------------
     4. Feedback Tracking System (Resident Portal)
     Safe DOM Construction (No innerHTML for user data)
     -------------------------------------------------------------------------- */

  /**
   * Creates a visual progress stepper DOM element for tracking resolution progress.
   * @param {string} status - The current status of the report.
   * @returns {HTMLElement} The constructed stepper element.
   */
  function createStepperElement(status) {
    const stepper = document.createElement('div');
    stepper.className = 'stepper';
    stepper.setAttribute('role', 'progressbar');

    const steps = ['Submitted', 'Under Review', 'In Progress', 'Resolved'];
    let activeIndex = 0;
    const s = (status || '').toLowerCase();
    if (s === 'under review') activeIndex = 1;
    else if (s === 'in progress') activeIndex = 2;
    else if (s === 'resolved' || s === 'closed') activeIndex = 3;

    stepper.setAttribute('aria-valuenow', String(activeIndex + 1));
    stepper.setAttribute('aria-valuemin', '1');
    stepper.setAttribute('aria-valuemax', '4');

    steps.forEach(function (stepName, idx) {
      const node = document.createElement('div');
      let nodeClass = 'step-node';
      if (idx < activeIndex) nodeClass += ' completed';
      else if (idx === activeIndex) nodeClass += ' active';
      node.className = nodeClass;

      const circle = document.createElement('div');
      circle.className = 'node-circle';
      circle.textContent = idx < activeIndex ? '✓' : String(idx + 1);

      const label = document.createElement('div');
      label.className = 'node-label';
      label.textContent = stepName;

      node.appendChild(circle);
      node.appendChild(label);
      stepper.appendChild(node);
    });

    return stepper;
  }

  /**
   * Safely displays the matching feedback details using DOM construction and textContent.
   * @param {Object} feedback - The matched feedback record.
   */
  function displayTrackingResult(feedback) {
    const container = document.getElementById('tracking-result');
    if (!container) return;

    // Clear previous results safely
    container.textContent = '';

    // 1. Header bar with reference ID and status badge
    const headerDiv = document.createElement('div');
    headerDiv.style.display = 'flex';
    headerDiv.style.justifyContent = 'space-between';
    headerDiv.style.alignItems = 'center';
    headerDiv.style.flexWrap = 'wrap';
    headerDiv.style.gap = '8px';

    const titleGroup = document.createElement('div');

    const titleHeading = document.createElement('h3');
    titleHeading.style.fontSize = '1.125rem';
    titleHeading.style.fontWeight = '700';
    titleHeading.style.color = 'var(--text-main)';
    titleHeading.textContent = 'Feedback Reference: ';

    const idSpan = document.createElement('span');
    idSpan.style.fontFamily = 'monospace';
    idSpan.style.color = 'var(--primary)';
    idSpan.textContent = feedback.id;
    titleHeading.appendChild(idSpan);

    const datePara = document.createElement('p');
    datePara.style.fontSize = '0.8125rem';
    datePara.style.color = 'var(--text-secondary)';
    datePara.textContent = 'Date Filed: ' + (feedback.date || 'N/A');

    titleGroup.appendChild(titleHeading);
    titleGroup.appendChild(datePara);

    const badgeWrap = document.createElement('div');
    badgeWrap.appendChild(createStatusBadgeElement(feedback.status));

    headerDiv.appendChild(titleGroup);
    headerDiv.appendChild(badgeWrap);
    container.appendChild(headerDiv);

    // 2. Clear Status Indicator Banner (TASK 4)
    // Pending: "Your feedback has been received and is awaiting review."
    // In Progress: "Your feedback is currently being addressed."
    // Resolved: "Your feedback has been marked as completed."
    const s = (feedback.status || '').toLowerCase();
    let statusText = 'Your feedback has been received and is awaiting review.';
    let statusClass = 'status-pending';
    let statusIcon = 'ℹ️';

    if (s === 'resolved' || s === 'closed') {
      statusText = 'Your feedback has been marked as completed.';
      statusClass = 'status-resolved';
      statusIcon = '✓';
    } else if (s === 'in progress' || s === 'under review') {
      statusText = 'Your feedback is currently being addressed.';
      statusClass = 'status-progress';
      statusIcon = '🔄';
    }

    const statusBanner = document.createElement('div');
    statusBanner.className = 'track-status-banner ' + statusClass;
    statusBanner.id = 'tracking-status-indicator';
    statusBanner.setAttribute('role', 'status');

    const iconSpan = document.createElement('span');
    iconSpan.style.fontSize = '1.125rem';
    iconSpan.textContent = statusIcon;
    statusBanner.appendChild(iconSpan);

    const textSpan = document.createElement('span');
    textSpan.className = 'status-message-text';
    textSpan.textContent = statusText;
    statusBanner.appendChild(textSpan);

    container.appendChild(statusBanner);

    // 3. Stepper Component
    container.appendChild(createStepperElement(feedback.status));

    // 4. Structured Details Grid (All values inserted safely using textContent)
    const grid = document.createElement('div');
    grid.className = 'result-detail-grid';
    grid.style.marginTop = '16px';

    const detailFields = [
      { label: 'Feedback ID', value: feedback.id },
      { label: 'Facility Type', value: feedback.facility || 'N/A' },
      { label: 'Facility Location', value: feedback.location || 'N/A' },
      { label: 'Feedback Category', value: feedback.category || 'N/A' },
      { label: 'Submission Date', value: feedback.date || 'N/A' },
      { label: 'Feedback Status', value: feedback.status || 'Pending' }
    ];

    detailFields.forEach(function (field) {
      const item = document.createElement('div');
      item.className = 'detail-item';

      const labelSpan = document.createElement('span');
      labelSpan.className = 'detail-label';
      labelSpan.textContent = field.label;

      const valueDiv = document.createElement('div');
      valueDiv.className = 'detail-value';
      valueDiv.textContent = field.value;

      item.appendChild(labelSpan);
      item.appendChild(valueDiv);
      grid.appendChild(item);
    });

    // Optional: Rating display if present
    if (feedback.rating) {
      const ratingItem = document.createElement('div');
      ratingItem.className = 'detail-item';

      const ratingLabel = document.createElement('span');
      ratingLabel.className = 'detail-label';
      ratingLabel.textContent = 'Condition Rating';

      const ratingValue = document.createElement('div');
      ratingValue.className = 'detail-value';
      ratingValue.textContent = feedback.rating + ' / 5';

      ratingItem.appendChild(ratingLabel);
      ratingItem.appendChild(ratingValue);
      grid.appendChild(ratingItem);
    }

    // Feedback Description (if present)
    if (feedback.description) {
      const descItem = document.createElement('div');
      descItem.className = 'detail-item';
      descItem.style.gridColumn = '1 / -1';

      const descLabel = document.createElement('span');
      descLabel.className = 'detail-label';
      descLabel.textContent = 'Description';

      const descValue = document.createElement('div');
      descValue.className = 'detail-value';
      descValue.style.fontWeight = '400';
      descValue.style.lineHeight = '1.5';
      descValue.style.marginTop = '4px';
      descValue.textContent = feedback.description;

      descItem.appendChild(descLabel);
      descItem.appendChild(descValue);
      grid.appendChild(descItem);
    }

    // Official Administrator Remarks (if present)
    if (feedback.adminNotes) {
      const notesBox = document.createElement('div');
      notesBox.className = 'admin-notes-box';

      const notesLabel = document.createElement('span');
      notesLabel.className = 'detail-label';
      notesLabel.style.color = 'var(--dark-green)';
      notesLabel.textContent = 'Official Remediation Remarks';

      const notesValue = document.createElement('p');
      notesValue.style.marginTop = '4px';
      notesValue.style.fontSize = '0.875rem';
      notesValue.style.color = 'var(--text-main)';
      notesValue.textContent = feedback.adminNotes;

      notesBox.appendChild(notesLabel);
      notesBox.appendChild(notesValue);
      grid.appendChild(notesBox);
    }

    container.appendChild(grid);
    container.classList.add('active');
  }

  /**
   * Displays an informative message when no matching feedback record is found.
   * Does NOT show an empty result card.
   * @param {string} searchId - The searched ID string.
   */
  function displayTrackingNotFound(searchId) {
    const container = document.getElementById('tracking-result');
    if (!container) return;

    container.textContent = '';

    const emptyBox = document.createElement('div');
    emptyBox.className = 'empty-state';

    const messagePara = document.createElement('p');
    const boldText = document.createElement('strong');
    boldText.textContent = 'No feedback record found for Reference ID: ';

    const idSpan = document.createElement('span');
    idSpan.style.fontFamily = 'monospace';
    idSpan.style.color = 'var(--primary)';
    idSpan.textContent = searchId;

    boldText.appendChild(idSpan);
    messagePara.appendChild(boldText);

    const hintPara = document.createElement('p');
    hintPara.style.fontSize = '0.875rem';
    hintPara.style.marginTop = '6px';
    hintPara.style.color = 'var(--text-secondary)';
    hintPara.textContent = 'Please verify the reference code (e.g., PF-849201) and try again, or submit a new feedback report.';

    emptyBox.appendChild(messagePara);
    emptyBox.appendChild(hintPara);
    container.appendChild(emptyBox);
    container.classList.add('active');
  }

  /**
   * Handles the tracking search submission event.
   * Trims whitespace, converts to uppercase, checks non-empty input,
   * searches LocalStorage records, and displays safe results.
   * @param {Event} event - The form submit event.
   */
  function handleTrackingSubmit(event) {
    event.preventDefault();
    const trackingInput = document.getElementById('tracking-id');
    const trackingResult = document.getElementById('tracking-result');

    if (!trackingInput || !trackingResult) return;

    // 1. Read input, remove whitespace, and convert to uppercase
    const rawValue = trackingInput.value || '';
    const searchId = rawValue.trim().toUpperCase();

    // 2. Prevent submission when the field is empty
    if (!searchId) {
      trackingResult.textContent = '';
      const emptyBox = document.createElement('div');
      emptyBox.className = 'empty-state';

      const warningPara = document.createElement('p');
      warningPara.textContent = 'Please enter a valid Feedback ID to track progress (e.g., PF-849201).';

      emptyBox.appendChild(warningPara);
      trackingResult.appendChild(emptyBox);
      trackingResult.classList.add('active');
      trackingInput.focus();
      return;
    }

    // 3. Retrieve feedback records using getFeedback()
    const allRecords = getFeedback();

    // 4. Search using unique feedback ID (case-insensitive)
    const match = allRecords.find(function (item) {
      return item.id && item.id.trim().toUpperCase() === searchId;
    });

    // 5. Display results safely or show not-found message
    if (match) {
      displayTrackingResult(match);
    } else {
      displayTrackingNotFound(searchId);
    }
  }

  /* --------------------------------------------------------------------------
     5. Admin Dashboard Dynamic Rendering (admin.html)
     Safe DOM Construction (createElement + textContent)
     -------------------------------------------------------------------------- */

  /**
   * Constructs an empty state table row using safe DOM methods.
   * @param {string} message - The empty state message.
   * @returns {HTMLTableRowElement} Constructed row element.
   */
  function createEmptyTableRow(message) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 8;
    td.className = 'empty-state';
    td.textContent = message || 'No feedback submissions found.';
    tr.appendChild(td);
    return tr;
  }

  /**
   * Safely constructs a table row for a single feedback record using createElement and textContent.
   * Strictly avoids unsafe innerHTML insertion.
   * @param {Object} item - The feedback record.
   * @param {Function} onSelect - Callback when "View Details" is clicked.
   * @param {Function} [onMarkCompleted] - Callback when "Mark as Completed" is clicked.
   * @returns {HTMLTableRowElement} Constructed table row.
   */
  function createFeedbackTableRow(item, onSelect, onMarkCompleted) {
    const tr = document.createElement('tr');

    // 1. Feedback ID
    const tdId = document.createElement('td');
    const spanId = document.createElement('span');
    spanId.className = 'table-tracking-id';
    spanId.textContent = item.id || '--';
    tdId.appendChild(spanId);
    tr.appendChild(tdId);

    // 2. Resident Name
    const tdName = document.createElement('td');
    const strongName = document.createElement('strong');
    strongName.textContent = item.name || 'Anonymous';
    tdName.appendChild(strongName);
    tr.appendChild(tdName);

    // 3. Facility
    const tdFacility = document.createElement('td');
    tdFacility.textContent = item.facility || 'N/A';
    tr.appendChild(tdFacility);

    // 4. Category
    const tdCategory = document.createElement('td');
    tdCategory.textContent = item.category || 'N/A';
    tr.appendChild(tdCategory);

    // 5. Description (truncated for table readability)
    const tdDesc = document.createElement('td');
    const fullDesc = item.description || 'No description provided';
    tdDesc.textContent = fullDesc.length > 55 ? fullDesc.substring(0, 55) + '...' : fullDesc;
    tdDesc.title = fullDesc;
    tr.appendChild(tdDesc);

    // 6. Submission Date
    const tdDate = document.createElement('td');
    tdDate.style.whiteSpace = 'nowrap';
    tdDate.textContent = item.date || 'N/A';
    tr.appendChild(tdDate);

    // 7. Status Badge
    const tdStatus = document.createElement('td');
    tdStatus.appendChild(createStatusBadgeElement(item.status));
    tr.appendChild(tdStatus);

    // 8. Actions (View Details & Mark as Completed)
    const tdActions = document.createElement('td');
    const actionsGroup = document.createElement('div');
    actionsGroup.className = 'table-actions-group';

    // View Details button
    const viewBtn = document.createElement('button');
    viewBtn.type = 'button';
    viewBtn.className = 'btn btn-secondary btn-sm view-details-btn';
    viewBtn.textContent = 'View Details';
    viewBtn.setAttribute('data-id', item.id || '');
    viewBtn.setAttribute('aria-label', 'View details for feedback ' + (item.id || ''));
    viewBtn.addEventListener('click', function () {
      if (typeof onSelect === 'function') {
        onSelect(item.id);
      }
    });
    actionsGroup.appendChild(viewBtn);

    // Mark as Completed action (TASK 1)
    const isResolved = (item.status || '').toLowerCase() === 'resolved';
    const completeBtn = document.createElement('button');
    completeBtn.type = 'button';
    completeBtn.setAttribute('data-id', item.id || '');

    if (isResolved) {
      completeBtn.className = 'btn btn-sm btn-completed-disabled';
      completeBtn.disabled = true;
      completeBtn.textContent = 'Completed ✓';
      completeBtn.setAttribute('aria-label', 'Feedback ' + (item.id || '') + ' is already completed');
      completeBtn.title = 'This feedback record is already resolved and completed.';
    } else {
      completeBtn.className = 'btn btn-primary btn-sm mark-completed-btn';
      completeBtn.textContent = 'Mark as Completed';
      completeBtn.setAttribute('aria-label', 'Mark feedback ' + (item.id || '') + ' as completed');
      completeBtn.title = 'Mark feedback ' + (item.id || '') + ' as Completed (Resolved)';
      completeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (typeof onMarkCompleted === 'function') {
          onMarkCompleted(item.id);
        }
      });
    }
    actionsGroup.appendChild(completeBtn);

    tdActions.appendChild(actionsGroup);
    tr.appendChild(tdActions);

    return tr;
  }

  /**
   * Initializes the Admin Dashboard: loads records from LocalStorage,
   * calculates statistics, dynamically renders the table, and connects filters.
   */
  function initAdminPortal() {
    const tableBody = document.getElementById('feedback-table-body');
    if (!tableBody) return;

    // Filter controls
    const searchInput = document.getElementById('search-input') || document.getElementById('admin-search-input');
    const facilityFilter = document.getElementById('facility-filter');
    const categoryFilter = document.getElementById('category-filter') || document.getElementById('admin-category-filter');
    const statusFilter = document.getElementById('status-filter') || document.getElementById('admin-status-filter');
    const resetFiltersBtn = document.getElementById('reset-filters-btn') || document.getElementById('admin-reset-filters');

    // Metrics elements
    const statTotal = document.getElementById('stat-total');
    const statPending = document.getElementById('stat-pending');
    const statProgress = document.getElementById('stat-progress');
    const statResolved = document.getElementById('stat-resolved');

    // Modal elements
    const modal = document.getElementById('feedback-modal') || document.getElementById('feedback-detail-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    const modalFeedbackId = document.getElementById('modal-feedback-id') || document.getElementById('modal-field-id');
    const modalSubmissionDate = document.getElementById('modal-submission-date') || document.getElementById('modal-field-date');
    const modalResidentName = document.getElementById('modal-resident-name') || document.getElementById('modal-field-citizen');
    const modalResidentEmail = document.getElementById('modal-resident-email') || document.getElementById('modal-field-contact');
    const modalFacility = document.getElementById('modal-facility') || document.getElementById('modal-field-facility');
    const modalCategory = document.getElementById('modal-category') || document.getElementById('modal-field-category');
    const modalLocation = document.getElementById('modal-location') || document.getElementById('modal-field-location');
    const modalRating = document.getElementById('modal-rating') || document.getElementById('modal-field-rating');
    const modalStatus = document.getElementById('modal-status');
    const modalDescription = document.getElementById('modal-description') || document.getElementById('modal-field-description');

    // Modal form controls for Status Update & Record Deletion
    const modalStatusForm = document.getElementById('modal-status-form');
    const modalHiddenId = document.getElementById('modal-hidden-id');
    const modalStatusSelect = document.getElementById('modal-status-select');
    const modalAdminNotes = document.getElementById('modal-admin-notes');
    const modalDeleteBtn = document.getElementById('modal-delete-btn');
    const modalCompleteBtn = document.getElementById('modal-complete-btn');
    const modalSaveBtn = document.getElementById('modal-save-btn');

    // Sidebar navigation links
    const navOverview = document.getElementById('nav-overview');
    const navAllFeedback = document.getElementById('nav-all-feedback');

    if (navOverview && navAllFeedback) {
      navOverview.addEventListener('click', function () {
        navOverview.classList.add('active');
        navAllFeedback.classList.remove('active');
      });

      navAllFeedback.addEventListener('click', function () {
        navAllFeedback.classList.add('active');
        navOverview.classList.remove('active');
      });
    }

    /**
     * Category match resolver supporting both broad categories (Complaint, Suggestion, Appreciation)
     * and specific category strings.
     * @param {string} itemCategory - Category of the record
     * @param {string} selectedCategory - Value from dropdown
     * @returns {boolean} True if matching
     */
    const complaintCategories = [
      'damage / broken infrastructure',
      'cleanliness & sanitation',
      'safety hazard / urgent risk',
      'service outage / malfunction',
      'complaint'
    ];

    function checkCategoryMatch(itemCategory, selectedCategory) {
      if (!selectedCategory || selectedCategory === 'ALL') return true;
      const itemCat = (itemCategory || '').toLowerCase().trim();
      const selCat = selectedCategory.toLowerCase().trim();

      if (selCat === 'complaint') {
        return complaintCategories.includes(itemCat) || itemCat.includes('complaint');
      }
      if (selCat === 'suggestion') {
        return itemCat === 'suggestion' || itemCat.includes('suggestion');
      }
      if (selCat === 'appreciation') {
        return itemCat === 'appreciation' || itemCat.includes('appreciation');
      }
      return itemCat === selCat;
    }

    /**
     * Status match resolver supporting In Progress (including Under Review)
     * and exact match.
     * @param {string} itemStatus - Status of the record
     * @param {string} selectedStatus - Value from dropdown
     * @returns {boolean} True if matching
     */
    function checkStatusMatch(itemStatus, selectedStatus) {
      if (!selectedStatus || selectedStatus === 'ALL') return true;
      const itemStat = (itemStatus || '').toLowerCase().trim();
      const selStat = selectedStatus.toLowerCase().trim();

      if (itemStat === selStat) return true;
      if (selStat === 'in progress' && itemStat === 'under review') return true;
      return false;
    }

    /**
     * Recalculates and updates the 4 dashboard metric cards
     * @param {Array} feedbacks - Current feedback list
     */
    function updateMetrics(feedbacks) {
      if (!statTotal) return;
      const list = Array.isArray(feedbacks) ? feedbacks : [];
      const total = list.length;
      const pending = list.filter(f => (f.status || '').toLowerCase() === 'pending').length;
      const inProgress = list.filter(f => {
        const s = (f.status || '').toLowerCase();
        return s === 'in progress' || s === 'under review';
      }).length;
      const resolved = list.filter(f => (f.status || '').toLowerCase() === 'resolved').length;

      statTotal.textContent = String(total);
      if (statPending) statPending.textContent = String(pending);
      if (statProgress) statProgress.textContent = String(inProgress);
      if (statResolved) statResolved.textContent = String(resolved);
    }

    /**
     * Filters, sorts, and renders table rows dynamically using safe DOM methods.
     */
    function renderTable() {
      // 1. Data retrieval: Reuse existing getFeedback() function with 'publicVoiceFeedback'
      const allFeedbacks = getFeedback();
      updateMetrics(allFeedbacks);

      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const selectedFacility = facilityFilter ? facilityFilter.value : 'ALL';
      const selectedCategory = categoryFilter ? categoryFilter.value : 'ALL';
      const selectedStatus = statusFilter ? statusFilter.value : 'ALL';

      // 2. Filter records (Search matching ID or Resident Name; optionally facility/description)
      let filtered = allFeedbacks.filter(item => {
        const matchQuery = !query ||
          (item.id && item.id.toLowerCase().includes(query)) ||
          (item.name && item.name.toLowerCase().includes(query)) ||
          (item.facility && item.facility.toLowerCase().includes(query)) ||
          (item.location && item.location.toLowerCase().includes(query)) ||
          (item.description && item.description.toLowerCase().includes(query));

        const matchFacility = selectedFacility === 'ALL' || item.facility === selectedFacility;
        const matchCategory = checkCategoryMatch(item.category, selectedCategory);
        const matchStatus = checkStatusMatch(item.status, selectedStatus);

        return matchQuery && matchFacility && matchCategory && matchStatus;
      });

      // Default sort: newest first
      filtered.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

      // 3. Clear existing table content safely
      tableBody.textContent = '';

      // 4. Empty state handling: If there are no feedback records, display clear message
      if (filtered.length === 0) {
        tableBody.appendChild(createEmptyTableRow('No feedback submissions found.'));
        return;
      }

      // 5. Dynamic rendering using createElement() and textContent
      filtered.forEach(item => {
        const row = createFeedbackTableRow(item, openModal, markFeedbackAsCompleted);
        tableBody.appendChild(row);
      });
    }

    let toastTimeout = null;
    /**
     * Displays a clean success message toast banner in the admin dashboard
     * @param {string} message - Success notification text
     */
    function showAdminSuccessMessage(message) {
      const banner = document.getElementById('admin-toast-banner');
      const messageEl = document.getElementById('admin-toast-message');
      if (!banner) return;

      if (messageEl) {
        messageEl.textContent = message;
      } else {
        banner.textContent = message;
      }

      banner.classList.add('active');
      banner.style.display = 'flex';
      banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }
      toastTimeout = setTimeout(function () {
        banner.classList.remove('active');
        banner.style.display = 'none';
      }, 5000);
    }

    /**
     * Marks feedback submission as completed (Resolved)
     * Prompts confirmation, updates record in LocalStorage, refreshes table, metrics, and displays success banner.
     * @param {string} id - Feedback ID
     */
    function markFeedbackAsCompleted(id) {
      if (!id) return;
      const feedbacks = getFeedback();
      const target = feedbacks.find(f => f.id === id);
      if (!target) return;

      // Disable or ignore if already resolved
      if ((target.status || '').toLowerCase() === 'resolved') {
        return;
      }

      const confirmed = window.confirm('Are you sure you want to mark feedback ' + id + ' as Completed (Resolved)?');
      if (!confirmed) return;

      target.status = 'Resolved';
      if (!target.adminNotes || target.adminNotes.trim() === '' || target.adminNotes.includes('Awaiting municipal officer review')) {
        target.adminNotes = 'Work has been marked as completed and verified by municipal administration.';
      }

      saveFeedback(feedbacks);
      currentFeedbacks = feedbacks;

      renderTable();

      // If details modal is currently open for this item, refresh its contents
      if (modalHiddenId && modalHiddenId.value === id && modal && modal.classList.contains('active')) {
        openModal(id);
      }

      showAdminSuccessMessage('Feedback ' + id + ' has been marked as Completed (Resolved).');
    }

    /**
     * Opens the feedback details modal dialog
     * @param {string} id - The feedback ID to inspect
     */
    function openModal(id) {
      if (!modal) return;
      const feedbacks = getFeedback();
      const item = feedbacks.find(f => f.id === id);
      if (!item) return;

      if (modalFeedbackId) modalFeedbackId.textContent = item.id;
      if (modalSubmissionDate) modalSubmissionDate.textContent = item.date || 'N/A';
      if (modalResidentName) modalResidentName.textContent = item.name || 'Anonymous';
      if (modalResidentEmail) modalResidentEmail.textContent = item.email || 'None';
      if (modalFacility) modalFacility.textContent = item.facility || 'N/A';
      if (modalCategory) modalCategory.textContent = item.category || 'N/A';
      if (modalLocation) modalLocation.textContent = item.location || 'N/A';
      if (modalRating) modalRating.textContent = item.rating ? `${item.rating} / 5` : 'N/A';
      if (modalStatus) {
        modalStatus.textContent = '';
        modalStatus.appendChild(createStatusBadgeElement(item.status));
      }
      if (modalDescription) modalDescription.textContent = item.description || 'No description provided.';

      // Populate administrative form controls
      if (modalHiddenId) modalHiddenId.value = item.id;
      if (modalStatusSelect) {
        let matched = false;
        for (let i = 0; i < modalStatusSelect.options.length; i++) {
          if (modalStatusSelect.options[i].value.toLowerCase() === (item.status || '').toLowerCase()) {
            modalStatusSelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched && modalStatusSelect.options.length > 0) {
          modalStatusSelect.value = item.status || 'Pending';
        }
      }
      if (modalAdminNotes) modalAdminNotes.value = item.adminNotes || '';

      // Update Mark as Completed button inside modal
      if (modalCompleteBtn) {
        const isResolved = (item.status || '').toLowerCase() === 'resolved';
        if (isResolved) {
          modalCompleteBtn.disabled = true;
          modalCompleteBtn.className = 'btn btn-sm btn-completed-disabled';
          modalCompleteBtn.textContent = 'Completed ✓';
          modalCompleteBtn.title = 'This feedback record is already resolved and completed.';
        } else {
          modalCompleteBtn.disabled = false;
          modalCompleteBtn.className = 'btn btn-primary btn-sm';
          modalCompleteBtn.textContent = 'Mark as Completed';
          modalCompleteBtn.title = 'Mark this feedback as Completed (Resolved)';
        }
      }

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (modalCloseBtn) {
        modalCloseBtn.focus();
      }
    }

    /**
     * Closes the feedback details modal dialog and restores page scrolling
     */
    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    /**
     * Handles administrative status and remediation notes updates
     * @param {Event} [e] - Form submit event
     */
    function handleStatusUpdate(e) {
      if (e) e.preventDefault();
      const id = modalHiddenId ? modalHiddenId.value : '';
      if (!id) return;

      const newStatus = modalStatusSelect ? modalStatusSelect.value : 'Pending';
      const newNotes = modalAdminNotes ? modalAdminNotes.value.trim() : '';

      const feedbacks = getFeedback();
      const targetIndex = feedbacks.findIndex(f => f.id === id);
      if (targetIndex !== -1) {
        feedbacks[targetIndex].status = newStatus;
        feedbacks[targetIndex].adminNotes = newNotes;
        saveFeedback(feedbacks);
        currentFeedbacks = feedbacks;
      }

      closeModal();
      renderTable();
      showAdminSuccessMessage('Feedback ' + id + ' updated to status "' + newStatus + '".');
    }

    /**
     * Handles deleting a single feedback record after confirmation prompt
     */
    function handleDeleteFeedback() {
      const id = modalHiddenId ? modalHiddenId.value : '';
      if (!id) return;

      const confirmed = window.confirm('Are you sure you want to delete feedback record ' + id + '? This action cannot be undone.');
      if (!confirmed) return;

      const feedbacks = getFeedback();
      const updatedFeedbacks = feedbacks.filter(f => f.id !== id);
      saveFeedback(updatedFeedbacks);
      currentFeedbacks = updatedFeedbacks;

      closeModal();
      renderTable();
      showAdminSuccessMessage('Feedback ' + id + ' has been deleted.');
    }

    // Modal close listeners
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);

    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    // Close on Escape key press
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Wire status update form and save button
    if (modalStatusForm) {
      modalStatusForm.addEventListener('submit', handleStatusUpdate);
    }
    if (modalSaveBtn) {
      modalSaveBtn.addEventListener('click', function (e) {
        if (modalStatusForm && modalSaveBtn.getAttribute('form') !== 'modal-status-form') {
          handleStatusUpdate(e);
        }
      });
    }

    // Wire delete feedback button
    if (modalDeleteBtn) {
      modalDeleteBtn.addEventListener('click', handleDeleteFeedback);
    }

    // Wire mark as completed button in modal
    if (modalCompleteBtn) {
      modalCompleteBtn.addEventListener('click', function () {
        const id = modalHiddenId ? modalHiddenId.value : '';
        if (id) {
          markFeedbackAsCompleted(id);
        }
      });
    }

    // Filter and search change listeners
    if (searchInput) searchInput.addEventListener('input', renderTable);
    if (facilityFilter) facilityFilter.addEventListener('change', renderTable);
    if (categoryFilter) categoryFilter.addEventListener('change', renderTable);
    if (statusFilter) statusFilter.addEventListener('change', renderTable);

    // Reset filters button listener
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', function () {
        if (searchInput) searchInput.value = '';
        if (facilityFilter) facilityFilter.value = 'ALL';
        if (categoryFilter) categoryFilter.value = 'ALL';
        if (statusFilter) statusFilter.value = 'ALL';
        renderTable();
      });
    }

    // Initial render on admin page load
    renderTable();
  }

  /* --------------------------------------------------------------------------
     6. Mobile Navigation (Resident Portal)
     -------------------------------------------------------------------------- */

  function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (toggleBtn && mainNav) {
      toggleBtn.addEventListener('click', function () {
        const isOpen = mainNav.classList.toggle('mobile-open');
        toggleBtn.setAttribute('aria-expanded', isOpen);
      });
    }
  }

  /* --------------------------------------------------------------------------
     7. Page Initialization
     -------------------------------------------------------------------------- */

  function init() {
    // If LocalStorage has never been seeded/initialized, provide initial municipal sample records
    if (localStorage.getItem(STORAGE_KEY) === null) {
      saveFeedback(SEED_FEEDBACKS);
    }

    // Retrieve existing feedback on page load into in-memory reference
    currentFeedbacks = getFeedback();
    console.log('Public Voice initialized. Loaded records from LocalStorage:', currentFeedbacks.length);

    // Initialize Resident Portal features if elements exist on current page
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
      feedbackForm.addEventListener('submit', handleFormSubmit);

      feedbackForm.addEventListener('reset', function () {
        clearErrorMessage();
      });
    }

    const trackingForm = document.getElementById('tracking-form');
    if (trackingForm) {
      trackingForm.addEventListener('submit', handleTrackingSubmit);
    }

    initMobileNav();

    // Initialize Admin Portal features if table exists on current page
    if (document.getElementById('feedback-table-body')) {
      initAdminPortal();
    }
  }

  // Attach initialization to DOMContentLoaded
  document.addEventListener('DOMContentLoaded', init);

})();
