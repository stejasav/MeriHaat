import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import mr from './locales/mr.json';
import ta from './locales/ta.json';

// The five languages MeriHaat speaks. `native` is how each appears in the switcher;
// `tag` is the BCP 47 tag used for <html lang> and Intl formatting.
export const LANGUAGES = [
  { code: 'en', native: 'English', short: 'EN', tag: 'en-IN' },
  { code: 'hi', native: 'हिंदी', short: 'हि', tag: 'hi-IN' },
  { code: 'bn', native: 'বাংলা', short: 'বা', tag: 'bn-IN' },
  { code: 'mr', native: 'मराठी', short: 'म', tag: 'mr-IN' },
  { code: 'ta', native: 'தமிழ்', short: 'த', tag: 'ta-IN' },
];

export const STORAGE_KEY = 'merihaat:lang';

const languageMeta = (code) => LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];

// Keep the document in step with the UI language: lang attribute (fonts, hyphenation,
// screen readers), title and description.
function syncDocument(lng) {
  if (typeof document === 'undefined') return;
  const meta = languageMeta(lng);
  document.documentElement.lang = meta.tag;
  document.title = i18n.t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.t('meta.description'));
}

i18n.on('languageChanged', syncDocument);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      bn: { translation: bn },
      mr: { translation: mr },
      ta: { translation: ta },
    },
    supportedLngs: LANGUAGES.map((l) => l.code),
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    fallbackLng: 'en',
    // English is the default: only an explicit choice (stored, or ?lang= in the URL) changes it.
    detection: {
      order: ['querystring', 'localStorage'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: STORAGE_KEY,
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    returnEmptyString: false,
    react: { useSuspense: false },
  });

syncDocument(i18n.resolvedLanguage);

export const currentLanguage = () => languageMeta(i18n.resolvedLanguage);

export default i18n;
