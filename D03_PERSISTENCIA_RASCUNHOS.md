# D03 — Persistência de Rascunhos do DocAI

**Produto:** DocAI  
**Sprint:** D03 — Persistência de rascunhos  
**Status:** registro histórico aprovado; não define estratégia vigente
**Dependência anterior:** D02 — Identidade e contexto do usuário, aprovada

Esta Sprint define o armazenamento durável dos rascunhos do DocAI e seu isolamento por usuário. A persistência prevista utilizará Supabase somente por meio de contratos internos e após aprovação da implementação. Este documento não autoriza migrations, credenciais, chamadas externas ou código de produção.

## Objetivo

Definir um modelo persistente, seguro e substituível para rascunhos de contratos, cobrindo ciclo de vida, propriedade, recuperação e compatibilidade com os serviços de domínio existentes.

## Escopo

- Definir a entidade persistente de rascunho.
- Definir estados e transições do ciclo de vida.
- Definir operações de criação, leitura, listagem, edição, exclusão e recuperação.
- Definir isolamento por usuário autenticado.
- Definir relacionamento do rascunho com tipo de contrato e template.
- Definir contrato interno para um adaptador Supabase futuro.
- Definir tratamento de ausência, conflito, falha e concorrência básica.
- Definir testes de contrato e regressão dos serviços DocAI.

Não inclui geração real com Gemini, interface visual, pagamentos, PDF, e-mail, compartilhamento, colaboração ou publicação jurídica.

## Compatibilidade com D01, D02 e o estado atual

- D01 exige pelo menos duas partes nomeadas e campos funcionais adicionais; D03 apenas persiste o conteúdo validado e não redefine essas regras.
- D02 exige `ownerId` obtido no servidor; D03 torna essa propriedade parte obrigatória do rascunho persistido.
- O `ContractService` atual não possui proprietário, estado, versão ou timestamps; esses campos são requisitos de evolução desta Sprint e não estão sendo declarados como já implementados.
- O `DocumentService` e o `Repository` genéricos atuais não filtram por proprietário e oferecem remoção física; D03 introduz um contrato específico de rascunho para operações com proprietário, arquivamento e recuperação, sem modificar a fundação genérica congelada.
- O modelo atual de template contém somente tipo, título e instruções; `templateVersion` e metadados persistidos deverão ser tratados como evolução compatível, sem alterar templates existentes nesta Sprint documental.
- A persistência Supabase, RLS, migrations e qualquer alteração de schema só poderão existir na implementação aprovada desta Sprint.

## Modelo de rascunho

O rascunho persistido deverá conter, no mínimo:

- `id`: identificador estável do rascunho;
- `ownerId`: identificador interno do usuário proprietário;
- `contractType`: um dos quatro tipos suportados;
- `title`: título editável e não vazio;
- `content`: conteúdo estruturado conforme o tipo;
- `templateId`: referência ao template utilizado, quando houver;
- `templateVersion`: versão do template, quando houver;
- `status`: estado do ciclo de vida;
- `version`: número monotônico da versão persistida;
- `createdAt`: data de criação;
- `updatedAt`: data da última alteração;
- `generatedAt`: data da última geração, quando houver;
- `reviewedAt`: data da revisão humana, quando houver;
- `generationMetadata`: metadados não sensíveis e opcionais da geração.

O conteúdo contratual não deve conter tokens, credenciais, dados de sessão ou tipos específicos do SDK Supabase. Metadados de provedor, quando necessários, devem ser normalizados e não podem incluir segredos.

## Ciclo de vida do rascunho

Estados permitidos:

- `draft`: criado ou editado, ainda não revisado;
- `generated`: possui resultado de geração associado e aguarda revisão;
- `reviewed`: usuário registrou revisão humana;
- `archived`: retirado das listagens ativas, mas preservado conforme política de retenção.

Transições:

- criação inicia em `draft`;
- geração bem-sucedida pode mover `draft` para `generated`;
- edição de conteúdo ou título após geração retorna o estado para `draft`;
- confirmação explícita do usuário move `generated` para `reviewed`;
- exclusão lógica move para `archived`, quando retenção exigir preservação;
- restauração de `archived` retorna a `draft` somente em operação autorizada.

Não haverá estado `published`, `signed`, `approved` ou equivalente nesta Sprint.

## Regras de criação

