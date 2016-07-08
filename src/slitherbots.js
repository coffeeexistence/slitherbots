var canvas = document.getElementById("slitherbots-canvas");

console.log(game);

game.engine.initialize({canvas: canvas});
game.engine.logCanvas();

var slitherbot = new Sprite({
  type: 'circle',
  position: {x: 0, y: 0},
  color: 'blue'
});

game.engine.render.addSprite(slitherbot);

game.engine.render.update();



/*
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/
