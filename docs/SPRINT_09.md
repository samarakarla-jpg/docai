# Sprint 09 — Estrutura da Biblioteca de Contratos

## Objetivo

Criar a estrutura inicial da Biblioteca de Contratos com categorias e modelos de exemplo, preservando integralmente os fluxos existentes de geração, autenticação, persistência, histórico e exportação.

## Escopo

- Definir um catálogo estático e tipado de categorias.
- Definir modelos de contrato de exemplo associados às categorias.
- Criar a tela "Biblioteca de Contratos".
- Exibir todas as categorias em cards.
- Permitir abrir uma categoria e consultar seus modelos de exemplo.
- Adicionar a biblioteca à navegação autenticada existente.

## Categorias

- Contratos Gerais
- Construção
- Tecnologia
- Marketing
- Design e Criativos
- Saúde
- Educação
- Eventos
- Serviços Gerais
- Consultoria

## Arquivos autorizados

- `docs/SPRINT_09.md`
- `lib/docai/domain/contract-library.ts`
- `lib/docai/domain/contract-library.test.ts`
- `app/dashboard/library/page.tsx`
- `app/dashboard/library/[category]/page.tsx`
- `components/layout/sidebar.tsx`

## Fora do escopo

- Geração de contratos e alterações no Gemini.
- Stripe, pagamentos, planos ou controle de acesso adicional.
- Autenticação, middleware ou sessão.
- Supabase, migrations ou persistência da biblioteca.
- Histórico de contratos.
- PDF, impressão ou download.
- Formulários e tipos de contrato existentes.
- Dependências, configurações ou lockfiles.

## Estratégia de dados

As categorias e os modelos de exemplo serão mantidos em tabelas estáticas tipadas no domínio. Nesta etapa, o catálogo não será persistido no Supabase e não possuirá operações de criação, edição ou exclusão.

## Critérios de aceitação

- As dez categorias aprovadas estão disponíveis no catálogo.
- Cada categoria possui slug único e pelo menos um modelo de exemplo.
- Todo modelo referencia uma categoria existente.
- A tela da biblioteca apresenta todas as categorias em cards.
- O card abre a página da categoria correspondente.
- A página da categoria lista apenas seus modelos.
- Categorias desconhecidas retornam estado de página não encontrada.
- A sidebar oferece acesso à biblioteca e indica a rota atual.
- Nenhuma capacidade fora do escopo é modificada.
- Testes aplicáveis, typecheck, build e `git diff --check` possuem resultado conhecido.

## Estado de entrega

A Sprint estará tecnicamente concluída após implementação, revisão e validação dos seis arquivos autorizados. O encerramento depende de aprovação explícita do resultado.
