import { useTranslation } from 'react-i18next';
import { ArrowRight, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { productById } from '../../data/products';
import { formatINR } from '../../lib/format';

const greensImg = 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1100&q=72';

// Two promotional panels, printed like the sponsor block at the foot of a wall calendar.
export default function Promotions({ onCategory }) {
  const { t } = useTranslation();
  const { getQty, setQty, open } = useCart();
  const box = productById['fruit-box'];
  const pack = box.packs[0];
  const inBasket = getQty(box.id, pack.id) > 0;

  return (
    <section aria-label={t('promotions.label')} className="mx-auto max-w-[1440px] px-4 pb-16 md:px-8 md:pb-24 lg:px-16">
      <div className="grid gap-px border-2 border-ink bg-ink lg:grid-cols-[7fr_5fr]">
        <article className="grid bg-ink text-paper md:grid-cols-2">
          <div className="flex flex-col p-6 md:p-10">
            <h2 className="font-semicondensed text-[clamp(2rem,3.4vw,3rem)] font-extrabold leading-[0.98] tracking-[-0.015em]">
              {t('promotions.boxTitle')}
            </h2>
            <p className="mt-4 max-w-[38ch] leading-relaxed text-paper/80">
              {t('promotions.boxBody')}
            </p>
            <ul className="mt-5 space-y-1.5 text-sm font-semibold">
              {t('promotions.perks', { returnObjects: true }).map((perk) => (
                <li key={perk} className="flex items-center gap-2">
                  <Check size={16} strokeWidth={3} className="shrink-0" aria-hidden="true" /> {perk}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4 md:mt-auto md:pt-8">
              <button
                type="button"
                onClick={() => (inBasket ? open() : setQty(box.id, pack.id, 1))}
                className="inline-flex h-12 items-center gap-2 bg-paper px-5 font-bold text-ink transition-colors hover:bg-vermilion hover:text-paper"
              >
                {t(inBasket ? 'promotions.inBasket' : 'promotions.addBox')} <ArrowRight size={18} aria-hidden="true" />
              </button>
              <p className="leading-none">
                <span className="text-2xl font-extrabold text-[#ff6a55] tabular">{formatINR(pack.price)}</span>
                <span className="ml-2 text-sm text-paper/60 line-through tabular">{formatINR(pack.mrp)}</span>
              </p>
            </div>
          </div>
          <img src={box.image.replace('w=640', 'w=900')} alt={t('promotions.boxAlt')} loading="lazy" className="h-64 w-full object-cover md:h-full" />
        </article>

        <article className="relative flex min-h-[360px] flex-col justify-end overflow-hidden bg-leaf text-paper">
          <img src={greensImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-leaf/45" aria-hidden="true" />
          <div className="relative p-6 md:p-10">
            <h2 className="font-semicondensed text-[clamp(1.9rem,3vw,2.6rem)] font-extrabold leading-[1] tracking-[-0.015em]">
              {t('promotions.greensTitle')}
            </h2>
            <button
              type="button"
              onClick={() => onCategory('vegetables')}
              className="mt-6 inline-flex h-12 items-center gap-2 border-2 border-paper px-5 font-bold transition-colors hover:bg-paper hover:text-leaf"
            >
              {t('promotions.shopVeg')} <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
