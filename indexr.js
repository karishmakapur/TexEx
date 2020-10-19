var domGetStartedButton = document.getElementById("getStartedButton");
var domAdminButton = document.getElementById("AdminButton");

domGetStartedButton.addEventListener("click", redirectToUserLogin, false);
domAdminButton.addEventListener("click", redirectToAdminLogin, false);