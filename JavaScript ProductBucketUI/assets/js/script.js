const products = document.querySelectorAll('.card');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartCountElement = document.getElementById('cart-count');

const CART_STORAGE_KEY = 'productBucketCart';

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

            const existingIndex = normalizedItems.findIndex((cartItem) => cartItem.id === item.id);
            const itemQuantity = Number.isFinite(item.quantity) && item.quantity > 0 ? item.quantity : 1;

            if (existingIndex === -1) {
                normalizedItems.push({
                    id: item.id,
                    title: item.title || 'Product',
                    price: Number(item.price) || 0,
                    quantity: itemQuantity
                });
                return;
            }

            normalizedItems[existingIndex].quantity += itemQuantity;
        });

        return normalizedItems;
    } catch {
        return [];
    }
}

function saveCartItems(items) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

function updateCartCount() {
    const cartItems = getCartItems();
    cartCountElement.textContent = cartItems.length;
}

function getProductData(productCard) {
    return {
        id: productCard.dataset.id,
        title: productCard.querySelector('.card-title').textContent.trim(),
        price: Number(productCard.dataset.price) || 0,
        quantity: 1
    };
}

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const productCard = products[index];
        const product = getProductData(productCard);
        const cartItems = getCartItems();
        const existingProduct = cartItems.find((item) => item.id === product.id);

        if (!existingProduct) {
            cartItems.push(product);
            alert(`Added to cart: ${product.title}`);
        } else {
            existingProduct.quantity += 1;
            alert(`Updated quantity for: ${existingProduct.title}`);

        }

        saveCartItems(cartItems);
        updateCartCount();
    });
});

updateCartCount();




