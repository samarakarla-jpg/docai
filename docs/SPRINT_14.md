# Sprint 14 — Pesquisa estratégica da categoria “Contratos Gerais”

> **Natureza da Sprint:** pesquisa, análise e planejamento. Este documento não autoriza implementação.
>
> **Data de corte da pesquisa:** 28 de julho de 2026.

## 1. Resumo executivo

Esta pesquisa recomenda uma biblioteca inicial deliberadamente pequena. Foram avaliados **13 candidatos** e somente **5** foram classificados como essenciais para implementação imediata:

1. Contrato de Prestação de Serviços;
2. Proposta Comercial com Aceite;
3. Termo de Alteração de Escopo;
4. Termo de Entrega e Aceite;
5. Acordo de Confidencialidade (NDA).

A seleção cobre o ciclo mais recorrente do público-alvo: compartilhar informações com segurança, apresentar e aceitar uma oferta, formalizar o serviço, registrar mudanças e concluir a entrega. Cancelamento, pagamento, parcelamento, atraso, inadimplência, responsabilidades, materiais e garantia aplicável devem ser tratados dentro do Contrato de Prestação de Serviços, sem fragmentação desnecessária.

A hipótese inicial foi **parcialmente confirmada**. Quatro itens foram mantidos: Prestação de Serviços, Proposta com Aceite, Alteração de Escopo e Entrega/Aceite. O Recibo de Pagamento foi rebaixado para complementar porque resolve uma necessidade simples, possui alternativas gratuitas e fiscais e tende a gerar menor disposição a pagar. O NDA ocupa a quinta posição por proteger a fase anterior e paralela à contratação e por atender várias profissões.

### Fatos que sustentam a decisão

- O Mapa de Empresas registrou 24,2 milhões de empresas ativas no segundo quadrimestre de 2025; 93,8% eram micro ou pequenas, 12,66 milhões eram MEIs e comércio mais serviços representavam 82,2% das empresas ativas.
- No Consumidor.gov.br, em 2024, cobrança/contestação respondeu por 42,72% dos problemas registrados, contrato/oferta por 16,81%, vício de qualidade por 13,88% e entrega por 4,18%. A base não representa especificamente relações entre MEIs, mas sinaliza onde relações comerciais falham.
- Em março de 2026, a Serasa Experian registrou 8,9 milhões de empresas inadimplentes, das quais 8,4 milhões eram micro e pequenas. O indicador mede compromissos vencidos e não prova que contratos evitam inadimplência; demonstra apenas a relevância econômica de preço, vencimento, prova e renegociação claros.
- O Código de Defesa do Consumidor exige orçamento prévio discriminado para serviços ao consumidor e determina que, depois de aprovado, ele somente seja alterado por livre negociação. O Código Civil disciplina proposta, quitação, boa-fé e prestação de serviços.

### Inferência de produto

Não foi encontrada pesquisa pública, nacional e representativa que meça intenção de compra por tipo de contrato entre MEIs e pequenos negócios. Frequência e disposição a pagar são, portanto, **estimativas estratégicas**, derivadas de abrangência, urgência, exposição financeira, recorrência e existência de alternativas gratuitas. Devem ser validadas posteriormente com dados próprios de busca, início, conclusão e compra.

## 2. Objetivo da pesquisa

Definir poucos documentos de alto valor para a categoria “Contratos Gerais”, priorizando MEIs, autônomos, profissionais liberais, pequenos prestadores de serviços e microempresas brasileiras.

O resultado deve:

- resolver problemas reconhecíveis sem conhecimento jurídico;
- servir a várias profissões;
- permitir um primeiro rascunho em aproximadamente três minutos;
- proteger as duas partes com cláusulas proporcionais;
- ter potencial de conversão e reutilização;
- evitar modelos redundantes ou de alto risco jurídico para um fluxo simplificado.

## 3. Metodologia

### 3.1 Fontes e recorte

A pesquisa combinou:

- legislação federal vigente, especialmente Código Civil, Código de Defesa do Consumidor, LGPD e Lei de Direitos Autorais;
- Mapa de Empresas do Governo Federal;
- dados de conflitos do Consumidor.gov.br;
- indicadores de inadimplência empresarial da Serasa Experian;
- orientação e oferta de modelo de prestação de serviços do Sebrae;
- dados gerais do Conselho Nacional de Justiça para dimensionar custo e duração da litigiosidade, sem atribuir causalidade a contratos específicos.

### 3.2 Separação entre evidência e decisão

- **Fato:** informação diretamente sustentada por fonte citada.
- **Inferência:** conclusão provável, mas não medida diretamente pela fonte.
- **Recomendação:** decisão de produto tomada a partir dos fatos, inferências, limites arquiteturais e Regra dos 3 Minutos.

### 3.3 Critérios de priorização

Os candidatos foram comparados por:

1. demanda ampla;
2. frequência provável;
3. reutilização entre profissões;
4. exposição financeira e conflito evitado;
5. disposição estimada a pagar;
6. utilidade para fechar, executar ou concluir serviços;
7. preenchimento em aproximadamente três minutos;
8. complexidade jurídica e de implementação;
9. sobreposição com outro documento;
10. existência de alternativa gratuita ou fiscal que reduza valor percebido.

As classificações não são estatísticas de mercado. São prioridades relativas para orientar o produto.

## 4. Perfil do público-alvo

O público central possui baixa disponibilidade de tempo, pouca familiaridade jurídica e forte dependência de fluxo de caixa. Em geral, precisa transformar conversas por mensagens em acordos claros sem contratar assessoria individual para cada operação.

Segmentos com maior aderência:

