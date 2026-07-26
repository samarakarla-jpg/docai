# Estado do Projeto — DocAI

**Produto:** DocAI
**Base:** SaaS Starter Kit v1.0.0
**Referência da base:** tag `v1.0.0`, commit `cf3cb6dce444b9770d9627c208ee946fea825f58`
**Estado:** Sprints 01 a 05 implementadas e encerradas; Sprints 06 e 07 ainda não encerradas no contexto DocAI

## Release da fundação

O SaaS Starter Kit está oficialmente concluído na versão `v1.0.0`. A fundação foi validada, versionada e está pronta para servir de base a novos produtos. O DocAI é o primeiro produto derivado planejado a partir dela.

## Visão geral

O DocAI é o produto planejado para gerar rascunhos de contratos com IA. Este repositório foi clonado a partir do Starter Kit v1.0.0 e contém a fundação reutilizável e as camadas específicas das Sprints 01 a 05. As integrações reais e a interface específica do produto permanecem fora do estado implementado.

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

### Sprint 01 — Domínio e serviços

Encerrada. Os quatro modelos de contrato, `TemplateService`, `ContractService` e `AIService` estão implementados sem integração real com provedores.

### Sprint 02 — Criação de contratos

Encerrada. O `ContractCreationService` coordena validação, template, geração por interface e criação de rascunho.

### Sprint 03 — Camada de entrada

Encerrada. `RequestContractCreation` valida entradas, transforma comandos e retorna resultados estruturados.

### Sprint 04 — Gerenciamento de rascunhos

Encerrada. `ManageContractDrafts` implementa leitura, listagem, atualização e exclusão por `ContractService`.

### Sprint 05 — Persistência reutilizável

Encerrada. O repositório genérico e a implementação em memória estão disponíveis, sem adaptador Supabase real.

### Sprint 06 — Camada visual específica

Documentada, mas não encerrada como Sprint específica do DocAI. A interface neutra existente pertence à fundação do Starter Kit.

### Sprint 07 — Capacidades opcionais

Documentada, mas não encerrada como Sprint específica do DocAI. Os contratos opcionais existentes permanecem genéricos e desativados por padrão.

## Funcionalidades específicas implementadas

Em particular, ainda não existem:

- modelos de contrato específicos do DocAI;
- serviços de templates, rascunhos e geração desacoplada;
- fluxos de criação, entrada e gerenciamento de rascunhos;
- persistência genérica em memória para testes e desenvolvimento;
- formulários de contratos;
- serviço de geração de contratos;
- prompts ou chamadas ao Gemini;
- persistência de rascunhos em Supabase;
- planos, cobrança ou webhooks Stripe;
- configuração de produção ou deploy Vercel;
- exportação PDF, e-mail ou compartilhamento.

## Arquivos alterados nesta etapa

- `lib/docai/domain/` — modelos dos quatro contratos.
- `lib/docai/services/` — serviços específicos de templates, rascunhos e IA.
- `lib/docai/application/` — casos de uso de criação, entrada e gerenciamento.
- `lib/persistence/` — contratos e implementação em memória reutilizável.
- `SPRINT_03.md`, `SPRINT_04.md`, `SPRINT_05.md` — registros de encerramento.
- `PROJECT_STATE.md` — estado atual do produto.

Nenhuma dependência, configuração, integração real ou arquivo do Starter Kit congelado foi alterado.

## Pendências

- Definir jurisdição e aviso jurídico inicial.
- Detalhar campos, validações e regras de cada um dos quatro contratos.
- Definir política de privacidade, retenção, exclusão e uso de dados na IA.
- Escolher limites, custos e modelo operacional do Gemini.
- Definir planos, preços, limites e política de cobrança do Stripe.
- Definir estratégia de persistência Supabase e autorização por usuário.
- Definir ambientes e configuração de execução na Vercel.
- Criar a interface específica do DocAI em Sprint própria.
- Aprovar e implementar integrações reais somente em Sprints próprias.

## Próximos passos aprováveis

1. Definir jurisdição, aviso jurídico e campos finais dos quatro contratos.
2. Criar e aprovar a Sprint da interface específica do DocAI.
3. Definir privacidade, retenção, limites e custos antes de qualquer integração real.
4. Implementar, validar e encerrar cada Sprint antes de iniciar a seguinte.
5. Avaliar Supabase, Gemini, Stripe e Vercel somente em Sprints próprias aprovadas.

## Riscos atuais

- Gerar texto contratual incorreto ou inadequado à jurisdição.
- Expor dados sensíveis ao serviço de IA ou em logs.
- Custos e limites imprevisíveis do Gemini.
- Acoplamento de regras do DocAI a Supabase, Gemini, Stripe ou Vercel.
- Cobrança incoerente com o uso ou falhas de webhook.
- Interpretar as camadas implementadas como integração real com Gemini, Supabase ou Stripe.

Nenhum risco autoriza implementação preventiva. Cada risco deverá possuir mitigação e critério na Sprint correspondente.

## Fora do escopo atual

- Integrações reais com Supabase, Gemini, Stripe ou Vercel.
- Instalação de dependências, configuração de fornecedores ou alteração de ambiente.
- Commit, push, deploy, cobrança ou publicação.

## Condição de encerramento desta etapa

As Sprints 01 a 05 estão tecnicamente implementadas e encerradas. O próximo trabalho deve ser iniciado somente após uma Sprint específica aprovada para a interface do DocAI ou para uma integração externa.
