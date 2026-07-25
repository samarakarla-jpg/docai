# Sprint 05 — Persistência reutilizável e independente de banco

**Sprint:** `05 — Persistência reutilizável e independente de banco`

**Fase do Roadmap:** `Fase 3 — Serviços reutilizáveis`

**Status:** `encerrada`

Este documento definiu o recorte de persistência reutilizável da Sprint 05. A implementação foi concluída, validada e registrada no commit `bc7ca07d2ca2d8622380dc1d8a8177b1eb5802e1`. O plano aprovado é preservado abaixo como registro dos limites aplicados durante a execução. O encerramento desta Sprint não autoriza alteração de dependências ou configurações, nova implementação, commit, push, publicação ou início da Sprint 06.

# Objetivo

Implementar uma camada mínima de persistência reutilizável e independente de banco de dados, extraída das operações de armazenamento já comprovadas por `TemplateService` e `DocumentService`. Ao final da Sprint, a base deverá oferecer uma interface genérica de repositório, uma implementação não durável em memória para testes e desenvolvimento e uma suíte reutilizável de testes de contrato, preservando os comportamentos públicos dos serviços existentes e permitindo que adaptadores futuros, inclusive para Supabase, sejam adicionados sem acoplamento do núcleo ao fornecedor.

O resultado deverá consolidar somente o padrão real compartilhado entre as Sprints 03 e 04. A camada não deverá absorver validações de negócio, criar uma abstração universal de domínio nem oferecer persistência de produção.

# Escopo

- Criar uma área coesa para a capacidade de persistência em `lib/persistence/`.
- Definir uma interface genérica `Repository<TEntity, TIdentifier>` com identificador e entidade parametrizáveis.
- Limitar o contrato às operações `create`, `findById`, `list`, `update` e `remove`, equivalentes às necessidades já presentes nos dois serviços.
- Definir resultados e falhas previsíveis para criação duplicada, consulta ausente, atualização ausente, exclusão ausente e falha de armazenamento.
- Representar ausência em `findById` por `null`, preservando a semântica já utilizada pelos serviços.
- Manter ordenação de produto fora do repositório genérico; cada implementação deverá devolver uma sequência previsível segundo seu próprio contrato documentado.
- Criar uma implementação `InMemoryRepository` genérica, isolada por instância e não durável, destinada exclusivamente a testes e desenvolvimento local.
- Receber explicitamente a função responsável por obter o identificador de cada entidade, sem exigir campo, classe base ou formato específico.
- Preservar entidades como dados opacos, sem validar, enriquecer ou transformar seu conteúdo.
- Manter a injeção de dependência nos construtores de `TemplateService` e `DocumentService`.
- Fazer `TemplateStorage` e `DocumentStorage` permanecerem como nomes públicos compatíveis sobre a fronteira genérica, sem criar dependência direta entre os serviços.
- Criar uma suíte reutilizável de testes de contrato baseada em uma fábrica de repositório vazio.
- Aplicar a suíte de contrato à implementação em memória.
- Executar os testes preexistentes de `TemplateService` e `DocumentService` como regressão, sem alterar seus comportamentos aprovados.
- Validar neutralidade, substituição, isolamento de estado, erros, ausência de fornecedor e preservação do escopo.

A expressão “camada de persistência” autoriza somente contratos internos, implementação em memória e sua adoção tipada pelos dois serviços existentes. Ela não autoriza banco real, adaptador externo, modelagem de produto ou integração com interface.

# Entregas

## Entrega 1 — Contrato genérico de repositório

O módulo do contrato deverá definir somente:

- a interface `Repository<TEntity, TIdentifier>`;
- as cinco operações autorizadas;
- o tipo `RepositoryErrorCode`, limitado a `CONFLICT`, `NOT_FOUND` e `STORAGE_FAILURE`;
- um `RepositoryError` com código identificável, mensagem interna segura e causa preservável;
- as regras observáveis que qualquer implementação substituível deverá cumprir.

O contrato deverá estabelecer:

- `create` recebe uma entidade completa, cria quando o identificador não existe e distingue conflito;
- `findById` recebe um identificador e retorna a entidade ou `null` quando ela não existe;
- `list` retorna uma coleção somente para leitura sem interpretar as entidades;
- `update` recebe uma entidade completa, substitui a representação existente e distingue ausência;
- `remove` recebe um identificador, remove a entidade existente e distingue ausência;
- falhas inesperadas de infraestrutura são traduzidas por adaptadores futuros para uma categoria interna estável, com causa preservada e sem mensagem sensível exposta.

O repositório não deverá validar título, nome, conteúdo ou qualquer campo de produto. Preparação de entidade, validação de entrada e decisões de fluxo continuarão nos serviços consumidores.

## Entrega 2 — Implementação em memória

`InMemoryRepository` deverá:

