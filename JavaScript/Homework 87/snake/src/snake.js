import { THING_SIZE } from "./constants.js";
import crunch from '../media/crunch.mp3';
const crunchSound = new Audio(crunch);

export default class Snake {
    constructor(canvas, snakeImg, apple, gameIsOver ,ateApple) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.snakeHead = snakeImg;
        this.apple = apple;
        this.gameIsOver = gameIsOver;
        this.ateApple=ateApple;

        this.seg = [{ x: 0, y: 0 }];
        this.direction = 'ArrowRight';

        document.addEventListener('keydown', event => {
            switch (event.key) {
                case 'ArrowUp':
                    if (this.seg.length === 1 || this.direction !== 'ArrowDown') {
                        this.direction = event.key;
                    } break;
                case 'ArrowDown':
                    if (this.seg.length === 1 || this.direction !== 'ArrowUp') {
                        this.direction = event.key;
                    } break;
                case 'ArrowLeft':
                    if (this.seg.length === 1 || this.direction !== 'ArrowRight') {
                        this.direction = event.key;
                    } break;
                case 'ArrowRight':
                    if (this.seg.length === 1 || this.direction !== 'ArrowLeft') {
                        this.direction = event.key;
                    } break;
            }
        });

        this.draw();
    }

    draw() {
        this.context.drawImage(this.snakeHead, this.seg[0].x, this.seg[0].y, THING_SIZE, THING_SIZE);

        for (let i = 1; i < this.seg.length; i++) {
            this.context.fillStyle = 'green';
            this.context.fillRect(this.seg[i].x, this.seg[i].y, THING_SIZE, THING_SIZE);

        }
    }

    move() {
        let head = this.seg[0];
        let tail = this.seg.pop();
        let x = head.x;
        let y = head.y;
        let gameOver = false;
        

        switch (this.direction) {
            case 'ArrowRight':
                x += THING_SIZE;
                break;
            case 'ArrowLeft':
                x -= THING_SIZE;
                break;
            case 'ArrowUp':
                y -= THING_SIZE;
                break;
            case 'ArrowDown':
                y += THING_SIZE;
                break;
        }

        if (x < 0 || x > this.canvas.width - THING_SIZE || y < 0 || y > this.canvas.height - THING_SIZE) {
            gameOver = true;
        } else {
            tail.x = x;
            tail.y = y;
            this.seg.unshift(tail);
        }

        for (let i = 3; i < this.seg.length - 1; i++) {
            if (this.seg[i].x === x && this.seg[i].y === y) {
                gameOver = true;
            } else {
                this.gameIsOver();
            }
        }

        if (head.x === this.apple.x && head.y === this.apple.y && !gameOver) {
            this.seg.push({ x: tail.x, y: tail.y });
            crunchSound.currentTime = 0;
            crunchSound.play();
            this.apple.move();
            this.ateApple();
        }
        this.draw();
    }
}