- design, fotografia, vídeo, redação, tradução e marketing;
- desenvolvimento, tecnologia, suporte e serviços digitais;
- consultoria, treinamento e serviços administrativos;
- manutenção, reparos, beleza, eventos e serviços locais;
- arquitetura, engenharia e outras atividades profissionais, respeitadas as regras da profissão;
- microempresas que contratam ou prestam serviços B2B e B2C.

O Mapa de Empresas confirma o tamanho do público e a predominância de comércio e serviços. Isso não significa que todos necessitam dos mesmos documentos; justifica priorizar modelos horizontais e reconhecer depois necessidades específicas de comércio.

## 5. Problemas mais relevantes encontrados

### 5.1 Escopo informal

Pedidos feitos por mensagens raramente registram inclusões, exclusões, entregáveis, revisões e dependências do cliente. O resultado provável é retrabalho, cobrança contestada e expectativa incompatível.

### 5.2 Oferta e aceite sem prova organizada

Preço, validade, prazo e condições podem ficar espalhados entre orçamento, conversa e áudio. O Código Civil prevê que a proposta pode obrigar o proponente, e o CDC determina que informação suficientemente precisa integra o contrato de consumo.

### 5.3 Alteração sem novo acordo

Mudanças de escopo, prazo e preço são comuns durante a execução. Em relações de consumo, o orçamento aprovado só pode ser alterado por livre negociação. Um termo curto reduz a disputa sobre o que mudou e o que permaneceu.

### 5.4 Pagamento e inadimplência

Preço sem vencimento, parcelamento ambíguo, sinal sem regra e cobrança sem vínculo claro enfraquecem a relação. O alto número de MPEs inadimplentes reforça a necessidade de previsibilidade financeira, mas nenhum contrato elimina risco de crédito ou garante recebimento.

### 5.5 Aceite subjetivo e conclusão indefinida

Sem critério e prazo de aceite, o serviço pode permanecer indefinidamente “em revisão”. Um termo de entrega deve registrar o que foi entregue, ressalvas e pendências sem retirar direitos legais.

### 5.6 Cancelamento mal resolvido

As partes precisam saber aviso, pagamento pelo trabalho executado, devolução de materiais e obrigações que continuam. Para a primeira versão, essas regras devem permanecer no contrato principal; o Distrato é valioso, mas menos frequente.

### 5.7 Confidencialidade confundida com propriedade ou LGPD

O NDA protege informação para uma finalidade definida. Ele não transfere direitos autorais e não substitui acordo de tratamento de dados. Dados pessoais exigem medidas de segurança e outras obrigações próprias da LGPD.

## 6. Critérios de priorização aplicados

### Essencial

Demanda horizontal, problema claro, alta reutilização, boa disposição estimada a pagar, baixa dependência de profissão e formulário viável em três minutos.

### Importante

Alto valor quando necessário, mas menor frequência, maior complexidade ou dependência de um evento posterior.

### Complementar

Útil para ampliar a jornada, porém com menor valor percebido, alternativas simples ou público mais restrito.

### Não recomendado

Sobreposição relevante, segmentação desnecessária, risco jurídico desproporcional ou inadequação a um fluxo geral simplificado.

## 7. Avaliação dos contratos candidatos

### 7.1 Contrato de Prestação de Serviços

1. **Nome recomendado:** Contrato de Prestação de Serviços.
2. **Nome simples:** Contrato de Serviço.
3. **Descrição comercial:** Formalize serviço, prazo, pagamento e responsabilidades sem começar do zero.
4. **Problema:** transforma negociação informal em acordo executável e compreensível.
5. **Público:** praticamente todos os prestadores e seus clientes.
6. **Situação prática:** antes de iniciar serviço pontual, recorrente ou por etapas.
7. **Frequência:** alta.
8. **Disposição estimada a pagar:** alta — inferência baseada em recorrência e valor financeiro exposto.
9. **Riscos reduzidos:** escopo indefinido, atraso, inadimplência, cancelamento e responsabilidade ambígua.
10. **Conflitos evitados:** “não estava incluído”, “não foi entregue”, “o pagamento era em outra data”.
11. **Reutilização:** muito alta entre profissões.
12. **Complexidade de implementação:** média.
13. **Complexidade jurídica:** média; cresce em relação de consumo ou profissão regulada.
14. **Regra dos 3 Minutos:** sim — 2min30–3min com perfis reutilizados.
15. **Campos essenciais:** serviço; entregáveis; prazo; preço; pagamento; obrigações do cliente; aceite; cancelamento.
16. **Campos opcionais:** parcelas; despesas; revisões; garantia contratual; materiais; confidencialidade; direitos de uso.
17. **Reutilização e automação:** partes, CPF/CNPJ, endereço, representante, contatos, dados do prestador, moeda e cidade padrão.
18. **Justificativa:** maior combinação de demanda, reutilização, risco evitado e potencial de receita.
19. **Prioridade:** essencial.
20. **Abandono e simplificação:** escopo aberto, multa e direitos autorais podem travar o usuário; usar exemplos curtos, opções condicionais e não exigir penalidade.

### 7.2 Proposta Comercial com Aceite

