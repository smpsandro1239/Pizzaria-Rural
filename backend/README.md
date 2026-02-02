# 🍕 Pizzaria Rural — Backend (API)

Este é o backend da **Pizzaria Rural**, desenvolvido com **NestJS**, **Prisma** e **PostgreSQL**.

## 🚀 Tecnologias

- **NestJS**: Framework Node.js para aplicações escaláveis.
- **Prisma**: ORM para interação com a base de dados.
- **SQLite/PostgreSQL**: Base de dados (SQLite em desenvolvimento, PostgreSQL em produção).
- **JWT & Passport**: Autenticação segura.
- **Socket.io**: Tracking de encomendas em tempo real.
- **Winston**: Sistema de logs industriais.
- **Prometheus**: Métricas de performance.
- **Swagger**: Documentação OpenAPI.

## 📦 Instalação

```bash
$ npm install
```

## 🛠️ Base de Dados

Gerar o cliente Prisma e aplicar migrações:

```bash
$ npx prisma generate
$ npx prisma migrate dev
```

Popular a base de dados com dados iniciais:

```bash
$ npx prisma db seed
```

## 🏃 Execução

```bash
# desenvolvimento
$ npm run start:dev

# produção
$ npm run start:prod
```

## 📖 Documentação (Swagger)

A documentação interativa da API está disponível em:
`http://localhost:3000/api`

## 🧪 Testes

```bash
# unitários
$ npm run test

# e2e
$ npm run test:e2e
```

## 📝 Responsabilidades (Agente 2)

- Gestão de Utilizadores e Autenticação.
- Gestão de Menu (Pizzas, Ingredientes, Extras).
- Lógica de Encomendas e Stock.
- Sistema de Fidelização (Pontos).
- Notificações (WhatsApp e Email).
- Integração de Pagamentos (Stripe e MBWAY).
