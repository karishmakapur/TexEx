function makePost(event){
	var title = document.getElementById("bookTitle").value;
	var author = document.getElementById("bookAuthor").value;
	var isbn = document.getElementById("bookISBN").value;
	var desc = document.getElementById("postArea").value;
	var file;
	var imageUploaded;
	if(document.getElementById("uploadImageButton").files.length == 0){
		file = "";
	}
	else{
		file = document.getElementById("uploadImageButton").files[0]; // FileList object
		imageUploaded = uploadImage(file);
	}
	
	//send these fields to a php function which will add the post 
	//to the database
	var saved = true;
	
	if(!saved){
		alert("Failed to upload post. Please try again.");
		return false;
	}
	else{
		//clear the fields
		document.getElementById("bookTitle").value = "";
		document.getElementById("bookAuthor").value = "";
		document.getElementById("bookISBN").value = "";
		document.getElementById("postArea").value = "";
		document.getElementById("uploadImageButton").value = "";
	}
	window.location.href="sell.html";
	return true;
	
}

function uploadImage(file){

	//send this path to the users database and save it.
	var path = "Images/" + file.name;
	
	var response = "200";
	//use the fetch method to upload an image on the server.
	/*var url = 'Images/';
	fetch(url, {
		method: 'POST',
		body: file,
	  }).then((response) => {
		console.log(response)
	  });*/
	  
	//call to php function to save image path on server
	var imageUploaded = true;
	if(response != "200" && imageUploaded == true){
		alert("Failed to upload image. Please try again.");
		return false;
	}
	return true;
	
	
	
}

function showPosts(){
	deleteResults();

	var results = new Array(new Array());

	//testing array for search with actual results. This will be changes to the return 2D array of a PHP function.
	//to test with no results, comment out the below line and run it.
	results = [
	["Images/Economics.PNG","Principles of Economics", "978-1305585126", "N. Gregory Mankiw", "This is an economics textbook. Contact me at (222)222-2222"],
	["Images/ProgrammingWeb.PNG","Programming the World Wide Web", "978-0133775983", "Robert W. Sebesta", "This is a web programming book. If you would like to purchase it, please contact me at (111)111-1111. Thank you."]
	];

	if(isEmpty(results)){
		displayNoResults();
	}
	else{
		displayResults(results);
	}
}

function displayNoResults(){
	//create elements
	var searchResultContainer = document.createElement("div");
	var noResultsPara = document.createElement("p");
	
	//set paragraph
	noResultsPara.setAttribute("class", "noresults");
	noResultsPara.textContent = "No one has made a post yet. Be the first!";
	
	//set div container
	searchResultContainer.setAttribute("id", "resultsOfSearch");
	searchResultContainer.setAttribute("class", "searchResult");
	
	//append para to div
	searchResultContainer.appendChild(noResultsPara);
	
	//add div to document.
	//append searchResultContainer to end of document.
	document.getElementById("sellBarWrapper").insertAdjacentElement('afterend', searchResultContainer);
}
function displayResults(results){
	//if there are results
	for(var i = results.length-1; i >= 0; i--){
			
		var result = results[i];
		
		var searchResultContainer = document.createElement("div");
		var bookImage = document.createElement("img");
		var titleLabel = document.createElement("label");
		var row1Div = document.createElement("div");
		var innerDiv = document.createElement("div");
		var titleInput = document.createElement("input");
		var authorLabel = document.createElement("label");
		var authorInput = document.createElement("input");
		var isbnLabel = document.createElement("label");
		var isbnInput = document.createElement("input");
		var breakLine = document.createElement("br");
		var descInput = document.createElement("textarea");
		var descLabel = document.createElement("p");
		
		//inner most elements: input fields
		titleInput.setAttribute("type", "text");
		titleInput.setAttribute("class", "row1");
		titleInput.setAttribute("disabled", "true");
		titleInput.setAttribute("value", result[1]);
		
		
		isbnInput.setAttribute("type", "text");
		isbnInput.setAttribute("class", "row1");
		isbnInput.setAttribute("disabled", "true");
		isbnInput.setAttribute("value", result[2]);
		
		authorInput.setAttribute("type", "text");
		authorInput.setAttribute("class", "row1");
		authorInput.setAttribute("disabled", "true");
		authorInput.setAttribute("value", result[3]);
		
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
		
		//place labels inside div
		row1Div.setAttribute("class", "rowOneDiv");
		row1Div.appendChild(titleLabel);
		row1Div.appendChild(authorLabel);
		row1Div.appendChild(isbnLabel);
		
		
		//other input field
		descInput.setAttribute("disabled", "true");
		descInput.setAttribute("class", "row2");
		descInput.setAttribute("wrap", "hard");
		descInput.setAttribute("rows", "100");
		descInput.setAttribute("cols", "100");
		descInput.textContent = result[4];
		descLabel.setAttribute("class", "line2");
		descLabel.textContent = "Description/Contact Information";
		
		innerDiv.setAttribute("class", "innerDiv");
		innerDiv.appendChild(row1Div);
		innerDiv.appendChild(breakLine);
		innerDiv.appendChild(descInput);
		innerDiv.appendChild(descLabel);
		
		//image
		if(result[0] == ""){
			result[0] = "Images/no-image-icon.png";
		}
		bookImage.setAttribute("class", "bookPic");
		bookImage.setAttribute("src", result[0]);
		bookImage.setAttribute("alt", "Book Picture");
		
		//place subDiv and image inside searchResultContainer
		searchResultContainer.setAttribute("id", "resultsOfSearch");
		searchResultContainer.setAttribute("class", "searchResult");
		
		searchResultContainer.appendChild(bookImage);
		searchResultContainer.appendChild(innerDiv);
		
		
		
		//append searchResultContainer to end of document.
		document.getElementById("sellBarWrapper").insertAdjacentElement('afterend', searchResultContainer);
			
	}
}
 
 function isEmpty(array) {
  return Array.isArray(array) && (array.length == 0 || array.every(isEmpty));
}

 function deleteResults() { 
		while(document.body.contains(document.getElementById("resultsOfSearch"))) {
				document.getElementById("resultsOfSearch").remove();
		}   
 }