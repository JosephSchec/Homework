//1
(function () {
    'use strict';
    function myMap(arr, callBack) {
        let newArr = [];
        arr.forEach(thing => {

            newArr.push(callBack(thing));
        });

        return newArr;
    }
    const doubleArr = [1, 2, 3, 4];
    console.log(myMap(doubleArr, n => n * 2));
}());