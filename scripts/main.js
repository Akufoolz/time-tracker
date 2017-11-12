// main.js

// +++++++++++++++
// Run functions +
// +++++++++++++++

getWindow();
setTable();
console.log(getWindow().height + " x " + getWindow().width);

// ++++++++
// Events +
// ++++++++

window.onresize = resizeTable; 
