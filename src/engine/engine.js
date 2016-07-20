import renderFactory from './render';
import drawFactory from './draw';
import collisionFactory from './collision';

export default function ({canvas, drawInterval=5, showFps=false}) {
  let engine = {};

  engine.canvas = canvas;
  engine.draw = drawFactory(drawInterval, showFps);
  engine.collision = collisionFactory({engine: engine, cellCount: 4, show: true});
  engine.render = renderFactory(engine);
  console.log("creating engine", engine);

  return engine;
}
