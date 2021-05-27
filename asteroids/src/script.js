const rowType = document.getElementsByClassName("row")[0];
const grid = document.getElementById("grid");
const playerRow = document.getElementById("playerRow");
const height = 6;
const width = 5;
let alive = true;
const playerIcon = document.createElement("img");
playerIcon.src = "src/icon.png";

const asteroidIcon = document.createElement("img");
asteroidIcon.src = "src/asteroid.png";

const blowIcon = document.createElement("img");
blowIcon.src = "src/explode.png";

let currPlayerInd = 2;
for (i in [...Array(height-1).keys()]) {
    const newRow = rowType.cloneNode(true);
    grid.insertBefore(newRow, grid.firstChild);
}

for (i in [...Array(width).keys()]) {
    playerRow.children[i].id = `${i}`;
}

playerRow.children[currPlayerInd].appendChild(playerIcon);

function randomNum(max) {
    return (Math.round(Math.random() * 10) % max);
}
function spawnAsteroid() {
    return new Promise ((resolve) => {
        const random = randomNum(width);
        const newAsteroid = asteroidIcon.cloneNode();
        grid.children[0].children[random].appendChild(newAsteroid);
        resolve();
    })
}

function moveDown() {
    return new Promise ((resolve, reject) => {
        for (let row = width; row >= 0; row--) {
            // if asteroid in last row
            for (col in [...Array(width).keys()]) {
                // if asteroid in last row
                if (row === height - 1 && grid.children[row].children[col].hasChildNodes()) {
                    resolve(false);
                } else if (row > 0 && grid.children[row - 1].children[col].hasChildNodes()) {
                    grid.children[row].children[col].innerHTML = grid.children[row - 1].children[col].innerHTML;
                    grid.children[row - 1].children[col].innerHTML = "";
                }
            }        
        }
        resolve(true);
    });
}

function moveAsteroidsDown() {
    const moving = setInterval(async function () {
        const success = await moveDown();
        if (success) {
            await spawnAsteroid();
        } else {
            clearInterval(moving);
            alive = false;
            alert('YOU LOST!!');
        }
    }, 1000);
}

moveAsteroidsDown();

function movePlayer(offset) {
    const possInd = currPlayerInd + offset;
    if (possInd < 0 || possInd >= 5) return;
    // remove child
    playerRow.children[currPlayerInd].removeChild(playerIcon);
    currPlayerInd = possInd;
    playerRow.children[currPlayerInd].appendChild(playerIcon);
}

function asteroidBlow(row, col) {
    return new Promise((resolve) => {
        grid.children[row].children[col].innerHTML = "";
        grid.children[row].children[col].appendChild(blowIcon.cloneNode());
        resolve();
    });
}

function asteroidGone(row, col) {
    return new Promise((resolve) => {
        setTimeout(() => {
            grid.children[row].children[col].innerHTML = "";
            resolve();
        }, 0);
    });
}

async function fireBeam() {
    for (let row = width; row >= 0; row--) {
        // hits asteroid
        if (grid.children[row].children[currPlayerInd].hasChildNodes()) {
            // await asteroidBlow(row, currPlayerInd);
            await asteroidGone(row, currPlayerInd);
            break;
        }
    }
}

function move(event) {
    if (!alive) return;
    switch(event.key) {
        case "ArrowLeft":
            movePlayer(-1);
            break;
        case "ArrowRight":
            movePlayer(1);
            break;
        case " ":
            fireBeam();
            break;
    }
}


document.addEventListener('keydown', move)