# Especificação do Produto — DocAI

**Produto:** DocAI
**Versão documental:** 0.1 — planejamento inicial
**Status:** documentação criada; nenhuma funcionalidade específica implementada

## 1. Visão do produto

O DocAI será um SaaS para gerar contratos a partir de informações fornecidas pelo usuário, utilizando inteligência artificial como serviço desacoplado. O produto deverá reduzir o esforço de redigir documentos contratuais iniciais, mantendo revisão humana, transparência sobre o conteúdo gerado e separação entre a fundação técnica reutilizável e as regras do produto.

O DocAI será construído sobre o Starter Kit v1.0.0. A fundação fornece Next.js, autenticação, persistência substituível, interface reutilizável e contratos opcionais. Esta especificação adiciona somente as decisões próprias do produto; ela não autoriza implementação sem uma Sprint aprovada.

## 2. Problema

Pessoas e pequenas empresas frequentemente precisam iniciar contratos comuns, mas enfrentam dificuldade para organizar informações, escolher cláusulas adequadas e produzir um primeiro rascunho consistente. O DocAI deve transformar dados estruturados e escolhas orientadas em um rascunho contratual revisável, sem prometer aconselhamento jurídico ou validade automática.

## 3. Público-alvo inicial

- Profissionais autônomos e pequenas empresas que precisam de contratos recorrentes.
- Pessoas que desejam iniciar um rascunho contratual com orientação estruturada.
- Usuários com conhecimento suficiente para revisar o conteúdo antes de utilizá-lo.

O produto não substitui advogado, consultoria jurídica ou revisão profissional. O público e os limites comerciais deverão ser refinados antes do lançamento.

## 4. Tipos de contrato da primeira versão

O DocAI terá quatro modelos de produto, todos sujeitos a revisão e aprovação nas Sprints próprias:

1. **Prestação de Serviços** — partes, escopo, remuneração, prazo, responsabilidades e condições de encerramento.
2. **Compra e Venda** — partes, objeto, preço, pagamento, entrega, responsabilidades e condições de encerramento.
3. **Aluguel** — partes, bem, prazo, valor, garantias, responsabilidades e devolução.
4. **Empréstimo** — partes, objeto ou valor, prazo, devolução, encargos quando aplicáveis e responsabilidades.

Os modelos deverão possuir campos e regras documentados por contrato. Nenhum modelo deve ser tratado como aconselhamento jurídico universal ou aplicado automaticamente a todas as jurisdições.

## 5. Escopo funcional planejado

### Identidade e conta

- Cadastro, login, logout e sessão utilizando o mecanismo de autenticação aprovado.
- Associação segura dos rascunhos ao usuário autenticado.
- Mensagens de erro que não revelem dados de outras contas.

### Seleção e coleta

- Seleção de um dos quatro tipos de contrato.
- Formulário orientado para coletar dados necessários ao tipo escolhido.
- Validação de campos obrigatórios, formatos e limites antes da geração.
- Preservação dos dados preenchidos quando houver erro recuperável.

### Geração assistida

- Envio de uma solicitação estruturada ao serviço de IA desacoplado.
- Geração de um rascunho vinculado ao tipo de contrato selecionado.
- Indicação de que o resultado é um rascunho gerado e exige revisão humana.
- Tratamento previsível de indisponibilidade, limite, falha e resposta inválida.

### Revisão e gerenciamento

- Visualização do rascunho gerado.
- Edição manual antes de qualquer uso externo.
- Salvamento, leitura, atualização, listagem e exclusão de rascunhos do usuário.
- Estados de carregamento, vazio, erro e sucesso.

### Plano e pagamento

- Definição de planos e limites somente após decisão comercial aprovada.
- Integração de cobrança por contrato de pagamentos desacoplado.
- Nenhuma cobrança deve ser realizada antes de requisitos, preços, eventos e políticas serem aprovados em Sprint própria.

### Exportação e compartilhamento

- PDF, download, envio por e-mail ou compartilhamento somente quando documentados em Sprints próprias.
- A existência dos contratos opcionais do Starter Kit não habilita esses fluxos automaticamente.

## 6. Arquitetura do produto

O DocAI seguirá a arquitetura do Starter Kit:

