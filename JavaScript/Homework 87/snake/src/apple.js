import { THING_SIZE  } from "./constants.js";

export default class Apple {
    constructor(canvas, appleImg) {
        this.canvas=canvas;
        this.context = canvas.getContext('2d');
        this.appleImg=appleImg;
        this.move();
    }

    draw() {
        this.context.drawImage(this.appleImg, this.x, this.y, THING_SIZE, THING_SIZE);
    }

    move() {
        this.x = this.getRandomNumber(0, this.canvas.width - 1);//THING_SIZE);
        this.y = this.getRandomNumber(0, this.canvas.height - 1);//THING_SIZE);
        this.draw();
    }

    getRandomNumber(min, max) {
        let r = Math.floor(Math.random() * (max - min + 1)) + min;
        r = r - r % THING_SIZE;
        return r;
    }
}