import { api } from "./client";

export type PizzaCategory = "Todas" | "Carne" | "Vegetariana" | "Clássica" | "Picante";

export type PizzaSize = {
  id: string;
  name: string;
  multiplier: number;
};

export type CrustType = {
  id: string;
  name: string;
  price: number;
};

export type ExtraIngredient = {
  id: string;
  name: string;
  price: number;
};

export type Pizza = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  tag: string;
  category: PizzaCategory;
  rating: number;
  reviewsCount: number;
  sizes: PizzaSize[];
  crusts: CrustType[];
};

const DEFAULT_SIZES: PizzaSize[] = [
  { id: 'p', name: 'Pequena', multiplier: 0.8 },
  { id: 'm', name: 'Média', multiplier: 1.0 },
  { id: 'f', name: 'Familiar', multiplier: 1.4 },
];

const DEFAULT_CRUSTS: CrustType[] = [
  { id: 'c1', name: 'Fina', price: 0 },
  { id: 'c2', name: 'Clássica', price: 0 },
  { id: 'c3', name: 'Recheada com Queijo', price: 2.5 },
];

export const MOCK_EXTRAS: ExtraIngredient[] = [
  { id: 'e1', name: 'Queijo Extra', price: 1.5 },
  { id: 'e2', name: 'Bacon', price: 1.2 },
  { id: 'e3', name: 'Azeitonas', price: 0.8 },
  { id: 'e4', name: 'Cogumelos', price: 1.0 },
  { id: 'e5', name: 'Ananás', price: 1.0 },
];

const MOCK_PIZZAS: Pizza[] = [
  {
    id: "1",
    name: "Margherita Rural",
    description: "Massa fina, molho de tomate caseiro e mozzarella fresca.",
    basePrice: 8.5,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=300&q=80",
    tag: "Clássica",
    category: "Clássica",
    rating: 4.8,
    reviewsCount: 124,
    sizes: DEFAULT_SIZES,
    crusts: DEFAULT_CRUSTS,
  },
  {
    id: "2",
    name: "Pepperoni da Serra",
    description: "Pepperoni crocante com um toque picante da nossa serra.",
    basePrice: 9.5,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80",
    tag: "Popular",
    category: "Carne",
    rating: 4.9,
    reviewsCount: 89,
    sizes: DEFAULT_SIZES,
    crusts: DEFAULT_CRUSTS,
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
  },
  getExtras: async (): Promise<ExtraIngredient[]> => {
    return MOCK_EXTRAS;
  }
};
