# Constituição Arquitetural do DocAI

## Objetivo

Este documento é a referência oficial de arquitetura do DocAI. Ele define os princípios constitucionais, as fronteiras protegidas e o padrão obrigatório para evolução da biblioteca de contratos sobre a fundação do SaaS Starter Kit.

A arquitetura descreve:

- a organização técnica atual;
- as responsabilidades de cada camada;
- a direção permitida das dependências;
- os critérios para introduzir serviços, componentes e configurações;
- as regras para evolução e escala.

Este documento não autoriza implementação. Qualquer mudança arquitetural deve estar vinculada a uma necessidade concreta, documentada em uma Sprint e explicitamente aprovada.

## Limite de responsabilidade

A visão, o posicionamento e a estratégia do produto pertencem exclusivamente ao `PRODUCT_SPEC.md`. A evolução e as prioridades da biblioteca pertencem exclusivamente a `docs/ROADMAP_BIBLIOTECA.md`.

Este documento trata somente das consequências arquiteturais dessas decisões e não as redefine.

## Filosofia Principal: Configuração Acima de Código

Este é o princípio mais importante do projeto. Quando for possível escolher entre adicionar lógica ao código ou enriquecer a configuração de um contrato, a escolha padrão e obrigatória é enriquecer a configuração.

A arquitetura é orientada por metadados. Regras específicas não devem ficar espalhadas em componentes, rotas, actions, serviços ou adaptadores.

## Regra de Ouro

Adicionar um novo contrato nunca deve exigir alteração na arquitetura. A inclusão deve ocorrer somente por configuração.

Se um contrato exigir mudança estrutural, o trabalho deve ser classificado como mudança arquitetural, documentado separadamente e aprovado antes da implementação. Ele não pode ser apresentado como simples evolução da biblioteca.

## Um Único Motor

Existe apenas um motor de geração. Ele deve permanecer genérico e nunca conhecer:

- categorias;
- profissões;
- modelos;
- nomes ou IDs de contratos específicos.

O motor recebe um pedido estruturado produzido pela interpretação da definição. Não escolhe regras de contrato.

## Um Único Renderer

Existe apenas um renderer de formulário. Não devem ser criados componentes ou formulários específicos por contrato.

Toda renderização deve ser baseada exclusivamente no `formSchema`. O renderer conhece apenas o vocabulário genérico de campos.

## `ContractDefinition`: Fonte Única de Verdade

Toda inteligência específica pertence à `ContractDefinition`. Cada definição deve representar:

- ID estável, usado também como slug do modelo na arquitetura atual;
- categoria por `categorySlug`;
- nome, descrição e objetivo;
- `ContractType` compatível com o motor;
- `formSchema`;
- `generationSchema`;
- validações e valores padrão incorporados aos campos;
- bindings de participantes e conteúdo;
- versão, estado de revisão e demais metadados aprovados.

Nenhuma dessas regras deve ser duplicada em outras camadas.

## `ServiceDefinition`: Catálogo de Atividades Profissionais

`ServiceDefinition` representa uma atividade que um profissional pode oferecer. Ela é independente de `ContractDefinition`: um serviço descreve o trabalho, enquanto uma definição de contrato descreve um documento jurídico e suas regras de preenchimento e geração.

A primeira camada do catálogo de serviços é somente configuração de domínio. Ela pode registrar serviços oficiais, opções de descrição livre e a estrutura de serviços personalizados, mas não altera formulários, geração, contratos, persistência ou interface.

As consultas ao catálogo dependem de fontes genéricas e assíncronas. Dados locais são uma implementação inicial, não uma premissa permanente. Futuras fontes oficiais, personalizadas ou persistidas podem implementar o mesmo contrato de consulta sem condições por profissão ou `serviceId`.

Uma `ServiceDefinition` pode declarar documentos que futuramente será capaz de alimentar. Essa declaração representa compatibilidade potencial e não cria geração automática nem dependência direta com IDs de `ContractDefinition`.

