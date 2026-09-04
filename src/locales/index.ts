import { vi } from './vi';
import { en } from './en';
import { Locale, Translations } from './types';

export * from './types';
export { vi, en };

export const dictionaries: Record<Locale, Translations> = {
  vi,
  en,
};

export const defaultLocale: Locale = 'vi';

export const getDictionary = (locale: Locale = defaultLocale): Translations => {
  return dictionaries[locale] || dictionaries[defaultLocale];
};
