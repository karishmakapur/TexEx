function message(message){
	if(document.contains(document.getElementById("errorDiv"))){
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
	
	
	document.getElementById("emailField").insertAdjacentElement("afterend", errorDiv);
}