# 🚀 ROADMAP — Pizzaria Rural

## 🧠 Agentes de IA
- **Agente 1 (Frontend):** Responsável por toda a interface, animações, navegação, componentes e integração com API.
- **Agente 2 (Backend):** Responsável por toda a API, base de dados, autenticação, endpoints, validações e notificações.
- **Agente 3 (Infra & QA):** Responsável por CI/CD, automação, infraestrutura, monitorização e qualidade.

---

# 📊 Estado Atual do Projeto: 94% Concluído

- **Agente 1:** 100% 🟢 (V1-V3 concluídas)
- **Agente 2:** 87% 🟡
- **Agente 3:** 65% 🟡

---

# 📌 TODOLIST — Agente 1 (Frontend App Mobile) - 100%

## 1. Setup inicial
- [x] Criar projeto Expo em PT‑PT
- [x] Configurar Reanimated + Moti
- [x] Configurar estrutura de pastas
- [x] Criar tema (cores, tipografia, spacing, radius)

## 2. Design System
- [x] Implementar tokens
- [x] Criar UI Kit completo (Botão, Input, Card, Badge)
- [x] Criar componentes avançados (AnimatedLoader, StarRating, SkeletonCard, IngredientSource)
- [x] Criar Motion System (Tokens integrados nos componentes)

## 3. Navegação
- [x] Stack Navigator (Transições animadas)
- [x] Bottom Tabs (Home, Menu, Favoritos, Conta)

## 4. Ecrãs (PT-PT)
- [x] **Home:** Hero, Destaques, Porquê nós.
- [x] **Menu:** Lista de Pizzas, Filtros por categoria, Entrada animada.
- [x] **Detalhe da Pizza:** Preços, Ingredientes, Proveniência (Rural Premium), Ratings.
- [x] **Favoritos:** Lista de pizzas preferidas do utilizador.
- [x] **Carrinho:** FloatingCart persistente.
- [x] **Checkout:** Formulário, Resumo, Up-selling (bebidas/sobremesas).
- [x] **Tracking:** Estado da encomenda em tempo real (Mock).
- [x] **Conta:** Dados do utilizador, Progresso de fidelidade (Loyalty progress bar).

## 5. Integração & Estado Global
- [x] Criar cliente API (Axios)
- [x] Consumir endpoints (Mock fallback implementado)
- [x] Estado Global com Zustand (Carrinho, Favoritos, Toasts)
- [x] Persistência Local (AsyncStorage)
- [x] Suporte para Modo Escuro (Dark Mode) automático
- [x] Sistema de Feedback (Toasts animados)

## 6. Qualidade & Melhorias
- [x] Verificação de tipos (TypeScript)
- [x] Testes de UI & Store (Mocks configurados)
- [x] Skeleton Loaders para carregamento
- [x] Correção de versões das dependências

## 🚀 Próximas Etapas (Agente 1)
- [ ] **Integração com Mapas:** Visualizar entrega em tempo real no Tracking.
- [ ] **Autenticação Biométrica:** Login rápido e seguro.
- [ ] **Gestão de Moradas:** Guardar moradas favoritas.
- [ ] **Modo Offline:** Cache do menu e favoritos.
- [ ] **Internacionalização (i18n):** Preparar suporte para outros idiomas.
- [ ] **Otimização de Imagens:** Implementar `expo-image`.
- [ ] **Integração Google Reviews:** Exibir feedback real.

---

# 📌 TODOLIST — Agente 2 (Backend API) - 87%

## 1. Setup & Infra
- [x] Criar projeto NestJS
- [x] Configurar Prisma + PostgreSQL (SQLite em dev)
- [x] Definir estrutura de pastas modular

## 2. Modelos & Base de Dados
- [x] **User:** Dados, Pontos de fidelidade, Moradas.
- [x] **Pizza:** Nome, Descrição, Preço, Categoria, Ingredientes (origem).
- [x] **Order:** Itens, Total, Estado, Tracking.
- [x] **Pagamentos:** Estrutura para Stripe/MBWay.

## 3. Endpoints (Contrato OpenAPI)
- [x] **Auth:** Login JWT.
- [x] **Menu:** GET /pizzas com filtros.
- [x] **Orders:** POST /orders, GET /orders/history.
- [x] **Tracking:** Webhooks/Polling para estado.

## 4. Integrações Avançadas
- [/] **Notificações:** WhatsApp/Email (Simulado/Mock).
- [ ] **Pagamentos Reais:** Integração final com Stripe / IfThenPay.
- [ ] **AI Recommendations:** Motor de sugestão.

## 5. Documentação & Testes
- [x] Swagger/OpenAPI concluído.
- [x] Testes Unitários base.
- [ ] Testes de Integração.

---

# 📌 TODOLIST — Agente 3 (Infra & QA) - 65%

## 1. CI/CD & Automação
- [x] Configurar GitHub Actions para Lint e Commits.
- [x] Workflows do Orquestrador (PR, Commits, Project).
- [ ] Configurar Pipeline de Build para Mobile (EAS).
- [ ] Automatizar deploy do Backend (Vercel/Render).

## 2. Qualidade & Monitorização
- [x] Docker & Docker Compose configurados.
- [ ] Implementar Testes End-to-End (E2E) com Playwright/Detox.
- [ ] **Performance Testing:** Implementar k6 em `infra/stress_test.js`.
- [ ] **Security Scanning:** Adicionar scan de vulnerabilidades no CI.
- [ ] **Monitoring:** Configurar Prometheus/Grafana basic em `infra/`.

## 3. Documentação
- [x] README, Arquitetura e Guia de Contribuição.
- [x] Documentação do Orquestrador.
- [ ] Documentação de Deploy e API.

---

# 📝 RESUMO DE PROGRESSO (Sincronização Agente 3)

### O que realizei nesta etapa:
- Sincronizei o roadmap global com o progresso real dos Agentes 2 e 3.
- Validei a existência dos workflows do Orquestrador.
- Identifiquei lacunas na infraestrutura (Stress tests, Security, Monitoring).

### O que vou realizar na próxima:
- Criar script de testes de carga com k6.
- Configurar scan de segurança no GitHub Actions.
- Implementar ficheiros base para monitorização.

### O que falta realizar:
- Deploy final do ecossistema.
- Testes E2E completos integrando frontend e backend.
