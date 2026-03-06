// context/CartContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url?: string;
  qty: number;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Omit<Product, "qty">) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

// localStorage'dan güvenli okuma
function loadCart(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("cart");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    // Array değilse sıfırla
    if (!Array.isArray(parsed)) {
      localStorage.removeItem("cart");
      return [];
    }
    return parsed;
  } catch {
    localStorage.removeItem("cart");
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>(loadCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Omit<Product, "qty">) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
