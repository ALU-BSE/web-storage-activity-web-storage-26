// Get cart from sessionStorage or initialize empty
function getCart() {
    return JSON.parse(sessionStorage.getItem("cart")) || [];
}

// Save cart to sessionStorage
function saveCart(cart) {
    sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(productName) {
    const cart = getCart();

    cart.push({ product: productName, quantity: 1 });

    saveCart(cart);
    displayCart();
}

// Display cart items dynamically
function displayCart() {
    const cart = getCart();
    const cartContainer = document.getElementById("cart");

    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.textContent = `${item.product} (x${item.quantity})`;
        cartContainer.appendChild(div);
    });
}

// Load cart on page load
window.onload = function () {
    displayCart();
};