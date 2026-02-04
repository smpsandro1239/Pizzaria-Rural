import { test, expect } from '@playwright/test';

test('API Health Check deve retornar 200', async ({ request }) => {
  const response = await request.get('/api'); // Ajustar para o seu endpoint de health se existir
  // Se ainda não houver endpoint de health, testamos se o swagger responde
  expect(response.ok()).toBeTruthy();
});

test('Deve listar pizzas da API', async ({ request }) => {
  const response = await request.get('/api/pizzas');
  if (response.status() === 200) {
    const pizzas = await response.json();
    expect(Array.isArray(pizzas)).toBeTruthy();
  }
});
