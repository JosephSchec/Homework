(function () {
    'use strict';
    function random() {
        return Math.floor(Math.random() * 256);
    }
    function setCss(element, property, value) {
        element.style[property] = value;
    }
    function createColor() {
        return `rgb(${random()},${random()},${random()})`;
    }
    function changeIt() {
        setCss(document.body, 'color', createColor());
        setCss(document.body, 'backgroundColor', createColor());
    }

    const btn = document.getElementById('button');
    let intervalId;
    btn.addEventListener('click', function () {
        if (!intervalId) {
            setTimeout(changeIt, 1);
            intervalId = setInterval(changeIt, 1000);
            btn.innerText = 'End The Show';
        } else {
            clearInterval(intervalId);
            intervalId = undefined;
            btn.innerText = 'Restart The Show'; 
        }
    });
}());