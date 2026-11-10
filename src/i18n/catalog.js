import i18n, { LANGUAGES } from './index';

// Display text for catalogue data lives in the locale files; the data modules hold only ids,
// prices and structure. These helpers keep the key shapes in one place.

export const productName = (t, p) => t(`products.${p.id}.name`);
export const productShort = (t, p) => t(`products.${p.id}.short`);
export const productOrigin = (t, p) => t(`products.${p.id}.origin`);
export const productNote = (t, p) => t(`products.${p.id}.note`);
export const categoryName = (t, id) => t(`categories.${id}`);
export const cityName = (t, id) => t(`cities.${id}`);

// Metric weights and volumes (g, kg, ml, L) read the same in every language;
// piece counts and the fruit box are translated.
export function packLabel(t, pack) {
  if (pack.id === 'box') return t('units.box');
  const pieces = pack.label.match(/^(\d+) pcs?$/);
  return pieces ? t('units.pieces', { count: Number(pieces[1]) }) : pack.label;
}

// Search matches a product in every language at once, plus romanised aliases,
// so "seb", "सेब", "আপেল" and "apple" all find the Kinnaur apple whichever language is active.
const haystacks = new Map();
export function searchHaystack(p) {
  if (!haystacks.has(p.id)) {
    const parts = LANGUAGES.flatMap(({ code }) => {
      const prod = i18n.getResource(code, 'translation', `products.${p.id}`) ?? {};
      return [prod.name, prod.short, prod.origin, prod.note, i18n.getResource(code, 'translation', `categories.${p.category}`)];
    });
    haystacks.set(p.id, [p.id, p.category, p.aliases, ...parts].filter(Boolean).join(' ').toLowerCase());
  }
  return haystacks.get(p.id);
}
