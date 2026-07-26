# Sprint 07 — Adaptadores opcionais e fechamento da versão 1.0

**Sprint:** `07 — Adaptadores opcionais e fechamento da versão 1.0`

**Fase do Roadmap:** `Fase 5 — Integrações opcionais`

**Status:** `encerrada`

Este documento registrou a Sprint final do SaaS Starter Kit. A implementação foi concluída, validada e registrada no commit `1c8058c32b39fc6f5eb60e87fa41cdaa799fe2b5`. O plano aprovado é preservado abaixo como registro dos limites aplicados durante a execução. O encerramento desta Sprint não autoriza integração real, nova implementação, alteração de dependências, tag, release, deploy ou publicação da versão 1.0.

# Objetivo

Definir contratos e adaptadores nulos, genéricos e opcionais para capacidades externas de IA, pagamentos, PDF, e-mail e armazenamento de objetos ou arquivos, mantendo cada capacidade desativada por padrão e totalmente desacoplada de provedores específicos. Ao final da Sprint, o Starter Kit deverá continuar compilando e executando sem qualquer integração habilitada, oferecer documentação suficiente para clonagem e adaptação e possuir evidências objetivas para propor a estabilidade da versão 1.0.

Esta é a Sprint final do Starter Kit. Seu objetivo é fechar as fronteiras opcionais e validar a base acumulada das Sprints 01 a 06; não é transformar o projeto em um produto SaaS completo nem antecipar funcionalidades posteriores à versão 1.0.

# Escopo

- Criar contratos mínimos e independentes de fornecedor para capacidade de IA.
- Criar contratos mínimos e independentes de fornecedor para pagamentos.
- Criar contratos mínimos e independentes de fornecedor para geração ou manipulação de PDF.
- Criar contratos mínimos e independentes de fornecedor para envio de e-mail.
- Criar contratos mínimos e independentes de fornecedor para armazenamento externo de objetos ou arquivos.
- Representar estado habilitado, desabilitado e não configurado de forma previsível e comum às capacidades opcionais.
- Manter as capacidades opcionais desligadas por padrão, sem inicializar clientes ou executar chamadas externas.
- Validar configuração por ambiente somente no limite necessário para reconhecer a capacidade, sem armazenar segredos ou valores reais no repositório.
- Definir erros internos estáveis para capacidade desativada, configuração inválida e falha de adaptador, sem expor mensagens de fornecedor.
- Manter separado o armazenamento externo de arquivos desta Sprint e a persistência de entidades da Sprint 05.
- Criar testes de contrato e de estado desativado que possam ser executados sem rede, credenciais, SDK ou serviço externo.
- Documentar clonagem, instalação reproduzível, configuração mínima, execução, validação, substituição e remoção das capacidades opcionais.
- Revalidar a base acumulada: autenticação, serviços, persistência, interface, dependências, segurança, acessibilidade, build, typecheck, testes e estado do repositório.
- Registrar critérios objetivos para considerar o Starter Kit estável e preparar a versão 1.0, sem criar tag, release, deploy ou publicação automaticamente.

Os contratos deverão ser definidos pela necessidade interna do Starter Kit e não pela API de Gemini, OpenAI, Stripe, Supabase, Resend ou qualquer outro fornecedor. Cada adaptador concreto continuará fora do escopo.

# Entregas

## Entrega 1 — Contrato opcional de IA

O contrato de IA deverá:

- representar uma solicitação e um resultado genéricos, sem assumir modelo, prompt, agente, provedor ou formato proprietário;
- expor somente a operação mínima aprovada para o caso de uso documentado;
- permitir que a implementação seja substituída sem alterar consumidores internos;
- representar indisponibilidade e capacidade desativada por erro interno estável;
- não gerar conteúdo, chamar modelo, armazenar prompt, registrar resposta ou interpretar semântica de produto.

## Entrega 2 — Contrato opcional de pagamentos

O contrato de pagamentos deverá:

- representar somente a intenção de uma operação de pagamento aprovada e seu resultado interno mínimo;
- evitar conceitos proprietários de gateway, plano, assinatura, moeda ou cobrança real quando não forem necessários ao contrato mínimo;
- não criar checkout real, cobrança, webhook, reembolso, conciliação ou estado financeiro;
- impedir que credenciais, tokens ou respostas brutas de provedor atravessem a fronteira interna;
- permanecer inutilizável por padrão até que um adaptador externo seja fornecido explicitamente.

## Entrega 3 — Contrato opcional de PDF

O contrato de PDF deverá:

- representar uma solicitação e um resultado binário ou documental genérico somente no limite necessário à porta aprovada;
- não definir layout de produto, template, fonte, renderizador, conversor ou biblioteca específica;
- não gerar, ler, converter, armazenar ou transmitir PDF durante esta Sprint;
- indicar desativação e falha de forma previsível, sem expor detalhes de implementação;
- permitir futura substituição por um adaptador sem alterar as camadas internas.

## Entrega 4 — Contrato opcional de e-mail

O contrato de e-mail deverá:

- representar uma mensagem mínima e neutra e um resultado interno de envio;
- não definir provedor, template de produto, fila, campanha, domínio, remetente real ou política de entrega;
- não enviar mensagens, acessar SMTP, chamar API ou registrar conteúdo sensível;
- validar somente a forma necessária na fronteira do contrato;
- permanecer desativado sem configuração e adaptador explícitos.

