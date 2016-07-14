var canvas = document.getElementById("slitherbots-canvas");

console.log(game);

game.engine.initialize({canvas: canvas});
game.engine.logCanvas();

let canvasCenter = () => {
  return {x: canvas.width/2, y: canvas.height/2};
};

let slitherbot = new Creature({
  position: canvasCenter(),
  length: 20,
  direction: 1,
  autonomous: true,
  thinkInterval: 10
});

let slitherbot2 = new Creature({
  position: canvasCenter(),
  length: 5,
  direction: 1,
  color: {r: 255, g:0, b:255}
});

game.engine.render.addEntity(slitherbot);
game.engine.render.addEntity(slitherbot2);


let count = 0;
let direction = 1;

window.setInterval( () => {
  if(count%10===0) {
    direction+=20;
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
