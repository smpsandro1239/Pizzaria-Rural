#!/bin/bash

# Este script simula o envio de uma notificação para Slack ou Discord
# Deve ser configurado com variáveis de ambiente (webhook URLs)

SERVICE_NAME=$1
STATUS=$2
WORKFLOW_URL=$3

if [ -z "$SLACK_WEBHOOK_URL" ] && [ -z "$DISCORD_WEBHOOK_URL" ]; then
  echo "Aviso: Webhooks de Slack/Discord não configurados. Ignorando notificação."
  exit 0
fi

MESSAGE="🚨 *Falha na Pipeline* 🚨\n*Serviço:* $SERVICE_NAME\n*Estado:* $STATUS\n*Detalhes:* $WORKFLOW_URL"

if [ -n "$SLACK_WEBHOOK_URL" ]; then
  curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"$MESSAGE\"}" $SLACK_WEBHOOK_URL
fi

if [ -n "$DISCORD_WEBHOOK_URL" ]; then
  curl -X POST -H 'Content-type: application/json' --data "{\"content\":\"$MESSAGE\"}" $DISCORD_WEBHOOK_URL
fi

echo "Notificação enviada para $SERVICE_NAME."
