# Integração dos 3 Agentes — Pizzaria Rural

Este documento descreve como o trabalho dos 3 agentes se encaixa para formar o sistema completo.

## 🤝 Fluxo de Colaboração

### 1. Agente 2 (Backend) → Agente 1 (Frontend)
- O Agente 2 fornece a **URL da API** (Local ou Render) e o contrato **OpenAPI**.
- O Agente 1 consome estes endpoints para dar funcionalidade à app.
- **Ponto de Encaixe**: `app-mobile/src/api/client.ts`.

### 2. Agente 1 (Frontend) → Agente 3 (Infra)
- O Agente 1 fornece os requisitos de build para a app.
- O Agente 3 configura a pipeline de **EAS Build** (Expo) e testes de performance.
- **Ponto de Encaixe**: `.github/workflows/frontend-ci.yml`.

### 3. Agente 2 (Backend) → Agente 3 (Infra)
- O Agente 2 deve implementar endpoints de saúde e métricas.
- O Agente 3 configura o **Heartbeat** e o **Grafana** para monitorizar estes endpoints.
- **Ponto de Encaixe**: `infra/check_health.sh` e `infra/prometheus.yml`.

## 🚀 Estado de Prontidão (Ready for Action)

- **Infraestrutura**: ✅ 92% (Pronta para suportar dev)
- **Backend**: 🏗️ 0% (A aguardar Agente 2)
- **Frontend**: 🏗️ 0% (A aguardar Agente 1)

## 📋 Necessidades Imediatas do Agente 3
Para que a automação seja 100% eficaz, o Agente 3 precisa que:
1. **Agente 2** implemente `GET /health` e `GET /metrics`.
2. **Agente 1** configure as variáveis de ambiente base para apontar para o URL de produção: `https://pizzaria-rural-backend.onrender.com`.