- A criação exige contexto autenticado e `ownerId` obtido no servidor.
- O proprietário não pode ser aceito da entrada do cliente.
- Tipo, título, conteúdo e campos obrigatórios devem ser validados antes da persistência.
- O conteúdo deve corresponder ao `contractType`.
- O template, quando informado, deve existir, ser compatível e registrar sua versão.
- `version` inicia em 1.
- `createdAt` e `updatedAt` são definidos pelo servidor.
- O identificador deve ser único dentro do escopo permitido.
- Falha de persistência não pode produzir rascunho parcialmente criado.

## Regras de edição

- Somente o proprietário autenticado pode editar.
- Título e conteúdo podem ser editados apenas com validação completa.
- Toda alteração incrementa `version` e atualiza `updatedAt`.
- Alteração após geração remove ou invalida os metadados de geração que não correspondam ao conteúdo atual.
- Edição não pode mudar silenciosamente `ownerId` ou `contractType`.
- Concorrência deverá usar versão esperada ou mecanismo equivalente para evitar sobrescrita silenciosa.
- Campos de auditoria não podem ser definidos pelo cliente.

## Regras de exclusão e recuperação

- Exclusão exige autenticação e propriedade do rascunho.
- A política padrão será exclusão lógica para permitir retenção e recuperação controlada.
- Exclusão definitiva, se necessária, exigirá decisão de privacidade e Sprint própria.
- Um rascunho arquivado não aparece na listagem ativa.
- Recuperação exige operação explícita, propriedade válida e estado permitido.
- Rascunho inexistente deve resultar em ausência segura, sem revelar dados de outra conta.

## Isolamento por usuário

- Toda consulta, alteração, exclusão e listagem deve incluir o proprietário autenticado.
- `ownerId` é definido exclusivamente no servidor.
- Listagens nunca podem retornar rascunhos de outra conta.
- Tentativas de acesso cruzado devem retornar ausência indistinguível ou erro de autorização seguro.
- O adaptador de persistência deverá reforçar o isolamento com políticas de banco quando Supabase for implementado.
- Não haverá compartilhamento, organização, equipe ou papel administrativo nesta Sprint.

## Relacionamento com contratos e templates

- Um rascunho representa exatamente um dos quatro tipos de contrato do domínio.
- `contractType` deve corresponder ao discriminador de `content`.
- O rascunho pode referenciar o template usado, mas não deve depender de um template mutável para continuar legível.
- A versão do template utilizada deve ser registrada no rascunho.
- Alterações futuras no template não devem modificar rascunhos existentes.
- A geração pode criar ou atualizar um rascunho, mas a persistência não chama a IA diretamente.
- O repositório não interpreta regras jurídicas nem transforma conteúdo contratual.

## Persistência prevista no Supabase

- O Supabase será um adaptador da interface interna de rascunhos.
- A tabela, schema ou view deverá possuir proprietário, tipo, conteúdo, estado, versão e timestamps.
- RLS deverá impedir leitura e alteração por usuário diferente do proprietário.
- Migrations, índices, políticas, conexão e credenciais só poderão ser criados na Sprint de implementação aprovada.
- Tipos do SDK e consultas Supabase não atravessarão domínio ou aplicação.
- Falhas de conexão, timeout, conflito e ausência serão traduzidas para erros internos estáveis.
- O sistema deverá continuar testável com repositório em memória ou dublê.

## Responsabilidades do domínio

- Definir tipos, estados, transições e invariantes do rascunho.
- Validar coerência entre tipo e conteúdo.
- Impedir transições inválidas e alterações de proprietário.
- Definir semântica de versão e revisão.
- Não conhecer SQL, RLS, Supabase, cookies ou credenciais.

## Responsabilidades da infraestrutura

- Persistir e recuperar rascunhos por contrato interno.
- Aplicar filtros de proprietário e políticas de acesso.
- Implementar transações ou controle de concorrência quando necessário.
- Traduzir erros externos para códigos internos seguros.
- Gerenciar migrations, índices, configuração e conexão somente após autorização.
- Não introduzir regras de contrato ou decisões de ciclo de vida fora do domínio.

## Arquivos autorizados para implementação

Somente após aprovação desta especificação:

