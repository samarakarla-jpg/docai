# SaaS Starter Kit

## Visão Geral

O SaaS Starter Kit é uma fundação técnica e documental para iniciar aplicações SaaS de maneira simples, controlada e reutilizável. Ele reúne uma estrutura web mínima, convenções de trabalho e uma hierarquia de documentação que conduz o projeto desde a visão até a entrega de cada Sprint.

O Starter Kit não representa um produto pronto. Sua função é reduzir o trabalho inicial sem impor regras de negócio, integrações ou decisões que pertencem a cada produto derivado. Toda evolução deve responder a uma necessidade concreta, possuir escopo explícito e ser aprovada antes da implementação.

## Objetivos

O projeto busca:

- reduzir a repetição de configurações e decisões fundamentais no início de novos SaaS;
- oferecer uma base pequena, executável e fácil de compreender;
- separar a fundação compartilhada das regras específicas de cada produto;
- manter escopo, dependências e complexidade sob controle;
- orientar decisões por meio de documentação organizada;
- permitir evolução gradual sem arquitetura ou funcionalidades especulativas;
- facilitar revisão, validação e manutenção por desenvolvedores independentes e equipes pequenas.

O sucesso do Starter Kit é medido pela clareza e pela utilidade da fundação, não pela quantidade de funcionalidades incluídas.

## Filosofia

### Simplicidade

A solução mais simples capaz de atender ao escopo aprovado deve ser priorizada. Novas camadas, dependências e configurações somente devem ser introduzidas quando resolverem um problema atual e demonstrável.

### Reutilização

A base deve permanecer neutra em relação a domínio, marca e modelo de negócio. Elementos compartilhados devem nascer de necessidades reais e ser reutilizáveis sem carregar decisões de um produto anterior.

### Documentação primeiro

A documentação é a fonte de verdade do projeto. Visão, princípios, especificação, roadmap e Sprint devem definir a direção e os limites antes que qualquer implementação seja iniciada.

### Arquitetura modular

Capacidades futuras devem possuir responsabilidades claras e limites bem definidos. A modularidade deve facilitar adoção, substituição e manutenção, mas não justifica criar módulos ou abstrações antes que exista uma necessidade aprovada.

### Desenvolvimento incremental

O projeto evolui por meio de Sprints pequenas, verificáveis e explicitamente aprovadas. Cada entrega deve produzir o menor resultado útil, ser validada de forma proporcional ao risco e terminar antes que uma nova etapa seja iniciada.

## Tecnologias

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4

## Estrutura do Projeto

### `app/`

Contém a aplicação web organizada com o App Router. Reúne o layout raiz, a página inicial, os estilos globais e os recursos diretamente associados à estrutura da aplicação.

### `public/`

É reservada para arquivos estáticos públicos que sejam realmente necessários. Recursos demonstrativos ou sem uso não devem permanecer na fundação.

### Raiz do projeto

Concentra os manifestos, as configurações essenciais e a documentação. Cada documento possui uma responsabilidade específica e deve respeitar a hierarquia definida pelo projeto.

Novas pastas somente devem ser criadas quando uma Sprint aprovada demonstrar uma responsabilidade concreta que não possa ser representada com clareza na estrutura existente.

## Fluxo de Desenvolvimento

O desenvolvimento segue uma sequência obrigatória:

1. **Vision** — define o propósito, a direção e os limites permanentes do produto.
2. **Roadmap** — organiza a evolução estratégica em fases de alto nível.
3. **Sprint** — transforma uma parte do roadmap em escopo pequeno, verificável e autorizado.
4. **Implementação** — realiza somente as mudanças descritas e aprovadas na Sprint atual.
5. **Validação** — verifica critérios de aceitação, arquivos afetados e ausência de mudanças fora do escopo.
6. **Commit** — registra uma entrega coerente somente depois que o resultado foi revisado.

Uma etapa posterior não deve começar enquanto a anterior possuir decisões pendentes ou ainda aguardar a aprovação necessária.

## Como iniciar um novo SaaS

Um novo produto deve utilizar o Starter Kit como fundação, preservando inicialmente sua estrutura neutra. O processo recomendado é:

