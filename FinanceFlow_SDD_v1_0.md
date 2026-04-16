# FINANCEFLOW
### Sistema de Gestão Financeira Pessoal

**Documentação de Design de Software (SDD)**
Versão 1.0 — Planejamento Completo

| | |
|---|---|
| **Tecnologia Frontend** | Next.js 14 + React + TailwindCSS + Shadcn UI |
| **Tecnologia Backend** | Next.js API Routes + TypeScript (Package by Layer) |
| **Banco de Dados** | PostgreSQL + Prisma ORM |
| **Inteligência Artificial** | Google Gemini API |
| **Gerenciador de Pacotes** | pnpm |
| **Metodologia de Testes** | TDD — Backend sempre testado |

---

## Sumário

- [1. Visão Geral do Sistema](#1-visão-geral-do-sistema)
  - [1.1 Objetivos do Sistema](#11-objetivos-do-sistema)
  - [1.2 Princípios Arquiteturais](#12-princípios-arquiteturais)
  - [1.3 Módulos do Sistema](#13-módulos-do-sistema)
- [2. Arquitetura Técnica](#2-arquitetura-técnica)
  - [2.1 Stack de Tecnologia](#21-stack-de-tecnologia)
  - [2.2 Estrutura de Diretórios — Frontend](#22-estrutura-de-diretórios--frontend)
  - [2.3 Estrutura de Diretórios — Backend (Package by Layer)](#23-estrutura-de-diretórios--backend-package-by-layer)
  - [2.4 Modelo de Dados — Entidades Principais](#24-modelo-de-dados--entidades-principais)
- [3. Fluxo de Desenvolvimento](#3-fluxo-de-desenvolvimento)
  - [3.1 Ciclo por Funcionalidade](#31-ciclo-por-funcionalidade)
  - [3.2 Ordem de Desenvolvimento das Features](#32-ordem-de-desenvolvimento-das-features)
- [4. Detalhamento por Tela e Funcionalidade](#4-detalhamento-por-tela-e-funcionalidade)
  - [4.1 Módulo 1: Autenticação & Multi-Tenant](#41-módulo-1-autenticação--multi-tenant)
  - [4.2 Módulo 2: Rendas (Entradas)](#42-módulo-2-rendas-entradas)
  - [4.3 Módulo 3: Cartões](#43-módulo-3-cartões)
  - [4.4 Módulo 4: Transações (Saídas)](#44-módulo-4-transações-saídas)
  - [4.5 Módulo 5: Categorias Hierárquicas](#45-módulo-5-categorias-hierárquicas)
  - [4.6 Módulo 6: Assinaturas](#46-módulo-6-assinaturas)
  - [4.7 Módulo 7: Faturas](#47-módulo-7-faturas)
  - [4.8 Módulo 8: Dashboard Principal](#48-módulo-8-dashboard-principal)
  - [4.9 Módulo 9: Chat IA (Gemini)](#49-módulo-9-chat-ia-gemini)
  - [4.10 Módulo 10: Orçamentos / Metas por Categoria](#410-módulo-10-orçamentos--metas-por-categoria)
  - [4.11 Módulo 11: Notificações & Alertas](#411-módulo-11-notificações--alertas)
  - [4.12 Módulo 12: Relatórios & Exportação](#412-módulo-12-relatórios--exportação)
  - [4.13 Módulo 13: Divisão de Gastos Compartilhados](#413-módulo-13-divisão-de-gastos-compartilhados)
  - [4.14 Módulo 14: Metas de Economia](#414-módulo-14-metas-de-economia)
- [5. Contrato de API — Endpoints Principais](#5-contrato-de-api--endpoints-principais)
- [6. Regras de Negócio Consolidadas](#6-regras-de-negócio-consolidadas)
- [7. Estratégia de Testes (TDD)](#7-estratégia-de-testes-tdd)
- [8. Setup do Projeto](#8-setup-do-projeto)
- [9. Glossário](#9-glossário)

---

## 1. Visão Geral do Sistema

O FinanceFlow é um sistema SaaS multi-tenant de gestão financeira pessoal e familiar. O sistema permite que um usuário principal (titular do tenant) gerencie suas finanças e as de perfis secundários vinculados — como um cônjuge ou dependente — de forma isolada, segura e com visualizações consolidadas ou individuais.

### 1.1 Objetivos do Sistema

- Oferecer controle financeiro realista com confirmação manual de rendas fixas
- Gerenciar múltiplos cartões de crédito e débito com extrato e faturas
- Categorizar despesas de forma hierárquica (categoria > subcategoria)
- Prover dashboards com indicadores em tempo real por perfil ou consolidados
- Integrar IA (Gemini) para análise financeira conversacional e relatórios narrativos
- Suportar metas de economia, orçamentos por categoria e divisão de gastos compartilhados
- Enviar notificações in-app e por e-mail para vencimentos e alertas

### 1.2 Princípios Arquiteturais

- **Multi-Tenant Lógico:** Cada conta é um tenant isolado. Dados nunca se misturam entre tenants.
- **Perfis Vinculados:** Um tenant pode ter perfil Primário e múltiplos Secundários, alternáveis sem logout.
- **Fluxo de Desenvolvimento:** Backend primeiro (com TDD) → Frontend da funcionalidade → Próxima funcionalidade.
- **Package by Layer (Backend):** Organização por `controllers/`, `services/`, `models/` — clara separação de responsabilidades.
- **App Router (Frontend):** Next.js 14 com `src/` estruturada em `app/`, `features/`, `components/`, `hooks/`, `lib/`, `types/`, `utils/`.

### 1.3 Módulos do Sistema

| # | Módulo | Descrição Resumida |
|---|--------|-------------------|
| 1 | Autenticação & Perfis | Registro, login JWT, multi-tenant, perfis primário/secundário |
| 2 | Rendas (Entradas) | Renda fixa com confirmação, renda variável manual |
| 3 | Cartões | Crédito e débito, limite, fatura, extrato, estorno |
| 4 | Transações (Saídas) | Despesas com parcelas, categorias, meio de pagamento |
| 5 | Categorias | Hierárquicas: pai > filha; somas automáticas |
| 6 | Assinaturas | Painel Kanban de recorrências mensais |
| 7 | Faturas | Por cartão de crédito, histórico, status |
| 8 | Dashboard | Saldo, gráficos, projeções, vencimentos próximos |
| 9 | Chat IA (Gemini) | Análise conversacional com contexto financeiro injetado |
| 10 | Orçamentos/Metas Cat. | Limite mensal por categoria, alertas, barra de progresso |
| 11 | Notificações & Alertas | In-app e e-mail para eventos financeiros |
| 12 | Relatórios & Exportação | PDF, CSV, narração por IA |
| 13 | Gastos Compartilhados | Divisão entre perfis com saldo a acertar |
| 14 | Metas de Economia | Acompanhamento de meta com projeção de ritmo |

---

## 2. Arquitetura Técnica

### 2.1 Stack de Tecnologia

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Frontend | Next.js 14 (App Router) | SSR/SSG, rotas aninhadas, Server Components, performance |
| UI Components | Shadcn UI + TailwindCSS | Design system consistente, altamente customizável |
| Chat IA UI | Thesys | Interface dedicada para chat com IA financeira |
| Backend/API | Next.js API Routes + TypeScript | Colocado no mesmo projeto, tipagem forte end-to-end |
| ORM | Prisma | Type-safe, migrations, suporte nativo a PostgreSQL |
| Banco de Dados | PostgreSQL | Relacional, ACID, ideal para dados financeiros |
| Autenticação | JWT + bcrypt | Stateless, escalável, hash seguro de senhas |
| IA | Google Gemini API | Tier gratuito generoso, janela de contexto ampla para JSONs |
| Testes | Vitest + Supertest | TDD no backend, testes de integração das API Routes |
| Gerenciador | pnpm | Mais rápido e eficiente que npm/yarn |

### 2.2 Estrutura de Diretórios — Frontend

```
src/
├── app/                         # App Router — Rotas e Layouts
│   ├── (auth)/                  # Grupo de rotas públicas (sem prefixo na URL)
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── setup/page.tsx       # Setup inicial pós-registro
│   ├── (dashboard)/             # Grupo de rotas protegidas
│   │   ├── dashboard/page.tsx
│   │   ├── rendas/page.tsx
│   │   ├── cartoes/page.tsx
│   │   ├── transacoes/page.tsx
│   │   ├── categorias/page.tsx
│   │   ├── assinaturas/page.tsx
│   │   ├── faturas/page.tsx
│   │   ├── chat/page.tsx
│   │   ├── orcamentos/page.tsx
│   │   ├── relatorios/page.tsx
│   │   ├── metas/page.tsx
│   │   └── configuracoes/page.tsx
│   ├── api/                     # API Routes (Backend)
│   │   ├── auth/
│   │   ├── rendas/
│   │   ├── cartoes/
│   │   ├── transacoes/
│   │   └── [...]
│   └── layout.tsx               # Layout raiz
├── components/                  # Componentes globais reutilizáveis
│   └── ui/                      # Átomos Shadcn UI
├── features/                    # Lógica de negócio por funcionalidade
│   ├── auth/
│   ├── rendas/
│   ├── cartoes/
│   └── [...]
├── hooks/                       # Custom hooks reutilizáveis
├── lib/                         # Config de libs (prisma.ts, gemini.ts, axios.ts)
├── types/                       # Tipos TypeScript globais
└── utils/                       # Funções utilitárias (formatação, datas, etc.)
```

### 2.3 Estrutura de Diretórios — Backend (Package by Layer)

```
src/app/api/
├── controllers/   # Recebe req, valida entrada, chama service, retorna res
│   ├── auth.controller.ts
│   ├── rendas.controller.ts
│   └── [...]
├── services/      # Regras de negócio puras, sem acesso direto ao HTTP
│   ├── auth.service.ts
│   ├── rendas.service.ts
│   └── [...]
├── models/        # Queries Prisma encapsuladas (Repository Pattern leve)
│   ├── user.model.ts
│   ├── renda.model.ts
│   └── [...]
├── middlewares/   # JWT guard, rate limiting, validação Zod
└── [rota]/route.ts  # Ponto de entrada Next.js → chama controller
```

### 2.4 Modelo de Dados — Entidades Principais

| Entidade | Campos Principais | Relacionamentos |
|----------|------------------|-----------------|
| Tenant | id, createdAt | hasMany: User, Profile, Renda, Transacao, Cartao |
| User | id, tenantId, name, email, passwordHash, role | belongsTo: Tenant; hasMany: Profile |
| Profile | id, tenantId, userId, name, type (PRIMARY\|SECONDARY) | belongsTo: Tenant, User; hasMany: Renda, Transacao |
| Renda | id, tenantId, profileId, descricao, valor, tipo, diaVencimento, status | belongsTo: Tenant, Profile; hasMany: RendaOcorrencia |
| RendaOcorrencia | id, rendaId, dataEsperada, dataConfirmada, status (pending\|confirmed\|cancelled) | belongsTo: Renda |
| Cartao | id, tenantId, profileId, nome, tipo, limite, saldo, diaFechamento, diaVencimento | belongsTo: Tenant, Profile; hasMany: Transacao, Fatura |
| Categoria | id, tenantId, nome, categoriaPaiId | belongsTo: Tenant; self: categoriaPai; hasMany: Transacao |
| Transacao | id, tenantId, profileId, nome, valor, data, categoriaId, cartaoId, tipo, parcelas | belongsTo: Tenant, Profile, Categoria, Cartao |
| Parcela | id, transacaoId, numero, valor, dataVencimento, pago | belongsTo: Transacao |
| Assinatura | id, tenantId, profileId, nome, valor, diaCobranca, cartaoId, status, debitadoMes | belongsTo: Tenant, Profile, Cartao |
| Fatura | id, cartaoId, mesReferencia, dataFechamento, dataVencimento, valorTotal, status | belongsTo: Cartao; hasMany: Transacao |
| Orcamento | id, tenantId, categoriaId, mes, valorLimite | belongsTo: Tenant, Categoria |
| Meta | id, tenantId, profileId, descricao, valorAlvo, valorAcumulado, dataAlvo | belongsTo: Tenant, Profile |
| Notificacao | id, tenantId, userId, tipo, titulo, mensagem, lida, criadaEm | belongsTo: Tenant, User |

---

## 3. Fluxo de Desenvolvimento

O desenvolvimento segue o princípio de entrega incremental e funcional: uma funcionalidade por vez, backend primeiro com TDD, depois o frontend daquela funcionalidade, verificando o funcionamento antes de avançar.

### 3.1 Ciclo por Funcionalidade

| Fase | O que fazer | Critério de Conclusão |
|------|------------|----------------------|
| 1 - Modelagem | Criar/atualizar schema Prisma para as entidades da feature | Migration executada, types gerados |
| 2 - Model | Implementar queries encapsuladas em `models/` | Queries testáveis isoladamente |
| 3 - Service (TDD) | Escrever testes primeiro, depois implementar regra de negócio | 100% dos testes passando |
| 4 - Controller | Mapear HTTP → service, validação Zod, resposta padronizada | Testes de integração da rota OK |
| 5 - Route (Next.js) | Criar `src/app/api/[rota]/route.ts` chamando o controller | Endpoint funcional via Postman/Thunder |
| 6 - Frontend Feature | Criar `feature/` com componentes, hooks e server actions | Funcionalidade visível e operável no browser |
| 7 - Revisão | Code review, refactor se necessário, documentar edge cases | Pronto para próxima feature |

### 3.2 Ordem de Desenvolvimento das Features

| Sprint | Feature | Dependências |
|--------|---------|-------------|
| 1 | Autenticação & Multi-Tenant (Registro, Login, Perfis) | Nenhuma — base do sistema |
| 2 | Rendas (Setup Inicial + Confirmação de Renda Fixa) | Auth, Perfis |
| 3 | Categorias Hierárquicas | Auth, Tenant |
| 4 | Cartões (Crédito e Débito) | Auth, Perfis |
| 5 | Transações (Saídas + Parcelas) | Categorias, Cartões, Perfis |
| 6 | Assinaturas | Cartões, Categorias |
| 7 | Faturas | Cartões, Transações |
| 8 | Dashboard Principal | Todas as anteriores |
| 9 | Notificações & Alertas | Rendas, Faturas, Assinaturas |
| 10 | Orçamentos / Metas por Categoria | Categorias, Transações |
| 11 | Metas de Economia | Transações, Perfis |
| 12 | Gastos Compartilhados | Transações, Perfis |
| 13 | Relatórios & Exportação (PDF/CSV) | Todas as transacionais |
| 14 | Chat IA (Gemini) | Dashboard, Relatórios, Categorias |

---

## 4. Detalhamento por Tela e Funcionalidade

### 4.1 Módulo 1: Autenticação & Multi-Tenant

#### 4.1.1 Tela de Registro

**Rota:** `/register` | **Feature:** `src/features/auth/`

**Campos do Formulário**

| Campo | Tipo | Validação |
|-------|------|-----------|
| Nome Completo | text | Obrigatório, min 3 chars |
| E-mail | email | Obrigatório, formato válido, único no sistema |
| Senha | password | Obrigatório, min 8 chars, 1 maiúscula, 1 número, 1 especial |
| Confirmar Senha | password | Deve ser igual ao campo Senha |

**Fluxo de Backend (TDD)**

1. Validar dados com Zod no controller
2. Verificar email único via model (`User.findByEmail`)
3. Gerar hash da senha com bcrypt (salt rounds: 12)
4. Criar `tenant_id` único (UUID v4)
5. Criar `User` com role `PRIMARY` e vínculo ao tenant
6. Criar `Profile` do tipo `PRIMARY` automaticamente
7. Gerar JWT assinado com payload `{ userId, tenantId, profileId }`
8. Retornar token + dados básicos do usuário

**Comportamento Pós-Registro**

Após registro bem-sucedido, o usuário é **REDIRECIONADO OBRIGATORIAMENTE** para `/setup` (configuração inicial de rendas). Ele não pode acessar o dashboard sem completar esta etapa.

#### 4.1.2 Tela de Login

**Rota:** `/login`

**Campos**
- E-mail: obrigatório, formato válido
- Senha: obrigatório

**Fluxo de Backend (TDD)**

1. Buscar User por email (retornar 401 genérico se não encontrado)
2. Comparar senha com hash via `bcrypt.compare()`
3. Verificar rate limiting (máx 5 tentativas / 15 min por IP)
4. Gerar novo JWT com expiração configurável (ex.: 7 dias)
5. Verificar flag `isSetupComplete` — redirecionar para `/setup` se false
6. Retornar token + perfis do tenant para o seletor de perfil

**Segurança**
- Mensagens de erro genéricas (não revelar se email existe)
- Rate limiting no middleware de autenticação
- JWT armazenado em `httpOnly` cookie (não localStorage)

#### 4.1.3 Gestão de Perfis

**Rota:** `/configuracoes/perfis` — Acessível apenas para usuário PRIMARY.

**Funcionalidades**
- Criar perfil secundário: nome obrigatório, vínculo ao tenant
- Editar nome do perfil
- Desativar perfil (soft delete — dados preservados)
- Seletor de perfil no header: dropdown com todos os perfis ativos do tenant

**Regras de Negócio**
- O perfil PRIMARY não pode ser excluído ou desativado
- Toda transação, renda e cartão exige `profile_id` para rastreabilidade
- A alternância de perfil atualiza o contexto do dashboard sem logout

---

### 4.2 Módulo 2: Rendas (Entradas)

#### 4.2.1 Tela de Setup Inicial de Rendas

**Rota:** `/setup` | Exibida uma única vez após o primeiro login. Bloqueada por middleware se `isSetupComplete = true`.

**Campos por Renda**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| Descrição | text | Sim | Ex.: Salário CLT, Freelance Design |
| Valor | number | Sim | Valor em R$, deve ser >= 0 |
| Tipo | select | Sim | `FIXED` (Renda Fixa) \| `VARIABLE` (Renda Variável) |
| Dia do Mês | number | Se FIXED | Dia recorrente de vencimento (1–31) |
| Perfil | select | Sim | Perfil ao qual esta renda pertence |
| Data de Referência | date | Opcional | Apenas para renda variável como referência |

**Comportamento da Tela**
- O usuário pode adicionar múltiplas rendas dinamicamente (botão `+ Adicionar Renda`)
- Mínimo de 1 renda cadastrada para concluir o setup
- Ao concluir: flag `isSetupComplete = true`, redireciona para `/dashboard`

#### 4.2.2 Tela de Gestão de Rendas

**Rota:** `/rendas` — CRUD completo de fontes de renda.

**Listagem de Rendas**
- Cards separados por tipo (Renda Fixa | Renda Variável)
- Exibe: descrição, valor, perfil vinculado, status ativo/inativo
- Filtro por perfil (dropdown)

**Seção: Rendas a Confirmar**

Lista destacada (badge visual) com todas as `RendaOcorrencias` com `status = pending_confirmation`. Para cada item:
- Botão `Confirmar Recebimento` → altera status para `confirmed`, atualiza saldo
- Botão `Não Recebi` → cancela a ocorrência do mês (`status = cancelled`)
- Botão `Reagendar` → permite alterar a `dataEsperada`

#### 4.2.3 Comportamento do Sistema — Renda Fixa

| Evento | Ação do Sistema | Efeito no Saldo |
|--------|----------------|-----------------|
| 00:00 do dia de vencimento | Cria `RendaOcorrencia` com `status = pending_confirmation` | Nenhum (apenas projeção) |
| Usuário clica 'Confirmar' | `Status = confirmed`, `dataConfirmada = now()` | Saldo += valor da renda |
| Usuário clica 'Não Recebi' | `Status = cancelled` | Projeção removida do mês |
| Usuário clica 'Reagendar' | Atualiza `dataEsperada` (status mantido em pending) | Nenhum ainda |
| 24h sem confirmação | Dispara notificação de lembrete (canal configurado) | Nenhum |
| 48h sem confirmação | Dispara lembrete adicional se configurado | Nenhum |

---

### 4.3 Módulo 3: Cartões

**Rota:** `/cartoes`

#### 4.3.1 Cadastro de Cartão

| Campo | Tipo | Descrição |
|-------|------|-----------|
| Nome | text | Ex.: Nubank Roxinho, Itaú Black |
| Tipo | select | `CREDIT` \| `DEBIT` |
| Limite | number | Apenas crédito — limite total do cartão |
| Saldo Inicial | number | Para débito — saldo atual |
| Dia de Fechamento | number | Apenas crédito — dia do fechamento da fatura (1–31) |
| Dia de Vencimento | number | Apenas crédito — dia de vencimento da fatura (1–31) |
| Perfil | select | Perfil principal deste cartão |
| Cor/Ícone | select | Personalização visual do card |

#### 4.3.2 Listagem e Detalhes

- Cards visuais para cada cartão com: nome, tipo, saldo/limite disponível, status
- Clicar no cartão abre o extrato completo (lista de transações deste cartão)
- Ações rápidas: Editar, Desativar/Arquivar, Ver Faturas

#### 4.3.3 Extrato do Cartão

- Lista de transações filtráveis por período (mês/ano)
- Cada transação exibe: data, descrição, categoria, valor, parcela (se houver)
- Ação de Estorno: marca a transação como estornada, reverte valor no saldo/limite
- Agrupamento por dia ou por categoria

#### 4.3.4 Configurações do Cartão

- Editar limite a qualquer momento (recalcula disponível)
- Editar saldo a qualquer momento (para ajustes/correções)
- Datas de fechamento e vencimento editáveis

---

### 4.4 Módulo 4: Transações (Saídas)

**Rota:** `/transacoes` — Registro de despesas.

#### 4.4.1 Formulário de Nova Transação

| Campo | Tipo | Obrigatório | Obs. |
|-------|------|-------------|------|
| Nome/Descrição | text | Sim | Ex.: iFood, Conta de Luz, Netflix |
| Categoria | select | Sim | Hierárquico: seleciona pai e filha |
| Subcategoria | select | Sim | Filha da categoria selecionada |
| Data | date | Sim | Data da compra/despesa |
| Perfil (Pessoa) | select | Sim | Qual perfil gerou esta despesa |
| Meio de Pagamento | select | Sim | Cartão específico (lista) \| Dinheiro/PIX |
| Tipo | select | Se cartão | `CREDIT` \| `DEBIT` (automático pelo cartão selecionado) |
| Parcelas | number | Se crédito | Qtd de parcelas (default 1) |
| Valor Total | number | Sim | Valor total da compra |
| Valor por Parcela | computed | — | Calculado automaticamente: total / parcelas |
| Compartilhado? | checkbox | Não | Ativa modo de divisão entre perfis |
| Divisão | select/number | Se compartilhado | 50/50 ou percentual customizado |
| Observação | textarea | Não | Campo livre para anotações |

**Regras de Negócio — Parcelas**

- Se `parcelas > 1`: cria N registros em `Parcela` vinculados à `Transacao`
- Cada parcela tem sua `dataVencimento` calculada: data + N meses
- Parcelas de cartão de crédito são vinculadas a faturas mensais automaticamente
- Parcelas podem ser marcadas como pagas individualmente

---

### 4.5 Módulo 5: Categorias Hierárquicas

**Rota:** `/categorias` — Gestão da árvore de categorias do tenant.

#### 4.5.1 Estrutura

- Duas camadas: **Categoria Pai** (ex.: Transporte) → **Subcategoria Filha** (ex.: Uber, Gasolina)
- O valor total de uma categoria pai é a soma automática de suas filhas
- Categorias são globais do tenant (não são por perfil)
- Subcategoria pode ser reatribuída a outro pai

#### 4.5.2 Categorias Padrão (Seed)

| Categoria Pai | Subcategorias Sugeridas |
|--------------|------------------------|
| Moradia | Aluguel, Condomínio, Energia, Água, Internet, Gás |
| Alimentação | Supermercado, Restaurante, iFood/Delivery, Padaria |
| Transporte | Combustível, Uber/99, Ônibus/Metrô, Estacionamento, Manutenção |
| Saúde | Plano de Saúde, Farmácia, Consulta, Exame |
| Lazer | Cinema, Streaming, Viagem, Jogos, Hobbies |
| Educação | Curso, Livros, Assinatura Educacional |
| Vestuário | Roupas, Calçados, Acessórios |
| Pets | Ração, Veterinário, Banho e Tosa |
| Assinaturas | Netflix, Spotify, Amazon, Adobe (subcategoria especial) |
| Outros | Presentes, Doações, Custos Imprevistos |

---

### 4.6 Módulo 6: Assinaturas

**Rota:** `/assinaturas` — Painel visual de recorrências mensais.

#### 4.6.1 Campos da Assinatura

| Campo | Tipo | Descrição |
|-------|------|-----------|
| Nome | text | Ex.: Netflix, Spotify, Academia |
| Valor | number | Valor mensal da cobrança |
| Dia de Cobrança | number | Dia do mês que debita (1–31) |
| Cartão Vinculado | select | Cartão de crédito/débito onde debita |
| Categoria | select | Subcategoria do tipo 'Assinatura' |
| Status | toggle | `ACTIVE` \| `INACTIVE` |
| Debitado este mês? | checkbox | Atualizado manualmente ou por confirmação |

#### 4.6.2 Layout Kanban

- **Coluna 'Pendente':** assinaturas ativas não marcadas como debitadas no mês corrente
- **Coluna 'Debitado':** assinaturas marcadas como debitadas no mês corrente
- Drag-and-drop entre colunas para confirmar débito rapidamente
- Badge de total por coluna (valor somado)
- Ações: Editar valor, Inativar, Excluir (com confirmação)

---

### 4.7 Módulo 7: Faturas

**Rota:** `/faturas` — Por cartão de crédito.

#### 4.7.1 Visualização de Fatura

- Seletor de cartão + período (mês/ano) na parte superior
- Resumo: Data de Fechamento, Data de Vencimento, Valor Total, Status (`PAGO` | `PENDENTE`)
- Lista de lançamentos: transações avulsas + parcelas com vencimento no período
- Agrupamento opcional por categoria
- Ação: `Marcar fatura como paga` — atualiza status e registra pagamento

#### 4.7.2 Histórico de Faturas

- Timeline de faturas anteriores por cartão
- Cada item mostra: mês, valor total, status, data de pagamento
- Clique para expandir e ver os lançamentos daquela fatura

---

### 4.8 Módulo 8: Dashboard Principal

**Rota:** `/dashboard` — Visão financeira consolidada ou por perfil.

#### 4.8.1 Componentes do Dashboard

| Componente | Descrição | Tipo de Dado |
|-----------|-----------|-------------|
| Saldo do Mês | Entradas confirmadas − Saídas do mês corrente | KPI Card |
| Rendas a Confirmar | Lista de ocorrências pendentes com botão rápido | Lista destacada |
| Projeção do Mês | Saldo potencial se todas as rendas pendentes forem confirmadas | KPI Card |
| Gastos por Categoria | Top categorias com barra de progresso vs orçamento | Barras horizontais |
| Evolução Mensal | Gráfico de linha: entradas x saídas dos últimos 6 meses | Line Chart |
| Próximos Vencimentos | Faturas, parcelas e assinaturas a vencer nos próximos 7 dias | Lista cronológica |
| Assinaturas do Mês | Pendentes de débito no mês atual com total | Mini Kanban resumido |
| Comparativo Mensal | % de variação vs mês anterior por categoria | Tabela comparativa |
| Faturas em Aberto | Cartões com faturas pendentes e valores | Cards por cartão |

#### 4.8.2 Filtros do Dashboard

- **Filtro por Perfil:** `Consolidado (Todos)` | Perfil Primário | Perfil Secundário
- **Filtro por Período:** mês atual (padrão), meses anteriores, range customizado
- Alternância instantânea — sem recarregamento de página (client-side com React Query)

---

### 4.9 Módulo 9: Chat IA (Gemini)

**Rota:** `/chat` — Interface de chat com IA financeira via Thesys UI.

#### 4.9.1 Contexto Injetado nas Queries

A cada consulta ao Gemini, o backend injeta automaticamente o contexto financeiro do tenant como JSON:

- Saldo atual do mês por perfil
- Top 5 categorias de gasto do mês
- Rendas confirmadas e pendentes
- Faturas em aberto e vencimentos próximos
- Orçamentos configurados e % de uso
- Metas de economia e progresso
- Histórico dos últimos 3 meses (resumo)

#### 4.9.2 Casos de Uso Suportados

- `Quanto gastei em restaurantes este mês?` → resposta com valor e % do orçamento
- `Gere um relatório financeiro de setembro` → narrativa em linguagem natural
- `Consigo guardar R$800 este mês?` → análise de fluxo de caixa
- `Quais assinaturas posso cancelar?` → análise de custo-benefício por frequência de uso
- `Compare meus gastos em Lazer dos últimos 3 meses` → comparativo com tendência

#### 4.9.3 Integração Técnica

- **Model:** `gemini-1.5-pro` (janela de contexto de 1M tokens)
- **Prompt de sistema:** persona financeira pessoal + instruções de formato
- Rate limiting na rota de chat para controle de custos
- Histórico de conversa mantido no lado cliente (stateless no backend)

---

### 4.10 Módulo 10: Orçamentos / Metas por Categoria

**Rota:** `/orcamentos`

#### 4.10.1 Configuração de Orçamento

- Definir limite mensal por categoria (ex.: Lazer = R$ 300,00)
- O limite se aplica ao mês configurado ou recorrentemente
- Visualização no Dashboard: barra de progresso (gasto atual / limite)

#### 4.10.2 Sistema de Alertas

| Gatilho | Ação |
|---------|------|
| Gasto >= 80% do orçamento | Notificação in-app: `Você usou 80% do orçamento de [categoria]` |
| Gasto >= 100% do orçamento | Notificação urgente: `Você ultrapassou o orçamento de [categoria]` |
| IA consultada | Contexto de orçamentos incluído automaticamente nas respostas |

---

### 4.11 Módulo 11: Notificações & Alertas

| Tipo de Alerta | Gatilho | Canal |
|----------------|---------|-------|
| Renda Fixa Pendente | Dia de vencimento atingido sem confirmação | In-app + E-mail |
| Lembrete de Renda | +24h e +48h sem confirmação (configurável) | In-app + E-mail |
| Fatura Vencendo | X dias antes do vencimento (padrão: 3 dias) | In-app + E-mail |
| Assinatura a Debitar | Dia anterior ao dia de cobrança | In-app |
| Orçamento 80% | Gasto atingiu 80% do limite da categoria | In-app |
| Orçamento Ultrapassado | Gasto ultrapassou o limite da categoria | In-app + E-mail |
| Parcela Vencendo | X dias antes do vencimento da parcela | In-app |
| Meta em Risco | Ritmo atual compromete atingir a meta no prazo | In-app |

#### 4.11.1 Configurações de Notificação

- Ativar/desativar por tipo de alerta
- Configurar antecedência (em dias) para alertas de vencimento
- Configurar frequência de lembretes de renda (24h, 48h, 72h)
- Centro de notificações in-app: sino no header com badge de contagem

---

### 4.12 Módulo 12: Relatórios & Exportação

**Rota:** `/relatorios`

#### 4.12.1 Tipos de Relatório

- **Mensal:** entradas, saídas, saldo, top categorias para um mês
- **Anual:** consolidado de todos os meses com comparativo
- **Por Perfil:** filtra transações de um perfil específico
- **Por Categoria:** evolução de gastos em uma categoria ao longo do tempo
- **Por Cartão:** extrato e faturas de um cartão em um período

#### 4.12.2 Exportação

- **PDF:** relatório formatado com gráficos e tabelas (biblioteca: `puppeteer` ou `pdfkit`)
- **CSV:** dados brutos para análise em planilhas
- **IA Narrativa:** botão `Gerar Análise com IA` → Gemini narra o relatório em linguagem natural

---

### 4.13 Módulo 13: Divisão de Gastos Compartilhados

- Ao criar uma transação, o checkbox `Compartilhado` aparece se houver mais de 1 perfil
- **Modo 50/50:** valor dividido igualmente entre os perfis selecionados
- **Modo Percentual:** o usuário define % de cada perfil (deve somar 100%)
- Painel dedicado no Dashboard: `Acerto do Mês` — mostra o saldo devedor entre perfis
- Histórico de acertos anteriores

---

### 4.14 Módulo 14: Metas de Economia

**Rota:** `/metas`

| Campo | Descrição |
|-------|-----------|
| Descrição | Ex.: Viagem para Europa, Reserva de Emergência |
| Valor Alvo | Quanto quer guardar no total (R$) |
| Aporte Mensal | Quanto planeja guardar por mês (R$) |
| Data Alvo | Data desejada para atingir a meta |
| Perfil | A qual perfil esta meta pertence |
| Valor Acumulado | Atualizado manualmente ou automaticamente |

#### 4.14.1 Acompanhamento

- Barra de progresso: valor acumulado / valor alvo (%)
- Projeção automática: com base no aporte mensal, calcula data estimada de conclusão
- Alerta da IA: se o ritmo de gastos comprometer o aporte mensal, notificação + conselho

---

## 5. Contrato de API — Endpoints Principais

> Todas as rotas (exceto `/api/auth/*`) exigem header: `Authorization: Bearer <token>`.
> Respostas seguem o padrão: `{ data, error, meta }`.

### 5.1 Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/register` | Registro de novo usuário + criação de tenant |
| POST | `/api/auth/login` | Login — retorna JWT |
| POST | `/api/auth/logout` | Invalida sessão/cookie |
| GET | `/api/auth/me` | Retorna dados do usuário autenticado + perfis |
| PATCH | `/api/auth/me` | Atualiza nome ou senha do usuário |

### 5.2 Perfis

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/profiles` | Lista todos os perfis do tenant |
| POST | `/api/profiles` | Cria novo perfil secundário |
| PATCH | `/api/profiles/:id` | Atualiza nome ou status do perfil |
| DELETE | `/api/profiles/:id` | Soft delete do perfil (apenas SECONDARY) |

### 5.3 Rendas

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/rendas` | Lista todas as rendas do tenant (com filtro por perfil) |
| POST | `/api/rendas` | Cadastra nova fonte de renda |
| PATCH | `/api/rendas/:id` | Atualiza renda existente |
| DELETE | `/api/rendas/:id` | Remove/inativa uma renda |
| GET | `/api/rendas/pendentes` | Lista ocorrências com `status = pending_confirmation` |
| POST | `/api/rendas/ocorrencias/:id/confirmar` | Confirma recebimento de uma ocorrência |
| POST | `/api/rendas/ocorrencias/:id/cancelar` | Cancela ocorrência do mês |
| PATCH | `/api/rendas/ocorrencias/:id/reagendar` | Atualiza `dataEsperada` da ocorrência |

### 5.4 Cartões

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/cartoes` | Lista todos os cartões do tenant |
| POST | `/api/cartoes` | Cadastra novo cartão |
| GET | `/api/cartoes/:id` | Detalhes + extrato do cartão |
| PATCH | `/api/cartoes/:id` | Edita limite, saldo, datas ou nome |
| DELETE | `/api/cartoes/:id` | Arquiva cartão |
| POST | `/api/cartoes/:id/estornar/:transacaoId` | Estorna uma transação do extrato |

### 5.5 Transações

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/transacoes` | Lista transações com filtros (período, perfil, categoria, cartão) |
| POST | `/api/transacoes` | Registra nova transação (cria parcelas se houver) |
| GET | `/api/transacoes/:id` | Detalhes de uma transação + suas parcelas |
| PATCH | `/api/transacoes/:id` | Edita transação (campos não financeiros) |
| DELETE | `/api/transacoes/:id` | Remove transação e suas parcelas |
| PATCH | `/api/transacoes/parcelas/:id/pagar` | Marca parcela como paga |

### 5.6 Dashboard, IA e demais

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/dashboard` | Retorna todos os KPIs e dados do dashboard |
| POST | `/api/chat` | Envia mensagem ao Gemini com contexto injetado |
| GET | `/api/categorias` | Lista categorias hierárquicas do tenant |
| POST/PATCH/DELETE | `/api/categorias/:id` | CRUD de categorias e subcategorias |
| GET/POST/PATCH/DELETE | `/api/assinaturas` | CRUD de assinaturas |
| GET | `/api/faturas` | Lista faturas por cartão e período |
| PATCH | `/api/faturas/:id/pagar` | Marca fatura como paga |
| GET/POST/PATCH/DELETE | `/api/orcamentos` | CRUD de orçamentos por categoria |
| GET/POST/PATCH/DELETE | `/api/metas` | CRUD de metas de economia |
| GET | `/api/notificacoes` | Lista notificações do usuário |
| PATCH | `/api/notificacoes/:id/ler` | Marca notificação como lida |
| GET | `/api/relatorios/mensal` | Dados para relatório mensal |
| GET | `/api/relatorios/exportar` | Gera PDF ou CSV do relatório |

---

## 6. Regras de Negócio Consolidadas

| ID | Regra | Comportamento |
|----|-------|--------------|
| RN-01 | Criação de Tenant | 1º registro cria `tenant_id` (UUID) e perfil PRIMARY automaticamente |
| RN-02 | Setup Obrigatório | Usuário não acessa `/dashboard` sem `isSetupComplete = true` |
| RN-03 | Renda Fixa - Geração | Cron job às 00:00 cria `RendaOcorrencia` `pending_confirmation` na data prevista |
| RN-04 | Renda Fixa - Saldo | Saldo só é atualizado após o usuário confirmar explicitamente o recebimento |
| RN-05 | Renda Variável | 100% manual; sem geração automática; sem projeção de saldo |
| RN-06 | Parcelas | Parcela 1/N vence no mês da compra; 2/N no mês seguinte, etc. |
| RN-07 | Fatura de Crédito | Transações até `diaFechamento` entram na fatura corrente; após = próxima |
| RN-08 | Estorno | Estorno reverte valor no saldo/limite; não exclui a transação (soft reverse) |
| RN-09 | Orçamento | Limite avaliado por categoria; alerta a 80% e 100% |
| RN-10 | Isolamento de Tenant | Toda query ao banco inclui `WHERE tenant_id = ?` para segurança |
| RN-11 | Deletar Categoria | Só se não houver transações vinculadas; caso contrário, inativa |
| RN-12 | Gasto Compartilhado | Percentuais devem somar exatamente 100%; validação no backend |
| RN-13 | Perfil Primário | Não pode ser deletado nem desativado; sempre existe ao menos 1 perfil |
| RN-14 | Limite do Cartão | Ao registrar transação de crédito: verifica limite disponível; alerta se insuficiente |
| RN-15 | Rate Limiting | Auth: 5 tentativas/15min por IP. Chat IA: 50 req/hora por tenant |

---

## 7. Estratégia de Testes (TDD)

Todo o backend segue **Test-Driven Development**. Os testes são escritos **ANTES** da implementação e devem passar antes de avançar para o frontend.

### 7.1 Ferramentas

- **Vitest:** test runner rápido, compatível com TypeScript sem configuração extra
- **Supertest:** testes de integração das API Routes do Next.js
- **Prisma Mock / `@prisma/client` mock:** isolamento do banco em testes unitários
- **Faker.js:** geração de dados de teste realistas

### 7.2 Cobertura por Camada

| Camada | Tipo de Teste | Exemplo |
|--------|--------------|---------|
| Service | Unitário | `auth.service.test.ts` — testa hashing, validação, geração de JWT |
| Controller | Unitário | `rendas.controller.test.ts` — mock do service, testa mapeamento HTTP |
| API Route | Integração | `POST /api/auth/register` — testa fluxo completo com DB de teste |
| Model | Integração | `user.model.test.ts` — queries com banco de teste (Docker) |

### 7.3 Casos de Teste Obrigatórios por Feature

#### Auth Service

- Deve criar tenant e perfil PRIMARY ao registrar primeiro usuário
- Deve rejeitar email duplicado com erro 409
- Deve hashear senha corretamente (não armazenar plain text)
- Deve gerar JWT válido com payload correto após login
- Deve rejeitar senha incorreta com erro 401 genérico
- Deve bloquear após 5 tentativas falhas (rate limit)

#### Rendas Service

- Deve criar `RendaOcorrencia` com `status pending_confirmation` na data prevista
- Deve atualizar saldo APENAS após confirmação explícita
- Não deve criar `RendaOcorrencia` automática para renda variável
- Deve enviar notificação após 24h sem confirmação

#### Transações Service

- Deve criar N parcelas com datas corretas ao registrar compra parcelada
- Deve vincular parcelas às faturas corretas pelo `diaFechamento` do cartão
- Deve rejeitar transação se limite do cartão for insuficiente (apenas alerta)
- Deve calcular corretamente a divisão em gastos compartilhados

---

## 8. Setup do Projeto

### 8.1 Pré-requisitos

- Node.js >= 20.x
- pnpm >= 9.x
- PostgreSQL >= 15 (local ou Docker)
- Conta Google Cloud com Gemini API habilitada

### 8.2 Dependências Principais (package.json)

```json
// Produção
"next", "react", "react-dom",
"@prisma/client", "prisma",
"next-auth",           // ou jose para JWT manual
"bcryptjs", "@types/bcryptjs",
"zod",                 // Validação de schemas
"axios",               // HTTP client
"@google/generative-ai",  // Gemini SDK
"date-fns",            // Manipulação de datas
"recharts",            // Gráficos no Dashboard
"shadcn/ui",           // componentes individuais

// Dev / Test
"vitest", "@vitest/coverage-v8",
"supertest", "@types/supertest",
"@faker-js/faker",
"typescript", "@types/node"
```

### 8.3 Variáveis de Ambiente (.env)

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/financeflow
JWT_SECRET=sua_chave_secreta_super_forte_aqui
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=sua_chave_gemini_aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
EMAIL_FROM=noreply@financeflow.app
EMAIL_SERVER_HOST=smtp.example.com     # Opcional — para notif por email
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=seu_usuario
EMAIL_SERVER_PASS=sua_senha
```

---

## 9. Glossário

| Termo | Definição |
|-------|-----------|
| Tenant | Conta isolada de um usuário principal. Todos os dados do sistema pertencem a um tenant. |
| Perfil (Profile) | Entidade dentro de um tenant. Pode ser PRIMARY (titular) ou SECONDARY (vinculado). |
| Renda Fixa | Entrada com data de vencimento recorrente que requer confirmação manual do recebimento. |
| Renda Variável | Entrada sem recorrência automática; registrada manualmente quando ocorre. |
| RendaOcorrencia | Instância mensal de uma Renda Fixa. Criada automaticamente na data prevista. |
| pending_confirmation | Status de RendaOcorrencia: gerada mas ainda não confirmada pelo usuário. |
| confirmed | Status de RendaOcorrencia: recebimento confirmado, saldo atualizado. |
| cancelled | Status de RendaOcorrencia: usuário marcou como não recebido no mês. |
| Fatura | Ciclo mensal de gastos de um cartão de crédito, com data de fechamento e vencimento. |
| Parcela | Subdivisão de uma transação de crédito. Cada parcela tem data de vencimento individual. |
| Orçamento | Limite mensal configurado pelo usuário para uma categoria de gasto. |
| Meta de Economia | Objetivo financeiro com valor alvo, aporte mensal e data desejada. |
| TDD | Test-Driven Development: testes escritos antes da implementação do código. |
| Package by Layer | Organização do backend por camada técnica: controllers, services, models. |
| SDD | Software Design Document: documento de design e planejamento do sistema. |

---

*FinanceFlow — SDD v1.0 | Confidencial*
