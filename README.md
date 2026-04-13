# TMJ — Track My Jobs

> Buscar emprego é difícil. Se organizar não precisa ser.

**TMJ** é uma aplicação web para acompanhar processos seletivos de forma simples e centralizada. Registre cada candidatura, acompanhe as etapas do processo, adicione anotações e mantenha o foco em conseguir a vaga certa.

Projeto desenvolvido como portfólio pessoal, com foco em aprender e praticar desenvolvimento fullstack moderno.

### Acesse em: [tmj-project.vercel.app/](https://tmj-project.vercel.app/)

## Índice

- [Funcionalidades](#funcionalidades)
- [Stacks utilizadas](#stacks)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Imagens do projeto](#imagens-do-projeto)
- [Rodando localmente](#rodando-localmente)
- [Autora](#autora)

---

## Funcionalidades

- Cadastro e autenticação com e-mail e senha
- Dashboard com visão geral das candidaturas
- CRUD completo de candidaturas (cargo, empresa, plataforma, modalidade, status, tags)
- Registro de etapas do processo seletivo com status de conclusão
- Anotações por candidatura
- Filtro por status e busca por cargo ou empresa
- Interface responsiva, mobile first

---

## Stacks

| Camada | Tecnologia |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Linguagem | TypeScript 5 |
| Estilo | [Tailwind CSS v4](https://tailwindcss.com) |
| Componentes | [shadcn/ui](https://ui.shadcn.com) (preset Nova, Radix UI) |
| Autenticação | [NextAuth.js v5](https://authjs.dev) (Credentials) |
| ORM | [Prisma 7](https://www.prisma.io) |
| Banco de dados | [Neon](https://neon.tech) (PostgreSQL serverless) |
| Validação | [Zod v4](https://zod.dev) |
| Ícones | [Lucide React](https://lucide.dev) |
| Runtime | Node.js 24 |

---

## Estrutura do projeto

```
src/
  app/
    (auth)/         páginas de login e registro
    (dashboard)/    layout autenticado, dashboard e candidaturas
    api/            API Routes (applications, stages, notes)
    page.tsx        landing page pública
  components/
    ui/             componentes shadcn/ui
    sidebar.tsx     navegação lateral do dashboard
    status-badge.tsx badge de status das candidaturas
  lib/
    auth.ts         configuração do NextAuth
    db.ts           cliente Prisma com adapter Neon
    validations.ts  schemas Zod
  generated/
    prisma/         client Prisma gerado
prisma/
  schema.prisma     modelo de dados
```

---

## Imagens do projeto

<img width="1904" height="1017" alt="dash1" src="https://github.com/user-attachments/assets/b8d9085f-7aba-4ff9-a3da-74e66e1eefb4" />

<img width="1917" height="1018" alt="dash2" src="https://github.com/user-attachments/assets/c7b3db13-78fc-47ec-a76d-18a85cebee57" />

<img width="1919" height="1015" alt="dash4" src="https://github.com/user-attachments/assets/211db488-a30e-4449-8c94-5815da407656" />

<img width="1915" height="1016" alt="dash3" src="https://github.com/user-attachments/assets/f9a8199c-5738-4315-b7ae-d309039484b6" />

<img width="1915" height="1019" alt="landing1" src="https://github.com/user-attachments/assets/4930eada-9278-4821-b7ba-8efa6cfd4639" />

<img width="1914" height="1019" alt="landing2" src="https://github.com/user-attachments/assets/197b3af9-97a2-4d67-ac6c-1febb2ec00d1" />

</br>

[tmj-simulacao.webm](https://github.com/user-attachments/assets/805374f6-ebfe-4b9b-a6d1-0c958a6facb4)

---

## Rodando localmente

### Pré-requisitos

- Node.js 18+
- Conta no [Neon](https://neon.tech) (banco de dados PostgreSQL)

### Instalação

```bash
# clone o repositório
git clone https://github.com/lahgomes/tmj-project.git
cd tmj-project

# instale as dependências
npm install

# configure as variáveis de ambiente
cp .env.example .env
```

Preencha o `.env` com suas credenciais:

```env
DATABASE_URL=postgresql://...    # connection string do Neon
NEXTAUTH_SECRET=sua_chave_secreta
NEXTAUTH_URL=http://localhost:3000
```

```bash
# aplique as migrations e gere o client Prisma
npx prisma migrate deploy
npx prisma generate

# inicie o servidor de desenvolvimento
npm run dev
```

Para desenvolvimento acesse [http://localhost:3000](http://localhost:3000).

---

## Autora

Feito com carinho por [Larissa Gomes](https://www.linkedin.com/in/larissagomes19/).

