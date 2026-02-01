import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // sobe para 20 utilizadores
    { duration: '1m', target: 20 },  // mantém 20 utilizadores
    { duration: '30s', target: 0 },  // desce para 0
  ],
};

const BASE_URL = __ENV.API_URL || 'http://localhost:3000';

export default function () {
  // Testar listagem de pizzas
  const resPizzas = http.get(`${BASE_URL}/pizzas`);
  check(resPizzas, {
    'status pizzas é 200': (r) => r.status === 200,
    'retornou pizzas': (r) => r.json().length > 0,
  });

  // Testar health check
  const resHealth = http.get(`${BASE_URL}/health`);
  check(resHealth, {
    'status health é 200': (r) => r.status === 200,
  });

  sleep(1);
}
