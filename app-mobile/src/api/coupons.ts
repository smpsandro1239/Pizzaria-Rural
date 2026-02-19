import { api } from "./client";

export const validateCoupon = async (code: string, orderValue: number) => {
  const response = await api.post("/coupons/validate", { code, orderValue });
  return response.data;
};
