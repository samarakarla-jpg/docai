# Protocolo Mestre para Agentes de Inteligência Artificial

## Objetivo

Este documento define o protocolo principal que qualquer agente de inteligência artificial deve seguir ao trabalhar no SaaS Starter Kit. Seu objetivo é garantir que toda colaboração seja previsível, limitada ao escopo, tecnicamente responsável e alinhada às decisões aprovadas.

O protocolo estabelece:

- a sequência obrigatória de leitura;
- as verificações anteriores à implementação;
- as regras durante a execução;
- as validações necessárias;
- o formato de entrega;
- o tratamento de aprovações, conflitos e mudanças de escopo;
- os critérios para conclusão técnica de uma Sprint.

O agente atua como responsável técnico pela execução, revisão e comunicação do trabalho autorizado. Ele não define sozinho requisitos, prioridades, arquitetura, dependências ou escopo.

Este documento não autoriza funcionalidades. Uma implementação somente pode começar quando existir uma tarefa ou Sprint com resultado, limites e arquivos claramente aprovados.

## Ordem de Leitura Obrigatória

Antes de planejar, propor ou executar qualquer alteração, o agente deve ler integralmente os documentos nesta ordem:

1. `VISION.md`
2. `PROJECT_PRINCIPLES.md`
3. `PRODUCT_SPEC.md`
4. `ARCHITECTURE.md`
5. `UI_GUIDELINES.md`
6. `CODE_STYLE.md`
7. `DEVELOPMENT_WORKFLOW.md`
8. `AI_RULES.md`
9. `ROADMAP.md`
10. `SPRINT_NN.md`, correspondente à Sprint atual

Esta é uma ordem de leitura, não uma autorização cumulativa. Cada documento fornece contexto e restrições, mas somente a tarefa explicitamente aprovada e a Sprint atual delimitam o trabalho operacional.

O agente também deve ler:

- documentos complementares relacionados à tarefa;
- os arquivos que poderão ser afetados;
- configurações relevantes, somente para inspeção;
- o estado atual do repositório;
- alterações preexistentes que precisem ser preservadas.

Se um documento obrigatório estiver ausente, incompleto ou inacessível, o agente deve informar a limitação. Quando essa ausência impedir uma decisão segura, nenhuma alteração deve ser iniciada.

Reler apenas um resumo anterior não substitui a leitura dos documentos atuais quando a tarefa exigir a sequência obrigatória.

## Antes de Implementar

Antes de modificar qualquer arquivo, o agente deve confirmar que existe autorização suficiente e que o resultado pode ser validado.

### Compreender o escopo

O agente deve identificar:

- objetivo da tarefa;
- resultado esperado;
- entregas aprovadas;
- exclusões explícitas;
- critérios de aceitação;
- estado esperado após a conclusão;
- tarefas e Sprints que permanecem fora do trabalho atual.

Menções em visão, especificação ou roadmap não devem ser interpretadas como autorização. Exemplos, sugestões e possibilidades futuras permanecem fora do escopo.

### Identificar arquivos autorizados

O agente deve:

- listar os arquivos que podem ser criados, modificados, movidos ou removidos;
- inspecionar seu conteúdo atual;
- registrar alterações preexistentes;
- confirmar que a solução cabe na lista autorizada;
- evitar ferramentas que produzam mudanças colaterais.

Se um arquivo adicional se tornar necessário, o agente deve parar e solicitar revisão de escopo antes de modificá-lo.

### Verificar dependências e configurações

O agente deve verificar se a solução exigirá:

- nova dependência;
- remoção ou atualização de biblioteca;
- alteração de manifesto ou arquivo de lock;
- mudança de script;
- variável de ambiente;
- ajuste de compilação, lint ou teste;
- configuração de infraestrutura ou serviço externo.

Nenhuma dessas mudanças pode ser realizada sem autorização explícita. A existência de uma solução mais conveniente baseada em nova ferramenta não justifica sua adoção.

### Informar riscos

Riscos materiais devem ser apresentados antes da implementação, incluindo:

- alteração incompatível;
- impacto arquitetural;
- possível perda de dados ou comportamento;
- efeito sobre segurança, acessibilidade ou desempenho;
- dependência de serviço ou ambiente externo;
- validação indisponível;
- dificuldade de reversão;
- conflito com trabalho preexistente.

O agente deve diferenciar risco confirmado, hipótese e recomendação.

### Pedir aprovação quando houver dúvida

Uma dúvida exige aprovação quando sua resposta puder alterar:

- comportamento;
- experiência;
- escopo;
- arquivos autorizados;
- arquitetura;
- dependências;
- configurações;
- dados;
- segurança;
- critérios de aceitação.

O pedido de aprovação deve explicar a decisão pendente, as alternativas, os impactos e a recomendação. A ausência de resposta não constitui autorização.

### Definir a validação

Antes de implementar, o agente deve estabelecer:

- quais comandos oficiais serão executados;
- quais critérios precisam de inspeção manual;
- quais estados e limites serão verificados;
- como será confirmado que nenhum arquivo indevido mudou;
- quais limitações do ambiente podem afetar a conclusão.

## Durante a Implementação

### Alterar somente o necessário

- Modificar apenas arquivos e trechos relacionados ao objetivo.
- Escolher o menor desenho capaz de atender ao requisito.
- Não misturar formatação, refatoração ou correções paralelas.
- Não criar arquivos, pastas ou camadas para cenários futuros.
- Manter as mudanças pequenas e fáceis de revisar.

### Respeitar a Sprint atual

- Relacionar cada mudança a uma entrega ou critério aprovado.
- Trabalhar em uma Sprint por vez.
- Não antecipar itens posteriores.
- Não reinterpretar a Sprint para acomodar trabalho já iniciado.
- Interromper a execução quando o resultado necessário ultrapassar os limites aprovados.

### Evitar feature creep

Ideias descobertas durante o trabalho podem ser registradas como propostas, mas não devem ser implementadas automaticamente. Uma melhoria não entra no escopo por ser rápida, útil ou tecnicamente próxima.

O agente deve concluir quando o objetivo aprovado for atingido, sem adicionar variações, estados, componentes ou capacidades não solicitados.

### Controlar dependências

- Não instalar, remover ou atualizar dependências sem autorização.
- Utilizar primeiro recursos existentes.
- Não alterar manifestos, arquivos de lock ou scripts como efeito colateral.
- Não introduzir ferramenta apenas para facilitar uma tarefa isolada.

### Preservar a arquitetura

- Respeitar responsabilidades e direção das dependências.
- Não mover regras entre camadas silenciosamente.
- Não criar abstrações prematuras.
- Não acoplar a fundação a detalhes específicos.
- Não alterar contratos, fronteiras ou padrões arquiteturais sem registrar impacto e obter aprovação.

Quando a arquitetura existente impedir o requisito, o agente deve relatar o conflito. Isso não autoriza uma reestruturação automática.

### Preservar código e documentação existentes

- Tratar alterações preexistentes como pertencentes ao responsável pelo projeto.
- Não sobrescrever, reverter ou incluir trabalho anterior sem autorização.
- Não remover código, recursos ou documentação sem justificar e verificar referências.
- Manter comportamento fora do escopo inalterado.
- Atualizar documentação somente quando necessário e autorizado.
- Evitar mudanças automáticas em arquivos não relacionados.

### Comunicar desvios

Falhas, impactos inesperados e limitações devem ser comunicados assim que forem identificados. O agente não deve ocultar um desvio para apresentar uma conclusão aparentemente completa.

## Validação

Toda entrega deve ser validada de forma proporcional ao risco. Cada item abaixo deve ser executado quando aplicável, declarado como não aplicável com justificativa ou informado como indisponível.

### Lint

- Executar o comando oficialmente configurado.
- Corrigir violações introduzidas pela tarefa.
- Não desabilitar regras ou alterar configuração sem autorização.
- Informar quando não existir ferramenta disponível.

### Typecheck

- Executar a verificação de tipos disponível.
- Confirmar que não foram introduzidos novos erros.
- Não utilizar tipos amplos ou supressões apenas para silenciar falhas.
- Informar quando a checagem estiver incorporada a outro comando.

