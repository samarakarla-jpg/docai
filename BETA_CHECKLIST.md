# Checklist do primeiro beta — Eletricistas

## Estado

O DocAI está preparado para uso beta controlado por eletricistas. A Sprint 20 foi concluída em 4 de agosto de 2026. O beta deve ser acompanhado e o conteúdo gerado precisa ser revisado antes de ser enviado ou aceito.

## Funcionalidades implementadas

- Cadastro, login, logout e proteção das áreas autenticadas com Supabase Auth.
- Fluxo direto para criação de propostas de serviços elétricos.
- Catálogo com 44 serviços elétricos configurados e a opção “Outro serviço”.
- Seleção de um ou mais serviços na mesma proposta.
- Formulário orientado pelos serviços escolhidos, com perguntas gerais e elétricas.
- Identificação do cliente e do eletricista.
- Coleta de local, observações, itens incluídos, exclusões, valor, prazo, validade, aceite e pagamento.
- Datas no formato brasileiro e validação de datas impossíveis.
- Valores internos estáveis para opções técnicas, com rótulos legíveis na geração.
- Geração de proposta com contexto estruturado e integração de IA existente.
- Persistência das propostas por usuário, incluindo serviços e participantes.
- Histórico de propostas e contratos com acesso aos documentos salvos.
- Visualização da proposta com orientação de revisão e áreas de assinatura.
- Download em PDF, compartilhamento pelo recurso nativo do navegador e impressão.
- Fallback de compartilhamento com download do PDF para envio manual.
- Interface responsiva e mensagens de preenchimento em português simples.

## Funcionalidades pendentes

- Recuperação e redefinição de senha, planejadas na Sprint 21 e ainda não implementadas.
- Edição de uma proposta salva e nova geração sobre o mesmo registro.
- Integração direta com WhatsApp.
- Exportação para Word.
- Ampliação do fluxo orientado por serviços para outras profissões.
- Revisão jurídica formal das definições que ainda estão marcadas como conteúdo inicial.

## Limitações conhecidas

- O beta orientado por serviços está disponível somente para eletricistas.
- A proposta é gerada por IA e pode conter imprecisões; revisão humana continua obrigatória.
- O DocAI não substitui orientação jurídica profissional quando ela for necessária.
- “Outro serviço” usa descrição livre e perguntas genéricas; não possui perguntas específicas próprias.
- O compartilhamento de arquivo depende do suporte do navegador. Sem suporte, o PDF é baixado para envio manual.
- Não há envio direto para WhatsApp.
- Não há script de lint configurado no projeto; a validação atual usa testes, typecheck, build e `git diff --check`.
- A operação depende da disponibilidade e da configuração correta do Supabase e do provedor de IA.

## Validações concluídas

- [x] Revisão final de textos, nomenclaturas, mensagens, labels e placeholders.
- [x] 159 testes existentes aprovados.
- [x] Typecheck aprovado.
- [x] Build de produção aprovado.
- [x] `git diff --check` aprovado.
- [x] Nenhuma nova dependência instalada durante o fechamento.
- [x] Nenhuma alteração de autenticação realizada durante o fechamento.
- [x] Nenhuma alteração de banco de dados realizada durante o fechamento.
- [x] Nenhuma nova funcionalidade adicionada durante o fechamento.

## Verificações operacionais antes de convidar usuários

- [ ] Confirmar as variáveis de ambiente do Supabase e do provedor de IA no ambiente beta.
- [ ] Confirmar que as migrações aprovadas estão aplicadas no projeto Supabase do beta.
- [ ] Executar manualmente o fluxo completo com uma conta de teste: cadastro, login, criação, geração, histórico e abertura da proposta.
- [ ] Testar download, compartilhamento e impressão em celular e computador.
- [ ] Verificar o fluxo com um serviço, vários serviços e “Outro serviço”.
- [ ] Confirmar isolamento dos registros entre duas contas de teste.
- [ ] Revisar uma amostra das propostas geradas antes de convidar eletricistas externos.
- [ ] Definir um canal para receber relatos de erro e sugestões dos participantes do beta.

## Próximos passos sugeridos antes do lançamento oficial

1. Conduzir o beta com um grupo pequeno de eletricistas e registrar dúvidas recorrentes.
2. Priorizar correções de bloqueios, erros de geração e problemas de uso encontrados no beta.
3. Submeter o conteúdo contratual a revisão jurídica formal.
4. Implementar a recuperação de senha somente após ativação e aprovação da Sprint 21.
5. Reexecutar testes, typecheck, build, validação manual responsiva e revisão de segurança antes do lançamento oficial.

## Decisão de lançamento

O projeto está apto para um beta controlado após a conclusão das verificações operacionais acima. Esta conclusão não equivale à aprovação para lançamento público irrestrito.
