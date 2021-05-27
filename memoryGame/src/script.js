const grid = document.getElementById("grid");
const score = document.getElementById("score");
const resetButton = document.getElementById("reset");

let currentScore = 0;
let combination = [];
let currPoint = 0;
const timeTile = 500;
const timeBetween = 1500;

function resetGame() {
    combination = [];
    currentScore = 0;
    score.innerText = currentScore;
    setTimeout(() => {
        nextRound();
    }, timeBetween);
}

resetButton.addEventListener('click', resetGame);


function makeGreenPlay(index) {
    if (index === null || index < 0 || index >= 9) return;
    // console.log(index);
    // then set timeout to change colour back
    
    return new Promise((resolve) => {
        grid.children[index].style.backgroundColor = "green";
        setTimeout(() => {
            grid.children[index].style.backgroundColor = "lightgray";
            resolve();
        }, timeTile);
    });
}

// play the combination - timers
async function playComb () {
    for (item of combination) {
        await makeGreenPlay(item);
    }
}


// add to combination
function addComb () {
    const newNum = ((Math.round(Math.random() * 10)) % 9); // 0 - 8
    console.log(newNum)
    combination.push(newNum);
}

function setUnclickable() {
    for (let i = 0; i < 9; i++) {
        grid.children[i].removeEventListener('click', makeGreenClick);
    }
}

// switch to green 
function makeGreenClick(event) {
    event.target.style.backgroundColor = "green";
    setTimeout(() => {
        event.target.style.backgroundColor = "lightgray";
    }, timeTile);
    // then set timeout to change colour back
}

function recordAnswers(event) {
    makeGreenClick(event);
    if (event.target.id != combination[currPoint]) {
        console.log("WRONG, restarting...")
        resetGame();
    }
    currPoint++;
    if (currPoint === combination.length) {
        console.log("CORRECT! Next round")
        currentScore++;
        score.innerText = currentScore;
        setTimeout(() => {
            nextRound();
        }, timeBetween);
    }
}

function setClickable() {
    for (let i = 0; i < 9; i++) {
        grid.children[i].addEventListener('click', recordAnswers);
    }
}

async function nextRound () {
    setUnclickable();
    addComb();
    await playComb();
    currPoint = 0;
    setClickable();
}


for (let i = 0; i < 9; i++) {
    grid.children[i].setAttribute("id", i);
}

nextRound();
