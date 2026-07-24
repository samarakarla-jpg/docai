# Princípios Permanentes de Engenharia

## Objetivo

Este documento define os princípios permanentes que orientam decisões técnicas, planejamento, implementação, revisão e evolução do SaaS Starter Kit. Ele existe para manter a base simples, confiável e reutilizável, independentemente do domínio dos projetos criados a partir dela.

Os princípios estabelecem limites que devem ser respeitados por todas as Sprints. Eles não autorizam funcionalidades nem substituem requisitos específicos. Sua função é orientar como o trabalho deve ser conduzido quando uma mudança já possui necessidade, escopo e aprovação.

Quando existirem alternativas tecnicamente válidas, deve ser escolhida aquela que:

1. respeite a visão e o escopo aprovado;
2. entregue corretamente o menor resultado necessário;
3. introduza menos conceitos, dependências e partes móveis;
4. seja mais clara para utilizar, revisar e manter;
5. possa ser validada e revertida com segurança.

## Filosofia

### Simplicidade acima de complexidade

A solução mais simples capaz de atender integralmente ao requisito atual deve ser priorizada. Complexidade somente pode ser adicionada quando resolver um problema concreto, presente e demonstrável.

Uma solução simples:

- possui poucas responsabilidades e fluxos fáceis de acompanhar;
- utiliza primeiro os recursos já disponíveis;
- pode ser explicada sem depender de conhecimento oculto;
- evita configurações, camadas e variações sem benefício atual;
- não transfere obrigações desnecessárias para etapas futuras.

Sofisticação técnica não é um objetivo isolado. Se uma abordagem for mais difícil de compreender do que o problema que resolve, sua necessidade deve ser reavaliada.

### Reutilização acima de duplicação

Elementos realmente compartilháveis devem ser reutilizados para preservar comportamento, reduzir manutenção repetida e manter decisões consistentes. A reutilização deve ocorrer somente quando existir um padrão estável e uma responsabilidade comum claramente identificada.

Reutilizar não significa generalizar antecipadamente. Uma pequena repetição pode ser preferível a uma abstração prematura quando os casos ainda não demonstram a mesma necessidade. A extração de um elemento compartilhado deve simplificar o conjunto, não apenas deslocar sua complexidade.

Todo elemento reutilizável deve permanecer neutro em relação a domínio, marca, fornecedor e regras específicas de um produto derivado.

### Documentação antes da implementação

A documentação é a fonte de verdade do projeto. Antes de implementar, é necessário compreender a visão, os princípios, a especificação, o roadmap e a Sprint atual, respeitando essa hierarquia.

A documentação deve:

- explicar a necessidade e o resultado esperado;
- delimitar o que faz e o que não faz parte do trabalho;
- identificar arquivos, dependências e configurações afetados;
- estabelecer critérios de aceitação e validação;
- registrar riscos, limitações e decisões relevantes.

Uma ideia documentada no roadmap não constitui autorização de implementação. A autorização operacional deve estar explicitamente definida na Sprint atual e confirmada pelo responsável pelo projeto.

### Evolução incremental

O projeto deve avançar por meio de mudanças pequenas, relacionadas e verificáveis. Cada Sprint deve produzir um resultado limitado e compreensível antes que uma nova etapa seja iniciada.

A evolução incremental reduz risco, facilita revisão e permite corrigir decisões sem comprometer partes não relacionadas. Itens futuros não devem ser antecipados apenas porque parecem próximos, convenientes ou fáceis de incluir.

Novas ideias identificadas durante uma Sprint podem ser registradas para avaliação posterior, mas permanecem fora do escopo até que sejam priorizadas e aprovadas.

### Modularidade

Responsabilidades diferentes devem possuir limites claros. Uma nova capacidade deve ser incorporada de forma que sua manutenção, substituição ou remoção não exija conhecimento desnecessário de partes não relacionadas.

A modularidade deve:

