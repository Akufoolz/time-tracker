// main.js

// create a function to quickly select elements
function $e (elem) {
	return document.querySelector(elem);
}

// +++++++++++++++
// Set Variables +
// +++++++++++++++

// get client height and width
var windowHeight = document.documentElement.clientHeight;
var windowWidth = document.documentElement.clientWidth;

// set divs into variables
var tableDiv = $e(".table"); 
var topDiv = $e(".top"); 
var tableHeaderDiv = $e(".table-header"); 
var bottomDiv = $e(".bottom");

// get the padding of the div.table
var tablePadding = (parseInt(getComputedStyle(tableDiv).paddingTop, 10) * 2);

// add top two div heights together
var topHeight = topDiv.clientHeight + tableHeaderDiv.clientHeight;

// ++++++++++++++++++
// Define Functions +
// ++++++++++++++++++

// sets height and width of the window
function getWindow() {
	windowHeight = document.documentElement.clientHeight;
	windowWidth = document.documentElement.clientWidth;
}

// set height to remaining space by subtracting the height of the top divs and bottom div from window height
function setTable() {
	tableDiv.style.height =  windowHeight - (topHeight + bottomDiv.clientHeight + tablePadding) + "px"; 
	tableDiv.style.width =  windowWidth - tablePadding + "px"; 
}

// resizes div.table when the browser is resized
function resizeTable() {
	getWindow();
	setTable();
	console.log("resized!");
}
/*
// trigger getWindow function on load
document.addEventListener('DOMContentLoaded', function() {
    getWindow;
}, false);
*/

getWindow();
setTable();
window.onresize = resizeTable; 
console.log(windowHeight + " x " + windowWidth);
