# Nome do Serviço

**Nome:** `[nome da capacidade seguido de Service]`

**Categoria:** `[aplicação | domínio | infraestrutura | compartilhado]`

**Status:** `[proposto | em revisão | aprovado | disponível | descontinuado]`

**Responsável:** `[pessoa ou papel responsável]`

**Última revisão:** `[data ou versão]`

Identifique o serviço pela capacidade oferecida, sem incorporar fornecedor, protocolo ou produto ao nome. Um serviço reutilizável deve representar uma responsabilidade clara e possuir uso atual ou necessidade comprovada de substituição.

Este documento descreve o contrato esperado do serviço. Ele não autoriza implementação, integração, dependência, configuração ou acesso externo.

# Objetivo

Explique por que o serviço existe, qual capacidade oferece e qual benefício produz para seus consumidores.

`[Descrever o objetivo do serviço em um parágrafo.]`

O objetivo deve:

- corresponder a uma necessidade atual e aprovada;
- definir um único propósito predominante;
- permanecer independente de detalhes substituíveis;
- esclarecer por que a responsabilidade merece uma fronteira própria;
- permitir avaliação objetiva do resultado.

Se uma operação simples puder permanecer com clareza na camada consumidora, registre essa decisão em vez de criar uma abstração preventiva.

# Responsabilidades

Liste somente responsabilidades pertencentes ao serviço.

- `[Executar uma capacidade claramente delimitada.]`
- `[Validar entradas na fronteira sob sua responsabilidade.]`
- `[Traduzir respostas e falhas para o contrato interno.]`
- `[Preservar invariantes próprias da capacidade.]`

O serviço deve:

- possuir uma responsabilidade predominante;
- expor entradas, saídas e falhas compreensíveis;
- manter detalhes de infraestrutura fora do contrato interno;
- receber dependências de forma explícita;
- evitar estado global oculto;
- permanecer verificável sem acesso obrigatório a recursos reais.

# Escopo

Defina as operações, contextos e comportamentos aprovados.

- **Capacidade principal:** `[resultado oferecido]`
- **Operações autorizadas:** `[operações incluídas]`
- **Consumidores aprovados:** `[camadas ou capacidades consumidoras]`
- **Dados aceitos:** `[categorias de dados necessárias]`
- **Limites operacionais:** `[volume, frequência, tamanho ou duração]`
- **Fronteiras:** `[onde começa e termina a responsabilidade]`

O escopo deve representar o menor contrato capaz de atender aos casos atuais. Variações futuras não devem gerar métodos, parâmetros ou configurações antecipadas.

# Fora do Escopo

Registre responsabilidades que não pertencem ao serviço.

- `[Decisão que pertence ao consumidor.]`
- `[Regra específica de outro domínio.]`
- `[Apresentação ou interação de interface.]`
- `[Persistência ou integração não necessária à capacidade.]`
- `[Operação futura ainda não aprovada.]`

Itens fora do escopo podem ser propostos separadamente, mas não devem ser incorporados silenciosamente à interface pública.

# Interface Pública

Descreva tudo o que consumidores podem invocar ou observar.

| Elemento público | Finalidade | Consumidor | Estabilidade |
| --- | --- | --- | --- |
| `[método, contrato ou capacidade]` | `[resultado oferecido]` | `[camada ou responsabilidade consumidora]` | `[estável | experimental | em transição]` |

A interface pública deve:

- ser pequena, explícita e orientada à necessidade do consumidor;
- ocultar detalhes internos e respostas de fornecedores;
- utilizar conceitos estáveis da aplicação;
- impedir estados e combinações inválidas quando possível;
- manter falhas previsíveis;
- permitir substituição quando a arquitetura exigir;
- evoluir com compatibilidade ou transição documentada.

Alterações incompatíveis exigem justificativa, avaliação dos consumidores afetados, plano de transição e aprovação.

# Métodos

Liste somente métodos necessários aos casos de uso aprovados.

| ID | Método | Responsabilidade | Execução | Efeitos observáveis |
| --- | --- | --- | --- | --- |
| `MET-01` | `[nome orientado à ação]` | `[uma operação específica]` | `[síncrona | assíncrona]` | `[alteração, comunicação ou nenhum efeito externo]` |

Para cada método:

- use nome que revele intenção;
- mantenha uma única responsabilidade;
- declare pré-condições e efeitos;
- diferencie consulta de alteração;
- evite parâmetros ou opções para cenários hipotéticos;
- não exponha operações próprias de fornecedor;
- documente repetição segura, cancelamento e concorrência quando aplicáveis.

