# Sprint 04 — Gerenciamento reutilizável de documentos

**Sprint:** `04 — Gerenciamento reutilizável de documentos`

**Fase do Roadmap:** `Fase 3 — Serviços reutilizáveis`

**Status:** `encerrada`

Este documento definiu o segundo serviço reutilizável do SaaS Starter Kit. A implementação foi concluída, validada, aprovada e incorporada à branch `main` pelo commit `9cdef7c653f995c1dbf088939f6811f042291efe`. O plano aprovado é preservado abaixo como registro dos limites aplicados durante a execução. O encerramento desta Sprint não autoriza alteração de dependências ou configurações, nova implementação, commit, push, publicação ou início de outra Sprint.

# Objetivo

Implementar uma camada reutilizável de gerenciamento de documentos por meio de um `DocumentService` genérico, responsável pelo ciclo de vida mínimo de documentos compostos por identificador, título e conteúdo de tipo parametrizável. Ao final da Sprint, o serviço deverá permitir criar, ler, listar, atualizar e excluir documentos por um contrato pequeno e previsível, mantendo persistência concreta, interface, formato de arquivo, autenticação e regras de produtos derivados fora de sua responsabilidade.

O resultado deverá ampliar a Fase 3 pelo menor recorte coerente, preservando o padrão arquitetural validado na Sprint 03 sem criar uma abstração comum prematura entre `TemplateService` e `DocumentService`.

# Escopo

- Criar uma área coesa para a capacidade de documentos em `lib/documents/`.
- Definir, no mesmo módulo do `DocumentService`, os contratos públicos mínimos de documento, criação, atualização e armazenamento.
- Representar cada documento somente por `id`, `title` e `content`.
- Parametrizar o tipo de `content` para que o consumidor defina sua estrutura.
- Tratar `content` como dado opaco, sem interpretar, converter, renderizar ou validar sua estrutura interna.
- Oferecer somente as operações `create`, `getById`, `list`, `update` e `remove`.
- Receber a dependência de armazenamento por contrato explícito e injeção.
- Validar identificadores e títulos obrigatórios e não vazios.
- Rejeitar atualização sem `title` nem `content`.
- Distinguir entrada inválida, conflito de identificador, documento inexistente e falha de armazenamento.
- Preservar a ordem fornecida pelo contrato de armazenamento na listagem, sem impor ordenação de produto.
- Criar testes focados no contrato público com armazenamento em memória restrito ao arquivo de teste.
- Validar comportamento principal, limites, falhas, neutralidade e ausência de efeitos fora do escopo.

A expressão “camada de gerenciamento de documentos” autoriza somente esta capacidade. Ela não autoriza uma camada de arquivos, um sistema de conteúdo, uma biblioteca documental, uma abstração base de CRUD ou outros serviços.

# Entregas

## Entrega 1 — Contrato neutro de documento

No mesmo módulo do serviço, deverão ser definidos apenas os contratos necessários para:

- representar um documento por `id`, `title` e `content`;
- representar as entradas de criação e atualização;
- parametrizar o conteúdo sem impor formato;
- representar a dependência mínima de armazenamento;
- tornar as falhas esperadas identificáveis pelo consumidor.

Não deverão ser incluídos nome de arquivo, extensão, MIME type, URL, tamanho, timestamps, autor, proprietário, organização, versão, status, categoria, tags, permissões ou metadados sem requisito atual.

## Entrega 2 — DocumentService

O `DocumentService` deverá:

- receber sua dependência de armazenamento de forma explícita;
- criar um documento quando o identificador ainda não existir;
- retornar um documento existente pelo identificador;
- listar documentos sem reordenar ou transformar o conteúdo;
- atualizar somente `title` e/ou `content`;
- excluir um documento existente por meio da operação `remove`;
- rejeitar identificador ou título vazio ou composto apenas por espaços;
- rejeitar atualização sem nenhum campo autorizado;
- validar entradas antes de qualquer operação de escrita;
- preservar o conteúdo recebido sem interpretação ou enriquecimento;
- traduzir condições esperadas para falhas internas estáveis;
- contextualizar falhas inesperadas com mensagem segura e causa preservada;
- não registrar, persistir ou expor dados além do contrato.

## Entrega 3 — Testes do contrato público

Os testes deverão verificar:

