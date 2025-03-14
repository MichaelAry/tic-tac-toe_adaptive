let curPl = "X";
let gameField = [];
let fieldSize = 4;
let cellsToWin = 4;
function generateField() {
  fieldSize = parseInt(document.getElementById("fieldSizeInput").value);
  cellsToWin = parseInt(document.getElementById("cellsToWinInput").value);
  gameField = Array(fieldSize)
    .fill("")
    .map(() => Array(fieldSize).fill(""));
  document.documentElement.style.setProperty("--field-size", fieldSize);
  displayField();
  document.getElementById("field").style.display = "grid";
  document.getElementById("generateFieldButton").style.display = "none";
  document.getElementById("controlPanel").style.display = "none";
  document.getElementById("plTurn").innerHTML = `ходит игрок: X`;
  document.getElementById("turns").innerHTML = `ход: ${step}`;
}

function displayField() {
  const gridField = document.getElementById("field");
  gridField.innerHTML = "";
  gridField.style.gridTemplateColumns =
    gridField.style.gridTemplateRows = `repeat(${fieldSize}, 1fr)`;

  gameField.forEach((row, rowInd) => {
    row.forEach((cell, colInd) => {
      const fieldCell = document.createElement("div");
      fieldCell.classList.add("cell");
      fieldCell.textContent = cell;
      fieldCell.addEventListener("click", () => processClick(rowInd, colInd));
      gridField.appendChild(fieldCell);
    });
  });
}
