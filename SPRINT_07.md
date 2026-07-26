# Sprint 07 — Capacidades opcionais e preparação da versão 1.0 do DocAI

**Produto:** DocAI

**Sprint:** `07 — Contratos opcionais e fechamento técnico`

**Fase do Roadmap:** `Fase 5 — Integrações opcionais e preparação da versão 1.0`

**Status:** `em revisão`

Esta é a Sprint final planejada para a primeira versão técnica do DocAI. Ela adapta as portas opcionais do Starter Kit ao contexto do produto sem implementar Gemini, Stripe, Supabase, Resend, Vercel ou qualquer outro fornecedor. A existência de um contrato ou adaptador nulo não habilita integração, cobrança, envio, geração ou armazenamento reais.

# Objetivo

Disponibilizar contratos internos, adaptadores nulos e configuração segura para as capacidades opcionais que o DocAI poderá utilizar futuramente: geração de IA, pagamentos, PDF, e-mail e armazenamento externo. Todas as capacidades deverão permanecer desativadas por padrão, substituíveis por injeção e independentes de provedor, permitindo validar a estabilidade técnica do Starter Kit e documentar a clonagem e a preparação da versão 1.0 sem transformar o DocAI em um produto integrado ou pronto para cobrança.

# Escopo

- Definir contrato neutro de IA para futura integração com Gemini ou outro provedor.
- Definir contrato neutro de pagamentos para futura integração com Stripe ou outro gateway.
- Definir contrato neutro de PDF, sem geração ou conversão real.
- Definir contrato neutro de e-mail, sem envio real ou dependência de Resend.
- Definir contrato neutro de armazenamento externo de objetos/arquivos, distinto do `Repository` da Sprint 05.
- Definir estado comum de capacidade desativada, habilitada ou configuração inválida.
- Fornecer adaptadores nulos que falham de modo previsível e não inicializam clientes externos.
- Manter configuração opcional somente no ambiente de servidor, sem segredos versionados.
- Criar testes de contrato, estado desativado e ausência de efeitos externos.
- Documentar clonagem, instalação reproduzível, execução, validação e substituição das capacidades.
- Revalidar as Sprints 01 a 06 e registrar critérios objetivos para propor a estabilidade da versão 1.0.

# Entregas

## IA

- Solicitação e resultado genéricos, sem modelo, prompt, agente ou formato proprietário.
- Adaptador nulo desativado por padrão.
- Nenhuma chamada a Gemini, OpenAI ou outro modelo.

## Pagamentos

- Intenção e resultado internos mínimos, sem checkout, plano, assinatura ou moeda proprietária.
- Adaptador nulo sem cobrança, webhook, reembolso ou conciliação.
- Nenhuma chave ou cliente Stripe.

## PDF

- Porta para uma solicitação e resultado documental/binarizado somente no limite necessário.
- Adaptador nulo sem gerar, ler, converter, renderizar ou armazenar PDF.

## E-mail

- Mensagem mínima e resultado interno de envio.
- Adaptador nulo sem SMTP, API, fila, template de produto ou Resend.

## Armazenamento externo

- Contrato mínimo para objetos/arquivos, separado do repositório de entidades da Sprint 05.
- Nenhum bucket, URL pública, upload, download, cliente Supabase Storage ou S3.

## Configuração, testes e documentação

- Estado opcional comum e erros estáveis para desativação, configuração inválida e falha de adaptador.
- Testes executáveis sem rede, credenciais, SDK ou serviço externo.
- README atualizado com clonagem, execução básica, testes, configuração opcional e substituição.
- `.env.example` contendo apenas nomes e comentários, sem valores reais.
- PROJECT_STATE atualizado somente para registrar evidências finais, se a execução autorizar essa alteração.

# Fora do Escopo

