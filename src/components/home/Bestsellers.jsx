import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { productById } from '../../data/products';
import { BESTSELLER_ORDER, seasonShelf } from '../../data/shelves';
import ProductCell from '../product/ProductCell';
import SectionHeading from './SectionHeading';

export default function Bestsellers({ month }) {
  const { t } = useTranslation();
  const rail = useRef(null);
  const onShelf = new Set(seasonShelf(month, { isCurrent: true }).map((p) => p.id));
  const items = BESTSELLER_ORDER.filter((id) => !onShelf.has(id)).map((id) => productById[id]);
  const scroll = (dir) => {
    const el = rail.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="best-heading" className="mx-auto max-w-[1440px] px-4 pb-16 md:px-8 md:pb-24 lg:px-16">
      <SectionHeading
        id="best-heading"
        title={t('bestsellers.title')}
        action={
          <div className="flex gap-2">
            <button type="button" onClick={() => scroll(-1)} className="grid size-11 place-items-center border-2 border-ink transition-colors hover:bg-ink hover:text-paper" aria-label={t('bestsellers.scrollLeft')}>
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => scroll(1)} className="grid size-11 place-items-center border-2 border-ink transition-colors hover:bg-ink hover:text-paper" aria-label={t('bestsellers.scrollRight')}>
              <ArrowRight size={18} />
            </button>
          </div>
        }
      />
      <div ref={rail} className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-px overflow-x-auto border border-ink bg-ink">
        {items.map((p) => (
          <div key={p.id} className="w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-[30vw] lg:w-[calc((100%-4px)/5)]">
            <ProductCell product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
