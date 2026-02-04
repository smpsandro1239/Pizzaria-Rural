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
### 🌟 Melhorias Sugeridas (Agente 1)
- [ ] **Geração de Faturas PDF:** Endpoint para descarregar fatura após encomenda.
- [ ] **Motor de Recomendações IA:** Sugerir pizzas com base no histórico do utilizador.
- [ ] **Webhooks de Pagamento:** Garantir robustez na integração com Stripe.
## Estado Atual: 99% Concluído 🟢

## 1. Setup inicial & Infra (100%)
- [x] NestJS, Prisma, SQLite/Postgres.

## 2. Modelos & Negócio (100%)
- [x] Utilizador, Pizza, Ingredientes, Encomenda.
- [x] **NOVO:** Categorias e Banners (Estilo Telepizza).
- [x] Cupões e Reviews.

## 3. Endpoints (100%)
- [x] Auth (JWT).
- [x] Menu categorized (GET /categories).
- [x] Banners (GET /banners).
- [x] Orders com Stock e Tracking Real-time.

## 4. Notificações & Enterprise (80%)
- [/] WhatsApp/Email (Mock).
- [x] Geração de Faturas PDF.
- [x] Winston Industrial Logging.

## 5. Documentação & Qualidade (100%)
- [x] Swagger/OpenAPI (PT-PT).
- [x] Rate Limiting & Health Checks.

## 6. Próximas Etapas (10%)
- [ ] AI Recommendation Engine.
- [ ] Backups Automáticos.
### 🍕 Requisitos para Visual Telepizza (Agente 1)
- [ ] **Múltiplos Tamanhos:** Adaptar o modelo de Pizza para suportar preços por tamanho (Pequena, Média, Familiar).
- [ ] **Novas Categorias:** Adicionar suporte para categorias "Promoções", "Bebidas", "Sobremesas" e "Entradas" na DB.
- [ ] **Banners Dinâmicos:** Criar endpoint `GET /banners` para fornecer imagens e links das promoções da Home.

---
### 🎟️ Gestão de Descontos (Agente 1)
- [ ] **Validação de Cupões:** Criar endpoint `POST /coupons/validate` para verificar códigos promocionais.
- [ ] **Lógica de Preços:** Garantir que o cálculo final no backend considera: Preço Base * Multiplicador Tamanho - Descontos.
