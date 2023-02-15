/* eslint no-undef: "error" */
/* eslint-env browser */

const gameBoard = (boardGrid) => {
  let board;
  const winCons = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const getBoard = () => board;

  function isWinningTurn(marker) {
    return winCons.some((con) => con.every((index) => board[index] === marker));
  }

  function makeTurn(index, marker) {
    // If cell is already occupied, stop turn
    if (board[index] !== '') return false;
    // Add marker to the cell
    board[index] = marker;

    return isWinningTurn(marker);
  }

  function render() {
    const html = board
      .map((cell, index) => `<div class="cell" data-cell="${index}"></div>`)
      .join(' ');

    boardGrid.innerHTML = html;
  }

  function reset() {
    board = Array(9).fill('');
    render();
  }

  reset();

  return {
    getBoard,
    makeTurn,
    reset,
  };
};

const player = (name, marker) => ({
  name,
  marker,
});

// Game
const gameController = () => {
  const boardGrid = document.querySelector('#board');
  const messageEl = document.querySelector('#message');
  const { getBoard, makeTurn, reset } = gameBoard(boardGrid);

  const playerX = player('Player1', 'X');
  const playerO = player('Player2', 'O');
  let currentPlayer = playerX;
  let winner = null;

  const printNewRound = () => {
    messageEl.textContent = `${currentPlayer.marker}'s turn`;
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    printNewRound();
  };

  const placeMark = (cell, marker) => {
    const currentClass = marker === 'O' ? ' cell-O' : '';
    cell.className += currentClass;
    const span = document.createElement('span');
    span.textContent = marker;
    cell.append(span);
  };

  const onClick = (e) => {
    // Get index of clicked cell
    const cellIndex = e.target.dataset.cell;
    const board = getBoard();
    if (!cellIndex || board[cellIndex] !== '' || winner) return;

    // Add marker to clicked cell
    const cell = e.target;
    placeMark(cell, currentPlayer.marker);

    // Make turn
    const isPlayerWon = makeTurn(+cellIndex, currentPlayer.marker);
    // Check if it's a winning turn
    if (isPlayerWon) {
      winner = currentPlayer.marker;
      messageEl.textContent = `The winner is ${winner}`;
    } else if (!board.includes('')) {
      // Check for draw
      messageEl.textContent = `It's a DRAW`;
    } else {
      switchPlayer();
    }
  };

  const onReset = () => {
    currentPlayer = playerX;
    winner = null;
    printNewRound();
    reset();
  };

  onReset();

  const resetBtn = document.querySelector('#reset');
  resetBtn.addEventListener('click', onReset);
  boardGrid.addEventListener('click', onClick);
};

gameController();
