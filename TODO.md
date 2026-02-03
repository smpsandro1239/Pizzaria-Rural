# 🚀 ROADMAP GLOBAL — Pizzaria Rural

Este ficheiro serve como ponto central de sincronização entre os 3 agentes e o utilizador.

## 📊 Estado Geral do Projeto: 76%

### 🧠 Agentes de IA
- **Agente 1 (Frontend Mobile):** Responsável pela App Expo, UI/UX e integração. [90%]
- **Agente 2 (Backend API):** Responsável pelo NestJS, PostgreSQL, Prisma e Lógica de Negócio. [100%]
- **Agente 3 (Infra & QA):** Responsável pelo CI/CD, Docker, Testes E2E e Monitorização. [40%]

---

## 📌 Resumo de Atividades

### Agente 1 (Frontend) - [Ver TODO_AGENTE1.md](./TODO_AGENTE1.md)
- **Status:** V1 e V2 concluídas. App funcional com mocks e integração base.
- **Foco Atual:** Melhorias de UX (Animações, Recomendações) e Integrações Reais.

### Agente 2 (Backend) - [Ver TODO_AGENTE2.md](./TODO_AGENTE2.md)
- **Status:** API de Produção concluída. Base de dados e Auth prontos.
- **Foco Atual:** Manutenção e novas features (PDFs, IA).

### Agente 3 (Infra & QA) - [Ver TODO_AGENTE3.md](./TODO_AGENTE3.md)
- **Status:** Workflows de CI básicos configurados.
- **Foco Atual:** Automatização de Builds Mobile e Monitorização (Sentry).

---

## 🤝 Sincronização entre Agentes

- **Necessidade Atual:** Agente 1 precisa que o Agente 3 configure o deploy do Backend num ambiente acessível (Vercel/Render) para remover os Mocks da App.
- **Necessidade Atual:** Agente 2 precisa de feedback do Agente 1 sobre a estrutura dos novos endpoints de IA.

---

## 💡 Próximas Grandes Metas
1. **Lançamento Beta:** App Mobile ligada ao Backend real em staging.
2. **Sistema de Pagamentos Real:** Integração Stripe/IfThenPay em modo live.
3. **Monitorização:** Sentry + Datadog ativos em todos os ambientes.
