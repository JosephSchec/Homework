(function () {
    'use strict';

    const myTable = get('contactsTable');
    const myContacts = [];
    const myForm = get('myForm');

    function get(id) {
        return document.getElementById(id);
    }
    function hideResetForm() {
        myForm.reset();
        myForm.style.display = 'none';
    }

    const firstInput = get('First');
    const lastInput = get('Last');
    const emailInput = get('Email');
    const phoneInput = get('Phone');

    // removes first line once if first contact is loaded
    let firstLineRemoved = true;

    get('addBtn').addEventListener('click', () => {
        myForm.style.display = 'block';
    });

    myForm.addEventListener('submit', event => {
        event.preventDefault();

        if (myContacts.length === 0 && firstLineRemoved) {
            myTable.deleteRow(1);
            firstLineRemoved = false;
        }

        const newContact = {
            first: firstInput.value,
            last: lastInput.value,
            email: emailInput.value,
            phone: phoneInput.value
        };
        myContacts.push(newContact);

        hideResetForm();

        const row = myTable.insertRow();
        const firstNameCell = row.insertCell();
        const lastNameCell = row.insertCell();
        const emailCell = row.insertCell();
        const phoneCell = row.insertCell();

        firstNameCell.innerText = newContact.first;
        lastNameCell.innerText = newContact.last;
        emailCell.innerText = newContact.email;
        phoneCell.innerText = newContact.phone;
        // DELETE BUTTON
        const deleteCell = row.insertCell();
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete Contact';
        deleteCell.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
            if (myContacts.indexOf(row)) {
                myTable.deleteRow(myContacts.indexOf(row));
                myContacts.pop(myContacts.indexOf(row));
            }
            if (myContacts.length === 0) {
                let firstRowReset = myTable.insertRow();
                firstRowReset.innerText = 'no contacts loaded';
                firstRowReset.style.border = '1px Solid Black';
                firstLineRemoved = true;
            }
        });
    });
    get('cancel').addEventListener('click', () => {
        hideResetForm();
    });
}());