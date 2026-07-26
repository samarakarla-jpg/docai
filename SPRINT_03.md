# Sprint 03 — Entrada da solicitação de criação de contratos

**Produto:** DocAI

**Sprint:** `03 — Camada de entrada da criação`

**Fase do Roadmap:** Aplicação e preparação do fluxo de geração

**Status:** `encerrada`

Esta Sprint complementa a Sprint 02 do DocAI. Ela cria somente uma fronteira de entrada agnóstica de framework para transformar dados recebidos em comando de aplicação e chamar o `ContractCreationService` existente.

# Objetivo

Preparar a camada de entrada da aplicação para solicitar a criação de contratos, com validação independente de framework, transformação explícita para o comando aceito pelo `ContractCreationService` e retorno estruturado de sucesso ou erro. A Sprint não cria interface visual, rota web, integração externa ou mecanismo de transporte HTTP.

# Escopo

- Criar um caso de uso de entrada para solicitar a criação de um contrato.
- Definir o formato neutro da entrada recebida pela camada de entrada.
- Validar a entrada antes de chamar qualquer serviço de aplicação.
- Transformar a entrada validada em `CreateContractInput` da Sprint 02.
- Chamar o `ContractCreationService` por dependência injetada.
- Retornar uma estrutura discriminada de sucesso ou erro, sem expor detalhes internos indevidos.
- Manter a separação entre entrada, aplicação e domínio, sem depender de Next.js ou outro framework web.
- Criar testes unitários da validação, transformação, delegação e tratamento de erros.

# Entregas

- `RequestContractCreation` ou contrato equivalente para coordenar a solicitação de criação.
- Validação de tipo de contrato, identificador, título, template e conteúdo dos quatro modelos já definidos.
- Conversão da entrada externa neutra para o comando utilizado pelo `ContractCreationService`.
- Resultado de sucesso contendo o resultado estruturado da criação.
- Resultado de erro contendo código estável e mensagem segura.
- Testes unitários executáveis sem navegador, servidor web, rede, banco ou fornecedor externo.

# Fora do Escopo

- Páginas React, componentes de UI, layouts ou formulários.
- Rotas HTTP reais, API Routes, Server Actions, controllers web ou middleware.
- Dependência de Next.js, React ou qualquer framework de transporte.
- Autenticação, autorização, sessão ou associação com usuário.
- Supabase, Stripe, Gemini real, OpenAI ou qualquer integração externa.
- Persistência real, repositórios, armazenamento externo ou chamadas de rede.
- PDF, e-mail, pagamentos, revisão visual ou edição de contrato.
- Alteração do `ContractCreationService`, `ContractService`, `TemplateService`, `AIService` ou modelos da Sprint 01/02.
- Implementação de geração de IA, prompts, limites de provedor ou regras jurídicas novas.
- Funcionalidades das Sprints posteriores.

# Requisitos

- **REQ-01 — Entrada neutra:** receber um valor de entrada independente de framework web e de transporte.
- **REQ-02 — Validação de fronteira:** rejeitar entrada ausente, tipos inválidos, campos vazios, conteúdo incompatível e dados obrigatórios ausentes antes da aplicação.
- **REQ-03 — Comando:** transformar somente entradas válidas no `CreateContractInput` utilizado pelo `ContractCreationService`.
- **REQ-04 — Delegação:** chamar o `ContractCreationService` já existente por uma interface injetada.
- **REQ-05 — Sucesso:** retornar resultado discriminado contendo o rascunho, o resultado de geração e o template conforme o contrato da Sprint 02.
- **REQ-06 — Erro:** retornar código e mensagem estáveis para falhas de entrada e falhas do serviço, sem expor detalhes de infraestrutura.
- **REQ-07 — Isolamento:** não importar Next.js, React, APIs de transporte, adaptadores, banco ou provedores.
- **REQ-08 — Testabilidade:** permitir dublês do `ContractCreationService` e executar todos os testes em Node.js.
- **REQ-09 — Camadas:** manter a transformação na entrada, a coordenação no serviço de aplicação e as regras de contrato no domínio.

