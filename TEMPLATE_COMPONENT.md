# Nome do Componente

**Nome:** `[nome claro e descritivo]`

**Categoria:** `[ação | entrada | navegação | feedback | conteúdo | layout | outra]`

**Execução:** `[Server Component | Client Component]`

**Status:** `[proposto | em revisão | aprovado | disponível | descontinuado]`

**Responsável:** `[pessoa ou papel responsável]`

**Última revisão:** `[data ou versão]`

Identifique o componente pela responsabilidade que ele oferece, sem associá-lo a uma página, fluxo ou produto específico. A criação de um componente compartilhado deve responder a uma reutilização comprovada ou a uma responsabilidade independente.

Este modelo se aplica a componentes React e Next.js utilizados na fundação ou em qualquer produto derivado. Ele descreve o contrato esperado do componente, mas não autoriza sua implementação, a instalação de dependências ou a alteração de configurações.

# Objetivo

Explique por que o componente existe, qual necessidade recorrente resolve e qual benefício oferece aos seus consumidores.

`[Descrever o objetivo em um parágrafo.]`

O objetivo deve ser único, observável e independente de regras específicas de negócio. Se a necessidade puder ser atendida com clareza por um elemento existente, registre a decisão de reutilizá-lo em vez de criar outro componente.

# Responsabilidades

Liste apenas as responsabilidades próprias do componente.

- `[Apresentar determinado conteúdo ou controle.]`
- `[Transformar uma interação em um evento compreensível.]`
- `[Manter comportamento e semântica consistentes.]`
- `[Comunicar os estados relevantes.]`

Cada responsabilidade deve ser coesa e verificável. Coordenação de dados, regras de negócio, persistência e integrações deve permanecer na camada apropriada.

# Escopo

Defina as capacidades e variações aprovadas.

- **Uso principal:** `[situação atendida]`
- **Variações autorizadas:** `[variações necessárias]`
- **Conteúdo aceito:** `[tipos de conteúdo ou composição permitidos]`
- **Contextos aprovados:** `[onde a reutilização foi comprovada]`
- **Limites:** `[restrições conhecidas]`

O escopo deve representar o menor contrato capaz de atender aos usos atuais. Possibilidades futuras não devem ser transformadas em propriedades, estados ou comportamentos preventivos.

# Fora do Escopo

Registre o que o componente não deve fazer.

- `[Regra de negócio que pertence ao consumidor.]`
- `[Busca, persistência ou transformação externa de dados.]`
- `[Variação ainda não aprovada.]`
- `[Composição ou contexto que exige outro componente.]`

Itens fora do escopo podem ser avaliados futuramente, mas não devem ampliar silenciosamente a interface pública.

# Interface Pública

Descreva tudo o que os consumidores podem utilizar ou observar sem expor detalhes internos.

| Elemento público | Finalidade | Restrições |
| --- | --- | --- |
| `[componente, região ou capacidade]` | `[o que oferece ao consumidor]` | `[condições de uso]` |

A interface pública deve:

- ser pequena, previsível e estável;
- revelar intenção em vez de detalhes internos;
- permitir composição sem conhecimento da implementação;
- evitar combinações inválidas;
- não expor dependências ou fornecedores;
- preservar compatibilidade sempre que evoluir.

Alterações incompatíveis devem possuir necessidade documentada, impacto conhecido, estratégia de transição e aprovação.

# Props

**Aplicabilidade:** `[aplicável | não aplicável]`

Documente somente propriedades necessárias aos usos aprovados.

| Prop | Obrigatória | Tipo conceitual | Valor padrão | Descrição | Restrições |
| --- | --- | --- | --- | --- | --- |
| `[nome]` | `[sim | não]` | `[conteúdo, valor, opção, função ou outro]` | `[valor ou nenhum]` | `[responsabilidade da prop]` | `[valores válidos e combinações proibidas]` |

As props devem:

- possuir nomes relacionados à intenção;
- formar um contrato pequeno;
- evitar objetos amplos quando poucos valores forem necessários;
- evitar flags que produzam combinações contraditórias;
- favorecer composição quando existirem regiões independentes;
- permanecer imutáveis dentro do componente;
- possuir valores padrão apenas quando forem inequívocos.

