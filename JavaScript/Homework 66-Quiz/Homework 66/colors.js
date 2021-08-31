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


    function addToTable() {
        const myTable = document.getElementById('myTable');
        const row = myTable.insertRow();
        const dateCell = row.insertCell();
        const colorCell = row.insertCell();
        const backgroundCell = row.insertCell();
        let date = new Date();
        dateCell.innerText = date.toLocaleString();
        colorCell.innerText = document.body.style.color;
        backgroundCell.innerText = document.body.style.backgroundColor;

        row.addEventListener('click', function () {
            setCss(document.body, 'color', colorCell.innerText);
            setCss(document.body, 'backgroundColor', backgroundCell.innerText);
            clearInterval(intervalId);
            intervalId = undefined;
            btn.innerText = 'Restart The Show';
        });
    }

    const btn = document.getElementById('button');
    let intervalId;
    btn.addEventListener('click', function () {
        if (!intervalId) {
            setTimeout(changeIt, 1);
            intervalId = setInterval(function () {
                changeIt();
                addToTable();
            }, 1000);
            btn.innerText = 'End The Show';

        } else {
            clearInterval(intervalId);
            intervalId = undefined;
            btn.innerText = 'Restart The Show';
        }
    });



}());