- implementar integralmente o contrato genérico;
- receber a função de extração do identificador de forma explícita;
- manter o estado privado e restrito à própria instância;
- iniciar vazio e não utilizar singleton, variável global, cache compartilhado ou recurso externo;
- preservar entidades sem transformação;
- rejeitar criação duplicada sem sobrescrever o valor existente;
- rejeitar atualização e exclusão de identificador inexistente;
- devolver `null` em consulta inexistente;
- manter listagem determinística por ordem de inserção, sem declarar essa ordem como regra de produto;
- manter a posição de uma entidade quando ela for atualizada;
- funcionar sem configuração, segredo, rede, sistema de arquivos ou banco;
- ser documentado como não durável e inadequado para produção.

O uso em desenvolvimento deverá ser explícito e local ao processo. Reinício, nova instância ou encerramento do processo poderão perder todos os dados, sem promessa de recuperação.

## Entrega 3 — Compatibilidade dos serviços existentes

`TemplateService` e `DocumentService` deverão:

- continuar recebendo sua dependência por construtor;
- depender da interface genérica sem conhecer implementação concreta;
- preservar os nomes públicos `TemplateStorage` e `DocumentStorage` por alias ou contrato compatível;
- manter as cinco operações públicas já aprovadas;
- manter validações, conteúdo opaco e categorias de erro próprias;
- continuar traduzindo falhas da dependência para seus contratos públicos sem expor detalhes internos;
- não importar um ao outro;
- não receber `InMemoryRepository` por padrão nem criar armazenamento implicitamente.

Nenhum consumidor existente deverá ser obrigado a utilizar a implementação em memória. Repositórios controlados dos testes preexistentes deverão continuar válidos estruturalmente.

## Entrega 4 — Testes de contrato e regressão

Deverá existir um suporte de teste reutilizável que:

- receba uma fábrica capaz de produzir repositório vazio e independente para cada caso;
- exercite somente a interface pública do repositório;
- possa ser reutilizado futuramente por outro adaptador sem conhecer sua implementação interna;
- não realize rede, acesso externo, leitura de ambiente ou persistência em disco;
- utilize dados fictícios e neutros.

A suíte aplicada ao repositório em memória deverá cobrir criação, leitura, listagem, atualização, exclusão, conflito, ausência, isolamento de instâncias, preservação de dados e funcionamento com mais de um formato de entidade ou identificador.

Os testes de `TemplateService` e `DocumentService` deverão ser executados integralmente como regressão. Seus arquivos não poderão ser modificados nesta Sprint.

# Fora do Escopo

- Implementação real de `SupabaseRepository` ou qualquer adaptador Supabase.
- Import de `@supabase/ssr`, `@supabase/supabase-js` ou tipo proprietário na camada de persistência.
- Integração com PostgreSQL, SQL, NoSQL, ORM, sistema de arquivos, cache ou serviço externo.
- Banco de dados específico de produto.
- Tabelas, schemas, migrations, seeds, queries, índices, políticas de acesso ou Row Level Security.
- Credenciais, chaves, conexão, pool, cliente de banco ou variável de ambiente.
- Persistência durável, replicação, backup, recuperação, sincronização ou transação distribuída.
- Unit of Work, Active Record, Data Mapper amplo, query builder, service locator ou contêiner de injeção.
- Paginação, busca, filtro, ordenação de produto ou consulta dinâmica.
- Geração automática de identificadores.
- Serialização, validação ou transformação da estrutura das entidades.
- Autorização, propriedade, organizações, multi-tenancy ou isolamento entre usuários.
- Alteração de autenticação, Supabase Auth, sessão, middleware ou dashboard.
- Interface visual, página, rota, API, Server Action, formulário ou componente.
- Inteligência artificial, agentes, prompts, embeddings ou geração de conteúdo.
- Pagamentos, assinaturas, faturamento, planos ou Stripe.
- Criação, leitura, conversão, renderização ou exportação de PDF.
- Envio de e-mail, notificação ou fila.
- Armazenamento externo de arquivos ou objetos, upload e download.
- Qualquer funcionalidade, regra, nome, tipo, dado ou fluxo específico do DocAI.
- Integração de templates ou documentos com interface ou consumidor de produção.
- Alteração das operações públicas ou dos modelos `Template` e `Document`.
- Criação de classe base para serviços ou repositório especializado por produto.
- Instalação, remoção ou atualização de dependências.
- Alteração de scripts, manifestos, lockfiles, configurações ou arquivos de ambiente.
- Atualização de documentação fora deste arquivo.
- Preparação de código para as Sprints 06 ou 07.

# Requisitos

