// src/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Product = {
  id: string;
  title: string;
  description: string;
  image: any;
  price: number;
  installment: {
    quantity: number;
    value: number;
  };
};

export type CartItem = Product & {
  quantity: number;
};

type CartContextData = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product, removeAll?: boolean) => void;
};

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product: Product, removeAll = false) => {
    setCartItems(prev => {
      if (removeAll) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return prev.map(item =>
          item.id === product.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0);
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
