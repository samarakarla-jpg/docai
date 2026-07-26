# Domínio e serviços de contratos do DocAI

**Sprint:** `01 — Domínio e serviços de contratos`

**Fase do Roadmap:** Fundação do produto e camada de domínio

**Status:** `encerrada`

Esta Sprint registra a implementação aprovada no commit `711e76f7b202c178e1faf879e98515710499cab6`.

# Objetivo

Disponibilizar a camada de domínio do DocAI para os quatro tipos de contrato previstos, com serviços específicos do produto apoiados pelos contratos genéricos do SaaS Starter Kit. A entrega cobre validação de dados, ciclo de vida de rascunhos, gerenciamento de templates e preparação da geração assistida por IA, sem páginas, persistência concreta ou integração com provedores externos.

# Escopo

- Definição dos modelos neutros de contrato para Prestação de Serviços, Compra e Venda, Aluguel e Empréstimo.
- Criação do `TemplateService` específico do DocAI, reutilizando o serviço genérico de templates.
- Criação do `ContractService`, utilizando o `DocumentService` existente para o ciclo de vida de rascunhos.
- Criação do `AIService`, utilizando a interface genérica `AiAdapter` sem chamada real a Gemini ou outro provedor.
- Validações de entrada e tradução estável dos erros dos serviços.
- Testes unitários dos modelos e serviços, além da regressão dos serviços genéricos relacionados.

# Fora do Escopo

- Páginas, rotas, componentes visuais, layout ou fluxos de usuário.
- Autenticação, autorização e gerenciamento de usuários.
- Supabase, Stripe, Vercel, chamadas HTTP ou qualquer integração externa.
- Integração real com Gemini, OpenAI ou outro fornecedor de IA.
- Implementação de adaptadores de persistência, banco de dados ou armazenamento externo.
- Geração de PDF, envio de e-mail, pagamentos ou assinatura.
- Prompts de produto, geração jurídica automatizada e aconselhamento legal.
- Alterações na documentação do produto, dependências, configurações ou scripts.
- Funcionalidades adicionais dos contratos além dos quatro tipos definidos.

# Requisitos

- **REQ-01 — Modelos de contrato:** representar os quatro tipos de contrato com uniões discriminadas e conteúdo específico, preservando um contrato de dados neutro.
- **REQ-02 — Templates do DocAI:** permitir criar, consultar, listar, atualizar e remover templates por meio de um `TemplateService` específico que delega ao serviço genérico existente.
- **REQ-03 — Rascunhos de contrato:** permitir criar, consultar, listar, atualizar e remover rascunhos usando o `DocumentService` existente, mantendo o tipo de contrato.
- **REQ-04 — Validação:** rejeitar tipos não suportados, campos obrigatórios ausentes, partes sem nome e atualizações vazias com erros previsíveis.
- **REQ-05 — Preparação para IA:** aceitar um `AiAdapter` genérico injetado, validar o tipo da solicitação e devolver o resultado sem acoplamento a provedor.
- **REQ-06 — Compatibilidade:** preservar os contratos e o comportamento do Starter Kit e manter os testes existentes aprovados.
- **REQ-07 — Restrições:** não alterar páginas, integrações, configurações, dependências ou documentação durante a implementação.

# Arquivos autorizados para alteração

| Arquivo | Ação autorizada | Finalidade |
| --- | --- | --- |
| `lib/docai/domain/contract-models.ts` | criar | Tipos e contratos de dados dos quatro modelos. |
| `lib/docai/domain/contract-models.test.ts` | criar | Testes dos tipos suportados. |
| `lib/docai/services/template-service.ts` | criar | Serviço de templates específico do DocAI sobre a abstração genérica. |
| `lib/docai/services/template-service.test.ts` | criar | Testes do ciclo de vida e validações de templates. |
| `lib/docai/services/contract-service.ts` | criar | Serviço de rascunhos apoiado pelo `DocumentService`. |
| `lib/docai/services/contract-service.test.ts` | criar | Testes do ciclo de vida e validações de contratos. |
| `lib/docai/services/ai-service.ts` | criar | Serviço de geração apoiado por `AiAdapter`. |
| `lib/docai/services/ai-service.test.ts` | criar | Testes do adaptador genérico e da tradução de erros. |

