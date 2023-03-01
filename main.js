/* eslint no-undef: "error" */
/* eslint-env browser */

const UI = (() => {
  console.log('ui init');

  const boardGrid = document.querySelector('#board');

  function renderBoard(board) {
    console.log(board);
    //   const html = board
    //     .map((cell, index) => `<div class="cell" data-cell="${index}"></div>`)
    //     .join(' ');

    //   boardGrid.innerHTML = html;
  }

  const printNewRound = (currentPlayer) => {
    console.log(`${currentPlayer.marker}'s turn`);
    // messageEl.textContent = `${currentPlayer.marker}'s turn`;
  };

  const updateMessage = (message) => {
    console.log(message);
  };

  const placeMark = (index, marker) => {
    console.log(`Dropping ${marker}'s marker into ${index}...`);
    // const currentClass = marker === 'O' ? ' cell-O' : '';
    // cell.className += currentClass;
    // const span = document.createElement('span');
    // span.textContent = marker;
    // cell.append(span);
  };

  return {
    renderBoard,
    printNewRound,
    updateMessage,
    placeMark,
  };
})();

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

const player = (name, marker) => ({
  name,
  marker,
});

const gameController = (playerX = player('Player1', 'X'), playerO = player('Player2', 'O')) => {
  // const boardGrid = document.querySelector('#board');
  // const messageEl = document.querySelector('#message');
  const { getBoard, makeTurn, isDraw, reset } = gameBoard();

  let currentPlayer = playerX;
  let winner = null;

  const board = getBoard();
  UI.renderBoard(board);
  UI.printNewRound(currentPlayer);

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;

    UI.printNewRound(currentPlayer);
  };

  const playRound = (index) => {
    // // Get index of clicked cell
    // const cellIndex = e.target.dataset.cell;
    // // const board = getBoard();
    if (board[index] !== '' || winner) return;

    // Add marker to clicked cell
    // const cell = e.target;
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
    UI.renderBoard(board);
  };

  const onReset = () => {
    currentPlayer = playerX;
    winner = null;
    reset();

    UI.renderBoard(board);
    UI.printNewRound(currentPlayer);
  };

  // const resetBtn = document.querySelector('#reset');
  // resetBtn.addEventListener('click', onReset);
  // boardGrid.addEventListener('click', onClick);

  return {
    playRound,
    onReset,
    board,
  };
};

// Game
const game = gameController();
