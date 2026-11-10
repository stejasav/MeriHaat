import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ArrowRight, ShoppingBasket, Trash2, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { DELIVERY } from '../../data/content';
import { cityName, packLabel, productName, productOrigin } from '../../i18n/catalog';
import { formatDay, formatINR } from '../../lib/format';
import QuantityStepper from '../product/QuantityStepper';
import { useRecommendations } from '../home/Recommended';

function Row({ label, value, strong, accent }) {
  return (
    <div className={`flex justify-between ${strong ? 'text-lg font-extrabold' : 'text-[15px]'} ${accent ? 'text-leaf' : ''}`}>
      <dt>{label}</dt>
      <dd className="tabular">{value}</dd>
    </div>
  );
}

function EmptyBasket({ onBrowse }) {
  const { t } = useTranslation();
  const { setQty } = useCart();
  const picks = useRecommendations(3);
  return (
    <div className="flex flex-1 flex-col px-5 py-8">
      <ShoppingBasket size={40} strokeWidth={1.5} className="text-ink-mute" aria-hidden="true" />
      <p className="mt-4 font-semicondensed text-2xl font-extrabold">{t('cart.emptyTitle')}</p>
      <p className="mt-1 text-ink-soft">{t('cart.emptyBody')}</p>
      <p className="mt-8 border-b-2 border-ink pb-2 text-sm font-bold">{t('cart.startWith')}</p>
      <ul>
        {picks.map((p) => (
          <li key={p.id} className="flex items-center gap-3 border-b border-rule py-3">
            <img src={p.image.replace('w=640', 'w=120')} alt="" className="size-14 object-cover" />
            <span className="flex-1">
              <span className="block font-semibold leading-tight">{productName(t, p)}</span>
              <span className="text-sm text-ink-mute tabular">
                {packLabel(t, p.packs[0])} · {formatINR(p.packs[0].price)}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setQty(p.id, p.packs[0].id, 1)}
              className="h-9 border-2 border-ink px-3 text-sm font-bold transition-colors hover:bg-ink hover:text-paper"
              aria-label={t('cart.addAria', { name: productName(t, p) })}
            >
              {t('product.add')}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={onBrowse} className="mt-6 inline-flex h-12 items-center justify-center gap-2 bg-ink font-bold text-paper hover:bg-vermilion">
        {t('cart.browse')} <ArrowRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

export default function CartDrawer({ delivery, city, onBrowse }) {
  const { t } = useTranslation();
  const cart = useCart();
  const [slot, setSlot] = useState(DELIVERY.slots[0]);
  const [placed, setPlaced] = useState(null);
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const lastFocus = useRef(null);

  const dayLabel = formatDay(delivery.delivery, { weekday: 'long', day: 'numeric', month: 'short' });
  const cityLabel = cityName(t, city);

  useEffect(() => {
    if (cart.isOpen) {
      lastFocus.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      document.body.style.overflow = '';
      lastFocus.current?.focus?.();
      setPlaced(null);
    }
  }, [cart.isOpen]);

  useEffect(() => {
    if (!cart.isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') cart.close();
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll('button:not([disabled]), input, a[href]');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [cart.isOpen, cart]);

  const placeOrder = () => {
    setPlaced({ id: `MH-${Math.floor(100000 + Math.random() * 900000)}`, total: cart.total, items: cart.count, slot });
    cart.clear();
  };

  const progress = Math.min(100, (cart.subtotal / DELIVERY.freeAbove) * 100);

  return (
    <div className={`fixed inset-0 z-[60] ${cart.isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!cart.isOpen}>
      <div className={`absolute inset-0 bg-ink/55 transition-opacity duration-300 ${cart.isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={cart.close} />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="basket-title"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-paper transition-[transform,box-shadow] duration-500 ease-out-expo ${
          cart.isOpen ? 'translate-x-0 shadow-[-24px_0_60px_-20px_rgb(23_20_15/0.4)]' : 'translate-x-full'
        }`}
        inert={!cart.isOpen ? '' : undefined}
      >
        <header className="flex items-start justify-between border-b-2 border-ink px-5 py-4">
          <div>
            <h2 id="basket-title" className="font-semicondensed text-2xl font-extrabold">
              {t('cart.title')}
            </h2>
            <p className="text-sm text-ink-soft">
              <Trans i18nKey="cart.arrives" values={{ day: dayLabel, city: cityLabel }} components={{ hl: <span className="font-semibold text-vermilion" /> }} />
            </p>
          </div>
          <button ref={closeRef} type="button" onClick={cart.close} className="-mr-2 grid size-10 place-items-center hover:text-vermilion" aria-label={t('cart.close')}>
            <X size={24} />
          </button>
        </header>

        {placed ? (
          <div className="flex flex-1 flex-col items-start px-5 py-10">
            <div className="stamp-in grid size-28 place-items-center rounded-full border-[3px] border-vermilion text-center font-extrabold uppercase leading-tight tracking-wider text-vermilion">
              <span className="text-xs">
                {t('cart.booked')}
                <br />
                <span className="font-condensed text-4xl leading-none tabular">{String(delivery.delivery.getDate()).padStart(2, '0')}</span>
                <br />
                {formatDay(delivery.delivery, { month: 'short' })}
              </span>
            </div>
            <p className="mt-6 font-semicondensed text-3xl font-extrabold leading-tight">{t('cart.doneTitle')}</p>
            <p className="mt-2 text-ink-soft">
              {t('cart.doneBody', { count: placed.items, amount: formatINR(placed.total), day: dayLabel, slot: t(`slots.${placed.slot}`), city: cityLabel })}
            </p>
            <p className="mt-4 text-sm">
              <Trans i18nKey="cart.orderNumber" values={{ id: placed.id }} components={{ b: <span className="font-bold tabular" /> }} />
            </p>
            <p className="mt-1 text-sm text-ink-mute">{t('cart.demo')}</p>
            <button type="button" onClick={cart.close} className="mt-8 inline-flex h-12 items-center gap-2 bg-ink px-5 font-bold text-paper hover:bg-vermilion">
              {t('cart.keepBrowsing')} <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        ) : cart.lines.length === 0 ? (
          <EmptyBasket
            onBrowse={() => {
              cart.close();
              onBrowse();
            }}
          />
        ) : (
          <>
            <div className="border-b border-rule px-5 py-3">
              <p className="text-sm font-semibold" aria-live="polite">
                {cart.toFreeDelivery > 0 ? (
                  <Trans
                    i18nKey="cart.addMore"
                    values={{ amount: formatINR(cart.toFreeDelivery) }}
                    components={{ hl: <span className="text-vermilion tabular" /> }}
                  />
                ) : (
                  <span className="text-leaf">{t('cart.freeUnlocked')}</span>
                )}
              </p>
              <div className="mt-2 h-1.5 bg-paper-deep" aria-hidden="true">
                <div className={`h-full transition-[width] duration-500 ease-out-expo ${cart.toFreeDelivery ? 'bg-ink' : 'bg-leaf'}`} style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="flex-1 overflow-y-auto px-5">
              {cart.lines.map((l) => (
                <li key={l.key} className="flex gap-3 border-b border-rule py-4">
                  <img src={l.product.image.replace('w=640', 'w=160')} alt="" className="size-20 shrink-0 object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold leading-tight">{productName(t, l.product)}</p>
                      <button
                        type="button"
                        onClick={() => cart.setQty(l.productId, l.packId, 0)}
                        className="-mr-1 -mt-1 grid size-8 shrink-0 place-items-center text-ink-mute hover:text-vermilion"
                        aria-label={t('cart.remove', { name: productName(t, l.product) })}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-ink-mute">
                      {packLabel(t, l.pack)} · <span className="text-leaf">{productOrigin(t, l.product)}</span>
                    </p>
                    <div className="mt-auto flex items-end justify-between pt-2">
                      <QuantityStepper size="sm" qty={l.qty} label={`${productName(t, l.product)}, ${packLabel(t, l.pack)}`} onChange={(n) => cart.setQty(l.productId, l.packId, n)} />
                      <p className="text-right leading-tight">
                        <span className="block font-extrabold tabular">{formatINR(l.total)}</span>
                        {l.mrpTotal > l.total && <span className="text-xs text-ink-mute line-through tabular">{formatINR(l.mrpTotal)}</span>}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t-2 border-ink px-5 pb-5 pt-4">
              <fieldset>
                <legend className="text-sm font-bold">{t('cart.slotLegend', { day: formatDay(delivery.delivery, { weekday: 'short' }) })}</legend>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {DELIVERY.slots.map((id) => (
                    <label
                      key={id}
                      className={`cursor-pointer border-2 px-1 py-2 text-center text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-vermilion ${
                        slot === id ? 'border-ink bg-ink text-paper' : 'border-rule hover:border-ink'
                      }`}
                    >
                      <input type="radio" name="slot" value={id} checked={slot === id} onChange={() => setSlot(id)} className="sr-only" />
                      {t(`slots.${id}`)}
                    </label>
                  ))}
                </div>
              </fieldset>
              <dl className="mt-4 space-y-1">
                <Row label={t('cart.items')} value={formatINR(cart.subtotal)} />
                {cart.savings > 0 && <Row label={t('cart.savings')} value={`−${formatINR(cart.savings)}`} accent />}
                <Row label={t('cart.delivery')} value={cart.deliveryFee ? formatINR(cart.deliveryFee) : t('cart.free')} />
                <div className="border-t border-rule pt-2">
                  <Row label={t('cart.toPay')} value={formatINR(cart.total)} strong />
                </div>
              </dl>
              <button
                type="button"
                onClick={placeOrder}
                className="mt-4 inline-flex min-h-14 w-full items-center justify-between gap-3 bg-vermilion px-5 py-2 text-left text-lg font-extrabold text-paper transition-colors hover:bg-vermilion-deep"
              >
                <span>{t('cart.book', { day: formatDay(delivery.delivery, { weekday: 'long' }) })}</span>
                <span className="tabular">{formatINR(cart.total)}</span>
              </button>
              <p className="mt-2 text-center text-xs text-ink-mute">{t('cart.payNote')}</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
