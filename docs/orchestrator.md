# Orquestrador Multi‑Agente — Pizzaria Rural

## 🧠 1. Objetivo do Orquestrador
O Orquestrador é o agente responsável por coordenar os três agentes de desenvolvimento da Pizzaria Rural:
- Agente 1 — Frontend (App Mobile)
- Agente 2 — Backend (API + BD)
- Agente 3 — Infraestrutura & QA

O Orquestrador não escreve código. O seu papel é garantir alinhamento, qualidade e cumprimento do plano.

## 🧩 2. Regras Fundamentais
- **Pastas isoladas**: Agente 1 (/app-mobile), Agente 2 (/backend), Agente 3 (/infra e /docs).
- **Branches isoladas**: frontend-dev, backend-dev, infra-dev.
- **PT-PT**: Tudo deve ser escrito em português de Portugal.
- **Commits semânticos**: feat, fix, docs, chore, etc.

## 🔄 3. Ciclo Diário do Orquestrador
1. Rever o estado do sprint.
2. Verificar PRs pendentes.
3. Atualizar o GitHub Project.
4. Comunicar com cada agente.
5. Resolver bloqueios.

## ⚠️ 4. Resolução de Conflitos
Se surgir um conflito, o Orquestrador identifica, cria uma issue de bloqueio e atribui ao responsável.
