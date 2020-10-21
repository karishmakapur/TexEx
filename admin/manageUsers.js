function deleteRow (){
    var row = this.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }
      
  function createTable(){
    var users = [["User 1"], ["User 2"], ["User 3"], ["User 4"], ["User 5"]];
  
    var table = document.getElementById('uTable');
    var tbody = document.createElement("tbody");
    
    for (var j = 0; j < users.length ; j++) { 
      var u = users[j];

      var row = document.createElement('tr');

      var countCell = document.createElement('td');
      countCell.textContent = j+1;
      row.appendChild(countCell);

      var cell = document.createElement('td');
      cell.textContent = u;
      row.appendChild(cell);
      
      var del = document.createElement("button");
  
      del.addEventListener("click", deleteRow, false);
      del.textContent = "Delete";
      
      var buttonCell = document.createElement('td');
      buttonCell.appendChild(del); 
      row.appendChild(buttonCell);

      tbody.appendChild(row); // append the row to the body of the table
    }
    table.appendChild(tbody); // append the table body to the table
  }   
