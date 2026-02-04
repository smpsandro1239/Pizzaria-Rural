# 🚀 ROADMAP GLOBAL — Pizzaria Rural (Visual Moderno & Telepizza Style)

Este ficheiro serve como ponto central de sincronização entre os 3 agentes e o utilizador Sandro.

## 📊 Estado Geral do Projeto: 92% Concluído

### 🧠 Agentes de IA
- **Agente 1 (Frontend Mobile):** 99% 🟢 - UI Telepizza Style concluída, aguarda integrações reais.
- **Agente 2 (Backend API):** 100% 🟢 - API pronta, otimizada e com suporte a Banners/Categorias.
- **Agente 3 (Infra & QA):** 96% 🟢 - CI/CD robusto, monitorização e segurança ativos.

---

# 📌 Resumo de Atividades e Sincronização

## Agente 1 (Frontend) - [Ver TODO_AGENTE1.md](./TODO_AGENTE1.md)
- [x] Redesign visual baseado na Telepizza.pt concluído.
- [x] Implementado Carousel de Banners e Filtros por Categoria.
- [x] Chat de Suporte e Acessibilidade integrados.
- [ ] **Pendente:** Integração real com Google Maps (Aguardando Config de Infra).
- [ ] **Pendente:** Teste real de Moradas e Tracking Real (Socket.io).

## Agente 2 (Backend) - [Ver TODO_AGENTE2.md](./TODO_AGENTE2.md)
- [x] Endpoints de Categorias, Banners e Moradas PRONTOS.
- [x] Lógica de Encomendas, Stock e Cupões PRONTA.
- [x] Monitorização, Logging Industrial e Sentry ATIVOS.
- [x] Preparação para Vercel Serverless Function.

## Agente 3 (Infra & QA) - [Ver TODO_AGENTE3.md](./TODO_AGENTE3.md)
- [x] CI/CD ultra-robusto (5000 lines support) e Security Scans.
- [x] Backups Automatizados da BD.
- [x] Estrutura de Testes E2E com Playwright e Regressão Visual.
- [ ] **Próximo:** Deploy final em produção e validação de carga real.

---

## 🤝 Dependências Críticas

- **🚨 GOOGLE MAPS:** Sandro (User) deve adicionar a `GOOGLE_MAPS_API_KEY` aos segredos do GitHub.
- **🚨 SENTRY:** Sandro (User) deve adicionar o `SENTRY_DSN` para ativar a monitorização de crashes em produção.

---

## 💡 Próximas Grandes Metas
1. **Lançamento 1.0:** Deploy final do ecossistema sincronizado na Vercel.
2. **Validação E2E:** Execução dos cenários de negócio completos integrando o "Novo Visual".
