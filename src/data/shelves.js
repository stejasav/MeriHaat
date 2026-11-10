import { PRODUCTS, isPeakSeason, productById } from './products';

const EVERY_MORNING = ['a2-milk', 'sharbati-atta'];

// The hero shelf for a month: at most four fruits at their peak, then that month's vegetables,
// and (for the delivery month) the everyday staples, so the shelf is a whole basket, not a fruit stall.
export function seasonShelf(month, { isCurrent }) {
  const peak = PRODUCTS.filter((p) => p.id !== 'fruit-box' && isPeakSeason(p, month));
  const fruit = peak.filter((p) => p.category === 'fruits').slice(0, 4);
  const everyday = isCurrent ? EVERY_MORNING.map((id) => productById[id]) : [];
  const rest = peak.filter((p) => p.category !== 'fruits').slice(0, 8 - fruit.length - everyday.length);
  const shelf = [...fruit, ...rest, ...everyday];
  // Sparse months: close the ruled frame with year-round staples rather than leaving open cells.
  const taken = new Set(shelf.map((p) => p.id));
  const yearRound = PRODUCTS.filter((p) => !p.seasons && p.category !== 'exotic' && p.id !== 'fruit-box' && !taken.has(p.id));
  return [...shelf, ...yearRound].slice(0, 8);
}

// The season band's caption, drawn from the same catalogue as the shelf (products, so callers can translate).
export const peakProducts = (month) => PRODUCTS.filter((p) => p.seasons && p.seasons.includes(month));

// What Delhi orders most, across every aisle.
export const BESTSELLER_ORDER = ['desi-tomato', 'elaichi-banana', 'eggs', 'avocado', 'basmati', 'onion', 'dahi', 'potato', 'kinnaur-apple', 'a2-milk', 'palak'];
