# Tecnologias utilizadas:

- Node.js
- TypeScript
- Express
- Prisma ORM
- MySQL
- Bcrypt (hash de senhas)
- JSON Web Token (autenticação)
- Dotenv (variáveis de ambiente)

---

Estrutura do projeto:

api-farmacia/
│
├─ src/
│  ├─ controllers/       # Lógica das rotas
│  ├─ middlewares/       # Middlewares (ex: autenticação)
│  ├─ routes/            # Rotas da API
│  └─ server.ts          # Inicialização do servidor
│
├─ prisma/
│  └─ schema.prisma      # Modelo do banco de dados
│
├─ package.json
├─ tsconfig.json
└─ .env                  # Variáveis de ambiente (não versionar)

---

Instalação:

1. Clone o repositório:
git clone https://github.com/cristianoglbm/api-farmacia-att
cd api-farmacia-att

2. Instale as dependências:
npm install
npm install --save mysql2
npm install --save-dev @types/node
                                                                                                                                                                                                                                                                                             npm install --save-dev @types/node                                                                                
4. Configure o banco de dados no arquivo .env:
DATABASE_URL="mysql://USUARIO:SENHA@HOST:PORT/NOME_BANCO"
JWT_SECRET="sua_chave_secreta"

5. Gere o cliente Prisma:
npx prisma generate

6. Execute as migrations (criação do banco e tabelas):
npx prisma migrate dev --name init

---

Executando o servidor:

- Modo desenvolvimento:
npm run dev

- Modo produção:
npm run build
npm start

O servidor ficará disponível em:
http://localhost:4000

---

Rotas principais:

Farmacêuticos
- GET /farmaceuticos → Listar todos
- POST /farmaceuticos → Criar novo

Pacientes
- GET /pacientes → Listar todos
- POST /pacientes → Criar novo

Tratamentos
- GET /tratamentos → Listar todos
- POST /tratamentos → Criar novo
- DELETE /tratamentos/:id → Excluir

Consultas
- GET /consultas → Listar todas
- POST /consultas → Criar nova

> As rotas de autenticação usam JWT e requerem envio do token no header Authorization: Bearer <token>.

---

Autenticação:

- POST /auth/login → Login do farmacêutico
- POST /auth/register → Cadastro de farmacêutico

---

Scripts úteis:

- npm run dev → Inicia o servidor em modo desenvolvimento
- npm run build → Compila TypeScript
- npm start → Inicia servidor compilado
- npx prisma generate → Gera cliente Prisma
- npx prisma migrate dev → Executa migrations

---

Observações:

- Certifique-se de ter o MySQL rodando.
- Crie o banco de dados antes de rodar migrations.
- Não versionar o arquivo .env com credenciais sensíveis.