## Entrega 5 — Contrato opcional de armazenamento externo

O contrato de armazenamento externo deverá:

- representar operações mínimas para objetos ou arquivos externos, sem se confundir com entidades de `Repository` da Sprint 05;
- manter chaves, conteúdo, metadados e resultados em tipos internos neutros;
- não criar upload, download, URL pública, bucket, política de acesso ou cliente de provedor;
- distinguir ausência, capacidade desativada e falha de armazenamento de forma estável;
- permitir futura substituição sem acoplamento do núcleo a Supabase Storage, S3 ou outro fornecedor.

## Entrega 6 — Estado opcional e configuração segura

- Um contrato comum para identificar uma capacidade desativada, habilitada ou inválida, sem exigir inicialização de adaptador.
- Estado desativado por padrão quando não houver configuração e adaptador explícitos.
- Leitura de configuração somente no limite aprovado, no servidor e a partir do ambiente, sem expor valores ao cliente.
- Nomes de variáveis de ambiente documentados sem valores reais, chaves, tokens ou credenciais.
- Mensagens públicas estáveis que não reproduzam erros ou formatos de fornecedores.

## Entrega 7 — Testes e fechamento documental

- Testes de contrato para cada capacidade e para o estado desativado.
- Verificação de que a base compila, executa e testa sem nenhuma capacidade opcional configurada.
- Regressão dos testes das Sprints 03, 04, 05 e da validação da interface da Sprint 06.
- Documentação de clonagem, configuração mínima, execução, validação e substituição no `README.md`.
- Atualização autorizada do estado final em `PROJECT_STATE.md`, somente após as validações e aprovação da entrega técnica.
- Checklist final de dependências, segurança, neutralidade, acessibilidade, responsividade, artefatos e estado do repositório.

# Fora do Escopo

- Integração real com Gemini, OpenAI, Stripe, Supabase, Resend ou qualquer outro fornecedor.
- Instalação de SDKs, clientes, bibliotecas de PDF, gateways de pagamento, provedores de e-mail ou armazenamento externo.
- Chamadas reais a modelos, gateways, renderizadores, serviços de e-mail ou serviços de objetos.
- Chaves, tokens, credenciais, webhooks, contas, buckets, domínios ou provisionamento de fornecedor.
- Geração, leitura, conversão, renderização, visualização ou exportação real de PDF.
- Cobrança, assinatura, checkout, reembolso, faturamento, conciliação ou dados financeiros de produto.
- Envio de e-mail, notificações, campanhas, filas, retries ou rastreamento de entrega.
- Upload, download, streaming, URL assinada, compartilhamento ou armazenamento real de arquivos.
- Geração de conteúdo por IA, agentes, prompts, embeddings, classificação, busca vetorial ou avaliação de modelos.
- Regras, nomes, fluxos, dados, telas ou identidade visual específicas do DocAI ou de qualquer produto derivado.
- Alteração da autenticação existente, do Supabase Auth ou da proteção de rotas.
- Alteração dos contratos ou serviços de templates, documentos e persistência, salvo a revisão necessária e explicitamente autorizada para compatibilidade, sem mudança de comportamento.
- Novas rotas, páginas, componentes visuais, dashboard de produto ou fluxos de negócio.
- Marketplace, registro dinâmico de plugins, descoberta automática ou sistema universal de integrações.
- Telemetria, analytics, logs de produto, monitoramento de produção, filas de processamento ou garantias de escala.
- Migrações, schemas, tabelas, políticas de acesso, banco de produto ou persistência durável.
- Alteração preventiva de arquitetura, dependências, scripts, manifestos, lockfiles ou configurações.
- Publicação de pacote, tag, release, deploy, imagem, ambiente ou documentação para um fornecedor específico.
- Funcionalidades posteriores à versão 1.0.

# Requisitos

- **REQ-01 — Neutralidade:** contratos, erros, testes e documentação devem permanecer independentes de domínio, marca e fornecedor.
- **REQ-02 — Contratos separados:** IA, pagamentos, PDF, e-mail e armazenamento externo devem possuir responsabilidades e tipos separados, sem um contrato universal de provedor.
- **REQ-03 — Contratos mínimos:** cada porta deve expor somente operações justificadas pelo caso de uso aprovado e não incluir opções hipotéticas.
- **REQ-04 — Substituição:** qualquer adaptador futuro deve poder implementar o contrato sem modificar consumidores internos ou introduzir tipos proprietários.
- **REQ-05 — Estado desativado:** toda capacidade deve permanecer desativada por padrão quando não houver configuração e adaptador explícitos.
- **REQ-06 — Falhas estáveis:** desativação, configuração inválida, ausência e falha de adaptador devem ser distinguíveis por categorias internas estáveis.
- **REQ-07 — Segurança de configuração:** valores sensíveis devem permanecer no ambiente de servidor; nenhum segredo, credencial ou valor real pode ser versionado ou enviado ao cliente.
- **REQ-08 — Ausência de efeitos externos:** contratos, testes e estado desativado não podem realizar rede, inicializar SDK ou chamar provedor.
- **REQ-09 — Armazenamento distinto:** a porta de objetos ou arquivos externos não pode substituir, ampliar ou compartilhar silenciosamente o `Repository` da Sprint 05.
- **REQ-10 — Injeção explícita:** consumidores devem receber capacidades e adaptadores de forma explícita; não pode existir singleton, registro global ou implementação padrão oculta.
- **REQ-11 — Compatibilidade:** autenticação, serviços, persistência e interface das Sprints anteriores devem permanecer compatíveis e sem regressão conhecida.
- **REQ-12 — Testabilidade:** contratos e estado desativado devem ser verificáveis sem rede, credenciais, dependências novas ou ambiente externo.
- **REQ-13 — Documentação de clonagem:** uma pessoa deve conseguir clonar, instalar versões bloqueadas, executar, testar e compreender como substituir ou remover capacidades opcionais.
- **REQ-14 — Dependências controladas:** nenhuma dependência, configuração ou script novo pode ser introduzido apenas para representar contratos.
- **REQ-15 — Estabilidade da versão 1.0:** a proposta de estabilidade deve depender de evidências de todas as Sprints, não apenas da existência dos contratos opcionais.

