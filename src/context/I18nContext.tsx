'use client';
import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { Locale, Translations, dictionaries, defaultLocale, getDictionary } from '@/locales';
import Cookies from 'js-cookie';

interface I18nContextType {
  locale: Locale;
  changeLocale: (newLocale: Locale) => void;
  t: (keyPath: string, fallback?: string) => string;
  dictionary: Translations;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Read saved locale from cookie or localStorage
    const savedLocale = (Cookies.get('NEXT_LOCALE') || localStorage.getItem('locale')) as Locale;
    if (savedLocale && (savedLocale === 'vi' || savedLocale === 'en')) {
      setLocale(savedLocale);
    }
    setIsInitialized(true);
  }, []);

  const changeLocale = useCallback((newLocale: Locale) => {
    if (newLocale === 'vi' || newLocale === 'en') {
      setLocale(newLocale);
      localStorage.setItem('locale', newLocale);
      Cookies.set('NEXT_LOCALE', newLocale, { expires: 365, sameSite: 'lax' });
      document.documentElement.lang = newLocale;
    }
  }, []);

  const dictionary = useMemo(() => {
    return getDictionary(locale);
  }, [locale]);

  const t = useCallback((keyPath: string, fallback?: string): string => {
    const keys = keyPath.split('.');
    let current: any = dictionary;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to defaultLocale dictionary
        let fallbackCurrent: any = dictionaries[defaultLocale];
        for (const fbKey of keys) {
          if (fallbackCurrent && typeof fallbackCurrent === 'object' && fbKey in fallbackCurrent) {
            fallbackCurrent = fallbackCurrent[fbKey];
          } else {
            return fallback || keyPath;
          }
        }
        return typeof fallbackCurrent === 'string' ? fallbackCurrent : fallback || keyPath;
      }
    }

    return typeof current === 'string' ? current : fallback || keyPath;
  }, [dictionary]);

  return (
    <I18nContext.Provider value={{ locale, changeLocale, t, dictionary }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    // Fallback safe return for components outside provider or during SSR
    const dict = getDictionary(defaultLocale);
    return {
      locale: defaultLocale,
      changeLocale: () => {},
      dictionary: dict,
      t: (keyPath: string, fallback?: string): string => {
        const keys = keyPath.split('.');
        let current: any = dict;
        for (const key of keys) {
          if (current && typeof current === 'object' && key in current) {
            current = current[key];
          } else {
            return fallback || keyPath;
          }
        }
        return typeof current === 'string' ? current : fallback || keyPath;
      },
    };
  }
  return context;
};

export default I18nContext;