1. Criar uma cópia independente da base para o novo projeto.
2. Definir o problema, o público e os limites do produto em sua própria visão.
3. Revisar os princípios permanentes e registrar qualquer decisão específica necessária.
4. Adaptar a especificação do produto sem confundir regras de negócio com capacidades compartilhadas.
5. Organizar a evolução desejada no roadmap do novo projeto.
6. Preparar uma primeira Sprint pequena, com entregas e critérios de aceitação explícitos.
7. Solicitar aprovação antes de alterar código, dependências ou configurações.
8. Implementar e validar somente o escopo autorizado.
9. Registrar cada entrega aprovada em um commit claro e rastreável.

Funcionalidades consideradas comuns em aplicações SaaS não devem ser incorporadas automaticamente. Cada produto deve decidir o que realmente precisa e em qual momento.

## Convenções

- A documentação deve ser lida e atualizada de acordo com sua hierarquia.
- Cada Sprint deve possuir objetivo, escopo, limites, arquivos autorizados e critérios de aceitação.
- Uma menção no roadmap não constitui autorização para implementar.
- Mudanças devem ser pequenas, relacionadas e fáceis de revisar.
- Arquivos, funções e responsabilidades devem utilizar nomes claros.
- Regras de negócio devem permanecer separadas da fundação reutilizável.
- Dependências e configurações exigem necessidade demonstrada e aprovação explícita.
- Abstrações somente devem ser criadas após o surgimento de um padrão real.
- Ideias descobertas durante uma Sprint não ampliam automaticamente seu escopo.
- Commits devem representar entregas coerentes e utilizar mensagens objetivas.
- Limitações, riscos e validações não executadas devem ser comunicados.

As convenções detalhadas de código, interface, arquitetura e colaboração são mantidas nos documentos específicos listados abaixo.

## Roadmap

O [Roadmap Estratégico](ROADMAP.md) organiza a evolução do Starter Kit em fases de alto nível, começando pela fundação e avançando somente quando houver necessidade concreta.

O desenvolvimento operacional acontece por meio de Sprints documentadas. Cada Sprint seleciona um recorte pequeno do roadmap, define o que pode ser modificado e estabelece como o resultado será aceito. Uma fase pode conter várias Sprints, e nenhuma Sprint futura é autorizada automaticamente pela conclusão da anterior.

## Documentação

A documentação existente está organizada da seguinte forma:

- [README.md](README.md) — apresenta o projeto e funciona como ponto inicial de leitura.
- [VISION.md](VISION.md) — define missão, direção, filosofia e limites do Starter Kit.
- [PROJECT_PRINCIPLES.md](PROJECT_PRINCIPLES.md) — estabelece os princípios permanentes para decisões e evolução.
- [PRODUCT_SPEC.md](PRODUCT_SPEC.md) — descreve objetivo, escopo, requisitos e critérios de sucesso.
- [MASTER_PROMPT.md](MASTER_PROMPT.md) — define o protocolo para desenvolvimento assistido por IA.
- [ROADMAP.md](ROADMAP.md) — organiza a evolução estratégica em fases.
- [SPRINT_01.md](SPRINT_01.md) — registra o escopo, as entregas e os critérios da Sprint de fundação.
- [ARCHITECTURE.md](ARCHITECTURE.md) — documenta a organização técnica e as decisões arquiteturais.
- [UI_GUIDELINES.md](UI_GUIDELINES.md) — orienta consistência, clareza e acessibilidade da interface.
- [CODE_STYLE.md](CODE_STYLE.md) — registra as convenções de escrita e organização do código.
- [DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md) — descreve como o trabalho é planejado, aprovado e executado.
- [CONTRIBUTING.md](CONTRIBUTING.md) — orienta a colaboração e a contribuição com o projeto.
- [CHANGELOG.md](CHANGELOG.md) — mantém o histórico relevante de alterações.

Os documentos mais específicos devem detalhar os anteriores sem contradizê-los. Em caso de conflito, o documento de nível superior determina os limites.

## Licença

Este projeto ainda não possui uma licença de uso definida. Antes de distribuir, reutilizar ou aceitar contribuições externas, a licença apropriada deve ser escolhida, aprovada e registrada em um arquivo próprio.
