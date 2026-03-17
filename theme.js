
// toggle between light and dark mode.
function toggleTheme() {
  const settings = getSavedSettings();
  const newTheme = settings.theme === "dark" ? "light" : "dark";
  // Create an updated settings object with the new theme and existing font size 
  const updatedSettings = {
    theme: newTheme,
    fontSize: settings.fontSize || 16
  };

  // Save to localStorage 
  try {
    localStorage.setItem("userSettings", JSON.stringify(updatedSettings));
  } catch (e) {
    // catch error if quota has been exceeded
    console.warn("localStorage is full. Could not save theme preference.", e);
    alert("Could not save your preference because storage is full.");
    return;
  }
  // Apply the new theme to the page
  applyTheme(newTheme);
}

// On page load, read the saved theme from localStorage and apply it.
function loadSavedTheme() {
  const settings = getSavedSettings();
  applyTheme(settings.theme || "light");
}
// Applies the given theme by setting a class on the body
function applyTheme(theme) {
  document.body.className = theme; // sets body class to "light" or "dark"

  const btn = document.getElementById("theme-toggle-btn");
  if (btn) {
    btn.textContent = theme === "dark" ? " Light Mode" : " Dark Mode";
  }
}

// Helper function to read saved settings from localStorage.
function getSavedSettings() {
  try {
    const raw = localStorage.getItem("userSettings");
    // If nothing saved, return defaults
    return raw ? JSON.parse(raw) : { theme: "light", fontSize: 16 };
  } catch (e) {
    // If parsing fails load error
    console.warn("Could not parse saved settings.", e);
    return { theme: "light", fontSize: 16 };
  }
}