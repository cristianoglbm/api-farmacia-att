# API Fisioterapia

Este projeto é uma API REST desenvolvida em Node.js e TypeScript, destinada a auxiliar o gerenciamento de pacientes e usuários para o curso de farmacia.

## Repositório Git

O código-fonte deste projeto está hospedado no GitHub: https://github.com/cristianoglbm/api-farmacia-att

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção de APIs REST.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **npm**: Gerenciador de pacotes JavaScript.
- **Git**: Sistema de controle de versão distribuído.

## Pré-requisitos

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)

## Configuração do Projeto

Clone o repositório:

```sh
git clone https://github.com/cristianoglbm/api-farmacia-att
cd api-farmacia-att
```

Instale as dependências:

```sh
npm install
npm install --save mysql2
npm install --save-dev @types/node  
```

Crie um .env com as seguintes informacoes:

```sh
# Porta do servidor
PORT=4000

# Configuração do MySQL (Prisma)
DATABASE_URL="mysql://root:123456@127.0.0.1:3306/farmacia"

# JWT
JWT_SECRET="chave_super_secreta_que_voce_quiser"

# SMTP (Recuperar senha)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seuemail@gmail.com
SMTP_PASS=sua_senha_do_app

# URL do frontend para enviar link de redefinir senha
FRONTEND_URL=http://localhost:3000
```

Inicie o servidor de desenvolvimento:

```sh
npm run dev
```

O servidor será iniciado em http://localhost:3000 (ou na porta definida na variável de ambiente `PORT`).

## Estrutura do Projeto

```
📦 api-fisioterapia
┣ 📂 src/
┃ ┣ 📂 controller/        # Lógica dos controladores (usuários, clientes)
┃ ┣ 📂 routes/            # Definição das rotas da API
┃ ┗ 📜 server.ts          # Inicialização do servidor Express
┣ 📜 dados.json           # Base de dados simulada (mock)
┣ 📜 package.json         # Dependências e scripts do projeto
┣ 📜 tsconfig.json        # Configuração do TypeScript
┗ 📜 README.md            # Documentação do projeto
```

## Rotas Disponíveis

### Usuários (`/usuario`)
- `GET /usuario` — Lista todos os usuários
- `GET /usuario/:id` — Busca usuário por ID
- `POST /usuario` — Cria um novo usuário
- `PUT /usuario/:id` — Atualiza um usuário existente
- `GET /usuario/farmaceuticos` — Lista todos os usuários com perfil de farmaceutico/aluno

### Pacientes (`/paciente`)
- `GET /paciente` — Lista todos os pacientes
- `GET /paciente/:id` — Busca paciente por ID
- `POST /paciente` — Cria um novo paciente
- `PUT /paciente/:id` — Atualiza um paciente existente

### Consultas (`/consulta`)
- `GET /consulta` — Lista todas as consultas
- `GET /consulta/:id` — Busca consulta por ID
- `POST /consulta` — Cria uma nova consulta
- `PUT /consulta/:id` — Atualiza uma consulta existente

## Branches

- **main**: Branch principal para versões estáveis.

## Contribuindo

Para contribuir com o projeto, siga estes passos:

1. Crie uma nova branch a partir da develop:

   ```sh
   git checkout main
   git checkout -b sua-nova-branch
   ```

2. Faça suas alterações e commits:

   ```sh
   git add .
   git commit -m "Descrição das suas alterações"
   ```

3. Envie suas alterações para o GitHub:

   ```sh
   git push origin sua-nova-branch
   ```

4. Crie um Pull Request (PR) para a branch develop.

## Próximos Passos

- Certifique-se de que suas alterações estejam completas e funcionando corretamente.
- Use `git status` para verificar as alterações pendentes e `git diff` para revisar as modificações.
- Crie o Pull Request no GitHub, selecione sua branch como origem e `develop` como destino.
- Aguarde a revisão do seu PR por outros colaboradores.

## Dicas adicionais

- Escreva mensagens de commit claras e concisas.
- Mantenha o PR o menor e mais focado possível.
- Comunique-se de forma eficaz com os revisores.

## Contato

lads@iesgo.edu.br