1. **Nome recomendado:** Proposta Comercial com Aceite.
2. **Nome simples:** Proposta com Aceite.
3. **Descrição comercial:** Envie uma proposta clara que o cliente possa aceitar sem perder preço, prazo e escopo em mensagens.
4. **Problema:** organiza a fase de venda e registra a aceitação.
5. **Público:** prestadores, consultores, criativos, técnicos e pequenas empresas.
6. **Situação prática:** cotação ou apresentação de solução antes do contrato completo.
7. **Frequência:** alta.
8. **Disposição estimada a pagar:** média/alta; documento diretamente ligado a fechar receita.
9. **Riscos reduzidos:** oferta vaga, validade incerta, aceite sem prova e promessa comercial divergente.
10. **Conflitos evitados:** preço antigo, prazo não confirmado, item presumido e condição desconhecida.
11. **Reutilização:** muito alta.
12. **Complexidade de implementação:** baixa/média.
13. **Complexidade jurídica:** média, pois proposta aceita pode vincular as partes.
14. **Regra dos 3 Minutos:** sim — 2–2min30.
15. **Campos essenciais:** necessidade do cliente; solução/escopo; entregáveis; preço; pagamento; prazo; validade; forma de aceite.
16. **Campos opcionais:** opções de pacote; cronograma; despesas; premissas; próximos passos.
17. **Reutilização e automação:** prestador, marca, contatos, dados de cobrança, cliente, moeda e validade sugerida editável.
18. **Justificativa:** ajuda a fechar o serviço e funciona como porta de entrada para o contrato principal.
19. **Prioridade:** essencial.
20. **Abandono e simplificação:** redigir solução e cronograma do zero causa atrito; oferecer exemplos por tipo de serviço e começar com uma única opção comercial.

### 7.3 Termo de Alteração de Escopo

1. **Nome recomendado:** Termo de Alteração de Escopo.
2. **Nome simples:** Alteração de Escopo.
3. **Descrição comercial:** Registre o pedido extra e ajuste preço ou prazo antes de continuar o trabalho.
4. **Problema:** formaliza mudanças sem reescrever o contrato inteiro.
5. **Público:** qualquer prestador com contrato ou proposta aceita.
6. **Situação prática:** novo entregável, revisão adicional, mudança de prazo ou retirada de atividade.
7. **Frequência:** média/alta.
8. **Disposição estimada a pagar:** alta no momento da mudança, quando existe risco direto de trabalho gratuito.
9. **Riscos reduzidos:** expansão de escopo, prazo impossível, custo não aprovado e contradição documental.
10. **Conflitos evitados:** “era só um ajuste”, “já estava incluído” e “não aprovei o valor adicional”.
11. **Reutilização:** muito alta.
12. **Complexidade de implementação:** baixa/média.
13. **Complexidade jurídica:** média; deve vincular claramente o documento original.
14. **Regra dos 3 Minutos:** sim — 1min30–2min.
15. **Campos essenciais:** documento original; mudança; motivo simples; impacto no preço; impacto no prazo; data de eficácia; aceite.
16. **Campos opcionais:** novo cronograma; anexos; itens removidos; forma de cobrança.
17. **Reutilização e automação:** partes, contrato, escopo, preço e prazo originais; preservar automaticamente as condições não alteradas.
18. **Justificativa:** resolve uma das maiores dores da execução com formulário curto e alto valor percebido.
19. **Prioridade:** essencial.
20. **Abandono e simplificação:** localizar cláusulas e redigir linguagem jurídica causa abandono; perguntar apenas o que muda na prática e seu impacto.

### 7.4 Termo de Entrega e Aceite

1. **Nome recomendado:** Termo de Entrega e Aceite de Serviços.
2. **Nome simples:** Entrega e Aceite.
3. **Descrição comercial:** Registre o que foi entregue, as ressalvas e a conclusão do serviço.
4. **Problema:** cria prova organizada da entrega e encerra a fase de aprovação.
5. **Público:** prestadores por projeto, agências, técnicos, consultores e clientes.
6. **Situação prática:** entrega final, marco intermediário ou aceite com pequenas pendências.
7. **Frequência:** alta em trabalhos por projeto; média no conjunto do mercado.
8. **Disposição estimada a pagar:** média/alta como parte da jornada contratual; menor isoladamente.
9. **Riscos reduzidos:** alegação de não entrega, revisão infinita, saldo contestado e garantia sem início definido.
10. **Conflitos evitados:** data da entrega, arquivos recebidos, ressalvas e pendências.
11. **Reutilização:** alta.
12. **Complexidade de implementação:** baixa.
13. **Complexidade jurídica:** baixa/média; não pode afastar garantias ou direitos obrigatórios.
14. **Regra dos 3 Minutos:** sim — 1–1min30.
15. **Campos essenciais:** contrato/proposta; entregáveis; data; resultado da conferência; aceite ou ressalvas; pendências e prazo.
16. **Campos opcionais:** anexos/links; observações; início de suporte ou garantia contratual.
17. **Reutilização e automação:** partes, projeto, entregáveis e critérios de aceite; sugerir a data atual, sempre editável.
18. **Justificativa:** conclui o ciclo, reduz suporte e aumenta retenção ao conectar-se aos documentos anteriores.
19. **Prioridade:** essencial.
20. **Abandono e simplificação:** repetir entregáveis já informados é o principal atrito; pré-preencher a lista e permitir confirmar, retirar ou registrar ressalva.

### 7.5 Acordo de Confidencialidade (NDA)

1. **Nome recomendado:** Acordo de Confidencialidade.
2. **Nome simples:** Acordo de Sigilo (NDA).
3. **Descrição comercial:** Compartilhe informações de projeto ou negócio com finalidade e limites claros.
4. **Problema:** impede uso ou divulgação fora da finalidade combinada.
5. **Público:** consultores, tecnologia, agências, criativos, potenciais parceiros, clientes e fornecedores.
6. **Situação prática:** antes de proposta detalhada, acesso a sistemas, dados comerciais ou estratégia.
7. **Frequência:** média.
8. **Disposição estimada a pagar:** média/alta em negócios com informação sensível; baixa em operações simples.
9. **Riscos reduzidos:** divulgação, acesso excessivo, retenção e uso competitivo indevido.
10. **Conflitos evitados:** o que era sigiloso, quem podia acessar, por quanto tempo e para qual finalidade.
11. **Reutilização:** alta entre profissões.
12. **Complexidade de implementação:** baixa/média.
13. **Complexidade jurídica:** média.
14. **Regra dos 3 Minutos:** sim — 2–2min30 no caso comum.
15. **Campos essenciais:** unilateral/mútuo; finalidade; categorias de informação; destinatários; duração; devolução/eliminação.
16. **Campos opcionais:** exceções adicionais; cópias de segurança; divulgação exigida por lei; multa sujeita a revisão.
17. **Reutilização e automação:** partes, representantes, projeto, contatos e categorias de destinatários já informadas.
18. **Justificativa:** amplia a biblioteca para a fase pré-contratual e atende vários setores sem depender de atividade específica.
19. **Prioridade:** essencial.
20. **Abandono e simplificação:** conceito de informação sigilosa e prazo geram dúvida; usar categorias claras, ajuda contextual e duração sugerida editável.

