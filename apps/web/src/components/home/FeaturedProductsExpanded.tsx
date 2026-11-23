"use client";

import { useState, useRef, useEffect } from "react";
import { products, formatPrice } from "../../data/products";
import ProductCard from "../products/ProductCard";
import AnimatedContent from "../ui/AnimatedContent";

const featured = products.slice(0, 4);
const extra = products.slice(4);

export default function FeaturedProductsExpanded() {
  const [expanded, setExpanded] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleExpand = () => {
    if (!expanded) {
      if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
      setShowExtra(true);
      // Ensure state renders then trigger expansion transition
      requestAnimationFrame(() => {
        setExpanded(true);
      });
    } else {
      setExpanded(false);
      collapseTimeoutRef.current = setTimeout(() => {
        setShowExtra(false);
      }, 700);
    }
  };

  useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      {/* Always-visible first 4 products */}
      <AnimatedContent
        distance={50}
        stagger={0.12}
        duration={0.8}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center"
      >
        {featured.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            formattedPrice={formatPrice(product.price)}
          />
        ))}
      </AnimatedContent>

      {/* Expandable extra 4 products */}
      <div
        className="overflow-hidden transition-all duration-700 ease-in-out"
        style={{
          maxHeight: expanded ? "1200px" : "0px",
          opacity: expanded ? 1 : 0,
        }}
      >
        {showExtra && (
          <div className="mt-4 sm:mt-6">
            <AnimatedContent
              trigger="mount"
              distance={40}
              stagger={0.1}
              duration={0.7}
              ease="power3.out"
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center"
            >
              {extra.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  formattedPrice={formatPrice(product.price)}
                />
              ))}
            </AnimatedContent>
          </div>
        )}
      </div>

      {/* CTA button */}
      <div className="mt-14 flex justify-center">
        <button
          onClick={toggleExpand}
          className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground px-10 text-xs font-semibold tracking-widest text-foreground uppercase transition-all hover:bg-foreground hover:text-background"
        >
          {expanded ? (
            <>Sembunyikan ↑</>
          ) : (
            <>Lihat Semua 8 Varian Rasa →</>
          )}
        </button>
      </div>
    </div>
  );
}
