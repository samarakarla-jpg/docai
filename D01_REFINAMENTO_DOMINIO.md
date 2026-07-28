# D01 — Refinamento do Domínio Funcional do DocAI

**Produto:** DocAI  
**Sprint:** D01 — Refinamento do domínio  
**Status:** planejamento histórico substituído; sem autoridade vigente
**Fase:** preparação funcional antes de integrações

Este documento preserva uma proposta histórica. Estratégia de produto, arquitetura e prioridades vigentes devem ser consultadas nas fontes oficiais indicadas em `AGENTS.md`. A D01 não autoriza implementação.

## Objetivo da Sprint

Documentar com precisão os conceitos, campos, regras e limites já representados no código para os quatro tipos de contrato suportados, criando uma referência única para as próximas Sprints sem alterar a estrutura existente.

## Escopo

- Definir o vocabulário funcional dos contratos.
- Registrar campos atuais e validações existentes dos quatro modelos.
- Registrar a estrutura atual dos templates e da saída de IA.
- Delimitar requisitos avançados que ficam adiados.
- Definir responsabilidades do usuário e da IA.
- Registrar limites jurídicos, de privacidade e de confiabilidade.
- Preparar critérios para evolução do domínio sem acoplamento a fornecedores.

Não há implementação de código, alteração de modelos, integração externa, interface visual ou persistência nesta Sprint documental.

## Estado atual e limites da D01

O repositório já contém uma implementação inicial em `lib/docai/`. Esta revisão documenta o estado real, sem exigir alterações fora do escopo autorizado:

- cada modelo possui os campos básicos atualmente definidos em `contract-models.ts`;
- a validação atual exige pelo menos uma parte nomeada e campos básicos não vazios;
- o template atual contém tipo, título e instruções;
- o resultado atual da IA contém tipo e saída opaca;
- `ContractService` delega o ciclo de vida ao `DocumentService` genérico;
- não há proprietário, versionamento, avisos de IA ou estado avançado de revisão no domínio atual.

Responsabilidades adicionais, encerramento contratual, unidades monetárias, garantias, versionamento de templates, alertas de IA e revisão humana formal ficam adiados para Sprints próprias. Nenhuma dessas evoluções é requisito de implementação da D01.

## Requisitos funcionais

- O sistema deve suportar Prestação de Serviços, Compra e Venda, Aluguel e Empréstimo.
- Cada contrato deve possuir tipo, título, partes e conteúdo estruturado conforme os tipos existentes.
- Um rascunho deve permanecer distinguível de um documento final ou juridicamente validado.
- O usuário deve poder revisar e corrigir os dados antes da geração.
- A geração deve receber somente dados estruturados e um template compatível.
- O resultado da IA deve ser retornado como rascunho revisável.
- O resultado atual da IA deve preservar o tipo e a saída retornada pelo adaptador.
- Nenhum contrato deve ser considerado aprovado, assinado ou juridicamente válido automaticamente.

## Requisitos não funcionais

- O domínio não deve depender de Next.js, React, Supabase, Gemini, Stripe ou Vercel.
- Tipos e regras devem ser testáveis em Node.js sem rede ou credenciais.
- Entradas inválidas devem produzir erros estáveis e compreensíveis.
- Dados contratuais devem ser tratados como sensíveis.
- O domínio deve permitir substituição de persistência e de provedor de IA.
- Transformações relevantes devem ser explícitas e determinísticas.
- A evolução por versão sem quebra de rascunhos é uma diretriz futura, não implementada nem exigida nesta D01.
- Nenhum segredo, prompt privado ou credencial deve fazer parte dos modelos.

## Tipos de contrato suportados

### Prestação de Serviços

Campos atualmente representados:

- partes;
- escopo;
- remuneração;
- prazo;

Unidade monetária, responsabilidades detalhadas e condições de encerramento ficam adiadas.

### Compra e Venda

Campos atualmente representados:

