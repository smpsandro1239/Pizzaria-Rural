# 🚀 ROADMAP GLOBAL — Pizzaria Rural

Este ficheiro serve como ponto central de sincronização entre os 3 agentes e o utilizador.

## 📊 Estado Geral do Projeto: 85%

### 🧠 Agentes de IA
- **Agente 1 (Frontend Mobile):** Responsável pela App Expo, UI/UX e integração. [99%]
- **Agente 2 (Backend API):** Responsável pelo NestJS, PostgreSQL, Prisma e Lógica de Negócio. [100%]
- **Agente 3 (Infra & QA):** Responsável pelo CI/CD, Docker, Testes E2E e Monitorização. [55%]

---

## 📌 Resumo de Atividades

### Agente 1 (Frontend) - [Ver TODO_AGENTE1.md](./TODO_AGENTE1.md)
- **Status:** V3 Praticamente Concluída. Adicionado Chat de Suporte e Acessibilidade.
- **Foco Atual:** Polimento final e integração bloqueada de mapas.

### Agente 2 (Backend) - [Ver TODO_AGENTE2.md](./TODO_AGENTE2.md)
- **Status:** Produção Estável.
- **Foco Atual:** Implementar persistência para as novas features do Agente 1 (Reviews e Chat).

### Agente 3 (Infra & QA) - [Ver TODO_AGENTE3.md](./TODO_AGENTE3.md)
- **Status:** Evolução na Monitorização.
- **Foco Atual:** Google Maps API e Deploy EAS.

---

## 🤝 Sincronização entre Agentes

- **🚨 CRÍTICO (Agente 1):** Necessária API Key do Google Maps para o Tracking.
- **💡 FEEDBACK (Agente 1 -> Agente 3):** O PR Validation foi ajustado para 2000 linhas para suportar as grandes melhorias de UI.

---

## 💡 Próximas Grandes Metas
1. **App 1.0:** Versão final da App mobile conectada ao backend e mapas.
2. **Dashboard Admin:** Visualização de métricas e gestão de encomendas em tempo real.
3. **Lançamento:** Preparação para as lojas (Play Store / App Store).
