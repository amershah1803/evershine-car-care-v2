'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import WhatsAppLink from '@/components/WhatsAppLink';
import { useLanguage } from '@/components/LanguageProvider';

const SERVICE_MENU = [
  { href: '/services', label: 'All services & packages' },
  { href: '/services?services=ceramic-coating', label: 'Ceramic coating' },
  { href: '/services?services=ppf', label: 'Paint protection film' },
  { href: '/services?services=window-tinting', label: 'Window tinting' },
  { href: '/services?services=polishing', label: 'Polishing' },
  { href: '/services?services=interior-cleaning', label: 'Interior cleaning' },
  { href: '/services?services=exterior-detailing', label: 'Exterior detailing' },
  { href: '/services?services=thermal-insulation', label: 'Thermal insulation' },
  { href: '/services?services=other', label: 'Other services' },
];

export default function SiteHeader() {
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scrolling while the mobile menu is open.
  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const current = (href) => (pathname === href.split('#')[0].split('?')[0] ? 'page' : undefined);

  return (
    <>
      <a className="skip-link" href="#main">
        {t('Skip to content')}
      </a>
      <header className={'site-header' + (scrolled ? ' is-scrolled' : '')} id="siteHeader">
        <div className="container header-inner">
          <Link className="brand" href="/" aria-label={t('Evershine Car Care Center, home')}>
            <Logo className="brand-logo" width={150} height={55} fallbackClass="brand-fallback" />
          </Link>

          <nav className={'primary-nav' + (menuOpen ? ' is-open' : '')} id="primaryNav" aria-label={t('Primary')}>
            <ul className="nav-list">
              <li>
                <Link href="/" aria-current={current('/')} onClick={closeMenu}>
                  {t('Home')}
                </Link>
              </li>
              <li>
                <Link href="/about" aria-current={current('/about')} onClick={closeMenu}>
                  {t('About Us')}
                </Link>
              </li>
              <li className={'has-dropdown' + (dropdownOpen ? ' is-open' : '')}>
                <Link href="/services" aria-current={current('/services')} onClick={closeMenu}>
                  {t('Services')}
                </Link>
                <button
                  className="dropdown-toggle"
                  type="button"
                  aria-expanded={dropdownOpen}
                  aria-label={t('Show service list')}
                  onClick={() => setDropdownOpen((open) => !open)}
                />
                <ul className="dropdown">
                  {SERVICE_MENU.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={closeMenu}>
                        {t(item.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link href="/work" aria-current={current('/work')} onClick={closeMenu}>
                  {t('Our Work')}
                </Link>
              </li>
              <li>
                <Link href="/branches" aria-current={current('/branches')} onClick={closeMenu}>
                  {t('Branches')}
                </Link>
              </li>
              <li>
                <Link href="/contact" aria-current={current('/contact')} onClick={closeMenu}>
                  {t('Contact')}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button
              className="lang-toggle"
              type="button"
              data-lang-toggle
              aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            >
              <span data-lang="en" className={lang === 'en' ? 'is-active' : undefined} aria-current={String(lang === 'en')}>
                EN
              </span>
              <span className="lang-sep" aria-hidden="true">
                |
              </span>
              <span data-lang="ar" className={lang === 'ar' ? 'is-active' : undefined} aria-current={String(lang === 'ar')}>
                العربية
              </span>
            </button>
            <WhatsAppLink
              className="btn btn-primary btn-sm header-cta"
              message="Hello Evershine, I would like to book a service."
              fallback="/contact#enquiry"
            >
              <Icon name="chat" className="btn-icon" />
              <span>{t('Book Now')}</span>
            </WhatsAppLink>
            <button
              className="nav-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="primaryNav"
              aria-label={menuOpen ? t('Close menu') : t('Open menu')}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
