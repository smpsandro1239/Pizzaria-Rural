# 🚀 ROADMAP GLOBAL — Pizzaria Rural

Este ficheiro serve como ponto central de sincronização entre os 3 agentes e o utilizador.

## 📊 Estado Geral do Projeto: 82%

### 🧠 Agentes de IA
- **Agente 1 (Frontend Mobile):** Responsável pela App Expo, UI/UX e integração. [97%]
- **Agente 2 (Backend API):** Responsável pelo NestJS, PostgreSQL, Prisma e Lógica de Negócio. [100%]
- **Agente 3 (Infra & QA):** Responsável pelo CI/CD, Docker, Testes E2E e Monitorização. [45%]

---

## 📌 Resumo de Atividades

### Agente 1 (Frontend) - [Ver TODO_AGENTE1.md](./TODO_AGENTE1.md)
- **Status:** V2 Finalizada. Implementada Gestão de Moradas, Biometria e Tracking Dinâmico.
- **Foco Atual:** Fidelidade no Checkout e Sistema de Avaliações.

### Agente 2 (Backend) - [Ver TODO_AGENTE2.md](./TODO_AGENTE2.md)
- **Status:** Produção pronta.
- **Foco Atual:** Suporte a Endpoints de Moradas e integração de PDFs.

### Agente 3 (Infra & QA) - [Ver TODO_AGENTE3.md](./TODO_AGENTE3.md)
- **Status:** CI Estável.
- **Foco Atual:** Configuração de API Keys (Maps) e Sentry.

---

## 🤝 Sincronização entre Agentes

- **🚨 ALERTA (Agente 1):** Bloqueado no Mapa de Tracking por falta de API Key (Agente 3).
- **💡 SUGESTÃO (Agente 1 -> Agente 2):** Integrar o motor de IA no endpoint de recomendações para o Frontend consumir dinamicamente.

---

## 💡 Próximas Grandes Metas
1. **Beta Público:** App ligada ao Backend real em staging (Vercel).
2. **Sistema de Avaliações:** Fluxo completo desde a App até à DB.
3. **Monitorização:** Ativação de alertas de performance.