- favorecer baixo acoplamento entre responsabilidades;
- manter regras específicas separadas da fundação reutilizável;
- expor somente os contratos necessários;
- evitar dependências circulares e conhecimento implícito;
- permitir que capacidades opcionais permaneçam opcionais.

Modularidade não significa criar uma pasta, camada ou serviço para cada conceito. A estrutura deve crescer somente quando uma separação concreta melhorar a clareza e a manutenção.

### Clareza

Código, documentação, nomes e decisões devem ser compreensíveis para uma pessoa familiarizada com a stack, sem exigir contexto oculto. A intenção de uma mudança deve ser evidente em sua estrutura, em sua documentação e em seu histórico.

Clareza deve prevalecer sobre concisão excessiva, convenções implícitas e soluções engenhosas difíceis de manter. Dúvidas, riscos e resultados inconclusivos devem ser comunicados de forma objetiva.

### Consistência

Soluções equivalentes devem seguir as mesmas convenções de estrutura, nomenclatura, documentação, validação e comportamento. Antes de introduzir um novo padrão, deve-se verificar se o projeto já possui uma forma adequada de resolver o mesmo tipo de problema.

Consistência não exige preservar uma decisão inadequada. Quando um padrão precisar mudar, a alteração deve possuir justificativa, escopo, estratégia de transição e aprovação explícita. Dois padrões concorrentes não devem coexistir sem necessidade documentada.

## Regras Gerais

As regras a seguir são obrigatórias em todas as mudanças:

- Nunca implementar funcionalidades fora da Sprint atual.
- Nunca modificar, criar ou remover arquivos que não estejam autorizados.
- Nunca tratar roadmap, exemplos ou possibilidades futuras como autorização operacional.
- Nunca ampliar silenciosamente o escopo de uma entrega.
- Sempre validar o resultado antes do commit.
- Sempre comparar os arquivos alterados com a lista autorizada.
- Sempre manter a documentação sincronizada quando a mudança afetar comportamento, decisões, estrutura ou processo.
- Sempre comunicar erros, limitações, riscos e validações não executadas.
- Sempre interromper o trabalho quando uma decisão material exigir nova aprovação.
- Evitar dependências desnecessárias ou adicionadas apenas por conveniência.
- Evitar código morto, recursos sem uso e caminhos que não participem do comportamento aprovado.
- Evitar abstrações prematuras e generalizações baseadas em cenários hipotéticos.
- Evitar misturar implementação, refatoração e correções não relacionadas no mesmo escopo.
- Evitar configurações preventivas para ambientes, integrações ou escalas ainda inexistentes.
- Preservar segurança, acessibilidade, legibilidade e manutenção dentro do escopo aprovado.
- Manter segredos, credenciais e dados sensíveis fora do repositório.

Quando houver dúvida sobre uma mudança, deve-se:

1. consultar a hierarquia documental;
2. confirmar o resultado autorizado pela Sprint;
3. eliminar alternativas que resolvam problemas não aprovados;
4. preferir a opção com menor complexidade suficiente;
5. avaliar impacto, risco, reversibilidade e forma de validação;
6. solicitar aprovação se a decisão alterar escopo, arquitetura, dependências ou configurações.

## Arquitetura

Toda nova funcionalidade deve respeitar a arquitetura existente e os limites documentados. Antes de criar uma nova estrutura, deve-se identificar onde a responsabilidade se encaixa, quais partes serão afetadas e se os recursos atuais já são suficientes.

Uma mudança arquitetural somente deve ser realizada quando:

- existir um requisito atual que a justifique;
- a alternativa mais simples tiver sido considerada;
- responsabilidades e dependências estiverem claramente delimitadas;
- impactos e riscos estiverem documentados;
- a migração puder ser dividida em etapas seguras, quando necessário;
- a Sprint autorizar explicitamente os arquivos e as decisões envolvidas.

Novas funcionalidades não devem contornar padrões existentes, duplicar responsabilidades ou acoplar a fundação a um domínio específico. Se a arquitetura atual impedir uma entrega aprovada, a limitação deve ser apresentada antes da implementação; ela não autoriza uma reestruturação automática.

