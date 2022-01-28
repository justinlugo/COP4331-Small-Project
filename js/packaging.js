// We can seperate js files into "components", very similar to Java with classes.
const urlBase = "http://cop4331small.xyz/LAMPAPI";
const ext = "php";

// Variables for user data
let userId = 0;
let firstName = "";
let lastName = "";

// Register new user
export const newUser = (data) => {
    // packaging the data from the form.
    const myJSON = JSON.stringify(data);
    console.log(myJSON);

    //Attempt to login and check if the user already has an account
    // Register a new user
    userId = 0;
    firstName = "";
    lastName = "";

    let url = urlBase + '/RegisterUser.' + ext;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse(xhr.responseText);
                
                // Show the received JSON for debugging
                document.getElementById("result").textContent = xhr.responseText;
                
                // Check if username is already in the database 
                if (jsonObject.error == "login already in use")
                {
                    document.getElementById("result").textContent = xhr.responseText;
                    
                    return;
                }
                else
                {
                    // Save the user's info into a cookie
                    userId = jsonObject.id;
                    firstName = jsonObject.firstName;
                    lastName = jsonObject.lastName;
                    saveCookie();
                    
                    // Move to the next html page to access contacts
                    window.location.href = "contacts.html";
                }
            }
        };
        xhr.send(myJSON);
    }
    catch(err)
    {
        document.getElementById("result").textContent = err.message;
    }
    
    console.log("New user submitted.");
}

// Function for loggin in as an existing user
export const login = (data) => {
    const myJSON = JSON.stringify(data);
    console.log(myJSON);

    // HTTP post for sending JSON login info.
    userId = 0;
    firstName = "";
    lastName = "";

    let url = urlBase + '/Login.' + ext;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse (xhr.responseText);

                // Show the received JSON for debugging
                document.getElementById("result").textContent = xhr.responseText;
                
                // Saves the users ID
                userId = jsonObject.id;

                if (userId < 1)
                {
                    document.getElementById("result").textContent = "User/Password combination incorrect";
                    return;
                }

                // Saves the users first and last name
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                // Save cookie using ID, first name, and last name
                saveCookie();

                // Move to the next html page to access contacts
                window.location.href = "contacts.html";
            }
        };
        xhr.send(myJSON);
    }
    catch(err)
    {
        document.getElementById("result").textContent = err.message;
    }

    console.log("Login attempt.");
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

// Cookie functions taken from professor's code
export function readCookie()
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
        // If there is no user id stay on index.html
		// window.location.href = "index.html";
	}
	else
	{
        // If there is a user id move to the contacts.html
        window.location.href = "contacts.html";
		// document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}