//adminLoginr.js

var domEmailField = document.getElementById("emailField");
var domPasswordField = document.getElementById("passwordField");
var domLoginField = document.getElementById("loginButton");

domEmailField.addEventListener("change", validateEmail, false);
domPasswordField.addEventListener("change", validatePassword, false);
domLoginField.addEventListener("click", validateLogin, false);