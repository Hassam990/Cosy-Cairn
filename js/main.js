/* The Cosy Cairn - Main JavaScript */

(function () {
  "use strict";

  // ===== Utility: Escape HTML =====
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function formatPrice(value) {
    return "£" + value.toFixed(2);
  }

  function formatCategory(category) {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // ===== Cart State =====
  let cart = JSON.parse(localStorage.getItem("cosyCairnCart")) || [];

  function saveCart() {
    localStorage.setItem("cosyCairnCart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = count;
      el.style.display = count > 0 ? "flex" : "none";
    });
  }

  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
    saveCart();
    openCart();
    showToast(escapeHtml(product.title) + " added to cart");
  }

  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    saveCart();
  }

  function updateQuantity(productId, delta) {
    const item = cart.find((item) => item.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
    }
  }

  function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // ===== Cart Drawer =====
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartDrawer = document.querySelector(".cart-drawer");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartSubtotal = document.querySelector(".cart-subtotal span:last-child");

  function openCart() {
    if (!cartOverlay || !cartDrawer) return;
    cartOverlay.classList.add("open");
    cartDrawer.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    if (!cartOverlay || !cartDrawer) return;
    cartOverlay.classList.remove("open");
    cartDrawer.classList.remove("open");
    document.body.style.overflow = "";
  }

  function createCartItem(item) {
    const article = document.createElement("div");
    article.className = "cart-item";
    article.dataset.id = item.id;

    const imageDiv = document.createElement("div");
    imageDiv.className = "cart-item-image";
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;
    img.loading = "lazy";
    imageDiv.appendChild(img);

    const details = document.createElement("div");
    details.className = "cart-item-details";

    const title = document.createElement("h4");
    title.className = "cart-item-title";
    title.textContent = item.title;

    const price = document.createElement("p");
    price.className = "cart-item-price";
    price.textContent = formatPrice(item.price);

    const quantity = document.createElement("div");
    quantity.className = "cart-item-quantity";

    const decrease = document.createElement("button");
    decrease.className = "qty-decrease";
    decrease.setAttribute("aria-label", "Decrease quantity");
    decrease.textContent = "-";
    decrease.addEventListener("click", () => updateQuantity(item.id, -1));

    const count = document.createElement("span");
    count.textContent = item.quantity;

    const increase = document.createElement("button");
    increase.className = "qty-increase";
    increase.setAttribute("aria-label", "Increase quantity");
    increase.textContent = "+";
    increase.addEventListener("click", () => updateQuantity(item.id, 1));

    quantity.append(decrease, count, increase);

    const remove = document.createElement("button");
    remove.className = "cart-item-remove";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => removeFromCart(item.id));

    details.append(title, price, quantity, remove);
    article.append(imageDiv, details);
    return article;
  }

  function renderCartItems() {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      const empty = document.createElement("div");
      empty.className = "cart-empty";
      empty.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p>Your cart is empty</p>
      `;
      const continueBtn = document.createElement("a");
      continueBtn.href = "shop.html";
      continueBtn.className = "btn btn-primary";
      continueBtn.style.marginTop = "16px";
      continueBtn.textContent = "Continue Shopping";
      empty.appendChild(continueBtn);
      cartItemsContainer.appendChild(empty);
      if (cartSubtotal) cartSubtotal.textContent = formatPrice(0);
      return;
    }

    cart.forEach((item) => {
      cartItemsContainer.appendChild(createCartItem(item));
    });

    if (cartSubtotal) {
      cartSubtotal.textContent = formatPrice(getCartTotal());
    }
  }

  // ===== Mobile Menu =====
  // Declared here, assigned inside DOMContentLoaded
  let menuToggle, mainNav, navCloseBtn, menuOverlay;

  function openMenu() {
    if (!menuToggle || !mainNav) return;
    menuToggle.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    mainNav.classList.add("open");
    if (menuOverlay) menuOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!menuToggle || !mainNav) return;
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("open");
    if (menuOverlay) menuOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function toggleMenu() {
    if (mainNav && mainNav.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // ===== Toast Notifications =====
  function showToast(message) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ===== Product Card Creation =====
  function createProductCard(product) {
    const article = document.createElement("article");
    article.className = "product-card fade-in";

    const imageDiv = document.createElement("div");
    imageDiv.className = "product-image";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.loading = "lazy";
    imageDiv.appendChild(img);

    if (product.badge) {
      const badge = document.createElement("span");
      badge.className = "product-badge";
      badge.textContent = product.badge;
      imageDiv.appendChild(badge);
    }

    const actions = document.createElement("div");
    actions.className = "product-actions";
    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary add-to-cart";
    addBtn.dataset.id = product.id;
    addBtn.textContent = "Add to Cart";
    addBtn.addEventListener("click", () => addToCart(product.id));
    actions.appendChild(addBtn);
    imageDiv.appendChild(actions);

    const info = document.createElement("div");
    info.className = "product-info";

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = formatCategory(product.category);

    const title = document.createElement("h3");
    title.className = "product-title";
    title.textContent = product.title;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    if (product.originalPrice) {
      const original = document.createElement("span");
      original.className = "original";
      original.textContent = formatPrice(product.originalPrice);
      price.appendChild(original);
    }

    info.append(category, title, price);
    article.append(imageDiv, info);
    return article;
  }

  function renderProducts(container, filterFn, limit) {
    if (!container) return;

    container.innerHTML = "";

    let filtered = products.filter(filterFn);
    if (limit) filtered = filtered.slice(0, limit);

    if (filtered.length === 0) {
      const message = document.createElement("p");
      message.style.cssText = "grid-column: 1 / -1; text-align: center; color: var(--text-light);";
      message.textContent = "No products found.";
      container.appendChild(message);
      return;
    }

    filtered.forEach((product) => {
      container.appendChild(createProductCard(product));
    });

    observeAnimations();
  }

  // ===== Shop Page Filters =====
  function initShopFilters() {
    const container = document.querySelector(".shop-products");
    if (!container) return;

    const checkboxes = document.querySelectorAll(".filter-options input[type=checkbox]");
    const sortSelect = document.querySelector(".sort-select");
    const resultCount = document.querySelector(".shop-result-count");

    function applyFilters() {
      const activeCategories = Array.from(checkboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value);

      let filtered = products.filter((p) => {
        return activeCategories.length === 0 || activeCategories.includes(p.category);
      });

      if (sortSelect) {
        const sort = sortSelect.value;
        if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
        if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);
        if (sort === "name") filtered.sort((a, b) => a.title.localeCompare(b.title));
      }

      container.innerHTML = "";
      filtered.forEach((product) => {
        container.appendChild(createProductCard(product));
      });

      if (resultCount) {
        resultCount.textContent = filtered.length + " product" + (filtered.length !== 1 ? "s" : "");
      }

      observeAnimations();
    }

    checkboxes.forEach((cb) => cb.addEventListener("change", applyFilters));
    if (sortSelect) sortSelect.addEventListener("change", applyFilters);
    applyFilters();
  }

  // ===== Scroll Animations =====
  function observeAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
  }

  // ===== Newsletter Form =====
  function initNewsletter() {
    const form = document.querySelector(".newsletter-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      if (input.value.trim()) {
        showToast("Thank you for subscribing!");
        input.value = "";
      }
    });
  }

  // ===== Contact Form =====
  function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Your message has been sent. We'll be in touch soon!");
      form.reset();
    });
  }

  // ===== Category Cards =====
  function renderCategoryCards() {
    const container = document.querySelector(".category-grid");
    if (!container) return;

    container.innerHTML = "";
    categories.forEach((cat) => {
      const link = document.createElement("a");
      link.href = "collections.html#" + cat.id;
      link.className = "category-card fade-in";

      const img = document.createElement("img");
      img.src = cat.image;
      img.alt = cat.name;
      img.loading = "lazy";

      const overlay = document.createElement("div");
      overlay.className = "category-card-overlay";

      const title = document.createElement("h3");
      title.textContent = cat.name;

      overlay.appendChild(title);
      link.append(img, overlay);
      container.appendChild(link);
    });

    observeAnimations();
  }

  // ===== Collection Cards =====
  function renderCollections() {
    const container = document.querySelector(".collections-grid");
    if (!container) return;

    container.innerHTML = "";
    categories.forEach((cat) => {
      const link = document.createElement("a");
      link.href = "collections.html#" + cat.id;
      link.className = "collection-card fade-in";
      link.id = cat.id;

      const img = document.createElement("img");
      img.src = cat.image;
      img.alt = cat.name;
      img.loading = "lazy";

      const overlay = document.createElement("div");
      overlay.className = "collection-card-overlay";

      const title = document.createElement("h3");
      title.textContent = cat.name;

      const desc = document.createElement("p");
      desc.textContent = cat.description;

      const btn = document.createElement("span");
      btn.className = "btn btn-light";
      btn.textContent = "Shop Now";

      overlay.append(title, desc, btn);
      link.append(img, overlay);
      container.appendChild(link);
    });

    observeAnimations();
  }

  // ===== Initialise =====
  document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCartItems();
    observeAnimations();
    renderCategoryCards();
    renderCollections();
    initShopFilters();
    initNewsletter();
    initContactForm();

    // Cart toggles
    document.querySelectorAll("[data-open-cart]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openCart();
      });
    });

    document.querySelectorAll("[data-close-cart]").forEach((btn) => {
      btn.addEventListener("click", closeCart);
    });

    if (cartOverlay) {
      cartOverlay.addEventListener("click", closeCart);
    }

    // Mobile menu
    menuToggle  = document.querySelector(".mobile-menu-toggle");
    mainNav     = document.querySelector(".main-nav");
    navCloseBtn = document.querySelector(".nav-close-btn");

    menuOverlay = document.querySelector(".mobile-menu-overlay");
    if (!menuOverlay) {
      menuOverlay = document.createElement("div");
      menuOverlay.className = "mobile-menu-overlay";
      document.body.appendChild(menuOverlay);
    }

    if (menuToggle) {
      menuToggle.addEventListener("click", toggleMenu);
    }

    // Close button inside drawer
    if (navCloseBtn) {
      navCloseBtn.addEventListener("click", closeMenu);
    }

    // Overlay click closes menu
    if (menuOverlay) {
      menuOverlay.addEventListener("click", closeMenu);
    }

    // Escape key closes menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav && mainNav.classList.contains("open")) {
        closeMenu();
        menuToggle && menuToggle.focus();
      }
    });

    // Close on nav link click (mobile)
    document.querySelectorAll(".main-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        if (mainNav && mainNav.classList.contains("open")) closeMenu();
      });
    });

    // Home: render featured products
    const favouritesContainer = document.querySelector(".favourites-grid");
    if (favouritesContainer) {
      renderProducts(favouritesContainer, () => true, 4);
    }

    // New In: render new products
    const newInContainer = document.querySelector(".new-in-grid");
    if (newInContainer) {
      renderProducts(newInContainer, (p) => p.isNew);
    }

    // Collection detail products
    const collectionProductsContainer = document.querySelector(".collection-products");
    if (collectionProductsContainer) {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        renderProducts(collectionProductsContainer, (p) => p.collection === hash);
      } else {
        renderProducts(collectionProductsContainer, () => true);
      }
    }
  });
})();
