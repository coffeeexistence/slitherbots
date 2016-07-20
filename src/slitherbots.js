import simFactory from './sim';

var canvas = document.getElementById("slitherbots-canvas");

canvas.width  = window.innerWidth*0.90;
canvas.height = window.innerHeight*0.90;

let sim = simFactory({canvas: canvas});

sim.addCreatures(30);
sim.start();
