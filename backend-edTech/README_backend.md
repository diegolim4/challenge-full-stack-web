# Backend - Node.js + TypeScript + Prisma + PostgreSQL

Este é o backend da aplicação desenvolvido em Node.js com TypeScript, utilizando Prisma como ORM e PostgreSQL como banco de dados.

## Requisitos

- Node.js >= 16
- Yarn ou npm
- PostgreSQL instalado e rodando
- Prisma CLI (`yarn prisma`)

## Configuração

1. Clone o repositório e entre na pasta do backend:

```bash
git clone <URL-do-repositório-backend>
cd backend
```

2. Instale as dependências:

```bash
yarn install
```

3. Configure o banco de dados PostgreSQL e crie uma database.

4. Crie um arquivo `.env` na raiz do backend com as variáveis de ambiente, por exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?"
```

Ajuste `usuario`, `senha`, `localhost`, `porta` e `nome_do_banco` conforme sua configuração local.

5. Gere o cliente Prisma e rode as migrations:

```bash
yarn prisma generate
yarn prisma migrate dev --name init
```

## Rodando o servidor

Para iniciar o backend:

```bash
yarn start
```

O servidor irá rodar por padrão na porta definida no `.env` (ex: http://localhost:3000).


## Comandos úteis

- `yarn prisma studio` — abre interface gráfica para visualizar o banco de dados
- `yarn prisma migrate dev` — cria e executa migrations no banco
- `yarn prisma generate` — gera o cliente Prisma

## Observações

- Certifique-se que o banco PostgreSQL está rodando antes de iniciar o backend.
- As migrations devem ser aplicadas sempre que o schema Prisma for alterado.

---
