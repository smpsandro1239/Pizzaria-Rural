import { api } from "./client";
import { CartItem } from "../store/cart-store";

export type OrderPayload = {
  name: string;
  phone: string;
  address: string;
  delivery: boolean;
  items: { pizzaId: string; quantity: number }[];
};

export const createOrder = async (payload: OrderPayload) => {
  const response = await api.post("/orders", payload);
  return response.data;
};

export const getOrderStatus = async (orderId: string) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};
