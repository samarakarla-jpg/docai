# Sprint 08 — Refinamento de UX

## Objetivo

Tornar o DocAI mais intuitivo para pessoas que não possuem conhecimento jurídico, mantendo a simplicidade da interface e a qualidade dos contratos gerados.

## Escopo

As melhorias desta Sprint estão organizadas por prioridade.

### Prioridade 1 – Linguagem Simples

- Alterar "Objeto do contrato" para "Qual é o serviço?".
- Adicionar exemplos abaixo do campo.
- Alterar "Contratante" para "Contratante (seus dados)".
- Alterar "Contratado" para "Contratado (dados da pessoa que realizará o serviço)".
- Utilizar linguagem simples e compreensível nos formulários abrangidos.

### Prioridade 2 – Contrato

- Adicionar área de assinatura.
- Adicionar campo de data.
- Melhorar a organização visual e o espaçamento do contrato.

### Prioridade 3 – Exportação

Separar claramente as ações de:

- Salvar em PDF.
- Baixar Word.
- Imprimir.

As ações devem utilizar nomes claros e permitir que o usuário entenda o resultado de cada uma.

### Prioridade 4 – Edição

- Permitir editar os dados antes da versão final.
- Regenerar o contrato atual após a edição, sem criar um novo contrato.

### Prioridade 5 – Financeiro

- Permitir a seleção de moeda.
- Formatar automaticamente os valores conforme a moeda selecionada.

## Critérios de Aceitação

### Prioridade 1 – Linguagem Simples

- O formulário exibe "Qual é o serviço?" no lugar de "Objeto do contrato".
- Exemplos de serviços são exibidos abaixo do campo correspondente.
- O formulário exibe "Contratante (seus dados)".
- O formulário exibe "Contratado (dados da pessoa que realizará o serviço)".
- Os textos alterados são compreensíveis para uma pessoa sem conhecimento jurídico.

### Prioridade 2 – Contrato

- A visualização do contrato contém área identificada para assinatura do Contratante.
- A visualização do contrato contém área identificada para assinatura do Contratado.
- Existe campo de data associado à área de assinaturas.
- O contrato apresenta espaçamento, alinhamento e hierarquia visual consistentes.

### Prioridade 3 – Exportação

- As ações de salvar em PDF, baixar Word e imprimir aparecem separadas.
- Cada ação possui texto claro que descreve seu resultado.
- Acionar uma ação não executa outra ação por engano.

### Prioridade 4 – Edição

- O usuário consegue editar os dados antes de gerar a versão final.
- Após a edição, o contrato é regenerado com os dados atualizados.
- A regeneração atualiza o contrato existente e não cria um novo registro.

### Prioridade 5 – Financeiro

- O usuário consegue selecionar a moeda entre as opções disponíveis no produto.
- Os valores exibem o símbolo correspondente à moeda selecionada.
- Os valores são formatados de maneira consistente com a moeda selecionada.

### Critérios gerais

- A interface permanece simples, responsiva e compreensível.
- As funcionalidades existentes de autenticação, geração, visualização e persistência não são alteradas indevidamente.
- Nenhum dado de outro usuário pode ser exibido ou modificado.
- TypeScript, testes aplicáveis, build e `git diff --check` devem ser executados sem erros antes da conclusão técnica.

## Fora do Escopo

- Assinatura eletrônica.
- Histórico de versões.
- Compartilhamento de contratos.
- Novos tipos de contrato.
- Pagamentos ou integração financeira externa.
- Funcionalidades de colaboração entre usuários.
- Qualquer alteração de autenticação, banco de dados ou regras de negócio que não seja necessária para os itens desta Sprint.

