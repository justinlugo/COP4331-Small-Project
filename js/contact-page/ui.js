const tableContent = document.getElementById('table-content');
const emptyJSON = {
    "FirstName": "First Name",
    "LastName": "Last Name",
    "email": "Email",
    "phone": "Phone Number"
};

// Watches an element, although this should specifally be used for observing the 
// height of main.
const heightObserver = new ResizeObserver(selection => {
    for (let entry of selection) {
        const entryHeight = entry.contentRect.height;
        setTableHeight(entryHeight);
    }
});

// Set table height dynamically to the height of #main.
function setTableHeight(height) {
    const tableHeader = document.getElementById('table-header');
    const headerHeight = tableHeader.clientHeight;
    // The header is one element that is "pushing down" the table contnet.
    // To negate this, we subtract the headers height from the total (main height).
    tableContent.style.height = (height - headerHeight) + "px";
};

// Creates an input row and adds to the table from JSON object
function createInputRow(inputJSON) {
    const row = document.createElement('tr');
    row.setAttribute('id', 'rowInput');

    const firstName = document.createElement('td');
    firstName.setAttribute('class', 'firstName');
    // Set the cell to have an input
    const inputFirst = document.createElement("input");
    inputFirst.setAttribute('type', 'text');
    inputFirst.placeholder = inputJSON.FirstName;
    firstName.appendChild(inputFirst);
    
    const lastName = document.createElement('td');
    lastName.setAttribute('class', 'lastName');
    const inputLast = document.createElement("input");
    inputLast.setAttribute('type', 'text');
    inputLast.placeholder = inputJSON.LastName;
    lastName.appendChild(inputLast);
  
    const email = document.createElement('td');
    email.setAttribute('class', 'email');
    const inputEmail = document.createElement("input");
    inputEmail.setAttribute('type', 'email');
    inputEmail.placeholder = inputJSON.email;
    email.appendChild(inputEmail);

    const phone = document.createElement('td');
    phone.setAttribute('class', 'phone');
    const inputPhone = document.createElement("input");
    inputPhone.setAttribute('type', 'tel');
    inputPhone.placeholder = inputJSON.phone;
    phone.appendChild(inputPhone);
  
    const submitContact = document.createElement('td');
    // Make the button take up 2 td's since other lines will have 2?
    // ?????
    submitContact.setAttribute('colspan', '2');
    submitContact.setAttribute('class', 'submitBtn');
    // Create submit button
    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('class', 'submitContact');
    submitBtn.textContent = "Submit";
    // Attach button to cell
    submitContact.appendChild(submitBtn);
  
    // Attach all the cells to the row
    row.appendChild(firstName);
    row.appendChild(lastName);
    row.appendChild(email);
    row.appendChild(phone);
    row.appendChild(submitContact);
  
    // Attach the row to the top of table
    tableContent.getElementsByTagName('table')[0].prepend(row);
}

// Catalouge of event listeners, perform these sets of functions.
(function eventListeners() {
// When user clicks "Add Contact".
    document.addEventListener('click', (e) => {
        if (e.target.id == 'createContact') {
            // if rowInput doesnt exist create it. Else do nothing.
            const existingRow = tableContent.querySelector('#rowInput');
            if (existingRow == null) {        
                // Creates an input row using the sample object
                createInputRow(emptyJSON);
            }
        }
    });
})();

// Object of variables or functions to package to be used across the application.
export { heightObserver, setTableHeight }
