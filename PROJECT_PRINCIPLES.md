# Princípios do Projeto

Este documento estabelece os critérios permanentes para planejar, desenvolver e evoluir o SaaS Starter Kit. Toda decisão deve respeitar estes princípios e permanecer alinhada à visão do produto.

## 1. Princípios fundamentais

### Simplicidade acima de tudo

A solução mais simples que atenda integralmente ao escopo aprovado deve ser a escolhida. Complexidade só pode ser adicionada quando existir uma necessidade concreta, atual e demonstrável.

### Escopo explícito

Somente o que foi solicitado, compreendido e aprovado deve ser implementado. Ideias relacionadas, melhorias oportunistas e preparações para possíveis necessidades futuras não fazem parte do trabalho atual.

### Evolução incremental

O projeto deve avançar por meio de sprints pequenas, com objetivos claros e resultados verificáveis. Cada etapa deve produzir uma mudança limitada, compreensível e segura antes que a próxima seja iniciada.

### Aprovação antes da implementação

Nenhuma funcionalidade, dependência ou mudança relevante deve ser introduzida sem aprovação explícita. Quando uma decisão ampliar o escopo autorizado, o trabalho deve ser interrompido e submetido a nova avaliação.

### Necessidade antes de abstração

Abstrações, extensões e generalizações devem nascer de necessidades reais. O projeto não deve ser preparado antecipadamente para cenários hipotéticos.

### Clareza e manutenção

Código, documentação e decisões devem ser fáceis de compreender. A velocidade de entrega não justifica soluções obscuras, frágeis ou desnecessariamente difíceis de manter.

### Documentação como referência

A hierarquia documental orienta o desenvolvimento. Documentos mais específicos devem detalhar os anteriores sem contradizê-los, e o código deve refletir apenas o escopo aprovado para a sprint.

## 2. O que sempre deve ser priorizado

As prioridades do projeto, nesta ordem, são:

1. Alinhamento com a visão e com o escopo aprovado.
2. Entrega correta do menor resultado necessário.
3. Clareza para quem utiliza, revisa ou mantém o projeto.
4. Facilidade de manutenção e evolução incremental.
5. Uso responsável das capacidades já disponíveis no projeto.
6. Verificação proporcional ao risco da mudança.

Quando houver conflito entre conveniência e simplicidade, a simplicidade deve prevalecer. Quando houver conflito entre velocidade e clareza, deve-se escolher a alternativa que preserve a compreensão e a segurança da entrega.

## 3. O que nunca deve ser feito

- Implementar funcionalidades que não tenham sido solicitadas e aprovadas.
- Instalar bibliotecas sem autorização explícita.
- Ampliar silenciosamente o escopo de uma sprint.
- Criar abstrações para necessidades apenas imaginadas.
- Adicionar configurações, camadas ou estruturas sem benefício atual comprovado.
- Misturar uma entrega aprovada com refatorações ou melhorias não relacionadas.
- Tomar uma decisão que contradiga a hierarquia da documentação.
- Ocultar incertezas, limitações, riscos ou efeitos colaterais relevantes.
- Sacrificar legibilidade e manutenção para antecipar uma entrega.
- Usar a ideia de “preparar para o futuro” como justificativa isolada para aumentar a complexidade.

## 4. Como tomar decisões quando houver dúvida

Quando existir mais de uma alternativa, a decisão deve seguir este processo:

1. Consultar a hierarquia documental, começando pela visão e pelos princípios.
2. Confirmar qual resultado pertence ao escopo aprovado.
3. Eliminar alternativas que resolvam problemas ainda inexistentes.
4. Preferir a opção com menos conceitos, dependências e partes móveis.
5. Avaliar clareza, manutenção, reversibilidade e risco.
6. Verificar se a escolha exige uma nova autorização.

Se a dúvida puder alterar materialmente o produto, o escopo, uma dependência ou uma configuração, não se deve presumir a resposta. A decisão deve ser apresentada para aprovação antes da implementação.

## 5. Como evitar feature creep

Cada sprint deve possuir um objetivo único ou um conjunto pequeno de objetivos diretamente relacionados. Toda mudança precisa ser rastreável a um item aprovado da sprint.

Novas ideias identificadas durante o trabalho podem ser registradas para avaliação futura, mas não devem ser implementadas automaticamente. Uma ideia útil continua fora do escopo até que seja priorizada e aprovada.

A sprint termina quando seus critérios aprovados são atendidos. Melhorias adicionais não devem ser incorporadas apenas porque parecem rápidas, convenientes ou próximas do código que já está sendo alterado.

## 6. Como manter a simplicidade

- Começar com o menor desenho capaz de atender ao requisito atual.
- Utilizar primeiro os recursos já disponíveis na plataforma e no projeto.
- Introduzir uma nova camada somente quando ela resolver um problema concreto.
- Manter responsabilidades pequenas, nomes claros e fluxos fáceis de seguir.
- Evitar duplicação prematura de estruturas destinadas a usos ainda não confirmados.
- Fazer mudanças pequenas e isoladas, facilitando revisão e reversão.
- Remover ou rejeitar complexidade que não produza valor para o escopo atual.
- Revisitar decisões quando a solução se tornar mais difícil de explicar do que o problema.

Uma solução é considerada simples quando atende ao objetivo aprovado, pode ser entendida sem conhecimento oculto e não cria obrigações desnecessárias para etapas futuras.
