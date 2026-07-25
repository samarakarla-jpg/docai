# Estado Atual do Projeto

**Projeto:** `SaaS Starter Kit`

**Data de referência:** `25 de julho de 2026`

**Branch de referência:** `main`

**Commit de referência:** `9cdef7c653f995c1dbf088939f6811f042291efe`

Este documento registra um retrato do estado observável do projeto antes do planejamento da Sprint 05. Ele consolida informações presentes no repositório, no histórico versionado e na documentação existente. Não autoriza implementação, alteração de escopo, instalação de dependências, mudança de configuração, commit, push ou início de nova Sprint.

# Visão Geral do Projeto

O SaaS Starter Kit é uma fundação técnica e documental para iniciar aplicações web SaaS de forma simples, controlada e reutilizável. O projeto não representa um produto final: sua função é reduzir o trabalho inicial de novos micro SaaS sem incorporar antecipadamente regras de negócio, integrações ou decisões específicas de um produto derivado.

A base utiliza Next.js 15 com App Router, React 19, TypeScript 5 e Tailwind CSS 4. O desenvolvimento é incremental, orientado por documentação e condicionado a aprovação explícita. Visão, princípios, especificação, arquitetura, workflow e Sprint delimitam responsabilidades diferentes e devem permanecer coerentes entre si.

No estado atual, o projeto reúne:

- uma aplicação web inicial neutra e executável;
- autenticação básica baseada em Supabase Auth;
- uma rota mínima de dashboard protegida;
- um serviço reutilizável para gerenciamento de templates;
- um serviço reutilizável para gerenciamento conceitual de documentos;
- documentação de produto, arquitetura, engenharia, interface, colaboração e planejamento por Sprints.

A branch local `main` e sua referência local de `origin/main` apontavam para o mesmo commit no início deste registro. A árvore de trabalho já continha `SPRINT_04.md` como arquivo não rastreado. A criação deste documento adiciona `PROJECT_STATE.md` como outro arquivo não rastreado até que exista autorização específica para versionamento.

# Sprints Concluídas

## Sprint 01 — Fundação do Starter Kit

**Resultado materializado:** fundação mínima, neutra e executável da aplicação.

**Evidência principal no histórico:** commit `09c8e7b` (`Initial foundation of SaaS Starter Kit`).

Principais resultados presentes:

- layout raiz com idioma `pt-BR` e metadados neutros;
- página inicial que identifica o SaaS Starter Kit como fundação reutilizável;
- estilos globais mínimos;
- remoção dos recursos demonstrativos originais não utilizados;
- preservação da stack e dos scripts essenciais do projeto.

## Sprint 02 — Autenticação básica e proteção de rotas

**Resultado materializado:** cadastro, login, logout, sessão e proteção mínima do dashboard com Supabase Auth.

**Evidência principal no histórico:** commit `ed2fa39` (`feat: add Supabase authentication and route protection`).

Principais resultados presentes:

- páginas de cadastro e login;
- validação server-side de e-mail e senha;
- Server Actions para cadastro, login e logout;
- clientes Supabase SSR separados para leitura e escrita de sessão;
- middleware restrito à proteção de `/dashboard`;
- dashboard neutro com validação de sessão e ação de logout;
- variáveis necessárias documentadas em `.env.example`;
- dependências `@supabase/ssr` e `@supabase/supabase-js` registradas no projeto.

## Sprint 03 — Camada de serviços reutilizáveis com TemplateService

**Resultado materializado:** serviço genérico para o ciclo de vida mínimo de templates.

**Evidências principais no histórico:** commits `da12f9a` (`docs: add Sprint 03 service layer plan`) e `a971fe3` (`feat: add reusable template service`).

Principais resultados presentes:

- contrato `Template<TContent>` composto por `id`, `name` e `content`;
- operações `create`, `getById`, `list`, `update` e `remove`;
- contrato de armazenamento explícito e substituível;
- validação de identificador, nome e atualização;
- erros distinguíveis para entrada inválida, conflito, ausência e falha de armazenamento;
- conteúdo tratado como dado opaco;
- testes unitários sem rede, credenciais ou persistência real.

## Sprint 04 — Gerenciamento reutilizável de documentos

**Resultado materializado:** serviço genérico para o ciclo de vida mínimo de documentos conceituais.

