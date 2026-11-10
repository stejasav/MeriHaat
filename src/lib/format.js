import { currentLanguage } from '../i18n';

// Formatting follows the active language, but keeps Latin digits everywhere so prices,
// dates and the calendar numerals stay in Archivo and line up across languages.
const locale = () => `${currentLanguage().tag}-u-nu-latn`;

const cache = new Map();
const formatter = (key, make) => {
  if (!cache.has(key)) cache.set(key, make());
  return cache.get(key);
};

export const formatINR = (value) => {
  const loc = locale();
  return formatter(`inr|${loc}`, () => new Intl.NumberFormat(loc, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })).format(value);
};

export const formatDay = (date, opts = {}) => {
  const loc = locale();
  return formatter(`day|${loc}|${JSON.stringify(opts)}`, () => new Intl.DateTimeFormat(loc, opts)).format(date);
};

export const monthName = (monthIndex, style = 'long', year = new Date().getFullYear()) => formatDay(new Date(year, monthIndex, 1), { month: style });