### 7.6 Distrato de Contrato

1. **Nome recomendado:** Distrato de Contrato.
2. **Nome simples:** Encerramento de Contrato.
3. **Descrição comercial:** Encerre o acordo e registre pagamentos, entregas e devoluções pendentes.
4. **Problema:** evita término informal e quitação ambígua.
5. **Público:** qualquer parte de contrato em andamento.
6. **Situação prática:** encerramento consensual antes ou depois da conclusão parcial.
7. **Frequência:** média/baixa.
8. **Disposição estimada a pagar:** alta quando necessário, por urgência e risco.
9. **Riscos reduzidos:** cobrança futura, abandono, acesso mantido e quitação excessiva.
10. **Conflitos evitados:** saldo, data final, materiais, confidencialidade e obrigações sobreviventes.
11. **Reutilização:** alta.
12. **Complexidade de implementação:** média.
13. **Complexidade jurídica:** média/alta; o Código Civil exige a forma aplicável ao contrato encerrado.
14. **Regra dos 3 Minutos:** sim — 2–2min30 no encerramento consensual simples.
15. **Campos essenciais:** contrato original; data final; entregas; pagamentos; devoluções; alcance da quitação.
16. **Campos opcionais:** motivo; transição; obrigações sobreviventes; anexos.
17. **Reutilização e automação:** todas as informações do contrato original, saldo e entregas já registradas, sem presumir quitação.
18. **Justificativa:** alto valor, mas menor frequência e dependência de contrato anterior justificam entrada posterior.
19. **Prioridade:** importante.
20. **Abandono e simplificação:** apurar saldo e escolher alcance da quitação são os maiores riscos; exibir resumo financeiro e explicar as opções total, parcial ou sem quitação.

### 7.7 Acordo de Reconhecimento e Parcelamento de Dívida

1. **Nome recomendado:** Acordo de Reconhecimento e Parcelamento de Dívida.
2. **Nome simples:** Acordo de Pagamento.
3. **Descrição comercial:** Registre o saldo e um novo calendário de pagamento.
4. **Problema:** organiza renegociação depois do atraso.
5. **Público:** prestadores, clientes, fornecedores e pequenas empresas credoras ou devedoras.
6. **Situação prática:** obrigação vencida que as partes desejam parcelar.
7. **Frequência:** média.
8. **Disposição estimada a pagar:** alta e urgente.
9. **Riscos reduzidos:** saldo contestado, parcela ambígua, quitação prematura e novo atraso.
10. **Conflitos evitados:** origem da dívida, valores pagos, juros, vencimentos e consequências.
11. **Reutilização:** alta.
12. **Complexidade de implementação:** média.
13. **Complexidade jurídica:** alta, especialmente em encargos, garantias, novação e executividade.
14. **Regra dos 3 Minutos:** sim apenas no caso simples — 2min30–3min; garantias ou divergência de saldo exigem revisão.
15. **Campos essenciais:** origem; principal; pagamentos; saldo; parcelas; vencimentos; atraso; quitação.
16. **Campos opcionais:** desconto; entrada; garantia; vencimento antecipado; testemunhas.
17. **Reutilização e automação:** partes, contrato, histórico financeiro, pagamentos e saldo calculável, sempre sujeito à confirmação.
18. **Justificativa:** forte dor financeira, mas exige revisão jurídica mais intensa que os essenciais.
19. **Prioridade:** importante.
20. **Abandono e simplificação:** encargos, garantias e cálculo do saldo são complexos; limitar o fluxo inicial a dívida reconhecida e parcelas, encaminhando exceções para revisão.

### 7.8 Contrato de Compra e Venda de Bem Móvel

1. **Nome recomendado:** Contrato de Compra e Venda de Bem Móvel.
2. **Nome simples:** Compra e Venda de Bem.
3. **Descrição comercial:** Registre qual bem foi vendido, seu estado, preço e entrega.
4. **Problema:** reduz informalidade na venda de bem identificável.
5. **Público:** comércio, prestadores vendendo equipamentos e compradores empresariais ou particulares.
6. **Situação prática:** venda de equipamento, móvel, ferramenta ou outro bem não regulado.
7. **Frequência:** média.
8. **Disposição estimada a pagar:** média/alta conforme valor do bem.
9. **Riscos reduzidos:** identidade, estado, acessórios, entrega, pagamento e garantia adicional.
10. **Conflitos evitados:** defeito aparente, item faltante, data de entrega e saldo.
11. **Reutilização:** média/alta.
12. **Complexidade de implementação:** baixa/média.
13. **Complexidade jurídica:** média; consumo e bens sujeitos a registro exigem cuidado.
14. **Regra dos 3 Minutos:** sim — 2–2min30 para bem móvel comum.
15. **Campos essenciais:** bem; identificadores; estado; preço; pagamento; entrega; conferência.
16. **Campos opcionais:** acessórios; frete; instalação; fotos; garantia contratual.
17. **Reutilização e automação:** partes, endereços, pagamento, moeda e local de entrega recorrente.
18. **Justificativa:** atende comércio, mas é menos alinhado ao primeiro núcleo de serviços e deve vir depois dele.
19. **Prioridade:** importante.
20. **Abandono e simplificação:** descrição técnica e estado do bem causam hesitação; pedir identificador, condição em opções simples e permitir foto/anexo opcional.

