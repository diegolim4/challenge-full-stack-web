# Frontend - Vue.js + Yarn

Este é o frontend da aplicação desenvolvido com Vue.js, utilizando Yarn como gerenciador de pacotes.

## Requisitos

- Node.js >= 16
- Yarn instalado (`npm install -g yarn`)

## Configuração

1. Clone o repositório e entre na pasta do frontend:

```bash
git clone <URL-do-repositório-frontend>
cd frontend
```

2. Instale as dependências:

```bash
yarn install
```

3. Configuração (se houver variáveis de ambiente, explique aqui, ex:):
Crie um arquivo `.env` na raiz do frontend (caso necessário):



Ajuste a URL da API conforme sua configuração.

## Rodando a aplicação

Para rodar o frontend em modo desenvolvimento com hot reload:

```bash
yarn server
```

O Vue irá abrir a aplicação normalmente em algo como `http://localhost:8080`.

## Observações

- Certifique-se de que o backend está rodando para a comunicação com a API.
- Se a porta do backend for diferente, atualize a variável de ambiente `VITE_API_URL` ou equivalente.


```env
VITE_API_URL=http://localhost:3000 
```

