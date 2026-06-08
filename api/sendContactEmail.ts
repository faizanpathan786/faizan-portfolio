import { Resend } from 'resend';

// Where contact form submissions are delivered.
const TO_EMAIL = 'faizan514pathan@gmail.com';

// Until you verify your own domain in Resend, this onboarding sender is the
// only "from" address allowed, and it can deliver to your Resend account email.
// Once you verify a domain, swap this for e.g. "Portfolio <hello@yourdomain.com>".
const FROM_EMAIL = 'Portfolio Contact <onboarding@resend.dev>';

export interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export interface SendResult {
  status: number;
  body: { ok?: true; error?: string };
}

// Theme tokens mirrored from the portfolio (Tailwind / index.css).
const THEME = {
  page: '#0C0C0C',
  card: '#141414',
  text: '#D7E2EA',
  muted: 'rgba(215,226,234,0.45)',
  border: 'rgba(215,226,234,0.12)',
  accent: '#B600A8',
  accentLink: '#E58CFF',
  gradient:
    'linear-gradient(123deg,#18011F 7%,#B600A8 37%,#7621B0 72%,#BE4C00 100%)',
  // Outlook (Word engine) ignores CSS gradients — this is the solid fallback.
  gradientFallback: '#7621B0',
};

const FONT = "'Kanit',-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type FieldLink = 'email' | 'tel' | undefined;

function fieldRow(label: string, value: string, link: FieldLink): string {
  const safe = escapeHtml(value);
  let display = safe;
  if (link === 'email') {
    display = `<a href="mailto:${safe}" style="color:${THEME.accentLink};text-decoration:none;">${safe}</a>`;
  } else if (link === 'tel') {
    display = `<a href="tel:${safe}" style="color:${THEME.accentLink};text-decoration:none;">${safe}</a>`;
  }
  return `
    <tr>
      <td style="padding:0 0 20px 0;">
        <p style="margin:0 0 5px 0;font-family:${FONT};font-size:11px;line-height:1;letter-spacing:2px;text-transform:uppercase;color:${THEME.muted};">${label}</p>
        <p style="margin:0;font-family:${FONT};font-size:16px;line-height:1.4;color:${THEME.text};font-weight:500;">${display}</p>
      </td>
    </tr>`;
}

function buildContactEmailHtml(p: Required<ContactPayload>): string {
  const firstName = escapeHtml(p.name.split(' ')[0] || p.name);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <title>New portfolio enquiry</title>
  </head>
  <body style="margin:0;padding:0;background-color:${THEME.page};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${THEME.page};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:${THEME.card};border:1px solid ${THEME.border};border-radius:24px;overflow:hidden;">
            <!-- Gradient header -->
            <tr>
              <td style="background-color:${THEME.gradientFallback};background-image:${THEME.gradient};padding:36px 36px 32px 36px;">
                <p style="margin:0;font-family:${FONT};font-size:12px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.75);">New Portfolio Enquiry</p>
                <h1 style="margin:10px 0 0 0;font-family:${FONT};font-size:28px;line-height:1.1;font-weight:800;color:#ffffff;text-transform:uppercase;">${escapeHtml(p.name)}</h1>
              </td>
            </tr>
            <!-- Details -->
            <tr>
              <td style="padding:36px 36px 8px 36px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${fieldRow('Email', p.email, 'email')}
                  ${fieldRow('Phone', p.phone || '—', p.phone ? 'tel' : undefined)}
                  ${fieldRow('Service', p.service || '—', undefined)}
                  <tr>
                    <td style="padding:0;">
                      <p style="margin:0 0 8px 0;font-family:${FONT};font-size:11px;line-height:1;letter-spacing:2px;text-transform:uppercase;color:${THEME.muted};">Message</p>
                      <div style="background-color:rgba(182,0,168,0.08);border-left:3px solid ${THEME.accent};border-radius:10px;padding:18px 20px;">
                        <p style="margin:0;font-family:${FONT};font-size:15px;line-height:1.65;color:${THEME.text};white-space:pre-wrap;">${escapeHtml(p.message)}</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Reply button -->
            <tr>
              <td style="padding:28px 36px 36px 36px;">
                <a href="mailto:${escapeHtml(p.email)}?subject=${encodeURIComponent('Re: your enquiry')}"
                   style="display:inline-block;background-color:${THEME.gradientFallback};background-image:${THEME.gradient};color:#ffffff;font-family:${FONT};font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:15px 36px;border-radius:999px;">
                  Reply to ${firstName}
                </a>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:22px 36px;border-top:1px solid ${THEME.border};">
                <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.5;color:rgba(215,226,234,0.4);">
                  Sent from your portfolio contact form &middot; reply directly to reach ${firstName}.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildContactEmailText(p: Required<ContactPayload>): string {
  return [
    `New portfolio enquiry from ${p.name}`,
    '',
    `Name:    ${p.name}`,
    `Email:   ${p.email}`,
    `Phone:   ${p.phone || '—'}`,
    `Service: ${p.service || '—'}`,
    '',
    'Message:',
    p.message,
    '',
    '— Sent from your portfolio contact form',
  ].join('\n');
}

export async function sendContactEmail(
  payload: ContactPayload,
  apiKey: string | undefined
): Promise<SendResult> {
  if (!apiKey) {
    return {
      status: 500,
      body: { error: 'Email service is not configured. Missing RESEND_API_KEY.' },
    };
  }

  const { name, email, phone, service, message } = payload;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { status: 400, body: { error: 'Name, email and message are required.' } };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { status: 400, body: { error: 'Please provide a valid email address.' } };
  }

  const resend = new Resend(apiKey);

  const data: Required<ContactPayload> = {
    name: name.trim(),
    email: email.trim(),
    phone: phone?.trim() || '',
    service: service?.trim() || '',
    message: message.trim(),
  };

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: data.email,
      subject: `New portfolio enquiry from ${data.name}`,
      html: buildContactEmailHtml(data),
      text: buildContactEmailText(data),
    });

    if (error) {
      console.error('Resend error:', error);
      return { status: 502, body: { error: 'Failed to send message. Please try again.' } };
    }

    return { status: 200, body: { ok: true } };
  } catch (err) {
    console.error('Unexpected error sending email:', err);
    return { status: 500, body: { error: 'Something went wrong. Please try again.' } };
  }
}
