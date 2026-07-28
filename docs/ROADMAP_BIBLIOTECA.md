# Roadmap Oficial da Biblioteca DocAI

**Status:** planejamento oficial da evolução da biblioteca  
**Origem:** Sprint 14.1, baseada na pesquisa aprovada da Sprint 14  
**Natureza:** diretriz de produto; não autoriza implementação  
**Data de consolidação:** 28 de julho de 2026

## 1. Responsabilidade deste roadmap

Este documento define a estratégia e a ordem de evolução da biblioteca. Ele não autoriza código, `ContractDefinition`, schema, catálogo, componente, dependência, integração, publicação ou nova Sprint.

Cada fase exige pesquisa, especificação, aprovação e validação próprias. Candidatos listados fora da Fase 1 são hipóteses de portfólio, não contratos aprovados.

Visão, proposta de valor, público-alvo, posicionamento e funcionalidades pertencem exclusivamente a [`PRODUCT_SPEC.md`](../PRODUCT_SPEC.md). Arquitetura pertence exclusivamente a [`ARCHITECTURE.md`](../ARCHITECTURE.md). Regras de desenvolvimento e colaboração pertencem exclusivamente a [`AGENTS.md`](../AGENTS.md).

## 2. Contexto de aplicação

A filosofia, os critérios e as regras de evolução da biblioteca estão definidos uma única vez nas seções 5 a 10 deste documento. O contexto geral do produto deve ser consultado no `PRODUCT_SPEC.md`.

## 3. Categorias oficiais e ordem de evolução

A ordem abaixo representa prioridade de produto, não necessariamente a ordem visual atual do catálogo. Alterar o catálogo depende de Sprint própria.

| Ordem | Categoria | Por que existe | Público principal | Prioridade | Potencial de receita |
| --- | --- | --- | --- | --- | --- |
| 1 | Contratos Gerais | Resolve problemas horizontais do ciclo de prestação de serviços e cria a base reutilizável da biblioteca. | Todo o público-alvo. | Imediata | Muito alto: grande abrangência, recorrência e entrada para documentos relacionados. |
| 2 | Serviços Gerais | Atende serviços locais frequentes, com escopo, acesso ao local, materiais, garantia e aceite próprios. | Limpeza, manutenção, assistência, frete, mudanças e serviços domésticos ou empresariais. | Muito alta | Alto: mercado amplo, recorrência e aquisição por buscas específicas. |
| 3 | Construção | Organiza atividades de maior ticket e risco material, nas quais escopo e mudanças geram conflitos relevantes. | Profissionais de obra, reformas, instalações, clientes residenciais e pequenas construtoras. | Muito alta | Muito alto: maior exposição financeira e disposição a pagar. |
| 4 | Tecnologia | Trata entregas digitais, requisitos, homologação, suporte, acesso e propriedade intelectual. | Desenvolvedores, agências, consultorias de TI, startups e pequenas empresas. | Muito alta | Muito alto: tickets maiores, recorrência e forte valor de proteção de escopo. |
| 5 | Marketing | Estrutura serviços recorrentes, entregas mensais, acesso a contas, métricas e limites sobre resultados. | Social media, gestores de tráfego, SEO, redatores, agências e clientes. | Alta | Alto: contratos recorrentes e grande base de prestadores digitais. |
| 6 | Design e Criativos | Define revisões, arquivos finais, créditos, portfólio e direitos de uso em projetos criativos. | Designers, fotógrafos, videomakers, editores e produtores. | Alta | Alto: dor clara sobre revisões e propriedade intelectual. |
| 7 | Consultoria | Separa diagnóstico, recomendação, execução e responsabilidade por decisões do cliente. | Consultores empresariais, financeiros, comerciais, RH e especialistas. | Alta, com triagem jurídica | Alto: tickets e valor percebido elevados, embora com maior especialização. |
| 8 | Eventos | Organiza data crítica, fornecedores, montagem, cancelamento, substituição e responsabilidades. | DJs, bandas, buffets, cerimonialistas, decoradores e produtores. | Média/alta | Alto em eventos de maior ticket e sazonalidade. |
| 9 | Educação | Define conteúdo, formato, agenda, reposição, acesso e materiais sem prometer resultado de aprendizagem. | Professores, mentores, instrutores e produtores de cursos. | Média | Médio/alto: grande reutilização, mas tickets variados. |
| 10 | Saúde | Trata prestação profissional com regras éticas, regulatórias, privacidade e segurança específicas. | Profissionais de saúde e bem-estar autorizados em suas áreas. | Posterior e condicionada | Alto em segmentos específicos, acompanhado de alta complexidade jurídica e reputacional. |

