const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WINDOW_WIDTH = 600;
const WINDOW_HEIGHT = 400;
const CELL_SIZE = 20;
const FPS_START = 4;
const FPS_MAX = 15;
const FPS_INCREMENT = 0.5;

const BG_COLOR = '#AAD751';
const BG_COLOR_ALT = '#A2D149';
const SNAKE_COLOR = '#2B5912';
const SNAKE_BORDER = '#1B380C';
const FOOD_COLOR = '#CC3333';
const FOOD_HIGHLIGHT = '#FF6666';
const TEXT_COLOR = '#2B5912';

const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

class Snake {
    constructor() {
        this.body = [
            [CELL_SIZE * 5, CELL_SIZE * 5],
            [CELL_SIZE * 4, CELL_SIZE * 5],
            [CELL_SIZE * 3, CELL_SIZE * 5]
        ];
        this.direction = RIGHT;
        this.grow = false;
    }

    headPosition() {
        return this.body[0];
    }

    changeDirection(newDirection) {
        const opposites = {
            [UP]: DOWN,
            [DOWN]: UP,
            [LEFT]: RIGHT,
            [RIGHT]: LEFT
        };
        if (newDirection !== opposites[this.direction]) {
            this.direction = newDirection;
        }
    }

    move() {
        let [x, y] = this.headPosition();

        if (this.direction === UP) y -= CELL_SIZE;
        else if (this.direction === DOWN) y += CELL_SIZE;
        else if (this.direction === LEFT) x -= CELL_SIZE;
        else if (this.direction === RIGHT) x += CELL_SIZE;

        this.body.unshift([x, y]);

        if (this.grow) {
            this.grow = false;
        } else {
            this.body.pop();
        }
    }

    growSnake() {
        this.grow = true;
    }

    checkCollision() {
        const [x, y] = this.headPosition();
        if (x < 0 || x >= WINDOW_WIDTH || y < 0 || y >= WINDOW_HEIGHT) {
            return true;
        }

        for (let i = 1; i < this.body.length; i++) {
            if (x === this.body[i][0] && y === this.body[i][1]) {
                return true;
            }
        }
        return false;
    }

    draw() {
        this.body.forEach(segment => {
            ctx.fillStyle = SNAKE_COLOR;
            ctx.fillRect(segment[0], segment[1], CELL_SIZE, CELL_SIZE);
            ctx.strokeStyle = SNAKE_BORDER;
            ctx.lineWidth = 2;
            ctx.strokeRect(segment[0], segment[1], CELL_SIZE, CELL_SIZE);
        });
    }
}

class Food {
    constructor() {
        this.position = [0, 0];
    }

    randomize(snakeBody) {
        while (true) {
            const x = Math.floor(Math.random() * (WINDOW_WIDTH / CELL_SIZE)) * CELL_SIZE;
            const y = Math.floor(Math.random() * (WINDOW_HEIGHT / CELL_SIZE)) * CELL_SIZE;
            
            let collision = false;
            for (let segment of snakeBody) {
                if (x === segment[0] && y === segment[1]) {
                    collision = true;
                    break;
                }
            }
            
            if (!collision) {
                this.position = [x, y];
                break;
            }
        }
    }

    draw() {
        ctx.fillStyle = FOOD_COLOR;
        ctx.fillRect(this.position[0], this.position[1], CELL_SIZE, CELL_SIZE);
        ctx.fillStyle = FOOD_HIGHLIGHT;
        ctx.fillRect(this.position[0] + 4, this.position[1] + 4, CELL_SIZE / 3, CELL_SIZE / 3);
    }
}

class Game {
    constructor() {
        this.running = true;
        this.gameOver = false;
        this.paused = false;
        this.resetGame();
        this.setupControls();
        this.lastTime = 0;
        this.gameLoop();
    }

    resetGame() {
        this.snake = new Snake();
        this.food = new Food();
        this.food.randomize(this.snake.body);
        this.score = 0;
        this.currentFps = FPS_START;
        this.gameOver = false;
        this.updateScore();
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) {
                if (e.code === 'Space') {
                    this.resetGame();
                }
                return;
            }

            if (e.code === 'Escape') {
                this.paused = !this.paused;
                return;
            }

            if (this.paused) return;

            switch(e.code) {
                case 'ArrowUp':
                    this.snake.changeDirection(UP);
                    break;
                case 'ArrowDown':
                    this.snake.changeDirection(DOWN);
                    break;
                case 'ArrowLeft':
                    this.snake.changeDirection(LEFT);
                    break;
                case 'ArrowRight':
                    this.snake.changeDirection(RIGHT);
                    break;
            }
        });
    }

    update() {
        if (this.gameOver || this.paused) return;

        this.snake.move();

        const [headX, headY] = this.snake.headPosition();
        if (headX === this.food.position[0] && headY === this.food.position[1]) {
            this.snake.growSnake();
            this.food.randomize(this.snake.body);
            this.score++;
            
            if (this.currentFps < FPS_MAX) {
                this.currentFps = Math.min(this.currentFps + FPS_INCREMENT, FPS_MAX);
            }
            this.updateScore();
        }

        if (this.snake.checkCollision()) {
            this.gameOver = true;
        }
    }

    drawCheckeredBackground() {
        for (let row = 0; row < WINDOW_HEIGHT / CELL_SIZE; row++) {
            for (let col = 0; col < WINDOW_WIDTH / CELL_SIZE; col++) {
                const color = (row + col) % 2 === 0 ? BG_COLOR : BG_COLOR_ALT;
                ctx.fillStyle = color;
                ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }

    draw() {
        this.drawCheckeredBackground();
        this.food.draw();
        this.snake.draw();

        if (this.gameOver) {
            ctx.fillStyle = 'rgba(43, 89, 18, 0.8)';
            ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

            ctx.fillStyle = BG_COLOR;
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2 - 30);

            ctx.font = 'bold 32px Arial';
            ctx.fillText(`Puntaje: ${this.score}`, WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2 + 20);

            ctx.fillStyle = BG_COLOR_ALT;
            ctx.font = '24px Arial';
            ctx.fillText('Presiona ESPACIO para reiniciar', WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2 + 70);
        }

        if (this.paused && !this.gameOver) {
            ctx.fillStyle = 'rgba(43, 89, 18, 0.6)';
            ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

            ctx.fillStyle = BG_COLOR;
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('PAUSA', WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        }
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('speed').textContent = this.currentFps.toFixed(1);
    }

    gameLoop(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        const frameTime = 1000 / this.currentFps;

        if (deltaTime >= frameTime) {
            this.update();
            this.draw();
            this.lastTime = currentTime;
        }

        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

window.onload = () => {
    new Game();
};
