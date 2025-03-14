let curPl = "X";
let gameField = [];
let fieldSize = 4;
let cellsToWin = 4;
document.getElementById("field").style.display = "none";

function generateField() {
  fieldSize = parseInt(document.getElementById("fieldSizeInput").value);
  cellsToWin = parseInt(document.getElementById("cellsToWinInput").value);
  if (fieldSize < cellsToWin) {
    const alertMessage = document.createElement("div");
    alertMessage.id = "alertMessage";
    document.body.appendChild(alertMessage);
    alertMessage.textContent = `размер поля должен быть >= количества ячеек, требуемых для выигрыша`;
    return;
  }
  if (alertMessage) alertMessage.remove();
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
