// anything dealing with the contact app (table of contacts for each user)

// Set table height dynamically to the height of the window/device. This
// enables us to have a scroll bar essentially.

const main = document.getElementById('main');
const tableHeader = main.querySelector("#table-header");
const tableContent = main.querySelector("#table-content");

main.onresize = setTableHeight();
main.onload = setTableHeight();

function setTableHeight() {
    let mainHeight = main.clientHeight;
    let headerHeight = tableHeader.clientHeight;
    // The header is one element that is "pushing down" the table contnet.
    // To negate this, we subtract the headers height from the total (main height)
    // to get our perfect table size fit inside our css grid layout.
    tableContent.style.height = (mainHeight - headerHeight) + "px";
};

// // This is an immediatly envoked function.
// (function() {
//     window.onresize = displayWindowSize;
//     window.onload = displayWindowSize;

//     function displayWindowSize() {
//         let myWidth = window.innerWidth;
//         let myHeight = window.innerHeight;
//         // your size calculation code here
//         document.getElementById("main").innerHTML = myWidth + "x" + myHeight;
//       };
    
    
// })();