## 4. Fases de evolução da biblioteca

## Fase 1 — Contratos Gerais

### Objetivo

Estabelecer a base da biblioteca com documentos horizontais, reutilizáveis e capazes de cobrir o ciclo principal de um serviço.

### Contratos aprovados

1. **Contrato de Prestação de Serviços** — formaliza escopo, entregas, pagamento, responsabilidades e cancelamento.
2. **Proposta Comercial com Aceite** — ajuda a fechar o serviço com oferta, preço, validade e aceite claros.
3. **Termo de Alteração de Escopo** — registra trabalho adicional ou mudança de preço e prazo.
4. **Termo de Entrega e Aceite** — comprova entrega, ressalvas e pendências sem presumir quitação geral.
5. **Acordo de Confidencialidade** — nome comercial: **Acordo de Sigilo (NDA)**; protege informações na negociação e na execução.

### Por que começar por esta fase

- atende praticamente todos os públicos do DocAI;
- cria uma jornada integrada: proposta → contrato → alteração → entrega;
- adiciona o NDA como entrada pré-contratual independente;
- oferece a maior reutilização de dados entre documentos;
- permite validar conversão, abandono, tempo de preenchimento e retorno do usuário antes de ampliar o catálogo.

### Backlog controlado da categoria

Os seguintes candidatos não pertencem à implementação inicial e somente poderão avançar com nova aprovação:

- importantes: Distrato de Contrato; Acordo de Reconhecimento e Parcelamento de Dívida; Compra e Venda de Bem Móvel;
- complementares: Licença ou Cessão de Direitos Autorais; Recibo de Pagamento;
- não priorizados inicialmente: Fornecimento de Produtos e variantes separadas de Freelancer ou Consultoria.

## Fase 2 — Serviços Gerais

### Objetivo

Atender serviços locais e operacionais nos quais local, acesso, materiais, condições prévias, danos, descarte, deslocamento e garantia prática precisam ser definidos.

### Candidatos previstos

- Limpeza;
- Dedetização;
- Mudanças;
- Frete;
- Chaveiro;
- Assistência Técnica.

### Direção de produto

Priorizar primeiro os modelos com maior recorrência, risco patrimonial e capacidade de reutilizar a Prestação de Serviços. A pesquisa da fase deve verificar se Limpeza, Assistência Técnica e Mudanças formam o primeiro lote ou se outro conjunto apresenta evidência superior.

## Fase 3 — Construção

### Objetivo

Reduzir conflitos de alto impacto relacionados a escopo físico, medição, materiais, preparação, alterações, segurança, cronograma, aceite e garantia.

### Candidatos previstos

- Pintura;
- Reforma;
- Elétrica;
- Encanamento;
- Gesso;
- Drywall;
- Piso;
- Jardinagem;
- Limpeza Pós-Obra.

### Direção de produto

Reforma não deve funcionar como modelo excessivamente genérico. A pesquisa deve comparar amplitude e complexidade e selecionar poucos contratos com escopo reconhecível. Atividades técnicas ou sujeitas a responsabilidade profissional exigem revisão especializada.

