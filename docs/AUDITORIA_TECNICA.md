# 🛡️ Auditoria Técnica Completa — Pizzaria Rural

## 1. Análise Geral do Projeto
O projeto **Pizzaria Rural** é uma plataforma de e-commerce de pizzas com uma abordagem premium e minimalista. A arquitetura é baseada num monorepo (embora não configurado formalmente com Lerna/Nx, mas organizado por pastas) contendo:
- **Backend:** NestJS com Prisma ORM.
- **Frontend:** React Native (Expo) com Zustand e Moti.
- **Infraestrutura:** Docker, CI/CD via GitHub Actions e monitorização com Prometheus.

### Tecnologias e Padrões
- **Arquitetura:** Modular no NestJS, State-driven no React Native.
- **Base de Dados:** SQLite (Desenvolvimento) / PostgreSQL (Planeado).
- **Segurança:** Autenticação JWT, Bcrypt para hashing, Throttler para rate limit.
- **Comunicação:** REST API e WebSockets (Socket.io).

---

## 2. Análise Detalhada (Componente a Componente)

### 2.1 Backend (`backend/`)
- **Qualidade de Código:** Elevada. Segue os padrões recomendados do NestJS (Dependency Injection, DTOs, Guards).
- **Pontos Fortes:**
  - Implementação robusta de geração de faturas PDF (`InvoicesService`).
  - Sistema de pontos de fidelidade integrado no fluxo de encomendas.
  - Documentação Swagger bem estruturada.
- **Riscos/Falhas:**
  - **Inconsistência de Dados:** O schema Prisma usa SQLite, mas a documentação refere PostgreSQL. Falta migração para prod.
  - **Lógica de Negócio Incompleta:** O modelo de `Pizza` não suporta múltiplos tamanhos/massas, apesar de ser um requisito de design.
  - **Falta de Validação de Cupões:** Existe o modelo `Coupon`, mas não há lógica de validação no `OrdersService`.

### 2.2 Frontend Mobile (`app-mobile/`)
- **Qualidade de Código:** Muito boa visualmente, mas com lacunas de integração.
- **Pontos Fortes:**
  - UI/UX excecional com animações suaves via `moti`.
  - Gestão de estado limpa com `Zustand`.
  - Tema (`theme/`) altamente customizável e bem organizado.
- **Riscos/Falhas:**
  - **INTEGRAÇÃO CRÍTICA:** O `CheckoutScreen` não comunica com a API. Usa `setTimeout` e dados hardcoded.
  - **Mocks Excessivos:** `TrackingScreen` e `SupportChatScreen` são puramente visuais e não consomem dados reais ou WebSockets de forma funcional.
  - **Funcionalidades em Falta:** O "Configurador Passo-a-Passo" mencionado nos TODOs não está implementado no `PizzaDetailScreen`.

---

## 3. O que está Feito / O que Falta

### ✅ Implementado
- Autenticação (Login/Registo) com JWT.
- Listagem de pizzas e filtragem por destaque.
- Carrinho de compras persistente.
- Geração automática de faturas PDF.
- Estrutura de eventos Socket.io (Backend).
- Dashboard Admin (Funcionalidade base no Menu).

### ❌ Em Falta / Incompleto
- **Integração de Encomendas:** Ligar o Checkout à API real.
- **Real-time Tracking:** Implementar o consumo de eventos Socket.io no Mobile.
- **Gestão de Tamanhos/Extras:** Expandir DB e UI para suportar personalização.
- **Validação de Cupões:** Endpoint `POST /coupons/validate`.
- **Suporte Real:** Persistência de mensagens de chat no Backend.

---

## 4. Problemas Encontrados (Classificação)

| Problema | Gravidade | Impacto | Resolução |
| :--- | :--- | :--- | :--- |
| **Checkout Fake** | 🔴 Crítico | O utilizador não consegue fazer encomendas reais. | Implementar chamada ao `OrdersService` no Checkout. |
| **Divergência DB** | 🟠 Importante | Risco de falha no deploy em produção. | Sincronizar `schema.prisma` para PostgreSQL. |
| **Falta de Reviews** | 🟡 Moderado | Falta de prova social no produto. | Criar `ReviewsModule` no backend. |
| **TODOs Outdated** | ⚪ Cosmético | Confusão na gestão do projeto. | Atualizar `TODO.md` com o estado real. |

---

## 5. Recomendações e Melhorias
1. **Integração Imediata:** Priorizar a ligação do Checkout à API para tornar o projeto funcional.
2. **Escalabilidade de Dados:** Alterar a estrutura de preços para uma tabela `PizzaSize` ou JSONB para suportar a complexidade do menu Telepizza.
3. **Segurança:** Implementar `AddressService` para gerir moradas de utilizadores de forma segura (atualmente é apenas uma string).
4. **DevOps:** Configurar o EAS Build para gerar os APK/IPA reais e validar o deploy no Vercel.

---

## 6. Resumo Final Executivo
- **Estado Atual:** 75% Funcional / 95% Visual.
- **Qualidade Geral:** **B+** (Código limpo, mas faltam "pontes" de integração).
- **Pontos Fortes:** Design System, Animações, Estrutura Backend.
- **Pontos Fracos:** Integração Frontend-Backend em fluxos críticos (Checkout/Tracking).
- **Prioridade:** Ligar o Checkout à API e validar o fluxo de pagamento.
