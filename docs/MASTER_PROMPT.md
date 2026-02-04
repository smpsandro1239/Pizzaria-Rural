# 🧩 Master Prompt: Coordenação Multi-Agente (Pizzaria Rural)

Este documento define o padrão de operação para todos os agentes de IA neste projeto para garantir zero conflitos e progresso sincronizado.

## 🛡️ Antes de Iniciar Qualquer Tarefa
1. **Sincronização:** `git fetch origin && git merge origin/main`.
2. **Leitura:** Analisar `AGENTS.md`, `TODO.md` e o seu respetivo `TODO_AGENTE*.md`.
3. **Verificação:** Verificar na pasta `docs/` se existem novos relatórios de sincronização de outros agentes.

## 📝 Durante o Desenvolvimento
1. **Ownership:** Não edites ficheiros fora da tua zona definida em `AGENTS.md` a menos que estejas a delegar uma tarefa ou a resolver um conflito de integração.
2. **Delegação:** Se a tua feature depende de algo que não é da tua zona:
   - Implementa a UI/Lógica com Mocks.
   - Adiciona a tarefa necessária no TODO do agente responsável.
   - Deixa um relatório em `docs/relatorio_sincronizacao_v[X].md`.

## 🚀 Antes de Submeter o PR
1. **Local Check:** Corre os testes unitários da tua zona (`npm test`).
2. **CI Friendly:** Garante que o PR não excede 2000 linhas se possível.
3. **PT-PT:** Garante que todos os comentários, documentação e commits estão em Português de Portugal.
4. **Relato:** O commit message deve detalhar:
   - O que realizaste.
   - O que falta (em % e texto).
   - O que delegaste a outros agentes.

## 🤖 Prompt de Referência para Agentes
> "Sou o Agente [X]. Realizei [TAREFA] atingindo [Y]% do meu progresso. Deleguei [TAREFA_Z] ao Agente [W] através do ficheiro TODO_AGENTE[W].md. Sincronizei com a main e não existem conflitos."

---
*Este padrão é obrigatório para manter o projeto a 100% de estabilidade.*
