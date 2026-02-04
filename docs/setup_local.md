# Guia de Setup Local — Pizzaria Rural

Este guia descreve como configurar o ambiente de desenvolvimento local para a Pizzaria Rural.

## Pré-requisitos
- Node.js 20 ou superior
- Docker e Docker Compose
- Git

## 1. Clonar o Repositório
```bash
git clone https://github.com/smpsandro1239/Pizzaria-Rural.git
cd Pizzaria-Rural
```

## 2. Configurar o Backend e Base de Dados
O backend e a base de dados podem ser iniciados rapidamente usando Docker Compose:

```bash
docker-compose up -d
```
Isto irá iniciar:
- PostgreSQL na porta `5432`
- API Backend na porta `3000`

## 3. Configurar o Frontend (App Mobile)
Navega até à pasta `app-mobile` e instala as dependências:

```bash
cd app-mobile
npm install
npx expo start
```
Podes usar o Expo Go no teu telemóvel para visualizar a app.

## 4. Variáveis de Ambiente
- **Google Maps**: `GOOGLE_MAPS_API_KEY` (Necessária para Agente 1 e Agente 3).
Verifica os ficheiros `.env.example` em cada pasta e cria o teu `.env` correspondente.

- **Backend**: `DATABASE_URL`, `JWT_SECRET`, `WHATSAPP_API_KEY`.
- **Frontend**: `EXPO_PUBLIC_API_URL`.

## 5. Comandos Úteis
- `npm run lint`: Verificar erros de estilo.
- `npm test`: Executar testes unitários.
- `docker-compose logs -f`: Ver logs do sistema.
