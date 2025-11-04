import api from "@/lib/api"; // 👈 same as your category API import

export interface CheckoutItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  method: "cod" | "bkash" | "nagad" | "card";
  tx_id?: string;
  card?: {
    card_number?: string;
    expiry?: string;
    cvv?: string;
    name?: string;
  };
}

export interface CheckoutPayload {
  customer_id: number | null;
  shipping: ShippingInfo;
  payment: PaymentInfo;
  items: CheckoutItem[];
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
}

// ✅ same Axios-style pattern
export const createOrder = async (payload: CheckoutPayload) => {
  const res = await api.post("/api/checkout", payload);
  return res.data.data;
};
