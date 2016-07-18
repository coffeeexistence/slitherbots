import renderService from './render';

export default function () {
  let engine = {};

  engine.initialize = ({canvas, drawInterval=5, showFps=false}) => {
    engine.canvas = canvas;
    engine.draw = {
      interval: drawInterval,
      nextInterval: function() {
        this.iteration = 0;
        this.intervalStart = new Date();
      },
      iteration: 0,
      intervalStart: new Date(),
      intervalTime: function() {
        let timePerInterval = (new Date() - this.intervalStart);
        let updatesPerSecond = this.interval * (1000/timePerInterval);
        console.log("updates per second:", Math.ceil(updatesPerSecond));
      }
    };
    engine.showFps = showFps;
  };

  engine.logCanvas = () => { console.log(engine.canvas); };

  engine.render = renderService(engine);

  return engine;
}
