# Nome do Produto

**Nome:** `[nome do produto]`

**Descrição curta:** `[proposta de valor em uma frase]`

**Responsável:** `[pessoa ou papel responsável pelas decisões]`

**Status:** `[rascunho | em revisão | aprovado | ativo | descontinuado]`

**Versão do documento:** `[versão ou data da revisão]`

Identifique o produto de forma clara e neutra. O nome e a descrição devem comunicar a finalidade sem prometer funcionalidades ainda não aprovadas.

Este documento especifica o produto construído sobre o Starter Kit. Ele deve detalhar necessidades próprias do produto sem alterar silenciosamente os princípios, a arquitetura ou os limites da fundação. A aprovação desta especificação não substitui o planejamento e a autorização das Sprints.

# Visão

Descreva o estado futuro que o produto pretende viabilizar, o valor que oferecerá e a transformação esperada para seu público.

`[Descrever a visão do produto em um ou dois parágrafos.]`

A visão deve:

- orientar decisões de longo prazo;
- permanecer centrada no problema e no valor entregue;
- evitar detalhes prematuros de implementação;
- ser compatível com os princípios permanentes do projeto;
- permitir que propostas fora da direção sejam identificadas.

# Problema

Explique o problema real que justifica o produto.

- **Situação atual:** `[como o público lida com o problema hoje]`
- **Dificuldade principal:** `[obstáculo ou necessidade não atendida]`
- **Impacto:** `[consequências para o público ou para o negócio]`
- **Alternativas existentes:** `[soluções atuais e suas limitações]`
- **Evidências:** `[pesquisa, observação, dados ou hipótese a validar]`

Diferencie fatos confirmados de hipóteses. Não apresente uma solução desejada como se fosse evidência do problema.

# Público-alvo

Defina quem possui o problema e quem utilizará, comprará, administrará ou será afetado pelo produto.

| Segmento | Necessidade | Contexto de uso | Papel na decisão |
| --- | --- | --- | --- |
| `[segmento principal]` | `[necessidade relevante]` | `[quando e como usa]` | `[usuário, comprador, administrador ou outro]` |

Inclua critérios de inclusão e, quando necessário, públicos que não serão atendidos inicialmente. Evite perfis genéricos que não ajudem a priorizar requisitos.

# Objetivos

Liste resultados concretos que aproximem o produto de sua visão e resolvam o problema descrito.

- **OBJ-01 — `[nome do objetivo]`:** `[resultado esperado e prazo ou condição de avaliação]`
- **OBJ-02 — `[nome do objetivo]`:** `[resultado esperado e prazo ou condição de avaliação]`

Os objetivos devem ser mensuráveis quando possível, priorizados e relacionados aos critérios de sucesso. Atividades, entregas técnicas e funcionalidades não devem substituir resultados de produto.

# Funcionalidades

Registre somente capacidades aprovadas para o produto atual.

| ID | Funcionalidade | Valor para o público | Prioridade | Estado |
| --- | --- | --- | --- | --- |
| `FUN-01` | `[capacidade do produto]` | `[problema ou necessidade atendida]` | `[essencial | importante | opcional]` | `[proposta | aprovada | entregue]` |

Para cada funcionalidade:

- descreva o resultado percebido pelo usuário;
- relacione-a a um objetivo e a requisitos funcionais;
- declare limites, permissões e estados relevantes;
- evite combinar capacidades independentes no mesmo item;
- não presuma integrações, dependências ou arquitetura ainda não aprovadas.

# Funcionalidades futuras

Registre possibilidades que podem ser avaliadas depois, sem incorporá-las ao escopo atual.

| Proposta | Motivação | Condição para avaliação | Estado |
| --- | --- | --- | --- |
| `[funcionalidade futura]` | `[valor potencial]` | `[evidência, dependência ou marco necessário]` | `[ideia | em descoberta | descartada]` |

Uma funcionalidade futura não está autorizada para implementação. Antes de ser promovida ao escopo atual, ela deve ser validada, priorizada, documentada e aprovada em uma Sprint.

# Requisitos funcionais

Defina comportamentos observáveis necessários para as funcionalidades aprovadas.

- **RF-01 — `[nome do requisito]`:** `[o que o sistema deve permitir ou realizar]`
  - **Origem:** `[FUN-XX, objetivo ou necessidade relacionada]`
  - **Atores:** `[quem participa]`
  - **Condições:** `[pré-condições e permissões]`
  - **Resultado esperado:** `[estado ou resposta observável]`
  - **Exceções relevantes:** `[falhas e limites previstos]`

Cada requisito funcional deve ser claro, testável, necessário e independente de uma solução técnica não aprovada. Critérios detalhados de implementação pertencem à Sprint correspondente.

# Requisitos não funcionais

Defina atributos de qualidade e restrições mensuráveis aplicáveis ao produto.

