# Roadmap do Produto — DocAI

## 1. Objetivo

Este roadmap organiza a evolução do DocAI a partir do Starter Kit v1.0.0. Ele separa a fundação reutilizável das regras do gerador de contratos e define uma sequência técnica incremental. Uma etapa no roadmap é planejamento; não autoriza implementação, dependência, configuração, commit ou publicação.

## 2. Decisões de base

- Nome do produto: **DocAI**.
- Proposta: gerador de contratos com IA, sempre com revisão humana.
- Stack: Next.js, React, TypeScript, Tailwind CSS e App Router.
- Identidade e dados: Supabase, sempre atrás de contratos internos.
- IA: Gemini, acessado somente por adaptador implementado conforme contrato de IA.
- Pagamentos: Stripe, acessado somente por adaptador implementado conforme contrato de pagamentos.
- Execução e hospedagem: Vercel, com configuração segura e deploy controlado.
- Contratos e serviços de IA devem permanecer desacoplados do provedor.
- Modelos iniciais: Prestação de Serviços, Compra e Venda, Aluguel e Empréstimo.

## 3. Processo obrigatório de especificação e aprovação

Toda Sprint do DocAI, a partir de D01, deverá possuir uma fase documental própria antes de qualquer implementação.

### Fase de especificação

O documento da Sprint deverá definir:

- objetivo da Sprint;
- escopo funcional;
- arquivos autorizados para alteração;
- arquivos proibidos;
- dependências;
- estratégia de testes;
- critérios de aceitação;
- critérios de conclusão;
- riscos conhecidos.

### Regra de aprovação

- A documentação deve ser revisada antes do início da Sprint.
- A implementação somente poderá começar após aprovação explícita da documentação.
- A aprovação vale apenas para a Sprint e os arquivos nela definidos.
- Qualquer necessidade fora do escopo exige revisão documental e nova aprovação.
- Nenhuma Sprint poderá ser iniciada enquanto a Sprint anterior não estiver formalmente encerrada.
- A conclusão técnica não encerra a Sprint automaticamente; o encerramento também requer revisão e aprovação do resultado.

### Critérios obrigatórios de encerramento

Uma Sprint somente será considerada formalmente encerrada quando todos os itens abaixo estiverem atendidos:

- implementação concluída;
- documentação reconciliada com o código;
- critérios de aceitação atendidos;
- testes aprovados;
- typecheck aprovado;
- build aprovado;
- `git diff --check` aprovado;
- commit realizado;
- push realizado;
- branch sincronizada com `origin/main`;
- árvore de trabalho limpa;
- aprovação explícita registrada.

O fluxo obrigatório é:

`especificar → revisar → aprovar → implementar → validar → revisar resultado → encerrar`

Nenhuma Sprint futura, dependência, configuração, commit, push ou integração é autorizada apenas por sua presença neste roadmap.

## 4. Estado atual

O Starter Kit v1.0.0 está concluído e congelado. No contexto específico do DocAI, as Sprints 01 a 05 estão implementadas, validadas e encerradas:

- modelos de contrato e serviços específicos;
- criação, entrada e gerenciamento de rascunhos;
- contratos de persistência reutilizável e implementação em memória.

As Sprints 06 e 07 do DocAI ainda não estão encerradas. A interface neutra e os contratos opcionais existentes pertencem à fundação do Starter Kit e não representam a interface ou integrações reais do produto.

Ainda não foram implementados formulários do DocAI, isolamento por usuário, persistência Supabase, integração Gemini, pagamentos Stripe, exportação, e-mail ou operação específica na Vercel.

## 5. Ordem de execução proposta

### Fase 0 — Preparação do produto

**Sprint D01 — Refinamento de produto e decisões pendentes**

Antes da implementação, deverá existir e ser aprovada a especificação completa da Sprint D01 conforme o processo obrigatório acima.

- refinar campos, regras e textos dos quatro modelos já implementados;
- definir público inicial, jurisdição suportada e limites de responsabilidade;
- definir política preliminar de privacidade, retenção e revisão humana;
- confirmar contratos entre domínio, aplicação e infraestrutura.

### Fase 1 — Adaptação da fundação (concluída para as Sprints 01–05)

**Sprint D02 — Identidade e contexto DocAI (próxima capacidade planejada)**

Antes da implementação, deverá existir e ser aprovada a especificação completa da Sprint D02.

- adaptar textos e navegação neutra para o contexto DocAI;
- preservar autenticação do Starter Kit;
- definir isolamento por usuário e contexto de conta;
- não adicionar ainda geração, pagamento ou fluxo contratual completo.

### Fase 2 — Domínio e persistência de rascunhos (camada reutilizável concluída; produto ainda pendente)

**Sprint D03 — Modelos dos contratos (atendida pelas Sprints 01–02 do DocAI)**

Qualquer evolução deste recorte deverá ser precedida por especificação e aprovação próprias.

- definir tipos e validações dos quatro contratos;
- separar dados de entrada, rascunho gerado e metadados de ciclo de vida;
- criar testes de domínio sem IA, rede ou fornecedor.

**Sprint D04 — Rascunhos e persistência do produto (próxima persistência específica)**

Antes da implementação, deverá existir e ser aprovada a especificação completa da Sprint D04.

