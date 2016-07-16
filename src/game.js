import engineService from 'components/engine';

function gameFactory() {
  let game = {};
  game.engine = engineService();
}

let game = gameFactory();

export default game;
