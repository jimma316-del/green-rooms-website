const CRM_URL = 'https://green-rooms-crm.vercel.app'
const RESEND_API = 'https://api.resend.com/emails'
const FROM = 'The Green Rooms <noreply@thegreenrooms.com>'
const TEAM_EMAIL = 'info@thegreenrooms.com'

const ROOF_LABELS = {
  flat: 'Standard height, flat roof (2.5m high)',
  dual_pitched: 'Dual pitched roof',
  dual_extended: 'Dual pitched extended height (4m)',
  single_ext: 'Single pitch extended height (3m)',
}
const CLAD_LABELS = {
  thermo_ayous: 'Thermo Ayous',
  cedar: 'Western Red Cedar',
  charred_spruce: 'Charred Spruce (Shou Sugi Ban)',
  hardie: 'Hardie Plank',
  millboard: 'Millboard / Composite',
  thermo_ash: 'Thermo Ash',
}
const DOOR_LABELS = {
  upvc_sliding: 'uPVC sliding doors',
  alu_french: 'Aluminium French doors',
  alu_sliding_2m: 'Aluminium sliding doors (2m)',
  alu_sliding_26: 'Aluminium sliding doors (2.6m)',
  alu_bifold_36: 'Aluminium bifolds (2.4m–3.6m)',
  alu_crittal_3m: 'Aluminium Crittall doors (3m)',
  alu_bifold_4m: 'Aluminium bifolds (4m)',
  alu_crittal_4m: 'Aluminium Crittall doors (4m)',
  alu_bifold_5m: 'Aluminium bifolds (5m)',
  alu_crittal_5m: 'Aluminium Crittall doors (5m)',
}
const WIN_LABELS = {
  slot: 'Aluminium slot window (1m × 50cm)',
  square: 'Aluminium square window (1m × 1m)',
  double: 'Aluminium double window (2m × 1m)',
  bifold_win: 'Aluminium bifold window',
  full_height: 'Full height window',
}
const ELEC_LABELS = {
  ext_lights: 'External Up & Down Lights',
  canopy_lights: 'Canopy Downlights',
  smart_switch: 'LCD Smart Light Switch',
  cat6: 'WiFi Internet via Cat 6a Cable',
  smart_socket: 'External Smart Socket',
}
const CLIMATE_LABELS = {
  ac_2_5kw: '2.5kw Air Conditioning (Heating & Cooling)',
  ac_5kw: '5kw Air Conditioning (Heating & Cooling)',
  wall_heater: 'Electric Panel Heater',
}

function row(label, value) {
  return `<tr style="border-bottom:1px solid #f0f0f0;">
    <td style="font-weight:600;color:#2d3841;width:36%;padding:10px 12px;vertical-align:top;font-size:13px;">${label}</td>
    <td style="color:#555;padding:10px 12px;font-size:13px;line-height:1.6;">${value}</td>
  </tr>`
}

