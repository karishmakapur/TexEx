//login.js

function validateEmail(event){
	var dom = event.currentTarget;
	var input = event.currentTarget.value;
	var pos = input.search(/^[a-z0-9]+@[a-z]+\.com$/);
	if(pos != 0){
		alert("Please enter a correct email");
		return false;
	}
	else{
		alert("You entered a correct email");
	}
	
}

function validatePassword(event){
	var dom = event.currentTarget;
	var input = event.currentTarget.value;
	//TODO: check password against username when database is created.
	//For now, we will allow user through.
	/*var pos = input.search(//);
	if(pos != 0){
		alert("Please enter a correct email");
	}
	else{
		alert("You entered a correct email");
	}*/
	return true;
}

function validateLogin(event){
	//process the information entered
	//maybe go through another set of checks
	//send user to search.html
	window.location.href="search.html";
}