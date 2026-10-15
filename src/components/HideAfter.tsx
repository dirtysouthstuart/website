"use client";

import { useEffect, useState, type ReactNode } from "react";

// Renders its children until `endsAt` (ms timestamp) passes. Cached pages are
// refreshed on the server too, but this keeps a page left open from showing
// something that's already over.
export function HideAfter({ endsAt, children }: { endsAt: number; children: ReactNode }) {
  const [over, setOver] = useState(false);

  useEffect(() => {
    const check = () => setOver(Date.now() >= endsAt);
    check();
    const timer = setInterval(check, 60_000);
    return () => clearInterval(timer);
  }, [endsAt]);

  return over ? null : <>{children}</>;
}
