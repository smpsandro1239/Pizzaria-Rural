import { api } from "./client";

export type Pizza = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tag?: string;
};

export const getPizzas = async (): Promise<Pizza[]> => {
  const response = await api.get("/pizzas");
  return response.data;
};