## Fase 4 — Tecnologia

### Objetivo

Organizar projetos e serviços digitais com requisitos, entregas, homologação, acesso, dados, suporte, manutenção e direitos de uso.

### Candidatos previstos

- Desenvolvimento de Software;
- Desenvolvimento de Site;
- Desenvolvimento de E-commerce;
- Desenvolvimento de Aplicativo;
- Suporte Técnico;
- Manutenção;
- Consultoria de TI.

### Direção de produto

Evitar contratos duplicados apenas pelo canal de entrega. Site, software, e-commerce e aplicativo somente devem permanecer separados quando as perguntas e riscos específicos justificarem definições diferentes. Proteção de dados, código-fonte, componentes de terceiros e níveis de serviço exigem tratamento próprio.

## Fase 5 — Marketing

### Objetivo

Definir entregas recorrentes, calendário, aprovações, orçamento de mídia, acesso a contas, uso de marca e ausência de garantia de resultado comercial.

### Candidatos previstos

- Social Media;
- Gestão de Tráfego;
- SEO;
- Copywriting;
- Branding;
- Produção de Conteúdo.

### Direção de produto

Priorizar contratos recorrentes e com risco claro de expectativa de resultado. Branding deve ser comparado com a categoria criativa para evitar duplicação. Gestão de Tráfego deve distinguir remuneração do prestador e verba de mídia.

## Fase 6 — Design e Criativos

### Objetivo

Controlar escopo, rodadas de revisão, aprovação, arquivos-fonte, formatos finais, crédito, portfólio e direitos de uso.

### Candidatos previstos

- Design Gráfico;
- Identidade Visual;
- Logotipo;
- UX/UI;
- Fotografia;
- Filmagem;
- Motion Design;
- Edição de Vídeo.

### Direção de produto

Validar se Design Gráfico, Identidade Visual e Logotipo exigem definições diferentes ou presets de uma mesma estrutura. Fotografia e Filmagem de Eventos devem pertencer a uma única categoria oficial, evitando duplicação silenciosa entre Criativos e Eventos.

## Fase 7 — Consultoria

### Objetivo

Separar diagnóstico, recomendação, apoio à implementação e decisão do cliente, deixando claros acesso a informações, entregáveis e limites de responsabilidade.

### Candidatos previstos

- Consultoria Empresarial;
- Consultoria Financeira;
- Consultoria Comercial;
- Consultoria de Recursos Humanos;
- Consultoria Contábil;
- Consultoria Ambiental;
- Consultoria Imobiliária.

### Direção de produto

Uma definição especializada somente deve existir se a profissão ou o risco mudar materialmente as perguntas. Consultoria Contábil, Ambiental e Imobiliária podem exigir regras profissionais e regulatórias incompatíveis com um modelo geral de três minutos.

## Fase 8 — Eventos

### Objetivo

Tratar serviços vinculados a data e local determinados, com montagem, horários, fornecedores, substituição, cancelamento e força maior proporcionais.

### Candidatos previstos

- DJ;
- Banda;
- Buffet;
- Cerimonial;
- Decoração;
- Fotografia de Eventos;
- Filmagem de Eventos.

### Direção de produto

Buffet, música, cerimonial e decoração apresentam riscos realmente diferentes. Fotografia e filmagem devem compartilhar a fundação da categoria criativa e ter uma única fonte de verdade, ainda que possam ser encontradas por mais de uma navegação.

## Fase 9 — Educação

### Objetivo

Definir conteúdo, modalidade, agenda, reposição, acesso, materiais, participação e cancelamento sem prometer desempenho acadêmico ou profissional.

### Candidatos previstos

- Professor Particular;
- Mentoria;
- Curso Online;
- Curso Presencial;
- Reforço Escolar.

### Direção de produto

Curso online e presencial somente devem ser separados se entrega, acesso e cancelamento exigirem perguntas diferentes. Relações com consumidores, menores de idade e uso de imagem ou dados precisam de revisão específica.