function customerEmail(firstName, price, c) {
  const windows = (c.wins || []).filter(w => w && w !== 'none').map(w => WIN_LABELS[w]).filter(Boolean)
  const features = [
    c.canopy && 'Canopy',
    c.side_canopy && 'Side Canopy Walls',
    c.storage && 'Hidden Storage Room',
    c.glass_corner && 'Glass Corner',
    c.skylight && 'Skylight',
  ].filter(Boolean)
  const electrics = (c.electricals || []).map(e => ELEC_LABELS[e]).filter(Boolean)
  const climate = c.climate && c.climate !== 'none' ? CLIMATE_LABELS[c.climate] : null

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f2f4f3;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f3;padding:28px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

  <!-- Header -->
  <tr><td style="background:#1a2328;padding:28px 32px;text-align:center;">
    <p style="font-size:22px;font-weight:700;color:#34a02e;margin:0;letter-spacing:-0.5px;">The Green Rooms</p>
    <p style="font-size:11px;color:rgba(255,255,255,0.45);margin:5px 0 0;text-transform:uppercase;letter-spacing:0.08em;">Bespoke Garden Rooms · Surrey</p>
  </td></tr>

  <!-- Price hero -->
  <tr><td style="background:#2d3841;padding:32px;text-align:center;">
    <p style="font-size:11px;color:rgba(255,255,255,0.45);margin:0 0 10px;text-transform:uppercase;letter-spacing:0.1em;">Your Estimated Price</p>
    <p style="font-size:46px;font-weight:700;color:#34a02e;margin:0;line-height:1;">${price}</p>
    <p style="font-size:11px;color:rgba(255,255,255,0.3);margin:10px 0 0;">Inc VAT &nbsp;·&nbsp; Guide price &nbsp;·&nbsp; Confirmed after free site visit</p>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:36px 36px 0;color:#333;font-size:14px;line-height:1.75;">
    <p style="margin:0 0 16px;">Hi ${firstName},</p>
    <p style="margin:0 0 16px;color:#555;">Thanks for using our online garden room calculator. Based on your selections, we've put together a price for your project.</p>
    <p style="margin:0 0 28px;color:#555;">This estimate is based on a <strong style="color:#2d3841;">${c.width}m × ${c.depth}m bespoke garden room</strong> with your selected features, designed and built to a high standard with a focus on durability, low maintenance, and premium finishes.</p>

    <!-- What's included -->
    <h2 style="font-size:15px;font-weight:700;color:#2d3841;margin:0 0 14px;padding-bottom:10px;border-bottom:2px solid #34a02e;">What's Included in Your Build</h2>
    <ul style="margin:0 0 28px;padding-left:22px;color:#555;font-size:13px;line-height:1.9;">
      <li>Foundations</li>
      <li>Electrical connection and safety certificate</li>
      <li>Plastering</li>
      <li>Full design service</li>
      <li>Delivery and installation</li>
    </ul>

    <!-- Summary table -->
    <h2 style="font-size:15px;font-weight:700;color:#2d3841;margin:0 0 14px;padding-bottom:10px;border-bottom:2px solid #34a02e;">Your Garden Room Summary</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:28px;">
      ${row('Size', `${c.width}m × ${c.depth}m`)}
      ${row('Structure', ROOF_LABELS[c.roofType] || c.roofType)}
      ${row('Doors', DOOR_LABELS[c.door] || c.door)}
      ${windows.length ? row('Windows', windows.join('<br>')) : ''}
      ${row('Cladding', `${CLAD_LABELS[c.claddingMaterial] || c.claddingMaterial} (${c.claddingWalls} wall${c.claddingWalls > 1 ? 's' : ''})`)}
      ${c.hasDecking ? row('Decking', `${c.deckW}m × ${c.deckD}m`) : ''}
      ${features.length ? row('Features', features.join('<br>')) : ''}
      ${climate ? row('Air Conditioning', climate) : ''}
      ${electrics.length ? row('Electrics', electrics.join('<br>')) : ''}
    </table>

    <!-- Site survey note -->
    <h2 style="font-size:15px;font-weight:700;color:#2d3841;margin:0 0 14px;padding-bottom:10px;border-bottom:2px solid #34a02e;">Items Finalised After Site Survey</h2>
    <p style="margin:0 0 12px;color:#555;font-size:13px;">Some elements are confirmed following a site visit, where we assess access and overall site conditions.</p>
    <p style="margin:0 0 12px;color:#555;font-size:13px;">This typically only becomes relevant where additional work is required, such as:</p>
    <ul style="margin:0 0 12px;padding-left:22px;color:#555;font-size:13px;line-height:1.9;">
      <li>Removal of existing patios, sheds, bushes or trees</li>
      <li>Levelling uneven ground</li>
      <li>Restricted access (where materials need to pass through the house)</li>
      <li>Decorating, if required (we can recommend a trusted decorator if needed)</li>
    </ul>
    <p style="margin:0 0 28px;color:#555;font-size:13px;">In most cases, these factors are minimal or not required, and the final cost remains very close to the estimate.</p>

    <!-- Next steps -->
    <div style="background:#f0f8ef;border-radius:8px;padding:22px 24px;margin-bottom:28px;border-left:3px solid #34a02e;">
      <h2 style="font-size:15px;font-weight:700;color:#2d3841;margin:0 0 10px;">Next Step: Free Design Consultation &amp; 3D Visual</h2>
      <p style="margin:0 0 10px;color:#555;font-size:13px;">The next step is to book a consultation, either on site or at our showroom, where we'll refine your design and discuss layout and positioning.</p>
      <p style="margin:0;color:#555;font-size:13px;">Following this, we'll provide a detailed quote along with a 3D visual of your garden room within 48 hours.</p>
    </div>

    <p style="margin:0 0 24px;color:#555;font-size:13px;">You can call or WhatsApp us on <a href="tel:01932640242" style="color:#34a02e;font-weight:600;text-decoration:none;">01932 640242</a>, or simply reply to this email and we'll arrange a time that suits you.</p>
    <p style="margin:0 0 36px;color:#555;font-size:13px;">Kind regards,<br><strong style="color:#2d3841;">James Austin</strong><br>The Green Rooms</p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f8f8f8;padding:20px 32px;text-align:center;border-top:1px solid #eee;">
    <p style="font-size:11px;color:#aaa;margin:0;">The Green Rooms · Lyne Lane, Lyne, Surrey KT16 0AN</p>
    <p style="font-size:11px;color:#aaa;margin:4px 0 0;"><a href="tel:01932640242" style="color:#aaa;text-decoration:none;">01932 640242</a> · <a href="https://www.thegreenrooms.com" style="color:#aaa;text-decoration:none;">thegreenrooms.com</a></p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

function teamEmail(fullName, email, phone, address, price, c) {
  const windows = (c.wins || []).filter(w => w && w !== 'none').map(w => WIN_LABELS[w]).filter(Boolean)
  const features = [c.canopy && 'Canopy', c.side_canopy && 'Side Canopy', c.storage && 'Storage', c.glass_corner && 'Glass Corner', c.skylight && 'Skylight'].filter(Boolean)
  const electrics = (c.electricals || []).map(e => ELEC_LABELS[e]).filter(Boolean)
  const climate = c.climate && c.climate !== 'none' ? CLIMATE_LABELS[c.climate] : null

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f2f4f3;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f3;padding:28px 0;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;">
  <tr><td style="background:#1a2328;padding:22px 28px;">
    <p style="font-size:18px;font-weight:700;color:#34a02e;margin:0;">New Calculator Lead</p>
    <p style="font-size:12px;color:rgba(255,255,255,0.5);margin:4px 0 0;">The Green Rooms · Website</p>
  </td></tr>
  <tr><td style="padding:28px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${row('Name', fullName)}
      ${row('Email', `<a href="mailto:${email}" style="color:#34a02e;">${email}</a>`)}
      ${row('Phone', `<a href="tel:${phone}" style="color:#34a02e;">${phone}</a>`)}
      ${address ? row('Address', address) : ''}
      ${row('Guide Price', `<strong style="color:#34a02e;font-size:16px;">${price}</strong>`)}
      ${row('Room Size', `${c.width}m × ${c.depth}m`)}
      ${row('Structure', ROOF_LABELS[c.roofType] || c.roofType)}
      ${row('Doors', DOOR_LABELS[c.door] || c.door)}
      ${windows.length ? row('Windows', windows.join(', ')) : ''}
      ${row('Cladding', `${CLAD_LABELS[c.claddingMaterial] || c.claddingMaterial} · ${c.claddingWalls} wall(s)`)}
      ${c.hasDecking ? row('Decking', `${c.deckW}m × ${c.deckD}m`) : ''}
      ${features.length ? row('Features', features.join(', ')) : ''}
      ${climate ? row('Climate', climate) : ''}
      ${electrics.length ? row('Electrics', electrics.join(', ')) : ''}
    </table>
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
  if (!res.ok) {
    const text = await res.text()
    console.error('Resend error:', res.status, text)
    throw new Error(`Resend ${res.status}: ${text}`)
  }
}

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const body = await request.text()
    const p = new URLSearchParams(body)

    const firstName = p.get('first-name') || 'there'
    const lastName = p.get('last-name') || ''
    const fullName = [firstName, lastName].filter(Boolean).join(' ')
    const email = p.get('email') || ''
    const phone = p.get('phone') || ''
    const addressLine1 = p.get('address-line1') || ''
    const postcode = p.get('address') || ''
    const address = [addressLine1, postcode].filter(Boolean).join(', ')
    const price = p.get('guide-price') || ''
    const configRaw = p.get('configuration') || '{}'
    let c = {}
    try { c = JSON.parse(configRaw) } catch { /* config sent as plain string — use empty object */ }

    console.log('[calculator] received', { firstName, email, price, configKeys: Object.keys(c) })

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) throw new Error('Missing RESEND_API_KEY')
    console.log('[calculator] API key present:', !!apiKey)

    // Send customer email
    if (email) {
      console.log('[calculator] sending customer email to', email)
      await sendEmail(
        apiKey,
        email,
        'Your Garden Room Quote — The Green Rooms',
        customerEmail(firstName, price, c),
        TEAM_EMAIL,
      )
      console.log('[calculator] customer email sent')
    }

    // Send team notification
    console.log('[calculator] sending team email')
    await sendEmail(
      apiKey,
      TEAM_EMAIL,
      `New Calculator Lead — ${fullName}${address ? ', ' + address : ''}`,
      teamEmail(fullName, email, phone, address, price, c),
      email || undefined,
    )
    console.log('[calculator] team email sent')

    // Push to CRM
    await fetch(`${CRM_URL}/api/webhooks/webflow-calculator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fullName,
        email,
        phone,
        address,
        width: c.width,
        depth: c.depth,
        'Estimated Price': price,
        calculator_data: c,
      }),
    }).catch(err => console.error('CRM webhook error:', err))

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Calculator function error:', err)
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
