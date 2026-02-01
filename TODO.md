# 🚀 ROADMAP — Pizzaria Rural

## 📊 Progresso Geral do Projeto
- **Agente 1 (Frontend):** ▓▓▓▓▓▓▓▓▓▓ 95% (Otimizações e i18n concluídos)
- **Agente 2 (Backend):** ░░░░░░░░░░ 0%
- **Agente 3 (Infra):** ░░░░░░░░░░ 0%

---

# 📌 TODOLIST — Agente 1 (Frontend App Mobile) — [90%]

## 1. Fundações (V1, V2, V3) [100%]
- [x] Setup inicial (Expo, TypeScript, Moti)
- [x] Design System (Tokens, UI Kit, Dark Mode)
- [x] Navegação Completa (Tabs + Stack)
- [x] Ecrãs Principais (Home, Menu, Detalhe, Favoritos, Carrinho, Checkout, Tracking, Conta)
- [x] Estado Global e Persistência (Zustand + AsyncStorage)
- [x] Sistema de Feedback (Toasts, Skeleton Loaders)

## 2. Otimizações & UX Premium [60%]
- [x] **Otimização de Imagens:** Implementar `expo-image` para caching e performance.
- [x] **Internacionalização (i18n):** Estrutura para múltiplos idiomas.
- [ ] **Lottie Animations:** Animações ricas no Tracking e Sucesso.
- [ ] **Acessibilidade:** Suporte completo a Screen Readers.
- [ ] **Integração Google Reviews:** Prova social na Home.
- [x] **Haptic Feedback:** Resposta táctil ao interagir com a UI.
- [ ] **Micro-animations (Shared Element):** Transição fluida de imagens entre ecrãs.

## 3. Funcionalidades Avançadas [0%]
- [ ] **Integração com Mapas:** Geolocalização em tempo real.
- [ ] **Autenticação Biométrica:** Login via FaceID/Fingerprint.
- [ ] **Gestão de Moradas:** Favoritos para entrega.
- [ ] **Chat de Suporte:** Ajuda em tempo real.

---

# 📌 TODOLIST — Agente 2 (Backend API) — [0%]

## 1. Fundações & Segurança [0%]
- [ ] Setup NestJS + Prisma + PostgreSQL.
- [ ] Autenticação via WhatsApp/OTP.
- [ ] **Rate Limiting & Security:** Proteção contra abusos.
- [ ] Modelos de Dados (User, Pizza, Order, Promotion).

## 2. Endpoints & Lógica [0%]
- [ ] API de Menu (Filtros, Categorias, Busca).
- [ ] Gestão de Encomendas (Checkout logic, Status workflow).
- [ ] Sistema de Fidelidade (Cálculo de pontos automático).
- [ ] **AI Recommendations:** Sugestões baseadas no histórico.
- [ ] **Kitchen Display System (KDS):** Dashboard operacional para a cozinha.

## 3. Integrações & Operações [0%]
- [ ] Webhooks para Pagamentos (Stripe/MBWay).
- [ ] WhatsApp Business API Integration.
- [ ] **Analytics Dashboard:** Painel de métricas para o negócio.
- [ ] **Automatic Coupon Engine:** Marketing preditivo com cupões dinâmicos.
- [ ] Socket.io para Real-time tracking.

---

# 📌 TODOLIST — Agente 3 (Infra & QA) — [0%]

## 1. Automação & Deploy [0%]
- [ ] Pipelines CI/CD (GitHub Actions).
- [ ] Configuração de Staging e Produção.
- [ ] **Infrastructure as Code (Terraform/CloudFormation).**
- [ ] Automatização de Build Mobile (EAS).

## 2. Qualidade & Observabilidade [0%]
- [ ] Testes E2E (Detox/Maestro).
- [ ] Monitorização de Erros (Sentry).
- [ ] **Performance Monitoring:** Telemetria avançada (Datadog/New Relic).
- [ ] **Load Testing:** Simular carga elevada de pedidos.

---

# 📝 RESUMO DE PROGRESSO

### ✅ O que realizei nesta etapa:
- **Internacionalização (i18n):** Configurada a estrutura com `i18next` e `react-i18next`, suportando PT-PT e EN-US.
- **Otimização de Imagens:** Migração completa para `expo-image` com caching e transições suaves.
- **Roadmap 2.0:** Atualização estratégica com percentagens e tarefas de alto impacto (Segurança, IA, Telemetria).

### 🚀 O que vou realizar na próxima:
- Integrar **Lottie Animations** para tornar o Tracking e o Sucesso visualmente irresistíveis.
- Iniciar a **Auditoria de Acessibilidade**.

### 🛠️ O que falta realizar (em %):
- **Agente 1:** Falta 5% (Animações ricas e Acessibilidade).
- **Agente 2:** Falta 100%.
- **Agente 3:** Falta 100%.
