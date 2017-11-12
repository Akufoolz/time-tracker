// common.js
// Collection of functions used within other scripts

// ++++++++++++++++++
// Define Functions +
// ++++++++++++++++++

// create a function to quickly select elements
function $e (elem) {
	return document.querySelector(elem);
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