### 7.9 Licença ou Cessão de Direitos Autorais

1. **Nome recomendado:** Licença ou Cessão de Direitos Autorais.
2. **Nome simples:** Direitos de Uso da Criação.
3. **Descrição comercial:** Defina como o cliente pode usar uma criação e o que permanece com o autor.
4. **Problema:** separa entrega material de direitos de exploração.
5. **Público:** designers, fotógrafos, redatores, audiovisual, desenvolvedores e agências.
6. **Situação prática:** entrega ou reutilização de obra protegida.
7. **Frequência:** média em segmentos criativos; baixa no público geral.
8. **Disposição estimada a pagar:** alta nos segmentos afetados.
9. **Riscos reduzidos:** uso além do combinado, exclusividade presumida, ausência de crédito e remuneração incompleta.
10. **Conflitos evitados:** mídia, finalidade, território, prazo, adaptação e sublicença.
11. **Reutilização:** média.
12. **Complexidade de implementação:** média/alta.
13. **Complexidade jurídica:** alta; a Lei 9.610/1998 exige precisão e interpreta omissões restritivamente.
14. **Regra dos 3 Minutos:** sim apenas para licença simples — 2min30–3min; cessão ampla exige revisão.
15. **Campos essenciais:** obra; titular; licença/cessão; usos; exclusividade; prazo; território; remuneração.
16. **Campos opcionais:** adaptação; sublicença; crédito; portfólio; canais.
17. **Reutilização e automação:** partes, projeto, obra/entregáveis e remuneração do contrato relacionado.
18. **Justificativa:** alto valor setorial, mas baixa horizontalidade e maior risco jurídico.
19. **Prioridade:** complementar.
20. **Abandono e simplificação:** modalidade, exclusividade, território e usos confundem leigos; usar explicações com exemplos e bloquear simplificação indevida de cessão total.

### 7.10 Recibo de Pagamento

1. **Nome recomendado:** Recibo de Pagamento e Quitação Específica.
2. **Nome simples:** Recibo de Pagamento.
3. **Descrição comercial:** Confirme um pagamento e identifique exatamente o que foi quitado.
4. **Problema:** fornece prova simples de pagamento e evita quitação vaga.
5. **Público:** qualquer pagador ou recebedor.
6. **Situação prática:** pagamento em dinheiro, transferência ou parcela vinculada a um serviço.
7. **Frequência:** alta.
8. **Disposição estimada a pagar:** baixa isoladamente.
9. **Riscos reduzidos:** negação do pagamento e dúvida sobre dívida ou parcela quitada.
10. **Conflitos evitados:** valor, data, meio e alcance da quitação.
11. **Reutilização:** muito alta.
12. **Complexidade de implementação:** baixa.
13. **Complexidade jurídica:** baixa/média; quitação ampla ou de parcelas periódicas exige cuidado.
14. **Regra dos 3 Minutos:** sim — 30–60 segundos.
15. **Campos essenciais:** pagador; recebedor; valor; dívida/parcela; data; meio; assinatura.
16. **Campos opcionais:** contrato relacionado; competência; observação.
17. **Reutilização e automação:** partes, contrato, valor, parcela, meio de pagamento e data do evento, sujeitos à confirmação.
18. **Justificativa:** útil, mas comprovante bancário e nota fiscal são alternativas comuns; melhor como complemento automático da jornada.
19. **Prioridade:** complementar.
20. **Abandono e simplificação:** digitar novamente partes e dívida reduz valor; gerar a partir do pagamento relacionado e perguntar apenas o alcance da quitação.

### 7.11 Contrato de Fornecimento de Produtos

1. **Nome recomendado:** Contrato de Fornecimento de Produtos.
2. **Nome simples:** Fornecimento de Produtos.
3. **Descrição comercial:** Organize pedidos recorrentes, preços e entregas.
4. **Problema:** reduz renegociação informal em compras repetidas.
5. **Público:** fabricantes, revendedores, alimentação, eventos e varejo.
6. **Situação prática:** fornecimento recorrente B2B.
7. **Frequência:** média no mercado, baixa para prestadores puros.
8. **Disposição estimada a pagar:** alta no segmento adequado.
9. **Riscos reduzidos:** especificação, volume, preço, reajuste, estoque e substituição.
10. **Conflitos evitados:** pedido não aceito, atraso, qualidade e quantidade.
11. **Reutilização:** média.
12. **Complexidade de implementação:** média/alta.
13. **Complexidade jurídica:** média/alta.
14. **Regra dos 3 Minutos:** não com segurança no caso típico; catálogo, níveis de serviço e reajuste tendem a superar três minutos.
15. **Campos essenciais:** produtos; pedidos; quantidade; preço; entrega; conferência; substituição; duração.
16. **Campos opcionais:** mínimo; exclusividade; previsão de volume; reajuste; embalagem; frete.
17. **Reutilização e automação:** partes, endereços, contatos comerciais, catálogo e locais de entrega, caso esses dados existam.
18. **Justificativa:** valioso, mas dependente de contexto comercial e menos aderente ao primeiro núcleo horizontal.
19. **Prioridade:** não recomendado para a biblioteca inicial; reavaliar em categoria comercial.
20. **Abandono e simplificação:** volume, reajuste e níveis de serviço são pontos críticos; não retirar essas perguntas apenas para cumprir tempo, preferindo fluxo comercial especializado.

### 7.12 Contrato de Freelancer separado

