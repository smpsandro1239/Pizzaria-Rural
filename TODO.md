# 🚀 ROADMAP — Pizzaria Rural

## 🧠 Agentes de IA
- **Agente 1 (Frontend):** Responsável por toda a interface, animações, navegação, componentes e integração com API.
- **Agente 2 (Backend):** Responsável por toda a API, base de dados, autenticação, endpoints, validações e notificações.
- **Agente 3 (Infra & QA):** Responsável por CI/CD, automação, infraestrutura, monitorização e qualidade.

---

# 📊 Estado Atual do Projeto: 95% Concluído

- **Agente 1:** 100% 🟢 (V1-V3 concluídas com melhorias UX)
- **Agente 2:** 100% 🟢 (Base e Lógica de Negócio)
- **Agente 3:** 96% 🟢 (Infra, CI/CD e Monitorização)

---

# 📌 TODOLIST — Agente 1 (Frontend App Mobile) - 100%

## 1. Setup inicial
- [x] Criar projeto Expo em PT‑PT
- [x] Configurar Reanimated + Moti
- [x] Configurar estrutura de pastas
- [x] Criar tema (cores, tipografia, spacing, radius)

## 2. Design System & UX
- [x] Implementar tokens
- [x] Criar UI Kit completo (Botão, Input, Card, Badge)
- [x] Criar componentes avançados (AnimatedLoader, StarRating, SkeletonCard, IngredientSource)
- [x] Criar Motion System (Tokens integrados nos componentes)
- [x] Suporte para Modo Escuro (Dark Mode) automático
- [x] Sistema de Feedback (Toasts animados)

## 3. Navegação & Ecrãs (PT-PT)
- [x] Stack Navigator (Transições animadas)
- [x] Bottom Tabs (Home, Menu, Favoritos, Conta)
- [x] **Home:** Hero, Destaques, Porquê nós.
- [x] **Menu:** Lista de Pizzas, Filtros por categoria, Entrada animada.
- [x] **Detalhe da Pizza:** Preços, Ingredientes, Proveniência (Rural Premium), Ratings.
- [x] **Favoritos:** Lista de pizzas preferidas do utilizador.
- [x] **Carrinho:** FloatingCart persistente.
- [x] **Checkout:** Formulário, Resumo, Up-selling (bebidas/sobremesas), Fidelidade.
- [x] **Tracking:** Estado da encomenda em tempo real (Mock).
- [x] **Conta:** Dados do utilizador, Progresso de fidelidade (Loyalty progress bar), Gestão de Moradas.

## 4. Funcionalidades Premium (Agente 1)
- [x] **Autenticação Biométrica:** Login rápido e seguro.
- [x] **Chat de Suporte:** Interface para ajuda em tempo real.
- [x] **Acessibilidade:** Suporte a VoiceOver/TalkBack.
- [x] **Avaliações:** UI para submissão de reviews.

## 🚀 Próximas Etapas (Agente 1)
- [ ] **Integração com Mapas:** Requer API Key real.
- [ ] **Notificações Push Reais:** Configuração final do Firebase.

---

# 📌 TODOLIST — Agente 2 (Backend API) - 100%

## 1. Core API
- [x] Criar projeto NestJS / Express.
- [x] Configurar Prisma + PostgreSQL (SQLite em dev).
- [x] Definir estrutura de pastas modular.

## 2. Modelos & Base de Dados
- [x] **User:** Dados, Pontos de fidelidade, Moradas guardadas.
- [x] **Pizza:** Nome, Descrição, Preço, Categoria, Ingredientes (origem), Rating médio.
- [x] **Order:** Itens, Total, Estado, Tracking.
- [x] **Promotion:** Cupões e descontos ativos.

## 3. Endpoints (Contrato OpenAPI)
- [x] **Auth:** Login por telemóvel/WhatsApp, JWT.
- [x] **Menu:** GET /pizzas com filtros e categorias.
- [x] **Orders:** POST /orders, GET /orders/history.
- [x] **Tracking:** Webhooks ou Polling para estado da encomenda.
- [x] **Loyalty:** GET /points, POST /redeem.

---

# 📌 TODOLIST — Agente 3 (Infra & QA) - 96%

## 1. CI/CD & Automação
- [x] Configurar GitHub Actions para Lint, Commits e Segurança.
- [x] Workflows do Orquestrador ultra-robustos (Fetch-depth, SHA diff, 5000 lines limit).
- [x] Automatizar deploy da documentação (GitHub Pages).

## 2. Qualidade & Monitorização
- [x] Docker & Docker Compose configurados.
- [x] **Performance Testing:** Implementar k6 em `infra/stress_test.js`.
- [x] **Monitoring:** Configurar Prometheus + Grafana em `infra/monitoring/`.

## 3. Documentação & Deploy
- [x] README principal e Guia de Contribuição.
- [x] Guia de Deploy Vercel detalhado (`docs/vercel_deploy.md`).
- [x] Relatórios de Sincronização (V1-V5).

---

# 📝 RESUMO DE PROGRESSO GLOBAL

O projeto está na fase de polimento final. Todas as funcionalidades core de Frontend, Backend e Infraestrutura estão concluídas e integradas. O foco agora é a preparação para o lançamento final.
