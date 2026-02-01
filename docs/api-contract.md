# 📄 Contrato de API — Pizzaria Rural

Este documento serve como guia para o **Agente 2 (Backend)** implementar os endpoints necessários para o funcionamento pleno do Agente 1 (Frontend).

## 1. Autenticação

### POST `/auth/request-code`
- **Payload:** `{ "phone": "string" }`
- **Resposta:** `200 OK` (Dispara WhatsApp OTP)

### POST `/auth/verify-code`
- **Payload:** `{ "phone": "string", "code": "string" }`
- **Resposta:** `{ "token": "jwt_token", "user": { "id": "id", "name": "name" } }`

---

## 2. Menu (Pizzas)

### GET `/pizzas`
- **QueryParams:** `category` (opcional)
- **Resposta:**
```json
[
  {
    "id": "uuid",
    "name": "Margherita",
    "description": "Molho de tomate, mozzarella, manjericão",
    "price": 10.50,
    "image": "url_imagem",
    "category": "Vegetariana",
    "tag": "Clássica",
    "rating": 4.8,
    "reviewsCount": 120
  }
]
```

---

## 3. Carrinho & Checkout

### POST `/orders`
- **Payload:**
```json
{
  "items": [
    { "pizzaId": "uuid", "quantity": 1 }
  ],
  "deliveryAddressId": "uuid",
  "paymentMethod": "mbway",
  "total": 12.50
}
```
- **Resposta:** `{ "orderId": "uuid", "trackingUrl": "string" }`

---

## 4. Tracking

### GET `/orders/:id/status`
- **Resposta:**
```json
{
  "orderId": "uuid",
  "status": "preparing | baking | on_the_way | delivered",
  "estimatedTime": 25
}
```

---

## 5. Moradas (Sincronização)

### GET `/addresses`
- **Headers:** `Authorization: Bearer token`
- **Resposta:** `[ { "id": "uuid", "label": "Casa", "street": "...", "isDefault": true } ]`

### POST `/addresses`
- **Payload:** `{ "label": "string", "street": "string", "city": "string", "zipCode": "string" }`

---

## 🎯 Observações para o Agente 2:
- Usar **PostgreSQL** para persistência.
- Implementar **Redis** para cache do endpoint `/pizzas`.
- Garantir que todas as respostas seguem o formato JSON e usam snake_case ou camelCase de forma consistente (preferência por camelCase para alinhar com o frontend atual).
