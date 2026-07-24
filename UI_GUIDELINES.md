# Guia Oficial de Interface

## Objetivo

Este documento define as diretrizes permanentes de interface e experiência do SaaS Starter Kit. Sua finalidade é orientar a criação de interfaces simples, claras, acessíveis, responsivas e reutilizáveis, sem impor a identidade visual ou os fluxos de um produto específico.

O guia estabelece critérios para decisões visuais, organização de layout, comportamento de componentes e tratamento dos estados da interface. Ele deve ser utilizado durante a especificação, implementação e revisão de toda mudança que afete a experiência do usuário.

Estas diretrizes não autorizam a criação antecipada de componentes, páginas ou sistemas visuais. Cada elemento somente deve ser implementado quando existir uma necessidade concreta, documentada em uma Sprint e explicitamente aprovada.

## Filosofia de Design

### Simplicidade

Cada tela deve apresentar apenas as informações e ações necessárias para o objetivo atual. Elementos decorativos, variações e controles sem função clara devem ser evitados.

Uma interface simples:

- possui hierarquia visual evidente;
- reduz decisões desnecessárias;
- utiliza linguagem direta;
- apresenta uma ação principal clara quando ela existir;
- evita etapas, campos e mensagens redundantes;
- revela complexidade progressivamente.

Simplicidade não significa ausência de orientação. A interface deve fornecer contexto suficiente para que uma pessoa compreenda onde está, o que pode fazer e qual será o resultado de sua ação.

### Consistência

Padrões equivalentes devem manter a mesma aparência, terminologia e interação. O mesmo componente não deve mudar de significado entre telas, e ações semelhantes devem produzir respostas previsíveis.

Antes de criar um novo padrão, deve-se verificar se uma solução existente atende à necessidade. Quando um padrão precisar evoluir, a alteração deve considerar todos os seus usos aprovados e possuir estratégia de transição.

### Clareza

Conteúdo, estrutura e ações devem ser compreendidos sem depender de conhecimento oculto. Rótulos devem descrever o resultado esperado, mensagens devem explicar o que aconteceu e estados devem ser visualmente distinguíveis.

A clareza deve prevalecer sobre textos vagos, ícones sem significado evidente e layouts visualmente densos. Informações importantes não devem depender apenas de posição, cor ou memória do usuário.

### Acessibilidade

Acessibilidade faz parte da qualidade da interface e deve ser considerada desde a especificação. Semântica, contraste, foco, teclado, textos alternativos, mensagens e ordem de leitura devem integrar o comportamento esperado de cada elemento.

Uma entrega não deve ser considerada concluída apenas por funcionar com mouse e em uma condição visual ideal.

### Responsividade

A interface deve se adaptar ao espaço disponível, preservando conteúdo, hierarquia e funcionalidade. O desenho deve começar pelas restrições de telas menores e evoluir progressivamente para áreas maiores.

Responsividade não significa apenas reduzir tamanhos. Navegação, densidade, ordem do conteúdo e modo de interação devem ser reavaliados em cada contexto.

### Reutilização

Elementos compartilhados devem reduzir repetição real e manter comportamento consistente. Um componente deve ser extraído somente quando houver uso comprovado em contextos diferentes com a mesma responsabilidade.

Componentes reutilizáveis devem permanecer neutros em relação a conteúdo, domínio e marca. Variações destinadas a necessidades hipotéticas não devem ser adicionadas.

## Identidade Visual

A identidade visual do Starter Kit deve ser discreta e neutra. Produtos derivados podem adaptar marca, cores e expressão visual, desde que preservem clareza, acessibilidade e consistência de interação.

### Tipografia

- Utilizar uma família tipográfica legível e adequada a interfaces digitais.
- Manter um conjunto pequeno de tamanhos, pesos e alturas de linha.
- Estabelecer hierarquia clara entre título de página, títulos de seção, corpo, rótulos e conteúdo auxiliar.
- Usar peso e tamanho para hierarquia, evitando depender apenas de cor.
- Preservar comprimento de linha confortável em textos extensos.
- Evitar texto excessivamente pequeno, fino ou condensado.
- Reservar letras maiúsculas e espaçamento ampliado para rótulos curtos.
- Não utilizar mais famílias tipográficas do que o necessário.

Textos devem permanecer legíveis com ampliação e configurações de fonte do usuário. A tipografia de marca nunca deve comprometer leitura ou desempenho.

