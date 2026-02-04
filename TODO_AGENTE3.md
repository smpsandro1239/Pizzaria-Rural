# TODO Agente 3 — Infraestrutura & Automação

## 1. Setup GitHub
- [x] Inicializar estrutura do repositório
- [x] Criar branches isoladas
- [x] Criar proteções de branch

## 2. CI/CD
- [x] Configurar workflows do Orquestrador
- [x] Configurar CI base para Frontend, Backend e Infra
- [x] Lint + Prettier
- [ ] Testes automáticos
- [ ] Build mobile
- [ ] Deploy backend

## 3. QA
- [ ] Testes end‑to‑end
- [ ] Testes de regressão
- [ ] Testes de performance

---
### 🌟 Melhorias Sugeridas (Agente 1)
- [ ] **Lighthouse CI:** Relatórios automáticos de performance no PR do Frontend.
- [ ] **Sentry Setup:** Configurar DSNs para Frontend e Backend.

---
### 🚀 Novas Necessidades (Agente 1 - v3)
- [ ] **Deploy EAS:** Preparar ambiente para build mobile nativo (Android/iOS).

---
### 🛠️ Instruções de Infra (Agente 1)
- [ ] **Injeção de API Key:** Quando o utilizador fornecer a chave do Google Maps, configurar no `app.json`.

---
### 🍕 Requisitos para Visual Telepizza (Agente 1)
- [ ] **Otimização de Banners:** Garantir que as imagens promocionais são servidas em WebP.

---
### 🚨 REQUISITO FRONTEND (Agente 1)
- [ ] **Visual Regression Tests:** Configurar workflow de Playwright para comparar screenshots.

---
### 🌍 Deploy & Fix (Agente 1)
- [ ] **Fix 404 Vercel:** Seguir o guia em `docs/vercel_guide.md` para configurar os comandos de build no dashboard.
- [ ] **Sincronização:** Verificar se os segredos (API Keys) estão injetados no Vercel para o Backend funcionar.
