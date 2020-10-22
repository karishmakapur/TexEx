function sellBook(event){

}

function uploadImage(event){

}

function showPosts(event){
  //var searchInfo = document.getElementById("searchBar").value;
	//console.log(searchInfo);

  var results = new Array(new Array());

	//testing array for search with actual results. This will be changes to the return 2D array of a PHP function.
	//to test with no results, comment out the below line and run it.
	results = [
	["Images/samplePic.svg","Book Number 1", "1234567890", "Karishma Kapur", "This is a book by Karishma Kapur. If you would like to purchase it, please contact me at (111)111-1111. Thank you."],
	["Images/samplePic.svg","Book Number 2", "2345678901", "Peter Sharp", "This is a book by Peter Sharp. Contact me at (222)222-2222"],
	["Images/samplePic.svg","Book Number 3", "3456789012", "Mike Trani", "Written by Mike Trani. Contact me for purchase! (333)-333-3333"]
	];

  if(isEmpty(results)){
		displayNoResults();
	}
	else{
		displayResults(results);
	}
}

function displayResults(results){
	//if there are results
	for(var i = results.length-1; i >= 0; i++){

		var result = results[i];
		//console.log("result is", result);

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


		//other input field
		descInput.setAttribute("disabled", "true");
		descInput.setAttribute("class", "row2");
		descInput.setAttribute("wrap", "hard");
		descInput.setAttribute("rows", "100");
		descInput.setAttribute("cols", "100");
		descInput.textContent = result[4];
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
		bookImage.setAttribute("class", "bookPic");
		bookImage.setAttribute("src", result[0]);
		bookImage.setAttribute("alt", "Book Picture");

		//place subDiv and image inside searchResultContainer
		//searchResultContainer.setAttribute("id", "resultsOfSearch");
		//searchResultContainer.setAttribute("class", "searchResult");
		//searchResultContainer.appendChild(bookImage);
		//searchResultContainer.appendChild(subDiv);

		//append searchResultContainer to end of document.
		//document.getElementById("searchWrapper").insertAdjacentElement('afterend', searchResultContainer);

	}
}
