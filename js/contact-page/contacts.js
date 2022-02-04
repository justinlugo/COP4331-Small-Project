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

// Watches the height of main, and will dynamically set the height of the table.
ui.heightObserver.observe(main);

//Dynamiclly creates rows for each contact the user has created.
function createNewContact(contact) {
  const row = tableCreate.newContact(contact);
  const tableContent = document.getElementById("table-content").getElementsByTagName('table')[0];
  tableContent.appendChild(row);
}

// Cookie functions taken from Professor Leinecker's code.
function readCookie()
{
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
	}

  // Create a greeting for the user.
  const greeting = document.createElement('span');
  greeting.textContent = `Hello, ${firstName} ${lastName}`;
  header.appendChild(greeting);
}

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

// Searches the contacts of the user
export function searchContacts() {
  // Get inputs and convert to JSON
  // Get the row
  const searchBar = document.getElementById("searchBar");
  console.log(searchBar);
  // Get the value from the search bar
  const search = searchBar.value;
  console.log(search);
  
  // Create empty object called new contact
  const newSearch = new Object();
  // Individually grab each elemnt from the row to put in object field
  newSearch.search = search.trim();
  
  // Check to make sure the user Id is right
  if (userId < 1) {
      // User Id is wrong
      console.log("user Id is incorrect");
      // End the search since user id isnt right
      return;
  }
  newSearch.userId = userId;

  // Convert the data to JSON
  const myJSON = JSON.stringify(newSearch);
  console.log(myJSON);

  // HTTP post for sending JSON login info.

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
              
              // If no errors then adding of user was success
              // if (jsonObject.error == "") {
                  // Loop through the results and create rows
                  // For loop of lenght of 'contacts' array inside JSON object
                  for(let i = 0; i < jsonObject['contacts'].length; i++)
                    createNewContact(jsonObject['contacts'][i]);
              // }
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

// DEBUGGING FUNCTION
(function() {
  // Read the cookie if there is one
  // readCookie();
  
  // JSON which contains an array of objects assigned as "contacts".
  const myJSON = {
      "contacts": [
        {
          "FirstName": "Justin",
          "LastName": "Justin Last",
          "email": "Justin@email.com",
          "phone": "123-123-1234",
          "id": 5
        },
        {
          "FirstName": "Austin",
          "LastName": "Austin Last",
          "email": "Austin@email.com",
          "phone": "123-123-1234",
          "id": 5
        },
        {
          "FirstName": "Sam",
          "LastName": "Sam Last",
          "email": "Sam@email.com",
          "phone": "123-123-1234",
          "id": 5
        },
        {
          "FirstName": "Tyler",
          "LastName": "Tyler Last",
          "email": "Tyler@email.com",
          "phone": "123-123-1234",
          "id": 5
        },
        {
          "FirstName": "Zach",
          "LastName": "Zach Last",
          "email": "Zach@email.com",
          "phone": "123-123-1234",
          "id": 5
        },
        {
          "FirstName": "Victor",
          "LastName": "Victor Last",
          "email": "Victor@email.com",
          "phone": "123-123-1234",
          "id": 5
        }
      ]
  };
  // For loop of length of contacts, and for a given multiplyer, do that
  // contact-length*n times. This helps to populate the table.
  const multiplyer = 8;
  for (let i = 0; i < multiplyer; i++) {
      for(let j = 0; j < myJSON.contacts.length; j++)
        createNewContact(myJSON.contacts[j]);
  }
})();
// DEBUGGING FUNCTION
