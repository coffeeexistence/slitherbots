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

var moveDirection = function moveDirection(start, movement) {
  return {
    x: start.x + movement.x,
    y: start.y + movement.y
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

    this.segmentDistance = 5;

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

    this.segments = this.generateInitialSegments();
  }

  _createClass(Creature, [{
    key: "move",
    value: function move() {
      if (this.autonomous) {
        this.think();
      }
      this.currentPosition = moveDirection(this.currentPosition, this.direction);
      this.segments.forEach(function (segment) {
        segment.update();
      });
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
      return this.segments.map(function (segment) {
        return segment.sprite;
      });
    }
  }, {
    key: "newRootSegment",
    value: function newRootSegment() {
      var creature = this;

      var rootSegment = {
        type: 'root',
        position: creature.currentPosition,
        direction: creature.direction,
        update: function update() {
          this.position = creature.currentPosition;
          this.direction = creature.direction;
          console.log('new position is', this.position);
        }
      };

      rootSegment.sprite = new Sprite({
        type: 'circle',
        parent: rootSegment,
        radius: creature.radius(),
        position: function position() {
          return this.parent.position;
        },
        color: creature.color
      });

      return rootSegment;
    }
  }, {
    key: "newChildSegment",
    value: function newChildSegment(_ref3) {
      var parent = _ref3.parent;

      var creature = this;
      var segment = {
        type: 'child',
        parent: parent,
        direction: parent.direction,
        position: {},
        update: function update() {
          this.updatePosition();
        },
        updatePosition: function updatePosition() {
          this.position = moveDirection(parent.position, this.direction);
        }
      };
      segment.sprite = new Sprite({
        type: 'circle',
        parent: segment,
        radius: creature.radius(),
        position: function position() {
          return this.parent.position;
        },
        color: creature.color
      });
      return segment;
    }
  }, {
    key: "generateInitialSegments",
    value: function generateInitialSegments() {
      var creature = this;
      var initialAngle = 90;

      var rootSegment = this.newRootSegment();
      this.rootSegment = rootSegment;
      var segments = [rootSegment];

      for (var idx = 1; idx < this.length; idx++) {
        var childSegment = this.newChildSegment({
          parent: segments[segments.length - 1]
        });
        childSegment.update();
        segments.push(childSegment);
      }

      return segments;
    }
  }]);

  return Creature;
}();

;var engineService = function engineService() {
  var engine = {};

  engine.initialize = function (_ref4) {
    var canvas = _ref4.canvas;

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
  function Sprite(_ref5) {
    var type = _ref5.type;
    var position = _ref5.position;
    var _ref5$color = _ref5.color;
    var color = _ref5$color === undefined ? { r: 255, g: 0, b: 0 } : _ref5$color;
    var _ref5$opacity = _ref5.opacity;
    var opacity = _ref5$opacity === undefined ? 1 : _ref5$opacity;
    var _ref5$radius = _ref5.radius;
    var radius = _ref5$radius === undefined ? 40 : _ref5$radius;
    var parent = _ref5.parent;

    _classCallCheck(this, Sprite);

    this.type = type;
    this.parent = parent;
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
      if (!this.position) {
        console.log(this);
      }
      ctx.arc(this.position().x, this.position().y, this.radius, 0, 2 * Math.PI);
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
}, 50);

/*
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/
//# sourceMappingURL=app.js.map
