//login.js
function validateLogin(){
	if(document.contains(document.getElementById("errorDiv"))){
		document.getElementById("errorDiv").remove();
	}
	//getting the values of the email and password fields
	var email = document.getElementById("emailField").value;
	
	//encryption algorithm. Script is defined in html.
	var pass = CryptoJS.SHA256(document.getElementById("passwordField").value);
	
	
	//TODO: this true value needs to be replaced with the call to php function
	//Send the email and encrypted pass to the php
	//php will check email against email and encrypted pass against stored pass
	var validated = true;
	
	if(validated == false){
		LoginErrorMessage("An account with that email address and password does not exist. Try again.");
		return false;
	}

	//TODO: PHP function - first check if user is disabled
	var disabled = false;
	if(disabled == true){
		LoginErrorMessage("Your account has been disabled. You are no longer able to access it.");
		return false;
	}
	
	//TODO: PHP function - check if user is locked. If yes, then 
	//they can contact company to unlock.
	var locked = false;
	if(locked == true){
		LoginErrorMessage("Your account has been locked. Contact TexEx at (760)000-0000 for further assistance.");
		return false;
	}
	
	
	
	return validated;

}

function LoginErrorMessage(message){
	
	var errorDiv = document.createElement("div");
	var errorMsg = document.createElement("p");
	
	errorDiv.setAttribute("id", "errorDiv");
	errorDiv.setAttribute("class", "errorArea");
	errorMsg.setAttribute("id", "errorMessage");
	errorMsg.setAttribute("class", "errorMsg");
	errorMsg.textContent = message;

	errorDiv.appendChild(errorMsg);
	
	
	document.getElementById("passwordField").insertAdjacentElement("afterend", errorDiv);
}