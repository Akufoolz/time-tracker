// calc.js
// functions to calculate data

// converts a time string to hours number
function timeToHours(time) {
	var hours = parseInt(time.split(":")[0]);
	var minutes = parseInt(time.split(":")[1]) / 60;
	var totalHours = hours + minutes;
	return totalHours;
}

// calculate the total hours of the line
var lineTotal = (startTime, endTime) => timeToHours(endTime) - timeToHours(startTime);

// get data-row and calculate the totals and inject into the hours cell
function calcDataRows() {
	var dataRow = $e(".data-row");	
	var dataCells = dataRow.children;
	var start = dataCells[1].value;
	var end = dataCells[2].value;	
	dataCells[3].value = parseFloat(lineTotal(start, end)).toFixed(2);
}

// calculate total hours and inject into div.total 
function calcTotalHours() {
	var rows = document.getElementsByClassName("data-row");
	var total = 0;
	for (i = 0; i < rows.length; i++) {
		total = total + parseFloat(rows[i].children[3].value);	
	}
	console.log($e(".total").textContent);
	$e(".total").textContent = ("Total Hours: " + total);
}

calcTotalHours();
calcDataRows();
