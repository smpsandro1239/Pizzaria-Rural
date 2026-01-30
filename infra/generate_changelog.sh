#!/bin/bash

echo "# Changelog — Pizzaria Rural" > CHANGELOG.md
echo "" >> CHANGELOG.md
echo "## Gerado automaticamente em $(date +'%Y-%m-%d %H:%M:%S')" >> CHANGELOG.md
echo "" >> CHANGELOG.md

echo "### ✨ Funcionalidades (feat)" >> CHANGELOG.md
git log --grep="feat:" --pretty=format:"- %s (%h)" >> CHANGELOG.md
echo "" >> CHANGELOG.md
echo "" >> CHANGELOG.md

echo "### 🐞 Correções (fix)" >> CHANGELOG.md
git log --grep="fix:" --pretty=format:"- %s (%h)" >> CHANGELOG.md
echo "" >> CHANGELOG.md
echo "" >> CHANGELOG.md

echo "### 📝 Documentação (docs)" >> CHANGELOG.md
git log --grep="docs:" --pretty=format:"- %s (%h)" >> CHANGELOG.md
echo "" >> CHANGELOG.md
echo "" >> CHANGELOG.md

echo "### 🛠️ Outros" >> CHANGELOG.md
git log --grep="chore:" --pretty=format:"- %s (%h)" >> CHANGELOG.md
echo "" >> CHANGELOG.md

echo "Changelog gerado com sucesso em CHANGELOG.md"
