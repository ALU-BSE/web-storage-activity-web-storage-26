// function to sanitize input to prevent XSS attacks
function sanitizeInput(input) {
    return encodeURIComponent(input);
}
function displayInput() {
    const inputField = document.getElementById("userInput")?.value || "";
    const sanitized = sanitizeInput(inputField);
    const output = document.getElementById("output");
    if (output) output.textContent = sanitized;
}

// here we generate a random token and store it in sessionStorage
function generateCSRFToken() {
    const token = Math.random().toString(36).substr(2); // generate a random token
    sessionStorage.setItem("csrfToken", token); // store the token in sessionStorage
    const form = document.getElementById("login-form"); 
    if (form) {
        let input = form.querySelector('input[name="csrfToken"]'); // check if the input field already exists
        if (!input) {
            input = document.createElement("input"); // create a hidden input field
            input.type = "hidden";
            input.name = "csrfToken";
            form.appendChild(input);
        }
        input.value = token;
    }
}

// this function validates the CSRF token
function validateCSRFToken(submittedToken) {
    const storedToken = sessionStorage.getItem("csrfToken");
    return submittedToken === storedToken;
}

// here we encrypt the data
function encryptData(data) {
    return CryptoJS.AES.encrypt(data, "shopdemo-secret").toString();
}
// here we decrypt the data
function decryptData(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, "shopdemo-secret");
    return bytes.toString(CryptoJS.enc.Utf8);
}
// here we run the XSS demo
function runXSSDemo() {
    const input = document.getElementById("xss-input").value;
    const sanitized = sanitizeInput(input);
    document.getElementById("xss-output").innerHTML = `
    <p><strong>Before (Raw):</strong> ${sanitized}</p>
    <p><strong>After (Sanitized):</strong> <code>${encodeURIComponent(input)}</code></p>
`;
}
// here we show the CSRF token
function showCSRFToken() {
    const token = sessionStorage.getItem("csrfToken");
    document.getElementById("csrf-output").textContent = Current Token: ${token || "None"};
}
// this is where we run the encryption demo
function runEncryptionDemo() {
    const input = document.getElementById("encrypt-input").value; // get the input value
    if (!input) return; 
    const encrypted = encryptData(input); // encrypt the input value
    localStorage.setItem("demoEncrypted", encrypted); // store the encrypted value in localStorage
    const decrypted = decryptData(encrypted); // decrypt the encrypted value
    document.getElementById("encrypt-output").innerHTML = `
    <p><strong>Encrypted:</strong> <span class="code-display"><code>${encrypted}</code></span></p>
    <p><strong>Decrypted:</strong> ${decrypted}</p>
  `;
}