Os oito arquivos acima foram efetivamente criados no commit de implementação. Nenhum outro arquivo pertenceu à implementação desta Sprint.

# Arquivos proibidos

- Todo arquivo não listado em “Arquivos autorizados para alteração”.
- `PRODUCT_SPEC.md`, `ROADMAP.md`, `PROJECT_STATE.md` e demais documentos do produto.
- `package.json`, arquivos de lock, `tsconfig.json`, scripts e variáveis de ambiente.
- Diretórios de páginas, rotas, componentes, autenticação e infraestrutura.
- Implementações ou configurações específicas de Supabase, Stripe, Gemini, OpenAI, Vercel ou HTTP.
- Os serviços genéricos existentes do Starter Kit; eles podem ser consumidos por importação, mas não modificados.

# Critérios de Aceitação

- **CA-01 — Tipos suportados:** os quatro modelos de contrato são representados e cobertos por teste.
- **CA-02 — TemplateService:** o serviço específico cria, consulta, lista, atualiza e remove templates, reutilizando a abstração genérica e rejeitando entradas inválidas.
- **CA-03 — ContractService:** o serviço cria, consulta, lista, atualiza e remove rascunhos por meio do `DocumentService`, validando partes e campos obrigatórios de cada tipo.
- **CA-04 — AIService:** o serviço aceita `AiAdapter` por injeção, valida a solicitação e traduz falhas do adaptador sem chamar um provedor real.
- **CA-05 — Isolamento:** não existem páginas, chamadas HTTP, integrações reais, dependências novas ou mudanças de configuração introduzidas.
- **CA-06 — Regressão:** os testes dos serviços genéricos de documentos, templates e persistência continuam aprovados.
- **CA-07 — Qualidade:** typecheck, build e verificação do diff foram concluídos sem erro.
- **CA-08 — Escopo:** somente os oito arquivos autorizados foram alterados no commit de implementação.

Todos os critérios foram atendidos. Evidências detalhadas constam no plano de validação e nos resultados registrados abaixo.

# Checklist Técnico

- [x] **Lint:** não há script de lint configurado no projeto; declarado não aplicável.
- [x] **Typecheck:** `./node_modules/.bin/tsc --noEmit --incremental false` executado com sucesso.
- [x] **Build:** `npm run build` executado com sucesso.
- [x] **Testes:** testes DocAI e regressão do Starter Kit executados; 50 testes passaram.
- [x] **Responsividade:** não aplicável; não houve mudança visual.
- [x] **Acessibilidade básica:** não aplicável; não houve mudança de interface.

# Critérios de Revisão

- A implementação foi comparada com o escopo desta Sprint e com a arquitetura do Starter Kit.
- Os serviços específicos dependem das interfaces genéricas existentes e não introduzem provedores concretos.
- A validação foi mantida no domínio; não foram criados fluxos de produto, UI ou infraestrutura.
- O diff do commit de implementação contém somente os oito arquivos autorizados.
- Não foram alterados dependências, configurações, documentação ou arquivos de lock.

# Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Modelos de contrato evoluírem com requisitos jurídicos adicionais | Alterações incompatíveis no domínio | Manter uniões discriminadas e validar mudanças em Sprint própria. |
| Saída de IA permanecer sem estrutura jurídica garantida | Resultado inadequado para uso legal | O `AIService` somente delega ao adaptador; geração real e políticas de revisão ficam fora desta Sprint. |
| Falha de adaptador ser confundida com erro de domínio | Diagnóstico inconsistente | Traduzir falhas para erro estável `ADAPTER_FAILURE` e manter o provedor fora do serviço. |
| Expansão para integrações ou persistência concreta | Acoplamento e aumento de escopo | Interfaces são injetadas e nenhuma implementação externa foi autorizada. |

# Dependências

## Pré-requisitos

- Starter Kit v1.0.0 disponível no repositório DocAI.
- Contratos genéricos existentes de `TemplateService`, `DocumentService`, repositório e `AiAdapter`.
- Documentação inicial do produto DocAI aprovada.

## Dependências técnicas existentes

- TypeScript e runtime já presentes no projeto.
- Serviços genéricos e testes do Starter Kit utilizados sem modificação.

## Novas dependências

Nenhuma. Não foram instaladas bibliotecas, adicionados provedores ou alteradas configurações.