# Arquivos autorizados

| Arquivo | Ação autorizada | Finalidade |
| --- | --- | --- |
| `lib/docai/application/request-contract-creation.ts` | criar | Caso de uso de entrada, validação, transformação, delegação e resultado estruturado. |
| `lib/docai/application/request-contract-creation.test.ts` | criar | Testes unitários da nova camada e da fronteira com o serviço existente. |

Somente esses dois arquivos poderão ser criados ou alterados. Se a solução exigir qualquer outro caminho, a implementação deverá parar para revisão formal.

# Arquivos proibidos

- Todo arquivo não listado em “Arquivos autorizados”.
- `lib/docai/domain/` e os serviços existentes em `lib/docai/services/`.
- `lib/docai/application/contract-creation-service.ts` e seu teste da Sprint 02.
- `app/`, páginas, componentes, layouts, rotas, API Routes, Server Actions e middleware.
- `lib/auth/`, `lib/integrations/`, `lib/persistence/` e qualquer adaptador de infraestrutura.
- `package.json`, arquivos de lock, `tsconfig.json`, scripts, configurações e variáveis de ambiente.
- `PRODUCT_SPEC.md`, `ROADMAP.md`, `PROJECT_STATE.md`, SPRINTs anteriores e demais documentos.
- Código ou configuração de Gemini, OpenAI, Supabase, Stripe, PDF, e-mail ou armazenamento externo.

# Dependências

## Pré-requisitos

- Sprint 01 do DocAI encerrada e aprovada.
- Sprint 02 do DocAI implementada, validada e aprovada.
- `ContractCreationService` e os contratos de domínio disponíveis sem alteração.

## Dependências técnicas existentes

- TypeScript e runtime Node.js já configurados no projeto.
- Tipos `CreateContractInput`, `ContractCreationResult` e `ContractCreationError` da Sprint 02.

## Novas dependências

Nenhuma. Não instalar bibliotecas, alterar manifestos, criar configurações ou adicionar mecanismos de transporte.

# Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| A entrada da fronteira divergir do comando da Sprint 02 | Erros de integração entre camadas | Usar transformação explícita e testes de contrato com dublê do serviço. |
| Validação duplicar regras de domínio | Inconsistência e manutenção desnecessária | Validar formato na entrada e manter regras contratuais no domínio/serviço existente. |
| Erros internos vazarem detalhes | Exposição de infraestrutura ou comportamento instável | Mapear erros para códigos e mensagens seguros e testados. |
| Camada de entrada adquirir dependência de framework | Acoplamento e dificuldade de reutilização | Proibir imports web e validar a execução exclusivamente em Node.js. |
| Escopo avançar para HTTP ou UI | Antecipação de Sprints futuras | Restringir arquivos e critérios a dois módulos agnósticos. |

# Plano de Implementação

1. Confirmar o estado limpo do repositório e reler os contratos da Sprint 02.
2. Definir o formato neutro da entrada e o resultado discriminado.
3. Implementar a validação da fronteira sem duplicar a coordenação do domínio.
4. Transformar a entrada em `CreateContractInput` e delegar ao serviço injetado.
5. Mapear sucesso e falhas para a estrutura pública do caso de uso.
6. Criar testes com dublês, cobrindo os quatro tipos e as falhas relevantes.
7. Revisar o diff e confirmar que somente os arquivos autorizados foram afetados.

# Plano de Testes

