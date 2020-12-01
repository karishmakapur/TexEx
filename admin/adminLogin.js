//adminLogin.js

function validateLogin(){
	if(document.body.contains(document.getElementById("errorDiv"))){
		var child = document.getElementById("errorDiv");
		child.parentNode.removeChild(child);
	}
	//getting the values of the email and password fields
	var email = document.getElementById("emailField").value;
	
	//encryption algorithm. Script is defined in html.
	var pass = CryptoJS.SHA256(document.getElementById("passwordField").value);
	document.getElementById("passwordField").value = pass;
	
	return true;
}
function LoginErrorMessage(message){
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
	
	
	document.getElementById("passwordField").insertAdjacentElement("afterend", errorDiv);
}
function redirectToManageUsers(){
	window.location.href="manageUsers.php";
}