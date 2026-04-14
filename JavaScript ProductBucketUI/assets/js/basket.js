const CART_STORAGE_KEY = 'productBucketCart';

const cartCountElement = document.getElementById('cart-count');
const cartItemsBody = document.getElementById('cart-items-body');
const emptyCartMessage = document.getElementById('empty-cart-message');
const distinctCountElement = document.getElementById('summary-distinct-count');
const totalQuantityElement = document.getElementById('summary-total-quantity');
const grandTotalElement = document.getElementById('summary-grand-total');
const clearCartButton = document.getElementById('clear-cart-btn');

function formatPrice(value) {
    return `$${value.toFixed(2)}`;
}

function getCartItems() {
    const savedItems = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedItems) {
        return [];
    }

    try {
        const parsedItems = JSON.parse(savedItems);

        if (!Array.isArray(parsedItems)) {
            return [];
        }

        const normalizedItems = [];

        parsedItems.forEach((item) => {
            if (!item || !item.id) {
                return;
            }

            const quantity = Number.isFinite(item.quantity) && item.quantity > 0 ? item.quantity : 1;
            const existingItem = normalizedItems.find((cartItem) => cartItem.id === item.id);

            if (!existingItem) {
                normalizedItems.push({
                    id: String(item.id),
                    title: item.title || 'Product',
                    price: Number(item.price) || 0,
                    quantity
                });
                return;
            }

            existingItem.quantity += quantity;
        });

        return normalizedItems;
    } catch {
        return [];
    }
}

function saveCartItems(items) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

function updateBasketBadge(cartItems) {
    cartCountElement.textContent = cartItems.length;
}

function renderCart() {
    const cartItems = getCartItems();
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const grandTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartItemsBody.innerHTML = '';

    cartItems.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.title}</td>
            <td>${formatPrice(item.price)}</td>
            <td>
                <div class="d-inline-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary" data-action="decrease" data-id="${item.id}">-</button>
                    <span class="fw-semibold">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" data-action="increase" data-id="${item.id}">+</button>
                </div>
            </td>
            <td>${formatPrice(item.price * item.quantity)}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" data-action="remove" data-id="${item.id}">Remove</button>
            </td>
        `;
        cartItemsBody.appendChild(row);
    });

    emptyCartMessage.classList.toggle('d-none', cartItems.length > 0);
    distinctCountElement.textContent = cartItems.length;
    totalQuantityElement.textContent = totalQuantity;
    grandTotalElement.textContent = formatPrice(grandTotal);
    clearCartButton.disabled = cartItems.length === 0;

    updateBasketBadge(cartItems);
}

function increaseItem(id) {
    const cartItems = getCartItems();
    const targetItem = cartItems.find((item) => item.id === id);

    if (!targetItem) {
        return;
    }

    targetItem.quantity += 1;
    saveCartItems(cartItems);
    renderCart();
}

function decreaseItem(id) {
    const cartItems = getCartItems();
    const targetItem = cartItems.find((item) => item.id === id);

    if (!targetItem) {
        return;
    }

    if (targetItem.quantity > 1) {
        targetItem.quantity -= 1;
        saveCartItems(cartItems);
        renderCart();
        return;
    }

    const updatedItems = cartItems.filter((item) => item.id !== id);
    saveCartItems(updatedItems);
    renderCart();
}

function removeItem(id) {
    const cartItems = getCartItems();
    const updatedItems = cartItems.filter((item) => item.id !== id);

    saveCartItems(updatedItems);
    renderCart();
}

cartItemsBody.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-action]');

    if (!actionButton) {
        return;
    }

    const { action, id } = actionButton.dataset;

    if (action === 'increase') {
        increaseItem(id);
    }

    if (action === 'decrease') {
        decreaseItem(id);
    }

    if (action === 'remove') {
        removeItem(id);
    }
});

clearCartButton.addEventListener('click', () => {
    saveCartItems([]);
    renderCart();
});

renderCart();