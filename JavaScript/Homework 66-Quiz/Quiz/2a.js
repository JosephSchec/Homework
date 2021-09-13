//2a
window.app = (function (appItem) {
    'use strict';
    let count = 0;
    appItem.increment = () => count++;
    appItem.getCurCount = () => console.log(count); // SL - this should return the count, not log it. WHo says caller wants to log it?
    return appItem;
}(window.app || {}));

// SL - nice - but your counter is in app, would be better to be in something like app.counter, given that we have a bunvh of