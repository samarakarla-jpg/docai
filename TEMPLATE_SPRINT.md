# Nome da Sprint

**Sprint:** `[NN — nome curto e descritivo]`

**Fase do Roadmap:** `[fase relacionada]`

**Status:** `[rascunho | em revisão | aprovada | em execução | tecnicamente concluída | encerrada]`

Identifique a Sprint por número e por um nome que represente uma única evolução coerente. Informe a fase correspondente do roadmap e mantenha o status atualizado sem confundir conclusão técnica com aprovação final.

# Objetivo

Descreva, em um parágrafo, o resultado principal que deverá existir ao final da Sprint.

O objetivo deve:

- resolver uma necessidade atual e documentada;
- representar uma evolução pequena e verificável;
- permanecer compatível com a visão, os princípios e a especificação;
- evitar antecipação de funcionalidades futuras;
- permitir uma avaliação objetiva ao final do trabalho.

`[Descrever o objetivo da Sprint.]`

# Escopo

Liste somente as entregas autorizadas para esta Sprint. Cada item deve contribuir diretamente para o objetivo e produzir um resultado observável.

- `[Entrega autorizada 1.]`
- `[Entrega autorizada 2.]`
- `[Entrega autorizada 3.]`

Uma menção nesta seção autoriza apenas o resultado descrito. Decisões sobre arquivos, dependências, configurações ou arquitetura devem também estar declaradas nas seções correspondentes.

# Fora do Escopo

Registre funcionalidades, refatorações, integrações e melhorias que não poderão ser realizadas nesta Sprint, especialmente aquelas que possam parecer relacionadas às entregas.

- `[Item explicitamente excluído 1.]`
- `[Item explicitamente excluído 2.]`
- `[Item explicitamente excluído 3.]`

Itens fora do escopo podem ser propostos para avaliação futura, mas não devem gerar implementação, arquivos preparatórios ou alterações documentais que os apresentem como aprovados.

# Requisitos

Documente os requisitos necessários para alcançar o objetivo. Identifique cada requisito de forma estável e relacione-o a uma entrega e a pelo menos um critério de aceitação.

- **REQ-01 — `[Nome do requisito]`:** `[Comportamento, regra ou resultado esperado.]`
- **REQ-02 — `[Nome do requisito]`:** `[Comportamento, regra ou resultado esperado.]`

Os requisitos devem ser claros, necessários, testáveis e independentes de soluções não aprovadas. Premissas, restrições e casos relevantes devem ser declarados. Dúvidas que possam alterar comportamento, escopo, arquitetura, dependências ou configurações devem ser resolvidas antes da implementação.

# Arquivos autorizados para alteração

Liste individualmente todos os arquivos que poderão ser criados, modificados, movidos ou removidos. Para cada arquivo, informe a ação permitida e sua finalidade.

| Arquivo | Ação autorizada | Finalidade |
| --- | --- | --- |
| `[caminho/do/arquivo]` | `[criar | modificar | mover | remover]` | `[Relação direta com o escopo.]` |

Diretórios amplos, curingas e expressões como “arquivos relacionados” devem ser evitados. Se um arquivo adicional se tornar necessário, a implementação deverá parar até que o escopo seja formalmente revisado e aprovado.

# Arquivos proibidos

Liste os arquivos ou grupos de arquivos que não poderão ser alterados. Inclua explicitamente os itens sensíveis que devam permanecer preservados durante a Sprint.

- `[Arquivo ou diretório proibido.]`
- `[Manifesto, arquivo de lock ou configuração não autorizada.]`
- `[Documento ou área fora do escopo.]`

Todo arquivo não incluído na lista de arquivos autorizados deve ser considerado proibido por padrão.

# Critérios de Aceitação

Defina condições objetivas, verificáveis e relacionadas aos requisitos. Cada critério deve indicar o resultado esperado, sem depender apenas de uma descrição subjetiva.

- **CA-01 — `[Critério verificável relacionado ao REQ-01.]`**
- **CA-02 — `[Critério verificável relacionado ao REQ-02.]`**
- **CA-03 — `[Confirmação de ausência de comportamento fora do escopo, quando relevante.]`**

Na entrega, cada critério deverá receber um dos estados: **atendido**, **não atendido**, **pendente** ou **não verificável**, acompanhado da respectiva evidência ou justificativa.

# Checklist Técnico

As verificações devem utilizar os comandos e ferramentas já aprovados no projeto. Não se deve instalar dependências, criar infraestrutura ou modificar configurações apenas para satisfazer este checklist.

- [ ] **Lint:** executado com sucesso, ou declarado não aplicável ou indisponível com justificativa.
- [ ] **Typecheck:** executado com sucesso, ou declarado não aplicável ou indisponível com justificativa.
- [ ] **Build:** executado com sucesso, ou declarado não aplicável ou indisponível com justificativa.
- [ ] **Testes:** testes aplicáveis executados e resultados registrados, ou ausência justificada.
- [ ] **Responsividade:** verificada quando houver impacto visual, ou declarada não aplicável.
- [ ] **Acessibilidade básica:** semântica, teclado, foco, contraste, rótulos e textos alternativos verificados quando aplicáveis.

Falhas não devem ser omitidas. Uma correção identificada durante a validação somente poderá ser realizada se permanecer dentro do escopo e dos arquivos autorizados.

# Critérios de Revisão

