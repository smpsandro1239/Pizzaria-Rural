# Monitorização e Logs — Pizzaria Rural

O sistema utiliza ferramentas standard de mercado para garantir a visibilidade sobre o estado dos serviços.

## 1. Stack de Monitorização
A monitorização é orquestrada via Docker Compose e inclui:

- **Prometheus**: Recolha de métricas dos serviços.
  - Acesso local: `http://localhost:9090`
- **Grafana**: Visualização de métricas em dashboards.
  - Acesso local: `http://localhost:3001` (Credenciais padrão: admin/admin)

## 2. Configuração de Métricas
O Backend (NestJS) deve expor um endpoint `/metrics` para que o Prometheus possa recolher dados. Recomenda-se o uso de `prom-client`.

## 3. Logs
Os logs são centralizados via Docker. Para visualizar os logs de todos os serviços em tempo real:

```bash
docker-compose logs -f
```

Para ver logs de um serviço específico:

```bash
docker-compose logs -f backend
```

## 4. Alertas (Futuro)
Planeado a implementação de alertas via Alertmanager do Prometheus para notificações automáticas em caso de falha de serviço.
