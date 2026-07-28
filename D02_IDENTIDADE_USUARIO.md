# D02 — Identidade e Contexto do Usuário

**Produto:** DocAI  
**Sprint:** D02 — Identidade e contexto do usuário  
**Status:** registro histórico aprovado; não define estratégia vigente
**Dependência anterior:** D01 — Refinamento do domínio, aprovada

Esta Sprint define como o DocAI identifica usuários, autoriza operações e associa documentos ao contexto correto. A implementação deverá preservar a fundação congelada do Starter Kit e manter Supabase Auth atrás de uma fronteira substituível.

## Objetivo da Sprint

Disponibilizar uma camada de identidade e contexto capaz de reconhecer o usuário autenticado, autorizar o acesso aos seus rascunhos e fornecer contexto seguro aos casos de uso do DocAI, sem expor tokens, depender de detalhes de interface ou permitir acesso cruzado entre contas.

## Escopo

- Definir o modelo mínimo de usuário necessário ao DocAI.
- Definir autenticação baseada no mecanismo Supabase Auth já escolhido.
- Definir autorização por proprietário do documento.
- Definir o contexto do usuário recebido pelos casos de uso.
- Associar rascunhos privados ao usuário correto.
- Manter templates genéricos fora do escopo de propriedade nesta Sprint; templates privados exigirão decisão própria.
- Criar uma porta substituível para leitura da sessão e identidade.
- Mapear sessões ausentes, expiradas ou inválidas para erros seguros.
- Preparar testes de isolamento sem depender de ambiente externo real.

Não inclui planos, pagamentos, geração real com Gemini, interface nova, migrations de produto ou publicação.

## Compatibilidade com D01 e o estado atual

- D01 exige pelo menos duas partes nomeadas; a implementação atual ainda aceita uma parte e deverá ser ajustada somente na Sprint de implementação autorizada.
- D01 define campos funcionais adicionais, como responsabilidades, encerramento, garantias e avisos; D02 não altera esses modelos.
- O `ContractService` atual não possui proprietário nos rascunhos; a implementação de D02 deverá introduzir essa fronteira sem mover regras para Supabase.
- O `DocumentService` e o repositório genérico não conhecem usuário; o isolamento deverá ser fornecido por uma porta de autorização e por um adaptador de persistência aprovado posteriormente.
- A autenticação existente em `lib/auth/server.ts` usa cookies do App Router e Supabase SSR. D02 deverá consumi-la através de adaptador específico, sem modificar a fundação congelada.
- Nenhuma destas diferenças autoriza alteração nesta Sprint documental.

## Autenticação

- A autenticação será realizada por Supabase Auth através do mecanismo já existente no Starter Kit.
- A aplicação deverá obter a sessão no servidor, usando a API oficial disponível na base.
- O cliente não poderá fornecer ou definir o identificador autenticado.
- Sessões ausentes, expiradas, inválidas ou revogadas deverão resultar em estado não autenticado.
- Tokens, refresh tokens e credenciais nunca devem atravessar a camada de domínio ou ser enviados à IA.
- A camada DocAI deve depender de uma interface de identidade, não do cliente concreto do Supabase.
- Cadastro, login, logout e recuperação de senha permanecem responsabilidades da fundação de autenticação, salvo alteração explicitamente autorizada.

## Autorização

- Toda operação sobre rascunho deve receber o contexto autenticado do servidor.
- O proprietário do documento deve ser verificado antes de ler, atualizar, listar ou remover.
- Ausência de autorização deve ser indistinguível de recurso inexistente quando isso reduzir exposição de dados.
- Um usuário não pode consultar, alterar, remover ou gerar a partir de dados pertencentes a outra conta.
- Não haverá papéis administrativos, organizações ou compartilhamento nesta Sprint.
- A autorização deve ocorrer na aplicação e ser reforçada na infraestrutura de persistência quando o adaptador de produto for implementado.

## Modelo de usuário

O modelo interno mínimo deve conter:

- `id` estável, derivado do identificador autenticado;
- `authProvider` ou referência equivalente ao mecanismo de identidade, sem token;
- e-mail normalizado apenas quando fornecido pela sessão;
- estado de autenticação validado no momento da operação.

