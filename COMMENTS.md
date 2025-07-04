# 📄 COMMENTS.md

## Decisão da Arquitetura Utilizada

O projeto foi estruturado seguindo o princípio de **separação de responsabilidades**, organizando o backend e frontend em camadas

### Backend (Node.js + Express + Prisma + Postgres)

- **Controllers**: Responsáveis por lidar com as requisições HTTP.
- **Services** (opcional, mas planejado): Onde concentraríamos regras de negócio.
- **Validators**: Usamos `Joi` para validações robustas de entrada de dados.
- **Infra**: Prisma para comunicação com banco de dados, e tratadores de erros específicos.
- **Middlewares**: Planejado para autenticação futura (ex: JWT).

### Frontend (Vue 2 + Vuetify)

- **Componentização**: Separação clara em componentes reutilizáveis (`InputComponent`, `FormComponent`, `ToastComponent`, etc).
- **Pages**: Dividido em páginas como `Login`, `Home`, `Admin`, seguindo a convenção SPA.
- **Vue Router**: Utilizado para navegação entre as páginas principais.
- **Event-Driven**: Comunicação via `@emit`, `v-model` e props entre componentes.

---

## 📦 Lista de Bibliotecas de Terceiros Utilizadas

### Backend:

- `express`: Framework minimalista para criar APIs REST.
- `joi`: Biblioteca de validação robusta e declarativa.
- `prisma`: ORM moderno para acesso ao banco de dados.
- `bcrypt`: Criptografia de senhas de forma segura.
- `dotenv`: Carregamento de variáveis de ambiente.
- `uuid`: Geração de identificadores únicos (se necessário).

### Frontend:

- `vue`: Framework progressivo para construção da interface.
- `vuetify`: Biblioteca UI baseada em Material Design.
- `axios`: Cliente HTTP para chamadas à API.

---

## Se eu tivesse mais tempo melhoraria:

1. **Autenticação com JWT (backend e frontend)**

2. **Melhor separação das regras de negócio**  

2. **testes unitários.**  

3. **Testes Automatizados com Jest**  

4. **Paginação e Filtros no backend**  

5. **Responsividade e Acessibilidade no Frontend**  
