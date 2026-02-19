import { api } from "./client";

export type ReviewPayload = {
  pizzaId: string;
  rating: number;
  comment?: string;
  userName: string;
};

export const reviewsApi = {
  createReview: async (payload: ReviewPayload) => {
    const response = await api.post("/reviews", payload);
    return response.data;
  },
  getPizzaReviews: async (pizzaId: string) => {
    const response = await api.get(`/reviews/pizza/${pizzaId}`);
    return response.data;
  },
};
