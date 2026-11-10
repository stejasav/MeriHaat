import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import { PRODUCTS, isInSeason } from '../../data/products';
import { BESTSELLER_ORDER, seasonShelf } from '../../data/shelves';
import ProductGrid from '../product/ProductGrid';
import SectionHeading from './SectionHeading';

// Suggestions that react to the basket: same-aisle companions first, then new arrivals.
const LEAN = ['staples', 'pantry', 'dairy'];

export function useRecommendations(limit = 4, exclude = [], month = new Date().getMonth()) {
  const { lines } = useCart();
  return useMemo(() => {
    const inBasket = new Set(lines.map((l) => l.productId));
    const cats = new Set(lines.map((l) => l.product.category));
    const skip = new Set(exclude);
    const pool = PRODUCTS.filter((p) => !inBasket.has(p.id) && !skip.has(p.id) && p.id !== 'fruit-box' && isInSeason(p, month));
    const companions = pool.filter((p) => cats.has(p.category));
    const fresh = pool.filter((p) => LEAN.includes(p.category));
    const seen = new Set();
    return [...companions, ...fresh, ...pool].filter((p) => !seen.has(p.id) && seen.add(p.id)).slice(0, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, limit, month, exclude.join()]);
}

export default function Recommended({ month }) {
  const { t } = useTranslation();
  const { count } = useCart();
  const exclude = [...seasonShelf(month, { isCurrent: true }).map((p) => p.id), ...BESTSELLER_ORDER];
  const items = useRecommendations(4, exclude, month);
  return (
    <section aria-labelledby="rec-heading" className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <SectionHeading id="rec-heading" title={t(count ? 'recommended.withBasket' : 'recommended.firstOrder')} />
      <div className="mt-8">
        <ProductGrid products={items} cols="grid-cols-2 lg:grid-cols-4" />
      </div>
    </section>
  );
}
