// src/lib/categoriesApi.ts
import api from "@/lib/api";

export type CategoryStatus = 1 | 2; // 1 = active, 2 = inactive

export interface Category {
  id: number;
  name: string;
  slug: string;
  status: CategoryStatus;
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
export const fetchCategories = async (
  q = "",
  page = 1
): Promise<PaginatedResponse<Category>> => {
  const res = await api.get("/api/categories", {
    params: { q, page },
  });

  // Laravel's paginator returns object with `data` and pagination fields
  // We normalize to PaginatedResponse<T>
  const payload = res.data as any;
  if (Array.isArray(payload)) {
    return { data: payload };
  }

  // Some apps wrap pagination under `data` already (Laravel default)
  if (payload.data && Array.isArray(payload.data)) {
    return payload as PaginatedResponse<Category>;
  }

  // Fallback
  return { data: [] };
};

export interface CreatePayload {
  name: string;
  slug?: string;
  status?: CategoryStatus;
}

export const createCategory = async (payload: CreatePayload): Promise<Category> => {
  const res = await api.post("/api/categories", payload);
  return res.data.data;
};

export const getCategory = async (id: number): Promise<Category> => {
  const res = await api.get(`/api/categories/${id}`);
  return res.data.data;
};

export const updateCategory = async (
  id: number,
  payload: CreatePayload
): Promise<Category> => {
  const res = await api.put(`/api/categories/${id}`, payload);
  return res.data.data;
};

export const deleteCategory = async (id: number): Promise<{ message?: string }> => {
  const res = await api.delete(`/api/categories/${id}`);
  return res.data;
};

export const toggleCategoryStatus = async (id: number): Promise<Category> => {
  const res = await api.delete(`/api/categories/${id}/toggle-status`);
  return res.data.data; 
};
