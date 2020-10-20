//registerr.js


var domNameField = document.getElementById("nameField");
var domSchoolField = document.getElementById("schoolField");
var domPasswordField = document.getElementById("passwordField");

domNameField.addEventListener("invalid", invalidName, false);
domNameField.addEventListener("input", enteringName, false);

domSchoolField.addEventListener("invalid", invalidSchool, false);
domSchoolField.addEventListener("input", enteringSchool, false);

domPasswordField.addEventListener("invalid", invalidPass, false);
domPasswordField.addEventListener("input", enteringPass, false);


