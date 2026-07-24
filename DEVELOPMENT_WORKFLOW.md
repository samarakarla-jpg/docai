# Manual Operacional de Desenvolvimento

## Objetivo

Este documento define o processo oficial para planejar, executar, revisar, validar e entregar qualquer mudança no SaaS Starter Kit. Sua finalidade é garantir que o desenvolvimento seja previsível, incremental, rastreável e compatível com a documentação aprovada.

O workflow se aplica a código, documentação, configurações, dependências, infraestrutura e operações de versionamento. Nenhuma etapa deste manual autoriza uma mudança por si só. O escopo operacional deve estar definido na tarefa ou na Sprint atual e aprovado pelo responsável pelo projeto.

O processo deve produzir três resultados:

- uma alteração limitada ao objetivo aprovado;
- evidências proporcionais de que o resultado está correto;
- um relatório claro para revisão e aceite.

## Filosofia

### Documentação primeiro

Toda mudança começa pela documentação. A visão define direção, o roadmap organiza prioridades, os princípios estabelecem limites, a arquitetura orienta a solução e a Sprint determina o trabalho permitido.

Documentação de planejamento não deve ser confundida com autorização. Uma possibilidade descrita para o futuro permanece fora do escopo até ser incorporada a uma Sprint aprovada.

### Evolução incremental

O projeto deve avançar pelo menor passo útil e verificável. Mudanças grandes devem ser divididas em entregas independentes sempre que isso reduzir risco sem criar estados inválidos.

### Uma Sprint por vez

Somente a Sprint atual pode orientar implementação. Itens de outra Sprint não devem ser antecipados, mesmo quando forem tecnicamente relacionados ou simples de incluir.

Uma nova Sprint só pode começar depois que a anterior for revisada, tiver seu estado claramente apresentado e receber a aprovação necessária.

### Simplicidade

A implementação deve utilizar a solução de menor complexidade capaz de atender ao requisito. Novas camadas, dependências, configurações e abstrações exigem necessidade atual e justificativa verificável.

### Qualidade antes da velocidade

Velocidade não justifica escopo impreciso, código obscuro, validação incompleta ou documentação desatualizada. Uma entrega rápida que aumenta risco ou manutenção não é considerada eficiente.

### Mudanças pequenas

Cada alteração deve possuir objetivo único ou um conjunto pequeno de objetivos diretamente relacionados. Arquivos e comportamentos sem relação não devem ser incluídos por conveniência.

### Validação contínua

A validação não deve ocorrer apenas no final. O estado do projeto deve ser verificado antes da mudança, durante etapas de risco e após a implementação. Falhas devem ser tratadas quando surgirem, sem serem ocultadas por verificações menos relevantes.

## Fluxo Completo

### 1. Ler a documentação obrigatória

Antes de planejar ou alterar arquivos, deve-se ler `AI_RULES.md` quando o trabalho for realizado por um agente e consultar a documentação conforme a hierarquia oficial:

1. `VISION.md`
2. `ROADMAP.md`
3. `PROJECT_PRINCIPLES.md`
4. `ARCHITECTURE.md`
5. `UI_GUIDELINES.md`
6. `CODE_STYLE.md`
7. `DEVELOPMENT_WORKFLOW.md`
8. `MASTER_PROMPT.md`
9. `PRODUCT_SPEC.md`

Sequências operacionais adicionais definidas em `MASTER_PROMPT.md` também devem ser cumpridas. Documentos complementares aplicáveis devem ser consultados antes da implementação.

Se um documento estiver ausente, incompleto ou contradizer outro de maior autoridade, o conflito deve ser apresentado antes de qualquer decisão material.

### 2. Ler a Sprint

A Sprint atual deve ser lida integralmente. É necessário identificar:

- objetivo;
- entregas;
- exclusões;
- pré-requisitos;
- arquivos autorizados;
- critérios de aceitação;
- riscos;
- validações;
- condição de encerramento.

Sem Sprint aprovada ou autorização equivalente claramente delimitada, somente leitura, diagnóstico e planejamento podem ser realizados.

### 3. Entender o objetivo

O objetivo deve ser traduzido em um resultado observável. Antes de prosseguir, deve estar claro:

- qual problema será resolvido;
- para quem o resultado produz valor;
- o que mudará;
- o que permanecerá inalterado;
- como será possível verificar a entrega.

Ambiguidade que possa alterar comportamento, arquitetura, dependências, configurações ou escopo deve ser resolvida pelo responsável pelo projeto.

