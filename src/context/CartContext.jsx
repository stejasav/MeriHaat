import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { productById } from '../data/products';
import { DELIVERY } from '../data/content';

const CartContext = createContext(null);
const STORAGE_KEY = 'merihaat:basket:v1';

const keyOf = (productId, packId) => `${productId}__${packId}`;

function reducer(state, action) {
  switch (action.type) {
    case 'set': {
      const { productId, packId, qty } = action;
      const key = keyOf(productId, packId);
      const next = { ...state };
      if (qty <= 0) delete next[key];
      else next[key] = { productId, packId, qty: Math.min(qty, 20) };
      return next;
    }
    case 'clear':
      return {};
    default:
      return state;
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    // Drop anything no longer in the catalogue.
    return Object.fromEntries(
      Object.entries(parsed).filter(([, l]) => productById[l.productId]?.packs.some((p) => p.id === l.packId)),
    );
  } catch {
    return {};
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load);
  const [isOpen, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable: basket still works for this visit */
    }
  }, [items]);

  const getQty = useCallback((productId, packId) => items[keyOf(productId, packId)]?.qty ?? 0, [items]);

  const setQty = useCallback(
    (productId, packId, qty) => {
      const prev = items[keyOf(productId, packId)]?.qty ?? 0;
      if (qty > prev) setLastAdded(Date.now());
      dispatch({ type: 'set', productId, packId, qty });
    },
    [items],
  );

  const value = useMemo(() => {
    const lines = Object.values(items).map((l) => {
      const product = productById[l.productId];
      const pack = product.packs.find((p) => p.id === l.packId);
      return { ...l, key: keyOf(l.productId, l.packId), product, pack, total: pack.price * l.qty, mrpTotal: pack.mrp * l.qty };
    });
    const subtotal = lines.reduce((s, l) => s + l.total, 0);
    const mrpTotal = lines.reduce((s, l) => s + l.mrpTotal, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const deliveryFee = subtotal === 0 || subtotal >= DELIVERY.freeAbove ? 0 : DELIVERY.fee;
    return {
      lines,
      count,
      subtotal,
      savings: mrpTotal - subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      toFreeDelivery: Math.max(0, DELIVERY.freeAbove - subtotal),
      getQty,
      setQty,
      clear: () => dispatch({ type: 'clear' }),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      lastAdded,
    };
  }, [items, getQty, setQty, isOpen, lastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
