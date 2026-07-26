# D04 — Serviço de Geração de Contratos

**Produto:** DocAI
**Sprint:** D04 — Serviço de geração
**Status:** especificação aguardando aprovação
**Fase:** aplicação e domínio, sem integrações externas

## Objetivo

Definir e implementar, em uma Sprint futura aprovada, um serviço de geração de contratos desacoplado. O serviço deverá validar a compatibilidade do pedido, delegar a geração à abstração `AIService` já existente e devolver um resultado previsível para revisão humana.

Esta Sprint não autoriza a escolha ou a integração de um provedor de IA. Gemini, OpenAI e qualquer outro fornecedor permanecem atrás dos contratos já existentes e fora da implementação.

## Escopo funcional

- Criar uma fronteira única para solicitar a geração de um contrato.
- Receber o tipo, o conteúdo validado e o template compatível.
- Validar a consistência entre tipo, conteúdo e template antes da delegação.
- Utilizar `AIService.generateContract` como única capacidade de IA.
- Retornar o tipo solicitado e a saída produzida pela abstração de IA.
- Traduzir entradas inválidas e falhas da capacidade de IA em erros estáveis.
- Manter o resultado como rascunho sujeito a revisão humana.
- Permitir injeção de uma implementação compatível com `AIService` nos testes.

Não fazem parte desta Sprint a integração com casos de uso existentes, persistência, autenticação, interface, transporte HTTP ou configuração de um provedor.

## Requisitos funcionais

- O serviço deve aceitar somente os quatro tipos de contrato já definidos no domínio: `services`, `sale`, `rental` e `loan`.
- O conteúdo recebido deve corresponder ao tipo solicitado; o serviço pode verificar os campos básicos na fronteira, mas não redefinir as regras do domínio documentadas em D01.
- O template recebido deve ser do mesmo tipo do contrato e possuir as instruções previstas pelo `TemplateService`.
- O serviço deve rejeitar tipo, conteúdo ou template incompatíveis antes de chamar `AIService`.
- O serviço deve chamar `AIService.generateContract` exatamente com a entrada de contrato definida pelo domínio.
- O resultado deve preservar o tipo solicitado e a saída retornada pela abstração de IA, sem enriquecer ou reescrever silenciosamente o conteúdo.
- Falhas da abstração devem ser convertidas em erro de domínio/aplicação sem expor detalhes do adaptador ou do fornecedor.
- Nenhum resultado deve ser marcado automaticamente como assinado, aprovado ou juridicamente válido.
- A operação deve ser determinística quanto à validação e não deve persistir efeitos colaterais.

## Requisitos não funcionais

- O serviço não pode importar Gemini, OpenAI, SDK de fornecedor, Next.js, React, Stripe ou Supabase.
- O serviço não pode depender de HTTP, variáveis de ambiente, banco de dados, filesystem ou sessão de usuário.
- A dependência de IA deve ser recebida por injeção e limitada ao método público necessário.
- O contrato público deve ser testável em Node.js sem rede, credenciais ou serviços externos.
- Mensagens e códigos de erro devem ser estáveis, seguros e suficientemente claros para a camada chamadora.
- Dados contratuais e saídas de IA não devem ser gravados em logs pelo serviço.
- A saída deve manter `unknown` quando esse for o contrato atual da abstração, sem impor um formato de provedor.
- Alterações no serviço não devem modificar os contratos genéricos do Starter Kit.

## Responsabilidades do serviço

O serviço é responsável por:

- receber e validar a solicitação de geração;
- verificar a correspondência entre contrato e template;
- coordenar uma única chamada à abstração `AIService`;
- mapear falhas para erros estáveis;
- devolver um resultado neutro e revisável;
- impedir afirmações de validade jurídica ou aprovação automática.

O serviço não é responsável por:

- autenticar ou autorizar usuários;
- carregar templates ou rascunhos de uma base de dados;
- persistir o resultado;
- renderizar telas, PDF ou e-mail;
- montar prompts específicos de fornecedor;
- controlar cobrança, limites comerciais ou telemetria;
- decidir regras jurídicas não presentes no domínio aprovado.

O contexto de identidade, o proprietário e a autorização devem ser validados pela camada chamadora conforme D02. Esta Sprint não adiciona esses dados à entrada do serviço nem os encaminha à IA; quando necessários ao fluxo completo, permanecem fora da fronteira de geração.

## Interfaces públicas

A implementação deverá expor contratos pequenos e compatíveis com os tipos existentes, sem alterar `AIService`:

```ts
interface ContractGenerationInput {
  readonly type: ContractType;
  readonly content: ContractContent;
  readonly template: ContractTemplateContent;
}

interface ContractGenerationResult {
  readonly type: ContractType;
  readonly output: unknown;
}

interface ContractGenerator {
  generate(input: ContractGenerationInput): Promise<ContractGenerationResult>;
}
```

O serviço deverá receber, por injeção, somente uma dependência compatível com `Pick<AIService, "generateContract">`. A propriedade `template` serve para validação de compatibilidade e não autoriza alterar o formato atual da requisição enviada ao `AIService`.

Os nomes finais podem seguir o padrão existente de `lib/docai/`, desde que preservem essas responsabilidades, entradas, saídas e erros. Qualquer mudança nos tipos públicos existentes exige nova revisão de escopo.

## Dependências