# Arquivos autorizados para alteração

Após a aprovação explícita desta Sprint, somente os arquivos abaixo poderão ser criados ou modificados durante a implementação:

| Arquivo | Ação autorizada | Finalidade |
| --- | --- | --- |
| `lib/integrations/optional-capability.ts` | criar | Definir estados, erros e comportamento comum de capacidades opcionais desativadas. |
| `lib/integrations/ai.ts` | criar | Definir o contrato neutro de IA, sem implementação de provedor. |
| `lib/integrations/payments.ts` | criar | Definir o contrato neutro de pagamentos, sem cobrança ou gateway real. |
| `lib/integrations/pdf.ts` | criar | Definir o contrato neutro de PDF, sem geração ou conversão real. |
| `lib/integrations/mail.ts` | criar | Definir o contrato neutro de e-mail, sem envio ou provedor real. |
| `lib/integrations/storage.ts` | criar | Definir o contrato neutro de armazenamento externo de objetos ou arquivos, distinto da persistência da Sprint 05. |
| `lib/integrations/contracts.test.ts` | criar | Verificar contratos, genericidade, erros estáveis e ausência de tipos ou regras de fornecedor. |
| `lib/integrations/optional-capability.test.ts` | criar | Verificar estado desativado por padrão, configuração inválida e ausência de efeitos externos. |
| `README.md` | modificar | Documentar clonagem, instalação reproduzível, execução, validação, capacidades opcionais e limites da versão 1.0. |
| `.env.example` | modificar | Documentar somente nomes e comentários de configurações opcionais aprovadas, sem valores reais ou segredos. |
| `PROJECT_STATE.md` | modificar | Registrar o estado final das Sprints, evidências e pendências após validação técnica, sem alterar histórico ou escopo. |

Regras adicionais:

- A pasta `lib/integrations/` somente poderá existir porque conterá os oito arquivos de código e teste autorizados acima.
- Os cinco módulos de capacidade deverão conter contratos ou adaptadores nulos/inativos; nenhum deles poderá importar SDK, cliente ou tipo de fornecedor.
- Os arquivos de teste deverão exercitar contratos e estado desativado, nunca rede, credenciais ou serviços externos.
- `README.md`, `.env.example` e `PROJECT_STATE.md` somente poderão receber as atualizações diretamente relacionadas ao fechamento desta Sprint.
- Nenhum arquivo `index.ts`, barrel, registro global, plugin, adaptador concreto ou arquivo auxiliar adicional está autorizado.
- Se a solução exigir qualquer décimo segundo arquivo, dependência, configuração, comportamento ou decisão adicional, a implementação deverá parar até revisão formal da Sprint.

# Arquivos proibidos

Todo arquivo não listado na seção anterior é proibido por padrão. Em especial, não poderão ser alterados:

- `app/`, `components/` e todos os seus arquivos e subdiretórios;
- `lib/auth/`, `lib/templates/`, `lib/documents/` e `lib/persistence/`;
- `middleware.ts`;
- `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs` e `next-env.d.ts`;
- qualquer arquivo de configuração, script, lockfile ou manifesto não listado como autorizado;
- `.env.local`, arquivos com valores reais e qualquer credencial, token ou segredo;
- `VISION.md`, `PROJECT_PRINCIPLES.md`, `PRODUCT_SPEC.md`, `ARCHITECTURE.md`, `UI_GUIDELINES.md`, `CODE_STYLE.md`, `DEVELOPMENT_WORKFLOW.md`, `AI_RULES.md`, `MASTER_PROMPT.md` e `ROADMAP.md`;
- `SPRINT_01.md`, `SPRINT_02.md`, `SPRINT_03.md`, `SPRINT_04.md`, `SPRINT_05.md`, `SPRINT_06.md`, `TEMPLATE_SPRINT.md`, `TEMPLATE_SERVICE.md` e demais documentos ou templates;
- qualquer adaptador, SDK, cliente ou configuração específica de Gemini, OpenAI, Stripe, Supabase, Resend ou outro fornecedor;
- qualquer arquivo dentro de `.git/`, artefato gerado, `.next/`, `tsconfig.tsbuildinfo` ou arquivo temporário.

