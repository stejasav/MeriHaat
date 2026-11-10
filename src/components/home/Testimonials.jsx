import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeading from './SectionHeading';

export default function Testimonials() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const items = t('testimonials.items', { returnObjects: true });
  const note = items[active];

  return (
    <section aria-labelledby="voices-heading" className="bg-paper-deep">
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24 lg:px-16">
        <SectionHeading id="voices-heading" title={t('testimonials.title')} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <figure key={active} className="animate-[fade_500ms_var(--ease-out-quart)]">
            <blockquote className="text-pretty font-semicondensed text-[clamp(1.6rem,2.9vw,2.6rem)] font-semibold leading-[1.15] tracking-[-0.01em]">
              <span aria-hidden="true">“</span>
              {note.quote}
              <span aria-hidden="true">”</span>
            </blockquote>
            <figcaption className="mt-6 text-[15px]">
              <span className="font-bold">{note.name}</span>
              <span className="text-ink-soft"> · {note.place}</span>
              <span className="mt-1 block text-sm text-leaf">{note.since}</span>
            </figcaption>
          </figure>
          <ul className="border-t-2 border-ink" aria-label={t('testimonials.more')}>
            {items.map((item, i) => (
              <li key={i} className={`border-b ${i === active ? 'border-ink' : 'border-ink/25'}`}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={`flex w-full items-baseline gap-4 py-4 text-left transition-colors ${i === active ? '' : 'text-ink-soft hover:text-ink'}`}
                >
                  <span className="flex-1">
                    <span className={`block ${i === active ? 'font-extrabold' : 'font-semibold'}`}>{item.name}</span>
                    <span className={`block text-sm text-ink-mute`}>{item.place}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
