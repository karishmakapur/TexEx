//register.js

function invalidName(event){
	event.currentTarget.setCustomValidity("Please enter a correct name! Your first name must start with a capital letter. If you provide your last name, or any other names, they must also begin with a capital letter."); 
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
	event.currentTarget.setCustomValidity("Please enter a correct school name! It must be completely spelled out.");
}

function invalidPass(event){
	event.currentTarget.setCustomValidity("Please enter a correct password! The password length must be greater than or equal to 8. The password must contain one or more uppercase characters. The password must contain one or more lowercase characters. The password must contain one or more numeric values. The password must contain one or more special characters.");
}
function validateEmail(el){
	var dom = el;
	var input = el.value;
	
	//TODO: false needs to be changed with function call to PHP
	//to actually search in database and see if email already exists.
	var exists = false; 
	
	if(exists === true){
		alert("This email already has an account!");
		dom.focus();
		return false;
	}
	else{
		return true;
	}
}
function validateConfirmPassword(entryTwo, original){
	if(entryTwo.value !== original.value){
		alert("The passwords do not match. Please reenter your password.");
		entryTwo.focus();
		return false;
	}
	else{
		return true;
	}
}
function validateCreateAccount(){
	//get all form elements
	var domNameField = document.getElementById("nameField");
	var domEmailField = document.getElementById("emailField");
	var domSchoolField = document.getElementById("schoolField");
	var domPasswordField = document.getElementById("passwordField");
	var domConfirmPasswordField = document.getElementById("confirmpasswordField");

	var emailValidated = validateEmail(domEmailField);
	var confirmPass = validateConfirmPassword(domConfirmPasswordField,domPasswordField);
	var addedToDatabase = false;
	var pass = CryptoJS.SHA256(domPasswordField.value);
	console.log(pass);
	if(emailValidated === true && confirmPass === true){
		//TODO: replace true with a PHP function
		//send all the fields to the database by calling a PHP function and passing the fields	
		addedToDatabase = true;
	}
	return addedToDatabase;
}