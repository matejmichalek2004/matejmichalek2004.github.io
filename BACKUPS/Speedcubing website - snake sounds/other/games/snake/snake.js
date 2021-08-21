import { getInputDirection } from './input.js';
import { gridSize } from './grid.js';

export const snakeSpeed = 7;
const snakeBody = [{ x: 8, y: 8 }];
let newSegments = 0;

export function update() {
    addSegments();

    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;

    // pass through walls
    if (snakeBody[0].x > gridSize) {
        snakeBody[0].x = 1;
    }
    if (snakeBody[0].x < 1) {
        snakeBody[0].x = gridSize;
    }
    if (snakeBody[0].y > gridSize) {
        snakeBody[0].y = 1;
    }
    if (snakeBody[0].y < 1) {
        snakeBody[0].y = gridSize;
    }

    // document.getElementById('score').textContent = snakeBody.length -1
}

export function draw(game) {
    document.getElementsByClassName('score')[0].textContent =
        snakeBody.length - 1;
    document.getElementsByClassName('score')[1].textContent =
        snakeBody.length - 1;
    snakeBody.forEach((segment) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        game.appendChild(snakeElement);
    });
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPositions(segment, position);
    });
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody[snakeBody.length] = { ...snakeBody[snakeBody.length - 1] };
    }
    newSegments = 0;
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true });
}