- Integração real com Gemini, OpenAI, Stripe, Supabase, Resend, Vercel ou qualquer outro fornecedor.
- Instalação de SDKs, clientes, bibliotecas de PDF, gateways ou provedores de e-mail/storage.
- Chamadas reais a modelos, gateways, renderizadores, SMTP, APIs ou serviços de objetos.
- Prompts, geração de conteúdo, agentes, embeddings, classificação ou busca vetorial.
- Checkout, cobrança, assinatura, reembolso, faturamento, webhook ou dados financeiros.
- Geração, leitura, conversão, renderização, visualização ou exportação de PDF.
- Envio de e-mail, notificações, campanhas, filas, retries ou rastreamento de entrega.
- Upload, download, streaming, URL assinada ou armazenamento real de arquivos.
- Alteração de autenticação, sessão, proteção de rotas ou Supabase Auth existente.
- Alteração da UI, páginas, dashboard, contratos de domínio ou serviços das Sprints 01 a 06.
- Regras, telas, dados, prompts ou identidade visual adicionais do DocAI.
- Banco de produto, migrations, schemas, RLS, persistência durável ou autorização nova.
- Registro global de plugins, descoberta automática ou sistema universal de integrações.
- Telemetria, analytics, observabilidade de produção ou garantias de escala.
- Tag, release, deploy, publicação, cobrança ou declaração automática de versão 1.0.

# Requisitos

- **REQ-01 — Neutralidade:** contratos, erros, testes e documentação não dependem de marca, domínio ou fornecedor.
- **REQ-02 — Separação:** IA, pagamentos, PDF, e-mail e storage possuem contratos independentes.
- **REQ-03 — Mínimo necessário:** cada contrato expõe apenas operações justificadas, sem opções hipotéticas.
- **REQ-04 — Substituição:** adaptadores futuros implementam contratos internos sem alterar consumidores.
- **REQ-05 — Desativação padrão:** ausência de configuração ou adaptador mantém a capacidade inativa.
- **REQ-06 — Erros:** desativação, configuração inválida e falha de adaptador possuem códigos internos estáveis.
- **REQ-07 — Configuração segura:** valores sensíveis ficam no servidor e não são versionados ou enviados ao cliente.
- **REQ-08 — Sem efeitos externos:** contratos e adaptadores nulos não fazem rede nem inicializam SDK.
- **REQ-09 — Storage distinto:** storage de objetos não substitui nem amplia o `Repository` de entidades.
- **REQ-10 — Injeção:** capacidades são recebidas explicitamente, sem singleton, registro global ou implementação oculta.
- **REQ-11 — Compatibilidade:** autenticação, domínio, aplicação, persistência e interface anteriores continuam compatíveis.
- **REQ-12 — Testabilidade:** testes executam sem rede, credenciais, dependências novas ou ambiente externo.
- **REQ-13 — Clonagem:** documentação permite clonar, instalar, executar, testar e entender capacidades desligadas.
- **REQ-14 — Dependências:** nenhum pacote, script, configuração ou lockfile novo é introduzido.
- **REQ-15 — Estabilidade:** critérios de versão 1.0 dependem de evidências e pendências explícitas, não de release automático.

# Arquivos autorizados

Somente os arquivos abaixo poderão ser criados ou modificados:

| Arquivo | Ação autorizada | Finalidade |
| --- | --- | --- |
| `lib/integrations/optional-capability.ts` | criar | Estado comum, erros e comportamento desativado. |
| `lib/integrations/ai.ts` | criar | Contrato neutro de IA e adaptador nulo. |
| `lib/integrations/payments.ts` | criar | Contrato neutro de pagamentos e adaptador nulo. |
| `lib/integrations/pdf.ts` | criar | Contrato neutro de PDF e adaptador nulo. |
| `lib/integrations/mail.ts` | criar | Contrato neutro de e-mail e adaptador nulo. |
| `lib/integrations/storage.ts` | criar | Contrato neutro de storage externo, distinto do repositório. |
| `lib/integrations/contracts.test.ts` | criar | Testes dos cinco contratos e de sua neutralidade. |
| `lib/integrations/optional-capability.test.ts` | criar | Testes de estados, erros e desativação padrão. |
| `README.md` | modificar | Clonagem, instalação, execução, validação e substituição. |
| `.env.example` | modificar | Nomes e comentários de configurações opcionais sem segredos. |
| `PROJECT_STATE.md` | modificar | Evidências e pendências finais, somente se autorizada pela execução. |

A lista é fechada. Nenhum `index.ts`, barrel, adaptador concreto, registro global ou arquivo auxiliar está autorizado. Qualquer décimo segundo arquivo ou dependência exige revisão formal.

# Arquivos proibidos

