import { useEffect, useState } from 'react';
import { DELIVERY } from '../data/content';

// Works out which morning the next order lands on, and how long is left to order for it.
function compute(now) {
  const cutoff = new Date(now);
  cutoff.setHours(DELIVERY.cutoffHour, 0, 0, 0);
  const pastCutoff = now >= cutoff;
  if (pastCutoff) cutoff.setDate(cutoff.getDate() + 1);

  const delivery = new Date(now);
  delivery.setHours(7, 0, 0, 0);
  delivery.setDate(delivery.getDate() + (pastCutoff ? 2 : 1));

  const msLeft = cutoff - now;
  const hoursLeft = Math.floor(msLeft / 3_600_000);
  const minutesLeft = Math.floor((msLeft % 3_600_000) / 60_000);

  return { now, delivery, cutoff, hoursLeft, minutesLeft, isTomorrow: !pastCutoff };
}

export function useDeliveryDate() {
  const [state, setState] = useState(() => compute(new Date()));
  useEffect(() => {
    const t = setInterval(() => setState(compute(new Date())), 30_000);
    return () => clearInterval(t);
  }, []);
  return state;
}
