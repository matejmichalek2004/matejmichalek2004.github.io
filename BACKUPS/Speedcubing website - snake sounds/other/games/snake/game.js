import {
    update as updateSnake,
    draw as drawSnake,
    snakeSpeed,
    getSnakeHead,
    snakeIntersection,
} from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
// import { outsideGrid } from "./grid.js";
// import { positionOnTouch } from './input.js'

let lastRenderTime = 0;
const game = document.getElementById('game');
let gameOver = false;

function main(currentTime) {
    if (gameOver) {
        return (
            // $(".gameOverBg, .gameOverMsg").css("visibility", "visible"),
            // $(".gameOverBg, .gameOverMsg").css({
            //     transform: "translateY( + -50% + ) scale(" + 1 + ")",
            // })
            $('#game').css('z-index', '0'),
            $('.gameOverMsg, .gameOverBg').css({
                transform: 'translateY(-50%) scale(1)',
            }),
            $('#audio-gameover').get(0).play()
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
    drawFood(game);
}

function checkDeath() {
    // gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
    gameOver = snakeIntersection();
}