### 4. Planejar

O plano deve dividir o trabalho em etapas pequenas e diretamente relacionadas. Deve indicar arquivos afetados, sequência, riscos e forma de validação.

O plano não deve incluir refatorações paralelas, melhorias opcionais, preparação preventiva ou itens de outra Sprint.

### 5. Identificar impactos

Antes de implementar, deve-se avaliar impacto sobre:

- arquivos e pastas;
- contratos e dependências entre módulos;
- comportamento existente;
- interface e acessibilidade;
- dados e segurança;
- configurações e ambientes;
- dependências externas;
- compilação e testes;
- documentação;
- compatibilidade e reversibilidade.

Se um impacto exigir arquivo ou decisão não autorizada, a implementação deve parar até a revisão formal do escopo.

### 6. Implementar

A implementação deve seguir o plano aprovado, a arquitetura e o guia de estilo. Somente arquivos autorizados podem ser modificados.

O trabalho deve permanecer pequeno, compreensível e executável. Descobertas futuras podem ser relatadas, mas não implementadas automaticamente.

### 7. Revisar o próprio código

Depois da implementação, o resultado deve ser relido como uma revisão independente. Deve-se comparar o diff com o objetivo, verificar nomes, tipos, responsabilidades, erros, segurança, acessibilidade e ausência de mudanças acidentais.

Correções encontradas podem ser realizadas somente quando permanecerem no escopo.

### 8. Executar lint

O lint deve ser executado com o comando oficialmente configurado. Violações relacionadas à tarefa devem ser corrigidas sem desabilitar regras ou alterar configuração.

Se o projeto não possuir lint configurado, essa ausência deve ser registrada. Não se deve instalar ou configurar uma ferramenta sem autorização.

### 9. Executar typecheck

A verificação de tipos disponível deve ser executada. Erros não devem ser ocultados com tipos amplos, assertions ou supressões sem justificativa.

Quando não houver comando separado, deve-se identificar se outra verificação oficial cobre os tipos. Limitações devem ser declaradas.

### 10. Executar build

A compilação oficial deve ser executada quando aplicável. Falhas devem ser investigadas antes de serem atribuídas ao ambiente.

Não se deve alterar dependências ou configurações para contornar uma falha sem aprovação. O resultado da compilação deve fazer parte do relatório.

### 11. Validar critérios de aceitação

Cada critério deve ser verificado individualmente. Testes, inspeção de interface, revisão de acessibilidade e outras verificações específicas devem ser executados conforme o escopo.

Um critério não pode ser marcado como atendido apenas porque a compilação foi concluída. Critérios não verificáveis devem ser apresentados como pendentes, com justificativa.

### 12. Atualizar documentação quando necessário

Documentação deve ser atualizada quando a mudança afetar comportamento, arquitetura, interface, convenções, operação ou planejamento.

Essa atualização precisa fazer parte dos arquivos autorizados. Se um documento necessário estiver fora do escopo, deve-se solicitar sua inclusão antes de modificá-lo.

### 13. Gerar commit

O commit deve ser criado somente após revisão e validação, e apenas quando autorizado. O índice deve conter exclusivamente a unidade de trabalho aprovada.

Antes do commit, deve-se revisar o diff, confirmar o status do repositório e verificar ausência de arquivos gerados, temporários ou sensíveis.

### 14. Solicitar aprovação antes de continuar

Ao concluir tecnicamente, deve-se apresentar resultado, arquivos afetados, validações, limitações e estado da Sprint.

O trabalho deve parar e aguardar aceite. A conclusão técnica não autoriza uma nova tarefa, outra Sprint, push, publicação ou mudança de escopo.

## Planejamento

O planejamento deve ocorrer antes de qualquer escrita de código.

### Análise da Sprint

Para cada item aprovado, deve-se responder:

- qual resultado é esperado;
- quais critérios comprovam esse resultado;
- quais arquivos estão autorizados;
- quais responsabilidades arquiteturais serão envolvidas;
- quais recursos existentes podem ser reutilizados;
- quais riscos podem impedir a entrega;
- quais verificações são necessárias.

### Inspeção do estado atual

Antes de propor a solução:

- verificar o status do repositório;
- identificar alterações preexistentes;
- ler os arquivos relacionados;
- compreender contratos e padrões existentes;
- confirmar scripts e ferramentas disponíveis;
- registrar o estado de arquivos sensíveis ao escopo quando necessário.