- partes;
- objeto;
- preço;
- entrega.

Unidade monetária e regras detalhadas de entrega ficam adiadas.

### Aluguel

Campos atualmente representados:

- partes;
- propriedade;
- aluguel;
- prazo.

Garantias, encargos e demais condições de locação ficam adiados.

### Empréstimo

Campos atualmente representados:

- partes;
- objeto;
- devolução;
- prazo.

Juros, garantias e condições detalhadas de devolução ficam adiados.

## Regras de validação

- O tipo deve ser um dos quatro tipos suportados.
- Identificador, título e referência de template devem ser strings não vazias.
- Deve haver pelo menos uma parte nomeada, conforme a validação atual do domínio.
- O nome de cada parte deve ser não vazio; identificadores adicionais são opcionais.
- Os campos atualmente representados devem existir e conter texto não vazio após normalização de espaços.
- Valores e prazos atuais devem ser strings não vazias; unidades monetárias e semântica avançada ficam adiadas.
- Campos específicos não podem ser misturados entre tipos de contrato.
- O tipo do conteúdo deve corresponder ao tipo do contrato e do template.
- Templates ausentes, incompatíveis ou incompletos devem impedir a geração.
- Conteúdo adicional deve ser preservado como observação, sem substituir campos obrigatórios.
- Dados recebidos da interface ou de serviços externos devem ser validados novamente na fronteira apropriada.
- A validação não deve afirmar validade jurídica nem substituir análise profissional.

## Estrutura dos templates

O template de contrato atualmente contém:

- identificador estável;
- tipo de contrato;
- título legível;
- instruções internas de composição.

Templates devem ser neutros em relação ao provedor de IA. Não devem conter credenciais, chamadas de API, regras de cobrança ou dados de usuário. Um template só pode ser usado quando seu tipo corresponder ao contrato solicitado.

## Regras para geração pela IA

- A IA recebe somente o conteúdo validado, o tipo e o template compatível.
- A IA deve retornar o tipo solicitado e a saída fornecida pelo adaptador.
- Campos ausentes ou ambíguos não são enriquecidos pelo serviço atual.
- A IA não deve declarar validade jurídica, aconselhar sobre direitos ou substituir advogado.
- A IA não deve acessar dados de outras contas, persistência direta ou credenciais.
- Falhas, indisponibilidade, limite e resposta inválida devem ser traduzidos para erros seguros.
- O provedor deve permanecer atrás do contrato de IA e ser substituível.
- Avisos, revisão humana formal e metadados de geração ficam adiados para Sprint própria.

## Responsabilidades do usuário

- Fornecer informações verdadeiras, completas e autorizadas.
- Conferir partes, valores, prazos, responsabilidades e condições.
- Corrigir ambiguidades e campos incompletos.
- Revisar integralmente o rascunho gerado.
- Buscar orientação jurídica quando necessário.
- Não tratar o resultado como contrato assinado ou garantia de validade.
- Não inserir dados de terceiros sem base legal ou autorização adequada.

## Responsabilidades da IA

- Organizar o conteúdo fornecido no formato do template.
- Sinalizar ausência, inconsistência ou ambiguidade detectável.
- Preservar os dados informados sem criar fatos ou obrigações não solicitadas.
- Identificar o resultado como rascunho gerado por IA.
- Produzir saída previsível, limitada ao tipo de contrato e ao contexto recebido.
- Nunca substituir revisão humana, aconselhamento jurídico ou decisão do usuário.

## Arquivos que poderão ser alterados em uma futura implementação

Esta D01 é exclusivamente documental e não autoriza alterações de código. Somente uma Sprint de implementação aprovada posteriormente poderá autorizar, de forma explícita:

