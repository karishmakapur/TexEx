function message(message){
	if(document.body.contains(document.getElementById("errorDiv"))){
		document.getElementById("errorDiv").remove();
	}
	var errorDiv = document.createElement("div");
	var errorMsg = document.createElement("p");
	
	errorDiv.setAttribute("id", "errorDiv");
	errorDiv.setAttribute("class", "errorArea");
	errorMsg.setAttribute("id", "errorMessage");
	errorMsg.setAttribute("class", "errorMsg");
	errorMsg.textContent = message;

	errorDiv.appendChild(errorMsg);
	
	
	document.getElementById("emailField").insertAdjacentElement("afterend", errorDiv);
}
function getRandomInt(n) {
  return Math.floor(Math.random() * n);
}
function shuffle(s) {
  var arr = s.split('');           // Convert String to array
  var n = arr.length;              // Length of the array
  
  for(var i=0 ; i<n-1 ; ++i) {
    var j = getRandomInt(n);       // Get random of [0, n-1]
    
    var temp = arr[i];             // Swap arr[i] and arr[j]
    arr[i] = arr[j];
    arr[j] = temp;
  }
  
  s = arr.join('');                // Convert Array to string
  return s;                        // Return shuffled string
}
function generate_password(chars){
	var data = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz';
	var shuffleStr =  shuffle(data).substring(0, chars);
	document.getElementById("pass").value = shuffleStr;
	
	var encrypt = CryptoJS.SHA256(shuffleStr);
	document.getElementById("encryptpass").value = encrypt;
	var ev = document.createEvent("MouseEvent");
	ev.initMouseEvent('click', true, true, window, 0,0,0,0,0,false,false,false,false,0,null);
	document.getElementById("loginButton").click();
}