Campos associados a serviços reutilizam exclusivamente o vocabulário canônico do `formSchema`. A `ServiceDefinition` mantém apenas referências declarativas para campos registrados; não define um segundo schema de formulário. Um compositor puro pode combinar o `formSchema` original com camadas genéricas, profissionais e específicas do serviço, preservando o `formSchema` como formato final consumido pelo renderer.

O compositor não conhece IDs de serviços ou contratos. Catálogos e camadas fornecem a configuração, campos repetidos são consolidados por ID estável e conflitos com o formulário original são rejeitados. Serviços personalizados usam somente a camada genérica até possuírem configuração explicitamente aprovada.

Informações jurídicas, cláusulas, bindings e decisões de geração continuam pertencendo exclusivamente à `ContractDefinition`. `ServiceDefinition` não pode introduzir lógica em renderer, motor, Server Actions, rotas ou componentes compartilhados.

Descrições livres devem admitir política declarativa de revisão. O catálogo oficial não pode oferecer atividades ilegais, fraudulentas ou inseguras, e uma política de revisão não equivale a detector automático nem autoriza geração de orientação operacional.

## `formSchema`

O `formSchema` define completamente a coleta e a apresentação dos dados:

- seções e ordem;
- campos e IDs;
- tipos;
- obrigatoriedade;
- máscaras e placeholders, quando fizerem parte do vocabulário genérico aprovado;
- validações declarativas;
- layout;
- ajuda ao usuário;
- valores padrão.

O renderer apenas interpreta o schema. Validações relevantes também devem ser aplicadas no servidor a partir da mesma definição.

## `generationSchema`

O `generationSchema` define tudo que é específico da preparação do contrato para o motor:

- estrutura contratual e ordem das seções;
- respostas autorizadas;
- participantes e papéis;
- bindings;
- título do documento;
- textos estruturais e instruções aprovadas, quando aplicáveis;
- objetivos das seções;
- estado de revisão;
- regras declarativas de geração.

O motor somente interpreta o pedido estruturado resultante desse schema.

## Renderer

O renderer percorre as seções e os campos do `formSchema`. É proibido introduzir nele:

```text
if (contract...)
switch (contract...)
if (category...)
switch (category...)
```

Condições sobre discriminadores genéricos, como `field.type`, são permitidas porque pertencem ao vocabulário estável do renderer, não a um contrato.

## Motor de Geração

O motor permanece genérico. É proibido criar condições por contrato, categoria, profissão ou modelo.

Toda decisão específica — campos, seções, objetivos, bindings e instruções — deve permanecer dentro da definição.

## Inclusão de Novos Contratos

Para adicionar um contrato deve ser necessário apenas:

1. Criar a nova `ContractDefinition`.
2. Registrar a definição no catálogo da categoria.
3. Criar os testes correspondentes.

Nada mais.

## Componentes Protegidos

Adicionar um contrato não deve exigir alterações em:

- Server Action;
- renderer;
- motor;
- rotas;
- PDF;
- persistência;
- histórico;
- autenticação;
- Stripe;
- Supabase;
- IA e prompts globais;
- adaptadores;
- infraestrutura;
- serviços compartilhados;
- contratos centrais de domínio.

Se qualquer fronteira protegida precisar mudar, a proposta deve ser tratada como mudança arquitetural.

## Compatibilidade

Toda evolução deve preservar contratos existentes, acesso direto, histórico, documentos persistidos e formatos já aceitos pelo motor. Uma nova definição não pode alterar silenciosamente o significado de uma definição anterior.

Mudanças intencionais em um contrato existente devem considerar versão, migração, impacto sobre URLs, dados persistidos e testes.

## Escalabilidade

A arquitetura deve suportar centenas de contratos. O crescimento da biblioteca não deve aumentar a complexidade das camadas de execução.

Mais contratos significam mais definições e testes, não mais rotas, actions, componentes ou motores.

## Reutilização

Devem ser reutilizados:

- renderer;
- componentes;
- motor;
- vocabulário de schemas;
- infraestrutura;
- validações genéricas;
- serviços.

Duplicação estrutural deve ser evitada. Reutilização não autoriza abstrações especulativas ou genéricas sem necessidade comprovada.

