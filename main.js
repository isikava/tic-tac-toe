const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  const printInfo = () => console.log({ name, marker });

  return {
    getName,
    getMarker,
    printInfo,
  };
};

const gameBoard = (function () {
  const board = ['X', 'O', '', 'X', 'O', 'X', '', '', 'X'];
  const gameGrid = document.querySelector('#gameBoard');

  function render() {
    const html = board.map((cell) => `<div class="cell">${cell}</div>`).join(' ');

    gameGrid.innerHTML = html;
  }

  function changeBoard(index, player) {
    board[index] = player.getMarker();
    render();
  }

  const player1 = player('Boris', 'X1');
  const player2 = player('Janna', 'O2');

  console.log('board init');
  render();

  changeBoard(2, player1);
  changeBoard(3, player2);

  return {
    changeBoard,
  };
})();
