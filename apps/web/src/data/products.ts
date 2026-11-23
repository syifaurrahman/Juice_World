export type ProductCategory =
  | "cold-pressed"
  | "smoothie"
  | "detox"
  | "immunity"
  | "energy"
  | "tropical";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: ProductCategory;
  tags: string[];
  image: string;
  badge?: string;
  ingredients: string[];
  volume: string;
  inStock: boolean;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "orange-blast",
    name: "Orange Blast",
    tagline: "Segar dari Alam, Murni dari Buah",
    description:
      "Cold-pressed jeruk segar pilihan yang diekstrak langsung tanpa dipanaskan untuk mempertahankan vitamin C dan enzim alami. Rasa manis segar yang memanjakan tenggorokan.",
    price: 42000,
    category: "cold-pressed",
    tags: ["vitamin-c", "segar", "tanpa-gula"],
    image: "/images/orange-blast.webp",
    badge: "Best Seller",
    ingredients: ["Jeruk Valencia", "Jeruk Navel"],
    volume: "350ml",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    slug: "green-detox",
    name: "Green Detox",
    tagline: "Bersihkan Tubuh, Segarkan Jiwa",
    description:
      "Kombinasi sempurna sayuran hijau segar — bayam, kale, mentimun, dan jahe — untuk membersihkan racun dan meningkatkan energi harianmu.",
    price: 48000,
    category: "detox",
    tags: ["detox", "vegan", "sayuran-hijau"],
    image: "/images/green-detox.jpg",
    badge: "Popular",
    ingredients: ["Bayam", "Kale", "Mentimun", "Jahe", "Lemon"],
    volume: "350ml",
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    slug: "berry-bliss",
    name: "Berry Bliss",
    tagline: "Antioksidan Tinggi, Rasa Luar Biasa",
    description:
      "Perpaduan buah beri pilihan — stroberi, blueberry, dan raspberry — kaya antioksidan yang membantu menjaga kesehatan kulit dan meningkatkan imunitas.",
    price: 52000,
    category: "smoothie",
    tags: ["antioksidan", "smoothie", "buah-beri"],
    image: "/images/berry-bliss.jpg",
    ingredients: ["Stroberi", "Blueberry", "Raspberry", "Pisang", "Susu Almond"],
    volume: "400ml",
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    slug: "mango-sunrise",
    name: "Mango Sunrise",
    tagline: "Tropis dan Manis Setiap Tegukan",
    description:
      "Jus mangga Harum Manis asli Indonesia yang dipadukan dengan wortel dan sedikit kunyit. Kaya beta-karoten untuk kesehatan mata dan kulit bercahaya.",
    price: 45000,
    category: "tropical",
    tags: ["tropis", "mangga", "beta-karoten"],
    image: "/images/mango-sunrise.jpg",
    badge: "Baru",
    ingredients: ["Mangga Harum Manis", "Wortel", "Kunyit", "Lemon"],
    volume: "350ml",
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    slug: "watermelon-chill",
    name: "Watermelon Chill",
    tagline: "Hidrasi Sempurna di Setiap Tegukan",
    description:
      "Semangka segar yang diekstrak dengan teknik cold-press untuk menghasilkan minuman yang menghidrasi dan menyegarkan. Sempurna untuk hari-hari terik.",
    price: 38000,
    category: "cold-pressed",
    tags: ["hidrasi", "segar", "rendah-kalori"],
    image: "/images/watermelon-chill.jpg",
    ingredients: ["Semangka", "Lemon", "Daun Mint"],
    volume: "400ml",
    inStock: true,
    featured: false,
  },
  {
    id: "6",
    slug: "carrot-glow",
    name: "Carrot Glow",
    tagline: "Rahasia Kulit Cerah Bercahaya",
    description:
      "Wortel segar dipadu jahe dan lemon untuk minuman yang kaya beta-karoten dan vitamin C. Mendukung kesehatan kulit dan sistem imun dari dalam.",
    price: 40000,
    category: "immunity",
    tags: ["kulit-cerah", "vitamin-c", "jahe"],
    image: "/images/carrot-glow.jpg",
    ingredients: ["Wortel", "Jahe", "Lemon", "Jeruk"],
    volume: "350ml",
    inStock: true,
    featured: false,
  },
  {
    id: "7",
    slug: "tropical-paradise",
    name: "Tropical Paradise",
    tagline: "Bawa Liburan ke Setiap Harimu",
    description:
      "Nanas dan kelapa muda berpadu sempurna menghadirkan cita rasa tropis yang autentik. Kaya mangan dan serat untuk mendukung pencernaan sehat.",
    price: 50000,
    category: "tropical",
    tags: ["tropis", "nanas", "kelapa", "serat"],
    image: "/images/tropical-paradise.jpg",
    ingredients: ["Nanas", "Air Kelapa Muda", "Jeruk Nipis"],
    volume: "400ml",
    inStock: true,
    featured: false,
  },
  {
    id: "8",
    slug: "immunity-shield",
    name: "Immunity Shield",
    tagline: "Benteng Alami untuk Tubuhmu",
    description:
      "Formula khusus kunyit, jahe, lemon, dan merica hitam yang bekerja sinergis meningkatkan imunitas. Shot sehat yang melindungimu dari dalam.",
    price: 55000,
    category: "immunity",
    tags: ["imunitas", "kunyit", "antiinflamasi"],
    image: "/images/immunity-shield.jpg",
    badge: "Premium",
    ingredients: ["Kunyit", "Jahe", "Lemon", "Merica Hitam", "Madu"],
    volume: "250ml",
    inStock: true,
    featured: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const categories: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "cold-pressed", label: "Cold Pressed" },
  { value: "smoothie", label: "Smoothie" },
  { value: "detox", label: "Detox" },
  { value: "immunity", label: "Imunitas" },
  { value: "tropical", label: "Tropis" },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}