- **REQ-01 — Neutralidade de domínio:** contratos, implementação e testes deverão utilizar somente conceitos genéricos de entidade, identificador e repositório.
- **REQ-02 — Contrato mínimo:** `Repository<TEntity, TIdentifier>` deverá expor somente `create`, `findById`, `list`, `update` e `remove`.
- **REQ-03 — Tipagem genérica:** entidade e identificador deverão ser parametrizáveis sem exigir herança, campo fixo ou metadado específico.
- **REQ-04 — Identidade explícita:** a implementação em memória deverá receber explicitamente a estratégia para obter o identificador de uma entidade.
- **REQ-05 — Operações previsíveis:** criação, consulta, listagem, atualização e exclusão deverão possuir resultados inequívocos e documentados.
- **REQ-06 — Erros estáveis:** conflito, ausência e falha de armazenamento deverão possuir categorias internas distinguíveis, mensagens seguras e causa preservada quando aplicável.
- **REQ-07 — Implementação em memória:** deverá existir um repositório não durável, isolado por instância e utilizável em testes ou desenvolvimento sem recurso externo.
- **REQ-08 — Ausência de estado oculto:** nenhum repositório deverá ser criado implicitamente pelos serviços nem usar singleton, variável global ou armazenamento compartilhado não declarado.
- **REQ-09 — Injeção de dependência:** serviços consumidores deverão continuar recebendo o repositório de forma explícita pelo construtor.
- **REQ-10 — Compatibilidade pública:** `TemplateStorage`, `DocumentStorage`, operações, validações, modelos e erros públicos das Sprints 03 e 04 deverão permanecer compatíveis.
- **REQ-11 — Independência entre capacidades:** `TemplateService` e `DocumentService` não deverão importar um ao outro nem compartilhar regras além do contrato genérico de persistência.
- **REQ-12 — Substituição futura:** um adaptador futuro deverá poder implementar o contrato sem modificar serviços consumidores ou expor tipos de fornecedor.
- **REQ-13 — Teste de contrato reutilizável:** a mesma suíte comportamental deverá aceitar uma fábrica de repositório e verificar qualquer implementação compatível.
- **REQ-14 — Regressão:** todos os testes preexistentes de templates e documentos deverão continuar aprovados sem modificação.
- **REQ-15 — Preservação de dados:** o repositório deverá armazenar e retornar entidades sem interpretar, enriquecer ou validar seus campos internos.
- **REQ-16 — Ausência de integração:** a camada não deverá acessar Supabase, banco, rede, ambiente, autenticação, interface ou armazenamento externo.
- **REQ-17 — Dependências controladas:** a Sprint deverá utilizar somente TypeScript, runtime e módulos nativos já disponíveis.
- **REQ-18 — Compatibilidade da base:** testes aplicáveis, typecheck e build deverão possuir resultado conhecido sem mudança de configuração.

# Arquivos autorizados para alteração

Após a aprovação explícita desta Sprint, somente os arquivos abaixo poderão ser criados ou modificados durante a implementação:

| Arquivo | Ação autorizada | Finalidade |
| --- | --- | --- |
| `lib/persistence/repository.ts` | criar | Definir a interface genérica e os erros estáveis do repositório. |
| `lib/persistence/in-memory-repository.ts` | criar | Implementar o repositório não durável para testes e desenvolvimento. |
| `lib/persistence/repository-contract.test-support.ts` | criar | Exportar a suíte reutilizável de testes de contrato sem registrar casos automaticamente. |
| `lib/persistence/in-memory-repository.test.ts` | criar | Aplicar o contrato ao repositório em memória e verificar comportamentos próprios. |
| `lib/templates/template-service.ts` | modificar | Fazer `TemplateStorage` depender de forma compatível do contrato genérico. |
| `lib/documents/document-service.ts` | modificar | Fazer `DocumentStorage` depender de forma compatível do contrato genérico. |

Regras adicionais:

- a pasta `lib/persistence/` somente poderá existir porque conterá os quatro arquivos autorizados;
- `repository-contract.test-support.ts` será suporte exclusivo de teste e não poderá ser importado por código de produção;
- nenhum `index.ts`, barrel, adaptador externo ou arquivo auxiliar adicional está autorizado;
- os arquivos de teste dos serviços existentes deverão permanecer inalterados e ser executados como regressão;
- se a solução exigir qualquer sétimo arquivo, a implementação deverá parar até revisão formal e nova aprovação.

# Arquivos proibidos

Todo arquivo não listado na seção anterior é proibido por padrão. Em especial, não poderão ser alterados:

- `app/`, `public/` e todos os seus arquivos e subdiretórios;
- `lib/auth/` e todos os seus arquivos;
- `lib/templates/template-service.test.ts`;
- `lib/documents/document-service.test.ts`;
- qualquer arquivo ou pasta de adaptador Supabase;
- `middleware.ts`;
- `.env.example`, `.env.local` e qualquer arquivo de ambiente;
- `package.json`;
- `package-lock.json`;
- `tsconfig.json`;
- `next.config.ts`;
- `postcss.config.mjs`;
- `next-env.d.ts`;
- `README.md`, `PROJECT_STATE.md`, `VISION.md`, `PROJECT_PRINCIPLES.md`, `PRODUCT_SPEC.md`, `ARCHITECTURE.md`, `UI_GUIDELINES.md`, `CODE_STYLE.md`, `DEVELOPMENT_WORKFLOW.md`, `AI_RULES.md`, `MASTER_PROMPT.md` e `ROADMAP.md`;
- `SPRINT_01.md`, `SPRINT_02.md`, `SPRINT_03.md`, `SPRINT_04.md`, `TEMPLATE_SPRINT.md`, `TEMPLATE_SERVICE.md` e demais documentos ou templates;
- `.gitignore` e qualquer arquivo dentro de `.git/`;
- artefatos gerados, incluindo `.next/` e `tsconfig.tsbuildinfo`.

