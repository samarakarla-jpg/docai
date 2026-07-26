# Sprint 06 — Camada visual reutilizável

**Sprint:** `06 — Camada visual reutilizável`

**Fase do Roadmap:** `Fase 4 — Interface reutilizável`

**Status:** `em revisão`

Esta Sprint define a base visual neutra do SaaS Starter Kit para a área autenticada. Ela deve reutilizar o fluxo de autenticação existente, sem incorporar identidade, conteúdo ou regras de qualquer produto derivado.

# Objetivo

Implementar uma composição visual autenticada e reutilizável com header, sidebar, navegação, área principal e estados fundamentais de interface. O dashboard existente deverá utilizar essa composição de forma responsiva e acessível, preservando sessão, redirecionamento e logout, sem criar UI de produto, integração externa, nova dependência ou alteração nas páginas de autenticação.

# Escopo

- Criar layout específico do segmento autenticado.
- Criar header neutro com contexto e logout acessível.
- Criar sidebar com navegação somente para destinos reais e aprovados.
- Criar área principal semântica para conteúdo fornecido pelas rotas.
- Criar componentes pequenos e combináveis para a composição.
- Criar estados reutilizáveis de loading, vazio, erro e sucesso.
- Integrar a composição ao dashboard existente.
- Criar estados de loading e erro do segmento autenticado quando necessários ao App Router.
- Aplicar responsividade mobile, intermediária e desktop.
- Verificar landmarks, títulos, foco, teclado, rótulos, contraste e anúncios de estado.
- Preservar páginas, ações, validações e navegação de cadastro e login.

# Entregas

## Layout autenticado

- Composição de header, sidebar e área principal.
- Landmarks semânticos, ordem de leitura lógica e skip link quando aplicável.
- Server Components por padrão, com cliente limitado à interação local de navegação.

## Header, sidebar e navegação

- Identificação contextual neutra e logout acessível.
- Links somente para rotas existentes.
- Destino atual indicado textualmente e por semântica apropriada.
- Navegação mobile com abertura, fechamento e foco previsíveis.
- Navegação desktop estável, sem níveis profundos ou links futuros.

## Estados e componentes

- Contratos pequenos e props explícitas.
- Loading estrutural e informativo.
- Estado vazio sem dados simulados ou ações inventadas.
- Estado de erro compreensível, seguro e recuperável quando possível.
- Estado de sucesso contextual e não dependente apenas de cor.

## Integração

- Dashboard integrado sem duplicar autenticação.
- Logout, sessão e redirecionamento preservados.
- Cadastro e login permanecem inalterados em contrato e fluxo.

# Fora do Escopo

- Qualquer identidade, nome, conteúdo, regra ou fluxo específico do DocAI.
- IA, Gemini, prompts, pagamentos, Stripe, PDF, e-mail ou armazenamento externo.
- Banco de dados, persistência de domínio, Supabase ou novas integrações.
- Alteração de autenticação, sessão, autorização, middleware, Server Actions ou contratos existentes.
- Dashboard de produto, métricas, gráficos, tabelas, cards, dados simulados ou rotas futuras.
- Links sem destino, menus hipotéticos ou ações de funcionalidades não aprovadas.
- Design system completo, biblioteca extensa, catálogo de variações, logotipo, paleta de marca, tema ou dark mode.
- Upload, download, compartilhamento, colaboração, internacionalização ou multi-tenancy.
- Dependências, scripts, manifestos, lockfiles, configurações, ambiente ou `app/globals.css`.
- Funcionalidades da Sprint 07 ou preparação de suas integrações opcionais.

# Requisitos

- **REQ-01 — Neutralidade visual:** nenhum componente contém marca, cor, texto, regra ou fluxo específico de produto.
- **REQ-02 — Composição:** a área protegida possui header, sidebar, navegação e região principal semântica.
- **REQ-03 — Navegação real:** links apontam somente para destinos existentes e o destino atual é identificável.
- **REQ-04 — Responsividade:** mobile, intermediário e desktop permanecem utilizáveis sem perda de conteúdo ou ação essencial.
- **REQ-05 — Componentes:** cada componente tem responsabilidade visual clara, props explícitas e nenhuma variante sem consumidor.
- **REQ-06 — Estados:** loading, vazio, erro e sucesso possuem representação neutra e reutilizável.
- **REQ-07 — Acessibilidade:** landmarks, títulos, tabulação, foco, teclado, rótulos, contraste e anúncios são considerados.
- **REQ-08 — Cliente/servidor:** Server Components são padrão; cliente existe somente para interação local necessária.
- **REQ-09 — Autenticação:** sessão, proteção, redirecionamento e logout permanecem compatíveis.
- **REQ-10 — Conteúdo:** a composição recebe conteúdo por composição ou props, sem acessar dados de produto.
- **REQ-11 — Segurança:** erros não expõem stack trace, credenciais, sessão interna ou detalhes de fornecedor.
- **REQ-12 — Dependências:** somente recursos já disponíveis da stack são usados.
- **REQ-13 — Escopo:** somente os oito arquivos autorizados podem ser afetados.

