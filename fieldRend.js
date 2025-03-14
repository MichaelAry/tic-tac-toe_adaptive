let curPlIndex = 0;
let players = [];
let gameField = [];
let fieldSize = 4;
let cellsToWin = 4;
let step = 1;
let cellsTowWinChecker = [];
document.getElementById("field").style.display = "none";

function generateField() {
  fieldSize = parseInt(document.getElementById("fieldSizeInput").value);
  cellsToWin = parseInt(document.getElementById("cellsToWinInput").value);
  const numPlayers = parseInt(document.getElementById("numPlayersInput").value);

  if (fieldSize < cellsToWin) {
    let alertMessage = document.getElementById("alertMessage");
    alertMessage = document.createElement("div");
    alertMessage.id = "alertMessage";
    document.body.appendChild(alertMessage);
    alertMessage.textContent = `размер поля должен быть >= количества ячеек, требуемых для выигрыша`;
    return;
  }

  const existingAlertMessage = document.getElementById("alertMessage");
  if (existingAlertMessage) existingAlertMessage.remove();

  players = generateRandomSymbols(numPlayers);

  gameField = Array(fieldSize)
    .fill("")
    .map(() => Array(fieldSize).fill(""));
  document.documentElement.style.setProperty("--field-size", fieldSize);
  displayField();
  document.getElementById("field").style.display = "grid";
  document.getElementById("generateFieldButton").style.display = "none";
  document.getElementById("controlPanel").style.display = "none";
  document.getElementById(
    "plTurn"
  ).innerHTML = `ходит игрок: ${players[curPlIndex]}`;
  document.getElementById("turns").innerHTML = `ход: ${step}`;
}

function generateRandomSymbols(numPlayers) {
  let selectedSymbols = [];
  Array(numPlayers)
    .fill()
    .forEach(function generation() {
      let randomSymbol;
      randomSymbol = String.fromCharCode(Math.floor(Math.random() * 95) + 32);
      if (!selectedSymbols.includes(randomSymbol)) {
        selectedSymbols.push(randomSymbol);
      } else {
        generation();
      }
    });
  return selectedSymbols;
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
