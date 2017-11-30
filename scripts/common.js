// common.js
// Collection of functions used within other scripts

// ++++++++++++++++++
// Define Functions +
// ++++++++++++++++++

// create a function to quickly select elements
function $e (element) {
	return document.querySelector(element);
}

// create a helper function to quickly set localStorage items
function $set(name, value) {
	return localStorage.setItem(name, value);
}

// create a helper function to quickly get localStorage items
function $get(name, value) {
	return localStorage.getItem(name);
}

// sets height and width of the window
function getWindow() {
	// get client height and width
	var windowHeight = document.documentElement.clientHeight;
	var windowWidth = document.documentElement.clientWidth;
	return {height: windowHeight, width: windowWidth};
}

// returns height and width of the body
function getBody() {
	var bodyTag = $e("body");
	return {height: bodyTag.clientHeight, width: bodyTag.clientWidth};
}

// returns the current date as a string
function getCurrentDate() {
	var today = new Date();
	return today.toDateString();
}

// function that checkes a string for a specific character
function checkChar (str, cha) {
	return str.indexOf(cha);
}

// function at adds a character to a string at a defined location and returns the new string
function addCharToString (str, cha, index) {
	var str1 = str.slice(0, index);
	var str2 = str.slice(index, str.length);
	var newString = str1 + cha + str2;
	return newString;
}

// function to remove element of event target
function removeClickedElement(e) {
	e.target.remove();
}
