# Sprint 04 — Gerenciamento de rascunhos de contratos do DocAI

**Produto:** DocAI

**Sprint:** `04 — Ciclo de vida de rascunhos`

**Fase do Roadmap:** Domínio e persistência de rascunhos

**Status:** `encerrada`

Esta Sprint substitui a documentação genérica anterior e descreve uma entrega exclusiva do DocAI. Ela utiliza `ContractService`, `DocumentService` e os contratos de armazenamento já existentes, sem criar integração concreta com banco de dados ou alterar a fundação do Starter Kit.

# Objetivo

Disponibilizar o caso de uso específico do DocAI para gerenciar o ciclo de vida de rascunhos de contratos, mantendo o conteúdo tipado pelos quatro modelos do produto e delegando armazenamento ao `ContractService` existente. A entrega deve permitir consultar, listar, atualizar e excluir rascunhos por interfaces injetadas, com regras de estado específicas do DocAI, sem autenticação, Supabase, UI ou chamadas externas.

# Escopo

- Criar uma camada de aplicação específica para o gerenciamento de rascunhos do DocAI.
- Consultar um rascunho por identificador usando `ContractService`.
- Listar rascunhos usando `ContractService`, preservando os tipos dos quatro contratos.
- Atualizar título e conteúdo de um rascunho por meio do serviço existente.
- Excluir um rascunho por meio do serviço existente.
- Validar comandos de leitura, listagem, atualização e exclusão na fronteira da aplicação.
- Retornar resultados e erros estruturados, sem expor detalhes de armazenamento.
- Manter o armazenamento substituível por injeção e sem adapter de banco concreto.
- Criar testes unitários com dublês das dependências existentes.

# Entregas

- Caso de uso `ManageContractDrafts` ou contrato equivalente para as operações de gerenciamento.
- Comandos tipados para leitura, listagem, atualização e exclusão.
- Validação de identificadores, títulos e conteúdo conforme os modelos existentes.
- Resultado discriminado para sucesso, ausência e falha.
- Delegação exclusiva ao `ContractService`, sem acesso direto a repositório ou infraestrutura.
- Testes unitários dos quatro tipos de contrato e das falhas relevantes.

# Fora do Escopo

- Criação de novos rascunhos; ela permanece no fluxo da Sprint 02/03.
- Páginas React, componentes UI, rotas, API Routes, Server Actions ou middleware.
- Autenticação, autorização, sessão, usuário, organização ou multi-tenancy.
- Supabase, banco de dados real, migrations, políticas RLS ou armazenamento externo.
- Gemini, OpenAI, prompts, nova geração de IA ou chamadas HTTP.
- Stripe, pagamentos, PDF, e-mail, compartilhamento ou assinatura.
- Versionamento, histórico, publicação, aprovação jurídica, comentários ou colaboração.
- Alteração de `ContractService`, `DocumentService`, `TemplateService`, `AIService` ou modelos anteriores, salvo revisão formal.
- Alteração de dependências, configurações, documentação ou scripts.

# Requisitos

- **REQ-01 — Contrato de gerenciamento:** expor somente operações de obter, listar, atualizar e remover rascunhos.
- **REQ-02 — Delegação:** utilizar `ContractService` por interface injetada, sem instanciar infraestrutura.
- **REQ-03 — Conteúdo tipado:** preservar os quatro tipos de contrato e delegar a validação de conteúdo ao serviço existente.
- **REQ-04 — Entrada:** rejeitar identificadores vazios, títulos inválidos, conteúdo ausente e atualizações sem campos autorizados.
- **REQ-05 — Resultados:** retornar sucesso discriminado com rascunhos tipados e erros com código estável.
- **REQ-06 — Ausência:** representar rascunho inexistente sem expor detalhes do armazenamento.
- **REQ-07 — Isolamento:** não conhecer autenticação, framework web, banco ou fornecedor.
- **REQ-08 — Testabilidade:** permitir dublês do `ContractService` e execução sem rede, credenciais ou persistência real.
- **REQ-09 — Compatibilidade:** preservar integralmente os contratos e o comportamento das Sprints anteriores.

# Arquivos autorizados

| Arquivo | Ação autorizada | Finalidade |
| --- | --- | --- |
| `lib/docai/application/manage-contract-drafts.ts` | criar | Caso de uso de leitura, listagem, atualização e exclusão de rascunhos. |
| `lib/docai/application/manage-contract-drafts.test.ts` | criar | Testes unitários do gerenciamento e da delegação. |

Somente esses dois arquivos poderão ser criados ou alterados. Se a solução exigir qualquer outro arquivo, a implementação deverá parar para revisão.

# Arquivos proibidos

- Todo arquivo não listado em “Arquivos autorizados”.
- `lib/docai/domain/`, `lib/docai/services/` e os casos de uso das Sprints 02 e 03.
- `lib/documents/`, `lib/templates/`, `lib/persistence/` e `lib/integrations/`.
- `app/`, páginas, componentes, layouts, rotas, API Routes, Server Actions e middleware.
- `lib/auth/`, arquivos de ambiente, manifestos, lockfiles, scripts e configurações.
- `PRODUCT_SPEC.md`, `PROJECT_STATE.md`, `ROADMAP.md` e qualquer Sprint anterior.
- Código de Gemini, OpenAI, Supabase, Stripe, PDF, e-mail ou armazenamento externo.