`SPRINT_07.md` somente poderá ser revisado antes da aprovação ou por mudança de escopo explicitamente solicitada e aprovada. Sua aprovação não autoriza alteração silenciosa durante a implementação.

# Critérios de Aceitação

- **CA-01 — Contratos separados (REQ-01, REQ-02):** existem cinco contratos pequenos e separados para IA, pagamentos, PDF, e-mail e armazenamento externo.
- **CA-02 — Neutralidade (REQ-01, REQ-04):** nenhum contrato, tipo, nome, teste ou erro depende de API, marca, credencial ou formato proprietário.
- **CA-03 — Operações mínimas (REQ-03):** cada contrato expõe somente operações justificadas, sem registro dinâmico, opções especulativas ou funcionalidades de produto.
- **CA-04 — Adaptadores substituíveis (REQ-04, REQ-10):** consumidores podem receber implementações explicitamente e um adaptador futuro não exige alteração do núcleo.
- **CA-05 — Desativação padrão (REQ-05):** sem configuração e adaptador, cada capacidade permanece desativada e a aplicação básica continua compilando e executando.
- **CA-06 — Erros previsíveis (REQ-06):** desativação, configuração inválida e falha de adaptador produzem categorias internas estáveis e mensagens seguras.
- **CA-07 — Configuração segura (REQ-07):** somente nomes e exemplos vazios são versionados; segredos permanecem no servidor e não chegam ao cliente.
- **CA-08 — Sem efeitos externos (REQ-08):** testes e execução básica não fazem chamadas de rede, inicializam SDKs ou acessam provedores.
- **CA-09 — Armazenamento distinto (REQ-09):** o contrato de objetos/arquivos é explicitamente separado do `Repository` de entidades da Sprint 05.
- **CA-10 — Testes independentes (REQ-12):** os testes de contrato e estado desativado passam sem rede, credenciais, dependências novas ou configuração externa.
- **CA-11 — Compatibilidade (REQ-11):** os testes das Sprints 03, 04 e 05 e as verificações aplicáveis da Sprint 06 permanecem aprovados.
- **CA-12 — Documentação de clonagem (REQ-13):** `README.md` descreve clonagem, instalação reproduzível, execução, testes, configuração opcional, substituição e remoção das capacidades.
- **CA-13 — Dependências controladas (REQ-14):** nenhum pacote, script, manifesto, lockfile ou configuração de execução foi alterado sem autorização explícita.
- **CA-14 — Ausência de integrações concretas:** não existem SDKs, clientes, chamadas, webhooks, contas, credenciais ou efeitos reais de IA, pagamentos, PDF, e-mail ou storage.
- **CA-15 — Neutralidade do Starter Kit:** não foram incluídas regras, dados, fluxos ou identidade visual do DocAI ou de outro produto.
- **CA-16 — Validação integral:** testes aplicáveis, typecheck, build, `git diff --check` e inspeções de segurança e escopo possuem resultado conhecido; lint é executado ou sua ausência é declarada.
- **CA-17 — Estado final:** a árvore de trabalho não contém artefatos, segredos ou alterações fora da lista autorizada.
- **CA-18 — Estabilidade proposta (REQ-15):** todos os critérios objetivos de estabilidade da versão 1.0 possuem evidência ou pendência explicitamente registrada, sem declaração automática de release.
- **CA-19 — Ausência de antecipação:** nenhuma funcionalidade posterior à versão 1.0 ou item fora do escopo está presente.

Na entrega, cada critério deverá receber o estado **atendido**, **não atendido**, **pendente** ou **não verificável**, acompanhado da respectiva evidência ou justificativa.

## Registro da implementação

| Critério | Status | Evidência |
| --- | --- | --- |
| CA-01 | Atendido | Cinco contratos separados foram criados em `lib/integrations/ai.ts`, `payments.ts`, `pdf.ts`, `mail.ts` e `storage.ts`. |
| CA-02 | Atendido | Revisão dos contratos e testes confirmou neutralidade e ausência de tipos proprietários. |
| CA-03 | Atendido | Cada contrato expõe somente sua operação mínima; não há registro dinâmico ou opções especulativas. |
| CA-04 | Atendido | Adaptadores são recebidos por contrato e as fábricas nulas não dependem de fornecedor. |
| CA-05 | Atendido | Todas as fábricas retornam estado `disabled`; build e execução não exigem configuração opcional. |
| CA-06 | Atendido | `DISABLED`, `INVALID_CONFIGURATION` e `ADAPTER_FAILURE` são códigos estáveis com mensagens seguras. |
| CA-07 | Atendido | `.env.example` contém somente nomes comentados, sem valores, chaves ou credenciais. |
| CA-08 | Atendido | Os testes passaram sem rede, SDK, cliente externo ou chamada de provedor. |
| CA-09 | Atendido | `ExternalStorageAdapter` possui contrato próprio e não reutiliza `Repository` de entidades. |
| CA-10 | Atendido | Testes de contratos e estado desativado: 4 casos aprovados; regressão total: 43 testes aprovados. |
| CA-11 | Atendido | Regressão de templates, documentos e persistência passou; a Sprint 06 permaneceu inalterada e compatível. |
| CA-12 | Atendido | `README.md` documenta clonagem, `npm ci`, execução, validação, configuração, substituição e remoção. |
| CA-13 | Atendido | Nenhum manifesto, lockfile, script, configuração ou dependência foi alterado. |
| CA-14 | Atendido | Busca e revisão confirmaram ausência de SDKs, clientes, chamadas, webhooks, credenciais e efeitos reais. |
| CA-15 | Atendido | Não foram adicionadas regras, dados, fluxos ou identidade de produto. |
| CA-16 | Atendido | Testes, typecheck, build e `git diff --check` passaram; lint foi declarado indisponível. |
| CA-17 | Atendido | O commit de implementação contém somente os 11 arquivos autorizados; nenhum artefato foi incluído. |
| CA-18 | Atendido | Evidências de estabilidade foram registradas; declaração da versão 1.0 permanece uma decisão separada. |
| CA-19 | Atendido | Nenhuma funcionalidade posterior ou item fora do escopo foi implementado. |

