function searchUser(event){
	var searchTerm = document.getElementById("searchBox").value;
	
	
	document.getElementById("resultsTable").remove();
	if(searchTerm != ''){
		
		//send the search term to the PHP function.
		//PHP function should search regex for all posts that include letters provided.
		var searched = new Array(new Array());
		/*searched = [["1", "Marcos Lopez"], 
		["245", "Arianna Camino"], 
		["2345", "Pascual Sebastian"], 
		["5234", "Ben Gonzalez"], 
		["9038", "Karishma Kapur"]];*/
		
		if(!isEmpty(searched)){
			showUsers(searched);
		}
		else{
			showNoUsers();
		}
	}
	else{
		createTable();
	}
}
function changeHeading(event){
	//TODO: replace this string with the current users name
	//need to get logged in users name
	var username = "billy";
	var heading = document.getElementById("welcomeMessage");
	heading.innerHTML="Welcome back " + username + "!";
}
function lockUser (){
	var id = this.id;
	var pos = id.search(/\d+/);
	var primaryKey = id.substring(pos,);
	
	//TODO: send variables to database from PHP function and lock user from database
	//PHP function will return true or false
    var successfulLock = true;
	
	if(!successfulLock){
		alert("Could not delete row. Please try again");
	}
}


function createTable(){
	//users array will be filled with PHP function that finds all users in the system and returns a 2d array with their primary
	//key and their name. PHP will also be responsible for sorting the array on the primary key value
	
	var users = new Array(new Array());
	/*users = [["1", "Marcos Lopez", "unlocked"], 
	["245", "Arianna Camino", "locked"], 
	["2345", "Pascual Sebastian", "unlocked"], 
	["5234", "Ben Gonzalez", "locked"], 
	["9038", "Karishma Kapur", "unlocked"]];*/

	if (!isEmpty(users)) {
		showUsers(users);
	}	
	else {
		showNoUsers();
	}
}  
function showUsers(users){
	var table = document.createElement('table');
	table.setAttribute("aria-label", "Admin Manage Users Table");
	table.setAttribute("id", "resultsTable");
	var cap = document.createElement("caption");
	cap.textContent = "Manage Users";
	table.appendChild(cap);

	var head = document.createElement("thead");
	var row1 = document.createElement("tr");

	var heading1 = document.createElement("th");
	heading1.setAttribute("scope", "col");

	var heading2 = document.createElement("th");
	heading2.setAttribute("scope", "col");
	heading2.textContent = "User";

	var heading3 = document.createElement("th");
	heading3.setAttribute("scope", "col");
	heading3.textContent = "Locked?";

	row1.appendChild(heading1);
	row1.appendChild(heading2);
	row1.appendChild(heading3);

	head.appendChild(row1);

	table.appendChild(head);

	var tbody = document.createElement("tbody");

	for (var j = 0; j < users.length ; j++) { 
	var user = users[j];

	var row = document.createElement('tr');
	row.setAttribute("id", "row"+user[0]); //id of each row will be set to  row + primary key

	var countCell = document.createElement('td');	
	countCell.textContent = j+1;
	row.appendChild(countCell);

	var cell = document.createElement('td');
	cell.textContent = user[1];
	row.appendChild(cell);
	
	
	var del = document.createElement("input");
	del.setAttribute("type", "checkbox");
	if(user[2] == "locked"){
		del.setAttribute("checked", "true");
	}
	
	del.setAttribute("class", "lockCheck");
	del.setAttribute("id", "row"+user[0]);


	del.addEventListener("change", lockUser, false);


	var buttonCell = document.createElement('td');
	buttonCell.appendChild(del); 
	row.appendChild(buttonCell);

	tbody.appendChild(row); // append the row to the body of the table

	}
	table.appendChild(tbody); // append the table body to the table
	document.getElementById("tableCon").insertAdjacentElement('beforeend', table);
}
function showNoUsers(){
	var table = document.createElement('table');
	table.setAttribute("aria-label", "Admin Manage Users Table");
	table.setAttribute("id", "resultsTable");
	var cap = document.createElement("caption");
	cap.textContent = "Manage Users";
	table.appendChild(cap);

	var head = document.createElement("thead");
	var row1 = document.createElement("tr");

	var heading1 = document.createElement("th");
	heading1.setAttribute("scope", "col");

	row1.appendChild(heading1);

	head.appendChild(row1);

	table.appendChild(head);


	var tbody = document.createElement("tbody");
	var messageCell = document.createElement('td');
	messageCell.textContent = "There are no users"; // display message to the admin that there are no users
	messageCell.style.fontSize = "40pt";
	tbody.appendChild(messageCell);

	table.appendChild(tbody); // append the table body to the table
	document.getElementById("tableCon").insertAdjacentElement('beforeend', table);
}
function isEmpty(array) {
	return Array.isArray(array) && (array.length == 0 || array.every(isEmpty));
}