### Cores

- Definir cores por função, como fundo, superfície, texto, borda, ação e estados semânticos.
- Manter contraste suficiente entre conteúdo e fundo.
- Usar uma cor de ação principal de forma restrita e consistente.
- Diferenciar sucesso, atenção, erro e informação sem depender somente de cor.
- Evitar grandes áreas saturadas que reduzam legibilidade ou aumentem fadiga.
- Verificar estados padrão, interação, foco, seleção e desabilitado.
- Preservar significado semântico quando a identidade visual for adaptada.

Produtos derivados podem alterar a paleta, mas devem manter as mesmas funções e relações de contraste. Novas cores não devem ser introduzidas sem uma finalidade definida.

### Espaçamentos

- Adotar uma escala pequena e previsível baseada em múltiplos de uma unidade comum.
- Utilizar espaçamento para indicar relação e separação entre elementos.
- Manter distâncias menores dentro de um grupo e maiores entre grupos diferentes.
- Preservar margens laterais adequadas em telas pequenas.
- Evitar valores isolados sem correspondência com a escala existente.
- Priorizar espaço em branco antes de adicionar divisores visuais.

Uma escala baseada em incrementos de quatro unidades pode orientar decisões, com intervalos maiores formados por combinações consistentes. Exceções devem responder a uma necessidade visual real.

### Bordas

- Utilizar bordas apenas para delimitar superfícies, controles ou estados que precisem de separação.
- Manter espessura, cor e raio consistentes entre elementos equivalentes.
- Preferir bordas sutis para agrupamento e maior contraste para foco ou erro.
- Limitar a quantidade de raios de borda utilizados.
- Evitar combinar borda, sombra e mudança de fundo quando um único recurso for suficiente.

### Sombras

- Utilizar sombras com moderação para comunicar elevação ou sobreposição.
- Manter poucos níveis de elevação, cada um com finalidade conhecida.
- Evitar sombras intensas como decoração.
- Não usar sombra como único indicador de foco ou limite.
- Garantir que superfícies continuem compreensíveis quando sombras não forem percebidas.

### Ícones

- Utilizar ícones de uma mesma linguagem visual, com proporções e espessuras consistentes.
- Escolher símbolos reconhecíveis e adequados ao contexto.
- Acompanhar ícones ambíguos com rótulo textual.
- Não usar ícones como substitutos automáticos de texto em ações importantes.
- Fornecer nome acessível para ícones interativos.
- Ocultar de tecnologias assistivas ícones puramente decorativos.
- Manter tamanho e área de interação adequados.

Uma nova biblioteca de ícones exige necessidade demonstrada e aprovação explícita.

## Layout

O layout deve priorizar conteúdo e tarefas. As regiões abaixo são padrões possíveis, não elementos obrigatórios em todas as telas.

### Header

O header deve oferecer orientação global e acesso às ações de maior alcance. Pode conter identidade, navegação principal, contexto atual e controles globais.

- Manter altura e organização consistentes.
- Evitar excesso de ações concorrentes.
- Identificar claramente a página ou área atual.
- Preservar acesso por teclado e ordem de foco lógica.
- Tornar o header fixo somente quando isso melhorar uma tarefa recorrente.
- Adaptar navegação e ações sem ocultar funções essenciais em telas menores.

### Sidebar

A sidebar deve ser utilizada quando existir navegação recorrente entre áreas relacionadas.

- Agrupar itens por afinidade e utilizar rótulos claros.
- Indicar o item atual por mais de um recurso visual quando necessário.
- Manter ordem estável entre sessões e telas.
- Evitar níveis profundos de navegação.
- Permitir recolhimento somente se houver benefício e estado compreensível.
- Em telas menores, transformar a navegação em uma alternativa adequada sem bloquear o conteúdo.

Uma interface pequena não deve receber sidebar apenas para preencher espaço ou antecipar crescimento.

### Conteúdo principal

O conteúdo principal deve concentrar o objetivo da página.

- Utilizar uma única região principal semântica.
- Apresentar título e contexto antes das ações específicas.
- Posicionar a ação principal próxima ao conteúdo que ela afeta.
- Organizar informações em seções com hierarquia clara.
- Limitar largura de leitura quando o conteúdo for textual.
- Permitir largura maior somente para dados ou tarefas que realmente precisem dela.
- Preservar estados de carregamento, ausência, erro e sucesso no mesmo contexto estrutural.

