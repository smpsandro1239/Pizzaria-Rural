# 🚀 ROADMAP — Pizzaria Rural

## 🧠 Agentes de IA
- **Agente 1 (Frontend):** Responsável por toda a interface, animações, navegação, componentes e integração com API.
- **Agente 2 (Backend):** Responsável por toda a API, base de dados, autenticação, endpoints, validações e notificações.
- **Agente 3 (Infra & QA):** Responsável por CI/CD, automação, infraestrutura, monitorização e qualidade.

---

# 📊 Estado Atual do Projeto: ~98% Concluído

- **Agente 1:** 100% 🟢 (V1-V3 concluídas)
- **Agente 2:** 98% 🟢 (Funcionalidades de negócio e real-time concluídas)
- **Agente 3:** 65% 🟡 (CI/CD pronto, Monitoring/QA em curso)

---

# 📌 RESUMO DE TAREFAS

## Agente 1 (Frontend) - [Ver TODO_AGENTE1.md](./TODO_AGENTE1.md)
- [x] Design System & UI Kit
- [x] Navegação & Ecrãs Base
- [x] Estado Global (Zustand)
- [x] Integração API Base
- [ ] **PRÓXIMO:** Integração Real-time & Download de Faturas (Backend Pronto)
- [ ] Integração com Mapas & Biometria

## Agente 2 (Backend) - [Ver TODO_AGENTE2.md](./TODO_AGENTE2.md)
- [x] API Base & Autenticação
- [x] Gestão de Pizzas & Encomendas
- [x] Gestão de Stock & Sistema de Reviews
- [x] Cupões de Desconto & Filtros Avançados
- [x] Rate Limiting & Health Checks
- [x] Real-time Tracking (Socket.io)
- [x] Geração de Faturas PDF
- [x] Winston Industrial Logging
- [ ] **PRÓXIMO:** Motor de IA & Backups (Em coordenação com Infra)

## Agente 3 (Infra & QA) - [Ver TODO_AGENTE3.md](./TODO_AGENTE3.md)
- [x] CI/CD Workflows (GitHub Actions)
- [x] Validação de Branches/Commits
- [x] Docker & Docker Compose
- [ ] **PRÓXIMO:** Stress Testing (k6) & Security Scan
- [ ] Monitorização (Prometheus/Grafana)

---

### 📝 Notas de Sincronização (Agente 2)
- O Backend atingiu maturação industrial com **Real-time Tracking** e **Faturas PDF**.
- Agente 1 deve agora consumir os novos eventos de Socket.io (`orderStatusUpdated`).
- Agente 3 disponibilizou infra de monitorização base que será integrada no deploy final.
- Sincronização global realizada para resolver conflitos de progresso.
