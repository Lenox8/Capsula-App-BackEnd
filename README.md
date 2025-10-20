# Login-and-auth-Node
Projecto de login e registro de usuarios em node.js express, mongodb e react.Js

---

##  Dependências Principais

| Pacote | Função |
|--------|--------|
| **express** | Criação do servidor web |
| **mongoose** | Conexão e modelagem com MongoDB |
| **dotenv** | Carregamento de variáveis de ambiente |
| **jsonwebtoken** | Autenticação de usuários |
| **bcrypt** | Encriptação de senhas |
| **nodemailer** | Envio de e-mails automáticos |
| **node-cron** | Agendamento de tarefas |
| **swagger-ui-express** | Exposição da documentação da API |
| **moment-timezone** | Manipulação de datas e fusos horários |

---

## 🧰 Pré-requisitos

Antes de rodar o projeto, é necessário ter instalado:

- [Node.js 20+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (opcional, para ambiente containerizado)
--caso opte por dockerizar o projecto rode [docker build -t capsula-backend .] este comando
-- docker run -d -p 8000:8000 --name capsula-backend-container capsula-backend --execute o container

## testes unitarios 
npm test
- [Git](https://git-scm.com/)

- Dentro do arquivo .env.example estao as variaveis locais necessarias para rodar o projecto.
mas disponibilizarei o .env com as minhas variaveis (mesmo nao sendo recomendado)
---

## 🔧 Instalação (Local)

1. **Clone o repositório**

```bash
git clone https://github.com/teu-usuario/capsula-do-tempo-backend.git
cd capsula-do-tempo-backend 

## Estrutura do projecto
/server
┣ 📁 Config/ → arquivos de configuração (DB, autenticação, etc.)
┣ 📁 Controller/ → controladores da aplicação
┣ 📁 Models/ → modelos Mongoose
┣ 📁 Routes/ → rotas da API
┣ 📁 Middleware/ → middlewares (autenticação, validação, etc.)
┣ 📄 .env.example → exemplo de variáveis de ambiente
┣ 📄 index.js → ponto de entrada da aplicação
┗ 📄 Dockerfile → configuração do container

---