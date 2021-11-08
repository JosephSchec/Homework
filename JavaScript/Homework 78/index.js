(function () {
    "use strict";
    function Vehicle(color, speed = 0) {
        this.color = color;
        this.speed = speed;
    }
    Vehicle.prototype.go = function (speed = 0) {
        this.speed = speed;
        console.log(`now going at speed ${this.speed}`);
    };
    Vehicle.prototype.print = function () {
        console.log(`This ${this.color} vehicle is going ${this.speed}`);
    };

    const redCar = new Vehicle('Red');
    redCar.go(75);
    redCar.print();

    const greenCar = new Vehicle('Green');
    greenCar.go(55);
    greenCar.print();

    function Plane(color) {
        this.color = color;
    }
    Plane.prototype = Object.create(Vehicle.prototype);
    Plane.prototype.constucter = Plane;

    Plane.prototype.go = function (speed = 0) {
        this.speed = speed;
        console.log(`now flying at speed ${this.speed}`);
    };

    const yellowPlane = new Plane('Yellow');
    yellowPlane.go(300);
    yellowPlane.print();

    const orangePlane = new Plane('Orange');
    orangePlane.go(400);
    orangePlane.print();


}());