`SPRINT_05.md` somente poderá ser revisado antes da aprovação ou por mudança de escopo explicitamente solicitada e aprovada. Sua aprovação não autoriza alteração silenciosa durante a implementação.

# Dependências

## Pré-requisitos

- Sprints 03 e 04 formalmente encerradas.
- `TemplateService` e `DocumentService` presentes, testados e disponíveis como consumidores reais do padrão de armazenamento.
- Planejamento das Sprints 05 a 07 aprovado em `ROADMAP.md` e refletido em `PROJECT_STATE.md`.
- Aprovação formal deste documento.
- Autorização explícita para iniciar a implementação.
- Estado inicial do repositório limpo ou com alterações preexistentes identificadas.
- Confirmação de compatibilidade pública dos aliases `TemplateStorage` e `DocumentStorage`.
- Node.js, TypeScript e dependências existentes disponíveis no ambiente.
- Confirmação de que os seis arquivos autorizados são suficientes.

Se qualquer pré-requisito permanecer pendente, a implementação deverá permanecer suspensa.

## Dependências técnicas existentes

- TypeScript já configurado no projeto.
- Runtime Node.js e módulos nativos de teste já disponíveis.
- `TemplateService`, `DocumentService` e seus testes preexistentes.
- Scripts oficiais existentes de build e desenvolvimento, somente para validação quando aplicável.
- Contratos de armazenamento equivalentes demonstrados nas Sprints 03 e 04.

## Novas dependências

**Nenhuma.**

Não estão autorizados pacotes, serviços externos, variáveis de ambiente, configurações, scripts, manifestos ou alterações de arquivo de lock.

# Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Abstração genérica excessiva | Contrato amplo pode esconder diferenças legítimas e se tornar difícil de manter | Extrair somente as cinco operações idênticas já demonstradas e proibir consultas, opções e capacidades futuras. |
| Incompatibilidade com contratos existentes | Consumidores estruturais ou testes podem deixar de compilar | Preservar `TemplateStorage` e `DocumentStorage` como aliases ou contratos compatíveis e executar regressão integral. |
| Mistura entre regra de serviço e persistência | Validações, conflito de negócio ou transformação podem migrar para a camada errada | Manter preparação, validação e coordenação nos serviços; o repositório opera sobre entidades completas. |
| Semântica de erro divergente | Erros do repositório podem alterar categorias públicas dos serviços | Definir categorias internas estáveis e preservar a tradução já observada pelos serviços. |
| Implementação em memória usada em produção | Perda total de dados no reinício ou em múltiplos processos | Documentar uso exclusivo em testes/desenvolvimento, ausência de durabilidade e exigir injeção explícita. |
| Vazamento de estado entre instâncias ou testes | Resultados não determinísticos e isolamento incorreto | Armazenar estado apenas na instância e criar repositório novo para cada teste de contrato. |
| Mutação externa de entidades | Alterações fora do repositório podem produzir comportamento implícito | Não prometer clonagem genérica; documentar que consumidores devem tratar entidades como valores e testar igualdade estrutural, não identidade de referência. |
| Ordenação interpretada como regra de produto | Adaptadores futuros podem divergir ou depender de detalhe do `Map` | Limitar a ordem de inserção ao adaptador em memória e manter ordenação de produto fora do contrato genérico. |
| Acoplamento indireto ao Supabase | Tipos ou nomes do fornecedor contaminam o núcleo | Proibir imports, clientes, configurações e tipos Supabase na camada; adaptador futuro deverá depender do contrato interno. |
| Condições de corrida em adaptadores futuros | Verificação seguida de escrita pode não garantir unicidade | Não prometer transação; exigir que cada adaptador traduza conflitos atômicos para o erro estável do repositório. |
| Suíte de contrato acoplada à implementação | Outros adaptadores não conseguem reutilizar os mesmos testes | Basear a suíte somente na fábrica e na interface pública, sem acessar mapa, propriedade privada ou classe concreta. |
| Alteração indireta de arquivos proibidos | Build ou ferramenta pode gerar artefatos ou modificar configuração | Usar comandos existentes, registrar o estado inicial e revisar status e diff após cada validação. |

# Plano de Implementação

1. Confirmar os pré-requisitos, registrar o estado inicial do repositório e inspecionar novamente os contratos públicos atuais.
2. Comparar `TemplateStorage` e `DocumentStorage` e registrar somente as cinco operações realmente compartilhadas.
3. Criar `lib/persistence/repository.ts` com interface genérica, semântica mínima e erros estáveis.
4. Criar `lib/persistence/in-memory-repository.ts` com estado por instância e identificador obtido por dependência explícita.
5. Criar o suporte reutilizável de testes de contrato baseado em fábrica.
6. Criar o teste do repositório em memória e aplicar integralmente a suíte de contrato.
7. Modificar `TemplateStorage` para depender de forma compatível do repositório genérico, sem alterar `TemplateService` além do necessário.
8. Modificar `DocumentStorage` da mesma forma, sem importar contratos do serviço de templates.
9. Executar os testes de persistência e a regressão integral dos dois serviços.
10. Executar typecheck e build com os recursos existentes.
11. Revisar o diff quanto a contrato público, direção de dependências, neutralidade, segurança, simplicidade e escopo.
12. Comparar o estado final com o inicial e preparar o relatório para revisão.

