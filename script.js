const GRID_HEIGHT = 6;
const GRID_WIDTH = 7;
const WINNING_LENGTH = 4;
const PLAYERS_COLORS = {
  1: "yellow",
  2: "red",
};

let actualPlayer = 1;

document.addEventListener("DOMContentLoaded", function () {
  createGrid(GRID_HEIGHT, GRID_WIDTH);

  changeTurnTo(1);

  bindEvents();
});

function createGrid(height, width) {
  const grid = document.querySelector(".grid");

  for (let i = 0; i < width; i++) {
    const col = document.createElement("div");
    col.classList.add("col");

    for (let j = 0; j < height; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      col.appendChild(cell);
    }

    grid.appendChild(col);
  }
}

function bindEvents() {
  const cols = document.querySelectorAll(".col");
  cols.forEach((col, index) => {
    col.addEventListener("click", () => {
      placeToken(index);
    });
  });
}

function placeToken(col) {
  const cells = document
    .querySelectorAll(".col")
    [col].querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].classList.contains("filled")) {
      cells[i].classList.add("filled");
      cells[i].classList.add(`player-${actualPlayer}`);

      if (isWin()) {
        setTimeout(() => {
          alert(`${PLAYERS_COLORS[actualPlayer]} wins!`);
          reset();
        }, 100);
        return;
      }

      changeTurnTo(actualPlayer === 1 ? 2 : 1);
      break;
    }
  }
}

function changeTurnTo(player) {
  actualPlayer = player;
  document.querySelector(".grid").setAttribute("player-turn", player);
}

function isWin() {
  // vertical
  for (let i = 0; i < GRID_WIDTH; i++) {
    let count = 0;
    for (let j = 0; j < GRID_HEIGHT; j++) {
      const cell = getCell(i, j);
      if (isActualPlayer(cell)) {
        count++;
        if (count === WINNING_LENGTH) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  }

  // horizontal
  for (let i = 0; i < GRID_HEIGHT; i++) {
    let count = 0;
    for (let j = 0; j < GRID_WIDTH; j++) {
      const cell = getCell(j, i);
      if (isActualPlayer(cell)) {
        count++;
        if (count === WINNING_LENGTH) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  }

  // diagonal bottom left to top right
  for (
    let i = -(GRID_WIDTH - 1 - WINNING_LENGTH);
    i < GRID_WIDTH + 1 - WINNING_LENGTH;
    i++
  ) {
    let count = 0;
    for (let j = 0; j < GRID_HEIGHT; j++) {
      const cell = getCell(i + j, j);
      if (isActualPlayer(cell)) {
        count++;
        if (count === WINNING_LENGTH) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  }

  // diagonal bottom right to top left
  for (
    let i = -(GRID_WIDTH - 1 - WINNING_LENGTH);
    i < GRID_WIDTH + 1 - WINNING_LENGTH;
    i++
  ) {
    let count = 0;
    for (let j = 0; j < GRID_HEIGHT; j++) {
      const cell = getCell(GRID_WIDTH - 1 - j - i, j);
      if (isActualPlayer(cell)) {
        count++;
        if (count === WINNING_LENGTH) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  }
}

function isActualPlayer(cell) {
  if (!cell) {
    return false;
  }
  return cell.classList.contains(`player-${actualPlayer}`);
}

function getCell(col, row) {
  if (col < 0 || col >= GRID_WIDTH || row < 0 || row >= GRID_HEIGHT) {
    return null;
  }
  return document.querySelectorAll(".col")[col].querySelectorAll(".cell")[row];
}

function reset() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove("filled");
    cell.classList.remove("player-1");
    cell.classList.remove("player-2");
  });

  changeTurnTo(1);
}
