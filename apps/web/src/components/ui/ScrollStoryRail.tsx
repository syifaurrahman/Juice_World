"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";

interface SectionItem {
  id: string;
  num: string;
  label: string;
  short: string;
}

const SECTIONS: SectionItem[] = [
  { id: "hero", num: "01", label: "Momen Segar", short: "Hero" },
  { id: "flavors", num: "02", label: "Koleksi Rasa", short: "Rasa" },
  { id: "cara-kerja", num: "03", label: "3 Langkah Mudah", short: "Cara" },
  { id: "kisah-kami", num: "04", label: "Filosofi & Kebun", short: "Kisah" },
  { id: "ulasan", num: "05", label: "Suara Pelanggan", short: "Ulasan" },
  { id: "newsletter", num: "06", label: "Ayo Terhubung", short: "Gabung" },
];

export default function ScrollStoryRail() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(progress);
      setIsVisible(winScroll > 150);

      // Determine active section by measuring distance to viewport top
      const scrollPos = winScroll + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Navigasi Cerita Halaman"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none"
    >
      {/* Background container pill */}
      <div className="relative flex flex-col items-center gap-4 rounded-full border border-border/80 bg-background/85 px-2.5 py-4 shadow-lg backdrop-blur-md">
        {/* Continuous vertical track background */}
        <div className="absolute top-6 bottom-6 w-[2px] bg-border/60 -z-0"></div>

        {/* Live progress fill on the track */}
        <div
          className="absolute top-6 w-[2px] bg-gradient-to-b from-primary via-accent to-primary transition-all duration-150 -z-0"
          style={{ height: `calc(${scrollProgress}% * 0.72)` }}
        ></div>

        {SECTIONS.map((s) => {
          const isActive = activeId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="group relative flex size-7 items-center justify-center rounded-full transition-all focus:outline-none"
              aria-label={`Loncat ke bagian ${s.label}`}
            >
              {/* Dot / Indicator */}
              <span
                className={`relative z-10 transition-all duration-300 ${
                  isActive
                    ? "size-3.5 rounded-full bg-accent ring-4 ring-accent/25 shadow-sm scale-110"
                    : "size-2 rounded-full bg-muted-foreground/40 group-hover:size-2.5 group-hover:bg-foreground"
                }`}
              ></span>

              {/* Flyout Label on hover or active */}
              <div
                className={`pointer-events-none absolute right-full mr-3.5 hidden items-center gap-2 whitespace-nowrap rounded-full border border-border bg-background/95 px-3 py-1 shadow-md backdrop-blur-sm transition-all duration-200 group-hover:flex ${
                  isActive ? "flex opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <span className="text-[10px] font-bold tracking-widest text-accent uppercase">
                  {s.num}
                </span>
                <span className="text-xs font-medium text-foreground">
                  {s.label}
                </span>
              </div>
            </button>
          );
        })}

        {/* Scroll Progress percentage indicator at bottom of rail */}
        <div className="mt-1 flex flex-col items-center border-t border-border/60 pt-2 text-[9px] font-bold text-muted-foreground">
          <span>{Math.round(scrollProgress)}%</span>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          className="mt-3 flex size-8 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-muted"
        >
          <ArrowUp className="size-3.5 text-foreground" />
        </button>
      )}
    </aside>
  );
}