import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { DELIVERY } from '../../data/content';
import { formatINR } from '../../lib/format';
import SectionHeading from './SectionHeading';

export default function Promise() {
  const { t } = useTranslation();
  const promises = t('promise.items', { returnObjects: true, free: formatINR(DELIVERY.freeAbove), fee: formatINR(DELIVERY.fee) });
  return (
    <section aria-labelledby="promise-heading" className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <SectionHeading id="promise-heading" title={t('promise.title')} />
      <ul className="mt-2 grid md:grid-cols-2 md:gap-x-16">
        {promises.map((p, i) => (
          <li key={i} className="flex gap-4 border-b border-rule py-6">
            <Check size={22} strokeWidth={3} className="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
            <span>
              <span className="block text-lg font-bold leading-snug">{p.title}</span>
              <span className="mt-1 block max-w-[52ch] leading-relaxed text-ink-soft">{p.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
