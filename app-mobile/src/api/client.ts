import axios from "axios";

// URL de produção configurada pelo Agente 3 no Render
const API_URL = "https://pizzaria-rural-backend.onrender.com";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
