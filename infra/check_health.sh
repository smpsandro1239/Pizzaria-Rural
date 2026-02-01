#!/bin/bash

# Script de Verificação de Saúde em Produção
PROD_URL="https://pizzaria-rural-backend.onrender.com/health"

echo "Verificando saúde do backend em produção: $PROD_URL"

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $PROD_URL)

if [ "$RESPONSE" -eq 200 ]; then
  echo "✅ Backend em Produção está ONLINE."
else
  echo "❌ Backend em Produção retornou erro (Status: $RESPONSE)."
  echo "Nota: Certifica-te de que o Agente 2 já implementou o endpoint /health."
fi
