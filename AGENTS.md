# Diretrizes para Agentes

## Objetivo

Este documento é o ponto de entrada oficial para qualquer agente de inteligência artificial que participe deste projeto. Ele deve ser lido antes de interpretar uma tarefa, propor uma solução ou alterar qualquer arquivo.

O `AGENTS.md` existe para:

- indicar quais documentos governam o trabalho;
- definir o comportamento esperado antes, durante e depois de cada tarefa;
- preservar decisões, arquitetura e alterações preexistentes;
- impedir expansão silenciosa de escopo;
- estabelecer revisão, validação, comunicação e aprovação obrigatórias.

Este documento não define funcionalidades nem concede autorização para implementá-las. A tarefa ou a Sprint atual deve indicar o objetivo, o escopo e os arquivos permitidos.

Os demais documentos operacionais apenas referenciam estas diretrizes e as fontes oficiais aplicáveis.

## Fonte Única de Verdade

Cada assunto do DocAI possui uma única fonte oficial de verdade. Os demais documentos apenas referenciam essa fonte e nunca duplicam seu conteúdo.

Se uma decisão precisar ser alterada, ela deve ser alterada apenas na sua fonte oficial de verdade. Todos os demais documentos devem apenas referenciá-la, nunca duplicá-la.

Sempre que houver duplicidade documental, ela deverá ser resolvida antes da implementação de novas funcionalidades. Nenhum documento de apoio, planejamento ou histórico pode redefinir arquitetura, estratégia, prioridades ou regras permanentes.

### Distribuição oficial

1. `ARCHITECTURE.md` é a fonte oficial da arquitetura. Contém princípios arquiteturais, componentes protegidos, fluxo da aplicação, regras de evolução, `ContractDefinition`, `formSchema`, `generationSchema`, renderer, motor e checklist arquitetural.
2. `PRODUCT_SPEC.md` é a fonte oficial da visão e da estratégia do produto. Contém objetivo, proposta de valor, público-alvo, posicionamento, diferenciais e funcionalidades do DocAI, sem redefinir arquitetura.
3. `docs/ROADMAP_BIBLIOTECA.md` é a fonte oficial da evolução da biblioteca. Contém categorias, prioridades, contratos aprovados, ordem de implementação, critérios de inclusão e rejeição e roadmap das próximas Sprints.
4. `AGENTS.md` é a fonte oficial das regras permanentes de desenvolvimento e colaboração.
5. `docs/SPRINT_NN.md` delimita o trabalho aprovado enquanto a Sprint estiver ativa. Após aprovação e encerramento, torna-se registro histórico daquele momento; decisões estratégicas permanentes devem ser consolidadas na fonte oficial correspondente. Sprints legadas fora de `docs/` permanecem apenas como histórico.
6. `README.md` é a entrada do projeto e apenas resume responsabilidades e referencia as fontes oficiais.
7. `AI_RULES.md` e `MASTER_PROMPT.md` são pontos de compatibilidade e referência; não mantêm cópias das regras permanentes.

`UI_GUIDELINES.md` e `CODE_STYLE.md` permanecem fontes especializadas, respectivamente, para interface e estilo de código. Eles não podem redefinir os assuntos reservados às fontes oficiais acima.

### Resolução de conflitos

Ao identificar um conflito, o agente deve:

1. interromper qualquer alteração dependente da decisão;
2. identificar os documentos e trechos envolvidos;
3. identificar qual fonte oficial é responsável pelo assunto;
4. aplicar a decisão registrada nessa fonte quando a resposta for inequívoca;
5. avaliar impacto sobre escopo, arquivos, arquitetura e validação;
6. informar a divergência antes de modificar o projeto;
7. solicitar decisão quando ainda houver ambiguidade material.

O agente não deve escolher silenciosamente a interpretação mais conveniente, editar documentos para eliminar o conflito ou implementar uma solução intermediária sem aprovação.

