function displayField() {
  const gameFieldElement = document.getElementById("field");
  gameFieldElement.innerHTML = "";
  gameFieldElement.style.gridTemplateColumns = `repeat(${fieldSize}, 1fr)`;
  gameFieldElement.style.gridTemplateRows = `repeat(${fieldSize}, 1fr)`;
  gameFieldElement.style.display = "grid";

  gameField.forEach((row, rowInd) => {
    row.forEach((cell, colInd) => {
      const fieldCell = document.createElement("div");
      fieldCell.classList.add("cell");
      fieldCell.textContent = cell;
      fieldCell.addEventListener("click", () => processClick(rowInd, colInd));
      gameFieldElement.appendChild(fieldCell);
    });
  });
}

function processClick(rowInd, colInd) {
  if (gameField[rowInd][colInd] === "") {
    gameField[rowInd][colInd] = curPl;
    if (checkWin()) {
      alert(`${curPl} побеждает`);
      resetGame();
    } else if (isBFull()) {
      alert("ничья");
      resetGame();
    } else {
      curPl = curPl === "X" ? "O" : "X";
      displayField();
    }
  }
}

function checkWin() {
  let win = false;

  gameField.forEach((row) => {
    if (row.every((cell) => cell === curPl)) {
      win = true;
    }
  });

  for (let colInd = 0; colInd < fieldSize; colInd++) {
    if (gameField.every((row) => row[colInd] === curPl)) {
      win = true;
    }
  }

  if (gameField.every((row, Ind) => row[Ind] === curPl)) {
    win = true;
  }
  if (gameField.every((row, Ind) => row[fieldSize - 1 - Ind] === curPl)) {
    win = true;
  }

  return win;
}

function isBFull() {
  return gameField.every((row) => row.every((cell) => cell !== ""));
}

function resetGame() {
  gameField = Array(fieldSize)
    .fill(null)
    .map(() => Array(fieldSize).fill(""));
  curPl = "X";
  displayField();
}
