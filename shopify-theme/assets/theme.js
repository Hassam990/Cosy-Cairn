/* ===================================================
   The Cosy Cairn — Shopify Theme JS
   =================================================== */
(function () {
  'use strict';

  // ===== Cart State =====
  let cart = { items: [], total: 0 };

  function formatMoney(cents) {
    return '£' + (cents / 100).toFixed(2);
  }

  async function fetchCart() {
    try {
      const res = await fetch('/cart.js');
      const data = await res.json();
      cart = data;
      updateCartCount(data.item_count);
      renderCartItems();
    } catch (e) {
      console.warn('Cart fetch failed, using local state');
    }
  }

  async function addToCart(variantId, quantity) {
    quantity = quantity || 1;
    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity: quantity })
      });
      const item = await res.json();
      if (item.status) {
        showToast(item.description || 'Could not add to cart');
        return;
      }
      await fetchCart();
      openCart();
      showToast(item.title + ' added to cart');
    } catch (e) {
      showToast('Something went wrong. Please try again.');
    }
  }

  async function updateCartItem(key, quantity) {
    try {
      await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: quantity })
      });
      await fetchCart();
    } catch (e) {
      console.warn('Cart update failed');
    }
  }

  function updateCartCount(count) {
    const el = document.getElementById('cart-count');
    if (!el) return;
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  }

  function renderCartItems() {
    const container = document.getElementById('cart-items');
    const totalEl   = document.getElementById('cart-total');
    if (!container) return;

    if (!cart.items || cart.items.length === 0) {
      container.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
      if (totalEl) totalEl.textContent = '£0.00';
      return;
    }

    container.innerHTML = cart.items.map(item => `
      <div class="cart-item" data-key="${item.key}">
        <div class="cart-item-image">
          ${item.image
            ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
            : '<div style="width:100%;height:100%;background:var(--cream-warm);"></div>'
          }
        </div>
        <div class="cart-item-details">
          <p class="cart-item-title">${item.title}</p>
          <p class="cart-item-price">${formatMoney(item.final_line_price)}</p>
          <div class="cart-item-qty">
            <button class="qty-btn" data-action="decrease" data-key="${item.key}" aria-label="Decrease quantity">−</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" data-action="increase" data-key="${item.key}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-key="${item.key}" aria-label="Remove ${item.title}">×</button>
      </div>
    `).join('');

    if (totalEl) totalEl.textContent = formatMoney(cart.total_price);

    // Qty buttons
    container.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key      = btn.dataset.key;
        const action   = btn.dataset.action;
        const item     = cart.items.find(i => i.key === key);
        if (!item) return;
        const newQty   = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        updateCartItem(key, Math.max(0, newQty));
      });
    });

    // Remove buttons
    container.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => updateCartItem(btn.dataset.key, 0));
    });
  }

  // ===== Cart Drawer =====
  let cartDrawer, cartOverlay;

  function openCart() {
    if (cartDrawer)  { cartDrawer.classList.add('open');  cartDrawer.setAttribute('aria-hidden','false'); }
    if (cartOverlay) { cartOverlay.classList.add('open'); }
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartDrawer)  { cartDrawer.classList.remove('open');  cartDrawer.setAttribute('aria-hidden','true'); }
    if (cartOverlay) { cartOverlay.classList.remove('open'); }
    document.body.style.overflow = '';
  }

  // ===== Toast =====
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ===== Mobile Menu =====
  let menuToggle, mainNav, navCloseBtn, menuOverlay;

  function openMenu() {
    if (!menuToggle || !mainNav) return;
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('open');
    if (menuOverlay) menuOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!menuToggle || !mainNav) return;
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    if (menuOverlay) menuOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (mainNav && mainNav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // ===== Fade-in Observer =====
  function initFadeIn() {
    const els = document.querySelectorAll('.fade-in');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
  }

  // ===== Add-to-Cart forms =====
  function initProductForms() {
    document.querySelectorAll('[data-product-form]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const variantInput = form.querySelector('[name="id"]');
        const qtyInput     = form.querySelector('[name="quantity"]');
        if (!variantInput) return;
        const variantId = variantInput.value;
        const qty       = qtyInput ? parseInt(qtyInput.value) : 1;
        addToCart(variantId, qty);
      });
    });

    // Quick-add buttons on product cards
    document.querySelectorAll('[data-quick-add]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const variantId = btn.dataset.variantId || btn.dataset.quickAdd;
        if (variantId) addToCart(variantId, 1);
      });
    });
  }

  // ===== Variant Selector (product page) =====
  function initVariantSelector() {
    const form = document.querySelector('[data-product-form]');
    if (!form) return;

    const variantIdInput = document.getElementById('variant-id-input');
    if (!variantIdInput) return;

    // Build variant map from product JSON
    const productDataEl = document.getElementById('product-json');
    if (!productDataEl) return;

    let variants;
    try {
      variants = JSON.parse(productDataEl.textContent).variants;
    } catch (e) { return; }

    function getSelectedOptions() {
      const options = [];
      form.querySelectorAll('.option-selector:checked').forEach(input => {
        options[parseInt(input.dataset.optionPosition) - 1] = input.value;
      });
      return options;
    }

    function updateVariant() {
      const selected = getSelectedOptions();
      const match = variants.find(v =>
        v.options.every((opt, i) => opt === selected[i])
      );
      if (match) {
        variantIdInput.value = match.id;
        // Update price display
        const priceEl = document.querySelector('.product-info-price');
        if (priceEl && match.price) {
          if (match.compare_at_price && match.compare_at_price > match.price) {
            priceEl.innerHTML = `<span style="color:#c0786a;">£${(match.price/100).toFixed(2)}</span> <span style="font-size:1.1rem;color:var(--text-light);text-decoration:line-through;margin-left:12px;">£${(match.compare_at_price/100).toFixed(2)}</span>`;
          } else {
            priceEl.textContent = '£' + (match.price / 100).toFixed(2);
          }
        }
        // Update submit button
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = !match.available;
          submitBtn.textContent = match.available ? 'Add to Cart' : 'Sold Out';
          submitBtn.style.opacity = match.available ? '1' : '0.5';
        }
      }
    }

    // Highlight selected option labels
    function updateOptionStyles() {
      form.querySelectorAll('.option-selector').forEach(input => {
        const label = input.nextElementSibling;
        if (!label) return;
        if (input.checked) {
          label.style.borderColor = 'var(--sage)';
          label.style.background  = 'var(--sage)';
          label.style.color       = 'var(--white)';
        } else {
          label.style.borderColor = 'var(--beige)';
          label.style.background  = 'transparent';
          label.style.color       = 'var(--text-dark)';
        }
      });
    }

    form.querySelectorAll('.option-selector').forEach(input => {
      input.addEventListener('change', () => {
        updateOptionStyles();
        updateVariant();
      });
    });

    // Init styles on load
    updateOptionStyles();
  }

  // ===== Quantity selector (product page) =====
  function initQtySelector() {
    document.querySelectorAll('.qty-selector').forEach(selector => {
      const dec   = selector.querySelector('[data-qty-dec]');
      const inc   = selector.querySelector('[data-qty-inc]');
      const input = selector.querySelector('input[name="quantity"]');
      if (!dec || !inc || !input) return;
      dec.addEventListener('click', () => { const v = parseInt(input.value); if (v > 1) input.value = v - 1; });
      inc.addEventListener('click', () => { input.value = parseInt(input.value) + 1; });
    });
  }

  // ===== DOMContentLoaded =====
  document.addEventListener('DOMContentLoaded', () => {

    // Grab elements
    cartDrawer  = document.getElementById('cart-drawer');
    cartOverlay = document.getElementById('cart-overlay');
    menuToggle  = document.getElementById('mobile-menu-toggle');
    mainNav     = document.getElementById('main-nav');
    navCloseBtn = document.getElementById('nav-close-btn');
    menuOverlay = document.getElementById('mobile-menu-overlay');

    // Fetch cart on load
    fetchCart();

    // Cart open/close
    const cartOpenBtn = document.getElementById('cart-open-btn');
    if (cartOpenBtn)  cartOpenBtn.addEventListener('click', openCart);
    if (cartOverlay)  cartOverlay.addEventListener('click', closeCart);
    const cartCloseBtn = document.getElementById('cart-close');
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);

    // Mobile menu
    if (menuToggle)  menuToggle.addEventListener('click', toggleMenu);
    if (navCloseBtn) navCloseBtn.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

    // Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (cartDrawer  && cartDrawer.classList.contains('open'))  closeCart();
        if (mainNav && mainNav.classList.contains('open')) { closeMenu(); if (menuToggle) menuToggle.focus(); }
      }
    });

    // Close nav on link click (mobile)
    document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav && mainNav.classList.contains('open')) closeMenu();
      });
    });

    // Sticky header shadow
    const header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 10
          ? '0 2px 20px rgba(61,61,53,0.1)'
          : '0 2px 10px rgba(61,61,53,0.04)';
      }, { passive: true });
    }

    // Init everything
    initFadeIn();
    initProductForms();
    initQtySelector();
    initVariantSelector();
  });

})();
