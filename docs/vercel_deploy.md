# Guia de Deploy Vercel — Pizzaria Rural

Este guia detalha como realizar o deploy do ecossistema da Pizzaria Rural na plataforma Vercel.

## 1. Backend (API NestJS)

O backend está configurado para correr como uma **Vercel Serverless Function**.

### Passos:
1. Instalar a Vercel CLI: `npm i -g vercel`.
2. Navegar para a pasta `backend`.
3. Executar `vercel`.
4. Configurar as variáveis de ambiente no dashboard da Vercel:
   - `DATABASE_URL`: URL da tua base de dados PostgreSQL.
   - `JWT_SECRET`: Uma string segura para tokens.
   - `WHATSAPP_API_KEY`: Chave para notificações (se aplicável).

### Notas Técnicas:
- O ficheiro `backend/vercel.json` controla as rotas e o build.
- O logger Winston está configurado, mas em ambiente Serverless, os logs de ficheiro (`logs/*.log`) são efêmeros. Recomenda-se usar a consola da Vercel para monitorização.

## 2. Frontend (Web Export)

Embora a app seja React Native (Expo), podes exportar para Web e fazer deploy na Vercel.

### Passos:
1. Navegar para `app-mobile`.
2. Executar `npx expo export:web`.
3. O conteúdo da pasta `web-build` deve ser enviado para um novo projeto na Vercel como "Static Site".

## 3. Base de Dados

Recomenda-se usar o **Vercel Postgres** ou **Supabase** para uma integração mais simples.

1. Cria a base de dados.
2. Obtém a `DATABASE_URL`.
3. Executa as migrações Prisma localmente antes do primeiro deploy:
   ```bash
   cd backend
   npx prisma db push
   ```

## 4. Orquestração

O Agente 3 (Infra) configurou workflows que podem ser estendidos para automatizar estes deploys via GitHub Actions usando o `VERCEL_TOKEN`.
