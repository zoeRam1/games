const original = [
    "src/shrek/1.png",
    "src/shrek/2.png",
    "src/shrek/3.png",
    "src/shrek/4.png",
    "src/shrek/5.png",
    "src/shrek/6.png",
    "src/shrek/7.png",
    "src/shrek/8.png",
];

let images = [...original];
// 0 to 8
let nullSquare = 8;

const grid = document.getElementById("grid");

function populateSquares () {
    images.sort(() => (Math.random() > .5) ? 1 : -1);
    for (let item = 0; item < grid.children.length - 1; item++) {
        grid.children[item].firstChild.src = images[item];
    }
    nullSquare = 8;
}

const resetButton = document.getElementById("reset");
resetButton.addEventListener('click', populateSquares);

populateSquares();

function swapNull (tile) {
    const temp = grid.children[tile].innerHTML;
    grid.children[tile].innerHTML = grid.children[nullSquare].innerHTML;
    grid.children[nullSquare].innerHTML = temp;
    nullSquare = tile;
}

function moveUp() {
    if (nullSquare >= 6 && nullSquare < 9) return;
    // swap with tile below
    swapNull (nullSquare + 3);
}

function moveDown() {
    if (nullSquare >= 0 && nullSquare < 3) return;
    // swap with tile above (-3)
    swapNull (nullSquare - 3);
}

function moveRight() {
    // swap with left
    if (nullSquare === 0 || nullSquare === 3 || nullSquare == 6) return;
    swapNull (nullSquare - 1);
}

function moveLeft() {
    // swap with right
    if (nullSquare === 2 || nullSquare === 5 || nullSquare == 8) return;
    swapNull (nullSquare + 1);
}

function checkWin() {
    for (let item = 0; item < grid.children.length - 1; item++) {
        if (grid.children[item].firstChild.src !== original[item]) return false;
    }
    console.log(grid.children);
    return true;
}

function move(event) {
    console.log(event.key);
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
    if (checkWin()) {
        alert("WON!!");
    }
}
// event listeners up down left right
document.addEventListener('keydown', event => move(event));