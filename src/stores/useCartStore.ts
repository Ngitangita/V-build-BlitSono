import { create } from "zustand";

export interface CartItem {
  id: number;
  name: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  totalCount: () => number;
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
    const updated = get()
      .items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
      )
      .filter((i) => i.quantity > 0);
    set({ items: updated });
  },
  totalCount: () =>
    get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
