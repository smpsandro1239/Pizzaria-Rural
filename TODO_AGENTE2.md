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
   - [x] **Cupões de Desconto** (Melhoria)
   - [x] **Tamanhos e Extras** (Melhoria)
3. **Endpoints**
   - [x] Autenticação (JWT)
   - [x] Listar pizzas
   - [x] Criar encomenda (com suporte a tamanhos, extras, cupões e pontos)
   - [x] Atualizar estado
   - [x] Tracking
   - [x] Histórico
   - [x] **Validação de Cupões** (Melhoria)
   - [x] **Simulação de Redenção de Pontos** (Melhoria)
   - [ ] **Dashboard de Administração** (Futuro)
     - [ ] Métricas de vendas (diário/mensal)
     - [ ] Ranking de pizzas mais vendidas
     - [ ] Gestão de stock de ingredientes
4. **Notificações**
   - [/] WhatsApp (Simulado/Mock)
   - [/] Email fallback (Simulado/Mock)
   - [ ] **Integração Real com WhatsApp Business API** (Melhoria de impacto)
   - [ ] **Integração Real com Resend para Transacionais** (Melhoria de impacto)
5. **Fidelização e Experiência**
   - [x] Atribuição de pontos por compra
   - [x] **Redenção de Pontos** (Melhoria): Usar pontos acumulados para descontos diretos.
   - [ ] **Sistema de Reviews** (Melhoria): Avaliação de pizzas e serviço após entrega.
6. **Pagamentos Reais**
   - [ ] **Integração com Stripe** (Cartão de Crédito)
   - [ ] **Integração com IfThenPay/Localsend** (MBWAY)
7. **Documentação e Qualidade**
   - [x] Swagger/OpenAPI (PT-PT)
   - [x] Segurança de tipos estrita
   - [x] Testes Unitários
   - [ ] **Testes de Integração (E2E API)**
   - [ ] **Carga e Performance**