- criação e retorno de documento válido;
- rejeição de identificador e título vazios;
- rejeição de identificador duplicado;
- leitura de documento existente;
- tratamento de documento inexistente na leitura, atualização e exclusão;
- listagem sem alteração da ordem nem transformação do conteúdo;
- atualização parcial de título;
- atualização parcial de conteúdo;
- rejeição de atualização vazia ou com título inválido;
- exclusão e comportamento posterior à exclusão;
- tradução de falha controlada do armazenamento;
- preservação da causa sem exposição da mensagem interna da dependência;
- uso do mesmo serviço com pelo menos dois formatos de conteúdo não relacionados.

O armazenamento em memória existirá somente no teste. Ele não fará parte da interface pública nem constituirá adaptador de produção.

# Fora do Escopo

- Qualquer regra, nome, tipo, fluxo ou integração específica do DocAI.
- Geração, edição, resumo, classificação ou análise de conteúdo por inteligência artificial.
- Integração com modelos, agentes, embeddings, busca vetorial ou prompts.
- Criação, leitura, conversão, renderização, visualização ou exportação de PDF.
- Upload, download, streaming, armazenamento ou manipulação de arquivos.
- Formatos de arquivo, extensão, MIME type, codificação ou tamanho de arquivo.
- Persistência real em Supabase, banco de dados, sistema de arquivos, cache ou serviço externo.
- Banco de dados de produto, tabela, schema, migration, seed ou política de acesso.
- Rotas, APIs, Server Actions, middleware, páginas, formulários ou componentes visuais.
- Integração com autenticação, dashboard, `TemplateService` ou qualquer consumidor existente.
- Autorização, propriedade, organizações, multi-tenancy ou isolamento entre usuários.
- Pagamentos, assinaturas, faturamento, planos ou Stripe.
- Histórico de versões, revisão, publicação, arquivamento, restauração ou lixeira.
- Duplicação, compartilhamento, comentários, colaboração ou bloqueio de edição.
- Busca, filtros, ordenação definida pelo serviço, paginação ou limites de volume.
- Logs, métricas, auditoria, telemetria, cache, filas ou repetição automática.
- Geração automática de identificadores.
- Validação ou transformação da estrutura interna de `content`.
- Criação de outros serviços reutilizáveis.
- Classe base de serviço, repositório genérico, abstração comum de CRUD, service locator, contêiner de injeção ou registro global.
- Refatoração, alteração ou reutilização direta dos contratos internos do `TemplateService`.
- Instalação, remoção ou atualização de dependências.
- Alteração de scripts, manifestos, arquivos de lock, configurações ou variáveis de ambiente.
- Atualização de documentação fora deste arquivo.
- Preparação para Sprints posteriores.

# Requisitos

- **REQ-01 — Neutralidade de domínio:** o serviço, os contratos, os erros e os testes deverão utilizar somente conceitos genéricos de documento.
- **REQ-02 — Contrato mínimo:** o documento público deverá conter apenas `id`, `title` e `content`, além das entradas estritamente necessárias às operações aprovadas.
- **REQ-03 — Conteúdo parametrizável:** o tipo de `content` deverá ser definido pelo consumidor e tratado como opaco pelo serviço.
- **REQ-04 — Operações autorizadas:** a interface do serviço deverá expor somente `create`, `getById`, `list`, `update` e `remove`.
- **REQ-05 — Armazenamento substituível:** o armazenamento deverá ser representado por contrato pequeno, recebido explicitamente e substituível nos testes.
- **REQ-06 — Responsabilidade delimitada:** o serviço deverá coordenar validação, existência e tradução de falhas sem implementar persistência, apresentação, autenticação ou regra de produto.
- **REQ-07 — Validação de entrada:** identificadores, títulos e atualizações inválidas deverão ser rejeitados antes de qualquer escrita.
- **REQ-08 — Tratamento de erros:** entrada inválida, conflito, ausência e falha de armazenamento deverão ser distinguíveis sem revelar detalhes da dependência.
- **REQ-09 — Ausência de estado oculto:** o serviço não deverá utilizar singleton, variável global, cache próprio ou armazenamento implícito.
- **REQ-10 — Independência entre serviços:** o `DocumentService` não deverá depender do `TemplateService`, nem motivar alteração ou abstração compartilhada nesta Sprint.
- **REQ-11 — Verificabilidade:** o comportamento deverá ser exercitado sem rede, credenciais, persistência real ou biblioteca adicional.
- **REQ-12 — Compatibilidade da base:** teste focado, testes preexistentes, typecheck e build deverão possuir resultado conhecido sem alteração de configuração.

