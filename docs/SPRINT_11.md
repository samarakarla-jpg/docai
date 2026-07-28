# Sprint 11 — Biblioteca como Entrada do Fluxo de Criação

## Objetivo

Conectar cada modelo da biblioteca ao formulário de criação existente, mantendo um único formulário e um único motor de geração.

## Escopo

- Adicionar a ação "Usar este modelo" aos itens da biblioteca.
- Encaminhar ID, categoria e nome pela URL para a rota de criação existente.
- Validar o contexto recebido contra o catálogo antes de exibi-lo.
- Associar cada modelo a um dos tipos de contrato já suportados.
- Preencher somente o contexto inicial do contrato, preservando todos os campos atuais.
- Tornar o formulário declarativamente configurável para futuras substituições de textos e campos adicionais.
- Preservar o acesso direto ao formulário sem origem na biblioteca.

## Arquivos autorizados

- `docs/SPRINT_11.md`
- `lib/docai/domain/contract-library.ts`
- `lib/docai/domain/contract-library.test.ts`
- `app/dashboard/library/[category]/page.tsx`
- `app/dashboard/contracts/new/[type]/page.tsx`
- `components/docai/contracts/contract-details-form.tsx`
- `components/docai/contracts/contract-form.tsx`

## Fluxo de dados

O link da biblioteca aponta para `/dashboard/contracts/new/[type]` e envia `model`, `category` e `name` como parâmetros de consulta. A rota valida os três valores, o tipo da rota e o catálogo. Somente o modelo validado é fornecido ao formulário.

O formulário recebe uma configuração serializável com contexto inicial, substituições opcionais de campos existentes e campos adicionais opcionais. Nesta Sprint, os modelos usam apenas o contexto inicial e não adicionam campos.

## Fora do escopo

- Novos textos jurídicos ou prompts por modelo.
- Alteração da Server Action ou do motor de geração.
- Gemini ou outra integração de IA.
- Stripe, pagamentos ou controle de acesso adicional.
- Autenticação, Supabase, histórico ou PDF.
- Dependências, configurações ou lockfiles.

## Critérios de aceitação

- Todo modelo possui um tipo e uma configuração de formulário válidos.
- "Usar este modelo" abre a rota de criação correspondente.
- ID, categoria e nome são enviados e validados.
- Contextos ausentes preservam o acesso direto atual.
- Contextos parciais, adulterados ou incompatíveis retornam página não encontrada.
- O modelo selecionado é identificado no formulário.
- O campo de contexto recebe o nome do modelo como valor inicial editável.
- Todos os campos atuais permanecem disponíveis.
- Existe um único componente de formulário.
- Nenhum campo adicional é ativado nesta Sprint.
- Testes, typecheck, build e `git diff --check` possuem resultado conhecido.

## Estado de entrega

A Sprint estará tecnicamente concluída após implementação, revisão e validação dos sete arquivos autorizados. O encerramento depende de aprovação explícita do resultado.
