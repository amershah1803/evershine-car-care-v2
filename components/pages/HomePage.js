'use client';

import Link from 'next/link';
import CompareSlider from '@/components/CompareSlider';
import Icon from '@/components/Icon';
import WhatsAppLink from '@/components/WhatsAppLink';
import { useLanguage } from '@/components/LanguageProvider';
import { siteConfig } from '@/lib/config';

// Six supplied photos for the homepage gallery. Each opens Evershine's Instagram page.
const HOME_GALLERY = [
  { src: '/assets/images/gallery/evershine-porsche-rear.jpg', alt: 'Grey Porsche 911 with a red roof in the Evershine showroom' },
  { src: '/assets/images/gallery/evershine-gmc-facade.jpg', alt: 'White GMC Yukon outside the Evershine showroom' },
  { src: '/assets/images/gallery/evershine-reception-wall.jpg', alt: 'Evershine reception with the illuminated Evershine logo on a timber-slatted wall' },
  { src: '/assets/images/gallery/evershine-porsche-front.jpg', alt: 'Grey Porsche 911 front view in the Evershine showroom under hexagonal lights' },
  { src: '/assets/images/gallery/evershine-g-class.jpg', alt: 'Black Mercedes-Benz G-Class in the Evershine showroom' },
  { src: '/assets/images/gallery/evershine-rx7.jpg', alt: 'Blue Mazda RX-7 in the Evershine showroom' },
];

