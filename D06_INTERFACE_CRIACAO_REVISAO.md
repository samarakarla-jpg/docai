# D06 — Interface de Criação e Revisão de Contratos

**Produto:** DocAI
**Sprint:** D06 — Interface de criação e revisão
**Status:** planejamento histórico substituído; sem autoridade vigente
**Fase:** apresentação, sem persistência ou integrações externas

## Objetivo da Sprint

Definir e, após aprovação, implementar a interface reutilizável do DocAI para selecionar um tipo de contrato, preencher seus dados, solicitar uma geração pelo `ContractGenerationService` e revisar ou regenerar o rascunho retornado.

A interface deverá preservar os dados durante erros e transições, comunicar claramente os estados da operação e manter a revisão humana como etapa obrigatória. Esta Sprint não autoriza persistência, autenticação nova ou chamada direta a `AIService`, Gemini ou qualquer outro fornecedor.

## Fluxo completo do usuário

1. O usuário autenticado acessa a área de criação por meio do layout autenticado já existente.
2. A tela apresenta os quatro tipos suportados: Prestação de Serviços, Compra e Venda, Aluguel e Empréstimo.
3. O usuário escolhe um tipo; a interface mostra somente os campos correspondentes ao modelo escolhido.
4. O usuário informa título, partes e os campos básicos definidos em D01.
5. A interface valida os dados antes do envio e associa cada erro ao campo correspondente.
6. O usuário revisa o resumo dos dados e solicita a geração.
7. Durante a geração, os campos são preservados, a submissão duplicada é impedida e o estado de carregamento é anunciado.
8. A interface exibe o resultado como rascunho gerado por IA, sem afirmar validade jurídica, assinatura ou aprovação.
9. O usuário pode editar os dados de entrada e solicitar regeneração.
10. Antes de regenerar com alterações, a interface informa que o resultado atual será substituído e solicita confirmação quando houver risco de perda.
11. O usuário pode retornar à edição, revisar novamente ou abandonar o fluxo; alterações não salvas devem gerar aviso quando aplicável.

Nesta Sprint, o rascunho permanece no estado da interface. Salvamento, recuperação, listagem e associação a usuário dependem das Sprints de identidade e persistência.

## Telas envolvidas

### Seleção e criação

Tela de criação dentro do layout autenticado existente, com:

- título e contexto da tarefa;
- seleção acessível do tipo de contrato;
- formulário específico para o tipo escolhido;
- resumo ou revisão dos campos preenchidos;
- ação principal para gerar;
- ação secundária para limpar ou cancelar, quando apropriado.

### Edição dos dados

A edição pode permanecer na mesma rota e alternar para um estado claramente identificado. Deve permitir alterar título, partes e campos do tipo atual sem perder valores válidos.

### Revisão do resultado

A área de revisão deve apresentar:

- indicação explícita de que o conteúdo foi gerado por IA;
- saída textual recebida do `ContractGenerationService`;
- aviso de revisão humana e limitações jurídicas;
- ação para voltar à edição;
- ação para regenerar;
- mensagens de erro e sucesso no mesmo contexto da operação.

Não serão criadas nesta Sprint telas de histórico, detalhes persistidos, compartilhamento, exportação ou pagamento.

## Estados da interface

Os estados devem ser explícitos e mutuamente compreensíveis:

- `initial`: nenhum tipo selecionado;
- `editing`: formulário disponível para preenchimento;
- `validation-error`: formulário com erros associados aos campos;
- `generating`: solicitação em andamento, controles duplicados desabilitados;
- `generated`: resultado disponível para revisão;
- `editing-after-generation`: dados alterados após uma geração;
- `regenerating`: nova solicitação em andamento, resultado anterior identificado como prestes a ser substituído;
- `generation-error`: falha segura com dados de entrada preservados e ação de tentar novamente;
- `cancel-confirmation`: confirmação para descartar alterações não salvas;
- `empty-output-error`: resposta sem conteúdo útil, tratada como erro recuperável.

Cada estado deve preservar a estrutura principal da tela e oferecer uma próxima ação compreensível. Loading, erro e sucesso não podem depender somente de cor ou animação.

## Criação de contrato