Quando props não forem aplicáveis, registre **não aplicável** e explique como o componente recebe conteúdo ou contexto.

# Estados

Defina todos os estados visuais e comportamentais relevantes.

| Estado | Condição de entrada | Apresentação e comportamento | Ações disponíveis | Condição de saída |
| --- | --- | --- | --- | --- |
| `[padrão]` | `[condição inicial]` | `[como aparece e se comporta]` | `[ações possíveis]` | `[evento ou mudança]` |
| `[carregamento]` | `[operação em andamento]` | `[retorno perceptível e prevenção de duplicidade]` | `[ações preservadas ou bloqueadas]` | `[sucesso ou erro]` |
| `[vazio]` | `[ausência de conteúdo]` | `[explicação e orientação]` | `[próxima ação válida]` | `[conteúdo disponível]` |
| `[erro]` | `[falha prevista]` | `[mensagem clara e recuperação]` | `[nova tentativa ou alternativa]` | `[recuperação ou saída]` |
| `[sucesso]` | `[ação concluída]` | `[confirmação proporcional]` | `[próxima ação, quando relevante]` | `[continuidade do fluxo]` |
| `[desabilitado]` | `[ação indisponível]` | `[motivo perceptível, quando necessário]` | `[nenhuma ou orientação]` | `[condição atendida]` |

Remova estados não aplicáveis e acrescente apenas os necessários. Não dependa somente de cor para distinguir estados e não represente combinações impossíveis.

# Eventos

Documente as intenções que o componente comunica aos consumidores.

| Evento | Momento | Dados comunicados | Resultado esperado do consumidor |
| --- | --- | --- | --- |
| `[nome orientado à intenção]` | `[interação ou mudança que o origina]` | `[dados mínimos necessários]` | `[responsabilidade externa]` |

Os eventos devem:

- representar uma intenção ou um resultado observável;
- possuir nomes claros e consistentes;
- comunicar somente os dados necessários;
- evitar detalhes de eventos internos da plataforma;
- definir comportamento diante de repetição, cancelamento ou concorrência;
- não executar silenciosamente responsabilidades do consumidor.

Quando não houver eventos públicos, registre **não aplicável**.

# Fluxo de Funcionamento

Descreva a sequência principal do componente do ponto de vista de seu consumidor e da pessoa usuária.

1. `[O consumidor fornece conteúdo, valores ou contexto válidos.]`
2. `[O componente apresenta seu estado inicial.]`
3. `[A pessoa realiza uma interação, quando aplicável.]`
4. `[O componente atualiza seu estado interno ou comunica uma intenção.]`
5. `[O consumidor responde ao evento, quando necessário.]`
6. `[O componente apresenta sucesso, erro ou continuidade.]`

## Fluxos alternativos

- **Dados ausentes ou inválidos:** `[comportamento esperado]`
- **Operação interrompida:** `[preservação e recuperação]`
- **Interação repetida:** `[prevenção ou tratamento]`
- **Mudança externa:** `[como o componente se mantém sincronizado]`

O fluxo deve deixar clara a fronteira entre responsabilidades internas e externas.

# Dependências

Liste somente dependências existentes e necessárias.

| Dependência | Finalidade | Origem | Obrigatória | Impacto |
| --- | --- | --- | --- | --- |
| `[componente, utilitário, recurso ou capacidade]` | `[por que é necessária]` | `[interna | stack existente | externa aprovada]` | `[sim | não]` | `[tamanho, acoplamento, execução ou outro]` |

Considere:

- componentes compartilhados já disponíveis;
- estilos, tokens e recursos visuais existentes;
- contexto ou capacidade fornecida pelo consumidor;
- execução no servidor ou no cliente;
- APIs da plataforma;
- dependências externas previamente aprovadas.

O componente não deve instalar bibliotecas, criar configurações ou acessar serviços externos por conveniência. Uma nova dependência exige justificativa, avaliação de impacto e autorização explícita.

# Acessibilidade

A acessibilidade faz parte do contrato do componente. Documente e valide:

