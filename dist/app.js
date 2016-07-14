'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var game = {};
;function childSegmentFactory(_ref) {
  var parent = _ref.parent;
  var _ref$colorModifier = _ref.colorModifier;
  var colorModifier = _ref$colorModifier === undefined ? 0 : _ref$colorModifier;
  var creature = _ref.creature;

  var startPosition = { x: parent.position.x, y: parent.position.y };
  var segment = segmentFactory({ startPosition: startPosition, creature: creature });

  segment.type = 'child';
  segment.parent = parent;
  segment.checkForMoves = function () {
    segment.parent.childPendingMoves.forEach(function (move, index) {
      if (move.distance >= creature.segmentDistance) {
        segment.changeDirection(move.direction);

        segment.parent.childPendingMoves.splice(index, 1);
      } else {
        move.distance++;
      }
    });
  };
  segment.direction = { x: 0, y: 0 };

  segment.update = function () {
    this.checkForMoves();
    this.updatePosition();
  };

  parent.child = segment;

  return segment;
}
;function angleToDirection(_ref2) {
  var angle = _ref2.angle;
  var distance = _ref2.distance;

  var direction = angle / 360 * Math.PI - Math.PI / 2;
  // console.log(direction);
  return {
    x: distance * Math.cos(direction),
    y: distance * Math.sin(direction)
  };
}

function moveDirection(start, movement) {
  return {
    x: start.x + movement.x,
    y: start.y + movement.y
  };
}

function invertDirection(direction) {
  return {
    x: direction.x * -1,
    y: direction.y * -1
  };
}

var Creature = function () {
  function Creature(_ref3) {
    var _ref3$position = _ref3.position;
    var position = _ref3$position === undefined ? { x: 0, y: 0 } : _ref3$position;
    var _ref3$color = _ref3.color;
    var color = _ref3$color === undefined ? { r: 255, g: 0, b: 0 } : _ref3$color;
    var _ref3$length = _ref3.length;
    var length = _ref3$length === undefined ? 10 : _ref3$length;
    var _ref3$direction = _ref3.direction;
    var direction = _ref3$direction === undefined ? 0 : _ref3$direction;
    var _ref3$autonomous = _ref3.autonomous;
    var autonomous = _ref3$autonomous === undefined ? false : _ref3$autonomous;
    var _ref3$thinkInterval = _ref3.thinkInterval;
    var thinkInterval = _ref3$thinkInterval === undefined ? 100 : _ref3$thinkInterval;

    _classCallCheck(this, Creature);

    this.currentPosition = position;
    this.segmentPositions = [position];

    this.segmentDistance = 7;

    this.color = color;

    this.stepDistance = 1;
    this.angle = direction;
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
    key: 'move',
    value: function move() {
      if (this.autonomous) {
        this.think();
      }
      this.segments.forEach(function (segment) {
        segment.update();
      });
    }
  }, {
    key: 'updateDirection',
    value: function updateDirection(angle) {
      this.currentAngle = angle;
      var newDirection = angleToDirection({ angle: angle, distance: this.stepDistance });
      this.rootSegment.changeDirection(newDirection);
    }
  }, {
    key: 'think',
    value: function think() {
      if (this.brain.thinkStep > this.brain.thinkInterval) {
        this.brain.thinkStep = 0;
        var newDirection = parseInt(Math.random() * 720 - 360);
        this.updateDirection(newDirection + this.angle);
      } else {
        this.brain.thinkStep++;
      }
    }
  }, {
    key: 'radius',
    value: function radius() {
      return 4 + this.length / 20;
    }
  }, {
    key: 'sprites',
    value: function sprites() {
      return this.segments.map(function (segment) {
        return segment.sprite;
      }).reverse();
    }
  }, {
    key: 'generateInitialSegments',
    value: function generateInitialSegments() {
      var creature = this;
      var initialAngle = 0;

      var rootSegment = rootSegmentFactory({
        startPosition: { x: this.currentPosition.x, y: this.currentPosition.y },
        creature: creature
      });
      this.rootSegment = rootSegment;

      console.log('root segment created');

      var segments = [rootSegment];

      for (var idx = 1; idx < this.length; idx++) {
        var childSegment = childSegmentFactory({
          creature: creature,
          parent: segments[segments.length - 1],
          colorModifier: idx / this.length
        });
        childSegment.update();
        console.log('updated child segment');
        segments.push(childSegment);
      }

      console.log('initial segments generated');

      return segments;
    }
  }]);

  return Creature;
}();

