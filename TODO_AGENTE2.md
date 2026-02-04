📌 **TODOLIST — Agente 2**

1. **Setup inicial**
   - [x] Criar projeto NestJS
   - [x] Configurar Prisma
   - [x] Criar base de dados (SQLite para dev)
   - [x] Criar estrutura modular
2. **Modelos**
   - [x] Utilizador
   - [x] Pizza
   - [x] Ingredientes
   - [x] Encomenda
   - [x] Estado da encomenda
   - [x] Pagamentos
3. **Endpoints**
   - [x] Autenticação (JWT)
   - [x] Listar pizzas
   - [x] Criar encomenda (com suporte opcional a utilizador autenticado)
   - [x] Atualizar estado
   - [x] Tracking
   - [x] Histórico
4. **Notificações**
   - [/] WhatsApp (Simulado/Mock)
   - [/] Email fallback (Simulado/Mock)
5. **Documentação**
   - [x] Swagger/OpenAPI
   - [x] Contratos para o frontend (via Swagger)
6. **Testes**
   - [x] Unitários (Estrutura base e build)
   - [ ] Integração
   - [ ] Carga

---
### 🌟 Melhorias Sugeridas (Agente 1)
- [ ] **Geração de Faturas PDF:** Endpoint para descarregar fatura após encomenda.
- [ ] **Motor de Recomendações IA:** Sugerir pizzas com base no histórico do utilizador.
- [ ] **Webhooks de Pagamento:** Garantir robustez na integração com Stripe.

---
### 📈 Feedback de Integração (Agente 1)
- [ ] **Avaliações Dinâmicas:** O Frontend já tem a UI de submissão. Precisamos de um endpoint `POST /pizzas/:id/reviews` para persistir estas estrelas e comentários.

---
### 🚀 Novas Necessidades (Agente 1 - v3)
- [ ] **Chat de Suporte:** Criar endpoints para mensagens em tempo real.
  - `GET /support/messages`
  - `POST /support/messages`

---
### 🍕 Requisitos para Visual Telepizza (Agente 1)
- [x] **Múltiplos Tamanhos:** Adaptar o modelo de Pizza para suportar preços por tamanho (Pequena, Média, Familiar).
- [ ] **Novas Categorias:** Adicionar suporte para categorias "Promoções", "Bebidas", "Sobremesas" e "Entradas" na DB.
- [ ] **Banners Dinâmicos:** Criar endpoint `GET /banners` para fornecer imagens e links das promoções da Home.

---
### 🎟️ Gestão de Descontos (Agente 1)
- [ ] **Validação de Cupões:** Criar endpoint `POST /coupons/validate` para verificar códigos promocionais.

---
### 🚨 REQUISITO FRONTEND (Agente 1)
- [ ] **API de Personalização:** Expor endpoints para `GET /pizzas/crusts` e `GET /pizzas/extras` para alimentar o Configurador.
- [ ] **Webhook de Tracking:** Implementar evento Socket.io `order_status_update` para o mapa e barra de progresso.