## Simplicidade

Preferir sempre:

- menos código;
- menos dependências;
- menos acoplamento;
- mais configuração declarativa;
- fronteiras pequenas e explícitas.

Over engineering deve ser evitado.

## Evolução Arquitetural

Mudanças arquiteturais somente podem ocorrer com benefício claro e atual para simplicidade, manutenção, reutilização ou escalabilidade.

Nunca se deve modificar a arquitetura para acomodar somente um contrato específico. A necessidade, alternativas, impacto, compatibilidade, arquivos e validação devem ser documentados e aprovados antes da implementação.

## Qualidade do Produto

O diferencial do DocAI é qualidade. Cada contrato deve:

- resolver um problema real;
- possuir excelente experiência de preenchimento;
- possuir estrutura jurídica submetida à revisão adequada;
- utilizar linguagem clara;
- reutilizar integralmente a arquitetura existente;
- permanecer identificado como conteúdo inicial enquanto não houver revisão jurídica formal.

Qualidade sempre vence quantidade.

## Fluxo Oficial

```text
Biblioteca
    ↓
Categoria
    ↓
ContractDefinition
    ↓
formSchema
    ↓
Renderer genérico
    ↓
Validação genérica
    ↓
generationSchema
    ↓
Motor genérico
    ↓
PDF
    ↓
Histórico
```

Autenticação e autorização protegem o fluxo; persistência e adaptadores continuam como fronteiras de infraestrutura desacopladas.

## Checklist Obrigatório para Pull Requests

Antes de aprovar uma Pull Request, verificar:

- [ ] Existe algum `if` baseado em contrato?
- [ ] Existe algum `switch` baseado em categoria ou contrato?
- [ ] Algum componente foi duplicado?
- [ ] Algum formulário específico foi criado?
- [ ] Alguma rota foi criada apenas para um contrato?
- [ ] Algum contrato exigiu alterar o motor?
- [ ] Algum contrato exigiu alterar a Server Action?
- [ ] Algum contrato exigiu alterar infraestrutura?
- [ ] Existe lógica específica fora da `ContractDefinition`?
- [ ] A compatibilidade com definições anteriores foi demonstrada?
- [ ] Os testes da definição cobrem campos, bindings e seções?

Se qualquer uma das nove primeiras respostas for positiva, a alteração deve ser interrompida e revisada como possível mudança arquitetural.

## Princípios de Engenharia

Aplicam-se permanentemente:

- SOLID;
- DRY — Don't Repeat Yourself;
- KISS — Keep It Simple;
- Separation of Concerns;
- Composition over Inheritance;
- Configuration over Code.

Esses princípios devem ser aplicados com proporcionalidade. DRY não justifica abstração prematura, e SOLID não justifica multiplicação desnecessária de camadas.

## Compromisso Arquitetural

A arquitetura do DocAI está oficialmente estabilizada. A partir deste registro, o foco passa a ser:

- evolução da biblioteca;
- melhoria de `formSchema`;
- melhoria de `generationSchema`;
- melhoria da experiência do usuário;
- melhoria da qualidade jurídica após revisão apropriada.

Não devem ocorrer mudanças arquiteturais sem justificativa técnica consistente e aprovação explícita.

## Princípio Final

O melhor código é aquele que não precisa ser alterado quando um novo contrato é adicionado.

Um novo contrato deve exigir somente:

- nova `ContractDefinition`;
- seu `formSchema`;
- seu `generationSchema`;
- registro no catálogo;
- testes.

Nada mais.

## Estado de Alinhamento com a Implementação

A Constituição corresponde à arquitetura implementada:

- existe um único renderer orientado por `formSchema`;
- existe um interpretador genérico entre definição e motor;
- a Server Action resolve a definição no servidor e não contém lógica por ID de contrato;
- objetivo, participantes, bindings, respostas e seções seguem no contexto de geração;
- contratos da biblioteca compartilham rotas, motor, persistência e PDF;
- o fluxo histórico permanece compatível.

