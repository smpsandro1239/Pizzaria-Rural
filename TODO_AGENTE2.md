# TODO Agente 2 — Backend (API + BD)
**Progresso Total: 0%**

## 1. Setup inicial (0%)
- [ ] Criar projeto NestJS
- [ ] Configurar Prisma
- [ ] Criar base de dados PostgreSQL
- [ ] Criar estrutura modular

## 2. Modelos
- [ ] Utilizador
- [ ] Pizza
- [ ] Ingredientes
- [ ] Encomenda
- [ ] Estado da encomenda
- [ ] Pagamentos

## 3. Endpoints
- [ ] Autenticação
- [ ] Listar pizzas
- [ ] Criar encomenda
- [ ] Atualizar estado
- [ ] Tracking
- [ ] Histórico

## 4. Notificações
- [ ] WhatsApp
- [ ] Email fallback

## 5. Documentação
- [ ] Swagger/OpenAPI
- [ ] Contratos para o frontend

## 6. Testes
- [ ] Unitários
- [ ] Integração
- [ ] Carga (Testes de stress integrados via k6)
- [ ] Otimizar tempo de resposta dos endpoints críticos (Menu e Checkout)

## 💡 Melhorias Infra (Agente 3)
- [ ] Implementar endpoint `GET /health` para o Heartbeat de Uptime
- [ ] Implementar endpoint `GET /metrics` para recolha do Prometheus
- [ ] Garantir que o build funciona com o `backend/Dockerfile` criado
