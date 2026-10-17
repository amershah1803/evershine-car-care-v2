'use client';

import { useState } from 'react';
import FormStatus from '@/components/FormStatus';
import Icon from '@/components/Icon';
import { useLanguage } from '@/components/LanguageProvider';
import WhatsAppLink from '@/components/WhatsAppLink';
import { siteConfig } from '@/lib/config';
import { validateFields } from '@/lib/validation';
import { enquiryMessage, waUrl } from '@/lib/whatsapp';

const ENQUIRY_RULES = {
  name: { required: 'Please enter your name.' },
  mobile: { required: 'Please enter your mobile number.', mobile: true },
  message: { required: 'Please enter a message.' },
};

const FIELD_IDS = { name: 'c-name', mobile: 'c-mobile', message: 'c-message' };

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', mobile: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitCount, setSubmitCount] = useState(0);

  const onFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validateFields(form, ENQUIRY_RULES);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      setStatus({ kind: 'error', key: 'Please fix the highlighted fields.' });
      setSubmitCount((c) => c + 1);
      return;
    }
    const text = enquiryMessage({
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      message: form.message.trim(),
    });
    if (waUrl(text)) {
      window.open(waUrl(text), '_blank', 'noopener');
      setStatus({ kind: 'success', key: 'WhatsApp has opened with your message.' });
    } else {
      setStatus({ kind: 'warning', copy: text });
    }
    setSubmitCount((c) => c + 1);
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t('Contact')}</p>
          <h1>{t('Contact Evershine')}</h1>
          <p>{t('Send us a message or visit our Al Khobar branch.')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-card">
            <h2>{t('Evershine Car Care Center')}</h2>
            <p className="muted" style={{ marginTop: 6 }}>
              {t('Al Khobar, Saudi Arabia')}
            </p>

            <div className="info-list">
              {siteConfig.phoneTel && (
                <div className="info-row">
                  <Icon name="phone" />
                  <div>
                    <span className="label">{t('Phone')}</span>
                    <a href={'tel:' + siteConfig.phoneTel}>{siteConfig.phoneDisplay || siteConfig.phoneTel}</a>
                  </div>
                </div>
              )}
              {siteConfig.email && (
                <div className="info-row">
                  <Icon name="mail" />
                  <div>
                    <span className="label">{t('Email')}</span>
                    <a href={'mailto:' + siteConfig.email}>{siteConfig.email}</a>
                  </div>
                </div>
              )}
              <div className="info-row">
                <Icon name="chat" />
                <div>
                  <span className="label">{t('WhatsApp')}</span>
                  <WhatsAppLink
                    className="btn btn-primary btn-sm"
                    style={{ marginTop: 6 }}
                    message="Hello Evershine, I would like to make an enquiry."
                    fallback="/contact#enquiry"
                  >
                    {t('Message on WhatsApp')}
                  </WhatsAppLink>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-card" id="enquiry">
            <h2>{t('Send an enquiry')}</h2>
            <p className="muted" style={{ marginTop: 6, fontSize: 14 }}>
              {t('Fields marked')} <span style={{ color: 'var(--red)' }}>*</span> {t('are required. Sending a message does not confirm a booking.')}
            </p>
            <form id="enquiry-form" noValidate style={{ marginTop: 20 }} onSubmit={onSubmit}>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="c-name">
                    {t('Full name')} <span className="req">*</span>
                  </label>
                  <input
                    id="c-name" maxLength={100}
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={onFieldChange}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? 'c-name-error' : undefined}
                  />
                  {errors.name && <p className="field-error" id="c-name-error">{t(errors.name)}</p>}
                </div>
                <div className="field">
                  <label htmlFor="c-mobile">
                    {t('Mobile number')} <span className="req">*</span>
                  </label>
                  <input
                    id="c-mobile" maxLength={20}
                    name="mobile"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="05XXXXXXXX"
                    value={form.mobile}
                    onChange={onFieldChange}
                    aria-invalid={errors.mobile ? true : undefined}
                    aria-describedby={errors.mobile ? 'c-mobile-error' : undefined}
                  />
                  {errors.mobile && <p className="field-error" id="c-mobile-error">{t(errors.mobile)}</p>}
                </div>
                <div className="field full">
                  <label htmlFor="c-message">
                    {t('Message')} <span className="req">*</span>
                  </label>
                  <textarea
                    id="c-message" maxLength={1000}
                    name="message"
                    value={form.message}
                    onChange={onFieldChange}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? 'c-message-error' : undefined}
                  ></textarea>
                  {errors.message && <p className="field-error" id="c-message-error">{t(errors.message)}</p>}
                </div>
              </div>
              <div className="form-foot">
                <small>{t('We reply during business hours.')}</small>
                <button className="btn btn-primary" type="submit">
                  {t('Send enquiry')}
                </button>
              </div>
              {status && <FormStatus key={submitCount} status={status} />}
            </form>
          </div>
        </div>
      </section>

    </>
  );
}
