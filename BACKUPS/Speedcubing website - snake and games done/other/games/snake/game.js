import {
    update as updateSnake,
    draw as drawSnake,
    snakeSpeed,
    getSnakeHead,
    snakeIntersection,
    checkWin,
} from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
// import { outsideGrid } from "./grid.js";
// import { positionOnTouch } from './input.js'

let lastRenderTime = 0;
const game = document.getElementById('game');
let gameOver = false;
let win = false;

function main(currentTime) {
    if (gameOver) {
        return (
            $('#game').css('z-index', '0'),
            $('.gameOverMsg, .gameOverBg').css({
                transform: 'translateY(-50%) scale(1)',
            }),
            $('#audio-gameover').prop('volume', 0.3),
            $('#audio-gameover').get(0).play()
        );
    }
    if (win) {
        return (
            // prenastaveni textu
            $('.gameOverMsg h1').text('Gratulace!'),
            $('.score-div-center p').text(''),
            $('.score-div-center .score').text('Dohrál jsi hru'),
            // zobrazeni okna
            $('#game').css('z-index', '0'),
            $('.gameOverMsg, .gameOverBg').css({
                transform: 'translateY(-50%) scale(1)',
            }),
            $('#audio-win').prop('volume', 0.3),
            $('#audio-win').get(0).play()
        );
    }

    window.requestAnimationFrame(main);
    const secondSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondSinceLastRender < 1 / snakeSpeed) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    // positionOnTouch()
    updateSnake();
    updateFood();

    checkDeath();
}

function draw() {
    game.innerHTML = '';
    drawSnake(game);
    win = checkWin();
    drawFood(game);
}

function checkDeath() {
    // gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
    gameOver = snakeIntersection();
}
