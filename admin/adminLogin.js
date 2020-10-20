//adminLogin.js

function validateLogin(){
	//getting the values of the email and password fields
	var email = document.getElementById("emailField").value;
	
	//encryption algorithm. Script is defined in html.
	var pass = CryptoJS.SHA256(document.getElementById("passwordField").value);
	
	console.log(email);
	console.log(pass.toString());
	
	//TODO: this true value needs to be replaced with the call to php function
	//Send the email and encrypted pass to the php
	//php will check email against email and encrypted pass against stored pass
	var validated = true;
	return validated;
}