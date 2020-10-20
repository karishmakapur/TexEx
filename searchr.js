var domsearchButton = document.getElementById("searchButton");
var domsavesearch = document.getElementById("saveSearch");

domsearchButton.addEventListener("click",searchBook,false);
domsavesearch.addEventListener("change", saveSearch ,false);