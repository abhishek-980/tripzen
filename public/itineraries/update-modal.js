const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// 1. Add itineraryPackageId to state
if (!appJs.includes('itineraryPackageId:')) {
  appJs = appJs.replace(
    "checkoutPackageId: '',",
    "checkoutPackageId: '',\n  itineraryPackageId: '',"
  );
  console.log('Added itineraryPackageId to state');
}

// 2. Update package card bottom action buttons
const oldCardActions = `<div class="package-bottom-actions" style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                    \${tripPackage.pdf ? \`
                      <a
                        href="\${escapeHtml(tripPackage.pdf)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="ghost-btn"
                        style="padding: 7px 12px; font-size: 0.82rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;"
                        title="Download official PDF Itinerary"
                      >
                        📄 PDF
                      </a>
                    \` : ''}
                    <button
                      type="button"
                      class="primary-btn pay-btn"
                      style="padding: 8px 16px; font-size: 0.88rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;"
                      data-open-checkout="\${escapeHtml(tripPackage.id)}"
                    >
                      <span>⚡ Book Now</span>
                    </button>
                  </div>`;

const newCardActions = `<div class="package-bottom-actions" style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                    <button
                      type="button"
                      class="ghost-btn"
                      style="padding: 7px 11px; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;"
                      data-open-itinerary="\${escapeHtml(tripPackage.id)}"
                      title="View detailed day-by-day itinerary"
                    >
                      📄 Itinerary
                    </button>
                    \${tripPackage.pdf ? \`
                      <a
                        href="\${escapeHtml(tripPackage.pdf)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="ghost-btn"
                        style="padding: 7px 10px; font-size: 0.82rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;"
                        title="Open Tripzen PDF / Printable document in new tab"
                      >
                        🖨️ PDF
                      </a>
                    \` : ''}
                    <button
                      type="button"
                      class="primary-btn pay-btn"
                      style="padding: 8px 16px; font-size: 0.88rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;"
                      data-open-checkout="\${escapeHtml(tripPackage.id)}"
                    >
                      <span>⚡ Book Now</span>
                    </button>
                  </div>`;

if (appJs.includes(oldCardActions)) {
  appJs = appJs.replace(oldCardActions, newCardActions);
  console.log('Updated package card bottom action buttons');
}

// 3. Update root.innerHTML to include renderItineraryModal()
if (!appJs.includes('${renderItineraryModal()}')) {
  appJs = appJs.replace(
    '${renderCheckoutModal()}',
    '${renderCheckoutModal()}\n    ${renderItineraryModal()}'
  );
  console.log('Added renderItineraryModal to root.innerHTML');
}

