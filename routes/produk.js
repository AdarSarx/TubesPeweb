document.addEventListener("DOMContentLoaded", () => {
    // ===== Inisialisasi & Pengambilan Data =====
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const product = products.find(p => p.id === productId);

    // ===== Elemen DOM =====
    const contentContainer = document.getElementById('product-detail-content');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');

    // Jika produk tidak ditemukan, tampilkan pesan error dan hentikan skrip
    if (!product) {
        contentContainer.innerHTML = '<p class="text-center h5">Produk yang Anda cari tidak ditemukan.</p>';
        return;
    }
    
    // Set judul tab browser sesuai nama produk
    document.title = `${product.name} - BeHealthy`;

    // ===== Fungsi Keranjang (Cart) =====
    
    const saveCart = cart => localStorage.setItem('cart', JSON.stringify(cart));
    
    const addToCart = id => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ id, quantity: 1 });
        }
        saveCart(cart);
        updateUI(); // Render ulang seluruh UI setelah ada perubahan
    };

    const removeFromCart = id => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cart.findIndex(i => i.id === id);
        if (index > -1) {
            cart[index].quantity--;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
        }
        saveCart(cart);
        updateUI(); // Render ulang seluruh UI setelah ada perubahan
    };

    // ===== Fungsi Tampilan (UI) =====

    // Fungsi ini membuat seluruh HTML untuk detail produk secara dinamis
    const renderProductDetails = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemInCart = cart.find(item => item.id === productId);
        const qtyInCart = itemInCart ? itemInCart.quantity : 0;

        // PERBAIKAN #3: Logika tombol sekarang sama persis dengan di index.js
        const btnHtml = qtyInCart === 0
            ? `<button class="btn btn-accent btn-lg addBtn" data-id="${product.id}">Tambah ke Keranjang</button>`
            : `<div class="d-flex align-items-center">
                 <button class="btn btn-secondary decreaseBtn" data-id="${product.id}">-</button>
                 <input type="text" value="${qtyInCart}" class="form-control text-center mx-3" readonly style="width: 70px;">
                 <button class="btn btn-secondary increaseBtn" data-id="${product.id}">+</button>
               </div>`;

        // Mengisi kontainer kosong dengan seluruh struktur detail produk
        contentContainer.innerHTML = `
            <div class="col-md-5 text-center">
                <img id="prodImage" src="../public/foto/${product.image}" class="img-fluid rounded" alt="${product.name}">
            </div>
            <div class="col-md-7">
                <h2 id="prodName">${product.name}</h2>
                <h3 id="prodPrice" class="text-success fw-bold">Rp ${product.price.toLocaleString('id-ID')}</h3>
                <hr>
                <h6><strong>Deskripsi & Manfaat</strong></h6>
                <p class="product-info">${product.description}</p>
                <h6 class="mt-3"><strong>Dosis & Aturan Pakai</strong></h6>
                <p class="product-info">${product.dosage}</p>
                <div class="mt-4 action-buttons">${btnHtml}</div>
            </div>`;
    };

    // Fungsi footer yang sudah disederhanakan
    const updateCartFooter = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            cartFooter.style.display = "none";
            return;
        }
        cartFooter.style.display = "flex";
        const total = cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);
        cartTotal.textContent = total.toLocaleString('id-ID');
    };

    const updateUI = () => {
        renderProductDetails();
        updateCartFooter();
    };

    // ===== Event Listener (Delegation) =====

    // Satu event listener untuk semua tombol aksi di dalam kontainer
    contentContainer.addEventListener('click', e => {
        const target = e.target;
        const id = parseInt(target.dataset.id);
        if (isNaN(id)) return;

        if (target.classList.contains('addBtn') || target.classList.contains('increaseBtn')) {
            addToCart(id);
        } else if (target.classList.contains('decreaseBtn')) {
            removeFromCart(id);
        }
    });

    // ===== Panggilan Awal =====
    updateUI();
});