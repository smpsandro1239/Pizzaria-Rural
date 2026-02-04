# 🗺️ Guia: Como obter a Google Maps API Key

Para que a aplicação possa mostrar o mapa de entrega em tempo real, precisamos de uma **API Key** do Google Cloud. Como sou um agente de IA, não posso criar contas financeiras ou pessoais por ti, por isso aqui estão os passos:

## 1. Criar um Projeto no Google Cloud
1. Vai ao [Google Cloud Console](https://console.cloud.google.com/).
2. Cria um novo projeto chamado "Pizzaria Rural".

## 2. Ativar as APIs Necessárias
No menu lateral, vai a **APIs & Services > Library** e ativa estas três:
- **Maps SDK for Android** (Para utilizadores Android)
- **Maps SDK for iOS** (Para utilizadores iPhone)
- **Maps JavaScript API** (Para veres no browser)

## 3. Criar a Credencial (API Key)
1. Vai a **APIs & Services > Credentials**.
2. Clica em **+ Create Credentials > API Key**.
3. Copia a chave gerada (parece-se com: `AIzaSy... `).

## 4. Como me entregar a chave?
Podes simplesmente escrever aqui no chat:
> "Agente 1, aqui está a chave: [TUA_CHAVE_AQUI]"

Eu tratarei de a configurar nos ficheiros `app.json` e no código para que tudo comece a funcionar imediatamente!

---
**Nota:** O Google oferece um crédito gratuito generoso todos os meses, por isso para este projeto o custo será provavelmente **0€**.
