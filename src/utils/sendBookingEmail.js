/**
 * Sends a booking notification email via Brevo (Sendinblue) API.
 * This triggers TWO separate emails:
 * 1. A Notification to Kabir Ghamawala (Admin)
 * 2. A Confirmation to the Customer (User)
 */
export async function sendBookingEmail({ name, email, destination, tour, travelDate, travelers, travelStyle }) {
  const NOTIFY_EMAIL = import.meta.env.VITE_NOTIFY_EMAIL || 'kabirghamawala8605@gmail.com';

  const htmlContent = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#111;color:#f5f5f5;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#f0a500,#e07b00);padding:32px 40px;text-align:center;">
        <h1 style="margin:0;font-size:28px;color:#111;letter-spacing:-0.5px;">✈️ Booking Confirmed</h1>
        <p style="margin:8px 0 0;color:#111;opacity:0.8;font-size:14px;">Yatrika Travel</p>
      </div>
      <div style="padding:36px 40px;">
        <p style="color:#f5f5f5;font-size:16px;">Hello <strong>${name}</strong>,</p>
        <p style="color:#aaa;font-size:15px;line-height:1.6;">Thank you for booking with Yatrika! We have received your request and our travel experts are already working on your itinerary.</p>
        
        <table style="width:100%;border-collapse:collapse;margin-top:24px;">
          <tr><td colspan="2" style="padding-bottom:12px;">
            <h2 style="margin:0;font-size:18px;color:#f0a500;border-bottom:1px solid #333;padding-bottom:8px;">Trip Details</h2>
          </td></tr>
          ${destination ? `<tr><td style="padding:8px 0;color:#aaa;font-size:14px;width:40%;">🌍 Destination</td><td style="padding:8px 0;color:#f5f5f5;font-size:15px;font-weight:600;">${destination}</td></tr>` : ''}
          ${tour ? `<tr><td style="padding:8px 0;color:#aaa;font-size:14px;">🏖 Tour Package</td><td style="padding:8px 0;color:#f5f5f5;font-size:15px;font-weight:600;">${tour}</td></tr>` : ''}
          ${travelDate ? `<tr><td style="padding:8px 0;color:#aaa;font-size:14px;">📅 Travel Date</td><td style="padding:8px 0;color:#f5f5f5;font-size:15px;">${travelDate}</td></tr>` : ''}
          ${travelers ? `<tr><td style="padding:8px 0;color:#aaa;font-size:14px;">👥 Travelers</td><td style="padding:8px 0;color:#f5f5f5;font-size:15px;">${travelers}</td></tr>` : ''}
        </table>

        <div style="margin-top:32px;padding:20px;background:#1a1a1a;border-radius:12px;border-left:4px solid #f0a500;">
          <p style="margin:0;font-size:14px;color:#f5f5f5;font-weight:600;">What's Next?</p>
          <p style="margin:8px 0 0;font-size:13px;color:#aaa;line-height:1.5;">One of our consultants will contact you within 24 hours at <strong>${email}</strong> to finalize your plans.</p>
        </div>
      </div>
      <div style="background:#0a0a0a;padding:20px 40px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#555;">Yatrika Travel — Your Journey Begins Here</p>
      </div>
    </div>
  `;

  // Function to call Brevo
  const callBrevo = async (recipientEmail, recipientName, subject) => {
    const payload = {
      sender: { name: 'Yatrika Travel', email: NOTIFY_EMAIL },
      to: [{ email: recipientEmail, name: recipientName }],
      replyTo: { email: NOTIFY_EMAIL, name: 'Kabir Ghamawala' },
      subject: subject,
      htmlContent: htmlContent,
    };

    const res = await fetch('/brevo-api/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `API Error: ${res.status}`);
    }
    return res.json();
  };

  try {
    // 1. Send to Admin (Kabir)
    const adminPromise = callBrevo(
      NOTIFY_EMAIL, 
      'Kabir Ghamawala', 
      `🚨 NEW BOOKING: ${name} - ${destination || tour}`
    );

    // 2. Send to Customer (The User)
    const userPromise = callBrevo(
      email, 
      name, 
      `✈️ Your Yatrika Trip: ${destination || tour}`
    );

    // Wait for both to finish
    await Promise.all([adminPromise, userPromise]);
    return { success: true };

  } catch (error) {
    console.error('Email Error:', error);
    throw error;
  }
}
