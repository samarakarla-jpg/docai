# Sprint 05 — Persistência reutilizável e independente de banco

**Sprint:** `05 — Persistência reutilizável e independente de banco`

**Fase do Roadmap:** `Fase 3 — Serviços reutilizáveis`

**Status:** `em revisão`

Esta Sprint define a camada genérica de persistência do SaaS Starter Kit utilizada pelo DocAI. Ela deve consolidar somente o padrão comprovado pelos serviços de templates e documentos, sem criar banco, adaptador de fornecedor ou regra de produto.

# Objetivo

Disponibilizar uma interface genérica de repositório, uma implementação em memória para testes e desenvolvimento e uma suíte reutilizável de testes de contrato. `TemplateService` e `DocumentService` deverão consumir essa fronteira por injeção de dependência, preservando seus contratos públicos e permitindo futuros adaptadores, inclusive Supabase, sem acoplamento direto do domínio ou da aplicação a um banco específico.

# Escopo

- Definir `Repository<TEntity, TIdentifier>` com as operações `create`, `findById`, `list`, `update` e `remove`.
- Definir erros estáveis para conflito, ausência e falha de armazenamento.
- Implementar `InMemoryRepository` genérico, não durável e isolado por instância.
- Receber explicitamente a função que extrai o identificador da entidade.
- Tratar entidades como dados opacos, sem validar ou transformar seus campos internos.
- Criar uma suíte reutilizável de testes de contrato baseada em fábrica de repositório.
- Aplicar a suíte ao repositório em memória com entidades e identificadores distintos.
- Adaptar `TemplateStorage` e `DocumentStorage` para a interface genérica sem alterar suas APIs públicas ou regras próprias.
- Executar regressão dos testes de `TemplateService` e `DocumentService`.

# Entregas

## Contrato genérico

- Interface parametrizada por entidade e identificador.
- Cinco operações com semântica explícita.
- Ausência de `findById` representada por `null`.
- Erros internos identificáveis, seguros e com causa preservável.

## Repositório em memória

- Estado privado e independente por instância.
- Criação sem sobrescrever identificador existente.
- Atualização e remoção somente de entidades existentes.
- Listagem determinística por ordem de inserção, sem impor ordenação de produto.
- Funcionamento sem rede, banco, sistema de arquivos, configuração ou segredo.
- Documentação no código de que não é persistência de produção nem durável.

## Compatibilidade dos serviços

- `TemplateService` e `DocumentService` continuam recebendo armazenamento pelo construtor.
- `TemplateStorage` e `DocumentStorage` permanecem disponíveis como aliases ou contratos compatíveis.
- Validações, modelos, operações e erros públicos dos serviços permanecem sob responsabilidade deles.
- Nenhum serviço recebe repositório padrão ou cria armazenamento implicitamente.

## Testes

- Suporte reutilizável de testes que conhece somente a interface e uma fábrica.
- Testes do repositório em memória para CRUD, conflito, ausência, isolamento, genericidade e preservação de entidades.
- Regressão integral dos testes existentes de templates e documentos.

# Fora do Escopo

- `SupabaseRepository` ou qualquer adaptador real de Supabase.
- PostgreSQL, SQL, NoSQL, ORM, sistema de arquivos, cache ou serviço externo.
- Tabelas, schemas, migrations, seeds, queries, índices, RLS ou políticas de banco.
- Credenciais, clientes de banco, pool, conexão ou variáveis de ambiente.
- Persistência durável, backup, recuperação, replicação, transações ou sincronização.
- Paginação, busca, filtros, consultas dinâmicas ou ordenação de produto.
- Autenticação, autorização, propriedade, organizações ou multi-tenancy.
- UI, páginas, rotas, API, Server Actions, formulários ou componentes.
- IA, Gemini, prompts, pagamentos, Stripe, PDF, e-mail ou armazenamento externo.
- Regras, entidades, tabelas ou dados específicos do DocAI.
- Alteração das operações públicas ou dos modelos de `TemplateService` e `DocumentService`.
- Classe base, service locator, contêiner de injeção ou abstração universal de CRUD.
- Dependências, scripts, configurações, documentação adicional ou funcionalidades das Sprints 06 e 07.

# Requisitos

