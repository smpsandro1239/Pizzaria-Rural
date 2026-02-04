```markdown
# 🍕 Pizzaria Rural — Do Campo para a sua Mesa

Uma aplicação mobile premium feita com **React Native (Expo)** para uma experiência autêntica de pedir pizzas tradicionais. Este projeto foi desenvolvido de forma colaborativa por 3 agentes de IA especializados.

Este repositório contém toda a aplicação, dividida em 3 módulos independentes:
- **app-mobile/** — Aplicação móvel (Agente 1)
- **backend/** — API e Base de Dados (Agente 2)
- **infra/** — CI/CD, DevOps, QA e Documentação (Agente 3)

---

## 🚀 Jornada do Utilizador (Tour Visual)

Abaixo pode ver o fluxo completo da aplicação, desde a descoberta até à entrega.

### 1. Início e Menu
<table>
  <tr>
    <td><img src="docs/screenshots/01_home.png" width="300" alt="Home" /><br /><b>Início:</b> Destaques e Favoritos</td>
    <td><img src="docs/screenshots/02_menu.png" width="300" alt="Menu" /><br /><b>Menu:</b> Categorias e Filtros</td>
  </tr>
</table>

### 2. Escolha e Personalização
<table>
  <tr>
    <td><img src="docs/screenshots/03_detalhe.png" width="300" alt="Detalhe" /><br /><b>Detalhe:</b> Origem dos ingredientes e Recomendações</td>
    <td><img src="docs/screenshots/04_checkout.png" width="300" alt="Checkout" /><br /><b>Checkout:</b> Resumo e Resgate de Pontos</td>
  </tr>
</table>

### 3. Acompanhamento e Suporte
<table>
  <tr>
    <td><img src="docs/screenshots/05_tracking.png" width="300" alt="Tracking" /><br /><b>Tracking:</b> Estado em tempo real</td>
    <td><img src="docs/screenshots/07_suporte.png" width="300" alt="Suporte" /><br /><b>Suporte:</b> Chat direto com a aldeia</td>
  </tr>
</table>

### 4. Gestão de Perfil
<table>
  <tr>
    <td><img src="docs/screenshots/06_conta.png" width="300" alt="Conta" /><br /><b>Fidelidade:</b> Histórico e Pontos</td>
    <td><img src="docs/screenshots/08_moradas.png" width="300" alt="Moradas" /><br /><b>Moradas:</b> Gestão de endereços favoritos</td>
  </tr>
</table>

---

## 🛠️ Stack Tecnológica

- **Frontend:** React Native, Expo, Reanimated, Moti, Zustand, Axios.
- **Backend:** NestJS, Prisma, PostgreSQL, JWT, WebSockets (Socket.io).
- **Infra:** Docker, GitHub Actions (CI/CD), Vercel/Render.

---

## 🤖 Equipa de Agentes e Workflow

O projeto é desenvolvido por **3 agentes independentes**, cada um com responsabilidades claras para evitar conflitos.

### Responsabilidades
- **Agente 1 (Frontend):** Responsável por toda a UI/UX, animações e integração mobile.
- **Agente 2 (Backend):** Responsável pela lógica de negócio, API REST, WebSockets e base de dados.
- **Agente 3 (Infra):** Responsável pela automação (GitHub Actions), deploy, qualidade de código e documentação.

### 🪵 Estrutura de Branches
Para garantir um fluxo de trabalho organizado, o uso das branches é estritamente controlado pelo nosso Orquestrador:

- `main` — Produção (Protegida)
- `frontend-dev` — Desenvolvimento do Agente 1
- `backend-dev` — Desenvolvimento do Agente 2
- `infra-dev` — Desenvolvimento do Agente 3

> **Nota:** Cada agente só deve fazer commits na sua branch específica. Pull Requests para branches fora deste padrão serão rejeitados automaticamente.

---

## 📊 Progresso do Projeto

| Componente | Progresso | Responsável |
| :--- | :---: | :--- |
| **Frontend App** | 99% | Agente 1 |
| **Backend API** | 100% | Agente 2 |
| **Infraestrutura** | 55% | Agente 3 |
| **Geral** | **85%** | --- |

---

## 📖 Como Executar

### Pré-requisitos
- Node.js instalado.
- Docker (para o Banco de Dados local).

### Frontend (App Mobile)
```bash
cd app-mobile
npm install
npx expo start
```

### Backend (API)
```bash
cd backend
npm install
npx prisma generate
npm run start:dev
```

---

## 🧩 Contribuição

Toda a aplicação está escrita em **PT‑PT** e todos os commits devem seguir o padrão definido em `CONTRIBUTING.md`.

---
*Pizzaria Rural — Sabor tradicional com tecnologia moderna.*
```