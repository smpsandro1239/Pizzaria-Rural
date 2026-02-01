# 🚀 ROADMAP — Pizzaria Rural

## 📊 Progresso Geral do Projeto
- **Agente 1 (Frontend):** ▓▓▓▓▓▓▓▓▓░ 88% (Polimento e Prova Social concluídos)
- **Agente 2 (Backend):** ░░░░░░░░░░ 0%
- **Agente 3 (Infra):** ░░░░░░░░░░ 0%

---

# 📌 TODOLIST — Agente 1 (Frontend App Mobile) — [82%]

## 1. Fundações & Core (V1, V2, V3) [100%]
- [x] Setup inicial (Expo, TypeScript, Moti)
- [x] Design System (Tokens, UI Kit, Dark Mode)
- [x] Navegação Completa (Tabs + Stack)
- [x] Ecrãs Principais (Home, Menu, Detalhe, Favoritos, Carrinho, Checkout, Tracking, Conta)
- [x] Estado Global e Persistência (Zustand + AsyncStorage)
- [x] Sistema de Feedback (Toasts, Skeleton Loaders)
- [x] Internacionalização (i18n): Suporte PT-PT e EN-US.
- [x] Otimização de Imagens: Migração para `expo-image`.
- [x] Haptic Feedback: Resposta táctil integrada.

## 2. Experiência Premium [75%]
- [x] **Lottie Animations:** Animações ricas no Tracking e Sucesso.
- [x] **Integração Google Reviews:** Prova social na Home.
- [ ] **Micro-animations (Shared Element):** Transição fluida de imagens entre ecrãs.
- [ ] **Acessibilidade:** Suporte completo a Screen Readers.
- [ ] **Gestão de Moradas:** Guardar moradas favoritas para checkout.

## 3. Funcionalidades Avançadas [0%]
- [ ] **Integração com Mapas:** Visualização da entrega em tempo real.
- [ ] **Autenticação Biométrica:** Login seguro via FaceID/Fingerprint.
- [ ] **Chat de Suporte:** Interface para ajuda em tempo real com o Agente 2.
- [ ] **Deep Linking:** Abrir a app diretamente em promoções ou encomendas.

---

# 📌 TODOLIST — Agente 2 (Backend API) — [0%]

## 1. Fundações & Segurança [0%]
- [ ] Setup NestJS + Prisma + PostgreSQL.
- [ ] Autenticação via WhatsApp/OTP e **Social Login (Google/Apple)**.
- [ ] Rate Limiting & Security: Proteção contra ataques DDoS e abusos.
- [ ] Modelos de Dados (User, Pizza, Order, Promotion).

## 2. Endpoints & Lógica [0%]
- [ ] API de Menu com Cache (Redis) para performance extrema.
- [ ] Gestão de Encomendas (Workflow de estados).
- [ ] Motor de Fidelidade e **Automatic Coupon Engine**.
- [ ] **AI Recommendations:** Sugestões inteligentes no carrinho.

## 3. Integrações & Real-time [0%]
- [ ] Pagamentos (Stripe/MBWay) com Webhooks.
- [ ] Notificações Push e WhatsApp (UltraMsg).
- [ ] **Socket.io** para Tracking e Chat.
- [ ] **KDS (Kitchen Display System):** Interface para a cozinha.

---

# 📌 TODOLIST — Agente 3 (Infra & QA) — [0%]

## 1. Automação & DevOps [0%]
- [ ] Pipelines CI/CD com **Visual Regression Testing**.
- [ ] Infraestrutura como Código (Terraform).
- [ ] Deploy Automatizado (EAS + Cloud).
- [ ] **Security Scanning (SonarQube/Snyk).**

## 2. Observabilidade [0%]
- [ ] Monitorização de Performance (Datadog/New Relic).
- [ ] Logs centralizados e Alertas de erro (Sentry).
- [ ] **Load Testing:** Garantir estabilidade com 10k+ pedidos/hora.

---

# 📝 RESUMO DE PROGRESSO

### ✅ O que realizei nesta etapa:
- **Animações Lottie:** Integrada animação vetorial de preparação de pizza no ecrã de Tracking para maior feedback visual.
- **Prova Social (Google Reviews):** Implementado carrossel de avaliações reais na Home para aumentar a confiança do utilizador.
- **Multicommit:** Realizados commits incrementais para garantir histórico limpo e organizado.
- **Roadmap Premium:** Adicionadas tarefas de Deep Linking e KDS para expansão futura.

### 🚀 O que vou realizar na próxima:
- Implementar **Shared Element Transitions** para imagens (Menu -> Detalhe).
- Realizar a **Auditoria de Acessibilidade** completa.

### 🛠️ O que falta realizar (em %):
- **Agente 1:** Falta 12% para fechar o ciclo de excelência (Shared Elements, Acessibilidade e Moradas).
- **Agente 2:** Falta 100%.
- **Agente 3:** Falta 100%.
