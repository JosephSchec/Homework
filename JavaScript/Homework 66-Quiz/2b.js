//2b

window.app = (function (appItem) {
    'use strict';
    let howmany = 0;
    appItem.createCounter = () => {
        howmany++;
        appItem.logHowMany = () => { console.log('there are ' + howmany + ' counters'); };
        return {
            count: 0,
            increment: function () { this.count++; },
            getCurCount: function () {
                console.log(this.count);
            }
        };
    };
    return appItem;
}(window.app || {}));