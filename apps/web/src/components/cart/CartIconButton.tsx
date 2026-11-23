"use client";

import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { ShoppingCart } from "lucide-react";
import { $cartCount } from "../../lib/cart";

export default function CartIconButton() {
  const [mounted, setMounted] = useState(false);
  const count = useStore($cartCount);

  useEffect(() => {
    setMounted(true);
  }, []);

  function openCart() {
    window.dispatchEvent(new CustomEvent("juice-open-cart"));
  }

  const displayCount = mounted ? count : 0;

  return (
    <button
      onClick={openCart}
      aria-label={`Keranjang belanja — ${displayCount} item`}
      className="relative inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted"
    >
      <ShoppingCart className="size-4" />
      {displayCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {displayCount > 9 ? "9+" : displayCount}
        </span>
      )}
    </button>
  );
}
