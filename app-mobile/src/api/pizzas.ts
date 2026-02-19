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
  sizePrices?: { id: string; sizeId: string; price: number; size: { name: string } }[];
  reviews?: { id: string; rating: number; comment: string; userName: string; createdAt: string }[];
};

export type Size = {
  id: string;
  name: string;
  multiplier: number;
};

export type Crust = {
  id: string;
  name: string;
  extraPrice: number;
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
  getSizes: async (): Promise<Size[]> => {
    const response = await api.get("/pizzas/sizes");
    return response.data;
  },
  getCrusts: async (): Promise<Crust[]> => {
    const response = await api.get("/pizzas/crusts");
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