- elemento ou papel semântico adequado;
- nome e descrição acessíveis;
- hierarquia e relações entre conteúdo;
- ordem de leitura;
- operação completa por teclado;
- ordem, visibilidade e restauração do foco;
- atalhos e teclas esperadas, quando aplicáveis;
- anúncio de mudanças dinâmicas na urgência correta;
- rótulos, instruções e mensagens associados;
- contraste suficiente;
- significado independente de cor, posição ou ícone;
- textos alternativos para conteúdo visual relevante;
- área de interação adequada;
- comportamento com ampliação e tecnologias assistivas.

**Decisões específicas:** `[registrar semântica, foco e interação próprios do componente]`

Exceções devem ser justificadas e aprovadas; não devem ser tratadas como limitações inevitáveis.

# Responsividade

Descreva como o componente preserva conteúdo, hierarquia e operação conforme o espaço disponível.

| Condição de espaço | Adaptação | Conteúdo preservado | Limites |
| --- | --- | --- | --- |
| `[restrita]` | `[reorganização, quebra ou rolagem controlada]` | `[informações e ações essenciais]` | `[largura mínima ou restrição]` |
| `[intermediária]` | `[comportamento esperado]` | `[conteúdo mantido]` | `[restrição, se houver]` |
| `[ampla]` | `[uso responsável do espaço]` | `[hierarquia preservada]` | `[largura máxima, se houver]` |

As adaptações devem responder ao comportamento do conteúdo, não a modelos rígidos de dispositivos. O componente não deve ocultar ações essenciais, criar rolagem desnecessária nem depender de interação exclusiva por ponteiro.

# Performance

Defina expectativas proporcionais ao uso do componente.

- **Frequência e quantidade esperadas:** `[quantas instâncias ou itens podem existir]`
- **Custo de renderização relevante:** `[limite ou hipótese a verificar]`
- **Recursos carregados:** `[imagens, ícones ou outros recursos necessários]`
- **Interações sensíveis à latência:** `[resposta esperada]`
- **Limite entre servidor e cliente:** `[necessidade de interatividade, quando aplicável]`
- **Medição:** `[como identificar regressões]`

Priorize estrutura simples, carregamento mínimo e estabilidade visual. Otimizações devem responder a evidência mensurável; não devem aumentar complexidade com base em cenários hipotéticos.

# Tratamento de Erros

Documente falhas previsíveis e a resposta apropriada.

| Falha | Origem | Comportamento do componente | Mensagem apresentada | Recuperação |
| --- | --- | --- | --- | --- |
| `[situação de erro]` | `[entrada, estado ou dependência]` | `[como falha de forma segura]` | `[mensagem clara e acionável]` | `[nova tentativa, correção ou alternativa]` |

O componente deve:

- tratar erros na fronteira apropriada;
- preservar dados válidos quando for seguro;
- oferecer recuperação quando a ação puder ser repetida;
- evitar falhas silenciosas;
- não expor detalhes técnicos, dados sensíveis ou mensagens internas;
- delegar ao consumidor erros que não pertencem à sua responsabilidade;
- manter semântica e foco coerentes ao comunicar a falha.

# Casos de Uso

Registre os contextos reais que justificam o componente e comprovam sua reutilização.

| Caso | Consumidor | Necessidade | Configuração utilizada | Resultado esperado |
| --- | --- | --- | --- | --- |
| `CU-01` | `[página, fluxo ou componente consumidor]` | `[problema atendido]` | `[props, conteúdo, estado ou composição relevante]` | `[resultado observável]` |

Cada caso de uso deve:

- corresponder a uma necessidade atual e aprovada;
- demonstrar como o contrato público atende ao consumidor;
- identificar diferenças relevantes sem criar variações desnecessárias;
- permanecer independente de regras específicas de um único produto;
- informar quando outro componente for mais adequado.

Um cenário hipotético não comprova reutilização e não deve ampliar o contrato.

# Critérios de Aceitação

Liste condições objetivas para considerar a documentação e a futura implementação do componente tecnicamente adequadas.

