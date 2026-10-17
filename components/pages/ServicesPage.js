'use client';

import { useEffect, useState } from 'react';
import CompareSlider from '@/components/CompareSlider';
import FormStatus from '@/components/FormStatus';
import Icon from '@/components/Icon';
import { useLanguage } from '@/components/LanguageProvider';
import { validateFields } from '@/lib/validation';
import { SIZE_LABELS, SERVICE_LABELS, bookingMessage, waUrl } from '@/lib/whatsapp';

const SIZE_CARDS = [
  { id: 'large', label: 'Large', desc: 'SUVs, 4x4s and trucks', img: '/assets/images/cars/large-g-class.jpg', alt: 'Black Mercedes-Benz G-Class' },
  { id: 'medium', label: 'Medium', desc: 'Sedans and coupes', img: '/assets/images/cars/medium-porsche-911.jpg', alt: 'Grey Porsche 911 with a burgundy soft top' },
  { id: 'small', label: 'Small', desc: 'Hatchbacks and smaller sports cars', img: '/assets/images/cars/small-fiat-500-abarth.jpg', alt: 'White Fiat 500 Abarth in the Evershine showroom' },
];

const SERVICE_TILES = [
  { slug: 'ceramic-coating', label: 'Ceramic Coating', icon: 'shield' },
  { slug: 'ppf', label: 'Paint Protection Film (PPF)', icon: 'film' },
  { slug: 'window-tinting', label: 'Window Tinting', icon: 'window' },
  { slug: 'polishing', label: 'Polishing', icon: 'sparkle' },
  { slug: 'interior-cleaning', label: 'Interior Cleaning', icon: 'seat' },
  { slug: 'exterior-detailing', label: 'Exterior Detailing', icon: 'car' },
  { slug: 'thermal-insulation', label: 'Thermal Insulation', icon: 'sun' },
  { slug: 'other', label: 'Other Services', icon: 'dots' },
];

const BOOKING_RULES = {
  name: { required: 'Please enter your full name.' },
  mobile: { required: 'Please enter your mobile number.', mobile: true },
  vehicle: { required: 'Please enter your car make and model.' },
};

const FIELD_IDS = { name: 'b-name', mobile: 'b-mobile', vehicle: 'b-vehicle' };

/**
 * Car size + services selection, the summary, and the WhatsApp booking form.
 * All selection state lives here; the URL (?size=&services=) mirrors it, as before.
 */
