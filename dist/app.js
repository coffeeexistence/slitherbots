'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var game = {};
;var engineService = function engineService() {
  var engine = {};

  engine.initialize = function (_ref) {
    var canvas = _ref.canvas;

    engine.canvas = canvas;
  };

  engine.logCanvas = function () {
    console.log(engine.canvas);
  };

  var renderService = function renderService() {
    var render = {};

    var spritesByColor = new Map();

    render.addSprite = function (sprite) {
      if (!spritesByColor.has(sprite.color)) {
        spritesByColor.set(sprite.color, []);
      }
      spritesByColor.get(sprite.color).push(sprite);
    };

    render.update = function () {
      var ctx = engine.canvas.getContext('2d');
      var drawColorGroup = function drawColorGroup(sprites, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        sprites.forEach(function (sprite) {
          sprite.draw(ctx);
        });
        ctx.fill();
        ctx.closePath();
      };
      spritesByColor.forEach(drawColorGroup);
    };

    return render;
  };

  engine.render = renderService();

  return engine;
};

game.engine = engineService();
;
var Sprite = function Sprite(_ref2) {
  var type = _ref2.type;
  var position = _ref2.position;
  var color = _ref2.color;
  var _ref2$radius = _ref2.radius;
  var radius = _ref2$radius === undefined ? 40 : _ref2$radius;

  _classCallCheck(this, Sprite);

  switch (type) {
    case 'circle':
      this.draw = function (ctx) {
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
      };
      break;
  }
  this.type = type;
  this.position = position;
  this.color = color;
  this.radius = radius;
};

;var canvas = document.getElementById("slitherbots-canvas");

console.log(game);

game.engine.initialize({ canvas: canvas });
game.engine.logCanvas();

var slitherbot = new Sprite({
  type: 'circle',
  position: { x: 0, y: canvas.height / 3 },
  color: 'blue'
});

var slitherbot2 = new Sprite({
  type: 'circle',
  position: { x: canvas.width, y: canvas.height / 2 },
  color: 'red'
});

game.engine.render.addSprite(slitherbot);
game.engine.render.addSprite(slitherbot2);

var move = function move() {
  slitherbot.position.x += 1;
  slitherbot2.position.x -= 1;
  game.engine.render.update();
};

window.setInterval(function () {
  window.requestAnimationFrame(move);
}, 10);

/*
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/
//# sourceMappingURL=app.js.map
