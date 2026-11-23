"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { addToCart } from "../../lib/cart";
import type { Product } from "../../data/products";

interface Props {
  product: Product;
  formattedPrice: string;
}

// Background circle tone per category/slug matching the Behance palette
const flavorTones: Record<string, { bg: string; circle: string }> = {
  "orange-blast": { bg: "bg-amber-100/40", circle: "bg-amber-200/60" },
  "green-detox": { bg: "bg-emerald-100/40", circle: "bg-emerald-200/60" },
  "berry-bliss": { bg: "bg-purple-100/40", circle: "bg-purple-200/60" },
  "mango-sunrise": { bg: "bg-yellow-100/40", circle: "bg-yellow-200/60" },
  "watermelon-chill": { bg: "bg-rose-100/40", circle: "bg-rose-200/60" },
  "carrot-glow": { bg: "bg-orange-100/40", circle: "bg-orange-200/60" },
  "tropical-paradise": { bg: "bg-lime-100/40", circle: "bg-lime-200/60" },
  "immunity-shield": { bg: "bg-amber-100/50", circle: "bg-amber-300/50" },
};

export default function ProductCard({ product, formattedPrice }: Props) {
  const [added, setAdded] = useState(false);
  const tone = flavorTones[product.slug] || { bg: "bg-secondary/60", circle: "bg-accent/20" };

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    window.dispatchEvent(new CustomEvent("juice-open-cart"));
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className={`group relative flex flex-col items-center rounded-[28px] ${tone.bg} p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 border border-border/40 w-full max-w-[240px] sm:max-w-[250px] mx-auto`}>
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-3.5 left-3.5 z-20 rounded-full bg-foreground px-2.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-widest text-background">
          {product.badge}
        </span>
      )}

      {/* Frameless Product Visual Area - Snug & Proportional */}
      <a href={`/products/${product.slug}`} className="relative flex h-52 sm:h-56 w-full items-center justify-center my-2">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="relative z-10 max-h-48 sm:max-h-52 w-auto max-w-full object-contain rounded-[15px] drop-shadow-md transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="relative z-10 h-44 sm:h-48 w-full flex items-center justify-center" />
        )}
      </a>

      {/* Info */}
      <div className="flex flex-col items-center text-center mt-2 w-full">
        <a href={`/products/${product.slug}`} className="hover:opacity-80 transition-opacity">
          <h3 className="font-heading text-base font-bold text-foreground leading-snug">
            {product.name}
          </h3>
        </a>
        <p className="text-[11px] text-muted-foreground mt-0.5 tracking-wide">
          {product.volume} · {product.category.replace("-", " ")}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between w-full mt-3 pt-2.5 border-t border-border/40">
          <span className="font-heading text-base font-bold text-foreground">
            {formattedPrice}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Tambah ${product.name} ke keranjang`}
            className={`flex size-8 items-center justify-center rounded-full transition-all duration-200 ${
              added
                ? "bg-[var(--brand-green)] text-white"
                : "bg-foreground text-background hover:bg-foreground/80 active:scale-95"
            }`}
          >
            {added ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