# Arquivos autorizados

Somente os arquivos abaixo poderão ser criados ou modificados:

| Arquivo | Ação autorizada | Finalidade |
| --- | --- | --- |
| `app/dashboard/layout.tsx` | criar | Composição autenticada do segmento protegido. |
| `app/dashboard/loading.tsx` | criar | Loading estrutural neutro do segmento. |
| `app/dashboard/error.tsx` | criar | Estado de erro recuperável do segmento. |
| `app/dashboard/page.tsx` | modificar | Integração do dashboard à composição visual. |
| `components/layout/authenticated-layout.tsx` | criar | Composição reutilizável de regiões autenticadas e menu mobile. |
| `components/layout/header.tsx` | criar | Header neutro, contexto e logout acessível. |
| `components/layout/sidebar.tsx` | criar | Sidebar e navegação mínima para destinos reais. |
| `components/ui/status-state.tsx` | criar | Estados reutilizáveis de loading, vazio, erro e sucesso. |

Regras adicionais:

- `components/` somente poderá existir para esses quatro arquivos.
- Estado de cliente somente será permitido para abrir, fechar e controlar foco do menu mobile.
- `StatusState` não acessará autenticação, persistência, serviços ou APIs externas.
- `app/dashboard/layout.tsx` não duplicará autenticação sem necessidade aprovada.
- `app/dashboard/error.tsx` ficará limitado à apresentação e recuperação visual do erro.
- Páginas e ações de cadastro/login serão referências de compatibilidade e permanecerão inalteradas.
- Nenhum `index.ts`, barrel, arquivo auxiliar, teste visual ou biblioteca de componentes está autorizado.
- Qualquer nono arquivo exige revisão formal antes da implementação.

# Arquivos proibidos

