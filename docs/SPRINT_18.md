# Sprint 18 — Nova Proposta orientada por serviços

## Objetivo

Integrar `ServiceDefinition` ao fluxo de Nova Proposta para que o usuário comece pela profissão e pelo serviço, preservando o catálogo de documentos, o renderer e o motor de geração existentes.

## Escopo

- Substituir o CTA principal "Novo contrato" por "Nova Proposta".
- Tornar Nova Proposta o ponto de entrada do fluxo de criação.
- Permitir a seleção de profissão e serviço a partir do catálogo configurado.
- Resolver no servidor o documento, a profissão, o serviço e o `formSchema` efetivo.
- Compor o schema original com as camadas genérica, profissional e específica do serviço.
- Reutilizar integralmente o renderer orientado por `formSchema`.
- Revalidar o mesmo contexto na Server Action antes da geração.
- Encaminhar respostas de campos de serviço no formato canônico já aceito pelo contexto de geração.
- Preservar os acessos existentes originados na Biblioteca e o fluxo direto legado.

## Arquivos autorizados

- `docs/SPRINT_18.md`
- `lib/docai/application/resolve-service-document-context.ts`
- `lib/docai/application/resolve-service-document-context.test.ts`
- `lib/docai/application/create-schema-generation-request.ts`
- `lib/docai/application/create-schema-generation-request.test.ts`
- `lib/docai/configuration/services/service-document-context.ts`
- `lib/docai/configuration/services/service-document-context.test.ts`
- `lib/docai/domain/contract-models.ts`
- `app/dashboard/contracts/new/page.tsx`
- `app/dashboard/contracts/new/[type]/page.tsx`
- `app/dashboard/contracts/page.tsx`
- `app/dashboard/contracts/result/page.tsx`
- `components/docai/contracts/service-document-selection.tsx`
- `components/docai/contracts/contract-type-selection.tsx` — removido
- `components/docai/contracts/contract-details-form.tsx`
- `components/layout/sidebar.tsx`
- `app/actions/generate-contract.ts`

## Regras arquiteturais

- `ContractDefinition` e `ServiceDefinition` permanecem independentes e inalteradas.
- O renderer recebe somente o `formSchema` final e não conhece profissão, serviço ou documento.
- `ResolveServiceDocumentContext` é a única operação que combina documento, serviço e camadas de formulário.
- A página e a Server Action resolvem o contexto pelos mesmos identificadores e pela mesma configuração do servidor.
- Schemas, definições e bindings enviados pelo cliente nunca são aceitos como fonte de verdade.
- As regras jurídicas, os bindings e as seções de geração permanecem na `ContractDefinition`.
- Os campos adicionais permanecem no vocabulário canônico do `formSchema`.
- O motor, o adaptador de IA, a persistência e o PDF permanecem inalterados.

## Fora do escopo

- Acoplamento entre IDs de `ServiceDefinition` e `ContractDefinition`.
- Novo renderer, motor, prompt, adaptador ou formato de resposta.
- Novos serviços, profissões, documentos jurídicos ou campos de formulário.
- Persistência de preferências profissionais ou serviços personalizados.
- Alterações em autenticação, Supabase, histórico, PDF, dependências ou lockfiles.

## Critérios de aceitação

- O CTA principal exibe "Nova Proposta".
- A entrada de Nova Proposta exige profissão e serviço válidos.
- Somente serviços ativos compatíveis com proposta podem ser selecionados.
- O contexto é resolvido novamente no servidor durante a submissão.
- O schema final combina as camadas na ordem base, genérica, profissão e serviço.
- Campos duplicados são consolidados pelas regras existentes do compositor.
- Campos obrigatórios das camadas são validados no servidor.
- Respostas de serviço autorizadas chegam a `definitionContext.answers`.
- A identidade do serviço selecionado chega ao contexto estruturado de geração.
- O renderer, o motor, o Gemini, a persistência e o PDF permanecem inalterados.
- Os fluxos existentes sem contexto de serviço permanecem compatíveis.
- Testes relacionados, typecheck, build e `git diff --check` possuem resultado conhecido.

## Estado de entrega

A Sprint estará tecnicamente concluída após implementação, revisão e validação dos arquivos autorizados. Commit, push e encerramento dependem de aprovação explícita.