# Plano de Implementação

1. Inspecionar os contratos genéricos e registrar o estado inicial do repositório.
2. Definir os modelos discriminados dos quatro contratos.
3. Implementar o `TemplateService` específico sobre o serviço genérico existente.
4. Implementar o `ContractService` usando o `DocumentService` e as validações de domínio.
5. Implementar o `AIService` com `AiAdapter` injetado e sem integração concreta.
6. Adicionar os testes unitários correspondentes e executar a regressão existente.
7. Revisar o diff, executar as validações e preparar o commit único da implementação.

# Plano de Validação

| Item | Método de validação | Evidência |
| --- | --- | --- |
| CA-01 | `node --test lib/docai/domain/contract-models.test.ts ...` | Os quatro tipos são aceitos; conjunto completo com 50 testes aprovados. |
| CA-02 | Testes de `template-service.test.ts` | CRUD, validação e delegação ao serviço genérico aprovados. |
| CA-03 | Testes de `contract-service.test.ts` | CRUD de rascunhos, mapeamento de tipo e validações aprovados. |
| CA-04 | Testes de `ai-service.test.ts` | Adaptador injetado, validação e erro estável aprovados; nenhuma chamada externa. |
| CA-05 e CA-08 | `git diff` e inspeção do commit `711e76f7b202c178e1faf879e98515710499cab6` | Somente os oito arquivos autorizados; sem dependências ou configurações. |
| CA-06 | Regressão de documentos, templates e persistência | Testes existentes incluídos no conjunto de 50 aprovações. |
| CA-07 | `./node_modules/.bin/tsc --noEmit --incremental false`, `npm run build`, `git diff --check` | Typecheck, build e diff concluídos sem erro. |

Comando de testes executado:

```text
node --test lib/docai/domain/contract-models.test.ts lib/docai/services/contract-service.test.ts lib/docai/services/template-service.test.ts lib/docai/services/ai-service.test.ts lib/integrations/contracts.test.ts lib/integrations/optional-capability.test.ts lib/persistence/in-memory-repository.test.ts lib/templates/template-service.test.ts lib/documents/document-service.test.ts
```

# Entrega Esperada

- **Arquivos efetivamente alterados:** os oito arquivos listados em “Arquivos autorizados para alteração”.
- **Commit de implementação:** `711e76f7b202c178e1faf879e98515710499cab6` — `feat: add DocAI contract domain services`.
- **Testes:** 50 testes aprovados.
- **Typecheck:** aprovado com `--incremental false`.
- **Build:** aprovado.
- **Diff:** `git diff --check` aprovado.
- **Riscos remanescentes:** os riscos descritos acima permanecem para futuras Sprints; nenhuma integração externa ou garantia de validade jurídica foi implementada.

# Commit Esperado

**Mensagem de implementação:** `feat: add DocAI contract domain services`

**Commit de implementação:** `711e76f7b202c178e1faf879e98515710499cab6`

**Mensagem desta documentação:** `docs: document DocAI Sprint 01`

**Arquivo previsto para este commit documental:** `SPRINT_01.md` somente.

O commit documental deve conter somente este arquivo. O push dos commits de implementação e documentação ocorre apenas mediante a autorização registrada para esta tarefa.

# Critérios de Conclusão

- Os oito arquivos de implementação foram revisados contra o objetivo, requisitos e critérios desta Sprint.
- Os testes, typecheck, build e `git diff --check` foram executados com sucesso.
- A implementação não alterou documentação, dependências, configurações ou integrações externas.
- O commit de implementação foi identificado e permanece separado do commit desta documentação.
- Esta documentação foi criada para registrar fielmente a entrega já aprovada.
- Com o commit documental e o push solicitados concluídos, a branch deverá estar sincronizada com `origin/main` e sem arquivos pendentes.

# Observações

- Esta Sprint descreve a primeira implementação específica do DocAI sobre o Starter Kit; o roadmap do produto continua responsável por orientar as próximas expansões.
- A camada de IA é apenas um contrato de serviço com adaptador injetado. Gemini e demais provedores permanecem deliberadamente fora do escopo.
- Os modelos representam dados e validações de domínio; não constituem aconselhamento jurídico nem substituem revisão profissional.