- Todo arquivo não listado acima.
- `app/(auth)/cadastro/page.tsx`, `app/(auth)/login/page.tsx`, `app/actions/auth.ts`, `lib/auth/` e `middleware.ts`.
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/favicon.ico` e `public/`.
- `lib/docai/`, `lib/templates/`, `lib/documents/`, `lib/persistence/` e `lib/integrations/`.
- `package.json`, lockfiles, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `next-env.d.ts` e arquivos de ambiente.
- Toda documentação, Sprint, template, configuração ou artefato gerado não listado.
- Qualquer adaptador externo, contrato de IA, pagamentos, PDF, e-mail ou armazenamento externo.

# Dependências

## Pré-requisitos

- Sprints 01 a 05 encerradas e preservadas.
- Fluxo de autenticação e dashboard existentes disponíveis para integração.
- `UI_GUIDELINES.md`, `ARCHITECTURE.md` e `CODE_STYLE.md` revisados.
- Aprovação formal desta Sprint e autorização explícita para implementação.
- Estado inicial limpo ou alterações preexistentes identificadas.
- Confirmação de que os oito arquivos são suficientes.

## Dependências técnicas existentes

- Next.js, React, TypeScript, App Router e Tailwind CSS já configurados.
- Rotas de cadastro, login e dashboard existentes.
- Server Actions, middleware e sessão existentes, usados apenas para compatibilidade.
- HTML semântico, CSS e recursos nativos disponíveis.

## Novas dependências

**Nenhuma.** Não instalar bibliotecas de ícones, componentes, fontes, pacotes ou ferramentas.

# Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Duplicação da autenticação | Redirecionamentos inconsistentes | Preservar o limite existente e separar composição visual de sessão. |
| Navegação artificial | Expectativa de rotas inexistentes | Exibir somente destinos reais e aprovados. |
| Design system prematuro | Complexidade sem uso comprovado | Limitar componentes aos consumidores reais do dashboard. |
| Fronteira de cliente excessiva | Bundle maior e arquitetura confusa | Usar Server Components por padrão. |
| Regressão no login/cadastro | Perda de acesso ou mensagens | Manter arquivos e ações inalterados e executar regressão. |
| Acessibilidade incompleta | Operação impossível por teclado ou tecnologia assistiva | Revisar semântica, foco, teclado, contraste, rótulos e estados. |
| Identidade específica | Baixa reutilização entre produtos | Usar composição neutra e nenhum conteúdo de marca. |
| Alteração indireta de arquivos proibidos | Escopo contaminado | Revisar status e diff depois de cada validação. |

# Plano de Implementação

1. Registrar estado inicial e inspecionar rotas autenticadas e páginas de login/cadastro.
2. Definir composição de layout, header, sidebar, navegação e conteúdo principal.
3. Criar os componentes visuais e o contrato de estados nos arquivos autorizados.
4. Criar loading e erro do segmento sem duplicar autenticação.
5. Integrar o dashboard preservando sessão, logout e redirecionamento.
6. Verificar responsividade, foco, teclado, landmarks, contraste e mensagens.
7. Executar regressão, typecheck, build e inspeção do diff.

Se qualquer etapa exigir estilo global, dependência, configuração, serviço, página não autorizada ou arquivo adicional, a implementação deverá parar.

# Plano de Validação

- Inspecionar neutralidade dos textos, classes e imports.
- Confirmar composição semântica de header, nav, aside e main.
- Confirmar links reais e indicação do destino atual.
- Testar larguras mobile, intermediária e desktop sem rolagem horizontal indevida.
- Percorrer navegação, logout e estados somente com teclado.
- Verificar foco visível, labels, landmarks, contraste, `aria-current` e anúncios de estado.
- Executar testes existentes relacionados, typecheck e build.
- Executar smoke test das rotas pública, login, cadastro e dashboard quando disponível.
- Revisar os oito arquivos autorizados e confirmar ausência de alterações proibidas.
- Declarar lint indisponível se não houver script oficial.

Comandos previstos:

```text
node --test lib/persistence/in-memory-repository.test.ts lib/templates/template-service.test.ts lib/documents/document-service.test.ts
./node_modules/.bin/tsc --noEmit --incremental false
npm run build
git diff --check
```

Responsividade e acessibilidade exigem inspeção manual além das verificações automatizadas. Nenhuma dependência ou ferramenta deverá ser instalada para isso.

# Critérios de Aceitação

- **CA-01 — Estrutura:** dashboard usa layout com header, sidebar, navegação e main semântico.
- **CA-02 — Header:** contexto neutro e logout acessível estão disponíveis.
- **CA-03 — Sidebar:** somente destinos reais são exibidos e o destino atual é indicado.
- **CA-04 — Conteúdo:** área principal recebe conteúdo por composição, sem dados de produto.
- **CA-05 — Componentes:** responsabilidades e props são pequenas e explícitas.
- **CA-06 — Loading:** loading estrutural e neutro preserva a composição.
- **CA-07 — Vazio:** ausência é comunicada sem dados ou ações inventadas.
- **CA-08 — Erro:** erro é compreensível, seguro e recuperável quando possível.
- **CA-09 — Sucesso:** conclusão é confirmada sem depender apenas de cor.
- **CA-10 — Mobile:** conteúdo e ações permanecem utilizáveis em largura reduzida.
- **CA-11 — Desktop:** hierarquia, densidade e largura de leitura permanecem adequadas.
- **CA-12 — Acessibilidade:** landmarks, títulos, foco, teclado, rótulos, contraste e estados são verificáveis.
- **CA-13 — Autenticação:** cadastro, login, sessão, logout e proteção do dashboard permanecem compatíveis.
- **CA-14 — Neutralidade:** nenhum produto, integração, banco, IA, pagamento, PDF ou e-mail é introduzido.
- **CA-15 — Dependências:** nenhum pacote, script, configuração, ambiente ou lockfile é alterado.
- **CA-16 — Escopo:** somente os oito arquivos autorizados são afetados.
- **CA-17 — Qualidade:** testes aplicáveis, typecheck, build e diff check passam; ausência de lint é declarada.
- **CA-18 — Regressão:** serviços e páginas de autenticação existentes permanecem funcionais.
- **CA-19 — Antecipação:** nenhuma funcionalidade da Sprint 07 é implementada.

Cada critério deverá receber estado **atendido**, **não atendido**, **pendente** ou **não verificável**, com evidência.

# Critérios de Conclusão

- Layout autenticado, header, sidebar, navegação, área principal e estados entregues.
- Responsividade e acessibilidade verificadas nas larguras e interações previstas.
- Autenticação, logout, sessão e redirecionamento preservados.
- Testes aplicáveis, typecheck, build e `git diff --check` executados.
- Lint executado ou indisponibilidade declarada.
- Somente os oito arquivos autorizados foram alterados.
- Nenhuma dependência, configuração, integração ou funcionalidade fora do escopo foi introduzida.
- Todos os critérios possuem evidência e a Sprint está pronta para aprovação.

# Commit Esperado

**Mensagem proposta:** `feat: add reusable visual layer`

**Arquivos previstos:**

- `app/dashboard/layout.tsx`
- `app/dashboard/loading.tsx`
- `app/dashboard/error.tsx`
- `app/dashboard/page.tsx`
- `components/layout/authenticated-layout.tsx`
- `components/layout/header.tsx`
- `components/layout/sidebar.tsx`
- `components/ui/status-state.tsx`

A definição da mensagem não autoriza commit, push, publicação ou alteração de arquivo fora da lista.

# Observações

- A composição visual deve permanecer neutra e reutilizável por produtos derivados.
- A navegação inicial deve apontar apenas para rotas existentes, inicialmente o dashboard.
- Estados visuais não devem inventar entidades, métricas ou ações futuras.
- A Sprint não altera `PROJECT_STATE.md`; divergências de estado documental exigem tarefa própria.
- Qualquer necessidade de alterar autenticação, estilos globais, dependências ou arquivo adicional exige revisão formal.
