// --- DEBUGGING CHALLENGE ---
// Can you spot the bug in this code?
//
// const cart = sessionStorage.getItem("cart") || [];
// cart.push({ product: "Book", quantity: 1 });
// sessionStorage.setItem("cart", JSON.stringify(cart));
//
// BUG: sessionStorage.getItem() returns a STRING not an array.
// Calling .push() on a string throws a TypeError.
// FIX: Wrap with JSON.parse() so we get an actual array:
// const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

function getCart() {
    try {
        return JSON.parse(sessionStorage.getItem("cart")) || [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    sessionStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productName, price) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.product === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ product: productName, price: price, quantity: 1 });
    }
    saveCart(cart);
    renderCart();
}

function removeFromCart(productName) {
    let cart = getCart();
    cart = cart.filter(item => item.product !== productName);
    saveCart(cart);
    renderCart();
}

function clearCart() {
    sessionStorage.removeItem("cart");
    renderCart();
}

function renderCart() {
    const cart = getCart();
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    const clearBtn = document.getElementById("clear-cart-btn");

    if (!cartContainer || !totalContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        totalContainer.innerHTML = "";
        clearBtn?.classList.add("hidden");
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <span class="cart-item-name">${item.product} (x${item.quantity})</span>
            <span class="cart-item-price">$${itemTotal}</span>
            <button class="remove-btn" onclick="removeFromCart('${item.product}')">Remove</button>
        `;
        cartContainer.appendChild(div);
    });

    totalContainer.innerHTML = `Total: $${total}`;
    clearBtn?.classList.remove("hidden");
}