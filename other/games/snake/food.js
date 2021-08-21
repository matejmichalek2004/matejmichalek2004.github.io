import { onSnake, expandSnake, snakeBody } from './snake.js';
import { randomGridPosition, gridSize } from './grid.js';

let food = getRandomFoodPosition();
const expansionRate = 1;

export function update() {
    if (onSnake(food)) {
        expandSnake(expansionRate);
        if (snakeBody.length < gridSize * gridSize) {
            food = getRandomFoodPosition();
        }
        $('#audio-grow').prop('volume', 0.2);
        $('#audio-grow').get(0).play();
    }
}

export function draw(game) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    game.appendChild(foodElement);
}

function getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}
