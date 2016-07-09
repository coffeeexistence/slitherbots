'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var game = {};
;
var Creature = function () {
  function Creature(_ref) {
    var _ref$position = _ref.position;
    var position = _ref$position === undefined ? { x: 0, y: 0 } : _ref$position;
    var _ref$color = _ref.color;
    var color = _ref$color === undefined ? 'red' : _ref$color;
    var _ref$length = _ref.length;
    var length = _ref$length === undefined ? 10 : _ref$length;
    var _ref$direction = _ref.direction;
    var direction = _ref$direction === undefined ? { x: 1, y: 0.5 } : _ref$direction;

    _classCallCheck(this, Creature);

    this.currentPosition = position;
    this.segmentPositions = [position];

    this.color = color;
    this.direction = direction;
    this.length = length;
  }

  _createClass(Creature, [{
    key: 'move',
    value: function move() {
      var newSegmentPosition = {
        x: this.currentPosition.x += this.direction.x,
        y: this.currentPosition.y += this.direction.y
      };
      this.segmentPositions.unshift(newSegmentPosition);
      if (this.segmentPositions.length > this.length) {
        this.segmentPositions.pop();
      }
    }
  }, {
    key: 'radius',
    value: function radius() {
      return 10 + this.length / 10;
    }
  }, {
    key: 'sprites',
    value: function sprites() {
      return this.segments();
    }
  }, {
    key: 'segment',
    value: function segment(position) {
      return new Sprite({
        type: 'circle',
        radius: this.radius(),
        position: { x: position.x, y: position.y },
        color: this.color
      });
    }
  }, {
    key: 'segments',
    value: function segments() {
      var creature = this;
      return this.segmentPositions.map(function (position) {
        return creature.segment(position);
      });
    }
  }]);

  return Creature;
}();

;var engineService = function engineService() {
  var engine = {};

  engine.initialize = function (_ref2) {
    var canvas = _ref2.canvas;

    engine.canvas = canvas;
  };

  engine.logCanvas = function () {
    console.log(engine.canvas);
  };

  var renderService = function renderService() {
    var render = {};

    var addSprite = function addSprite(sprite, spriteMap) {
      if (!spriteMap.has(sprite.color)) {
        spriteMap.set(sprite.color, []);
      }
      spriteMap.get(sprite.color).push(sprite);
    };

    var addSprites = function addSprites(sprites, spriteMap) {
      sprites.forEach(function (sprite) {
        addSprite(sprite, spriteMap);
      });
    };

    var entities = {
      all: []
    };

    entities.sprites = function () {
      var spritesMap = new Map();
      entities.all.forEach(function (entity) {
        addSprites(entity.sprites(), spritesMap);
      });
      // console.log(spritesMap.values());
      return spritesMap;
    };

    entities.update = function () {
      entities.all.forEach(function (entity) {
        entity.move();
      });
    };

    render.addEntity = function (entity) {
      entities.all.push(entity);
    };

    render.update = function () {
      entities.update();
      var entitySpritesMap = entities.sprites();

      var ctx = engine.canvas.getContext('2d');

      ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

      var drawColorGroup = function drawColorGroup(sprites, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        sprites.forEach(function (sprite) {
          sprite.draw(ctx);
        });
        ctx.fill();
        ctx.closePath();
      };
      entitySpritesMap.forEach(drawColorGroup);
    };

    return render;
  };

  engine.render = renderService();

  return engine;
};

game.engine = engineService();
;
var Sprite = function Sprite(_ref3) {
  var type = _ref3.type;
  var position = _ref3.position;
  var color = _ref3.color;
  var _ref3$radius = _ref3.radius;
  var radius = _ref3$radius === undefined ? 40 : _ref3$radius;

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

var slitherbot = new Creature({ position: { x: 50, y: 50 }, length: 50 });

game.engine.render.addEntity(slitherbot);

window.setInterval(function () {
  window.requestAnimationFrame(game.engine.render.update);
}, 10);

/*
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/
//# sourceMappingURL=app.js.map
