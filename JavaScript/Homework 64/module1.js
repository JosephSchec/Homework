
window.myApp = window.myApp || {};
window.myApp.Utils = (function (fillMyApp) {
    'use strict';
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];
    fillMyApp.dayToNumber = (dayOfWeek) => weekDays.findIndex(wd => wd.toLowerCase() === dayOfWeek.toLowerCase()) + 1,
        fillMyApp.numberToDay = n => weekDays[n - 1];
    return fillMyApp;
}(window.myApp || {}));
