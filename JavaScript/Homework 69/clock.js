
window.clock = (function () {
    "use strict";
    const $ = window.jQuery;
    function createClock() {
        $(`<div id="clock">
        <div class="hour"></div>
        <span>:</span>
        <div class="min"></div>
        <span>:</span>
        <div class="sec"></div>
    </div>`).appendTo('body');
    }

    function setClock() {
        let d = new Date();
        let hours = d.getHours() - 12 < 10 ? '0' + String(d.getHours() - 12) : d.getHours();
        let minutes = d.getMinutes() < 10 ? '0' + String(d.getMinutes()) : d.getMinutes();
        let seconds = d.getSeconds() < 10 ? '0' + String(d.getSeconds()) : d.getSeconds();
        $('.hour').text(hours);
        $('.min').text(minutes);
        $('.sec').text(seconds);
    }
    return {
        create: function () {
            createClock();
            setInterval(() => setClock(), 1000);
        }
    };
})();