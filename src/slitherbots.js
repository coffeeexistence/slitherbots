var canvas = document.getElementById("slitherbots-canvas");

console.log(game);

game.engine.initialize({canvas: canvas});
game.engine.logCanvas();

let slitherbot = new Creature({position: {x:50, y:50}, length: 50});

game.engine.render.addEntity(slitherbot);


window.setInterval( () => {
  window.requestAnimationFrame(game.engine.render.update);
}, 10);

/*
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/
