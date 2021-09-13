//2b

window.app = (function (appItem) {
    'use strict';
    let howmany = 0;
    appItem.createCounter = () => {
        howmany++;
        appItem.logHowMany = () => { console.log('there are ' + howmany + ' counters'); };
        return {
            count: 0, // SL - this is not as private as it could be.Can still be changed from outside by doing myCounter.count = ... better would be to move this out of object and into function - then closures can still use it - but nobody else can get at it.
            increment: function () { this.count++; }, // SL - and thats why you couldnt use arrow function here like you di in other... if it was in function, not object, it would be this. and you could use arrow...
            getCurCount: function () {
                console.log(this.count); // SL - this should return the count, not log it. WHo says caller wants to log it?
            }
        };
    };
    return appItem;
}(window.app || {}));

// SL - nice