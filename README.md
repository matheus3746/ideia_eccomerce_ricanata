# Rica Nata — Demonstração de Layout

Página estática de demonstração para apresentar propostas de melhoria de UI/UX ao time de design do e-commerce [ricanata.com.br](https://ricanata.com.br).

**Arquivos:** `index.html` + `styles.css`  
**Referências de UX, lojas ISET e fluxo de compra:** [`REFERENCIAS.md`](REFERENCIAS.md)  
**Como visualizar:** abra `index.html` no navegador ou sirva a pasta com um servidor local.

---

## O que foi feito

### Top bar (faixa vermelha)

- Removido o texto de login/cadastro.
- Frase centralizada com mais destaque: **"A loja virtual mais completa para laticínios"** (maior, negrito, caixa alta).
- Redes sociais, WhatsApp e telefone fixo agrupados à **direita**; apenas o telefone fixo exibe texto.

### Header principal

- Logo real da marca (`imagens/Logo Ricanata.jpg.jpeg`) — versão JPEG com fundo branco, melhor integração no header. Tamanhos ampliados no header e rodapé.
- Barra de busca com placeholder mais descritivo e área de toque ampliada.
- Ícones de conta e carrinho com labels visíveis no desktop.
- Grid responsivo: no mobile, busca ocupa linha inteira abaixo do logo; no desktop, logo | busca | ações na mesma linha.

### Navbar

- Redução de **10 para 8 itens**, conforme combinado:
  - **Prensas** incorporado em **Equipamentos**
  - **Laboratório** incorporado em **Acessórios e Utensílios**
- Menu hambúrguer no mobile com categorias em lista vertical.
- **Blog** substituído por **Tecnologia e Receitas** (diretriz SEO/conteúdo).
- No desktop, itens distribuídos horizontalmente com espaçamento equilibrado.

### SEO (referência do relatório)

- **Title tag:** `Rica Nata | Ingredientes e Equipamentos para Laticínios`
- **Meta description:** ~150 caracteres, foco em conversão e mercado
- **Navbar:** "Tecnologia e Receitas" no lugar de "Blog"
- **Tap targets do banner:** dots com área de clique 48×48 px
- **FAQ técnico:** bloco de exemplo entre avaliações e rodapé (modelo para páginas de produto)
- Demo marcada com `noindex` para não competir com o site oficial no Google

### Header fixo ao rolar (sticky)

- Header permanece fixo no topo ao scroll.
- **Correção do problema da logo minúscula:** a logo reduz proporcionalmente, mas mantém tamanho legível (não fica ilegível como no site atual).
- Top bar some ao rolar para ganhar espaço vertical.
- Navbar permanece visível no desktop (compacta); no mobile fica oculta no scroll e acessível pelo menu.

> Há um script mínimo (~20 linhas) apenas para alternar o estado `is-scrolled`, ajustar o espaçador do header e abrir/fechar o menu mobile. Todo o visual é CSS.

### Conteúdo da página (exemplos)

Seções ilustrativas baseadas nos prints enviados, com placeholders visuais:

- Banner hero (financiamento)
- Fermentos lácteos
- Tanques para produção
- Ideal para você
- Apostilas
- Depoimento / avaliações em cards
- FAQ técnico (exemplo)

Produtos, imagens e textos são fictícios/placeholder — servem só para mostrar disposição dos blocos.

### Rodapé

- Estrutura 100% em **divs** com CSS Grid (sem tabelas).
- Três colunas no desktop: marca + redes | institucional | contatos.
- Links institucionais em **grid de 2 colunas** para reduzir altura e evitar lista longa vertical.
- Barra inferior com copyright e aviso de demonstração.

### Responsividade e UX

- Breakpoints em 540px, 768px, 900px e 1024px.
- **Mobile:** produtos em carrossel horizontal com scroll lateral e indicadores (barras verdes), em vez de lista vertical.
- Grid de produtos no desktop: 1 → 2 → 4 colunas conforme a tela.
- **Avaliações:** cards em carrossel (estrelas, título, texto, avatar e produto) com identidade Rica Nata (vermelho, dourado) e textos genéricos de exemplo.
- Áreas de toque mínimas nos botões e links.
- Contraste e hierarquia visual alinhados à identidade vermelha/verde/dourada da marca.
- Transições suaves no header e nos cards de produto.

---

## O que enviar para evoluirmos a demo

Para montarmos as próximas telas, estes materiais ajudam muito:

| Prioridade | Página / tela | Por quê |
|---|---|---|
| Alta | **Página de produto** (ex.: coalho líquido, fermento iogurte) | FAQ técnico, fotos, title/meta únicos, produtos sugeridos |
| Alta | **Listagem de categoria** (Fermentos, Ingredientes) | Grid mobile, filtros, CLS das imagens |
| Alta | **Home real** (print ou HTML) | Comparar banners, seções e ordem dos blocos |
| Média | **Tecnologia e Receitas / Blog** | Layout de artigo + bloco "produtos sugeridos" |
| Média | **Carrinho e checkout** | Tap targets, fluxo mobile |
| Média | **Busca** (resultados vazios e com itens) | UX informacional |
| Baixa | **Páginas institucionais** (Quem somos, políticas) | Rodapé e links internos |
| Extra | **Planilha/export SEO** (URLs top tráfego, titles atuais) | Manter URLs e corrigir duplicatas |

**Formato ideal:** prints mobile + desktop, URL da página, e (se tiver) title/meta description atuais cadastrados na Iset.

---

## Próximos passos (fora desta demo)

Esta página é referência visual para o time de design. A implementação no site real (ISET/plataforma) exigirá adaptação dos templates, imagens reais e integração com funcionalidades existentes (carrinho, login, busca, etc.).