| ID | Categoria | Requisito | Como verificar |
| --- | --- | --- | --- |
| `RNF-01` | `[segurança, desempenho, acessibilidade, privacidade, confiabilidade ou outra]` | `[resultado ou limite esperado]` | `[métrica, teste ou inspeção]` |

Considere, quando aplicável:

- segurança e proteção de dados;
- privacidade, retenção e exclusão;
- disponibilidade e recuperação;
- desempenho e capacidade;
- acessibilidade;
- responsividade;
- compatibilidade;
- observabilidade;
- manutenibilidade;
- requisitos legais ou regulatórios confirmados.

Evite expressões subjetivas sem parâmetro de validação. Requisitos ainda desconhecidos devem ser identificados como pendências, não inventados.

# Arquitetura específica do produto

Descreva somente as responsabilidades e decisões arquiteturais adicionais exigidas pelo produto. A arquitetura oficial do Starter Kit continua sendo a base.

- **Contextos ou módulos:** `[responsabilidades específicas necessárias]`
- **Fluxos entre camadas:** `[como as responsabilidades se comunicam]`
- **Limites do domínio:** `[regras que pertencem exclusivamente ao produto]`
- **Decisões aprovadas:** `[decisão, justificativa e impacto]`
- **Restrições:** `[limites técnicos ou operacionais]`
- **Pendências:** `[decisões que ainda exigem análise ou aprovação]`

Inclua um novo módulo, serviço ou camada somente quando existir uma necessidade atual. Mudanças na arquitetura compartilhada devem ser propostas separadamente, avaliadas quanto ao impacto sobre outros produtos e aprovadas antes da implementação.

# Fluxo do usuário

Descreva as jornadas essenciais do ponto de vista do usuário, incluindo início, resultado esperado e situações alternativas.

## Fluxo principal

1. `[Ponto de entrada e intenção do usuário.]`
2. `[Ação ou decisão necessária.]`
3. `[Resposta do sistema.]`
4. `[Resultado percebido pelo usuário.]`

## Estados alternativos

- **Carregamento:** `[como o progresso será comunicado]`
- **Estado vazio:** `[orientação oferecida quando não houver conteúdo]`
- **Erro:** `[falha prevista e forma de recuperação]`
- **Sucesso:** `[confirmação e próxima ação disponível]`
- **Permissão insuficiente:** `[comportamento, quando aplicável]`

Considere continuidade entre dispositivos, navegação por teclado e uso com tecnologias assistivas quando forem relevantes ao fluxo.

# Banco de dados

**Aplicabilidade:** `[aplicável | não aplicável | pendente de decisão]`

Quando houver necessidade aprovada de persistência, descreva o modelo conceitual sem antecipar implementação:

| Entidade | Finalidade | Dados principais | Relações | Sensibilidade |
| --- | --- | --- | --- | --- |
| `[entidade]` | `[por que existe]` | `[categorias de dados]` | `[relações conceituais]` | `[pública, interna, pessoal ou sensível]` |

Registre também:

- responsável por cada categoria de dado;
- origem e finalidade da coleta;
- regras de acesso e isolamento;
- retenção, exportação e exclusão;
- requisitos de integridade e auditoria;
- volume e crescimento esperados;
- migração, recuperação e continuidade;
- restrições legais ou de privacidade confirmadas.

A existência desta seção não autoriza banco de dados, provedor, esquema, migração ou dependência. Quando persistência não for necessária, registre **não aplicável** e a justificativa.

# Integrações

**Aplicabilidade:** `[aplicável | não aplicável | pendente de decisão]`

Liste apenas integrações necessárias ou propostas de forma explícita.

| Integração | Finalidade | Dados envolvidos | Direção | Criticidade | Estado |
| --- | --- | --- | --- | --- | --- |
| `[serviço ou categoria]` | `[valor entregue]` | `[dados enviados ou recebidos]` | `[entrada | saída | bidirecional]` | `[baixa | média | alta]` | `[proposta | aprovada | ativa]` |

Para cada integração aplicável, documente autenticação, permissões, limites, custos, disponibilidade, tratamento de falhas, repetição segura, privacidade, monitoramento e alternativa de substituição.

Nenhuma integração, credencial, dependência ou configuração deve ser criada sem Sprint e autorização específicas.

# IA (quando existir)

**Aplicabilidade:** `[aplicável | não aplicável | pendente de decisão]`

Quando o produto possuir uma necessidade aprovada de inteligência artificial, documente:

- problema específico que a capacidade resolve;
- benefício em relação a uma solução determinística;
- entradas permitidas e origem dos dados;
- saída esperada e seus limites;
- necessidade de revisão ou confirmação humana;
- comportamento diante de resultados incorretos ou indisponíveis;
- privacidade, consentimento, retenção e uso de dados;
- riscos de conteúdo, viés, segurança e uso indevido;
- critérios de qualidade e método de avaliação;
- limites de custo, latência e capacidade;
- estratégia de substituição do provedor;
- comunicação transparente ao usuário.

