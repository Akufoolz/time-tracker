// ui.jsj
// functions use to set UI properties

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
	console.log(getScrollWidth().width);
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
	console.log("resized!");
}

setBodyWidth();
setTable();