Alterações preexistentes devem ser preservadas e não podem ser incorporadas ao trabalho sem autorização.

### Definição da solução

A solução planejada deve:

- atender ao menor escopo aprovado;
- respeitar a arquitetura atual;
- utilizar capacidades existentes;
- evitar novas dependências e configurações;
- manter compatibilidade quando exigida;
- permitir validação objetiva;
- ser reversível de forma proporcional ao risco.

### Decisões pendentes

Uma dúvida deve interromper o planejamento quando sua resposta puder alterar:

- comportamento;
- experiência;
- dados;
- segurança;
- arquitetura;
- dependências;
- configurações;
- arquivos autorizados;
- critérios de aceitação.

Fatos, alternativas, impactos e recomendação devem ser apresentados separadamente. A decisão final pertence ao responsável pelo projeto.

## Implementação

### Alterar apenas o necessário

- Modificar somente arquivos e trechos relacionados ao requisito.
- Não misturar correções, formatação ou refatorações paralelas.
- Não criar estruturas para itens futuros.
- Evitar efeitos colaterais de ferramentas sobre arquivos não autorizados.
- Parar quando a solução exigir expansão de escopo.

### Reutilizar componentes

- Verificar se existe componente com a mesma responsabilidade.
- Reutilizar comportamento e semântica, não apenas aparência.
- Preservar o contrato existente ou documentar mudança aprovada.
- Não forçar reutilização entre casos com razões diferentes para mudar.
- Não adicionar variações hipotéticas a um componente compartilhado.

### Evitar duplicação

- Eliminar duplicação quando houver padrão real e estável.
- Manter uma pequena repetição quando a abstração produzir maior complexidade.
- Não duplicar regras, contratos ou fontes de verdade entre camadas.
- Confirmar que uma extração simplifica todos os consumidores.

### Manter a arquitetura

- Respeitar responsabilidades e direção das dependências.
- Manter regras de negócio fora da apresentação e da infraestrutura.
- Conservar detalhes externos atrás de adaptadores aprovados.
- Usar Server Components como padrão e limitar código cliente ao necessário.
- Não criar camada, serviço ou pasta sem necessidade atual.

### Preservar compatibilidade

- Identificar contratos públicos e consumidores antes de alterá-los.
- Evitar mudanças incompatíveis sem requisito explícito.
- Manter comportamento existente fora do escopo.
- Planejar transição e reversão para mudanças incompatíveis aprovadas.
- Não preservar comportamento incorreto quando a correção aprovada exigir mudança; nesse caso, documentar o impacto.

## Revisão

A revisão deve considerar o conjunto da entrega, não apenas a sintaxe.

### Código

- Confirmar correção e legibilidade.
- Revisar nomes, tipos, funções, efeitos e imports.
- Procurar código morto, estado duplicado e abstrações prematuras.
- Verificar tratamento de nulos, falhas e dados externos.
- Confirmar ausência de segredos e logs indevidos.

### Arquitetura

- Verificar separação de responsabilidades.
- Confirmar direção das dependências.
- Avaliar acoplamento e fronteiras alteradas.
- Verificar se uma nova abstração possui necessidade atual.
- Confirmar que regras específicas não contaminaram a fundação reutilizável.

### Documentação

- Verificar se comportamento e decisões estão descritos.
- Confirmar hierarquia, terminologia e referências.
- Distinguir estado atual de planejamento futuro.
- Garantir que nenhuma documentação amplie a Sprint silenciosamente.
- Confirmar que todos os documentos modificados estavam autorizados.

### Consistência

- Comparar a solução com padrões existentes.
- Verificar nomenclatura, estrutura e comportamento equivalentes.
- Confirmar alinhamento com estilo de código e diretrizes de interface.
- Evitar introduzir um segundo padrão sem estratégia de transição.

### Escopo

- Relacionar cada alteração a um item aprovado.
- Comparar arquivos afetados com a lista autorizada.
- Identificar alterações automáticas ou acidentais.
- Remover do diff qualquer trabalho oportunista não aprovado.
- Preservar alterações anteriores pertencentes a outras tarefas.

## Validação

O checklist abaixo é obrigatório para toda entrega. Cada item deve ser executado, marcado como não aplicável com justificativa ou declarado indisponível.

### Build

- Executar o comando oficial de compilação quando aplicável.
- Confirmar conclusão sem erro impeditivo.
- Registrar falhas, avisos relevantes e limitações.