# Arquivos autorizados para alteração

Após a aprovação explícita desta Sprint, somente os arquivos abaixo poderão ser criados:

| Arquivo | Ação autorizada | Finalidade |
| --- | --- | --- |
| `lib/documents/document-service.ts` | criar | Conter o `DocumentService` e os contratos mínimos diretamente necessários à capacidade. |
| `lib/documents/document-service.test.ts` | criar | Verificar o contrato público com armazenamento controlado e sem acesso externo. |

Regras adicionais:

- a pasta `lib/documents/` somente poderá existir porque conterá os dois arquivos autorizados;
- tipos, erros e contratos deverão permanecer no módulo do serviço enquanto não houver uso real que justifique extração;
- nenhum `index.ts`, arquivo auxiliar, adaptador de produção ou terceiro arquivo está autorizado;
- se a implementação exigir qualquer arquivo adicional, o trabalho deverá parar até revisão formal e nova aprovação.

# Arquivos proibidos

Todo arquivo não listado na seção anterior é proibido por padrão. Em especial, não poderão ser alterados:

- `app/`, `public/` e todos os seus arquivos e subdiretórios;
- `lib/auth/` e todos os seus arquivos;
- `lib/templates/template-service.ts`;
- `lib/templates/template-service.test.ts`;
- `middleware.ts`;
- `package.json`;
- `package-lock.json`;
- `tsconfig.json`;
- `next.config.ts`;
- `postcss.config.mjs`;
- `next-env.d.ts`;
- `.env.example`, `.env.local` e qualquer arquivo de ambiente;
- `README.md`, `VISION.md`, `PROJECT_PRINCIPLES.md`, `PRODUCT_SPEC.md`, `ARCHITECTURE.md`, `UI_GUIDELINES.md`, `CODE_STYLE.md`, `DEVELOPMENT_WORKFLOW.md`, `AI_RULES.md`, `MASTER_PROMPT.md` e `ROADMAP.md`;
- `SPRINT_01.md`, `SPRINT_02.md`, `SPRINT_03.md`, `TEMPLATE_SPRINT.md`, `TEMPLATE_SERVICE.md` e demais documentos;
- `.gitignore` e qualquer arquivo dentro de `.git/`;
- artefatos gerados, incluindo `.next/` e `tsconfig.tsbuildinfo`.

`SPRINT_04.md` somente poderá ser revisado antes da aprovação ou por mudança de escopo explicitamente solicitada e aprovada. Sua aprovação não autoriza alteração silenciosa durante a implementação.

# Critérios de Aceitação

- **CA-01 — Estrutura mínima (REQ-02, REQ-06):** somente os dois arquivos autorizados são criados, sem barrel, arquivo auxiliar, camada base ou outro serviço.
- **CA-02 — Contrato neutro (REQ-01, REQ-02):** o documento público representa somente `id`, `title` e `content`.
- **CA-03 — Conteúdo genérico (REQ-01, REQ-03):** o serviço é verificado com ao menos dois tipos de conteúdo não relacionados, sem conhecer ou transformar sua estrutura.
- **CA-04 — Criação (REQ-04, REQ-07):** entrada válida cria e retorna um documento; identificador ou título vazio é rejeitado antes da escrita.
- **CA-05 — Conflito (REQ-08):** criação com identificador existente produz falha interna estável e distinguível.
- **CA-06 — Leitura (REQ-04, REQ-08):** `getById` retorna documento existente e distingue documento inexistente.
- **CA-07 — Listagem (REQ-03, REQ-04):** `list` preserva a ordem do armazenamento e não transforma conteúdo.
- **CA-08 — Atualização (REQ-04, REQ-07):** `update` altera título e conteúdo de forma independente, preservando campos não fornecidos.
- **CA-09 — Atualização inválida (REQ-07):** atualização vazia ou com título inválido é rejeitada antes da escrita.
- **CA-10 — Exclusão (REQ-04, REQ-08):** `remove` exclui documento existente e distingue documento inexistente.
- **CA-11 — Falha de armazenamento (REQ-08):** falha controlada da dependência é contextualizada por código estável, com causa preservada e mensagem interna não exposta.
- **CA-12 — Armazenamento substituível (REQ-05, REQ-09):** o serviço recebe contrato explícito e os testes executam sem rede, credenciais ou recurso externo.
- **CA-13 — Independência (REQ-10):** nenhum arquivo, contrato ou comportamento do `TemplateService` é alterado ou importado.
- **CA-14 — Neutralidade e exclusões (REQ-01, REQ-06):** não existem regras de DocAI, IA, PDF, pagamentos, interface, integração externa ou banco de dados específico.
- **CA-15 — Sem dependências novas (REQ-11, REQ-12):** nenhum pacote, script, manifesto, lockfile, configuração ou variável de ambiente é criado ou alterado.
- **CA-16 — Qualidade (REQ-11, REQ-12):** teste do `DocumentService`, teste preexistente do `TemplateService`, typecheck e build concluem sem erro impeditivo introduzido pela Sprint; a ausência de lint é declarada.
- **CA-17 — Preservação do escopo:** o diff final contém exclusivamente os dois arquivos autorizados e preserva alterações preexistentes.
- **CA-18 — Ausência de antecipação:** nenhum item declarado fora do escopo está presente na implementação.

