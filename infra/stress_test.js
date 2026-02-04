import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 }, // subir para 20 utilizadores
    { duration: '1m', target: 20 },  // manter 20 utilizadores
    { duration: '30s', target: 0 },  // descer para 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% dos pedidos devem ser < 500ms
  },
};

export default function () {
  const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000/api';

  // Testar endpoint de pizzas
  let res = http.get(`${BASE_URL}/pizzas`);
  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo de resposta < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
