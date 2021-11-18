(function () {
    "use strict";
    const canvas = document.getElementById('myCanvas');
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const context = canvas.getContext('2d');

    class Ant {
        constructor(width, color) {
            this.width = width;
            this.color = color;
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.dx = 1;
            this.dy = 1;
        }

        draw() {
            context.fillStyle = this.color;

            context.beginPath();

            context.fillRect(this.x, this.y, this.width, this.width);
            context.fill();


            this.x += this.dx;
            this.y += this.dy;

            if (this.y < 0 || this.y > canvas.height - this.width) {
                this.dy = -this.dy;
            }
            if (this.x < 0 || this.x > canvas.width - this.width) {
                this.dx = -this.dx;
            }
        }
        moveRandom() {
            this.dx = random();
            this.dy = random();
            this.x += this.dx;
            this.y += this.dy;
        }
        smartAnts() {
            setTimeout(() => { 
                this.dx=random();
                this.dy=random();
                this.x += this.dx;
                this.y += this.dy;
            }, 1);
                setInterval(() => { 
                this.dx=smartRandom();
                this.dy=smartRandom();
                this.x += this.dx;
                this.y += this.dy;
            }, randomTime());
        }
    }
    function random() {
        return Math.floor(Math.random() * 5) - 1;
    }
    function smartRandom() {
        return Math.round(Math.random()) * 2 - 1;
    }
    function randomTime(){
       return Math.floor(Math.random() * (5000)) + 1000;
    }

    const ants = [];

    /*for (let i = 0; i < 100; i++) {
        const randomAnts = new Ant(2, 'Black');
        randomAnts.moveRandom();
        ants.push(randomAnts);
    }*/
    for (let i = 0; i < 100; i++) {
        const smrtAnts = new Ant(5, 'Red');
        smrtAnts.smartAnts();
        ants.push(smrtAnts);
    }


    document.getElementById('form').addEventListener('submit', e => {
        e.preventDefault();
        const color = document.getElementById('color');
        const howMany = document.getElementById('howMany');
        for (let i = 0; i < howMany.value; i++) {
            const newAnt = new Ant(3, color.value);
            newAnt.draw();
            //newAnt.moveRandom();
            newAnt.smartAnts();
            ants.push(newAnt);
        }
    });


    setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        ants.forEach(b => b.draw());
    }, 10);

}());