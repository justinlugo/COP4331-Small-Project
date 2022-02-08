// Create a table cell
function cell(className, textContent, textTrue, property, inputTrue) {
    const cell = document.createElement('td');
    cell.setAttribute('class', className);
    if (textTrue === true) {
        cell.textContent = textContent;
    } else if (inputTrue === true) {
        const inputField = document.createElement('input');
        inputField.setAttribute('type', "text");
        inputField.placeholder = property;

        cell.appendChild(inputField);
    }
  
    return cell;
}

// Creates a row for the new contact.
function newContact(contact) {
    const row = document.createElement('tr');
    row.appendChild(cell("firstName", contact.firstName, true));
    row.appendChild(cell("lastName",  contact.lastName,  true));
    row.appendChild(cell("email",     contact.email,     true));
    row.appendChild(cell("phone",     contact.phone,     true));
    row.appendChild(cell("id",        contact.id,        true));
    // No need for users to see the ID.
    row.querySelector('.id').setAttribute('style', 'display:none');
      
    return row;
}

function inputRow(inputJSON) {
    const row = document.createElement('tr');
    row.setAttribute('id', 'rowInput');

    row.appendChild(cell("firstName", false, false, inputJSON.firstName, true));
    row.appendChild(cell("lastName",  false, false, inputJSON.lastName,  true));
    row.appendChild(cell("email",     false, false, inputJSON.email,     true));
    row.appendChild(cell("phone",     false, false, inputJSON.phone,     true));

    return row
}

export { newContact, inputRow }