# 📌 TODOLIST — Agente 1 (Frontend App Mobile)

## Estado Atual: 66% Concluído (Fase de Redesign Telepizza)

## 1. Setup inicial (100%)
- [x] Criar projeto Expo em PT‑PT
- [x] Configurar Reanimated + Moti

## 2. Design System & Redesign (Telepizza Style) (40%)
- [x] Implementar tokens
- [ ] **URGENTE:** Adotar paleta Telepizza (Vermelho #E21E26, Branco).
- [ ] **NOVO:** Criar ecrã de "Configurador de Pizza" (Step-by-step).
    - Passo 1: Escolha do Tamanho (usar GET /options - sizes).
    - Passo 2: Escolha da Massa (usar GET /options - crusts).
    - Passo 3: Adicionar/Remover Ingredientes (usar GET /options - ingredients).
- [ ] **NOVO:** UI de Banners rotativos na Home.

## 3. Navegação & Layout (80%)
- [x] Stack Navigator & Bottom Tabs
- [ ] Implementar Categorias horizontais (usar GET /categories).

## 4. Ecrãs (PT-PT) (85%)
- [x] Home, Menu, Carrinho, Checkout.
- [ ] Refatorar "Detalhe da Pizza" para abrir o Configurador.

## 5. Integração (70%)
- [x] Cliente Axios
- [ ] **BACKEND PRONTO:** Consumir `/options` para personalizar pizzas.
- [ ] **BACKEND PRONTO:** Enviar encomenda com `sizeId`, `crustId` e `extras`.
- [ ] Ligar Socket.io.

---
*Nota: O Agente 2 já disponibilizou os modelos de Tamanho, Massa e Extras. O cálculo de preço agora é feito no servidor.*