- **Apresentação:** rotas App Router, formulários, navegação e estados visuais.
- **Aplicação:** casos de uso como coletar dados, solicitar geração, revisar e gerenciar rascunhos.
- **Domínio:** tipos de contrato, campos, validações e regras específicas do DocAI.
- **Infraestrutura:** Supabase para identidade e persistência quando aprovado, Gemini por adaptador de IA, Stripe por adaptador de pagamentos, Vercel como ambiente de execução e publicação.
- **Compartilhada:** contratos realmente reutilizáveis, sem incorporar regras de um fornecedor.

As dependências devem apontar para contratos internos. Nenhuma tela ou regra de domínio poderá depender diretamente de Gemini, Stripe ou APIs de armazenamento.

## 7. Integrações aprovadas como direção

As seguintes tecnologias foram escolhidas para planejamento, mas sua implementação depende de Sprints e aprovação próprias:

- **Next.js:** aplicação web baseada no App Router.
- **Supabase:** autenticação e persistência do produto, atrás de contratos internos e configuração segura.
- **Gemini:** provedor de IA atrás do contrato de IA do Starter Kit; prompts, limites e tratamento de resposta serão específicos do DocAI e documentados antes da implementação.
- **Stripe:** pagamentos e assinaturas atrás do contrato de pagamentos; preços, webhooks, estados e reconciliação exigem escopo próprio.
- **Vercel:** hospedagem e execução; configurações de produção, domínios e deploy exigem autorização operacional separada.

Nenhum segredo, chave ou credencial deve entrar no repositório. A troca de qualquer fornecedor deve ser possível sem alterar o domínio do produto.

## 8. Segurança, privacidade e confiabilidade

- Isolar dados por usuário autenticado e validar autorização no servidor.
- Não enviar dados de uma conta para outra nem expor conteúdo em mensagens ou logs.
- Tratar informações inseridas pelo usuário e respostas da IA como dados não confiáveis.
- Minimizar os dados enviados ao provedor de IA e documentar retenção, finalidade e limitações.
- Evitar registrar conteúdo contratual integral em logs.
- Manter segredos exclusivamente em variáveis de ambiente do servidor.
- Definir política de exclusão, retenção e exportação antes do lançamento.
- Informar claramente limitações jurídicas, possibilidade de erro e necessidade de revisão.

## 9. Requisitos não funcionais

- Interface responsiva e acessível conforme `UI_GUIDELINES.md`.
- Contratos e serviços testáveis sem depender obrigatoriamente de fornecedores reais.
- Falhas de IA, persistência e pagamentos traduzidas para estados seguros e recuperáveis.
- Desempenho suficiente para formular, gerar e revisar sem bloquear operações não relacionadas.
- Observabilidade somente quando houver necessidade e política de privacidade aprovadas.
- Dependências e configurações adicionadas apenas com justificativa atual.
- Documentação de configuração, operação, limites e recuperação mantida junto às entregas autorizadas.

## 10. Fora do escopo inicial

- Aconselhamento jurídico, validação jurídica automática ou garantia de validade contratual.
- Atendimento a todas as jurisdições, idiomas ou legislações sem análise própria.
- Assinatura eletrônica, testemunhas, certificação ou reconhecimento de firma.
- Marketplace de modelos, colaboração em tempo real ou gestão avançada de equipes.
- Integrações não aprovadas com outros provedores de IA, pagamento, armazenamento ou e-mail.
- Automação de cobrança sem plano comercial aprovado.
- Treinamento de modelo próprio, fine-tuning, embeddings ou busca vetorial.
- Aplicativos nativos, extensão de navegador ou API pública.
- Analytics de produto, anúncios ou venda de dados.

## 11. Critérios de sucesso

O DocAI poderá ser considerado pronto para uma primeira avaliação quando:

- um usuário autenticado conseguir selecionar um tipo de contrato e preencher os dados necessários;
- uma solicitação puder ser enviada ao adaptador de IA aprovado sem acoplamento ao domínio;
- o resultado for apresentado como rascunho editável e revisável;
- rascunhos forem isolados por usuário e gerenciáveis conforme as operações aprovadas;
- falhas, limites e ausência de configuração forem compreensíveis;
- nenhum segredo ou dado de outra conta for exposto;
- pagamentos e demais integrações permanecerem desativados até suas Sprints;
- documentação, testes e critérios de aceite refletirem o comportamento real.

## 12. Regra de autorização

Esta especificação orienta o produto, mas não autoriza código. Cada capacidade deverá ser convertida em uma Sprint com objetivo, escopo, arquivos autorizados, critérios, validações e aprovação explícita.
