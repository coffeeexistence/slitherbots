var canvas = document.getElementById("slitherbots-canvas");

console.log(game);

game.engine.initialize({canvas: canvas});
game.engine.logCanvas();

let slitherbot = new Creature();

game.engine.render.addEntity(slitherbot);


let move = () => {
  slitherbot.position.x+=1;
  slitherbot2.position.x-=1;
  game.engine.render.update();
};

window.setInterval( () => {
  window.requestAnimationFrame(move);
}, 10);

/*
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/
