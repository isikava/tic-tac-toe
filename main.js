/* eslint no-undef: "error" */
/* eslint-env browser */

const UI = (() => {
  const boardGrid = document.querySelector('#board');
  const messageEl = document.querySelector('#message');
  const resetBtn = document.querySelector('#reset');

  const getGrid = () => boardGrid;

  const getResetBtn = () => resetBtn;

  const renderBoard = (board = []) => {
    const html = board
      .map((cell, index) => `<div class="cell" data-cell="${index}"></div>`)
      .join(' ');

    boardGrid.innerHTML = html;
  };

  const updateMessage = (message) => {
    // console.log(message);
    messageEl.textContent = message;
  };

  const printNewRound = (currentPlayer) => {
    // console.log(`${currentPlayer.marker}'s turn`);
    messageEl.textContent = `${currentPlayer.marker}'s turn`;
  };

  const placeMark = (index, marker) => {
    // console.log(`Dropping ${marker}'s marker into ${index}...`);
    const cell = boardGrid.querySelector(`[data-cell="${index}"]`);
    const currentClass = marker === 'O' ? ' cell-O' : '';
    cell.className += currentClass;
    const span = document.createElement('span');
    span.textContent = marker;
    cell.append(span);
  };

  return {
    renderBoard,
    printNewRound,
    updateMessage,
    placeMark,
    getGrid,
    getResetBtn,
  };
})();

// Game board state
const gameBoard = () => {
  let board;
  const WIN_CONS = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const reset = () => {
    board = Array(9).fill('');
  };

  const getBoard = () => board;

  const isWinningTurn = (marker) =>
    WIN_CONS.some((con) => con.every((index) => board[index] === marker));

  const makeTurn = (index, marker) => {
    // If cell is already occupied, stop turn
    if (board[index] !== '') return false;
    // Add marker to the cell
    board[index] = marker;

    return isWinningTurn(marker);
  };

  const isDraw = () => !board.includes('');

  reset();

  return {
    getBoard,
    makeTurn,
    isDraw,
    reset,
  };
};

// Players factory
const player = (name, marker) => ({
  name,
  marker,
});

// Game
const gameController = (
  playerX = player('Player1', 'X'),
  playerO = player('Player2', 'O')
) => {
  const { getBoard, makeTurn, isDraw, reset } = gameBoard();

  let currentPlayer = playerX;
  let winner = null;
  let board = getBoard();

  UI.renderBoard(board);
  UI.printNewRound(currentPlayer);

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    UI.printNewRound(currentPlayer);
  };

  const playRound = (index) => {
    if (board[index] !== '' || winner) return;

    // Add marker to clicked cell
    UI.placeMark(index, currentPlayer.marker);

    // Make turn
    const isPlayerWon = makeTurn(index, currentPlayer.marker);
    // Check if it's a winning turn
    if (isPlayerWon) {
      winner = currentPlayer.marker;
      UI.updateMessage(`The winner is ${winner}`);
      // Check for draw
    } else if (isDraw()) {
      UI.updateMessage(`It's a DRAW`);
    } else {
      switchPlayer();
    }
  };

  const onClick = (e) => {
    const index = e.target.dataset.cell;
    if (!index) return;

    playRound(+index);
  };

  const resetGame = () => {
    currentPlayer = playerX;
    winner = null;
    reset();

    board = getBoard();
    UI.renderBoard(board);
    UI.printNewRound(currentPlayer);
  };

  const boardGrid = UI.getGrid();
  const resetBtn = UI.getResetBtn();

  boardGrid.addEventListener('click', onClick);
  resetBtn.addEventListener('click', resetGame);

  return {
    playRound,
    resetGame,
  };
};

const game = gameController();
