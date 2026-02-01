# TODO Agente 3 — Infraestrutura & Automação

## 1. Setup GitHub
- [x] Inicializar estrutura do repositório (`/app-mobile`, `/backend`, `/infra`, `/docs`)
- [x] Criar branches isoladas
- [x] Criar proteções de branch (Documentado em CONTRIBUTING.md)
- [x] Criar templates de PR
- [x] Criar templates de issues

## 2. CI/CD
- [x] Configurar workflows do Orquestrador (PR, Commits, Project, Emergência)
- [x] Configurar CI base para Frontend, Backend e Infra
- [x] Lint + Prettier (`.eslintrc.json`, `.prettierrc`)
- [ ] Testes automáticos
- [ ] Build mobile
- [ ] Deploy backend
- [ ] Deploy documentação
- [ ] Automatizar Testes de Carga em CI (usando `backend/test/load-test.js`)

## 3. QA
- [ ] Testes end‑to‑end
- [ ] Testes de regressão
- [ ] Monitorização de Performance (k6 + Grafana)

## 4. Infraestrutura
- [x] Docker (`backend/Dockerfile`)
- [x] Docker Compose (`docker-compose.yml`)
- [ ] Configurar base de dados PostgreSQL em produção (Render/Supabase)
- [ ] Configurar segredos e variáveis de ambiente:
  - [ ] `JWT_SECRET`
  - [ ] `DATABASE_URL`
  - [ ] `RESEND_API_KEY` (Emails Reais)
  - [ ] `WHATSAPP_API_KEY` (WhatsApp Real)
  - [ ] `STRIPE_SECRET_KEY` (Pagamentos Reais)
  - [ ] `STRIPE_WEBHOOK_SECRET` (Webhooks Pagamentos)
  - [ ] `IFTHENPAY_MBWAY_KEY` (MBWAY Real)
- [ ] **Configuração de Proxy/Load Balancer com suporte a WebSockets** (Novo)
- [ ] Monitorização
- [ ] Logs centralizados (usando `backend/logs/*.log`)

## 5. Documentação
- [x] README principal
- [x] Documentação técnica (`docs/setup_local.md`)
- [ ] Documentação de API
- [ ] Documentação de deploy
- [x] Documentação de arquitetura (`docs/arquitetura.md`)
- [x] Guia de Contribuição (`CONTRIBUTING.md`)
- [x] Divisão de Agentes (`docs/agentes.md`)
- [x] Orquestrador (`docs/orchestrator.md`)
- [x] Backup de Prompts (`docs/prompts/`)

## 6. Outros
- [x] Commits sempre em PT‑PT
- [x] Atualizar o GitHub sempre que realizar nova tarefa
