# Sprint 02 — Autenticação básica e proteção de rotas

**Status:** Planejada e aguardando aprovação.

Esta Sprint propõe a primeira capacidade reutilizável de identidade do Starter Kit. Sua aprovação documental não autoriza automaticamente implementação, instalação de dependências, alteração de configurações, commit ou publicação.

# Objetivo

Adicionar um fluxo mínimo e reutilizável de autenticação por credenciais, com cadastro, login, logout, sessão persistente e proteção de uma rota de dashboard.

Ao final da Sprint, uma pessoa deverá conseguir criar uma conta, iniciar e encerrar uma sessão e acessar uma área protegida. Pessoas não autenticadas deverão ser redirecionadas de forma previsível para o login.

A implementação deverá:

- permanecer neutra em relação a qualquer produto;
- adotar o menor contrato de autenticação capaz de atender às entregas;
- manter credenciais, segredos e dados de sessão fora do cliente;
- separar apresentação, coordenação de autenticação e detalhes de persistência;
- utilizar somente dependências e configurações previamente aprovadas;
- não antecipar autorização avançada, gestão de perfil ou outras capacidades futuras.

Antes da implementação, deverão estar confirmados:

- o encerramento aprovado da Sprint 01;
- a aprovação formal desta Sprint;
- a escolha documentada da solução de autenticação;
- a aprovação explícita das dependências e configurações necessárias;
- a disponibilidade de um mecanismo seguro e isolado para dados de identidade e sessão.

# Entregas

## Cadastro

- Formulário mínimo para criação de conta com identificador e senha.
- Validação de campos obrigatórios e formato do identificador.
- Rejeição de identificador já cadastrado.
- Armazenamento de senha exclusivamente por representação criptográfica adequada.
- Mensagens claras para sucesso, dados inválidos e falha de cadastro.
- Encaminhamento previsível para login ou criação de sessão, conforme decisão aprovada antes da implementação.

## Login

- Formulário mínimo para autenticação por credenciais.
- Validação segura das credenciais no servidor.
- Mensagem genérica para credenciais inválidas, sem revelar se uma conta existe.
- Criação de sessão após autenticação válida.
- Redirecionamento para o dashboard protegido após sucesso.

## Logout

- Ação acessível a partir do dashboard.
- Encerramento da sessão atual.
- Invalidação dos dados de sessão aplicáveis.
- Redirecionamento para o login ou para a página pública após sucesso.

## Sessão persistente

- Preservação da sessão durante navegação e recarregamento da página.
- Persistência pelo período mínimo aprovado para a Sprint.
- Armazenamento seguro, com atributos de proteção adequados ao ambiente.
- Expiração previsível e rejeição de sessão ausente, inválida ou expirada.
- Disponibilização ao cliente somente dos dados mínimos necessários.

Persistência de sessão não significa sessão indefinida. A duração e a política de renovação deverão ser definidas junto à solução de autenticação antes da implementação.

## Dashboard protegido

- Rota de dashboard mínima e neutra.
- Exibição apenas de conteúdo suficiente para confirmar o acesso autenticado.
- Ausência de métricas, módulos de produto, navegação complexa ou painel administrativo.
- Ação de logout claramente identificada.

## Redirecionamento de usuário não autenticado

- Verificação de sessão antes da apresentação do conteúdo protegido.
- Redirecionamento de acesso não autenticado para a rota de login.
- Preservação opcional do destino originalmente solicitado somente se puder ser feita com segurança e sem ampliar o escopo.
- Prevenção de exibição temporária de conteúdo protegido antes do redirecionamento.

# Fora do Escopo

Não fazem parte desta Sprint:

- pagamentos, assinaturas, faturamento ou planos;
- inteligência artificial;
- criação, leitura, processamento ou exportação de PDF;
- banco de dados de produto, entidades de negócio ou persistência de dados de domínio;
- perfis avançados, preferências, avatar ou edição de conta;
- recuperação, redefinição ou alteração de senha;
- verificação de endereço, convite ou confirmação por mensagem;
- login social ou autenticação por provedores externos;
- painel administrativo;
- papéis, permissões ou autorização granular;
- organizações, equipes ou multi-tenancy;
- autenticação multifator;
- sessões em múltiplos dispositivos e gerenciamento remoto de sessões;
- auditoria avançada, analytics ou monitoramento de produto;
- biblioteca completa de componentes;
- personalização visual específica de produto;
- integrações não essenciais ao mecanismo de autenticação aprovado;
- refatorações ou alterações arquiteturais sem relação direta com as entregas;
- preparação para funcionalidades de Sprints futuras.

