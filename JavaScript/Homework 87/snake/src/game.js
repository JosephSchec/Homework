import './snake.css'
import snakeHeadImg from '../media/snake.png'
import redAppleImg from '../media/apple.png'
import crash from '../media/crash.mp3'
import Snake from './snake.js'
import Apple from './apple.js'
import { THING_SIZE } from './constants.js'

const canvas = document.getElementById('theCanvas');
const context = canvas.getContext('2d');
const crashSound = new Audio(crash);

function resizeCanvas() {
    canvas.width = (window.innerWidth - 2) - ((window.innerWidth - 2) % THING_SIZE);
    canvas.height = (window.innerHeight - 2) - ((window.innerHeight - 2) % THING_SIZE);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();


let snake;
let apple;
let gameOver = false;
let score = 0;
let speed = 500;
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = 'bold 30px Arial';
    context.fillText(`Score: ${score}`, canvas.width - 160, 40);

    snake.move();
    apple.draw();

    if (!gameOver) {
        setTimeout(gameLoop, speed);
    }
}

function gameIsOver() {
    this.gameOver = true;
    context.font = 'bold 30px Arial';
    context.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
    crashSound.currentTime = 0;
    crashSound.play();
}

function ateApple() {
    score++;
    speed = speed * .09;
}

const snakeHead = new Image();
snakeHead.src = snakeHeadImg;


const appleImg = new Image();
appleImg.src = redAppleImg;


function imgLoading(img) {
    return new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
    });
}

Promise.all([
    imgLoading(snakeHeadImg),
    imgLoading(redAppleImg)
]).then(() => {
    apple = new Apple(canvas, appleImg);
    snake = new Snake(canvas, snakeHead, apple, gameIsOver(), ateApple());
    gameLoop();
})
