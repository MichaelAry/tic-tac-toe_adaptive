let currentPlayer = "X";
let gameBoard = [];
let boardSize = 3;

function generateField() {
  const fieldSizeInput = document.getElementById("fieldSizeInput");
  boardSize = parseInt(fieldSizeInput.value);
  gameBoard = Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(""));
  document.documentElement.style.setProperty("--field-size", boardSize);
  renderBoard();
}

function renderBoard() {
  const gameBoardDiv = document.getElementById("gameBoard");
  gameBoardDiv.innerHTML = "";
  gameBoardDiv.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  gameBoardDiv.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
  gameBoardDiv.style.display = "grid";

  gameBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = cell;
      cellDiv.addEventListener("click", () =>
        handleCellClick(rowIndex, colIndex)
      );
      gameBoardDiv.appendChild(cellDiv);
    });
  });
}

function handleCellClick(rowIndex, colIndex) {
  if (gameBoard[rowIndex][colIndex] === "") {
    gameBoard[rowIndex][colIndex] = currentPlayer;
    if (checkWin()) {
      alert(`${currentPlayer} wins!`);
      resetGame();
    } else if (isBoardFull()) {
      alert("It's a draw!");
      resetGame();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      renderBoard();
    }
  }
}

function checkWin() {
  let win = false;

  gameBoard.forEach((row) => {
    if (row.every((cell) => cell === currentPlayer)) {
      win = true;
    }
  });

  gameBoard[0].forEach((_, colIndex) => {
    if (gameBoard.every((row) => row[colIndex] === currentPlayer)) {
      win = true;
    }
  });

  if (gameBoard.every((row, index) => row[index] === currentPlayer)) {
    win = true;
  }
  if (
    gameBoard.every(
      (row, index) => row[boardSize - 1 - index] === currentPlayer
    )
  ) {
    win = true;
  }

  return win;
}

function isBoardFull() {
  return gameBoard.every((row) => row.every((cell) => cell !== ""));
}

function resetGame() {
  gameBoard = Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(""));
  currentPlayer = "X";
  renderBoard();
}

generateField();
