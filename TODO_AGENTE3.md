# 📌 TODO Agente 3 — Infraestrutura & Automação

## 📊 Progresso: 85% (Novas tarefas delegadas pela V3 UI)

## 1. Estabilização de CI (100%)
- [x] Workflows do Orquestrador otimizados para 5000 linhas.
- [x] Resolução de conflitos de sincronização.

<<<<<<< HEAD
## 2. QA & Testes (70%)
- [x] Stress tests k6.
- [x] Estrutura base Playwright para E2E.
- [ ] **Novo:** Implementar Testes de Regressão Visual (Playwright Screenshots).
- [ ] **Pendente:** Escrita de cenários de teste reais (Aguardando Endpoints Moradas).

## 3. Monitorização & Erros (20%)
- [ ] **Novo:** Configurar Sentry para Frontend e Backend (Captura de Crash).
- [x] Prometheus + Grafana base.

## 4. Integração de Terceiros (50%)
- [ ] **Novo:** Configurar Variáveis de Ambiente e Secretos para Google Maps API.
- [ ] **Novo:** Implementar Otimização de Imagens no Build (expo-image support).
- [x] Backup da BD automatizado.

## 5. Documentação & Outros (90%)
- [x] Guia de Deploy Vercel.
- [x] Relatórios de Sincronização.
- [ ] **Novo:** Criar docs de integração Sentry (`docs/sentry_setup.md`).
=======
## 2. CI/CD & Automação (100%)
- [x] Configurar workflows do Orquestrador (PR, Commits, Project, Emergência)
- [x] Lint + Prettier configurados
- [x] Configurar Testes automáticos no CI
- [ ] Pipeline de Build Mobile (EAS)
- [x] Automatizar deploy do Backend (Vercel)
- [x] Automatizar deploy da Documentação (GitHub Pages)
- [x] Adicionar Workflow de Security Scanning (Trivy/Snyk)

## 3. QA & Testes (50%)
- [ ] Testes End-to-End (Playwright para Web/API, Maestro para Mobile)
- [ ] Testes de Regressão visual
- [x] Implementar Testes de Performance/Carga (k6) em `infra/stress_test.js`

## 4. Infraestrutura & Monitorização (80%)
- [x] Docker (`backend/Dockerfile`)
- [x] Docker Compose (`docker-compose.yml`)
- [x] Configurar Prometheus + Grafana (`infra/monitoring/`)
- [x] Logs centralizados (Winston/Sentry)

## 5. Documentação (90%)
- [x] README principal
- [x] Documentação técnica e Arquitetura
- [x] Guia de Contribuição e Divisão de Agentes
- [x] Orquestrador e Backup de Prompts
- [x] Documentação de Deploy (Vercel)
- [x] Documentação da API (Swagger/OpenAPI)

<<<<<<< Updated upstream
## 6. Sincronização & Qualidade (100%)
- [x] Commits em PT-PT
- [x] Atualizar TODOs e Roadmap Global
- [x] Reportar progresso aos outros agentes

---
*Nota: Este todolist foi atualizado pelo Agente 2 para sincronização global e resolução de conflitos.*
>>>>>>> origin/main
=======
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

---
### 🍕 Requisitos para Visual Telepizza (Agente 1)
- [ ] **Otimização de Banners:** Garantir que as imagens promocionais são servidas em WebP com compressão agressiva.
- [ ] **Asset Management:** Organizar os novos ícones de categorias no repositório de assets centralizado.

---
### 📱 Release Management (Agente 1)
- [ ] **Build Perfil:** Configurar o `eas.json` com perfis de `preview` e `production` para testarmos os links profundos (deep links) da App.
>>>>>>> Stashed changes

---
### 🏁 Lançamento (Agente 1)
- [ ] **Release Candidate:** O Frontend está 100% pronto. Por favor, gera o link para download da APK de teste final.