# Parâmetros

Documente as entradas de cada método.

| Método | Parâmetro | Obrigatório | Tipo conceitual | Validação | Sensibilidade |
| --- | --- | --- | --- | --- | --- |
| `MET-01` | `[nome]` | `[sim | não]` | `[identificador, conteúdo, opção ou outro]` | `[formato, intervalo ou regra]` | `[público | interno | pessoal | sensível]` |

Os parâmetros devem:

- conter somente dados necessários;
- possuir nomes e significado inequívocos;
- ser validados na fronteira apropriada;
- diferenciar ausência válida de valor inválido;
- evitar objetos amplos quando poucos campos forem utilizados;
- não incluir credenciais quando elas puderem ser fornecidas por configuração segura;
- declarar limites de tamanho, formato e frequência quando relevantes.

# Retornos

Documente os resultados públicos de cada método.

| Método | Resultado | Condição | Dados retornados | Ausência válida |
| --- | --- | --- | --- | --- |
| `MET-01` | `[nome conceitual do resultado]` | `[quando é produzido]` | `[dados mínimos e significado]` | `[como é representada ou não aplicável]` |

Os retornos devem:

- utilizar conceitos internos estáveis;
- fornecer somente dados necessários ao consumidor;
- distinguir sucesso, ausência válida e falha;
- não expor respostas brutas, metadados internos ou informações sensíveis;
- possuir significado consistente entre implementações substituíveis;
- documentar ordenação, paginação, precisão ou validade quando aplicáveis.

# Regras de Negócio

Liste apenas regras que pertencem legitimamente à capacidade representada pelo serviço.

| ID | Regra | Origem | Métodos afetados | Como verificar |
| --- | --- | --- | --- | --- |
| `RN-01` | `[regra ou invariante]` | `[requisito aprovado]` | `[MET-XX]` | `[teste ou evidência]` |

Regras específicas de outro domínio devem permanecer em sua camada de origem. O serviço não deve:

- inventar políticas por conveniência técnica;
- duplicar validações sem responsabilidade clara;
- ocultar decisões de produto em valores padrão;
- transformar limitações de fornecedor em regras permanentes;
- misturar autorização, apresentação ou coordenação sem necessidade.

Quando não houver regras próprias, registre **não aplicável**.

# Dependências

Liste somente dependências necessárias e aprovadas.

| Dependência | Finalidade | Tipo | Obrigatória | Estratégia de substituição |
| --- | --- | --- | --- | --- |
| `[contrato, adaptador, repositório ou recurso]` | `[por que é necessário]` | `[interna | externa aprovada]` | `[sim | não]` | `[como preservar o contrato interno]` |

As dependências devem:

- ser recebidas de forma explícita;
- apontar para contratos compatíveis com a direção arquitetural;
- permanecer mínimas;
- evitar ciclos;
- permitir teste sem recurso externo real quando necessário;
- isolar detalhes de fornecedor em adaptadores;
- possuir comportamento conhecido diante de indisponibilidade.

Nenhuma biblioteca, integração ou infraestrutura deve ser adicionada com base apenas nesta seção. Novas dependências exigem Sprint e autorização explícitas.

# Configurações

**Aplicabilidade:** `[aplicável | não aplicável]`

Documente somente configurações atuais e necessárias.

| Configuração | Finalidade | Obrigatória | Ambiente | Sensível | Comportamento quando ausente |
| --- | --- | --- | --- | --- | --- |
| `[nome conceitual]` | `[decisão controlada]` | `[sim | não]` | `[ambientes aplicáveis]` | `[sim | não]` | `[falha clara ou valor seguro aprovado]` |

As configurações devem:

- permanecer explícitas e próximas do adaptador responsável;
- possuir validação antes do uso;
- evitar valores preventivos sem consumidor;
- manter segredos e credenciais fora do repositório;
- limitar dados sensíveis ao ambiente apropriado;
- documentar diferenças relevantes entre ambientes;
- falhar de forma clara quando um valor essencial estiver ausente;
- evitar leitura dispersa da mesma configuração.

A documentação de uma configuração não autoriza criar variável, arquivo, script ou mecanismo de configuração.

# Tratamento de Erros

Defina falhas previsíveis e sua tradução para o contrato interno.

| Código conceitual | Situação | Origem | Recuperável | Tratamento | Exposição ao consumidor |
| --- | --- | --- | --- | --- | --- |
| `[ERRO_01]` | `[condição de falha]` | `[validação, dependência ou operação]` | `[sim | não]` | `[repetir, transformar, compensar ou propagar]` | `[mensagem ou estado seguro]` |

