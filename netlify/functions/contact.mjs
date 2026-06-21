const CRM_URL = 'https://green-rooms-crm.vercel.app'
const RESEND_API = 'https://api.resend.com/emails'
const FROM = 'The Green Rooms <noreply@thegreenrooms.com>'
const TEAM_EMAIL = 'info@thegreenrooms.com'

function customerEmail(firstName, formType) {
  const isSiteVisit = formType === 'site-visit'
  const heading = isSiteVisit ? 'We\'ll Be In Touch Shortly' : 'Showroom Appointment Request Received'
  const body = isSiteVisit
    ? `One of our team will be in touch within one working day to arrange a convenient time for your free site visit.<br><br>During the visit, we'll take a look at your garden, talk through what's possible, and give you honest advice — with no obligation to proceed.`
    : `One of our team will be in touch within one working day to confirm your showroom appointment.<br><br>You're welcome to visit the showroom at any time during The Farm Shop's opening hours — but if you'd like a member of the team there to walk you through everything, we'll arrange a specific time with you.`

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f2f4f3;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f3;padding:28px 0;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
  <tr><td style="background:#1a2328;padding:28px 32px;text-align:center;">
    <p style="font-size:22px;font-weight:700;color:#34a02e;margin:0;">The Green Rooms</p>
    <p style="font-size:11px;color:rgba(255,255,255,0.45);margin:5px 0 0;text-transform:uppercase;letter-spacing:0.08em;">Bespoke Garden Rooms · Surrey</p>
  </td></tr>
  <tr><td style="padding:36px;">
    <p style="font-size:14px;color:#333;margin:0 0 16px;">Hi ${firstName},</p>
    <h2 style="font-size:18px;font-weight:700;color:#2d3841;margin:0 0 16px;">${heading}</h2>
    <p style="font-size:14px;color:#555;line-height:1.75;margin:0 0 28px;">${body}</p>

    <div style="background:#f0f8ef;border-radius:8px;padding:20px 24px;margin-bottom:28px;border-left:3px solid #34a02e;">
      <p style="font-size:14px;font-weight:700;color:#2d3841;margin:0 0 8px;">The Green Rooms Showroom</p>
      <p style="font-size:13px;color:#555;margin:0;line-height:1.7;">The Farm Shop, Hardwick Lane<br>Lyne, Chertsey, Surrey KT16 0AA</p>
    </div>

    <p style="font-size:13px;color:#555;margin:0 0 24px;">In the meantime, you can call or WhatsApp us on <a href="tel:01932640242" style="color:#34a02e;font-weight:600;text-decoration:none;">01932 640242</a>, or use our <a href="https://www.thegreenrooms.com/garden-room-price-calculator" style="color:#34a02e;text-decoration:none;">price calculator</a> to explore your options.</p>
    <p style="font-size:13px;color:#555;margin:0 0 36px;">Best regards,<br><strong style="color:#2d3841;">James Austin</strong><br>The Green Rooms</p>
  </td></tr>
  <tr><td style="background:#f8f8f8;padding:18px 32px;text-align:center;border-top:1px solid #eee;">
    <p style="font-size:11px;color:#aaa;margin:0;">The Green Rooms · Lyne Lane, Lyne, Surrey KT16 0AN</p>
    <p style="font-size:11px;color:#aaa;margin:4px 0 0;"><a href="tel:01932640242" style="color:#aaa;text-decoration:none;">01932 640242</a> · <a href="https://www.thegreenrooms.com" style="color:#aaa;text-decoration:none;">thegreenrooms.com</a></p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

function teamEmail(fullName, email, phone, postcode, roomType, source, message, formType) {
  const label = formType === 'showroom-appointment' ? 'Showroom Appointment Request' : 'Free Site Visit Enquiry'
  const rows = [
    ['Name', fullName],
    ['Email', email ? `<a href="mailto:${email}" style="color:#34a02e;">${email}</a>` : '—'],
    ['Phone', phone ? `<a href="tel:${phone}" style="color:#34a02e;">${phone}</a>` : '—'],
    postcode ? ['Postcode', postcode] : null,
    roomType ? ['Room Type', roomType] : null,
    source ? ['Source', source] : null,
    message ? ['Message', message] : null,
  ].filter(Boolean)

  const rowsHtml = rows.map(([l, v]) => `<tr style="border-bottom:1px solid #f0f0f0;">
    <td style="font-weight:600;color:#2d3841;width:36%;padding:10px 12px;vertical-align:top;font-size:13px;">${l}</td>
    <td style="color:#555;padding:10px 12px;font-size:13px;">${v}</td>
  </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f2f4f3;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f3;padding:28px 0;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;">
  <tr><td style="background:#1a2328;padding:22px 28px;">
    <p style="font-size:18px;font-weight:700;color:#34a02e;margin:0;">New Enquiry — ${label}</p>
    <p style="font-size:12px;color:rgba(255,255,255,0.5);margin:4px 0 0;">The Green Rooms · Website</p>
  </td></tr>
  <tr><td style="padding:28px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rowsHtml}</table>
    <div style="margin-top:24px;text-align:center;">
      <a href="https://green-rooms-crm.vercel.app/dashboard" style="display:inline-block;background:#34a02e;color:#fff;font-weight:700;font-size:13px;padding:12px 24px;border-radius:50px;text-decoration:none;">View in CRM →</a>
    </div>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

async function sendEmail(apiKey, to, subject, html, replyTo) {
  const payload = { from: FROM, to, subject, html }
  if (replyTo) payload.reply_to = replyTo
  const res = await fetch(RESEND_API, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) console.error('Resend error:', await res.text())
}

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const body = await request.text()
    const p = new URLSearchParams(body)

    const firstName = p.get('first-name') || 'there'
    const surname = p.get('surname') || ''
    const fullName = [firstName, surname].filter(Boolean).join(' ')
    const email = p.get('email') || ''
    const phone = p.get('phone') || ''
    const postcode = p.get('postcode') || ''
    const roomType = p.get('room-type') || ''
    const source = p.get('source') || ''
    const message = p.get('message') || ''
    const formType = p.get('form-name') || 'site-visit'

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) throw new Error('Missing RESEND_API_KEY')

    const subjectLabel = formType === 'showroom-appointment' ? 'Showroom Appointment' : 'Free Site Visit'

    // Customer confirmation
    if (email) {
      await sendEmail(
        apiKey,
        email,
        `${subjectLabel} Request Received — The Green Rooms`,
        customerEmail(firstName, formType),
        TEAM_EMAIL,
      )
    }

    // Team notification
    await sendEmail(
      apiKey,
      TEAM_EMAIL,
      `New ${subjectLabel} Enquiry — ${fullName}${postcode ? ', ' + postcode : ''}`,
      teamEmail(fullName, email, phone, postcode, roomType, source, message, formType),
      email || undefined,
    )

    // Push to CRM
    await fetch(`${CRM_URL}/api/webhooks/webflow-contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fullName,
        email,
        phone,
        postcode,
        message: message || roomType || null,
        source_referrer: source || null,
        lead_source: formType === 'showroom-appointment' ? 'showroom_booking' : 'website_form',
      }),
    }).catch(err => console.error('CRM webhook error:', err))

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Contact function error:', err)
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
