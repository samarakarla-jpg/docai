# Roadmap Estratégico

## 1. Objetivo do Roadmap

Este roadmap organiza a evolução do SaaS Starter Kit em fases estratégicas, progressivas e independentes de qualquer domínio de negócio. Seu objetivo é orientar prioridades, explicitar a sequência lógica de amadurecimento da base e apoiar a criação de futuros SaaS sem antecipar requisitos específicos.

As fases representam direções de evolução, não compromissos automáticos de implementação. A presença de um item neste documento não autoriza sua execução. Toda mudança deve ser detalhada em uma Sprint, limitada a uma necessidade concreta e aprovada antes do início do trabalho.

O roadmap deve permanecer:

- genérico o suficiente para servir a diferentes produtos;
- pequeno o suficiente para não impor uma plataforma completa;
- flexível para acomodar necessidades reais ainda desconhecidas;
- alinhado à visão, aos princípios e à especificação do Starter Kit;
- subordinado às decisões aprovadas para cada produto derivado.

## 2. Filosofia de evolução incremental

O Starter Kit deve evoluir do essencial para o opcional. Cada fase consolida uma capacidade de base antes que a próxima seja considerada, evitando dependências prematuras, abstrações especulativas e funcionalidades sem uso demonstrado.

A evolução segue estes princípios:

- começar com a menor fundação executável e compreensível;
- introduzir capacidades somente quando houver necessidade atual;
- dividir cada fase em Sprints pequenas, verificáveis e reversíveis;
- preservar a neutralidade de domínio em todos os elementos reutilizáveis;
- preferir recursos já disponíveis antes de adicionar novas dependências;
- validar uma solução em uso real antes de generalizá-la;
- permitir que itens desnecessários sejam omitidos sem comprometer a base;
- revisar o roadmap quando evidências do projeto alterarem prioridades.

As fases indicam uma ordem de maturidade, não um calendário fixo. Um produto derivado pode permanecer em uma fase pelo tempo necessário e não precisa adotar todos os itens possíveis para avançar.

## 3. Fase 1 — Fundação do projeto

### Objetivo

Estabelecer uma base mínima, executável, documentada e neutra, capaz de iniciar diferentes aplicações SaaS sem carregar decisões de negócio antecipadas.

### Direções estratégicas

- Consolidar a visão, os princípios, a especificação e o processo de trabalho.
- Manter uma estrutura inicial simples e coerente com a stack aprovada.
- Garantir comandos essenciais de desenvolvimento e compilação.
- Definir convenções mínimas de organização, qualidade e colaboração.
- Preservar separação clara entre o Starter Kit e o domínio de cada produto futuro.
- Criar uma referência confiável a partir da qual mudanças pequenas possam ser avaliadas.

### Resultado esperado

Uma fundação compreensível e verificável, pronta para receber requisitos aprovados sem exigir remoção de funcionalidades preventivas ou revisão de abstrações desnecessárias.

## 4. Fase 2 — Infraestrutura básica

### Objetivo

Preparar os mecanismos operacionais mínimos necessários para executar, configurar, verificar e entregar aplicações derivadas com previsibilidade.

### Direções estratégicas

- Definir uma abordagem segura para configurações e variáveis de ambiente.
- Estabelecer verificações automatizadas proporcionais ao risco do projeto.
- Organizar estratégias básicas de tratamento de erros e observabilidade técnica.
- Documentar os ambientes necessários ao ciclo de desenvolvimento e entrega.
- Avaliar automação de integração e entrega somente quando houver fluxo real a sustentar.
- Manter infraestrutura específica de hospedagem, escala ou disponibilidade fora da base até existir uma necessidade aprovada.

### Resultado esperado

Uma operação básica consistente, com configurações compreensíveis, verificações reproduzíveis e condições claras para evoluir sem acoplar o Starter Kit a um provedor ou cenário de escala específico.

## 5. Fase 3 — Serviços reutilizáveis

