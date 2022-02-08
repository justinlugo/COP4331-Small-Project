// importing the functions from packaging.js as a library.
import * as packaging from './packaging.js';

const main = document.getElementById('main');
const menu = document.getElementById('menu');
main.onLoad = packaging.readCookie();

function createInputField(type, name, placeholder) {
    const inputField = document.createElement('input');
    inputField.setAttribute('type', type);
    inputField.setAttribute('name', name);
    inputField.setAttribute('placeholder', placeholder);
    inputField.required = true;

    return inputField;
}

// Signup button is clicked.
menu.querySelector('#signup').addEventListener('click', () => {
    const formSignup = menu.querySelector('#form-signup');
    const formLogin = menu.querySelector('#form-login');
    // If the user decided they want to signup instead of login, we will need
    // to remove the login form dynamically.
    if (formLogin != null) formLogin.remove();
   
    document.getElementById('title').getElementsByTagName('span')[0].textContent = '';

    // Check if signup has already been clicked.
    if (formSignup == null) {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'form-signup');

        const form = document.createElement('form');
        form.setAttribute('method', 'post');

        form.appendChild(createInputField('text',     'firstName', 'First Name'));
        form.appendChild(createInputField('text',     'lastName',  'Last Name'));
        form.appendChild(createInputField('text',     'login',     'User Name'));
        form.appendChild(createInputField('email',    'email',     'Email'));
        form.appendChild(createInputField('password', 'password',  'Password'));

        const submitBtn = document.createElement('button');
        submitBtn.setAttribute('id', 'submit');
        submitBtn.textContent = "Submit";
        
        // Append the form and button inside the wrapper div.
        wrapper.appendChild(form);
        wrapper.appendChild(submitBtn);

        menu.appendChild(wrapper);
        
        // if result span is active, remove it.
        let result = menu.querySelector('#result');
        if (result != null) result.remove();

        // Create a span for the result
        result = document.createElement('span');
        result.setAttribute('id', 'result');
        menu.appendChild(result);
    } 
});

// Existing user button is clicked.
menu.querySelector('#existing').addEventListener('click', () => {
    const loginCheck = menu.querySelector('#form-login');
    const formSignup = menu.querySelector('#form-signup');

    // if signup form is active, remove it.
    if (formSignup != null) formSignup.remove();

    if (loginCheck == null) {

        document.getElementById('title').getElementsByTagName('span')[0].textContent = '';

        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'form-login');

        const form = document.createElement('form');
        form.setAttribute('method', 'post');

        const loginBtn = document.createElement('button');
        loginBtn.setAttribute('id', 'login');
        loginBtn.textContent = "Login";

        form.appendChild(createInputField('text'    , 'login'   , 'Username'));
        form.appendChild(createInputField('password', 'password', 'Password'));
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
});

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
                // console.log(`${key}:is empty`);
                return;
            }

            // Checks if email is valid
            if (data[key] == data['email'])
            {
                if (!data['email'].match(/(.+)@((.+){2,})\.((.+){2,})/))
                {
                    result.textContent = `Please enter a valid email`;
                    return;
                }
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
                // console.log(`${key}:is empty`);
                return;
            }
        }
        // This section: pulls plaintext password, hashes it, and replaces it in object
        // Comment this to not hash passwords
        data["password"] = md5(data["password"]);
        packaging.login(data);
    }
});