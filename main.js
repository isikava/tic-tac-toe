const gameBoard = (function () {
  const board = ['X', 'O', '', '', '', '', '', '', ''];
  const gameGrid = document.querySelector('#gameBoard');

  function render() {
    const html = board
      .map((cell, index) => `<div class="cell" data-cell="${index}">${cell}</div>`)
      .join(' ');

    gameGrid.innerHTML = html;
  }

  function update(index, marker) {
    if (board[index] !== '') return;

    board[index] = marker;
    render();
  }

  console.log('board init');
  render();

  return {
    gameGrid,
    update,
  };
})();

const player = (name, marker) => ({
  name,
  marker,
});

// Game
(() => {
  const { gameGrid, update } = gameBoard;
  const player1 = player('Boris', 'X1');
  const player2 = player('Janna', 'O2');

  let currentPlayer = player1;
  currentPlayer = player2;

  const onClick = (e) => {
    // Get index of clicked cell
    const cellIndex = e.target.dataset.cell;
    if (!cellIndex) return;

    // emit turn
    update(cellIndex, currentPlayer.marker);
  };

  gameGrid.addEventListener('click', onClick);
})();
