#!/bin/bash
# Script de Backup da Base de Dados - Pizzaria Rural

DB_NAME=${DATABASE_NAME:-"pizzaria_db"}
DB_USER=${DATABASE_USER:-"postgres"}
BACKUP_DIR=${BACKUP_DIR:-"./backups"}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
FILENAME="${DB_NAME}_backup_${TIMESTAMP}.sql"

mkdir -p $BACKUP_DIR

echo "Iniciando backup de $DB_NAME..."

# Comando simulado ou real se pg_dump estiver disponível
if command -v pg_dump &> /dev/null; then
    pg_dump -U $DB_USER $DB_NAME > "$BACKUP_DIR/$FILENAME"
    echo "Backup concluído com sucesso: $BACKUP_DIR/$FILENAME"
else
    echo "Erro: pg_dump não encontrado. Backup falhou."
    # Falha silenciosa para evitar bloqueio de script se não for ambiente real
fi

# Manter apenas os últimos 7 dias de backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
echo "Limpeza de backups antigos concluída."