1. **Nome recomendado:** não criar como definição separada nesta fase.
2. **Nome simples:** Contrato para Freelancer.
3. **Descrição comercial:** seria uma apresentação segmentada de prestação de serviços por projeto.
4. **Problema:** escopo, revisões, entrega e direitos de uso.
5. **Público:** criativos e profissionais digitais independentes.
6. **Situação prática:** projeto com começo e fim.
7. **Frequência:** alta no segmento.
8. **Disposição estimada a pagar:** alta.
9. **Riscos reduzidos:** revisões ilimitadas, arquivo-fonte, atraso e aceite.
10. **Conflitos evitados:** idênticos aos do contrato geral com opções de projeto.
11. **Reutilização:** média/alta.
12. **Complexidade de implementação:** baixa/média.
13. **Complexidade jurídica:** média.
14. **Regra dos 3 Minutos:** sim — 2min30–3min, se tratado como preset simples do contrato principal.
15. **Campos essenciais:** já cobertos por Prestação de Serviços.
16. **Campos opcionais:** revisões, arquivos-fonte, portfólio e direitos de uso.
17. **Reutilização e automação:** integralmente igual ao contrato principal, incluindo projeto, entregáveis e pagamento.
18. **Justificativa:** boa palavra comercial, mas nova definição duplicaria produto; pode futuramente ser preset ou comunicação, se autorizados.
19. **Prioridade:** não recomendado como contrato separado.
20. **Abandono e simplificação:** revisões e direitos de uso são as maiores dúvidas; campos condicionais resolvem isso dentro do contrato principal sem duplicação.

### 7.13 Contrato de Consultoria separado

1. **Nome recomendado:** não criar como definição separada nesta fase.
2. **Nome simples:** Contrato de Consultoria.
3. **Descrição comercial:** seria uma variante de prestação de serviços intelectuais.
4. **Problema:** delimita diagnóstico, recomendação, execução e ausência de garantia de resultado.
5. **Público:** consultores, estrategistas e especialistas.
6. **Situação prática:** diagnóstico, parecer ou acompanhamento.
7. **Frequência:** média.
8. **Disposição estimada a pagar:** alta no segmento.
9. **Riscos reduzidos:** resultado presumido, dados insuficientes e implementação implícita.
10. **Conflitos evitados:** diferença entre aconselhar, executar e garantir resultado.
11. **Reutilização:** média.
12. **Complexidade de implementação:** baixa/média.
13. **Complexidade jurídica:** média/alta conforme profissão regulada.
14. **Regra dos 3 Minutos:** sim para consultoria geral — 2min30–3min; não para atividade regulada complexa.
15. **Campos essenciais:** podem ser expressos no Contrato de Prestação de Serviços.
16. **Campos opcionais:** método, reuniões, suporte, conflito de interesses e materiais.
17. **Reutilização e automação:** integralmente igual ao contrato principal, incluindo objetivos, entregáveis e acessos necessários.
18. **Justificativa:** segmentação comercial não justifica duplicação inicial; profissões reguladas exigem tratamento próprio.
19. **Prioridade:** não recomendado como contrato separado.
20. **Abandono e simplificação:** separar recomendação de execução e garantia de resultado exige ajuda contextual; resolver como opções do contrato principal e sinalizar atividade regulada.

## 8. Contratos essenciais

| Ordem | Contrato | Papel na jornada | Frequência | Disposição a pagar | Tempo |
| --- | --- | --- | --- | --- | --- |
| 1 | Prestação de Serviços | Formalizar e executar | Alta | Alta | 2min30–3min |
| 2 | Proposta Comercial com Aceite | Fechar | Alta | Média/alta | 2–2min30 |
| 3 | Alteração de Escopo | Proteger margem durante execução | Média/alta | Alta no evento | 1min30–2min |
| 4 | Entrega e Aceite | Concluir e provar entrega | Média/alta | Média/alta na jornada | 1–1min30 |
| 5 | Confidencialidade | Proteger negociação e execução | Média | Média/alta no segmento | 2–2min30 |

Esses cinco são suficientemente diferentes para evitar duplicação e suficientemente conectados para formar uma jornada reutilizável.

## 9. Contratos importantes

- **Distrato de Contrato:** resolve encerramento urgente e fecha o ciclo, mas ocorre menos vezes que contratação e entrega.
- **Acordo de Reconhecimento e Parcelamento de Dívida:** possui alto valor financeiro, porém exige revisão jurídica mais rigorosa.
- **Compra e Venda de Bem Móvel:** atende comércio e ativos físicos, mas deve entrar após o núcleo horizontal de serviços.

## 10. Contratos complementares

- **Licença ou Cessão de Direitos Autorais:** alto valor para criativos, menor abrangência e maior precisão jurídica.
- **Recibo de Pagamento:** muito frequente e simples, porém baixo valor percebido isolado; idealmente deriva de contrato e pagamento já informados.

## 11. Contratos não recomendados

- **Fornecimento de Produtos na biblioteca inicial:** relevante para comércio recorrente, mas exige contexto de catálogo, pedidos, volume e reajuste e pode ultrapassar a Regra dos 3 Minutos.
- **Freelancer como contrato separado:** sobrepõe-se à Prestação de Serviços; segmentação pode ser resolvida futuramente por apresentação ou preset, sem duplicar definição.
- **Consultoria como contrato separado:** também se sobrepõe à Prestação de Serviços e pode exigir regras de profissão regulada.

Fora dos 13 candidatos detalhados, também não se recomenda incluir nesta categoria inicial contratos trabalhistas/PJ “sem vínculo”, imóveis, veículos sujeitos a registro, sociedade, franquia, representação comercial habitual, procuração genérica ou tratamento de dados pessoais. Possuem legislação, formalidades ou riscos incompatíveis com um fluxo geral simplificado.

## 12. Validação da hipótese inicial

