import entities from './entities';

export default function(engine) {
  let render = {};

  render.addEntity = (entity) => { entities.all.push(entity); };

  render.update = () => {
    entities.update();

    let willDraw = engine.draw.update();

    if(willDraw) {
      let ctx = engine.canvas.getContext('2d');

      ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

      entities.drawSprites(ctx);

    } else {
      engine.draw.iteration++;
    }
  };

  return render;
}
