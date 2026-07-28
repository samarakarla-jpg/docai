# Sprint 10 — Catálogo de Modelos da Biblioteca

## Objetivo

Transformar as categorias existentes em uma biblioteca informativa de modelos de contratos, mantendo cada modelo limitado a nome, descrição e estrutura prevista.

## Escopo

- Popular as dez categorias com os 67 modelos aprovados.
- Manter identificadores únicos e relacionamento tipado por categoria.
- Definir uma descrição e uma estrutura de seções para cada modelo.
- Exibir nome, descrição e estrutura na página da categoria.
- Ampliar os testes do catálogo para verificar conteúdo e integridade.

## Arquivos autorizados

- `docs/SPRINT_10.md`
- `lib/docai/domain/contract-library.ts`
- `lib/docai/domain/contract-library.test.ts`
- `app/dashboard/library/[category]/page.tsx`

## Fora do escopo

- Formulários ou páginas de preenchimento de modelos.
- Geração de contratos ou alteração do Gemini.
- Integração com IA ou outro fornecedor.
- Stripe, pagamentos, planos ou controle de acesso adicional.
- Autenticação, middleware ou sessão.
- Supabase, migrations ou persistência do catálogo.
- Histórico, PDF, impressão ou download.
- Dependências, configurações ou lockfiles.

## Estratégia de dados

Os modelos permanecem em catálogo estático tipado. A estrutura de cada modelo descreve apenas as seções previstas para evolução futura e não contém cláusulas, texto jurídico pronto ou comportamento executável.

## Critérios de aceitação

- As categorias contêm exatamente os modelos aprovados e na ordem definida.
- Existem 67 modelos no catálogo.
- Cada modelo possui ID único, nome, descrição e estrutura não vazios.
- Todo modelo pertence a uma das dez categorias existentes.
- A página da categoria exibe somente os modelos relacionados.
- Nome, descrição e estrutura são apresentados sem ação de geração.
- Nenhum arquivo fora da lista autorizada é alterado por esta Sprint.
- Testes aplicáveis, typecheck, build e `git diff --check` possuem resultado conhecido.

## Estado de entrega

A Sprint estará tecnicamente concluída após implementação, revisão e validação dos quatro arquivos autorizados. O encerramento depende de aprovação explícita do resultado.