Antes de apresentar a Sprint para aceite, revise:

- alinhamento com o objetivo, a visão, os princípios e a especificação;
- aderência integral ao escopo e aos requisitos;
- ausência de funcionalidades ou melhorias não autorizadas;
- respeito à arquitetura, às diretrizes de interface e ao estilo do projeto;
- simplicidade da solução e ausência de duplicação ou abstração prematura;
- preservação de comportamento, documentação e alterações preexistentes;
- alteração exclusiva dos arquivos autorizados;
- ausência de mudanças acidentais em dependências, configurações e arquivos de lock;
- clareza e rastreabilidade dos critérios de aceitação;
- resultados das validações e tratamento transparente de falhas;
- atualização documental necessária e autorizada;
- riscos, limitações e pendências conhecidos.

# Riscos

Registre riscos específicos da Sprint, sua probabilidade ou relevância, o impacto possível e a forma prevista de mitigação.

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| `[Descrição do risco.]` | `[Efeito sobre escopo, qualidade, segurança, prazo ou compatibilidade.]` | `[Ação preventiva ou resposta planejada.]` |

Inclua, quando aplicável, riscos de expansão de escopo, alteração arquitetural, incompatibilidade, segurança, acessibilidade, dependência externa, validação insuficiente e modificação indireta de arquivos.

# Dependências

Descreva tudo o que precisa existir ou ser decidido antes ou durante a Sprint.

## Pré-requisitos

- `[Documento, aprovação, decisão, ambiente ou entrega anterior necessária.]`

## Dependências técnicas existentes

- `[Biblioteca, serviço, configuração ou capacidade já aprovada e disponível.]`

## Novas dependências

- `[Nenhuma.]`

Qualquer nova biblioteca, serviço externo, variável de ambiente, configuração, script, manifesto ou alteração de arquivo de lock deve ser identificada e receber autorização explícita antes da implementação. Quando não houver novas dependências, registre **Nenhuma**.

# Plano de Implementação

Organize o trabalho em passos pequenos, ordenados e relacionados ao escopo. O plano deve indicar o resultado de cada etapa sem antecipar detalhes desnecessários de implementação.

1. `[Confirmar pré-requisitos e estado inicial.]`
2. `[Executar a primeira alteração autorizada.]`
3. `[Executar a próxima alteração autorizada.]`
4. `[Revisar o diff e corrigir apenas problemas dentro do escopo.]`
5. `[Realizar as validações previstas.]`
6. `[Preparar a entrega para revisão.]`

O plano não amplia a autorização da Sprint. Se uma etapa exigir arquivo, dependência, configuração ou decisão não aprovada, o trabalho deverá parar e a necessidade deverá ser relatada.

# Plano de Validação

Defina como cada requisito, critério de aceitação e restrição será verificado.

| Item | Método de validação | Evidência esperada |
| --- | --- | --- |
| `[REQ-01 ou CA-01]` | `[Comando, teste ou inspeção.]` | `[Resultado observável.]` |
| `[Restrição de escopo]` | `[Revisão do diff e do estado do repositório.]` | `[Somente arquivos autorizados afetados.]` |

O plano deve incluir, conforme aplicável:

1. registro do estado inicial do repositório;
2. revisão dos arquivos modificados e do diff completo;
3. execução de lint, typecheck, build e testes existentes;
4. inspeção de responsividade e acessibilidade básica para mudanças visuais;
5. verificação individual dos critérios de aceitação;
6. confirmação de que dependências e configurações permaneceram dentro do escopo;
7. registro de falhas, limitações e verificações não executadas;
8. comparação do estado final com o estado inicial.

# Entrega Esperada

Ao concluir tecnicamente a Sprint, a entrega deverá conter:

- resultado aprovado disponível para revisão;
- lista completa dos arquivos criados, modificados, movidos ou removidos;
- resumo da finalidade de cada alteração;
- comandos relevantes executados;
- resultados de lint, typecheck, build, testes e inspeções aplicáveis;
- status e evidência de cada critério de aceitação;
- riscos, limitações, falhas e pendências;
- confirmação sobre dependências, configurações e arquivos de lock;
- confirmação de que o escopo e os arquivos autorizados foram respeitados.

O estado esperado após essa entrega é **tecnicamente concluída e aguardando aprovação**. A Sprint somente será encerrada depois da revisão e do aceite explícito do responsável pelo projeto.

# Commit Esperado

**Mensagem proposta:** `[tipo: descrição curta e objetiva]`

**Arquivos previstos:** `[listar somente os arquivos pertencentes ao objetivo da Sprint]`

O commit deve possuir um único objetivo, mensagem clara e conteúdo revisado. Não deve incluir alterações preexistentes, arquivos não autorizados, artefatos temporários ou mudanças de outras tarefas.

A definição de uma mensagem nesta seção não autoriza a execução do commit, do push, da abertura de Pull Request ou de qualquer publicação. Essas operações dependem de autorização explícita no momento apropriado.

# Observações

Use esta seção para registrar contexto necessário à execução ou à revisão que não pertença às seções anteriores.

- `[Decisão aprovada relevante.]`
- `[Limitação conhecida.]`
- `[Questão resolvida antes da implementação.]`

Não utilize observações para autorizar informalmente mudanças de escopo, ocultar requisitos ou substituir critérios de aceitação. Propostas futuras devem permanecer claramente identificadas como não aprovadas.
