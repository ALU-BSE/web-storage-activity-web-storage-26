document.addEventListener("DOMContentLoaded", () => {
  checkAuthStatus();
  loadSavedTheme();
  generateCSRFToken();
  renderCart();

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      const submittedToken = loginForm.querySelector('input[name="csrfToken"]')?.value;

      if (validateCSRFToken(submittedToken)) {
        login(username, password);
      } else {
        alert("Security Error: CSRF Token Mismatch.");
      }
    });
  }

  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies-btn");
  if (cookieBanner && !localStorage.getItem("cookieConsent")) {
    cookieBanner.classList.remove("hidden");
  }
  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      cookieBanner.classList.add("hidden");
    });
  }
});