## Fase 10 — Saúde

### Objetivo

Avaliar documentos de prestação profissional em saúde e bem-estar sem reduzir deveres éticos, consentimento, privacidade, segurança ou regras dos conselhos profissionais.

### Candidatos previstos para pesquisa, não para implementação automática

- Nutricionista;
- Psicólogo;
- Personal Trainer;
- Fisioterapia;
- Massoterapia;
- Pilates.

### Direção de produto

Esta fase exige pesquisa jurídica e profissional própria antes de confirmar se “contrato” é o documento adequado para cada situação. Termos de consentimento, informação e privacidade não devem ser fundidos ao contrato apenas para reduzir quantidade. A categoria só avança quando a Regra dos 3 Minutos for compatível com segurança e dever profissional.

## 5. Critérios obrigatórios para inclusão de um contrato

Um contrato somente pode entrar na biblioteca quando todos os critérios abaixo estiverem demonstrados:

- [ ] resolve um problema real e descrito em situação prática;
- [ ] possui demanda comprovada por fonte externa confiável ou dados internos suficientes;
- [ ] reduz risco jurídico, financeiro, operacional ou de relacionamento relevante;
- [ ] possui valor percebido e disposição plausível a pagar;
- [ ] permite primeiro rascunho pela Regra dos 3 Minutos sem perda jurídica indevida;
- [ ] utiliza linguagem simples durante o preenchimento;
- [ ] possui potencial de reutilização entre profissões ou dentro de segmento economicamente relevante;
- [ ] não duplica contrato, preset ou documento já existente;
- [ ] cabe na arquitetura vigente ou possui mudança arquitetural aprovada separadamente;
- [ ] possui revisão, testes e critérios de aceitação definidos.

### 5.1 Evidência mínima esperada

A decisão de inclusão deve registrar:

- público e situação de uso;
- problema, risco e conflito evitado;
- frequência e disposição a pagar, separando fato de inferência;
- alternativas gratuitas ou documentos substitutos;
- campos essenciais e opcionais;
- tempo estimado e teste de preenchimento;
- complexidade jurídica e técnica;
- relação com contratos existentes;
- métricas que validarão a decisão após o lançamento.

## 6. Critérios para rejeição ou adiamento

Não incluir ou adiar contratos:

- extremamente específicos e sem segmento economicamente relevante;
- com baixa demanda ou problema pouco reconhecível;
- com baixa disposição a pagar e alternativas simples suficientes;
- com complexidade incompatível com a experiência proposta;
- duplicados ou diferenciados somente pelo nome da profissão;
- pouco reutilizáveis;
- que dependam de diagnóstico jurídico individual extenso;
- cujo risco de uso incorreto supere o benefício de um rascunho automatizado;
- que exijam mudança arquitetural não aprovada;
- que não possam ser testados e revisados de forma proporcional.

Rejeição não significa proibição permanente. O candidato pode ser reavaliado quando houver nova evidência, capacidade jurídica ou mudança de produto aprovada.

## 7. Filosofia da Biblioteca

> “A biblioteca cresce por valor entregue, nunca por quantidade de contratos.”

Consequências práticas:

- número de modelos não é métrica primária de sucesso;
- uma definição horizontal de alta qualidade é preferível a várias variações superficiais;
- presets, linguagem comercial e navegação podem atender profissões diferentes sem duplicar schemas;
- um contrato existente deve ser melhorado antes de se criar uma variante;
- contratos sem uso, conversão ou valor comprovado devem ser revistos;
- backlog não é catálogo e roadmap não é autorização.

## 8. Regra dos 3 Minutos

### 8.1 Definição oficial

Um usuário com as informações básicas disponíveis e dados reutilizáveis já cadastrados deve conseguir gerar o **primeiro rascunho** em aproximadamente três minutos.

