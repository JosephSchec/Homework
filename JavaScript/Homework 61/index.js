'use strict';

//#1 

let letters = ['a', 'b', 'c'];
function myEvery(arr, test) {
    let allTrue = false;
    arr.forEach(item => {
        if (test(item)) {
            allTrue = true;
        } else { return false; }
    });
    return allTrue;
}

console.log(myEvery(letters, l => l === l.toUpperCase()));
console.log(myEvery(letters, l => l === l.toLowerCase()));

console.log(letters.every(l => l === l.toUpperCase()));
console.log(letters.every(l => l === l.toLowerCase()));


//#2 

let someLetters = ['a', 'B', 'c'];

/*for some reason foreach returned undefined*/
function mySome(arr, test) {
    for (let i = 0; i < arr.length; i++) {
        if (test(arr[i])) {
            return true;
        }
    } return false;

}

console.log(mySome(someLetters, l => l === l.toUpperCase()));
console.log(mySome(someLetters, l => l === l.toLowerCase()));

console.log(someLetters.some(l => l === l.toUpperCase()));
console.log(someLetters.some(l => l === l.toLowerCase()));


//#3

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function onlyIf(arr, test, action) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (test(arr[i])) {
            newArr.push(action(arr[i]));
        }
    } return newArr;
}

console.log(onlyIf(numbers, n => n % 2 === 0, n => n + 10));


//#4

function onlyIfWithFilter(arr, test, action) {
    let newArr = [];
    let passed = arr.filter(test);
    passed.forEach(passedItem => {
        newArr.push(action(passedItem));
    }
    );
    return newArr;
}

console.log(onlyIfWithFilter(numbers, n => n % 2 === 0, n => n + 10));


//closure #1

function multiply(a, b) {
    return a * b;
}
console.log(multiply(7, 5));
console.log(multiply(3, 8));

//closure #2

function getMultiplyer() {
    return function (a, b) {
        return a * b;
    };
}
let myMultiplyer = getMultiplyer();
console.log(myMultiplyer(6, 5));

//closure #3

function getMultiplyer2(a) {
    return function (b) {
        return a * b;
    };
}
let multiplyByFive = getMultiplyer2(5);
console.log(multiplyByFive(2));

let multiplyBySix = getMultiplyer2(6);
console.log(multiplyBySix(2));
