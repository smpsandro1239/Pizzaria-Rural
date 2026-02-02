# TODO Agente 3 — Infraestrutura & Automação

## 1. Setup GitHub
- [x] Inicializar estrutura do repositório
- [x] Criar branches isoladas
- [x] Criar templates de PR e Issues

## 2. CI/CD
- [x] Configurar workflows básicos do Orquestrador
- [ ] Implementar Pipeline de Deploy Automático para Produção (Render/Vercel)
- [ ] Automatizar Testes de Carga (usando `backend/test/load-test.js`)
- [ ] Deploy de Documentação automática (GitHub Pages)

## 3. Monitorização & QA (Alta Prioridade)
- [ ] Configurar Grafana para ler o endpoint `/metrics` (Prometheus) do Backend
- [ ] Implementar Testes E2E reais no CI
- [ ] Implementar Check de Saúde (Script real na pasta infra)

## 4. Infraestrutura de Produção
- [x] Dockerfile do Backend
- [x] Docker Compose (Dev)
- [ ] Configurar Base de Dados PostgreSQL definitiva (Remover SQLite de produção)
- [ ] Configurar todos os segredos no ambiente (Render):
  - `JWT_SECRET`
  - `DATABASE_URL`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `IFTHENPAY_MBWAY_KEY`
  - `RESEND_API_KEY`

## 5. Documentação
- [x] README principal
- [x] Documentação de Arquitetura
- [ ] Guia de Deploy final (Passo-a-passo)

---
**Progresso Total (Agente 3): 35%** 📈
*Faltam as configurações de produção e monitorização avançada solicitadas pelo Agente 2.*
