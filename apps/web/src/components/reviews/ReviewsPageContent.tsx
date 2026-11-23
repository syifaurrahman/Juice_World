"use client";

import { useState } from "react";
import { Star, ThumbsUp, CheckCircle, PenLine, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";

type ReviewItem = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  product: string;
  title: string;
  content: string;
  helpfulCount: number;
  hasPhoto?: boolean;
};

const initialReviews: ReviewItem[] = [
  {
    id: "r1",
    name: "Sari Wulandari",
    role: "Jakarta Selatan",
    avatar: "SW",
    rating: 5,
    date: "18 Nov 2026",
    product: "Green Detox",
    title: "Energi terasa meningkat drastis!",
    content:
      "Rutin minum Green Detox setiap pagi selama 2 minggu ini. Badan terasa jauh lebih enteng, pencernaan lancar, dan rasa sayurannya tidak langu sama sekali karena perpaduan lemon dan jahenya pas banget.",
    helpfulCount: 42,
    hasPhoto: true,
  },
  {
    id: "r2",
    name: "Budi Santoso",
    role: "Surabaya",
    avatar: "BS",
    rating: 5,
    date: "14 Nov 2026",
    product: "Orange Blast",
    title: "Beda banget sama jus kemasan biasa",
    content:
      "Jus jeruk aslinya terasa murni tanpa campuran air ataupun gula rafinasi. Dikirim dalam box dingin dan es gel masih beku saat sampai di kantor. Recommended banget buat yang kerja lembur.",
    helpfulCount: 29,
  },
  {
    id: "r3",
    name: "Dewi Rahayu",
    role: "Bandung",
    avatar: "DR",
    rating: 5,
    date: "09 Nov 2026",
    product: "Berry Bliss",
    title: "Favorit anak-anak di rumah",
    content:
      "Anak-anak susah makan buah, tapi pas dikasih Berry Bliss langsung habis satu botol! Senang rasanya bisa kasih nutrisi alami tanpa drama. Kemasannya juga estetik.",
    helpfulCount: 35,
    hasPhoto: true,
  },
  {
    id: "r4",
    name: "Hendro Wijaya",
    role: "Tangerang Selatan",
    avatar: "HW",
    rating: 5,
    date: "03 Nov 2026",
    product: "Immunity Shield",
    title: "Andalan saat badan mulai greges",
    content:
      "Shot kunyit dan jahenya mantap sekali. Begitu diminum hangat di tenggorokan dan badan langsung keringetan sehat. Wajib stok di kulkas saat musim hujan.",
    helpfulCount: 18,
  },
  {
    id: "r5",
    name: "Nadia Utami",
    role: "Jakarta Pusat",
    avatar: "NU",
    rating: 4,
    date: "28 Okt 2026",
    product: "Watermelon Chill",
    title: "Sangat segar di siang hari terik",
    content:
      "Rasa semangkanya manis alami dan mint-nya bikin segar banget. Cuma kalau bisa volume 500ml pasti lebih mantap lagi! Overall 9/10.",
    helpfulCount: 14,
  },
  {
    id: "r6",
    name: "Dimas Aditya",
    role: "Depok",
    avatar: "DA",
    rating: 5,
    date: "20 Okt 2026",
    product: "Mango Sunrise",
    title: "Kombinasi mangga dan wortel yang brilian",
    content:
      "Awalnya ragu mangga dicampur wortel dan kunyit, ternyata rasanya luar biasa seimbang. Rasa mangganya tetap dominan tapi ada kick hangat yang menyehatkan.",
    helpfulCount: 21,
    hasPhoto: true,
  },
];

