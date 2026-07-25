# Sprint 06 — Camada visual reutilizável

**Sprint:** `06 — Camada visual reutilizável`

**Fase do Roadmap:** `Fase 4 — Interface reutilizável`

**Status:** `encerrada`

Este documento definiu o recorte da camada visual reutilizável do SaaS Starter Kit. A implementação foi concluída, validada e registrada no commit `656a13d9f5ed89783af1c811f1a5a4b8ec358c5e`. O plano aprovado é preservado abaixo como registro dos limites aplicados durante a execução. O encerramento desta Sprint não autoriza alteração de dependências ou configurações, nova implementação, commit, push, publicação ou início da Sprint 07.

# Objetivo

Implementar uma base visual autenticada, neutra e reutilizável para reduzir repetição real na área protegida do SaaS Starter Kit, com layout, header, sidebar, navegação, conteúdo principal e estados fundamentais de interface. Ao final da Sprint, o dashboard existente deverá preservar seu comportamento de autenticação enquanto utiliza uma composição responsiva, semântica e acessível, preparada para receber conteúdo futuro sem impor identidade visual, regras ou fluxos de um produto específico.

O resultado deverá consolidar somente padrões visuais compatíveis com a autenticação e o dashboard já existentes. Não deverá criar um design system completo, rotas futuras, conteúdo de produto ou integrações adicionais.

# Escopo

- Criar uma composição reutilizável para a área autenticada, mantendo a verificação de sessão e a direção de dependências do App Router.
- Definir um header neutro com identificação contextual, ação de logout compatível com o fluxo existente e comportamento acessível.
- Definir uma sidebar com navegação somente para destinos reais e aprovados, indicação do destino atual e adaptação para telas menores.
- Organizar uma área principal semântica para título, contexto, ações e conteúdo fornecido pelas rotas consumidoras.
- Criar componentes visuais pequenos e combináveis para a composição autenticada, sem criar biblioteca extensa ou variações hipotéticas.
- Criar um componente neutro de estados para loading, vazio, erro e sucesso, com mensagens fornecidas pelo consumidor e sem detalhes técnicos expostos.
- Integrar a composição à rota existente de dashboard, preservando sessão, redirecionamento, logout e conteúdo neutro já aprovados.
- Criar estados de carregamento e erro do segmento autenticado quando necessários ao comportamento do App Router.
- Aplicar responsividade para larguras mobile e desktop, incluindo navegação compacta sem perda de conteúdo ou ação.
- Verificar semântica, landmarks, foco, teclado, rótulos, contraste e anúncios de estado conforme `UI_GUIDELINES.md`.
- Manter as páginas de cadastro e login compatíveis e inalteradas em seu contrato, ações, validações e fluxo.

O escopo visual não autoriza alteração de autenticação, serviços reutilizáveis, persistência, contratos de dados ou configurações de estilo fora dos arquivos listados.

# Entregas

## Entrega 1 — Layout autenticado

- Um layout específico do segmento protegido que componha header, sidebar e área principal.
- Regiões semânticas identificáveis, ordem de leitura lógica e um mecanismo de salto para o conteúdo principal quando aplicável.
- Composição independente de regras de negócio, serviços de persistência e conteúdo específico de produto.
- Uso como Server Component por padrão, criando limite de cliente somente para interação local de navegação.

## Entrega 2 — Header, sidebar e navegação

- Header com contexto atual, identificação neutra e logout acessível.
- Sidebar com navegação mínima para rotas existentes, sem links vazios ou destinos futuros.
- Indicação textual e semântica do destino atual.
- Navegação mobile com abertura, fechamento e foco previsíveis, sem bloquear o conteúdo quando fechada.
- Navegação desktop com largura e hierarquia estáveis, sem níveis profundos ou ações concorrentes desnecessárias.

## Entrega 3 — Componentes e estados

- Componentes de composição com contratos pequenos e props explícitas.
- Um contrato visual reutilizável para loading, estado vazio, erro e sucesso.
- Loading que preserve a estrutura e informe espera perceptível.
- Estado vazio que explique ausência sem inventar dados ou regra de produto.
- Estado de erro que ofereça mensagem compreensível e recuperação quando possível, sem expor detalhes internos.
- Estado de sucesso que confirme uma conclusão no contexto da ação.
- Estados com semântica, contraste e anúncios apropriados, sem depender somente de cor.

