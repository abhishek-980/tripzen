const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// 1. Update renderCheckoutModal for bookingSuccessData with WhatsApp integration
const oldSuccessSectionRegex = /if \(state\.bookingSuccessData\) \{[\s\S]*?const pkg = TRIP_PACKAGES\.find\(\(item\) => item\.id === state\.checkoutPackageId\);/;

const newSuccessSection = `if (state.bookingSuccessData) {
    const data = state.bookingSuccessData;
    return \`
      <div class="checkout-modal-overlay" id="checkoutModalOverlay">
        <div class="checkout-modal-card">
          <div class="checkout-modal-header">
            <h3><span>🎉</span> <span>Booking Confirmed!</span></h3>
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
                  <span>Lead Contact</span>
                  <strong>\${escapeHtml(data.leadName || 'Traveler')} (+\${escapeHtml(data.formattedPhone || data.leadPhone)})</strong>
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

              <!-- WHATSAPP INTEGRATION SECTION -->
              <div class="whatsapp-booking-box">
                <div class="whatsapp-box-header">
                  <div class="whatsapp-brand-badge">
                    <span class="whatsapp-icon">💬</span>
                    <div>
                      <h4 class="whatsapp-box-title">WhatsApp Confirmation Message Ready</h4>
                      <p class="whatsapp-box-desc">All trip details, dates, reference code & itinerary generated for <strong>+\${escapeHtml(data.formattedPhone || data.leadPhone)}</strong></p>
                    </div>
                  </div>
                </div>

                <div class="whatsapp-btn-group">
                  <a
                    href="\${escapeHtml(data.whatsappUrl)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="whatsapp-action-btn"
                    id="openWhatsAppChatBtn"
                    title="Open WhatsApp chat with pre-filled booking confirmation"
                  >
                    <span>📲 Send / Open on WhatsApp (+\${escapeHtml(data.formattedPhone || data.leadPhone)})</span>
                  </a>
                  <button
                    type="button"
                    class="whatsapp-copy-btn"
                    id="copyBookingSummaryBtn"
                    title="Copy full booking summary message to clipboard"
                  >
                    📋 Copy Text
                  </button>
                </div>
                <div id="copySuccessFeedback" style="display: none; font-size: 0.8rem; color: #059669; font-weight: 700; text-align: center; margin-top: 8px;">
                  ✓ Copied full booking confirmation to clipboard!
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

if (oldSuccessSectionRegex.test(appJs)) {
  appJs = appJs.replace(oldSuccessSectionRegex, newSuccessSection);
  console.log('Updated renderCheckoutModal with WhatsApp confirmation UI');
} else {
  console.error('Could not match oldSuccessSectionRegex');
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

          const cleanPhone = (leadPhone || '9876543210').replace(/\\D/g, '');
          const formattedPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
          const bookingRef = (verifyResult && verifyResult.whatsapp && verifyResult.whatsapp.bookingRef) || \`TZ-\${Date.now().toString().slice(-6).toUpperCase()}\`;
          const bookingTime = (verifyResult && verifyResult.whatsapp && verifyResult.whatsapp.bookingTime) || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
          const itineraryUrl = (verifyResult && verifyResult.whatsapp && verifyResult.whatsapp.itineraryUrl) || (window.location.origin + (tripPackage.pdf || \`/itineraries/\${tripPackage.slug}.html\`));

          const fallbackMsg = [
            \`🏔️ *TRIPZEN OFFICIAL BOOKING CONFIRMATION* 🏔️\`,
            \`━━━━━━━━━━━━━━━━━━━━\`,
            \`Hi *\${leadName}*, your Himalayan trek booking is confirmed! 🎉\`,
            \`\`,
            \`📋 *TRIP & BOOKING DETAILS:*\`,
            \`• *Booking Ref:* \${bookingRef}\`,
            \`• *Trek / Package:* \${tripPackage.packageName}\`,
            \`• *Destination:* \${tripPackage.destination}\`,
            \`• *Operator:* \${tripPackage.company}\`,
            \`• *Travelers:* \${count} Person(s)\`,
            \`• *Departure Batch:* \${month}\`,
            \`• *Booking Date & Time:* \${bookingTime}\`,
            \`\`,
            \`💳 *PAYMENT SUMMARY:*\`,
            \`• *Total Amount Paid:* INR \${Number(orderData.payment.amount).toLocaleString('en-IN')}\`,
            \`• *Razorpay Payment ID:* \${response.razorpay_payment_id}\`,
            \`• *Payment Status:* 🔒 100% Verified & Confirmed\`,
            \`\`,
            \`📄 *OFFICIAL ITINERARY & GEAR GUIDE:*\`,
            \`\${itineraryUrl}\`,
            \`\`,
            \`📞 *24x7 TRIPZEN HIMALAYAN DESK:*\`,
            \`Need help or preparation tips? Reply to this message or call +91 98765 43210.\`,
            \`\`,
            \`See you on the mountains! 🥾⛺✨\`,
            \`_Tripzen Technologies Pvt. Ltd._\`,
          ].join('\\n');

          const whatsappUrl = (verifyResult && verifyResult.whatsapp && verifyResult.whatsapp.url) || \`https://api.whatsapp.com/send?phone=\${formattedPhone}&text=\${encodeURIComponent(fallbackMsg)}\`;
          const whatsappMessage = (verifyResult && verifyResult.whatsapp && verifyResult.whatsapp.message) || fallbackMsg;

          state.bookingSuccessData = {
            bookingRef,
            paymentId: response.razorpay_payment_id,
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
            itineraryUrl,
            whatsappUrl,
            whatsappMessage,
          };

          state.paymentStatus = \`🎉 Payment verified! Booking confirmed for \${tripPackage.packageName}.\`;
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
  console.log('Updated startPackagePayment with WhatsApp metadata and verification parsing');
} else {
  console.error('Could not match oldStartPaymentRegex');
}

// 3. Add event listeners for copy button in hydrateUI
const copyHandlerCode = `
  const copyBtn = document.getElementById('copyBookingSummaryBtn');
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

  const phoneInputEl = document.getElementById('checkoutLeadPhone');
  if (phoneInputEl) {
    phoneInputEl.addEventListener('input', (e) => {
      state.checkoutPhone = e.target.value.trim();
    });
  }
`;

if (!appJs.includes('copyBookingSummaryBtn')) {
  appJs = appJs.replace(
    "const doneBookingBtn = document.getElementById('doneBookingModalBtn');",
    copyHandlerCode + "\n  const doneBookingBtn = document.getElementById('doneBookingModalBtn');"
  );
  console.log('Added copyBookingSummaryBtn and checkoutLeadPhone event listeners');
}

fs.writeFileSync(appJsPath, appJs, 'utf8');
console.log('Successfully updated app.js for WhatsApp booking confirmation integration!');
