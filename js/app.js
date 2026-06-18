// ============================================
// STATE MANAGEMENT
// ============================================

const state = {
    // Menu Data
    menu: [
        { id: 1, name: 'Veg Manchurian', price: 180, category: 'Main Course', available: true, special: true, description: 'Crispy veg balls in tangy Chinese sauce' },
        { id: 2, name: 'Paneer Tikka', price: 220, category: 'Main Course', available: true, special: true, description: 'Marinated and grilled paneer cubes' },
        { id: 3, name: 'Paneer Chilli', price: 200, category: 'Main Course', available: true, special: false, description: 'Indo-Chinese style paneer with peppers' },
        { id: 4, name: 'Mexican Burger', price: 150, category: 'Burgers', available: true, special: false, description: 'Spicy Mexican style burger with veggies' },
        { id: 5, name: 'Chinese Bowl', price: 160, category: 'Bowls', available: true, special: false, description: 'Noodles with mixed vegetables and sauce' },
        { id: 6, name: 'Mexican Bowl', price: 170, category: 'Bowls', available: true, special: false, description: 'Rice, beans, cheese, and Mexican spices' },
        { id: 7, name: 'Iced Tea', price: 60, category: 'Beverages', available: true, special: false, description: 'Refreshing iced tea with lemon' },
        { id: 8, name: 'Cold Coffee', price: 80, category: 'Beverages', available: true, special: false, description: 'Chilled coffee with milk and ice' },
        { id: 9, name: 'Tea', price: 40, category: 'Beverages', available: true, special: false, description: 'Hot Indian chai' },
        { id: 10, name: 'Chocolate Brownie', price: 90, category: 'Desserts', available: true, special: false, description: 'Rich and fudgy chocolate brownie' }
    ],
    
    // Cart
    cart: [],
    
    // Admin Settings
    admin: {
        openingTime: '10:00',
        closingTime: '22:00',
        closedToday: false
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Get cart total
function getCartTotal() {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart count display
function updateCartCount() {
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Format message for WhatsApp
function formatWhatsAppMessage(name, address, notes) {
    let message = '*Muskan\'s Kitchen - New Order*\n';
    message += '─────────────────────\n';
    message += `Customer: ${name}\n`;
    message += `Address: ${address}\n`;
    if (notes) {
        message += `Notes: ${notes}\n`;
    }
    message += '─────────────────────\n';
    message += 'Items:\n';
    
    state.cart.forEach(item => {
        message += `• ${item.quantity}x ${item.name} (₹${item.price})\n`;
    });
    
    message += '─────────────────────\n';
    message += `*Total: ₹${getCartTotal()}*`;
    
    return encodeURIComponent(message);
}

// ============================================
// DOM MANIPULATION
// ============================================

// Render menu items
function renderMenu(filter = '') {
    const container = document.getElementById('menuContainer');
    const specialsContainer = document.getElementById('specialsContainer');
    const specialsSection = document.getElementById('specialsSection');
    const noResults = document.getElementById('noResults');
    const showUnavailable = document.getElementById('showUnavailable').checked;
    
    container.innerHTML = '';
    specialsContainer.innerHTML = '';
    let hasResults = false;
    let hasSpecials = false;
    
    state.menu.forEach(dish => {
        // Check filter criteria
        const matchesSearch = dish.name.toLowerCase().includes(filter.toLowerCase());
        const isAvailable = dish.available || showUnavailable;
        
        if (!matchesSearch || !isAvailable) return;
        
        hasResults = true;
        const dishCard = createDishCard(dish);
        
        // Add to appropriate container
        if (dish.special && dish.available) {
            specialsContainer.appendChild(dishCard.cloneNode(true));
            hasSpecials = true;
        }
        container.appendChild(dishCard);
    });
    
    // Show/hide specials section
    specialsSection.classList.toggle('hidden', !hasSpecials);
    
    // Show/hide no results message
    noResults.classList.toggle('hidden', hasResults);
}

// Create dish card element
function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = `bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition ${!dish.available ? 'opacity-50' : ''}`;
    
    card.innerHTML = `
        <div class="bg-gradient-to-br from-salmon to-apricot h-40 flex items-center justify-center">
            <i class="fas fa-image text-white text-4xl opacity-50"></i>
        </div>
        <div class="p-4 space-y-3">
            <div class="flex justify-between items-start">
                <h3 class="text-lg font-bold text-espresso flex-1">${dish.name}</h3>
                ${dish.special ? '<span class="px-2 py-1 bg-apricot text-white text-xs font-bold rounded">Special</span>' : ''}
            </div>
            <p class="text-sm text-gray-600">${dish.description}</p>
            <div class="flex justify-between items-center pt-2">
                <span class="text-2xl font-bold text-apricot">₹${dish.price}</span>
                <span class="text-xs font-semibold text-gray-500">${dish.category}</span>
            </div>
            ${dish.available 
                ? `<button class="addToCart w-full px-4 py-2 bg-apricot text-white font-bold rounded-lg hover:bg-opacity-80 transition" data-id="${dish.id}">
                    + Add to Cart
                </button>` 
                : `<button class="w-full px-4 py-2 bg-gray-300 text-gray-600 font-bold rounded-lg cursor-not-allowed" disabled>
                    Out of Stock
                </button>`
            }
        </div>
    `;
    
    const addBtn = card.querySelector('.addToCart');
    if (addBtn) {
        addBtn.addEventListener('click', () => addToCart(dish.id));
    }
    
    return card;
}

// Render cart
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    cartItems.innerHTML = '';
    
    if (state.cart.length === 0) {
        cartItems.style.display = 'none';
        emptyCart.style.display = 'flex';
        document.getElementById('cartTotal').textContent = '₹0';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartItems.style.display = 'block';
    
    state.cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'bg-cream rounded-lg p-3 flex justify-between items-center';
        cartItem.innerHTML = `
            <div class="flex-1">
                <p class="font-semibold text-espresso">${item.name}</p>
                <p class="text-sm text-gray-600">₹${item.price} each</p>
            </div>
            <div class="flex items-center gap-2">
                <button class="decreaseQty px-2 py-1 bg-salmon text-white rounded font-bold" data-id="${item.id}">−</button>
                <span class="w-8 text-center font-bold">${item.quantity}</span>
                <button class="increaseQty px-2 py-1 bg-apricot text-white rounded font-bold" data-id="${item.id}">+</button>
            </div>
            <button class="removeItem ml-2 px-2 py-1 bg-red-500 text-white rounded text-sm" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Attach quantity and remove event listeners
    document.querySelectorAll('.increaseQty').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.id), 1));
    });
    
    document.querySelectorAll('.decreaseQty').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.id), -1));
    });
    
    document.querySelectorAll('.removeItem').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
    });
    
    document.getElementById('cartTotal').textContent = `₹${getCartTotal()}`;
}

// Render admin panel
function renderAdminPanel() {
    const container = document.getElementById('dishManagement');
    container.innerHTML = '';
    
    state.menu.forEach(dish => {
        const item = document.createElement('div');
        item.className = 'bg-cream p-4 rounded-lg flex items-center gap-4';
        item.innerHTML = `
            <div class="flex-1">
                <p class="font-bold text-espresso">${dish.name}</p>
                <p class="text-sm text-gray-600">₹${dish.price}</p>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="availabilityToggle w-4 h-4" data-id="${dish.id}" ${dish.available ? 'checked' : ''}>
                <span class="text-sm">Available</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="specialToggle w-4 h-4" data-id="${dish.id}" ${dish.special ? 'checked' : ''}>
                <span class="text-sm">Today's Special</span>
            </label>
        `;
        container.appendChild(item);
    });
    
    // Attach listeners
    document.querySelectorAll('.availabilityToggle').forEach(toggle => {
        toggle.addEventListener('change', () => {
            const dish = state.menu.find(d => d.id === parseInt(toggle.dataset.id));
            dish.available = toggle.checked;
        });
    });
    
    document.querySelectorAll('.specialToggle').forEach(toggle => {
        toggle.addEventListener('change', () => {
            const dish = state.menu.find(d => d.id === parseInt(toggle.dataset.id));
            dish.special = toggle.checked;
        });
    });
}

// ============================================
// CART OPERATIONS
// ============================================

function addToCart(dishId) {
    const dish = state.menu.find(d => d.id === dishId);
    const existingItem = state.cart.find(item => item.id === dishId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        state.cart.push({ ...dish, quantity: 1 });
    }
    
    updateCartCount();
    renderCart();
    openCart();
}

function removeFromCart(dishId) {
    state.cart = state.cart.filter(item => item.id !== dishId);
    updateCartCount();
    renderCart();
}

function updateQuantity(dishId, change) {
    const item = state.cart.find(i => i.id === dishId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(dishId);
        } else {
            updateCartCount();
            renderCart();
        }
    }
}

// ============================================
// MODAL & UI OPERATIONS
// ============================================

function openCart() {
    document.getElementById('cartDrawer').classList.remove('translate-x-full');
    document.getElementById('cartOverlay').classList.remove('hidden');
}

function closeCart() {
    document.getElementById('cartDrawer').classList.add('translate-x-full');
    document.getElementById('cartOverlay').classList.add('hidden');
}

function openAdmin() {
    document.getElementById('adminPanel').classList.remove('hidden');
    renderAdminPanel();
    document.getElementById('openingTime').value = state.admin.openingTime;
    document.getElementById('closingTime').value = state.admin.closingTime;
    document.getElementById('closedToday').checked = state.admin.closedToday;
}

function closeAdmin() {
    document.getElementById('adminPanel').classList.add('hidden');
}

function openOrderModal() {
    if (state.admin.closedToday) {
        document.getElementById('closedOverlay').classList.remove('hidden');
        return;
    }
    
    if (state.cart.length === 0) {
        alert('Your cart is empty. Please add items before placing an order.');
        return;
    }
    
    document.getElementById('orderModal').classList.remove('hidden');
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.add('hidden');
}

// ============================================
// EVENT LISTENERS
// ============================================

// Navigation
document.getElementById('adminToggle').addEventListener('click', openAdmin);
document.getElementById('adminToggleMobile').addEventListener('click', openAdmin);
document.getElementById('closeAdmin').addEventListener('click', closeAdmin);

document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

document.getElementById('viewMenuBtn').addEventListener('click', openCart);

// Search and Filter
document.getElementById('searchInput').addEventListener('input', (e) => {
    renderMenu(e.target.value);
});

document.getElementById('showUnavailable').addEventListener('change', () => {
    renderMenu(document.getElementById('searchInput').value);
});

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (state.cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    openOrderModal();
});

// Order Modal
document.getElementById('cancelOrder').addEventListener('click', closeOrderModal);

document.getElementById('submitOrder').addEventListener('click', () => {
    const name = document.getElementById('customerName').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const notes = document.getElementById('customerNotes').value.trim();
    
    if (!name || !address) {
        alert('Please fill in your name and address');
        return;
    }
    
    const message = formatWhatsAppMessage(name, address, notes);
    const whatsappLink = `https://wa.me/919586600874?text=${message}`;
    window.open(whatsappLink, '_blank');
    
    // Clear cart and close modal
    state.cart = [];
    updateCartCount();
    renderCart();
    closeOrderModal();
    closeCart();
    alert('Order sent successfully! You will receive a confirmation shortly.');
});

// Admin Save
document.getElementById('saveAdmin').addEventListener('click', () => {
    state.admin.openingTime = document.getElementById('openingTime').value;
    state.admin.closingTime = document.getElementById('closingTime').value;
    state.admin.closedToday = document.getElementById('closedToday').checked;
    
    renderMenu();
    closeAdmin();
    alert('Changes saved successfully!');
});

// Closed overlay
document.getElementById('closedOk').addEventListener('click', () => {
    document.getElementById('closedOverlay').classList.add('hidden');
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCartCount();
});