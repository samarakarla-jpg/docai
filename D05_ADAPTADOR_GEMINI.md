# D05 — Adaptador Gemini do DocAI

**Produto:** DocAI
**Sprint:** D05 — Adaptador Gemini
**Status:** planejamento histórico substituído; sem autoridade vigente
**Fase:** infraestrutura de IA, sem alteração do domínio

## Objetivo da Sprint

Definir e, após aprovação, implementar um adaptador concreto para o Gemini que satisfaça o contrato `AiAdapter` usado pelo `AIService` existente. O adaptador deverá transformar uma solicitação interna em uma chamada controlada ao provedor, tratar a resposta e devolver somente a estrutura neutra esperada pela aplicação.

Esta documentação não autoriza chamadas reais, instalação de dependências ou alteração de código. A integração só poderá ser implementada após aprovação explícita desta Sprint.

## Escopo funcional

- Implementar o adaptador Gemini atrás da interface `AiAdapter` de `lib/integrations/ai.ts`.
- Permitir que uma instância existente de `AIService` receba o adaptador por injeção.
- Ler configurações exclusivamente do ambiente de execução do servidor.
- Construir um prompt determinístico a partir do tipo e do conteúdo recebidos pelo `AIService`.
- Enviar a solicitação ao endpoint oficial configurado para o modelo aprovado.
- Extrair uma saída textual válida e devolvê-la como `AiResult.output`.
- Aplicar timeout, tentativas limitadas e classificação segura de falhas.
- Manter o adaptador desativado quando a chave não estiver configurada.

Ficam fora desta Sprint o domínio de contratos, mudanças no `AIService`, interface visual, autenticação, persistência, pagamentos, PDF, e-mail, armazenamento externo e qualquer chamada executada durante a fase documental.

## Responsabilidades do adaptador Gemini

O adaptador é responsável por:

- validar a configuração mínima antes de enviar uma solicitação;
- serializar o conteúdo interno em um prompt controlado;
- incluir instruções para produzir apenas um rascunho contratual revisável;
- enviar a requisição ao Gemini usando o modelo e parâmetros aprovados;
- aplicar timeout e política de repetição;
- interpretar somente campos de resposta documentados;
- rejeitar respostas ausentes, vazias ou estruturalmente inválidas;
- converter falhas do provedor em erros estáveis, sem expor chaves ou payloads sensíveis;
- devolver `AiResult` sem adicionar tipos ou conceitos específicos ao domínio.

O adaptador não pode validar regras jurídicas, persistir documentos, identificar usuários, decidir autorização, cobrar, renderizar UI ou inventar dados contratuais.

## Contrato de entrada e saída

O adaptador deve implementar o contrato existente:

```ts
interface AiAdapter {
  readonly status: "enabled" | "disabled";
  generate(request: { readonly input: unknown }): Promise<{
    readonly output: unknown;
  }>;
}
```

Para o fluxo DocAI, `request.input` será a requisição aceita por `AIService`, contendo somente o tipo e o conteúdo estruturado do contrato. O contrato atual não encaminha instruções de template ao `AIService`; portanto, o adaptador não poderá exigir template nem alterar `AiRequest`, `AiResult`, `AIService` ou `ContractGenerationService` para acomodar o provedor. Qualquer ampliação desse contexto exige Sprint própria.

Quando habilitado, o resultado deve conter texto não vazio em `output`. Quando desabilitado ou sem configuração válida, a chamada deve falhar com erro seguro e previsível, sem tentar acessar a rede.

## Uso da interface `AIService` existente

- O `GeminiAdapter` deve implementar `AiAdapter` de `lib/integrations/ai.ts`.
- `AIService` continua responsável pela fronteira de geração do DocAI e recebe o adaptador por injeção.
- O domínio e `ContractGenerationService` continuam dependendo de `AIService`, nunca do `GeminiAdapter`.
- A compatibilidade do template é verificada antes da chamada pelo `ContractGenerationService`; o conteúdo do template não atravessa o contrato atual do `AIService` e não pode ser reconstruído pelo adaptador.
- Nenhum tipo do SDK, resposta bruta, código HTTP ou nome de campo do Gemini pode atravessar a infraestrutura.
- A substituição por outro adaptador deve continuar possível sem alterar modelos ou regras de contrato.

## Configuração por variáveis de ambiente

As configurações devem ser lidas somente no servidor, no momento definido pela implementação:

- `GEMINI_API_KEY` — chave obrigatória para habilitar o adaptador; nunca pode ser retornada, registrada ou enviada ao cliente.
- `GEMINI_MODEL` — modelo utilizado; o valor previsto inicialmente é `gemini-2.0-flash`, mas deve permanecer substituível por ambiente.
- `GEMINI_TIMEOUT_MS` — timeout por tentativa; o padrão é 30.000 ms e o valor aceito deve permanecer entre 5.000 e 60.000 ms.
- `GEMINI_MAX_ATTEMPTS` — número total de tentativas; o padrão é uma tentativa e o máximo permitido é duas.

