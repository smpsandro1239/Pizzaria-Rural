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
- [x] Testes automáticos (Infraestrutura base em `backend/` e `app-mobile/`)
- [ ] Build mobile (Configurar EAS)
- [x] Deploy backend (Configurado `render.yaml`)
- [x] Deploy documentação (GitHub Pages via `.github/workflows/deploy-docs.yml`)

## 3. QA
- [x] Testes end‑to‑end (Infraestrutura Playwright configurada em `e2e/`)
- [ ] Testes de regressão
- [ ] Testes de performance

## 4. Infraestrutura
- [x] Docker (`backend/Dockerfile`)
- [x] Docker Compose (`docker-compose.yml`)
- [x] Monitorização (Prometheus + Grafana em `docker-compose.yml`)
- [x] Logs centralizados (via Docker logs, documentado em `docs/monitorizacao.md`)

## 5. Documentação
- [x] README principal
- [x] Documentação técnica (`docs/setup_local.md`)
- [x] Documentação de API (`docs/api.md`)
- [x] Documentação de deploy (`docs/deploy.md`)
- [x] Documentação de arquitetura (`docs/arquitetura.md`)
- [x] Guia de Contribuição (`CONTRIBUTING.md`)
- [x] Divisão de Agentes (`docs/agentes.md`)
- [x] Orquestrador (`docs/orchestrator.md`)
- [x] Backup de Prompts (`docs/prompts/`)

## 6. Outros
- [x] Commits sempre em PT‑PT
- [x] Atualizar o GitHub sempre que realizar nova tarefa

## 7. Melhorias e Segurança
- [x] Implementar verificação de segurança de dependências (Audit via GitHub Actions)
- [x] Configurar geração automática de Changelog (`infra/generate_changelog.sh` + Workflow CI)
- [x] Implementar análise estática de código (SAST via CodeQL)
- [x] Configurar Husky para hooks de git (pre-commit lint/test)
- [x] Implementar relatórios de cobertura de testes (Code Coverage via Jest + Codecov)
- [x] Configurar Dependabot para atualizações automáticas de segurança (`.github/dependabot.yml`)
- [ ] Implementar testes de carga (Stress Testing) para a API
- [ ] Configurar Semantic Release para gestão de versões automática

## 8. Novas Oportunidades de Impacto
- [x] Criar estratégia e automação de Backup da Base de Dados (`docs/backup_restauro.md`)
- [x] Implementar Monitorização de Uptime (Heartbeat via `.github/workflows/uptime-heartbeat.yml`)
- [x] Configurar notificações de falha de CI para Slack/Discord (Workflow + `infra/notify_failure.sh`)
- [ ] Criar ambiente de Sandbox/Preview para Pull Requests
- [x] Implementar Testes End-to-End (E2E) com Playwright (`e2e/`)
- [x] Configurar Deploy Automático para Render (via `render.yaml` Blueprints)
- [ ] Criar Dashboard de Infraestrutura no Grafana (Template JSON)
- [x] Implementar "Lighthouse" Check para performance do Frontend (Workflow skeleton)
- [x] Implementar análise de segurança de contentores (Docker Scan via Trivy)
