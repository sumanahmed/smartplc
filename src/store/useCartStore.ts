import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
   quantity: number;
   stock: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // ✅ Add to cart logic
    //   addToCart: (item) => {
    //     const existing = get().items.find((i) => i.id === item.id);
    //     if (existing) {
    //       set({
    //         items: get().items.map((i) =>
    //           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    //         ),
    //       });
    //     } else {
    //       set({ items: [...get().items, { ...item, quantity: 1 }] });
    //     }
          //   },
    addToCart: (item) => {
        const existing = get().items.find((i) => i.id === item.id);

        if (existing) {
            // ✅ If already in cart, only increase if stock allows
            if (existing.quantity < existing.stock) {
            set({
                items: get().items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
            });
            } else {
            // Optional: alert user or handle UI message
            console.warn("Maximum stock limit reached");
            }
        } else {
            // ✅ If not in cart, add new with quantity 1
            set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
      },

      // ✅ Remove item from cart
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
    // ✅ Update quantity of a specific item
    updateQuantity: (id, quantity) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;

        // ✅ Prevent below 1 or above stock
        if (quantity < 1) quantity = 1;
        if (quantity > item.stock) quantity = item.stock;

        set({
            items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
            ),
        });
     },

      // ✅ Clear entire cart
      clearCart: () => set({ items: [] }),

      // ✅ Calculate subtotal
      getSubtotal: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage", // stored in localStorage
    }
  )
);
