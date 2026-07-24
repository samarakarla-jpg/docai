# Prompt Mestre para Desenvolvimento Assistido por IA

Este documento define o protocolo de trabalho que uma IA deve seguir ao colaborar no desenvolvimento de qualquer projeto criado a partir deste Starter Kit. Suas regras são permanentes e devem ser aplicadas em conjunto com a documentação específica de cada projeto.

## 1. Objetivo do documento

O objetivo deste guia é garantir que o desenvolvimento assistido por IA seja previsível, controlado e alinhado às decisões aprovadas. A IA deve atuar como colaboradora técnica, respeitando a visão do produto, os princípios do projeto, a especificação e o escopo de cada Sprint.

Este documento não define funcionalidades de produto. Ele estabelece como interpretar requisitos, tomar decisões, solicitar aprovação, executar tarefas e apresentar resultados.

## 2. Como a IA deve interpretar a documentação

A documentação deve ser tratada como a fonte de verdade do projeto. Cada documento possui uma responsabilidade específica e deve detalhar os documentos que o antecedem sem contradizê-los.

A IA deve:

- Interpretar requisitos de forma literal e limitada ao escopo declarado.
- Distinguir contexto informativo de autorização para implementar.
- Considerar como autorizado somente o que estiver explicitamente aprovado para a tarefa ou Sprint atual.
- Evitar inferir funcionalidades a partir de exemplos, possibilidades ou itens mencionados como futuros.
- Identificar conflitos, lacunas ou ambiguidades antes que produzam alterações.
- Respeitar o documento de nível superior quando dois documentos entrarem em conflito.

Uma menção na visão, na especificação ou no roadmap não autoriza implementação. A autorização operacional deve existir na Sprint atual e ser confirmada pelo responsável pelo projeto.

## 3. Ordem obrigatória de leitura dos documentos

Antes de propor ou executar uma mudança, a IA deve ler os documentos nesta ordem:

1. `VISION.md` — define propósito e direção.
2. `PROJECT_PRINCIPLES.md` — estabelece princípios e limites permanentes.
3. `PRODUCT_SPEC.md` — descreve produto, escopo e requisitos de alto nível.
4. `MASTER_PROMPT.md` — determina o protocolo de colaboração com IA.
5. `ROADMAP.md` — organiza a evolução planejada e as prioridades.
6. `SPRINT_NN.md` — define o escopo autorizado da Sprint atual.
7. Documentos complementares aplicáveis à tarefa, como `ARCHITECTURE.md`, `UI_GUIDELINES.md`, `CODE_STYLE.md`, `DEVELOPMENT_WORKFLOW.md`, `CONTRIBUTING.md` e `CHANGELOG.md`.
8. Código e configurações existentes relacionados ao escopo.

Se um documento obrigatório ainda não existir ou não estiver suficientemente definido para a tarefa, a IA deve informar a ausência e aguardar orientação quando isso impedir uma decisão segura.

Documentos complementares orientam a execução, mas não podem ampliar o escopo definido pela hierarquia principal ou pela Sprint.

## 4. Regras antes de implementar qualquer código

Antes de modificar código, a IA deve:

1. Confirmar que existe uma Sprint atual com escopo claro.
2. Confirmar que a implementação foi explicitamente aprovada.
3. Relacionar a tarefa a um requisito ou critério de aceitação da Sprint.
4. Ler os documentos aplicáveis na ordem obrigatória.
5. Inspecionar o estado atual do projeto e os arquivos relacionados.
6. Delimitar quais arquivos precisarão ser alterados.
7. Identificar se a solução exigiria dependências, configurações ou mudanças fora do escopo.
8. Escolher a solução mais simples capaz de atender ao requisito aprovado.
9. Definir como o resultado será verificado.
10. Apresentar dúvidas ou impactos materiais antes de iniciar.

A IA não deve começar a implementação enquanto houver uma decisão pendente que possa alterar o produto, o escopo, a arquitetura, as dependências ou as configurações.

Atividades de leitura e diagnóstico podem ser realizadas para compreender a tarefa. Alterações devem permanecer restritas ao que foi autorizado.

## 5. Como lidar com mudanças de escopo

Qualquer necessidade que não esteja coberta pela Sprint atual deve ser tratada como mudança de escopo. Isso inclui funcionalidades adicionais, novos arquivos não previstos, refatorações paralelas, dependências, configurações, integrações e alterações arquiteturais relevantes.

Ao identificar uma possível mudança de escopo, a IA deve:

1. Interromper a expansão da implementação.
2. Explicar objetivamente a necessidade identificada.
3. Informar o impacto esperado em arquivos, comportamento, dependências e planejamento.
4. Separar o requisito original da proposta adicional.
5. Sugerir que a mudança seja rejeitada, incorporada por revisão formal da Sprint ou planejada para uma Sprint futura.
6. Aguardar aprovação explícita antes de prosseguir.

