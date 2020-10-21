function deleteRow (){
  var row = this.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
    
function saveRow(){
// This function should allow the edited infromation in the row to be saved
// there should be a save button that appears after the user clicks the edit button
}

function editRow(){
//Starting point for function that will allow the user to edit rows when the edit button calls this function
/*
  var editButton = document.createElement("button").addEventListener("click", saveRow, false);
  

  var par = this.parentNode.parentNode;
  var tdTitle = par.children("td:nth-child(2)");
  var tdAuthor = par.children("td:nth-child(3)");
  var tdISBN = par.children("td:nth-child(4)");
  tdTitle.html("<input type='text' id='txtName' value='" + tdTitle.html() + "'/>");
  tdAuthor.html("<input type='text' id='txtPhone' value='" + tdAuthor.html() + "'/>");
  tdISBN.html("<input type='text' id='txtEmail' value='" + tdISBN.html() + "'/>");
*/
}
    
function createTable(){
  // the array is hardcoded for now
  var posts =[["Title 1", "Author 1", "ISBN #"],["Title 2", "Author 2", "ISBN #"],["Title 3", "Author 3", "ISBN #"],["Title 4", "Author 4", "ISBN #"]];
 
  var table = document.getElementById('pTable');
  var tbody = document.createElement("tbody");
  
  // this for loop displays the contents of the array along with a counter and buttons for editing and deleting rows
  for (var j = 0; j < posts.length ; j++) { 
    var p = posts[j];
    var row = document.createElement('tr');
    var countCell = document.createElement('td');
    countCell.textContent = j+1;
    row.appendChild(countCell); // append the counter to the start of the row

    for (var k = 0; k < p.length; k++) {
    var cell = document.createElement('td');
    cell.textContent = p[k];
    row.appendChild(cell);
    }
    
    var del = document.createElement("button");
    var edt = document.createElement("button");

    del.addEventListener("click", deleteRow, false);
    del.textContent = "Delete";

    edt.addEventListener("click", editRow, false);
    edt.textContent = "Edit";
    
    var buttonCell = document.createElement('td');
    buttonCell.appendChild(del); 
    buttonCell.appendChild(edt);
    row.appendChild(buttonCell); // append the buttons to the row 

    tbody.appendChild(row); // append the row to the body of the table
  }
  table.appendChild(tbody); // append the table body to the table
}   
