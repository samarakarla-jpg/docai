# Sprint 06 — Persistência de Contratos

## Objetivo

Salvar no Supabase cada contrato gerado pelo usuário e permitir visualizar todos os contratos já criados.

---

## Escopo

Implementar:

- Salvar contrato após geração.
- Criar página "Meus Contratos".
- Listar somente contratos do usuário autenticado.
- Abrir um contrato salvo.
- Exibir data de criação.

Não implementar:

- PDF.
- Download.
- Edição.
- Exclusão.
- Compartilhamento.

---

## Regras

Após o Gemini gerar o contrato:

- salvar automaticamente no Supabase;
- manter vínculo com o usuário autenticado.

Campos mínimos:

- id
- user_id
- tipo
- titulo
- conteudo
- created_at

Criar página:

/dashboard/contracts

A página deve mostrar:

- Tipo do contrato.
- Título.
- Data de criação.
- Botão "Abrir".

Ao clicar em "Abrir", exibir o contrato completo.

---

## Critérios de aceitação

- Contrato salvo com sucesso.
- Apenas contratos do usuário logado aparecem.
- Lista ordenada do mais recente para o mais antigo.
- Página protegida por autenticação.
- Nenhum PDF é gerado.
- Nenhuma edição é permitida.
- Nenhuma exclusão é permitida.
- TypeScript sem erros.
- git diff --check aprovado.

---

## Fora do escopo

- PDF.
- Download.
- Impressão.
- Compartilhamento.
- Assinatura.
- Stripe.


