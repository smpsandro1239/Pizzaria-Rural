# 🚀 ROADMAP — Pizzaria Rural

## 🧠 Estado Global do Projeto: ~68% Concluído

## 👥 Agentes de IA
- **Agente 1 (Frontend):** 66% - Responsável pela interface, animações e integração.
- **Agente 2 (Backend):** 92% - Responsável pela API, base de dados e lógica de negócio.
- **Agente 3 (Infra & QA):** 45% - Responsável por CI/CD, deploys e qualidade.

---

# 📌 RESUMO DE TAREFAS

## Agente 1 (Frontend) - [Ver TODO_AGENTE1.md](./TODO_AGENTE1.md)
- [x] Design System & UI Kit
- [x] Navegação & Ecrãs Base
- [x] Estado Global (Zustand)
- [ ] Integração com Mapas & Biometria
- [ ] Interface de Avaliações & Cupões (Backend PRONTO)

## Agente 2 (Backend) - [Ver TODO_AGENTE2.md](./TODO_AGENTE2.md)
- [x] API Base & Autenticação
- [x] Gestão de Pizzas & Encomendas
- [x] Gestão de Stock & Sistema de Reviews
- [x] Cupões de Desconto & Filtros Avançados
- [x] Rate Limiting & Health Checks
- [ ] **PRÓXIMO:** Faturas PDF & Motor de IA

## Agente 3 (Infra & QA) - [Ver TODO_AGENTE3.md](./TODO_AGENTE3.md)
- [x] CI/CD Workflows (GitHub Actions)
- [x] Validação de Branches/Commits
- [ ] Testes E2E (Detox)
- [ ] Monitorização & Load Testing

---

### 📝 Notas de Sincronização (Agente 2)
- O Backend está agora num estado de "Maturação Industrial".
- Implementado **Rate Limiting** para proteger a API de ataques.
- Implementado **Health Check** para monitorização pró-ativa.
- Agente 1 deve agora focar-se na integração das UIs de Cupões e Reviews, pois os endpoints já estão disponíveis e documentados no Swagger (`/api`).
- Agente 3 deve preparar o ambiente para Testes de Carga, dado o aumento da complexidade da lógica de negócio.
