// main.js

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

// set height to remaining space by subtracting the height of the top divs and bottom div from window height
function setTable() {
	// set divs into variables
	var tableDiv = $e(".table"); 
	var topDiv = $e(".top"); 
	var tableHeaderDiv = $e(".table-header"); 
	var bottomDiv = $e(".bottom");

	// get the padding of the div.table
	//var tablePadding = (parseInt(getComputedStyle(tableDiv).paddingTop, 10)) + (parseInt(getComputedStyle(tableDiv).paddingBottom, 10));
	var tablePadding = 32;
	// add top two div heights together
	var topHeight = topDiv.clientHeight + tableHeaderDiv.clientHeight;
	
	// set div.table width and height
	tableDiv.style.height =  getWindow().height - (topHeight + bottomDiv.clientHeight + tablePadding) + "px"; 
	tableDiv.style.width =  getWindow().width - tablePadding + "px"; 
}

// resizes div.table when the browser is resized
function resizeTable() {
	getWindow();
	setTable();
	console.log("resized!");
}

// main program loop

function main() {
	getWindow();
	setTable();
	console.log(getWindow().height + " x " + getWindow().width);
}

// ++++++++++++++++++
// Define Functions +
// ++++++++++++++++++

main();
window.onresize = resizeTable; 
