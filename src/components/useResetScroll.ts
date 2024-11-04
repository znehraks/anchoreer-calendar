/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from 'react';

export function useResetScroll<T extends HTMLElement>(dependencies: any[] = []) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, dependencies);

  return ref;
}