| Hipótese | Decisão | Razão |
| --- | --- | --- |
| Prestação de Serviços | Confirmada — posição 1 | Maior abrangência, recorrência e exposição financeira. |
| Proposta Comercial com Aceite | Confirmada — posição 2 | Ajuda a converter negociação em receita e possui apoio jurídico claro para oferta e orçamento. |
| Termo de Alteração de Escopo | Confirmada — posição 3 | Protege margem, prazo e relacionamento durante a execução. |
| Recibo de Pagamento | Rebaixada a complementar | Útil, mas simples, com alternativas gratuitas/fiscais e menor disposição a pagar. |
| Termo de Conclusão ou Entrega | Confirmada e renomeada — posição 4 | “Entrega e Aceite” descreve melhor a função sem presumir quitação geral. |
| Acordo de Confidencialidade | Incluído — posição 5 | Protege a fase pré-contratual e atende várias profissões sem duplicar o contrato principal. |

A hipótese capturou corretamente a jornada do serviço, mas superestimou o Recibo como produto pago e não cobriu o compartilhamento de informação anterior à contratação.

## 13. Recomendação final para a Sprint 15

A Sprint 15 deve implementar **exatamente os cinco essenciais**, sem incluir importantes ou complementares:

1. **Contrato de Prestação de Serviços** — primeiro porque define o padrão jurídico e de UX do núcleo. Resolve escopo, preço, atraso, responsabilidades e cancelamento. Reutilizável por praticamente todos os prestadores. Deve gerar a maior aquisição e conversão por reconhecer a dor central.
2. **Proposta Comercial com Aceite** — segundo porque alimenta o topo da jornada e pode converter usuários que ainda não chegaram ao contrato. Reutilizável por vendas de serviços em geral. Favorece recorrência de uso e criação posterior do contrato.
3. **Termo de Alteração de Escopo** — terceiro porque aproveita dados dos dois primeiros e protege receita adicional. Serve a criativos, tecnologia, consultoria, manutenção, eventos e projetos em geral. Aumenta retenção ao trazer o usuário de volta durante a execução.
4. **Termo de Entrega e Aceite** — quarto porque conclui a mesma jornada com pouquíssimas perguntas. Reduz disputa, ajuda na cobrança de saldo e estabelece o momento de suporte ou garantia aplicável. Aumenta a utilidade do conjunto, não apenas de um documento isolado.
5. **Acordo de Confidencialidade** — quinto porque amplia a biblioteca sem depender de contrato anterior. Reutilizável em tecnologia, criação, consultoria, agências e parcerias. Pode atrair novos usuários em fase de negociação e direcioná-los para Proposta e Prestação de Serviços.

Essa ordem maximiza reutilização de dados e permite validar progressivamente o funil **proposta → contrato → alteração → aceite**, adicionando o NDA como porta de entrada paralela.

## 14. Proposta de campos e UX para os contratos essenciais

### 14.1 Regra operacional dos 3 minutos

O tempo refere-se à geração do primeiro rascunho por usuário com as informações disponíveis. Não inclui negociação, leitura, revisão jurídica ou assinatura.

Princípios:

- no máximo 8–10 decisões de negócio por documento;
- uma pergunta por tela ou grupo lógico curto;
- rótulos em linguagem comum;
- opções seguras antes de texto livre;
- campos condicionais somente quando a resposta os tornar necessários;
- resumo final antes da geração;
- nenhuma cláusula penal, garantia ou cessão ampla presumida.

### 14.2 Dados reutilizáveis automaticamente

- nome/razão social;
- CPF/CNPJ;
- endereço;
- representante e contato;
- profissão ou atividade;
- dados da contraparte já usada;
- moeda e cidade padrão;
- contrato, proposta, escopo, entregáveis, preço e prazo de documento relacionado.

A reutilização é recomendação de UX para capacidades existentes ou futuras devidamente autorizadas; não autoriza alteração arquitetural nesta Sprint.

### 14.3 Prestação de Serviços

**Perguntar:** “Qual serviço será realizado?”, “O que será entregue?”, “Quando começa e termina?”, “Qual o valor combinado?”, “Como será pago?”, “O que o cliente precisa fornecer?”, “Como a entrega será aprovada?” e “Como funciona o cancelamento?”.

**Opcionais:** parcelas, revisões, despesas, materiais, confidencialidade, direitos de uso e garantia contratual.

**Preenchimento automático/reuso:** partes, contatos, cidade, moeda e dados profissionais.

**Pontos de abandono:** descrição de escopo ampla, cálculo de multa, escolha jurídica sobre propriedade intelectual. Simplificar com exemplos, defaults proporcionais e campos condicionais.

### 14.4 Proposta Comercial com Aceite

**Perguntar:** necessidade do cliente, solução, entregáveis, preço, forma de pagamento, prazo, validade e forma de aceite.

**Opcionais:** pacotes, cronograma, despesas, premissas e anexos.

**Preenchimento automático/reuso:** dados comerciais do prestador, cliente, moeda e condições usadas anteriormente.

**Pontos de abandono:** escrever proposta do zero e estimar cronograma. Oferecer exemplos curtos e permitir uma única opção de serviço no fluxo inicial.

### 14.5 Alteração de Escopo

**Perguntar:** documento original, o que muda, impacto no valor, impacto no prazo, data da mudança e aceite.

**Opcionais:** motivo, novo cronograma, itens retirados e anexos.

**Preenchimento automático/reuso:** partes, escopo, preço, prazo e identificação do documento original.

**Pontos de abandono:** localizar cláusula jurídica e reescrever contrato. Perguntar pelo resultado prático da mudança, não pelo número da cláusula.

### 14.6 Entrega e Aceite

**Perguntar:** documento relacionado, o que foi entregue, data, aceite sem ressalvas ou com ressalvas, pendências e prazo.