Na implementação atual, `id` é o slug estável do contrato e `categorySlug` identifica a categoria; não existe uma propriedade `slug` duplicada. Máscaras e placeholders ainda não fazem parte do vocabulário tipado porque nenhum contrato aprovado os exige. Caso se tornem necessários de forma genérica, a ampliação do vocabulário de schema deverá ser tratada como mudança arquitetural própria, nunca como exceção local de um contrato.

Os quatro `ContractType` existentes (`services`, `sale`, `rental` e `loan`) constituem a fronteira atual do motor. Adicionar definições compatíveis com esses tipos é evolução da biblioteca. Criar um quinto tipo fundamental é mudança arquitetural.

## Referência Técnica da Implementação

As seções seguintes registram como os princípios constitucionais se materializam na estrutura atual do projeto. Elas complementam a Constituição sem ampliar o escopo de uma Sprint nem autorizar alterações por si mesmas.

## Visão Geral da Arquitetura

O projeto utiliza Next.js com App Router, React, TypeScript e Tailwind CSS. O Starter Kit fornece a fundação técnica; o DocAI acrescenta domínio, aplicação, autenticação, persistência, geração assistida e interface específica por meio de Sprints aprovadas.

No estágio atual, a arquitetura permanece modular:

- o App Router organiza o ponto de entrada da aplicação;
- o layout raiz define a estrutura comum do documento;
- rotas e componentes representam a camada de apresentação;
- módulos de aplicação coordenam autorização, rascunhos e geração;
- o domínio contém contratos, schemas e regras do DocAI;
- adaptadores isolam autenticação, persistência e IA;
- os estilos globais estabelecem os fundamentos visuais;
- os arquivos de configuração sustentam a stack aprovada;
- a documentação orienta decisões, escopo e evolução.

Essas capacidades específicas pertencem ao DocAI e não ampliam automaticamente a fundação reutilizável. Novas responsabilidades continuam dependendo de necessidade e Sprint aprovadas.

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

### `components/`

Contém componentes de apresentação reutilizados pelas rotas. Renderers permanecem neutros em relação a IDs de contratos e recebem schemas declarativos.

### `lib/`

Contém domínio, casos de uso, serviços, contratos internos e adaptadores de infraestrutura. Regras específicas de contratos pertencem às definições do domínio; fornecedores permanecem isolados em infraestrutura.

### Raiz do projeto

Contém os manifestos, arquivos de configuração e documentos que orientam o desenvolvimento. Configurações devem permanecer pequenas e diretamente relacionadas à stack ou ao comportamento aprovado.

### Documentação

A distribuição oficial de responsabilidades documentais e as regras de colaboração estão definidas em `AGENTS.md`. Documentos de produto e planejamento não podem redefinir as fronteiras arquiteturais desta Constituição.

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

No DocAI, esse fluxo alcança geração assistida, persistência, revisão e exportação. Cada capacidade continua atrás de contratos internos e deve preservar isolamento por usuário e revisão humana.

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

## Escalabilidade Técnica e Operacional

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

## Arquitetura Estabilizada do Catálogo DocAI

O catálogo de contratos do DocAI utiliza definições declarativas sobre o motor único de geração. Esta é a arquitetura estabilizada para evolução da biblioteca: novos contratos devem ser dados de domínio, não novos fluxos de aplicação.

```text
Biblioteca
    ↓
ContractDefinition
    ↓
formSchema
    ↓
renderer único de formulário
    ↓
generationSchema
    ↓
interpretador genérico da aplicação
    ↓
motor de geração existente
    ↓
persistência, revisão e PDF existentes
```

### Fonte de verdade

Uma `ContractDefinition` concentra todas as informações específicas de um contrato:

- identidade, categoria, versão, nome, descrição e objetivo;
- `formSchema`, com seções, campos, tipos, rótulos, ajuda, obrigatoriedade, layout e valores iniciais;
- `generationSchema`, com título do documento, respostas autorizadas, participantes, bindings para o formato do motor, seções esperadas e estado de revisão;
- estrutura resumida apresentada na biblioteca.