Na entrega, cada critério deverá receber o estado **atendido**, **não atendido**, **pendente** ou **não verificável**, acompanhado da respectiva evidência ou justificativa.

# Checklist Técnico

- [x] **Lint:** ausência de script oficial declarada, sem instalação ou configuração.
- [x] **Typecheck:** executado com o TypeScript existente, sem emissão de arquivos.
- [x] **Build:** executado com o script oficial existente.
- [x] **Testes:** testes do `DocumentService` e do `TemplateService` executados com o runtime já disponível.
- [x] **Responsividade:** declarada não aplicável, pois não houve alteração de interface.
- [x] **Acessibilidade básica:** declarada não aplicável, pois não houve alteração de interface ou interação.
- [x] **Segurança:** confirmada a ausência de segredo, credencial, dado pessoal de teste, acesso externo e mensagem sensível.
- [x] **Arquitetura:** confirmadas responsabilidade única, dependência explícita e independência entre os serviços.
- [x] **Repositório:** diff completo e estado final revisados contra o estado inicial.

# Critérios de Revisão

Antes de apresentar a Sprint para aceite, deverá ser confirmado:

- alinhamento com a Fase 3, sem autorizar a fase inteira;
- compatibilidade com visão, princípios, especificação, arquitetura e estilo;
- neutralidade em relação a domínio, marca, fornecedor e produto;
- distinção explícita entre documento conceitual e arquivo ou PDF;
- contrato público limitado a `id`, `title` e `content`;
- conteúdo parametrizável e opaco;
- presença exclusiva das cinco operações autorizadas;
- dependência de armazenamento explícita e substituível;
- validação antes de operações de escrita;
- falhas previsíveis, seguras e com causa preservada;
- ausência de persistência concreta, integração, interface e estado global;
- independência do `TemplateService`;
- ausência de abstração genérica extraída apenas pela semelhança entre dois serviços;
- testes orientados ao contrato público;
- preservação integral de comportamento e arquivos preexistentes;
- alteração exclusiva dos arquivos autorizados;
- ausência de mudança em dependências, configurações, scripts, manifestos e lockfile;
- registro transparente de falhas, limitações e verificações não executadas.

# Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Confundir documento conceitual com arquivo ou PDF | Inclusão indevida de formato, upload, conversão ou armazenamento binário | Manter `content` opaco e proibir campos e operações de arquivo. |
| Generalização excessiva do contrato | API ampla, difícil de compreender e acoplada a hipóteses | Limitar dados a `id`, `title` e `content` e operações às cinco aprovadas. |
| Extrair uma base comum com o TemplateService | Abstração prematura e acoplamento entre capacidades distintas | Preservar módulos independentes e aceitar pequena repetição enquanto não houver padrão comprovado. |
| Serviço atuar apenas como repasse do armazenamento | Camada sem responsabilidade real | Concentrar somente validação, verificação de existência e tradução de falhas no serviço. |
| Exclusão produzir perda permanente | Consumidor pode interpretar `remove` como operação reversível | Definir exclusão como delegação definitiva ao armazenamento; lixeira e restauração permanecem fora do escopo. |
| Condições de corrida na criação | Verificação prévia não garante unicidade em armazenamento concorrente | Não prometer transação; armazenamento futuro deverá preservar unicidade e traduzir conflito. |
| Listagem sem paginação | Uso com grande volume pode causar custo excessivo | Registrar a limitação; paginação exige necessidade, contrato e Sprint próprios. |
| Conteúdo potencialmente sensível | Mensagens, testes ou logs podem revelar dados | Usar dados fictícios, não registrar conteúdo e revisar erros e diff. |
| Falha de armazenamento vazar detalhes | Exposição de mensagens ou estruturas internas | Utilizar código e mensagem internos estáveis, preservando a causa sem incorporá-la à mensagem pública. |
| Expansão para autorização ou multi-tenancy | Regras de produto contaminam a fundação | Manter acesso e isolamento sob responsabilidade de consumidores futuros. |
| Alteração indireta de arquivos proibidos | Build ou ferramenta pode produzir artefatos ou modificar configuração | Usar somente comandos existentes, registrar o estado inicial e revisar status e diff após cada validação. |

