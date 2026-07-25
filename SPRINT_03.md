# Sprint 03 — Camada de serviços reutilizáveis com TemplateService

**Sprint:** `03 — Camada de serviços reutilizáveis com TemplateService`

**Fase do Roadmap:** `Fase 3 — Serviços reutilizáveis`

**Status:** `rascunho aguardando aprovação`

Este documento propõe o primeiro recorte da camada de serviços reutilizáveis do SaaS Starter Kit. Sua criação não autoriza implementação, alteração de dependências ou configurações, commit, push, publicação ou início de outra Sprint. A implementação somente poderá começar após a resolução dos pré-requisitos e a aprovação explícita do responsável pelo projeto.

# Objetivo

Implementar o primeiro serviço reutilizável do SaaS Starter Kit por meio de um `TemplateService` genérico, responsável pelo ciclo de vida mínimo de templates compostos por identificador, nome e conteúdo de tipo parametrizável. Ao final da Sprint, o serviço deverá oferecer um contrato pequeno e previsível para criar, consultar, listar, atualizar e remover templates, mantendo persistência, interface, autenticação e regras de produtos derivados fora de sua responsabilidade.

O resultado deverá estabelecer apenas a fronteira necessária para esta capacidade, sem criar um catálogo amplo de serviços, uma arquitetura genérica de domínio ou funcionalidades específicas de qualquer SaaS.

# Escopo

- Criar uma área coesa para a capacidade de templates em `lib/templates/`.
- Definir, junto ao `TemplateService`, os tipos públicos mínimos de template, entradas, atualizações e dependência de armazenamento.
- Implementar o `TemplateService` com conteúdo parametrizável, sem pressupor formato, setor, fornecedor ou finalidade de negócio.
- Oferecer somente as operações `create`, `getById`, `list`, `update` e `remove`.
- Receber a dependência de armazenamento por contrato explícito e injeção, sem acessar diretamente banco de dados, sistema de arquivos, rede ou estado global.
- Validar, no limite do serviço, identificadores e nomes obrigatórios e não vazios.
- Distinguir de forma previsível entrada inválida, conflito de identificador, template inexistente e falha da dependência.
- Manter a ordem dos resultados de `list` sob responsabilidade declarada do contrato de armazenamento, sem inventar ordenação de produto.
- Criar testes focados no contrato público, utilizando uma dependência controlada em memória somente dentro do teste.
- Validar neutralidade, comportamento principal, limites, falhas e ausência de efeitos fora do escopo.

A Sprint autoriza somente este primeiro serviço. A expressão “camada de serviços” não autoriza a criação de uma superclasse, contêiner, registro global, fábrica genérica, barrel global ou outros serviços.

# Entregas

## Entrega 1 — Contratos mínimos da capacidade

No mesmo módulo do serviço, deverão ser definidos somente os contratos necessários para:

- representar um template por `id`, `name` e `content`;
- representar as entradas de criação e atualização;
- parametrizar o tipo de `content` sem impor estrutura interna;
- representar a dependência mínima de armazenamento;
- tornar as falhas esperadas identificáveis pelo consumidor sem expor detalhes da dependência.

Não deverão ser incluídos timestamps, proprietário, organização, versão, categoria, status, permissões, variáveis, placeholders ou metadados sem requisito atual.

## Entrega 2 — TemplateService

O `TemplateService` deverá:

- receber sua dependência de armazenamento de forma explícita;
- criar um template quando o identificador ainda não existir;
- consultar um template pelo identificador;
- listar templates conforme o resultado normalizado do contrato de armazenamento;
- atualizar somente `name` e/ou `content` de um template existente;
- remover um template existente;
- rejeitar identificador ou nome composto apenas por espaços;
- rejeitar atualização sem nenhum campo;
- preservar o conteúdo opaco recebido, sem interpretar, renderizar ou transformar sua estrutura;
- traduzir condições esperadas para falhas internas estáveis;
- propagar defeitos inesperados com contexto seguro, preservando sua causa;
- não registrar, persistir ou expor dados além do contrato.

## Entrega 3 — Testes do contrato público

Os testes deverão verificar:

- criação e retorno de um template válido;
- rejeição de identificador e nome vazios;
- rejeição de identificador duplicado;
- consulta de template existente e tratamento de template inexistente;
- listagem sem transformação indevida do conteúdo;
- atualização parcial de nome e de conteúdo;
- rejeição de atualização vazia;
- remoção e comportamento posterior à remoção;
- tradução de falha controlada da dependência;
- uso do mesmo serviço com pelo menos dois formatos de conteúdo sem introduzir campos ou regras específicos de produto.

