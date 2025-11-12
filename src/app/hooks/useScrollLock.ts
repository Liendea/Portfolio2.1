"use client";
import { useEffect } from "react";

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    document.body.classList.toggle("no-scroll", isLocked);
    return () => document.body.classList.remove("no-scroll");
  }, [isLocked]);
}