O serviço deve:

- diferenciar falha esperada de defeito inesperado;
- validar entradas nas fronteiras de confiança;
- preservar a causa quando transformar um erro;
- adicionar contexto útil sem duplicar registros;
- não capturar erros sem recuperar, transformar ou propagar;
- não substituir falhas por valores ambíguos;
- não expor mensagens externas, credenciais, dados sensíveis ou detalhes internos;
- definir repetição, espera, cancelamento e compensação quando aplicáveis;
- evitar repetição automática de operações que possam duplicar efeitos.

# Logs

**Aplicabilidade:** `[aplicável | não aplicável]`

Documente eventos necessários para diagnóstico, operação ou auditoria.

| Evento | Nível | Finalidade | Contexto permitido | Retenção ou destino |
| --- | --- | --- | --- | --- |
| `[operação iniciada, concluída ou falhou]` | `[informativo | atenção | erro]` | `[diagnóstico, operação ou auditoria]` | `[identificadores não sensíveis e resultado]` | `[política aplicável]` |

Os logs devem:

- ser objetivos, pesquisáveis e proporcionais;
- registrar contexto e resultado úteis;
- permitir correlação sem depender de dados pessoais;
- ser emitidos pela camada com contexto suficiente;
- evitar duplicação da mesma falha;
- permanecer separados de mensagens apresentadas ao usuário.

Nunca registrar senhas, tokens, chaves, credenciais, cabeçalhos de autenticação, conteúdo sensível ou requisições e respostas completas por padrão. Logs temporários devem ser removidos antes da entrega. Um novo mecanismo de logs exige aprovação.

# Segurança

Documente controles e fronteiras de confiança aplicáveis.

- **Atores autorizados:** `[quem pode solicitar cada operação]`
- **Autenticação esperada:** `[responsabilidade externa ou própria, quando aplicável]`
- **Autorização:** `[permissões verificadas e camada responsável]`
- **Validação de entrada:** `[origem, formato, tamanho e conteúdo]`
- **Dados sensíveis:** `[categorias, minimização e proteção]`
- **Segredos:** `[forma segura de fornecimento e rotação]`
- **Transporte e armazenamento:** `[requisitos confirmados]`
- **Isolamento:** `[limites entre usuários, organizações ou contextos, quando aplicável]`
- **Abuso e limites:** `[controle de frequência, volume ou repetição]`
- **Auditoria:** `[eventos que exigem rastreabilidade]`

O serviço deve operar com o menor acesso necessário, negar comportamentos não autorizados de forma segura e não confiar em dados externos sem validação. Requisitos de privacidade, retenção e exclusão devem acompanhar todo dado pessoal ou sensível.

# Performance

Defina expectativas mensuráveis e proporcionais ao uso real.

| Aspecto | Expectativa | Condição de medição | Limite ou meta |
| --- | --- | --- | --- |
| `[latência, volume, concorrência, memória ou custo]` | `[comportamento esperado]` | `[cenário representativo]` | `[valor aprovado ou hipótese a validar]` |

Registre:

- frequência e volume esperados;
- limites de entrada e saída;
- necessidade de paginação ou processamento em partes;
- concorrência e controle de pressão;
- repetição e tempo máximo de espera;
- cache somente quando houver política de validade e invalidação;
- impacto de dependências indisponíveis ou lentas;
- método de medição e sinais de regressão.

Otimizações devem responder a evidências. Não adicione cache, filas, paralelismo ou infraestrutura para cenários hipotéticos.

# Casos de Uso

Registre contextos reais que justificam o serviço e seu contrato.

| ID | Consumidor | Necessidade | Método | Resultado esperado |
| --- | --- | --- | --- | --- |
| `CU-01` | `[camada ou capacidade consumidora]` | `[problema aprovado]` | `[MET-XX]` | `[resultado observável]` |

Para cada caso de uso, descreva:

1. pré-condições;
2. entrada relevante;
3. operação solicitada;
4. colaboração com dependências;
5. retorno esperado;
6. falhas e recuperação;
7. efeitos observáveis.

Casos hipotéticos não comprovam reutilização e não devem ampliar métodos, parâmetros ou dependências.

# Limitações

Registre restrições conhecidas do contrato ou da operação.