- Todo arquivo não listado acima.
- `app/`, `components/`, `lib/auth/`, `lib/templates/`, `lib/documents/`, `lib/persistence/` e `middleware.ts`.
- `package.json`, lockfiles, `tsconfig.json`, scripts, configurações e arquivos de ambiente não autorizados.
- Todas as Sprints, templates e documentos, exceto `README.md`, `.env.example` e `PROJECT_STATE.md` conforme a finalidade listada.
- SDKs, clientes, tipos, chaves, tokens ou configurações de Gemini, OpenAI, Stripe, Supabase, Resend ou outros fornecedores.
- Arquivos dentro de `.git/`, artefatos gerados, `.next/`, `tsconfig.tsbuildinfo` e temporários.

# Dependências

## Pré-requisitos

- Sprints 01 a 06 encerradas e preservadas.
- Contratos de persistência, aplicação, domínio, autenticação e interface sem regressão conhecida.
- Necessidade e operação mínima de cada capacidade revisadas.
- Estratégia de configuração por ambiente definida sem valores sensíveis no repositório.
- Aprovação formal desta Sprint e autorização explícita para implementação.
- Estado inicial limpo ou alterações preexistentes identificadas.

## Dependências técnicas existentes

- TypeScript, Node.js, Next.js, React, Tailwind e módulos nativos já disponíveis.
- Contratos, testes e scripts das Sprints anteriores.
- Git e documentação existente para validação de escopo e clonagem.

## Novas dependências

**Nenhuma.** Não instalar pacotes, SDKs, clientes, serviços, scripts, variáveis de ambiente ou alterar lockfiles.

# Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Contratos especulativos | APIs sem consumidor real | Limitar cada porta ao caso de uso mínimo e exigir justificativa atual. |
| Capacidade opcional virar obrigatória | Clones sem configuração deixam de executar | Estado desligado por padrão e build sem ambiente externo. |
| Segredo exposto | Comprometimento de credenciais | `.env.example` sem valores e leitura somente no servidor. |
| Acoplamento a fornecedor | Troca de provedor exige reescrita | Proibir SDKs, tipos e nomenclatura proprietária no núcleo. |
| Storage confundido com Repository | Responsabilidades e dados misturados | Contratos e testes separados, com documentação explícita. |
| Falsa estabilidade 1.0 | Release sem evidência operacional | Checklist de clonagem, validação, riscos e aprovação separada. |
| Regressão das Sprints anteriores | Perda de autenticação, domínio ou UI | Arquivos anteriores proibidos e regressão integral. |
| Alterações indiretas | Escopo e histórico contaminados | Revisar status, diff e lista de arquivos após cada validação. |

# Plano de Implementação

1. Confirmar pré-requisitos e estado inicial.
2. Definir operação mínima e estado desligado de cada capacidade.
3. Criar contrato comum de estado e erros.
4. Criar separadamente os cinco contratos e adaptadores nulos.
5. Criar testes sem rede, credenciais ou SDK.
6. Atualizar README, `.env.example` e estado do projeto somente dentro do escopo autorizado.
7. Executar regressão, typecheck, build e inspeções de segurança/escopo.
8. Validar clonagem e execução básica sem integrações.
9. Revisar critérios de estabilidade e preparar a entrega para aprovação.

Se qualquer etapa exigir integração concreta, arquivo, dependência ou decisão adicional, a implementação deverá parar.

# Plano de Validação

- Testar cada contrato e seu adaptador nulo sem rede.
- Confirmar estados desativado, habilitado e configuração inválida.
- Confirmar erros seguros e ausência de detalhes de fornecedor.
- Executar regressão dos testes das Sprints 03 a 06.
- Executar typecheck, build e `git diff --check`.
- Revisar README e `.env.example` para clonagem reproduzível e ausência de segredos.
- Inspecionar imports, clientes, SDKs, chamadas externas e tipos proprietários.
- Revalidar responsividade, teclado, foco, contraste e semântica da Sprint 06.
- Confirmar que somente os onze arquivos autorizados foram afetados.
- Registrar riscos, limitações, pendências e verificações não executadas.

Comandos previstos:

```text
node --test lib/integrations/contracts.test.ts lib/integrations/optional-capability.test.ts lib/persistence/in-memory-repository.test.ts lib/templates/template-service.test.ts lib/documents/document-service.test.ts
./node_modules/.bin/tsc --noEmit --incremental false
npm run build
git diff --check
```

Lint será executado somente se houver script oficial. Não instalar ferramentas para satisfazer o plano.

# Critérios de Aceitação