Em caso de conflito, prevalece `ARCHITECTURE.md` para arquitetura, `PRODUCT_SPEC.md` para visão e estratégia do produto, `docs/ROADMAP_BIBLIOTECA.md` para evolução da biblioteca e `AGENTS.md` para desenvolvimento e colaboração. Uma Sprint pode autorizar um recorte de trabalho, mas não substitui essas fontes.

## Responsabilidades do Agente

### Compreender antes de alterar

O agente deve:

- ler este arquivo e as fontes oficiais relacionadas à tarefa;
- ler integralmente a tarefa e a Sprint atual;
- identificar objetivo, entregas, exclusões e critérios de aceitação;
- inspecionar o estado do repositório e os arquivos relacionados;
- distinguir alterações preexistentes do trabalho atual;
- confirmar quais arquivos podem ser criados, modificados, movidos ou removidos;
- definir como o resultado será validado;
- apresentar dúvidas materiais antes da execução.

Nenhuma alteração deve começar enquanto uma decisão pendente puder mudar o resultado, o escopo, a arquitetura, dependências ou configurações.

### Preservar a arquitetura

O agente deve:

- respeitar responsabilidades e direção das dependências;
- utilizar a estrutura existente antes de propor novas camadas;
- manter regras específicas separadas da fundação reutilizável;
- evitar acoplamento a detalhes substituíveis;
- não criar abstrações para possibilidades futuras;
- registrar e submeter qualquer mudança arquitetural à aprovação.

Se a arquitetura existente impedir uma entrega, o agente deve relatar a limitação. Isso não autoriza uma reestruturação automática.

### Preservar a documentação

O agente deve tratar a documentação como fonte de verdade e:

- manter terminologia e decisões consistentes com a fonte oficial responsável;
- não reescrever planejamento para justificar trabalho não aprovado;
- atualizar documentos somente quando necessário e autorizado;
- preservar links, referências e a distribuição oficial de responsabilidades;
- referenciar decisões sem reproduzi-las em documentos concorrentes;
- separar estado atual, proposta e planejamento futuro;
- informar quando uma entrega exigir atualização documental fora do escopo.

### Evitar mudanças de escopo

O agente deve implementar apenas o menor resultado aprovado. Ideias descobertas durante o trabalho podem ser registradas como propostas, mas não devem gerar código, arquivos, dependências ou configurações.

Qualquer funcionalidade, arquivo, refatoração, integração ou comportamento adicional deve ser tratado como mudança de escopo.

### Respeitar a Sprint

O agente deve:

- trabalhar em uma Sprint por vez;
- relacionar cada alteração a um item aprovado;
- respeitar a lista de arquivos autorizados;
- não antecipar Sprints futuras;
- verificar cada critério de aceitação;
- distinguir conclusão técnica de encerramento aprovado;
- parar após a entrega quando o fluxo exigir aceite.

## O que o agente nunca deve fazer

O agente nunca deve:

- instalar, remover ou atualizar dependências sem autorização explícita;
- alterar manifestos, arquivos de lock, scripts ou configurações sem autorização;
- alterar a arquitetura silenciosamente;
- modificar vários arquivos quando um escopo menor for suficiente;
- criar, mover ou remover arquivos fora da lista autorizada;
- implementar funcionalidades fora da Sprint atual;
- antecipar funcionalidades mencionadas no roadmap;
- ignorar documentação aplicável;
- inventar requisitos, critérios ou decisões de produto;
- criar abstrações, serviços, componentes ou camadas para cenários hipotéticos;
- misturar implementação com refatorações ou correções não relacionadas;
- sobrescrever, reverter ou incluir alterações preexistentes sem autorização;
- remover código ou documentação sem justificar e verificar referências;
- expor segredos, credenciais ou dados sensíveis;
- ocultar erros, riscos, limitações ou validações não executadas;
- declarar sucesso sem evidência;
- executar commit, push, publicação ou ação externa sem autorização correspondente;
- iniciar outra tarefa ou Sprint por iniciativa própria;
- interpretar silêncio como aprovação.

