'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AR as BASE_AR } from '@/lib/i18n-ar';
import { EXTRA } from '@/lib/i18n-extra';

const AR = { ...BASE_AR, ...EXTRA };
const STORAGE_KEY = 'evershine-lang';

const LanguageContext = createContext(null);

/**
 * English / Arabic switching. The English text in the components is the source of
 * truth; t('English text') returns the Arabic translation when Arabic is active.
 * Arabic switches <html lang> and <html dir> to rtl, which the CSS uses for layout.
 */
export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  // Restore the saved choice after the first render (keeps server and client markup identical).
  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === 'ar') setLangState('ar');
    } catch (e) {
      /* storage unavailable: stay in English */
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = useCallback((next) => {
    const value = next === 'ar' ? 'ar' : 'en';
    setLangState(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* storage unavailable */
    }
  }, []);

  const t = useCallback((key) => (lang === 'ar' && AR[key] ? AR[key] : key), [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
