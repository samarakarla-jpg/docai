# Sprint 19 — Histórico de propostas identificável e coerente

## Objetivo

Completar o ciclo da Nova Proposta persistindo o contexto mínimo resolvido no servidor e apresentando propostas de forma identificável e coerente no histórico, na visualização e na exportação para PDF.

## Escopo

- Adicionar metadados opcionais à persistência existente: tipo de documento, ID da `ContractDefinition`, serviço, profissão e nomes dos participantes.
- Derivar os metadados exclusivamente do contexto resolvido e das respostas canônicas no servidor.
- Identificar propostas no histórico pelo serviço, participantes e data de criação.
- Usar terminologia de proposta na visualização e no PDF quando o registro possuir esse contexto.
- Exibir aviso claro de que o conteúdo gerado é um rascunho sujeito a leitura e revisão humana.
- Preservar a leitura e a apresentação dos registros legados.

## Arquivos autorizados

- `docs/SPRINT_19.md`
- `supabase/migrations/20260730000000_add_contract_document_context.sql`
- `lib/docai/infrastructure/persistence/supabase-contract-repository.ts`
- `lib/docai/infrastructure/persistence/supabase-contract-repository.test.ts`
- `app/actions/generate-contract.ts`
- `app/dashboard/contracts/page.tsx`
- `app/dashboard/contracts/[id]/page.tsx`
- `components/docai/contracts/download-pdf-button.tsx`
- `components/layout/sidebar.tsx`
- `app/dashboard/page.tsx`

## Regras arquiteturais

- `ContractDefinition`, `ServiceDefinition`, renderer, compositor, `ResolveServiceDocumentContext`, motor, Gemini, Stripe e autenticação permanecem inalterados.
- Identificadores e metadados recebidos do navegador não são fonte de verdade.
- O contexto é resolvido novamente no servidor antes de qualquer metadado ser persistido.
- A migração é aditiva, mantém a tabela existente e não altera as políticas de RLS.
- As colunas novas são opcionais para preservar registros anteriores à Sprint.

## Fora do escopo

- Cadastro ou reutilização de clientes.
- Orçamento itemizado, edição, regeneração ou exclusão de documentos.
- Novos documentos, profissões, serviços, integrações ou meios de compartilhamento.
- Assinatura eletrônica, cobrança, limites de uso ou alterações de autenticação.
- Encadeamento entre proposta, contrato, alteração de escopo, aceite e garantia.

## Critérios de aceitação

- Uma Nova Proposta é persistida com o tipo de documento `proposal`.
- Todos os metadados são derivados de contexto revalidado no servidor.
- Metadados livres enviados pelo navegador não são aceitos como fonte de verdade.
- O registro guarda definição, profissão, serviço e nomes dos participantes.
- O histórico identifica propostas por serviço, participantes e data.
- Propostas não são apresentadas como contrato de prestação de serviços.
- A página do registro usa terminologia de proposta e exibe seu conteúdo.
- A página e o documento imprimível destacam a necessidade de revisão humana.
- O nome preparado para o PDF de proposta começa com `proposta-`.
- Registros anteriores à migração continuam legíveis.
- Contratos legados preservam rótulos e comportamento existentes.
- As políticas de RLS e o isolamento por usuário permanecem inalterados.
- Não há condições por `serviceId` ou ID de contrato.
- As fronteiras arquiteturais protegidas permanecem inalteradas.
- Testes do repositório cobrem registros novos, metadados opcionais e registros legados.
- Testes, typecheck, build e `git diff --check` possuem resultado conhecido.

## Estado de entrega

A Sprint estará tecnicamente concluída após implementação, revisão e validação dos arquivos autorizados. Commit, push e encerramento dependem de aprovação explícita.
