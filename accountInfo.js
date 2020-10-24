// accountInfo.js

function displayAccount () {

	var name = document.getElementById("nameField");
	var email = document.getElementById("emailField");
	var school = document.getElementById("schoolField");

	//TODO: swap values with user information from a PHP function call
	/*var userInfo = ["John Doe", "johndoe@cougars.csusm.edu", "California State University San Marcos"];

	name.setAttribute("value", userInfo[0]);
	email.setAttribute("value", userInfo[1]);
	school.setAttribute("value", userInfo[2]);*/
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
	var errorDiv = document.createElement("div");
	var errorMsg = document.createElement("p");
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

	confirmPassword.setAttribute("type", "text");
	confirmPassword.setAttribute("placeholder", "Confirm new password");
	confirmPassword.setAttribute("id", "confirmPassword");
	confirmPassword.setAttribute("class", "modalInput");
	confirmPassword.setAttribute("required", "true");

	errorDiv.setAttribute("id", "errorDiv");
	errorDiv.setAttribute("class", "errorArea");
	errorDiv.style.visibility = "hidden";
	errorMsg.setAttribute("id", "errorMessage");
	errorMsg.setAttribute("class", "errorMsg");
	errorMsg.style.visibility = "hidden";
	errorMsg.textContent = "Error changing password! Please make sure your old password is entered correctly. Your new password length must be greater than or equal to 8. It must contain one or more uppercase characters. It must contain one or more lowercase characters. It must contain one or more numeric values. It must contain one or more special characters.";

	errorDiv.appendChild(errorMsg);
	okButton.setAttribute("type", "button");
	okButton.setAttribute("value", "Change Password");
	okButton.setAttribute("class", "okButton");

	okButton.addEventListener("click", changePassword, false);

	innerContent.setAttribute("class", "modal-content");

	innerContent.appendChild(closeButton);
	innerContent.appendChild(breakLine1);
	innerContent.appendChild(breakLine2);
	innerContent.appendChild(oldPassword);
	innerContent.appendChild(breakLine3);
	innerContent.appendChild(newPassword);
	innerContent.appendChild(breakLine4);
	innerContent.appendChild(confirmPassword);
	innerContent.appendChild(breakLine5);
	innerContent.appendChild(errorDiv);
	innerContent.appendChild(okButton);

	modal.appendChild(innerContent);
	modal.style.display = "block";
	modal.setAttribute("class", "modalStyle");
	document.getElementById("fieldsContainer").insertAdjacentElement('afterend', modal);

}

function closeModal (event) {
	var close = event.currentTarget;
	close.parentNode.parentNode.style.display = "none";

}

function closeMsg (event) {
	var close = event.currentTarget;
	close.parentNode.style.display = "none";

}
function changePassword (event) {
	document.getElementById("errorDiv").style.visibility = "hidden";
	document.getElementById("errorMessage").style.visibility = "hidden";
	var oldPassword = document.getElementById("oldPassword").value;
	var newPassword = document.getElementById("newPassword").value;
	var confirmPassword = document.getElementById("confirmPassword").value;
	var passwordChange = false;

	var correctPassword = checkPassword(CryptoJS.SHA256(oldPassword.value));
	if(correctPassword) {
		var pos = newPassword.search(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
		if (pos != 0) {
			passwordChange = false;
			document.getElementById("errorDiv").style.visibility = "visible";
			document.getElementById("errorMessage").style.visibility = "visible";
			return false;
		}
		var passwordConfirm = validateConfirmPassword(confirmPassword, newPassword);
		if (!passwordConfirm) {
			document.getElementById("errorDiv").style.visibility = "visible";
			document.getElementById("errorMessage").style.visibility = "visible";
			passwordChange = false;
			return false;
		}
		// TO DO swap value with passwordchange function
		passwordChange = true;
	} 
	else 
	{
		return false;
	}
	if (passwordChange) {
		var close = document.getElementById("closeButton");
		close.parentNode.parentNode.style.display = "none";
		
		//create a success message
		var closebtn = document.createElement("span");
		var alertDiv = document.createElement("div");
		
		closebtn.setAttribute("class", "closeButton");
		closebtn.textContent = "X";
		closebtn.addEventListener("click", closeMsg, false);
		alertDiv.setAttribute("class", "Successmessage");
		alertDiv.textContent = "Success! Your password has been successfully changed!";
		
		alertDiv.appendChild(closebtn);
		document.getElementById("nav").insertAdjacentElement('afterend',alertDiv);
		
		
	}
	return true;
}

function validateConfirmPassword(entryTwo, original){
	if(entryTwo !== original){
		//alert("The passwords do not match. Please reenter your password.");
		return false;
	}
	return true;
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
	
	if(name == "" || email == "" || school == ""){
		//create a error message
		var closebtn = document.createElement("span");
		var alertDiv = document.createElement("div");
		
		closebtn.setAttribute("class", "closeButton");
		closebtn.textContent = "X";
		closebtn.addEventListener("click", closeMsg, false);
		alertDiv.setAttribute("class", "Errormessage");
		alertDiv.textContent = "Error! You must fill in all fields before updating your account.";
		
		alertDiv.appendChild(closebtn);
		document.getElementById("nav").insertAdjacentElement('afterend',alertDiv);
		
		return false;
	}

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

function displaySavedSearch () {

	var searchContainer = document.createElement("div");
	searchContainer.setAttribute("class", "fieldsContainer");
	var savedSearches = new Array(new Array());
	
	/*savedSearches = [["123", "Author", "Peter"], ["234", "ISBN", "345678"], ["345", "Title", "Book1"], 
	["456", "Author", "Peter"], ["567", "ISBN", "345678"], ["789", "Title", "Book1"], 
	["891", "Author", "Peter"], ["897", "ISBN", "345678"], ["945", "Title", "Book1"], 
	["923", "Author", "Peter"], ["934", "ISBN", "345678"], ["945", "Title", "Book1"]];
	*/
	
	if(isEmpty(savedSearches)){
		var list = document.createElement("input");
		list.setAttribute("type", "text");
		list.setAttribute("id", "NoSearch");
		list.setAttribute("readonly", "readonly");
		list.setAttribute("value", "No Saved Searches!");
		list.setAttribute("class", "searchContainer");
		searchContainer.appendChild(list);
	}
	else{
		for (var i = 0; i < savedSearches.length; i++) {
			var search = savedSearches[i];
			var list = document.createElement("input");
			list.setAttribute("type", "text");
			list.setAttribute("id", "search"+search[0]);
			list.setAttribute("readonly", "readonly");
			list.setAttribute("value", search[1] + ": " + search[2]);
			list.setAttribute("class", "searchContainer");
			list.addEventListener("click", redirectSearch, false);
			searchContainer.appendChild(list);
		}
	}
	document.getElementById("searches").appendChild(searchContainer);
}

function redirectSearch(event){
	var dom = event.currentTarget;
	var values = dom.value;
	var type = values.match(/[A-Za-z]+/);
	var term = values.match(/(?<=: )\w+/);
	var queryString = "searchType=" + type + "&searchTerm=" + term;
	console.log(queryString);
	window.location.href="search.html"+ "?" + queryString;
	
}

function isEmpty(array) {
  return Array.isArray(array) && (array.length == 0 || array.every(isEmpty));
}