# Dependências

## Pré-requisitos

- Sprint 03 formalmente aprovada e encerrada.
- `TemplateService` validado e disponível apenas como referência de consistência, sem dependência de execução.
- Aprovação formal deste documento.
- Autorização explícita para iniciar a implementação.
- Estado inicial do repositório limpo ou com alterações preexistentes identificadas.
- Node.js, TypeScript e dependências existentes disponíveis no ambiente.
- Confirmação de que os dois arquivos autorizados são suficientes.

Se qualquer pré-requisito permanecer pendente, a implementação deverá permanecer suspensa.

## Dependências técnicas existentes

- TypeScript já configurado no projeto.
- Runtime Node.js e módulos nativos de teste já disponíveis.
- Scripts existentes de build, apenas para validação.
- Padrões de serviço demonstrados pela Sprint 03, utilizados somente como referência de consistência.

O contrato de armazenamento do `DocumentService` será interno ao próprio módulo. Nenhum adaptador concreto de produção será criado.

## Novas dependências

**Nenhuma.**

Não estão autorizados pacotes, serviços externos, variáveis de ambiente, configurações, scripts, manifestos ou alterações de arquivo de lock.

# Plano de Implementação

1. Confirmar todos os pré-requisitos e registrar o estado inicial do repositório.
2. Inspecionar novamente os dois arquivos da Sprint 03 apenas como referência, sem modificá-los.
3. Criar `lib/documents/document-service.ts` com contratos mínimos, erros estáveis e `DocumentService`.
4. Criar `lib/documents/document-service.test.ts` com armazenamento controlado e casos aprovados.
5. Executar os testes dos serviços de documento e template.
6. Corrigir somente problemas contidos nos dois arquivos autorizados.
7. Executar typecheck e build com os recursos existentes.
8. Revisar o diff quanto a escopo, neutralidade, arquitetura, segurança e simplicidade.
9. Comparar o estado final com o inicial e preparar a entrega para revisão.

O plano não amplia a autorização. Se qualquer etapa exigir arquivo, dependência, configuração ou comportamento adicional, o trabalho deverá parar e solicitar revisão formal.

# Plano de Validação

| Item | Método de validação | Evidência esperada |
| --- | --- | --- |
| REQ-01 / CA-02 / CA-14 | Revisão de nomes, contratos, erros e testes; busca textual por termos proibidos | Contrato neutro e ausência de regras específicas ou integrações. |
| REQ-02 / CA-02 | Inspeção da interface pública | Somente `id`, `title` e `content`, além das entradas mínimas. |
| REQ-03 / CA-03 / CA-07 | Testes com dois formatos de conteúdo e listagem em ordem conhecida | Conteúdo e ordem preservados sem transformação. |
| REQ-04 / CA-04 / CA-06 / CA-08 / CA-10 | Testes das cinco operações públicas | Resultados previsíveis nos caminhos válidos e ausentes. |
| REQ-05 / CA-12 | Inspeção de dependência e execução com armazenamento em memória no teste | Serviço verificável sem recurso externo. |
| REQ-06 / CA-01 / CA-14 | Revisão arquitetural do módulo e do diff | Responsabilidade delimitada e nenhuma capacidade excluída. |
| REQ-07 / CA-04 / CA-09 | Testes de entrada inválida com contagem de escritas | Falha anterior a qualquer mutação. |
| REQ-08 / CA-05 / CA-06 / CA-10 / CA-11 | Testes de conflito, ausência e falha controlada | Códigos distinguíveis, mensagem segura e causa preservada. |
| REQ-09 / CA-12 | Inspeção do serviço | Ausência de singleton, cache, variável global ou armazenamento implícito. |
| REQ-10 / CA-13 | Busca de imports, revisão do diff e teste preexistente | Nenhum acoplamento ou alteração do `TemplateService`. |
| REQ-11 / CA-16 | Execução dos testes nativos | Casos aprovados executados sem rede ou pacote adicional. |
| REQ-12 / CA-15 / CA-16 | Typecheck, build e inspeção dos arquivos de projeto | Base válida e dependências/configurações inalteradas. |
| CA-17 / CA-18 | Comparação de status, diff e lista autorizada | Somente os dois arquivos aprovados e nenhuma antecipação. |

