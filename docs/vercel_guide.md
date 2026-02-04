# 🚀 Guia de Configuração Vercel (Monorepo)

Para resolver o erro **404: NOT_FOUND** e garantir que tanto o Frontend como o Backend funcionam sob o mesmo domínio:

## 1. Configurações no Dashboard Vercel
1. No projeto `pizzaria-rural`, vai a **Settings > General**.
2. **Root Directory:** Deixa em branco (root).
3. **Build Command:** `cd app-mobile && npm install && npx expo export:web`
4. **Output Directory:** `app-mobile/web-build`
5. **Install Command:** `npm install` (Isto irá usar o `package.json` da raiz que acabei de criar).

## 2. Backend (Serverless Functions)
O ficheiro `vercel.json` na raiz está configurado para redirecionar pedidos de `/api/*` para o backend. Certifica-te que as variáveis de ambiente (`DATABASE_URL`, etc.) estão configuradas no Vercel.

## 3. QR Code
O QR Code gerado no README aponta para o domínio principal. Assim que o build de `app-mobile` for bem sucedido, a aplicação web será visível.
