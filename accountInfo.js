// accountInfo.js

function displayAccount () {

	var name = document.getElementById("nameField");
	var email = document.getElementById("emailField");
	var school = document.getElementById("schoolField");

	//TODO: swap values with user information from a PHP function call
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
	

	closeButton.setAttribute("class", "closeButton");
	closeButton.textContent = ("X");
	closeButton.setAttribute("id", "closeButton");
	closeButton.addEventListener("click", closeModal, false);

	oldPassword.setAttribute("type", "password");
	oldPassword.setAttribute("placeholder", "Enter old password");
	oldPassword.setAttribute("id", "oldPassword");
	oldPassword.setAttribute("class", "modalInput");


	newPassword.setAttribute("type", "password");
	newPassword.setAttribute("placeholder", "Enter new password");
	newPassword.setAttribute("id", "newPassword");
	newPassword.setAttribute("class", "modalInput");
	newPassword.setAttribute("required", "true");

	confirmPassword.setAttribute("type", "password");
	confirmPassword.setAttribute("placeholder", "Confirm new password");
	confirmPassword.setAttribute("id", "confirmPassword");
	confirmPassword.setAttribute("class", "modalInput");
	confirmPassword.setAttribute("required", "true");

	
	okButton.setAttribute("type", "button");
	okButton.setAttribute("id", "changePass");
	okButton.setAttribute("value", "Change Password");
	okButton.setAttribute("class", "okButton");

	okButton.addEventListener("click", changePassword, false);

	innerContent.setAttribute("class", "modal-content");
	innerContent.setAttribute("id", "modalContent");

	innerContent.appendChild(closeButton);
	innerContent.appendChild(breakLine1);
	innerContent.appendChild(breakLine2);
	innerContent.appendChild(oldPassword);
	innerContent.appendChild(breakLine3);
	innerContent.appendChild(newPassword);
	innerContent.appendChild(breakLine4);
	innerContent.appendChild(confirmPassword);
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
	if(document.body.contains(document.getElementById("errorDiv"))){
		var child = document.getElementById("errorDiv");
		child.parentNode.removeChild(child);
	}
	var oldPassword = document.getElementById("oldPassword").value;
	var newPassword = document.getElementById("newPassword").value;
	var confirmPassword = document.getElementById("confirmPassword").value;
	var passwordChange = false;
	if(oldPassword == "" || newPassword == "" || confirmPassword == ""){
		passwordErrorMessage("All fields are required!");
		return false;
	}
	var correctPassword = checkPassword(CryptoJS.SHA256(oldPassword.value));
	if(correctPassword) {
		var pos = newPassword.search(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
		if (pos != 0) {
			passwordErrorMessage("Your new password length must be greater than or equal to 8. It must contain one or more uppercase characters. It must contain one or more lowercase characters. It must contain one or more numeric values. It must contain one or more special characters.");
			return false;
		}
		var passwordConfirm = validateConfirmPassword(confirmPassword, newPassword);
		if (!passwordConfirm) {
			passwordErrorMessage("Your new password and your confirm password do not match. Try again.");
			return false;
		}
		// TO DO swap value with passwordchange function
		passwordChange = true;
	} 
	else 
	{
		passwordErrorMessage("Please make sure your old password is entered correctly.");
		return false;
	}
	if (passwordChange) {
		var close = document.getElementById("closeButton");
		close.parentNode.parentNode.style.display = "none";
		
		//create a success message
		notificationMessage("Successmessage", "Success! Your password has been successfully changed!");		
		
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
		notificationMessage("Errormessage", "Error! You must fill in all fields before updating your account.");
		return false;
	}

	var emailForm = validEmailForm(document.getElementById("emailField"));
	if(!emailForm){
		notificationMessage("Errormessage", "Error! Please enter a valid email address.");
		return false;
	}
	
	var emailExists = validateEmail(document.getElementById("emailField"));
	if(emailExists){
		notificationMessage("Errormessage", "Error! The email you are trying to use already has an account.");
		return false;
	}
	
	
	var nameValidate = validateName(name);
	if(!nameValidate){
		notificationMessage("Errormessage", "Error! Please enter a correct name!");
		return false;
	}
	
	
	var schoolValidate = validateSchool(school);
	if(!schoolValidate){
		notificationMessage("Errormessage", "Error! Please enter a valid school! It must be completely spelled out with either University or College attached to the name.");
		return false;
	}
	
	name = titleCase(name);
	school = titleCase(school);
	
	// TO DO swap these values with a PHP function to update account
	var updatedAccount = true;

	if(updatedAccount == false) {
		notificationMessage("Errormessage", "Error! Couldn't update account. Try again later.");
	} else {
		
		notificationMessage("Successmessage", "Success! Your account has been successfully updated!");		
	}
	return updatedAccount;
}

function disableAccount (event) {
	
	var userAnswer = confirm("Are you sure you want to disable your account?");
	if(userAnswer == false){
		return false;
	}
	// TO DO swap with PHP function to disable account
	var disabledAccount = true;

	if (disabledAccount) {
		alert("Your account has been successfully disabled.");
		window.location.href="index.html";
		return true;
	} else {
		alert("Account could not be disabled, try again later.");
		return false;
	}

}

function displaySavedSearch () {

	var searchContainer = document.createElement("div");
	searchContainer.setAttribute("class", "fieldsContainer");
	var savedSearches = new Array(new Array());
	
	savedSearches = [["123", "Title", "Programming the World Wide Web"]];
	
	
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
	var Stype = values.match(/[A-Za-z]+/);
	var term = values.search(/: ([A-Za-z0-9]+)/);
	var subStr = values.substring(term+2);
	var queryString = "searchType=" + Stype + "&searchTerm=" + subStr;
	window.location.href="search.html"+ "?" + queryString;
	
}

function isEmpty(array) {
  return Array.isArray(array) && (array.length == 0 || array.every(isEmpty));
}

function notificationMessage(cssClass, message){
	
	var closebtn = document.createElement("span");
		var alertDiv = document.createElement("div");
		
		closebtn.setAttribute("class", "closeButton");
		closebtn.textContent = "X";
		closebtn.addEventListener("click", closeMsg, false);
		alertDiv.setAttribute("class", cssClass);
		alertDiv.textContent = message;
		
		alertDiv.appendChild(closebtn);
		document.getElementById("nav").insertAdjacentElement('afterend',alertDiv);
}

function passwordErrorMessage(message){
	
	var errorDiv = document.createElement("div");
	var errorMsg = document.createElement("p");
	
	errorDiv.setAttribute("id", "errorDiv");
	errorDiv.setAttribute("class", "errorArea");
	errorMsg.setAttribute("id", "errorMessage");
	errorMsg.setAttribute("class", "errorMsg");
	errorMsg.textContent = "Error changing password! " + message;

	errorDiv.appendChild(errorMsg);
	
	
	document.getElementById("confirmPassword").insertAdjacentElement("afterend", errorDiv);
}

function validEmailForm(el){
	var email = el.value;

	//first check if email is a valid email pattern
	var pos = email.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	if(pos != 0){
		return false;
	}
	return true;
}
function validateEmail(el){
	var email = el.value;
	
	
	//TODO: false needs to be changed with function call to PHP
	//to actually search in database and see if email already exists.
	var exists = false; 
	
	if(exists === true){
		return true;
	}
	else{
		return false;
	}
}

function validateName(name){
	var pos = name.search(/^[A-Za-z]+( [A-Za-z]+)*$/);
	if(pos != 0){
		return false;
	}
	return true;
}

function validateSchool(school){
	var pos = school.search(/[A-Za-z, ]*([Uu]niversity|[Cc]ollege)([A-Za-z]*,? ?)*/);
	if(pos != 0){
		return false;
	}
	return true;
}

function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   // Directly return the joined string
   return splitStr.join(' '); 
}