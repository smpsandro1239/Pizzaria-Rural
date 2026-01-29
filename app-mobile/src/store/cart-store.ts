import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  total: () => number;
  // Feedback
  toast: { visible: boolean; message: string; type: "success" | "error" };
  showToast: (message: string, type?: "success" | "error") => void;
  hideToast: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    });
    get().showToast(`${item.name} adicionada!`);
  },
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  toast: { visible: false, message: "", type: "success" },
  showToast: (message, type = "success") => set({ toast: { visible: true, message, type } }),
  hideToast: () => set((state) => ({ toast: { ...state.toast, visible: false } })),
}));
