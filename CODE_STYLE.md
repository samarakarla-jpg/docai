# Guia Oficial de Estilo de Código

## Objetivo

Este documento define as convenções permanentes para escrever, organizar, revisar e manter o código do SaaS Starter Kit. Seu objetivo é tornar a base previsível, legível e reutilizável para diferentes projetos, sem impor regras de domínio ou abstrações antecipadas.

O guia deve ser aplicado a toda implementação aprovada. Ele complementa os princípios, a arquitetura e as diretrizes de interface, mas não autoriza a criação de arquivos, componentes, serviços ou funcionalidades.

Quando uma convenção não atender a uma necessidade real, a decisão deve priorizar:

1. correção;
2. clareza;
3. consistência com o projeto;
4. simplicidade;
5. facilidade de manutenção.

Exceções devem ser justificadas, limitadas ao escopo e aprovadas quando alterarem um padrão relevante.

## Princípios Gerais

### Clareza acima de esperteza

O código deve comunicar intenção sem exigir interpretação de truques, efeitos implícitos ou construções incomuns. Uma solução explícita e previsível deve ser preferida a uma alternativa menor, porém difícil de compreender.

### Simplicidade

Cada implementação deve conter apenas o necessário para o requisito atual. Condições, parâmetros, extensões e pontos de configuração destinados a possibilidades futuras devem ser evitados.

### Consistência

Problemas equivalentes devem seguir padrões equivalentes. Antes de introduzir uma nova forma de organizar ou escrever código, deve-se verificar se o projeto já possui uma convenção adequada.

### Legibilidade

Nomes, estrutura, fluxo e tipos devem permitir compreender o comportamento sem depender de comentários extensos. Blocos longos, níveis excessivos de aninhamento e responsabilidades misturadas devem ser divididos quando essa separação melhorar o entendimento.

### Manutenção fácil

Uma mudança futura deve poder ser realizada com impacto previsível. O código deve manter dependências explícitas, evitar estado oculto e concentrar cada decisão em um local coerente.

### Reutilização consciente

Reutilização deve nascer de comportamento repetido e responsabilidade compartilhada. Um elemento reutilizável precisa simplificar seus consumidores e permanecer neutro em relação ao domínio.

### Evitar abstrações prematuras

Uma abstração não deve ser criada apenas porque dois trechos parecem semelhantes. Antes de extrair um padrão, deve-se confirmar que os casos possuem a mesma razão para mudar e que o contrato resultante é mais simples do que as implementações separadas.

## TypeScript

### Tipagem explícita

- Utilizar inferência quando o tipo for local, evidente e estável.
- Declarar tipos explicitamente em limites públicos, contratos, entradas externas e retornos cujo significado não seja óbvio.
- Tipar propriedades, parâmetros e resultados que atravessem módulos ou camadas.
- Evitar anotações redundantes que apenas repetem uma inferência clara.
- Não utilizar conversões de tipo para esconder incompatibilidades reais.

Tipos devem representar restrições do domínio ou do fluxo, não apenas satisfazer o compilador.

### Uso de `any`

- Evitar `any`.
- Preferir `unknown` para valores cuja forma ainda precise ser verificada.
- Refinar dados externos antes de utilizá-los.
- Não substituir erros de tipagem por assertions amplas.
- Quando uma integração sem tipos tornar uma exceção inevitável, limitar o uso à fronteira, documentar o motivo e impedir sua propagação.

### Interfaces e types

- Utilizar interfaces para contratos de objetos quando extensão ou implementação fizer parte da intenção.
- Utilizar aliases de tipo para uniões, interseções, valores literais, tuplas e transformações.
- Não manter uma interface e um alias concorrentes para o mesmo conceito.
- Evitar hierarquias extensas de herança; preferir composição de contratos pequenos.
- Não adicionar prefixos artificiais apenas para indicar que um nome representa uma interface.

A escolha deve permanecer consistente dentro do mesmo contexto. Alterar entre interface e alias sem benefício concreto deve ser evitado.

### Funções pequenas

