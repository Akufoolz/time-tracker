// main.js
// main javascript file used like a main function

// ++++++++
// Events +
// ++++++++

// calculate total hours at load
document.body.addEventListener("load", function(e) {
	calcDataRows();
	calcTotalHours();
}, true);

// calculate total hours anytime a input cell has focus
document.body.addEventListener("focusin", function(e) {
	if(e.target.className === "text-box") {
		calcDataRows();
		calcTotalHours();
	}
}, true);

// calculate total hours anytime a input cell loses focus
document.body.addEventListener("focusout", function(e) {
	if(e.target.className === "text-box") {
		calcDataRows();
		calcTotalHours();
		checkTime(e.target);
	}
}, true);

// deletes row when icon is clicked, and recalculates totals
document.body.addEventListener("click", function(e) {
	if (e.target.textContent == "remove_circle"){
		//deleteRow(e.target);
		checkRows(e.target);
		calcDataRows();
		calcTotalHours();
	}
}, true);

// adds new row when icon is clicked, and recalculates totals
document.body.addEventListener("click", function(e) {
	if (e.target.textContent == "add_circle"){
		addRow(e.target);
		calcDataRows();
		calcTotalHours();
	}
}, true);

// adjusts UI elements when the window is resized
window.onresize = resizeTable; 
