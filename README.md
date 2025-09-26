# Projman Web

Interface web do sistema de gerenciamento de projetos. Frontend React que consome a API do backend Java.

## Stack

- React 18
- TypeScript
- Vite (build/dev server)
- Tailwind CSS
- React Router DOM
- Playwright (testes E2E)

## Como rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

A interface roda em `http://localhost:5173` e se conecta com a API em `http://localhost:8080`.

## Funcionalidades

- **Usuários**: listar e criar usuários do sistema
- **Equipes**: listar equipes e adicionar usuários nelas
- **Projetos**: listar e criar projetos, atribuir equipes e gerentes
- **Board**: visualização Kanban das tarefas com colunas para cada status

## Scripts disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Testes E2E com Playwright
npm run test:e2e          # modo headless (rápido)
npm run test:e2e:ui       # modo com interface (debug)
```

## Testes E2E

Os testes usam Playwright e testam a integração completa entre frontend e backend:

- **Banco isolado**: cada teste roda com um banco SQLite limpo (`projman-test.db`)
- **API dedicada**: backend de teste roda na porta 18080 para não conflitar
- **Limpeza automática**: banco é limpo antes de cada execução de teste

### Como funcionam os testes

1. Playwright inicia automaticamente o backend na porta 18080
2. O script `clear-test-db` limpa o banco de teste
3. Frontend de teste se conecta na API de teste
4. Testes rodam verificando criação e listagem de dados
5. Banco é limpo novamente ao final

Você não precisa fazer nada manual - só rodar `npm run test:e2e` e tudo acontece automaticamente.

## Backend

Este projeto precisa do backend Java rodando. Vá na pasta `../prova-A3/` e rode:

```bash
./dev-server
```

Ou para testes isolados:

```bash
./dev-test-db
```