
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is already logged in 
  checkAuthStatus();
  // Apply saved theme preference from localStorage 
  loadSavedTheme();

  // Login form submission handler
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Attempt login 
    login(username, password);
  });
});