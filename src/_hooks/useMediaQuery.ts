"use client";

import { useCallback, useSyncExternalStore } from "react";

// Servern vet inte skärmstorleken, så den svarar alltid false.
// Klienten tar över efter hydrering och uppdateras om fönstret ändras.
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
