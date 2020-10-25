//myPosts.js

function displayPosts(){

	//go to database for specified search criteria.
	//use searchInfo against searchOption and return results.
	//results will be a 2d array upon return.
	//results[0][0] will be first book image,
	//results[0][1] will be first book title,
	//results[0][2] will be first book authors,
	//results[0][3] will be first book ISBN,
	//results[0][4] will be first book description
	var results = new Array(new Array());

	//testing array for search with actual results. This will be changes to the return 2D array of a PHP function.
	//to test with no results, comment out the below line and run it.
	/*results = [
		["10", "","Book Number 1", "1234567890", "Karishma Kapur", "This is a book by Karishma Kapur. If you would like to purchase it, please contact me at (111)111-1111. Thank you."],
		["15", "Images/samplePic.svg","Book Number 2", "2345678901", "Peter Sharp", "This is a book by Peter Sharp. Contact me at (222)222-2222"],
		["20", "Images/samplePic.svg","Book Number 3", "3456789012", "Mike Trani", "Written by Mike Trani. Contact me for purchase! (333)-333-3333"]
	];*/

	//if there are no results
	if(isEmpty(results)){
		displayNoResults();
	}
	else{
		displayResults(results);

	}
}

function editPost(event){
	var id = this.id;
	var pos = id.search(/\d+/);
	var primaryKey = id.substring(pos,);

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
//TODO: swap out true for a PHP function call to edit post

	var id = this.id;
	var pos = id.search(/\d+/);
	var primaryKey = id.substring(pos,);

	var title = document.getElementById("titleInput" + primaryKey);
	var isbn = document.getElementById("isbnInput" + primaryKey);
	var author = document.getElementById("authorInput" + primaryKey);
	var desc = document.getElementById("descInput" + primaryKey);

	var newPost = new Array(4);
	newPost[0] = title.value;
	newPost[1] = author.value;
	newPost[2] = isbn.value;
	newPost[3] = desc.value;

	var successfulEdit = true;

	if (successfulEdit == true) {
		//Starting point for function that will allow the user to edit rows when the edit button calls this function

		var deleteButton = document.getElementById("deleteBtn" + primaryKey);
		deleteButton.style.visibility = "visible";

		var editButton = document.getElementById("editBtn" + primaryKey);
		editButton.style.visibility = "visible";

		var saveButton = document.getElementById("saveBtn" + primaryKey);
		saveButton.style.visibility = "hidden";

		title.setAttribute("disabled", "true");
		isbn.setAttribute("disabled", "true");
		author.setAttribute("disabled", "true");
		desc.setAttribute("disabled", "true");
	}
	else {
		alert("Could not edit post, please try again.")
	}
}

function deletePost(event){
	var id = this.id;
	var pos = id.search(/\d+/);
	var primaryKey = id.substring(pos,);

	//TODO: send primary key to database from PHP function and delete user from database
	//PHP function will return true or false
	var successfulDelete = true;

	if(successfulDelete == true) {
		var divToRemove = this.parentNode.parentNode;
		divToRemove.parentNode.removeChild(divToRemove);
	}
	else{
		alert("Error deleting the post!");
	}
}
 
function isEmpty(array) {
  return Array.isArray(array) && (array.length == 0 || array.every(isEmpty));
}

