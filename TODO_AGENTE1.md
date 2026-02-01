# TODO Agente 1 — Frontend (App Mobile)

## 1. Setup inicial
- [ ] Criar projeto Expo em PT‑PT
- [ ] Configurar Reanimated + Moti
- [ ] Configurar estrutura de pastas
- [ ] Criar tema (cores, tipografia, spacing, radius)

## 2. Design System
- [ ] Implementar tokens
- [ ] Criar UI Kit completo
- [ ] Criar componentes avançados (Tabs, Modais, Bottom Sheets)
- [ ] Criar Motion System

## 3. Navegação
- [ ] Stack Navigator
- [ ] Bottom Tabs
- [ ] Transições animadas entre ecrãs

## 4. Ecrãs & Funcionalidades
- [ ] **Menu**: Listagem de pizzas com animações
- [ ] **Detalhe da Pizza**: Escolha de **Tamanhos** e **Extras**
- [ ] **Carrinho**: Gestão de itens e cálculo em tempo real
- [ ] **Checkout**: Fluxo multi-passo com aplicação de **Cupões de Desconto**
- [ ] **Checkout**: Opção de usar **Pontos de Fidelização** para desconto (API Pronta)
- [ ] **Checkout**: Integração com **Pagamento por Cartão (Stripe)**
- [ ] **Checkout**: Integração com **Pagamento MBWAY** (API Pronta)
- [ ] **Tracking**: Acompanhamento do estado da encomenda em **Tempo Real (WebSockets)** (Novo: Integrar Socket.io)
- [ ] **Perfil**: Histórico de encomendas e consulta de **Pontos de Fidelização**
- [ ] **Avaliações**: Ecrã para avaliar pizzas e serviço após entrega
- [ ] **Dashboard Admin**: Interface para métricas e gestão (Opcional/Admin)
- [ ] **Gestão de Stock**: Ecrã para Admin listar e repor ingredientes

## 5. Integração com API
- [ ] Criar cliente API (Base URL dinâmica)
- [ ] Autenticação (Login/Registo JWT)
- [ ] Integração com Endpoints de Pizzas, Extras e Cupões
- [ ] Integração com Endpoint de Simulação de Redenção de Pontos
- [ ] Integração com Endpoint de Avaliações
- [ ] Integração com Endpoints de Dashboard e Stock
- [ ] Integração com Endpoints de Pagamento (Stripe e MBWAY)
- [ ] **Conexão WebSocket (Socket.io-client)** para eventos 'orderStatusUpdated' (Novo)
- [ ] Fluxo de criação de encomenda
- [ ] Loading states e Toasts de feedback

## 6. Testes & Qualidade
- [ ] Testes de UI
- [ ] Testes de navegação
- [ ] Verificação de acessibilidade
