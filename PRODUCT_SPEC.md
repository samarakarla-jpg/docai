# Especificação Oficial do Produto — DocAI

**Status:** fonte oficial da visão e da estratégia do produto

**Data de consolidação:** 28 de julho de 2026

## 1. Responsabilidade deste documento

Este documento define exclusivamente o que é o DocAI, para quem existe, qual problema resolve, como se posiciona e quais capacidades compõem o produto.

Não define arquitetura, contratos específicos, categorias, prioridades da biblioteca, regras de desenvolvimento nem escopo de Sprint. Esses assuntos pertencem às respectivas fontes oficiais:

- arquitetura: [`ARCHITECTURE.md`](ARCHITECTURE.md);
- evolução da biblioteca: [`docs/ROADMAP_BIBLIOTECA.md`](docs/ROADMAP_BIBLIOTECA.md);
- desenvolvimento e colaboração: [`AGENTS.md`](AGENTS.md);
- trabalho autorizado: Sprint ativa.

## 2. Visão

O DocAI é uma plataforma brasileira para criar documentos contratuais profissionais a partir de informações fornecidas pelo usuário. O produto transforma situações comuns de trabalho e negócio em um fluxo orientado, simples e revisável.

O objetivo não é reunir centenas de modelos genéricos. O DocAI oferece uma biblioteca curada de documentos úteis, compreensíveis e capazes de reduzir riscos reais para quem presta ou contrata serviços.

## 3. Problema

MEIs, autônomos, freelancers, profissionais liberais e pequenas empresas frequentemente negociam e executam serviços por mensagens, propostas informais ou acordos incompletos. Isso favorece conflitos sobre escopo, preço, prazo, alterações, cancelamento, pagamento, responsabilidades e entrega.

O acesso a documentos adequados também costuma exigir tempo, conhecimento jurídico ou custo incompatível com operações pequenas e recorrentes.

## 4. Proposta de valor

O DocAI permite que o usuário organize as informações essenciais de uma relação comercial e obtenha rapidamente um primeiro rascunho profissional para leitura, negociação e revisão.

O valor entregue combina:

- orientação estruturada sem exigir domínio de linguagem jurídica;
- redução de dúvidas e omissões durante o preenchimento;
- documentos proporcionais ao problema tratado;
- reutilização de informações já fornecidas;
- revisão humana antes do uso;
- continuidade entre diferentes momentos da jornada comercial.

## 5. Público-alvo

O público principal é formado por:

- microempreendedores individuais — MEIs;
- profissionais autônomos;
- freelancers e profissionais criativos;
- consultores independentes;
- profissionais liberais;
- pequenos prestadores de serviços;
- microempresas e pequenas empresas;
- clientes que precisam formalizar relações simples com esses profissionais.

O produto é especialmente adequado a usuários que possuem informações práticas sobre a negociação, mas não sabem como organizá-las em um documento profissional.

## 6. Posicionamento

O DocAI é uma ferramenta de criação orientada de documentos contratuais, não um escritório de advocacia, serviço de consultoria jurídica ou garantia automática de validade.

O documento gerado é um rascunho sujeito a leitura, negociação e revisão humana. Situações reguladas, trabalhistas, societárias, imobiliárias, internacionais ou de alta complexidade podem exigir atendimento profissional especializado.

## 7. Diferenciais

### Biblioteca curada

Cada documento precisa resolver um problema reconhecível. A composição, as prioridades e os critérios da biblioteca estão definidos exclusivamente no roadmap oficial.

### Preenchimento orientado

As perguntas utilizam linguagem simples e solicitam somente informações necessárias. A definição e os limites da Regra dos 3 Minutos pertencem ao roadmap oficial da biblioteca.

### Jornada conectada

O produto deve permitir reaproveitar informações do usuário e de documentos relacionados, reduzindo repetição e favorecendo retorno ao longo de uma relação comercial.

### Qualidade proporcional

O DocAI procura equilibrar facilidade de uso, clareza e proteção. Simplificação de preenchimento não significa retirada de informações juridicamente relevantes.

### Transparência

O usuário deve compreender o propósito do documento, as informações utilizadas e a necessidade de revisar o resultado antes de utilizá-lo.

## 8. Funcionalidades do produto

O produto pode oferecer, mediante Sprints próprias e aprovadas:

- descoberta e seleção de documentos pela biblioteca;
- formulários orientados conforme o documento escolhido;
- validação das informações fornecidas;
- geração de rascunho contratual;
- apresentação do resultado para leitura e revisão;
- edição e gerenciamento dos documentos do usuário;
- histórico e recuperação de documentos, quando aprovados;
- exportação ou impressão, quando aprovadas;
- reutilização segura de dados do perfil e de documentos anteriores;
- planos, limites e pagamento, quando houver definição comercial aprovada.

A presença de uma funcionalidade nesta especificação não autoriza sua implementação. O estado técnico deve ser verificado no código, nos testes e nas Sprints encerradas.

## 9. Requisitos de experiência

O produto deve:

- usar linguagem direta e compreensível;
- explicar por que uma informação é necessária;
- evitar perguntas repetidas;
- preservar respostas em erros recuperáveis;
- comunicar carregamento, sucesso, ausência e falha;
- permitir revisão antes do uso do documento;
- manter acessibilidade e responsividade conforme `UI_GUIDELINES.md`.

## 10. Segurança, privacidade e confiança

O DocAI deve tratar dados contratuais como informações sensíveis. O produto deve limitar coleta e exposição, isolar dados por usuário, evitar conteúdo sensível em logs e comunicar de forma transparente o uso de serviços externos.

Políticas de retenção, exclusão, compartilhamento e tratamento por terceiros dependem de decisão e implementação próprias antes do lançamento correspondente.

## 11. Fora do escopo

Não fazem parte da proposta do produto:

- substituir advogado ou aconselhamento jurídico individual;
- garantir validade, resultado judicial ou ausência de risco;
- aplicar automaticamente o mesmo documento a qualquer profissão ou jurisdição;
- simplificar relações complexas apenas para ampliar o catálogo;
- manter modelos duplicados que resolvam o mesmo problema;
- considerar roadmap ou pesquisa como autorização de implementação.

## 12. Critérios de sucesso do produto

O DocAI gera valor quando o usuário consegue:

- encontrar o documento adequado para um problema real;
- compreender as perguntas sem conhecimento jurídico avançado;
- fornecer as informações necessárias com baixo atrito;
- receber um rascunho profissional e coerente;
- revisar o conteúdo e compreender suas limitações;
- reutilizar o produto em outras etapas da mesma relação comercial.

Métricas, metas e prioridades específicas da biblioteca pertencem ao roadmap oficial.

## 13. Regra de autorização

Esta especificação define estratégia de produto, mas não autoriza código, dependência, configuração, integração, publicação ou nova Sprint.

Qualquer implementação exige uma Sprint ativa com objetivo, escopo, arquivos autorizados, critérios de aceitação, validações e aprovação explícita.