function displayResults(results){
	//if there are results
	for(var i = results.length-1; i >= 0; i--){
			
		var result = results[i];
		
		var searchResultContainer = document.createElement("div");
		var bookImage = document.createElement("img");
		var subDiv = document.createElement("div");
		var titleLabel = document.createElement("label");
		var titleInput = document.createElement("input");
		var authorLabel = document.createElement("label");
		var authorInput = document.createElement("input");
		var isbnLabel = document.createElement("label");
		var isbnInput = document.createElement("input");
		var breakLine = document.createElement("br");
		var descInput = document.createElement("textarea");
		var descLabel = document.createElement("p");
		var editButton = document.createElement("button");
		var deleteButton = document.createElement("button");
		var saveButton = document.createElement("button");
		var buttonDiv =  document.createElement("div");

		//inner most elements: input fields
		titleInput.setAttribute("type", "text");
		titleInput.setAttribute("id", "titleInput" + result[0]);
		titleInput.setAttribute("class", "row1");
		titleInput.setAttribute("disabled", "true");
		titleInput.setAttribute("value", result[2]);
		
		
		isbnInput.setAttribute("type", "text");
		isbnInput.setAttribute("id", "isbnInput" + result[0]);
		isbnInput.setAttribute("class", "row1");
		isbnInput.setAttribute("disabled", "true");
		isbnInput.setAttribute("value", result[3]);
		
		authorInput.setAttribute("type", "text");
		authorInput.setAttribute("id", "authorInput" + result[0]);
		authorInput.setAttribute("class", "row1");
		authorInput.setAttribute("disabled", "true");
		authorInput.setAttribute("value", result[4]);
		
		//surrounding input fields: labels
		titleLabel.setAttribute("class", "line");
		authorLabel.setAttribute("class", "line");
		isbnLabel.setAttribute("class", "line");
		
		//place input fields inside labels
		titleLabel.appendChild(titleInput);
		titleLabel.appendChild(document.createTextNode("Title"));
		isbnLabel.appendChild(isbnInput);
		isbnLabel.appendChild(document.createTextNode("ISBN"));
		authorLabel.appendChild(authorInput);
		authorLabel.appendChild(document.createTextNode("Author"));
		
		
		//other input field
		descInput.setAttribute("disabled", "true");
		descInput.setAttribute("id", "descInput" + result[0]);
		descInput.setAttribute("class", "row2");
		descInput.setAttribute("wrap", "hard");
		descInput.setAttribute("rows", "100");
		descInput.setAttribute("cols", "100");
		descInput.textContent = result[5];
		descLabel.setAttribute("class", "line2");
		descLabel.textContent = "Description/Contact Information";
		
		//place labels and input field inside subDiv
		subDiv.setAttribute("class", "innerDiv");
		subDiv.appendChild(titleLabel);
		subDiv.appendChild(authorLabel);
		subDiv.appendChild(isbnLabel);
		subDiv.appendChild(breakLine);
		subDiv.appendChild(descInput);
		subDiv.appendChild(descLabel);
		
		//image
		if(result[1] == ""){
			result[1] = "Images/no-image-icon.png";
		}
		bookImage.setAttribute("class", "bookPic");
		bookImage.setAttribute("src", result[1]);
		bookImage.setAttribute("alt", "Book Picture");

		//edit and delete buttons
		editButton.setAttribute("id", "editBtn" + result[0]);
		editButton.setAttribute("class", "myPostButton");
		editButton.textContent = "Edit";
		deleteButton.setAttribute("id", "deleteBtn" + result[0]);
		deleteButton.setAttribute("class", "myPostButton");
		deleteButton.textContent = "Delete";
		saveButton.setAttribute("id", "saveBtn" + result[0]);
		saveButton.setAttribute("class", "myPostButton");
		saveButton.style.visibility = "hidden";
		saveButton.textContent = "Save";
		editButton.addEventListener("click", editPost, false);
		deleteButton.addEventListener("click", deletePost, false);
		saveButton.addEventListener("click", savePost, false);
		buttonDiv.setAttribute("class", "divButton");
		buttonDiv.appendChild(editButton);
		buttonDiv.appendChild(deleteButton);
		buttonDiv.appendChild(saveButton);

		//place subDiv and image inside searchResultContainer
		searchResultContainer.setAttribute("id", "resultsOfSearch" + result[0]);
		searchResultContainer.setAttribute("class", "searchResult");
		searchResultContainer.appendChild(bookImage);
		searchResultContainer.appendChild(subDiv);
		searchResultContainer.appendChild(buttonDiv);
		
		//append searchResultContainer to end of document.
		document.getElementById("heading").insertAdjacentElement('afterend', searchResultContainer);
			
	}
}
function displayNoResults(){
	//create elements
	var searchResultContainer = document.createElement("div");
	var noResultsPara = document.createElement("p");
	
	//set paragraph
	noResultsPara.setAttribute("class", "noresults");
	noResultsPara.textContent = "You have no posts. Go to the sell page and make one!";
	
	//set div container
	searchResultContainer.setAttribute("id", "resultsOfSearch");
	searchResultContainer.setAttribute("class", "searchResult");
	
	//append para to div
	searchResultContainer.appendChild(noResultsPara);
	
	//add div to document.
	//append searchResultContainer to end of document.
	document.getElementById("heading").insertAdjacentElement('afterend', searchResultContainer);
}
