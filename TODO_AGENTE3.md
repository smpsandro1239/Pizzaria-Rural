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
- [ ] Build mobile
- [ ] Deploy backend
- [ ] Deploy documentação

## 3. QA
- [ ] Testes end‑to‑end
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
- [x] Configurar geração automática de Changelog (`infra/generate_changelog.sh`)
- [ ] Implementar análise estática de código (SAST)
- [ ] Configurar Husky para hooks de git (pre-commit lint/test)
