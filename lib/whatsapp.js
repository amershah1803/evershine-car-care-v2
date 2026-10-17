import { siteConfig } from '@/lib/config';

export const SIZE_LABELS = { large: 'Large', medium: 'Medium', small: 'Small' };

export const SERVICE_LABELS = {
  'ceramic-coating': 'Ceramic Coating',
  ppf: 'Paint Protection Film (PPF)',
  'window-tinting': 'Window Tinting',
  polishing: 'Polishing',
  'interior-cleaning': 'Interior Cleaning',
  'exterior-detailing': 'Exterior Detailing',
  'thermal-insulation': 'Thermal Insulation',
  other: 'Other Services',
};

export const COPY_NOTICE =
  'Our online booking line is not active yet, so we have not sent your request. Copy the details below and send them to us directly. Your booking is not confirmed until our team replies.';

/** wa.me link with a pre-filled message, or null when no number is configured. */
export function waUrl(message) {
  const digits = (siteConfig.whatsappNumber || '').replace(/\D/g, '');
  if (!digits) return null;
  return 'https://wa.me/' + digits + (message ? '?text=' + encodeURIComponent(message) : '');
}

/** Saudi mobile: 05XXXXXXXX, 5XXXXXXXX, +9665XXXXXXXX, 009665XXXXXXXX (spaces and dashes ignored). */
export function normalizeSaudiMobile(value) {
  const v = (value || '').replace(/[\s\-()]/g, '');
  return /^(\+?966|00966|0)?5\d{8}$/.test(v);
}

/** Booking message. Written in English so the team reads one format. */
export function bookingMessage({ name, mobile, size, services, date, vehicle, message }) {
  const lines = [
    'Booking request via the Evershine website (not yet confirmed)',
    'Name: ' + name,
    'Mobile: ' + mobile,
    'Car size: ' + (SIZE_LABELS[size] || 'Not selected'),
    'Services: ' + (services.map((s) => SERVICE_LABELS[s]).join(', ') || 'Not selected'),
  ];
  if (date) lines.push('Preferred date/time: ' + date);
  if (vehicle) lines.push('Car make/model: ' + vehicle);
  if (message) lines.push('Message: ' + message);
  return lines.join('\n');
}

/** Enquiry message from the contact form. */
export function enquiryMessage({ name, mobile, message }) {
  return ['Enquiry via the Evershine website', 'Name: ' + name, 'Mobile: ' + mobile, 'Message: ' + message].join('\n');
}
