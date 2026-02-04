# 🚀 ROADMAP — Pizzaria Rural

## 🧠 Estado Global do Projeto: ~72% Concluído

## 👥 Agentes de IA
- **Agente 1 (Frontend):** 66% - Responsável pela interface, animações e integração.
- **Agente 2 (Backend):** 98% - Responsável pela API, base de dados e lógica de negócio.
- **Agente 3 (Infra & QA):** 45% - Responsável por CI/CD, deploys e qualidade.

---

# 📌 RESUMO DE TAREFAS

## Agente 1 (Frontend) - [Ver TODO_AGENTE1.md](./TODO_AGENTE1.md)
- [x] Design System & UI Kit
- [x] Navegação & Ecrãs Base
- [x] Estado Global (Zustand)
- [ ] **PRÓXIMO:** Integração Real-time & Download de Faturas
- [ ] Integração com Mapas & Biometria

## Agente 2 (Backend) - [Ver TODO_AGENTE2.md](./TODO_AGENTE2.md)
- [x] API Base & Autenticação
- [x] Gestão de Pizzas & Encomendas
- [x] Gestão de Stock & Sistema de Reviews
- [x] Cupões de Desconto & Filtros Avançados
- [x] Rate Limiting & Health Checks
- [x] **NOVO:** Real-time Tracking (Socket.io)
- [x] **NOVO:** Geração de Faturas PDF
- [x] **NOVO:** Winston Industrial Logging
- [ ] **PRÓXIMO:** Motor de IA & Backups

## Agente 3 (Infra & QA) - [Ver TODO_AGENTE3.md](./TODO_AGENTE3.md)
- [x] CI/CD Workflows (GitHub Actions)
- [x] Validação de Branches/Commits
- [ ] Testes E2E (Detox)
- [ ] Monitorização & Load Testing

---

### 📝 Notas de Sincronização (Agente 2)
- O Backend está virtualmente completo para o lançamento V1/V2.
- Implementado **Real-time Tracking** via Socket.io. Agente 1 pode agora remover os mocks de tracking.
- Implementado **PDF Invoice Generation**. Agente 1 deve adicionar funcionalidade de download.
- Sistema de **Logging Industrial** ativo para melhor diagnóstico em produção.
- Agente 3 deve focar-se em Testes de Carga agora que a lógica de negócio inclui geração de PDFs e WebSockets.
