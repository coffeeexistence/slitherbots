'use strict';

var _game = require('game');

var _game2 = _interopRequireDefault(_game);

var _Creature = require('components/creature/Creature');

var _Creature2 = _interopRequireDefault(_Creature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("slitherbots-canvas");

console.log(_game2.default);

_game2.default.engine.initialize({ canvas: canvas });
_game2.default.engine.logCanvas();

var canvasCenter = function canvasCenter() {
  return { x: canvas.width / 2, y: canvas.height / 2 };
};

var slitherbot = new _Creature2.default({
  position: canvasCenter(),
  length: 20,
  direction: 1,
  autonomous: true,
  thinkInterval: 60
});

var slitherbot2 = new _Creature2.default({
  position: canvasCenter(),
  length: 15,
  direction: 1,
  color: { r: 255, g: 0, b: 255 }
});

_game2.default.engine.render.addEntity(slitherbot);
_game2.default.engine.render.addEntity(slitherbot2);

var count = 0;
var direction = 1;
var variability = 100;

var update = function update() {
  if (count % 10 === 0) {
    var variation = parseInt(Math.random() * variability) - variability / 2;
    direction += 20 + variation;
    slitherbot2.updateDirection(direction);
  }
  count++;
  _game2.default.engine.render.update();
};

window.setInterval(function () {
  window.requestAnimationFrame(update);
}, 10);

/*
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/
//# sourceMappingURL=app.js.map
