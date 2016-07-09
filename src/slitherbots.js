var canvas = document.getElementById("slitherbots-canvas");

console.log(game);

game.engine.initialize({canvas: canvas});
game.engine.logCanvas();

let canvasCenter = {x: canvas.width/2, y: canvas.height/2};

let slitherbot = new Creature({position: canvasCenter, length: 50, direction: 100});

game.engine.render.addEntity(slitherbot);

let count = 0;
let direction = 1;

window.setInterval( () => {
  if(count%10===0) { direction+=0.2; slitherbot.updateDirection(direction); }
  count++;
  window.requestAnimationFrame(game.engine.render.update);
}, 5);

/*
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/
