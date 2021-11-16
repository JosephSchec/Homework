(function () {
    "use strict";
    class Vehicle {
        static numOfVehicles = 0;

        static showNumOfV() {
            console.log(`there ar ${Vehicle.numOfVehicles} vehicles`);
        }
        constructor(color) {
            this.color = color;
            Vehicle.numOfVehicles++;
        }
        go(speed = 0) {
            this.speed = speed;
            console.log(`now going speed ${speed}`);
        }
        print() {
            console.log(`this ${this.color} vehicle is going ${this.speed}`);
        }
    }
    const redCar = new Vehicle('Red');
    redCar.go(75);
    redCar.print();
    Vehicle.showNumOfV();

    class Plane extends Vehicle {
        constructor(color) {
            super(color);
        }
        go(speed = 0) {
            this.speed = speed;
            console.log(`now flying at speed ${speed}`);
        }
    }
    const bluePlane = new Plane('blue');
    bluePlane.go(200);
    bluePlane.print();


    ////////////////
    function Printable() { }
    Printable.prototype.print = function () {
        console.log(`${this} is printed`);
    };

    function Drawable() { }
    Drawable.prototype.draw = function () {
        console.log(`${this} is drawn`);
    };


    function PrintableAndDrawable() { }
    PrintableAndDrawable.prototype = Object.create(Printable.prototype);
    Object.assign(PrintableAndDrawable.prototype, Drawable.prototype);
    PrintableAndDrawable.prototype.constructer = PrintableAndDrawable;

    const pad = new PrintableAndDrawable();
    pad.print();
    pad.draw();
}());