export default function ServicesPage() {
  const { t } = useLanguage();
  const [size, setSize] = useState(null);
  const [services, setServices] = useState([]);
  const [quoteNeedsChoice, setQuoteNeedsChoice] = useState(false);
  const [form, setForm] = useState({ name: '', mobile: '', vehicle: '', date: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitCount, setSubmitCount] = useState(0);

  // Read a selection from the address bar on arrival (e.g. from the header menu).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('size');
    if (s && SIZE_LABELS[s]) setSize(s);
    const list = (params.get('services') || '').split(',').filter((x) => SERVICE_LABELS[x]);
    setServices([...new Set(list)]);
  }, []);

  const syncUrl = (nextSize, nextServices) => {
    const parts = [];
    if (nextSize) parts.push('size=' + encodeURIComponent(nextSize));
    if (nextServices.length) parts.push('services=' + nextServices.map(encodeURIComponent).join(','));
    window.history.replaceState(null, '', window.location.pathname + (parts.length ? '?' + parts.join('&') : '') + window.location.hash);
  };

  const chooseSize = (id) => {
    setSize(id);
    syncUrl(id, services);
  };

  const toggleService = (slug) => {
    const next = services.includes(slug) ? services.filter((s) => s !== slug) : [...services, slug];
    setServices(next);
    syncUrl(size, next);
  };

  const summary =
    (size ? t(SIZE_LABELS[size] + ' vehicle') : t('No size selected')) +
    ' · ' +
    (services.length
      ? services.length === 1
        ? t('1 service selected')
        : services.length + ' ' + t('services selected')
      : t('No services selected'));

  const onFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const fail = (key) => {
      setStatus({ kind: 'error', key });
      setSubmitCount((c) => c + 1);
    };

    if (!services.length || !size) {
      fail('Please select a car size and at least one service before sending.');
      return;
    }

    const found = validateFields(form, BOOKING_RULES);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      fail('Please fix the highlighted fields.');
      return;
    }

    const text = bookingMessage({
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      size,
      services,
      date: form.date,
      vehicle: form.vehicle.trim(),
      message: form.notes.trim(),
    });
    const url = waUrl(text);
    if (url) {
      window.open(url, '_blank', 'noopener');
      setStatus({ kind: 'success', key: 'WhatsApp has opened with your details. Your booking is not confirmed until our team replies.' });
    } else {
      setStatus({ kind: 'warning', copy: text });
    }
    setSubmitCount((c) => c + 1);
  };

  return (
    <>
      <section className="page-hero" id="services-page">
        <div className="container">
          <p className="eyebrow">{t('Services & packages')}</p>
          <h1>{t('Services & packages')}</h1>
          <p>
            {t('Choose your vehicle size and the services you need. Share your details and our team will confirm your options.')}
          </p>
        </div>
      </section>

      <div className="container">
        <section className="step" id="size" aria-labelledby="step1-title">
          <div className="step-head">
            <span className="step-num">{t('Step 1')}</span>
            <h2 id="step1-title">{t('Select your car size')}</h2>
            <p>{t('Choose the category that best fits your vehicle.')}</p>
          </div>

          <div className="size-grid" role="radiogroup" aria-label={t('Car size')} style={{ marginTop: 0 }}>
            {SIZE_CARDS.map((card) => {
              const on = size === card.id;
              return (
                <button
                  key={card.id}
                  className={'size-card' + (on ? ' is-selected' : '')}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => chooseSize(card.id)}
                >
                  <span className="size-media">
                    {card.img ? (
                      <img src={card.img} alt={t(card.alt)} loading="lazy" width={500} height={476} />
                    ) : (
                      <span className="media-placeholder media-clean" aria-hidden="true">
                        <Icon name="car" />
                      </span>
                    )}
                  </span>
                  <span className="size-label">
                    <strong>{t(card.label)}</strong>
                    <span>{t(card.desc)}</span>
                  </span>
                  <span className="select-dot" aria-hidden="true"></span>
                </button>
              );
            })}
          </div>

          <details className="guide" id="size-guide">
            <summary>{t('Car size guide')}</summary>
            <ul>
              <li>
                <strong>{t('Large:')}</strong> {t('SUVs, 4x4s and trucks.')}
              </li>
              <li>
                <strong>{t('Medium:')}</strong> {t('Sedans and coupes.')}
              </li>
              <li>
                <strong>{t('Small:')}</strong> {t('Hatchbacks and smaller sports cars.')}
              </li>
            </ul>
            <p className="muted" style={{ padding: '0 16px 14px', fontSize: 13 }}>
              {t('Not sure which category fits? Mention your make and model in the booking form and we will confirm.')}
            </p>
          </details>
        </section>

        <section className="step" id="services" aria-labelledby="step2-title">
          <div className="step-head">
            <span className="step-num">{t('Step 2')}</span>
            <h2 id="step2-title">{t('Select services')}</h2>
            <p>{t('Select one or more services. You can change your selection at any time.')}</p>
          </div>
          <div className="service-tiles" role="group" aria-label={t('Services')} style={{ marginTop: 0, gridTemplateColumns: 'repeat(4,1fr)' }}>
            {SERVICE_TILES.map((tile) => {
              const on = services.includes(tile.slug);
              return (
                <button
                  key={tile.slug}
                  className={'service-tile' + (on ? ' is-selected' : '')}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleService(tile.slug)}
                >
                  <Icon name={tile.icon} className="tile-icon" />
                  <span>{t(tile.label)}</span>
                  <span className="select-dot" aria-hidden="true"></span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="step" id="packages" aria-labelledby="step3-title">
          <div className="step-head">
            <span className="step-num">{t('Step 3')}</span>
            <h2 id="step3-title">{t('Your selection & packages')}</h2>
            <p>
              {t('Package names, inclusions and prices are confirmed by our team for your vehicle. Request a quote and we will get back to you.')}
            </p>
          </div>
          <div className="step-panel quote-card">
            <p data-selection-summary>{summary}</p>
            <div className="chip-row">
              {services.length ? (
                services.map((s) => (
                  <span className="chip" key={s}>
                    {t(SERVICE_LABELS[s])}
                  </span>
                ))
              ) : (
                <span className="chip chip-empty">{t('Select at least one service')}</span>
              )}
            </div>
            {quoteNeedsChoice && (
              <p className="inline-message">{t('Choose a car size and at least one service first.')}</p>
            )}
            <div>
              <a
                className="btn btn-primary"
                href="#booking"
                onClick={(e) => {
                  if (!size || !services.length) {
                    e.preventDefault();
                    setQuoteNeedsChoice(true);
                  } else {
                    setQuoteNeedsChoice(false);
                  }
                }}
              >
                {t('Request a Quote')}
              </a>
            </div>
          </div>
        </section>

        <section className="step" id="booking" aria-labelledby="step4-title">
          <div className="step-head">
            <span className="step-num">{t('Step 4')}</span>
            <h2 id="step4-title">{t('Your booking details')}</h2>
            <p>
              {t('Fields marked')} <span style={{ color: 'var(--red)' }}>*</span> {t('are required. Sending these details does not confirm a booking. Our team will reply to confirm your appointment.')}
            </p>
          </div>

          <form className="step-panel" id="booking-form" noValidate onSubmit={onSubmit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="b-name">
                  {t('Full name')} <span className="req">*</span>
                </label>
                <input
                  id="b-name" maxLength={100}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t('Your full name')}
                  value={form.name}
                  onChange={onFieldChange}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'b-name-error' : undefined}
                />
                {errors.name && <p className="field-error" id="b-name-error">{t(errors.name)}</p>}
              </div>

              <div className="field">
                <label htmlFor="b-mobile">
                  {t('Mobile number')} <span className="req">*</span>
                </label>
                <input
                  id="b-mobile" maxLength={20}
                  name="mobile"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="05XXXXXXXX"
                  value={form.mobile}
                  onChange={onFieldChange}
                  aria-invalid={errors.mobile ? true : undefined}
                  aria-describedby={errors.mobile ? 'b-mobile-error' : undefined}
                />
                {errors.mobile && <p className="field-error" id="b-mobile-error">{t(errors.mobile)}</p>}
              </div>

              <div className="field">
                <label htmlFor="b-size">
                  {t('Car size')} <span className="req">*</span>
                </label>
                <select
                  id="b-size"
                  value={size || ''}
                  onChange={(e) => chooseSize(e.target.value || null)}
                  required
                >
                  <option value="">{t('Select a size')}</option>
                  <option value="large">{t('Large: SUVs, 4x4s and trucks')}</option>
                  <option value="medium">{t('Medium: Sedans and coupes')}</option>
                  <option value="small">{t('Small: Hatchbacks and smaller sports cars')}</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="b-date">{t('Preferred date / time')}</label>
                <input id="b-date" name="date" type="datetime-local" value={form.date} onChange={onFieldChange} />
              </div>

              <div className="field full">
                <label>{t('Selected services')}</label>
                <div className="chip-row">
                  {services.length ? (
                    services.map((s) => (
                      <span className="chip" key={s}>
                        {t(SERVICE_LABELS[s])}
                      </span>
                    ))
                  ) : (
                    <span className="chip chip-empty">{t('Select at least one service')}</span>
                  )}
                </div>
                <a className="link-arrow" href="#services" style={{ fontSize: 13 }}>
                  {t('Change selection')}
                </a>
              </div>

              <div className="field">
                <label htmlFor="b-vehicle">
                  {t('Car make / model')} <span className="req">*</span>
                </label>
                <input
                  id="b-vehicle" maxLength={100}
                  name="vehicle"
                  type="text"
                  placeholder={t('e.g. Porsche 911')}
                  value={form.vehicle}
                  onChange={onFieldChange}
                  aria-invalid={errors.vehicle ? true : undefined}
                  aria-describedby={errors.vehicle ? 'b-vehicle-error' : undefined}
                />
                {errors.vehicle && <p className="field-error" id="b-vehicle-error">{t(errors.vehicle)}</p>}
              </div>

              <div className="field full">
                <label htmlFor="b-notes">{t('Message (optional)')}</label>
                <textarea
                  id="b-notes" maxLength={1000}
                  name="notes"
                  placeholder={t('Anything we should know about your vehicle or request')}
                  value={form.notes}
                  onChange={onFieldChange}
                ></textarea>
              </div>
            </div>

            <div className="form-foot">
              <small>{t('We will not take payment on this form. Our team confirms the appointment and pricing with you.')}</small>
              <button className="btn btn-primary" type="submit">
                {t('Send booking details')}
              </button>
            </div>
            {status && <FormStatus key={submitCount} status={status} />}
          </form>
        </section>

        <section className="step" id="before-after" aria-labelledby="ba-title" style={{ borderBottom: 0 }}>
          <div className="step-head">
            <span className="step-num">{t('Results')}</span>
            <h2 id="ba-title">{t('Before & after')}</h2>
            <p>{t('See the difference professional care makes. Slide to compare.')}</p>
          </div>
          <div className="compare-wrap">
            <div>
              <p className="eyebrow">{t('Comparison')}</p>
              <h2>{t('See the difference')}</h2>
              <p>{t('Drag the handle or use the arrow keys to compare the two images.')}</p>
              <p className="compare-note">{t('Illustrative sample images, not customer results.')}</p>
            </div>
            <CompareSlider
              beforeSrc="/assets/images/before-after/bmw-before.jpg"
              beforeAlt={t('BMW bonnet and headlight before restoration: cracked, dusty bonnet and cloudy headlight (illustrative sample)')}
              afterSrc="/assets/images/before-after/bmw-after.jpg"
              afterAlt={t('BMW bonnet and headlight after restoration: clean bonnet and clear headlight (illustrative sample)')}
            />
          </div>
        </section>
      </div>
    </>
  );
}
