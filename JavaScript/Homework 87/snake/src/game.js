import './snake.css'
import snakeHeadImg from '../media/snake.png'
import redAppleImg from '../media/apple.png'
import crash from '../media/crash.mp3'
import Snake  from './snake.js'
import Apple from './apple.js'
import { canvas,context,THING_SIZE  } from './constants.js'



const crashSound = new Audio(crash);

function resizeCanvas() {
    canvas.width = (window.innerWidth - 2) - ((window.innerWidth - 2) % THING_SIZE);
    canvas.height = (window.innerHeight - 2) - ((window.innerHeight - 2) % THING_SIZE);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();


let snake;
let apple;

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = 'bold 30px Arial';
    context.fillText(`Score: ${this.score}`, canvas.width - 160, 40);

    snake.move();
    apple.draw();

    if (!this.gameOver) {
        setTimeout(gameLoop, this.speed);
    } else {
        context.font = 'bold 30px Arial';
        context.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
        crashSound.currentTime = 0;
        crashSound.play();
    }
}

const snakeHead = new Image();
snakeHead.src = snakeHeadImg;
snakeHead.onload = () => {
    snake = new Snake();
    setTimeout(gameLoop, this.speed);
};

const appleImg = new Image();
appleImg.src = redAppleImg;
appleImg.onload = () => {
    apple = new Apple();
};

