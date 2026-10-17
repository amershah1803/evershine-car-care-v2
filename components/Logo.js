'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

/** Evershine logo. If the image is missing, it falls back to the EVERSHINE wordmark text. */
export default function Logo({ className, width, height, fallbackClass }) {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);
  if (failed) return <span className={fallbackClass}>EVERSHINE</span>;
  return (
    <img
      className={className}
      src="/assets/images/logo/evershine-logo.png"
      alt={t('Evershine Car Care Center logo')}
      width={width}
      height={height}
      onError={() => setFailed(true)}
    />
  );
}
