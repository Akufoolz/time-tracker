// calc.js
// functions to calculate data

// converts a time string to hours number
function timeToHours(time) {
	try {
		var hours = parseInt(time.split(":")[0]);
		var minutes = parseInt(time.split(":")[1]) / 60;
		var amPM = time.split(" ")[1].toUpperCase();
		if (amPM == "AM") {
			if (hours == 12) {
				var totalHours = minutes;
			}
			else {
				var totalHours = hours + minutes;
			}
		}
		else if (amPM == "PM") {
			if (hours == 12) {
				var totalHours = hours + minutes;
			}
			else {
				var totalHours = (hours+12) + minutes;
			}
		}
	
		return totalHours;
	}
	catch(err) {
		console.log(err);	
	}
	finally {
		if (!totalHours) {
			var totalHours = "Error";
		}
	}
}

// calculate the total hours of the line
var lineTotal = (startTime, endTime) => timeToHours(endTime) - timeToHours(startTime);

// get data-row and calculate the totals and inject into the hours cell
function calcDataRows() {
	var allRows = $e(".data-box").children;
	for (i = 0; i < allRows.length; i++) {
		var dataRow = allRows[i];	
		var dataCells = dataRow.children;
		var start = dataCells[1].value;
		var end = dataCells[2].value;	
		if (start !== "" && end !== "") {
			dataCells[3].value = parseFloat(lineTotal(start, end)).toFixed(2);
		}
		else {
			dataCells[3].value = 0; 		
		}
	}
}

// calculate total hours and inject into div.total 
function calcTotalHours() {
	var rows = document.getElementsByClassName("data-row");
	var total = 0;
	for (i = 0; i < rows.length; i++) {
		if (rows[i].style.display !== "none") { 
			total = total + parseFloat(rows[i].children[3].value);	
		}
	}
	$e(".total").textContent = ("Total Hours: " + total);
}

// Calc functions which need to be refreshed
function refreshCalc() {
	calcDataRows();
	calcTotalHours();
}
