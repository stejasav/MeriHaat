import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { LANGUAGES } from '../../i18n';

// A quiet masthead control: one glyph for the current language, a ruled sheet of five on demand.
export default function LanguageSwitcher({ className = '' }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const itemRefs = useRef([]);
  const menuId = useId();

  const currentIndex = Math.max(0, LANGUAGES.findIndex((l) => l.code === i18n.resolvedLanguage));
  const current = LANGUAGES[currentIndex];

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => itemRefs.current[currentIndex]?.focus());
    const onDoc = (e) => !rootRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, [open, currentIndex]);

  const choose = (code) => {
    setOpen(false);
    if (code !== i18n.resolvedLanguage) i18n.changeLanguage(code);
    buttonRef.current?.focus();
  };

  const onMenuKey = (e) => {
    const items = itemRefs.current;
    const i = items.indexOf(document.activeElement);
    const move = (n) => {
      e.preventDefault();
      items[(n + items.length) % items.length]?.focus();
    };
    if (e.key === 'ArrowDown') move(i + 1);
    else if (e.key === 'ArrowUp') move(i - 1);
    else if (e.key === 'Home') move(0);
    else if (e.key === 'End') move(items.length - 1);
    else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === 'Tab') setOpen(false);
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={t('common.changeLanguage', { name: current.native })}
        className={`group inline-flex h-12 items-center gap-1.5 px-2 text-sm font-bold transition-colors hover:text-vermilion ${open ? 'text-vermilion' : 'text-ink'}`}
      >
        <Languages size={18} strokeWidth={2} className="shrink-0" aria-hidden="true" />
        <span lang={current.tag} className="min-w-[1.5em] text-center leading-none">
          {current.short}
        </span>
        <ChevronDown size={14} strokeWidth={2.5} className={`hidden shrink-0 transition-transform duration-300 ease-out-quart sm:block ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <ul
          id={menuId}
          role="menu"
          aria-label={t('common.language')}
          onKeyDown={onMenuKey}
          className="absolute right-0 top-full z-50 mt-1 w-52 animate-[fade_220ms_var(--ease-out-quart)] border-2 border-ink bg-paper shadow-[0_18px_40px_-12px_rgb(23_20_15/0.35)]"
        >
          <li role="presentation" className="border-b border-rule px-3.5 pb-2 pt-2.5 text-[11px] font-bold uppercase tracking-wider text-ink-mute">
            {t('common.language')}
          </li>
          {LANGUAGES.map((l, i) => {
            const active = l.code === current.code;
            return (
              <li key={l.code} role="presentation" className="border-b border-rule last:border-b-0">
                <button
                  ref={(el) => (itemRefs.current[i] = el)}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  lang={l.tag}
                  onClick={() => choose(l.code)}
                  className={`relative flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[15px] transition-colors hover:bg-paper-deep focus:bg-paper-deep focus:outline-none ${
                    active ? 'font-extrabold text-vermilion' : 'font-semibold text-ink'
                  }`}
                >
                  {active && <span className="absolute inset-y-0 left-0 w-[3px] bg-vermilion" aria-hidden="true" />}
                  <span>{l.native}</span>
                  {active ? (
                    <Check size={16} strokeWidth={3} aria-hidden="true" />
                  ) : (
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-mute" aria-hidden="true">
                      {l.code}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