A dependência em memória utilizada nos testes não fará parte da interface pública nem constituirá um adaptador de produção.

# Fora do Escopo

- Qualquer regra, nome, tipo, conteúdo, fluxo ou integração específica do DocAI.
- Renderização, interpolação, compilação ou execução de templates.
- Definição de sintaxe de placeholders, variáveis, condicionais ou loops.
- Templates de documentos, prompts, e-mails, páginas, PDFs ou qualquer outro formato específico.
- Upload, leitura, geração, processamento, conversão ou exportação de arquivos.
- Persistência real em Supabase, banco de dados, sistema de arquivos, cache ou serviço externo.
- Criação de tabela, schema, migration, seed, política de acesso ou modelo de dados persistente.
- Rotas, APIs, Server Actions, middleware, páginas, formulários ou componentes de interface.
- Integração do serviço com autenticação, dashboard ou qualquer consumidor existente.
- Autorização, propriedade, organizações, multi-tenancy ou isolamento entre usuários.
- Histórico de versões, publicação, duplicação, arquivamento ou restauração de templates.
- Busca, filtro, ordenação definida pelo serviço, paginação ou limites de volume.
- Logs, métricas, auditoria, telemetria, cache, filas, repetição automática ou controle de concorrência distribuída.
- Geração automática de identificadores.
- Validação da estrutura interna de `content`.
- Criação de outros serviços reutilizáveis.
- Criação de classe base, interface comum para todos os serviços, service locator, contêiner de injeção de dependência ou registro global.
- Alteração de dependências, scripts, manifestos, arquivos de lock, configurações ou variáveis de ambiente.
- Refatoração de autenticação ou de qualquer código preexistente.
- Atualização de documentos fora deste arquivo.
- Preparação para Sprints futuras.

# Requisitos

- **REQ-01 — Neutralidade de domínio:** o serviço e seus contratos deverão utilizar somente conceitos genéricos de template, sem incorporar produto, setor, fornecedor ou formato de conteúdo.
- **REQ-02 — Contrato mínimo:** a interface pública deverá conter apenas os dados e as cinco operações autorizadas nesta Sprint.
- **REQ-03 — Conteúdo parametrizável:** o tipo de conteúdo deverá ser definido pelo consumidor e tratado como opaco pelo serviço.
- **REQ-04 — Dependência explícita:** o armazenamento deverá ser representado por contrato pequeno, recebido na construção do serviço e substituível nos testes.
- **REQ-05 — Responsabilidade delimitada:** o serviço deverá coordenar validação, existência e tradução de falhas, sem implementar persistência, apresentação, autenticação ou regra de produto.
- **REQ-06 — Validação previsível:** identificadores, nomes e atualizações inválidas deverão ser rejeitados antes de produzir alteração na dependência.
- **REQ-07 — Falhas estáveis:** entrada inválida, conflito, ausência e falha de armazenamento deverão ser distinguíveis sem revelar mensagens ou estruturas internas da dependência.
- **REQ-08 — Ausência de estado oculto:** o serviço não deverá utilizar singleton, variável global, cache próprio ou armazenamento implícito.
- **REQ-09 — Verificabilidade:** o comportamento público deverá ser exercitado sem rede, credenciais, persistência real ou biblioteca adicional.
- **REQ-10 — Compatibilidade da base:** lint disponível, typecheck, build e testes aplicáveis deverão possuir resultado conhecido, sem alteração de configuração para viabilizá-los.

# Arquivos autorizados para alteração

Após a aprovação explícita desta Sprint, somente os arquivos abaixo poderão ser criados:

| Arquivo | Ação autorizada | Finalidade |
| --- | --- | --- |
| `lib/templates/template-service.ts` | criar | Conter o `TemplateService` e os contratos mínimos diretamente necessários à capacidade. |
| `lib/templates/template-service.test.ts` | criar | Verificar o contrato público com dependência controlada e sem acesso externo. |

Regras adicionais:

- a pasta `lib/templates/` somente poderá existir porque conterá os dois arquivos autorizados;
- tipos, falhas e contratos deverão permanecer no módulo do serviço enquanto não houver uso real que justifique extração;
- nenhum arquivo `index.ts`, adaptador de produção ou arquivo auxiliar está autorizado;
- se a solução exigir qualquer terceiro arquivo, a implementação deverá parar até revisão formal e nova aprovação do escopo.