- O seletor deve usar exatamente os quatro `ContractType` existentes.
- Após a seleção, somente os campos do tipo atual devem ser exibidos ou habilitados.
- Todos os campos atualmente exigidos em D01 devem possuir rótulo visível e indicação de obrigatoriedade.
- Deve haver pelo menos uma parte com nome não vazio, conforme o domínio atual.
- O título deve ser não vazio.
- A interface deve enviar ao serviço um objeto estruturado, sem prompt, token, usuário autenticado ou detalhe de provedor.
- O template compatível deve ser fornecido pela composição autorizada; a interface não deve buscar templates diretamente.

## Edição dos campos

- Alterações devem atualizar o estado local sem mutar valores compartilhados.
- Trocar o tipo deve solicitar confirmação se houver dados preenchidos que serão descartados.
- Campos válidos devem permanecer preenchidos quando outro campo falhar.
- Erros devem desaparecer ou ser atualizados quando o campo for corrigido.
- A interface deve distinguir dados de entrada do texto gerado e não permitir editar silenciosamente o resultado como se fosse dado original.
- A edição após uma geração deve marcar o resultado como desatualizado até nova geração ou descarte das alterações.

## Revisão do resultado da IA

- O resultado deve ser exibido em área de leitura confortável, com hierarquia e quebra de linha adequadas.
- Deve existir aviso persistente de que o texto é um rascunho gerado por IA e requer revisão humana.
- A interface não deve adicionar fatos, cláusulas, valores, datas, nomes ou endereços ao texto.
- A interface não deve declarar validade jurídica, assinatura, aprovação ou adequação universal.
- O usuário deve conseguir retornar aos dados de entrada sem perder o resultado até confirmar uma nova geração ou abandono.
- Como `ContractGenerationResult.output` permanece `unknown`, a UI só pode renderizar uma saída textual validada; qualquer outro formato, conteúdo vazio ou incompatível deve ser apresentado como erro, nunca como sucesso.

## Regeneração do contrato

- Regenerar utiliza exclusivamente o `ContractGenerationService` injetado.
- A solicitação deve conter o tipo, o conteúdo atual validado e o template compatível fornecido pela composição.
- A regeneração deve respeitar os mesmos estados, validações e limites da criação.
- Enquanto `regenerating`, a ação deve impedir chamadas duplicadas.
- O resultado anterior deve permanecer visível até haver sucesso ou ser claramente marcado como desatualizado em caso de falha.
- Em sucesso, o novo resultado substitui o anterior e retorna ao estado `generated`.
- Em falha, os dados e o resultado anterior devem permanecer recuperáveis.
- Nenhum salvamento automático ou chamada direta ao `AIService` é permitido.

## Mensagens de erro e loading

- Erros de campo devem ser específicos, próximos ao controle e acionáveis.
- Erros de tipo, conteúdo ou template incompatível devem indicar a correção necessária sem expor detalhes internos.
- Falhas de geração devem usar mensagem estável e neutra, por exemplo: “Não foi possível gerar o rascunho. Revise os dados e tente novamente.”
- Nunca exibir chave, prompt, URL, código bruto, resposta do provedor ou stack trace.
- Falhas de rede, indisponibilidade e saída vazia devem permitir nova tentativa sem apagar o formulário.
- O loading deve indicar “Gerando rascunho” ou texto equivalente, impedir submissões duplicadas e restaurar o foco ou contexto ao terminar.
- Sucesso deve anunciar que o rascunho está disponível para revisão, sem sugerir aprovação jurídica.

## Validações de formulário

A UI pode antecipar erros para orientar o usuário, mas o domínio permanece autoridade final. Devem ser validados:

- tipo pertencente aos quatro tipos suportados;
- título não vazio;
- pelo menos uma parte nomeada;
- campos básicos não vazios para o tipo selecionado;
- correspondência entre tipo e conteúdo;
- template compatível fornecido pela composição;
- limites de tamanho definidos na implementação, sem truncar silenciosamente informações.

A validação deve ocorrer antes do envio e novamente pelo `ContractGenerationService`. Dados recebidos de qualquer camada devem ser tratados como não confiáveis.

## Acessibilidade e responsividade

