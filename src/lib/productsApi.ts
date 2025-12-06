// src/lib/productApi.ts
import api from "@/lib/api";

export type ProductStatus = 1 | 2; // 1 = active, 2 = inactive

export interface Product {
  id: number;
  name: string;
  slug: string;
  status: ProductStatus;
  created_at?: string;
  updated_at?: string;
}

export interface SuggestProduct {
  id: number;
  name: string;
  slug: string;
  purchase_price: string;
  image: string;
  status: ProductStatus;
  created_at?: string;
  updated_at?: string;
}

/**
 * Laravel paginator meta shape (common fields).
 * Adjust if your backend uses different keys.
 */
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from?: number | null;
  to?: number | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta?: PaginationMeta;    // if your Laravel returns `meta` (depends on config)
  links?: Record<string, any>;
  // older Laravel paginator returns `current_page`, `last_page` on top-level; adjust if needed
}

/**
 * Fetch categories (supports search q and page).
 * Returns the full axios data (paginated). Caller may read res.data or res.data.data
 */

export const fetchProducts = async (
  q = "",
  page = 1,
  itemsPerPage = 10
): Promise<PaginatedResponse<Product>> => {
  const res = await api.get("/api/products", {
    params: { q, page, paginate: true, itemsPerPage },
  });

  const payload = res.data.data; // <-- this is the Laravel paginator result

  if (Array.isArray(payload.data)) {
    // If paginated
    return {
      data: payload.data,
      meta: {
        current_page: payload.current_page,
        last_page: payload.last_page,
        per_page: payload.per_page,
        total: payload.total,
        from: payload.from,
        to: payload.to,
      },
    };
  }

  // fallback for array (non-paginated)
  return { data: Array.isArray(payload) ? payload : [] };
};


export interface CreatePayload {
  name: String;
  status?: ProductStatus;
  category_id?: number;
  brand_id?: number;
  purchase_price: number;
  stock: number;
  description?: String;
  specification?: String;
}

// export const createProduct = async (payload: CreatePayload): Promise<Product> => {
//   const res = await api.post("/api/product-create", payload);
//   return res.data.data;
// };

export const createProduct = async (payload: FormData): Promise<Product> => {
  const res = await api.post("/api/product-create", payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data.data;
};


export const getProduct = async (id: number): Promise<Product> => {
  const res = await api.get(`/api/products/${id}`);
  return res.data.data;
};

export const getProductDetails = async (slug: string): Promise<Product> => {
  const res = await api.get(`/api/products-details/${slug}`);
  return res.data.data;
};

export const updateProduct = async (id: number, payload: FormData | object): Promise<Product> => {
  if (payload instanceof FormData) {
    // method spoof to ensure Laravel handles multipart properly
    payload.append("_method", "PUT");
    const res = await api.post(`/api/product-update/${id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  } else {
    const res = await api.put(`/api/product-update/${id}`, payload);
    return res.data.data;
  }
};

export const deleteProduct = async (id: number): Promise<{ message?: string }> => {
  const res = await api.delete(`/api/product/${id}`);
  return res.data;
};

export const toggleProductStatus = async (id: number): Promise<Product> => {
  const res = await api.delete(`/api/product/${id}/toggle-status`);
  return res.data.data; 
};

export const searchProducts = async (
  query: string,
  limit = 5
): Promise<SuggestProduct[]> => {
  if (!query.trim()) return [];

  const res = await api.get("/api/search-products", {
    params: {
      search: query.trim(),
      limit,
    },
  });
  return res.data?.data || [];
};
