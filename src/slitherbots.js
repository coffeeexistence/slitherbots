import game from './game';
import Creature from './components/creature/Creature';

var canvas = document.getElementById("slitherbots-canvas");

canvas.width  = window.innerWidth*0.90;
canvas.height = window.innerHeight*0.90;

console.log(game);

game.engine.initialize({canvas: canvas, drawInterval: 6, showFps: false});
game.engine.logCanvas();

let canvasCenter = () => {
  return {x: canvas.width/2, y: canvas.height/2};
};

let addBots = (number) => {
  for(let i = 0; i < number; i++) {
    let rand1 = Math.random();
    let rand2 = Math.random();
    let rand3 = Math.random();

    game.engine.render.addEntity(
      new Creature({
        position: canvasCenter(),
        length: Math.floor(rand1*100),
        direction: Math.floor(rand2*360),
        autonomous: true,
        thinkInterval: Math.floor(20+(rand3*50))
      })
    );
  }
};

addBots(10);

let slitherbot2 = new Creature({
  position: canvasCenter(),
  length: 15,
  direction: 1,
  color: {r: 255, g:100, b:255}
});


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
}, 1);

/*
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/
