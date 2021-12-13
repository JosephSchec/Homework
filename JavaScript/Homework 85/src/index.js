import $ from 'jquery';
import './css/index.css';

const pickedColor = $('#color');
const changeBackground = $('#changeColor');
changeBackground.click(() => {
    $('body').css('background-color', pickedColor.val());

});