- Cada função deve possuir uma responsabilidade clara.
- Preferir entradas e saídas explícitas a dependências ocultas.
- Reduzir aninhamento por meio de validações antecipadas quando isso melhorar leitura.
- Separar transformação, decisão e efeito colateral quando representarem responsabilidades distintas.
- Evitar parâmetros booleanos que alterem radicalmente o comportamento.
- Agrupar parâmetros somente quando eles formarem um conceito real e reutilizável.
- Não dividir funções simples em cadeias de auxiliares sem ganho de clareza.

### Valores nulos e ausentes

- Tratar valores nulos ou ausentes de forma explícita.
- Diferenciar propriedade opcional de valor intencionalmente nulo.
- Evitar assertions de não nulidade sem uma garantia verificável.
- Aplicar valores padrão apenas quando eles forem semanticamente corretos.
- Não esconder ausência inválida com fallback silencioso.
- Refinar o valor próximo à fronteira em que ele entra no sistema.

### Tipos reutilizáveis

- Manter tipos próximos ao código que os utiliza enquanto forem locais.
- Compartilhar um tipo somente quando o mesmo conceito atravessar módulos.
- Definir uma única fonte de verdade para contratos compartilhados.
- Evitar arquivos globais que acumulem tipos sem relação.
- Não exportar tipos internos sem necessidade.
- Preservar separação entre modelos de domínio, entradas de interface e formatos de infraestrutura.

## React e Next.js

### Componentes funcionais

- Utilizar componentes funcionais.
- Manter o componente focado em uma responsabilidade de apresentação.
- Evitar componentes extensos que coordenem dados, regras e múltiplas regiões visuais.
- Extrair partes quando houver responsabilidade independente ou reutilização comprovada.
- Não transformar marcação simples em componente apenas para reduzir o tamanho do arquivo.

### Server Components e Client Components

- Utilizar Server Components como padrão.
- Criar um limite de cliente somente quando houver interação, estado local, efeito ou acesso a APIs do navegador.
- Manter o limite de cliente o mais próximo possível do elemento interativo.
- Não enviar ao cliente dados, dependências ou lógica que possam permanecer no servidor.
- Nunca expor segredos ou detalhes internos em código executado no cliente.
- Não marcar uma árvore inteira como cliente por conveniência.

A escolha entre servidor e cliente deve responder ao comportamento necessário, não a preferência pessoal.

### Props

- Definir props com nomes claros e relacionados à responsabilidade do componente.
- Manter contratos pequenos.
- Preferir composição a uma quantidade crescente de flags.
- Não passar objetos amplos quando o componente precisa de poucos valores.
- Evitar props que permitam estados inválidos ou combinações contraditórias.
- Tratar callbacks como intenções, utilizando nomes que descrevam o evento ou resultado esperado.
- Não modificar objetos recebidos por props.

### Estado local

- Manter estado próximo ao componente que realmente o utiliza.
- Elevar estado somente quando múltiplos consumidores precisarem da mesma fonte de verdade.
- Não armazenar valores que possam ser derivados de props ou de outro estado.
- Evitar estado global para conveniência.
- Modelar estados relacionados de forma que combinações inválidas sejam reduzidas.
- Preservar o estado mínimo necessário para representar a interface.

### Efeitos

- Utilizar efeitos para sincronização com sistemas externos ao ciclo declarativo.
- Não utilizar efeitos para calcular valores derivados que podem ser obtidos durante a renderização.
- Declarar dependências completas e reais.
- Implementar limpeza quando houver assinaturas, temporizadores ou recursos persistentes.
- Evitar efeitos que dependam de ordem implícita.
- Reavaliar o desenho quando vários efeitos coordenarem o mesmo fluxo.

### Hooks

- Respeitar as regras de execução de hooks.
- Utilizar hooks existentes antes de criar uma abstração própria.
- Criar hook customizado somente para lógica de estado ou efeito reutilizada.
- Manter a interface do hook pequena e previsível.
- Não ocultar efeitos relevantes ou dependências externas sob nomes genéricos.
- Testar ou validar o comportamento do hook de acordo com seu risco.

### Composição de componentes