O armazenamento estritamente necessário para identidade e sessão poderá existir somente como parte da solução de autenticação aprovada. Ele não poderá conter dados de produto nem estabelecer antecipadamente um modelo de persistência para funcionalidades futuras.

# Dependências Permitidas

A Sprint permite avaliar somente o conjunto mínimo abaixo:

1. **Uma solução de autenticação e sessão** — responsável pelo fluxo de credenciais, criação, leitura, expiração e invalidação de sessão.
2. **Um mecanismo seguro de derivação de senha** — permitido apenas se a solução principal não oferecer essa capacidade de forma adequada.
3. **Dependências transitivas obrigatórias** — somente aquelas exigidas diretamente pelas dependências aprovadas e registradas pelo gerenciador existente.

Nenhum pacote está previamente autorizado por este documento. Antes de instalar, o responsável pela implementação deverá apresentar:

- nome e versão propostos;
- necessidade atendida;
- alternativas consideradas, incluindo recursos já existentes;
- manutenção e compatibilidade com a stack atual;
- impacto sobre cliente, servidor, build e arquivo de lock;
- configurações e segredos exigidos;
- estratégia de persistência de identidade e sessão;
- riscos de segurança, privacidade e substituição.

A instalação somente poderá ocorrer após aprovação explícita. A autorização de uma dependência não autoriza outra biblioteca relacionada.

Não estão permitidos:

- biblioteca de interface ou formulário;
- biblioteca geral de validação;
- solução de pagamentos, mensagens ou analytics;
- provedor de login social;
- ferramenta de administração de usuários;
- mecanismo de autorização avançada;
- ORM ou banco de dados destinado a dados de produto;
- dependência adicionada apenas para conveniência ou uso futuro.

Se a solução aprovada exigir configuração, segredo ou serviço adicional não previsto, a implementação deverá parar até que esses itens sejam documentados e autorizados.

# Arquivos Permitidos

Durante a implementação, somente os caminhos abaixo poderão ser criados ou alterados para as finalidades indicadas.

| Caminho | Ação permitida | Finalidade |
| --- | --- | --- |
| `app/(auth)/cadastro/page.tsx` | criar | Apresentar o formulário mínimo de cadastro. |
| `app/(auth)/login/page.tsx` | criar | Apresentar o formulário mínimo de login. |
| `app/dashboard/page.tsx` | criar | Apresentar a área mínima protegida e a ação de logout. |
| `app/api/auth/` | criar | Expor somente os endpoints exigidos pela solução de autenticação aprovada. |
| `app/actions/auth.ts` | criar | Coordenar ações de cadastro, login e logout no servidor, quando a solução escolhida utilizar ações de servidor. |
| `lib/auth/` | criar | Conter configuração, contratos, validações e adaptação da solução de autenticação. |
| `middleware.ts` | criar | Aplicar proteção e redirecionamento às rotas aprovadas, se esse for o mecanismo compatível com a solução escolhida. |
| `.env.example` | criar | Documentar nomes de configurações autorizadas, sem valores reais ou segredos. |
| `package.json` | modificar condicionalmente | Registrar somente dependências aprovadas para esta Sprint. |
| `package-lock.json` | modificar condicionalmente | Registrar exclusivamente o resultado da instalação aprovada. |

Regras para esta lista:

- caminhos alternativos gerados pela solução escolhida deverão substituir, e não duplicar, responsabilidades equivalentes;
- somente arquivos realmente necessários deverão ser criados;
- pastas não deverão ser criadas vazias;
- `package.json`, `package-lock.json` e `.env.example` permanecerão inalterados sem aprovação específica;
- nenhuma credencial ou valor sensível poderá ser incluído no repositório;
- estilos deverão utilizar os recursos existentes, sem alterar `app/globals.css`;
- `app/layout.tsx` e `app/page.tsx` não estão autorizados;
- documentos, configurações e demais arquivos não listados estão proibidos.

Se a solução não couber nesta lista, a implementação deverá parar e solicitar revisão formal da Sprint antes de modificar qualquer outro arquivo.

# Critérios de Aceitação

A Sprint será tecnicamente aceita quando todos os critérios aplicáveis estiverem atendidos:

