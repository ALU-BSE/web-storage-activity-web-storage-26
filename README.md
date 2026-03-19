[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=23160748)


# ShopDemo (Web Storage E-Commerce Demo)

A collaborative learning project demonstrating Cookies, Local Storage,
and Session Storage through a practical e-commerce application.

## Team Members

| Name            | Role                                             
|-----------------|--------------------------------------------------------|
| Norette Atete   | Auth (cookies) + Theme (localStorage) + HTML/CSS       | 
| Jesse Walusansa | Cart (sessionStorage) + Security (XSS/CSRF/Encryption) | 

## Project Structure

shop-demo
├── index.html       # Full page layout
├── index.css        # All styles, light/dark mode
├── auth.js          # Task 1: Cookie-based login/logout
├── theme.js         # Task 2: localStorage theme preference
├── cart.js          # Task 3: sessionStorage shopping cart
├── security.js      # Task 4: XSS, CSRF, AES encryption
└── main.js          # App entry point

## Web Storage Comparison

| Criteria         | Cookies      | Local Storage     | Session Storage |
|------------------|--------------|-------------------|-----------------|
| Size Limit       | 4KB          | 5–10MB            | 5–10MB          |
| Data Persistence | Configurable | Permanent         | Session only    |
| Server Access    | Yes          | No                | No              |
| Use Case         | Auth tokens  | Theme preferences | Cart temp data  |

## Features

### Task 1 — User Authentication (Cookies)
- Login form sets an authToken cookie with a 7-day expiry
- Cookie uses the Secure flag (and HttpOnly for demonstration —
  noted in code comments as server-side only)
- Logout deletes the cookie by backdating its expiry
- On page reload, the app checks for the cookie to skip login

### Task 2 — Theme Preferences (Local Storage)
- Toggle between light and dark mode
- Preference saved as a JSON object: { theme, fontSize }
- Theme is auto-applied on every page load
- try/catch handles QuotaExceededError if storage is full

### Task 3 — Shopping Cart (Session Storage)
- Add products to a session-specific cart
- Quantities increment if the same product is added twice
- Cart resets automatically when the browser tab is closed
- Items can be removed individually or cleared all at once

### Task 4 — Security
- XSS sanitization using encodeURIComponent()
- CSRF token generated with Math.random(), stored in 
  sessionStorage, and injected into the login form as a 
  hidden input, validated on submission
- AES encryption/decryption demo using CryptoJS

## How to Run

Open index.html in any modern browser via Live Server — no build 
tools needed. Test in incognito mode to see session storage reset.

## Individual Notes Summary

### Norette Atete
Cookies, local storage, and session storage allow web developers 
to store data locally on a user's device to enhance user experience 
and personalization. Cookies can be persistent or session-based. 
Local storage provides long-term storage until explicitly removed. 
Session storage is cleared once the session ends. All three are 
vulnerable to XSS attacks so only non-sensitive data should be stored.

### Jesse Walusansa
Cookies are small text files sent with every HTTP request, making 
them ideal for authentication but vulnerable to CSRF. Local storage 
stores data permanently on the client side with no server transmission. 
Session storage works like local storage but clears when the tab closes. 
CSRF only affects cookies because local storage requires explicit 
JavaScript access and is never automatically sent with requests.

### Authors

Atete Norette
Jesse Walusansa