### Objetivo

Incorporar capacidades de aplicação recorrentes somente quando elas forem necessárias, comprovadamente reutilizáveis e independentes das regras de um produto específico.

### Direções estratégicas

- Identificar serviços transversais a partir de demandas reais de produtos derivados.
- Definir contratos pequenos e responsabilidades bem delimitadas.
- Separar capacidades compartilháveis das regras pertencentes ao domínio.
- Tratar segurança, privacidade, falhas e operação como parte de cada serviço aprovado.
- Evitar generalizar uma solução antes que seu uso demonstre um padrão estável.
- Permitir que cada serviço seja adotado, substituído ou omitido de forma consciente.

### Resultado esperado

Um conjunto enxuto de serviços independentes e documentados, acrescentados por necessidade demonstrada e capazes de reduzir repetição sem transformar o Starter Kit em uma plataforma rígida.

## 6. Fase 4 — Interface reutilizável

### Objetivo

Criar uma base visual e de interação consistente para acelerar interfaces futuras, preservando acessibilidade, composição e liberdade para a identidade de cada produto.

### Direções estratégicas

- Consolidar fundamentos visuais e padrões de interação antes de ampliar componentes.
- Priorizar elementos pequenos, semânticos, acessíveis e combináveis.
- Criar componentes compartilhados somente a partir de usos concretos e repetidos.
- Separar estrutura reutilizável de conteúdo, marca e fluxos específicos.
- Documentar estados, variações e limites dos elementos aprovados.
- Evitar coleções extensas de componentes sem demanda validada.

### Resultado esperado

Uma camada de interface coerente e adaptável, suficiente para reduzir trabalho repetitivo sem impor aparência, navegação ou comportamento de um produto específico.

## 7. Fase 5 — Integrações opcionais

### Objetivo

Permitir a conexão com capacidades externas sem torná-las obrigatórias para o núcleo do Starter Kit ou para todos os produtos derivados.

### Direções estratégicas

- Adicionar integrações somente para casos de uso atuais, documentados e aprovados.
- Manter limites explícitos entre o núcleo, os adaptadores e os provedores externos.
- Avaliar dependências, custos, segurança, privacidade, disponibilidade e manutenção.
- Definir comportamento previsível para falhas e indisponibilidade.
- Evitar que credenciais, contratos proprietários ou decisões de fornecedor contaminem a base.
- Garantir que integrações não essenciais possam ser omitidas ou substituídas.

### Resultado esperado

Integrações isoladas e optativas, adotadas conscientemente por cada produto e incapazes de aumentar a complexidade de quem não precisa delas.

## 8. Critérios para iniciar uma nova fase

Uma nova fase pode ser iniciada quando:

- a fase anterior atingiu os resultados necessários ao contexto atual;
- existe uma necessidade concreta que pertence à nova fase;
- o valor esperado e o problema a resolver estão claramente descritos;
- os limites, riscos e impactos da evolução foram avaliados;
- o trabalho pode ser dividido em uma ou mais Sprints pequenas;
- os critérios de aceitação e a forma de verificação podem ser definidos;
- dependências e configurações necessárias foram identificadas;
- não há conflito com documentos de nível superior;
- o responsável pelo projeto aprovou explicitamente a primeira Sprint da fase.

O início de uma fase não autoriza todos os seus possíveis itens. Somente o escopo da Sprint atual pode ser executado.

## 9. Critérios para considerar uma fase concluída

Uma fase pode ser considerada concluída quando:

- os resultados estratégicos necessários foram alcançados;
- todas as Sprints aprovadas para a fase foram encerradas ou formalmente retiradas;
- os critérios de aceitação aplicáveis foram verificados;
- a base permanece executável, compreensível e neutra em relação ao domínio;
- não existem dependências, configurações ou abstrações sem necessidade demonstrada;
- decisões, limites e formas de uso relevantes estão documentados;
- riscos e pendências conhecidos foram registrados para avaliação futura;
- não existem erros conhecidos que invalidem o objetivo da fase;
- o responsável pelo projeto revisou e aprovou formalmente o encerramento.