- Preferir composição de elementos pequenos a componentes configurados por muitas condições.
- Utilizar conteúdo filho ou regiões nomeadas quando isso expressar melhor a estrutura.
- Manter componentes de uma única tela próximos ao seu uso.
- Compartilhar componentes apenas após reutilização comprovada.
- Preservar semântica e acessibilidade em todas as composições.
- Evitar acoplamento entre componentes por conhecimento de detalhes internos.

### Separação de responsabilidades

- Componentes apresentam dados e transformam interação em intenção.
- Regras de negócio pertencem à camada de domínio ou aplicação quando essas camadas existirem.
- Acesso a persistência e integrações pertence à infraestrutura.
- Rotas e layouts devem coordenar apenas responsabilidades compatíveis com o App Router.
- Validação deve ocorrer na fronteira apropriada.
- Um componente não deve acessar diretamente detalhes de fornecedor.

Arquivos especiais do App Router devem seguir a finalidade e a nomenclatura definidas pelo framework.

## Organização de Arquivos

A organização deve refletir responsabilidades existentes. Novas pastas não devem ser criadas para sugerir uma arquitetura futura.

### Nomes de arquivos

- Arquivos de componentes devem acompanhar o nome do componente principal.
- Hooks devem utilizar o mesmo nome do hook exportado.
- Serviços, utilitários e tipos devem possuir nomes que revelem sua finalidade.
- Arquivos especiais do framework devem preservar a nomenclatura obrigatória.
- Evitar nomes genéricos como `helpers`, `common`, `misc` ou `utils` quando não houver contexto suficiente.
- Não incluir versões ou estados temporários no nome do arquivo.

### Nomes de pastas

- Utilizar nomes curtos, descritivos e consistentes.
- Organizar por responsabilidade ou capacidade real.
- Evitar pastas vazias e agrupamentos genéricos.
- Não criar uma pasta para um único arquivo sem ganho estrutural.
- Manter a profundidade suficiente para contexto, sem cadeias desnecessárias.

### Localização de componentes

- Componentes exclusivos de uma rota ou fluxo devem permanecer próximos ao uso.
- Componentes compartilhados devem ocupar uma área comum somente após uso em contextos diferentes.
- Componentes visuais não devem carregar serviços ou regras de negócio.
- Subcomponentes privados devem permanecer junto ao componente principal quando isso facilitar compreensão.

### Localização de serviços

- Serviços devem permanecer na camada correspondente à responsabilidade que executam.
- Contratos devem ficar próximos da camada que depende deles.
- Adaptadores de fornecedor pertencem à infraestrutura.
- Serviços exclusivos de uma capacidade devem permanecer junto a essa capacidade.
- Um diretório global de serviços não deve reunir responsabilidades sem relação.

### Localização de utilitários

- Utilitários locais devem permanecer próximos ao consumidor.
- Um utilitário compartilhado deve ser puro sempre que possível e possuir uso comprovado.
- Funções com regra de negócio não devem ser classificadas como utilitários.
- Evitar módulos genéricos que se tornem depósitos de funções não relacionadas.

### Localização de tipos

- Tipos locais devem permanecer no mesmo módulo ou próximos ao uso.
- Tipos compartilhados devem ficar junto ao conceito que representam.
- Contratos de infraestrutura não devem substituir modelos internos.
- Evitar um arquivo central com todos os tipos do projeto.

### Arquivos index

- Criar arquivos `index` somente quando eles formarem uma interface pública clara para um módulo.
- Evitar barrels globais.
- Não utilizar arquivos `index` apenas para encurtar imports.
- Verificar se a reexportação oculta a origem, cria ciclo ou inclui dependências desnecessárias.
- Remover um barrel quando ele dificultar navegação ou análise de dependências.

## Convenções de Nomenclatura

### Componentes

- Utilizar `PascalCase`.
- Escolher substantivos que representem a responsabilidade visual.
- Evitar nomes baseados apenas em posição, cor ou aparência temporária.
- Acrescentar contexto quando um nome genérico puder causar ambiguidade.

### Funções

- Utilizar `camelCase`.
- Iniciar com verbo que descreva a ação ou transformação.
- Utilizar nomes específicos em vez de abreviações.
- Reservar prefixos como `get`, `create`, `update`, `remove`, `validate` e `format` para comportamentos compatíveis com seu significado.

### Variáveis