O tempo não inclui:

- negociação entre as partes;
- leitura integral do documento;
- revisão jurídica;
- assinatura;
- obtenção de informação que o usuário ainda não possui.

### 8.2 Como aplicar

- perguntar somente decisões que alterem materialmente o documento;
- reutilizar partes, contatos, endereços e documentos relacionados;
- pré-preencher somente dados confiáveis e sempre permitir correção;
- usar perguntas curtas, exemplos e opções compreensíveis;
- tornar opcionais detalhes que não sejam necessários ao caso comum;
- mostrar campos condicionais apenas quando aplicáveis;
- evitar cálculo jurídico ou escolha técnica sem explicação;
- apresentar resumo antes da geração.

### 8.3 Limite de segurança

A Regra dos 3 Minutos reduz esforço, não proteção. Se um documento exigir diagnóstico, anexos, garantias, dados técnicos ou escolhas que não possam ser simplificados com segurança, ele deve:

1. ter fluxo especializado;
2. encaminhar o usuário para revisão profissional; ou
3. ser rejeitado ou adiado.

### 8.4 Validação

Cada contrato deve passar por teste cronometrado com usuários representativos. Contar campos é apenas uma verificação estrutural, não comprovação suficiente da regra.

## 9. Regra do Problema Real

Todo candidato deve responder objetivamente:

> “Qual problema real estou resolvendo?”

A resposta deve identificar:

- quem enfrenta o problema;
- em qual situação concreta;
- qual perda, conflito ou atraso pode ocorrer;
- como o documento ajuda a fechar, executar, alterar ou concluir a relação;
- por que um modelo existente não resolve o mesmo problema;
- por que o usuário perceberia valor suficiente para utilizar ou pagar.

Se a resposta depender apenas de “aumentar o catálogo”, “atender uma profissão” ou “parecer completo”, o contrato não deve entrar.

## 10. Governança de evolução

### 10.1 Gate da categoria

Antes de desenvolver uma categoria:

1. pesquisar mercado, público e conflitos;
2. listar candidatos e rejeições;
3. selecionar no máximo um pequeno lote de alto valor;
4. validar aderência arquitetural;
5. obter revisão jurídica proporcional;
6. aprovar documentalmente a Sprint de implementação.

### 10.2 Gate do contrato

Antes de concluir cada contrato:

1. justificar cada campo;
2. verificar reutilização de campos e padrões;
3. revisar equilíbrio e proporcionalidade das cláusulas;
4. testar schema, geração, catálogo e validações;
5. executar teste de três minutos;
6. manter estado de revisão inicial até validação jurídica formal;
7. medir uso após lançamento.

### 10.3 Métricas de produto

O DocAI deve acompanhar, quando analytics e privacidade forem aprovados:

- procura e seleção por contrato;
- início e conclusão do formulário;
- abandono por pergunta;
- tempo de preenchimento;
- geração concluída e regeneração;
- conversão ou compra;
- reutilização de documentos relacionados;
- retorno do usuário;
- pedidos de suporte, erros e sinais de uso inadequado.

Nenhuma métrica autoriza coleta de dados sem Sprint, base legal, minimização e configuração aprovadas.

## 11. Roadmap sugerido das próximas Sprints

A numeração abaixo é uma proposta de sequência. Cada Sprint precisa de especificação e aprovação próprias e pode ser dividida quando a qualidade exigir.

