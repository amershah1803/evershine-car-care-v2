'use client';

import { useRef, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { COPY_NOTICE } from '@/lib/whatsapp';

/**
 * Form message. status = { kind: 'error' | 'success' | 'warning', key } for text messages,
 * or { kind: 'warning', copy } when WhatsApp is not configured (shows a copy-to-clipboard box).
 */
export default function FormStatus({ status }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const areaRef = useRef(null);

  if (!status) return null;

  if (status.copy !== undefined) {
    const copy = async () => {
      try {
        await navigator.clipboard.writeText(status.copy);
      } catch (e) {
        areaRef.current?.select();
        document.execCommand('copy');
      }
      setCopied(true);
    };
    return (
      <div className="form-status is-warning" role="status" data-form-status>
        <p>{t(COPY_NOTICE)}</p>
        <textarea ref={areaRef} className="copy-area" readOnly value={status.copy} />
        <button type="button" className="btn btn-outline btn-sm" onClick={copy}>
          {t(copied ? 'Copied' : 'Copy details')}
        </button>
      </div>
    );
  }

  return (
    <div
      className={'form-status is-' + status.kind}
      role={status.kind === 'error' ? 'alert' : 'status'}
      data-form-status
    >
      {t(status.key)}
    </div>
  );
}