Nenhuma regra específica de um modelo deve ser adicionada à rota, ao renderer, à Server Action, ao serviço de IA, ao adaptador Gemini, à persistência ou ao PDF.

### Responsabilidades

| Elemento | Responsabilidade | Não pode conhecer |
| --- | --- | --- |
| Biblioteca | Listar e localizar definições | Regras de formulário ou geração fora da definição |
| `ContractDefinition` | Declarar integralmente um modelo | Framework, fornecedor ou persistência |
| Renderer | Renderizar qualquer `formSchema` suportado | IDs de contratos ou regras jurídicas |
| Interpretador de geração | Validar o formulário e aplicar bindings declarados | Nomes ou IDs de contratos |
| Server Action | Resolver a definição no servidor e coordenar o caso de uso | Regras específicas por modelo |
| Motor e IA | Gerar a partir do pedido estruturado | Rotas, componentes ou catálogo |
| PDF | Exportar o rascunho persistido | Origem ou definição do formulário |

O cliente envia somente o identificador da definição e as respostas. A Server Action resolve novamente a definição no catálogo do servidor; schemas ou bindings enviados pelo cliente nunca são aceitos como fonte de verdade.

### `formSchema`

O `formSchema` é a única fonte de verdade para a interface. Seus campos são renderizados pelo componente compartilhado conforme o discriminador `type`.

Os tipos atualmente suportados são:

- `text`;
- `textarea`;
- `date`;
- `money`;
- `number`;
- `select`;
- `checkbox`.

IDs de campos devem ser únicos dentro da definição. Campos obrigatórios são validados no servidor a partir do próprio schema. Um campo não deve ser incluído apenas para apresentação se sua resposta for necessária à geração.

### Renderer genérico

O renderer percorre `formSchema.sections` e, dentro de cada seção, percorre `fields`. O discriminador `field.type` seleciona somente o controle visual genérico correspondente. Rótulo, ajuda, valor inicial, obrigatoriedade, opções, limites e layout vêm do schema.

O renderer pode possuir um `switch` sobre os tipos genéricos de campo (`text`, `select`, `date` etc.), pois essa decisão pertence ao vocabulário estável da interface. Ele nunca pode possuir condição baseada em `definition.id`, nome, categoria ou tipo jurídico do contrato.

### `generationSchema`

O `generationSchema` declara:

- `answerFieldIds`: campos autorizados a entrar no contexto de geração;
- `partyBindings`: campos que identificam os participantes e seus papéis;
- `contentBindings`: adaptação declarativa aos quatro formatos já aceitos pelo motor;
- `sections`: estrutura esperada do rascunho e objetivo de cada seção;
- `documentTitle`: título usado na geração e persistência;
- `reviewStatus`: nível de revisão do conteúdo estrutural;
- `contractType`: formato compatível do motor.

Os bindings são interpretados por `create-schema-generation-request.ts`. Esse módulo possui uma tabela fixa por `ContractType`, mas nenhuma condição por contrato. Uma nova definição dentro dos tipos existentes não exige alteração nele.

### Motor genérico e desacoplado

O motor recebe um `ContractGenerationRequest` com o formato compatível atual e um `definitionContext` dentro de `content`. Esse contexto contém objetivo, versão, título, participantes, respostas autorizadas, seções e estado de revisão. O motor não consulta catálogo, rota ou componente e não precisa reconhecer o ID do contrato.

O interpretador aplica os bindings antes de chamar o motor. Por isso, detalhes como “qual campo representa o escopo” ou “quais seções um NDA precisa” permanecem na definição. O serviço de IA, seu adaptador, a persistência e o PDF operam sobre os mesmos contratos internos independentemente do modelo escolhido.

### Compatibilidade

O fluxo direto de criação, sem origem na biblioteca, continua utilizando os dez campos históricos e os quatro conteúdos existentes: `services`, `sale`, `rental` e `loan`.

Definições da biblioteca podem acrescentar perguntas específicas. Todas as respostas autorizadas seguem no `definitionContext`, enquanto os bindings mantêm o formato esperado pelo motor atual. Assim, contratos existentes continuam funcionando e contratos novos carregam contexto específico sem duplicar o motor.

