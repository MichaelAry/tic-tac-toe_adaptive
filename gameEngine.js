let cellsTowWinChecker = [];

function processClick(rowInd, colInd) {
  step++;
  document.getElementById("plTurn").innerHTML = `ходит игрок: ${
    curPl === "X" ? "O" : "X"
  }`;
  document.getElementById("turns").innerHTML = `ход: ${step}`;
  if (gameField[rowInd][colInd] === "") {
    gameField[rowInd][colInd] = curPl;
    if (checkWin()) {
      showWinnerMessage(curPl, step);
    } else if (isBFull()) {
      drawMessage();
    } else {
      curPl = curPl === "X" ? "O" : "X";
      displayField();
    }
  }
}

function checkWin() {
  let win = false;

  for (let row = 0; row < fieldSize; row++) {
    for (let col = 0; col <= fieldSize - cellsToWin; col++) {
      if (
        gameField[row]
          .slice(col, col + cellsToWin)
          .every((cell) => cell === curPl)
      ) {
        win = true;
      }
    }
  }

  for (let col = 0; col < fieldSize; col++) {
    for (let row = 0; row <= fieldSize - cellsToWin; row++) {
      let columnSegment = [];
      for (let k = 0; k < cellsToWin; k++) {
        columnSegment.push(gameField[row + k][col]);
      }
      if (columnSegment.every((cell) => cell === curPl)) {
        win = true;
      }
    }
  }

  for (let row = 0; row <= fieldSize - cellsToWin; row++) {
    for (let col = 0; col <= fieldSize - cellsToWin; col++) {
      let diag1 = [],
        diag2 = [];
      for (let k = 0; k < cellsToWin; k++) {
        diag1.push(gameField[row + k][col + k]);
        diag2.push(gameField[row + k][col + cellsToWin - 1 - k]);
      }
      if (
        diag1.every((cell) => cell === curPl) ||
        diag2.every((cell) => cell === curPl)
      ) {
        win = true;
      }
    }
  }

  return win;
}

function showWinnerMessage(winner, turn) {
  const winnerMessage = document.createElement("div");
  winnerMessage.id = "winnerMessage";
  winnerMessage.textContent = `${winner} побеждает на ходу ${turn}`;
  document.body.appendChild(winnerMessage);
  document.getElementById("field").style.display = "none";
  document.getElementById("plTurn").innerHTML = ``;
  document.getElementById("turns").innerHTML = ``;
  document.getElementById("generateFieldButton").style.display = "none";
}

function drawMessage() {
  const winnerMessage = document.createElement("div");
  winnerMessage.id = "winnerMessage";
  winnerMessage.textContent = `ничья`;
  document.body.appendChild(winnerMessage);
  document.getElementById("field").style.display = "none";
  document.getElementById("plTurn").innerHTML = ``;
  document.getElementById("turns").innerHTML = ``;
  document.getElementById("generateFieldButton").style.display = "none";
}

function isBFull() {
  return gameField.every((row) => row.every((cell) => cell !== ""));
}

function resetGame() {
  document.getElementById("plTurn").innerHTML = ``;
  document.getElementById("turns").innerHTML = ``;
  fieldSize = 4;
  cellsToWin = 4;
  gameField = Array(fieldSize)
    .fill(null)
    .map(() => Array(fieldSize).fill(""));
  curPl = "X";
  displayField();
  step = 0;
  const winnerMessage = document.getElementById("winnerMessage");
  if (winnerMessage) {
    winnerMessage.remove();
  }
  document.getElementById("field").style.display = "none";
  document.getElementById("generateFieldButton").style.display = "block";
  document.getElementById("controlPanel").style.display = "block";
}