- Utilizar `camelCase`.
- Nomear pelo significado do valor, não pelo tipo técnico.
- Utilizar prefixos como `is`, `has`, `can` ou `should` para booleanos.
- Evitar nomes de uma letra fora de contextos curtos e convencionais.
- Não manter variáveis intermediárias que não aumentem a clareza.

### Constantes

- Utilizar nomes em maiúsculas com separação por sublinhado para constantes verdadeiramente globais e imutáveis.
- Utilizar `camelCase` para valores locais que apenas não serão reatribuídos.
- Evitar promover valores locais a constantes globais sem reutilização real.
- Nomear números e textos relevantes quando seu significado não for evidente.

### Tipos

- Utilizar `PascalCase`.
- Nomear pelo conceito representado.
- Evitar sufixos vagos como `Data`, `Object` ou `Info` sem contexto.
- Utilizar nomes que diferenciem entrada, resultado, estado e contrato quando essa distinção for necessária.

### Interfaces

- Utilizar `PascalCase`.
- Não adicionar prefixo apenas para indicar interface.
- Nomear contratos por responsabilidade ou capacidade.
- Evitar nomes vinculados a uma implementação específica quando o contrato for substituível.

### Hooks

- Utilizar o prefixo `use`.
- Completar o nome com o comportamento oferecido.
- Evitar nomes genéricos que escondam múltiplas responsabilidades.
- Não utilizar o prefixo em funções que não sejam hooks.

### Serviços

- Utilizar `PascalCase` e o sufixo `Service` quando o elemento representar um serviço.
- Nomear pela capacidade oferecida, não pelo fornecedor utilizado.
- Manter o nome do contrato estável quando a implementação puder ser substituída.
- Acrescentar um identificador de adaptador apenas à implementação específica, quando necessário.

### Arquivos

- Arquivos de componentes devem utilizar `PascalCase` quando acompanharem um componente.
- Arquivos de hooks devem acompanhar o nome em `camelCase`.
- Arquivos de módulos não visuais devem seguir uma convenção minúscula e descritiva definida pelo contexto.
- Pastas devem utilizar uma convenção minúscula consistente.
- Arquivos especiais devem seguir a convenção do framework.

## Imports

Os imports devem revelar a origem e a direção das dependências.

### Ordem

Organizar em grupos:

1. módulos da plataforma, framework e bibliotecas externas;
2. módulos internos acessados por aliases já configurados;
3. módulos relativos de níveis superiores e do mesmo diretório;
4. estilos, recursos e outros imports por efeito colateral.

Dentro de cada grupo:

- manter ordem estável;
- separar grupos com uma linha em branco;
- identificar imports exclusivos de tipos;
- importar somente os símbolos utilizados;
- evitar reorganização manual que contradiga uma ferramenta já configurada.

### Aliases

- Utilizar somente aliases existentes e oficialmente configurados.
- Não alterar configurações apenas para encurtar um import isolado.
- Aplicar aliases a caminhos internos estáveis.
- Utilizar caminhos relativos para arquivos realmente próximos quando forem mais claros.
- Evitar aliases diferentes para a mesma área.

### Dependências circulares

- Evitar imports circulares.
- Manter a direção de dependências definida pela arquitetura.
- Extrair um contrato estável quando dois módulos dependerem legitimamente do mesmo conceito.
- Não resolver ciclos por meio de barrels ou carregamento dinâmico sem tratar a causa.
- Revisar reexportações ao investigar um ciclo.

### Imports não utilizados

- Remover imports não utilizados antes de concluir a tarefa.
- Não manter imports comentados.
- Remover dependências que perderam todos os consumidores somente dentro de escopo autorizado.
- Confirmar que imports por efeito colateral são necessários e compreensíveis.

## Serviços

Serviços reutilizáveis devem representar capacidades claras, possuir contratos pequenos e permanecer independentes de detalhes substituíveis.

Nomes como `AIService`, `AuthService`, `PaymentService` e `PDFService` exemplificam a convenção de capacidade seguida pelo sufixo `Service`. Eles não indicam que esses serviços existem, pertencem ao escopo atual ou estão autorizados para implementação.

Um serviço deve:

