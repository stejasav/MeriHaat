import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import { CITIES } from '../../data/content';
import { categoryName, cityName } from '../../i18n/catalog';
import Wordmark from './Wordmark';

export default function Footer({ go }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus('error');
    setStatus('done');
    setEmail('');
  };

  const linkCls = 'text-paper/75 transition-colors hover:text-paper hover:underline';

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-4 pt-16 md:px-8 lg:px-16">
        <div className="grid gap-12 border-b border-paper/20 pb-12 lg:grid-cols-[5fr_7fr]">
          <div>
            <h2 className="font-semicondensed text-3xl font-extrabold leading-tight">{t('footer.letterTitle')}</h2>
            <p className="mt-2 max-w-[44ch] text-paper/70">
              {t('footer.letterBody')}
            </p>
            <form onSubmit={subscribe} className="mt-5 flex max-w-md border-2 border-paper focus-within:border-vermilion" noValidate>
              <label htmlFor="footer-email" className="sr-only">
                {t('footer.emailLabel')}
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus('idle');
                }}
                placeholder={t('footer.emailPlaceholder')}
                aria-invalid={status === 'error'}
                aria-describedby="footer-email-status"
                className="h-12 min-w-0 flex-1 bg-transparent px-3 placeholder:text-paper/50 focus:outline-none"
              />
              <button type="submit" className="inline-flex items-center gap-1.5 bg-paper px-4 font-bold text-ink transition-colors hover:bg-vermilion hover:text-paper">
                {t('footer.subscribe')} <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>
            <p id="footer-email-status" role="status" className="mt-2 min-h-5 text-sm">
              {status === 'error' && <span className="text-[#ff8a7a]">{t('footer.emailError')}</span>}
              {status === 'done' && <span className="text-paper/80">{t('footer.emailDone')}</span>}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-[15px] sm:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-paper/50">{t('footer.shop')}</h3>
              <ul className="space-y-2">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#/shop?c=${c.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go('shop', { category: c.id });
                      }}
                      className={linkCls}
                    >
                      {categoryName(t, c.id)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-paper/50">{t('footer.deliverTo')}</h3>
              <ul className="space-y-2 text-paper/75">
                {CITIES.map((c) => (
                  <li key={c}>{cityName(t, c)}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-paper/50">{t('footer.help')}</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#overnight" onClick={() => go('home', {}, { scroll: false })} className={linkCls}>
                    {t('footer.howDelivery')}
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@merihaat.in" className={linkCls}>
                    hello@merihaat.in
                  </a>
                </li>
                <li>
                  <a href="tel:+911140000000" className={linkCls}>
                    +91 11 4000 0000
                  </a>
                </li>
                <li className="text-paper/75">{t('footer.hours')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-10">
          <Wordmark invert size="lg" />
        </div>

        <div className="flex flex-col gap-3 border-t border-paper/20 py-6 text-sm text-paper/60 md:flex-row md:items-center md:justify-between">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <p>{t('footer.notRight')}</p>
        </div>
      </div>
    </footer>
  );
}
