# Sprint 04 – Formulário do Contrato

## Objetivo

Implementar o formulário de preenchimento dos dados do contrato.

Nenhum contrato será gerado neste sprint.

Nenhuma chamada para Gemini será realizada.

Nenhum documento será salvo no banco de dados.

---

## Escopo

Ao selecionar um tipo de contrato, o usuário deverá visualizar um formulário correspondente.

Exemplo:

Prestação de Serviços

Campos:

- Nome do contratante
- CPF/CNPJ do contratante
- Endereço do contratante

- Nome do contratado
- CPF/CNPJ do contratado
- Endereço do contratado

- Objeto do contrato
- Valor
- Data de início
- Prazo

---

## Interface

- Layout simples.
- Campos organizados.
- Responsivo.
- Utilizar os componentes já existentes.
- Botão "Gerar contrato".

---

## Regras

- Todos os campos obrigatórios.
- Validar campos vazios.
- Não chamar a IA.
- Não salvar no banco.
- Não gerar PDF.

O botão "Gerar contrato" apenas deverá preparar o próximo fluxo.

---

## Critérios de aceite

- O formulário abre corretamente.
- Todos os campos são exibidos.
- Validações funcionam.
- Layout responsivo.
- Nenhuma integração externa é executada.
- Projeto continua compilando sem erros.

---

## Não faz parte deste sprint

- Gemini
- Geração do contrato
- PDF
- Banco de dados
- Histórico
