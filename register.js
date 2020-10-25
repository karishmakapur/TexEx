//register.js

function invalidName(event){
	event.currentTarget.setCustomValidity("Please enter a correct name!"); 
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

	var name = titleCase(domNameField.value);
	var school = titleCase(domSchoolField.value);
	
	var emailValidated = validateEmail(domEmailField);
	var confirmPass = validateConfirmPassword(domConfirmPasswordField,domPasswordField);
	var addedToDatabase = false;
	var pass = CryptoJS.SHA256(domPasswordField.value);
	if(emailValidated === true && confirmPass === true){
		//TODO: replace true with a PHP function
		//send all the fields to the database by calling a PHP function and passing the fields	
		addedToDatabase = true;
	}
	return addedToDatabase;
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