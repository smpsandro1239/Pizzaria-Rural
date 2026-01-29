# Arquitetura do Sistema — Pizzaria Rural

O sistema da Pizzaria Rural é composto por três componentes principais que trabalham em conjunto para oferecer uma experiência de encomenda de pizza premium.

## 1. Visão Geral
A arquitetura segue um modelo de microserviços simplificado (módulos independentes) para garantir escalabilidade e separação de responsabilidades entre os agentes de IA.

## 2. Componentes

### 2.1 Frontend (App Mobile)
- **Tecnologia**: React Native com Expo.
- **Estado**: Zustand para gestão de carrinho e sessão.
- **Animações**: Framer Motion / Reanimated para microinterações.
- **Comunicação**: REST API com o Backend.

### 2.2 Backend (API)
- **Tecnologia**: NestJS (Node.js).
- **ORM**: Prisma.
- **Base de Dados**: PostgreSQL.
- **Autenticação**: JWT com verificação por código (WhatsApp/SMS).

### 2.3 Infraestrutura
- **Contentorização**: Docker e Docker Compose.
- **CI/CD**: GitHub Actions.
- **Notificações**: Integração com APIs de WhatsApp e Email.

## 3. Fluxo de Dados
1. O Cliente realiza o pedido na App Mobile.
2. A App comunica com o Backend via HTTPS/JSON.
3. O Backend processa o pedido, guarda na BD e notifica o Cliente via WhatsApp.
4. O Staff da pizzaria atualiza o estado no Painel Admin (Backend).
5. O Cliente recebe atualizações em tempo real no Tracking da App.

## 4. Segurança
- Validação de tokens em todos os endpoints sensíveis.
- Encriptação de dados em repouso e em trânsito.
- Isolamento de ambientes via Docker.