;function rootSegmentFactory(_ref4) {
  var startPosition = _ref4.startPosition;
  var creature = _ref4.creature;

  var rootSegment = segmentFactory({ startPosition: startPosition, creature: creature });

  rootSegment.type = 'root';
  rootSegment.child = null;
  rootSegment.direction = { x: 0, y: 0 };
  rootSegment.update = function () {
    rootSegment.updatePosition();
  };

  return rootSegment;
}
;function segmentFactory(_ref5) {
  var creature = _ref5.creature;
  var startPosition = _ref5.startPosition;

  var segment = {
    creature: creature,
    childPendingMoves: [],
    position: startPosition
  };

  segment.pendChildDirectionChange = function (direction) {
    if (segment.child) {
      segment.childPendingMoves.push({
        direction: direction,
        distance: 0
      });
    }
  };

  segment.changeDirection = function (direction) {
    segment.direction = direction;
    segment.pendChildDirectionChange(direction);
    // console.log('new direction is', this.direction);
  };
  segment.updatePosition = function () {
    segment.position = moveDirection(segment.position, segment.direction);
  };

  segment.sprite = new Sprite({
    type: 'circle',
    parent: segment,
    radius: segment.creature.radius(),
    position: function position() {
      return segment.position;
    },
    color: { r: creature.color.r, g: creature.color.g, b: creature.color.b }
  });

  return segment;
}
;var engineService = function engineService() {
  var engine = {};

  engine.initialize = function (_ref6) {
    var canvas = _ref6.canvas;

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
  function Sprite(_ref7) {
    var type = _ref7.type;
    var position = _ref7.position;
    var _ref7$color = _ref7.color;
    var color = _ref7$color === undefined ? { r: 255, g: 0, b: 0 } : _ref7$color;
    var _ref7$opacity = _ref7.opacity;
    var opacity = _ref7$opacity === undefined ? 1 : _ref7$opacity;
    var _ref7$radius = _ref7.radius;
    var radius = _ref7$radius === undefined ? 40 : _ref7$radius;
    var parent = _ref7.parent;

    _classCallCheck(this, Sprite);

    this.type = type;
    this.parent = parent;
    this.position = position;
    this.color = color;
    this.opacity = opacity;
    this.radius = radius;
  }

  _createClass(Sprite, [{
    key: 'rgbaValue',
    value: function rgbaValue(color, opacity) {
      return 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',  ' + opacity + ')';
    }
  }, {
    key: 'drawCircle',
    value: function drawCircle(ctx) {
      ctx.fillStyle = this.rgbaValue(this.color, 1);
      if (!this.position) {
        console.log(this);
      }
      ctx.arc(this.position().x, this.position().y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.lineWidth = 1;
      var strokeColor = this.rgbaValue({
        r: parseInt(this.color.r / 3),
        g: parseInt(this.color.g / 3),
        b: parseInt(this.color.b / 3)
      }, 1);
      ctx.strokeStyle = strokeColor;
      ctx.stroke();
    }
  }, {
    key: 'draw',
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
  length: 20,
  direction: 1,
  autonomous: true,
  thinkInterval: 10
});

var slitherbot2 = new Creature({
  position: canvasCenter(),
  length: 15,
  direction: 1,
  color: { r: 255, g: 0, b: 255 }
});

game.engine.render.addEntity(slitherbot);
game.engine.render.addEntity(slitherbot2);

var count = 0;
var direction = 1;
var variability = 100;

window.setInterval(function () {
  if (count % 10 === 0) {

    var variation = parseInt(Math.random() * variability) - variability / 2;
    direction += 20 + variation;
    slitherbot2.updateDirection(direction);
  }
  count++;
  window.requestAnimationFrame(game.engine.render.update);
}, 20);

/*
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/
//# sourceMappingURL=app.js.map
