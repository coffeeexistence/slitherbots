import engineService from './components/engine/engine';

function gameFactory() {
  let game = {};
  game.engine = engineService();
  return game;
}

let game = gameFactory();

export default game;
