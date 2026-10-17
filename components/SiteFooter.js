'use client';

import Link from 'next/link';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import { useLanguage } from '@/components/LanguageProvider';
import { siteConfig } from '@/lib/config';

// Only platforms with a configured URL are shown. Nothing is rendered for an empty URL.
const SOCIAL = [
  { key: 'instagram', label: 'Instagram', icon: 'instagram' },
  { key: 'snapchat', label: 'Snapchat', icon: 'snapchat' },
  { key: 'tiktok', label: 'TikTok', icon: 'tiktok' },
  { key: 'email', label: 'Email', icon: 'mail' },
];

function socialHref(key) {
  if (key === 'email') return siteConfig.email ? 'mailto:' + siteConfig.email : '';
  return siteConfig.social[key] || '';
}

export default function SiteFooter() {
  const { t } = useLanguage();
  // Suppressed: the year can differ between server and browser only across New Year.
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-pattern" aria-hidden="true"></div>
      <div className="container footer-inner">
        <Link className="footer-brand" href="/" aria-label={t('Evershine Car Care Center, home')}>
          <Logo width={150} height={55} fallbackClass="brand-fallback brand-fallback-lg" />
        </Link>
        <p className="footer-tagline">{t('The Total Car Care Center')}</p>

        <ul className="social-links" aria-label={t('Follow Evershine')}>
          {SOCIAL.map((s) => {
            const href = socialHref(s.key);
            if (!href) return null;
            const label = t(s.label);
            return (
              <li key={s.key}>
                <a
                  className="social-link"
                  href={href}
                  target={s.key === 'email' ? undefined : '_blank'}
                  rel={s.key === 'email' ? undefined : 'noopener'}
                  aria-label={label}
                >
                  <Icon name={s.icon} />
                </a>
              </li>
            );
          })}
        </ul>

        {siteConfig.paymentMethods.length > 0 && (
          <div className="footer-payments">
            <ul className="payment-row" aria-label={t('Accepted payment methods')}>
              {siteConfig.paymentMethods.map((m) => (
                <li key={m.name}>
                  <img src={m.logo} alt={m.name} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        )}

        <nav className="footer-nav" aria-label={t('Footer')}>
          <ul>
            <li>
              <Link href="/">{t('Home')}</Link>
            </li>
            <li>
              <Link href="/about">{t('About Us')}</Link>
            </li>
            <li>
              <Link href="/services">{t('Services & Booking')}</Link>
            </li>
            <li>
              <Link href="/work">{t('Our Work')}</Link>
            </li>
            <li>
              <Link href="/branches">{t('Branches')}</Link>
            </li>
            <li>
              <Link href="/contact">{t('Contact')}</Link>
            </li>
          </ul>
        </nav>

        <div className="legal">
          <span suppressHydrationWarning>
            &copy; {year} {t('Evershine Car Care Center. All rights reserved.')}
          </span>
        </div>
      </div>
    </footer>
  );
}