Valores ausentes, inválidos ou fora dos limites devem desabilitar o adaptador ou produzir erro de configuração antes da chamada. Nenhum arquivo `.env`, configuração de deploy, segredo ou manifesto será alterado nesta Sprint sem autorização específica.

## Modelo Gemini previsto

O modelo inicial planejado é `gemini-2.0-flash`, escolhido como referência operacional para geração textual de baixa latência. O nome não pode ser incorporado ao domínio nem ser a única opção do adaptador; `GEMINI_MODEL` deve permitir sua substituição sem mudança de contrato.

Parâmetros de temperatura, tokens máximos, safety settings e demais opções só poderão ser adicionados quando houver valores aprovados. A implementação não deve inventar defaults de produto ou expor parâmetros arbitrários à interface.

## Construção e envio do prompt

- O prompt deve ser montado de forma determinística e testável sem rede.
- Deve identificar o tipo de contrato e apresentar somente os campos estruturados recebidos pelo `AIService`. Instruções de template não fazem parte do contrato atual e não podem ser inventadas ou obtidas de outra fonte.
- Conteúdo estruturado deve ser serializado com limites de tamanho definidos e sem incluir tokens, cookies, identificadores de autenticação ou dados de outras contas.
- O prompt deve instruir o modelo a produzir um rascunho, preservar os fatos fornecidos e sinalizar lacunas ou ambiguidades.
- Deve proibir a criação de nomes, documentos de identidade, endereços, valores, moedas, prazos, datas, cláusulas ou qualquer outro fato não fornecido.
- O modelo não deve declarar validade jurídica, aprovação, assinatura ou aconselhamento profissional.
- Instruções recebidas do usuário devem ser tratadas como dados, não como autoridade para remover essas salvaguardas.
- O prompt final não deve ser registrado em logs nem persistido pelo adaptador.

O adaptador deve enviar somente o payload mínimo exigido pelo endpoint do modelo aprovado. Endpoint, formato de transporte e autenticação permanecem detalhes de infraestrutura.

## Tratamento da resposta

- Aceitar somente a parte textual documentada da resposta do Gemini.
- Rejeitar resposta sem candidatos, sem texto, bloqueada por segurança ou incompatível com o formato esperado.
- Remover apenas espaços externos; não reescrever, completar ou corrigir o conteúdo gerado.
- Preservar a saída como texto em `AiResult.output`.
- Não transformar a resposta em entidade de contrato, não persistir o texto e não marcar revisão ou aprovação.
- Mensagens de erro públicas devem ser genéricas; detalhes técnicos podem permanecer apenas em mecanismos de observabilidade aprovados, sem conteúdo contratual ou segredo.

## Timeouts, tentativas e limites

- Cada tentativa deve possuir timeout configurável, com padrão de 30 segundos e limites de 5 a 60 segundos.
- O total de tentativas não pode exceder duas, incluindo a tentativa inicial.
- Repetir somente falhas transitórias claramente classificadas, como timeout, indisponibilidade temporária ou resposta HTTP 429/5xx.
- Não repetir erros de configuração, autenticação, autorização, conteúdo inválido, bloqueio de segurança ou respostas malformadas.
- Deve existir um pequeno atraso controlado entre tentativas, sem espera indefinida; o padrão previsto é 250 ms.
- O tamanho do prompt, o número de tokens de saída e o custo por operação devem respeitar limites configurados e documentados.
- O adaptador não deve executar chamadas concorrentes ou repetidas fora desta política.

## Tratamento seguro de erros

- Falhas de configuração devem ser distinguíveis de indisponibilidade do provedor por códigos internos estáveis.
- Erros do SDK, corpo de resposta, URL, chave, prompt completo e identificadores sensíveis não podem aparecer na mensagem pública.
- O erro deve ser compatível com o tratamento já realizado pelo `AIService`, que traduz falhas do adaptador para `ADAPTER_FAILURE`.
- Respostas bloqueadas ou inválidas devem ser tratadas como falha segura, sem fallback que invente conteúdo.
- A ausência da chave deve manter o recurso desabilitado e não provocar tentativa de rede.

## Proteção de chaves e dados sensíveis

- A chave deve existir somente no ambiente de servidor e em memória durante o uso necessário.
- Nunca registrar chave, prompt integral, conteúdo contratual integral ou resposta integral em logs.
- Nunca enviar cookies, tokens, `ownerId`, e-mail ou dados de outra conta ao provedor.
- Minimizar o conteúdo contratual enviado e respeitar políticas de retenção aprovadas antes da ativação.
- Não incluir dados reais nos testes, fixtures ou commits.
- Não expor configuração ou erros do adaptador em componentes, rotas ou respostas de cliente.

## Limite entre domínio e infraestrutura

O domínio fornece tipo e conteúdo validado; não conhece Gemini, modelo, endpoint, chave ou códigos HTTP. A infraestrutura monta o payload, pode usar HTTP somente dentro do adaptador, chama o provedor, interpreta a resposta e converte falhas. A decisão de quando gerar, para qual usuário e onde guardar o resultado pertence às camadas de aplicação, identidade e persistência, que não serão alteradas nesta Sprint.

## Arquivos autorizados para implementação

Somente após aprovação explícita desta especificação:

