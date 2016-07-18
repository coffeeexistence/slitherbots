export default function(engine) {
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
      entity.update();
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
}