O modelo não deve conter senha, token, refresh token, dados de cobrança, dados contratuais ou permissões hipotéticas. Perfil, organização, plano e preferências exigem Sprints próprias.

## Contexto do usuário

O contexto recebido pelos casos de uso deve conter somente dados necessários à operação:

- identificador interno do usuário;
- estado autenticado;
- e-mail ou locale somente quando necessários e autorizados;
- jurisdição selecionada pelo usuário, quando definida em Sprint própria;
- identificador de correlação não sensível para observabilidade, se aprovado.

O contexto não deve conter credenciais, tokens, conteúdo de outros usuários ou detalhes do provedor. O contexto deve ser criado na fronteira do servidor e passado explicitamente às operações que exigem propriedade.

Durante a geração de contratos:

- o serviço de geração recebe somente o contexto mínimo e os dados autorizados do próprio usuário;
- o identificador de autenticação não deve ser usado como conteúdo contratual;
- tokens nunca são enviados ao adaptador de IA;
- dados de outras contas não podem ser usados como exemplos, histórico ou contexto;
- logs não devem registrar conteúdo integral nem credenciais.

## Isolamento dos documentos por usuário

- Todo rascunho persistido deverá possuir um proprietário identificável.
- A propriedade deve ser definida no servidor no momento da criação.
- O proprietário não pode ser recebido como campo confiável da interface.
- Consultas, atualizações e remoções devem filtrar pelo proprietário autenticado.
- Listagens devem retornar somente documentos do contexto atual.
- Tentativas de acesso cruzado devem retornar erro seguro ou ausência indistinguível, conforme a operação.
- Templates genéricos não recebem propriedade nesta Sprint; templates privados exigem decisão, contrato e testes próprios.
- Migração de rascunhos sem proprietário não é permitida automaticamente.

## Integração prevista com Supabase Auth

- A integração concreta deverá ficar em um adaptador de infraestrutura específico.
- O adaptador deverá converter sessão Supabase em uma identidade interna mínima.
- Falhas do SDK deverão ser traduzidas para erros internos estáveis.
- Nenhum tipo do SDK deve atravessar o domínio ou os casos de uso.
- Configurações e chaves devem permanecer no ambiente de servidor.
- A existência do pacote Supabase no Starter Kit não autoriza novas configurações, tabelas ou políticas nesta Sprint documental.
- A implementação real deverá validar a sessão no servidor e documentar o comportamento de ambientes ausentes.

## Responsabilidades do domínio

- Receber um contexto interno já autenticado e validado.
- Exigir proprietário nas operações que tratam dados privados.
- Aplicar regras de propriedade e coerência do contrato sem conhecer Supabase.
- Não ler cookies, headers, tokens ou variáveis de ambiente.
- Não decidir login, renovação de sessão ou detalhes de provedor.
- Produzir erros de autorização previsíveis e sem vazamento de informação.

## Responsabilidades da infraestrutura

- Ler e validar a sessão no servidor.
- Converter a sessão do Supabase em identidade interna.
- Fornecer mecanismos de filtragem por proprietário ao armazenamento.
- Manter segredos e configurações fora do código.
- Aplicar políticas de acesso no adaptador de persistência quando este existir.
- Traduzir falhas externas sem expor detalhes do SDK.
- Não introduzir regras de contrato, prompts ou decisões de produto.

## Arquivos autorizados para implementação

Somente após aprovação desta especificação:

- `lib/docai/application/user-context.ts` — contrato e criação do contexto interno;
- `lib/docai/application/user-context.test.ts` — testes do contexto e estados de sessão;
- `lib/docai/application/authorization.ts` — regras de autorização por proprietário;
- `lib/docai/application/authorization.test.ts` — testes de isolamento e erros seguros;
- `lib/docai/services/contract-service.ts` — somente para exigir proprietário nas operações DocAI;
- `lib/docai/services/contract-service.test.ts` — regressão e testes de propriedade;
- `lib/docai/infrastructure/auth/supabase-auth.ts` — adaptador substituível da sessão;
- `lib/docai/infrastructure/auth/supabase-auth.test.ts` — testes com dublês do provedor;
- `PROJECT_STATE.md` — registro do estado após a implementação aprovada.

