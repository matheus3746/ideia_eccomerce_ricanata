(function () {
  var STORAGE_KEY = 'ricanata-demo-cart';

  function formatMoney(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function getProducts() {
    return window.RN_PRODUCTS || {};
  }

  function getProduct(id) {
    return getProducts()[id] || null;
  }

  function loadCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateCartBadge();
    renderCartDrawer();
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: { items: items } }));
  }

  function itemKey(productId, variant) {
    return productId + '|' + (variant || '');
  }

  function getCartCount(items) {
    items = items || loadCart();
    return items.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function getCartTotal(items) {
    items = items || loadCart();
    return items.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
  }

  function updateCartBadge() {
    var count = getCartCount();
    document.querySelectorAll('.cart-badge').forEach(function (badge) {
      badge.textContent = String(count);
      badge.classList.toggle('cart-badge--empty', count === 0);
    });
    document.querySelectorAll('.header-action--cart').forEach(function (link) {
      link.setAttribute('aria-label', 'Carrinho com ' + count + ' ' + (count === 1 ? 'item' : 'itens'));
    });
  }

  function addToCart(productId, qty, variant, openDrawer) {
    var product = getProduct(productId);
    if (!product) return false;

    qty = Math.max(1, parseInt(qty, 10) || 1);
    var key = itemKey(productId, variant);
    var items = loadCart();
    var existing = items.find(function (i) { return i.key === key; });

    if (existing) {
      existing.qty += qty;
    } else {
      items.push({
        key: key,
        productId: productId,
        name: product.name,
        variant: variant || '',
        price: product.price,
        qty: qty,
        image: product.image
      });
    }

    saveCart(items);
    if (openDrawer !== false && !document.body.classList.contains('cart-page')) {
      openCartDrawer();
    }
    return true;
  }

  function removeFromCart(key) {
    saveCart(loadCart().filter(function (i) { return i.key !== key; }));
  }

  function showToast(message) {
    var toast = document.getElementById('cartToast');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.add('is-visible');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () {
      toast.classList.remove('is-visible');
      setTimeout(function () { toast.hidden = true; }, 300);
    }, 2800);
  }

  function openQuickBuy(productId) {
    var product = getProduct(productId);
    var modal = document.getElementById('quickBuyModal');
    if (!product || !modal || product.type !== 'fermento') return;

    modal.dataset.productId = productId;
    modal.querySelector('.quick-buy__title').textContent = product.name;
    modal.querySelector('.quick-buy__desc').textContent = product.shortDesc;
    modal.querySelector('.quick-buy__brand').textContent = product.brand;
    modal.querySelector('.quick-buy__ref').textContent = 'Ref.: ' + product.ref;
    modal.querySelector('.quick-buy__price').textContent = formatMoney(product.price);
    modal.querySelector('.quick-buy__pdp').href = 'produto.html?id=' + encodeURIComponent(productId);

    var image = modal.querySelector('.quick-buy__image');
    image.className = 'quick-buy__image product-card__image product-card__image--' + product.image;

    var optionsEl = modal.querySelector('.quick-buy__options');
    optionsEl.innerHTML = '';
    product.volumes.forEach(function (vol, index) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quick-buy__option' + (index === 0 ? ' is-selected' : '');
      btn.textContent = vol;
      btn.dataset.value = vol;
      optionsEl.appendChild(btn);
    });

    var qtyInput = modal.querySelector('.quick-buy__qty-input');
    qtyInput.value = '1';

    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.querySelector('.quick-buy__close').focus();
  }

  function closeQuickBuy() {
    var modal = document.getElementById('quickBuyModal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  }

  function getSelectedVolume(modal) {
    var selected = modal.querySelector('.quick-buy__option.is-selected');
    return selected ? selected.dataset.value : '';
  }

  function initQuickBuyModal() {
    var modal = document.getElementById('quickBuyModal');
    if (!modal) return;

    modal.querySelector('.quick-buy__backdrop').addEventListener('click', closeQuickBuy);
    modal.querySelector('.quick-buy__close').addEventListener('click', closeQuickBuy);

    modal.querySelector('.quick-buy__options').addEventListener('click', function (e) {
      var btn = e.target.closest('.quick-buy__option');
      if (!btn) return;
      modal.querySelectorAll('.quick-buy__option').forEach(function (b) {
        b.classList.remove('is-selected');
      });
      btn.classList.add('is-selected');
    });

    modal.querySelector('.quick-buy__qty-minus').addEventListener('click', function () {
      var input = modal.querySelector('.quick-buy__qty-input');
      input.value = String(Math.max(1, parseInt(input.value, 10) - 1 || 1));
    });

    modal.querySelector('.quick-buy__qty-plus').addEventListener('click', function () {
      var input = modal.querySelector('.quick-buy__qty-input');
      input.value = String(Math.max(1, parseInt(input.value, 10) + 1 || 2));
    });

    modal.querySelector('.quick-buy__buy').addEventListener('click', function () {
      var productId = modal.dataset.productId;
      var volume = getSelectedVolume(modal);
      var qty = parseInt(modal.querySelector('.quick-buy__qty-input').value, 10) || 1;
      if (!volume) return;
      addToCart(productId, qty, volume);
      closeQuickBuy();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeQuickBuy();
    });
  }

  function initProductCards() {
    document.querySelectorAll('.product-card[data-product-id]').forEach(function (card) {
      var productId = card.dataset.productId;
      var product = getProduct(productId);
      if (!product) return;

      var addBtn = card.querySelector('.btn--add-cart, .btn--buy');
      if (addBtn) {
        addBtn.addEventListener('click', function (e) {
          e.preventDefault();
          if (product.type === 'fermento') {
            openQuickBuy(productId);
            return;
          }
          var qty = 1;
          var qtyEl = card.querySelector('.qty-selector span');
          if (qtyEl) qty = parseInt(qtyEl.textContent, 10) || 1;
          addToCart(productId, qty);
        });
      }

      var minus = card.querySelector('.qty-selector button:first-child');
      var plus = card.querySelector('.qty-selector button:last-child');
      var qtySpan = card.querySelector('.qty-selector span');
      if (minus && plus && qtySpan) {
        minus.addEventListener('click', function () {
          qtySpan.textContent = String(Math.max(1, parseInt(qtySpan.textContent, 10) - 1));
        });
        plus.addEventListener('click', function () {
          qtySpan.textContent = String(parseInt(qtySpan.textContent, 10) + 1);
        });
      }
    });
  }

  function renderCartPage() {
    var listEl = document.getElementById('cartItemsList');
    var emptyEl = document.getElementById('cartEmpty');
    var contentEl = document.getElementById('cartContent');
    var totalEl = document.getElementById('cartTotal');
    var countEl = document.getElementById('cartItemCount');
    if (!listEl) return;

    var items = loadCart();
    var count = getCartCount(items);
    var total = getCartTotal(items);

    if (countEl) {
      countEl.textContent = String(count);
    }
    if (totalEl) {
      totalEl.textContent = formatMoney(total);
    }

    if (items.length === 0) {
      if (emptyEl) emptyEl.hidden = false;
      if (contentEl) contentEl.hidden = true;
      listEl.innerHTML = '';
      return;
    }

    if (emptyEl) emptyEl.hidden = true;
    if (contentEl) contentEl.hidden = false;

    listEl.innerHTML = items.map(function (item) {
      var variantHtml = item.variant
        ? '<p class="cart-item__variant">' + item.variant + '</p>'
        : '';
      return (
        '<article class="cart-item" data-key="' + item.key + '">' +
          '<div class="cart-item__thumb product-card__image product-card__image--' + item.image + '"></div>' +
          '<div class="cart-item__info">' +
            '<h3 class="cart-item__name">' + item.name + '</h3>' +
            variantHtml +
            '<p class="cart-item__qty">Qtd: ' + item.qty + '</p>' +
          '</div>' +
          '<div class="cart-item__actions">' +
            '<button type="button" class="cart-item__remove" data-remove="' + item.key + '">Remover</button>' +
            '<p class="cart-item__price">' + formatMoney(item.price * item.qty) + '</p>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    listEl.querySelectorAll('[data-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removeFromCart(btn.dataset.remove);
        renderCartPage();
      });
    });
  }

  function initCartUpsell() {
    var upsellEl = document.getElementById('cartUpsell');
    if (!upsellEl) return;

    var upsellIds = ['coalho-liquido', 'termometro-sonda'];
    var index = 0;

    function renderUpsell() {
      var id = upsellIds[index];
      var product = getProduct(id);
      if (!product) return;
      upsellEl.querySelector('.cart-upsell__name').textContent = product.name;
      upsellEl.querySelector('.cart-upsell__price').textContent = '+ ' + formatMoney(product.price);
      upsellEl.querySelector('.cart-upsell__thumb').className =
        'cart-upsell__thumb product-card__image product-card__image--' + product.image;
      upsellEl.dataset.productId = id;
    }

    upsellEl.querySelector('.cart-upsell__prev').addEventListener('click', function () {
      index = (index - 1 + upsellIds.length) % upsellIds.length;
      renderUpsell();
    });
    upsellEl.querySelector('.cart-upsell__next').addEventListener('click', function () {
      index = (index + 1) % upsellIds.length;
      renderUpsell();
    });
    upsellEl.querySelector('.cart-upsell__add').addEventListener('click', function () {
      addToCart(upsellEl.dataset.productId, 1);
      renderCartPage();
    });

    renderUpsell();
  }

  function initProductPage() {
    var root = document.getElementById('productPage');
    if (!root) return;

    var params = new URLSearchParams(window.location.search);
    var productId = params.get('id') || 'fermento-mussarela';
    var product = getProduct(productId);
    if (!product) {
      root.innerHTML = '<p class="pdp-error">Produto não encontrado. <a href="index.html">Voltar à loja</a></p>';
      return;
    }

    var cashPrice = product.price * 0.95;
    var stars = '★★★★★'.slice(0, product.rating || 0) + '☆☆☆☆☆'.slice(product.rating || 0);

    document.title = product.name + ' | Rica Nata';
    root.querySelector('.pdp__title').textContent = product.name;
    root.querySelector('.pdp__desc').textContent = product.shortDesc;
    root.querySelector('.pdp__brand').textContent = product.brand;
    root.querySelector('.pdp__ref').textContent = 'Referência: ' + product.ref;
    root.querySelector('.pdp__price').textContent = formatMoney(product.price);
    root.querySelector('.pdp__installments').textContent =
      'ou em até 1x de ' + formatMoney(product.price) + ' no cartão ou ' + formatMoney(cashPrice) + ' à vista com 5% de desconto';
    root.querySelector('.pdp__rating').innerHTML =
      stars + ' <span>(' + product.reviews + ')</span> · <a href="#">Dê a sua avaliação!</a>';

    var imageClass = 'product-card__image product-card__image--' + product.image;
    root.querySelector('.pdp__image').className = 'pdp__image ' + imageClass;

    var badgesEl = document.getElementById('pdpBadges');
    if (badgesEl) {
      badgesEl.innerHTML = product.type === 'fermento'
        ? '<span class="badge badge--gray">Entrega imediata</span><span class="badge badge--blue">Exclusividade</span>'
        : product.image === 'apostila'
          ? '<span class="badge badge--green">Frete grátis</span><span class="badge badge--gray">Entrega imediata</span>'
          : '<span class="badge badge--gray">Entrega imediata</span>';
    }

    var breadcrumb = document.getElementById('pdpBreadcrumb');
    if (breadcrumb) {
      var category = product.type === 'fermento' ? 'Fermentos Lácteos' : product.image === 'apostila' ? 'Cursos e Apostilas' : 'Equipamentos';
      breadcrumb.innerHTML =
        '<a href="index.html">Home</a><span aria-hidden="true">›</span>' +
        '<a href="index.html#' + (product.type === 'fermento' ? 'fermentos' : 'produtos') + '">' + category + '</a><span aria-hidden="true">›</span>' +
        '<span>' + product.brand + '</span><span aria-hidden="true">›</span>' +
        '<span aria-current="page">' + product.name + '</span>';
    }

    var longDesc = document.getElementById('pdpLongDesc');
    if (longDesc) {
      longDesc.textContent = product.type === 'apostila' || product.image === 'apostila'
        ? 'Apostila ilustrada com fotos em cores, espiral metalizada e conteúdo prático para produção de derivados lácteos. Enviada em envelope ou caixa de papelão.'
        : product.shortDesc + ' Produto com nota fiscal emitida pela Ciência do Leite LTDA. Suporte técnico: (37) 3334-1618.';
    }

    var faqSection = document.getElementById('pdpFaq');
    var faq = faqSection ? faqSection.querySelector('.pdp-faq') : null;
    if (faq && product.image === 'apostila') {
      var faqTitle = faqSection.querySelector('.section-title');
      if (faqTitle) faqTitle.textContent = 'Sobre a apostila';
      faq.innerHTML =
        '<details open><summary>Formato e conteúdo</summary><p>Apostila espiral com fotos ilustrativas em cores e receitas passo a passo.</p></details>' +
        '<details><summary>Embalagem</summary><p>Enviada em envelope ou caixa de papelão, conforme disponibilidade.</p></details>';
    }

    var optionsWrap = root.querySelector('.pdp__options');
    var qtyInput = root.querySelector('.pdp__qty-input');
    var buyBtn = root.querySelector('.pdp__buy');

    function handleBuy() {
      var qty = parseInt(qtyInput.value, 10) || 1;
      var variant = '';
      if (product.type === 'fermento') {
        var sel = root.querySelector('.quick-buy__option.is-selected');
        variant = sel ? sel.dataset.value : '';
        if (!variant) return;
      }
      addToCart(productId, qty, variant);
    }

    if (product.type === 'fermento' && optionsWrap) {
      optionsWrap.hidden = false;
      optionsWrap.innerHTML = '<p class="pdp__options-label">Escolha</p><div class="quick-buy__options pdp__options-grid"></div>';
      var grid = optionsWrap.querySelector('.pdp__options-grid');
      product.volumes.forEach(function (vol, i) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quick-buy__option' + (i === 0 ? ' is-selected' : '');
        btn.textContent = vol;
        btn.dataset.value = vol;
        grid.appendChild(btn);
      });
      grid.addEventListener('click', function (e) {
        var btn = e.target.closest('.quick-buy__option');
        if (!btn) return;
        grid.querySelectorAll('.quick-buy__option').forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected');
      });
    } else if (optionsWrap) {
      optionsWrap.hidden = true;
    }

    root.querySelector('.pdp__qty-minus').addEventListener('click', function () {
      qtyInput.value = String(Math.max(1, parseInt(qtyInput.value, 10) - 1 || 1));
    });
    root.querySelector('.pdp__qty-plus').addEventListener('click', function () {
      qtyInput.value = String(parseInt(qtyInput.value, 10) + 1 || 2);
    });

    buyBtn.addEventListener('click', handleBuy);
  }

  function injectCartDrawer() {
    if (document.getElementById('cartDrawer') || document.body.classList.contains('cart-page')) return;

    var drawer = document.createElement('div');
    drawer.className = 'cart-drawer';
    drawer.id = 'cartDrawer';
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML =
      '<div class="cart-drawer__backdrop" id="cartDrawerBackdrop"></div>' +
      '<aside class="cart-drawer__panel" role="dialog" aria-modal="true" aria-labelledby="cartDrawerTitle">' +
        '<header class="cart-drawer__header">' +
          '<h2 id="cartDrawerTitle">Seu carrinho (<span id="cartDrawerCount">0</span>)</h2>' +
          '<button type="button" class="cart-drawer__close" id="cartDrawerClose" aria-label="Fechar carrinho">' +
            '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18.3 5.7a1 1 0 00-1.4-1.4L12 9.17 7.1 4.3a1 1 0 10-1.4 1.42L10.6 10.6 5.7 15.5a1 1 0 101.42 1.4L12 12.01l4.88 4.89a1 1 0 001.42-1.42l-4.9-4.9 4.9-4.88z"/></svg>' +
          '</button>' +
        '</header>' +
        '<div class="cart-drawer__body">' +
          '<div class="cart-drawer__empty" id="cartDrawerEmpty" hidden>' +
            '<p>Seu carrinho está vazio.</p>' +
            '<button type="button" class="btn btn--green cart-drawer__continue" id="cartDrawerContinue">Continuar comprando</button>' +
          '</div>' +
          '<div class="cart-drawer__content" id="cartDrawerContent">' +
            '<div class="cart-drawer__items" id="cartDrawerItems"></div>' +
            '<section class="cart-drawer__upsell" id="cartDrawerUpsell" aria-label="Sugestão">' +
              '<p class="cart-drawer__upsell-label">Complete sua produção</p>' +
              '<div class="cart-drawer__upsell-card">' +
                '<div class="cart-drawer__upsell-thumb product-card__image product-card__image--fermento" id="cartDrawerUpsellThumb"></div>' +
                '<div class="cart-drawer__upsell-info">' +
                  '<p class="cart-drawer__upsell-name" id="cartDrawerUpsellName"></p>' +
                  '<p class="cart-drawer__upsell-price" id="cartDrawerUpsellPrice"></p>' +
                '</div>' +
                '<button type="button" class="btn btn--green cart-drawer__upsell-add" id="cartDrawerUpsellAdd">Adicionar</button>' +
              '</div>' +
            '</section>' +
          '</div>' +
        '</div>' +
        '<footer class="cart-drawer__footer" id="cartDrawerFooter" hidden>' +
          '<div class="cart-drawer__total">' +
            '<span>Total</span>' +
            '<strong id="cartDrawerTotal">R$ 0,00</strong>' +
          '</div>' +
          '<button type="button" class="btn btn--green btn--checkout-drawer" id="cartDrawerCheckout">Finalizar compra</button>' +
        '</footer>' +
      '</aside>';

    document.body.appendChild(drawer);
  }

  var drawerUpsellIds = ['coalho-liquido', 'termometro-sonda'];
  var drawerUpsellIndex = 0;

  function renderDrawerUpsell() {
    var upsellEl = document.getElementById('cartDrawerUpsell');
    if (!upsellEl) return;
    var id = drawerUpsellIds[drawerUpsellIndex];
    var product = getProduct(id);
    if (!product) return;
    document.getElementById('cartDrawerUpsellName').textContent = product.name;
    document.getElementById('cartDrawerUpsellPrice').textContent = formatMoney(product.price);
    document.getElementById('cartDrawerUpsellThumb').className =
      'cart-drawer__upsell-thumb product-card__image product-card__image--' + product.image;
    upsellEl.dataset.productId = id;
  }

  function renderCartDrawer() {
    var drawer = document.getElementById('cartDrawer');
    if (!drawer) return;

    var items = loadCart();
    var count = getCartCount(items);
    var total = getCartTotal(items);
    var listEl = document.getElementById('cartDrawerItems');
    var emptyEl = document.getElementById('cartDrawerEmpty');
    var contentEl = document.getElementById('cartDrawerContent');
    var footerEl = document.getElementById('cartDrawerFooter');
    var countEl = document.getElementById('cartDrawerCount');
    var totalEl = document.getElementById('cartDrawerTotal');

    if (countEl) countEl.textContent = String(count);
    if (totalEl) totalEl.textContent = formatMoney(total);

    if (items.length === 0) {
      if (emptyEl) emptyEl.hidden = false;
      if (contentEl) contentEl.hidden = true;
      if (footerEl) footerEl.hidden = true;
      if (listEl) listEl.innerHTML = '';
      return;
    }

    if (emptyEl) emptyEl.hidden = true;
    if (contentEl) contentEl.hidden = false;
    if (footerEl) footerEl.hidden = false;

    listEl.innerHTML = items.map(function (item) {
      var variantHtml = item.variant
        ? '<p class="cart-drawer-item__variant">' + item.variant + '</p>'
        : '';
      return (
        '<article class="cart-drawer-item" data-key="' + item.key + '">' +
          '<div class="cart-drawer-item__thumb product-card__image product-card__image--' + item.image + '"></div>' +
          '<div class="cart-drawer-item__info">' +
            '<h3 class="cart-drawer-item__name">' + item.name + '</h3>' +
            variantHtml +
            '<p class="cart-drawer-item__meta">Qtd: ' + item.qty + ' · ' + formatMoney(item.price * item.qty) + '</p>' +
          '</div>' +
          '<button type="button" class="cart-drawer-item__remove" data-remove="' + item.key + '" aria-label="Remover">×</button>' +
        '</article>'
      );
    }).join('');

    listEl.querySelectorAll('[data-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removeFromCart(btn.dataset.remove);
        renderCartPage();
      });
    });

    renderDrawerUpsell();
  }

  function openCartDrawer() {
    injectCartDrawer();
    renderCartDrawer();
    var drawer = document.getElementById('cartDrawer');
    if (!drawer) return;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-drawer-open');
    document.getElementById('cartDrawerClose').focus();
  }

  function closeCartDrawer() {
    var drawer = document.getElementById('cartDrawer');
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-drawer-open');
  }

  function initCartDrawer() {
    injectCartDrawer();
    renderCartDrawer();

    document.addEventListener('click', function (e) {
      if (e.target.id === 'cartDrawerBackdrop' || e.target.closest('#cartDrawerClose') || e.target.closest('#cartDrawerContinue')) {
        closeCartDrawer();
      }
    });

    document.addEventListener('click', function (e) {
      var addBtn = e.target.closest('#cartDrawerUpsellAdd');
      if (!addBtn) return;
      var upsell = document.getElementById('cartDrawerUpsell');
      if (upsell && upsell.dataset.productId) {
        addToCart(upsell.dataset.productId, 1);
        renderCartPage();
      }
    });

    document.addEventListener('click', function (e) {
      if (e.target.closest('#cartDrawerCheckout')) {
        showToast('Checkout demonstrativo — integração ISET no site real.');
      }
    });

    document.querySelectorAll('.header-action--cart').forEach(function (link) {
      if (document.body.classList.contains('cart-page')) return;
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openCartDrawer();
      });
    });

    document.addEventListener('keydown', function (e) {
      var drawer = document.getElementById('cartDrawer');
      if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
        closeCartDrawer();
      }
    });
  }

  window.RN_CART = {
    loadCart: loadCart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    getCartCount: getCartCount,
    getCartTotal: getCartTotal,
    formatMoney: formatMoney,
    getProduct: getProduct,
    openQuickBuy: openQuickBuy,
    openCartDrawer: openCartDrawer,
    closeCartDrawer: closeCartDrawer,
    renderCartPage: renderCartPage,
    showToast: showToast
  };

  document.addEventListener('DOMContentLoaded', function () {
    updateCartBadge();
    initCartDrawer();
    initQuickBuyModal();
    initProductCards();
    initProductPage();
    renderCartPage();
    initCartUpsell();
  });
})();
