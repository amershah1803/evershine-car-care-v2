import Link from 'next/link';
import { waUrl } from '@/lib/whatsapp';

/**
 * Opens WhatsApp with a pre-filled message when a number is configured.
 * Otherwise it links to `fallback` (the contact form), so nothing breaks.
 */
export default function WhatsAppLink({ message, fallback, className, style, children }) {
  const href = waUrl(message);
  if (href) {
    return (
      <a className={className} style={style} href={href} target="_blank" rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} style={style} href={fallback}>
      {children}
    </Link>
  );
}
