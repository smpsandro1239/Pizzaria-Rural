# Configuração do Sentry — Pizzaria Rural

O Sentry é utilizado para monitorização de erros e performance em tempo real.

## 1. Backend (NestJS)
Para integrar o Sentry no backend:

1. Instalar dependências:
   ```bash
   npm install --save @sentry/node @sentry/profiling-node
   ```
2. Inicializar no `main.ts`:
   ```typescript
   import * as Sentry from "@sentry/node";

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     integrations: [
       new Sentry.Integrations.Http({ tracing: true }),
     ],
     tracesSampleRate: 1.0,
   });
   ```

## 2. Frontend (React Native)
Para integrar o Sentry no mobile:

1. Instalar dependências:
   ```bash
   npx expo install @sentry/react-native
   ```
2. Configurar no `App.ts`:
   ```javascript
   import * as Sentry from "@sentry/react-native";

   Sentry.init({
     dsn: "SEU_DSN_AQUI",
   });
   ```

## 3. Gestão de Variáveis
- O Agente 3 deve garantir que o `SENTRY_DSN` está configurado no Render e na CI.
