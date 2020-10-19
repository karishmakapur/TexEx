//register.js

function validateName(event){
	var dom = event.currentTarget;
	var input = event.currentTarget.value;
	var pos = input.search(/^[A-Z]{1}[a-z]+( [A-Z]{1}[a-z]+)*$/);
	if(pos != 0){
		alert("Please enter a correct name!\nYour first name must start with a capital letter.\nIf you provide your last name, or any other names, they must also begin with a capital letter.");
		document.getElementById("nameField").focus();
		return false;
	}
	else{
		alert("You entered a correct name!");
		return true;
	}
	
}
function validateEmail(event){
	var dom = event.currentTarget;
	var input = event.currentTarget.value;
	var pos = input.search(/^[a-z0-9]+@[a-z]+\.com$/);
	if(pos != 0){
		alert("Please enter a correct email");
		document.getElementById("emailField").focus();
		return false;
	}
	else{
		alert("You entered a correct email");
		return true;
	}
}
function validateSchool(event){
	var dom = event.currentTarget;
	var input = event.currentTarget.value;
	var pos = input.search(/^[A-Z]{1}[a-z]+( [A-Z]{1}[a-z]+)*$/);
	if(pos != 0){
		alert("Please enter a correct school name!\nIt must be completely spelled out.");
		document.getElementById("schoolField").focus();
		return false;
	}
	else{
		alert("You entered a correct school name!");
		return true;
	}
}
function validatePassword(event){
	var dom = event.currentTarget;
	var input = event.currentTarget.value;
	var pos = input.search(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
	if(pos != 0){
		alert("Please enter a correct password!\nThe password length must be greater than or equal to 8.\nThe password must contain one or more uppercase characters.\nThe password must contain one or more lowercase characters.\nThe password must contain one or more numeric values.\nThe password must contain one or more special characters.");
		document.getElementById("passwordField").focus();
		return false;
	}
	else{
		alert("You entered a correct password!");
		return true;
	}
	
	
}
function validateConfirmPassword(event){
	var dom = event.currentTarget;
	var input = event.currentTarget.value;
	var pos = input.search(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
	if(pos != 0){
		alert("Please enter a correct password!\nThe password length must be greater than or equal to 8.\nThe password must contain one or more uppercase characters.\nThe password must contain one or more lowercase characters.\nThe password must contain one or more numeric values.\nThe password must contain one or more special characters.");
		document.getElementById("confirmpasswordField").focus();
		return false;
	}
	pos = document.getElementById("passwordField").search(input);
	if(pos != 0){
		alert("The passwords do not match");
		document.getElementById("confirmpasswordField").focus();
		return false;
	}
	else{
		alert("You entered a correct password!");
		return true;
	}
}
function validateCreateAccount(event){
	//process the information entered
	//maybe go through another set of checks
	//send user to search.html
	window.location.href="search.html";
	return true;
}