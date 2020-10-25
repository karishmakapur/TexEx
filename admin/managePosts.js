function searchPost(event){
	var searchTerm = document.getElementById("searchBar").value;
	var searchType = document.getElementById("searchType").value;
	
	deleteResults(); //clearing search results, if there are any
	if(searchTerm != ''){
				
		//send the search terms (searchTerm and searchType) to the PHP function
		//returned array will be stored in searched
		var searched = new Array(new Array());
		/*searched = [["12345", "", "Title 1", "Author 1", "ISBN #", "This is the post content. Contact me here."],
		["35633", "../Images/samplePic.svg", "Title 2", "Author 2", "ISBN #", "This is the post content"],
		["37569", "../Images/samplePic.svg","Title 3", "Author 3", "ISBN #", "This is the post content"],
		["78909", "","Title 4", "Author 4", "ISBN #", "This is the post content"]];*/
		
		//if there are results
		if(!isEmpty(searched)){
			showPosts(searched);
		}
		else{
			showNoPosts();
		}
	}
	else{
		displayResults();
	}
}


    
function displayResults(){
	// the array is hardcoded for now. The PHP function will return a 2D array of all posts in the database.
	var posts = new Array(new Array());
	/*posts =[["12345", "", "Title 1", "Author 1", "ISBN #", "This is the post content. Contact me here."],
	["35633", "../Images/samplePic.svg", "Title 2", "Author 2", "ISBN #", "This is the post content"],
	["37569", "../Images/samplePic.svg","Title 3", "Author 3", "ISBN #", "This is the post content"],
	["78909", "","Title 4", "Author 4", "ISBN #", "This is the post content"]];*/
	
	if (!isEmpty(posts)) {
		showPosts(posts);
	}	
	else {
		showNoPosts();
	}
} 

function showPosts(posts){
	//if there are results
	for(var i = posts.length-1; i >= 0; i--){
			
		var result = posts[i];
		
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
			result[1] = "../Images/no-image-icon.png";
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
		document.getElementById("searchBox").insertAdjacentElement('afterend', searchResultContainer);
			
	}
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
	resultContainer.append(searchResultContainer);
	document.getElementById("searchBox").insertAdjacentElement("afterend", resultContainer);
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

	//TODO: send variables to database from PHP function and delete user from database
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

 function deleteResults() { 
		while(document.contains(document.getElementById("searchBox").nextSibling)) {
				document.getElementById("searchBox").nextSibling.remove();
		}   
 }
	