- `lib/docai/domain/contract-draft.ts` — entidade, estados e invariantes do rascunho;
- `lib/docai/domain/contract-draft.test.ts` — testes de estados e transições;
- `lib/docai/services/contract-service.ts` — integração do proprietário e ciclo de vida;
- `lib/docai/services/contract-service.test.ts` — testes de regressão e propriedade;
- `lib/docai/application/manage-contract-drafts.ts` — contexto e operações autorizadas;
- `lib/docai/application/manage-contract-drafts.test.ts` — testes de isolamento;
- `lib/docai/infrastructure/persistence/contract-draft-repository.ts` — contrato interno;
- `lib/docai/infrastructure/persistence/supabase-contract-draft-repository.ts` — adaptador Supabase aprovado, incluindo filtros por proprietário;
- `lib/docai/infrastructure/persistence/supabase-contract-draft-repository.test.ts` — testes com dublês;
- `supabase/migrations/` — somente migrations explicitamente aprovadas;
- `PROJECT_STATE.md` — registro do estado após a implementação.

Qualquer necessidade fora desta lista exige revisão formal de escopo.

## Arquivos proibidos

- qualquer arquivo não listado como autorizado;
- `lib/auth/`, middleware e componentes congelados do Starter Kit;
- `lib/persistence/`, `lib/documents/` e `lib/templates/` sem autorização adicional;
- `app/`, `components/`, rotas, Server Actions e interface visual;
- `lib/integrations/` e adaptadores Gemini, Stripe, PDF, e-mail ou storage externo;
- `package.json`, lockfiles, scripts, configurações e variáveis de ambiente;
- migrations, tabelas ou políticas Supabase antes da aprovação da implementação;
- dados reais, credenciais, chaves ou conteúdo contratual de usuários.

## Estratégia de testes

- Criar rascunho com proprietário autenticado.
- Rejeitar proprietário ausente, inválido ou fornecido de forma conflitante pela entrada.
- Validar estados, transições e versão monotônica.
- Consultar, listar, editar, arquivar e recuperar somente pelo proprietário correto.
- Confirmar ausência segura em tentativa de acesso cruzado.
- Confirmar que edição invalida metadados de geração incompatíveis.
- Confirmar conflito de versão sem sobrescrita silenciosa.
- Testar conteúdo dos quatro tipos e compatibilidade com template.
- Executar testes de contrato contra repositório em memória e dublê do Supabase.
- Testar falhas de ausência, conflito, timeout e armazenamento sem rede real.
- Executar regressão dos testes das Sprints 01 e 02.
- Executar typecheck, build e `git diff --check` na implementação.

## Critérios de aceitação

- O modelo de rascunho, estados e transições estão definidos.
- Criação, leitura, listagem, edição, exclusão lógica e recuperação possuem regras explícitas.
- Todo rascunho possui proprietário e não pode ser acessado por outra conta.
- Versão, timestamps e metadados de template são controlados pelo servidor.
- O relacionamento com os quatro tipos e templates é validado.
- O domínio permanece independente de Supabase e SQL.
- O contrato interno permite repositório em memória e adaptador Supabase substituível.
- O contrato específico de rascunho oferece operações owner-scoped e diferencia arquivamento de exclusão definitiva.
- RLS e migrations estão especificados como responsabilidade futura da infraestrutura, sem implementação nesta documentação.
- Erros de ausência, conflito, autorização e armazenamento são previsíveis.
- A estratégia de testes cobre isolamento, ciclo de vida, concorrência e regressão.
- Nenhuma UI, IA real, pagamento ou integração não autorizada é incluída.

## Critérios de encerramento

- Esta especificação for revisada e aprovada explicitamente.
- Todos os critérios de aceitação possuírem evidência na implementação.
- Testes, typecheck, build e `git diff --check` forem aprovados.
- Documentação for reconciliada com o código.
- Commit e push da implementação forem realizados.
- Branch estiver sincronizada com `origin/main` e a árvore limpa.
- Nenhuma alteração fora dos arquivos autorizados for introduzida.

## Dependências da próxima Sprint

A próxima Sprint poderá definir o serviço de geração desacoplado do DocAI. Ela dependerá do contrato persistente, dos estados de rascunho e do controle de propriedade definidos aqui, e deverá especificar retenção, privacidade dos dados enviados à IA, versionamento do resultado e tratamento de falhas antes de qualquer integração Gemini.

## Registro de revisão

A Sprint D03 foi revisada integralmente quanto à consistência técnica, compatibilidade com D01 e D02, arquitetura do Starter Kit, código existente, regras de persistência, isolamento, testes, critérios e dependências. As diferenças entre a persistência atual e o contrato owner-scoped foram registradas acima, e a Sprint D03 está aprovada para implementação conforme os arquivos autorizados.
