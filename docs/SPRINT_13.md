# Sprint 13 — Categoria piloto e geração orientada por definição

## Objetivo

Consolidar a arquitetura definitiva do DocAI com dez contratos gerais de qualidade para MEIs, autônomos e pequenas empresas. Cada contrato será uma `ContractDefinition` completa e o fluxo de geração passará a interpretar declarativamente `formSchema` e `generationSchema`.

## Escopo

- Criar dez definições na categoria Contratos Gerais.
- Definir objetivo, formulário específico, valores iniciais seguros e seções de geração para cada contrato.
- Marcar toda estrutura jurídica como `initial-validation`.
- Criar um interpretador genérico entre definição e motor existente.
- Preservar o fluxo direto e todos os contratos preexistentes.
- Documentar como novos contratos passam a ser cadastrados somente por definição e testes.

## Contratos piloto

1. Prestação de Serviços.
2. Freelancer por Projeto.
3. Consultoria.
4. Compra e Venda.
5. Fornecimento de Produtos.
6. Locação de Bens e Equipamentos.
7. Confidencialidade — NDA.
8. Parceria Comercial sem Constituição de Sociedade.
9. Licença ou Cessão de Direitos Autorais.
10. Distrato de Contrato.

## Arquivos autorizados

- `docs/SPRINT_13.md`
- `ARCHITECTURE.md`
- `lib/docai/domain/contract-definition.ts`
- `lib/docai/domain/contract-general-definitions.ts`
- `lib/docai/domain/contract-general-definitions.test.ts`
- `lib/docai/domain/contract-library.ts`
- `lib/docai/domain/contract-library.test.ts`
- `lib/docai/domain/contract-models.ts`
- `lib/docai/application/create-schema-generation-request.ts`
- `lib/docai/application/create-schema-generation-request.test.ts`
- `components/docai/contracts/contract-details-form.tsx`
- `app/actions/generate-contract.ts`

## Regras arquiteturais

- Nenhum componente, rota ou motor será criado por contrato.
- A Server Action não poderá conhecer IDs de definições.
- Campos, defaults, objetivo, título, participantes, bindings e seções pertencem à `ContractDefinition`.
- O schema recebido do cliente nunca será confiado; a definição será resolvida novamente no servidor.
- O fluxo histórico sem definição permanecerá disponível e inalterado.
- Novas definições dentro dos tipos de motor existentes não exigirão alterações estruturais.

## Fora do escopo

- Cláusulas jurídicas definitivas ou afirmação de validade jurídica.
- Alteração de Gemini, serviços de IA ou prompts.
- Stripe, Supabase, autenticação, histórico e PDF.
- Novas rotas, formulários, renderers ou motores.
- Dependências, configurações e lockfiles.

## Critérios de aceitação

- Contratos Gerais possui exatamente as dez definições aprovadas.
- Cada definição possui `formSchema` e `generationSchema` próprios e coerentes.
- Toda estrutura jurídica está marcada como conteúdo inicial para validação.
- O interpretador não contém condição por contrato.
- Campos obrigatórios são validados a partir do `formSchema`.
- Somente respostas autorizadas pelo `generationSchema` chegam ao contexto de geração.
- O motor, o Gemini, a persistência e o PDF permanecem os mesmos.
- Os contratos anteriores e o acesso direto continuam funcionando.
- Testes, typecheck, build e `git diff --check` possuem resultado conhecido.
