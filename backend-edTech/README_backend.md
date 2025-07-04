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
npx prisma generate
npx prisma migrate dev --name init
```

## Rodando o servidor

Para iniciar o backend:

```bash
yarn start
```

O servidor irá rodar por padrão na porta definida no `.env` (ex: http://localhost:3000).


## Comandos úteis

- `npx prisma studio` — abre interface gráfica para visualizar o banco de dados
- `npx prisma migrate dev` — cria e executa migrations no banco
- `npx prisma generate` — gera o cliente Prisma

## Observações

- Certifique-se que o banco PostgreSQL está rodando antes de iniciar o backend.
- As migrations devem ser aplicadas sempre que o schema Prisma for alterado.


## 📌 Endpoints da API

### 🧑‍🎓 **Estudantes (`/students`)**

#### 🔹 Criar estudante

- **URL:** `POST /api/students`
- **Body:**
```json
{
  "fullName": "Goku da Silva",
  "email": "goku@email.com",
  "document": "12345678901"
}
```

#### 🔹 Listar todos os estudantes

- **URL:** `GET /api/students`

#### 🔹 Buscar estudante por e-mail ou RA

- **URL:** `GET /api/students/:param`
- **Exemplo:** `/api/students/joao@email.com`

#### 🔹 Atualizar estudante

- **URL:** `PUT /api/students/:id`
- **Body:**
```json
{
  "fullName": "Vegeta Atualizado",
  "email": "vegeta@email.com",
  "status": true,
  "createdBy": "id do admin" 
}
```

#### 🔹 Deletar estudante

- **URL:** `DELETE /api/students/:id`

---

### 🔐 **Administradores (`/admin`)**

#### 🔹 Criar administrador

- **URL:** `POST /api/admin`
- **Body:**
```json
{
  "fullName": "Admin",
  "email": "admin@email.com",
  "password": "123456",
  "status": true
}
```

#### Buscar administrador por e-mail

- **URL:** `GET /api/admin/:email`


### **Autenticação via Header**

Para acessar as rotas protegidas (como criação, listagem e remoção de estudantes), é necessário enviar no header da requisição a **chave de acesso (accessKey)** de um admin autorizado.

#### Exemplo de uso no header:

```http
Authorization: cmcmvlaqr0000rdjes5bg5vrj
```

Ou, em `cURL`:

```bash
curl -X GET http://localhost:3000/api/students \
  -H "Authorization: cmcmvlaqr0000rdjes5bg5vrj"
```

> Substitua o valor da `accessKey` por uma chave válida cadastrada previamente.

---