- implementar casos de uso de criação, leitura, atualização, listagem e exclusão de rascunhos;
- utilizar os repositórios substituíveis do Starter Kit;
- adicionar adaptador Supabase somente após contrato e configuração aprovados;
- garantir autorização por usuário no servidor.

### Fase 3 — Geração com IA

**Sprint D05 — Serviço de geração desacoplado**

Antes da implementação, deverá existir e ser aprovada a especificação completa da Sprint D05.

- definir entrada estruturada, contexto permitido e resultado normalizado;
- implementar o serviço de aplicação sem referência direta ao Gemini;
- tratar indisponibilidade, resposta inválida, limites e falhas de forma previsível;
- manter o adaptador de IA substituível e testável.

**Sprint D06 — Adaptador Gemini e fluxo de geração**

Antes da implementação, deverá existir e ser aprovada a especificação completa da Sprint D06.

- conectar Gemini somente após aprovação explícita do adaptador;
- configurar modelo, limites, timeout, custo e tratamento de dados;
- permitir geração de rascunhos dos quatro contratos;
- registrar revisão humana e versão do rascunho, se aprovado.

### Fase 4 — Interface do produto

**Sprint D07 — Fluxo de criação e revisão**

Antes da implementação, deverá existir e ser aprovada a especificação completa da Sprint D07.

- seleção do tipo de contrato;
- formulários orientados e validação;
- estados de geração, vazio, erro e sucesso;
- editor ou apresentação revisável do rascunho;
- responsividade e acessibilidade.

### Fase 5 — Monetização

**Sprint D08 — Planos e limites**

Antes da implementação, deverá existir e ser aprovada a especificação completa da Sprint D08.

- definir proposta comercial, limites e comportamento para excedentes;
- separar plano, uso e autorização de cobrança;
- documentar política de cancelamento e reembolso.

**Sprint D09 — Stripe desacoplado**

Antes da implementação, deverá existir e ser aprovada a especificação completa da Sprint D09.

- implementar adaptador Stripe atrás do contrato de pagamentos;
- configurar checkout, assinatura ou cobrança somente conforme decisão D08;
- tratar webhooks idempotentes, falhas e estados de pagamento;
- não expor chaves ao cliente.

### Fase 6 — Entrega documental

**Sprint D10 — Exportação e operação**

Antes da implementação, deverá existir e ser aprovada a especificação completa da Sprint D10.

- decidir se PDF, e-mail ou armazenamento externo são necessários;
- implementar somente capacidades aprovadas usando contratos do Starter Kit;
- documentar configuração Vercel, observabilidade, recuperação e suporte;
- executar validação de segurança, privacidade e compatibilidade.

**Sprint D11 — Preparação do lançamento**

Antes da implementação, deverá existir e ser aprovada a especificação completa da Sprint D11.

- validar fluxos críticos em ambiente de homologação;
- revisar custos e limites de Gemini, Supabase, Stripe e Vercel;
- verificar documentação, termos, privacidade e mensagens de limitação;
- registrar critérios de lançamento e pendências.

## 6. Dependências entre Sprints

1. D01 deve ser aprovada antes de alterar os modelos ou fluxos já implementados e antes de assumir decisões jurídicas, comerciais ou de privacidade.
2. D02 depende da fundação v1.0.0 e não deve alterar contratos reutilizáveis sem Sprint própria.
3. D03 já foi atendida pelas Sprints 01–02; qualquer evolução de domínio deve preceder novos fluxos de persistência ou geração.
4. D04 precede qualquer uso de persistência Supabase para dados do DocAI.
5. D05 deve existir antes do adaptador Gemini, e ambos devem ser testáveis sem o provedor real.
6. D07 depende de contratos estáveis de domínio e geração.
7. D08 deve definir decisões comerciais antes de D09.
8. D10 e D11 só devem ocorrer depois dos fluxos principais e dos riscos estarem evidenciados.

## 7. Critérios para avançar

Uma Sprint só poderá começar quando:

- a Sprint anterior estiver encerrada ou formalmente retirada;
- todos os critérios obrigatórios de encerramento da Sprint anterior estiverem comprovados;
- a especificação da Sprint atual estiver completa e aprovada;
- seus riscos forem conhecidos;
- os arquivos autorizados e proibidos estiverem definidos;
- os critérios de aceitação e conclusão puderem ser verificados.

Integrações reais exigem aprovação própria, configuração de ambiente e plano de rollback.

## 8. Critérios de lançamento inicial

O DocAI somente poderá ser considerado pronto para lançamento quando:

- os quatro modelos estiverem documentados e testados;
- geração, revisão e persistência estiverem isoladas por usuário;
- Gemini operar atrás de um contrato e possuir limites, custos e tratamento de falhas documentados;
- pagamentos Stripe estiverem coerentes com planos, estados e webhooks aprovados;
- Vercel, Supabase e variáveis de ambiente estiverem configurados sem segredos no repositório;
- privacidade, limitações jurídicas, termos e suporte estiverem revisados;
- testes, typecheck, build, segurança, acessibilidade e validação de ambiente tiverem resultado conhecido;
- não houver funcionalidade declarada pronta sem implementação ou evidência.

O roadmap não autoriza release, deploy ou cobrança. Cada operação deve ser solicitada separadamente.
