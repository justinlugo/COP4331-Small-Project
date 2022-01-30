import * as contact from './contacts.js';

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
    submitBtn.setAttribute('id', 'submitContact');
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

const dataSize = 4;
// Convert all cells in a given row to input fields.
function convertCells_toInputs(array) {
    // No magic numbers; we have 4 cells of data to convert into an input field.
    for (let i = 0; i < dataSize; i++) {
        const inputField = document.createElement('input');
        const value = array[i].textContent;
        // Remove text content from the cell.
        array[i].textContent = '';
        inputField.value = value;
        
        array[i].appendChild(inputField);
    }
}

// Takes in the array of the row we confirmed on, and then returns an object
// of the new data to update with.
function confirmInput(array) {
    // TODO: Find away to grab current row userID?
    const inputPackage = {
        firstName:  '',
        lastName:   '',
        email:      '',
        phone:      '',
        contactId:''
    };


    let i = 0;
    for (const property in inputPackage) {
        console.log(array[i]);
        console.log(array[i].children[0]);

        if (property != 'contactId')
            inputPackage[property] = array[i].children[0].value;
        
        inputPackage[property] = array[i].children[0].textContent;
        i++;
    }

    console.log(inputPackage);

    return inputPackage;
}

// When user confirms, it will change the input fields into text content for 
// the cells.
function inputs_toCells(array) {
    for (let i = 0; i < dataSize; i++) {
        const value = array[i].children[0].value;
        array[i].removeChild(array[i].children[0]);
        array[i].textContent = value;
    }
}

// Catalouge of event listeners, perform these sets of functions.
// We can watch the entire document, and have a "switch" to check which one
// was clicked.
(function eventListeners() {
    document.addEventListener('click', (e) => {
        // Add Contact is clicked.
        if (e.target.id == 'createContact') {
            // if rowInput doesnt exist create it. Else do nothing.
            const existingRow = tableContent.querySelector('#rowInput');
            if (existingRow == null) {        
                // Creates an input row using the sample object
                createInputRow(emptyJSON);
            }
        }
        // Submit user button is clicked add contact.
        else if (e.target.id == 'submitContact') {
            contact.registerContact();
        }
        // Edit is clicked.
        else if(e.target.className == 'editBtn') {
            // Where the e'th edit button clicked, store the array of the row
            // where that button is contained.
            const rowCells = Array.from(e.target.parentNode.parentNode.cells);
            convertCells_toInputs(rowCells);
            
            // Convert the edit button into a "confirm button".
            e.target.className = "confirmBtn";
            e.target.textContent = "C";
        } 
        // Confirm is clicked.
        else if(e.target.className == 'confirmBtn') {
            const rowInputs = Array.from(e.target.parentNode.parentNode.cells);
            // TODO: This is where PHP magick happens, we need to find a way to
            //       overwrite this data to the server.
            const packagedInput = confirmInput(rowInputs);
            console.log(packagedInput);
            
            inputs_toCells(rowInputs);
        }
        // Remove Contact is clicked.
        else if(e.target.className == 'removeBtn') {
            const table = tableContent.getElementsByTagName('table')[0];
            const trashRow = e.target.parentNode.parentNode;

            table.removeChild(trashRow);
            // TODO: This is where PHP magick happens,
            //       Delete user from the database.
        }
        // Every time there is an event using the search bar
        else if (e.target.id == 'searchBar') {
            // Send text in search bar to search
            contact.searchContacts();
        }
    });
})();

// Object of variables or functions to package to be used across the application.
export { heightObserver, setTableHeight }
