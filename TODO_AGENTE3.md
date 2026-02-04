# 📌 TODO Agente 3 — Infraestrutura & Automação

## 📊 Progresso: 96%

## 1. Setup GitHub (100%)
- [x] Inicializar estrutura do repositório
- [x] Criar branches isoladas
- [x] Criar proteções de branch
- [x] Criar templates de PR e Issues

## 2. CI/CD & Automação (50%)
- [x] Configurar workflows do Orquestrador (PR, Commits, Project, Emergência)
- [x] Lint + Prettier configurados
- [ ] Configurar Testes automáticos no CI
- [ ] Pipeline de Build Mobile (EAS)
- [x] Automatizar deploy do Backend (Vercel)
- [x] Automatizar deploy da Documentação (GitHub Pages)
- [x] **Novo:** Adicionar Workflow de Security Scanning (Trivy/Snyk)

## 3. QA & Testes (20%)
- [ ] Testes End-to-End (Playwright para Web/API, Maestro para Mobile)
- [ ] Testes de Regressão visual
- [x] **Novo:** Implementar Testes de Performance/Carga (k6) em `infra/stress_test.js`

## 4. Infraestrutura & Monitorização (40%)
- [x] Docker (`backend/Dockerfile`)
- [x] Docker Compose (`docker-compose.yml`)
- [x] **Novo:** Configurar Prometheus + Grafana (`infra/monitoring/`)
- [x] Logs centralizados (Winston) (Sentry/Winston)

## 5. Documentação (80%)
- [x] README principal
- [x] Documentação técnica e Arquitetura
- [x] Guia de Contribuição e Divisão de Agentes
- [x] Orquestrador e Backup de Prompts
- [x] Documentação de Deploy (Vercel)
- [ ] Documentação da API (Swagger final)

## 6. Outros
- [x] Commits sempre em PT‑PT
- [x] Atualizar o GitHub sempre que realizar nova tarefa

---
### 🌟 Melhorias Sugeridas (Agente 1)
- [ ] **Lighthouse CI:** Relatórios automáticos de performance no PR do Frontend.
- [ ] **Sentry Setup:** Configurar DSNs para Frontend e Backend.
- [ ] **Deploy de Docs:** Automatizar a publicação de docs para GitHub Pages.

---
### 📈 Feedback de Integração (Agente 1)
- [ ] **Otimização de Assets:** Por favor, garante que o suporte a WebP está ativo no CDN/Vercel para as imagens da App.

---
### 🚀 Novas Necessidades (Agente 1 - v3)
- [ ] **Deploy EAS:** Preparar ambiente para build mobile nativo (Android/iOS).
- [ ] **Sentry Integration:** Configurar o DSN no Frontend para monitorizar erros de produção.

---
### 🛠️ Instruções de Infra (Agente 1)
- [ ] **Injeção de API Key:** Quando o utilizador fornecer a chave do Google Maps, por favor configura-a no `app.json` (Android: `config.googleMaps.apiKey`, iOS: `config.googleMapsApiKey`) ou via segredos do EAS (`eas secret:create`).
- [ ] **Build Nativo:** O Frontend está 100% pronto para gerar a primeira `.apk` ou `.ipa` de teste.
