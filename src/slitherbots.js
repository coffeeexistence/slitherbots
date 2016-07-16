import game from 'game';
import Creature from 'components/creature/Creature';

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
  thinkInterval: 60
});

let slitherbot2 = new Creature({
  position: canvasCenter(),
  length: 15,
  direction: 1,
  color: {r: 255, g:0, b:255}
});

game.engine.render.addEntity(slitherbot);
game.engine.render.addEntity(slitherbot2);


let count = 0;
let direction = 1;
let variability = 100;

let update = () => {
  if(count%10===0) {
    let variation = parseInt(Math.random()*variability)-(variability/2);
    direction+=(20 + variation);
    slitherbot2.updateDirection(direction);
   }
  count++;
  game.engine.render.update();
};

window.setInterval( () => {
  window.requestAnimationFrame(update);
}, 10);

/*
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/