## Entrega 4 — Integração e compatibilidade

- Dashboard existente integrado à nova composição, preservando sua verificação server-side e o redirecionamento para login.
- Logout preservado e disponível na composição autenticada.
- Cadastro e login existentes preservados quanto a ações, validações, mensagens, foco e navegação entre páginas.
- Página pública inicial e rotas de autenticação sem dependência da área protegida.
- Nenhuma alteração em contratos do `TemplateService`, `DocumentService` ou da camada de persistência.

# Fora do Escopo

- Qualquer regra, nome, conteúdo, fluxo ou identidade específica do DocAI ou de outro produto derivado.
- Inteligência artificial, prompts, agentes, embeddings ou geração de conteúdo.
- Pagamentos, assinaturas, faturamento, planos ou Stripe.
- Criação, leitura, conversão, renderização ou exportação de PDF.
- Envio de e-mail, notificações, filas ou comunicação externa.
- Banco de dados de produto, persistência de domínio, repositórios, migrations, schemas ou consultas.
- Novas integrações externas, provedores de autenticação ou alterações no Supabase Auth existente.
- Alteração de sessão, autorização, middleware, Server Actions ou contratos da Sprint 02.
- Dashboard analítico, métricas, gráficos, tabelas de negócio, cards de produto ou dados simulados.
- Rotas vazias, links sem destino, menus para funcionalidades futuras ou navegação artificial.
- Biblioteca extensa de componentes, design system completo ou catálogo de variações não utilizadas.
- Identidade visual de produto, logotipo, paleta de marca, tema, dark mode ou personalização por organização.
- Internacionalização, multi-tenancy, preferências de usuário ou gestão de perfil.
- Integração visual com templates, documentos, persistência ou serviços de aplicação.
- Upload, download, armazenamento externo ou manipulação de arquivos.
- Paginação, busca, filtro, ordenação ou estados de dados que não existam em um consumidor aprovado.
- Telemetria, analytics, logs de produto, monitoramento ou otimização preventiva.
- Instalação, remoção ou atualização de dependências.
- Alteração de scripts, manifestos, lockfiles, configurações, arquivos de ambiente ou `app/globals.css`.
- Atualização de documentação fora deste arquivo.
- Qualquer funcionalidade da Sprint 07 ou preparação de contratos para suas integrações opcionais.

# Requisitos

- **REQ-01 — Neutralidade visual:** os componentes não deverão conter marca, cor, conteúdo, regra ou fluxo específico de produto.
- **REQ-02 — Layout autenticado:** a área protegida deverá possuir header, sidebar, navegação e uma região principal semântica com composição explícita.
- **REQ-03 — Navegação real:** a navegação deverá apontar somente para rotas existentes e indicar o destino atual sem criar expectativa de funcionalidades futuras.
- **REQ-04 — Responsividade:** a composição deverá permanecer utilizável em larguras mobile, intermediárias e desktop, adaptando densidade e navegação sem ocultar ações essenciais.
- **REQ-05 — Componentes pequenos:** componentes compartilhados deverão possuir uma responsabilidade visual clara, contratos pequenos e composição explícita.
- **REQ-06 — Estados fundamentais:** loading, vazio, erro e sucesso deverão possuir representação reutilizável, mensagens neutras e semântica adequada.
- **REQ-07 — Acessibilidade estrutural:** landmarks, títulos, ordem de tabulação, foco visível, teclado, rótulos e estados anunciados deverão ser considerados em cada interação.
- **REQ-08 — Contraste e cor:** texto, controles, foco e estados deverão manter contraste suficiente e não depender apenas de cor para transmitir significado.
- **REQ-09 — Limite cliente-servidor:** Server Components deverão permanecer como padrão; estado local de menu ou interação deverá ficar no menor limite de cliente necessário.
- **REQ-10 — Autenticação preservada:** a verificação server-side, redirecionamento, logout e sessão do dashboard deverão permanecer compatíveis com a Sprint 02.
- **REQ-11 — Compatibilidade pública:** páginas de cadastro e login, ações, validações, mensagens e navegação existentes deverão continuar funcionando sem alteração de contrato.
- **REQ-12 — Conteúdo neutro:** a composição deverá receber conteúdo por composição ou props, sem buscar dados de produto nem inventar entidades de domínio.
- **REQ-13 — Estados seguros:** mensagens de erro não deverão expor stack trace, credenciais, detalhes de fornecedor ou dados internos.
- **REQ-14 — Dependências controladas:** a Sprint deverá utilizar somente React, Next.js, TypeScript, Tailwind CSS e recursos já disponíveis.
- **REQ-15 — Escopo de arquivos:** somente os arquivos autorizados poderão ser criados ou modificados; nenhum arquivo de autenticação, serviço, configuração ou documentação será alterado.
- **REQ-16 — Regressão:** a base deverá continuar compilável e as páginas de autenticação existentes deverão permanecer compatíveis após a integração visual.

