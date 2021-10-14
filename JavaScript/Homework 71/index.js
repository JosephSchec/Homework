(function () {
    "use strict";
    $(`<form id="form">
            <label for="fileName"></label>
            <input id="fileName" name="fileName">
            <button id="load">Load</button>
        </form>
        <div id="myFile"></div>`).appendTo('body');


    $('#form').submit(e => {
        e.preventDefault();
        loading();

        fetch(`./samples/${$('#fileName').val()}`)
            .then(r => {
                if (!r.ok) {
                    console.error(`${r.status} ${r.statusText}`);
                    return 'Nothing Found';
                }
                return r.text();
            })
            .then(t => {
                stopLoading();
                $('#myFile').text(t);
            });
    });


    function loading() {
        $('<div id="loading">Loading... </div>').appendTo('body');
    }
    function stopLoading() {
        $('#loading').remove();
    }

}());