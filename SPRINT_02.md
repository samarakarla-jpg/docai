# Sprint 02 — Criação de contratos na camada de aplicação

**Produto:** DocAI
**Sprint:** `02 — Fluxo de criação de contratos`
**Fase:** Aplicação e orquestração do domínio
**Status:** `encerrada`

Esta Sprint é específica do DocAI e não altera a Sprint 02 do repositório original do SaaS Starter Kit.

# Objetivo

Implementar a camada de aplicação que orquestra a criação de contratos do DocAI: validar entrada, consultar o template, solicitar geração pela interface de IA e criar o rascunho usando o `ContractService`, sem acoplamento a provedores, rede, autenticação ou infraestrutura.

# Escopo

- Caso de uso ou serviço de aplicação para criação de contratos.
- Entrada com tipo de contrato, dados e referência ao template.
- Validação de campos obrigatórios, tipo, template e consistência dos dados.
- Uso do `TemplateService`, `AIService` e `ContractService` existentes.
- Sequência `validação → template → geração → criação`.
- Erros previsíveis de entrada, template, geração e criação.
- Testes unitários do fluxo, ordem das chamadas e falhas relevantes.

# Implementação realizada

A Sprint foi implementada no commit `250c8dd01d629d3e534638c2a715f771ab88eac5`, com a criação do serviço de aplicação e de sua suíte de testes. O fluxo valida a entrada antes de consultar dependências, verifica a compatibilidade do template, chama o `AIService` injetado e cria o rascunho pelo `ContractService`. O resultado da geração é retornado separadamente do rascunho estruturado, preservando os contratos da Sprint 01.

## Arquivos implementados

- `lib/docai/application/contract-creation-service.ts`
- `lib/docai/application/contract-creation-service.test.ts`

Somente esses dois arquivos foram alterados no commit de implementação.

# Fora do Escopo

- Alterar ou substituir os serviços ou modelos da Sprint 01.
- Gemini, OpenAI ou qualquer integração real de IA.
- Supabase, Stripe, autenticação, autorização ou HTTP.
- Páginas, rotas, componentes React ou estados de interface.
- Persistência, repositórios ou adaptadores de infraestrutura novos.
- Leitura, atualização, listagem, exclusão ou revisão de contratos.
- PDF, e-mail, armazenamento externo, pagamentos ou regras jurídicas adicionais.
- Alterações em documentação, dependências, scripts ou configurações.

# Requisitos

- **REQ-01 — Entrada tipada:** receber tipo, dados necessários e identificador do template.
- **REQ-02 — Validação inicial:** rejeitar entrada ausente, tipo inválido, identificador vazio e dados incompatíveis antes das dependências.
- **REQ-03 — Template:** consultar o `TemplateService`; template ausente ou incompatível interrompe o fluxo.
- **REQ-04 — Geração:** chamar o `AIService` injetado, sem referência a fornecedor.
- **REQ-05 — Criação:** encaminhar o resultado ao `ContractService` para criar o rascunho.
- **REQ-06 — Ordem:** não executar etapa posterior após falha anterior.
- **REQ-07 — Erros:** manter falhas de entrada, template, IA e criação distinguíveis e previsíveis.
- **REQ-08 — Injeção:** receber os três serviços como dependências substituíveis.
- **REQ-09 — Neutralidade:** não introduzir infraestrutura, UI ou comportamento fora da criação.

# Arquivos autorizados

| Arquivo | Ação | Finalidade |
| --- | --- | --- |
| `lib/docai/application/contract-creation-service.ts` | criar | Caso de uso e orquestração das interfaces existentes. |
| `lib/docai/application/contract-creation-service.test.ts` | criar | Testes do fluxo, ordem, validações e erros. |

Se qualquer outro arquivo for necessário, a implementação deverá parar para revisão do escopo.

# Arquivos proibidos

- Todo arquivo não listado acima.
- `lib/docai/services/`, `lib/docai/domain/` e os serviços da Sprint 01.
- `app/`, componentes, rotas, middleware e arquivos de autenticação.
- `lib/integrations/`, `lib/persistence/` e adaptadores de infraestrutura.
- `package.json`, arquivos de lock, `tsconfig.json`, scripts e variáveis de ambiente.
- `PRODUCT_SPEC.md`, `ROADMAP.md`, `PROJECT_STATE.md` e demais documentos.
- Código de Gemini, OpenAI, Supabase, Stripe, HTTP, PDF, e-mail ou armazenamento externo.

# Critérios de Aceitação