# Arquivos autorizados para alteração

Após a aprovação explícita desta Sprint, somente os arquivos abaixo poderão ser criados ou modificados durante a implementação:

| Arquivo | Ação autorizada | Finalidade |
| --- | --- | --- |
| `app/dashboard/layout.tsx` | criar | Compor o layout autenticado do segmento protegido. |
| `app/dashboard/loading.tsx` | criar | Exibir loading estrutural neutro durante carregamento do segmento autenticado. |
| `app/dashboard/error.tsx` | criar | Exibir erro recuperável e neutro no limite de erro do segmento autenticado. |
| `app/dashboard/page.tsx` | modificar | Integrar o dashboard existente à área principal e aos estados aprovados, preservando autenticação e logout. |
| `components/layout/authenticated-layout.tsx` | criar | Fornecer a composição reutilizável de regiões autenticadas e interação mobile local. |
| `components/layout/header.tsx` | criar | Fornecer header neutro, contexto e ação de logout acessível. |
| `components/layout/sidebar.tsx` | criar | Fornecer sidebar e navegação mínima para destinos reais. |
| `components/ui/status-state.tsx` | criar | Fornecer estados reutilizáveis de loading, vazio, erro e sucesso. |

Regras adicionais:

- A pasta `components/` somente poderá existir porque conterá os quatro arquivos autorizados.
- `components/layout/authenticated-layout.tsx` poderá utilizar estado de cliente somente para abrir, fechar e controlar foco da navegação mobile.
- `components/ui/status-state.tsx` será visual e neutro; não poderá acessar autenticação, persistência, serviços ou APIs externas.
- `app/dashboard/layout.tsx` deverá preservar a fronteira do App Router e não poderá duplicar regras de autenticação sem necessidade aprovada.
- `app/dashboard/error.tsx` deverá limitar-se ao tratamento visual e à recuperação prevista pelo contrato de erro do segmento.
- As páginas `app/(auth)/cadastro/page.tsx` e `app/(auth)/login/page.tsx` deverão ser somente referências de compatibilidade e permanecerão inalteradas nesta Sprint.
- Nenhum `index.ts`, barrel, biblioteca de componentes, arquivo de teste visual ou arquivo auxiliar adicional está autorizado.
- Se a solução exigir qualquer nono arquivo, a implementação deverá parar até revisão formal e nova aprovação.

# Arquivos proibidos

Todo arquivo não listado na seção anterior é proibido por padrão. Em especial, não poderão ser alterados:

