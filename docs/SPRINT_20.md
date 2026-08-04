# Sprint 20 — Refinamento da experiência V1 para eletricistas

## Objetivo

Eliminar atritos encontrados no teste manual da Nova Proposta para eletricistas, preservando o fluxo orientado por configuração, a geração existente e a compatibilidade legada.

## Escopo

- Exibir e validar datas no formato brasileiro, sem valores automáticos.
- Acrescentar placeholders declarativos aos campos aprovados.
- Estruturar forma, condição e detalhes opcionais de pagamento.
- Enviar rótulos legíveis de selects para a geração sem alterar seus valores internos.
- Identificar cliente e eletricista nas assinaturas da proposta.
- Separar download de PDF, compartilhamento e impressão.
- Exibir `127 V (110 V)` sem alterar o valor interno `127v`.
- Iniciar a V1 diretamente na seleção do serviço quando houver apenas uma profissão disponível.

## Regras

- O renderer permanece único e interpreta somente propriedades genéricas do `formSchema`.
- O motor, Gemini, Stripe, autenticação, persistência, RLS, compositor e resolver permanecem inalterados.
- `ServiceDefinition` permanece estruturalmente inalterada.
- Não existem condições por ID de contrato ou serviço.
- O suporte arquitetural a múltiplas profissões permanece disponível.
- Registros legados continuam acessíveis e exportáveis.
- Não há integração direta com WhatsApp.

## Critérios de aceitação

- Campos de data começam vazios, aceitam `dd/mm/aaaa` e rejeitam datas impossíveis.
- Datas ISO anteriores continuam aceitas na fronteira e são normalizadas para apresentação brasileira.
- Os cinco exemplos aprovados aparecem como placeholders e não como respostas.
- A proposta coleta forma, condição e detalhes opcionais de pagamento.
- O contexto de geração usa rótulos legíveis e não valores técnicos de selects.
- Assinaturas da proposta distinguem cliente e eletricista e indicam nome e assinatura.
- Baixar PDF produz um arquivo; imprimir abre a impressão; compartilhar usa Web Share quando disponível.
- O fallback de compartilhamento baixa o PDF e orienta o anexo manual no WhatsApp.
- A tensão exibe `127 V (110 V)`, `220 V` e `Ainda precisa verificar`, preservando os valores internos.
- Com apenas Eletricista no catálogo, a tela começa diretamente na seleção do serviço.
- Com múltiplas profissões, o seletor continua disponível.
- Testes, typecheck, build e `git diff --check` possuem resultado conhecido.

## Estado de entrega

**Concluída em 4 de agosto de 2026.**

A Sprint foi encerrada por aprovação explícita do responsável pelo projeto, sem commit ou push automático. A revisão final confirmou os critérios de aceitação e registrou os seguintes resultados:

- 159 testes aprovados;
- typecheck aprovado;
- build de produção aprovado;
- `git diff --check` aprovado;
- revisão final de textos e mensagens concluída;
- autenticação, banco de dados, regras de negócio, arquitetura, funcionalidades e layout preservados durante o fechamento.
