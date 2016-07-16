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

  let renderService = () => {
    let render = {};


    let addSprites = (sprites, spriteArr) => {

      sprites.forEach((sprite)=>{
        spriteArr.push(sprite);
      });
    };


    let entities = {
      all: []
    };

    entities.drawSprites = (ctx) => {
      let drawEntity = (entity) => {
        entity.sprites().forEach((sprite)=>{
          ctx.beginPath();
          sprite.draw(ctx);
          ctx.closePath();
        });
      };

      entities.all.forEach(drawEntity);
    };

    entities.update = () => {
      entities.all.forEach((entity) => {
        entity.move();
      });
    };

    render.addEntity = (entity) => { entities.all.push(entity); };


    render.update = () => {
      entities.update();


      if(engine.draw.iteration > engine.draw.interval-1) {
        if(engine.showFps) engine.draw.intervalTime();
        engine.draw.nextInterval();

        let ctx = engine.canvas.getContext('2d');

        ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

        entities.drawSprites(ctx);

      } else {
        engine.draw.iteration++;
      }
    };

    return render;
  };

  engine.render = renderService();

  return engine;
}