- Usar HTML semântico, uma região principal e hierarquia correta de títulos.
- Associar cada controle a rótulo visível, ajuda e mensagem de erro por `for`/`id` e `aria-describedby` quando necessário.
- Usar `aria-invalid` nos campos inválidos e um resumo de erros quando houver múltiplos problemas.
- Anunciar loading, erro e sucesso com regiões ao vivo apropriadas, sem interromper leitura excessivamente.
- Mover o foco para o primeiro erro após submissão inválida e restaurá-lo para contexto útil após geração.
- Garantir operação completa por teclado, foco visível, ordem lógica e sem armadilhas de foco.
- Não depender somente de cor, ícone ou posição para transmitir estado.
- Respeitar contraste, ampliação de fonte, preferência por redução de movimento e áreas de toque adequadas.
- Priorizar telas estreitas: campos em ordem linear, conteúdo gerado legível e ações acessíveis sem rolagem horizontal involuntária.
- Em telas maiores, limitar a largura de leitura do resultado e manter formulário e ações visualmente agrupados.

## Responsabilidades da UI

- Renderizar os estados, campos, mensagens e ações definidos nesta Sprint.
- Manter estado local de edição e resultado enquanto o fluxo estiver aberto.
- Executar validações de apresentação e encaminhar dados estruturados.
- Invocar somente o `ContractGenerationService` recebido por injeção.
- Impedir submissões duplicadas e preservar dados em falhas.
- Comunicar revisão humana, limitações e resultado sem alterar o conteúdo gerado.

A UI não autentica, autoriza, persiste, chama provedores, monta prompts, interpreta regras jurídicas ou decide a validade do contrato.

## Responsabilidades do domínio

- Definir tipos, campos e coerência do conteúdo.
- Validar a solicitação recebida pelo `ContractGenerationService`.
- Garantir que tipo, conteúdo e template sejam compatíveis.
- Traduzir falhas de geração para contratos de erro estáveis.
- Retornar o tipo e a saída sem inventar, persistir ou aprovar conteúdo.

O domínio não conhece React, rotas, CSS, eventos de formulário, cookies, tokens ou detalhes do Gemini.

## Responsabilidades da infraestrutura

- Fornecer, quando existir uma composição aprovada, a instância de `ContractGenerationService` e o template compatível.
- Manter autenticação, persistência e adaptadores de IA em suas fronteiras próprias.
- Disponibilizar o serviço sem expor chaves, SDKs ou detalhes de provedor à UI.
- Não introduzir banco, chamadas externas, rotas novas ou configuração de ambiente nesta Sprint.

Enquanto o adaptador D05 não estiver implementado e conectado, os componentes devem receber `ContractGenerator` por injeção e os testes devem usar dublês. A D06 não autoriza criar uma composição de provedor para contornar essa dependência.

## Integração exclusiva com `ContractGenerationService`

- A interface não pode importar ou instanciar `AIService`, `AiAdapter`, `GeminiAdapter`, Supabase, Stripe ou qualquer cliente HTTP.
- O único contrato de geração consumido pela UI é `ContractGenerationService`/`ContractGenerator` conforme D04.
- A dependência deve ser injetada pela composição da aplicação ou recebida por uma fronteira explicitamente autorizada.
- A UI envia somente `ContractGenerationInput` e consome `ContractGenerationResult`.
- A composição deve fornecer `template` compatível; a UI não pode obtê-lo de rede, banco ou provedor.
- Falhas são tratadas pelos códigos e mensagens seguros do serviço; detalhes internos não chegam à tela.

## Arquivos autorizados para implementação

Somente após aprovação explícita desta especificação:

- `app/dashboard/contracts/new/page.tsx` — rota e composição da tela de criação;
- `components/docai/contracts/contract-type-selector.tsx` — seleção dos quatro tipos;
- `components/docai/contracts/contract-form.tsx` — campos, validação de apresentação e ações;
- `components/docai/contracts/contract-review.tsx` — revisão do resultado e regeneração;
- `components/docai/contracts/contract-flow.test.tsx` — testes do fluxo e estados, usando dublês locais.

Se as pastas não existirem, poderão ser criadas apenas para esses arquivos. Qualquer alteração adicional exige nova revisão e aprovação.

## Arquivos proibidos

