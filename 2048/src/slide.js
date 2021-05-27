let state = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, 2],
];

const colourMatch = {
  null: "#cdc1b4",
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f49b64",
  32: "#f77c5f",
  64: "#f65e3b",
  128: "#edcf72",
}
const boardSize = 4;
const board = document.getElementById("grid");

function populateBoard() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
        board.children[row].children[col].innerText = state[row][col];
        board.children[row].children[col].style.backgroundColor = colourMatch[state[row][col]];
    }
  }
}
// need to implement the merge functionality 
function moveUp() {
  // need tiles to move all the way up - scan top->bottom
  // row decreases
  for (let row = 1; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      let offset = 1;
      while (row - offset >= 0 && state[row - offset][col] == null) {
        offset++;
      }
      if (offset > 1) {
        state[row - offset + 1][col] = state[row][col];
        state[row][col] = null;
      }
      if (row - offset >= 0 && state[row - offset][col] === state[row - offset + 1][col]) {
        state[row - offset][col] *= 2;
        state[row - offset + 1][col] = null;
      }
      // then merge
    }
  }
}

function moveDown() {
  // need tiles to move all the way up - scan top->bottom
  // row decreases
  for (let row = boardSize - 2; row >= 0; row--) {
    for (let col = 0; col < boardSize; col++) {
      let offset = 1;
      while (row + offset < boardSize && state[row + offset][col] == null) {
        offset++;
      }
      if (offset > 1) {
        state[row + offset - 1][col] = state[row][col];
        state[row][col] = null;
      }

      // then merge
      if (row + offset < boardSize && state[row + offset][col] === state[row + offset - 1][col]) {
        state[row + offset][col] *= 2;
        state[row + offset - 1][col] = null;
      }
    }
  }
}

function moveLeft() {
  // need tiles to move all the way up - scan top->bottom
  // row decreases
  for (let col = 1; col < boardSize; col++) {
    for (let row = 0; row < boardSize; row++) {
      let offset = 1;
      while (col - offset >= 0 && state[row][col - offset] == null) {
        offset++;
      }
      if (offset > 1) {
        state[row][col - offset + 1] = state[row][col];
        state[row][col] = null;
      }

      // then merge
      if (col - offset >= 0 &&  state[row][col - offset] ===  state[row][col  - offset + 1]) {
        state[row][col - offset] *= 2;
        state[row][col - offset + 1] = null;
      }
    }
  }
}

function moveRight() {
  // need tiles to move all the way up - scan top->bottom
  // row decreases
  for (let col = boardSize - 2; col >= 0; col--) {
    for (let row = 0; row < boardSize; row++) {
      let offset = 1;
      while (col + offset < boardSize && state[row][col + offset] == null) {
        offset++;
      }
      if (offset > 1) {
        state[row][col  + offset - 1] = state[row][col];
        state[row][col] = null;
      }

      if (col + offset < boardSize && state[row][col + offset] ===  state[row][col + offset - 1]) {
        state[row][col + offset] *= 2;
        state[row][col + offset - 1] = null;
      }
    }
  }
}

function random(max) {
  return (Math.round(Math.random() * 10) % max);
}

function emptyCell (row, col) {
  return state[row][col] === null;
}

function canStillPlay() {
  const result = state.filter((row) => {
    return (row.filter((cell) => {
      return cell === null;
    }).length > 0);
  });
  return result.length > 0;
}

console.log(canStillPlay());

function spawnCell() {
  if (!canStillPlay()) return;
  const random1 = random(10);
  const number = random1 % 2 == 0 ? 2 : 4;
  let newRow = random(boardSize);
  let newCol = random(boardSize);
  // check at least one cell is empty

  // need better way of doing this esp when all but one cell is filled
  while (!emptyCell(newRow, newCol)) {
    newRow = random(boardSize);
    newCol = random(boardSize);
  }
  
  state[newRow][newCol] = number;
}


function move(event) {
  switch(event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
  }
  spawnCell();
  populateBoard();
  if (!canStillPlay()) {
    alert("GAME OVER! Press reset to start again")
  }
}

function resetGame() {
  state = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, 2],
  ];
  populateBoard();
}

populateBoard();
document.addEventListener('keydown', move);

document.getElementById("reset").addEventListener('click', resetGame);