O plano não amplia a autorização. Se uma etapa exigir outro arquivo, dependência, configuração, adaptador, mudança pública incompatível ou decisão não aprovada, o trabalho deverá parar e solicitar revisão formal.

# Plano de Testes

## Testes de contrato do repositório

| Caso | Comportamento verificado | Evidência esperada |
| --- | --- | --- |
| Repositório vazio | `findById` retorna `null` e `list` retorna coleção vazia | Ausência válida sem erro ou valor ambíguo. |
| Criação | Entidade nova pode ser criada, consultada e listada | Igualdade estrutural dos dados sem transformação. |
| Conflito | Segundo `create` com o mesmo identificador falha | Código `CONFLICT` e entidade original preservada. |
| Atualização | Entidade completa existente é substituída | Consulta posterior retorna os novos dados. |
| Atualização ausente | `update` de identificador inexistente falha | Código `NOT_FOUND` e nenhuma entidade criada. |
| Exclusão | Entidade existente é removida | Consulta posterior retorna `null`. |
| Exclusão ausente | `remove` de identificador inexistente falha | Código `NOT_FOUND` sem efeito colateral. |
| Listagem | Todas as entidades armazenadas são retornadas | Nenhum campo interpretado, acrescentado ou removido. |
| Isolamento | Duas instâncias não compartilham estado | Dados criados em uma instância não aparecem na outra. |
| Genericidade | Entidades e identificadores de formatos distintos são aceitos | Nenhuma exigência de domínio, classe base ou campo fixo. |
| Ordem em memória | Inserções são listadas deterministicamente e atualização não reposiciona | Comportamento específico do adaptador em memória documentado. |
| Mensagens seguras | Erros não incluem conteúdo integral da entidade | Código estável sem exposição de dados de teste. |

## Regressão dos serviços

- Executar todos os testes preexistentes de `TemplateService` sem modificar o arquivo de teste.
- Executar todos os testes preexistentes de `DocumentService` sem modificar o arquivo de teste.
- Confirmar criação, leitura, listagem, atualização, exclusão, validação, conflito, ausência e falha da dependência.
- Confirmar que conteúdos parametrizáveis continuam opacos.
- Confirmar que dependências controladas existentes continuam compatíveis estruturalmente.

## Validações complementares

| Item | Método de validação | Evidência esperada |
| --- | --- | --- |
| REQ-01 / REQ-03 / CA-02 | Revisão de nomes, tipos e dados de teste | Contrato neutro e parametrizável. |
| REQ-02 / REQ-05 / CA-03 | Inspeção da interface pública e execução da suíte | Somente as cinco operações e suas semânticas aprovadas. |
| REQ-06 / CA-05 | Testes de conflito, ausência e mensagem segura | Categorias distinguíveis e sem vazamento de conteúdo. |
| REQ-07 / REQ-08 / CA-06 | Testes de isolamento e inspeção de estado | Nenhum singleton, global ou recurso externo. |
| REQ-09 / REQ-10 / CA-09 | Typecheck, inspeção de construtores e regressão | Injeção explícita e compatibilidade pública preservadas. |
| REQ-12 / CA-10 | Busca de imports e revisão de direção de dependências | Núcleo sem Supabase e contrato implementável por adaptador futuro. |
| REQ-13 / CA-07 | Aplicação da suíte por fábrica | Suporte de teste não depende da classe concreta. |
| REQ-14 / CA-11 | Execução dos testes dos serviços | Todos os testes preexistentes aprovados e inalterados. |
| REQ-16 / CA-14 | Busca por termos, imports e APIs proibidas | Nenhuma integração, autenticação ou funcionalidade excluída. |
| REQ-17 / REQ-18 / CA-15 | Inspeção de manifestos, typecheck e build | Nenhuma dependência/configuração alterada e base válida. |
| CA-16 / CA-17 | Comparação de status, diff e lista autorizada | Somente os seis arquivos autorizados e nenhuma antecipação. |

Sequência mínima de validação:

1. registrar `git status --short` antes da implementação;
2. executar `node --test lib/persistence/in-memory-repository.test.ts lib/templates/template-service.test.ts lib/documents/document-service.test.ts`;
3. executar `./node_modules/.bin/tsc --noEmit`;
4. executar `npm run build`;
5. executar lint somente se houver script oficial; caso contrário, declarar sua indisponibilidade;
6. declarar responsividade e acessibilidade não aplicáveis, pois a Sprint não altera interface;
7. revisar integralmente os seis arquivos autorizados e o diff completo;
8. confirmar que os testes preexistentes e todos os arquivos proibidos permaneceram inalterados;
9. confirmar que `package.json`, `package-lock.json`, configurações e arquivos de ambiente não mudaram;
10. procurar referências a Supabase, banco específico, autenticação, DocAI, IA, pagamentos, PDF, e-mail, interface e armazenamento externo na nova camada;
11. atribuir status e evidência a cada critério de aceitação;
12. registrar falhas, limitações e verificações não executadas;
13. comparar o estado final com o inicial.