Sequência mínima:

1. registrar `git status --short` antes da implementação;
2. executar `node --test lib/documents/document-service.test.ts lib/templates/template-service.test.ts`;
3. executar `./node_modules/.bin/tsc --noEmit`;
4. executar `npm run build`;
5. executar lint somente se houver script oficial; caso contrário, declarar indisponibilidade;
6. declarar responsividade e acessibilidade não aplicáveis;
7. revisar os dois arquivos criados e o diff completo;
8. confirmar que código preexistente, documentos, dependências e configurações não mudaram;
9. procurar referências a DocAI, IA, PDF, pagamentos, interface e integrações;
10. atribuir status e evidência a cada critério de aceitação;
11. registrar falhas, limitações e verificações não executadas;
12. comparar o estado final com o inicial.

Nenhum comando poderá instalar, remover ou atualizar dependências. Artefatos de build não poderão ser incluídos na entrega.

# Critérios de Conclusão

A Sprint poderá ser considerada **tecnicamente concluída e aguardando aprovação** somente quando:

- todos os pré-requisitos estiverem formalmente atendidos;
- as três entregas estiverem completas;
- cada requisito possuir evidência;
- todos os critérios de aceitação possuírem status e evidência;
- testes do `DocumentService` e do `TemplateService` tiverem sido executados com sucesso;
- typecheck e build tiverem sido executados sem erro impeditivo introduzido pela Sprint;
- lint tiver sido executado ou sua indisponibilidade declarada;
- responsividade e acessibilidade tiverem sido declaradas não aplicáveis;
- revisão arquitetural confirmar responsabilidade única, neutralidade e armazenamento substituível;
- não existir erro conhecido que invalide o contrato;
- somente os dois arquivos autorizados tiverem sido criados;
- `TemplateService` e demais arquivos preexistentes permanecerem inalterados;
- nenhuma dependência, configuração, variável de ambiente, script, manifesto ou lockfile tiver sido alterado;
- diff e estado final tiverem sido revisados;
- riscos, limitações, falhas e pendências tiverem sido registrados;
- arquivos afetados, comandos e resultados tiverem sido apresentados ao responsável.

Conclusão técnica não encerra a Sprint. O encerramento depende de revisão e aprovação explícita. A conclusão não autoriza commit, push, publicação, integração, outro serviço ou Sprint posterior.

# Entrega Esperada

Ao concluir tecnicamente a Sprint, a entrega deverá apresentar:

- `DocumentService` genérico disponível para revisão;
- contratos mínimos de documento e armazenamento no mesmo módulo;
- testes executáveis sem recurso externo;
- lista completa dos arquivos criados;
- resumo da finalidade de cada alteração;
- comandos executados e resultados;
- resultados de testes, typecheck, build e demais inspeções;
- verificações indisponíveis ou não aplicáveis justificadas;
- status e evidência individual de cada critério;
- riscos, limitações, falhas e pendências;
- confirmação de ausência de regras específicas, IA, PDF, pagamentos, interface e integrações;
- confirmação de que `TemplateService` não foi alterado;
- confirmação de dependências e configurações inalteradas;
- confirmação de que somente os arquivos autorizados foram afetados.

O estado esperado após a entrega técnica era **Sprint 04 tecnicamente concluída e aguardando aprovação**. Após a revisão e a aprovação explícita do responsável, o estado atual é **Sprint 04 encerrada**.

# Commit Esperado

**Mensagem proposta:** `feat: add reusable document service`

**Commit da implementação:** `9cdef7c653f995c1dbf088939f6811f042291efe`

**Arquivos previstos:**

- `lib/documents/document-service.ts`
- `lib/documents/document-service.test.ts`

A implementação foi registrada com a mensagem proposta e enviada para `origin/main` após autorização explícita. Este registro não autoriza novo commit, push, Pull Request ou publicação.

