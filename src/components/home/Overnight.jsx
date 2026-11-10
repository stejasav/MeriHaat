import { useTranslation } from 'react-i18next';
import { OVERNIGHT } from '../../data/content';

// The night shift, told in clock times: the haat's version of a calendar's hour column.
export default function Overnight() {
  const { t } = useTranslation();
  const steps = t('overnight.steps', { returnObjects: true });
  return (
    <section id="overnight" aria-labelledby="night-heading" className="scroll-mt-32 bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24 lg:px-16">
        <div className="grid gap-6 border-b-2 border-paper pb-6 lg:grid-cols-2 lg:items-end">
          <h2 id="night-heading" className="text-balance font-semicondensed text-[clamp(2.1rem,4.4vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.02em]">
            {t('overnight.title')}
          </h2>
          <p className="max-w-[46ch] leading-relaxed text-paper/75 lg:justify-self-end">
            {t('overnight.body')}
          </p>
        </div>
        <ol className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {OVERNIGHT.map((step, i) => (
            <li key={step.time} className="relative border-t border-paper/25 pt-5">
              <span className={`absolute -top-[5px] left-0 size-2.5 rounded-full ${i === OVERNIGHT.length - 1 ? 'bg-vermilion' : 'bg-paper'}`} aria-hidden="true" />
              <p className="flex items-start gap-1.5 leading-none">
                <span className="font-condensed text-[clamp(3.5rem,6vw,5.25rem)] font-black tracking-[-0.02em] tabular">{step.time}</span>
                <span className={`mt-2 text-sm font-bold ${i === OVERNIGHT.length - 1 ? 'text-vermilion' : 'text-paper/60'}`}>{t(`overnight.${step.meridiem}`)}</span>
              </p>
              <h3 className="mt-3 text-lg font-bold">{steps[i].title}</h3>
              <p className="mt-1.5 max-w-[30ch] text-[15px] leading-relaxed text-paper/70">{steps[i].body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