### Lint

- Executar a verificação oficialmente configurada.
- Corrigir violações relacionadas à mudança.
- Declarar a ausência de ferramenta ou comando.

### Typecheck

- Executar a verificação de tipos disponível.
- Confirmar que a mudança não introduziu novos erros.
- Declarar quando a validação estiver incorporada a outro comando.

### Testes

- Executar testes existentes relacionados ao escopo.
- Adicionar testes apenas quando autorizados ou exigidos pelos critérios.
- Validar caminho principal, limites e falhas relevantes.
- Declarar quando não existirem testes aplicáveis.

### Critérios de aceitação

- Verificar cada critério separadamente.
- Registrar evidência ou método utilizado.
- Não considerar um critério atendido por inferência sem suporte.
- Relatar critérios pendentes ou inconclusivos.

### Responsividade

- Verificar interface em larguras reduzidas, intermediárias e amplas quando houver mudança visual.
- Confirmar ausência de perda de conteúdo ou ação.
- Avaliar textos curtos, longos e estados relevantes.
- Marcar como não aplicável para mudanças sem impacto de interface.

### Acessibilidade básica

- Verificar semântica, hierarquia de títulos e nomes acessíveis.
- Testar navegação por teclado e foco quando houver interação.
- Avaliar contraste e uso independente de cor.
- Confirmar rótulos, mensagens e textos alternativos aplicáveis.
- Marcar como não aplicável apenas quando não houver impacto de interface.

### Estado do repositório

Além do checklist solicitado, toda validação deve confirmar:

- somente arquivos autorizados foram alterados;
- dependências e configurações não mudaram sem aprovação;
- não existem arquivos temporários, gerados ou sensíveis no diff;
- validações não executadas foram explicitamente declaradas.

## Commits

### Quando criar

Um commit deve ser criado somente quando:

- o objetivo aprovado estiver tecnicamente concluído;
- a revisão tiver sido realizada;
- as verificações previstas tiverem resultado conhecido;
- o projeto não estiver em estado inválido;
- os arquivos no índice pertencerem ao mesmo escopo;
- houver autorização para registrar a mudança.

### Mensagens claras

- Descrever o resultado, não o processo de digitação.
- Utilizar linguagem objetiva e consistente.
- Evitar mensagens genéricas ou ambíguas.
- Indicar o tipo de mudança quando a convenção do projeto exigir.

### Pequenos commits

- Manter o commit compreensível isoladamente.
- Evitar agrupar mudanças independentes.
- Não dividir uma unidade de trabalho em estados inválidos apenas para reduzir tamanho.
- Facilitar revisão e reversão.

### Um objetivo por commit

Cada commit deve corresponder a um objetivo único ou conjunto indivisível de alterações relacionadas. Documentação necessária ao mesmo comportamento pode acompanhar a implementação quando estiver autorizada.

### Evitar commits mistos

Não misturar:

- funcionalidade com refatoração não relacionada;
- correção com formatação ampla;
- documentação independente com alteração de comportamento;
- arquivos de outra tarefa;
- mudanças preexistentes com a entrega atual.

Um commit não encerra automaticamente a Sprint.

## GitHub

Operações remotas alteram estado compartilhado e exigem autorização explícita.

### Criar commit

O commit é uma operação local. Deve ocorrer após validação e revisão do índice, conforme as regras anteriores. Não deve ser criado apenas para guardar trabalho incompleto, salvo quando um fluxo aprovado definir esse propósito.

### Criar push

O push deve ocorrer somente quando:

- o commit estiver correto e autorizado;
- a branch e o remote tiverem sido confirmados;
- não houver segredos ou arquivos indevidos;
- a operação remota tiver sido solicitada ou aprovada.

Não utilizar push forçado sem necessidade explícita, análise de impacto e autorização específica.

### Atualizar branch

Antes de atualizar uma branch:

- confirmar a branch atual e seu upstream;
- verificar se a árvore de trabalho está limpa ou devidamente protegida;
- inspecionar commits locais e remotos;
- escolher uma estratégia compatível com o fluxo aprovado;
- não sobrescrever alterações ou reescrever histórico silenciosamente;
- validar novamente após resolver conflitos.

Atualizações remotas não devem ser executadas como efeito colateral de outra tarefa.

### Abrir Pull Request

Uma Pull Request deve ser aberta quando o fluxo de colaboração exigir revisão remota ou quando isso for solicitado.

