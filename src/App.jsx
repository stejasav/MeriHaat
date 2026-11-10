import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Hero from './components/home/Hero';
import CategoryIndex from './components/home/CategoryIndex';
import Bestsellers from './components/home/Bestsellers';
import Promotions from './components/home/Promotions';
import Overnight from './components/home/Overnight';
import Recommended from './components/home/Recommended';
import Testimonials from './components/home/Testimonials';
import Promise from './components/home/Promise';
import ShopPage from './components/shop/ShopPage';
import { useDeliveryDate } from './hooks/useDeliveryDate';
import { useHashRoute } from './hooks/useHashRoute';

export default function App() {
  const [route, go] = useHashRoute();
  const delivery = useDeliveryDate();
  const [city, setCity] = useState('West Delhi');
  // Subscribing here re-renders the whole tree on a language change, so formatted dates and prices follow too.
  const { t } = useTranslation();

  const toShop = (category = 'all') => go('shop', { category });

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        {t('common.skip')}
      </a>
      <AnnouncementBar city={city} onCityChange={setCity} delivery={delivery} />
      <Header route={route} go={go} />
      {route.view === 'shop' ? (
        <ShopPage route={route} go={go} month={delivery.delivery.getMonth()} />
      ) : (
        <main id="main">
          <Hero delivery={delivery} onShop={() => toShop()} />
          <CategoryIndex onCategory={toShop} />
          <Bestsellers month={delivery.delivery.getMonth()} />
          <Promotions onCategory={toShop} />
          <Overnight />
          <Recommended month={delivery.delivery.getMonth()} />
          <Testimonials />
          <Promise />
        </main>
      )}
      <Footer go={go} />
      <CartDrawer delivery={delivery} city={city} onBrowse={() => toShop()} />
    </>
  );
}
