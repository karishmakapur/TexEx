// accountInfo.js

function displayAccount (userInfo) {

	var name = document.getElementById("nameField");
	var email = document.getElementById("emailField");
	var school = document.getElementById("schoolField");

	name.setAttribute("value", userInfo[0]);
	email.setAttribute("value", userInfo[1]);
	school.setAttribute("value", userInfo[2]);
}
function forceOpenModal(){
	var ev = document.createEvent("MouseEvent");
	ev.initMouseEvent('click', true, true, window, 0,0,0,0,0,false,false,false,false,0,null);
	document.getElementById("updatePasswordButton").click();
	
}
function openModal (event) {
	
	var dom = event.currentTarget;
	var formElement = document.createElement("form");
	formElement.setAttribute("method", "post");
	var closeButton = document.createElement("span");
	var oldPassword = document.createElement("input");
	var newPassword = document.createElement("input");
	var confirmPassword = document.createElement("input");
	var okButton = document.createElement("input");
	var submitButton = document.createElement("input");
	submitButton.setAttribute("type", "submit");
	submitButton.style.visibility = "hidden";
	submitButton.setAttribute("id", "submitBttn");
	submitButton.setAttribute("name", "submitBttn");
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

	oldPassword.setAttribute("type", "password");
	oldPassword.setAttribute("placeholder", "Enter old password");
	oldPassword.setAttribute("id", "oldPassword");
	oldPassword.setAttribute("name", "oldPassword");
	oldPassword.setAttribute("class", "modalInput");


	newPassword.setAttribute("type", "password");
	newPassword.setAttribute("placeholder", "Enter new password");
	newPassword.setAttribute("id", "newPassword");
	newPassword.setAttribute("name", "newPassword");
	newPassword.setAttribute("class", "modalInput");
	newPassword.setAttribute("required", "true");

	confirmPassword.setAttribute("type", "password");
	confirmPassword.setAttribute("placeholder", "Confirm new password");
	confirmPassword.setAttribute("id", "confirmPassword");
	confirmPassword.setAttribute("name", "confirmPassword");
	confirmPassword.setAttribute("class", "modalInput");
	confirmPassword.setAttribute("required", "true");

	
	okButton.setAttribute("type", "button");
	okButton.setAttribute("id", "changePass");
	okButton.setAttribute("name", "changePass");
	okButton.setAttribute("value", "Change Password");
	okButton.setAttribute("class", "okButton");

	okButton.addEventListener("click", validateFields, false);

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
	innerContent.appendChild(breakLine5);
	innerContent.appendChild(submitButton);
	modal.appendChild(innerContent);
	modal.style.display = "block";
	modal.setAttribute("class", "modalStyle");
	formElement.appendChild(modal);
	document.getElementById("fieldsContainer").insertAdjacentElement('afterend', formElement);

}

function closeModal (event) {
	var close = event.currentTarget;
	close.parentNode.parentNode.style.display = "none";

}

function closeMsg (event) {
	var close = event.currentTarget;
	close.parentNode.style.display = "none";

}

function validateFields(event) {
	if(document.body.contains(document.getElementById("errorDiv"))){
		var child = document.getElementById("errorDiv");
		child.parentNode.removeChild(child);
	}
	var oldPassword = document.getElementById("oldPassword").value;
	var newPassword = document.getElementById("newPassword").value;
	var confirmPassword = document.getElementById("confirmPassword").value;
	if(oldPassword == "" || newPassword == "" || confirmPassword == ""){
		passwordErrorMessage("All fields are required!");
		return false;
	}
	
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
	
	var encryptedPass = CryptoJS.SHA256(document.getElementById("oldPassword").value);
	document.getElementById("oldPassword").value = encryptedPass;
	var encryptedNewPass = CryptoJS.SHA256(document.getElementById("newPassword").value);
	document.getElementById("newPassword").value = encryptedNewPass;	
	var encryptedConfirmPass = CryptoJS.SHA256(document.getElementById("confirmPassword").value);
	document.getElementById("confirmPassword").value = encryptedConfirmPass;
	var ev = document.createEvent("MouseEvent");
	ev.initMouseEvent('click', true, true, window, 0,0,0,0,0,false,false,false,false,0,null);
	document.getElementById("submitBttn").click();
	
	return true;
	
}

