// resize.js



// set height to remaining space by subtracting the height of the top divs and bottom div from window height
function setTable() {
	// set divs into variables
	var tableDiv = $e(".table"); 
	var topDiv = $e(".top"); 
	var tableHeaderDiv = $e(".table-header"); 
	var bottomDiv = $e(".bottom");

	// get the padding of the div.table
	//var tablePadding = (parseInt(getComputedStyle(tableDiv).paddingTop, 10)) + (parseInt(getComputedStyle(tableDiv).paddingBottom, 10));
	// add top two div heights together
	var topHeight = topDiv.clientHeight + tableHeaderDiv.clientHeight;
	
	// set div.table width and height
	//tableDiv.style.height =  getWindow().height - (topHeight + bottomDiv.clientHeight + tablePadding) + "px"; 
	//tableDiv.style.width =  getWindow().width - tablePadding + "px"; 
	tableDiv.style.height =  getWindow().height - (topHeight + bottomDiv.clientHeight) + "px"; 
	tableDiv.style.width =  getWindow().width + "px"; 
}

// resizes div.table when the browser is resized
function resizeTable() {
	getWindow();
	setTable();
	console.log("resized!");
}