- `lib/docai/domain/`, `lib/docai/services/`, `lib/docai/application/` e `lib/docai/infrastructure/`;
- `lib/integrations/`, `lib/auth/`, `lib/persistence/`, `lib/documents/` e `lib/templates/`;
- `components/layout/`, `components/ui/` e arquivos do layout autenticado existente;
- `app/actions/`, middleware, rotas de autenticação e qualquer página fora da rota autorizada;
- `D01_REFINAMENTO_DOMINIO.md` a `D05_ADAPTADOR_GEMINI.md`, `PRODUCT_SPEC.md`, `ROADMAP.md` e `PROJECT_STATE.md`;
- Supabase, Gemini, Stripe, HTTP, PDF, e-mail, storage externo, autenticação, persistência e pagamentos;
- `package.json`, lockfiles, scripts, configurações, variáveis de ambiente e arquivos de deploy;
- qualquer arquivo não listado como autorizado.

## Estratégia de testes

- Testar seleção de cada um dos quatro tipos e renderização dos campos correspondentes.
- Testar validação de título, partes, campos vazios, tipo incompatível e template incompatível.
- Testar submissão válida com `ContractGenerationService` dublado e confirmar o payload estruturado.
- Testar saída `unknown` não textual ou vazia como erro recuperável, sem renderização indevida.
- Testar que a UI não chama diretamente `AIService`, Gemini ou rede.
- Testar estados inicial, edição, validação, loading, sucesso, erro, regeneração e cancelamento.
- Testar preservação dos dados quando a geração falhar ou retornar saída vazia.
- Testar prevenção de submissões duplicadas durante geração e regeneração.
- Testar aviso antes de descartar dados ou substituir resultado desatualizado.
- Testar mensagens associadas aos campos, foco no primeiro erro, anúncios e navegação por teclado.
- Testar layout em larguras mobile e desktop, sem depender de identidade visual específica.
- Executar typecheck, build e `git diff --check`; não utilizar chamadas externas ou credenciais reais.

## Critérios de aceitação

- O usuário consegue selecionar qualquer um dos quatro tipos e preencher seus campos básicos.
- Campos obrigatórios e inconsistências são identificados antes do envio com mensagens acionáveis.
- A UI utiliza exclusivamente `ContractGenerationService` por injeção.
- O loading impede duplicidade e preserva o formulário.
- O resultado é apresentado como rascunho gerado por IA, com aviso de revisão humana.
- Saídas não textuais ou vazias não são apresentadas como sucesso.
- O usuário consegue editar dados e regenerar sem perder contexto indevidamente.
- Falhas de geração, saída vazia e cancelamento possuem estados e ações recuperáveis.
- A interface é utilizável por teclado, leitores de tela, ampliação e telas estreitas.
- Nenhuma regra de domínio, persistência, autenticação ou integração externa é implementada nos componentes.
- Todos os testes previstos e validações de build/typecheck são aprovados.
- Somente os arquivos autorizados foram alterados.

## Riscos

- Duplicar validações da camada de domínio e produzir mensagens divergentes.
- Perder dados ao trocar tipo, cancelar ou regenerar.
- Exibir saída de IA como se fosse conteúdo validado ou juridicamente aprovado.
- Dependência acidental de `AIService`, Gemini ou persistência dentro da UI.
- Fluxos de foco, loading ou erro inacessíveis em dispositivos móveis ou leitores de tela.
- Composição do serviço ainda não estar disponível enquanto D05 permanece sem integração real.
- Escopo crescer para histórico, autenticação, persistência, exportação ou pagamentos.

## Critérios de encerramento

- Esta especificação for revisada e aprovada explicitamente.
- Implementação ficar limitada aos arquivos autorizados.
- Todos os estados, fluxos, critérios de acessibilidade e testes previstos forem cobertos.
- Testes, typecheck, build e `git diff --check` forem aprovados.
- Nenhuma dependência, configuração, integração externa ou alteração de domínio for adicionada.
- Documentação for reconciliada com a interface implementada.
- Commit, push, sincronização da branch e árvore limpa ocorrerem somente após aprovação do resultado.

## Dependências da próxima Sprint

A próxima Sprint deverá definir a integração do fluxo com identidade e persistência de rascunhos, incluindo owner-scoping, salvamento, recuperação e estados de erro correspondentes. Ela dependerá das decisões de D02 e D03 e não poderá ampliar a UI para pagamentos, exportação ou integrações externas sem especificação própria.