- **REQ-01 — Neutralidade:** o contrato usa somente conceitos de entidade, identificador, armazenamento e repositório.
- **REQ-02 — Contrato mínimo:** a interface expõe exclusivamente `create`, `findById`, `list`, `update` e `remove`.
- **REQ-03 — Tipagem:** entidade e identificador são genéricos, sem herança, campo fixo ou formato de produto.
- **REQ-04 — Identidade explícita:** o repositório em memória recebe uma função para obter o identificador.
- **REQ-05 — Semântica:** criação, consulta, listagem, atualização e remoção possuem resultados inequívocos.
- **REQ-06 — Erros:** conflito, ausência e falha de armazenamento são distinguíveis e não expõem detalhes sensíveis.
- **REQ-07 — Memória:** a implementação é não durável, isolada por instância e adequada apenas a testes/desenvolvimento.
- **REQ-08 — Injeção:** consumidores recebem armazenamento explicitamente e não criam dependências ocultas.
- **REQ-09 — Compatibilidade:** aliases, modelos, validações, operações e erros públicos dos serviços existentes permanecem compatíveis.
- **REQ-10 — Substituição:** um adaptador futuro pode implementar a interface sem alterar os consumidores.
- **REQ-11 — Contrato de testes:** a suíte comportamental recebe fábrica de repositório e não acessa detalhes concretos.
- **REQ-12 — Opacidade:** entidades são armazenadas e devolvidas sem interpretação, enriquecimento ou transformação.
- **REQ-13 — Regressão:** testes de `TemplateService` e `DocumentService` continuam aprovados e inalterados.
- **REQ-14 — Isolamento:** não há acesso a rede, ambiente, autenticação, interface, banco ou provedor.
- **REQ-15 — Dependências:** somente TypeScript, runtime Node.js e recursos já disponíveis são utilizados.

# Arquivos autorizados

Somente os arquivos abaixo poderão ser criados ou modificados durante a implementação:

| Arquivo | Ação autorizada | Finalidade |
| --- | --- | --- |
| `lib/persistence/repository.ts` | criar | Interface genérica, códigos e erro do repositório. |
| `lib/persistence/in-memory-repository.ts` | criar | Implementação não durável em memória. |
| `lib/persistence/repository-contract.test-support.ts` | criar | Suporte reutilizável da suíte de contrato. |
| `lib/persistence/in-memory-repository.test.ts` | criar | Aplicação do contrato e testes próprios do repositório em memória. |
| `lib/templates/template-service.ts` | modificar | Compatibilizar `TemplateStorage` com o contrato genérico, sem alterar regras públicas. |
| `lib/documents/document-service.ts` | modificar | Compatibilizar `DocumentStorage` com o contrato genérico, sem alterar regras públicas. |

Nenhum `index.ts`, barrel, adaptador externo ou arquivo auxiliar está autorizado. Se um sétimo arquivo for necessário, a implementação deverá parar para revisão formal.

# Arquivos proibidos

- Todo arquivo não listado em “Arquivos autorizados”.
- `lib/templates/template-service.test.ts` e `lib/documents/document-service.test.ts`.
- `lib/docai/`, `app/`, `public/`, `lib/auth/`, `lib/integrations/` e demais áreas do produto.
- Qualquer adaptador ou configuração de Supabase, banco, rede, IA, pagamentos, PDF, e-mail ou armazenamento externo.
- `package.json`, arquivos de lock, `tsconfig.json`, scripts, configurações e arquivos de ambiente.
- `PRODUCT_SPEC.md`, `PROJECT_STATE.md`, `ROADMAP.md`, SPRINTs, templates e demais documentos.
- `.gitignore`, `.git/`, artefatos gerados, `.next/` e `tsconfig.tsbuildinfo`.

# Dependências

## Pré-requisitos

- Sprints 03 e 04 formalmente encerradas.
- `TemplateService` e `DocumentService` disponíveis e testados.
- Contratos públicos de armazenamento atuais inspecionados.
- Aprovação formal desta Sprint e autorização explícita para implementação.
- Estado inicial do repositório registrado e alterações preexistentes identificadas.

## Dependências técnicas existentes

- TypeScript já configurado.
- Runtime Node.js e módulos nativos de teste.
- Serviços, testes e scripts existentes do Starter Kit.

## Novas dependências

**Nenhuma.** Não instalar pacotes, alterar manifestos, lockfiles, scripts, configurações ou variáveis de ambiente.

# Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Contrato genérico amplo demais | Acoplamento a hipóteses futuras | Limitar às cinco operações comprovadas. |
| Incompatibilidade nos serviços existentes | Regressão de comportamento ou tipos | Preservar aliases públicos e executar regressão integral. |
| Regras de negócio migrarem para persistência | Responsabilidades misturadas | Repositório opera sobre entidade completa e não interpreta campos. |
| Repositório em memória usado em produção | Perda de dados em reinício ou múltiplos processos | Documentar não durabilidade e exigir injeção explícita. |
| Estado compartilhado entre testes | Resultados não determinísticos | Estado privado e fábrica nova por caso. |
| Ordem em memória virar regra de produto | Adaptadores futuros incompatíveis | Manter ordenação de produto fora do contrato. |
| Tipos de fornecedor contaminarem o núcleo | Substituição difícil | Proibir imports, clientes e configurações de Supabase. |
| Alteração indireta de arquivos proibidos | Escopo e histórico contaminados | Revisar status, diff e arquivos após cada validação. |

# Plano de Implementação

