# D01 — Refinamento do Domínio Funcional do DocAI

**Produto:** DocAI  
**Sprint:** D01 — Refinamento do domínio  
**Status:** revisada e aprovada  
**Fase:** preparação funcional antes de integrações

Este documento define o domínio funcional do DocAI antes de qualquer integração com Supabase, Gemini, Stripe, Vercel ou outro fornecedor. A aprovação desta especificação não autoriza implementação automática.

## Objetivo da Sprint

Consolidar os conceitos, campos, regras, limites e responsabilidades do DocAI para os quatro tipos de contrato suportados, criando uma referência única para as Sprints de identidade, persistência, geração e interface.

## Escopo

- Definir o vocabulário funcional dos contratos.
- Definir campos obrigatórios e opcionais dos quatro modelos.
- Definir validações de entrada e consistência.
- Definir a estrutura mínima dos templates.
- Definir o que pode e não pode ser solicitado à IA.
- Definir responsabilidades do usuário e da IA.
- Registrar limites jurídicos, de privacidade e de confiabilidade.
- Preparar critérios para evolução do domínio sem acoplamento a fornecedores.

Não há implementação de código, integração externa, interface visual ou persistência nesta Sprint.

## Compatibilidade com o estado atual

O repositório já contém uma implementação inicial em `lib/docai/`. Esta especificação é o contrato funcional refinado e identifica ajustes que poderão ser necessários em uma Sprint de implementação aprovada:

- o código atual permite pelo menos uma parte; este documento exige pelo menos duas partes nomeadas;
- os tipos atuais possuem somente os campos básicos de cada modelo; responsabilidades, encerramento, garantias e demais campos definidos aqui são requisitos de evolução;
- o template atual contém tipo, título e instruções; versão, seções, avisos e referência de atualização são requisitos adicionais;
- o resultado atual da IA possui tipo e saída; alertas, avisos e identificação explícita de rascunho são requisitos de evolução;
- nenhuma dessas diferenças autoriza alteração nesta Sprint documental.

Os ajustes deverão ser implementados somente em Sprint aprovada, com migração ou compatibilidade para rascunhos existentes quando necessário.

## Requisitos funcionais

- O sistema deve suportar Prestação de Serviços, Compra e Venda, Aluguel e Empréstimo.
- Cada contrato deve possuir tipo, título, partes, conteúdo estruturado e estado de rascunho.
- Um rascunho deve permanecer distinguível de um documento final ou juridicamente validado.
- O usuário deve poder revisar e corrigir os dados antes da geração.
- A geração deve receber somente dados estruturados e um template compatível.
- O resultado da IA deve ser retornado como rascunho revisável.
- O sistema deve preservar avisos, limitações e eventuais alertas da geração.
- Nenhum contrato deve ser considerado aprovado, assinado ou juridicamente válido automaticamente.

## Requisitos não funcionais

- O domínio não deve depender de Next.js, React, Supabase, Gemini, Stripe ou Vercel.
- Tipos e regras devem ser testáveis em Node.js sem rede ou credenciais.
- Entradas inválidas devem produzir erros estáveis e compreensíveis.
- Dados contratuais devem ser tratados como sensíveis.
- O domínio deve permitir substituição de persistência e de provedor de IA.
- Transformações relevantes devem ser explícitas e determinísticas.
- O modelo deve permitir evolução por versão sem quebrar rascunhos existentes.
- Nenhum segredo, prompt privado ou credencial deve fazer parte dos modelos.

## Tipos de contrato suportados

### Prestação de Serviços

Campos obrigatórios:

- partes;
- escopo detalhado do serviço;
- remuneração e unidade monetária;
- prazo ou duração;
- responsabilidades principais de cada parte;
- condições de encerramento ou rescisão.

Campos opcionais:

- etapas e entregáveis;
- forma e calendário de pagamento;
- confidencialidade;
- propriedade intelectual;
- foro ou jurisdição;
- observações adicionais.

### Compra e Venda

Campos obrigatórios:

- partes;
- descrição do objeto;
- preço e unidade monetária;
- condições de pagamento;
- forma e prazo de entrega;
- responsabilidades principais;
- condições de encerramento ou cancelamento.

Campos opcionais:

- quantidade e especificações;
- garantias;
- transferência de risco e propriedade;
- penalidades;
- foro ou jurisdição;
- observações adicionais.

### Aluguel

Campos obrigatórios:

- partes;
- descrição do bem ou imóvel;
- prazo de locação;
- valor do aluguel e unidade monetária;
- responsabilidades de manutenção e uso;
- condições de devolução e encerramento.

Campos opcionais:

