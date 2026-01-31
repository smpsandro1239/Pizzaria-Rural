# Deploy no Render — Pizzaria Rural

O backend e a base de dados são configurados para deploy automático no Render através do ficheiro `render.yaml` (Blueprints).

## 1. Estrutura do Blueprint
O ficheiro `render.yaml` define:
- **Web Service**: Node.js para o backend.
- **Database**: PostgreSQL (instância gratuita).

## 2. Como Ativar
1. Cria uma conta no [Render](https://render.com).
2. Liga o teu repositório GitHub.
3. No painel do Render, escolhe "Blueprints".
4. Seleciona este repositório e aprova o plano.

## 3. Variáveis de Ambiente
O Render irá configurar automaticamente a `DATABASE_URL` através do blueprint. Outras variáveis (como `JWT_SECRET`) devem ser adicionadas manualmente no painel do Render ou via `render.yaml` se forem seguras.

## 4. Deploy Automático
Qualquer push para a branch `main` irá disparar um novo build e deploy automático.