- `app/(auth)/cadastro/page.tsx` e `app/(auth)/login/page.tsx`;
- `app/actions/auth.ts`, `lib/auth/` e `middleware.ts`;
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css` e `app/favicon.ico`;
- `lib/templates/`, `lib/documents/`, `lib/persistence/` e qualquer serviço ou contrato existente;
- `public/` e qualquer recurso estático;
- `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs` e `next-env.d.ts`;
- `.env.example`, `.env.local` e qualquer arquivo de ambiente;
- `README.md`, `PROJECT_STATE.md`, `VISION.md`, `PROJECT_PRINCIPLES.md`, `PRODUCT_SPEC.md`, `ARCHITECTURE.md`, `UI_GUIDELINES.md`, `CODE_STYLE.md`, `DEVELOPMENT_WORKFLOW.md`, `AI_RULES.md`, `MASTER_PROMPT.md` e `ROADMAP.md`;
- `SPRINT_01.md`, `SPRINT_02.md`, `SPRINT_03.md`, `SPRINT_04.md`, `SPRINT_05.md`, `SPRINT_07.md`, `TEMPLATE_SPRINT.md`, `TEMPLATE_COMPONENT.md`, `TEMPLATE_SERVICE.md`, `TEMPLATE_PRODUCT.md` e demais documentos ou templates;
- `.gitignore`, qualquer arquivo dentro de `.git/`, artefatos gerados, `.next/` e `tsconfig.tsbuildinfo`;
- qualquer adaptador externo, contrato de IA, pagamentos, PDF, e-mail, armazenamento externo ou funcionalidade de produto.

# Critérios de Aceitação

- **CA-01 — Estrutura autenticada:** o dashboard utiliza layout com header, sidebar, navegação e região principal semântica.
- **CA-02 — Header neutro:** o header fornece contexto, identidade neutra e logout acessível sem regra de produto.
- **CA-03 — Sidebar e navegação:** a sidebar possui somente destinos reais, marca o destino atual e oferece comportamento previsível em desktop e mobile.
- **CA-04 — Conteúdo principal:** a região principal recebe conteúdo por composição, mantém hierarquia de títulos e não acessa dados de produto.
- **CA-05 — Componentes reutilizáveis:** os componentes autorizados possuem responsabilidades isoladas, props explícitas e nenhuma variação sem consumidor real.
- **CA-06 — Loading:** existe estado de loading estrutural, neutro e sem mudança brusca de layout no segmento autenticado.
- **CA-07 — Estado vazio:** existe representação neutra de ausência, sem dados simulados, regra de produto ou ação inexistente.
- **CA-08 — Estado de erro:** existe estado de erro compreensível, recuperável quando possível e sem detalhes técnicos expostos.
- **CA-09 — Estado de sucesso:** existe confirmação contextual de conclusão sem depender apenas de cor ou mensagem temporária.
- **CA-10 — Responsividade mobile:** em largura reduzida, conteúdo e ações permanecem disponíveis, a navegação pode ser compactada e não há rolagem horizontal indevida.
- **CA-11 — Responsividade desktop:** em largura ampla, header, sidebar e conteúdo mantêm hierarquia, legibilidade e densidade adequada.
- **CA-12 — Acessibilidade:** landmarks, títulos, foco, teclado, `aria-current`, rótulos, contraste e anúncios de estados são verificáveis.
- **CA-13 — Compatibilidade de autenticação:** cadastro, login, logout, sessão e redirecionamento do dashboard permanecem funcionais e sem alteração de contrato.
- **CA-14 — Neutralidade e exclusões:** não existem DocAI, IA, pagamentos, PDF, e-mail, banco de produto, integração externa ou identidade específica.
- **CA-15 — Dependências:** nenhum pacote, script, manifesto, lockfile, configuração ou arquivo de ambiente foi criado ou alterado.
- **CA-16 — Arquivos e arquitetura:** somente os oito arquivos autorizados foram afetados, sem barrel, serviço, integração ou dependência circular.
- **CA-17 — Qualidade:** typecheck, build e testes aplicáveis concluem sem erro impeditivo; a ausência de lint oficial é declarada.
- **CA-18 — Regressão:** testes dos serviços de templates, documentos e persistência continuam aprovados, quando executados como regressão.
- **CA-19 — Ausência de antecipação:** nenhuma funcionalidade da Sprint 07 ou de produto derivado foi implementada.

Na entrega, cada critério deverá receber o estado **atendido**, **não atendido**, **pendente** ou **não verificável**, acompanhado da respectiva evidência ou justificativa.

# Checklist Técnico

- [x] **Lint:** ausência de script oficial declarada, sem instalação ou configuração.
- [x] **Typecheck:** executado com o TypeScript existente, sem emissão de arquivos.
- [x] **Build:** executado com o script oficial existente.
- [x] **Testes:** testes existentes relacionados e regressões autorizadas executados; smoke test local registrado.
- [x] **Responsividade:** classes e composição mobile, intermediária e desktop revisadas estruturalmente.
- [x] **Acessibilidade básica:** semântica, landmarks, teclado, foco, contraste, rótulos e anúncios de estado revisados.
- [x] **Autenticação:** redirecionamento protegido e compatibilidade dos fluxos revalidados sem alterar contratos.
- [x] **Segurança:** nenhuma credencial, sessão interna, mensagem técnica ou dado sensível exposto.
- [x] **Arquitetura:** limites de servidor/cliente, direção de dependências e ausência de acesso direto a serviços confirmados.
- [x] **Repositório:** diff completo, lista de arquivos e estado final revisados contra o estado inicial.

# Critérios de Revisão

Antes de apresentar a Sprint para aceite, deverá ser confirmado:

- alinhamento com a Fase 4 do roadmap e dependência do resultado encerrado da Sprint 05;
- compatibilidade com `ARCHITECTURE.md`, `UI_GUIDELINES.md`, `CODE_STYLE.md` e o fluxo autenticado da Sprint 02;
- uso de composição visual real, sem criação de design system amplo ou rotas futuras;
- separação entre apresentação e autenticação, serviços, persistência e integrações;
- header, sidebar e navegação com destinos reais e comportamento responsivo;
- estados de loading, vazio, erro e sucesso neutros, seguros e semanticamente adequados;
- preservação das páginas de cadastro e login, suas ações, validações e mensagens;
- foco, teclado, landmarks, contraste, rótulos e anúncios verificados individualmente;
- ausência de marca, regra, conteúdo ou fluxo específico de produto;
- alteração exclusiva dos oito arquivos autorizados;
- ausência de mudança em dependências, configurações, scripts, manifestos e lockfile;
- nenhum item da Sprint 07 antecipado;
- riscos, limitações, falhas e validações não executadas registrados de forma transparente.

# Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Layout autenticado duplicar a autenticação existente | Redirecionamentos inconsistentes ou consultas de sessão repetidas | Manter a verificação de acesso no limite aprovado, preservar a página protegida e separar composição visual de autenticação. |
| Navegação artificial | Expectativa de rotas ou funcionalidades inexistentes | Exibir somente destinos reais e aprovados, inicialmente limitados ao dashboard. |
| Design system prematuro | Mais componentes, variantes e manutenção sem uso comprovado | Limitar a Sprint aos oito arquivos e aos padrões exigidos pelo dashboard real. |
| Estado de cliente excessivo | Bundle maior, fronteira arquitetural confusa ou perda de segurança | Usar Server Components por padrão e limitar o cliente à interação local de navegação. |
| Regressão nas páginas de autenticação | Perda de acesso, mensagens ou compatibilidade visual | Manter as páginas e ações inalteradas, executar regressão e revisar navegação entre rotas. |
| Acessibilidade incompleta | Usuários de teclado ou tecnologias assistivas não conseguem operar a interface | Validar semântica, foco, teclado, contraste, rótulos e anúncios em cada estado e largura. |
| Estados sem consumidor real | Código demonstrativo e mensagens sem contexto | Usar os estados em limites reais do dashboard e manter textos e ações fornecidos pelo consumidor. |
| Identidade visual específica | Componentes difíceis de adaptar a produtos derivados | Usar linguagem visual discreta, tokens existentes e nenhum conteúdo ou marca de produto. |
| Alteração indireta de arquivos proibidos | Configuração, dependências ou documentação fora do escopo modificadas | Registrar estado inicial, usar somente comandos existentes e revisar status e diff após cada validação. |
| Validação visual limitada | Falhas de viewport, foco ou contraste não detectadas automaticamente | Combinar build/typecheck com inspeção manual em larguras mobile, intermediária e desktop. |

# Dependências

## Pré-requisitos

- Sprints 01 a 05 encerradas e preservadas como linha de base.
- Sprint 05 implementada e validada no commit `bc7ca07d2ca2d8622380dc1d8a8177b1eb5802e1`.
- Fluxo de autenticação e dashboard da Sprint 02 disponíveis como contexto real de uso.
- Aprovação formal deste documento e autorização explícita para iniciar a implementação.
- `UI_GUIDELINES.md`, `ARCHITECTURE.md` e `CODE_STYLE.md` disponíveis para revisão visual e estrutural.
- Estado inicial do repositório limpo ou alterações preexistentes identificadas.
- Confirmação de que os oito arquivos autorizados são suficientes.

## Dependências técnicas existentes

- Next.js 15, React 19, TypeScript e App Router já configurados.
- Tailwind CSS e estilos globais existentes, sem alteração de configuração.
- Rotas de cadastro, login e dashboard existentes.
- Server Actions, middleware e clientes Supabase Auth existentes, apenas como dependências de compatibilidade.
- Recursos nativos de formulários, navegação, semântica HTML e CSS já disponíveis.
- Scripts existentes de typecheck implícito pelo TypeScript e build oficial.

## Novas dependências

**Nenhuma.**

Não estão autorizados pacotes, bibliotecas de ícones, bibliotecas de componentes, serviços externos, variáveis de ambiente, configurações, scripts, manifestos ou alterações de arquivo de lock.

# Plano de Implementação

1. Confirmar os pré-requisitos, registrar o estado inicial e inspecionar novamente as rotas autenticadas e páginas de login/cadastro.
2. Definir a composição de layout, header, sidebar, navegação e conteúdo principal mantendo a direção do App Router.
3. Criar os componentes de layout e o componente neutro de estados somente nos arquivos autorizados.
4. Criar os estados de loading e erro do segmento autenticado sem duplicar regras de autenticação.
5. Integrar o dashboard à composição, preservando sessão, logout, redirecionamento e conteúdo neutro.
6. Verificar navegação real, comportamento mobile/desktop, foco, teclado, landmarks, contraste e mensagens de estado.
7. Executar regressão das páginas de autenticação e dos serviços existentes, typecheck e build.
8. Revisar o diff, confirmar a lista de oito arquivos, registrar riscos e preparar a entrega para aprovação.

O plano não amplia a autorização. Se qualquer etapa exigir alterar `app/(auth)`, `app/layout.tsx`, estilos globais, configuração, dependência, serviço ou arquivo adicional, o trabalho deverá parar e solicitar revisão formal.

# Plano de Validação

| Item | Método de validação | Evidência esperada |
| --- | --- | --- |
| REQ-01 / CA-14 | Inspeção de nomes, textos, classes e busca por termos de produto | Componentes neutros e ausência de DocAI ou identidade específica. |
| REQ-02 / CA-01 / CA-02 / CA-03 | Revisão do layout e execução da rota autenticada | Header, sidebar, navegação e main semânticos em composição única. |
| REQ-03 / CA-03 | Navegação manual e inspeção de links | Somente `/dashboard` e destinos existentes, com destino atual identificável. |
| REQ-04 / CA-10 / CA-11 | Inspeção em larguras mobile, intermediária e desktop | Sem perda de ação, conteúdo ou legibilidade; navegação compacta funcional. |
| REQ-05 / CA-05 | Revisão dos oito arquivos autorizados | Responsabilidades pequenas, props explícitas e ausência de variantes hipotéticas. |
| REQ-06 / CA-06 a CA-09 | Inspeção visual e interação dos quatro estados | Loading, vazio, erro e sucesso neutros, seguros e semanticamente anunciados. |
| REQ-07 / REQ-08 / CA-12 | Navegação somente por teclado, revisão de foco, landmarks e contraste | Operação acessível sem mouse e estados não dependentes apenas de cor. |
| REQ-09 | Revisão de imports e fronteiras de Client/Server Components | Cliente limitado à interação local; sem segredo ou serviço no cliente. |
| REQ-10 / REQ-11 / CA-13 | Testes manuais de cadastro, login, logout, sessão e redirecionamento | Fluxos da Sprint 02 continuam funcionais e compatíveis. |
| REQ-12 | Inspeção de props e ausência de acesso a dados externos | Conteúdo fornecido por composição, sem entidade ou regra de produto. |
| REQ-13 | Inspeção de mensagens e estados de erro | Nenhum stack trace, segredo, credencial ou detalhe de fornecedor exposto. |
| REQ-14 / CA-15 | Inspeção de manifestos, lockfile e configurações | Nenhuma dependência ou configuração alterada. |
| REQ-15 / CA-16 | `git status`, `git diff --name-only` e revisão do diff | Somente os oito arquivos autorizados afetados. |
| REQ-16 / CA-17 / CA-18 | Testes existentes, typecheck, build e regressão | Base compilável e serviços/autenticação sem regressão conhecida. |
| CA-19 | Busca de imports e arquivos relacionados à Sprint 07 | Nenhum contrato, integração ou funcionalidade posterior presente. |

Sequência mínima de validação:

1. registrar `git status --short` antes da implementação;
2. executar testes existentes relacionados, incluindo os testes de persistência, templates e documentos;
3. executar testes manuais das páginas de cadastro, login, dashboard, logout e redirecionamento;
4. executar `./node_modules/.bin/tsc --noEmit`;
5. executar `npm run build`;
6. executar lint somente se houver script oficial; caso contrário, declarar sua indisponibilidade;
7. inspecionar a interface em larguras mobile, intermediária e desktop e navegar por teclado;
8. revisar o diff completo, os oito arquivos autorizados e todos os arquivos proibidos;
9. confirmar que dependências, configurações, arquivos de ambiente e documentação não mudaram;
10. procurar referências a DocAI, IA, pagamentos, PDF, e-mail, banco de produto, integrações e Sprint 07;
11. atribuir status e evidência a cada critério de aceitação;
12. registrar falhas, limitações e verificações não executadas;
13. comparar o estado final com o inicial.

Nenhum comando poderá instalar, remover ou atualizar dependências. Artefatos gerados pelo build não poderão integrar a entrega.

# Critérios de Conclusão

A Sprint poderá ser considerada **tecnicamente concluída e aguardando aprovação** somente quando:

- layout autenticado, header, sidebar, navegação, conteúdo principal e componentes de estado estiverem entregues;
- loading, vazio, erro e sucesso tiverem contrato e evidência de uso compatível com o escopo;
- responsividade mobile, intermediária e desktop tiver sido verificada;
- acessibilidade básica tiver evidência para semântica, landmarks, teclado, foco, contraste, rótulos e estados;
- cadastro, login, sessão, logout e proteção do dashboard permanecerem funcionais;
- todos os critérios de aceitação possuírem status e evidência;
- typecheck, build e testes aplicáveis tiverem resultado conhecido;
- lint tiver sido executado ou sua indisponibilidade declarada;
- nenhum erro conhecido invalidar a interface ou os fluxos autenticados;
- somente os oito arquivos autorizados tiverem sido criados ou modificados;
- dependências, configurações, arquivos de ambiente e documentação permanecerem inalterados;
- nenhum item da Sprint 07 ou de produto derivado tiver sido antecipado;
- riscos, limitações, falhas e validações não executadas tiverem sido relatados;
- diff e estado final do repositório tiverem sido revisados e apresentados ao responsável.

Conclusão técnica não encerra a Sprint. O encerramento dependerá da revisão e da aprovação explícita do responsável pelo projeto.

# Entrega Esperada

Ao concluir tecnicamente a Sprint, a entrega deverá apresentar:

- layout autenticado reutilizável com header, sidebar, navegação e área principal;
- componentes de loading, vazio, erro e sucesso neutros e acessíveis;
- dashboard existente integrado sem regressão de autenticação;
- evidências de responsividade e acessibilidade básica;
- lista completa dos arquivos criados e modificados;
- comandos executados e resultados;
- status e evidência individual dos critérios de aceitação;
- riscos, limitações, falhas e validações não executadas;
- confirmação de dependências, configurações e arquivos de ambiente inalterados;
- confirmação de que somente os oito arquivos autorizados foram afetados.

O estado esperado após a entrega técnica era **Sprint 06 tecnicamente concluída e aguardando aprovação**. Após a revisão e a aprovação explícita do responsável, o estado atual é **Sprint 06 encerrada**.

# Commit Esperado

**Mensagem proposta:** `feat: add reusable visual layer`

**Commit da implementação:** `656a13d9f5ed89783af1c811f1a5a4b8ec358c5e`

**Arquivos previstos:**

- `app/dashboard/layout.tsx`
- `app/dashboard/loading.tsx`
- `app/dashboard/error.tsx`
- `app/dashboard/page.tsx`
- `components/layout/authenticated-layout.tsx`
- `components/layout/header.tsx`
- `components/layout/sidebar.tsx`
- `components/ui/status-state.tsx`

A implementação foi registrada com a mensagem proposta. Este registro não autoriza novo commit, push, Pull Request ou publicação.

# Registro de Encerramento

## Resultado

- O layout autenticado, header, sidebar, navegação e área principal foram criados nos arquivos autorizados.
- Loading e erro do segmento autenticado foram definidos com estados neutros e recuperáveis.
- `StatusState` fornece estados reutilizáveis de loading, vazio, erro e sucesso.
- O dashboard preserva validação server-side, redirecionamento para login e logout existente.
- Nenhuma página de autenticação, serviço, persistência, configuração ou documentação foi alterada.
- Nenhuma funcionalidade de produto, integração externa ou item da Sprint 07 foi incluído.

## Validações registradas

- `node --test lib/persistence/in-memory-repository.test.ts lib/templates/template-service.test.ts lib/documents/document-service.test.ts`: 39 testes aprovados, sem falhas.
- `./node_modules/.bin/tsc --noEmit`: concluído sem erro.
- `npm run build`: concluído sem erro.
- Smoke test local: `/` retornou `200`; `/dashboard` sem sessão retornou `307` para `/login`.
- `git diff --check`: concluído sem erro.
- Lint: indisponível porque o projeto não possui script oficial.
- A inspeção visual dedicada por navegador não estava disponível; foi realizada revisão estrutural de classes responsivas, semântica, foco, teclado e estados.
- Revisão de escopo: o commit da implementação contém exclusivamente os oito arquivos autorizados.

## Status dos critérios de aceitação

| Critério | Status | Evidência |
| --- | --- | --- |
| CA-01 | Atendido | O dashboard utiliza layout com header, sidebar, navegação e `main` semântico. |
| CA-02 | Atendido | Header neutro contém contexto e logout acessível. |
| CA-03 | Atendido | Sidebar aponta somente para `/dashboard`, indica `aria-current` e adapta a navegação mobile. |
| CA-04 | Atendido | A região principal recebe o conteúdo por composição e mantém título contextual. |
| CA-05 | Atendido | Componentes possuem responsabilidades separadas e contratos explícitos. |
| CA-06 | Atendido | `app/dashboard/loading.tsx` usa o estado reutilizável de loading. |
| CA-07 | Atendido | `StatusState` possui variante neutra de estado vazio, sem dados simulados. |
| CA-08 | Atendido | Dashboard e error boundary utilizam estado de erro sem detalhes técnicos. |
| CA-09 | Atendido | Dashboard utiliza estado de sucesso com confirmação contextual. |
| CA-10 | Atendido | Classes responsivas e navegação compacta preservam conteúdo e ações em largura reduzida. |
| CA-11 | Atendido | Layout desktop mantém sidebar, header, hierarquia e largura de leitura controlada. |
| CA-12 | Atendido | Foram implementados landmarks, skip link, foco, teclado, `aria-current`, rótulos e anúncios de estado. |
| CA-13 | Atendido | Smoke test confirmou proteção do dashboard; páginas, ações e contratos de autenticação permaneceram inalterados. |
| CA-14 | Atendido | Não foram incluídos DocAI, IA, pagamentos, PDF, e-mail, banco de produto ou integração externa. |
| CA-15 | Atendido | Dependências, scripts, manifestos, lockfile, configurações e ambiente permaneceram inalterados. |
| CA-16 | Atendido | O commit da implementação contém somente os oito arquivos autorizados e não introduz barrel ou serviço. |
| CA-17 | Atendido | Testes, typecheck e build passaram; a ausência de lint foi declarada. |
| CA-18 | Atendido | Testes dos serviços de templates, documentos e persistência permaneceram aprovados. |
| CA-19 | Atendido | Nenhuma funcionalidade da Sprint 07 ou de produto derivado foi antecipada. |

## Pré-requisitos confirmados

- As Sprints 01 a 05 estavam concluídas como linha de base.
- Este documento foi aprovado explicitamente.
- A implementação da Sprint 06 foi autorizada explicitamente.
- A entrega foi validada e revisada contra a lista fechada de arquivos autorizados.

Não há pendência conhecida que invalide o encerramento da Sprint 06. A limitação de inspeção visual dedicada foi registrada de forma transparente e não revelou erro conhecido na implementação.

# Observações

- A Sprint 05 foi encerrada e sua fronteira de persistência não deverá ser acessada diretamente pela interface nesta Sprint.
- A autenticação existente é o contexto real da área protegida; suas dependências e contratos permanecem fora da implementação visual.
- `PROJECT_STATE.md` ainda registra um estado anterior ao encerramento da Sprint 05. Essa divergência documental deverá ser tratada em tarefa própria, pois este documento não autoriza sua alteração.
- O estado vazio será neutro e não poderá inventar entidades, métricas ou ações de produto. Consumidores futuros poderão utilizá-lo quando houver dados e fluxos aprovados.
- O header e a sidebar não deverão criar links para templates, documentos ou integrações que ainda não possuam rota e requisito aprovados.
- Nenhuma biblioteca de ícones ou componentes será adicionada; a implementação deverá utilizar semântica HTML, CSS e recursos já disponíveis.
- A lista de arquivos autorizados é fechada. Qualquer necessidade de alterar uma página de autenticação, estilo global, configuração ou arquivo adicional exige revisão formal antes da implementação.
