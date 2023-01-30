const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  const printInfo = () => console.log({ name, marker });

  return {
    name,
    marker,
    getName,
    getMarker,
    printInfo,
  };
};

const gameBoard = (function () {
  const board = ['X', 'O', '', 'X', 'O', 'X', '', '', 'X'];

  const init = () => {
    console.log('board init');
  };

  const render = () => {
    const gameGrid = document.querySelector('.game-grid');
    const html = board.map((cell) => `<div class="cell">${cell}</div>`).join(' ');

    gameGrid.innerHTML = html;
  };

  const player1 = player('Boris', 'X');
  const player2 = player('Janna', 'O');

  player1.printInfo();

  return {
    init,
    render,
  };
})();

// game
gameBoard.init();
gameBoard.render();