## Documentação

Toda alteração relevante deve possuir documentação correspondente e proporcional ao seu impacto. Documentar não significa repetir o código, mas registrar contexto, intenção, limites, decisões e formas de verificação que não sejam evidentes apenas pela implementação.

A documentação deve permanecer:

- alinhada à hierarquia do projeto;
- coerente com o comportamento existente;
- neutra em relação a produtos específicos quando pertencer ao Starter Kit;
- atualizada no mesmo escopo da mudança que a tornou necessária;
- clara sobre o que está aprovado, planejado ou apenas proposto.

Documentos mais específicos podem detalhar os anteriores, mas não podem contradizê-los ou ampliar silenciosamente seu escopo. Quando uma alteração exigir atualizar um documento não autorizado pela Sprint, o trabalho deve parar até que o escopo seja revisado.

## Commits

Cada commit deve representar uma unidade coerente, revisada e validada de trabalho. Um commit deve ser pequeno o suficiente para ser compreendido isoladamente e completo o suficiente para não deixar o projeto em um estado inválido.

Boas práticas obrigatórias:

- criar o commit somente após executar as validações previstas;
- incluir apenas arquivos pertencentes ao mesmo escopo aprovado;
- revisar o diff e o estado do repositório antes de confirmar;
- utilizar uma mensagem objetiva que descreva o resultado entregue;
- evitar misturar formatação, refatoração ou correções não relacionadas;
- não incluir arquivos gerados, temporários, credenciais ou dados sensíveis;
- não ocultar falhas conhecidas sob uma mensagem genérica;
- manter rastreabilidade entre commit, Sprint e critérios de aceitação.

Um commit concluído não encerra automaticamente uma Sprint. O encerramento depende da revisão do resultado e da aprovação explícita do responsável pelo projeto.

## Revisões

Antes da aprovação, cada Sprint deve passar por uma revisão proporcional ao risco e ao impacto das mudanças.

A revisão deve confirmar:

1. **Alinhamento** — o resultado corresponde ao objetivo e às entregas aprovadas.
2. **Escopo** — somente arquivos e comportamentos autorizados foram alterados.
3. **Critérios de aceitação** — todos foram verificados ou possuem impedimentos declarados.
4. **Qualidade** — a solução é clara, simples, consistente e adequada à arquitetura.
5. **Validação** — as verificações previstas foram executadas e seus resultados foram registrados.
6. **Documentação** — decisões e comportamentos relevantes estão sincronizados.
7. **Dependências e configurações** — não houve mudanças sem autorização explícita.
8. **Riscos** — limitações, efeitos colaterais e pendências conhecidos foram apresentados.
9. **Estado final** — o repositório permanece compreensível, executável e sem alterações acidentais.

Se um critério não puder ser confirmado, a Sprint não deve ser declarada encerrada. Ela pode ser apresentada como tecnicamente concluída e aguardando aceite somente quando não existirem erros conhecidos que invalidem seu objetivo.

O responsável pelo projeto realiza a aprovação final. A ausência de resposta não deve ser interpretada como aceite.

## Evolução

Estes princípios podem evoluir quando novas necessidades de engenharia forem comprovadas. Novas regras podem ser adicionadas para esclarecer decisões, cobrir riscos reais ou melhorar o processo, desde que não quebrem os fundamentos existentes.

Uma evolução deste documento deve:

- partir de uma necessidade concreta;
- preservar simplicidade, clareza, consistência e controle de escopo;
- explicar o problema que a nova regra resolve;
- evitar regras específicas de um único produto;
- permanecer compatível com a hierarquia documental;
- ser revisada e aprovada antes de produzir efeitos sobre novas implementações.

Quando uma nova regra entrar em conflito com um princípio existente, o conflito deve ser resolvido explicitamente. Não se deve alterar silenciosamente o significado de uma regra nem usar uma exceção local para enfraquecer os limites permanentes do projeto.

Os princípios devem crescer por aprendizado validado, não por tentativa de prever todas as situações futuras.