Criar um novo tipo fundamental além dos quatro `ContractType` atuais constitui mudança de domínio e não é equivalente a cadastrar um novo modelo. A expansão normal do catálogo deve reutilizar um tipo compatível existente.

## Como Adicionar um Novo Contrato

Adicionar um contrato deve exigir somente uma nova `ContractDefinition`, seu registro no catálogo e testes correspondentes.

### 1. Criar a definição

Mantenha a definição no módulo da categoria correspondente. O exemplo abaixo é completo e pode ser adaptado sem criar componentes, rotas ou lógica de geração.

```ts
import type { ContractDefinition } from "./contract-definition";

export const contratoDeTraducao: ContractDefinition<"contratos-gerais"> = {
  categorySlug: "contratos-gerais",
  contractType: "services",
  description: "Organiza um serviço de tradução com idioma, entrega e revisão definidos.",
  formSchema: {
    sections: [
      {
        id: "contractor",
        title: "Contratante",
        fields: [
          {
            id: "contractorName",
            label: "Nome do contratante",
            layout: "half",
            required: true,
            type: "text",
          },
          {
            id: "contractorDocument",
            label: "CPF/CNPJ do contratante",
            layout: "half",
            required: true,
            type: "text",
          },
          {
            id: "contractorAddress",
            label: "Endereço do contratante",
            layout: "full",
            required: true,
            type: "text",
          },
        ],
      },
      {
        id: "contracted",
        title: "Tradutor",
        fields: [
          {
            id: "contractedName",
            label: "Nome do tradutor",
            layout: "half",
            required: true,
            type: "text",
          },
          {
            id: "contractedDocument",
            label: "CPF/CNPJ do tradutor",
            layout: "half",
            required: true,
            type: "text",
          },
          {
            id: "contractedAddress",
            label: "Endereço do tradutor",
            layout: "full",
            required: true,
            type: "text",
          },
        ],
      },
      {
        id: "contract-details",
        title: "Dados da tradução",
        fields: [
          {
            defaultValue: "Tradução de documento",
            id: "contractObject",
            label: "Objeto principal",
            layout: "full",
            required: true,
            type: "text",
          },
          {
            currency: "BRL",
            id: "value",
            label: "Valor",
            layout: "half",
            required: true,
            type: "money",
          },
          {
            id: "startDate",
            label: "Data de início",
            layout: "half",
            required: true,
            type: "date",
          },
          {
            id: "term",
            label: "Prazo de entrega",
            layout: "half",
            required: true,
            type: "text",
          },
          {
            id: "sourceLanguage",
            label: "Idioma de origem",
            layout: "half",
            required: true,
            type: "text",
          },
          {
            id: "targetLanguage",
            label: "Idioma de destino",
            layout: "half",
            required: true,
            type: "text",
          },
          {
            id: "materialDescription",
            label: "Material e formato a traduzir",
            layout: "full",
            required: true,
            rows: 4,
            type: "textarea",
          },
          {
            id: "revisionRounds",
            label: "Rodadas de revisão incluídas",
            layout: "half",
            min: 0,
            required: true,
            type: "number",
          },
        ],
      },
    ],
  },
  generationSchema: {
    answerFieldIds: [
      "contractorName",
      "contractorDocument",
      "contractorAddress",
      "contractedName",
      "contractedDocument",
      "contractedAddress",
      "contractObject",
      "value",
      "startDate",
      "term",
      "sourceLanguage",
      "targetLanguage",
      "materialDescription",
      "revisionRounds",
    ],
    contentBindings: [
      { sourceFieldId: "contractorAddress", target: "contractorAddress" },
      { sourceFieldId: "contractedAddress", target: "contractedAddress" },
      { sourceFieldId: "startDate", target: "startDate" },
      { sourceFieldId: "contractObject", target: "scope" },
      { sourceFieldId: "value", target: "compensation" },
      { sourceFieldId: "term", target: "term" },
    ],
    contractType: "services",
    documentTitle: "Contrato de Serviços de Tradução",
    partyBindings: [
      {
        addressFieldId: "contractorAddress",
        identifierFieldId: "contractorDocument",
        nameFieldId: "contractorName",
        role: "Contratante",
      },
      {
        addressFieldId: "contractedAddress",
        identifierFieldId: "contractedDocument",
        nameFieldId: "contractedName",
        role: "Tradutor",
      },
    ],
    reviewStatus: "initial-validation",
    sections: [
      {
        id: "parties",
        objective: "Identificar contratante e tradutor.",
        title: "Identificação das partes",
      },
      {
        id: "scope",
        objective: "Delimitar material, idiomas e formato da tradução.",
        title: "Objeto e escopo",
      },
      {
        id: "delivery",
        objective: "Organizar prazo, formato de entrega e revisões.",
        title: "Entrega e revisões",
      },
      {
        id: "payment",
        objective: "Registrar valor e condições de pagamento.",
        title: "Remuneração",
      },
      {
        id: "final",
        objective: "Organizar responsabilidades e encerramento para revisão.",
        title: "Responsabilidades e encerramento",
      },
    ],
  },
  id: "servicos-de-traducao",
  name: "Serviços de Tradução",
  objective: "Definir material, idiomas, prazo, revisões e remuneração de uma tradução.",
  structure: [
    "Identificação das partes",
    "Objeto e escopo",
    "Entrega e revisões",
    "Remuneração",
    "Responsabilidades e encerramento",
  ],
  version: 1,
};
```

