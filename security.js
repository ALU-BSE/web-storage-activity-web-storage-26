// Sanitize user input
function sanitizeInput(input) {
    return encodeURIComponent(input);
}

// Display sanitized input
function displayInput() {
    const inputField = document.getElementById("userInput").value;
    const sanitized = sanitizeInput(inputField);

    document.getElementById("output").textContent = sanitized;
}

// Generate CSRF token
function generateCSRFToken() {
    return Math.random().toString(36).substr(2);
}

// Add CSRF token to form
function addCSRFToken() {
    const form = document.getElementById("form");
    const csrfToken = generateCSRFToken();

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "csrfToken";
    input.value = csrfToken;

    form.appendChild(input);
}

// Initialize CSRF token on page load
window.onload = function () {
    addCSRFToken();
};