- garantias;
- reajuste;
- encargos e despesas;
- finalidade de uso;
- vistoria;
- foro ou jurisdição;
- observações adicionais.

### Empréstimo

Campos obrigatórios:

- partes;
- objeto ou valor emprestado;
- prazo;
- forma e prazo de devolução;
- encargos, quando aplicáveis, ou declaração de ausência;
- responsabilidades principais;
- condições de encerramento.

Campos opcionais:

- calendário de parcelas;
- garantias;
- mora e consequências do atraso;
- finalidade do empréstimo;
- foro ou jurisdição;
- observações adicionais.

## Regras de validação

- O tipo deve ser um dos quatro tipos suportados.
- Identificador, título e referência de template devem ser strings não vazias.
- Deve haver pelo menos duas partes nomeadas, representando os participantes do contrato.
- O nome de cada parte deve ser não vazio; identificadores adicionais são opcionais.
- Campos obrigatórios devem existir e conter texto não vazio após normalização de espaços.
- Valores monetários devem informar valor e unidade monetária quando aplicável.
- Prazos devem possuir descrição compreensível e não podem ser vazios.
- Campos específicos não podem ser misturados entre tipos de contrato.
- O tipo do conteúdo deve corresponder ao tipo do contrato e do template.
- Templates ausentes, incompatíveis ou incompletos devem impedir a geração.
- Conteúdo adicional deve ser preservado como observação, sem substituir campos obrigatórios.
- Dados recebidos da interface ou de serviços externos devem ser validados novamente na fronteira apropriada.
- A validação não deve afirmar validade jurídica nem substituir análise profissional.

## Estrutura dos templates

Um template de contrato deve conter, no mínimo:

- identificador estável;
- tipo de contrato;
- título legível;
- versão do template;
- instruções internas de composição;
- ordem ou seções esperadas do rascunho;
- avisos e limitações aplicáveis;
- data ou referência de atualização.

Templates devem ser neutros em relação ao provedor de IA. Não devem conter credenciais, chamadas de API, regras de cobrança ou dados de usuário. Um template só pode ser usado quando seu tipo corresponder ao contrato solicitado.

## Regras para geração pela IA

- A IA recebe somente o conteúdo validado, o tipo e o template compatível.
- A IA deve produzir um rascunho estruturado e identificável como gerado.
- A resposta deve manter o tipo do contrato e as informações fornecidas pelo usuário sem inventar fatos.
- Campos ausentes ou ambíguos devem gerar alerta ou solicitação de revisão, não preenchimento silencioso.
- A IA não deve declarar validade jurídica, aconselhar sobre direitos ou substituir advogado.
- A IA não deve acessar dados de outras contas, persistência direta ou credenciais.
- Falhas, indisponibilidade, limite e resposta inválida devem ser traduzidos para erros seguros.
- O provedor deve permanecer atrás do contrato de IA e ser substituível.
- O resultado deve incluir avisos de revisão humana antes de qualquer uso externo.

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

## Arquivos que poderão ser alterados na implementação

Somente se uma Sprint de implementação for aprovada posteriormente:

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

- Testar cada um dos quatro tipos com dados válidos.
- Testar ausência de partes, partes insuficientes e nomes vazios.
- Testar cada campo obrigatório ausente, vazio ou incompatível.
- Testar valores monetários sem unidade e prazos vazios.
- Testar incompatibilidade entre contrato, conteúdo e template.
- Testar preservação de campos opcionais e observações.
- Testar que entradas inválidas não alcançam serviços dependentes.
- Testar erros estáveis sem rede, banco ou provedor real.
- Executar regressão dos serviços DocAI existentes.
- Executar typecheck, build e `git diff --check` na Sprint de implementação.

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

- Os quatro tipos de contrato e seus campos obrigatórios estão definidos.
- Regras de partes, tipos, campos, prazos, valores e compatibilidade estão explícitas.
- Templates possuem estrutura mínima, versão e compatibilidade por tipo.
- Regras de entrada e saída da IA estão documentadas sem depender de provedor.
- Responsabilidades do usuário e da IA estão separadas.
- Limitações jurídicas e necessidade de revisão humana estão registradas.
- Arquivos autorizados e proibidos estão definidos sem ambiguidade.
- Estratégia de testes cobre todos os campos obrigatórios e incompatibilidades.
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

A Sprint D01 foi revisada integralmente quanto à consistência técnica, funcional e documental, conflitos com o código existente, ambiguidades, requisitos, critérios, riscos e dependências. Após o registro das diferenças de compatibilidade acima, a Sprint D01 está aprovada para servir de referência às próximas Sprints.
