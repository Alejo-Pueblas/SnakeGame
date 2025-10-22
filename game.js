// Configuración del juego
const WINDOW_WIDTH = 600;
const WINDOW_HEIGHT = 400;
const CELL_SIZE = 20;
const FPS_START = 4;
const FPS_MAX = 15;
const FPS_INCREMENT = 0.5;

// Colores
const BG_COLOR = 'rgb(170, 215, 81)';
const BG_COLOR_ALT = 'rgb(162, 209, 73)';
const SNAKE_COLOR = 'rgb(43, 89, 18)';
const SNAKE_BORDER = 'rgb(27, 56, 12)';
const FOOD_COLOR = 'rgb(204, 51, 51)';
const FOOD_HIGHLIGHT = 'rgb(255, 102, 102)';
const TEXT_COLOR = 'rgb(43, 89, 18)';
const GAME_OVER_BG = 'rgba(43, 89, 18, 0.78)';

// Direcciones
const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

// Canvas y contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Elementos del DOM
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('finalScore');
const gameOverElement = document.getElementById('gameOver');

// Clase Snake
class Snake {
    constructor() {
        this.body = [
            { x: CELL_SIZE * 5, y: CELL_SIZE * 5 },
            { x: CELL_SIZE * 4, y: CELL_SIZE * 5 },
            { x: CELL_SIZE * 3, y: CELL_SIZE * 5 }
        ];
        this.direction = RIGHT;
        this.grow = false;
    }

    headPosition() {
        return this.body[0];
    }

    changeDirection(newDirection) {
        const oppositeDirections = {
            [UP]: DOWN,
            [DOWN]: UP,
            [LEFT]: RIGHT,
            [RIGHT]: LEFT
        };
        
        if (newDirection !== oppositeDirections[this.direction]) {
            this.direction = newDirection;
        }
    }

    move() {
        const head = this.headPosition();
        let x = head.x;
        let y = head.y;

        if (this.direction === UP) {
            y -= CELL_SIZE;
        } else if (this.direction === DOWN) {
            y += CELL_SIZE;
        } else if (this.direction === LEFT) {
            x -= CELL_SIZE;
        } else if (this.direction === RIGHT) {
            x += CELL_SIZE;
        }

        const newHead = { x, y };
        this.body.unshift(newHead);

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
        const head = this.headPosition();
        
        // Colisión con paredes
        if (head.x < 0 || head.x >= WINDOW_WIDTH || head.y < 0 || head.y >= WINDOW_HEIGHT) {
            return true;
        }

        // Colisión con el cuerpo
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }

        return false;
    }

    draw() {
        this.body.forEach(segment => {
            // Dibujar segmento
            ctx.fillStyle = SNAKE_COLOR;
            ctx.fillRect(segment.x, segment.y, CELL_SIZE, CELL_SIZE);
            
            // Dibujar borde
            ctx.strokeStyle = SNAKE_BORDER;
            ctx.lineWidth = 2;
            ctx.strokeRect(segment.x, segment.y, CELL_SIZE, CELL_SIZE);
        });
    }
}

// Clase Food
class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
    }

    randomize(snakeBody) {
        let validPosition = false;
        
        while (!validPosition) {
            const x = Math.floor(Math.random() * (WINDOW_WIDTH / CELL_SIZE)) * CELL_SIZE;
            const y = Math.floor(Math.random() * (WINDOW_HEIGHT / CELL_SIZE)) * CELL_SIZE;
            
            // Verificar que no esté en el cuerpo de la serpiente
            validPosition = true;
            for (let segment of snakeBody) {
                if (segment.x === x && segment.y === y) {
                    validPosition = false;
                    break;
                }
            }
            
            if (validPosition) {
                this.position = { x, y };
            }
        }
    }

    draw() {
        // Dibujar comida
        ctx.fillStyle = FOOD_COLOR;
        ctx.fillRect(this.position.x, this.position.y, CELL_SIZE, CELL_SIZE);
        
        // Dibujar highlight
        ctx.fillStyle = FOOD_HIGHLIGHT;
        ctx.fillRect(
            this.position.x + 4,
            this.position.y + 4,
            CELL_SIZE / 3,
            CELL_SIZE / 3
        );
    }
}

// Clase Game
class Game {
    constructor() {
        this.running = true;
        this.gameOver = false;
        this.resetGame();
        this.setupEventListeners();
        this.lastFrameTime = 0;
    }

    resetGame() {
        this.snake = new Snake();
        this.food = new Food();
        this.food.randomize(this.snake.body);
        this.score = 0;
        this.currentFps = FPS_START;
        this.gameOver = false;
        this.updateScore();
        gameOverElement.classList.add('hidden');
    }

    setupEventListeners() {
        document.addEventListener('keydown', (event) => {
            if (this.gameOver) {
                if (event.key === ' ') {
                    this.resetGame();
                } else if (event.key === 'Escape') {
                    this.running = false;
                }
            } else {
                switch (event.key) {
                    case 'ArrowUp':
                        event.preventDefault();
                        this.snake.changeDirection(UP);
                        break;
                    case 'ArrowDown':
                        event.preventDefault();
                        this.snake.changeDirection(DOWN);
                        break;
                    case 'ArrowLeft':
                        event.preventDefault();
                        this.snake.changeDirection(LEFT);
                        break;
                    case 'ArrowRight':
                        event.preventDefault();
                        this.snake.changeDirection(RIGHT);
                        break;
                }
            }
        });
    }

    update() {
        if (this.gameOver) {
            return;
        }

        this.snake.move();

        // Verificar si comió la comida
        const head = this.snake.headPosition();
        if (head.x === this.food.position.x && head.y === this.food.position.y) {
            this.snake.growSnake();
            this.food.randomize(this.snake.body);
            this.score++;
            this.updateScore();

            // Incrementar velocidad
            if (this.currentFps < FPS_MAX) {
                this.currentFps = Math.min(this.currentFps + FPS_INCREMENT, FPS_MAX);
            }
        }

        // Verificar colisión
        if (this.snake.checkCollision()) {
            this.gameOver = true;
            this.showGameOver();
        }
    }

    drawCheckeredBackground() {
        const rows = WINDOW_HEIGHT / CELL_SIZE;
        const cols = WINDOW_WIDTH / CELL_SIZE;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
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
    }

    updateScore() {
        scoreElement.textContent = this.score;
        finalScoreElement.textContent = this.score;
    }

    showGameOver() {
        gameOverElement.classList.remove('hidden');
    }

    run(timestamp) {
        if (!this.running) {
            return;
        }

        // Control de FPS
        const frameDelay = 1000 / this.currentFps;
        const deltaTime = timestamp - this.lastFrameTime;

        if (deltaTime >= frameDelay) {
            this.update();
            this.draw();
            this.lastFrameTime = timestamp;
        }

        requestAnimationFrame((ts) => this.run(ts));
    }
}

// Iniciar el juego
const game = new Game();
requestAnimationFrame((timestamp) => game.run(timestamp));
