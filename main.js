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
  const board = [];

  const init = () => {
    console.log('board init');
  };

  const player1 = player('Boris', 'X');
  const player2 = player('Janna', 'O');

  player1.printInfo();

  return {
    init,
  };
})();

gameBoard.init();
