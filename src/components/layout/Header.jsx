import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Search, ShoppingBasket, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import { categoryName, productName, productOrigin, searchHaystack } from '../../i18n/catalog';
import { formatINR } from '../../lib/format';
import LanguageSwitcher from './LanguageSwitcher';
import Wordmark from './Wordmark';

function SearchBox({ onSearch, onPick, initial = '', id }) {
  const { t } = useTranslation();
  const [q, setQ] = useState(initial);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef(null);
  const listId = useId();

  useEffect(() => setQ(initial), [initial]);

  const matches = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return PRODUCTS.filter((p) => searchHaystack(p).includes(term)).slice(0, 6);
  }, [q]);

  useEffect(() => {
    const onDoc = (e) => !boxRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (active >= 0 && matches[active]) onPick(matches[active]);
    else onSearch(q.trim());
    setOpen(false);
  };

  return (
    <form ref={boxRef} onSubmit={submit} role="search" className="relative w-full">
      <label htmlFor={id} className="sr-only">
        {t('search.label')}
      </label>
      <div className="flex h-12 items-center border-2 border-ink bg-paper focus-within:border-vermilion">
        <Search size={18} className="ml-3.5 shrink-0 text-ink-soft" aria-hidden="true" />
        <input
          id={id}
          type="search"
          value={q}
          autoComplete="off"
          role="combobox"
          aria-expanded={open && matches.length > 0}
          aria-controls={listId}
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, matches.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, -1));
            } else if (e.key === 'Escape') setOpen(false);
          }}
          placeholder={t('search.placeholder')}
          className="h-full w-full bg-transparent px-3 text-[15px] placeholder:text-ink-mute focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        <button type="submit" className="h-full shrink-0 bg-ink px-4 text-sm font-bold text-paper transition-colors hover:bg-vermilion">
          {t('search.submit')}
        </button>
      </div>
      {open && matches.length > 0 && (
        <ul id={listId} role="listbox" className="absolute inset-x-0 top-full z-50 mt-1 border-2 border-ink bg-paper shadow-[0_18px_40px_-12px_rgb(23_20_15/0.35)]">
          {matches.map((p, i) => (
            <li
              key={p.id}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onPointerDown={(e) => {
                e.preventDefault();
                onPick(p);
                setOpen(false);
              }}
              onPointerEnter={() => setActive(i)}
              className={`flex cursor-pointer items-center gap-3 border-b border-rule px-3 py-2 last:border-b-0 ${i === active ? 'bg-paper-deep' : ''}`}
            >
              <img src={p.image.replace('w=640', 'w=96')} alt="" className="size-10 object-cover" />
              <span className="flex-1">
                <span className="block text-sm font-semibold">{productName(t, p)}</span>
                <span className="block text-xs text-leaf">{productOrigin(t, p)}</span>
              </span>
              <span className="text-sm font-bold tabular">{formatINR(p.packs[0].price)}</span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default function Header({ route, go }) {
  const { t } = useTranslation();
  const cart = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bumpKey, setBumpKey] = useState(0);

  useEffect(() => {
    if (cart.lastAdded) setBumpKey(cart.lastAdded);
  }, [cart.lastAdded]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const toShop = (category, query = '') => {
    setMenuOpen(false);
    go('shop', { category, query });
  };
  const onPick = (p) => go('shop', { category: p.category, query: productName(t, p) });

  const navLink = (active) =>
    `relative py-3 text-[15px] font-semibold transition-colors hover:text-vermilion ${
      active ? 'text-vermilion' : 'text-ink'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] items-center gap-2 px-4 py-3 sm:gap-4 md:gap-8 md:px-8 lg:px-16">
        <button
          type="button"
          className="-ml-1 grid size-10 place-items-center lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label={t('header.openMenu')}
          aria-expanded={menuOpen}
        >
          <Menu size={24} />
        </button>
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            go('home');
          }}
          aria-label={t('brand.home')}
          className="min-w-0 shrink-0"
        >
          <Wordmark />
        </a>
        <div className="hidden flex-1 md:block">
          <SearchBox id="search-desktop" initial={route.query} onSearch={(q) => toShop('all', q)} onPick={onPick} />
        </div>
        <LanguageSwitcher className="ml-auto md:ml-0" />
        <button
          type="button"
          onClick={cart.open}
          className="inline-flex h-12 shrink-0 items-center gap-2 bg-vermilion px-3 font-bold text-paper transition-colors hover:bg-vermilion-deep md:ml-0 md:px-4"
          aria-label={t('header.openBasket', { count: cart.count, amount: formatINR(cart.subtotal) })}
        >
          <span key={bumpKey} className={`relative ${bumpKey ? 'bump' : ''}`}>
            <ShoppingBasket size={22} aria-hidden="true" />
            {cart.count > 0 && (
              <span className="absolute -right-2 -top-2 grid min-w-5 place-items-center rounded-full bg-paper px-1 text-[11px] font-extrabold leading-5 text-vermilion tabular">
                {cart.count}
              </span>
            )}
          </span>
          <span className="hidden tabular sm:inline">{cart.count ? formatINR(cart.subtotal) : t('header.basket')}</span>
        </button>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchBox id="search-mobile" initial={route.query} onSearch={(q) => toShop('all', q)} onPick={onPick} />
      </div>

      <nav aria-label={t('header.categories')} className="hidden border-t border-rule lg:block">
        <ul className="mx-auto flex max-w-[1440px] items-center gap-8 px-16">
          <li>
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                go('home');
              }}
              className={navLink(route.view === 'home')}
            >
              {t('header.todaysHaat')}
            </a>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <a
                href={`#/shop?c=${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  toShop(c.id);
                }}
                className={navLink(route.view === 'shop' && route.category === c.id)}
              >
                {categoryName(t, c.id)}
              </a>
            </li>
          ))}
          <li className="ml-auto">
            <a
              href="#/shop"
              onClick={(e) => {
                e.preventDefault();
                toShop('all');
              }}
              className={navLink(route.view === 'shop' && route.category === 'all')}
            >
              {t('header.shopEverything')}
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile menu sheet: portalled so the header's backdrop-filter cannot trap it */}
      {createPortal(
      <div className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? '' : 'pointer-events-none'}`} aria-hidden={!menuOpen}>
        <div
          className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('header.menu')}
          className={`absolute inset-y-0 left-0 flex w-[min(86vw,360px)] flex-col bg-paper transition-transform duration-500 ease-out-expo ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b-2 border-ink px-4 py-3">
            <Wordmark />
            <button type="button" className="grid size-10 place-items-center" onClick={() => setMenuOpen(false)} aria-label={t('header.closeMenu')} tabIndex={menuOpen ? 0 : -1}>
              <X size={24} />
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {['all', ...CATEGORIES.map((c) => c.id)].map((id) => (
              <li key={id} className="border-b border-rule">
                <button
                  type="button"
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => toShop(id)}
                  className={`flex w-full items-baseline justify-between px-4 py-4 text-left text-lg font-bold hover:text-vermilion ${
                    route.view === 'shop' && route.category === id ? 'text-vermilion' : ''
                  }`}
                >
                  {id === 'all' ? t('header.shopEverything') : categoryName(t, id)}
                  <span className="text-sm font-semibold text-ink-mute tabular" aria-hidden="true">
                    {id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === id).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="border-t-2 border-ink px-4 py-4 text-sm text-ink-soft">{t('header.menuFooter')}</p>
        </div>
      </div>,
      document.body,
      )}
    </header>
  );
}
