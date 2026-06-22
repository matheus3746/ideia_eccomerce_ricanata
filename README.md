# Rica Nata — Demonstração de Layout

Página estática de demonstração para apresentar propostas de melhoria de UI/UX ao time de design do e-commerce [ricanata.com.br](https://ricanata.com.br).

**Arquivos:** `index.html` + `styles.css`  
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
- No desktop, itens distribuídos horizontalmente com espaçamento equilibrado.

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
- Depoimento
- Newsletter

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

## Próximos passos (fora desta demo)

Esta página é referência visual para o time de design. A implementação no site real (ISET/plataforma) exigirá adaptação dos templates, imagens reais e integração com funcionalidades existentes (carrinho, login, busca, etc.).
