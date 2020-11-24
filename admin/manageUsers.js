function searchUser(event){
	if(event.keyCode === 13){
		var searchTerm = document.getElementById("searchBox").value;
		
		while(document.getElementById("searchField").nextSibling){
			var child = document.getElementById("searchField").nextSibling;
			child.parentNode.removeChild(child);
		}
		if(searchTerm != ''){
			
			//send the search term to the PHP function.
			//PHP function should search regex for all posts that include letters provided.
			var searched = new Array(new Array());
			searched = [
			["9038","kapur004@cougars.csusm.edu", "Karishma Kapur", 0]
			];
			
			if(!isEmpty(searched)){
				showUsers(searched);
			}
			else{
				showNoUsers();
			}
		}
		else{
			displayUsers();
		}
	}
}

function lockUser(event){
	var id = this.id;
	var pos = id.search(/\d+/);
	var primaryKey = id.substring(pos);
	
	//TODO: send variables to database from PHP function and lock user from database
	//PHP function will return true or false. PHP function should determine if this
	//means lock or unlock the user.
    var successfulLock = true;
	
	if(!successfulLock){
		alert("Could not delete row. Please try again");
	}
}


function displayUsers(){
	//users array will be filled with PHP function that finds all users in the system and returns a 2d array with their primary
	//key and their name. PHP will also be responsible for sorting the array on the primary key value
	
	var users = new Array(new Array());
	users = [["1", "lopez816@cougars.csusm.edu", "Marcos Lopez", 0],
	["9038","kapur004@cougars.csusm.edu", "Karishma Kapur", 0]];

	if (!isEmpty(users)) {
		showUsers(users);
	}	
	else {
		showNoUsers();
	}
}  
function showUsers(users){
//if there are results
	for(var i = users.length-1; i >= 0; i--){
			
		var result = users[i];
		
		var searchResultContainer = document.createElement("div");
		var bookImage = document.createElement("img");
		var subDiv = document.createElement("div");
		var nameLabel = document.createElement("label");
		var nameInput = document.createElement("input");
		var emailLabel = document.createElement("label");
		var emailInput = document.createElement("input");
		var lockLabel = document.createElement("label");
		var lockInput = document.createElement("input");
		var breakLine = document.createElement("br");

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
		if(result[3] == true){
			lockInput.setAttribute("checked", "checked");
		}
		lockInput.setAttribute("class", "lockCheck");
		lockInput.addEventListener("change", lockUser, false);
		
		
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
		
		//append searchResultContainer to end of document.
		document.getElementById("searchField").insertAdjacentElement('afterend', searchResultContainer);
			
	}
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
	resultContainer.append(searchResultContainer);
	document.getElementById("searchField").insertAdjacentElement("afterend", resultContainer);
}
function isEmpty(array) {
	return Array.isArray(array) && (array.length == 0 || array.every(isEmpty));
}

