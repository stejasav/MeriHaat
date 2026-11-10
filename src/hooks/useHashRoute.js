import { useCallback, useEffect, useState } from 'react';

// Minimal hash router: #/ (home) and #/shop?c=fruits&q=apple. Keeps the app dependency-free.
function parse() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const [path, qs = ''] = hash.split('?');
  const params = new URLSearchParams(qs);
  return { view: path.startsWith('/shop') ? 'shop' : 'home', category: params.get('c') || 'all', query: params.get('q') || '' };
}

export function useHashRoute() {
  const [route, setRoute] = useState(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const go = useCallback((view, { category = 'all', query = '' } = {}, { scroll = true } = {}) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('c', category);
    if (query) params.set('q', query);
    const qs = params.toString();
    const next = view === 'shop' ? `#/shop${qs ? `?${qs}` : ''}` : '#/';
    if (window.location.hash !== next) window.location.hash = next;
    if (scroll) window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return [route, go];
}
