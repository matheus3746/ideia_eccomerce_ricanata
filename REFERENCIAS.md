# Referências — Rica Nata (demo UI/UX)

Documento de apoio para evoluirmos a demonstração e, depois, o site real. Use este arquivo como guia quando formos implementar novas telas ou fluxos.

---

##  Site atual


| Item           | Link                                                         |
| -------------- | ------------------------------------------------------------ |
| **Loja atual** | [https://www.ricanata.com.br/](https://www.ricanata.com.br/) |
| **Plataforma** | ISET (templates + funcionalidades nativas de e-commerce)     |
| **Demo local** | Pasta `ricanata-demo/` — HTML/CSS estático, sem backend      |


> A demo **não substitui** a plataforma. Serve para alinhar layout, fluxos e decisões de UX antes de replicar na ISET.

---

## Outros trabalhos ISET (referências de padrão)

Sites da mesma agência/plataforma — úteis para comparar navbar, cards de produto, carrinho, checkout e identidade visual.


| Loja                 | URL                                                                                | Observações úteis                                                          |
| -------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Marmita Fitness**  | [https://www.marmitafitness.com.br/](https://www.marmitafitness.com.br/)           | Cardápio/planos, fluxo de assinatura e compra recorrente                   |
| **Nobbli**           | [https://www.nobbli.com.br/](https://www.nobbli.com.br/)                           | Layout moderno, vitrine e conversão                                        |
| **Nerea**            | [https://www.lojanerea.com.br/](https://www.lojanerea.com.br/)                     | Carrosséis, kits, navegação por categorias (inspirou “Navegar por Kits”)   |
| **Medicina Natural** | [https://www.lojamedicinanatural.com.br/](https://www.lojamedicinanatural.com.br/) | **Destaques** com preço à vista, parcelamento, botão **ADICIONAR** no card |
| **Arte Chocolate**   | [https://www.artechocolate.com/](https://www.artechocolate.com/)                   | Vitrine premium, hierarquia visual e fotos de produto                      |
| **Pendure**          | [https://pendure.com.br/](https://pendure.com.br/)                                 | Mobile-first, listagens e experiência de compra                            |


---

## Identidade Rica Nata (demo)


| Elemento                          | Valor / uso                                          |
| --------------------------------- | ---------------------------------------------------- |
| Vermelho principal                | `#c8102e`                                            |
| Vermelho escuro (dropdown, hover) | `#a00d25`                                            |
| Verde (CTA, links “Ver tudo”)     | `#2ea44f`                                            |
| Dourado (detalhes, avaliações)    | `#c9a227`                                            |
| Tipografia demo                   | Inter (Google Fonts)                                 |
| Tom de voz                        | Técnico + acessível — público produtor de laticínios |


---

## Fluxo de compra desejado (orgânico)

Comportamento esperado nos **cards de produto** (home, listagens, destaques):

### 1. Clique na área do produto (imagem + título)

- **Ação:** ir para a **página do produto** (PDP).
- **Área clicável:** imagem, título e, opcionalmente, preço/avaliação — **não** incluir o botão de compra.
- **Referência visual:** cards da [Medicina Natural](https://www.lojamedicinanatural.com.br/) — produto “respira”, botão separado embaixo.

### 2. Clique em **Adicionar** / **Comprar**

- **Produto simples** (sem variação): adiciona direto ao carrinho + feedback (badge no ícone, toast ou mini-confirmação).
- **Produto com opções** (ex.: fermentos por volume): abrir **modal ou drawer** antes de adicionar — usuário escolhe opções, quantidade e confirma.

### 3. Produtos com seleção obrigatória (ex.: fermentos)

No site atual da Rica Nata, ao clicar em comprar em fermento aparece modal com:

- Grade de volumes (20 L, 50 L, 100 L, …)
- Seletor de quantidade (+ / −)
- Botão **COMPRAR** (verde, largura total)
- Link **Ver informações completas** → PDP

**Referência:** print do modal de “Fermento para Mussarela Fermentação Lenta” (`ricanata.com.br`).


| Tipo de produto             | Comportamento no botão                 |
| --------------------------- | -------------------------------------- |
| Apostila, acessório simples | Adicionar direto                       |
| Fermento, insumo com volume | Modal de opções → depois carrinho      |
| Kit com composição fixa     | PDP ou modal conforme regra de negócio |


### 4. Hierarquia de botões nos cards (referência Medicina Natural)

```
[ Badge entrega / oferta ]
[ Imagem ]          ← link PDP
[ Título ]          ← link PDP
[ Estrelas + qtd ]
[ Preço riscado / à vista / parcelas ]
[ ADICIONAR ]       ← ação carrinho (não navega)
```

---

## Carrinho mobile (referência externa)

Exemplo enviado: carrinho **Dakota** (mobile, Instagram browser).


| Padrão          | Descrição                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Cabeçalho claro | “SEU CARRINHO (N ITENS)”                                                                                 |
| Item            | thumb + nome + variante (ex.: tamanho) + preço + **Remover**                                             |
| Upsell          | Seção “Complete seu look” / equivalente: **“Complete sua produção”** com carrossel e botão **Adicionar** |
| Footer fixo     | Total + botão **FINALIZAR COMPRA** (verde, full width)                                                   |


Adaptação sugerida para Rica Nata:

- Upsell: fermento complementar, coalho, termômetro, apostila relacionada
- Manter verde no CTA e vermelho só em detalhes de marca

---

## Mapa de telas (prioridade para próximas demos)


| Prioridade | Tela                       | Referências                       | Notas                                               |
| ---------- | -------------------------- | --------------------------------- | --------------------------------------------------- |
| **Alta**   | Página de produto (PDP)    | ricanata.com.br, Medicina Natural | FAQ técnico, galeria, opções, produtos relacionados |
| **Alta**   | Listagem de categoria      | Nerea, Nobbli                     | Grid + scroll mobile + filtros                      |
| **Alta**   | Modal quick-buy (fermento) | Print Rica Nata                   | Volume + qty + comprar                              |
| **Média**  | Carrinho mobile            | Dakota (exemplo)                  | Lista + upsell + total fixo                         |
| **Média**  | Mini-cart / drawer         | Marmita Fitness, Nerea            | Resumo sem sair da vitrine                          |
| **Média**  | Busca e resultados         | —                                 | Empty state + sugestões                             |
| **Baixa**  | Checkout                   | Lojas ISET                        | Tap targets, resumo do pedido                       |
| **Baixa**  | Tecnologia Láctea (artigo) | Blog ISET                         | Conteúdo + produtos sugeridos                       |


---

## O que já existe na demo (`index.html`)

- [x] Header fixo, top bar, busca, conta, carrinho (visual)
- [x] Navbar com dropdowns + sub-dropdowns (Prensas, Laboratório)
- [x] Seção **Navegar por Kits** (carrossel)
- [x] Grids de produtos com scroll mobile
- [x] Tecnologia Láctea, FAQ, avaliações, rodapé (pagamento, rastreio)
- [x] Menu mobile drawer (identidade vermelha)
- [ ] PDP real
- [ ] Modal de opções (fermento)
- [ ] Carrinho funcional
- [ ] Links reais produto ↔ carrinho

> Botões “Veja mais” / “Comprar” hoje são `#` — próximo passo é simular o fluxo acima em HTML/JS leve ou prototipar telas separadas.

---

## Assets e prints de referência (workspace)

Prints salvos na conversa / pasta de assets do Cursor:


| Arquivo                    | Conteúdo                                         |
| -------------------------- | ------------------------------------------------ |
| Destaques Medicina Natural | Cards com ADICIONAR, preço à vista, parcelamento |
| Modal fermento Rica Nata   | Escolha de volume + quantidade + COMPRAR         |
| Carrinho Dakota mobile     | Layout carrinho + upsell + finalizar             |


Ao pedir nova feature, cite o print ou a seção deste documento.

---

## SEO e conteúdo (site real)

- **Title / meta** por página de produto e categoria (não duplicar)
- **FAQ técnico** na PDP (coalho, fermento, equipamento)
- **Tecnologia Láctea** — conteúdo educacional + links internos para produtos
- Demo com `noindex` — não publicar demo no mesmo domínio do site oficial

---

## Como usar este arquivo no dia a dia

1. Antes de implementar uma tela, consulte **Fluxo de compra** e **Mapa de telas**.
2. Abra 1–2 lojas ISET da tabela para comparar o padrão da plataforma.
3. Compare sempre com **ricanata.com.br** (regra de negócio e catálogo real).
4. Atualize a seção **O que já existe na demo** quando concluirmos entregas.

---

## Links rápidos (copiar/colar)

```
Site cliente:     https://www.ricanata.com.br/
Marmita Fitness:  https://www.marmitafitness.com.br/
Nobbli:           https://www.nobbli.com.br/
Nerea:            https://www.lojanerea.com.br/
Medicina Natural: https://www.lojamedicinanatural.com.br/
Arte Chocolate:   https://www.artechocolate.com/
Pendure:          https://pendure.com.br/
```

---

*Última atualização: junho/2025 — demo `ricanata-demo`.*