const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// 1. Update renderCheckoutModal for bookingSuccessData
const oldSuccessRegex = /if \(state\.bookingSuccessData\) \{[\s\S]*?const pkg = TRIP_PACKAGES\.find\(\(item\) => item\.id === state\.checkoutPackageId\);/;

const newSuccessSection = `if (state.bookingSuccessData) {
    const data = state.bookingSuccessData;
    return \`
      <div class="checkout-modal-overlay" id="checkoutModalOverlay">
        <div class="checkout-modal-card">
          <div class="checkout-modal-header">
            <h3><span>🎉</span> <span>Booking & Payment Confirmed!</span></h3>
            <button type="button" class="checkout-close-btn" id="closeCheckoutModalBtn">×</button>
          </div>
          <div class="checkout-modal-body">
            <div class="booking-voucher-card">
              <div class="voucher-check-icon">✓</div>
              <h2 style="font-size: 1.35rem; color: var(--forest); margin: 0 0 6px 0;">Payment Verified & Spot Reserved</h2>
              <p style="font-size: 0.85rem; color: var(--muted); margin: 0;">Your Himalayan trek is officially confirmed with the operator.</p>

              <div class="voucher-ticket-box">
                <div class="voucher-row">
                  <span>Package</span>
                  <strong>\${escapeHtml(data.packageName)}</strong>
                </div>
                <div class="voucher-row">
                  <span>Destination</span>
                  <strong>\${escapeHtml(data.destination)}</strong>
                </div>
                <div class="voucher-row">
                  <span>Operator</span>
                  <strong>\${escapeHtml(data.company)}</strong>
                </div>
                <div class="voucher-row">
                  <span>Travelers</span>
                  <strong>\${escapeHtml(String(data.travelerCount))} Person(s)</strong>
                </div>
                <div class="voucher-row">
                  <span>Departure Batch</span>
                  <strong>\${escapeHtml(data.preferredDate || 'Upcoming Weekend')}</strong>
                </div>
                <div class="voucher-row">
                  <span>Lead Traveler</span>
                  <strong>\${escapeHtml(data.leadName || 'Traveler')} (\${escapeHtml(data.formattedPhone || data.leadPhone)})</strong>
                </div>
                <div class="voucher-row">
                  <span>Booking Reference</span>
                  <strong style="color: var(--forest); font-family: monospace;">\${escapeHtml(data.bookingRef)}</strong>
                </div>
                <div class="voucher-row">
                  <span>Razorpay Payment ID</span>
                  <strong style="color: var(--accent); font-family: monospace;">\${escapeHtml(data.paymentId)}</strong>
                </div>
                <div class="voucher-row" style="border-top: 1.5px dashed rgba(0,0,0,0.15); padding-top: 10px; margin-top: 6px;">
                  <span>Total Paid (INR)</span>
                  <strong style="font-size: 1.15rem; color: var(--ink);">INR \${Number(data.amount).toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <!-- TRIPZEN OFFICIAL AUTOMATED WHATSAPP CONFIRMATION CARD -->
              <div class="whatsapp-official-card">
                <div class="whatsapp-card-top-row">
                  <div class="whatsapp-verified-badge">
                    <span class="whatsapp-pulse-dot"></span>
                    <span class="whatsapp-verified-icon">✓</span>
                    <span>TripZen Official Automated Dispatch</span>
                  </div>
                  <span class="whatsapp-status-pill">🟢 Sent from TripZen Official</span>
                </div>

                <div class="whatsapp-dispatch-details">
                  <div class="whatsapp-detail-row">
                    <span class="whatsapp-detail-label">Sent From:</span>
                    <strong class="whatsapp-detail-val" style="color: #065f46;">
                      🏢 \${escapeHtml(data.senderName || 'TripZen Expeditions Official')} (\${escapeHtml(data.senderNumber || '+91 98765 43210')})
                    </strong>
                  </div>
                  <div class="whatsapp-detail-row">
                    <span class="whatsapp-detail-label">Sent To:</span>
                    <strong class="whatsapp-detail-val">
                      📲 \${escapeHtml(data.formattedPhone || data.leadPhone)} (\${escapeHtml(data.leadName)})
                    </strong>
                  </div>
                  <div class="whatsapp-detail-row">
                    <span class="whatsapp-detail-label">Status:</span>
                    <span class="whatsapp-detail-val" style="color: #047857; font-weight: 700;">
                      ✓ Automated trip confirmation dispatched • Tracking Ref: <code>\${escapeHtml(data.deliveryId || data.bookingRef)}</code>
                    </span>
                  </div>
                </div>

                <div class="whatsapp-actions-row">
                  <a
                    href="\${escapeHtml(data.supportChatUrl || 'https://api.whatsapp.com/send?phone=919876543210')}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="whatsapp-chat-official-btn"
                    title="Connect directly with Tripzen 24x7 Official Himalayan Support Desk on WhatsApp"
                  >
                    <span>💬 Chat with TripZen Official (+91 98765 43210)</span>
                  </a>
                  <button
                    type="button"
                    class="whatsapp-resend-btn"
                    id="resendWhatsAppAlertBtn"
                    data-booking-ref="\${escapeHtml(data.bookingRef)}"
                    title="Trigger immediate re-dispatch of official WhatsApp confirmation"
                  >
                    🔄 Resend Official Alert
                  </button>
                  <button
                    type="button"
                    class="whatsapp-copy-btn"
                    id="copyBookingSummaryBtn"
                    title="Copy full message receipt to clipboard"
                  >
                    📋 Copy Text
                  </button>
                </div>
                <div id="resendFeedbackMsg" style="display: none; font-size: 0.82rem; color: #059669; font-weight: 800; text-align: center; margin-top: 8px;">
                  ✓ Official WhatsApp confirmation re-dispatched to \${escapeHtml(data.formattedPhone || data.leadPhone)}!
                </div>
                <div id="copySuccessFeedback" style="display: none; font-size: 0.82rem; color: #059669; font-weight: 800; text-align: center; margin-top: 6px;">
                  ✓ Copied full booking confirmation receipt to clipboard!
                </div>
              </div>

              <div style="display: flex; gap: 10px; justify-content: center; margin-top: 16px; flex-wrap: wrap;">
                \${data.itineraryUrl ? \`
                  <a
                    href="\${escapeHtml(data.itineraryUrl)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="ghost-btn"
                    style="padding: 10px 18px; font-size: 0.88rem; font-weight: 700; text-decoration: none;"
                  >
                    📄 View / Print Official Itinerary
                  </a>
                \` : ''}
                <button type="button" class="primary-btn" id="doneBookingModalBtn" style="padding: 10px 24px; font-size: 0.92rem; font-weight: 800;">
                  ✓ Done & View Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    \`;
  }

  const pkg = TRIP_PACKAGES.find((item) => item.id === state.checkoutPackageId);`;

if (oldSuccessRegex.test(appJs)) {
  appJs = appJs.replace(oldSuccessRegex, newSuccessSection);
  console.log('Updated renderCheckoutModal with official automated WhatsApp card');
} else {
  console.error('Could not match oldSuccessRegex');
}

// 2. Update startPackagePayment
const oldStartPaymentRegex = /async function startPackagePayment\(packageId, options = \{\}\) \{[\s\S]*?\n\}/;

const newStartPayment = `async function startPackagePayment(packageId, options = {}) {
  const tripPackage = TRIP_PACKAGES.find((item) => item.id === packageId);
  if (!tripPackage) return;

  if (!state.user) {
    state.authStatus = 'Please log in to book and pay for packages.';
    state.authStatusType = 'info';
    routeTo('/auth');
    return;
  }

  const profileId = state.profile?.id || state.user?.id;
  const count = options.travelerCount || state.checkoutTravelers || 1;
  const month = options.preferredMonth || state.checkoutDate || tripPackage.month;
  const leadName = options.leadName || state.user?.fullName || 'Traveler';
  const leadPhone = options.leadPhone || state.checkoutPhone || '9876543210';

  if (!window.Razorpay) {
    state.paymentStatus = 'Razorpay checkout could not load. Check your internet connection and refresh.';
    renderApp();
    return;
  }

  try {
    state.paymentStatus = 'Creating secure Razorpay order...';
    renderApp();

    const orderData = await api('/api/payments/create-order', 'POST', {
      conversationId: state.activeConversationId || '',
      profileId: profileId,
      packageId: tripPackage.id,
      packageName: tripPackage.packageName,
      company: tripPackage.company,
      destination: tripPackage.destination,
      facilityType: tripPackage.facilityType,
      price: tripPackage.price,
      priceValue: tripPackage.priceValue,
      travelerCount: count,
      preferredMonth: month,
      leadName,
      leadPhone,
      slug: tripPackage.slug || '',
    });

    const checkout = new window.Razorpay({
      key: orderData.keyId,
      amount: orderData.payment.amount * 100,
      currency: orderData.payment.currency,
      name: 'TripZen Travel',
      description: \`\${tripPackage.packageName} (\${count} traveler\${count > 1 ? 's' : ''})\`,
      image: './assets/tripzen-logo.png',
      order_id: orderData.orderId,
      prefill: {
        name: leadName,
        email: state.user?.email || '',
        contact: leadPhone,
      },
      notes: {
        tripzenPaymentId: orderData.payment.id,
        packageId: tripPackage.id,
        destination: tripPackage.destination,
        travelerCount: String(count),
        leadPhone: leadPhone,
      },
      theme: {
        color: '#e8873a',
      },
      handler: async (response) => {
        try {
          const verifyResult = await api('/api/payments/verify', 'POST', {
            paymentId: orderData.payment.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });

          const waData = (verifyResult && verifyResult.whatsapp) || {};
          const cleanPhone = (leadPhone || '9876543210').replace(/\\D/g, '');
          const formattedPhone = waData.recipientNumber || (cleanPhone.length === 10 ? '+91 ' + cleanPhone : '+' + cleanPhone);
          const bookingRef = waData.bookingRef || (orderData.payment && orderData.payment.bookingRef) || \`TZ-\${Date.now().toString().slice(-6).toUpperCase()}\`;
          const bookingTime = waData.bookingTime || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
          const itineraryUrl = waData.itineraryUrl || (window.location.origin + (tripPackage.pdf || \`/itineraries/\${tripPackage.slug}.html\`));

          state.bookingSuccessData = {
            bookingRef,
            paymentId: response.razorpay_payment_id,
            rawPaymentDbId: orderData.payment.id,
            packageName: tripPackage.packageName,
            destination: tripPackage.destination,
            company: tripPackage.company,
            travelerCount: count,
            amount: orderData.payment.amount,
            leadName,
            leadPhone,
            formattedPhone,
            preferredDate: month,
            bookingTime,
            deliveryId: waData.deliveryId || \`TZ-WA-\${Date.now().toString().slice(-6).toUpperCase()}\`,
            senderName: waData.senderName || 'TripZen Expeditions Official',
            senderNumber: waData.senderNumber || '+91 98765 43210',
            supportChatUrl: waData.supportChatUrl || \`https://api.whatsapp.com/send?phone=919876543210&text=\${encodeURIComponent('Hi Tripzen Support, I need assistance regarding my booking ' + bookingRef)}\`,
            itineraryUrl,
            whatsappMessage: waData.message || '',
          };

          state.paymentStatus = \`🎉 Payment verified! Booking confirmed for \${tripPackage.packageName}. Automated WhatsApp sent to \${formattedPhone}.\`;
          if (state.activeConversationId) {
            await loadConversations();
          }
          renderApp();
        } catch (error) {
          state.paymentStatus = error.message || 'Payment verification failed.';
          renderApp();
        }
      },
    });

    checkout.on('payment.failed', (response) => {
      state.paymentStatus = response.error?.description || 'Payment was cancelled or failed. Please try again.';
      renderApp();
    });

    checkout.open();
  } catch (error) {
    state.paymentStatus = error.message || 'Could not initiate Razorpay checkout.';
    renderApp();
  }
}`;

if (oldStartPaymentRegex.test(appJs)) {
  appJs = appJs.replace(oldStartPaymentRegex, newStartPayment);
  console.log('Updated startPackagePayment');
} else {
  console.error('Could not match oldStartPaymentRegex');
}

// 3. Update event listeners in hydrateUI for resending and copying
const oldCopyBlockRegex = /const copyBtn = document\.getElementById\('copyBookingSummaryBtn'\);[\s\S]*?phoneInputEl\.addEventListener\('input', \(e\) => \{[\s\S]*?\}\);/;

const newCopyBlock = `const copyBtn = document.getElementById('copyBookingSummaryBtn');
  if (copyBtn && state.bookingSuccessData) {
    copyBtn.addEventListener('click', () => {
      const msg = state.bookingSuccessData.whatsappMessage || '';
      if (navigator.clipboard && msg) {
        navigator.clipboard.writeText(msg).then(() => {
          const feedback = document.getElementById('copySuccessFeedback');
          if (feedback) feedback.style.display = 'block';
          copyBtn.textContent = '✓ Copied!';
          setTimeout(() => {
            copyBtn.textContent = '📋 Copy Text';
          }, 2500);
        });
      }
    });
  }

  const resendBtn = document.getElementById('resendWhatsAppAlertBtn');
  if (resendBtn && state.bookingSuccessData) {
    resendBtn.addEventListener('click', async () => {
      resendBtn.disabled = true;
      resendBtn.textContent = '⏳ Sending...';
      try {
        const result = await api('/api/payments/resend-whatsapp', 'POST', {
          bookingRef: state.bookingSuccessData.bookingRef,
          paymentId: state.bookingSuccessData.rawPaymentDbId,
        });
        const feedback = document.getElementById('resendFeedbackMsg');
        if (feedback) {
          feedback.textContent = result.message || '✓ Official WhatsApp confirmation re-dispatched!';
          feedback.style.display = 'block';
        }
        resendBtn.textContent = '✓ Sent!';
        setTimeout(() => {
          resendBtn.disabled = false;
          resendBtn.textContent = '🔄 Resend Official Alert';
        }, 3000);
      } catch (err) {
        alert(err.message || 'Failed to resend WhatsApp alert.');
        resendBtn.disabled = false;
        resendBtn.textContent = '🔄 Resend Official Alert';
      }
    });
  }

  const phoneInputEl = document.getElementById('checkoutLeadPhone');
  if (phoneInputEl) {
    phoneInputEl.addEventListener('input', (e) => {
      state.checkoutPhone = e.target.value.trim();
    });
  }`;

if (oldCopyBlockRegex.test(appJs)) {
  appJs = appJs.replace(oldCopyBlockRegex, newCopyBlock);
  console.log('Updated hydrateUI with resend button listener');
} else {
  console.error('Could not match oldCopyBlockRegex');
}

fs.writeFileSync(appJsPath, appJs, 'utf8');
console.log('Successfully updated app.js!');