### Build

- Executar a compilação oficial quando a mudança puder afetá-la ou quando a Sprint exigir.
- Investigar falhas antes de atribuí-las ao ambiente.
- Não alterar dependências ou configurações para contornar erros sem aprovação.
- Registrar resultado, avisos relevantes e limitações.

### Testes

- Executar os testes existentes relacionados ao escopo.
- Cobrir comportamento principal, limites e falhas relevantes quando testes estiverem autorizados.
- Não criar infraestrutura de testes sem aprovação.
- Informar quando não existirem testes aplicáveis.

### Critérios de aceitação

- Verificar cada critério individualmente.
- Relacionar resultado e evidência.
- Não considerar um critério atendido apenas por inferência.
- Apresentar itens pendentes ou inconclusivos.

### Responsividade

Quando houver impacto de interface:

- verificar larguras reduzidas, intermediárias e amplas;
- confirmar preservação de conteúdo e ações;
- avaliar estados relevantes e textos de tamanhos diferentes;
- informar limitações de inspeção visual.

### Acessibilidade básica

Quando houver impacto de interface:

- revisar semântica e hierarquia;
- verificar teclado e foco em interações;
- avaliar contraste e uso independente de cor;
- confirmar rótulos, mensagens e textos alternativos;
- verificar nomes acessíveis dos controles.

### Escopo e repositório

Ao final, o agente deve:

- comparar o estado final com o inicial;
- confirmar que somente arquivos autorizados foram afetados;
- verificar ausência de alterações acidentais;
- confirmar que dependências e configurações permaneceram dentro do escopo;
- identificar arquivos temporários, gerados ou sensíveis;
- revisar o diff completo.

Uma validação que falhar não deve ser omitida nem substituída por outra menos relevante. Correções só podem ser realizadas dentro do escopo autorizado.

## Entrega

Ao finalizar uma tarefa, o agente deve apresentar um relatório claro e verificável.

### Arquivos alterados

Listar todos os arquivos:

- criados;
- modificados;
- movidos;
- removidos.

Alterações preexistentes que permanecerem no repositório devem ser distinguidas do trabalho atual.

### Resumo das mudanças

Explicar a finalidade de cada alteração e o resultado alcançado. O resumo deve refletir a extensão real do trabalho sem ocultar decisões, remoções ou efeitos relevantes.

### Comandos executados

Informar os comandos relevantes utilizados para:

- inspeção;
- validação;
- compilação;
- testes;
- versionamento;
- operações remotas, quando autorizadas.

Não expor segredos, credenciais ou dados sensíveis presentes em argumentos ou resultados.

### Validações realizadas

Relatar:

- quais verificações foram executadas;
- seus resultados;
- quais foram consideradas não aplicáveis;
- quais não puderam ser executadas;
- como limitações afetaram a confiança no resultado.

### Limitações ou falhas

Informar erros conhecidos, riscos, efeitos colaterais, pendências e resultados inconclusivos. Uma limitação não deve ser suavizada por linguagem vaga.

### Status dos critérios de aceitação

Apresentar cada critério como:

- atendido;
- não atendido;
- pendente;
- não verificável no ambiente atual.

O agente não deve declarar conclusão técnica enquanto existir erro conhecido que invalide o objetivo.

### Estado seguinte

O relatório deve indicar claramente se o trabalho:

- aguarda revisão;
- aguarda aprovação;
- está bloqueado por uma decisão;
- necessita de instrução adicional.

## Aprovação

Nenhuma nova Sprint ou tarefa pode ser iniciada sem aprovação explícita quando o fluxo exigir aceite.

O agente deve:

- parar após apresentar a entrega;
- aguardar revisão do responsável pelo projeto;
- não interpretar silêncio como aprovação;
- não iniciar trabalho futuro por continuidade aparente;
- não executar commit, push, publicação ou operação externa sem autorização correspondente;
- distinguir conclusão técnica de encerramento aprovado.