Concluir uma fase não significa implementar todas as capacidades imagináveis relacionadas a ela. Significa entregar somente o conjunto necessário para atingir seu objetivo no contexto aprovado.

## 10. Como o Roadmap se relaciona com as Sprints

O roadmap define direção e ordem estratégica. As Sprints transformam essa direção em trabalho autorizado, pequeno e verificável.

Cada Sprint deve:

- estar vinculada a uma única fase predominante;
- declarar objetivo, escopo, entregáveis, limites e critérios de aceitação;
- selecionar apenas o menor recorte necessário do roadmap;
- respeitar a hierarquia documental e as decisões já aprovadas;
- não antecipar itens de fases ou Sprints futuras;
- terminar com verificação e aprovação explícita.

Uma fase normalmente contém várias Sprints, e uma Sprint não precisa concluir uma fase inteira. Descobertas realizadas durante o trabalho podem orientar o planejamento futuro, mas não ampliam automaticamente o escopo atual.

O roadmap responde **para onde o Starter Kit pode evoluir**. A Sprint responde **qual mudança está autorizada agora**. Em caso de conflito, a visão, os princípios, a especificação e o escopo aprovado da Sprint determinam os limites do trabalho.

## 11. Sequência proposta para concluir a versão 1.0

Esta seção organiza o recorte técnico restante proposto para a versão 1.0. Ela considera as Sprints 01 a 04 encerradas e distribui o trabalho remanescente entre as Fases 3, 4 e 5.

As Sprints 05, 06 e 07 descritas abaixo estão em **planejamento**. Elas ainda deverão receber documentos próprios, arquivos autorizados, requisitos detalhados, comandos de validação e aprovação explícita. A inclusão neste roadmap não autoriza código, dependências, configurações, integrações, commit, push ou publicação.

### Ordem de execução

1. **Sprint 05 — Persistência reutilizável:** consolidar a fronteira de armazenamento demonstrada pelos serviços existentes.
2. **Sprint 06 — Interface reutilizável:** estruturar a experiência autenticada sobre capacidades já disponíveis e fronteiras estáveis.
3. **Sprint 07 — Integrações opcionais e fechamento da versão 1.0:** definir portas optativas, validar a base completa e documentar sua adoção.

A ordem é obrigatoriamente sequencial. Cada Sprint somente poderá ser detalhada e iniciada depois que a anterior estiver encerrada ou quando uma revisão formal deste roadmap justificar outra decisão. Trabalho de uma Sprint posterior não poderá ser antecipado para facilitar a Sprint atual.

### Sprint 05 — Persistência reutilizável

**Fase predominante:** Fase 3 — Serviços reutilizáveis.

#### Objetivo

Consolidar uma fronteira mínima e reutilizável de persistência a partir das necessidades já demonstradas por `TemplateService` e `DocumentService`, permitindo repositórios substituíveis sem vincular os contratos internos a Supabase, SQL, ORM, sistema de arquivos ou banco específico.

A Sprint deverá reduzir duplicação real sem transformar toda capacidade em CRUD genérico. Validação, existência, conflito e tradução de falhas continuarão sob responsabilidade dos serviços consumidores quando fizerem parte de seus casos de uso.

#### Dependências

- Sprints 03 e 04 encerradas, com contratos e testes preservados como linha de base.
- Padrão repetido de armazenamento avaliado antes da extração de qualquer abstração.
- Decisão explícita, no documento da Sprint, sobre compatibilidade e transição dos contratos públicos existentes.
- Node.js, TypeScript e recursos de teste já disponíveis no projeto.
- Aprovação prévia de qualquer arquivo adicional, mudança pública, dependência ou configuração que o detalhamento venha a exigir.

