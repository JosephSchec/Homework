window.myApp = window.myApp || {};
window.myApp.Utils = (function (fillMyApp) {
    'use strict';
    fillMyApp.stringCaseInsensitiveEquals = (string1, string2) => string1.toLowerCase() === string2.toLowerCase();
    return fillMyApp;
}(window.myApp.Utils || {}));