// 4. Add openItineraryModal, closeItineraryModal, renderItineraryModal
const itineraryFunctions = `
function openItineraryModal(packageId) {
  state.itineraryPackageId = packageId;
  renderApp();
}

function closeItineraryModal() {
  state.itineraryPackageId = '';
  renderApp();
}

function renderItineraryModal() {
  if (!state.itineraryPackageId) return '';
  const pkg = TRIP_PACKAGES.find((item) => item.id === state.itineraryPackageId);
  if (!pkg) return '';

  const pkgCover = pkg.image && (pkg.image.endsWith('.mov') || pkg.image.endsWith('.mp4')) ? './assets/tripzen-logo.png' : pkg.image;

  return \`
    <div class="checkout-modal-overlay" id="itineraryModalOverlay">
      <div class="itinerary-modal-card">
        <div class="itinerary-modal-hero" style="background-image: linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.45)), url('\${escapeHtml(pkgCover)}');">
          <button type="button" class="checkout-close-btn itinerary-close-btn" id="closeItineraryModalBtn">×</button>
          <div class="itinerary-modal-badges">
            <span class="package-card-badge">Verified Tripzen Operator</span>
            <span class="package-difficulty-badge \${escapeHtml((pkg.difficulty || '').toLowerCase())}">⛰️ \${escapeHtml(pkg.difficulty)}</span>
            <span class="package-card-badge" style="background: rgba(255,255,255,0.2); color: #fff;">⏱️ \${escapeHtml(pkg.duration)}</span>
          </div>
          <h2 class="itinerary-modal-title">\${escapeHtml(pkg.packageName)}</h2>
          <p class="itinerary-modal-subtitle">📍 \${escapeHtml(pkg.destination)} • Operated by <strong>\${escapeHtml(pkg.company)}</strong></p>
        </div>

        <div class="itinerary-modal-body">
          <div class="itinerary-facts-strip">
            <div class="itinerary-fact-item">
              <span class="itinerary-fact-label">Altitude</span>
              <strong class="itinerary-fact-val">\${escapeHtml(pkg.altitude || pkg.distance || 'Himalayan Range')}</strong>
            </div>
            <div class="itinerary-fact-item">
              <span class="itinerary-fact-label">Departure</span>
              <strong class="itinerary-fact-val">\${escapeHtml(pkg.departure)}</strong>
            </div>
            <div class="itinerary-fact-item">
              <span class="itinerary-fact-label">Batch Dates</span>
              <strong class="itinerary-fact-val">\${escapeHtml(pkg.dates || pkg.month)}</strong>
            </div>
            <div class="itinerary-fact-item">
              <span class="itinerary-fact-label">Meals</span>
              <strong class="itinerary-fact-val">All Veg Meals Included</strong>
            </div>
          </div>

          <div class="itinerary-overview-box">
            <p>\${escapeHtml(pkg.description)}</p>
          </div>

          \${pkg.days && pkg.days.length > 0 ? \`
            <div class="itinerary-timeline-section">
              <h3 class="itinerary-section-heading">📅 Day-by-Day Trek Schedule</h3>
              <div class="itinerary-timeline">
                \${pkg.days.map((d) => \`
                  <div class="itinerary-day-box">
                    <div class="itinerary-day-header">
                      <span class="itinerary-day-pill">DAY \${d.day}</span>
                      <strong class="itinerary-day-title">\${escapeHtml(d.title)}</strong>
                      <span class="itinerary-day-alt">🏔️ \${escapeHtml(d.altitude || '')}</span>
                    </div>
                    <div class="itinerary-day-content">
                      <p>\${escapeHtml(d.details)}</p>
                      <div class="itinerary-day-meta">
                        <span>🍽️ <strong>Meals:</strong> \${escapeHtml(d.meals || 'Included')}</span>
                        <span>⛺ <strong>Stay:</strong> \${escapeHtml(d.stay || 'Alpine Camps')}</span>
                      </div>
                    </div>
                  </div>
                \`).join('')}
              </div>
            </div>
          \` : ''}

          <div class="itinerary-two-col">
            <div class="itinerary-col-box">
              <h4 style="color: var(--forest); margin: 0 0 10px 0; font-weight: 800;">✓ Inclusions</h4>
              <ul class="itinerary-checklist-ul">
                \${(pkg.includes || []).map((inc) => \`<li>\${escapeHtml(inc)}</li>\`).join('')}
              </ul>
            </div>
            <div class="itinerary-col-box">
              <h4 style="color: #ef4444; margin: 0 0 10px 0; font-weight: 800;">✕ Exclusions</h4>
              <ul class="itinerary-checklist-ul exclusions">
                <li>Personal trekking gear (hiking shoes, thermal layers)</li>
                <li>Luggage offloading / personal mule charges</li>
                <li>Meals during road transit on highways</li>
                <li>Emergency medical evacuation & insurance</li>
              </ul>
            </div>
          </div>

          <div class="itinerary-actions-bar">
            <div class="itinerary-price-block">
              <div class="itinerary-price-val">\${escapeHtml(pkg.price)}</div>
              <div class="itinerary-price-sub">per person • taxes included</div>
            </div>
            <div class="itinerary-cta-btns">
              <a
                href="\${escapeHtml(pkg.pdf || \`/itineraries/\${pkg.slug}.html\`)}"
                target="_blank"
                rel="noopener noreferrer"
                class="ghost-btn"
                style="padding: 10px 18px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;"
              >
                🖨️ Open / Print PDF
              </a>
              <button
                type="button"
                class="primary-btn pay-btn"
                id="bookFromItineraryBtn"
                data-pkg-id="\${escapeHtml(pkg.id)}"
                style="padding: 10px 22px; font-weight: 800; font-size: 0.95rem;"
              >
                ⚡ Instant Book (\${escapeHtml(pkg.price)})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`;
}
`;

if (!appJs.includes('function openItineraryModal')) {
  appJs = appJs.replace(
    'function openCheckoutModal(packageId) {',
    itineraryFunctions + '\nfunction openCheckoutModal(packageId) {'
  );
  console.log('Added openItineraryModal, closeItineraryModal, renderItineraryModal');
}

// 5. Add event listener bindings in hydrateUI()
const itineraryEvents = `
  document.querySelectorAll('[data-open-itinerary]').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      openItineraryModal(button.getAttribute('data-open-itinerary'));
    });
  });

  const closeItineraryBtn = document.getElementById('closeItineraryModalBtn');
  if (closeItineraryBtn) {
    closeItineraryBtn.addEventListener('click', closeItineraryModal);
  }

  const bookFromItineraryBtn = document.getElementById('bookFromItineraryBtn');
  if (bookFromItineraryBtn) {
    bookFromItineraryBtn.addEventListener('click', () => {
      const pkgId = bookFromItineraryBtn.getAttribute('data-pkg-id');
      closeItineraryModal();
      openCheckoutModal(pkgId);
    });
  }
`;

if (!appJs.includes("data-open-itinerary')")) {
  appJs = appJs.replace(
    "document.querySelectorAll('[data-open-checkout]').forEach((button) => {",
    itineraryEvents + "\n  document.querySelectorAll('[data-open-checkout]').forEach((button) => {"
  );
  console.log('Added itinerary event listeners');
}

fs.writeFileSync(appJsPath, appJs, 'utf8');
console.log('Successfully updated app.js!');
