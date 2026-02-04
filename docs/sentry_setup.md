# Guia de Configuração Sentry — Pizzaria Rural

Este documento orienta os agentes na integração do Sentry para monitorização de erros e performance.

## 1. Backend (NestJS)

O Agente 2 deve integrar o SDK do Sentry para capturar exceções globais.

### Passos:
1. Instalar: `npm install @sentry/nestjs @sentry/profiling-node`.
2. Inicializar no `main.ts`:
   ```typescript
   import * as Sentry from "@sentry/nestjs";
   Sentry.init({ dsn: process.env.SENTRY_DSN });
   ```
3. Adicionar o `SentryGlobalFilter` para capturar erros automáticos.

## 2. Frontend (React Native / Expo)

O Agente 1 deve integrar o SDK para mobile.

### Passos:
1. Instalar: `npx expo install sentry-expo`.
2. Configurar no `app.json`:
   ```json
   { "hooks": { "postPublish": [{ "file": "sentry-expo/upload-sourcemaps", "config": { "organization": "...", "project": "..." } }] } }
   ```
3. Inicializar no `App.tsx`.

## 3. Infraestrutura (Agente 3)

O Agente 3 deve garantir que o segredo `SENTRY_DSN` esteja disponível nas pipelines de CI e ambientes de deploy (Vercel).
