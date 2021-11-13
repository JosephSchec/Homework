(function () {
    "use strict";
    class Vehicle{
        constructor(color){
            this.color=color;
        }
        go(speed=0){
            this.speed=speed;
            console.log(`now going speed ${speed}`);
        }
        print(){
            console.log(`this ${this.color} vehicle is going ${this.speed}`);
        }
    }
    const redCar=new Vehicle('Red');
    redCar.go(75);
    redCar.print();

    class Plane extends Vehicle{
        constructor(color){
            super(color);
        }
        go(speed=0){
            this.speed=speed;
            console.log(`now flying at speed ${speed}`);
        }
    }
    const bluePlane=new Plane('blue');
    bluePlane.go(200);
    bluePlane.print();

}());