#### Entregas

- Interface genérica de armazenamento limitada às operações comprovadamente comuns aos serviços existentes.
- Repositórios substituíveis por contrato, com tipos de entidade e identificador explícitos.
- Adaptação mínima dos limites de armazenamento de templates e documentos, somente se reduzir duplicação sem remover responsabilidades próprias dos serviços.
- Testes de contrato reutilizáveis para verificar comportamento observável de implementações de repositório.
- Implementação controlada em memória restrita à validação dos testes, sem ser apresentada como persistência de produção.
- Regras estáveis para ausência, conflito, falha e preservação de dados nas operações comuns.
- Documentação da fronteira que permita um futuro adaptador Supabase depender do contrato interno, sem introduzir referência a Supabase no núcleo.

#### Ordem de execução

1. Comparar os contratos de armazenamento das Sprints 03 e 04 e registrar somente invariantes realmente comuns.
2. Definir a menor interface genérica e a estratégia de compatibilidade dos contratos existentes.
3. Adaptar os consumidores autorizados sem mover validações ou regras próprias para o repositório.
4. Criar a suíte de contrato e validá-la com implementação controlada em memória.
5. Executar regressão dos serviços, typecheck, build e revisão integral de escopo.

#### Fora do escopo

- Adaptador Supabase ou integração com qualquer banco real.
- Tabelas, schemas, migrations, seeds, queries, políticas de acesso ou credenciais.
- Banco de dados de produto ou modelos específicos de domínio.
- Cache, paginação, busca, filtros, transações distribuídas, filas ou sincronização offline.
- Unit of Work, ORM genérico, Active Record, service locator ou contêiner de dependências.
- Alteração de autenticação, interface, rotas, Server Actions ou middleware.
- Integração dos serviços com consumidores de produção.
- Instalação ou atualização de dependências e alteração preventiva de configurações.

#### Riscos

- **Abstração excessiva:** uma interface ampla pode esconder diferenças legítimas entre templates e documentos. A mitigação é extrair somente operações idênticas já exercitadas e manter regras específicas nos serviços.
- **Mudança incompatível:** substituir contratos públicos pode quebrar consumidores futuros ou testes existentes. A mitigação é definir estratégia de compatibilidade e validar regressão antes de alterar assinaturas.
- **Acoplamento indireto ao Supabase:** nomes ou formatos orientados pelo fornecedor podem contaminar o núcleo. A mitigação é definir o contrato pela necessidade dos consumidores e deixar qualquer adaptador para Sprint própria.
- **Testes autorreferentes:** um teste de contrato pode apenas reproduzir a implementação em memória. A mitigação é testar resultados, falhas e invariantes exigidos de qualquer repositório.
- **Falsa promessa de persistência:** uma implementação em memória pode ser confundida com solução operacional. A mitigação é restringi-la aos testes e documentar explicitamente sua finalidade.

#### Critérios de aceitação

- Existe uma única fronteira genérica de armazenamento, pequena e independente de fornecedor.
- A interface contém somente operações justificadas pelos contratos já implementados.
- `TemplateService` e `DocumentService` preservam comportamento público, validações e categorias de erro aprovadas.
- Repositórios podem ser substituídos sem mudança nos serviços consumidores.
- A suíte de contrato pode ser aplicada a diferentes implementações sem rede, credenciais ou banco real.
- Testes existentes e novos testes de contrato, typecheck e build terminam sem erro impeditivo.
- Nenhum nome, dado, regra ou estrutura de produto é introduzido.
- Nenhuma dependência, configuração, manifesto, lockfile ou variável de ambiente é alterada sem autorização explícita.
- Não existe adaptador Supabase nem referência de fornecedor no contrato interno.
- O diff contém somente os arquivos que vierem a ser autorizados em `SPRINT_05.md`.

#### Relação com as Sprints anteriores