- **CA-01 — Responsabilidade:** `[o componente atende ao objetivo sem assumir regras externas]`
- **CA-02 — Contrato:** `[a interface pública é pequena, clara e cobre os usos aprovados]`
- **CA-03 — Estados:** `[todos os estados aplicáveis possuem comportamento definido]`
- **CA-04 — Acessibilidade:** `[os requisitos aplicáveis foram verificados]`
- **CA-05 — Responsividade:** `[conteúdo e ações permanecem utilizáveis nos espaços previstos]`
- **CA-06 — Qualidade:** `[testes e validações aplicáveis foram concluídos]`
- **CA-07 — Escopo:** `[não foram introduzidas variações, dependências ou responsabilidades não autorizadas]`

Cada critério deve ser adaptado ao componente e relacionado a uma evidência. Na entrega, informe seu estado como **atendido**, **não atendido**, **pendente** ou **não verificável**.

# Checklist Técnico

Preencha o checklist com evidências proporcionais ao risco e ao contrato público.

- [ ] **Responsabilidade:** o componente mantém uma responsabilidade coesa e não contém regra de negócio.
- [ ] **Server ou Client Component:** a escolha está justificada pelo comportamento necessário, e o limite de cliente é o menor possível.
- [ ] **Props:** o contrato é tipado, pequeno, imutável e não permite combinações inválidas conhecidas.
- [ ] **Estados e eventos:** transições, repetição, concorrência e responsabilidades do consumidor estão definidas.
- [ ] **Semântica:** elemento, nome, descrição e relações acessíveis estão corretos.
- [ ] **Teclado e foco:** todas as interações podem ser concluídas e o foco permanece previsível.
- [ ] **Responsividade:** conteúdo, hierarquia e ações foram verificados nos espaços aplicáveis.
- [ ] **Erros:** falhas previsíveis são claras, seguras e recuperáveis.
- [ ] **Performance:** não há trabalho, recurso ou execução no cliente sem necessidade comprovada.
- [ ] **Lint:** executado com sucesso ou declarado não aplicável ou indisponível.
- [ ] **Typecheck:** executado com sucesso ou declarado não aplicável ou indisponível.
- [ ] **Build:** executado com sucesso ou declarado não aplicável ou indisponível.
- [ ] **Testes:** verificações aplicáveis foram executadas e seus resultados registrados.
- [ ] **Escopo:** somente arquivos, dependências e comportamentos autorizados foram afetados.

## Estratégia de testes

| Cenário | Tipo de verificação | Resultado esperado |
| --- | --- | --- |
| `[renderização principal]` | `[automatizada ou manual]` | `[conteúdo e semântica corretos]` |
| `[interação principal]` | `[automatizada ou manual]` | `[evento e estado esperados]` |
| `[erro ou limite]` | `[automatizada ou manual]` | `[falha segura e recuperável]` |
| `[teclado e foco]` | `[automatizada ou manual]` | `[operação acessível]` |
| `[adaptação de layout]` | `[inspeção visual]` | `[conteúdo e ações preservados]` |

Considere contrato das props, eventos, transições, conteúdo variável, casos-limite, integração com consumidores reais, regressão visual e impacto de performance.

Utilize somente a infraestrutura já aprovada. A ausência de ferramenta ou cobertura deve ser relatada, sem instalar ou configurar uma solução por iniciativa própria.

# Histórico de Revisões

Registre mudanças que afetem responsabilidade, contrato, comportamento ou orientação de uso.

| Versão ou data | Alteração | Compatibilidade | Responsável | Aprovação |
| --- | --- | --- | --- | --- |
| `[identificador]` | `[resumo e motivação]` | `[compatível | exige transição]` | `[pessoa ou papel]` | `[pendente | aprovada]` |

Mudanças incompatíveis devem explicar consumidores afetados, estratégia de transição e prazo aprovado. O histórico não substitui o processo de revisão nem autoriza implementação.

# Observações

Registre apenas informações complementares relevantes.

## Decisões aprovadas

- `[decisão, justificativa e impacto]`

## Limitações conhecidas

- `[limitação atual e orientação aos consumidores]`

## Questões em aberto

- `[decisão pendente e seu impacto]`

## Usos aprovados

- `[contexto real que comprova a reutilização]`

Observações não devem ampliar a interface pública nem substituir escopo, requisitos ou aprovação. Propostas futuras permanecem fora da implementação até serem documentadas e autorizadas.