- **CA-01 — Cadastro válido:** uma pessoa consegue criar uma conta com dados válidos.
- **CA-02 — Cadastro inválido:** campos ausentes ou inválidos são rejeitados com mensagens claras.
- **CA-03 — Conta duplicada:** o mesmo identificador não pode ser cadastrado mais de uma vez.
- **CA-04 — Proteção de senha:** senhas não são armazenadas, registradas ou transmitidas internamente em texto puro além do limite estritamente necessário à validação.
- **CA-05 — Login válido:** credenciais válidas criam uma sessão e direcionam ao dashboard.
- **CA-06 — Login inválido:** credenciais inválidas não criam sessão e retornam mensagem que não revela a existência da conta.
- **CA-07 — Persistência:** a sessão permanece válida após navegação e recarregamento, dentro do período definido.
- **CA-08 — Sessão inválida:** sessão ausente, expirada ou inválida não concede acesso.
- **CA-09 — Dashboard protegido:** o dashboard somente é apresentado a uma sessão válida.
- **CA-10 — Redirecionamento:** uma pessoa não autenticada que solicita o dashboard é redirecionada ao login sem visualizar conteúdo protegido.
- **CA-11 — Logout:** a ação de logout invalida a sessão e impede novo acesso ao dashboard sem autenticação.
- **CA-12 — Acesso após logout:** retornar diretamente à rota protegida após logout produz novo redirecionamento.
- **CA-13 — Neutralidade:** páginas, mensagens e contratos não contêm regras ou identidade de produto específico.
- **CA-14 — Acessibilidade básica:** formulários possuem rótulos, mensagens associadas, ordem de foco lógica e operação por teclado.
- **CA-15 — Responsividade:** cadastro, login e dashboard permanecem legíveis e utilizáveis em larguras reduzidas e amplas.
- **CA-16 — Segurança de dados:** segredos e dados internos de sessão não são expostos ao cliente, à interface ou ao repositório.
- **CA-17 — Dependências controladas:** somente dependências explicitamente aprovadas foram adicionadas.
- **CA-18 — Escopo:** apenas os arquivos permitidos e necessários foram afetados.
- **CA-19 — Qualidade:** não existem erros conhecidos de lint, typecheck, build ou execução que invalidem as entregas.
- **CA-20 — Ausência de antecipação:** nenhuma funcionalidade listada como fora do escopo foi implementada.

# Validação

A validação deverá ser executada em ambiente local com contas e dados exclusivamente de teste.

## Verificações automatizadas

1. **Lint**
   - Executar o comando oficial, se estiver configurado.
   - Se não existir comando de lint, registrar a ausência; não instalar ou configurar ferramenta nesta Sprint sem autorização.

2. **Typecheck**
   - Executar a verificação oficial disponível no projeto.
   - Registrar erros, avisos relevantes e limitações.

3. **Build**
   - Executar o comando de build existente.
   - Confirmar que rotas públicas e protegidas são compiladas sem erro impeditivo.

## Testes manuais

1. **Cadastro**
   - Cadastrar uma conta com dados válidos.
   - Tentar cadastro com campos inválidos.
   - Tentar cadastrar novamente o mesmo identificador.
   - Confirmar mensagens e resultados esperados.

2. **Login**
   - Entrar com credenciais válidas.
   - Tentar entrar com senha incorreta e identificador inexistente.
   - Confirmar que as mensagens não revelam se a conta existe.

3. **Sessão persistente**
   - Recarregar o dashboard após login.
   - Navegar entre rotas e retornar ao dashboard.
   - Confirmar que a sessão continua válida dentro do período definido.

4. **Logout**
   - Executar logout a partir do dashboard.
   - Confirmar o redirecionamento previsto.
   - Tentar retornar ao dashboard sem novo login.

5. **Acesso à rota protegida**
   - Acessar diretamente o dashboard com sessão válida.
   - Confirmar a exibição do conteúdo protegido.
   - Repetir com sessão ausente, inválida ou expirada quando o ambiente permitir.

6. **Redirecionamento**
   - Acessar diretamente o dashboard sem autenticação.
   - Confirmar redirecionamento ao login.
   - Confirmar ausência de exibição temporária de conteúdo protegido.

7. **Responsividade e acessibilidade básica**
   - Inspecionar cadastro, login e dashboard em larguras reduzidas e amplas.
   - Percorrer formulários e logout somente com teclado.
   - Verificar rótulos, foco, mensagens de erro, contraste e estrutura semântica.

