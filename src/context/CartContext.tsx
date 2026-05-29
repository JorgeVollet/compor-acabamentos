'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { CartItem, Produto } from '@/types';

const STORAGE_KEY = 'compor_cart';

interface CartContextValue {
  items: CartItem[];
  addItem: (produto: Produto) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getTotalPrice: () => string;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((produto: Produto) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.produto.id === produto.id);
      if (existing) return prev.map((i) => i.produto.id === produto.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { produto, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.produto.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => i.produto.id === id ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getTotalCount = useCallback(() => items.reduce((acc, i) => acc + i.qty, 0), [items]);

  const getTotalPrice = useCallback(() => {
    const total = items.reduce((acc, item) => {
      const priceMatch = item.produto.preco.match(/[\d.,]+/);
      if (!priceMatch) return acc;
      const val = parseFloat(priceMatch[0].replace('.', '').replace(',', '.'));
      return acc + val * item.qty;
    }, 0);
    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }, [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, getTotalCount, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used inside CartProvider');
  return ctx;
}
