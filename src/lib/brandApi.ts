// src/lib/brandsApi.ts
import api from "@/lib/api";

export type BrandStatus = "active" | "inactive";

export interface Brand {
  id: number;
  name: string;
  slug: string;
  status: BrandStatus;
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
 * Fetch brands (supports search q and page).
 * Returns the full axios data (paginated). Caller may read res.data or res.data.data
 */
export const fetchbrands = async (
  q = "",
  page = 1
): Promise<PaginatedResponse<Brand>> => {
  const res = await api.get("/api/brands", {
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
    return payload as PaginatedResponse<Brand>;
  }

  // Fallback
  return { data: [] };
};

export interface CreatePayload {
  name: string;
  slug?: string;
  status?: BrandStatus;
}

export const createBrand = async (payload: CreatePayload): Promise<Brand> => {
  const res = await api.post("/api/brands", payload);
  return res.data as Brand;
};

export const getBrand = async (id: number): Promise<Brand> => {
  const res = await api.get(`/api/brands/${id}`);
  return res.data as Brand;
};

export const updateBrand = async (
  id: number,
  payload: CreatePayload
): Promise<Brand> => {
  const res = await api.put(`/api/brands/${id}`, payload);
  return res.data as Brand;
};

export const deleteBrand = async (id: number): Promise<{ message?: string }> => {
  const res = await api.delete(`/api/brands/${id}`);
  return res.data;
};
