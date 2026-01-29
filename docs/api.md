# Documentação da API — Pizzaria Rural

A API é construída com NestJS e segue os princípios REST.

## 1. Base URL
- **Local**: `http://localhost:3000`
- **Staging**: `https://api-staging.pizzaria-rural.com`

## 2. Autenticação
A maioria dos endpoints requer um token JWT no header `Authorization`.

```http
Authorization: Bearer <seu_token>
```

## 3. Endpoints Principais (Planeados)

### 3.1 Pizzas
- `GET /api/pizzas`: Lista todas as pizzas.
- `GET /api/pizzas/:id`: Detalhes de uma pizza específica.

### 3.2 Encomendas
- `POST /api/orders`: Cria uma nova encomenda.
- `GET /api/orders/:id`: Consulta o estado de uma encomenda.
- `GET /api/orders/user/:userId`: Histórico de encomendas do utilizador.

### 3.3 Autenticação
- `POST /api/auth/login`: Solicita código de acesso.
- `POST /api/auth/verify`: Verifica código e devolve token JWT.

## 4. Documentação Interativa
Quando o backend está a correr, podes aceder ao Swagger UI em:
`http://localhost:3000/api/docs`