# Checklist Técnico

- [x] **Lint:** indisponível porque não existe script oficial; nenhuma ferramenta foi instalada ou configurada.
- [x] **Typecheck:** `./node_modules/.bin/tsc --noEmit` concluído sem erro.
- [x] **Build:** `npm run build` concluído com todas as capacidades opcionais desativadas.
- [x] **Testes:** 43 testes executados, todos aprovados, sem rede ou dependências novas.
- [x] **Git diff check:** `git diff --check` concluído sem erro.
- [x] **Responsividade:** evidências estruturais da Sprint 06 revalidadas; nenhum arquivo visual foi alterado.
- [x] **Acessibilidade básica:** evidências estruturais da Sprint 06 revalidadas; nenhum arquivo visual foi alterado.
- [x] **Segurança:** revisão confirmou ausência de segredos, credenciais, valores reais e exposição de configuração ao cliente.
- [x] **Arquitetura:** contratos pequenos, injeção explícita e ausência de acoplamento a fornecedores confirmadas.
- [x] **Clonagem:** instruções de clonagem e instalação reproduzível foram documentadas; validação foi limitada ao ambiente disponível.
- [x] **Repositório:** diff, lista de arquivos e estado final revisados contra o estado inicial.

# Critérios de Revisão

Antes de apresentar a Sprint para aceite, deverá ser confirmado:

- alinhamento com a Fase 5, com o roadmap e com o objetivo de fechamento da versão 1.0;
- compatibilidade com visão, princípios, especificação, arquitetura, estilo, workflow e Sprints 01 a 06;
- necessidade mínima e separação clara dos cinco contratos;
- ausência de tipos proprietários, credenciais, SDKs, chamadas ou efeitos externos;
- estado desativado realmente padrão e execução básica independente de configuração;
- configuração segura no servidor e documentação sem valores sensíveis;
- distinção entre storage externo de objetos/arquivos e persistência de entidades da Sprint 05;
- injeção explícita, substituição e ausência de singleton, registro global ou plugin implícito;
- testes orientados a comportamento e independentes de qualquer provedor;
- regressão dos serviços, autenticação e interface sem alteração indevida;
- documentação de clonagem coerente com o comportamento real e com versões bloqueadas;
- critérios de estabilidade da versão 1.0 baseados em evidências, sem publicar release automaticamente;
- alteração exclusiva dos arquivos autorizados e ausência de artefatos;
- ausência de dependências, configurações e mudanças arquiteturais não autorizadas;
- riscos, limitações, pendências e validações não executadas registrados de forma transparente.

# Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Contratos especulativos para cinco capacidades | APIs sem consumidor real e manutenção preventiva | Limitar cada contrato ao menor caso de uso aprovado, testar apenas comportamento observável e retirar formalmente qualquer porta sem justificativa. |
| Sprint final ampla demais | Revisão superficial e critérios inconclusivos | Manter módulos independentes, fechar a lista de arquivos e interromper se qualquer entrega exigir expansão. |
| Integração opcional tornar-se obrigatória | Clones sem configuração deixam de compilar ou executar | Exigir imports seguros, estado desativado, build e execução básica sem ambiente externo. |
| Configuração ou segredo exposto | Comprometimento de credenciais e dados internos | Ler configuração somente no servidor, versionar nomes sem valores e revisar cliente, diff e documentação. |
| Acoplamento indireto a fornecedor | Troca de provedor exige reescrita do núcleo | Definir portas internas antes de qualquer adaptador e proibir SDK, tipo e nomenclatura proprietária. |
| Sobreposição de storage e persistência | Contratos confusos e responsabilidades duplicadas | Manter `storage.ts` para objetos/arquivos externos e `Repository` da Sprint 05 para entidades, com testes e documentação distintos. |
| Falsa garantia de segurança ou estabilidade | Versão 1.0 declarada sem evidência operacional | Exigir clonagem limpa, validações completas, riscos registrados e aprovação explícita separada para estabilidade. |
| Alteração acidental de autenticação ou interface | Regressão nas Sprints anteriores | Proibir arquivos das camadas anteriores, executar regressões e revisar o diff completo. |
| Testes autorreferentes | Falsa confiança em contratos não implementáveis | Exercitar estados, falhas e invariantes por colaboradores substituíveis, sem acessar detalhes internos. |
| Artefatos ou dependências não autorizados | Repositório inconsistente e aumento de manutenção | Não instalar ferramentas, revisar status antes/depois e excluir qualquer saída gerada do escopo. |

