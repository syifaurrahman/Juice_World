"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart, Check } from "lucide-react";
import { addToCart } from "../../lib/cart";
import type { Product } from "../../data/products";

interface Props {
  product: Product;
  formattedPrice: string;
}

export default function ProductDetailsAction({ product, formattedPrice }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );
    setAdded(true);
    window.dispatchEvent(new CustomEvent("juice-open-cart"));
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6 pt-4 border-t border-border/50">
      {/* Price & Quantity Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider block">Harga Total</span>
          <span className="font-heading text-3xl font-bold text-foreground">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(product.price * quantity)}
          </span>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 rounded-full border border-border/80 bg-background px-3 py-1.5 shadow-sm">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex size-7 items-center justify-center rounded-full text-foreground hover:bg-secondary transition-colors"
            aria-label="Kurangi kuantiti"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="min-w-[2rem] text-center font-heading text-base font-bold text-foreground">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex size-7 items-center justify-center rounded-full text-foreground hover:bg-secondary transition-colors"
            aria-label="Tambah kuantiti"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Add To Cart Button */}
      <button
        onClick={handleAdd}
        disabled={!product.inStock}
        className={`flex h-13 w-full items-center justify-center gap-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md ${
          added
            ? "bg-[var(--brand-green)] text-white"
            : "bg-foreground text-background hover:bg-foreground/85 active:scale-[0.99]"
        }`}
      >
        {added ? (
          <>
            <Check className="size-4" />
            {quantity} Botol Ditambahkan ke Keranjang
          </>
        ) : (
          <>
            <ShoppingCart className="size-4" />
            Tambahkan ke Keranjang
          </>
        )}
      </button>
    </div>
  );
}
