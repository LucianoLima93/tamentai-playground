import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import type { Product } from '../types/product';

const STORAGE_KEY = 'tamentai-wishlist';

interface WishlistContextValue {
  items: Product[];
  toggleWishlist: (product: Product) => boolean; // returns true if added, false if removed
  isWishlisted: (productId: number) => boolean;
  clearWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function loadWishlistFromStorage(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

function saveWishlistToStorage(items: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // silently fail
  }
}

export function WishlistProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [items, setItems] = useState<Product[]>(loadWishlistFromStorage);

  useEffect(() => {
    saveWishlistToStorage(items);
  }, [items]);

  const toggleWishlist = useCallback((product: Product): boolean => {
    let added = false;
    setItems(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        added = false;
        return prev.filter(p => p.id !== product.id);
      }
      added = true;
      return [...prev, product];
    });
    return added;
  }, []);

  const isWishlisted = useCallback(
    (productId: number) => items.some(p => p.id === productId),
    [items]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.length;

  const value = useMemo<WishlistContextValue>(
    () => ({ items, toggleWishlist, isWishlisted, clearWishlist, totalItems }),
    [items, toggleWishlist, isWishlisted, clearWishlist, totalItems]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