# Dependências

## Pré-requisitos

- Sprints 01, 02 e 03 do DocAI aprovadas e disponíveis.
- `ContractService` existente com operações de leitura, listagem, atualização e remoção.
- Modelos de contrato e erros das camadas anteriores preservados.

## Dependências técnicas existentes

- TypeScript e runtime Node.js já configurados.
- Contratos genéricos de `DocumentService` e armazenamento usados indiretamente pelo `ContractService`.

## Novas dependências

Nenhuma. Não instalar pacotes nem alterar configuração, manifesto ou arquivo de lock.

# Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Duplicação das regras do `ContractService` | Divergência de comportamento | Manter o caso de uso como orquestrador e delegar validação de domínio. |
| Confusão entre rascunho e documento publicado | Uso indevido do resultado | Nomear contratos como rascunhos e manter publicação fora do escopo. |
| Inclusão de autorização na camada errada | Acoplamento a autenticação futura | Não receber usuário nem implementar autorização nesta Sprint. |
| Acoplamento a Supabase | Dificuldade de substituição | Usar somente interfaces e injeção do serviço existente. |
| Listagem sem paginação | Limitação futura de volume | Registrar como limitação; paginação exige Sprint própria. |

# Plano de Implementação

1. Confirmar estado inicial e contratos públicos do `ContractService`.
2. Definir comandos e resultados neutros da camada de gerenciamento.
3. Implementar leitura, listagem, atualização e exclusão por dependência injetada.
4. Implementar validação de entrada e mapeamento seguro de erros.
5. Criar testes com dublês para os quatro modelos e todas as operações.
6. Revisar o diff e confirmar que somente os arquivos autorizados foram afetados.
7. Executar testes, typecheck, build e `git diff --check`.

# Plano de Testes

- Obter rascunho existente e retornar seu tipo correto.
- Listar rascunhos de todos os quatro modelos sem transformar conteúdo.
- Atualizar título e conteúdo separadamente.
- Remover rascunho e confirmar delegação correta.
- Rejeitar id vazio, título vazio, conteúdo inválido e atualização vazia antes da dependência.
- Representar ausência do rascunho com erro estável.
- Traduzir falhas inesperadas do `ContractService` sem expor detalhes internos.
- Confirmar que cada operação chama apenas o método correspondente uma vez.
- Confirmar que os testes executam sem framework web, rede, banco ou provedor.

Comandos previstos:

```text
node --test lib/docai/application/manage-contract-drafts.test.ts lib/docai/application/request-contract-creation.test.ts lib/docai/application/contract-creation-service.test.ts lib/docai/services/contract-service.test.ts lib/docai/domain/contract-models.test.ts
./node_modules/.bin/tsc --noEmit --incremental false
npm run build
git diff --check
```

# Critérios de Aceitação

- **CA-01 — Operações:** obter, listar, atualizar e remover são suportadas pelo caso de uso.
- **CA-02 — Delegação:** todas as operações usam somente a interface injetada do `ContractService`.
- **CA-03 — Tipos:** os quatro modelos são preservados sem transformação indevida.
- **CA-04 — Validação:** entradas inválidas são rejeitadas antes da chamada dependente.
- **CA-05 — Resultados:** sucessos e erros possuem estruturas discriminadas e mensagens seguras.
- **CA-06 — Ausência:** rascunho inexistente é distinguido de falha interna.
- **CA-07 — Independência:** nenhuma dependência de UI, framework, autenticação, banco ou provedor é introduzida.
- **CA-08 — Compatibilidade:** serviços e casos de uso anteriores permanecem inalterados e compatíveis.
- **CA-09 — Testes:** todos os cenários previstos possuem cobertura unitária.
- **CA-10 — Escopo:** somente os dois arquivos autorizados são alterados, sem dependências ou configurações novas.

# Critérios de Conclusão

- Os dois arquivos autorizados estão implementados e revisados.
- O ciclo de gerenciamento delega corretamente ao `ContractService`.
- Validações, resultados e erros estão cobertos pelos testes.
- Testes, typecheck, build e `git diff --check` passam.
- Nenhuma integração, UI, autenticação, persistência concreta ou documentação foi alterada.
- O diff final contém somente os arquivos autorizados.
- A Sprint está encerrada após implementação, validação e aprovação documental.

# Commit Esperado

**Mensagem proposta:** `feat: add DocAI contract draft management`

**Arquivos previstos:**

- `lib/docai/application/manage-contract-drafts.ts`
- `lib/docai/application/manage-contract-drafts.test.ts`

O commit futuro deverá conter somente esses dois arquivos; esta documentação não autoriza commit, push ou publicação.

# Encerramento e validação

A implementação foi concluída no commit `b6d96024193cb722c080455ff44da8b8c27c42b0`.

- Arquivos: `lib/docai/application/manage-contract-drafts.ts` e `lib/docai/application/manage-contract-drafts.test.ts`.
- Testes completos: 63 aprovados, sem falhas.
- Typecheck, build e `git diff --check`: aprovados.
- Critérios CA-01 a CA-10: atendidos.

A Sprint 04 está encerrada.