- Generaliza somente o padrão real demonstrado separadamente nas Sprints 03 e 04.
- Preserva a neutralidade, o conteúdo opaco e a injeção explícita já adotados.
- Não altera a autenticação da Sprint 02 nem transforma o Supabase Auth existente em mecanismo de persistência de produto.
- Fornece uma fronteira estável que poderá ser consumida por adaptadores futuros, sem obrigar a Sprint 06 a conhecer infraestrutura.

#### Critérios de conclusão

A Sprint 05 poderá ser considerada tecnicamente concluída quando todas as entregas aprovadas em seu documento próprio estiverem presentes, os contratos anteriores permanecerem compatíveis conforme a decisão aprovada, os testes de contrato e regressão passarem, typecheck e build tiverem resultado conhecido, não houver dependência de banco específico e somente arquivos autorizados tiverem sido alterados. O encerramento dependerá de revisão e aprovação explícita.

### Sprint 06 — Interface reutilizável

**Fase predominante:** Fase 4 — Interface reutilizável.

#### Objetivo

Criar a menor base autenticada de layout, navegação e componentes de interface capaz de reduzir repetição já existente, mantendo semântica, acessibilidade, responsividade e liberdade de identidade visual para produtos derivados.

A Sprint deverá compor capacidades reais da fundação sem criar dashboard de produto, catálogo amplo de componentes ou design system completo.

#### Dependências

- Sprint 05 encerrada e fronteiras internas estáveis, ainda que não sejam integradas à interface nesta Sprint.
- Fluxo de autenticação e dashboard da Sprint 02 preservados como contexto real de uso.
- Repetições existentes nas páginas de autenticação e na área protegida revisadas antes da escolha de componentes compartilhados.
- Diretrizes de `UI_GUIDELINES.md` utilizadas como contrato de revisão visual e de interação.
- Definição, no documento da Sprint, dos componentes estritamente necessários e de todos os arquivos autorizados.

#### Entregas

- Layout base autenticado, neutro e compatível com o App Router.
- Navegação principal mínima, com indicação do destino atual e ação de encerramento de sessão, sem links para funcionalidades inexistentes.
- Componentes essenciais extraídos apenas de padrões já repetidos, com contratos pequenos e composição explícita.
- Padrões reutilizáveis para loading, estado vazio, erro e sucesso, aplicados a contextos reais e sem mensagens específicas de produto.
- Comportamento responsivo para larguras reduzidas, intermediárias e amplas.
- Semântica, ordem de leitura, navegação por teclado, foco visível, nomes acessíveis e contraste adequados.
- Preservação dos fluxos de cadastro, login, logout e proteção do dashboard.
- Documentação dos limites, estados e responsabilidades dos elementos compartilhados aprovados.

#### Ordem de execução

1. Revisar repetições e comportamentos reais das páginas de autenticação e do dashboard.
2. Definir o layout autenticado e a navegação mínima sem criar destinos futuros.
3. Extrair somente componentes essenciais e contratos de estados com consumidores aprovados.
4. Aplicar os elementos compartilhados preservando os limites de servidor e cliente.
5. Validar regressão funcional, responsividade, acessibilidade, typecheck, build e escopo.

#### Fora do escopo

- Identidade visual, marca, paleta ou conteúdo de produto específico.
- Dashboard analítico, métricas, gráficos, tabelas de negócio ou dados simulados de produto.
- Rotas vazias, links sem destino ou navegação criada para funcionalidades futuras.
- Biblioteca extensa de componentes, design system completo ou catálogo de variações hipotéticas.
- Temas, dark mode, internacionalização ou personalização por organização.
- Integração visual com templates, documentos ou persistência.
- Mudanças em autenticação, sessão, autorização ou contratos de serviços.
- Nova biblioteca de componentes, ícones, acessibilidade, testes visuais ou estilos.
- Alteração de dependências e configurações sem autorização específica.

#### Riscos