### Rodapé

O rodapé deve conter apenas informações secundárias e persistentes, como referências institucionais ou links de apoio aprovados.

- Não repetir a navegação principal sem necessidade.
- Não deslocar ações essenciais para o final da página.
- Manter contraste e legibilidade adequados.
- Evitar rodapé em fluxos internos quando ele não acrescentar valor.

## Componentes

Os padrões desta seção definem comportamento esperado quando um componente for necessário. Eles não autorizam a criação de uma biblioteca completa.

### Botões

- Usar botões para ações e links para navegação.
- Definir hierarquia entre ação principal, secundária, discreta e destrutiva.
- Limitar ações principais concorrentes no mesmo contexto.
- Utilizar rótulos que descrevam o resultado da ação.
- Oferecer estados padrão, interação, foco, carregamento e desabilitado.
- Manter dimensões e área de interação confortáveis.
- Não usar apenas cor para distinguir uma ação destrutiva.
- Evitar desabilitar uma ação sem explicar como torná-la disponível.

Durante uma ação em andamento, deve-se impedir submissões duplicadas quando houver risco e preservar um retorno visual compreensível.

### Inputs

- Associar cada input a um rótulo visível.
- Usar placeholder apenas como exemplo ou orientação complementar.
- Exibir formato, restrições e unidade antes da entrada quando forem relevantes.
- Manter estados de foco, preenchido, desabilitado e erro distinguíveis.
- Posicionar ajuda e erro próximos ao campo correspondente.
- Escolher o tipo de controle adequado à informação solicitada.
- Preservar dados válidos quando outro campo apresentar erro.

### Formulários

- Solicitar somente informações necessárias para a tarefa atual.
- Agrupar campos relacionados com título ou contexto.
- Organizar a ordem de preenchimento de forma lógica.
- Identificar campos obrigatórios de modo consistente.
- Validar no momento apropriado, sem interromper a digitação desnecessariamente.
- Apresentar erros específicos, acionáveis e associados aos respectivos campos.
- Oferecer um resumo quando múltiplos erros dificultarem a localização.
- Manter ações de envio e cancelamento previsíveis.
- Avisar antes de descartar alterações não salvas quando houver risco real.

### Cards

- Utilizar cards para agrupar conteúdo que forme uma unidade independente.
- Manter estrutura interna consistente entre cards equivalentes.
- Evitar cards aninhados ou usados apenas como decoração.
- Não tornar toda a superfície clicável quando existirem várias ações internas.
- Diferenciar claramente conteúdo, metadados e ações.
- Preservar altura variável quando uniformidade artificial prejudicar o conteúdo.

### Tabelas

- Utilizar tabelas para comparar dados estruturados em linhas e colunas.
- Fornecer cabeçalhos claros e associados às células.
- Alinhar conteúdo conforme seu tipo e facilitar leitura entre linhas.
- Mostrar ordenação, seleção e ações de forma explícita.
- Manter ações recorrentes em posições consistentes.
- Evitar colunas que não apoiem uma decisão ou tarefa.
- Em telas estreitas, preservar as relações dos dados por rolagem controlada ou apresentação alternativa.
- Não substituir uma tabela por cards se isso prejudicar comparação.

### Modais

- Reservar modais para tarefas breves que exijam atenção sem abandonar o contexto.
- Evitar modais para conteúdo extenso, navegação principal ou fluxos complexos.
- Apresentar título, finalidade e ações claras.
- Mover o foco para o modal ao abrir e restaurá-lo ao fechar.
- Conter a navegação por teclado enquanto o modal estiver ativo.
- Permitir fechamento previsível, exceto quando isso causar perda inevitável de uma operação crítica.
- Solicitar confirmação adicional apenas para ações com impacto relevante.

### Alertas

- Utilizar alertas para informações que exigem atenção no contexto atual.
- Distinguir informação, sucesso, atenção e erro por texto, ícone e estilo.
- Explicar impacto e próxima ação quando aplicável.
- Posicionar o alerta próximo ao conteúdo afetado.
- Evitar alertas persistentes para mensagens triviais.
- Utilizar anúncios para tecnologias assistivas de acordo com urgência e mudança de contexto.

### Badges

- Utilizar badges para estados ou categorias curtas.
- Manter textos breves e inequívocos.
- Não depender somente da cor para transmitir significado.
- Evitar badges como controles quando a aparência sugerir apenas informação.
- Limitar variações e preservar o mesmo significado semântico entre telas.

