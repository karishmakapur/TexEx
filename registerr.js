//registerr.js

var domNameField = document.getElementById("nameField");
var domEmailField = document.getElementById("emailField");
var domSchoolField = document.getElementById("schoolField");
var domPasswordField = document.getElementById("passwordField");
var domConfirmPasswordField = document.getElementById("confirmpasswordField");
var domCreateAccountButton = document.getElementById("createAccountButton");

domNameField.addEventListener("change", validateName, false);
domEmailField.addEventListener("change", validateEmail, false);
domSchoolField.addEventListener("change", validateSchool, false);
domPasswordField.addEventListener("change", validatePassword, false);
domConfirmPasswordField.addEventListener("change", validateConfirmPassword, false);
domCreateAccountButton.addEventListener("click", validateCreateAccount, false);

