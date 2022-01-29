// We can seperate js files into "components", very similar to Java with classes.
const urlBase = "http://cop4331small.xyz/LAMPAPI";
const ext = "php";

// anything dealing with the contact app (table of contacts for each user)

// Set table height dynamically to the height of the window/device. This
// enables us to have a scroll bar essentially.

const main = document.getElementById('main');
const tableHeader = main.querySelector("#table-header");
const tableContent = main.querySelector("#table-content");

main.onresize = setTableHeight();
main.onload = setTableHeight();

// The userID, firstName, lastName of logged in user
let userId = 0;
let firstName = "";
let lastName = "";

const emptyJSON = {
    "FirstName": "First Name",
    "LastName": "Last Name",
    "email": "Email",
    "phone": "Phone Number"
};

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
    // Read the cookie if there is one
    // readCookie();

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

    // Says hello to user by name
    const header = document.getElementById("header");
    const usersName = document.createElement('div');
    usersName.textContent = `Hello, ${firstName} ${lastName}`;
    header.appendChild(usersName);
})();

// Submit button is clicked, in the signup form.
document.addEventListener('click', (e) => {
    if (e.target.id == 'createContact') {

        // if rowInput doesnt exist create it. Else do nothing
        let existingRow = tableContent.querySelector('#rowInput');
        if (existingRow == null) {        
            // Creates an input row using the sample object
            createInputRow(emptyJSON);
        }
    }
});

// Creates a row and adds to the table from JSON object
function createRow(contactJSON) {
    // Get the table
    // const tableContent = document.getElementById("table-content");
    const tableContent = document.getElementById("contactTable");

    // Create a row.
    // const row = document.createElement('tr');
    const row = tableContent.insertRow();
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

// Creates an input row and adds to the table from JSON object
function createInputRow(inputJSON) {
    // Get the table
    const tableContent = document.getElementById("contactTable");

    // Create a row.
    // const row = document.createElement('tr');
    const row = tableContent.insertRow(0);
    // Made rowInput an ID since we only want one input row at a time
    row.setAttribute('id', 'rowInput');
    // row.setAttribute('class', 'rowInput');

    // Creating first name cell.
    const firstName = document.createElement('td');
    firstName.setAttribute('class', 'firstName');
    // Set the cell to have an input for first name
    const inputFirst = document.createElement("input");
    inputFirst.setAttribute('type', 'text');
    inputFirst.placeholder = inputJSON.FirstName;
    firstName.appendChild(inputFirst);
    
    // Creating last name cell.
    const lastName = document.createElement('td');
    lastName.setAttribute('class', 'lastName');
    // Set the cell to have an input for last name
    const inputLast = document.createElement("input");
    inputLast.setAttribute('type', 'text');
    inputLast.placeholder = inputJSON.LastName;
    lastName.appendChild(inputLast);

    // Creating email cell.
    const email = document.createElement('td');
    email.setAttribute('class', 'email');
    // Set the cell to have an input for email
    const inputEmail = document.createElement("input");
    inputEmail.setAttribute('type', 'email');
    inputEmail.placeholder = inputJSON.email;
    email.appendChild(inputEmail);

    // Creating phone cell.
    const phone = document.createElement('td');
    phone.setAttribute('class', 'phone');
    // Set the cell to have an input for phone
    const inputPhone = document.createElement("input");
    inputPhone.setAttribute('type', 'tel');
    inputPhone.placeholder = inputJSON.phone;
    phone.appendChild(inputPhone);

    // Creating edit cell.
    const submitContact = document.createElement('td');
    // Make the button take up 2 td's since other lines will have 2?
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
    // tableContent.prepend(row);
}

// Submit user button is clicked add contact.
document.addEventListener('click', (e) => {
    if (e.target.id == 'submitContact') {
        console.log("submit");
        // Register contact
        registerContact();
    }
});

// Function for registering a new contact
function registerContact() {
    // Get inputs and convert to JSON
    // Get the row
    const rowData = document.getElementById("rowInput");
    console.log(rowData);
    // Convert the row to an object
    const data = rowToObject(rowData);
    console.log(data);
    // Convert the data to JSON
    const myJSON = JSON.stringify(data);
    console.log(myJSON);

    // HTTP post for sending JSON login info.

    // Setup the HTTP request to send to the API endpoint
    let url = urlBase + '/AddContact.' + ext;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        // After any change happens 
        xhr.onreadystatechange = function()
        {
            // When the send is successful take the response and store in jsonObject
            if (this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse (xhr.responseText);

                // Show the received JSON for debugging
                // document.getElementById("result").textContent = xhr.responseText;
                
                // If no errors then adding of user was success
                if (jsonObject.error == "") {
                    // Since user was added remove the input row.
                    rowData.remove();
                }
            }
        };
        // Send the JSON
        xhr.send(myJSON);
    }
    catch(err)
    {
        // If there's an error display it
        // document.getElementById("result").textContent = err.message;
    }
}

// Package the row as an object
function rowToObject(element) {
    // Create empty object called new contact
    const newContact = new Object();

    // Individually grab each elemnt from the row to put in object field
    newContact.firstName = element.cells[0].children[0].value;
    newContact.lastName = element.cells[1].children[0].value;
    newContact.email = element.cells[2].children[0].value;
    newContact.phone = element.cells[3].children[0].value;

    // Loop through the newContact object and check to make sure the value are not empty
    for(const [key, value] of Object.entries(newContact)) {
            
        // Use string trim function to remove leading and trailing whitespace
        newContact[key] = value.trim();

        // Check if any entry field is empty and stop the submission and let the user know
        if (value == "") {
            // result.textContent = `${key} is empty`;
            console.log(`${key}:is empty`);
            return;
        }
    }

    // Check the user id and add it to the object
    if (userId < 0) {
        console.log("Problem with userId");
        return;
    }
    newContact.userId = userId;


    // Print for debugging
    console.log(newContact);

    // Return newContact object
    return newContact;
}

// Cookie functions taken from professor's code
function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		// document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

// Logout button is clicked, in the signup form.
document.addEventListener('click', (e) => {
    if (e.target.id == 'logout') {
        doLogout();
    }
});