# Dependências

## Pré-requisitos

- Sprints 01 a 06 formalmente encerradas e preservadas como linha de base.
- Contratos de persistência da Sprint 05 e camada visual da Sprint 06 disponíveis e sem regressão conhecida.
- Autenticação da Sprint 02, serviços das Sprints 03 e 04 e fundação da Sprint 01 preservados.
- Necessidade, operação mínima e limites de cada contrato opcional revisados antes da implementação.
- Estratégia de configuração por ambiente definida sem valores sensíveis no repositório.
- Lista de arquivos autorizados revisada e considerada suficiente.
- Aprovação formal deste documento e autorização explícita para iniciar a implementação.
- Estado inicial do repositório limpo ou com alterações preexistentes identificadas.
- Node.js, TypeScript, Next.js, React, Tailwind e ferramentas já instaladas disponíveis no ambiente.
- Ambiente limpo disponível para validar clonagem sem habilitar qualquer integração.

Se algum pré-requisito permanecer pendente, a implementação deverá permanecer suspensa.

## Dependências técnicas existentes

- Contratos e testes das Sprints 03, 04 e 05.
- App Router, autenticação e proteção de rotas existentes.
- Componentes, estados, responsividade e acessibilidade da Sprint 06.
- TypeScript, runtime Node.js e módulos nativos de teste já disponíveis.
- Scripts oficiais de build e desenvolvimento, somente para validação.
- Git e documentação existente para inspeção de escopo e clonagem.

## Novas dependências

**Nenhuma.**

Não estão autorizados novos pacotes, SDKs, serviços externos, clientes de fornecedor, scripts, configurações, variáveis de ambiente adicionais ou alterações de lockfile. Se uma dependência for considerada necessária, a implementação deverá parar e a Sprint deverá ser revisada formalmente.

# Plano de Implementação

1. Confirmar os pré-requisitos, registrar o estado inicial e verificar a consistência real das Sprints 01 a 06.
2. Definir por escrito, antes da criação dos módulos, a operação mínima e o estado desativado de cada capacidade.
3. Criar o contrato comum de estado opcional e erros estáveis sem efeitos externos.
4. Criar separadamente os cinco contratos de capacidade, mantendo tipos internos neutros e sem adaptadores concretos.
5. Criar os testes de contratos, configuração inválida e estado desativado com colaboradores controlados e sem rede.
6. Documentar no `README.md` clonagem, execução, validação, configuração opcional, substituição e remoção das portas.
7. Atualizar `.env.example` somente com nomes e comentários aprovados, sem valores reais, e registrar o estado validado em `PROJECT_STATE.md`.
8. Executar regressão dos serviços, autenticação e interface, typecheck, build e validações de escopo.
9. Validar clonagem em ambiente limpo sem habilitar integrações, revisar critérios de estabilidade e registrar pendências.
10. Revisar o diff completo e preparar a entrega para aprovação, sem criar tag, release, deploy, push ou publicação.

O plano não amplia a autorização. Se qualquer etapa exigir integração concreta, dependência, arquivo, configuração ou decisão adicional, o trabalho deverá parar e solicitar revisão formal.

# Plano de Validação

| Item | Método de validação | Evidência esperada |
| --- | --- | --- |
| REQ-01 / CA-02 / CA-15 | Revisão de nomes, tipos, textos e busca por referências de produto ou fornecedor | Contratos neutros, sem DocAI, marca ou API proprietária. |
| REQ-02 / CA-01 | Inspeção dos cinco módulos e seus imports | Cinco capacidades separadas, sem contrato universal ou dependência cruzada indevida. |
| REQ-03 / CA-03 | Revisão pública e testes dos métodos | Operações mínimas, sem flags ou extensões hipotéticas. |
| REQ-04 / CA-04 | Implementação de colaborador controlado nos testes | Adaptador futuro pode substituir a porta sem alterar consumidores. |
| REQ-05 / CA-05 | Execução sem configuração e inspeção do bootstrap | Todas as capacidades permanecem desativadas e a base executa normalmente. |
| REQ-06 / CA-06 | Testes de desativação, configuração inválida e falha controlada | Códigos internos estáveis, mensagens seguras e causa preservada quando aplicável. |
| REQ-07 / CA-07 | Revisão de `.env.example`, fronteiras cliente/servidor e busca por segredos | Somente nomes e exemplos vazios; nenhum valor sensível exposto. |
| REQ-08 / CA-08 / CA-10 | Execução dos testes sem rede e inspeção de imports | Nenhum SDK, cliente, chamada externa ou efeito real. |
| REQ-09 / CA-09 | Comparação com `lib/persistence/repository.ts` e revisão documental | Storage externo distinto da persistência de entidades. |
| REQ-10 / CA-04 | Inspeção de construção e ausência de singleton/registro global | Dependências explícitas e substituíveis. |
| REQ-11 / CA-11 | Regressão de serviços, autenticação, rotas e interface | Sprints anteriores continuam compatíveis e sem erro conhecido. |
| REQ-12 / CA-10 / CA-16 | Execução de testes, typecheck e build em ambiente sem integrações | Resultado conhecido sem rede, credenciais ou dependência nova. |
| REQ-13 / CA-12 | Clonagem limpa seguindo `README.md` | Instalação, execução e validação reproduzíveis com integrações desligadas. |
| REQ-14 / CA-13 | Inspeção de manifests, lockfile, scripts e configurações | Nenhuma dependência ou configuração não autorizada. |
| REQ-15 / CA-18 | Checklist final das Sprints 01 a 07 e revisão de riscos | Evidências ou pendências explícitas; nenhuma declaração automática de release. |
| Escopo / CA-17 / CA-19 | `git status`, `git diff --name-only`, `git diff --check` e revisão do diff | Somente arquivos autorizados, sem artefatos, segredos ou antecipações. |