**Evidência principal no histórico:** commit `9cdef7c653f995c1dbf088939f6811f042291efe` (`feat: add reusable document service`).

Principais resultados presentes:

- contrato `Document<TContent>` composto por `id`, `title` e `content`;
- operações `create`, `getById`, `list`, `update` e `remove`;
- contrato de armazenamento explícito e substituível;
- validação de identificador, título e atualização;
- erros distinguíveis para entrada inválida, conflito, ausência e falha de armazenamento;
- conteúdo tratado como dado opaco, sem associação a arquivo ou PDF;
- independência entre `DocumentService` e `TemplateService`;
- testes unitários sem infraestrutura externa.

# Sprint Atual

Não existe Sprint de implementação em execução neste momento.

A Sprint 04 possui implementação presente e enviada para `origin/main`. A Sprint 05 ainda não possui objetivo, requisitos, arquivos autorizados ou critérios de aceitação definidos na documentação. Portanto, nenhuma funcionalidade pode ser atribuída ou implementada como Sprint 05 até que seu escopo seja documentado e aprovado explicitamente.

A atividade atual limita-se à criação e revisão deste registro de estado, antes de qualquer planejamento da Sprint 05.

# Funcionalidades Implementadas

## Fundação web

- Aplicação Next.js organizada com App Router.
- Layout raiz e página inicial neutros.
- Metadados básicos e idioma `pt-BR`.
- Estilos com Tailwind CSS.
- Scripts de desenvolvimento, build e execução de produção.

## Autenticação

- Cadastro por e-mail e senha.
- Login por e-mail e senha.
- Logout da sessão local.
- Validação de credenciais no servidor.
- Sessão gerenciada pelo Supabase Auth por cookies.
- Atualização de sessão no middleware.
- Proteção server-side da rota `/dashboard`.
- Redirecionamento de acesso não autenticado para `/login`.
- Mensagens genéricas para credenciais inválidas e indisponibilidade do serviço.
- Interfaces básicas de cadastro, login e dashboard com rótulos, estados e foco visível.

