// main.js
// main javascript file used like a main function

// ++++++++
// Events +
// ++++++++

// event to run functions onload
window.addEventListener("load", function(e) {
	setUI();
	refreshUI();
	loadAllData();
	refreshCalc();
}, true);

// event run functions before unload
window.addEventListener("beforeunload", function(e) {
	saveAllData(); 
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

// event to handle clicks to material-icons
document.body.addEventListener("click", function(e) {
	if (e.target.classList.contains("material-icons")) {
		// remove circle logic
		if (e.target.textContent === "remove_circle") {
			if (e.target.classList.contains("menu-icon")) {
				var targetValue = $e("#remove-type").value;
				UI.removeType(targetValue);
				$e("#remove-type").value = "";
			}
			else {
				checkRows(e.target);
			}
		}
		// add circle icon logic
		else if (e.target.textContent === "add_circle") {
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
		// menu and close icon logic
		else if (e.target.textContent === "menu" || e.target.textContent === "close") {
			toggleMenuWindow();	
		}
		// save icon logic
		else if (e.target.textContent === "save") {
			UI.saveDataToFile();
		}
	}
}, true);

// adjusts UI elements when the window is resized
window.onresize = resizeTable; 