Sequência mínima de validação:

1. registrar `git status --short` e a referência da branch antes da implementação;
2. executar testes dos contratos opcionais e o conjunto de regressão das Sprints 03 a 06;
3. executar `./node_modules/.bin/tsc --noEmit`;
4. executar `npm run build` com todas as capacidades desativadas;
5. executar lint somente se houver script oficial; caso contrário, declarar sua indisponibilidade;
6. executar `git diff --check`;
7. inspecionar os cinco contratos, o estado comum, os testes e os documentos autorizados;
8. procurar SDKs, clientes, chamadas de rede, credenciais, tipos proprietários e referências a fornecedores;
9. revisar `.env.example` e confirmar que nenhuma variável sensível foi exposta ao cliente;
10. validar manualmente clonagem, instalação reproduzível, execução e testes em ambiente limpo;
11. revalidar responsividade, teclado, foco, contraste, semântica e estados da interface da Sprint 06;
12. atribuir status e evidência a cada critério de aceitação e a cada critério de estabilidade;
13. comparar o estado final com o inicial e confirmar a lista fechada de arquivos;
14. registrar falhas, limitações, riscos e verificações não executadas antes da entrega.

Nenhum comando poderá instalar, remover ou atualizar dependências. Artefatos de build, caches, arquivos temporários e valores sensíveis não poderão integrar a entrega.

# Critérios de Estabilidade da Versão 1.0

A versão 1.0 poderá ser proposta como estável somente quando, além dos critérios desta Sprint:

- as Sprints 01 a 07 estiverem encerradas ou qualquer item retirado estiver formalmente registrado;
- uma clonagem limpa instalar as versões bloqueadas sem alterar o lockfile;
- a aplicação puder ser compilada e executada seguindo exclusivamente a documentação;
- autenticação, configuração e limitações estiverem documentadas sem credenciais versionadas;
- serviços, persistência e contratos opcionais permanecerem neutros e substituíveis;
- nenhuma capacidade opcional for necessária para build ou execução básica;
- testes, typecheck, build e lint disponível tiverem resultado conhecido sem erro impeditivo;
- a interface autenticada possuir evidências de responsividade e acessibilidade básica;
- não existirem segredos, dados reais, artefatos temporários ou arquivos pendentes;
- a documentação de visão, arquitetura, estado, clonagem e uso estiver coerente com o comportamento real;
- não houver dependência sem uso, contrato sem justificativa atual ou funcionalidade específica de produto;
- riscos e limitações conhecidos estiverem registrados;
- o responsável pelo projeto aprovar explicitamente a estabilidade e a preparação da versão 1.0.

Esses critérios não autorizam tag, release, pacote, deploy, publicação ou integração concreta. Cada operação exigirá solicitação específica.

# Critérios de Conclusão

A Sprint foi considerada **tecnicamente concluída e encerrada** porque:

- os cinco contratos e o estado opcional estiverem entregues dentro dos arquivos autorizados;
- todos os contratos forem neutros, pequenos, separados, substituíveis e desativados por padrão;
- não existir adaptador concreto, SDK, chamada externa, segredo ou configuração proprietária;
- testes de contrato, estado desativado e regressão tiverem sido executados com resultado conhecido;
- typecheck, build, `git diff --check` e lint aplicável tiverem sido executados ou declarados;
- clonagem limpa, execução e validação estiverem documentadas e verificadas;
- responsividade e acessibilidade da Sprint 06 tiverem sido revalidadas;
- cada critério de aceitação e de estabilidade possuir status e evidência;
- nenhum erro conhecido invalidar o objetivo ou a execução sem integrações;
- somente os arquivos autorizados tiverem sido criados ou modificados;
- nenhuma dependência, configuração, variável de ambiente, script, manifesto ou lockfile não autorizada tiver sido alterada;
- riscos, limitações, pendências e validações não executadas tiverem sido relatados;
- o diff e o estado final do repositório tiverem sido revisados e apresentados ao responsável.

O responsável pelo projeto aprovou a implementação e a validação desta Sprint. A declaração da versão 1.0, tag, release, deploy, publicação e integrações concretas continuam sendo decisões separadas e não estão autorizadas por este encerramento.

# Registro de Encerramento

## Commit da implementação

- **Hash:** `1c8058c32b39fc6f5eb60e87fa41cdaa799fe2b5`
- **Mensagem:** `feat: add optional integration contracts`

## Arquivos efetivamente alterados

O commit de implementação contém exclusivamente:

