# MeriHaat

Storefront for MeriHaat, a premium fresh-produce and daily-essentials brand for Delhi NCR: order by 11 PM, delivered by 7 AM.

React 18 + JavaScript + Tailwind CSS v4, bundled with Vite. No router or state library: a small hash router (`src/hooks/useHashRoute.js`) and a React context for the basket.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

```
src/
  App.jsx                 page assembly + routing (#/ and #/shop?c=&q=)
  context/CartContext.jsx basket state, totals, free-delivery threshold, localStorage persistence
  hooks/                  useDeliveryDate (tomorrow's date, 11 PM cut-off countdown), useHashRoute
  data/products.js        catalogue structure: ids, pack sizes, INR prices, seasons, search aliases
  data/content.js         delivery rules, city and slot ids, overnight clock times
  i18n/                   i18next setup, LANGUAGES list, catalogue text helpers, locales/*.json
  components/
    layout/               AnnouncementBar, Header (search + suggestions, mobile menu), LanguageSwitcher,
                          Footer, Wordmark
    home/                 Hero (date leaf + in-season grid), SeasonBand, CategoryIndex, Bestsellers,
                          Promotions, Overnight, Recommended, Testimonials, Promise
    product/              ProductCell, ProductGrid, QuantityStepper
    shop/ShopPage.jsx     search, aisle filter, in-season toggle, sort, empty state
    cart/CartDrawer.jsx   basket drawer: steppers, slots, totals, booking confirmation
```

## Languages

English (default), हिंदी, বাংলা, मराठी and தமிழ், via `i18next` + `react-i18next`. Every customer-facing
string, including product names, origins and notes, lives in `src/i18n/locales/<lang>.json`; components
only use keys. `en.json` is the source of truth and the fallback.

- The choice is saved in `localStorage` (`merihaat:lang`) and can be forced with `?lang=ta`. New visitors get English.
- `<html lang>`, the page title and the meta description follow the active language.
- Search matches every language at once, plus romanised `aliases` in `products.js` (`seb`, `kanda`, …).
- Numbers stay in Latin digits (`-u-nu-latn`) so prices and the calendar numerals keep Archivo.
- Fonts: Noto Sans Devanagari / Bengali / Tamil (body, with `wdth` axes) and Tiro Devanagari / Bangla / Tamil
  (wordmark tagline), all subset by `unicode-range` so a script only downloads when it is on screen.

To add a string: add the key to `en.json`, then to the other four files with the same `{{variables}}` and `<tags>`.
To add a product: add it to `products.js` and a `products.<id>` entry (`name`, `short`, `origin`, `note`) in every locale.

## Before launch

- **Testimonials are sample content** (`testimonials.items` in `src/i18n/locales/*.json`). Replace them with real customer reviews.
- **Photography** is Unsplash stock, hotlinked as a stand-in. Swap the `image` fields in `src/data/products.js` for your own shoots.
- Prices, phone number, email and company name are placeholders.
- Checkout is front-end only: "Book" confirms the order locally and takes no payment.
