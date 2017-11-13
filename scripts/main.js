// main.js
// main javascript file used like a main function

// ++++++++
// Events +
// ++++++++

// calculate total hours anytime a input cell has focus
document.body.addEventListener("focusin", function(e) {
	if(e.target.nodeName == "INPUT") {
		calcDataRows();
	}
}, true);

// calculate total hours anytime a input cell loses focus
document.body.addEventListener("focusout", function(e) {
	if(e.target.nodeName == "INPUT") {
		calcDataRows();
	}
}, true);

window.onresize = resizeTable; 
