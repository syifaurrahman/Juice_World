"use client";

import { useState } from "react";
import { useStore } from "@nanostores/react";
import { CheckCircle2, Truck, CreditCard, QrCode, ShieldCheck, ArrowRight, ShoppingBag } from "lucide-react";
import { $cartItems, $cartTotal, clearCart } from "../../lib/cart";

function formatPrice(val: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(val);
}

export default function CheckoutForm() {
  const items = useStore($cartItems);
  const total = useStore($cartTotal);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Jakarta Selatan",
    notes: "",
  });

  const [shippingMethod, setShippingMethod] = useState<"instant" | "sameday" | "nextday">("instant");
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "va" | "cod">("qris");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shippingCost = {
    instant: 25000,
    sameday: 15000,
    nextday: 20000,
  }[shippingMethod];

  const grandTotal = total + shippingCost;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newOrderId = "JW-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setIsSubmitted(true);
    clearCart();
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[36px] bg-secondary/50 py-16 px-6 sm:px-12 text-center max-w-2xl mx-auto border border-border/50">
        <div className="flex size-20 items-center justify-center rounded-full bg-[var(--brand-green)]/15 text-[var(--brand-green)] mb-6">
          <CheckCircle2 className="size-10" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-green)]">
          Pesanan Berhasil Dibuat!
        </span>
        <h2 className="font-heading text-3xl font-bold text-foreground mt-2">
          Terima Kasih, {formData.name || "Pelanggan Setia"}!
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          Pesanan jus segar Anda sedang disiapkan dan akan segera dikirim menggunakan armada pendingin kami.
        </p>

        {/* Receipt Box */}
        <div className="w-full my-8 rounded-2xl bg-background p-6 text-left border border-border/60 flex flex-col gap-3">
          <div className="flex justify-between text-xs text-muted-foreground pb-2 border-b border-border/50">
            <span>Nomor Pesanan:</span>
            <span className="font-mono font-bold text-foreground">{orderId}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Metode Pengiriman:</span>
            <span className="font-semibold text-foreground capitalize">{shippingMethod} Delivery</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Alamat Tujuan:</span>
            <span className="text-foreground text-right max-w-xs truncate">{formData.address || "Jakarta"}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-foreground pt-2 border-t border-border/50">
            <span>Total Pembayaran:</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/"
            className="inline-flex h-12 items-center rounded-full bg-foreground px-8 text-xs font-semibold uppercase tracking-widest text-background hover:bg-foreground/80 transition-all shadow-sm"
          >
            Kembali ke Beranda
          </a>
          <a
            href="/products"
            className="inline-flex h-12 items-center rounded-full border border-border bg-background px-6 text-xs font-semibold uppercase tracking-widest text-foreground hover:bg-secondary transition-all"
          >
            Pesan Varian Lain
          </a>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-secondary/40 py-20 px-6 text-center border border-border/40 max-w-lg mx-auto">
        <div className="flex size-16 items-center justify-center rounded-full bg-secondary text-3xl mb-4">
          🛒
        </div>
        <h2 className="font-heading text-xl font-bold text-foreground">
          Keranjang Anda Masih Kosong
        </h2>
        <p className="text-xs text-muted-foreground mt-1 mb-6">
          Tambahkan setidaknya satu botol jus sebelum melakukan checkout.
        </p>
        <a
          href="/products"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-7 text-xs font-semibold uppercase tracking-widest text-background hover:bg-foreground/80 transition-all"
        >
          <ShoppingBag className="size-4" />
          Lihat Katalog Jus
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10 items-start">
      {/* Form Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-8">
        {/* Section 1: Data Penerima */}
        <div className="flex flex-col gap-4 rounded-3xl bg-secondary/40 p-6 sm:p-8 border border-border/50">
          <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-background text-xs">1</span>
            Data Penerima
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Nama Lengkap *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Rian Pratama"
                className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Nomor WhatsApp *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0812-xxxx-xxxx"
                className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-foreground mb-1 block">Email (untuk bukti transaksi)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Alamat Pengiriman */}
        <div className="flex flex-col gap-4 rounded-3xl bg-secondary/40 p-6 sm:p-8 border border-border/50">
          <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-background text-xs">2</span>
            Alamat Pengiriman
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Alamat Lengkap & Nomor Rumah *</label>
              <textarea
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Jalan, RT/RW, Nomor Rumah, Kelurahan, Kecamatan..."
                className="w-full rounded-2xl border border-border bg-background p-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Kota / Wilayah *</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                >
                  <option value="Jakarta Selatan">Jakarta Selatan</option>
                  <option value="Jakarta Pusat">Jakarta Pusat</option>
                  <option value="Jakarta Barat">Jakarta Barat</option>
                  <option value="Jakarta Timur">Jakarta Timur</option>
                  <option value="Jakarta Utara">Jakarta Utara</option>
                  <option value="Tangerang Selatan">Tangerang Selatan</option>
                  <option value="Depok">Depok</option>
                  <option value="Bekasi">Bekasi</option>
                  <option value="Bogor">Bogor</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Catatan untuk Kurir</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Contoh: Titipkan di satpam cluster"
                  className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Pilihan Pengiriman */}
        <div className="flex flex-col gap-4 rounded-3xl bg-secondary/40 p-6 sm:p-8 border border-border/50">
          <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-background text-xs">3</span>
            Metode Pengiriman (Cold-Chain)
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              {
                id: "instant",
                title: "Instant Delivery (1–2 Jam)",
                desc: "Sangat direkomendasikan agar jus tetap dingin optimal dari dapur kami.",
                price: 25000,
                badge: "Disarankan",
              },
              {
                id: "sameday",
                title: "Same Day Delivery (4–6 Jam)",
                desc: "Tiba di hari yang sama sebelum jam 17:00.",
                price: 15000,
              },
              {
                id: "nextday",
                title: "Next Day Cold-Box",
                desc: "Dikemas dengan ice gel khusus tahan hingga 24 jam.",
                price: 20000,
              },
            ].map((option) => (
              <label
                key={option.id}
                className={`flex items-start justify-between gap-4 rounded-2xl border p-4 cursor-pointer transition-all ${
                  shippingMethod === option.id
                    ? "border-foreground bg-background shadow-sm"
                    : "border-border/60 bg-background/50 hover:bg-background"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === option.id}
                    onChange={() => setShippingMethod(option.id as any)}
                    className="mt-1 accent-foreground"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">{option.title}</span>
                      {option.badge && (
                        <span className="rounded-full bg-[var(--brand-green)]/15 text-[var(--brand-green)] px-2 py-0.5 text-[10px] font-bold uppercase">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{option.desc}</p>
                  </div>
                </div>
                <span className="font-bold text-sm text-foreground shrink-0">
                  {formatPrice(option.price)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Section 4: Metode Pembayaran */}
        <div className="flex flex-col gap-4 rounded-3xl bg-secondary/40 p-6 sm:p-8 border border-border/50">
          <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-background text-xs">4</span>
            Metode Pembayaran
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "qris", label: "QRIS Instant", icon: QrCode },
              { id: "va", label: "Virtual Account", icon: CreditCard },
              { id: "cod", label: "Bayar di Tempat", icon: Truck },
            ].map(({ id, label, icon: Icon }) => (
              <button
                type="button"
                key={id}
                onClick={() => setPaymentMethod(id as any)}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition-all ${
                  paymentMethod === id
                    ? "border-foreground bg-background shadow-sm font-bold text-foreground"
                    : "border-border/60 bg-background/50 hover:bg-background text-muted-foreground"
                }`}
              >
                <Icon className="size-5" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6 rounded-3xl bg-secondary/50 p-6 sm:p-8 border border-border/50 sticky top-24">
        <h3 className="font-heading text-xl font-bold text-foreground">
          Ringkasan Belanja
        </h3>

        {/* Items List */}
        <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3 py-2 border-b border-border/40">
              <img
                src={item.image}
                alt={item.name}
                className="size-12 shrink-0 rounded-xl object-cover bg-background"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-xs text-foreground truncate">{item.name}</p>
                <p className="text-[11px] text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <span className="font-semibold text-xs text-foreground">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Cost breakdown */}
        <div className="flex flex-col gap-2.5 text-xs text-muted-foreground pt-2">
          <div className="flex justify-between">
            <span>Subtotal ({items.length} item)</span>
            <span className="font-medium text-foreground">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between">
            <span>Biaya Pengiriman</span>
            <span className="font-medium text-foreground">{formatPrice(shippingCost)}</span>
          </div>
          <div className="flex justify-between text-[var(--brand-green)]">
            <span>Ice Gel & Insulated Pack</span>
            <span className="font-medium">Gratis</span>
          </div>
        </div>

        {/* Grand Total */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <span className="font-heading text-base font-bold text-foreground">Total Bayar</span>
          <span className="font-heading text-2xl font-bold text-foreground">
            {formatPrice(grandTotal)}
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-foreground text-xs font-semibold uppercase tracking-widest text-background hover:bg-foreground/85 active:scale-[0.99] transition-all shadow-md"
        >
          Konfirmasi & Bayar Sekarang
          <ArrowRight className="size-4" />
        </button>

        <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
          <ShieldCheck className="size-3.5 text-[var(--brand-green)]" />
          <span>Garansi 100% segar sampai tujuan</span>
        </div>
      </div>
    </form>
  );
}
