// common.js
// Collection of functions used within other scripts

// ++++++++++++++++++
// Define Functions +
// ++++++++++++++++++

// create a function to quickly select elements
function $e (element) {
	return document.querySelector(element);
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
