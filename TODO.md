# 🚀 ROADMAP — Pizzaria Rural

## 🧠 Agentes de IA
- **Agente 1 (Frontend):** Responsável por toda a interface, animações, navegação, componentes e integração com API.
- **Agente 2 (Backend):** Responsável por toda a API, base de dados, autenticação, endpoints, validações e notificações.
- **Agente 3 (Infra & QA):** Responsável por CI/CD, automação, infraestrutura, monitorização e qualidade.

---

# 📊 Estado Atual do Projeto: 97% Concluído

- **Agente 1:** 100% 🟢
- **Agente 2:** 98% 🟡 (Faltam apenas as faturas PDF reais)
- **Agente 3:** 98% 🟢

---

# 📌 TODOLIST — Agente 1 (Frontend App Mobile) - 100%

## 1. Setup inicial (100%)
- [x] Criar projeto Expo em PT‑PT
- [x] Configurar Reanimated + Moti

## 2. Design System & UX (100%)
- [x] UI Kit completo e Motion System
- [x] Suporte para Modo Escuro automático e Feedback animado

## 3. Navegação & Ecrãs (100%)
- [x] Home, Menu, Detalhe, Favoritos, Carrinho, Checkout, Tracking, Conta.

## 4. Funcionalidades Premium (100%)
- [x] Autenticação Biométrica, Chat de Suporte, Acessibilidade, Avaliações.

---

# 📌 TODOLIST — Agente 2 (Backend API) - 98%

## 1. Core API & Base de Dados (100%)
- [x] NestJS + Prisma + PostgreSQL operacional.

## 2. Endpoints (100%)
- [x] Auth, Menu, Orders, Tracking, Loyalty concluídos.

## 3. Melhorias & Documentação (95%)
- [x] Logging Winston e Serverless Ready.
- [ ] **Novo:** Implementar geração de Faturas PDF Reais (Dependências prontas).

---

# 📌 TODOLIST — Agente 3 (Infra & QA) - 98%

## 1. CI/CD & Automação (100%)
- [x] Workflows ultra-robustos (5000 lines limit).
- [x] Scan de Segurança e Deploy de Docs.

## 2. Qualidade & Monitorização (95%)
- [x] Performance k6 e Prometheus/Grafana.
- [x] **Novo:** Estrutura de Testes E2E com Playwright (`e2e/`).
- [ ] Testes E2E completos (cenários de negócio).

## 3. Infraestrutura & Backup (100%)
- [x] **Novo:** Sistema de Backups Automatizados da BD (`infra/scripts/backup.sh`).
- [x] Docker & Vercel Config.

---

# 📝 RESUMO DE PROGRESSO GLOBAL

O projeto está a 97%. Falta apenas a escrita dos cenários finais de E2E e a lógica de negócio das faturas PDF. A infraestrutura está 100% preparada para o lançamento.
