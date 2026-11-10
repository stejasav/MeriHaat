import { useTranslation } from 'react-i18next';

// MeriHaat wordmark: condensed black caps with a serif tagline set beneath like a calendar's masthead.
// The tagline follows the active language; the mark itself stays Latin in every language.
export default function Wordmark({ className = '', invert = false, size = 'md' }) {
  const { t } = useTranslation();
  const big = size === 'lg';
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className={`font-condensed font-black uppercase tracking-[-0.01em] ${big ? 'text-[clamp(4rem,14vw,12rem)]' : 'text-[30px]'}`}>
        <span className={invert ? 'text-paper' : 'text-ink'}>Meri</span>
        <span className="text-vermilion">Haat</span>
      </span>
      <span className={`whitespace-nowrap font-accent ${big ? 'mt-2 text-2xl' : 'mt-0.5 text-[12px]'} ${invert ? 'text-paper/70' : 'text-ink-soft'}`}>
        {t('brand.tagline')}
      </span>
    </span>
  );
}