- **CA-01 — Contratos:** existem cinco contratos separados, pequenos e neutros.
- **CA-02 — Neutralidade:** nenhum tipo, erro, teste ou nome depende de API ou marca proprietária.
- **CA-03 — Operações:** cada contrato expõe somente operações justificadas.
- **CA-04 — Substituição:** adaptadores futuros podem ser injetados sem alterar consumidores.
- **CA-05 — Desativação:** capacidades permanecem desligadas sem configuração e adaptador explícitos.
- **CA-06 — Erros:** desativação, configuração inválida e falha de adaptador são distinguíveis e seguras.
- **CA-07 — Configuração:** nenhum segredo ou valor real é versionado ou enviado ao cliente.
- **CA-08 — Efeitos:** testes e execução básica não fazem rede nem inicializam SDKs.
- **CA-09 — Storage:** contrato de objetos/arquivos é separado do `Repository` de entidades.
- **CA-10 — Testes:** testes dos contratos e estados passam sem ambiente externo.
- **CA-11 — Regressão:** Sprints 03 a 06 permanecem compatíveis.
- **CA-12 — Clonagem:** README documenta clonagem, instalação, execução, testes e substituição.
- **CA-13 — Dependências:** nenhum pacote, script, configuração ou lockfile é alterado.
- **CA-14 — Integrações:** não existem SDKs, clientes, chamadas, webhooks ou efeitos reais.
- **CA-15 — Produto:** nenhuma regra, tela, dado ou identidade adicional do DocAI é incluída.
- **CA-16 — Qualidade:** testes, typecheck, build e diff check têm resultado conhecido.
- **CA-17 — Estado:** árvore final não contém artefatos, segredos ou alterações fora da lista.
- **CA-18 — Estabilidade:** critérios da versão 1.0 possuem evidência ou pendência explícita.
- **CA-19 — Antecipação:** nada posterior à versão 1.0 é implementado.

Cada critério deverá receber estado **atendido**, **não atendido**, **pendente** ou **não verificável**, com evidência.

# Critérios de Estabilidade da Versão 1.0

A versão 1.0 poderá ser proposta como estável somente quando:

- Sprints 01 a 07 estiverem encerradas ou retiradas formalmente.
- Clonagem limpa instalar versões bloqueadas e executar sem configuração opcional.
- Aplicação compilar e executar sem nenhuma capacidade externa habilitada.
- Autenticação, contratos, persistência e interface tiverem validação conhecida.
- Nenhum segredo, artefato, dependência sem uso ou contrato sem justificativa permanecer.
- Documentação estiver coerente com o comportamento real.
- Riscos e limitações conhecidos estiverem registrados.
- Responsável aprovar explicitamente estabilidade e preparação da versão 1.0.

Esses critérios não autorizam tag, release, deploy, publicação, cobrança ou integração real.

# Critérios de Conclusão

- Os cinco contratos, estado opcional, testes e documentação autorizada estão completos.
- Todas as capacidades permanecem opcionais e desativadas por padrão.
- Nenhum fornecedor, SDK, segredo, chamada externa ou efeito real foi incluído.
- Testes, regressão, typecheck, build e diff check foram executados ou limitações declaradas.
- Clonagem e execução básica estão documentadas.
- Cada critério de aceitação e estabilidade possui evidência.
- Somente os onze arquivos autorizados foram afetados.
- A Sprint está tecnicamente concluída e aguarda aprovação explícita.

# Commit Esperado

**Mensagem proposta:** `feat: add optional integration contracts`

**Arquivos previstos:**

- `lib/integrations/optional-capability.ts`
- `lib/integrations/ai.ts`
- `lib/integrations/payments.ts`
- `lib/integrations/pdf.ts`
- `lib/integrations/mail.ts`
- `lib/integrations/storage.ts`
- `lib/integrations/contracts.test.ts`
- `lib/integrations/optional-capability.test.ts`
- `README.md`
- `.env.example`
- `PROJECT_STATE.md`

A definição da mensagem não autoriza commit, push, release ou integração concreta.

# Observações

- “Adaptador opcional” significa contrato interno, estado inativo ou colaborador nulo; não significa cliente de fornecedor.
- Gemini, Stripe, Supabase, Resend e Vercel permanecem decisões de integração futura e não são ativados nesta Sprint.
- Storage externo de objetos/arquivos não substitui o repositório de entidades da Sprint 05.
- A estabilidade da versão 1.0 é uma decisão separada da conclusão técnica desta Sprint.
