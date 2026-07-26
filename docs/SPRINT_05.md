# Sprint 05 – Geração do Contrato com Gemini

## Objetivo

Gerar o contrato utilizando a API do Gemini a partir dos dados preenchidos pelo usuário.

---

## Escopo

Ao clicar em "Gerar contrato":

- Validar os dados.
- Enviar as informações para o AIService.
- O AIService utilizará o Gemini.
- Receber o texto do contrato.
- Exibir o contrato em uma nova página.

---

## Interface

Durante a geração:

- Mostrar indicador de carregamento.
- Desabilitar o botão.

Após a resposta:

- Exibir o contrato formatado.
- Manter boa legibilidade.

---

## Regras

- Utilizar exclusivamente o AIService.
- Não chamar Gemini diretamente nos componentes.
- Não salvar no banco.
- Não gerar PDF.
- Não integrar Stripe.

---

## Critérios de aceite

- O contrato é gerado.
- O loading funciona.
- Erros da API são tratados.
- Layout continua responsivo.
- Projeto continua compilando sem erros.

---

## Não faz parte deste sprint

- PDF
- Banco de dados
- Histórico
- Assinatura
- Stripe

