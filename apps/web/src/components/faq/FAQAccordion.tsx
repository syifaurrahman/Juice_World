"use client";

import { useState } from "react";
import { ChevronDown, Search, MessageCircle, HelpCircle } from "lucide-react";

type FAQItem = {
  q: string;
  a: string;
  category: "produk" | "penyimpanan" | "pengiriman" | "langganan";
};

const faqs: FAQItem[] = [
  {
    category: "produk",
    q: "Apa bedanya jus cold-pressed dengan jus blender biasa?",
    a: "Jus cold-pressed diekstrak menggunakan tekanan hidrolik tinggi tanpa pisau berputar cepat yang menimbulkan panas. Proses ini menjaga 100% enzim hidup, vitamin, dan mineral penting tidak teroksidasi, sehingga nutrisinya jauh lebih padat dan rasanya jauh lebih murni dibanding jus blender.",
  },
  {
    category: "produk",
    q: "Apakah ada tambahan gula, air, atau pengawet kimia?",
    a: "Sama sekali TIDAK ADA. Produk Juice World 100% murni buah dan sayuran segar. Kami tidak menambahkan setetes air pun, tanpa gula pasir/pemanis sintetis, dan tanpa bahan pengawet apa pun.",
  },
  {
    category: "produk",
    q: "Dari mana buah dan sayuran Juice World didapatkan?",
    a: "Kami bermitra langsung dengan kebun-kebun lokal bersertifikasi organik di Jawa Barat, Jawa Tengah, dan Bali. Buah dipetik saat tingkat kematangan pohon optimal untuk memastikan rasa manis alami dan kadar antioksidan tertinggi.",
  },
  {
    category: "penyimpanan",
    q: "Berapa lama daya tahan jus Juice World?",
    a: "Karena tanpa bahan pengawet sintetis dan tidak dipanaskan (unpasteurized), jus kami bertahan 3–5 hari jika disimpan di dalam chiller/kulkas bersuhu stabil 1–4°C dalam kondisi botol tertutup rapat.",
  },
  {
    category: "penyimpanan",
    q: "Apakah jus bisa disimpan di freezer untuk tahan lebih lama?",
    a: "Ya, bisa! Jika Anda ingin menyimpan stok lebih dari 5 hari, masukkan ke dalam freezer dan jus dapat bertahan hingga 3 minggu. Cukup cairkan di kulkas bawah semalam sebelum diminum.",
  },
  {
    category: "penyimpanan",
    q: "Mengapa jus terkadang terlihat mengendap atau terpisah lapisannya?",
    a: "Pemisahan lapisan adalah hal yang SANGAT ALAMI pada jus murni tanpa bahan stabilizer/emulsifier kimia. Cukup kocok botol perlahan sebelum diminum agar serat alaminya tercampur rata kembali.",
  },
  {
    category: "pengiriman",
    q: "Bagaimana cara pengiriman agar jus tetap dingin dan segar?",
    a: "Setiap pesanan dikemas menggunakan insulated thermal pouch khusus yang dilengkapi ice gel pack beku berstandar food grade. Suhu dingin akan terjaga stabil selama 4–6 jam perjalanan kurir hingga tiba di pintu rumah Anda.",
  },
  {
    category: "pengiriman",
    q: "Berapa lama waktu pengiriman tiba setelah saya memesan?",
    a: "Untuk Instant Delivery, pesanan akan tiba dalam waktu 1–2 jam. Untuk Same Day Delivery, pesanan yang masuk sebelum jam 14.00 akan tiba di hari yang sama sebelum jam 18.00.",
  },
  {
    category: "pengiriman",
    q: "Wilayah mana saja yang dijangkau pengiriman saat ini?",
    a: "Saat ini kami melayani seluruh area Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi) via kurir instan/same-day. Untuk kota-kota lain di Pulau Jawa, kami menggunakan layanan ekspedisi dingin khusus (Next Day Cold Chain).",
  },
  {
    category: "langganan",
    q: "Apakah ada paket langganan mingguan atau bulanan?",
    a: "Tentu ada! Kami menyediakan paket Weekly Detox dan Monthly Wellness dengan potongan harga hingga 20% serta jadwal pengiriman rutin 2-3 kali seminggu. Anda dapat menghubungi tim kami melalui WhatsApp untuk personalisasi paket.",
  },
  {
    category: "langganan",
    q: "Bisakah memesan untuk kebutuhan kantor, wedding, atau event khusus?",
    a: "Bisa sekali. Kami menyediakan paket Juice Bar & Bulk Orders dengan custom label dan mini bottles untuk seminar, gathering kantor, atau pesta pernikahan. Hubungi kami minimal H-3 sebelum acara.",
  },
];

export default function FAQAccordion() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({ 0: true, 1: true });

  const toggle = (idx: number) => {
    setOpenItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const filteredFaqs = faqs.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-10">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-3xl bg-secondary/50 p-4 border border-border/50">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pertanyaan Anda..."
            className="h-11 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {[
            { id: "all", label: "Semua" },
            { id: "produk", label: "Bahan & Proses" },
            { id: "penyimpanan", label: "Penyimpanan" },
            { id: "pengiriman", label: "Pengiriman" },
            { id: "langganan", label: "Langganan" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider shrink-0 transition-all ${
                activeCategory === cat.id
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-background/80 text-muted-foreground hover:bg-background hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-4">
        {filteredFaqs.length === 0 ? (
          <div className="rounded-3xl bg-secondary/30 py-16 text-center border border-border/40">
            <p className="font-heading text-lg font-bold text-foreground">
              Pertanyaan tidak ditemukan
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Coba kata kunci lain atau hubungi tim bantuan kami.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openItems[idx];
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-border/50 bg-secondary/30 transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left font-heading text-base font-bold text-foreground hover:text-accent transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-sans">
                      ?
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-muted-foreground leading-relaxed pl-16">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Need More Help Box */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-secondary/80 p-8 sm:p-10 border border-border/60 mt-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-2xl">
            💬
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">
              Masih Memiliki Pertanyaan Lain?
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Tim nutrisionis dan customer care kami siap membantu menjawab semua pertanyaan Anda.
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/6281234567890?text=Halo%20Juice%20World,%20saya%20ingin%20bertanya%20seputar%20jus%20segar%20Anda"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--brand-green)] px-8 text-xs font-semibold uppercase tracking-widest text-white hover:opacity-90 transition-all shrink-0 shadow-sm"
        >
          <MessageCircle className="size-4" />
          Chat WhatsApp
        </a>
      </div>
    </div>
  );
}
