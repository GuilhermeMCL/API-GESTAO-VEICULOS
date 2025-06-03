# 🚗 API GESTAO DE VEICULOS

API RESTful para gerenciamento de veículos, desenvolvida com **Fastify**, **TypeScript**, **Prisma ORM** e **Zod** . Inclui autenticação via token fixo, validações de negócio e persistência com PostgresSQL.

---

## 🔧 Tecnologias

* [Fastify](https://www.fastify.io/) — Web framework de alta performance
* [TypeScript](https://www.typescriptlang.org/) — Tipagem estática
* [Prisma](https://www.prisma.io/) — ORM moderno
* [Zod](https://zod.dev/) — Validação de dados com tipos seguros
* [PostGresSQL](https://www.postgresql.org/) — Banco de dados
* [Dotenv](https://github.com/motdotla/dotenv) — Gerenciamento de variáveis ambiente
* [Docker](https://www.docker.com/products/docker-desktop/)- Conteirnização

---

## 🚀 Instalação

```bash
git clone https://github.com/GuilhermeMCL/API-GESTAO-VEICULOS.git
cd API-GESTAO-VEICULOS
npm install
```

Configure o banco no arquivo `.env`:

```env
DATABASE_URL="De padrao Ja esta Com DOCKER"
```

Gere o banco de dados com o docker:

```bash
docker-compose up -d

```

Gere a tabela do banco:

```bash
npx prisma migrate dev --name init
```

Inicie o servidor:

```bash
npm run dev
```

---

## 🔐 Autenticação

A API utiliza um token fixo de autenticação via header `Authorization`.

**Exemplo:**

```http
Authorization: Bearer 1234567890abcdef
```

---

## 📌 Endpoints

| Método | Rota            | Descrição               |
| ------ | --------------- | ----------------------- |
| GET    | `/vehicles/`     | Lista todos os veículos |
| GET    | `/vehicles/:id` | Busca veículo por ID    |
| POST   | `/vehicles/`     | Cria um novo veículo    |
| PUT    | `/vehicles/:id` | Atualiza um veículo     |
| DELETE | `/vehicles/:id` | Remove um veículo       |

### Exemplo de payload (POST/PUT)

```json
{
  "vin": "1HGCM82633A123456",
  "placa": "ABC-1234",
  "modelo": "Civic",
  "data_entrega": "2025-06-01",
  "data_fabricacao": "2025-05-01",
  "data_venda": "2025-06-02",
  "pais_operacao": "Brasil",
  "concessionaria_venda": "Honda SP",
  "data_ultimo_reparo": "2025-06-03",
  "documento_proprietario": "12345678909"
}
```
