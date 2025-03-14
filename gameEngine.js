let cellsTowWinChecker = [];
let step = 1;
function processClick(rowInd, colInd) {
  document.getElementById("plTurn").innerHTML = `ходит игрок: ${
    curPl === "X" ? "O" : "X"
  }`;
  document.getElementById("turns").innerHTML = `ход: ${step + 1}`;

  if (gameField[rowInd][colInd] === "") {
    gameField[rowInd][colInd] = curPl;
    step++;

    if (checkWin()) {
      endGameShortage();
      winnerMessage.textContent = `${curPl} побеждает на ходу ${step - 1}`;
    } else if (isBFull()) {
      endGameShortage();
      winnerMessage.textContent = `ничья`;
    } else {
      curPl = curPl === "X" ? "O" : "X";
      displayField();
    }
  }
}

function checkWin() {
  const checkLine = (line) => line.every((cell) => cell === curPl);

  let win = false;

  gameField.forEach((row) => {
    row.forEach((_, colIndex) => {
      if (colIndex <= fieldSize - cellsToWin) {
        if (checkLine(row.slice(colIndex, colIndex + cellsToWin))) {
          win = true;
        }
      }
    });
  });
  if (win) return true;

  gameField[0].forEach((_, colIndex) => {
    gameField.forEach((_, rowIndex) => {
      if (rowIndex <= fieldSize - cellsToWin) {
        const columnSlice = Array.from(
          { length: cellsToWin },
          (_, i) => gameField[rowIndex + i][colIndex]
        );
        if (checkLine(columnSlice)) {
          win = true;
        }
      }
    });
  });
  if (win) return true;

  gameField.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      if (
        rowIndex <= fieldSize - cellsToWin &&
        colIndex <= fieldSize - cellsToWin
      ) {
        const primDiag = Array.from(
          { length: cellsToWin },
          (_, i) => gameField[rowIndex + i][colIndex + i]
        );
        if (checkLine(primDiag)) {
          win = true;
        }

        const secondDiag = Array.from(
          { length: cellsToWin },
          (_, i) => gameField[rowIndex + i][colIndex + cellsToWin - 1 - i]
        );
        if (checkLine(secondDiag)) {
          win = true;
        }
      }
    });
  });

  return win;
}

function endGameShortage() {
  const winnerMessage = document.createElement("div");
  winnerMessage.id = "winnerMessage";
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
  gameField = Array.from({ length: fieldSize }, () =>
    Array(fieldSize).fill("")
  );
  curPl = "X";
  displayField();
  step = 1;
  const winnerMessage = document.getElementById("winnerMessage");
  if (winnerMessage) winnerMessage.remove();
  document.getElementById("field").style.display = "none";
  document.getElementById("generateFieldButton").style.display = "block";
  document.getElementById("controlPanel").style.display = "block";
}
