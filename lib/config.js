/*
 * ============================================================================
 *  BUSINESS CONFIGURATION — the one file to edit for contact details & links
 * ============================================================================
 *
 *  whatsappNumber   WhatsApp number used by Book Now, Book via WhatsApp,
 *                   Message on WhatsApp, the booking form and the enquiry form.
 *                   International format, digits only: no "+", no leading 0.
 *                   Saudi 0506860708 is entered as "966506860708".
 *                   >>> VERIFY BEFORE LAUNCH: confirm this is the WhatsApp number
 *                       customers should message.
 *
 *  phoneDisplay     Phone text shown on the Contact page.
 *  phoneTel         Value used for the tel: link (international format).
 *                   Leave both empty to hide the phone row.
 *                   >>> VERIFY BEFORE LAUNCH.
 *
 *  email            Email address. Leave empty to hide email on the Contact page.
 *
 *  mapsUrl          Google Maps directions link for the Al Khobar branch.
 *  mapsVerified     Keep false until the link is checked. While false, the
 *                   contact page shows "Directions link pending verification."
 *                   >>> VERIFY BEFORE LAUNCH, then set to true.
 *
 *  social           Full profile URLs. An empty value keeps that icon dimmed and
 *                   not clickable.
 *                   >>> VERIFY BEFORE LAUNCH: Instagram is set; the others are empty.
 *
 *  paymentMethods   Logos shown in the white footer strip (display only, no
 *                   payment integration). Remove an entry to hide that logo.
 *                   Logo files live in public/assets/images/payments/.
 *                   >>> VERIFY BEFORE LAUNCH: confirm these are the payment
 *                       methods Evershine accepts. The logos were cropped from
 *                       the reference mockup; replace with official files if available.
 *
 *  testimonials     Verified customer reviews only, e.g.
 *                   [{ quote: "...", name: "...", source: "..." }]. Empty = hidden.
 * ============================================================================
 */
export const siteConfig = {
  businessName: 'Evershine Car Care Center',
  city: 'Al Khobar, Saudi Arabia',
  established: 2004,

  whatsappNumber: '966506860708',

  phoneDisplay: '0506860708',
  phoneTel: '+966506860708',

  email: '',

  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Evershine+Car+Care+Center+Al+Khobar',
  mapsVerified: false,

  social: {
    instagram: 'https://www.instagram.com/evershine_car_care_center/',
    tiktok: 'https://www.tiktok.com/@evershinesa',
    snapchat: 'https://snapchat.com/t/ymE5P5KV',
    linkedin: '',
  },

  paymentMethods: [
    { name: 'mada', logo: '/assets/images/payments/mada.png' },
    { name: 'Visa', logo: '/assets/images/payments/visa.svg' },
    { name: 'Mastercard', logo: '/assets/images/payments/mastercard.svg' },
    { name: 'Apple Pay', logo: '/assets/images/payments/applepay.svg' },
    { name: 'Tabby', logo: '/assets/images/payments/tabby.svg' },
    { name: 'Tamara', logo: '/assets/images/payments/tamara.png' },
  ],

  testimonials: [],
};
