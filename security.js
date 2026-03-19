// sanitize input to prevent XSS attacks using encodeURIComponent
function sanitizeInput(input) {
    return encodeURIComponent(input);
}

function displayInput() {
    const inputField = document.getElementById("userInput")?.value || "";
    const sanitized = sanitizeInput(inputField);
    const output = document.getElementById("output");
    if (output) output.textContent = sanitized;
}

// generate a random CSRF token, store it in sessionStorage,
// and inject it as a hidden input into the login form
function generateCSRFToken() {
    const token = Math.random().toString(36).substr(2);
    sessionStorage.setItem("csrfToken", token);
    const form = document.getElementById("login-form");
    if (form) {
        let input = form.querySelector('input[name="csrfToken"]');
        if (!input) {
            input = document.createElement("input");
            input.type = "hidden";
            input.name = "csrfToken";
            form.appendChild(input);
        }
        input.value = token;
    }
}

// validate the submitted CSRF token against the one stored in sessionStorage
function validateCSRFToken(submittedToken) {
    const storedToken = sessionStorage.getItem("csrfToken");
    return submittedToken === storedToken;
}

function encryptData(data) {
    return CryptoJS.AES.encrypt(data, "shopdemo-secret").toString();
}

function decryptData(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, "shopdemo-secret");
    return bytes.toString(CryptoJS.enc.Utf8);
}

function runXSSDemo() {
    const input = document.getElementById("xss-input").value;
    document.getElementById("xss-output").innerHTML = `
        <p><strong>Before (Raw):</strong> ${input.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        <p><strong>After (Sanitized):</strong> <code>${encodeURIComponent(input)}</code></p>
    `;
}

function showCSRFToken() {
    const token = sessionStorage.getItem("csrfToken");
    document.getElementById("csrf-output").textContent = `Current Token: ${token || "None"}`;
}

function runEncryptionDemo() {
    const input = document.getElementById("encrypt-input").value;
    if (!input) return;
    const encrypted = encryptData(input);
    localStorage.setItem("demoEncrypted", encrypted);
    const decrypted = decryptData(encrypted);
    document.getElementById("encrypt-output").innerHTML = `
        <p><strong>Encrypted:</strong> <code>${encrypted}</code></p>
        <p><strong>Decrypted:</strong> ${decrypted}</p>
    `;
}