## Processo de Trabalho

Toda tarefa deve seguir este fluxo.

### 1. Ler documentação

- Ler este arquivo.
- Identificar e ler as fontes oficiais relacionadas ao assunto.
- Ler a Sprint atual e os documentos complementares aplicáveis.
- Inspecionar os arquivos, configurações e estado do repositório relacionados ao escopo.

### 2. Planejar

- Traduzir o pedido em resultado observável.
- Delimitar o que está dentro e fora do escopo.
- Identificar arquivos autorizados.
- Avaliar impactos, dependências, riscos e compatibilidade.
- Definir etapas pequenas.
- Definir validações antes de executar.
- Solicitar aprovação se existir decisão material pendente.

### 3. Implementar

- Alterar somente o necessário.
- Seguir arquitetura, estilo e diretrizes de interface.
- Preservar comportamento e arquivos fora do escopo.
- Reutilizar apenas quando houver padrão real.
- Evitar efeitos colaterais de ferramentas.
- Parar se surgir necessidade não autorizada.

### 4. Revisar

- Comparar a entrega com o objetivo e a Sprint.
- Revisar o diff completo.
- Verificar código, arquitetura, documentação e escopo.
- Procurar erros, duplicação, código morto e abstrações prematuras.
- Confirmar que alterações anteriores foram preservadas.
- Corrigir somente problemas dentro do escopo.

### 5. Validar

- Executar lint quando configurado e aplicável.
- Executar typecheck quando disponível.
- Executar build quando aplicável.
- Executar testes relacionados.
- Verificar critérios de aceitação individualmente.
- Verificar responsividade e acessibilidade em mudanças visuais.
- Declarar verificações indisponíveis ou não aplicáveis.
- Confirmar que apenas arquivos autorizados foram afetados.

O agente não deve instalar ou configurar ferramentas apenas para satisfazer uma etapa inexistente. A ausência deve ser relatada.

### 6. Relatar

- Listar todos os arquivos afetados.
- Explicar o objetivo de cada alteração.
- Informar comandos e validações relevantes.
- Apresentar status dos critérios de aceitação.
- Relatar riscos, falhas, limitações e pendências.
- Confirmar se houve dependências ou configurações alteradas.
- Indicar claramente o estado seguinte.

### 7. Aguardar aprovação

Depois de entregar o relatório, o agente deve parar quando houver exigência de aceite. Não deve iniciar trabalho adicional, nova Sprint ou operação externa antes de autorização explícita.

## Auto-revisão

Antes da entrega, o agente deve responder a todo o checklist.

### Escopo

- [ ] O objetivo autorizado foi atendido sem ampliação?
- [ ] Cada alteração está ligada a um requisito ou critério?
- [ ] Somente arquivos autorizados foram afetados?
- [ ] Alterações preexistentes foram preservadas?
- [ ] Não há melhoria oportunista no diff?

### Arquitetura e código

- [ ] A arquitetura e a direção das dependências foram respeitadas?
- [ ] A solução é a mais simples capaz de atender ao requisito?
- [ ] Não foram criadas abstrações prematuras?
- [ ] Nomes, tipos, responsabilidades e imports estão claros?
- [ ] Não há código morto, recurso sem uso ou comentário obsoleto introduzido?
- [ ] Erros, valores externos e dados sensíveis foram tratados corretamente?

### Interface

- [ ] As diretrizes de interface aplicáveis foram respeitadas?
- [ ] Estados relevantes foram considerados?
- [ ] Responsividade foi verificada quando aplicável?
- [ ] Semântica, teclado, foco, contraste e textos alternativos foram avaliados?

### Documentação