# Registro de Encerramento

## Resultado

- `DocumentService` e seus contratos mínimos foram criados em `lib/documents/document-service.ts`.
- Os testes do contrato público foram criados em `lib/documents/document-service.test.ts`.
- Nenhum outro arquivo integrou o commit da implementação.
- Nenhuma dependência, configuração, variável de ambiente, script, manifesto ou arquivo de lock foi alterado.
- A entrega foi revisada e aprovada explicitamente pelo responsável pelo projeto.

## Validações registradas

- `node --test lib/documents/document-service.test.ts lib/templates/template-service.test.ts`: 20 testes aprovados, sem falhas.
- `./node_modules/.bin/tsc --noEmit`: concluído sem erro.
- `npm run build`: concluído sem erro.
- Lint: indisponível porque o projeto não possui script oficial.
- Responsividade e acessibilidade: não aplicáveis, pois a Sprint não alterou interface ou interação.
- Revisão de escopo: o commit da implementação contém exclusivamente os dois arquivos autorizados.

## Status dos critérios de aceitação

| Critério | Status | Evidência |
| --- | --- | --- |
| CA-01 | Atendido | O commit da implementação criou somente os dois arquivos autorizados. |
| CA-02 | Atendido | O contrato público de documento contém somente `id`, `title` e `content`. |
| CA-03 | Atendido | Os testes exercitam conteúdos de tipos distintos sem transformação. |
| CA-04 | Atendido | Testes confirmam criação válida e rejeição de identificador ou título vazio antes da escrita. |
| CA-05 | Atendido | Identificador duplicado produz erro `CONFLICT`. |
| CA-06 | Atendido | `getById` retorna documento existente e produz `NOT_FOUND` para ausência. |
| CA-07 | Atendido | A listagem preserva ordem e referências de conteúdo fornecidas pelo armazenamento. |
| CA-08 | Atendido | Título e conteúdo são atualizados independentemente, preservando campos omitidos. |
| CA-09 | Atendido | Atualização vazia ou com título inválido é rejeitada antes da escrita. |
| CA-10 | Atendido | `remove` exclui documento existente e distingue ausência. |
| CA-11 | Atendido | Falha de armazenamento produz `STORAGE_FAILURE`, preserva a causa e não expõe a mensagem interna. |
| CA-12 | Atendido | O armazenamento é recebido por contrato explícito e substituído por implementação em memória nos testes. |
| CA-13 | Atendido | `DocumentService` não importa nem altera `TemplateService`; o teste preexistente permanece aprovado. |
| CA-14 | Atendido | A implementação não contém regra de DocAI, IA, PDF, pagamentos, interface, integração externa ou banco específico. |
| CA-15 | Atendido | Dependências, scripts, manifestos, lockfile, configurações e variáveis de ambiente permaneceram inalterados. |
| CA-16 | Atendido | Testes, typecheck e build foram aprovados; a ausência de lint foi declarada. |
| CA-17 | Atendido | O commit da implementação contém exclusivamente os dois arquivos autorizados. |
| CA-18 | Atendido | Nenhum item declarado fora do escopo foi antecipado. |

# Observações

## Decisões registradas

- O contrato usará `id`, `title` e `content`.
- `content` será o único ponto parametrizável.
- A exclusão pública será denominada `remove`, em consistência com o serviço existente.
- A persistência será representada por contrato interno sem adaptador de produção.
- O armazenamento em memória existirá somente no teste.
- A ordem da listagem pertencerá ao contrato de armazenamento.
- O serviço permanecerá independente do `TemplateService`.

## Limitações conhecidas

- Sem adaptador concreto, o serviço não persiste documentos por conta própria.
- A Sprint não demonstra integração com consumidor de produção.
- O contrato não representa arquivo físico nem define semântica para o conteúdo.
- Exclusão não possui lixeira, restauração ou histórico.
- Listagem não possui paginação, filtro ou ordenação própria.
- Unicidade transacional e concorrência dependem de armazenamento futuro.

## Pré-requisitos confirmados

- A Sprint 03 foi aprovada e encerrada antes da implementação.
- Este documento foi aprovado explicitamente.
- A implementação da Sprint 04 foi autorizada explicitamente.
- A entrega foi validada, revisada e aprovada.

Não há pendência conhecida que invalide o encerramento da Sprint 04. As limitações registradas permanecem fora do escopo e não autorizam trabalho adicional.
