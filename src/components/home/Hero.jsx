import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ArrowRight, Clock, ShoppingBasket } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import { peakProducts, seasonShelf } from '../../data/shelves';
import { formatDay, formatINR, monthName } from '../../lib/format';
import ProductGrid from '../product/ProductGrid';
import SeasonBand from './SeasonBand';

const pad = (n) => String(n).padStart(2, '0');

function DateLeaf({ delivery, onShop }) {
  const { t } = useTranslation();
  const cart = useCart();
  const { delivery: d, now, hoursLeft, minutesLeft, isTomorrow } = delivery;
  const monthYear = formatDay(d, { month: 'long', year: 'numeric' });
  const weekday = formatDay(d, { weekday: 'long' });
  const todayNum = pad(now.getDate());
  const todayWeekday = formatDay(now, { weekday: 'long' });

  return (
    <div className="flex flex-col border-ink bg-paper lg:border-r-2">
      {/* Pad binding: month and year, like the masthead of a tear-off calendar */}
      <div className="flex items-center justify-between bg-ink px-5 py-2.5 text-paper">
        <span className="text-sm font-bold uppercase tracking-[0.18em]">{monthYear}</span>
        <span className="flex gap-2" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-paper" />
          <span className="size-2.5 rounded-full bg-paper" />
        </span>
      </div>

      <div className="flex flex-1 flex-col md:grid md:grid-cols-[auto_1fr] md:items-end lg:flex lg:items-stretch">
      <div className="relative px-5 pt-4 [perspective:900px] md:px-8 md:pb-6 lg:pb-0">
        <p
          aria-hidden="true"
          className="font-condensed text-[clamp(9rem,26vw,15.5rem)] font-black leading-[0.82] tracking-[-0.03em] text-vermilion tabular"
        >
          {pad(d.getDate())}
        </p>
        <p className="mt-2 text-2xl font-extrabold uppercase tracking-wide">{weekday}</p>

        {/* Today's leaf tears away to reveal tomorrow */}
        <div aria-hidden="true" className="leaf-tear pointer-events-none absolute inset-x-0 top-0 bg-paper px-5 pt-4 md:px-8">
          <p className="font-condensed text-[clamp(9rem,26vw,15.5rem)] font-black leading-[0.82] tracking-[-0.03em] text-ink tabular">{todayNum}</p>
          <p className="mt-2 pb-1 text-2xl font-extrabold uppercase tracking-wide">{todayWeekday}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 md:px-8 md:pt-8 lg:pt-5">
        <h1 className="max-w-[18ch] text-balance font-semicondensed text-[clamp(1.75rem,2.6vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.01em]">
          {t(isTomorrow ? 'hero.titleTomorrow' : 'hero.titleNext')}
        </h1>
        <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-ink-soft">
          {t('hero.lede')}
        </p>
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
          <Clock size={16} className="text-vermilion" aria-hidden="true" />
          {isTomorrow ? (
            <span>
              <Trans
                i18nKey="hero.countdown"
                values={{ hours: hoursLeft, minutes: pad(minutesLeft), day: weekday }}
                components={{ hl: <span className="text-vermilion tabular" /> }}
              />
            </span>
          ) : (
            <span>{t('hero.cutoffPassed', { day: weekday })}</span>
          )}
        </p>
        <div className="mt-6 flex flex-col items-stretch gap-2 sm:items-start lg:mt-auto lg:pt-6">
          {cart.count > 0 && (
            <p className="mb-1 flex items-center gap-2 border-t border-rule pt-3 text-sm font-semibold" aria-live="polite">
              <span key={cart.count} className="bump inline-grid size-7 place-items-center rounded-full bg-vermilion text-xs font-extrabold text-paper tabular">
                {cart.count}
              </span>
              <span>
                {t(isTomorrow ? 'hero.inBasketTomorrow' : 'hero.inBasketNext')} · <span className="tabular">{formatINR(cart.subtotal)}</span>
              </span>
              <ShoppingBasket size={16} className="text-ink-mute" aria-hidden="true" />
            </p>
          )}
          <button
            type="button"
            onClick={cart.count > 0 ? cart.open : onShop}
            className="group inline-flex h-12 items-center justify-center gap-2 bg-ink px-5 font-bold text-paper transition-colors hover:bg-vermilion sm:flex-none"
          >
            {t(cart.count > 0 ? 'hero.reviewBasket' : 'hero.fillBasket')}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </button>
          <a href="#overnight" className="inline-flex h-10 items-center self-start px-1 text-sm font-semibold underline decoration-ink/30 hover:decoration-vermilion">
            {t('hero.howNight')}
          </a>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function Hero({ delivery, onShop }) {
  const { t } = useTranslation();
  const month = delivery.delivery.getMonth();
  const [selected, setSelected] = useState(month);
  const isCurrent = selected === month;
  const shelf = seasonShelf(selected, { isCurrent });
  const selectedMonth = monthName(selected, 'long', delivery.delivery.getFullYear());

  return (
    <section aria-labelledby="season-heading" className="border-b-2 border-ink">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[minmax(340px,4fr)_8fr] lg:px-16">
        <DateLeaf delivery={delivery} onShop={onShop} />
        <div className="flex flex-col border-t-2 border-ink lg:border-t-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-4 md:px-6">
            <h2 id="season-heading" className="font-semicondensed text-2xl font-extrabold md:text-[1.75rem]">
              {t(isCurrent ? 'hero.inSeasonThis' : 'hero.monthBrings', { month: selectedMonth })}
            </h2>
            <button type="button" onClick={onShop} className="text-left text-sm font-semibold underline decoration-ink/30 hover:text-vermilion hover:decoration-vermilion">
              {t('hero.seeAll', { count: PRODUCTS.length })}
            </button>
          </div>
          {shelf.length === 0 ? (
            <p className="flex flex-1 items-center border-t border-ink px-6 py-16 text-ink-soft">{t('hero.emptyMonth', { month: selectedMonth })}</p>
          ) : (
          <ProductGrid
            products={shelf}
            compact
            outOfSeason={isCurrent ? null : { label: monthName(selected, 'short'), now: month }}
            priorityCount={4}
            cols="flex-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 [&>*:nth-child(2n)]:max-sm:border-r-0 lg:[&>*:nth-last-child(-n+4)]:border-b-0"
            className="border-t border-ink lg:border-l-0"
          />
          )}
        </div>
      </div>
      <SeasonBand current={month} selected={selected} onSelect={setSelected} peak={peakProducts(selected)} />
    </section>
  );
}
