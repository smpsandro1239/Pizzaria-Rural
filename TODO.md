# 🚀 ROADMAP — Pizzaria Rural

## 🧠 Agentes de IA
- **Agente 1 (Frontend):** Responsável por toda a interface, animações, navegação, componentes e integração com API.
- **Agente 2 (Backend):** Responsável por toda a API, base de dados, autenticação, endpoints, validações e notificações.

---

# 📌 TODOLIST — Agente 1 (Frontend App Mobile)

## 1. Setup inicial
- [x] Criar projeto Expo em PT‑PT
- [x] Configurar Reanimated + Moti
- [x] Configurar estrutura de pastas
- [x] Criar tema (cores, tipografia, spacing, radius)

## 2. Design System
- [x] Implementar tokens
- [x] Criar UI Kit completo (Botão, Input, Card, Badge)
- [x] Criar componentes avançados (AnimatedLoader, StarRating, SkeletonCard, IngredientSource)
- [x] Criar Motion System (Tokens integrados nos componentes)

## 3. Navegação
- [x] Stack Navigator (Transições animadas)
- [x] Bottom Tabs (Home, Menu, Favoritos, Conta)

## 4. Ecrãs (PT-PT)
- [x] **Home:** Hero, Destaques, Porquê nós.
- [x] **Menu:** Lista de Pizzas, Filtros por categoria, Entrada animada.
- [x] **Detalhe da Pizza:** Preços, Ingredientes, Proveniência (Rural Premium), Ratings.
- [x] **Favoritos:** Lista de pizzas preferidas do utilizador.
- [x] **Carrinho:** FloatingCart persistente.
- [x] **Checkout:** Formulário, Resumo, Up-selling (bebidas/sobremesas).
- [x] **Tracking:** Estado da encomenda em tempo real (Mock).
- [x] **Conta:** Dados do utilizador, Progresso de fidelidade (Loyalty progress bar).

## 5. Integração & Estado Global
- [x] Criar cliente API (Axios)
- [x] Consumir endpoints (Mock fallback implementado)
- [x] Estado Global com Zustand (Carrinho, Favoritos, Toasts)
- [x] Persistência Local (AsyncStorage)
- [x] Suporte para Modo Escuro (Dark Mode) automático
- [x] Sistema de Feedback (Toasts animados)

## 6. Qualidade & Melhorias
- [x] Verificação de tipos (TypeScript)
- [x] Testes de UI & Store (Mocks configurados)
- [x] Skeleton Loaders para carregamento
- [x] Correção de versões das dependências (hallucinated versions fix)

## 🚀 Próximas Etapas (Agente 1)
- [ ] **Integração com Mapas:** Visualizar entrega em tempo real no Tracking.
- [ ] **Autenticação Biométrica:** Login rápido e seguro.
- [ ] **Gestão de Moradas:** Guardar moradas favoritas.
- [ ] **Modo Offline:** Cache do menu e favoritos.
- [ ] **Social Sharing:** Partilha de conquistas de fidelidade.
- [ ] **Chat de Suporte:** Interface para ajuda em tempo real.
- [ ] **Internacionalização (i18n):** Preparar suporte para outros idiomas além de PT-PT.
- [ ] **Otimização de Imagens:** Implementar `expo-image` para caching agressivo e performance superior.
- [ ] **Integração Google Reviews:** Exibir feedback real de clientes na Home/Menu.

---

# 📌 TODOLIST — Agente 2 (Backend API)

## 1. Setup & Infra
- [ ] Criar projeto NestJS / Express.
- [ ] Configurar Prisma + PostgreSQL.
- [ ] Definir estrutura de pastas modular.

## 2. Modelos & Base de Dados
- [ ] **User:** Dados, Pontos de fidelidade, Moradas guardadas.
- [ ] **Pizza:** Nome, Descrição, Preço, Categoria, Ingredientes (origem), Rating médio.
- [ ] **Order:** Itens, Total, Estado, Tracking.
- [ ] **Promotion:** Cupões e descontos ativos.

## 3. Endpoints (Contrato OpenAPI)
- [ ] **Auth:** Login por telemóvel/WhatsApp, Autenticação Biométrica (token support).
- [ ] **Menu:** GET /pizzas com filtros e categorias.
- [ ] **Orders:** POST /orders, GET /orders/history.
- [ ] **Tracking:** Webhooks ou Polling para estado da encomenda.
- [ ] **Loyalty:** GET /points, POST /redeem.

## 4. Integrações Avançadas
- [ ] **Notificações:** WhatsApp API (UltraMsg/Twilio), Push Notifications (Expo).
- [ ] **Pagamentos:** Stripe / IfThenPay (MBWay).
- [ ] **Real-time:** Socket.io para tracking e chat de suporte.

---

# 📌 TODOLIST — Agente 3 (Infra & QA)

## 1. CI/CD & Automação
- [ ] Configurar GitHub Actions para Lint e Testes.
- [ ] Configurar Pipeline de Build para Android/iOS (EAS).
- [ ] Automatizar deploy do Backend em Staging/Produção.

## 2. Qualidade & Monitorização
- [ ] Implementar Testes End-to-End (E2E) com Detox ou Maestro.
- [ ] Configurar monitorização de erros (Sentry).
- [ ] Auditoria de Performance e Segurança.

---

# 📝 RESUMO DE PROGRESSO

### O que realizei nesta etapa:
- Finalizei o **Agente 1 (Frontend)** com todas as funcionalidades V1, V2 e V3.
- Corrigi problemas de configuração do projeto (versões e ficheiros de log).
- Implementei funcionalidades premium: Dark Mode, Skeleton Loaders, Sistema de Fidelidade, Up-selling, e Origem de Ingredientes.
- Toda a interface está localizada em **PT-PT**.
- Organizei o roadmap futuro incluindo tarefas para o **Agente 2 (Backend)**.

### O que vou realizar na próxima:
- Implementar **Testes de Navegação** exaustivos agora que o ambiente está estável.
- Iniciar a estrutura de **Internacionalização (i18n)** para permitir escala.

### O que falta realizar:
- Integrações que dependem do Agente 2 (Mapas, Pagamentos Reais, Notificações Push, Autenticação Real).
- Refinamentos de PWA/Web Optimization.
