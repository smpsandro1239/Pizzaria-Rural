import { api } from "./client";

export type Pizza = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
};

const MOCK_PIZZAS: Pizza[] = [
  {
    id: "1",
    name: "Margherita Rural",
    description: "Massa fina, molho de tomate caseiro e mozzarella fresca.",
    price: 8.5,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=300&q=80",
    tag: "Clássica",
  },
  {
    id: "2",
    name: "Pepperoni da Serra",
    description: "Pepperoni crocante com um toque picante da nossa serra.",
    price: 9.5,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80",
    tag: "Popular",
  },
  {
    id: "3",
    name: "Veggie da Horta",
    description: "Legumes frescos grelhados e manjericão fresco.",
    price: 9.0,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80",
    tag: "Vegetariana",
  },
];

export const pizzasApi = {
  getPizzas: async (): Promise<Pizza[]> => {
    try {
      const response = await api.get("/pizzas");
      return response.data;
    } catch (err) {
      console.warn("API falhou, usando dados mock.");
      return MOCK_PIZZAS;
    }
  }
};