- **CA-01 — Criação válida:** atendido — criação validada para os quatro tipos de contrato.
- **CA-02 — Validação:** atendido — entradas inválidas são rejeitadas antes das dependências.
- **CA-03 — Template:** atendido — template ausente ou incompatível impede as etapas seguintes com erro estável.
- **CA-04 — IA por interface:** atendido — somente `AIService` injetado é utilizado, sem provedor ou rede.
- **CA-05 — Falha de geração:** atendido — falha de IA não chama `ContractService`.
- **CA-06 — Falha de criação:** atendido — falha de criação é convertida em erro previsível.
- **CA-07 — Ordem e injeção:** atendido — testes comprovam ordem e dublês substituíveis.
- **CA-08 — Isolamento:** atendido — nenhuma UI, autenticação, persistência nova, dependência ou configuração foi adicionada.
- **CA-09 — Regressão:** atendido — serviços de domínio e testes existentes permanecem compatíveis.

# Testes esperados

Os testes devem cobrir criação válida para os quatro tipos, entrada inválida, template inexistente ou incompatível, argumentos enviados aos serviços, ordem das etapas, ausência de chamadas posteriores após falha e dependências substituídas por dublês sem rede, banco ou provedor.

Comandos previstos:

```text
node --test lib/docai/application/contract-creation-service.test.ts lib/docai/domain/contract-models.test.ts lib/docai/services/contract-service.test.ts lib/docai/services/template-service.test.ts lib/docai/services/ai-service.test.ts lib/documents/document-service.test.ts lib/templates/template-service.test.ts
./node_modules/.bin/tsc --noEmit --incremental false
npm run build
git diff --check
```

Não instalar ferramentas ou dependências. A ausência de lint configurado deve ser registrada, sem criar configuração nova.

# Regras de implementação

- Alterar somente os dois arquivos autorizados.
- Reutilizar os contratos e serviços existentes, sem duplicar responsabilidades.
- Manter a aplicação como orquestradora, sem conhecer infraestrutura.
- Injetar `ContractService`, `TemplateService` e `AIService`; não instanciá-los dentro do caso de uso.
- Validar a entrada antes de qualquer chamada dependente.
- Não executar HTTP, banco, autenticação ou integração externa.
- Não adicionar dependências, configurações, variáveis de ambiente ou scripts.
- Não modificar serviços existentes para acomodar o fluxo; se forem insuficientes, interromper e solicitar revisão.
- Não implementar leitura, atualização, exclusão, listagem ou revisão de contratos.
- Manter erros claros, estáveis e testáveis.

# Dependências

## Pré-requisitos

- Sprint 01 do DocAI concluída e aprovada.
- Modelos, `ContractService`, `TemplateService` e `AIService` existentes.
- Interfaces genéricas do Starter Kit preservadas.

## Novas dependências

Nenhuma. A Sprint não autoriza instalação ou atualização de pacotes.

# Critérios de Conclusão

- O fluxo existe somente em `lib/docai/application/contract-creation-service.ts`.
- Os testes existem somente em `lib/docai/application/contract-creation-service.test.ts`.
- Todos os critérios de aceitação foram verificados.
- Testes, typecheck, build e `git diff --check` foram executados com sucesso.
- Nenhum arquivo fora da lista autorizada foi alterado.
- Não existe integração real, dependência nova, configuração nova ou funcionalidade fora do escopo.
- A Sprint permanece tecnicamente concluída e aguardando aprovação explícita antes de publicação.

# Commit esperado

**Mensagem proposta:** `feat: add DocAI contract creation application flow`

**Arquivos previstos:**

- `lib/docai/application/contract-creation-service.ts`
- `lib/docai/application/contract-creation-service.test.ts`

O commit deverá conter somente os dois arquivos autorizados e não deverá ser enviado ao remoto sem autorização específica.

# Validação realizada

- **Testes:** `find lib -name '*.test.ts' -print0 | xargs -0 node --test` — 55 testes aprovados.
- **Typecheck:** `./node_modules/.bin/tsc --noEmit --incremental false` — aprovado.
- **Build:** `npm run build` — aprovado.
- **Diff:** `git diff --check` — aprovado.
- **Lint:** não há script de lint configurado; nenhuma ferramenta foi instalada.

# Observações relevantes

- Não houve integração real com Gemini, OpenAI, Supabase, Stripe ou qualquer serviço externo.
- Não foram implementadas páginas, componentes React, autenticação, chamadas HTTP ou persistência nova.
- O rascunho mantém o conteúdo estruturado do domínio; a saída livre da IA é retornada no resultado da aplicação e não altera o contrato de `ContractDraft`.
- A implementação permanece um commit à frente de `origin/main` até que este registro documental seja enviado.