A autenticação depende de um projeto Supabase configurado por `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. O repositório contém somente os nomes das variáveis, sem valores ou credenciais.

## Serviço de templates

- Criação de template.
- Consulta por identificador.
- Listagem conforme a ordem fornecida pelo armazenamento.
- Atualização parcial de nome e conteúdo.
- Remoção de template.
- Validação de entradas.
- Tratamento estável de conflito, ausência e falha de armazenamento.
- Conteúdo genérico parametrizado pelo consumidor.

## Serviço de documentos

- Criação de documento.
- Consulta por identificador.
- Listagem conforme a ordem fornecida pelo armazenamento.
- Atualização parcial de título e conteúdo.
- Remoção de documento.
- Validação de entradas.
- Tratamento estável de conflito, ausência e falha de armazenamento.
- Conteúdo genérico parametrizado pelo consumidor.

Os serviços de templates e documentos definem contratos, coordenação e validação, mas não incluem armazenamento concreto de produção nem consumidores integrados à aplicação web.

## Verificação automatizada disponível

- Testes unitários nativos do Node.js para `TemplateService`.
- Testes unitários nativos do Node.js para `DocumentService`.
- TypeScript disponível para verificação sem emissão.
- Build oficial disponível pelo script `npm run build`.
- Não existe script oficial de lint no `package.json`.

# Decisões Arquiteturais

- A fundação permanece neutra em relação a domínio, marca e produto derivado.
- O App Router organiza rotas, layouts e páginas.
- Server Components são o padrão; Client Components aparecem somente nos formulários que exigem estado de interação.
- Operações de autenticação e acesso à sessão permanecem no servidor.
- O Supabase é o mecanismo concreto aprovado somente para identidade e sessão; ele não constitui banco de dados de produto.
- A proteção do dashboard ocorre no middleware e é confirmada novamente na página protegida.
- Serviços reutilizáveis expõem contratos pequenos, dependências explícitas e erros previsíveis.
- `TemplateService` e `DocumentService` recebem contratos de armazenamento por injeção e não conhecem persistência concreta.
- O campo `content` é parametrizável e opaco nos dois serviços.
- Os serviços permanecem independentes; não existe classe base, repositório genérico, barrel compartilhado ou abstração comum de CRUD.
- Armazenamentos em memória existem somente nos arquivos de teste e não são adaptadores de produção.
- Regras específicas de produto devem permanecer fora da fundação compartilhada.
- Novas dependências, configurações, integrações e mudanças arquiteturais exigem necessidade atual, documentação e aprovação explícita.

# Pendências

## Estado do repositório

- `SPRINT_04.md` existe localmente, mas não está rastreado pelo Git e não faz parte do commit que implementou a Sprint 04.
- `PROJECT_STATE.md` permanecerá não rastreado ao final desta tarefa, pois commit e push não estão autorizados.

## Consistência documental

- `SPRINT_02.md` ainda declara o status “Planejada e aguardando aprovação”, apesar da implementação estar presente no histórico.
- `SPRINT_03.md` e `SPRINT_04.md` ainda declaram “rascunho aguardando aprovação”, apesar das respectivas implementações estarem presentes.
- `SPRINT_01.md` não possui um campo explícito de status atualizado.
- O índice de documentação do `README.md` referencia somente a Sprint 01 e não lista todos os documentos e Sprints atualmente existentes.
- Essas divergências são registradas aqui, mas não foram corrigidas porque nenhum outro arquivo está autorizado nesta tarefa.

## Operação e validação

- A autenticação exige configuração externa válida do Supabase para validação funcional completa.
- Não existe script oficial de lint.
- Os serviços de templates e documentos não possuem armazenamento concreto, integração com rotas ou consumidor de interface.
- O objetivo e o recorte da Sprint 05 ainda não foram definidos.

As pendências acima não autorizam correção automática, integração ou ampliação de escopo.

# Próximos Passos

Os próximos passos possíveis, sujeitos a autorização individual, são:

1. revisar e aprovar este registro de estado;
2. decidir como versionar `SPRINT_04.md` e `PROJECT_STATE.md`, sem misturar unidades de trabalho não relacionadas;
3. decidir se os status e índices documentais desatualizados deverão ser reconciliados em uma tarefa própria;
4. definir a necessidade concreta e o objetivo único da Sprint 05;
5. criar `SPRINT_05.md` com escopo, entregas, exclusões, requisitos, arquivos autorizados, riscos e critérios de aceitação;
6. revisar e aprovar a Sprint 05 antes de qualquer implementação;
7. somente após autorização específica, implementar, validar, relatar e aguardar aceite conforme o protocolo do projeto.

Esta sequência é um registro de dependências de processo, não uma autorização para executar qualquer etapa posterior.

# Itens Fora do Escopo

Permanecem fora do estado implementado e não estão autorizados por este documento:

- definição ou implementação da Sprint 05;
- regras, dados, fluxos ou identidade visual de produto específico;
- inteligência artificial, agentes, prompts, embeddings ou geração de conteúdo;
- criação, leitura, processamento, conversão ou exportação de PDF;
- pagamentos, assinaturas, faturamento, planos ou Stripe;
- banco de dados de produto, migrations, schemas ou persistência de domínio;
- armazenamento concreto para templates ou documentos;
- integração de `TemplateService` ou `DocumentService` com autenticação, rotas ou interface;
- upload, download ou manipulação de arquivos;
- autorização granular, papéis, organizações ou multi-tenancy;
- recuperação de senha, login social, autenticação multifator ou gestão avançada de usuários;
- APIs de produto, Server Actions adicionais ou novos serviços reutilizáveis;
- biblioteca de componentes, dashboard de produto ou ampliação da interface;
- logs, métricas, auditoria, analytics, filas, cache ou observabilidade adicional;
- infraestrutura de produção, hospedagem, automação de deploy ou CI/CD;
- instalação, remoção ou atualização de dependências;
- alteração de scripts, manifestos, arquivos de lock, configurações ou variáveis de ambiente;
- refatorações, abstrações compartilhadas ou preparação para Sprints futuras;
- alteração de qualquer arquivo além de `PROJECT_STATE.md` nesta tarefa;
- commit, push, Pull Request, publicação ou operação remota.

# Condição Atual

O projeto possui quatro entregas de Sprint materializadas, encontra-se sem Sprint de implementação ativa e aguarda definição documental da Sprint 05. Este arquivo está pronto para revisão, mas somente poderá ser considerado aprovado após manifestação explícita do responsável pelo projeto.