### Dropdowns

- Utilizar dropdowns para conjuntos de opções relacionadas quando a apresentação direta não for adequada.
- Manter a ação que abre o menu claramente identificada.
- Organizar opções em ordem previsível.
- Separar ações destrutivas das demais.
- Suportar teclado, foco e fechamento consistente.
- Não ocultar a única ação principal dentro de um menu.
- Evitar menus longos quando busca, agrupamento ou outra estrutura for mais clara.

### Paginação

- Utilizar paginação quando a quantidade de itens prejudicar desempenho ou compreensão.
- Informar página ou intervalo atual e contexto do total quando disponível.
- Manter controles anterior e próximo fáceis de identificar.
- Preservar filtros, ordenação e posição relevante durante a navegação.
- Evitar controles para páginas inexistentes.
- Considerar alternativas apenas quando elas melhorarem a tarefa e tiverem comportamento acessível.

## Estados da Interface

Toda experiência baseada em dados ou ações assíncronas deve definir seus estados antes da implementação. Uma interface não está completa se apenas o caminho ideal foi especificado.

### Loading

- Indicar atividade somente quando existir espera perceptível.
- Preservar estrutura para reduzir mudanças bruscas de layout.
- Utilizar indicador compatível com a duração e o contexto.
- Informar progresso real quando ele puder ser determinado.
- Evitar múltiplos indicadores concorrentes na mesma região.
- Manter conteúdo anterior quando isso ajudar orientação e não apresentar informação incorreta.
- Impedir ações duplicadas sem bloquear partes não relacionadas.

### Empty State

- Explicar de forma direta por que não há conteúdo.
- Diferenciar ausência inicial, resultado de filtros e falta de permissão quando aplicável.
- Oferecer uma próxima ação somente quando ela existir.
- Evitar ilustrações ou textos longos que escondam a informação principal.
- Manter filtros acessíveis quando sua alteração puder produzir resultados.

### Error State

- Informar o que não pôde ser concluído em linguagem compreensível.
- Explicar o que a pessoa pode fazer em seguida.
- Preservar dados inseridos sempre que for seguro.
- Oferecer nova tentativa quando a operação puder ser repetida.
- Diferenciar erro de campo, seção, página e indisponibilidade geral.
- Não expor detalhes técnicos, dados sensíveis ou mensagens internas.
- Manter um caminho de recuperação ou suporte quando necessário.

### Success State

- Confirmar claramente a conclusão da ação.
- Relacionar a mensagem ao resultado alcançado.
- Manter a confirmação próxima ao contexto afetado.
- Evitar interromper o fluxo com confirmação excessiva.
- Não utilizar mensagens temporárias como único registro de uma mudança importante.
- Indicar a próxima ação apenas quando ela for relevante.

## Responsividade

A responsividade deve ser definida pelo comportamento do conteúdo, não por modelos rígidos de dispositivos. Pontos de adaptação devem ocorrer quando a interface deixar de preservar legibilidade, hierarquia ou interação.

### Mobile

- Priorizar uma única coluna e o conteúdo essencial.
- Manter a ação principal visível sem competir com ações secundárias.
- Adaptar navegação ampla para um padrão compacto e acessível.
- Evitar rolagem horizontal da página.
- Permitir rolagem localizada apenas quando a natureza do conteúdo exigir.
- Utilizar áreas de interação confortáveis e separação suficiente entre controles.
- Não esconder informação necessária apenas para reduzir a tela.
- Considerar teclado virtual, orientação e ampliação de texto.

### Tablet

- Utilizar o espaço adicional para melhorar leitura e agrupamento.
- Introduzir colunas somente quando o conteúdo mantiver largura adequada.
- Avaliar navegação lateral conforme frequência de uso e espaço real.
- Preservar interação por toque mesmo em layouts mais amplos.
- Evitar tratar tablet automaticamente como uma versão reduzida do desktop.

### Desktop

- Utilizar largura adicional para contexto, comparação e tarefas paralelas quando houver benefício.
- Limitar linhas de texto para preservar leitura.
- Evitar esticar formulários e conteúdo simples por toda a tela.
- Manter hierarquia clara em layouts com múltiplas regiões.
- Oferecer navegação por teclado eficiente.
- Não introduzir painéis ou colunas apenas para preencher espaço disponível.