1. Registrar o estado inicial e revisar os contratos de armazenamento atuais.
2. Extrair somente as operações realmente comuns entre templates e documentos.
3. Criar a interface e os erros genéricos do repositório.
4. Implementar o repositório em memória com identificador injetado e estado isolado.
5. Criar o suporte reutilizável de testes e aplicá-lo à implementação em memória.
6. Ajustar somente os dois aliases/contratos de armazenamento autorizados.
7. Executar regressão dos serviços e revisar compatibilidade pública.
8. Executar testes, typecheck, build e `git diff --check`.
9. Revisar o diff completo e confirmar os seis arquivos autorizados.

Qualquer necessidade de arquivo, dependência, configuração ou mudança pública fora desta lista interrompe a implementação.

# Plano de Testes

## Contrato do repositório

- Repositório vazio: `findById` retorna `null` e `list` retorna coleção vazia.
- Criação, consulta e listagem preservam entidades sem transformação.
- Criação duplicada retorna `CONFLICT` e preserva o original.
- Atualização existente substitui entidade; atualização ausente retorna `NOT_FOUND`.
- Remoção existente funciona; remoção ausente retorna `NOT_FOUND`.
- Duas instâncias não compartilham estado.
- Entidades e identificadores de formatos distintos são aceitos.
- Ordem de inserção em memória é determinística e atualização não reposiciona.
- Falhas controladas retornam códigos estáveis sem expor mensagem interna.

## Regressão

- Executar integralmente os testes preexistentes de `TemplateService`.
- Executar integralmente os testes preexistentes de `DocumentService`.
- Confirmar operações, validações, erros públicos e conteúdo opaco sem alterações.

## Comandos previstos

```text
node --test lib/persistence/in-memory-repository.test.ts lib/templates/template-service.test.ts lib/documents/document-service.test.ts
./node_modules/.bin/tsc --noEmit --incremental false
npm run build
git diff --check
```

Lint deverá ser executado somente se houver script oficial; sua ausência será declarada. Responsividade e acessibilidade são não aplicáveis por não haver mudança visual.

# Critérios de Aceitação

- **CA-01 — Arquivos:** somente os seis arquivos autorizados são afetados.
- **CA-02 — Contrato:** interface genérica expõe apenas as cinco operações e semânticas documentadas.
- **CA-03 — Genericidade:** entidade e identificador são parametrizáveis sem regra de produto.
- **CA-04 — Erros:** conflito, ausência e falha de armazenamento possuem códigos e mensagens seguras.
- **CA-05 — Memória:** implementação isolada por instância, não durável e sem recurso externo.
- **CA-06 — Testes de contrato:** suíte reutilizável usa somente fábrica e interface pública.
- **CA-07 — Compatibilidade:** `TemplateStorage` e `DocumentStorage` permanecem compatíveis.
- **CA-08 — Regressão:** testes dos dois serviços passam sem alteração de seus testes.
- **CA-09 — Injeção:** nenhum serviço cria repositório padrão, singleton ou estado global.
- **CA-10 — Substituição:** nenhum tipo, import ou configuração de fornecedor aparece no núcleo.
- **CA-11 — Neutralidade:** não há DocAI, autenticação, UI, IA, pagamento, PDF, e-mail ou banco específico.
- **CA-12 — Qualidade:** testes, typecheck, build e `git diff --check` concluem sem erro impeditivo.
- **CA-13 — Dependências:** nenhum pacote, script, configuração, ambiente ou lockfile é alterado.
- **CA-14 — Escopo:** nenhuma funcionalidade da Sprint 06 ou 07 é antecipada.

Cada critério deverá receber estado **atendido**, **não atendido**, **pendente** ou **não verificável**, com evidência na entrega.

# Critérios de Conclusão

- Contrato genérico, implementação em memória e suíte de contrato estão completos.
- Aliases e consumidores existentes permanecem compatíveis.
- Regressão, typecheck, build e `git diff --check` foram executados.
- Ausência de lint, limitações e riscos foram registrados quando aplicável.
- Somente os seis arquivos autorizados foram afetados.
- Nenhuma dependência, configuração, integração ou funcionalidade fora do escopo foi introduzida.
- Todos os critérios de aceitação têm evidência.
- A Sprint é apresentada como tecnicamente concluída e aguardando aprovação explícita.

# Commit Esperado

**Mensagem proposta:** `feat: add reusable repository layer`

**Arquivos previstos:**

- `lib/persistence/repository.ts`
- `lib/persistence/in-memory-repository.ts`
- `lib/persistence/repository-contract.test-support.ts`
- `lib/persistence/in-memory-repository.test.ts`
- `lib/templates/template-service.ts`
- `lib/documents/document-service.ts`

A definição da mensagem não autoriza commit, push, publicação ou alteração de qualquer arquivo fora da lista.

# Observações

- `InMemoryRepository` é apropriado somente para testes e desenvolvimento local; reinício do processo perde os dados.
- Um futuro adaptador Supabase deverá implementar o contrato interno sem expor tipos de fornecedor às camadas superiores.
- O repositório não resolve autorização, multi-tenancy, paginação, transações ou durabilidade.
- A Sprint não altera a documentação de estado do projeto; essa atualização exige autorização própria.