- `.env.example`
- `PROJECT_STATE.md`
- `README.md`
- `lib/integrations/ai.ts`
- `lib/integrations/contracts.test.ts`
- `lib/integrations/mail.ts`
- `lib/integrations/optional-capability.test.ts`
- `lib/integrations/optional-capability.ts`
- `lib/integrations/payments.ts`
- `lib/integrations/pdf.ts`
- `lib/integrations/storage.ts`

`SPRINT_07.md` foi mantido fora do commit de implementação e está sendo versionado neste commit documental separado.

## Validações executadas

- `node --test lib/integrations/contracts.test.ts lib/integrations/optional-capability.test.ts lib/persistence/in-memory-repository.test.ts lib/templates/template-service.test.ts lib/documents/document-service.test.ts`: 43 testes aprovados.
- `./node_modules/.bin/tsc --noEmit`: concluído sem erro.
- `npm run build`: concluído sem erro.
- `git diff --check`: concluído sem erro.
- Lint: indisponível, pois o projeto não possui script oficial.
- Revisão de segurança e escopo: nenhum SDK, cliente, chamada externa, segredo, artefato ou arquivo não autorizado foi incluído.

## Riscos remanescentes

- As integrações concretas permanecem deliberadamente inexistentes; cada produto derivado deverá avaliá-las e implementá-las em escopo próprio.
- A autenticação continua dependendo de configuração externa válida para validação funcional completa.
- A clonagem foi documentada, mas não foi executada em um clone remoto independente durante esta entrega.
- A versão 1.0 ainda exige decisão formal separada, mesmo com os critérios técnicos registrados.

## Confirmação de encerramento

A Sprint 07 está **encerrada**, com implementação, validações e critérios de aceitação registrados. Nenhuma integração real foi adicionada e não há pendência técnica que invalide o objetivo da Sprint.

# Entrega Esperada

Ao concluir tecnicamente a Sprint, a entrega deverá apresentar:

- contratos neutros e separados para IA, pagamentos, PDF, e-mail e armazenamento externo;
- mecanismo comum de estado desativado e erros previsíveis;
- testes sem rede, credenciais, SDK ou serviço externo;
- documentação de clonagem, execução, validação e substituição;
- estado do projeto atualizado somente dentro do arquivo autorizado;
- lista completa dos arquivos criados e modificados;
- comandos executados e resultados de testes, typecheck, build, lint e `git diff --check`;
- evidências de regressão, responsividade, acessibilidade, segurança e escopo;
- status individual dos critérios de aceitação e estabilidade;
- riscos, limitações, falhas, pendências e verificações não executadas;
- confirmação de que nenhuma integração real, dependência nova ou funcionalidade de produto foi incluída.

O estado após a entrega é **Sprint 07 encerrada**. A versão 1.0 permanece sujeita aos critérios de estabilidade e à aprovação específica do responsável pelo projeto.

# Commit Esperado

**Mensagem proposta:** `feat: add optional integration contracts`

**Commit da implementação:** `1c8058c32b39fc6f5eb60e87fa41cdaa799fe2b5`

**Mensagem deste registro documental:** `docs: close Sprint 07`

**Arquivos previstos:**

- `lib/integrations/optional-capability.ts`
- `lib/integrations/ai.ts`
- `lib/integrations/payments.ts`
- `lib/integrations/pdf.ts`
- `lib/integrations/mail.ts`
- `lib/integrations/storage.ts`
- `lib/integrations/contracts.test.ts`
- `lib/integrations/optional-capability.test.ts`
- `README.md`
- `.env.example`
- `PROJECT_STATE.md`

O commit de implementação possui um único objetivo e contém somente os arquivos autorizados. Este registro documental deverá ser commitado separadamente, contendo somente `SPRINT_07.md`. Nenhum dos commits autoriza integração concreta, tag, release, deploy ou publicação.

# Observações

- Esta Sprint fecha a sequência técnica proposta para a versão 1.0, mas não transforma o Starter Kit em plataforma de integrações.
- “Adaptador opcional” nesta Sprint significa uma porta interna, um estado inativo ou um colaborador nulo; não significa cliente ou integração de fornecedor.
- IA, pagamentos, PDF, e-mail e armazenamento externo devem poder ser omitidos por completo por qualquer SaaS derivado.
- O armazenamento externo de objetos ou arquivos não é repositório de entidades e não substitui o contrato genérico da Sprint 05.
- O uso de Supabase Auth existente para identidade não autoriza usar Supabase como fornecedor das demais capacidades.
- O estado de `PROJECT_STATE.md` deverá ser confrontado com o estado real do repositório antes de qualquer atualização; inconsistências preexistentes não autorizam correções fora dos arquivos listados.
- A documentação de clonagem deve explicar o caminho mínimo sem configuração opcional e separar claramente propostas futuras de capacidades habilitadas.
- Nenhuma evidência de contrato, build ou documentação, isoladamente, autoriza declarar a versão 1.0 estável; a aprovação final permanece com o responsável pelo projeto.
- Qualquer necessidade de dividir esta Sprint, ampliar contratos ou alterar arquivos fora da lista deverá ser apresentada como revisão formal antes da implementação.
- O encerramento desta Sprint registra a conclusão técnica e documental, mas não cria uma release nem altera o histórico dos commits de implementação.
