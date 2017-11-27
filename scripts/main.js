// main.js
// main javascript file used like a main function

// ++++++++
// Events +
// ++++++++

// calculate total hours at load
document.body.addEventListener("load", function(e) {
	setUI();
	refreshUI();
	refreshCalc();
}, true);

// event to run refresh functions anytime a input cell has focus
document.body.addEventListener("focusin", function(e) {
	if(e.target.className === "text-box") {
		refreshUI();
		refreshCalc();
	}
}, true);

// event to run refresh functions anytime a input cell loses focus
document.body.addEventListener("focusout", function(e) {
	if(e.target.className === "text-box") {
		refreshUI();
		refreshCalc();
	}
}, true);

// event handler to run refresh functions when any element in the body is clicked
document.body.addEventListener("click", function(e) {
	refreshUI();
	refreshCalc();
}, true);

// event to remove rows when remove icon is clicked (or clear the row if no others exist)
// if the remove icon is located inside the menu window it removes the type in the input
document.body.addEventListener("click", function(e) {
	if (e.target.classList.contains("material-icons") && e.target.textContent === "remove_circle") {
		if (e.target.classList.contains("menu-icon")) {
			var targetValue = $e("#remove-type").value;
			UI.removeType(targetValue);
			$e("#remove-type").value = "";
		}
		else {
			checkRows(e.target);
		}
	}
}, true);

// event to add a rows when the add icon is clicked
// if the add icon is within the menu window it adds a type from the input
document.body.addEventListener("click", function(e) {
	if (e.target.classList.contains("material-icons") && e.target.textContent === "add_circle") {
		if (e.target.classList.contains("menu-icon")) {
			var targetValue = $e("#add-type").value;
			UI.addType(targetValue);
			$e("#add-type").value = "";
		}
		else {
			addRow();
			refreshCalc();
			refreshUI();
		}
	}
}, true);

// event to toggle the menu window when the menu icon is clicked
document.body.addEventListener("click", function(e) {
	if (e.target.className === "material-icons" && e.target.textContent === "menu" || e.target.textContent === "close") {
		toggleMenuWindow();	
	}
}, true);

// adjusts UI elements when the window is resized
window.onresize = resizeTable; 
