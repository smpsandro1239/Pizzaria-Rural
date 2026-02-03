# 📌 TODOLIST — Agente 1 (Frontend App Mobile)

## 📊 Progresso: 90%

### 1. Setup inicial
- [x] Criar projeto Expo em PT‑PT
- [x] Configurar Reanimated + Moti
- [x] Configurar estrutura de pastas
- [x] Criar tema (cores, tipografia, spacing, radius)

### 2. Design System
- [x] Implementar tokens
- [x] Criar UI Kit completo (Botão, Input, Card, Badge)
- [x] Criar componentes avançados (AnimatedLoader, StarRating, SkeletonCard, IngredientSource)
- [x] Criar Motion System (Tokens integrados nos componentes)

### 3. Navegação
- [x] Stack Navigator (Transições animadas)
- [x] Bottom Tabs (Home, Menu, Favoritos, Conta)

### 4. Ecrãs (PT-PT)
- [x] **Home:** Hero, Destaques, Porquê nós.
- [x] **Menu:** Lista de Pizzas, Filtros por categoria, Entrada animada.
- [x] **Detalhe da Pizza:** Preços, Ingredientes, Proveniência (Rural Premium), Ratings.
- [x] **Favoritos:** Lista de pizzas preferidas do utilizador.
- [x] **Carrinho:** FloatingCart persistente.
- [x] **Checkout:** Formulário, Resumo, Up-selling (bebidas/sobremesas).
- [x] **Tracking:** Estado da encomenda em tempo real (Mock).
- [x] **Conta:** Dados do utilizador, Progresso de fidelidade (Loyalty progress bar).

### 5. Integração & Estado Global
- [x] Criar cliente API (Axios)
- [x] Consumir endpoints (Mock fallback implementado)
- [x] Estado Global com Zustand (Carrinho, Favoritos, Toasts)
- [x] Persistência Local (AsyncStorage)
- [x] Suporte para Modo Escuro (Dark Mode) automático
- [x] Sistema de Feedback (Toasts animados)

### 6. Qualidade & Melhorias
- [x] Verificação de tipos (TypeScript)
- [x] Testes de UI & Store (Mocks configurados)
- [x] Skeleton Loaders para carregamento
- [x] Correção de versões das dependências

### 🚀 Próximas Etapas (Agente 1)
- [ ] **Integração com Mapas:** Visualizar entrega em tempo real no Tracking.
- [ ] **Autenticação Biométrica:** Login rápido e seguro.
- [ ] **Gestão de Moradas:** Guardar moradas favoritas.
- [ ] **Otimização de Imagens:** Implementar `expo-image` para caching agressivo.
- [ ] **Lottie Animations:** Adicionar animações vetoriais no Tracking e Sucesso.
- [ ] **Notificações em Tempo Real:** Escutar mudanças de estado da encomenda via WebSockets.
- [ ] **Acessibilidade:** Auditoria completa (VoiceOver/TalkBack).
