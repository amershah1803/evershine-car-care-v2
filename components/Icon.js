import { ICONS } from '@/lib/icons';

/**
 * Line icon. `name` is a key of ICONS (lib/icons.js). The SVG markup is static
 * internal data, so it is inserted as-is, exactly as the original site did.
 */
export default function Icon({ name, className }) {
  const paths = ICONS[name];
  if (!paths) return null;
  const svg =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    paths +
    '</svg>';
  return (
    <span className={className} data-icon={name} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />
  );
}
