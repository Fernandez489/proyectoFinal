const PHONE_NUMBER = "5492996559819";
let cart = [];
let selectedItem = null;

const catalogData = [
    { 
        id: 'p1', 
        name: 'Pieza Individual', 
        price: 1800, 
        category: 'rolls', 
        image: './img/logo.jpeg' 
    },
    { 
        id: 'promo16', 
        name: 'Bandeja Individual 16 piezas', 
        price: 26000, 
        category: 'combos', 
        image: './img/bandeja.jpeg' 
    },
    { 
        id: 'promo30', 
        name: 'Promo 30 Piezas', 
        price: 37000, 
        category: 'combos', 
        image: './img/combo.jpeg' 
    }
];



const promoHighlights = [
    {
        id: 'promo16',
        name: 'Bandeja Individual 16 piezas',
        price: 26000,
        image: './img/bandeja.jpeg' 
    },
    {
        id: 'promo30',
        name: 'Promo 30 Piezas',
        price: 37000,
        image: './img/combo.jpeg' 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderPromosHome();
});

function renderPromosHome() {
    const container = document.getElementById('promo-container');
    if (!container) return;
    
    container.innerHTML = '';
    promoHighlights.forEach(promo => {
        container.innerHTML += `
            <div class="promo-card">
                <div>
                    <div class="promo-img-container">
                        <img src="${promo.image}" alt="${promo.name}" class="promo-img" onerror="this.src='https://via.placeholder.com/300x160?text=Foto+Promo'">
                    </div>
                    <h3>${promo.name}</h3>
                    <p class="price">$${promo.price.toLocaleString('es-AR')}</p>
                </div>
                <button class="btn-action" onclick="openDetailModal('${promo.id}')">Personalizar Sabor</button>
            </div>
        `;
    });
}

function switchView(viewName) {
    document.querySelectorAll('.view-screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    if (viewName === 'home') {
        document.getElementById('screen-home').classList.add('active');
        document.getElementById('nav-home').classList.add('active');
    } else if (viewName === 'catalog') {
        document.getElementById('screen-catalog').classList.add('active');
        document.getElementById('nav-catalog').classList.add('active');
        renderCatalog('todos');
    } else if (viewName === 'support') {
        document.getElementById('screen-support').classList.add('active');
        document.getElementById('nav-about').classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCatalog(filter) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    const items = filter === 'todos' ? catalogData : catalogData.filter(i => i.category === filter);
    
    items.forEach(item => {
        grid.innerHTML += `
            <div class="product-card">
                <div>
                    <div class="product-img-container">
                        <img src="${item.image}" alt="${item.name}" class="product-img" onerror="this.src='https://via.placeholder.com/300x160?text=Imagen+No+Encontrada'">
                    </div>
                    <h3>${item.name}</h3>
                    <p class="product-price">$${item.price.toLocaleString('es-AR')}</p>
                </div>
                <button class="btn-action" onclick="openDetailModal('${item.id}')">Agregar ➕</button>
            </div>
        `;
    });
}

function filterCatalog(cat) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderCatalog(cat);
}

function openDetailModal(id) {
    selectedItem = catalogData.find(i => i.id === id) || promoHighlights.find(i => i.id === id);
    document.getElementById('modal-title').innerText = selectedItem.name;
    document.getElementById('detail-modal').classList.add('active');
}

function closeDetailModal() {
    document.getElementById('detail-modal').classList.remove('active');
}

function confirmAddToCart() {
    const flavor = document.getElementById('modal-flavor').value;
    const soja = document.getElementById('opt-soja').checked;
    const wasabi = document.getElementById('opt-wasabi').checked;
    
    cart.push({ 
        ...selectedItem, 
        flavor, 
        extras: `${soja ? 'Soja Extra ' : ''}${wasabi ? 'Wasabi ' : ''}` 
    });
    
    updateCart();
    closeDetailModal();
    toggleCartDrawer(true);
}

function toggleCartDrawer(forceOpen = false) {
    const drawer = document.getElementById('cart-drawer');
    if (forceOpen) drawer.classList.add('open');
    else drawer.classList.toggle('open');
}

function updateCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart-text">Tu carrito está vacío</p>';
        document.getElementById('cart-counter').innerText = '0';
        document.getElementById('cart-total').innerText = '$0';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;
        container.innerHTML += `
            <div class="cart-item-row">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>Sabor: ${item.flavor} ${item.extras ? ' | ' + item.extras : ''}</small>
                </div>
                <div>
                    <span>$${item.price.toLocaleString('es-AR')}</span>
                    <button onclick="removeItem(${index})" style="background:none; border:none; color:red; cursor:pointer; margin-left:8px;">🗑️</button>
                </div>
            </div>
        `;
    });

    document.getElementById('cart-counter').innerText = cart.length;
    document.getElementById('cart-total').innerText = `$${total.toLocaleString('es-AR')}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
    let total = cart.reduce((acc, item) => acc + item.price, 0);

    let message = "🍣 *Nuevo Pedido - Oishii Rolls*\n\n";
    cart.forEach((item, idx) => {
        message += `${idx + 1}. *${item.name}*\n`;
        message += `   • Sabor: ${item.flavor}\n`;
        if(item.extras) message += `   • Extras: ${item.extras}\n`;
        message += `   • Precio: $${item.price.toLocaleString('es-AR')}\n\n`;
    });

    message += `📦 *Tipo de entrega:* ${deliveryType === 'retiro' ? 'Retiro en Local' : 'Delivery por Zona'}\n`;
    message += `💰 *Total a abonar:* $${total.toLocaleString('es-AR')}\n\n`;
    message += `¡Hola! Quisiera confirmar este pedido.`;

    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function openWhatsAppDirect() {
    const message = "¡Hola Oishii Rolls! 🍣 Vengo desde la web y quiero hacerles una consulta.";
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
}