import { atom, computed } from "nanostores";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

// ── Store ──────────────────────────────────────────────────
function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("juice-world-cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("juice-world-cart", JSON.stringify(items));
}

export const $cartItems = atom<CartItem[]>(loadCart());

export const $cartCount = computed($cartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const $cartTotal = computed($cartItems, (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// ── Actions ────────────────────────────────────────────────
export function addToCart(item: Omit<CartItem, "quantity">, qty = 1) {
  const current = $cartItems.get();
  const existing = current.find((i) => i.productId === item.productId);
  let next: CartItem[];
  if (existing) {
    next = current.map((i) =>
      i.productId === item.productId
        ? { ...i, quantity: i.quantity + qty }
        : i
    );
  } else {
    next = [...current, { ...item, quantity: qty }];
  }
  $cartItems.set(next);
  saveCart(next);
}

export function removeFromCart(productId: string) {
  const next = $cartItems.get().filter((i) => i.productId !== productId);
  $cartItems.set(next);
  saveCart(next);
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity < 1) {
    removeFromCart(productId);
    return;
  }
  const next = $cartItems
    .get()
    .map((i) => (i.productId === productId ? { ...i, quantity } : i));
  $cartItems.set(next);
  saveCart(next);
}

export function clearCart() {
  $cartItems.set([]);
  saveCart([]);
}
