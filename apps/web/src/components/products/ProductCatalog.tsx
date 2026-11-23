"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { products, categories, formatPrice, type ProductCategory } from "../../data/products";
import ProductCard from "./ProductCard";

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high">("popular");

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        // popular
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="flex flex-col gap-8">
      {/* Controls Bar: Search & Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-3xl bg-secondary/50 p-4 border border-border/50">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari jus favoritmu (cth: jeruk, detox, jahe)..."
            className="h-11 w-full rounded-full border border-border/80 bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <SlidersHorizontal className="size-4 text-muted-foreground hidden sm:block" />
          <span className="text-xs text-muted-foreground font-medium hidden sm:inline">Urutkan:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-11 rounded-full border border-border/80 bg-background px-4 text-xs font-semibold uppercase tracking-wider text-foreground focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
          >
            <option value="popular">Terpopuler</option>
            <option value="price-low">Harga: Rendah ke Tinggi</option>
            <option value="price-high">Harga: Tinggi ke Rendah</option>
          </select>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <p>
          Menampilkan <span className="font-semibold text-foreground">{filteredProducts.length}</span> dari {products.length} varian jus
        </p>
        {selectedCategory !== "all" && (
          <button
            onClick={() => setSelectedCategory("all")}
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl bg-secondary/30 py-20 px-4 text-center border border-border/40">
          <div className="flex size-16 items-center justify-center rounded-full bg-secondary text-2xl mb-4">
            🔍
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground">
            Tidak Ada Jus Ditemukan
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
            Kami tidak dapat menemukan jus dengan kata kunci "{searchQuery}". Coba gunakan kata kunci lain atau reset filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="inline-flex h-10 items-center rounded-full bg-foreground px-6 text-xs font-semibold uppercase tracking-widest text-background hover:bg-foreground/80 transition-all"
          >
            Lihat Semua Produk
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              formattedPrice={formatPrice(product.price)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
