# Arquitetura Oficial do SaaS Starter Kit

## Objetivo

Este documento define a arquitetura oficial do SaaS Starter Kit e os limites que devem orientar sua evolução. Seu objetivo é manter a fundação simples, compreensível, modular e reutilizável, sem antecipar funcionalidades ou decisões pertencentes aos produtos criados a partir dela.

A arquitetura descreve:

- a organização técnica atual;
- as responsabilidades de cada camada;
- a direção permitida das dependências;
- os critérios para introduzir serviços, componentes e configurações;
- as regras para evolução e escala.

Este documento não autoriza implementação. Qualquer mudança arquitetural deve estar vinculada a uma necessidade concreta, documentada em uma Sprint e explicitamente aprovada.

## Visão Geral da Arquitetura

O Starter Kit utiliza uma aplicação web baseada em Next.js com App Router, React, TypeScript e Tailwind CSS. A fundação atual contém somente a estrutura necessária para renderizar uma interface inicial neutra e executável.

No estágio atual, a arquitetura é deliberadamente pequena:

- o App Router organiza o ponto de entrada da aplicação;
- o layout raiz define a estrutura comum do documento;
- a página inicial representa a camada de apresentação;
- os estilos globais estabelecem apenas os fundamentos visuais;
- os arquivos de configuração sustentam a stack aprovada;
- a documentação orienta decisões, escopo e evolução.

Não existem, na fundação atual, camadas de domínio, serviços de aplicação, persistência ou integrações. Essas responsabilidades somente devem ser introduzidas quando uma Sprint aprovada demonstrar sua necessidade.

A arquitetura evolutiva adota separação por responsabilidades. Interface, aplicação, domínio e infraestrutura devem permanecer desacoplados sempre que essas camadas passarem a existir. Dependências devem apontar para conceitos mais estáveis, evitando que regras centrais dependam de detalhes externos.

## Princípios Arquiteturais

### Arquitetura mínima

A estrutura deve conter somente o necessário para os requisitos atuais. Pastas, camadas, contratos e abstrações não devem ser criados para cenários hipotéticos.

### Separação de responsabilidades

Cada módulo deve possuir uma responsabilidade clara. Apresentação, regras de aplicação, regras de domínio e detalhes de infraestrutura não devem ser misturados sem necessidade explícita.

### Dependências direcionadas

Camadas externas podem depender de conceitos internos, mas regras centrais não devem depender diretamente de interface, bibliotecas de apresentação ou fornecedores externos.

### Neutralidade de domínio

Tudo que pertencer ao Starter Kit deve permanecer independente de setor, marca, público ou modelo de negócio. Regras específicas devem existir apenas no produto derivado.

### Modularidade proporcional

Uma responsabilidade deve ser isolada quando essa separação melhorar entendimento, teste, substituição ou manutenção. Modularidade não significa multiplicar arquivos ou camadas sem benefício atual.

### Reutilização validada

Serviços e componentes compartilhados devem surgir de padrões reais e repetidos. Uma abstração só é válida quando reduz complexidade total e possui contrato estável.

### Fronteiras explícitas

Entradas, saídas, erros e dependências de cada módulo devem ser compreensíveis. Estado implícito, efeitos colaterais ocultos e acoplamento por convenção devem ser evitados.

### Segurança por limite

Segredos, credenciais e operações sensíveis devem permanecer no ambiente apropriado. Dados internos não devem atravessar fronteiras de cliente, servidor ou serviço sem necessidade e proteção definidas.

### Validação proporcional ao risco

Cada decisão arquitetural deve indicar como será verificada. Quanto maior o impacto, o acoplamento ou a dificuldade de reversão, maior deve ser o nível de revisão e validação.

## Estrutura de Pastas

A estrutura atual é intencionalmente enxuta:

### `app/`

Contém as rotas, os layouts, as páginas e os estilos globais organizados pelo App Router. Deve concentrar composição de interface e integração com o ciclo de renderização da aplicação, sem acumular regras de domínio.

### `public/`

É reservada para arquivos estáticos públicos realmente utilizados. Recursos demonstrativos, duplicados ou sem referência não devem permanecer no projeto.

### Raiz do projeto

Contém os manifestos, arquivos de configuração e documentos que orientam o desenvolvimento. Configurações devem permanecer pequenas e diretamente relacionadas à stack ou ao comportamento aprovado.

### Documentação

Os documentos Markdown na raiz formam a hierarquia de decisão do projeto. Eles definem visão, princípios, especificação, arquitetura, roadmap, Sprints e convenções complementares.

Novas pastas devem ser criadas por responsabilidade, não por antecipação. Quando necessárias, podem representar conceitos como componentes compartilhados, serviços, regras de domínio ou adaptadores de infraestrutura, desde que:

- a Sprint autorize sua criação;
- a responsabilidade não pertença com clareza a uma estrutura existente;
- o nome descreva o papel do conteúdo;
- a direção das dependências permaneça explícita;
- a pasta não seja criada vazia ou apenas para sugerir expansão futura.

Esta descrição de responsabilidades futuras não obriga nem autoriza a criação dessas pastas.

