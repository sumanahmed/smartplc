import axios from "axios";

//const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE, 
  withCredentials: true,
});

// const res = await api.get("/api/csrf-token");
  // const csrftoken = res.data.csrf_token;
  // api.defaults.headers.common["X-CSRF-TOKEN"] = csrftoken;
  api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;