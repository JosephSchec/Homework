(function () {
    "use strict";
    class Person {
        constructor(first, last, age, grade) {
            this.first = first;
            this.last = last;
            this.age = age;
            this.grade = grade;
        }
    }
    const joe = new Person('Joe', 'Biden', 112, 42);
    const donald = new Person('Donald', 'Trump', 80, 72);
    const john = new Person('John', 'Doe', 35, 93);

    const studentsArr = [joe, donald, john];

    function printStudents(order, ...students) {
        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            let { first, last } = student;
            if (order === 'f') {
                console.log(`${first} ,${last} age is ${student.age} , grade is ${student.grade}`);
            }
            else {
                console.log(`${last} ,${first} age is ${student.age} , grade is ${student.grade}`);
            }
        }
    }

    printStudents('f', ...studentsArr);
    console.log('-----------------last then first---------------');
    printStudents('l', ...studentsArr);

    ///////////////////////////
    function copy(person) {
        const { first, last, ...rest } = person;
        const p = new Person(last, first);
        Object.assign(p, rest);
        return p;
    }
    const copyOfJohn = copy(john);
    console.log(copyOfJohn);

}());