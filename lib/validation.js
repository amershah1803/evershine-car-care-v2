import { normalizeSaudiMobile } from '@/lib/whatsapp';

/**
 * rules: { fieldName: { required: 'Message key', mobile: true } }
 * Returns { fieldName: 'Message key' } for every field that fails. Empty object = valid.
 * Messages are English keys; the page translates them with t().
 */
export function validateFields(values, rules) {
  const errors = {};
  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = (values[field] || '').trim();
    if (!value) {
      errors[field] = rule.required;
    } else if (rule.mobile && !normalizeSaudiMobile(value)) {
      errors[field] = 'Enter a valid Saudi mobile number, e.g. 05XXXXXXXX.';
    }
  });
  return errors;
}
