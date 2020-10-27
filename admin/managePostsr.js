var domSearchButton = document.getElementById("searchButton");
var domSearchField = document.getElementById("searchBar");

domSearchButton.addEventListener("click", searchPost, false);
domSearchField.addEventListener("keyup",searchPost, false);