# 📌 TODOLIST — Agente 1 (Frontend App Mobile)

## 1. Setup inicial
- [x] Criar projeto Expo em PT‑PT
- [x] Configurar Reanimated + Moti
- [x] Configurar estrutura de pastas
- [x] Criar tema (cores, tipografia, spacing, radius)

## 2. Design System
- [x] Implementar tokens
- [x] Criar UI Kit completo (Botão, Input, Card, Badge)
- [x] Criar componentes avançados (AnimatedLoader)
- [x] Criar Motion System (Tokens integrados nos componentes)

## 3. Navegação
- [x] Stack Navigator
- [x] Bottom Tabs
- [x] Transições animadas (Configuradas no Stack Navigator)

## 4. Ecrãs
- [x] Home (Hero + Destaques)
- [x] Menu (Lista de Pizzas)
- [x] Detalhe da Pizza (PizzaDetailScreen)
- [x] Carrinho (FloatingCart component)
- [x] Checkout (Formulário + Resumo)
- [x] Tracking (Estado da Encomenda)
- [x] Perfil (Dados do utilizador)
- [x] Histórico (Pedidos anteriores)

## 5. Integração com API
- [x] Criar cliente API (Axios + src/api/client.ts)
- [x] Consumir endpoints (Pizzas e Encomendas configurados)
- [x] Implementar Estado Global (Zustand - src/store/cart-store.ts)
- [x] Integrar Carrinho (Menu e Checkout)
- [x] Validar erros (Implementado nos ecrãs principais)
- [x] Loading states (Adicionados Loaders e ActivityIndicators)
- [x] Toasts e feedback (Componente Toast animado implementado)

## 6. Testes
- [x] Testes de UI (Configurados, componentes base testados)
- [ ] Testes de navegação (Ambiente configurado, pendente resolução de conflitos de runtime)
- [x] Testes de integração com API (Store de carrinho testada)
- [x] Verificação de tipos (tsc --noEmit passando)

## 🚀 Próximos Passos & Melhorias (V2)
- [x] **Persistência Local:** Manter o carrinho guardado mesmo após fechar a app (Zustand Persist).
- [x] **Skeleton Loaders:** Melhorar a percepção de performance com placeholders durante o loading.
- [x] **Animações de Entrada:** Adicionar efeitos de "fade-in" e "slide-up" na lista de pizzas.
- [x] **Sistema de Favoritos:** Permitir ao utilizador marcar pizzas preferidas (com ecrã dedicado).
 - [x] **Modo Escuro (Dark Mode):** Suporte para tema escuro automático em toda a app.
 - [x] **Origem dos Ingredientes (Rural Premium):** Exibir proveniência dos ingredientes nos detalhes.
 - [ ] **Filtros e Categorias:** Melhorar a navegação no menu com filtros por tipo de pizza.
 - [ ] **Sistema de Avaliações:** Permitir dar feedback e ver a nota média das pizzas.
 - [ ] **Progresso de Fidelidade:** Visualizar melhor o caminho até à oferta grátis.
- [ ] **Integração com Mapas:** Visualizar a entrega em tempo real no ecrã de Tracking.
 - [ ] **Promoções e Notificações:** Sistema de alertas para ofertas do dia.
 - [ ] **Internacionalização (i18n):** Preparar a app para outros idiomas.
- [ ] **PWA/Web Optimizations:** Refinar a experiência em browser para dispositivos móveis.
