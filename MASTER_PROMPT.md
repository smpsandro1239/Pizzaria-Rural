# 📖 MASTER PROMPT — Pizzaria Rural

Este documento é a fonte única de verdade para todos os Agentes de IA que trabalham neste projeto. Deve ser lido no início de cada sessão.

## 🎯 Objetivo Geral
Criar o ecossistema digital premium da Pizzaria Rural, seguindo o padrão visual da Telepizza.pt, com foco em performance, animações fluidas (Moti/Reanimated) e código industrial.

## 👥 Divisão de Agentes
1. **Agente 1 (Frontend):** Responsável pela App Expo, UI/UX (Telepizza Style), Motion System e integração de APIs.
2. **Agente 2 (Backend):** Responsável por NestJS, Prisma, PostgreSQL, Lógica de Negócio, Endpoints (Pizzas, Banners, Moradas, Massas, Extras) e Socket.io.
3. **Agente 3 (Infra & QA):** Responsável por CI/CD (Orquestrador), Docker, Vercel, Backups, Monitorização (Sentry/Prometheus) e Testes (E2E/Regressão Visual).

## 🛡️ Regras de Ouro (Invioláveis)
- **Linguagem:** Todo o código, comentários, documentação, commits e UI deve estar em **Português de Portugal (PT-PT)**.
- **Sincronização:** Nunca submeter um PR sem atualizar o `TODO.md` global e o relatório de sincronização na pasta `docs/`.
- **Commits:** Seguir a convenção `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.
- **Zero Conflitos:** O Agente 3 é o guardião final da estabilidade do repositório.

## 🔄 Fluxo de Trabalho Integrado
1. **Delegar:** Quando uma tarefa depende de outro agente, adiciona-a ao `TODO_AGENTE[X].md` correspondente.
2. **Validar:** Usar o checklist de sincronização no template de PR.
3. **Comunicar:** Gerar um relatório `docs/relatorio_sincronizacao_v[X].md` a cada etapa significativa.

## 🛠️ Stack Tecnológica
- **Mobile:** React Native, Expo, Zustand, Moti, Reanimated.
- **Backend:** NestJS, Prisma, PostgreSQL, Socket.io, PDFKit.
- **Infra:** GitHub Actions, Docker, Vercel, Playwright, k6.

---
*Assinado: O Orquestrador do Sistema*
