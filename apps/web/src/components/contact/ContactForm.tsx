"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "Umum",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      {/* Left Info Column */}
      <div className="w-full lg:w-[420px] shrink-0 flex flex-col gap-8 rounded-3xl bg-secondary/50 p-8 sm:p-10 border border-border/50">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">— Terhubung Dengan Kami —</span>
          <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Kami Selalu Senang Mendengar Cerita Anda
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Punya pertanyaan mengenai varian rasa, kebutuhan katering acara, atau saran untuk produk kami? Jangan ragu untuk menghubungi kami.
          </p>
        </div>

        {/* Contact Details List */}
        <div className="flex flex-col gap-5 text-sm">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
              <MapPin className="size-4" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Dapur & Toko Utama</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
              <Clock className="size-4" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Jam Operasional</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Senin – Minggu: 07.00 – 20.00 WIB (Pengiriman setiap hari)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
              <Mail className="size-4" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Email Layanan</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                halo@juiceworld.id · kerjasama@juiceworld.id
              </p>
            </div>
          </div>
        </div>

        {/* Social Media & WhatsApp CTA */}
        <div className="pt-6 border-t border-border/50 flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Media Sosial & WhatsApp</p>
            <p className="text-xs text-muted-foreground mt-0.5">Ikuti kami untuk update promo dan resep sehat:</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Instagram */}
            <a
              href="https://instagram.com/juiceworld.id"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-2xl bg-background/80 hover:bg-background p-3 border border-border/50 text-foreground transition-all hover:shadow-sm group"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-xs">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold leading-tight group-hover:text-accent transition-colors">Instagram</p>
                <p className="text-[10px] text-muted-foreground truncate">@juiceworld.id</p>
              </div>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@juiceworld.id"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-2xl bg-background/80 hover:bg-background p-3 border border-border/50 text-foreground transition-all hover:shadow-sm group"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-foreground text-background shadow-xs">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold leading-tight group-hover:text-accent transition-colors">TikTok</p>
                <p className="text-[10px] text-muted-foreground truncate">@juiceworld.id</p>
              </div>
            </a>
          </div>

          {/* WhatsApp Direct Chat Button */}
          <a
            href="https://wa.me/6281234567890?text=Halo%20Juice%20World,%20saya%20ingin%20konsultasi%20pesanan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#25D366] text-xs font-bold uppercase tracking-wider text-white hover:bg-[#20ba59] transition-all shadow-sm"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z"/>
            </svg>
            Chat WhatsApp (0812-3456-7890)
          </a>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="flex-1 w-full rounded-3xl bg-secondary/30 p-8 sm:p-10 border border-border/40">
        {sent ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-[var(--brand-green)]/15 text-[var(--brand-green)] mb-4">
              <CheckCircle2 className="size-8" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Pesan Anda Berhasil Terkirim!
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mt-2 mb-6">
              Terima kasih telah menghubungi Juice World. Tim customer care kami akan merespons pesan Anda dalam waktu 1x24 jam kerja.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setFormData({ name: "", email: "", phone: "", topic: "Umum", message: "" });
              }}
              className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-xs font-semibold uppercase tracking-widest text-background hover:bg-foreground/80 transition-all"
            >
              Kirim Pesan Lainnya
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h3 className="font-heading text-xl font-bold text-foreground mb-1">
              Kirim Pesan Langsung
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama Anda"
                  className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Nomor WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0812-xxxx-xxxx"
                  className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Alamat Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Topik Keperluan
              </label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              >
                <option value="Umum">Pertanyaan Umum Seputar Produk</option>
                <option value="Katering / Bulk Order">Pesanan Acara / Bulk Orders / Kantor</option>
                <option value="Langganan Mingguan">Paket Langganan Mingguan / Bulanan</option>
                <option value="Kendala Pesanan">Bantuan Status Pengiriman / Pesanan</option>
                <option value="Kerjasama Kebun">Kerjasama Petani Organik & Vendor</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Pesan Anda *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                className="w-full rounded-2xl border border-border bg-background p-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <button
              type="submit"
              className="flex h-12 w-full sm:w-auto self-start items-center justify-center gap-2 rounded-full bg-foreground px-8 text-xs font-semibold uppercase tracking-widest text-background hover:bg-foreground/85 active:scale-[0.99] transition-all shadow-md mt-2"
            >
              <Send className="size-4" />
              Kirim Pesan Sekarang
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
