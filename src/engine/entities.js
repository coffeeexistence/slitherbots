let entities = {all: []};

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

export default entities;