- **Design system prematuro:** muitos componentes ou variantes aumentam manutenção sem uso. A mitigação é limitar a Sprint a padrões repetidos e estados exigidos.
- **Navegação artificial:** links para áreas inexistentes criam expectativa falsa. A mitigação é exibir somente destinos reais e aprovados.
- **Acoplamento à marca:** decisões visuais específicas reduzem reutilização. A mitigação é utilizar tokens e linguagem visual neutros já disponíveis.
- **Regressão de autenticação:** reorganizar layouts pode alterar formulários, redirecionamentos ou logout. A mitigação é preservar os limites de servidor e repetir a validação dos fluxos existentes.
- **Acessibilidade incompleta:** aparência correta pode ocultar falhas de teclado, foco ou semântica. A mitigação é exigir inspeção manual e evidência individual para cada aspecto aplicável.
- **Estados sem contexto real:** componentes demonstrativos podem virar código sem uso. A mitigação é aplicar cada estado somente a um fluxo existente e aprovado.

#### Critérios de aceitação

- A área autenticada utiliza um layout base neutro, sem regra ou identidade específica de produto.
- A navegação contém somente destinos existentes, identifica o contexto atual e funciona por teclado.
- Apenas componentes essenciais com reutilização comprovada são compartilhados.
- Loading, vazio, erro e sucesso possuem semântica e mensagens neutras, sem exposição de detalhes técnicos.
- Cadastro, login, dashboard e logout preservam seus comportamentos aprovados.
- A interface permanece utilizável e sem perda de conteúdo em larguras reduzidas, intermediárias e amplas.
- Foco, ordem de tabulação, contraste, rótulos, landmarks e anúncios de estado são verificados.
- Não existe biblioteca visual nova, página de produto ou variação sem consumidor real.
- Typecheck, build e testes aplicáveis concluem sem erro impeditivo.
- O diff contém somente os arquivos que vierem a ser autorizados em `SPRINT_06.md`.

#### Relação com as Sprints anteriores

- Reutiliza o fluxo autenticado da Sprint 02 como primeiro contexto real da camada visual.
- Mantém os serviços das Sprints 03 e 04 fora da apresentação enquanto não houver caso de uso aprovado para integrá-los.
- Depende da estabilidade arquitetural alcançada na Sprint 05, mas não acessa repositórios ou infraestrutura diretamente.
- Concretiza a Fase 4 sem modificar as responsabilidades das camadas de aplicação e infraestrutura.

#### Critérios de conclusão

A Sprint 06 poderá ser considerada tecnicamente concluída quando o layout, a navegação, os componentes e os quatro estados aprovados estiverem aplicados a contextos reais; os fluxos existentes permanecerem funcionais; responsividade e acessibilidade possuírem evidência; typecheck, build e testes aplicáveis tiverem resultado conhecido; e somente arquivos autorizados tiverem sido alterados. O encerramento dependerá de revisão e aprovação explícita.

### Sprint 07 — Integrações opcionais e fechamento da versão 1.0

**Fase predominante:** Fase 5 — Integrações opcionais, com encerramento da versão 1.0.

#### Objetivo

Definir fronteiras optativas e independentes de fornecedor para capacidades externas recorrentes, mantê-las desativadas por padrão e concluir a versão 1.0 com validação integral, documentação de clonagem e critérios objetivos de estabilidade.

A Sprint deverá tornar explícito como produtos derivados podem conectar IA, pagamentos, PDF, e-mail e armazenamento externo sem transformar essas integrações em dependências obrigatórias nem afirmar que provedores concretos fazem parte da versão 1.0.

#### Dependências

- Sprints 05 e 06 encerradas.
- Sprints 01 a 04 preservadas e sem regressão conhecida.
- Responsabilidades entre aplicação, infraestrutura e apresentação confirmadas.
- Decisão explícita sobre o contrato mínimo de cada capacidade opcional antes da criação de arquivos.
- Estratégia de configuração por ambiente definida sem expor segredos ao cliente.
- Lista completa de documentação e verificações necessárias para uma clonagem limpa.
- Aprovação individual de qualquer dependência ou configuração que o documento da Sprint venha a propor; o planejamento atual não as autoriza.

