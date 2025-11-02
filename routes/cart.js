document.addEventListener("DOMContentLoaded", () => {
    // ===== Elemen DOM =====
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // ===== Fungsi Keranjang (Cart) =====

    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // ===== Fungsi Tampilan (UI) =====

    // Fungsi utama untuk merender seluruh isi keranjang
    const renderCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = ""; // Kosongkan kontainer sebelum mengisi ulang
        let total = 0;
        
        // Cek jika keranjang kosong
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<div class="card p-4 text-center text-muted">Keranjang belanja Anda masih kosong</div>`;
            cartTotalElement.textContent = '0';
            return;
        }

        // Loop melalui setiap item di keranjang
        cart.forEach(itemInCart => {
            // Cari detail produk lengkap dari array `products` global
            const product = products.find(p => p.id === itemInCart.id);

            if (product) {
                total += product.price * itemInCart.quantity;

                const itemDiv = document.createElement('div');
                itemDiv.className = 'card mb-3 p-3 shadow-sm';
                itemDiv.innerHTML = `
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                      <!-- PERBAIKAN #6: Menggunakan class 'cart-item-img' dari style.css -->
                      <img src="../images/${product.image}" alt="${product.name}" class="cart-item-img rounded">
                      <div>
                        <h6>${product.name}</h6>
                        <p class="mb-1 text-success fw-bold">Rp ${product.price.toLocaleString('id-ID')}</p>
                        <div class="d-flex align-items-center">
                          <button class="btn btn-sm btn-outline-secondary decrease-btn" data-id="${product.id}">-</button>
                          <span class="mx-3 fw-bold">${itemInCart.quantity}</span>
                          <button class="btn btn-sm btn-outline-secondary increase-btn" data-id="${product.id}">+</button>
                        </div>
                      </div>
                    </div>
                    <button class="btn btn-sm btn-outline-danger remove-btn" data-id="${product.id}">Hapus</button>
                  </div>`;
                cartItemsContainer.appendChild(itemDiv);
            }
        });

        // Update total harga di ringkasan belanja
        cartTotalElement.textContent = total.toLocaleString('id-ID');
    };

    // ===== Event Listeners =====

    // Event delegation untuk semua tombol di dalam daftar item keranjang
    cartItemsContainer.addEventListener('click', (e) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const target = e.target;
        const productId = parseInt(target.dataset.id);

        if (isNaN(productId)) return; // Abaikan jika elemen yang diklik tidak punya data-id

        const itemIndex = cart.findIndex(item => item.id === productId);

        if (itemIndex > -1) {
            if (target.classList.contains('increase-btn')) {
                cart[itemIndex].quantity++;
            } else if (target.classList.contains('decrease-btn')) {
                cart[itemIndex].quantity--;
                if (cart[itemIndex].quantity <= 0) {
                    cart.splice(itemIndex, 1); // Hapus item jika kuantitas jadi 0
                }
            } else if (target.classList.contains('remove-btn')) {
                cart.splice(itemIndex, 1); // Hapus item langsung
            }
        }
        
        saveCart(cart); // Simpan perubahan ke localStorage
        renderCart();   // Render ulang tampilan keranjang
    });

    // Event untuk tombol "Kosongkan Keranjang"
    clearCartBtn.addEventListener('click', () => {
        if (confirm("Apakah Anda yakin ingin mengosongkan keranjang?")) {
            saveCart([]); // Simpan array kosong
            renderCart();
        }
    });
    
    // Event untuk tombol "Checkout"
    checkoutBtn.addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert("Keranjang Anda masih kosong!");
            return;
        }
        alert("Terima kasih sudah berbelanja di BeHealthy!\n(Ini adalah simulasi, keranjang akan dikosongkan)");
        saveCart([]); // Kosongkan keranjang setelah checkout
        renderCart();
    });

    // ===== Panggilan Awal =====
    renderCart(); // Panggil fungsi ini sekali saat halaman dimuat
});