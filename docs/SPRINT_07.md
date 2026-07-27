# Sprint 07 — MVP Profissional

## Objetivo

Transformar o DocAI em um MVP profissional, pronto para os primeiros usuários, aprimorando a apresentação dos contratos, permitindo sua exportação em PDF, refinando os estados da experiência de uso e preparando tecnicamente o projeto para deploy.

---

## Prioridade de implementação

1. Visualização profissional do contrato.
2. Exportação em PDF.
3. Refinamentos de UX.
4. Responsividade e acessibilidade.
5. Preparação para deploy.

---

## Escopo

Implementar:

- Melhorias na visualização dos contratos gerados e salvos.
- Exportação de contratos para PDF.
- Estados claros de carregamento, erro e sucesso nos fluxos abrangidos pela Sprint.
- Refinamentos de layout e responsividade nas páginas do fluxo de contratos.
- Preparação técnica e validação do projeto para deploy.

Preservar:

- Os tipos de contrato existentes.
- A autenticação e a proteção das rotas.
- O isolamento dos contratos por usuário.
- A integração existente com o Gemini.
- A persistência existente no Supabase.
- As regras de negócio implementadas nas Sprints anteriores.

---

## Funcionalidades

### 1. Visualização dos contratos

- Apresentar o contrato completo com hierarquia visual clara e boa legibilidade.
- Exibir título, tipo e data de criação do contrato.
- Preservar que somente o usuário autenticado possa acessar seus próprios contratos.
- Manter uma navegação clara entre a lista de contratos e a visualização completa.
- Tratar conteúdo extenso sem corte, sobreposição ou rolagem horizontal da página.

### 2. Exportação para PDF

- Disponibilizar a ação "Exportar PDF" na visualização completa do contrato.
- Gerar o PDF a partir do conteúdo do contrato aberto.
- Incluir no PDF o título, o tipo, a data de criação e o conteúdo completo do contrato.
- Utilizar um nome de arquivo identificável e seguro.
- Preservar acentuação, parágrafos e quebras de linha.
- Impedir exportações duplicadas enquanto a geração estiver em andamento.
- Informar de forma clara quando a exportação não puder ser concluída.

### 3. Experiência do usuário

- Exibir loading durante operações com espera perceptível.
- Desabilitar temporariamente ações que não possam ser repetidas durante o processamento.
- Apresentar mensagens de erro compreensíveis e acionáveis.
- Apresentar confirmação de sucesso quando a operação não produzir retorno visual imediato suficiente.
- Manter caminhos claros para tentar novamente ou retornar ao fluxo anterior.
- Não expor mensagens técnicas, credenciais ou detalhes internos dos fornecedores.

### 4. Layout e responsividade

- Manter hierarquia visual consistente entre dashboard, lista e visualização de contratos.
- Garantir uso adequado em telas pequenas, intermediárias e amplas.
- Preservar conteúdo e ações essenciais sem rolagem horizontal da página.
- Manter áreas de interação confortáveis para mouse, teclado e toque.
- Garantir foco visível, contraste adequado e semântica compatível com a função dos elementos.

### 5. Preparação para deploy

- Confirmar que o projeto gera um build de produção sem erros.
- Validar que as variáveis de ambiente necessárias estejam identificadas e utilizadas de forma segura.
- Confirmar que nenhum segredo ou valor sensível esteja versionado.
- Verificar que rotas protegidas, geração, persistência e exportação funcionem no fluxo de produção.
- Documentar somente as instruções necessárias para configurar e validar o ambiente de deploy.
- Não realizar o deploy como parte desta Sprint sem autorização operacional específica.

---

## Regras

- Reutilizar a arquitetura, os serviços e os componentes existentes sempre que atenderem à mesma responsabilidade.
- Não alterar autenticação, integração com Gemini, persistência ou regras de negócio sem necessidade expressamente prevista nesta Sprint.
- Gerar PDF somente para contratos pertencentes ao usuário autenticado.
- Não registrar conteúdo integral de contratos, tokens, credenciais ou dados sensíveis em logs.
- Não instalar ou atualizar dependências sem aprovação explícita.
- Não criar funcionalidades além das descritas neste documento.
- Não realizar commit, push, deploy ou publicação sem autorização correspondente.

---

## Critérios de aceitação