#### Entregas

- Contrato mínimo e independente de fornecedor para capacidade de IA.
- Contrato mínimo e independente de fornecedor para pagamentos.
- Contrato mínimo e independente de fornecedor para geração ou manipulação de PDF.
- Contrato mínimo e independente de fornecedor para envio de e-mail.
- Contrato mínimo e independente de fornecedor para armazenamento externo de objetos ou arquivos.
- Distinção explícita entre armazenamento externo de arquivos nesta Sprint e persistência de entidades definida na Sprint 05.
- Mecanismo previsível para manter cada capacidade desativada por padrão e falhar de forma segura quando não configurada.
- Configuração por ambiente com validação de presença e formato, sem valores reais, segredos ou credenciais no repositório.
- Testes de contrato e de estado desativado executáveis sem chamar provedores externos.
- Documentação de clonagem, instalação reproduzível, configuração mínima, execução, validação e remoção ou substituição de capacidades opcionais.
- Checklist final de segurança, neutralidade, dependências, build, testes, acessibilidade e estado do repositório.
- Critérios objetivos para declarar o Starter Kit estável e preparar a versão 1.0.

#### Ordem de execução

1. Confirmar a necessidade e o menor caso de uso de cada capacidade opcional antes de definir seu contrato.
2. Criar contratos independentes entre si e sem tipos de fornecedor.
3. Definir e testar o estado desativado e a configuração segura por ambiente.
4. Documentar clonagem, configuração mínima, substituição e limites das capacidades.
5. Executar a validação completa em ambiente limpo e reconciliar somente documentação autorizada.
6. Apresentar evidências de estabilidade para aprovação, sem criar tag, release ou publicação automaticamente.

#### Fora do escopo

- Adaptador ou SDK concreto de IA, pagamentos, PDF, e-mail ou armazenamento externo.
- Chamadas reais a modelos, gateways de pagamento, renderizadores, provedores de e-mail ou serviços de objetos.
- Chaves, credenciais, webhooks, contas de fornecedor ou provisionamento de infraestrutura.
- Cobrança real, geração real de documento, envio real de mensagem ou upload real de arquivo.
- Fluxos de produto, telas específicas, dados de domínio ou integrações habilitadas por padrão.
- Marketplace de integrações, sistema de plugins ou registro dinâmico de provedores.
- Telemetria, analytics, monitoramento de produção ou garantia de escala.
- Publicação automática de release, deploy, pacote, imagem ou ambiente.
- Dependências adicionadas somente para representar contratos que podem ser expressos com TypeScript e recursos existentes.
- Funcionalidades posteriores à versão 1.0.

#### Riscos

- **Contratos especulativos:** cinco capacidades sem adaptadores podem produzir APIs sem consumidor. A mitigação é limitar cada porta ao menor caso de uso explícito da fundação, revisar sua necessidade no documento da Sprint e retirar formalmente qualquer contrato sem requisito verificável.
- **Sprint ampla demais:** múltiplos contratos e fechamento podem comprometer revisão. A mitigação é manter cada capacidade independente, sem implementação concreta, e dividir formalmente a Sprint antes da aprovação se os arquivos ou critérios não permanecerem pequenos.
- **Configuração insegura:** flags e segredos podem atravessar a fronteira do cliente. A mitigação é manter configuração sensível no servidor, validar valores e versionar somente nomes e exemplos vazios.
- **Dependência opcional tornar-se obrigatória:** imports ou inicialização podem quebrar clones sem configuração. A mitigação é exigir build e execução básica com todas as integrações desativadas.
- **Sobreposição de armazenamento:** persistência de entidades e objetos externos podem ser confundidas. A mitigação é manter contratos, nomes e responsabilidades separados.
- **Versão 1.0 declarada sem evidência:** documentação ou build isolados não comprovam estabilidade. A mitigação é exigir clonagem limpa, validações completas e encerramento formal de todas as Sprints planejadas.

