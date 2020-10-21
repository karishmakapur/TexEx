function changeHeading(event){
	//TODO: replace this string with the current users name
	//need to get logged in users name
	var username = "billy";
	var heading = document.getElementById("welcomeMessage");
	heading.innerHTML="Welcome back " + username + "!";
}

function deleteRow (){
	var id = this.id;
	var pos = id.search(/\d+/);
	var primaryKey = id.substring(pos,);
	console.log(primaryKey);
	
	//TODO: send variables to database from PHP function and delete user from database
	//PHP function will return true or false
    var successfulDelete = true;
	
	if(successfulDelete){
		//deleting the row from view
		var row = this.parentNode.parentNode;
		row.parentNode.removeChild(row);
	}
	else{
		alert("Could not delete row. Please try again");
	}
}
    
function saveRow(){
	// This function should allow the edited infromation in the row to be saved
	// there should be a save button that appears after the user clicks the edit button

	var id = this.id;
	var pos = id.search(/\d+/);
	var primaryKey = id.substring(pos,);
	
	//get new content
	var row = this.parentNode.parentNode;
	var newPost = new Array(4);
	
	var j = 0;
	for(var i = 1; i < row.childNodes.length-1;i++){
		newPost[j] = row.childNodes[i].childNodes[0].value;
		j++;
	}
	
	console.log(newPost);
	
	//TODO: send array newPost to database from PHP function 
	//and edit post in database
	//PHP function will return true or false depending if it was successful
    var successfulEdit = true;
	
	if(successfulEdit){
		var deleteButton = document.getElementById("deleteButton"+primaryKey);
		deleteButton.style.visibility= "visible";
		
		var editButton = document.getElementById("editButton"+primaryKey);;
		editButton.style.visibility= "visible";
		
		var saveButton = document.getElementById("saveButton"+primaryKey);
		saveButton.style.visibility = "hidden";
		
		for(var i = 1; i < row.childNodes.length-1;i++){
		console.log(row.childNodes[i].childNodes[0]);
		row.childNodes[i].childNodes[0].setAttribute("disabled", "true");
	}
	}
	else{
		alert("Could not edit row. Please try again");
	}
}

function editRow(){
	
	var id = this.id;
	var pos = id.search(/\d+/);
	var primaryKey = id.substring(pos,);
	console.log(primaryKey);
	
	//Starting point for function that will allow the user to edit rows when the edit button calls this function
	
	var deleteButton = document.getElementById("deleteButton"+primaryKey);
	deleteButton.style.visibility= "hidden";
	
	var editButton = this;
	editButton.style.visibility= "hidden";
	
	var saveButton = document.getElementById("saveButton"+primaryKey);
	saveButton.style.visibility = "visible";
	
	var row = this.parentNode.parentNode;
	console.log(row);
	for(var i = 1; i < row.childNodes.length-1;i++){
		console.log(row.childNodes[i].childNodes[0]);
		row.childNodes[i].childNodes[0].removeAttribute("disabled");
	}
}
    
function createTable(){
	// the array is hardcoded for now
	var posts =[["12345", "Title 1", "Author 1", "ISBN #", "This is the post content. Contact me here."],["35633","Title 2", "Author 2", "ISBN #", "This is the post content"],["37569","Title 3", "Author 3", "ISBN #", "This is the post content"],["78909","Title 4", "Author 4", "ISBN #", "This is the post content"]];
 
  
    var table = document.createElement('table');
	table.setAttribute("aria-label", "Admin Manage Posts Table");
	var cap = document.createElement("caption");
	cap.textContent = "Manage Posts";
	table.appendChild(cap);
	
	var head = document.createElement("thead");
	var row1 = document.createElement("tr");
	
	var heading1 = document.createElement("th");
	heading1.setAttribute("id", "cornerHeading");
	heading1.setAttribute("scope", "col");
	
	var heading2 = document.createElement("th");
	heading2.setAttribute("id", "titleHeading");
	heading2.setAttribute("scope", "col");
	heading2.textContent = "Title";
	
	var heading3 = document.createElement("th");
	heading3.setAttribute("id", "authorHeading");
	heading3.setAttribute("scope", "col");
	heading3.textContent = "Author";
	
	var heading4 = document.createElement("th");
	heading4.setAttribute("id", "isbnHeading");
	heading4.setAttribute("scope", "col");
	heading4.textContent = "ISBN";
	
	var heading5 = document.createElement("th");
	heading5.setAttribute("id", "descriptionHeading");
	heading5.setAttribute("scope", "col");
	heading5.textContent = "Description";
	
	var heading6 = document.createElement("th");
	heading6.setAttribute("id", "actionHeading");
	heading6.setAttribute("scope", "col");
	heading6.textContent = "Action";
	
	row1.appendChild(heading1);
	row1.appendChild(heading2);
	row1.appendChild(heading3);
	row1.appendChild(heading4);
	row1.appendChild(heading5);
	row1.appendChild(heading6);
	
	head.appendChild(row1);
	
	table.appendChild(head);
  var tbody = document.createElement("tbody");
  
  // this for loop displays the contents of the array along with a counter and buttons for editing and deleting rows
  for (var j = 0; j < posts.length ; j++) { 
    post = posts[j];
    var row = document.createElement('tr');
	row.setAttribute("id", "row"+post[0]);
    var countCell = document.createElement('td');
    countCell.textContent = j+1;
    row.appendChild(countCell); // append the counter to the start of the row

    for (var k = 1; k < post.length-1; k++) {
		var cell = document.createElement('td');
		var inputField = document.createElement('input');
		inputField.setAttribute("input", "text");
		inputField.setAttribute("disabled", "true");
		inputField.style.overflow = "auto";
		inputField.style.borderRadius = "10px";
		inputField.style.border = "none";
		inputField.style.height = "40%";
		inputField.style.width="90%";
		inputField.value = post[k];
		cell.appendChild(inputField);
		row.appendChild(cell);
    }
	
	var cell = document.createElement('td');
	var inputField = document.createElement('textarea');
	inputField.setAttribute("disabled", "true");
	inputField.style.overflow = "auto";
	inputField.style.borderRadius = "10px";
	inputField.style.height = "40%";
	inputField.style.width="90%";
	inputField.style.border = "none";
	inputField.value = post[k];
	cell.appendChild(inputField);
	row.appendChild(cell);
	
    
  var del = document.createElement("button");
  del.setAttribute("class", "deleteButton");
  del.setAttribute("id", "deleteButton"+post[0]);
  console.log(del.id);
  del.textContent = "Delete";
  
  var edt = document.createElement("button");
  edt.setAttribute("class", "deleteButton");
  edt.setAttribute("id", "editButton"+post[0]);
  console.log(edt.id);
  edt.textContent = "Edit";
  
  var save = document.createElement("button");
  save.setAttribute("class", "deleteButton");
	save.setAttribute("id", "saveButton"+post[0]);
	console.log(save.id);
	save.textContent = "Save";
	save.style.visibility = "hidden";
	save.setAttribute("contenteditable", "false");

  del.addEventListener("click", deleteRow, false);

  edt.addEventListener("click", editRow, false);
  save.addEventListener("click", saveRow, false);
    
    var buttonCell = document.createElement('td');
    buttonCell.appendChild(del); 
    buttonCell.appendChild(edt);
	 buttonCell.appendChild(save);
    row.appendChild(buttonCell); // append the buttons to the row 

    tbody.appendChild(row); // append the row to the body of the table
  }
  table.appendChild(tbody); // append the table body to the table
  document.getElementById("tableCon").insertAdjacentElement('beforeend', table);
}   