// We can seperate js files into "components", very similar to Java with classes.
const urlBase = "http://cop4331small.xyz";
const ext = "php";

export const newUser = (data) => {
    // packaging the data from the form.
    const myJSON = JSON.stringify(data);
    console.log(myJSON);
    


    console.log("New user submitted.");
}

export const login = (data) => {
    const myJSON = JSON.stringify(data);
    console.log(myJSON);

    // HTTP post for sending JSON login info.
    let userId = 0;
    let url = urlBase + '/LAMPAPI/Login.' + ext;
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
                userId = jsonObject.id;

                if (userId < 1)
                {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
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
        document.getElementById("loginResult").innerHTML = err.message;
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