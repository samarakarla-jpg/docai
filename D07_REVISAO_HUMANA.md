# D07 — Revisão Humana de Contratos

**Produto:** DocAI
**Sprint:** D07 — Revisão humana
**Status:** planejamento histórico substituído; sem autoridade vigente
**Fase:** revisão do rascunho antes de exportação

## Objetivo

Definir o fluxo completo para que uma pessoa revise, edite e confirme um contrato gerado antes de qualquer exportação. A revisão deve preservar a versão original, registrar alterações de forma auditável e deixar claro que a confirmação do usuário não constitui assinatura, aprovação jurídica ou publicação.

## Escopo

- Modelar os estados de revisão do rascunho.
- Permitir edição manual do texto gerado e dos dados editáveis autorizados.
- Preservar uma versão original imutável para comparação.
- Exibir diferenças entre a versão original e a versão editada.
- Registrar histórico de revisões, autor, versão e momento da alteração.
- Validar conteúdo antes de permitir a confirmação da revisão.
- Integrar o fluxo à identidade e à persistência por contratos internos owner-scoped.
- Preparar o documento para uma Sprint posterior de exportação.

Não fazem parte desta Sprint exportação PDF, download, e-mail, assinatura eletrônica, publicação, colaboração em tempo real, pagamentos, geração adicional por outro provedor ou aconselhamento jurídico.

## Estados do documento

O ciclo de vida deve permanecer compatível com D03:

- `draft` (**rascunho**): conteúdo criado ou alterado e ainda não confirmado na revisão;
- `in_review` (**em revisão**): o usuário está examinando ou editando uma versão específica;
- `reviewed` (**aprovado para exportação**): a revisão humana foi confirmada para aquele conteúdo.

O termo “aprovado” na interface significa somente “revisão humana concluída”. O estado persistido deve continuar sendo `reviewed`, sem criar um estado de domínio `approved`, `signed` ou `legally_valid`, pois D03 proíbe que o rascunho seja tratado como contrato juridicamente aprovado.

Transições permitidas:

- `draft` → `in_review` ao abrir a revisão;
- `in_review` → `draft` quando houver edição não confirmada;
- `in_review` → `reviewed` após validação e confirmação explícita;
- `reviewed` → `in_review` quando o usuário editar novamente;
- qualquer estado ativo → `draft` quando uma nova geração substituir o conteúdo revisado.

Arquivamento e recuperação continuam sob as regras de D03. Não há estado de exportado nesta Sprint.

## Edição manual do contrato

- O texto gerado deve possuir uma cópia original imutável e uma versão editável separada.
- A edição manual pode alterar o texto revisável, mas não pode modificar silenciosamente `ownerId`, tipo, identificadores de revisão ou origem da geração.
- O editor deve preservar quebras de linha e caracteres válidos sem truncar conteúdo.
- Conteúdo vazio ou somente espaços deve ser rejeitado.
- Alterações devem marcar o documento como `in_review` e invalidar a confirmação anterior.
- O usuário deve poder desfazer alterações locais antes de confirmar, sem apagar a versão original.
- Se os campos estruturados do contrato forem alterados, a aplicação deve revalidá-los conforme D01 antes de permitir nova geração ou confirmação.
- A interface não deve atribuir à IA qualquer alteração feita manualmente pelo usuário.
- A revisão humana deve permitir corrigir, remover ou complementar texto; o sistema não deve inventar fatos para completar lacunas.

## Comparação entre versões

- A comparação deve apresentar a versão original da geração lado a lado ou em uma visualização de diferenças equivalente.
- Adições, remoções e alterações devem ser distinguíveis por texto e por indicação visual, sem depender somente de cor.
- O usuário deve conseguir identificar qual versão será considerada a atual.
- A versão original nunca deve ser sobrescrita por uma edição.
- A comparação deve ser determinística para o mesmo par de versões e não pode enviar conteúdo a serviço externo.
- Em telas estreitas, a comparação pode alternar entre versões ou usar blocos sequenciais acessíveis, preservando a relação entre trechos.
- A UI deve anunciar mudanças relevantes para tecnologias assistivas quando a comparação for atualizada.

## Histórico de revisões

