import { MapPin } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';
import { CITIES } from '../../data/content';
import { cityName } from '../../i18n/catalog';
import { formatDay } from '../../lib/format';

const strong = <strong className="font-semibold" />;

export default function AnnouncementBar({ city, onCityChange, delivery }) {
  const { t } = useTranslation();
  const day = formatDay(delivery.delivery, { weekday: 'long', day: 'numeric', month: 'short' });
  return (
    <div className="bg-ink text-paper">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-2 text-[13px] md:px-8 lg:px-16">
        <label className="flex min-w-0 items-center gap-1.5">
          <MapPin size={14} className="shrink-0 text-vermilion" aria-hidden="true" />
          <span className="shrink-0 text-paper/70">{t('announcement.deliveringTo')}</span>
          <select
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            className="min-w-0 cursor-pointer appearance-none truncate bg-transparent font-semibold underline decoration-paper/40 underline-offset-4 hover:decoration-vermilion focus:outline-none"
            aria-label={t('announcement.deliveryArea')}
          >
            {CITIES.map((c) => (
              <option key={c} value={c} className="text-ink">
                {cityName(t, c)}
              </option>
            ))}
          </select>
        </label>
        <p className="hidden text-right sm:block">
          <Trans i18nKey="announcement.cutoff" values={{ day }} components={{ b: strong }} />
        </p>
        <p className="shrink-0 sm:hidden">
          <Trans i18nKey="announcement.cutoffShort" components={{ b: strong }} />
        </p>
      </div>
    </div>
  );
}
