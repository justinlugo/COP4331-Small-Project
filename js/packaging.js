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
                document.getElementById("result").innerHTML = xhr.responseText;
                
                // Currently this check will always pass, unless actual error occurs
                //
                // Check if user was created successfully 
                if (jsonObject.error == "")
                {
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
        document.getElementById("result").innerHTML = err.message;
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
                document.getElementById("result").innerHTML = xhr.responseText;
                
                userId = jsonObject.id;

                if (userId < 1)
                {
                    document.getElementById("result").innerHTML = "User/Password combination incorrect";
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();

                // Move to the next html page to access contacts
                window.location.href = "contacts.html";
            }
        };
        xhr.send(myJSON);
    }
    catch(err)
    {
        document.getElementById("result").innerHTML = err.message;
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