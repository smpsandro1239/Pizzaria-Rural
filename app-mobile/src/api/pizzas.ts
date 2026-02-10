import { api } from "./client";

export type Pizza = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  image?: string;
  featured: boolean;
  categoryId?: string;
};

export const pizzasApi = {
  getPizzas: async (): Promise<Pizza[]> => {
    const response = await api.get("/pizzas");
    return response.data;
  },
  getPizza: async (id: string): Promise<Pizza> => {
    const response = await api.get(`/pizzas/${id}`);
    return response.data;
  },
  createPizza: async (data: Partial<Pizza>): Promise<Pizza> => {
    const response = await api.post("/pizzas", data);
    return response.data;
  },
  updatePizza: async (id: string, data: Partial<Pizza>): Promise<Pizza> => {
    const response = await api.patch(`/pizzas/${id}`, data);
    return response.data;
  },
  deletePizza: async (id: string): Promise<void> => {
    await api.delete(`/pizzas/${id}`);
  },
};
