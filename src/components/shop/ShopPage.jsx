import { useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Search, X } from 'lucide-react';
import { CATEGORIES, PRODUCTS, discountPct, isPeakSeason } from '../../data/products';
import { categoryName, searchHaystack } from '../../i18n/catalog';
import ProductGrid from '../product/ProductGrid';

const SORTS = ['popular', 'season', 'price-asc', 'price-desc', 'discount']; // labels: shop.sorts.<id>

export default function ShopPage({ route, go, month }) {
  const { t } = useTranslation();
  const { category, query } = route;
  const [sort, setSort] = useState('popular');
  const [seasonOnly, setSeasonOnly] = useState(false);

  const setCategory = (c) => go('shop', { category: c, query }, { scroll: false });
  const setQuery = (q) => go('shop', { category, query: q }, { scroll: false });

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let list = PRODUCTS.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (seasonOnly && !isPeakSeason(p, month)) return false;
      const hay = searchHaystack(p);
      return terms.every((term) => hay.includes(term));
    });
    const price = (p) => p.packs[0].price;
    const sorters = {
      popular: (a, b) => Number(b.tags.includes('bestseller')) - Number(a.tags.includes('bestseller')),
      season: (a, b) => Number(isPeakSeason(b, month)) - Number(isPeakSeason(a, month)),
      'price-asc': (a, b) => price(a) - price(b),
      'price-desc': (a, b) => price(b) - price(a),
      discount: (a, b) => Math.max(...b.packs.map(discountPct)) - Math.max(...a.packs.map(discountPct)),
    };
    return [...list].sort(sorters[sort]);
  }, [category, query, sort, seasonOnly, month]);

  const countFor = (id) => (id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === id).length);
  const current = CATEGORIES.find((c) => c.id === category);

  return (
    <main id="main" className="mx-auto max-w-[1440px] px-4 pb-24 pt-8 md:px-8 md:pt-12 lg:px-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
        <h1 className="font-semicondensed text-[clamp(2.2rem,4.6vw,4rem)] font-extrabold leading-none tracking-[-0.02em]">
          {current ? categoryName(t, current.id) : t('shop.whole')}
        </h1>
        <p className="text-sm text-ink-soft tabular" aria-live="polite">
          {t('shop.results', { count: results.length })}
          {query && (
            <>
              {' '}
              <Trans i18nKey="shop.forQuery" values={{ query }} components={{ q: <span className="font-semibold text-ink" /> }} />
            </>
          )}
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
        <aside aria-label={t('shop.filters')} className="min-w-0 lg:sticky lg:top-40 lg:self-start">
          <div className="flex h-11 items-center border-2 border-ink focus-within:border-vermilion">
            <Search size={16} className="ml-3 shrink-0 text-ink-soft" aria-hidden="true" />
            <label htmlFor="shop-filter" className="sr-only">
              {t('shop.filterLabel')}
            </label>
            <input
              id="shop-filter"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('shop.filterPlaceholder')}
              className="h-full w-full bg-transparent px-2 text-sm placeholder:text-ink-mute focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="grid size-9 place-items-center text-ink-mute hover:text-vermilion" aria-label={t('shop.clearSearch')}>
                <X size={16} />
              </button>
            )}
          </div>

          <h2 className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-ink-mute">{t('shop.aisles')}</h2>
          <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:block lg:space-y-0 lg:overflow-visible lg:px-0">
            {[{ id: 'all' }, ...CATEGORIES].map((c) => {
              const active = category === c.id;
              return (
                <li key={c.id} className="shrink-0 lg:border-b lg:border-rule">
                  <button
                    type="button"
                    onClick={() => setCategory(c.id)}
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-3 whitespace-nowrap border-2 px-3 py-2 text-left text-[15px] font-semibold transition-colors lg:border-0 lg:px-0 lg:py-2.5 ${
                      active ? 'border-ink bg-ink text-paper lg:bg-transparent lg:text-vermilion' : 'border-rule hover:border-ink lg:hover:text-vermilion'
                    }`}
                  >
                    {c.id === 'all' ? t('shop.everything') : categoryName(t, c.id)}
                    <span className={`text-xs tabular ${active ? 'opacity-80' : 'text-ink-mute'}`}>{countFor(c.id)}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <label className="mt-6 flex cursor-pointer items-center gap-3 text-[15px] font-semibold">
            <input type="checkbox" checked={seasonOnly} onChange={(e) => setSeasonOnly(e.target.checked)} className="size-5 accent-vermilion" />
            {t('shop.seasonOnly')}
          </label>

          <label htmlFor="sort" className="mb-2 mt-6 block text-xs font-bold uppercase tracking-wider text-ink-mute">
            {t('shop.sort')}
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-11 w-full cursor-pointer border-2 border-ink bg-paper px-2 text-sm font-semibold focus:border-vermilion focus:outline-none"
          >
            {SORTS.map((id) => (
              <option key={id} value={id}>
                {t(`shop.sorts.${id}`)}
              </option>
            ))}
          </select>
        </aside>

        <section aria-label={t('shop.products')} className="min-w-0">
          {results.length ? (
            <ProductGrid products={results} cols="grid-cols-2 md:grid-cols-3" priorityCount={6} />
          ) : (
            <div className="border-2 border-dashed border-rule px-6 py-16 text-center">
              <p className="font-semicondensed text-2xl font-extrabold">{query ? t('shop.emptyQuery', { query }) : t('shop.emptyFilters')}</p>
              <p className="mt-2 text-ink-soft">{t('shop.emptyHint')}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {query && (
                  <button type="button" onClick={() => setQuery('')} className="h-11 border-2 border-ink px-4 font-bold hover:bg-ink hover:text-paper">
                    {t('shop.clearSearch')}
                  </button>
                )}
                {(category !== 'all' || seasonOnly) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSeasonOnly(false);
                      setCategory('all');
                    }}
                    className="h-11 bg-ink px-4 font-bold text-paper hover:bg-vermilion"
                  >
                    {t('shop.searchEvery')}
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