- possuir uma única responsabilidade predominante;
- expor entradas, saídas e falhas compreensíveis;
- depender de contratos estáveis;
- esconder detalhes de fornecedor atrás de adaptadores;
- permitir substituição quando a arquitetura exigir;
- evitar estado global oculto;
- receber dependências de forma explícita;
- tratar segurança, privacidade e disponibilidade;
- permanecer testável sem acesso obrigatório ao fornecedor real.

Interfaces substituíveis devem ser definidas pela necessidade da camada consumidora, e não pela API de um fornecedor. Um adaptador pode conhecer detalhes externos; o contrato interno não deve reproduzi-los sem necessidade.

Serviços não devem:

- agrupar funções sem relação;
- atuar como depósitos genéricos de lógica;
- acessar interface diretamente;
- expor credenciais ou respostas externas sem transformação;
- capturar erros silenciosamente;
- ser criados apenas para uma única operação simples;
- utilizar abstração como justificativa para uma integração ainda não aprovada.

A criação de um serviço exige necessidade atual, documentação, Sprint e autorização explícita.

## Tratamento de Erros

Erros devem ser previsíveis, contextualizados e tratados na camada capaz de tomar uma decisão útil.

- Diferenciar falhas esperadas de defeitos inesperados.
- Validar entradas nas fronteiras de confiança.
- Utilizar mensagens claras para pessoas e contexto técnico suficiente para diagnóstico interno.
- Não expor stack traces, credenciais, consultas, tokens ou dados sensíveis.
- Não capturar um erro sem recuperar, transformar, adicionar contexto ou propagá-lo.
- Preservar a causa original quando um erro for transformado.
- Evitar retornos ambíguos que confundam ausência válida e falha.
- Apresentar erros de interface conforme as diretrizes de estados.
- Tratar indisponibilidade externa na infraestrutura e traduzir seu impacto para contratos internos.
- Não utilizar mensagens de fornecedor como contrato da aplicação.

Falhas não devem ser escondidas por valores padrão quando isso puder produzir comportamento incorreto.

## Logs

Logs devem existir para diagnóstico, operação ou auditoria quando houver necessidade aprovada. Eles não devem substituir tratamento de erro, métricas ou comunicação com o usuário.

Um log útil deve:

- registrar evento, contexto e resultado relevantes;
- utilizar nível compatível com a gravidade;
- permitir correlação sem depender de dados pessoais;
- evitar duplicação do mesmo erro em várias camadas;
- permanecer objetivo e pesquisável;
- ser emitido na camada que possui contexto suficiente.

Nunca registrar:

- senhas, tokens, chaves ou segredos;
- dados pessoais ou conteúdo sensível sem necessidade e proteção formal;
- cabeçalhos completos de autenticação;
- conteúdo integral de requisições e respostas por padrão;
- detalhes internos em mensagens destinadas ao cliente;
- valores apenas para depuração temporária em código concluído.

Logs temporários devem ser removidos antes da entrega. Novos mecanismos ou bibliotecas de log exigem aprovação explícita.

## Comentários

Comentários devem explicar intenção, restrição ou decisão que não seja evidente pelo código.

Comentários são úteis para:

- justificar uma escolha incomum;
- registrar uma limitação externa relevante;
- explicar uma regra complexa ou invariante;
- alertar sobre um efeito colateral inevitável;
- indicar contexto necessário para uma decisão futura já documentada.

Comentários devem ser evitados quando:

- apenas repetem o que o código já expressa;
- compensam nomes ruins ou funções extensas;
- descrevem uma implementação que mudou;
- mantêm trechos de código desativados;
- registram contexto que pertence à documentação;
- usam marcações vagas sem responsável, motivo ou condição de remoção.

Comentários obsoletos são código morto documental e devem ser atualizados ou removidos dentro do escopo autorizado.

## Qualidade

Qualidade deve ser verificada antes de qualquer entrega ou commit.

### Lint

- Executar o lint quando houver ferramenta e comando oficialmente configurados.
- Corrigir violações relacionadas ao escopo.
- Não desabilitar regras apenas para silenciar um problema.
- Não introduzir ou alterar configuração de lint sem autorização.
- Declarar quando a verificação não estiver disponível.

### Typecheck

