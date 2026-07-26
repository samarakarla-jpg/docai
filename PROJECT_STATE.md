# Estado do Projeto — DocAI

**Produto:** DocAI
**Base:** SaaS Starter Kit v1.0.0
**Referência da base:** tag `v1.0.0`, commit `cf3cb6dce444b9770d9627c208ee946fea825f58`
**Estado:** preparação documental; nenhuma funcionalidade específica do DocAI implementada

## Release da fundação

O SaaS Starter Kit está oficialmente concluído na versão `v1.0.0`. A fundação foi validada, versionada e está pronta para servir de base a novos produtos. O DocAI é o primeiro produto derivado planejado a partir dela.

## Visão geral

O DocAI é o produto planejado para gerar rascunhos de contratos com IA. Este repositório foi clonado a partir do Starter Kit v1.0.0 e ainda contém apenas a fundação reutilizável. A documentação específica criada nesta tarefa registra decisões de produto, sequência proposta e estado real, sem iniciar implementação.

## O que a base oferece

- Aplicação Next.js com App Router, React, TypeScript e Tailwind CSS.
- Autenticação e proteção básica de rotas do Starter Kit.
- Camada de serviços para templates e documentos conceituais.
- Repositório genérico substituível e implementação em memória para testes/desenvolvimento.
- Layout autenticado e componentes de estados neutros.
- Contratos opcionais e adaptadores nulos para IA, pagamentos, PDF, e-mail e armazenamento externo.
- Documentação de arquitetura, processo, validação e limites.

Essas capacidades são fundação. Nenhuma delas, isoladamente, implementa o produto DocAI.

## Decisões de produto registradas

- O nome do produto é DocAI.
- O produto gera contratos com auxílio de IA e exige revisão humana.
- Os tipos iniciais são Prestação de Serviços, Compra e Venda, Aluguel e Empréstimo.
- Next.js é a stack de aplicação.
- Supabase é a direção escolhida para identidade e persistência do produto, condicionada a Sprint e configuração aprovadas.
- Gemini é a direção escolhida para geração de IA, sempre atrás de serviço e adaptador desacoplados.
- Stripe é a direção escolhida para pagamentos, sempre atrás de contrato interno.
- Vercel é a direção escolhida para hospedagem e execução operacional.
- As regras do domínio DocAI ficarão separadas da fundação reutilizável.

## Sprints e estado

### Starter Kit v1.0.0

Concluído antes da criação do produto. A base foi validada e versionada com a tag `v1.0.0`.

### Sprint D01 — Especificação e decisões pendentes

Em planejamento. Este documento e `PRODUCT_SPEC.md` registram o primeiro recorte documental. Ainda faltam jurisdição inicial, campos completos, política de privacidade e critérios comerciais.

### Sprint D02 em diante

Não iniciadas. O roadmap contém apenas planejamento; nenhuma implementação de autenticação específica, domínio, geração, persistência DocAI, Gemini, Stripe ou Vercel foi feita neste produto.

## Funcionalidades específicas implementadas

Nenhuma.

Em particular, ainda não existem:

- modelos de contrato específicos do DocAI no código;
- formulários de contratos;
- serviço de geração de contratos;
- prompts ou chamadas ao Gemini;
- persistência de rascunhos em Supabase;
- planos, cobrança ou webhooks Stripe;
- configuração de produção ou deploy Vercel;
- exportação PDF, e-mail ou compartilhamento.

## Arquivos alterados nesta etapa

- `PRODUCT_SPEC.md` — especificação do produto DocAI.
- `ROADMAP.md` — sequência técnica proposta para o produto.
- `PROJECT_STATE.md` — estado atual e decisões registradas.

Nenhum arquivo de implementação, dependência, configuração ou ambiente foi alterado.

## Pendências

- Definir jurisdição e aviso jurídico inicial.
- Detalhar campos, validações e regras de cada um dos quatro contratos.
- Definir política de privacidade, retenção, exclusão e uso de dados na IA.
- Escolher limites, custos e modelo operacional do Gemini.
- Definir planos, preços, limites e política de cobrança do Stripe.
- Definir estratégia de persistência Supabase e autorização por usuário.
- Definir ambientes e configuração de execução na Vercel.
- Criar Sprints específicas com arquivos autorizados e critérios de aceite.
- Obter aprovação antes de qualquer implementação.

## Próximos passos aprováveis

1. Revisar e aprovar `PRODUCT_SPEC.md`, `ROADMAP.md` e `PROJECT_STATE.md`.
2. Criar a Sprint D01 com decisões de domínio, privacidade e limites.
3. Aprovar a Sprint D01 antes de criar qualquer código do DocAI.
4. Implementar, validar e encerrar cada Sprint antes de iniciar a seguinte.
5. Avaliar integrações reais somente quando seus contratos, riscos e configurações estiverem aprovados.

## Riscos atuais

- Gerar texto contratual incorreto ou inadequado à jurisdição.
- Expor dados sensíveis ao serviço de IA ou em logs.
- Custos e limites imprevisíveis do Gemini.
- Acoplamento de regras do DocAI a Supabase, Gemini, Stripe ou Vercel.
- Cobrança incoerente com o uso ou falhas de webhook.
- Interpretar a fundação do Starter Kit como produto já implementado.

Nenhum risco autoriza implementação preventiva. Cada risco deverá possuir mitigação e critério na Sprint correspondente.

## Fora do escopo atual

- Qualquer código ou funcionalidade específica do DocAI.
- Instalação de dependências, configuração de fornecedores ou alteração de ambiente.
- Integrações reais com Supabase, Gemini, Stripe ou Vercel.
- Commit, push, deploy, cobrança ou publicação.

## Condição de encerramento desta etapa

Esta etapa documental está concluída quando os três arquivos forem revisados pelo responsável. O próximo estado correto é aguardar aprovação; silêncio não constitui autorização para iniciar a Sprint D01 ou qualquer implementação.
