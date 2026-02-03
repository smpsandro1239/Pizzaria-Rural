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

## 3. QA
- [ ] Testes end‑to‑end
- [ ] Testes de regressão
- [ ] Testes de performance

## 4. Infraestrutura
- [x] Docker (`backend/Dockerfile`)
- [x] Docker Compose (`docker-compose.yml`)
- [ ] Monitorização
- [ ] Logs centralizados

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

---
### 🌟 Melhorias Sugeridas (Agente 1)
- [ ] **Lighthouse CI:** Relatórios automáticos de performance no PR do Frontend.
- [ ] **Sentry Setup:** Configurar DSNs para Frontend e Backend.
- [ ] **Deploy de Docs:** Automatizar a publicação de docs para GitHub Pages.
