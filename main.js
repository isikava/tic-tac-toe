const gameBoard = (function () {
  const board = ['X', 'X', '', '', '', '', '', '', ''];
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
  const gameGrid = document.querySelector('#gameBoard');

  function render() {
    const html = board
      .map((cell, index) => `<div class="cell" data-cell="${index}">${cell}</div>`)
      .join(' ');

    gameGrid.innerHTML = html;
  }

  /**
   * @param {*} index
   * @param {*} marker
   * After click on the cell, getting cellIndex // 2
   * Find all possible win conditions with that index // [0, 1, 2], [2, 5 ,6]
   * Find some array in which each element in the board
   * at an index equal to the array element
   * is equal to the marker
   * and return true or false
   */
  function isWinningTurn(index, marker) {
    return winCons
      .filter((cons) => cons.includes(index))
      .some((con) => con.every((conEl) => board[conEl] === marker));
  }

  function makeTurn(index, marker) {
    if (board[index] !== '') return false;

    board[index] = marker;
    render();

    return isWinningTurn(index, marker);
  }

  render();

  return {
    gameGrid,
    makeTurn,
  };
})();

const player = (name, marker) => ({
  name,
  marker,
});

// Game
(() => {
  const { gameGrid, makeTurn } = gameBoard;
  const player1 = player('Boris', 'X');
  const player2 = player('Janna', 'O');
  const currentPlayer = player2;

  const onClick = (e) => {
    // Get index of clicked cell
    const cellIndex = e.target.dataset.cell;
    if (!cellIndex) return;

    const isPlayerWon = makeTurn(+cellIndex, currentPlayer.marker);
    if (isPlayerWon) {
      console.log(`The winner is ${currentPlayer.name}`);
    }
  };

  gameGrid.addEventListener('click', onClick);
})();