Uma aprovação se aplica somente ao escopo apresentado. Ela não autoriza automaticamente melhorias relacionadas, etapas posteriores ou mudanças descobertas durante a execução.

## Mudanças de Escopo

Qualquer necessidade fora da Sprint ou tarefa atual deve ser registrada como proposta, não como implementação.

São mudanças de escopo:

- nova funcionalidade;
- novo arquivo não autorizado;
- comportamento adicional;
- refatoração paralela;
- alteração arquitetural;
- dependência ou configuração;
- integração externa;
- mudança em dados;
- ampliação de critérios;
- correção não relacionada.

Ao identificar uma proposta, o agente deve:

1. interromper a expansão da tarefa;
2. descrever o problema ou oportunidade;
3. separar o requisito atual da proposta;
4. informar arquivos e comportamentos afetados;
5. apresentar impactos em arquitetura, dependências, configurações e validação;
6. indicar riscos e alternativas;
7. recomendar rejeição, revisão formal da Sprint ou planejamento futuro;
8. aguardar decisão explícita.

A proposta não deve produzir arquivos preparatórios, código parcial, dependências, configurações ou documentação que a apresente como aprovada.

Se a mudança for aceita na Sprint atual, seu objetivo, escopo, arquivos e critérios devem ser revisados formalmente antes da implementação.

## Conflitos entre Documentos

Para resolver conflitos, a ordem de autoridade é:

1. `VISION.md`
2. `PROJECT_PRINCIPLES.md`
3. `PRODUCT_SPEC.md`
4. `SPRINT_NN.md`, correspondente à Sprint atual
5. demais documentos de apoio

Esta ordem de autoridade é diferente da ordem obrigatória de leitura. Ler um documento antes não concede maior autoridade a ele.

Os documentos de apoio incluem arquitetura, diretrizes de interface, estilo de código, workflow, regras para agentes, prompt mestre, roadmap e demais orientações complementares. Eles detalham a execução sem poder contradizer os quatro níveis superiores.

O agente deve:

- comparar o requisito com todos os documentos aplicáveis;
- identificar a natureza e o impacto do conflito;
- respeitar o documento de maior autoridade;
- não escolher silenciosamente a interpretação mais conveniente;
- informar a divergência antes de qualquer alteração;
- solicitar decisão quando a autoridade não resolver a ambiguidade com segurança.

Um conflito não autoriza editar documentos, reinterpretar a Sprint ou implementar uma solução intermediária.

Quando um documento de apoio definir uma precedência diferente, essa divergência deve ser informada e esta seção deve orientar o tratamento dentro deste protocolo principal.

## Encerramento de Sprint

Uma Sprint pode ser considerada tecnicamente concluída e aguardando aceite somente quando:

- todos os itens aprovados foram entregues ou formalmente retirados do escopo;
- todos os critérios de aceitação possuem status e evidência;
- lint, typecheck, build e testes aplicáveis foram executados;
- verificações indisponíveis ou não aplicáveis foram declaradas;
- responsividade e acessibilidade foram verificadas quando houve impacto visual;
- não existem erros conhecidos que invalidem o objetivo;
- o resultado foi revisado quanto a código, arquitetura, segurança e consistência;
- somente arquivos autorizados foram alterados;
- dependências e configurações permaneceram dentro do escopo aprovado;
- documentação necessária foi atualizada dentro do escopo;
- o diff e o estado final do repositório foram revisados;
- riscos, limitações, falhas e pendências foram relatados;
- todos os arquivos afetados e comandos relevantes foram apresentados;
- o responsável pelo projeto recebeu o relatório final.

Conclusão técnica não é encerramento. Até o aceite, o estado correto é **tecnicamente concluída e aguardando aprovação**.

A Sprint somente é encerrada quando o responsável pelo projeto:

1. revisa a entrega;
2. avalia critérios e limitações;
3. aprova explicitamente o resultado.

Itens incompletos não são transferidos automaticamente. Eles devem ser reavaliados, priorizados e aprovados em outro escopo.

O encerramento não autoriza automaticamente nova Sprint, commit, push, publicação ou qualquer outra ação subsequente.
