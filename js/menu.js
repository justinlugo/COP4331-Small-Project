// importing the functions from packaging.js as a library.
import * as packaging from './packaging.js';

const menu = document.getElementById('menu');

// Signup button is clicked.
menu.querySelector('#signup').addEventListener('click', () => {
    const formSignup = menu.querySelector('#form-signup');
    const formLogin = menu.querySelector('#form-login');
    // if the user decided they want to signup instead of login, we will need
    // to remove the login form dynamically.
    if (formLogin != null) formLogin.remove();
   
    // check if signup has already been clicked.
    if (formSignup == null) {
        // Create a wrapper for the form and children.
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'form-signup');

        // Creating a form.
        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        
        // A field for the first name.
        const inputFirst = document.createElement('input');
        inputFirst.setAttribute('type', 'text');
        inputFirst.setAttribute('name', 'firstName');
        inputFirst.setAttribute('placeholder', "First Name");

        // A field for the last name.
        const inputLast = document.createElement('input');
        inputLast.setAttribute('type', 'text');
        inputLast.setAttribute('name', 'lastName');
        inputLast.setAttribute('placeholder', "Last Name");

        // Email
        const inputEmail = document.createElement('input');
        // inputEmail.setAttribute('type', 'text');
        // Input of type email is possible with HTML5 it might be useful for
        // error checking in the future.
        inputEmail.setAttribute('type', 'email');
        inputEmail.setAttribute('name', 'email');
        inputEmail.setAttribute('placeholder', "Email");

        // Username
        const inputUser = document.createElement('input');
        inputUser.setAttribute('type', 'text');
        inputUser.setAttribute('name', 'login');
        inputUser.setAttribute('placeholder', "Username");

        // Password
        const inputPass = document.createElement('input');
        inputPass.setAttribute('type', 'password');
        inputPass.setAttribute('name', 'password');
        inputPass.setAttribute('placeholder', "Password");

        // Now with all these elements created, we need to append them to the form.
        // form.appendChild(inputName);
        form.appendChild(inputFirst);
        form.appendChild(inputLast);
        form.appendChild(inputUser);
        form.appendChild(inputPass);
        form.appendChild(inputEmail);
        
        // Creating the submit button.
        const submitBtn = document.createElement('button');
        submitBtn.setAttribute('id', 'submit');
        submitBtn.textContent = "Submit";
        
        // Append the form and button inside the wrapper div.
        wrapper.appendChild(form);
        wrapper.appendChild(submitBtn);

        // Append our dynamically created elements to the menu.
        menu.appendChild(wrapper);

        // if result span is active, remove it.
        let result = menu.querySelector('#result');
        if (result != null) result.remove();

        // Create a span for the result
        result = document.createElement('span');
        result.setAttribute('id', 'result');
        menu.appendChild(result);
    } 
})

// Existing user button is clicked.
menu.querySelector('#existing').addEventListener('click', () => {
    const loginCheck = menu.querySelector('#form-login');
    const formSignup = menu.querySelector('#form-signup');

    // if signup form is active, remove it.
    if (formSignup != null) formSignup.remove();

    if (loginCheck == null) {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'form-login');

        const form = document.createElement('form');
        form.setAttribute('method', 'post');

        const inputUser = document.createElement('input');
        inputUser.setAttribute('type', 'text');
        // Needed to change the name to login for proper API
        inputUser.setAttribute('name', 'login');
        inputUser.setAttribute('placeholder', "Username");

        const inputPass = document.createElement('input');
        inputPass.setAttribute('type', 'password');
        inputPass.setAttribute('name', 'password');
        inputPass.setAttribute('placeholder', "Password");

        const loginBtn = document.createElement('button');
        loginBtn.setAttribute('id', 'login');
        loginBtn.textContent = "Login";

        form.appendChild(inputUser);
        form.appendChild(inputPass);
        wrapper.appendChild(form);
        wrapper.appendChild(loginBtn);

        menu.appendChild(wrapper);

        // if result span is active, remove it.
        let result = menu.querySelector('#result');
        if (result != null) result.remove();

        // Create a span for the result
        result = document.createElement('span');
        result.setAttribute('id', 'result');
        menu.appendChild(result);
    }
})

// Since the submit and login buttons are dynamically created, we will need to 
// use "event delegation" to handle these elements when interacted with.

// Submit button is clicked, in the signup form.
document.addEventListener('click', (e) => {
    if (e.target.id == 'submit') {
        // Takes the info from the form-signup and puts it in an object called data
        const form = menu.querySelector('#form-signup').getElementsByTagName('form');
        // We use form[0] as form is type HTML Collection; an array essentialy.
        const data = Object.fromEntries(new FormData(form[0]).entries());

        // Get the result span and clear the text that is in it
        let result = document.getElementById("result");
        result.textContent = "";

        // Loop through the data object and check to make sure the value are not empty
        for (const [key, value] of Object.entries(data)) {
            // Use string trim function to remove leading and trailing whitespace
            data[key] = value.trim();
            // Check if any entry field is empty and stop the submission and let the user know
            if (value == "") {
                result.textContent = `${key} is empty`;
                console.log(`${key}:is empty`);
                return;
            }
        }

        // This section: pulls plaintext password, hashes it, and replaces it in object
        // Comment this to not hash passwords
        data["password"] = md5(data["password"]);
        packaging.newUser(data);
    }
});

// Login button is clicked.
document.addEventListener('click', (e) => {
    if (e.target.id == 'login') {
        // Takes the info from the form-signup and puts it in an object called data
        const form = menu.querySelector('#form-login').getElementsByTagName('form');
        const data = Object.fromEntries(new FormData(form[0]).entries());

        // Get the result span and clear the text that is in it
        let result = document.getElementById("result");
        result.textContent = "";

        // Loop through the data object and check to make sure the value are not empty
        for(const [key, value] of Object.entries(data)) {
            
            // Use string trim function to remove leading and trailing whitespace
            data[key] = value.trim();

            // Check if any entry field is empty and stop the submission and let the user know
            if (value == "") {
                result.textContent = `${key} is empty`;
                console.log(`${key}:is empty`);
                return;
            }
        }

        // This section: pulls plaintext password, hashes it, and replaces it in object
        // Comment this to not hash passwords
        data["password"] = md5(data["password"]);
        packaging.login(data);
    }
});