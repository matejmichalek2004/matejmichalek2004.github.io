let inputDirection = { x: 0, y: 0 };
let lastInputDirection;

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
        case "w":
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown":
        case "s":
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
        case "a":
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight":
        case "d":
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

// there was last function

// let touchstartX = 0;
// let touchstartY = 0;
// let touchendX = 0;
// let touchendY = 0;

// const gestureZone = document.getElementById('game');

// gestureZone.addEventListener('touchstart', function(event) {
//     touchstartX = event.changedTouches[0].screenX;
//     touchstartY = event.changedTouches[0].screenY;
// }, false);

// gestureZone.addEventListener('touchend', function(event) {
//     touchendX = event.changedTouches[0].screenX;
//     touchendY = event.changedTouches[0].screenY;
//     handleGesture();
// }, false);

// function handleGesture() {
//     if (touchendX <= touchstartX) {
//         alert('Swiped left');
//     }

//     if (touchendX >= touchstartX) {
//         alert('Swiped right');
//     }

//     if (touchendY <= touchstartY) {
//         alert('Swiped up');
//     }

//     if (touchendY >= touchstartY) {
//         alert('Swiped down');
//     }
// }

function swipedetect(el, callback) {
    let swipedir;
    let startX;
    let startY;
    let distX;
    let distY;
    let threshold = 150; //required min distance traveled to be considered swipe
    let restraint = 500; // maximum distance allowed at the same time in perpendicular direction
    let allowedTime = 700; // maximum time allowed to travel that distance
    let elapsedTime;
    let startTime;
    let handleswipe = callback || function (swipedir) {};

    el.addEventListener(
        "touchstart",
        function (e) {
            var touchobj = e.changedTouches[0];
            swipedir = "none";
            dist = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface
            e.preventDefault();
        },
        false
    );

    el.addEventListener(
        "touchmove",
        function (e) {
            e.preventDefault(); // prevent scrolling when inside DIV
        },
        false
    );

    el.addEventListener(
        "touchend",
        function (e) {
            var touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
            distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
            elapsedTime = new Date().getTime() - startTime; // get time elapsed
            if (elapsedTime <= allowedTime) {
                // first condition for awipe met
                if (
                    Math.abs(distX) >= threshold &&
                    Math.abs(distY) <= restraint
                ) {
                    // 2nd condition for horizontal swipe met
                    swipedir = distX < 0 ? "left" : "right"; // if dist traveled is negative, it indicates left swipe
                } else if (
                    Math.abs(distY) >= threshold &&
                    Math.abs(distX) <= restraint
                ) {
                    // 2nd condition for vertical swipe met
                    swipedir = distY < 0 ? "up" : "down"; // if dist traveled is negative, it indicates up swipe
                }
            }
            handleswipe(swipedir);
            e.preventDefault();
        },
        false
    );
}

//USAGE:
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
    swipedir contains either "none", "left", "right", "top", or "down"
    if (swipedir =='left')
        alert('You just swiped left!')
})
*/

window.addEventListener(
    "touchstart",
    function () {
        const el = document.getElementById("game");
        swipedetect(el, function (swipedir) {
            console.log("its working");
            if (swipedir == "left") {
                alert("You just swiped left!");
            }
        });
    },
    false
);

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}
