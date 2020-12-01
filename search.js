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
	document.getElementById("formElem").insertAdjacentElement('afterend', searchResultContainer);
}

function displayResults(result){
		
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
		document.getElementById("formElem").insertAdjacentElement('afterend', searchResultContainer);
	
}

function displaySearch(){
	var url = window.location.href;
	queryString = url.search(/\?/);
	var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState({path:newurl},'',newurl);
	if(queryString != -1){
		var searchTypePos = url.search(/searchType=/);
		var searchTermPos = url.search(/&searchTerm=/);
		var searchType = url.substring(searchTypePos+11, searchTermPos);
		var searchTerm = url.substring(searchTermPos+12);
		searchTerm = searchTerm.replace(/%20/g, " ");
		
		document.getElementById("searchType").value = searchType;
		document.getElementById("searchBar").value = searchTerm;
		document.getElementById("saveSearch").checked = "true";
		var ev = document.createEvent("MouseEvent");
		ev.initMouseEvent('click', true, true, window, 0,0,0,0,0,false,false,false,false,0,null);
		document.getElementById("searchButton").click();
	}
	
	
}

function submitForm(){
	if(document.getElementById("saveSearch").checked){
		document.getElementById("saveSearch").value = "on";
	}
	else if(!document.getElementById("saveSearch").checked){
		document.getElementById("unsaveSearch").value = "on";
	}
	
	var ev = document.createEvent("MouseEvent");
	ev.initMouseEvent('click', true, true, window, 0,0,0,0,0,false,false,false,false,0,null);
	document.getElementById("searchButton").click();

}
function showSort(){
	document.getElementById("sortSearch").style.visibility = "visible";
}
function submitSort(){
	var ev = document.createEvent("MouseEvent");
	ev.initMouseEvent('click', true, true, window, 0,0,0,0,0,false,false,false,false,0,null);
	document.getElementById("searchButton").click();
}

 function deleteResults() { 
		while(document.body.contains(document.getElementById("resultsOfSearch"))) {
				var child = document.getElementById("resultsOfSearch");
				child.parentNode.removeChild(child);
		}   
 }