import { useState, useEffect, useCallback } from 'react';
import type { Product, ProductsResponse, Category } from '../types/product';

const BASE_URL = 'https://dummyjson.com';

export interface FetchProductsParams {
  limit?: number;
  skip?: number;
  category?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

async function fetchProducts(params: FetchProductsParams = {}): Promise<ProductsResponse> {
  const { limit = 12, skip = 0, category, sortBy, order } = params;

  let url: string;

  if (category) {
    url = `${BASE_URL}/products/category/${encodeURIComponent(category)}`;
  } else {
    url = `${BASE_URL}/products`;
  }

  const searchParams = new URLSearchParams();
  searchParams.set('limit', String(limit));
  searchParams.set('skip', String(skip));
  if (sortBy) searchParams.set('sortBy', sortBy);
  if (order) searchParams.set('order', order);

  const response = await fetch(`${url}?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  return response.json();
}

async function fetchProduct(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${id}: ${response.status}`);
  }
  return response.json();
}

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }
  return response.json();
}

async function searchProducts(query: string, limit = 12, skip = 0, sortBy?: string, order?: 'asc' | 'desc'): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();
  searchParams.set('q', query);
  searchParams.set('limit', String(limit));
  searchParams.set('skip', String(skip));
  if (sortBy) searchParams.set('sortBy', sortBy);
  if (order) searchParams.set('order', order);

  const response = await fetch(`${BASE_URL}/products/search?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to search products: ${response.status}`);
  }
  return response.json();
}

export type ProductUpdate = Partial<Pick<Product, 'title' | 'price' | 'stock' | 'brand'>>;

async function updateProduct(id: number, changes: ProductUpdate): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  });
  if (!response.ok) {
    throw new Error(`Failed to update product ${id}: ${response.status}`);
  }
  return response.json();
}

async function deleteProduct(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error(`Failed to delete product ${id}: ${response.status}`);
  }
  return response.json();
}

// --- React Hooks ---

interface UseProductsOptions extends FetchProductsParams {
  enabled?: boolean;
}

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useProducts(options: UseProductsOptions = {}) {
  const { limit = 12, skip = 0, category, sortBy, order, enabled = true } = options;
  const [state, setState] = useState<AsyncState<ProductsResponse>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!enabled) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let cancelled = false;
    setState(prev => ({ ...prev, loading: true, error: null }));

    fetchProducts({ limit, skip, category, sortBy, order })
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(err => {
        if (!cancelled) setState({ data: null, loading: false, error: (err as Error).message });
      });

    return () => { cancelled = true; };
  }, [limit, skip, category, sortBy, order, enabled]);

  return state;
}

export function useProduct(id: number | null) {
  const [state, setState] = useState<AsyncState<Product>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (id === null) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let cancelled = false;
    setState(prev => ({ ...prev, loading: true, error: null }));

    fetchProduct(id)
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(err => {
        if (!cancelled) setState({ data: null, loading: false, error: (err as Error).message });
      });

    return () => { cancelled = true; };
  }, [id]);

  return state;
}

export function useCategories() {
  const [state, setState] = useState<AsyncState<Category[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetchCategories()
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(err => {
        if (!cancelled) setState({ data: null, loading: false, error: (err as Error).message });
      });

    return () => { cancelled = true; };
  }, []);

  return state;
}

export function useProductSearch() {
  const [state, setState] = useState<AsyncState<ProductsResponse>>({
    data: null,
    loading: false,
    error: null,
  });

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await searchProducts(query);
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: (err as Error).message });
    }
  }, []);

  const clear = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, search, clear };
}

// Export raw fetch functions for use outside of React components
export { fetchProducts, fetchProduct, fetchCategories, searchProducts, updateProduct, deleteProduct };
