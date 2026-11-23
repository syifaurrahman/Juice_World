"use client";

import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { $cartItems, $cartTotal, removeFromCart, updateQuantity, clearCart } from "../../lib/cart";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useStore($cartItems);
  const total = useStore($cartTotal);
  const displayItems = mounted ? items : [];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("juice-open-cart", handler);
    return () => window.removeEventListener("juice-open-cart", handler);
  }, []);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-background shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="size-4 text-primary" />
            <h2 className="font-heading text-base font-semibold text-foreground">
              Keranjang Belanja
            </h2>
            {mounted && items.length > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Tutup keranjang"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {displayItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-secondary text-3xl">
                🛒
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-heading text-base font-semibold text-foreground">
                  Keranjang Kosong
                </p>
                <p className="text-sm text-muted-foreground">
                  Yuk tambahkan produk favoritmu!
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-9 items-center rounded-lg bg-primary px-5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Lihat Produk
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {displayItems.map((item) => (
                <li key={item.productId} className="flex gap-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-16 shrink-0 rounded-[15px] object-cover bg-secondary/50"
                    />
                  ) : (
                    <div className="size-16 shrink-0 rounded-lg flex items-center justify-center bg-secondary font-heading font-bold text-base text-accent">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-1.5 min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-snug truncate">
                      {item.name}
                    </p>
                    <p className="text-sm font-bold text-primary">
                      {formatPrice(item.price)}
                    </p>
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="flex size-6 items-center justify-center rounded border border-border text-foreground transition-colors hover:bg-muted"
                        aria-label="Kurangi"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm font-semibold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="flex size-6 items-center justify-center rounded border border-border text-foreground transition-colors hover:bg-muted"
                        aria-label="Tambah"
                      >
                        <Plus className="size-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="ml-auto flex size-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-destructive"
                        aria-label="Hapus item"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer summary */}
        {displayItems.length > 0 && (
          <div className="border-t border-border px-5 py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-heading text-lg font-bold text-foreground">
                {formatPrice(total)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Ongkir dihitung saat checkout.
            </p>
            <a
              href="/checkout"
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Lanjut Checkout
            </a>
            <button
              onClick={clearCart}
              className="text-center text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Kosongkan Keranjang
            </button>
          </div>
        )}
      </div>
    </>
  );
}
