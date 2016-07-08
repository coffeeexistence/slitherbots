"use strict";

var game = {};
;game.engine = function () {
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

    render.spritesByColor = new Map();

    render.addSprite = function (sprite) {};

    return render;
  };

  engine.render = renderService();

  return engine;
};
;var canvas = document.getElementById("slitherbots-canvas");

console.log(game);

game.engine.initialize({ canvas: canvas });
game.engine.logCanvas();

/*
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/
//# sourceMappingURL=app.js.map