- A visualização completa apresenta título, tipo, data e conteúdo do contrato com boa legibilidade.
- Conteúdos extensos permanecem íntegros e legíveis em diferentes larguras de tela.
- O usuário autenticado continua acessando somente os próprios contratos.
- A ação "Exportar PDF" está disponível na visualização completa do contrato.
- O PDF contém título, tipo, data e conteúdo completo do contrato aberto.
- A exportação preserva acentuação, parágrafos e quebras de linha.
- O nome do arquivo exportado é identificável e seguro.
- A interface informa o processamento da exportação e impede acionamentos duplicados.
- Falhas de carregamento e exportação apresentam mensagens claras, seguras e acionáveis.
- Estados de sucesso são exibidos quando necessários para confirmar a conclusão da operação.
- Dashboard, lista e visualização de contratos permanecem responsivos em telas pequenas, intermediárias e amplas.
- Todas as ações interativas podem ser acessadas por teclado e possuem foco visível.
- O projeto não expõe segredos ou conteúdo sensível em código cliente, repositório ou logs.
- Os fluxos existentes de autenticação, geração e persistência continuam funcionando.
- TypeScript é executado sem erros.
- Os testes aplicáveis são executados sem falhas.
- O build de produção é concluído sem erros.
- `git diff --check` é aprovado.
- O projeto fica tecnicamente preparado para deploy, sem que o deploy seja realizado automaticamente.

---

## Fora do escopo

- Novos tipos de contrato.
- Assinatura eletrônica.
- Pagamentos, planos ou integração com Stripe.
- Compartilhamento de contratos.
- Colaboração entre usuários.
- Edição ou exclusão de contratos.
- Envio de contratos por e-mail.
- Impressão como fluxo independente da exportação em PDF.
- Analytics, telemetria ou monitoramento de produto.
- Deploy, publicação, domínio ou configuração de produção executados sem autorização específica.

---

## Checklist de implementação

### Visualização

- [ ] Revisar a página de visualização completa do contrato.
- [ ] Exibir título, tipo e data de criação com hierarquia clara.
- [ ] Melhorar a legibilidade e a apresentação do conteúdo integral.
- [ ] Verificar contratos curtos e extensos.
- [ ] Confirmar autorização por usuário no servidor.

### PDF

- [ ] Definir a solução de geração de PDF dentro da arquitetura existente.
- [ ] Submeter qualquer nova dependência à aprovação antes de instalá-la.
- [ ] Implementar a ação "Exportar PDF" na visualização do contrato.
- [ ] Incluir os metadados e o conteúdo completo no documento.
- [ ] Preservar acentuação, parágrafos e quebras de linha.
- [ ] Definir um nome de arquivo identificável e seguro.
- [ ] Implementar loading, bloqueio de acionamento duplicado e tratamento de falha.

### Experiência e interface

- [ ] Revisar estados de loading, erro e sucesso abrangidos pela Sprint.
- [ ] Garantir mensagens claras e caminhos de recuperação.
- [ ] Validar responsividade em telas pequenas, intermediárias e amplas.
- [ ] Revisar contraste, semântica, teclado e foco visível.
- [ ] Confirmar que nenhuma ação ou conteúdo fique oculto, coberto ou fora da tela.

### Preparação para deploy

- [ ] Revisar as variáveis de ambiente necessárias sem expor valores reais.
- [ ] Confirmar ausência de segredos e arquivos sensíveis no repositório.
- [ ] Validar os fluxos protegidos no comportamento de produção.
- [ ] Documentar a configuração e a validação necessárias para o ambiente de deploy.
- [ ] Executar testes, TypeScript, build e `git diff --check`.
- [ ] Revisar o diff completo e confirmar que somente arquivos autorizados foram afetados.

---

## Critérios de conclusão

A Sprint poderá ser apresentada como tecnicamente concluída quando:

- Todas as funcionalidades previstas estiverem implementadas dentro do escopo aprovado.
- Todos os critérios de aceitação possuírem status e evidência.
- A visualização e a exportação em PDF funcionarem somente para contratos do usuário autenticado.
- Loading, mensagens de erro e confirmações de sucesso estiverem implementados onde aplicável.
- Responsividade e acessibilidade básica estiverem verificadas.
- Os fluxos existentes de autenticação, Gemini e Supabase não apresentarem regressões conhecidas.
- Testes, TypeScript, build e `git diff --check` forem aprovados.
- Dependências e configurações permanecerem dentro do escopo explicitamente autorizado.
- Nenhum segredo, arquivo temporário ou artefato gerado estiver incluído no repositório.
- O projeto estiver preparado para deploy sem que nenhuma publicação tenha sido executada automaticamente.
- Todos os arquivos alterados, riscos, limitações e validações forem apresentados para revisão.
- O responsável pelo projeto revisar e aprovar explicitamente o resultado.

Conclusão técnica não encerra automaticamente a Sprint e não autoriza deploy, commit, push ou início de uma nova Sprint.
