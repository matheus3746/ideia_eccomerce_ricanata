(function () {
  var header = document.getElementById('siteHeader');
  var spacer = document.getElementById('headerSpacer');
  var toggle = document.getElementById('menuToggle');
  var navbar = document.getElementById('navbar');
  var overlay = document.getElementById('mobileMenuOverlay');
  var closeBtn = document.getElementById('mobileMenuClose');

  function isMobileMenu() {
    return window.matchMedia('(max-width: 767px)').matches;
  }

  function closeSubmenus() {
    document.querySelectorAll('.navbar__item.is-open').forEach(function (el) {
      el.classList.remove('is-open');
      var t = el.querySelector('.navbar__trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.navbar__subgroup.is-open').forEach(function (el) {
      el.classList.remove('is-open');
      var st = el.querySelector('.navbar__subtrigger');
      if (st) st.setAttribute('aria-expanded', 'false');
    });
  }

  function updateSpacer() {
    if (!header || !spacer) return;
    spacer.style.height = header.offsetHeight + 'px';
  }

  function setMobileMenuOpen(open) {
    if (!navbar || !header || !toggle) return;
    navbar.classList.toggle('is-open', open);
    header.classList.toggle('menu-active', open && isMobileMenu());
    toggle.setAttribute('aria-expanded', open);
    document.body.classList.toggle('menu-open', open && isMobileMenu());
    if (overlay) {
      overlay.classList.toggle('is-visible', open && isMobileMenu());
      overlay.setAttribute('aria-hidden', !(open && isMobileMenu()));
    }
    if (!open) closeSubmenus();
    updateSpacer();
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 80);
  }

  if (header && spacer) {
    updateSpacer();
    onScroll();
    window.addEventListener('resize', updateSpacer);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && navbar) {
    toggle.addEventListener('click', function () {
      setMobileMenuOpen(!navbar.classList.contains('is-open'));
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      setMobileMenuOpen(false);
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function () {
      setMobileMenuOpen(false);
    });
  }

  document.querySelectorAll('.navbar__trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      if (window.matchMedia('(min-width: 768px)').matches) return;
      e.preventDefault();
      e.stopPropagation();
      var item = trigger.closest('.navbar__item');
      var isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.navbar__item.is-open').forEach(function (el) {
        el.classList.remove('is-open');
        var t = el.querySelector('.navbar__trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      document.querySelectorAll('.navbar__subgroup.is-open').forEach(function (el) {
        el.classList.remove('is-open');
        var st = el.querySelector('.navbar__subtrigger');
        if (st) st.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.querySelectorAll('.navbar__subtrigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      if (window.matchMedia('(min-width: 768px)').matches) return;
      e.preventDefault();
      e.stopPropagation();
      var subgroup = trigger.closest('.navbar__subgroup');
      var parentDropdown = trigger.closest('.navbar__dropdown');
      var isOpen = subgroup.classList.contains('is-open');
      if (parentDropdown) {
        parentDropdown.querySelectorAll('.navbar__subgroup.is-open').forEach(function (el) {
          el.classList.remove('is-open');
          var st = el.querySelector('.navbar__subtrigger');
          if (st) st.setAttribute('aria-expanded', 'false');
        });
      }
      if (!isOpen) {
        subgroup.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  var kitsTrack = document.getElementById('kitsTrack');
  var kitsNext = document.getElementById('kitsNext');
  var kitsPrev = document.getElementById('kitsPrev');
  var kitsScrollStep = function () {
    return kitsTrack ? kitsTrack.offsetWidth * 0.7 : 0;
  };

  if (kitsTrack && kitsNext) {
    kitsNext.addEventListener('click', function () {
      kitsTrack.scrollBy({ left: kitsScrollStep(), behavior: 'smooth' });
    });
  }

  if (kitsTrack && kitsPrev) {
    kitsPrev.addEventListener('click', function () {
      kitsTrack.scrollBy({ left: -kitsScrollStep(), behavior: 'smooth' });
    });
  }

  var trackOrder = document.getElementById('trackOrder');
  var trackTrigger = document.getElementById('trackOrderTrigger');
  var trackPopover = document.getElementById('trackOrderPopover');

  if (trackOrder && trackTrigger && trackPopover) {
    trackTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = trackOrder.classList.toggle('is-open');
      trackTrigger.setAttribute('aria-expanded', open);
      trackPopover.hidden = !open;
    });

    document.addEventListener('click', function (e) {
      if (!trackOrder.contains(e.target)) {
        trackOrder.classList.remove('is-open');
        trackTrigger.setAttribute('aria-expanded', 'false');
        trackPopover.hidden = true;
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && trackOrder.classList.contains('is-open')) {
        trackOrder.classList.remove('is-open');
        trackTrigger.setAttribute('aria-expanded', 'false');
        trackPopover.hidden = true;
        trackTrigger.focus();
      }
    });
  }

  document.querySelectorAll('.product-scroll').forEach(function (wrap) {
    var grid = wrap.querySelector('.product-grid, .product-grid--3, .product-grid--4');
    var bars = wrap.querySelectorAll('.product-scroll__bar');
    if (!grid || !bars.length) return;

    function updateBars() {
      var card = grid.querySelector('.product-card');
      if (!card) return;
      var cardWidth = card.offsetWidth + 14;
      var index = Math.round(grid.scrollLeft / cardWidth);
      bars.forEach(function (bar, i) {
        bar.classList.toggle('product-scroll__bar--active', i === index);
      });
    }

    grid.addEventListener('scroll', updateBars, { passive: true });
    updateBars();
  });
})();
