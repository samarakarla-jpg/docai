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

## 3. Ordem de execução proposta

### Fase 0 — Preparação do produto

**Sprint D01 — Especificação e decisões pendentes**

- detalhar campos, regras e textos dos quatro modelos;
- definir público inicial, jurisdição suportada e limites de responsabilidade;
- definir política preliminar de privacidade, retenção e revisão humana;
- confirmar contratos entre domínio, aplicação e infraestrutura.

### Fase 1 — Adaptação da fundação

**Sprint D02 — Identidade e contexto DocAI**

- adaptar textos e navegação neutra para o contexto DocAI;
- preservar autenticação do Starter Kit;
- definir isolamento por usuário e contexto de conta;
- não adicionar ainda geração, pagamento ou fluxo contratual completo.

### Fase 2 — Domínio e persistência de rascunhos

**Sprint D03 — Modelos dos contratos**

- definir tipos e validações dos quatro contratos;
- separar dados de entrada, rascunho gerado e metadados de ciclo de vida;
- criar testes de domínio sem IA, rede ou fornecedor.

**Sprint D04 — Rascunhos e persistência**

- implementar casos de uso de criação, leitura, atualização, listagem e exclusão de rascunhos;
- utilizar os repositórios substituíveis do Starter Kit;
- adicionar adaptador Supabase somente após contrato e configuração aprovados;
- garantir autorização por usuário no servidor.

### Fase 3 — Geração com IA

**Sprint D05 — Serviço de geração desacoplado**

- definir entrada estruturada, contexto permitido e resultado normalizado;
- implementar o serviço de aplicação sem referência direta ao Gemini;
- tratar indisponibilidade, resposta inválida, limites e falhas de forma previsível;
- manter o adaptador de IA substituível e testável.

**Sprint D06 — Adaptador Gemini e fluxo de geração**

- conectar Gemini somente após aprovação explícita do adaptador;
- configurar modelo, limites, timeout, custo e tratamento de dados;
- permitir geração de rascunhos dos quatro contratos;
- registrar revisão humana e versão do rascunho, se aprovado.

### Fase 4 — Interface do produto

**Sprint D07 — Fluxo de criação e revisão**

- seleção do tipo de contrato;
- formulários orientados e validação;
- estados de geração, vazio, erro e sucesso;
- editor ou apresentação revisável do rascunho;
- responsividade e acessibilidade.

### Fase 5 — Monetização

**Sprint D08 — Planos e limites**

- definir proposta comercial, limites e comportamento para excedentes;
- separar plano, uso e autorização de cobrança;
- documentar política de cancelamento e reembolso.

**Sprint D09 — Stripe desacoplado**

- implementar adaptador Stripe atrás do contrato de pagamentos;
- configurar checkout, assinatura ou cobrança somente conforme decisão D08;
- tratar webhooks idempotentes, falhas e estados de pagamento;
- não expor chaves ao cliente.

### Fase 6 — Entrega documental

**Sprint D10 — Exportação e operação**

- decidir se PDF, e-mail ou armazenamento externo são necessários;
- implementar somente capacidades aprovadas usando contratos do Starter Kit;
- documentar configuração Vercel, observabilidade, recuperação e suporte;
- executar validação de segurança, privacidade e compatibilidade.

**Sprint D11 — Preparação do lançamento**

- validar fluxos críticos em ambiente de homologação;
- revisar custos e limites de Gemini, Supabase, Stripe e Vercel;
- verificar documentação, termos, privacidade e mensagens de limitação;
- registrar critérios de lançamento e pendências.

## 4. Dependências entre Sprints

1. D01 deve ser aprovada antes de definir modelos e fluxos.
2. D02 depende da fundação v1.0.0 e não deve alterar contratos reutilizáveis sem Sprint própria.
3. D03 precede D04 e D05; o serviço de IA não deve inventar o modelo de domínio.
4. D04 precede qualquer uso de persistência Supabase para dados do DocAI.
5. D05 deve existir antes do adaptador Gemini, e ambos devem ser testáveis sem o provedor real.
6. D07 depende de contratos estáveis de domínio e geração.
7. D08 deve definir decisões comerciais antes de D09.
8. D10 e D11 só devem ocorrer depois dos fluxos principais e dos riscos estarem evidenciados.

## 5. Critérios para avançar

Uma Sprint só poderá começar quando a anterior estiver encerrada ou formalmente retirada, seus riscos forem conhecidos, os arquivos autorizados estiverem definidos e os critérios de aceite puderem ser verificados. Integrações reais exigem aprovação própria, configuração de ambiente e plano de rollback.

## 6. Critérios de lançamento inicial

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
