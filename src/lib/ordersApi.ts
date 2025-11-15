import api from "@/lib/api";

export const getCustomerOrders = async () => {
  const res = await api.get("/api/customer/orders");
  return res.data.data;
};

export const getOrderDetails = async (id: number) => {
  const res = await api.get(`/api/customer/orders/${id}`);
  return res.data.data;
};