## Revisão de segurança e escopo

- Confirmar que nenhum segredo foi incluído no repositório ou enviado ao cliente.
- Confirmar que senha não aparece em logs, mensagens, retornos ou armazenamento em texto puro.
- Inspecionar atributos e expiração da sessão.
- Revisar o diff completo.
- Comparar o estado final com o estado inicial.
- Confirmar que somente arquivos e dependências autorizados foram afetados.
- Procurar evidências de todas as funcionalidades declaradas fora do escopo e confirmar sua ausência.

Cada critério de aceitação deverá ser relatado como **atendido**, **não atendido**, **pendente** ou **não verificável**, acompanhado de evidência ou justificativa.

# Critérios de Conclusão

A Sprint poderá ser considerada tecnicamente concluída e aguardando aceite somente quando:

- todas as entregas aprovadas estiverem implementadas;
- todos os critérios de aceitação possuírem status e evidência;
- lint, typecheck e build aplicáveis tiverem sido executados;
- todos os testes manuais definidos tiverem sido executados;
- verificações não aplicáveis ou indisponíveis estiverem justificadas;
- não existirem falhas conhecidas que invalidem autenticação ou proteção de rota;
- credenciais e sessões estiverem protegidas conforme os critérios;
- somente arquivos e dependências autorizados tiverem sido alterados;
- o diff e o estado final do repositório tiverem sido revisados;
- riscos, limitações e pendências estiverem registrados;
- todos os arquivos alterados, comandos e resultados tiverem sido relatados;
- o responsável pelo projeto tiver recebido a entrega para revisão.

Conclusão técnica não encerra a Sprint. O encerramento depende da revisão e da aprovação explícita do responsável pelo projeto.

# Riscos

## Escolha prematura da solução

Uma solução específica pode acoplar a base a um fornecedor ou exigir infraestrutura desproporcional. A mitigação é comparar alternativas e aprovar a menor solução compatível antes de instalar qualquer dependência.

## Persistência insuficiente ou excessiva

Cadastro e sessão exigem persistência, mas a Sprint não autoriza um banco de dados de produto. A mitigação é limitar o armazenamento a identidade e sessão, documentar seu ciclo de vida e impedir reutilização automática para dados futuros.

## Proteção apenas visual

Ocultar links ou redirecionar no cliente não protege conteúdo. A mitigação é validar a sessão antes da apresentação da rota protegida e manter dados sensíveis no servidor.

## Exposição de credenciais ou sessão

Logs, mensagens, código do cliente ou configurações versionadas podem revelar dados sensíveis. A mitigação é minimizar dados, usar configuração segura, revisar fronteiras e inspecionar o diff antes da entrega.

## Enumeração de contas

Mensagens diferentes para identificador inexistente e senha inválida podem revelar contas cadastradas. A mitigação é utilizar resposta genérica no login e evitar detalhes desnecessários.

## Sessão inválida ou indefinida

Expiração, renovação ou invalidação incorretas podem manter acesso indevido. A mitigação é definir duração, atributos e comportamento de logout antes da implementação e testar estados inválidos.

## Expansão de escopo

Autenticação pode estimular recuperação de senha, perfis, papéis e login social. A mitigação é manter apenas o fluxo por credenciais e registrar qualquer extensão para avaliação futura.

## Validação incompleta

Build bem-sucedido não comprova segurança, acessibilidade ou proteção de rotas. A mitigação é combinar verificações automatizadas, testes manuais, revisão de segurança e inspeção do estado do repositório.

# Entrega Esperada

Ao final, a entrega deverá apresentar:

- cadastro, login e logout mínimos e funcionais;
- sessão persistente com duração e invalidação documentadas;
- dashboard neutro protegido;
- redirecionamento previsível para acessos não autenticados;
- solução de autenticação isolada de detalhes de produto;
- lista completa dos arquivos criados e modificados;
- dependências e configurações efetivamente utilizadas, com confirmação de aprovação;
- comandos executados e seus resultados;
- evidências dos testes manuais;
- status individual dos critérios de aceitação;
- riscos, limitações, falhas e validações não executadas;
- confirmação de que banco de dados de produto e demais itens fora do escopo não foram introduzidos.

O estado esperado é **Sprint 02 tecnicamente concluída e aguardando aprovação**. Nenhuma Sprint posterior, commit, push, publicação ou funcionalidade adicional estará autorizada por essa conclusão.
