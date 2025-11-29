import api from "@/lib/api";

export const getAdminDashboardList = async () => {
  const res = await api.get("/api/admin/dashboard");
  return res.data.data;
};