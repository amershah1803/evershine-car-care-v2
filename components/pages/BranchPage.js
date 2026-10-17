'use client';

import Link from 'next/link';
import Icon from '@/components/Icon';
import { useLanguage } from '@/components/LanguageProvider';
import { siteConfig } from '@/lib/config';

export default function BranchPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t('Our branch')}</p>
          <h1>{t('Visit Our Branch')}</h1>
          <p>{t('Visit Evershine Car Care Center in Al Khobar.')}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <figure className="saudi-map">
            <img
              src="/assets/images/branch/saudi-arabia-al-khobar-map.png"
              alt={t('Map of Saudi Arabia with a red pin marking Al Khobar on the Eastern Province coast')}
              width={1672}
              height={941}
              loading="lazy"
            />
            <figcaption className="compare-note">{t('Stylised map, not to scale.')}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container branch-page-grid">
          <div className="branch-info">
            <p className="eyebrow">{t('Al Khobar')}</p>
            <h2>{t('Evershine Car Care Center')}</h2>
            <div className="loc-row">
              <Icon name="pin" />
              <div>
                <strong>{t('Al Khobar')}</strong>
                <br />
                {t('Al Khobar, Saudi Arabia')}
              </div>
            </div>
            <p className="muted" style={{ fontSize: 14 }}>
              {t('Use the button below to open the branch on Google Maps.')}
            </p>
            <a className="btn btn-primary" href={siteConfig.mapsUrl} target="_blank" rel="noopener">
              {t('Get Directions')}
            </a>
            {!siteConfig.mapsVerified && <p className="maps-note">{t('Directions link pending verification.')}</p>}
            <div className="branch-links">
              <Link className="btn btn-outline btn-sm" href="/services">
                {t('Book a service')}
              </Link>
              <Link className="btn btn-outline btn-sm" href="/contact">
                {t('Contact us')}
              </Link>
            </div>
          </div>
          <figure className="branch-photo">
            <img
              src="/assets/images/branch/showroom-gmc-wide.jpg"
              alt={t('White GMC Yukon outside the Evershine showroom')}
              loading="lazy"
              width={2045}
              height={769}
            />
          </figure>
        </div>
      </section>

    </>
  );
}