# Arquivos proibidos

Todo arquivo não listado na seção anterior é proibido por padrão. Em especial, não poderão ser alterados:

- `app/` e todos os seus arquivos e subdiretórios;
- `lib/auth/` e todos os seus arquivos;
- `middleware.ts`;
- `package.json`;
- `package-lock.json`;
- `tsconfig.json`;
- `next.config.ts`;
- `postcss.config.mjs`;
- `next-env.d.ts`;
- `.env.example`, `.env.local` e qualquer arquivo de ambiente;
- `README.md`, `VISION.md`, `PROJECT_PRINCIPLES.md`, `PRODUCT_SPEC.md`, `ARCHITECTURE.md`, `UI_GUIDELINES.md`, `CODE_STYLE.md`, `DEVELOPMENT_WORKFLOW.md`, `AI_RULES.md`, `MASTER_PROMPT.md` e `ROADMAP.md`;
- `SPRINT_01.md`, `SPRINT_02.md`, `TEMPLATE_SPRINT.md`, `TEMPLATE_SERVICE.md` e demais documentos ou templates;
- `.gitignore` e qualquer arquivo dentro de `.git/`;
- artefatos gerados, incluindo `.next/` e `tsconfig.tsbuildinfo`.

`SPRINT_03.md` somente poderá ser revisado antes da aprovação ou mediante mudança de escopo explicitamente solicitada e aprovada. Sua aprovação não autoriza alteração silenciosa durante a implementação.

# Critérios de Aceitação

- **CA-01 — Estrutura mínima (REQ-02, REQ-05):** somente os dois arquivos autorizados são criados, sem barrel, arquivo auxiliar, camada base ou serviço adicional.
- **CA-02 — Contrato do template (REQ-01, REQ-02):** o contrato público representa apenas `id`, `name` e `content`, além das entradas estritamente necessárias às operações aprovadas.
- **CA-03 — Conteúdo genérico (REQ-01, REQ-03):** o mesmo `TemplateService` é verificável com ao menos dois tipos de conteúdo não relacionados, sem conversão ou conhecimento de sua estrutura.
- **CA-04 — Operações autorizadas (REQ-02):** `create`, `getById`, `list`, `update` e `remove` apresentam resultados previsíveis nos caminhos válidos.
- **CA-05 — Dependência substituível (REQ-04, REQ-08):** o serviço recebe um contrato de armazenamento explícito e os testes executam sem rede, credenciais ou recurso externo.
- **CA-06 — Validação de criação (REQ-06):** identificador e nome vazios ou compostos apenas por espaços são rejeitados sem chamar uma operação de escrita da dependência.
- **CA-07 — Validação de atualização (REQ-06):** atualização sem `name` nem `content` é rejeitada sem alterar o template.
- **CA-08 — Conflito (REQ-07):** a criação com identificador existente produz uma falha interna estável e distinguível.
- **CA-09 — Ausência (REQ-07):** consulta, atualização e remoção de identificador inexistente produzem uma falha interna estável e distinguível.
- **CA-10 — Falha de dependência (REQ-07):** falha controlada do armazenamento é contextualizada sem expor detalhes sensíveis nem ser convertida em ausência válida.
- **CA-11 — Preservação de dados (REQ-03, REQ-05):** o conteúdo fornecido é retornado e encaminhado à dependência sem interpretação, renderização ou enriquecimento pelo serviço.
- **CA-12 — Ausência de estado oculto (REQ-08):** não há singleton, variável global, cache interno ou armazenamento de produção incorporado ao serviço.
- **CA-13 — Neutralidade (REQ-01):** nomes, tipos, mensagens e testes não contêm DocAI nem qualquer regra ou vocabulário específico de produto.
- **CA-14 — Sem dependências novas (REQ-09, REQ-10):** nenhum pacote, script, manifesto, lockfile, configuração ou variável de ambiente é criado ou alterado.
- **CA-15 — Qualidade (REQ-09, REQ-10):** teste focado, typecheck e build aplicáveis concluem sem erro impeditivo introduzido pela Sprint; a ausência de lint configurado é declarada.
- **CA-16 — Preservação do escopo:** o diff final contém exclusivamente os dois arquivos autorizados e preserva integralmente as alterações preexistentes.
- **CA-17 — Ausência de antecipação:** nenhum item declarado fora do escopo está presente na implementação.