Não trate resultados probabilísticos como fatos garantidos. A menção de uma capacidade nesta seção não autoriza provedor, modelo, envio de dados, dependência ou implementação. Quando não houver necessidade concreta, registre **não aplicável**.

# Monetização

**Aplicabilidade:** `[aplicável | não aplicável | pendente de decisão]`

Descreva como o produto pretende capturar valor, sem vincular antecipadamente a estratégia a um fornecedor.

- **Modelo:** `[assinatura, uso, licença, gratuito, híbrido ou outro]`
- **Unidade de valor:** `[o que fundamenta a cobrança]`
- **Planos ou níveis:** `[diferenças de acesso e limites]`
- **Período de avaliação:** `[quando aplicável]`
- **Regras de elegibilidade:** `[quem pode contratar ou alterar o plano]`
- **Cancelamento e reembolso:** `[princípios aplicáveis]`
- **Impostos e documentos:** `[necessidades confirmadas ou pendentes]`
- **Hipóteses a validar:** `[preço, disposição de pagamento ou conversão]`

Funcionalidades essenciais não devem ser separadas arbitrariamente apenas para formar planos. Pagamentos, faturamento e fornecedores exigem especificação, avaliação de risco e autorização próprias.

# Roadmap

Organize a evolução do produto em fases de alto nível, orientadas por resultados e aprendizado.

| Fase | Objetivo | Resultado esperado | Critério para iniciar | Critério para concluir |
| --- | --- | --- | --- | --- |
| `[fase]` | `[necessidade priorizada]` | `[capacidade ou evidência obtida]` | `[pré-condições]` | `[condições verificáveis]` |

O roadmap:

- representa direção, não autorização de implementação;
- deve respeitar o roadmap e os princípios da fundação;
- deve evoluir por Sprints pequenas e aprovadas;
- pode mudar conforme evidências e prioridades;
- não deve fixar detalhes técnicos antes da necessidade;
- deve separar compromissos aprovados de possibilidades futuras.

# Riscos

Registre riscos de produto, técnicos, operacionais, financeiros, legais e de adoção.

| Risco | Probabilidade | Impacto | Mitigação | Responsável |
| --- | --- | --- | --- | --- |
| `[descrição]` | `[baixa | média | alta]` | `[efeito possível]` | `[ação preventiva ou resposta]` | `[pessoa ou papel]` |

Inclua riscos decorrentes de hipóteses não validadas, dados sensíveis, dependências externas, segurança, acessibilidade, custos, escalabilidade e mudanças regulatórias quando forem aplicáveis.

# Critérios de sucesso

Defina as condições que demonstram que o produto entrega valor e opera dentro dos limites esperados.

- **CS-01 — `[resultado de sucesso]`:** `[condição objetiva e período de avaliação]`
- **CS-02 — `[resultado de qualidade ou confiabilidade]`:** `[condição objetiva]`

Os critérios devem:

- estar relacionados à visão, ao problema e aos objetivos;
- combinar valor para o público e sustentabilidade do produto;
- possuir evidência verificável;
- evitar métricas de vaidade;
- incluir limites de qualidade, segurança ou satisfação quando relevantes;
- indicar quando uma hipótese deve ser revista.

# Métricas

Defina apenas métricas necessárias para acompanhar objetivos, critérios de sucesso e riscos.

| Métrica | Definição | Fonte | Linha de base | Meta | Período |
| --- | --- | --- | --- | --- | --- |
| `[nome]` | `[cálculo e interpretação]` | `[origem dos dados]` | `[valor atual ou desconhecido]` | `[valor esperado]` | `[janela de avaliação]` |

Para cada métrica:

- descreva o que ela permite decidir;
- mantenha uma definição estável;
- identifique limitações e possíveis distorções;
- colete somente os dados necessários;
- respeite privacidade, consentimento e retenção;
- defina responsável e frequência de revisão;
- não adicione ferramentas de análise sem autorização.

# Observações

Registre informações complementares que ajudem a interpretar ou revisar esta especificação.

## Decisões aprovadas

- `[decisão, justificativa, responsável e data]`

## Premissas

- `[hipótese assumida temporariamente e como será validada]`

## Questões em aberto

- `[questão, impacto e decisão necessária]`

## Limitações conhecidas

- `[limitação atual e consequência]`

## Histórico de revisão

| Versão ou data | Alteração | Responsável | Aprovação |
| --- | --- | --- | --- |
| `[identificador]` | `[resumo da mudança]` | `[pessoa ou papel]` | `[pendente | aprovada]` |

Observações não substituem requisitos, critérios ou aprovações. Qualquer mudança material de escopo deve ser incorporada à seção correta, revisada quanto aos impactos e aprovada antes de orientar uma Sprint.