### 2. Registrar no catálogo

Inclua a definição na coleção exportada pela categoria. O registro não pode criar rota, componente, action, prompt ou serviço específico.

```ts
export const GENERAL_CONTRACT_DEFINITIONS = [
  // definições existentes
  contratoDeTraducao,
] as const;
```

### 3. Testar a definição

Os testes devem confirmar:

- ID único, categoria, versão, descrição e objetivo;
- IDs de campos únicos;
- defaults intencionais e editáveis;
- referências do `generationSchema` existentes no `formSchema`;
- bindings obrigatórios para o `contractType` escolhido;
- seções coerentes com `structure`;
- estado `initial-validation` enquanto não houver revisão jurídica formal;
- presença da definição na ordem aprovada do catálogo.

Um teste mínimo deve localizar a definição, comparar os campos declarados com `answerFieldIds` e garantir que todos os bindings referenciem campos existentes. Os testes do interpretador devem conseguir criar um pedido de geração preenchendo o schema sem qualquer caso especial para o novo ID.

### 4. Não alterar a estrutura

Uma inclusão comum no catálogo não deve modificar:

- `app/actions/generate-contract.ts`;
- `lib/docai/domain/contract-models.ts`;
- renderer de formulário;
- rotas;
- serviços ou adaptadores de IA;
- persistência, histórico ou PDF;
- dependências e configurações.

Se uma definição não puder ser expressa pelos tipos de campo ou pelos quatro `ContractType` existentes, isso representa uma necessidade arquitetural nova. Ela deve ser documentada e aprovada separadamente, nunca contornada com lógica específica espalhada pelo fluxo.

### Regras contra lógica específica espalhada

- É proibido testar `definition.id`, `definition.name` ou categoria em componentes, rotas, actions, serviços, adaptadores e exportadores para alterar comportamento.
- É proibido criar `if`, `switch`, mapa de handlers ou factory indexada por ID de contrato fora do módulo declarativo da categoria.
- `switch` é permitido somente sobre discriminadores genéricos e fechados, como `field.type` no renderer.
- A tabela por `ContractType` no interpretador representa o contrato estável do motor e não deve crescer por modelo.
- Rótulos, defaults, perguntas, participantes, seções, objetivos e bindings devem permanecer dentro da `ContractDefinition`.
- Dados externos devem ser validados pelo schema resolvido no servidor; o cliente nunca escolhe regras de geração.
- Uma necessidade que não caiba em uma definição deve ser tratada como proposta arquitetural separada, não como exceção local.
