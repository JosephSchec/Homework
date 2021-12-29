import { THING_SIZE , canvas, context } from "./constants.js";
import appleImg from '../media/apple.png'
export default class Apple {
    constructor() {
        this.move();
    }

    draw() {
        context.drawImage(appleImg, this.x, this.y, THING_SIZE, THING_SIZE);
    }

    move() {
        this.x = this.getRandomNumber(0, canvas.width - 1);//THING_SIZE);
        this.y = this.getRandomNumber(0, canvas.height - 1);//THING_SIZE);
        this.draw();
    }

    getRandomNumber(min, max) {
        let r = Math.floor(Math.random() * (max - min + 1)) + min;
        r = r - r % THING_SIZE;
        return r;
    }
}