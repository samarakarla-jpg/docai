# Sprint 12 — Migração para ContractDefinition e formSchema

## Objetivo

Estabilizar a arquitetura de contratos do DocAI com definições declarativas, um único renderer de formulário e compatibilidade integral com o motor de geração existente.

## Escopo

- Criar `ContractDefinition` como fonte de verdade de cada modelo.
- Criar schemas tipados de formulário e geração.
- Migrar os 67 modelos existentes sem adicionar ou remover modelos.
- Substituir `defaultContractObject`, `fieldOverrides` e `additionalFields` por `formSchema`.
- Renderizar integralmente o formulário a partir de suas seções e campos.
- Preservar IDs, rótulos, ajuda, obrigatoriedade, layout e valores atuais.
- Preservar o acesso direto ao formulário e o fluxo originado na biblioteca.
- Manter o mesmo motor e a mesma Server Action de geração.

## Arquivos autorizados

- `docs/SPRINT_12.md`
- `lib/docai/domain/contract-definition.ts`
- `lib/docai/domain/contract-form-schema.ts`
- `lib/docai/domain/contract-form-schema.test.ts`
- `lib/docai/domain/contract-library.ts`
- `lib/docai/domain/contract-library.test.ts`
- `app/dashboard/contracts/new/[type]/page.tsx`
- `components/docai/contracts/contract-details-form.tsx`
- `components/docai/contracts/contract-form.tsx`

## Compatibilidade

O schema padrão usa exatamente os dez nomes de campo já reconhecidos pela Server Action. O `ContractType` permanece como compatibilidade transitória e os schemas de geração descrevem o mesmo tipo e a mesma ordem de respostas. Nenhuma alteração será realizada no adaptador Gemini ou na persistência.

## Fora do escopo

- Novos contratos, campos ativos ou textos jurídicos.
- Mudança de prompt, IA ou motor de geração.
- Stripe, Supabase, autenticação, histórico ou PDF.
- Migrações, dependências, configurações ou lockfiles.

## Critérios de aceitação

- Todo modelo é uma `ContractDefinition` versionada.
- Todo modelo possui `formSchema` e `generationSchema` válidos.
- O `formSchema` é a única fonte usada pelo renderer.
- O renderer não contém seções ou campos contratuais hard-coded.
- Os dez campos atuais mantêm nomes, textos, ordem, layout e obrigatoriedade.
- O contexto inicial de cada modelo permanece editável.
- O acesso direto usa o mesmo schema sem contexto inicial.
- A Server Action e o motor de geração permanecem inalterados.
- Os 67 modelos continuam presentes e acessíveis.
- Testes, typecheck, build e `git diff --check` possuem resultado conhecido.

## Estado de entrega

A Sprint estará tecnicamente concluída após implementação, revisão e validação dos nove arquivos autorizados. O encerramento depende de aprovação explícita do resultado.
