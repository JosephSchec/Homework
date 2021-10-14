(function () {
    'use strict';
  
    const addContactForm = $('#addContactForm');
    const contactsTable = $('#contactsTable tbody');
    const firstNameInput = $('#first');
    const lastNameInput = $('#last');
    const emailInput = $('#email');
    const phoneInput = $('#phone');
  
    let contacts = [];
  
    $('#addContact').click(() => {
      addContactForm.slideDown('slow');//show();
    });
  
    addContactForm.submit(event => {
      event.preventDefault();
  
      if(!contacts.length) {
        $(':first-child',contactsTable).remove();
      }
  
      const newContact = {
        first: firstNameInput.val(),
        last: lastNameInput.val(),
        email: emailInput.val(),
        phone: phoneInput.val()
      };
  
      contacts.push(newContact);
  
      const row = $(`
          <tr>
            <td>${newContact.first}</td>
            <td>${newContact.last}</td>
            <td>${newContact.email}</td>
            <td>${newContact.phone}</td>
            <td><button>delete</button></td>
          </tr>
      `).appendTo(contactsTable);
  
      row.find('button')
        .click(() => {
          row.remove();
          contacts = contacts.filter(c => c !== newContact);
  
          if (! contacts.length) {
            contactsTable.append(`<tr><td colspan="5">no contacts loaded</td></tr>`);
          }
        });
        hideAndResetAddContactForm();
      });
  
    $('#cancel').click(() => {
      hideAndResetAddContactForm();
    });
  
    function hideAndResetAddContactForm() {
      //addContactForm[0].reset();
      addContactForm.trigger('reset');
  
      addContactForm.slideUp('fast');//hide();
    }
  }());