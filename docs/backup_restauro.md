# Estratégia de Backup e Restauro — Pizzaria Rural

Garantir a integridade e disponibilidade dos dados é crítico para a operação da Pizzaria Rural.

## 1. Tipos de Backup

### 1.1 Backup Diário (Automático)
- **O que**: Dump completo da base de dados PostgreSQL.
- **Quando**: Todos os dias às 03:00.
- **Onde**: Armazenamento em Cloud (ex: S3, Google Cloud Storage) ou volume externo persistente.

### 1.2 Backup Pontual
- Realizado manualmente antes de migrações críticas de base de dados.

## 2. Procedimento de Backup (Manual)
Para realizar um backup manual do contentor PostgreSQL:

```bash
docker exec -t pizzaria-rural-db pg_dumpall -c -U jules > backup_$(date +%Y-%m-%d_%H-%M-%S).sql
```

## 3. Procedimento de Restauro
Para restaurar a base de dados a partir de um ficheiro SQL:

```bash
cat backup_ficheiro.sql | docker exec -i pizzaria-rural-db psql -U jules -d pizzaria_rural
```

## 4. Retenção
- Backups diários: manter por 30 dias.
- Backups mensais: manter por 1 ano.

## 5. Automação (Script Sugerido)
Um script `infra/backup_db.sh` pode ser configurado num Cron Job:

```bash
#!/bin/bash
BACKUP_DIR="/caminho/para/backups"
TIMESTAMP=\$(date +"%Y%m%d%H%M%S")
FILENAME="db_backup_\$TIMESTAMP.sql"

docker exec pizzaria-rural-db pg_dump -U jules pizzaria_rural > \$BACKUP_DIR/\$FILENAME

# Remover backups com mais de 30 dias
find \$BACKUP_DIR -type f -mtime +30 -name "*.sql" -delete
```

## 6. Verificação
Pelo menos uma vez por mês, deve ser realizado um teste de restauro num ambiente de Sandbox para garantir que os ficheiros de backup são válidos.
