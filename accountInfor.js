var domupdatePasswordButton = document.getElementById("updatePasswordButton");
var domupdateAccountButton = document.getElementById("updateAccountButton");
var domdisableAccountButton = document.getElementById("disableAccountButton");

domupdatePasswordButton.addEventListener("click", openModal, false);
domupdateAccountButton.addEventListener("click", updateAccount, false);
domdisableAccountButton.addEventListener("click", disableAccount, false);