#### Critérios de aceitação

- IA, pagamentos, PDF, e-mail e armazenamento externo possuem contratos separados, pequenos e independentes de fornecedor.
- Nenhum contrato expõe tipos proprietários, credenciais ou respostas brutas de provedor.
- Todas as integrações permanecem desativadas por padrão e a base compila e executa sem configurá-las.
- O estado desativado e falhas de configuração são previsíveis, seguros e cobertos por testes.
- Configurações sensíveis permanecem no servidor e nenhum segredo é versionado.
- Não existe adaptador concreto, SDK novo, chamada externa ou efeito real de integração.
- A documentação permite clonar, instalar, configurar o mínimo obrigatório, executar, testar e adaptar o Starter Kit.
- Testes completos, typecheck e build passam em ambiente limpo; lint é executado ou sua ausência é declarada.
- Responsividade e acessibilidade da interface reutilizável são revalidadas.
- A árvore de trabalho está limpa, sem artefatos temporários ou arquivos sensíveis.
- Todas as Sprints da versão 1.0 possuem status, evidências e aprovação explícita.
- O Starter Kit permanece neutro e utilizável sem regras específicas de produto.

#### Relação com as Sprints anteriores

- Usa a direção de dependências e a substituição de infraestrutura consolidadas na Sprint 05.
- Preserva a interface reutilizável e os limites de cliente e servidor validados na Sprint 06.
- Mantém autenticação, templates e documentos independentes das integrações opcionais.
- Não converte o Supabase Auth existente em fornecedor obrigatório para outras capacidades.
- Fecha a sequência iniciada pela fundação da Sprint 01 sem transformar o Starter Kit em um SaaS completo.

#### Critérios de conclusão

A Sprint 07 poderá ser considerada tecnicamente concluída quando todos os contratos opcionais aprovados forem independentes e desativados por padrão; nenhuma integração concreta ou segredo tiver sido incluído; a documentação de clonagem tiver sido verificada em ambiente limpo; testes, typecheck, build e revisões de interface tiverem resultado conhecido; todos os critérios de estabilidade estiverem evidenciados; e somente arquivos autorizados tiverem sido alterados. O encerramento da Sprint e a declaração da versão 1.0 dependerão de revisão e aprovação explícita separadas.

### Critérios de estabilidade da versão 1.0

A versão 1.0 poderá ser proposta como estável somente quando:

- as Sprints 01 a 07 estiverem encerradas ou itens formalmente retirados estiverem registrados;
- uma clonagem limpa puder instalar as versões bloqueadas sem modificar o lockfile;
- a aplicação puder ser compilada e executada seguindo exclusivamente a documentação;
- autenticação tiver pré-requisitos, configuração e limitações documentados;
- contratos de serviços, persistência e integrações permanecerem neutros e substituíveis;
- capacidades opcionais não forem necessárias para build ou execução básica;
- todos os testes, typecheck, build e lint disponível tiverem resultado conhecido e sem erro impeditivo;
- interface autenticada tiver evidências de responsividade e acessibilidade básica;
- nenhuma credencial, segredo, dado real, artefato temporário ou arquivo pendente existir no repositório;
- documentação de visão, arquitetura, estado, clonagem e uso estiver coerente com o comportamento real;
- não houver funcionalidade de produto, dependência sem uso ou abstração sem justificativa atual;
- riscos e limitações conhecidos estiverem registrados;
- o responsável pelo projeto aprovar explicitamente a estabilidade e a preparação da versão 1.0.

O atendimento desses critérios não autoriza por si só criar tag, release, pacote, deploy ou publicação. Cada operação exige solicitação específica.
