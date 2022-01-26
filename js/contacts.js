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

// This is an immediatly envoked function.
// TESTING ONLY
(function() {

    // Manually defined JSON for testing purposes.
    // JSON object contains an field 'contacts' which is an array of 
    // JSON objects. Each index is an object that contains:
    // "FirstName", "LastName", "email", "phone"
    const myJSON = {
        "contacts": [
          {
            "FirstName": "Justin",
            "LastName": "Justin Last",
            "email": "Justin@email.com",
            "phone": "123-123-1234"
          },
          {
            "FirstName": "Austin",
            "LastName": "Austin Last",
            "email": "Austin@email.com",
            "phone": "123-123-1234"
          },
          {
            "FirstName": "Sam",
            "LastName": "Sam Last",
            "email": "Sam@email.com",
            "phone": "123-123-1234"
          },
          {
            "FirstName": "Tyler",
            "LastName": "Tyler Last",
            "email": "Tyler@email.com",
            "phone": "123-123-1234"
          },
          {
            "FirstName": "Zach",
            "LastName": "Zach Last",
            "email": "Zach@email.com",
            "phone": "123-123-1234"
          },
          {
            "FirstName": "Victor",
            "LastName": "Victor Last",
            "email": "Victor@email.com",
            "phone": "123-123-1234"
          }
        ]
    };


    // For loop of lenght of 'contacts' array inside JSON object
    for(let i = 0; i < myJSON['contacts'].length; i++)
        createRow(myJSON['contacts'][i]);
    
})();

function createRow(contactJSON) {
    // Get the table
    const tableContent = document.getElementById("table-content");

    // Create a row.
    const row = document.createElement('tr');
    row.setAttribute('class', 'row');

    // Creating first name cell.
    const firstName = document.createElement('td');
    firstName.setAttribute('class', 'firstName');
    // Set the cell to be the first name from the object
    firstName.textContent = contactJSON.FirstName;
    
    // Creating last name cell.
    const lastName = document.createElement('td');
    lastName.setAttribute('class', 'lastName');
    // Set the cell to be the first name from the object
    lastName.textContent = contactJSON.LastName;

    // Creating email cell.
    const email = document.createElement('td');
    email.setAttribute('class', 'email');
    // Set the cell to be the email from the object
    email.textContent = contactJSON.email;

    // Creating phone cell.
    const phone = document.createElement('td');
    phone.setAttribute('class', 'phone');
    // Set the cell to be the phone from the object
    phone.textContent = contactJSON.phone;

    // Creating edit cell.
    const edit = document.createElement('td');
    edit.setAttribute('class', 'edit');
    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'editBtn');
    ////// Make image on the button?
    // editBtn.setAttribute('src', "../images/edit.png");
    // editBtn.setAttribute('alt', "Edit");
    ////// Set size of button
    // editBtn.setAttribute('style', "width:30px;height:30px;");
    ////////
    editBtn.textContent = "E";
    // Attach button to cell
    edit.appendChild(editBtn);
    
    // Creating remove cell.
    const remove = document.createElement('td');
    remove.setAttribute('class', 'remove');
    // Create Delete button
    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'removeBtn');
    ////// Make image on the button?
    // removeBtn.setAttribute('img', "../images/delete.png");
    // removeBtn.setAttribute('alt', "Delete");
    //// Set size of button
    // removeBtn.setAttribute('style', "width:30px;height:30px;");
    /////
    removeBtn.textContent = "D";
    // Attach button to cell
    remove.appendChild(removeBtn);

    // Attach all the cells to the row
    row.appendChild(firstName);
    row.appendChild(lastName);
    row.appendChild(email);
    row.appendChild(phone);
    row.appendChild(edit);
    row.appendChild(remove);

    // Attach the row to the table
    tableContent.appendChild(row);
}
