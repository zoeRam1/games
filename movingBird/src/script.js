const player = document.getElementById("player");
const moveOffset = 20;
let currMoving;
const pond = document.getElementById("pond");

function movePlayer (x, y) {
    const style = window.getComputedStyle(player);
    const playerRect = player.getBoundingClientRect();
    const currLeft = parseInt(style.left, 10);
    const currTop = parseInt(style.top, 10);
    // const currLeft = playerRect.left;
    // const currTop = playerRect.top;
    const pondRect = pond.getBoundingClientRect();
    console.log(pondRect);
    console.log(currLeft, currTop)
    if (currLeft + x + playerRect.left  >= pondRect.left
        && currLeft + x + playerRect.width <= pondRect.right
        && currTop + y + playerRect.top >= pondRect.top
        && currTop + y + playerRect.height <= pondRect.bottom) 
    {
            player.style.left = currLeft + x + "px";
            player.style.top = currTop + y + "px";

    }

}

function movePromise (x, y) {
    // return new Promise ((resolve, reject) => {
        clearInterval(currMoving);
        currMoving = setInterval(() => {
            movePlayer (x, y);
            // resolve();
        }, 300);
    // });
}

function stopPlayer() {
    clearInterval(currMoving);
}

function move (event) {
    switch (event.key) {
        case "ArrowUp":
            movePromise(0, -moveOffset);
            break;
        case "ArrowDown":
            movePromise(0, moveOffset);
            break;
        case "ArrowLeft":
            player.style.transform = "scaleX(-1)";
            movePromise(-moveOffset, 0);
            break;
        case "ArrowRight":
            player.style.transform = "";
            movePromise(moveOffset, 0);
            break;
        case " ":
            stopPlayer();
            break;
            
    }
}

document.addEventListener('keydown', move);