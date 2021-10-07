(function () {
    "use strict";
    const $ = window.jQuery;
    function setForm() {
        $(`<form>
            <label for="name">Name:</label>
            <input id="name" name="name">
            <label for="address">Address:</label>
            <input id="address" name="address">
            <button id='submit'>Submit</button>
            <input type="checkbox" name="check" id="check">
       </form>`).appendTo('body');
    }
    function displayText() {
        $('#submit').click((e) => {
            e.preventDefault();
            if ($('#check').prop("checked")) {
                let name = $('#name');
                let add = $('#address');
                $('<div></div>').appendTo('body').text(`Name: ${name.val()} Address: ${add.val()}`);
                add.val('');
                name.val('');
            }
        });
    }

    setForm();
    displayText();


}());