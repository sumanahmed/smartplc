
import api from "@/lib/api";

/**
 * Laravel paginator meta shape (common fields).
 * Adjust if your backend uses different keys.
 */


export interface Product {
  id: number;
  name: string;
  purchase_price: number;
  description: string;
  originalPrice?: number;
  image: string;
  category: { id: number; name: string };
  brand?: { id: number; name: string };
  stock: boolean;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  products_count?: number;
}

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

export const fetchAllActiveCategories = async () => {
    const res = await api.get("/api/all-categories");
    return res.data.data;
  };

export const fetchProductsByCategorySlug = async (slug: string) => {
    const res = await api.get(`/api/categories/${slug}/products`);
    return res.data.data;
};

export const fetchProductBySlug = async (slug: string) => {
    const res = await api.get(`/api/products/${slug}`);
    return res.data.data;
};

// export const fetchAvailableCategories = async () => {
//     const res = await api.get("/api/product-wise-categories");
//     return res.data.data;
// };
  
export const fetchAvailableCategories = async (): Promise<Category[]> => {
    const res = await api.get("/api/product-wise-categories");
   return res.data.data as Category[];
};

export const fetchFilterCategoryProducts = async (
  slug: string,
  params: Record<string, any> = {}
): Promise<PaginatedResponse<Product>> => {
  const res = await api.get(`/api/categories/${slug}/products-filter`, { params });
  return res.data.data;
};

export const fetchCategoryBrands = async (slug: string): Promise<Brand[]> => {
  const res = await api.get(`/api/categories/${slug}/brands`);
  return res.data.data;
};
