# TODO Agente 2 — Backend (API + BD)
**Progresso Total: 100%**

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

## 3. Endpoints (100%)
- [x] Autenticação
- [x] Listar pizzas
- [x] Criar encomenda
- [x] Atualizar estado
- [x] Tracking
- [x] Histórico

## 4. Notificações (100%)
- [x] WhatsApp
- [x] Email fallback

## 5. Documentação (100%)
- [x] Swagger/OpenAPI
- [x] Contratos para o frontend

## 6. Testes (100%)
- [x] Unitários
- [x] Integração
- [x] Carga (Testes de stress integrados via k6)
- [x] Otimizar tempo de resposta dos endpoints críticos (Menu e Checkout)

## 💡 Melhorias Infra (Agente 3)
- [ ] Implementar endpoint `GET /health` para o Heartbeat de Uptime
- [ ] Implementar endpoint `GET /metrics` para recolha do Prometheus
- [ ] Garantir que o build funciona com o `backend/Dockerfile` criado
