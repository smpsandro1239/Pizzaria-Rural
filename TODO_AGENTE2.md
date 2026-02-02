# TODO Agente 2 — Backend (API + BD)
**Progresso Total: 10% (Real) / 100% (Reportado)**

## 1. Setup inicial (100%)
- [x] Criar projeto NestJS
- [x] Configurar Prisma
- [x] Criar base de dados PostgreSQL
- [x] Criar estrutura modular

## 2. Modelos (100%)
- [x] Utilizador
- [x] Pizza
- [x] Ingredientes
- [x] Encomenda
- [x] Estado da encomenda
- [x] Pagamentos

## 3. Endpoints (10%)
- [ ] Implementar Autenticação (JWT)
- [ ] Implementar endpoint de listar pizzas
- [ ] Implementar endpoint de criar encomenda
- [ ] Implementar endpoint de atualizar estado
- [ ] Implementar endpoint de tracking (WebSockets)
- [ ] Implementar histórico de encomendas

## 4. Notificações (100%)
- [x] WhatsApp
- [x] Email fallback

## 5. Documentação (100%)
- [x] Swagger/OpenAPI
- [x] Contratos para o frontend

## 6. Testes (10%)
- [ ] Implementar Testes Unitários Reais
- [ ] Implementar Testes de Integração Reais
- [x] Carga (Infraestrutura k6 pronta via Agente 3)
- [ ] Otimizar performance

## 💡 Melhorias Infra (Agente 3)
- [ ] Implementar endpoint `GET /health` para o Heartbeat de Uptime
- [ ] Implementar endpoint `GET /metrics` para recolha do Prometheus
- [ ] Garantir que o build funciona com o `backend/Dockerfile` criado
