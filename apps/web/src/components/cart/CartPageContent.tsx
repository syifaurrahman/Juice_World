"use client";

import { useState } from "react";
import { useStore } from "@nanostores/react";
import { Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag } from "lucide-react";
import {
  $cartItems,
  $cartTotal,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../lib/cart";

function formatPrice(val: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(val);
}

export default function CartPageContent() {
  const items = useStore($cartItems);
  const total = useStore($cartTotal);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  function applyPromo(e: React.FormEvent) {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "JUICEWORLD15") {
      setDiscountPercent(15);
      setPromoMessage("✓ Kupon JUICEWORLD15 diterapkan: Diskon 15%!");
    } else if (promoCode.trim().toUpperCase() === "SEGAR") {
      setDiscountPercent(10);
      setPromoMessage("✓ Kupon SEGAR diterapkan: Diskon 10%!");
    } else {
      setDiscountPercent(0);
      setPromoMessage("✕ Kode kupon tidak valid. Coba: JUICEWORLD15 atau SEGAR");
    }
  }

  const discountAmount = (total * discountPercent) / 100;
  const finalTotal = total - discountAmount;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-secondary/40 py-24 px-6 text-center border border-border/40">
        <div className="flex size-20 items-center justify-center rounded-full bg-secondary text-4xl mb-4">
          🛒
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Keranjang Belanja Masih Kosong
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mt-2 mb-8">
          Belum ada produk yang Anda tambahkan. Jelajahi katalog jus segar organik kami sekarang.
        </p>
        <a
          href="/products"
          class="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-8 text-xs font-semibold uppercase tracking-widest text-background hover:bg-foreground/80 transition-all shadow-sm"
        >
          <ShoppingBag className="size-4" />
          Mulai Belanja Jus
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      {/* Items List */}
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        <div className="flex items-center justify-between pb-4 border-b border-border/50">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Daftar Produk ({items.length})
          </h2>
          <button
            onClick={clearCart}
            className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-2 transition-colors"
          >
            Kosongkan Keranjang
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 rounded-3xl bg-secondary/30 p-4 border border-border/40 transition-all hover:bg-secondary/50"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 shrink-0 rounded-[15px] object-cover bg-background shadow-sm"
                />
              ) : (
                <div className="w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center bg-background border border-border/50 font-heading font-bold text-xl text-accent shadow-sm">
                  {item.name.charAt(0)}
                </div>
              )}

              <div className="flex flex-1 flex-col gap-1 min-w-0">
                <a
                  href={`/products/${item.slug}`}
                  className="font-heading text-base font-bold text-foreground truncate hover:text-accent transition-colors"
                >
                  {item.name}
                </a>
                <p className="text-xs text-muted-foreground">
                  {formatPrice(item.price)} / botol
                </p>

                {/* Mobile controls */}
                <div className="flex sm:hidden items-center justify-between mt-2">
                  <div className="flex items-center gap-2 rounded-full border border-border bg-background px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="min-w-[1rem] text-center text-xs font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                  <span className="font-heading text-sm font-bold text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>

              {/* Desktop Quantity */}
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 shadow-sm">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="flex size-6 items-center justify-center rounded-full text-foreground hover:bg-secondary transition-colors"
                  aria-label="Kurangi"
                >
                  <Minus className="size-3" />
                </button>
                <span className="min-w-[1.5rem] text-center font-bold text-sm text-foreground">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="flex size-6 items-center justify-center rounded-full text-foreground hover:bg-secondary transition-colors"
                  aria-label="Tambah"
                >
                  <Plus className="size-3" />
                </button>
              </div>

              {/* Desktop Subtotal */}
              <div className="hidden sm:flex flex-col items-end min-w-[6rem]">
                <span className="font-heading text-base font-bold text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeFromCart(item.productId)}
                className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors ml-1"
                aria-label="Hapus item"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Box */}
      <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6 rounded-3xl bg-secondary/50 p-6 sm:p-8 border border-border/50 sticky top-24">
        <h3 className="font-heading text-xl font-bold text-foreground">
          Ringkasan Pesanan
        </h3>

        {/* Promo Form */}
        <form onSubmit={applyPromo} className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Kode promo (cth: JUICEWORLD15)"
              className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-3 text-xs uppercase tracking-wider text-foreground placeholder:normal-case placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <button
            type="submit"
            className="h-11 rounded-full bg-foreground px-5 text-xs font-semibold uppercase tracking-widest text-background hover:bg-foreground/85 transition-all shrink-0"
          >
            Terapkan
          </button>
        </form>

        {promoMessage && (
          <p
            className={`text-xs ${
              discountPercent > 0 ? "text-[var(--brand-green)] font-semibold" : "text-destructive"
            }`}
          >
            {promoMessage}
          </p>
        )}

        {/* Breakdown */}
        <div className="flex flex-col gap-3 py-4 border-y border-border/50 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal Produk</span>
            <span className="font-medium text-foreground">{formatPrice(total)}</span>
          </div>

          {discountPercent > 0 && (
            <div className="flex justify-between text-[var(--brand-green)]">
              <span>Diskon ({discountPercent}%)</span>
              <span className="font-medium">- {formatPrice(discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between text-muted-foreground">
            <span>Estimasi Pengiriman</span>
            <span className="text-xs">Dihitung di checkout</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg font-bold text-foreground">Total Akhir</span>
          <span className="font-heading text-2xl font-bold text-foreground">
            {formatPrice(finalTotal)}
          </span>
        </div>

        {/* Checkout Button */}
        <a
          href="/checkout"
          className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-foreground text-xs font-semibold uppercase tracking-widest text-background hover:bg-foreground/85 active:scale-[0.99] transition-all shadow-md"
        >
          Lanjut ke Pembayaran
          <ArrowRight className="size-4" />
        </a>

        <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
          🔒 Pembayaran aman via QRIS, Bank Transfer, & E-Wallet.
        </p>
      </div>
    </div>
  );
}
