# 🚀 ROADMAP — Pizzaria Rural

## 📊 Progresso Geral do Projeto
- **Agente 1 (Frontend):** ▓▓▓▓▓▓▓▓▓░ 96% (Shared Elements, Confetti e Swipe concluídos)
- **Agente 2 (Backend):** ░░░░░░░░░░ 0%
- **Agente 3 (Infra):** ░░░░░░░░░░ 0%

---

# 📌 TODOLIST — Agente 1 (Frontend App Mobile) — [90%]

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

## 2. Experiência Premium [100%]
- [x] **Lottie Animations:** Animações ricas no Tracking e Sucesso.
- [x] **Integração Google Reviews:** Prova social na Home.
- [x] **Micro-animations (Shared Element):** Transição fluida de imagens entre ecrãs.
- [x] **Acessibilidade:** Suporte completo a Screen Readers.
- [x] **Gestão de Moradas:** Guardar moradas favoritas para checkout.

## 3. Impacto Extra & Refinamento [80%]
- [x] **Confetti Celebration:** Efeito visual festivo no ecrã de sucesso.
- [x] **Swipe-to-Remove:** Gestos para remover itens do carrinho.
- [ ] **Animated Tab Bar:** Ícones com micro-interações ao navegar.
- [x] **API Contract:** Documentação rigorosa para o Agente 2.
- [ ] **Offline Mode:** Cache do menu para visualização sem internet.

## 4. Funcionalidades Avançadas [10%]
- [ ] **Integração com Mapas:** Visualização da entrega em tempo real.
- [ ] **Autenticação Biométrica:** Login seguro via FaceID/Fingerprint.
- [x] **Deep Linking:** Suporte inicial para abertura via URL.
- [ ] **Chat de Suporte:** Interface para ajuda em tempo real com o Agente 2.

---

# 📌 TODOLIST — Agente 2 (Backend API) — [0%]

## 1. Fundações & Segurança [0%]
- [ ] Setup NestJS + Prisma + PostgreSQL.
- [ ] Autenticação via WhatsApp/OTP e **Social Login (Google/Apple)**.
- [ ] **Rate Limiting & Security:** Proteção contra ataques DDoS e abusos.
- [ ] **Database Encryption:** Proteção de dados sensíveis dos utilizadores.

## 2. Endpoints & Lógica [0%]
- [ ] API de Menu com Cache (Redis) para performance extrema.
- [ ] Gestão de Encomendas (Workflow de estados).
- [ ] Motor de Fidelidade e **Automatic Coupon Engine**.
- [ ] **AI Recommendation Engine:** Sugestões personalizadas.

## 3. Integrações & Real-time [0%]
- [ ] Pagamentos (Stripe/MBWay) com Webhooks.
- [ ] Notificações Push e WhatsApp (UltraMsg).
- [ ] **Socket.io** para Tracking e Chat.
- [ ] **KDS (Kitchen Display System):** Interface operacional para a cozinha.

---

# 📌 TODOLIST — Agente 3 (Infra & QA) — [0%]

## 1. Automação & DevOps [0%]
- [ ] Pipelines CI/CD com **Visual Regression Testing**.
- [ ] Infraestrutura como Código (Terraform).
- [ ] Deploy Automatizado (EAS + Cloud).
- [ ] **Auto-scaling:** Configuração para picos de tráfego.

## 2. Observabilidade [0%]
- [ ] Monitorização de Performance (Datadog/New Relic).
- [ ] Logs centralizados e Alertas de erro (Sentry).
- [ ] **Uptime Monitoring:** Alertas de indisponibilidade.

---

# 📝 RESUMO DE PROGRESSO

### ✅ O que realizei nesta etapa:
- **Confetti Celebration:** Integrada celebração visual com Lottie ao atingir o estado de "Entregue" no tracking.
- **Swipe-to-Remove:** Implementado gesto nativo para remover itens do resumo do checkout, otimizando a gestão do carrinho.
- **Shared Element Transitions:** Navegação fluida entre ecrãs com foco visual nos produtos.
- **Contrato de API:** Documentado em `docs/api-contract.md` todos os requisitos para o Agente 2.

### 🚀 O que vou realizar na próxima:
- **Offline First:** Implementar cache agressiva para garantir que o menu carrega sem internet.
- **Animated Tab Bar:** Adicionar vida aos ícones de navegação.

### 🛠️ O que falta realizar (em %):
- **Agente 1:** Falta apenas **4%** (Tab Bar, Offline e Mapas).
- **Agente 2:** Falta **100%**.
- **Agente 3:** Falta **100%**.
