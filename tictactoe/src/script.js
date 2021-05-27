// possible extensions:
// make css really pretty
// keep tally of who wins
// have a 10 second timer for each turn


let state = [
    [ null, null, null ],
    [ null, null, null ],
    [ null, null, null ]
];

let currentPlayer = 'o';
let turn = 0;
let canPlay = 1;

let board = document.getElementById("table");



function populateBoard() {
    for (let ind1 = 0; ind1 < board.children.length; ind1++) {
        let row = board.children[ind1];
        for (let ind2 = 0; ind2 < row.children.length; ind2++) {
            row.children[ind2].innerText = state[ind1][ind2];
        }
    }
}
function resetGame() {
    state = [
        [ null, null, null ],
        [ null, null, null ],
        [ null, null, null ]
    ];
    currentPlayer = 'o';
    turn = 0;
    canPlay = 1;
    populateBoard();
}

function getNextPlayer() {
    currentPlayer = (currentPlayer === 'x' ? 'o' : 'x');
    return currentPlayer;
}

function checkWinHorizontal (player) {
    let won = true;
    for (let row = 0; row < 3; row++) {
        won = true;
        // check 0,0 0,1 0,2 so horizontal wins
        for (let col = 0; col < 3; col++) {
            // horizontal wins
            if (state[row][col] !== player) {
                won = false;
                break;
            }
        }
        if (won) {
            return won;
        }
    }
    return won;
}

function checkWinVertical (player) {
    let won = true;
    for (let row = 0; row < 3; row++) {
        won = true;
        for (let col = 0; col < 3; col++) {
            // vertical wins
            if (state[col][row] !== player) {
                won = false;
                break;
            }
        }
        if (won) {
            return won;
        }
    }
    return won;
}

function checkWinDiagonal(player) {
    return ((state[0][0] === player 
        && state[1][1] === player
        && state[2][2] === player)
        || 
        (state[2][0] === player 
        && state[1][1] === player
        && state[0][2] === player));
}

function checkWinner (player) {
    if (checkWinHorizontal(player) 
    || checkWinVertical(player)
    || checkWinDiagonal(player)) {
        alert("Game has been won by " + player + "!");
        canPlay = 0;
    } else if (turn == state.length * state[0].length) {
        alert("Game lost! Try again :'c");
        canPlay = 0;
    }
}

function fillCell(row, col) {
    if (state[row][col] !== null || canPlay === 0) return;
    turn++;
    const next = getNextPlayer();
    state[row][col] = next;
    populateBoard();
    checkWinner(next);
}

function linkCell() {
    for (let ind1 = 0; ind1 < board.children.length; ind1++) {
        let row = board.children[ind1];
        for (let ind2 = 0; ind2 < row.children.length; ind2++) {
            row.children[ind2].addEventListener('click', function (event) {
                fillCell(ind1, ind2);
            });
        }
    } 
}

const restartButton = document.getElementById("restart");
restartButton.addEventListener('click', resetGame);
linkCell();