- Executar a verificação de tipos disponível no projeto.
- Não ignorar erros por meio de tipos amplos ou directives de supressão sem justificativa.
- Corrigir apenas problemas pertencentes ao escopo autorizado.
- Informar erros preexistentes que impeçam a validação.

### Build

- Executar a compilação quando ela fizer parte dos critérios de aceitação ou quando a mudança puder afetá-la.
- Investigar falhas antes de atribuí-las ao ambiente.
- Não alterar configuração ou dependências para contornar uma falha sem aprovação.
- Registrar o resultado e qualquer limitação.

### Testes

- Testar comportamento observável, não detalhes internos.
- Priorizar fluxos, limites e falhas relevantes.
- Manter testes determinísticos, independentes e legíveis.
- Evitar mocks que reproduzam a própria implementação.
- Adicionar testes somente quando fizerem parte do escopo ou dos critérios aprovados.
- Informar quando não existirem testes aplicáveis ou infraestrutura disponível.

### Revisão de código

- Comparar o resultado com requisito, arquitetura e lista de arquivos autorizados.
- Revisar nomes, tipos, dependências, efeitos e tratamento de erros.
- Verificar acessibilidade e estados de interface quando aplicáveis.
- Confirmar ausência de dados sensíveis e alterações acidentais.
- Revisar o diff completo antes do commit.

### Código morto

- Remover código, imports, tipos, recursos e comentários sem uso quando a remoção pertencer ao escopo.
- Confirmar referências antes de remover.
- Não manter implementações antigas comentadas.
- Utilizar o histórico de versão, e não o código-fonte, para preservar versões anteriores.
- Não expandir uma tarefa apenas para limpar código não relacionado.

## Segurança

Segurança deve ser considerada em todas as fronteiras e não apenas após a implementação.

### Segredos

- Nunca incluir segredos, chaves, tokens ou credenciais no código, documentação, logs ou repositório.
- Não utilizar valores reais como exemplos.
- Revogar e comunicar imediatamente qualquer segredo exposto.
- Limitar acesso ao menor contexto necessário.

### Variáveis de ambiente

- Utilizar variáveis de ambiente apenas quando houver configuração aprovada.
- Validar presença e formato de valores obrigatórios.
- Manter valores sensíveis exclusivamente no servidor.
- Não expor uma variável ao cliente por conveniência.
- Documentar finalidade sem registrar o valor real.
- Não criar arquivos de ambiente ou exemplos sem autorização.

### Validação de entrada

- Tratar toda entrada externa como não confiável.
- Validar forma, tipo, tamanho e restrições relevantes na fronteira adequada.
- Revalidar no servidor decisões que afetem segurança ou dados.
- Normalizar somente quando a transformação for prevista.
- Não confiar apenas em validação visual ou do cliente.

### Dados sensíveis

- Coletar, processar e transmitir somente o necessário.
- Evitar persistência e duplicação sem finalidade aprovada.
- Restringir acesso por responsabilidade.
- Não incluir dados sensíveis em URLs, mensagens de erro ou telemetria.
- Aplicar proteção adequada durante trânsito e armazenamento quando essas capacidades existirem.
- Definir descarte e retenção conforme requisitos documentados.

## Evolução

Este guia pode evoluir quando o projeto demonstrar uma necessidade recorrente que não esteja adequadamente coberta. Novas convenções devem melhorar clareza e consistência sem introduzir complexidade preventiva.

Uma alteração deste guia deve:

- partir de um problema real;
- permanecer genérica e reutilizável;
- respeitar princípios e arquitetura;
- explicar impacto sobre o código existente;
- evitar criar dois padrões concorrentes;
- considerar migração quando houver incompatibilidade;
- ser revisada e aprovada antes de entrar em vigor.

Ferramentas automáticas devem refletir convenções aprovadas, mas sua adoção não é autorizada por este documento. Alterar formatadores, linters, compiladores ou outras configurações exige Sprint e aprovação explícitas.

Exceções devem ser documentadas, específicas e temporárias quando possível. Uma exceção local não modifica automaticamente a regra permanente.

O guia deve evoluir por aprendizado validado, preservando clareza, simplicidade e manutenção fácil.
