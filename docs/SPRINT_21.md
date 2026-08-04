# Sprint 21 — Recuperação de senha com Supabase Auth

## Estado

Planejada para execução futura. A conclusão da Sprint 20 não ativa esta Sprint automaticamente; sua implementação depende de autorização explícita.

## Objetivo

Permitir que uma pessoa recupere o acesso ao DocAI por meio do fluxo oficial de redefinição de senha do Supabase Auth, preservando o cadastro, o login e as demais funcionalidades existentes.

## Escopo

- Adicionar, na tela de login, o link “Esqueceu sua senha?” abaixo do campo de senha.
- Criar uma tela para solicitar a redefinição por e-mail.
- Enviar o e-mail de redefinição utilizando o fluxo oficial do Supabase Auth.
- Criar a tela acessada pelo link recebido para definir uma nova senha.
- Tratar estados de envio, sucesso, erro, link inválido e sessão de recuperação expirada.
- Manter o layout visual, a responsividade e os padrões de acessibilidade existentes no projeto.

## Arquivos previstos

- `app/(auth)/login/page.tsx`
- `app/(auth)/esqueci-minha-senha/page.tsx`
- `app/(auth)/redefinir-senha/page.tsx`
- `app/actions/auth.ts`
- `lib/auth/types.ts`
- `lib/auth/validation.ts`
- Testes diretamente relacionados ao fluxo, caso a infraestrutura de testes aplicável esteja disponível.

A lista deverá ser confirmada antes da implementação. Qualquer arquivo adicional exige justificativa e aprovação dentro desta Sprint.

## Regras

- Utilizar exclusivamente as APIs oficiais de recuperação de senha do Supabase Auth.
- Não alterar o comportamento existente de cadastro, login, logout ou proteção das rotas autenticadas.
- Não alterar configurações, dependências, manifestos, arquivos de lock, persistência, RLS ou modelos de dados sem aprovação explícita.
- Não revelar se um e-mail está ou não cadastrado.
- Não registrar senhas, tokens, códigos de recuperação ou dados sensíveis.
- Validar a nova senha no servidor conforme as regras já adotadas pelo projeto.
- Permitir a atualização da senha somente em uma sessão válida de recuperação.
- Não iniciar automaticamente outra Sprint ou funcionalidade após a entrega.

## Critérios de aceitação

- A tela de login exibe “Esqueceu sua senha?” abaixo do campo de senha.
- O link abre uma tela consistente com o layout atual do DocAI.
- Um e-mail válido pode ser enviado ao fluxo oficial de recuperação do Supabase.
- A resposta apresentada não permite descobrir se o endereço possui cadastro.
- O link recebido direciona para a tela de definição da nova senha.
- A nova senha e sua confirmação são validadas antes do envio.
- Uma sessão válida de recuperação permite atualizar a senha pelo Supabase Auth.
- Links inválidos ou expirados apresentam mensagem compreensível e um caminho de recuperação.
- Após a redefinição, a pessoa pode retornar ao login e autenticar-se com a nova senha.
- Cadastro, login, logout, rotas protegidas e demais funcionalidades permanecem com o comportamento atual.
- A interface é utilizável por teclado, possui foco visível, rótulos associados e mensagens acessíveis.
- A interface foi verificada em larguras reduzidas, intermediárias e amplas.
- Testes aplicáveis, typecheck, build e `git diff --check` possuem resultado conhecido.

## Exclusões

- Alterações no cadastro ou no fluxo normal de login.
- Recuperação por SMS, telefone, suporte manual ou provedor diferente do Supabase.
- Mudança das políticas globais de senha sem aprovação específica.
- Alteração de templates de e-mail, domínio, SMTP ou configurações do projeto Supabase.
- Mudanças em banco de dados, contratos, propostas, pagamentos ou outras áreas do produto.

## Validação prevista

- Revisar o diff completo e confirmar que somente arquivos autorizados foram afetados.
- Executar os testes diretamente relacionados ao fluxo de autenticação.
- Executar o typecheck disponível no projeto.
- Executar o build de produção.
- Executar `git diff --check`.
- Validar manualmente solicitação, retorno pelo link, redefinição, expiração e login com a nova senha em ambiente autorizado.

## Estado de entrega

Implementação, revisão, aprovação, commit, push e encerramento são etapas separadas. A entrega técnica deverá parar antes de commit e push para revisão.
