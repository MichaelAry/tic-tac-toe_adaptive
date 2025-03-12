let curPl = "X";
let gameField = [];
let fieldSize = 3;
let cellsToWin = 3;
let step = 0;

function generateField() {
  fieldSize = parseInt(document.getElementById("fieldSizeInput").value);
  cellsToWin = parseInt(document.getElementById("cellsToWinInput").value);
  gameField = Array(fieldSize)
    .fill("")
    .map(() => Array(fieldSize).fill(""));
  document.documentElement.style.setProperty("--field-size", fieldSize);
  displayField();
}

function displayField() {
  const gridField = document.getElementById("field");
  gridField.innerHTML = "";
  gridField.style.gridTemplateColumns =
    gridField.style.gridTemplateRows = `repeat(${fieldSize}, 1fr)`;
  gridField.style.display = "grid";

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

generateField();
