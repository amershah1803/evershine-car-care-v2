'use client';

import Link from 'next/link';
import Icon from '@/components/Icon';
import { useLanguage } from '@/components/LanguageProvider';
import { siteConfig } from '@/lib/config';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="about-hero">
        <img
          src="/assets/images/hero/hero-porsche-desktop.jpg"
          alt={t('Grey Porsche 911 Turbo S in the Evershine showroom')}
          loading="eager"
          width={1106}
          height={310}
        />
        <div className="container">
          <div className="about-hero-body">
            <p className="eyebrow">{t('About Evershine')}</p>
            <h1>
              {t('The Total')} <span className="accent">{t('Car Care')}</span> {t('Center.')}
            </h1>
            <p>
              {t('Evershine Car Care Center looks after cars in Al Khobar with professional detailing, protection and finishing work, delivered by a team that takes pride in the details.')}
            </p>
            <span className="est">{t('Established 2004')}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <img
            src="/assets/images/about/reception-showroom.jpg"
            alt={t('Evershine reception with the illuminated Evershine logo on a timber-slatted wall')}
            loading="lazy"
            width={780}
            height={462}
            style={{ objectPosition: '52% 50%' }}
          />
          <div>
            <p className="eyebrow">{t('Who we are')}</p>
            <h2>{t('Trusted car care in Al Khobar since 2004')}</h2>
            <p>
              {t('Our showroom is built for detailing work: clean finishes, careful preparation and the right products for each vehicle. Whether your car needs a seasonal wash, a deep interior clean or long-term protection, we treat every vehicle with the same care.')}
            </p>
            <ul className="check-list">
              <li>{t('Detailing and polishing')}</li>
              <li>{t('Ceramic coating')}</li>
              <li>{t('Paint protection film (PPF)')}</li>
              <li>{t('Window tinting')}</li>
              <li>{t('Interior cleaning and thermal insulation')}</li>
            </ul>
            <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link className="btn btn-primary" href="/services">
                {t('View services & packages')}
              </Link>
              <Link className="btn btn-outline" href="/branches">
                {t('Visit our branch')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container split">
          <div>
            <p className="eyebrow">{t('Our showroom')}</p>
            <h2>{t('Built for precision work')}</h2>
            <p>
              {t('Our bays are lit with hexagonal LED ceiling lights so that paint, glass and trim can be inspected properly before and after every job.')}
            </p>
          </div>
          <img
            src="/assets/images/about/showroom-hex-lights.jpg"
            alt={t('Grey Porsche 911 front view in the Evershine showroom under hexagonal lights')}
            loading="lazy"
            width={494}
            height={462}
          />
        </div>
      </section>

      {siteConfig.testimonials.length > 0 && (
        <section className="section" aria-labelledby="reviews-title">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">{t('Reviews')}</p>
                <h2 className="section-title" id="reviews-title">
                  {t('What our customers say')}
                </h2>
              </div>
            </div>
            <div className="testimonial-list">
              {siteConfig.testimonials.map((item, i) => (
                <figure className="testimonial" key={i}>
                  <blockquote>{item.quote}</blockquote>
                  <figcaption>{[item.name, item.source].filter(Boolean).join(' · ')}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-tight">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>{t('Ready to book your car care?')}</h2>
              <p>{t('Choose your car size and services, then send us your details.')}</p>
            </div>
            <div className="actions">
              <Link className="btn btn-primary" href="/services">
                {t('Book a service')}
              </Link>
              <Link className="btn btn-outline" href="/contact">
                {t('Contact us')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