Cada confirmação ou edição persistida deve produzir uma revisão imutável contendo, no mínimo:

- identificador do documento e do proprietário;
- número monotônico da revisão;
- versão original da geração quando aplicável;
- conteúdo ou referência segura da versão anterior;
- conteúdo da nova versão;
- autor interno da alteração;
- origem (`generated`, `manual_edit` ou `review_confirmation`);
- data de criação controlada pelo servidor;
- resumo seguro da alteração, quando disponível.

O histórico deve ser somente acrescentado; nenhuma revisão existente pode ser alterada ou removida pela UI. A listagem deve respeitar o proprietário autenticado e não deve expor conteúdo de outra conta. Retenção, exclusão definitiva e política de auditoria dependem de decisão própria de privacidade.

## Validações

- O usuário deve estar autenticado e autorizado pelo contexto definido em D02.
- O documento deve pertencer ao usuário atual; tentativas cruzadas devem falhar de forma segura.
- O tipo e o conteúdo estruturado devem permanecer compatíveis com D01.
- A versão editada deve ser texto não vazio e estar associada ao documento correto.
- A revisão confirmada deve possuir uma versão atual, autor e timestamp do servidor.
- Conflitos de versão devem impedir sobrescrita silenciosa e exigir recarregamento ou resolução explícita.
- O estado somente pode seguir as transições permitidas.
- A confirmação não pode marcar assinatura, publicação, validade jurídica ou exportação concluída.
- Erros de validação devem impedir gravação parcial e manter a versão anterior recuperável.

## Responsabilidades do domínio

- Definir estados, transições, invariantes e números de revisão.
- Garantir que a versão original permaneça imutável.
- Validar coerência entre tipo, conteúdo, revisão e proprietário recebido por contrato interno.
- Diferenciar edição pendente de revisão confirmada.
- Produzir erros previsíveis para conflito, ausência, autorização e conteúdo inválido.
- Não conhecer React, Supabase, SQL, Gemini, PDF, cookies ou detalhes de transporte.

## Responsabilidades da infraestrutura

- Persistir documentos e revisões por interfaces owner-scoped.
- Definir timestamps e identificadores no servidor.
- Aplicar controle de concorrência, transações e políticas de isolamento quando o adaptador existir.
- Converter falhas de armazenamento e identidade em erros internos estáveis.
- Recuperar versões necessárias para comparação sem expor dados de outras contas.
- Manter dados sensíveis fora de logs e respeitar a política de retenção aprovada.

A infraestrutura não deve alterar o conteúdo, gerar texto, decidir validade jurídica ou exportar o documento nesta Sprint.

## Interface e responsabilidades da apresentação

- Exibir o estado atual e a versão que será confirmada.
- Oferecer editor acessível, comparação legível, histórico owner-scoped e ações de confirmar, desfazer e voltar.
- Avisar sobre alterações não salvas e sobre a substituição de uma confirmação anterior.
- Anunciar loading, sucesso, conflito e erro sem depender de cor.
- Não chamar diretamente `AIService`, Gemini, Supabase, HTTP ou repositório.
- Não editar a versão original nem modificar metadados protegidos.

## Arquivos autorizados para implementação

Somente após aprovação explícita desta especificação:

- `lib/docai/domain/contract-review.ts` — estados, entidade de revisão, invariantes e contratos de comparação;
- `lib/docai/domain/contract-review.test.ts` — testes de estados, versões e validações;
- `lib/docai/services/contract-review-service.ts` — coordenação owner-scoped de edição, comparação e confirmação;
- `lib/docai/services/contract-review-service.test.ts` — testes do serviço e erros estáveis;
- `components/docai/contracts/contract-review.tsx` — editor e ações de revisão;
- `components/docai/contracts/contract-diff.tsx` — comparação acessível de versões;
- `components/docai/contracts/contract-review.test.tsx` — testes do fluxo visual usando dublês locais;
- `lib/docai/infrastructure/reviews/contract-review-repository.ts` — contrato interno substituível, sem provedor concreto;
- `lib/docai/infrastructure/reviews/contract-review-repository.test.ts` — testes de contrato com memória ou dublê.

