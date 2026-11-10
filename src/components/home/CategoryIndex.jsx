import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import { categoryName } from '../../i18n/catalog';
import SectionHeading from './SectionHeading';

export default function CategoryIndex({ onCategory }) {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="cat-heading" className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <SectionHeading id="cat-heading" title={t('categoryIndex.title')} />
      <ul className="mt-8 grid grid-cols-2 gap-px border border-ink bg-ink sm:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map((c) => {
          const count = PRODUCTS.filter((p) => p.category === c.id).length;
          return (
            <li key={c.id} className="bg-paper">
              <button type="button" onClick={() => onCategory(c.id)} className="group flex h-full w-full flex-col text-left">
                <span className="block aspect-square overflow-hidden bg-paper-deep">
                  <img
                    src={c.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                </span>
                <span className="flex flex-1 items-start justify-between gap-2 p-4">
                  <span>
                    <span className="block text-[17px] font-bold leading-tight group-hover:text-vermilion">{categoryName(t, c.id)}</span>
                    <span className="mt-2 block text-xs font-semibold text-leaf tabular">{t('categoryIndex.items', { count })}</span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-ink-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-vermilion"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