function validateConfirmPassword(entryTwo, original){
	if(entryTwo !== original){
		return false;
	}
	return true;
}

function updateAccount (event) {

	var name = document.getElementById("nameField").value;
	var email = document.getElementById("emailField").value;
	var school = document.getElementById("schoolField").value;
	
	if(name == "" || email == "" || school == ""){
		//create a error message
		clearMessage();
		notificationMessage("Errormessage", "Error! You must fill in all fields before updating your account.");
		return false;
	}

	var emailForm = validEmailForm(document.getElementById("emailField"));
	if(!emailForm){
		clearMessage();
		notificationMessage("Errormessage", "Error! Please enter a valid email address.");
		return false;
	}
	
	var emailExists = validateEmail(document.getElementById("emailField"));
	if(emailExists){
		clearMessage();
		notificationMessage("Errormessage", "Error! The email you are trying to use already has an account.");
		return false;
	}
	
	
	var nameValidate = validateName(name);
	if(!nameValidate){
		clearMessage();
		notificationMessage("Errormessage", "Error! Please enter your full name!");
		return false;
	}
	
	
	var schoolValidate = validateSchool(school);
	if(!schoolValidate){
		clearMessage();
		notificationMessage("Errormessage", "Error! Please enter a valid school! It must be completely spelled out with either University or College attached to the name.");
		return false;
	}
	
	name = titleCase(name);
	school = titleCase(school);
	
	var ev = document.createEvent("MouseEvent");
	ev.initMouseEvent('click', true, true, window, 0,0,0,0,0,false,false,false,false,0,null);
	document.getElementById("submitButton").click();
	return true;
}

function disableAccount (event) {
	
	var userAnswer = confirm("Are you sure you want to disable your account?");
	if(userAnswer == false){
		event.preventDefault();
		return false;
	}
	
	
	var ev = document.createEvent("MouseEvent");
	ev.initMouseEvent('click', true, true, window, 0,0,0,0,0,false,false,false,false,0,null);
	document.getElementById("disableButton").click();
	return true;
	

}
function noSavedSearches(){
	var searchContainer = document.createElement("div");
	searchContainer.setAttribute("class", "fieldsContainer");
	var list = document.createElement("input");
	list.setAttribute("type", "text");
	list.setAttribute("id", "NoSearch");
	list.setAttribute("readonly", "readonly");
	list.setAttribute("value", "No Saved Searches!");
	list.setAttribute("class", "searchContainer");
	searchContainer.appendChild(list);
	document.getElementById("searches").appendChild(searchContainer);

}

function displaySavedSearch (searches) {

	var searchContainer = document.createElement("div");
	searchContainer.setAttribute("class", "fieldsContainer");
	
	for(var i = 0; i < searches.length; i++){
		var search = searches[i];
		
		var list = document.createElement("input");
		list.setAttribute("type", "text");
		list.setAttribute("id", "search"+search[0]);
		list.setAttribute("readonly", "readonly");
		list.setAttribute("value", search[1] + ": " + search[2]);
		list.setAttribute("class", "searchContainer");
		list.addEventListener("click", redirectSearch, false);
		
		
		searchContainer.appendChild(list);
	}
	
		document.getElementById("searches").appendChild(searchContainer);
}

function redirectSearch(event){
	var dom = event.currentTarget;
	var values = dom.value;
	var Stype = values.match(/[A-Za-z]+/);
	var term = values.search(/: ([A-Za-z0-9]+)/);
	var subStr = "";
    if(term != -1){
		subStr = values.substring(term+2);
	}
	var queryString = "searchType=" + Stype + "&searchTerm=" + subStr;
	window.location.href="search.php"+ "?" + queryString;
	
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
		alertDiv.setAttribute("id", "message");
		document.getElementById("nav").insertAdjacentElement('afterend',alertDiv);
}
function clearMessage(){
	if(document.body.contains(document.getElementById("message"))){
		var child = document.getElementById("message");
		child.parentNode.removeChild(child);
	}
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
	var pos = name.search(/^[A-Za-z]+( [A-Za-z]+)+$/);
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

function removeQueryString(){
	var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState({path:newurl},'',newurl);
}