// Uses the language context for every visible string, so it is a client component.
export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <div className="container hero-frame">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media">
          <img
            src="/assets/images/hero/hero-sunset-desktop.jpg"
            width={2056}
            height={765}
            alt={t('Grey Porsche 911 with a burgundy roof driving on a highway at sunset, with the Riyadh skyline behind')}
            fetchPriority="high"
          />
        </div>
        <div className="hero-overlay" aria-hidden="true"></div>
        <div className="hero-content">
          <p className="eyebrow">{t('Premium car care in Al Khobar')}</p>
          <h1 id="hero-title">
            <span className="hero-line">{t('More than a car wash')}</span>
            <span className="hero-line accent">{t('A higher standard')}</span>
          </h1>
          <p className="hero-lead">
            {t('Professional detailing, ceramic coating, paint protection film, window tinting and more. Trusted since 2004.')}
          </p>
          <div className="hero-actions">
            <WhatsAppLink
              className="btn btn-primary"
              message="Hello Evershine, I would like to book via WhatsApp."
              fallback="/contact#enquiry"
            >
              <Icon name="chat" className="btn-icon" />
              <span>{t('Book via WhatsApp')}</span>
            </WhatsAppLink>
            <Link className="btn btn-outline" href="/services">
              {t('Our Services')}
            </Link>
          </div>
        </div>
      </section>
      </div>

      <section className="feature-row" aria-label={t('Quick links')}>
        <div className="container feature-grid-3">
          <Link className="feature-card is-red" href="/services">
            <Icon name="calendar" className="card-icon" />
            <span className="feature-foot">
              <span className="feature-body">
                <strong>{t('Book Now')}</strong>
                <span>{t('Begin with your car care journey with Evershine.')}</span>
              </span>
              <Icon name="arrow" className="arrow" />
            </span>
          </Link>
          <Link className="feature-card" href="/services?services=ceramic-coating">
            <img className="feature-bg" src="/assets/images/services/ceramic-coating.jpg" alt="" loading="lazy" />
            <Icon name="shield" className="card-icon" />
            <span className="feature-foot">
              <span className="feature-body">
                <strong>{t('Nano Ceramic Coating & Paint Protection Film')}</strong>
                <span>{t('Long lasting protection and deep gloss.')}</span>
              </span>
              <Icon name="arrow" className="arrow" />
            </span>
          </Link>
          <Link className="feature-card" href="/work">
            <img className="feature-bg" src="/assets/images/gallery/hex-lights.jpg" alt="" loading="lazy" />
            <Icon name="camera" className="card-icon" />
            <span className="feature-foot">
              <span className="feature-body">
                <strong>{t('Our Gallery')}</strong>
                <span>{t('Explore our latest work and car care transformations.')}</span>
              </span>
              <Icon name="arrow" className="arrow" />
            </span>
          </Link>
        </div>
      </section>

      <section className="section home-services" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t('Our services')}</p>
              <h2 className="section-title" id="services-title">
                {t('Complete Car Care Under One Roof')}
              </h2>
            </div>
            <Link className="link-arrow" href="/services">
              {t('View All Services')} <Icon name="arrow" className="btn-icon" />
            </Link>
          </div>
          <div className="service-strip">
            <Link className="service-card" href="/services?services=ceramic-coating">
              <img
                src="/assets/images/services/ceramic-coating.jpg"
                alt={t('Technician applying ceramic coating to a black car')}
                loading="lazy"
                width={614}
                height={304}
              />
              <span className="service-card-body">
                <Icon name="shield" className="card-icon" />
                <strong>{t('Nano Ceramic Coating')}</strong>
                <Icon name="arrow" className="arrow" />
              </span>
            </Link>
            <Link className="service-card" href="/services?services=ppf">
              <img
                src="/assets/images/services/ppf.jpg"
                alt={t('Installing paint protection film on a car bonnet')}
                loading="lazy"
                width={614}
                height={304}
              />
              <span className="service-card-body">
                <Icon name="film" className="card-icon" />
                <strong>{t('Paint Protection Film')}</strong>
                <Icon name="arrow" className="arrow" />
              </span>
            </Link>
            <Link className="service-card" href="/services?services=polishing">
              <img
                src="/assets/images/services/polishing.jpg"
                alt={t('Polishing a black car bonnet with a rotary polisher')}
                loading="lazy"
                width={618}
                height={304}
              />
              <span className="service-card-body">
                <Icon name="sparkle" className="card-icon" />
                <strong>{t('Polishing')}</strong>
                <Icon name="arrow" className="arrow" />
              </span>
            </Link>
            <Link className="service-card" href="/services?services=window-tinting">
              <img
                src="/assets/images/services/window-tinting.jpg"
                alt={t('Applying window tint film to a car door')}
                loading="lazy"
                width={614}
                height={304}
              />
              <span className="service-card-body">
                <Icon name="window" className="card-icon" />
                <strong>{t('Window Tinting')}</strong>
                <Icon name="arrow" className="arrow" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tight home-results" aria-labelledby="results-title">
        <div className="container compare-wrap">
          <div>
            <p className="eyebrow">{t('Before & after')}</p>
            <h2 id="results-title">{t('Real Results')}</h2>
            <p>{t('See the difference professional car care makes. Slide to compare before and after.')}</p>
            <p className="compare-note">{t('Illustrative sample images, not customer results.')}</p>
            <Link className="link-arrow" href="/services#before-after" style={{ marginTop: 16 }}>
              {t('Learn More')} <Icon name="arrow" className="btn-icon" />
            </Link>
          </div>
          <CompareSlider
            beforeSrc="/assets/images/before-after/bmw-before.jpg"
            beforeAlt={t('BMW bonnet and headlight before restoration: cracked, dusty bonnet and cloudy headlight (illustrative sample)')}
            afterSrc="/assets/images/before-after/bmw-after.jpg"
            afterAlt={t('BMW bonnet and headlight after restoration: clean bonnet and clear headlight (illustrative sample)')}
          />
        </div>
      </section>

      <section className="section-tight home-about" aria-labelledby="about-title">
        <div className="container split about-preview">
          <img
            src="/assets/images/about/reception-showroom.jpg"
            alt={t('Evershine reception with the illuminated Evershine logo on a timber-slatted wall')}
            loading="lazy"
            width={1942}
            height={810}
          />
          <div>
            <p className="eyebrow">{t('About Evershine')}</p>
            <h2 id="about-title">{t('The Total Car Care Center')}</h2>
            <p>
              {t('Evershine Car Care Center in Al Khobar looks after cars with professional detailing, protection and finishing work. Trusted since 2004.')}
            </p>
            <Link className="btn btn-outline btn-sm" href="/about" style={{ marginTop: 18 }}>
              {t('Learn More')}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tight home-branch" aria-labelledby="branch-title">
        <div className="container">
          <div className="branch-card branch-banner">
            <img
              src="/assets/images/branch/showroom-white-suv.jpg"
              alt={t('White GMC Yukon SUV in front of the Evershine showroom (sample image)')}
              loading="lazy"
              width={1536}
              height={864}
            />
            <div className="branch-body">
              <p className="eyebrow">{t('Our branch')}</p>
              <h2 id="branch-title">{t('Visit Our Branch')}</h2>
              <p className="branch-name">{t('Al Khobar')}</p>
              <p>{t('Visit Evershine Car Care Center in Al Khobar.')}</p>
              <a
                className="btn btn-light btn-sm stretch-link"
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener"
              >
                {t('Get Directions')} <Icon name="arrow" className="btn-icon" />
              </a>
            </div>
            <span className="sample-tag">{t('Sample image')}</span>
          </div>
        </div>
      </section>

      <section className="section-tight home-work" aria-labelledby="work-title">
        <div className="container">
          <div className="work-head">
            <div>
              <p className="eyebrow">{t('Our work')}</p>
              <h2 id="work-title">{t('Our Work')}</h2>
              <p>{t('Explore our latest work and car care transformations.')}</p>
            </div>
            <Link className="btn btn-outline btn-sm" href="/work">
              {t('View Gallery')} <Icon name="arrow" className="btn-icon" />
            </Link>
          </div>
          <ul className="home-gallery" aria-label={t('Our work photos')}>
            {HOME_GALLERY.map((item) => (
              <li key={item.src}>
                <a
                  className="home-gallery-item"
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener"
                  title={t('Open Evershine on Instagram in a new tab')}
                  aria-label={t(item.alt) + ' (' + t('opens Instagram in a new tab') + ')'}
                >
                  <img src={item.src} alt="" loading="lazy" width={500} height={476} />
                </a>
              </li>
            ))}
          </ul>
          <p className="compare-note">{t('Illustrative sample images, not customer projects.')}</p>
        </div>
      </section>

      <section className="section-tight home-contact" aria-labelledby="contact-title">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2 id="contact-title">{t('Ready to book your car care?')}</h2>
              <p>{t('Message us on WhatsApp or send an enquiry, and our team will get back to you.')}</p>
            </div>
            <div className="actions">
              <WhatsAppLink
                className="btn btn-primary"
                message="Hello Evershine, I would like to make an enquiry."
                fallback="/contact#enquiry"
              >
                {t('Message on WhatsApp')}
              </WhatsAppLink>
              <Link className="btn btn-outline" href="/contact">
                {t('Contact Us')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
