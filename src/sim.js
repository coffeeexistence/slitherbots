import engineFactory from './engine/engine';
import Creature from './creature/Creature';

export default function({updateRate=2, canvas, drawInterval=6, showFps=false}) {
  let sim = {};


  sim.engine = engineFactory({canvas: canvas, drawInterval: drawInterval, showFps: showFps});
  console.log(sim.engine);

  sim.addCreatures = (number) => {

    let canvasCenter = () => {
      return {x: canvas.width/2, y: canvas.height/2};
    };

    for(let i = 0; i < number; i++) {
      let rand1 = Math.random();
      let rand2 = Math.random();
      let rand3 = Math.random();
      console.log(sim.engine.render);

      sim.engine.render.addEntity(
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


  sim.start = () => {
    window.setInterval( () => {
      window.requestAnimationFrame(sim.engine.render.update);
    }, updateRate);
  };

  return sim;
}
