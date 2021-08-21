let inputDirection = { x: 0, y: 0 };
let lastInputDirection;

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
        case 's':
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
        case 'a':
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
        case 'd':
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0 };
            break;
    }
});

// $(".content").onSwipe(function(results){

//     if(results.up == true) {
//     inputDirection = {x: 0, y: -1}}

//     if(results.right == true) {
//     inputDirection = {x: 1, y: 0}}

//     if(results.down == true) {
//     inputDirection = {x: 0, y: 1}}

//     if(results.left == true) {
//     inputDirection = {x: -1, y: 0}}
// });

var myElement = document.getElementById('content');
// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);
// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
// listen to events...
mc.on('panleft panright panup pandown tap press', function (ev) {
    // myElement.textContent = ev.type + ' gesture detected.';
    if (ev.type == 'panup') {
        if (lastInputDirection.y !== 0) return;
        inputDirection = { x: 0, y: -1 };
    }
    if (ev.type == 'pandown') {
        if (lastInputDirection.y !== 0) return;
        inputDirection = { x: 0, y: 1 };
    }
    if (ev.type == 'panleft') {
        if (lastInputDirection.x !== 0) return;
        inputDirection = { x: -1, y: 0 };
    }
    if (ev.type == 'panright') {
        if (lastInputDirection.x !== 0) return;
        inputDirection = { x: 1, y: 0 };
    }
});

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}