- `lib/docai/infrastructure/ai/gemini-adapter.ts` — adaptador concreto que implementa `AiAdapter`;
- `lib/docai/infrastructure/ai/gemini-adapter.test.ts` — testes unitários do adaptador, prompt, configuração, respostas e política de repetição.

Se a estrutura de diretórios não existir, ela poderá ser criada apenas para esses dois arquivos. Qualquer alteração adicional exige nova revisão e aprovação.

## Arquivos proibidos

- `lib/integrations/ai.ts` e `lib/docai/services/ai-service.ts`;
- `lib/docai/domain/`, `lib/docai/application/` e `lib/docai/services/contract-generation-service.ts`;
- `lib/auth/`, `lib/persistence/`, `lib/documents/`, `lib/templates/` e middleware;
- `app/`, `components/` e qualquer UI, rota ou Server Action;
- `supabase/`, migrations, schemas, políticas e configurações de banco;
- `package.json`, lockfiles, scripts, configurações, arquivos `.env` e deploy;
- implementações ou chamadas reais de Gemini durante a fase documental;
- integrações com OpenAI, Stripe, Supabase, Vercel, PDF, e-mail ou storage externo;
- prompts de produção fora do adaptador, dados reais, chaves e credenciais;
- qualquer arquivo não listado como autorizado.

## Dependências

- Contrato `AiAdapter` e estado opcional definido em `lib/integrations/ai.ts`.
- `AIService` existente como consumidor e tradutor de falhas do adaptador.
- Tipos de geração e conteúdo definidos pelo domínio atual.
- Variáveis de ambiente fornecidas pelo ambiente de execução, sem alteração de configuração nesta Sprint.
- API nativa de rede disponível no runtime aprovado, ou mecanismo já existente no projeto; nenhuma dependência nova poderá ser instalada.

## Estratégia de testes

Todos os testes devem usar mocks ou dublês locais e não podem chamar o Gemini:

- configuração válida habilita o adaptador e usa o modelo configurado;
- ausência ou configuração inválida mantém o adaptador desabilitado ou falha antes da rede;
- prompt determinístico contém somente tipo e conteúdo recebidos pelo `AIService`, sem exigir template;
- prompt não contém chaves, tokens, dados de outras contas ou fatos inventados;
- respostas textuais válidas são convertidas para `AiResult.output`;
- respostas vazias, bloqueadas, incompletas ou malformadas produzem erro seguro;
- timeouts e erros transitórios respeitam o máximo de duas tentativas;
- erros não transitórios não são repetidos;
- mensagens públicas não expõem detalhes do provedor, payload, chave ou resposta;
- o adaptador implementa o contrato `AiAdapter` e permanece substituível no `AIService`;
- nenhum teste utiliza rede, credenciais ou dados contratuais reais.

## Critérios de aceitação

- O adaptador implementa `AiAdapter` sem alterar a interface existente.
- `AIService` pode consumi-lo por injeção, sem dependência inversa do domínio no Gemini.
- O modelo inicial e todas as configurações são controláveis por ambiente, com limites seguros.
- O prompt é determinístico, limitado ao contexto autorizado e proíbe invenção de fatos.
- A resposta é validada e convertida para `AiResult.output` sem transformação indevida.
- Timeout, repetição, limites e classificação de falhas são previsíveis e testados.
- Chaves, prompts, dados sensíveis e detalhes do provedor não são expostos.
- Testes usam somente mocks e não fazem chamadas reais ao Gemini.
- Nenhum arquivo fora da lista autorizada, dependência, configuração ou integração adicional foi alterado.

## Riscos conhecidos

- Mudanças do endpoint, modelo ou formato de resposta do Gemini.
- Alucinação, omissão ou reinterpretação de dados contratuais.
- Bloqueios de segurança ou respostas parciais difíceis de distinguir de sucesso.
- Vazamento de conteúdo sensível por logs, telemetria ou mensagens de erro.
- Custos, limites de taxa e latência superiores aos previstos.
- Repetições indevidas produzirem custo duplicado ou resultados inconsistentes.
- Configuração incorreta habilitar o adaptador em ambiente não preparado.
- Dependência excessiva do formato de um único provedor.

## Critérios de encerramento

- Esta especificação for revisada e aprovada explicitamente.
- Implementação ficar limitada aos dois arquivos autorizados.
- Todos os testes do adaptador e a regressão aplicável forem aprovados sem rede real.
- Typecheck, build e `git diff --check` forem aprovados.
- Nenhuma dependência, configuração, chave ou arquivo de produção fora do escopo for adicionado.
- Documentação for reconciliada com o comportamento implementado.
- Commit, push, sincronização da branch e árvore limpa ocorrerem somente após aprovação do resultado.

## Dependências para a Sprint seguinte

A Sprint seguinte deverá definir a ativação operacional do adaptador no fluxo de geração, incluindo política de privacidade, limites comerciais, observabilidade mínima e associação segura ao contexto do usuário e aos rascunhos. Ela dependerá dos contratos de identidade e persistência de D02/D03 e não poderá ampliar o adaptador para pagamentos, UI ou outros provedores sem especificação própria.