| Sprint | Objetivo sugerido | Resultado esperado |
| --- | --- | --- |
| 15 | Implementar os cinco Contratos Gerais essenciais | Definições, schemas, catálogo e testes dos cinco modelos aprovados, sem mudança arquitetural. |
| 16 | Validar e refinar UX dos Contratos Gerais | Testes cronometrados, linguagem, abandono, revisão jurídica e ajustes aprovados; nenhum novo contrato. |
| 17 | Pesquisar e priorizar Serviços Gerais | Seleção documental de poucos candidatos; rejeições e campos definidos. |
| 18 | Implementar o primeiro lote de Serviços Gerais | Somente contratos aprovados na Sprint 17. |
| 19 | Pesquisar e priorizar Construção | Seleção por demanda, ticket, risco e viabilidade jurídica. |
| 20 | Implementar o primeiro lote de Construção | Definições e testes do lote aprovado, sem ampliar arquitetura silenciosamente. |
| 21 | Pesquisar e priorizar Tecnologia | Consolidar sobreposições, propriedade intelectual, dados e suporte. |
| 22 | Implementar o primeiro lote de Tecnologia | Somente modelos comprovadamente distintos e aprovados. |
| 23 | Pesquisar e priorizar Marketing | Avaliar recorrência, acesso a contas, mídia e expectativa de resultado. |
| 24 | Implementar o primeiro lote de Marketing | Lote pequeno, reutilizável e validado. |
| 25 | Pesquisar e priorizar Design e Criativos | Resolver sobreposições e definir direitos de uso e revisões. |
| 26 | Implementar o primeiro lote de Design e Criativos | Somente definições que não possam ser presets do contrato geral. |
| 27 | Pesquisar e priorizar Consultoria | Separar modelo geral de atividades profissionais reguladas. |
| 28 | Implementar o primeiro lote de Consultoria | Contratos aprovados e juridicamente delimitados. |
| 29 | Pesquisar e priorizar Eventos | Validar riscos de data, cancelamento, montagem e substituição. |
| 30 | Implementar o primeiro lote de Eventos | Modelos de maior demanda e ticket. |
| 31 | Pesquisar e priorizar Educação | Avaliar modalidade, consumo, menores, materiais e reposição. |
| 32 | Implementar o primeiro lote de Educação | Contratos aprovados após triagem jurídica. |
| 33 | Pesquisar juridicamente Saúde | Determinar documentos adequados e limites por profissão. |
| 34 | Implementar eventual primeiro lote de Saúde | Somente se pesquisa e revisão especializada aprovarem contratos compatíveis com o produto. |
| 35 | Otimizar portfólio e backlog | Revisar métricas, melhorar modelos existentes e reavaliar importantes/complementares antes de expandir. |

## 12. Critérios para avançar entre fases

Uma fase somente deve avançar quando:

- a fase anterior estiver tecnicamente validada e formalmente aprovada;
- houver evidência suficiente de uso, valor ou aprendizado;
- problemas críticos de UX ou qualidade jurídica estiverem resolvidos;
- os contratos da próxima fase tiverem pesquisa aprovada;
- o lote estiver limitado ao menor conjunto de alto valor;
- arquivos, testes e validações da Sprint estiverem definidos;
- nenhuma mudança arquitetural estiver implícita;
- riscos e limitações estiverem comunicados.

O roadmap pode ser reordenado por evidência nova, mas toda mudança deve ser documentada e aprovada. Silêncio, urgência comercial ou existência de modelos no catálogo não substituem esse processo.

## 13. Resumo executivo

O roadmap organiza a biblioteca em dez categorias e inicia pelos cinco Contratos Gerais aprovados. A expansão segue do mercado horizontal e frequente para segmentos com maior especialização e risco jurídico.

A estratégia combina três movimentos:

1. construir uma base pequena e reutilizável;
2. validar UX, valor e qualidade antes de ampliar;
3. pesquisar e implementar cada categoria em lotes separados.

Os cinco documentos iniciais cobrem proteção, venda, contratação, mudança e conclusão do serviço. Serviços Gerais, Construção e Tecnologia formam a próxima sequência de maior potencial. Saúde permanece por último porque exige a validação jurídica e profissional mais rigorosa.

Este documento não inicia a Sprint 15 nem qualquer fase futura. Ele consolida a direção de produto e exige aprovação específica antes de cada implementação.
