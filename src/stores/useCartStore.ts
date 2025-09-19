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
  items: [],
  addToCart: (item) => {
    const existing = get().items.find((i) => i.id === item.id);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...get().items, { ...item, quantity: 1 }] });
    }
  },
  removeFromCart: (id) =>
    set({ items: get().items.filter((i) => i.id !== id) }),
  updateQuantity: (id, delta) => {
    const updated = get().items.map((i) => {
      if (i.id === id) {
        if (delta < 0 && i.quantity === 1) {
          return i; 
        }
        return { ...i, quantity: i.quantity + delta };
      }
      return i;
    });
    set({ items: updated });
  },
  totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  clear: () => set({ items: [] }),
}));