Nenhum comando poderá instalar, remover ou atualizar dependências. Artefatos gerados pelo build não poderão integrar a entrega.

# Critérios de Aceitação

- **CA-01 — Estrutura delimitada (REQ-01, REQ-17):** somente os quatro arquivos de persistência são criados e somente os dois módulos de serviço são modificados, sem barrel, adaptador ou arquivo auxiliar adicional.
- **CA-02 — Contrato genérico (REQ-01, REQ-03):** entidade e identificador são parametrizáveis sem herança, campo fixo, formato de banco ou dado de produto.
- **CA-03 — Operações autorizadas (REQ-02, REQ-05):** o contrato expõe exclusivamente `create`, `findById`, `list`, `update` e `remove` com semântica inequívoca.
- **CA-04 — Ausência válida (REQ-05):** `findById` retorna entidade existente ou `null`, sem converter ausência em falha de infraestrutura.
- **CA-05 — Erros previsíveis (REQ-06):** conflito, ausência de mutação e falha de armazenamento possuem códigos distinguíveis, mensagens seguras e causa preservável.
- **CA-06 — Repositório em memória (REQ-04, REQ-07, REQ-08):** a implementação funciona sem recurso externo, usa identificador injetado, não é durável e isola o estado por instância.
- **CA-07 — Teste de contrato reutilizável (REQ-13):** a suíte recebe uma fábrica e exercita somente a interface pública, sem acessar detalhes da implementação em memória.
- **CA-08 — Comportamento completo (REQ-05, REQ-13):** criação, leitura, listagem, atualização, exclusão, conflito, ausência, isolamento e genericidade possuem testes aprovados.
- **CA-09 — Injeção explícita (REQ-08, REQ-09):** nenhum serviço cria repositório internamente ou utiliza singleton, estado global ou implementação padrão oculta.
- **CA-10 — Substituição e Supabase futuro (REQ-12, REQ-16):** o contrato pode ser implementado por adaptador futuro sem mudança nos consumidores e não contém import, tipo, configuração ou nome de fornecedor.
- **CA-11 — Regressão de TemplateService (REQ-10, REQ-11, REQ-14):** todos os testes preexistentes de templates passam sem alteração do arquivo de teste ou do comportamento público.
- **CA-12 — Regressão de DocumentService (REQ-10, REQ-11, REQ-14):** todos os testes preexistentes de documentos passam sem alteração do arquivo de teste ou do comportamento público.
- **CA-13 — Preservação dos serviços (REQ-10, REQ-15):** modelos, operações, validações, conteúdo opaco e categorias públicas de erro permanecem compatíveis.
- **CA-14 — Neutralidade e exclusões (REQ-01, REQ-16):** não existem dados de produto, DocAI, autenticação, interface, IA, pagamentos, PDF, e-mail, armazenamento externo ou banco específico.
- **CA-15 — Sem dependências ou configurações novas (REQ-17, REQ-18):** nenhum pacote, script, manifesto, lockfile, configuração ou variável de ambiente é criado ou alterado.
- **CA-16 — Qualidade (REQ-13, REQ-14, REQ-18):** testes de contrato, regressões, typecheck e build concluem sem erro impeditivo; a ausência de lint oficial é declarada.
- **CA-17 — Preservação do escopo:** o diff final contém exclusivamente os seis arquivos autorizados e preserva alterações preexistentes.
- **CA-18 — Ausência de antecipação:** nenhum adaptador real, funcionalidade da Sprint 06 ou integração da Sprint 07 está presente.

Na entrega, cada critério deverá receber o estado **atendido**, **não atendido**, **pendente** ou **não verificável**, acompanhado da respectiva evidência ou justificativa.

# Checklist Técnico

- [x] **Lint:** ausência de script oficial declarada, sem instalação ou configuração.
- [x] **Typecheck:** executado com o TypeScript existente, sem emissão de arquivos.
- [x] **Build:** executado com o script oficial existente.
- [x] **Testes de contrato:** executados para o repositório em memória com fábrica isolada.
- [x] **Regressão:** testes de `TemplateService` e `DocumentService` executados integralmente e sem alteração.
- [x] **Responsividade:** declarada não aplicável, pois não houve alteração de interface.
- [x] **Acessibilidade básica:** declarada não aplicável, pois não houve alteração de interface ou interação.
- [x] **Segurança:** confirmada a ausência de segredo, credencial, dado pessoal, acesso externo e mensagem sensível.
- [x] **Arquitetura:** confirmadas direção das dependências, injeção explícita, substituição e separação de responsabilidades.
- [x] **Repositório Git:** diff completo e estado final revisados contra o estado inicial.

# Critérios de Revisão

Antes de apresentar a Sprint para aceite, deverá ser confirmado:

- alinhamento com a Sprint 05 planejada no roadmap e com a Fase 3;
- compatibilidade com visão, princípios, especificação, arquitetura, estilo e templates documentais;
- existência de padrão real compartilhado entre `TemplateStorage` e `DocumentStorage`;
- contrato limitado às cinco operações comprovadas;
- separação entre persistência genérica e regras dos serviços;
- entidade e identificador parametrizáveis;
- ausência de classe base, requisito de campo fixo e modelo de produto;
- erros internos pequenos, previsíveis e seguros;
- implementação em memória isolada, explícita e não durável;
- suporte de teste reutilizável e independente da implementação concreta;
- compatibilidade pública dos serviços e testes preexistentes inalterados;
- ausência de Supabase, banco, autenticação, interface ou integração externa na nova camada;
- inexistência de funcionalidade das Sprints 06 e 07;
- alteração exclusiva dos seis arquivos autorizados;
- ausência de mudança em dependências, configurações, scripts, manifestos e lockfile;
- registro transparente de falhas, limitações e verificações não executadas.

# Critérios de Conclusão

A Sprint poderá ser considerada **tecnicamente concluída e aguardando aprovação** somente quando:

- todos os pré-requisitos estiverem formalmente atendidos;
- as quatro entregas aprovadas estiverem completas;
- cada requisito possuir evidência verificável;
- todos os critérios de aceitação possuírem status e evidência;
- a interface genérica e seus erros estiverem documentados pelo código autorizado;
- o repositório em memória cumprir integralmente o contrato e permanecer não durável e isolado;
- a suíte de contrato tiver sido executada com sucesso;
- os testes preexistentes de `TemplateService` e `DocumentService` passarem sem modificação;
- typecheck e build tiverem sido executados sem erro impeditivo introduzido pela Sprint;
- lint tiver sido executado ou sua indisponibilidade declarada;
- responsividade e acessibilidade tiverem sido declaradas não aplicáveis;
- revisão arquitetural confirmar contrato mínimo, injeção explícita, neutralidade e substituição;
- não existir erro conhecido que invalide operações, erros ou compatibilidade;
- somente os quatro arquivos de persistência tiverem sido criados e os dois serviços autorizados modificados;
- nenhum adaptador Supabase, banco, dado de produto ou item fora do escopo tiver sido introduzido;
- nenhuma dependência, configuração, variável de ambiente, script, manifesto ou lockfile tiver sido alterado;
- diff e estado final do repositório tiverem sido revisados;
- riscos, limitações, falhas e pendências tiverem sido registrados;
- arquivos afetados, comandos e resultados tiverem sido apresentados ao responsável.

Conclusão técnica não encerra a Sprint. O encerramento depende de revisão e aprovação explícita. A conclusão não autoriza commit, push, publicação, `SupabaseRepository`, Sprint 06 ou qualquer integração posterior.

# Entrega Esperada

Ao concluir tecnicamente a Sprint, a entrega deverá apresentar:

- interface genérica de repositório e erros internos estáveis;
- implementação em memória para testes e desenvolvimento;
- suíte reutilizável de testes de contrato;
- `TemplateStorage` e `DocumentStorage` compatíveis com a nova fronteira;
- testes preexistentes dos dois serviços preservados e aprovados;
- lista completa dos arquivos criados e modificados;
- comandos executados e resultados;
- resultados de testes, typecheck, build e inspeções aplicáveis;
- verificações indisponíveis ou não aplicáveis justificadas;
- status e evidência individual de cada critério;
- riscos, limitações, falhas e pendências;
- confirmação de ausência de SupabaseRepository, banco específico, dado de produto e funcionalidades excluídas;
- confirmação de dependências e configurações inalteradas;
- confirmação de que somente os seis arquivos autorizados foram afetados.

O estado esperado após a entrega técnica era **Sprint 05 tecnicamente concluída e aguardando aprovação**. Após a revisão e a aprovação explícita do responsável, o estado atual é **Sprint 05 encerrada**.

# Commit Esperado

**Mensagem proposta:** `feat: add reusable repository layer`

**Commit da implementação:** `bc7ca07d2ca2d8622380dc1d8a8177b1eb5802e1`

**Arquivos previstos:**

- `lib/persistence/repository.ts`
- `lib/persistence/in-memory-repository.ts`
- `lib/persistence/repository-contract.test-support.ts`
- `lib/persistence/in-memory-repository.test.ts`
- `lib/templates/template-service.ts`
- `lib/documents/document-service.ts`

A implementação foi registrada com a mensagem proposta. Este registro não autoriza novo commit, push, Pull Request ou publicação.

# Registro de Encerramento

## Resultado

- A interface genérica `Repository<TEntity, TIdentifier>` e os erros estáveis foram criados em `lib/persistence/repository.ts`.
- `InMemoryRepository` foi criado para testes e desenvolvimento local, com estado isolado por instância.
- A suíte reutilizável de contrato e seus testes foram criados nos arquivos autorizados de persistência.
- `TemplateStorage` e `DocumentStorage` passaram a depender de forma compatível do contrato genérico.
- Nenhum adaptador Supabase, banco específico, dado de produto ou funcionalidade das Sprints 06 e 07 foi incluído.
- Nenhuma dependência, configuração, variável de ambiente, script, manifesto ou lockfile foi alterado.