Ela deve conter:

- objetivo e contexto;
- resumo das alterações;
- arquivos ou áreas relevantes;
- validações executadas;
- riscos, limitações e pendências;
- relação com a Sprint ou requisito;
- instruções de revisão quando necessárias.

A Pull Request não deve esconder trabalho adicional, incluir commits não relacionados ou afirmar conclusão sem evidência. Criar repositório, alterar visibilidade, configurar proteções ou publicar releases são ações separadas e exigem autorização própria.

## Documentação

Cada documento deve ser atualizado apenas quando a mudança atingir sua responsabilidade:

- `README.md` — visão geral, tecnologias, estrutura, uso e índice documental.
- `VISION.md` — missão, direção ou limites fundamentais.
- `ROADMAP.md` — fases, prioridades e critérios de evolução.
- `PROJECT_PRINCIPLES.md` — regras permanentes de engenharia.
- `PRODUCT_SPEC.md` — escopo, requisitos e critérios de sucesso.
- `ARCHITECTURE.md` — responsabilidades, camadas, dependências e decisões arquiteturais.
- `UI_GUIDELINES.md` — padrões de interface, experiência, acessibilidade e responsividade.
- `CODE_STYLE.md` — convenções de escrita e organização do código.
- `DEVELOPMENT_WORKFLOW.md` — processo operacional de desenvolvimento.
- `AI_RULES.md` — comportamento e limites permanentes dos agentes.
- `MASTER_PROMPT.md` — protocolo de colaboração assistida.
- `SPRINT_NN.md` — escopo autorizado, entregas, riscos e critérios da Sprint.
- `CONTRIBUTING.md` — processo para contribuições externas ou internas.
- `CHANGELOG.md` — alterações relevantes conforme a política adotada.

Regras para atualização:

- atualizar no mesmo escopo da mudança que tornou a documentação necessária;
- não modificar documento fora da lista autorizada;
- não reescrever planejamento aprovado para justificar implementação já realizada;
- registrar mudança de escopo antes de executar o trabalho adicional;
- manter links, nomes e estado atual coerentes;
- evitar documentação especulativa.

Uma Sprint aprovada não deve ser alterada silenciosamente. Revisões devem identificar o que mudou, por que mudou e quem aprovou.

## Critérios para concluir uma Sprint

Uma Sprint pode ser apresentada como tecnicamente concluída somente quando:

- todos os itens aprovados foram entregues ou formalmente retirados;
- cada critério de aceitação foi verificado;
- lint, typecheck, build e testes aplicáveis foram executados;
- verificações indisponíveis ou não aplicáveis foram declaradas;
- responsividade e acessibilidade foram revisadas quando houve impacto visual;
- não existem erros conhecidos que invalidem o objetivo;
- o código foi revisado quanto a clareza, segurança e arquitetura;
- somente arquivos autorizados foram alterados;
- dependências e configurações não mudaram sem aprovação;
- documentação necessária foi atualizada dentro do escopo;
- o diff e o estado final do repositório foram revisados;
- riscos, limitações e pendências foram apresentados;
- o resultado e as validações foram relatados ao responsável pelo projeto.

A Sprint só é considerada encerrada quando o responsável pelo projeto revisar o resultado e aprovar formalmente o encerramento.

Itens incompletos não devem ser transferidos automaticamente. Eles precisam ser reavaliados, priorizados e aprovados em outro escopo.

O encerramento de uma Sprint não autoriza commit, push, publicação ou início da Sprint seguinte sem a aprovação correspondente.

## Melhoria Contínua

Este workflow pode evoluir quando o processo demonstrar uma necessidade recorrente ou um risco ainda não coberto. A melhoria deve preservar documentação primeiro, escopo explícito, validação e aprovação humana.

Uma alteração do workflow deve:

- resolver um problema real e documentado;
- permanecer genérica e reutilizável;
- ser compatível com os princípios e a arquitetura;
- reduzir ambiguidade ou risco;
- explicar impacto sobre o processo atual;
- evitar etapas ou ferramentas sem benefício demonstrado;
- considerar transição quando alterar uma prática existente;
- ser revisada e aprovada antes de entrar em vigor.

Métricas e aprendizados podem orientar ajustes, mas não devem incentivar volume de entregas em detrimento de qualidade. Exceções devem ser específicas, justificadas e limitadas.

O workflow deve evoluir de forma incremental, sem criar processos preventivos para cenários ainda inexistentes.
