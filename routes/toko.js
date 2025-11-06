document.addEventListener("DOMContentLoaded", () => {
    // ===== Inisialisasi & Variabel Global =====
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let currentCategory = "";
    let currentSearch = "";

    // ===== Elemen DOM =====
    const productList = document.getElementById("product-list");
    const cartFooter = document.getElementById("cartFooter");
    const cartTotal = document.getElementById("cartTotal");
    const categoryButtonsContainer = document.getElementById("category-buttons");
    const searchInput = document.getElementById("searchInput");

    // ===== Fungsi Keranjang (Cart) =====

    const saveCart = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const addToCart = (productId, quantity = 1) => {
        const existingItem = cart.find((item) => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ id: productId, quantity: quantity });
        }
        saveCart();
        updateUI();
    };

    const removeFromCart = (productId, quantity = 1) => {
        const itemIndex = cart.findIndex((item) => item.id === productId);
        if (itemIndex > -1) {
            cart[itemIndex].quantity -= quantity;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
        }
        saveCart();
        updateUI();
    };

    // ===== Fungsi Tampilan (UI) =====

    const renderProducts = () => {
        productList.innerHTML = "";
        const filteredProducts = products.filter(prod => 
            prod.name.toLowerCase().includes(currentSearch) && 
            (currentCategory === "" || prod.category === currentCategory)
        );

        if (filteredProducts.length === 0) {
            productList.innerHTML = `<p class="text-center col-12">Produk tidak ditemukan.</p>`;
            return;
        }

        filteredProducts.forEach((prod) => {
            const itemInCart = cart.find(item => item.id === prod.id);
            const quantityInCart = itemInCart ? itemInCart.quantity : 0;
            
            const buttonHtml = quantityInCart === 0 
                ? `<button class="btn btn-outline-primary addBtn w-100" data-id="${prod.id}">Tambah</button>`
                : `<div class="d-flex justify-content-center align-items-center">
                     <button class="btn btn-sm btn-secondary decreaseBtn" data-id="${prod.id}">-</button>
                     <input type="text" value="${quantityInCart}" class="form-control-sm text-center" readonly style="width:50px; border:none; background:transparent; font-weight: bold;">
                     <button class="btn btn-sm btn-secondary increaseBtn" data-id="${prod.id}">+</button>
                   </div>`;

            const col = document.createElement("div");
            col.className = "col-6 col-md-4 col-lg-3 mb-2";
            col.innerHTML = `
            <div class="card p-2 h-100 shadow-sm">
                <img src="../foto/${prod.image}" 
                    class="card-img-top clickable w-100" 
                    alt="${prod.name}" 
                    data-id="${prod.id}" 
                    style="height: 150px;"
                    loading="lazy">
                <div class="card-body text-center d-flex flex-column">
                    <h6 class="card-title clickable flex-grow-1" data-id="${prod.id}">${prod.name}</h6>
                    <p class="card-text fw-bold">Rp ${prod.price.toLocaleString('id-ID')}</p>
                    <div class="mt-auto">${buttonHtml}</div>
                </div>
            </div>`;

            productList.appendChild(col);
        });
    };
    
    // PERBAIKAN #2: Fungsi footer disederhanakan
    const updateCartFooter = () => {
        if (cart.length === 0) {
            cartFooter.style.display = "none";
            return;
        }
        
        cartFooter.style.display = "flex";

        // Hitung total harga menggunakan reduce untuk kode yang lebih ringkas
        const total = cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            // Jika produk ditemukan, tambahkan harganya ke total
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);

        cartTotal.textContent = total.toLocaleString('id-ID');
    };
    
    const updateUI = () => {
        renderProducts();
        updateCartFooter();
    };

    // ===== Event Listeners =====

    productList.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('clickable')) {
            const productId = target.dataset.id;
            if (productId) window.location.href = `./product.html?id=${productId}`;
            return;
        }
        
        const productId = parseInt(target.dataset.id);
        if (isNaN(productId)) return;

        if (target.classList.contains('addBtn') || target.classList.contains('increaseBtn')) {
            addToCart(productId);
        } else if (target.classList.contains('decreaseBtn')) {
            removeFromCart(productId);
        }
    });

    categoryButtonsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            categoryButtonsContainer.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            renderProducts();
        }
    });

    // PERBAIKAN #4: Pencarian real-time saat mengetik
    searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value.toLowerCase().trim();
        renderProducts();
    });

    // ===== Panggilan Awal =====
    updateUI();
});