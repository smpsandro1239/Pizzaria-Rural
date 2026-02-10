import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  email: string;
  name: string;
  role: "CLIENTE" | "ADMIN";
  points: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null, token: string | null) => void;
  logout: () => void;
  loadSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (user, token) => {
    if (token) {
      AsyncStorage.setItem("token", token);
      AsyncStorage.setItem("user", JSON.stringify(user));
    } else {
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
    }
    set({ user, token, isAuthenticated: !!token });
  },
  logout: () => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("user");
    set({ user: null, token: null, isAuthenticated: false });
  },
  loadSession: async () => {
    const token = await AsyncStorage.getItem("token");
    const userStr = await AsyncStorage.getItem("user");
    if (token && userStr) {
      set({ token, user: JSON.parse(userStr), isAuthenticated: true });
    }
  },
}));