Qualquer alteração em D01–D06, na fundação do Starter Kit, no schema Supabase ou em configuração exige nova revisão e aprovação.

## Arquivos proibidos

- `lib/docai/services/contract-generation-service.ts`, `lib/docai/services/ai-service.ts` e `lib/integrations/ai.ts`;
- `lib/docai/infrastructure/ai/`, Gemini, OpenAI ou qualquer adaptador de geração;
- `lib/docai/application/` e fluxos de autenticação não listados explicitamente;
- `lib/auth/`, `lib/persistence/`, `lib/documents/`, `lib/templates/`, middleware e layout do Starter Kit;
- `app/` fora das rotas de revisão explicitamente autorizadas em uma implementação posterior;
- `supabase/`, migrations, RLS, schemas, chaves e configurações de banco;
- PDF, download, e-mail, assinatura, compartilhamento, pagamentos ou armazenamento externo;
- `package.json`, lockfiles, scripts, variáveis de ambiente e arquivos de deploy;
- qualquer documentação existente ou arquivo não listado como autorizado.

## Estratégia de testes

- Testar cada transição permitida e rejeitar transições inválidas.
- Testar edição, confirmação, retorno a `in_review` e preservação da versão original.
- Testar comparação com adições, remoções, alterações, texto vazio e conteúdo não textual.
- Testar números de revisão monotônicos e histórico somente acrescentado.
- Testar isolamento por proprietário, ausência segura e conflitos de versão.
- Testar falha de persistência sem perda da versão anterior ou gravação parcial.
- Testar editor, foco, teclado, mensagens associadas, anúncios de estado e aviso de alterações não salvas.
- Testar loading, sucesso, erro e confirmação de abandono.
- Usar repositório em memória e dublês de identidade; não usar Supabase, Gemini, rede ou dados reais.
- Executar regressão das Sprints anteriores, typecheck, build e `git diff --check`.

## Critérios de aceitação

- O documento possui estados claros de rascunho, revisão e revisão concluída, compatíveis com D03.
- O usuário consegue editar manualmente uma cópia sem sobrescrever a versão original.
- A comparação mostra diferenças de forma compreensível e acessível.
- Cada revisão confirmada possui autor, número, timestamp e histórico imutável.
- Validações impedem conteúdo vazio, transições inválidas, acesso cruzado e sobrescrita silenciosa.
- A UI comunica que “aprovado” significa somente revisão humana concluída, sem validade jurídica.
- Domínio, infraestrutura e apresentação mantêm responsabilidades separadas.
- O fluxo não chama IA, provedor, exportação, pagamento ou armazenamento externo diretamente.
- Os testes cobrem ciclo de vida, histórico, isolamento, conflitos e acessibilidade.
- Somente arquivos autorizados são alterados e nenhuma dependência nova é adicionada.

## Riscos

- Confundir revisão humana com aprovação jurídica ou assinatura.
- Sobrescrever a versão original ou perder edições por concorrência.
- Expor histórico ou conteúdo a outro usuário.
- Diferenças de texto difíceis de compreender em telas pequenas ou leitores de tela.
- Divergência entre validação estruturada do domínio e edição livre do texto.
- Crescimento do histórico sem política de retenção ou custo definido.
- Antecipação indevida de exportação, persistência concreta ou integração externa.

## Critérios de encerramento

- Esta especificação for revisada e aprovada explicitamente.
- Implementação ficar limitada aos arquivos autorizados.
- Estados, edição, comparação, histórico, validações e acessibilidade possuírem testes aprovados.
- Testes, typecheck, build e `git diff --check` forem aprovados.
- Isolamento e controle de concorrência forem demonstrados sem dados reais.
- Documentação for reconciliada com o comportamento implementado.
- Commit, push, branch sincronizada e árvore limpa ocorrerem somente após aprovação do resultado.

## Dependências para a próxima Sprint

A próxima Sprint poderá definir exportação segura do conteúdo em estado `reviewed`, incluindo formato, autorização, confirmação final e política de retenção. Ela dependerá do histórico e da versão revisada definidos aqui e não poderá exportar rascunhos não revisados, introduzir assinatura, compartilhar conteúdo ou adicionar provedores sem especificação própria.
