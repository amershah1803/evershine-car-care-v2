'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

const FILTERS = [
  ['all', 'All'],
  ['exterior-detailing', 'Exterior detailing'],
  ['ceramic-coating', 'Ceramic coating'],
  ['ppf', 'PPF'],
  ['polishing', 'Paint polishing'],
  ['interior-detailing', 'Interior detailing'],
  ['window-tinting', 'Window tinting'],
  ['vehicle-showcase', 'Vehicle showcase'],
];

const ITEMS = [
  { src: '/assets/images/gallery/wheel.jpg', alt: 'Brush cleaning a black alloy wheel', cat: 'exterior-detailing', caption: 'Wheel detailing', wide: true },
  { src: '/assets/images/gallery/ceramic-beads.jpg', alt: 'Water beading on a dark car panel after ceramic coating', cat: 'ceramic-coating', caption: 'Ceramic coating finish' },
  { src: '/assets/images/gallery/ppf.jpg', alt: 'Applying paint protection film to a car bonnet', cat: 'ppf', caption: 'Paint protection film' },
  { src: '/assets/images/gallery/polishing.jpg', alt: 'Rotary polisher working on a glossy black bonnet', cat: 'polishing', caption: 'Paint polishing' },
  { src: '/assets/images/gallery/interior.jpg', alt: 'Detailing brush cleaning a dashboard air vent', cat: 'interior-detailing', caption: 'Interior detailing' },
  { src: '/assets/images/services/window-tinting.jpg', alt: 'Applying window tint film to a car door frame', cat: 'window-tinting', caption: 'Window tinting' },
  { src: '/assets/images/gallery/suv.jpg', alt: 'Black luxury SUV parked under showroom lights', cat: 'vehicle-showcase', caption: 'Vehicle showcase' },
  { src: '/assets/images/gallery/sports-car.jpg', alt: 'Red sports car against a dark background', cat: 'vehicle-showcase', caption: 'Vehicle showcase' },
];

export default function WorkPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [openIndex, setOpenIndex] = useState(-1);
  const dialogRef = useRef(null);

  const visible = ITEMS.filter((item) => filter === 'all' || item.cat === filter);
  const current = openIndex >= 0 ? visible[openIndex] : null;

  // Open or close the native <dialog> when the selected image changes.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex >= 0 && !dialog.open) dialog.showModal();
    if (openIndex < 0 && dialog.open) dialog.close();
  }, [openIndex]);

  const move = (delta) => setOpenIndex((i) => (i + delta + visible.length) % visible.length);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t('Our work')}</p>
          <h1>{t('Our Work')}</h1>
          <p>{t('Explore our latest work and car care transformations.')}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <p className="placeholder-notice">{t('Illustrative sample images, not customer projects.')}</p>

          <div className="filters" role="group" aria-label={t('Filter gallery')}>
            {FILTERS.map(([value, label]) => (
              <button
                key={value}
                className="filter-btn"
                type="button"
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {t(label)}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {visible.map((item, i) => (
              <button
                key={item.src}
                className={'gallery-item' + (item.wide ? ' is-wide' : '')}
                type="button"
                onClick={() => setOpenIndex(i)}
              >
                <img src={item.src} alt={t(item.alt)} loading="lazy" />
                <span className="cap">{t(item.caption)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={t('Image viewer')}
        onClose={() => setOpenIndex(-1)}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') move(-1);
          if (e.key === 'ArrowRight') move(1);
        }}
      >
        {current && (
          <div className="lightbox-inner">
            <img src={current.src} alt={t(current.alt)} />
            <div className="lightbox-bar">
              <p>{t(current.caption)}</p>
              <div className="lightbox-controls">
                <button className="lightbox-btn" type="button" aria-label={t('Previous image')} onClick={() => move(-1)}>
                  &#8249;
                </button>
                <button className="lightbox-btn" type="button" aria-label={t('Next image')} onClick={() => move(1)}>
                  &#8250;
                </button>
                <button
                  className="lightbox-btn"
                  type="button"
                  aria-label={t('Close')}
                  onClick={() => dialogRef.current.close()}
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>

      <section className="section-tight">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>{t('Want a similar result on your car?')}</h2>
              <p>{t('Choose your car size and services and send us your details.')}</p>
            </div>
            <div className="actions">
              <Link className="btn btn-primary" href="/services">
                {t('Book a service')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
