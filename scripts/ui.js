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
	var boxRows = $e(".data-box").children;
	var dataRow = boxRows[(boxRows.length - 1)].cloneNode(true);
	var targetCells = dataRow.children;
	var newId = "row" + (parseInt(dataRow.id.slice(3)) + 1);
	dataRow.id = newId;
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
	var allRows = $e(".data-box").children;
	
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
						var target = "option[value='" + c + "']";
						$e(target).remove();
						//delete typeList[c];
					}
				}
			}
		}
	}

	// functions which are exposed globally
	return {
		popTypes: function(){
			populateTypes();
		},

		addType: function(type) {
			if (!typeList[type]) {
				typeList[type] = true;
				alert(type + " type has been added.");
			}
			else if (typeList[type]) {
				alert(type + " type already exists.");
			}
		},

		removeType: function(type) {
			if (typeList[type]) {
				var allRowTypes = [];
				for (i = 0; i < allRows.length; i++) {
					allRowTypes[i] = allRows[i].children[0].value;
				}
				if (allRowTypes.indexOf(type) === -1) {
					delete typeList[type];
					alert(type + " type has been removed.");
				}
				else {
					alert("Cannot remove type with existing rows.");
				}
			}
			else if (!typeList[type]) {
				alert(type + " type does not exists.");
			}
		},

		getTypeList: function() {
			var typeListObject = { "types": [] };
			typeListObject.types.push(typeList);
			return typeListObject;
		},

		setTypeList: function(object) {
			typeList = object;
		},

		// function to check start and end input values for space between minutes and am/pm
		// adds a space to the value if it does not exist
		setTimeSpace: function() {
			for (i = 0; i < allRows.length; i++) {
				var rowValues = allRows[i].children;
				var startValue = rowValues[1].value;
				var endValue = rowValues[2].value;
				var startRes = checkChar(startValue, " ");
				var endRes  = checkChar(endValue, " ");

				// logic for start time value
				if (startValue.length === 6) {
					if (startRes === -1) {
						document.getElementById("row" + i).children[1].value = addCharToString(startValue, " ", 4);
					}
				}
				else if (startValue.length === 7) {
					if (startRes === -1) {
						document.getElementById("row" + i).children[1].value = addCharToString(startValue, " ", 5);
					}
				}

				// logic for end time value
				if (endValue.length === 6) {
					if (endRes === -1) {
						document.getElementById("row" + i).children[2].value = addCharToString(endValue, " ", 4);
					}
				}
				else if (endValue.length === 7) {
					if (endRes === -1) {
						document.getElementById("row" + i).children[2].value = addCharToString(endValue, " ", 5);
					}
				}
			}
		},

		// function to save current data to file
		saveDataToFile: function() {
			var saveData = $get("date") + "," + $get("types") + "," +  $get("rowObjects");
			var saveDataBlob = new Blob([saveData], {type:"application/json"});
			var saveDataURL = window.URL.createObjectURL(saveDataBlob);
			var dataFileName = $e("#save-file").value + ".json";

			var downloadLink = document.createElement("a");
			downloadLink.download = dataFileName;
			downloadLink.textContent = "Download File";
			downloadLink.href = saveDataURL;
			downloadLink.onclick = removeClickedElement;
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);

			downloadLink.click();
		}
	};
})();

// functions to show and hide the menu window
function toggleMenuWindow() {
	var menuDisplay = $e(".menu-window");
	if (menuDisplay.style.display === "block") {
		menuDisplay.style.display = "none";
	}
	else {
		menuDisplay.style.display = "block";
	}
}

// funtion to save all data prior to unload
function saveAllData() {

	$set("types", JSON.stringify(UI.getTypeList()));

	var selectedDate = $e("#date-list");
	var dateObject = { "date": selectedDate.options[selectedDate.selectedIndex].text};	
	$set("date", JSON.stringify(dateObject));

	var allRowObjects = { rows: [] };
	var allRows = $e(".data-box").children

	$set("rowCount", allRows.length);

	for (i = 0; i < allRows.length; i++) {
		newRowObject = {};
		var kids = allRows[i].children;
		var cellNames = ["type", "start", "end", "total"];
		newRowObject["id"] = allRows[i].id;
		for (j = 0; j < kids.length - 1; j++) {
			newRowObject[cellNames[j]] = kids[j].value;
		}
		allRowObjects.rows.push(newRowObject);
	}

	$set("rowObjects", JSON.stringify(allRowObjects));
	console.log("DATA SAVED!");
}

// function to load existing localStorage data on page load

function loadAllData() {
	if ($get("types")) {
		var savedTypes = JSON.parse($get("types"));
		UI.setTypeList(savedTypes.types[0]);
		refreshUI();
	}
	if ($get("rowObjects")) {
		var savedRows = JSON.parse($get("rowObjects"));
		var allRows = $e(".data-box").children;
		var rowDiff = parseInt($get("rowCount")) - (allRows.length);
		for (i = 0; i < rowDiff; i++) {
			addRow();
		}
		var allRows = $e(".data-box").children;
		for (i = 0; i < allRows.length; i++) {
			var kids = allRows[i].children;
			var savedRowsValues = Object.values(savedRows.rows[i]);
			var counter = 1;
			for (j = 0; j < kids.length - 2; j++) {
				kids[j].value = savedRowsValues[counter];
				if (counter <= 3) {
					counter++;
				}
				else {
					counter = 0;
				}
			}
		}
	}
	console.log("DATA LOADED!");
}



// function to call setup ui functions
function setUI() {
	setBodyWidth();
	setTable();
	setCurrentDate();
	setTitleDiv();
}

// UI functions which need to be reloaded
function refreshUI() {
	UI.setTimeSpace();
	UI.popTypes();
	sortRows();
}
