
function searchBook(event){
	var searchOption = document.getElementById("searchType").value;
	console.log(searchOption);
	
	var searchInfo = document.getElementById("searchBar").value;
	console.log(searchInfo);
	
	//go to database for specified search criteria.
	//use searchInfo against searchOption and return results.
	//results will be a 2d array upon return.
	//results[0][0] will be first book image, 
	//results[0][1] will be first book title, 
	//results[0][2] will be first book authors, 
	//results[0][3] will be first book ISBN, 
	//results[0][4] will be first book description, 
	var results = new Array(new Array());
	//if no results, say no results
	results = [["image","title", "isbn", "author", "desc"],["image","title", "isbn", "author", "desc"],["image","title", "isbn", "author", "desc"]];
	//the following code is for no results.
	if(results.length == 0){
		var div = document.createElement("div");
		div.innerHTML = '<div id="results"> <p> No results </p> </div>';
		
		document.getElementById("searchForm").insertAdjacentHTML('afterend', '<br />');
		div.style.margin = "auto";
		div.style.position = "relative";
		div.style.top = "100px";
		div.style.textAlign = "center";
		div.style.border = "2px solid red";
		document.getElementById("searchForm").insertAdjacentElement('afterend', div);
	}
	else{
		for(var i = 0; i < results.length; i++){
				
				var result = results[i];
				console.log("result is", result);
				var div = document.createElement("div");
				var img = document.createElement("img");
				var innerDiv = document.createElement("div");
				var titlePara = document.createElement("p");
				var ISBNPara = document.createElement("p");
				var authorPara = document.createElement("p");
				var descPara = document.createElement("p");
				
				div.innerHTML = '<div id="results"></div>';
				img.className = "bookPic";
				img.setAttribute("src","Images/samplePic.svg"); //this will be the image results[i][0]
				img.setAttribute("alt", "Book Picture");
				img.setAttribute("width", "100");
				img.setAttribute("height", "100");
				
				innerDiv.innerHTML = '<div id="BookInfo"/></div>';
				
				titlePara.className = "textarea";
				titlePara.innerHTML = result[1] + "&nbsp;<br/>";
				ISBNPara.className = "textarea";
				ISBNPara.innerHTML = result[2] + "&nbsp;<br/>";
				authorPara.className = "textarea";
				authorPara.innerHTML = result[3] + "&nbsp;<br/>";
				descPara.className = "textarea";
				descPara.innerHTML = result[4] + "&nbsp;<br/>";
				
				
				innerDiv.appendChild(titlePara);
				innerDiv.appendChild(ISBNPara);
				innerDiv.appendChild(authorPara);
				innerDiv.appendChild(descPara);
				
				
				div.className = "searchResult";
				
				div.appendChild(img);
				insertAfter(innerDiv, img);
			
				document.getElementById("searchForm").insertAdjacentElement('afterend', div);

		}
		
	}
}

function saveSearch(event){
	
}

function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}