| Limitação | Motivo | Impacto | Orientação ao consumidor | Condição para revisão |
| --- | --- | --- | --- | --- |
| `[restrição]` | `[decisão, capacidade ou dependência]` | `[efeito conhecido]` | `[como utilizar com segurança]` | `[evidência ou necessidade futura]` |

Não use limitações para ocultar defeitos, riscos de segurança ou critérios não atendidos. Limitações externas devem ser traduzidas para conceitos internos e não devem contaminar o contrato sem necessidade.

# Critérios de Aceitação

Defina condições objetivas e relacionadas aos casos de uso aprovados.

- **CA-01 — Responsabilidade:** `[o serviço possui uma capacidade coesa e limites claros]`
- **CA-02 — Contrato:** `[métodos, parâmetros, retornos e falhas são pequenos e previsíveis]`
- **CA-03 — Substituição:** `[detalhes externos permanecem isolados e substituíveis]`
- **CA-04 — Regras:** `[invariantes aplicáveis são respeitadas e verificáveis]`
- **CA-05 — Erros:** `[falhas previstas possuem tradução e recuperação definidas]`
- **CA-06 — Segurança:** `[entradas, permissões, segredos e dados são tratados adequadamente]`
- **CA-07 — Operação:** `[logs e limites de performance aplicáveis foram validados]`
- **CA-08 — Qualidade:** `[testes e verificações aplicáveis foram concluídos]`
- **CA-09 — Escopo:** `[não foram introduzidas operações, dependências ou configurações não autorizadas]`

Cada critério deve ser adaptado ao serviço e possuir evidência. Na entrega, informe seu estado como **atendido**, **não atendido**, **pendente** ou **não verificável**.

# Checklist Técnico

Preencha o checklist antes de considerar o serviço tecnicamente concluído.

- [ ] **Escopo:** responsabilidade, consumidores e casos de uso estão aprovados.
- [ ] **Interface pública:** o contrato é pequeno, estável e não expõe detalhes substituíveis.
- [ ] **Métodos:** cada operação possui responsabilidade, efeitos e condições definidos.
- [ ] **Parâmetros:** entradas são mínimas, tipadas e validadas.
- [ ] **Retornos:** sucesso, ausência válida e falha são inequívocos.
- [ ] **Regras de negócio:** somente invariantes pertencentes à capacidade estão presentes.
- [ ] **Dependências:** são explícitas, direcionadas e substituíveis quando necessário.
- [ ] **Configurações:** são mínimas, validadas e autorizadas.
- [ ] **Erros:** causas, contexto, repetição e recuperação foram verificados.
- [ ] **Logs:** são úteis e não contêm segredos ou dados sensíveis.
- [ ] **Segurança:** permissões, fronteiras de confiança e minimização de dados foram revisadas.
- [ ] **Performance:** limites relevantes foram medidos ou declarados como pendentes.
- [ ] **Lint:** executado com sucesso ou declarado não aplicável ou indisponível.
- [ ] **Typecheck:** executado com sucesso ou declarado não aplicável ou indisponível.
- [ ] **Build:** executado com sucesso ou declarado não aplicável ou indisponível.
- [ ] **Testes:** comportamento principal, limites e falhas aplicáveis foram verificados.
- [ ] **Documentação:** contrato, decisões e limitações estão sincronizados.
- [ ] **Repositório:** somente arquivos e mudanças autorizados foram afetados.

As verificações devem utilizar ferramentas já aprovadas. Não instale dependências nem altere configurações apenas para completar o checklist. Falhas e validações indisponíveis devem ser relatadas.

# Histórico de Revisões

Registre mudanças de responsabilidade, contrato, comportamento e operação.

| Versão ou data | Alteração | Compatibilidade | Consumidores afetados | Responsável | Aprovação |
| --- | --- | --- | --- | --- | --- |
| `[identificador]` | `[resumo e motivação]` | `[compatível | exige transição]` | `[consumidores]` | `[pessoa ou papel]` | `[pendente | aprovada]` |

Uma mudança incompatível deve possuir impacto conhecido, estratégia de transição e aprovação. O histórico não substitui a documentação da decisão nem autoriza implementação.

# Observações

Registre somente informações complementares relevantes.

## Decisões aprovadas

- `[decisão, justificativa e impacto]`

## Premissas

- `[hipótese e forma de validação]`

## Questões em aberto

- `[decisão pendente e seu impacto]`

## Referências internas

- `[requisito, Sprint ou documento relacionado]`

Observações não devem ampliar o contrato, criar exceções informais ou substituir escopo, critérios e aprovação. Propostas futuras permanecem fora da implementação até serem documentadas e autorizadas.