- [ ] A documentação necessária está sincronizada?
- [ ] Todos os documentos modificados estavam autorizados?
- [ ] Estado atual e planejamento futuro estão claramente separados?
- [ ] Links, nomes e referências permanecem corretos?
- [ ] Não há produto específico incorporado à fundação reutilizável?

### Validação

- [ ] Lint foi executado ou sua indisponibilidade foi declarada?
- [ ] Typecheck foi executado ou sua cobertura foi explicada?
- [ ] Build foi executado quando aplicável?
- [ ] Testes aplicáveis foram executados?
- [ ] Cada critério de aceitação possui status e evidência?
- [ ] Falhas e verificações não executadas foram relatadas?

### Repositório e entrega

- [ ] O estado final foi comparado com o estado inicial?
- [ ] Dependências e configurações permaneceram dentro do escopo?
- [ ] Não há arquivo temporário, gerado ou sensível incluído?
- [ ] O relatório lista todos os arquivos afetados?
- [ ] O próximo estado e a necessidade de aprovação estão claros?

Se qualquer resposta obrigatória for negativa, o agente deve corrigir o problema dentro do escopo ou informar a pendência antes de concluir.

## Comunicação

A comunicação deve ser breve durante a execução e completa na entrega.

### Durante a tarefa

O agente deve:

- informar o que está analisando e qual arquivo pretende alterar;
- comunicar riscos e impedimentos assim que surgirem;
- distinguir fato, hipótese, recomendação e decisão pendente;
- explicar mudanças de abordagem relevantes;
- não apresentar trabalho parcial como conclusão.

### Na entrega

O relatório final deve conter:

1. **Arquivos alterados** — todos os arquivos criados, modificados, movidos ou removidos.
2. **Resumo das mudanças** — o que foi feito e por quê.
3. **Riscos** — impactos conhecidos ou possibilidades relevantes.
4. **Limitações** — o que não pôde ser verificado ou concluído.
5. **Testes realizados** — comandos, inspeções e resultados.
6. **Critérios atendidos** — status de cada critério de aceitação.
7. **Escopo** — confirmação de que não houve mudança fora do autorizado.
8. **Estado seguinte** — aguardando revisão, aprovação ou instrução.

O agente não deve ocultar falhas, usar descrições vagas ou expor dados sensíveis. Alterações preexistentes devem ser distinguidas do trabalho atual.

## Aprovação

Nenhuma nova tarefa ou Sprint deve começar sem aprovação explícita quando o fluxo exigir aceite.

O agente deve:

- encerrar a execução ao alcançar o resultado autorizado;
- apresentar evidências e limitações;
- aguardar a decisão do responsável pelo projeto;
- não interpretar silêncio como consentimento;
- não considerar commit ou push como aprovação da Sprint;
- não estender uma aprovação para tarefas relacionadas;
- solicitar nova autorização para qualquer expansão.

Conclusão técnica significa que o trabalho está pronto para revisão. Encerramento significa que o responsável pelo projeto revisou e aprovou formalmente o resultado.

## Evolução

Este documento pode evoluir quando uma necessidade recorrente de colaboração, segurança ou processo for comprovada. Novas regras devem aumentar previsibilidade sem reduzir controles existentes.

Uma alteração do `AGENTS.md` deve:

- partir de um problema real e documentado;
- permanecer genérica para agentes atuais e futuros;
- preservar as responsabilidades das demais fontes oficiais;
- preservar a autoridade operacional da Sprint ativa;
- não conceder autonomia adicional sem aprovação;
- explicar impacto sobre regras existentes;
- evitar duplicação ou precedência ambígua;
- incluir transição quando modificar comportamento esperado;
- ser revisada e aprovada antes de entrar em vigor.

Quando uma nova regra conflitar com outra, o conflito deve ser resolvido explicitamente. Não se deve reinterpretar silenciosamente um princípio nem criar exceção informal.

Uma exceção deve ser específica, justificada, limitada à tarefa atual e autorizada. Ela não altera automaticamente a regra permanente.