Se a integração exigir alteração em `lib/auth/`, `lib/persistence/`, `app/` ou configurações, a implementação deverá parar para revisão formal.

## Arquivos proibidos

- qualquer arquivo não listado como autorizado;
- `lib/auth/` e middleware do Starter Kit congelado;
- `lib/docai/domain/` e `lib/docai/services/` não listados explicitamente;
- `lib/persistence/`, `lib/documents/` e `lib/templates/`, salvo nova autorização;
- páginas, componentes, layouts, rotas ou Server Actions;
- migrations, schemas, RLS ou tabelas Supabase;
- Gemini, Stripe, PDF, e-mail, storage externo ou chamadas HTTP de produto;
- `package.json`, lockfiles, scripts, configurações e variáveis de ambiente;
- tokens, credenciais, segredos ou dados reais de usuários.

## Critérios de aceitação

- Uma sessão válida produz um contexto interno mínimo e estável.
- Sessão ausente, expirada ou inválida é rejeitada sem expor detalhes externos.
- O identificador do usuário é sempre obtido no servidor.
- Operações de rascunho exigem contexto autenticado.
- Criação associa o proprietário no servidor.
- Leitura, listagem, atualização e remoção não permitem acesso cruzado.
- O domínio não importa Supabase nem recebe tokens.
- O adaptador traduz falhas do provedor para erros internos previsíveis.
- O contexto de geração não inclui credenciais nem dados de outras contas.
- A fundação congelada e os fluxos anteriores permanecem compatíveis.
- Nenhuma nova integração, tabela, configuração ou UI é introduzida fora do escopo.
- O isolamento de templates não é introduzido implicitamente.

## Estratégia de testes

- Sessão válida, ausente, expirada e inválida.
- Conversão de identidade externa para contexto interno.
- Ausência de tokens no contexto exposto aos casos de uso.
- Criação sempre usa o usuário autenticado, ignorando proprietário fornecido pela entrada.
- Leitura, listagem, atualização e remoção com proprietário correto.
- Tentativas de acesso cruzado retornam ausência ou erro seguro.
- Falhas do adaptador são traduzidas sem expor detalhes do SDK.
- Testes com dublês executados sem rede, credenciais ou Supabase real.
- Regressão dos testes de domínio, serviços e casos de uso existentes.
- Typecheck, build e `git diff --check` na Sprint de implementação.

## Riscos conhecidos

- Confundir autenticação com autorização.
- Permitir que um identificador vindo do cliente defina o proprietário.
- Vazamento de conteúdo por mensagens de “não encontrado” ou logs.
- Dependência direta do domínio no SDK Supabase.
- Rascunhos legados sem proprietário definido.
- Políticas de persistência insuficientes para isolamento real.
- Sessões diferentes entre renderização, ações e operações de servidor.
- Inclusão prematura de organizações, papéis ou cobrança.

## Critérios de encerramento

- Este documento for revisado e aprovado explicitamente.
- Todos os critérios de aceitação possuírem evidência na implementação.
- Testes, typecheck, build e `git diff --check` forem aprovados.
- Documentação for reconciliada com o código.
- Commit e push da implementação forem realizados.
- Branch estiver sincronizada com `origin/main` e a árvore limpa.
- Nenhuma alteração fora dos arquivos autorizados for introduzida.

## Dependências para a Sprint seguinte

A Sprint seguinte poderá implementar persistência específica de rascunhos e isolamento no banco. Ela dependerá do contexto de usuário aprovado nesta Sprint, deverá definir contrato de proprietário, estratégia de migração e políticas de acesso, e não poderá introduzir geração real ou pagamentos sem especificação própria.

## Registro de revisão

A Sprint D02 foi revisada integralmente quanto à consistência técnica, compatibilidade com D01, arquitetura do Starter Kit, código de autenticação existente, ambiguidades, requisitos, critérios, testes, riscos e dependências. Após registrar as diferenças de compatibilidade e limitar a propriedade a rascunhos, a Sprint D02 está aprovada para implementação conforme os arquivos autorizados.
