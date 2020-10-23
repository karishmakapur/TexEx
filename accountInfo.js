// accountInfo.js

function displayAccount () {

	var name = document.getElementById("nameField");
	var email = document.getElementById("emailField");
	var school = document.getElementById("schoolField");

	var userInfo = ["John Doe", "johndoe@cougars.csusm.edu", "California State University San Marcos"];

	name.setAttribute("value", userInfo[0]);
	email.setAttribute("value", userInfo[1]);
	school.setAttribute("value", userInfo[2]);
}

function openModal (event) {
	
	var dom = event.currentTarget;
	var closeButton = document.createElement("span");
	var oldPassword = document.createElement("input");
	var newPassword = document.createElement("input");
	var confirmPassword = document.createElement("input");
	var okButton = document.createElement("input");
	var innerContent = document.createElement("div");
	var modal = document.createElement("div");

	var breakLine1 = document.createElement("br");
	var breakLine2 = document.createElement("br");
	var breakLine3 = document.createElement("br");
	var breakLine4 = document.createElement("br");
	var breakLine5 = document.createElement("br");

	closeButton.setAttribute("class", "closeButton");
	closeButton.textContent = ("X");
	closeButton.setAttribute("id", "closeButton");
	closeButton.addEventListener("click", closeModal, false);

	oldPassword.setAttribute("type", "text");
	oldPassword.setAttribute("placeholder", "Enter old password");
	oldPassword.setAttribute("id", "oldPassword");
	oldPassword.setAttribute("class", "modalInput");


	newPassword.setAttribute("type", "text");
	newPassword.setAttribute("placeholder", "Enter new password");
	newPassword.setAttribute("id", "newPassword");
	newPassword.setAttribute("class", "modalInput");
	newPassword.setAttribute("required", "true");
	// newPassword.setAttribute("pattern", "(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$");

	// newPassword.addEventListener("invalid", invalidPass, false);
	// newPassword.addEventListener("input", enteringPass, false);

	confirmPassword.setAttribute("type", "text");
	confirmPassword.setAttribute("placeholder", "Confirm new password");
	confirmPassword.setAttribute("id", "confirmPassword");
	confirmPassword.setAttribute("class", "modalInput");
	confirmPassword.setAttribute("required", "true");



	okButton.setAttribute("type", "button");
	okButton.setAttribute("value", "Change Password");
	okButton.setAttribute("class", "okButton");

	okButton.addEventListener("click", changePassword, false);

	innerContent.setAttribute("class", "modal-content");

	innerContent.appendChild(closeButton);
	innerContent.appendChild(breakLine1);
	innerContent.appendChild(breakLine5);
	innerContent.appendChild(oldPassword);
	innerContent.appendChild(breakLine2);
	innerContent.appendChild(newPassword);
	innerContent.appendChild(breakLine3);
	innerContent.appendChild(confirmPassword);
	innerContent.appendChild(breakLine4);
	innerContent.appendChild(okButton);

	modal.appendChild(innerContent);
	modal.style.display = "block";
	modal.setAttribute("class", "modalStyle");
	document.getElementById("fieldsContainer").insertAdjacentElement('afterend', modal);

}

function closeModal () {

	var close = document.getElementById("closeButton");
	close.parentNode.parentNode.style.display = "none";

}

function changePassword (event) {
	
	var oldPassword = document.getElementById("oldPassword").value;
	var newPassword = document.getElementById("newPassword").value;
	var confirmPassword = document.getElementById("confirmPassword").value;
	var passwordChange = false;

	var correctPassword = checkPassword(CryptoJS.SHA256(oldPassword.value)); 
	if(correctPassword) {
		var pos = newPassword.search(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
		if (pos != 0) {
			passwordChange = false;
			return false;
		}
		var passwordConfirm = validateConfirmPassword(confirmPassword, newPassword); 
		if (passwordConfirm == false) {
			passwordChange = false;
			return false;
		}
		// TO DO swap value with passwordchange function
		passwordChange = true;
	} else {
		return false;
	}
	if (passwordChange) {
		var close = document.getElementById("closeButton");
		close.parentNode.parentNode.style.display = "none";
	}
	return true;
}

function validateConfirmPassword(entryTwo, original){
	if(entryTwo.value !== original.value){
		//alert("The passwords do not match. Please reenter your password.");
		return false;
	}
	else{
		return true;
	}
}

function checkPassword (oldPassword) {
	//TO DO true needs to be swapped with PHP funtion call to determine if old pw is users pw.
	var correctPassword = true;
	return correctPassword;
}

function updateAccount (event) {

	var name = document.getElementById("nameField").value;
	var email = document.getElementById("emailField").value;
	var school = document.getElementById("schoolField").value;

	// TO DO swap these values with a PHP function to update account
	var updatedAccount = true;

	if(updatedAccount == false) { 
		alert("Couldn't update account. Try again later"); 
	} else {
		alert("Your account has been successfully updated!");
		window.location.href="accountInfo.html";
	}
	return updatedAccount;
}

function disableAccount (event) {
	// TO DO swap with PHP function to delete account
	var disabledAccount = true;

	if (disabledAccount) {
		alert("Your account has been successfully disabled.");
		window.location.href="index.html";
	} else {
		alert("Account could not be disabled, try again later.");
	}

}


