// ============================================
// BMC VAPING - SCRIPT COMPLETO
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // 1. AGE GATE - VERIFICACIÓN DE EDAD
    // ============================================
    const ageGate = document.getElementById('ageGate');
    const ageGateBox = document.getElementById('ageGateBox');
    const ageConfirmBtn = document.getElementById('ageConfirmBtn');
    const ageDenyBtn = document.getElementById('ageDenyBtn');
    const ageVerified = localStorage.getItem('bmc_age_verified');

    if (ageGate) {
        if (ageVerified === 'true') {
            ageGate.style.display = 'none';
            document.body.style.overflow = '';
        } else {
            document.body.style.overflow = 'hidden';
        }

        if (ageConfirmBtn) {
            ageConfirmBtn.addEventListener('click', function () {
                localStorage.setItem('bmc_age_verified', 'true');
                ageGate.style.display = 'none';
                document.body.style.overflow = '';
            });
        }

        if (ageDenyBtn) {
            ageDenyBtn.addEventListener('click', function () {
                ageGateBox.innerHTML = `
                    <div class="age-gate-deny">
                        <i class="fas fa-lock" style="font-size:3rem;color:var(--error);margin-bottom:16px;"></i>
                        <h2>Acceso restringido</h2>
                        <p>Lo sentimos, este sitio es exclusivo para personas mayores de 18 años.</p>
                    </div>
                `;
            });
        }
    }

    // ============================================
    // 2. NAVEGACIÓN Y MENÚ MÓVIL
    // ============================================
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const mobileOverlay = document.getElementById('mobileOverlay');

    function closeMobileMenu() {
        if (mainNav) mainNav.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (mobileToggle) {
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
    }

    function openMobileMenu() {
        if (mainNav) mainNav.classList.add('open');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        if (mobileToggle) {
            mobileToggle.classList.add('active');
            mobileToggle.setAttribute('aria-expanded', 'true');
        }
        document.body.style.overflow = 'hidden';
    }

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (mainNav.classList.contains('open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // Cerrar menú al hacer clic en un enlace
    if (mainNav) {
        mainNav.addEventListener('click', function (e) {
            if (e.target.tagName === 'A' && !e.target.closest('.dropdown-menu')) {
                closeMobileMenu();
            }
        });
    }

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function (e) {
        if (mainNav && mainNav.classList.contains('open') &&
            !mainNav.contains(e.target) &&
            !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // ============================================
    // 3. SUBMENÚ DE PRODUCTOS
    // ============================================
    const productsToggle = document.getElementById('productsToggle');
    const productsSubmenu = document.getElementById('productsSubmenu');

    function closeProductsSubmenu() {
        if (productsSubmenu) productsSubmenu.classList.remove('show');
        if (productsToggle) productsToggle.setAttribute('aria-expanded', 'false');
    }

    function openProductsSubmenu() {
        if (productsSubmenu) productsSubmenu.classList.add('show');
        if (productsToggle) productsToggle.setAttribute('aria-expanded', 'true');
    }

    if (productsToggle && productsSubmenu) {
        productsToggle.addEventListener('click', function (e) {
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // En móvil: cerrar submenú si está abierto, dejar que navegue
                if (productsSubmenu.classList.contains('show')) {
                    e.preventDefault();
                    closeProductsSubmenu();
                }
                return;
            }

            e.preventDefault();
            const isOpen = productsSubmenu.classList.contains('show');
            isOpen ? closeProductsSubmenu() : openProductsSubmenu();
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', function (e) {
            if (!productsToggle.contains(e.target) && !productsSubmenu.contains(e.target)) {
                closeProductsSubmenu();
            }
        });
    }

    // ============================================
    // 4. PRODUCTOS - RENDER Y FILTROS
    // ============================================
    const productsGrid = document.getElementById('productsGrid');
    const noProductsMsg = document.getElementById('noProductsMsg');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    let currentFilter = 'all';
    let currentSearch = '';
    let currentSort = 'featured';

    function renderProducts() {
        if (!productsGrid) return;

        // Filtrar
        let filtered = productsData.filter(product => {
            const matchCategory = currentFilter === 'all' || product.category === currentFilter;
            const matchSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                               product.brand.toLowerCase().includes(currentSearch.toLowerCase());
            return matchCategory && matchSearch;
        });

        // Ordenar
        switch (currentSort) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default: // featured
                filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
                break;
        }

        // Mostrar mensaje si no hay productos
        if (filtered.length === 0) {
            productsGrid.innerHTML = '';
            if (noProductsMsg) noProductsMsg.style.display = 'block';
            return;
        }
        if (noProductsMsg) noProductsMsg.style.display = 'none';

        // Renderizar productos
        productsGrid.innerHTML = filtered.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-badges">
                        ${product.isNew ? '<span class="product-badge new">Nuevo</span>' : ''}
                        ${product.isBestSeller ? '<span class="product-badge best-seller">Más vendido</span>' : ''}
                        ${product.oldPrice ? '<span class="product-badge sale">Oferta</span>' : ''}
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-category">${product.brand} · ${product.category}</div>
                    <div class="product-rating">
                        ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '★' : ''}
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current">Q${product.price.toFixed(2)}</span>
                        ${product.oldPrice ? `<span class="old">Q${product.oldPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="btn-primary btn-sm add-to-cart" data-id="${product.id}">
                            <i class="fas fa-plus"></i> Agregar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Eventos para botones "Agregar al carrito"
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function () {
                const id = parseInt(this.dataset.id);
                addToCart(id);
            });
        });
    }

    // ===== FILTROS =====
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderProducts();
            closeProductsSubmenu();
        });
    });

    // ===== ORDENAMIENTO =====
    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            currentSort = this.value;
            renderProducts();
        });
    }

    // ===== BÚSQUEDA =====
    function performSearch() {
        if (searchInput) {
            currentSearch = searchInput.value.trim();
            renderProducts();
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') performSearch();
        });
        searchInput.addEventListener('input', function () {
            if (this.value === '') {
                currentSearch = '';
                renderProducts();
            }
        });
    }

    // Render inicial
    renderProducts();

    // ============================================
    // 5. CARRITO DE COMPRAS
    // ============================================
    let cart = JSON.parse(localStorage.getItem('bmc_cart')) || [];

    const cartToggle = document.getElementById('cartToggle');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');

    function openCart() {
        if (cartSidebar) cartSidebar.classList.add('open');
        if (cartOverlay) cartOverlay.classList.add('open');
        if (cartToggle) cartToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        if (cartSidebar) cartSidebar.classList.remove('open');
        if (cartOverlay) cartOverlay.classList.remove('open');
        if (cartToggle) cartToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (cartToggle) {
        cartToggle.addEventListener('click', openCart);
    }

    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // Cerrar con tecla ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (cartSidebar && cartSidebar.classList.contains('open')) {
                closeCart();
            }
            closeProductsSubmenu();
        }
    });

    function addToCart(productId) {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;

        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        saveCart();
        updateCartUI();
        openCart();

        // Animación de feedback
        const btn = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> ¡Agregado!';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-plus"></i> Agregar';
            }, 1500);
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
        if (cart.length === 0) closeCart();
    }

    function updateQuantity(productId, change) {
        const item = cart.find(i => i.id === productId);
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        saveCart();
        updateCartUI();
    }

    function saveCart() {
        localStorage.setItem('bmc_cart', JSON.stringify(cart));
    }

    function updateCartUI() {
        // Contador del header
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
            if (totalItems === 0) {
                cartCount.classList.add('empty');
            } else {
                cartCount.classList.remove('empty');
            }
        }

        // Actualizar carrito
        if (cartItems && cartEmpty && cartFooter) {
            if (cart.length === 0) {
                cartItems.style.display = 'none';
                cartEmpty.style.display = 'block';
                cartFooter.style.display = 'none';
                return;
            }

            cartItems.style.display = 'block';
            cartEmpty.style.display = 'none';
            cartFooter.style.display = 'block';

            cartItems.innerHTML = cart.map(item => {
                const product = productsData.find(p => p.id === item.id);
                return `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            ${product ? `<img src="${product.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;">` : '📦'}
                        </div>
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <div class="price">Q${(item.price * item.quantity).toFixed(2)}</div>
                            <div class="cart-item-actions">
                                <button onclick="updateQuantity(${item.id}, -1)">−</button>
                                <span class="quantity">${item.quantity}</span>
                                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            // Total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (cartTotal) {
                cartTotal.textContent = `Q${total.toFixed(2)}`;
            }
        }
    }

    // Exponer funciones al global para onclick
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;

    // Inicializar carrito
    updateCartUI();

    // ============================================
    // 6. FAQ ACORDEÓN
    // ============================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function (question) {
        question.addEventListener('click', function () {
            const answer = document.getElementById(this.getAttribute('aria-controls'));
            const isOpen = this.getAttribute('aria-expanded') === 'true';

            // Cerrar todos
            faqQuestions.forEach(function (q) {
                q.setAttribute('aria-expanded', 'false');
                const a = document.getElementById(q.getAttribute('aria-controls'));
                if (a) {
                    a.setAttribute('aria-hidden', 'true');
                }
            });

            if (!isOpen) {
                this.setAttribute('aria-expanded', 'true');
                if (answer) {
                    answer.setAttribute('aria-hidden', 'false');
                }
            }
        });
    });

    // ============================================
    // 7. FORMULARIO DE CONTACTO
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const contactMsg = document.getElementById('contactMsg');
    const sendContactBtn = document.getElementById('sendContactBtn');
    const btnText = document.getElementById('btnText');
    const btnLoading = document.getElementById('btnLoading');
    const resetContactBtn = document.getElementById('resetContactBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!this.checkValidity()) {
                this.reportValidity();
                return;
            }

            if (btnText) btnText.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'inline-block';
            if (sendContactBtn) sendContactBtn.disabled = true;

            // Simular envío
            setTimeout(function () {
                if (contactMsg) {
                    contactMsg.textContent = '✅ ¡Gracias! Tu mensaje fue enviado, te contactaremos pronto.';
                    contactMsg.className = 'form-message show success';
                }
                if (btnText) btnText.style.display = 'inline';
                if (btnLoading) btnLoading.style.display = 'none';
                if (sendContactBtn) sendContactBtn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }

    if (resetContactBtn) {
        resetContactBtn.addEventListener('click', function () {
            contactForm.reset();
            if (contactMsg) {
                contactMsg.className = 'form-message';
                contactMsg.textContent = '';
            }
        });
    }

    // ============================================
    // 8. NEWSLETTER
    // ============================================
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input && input.value) {
                alert('✅ ¡Suscripción exitosa! Recibirás nuestras novedades.');
                input.value = '';
            }
        });
    }

    // ============================================
    // 9. SCROLL - HEADER SHADOW
    // ============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ============================================
    // 10. NAVEGACIÓN POR SECCIONES (scroll suave)
    // ============================================
    document.querySelectorAll('a[data-target]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('data-target');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // 11. CATEGORÍAS - CLICK PARA FILTRAR
    // ============================================
    document.querySelectorAll('.category-card').forEach(function (card) {
        card.addEventListener('click', function () {
            const category = this.dataset.category;
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
            if (filterBtn) {
                filterBtn.click();
                // Scroll a productos
                const productsSection = document.querySelector('#productos');
                if (productsSection) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = productsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    // ============================================
    // 12. CERRAR SUBMENÚ AL REDIMENSIONAR
    // ============================================
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
            if (window.innerWidth > 768 && productsSubmenu) {
                productsSubmenu.classList.remove('show');
                if (productsToggle) productsToggle.setAttribute('aria-expanded', 'false');
            }
        }, 250);
    });

    console.log('🚀 BMC VAPING - Sitio cargado correctamente');
    console.log(`📦 ${productsData.length} productos disponibles`);
    console.log(`🛒 ${cart.length} items en el carrito`);

});