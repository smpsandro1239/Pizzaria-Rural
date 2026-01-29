# Guia de Deploy — Pizzaria Rural

Este documento descreve o processo de deploy para os diferentes ambientes.

## 1. Estratégia de CI/CD
Utilizamos GitHub Actions para automatizar o deploy.

- **Frontend**: Deploy via Expo Application Services (EAS).
- **Backend**: Deploy via Docker para um serviço de Cloud (ex: Vercel, Heroku, ou VPS própria).

## 2. Ambientes

### 2.1 Staging
- **Trigger**: Push para as branches `-dev`.
- **Objetivo**: Testes de integração e validação pelo Agente 3.

### 2.2 Produção
- **Trigger**: Merge para a branch `main`.
- **Objetivo**: Disponibilização final para os clientes.

## 3. Passos para Deploy Manual (Backend)

1. **Build da Imagem**:
```bash
docker build -t pizzaria-rural-backend ./backend
```

2. **Tag e Push**:
```bash
docker tag pizzaria-rural-backend seu-registo/pizzaria-rural-backend:latest
docker push seu-registo/pizzaria-rural-backend:latest
```

3. **Atualização no Servidor**:
```bash
ssh seu-servidor "docker pull seu-registo/pizzaria-rural-backend:latest && docker-compose up -d"
```

## 4. Deploy do Mobile
O deploy do mobile é feito via Expo:

```bash
cd app-mobile
eas build --platform all
```
