var domsearchButton = document.getElementById("searchButton");
var domsavesearch = document.getElementById("saveSearch");
var domSearchField = document.getElementById("searchBar");

domsearchButton.addEventListener("click",searchBook,false);
domsavesearch.addEventListener("change", saveSearch ,false);
domSearchField.addEventListener("keyup", searchBook, false);