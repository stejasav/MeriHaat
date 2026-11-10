import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css';
// Indic body faces: unicode-range subsets, so a script's files load only when it is on screen.
import '@fontsource-variable/noto-sans-devanagari/wdth.css';
import '@fontsource-variable/noto-sans-bengali/wdth.css';
import '@fontsource-variable/noto-sans-tamil/wdth.css';
// Serif accent faces for the wordmark tagline, one per script.
import '@fontsource/tiro-devanagari-hindi/400.css';
import '@fontsource/tiro-bangla/400.css';
import '@fontsource/tiro-tamil/400.css';
import './i18n';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
);
