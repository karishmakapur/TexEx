//register.js

function invalidName(event){
	event.currentTarget.setCustomValidity("Please enter your full name!"); 
}
function enteringName(event){
	event.currentTarget.setCustomValidity(""); 
}
function enteringSchool(event){
	event.currentTarget.setCustomValidity(""); 
}
function enteringPass(event){
	event.currentTarget.setCustomValidity(""); 
}
function invalidSchool(event){
	event.currentTarget.setCustomValidity("Please enter a valid school name! It must be completely spelled out with either University or College attached to the name.");
}

function invalidPass(event){
	event.currentTarget.setCustomValidity("Please enter a correct password! The password length must be greater than or equal to 8. The password must contain one or more uppercase letters. The password must contain one or more lowercase letters. The password must contain one or more numeric values. The password must contain one or more special characters.");
}
function validateEmail(el){
	var dom = el;
	var input = el.value;
	var pos = input.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	
	if(pos != 0){
		AccountErrorMessage("Please enter a valid email address.");
		dom.focus();
		return false;
	}
	return true;
}
function validateConfirmPassword(entryTwo, original){
	if(entryTwo.value !== original.value){
		AccountErrorMessage("The passwords do not match. Please reenter your password.");
		entryTwo.focus();
		return false;
	}
	else{
		return true;
	}
}
function validateCreateAccount(){
	if(document.body.contains(document.getElementById("errorDiv"))){
		var child = document.getElementById("errorDiv");
		child.parentNode.removeChild(child);
	}
	//get all form elements
	var domNameField = document.getElementById("nameField");
	var domEmailField = document.getElementById("emailField");
	var domSchoolField = document.getElementById("schoolField");
	var domPasswordField = document.getElementById("passwordField");
	var domConfirmPasswordField = document.getElementById("confirmpasswordField");

	var name = titleCase(domNameField.value);
	var school = titleCase(domSchoolField.value);
	
	var emailValidated = validateEmail(domEmailField);
	if(emailValidated == false){
		return false;
	}
	var confirmPass = validateConfirmPassword(domConfirmPasswordField,domPasswordField);
	
	if(confirmPass == false){
		return false;
	}
	
	var pass = CryptoJS.SHA256(document.getElementById("passwordField").value);
	document.getElementById("passwordField").value = pass;
	
	return true;
}
function AccountErrorMessage(message){
	if(document.body.contains(document.getElementById("errorDiv"))){
		var child = document.getElementById("errorDiv");
		child.parentNode.removeChild(child);
	}
	var errorDiv = document.createElement("div");
	var errorMsg = document.createElement("p");
	
	errorDiv.setAttribute("id", "errorDiv");
	errorDiv.setAttribute("class", "errorArea");
	errorMsg.setAttribute("id", "errorMessage");
	errorMsg.setAttribute("class", "errorMsg");
	errorMsg.textContent = message;

	errorDiv.appendChild(errorMsg);
	
	
	document.getElementById("confirmpasswordField").insertAdjacentElement("afterend", errorDiv);
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

function redirectToSearch(){
	window.location.href="search.php";
}