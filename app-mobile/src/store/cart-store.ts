import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
<<<<<<< HEAD
import * as Haptics from "expo-haptics";
=======
>>>>>>> origin/main

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

<<<<<<< HEAD
export type Address = {
  id: string;
  label: string;
  street: string;
  city: string;
  zipCode: string;
  isDefault: boolean;
};

=======
>>>>>>> origin/main
type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  total: () => number;
  // Favoritos
  favorites: string[]; // IDs das pizzas favoritas
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
<<<<<<< HEAD
  // Moradas
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
=======
>>>>>>> origin/main
  // Feedback
  toast: { visible: boolean; message: string; type: "success" | "error" };
  showToast: (message: string, type?: "success" | "error") => void;
  hideToast: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      favorites: [],
<<<<<<< HEAD
      addresses: [],
=======
>>>>>>> origin/main
      toggleFavorite: (id) =>
        set((state) => {
          const isFav = state.favorites.includes(id);
          const newFavorites = isFav
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id];
<<<<<<< HEAD

          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
=======

>>>>>>> origin/main
          return { favorites: newFavorites };
        }),
      isFavorite: (id) => get().favorites.includes(id),
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
<<<<<<< HEAD
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        get().showToast(`${item.name} adicionada!`);
      },
      removeItem: (id) =>
        set((state) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          return {
            items: state.items.filter((i) => i.id !== id),
          };
        }),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      addAddress: (address) =>
        set((state) => ({
          addresses: [
            ...state.addresses,
            { ...address, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),
      removeAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),
      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),
=======
        get().showToast(`${item.name} adicionada!`);
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
>>>>>>> origin/main
      toast: { visible: false, message: "", type: "success" },
      showToast: (message, type = "success") => set({ toast: { visible: true, message, type } }),
      hideToast: () => set((state) => ({ toast: { ...state.toast, visible: false } })),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
<<<<<<< HEAD
      partialize: (state) => ({
        items: state.items,
        favorites: state.favorites,
        addresses: state.addresses,
      }), // Persistir itens, favoritos e moradas
=======
      partialize: (state) => ({ items: state.items, favorites: state.favorites }), // Persistir itens e favoritos
>>>>>>> origin/main
    }
  )
);
