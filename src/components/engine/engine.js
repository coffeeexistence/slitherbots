import renderFactory from './render';
import drawFactory from './draw';

export default function () {
  let engine = {};

  engine.initialize = ({canvas, drawInterval=5, showFps=false}) => {
    engine.canvas = canvas;
    engine.draw = drawFactory(drawInterval);
    engine.showFps = showFps;
    engine.logCanvas = () => { console.log(engine.canvas); };
    engine.render = renderFactory(engine);
  };

  return engine;
}
