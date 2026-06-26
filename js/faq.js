(function () {
  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function renderFaqList(items, query) {
    var list = document.getElementById('faqList');
    var resultsEl = document.getElementById('faqResults');
    if (!list) return;

    if (!items.length) {
      list.innerHTML = '';
      if (resultsEl) {
        resultsEl.hidden = false;
        resultsEl.textContent = query
          ? 'Nenhuma pergunta encontrada para "' + query + '".'
          : 'Nenhuma pergunta disponível.';
      }
      return;
    }

    if (resultsEl) {
      if (query) {
        resultsEl.hidden = false;
        resultsEl.textContent = items.length + (items.length === 1 ? ' resultado' : ' resultados') + ' para "' + query + '"';
      } else {
        resultsEl.hidden = true;
        resultsEl.textContent = '';
      }
    }

    var currentCategory = '';
    var html = '';

    items.forEach(function (item) {
      if (item.category !== currentCategory) {
        currentCategory = item.category;
        html += '<h2 class="faq-page__category">' + currentCategory + '</h2>';
      }
      html +=
        '<details class="faq-item">' +
          '<summary>' + item.question + '</summary>' +
          '<p>' + item.answer + '</p>' +
        '</details>';
    });

    list.innerHTML = html;
  }

  function filterItems(items, query) {
    if (!query) return items;
    var term = normalize(query);
    return items.filter(function (item) {
      return (
        normalize(item.question).indexOf(term) !== -1 ||
        normalize(item.answer).indexOf(term) !== -1 ||
        normalize(item.category).indexOf(term) !== -1
      );
    });
  }

  function initFaqPage() {
    var countEl = document.getElementById('faqCount');
    var searchInput = document.getElementById('faqSearch');
    var clearBtn = document.getElementById('faqSearchClear');
    var allItems = window.RN_FAQ || [];
    if (!allItems.length) return;

    if (countEl) countEl.textContent = String(allItems.length) + ' perguntas';

    function update(query) {
      var trimmed = query.trim();
      var filtered = filterItems(allItems, trimmed);
      renderFaqList(filtered, trimmed);
      if (clearBtn) clearBtn.hidden = !trimmed;
    }

    update('');

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        update(searchInput.value);
      });
    }

    if (clearBtn && searchInput) {
      clearBtn.addEventListener('click', function () {
        searchInput.value = '';
        searchInput.focus();
        update('');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initFaqPage);
})();