## Camadas da Aplicação

As camadas representam responsabilidades conceituais. Elas não precisam corresponder a uma pasta enquanto não houver conteúdo suficiente para justificar essa separação.

| Camada | Responsabilidade | Pode depender de |
| --- | --- | --- |
| Apresentação | Rotas, layouts, páginas, interação e composição visual | Aplicação e elementos compartilhados de interface |
| Aplicação | Coordenação de casos de uso, validação de entrada e fluxo de operações | Domínio e contratos necessários |
| Domínio | Regras, entidades e conceitos específicos do produto derivado | Conceitos internos estáveis |
| Infraestrutura | Persistência, comunicação externa e detalhes de fornecedores | Contratos definidos pelas camadas internas |
| Compartilhada | Utilidades ou contratos neutros com uso comprovado em mais de uma responsabilidade | Somente dependências essenciais e estáveis |

### Camada de apresentação

Deve transformar dados em interface e eventos em intenções. Não deve concentrar regras de negócio, acesso direto a persistência ou detalhes de fornecedores externos.

Componentes executados no cliente devem existir apenas quando interação, estado do navegador ou APIs do dispositivo forem necessários. Processamento que envolva segredos ou dados protegidos deve permanecer no servidor.

### Camada de aplicação

Quando necessária, deve coordenar operações e aplicar regras de fluxo sem conhecer detalhes de interface ou fornecedores. Ela recebe entradas validadas, aciona responsabilidades de domínio e utiliza contratos para acessar capacidades externas.

### Camada de domínio

Pertence principalmente aos produtos derivados. Deve representar regras de negócio sem depender de framework web, interface, persistência ou integrações. O Starter Kit não deve inventar um domínio genérico.

### Camada de infraestrutura

Deve conter detalhes substituíveis, como mecanismos de persistência ou comunicação com serviços externos. Esses detalhes devem implementar contratos internos e não determinar a forma das regras centrais.

### Camada compartilhada

Deve permanecer pequena. Um elemento só deve ser compartilhado quando possuir uso real em mais de um contexto, sem carregar regras específicas ou criar dependências circulares.

## Fluxo de Dados

O fluxo de dados deve ser explícito, unidirecional sempre que possível e limitado ao menor conjunto necessário.

Em uma operação completa, o fluxo esperado é:

1. uma rota ou interface recebe uma entrada;
2. a entrada é validada na fronteira apropriada;
3. a camada de aplicação coordena o caso de uso;
4. o domínio aplica regras específicas, quando existir;
5. contratos internos solicitam capacidades de infraestrutura, quando necessário;
6. a infraestrutura transforma respostas externas em estruturas internas;
7. o resultado retorna à camada de apresentação;
8. a interface exibe estados de sucesso, ausência, carregamento ou erro conforme o requisito aprovado.

Na fundação atual, o fluxo termina na renderização da página inicial, pois não existem entrada de usuário, estado de negócio, persistência ou serviços externos.

Regras permanentes para dados:

- validar dados ao cruzar uma fronteira de confiança;
- não confiar em dados recebidos do cliente ou de serviços externos;
- enviar ao cliente somente os dados necessários para a interface;
- evitar duplicar a mesma fonte de verdade em camadas diferentes;
- tornar transformações relevantes explícitas;
- representar erros de forma previsível, sem expor informações sensíveis;
- não introduzir estado global sem necessidade concreta;
- documentar origem, propriedade e ciclo de vida de dados sensíveis.

## Serviços Reutilizáveis

Serviços reutilizáveis representam capacidades transversais que podem atender diferentes fluxos sem depender de um domínio específico. Eles não fazem parte automaticamente da fundação.

Um serviço somente deve ser criado quando:

- existir um caso de uso atual e aprovado;
- sua responsabilidade estiver claramente delimitada;
- houver benefício concreto em separá-lo da camada que o utiliza;
- suas entradas, saídas e falhas puderem ser descritas;
- segurança, privacidade e operação tiverem sido consideradas;
- sua reutilização for real ou sua substituição precisar de uma fronteira explícita.

Serviços devem expor contratos pequenos e não revelar detalhes desnecessários de implementação. Dependências externas devem permanecer atrás de adaptadores substituíveis. A indisponibilidade de um serviço deve produzir comportamento conhecido e validável.

Não devem ser criados serviços genéricos apenas para agrupar funções, preparar integrações futuras ou ocultar uma única operação simples.

## Componentes Compartilhados

Componentes compartilhados devem reduzir repetição real de estrutura, comportamento ou acessibilidade. Eles devem ser neutros, combináveis e independentes de conteúdo ou fluxo específico.

Um componente pode ser compartilhado quando:

- aparece em contextos distintos com a mesma responsabilidade;
- possui interface pequena e compreensível;
- mantém comportamento e semântica consistentes;
- não depende de regras de negócio;
- sua extração simplifica os consumidores;
- seus estados e limites podem ser documentados.

Componentes de uma única página devem permanecer próximos ao seu uso enquanto não existir reutilização comprovada. Variações excessivas, propriedades destinadas a cenários inexistentes e bibliotecas extensas de componentes devem ser evitadas.

