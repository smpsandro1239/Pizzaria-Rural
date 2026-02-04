import { test, expect } from '@playwright/test';

test.describe('Regressão Visual - Pizzaria Rural', () => {

  test('Snapshot da Home Page (Mobile Simulation)', async ({ page }) => {
    // Simulando dispositivo móvel
    await page.setViewportSize({ width: 375, height: 812 });

    // Assumindo que a app web exportada está a correr em localhost:3000
    await page.goto('/');

    // Aguardar carregamento dos componentes críticos
    await page.waitForLoadState('networkidle');

    // Captura e comparação de snapshot
    // Nota: A primeira execução cria o snapshot base
    await expect(page).toHaveScreenshot('home-screen-mobile.png', {
      maxDiffPixelRatio: 0.1,
    });
  });

  test('Snapshot do Menu de Pizzas', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/menu'); // Caminho assumido do export web

    await page.waitForSelector('text=Pizzas');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('menu-screen-mobile.png', {
      threshold: 0.2,
    });
  });

  test('Snapshot do Configurador de Pizza (Novo Visual)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/detalhe/1'); // Exemplo de ID

    // Aguardar renderização das opções de massa e ingredientes
    await page.waitForSelector('text=Escolha a sua Massa');

    await expect(page).toHaveScreenshot('pizza-detail-configurator.png');
  });
});
