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

        // A field for the full name.
        const inputName = document.createElement('input');
        inputName.setAttribute('type', 'text');
        inputName.setAttribute('name', 'fullname');
        inputName.setAttribute('placeholder', "Full Name");

        // Email
        const inputEmail = document.createElement('input');
        inputEmail.setAttribute('type', 'text');
        inputEmail.setAttribute('name', 'email');
        inputEmail.setAttribute('placeholder', "Email");

        // Username
        const inputUser = document.createElement('input');
        inputUser.setAttribute('type', 'text');
        inputUser.setAttribute('name', 'username');
        inputUser.setAttribute('placeholder', "Username");

        // Password
        const inputPass = document.createElement('input');
        inputPass.setAttribute('type', 'password');
        inputPass.setAttribute('name', 'password');
        inputPass.setAttribute('placeholder', "Password");

        // // Verify Password
        // const checkPass = document.createElement('input');
        // checkPass.setAttribute('type', 'password');
        // checkPass.setAttribute('name', 'checkpass');
        // checkPass.setAttribute('placeholder', "Retype Password")

        // Phone
        const inputPhone = document.createElement('input');
        inputPhone.setAttribute('type', 'text');
        inputPhone.setAttribute('name', 'phone');
        inputPhone.setAttribute('placeholder', "Phone");

        // Now with all these elements created, we need to append them to the form.
        form.appendChild(inputName);
        form.appendChild(inputUser);
        form.appendChild(inputPass);
        //form.appendChild(checkPass);
        form.appendChild(inputEmail);
        form.appendChild(inputPhone);

        // Creating the submit button.
        const submitBtn = document.createElement('button');
        submitBtn.setAttribute('id', 'submit');
        submitBtn.textContent = "Submit";

        // Append the form and button inside the wrapper div.
        wrapper.appendChild(form);
        wrapper.appendChild(submitBtn);

        // Append our dynamically created elements to the menu.
        menu.appendChild(wrapper);
    } 
})

// Existing user button is clicked.
menu.querySelector('#existing').addEventListener('click', () => {
    // if signup form is active, remove it.
    const formSignup = menu.querySelector('#form-signup');
    if (formSignup != null) formSignup.remove();

    const loginCheck = menu.querySelector('#form-login');
    if (loginCheck == null) {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'form-login');

        const form = document.createElement('form');
        form.setAttribute('method', 'post');

        const inputUser = document.createElement('input');
        inputUser.setAttribute('type', 'text');
        inputUser.setAttribute('name', 'username');
        inputUser.setAttribute('placeholder', "Username");

        const inputPass = document.createElement('input');
        inputPass.setAttribute('type', 'password');
        inputPass.setAttribute('placeholder', "Password");

        const loginBtn = document.createElement('button');
        loginBtn.setAttribute('id', 'login');
        loginBtn.textContent = "Login";

        form.appendChild(inputUser);
        form.appendChild(inputPass);
        wrapper.appendChild(form);
        wrapper.appendChild(loginBtn);

        menu.appendChild(wrapper);
    }
})

// Since the submit and login buttons are dynamically created, we will need to 
// use "event delegation" to handle these elements when interacted with.

// Submit button is clicked, in the signup form.
document.addEventListener('click', (e) => {
    if (e.target.id == 'submit') {
        // do the php magic here.
        packaging.newUser();
    }
});

// Login button is clicked.
document.addEventListener('click', (e) => {
    if (e.target.id == 'login') {
        packaging.login();
    }
});

