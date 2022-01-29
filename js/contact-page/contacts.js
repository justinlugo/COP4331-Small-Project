// anything dealing with the contact app (table of contacts for each user)
import * as ui from './ui.js';

const main = document.getElementById('main');
const header = document.getElementById('header');
// The userID, firstName, lastName of logged in user
let userId = 0;
let firstName = "";
let lastName = "";

// Watches the height of main, and will dynamically set the height of the table.
ui.heightObserver.observe(main);

// Create a greeting for the user.
const greeting = document.createElement('span');
greeting.textContent = `Hello, ${firstName} ${lastName}`;
header.appendChild(greeting);

// Dynamiclly creates rows for each contact the user has created.
function createRow(contact) {
    const row = document.createElement('tr');

    const firstName = document.createElement('td');
    firstName.setAttribute('class', 'firstName');
    firstName.textContent = contact.FirstName;

    const lastName = document.createElement('td');
    lastName.setAttribute('class', 'lastName');
    lastName.textContent = contact.LastName;

    const email = document.createElement('td');
    email.setAttribute('class', 'email');
    email.textContent = contact.email;

    const phone = document.createElement('td');
    phone.setAttribute('class', 'phone');
    phone.textContent = contact.phone;

    const edit = document.createElement('td');
    edit.setAttribute('class', 'edit');
    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'editBtn');
    editBtn.textContent = "E";
    edit.appendChild(editBtn);

    const remove = document.createElement('td');
    remove.setAttribute('class', 'remove');
    // Create Delete button
    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'removeBtn');
    removeBtn.textContent = "D";
    remove.appendChild(removeBtn);

    row.appendChild(firstName);
    row.appendChild(lastName);
    row.appendChild(email);
    row.appendChild(phone);
    row.appendChild(edit);
    row.appendChild(remove);

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
		// document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

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
  // For loop of length of contacts, and for a given multiplyer, do that
  // contact-length*n times. This helps to populate the table.
  const multiplyer = 8;
  for (let i = 0; i < multiplyer; i++) {
      for(let j = 0; j < myJSON.contacts.length; j++)
          createRow(myJSON.contacts[j]);
  }
})();
// DEBUGGING FUNCTION