## Validações registradas

- `node --test lib/persistence/in-memory-repository.test.ts lib/templates/template-service.test.ts lib/documents/document-service.test.ts`: 39 testes aprovados, sem falhas.
- `./node_modules/.bin/tsc --noEmit`: concluído sem erro.
- `npm run build`: concluído sem erro.
- `git diff --check`: concluído sem erro.
- Lint: indisponível porque o projeto não possui script oficial.
- Responsividade e acessibilidade: não aplicáveis, pois a Sprint não alterou interface ou interação.
- Revisão de escopo: o commit da implementação contém exclusivamente os seis arquivos autorizados.

## Status dos critérios de aceitação

| Critério | Status | Evidência |
| --- | --- | --- |
| CA-01 | Atendido | O commit da implementação criou os quatro arquivos de persistência e modificou somente os dois serviços autorizados. |
| CA-02 | Atendido | Entidades e identificadores são parametrizáveis sem herança ou campo fixo. |
| CA-03 | Atendido | O contrato expõe somente `create`, `findById`, `list`, `update` e `remove`. |
| CA-04 | Atendido | `findById` retorna `null` para identificador ausente. |
| CA-05 | Atendido | Conflito, ausência e falha de armazenamento possuem códigos estáveis, mensagens seguras e causa preservável. |
| CA-06 | Atendido | `InMemoryRepository` usa identificador injetado e estado privado, isolado e não durável. |
| CA-07 | Atendido | A suíte recebe fábrica e exercita somente a interface pública. |
| CA-08 | Atendido | Os testes cobrem CRUD, conflito, ausência, isolamento, preservação e genericidade. |
| CA-09 | Atendido | Os serviços continuam recebendo armazenamento explicitamente por construtor. |
| CA-10 | Atendido | O contrato não contém tipos, imports ou configuração de fornecedor. |
| CA-11 | Atendido | Todos os testes preexistentes de `TemplateService` passaram sem alteração. |
| CA-12 | Atendido | Todos os testes preexistentes de `DocumentService` passaram sem alteração. |
| CA-13 | Atendido | Modelos, validações, conteúdo opaco e erros públicos dos serviços foram preservados. |
| CA-14 | Atendido | Não foram incluídos dados de produto, DocAI, autenticação, interface, IA, pagamentos, PDF, e-mail ou armazenamento externo. |
| CA-15 | Atendido | Dependências, configurações, scripts, manifestos, lockfile e ambiente permaneceram inalterados. |
| CA-16 | Atendido | Testes, typecheck, build e `git diff --check` foram aprovados; a ausência de lint foi declarada. |
| CA-17 | Atendido | O commit da implementação contém exclusivamente os seis arquivos autorizados. |
| CA-18 | Atendido | Nenhum adaptador real ou funcionalidade das Sprints 06 e 07 foi antecipado. |

# Pré-requisitos confirmados

- As Sprints 03 e 04 foram encerradas antes da implementação.
- Este documento foi aprovado explicitamente.
- A implementação da Sprint 05 foi autorizada explicitamente.
- A entrega foi validada e revisada contra os arquivos autorizados.

Não há pendência conhecida que invalide o encerramento da Sprint 05. As limitações registradas permanecem fora do escopo e não autorizam trabalho adicional.

# Observações

## Decisões registradas

- O uso do repositório em memória em desenvolvimento local foi aprovado como refinamento desta Sprint em relação ao roadmap, que mencionava somente validação de testes, sem autorizar produção ou persistência durável.
- O contrato genérico utilizará entidade e identificador parametrizáveis.
- Os métodos manterão os nomes já presentes nos contratos dos serviços.
- `findById` representará ausência válida por `null`.
- `create` rejeitará identificador existente; `update` e `remove` rejeitarão identificador ausente.
- `TemplateStorage` e `DocumentStorage` permanecerão disponíveis como contratos públicos compatíveis.
- Validação e composição de entidades continuarão nos serviços consumidores.
- O repositório em memória receberá uma função de extração de identificador.
- O repositório em memória será isolado por instância e não durável.
- A ordem de inserção será comportamento documentado somente da implementação em memória.
- O suporte de contrato será reutilizável por fábrica e não conhecerá classes concretas.
- Um futuro adaptador Supabase deverá implementar o contrato interno e permanecer fora do núcleo.

## Limitações conhecidas

- A Sprint não oferece persistência de produção ou durabilidade.
- Estado em memória não é compartilhado entre processos e é perdido no reinício.
- O contrato não define paginação, consultas, transações ou ordenação de produto.
- O contrato não valida campos internos nem resolve autorização ou multi-tenancy.
- A camada não integra templates ou documentos a consumidores reais.
- Concorrência e atomicidade definitivas dependerão de adaptadores futuros.
- Igualdade, cópia profunda e proteção contra mutação externa não são garantidas genericamente.