- `lib/docai/domain/contract-models.ts` para `ContractType`, `ContractContent`, `ContractTemplateContent` e o resultado atual de geração.
- `lib/docai/services/ai-service.ts` como abstração única da capacidade de IA.
- `lib/docai/services/template-service.ts` apenas como referência ao contrato de template; o carregamento continua responsabilidade da camada chamadora.
- Regras de validação do domínio refinadas em `D01_REFINAMENTO_DOMINIO.md`.
- A camada chamadora deverá fornecer conteúdo e template já carregados; essa coordenação não pertence ao serviço desta Sprint.

Nenhuma dependência nova ou alteração de configuração é permitida.

## Arquivos autorizados

Na implementação aprovada desta Sprint, somente os arquivos abaixo poderão ser criados ou alterados:

- `lib/docai/services/contract-generation-service.ts` — serviço e contratos públicos específicos da geração;
- `lib/docai/services/contract-generation-service.test.ts` — testes unitários do serviço;

Qualquer alteração em outro arquivo requer uma nova especificação e aprovação.

## Arquivos proibidos

- `D01_REFINAMENTO_DOMINIO.md`, `D02_IDENTIDADE_USUARIO.md`, `D03_PERSISTENCIA_RASCUNHOS.md` e demais documentos;
- `PRODUCT_SPEC.md`, `ROADMAP.md` e `PROJECT_STATE.md`;
- `lib/docai/application/contract-creation-service.ts` e seu teste;
- `lib/docai/domain/contract-models.ts` e seus testes;
- `lib/docai/services/ai-service.ts`, `template-service.ts`, `contract-service.ts` e seus testes;
- `lib/integrations/` e qualquer adaptador de fornecedor;
- `lib/auth/`, `lib/persistence/`, `lib/documents/`, `lib/templates/` e middleware;
- `app/`, `components/` e qualquer interface visual;
- `package.json`, lockfiles, scripts, configurações e variáveis de ambiente;
- chamadas HTTP, SDKs ou credenciais de Gemini, OpenAI, Stripe, Supabase, Vercel ou outros fornecedores;
- PDF, e-mail, pagamentos, autenticação, autorização, persistência ou armazenamento externo.

## Estratégia de testes

- Testar uma solicitação válida para cada um dos quatro tipos.
- Verificar que o tipo do conteúdo diferente do tipo solicitado é rejeitado.
- Verificar que um template de tipo diferente é rejeitado.
- Verificar template com instruções vazias ou dados essenciais inválidos.
- Verificar que a dependência injetada recebe exatamente o tipo e o conteúdo esperados.
- Verificar que uma falha da dependência produz erro estável sem expor detalhes privados.
- Verificar que a dependência não é chamada quando a validação falha.
- Verificar preservação do tipo e da saída `unknown` retornada pelo adaptador.
- Verificar que não há acesso a rede, banco, UI ou fornecedor real.
- Executar a regressão dos testes existentes sem alterar o `ContractCreationService`.
- Na implementação, executar testes, typecheck, build e `git diff --check`.

## Critérios de aceitação

- Existe um serviço de geração com responsabilidade única e dependência de IA injetável.
- O serviço utiliza apenas `AIService` e não conhece qualquer provedor concreto.
- Os quatro tipos de contrato são aceitos somente quando conteúdo e template são compatíveis.
- Entradas inválidas são rejeitadas antes da chamada à IA.
- Falhas da IA são traduzidas para erros previsíveis e sem vazamento de detalhes externos.
- O resultado mantém o tipo solicitado e a saída retornada, sem persistência ou transformação indevida.
- O serviço não depende de framework web, HTTP, UI, banco, autenticação ou pagamentos.
- Os testes cobrem sucesso, incompatibilidades, entradas inválidas e falhas da dependência.
- O fluxo de criação existente permanece inalterado nesta Sprint.
- Nenhum provedor real ou dependência nova foi adicionado.

## Critérios de encerramento

- Implementação limitada aos arquivos autorizados e revisada contra esta especificação.
- Todos os critérios de aceitação possuem evidência nos testes ou na inspeção do código.
- Testes, typecheck, build e `git diff --check` foram executados com sucesso.
- Não há chamadas externas, credenciais, configurações ou dependências novas.
- A documentação permanece inalterada nesta Sprint de implementação.
- O commit e o push somente ocorrerão após implementação, validação e aprovação explícita conforme o processo do DocAI.

## Riscos

- Duplicação de responsabilidade com o `ContractCreationService` existente.
- Diferença entre validação do serviço e validação já existente no domínio/aplicação.
- Saída `unknown` exigir tratamento adicional em uma Sprint futura.
- Falhas ou limites do adaptador serem confundidos com erros de domínio.
- Tentativa de incluir prompt, política jurídica ou comportamento específico de fornecedor nesta camada.
- Integração futura com persistência ou identidade ampliar o escopo sem contratos aprovados.

## Dependências para a próxima Sprint

A próxima Sprint deverá definir, separadamente, como o resultado de geração será associado ao ciclo de vida de rascunhos e ao contexto de identidade do usuário, respeitando `D02_IDENTIDADE_USUARIO.md` e `D03_PERSISTENCIA_RASCUNHOS.md`. Ela também deverá decidir, em especificação própria, qualquer integração real com provedor, interface ou persistência. Nenhuma dessas capacidades é antecipada pela D04.
