//login.js
function encryptPass(){
	if(document.body.contains(document.getElementById("errorDiv"))){
		var node = document.getElementById("errorDiv");
		node.pareNode.removeChild(node);
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
		document.getElementById("errorDiv").remove();
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

function redirectToSearch(){
	window.location.href="search.php";
}