const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SENDER = 'PrettyMD <somya@prettymd.app>';
const REPLY_TO = 'somya@prettymd.app';
const INTERNAL_EMAIL = 'somyasharmapro@gmail.com';

// Simple in-memory rate limiting per IP (resets on cold start, good enough for basic protection)
const rateMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per minute per IP

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateMap.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many requests. Please wait a moment.' });
  }

  try {
    const { email, name, _hp } = req.body || {};

    // Honeypot: if _hp field has a value, it's a bot
    if (_hp) {
      // Return fake success to not tip off the bot
      return res.status(200).json({ ok: true, message: "You're on the waitlist." });
    }

    // Validate email
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ ok: false, error: 'Email is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({ ok: false, error: 'Invalid email address.' });
    }

    const timestamp = new Date().toISOString();

    // Send both emails in parallel
    const [confirmResult, notifyResult] = await Promise.allSettled([
      // A) Confirmation email to user
      resend.emails.send({
        from: SENDER,
        to: cleanEmail,
        replyTo: REPLY_TO,
        subject: "You're on the PrettyMD waitlist",
        html: `
          <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
            <p style="font-size: 16px; line-height: 1.7; margin-bottom: 20px;">
              Hey${name ? ` ${name}` : ''} — thanks for signing up.
            </p>
            <p style="font-size: 16px; line-height: 1.7; margin-bottom: 20px;">
              You're on the PrettyMD waitlist. We're building a markdown viewer that's genuinely
              beautiful — made for vibe coders who care about how things look and feel.
            </p>
            <p style="font-size: 16px; line-height: 1.7; margin-bottom: 20px;">
              We'll reach out the moment access opens. Sit tight.
            </p>
            <p style="font-size: 14px; color: #888; margin-top: 40px;">
              — The PrettyMD team
            </p>
          </div>
        `
      }),

      // B) Internal notification email
      resend.emails.send({
        from: SENDER,
        to: INTERNAL_EMAIL,
        replyTo: cleanEmail,
        subject: 'New PrettyMD waitlist signup',
        html: `
          <div style="font-family: monospace; padding: 20px; color: #1a1a1a;">
            <p><strong>New waitlist signup</strong></p>
            <p>Email: ${cleanEmail}</p>
            ${name ? `<p>Name: ${name}</p>` : ''}
            <p>Time: ${timestamp}</p>
          </div>
        `
      })
    ]);

    // Log failures but don't block
    if (confirmResult.status === 'rejected') {
      console.error('Confirmation email failed:', confirmResult.reason);
    }
    if (notifyResult.status === 'rejected') {
      console.error('Notification email failed:', notifyResult.reason);
    }

    return res.status(200).json({ ok: true, message: "You're on the waitlist." });

  } catch (err) {
    console.error('Waitlist API error:', err);
    return res.status(500).json({ ok: false, error: 'Something went wrong.' });
  }
};