export default function ReviewsPageContent() {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "5" | "4" | "photo">("all");
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});

  // Form state
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newProduct, setNewProduct] = useState("Orange Blast");
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  function handleLikeHelpful(id: string) {
    if (helpfulLiked[id]) return;
    setHelpfulLiked({ ...helpfulLiked, [id]: true });
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  }

  function handleAddReview(e: React.FormEvent) {
    e.preventDefault();
    const created: ReviewItem = {
      id: "r" + (reviews.length + 1),
      name: newName || "Pelanggan Terverifikasi",
      role: "Pelanggan Baru",
      avatar: (newName ? newName[0] : "P").toUpperCase(),
      rating: newRating,
      date: "Baru saja",
      product: newProduct,
      title: newTitle,
      content: newContent,
      helpfulCount: 1,
    };
    setReviews([created, ...reviews]);
    setModalOpen(false);
    setNewName("");
    setNewTitle("");
    setNewContent("");
    alert("Ulasan Anda berhasil ditambahkan! Terima kasih.");
  }

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === "5") return r.rating === 5;
    if (selectedFilter === "4") return r.rating === 4;
    if (selectedFilter === "photo") return r.hasPhoto;
    return true;
  });

  return (
    <div className="flex flex-col gap-12">
      {/* Overall Score Hero Card */}
      <div className="flex flex-col md:flex-row gap-8 items-center rounded-3xl bg-secondary/50 p-8 sm:p-12 border border-border/50">
        <div className="flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-border/60 pb-6 md:pb-0 md:pr-8 shrink-0 md:w-64">
          <span className="font-heading text-6xl font-bold text-foreground">4.9</span>
          <div className="flex gap-1 text-accent text-lg my-2">
            {"★★★★★"}
          </div>
          <p className="text-sm font-semibold text-foreground">
            Berdasarkan 1.248+ Ulasan
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            100% Pembelian Terverifikasi
          </p>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="flex-1 w-full flex flex-col gap-2">
          {[
            { stars: "5 Bintang", pct: 92 },
            { stars: "4 Bintang", pct: 6 },
            { stars: "3 Bintang", pct: 1 },
            { stars: "2 Bintang", pct: 0 },
            { stars: "1 Bintang", pct: 1 },
          ].map((row) => (
            <div key={row.stars} className="flex items-center gap-3 text-xs">
              <span className="w-16 shrink-0 text-muted-foreground">{row.stars}</span>
              <div className="h-2 flex-1 rounded-full bg-background overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
              <span className="w-8 shrink-0 text-right font-medium text-foreground">
                {row.pct}%
              </span>
            </div>
          ))}
        </div>

        {/* Action Button: Tulis Ulasan */}
        <div className="shrink-0 w-full md:w-auto flex flex-col items-center justify-center">
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <button className="flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-foreground px-6 text-xs font-semibold uppercase tracking-widest text-background hover:bg-foreground/80 transition-all shadow-md">
                <PenLine className="size-4" />
                Tulis Ulasan
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-3xl bg-background p-6">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl font-bold text-foreground">
                  Bagikan Pengalaman Anda
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddReview} className="flex flex-col gap-4 mt-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Nama Anda *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Contoh: Maya Indah"
                    className="h-10 w-full rounded-xl border border-border bg-secondary/30 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Produk yang Dibeli
                  </label>
                  <select
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    className="h-10 w-full rounded-xl border border-border bg-secondary/30 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="Orange Blast">Orange Blast</option>
                    <option value="Green Detox">Green Detox</option>
                    <option value="Berry Bliss">Berry Bliss</option>
                    <option value="Mango Sunrise">Mango Sunrise</option>
                    <option value="Watermelon Chill">Watermelon Chill</option>
                    <option value="Carrot Glow">Carrot Glow</option>
                    <option value="Tropical Paradise">Tropical Paradise</option>
                    <option value="Immunity Shield">Immunity Shield</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Rating Kepuasan
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setNewRating(val)}
                        className={`text-xl ${val <= newRating ? "text-accent" : "text-muted-foreground/30"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Judul Ulasan *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Contoh: Segar dan sangat bermanfaat!"
                    className="h-10 w-full rounded-xl border border-border bg-secondary/30 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Ulasan Lengkap *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Ceritakan rasa jus, kesegaran, atau efek kesehatannya..."
                    className="w-full rounded-xl border border-border bg-secondary/30 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <button
                  type="submit"
                  className="h-11 rounded-full bg-foreground text-xs font-semibold uppercase tracking-widest text-background hover:bg-foreground/85 transition-all mt-2"
                >
                  Kirim Ulasan Sekarang
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: "all", label: "Semua Ulasan" },
            { id: "5", label: "5 Bintang ★" },
            { id: "4", label: "4 Bintang ★" },
            { id: "photo", label: "Dengan Foto 📷" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedFilter === tab.id
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-secondary/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          Menampilkan {filteredReviews.length} ulasan
        </span>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="flex flex-col justify-between rounded-3xl bg-secondary/40 p-7 border border-border/40 transition-all hover:bg-secondary/60 hover:shadow-sm"
          >
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-foreground text-background font-bold text-xs">
                    {rev.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm text-foreground">{rev.name}</span>
                      <CheckCircle className="size-3.5 text-[var(--brand-green)]" />
                    </div>
                    <span className="text-xs text-muted-foreground">{rev.role}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{rev.date}</span>
              </div>

              {/* Stars & Product Tag */}
              <div className="flex items-center justify-between">
                <div className="flex text-accent text-sm">
                  {"★".repeat(rev.rating)}
                </div>
                <span className="rounded-full bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border border-border/50">
                  {rev.product}
                </span>
              </div>

              {/* Title & Content */}
              <div>
                <h4 className="font-heading text-base font-bold text-foreground leading-snug">
                  "{rev.title}"
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed mt-2">
                  {rev.content}
                </p>
              </div>
            </div>

            {/* Helpful Counter Button */}
            <div className="flex items-center justify-between pt-6 mt-4 border-t border-border/40 text-xs">
              <span className="text-muted-foreground">Pembeli Terverifikasi</span>
              <button
                onClick={() => handleLikeHelpful(rev.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 border transition-colors ${
                  helpfulLiked[rev.id]
                    ? "border-[var(--brand-green)] text-[var(--brand-green)] bg-[var(--brand-green)]/10"
                    : "border-border bg-background hover:bg-muted text-muted-foreground"
                }`}
              >
                <ThumbsUp className="size-3" />
                <span>Bermanfaat ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