- Entrada válida para Prestação de Serviços, Compra e Venda, Aluguel e Empréstimo.
- Rejeição de entrada nula, não-objeto, tipo inválido, id vazio, título vazio e template vazio.
- Rejeição de conteúdo cujo tipo não corresponde à entrada.
- Rejeição de partes ausentes, partes sem nome e campos obrigatórios vazios.
- Confirmação de que a entrada válida é transformada no comando esperado.
- Confirmação de que o `ContractCreationService` é chamado uma única vez e com os dados corretos.
- Confirmação de resultado de sucesso discriminado.
- Conversão de `ContractCreationError` e falhas inesperadas em erro estruturado e seguro.
- Confirmação de que nenhuma dependência web, rede, banco ou provedor é necessária.

Comandos previstos para a implementação:

```text
node --test lib/docai/application/request-contract-creation.test.ts lib/docai/application/contract-creation-service.test.ts lib/docai/domain/contract-models.test.ts lib/docai/services/contract-service.test.ts lib/docai/services/template-service.test.ts lib/docai/services/ai-service.test.ts
./node_modules/.bin/tsc --noEmit --incremental false
npm run build
git diff --check
```

Não instalar ferramentas para satisfazer o plano. A ausência de lint configurado deverá ser registrada, sem criar configuração.

# Critérios de Aceitação

- **CA-01 — Fronteira neutra:** a nova camada executa sem Next.js, React, HTTP ou outro framework web.
- **CA-02 — Validação:** entradas inválidas são rejeitadas antes da chamada ao `ContractCreationService`.
- **CA-03 — Transformação:** entradas válidas produzem exatamente o comando esperado pela Sprint 02.
- **CA-04 — Delegação:** o serviço existente é chamado por interface injetada, sem instanciação concreta interna.
- **CA-05 — Quatro modelos:** os quatro tipos de contrato são aceitos quando seus dados são válidos.
- **CA-06 — Sucesso estruturado:** o resultado contém discriminador de sucesso e os dados definidos no contrato.
- **CA-07 — Erro estruturado:** falhas possuem discriminador, código e mensagem segura, sem detalhes de provedor ou infraestrutura.
- **CA-08 — Separação de camadas:** a entrada não contém regras de infraestrutura e não altera domínio ou serviços anteriores.
- **CA-09 — Testes:** todos os cenários do plano de testes são cobertos por testes unitários.
- **CA-10 — Escopo:** somente os dois arquivos autorizados foram alterados e nenhuma dependência/configuração foi modificada.

Na entrega, cada critério deverá ser marcado como **atendido**, **não atendido**, **pendente** ou **não verificável**, com evidência.

# Critérios de Conclusão

- Os dois arquivos autorizados estão implementados e revisados.
- A entrada é validada e transformada em comando sem dependência de framework.
- O `ContractCreationService` é chamado corretamente e resultados de sucesso/erro são estruturados.
- Os testes unitários passam, juntamente com typecheck, build e `git diff --check`.
- Nenhum arquivo proibido, dependência, configuração ou integração externa foi alterado.
- O diff e os critérios de aceitação foram revisados individualmente.
- A Sprint está encerrada após implementação, validação e aprovação documental.

# Commit Esperado

**Mensagem proposta:** `feat: add DocAI contract creation entry layer`

**Arquivos previstos:**

- `lib/docai/application/request-contract-creation.ts`
- `lib/docai/application/request-contract-creation.test.ts`

O commit deve conter somente os dois arquivos autorizados. A definição da mensagem não autoriza commit, push ou publicação.

# Encerramento e validação

A implementação foi concluída nos commits `a9d36f153b3f1b091a8f662479de4874142b7197` e `c27ebe60a934c868bb245b239c9bf887c5882eb6`. O segundo completou a cobertura do CA-09 sem alterar o código de produção.

- Arquivos: `lib/docai/application/request-contract-creation.ts` e `lib/docai/application/request-contract-creation.test.ts`.
- Testes completos: 63 aprovados, sem falhas.
- Typecheck, build e `git diff --check`: aprovados.
- Critérios CA-01 a CA-10: atendidos.

A Sprint 03 está encerrada.
