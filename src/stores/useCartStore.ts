import { create } from "zustand";
import type { CartItem } from "../types/cart";

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  totalCount: () => number;
  clear: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: JSON.parse(localStorage.getItem("cart") || "[]"),

  addToCart: (item) => {
    const existing = get().items.find((i) => i.id === item.id);
    const newItems = existing
      ? get().items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      : [...get().items, { ...item, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(newItems));
    set({ items: newItems });
  },

  removeFromCart: (id) => {
    const newItems = get().items.filter((i) => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(newItems));
    set({ items: newItems });
  },

  updateQuantity: (id, delta) => {
    const newItems = get().items
      .map((i) => {
        if (i.id === id) {
          const newQty = i.quantity + delta;
          return { ...i, quantity: newQty > 0 ? newQty : 0 };
        }
        return i;
      })
      .filter((i) => i.quantity > 0);

    localStorage.setItem("cart", JSON.stringify(newItems));
    set({ items: newItems });
  },

  totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  clear: () => {
    localStorage.removeItem("cart");
    set({ items: [] });
  },
}));