Na entrega, cada critério deverá receber um dos estados **atendido**, **não atendido**, **pendente** ou **não verificável**, acompanhado da evidência ou justificativa correspondente.

# Checklist Técnico

- [ ] **Lint:** a ausência atual de script de lint foi confirmada e declarada, sem instalação ou configuração de ferramenta.
- [ ] **Typecheck:** executado com o TypeScript já instalado, sem emissão de arquivos.
- [ ] **Build:** executado com o script oficial existente e concluído sem erro impeditivo introduzido pela Sprint.
- [ ] **Testes:** testes do contrato público executados com os recursos já disponíveis no projeto.
- [ ] **Responsividade:** declarada não aplicável, pois a Sprint não altera interface.
- [ ] **Acessibilidade básica:** declarada não aplicável, pois a Sprint não altera interface ou interação.
- [ ] **Segurança:** confirmado que não há segredo, credencial, dado pessoal, acesso externo ou mensagem sensível.
- [ ] **Arquitetura:** confirmadas a responsabilidade única, a dependência explícita e a ausência de acoplamento à apresentação, autenticação ou infraestrutura concreta.
- [ ] **Repositório:** diff completo e estado final revisados contra o estado inicial.

# Critérios de Revisão

Antes de apresentar a Sprint para aceite, deverá ser confirmado:

- alinhamento do resultado com a Fase 3 do roadmap, sem tratar a fase inteira como autorizada;
- compatibilidade com visão, princípios, especificação, arquitetura e estilo de código;
- neutralidade integral em relação a domínio, marca, fornecedor e DocAI;
- existência de uma única responsabilidade predominante;
- contrato público pequeno, explícito e proporcional às cinco operações aprovadas;
- conteúdo parametrizável e opaco;
- direção correta da dependência entre serviço e armazenamento;
- ausência de persistência, integração, estado global e consumidor de interface;
- falhas previsíveis, contextualizadas e sem vazamento de detalhes;
- ausência de tipos, métodos e opções destinados a cenários futuros;
- testes orientados ao comportamento público, sem reproduzir detalhes internos da implementação;
- preservação dos arquivos e comportamentos preexistentes;
- alteração exclusiva dos arquivos autorizados;
- ausência de mudança em dependências, configurações, scripts, manifestos e arquivos de lock;
- registro transparente de falhas, limitações e verificações não executadas.

# Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Iniciar a Fase 3 sem confirmação formal das condições anteriores | Quebra do fluxo incremental e implementação sobre estado documental não aprovado | Exigir, antes da implementação, a resolução do estado da Sprint 02 e a confirmação de prontidão da Fase 2 aplicável ao contexto. |
| Abstração sem consumidor integrado nesta Sprint | Criação de uma fronteira sem reutilização comprovada em produção | Limitar o contrato à necessidade expressamente aprovada, registrar a ausência de integração como limitação e não criar extensões além das cinco operações. |
| Generalização excessiva | Contrato difícil de compreender e manter | Parametrizar somente `content`; manter `id` e `name` como dados mínimos e proibir metadados, opções e métodos futuros. |
| Serviço ser apenas um repasse ao armazenamento | Camada sem responsabilidade real | Manter no serviço somente coordenação de validação, existência e tradução de falhas; revisar se essa fronteira continua justificável antes do aceite. |
| Acoplamento a um mecanismo de persistência | Redução de reutilização e introdução indireta de infraestrutura | Depender exclusivamente de contrato interno explícito e usar armazenamento em memória apenas dentro dos testes. |
| Condições de corrida entre verificação e escrita | Conflitos em armazenamento concorrente podem não ser evitados pelo serviço isolado | Não prometer garantia transacional; exigir que implementações futuras de armazenamento preservem unicidade e traduzam conflito conforme o contrato. |
| Tratamento de erro excessivo ou vago | API pública complexa ou falhas ambíguas | Definir apenas categorias exigidas pelos casos atuais e preservar a causa de defeitos inesperados. |
| Conteúdo sensível nos testes ou mensagens | Exposição indevida no repositório ou em falhas | Utilizar dados fictícios mínimos, não registrar conteúdo e revisar mensagens e diff. |
| Teste acoplado à implementação | Falsa confiança e dificuldade de evolução | Exercitar apenas a interface pública e usar a dependência controlada como colaborador, não como réplica da lógica do serviço. |
| Alteração indireta de artefatos | Arquivos gerados ou configurações entram no diff | Usar comandos sem instalação, registrar o estado inicial e revisar `git status` e o diff após cada validação. |

# Dependências

