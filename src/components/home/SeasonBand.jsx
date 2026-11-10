import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { productShort } from '../../i18n/catalog';
import { monthName } from '../../lib/format';

const MONTH_INDEXES = Array.from({ length: 12 }, (_, i) => i);

// The calendar's season strip: twelve months, the active one printed in vermilion with what it brings.
export default function SeasonBand({ current, selected, onSelect, peak }) {
  const { t } = useTranslation();
  const railRef = useRef(null);

  // Bring the current month into view on narrow screens without moving the page vertically.
  useEffect(() => {
    const rail = railRef.current;
    const tab = rail?.children[current];
    if (rail && tab && rail.scrollWidth > rail.clientWidth) {
      rail.scrollLeft = rail.children[Math.max(0, current - 2)].offsetLeft;
    }
  }, [current]);

  // Unique short names: several products can share one (e.g. two kinds of apple).
  const names = [...new Set(peak.map((p) => productShort(t, p)))];
  const caption = names.length > 3 ? t('season.andMore', { list: names.slice(0, 3).join(', '), count: names.length - 3 }) : names.join(', ');

  return (
    <div className="bg-leaf text-paper">
      <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row lg:items-stretch lg:px-16">
        <div ref={railRef} className="no-scrollbar relative flex snap-x snap-mandatory overflow-x-auto [mask-image:linear-gradient(90deg,transparent,#000_28px,#000_calc(100%-28px),transparent)] lg:[mask-image:none]" role="tablist" aria-label={t('season.tablist')}>
          {MONTH_INDEXES.map((i) => {
            const isSel = i === selected;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isSel}
                aria-controls="season-panel"
                aria-label={monthName(i, 'long')}
                onClick={() => onSelect(i)}
                className={`relative shrink-0 snap-start whitespace-nowrap px-3.5 py-4 text-sm font-bold uppercase tracking-wider transition-colors md:px-4 ${
                  isSel ? 'bg-vermilion text-paper' : 'text-paper/75 hover:bg-paper/10 hover:text-paper'
                }`}
              >
                {monthName(i, 'short').replace(/\.$/, '')}
                {i === current && !isSel && <span className="absolute inset-x-3 bottom-2 h-0.5 bg-vermilion" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        <p id="season-panel" role="tabpanel" className="flex flex-1 items-center gap-3 border-t border-paper/15 px-4 py-3.5 text-[15px] lg:border-l lg:border-t-0 lg:px-6">
          <span>
            <span className="font-semibold">{selected === current ? t('season.now') : t('season.brings', { month: monthName(selected, 'short').replace(/\.$/, '') })}</span> {caption}
          </span>
        </p>
      </div>
    </div>
  );
}