Acessibilidade faz parte do contrato de um componente compartilhado. Semântica, foco, teclado, contraste, estados e mensagens devem ser tratados de acordo com o comportamento aprovado.

## Gerenciamento de Configurações

Configurações devem ser explícitas, mínimas e separadas do código de domínio. Cada configuração deve possuir finalidade atual, ambiente aplicável, valor esperado e estratégia segura de fornecimento.

Regras para configurações:

- utilizar primeiro os mecanismos já disponíveis na stack;
- não alterar arquivos de configuração sem autorização da Sprint;
- não adicionar opções preventivas ou sem consumidor atual;
- manter segredos e credenciais fora do repositório;
- limitar configurações sensíveis ao ambiente de servidor;
- validar valores obrigatórios antes de utilizá-los;
- falhar de maneira clara quando uma configuração essencial estiver ausente;
- evitar leitura dispersa da mesma configuração em várias responsabilidades;
- documentar diferenças relevantes entre ambientes;
- fornecer somente exemplos sem dados sensíveis quando isso for aprovado.

Configurações específicas de fornecedor devem ficar próximas ao adaptador correspondente e não se espalhar pelas camadas internas. A existência desta seção não autoriza criar variáveis, arquivos de ambiente ou novos mecanismos de configuração.

## Escalabilidade

Escalabilidade deve responder a evidências, requisitos e medições. O Starter Kit não deve assumir antecipadamente volume de usuários, carga, disponibilidade, distribuição geográfica ou requisitos de processamento.

A ordem de decisão deve ser:

1. medir o comportamento atual;
2. identificar o limite real;
3. verificar se uma simplificação resolve o problema;
4. otimizar o ponto comprovadamente relevante;
5. adicionar infraestrutura somente quando a necessidade permanecer;
6. validar o ganho e o novo custo operacional.

Sempre que possível, módulos devem evitar estado de processo não controlado e dependências que impeçam execução independente. Estratégias como cache, processamento assíncrono, replicação ou distribuição somente devem ser adotadas quando uma Sprint definir requisitos, riscos, invalidação, falhas e critérios de verificação.

Escala técnica não deve ser confundida com crescimento de estrutura. Mais pastas, serviços ou abstrações não tornam a aplicação automaticamente mais escalável.

## Regras Arquiteturais

Todas as mudanças devem respeitar estas regras:

- Somente a Sprint atual pode autorizar alterações arquiteturais.
- Nenhuma pasta, camada, serviço ou contrato deve ser criado para uso hipotético.
- Toda funcionalidade deve se encaixar na arquitetura existente antes que uma nova estrutura seja considerada.
- Regras de negócio não devem permanecer em componentes de interface ou adaptadores de infraestrutura.
- Camadas internas não devem depender diretamente de fornecedores externos.
- Dependências entre módulos devem ser explícitas e seguir uma única direção.
- Módulos não devem acessar detalhes internos uns dos outros sem contrato definido.
- Componentes e serviços compartilhados devem possuir reutilização comprovada.
- Código executado no cliente não deve receber segredos ou dados internos desnecessários.
- Configurações, dependências e integrações exigem aprovação explícita.
- Recursos sem uso, caminhos obsoletos e código morto devem ser removidos dentro de escopo autorizado.
- Mudanças arquiteturais devem atualizar a documentação correspondente.
- Validações devem cobrir os limites alterados e ser proporcionais ao risco.
- Uma solução específica de produto não deve ser incorporada ao núcleo reutilizável.
- Exceções devem ser justificadas, documentadas, limitadas e aprovadas.

Quando uma entrega não puder respeitar uma regra, o trabalho deve ser interrompido. O conflito, as alternativas e os impactos devem ser apresentados antes de qualquer exceção ou revisão arquitetural.

## Evolução da Arquitetura

A arquitetura deve evoluir por aprendizado validado, não pela tentativa de prever todos os cenários futuros. Uma nova decisão arquitetural precisa nascer de requisito atual e ser introduzida pelo menor passo seguro.

Antes de alterar a arquitetura:

1. identificar o problema concreto;
2. confirmar que pertence ao escopo aprovado;
3. avaliar se a estrutura atual já atende à necessidade;
4. comparar alternativas e escolher a de menor complexidade suficiente;
5. delimitar responsabilidades, dependências e arquivos afetados;
6. documentar riscos, compatibilidade, reversibilidade e validação;
7. obter aprovação explícita;
8. implementar em uma Sprint pequena;
9. revisar o resultado antes de consolidar o novo padrão.

Uma decisão bem-sucedida pode ser formalizada como padrão quando demonstrar clareza, estabilidade e reutilização. Uma decisão temporária deve permanecer identificada como tal e possuir critérios para revisão ou remoção.

Mudanças incompatíveis devem incluir estratégia de transição e não podem ser introduzidas silenciosamente. A arquitetura oficial deve continuar coerente com a visão, os princípios, a especificação e o roadmap.

Nenhuma fase futura do roadmap, por si só, autoriza a criação de novas camadas ou capacidades.
