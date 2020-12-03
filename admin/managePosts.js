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
function searchPost(event){
	if(event.keyCode == 13 || event.type == "click"){
		var searchTerm = document.getElementById("searchBar").value;
		var searchType = document.getElementById("searchType").value;
		
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

function showPosts(result){

		var formElement = document.createElement("form");
		formElement.setAttribute("method", "post");
		var searchResultContainer = document.createElement("div");
		var bookImage = document.createElement("img");
		var subDiv = document.createElement("div");
		var titleLabel = document.createElement("label");
		var titleInput = document.createElement("input");
		var authorLabel = document.createElement("label");
		var authorInput = document.createElement("input");
		var isbnLabel = document.createElement("label");
		var isbnInput = document.createElement("input");
		var postMadeByLabel = document.createElement("label");
		var postMadeByInput = document.createElement("input");
		var breakLine = document.createElement("br");
		var descInput = document.createElement("textarea");
		var descLabel = document.createElement("p");
		var editButton = document.createElement("input");
		var deleteButton = document.createElement("input");
		var saveButton = document.createElement("input");
		var savePostButton = document.createElement("input");
		var buttonDiv =  document.createElement("div");

		//inner most elements: input fields
		postMadeByInput.setAttribute("type", "text");
		postMadeByInput.setAttribute("id", "postMadeByInput" + result[0]);
		postMadeByInput.setAttribute("name", "postMadeByInput" + result[0]);
		postMadeByInput.setAttribute("class", "row1");
		postMadeByInput.setAttribute("disabled", "true");
		postMadeByInput.setAttribute("value", result[1]);
		
		titleInput.setAttribute("type", "text");
		titleInput.setAttribute("id", "titleInput" + result[0]);
		titleInput.setAttribute("name", "titleInput" + result[0]);
		titleInput.setAttribute("class", "row1");
		titleInput.setAttribute("disabled", "true");
		titleInput.setAttribute("value", result[3]);
		titleInput.setAttribute("required", "required");
		titleInput.addEventListener('input', resetTextColor, false);
		
		
		isbnInput.setAttribute("type", "text");
		isbnInput.setAttribute("id", "isbnInput" + result[0]);
		isbnInput.setAttribute("name", "isbnInput" + result[0]);
		isbnInput.setAttribute("class", "row1");
		isbnInput.setAttribute("disabled", "true");
		isbnInput.setAttribute("value", result[4]);
		isbnInput.setAttribute("required", "required");
		isbnInput.addEventListener('input', resetTextColor, false);
		
		authorInput.setAttribute("type", "text");
		authorInput.setAttribute("id", "authorInput" + result[0]);
		authorInput.setAttribute("name", "authorInput" + result[0]);
		authorInput.setAttribute("class", "row1");
		authorInput.setAttribute("disabled", "true");
		authorInput.setAttribute("value", result[5]);
		authorInput.setAttribute("required", "required");
		authorInput.addEventListener('input', resetTextColor, false);
		
		//surrounding input fields: labels
		titleLabel.setAttribute("class", "line");
		authorLabel.setAttribute("class", "line");
		isbnLabel.setAttribute("class", "line");
		postMadeByLabel.setAttribute("class", "line");
		
		
		//place input fields inside labels
		titleLabel.appendChild(titleInput);
		titleLabel.appendChild(document.createTextNode("Title"));
		isbnLabel.appendChild(isbnInput);
		isbnLabel.appendChild(document.createTextNode("ISBN"));
		authorLabel.appendChild(authorInput);
		authorLabel.appendChild(document.createTextNode("Author"));
		postMadeByLabel.appendChild(postMadeByInput);
		postMadeByLabel.appendChild(document.createTextNode("Post Made By"));
		
		
		//other input field
		descInput.setAttribute("disabled", "true");
		descInput.setAttribute("id", "descInput" + result[0]);
		descInput.setAttribute("name", "descInput" + result[0]);
		descInput.setAttribute("class", "row2");
		descInput.setAttribute("wrap", "hard");
		descInput.setAttribute("rows", "100");
		descInput.setAttribute("cols", "100");
		descInput.textContent = result[6];
		descLabel.setAttribute("class", "line2");
		descLabel.textContent = "Description/Contact Information";
		descInput.setAttribute("required", "required");
		descInput.addEventListener('input', resetTextColor, false);
		
		
		//place labels and input field inside subDiv
		subDiv.setAttribute("class", "innerDiv");
		subDiv.appendChild(titleLabel);
		subDiv.appendChild(authorLabel);
		subDiv.appendChild(isbnLabel);
		subDiv.appendChild(postMadeByLabel);
		subDiv.appendChild(breakLine);
		subDiv.appendChild(descInput);
		subDiv.appendChild(descLabel);
		
		//image
		if(result[2] == ""){
			result[2] = "Images/no-image-icon.png";
		}
		result[2] = '../' + result[2];
		
		bookImage.setAttribute("class", "bookPic");
		bookImage.setAttribute("src", result[2]);
		bookImage.setAttribute("alt", "Book Picture");

		//edit and delete buttons
		savePostButton.setAttribute("type", "submit");
		savePostButton.style.visibility = "hidden";
		savePostButton.setAttribute("id", "savePostBttn" + result[0]);
		savePostButton.setAttribute("name", "savePostBttn" + result[0]);
		editButton.setAttribute("id", "editBtn" + result[0]);
		editButton.setAttribute("name", "editBtn" + result[0]);
		editButton.setAttribute("class", "myPostButton");
		editButton.setAttribute("type", "button");
		editButton.setAttribute("value", "Edit");
		deleteButton.setAttribute("id", "deleteBtn" + result[0]);
		deleteButton.setAttribute("name", "deleteBtn" + result[0]);
		deleteButton.setAttribute("class", "myPostButton");
		deleteButton.setAttribute("type", "submit");
		deleteButton.setAttribute("value", "Delete");
		saveButton.setAttribute("id", "saveBtn" + result[0]);
		saveButton.setAttribute("name", "saveBtn" + result[0]);
		saveButton.setAttribute("class", "myPostButton");
		saveButton.style.visibility = "hidden";
		saveButton.setAttribute("value", "Save");		
		saveButton.setAttribute("type", "button");
		editButton.addEventListener("click", editPost, false);
		deleteButton.addEventListener("click", deletePost, false);
		saveButton.addEventListener("click", savePost, false);
		buttonDiv.setAttribute("class", "divButton");
		buttonDiv.appendChild(editButton);
		buttonDiv.appendChild(deleteButton);
		buttonDiv.appendChild(saveButton);
		buttonDiv.appendChild(savePostButton);

		//place subDiv and image inside searchResultContainer
		searchResultContainer.setAttribute("id", "resultsOfSearch" + result[0]);
		searchResultContainer.setAttribute("name", "resultsOfSearch" + result[0]);
		searchResultContainer.setAttribute("class", "searchResult");
		searchResultContainer.appendChild(bookImage);
		searchResultContainer.appendChild(subDiv);
		searchResultContainer.appendChild(buttonDiv);
		formElement.appendChild(searchResultContainer);
		//append searchResultContainer to end of document.
		document.getElementById("formElem").insertAdjacentElement('afterend', formElement);
}
function showNoPosts(){
	//create elements
	var resultContainer = document.createElement("div");
	resultContainer.setAttribute("id", "resultCon");
	resultContainer.setAttribute("class", "resultContainer");
	var searchResultContainer = document.createElement("div");
	var noResultsPara = document.createElement("p");
	
	//set paragraph
	noResultsPara.setAttribute("class", "noresults");
	noResultsPara.textContent = "No posts have been made!";
	
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


function editPost(event){
	var id = this.id;
	var pos = id.search(/\d+/);
	var primaryKey = id.substring(pos);

	var em = document.getElementById("postMadeByInput" + primaryKey).value;
	
	var queryString = "key=" + primaryKey + "&email=" + em;
	var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + queryString;
    window.history.pushState({path:newurl},'',newurl);
	
	//Starting point for function that will allow the user to edit rows when the edit button calls this function

	var deleteButton = document.getElementById("deleteBtn"+primaryKey);
	deleteButton.style.visibility= "hidden";

	var editButton = this;
	editButton.style.visibility= "hidden";

	var saveButton = document.getElementById("saveBtn"+primaryKey);
	saveButton.style.visibility = "visible";

	var title = document.getElementById("titleInput"+primaryKey);
	var isbn = document.getElementById("isbnInput"+primaryKey);
	var author = document.getElementById("authorInput"+primaryKey);
	var desc = document.getElementById("descInput"+primaryKey);

	title.removeAttribute("disabled");
	isbn.removeAttribute("disabled");
	author.removeAttribute("disabled");
	desc.removeAttribute("disabled");
}

function savePost(event) {
	var id = this.id;
	var pos = id.search(/\d+/);
	var primaryKey = id.substring(pos);

	var title = document.getElementById("titleInput" + primaryKey);
	var isbn = document.getElementById("isbnInput" + primaryKey);
	var author = document.getElementById("authorInput" + primaryKey);
	var desc = document.getElementById("descInput" + primaryKey);

	if(!title.validity.valid || title.value == "Please fill out this field."){
		title.value = "Please fill out this field."
		title.style.color = "red";
		return false;
	}
	else{
		title.style.color = "black";
	}
	if(!author.validity.valid || author.value == "Please fill out this field."){
		author.value = "Please fill out this field."
		author.style.color = "red";
		return false;
	}
	else{
		author.style.color = "black";
	}
	if(!isbn.validity.valid || isbn.value == "Please fill out this field."){
		isbn.value = "Please fill out this field."
		isbn.style.color = "red";
		return false;
	}
	else{
		isbn.style.color = "black";
	}
	if(!desc.validity.valid || desc.value == "Please fill out this field."){
		desc.value = "Please fill out this field."
		desc.style.color = "red";
		return false;
	}
	else{
		desc.style.color = "black";
	}
	
	var ev = document.createEvent("MouseEvent");
	ev.initMouseEvent('click', true, true, window, 0,0,0,0,0,false,false,false,false,0,null);
	document.getElementById("savePostBttn" + primaryKey).click();
}

function deletePost(event){
	var id = this.id;
	var pos = id.search(/\d+/);
	var primaryKey = id.substring(pos);
	var em = document.getElementById("postMadeByInput" + primaryKey).value;

	var queryString = "key=" + primaryKey + "&email=" + em;
	var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + queryString;
    window.history.pushState({path:newurl},'',newurl);
}
 
 
function isEmpty(array) {
	return Array.isArray(array) && (array.length == 0 || array.every(isEmpty));
}

 function deleteResults() { 
		while(document.body.contains(document.getElementById("formElem").nextSibling)) {
				var child = document.getElementById("formElem").nextSibling;
				child.parentNode.removeChild(child);
		}   
 }
function resetTextColor(event){
	event.currentTarget.style.color = "black";
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