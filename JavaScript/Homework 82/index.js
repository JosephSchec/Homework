(function () {
    'use strict';

    const canvas = document.getElementById('theCanvas');
    const context = canvas.getContext('2d');

    const THING_SIZE = 64;

    function resizeCanvas() {
        canvas.width = (window.innerWidth - 2) - ((window.innerWidth - 2) % THING_SIZE);
        canvas.height = (window.innerHeight - 2) - ((window.innerHeight - 2) % THING_SIZE);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const crashSound = document.getElementById('crash');
    const crunchSound = document.getElementById('crunch');

    let gameOver = false;
    let score = 0;
    let speed = 500;
    let gotApple = false;
    class Snake {
        constructor() {
            this.x = 0;
            this.y = 0;
            this.direction = 'ArrowRight';

            document.addEventListener('keydown', event => {
                switch (event.key) {
                    case 'ArrowUp':
                    case 'ArrowDown':
                    case 'ArrowLeft':
                    case 'ArrowRight':
                        this.direction = event.key;
                }
            });

            this.draw();
        }

        draw() {
            context.drawImage(snakeHead, this.x, this.y, THING_SIZE, THING_SIZE);
        }

        move() {
            let x = this.x;
            let y = this.y;
            let length = 1;

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

            if (x < 0 || x > canvas.width - THING_SIZE || y < 0 || y > canvas.height - THING_SIZE) {
                gameOver = true;
            } else {
                this.x = x;
                this.y = y;
            }

            if (this.x === apple.x && this.y === apple.y) {
                score++;
                speed = speed * 0.9;
                crunchSound.currentTime = 0;
                crunchSound.play();
                apple.move();
                this.grow();
                length++;
            }
            this.draw();
        }
        grow() {
            gotApple = true;
            this.move();
            //NOT FINISHED
        }

    }

    class Apple {
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

    let snake;
    let apple;

    function gameLoop() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.font = 'bold 30px Arial';
        context.fillText(`Score: ${score}`, canvas.width - 160, 40);

        snake.move();
        apple.draw();
        if (gotApple) {
            snake.grow();
        }
        if (!gameOver) {
            setTimeout(gameLoop, speed);
        } else {
            context.font = 'bold 30px Arial';
            context.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
            crashSound.currentTime = 0; // in case it was playing
            crashSound.play();
        }
    }

    const snakeHead = new Image();
    snakeHead.src = 'media/snake.png';
    snakeHead.onload = () => {
        snake = new Snake();
        setTimeout(gameLoop, speed);
    };

    const appleImg = new Image();
    appleImg.src = 'media/apple.png';
    appleImg.onload = () => {
        apple = new Apple();
    };
}());
