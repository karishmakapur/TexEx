function notificationMessage(cssClass, message){
	
	var closebtn = document.createElement("span");
		var alertDiv = document.createElement("div");
		
		closebtn.setAttribute("class", "closeButton");
		closebtn.textContent = "X";
		closebtn.addEventListener("click", closeMsg, false);
		alertDiv.setAttribute("class", cssClass);
		alertDiv.textContent = message;
		
		alertDiv.appendChild(closebtn);
		document.getElementById("nav").insertAdjacentElement('afterend',alertDiv);
}
function closeMsg (event) {
	var close = event.currentTarget;
	close.parentNode.style.display = "none";

}
function searchUser(event){
	if(event.keyCode == 13 || event.type == "click"){
		var searchTerm = document.getElementById("searchBox").value;
		
		if(searchTerm == ''){
			return false;
		}
		else{
			
			var ev = document.createEvent("MouseEvent");
			ev.initMouseEvent('click', true, true, window, 0,0,0,0,0,false,false,false,false,0,null);
			document.getElementById("searchButton").click();
		}
	
	}
}
function clearResults() { 
		while(document.body.contains(document.getElementById("formElem").nextSibling)) {
				var child = document.getElementById("formElem").nextSibling;
				child.parentNode.removeChild(child);
		} 
 }
function lockUser(event){
	var id = this.id;
	var pos = id.search(/\d+/);
	var primaryKey = id.substring(pos);
	var lockedVal = "";
	if(document.getElementById("lock" + primaryKey).checked){
		document.getElementById("lock" + primaryKey).value = "on";
		document.getElementById("unlock" + primaryKey).value = "off";
		lockedVal = "on";
	}
	else if(!document.getElementById("lock" + primaryKey).checked){
		document.getElementById("unlock" + primaryKey).value = "on";
		document.getElementById("lock" + primaryKey).value = "off";
		lockedVal = "off";
	}
	
	var queryString = "key=" + primaryKey + "&locked=" + lockedVal;
	var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + queryString;
    window.history.pushState({path:newurl},'',newurl);
	
	var ev = document.createEvent("MouseEvent");
	ev.initMouseEvent('click', true, true, window, 0,0,0,0,0,false,false,false,false,0,null);
	document.getElementById("submitBtn" + primaryKey).click();
	
}


function showUsers(result){
		var formElem = document.createElement("form");
		formElem.setAttribute("method", "post");
		var searchResultContainer = document.createElement("div");
		var bookImage = document.createElement("img");
		var subDiv = document.createElement("div");
		var nameLabel = document.createElement("label");
		var nameInput = document.createElement("input");
		var emailLabel = document.createElement("label");
		var emailInput = document.createElement("input");
		var lockLabel = document.createElement("label");
		var lockInput = document.createElement("input");
		var unlockInput = document.createElement("input");
		var breakLine = document.createElement("br");
		var submitBttn = document.createElement("input");
		submitBttn.setAttribute("type", "submit");
		submitBttn.style.visibility = "hidden";
		submitBttn.setAttribute("id", "submitBtn" + result[0]);
		submitBttn.setAttribute("name", "submitBtn" + result[0]);

		//inner most elements: input fields
		nameInput.setAttribute("type", "text");
		nameInput.setAttribute("id", "userName" + result[0]);
		nameInput.setAttribute("class", "row1");
		nameInput.setAttribute("disabled", "true");
		nameInput.setAttribute("value", result[2]);
		
		emailInput.setAttribute("type", "text");
		emailInput.setAttribute("id", "userEmail" + result[0]);
		emailInput.setAttribute("class", "row1");
		emailInput.setAttribute("disabled", "true");
		emailInput.setAttribute("value", result[1]);
		
		lockInput.setAttribute("type", "checkbox");
		lockInput.setAttribute("id", "lock" + result[0]);
		lockInput.setAttribute("name", "lock" + result[0]);
		if(result[3] == true){
			lockInput.setAttribute("checked", "checked");
		}
		lockInput.setAttribute("class", "lockCheck");
		lockInput.addEventListener("click", lockUser, false);
		
		unlockInput.setAttribute("type", "hidden");
		unlockInput.setAttribute("id", "unlock" + result[0]);
		unlockInput.setAttribute("name", "unlock" + result[0]);
		
		//surrounding input fields: labels
		nameLabel.setAttribute("class", "userline");
		lockLabel.setAttribute("class", "userline");
		emailLabel.setAttribute("class", "userline");
		
		//place input fields inside labels
		nameLabel.appendChild(nameInput);
		nameLabel.appendChild(document.createTextNode("User's Name"));
		emailLabel.appendChild(emailInput);
		emailLabel.appendChild(document.createTextNode("User's Email"));
		lockLabel.appendChild(lockInput);
		lockLabel.appendChild(document.createTextNode("Account Locked?"));
		
		
		//place labels and input field inside subDiv
		subDiv.setAttribute("class", "usersInnerDiv");
		subDiv.appendChild(nameLabel);
		subDiv.appendChild(emailLabel);
		subDiv.appendChild(lockLabel);
		
		//place subDiv and image inside searchResultContainer
		searchResultContainer.setAttribute("id", "resultsOfSearch" + result[0]);
		searchResultContainer.setAttribute("class", "searchResult");
		searchResultContainer.appendChild(bookImage);
		searchResultContainer.appendChild(subDiv);
		searchResultContainer.appendChild(unlockInput);
		searchResultContainer.appendChild(submitBttn);
		formElem.appendChild(searchResultContainer);
		//append searchResultContainer to end of document.
		document.getElementById("formElem").insertAdjacentElement('afterend', formElem);
			
	
}
function showNoUsers(){
	//create elements
	var resultContainer = document.createElement("div");
	resultContainer.setAttribute("id", "resultCon");
	resultContainer.setAttribute("class", "resultContainer");
	var searchResultContainer = document.createElement("div");
	var noResultsPara = document.createElement("p");
	
	//set paragraph
	noResultsPara.setAttribute("class", "noresults");
	noResultsPara.textContent = "There are no users!";
	
	//set div container
	searchResultContainer.setAttribute("id", "resultsOfSearch");
	searchResultContainer.setAttribute("class", "searchResult");
	
	//append para to div
	searchResultContainer.appendChild(noResultsPara);
	
	//add div to document.
	//append searchResultContainer to end of document.
	resultContainer.appendChild(searchResultContainer);
	document.getElementById("formElem").insertAdjacentElement("afterend", resultContainer);
}
function isEmpty(array) {
	return Array.isArray(array) && (array.length == 0 || array.every(isEmpty));
}
function submitSort(){
	var ev = document.createEvent("MouseEvent");
	ev.initMouseEvent('click', true, true, window, 0,0,0,0,0,false,false,false,false,0,null);
	document.getElementById("searchButton").click();
}
function removeQueryString(){
	var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState({path:newurl},'',newurl);
}
