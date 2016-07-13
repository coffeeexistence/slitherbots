"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var game = {};
;var angleToDirection = function angleToDirection(_ref) {
  var angle = _ref.angle;
  var distance = _ref.distance;

  var direction = angle / 360 * Math.PI - Math.PI / 2;
  // console.log(direction);
  return {
    x: distance * Math.cos(direction),
    y: distance * Math.sin(direction)
  };
};

var Creature = function () {
  function Creature(_ref2) {
    var _ref2$position = _ref2.position;
    var position = _ref2$position === undefined ? { x: 0, y: 0 } : _ref2$position;
    var _ref2$color = _ref2.color;
    var color = _ref2$color === undefined ? { r: 255, g: 0, b: 0 } : _ref2$color;
    var _ref2$length = _ref2.length;
    var length = _ref2$length === undefined ? 10 : _ref2$length;
    var _ref2$direction = _ref2.direction;
    var direction = _ref2$direction === undefined ? 90 : _ref2$direction;
    var _ref2$autonomous = _ref2.autonomous;
    var autonomous = _ref2$autonomous === undefined ? false : _ref2$autonomous;
    var _ref2$thinkInterval = _ref2.thinkInterval;
    var thinkInterval = _ref2$thinkInterval === undefined ? 100 : _ref2$thinkInterval;

    _classCallCheck(this, Creature);

    this.currentPosition = position;
    this.segmentPositions = [position];

    this.color = color;

    this.stepDistance = 1;
    this.direction = angleToDirection({ angle: direction, distance: this.stepDistance });

    this.length = length;

    if (autonomous) {
      this.autonomous = true;
      this.brain = {};
      this.brain.thinkInterval = thinkInterval;
      this.brain.thinkStep = 0;
    }
  }

  _createClass(Creature, [{
    key: "move",
    value: function move() {
      if (this.autonomous) {
        this.think();
      }
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
    key: "updateDirection",
    value: function updateDirection(angle) {
      var newDirection = angleToDirection({ angle: angle, distance: this.stepDistance });
      this.direction = newDirection;
    }
  }, {
    key: "think",
    value: function think() {
      if (this.brain.thinkStep > this.brain.thinkInterval) {
        this.brain.thinkStep = 0;
        var newDirection = parseInt(Math.random() * 720 - 360);
        console.log("i decided to go", newDirection);
        this.updateDirection(newDirection);
        console.log("new direction is", this.direction);
      } else {
        this.brain.thinkStep++;
      }
    }
  }, {
    key: "radius",
    value: function radius() {
      return 5 + this.length / 20;
    }
  }, {
    key: "sprites",
    value: function sprites() {
      return this.segments();
    }
  }, {
    key: "segment",
    value: function segment(position) {
      var opacity = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      return new Sprite({
        type: 'circle',
        radius: this.radius(),
        position: { x: position.x, y: position.y },
        color: this.color,
        opacity: opacity
      });
    }
  }, {
    key: "segments",
    value: function segments() {
      var creature = this;
      var length = this.length;
      return this.segmentPositions.map(function (position, index) {
        var segmentOpacity = (length - index) / length;
        return creature.segment(position, segmentOpacity);
      });
    }
  }]);

  return Creature;
}();

;var engineService = function engineService() {
  var engine = {};

  engine.initialize = function (_ref3) {
    var canvas = _ref3.canvas;

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
        sprites.reverse();
        sprites.forEach(function (sprite) {
          ctx.beginPath();
          sprite.draw(ctx);
          ctx.closePath();
        });
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
var Sprite = function () {
  function Sprite(_ref4) {
    var type = _ref4.type;
    var position = _ref4.position;
    var _ref4$color = _ref4.color;
    var color = _ref4$color === undefined ? { r: 255, g: 0, b: 0 } : _ref4$color;
    var _ref4$opacity = _ref4.opacity;
    var opacity = _ref4$opacity === undefined ? 1 : _ref4$opacity;
    var _ref4$radius = _ref4.radius;
    var radius = _ref4$radius === undefined ? 40 : _ref4$radius;

    _classCallCheck(this, Sprite);

    this.type = type;
    this.position = position;
    this.color = color;
    this.opacity = opacity;
    this.radius = radius;
  }

  _createClass(Sprite, [{
    key: "rgbaValue",
    value: function rgbaValue() {
      return "rgba(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ",  " + this.opacity + ")";
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(ctx) {
      ctx.fillStyle = this.rgbaValue();
      ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      switch (this.type) {
        case 'circle':
          this.drawCircle(ctx);
          break;
        case 'circle-gradient':
          this.drawCircleGradient(ctx);
          break;
      }
    }
  }]);

  return Sprite;
}();

;var canvas = document.getElementById("slitherbots-canvas");

console.log(game);

game.engine.initialize({ canvas: canvas });
game.engine.logCanvas();

var canvasCenter = function canvasCenter() {
  return { x: canvas.width / 2, y: canvas.height / 2 };
};

var slitherbot = new Creature({
  position: canvasCenter(),
  length: 50,
  direction: 1,
  autonomous: true,
  thinkInterval: 10
});

var slitherbot2 = new Creature({
  position: canvasCenter(),
  length: 10,
  direction: 1,
  color: { r: 255, g: 0, b: 255 }
});

game.engine.render.addEntity(slitherbot);
game.engine.render.addEntity(slitherbot2);

var count = 0;
var direction = 1;

window.setInterval(function () {
  if (count % 10 === 0) {
    direction += 20;
    slitherbot2.updateDirection(direction);
  }
  count++;
  window.requestAnimationFrame(game.engine.render.update);
}, 17);

/*
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/
//# sourceMappingURL=app.js.map