- `lib/docai/domain/contract-models.ts` — tipos e regras estruturais dos contratos;
- `lib/docai/domain/contract-models.test.ts` — testes dos modelos e validações;
- `lib/docai/services/contract-service.ts` — somente se uma regra de domínio exigir ajuste;
- `lib/docai/services/contract-service.test.ts` — testes correspondentes a ajustes autorizados;
- `PRODUCT_SPEC.md` — apenas para registrar decisões funcionais aprovadas;
- `PROJECT_STATE.md` — apenas para registrar o estado resultante.

Qualquer outro arquivo exige revisão formal de escopo.

## Arquivos proibidos

- `app/`, `components/` e qualquer interface visual;
- `lib/auth/` e middleware;
- `lib/persistence/`, `lib/documents/` e `lib/templates/`;
- `lib/integrations/` e adaptadores de fornecedores;
- `package.json`, lockfiles, scripts e configurações;
- variáveis de ambiente, segredos e arquivos de deploy;
- chamadas HTTP, Gemini, OpenAI, Supabase, Stripe, PDF, e-mail ou storage externo;
- prompts de produção ou regras jurídicas não aprovadas;
- qualquer arquivo não listado como autorizado.

## Estratégia de testes

- A implementação existente deve permanecer coberta pelos testes atuais dos quatro tipos e de seus campos básicos.
- Uma futura Sprint de implementação deverá testar ausência de partes, nomes vazios, campos básicos ausentes ou vazios e incompatibilidade entre contrato, conteúdo e template.
- Regras ainda não representadas no código — como partes insuficientes, unidade monetária, responsabilidades, versionamento e avisos — ficam adiadas e não são critério de teste desta D01.
- A documentação não exige novos testes nem alterações nos arquivos de produção nesta Sprint.
- Quando houver uma Sprint de implementação, deverão ser executados os testes aplicáveis, typecheck, build e `git diff --check`.

## Riscos conhecidos

- Campos insuficientes para jurisdições diferentes.
- Interpretação jurídica indevida de texto gerado.
- Invenção ou omissão de informações pela IA.
- Exposição de dados contratuais sensíveis.
- Mudanças de modelo incompatíveis com rascunhos existentes.
- Ambiguidade sobre encargos, garantias e responsabilidades.
- Acoplamento prematuro a Gemini, Supabase ou Stripe.
- Crescimento do domínio sem critérios de versionamento.

## Critérios de aceitação

- Os quatro tipos de contrato e os campos atualmente representados estão definidos.
- As regras atuais de partes, tipos, campos básicos e compatibilidade estão explícitas.
- A estrutura atual de templates (tipo, título e instruções) e sua compatibilidade por tipo estão documentadas.
- Regras de entrada e saída da IA estão documentadas sem depender de provedor.
- Responsabilidades do usuário e da IA estão separadas.
- Limitações jurídicas e necessidade de revisão humana estão registradas.
- Arquivos autorizados e proibidos estão definidos sem ambiguidade.
- A estratégia distingue cobertura existente de requisitos de teste adiados.
- Nenhuma integração ou alteração de produção é necessária para encerrar esta Sprint documental.

## Critérios de encerramento

- Este documento foi revisado e aprovado explicitamente.
- Todos os critérios de aceitação possuem evidência documental.
- Dependências, riscos e limites para as Sprints seguintes estão registrados.
- A documentação do produto permanece consistente com esta decisão.
- Nenhum código, dependência, configuração, commit ou push é criado nesta Sprint documental.

## Dependências para a próxima Sprint

A próxima Sprint deverá definir identidade e contexto do usuário, incluindo associação de rascunhos ao usuário autenticado e autorização no servidor. Ela dependerá da aprovação deste documento, mas não poderá alterar o domínio definido sem nova revisão.

## Registro de revisão

A Sprint D01 foi revisada integralmente quanto à consistência técnica, funcional e documental, conflitos com o código existente, ambiguidades, requisitos, critérios, riscos e dependências. Após o registro das diferenças de compatibilidade acima, o documento está pronto para aprovação explícita e não autoriza implementação enquanto essa aprovação não ocorrer.