Toda interface deve ser revisada em larguras reduzidas, intermediárias e amplas, incluindo conteúdo curto, longo e traduzido quando isso fizer parte do escopo.

## Acessibilidade

Acessibilidade deve ser verificada no desenho, na implementação e na revisão.

### Contraste

- Manter contraste mínimo adequado entre texto, ícones essenciais, controles e seus fundos.
- Buscar pelo menos 4,5:1 para texto comum e 3:1 para texto grande e elementos gráficos essenciais.
- Verificar estados de foco, erro, desabilitado e interação.
- Não utilizar cor como único meio de comunicar estado ou ação.

### Navegação por teclado

- Garantir acesso a todas as ações interativas sem mouse.
- Manter ordem de tabulação lógica e compatível com a ordem visual.
- Evitar atalhos que entrem em conflito com tecnologias assistivas.
- Permitir saída previsível de menus, modais e outros contextos temporários.
- Não criar armadilhas de teclado.

### Foco

- Exibir indicador de foco visível e com contraste suficiente.
- Não remover o foco sem oferecer alternativa equivalente.
- Mover foco somente quando houver mudança de contexto que o exija.
- Restaurar foco ao elemento de origem após fechar uma sobreposição.
- Levar o foco ao erro ou ao resumo apropriado quando isso ajudar a recuperação.

### Semântica

- Utilizar elementos de acordo com seu significado e comportamento.
- Preservar hierarquia lógica de títulos.
- Identificar regiões principais da página.
- Associar rótulos, descrições e erros aos respectivos controles.
- Usar atributos adicionais somente quando a semântica nativa não for suficiente.
- Manter ordem de leitura coerente sem depender apenas da posição visual.

### Textos alternativos

- Descrever imagens que transmitam conteúdo ou função.
- Utilizar texto alternativo conforme a finalidade da imagem no contexto.
- Ocultar imagens decorativas de tecnologias assistivas.
- Fornecer nome acessível para controles representados por ícones.
- Não repetir no texto alternativo informação já anunciada ao lado.

Também devem ser considerados ampliação, refluxo de conteúdo, redução de movimento, mensagens dinâmicas e uso com leitores de tela conforme o risco e o escopo da entrega.

## Consistência

A consistência entre SaaS derivados deve existir nos fundamentos de interação, não necessariamente na aparência da marca.

Devem permanecer uniformes:

- hierarquia e responsabilidades dos componentes;
- significado dos estados semânticos;
- comportamento de foco e teclado;
- tratamento de carregamento, ausência, erro e sucesso;
- posicionamento relativo de rótulos, ajuda e validação;
- linguagem de ações equivalentes;
- critérios de responsividade e acessibilidade;
- processo de documentação e revisão.

Cada produto derivado pode adaptar tipografia, paleta, densidade e expressão visual por meio de decisões documentadas. Essas adaptações devem ser aplicadas sistematicamente e não alterar silenciosamente o significado ou o comportamento dos padrões compartilhados.

Para preservar consistência:

1. consultar este guia antes de criar um novo padrão;
2. reutilizar uma solução existente quando ela atender à mesma responsabilidade;
3. documentar estados e variações aprovados;
4. revisar usos em telas pequenas e grandes;
5. verificar teclado, foco, semântica e contraste;
6. registrar exceções e evitar que se tornem padrões acidentais.

Uma coleção extensa de componentes não deve ser criada apenas para buscar uniformidade. A consistência deve crescer a partir de necessidades reais e soluções validadas.

## Evolução

Este guia pode receber novas diretrizes quando a experiência de uso demonstrar uma necessidade recorrente. A evolução deve ampliar clareza e consistência sem quebrar os princípios existentes.

Uma nova diretriz deve:

- resolver um problema atual e documentado;
- permanecer genérica para diferentes produtos derivados;
- ser compatível com a arquitetura e os princípios do projeto;
- definir comportamento, estados, acessibilidade e limites;
- considerar impacto sobre padrões já utilizados;
- possuir validação e aprovação explícitas;
- evitar dependências, variações ou componentes sem uso comprovado.

Mudanças incompatíveis devem incluir uma estratégia de transição. Padrões obsoletos devem ser identificados e removidos apenas dentro de uma Sprint autorizada.

A presença de uma diretriz neste documento não autoriza sua implementação. O roadmap indica direção, e somente a Sprint atual define o trabalho permitido.