## Pré-requisitos

- Sprint 01 formalmente encerrada.
- Estado da Sprint 02 reconciliado com a implementação existente e seu encerramento explicitamente aprovado.
- Confirmação explícita de que os resultados necessários da Fase 2 estão satisfeitos no contexto atual ou de que nenhuma capacidade adicional dessa fase é necessária antes deste recorte.
- Aprovação formal deste documento e autorização explícita para iniciar a implementação.
- Confirmação do estado inicial do repositório e preservação de alterações preexistentes.
- Node.js e dependências já instaladas disponíveis no ambiente.
- Confirmação de que os dois arquivos autorizados são suficientes para cumprir o escopo.

Se qualquer pré-requisito permanecer pendente, a implementação deverá permanecer suspensa.

## Dependências técnicas existentes

- TypeScript já configurado no projeto.
- Runtime Node.js já disponível.
- Scripts existentes de build e desenvolvimento, apenas para validação quando aplicável.
- Módulos nativos do Node.js para execução dos testes, sem pacote adicional.

O contrato de armazenamento do `TemplateService` será uma dependência interna definida no próprio módulo. Nenhum adaptador concreto de produção será criado nesta Sprint.

## Novas dependências

**Nenhuma.**

Não estão autorizados novos pacotes, serviços externos, variáveis de ambiente, configurações, scripts, manifestos ou alterações de arquivo de lock.

# Plano de Implementação

1. Confirmar formalmente todos os pré-requisitos e registrar o estado inicial do repositório.
2. Inspecionar novamente os padrões existentes aplicáveis sem modificar arquivos fora da lista autorizada.
3. Criar `lib/templates/template-service.ts` com os contratos mínimos e o `TemplateService`.
4. Criar `lib/templates/template-service.test.ts` com a dependência controlada e os casos aprovados.
5. Executar os testes focados e corrigir somente problemas contidos nos dois arquivos autorizados.
6. Executar typecheck e build com os recursos existentes.
7. Revisar o diff completo quanto a escopo, neutralidade, arquitetura, segurança e simplicidade.
8. Comparar o estado final com o inicial e preparar o relatório para revisão.

O plano não autoriza qualquer arquivo ou comportamento adicional. Se uma etapa exigir expansão, a implementação deverá parar e a necessidade deverá ser submetida a revisão.

# Plano de Validação

| Item | Método de validação | Evidência esperada |
| --- | --- | --- |
| REQ-01 / CA-03 / CA-13 | Revisão dos contratos, nomes e testes; busca textual por termos específicos de produto | Conteúdo parametrizável e nenhuma referência a DocAI ou outro domínio. |
| REQ-02 / CA-02 / CA-04 | Inspeção da interface pública e execução dos testes | Apenas dados mínimos e as cinco operações autorizadas. |
| REQ-03 / CA-03 / CA-11 | Testes com dois formatos distintos de conteúdo | Conteúdos preservados sem interpretação ou transformação. |
| REQ-04 / CA-05 | Inspeção de dependências e execução com colaborador em memória no teste | Serviço executado sem rede, credenciais ou persistência real. |
| REQ-05 / CA-01 / CA-12 | Revisão arquitetural do módulo e do diff | Responsabilidade delimitada, sem estado oculto ou estrutura adicional. |
| REQ-06 / CA-06 / CA-07 | Testes de entradas inválidas com verificação de ausência de escrita | Falha previsível antes de qualquer mutação da dependência. |
| REQ-07 / CA-08 / CA-09 / CA-10 | Testes de conflito, ausência e falha controlada do armazenamento | Categorias internas distinguíveis e causa preservada quando aplicável. |
| REQ-09 / CA-15 | Execução do teste focado com recursos existentes | Todos os casos aprovados concluídos sem acesso externo. |
| REQ-10 / CA-14 / CA-15 | Typecheck, build e inspeção de `package.json` e `package-lock.json` | Verificações com resultado conhecido e dependências inalteradas. |
| CA-16 / CA-17 | Comparação de `git status`, diff completo e lista de arquivos com o estado inicial | Somente os dois arquivos autorizados afetados e nenhum item fora do escopo. |

Sequência mínima de validação:

1. registrar `git status --short` antes da implementação;
2. executar o teste focado com o runtime já disponível;
3. executar o TypeScript em modo de verificação, sem emitir arquivos;
4. executar `npm run build`;
5. declarar lint indisponível enquanto não existir script oficial;
6. revisar os dois arquivos criados e o diff completo;
7. confirmar que `package.json`, `package-lock.json`, configurações, documentos e código preexistente não mudaram;
8. procurar referências a DocAI e a funcionalidades fora do escopo;
9. atribuir status e evidência a cada critério de aceitação;
10. registrar qualquer falha, limitação ou verificação não executada.

