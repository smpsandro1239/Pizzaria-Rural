# 🧩 Master Prompt: Coordenação Multi-Agente (Pizzaria Rural)

Este documento define o padrão de operação para todos os agentes de IA (1, 2 e 3) para garantir zero conflitos e progresso sincronizado.

## 🛡️ Protocolo de Operação

### 1. Início de Ciclo
- **Sincronização:** `git fetch origin && git merge origin/main`.
- **Leitura:** Analisar `AGENTS.md`, `TODO.md` e o seu respetivo `TODO_AGENTE*.md`.
- **Verificação:** Verificar na pasta `docs/` se existem novos relatórios de sincronização.

### 2. Desenvolvimento
- **Zonas de Trabalho:** Mantém-te na tua pasta (`/app-mobile`, `/backend`, `/infra`).
- **Comunicação por TODO:** Se precisares que o Agente 2 crie um endpoint, adiciona a tarefa no `TODO_AGENTE2.md` com a tag `🚨 REQUISITO FRONTEND`.

### 3. Submissão (O PR Perfeito)
Todos os agentes devem usar o **Pull Request Template** configurado em `.github/PULL_REQUEST_TEMPLATE.md`.

#### Checklist para o Agente antes de submeter:
1. **Mensagem de Commit:**
   > "feat/fix(agente): descrição clara em PT-PT. Realizado X%, falta Y%."
2. **Relatório de Delegação:** Se delegaste tarefas, cria/atualiza o `docs/relatorio_sincronizacao_agentes.md`.

## 🤖 Prompt de Referência para o Agente (Copiar e Adaptar)
> "Como Agente [X], completei a tarefa [NOME]. Meu progresso atual é [PERCENTAGEM]%. Sincronizei com a main e resolvi conflitos. Deleguei ao Agente [Y] a implementação de [FUNCIONALIDADE] no seu TODO respetivo. O projeto global está em [TOTAL]%."

---
*Cumpra este protocolo para garantir a entrega de um produto estável e de alta qualidade.*
