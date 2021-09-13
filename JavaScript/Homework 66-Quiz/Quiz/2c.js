(function () {
    'use strict';
    //window
    for (let i = 0; i < 10; i++) {
        window.app.increment();
    }
    window.app.getCurCount(); // SL - I asked for all counts at end (to prove that theey dont change accidentially by other code)

    //file 2b
    let counter1 = window.app.createCounter();
    for (let i = 0; i < 5; i++) {
        counter1.increment();
    }
    counter1.getCurCount();

    let counter2 = window.app.createCounter();
    for (let i = 0; i < 15; i++) {
        counter2.increment();
    }
    counter2.getCurCount();
    //keeps track
    window.app.logHowMany();
}());

// SL - nice
// SL - grade - 93