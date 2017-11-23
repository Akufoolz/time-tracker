// ui.jsj
// functions use to setup the UI

// get scrollbar width
function getScrollWidth() {
	var scrollDiv = document.createElement("div");
	scrollDiv.style.overflow = "scroll";
	scrollDiv.style.width = "100px";
	scrollDiv.style.height = "100px";
	document.body.appendChild(scrollDiv);
	var scrollWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	var scrollHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
	scrollDiv.style.display = "none";
	return {height: scrollHeight, width: scrollWidth};
}

// set body width to combined width of the input fields
function setBodyWidth() {
	var bodyTag = $e("body");
	var textBox = $e(".col-head");
	var iconBox = $e(".icon-head");
	var lineWidth = (textBox.clientWidth * 4) + iconBox.clientWidth;
	bodyTag.style.width = lineWidth + getScrollWidth().width + "px";
}

// set height to remaining space by subtracting the height of the top divs and bottom div from window height
function setTable() {
	// set divs into variables
	var tableDiv = $e(".table"); 
	var topDiv = $e(".top"); 
	var tableHeaderDiv = $e(".table-header"); 
	var bottomDiv = $e(".bottom");

	// add top two div heights together
	var topHeight = topDiv.clientHeight + tableHeaderDiv.clientHeight;
	
	// set div.table width and height
	tableDiv.style.height = getWindow().height - (topHeight + bottomDiv.clientHeight) + "px"; 
	tableDiv.style.width = getBody().width;
}

// resizes div.table when the browser is resized
function resizeTable() {
	getWindow();
	setTable();
}

// Adds a new row to the div.data-box 
function addRow() {
	var targetBox = $e(".data-box");
	var dataRow = $e(".data-row").cloneNode(true);
	var targetCells = dataRow.children;
	var length = targetCells.length;
	targetCells[0].value = "";
	targetCells[1].value = "";
	targetCells[2].value = "";
	targetCells[3].value = 0;
	targetBox.appendChild(dataRow);
}

// delete the row when the remove row icon is clicked 
function deleteRow(target) {
	var targetRow = target.closest(".data-row");
	targetRow.remove();
}

// clear the row
function clearRow(target) {
	var targetRow = target.closest(".data-row");
	var targetCells = targetRow.children;
	targetCells[0].value = "";
	targetCells[1].value = "";
	targetCells[2].value = "";
	targetCells[3].value = 0;
}

// check if there is only one row, if true clear row instead of delete
function checkRows(eventTarget) {
	var allRows = $e(".data-box").children;
		if (allRows.length < 2) {
			clearRow(eventTarget);
		}
		else {
			deleteRow(eventTarget);
		}
}

// set the date list to the current date
function setCurrentDate() {
	var dateList = $e("#date-list");	
	var today = document.createElement("option");
	today.value = getCurrentDate();
	today.textContent = getCurrentDate();
	dateList.appendChild(today);
}

// set the width of div.title to the available width between menu and date
function setTitleDiv() {
	var titleDiv = $e(".title");
	var menuDiv = $e(".menu");
	var dateDiv = $e(".date");
	var padding = window.getComputedStyle(titleDiv, null).getPropertyValue("padding-left");
	var targetWidth = ((getBody().width) - (parseInt(padding.slice(0, -2) * 2) + menuDiv.offsetWidth + dateDiv.offsetWidth));
	titleDiv.style.width = targetWidth + "px";
}

/*
// check for unique types and create array to populate type-list 
function setTypeList() {
	var allRows = $e(".data-box").children;
	var typeList = ["All Types"]; 
	for (a = 0; a < allRows.length; a++) {
		var typeCell = allRows[a].children[0];
		if (typeList.indexOf(typeCell.value) === -1 && typeCell.value !== "") {
			typeList.push(typeCell.value);
		}
	}
	return typeList;
}

// create options within type-list using setTypeList array
function populateTypes() {
	var typeSelect = $e("#type-list");
	var typeElements = [];
	var currentOptions = typeSelect.children;
	var optionValues = {};
	for (i = 0; i < currentOptions.length; i++) {
		optionValues[currentOptions[i].value] = true;
	}
	for (i = 0; i < setTypeList().length; i++) {
		if (!optionValues[setTypeList()[i]]) {
			var element = document.createElement("option");
			element.value = setTypeList()[i];
			element.textContent = setTypeList()[i];
			typeSelect.appendChild(element);
		}
	}
}
*/

// sort by type by hiding rows that do not match
function sortRows() {
	var typeSelect = $e("#type-list");
	var allRows = $e(".data-box").children;
	for (i = 0; i < allRows.length; i++) {
		if (typeSelect.value === "All Types") {
			allRows[i].style.display = "initial";
		}
		else if (allRows[i].children[0].value === typeSelect.value) {
			allRows[i].style.display = "initial";
		}
		else {
			allRows[i].style.display = "none";
		}
	}
}

// UI object to make variables available globally and organize functionality
var UI = (function() {
	
	// varibles for static elements
	var typeSelect = $e("#type-list");
	
	// object containing all the types
	var typeList = {
		Cases: true,
		PC: true,
		Triage: true,
		Meeting: true,
		Training: true
	}
	
	

	function populateTypes() {		
		var targetSelects = document.getElementsByClassName("type-box");
		var allSelectElements = [];

		for (i = 0; i < targetSelects.length; i++) {
			allSelectElements[i] = targetSelects[i];
		}

		allSelectElements.push(typeSelect);

		for (a = 0; a < allSelectElements.length; a++) {
			var options = allSelectElements[a].children;
			
			for (var b in typeList) {
				var optionValues = {};
				for (i = 0; i < options.length; i++) {
					optionValues[options[i].value] = true;
				}
				function createOption() {
					var newOption = document.createElement("option");
					var typeValue = b;
					newOption.value = typeValue; 
					newOption.textContent = typeValue; 
					allSelectElements[a].appendChild(newOption);
				}
				if (!optionValues[b]) {
					if (allSelectElements[a].id === "type-list") {
						if (options.length < Object.keys(typeList).length + 1) {
							createOption();
						}
					}
					else {
						if (options.length < Object.keys(typeList).length) {
							createOption();		
						}
					}
				}
				for (var c in optionValues) {
					if (!typeList[c] && c !== "All Types"){
						var target = "option[value=" + c + "]";
						$e(target).remove();
						//delete typeList[c];
					}
				}
			}
		}
	}

	// functions which are exposed globally
	return {
		testOut: function(){
			populateTypes();
		},

		addType: function(type) {
		typeList[type] = true;
		},

		removeType: function(type) {
		delete typeList[type];
		}
	};
})();

// function to call setup ui functions
function setUI() {
	setBodyWidth();
	setTable();
	setCurrentDate();
	setTitleDiv();
}

// UI functions which need to be reloaded
function refreshUI() {
	UI.testOut();
	sortRows();
}
