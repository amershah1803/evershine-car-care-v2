'use client';

import { useRef, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

const clamp = (n) => Math.min(100, Math.max(0, n));

/** Before/after slider: drag or use the arrow keys. */
export default function CompareSlider({ beforeSrc, beforeAlt, afterSrc, afterAlt }) {
  const { t } = useLanguage();
  const ref = useRef(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const fromClientX = (clientX) => {
    const rect = ref.current.getBoundingClientRect();
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 5;
    if (e.key === 'ArrowLeft') setPos((p) => clamp(p - step));
    else if (e.key === 'ArrowRight') setPos((p) => clamp(p + step));
    else if (e.key === 'Home') setPos(0);
    else if (e.key === 'End') setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      className={'compare' + (dragging ? ' is-dragging' : '')}
      style={{ '--pos': pos + '%' }}
      onPointerDown={(e) => {
        ref.current.setPointerCapture(e.pointerId);
        setDragging(true);
        fromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging) fromClientX(e.clientX);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <img className="compare-after" src={afterSrc} alt={afterAlt} loading="lazy" width={1536} height={1024} />
      <img className="compare-before" src={beforeSrc} alt={beforeAlt} loading="lazy" width={1536} height={1024} />
      <span className="compare-label before">{t('Before')}</span>
      <span className="compare-label after">{t('After')}</span>
      <div
        className="compare-handle"
        role="slider"
        tabIndex={0}
        aria-label={t('Before and after comparison')}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
