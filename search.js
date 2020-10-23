function searchBook(event){
	
	deleteResults(); //clearing search results, if there are any
	
	var searchOption = document.getElementById("searchType").value;
	
	var searchInfo = document.getElementById("searchBar").value;
	
	//go to database for specified search criteria.
	//use searchInfo against searchOption and return results.
	//results will be a 2d array upon return.
	//results[0][0] will be first book image, 
	//results[0][1] will be first book title, 
	//results[0][2] will be first book authors, 
	//results[0][3] will be first book ISBN, 
	//results[0][4] will be first book description, 
	var results = new Array(new Array());
	
	//testing array for search with actual results. This will be changes to the return 2D array of a PHP function.
	//to test with no results, comment out the below line and run it.
	results = [
	["","Book Number 1", "1234567890", "Karishma Kapur", "This is a book by Karishma Kapur. If you would like to purchase it, please contact me at (111)111-1111. Thank you."],
	["","Book Number 2", "2345678901", "Peter Sharp", "This is a book by Peter Sharp. Contact me at (222)222-2222"],
	["Images/samplePic.svg","Book Number 3", "3456789012", "Mike Trani", "Written by Mike Trani. Contact me for purchase! (333)-333-3333"]
	];
	
	//if there are no results
	if(isEmpty(results)){
		displayNoResults();
	}
	else{
		displayResults(results);
		
	}
}

function saveSearch(event){
	//TODO: swap out true for a PHP function call to save the search
	//the PHP function will return a boolean - true if successful; false if not.
	
	if(event.currentTarget.checked){
		var saved = true;
		
		if(saved === false){
			alert("Error saving your search. Please try again");
		}
	}
}

 function deleteResults() { 
		while(document.contains(document.getElementById("resultsOfSearch"))) {
				document.getElementById("resultsOfSearch").remove();
		}   
 }
 
 function isEmpty(array) {
  return Array.isArray(array) && (array.length == 0 || array.every(isEmpty));
}

function displayNoResults(){
	//create elements
	var searchResultContainer = document.createElement("div");
	var noResultsPara = document.createElement("p");
	
	//set paragraph
	noResultsPara.setAttribute("class", "noresults");
	noResultsPara.textContent = "No results! Try another search term.";
	
	//set div container
	searchResultContainer.setAttribute("id", "resultsOfSearch");
	searchResultContainer.setAttribute("class", "searchResult");
	
	//append para to div
	searchResultContainer.appendChild(noResultsPara);
	
	//add div to document.
	//append searchResultContainer to end of document.
	document.getElementById("searchWrapper").insertAdjacentElement('afterend', searchResultContainer);
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
		document.getElementById("searchWrapper").insertAdjacentElement('afterend', searchResultContainer);
			
	}
}
	
