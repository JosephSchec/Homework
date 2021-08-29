//2a
window.app = (function (appItem) {
    'use strict';
    let count = 0;
    appItem.increment = () => count++;
    appItem.getCurCount = () => console.log(count);
    return appItem;
}(window.app || {}));