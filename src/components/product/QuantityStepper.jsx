import { useTranslation } from 'react-i18next';
import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({ qty, onChange, label, size = 'md' }) {
  const { t } = useTranslation();
  const h = size === 'sm' ? 'h-8' : 'h-10';
  const w = size === 'sm' ? 'w-8' : 'w-10';
  return (
    <div className={`inline-flex ${h} items-stretch border-2 border-ink bg-ink text-paper`} role="group" aria-label={t('quantity.group', { label })}>
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        className={`${w} grid place-items-center transition-colors hover:bg-vermilion`}
        aria-label={t(qty === 1 ? 'quantity.remove' : 'quantity.less', { label })}
      >
        <Minus size={16} strokeWidth={2.5} />
      </button>
      <output className="grid min-w-8 place-items-center px-1 text-sm font-bold tabular" aria-live="polite">
        {qty}
      </output>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        disabled={qty >= 20}
        className={`${w} grid place-items-center transition-colors hover:bg-vermilion disabled:opacity-40 disabled:hover:bg-transparent`}
        aria-label={t('quantity.more', { label })}
      >
        <Plus size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}
