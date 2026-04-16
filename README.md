# FinanceFlow AI

SaaS de Gestão Financeira Pessoal Multi-Tenant com integração ao Google Gemini 2.0 Flash.
Arquitetura Monorepo **pnpm** com `frontend/` (Next.js 14) e `backend/` (Express + Prisma + Vitest).

## Como iniciar o ambiente de desenvolvimento

Certifique-se de ter Docker e pnpm instalados localmente.

### 1. Iniciar o Banco de Dados
```bash
docker compose up -d
```
*(Caso queira parar o banco, utilize `docker compose stop`. Para destruir, `docker compose down`.)*

### 2. Configurar Variáveis de Ambiente
O arquivo `.env` na raiz já foi gerado na configuração inicial deste ambiente com as chaves corretas de banco em desenvolvimento. 
Preencha apenas a variável `GEMINI_API_KEY` dentro do arquivo `.env` caso vá testar os features de I.A.

### 3. Instalar Dependências
```bash
pnpm install
```

### 4. Configurar Schema e Banco de Dados (Prisma)
Sincronize as tabelas do banco e gere os Types do Prisma:
```bash
pnpm db:migrate
pnpm db:generate
```

### 5. Iniciar os Serviços
Sugerimos abrir abas separadas no terminal, sempre atuando na raiz do projeto (`/`):

**Terminal 1 — API Backend:**
```bash
pnpm dev:backend
```

**Terminal 2 — Interface React:**
```bash
pnpm dev
```

A aplicação frontend ficará acessível sob `http://localhost:3000` enquanto os APIs operarão em `http://localhost:4000`.

---

## Entendendo a Estrutura (Monorepo)

- `frontend/src/` — Aplicação via App Router Next.js, incluindo todos hooks, providers, configs Shadcn UI e as rotas públicas ou isoladas e protegidas do usuário.
- `backend/src/` — Servidor Express em camadas MVC (Controllers, Modules, Services etc) configurado puramente em TypeScript.
- `backend/prisma/` — Abriga o `schema.prisma` PostgreSQL bem como a pasta local de suas migrations. 

## Referência de Todos os Comandos 

Todos os comandos devem ser invocados da raiz para operarem nos sub-projetos:

| Comando | Execução e Localidade Equivalente | Função e Monitoramento |
|--------|-----------|---------|
| `pnpm dev` | *frontend/: `next dev`* | Levanta o Frontend pra desenvolvimento, com Fast Refresh ativo. |
| `pnpm dev:backend` | *backend/: `tsx watch`* | Levanta aplicação backend no Express monitorando alterações nos ts. |
| `pnpm build` | *Ambos repos. e pacotes* | Executará a compilação paralela da arquitetura inteira (Next BUILD + TSC). |
| `pnpm test` | *backend/: `vitest run`* | Ativa a ferramenta Vitest rodando Test-driven configs estipuladas. |
| `pnpm db:generate` | *backend/: `prisma generate`*| Recria a tipagem do schema do database em `node_modules`. |
| `pnpm db:migrate` | *backend/: `prisma migrate dev`*| Cria e envia migrations devendo ser confirmadas sempre que há alterações em Prisma Schema. |
| `pnpm db:studio` | *backend/: `prisma studio`* | Ativa tela interadora Prisma num browser (comunmente `5555`). |
# fin-ai
