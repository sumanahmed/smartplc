
import api from "@/lib/api";

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
