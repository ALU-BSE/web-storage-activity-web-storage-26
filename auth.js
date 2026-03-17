
// Handles user authentication 
function login(username, password) {
  // validation to ensure both fields are filled out
  if (!username || !password) {
    alert("Please enter both username and password.");
    return false;
  }

  //seven days expiration date for the auth token cookie
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  document.cookie = `authToken=user123; expires=${expiryDate.toUTCString()}; Secure; path=/`;

  // Store username in localStorage so we can display it in the navbar
  localStorage.setItem("loggedInUser", username);

  // Show the main app, hide the login form
  showApp(username);
  return true;
}

// Logs the user out by deleting the authToken cookie and clearing stored username
function logout() {
  // Delete cookie by backdating its expiry
  document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  // Clear stored username
  localStorage.removeItem("loggedInUser");
  // Also clear the cart on logout to prevent data leakage between users
  sessionStorage.removeItem("cart");
  // Hide the app, show the login form
  hideApp();
}

// check if user is already logged in by looking for the authToken cookie and stored username in localStorage
function checkAuthStatus() {
  const token = getCookie("authToken");
  const username = localStorage.getItem("loggedInUser");

  if (token && username) {
    // Already logged in — go straight to the app
    showApp(username);
  }
}

// Helper function to read a specific cookie by name
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

// shows the app and welcome message with the username
function showApp(username) {
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("main-app").classList.remove("hidden");
  document.getElementById("welcome-msg").textContent = ` Hi, ${username}`;
}

// hides the app and shows the login form
function hideApp() {
  document.getElementById("main-app").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
}