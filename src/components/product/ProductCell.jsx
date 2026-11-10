import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { discountPct, isInSeason } from '../../data/products';
import { packLabel, productName, productOrigin } from '../../i18n/catalog';
import { formatINR } from '../../lib/format';
import QuantityStepper from './QuantityStepper';

// One cell of the haat's ruled grid: photo, provenance, pack size, price, basket control.
export default function ProductCell({ product, compact = false, priority = false, outOfSeason = null }) {
  const { t } = useTranslation();
  const { getQty, setQty } = useCart();
  const [packId, setPackId] = useState(product.packs[product.packs.length > 1 ? 1 : 0].id);
  const pack = product.packs.find((p) => p.id === packId);
  const qty = getQty(product.id, pack.id);
  const off = discountPct(pack);
  const name = productName(t, product);
  const label = `${name}, ${packLabel(t, pack)}`;

  return (
    <article className="group relative flex h-full flex-col bg-paper">
      <div className={`relative overflow-hidden bg-paper-deep ${compact ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
        <img
          src={product.image}
          alt={name}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        {off > 0 && (
          <span className="absolute left-0 top-0 bg-vermilion px-2 py-1 text-xs font-bold tracking-wide text-paper tabular">
            {t('product.off', { pct: off })}
          </span>
        )}
        {qty > 0 && (
          <span
            key={qty > 0 ? 'in' : 'out'}
            className="stamp-in absolute bottom-2 right-2 grid size-16 place-items-center rounded-full border-2 border-vermilion bg-paper/90 text-center text-[10px] font-extrabold uppercase leading-tight tracking-wider text-vermilion"
            aria-hidden="true"
          >
            <span>
              {t('product.stampLine1')}
              <br />
              {t('product.stampLine2')}
              <br />
              <span className="text-base leading-none tabular">×{qty}</span>
            </span>
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${compact ? 'gap-2 px-3 pb-3 pt-2.5' : 'gap-3 p-4'}`}>
        <div>
          <h3 className={`font-semicondensed font-bold leading-tight text-ink ${compact ? 'text-base' : 'text-lg'}`}>{name}</h3>
          <p className="mt-1 text-sm leading-snug text-leaf">{productOrigin(t, product)}</p>
        </div>

        {product.packs.length > 1 ? (
          <div className="flex gap-1" role="radiogroup" aria-label={t('product.packSize', { name })}>
            {product.packs.map((p) => (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={p.id === packId}
                onClick={() => setPackId(p.id)}
                className={`border px-2.5 py-1 text-xs font-semibold transition-colors ${
                  p.id === packId ? 'border-ink bg-ink text-paper' : 'border-rule text-ink-soft hover:border-ink hover:text-ink'
                }`}
              >
                {packLabel(t, p)}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs font-semibold text-ink-mute">{packLabel(t, pack)}</p>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-1">
          <p className="leading-none">
            <span className="text-lg font-extrabold tabular sm:text-xl">{formatINR(pack.price)}</span>
            {pack.mrp > pack.price && (
              <span className="ml-1.5 text-sm text-ink-mute line-through tabular" aria-label={t('product.mrp', { amount: formatINR(pack.mrp) })}>
                {formatINR(pack.mrp)}
              </span>
            )}
          </p>
          {outOfSeason && !isInSeason(product, outOfSeason.now) ? (
            <span className="inline-flex h-10 items-center border-2 border-dashed border-rule px-2.5 text-xs font-semibold text-ink-mute">{t('product.backIn', { month: outOfSeason.label })}</span>
          ) : qty === 0 ? (
            <button
              type="button"
              onClick={() => setQty(product.id, pack.id, 1)}
              className="inline-flex h-10 items-center gap-1 border-2 border-ink px-2.5 text-sm sm:px-3.5 font-bold transition-colors hover:bg-ink hover:text-paper active:bg-vermilion active:border-vermilion"
              aria-label={t('product.addAria', { label })}
            >
              <Plus size={16} strokeWidth={2.5} aria-hidden="true" /> {t('product.add')}
            </button>
          ) : (
            <QuantityStepper qty={qty} label={label} onChange={(n) => setQty(product.id, pack.id, n)} />
          )}
        </div>
      </div>
    </article>
  );
}
