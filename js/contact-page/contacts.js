// anything dealing with the contact app (table of contacts for each user)
import * as ui from './ui.js';
import * as tableCreate from './tableCreate.js';

// We can seperate js files into "components", very similar to Java with classes.
const urlBase = "http://cop4331small.xyz/LAMPAPI";
const ext = "php";

const main = document.getElementById('main');
const header = document.getElementById('header');
// The userID, firstName, lastName of logged in user
let userId = 0;
let firstName = "";
let lastName = "";

// Limit of how many searches can be shown
let limit = 25;

// Watches the height of main, and will dynamically set the height of the table.
ui.heightObserver.observe(main);

//Dynamiclly creates rows for each contact the user has created.
function createNewContact(contact) {
  const row = tableCreate.newContact(contact);
  const tableContent = document.getElementById("table-content").getElementsByTagName('table')[0];
  tableContent.appendChild(row);
}

// (function() {
//   // Read the cookie if there is one
//   // readCookie();
// })();

// readCookie
// Cookie functions taken from Professor Leinecker's code.
(function() {
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	
    for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		
        if(tokens[0] == "firstName")
        {
            firstName = tokens[1];
        }
        else if(tokens[0] == "lastName")
        {
            lastName = tokens[1];
        }
        else if(tokens[0] == "userId")
        {
            userId = parseInt(tokens[1].trim());
        }
	}

	if(userId < 0)
	{
		window.location.href = "index.html";
	}
	else
	{
		// document.getElementById("userName").textContent = "Logged in as " + firstName + " " + lastName;
        // Create a greeting for the user.
        const greeting = document.createElement('span');
        greeting.textContent = `Hello, ${firstName} ${lastName}`;
        header.appendChild(greeting);

        // Initial search when page loads to show user's database
        searchContacts();
	}
})();

export function registerContact() {
    console.log("Hello")
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
                if (jsonObject.error == "") 
                {
                    // Since user was added remove the input row.
                    rowData.remove();
                    // Redisplay the table with the new contact
                    searchContacts();
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
    for(const [key, value] of Object.entries(newContact)) 
    {
        // Use string trim function to remove leading and trailing whitespace
        newContact[key] = value.trim();
        // Check if any entry field is empty and stop the submission and let the user know
        if (value == "") 
        {
            // result.textContent = `${key} is empty`;
            console.log(`${key}:is empty`);
            return;
        }
    }

    // Check the user id and add it to the object
    if (userId < 0) 
    {
        console.log("Problem with userId");
        return;
    }
    newContact.userId = userId;

    // Print for debugging
    console.log(newContact);

    // Return newContact object
    return newContact;
}

// Searches the contacts of the user
export function searchContacts() {
    // Get inputs and convert to JSON
    // Get the row
    const searchBar = document.getElementById("searchBar");
    
    // Get the value from the search bar
    const search = searchBar.value;
    
    // Create empty object called new contact
    const newSearch = new Object();
    // Remove excess whitespace
    newSearch.search = search.trim();
    
    // Check to make sure the user Id is right
    if (userId < 1) {
        // User Id is wrong
        console.log("user Id is incorrect");
        // End the search since user id isnt right
        return;
    }
    newSearch.userId = userId;

    // Clear the table
    clearTable();

    // Convert the data to JSON
    const myJSON = JSON.stringify(newSearch);
    console.log(myJSON);

    // Setup the HTTP request to send to the API endpoint
    let url = urlBase + '/SearchContact.' + ext;
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
                
                // Check the length of the received objects and loop through a max of the limit
                // Sets the size of the loop to create rows
                let showSize = 0;
                if (jsonObject.hasOwnProperty('contacts'))
                {
                    if (jsonObject['contacts'].length  < limit)
                    {
                    showSize = jsonObject['contacts'].length;
                    }
                    else 
                    {
                    showSize = limit;
                    }
                }

                // For loop of lenght of 'contacts' array inside JSON object
                for (let i = 0; i < showSize; i++) 
                {
                    updateTable(jsonObject['contacts'][i]);
                    // createNewContact(jsonObject['contacts'][i]);
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

// Function to update the table rows, makes sure duplicates are not printed
function updateTable(contactJSON) {
    // Get the table element and length
    const table = document.getElementById("table-content").children;
    const tableLength = table[0].children.length;

    // If theres nothing in the table then add the contact
    if (tableLength == 0) 
    {
        createNewContact(contactJSON);
        return;
    }

    // Some console logs for accessing parts of the table
    // console.log(table);
    // console.log(table[0].children.length);
    // console.log("check rows");
    // console.log(table[0].children);
    // console.log(table[0].rows[0].cells.length);
    // console.log(table[0].rows[0].cells[4].textContent);
    
    // Loop through the table checking if the contact to be added is in the table
    for (let i = 0; i < tableLength; i++) 
    {
        // Get the contact id of the contact in the current row
        const contactId = table[0].rows[i].cells[4].textContent;

        // If the contact id is found quit since it is already in the table
        if (contactId == contactJSON.id) 
        {
            return;
        }
    }

    // After checking the contact is not in the table then add to table
    createNewContact(contactJSON);
}

// Function to clear the table
function clearTable() {
    // Get the table element and length
    const table = document.getElementById("table-content").children;
    const tableLength = table[0].children.length;

    // Loop through the table
    for (let i = 0; i < tableLength; i++) 
    {
        // Delete the top row as many times as in the table
        const row = table[0].rows[0];
        row.remove();
    }
}

// Delete Contact
export function deleteContact(rowElement) {
    
    // Create empty object called remove contact
    const removeContact = new Object();
    
    // Send the Id of the contact to be removed
    removeContact.id = rowElement.cells[4].textContent;

    // Convert the data to JSON
    const myJSON = JSON.stringify(removeContact);

    // Setup the HTTP request to send to the API endpoint
    let url = urlBase + '/DeleteContact.' + ext;
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
                // Now that the delete is done confirm contact has been deleted
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

// Update Contact
export function updateContact(rowElement) {
    // Converts the row to an object
    const updateContact = {
        firstName:  '',
        lastName:   '',
        email:      '',
        phone:      '',
        contactId:''
    };

    // Fill the update Contact object with the row data
    let i = 0;
    for (const property in updateContact) 
    {
        updateContact[property] = rowElement.cells[i].textContent;
        i++;
    }

    // Convert the data to JSON
    const myJSON = JSON.stringify(updateContact);

    // Setup the HTTP request to send to the API endpoint
    let url = urlBase + '/EditContact.' + ext;
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
                // Now that the update is done confirm contact has been updated
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

// When logout button is clicked.
const logOutBtn = document.getElementById('logout');
logOutBtn.addEventListener('click', () => {
    userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
});