Não deverá ser executado comando que instale, atualize ou remova dependências. Artefatos produzidos pelo build não poderão ser incluídos na entrega.

# Critérios de Conclusão

A Sprint poderá ser considerada **tecnicamente concluída e aguardando aprovação** somente quando:

- todos os pré-requisitos tiverem sido formalmente atendidos;
- as três entregas aprovadas estiverem completas;
- cada requisito estiver relacionado a evidência verificável;
- todos os critérios de aceitação possuírem status e evidência;
- os testes focados tiverem sido executados com sucesso;
- typecheck e build tiverem sido executados sem erro impeditivo introduzido pela Sprint;
- a ausência de lint oficial tiver sido declarada, caso permaneça;
- responsividade e acessibilidade tiverem sido declaradas não aplicáveis;
- a revisão arquitetural confirmar responsabilidade única, neutralidade e direção correta das dependências;
- não existir erro conhecido que invalide o contrato ou seu comportamento;
- somente os dois arquivos autorizados tiverem sido criados;
- nenhuma dependência, configuração, variável de ambiente, script, manifesto ou arquivo de lock tiver sido alterado;
- o diff e o estado final do repositório tiverem sido revisados;
- riscos, limitações, falhas e pendências tiverem sido registrados;
- todos os arquivos afetados, comandos e resultados tiverem sido apresentados ao responsável pelo projeto.

Conclusão técnica não encerra a Sprint. O encerramento depende de revisão e aprovação explícita do responsável pelo projeto. A conclusão também não autoriza commit, push, publicação, integração do serviço, outro serviço ou Sprint posterior.

# Entrega Esperada

Ao concluir tecnicamente a Sprint, a entrega deverá conter:

- `TemplateService` genérico disponível para revisão;
- contratos mínimos de template e armazenamento no mesmo módulo;
- testes do contrato público executáveis sem recurso externo;
- lista completa dos arquivos criados;
- resumo da finalidade de cada alteração;
- comandos executados e seus resultados;
- resultados de testes, typecheck, build e inspeções aplicáveis;
- declaração justificada das verificações não aplicáveis ou indisponíveis;
- status e evidência individual de cada critério de aceitação;
- riscos, limitações, falhas e pendências;
- confirmação de que não houve referência a DocAI ou regra específica de produto;
- confirmação de que dependências, configurações, scripts, manifestos e arquivos de lock permaneceram inalterados;
- confirmação de que somente os arquivos autorizados foram afetados.

O estado esperado após a entrega é **Sprint 03 tecnicamente concluída e aguardando aprovação**.

# Commit Esperado

**Mensagem proposta:** `feat: add reusable template service`

**Arquivos previstos:**

- `lib/templates/template-service.ts`
- `lib/templates/template-service.test.ts`

A mensagem proposta não autoriza commit, push, Pull Request ou publicação. Essas operações dependem de solicitação explícita no momento apropriado.

# Observações

## Decisões registradas neste rascunho

- `content` será o único ponto parametrizável do contrato.
- O serviço tratará conteúdo como dado opaco.
- A persistência será representada por contrato interno, sem adaptador de produção.
- A dependência em memória existirá somente no teste.
- O serviço não será integrado a autenticação, rotas ou interface nesta Sprint.
- A ordenação da listagem não será definida como regra do serviço.

## Limitações conhecidas

- Esta Sprint não demonstra reutilização em consumidores de produção; ela responde à necessidade expressamente aprovada de estabelecer a primeira fronteira de serviço.
- Sem adaptador concreto, o serviço não persiste dados por conta própria e não está pronto para uso operacional isolado.
- Garantias transacionais, concorrência e unicidade definitiva dependem de um armazenamento futuro, que permanece fora do escopo.
- A Sprint não define semântica para o conteúdo nem valida sua estrutura.

## Pendências anteriores à implementação

- Reconciliar o status documental da Sprint 02 com o estado já presente no repositório.
- Confirmar formalmente a condição necessária da Fase 2 antes de iniciar a Fase 3.
- Obter aprovação explícita deste documento e autorização para implementar.

Nenhuma dessas pendências autoriza alteração em outro arquivo durante a preparação desta Sprint.