**Opcionais:** links, anexos, observações e início de suporte/garantia contratual.

**Preenchimento automático/reuso:** partes, entregáveis e critério de aceite.

**Pontos de abandono:** listar novamente tudo que já constava do contrato. Pré-preencher entregáveis e permitir confirmar ou editar.

### 14.7 Confidencialidade

**Perguntar:** unilateral ou mútuo, finalidade, tipos de informação, quem pode receber, duração e devolução/eliminação.

**Opcionais:** exceções adicionais, backups, divulgação legal e penalidade sujeita a revisão.

**Preenchimento automático/reuso:** partes, representantes e projeto relacionado.

**Pontos de abandono:** definir “informação confidencial” e prazo. Oferecer categorias simples e explicar que NDA não transfere direitos nem substitui LGPD.

## 15. Riscos jurídicos e limitações

- Esta é pesquisa de produto, não parecer jurídico.
- Nenhum modelo deve prometer validade universal, prevenção de litígio ou recebimento garantido.
- Relações de consumo podem impor informação, garantia, arrependimento e responsabilidade que não podem ser afastados pelo contrato.
- Relações com subordinação, pessoalidade, habitualidade e onerosidade exigem análise trabalhista; o nome do documento não elimina vínculo real.
- Profissões reguladas, dados sensíveis, software complexo, cessão total de direitos, operações internacionais e valores relevantes exigem revisão especializada.
- Aceite e quitação devem ser específicos; um termo de entrega não deve criar renúncia geral.
- NDA não substitui acordo de tratamento de dados nem medidas de segurança previstas na LGPD.
- Assinatura eletrônica, prova e eventual executividade dependem do método e das circunstâncias; o produto não deve prometer execução automática.
- Os dados do Consumidor.gov.br cobrem empresas participantes e relações de consumo, não são uma amostra representativa de contratos entre pequenos negócios.
- Os indicadores da Serasa medem dívidas negativadas da empresa, não inadimplência dos clientes em contratos de serviço.
- Disposição a pagar e frequência por documento permanecem hipóteses até medição dentro do DocAI.
- A Regra dos 3 Minutos precisa de teste cronometrado com usuários; a análise atual verifica apenas viabilidade estrutural.

## 16. Fontes consultadas

Fontes acessadas em 28 de julho de 2026:

1. [Mapa de Empresas — Boletim do 2º quadrimestre de 2025](https://www.gov.br/memp/pt-br/assuntos/noticias/abertura-de-empresas-cresce-14-1-no-2o-quadrimestre-de-2025-no-brasil/mapa-de-empresas-boletim-2o-quadrimestre-2025.pdf/@@display-file/file) — porte, MEIs e distribuição por setor.
2. [Mapa de Empresas — painel oficial](https://www.gov.br/empresas-e-negocios/pt-br/mapa-de-empresas/mapa-de-empresas) — acompanhamento mensal do universo empresarial.
3. [Código Civil — Lei nº 10.406/2002](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm) — arts. 319–320 (quitação), 421-A–431 (boa-fé, proposta e aceite), 472–476 (extinção e inadimplemento) e 593–609 (prestação de serviços).
4. [Código de Defesa do Consumidor — Lei nº 8.078/1990](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm) — oferta, qualidade, orçamento prévio, cobrança, compreensão contratual, arrependimento e garantia.
5. [Boletim Consumidor.gov.br 2024](https://www.gov.br/mj/pt-br/assuntos/seus-direitos/consumidor/defesadoconsumidor/Biblioteca/boletins-1/boletim-consumidor-gov-br-2024.pdf) — grupos de problemas registrados na plataforma.
6. [Indicador de inadimplência empresarial — março de 2026, Serasa Experian](https://www.serasaexperian.com.br/sala-de-imprensa/indicadores/inadimplencia-das-empresas-voltou-a-crescer-e-atingiu-89-milhoes-em-marco-revela-serasa-experian/) — volume de empresas e MPEs inadimplentes, com metodologia da fonte.
7. [Sebrae RJ — importância do contrato de prestação de serviços](https://sites.rj.sebrae.com.br/inscricao/modelo-de-contrato-gratuito) — sinal de demanda educacional entre micro e pequenas empresas; não usado como estimativa de vendas.
8. [LGPD — Lei nº 13.709/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) — papéis, responsabilidade e segurança no tratamento de dados.
9. [Lei de Direitos Autorais — Lei nº 9.610/1998](https://www.planalto.gov.br/ccivil_03/leis/l9610.htm) — forma e elementos de licença/cessão.
10. [Justiça em Números 2026 — CNJ](https://www.cnj.jus.br/justica-em-numeros-2026-estoque-de-processos-cai-em-ano-de-maior-demanda-da-serie-historica/) — contexto geral de litigiosidade e duração; não usado para afirmar frequência de disputas contratuais específicas.

## 17. Conclusão

A categoria “Contratos Gerais” deve começar como um sistema enxuto para o ciclo de prestação de serviços, não como coleção ampla de modelos. Os cinco essenciais resolvem problemas distintos, possuem alta reutilização e podem compartilhar informações sem exigir que o usuário compreenda conceitos jurídicos avançados.

A recomendação oficial para a Sprint 15 fica limitada a:

1. Prestação de Serviços;
2. Proposta Comercial com Aceite;
3. Alteração de Escopo;
4. Entrega e Aceite;
5. Confidencialidade.

Antes de expandir a biblioteca, o DocAI deve medir procura, início, abandono, conclusão, compra e reutilização por documento. Distrato, acordo de pagamento e compra e venda são os próximos candidatos, sujeitos a aprovação de nova Sprint e revisão jurídica.

Nenhuma implementação é autorizada por este documento. A Sprint 15 não deve ser iniciada sem aprovação expressa deste planejamento.
