'use strict';
// 1
const days = (function () {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];
    return {
        dayToNumber: (dayOfWeek) => weekDays.findIndex(wd => wd.toLowerCase() === dayOfWeek.toLowerCase()) + 1,
        numberToDay: n => weekDays[n - 1]
    };
})();
console.log(days.dayToNumber('Tuesday'));
console.log(days.numberToDay(6));

// 2
const interest = (function (principle) {
    return {
        setRate: 0.015,
        setYears: 3,
        calculate: function () { return (principle * this.setRate) * this.setYears; }
    };
})(100);

console.log(interest.calculate());

interest.setRate = 0.01;
interest.setYears = 5;
console.log(interest.calculate());


