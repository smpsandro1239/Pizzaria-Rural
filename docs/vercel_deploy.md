# Deploy na Vercel — Pizzaria Rural

O backend (NestJS) e o frontend (Expo Web) podem ser alojados gratuitamente na Vercel.

## 1. Deploy do Backend (Serverless)

O backend foi configurado para funcionar como **Vercel Serverless Functions**.

### Configuração
- Ficheiro: `backend/vercel.json`
- Adaptador: `backend/src/main.ts` exporta uma função handler.

### Passos para realizar o deploy:
1. Cria uma conta na [Vercel](https://vercel.com).
2. Instala a CLI da Vercel: `npm i -g vercel`.
3. Navega até à pasta do backend: `cd backend`.
4. Executa o comando: `vercel`.
5. Segue as instruções no terminal (conecta ao teu GitHub).
6. Configura as variáveis de ambiente (`DATABASE_URL`, etc.) no dashboard da Vercel.

## 2. Deploy do Frontend (Web)

Embora o foco seja mobile, o Expo permite gerar uma versão web.

### Passos:
1. Navega até `app-mobile`.
2. Executa: `npx expo export:web`.
3. Faz o deploy da pasta `web-build` para a Vercel ou Netlify.
4. **Recomendação**: Para mobile nativo, continua a usar o **Expo EAS**.

## 3. Benefícios
- **Grátis**: Plano hobby cobre as necessidades iniciais.
- **SSL Automático**: HTTPS por defeito.
- **CI/CD**: Deploy automático em cada push para a branch `main`.

## 4. Ajustes no Código
- O Agente 3 já realizou o setup do `vercel.json` e a adaptação do `main.ts`.
- O Agente 2 deve garantir que as rotas da API não dependem de estado em memória (usar Redis ou DB), pois Serverless é stateless.
