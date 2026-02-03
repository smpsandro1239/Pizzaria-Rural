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
