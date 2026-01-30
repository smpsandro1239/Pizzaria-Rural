import { api } from "./client";

export type PizzaCategory = "Todas" | "Carne" | "Vegetariana" | "Clássica" | "Picante";

export type Pizza = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
  category: PizzaCategory;
};

const MOCK_PIZZAS: Pizza[] = [
  {
    id: "1",
    name: "Margherita Rural",
    description: "Massa fina, molho de tomate caseiro e mozzarella fresca.",
    price: 8.5,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=300&q=80",
    tag: "Clássica",
    category: "Clássica",
  },
  {
    id: "2",
    name: "Pepperoni da Serra",
    description: "Pepperoni crocante com um toque picante da nossa serra.",
    price: 9.5,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80",
    tag: "Popular",
    category: "Carne",
  },
  {
    id: "3",
    name: "Veggie da Horta",
    description: "Legumes frescos grelhados e manjericão fresco.",
    price: 9.0,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80",
    tag: "Vegetariana",
    category: "Vegetariana",
  },
  {
    id: "4",
    name: "Explosão Picante",
    description: "Chouriço regional, malagueta e mozzarella.",
    price: 10.5,
    image: "https://images.unsplash.com/photo-1593504049359-7b7d92c7185c?auto=format&fit=crop&w=300&q=80",
    tag: "Nova",
    category: "Picante",
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
