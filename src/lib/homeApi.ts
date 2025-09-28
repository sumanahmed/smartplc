
import api from "@/lib/api";

export const fetchAllActiveCategories = async () => {
    const res = await api.get("/api/all-categories");
    console.log('AllActiveCategories', res.data)
    return res.data.data;
  };

export const fetchProductsByCategorySlug = async (slug: string) => {
    const res = await api.get(`/api/categories/${slug}/products`);
    console.log('fetchProductsByCategorySlug', res.data)
    return res.data.data;
};

export const fetchProductBySlug = async (slug: string) => {
    const res = await api.get(`/api/products/${slug}`);
    console.log('fetchProductBySlug', res.data)
    return res.data.data;
};
