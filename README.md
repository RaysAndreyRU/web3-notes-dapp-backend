#  Web3 Notes DApp — Backend

> Secure backend for managing notes in a decentralized Web3 application.  
> Built with **NestJS**, **Prisma**, and **@lumiapassport/core**, providing secure authentication via **Lumia Passport** and full CRUD API for user-encrypted notes.

---

##  Features

-  **Lumia Passport Authentication** — verifies user sessions with wallet-based login
-  **Notes CRUD API** — create, read, update, and delete user-owned encrypted notes
-  **Prisma ORM + PostgreSQL** — type-safe, fast, and schema-driven persistence
-  **NestJS Modular Architecture** — clean, testable, and enterprise-ready structure
-  **Class-based Validation & DTOs** — input validation, serialization, and Swagger docs
-  **Ready for Web3 Integration** — designed to connect seamlessly with DApp frontends

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| **Framework** | [NestJS](https://nestjs.com) |
| **ORM** | [Prisma](https://www.prisma.io) |
| **Database** | PostgreSQL |
| **Auth** | [@lumiapassport/core](https://www.npmjs.com/package/@lumiapassport/core) |
| **Validation** | `class-validator`, `class-transformer` |
| **Docs** | [Swagger](https://swagger.io/tools/swagger-ui/) (`@nestjs/swagger`) |

---

##  Installation

```bash
# 1. Clone the repository
git clone https://github.com/RaysAndreyRU/web3-notes-dapp-backend.git
cd web3-notes-dapp-backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
```



##  Database Setup

```bash
# Run Prisma migrations
npx prisma migrate dev

# (Optional) Seed sample data
npx prisma db seed
```

##  Development
```bash
# Start the dev server
npm run start:dev
```
##  Docker (optional)
```bash
docker compose up -d
```
##  License
MIT © Rays Andrey
