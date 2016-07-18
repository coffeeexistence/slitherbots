import entities from './entities';

export default function(engine) {
  let render = {};


  let addSprites = (sprites, spriteArr) => {

    sprites.forEach((sprite)=>{
      spriteArr.push(sprite);
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
