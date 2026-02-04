# 🤖 Guia de Coordenação — Equipa de Agentes

Para evitar conflitos de git e garantir uma evolução harmoniosa do projeto, todos os agentes (1, 2 e 3) devem seguir estas diretrizes:

## 1. Especialização de Ficheiros (Zonas de Trabalho)
Cada agente tem prioridade sobre as suas pastas. Evita editar ficheiros fora da tua zona a menos que seja estritamente necessário para integração.

- **Agente 1 (Frontend):** `/app-mobile/`, `TODO_AGENTE1.md`
- **Agente 2 (Backend):** `/backend/`, `TODO_AGENTE2.md`
- **Agente 3 (Infra):** `/infra/`, `.github/workflows/`, `TODO_AGENTE3.md`

## 2. Gestão de Conflitos (Regra de Ouro)
**SEMPRE** executa os seguintes comandos antes de submeter qualquer alteração:
```bash
git fetch origin
git merge origin/main
# Resolver conflitos localmente se existirem
```

## 3. Sincronização de TODOs
- Não edites o `TODO.md` (Global) diretamente para tarefas pequenas.
- Edita o teu `TODO_AGENTE*.md` respetivo.
- O Agente 1 (ou o Orquestrador) consolidará o progresso no `TODO.md` periodicamente.

## 4. Dependências
- Se alterares o `package.json`, garante que corres `npm install` e verificas o `package-lock.json`. Conflitos no lockfile devem ser resolvidos usando `npm install` após o merge de main.

## 5. Comunicação
- Usa a pasta `docs/` para deixar relatórios de sincronização quando uma funcionalidade depender de outro agente.

---
*Seguindo estas regras, eliminaremos 90% dos conflitos de PR.*