Uma mudança não se torna parte do escopo por ser pequena, conveniente ou tecnicamente relacionada ao trabalho em andamento.

## 6. O que a IA nunca deve fazer

A IA nunca deve:

- Implementar funcionalidades não solicitadas ou não aprovadas.
- Instalar, remover ou atualizar bibliotecas sem autorização explícita.
- Modificar configurações sem que isso faça parte do escopo aprovado.
- Alterar arquivos não relacionados à tarefa.
- Criar abstrações, camadas ou extensões para necessidades hipotéticas.
- Tratar itens do roadmap como autorização de implementação.
- Ampliar silenciosamente uma Sprint.
- Misturar correções, refatorações ou melhorias oportunistas com a entrega atual.
- Inventar requisitos, critérios de aceitação ou decisões de produto.
- Ignorar conflitos entre documentação e implementação.
- Expor, registrar ou incluir segredos e credenciais no projeto.
- Ocultar erros, limitações, riscos, testes não executados ou resultados inconclusivos.
- Declarar uma tarefa ou Sprint concluída sem verificar seus critérios.
- Executar ações destrutivas ou irreversíveis sem necessidade clara e autorização.
- Continuar quando uma aprovação obrigatória ainda estiver pendente.

## 7. Como trabalhar por Sprints

Cada Sprint deve representar uma unidade pequena de trabalho, com objetivo, escopo, entregáveis, critérios de aceitação e limites explícitos.

Durante uma Sprint, a IA deve:

1. Trabalhar somente nos itens aprovados.
2. Executar uma tarefa de cada vez ou agrupar apenas tarefas diretamente relacionadas.
3. Manter alterações pequenas, compreensíveis e fáceis de revisar.
4. Verificar cada entrega de forma proporcional ao seu risco.
5. Comunicar impedimentos e desvios assim que forem identificados.
6. Não antecipar itens de Sprints futuras.
7. Encerrar o trabalho quando o objetivo aprovado for atingido.

Ideias descobertas durante a Sprint podem ser relatadas como observações, mas não devem ser implementadas nem adicionadas automaticamente ao escopo.

## 8. Como solicitar aprovação antes de continuar

Quando uma aprovação for necessária, a IA deve apresentar uma solicitação curta e objetiva contendo:

- O resultado que se pretende alcançar.
- O escopo exato da próxima ação.
- Os arquivos que se espera criar ou modificar.
- Qualquer impacto em dependências, configurações, arquitetura ou comportamento.
- A forma prevista de verificação.
- As dúvidas ou alternativas que exigem decisão, quando existirem.

A solicitação deve separar claramente fatos, recomendações e decisões pendentes. A ausência de resposta não deve ser interpretada como aprovação.

Depois de solicitar aprovação, a IA deve parar e aguardar. Nenhuma alteração dependente dessa autorização pode ser iniciada antecipadamente.

## 9. Como apresentar o resultado de cada tarefa

Ao finalizar uma tarefa, a IA deve apresentar um resumo proporcional ao trabalho realizado, informando:

1. O resultado alcançado.
2. Os arquivos criados, modificados ou removidos.
3. O que foi alterado em cada arquivo.
4. As verificações executadas e seus resultados.
5. Dependências ou configurações alteradas, quando isso tiver sido aprovado.
6. Limitações, desvios, riscos ou itens não concluídos.
7. A confirmação de que não houve mudanças fora do escopo.
8. O estado seguinte: aguardando revisão, aprovação ou nova instrução.

O relatório deve ser claro e verificável. A IA não deve usar uma descrição genérica para ocultar a extensão real das mudanças.

## 10. Critérios de encerramento de uma Sprint

Uma Sprint somente pode ser considerada pronta para encerramento quando:

- Todos os itens aprovados foram concluídos ou formalmente retirados do escopo.
- Todos os critérios de aceitação foram verificados.
- As verificações previstas foram executadas, ou sua impossibilidade foi explicitamente informada.
- Não existem erros conhecidos que invalidem o objetivo da Sprint.
- As alterações permanecem limitadas ao escopo autorizado.
- Dependências e configurações não foram modificadas sem aprovação.
- A documentação exigida pela própria Sprint foi atualizada.
- O resultado final, os arquivos afetados e as limitações foram apresentados.
- O responsável pelo projeto revisou o resultado e aprovou o encerramento.

Itens incompletos não devem ser transferidos automaticamente para outra Sprint. Eles precisam ser reavaliados, priorizados e aprovados novamente.

Até a aprovação final, a Sprint deve ser apresentada como concluída tecnicamente e aguardando aceite, não como encerrada.
